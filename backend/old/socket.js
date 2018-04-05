const WebSocket = require('ws');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const xss = require('xss');

let pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ksm_chat',
  insecureAuth: true
});

const wss = new WebSocket.Server({
  port: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    try {
      let messageJson = JSON.parse(message) || {};
      if (messageJson['author']) {
        messageJson['author'] = xss(messageJson['author']).substring(0, 100);
      }
      if (messageJson['body']) {
        messageJson['body'] = xss(messageJson['body']).substring(0, 300);
      }

      switch (messageJson['type']) {
      case 'init':
        let replyBody = {
          messages: []
        };
        pool.getConnection((err, connection) => {
          connection.query('SELECT * FROM Chats ORDER BY id DESC LIMIT 5;', (error, results, fields) => {
            connection.release();
            if (error) {
              // fail silently
              console.log(error);
            } else {
              for (let row of results) {
                replyBody.messages.push({
                  author: String(row.author),
                  body: String(row.body),
                  timeStamp: String(row.time_stamp).substring(0, 10) // get YYYY-MM-DD subpart
                });
              }
            }
            replyBody.messages.reverse(); // the order is reversed!
            ws.send(JSON.stringify(replyBody));
          });
        });
        break;
      case 'message':
        const message = messageJson['data'] || [];
        if (!message['author'] || !message['body']) {
          // Abort on invalid message
          return;
        }

        pool.getConnection((err, connection) => {
          connection.query(
            `INSERT INTO Chats(author, body, time_stamp) VALUES ("${message['author']}", "${message['body']}", CURDATE());`,
            (error) => {
              console.log(error);
            })
        });

        wss.clients.forEach(function each(client) {
          const newMessage = {
            messages: [
              {
                author: String(message['author']),
                body: String(message['body']),
                timeStamp: moment().format('YYYY-MM-DD')
              }
            ]
          };

          if (client !== ws && client.readyState === WebSocket.OPEN) {
            // Send to all OTHER clients
            client.send(JSON.stringify(newMessage));
          }
        });
        break;
      default:
        return;
      }
    } catch (_) {
      console.log(_);
    }
  });
});
