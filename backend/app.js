const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

let pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  database : 'ksm_articles'
});

const PAGE_SIZE = 10;

const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

function fastQuery(query) {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "",
    database: "ksm_articles"
  });

  connection.connect();

  let result = [];
  connection.query(query, function (error, results, fields) {
    if (error) {
      // silently fail
    }
    result = results;
  });

  connection.end();
}


app.get("/api", (req, res, next) => {
  next();
});

// Get total article count
app.get("/api/article-count", (req, res) => {
  let result = {
    count: -1
  };

  pool.getConnection((err, connection) => {
    connection.query('SELECT COUNT(*) AS cnt FROM Articles;', (error, results, fields) => {
      connection.release();
      if (error) {
        // fail silently
        console.log(error);
      } else {
        result.count = results[0].cnt;
      }
      res.status(200);
      res.send(JSON.stringify(result));
      res.end();
    })
  });

  console.log("RECEIVE REQUEST: /api/article-count")
});

app.get("/api/article-info", (req, res) => {
  let fromID = Number(req.query['from']);
  if (fromID === undefined || fromID === null) {
    fromID = 0;
  }
  let toID = Number(req.query['to']);
  if (toID === undefined || fromID === null) {
    toID = fromID + 10;
  }

  let result = {
    info: []
  };

  pool.getConnection((err, connection) => {
    console.log(err);
    connection.query(`SELECT * FROM Articles WHERE id >= ${fromID} AND id <= ${toID};`,
      (err, results, fields) => {
        connection.release();
        if (error) {
          // fail silently
          console.log(error);
        } else {
          result.info = results;
        }
        res.status(200);
        res.send(JSON.stringify(result));
        res.end();
      });
  });

  console.log("RECEIVE REQUEST: /api/article-info")
});

app.get("/api/article", (req, res) => {
  let id = req.query.id;
  if (id === undefined || id === null) {
    id = 1;
  }

  pool.getConnection((err, connection) => {
    console.log(err);
    connection.query(`SELECT * FROM Articles WHERE id = ${id};`, (err, results, fields) => {
      connection.release();
      if (error) {
        res.status(404);
        res.send(`
        {
          "title": "NOT FOUND",
          "time": "NOT FOUND"
        }
        ======
        
        `);
        res.end();
      } else {
        fs.readFile(results[0].file_path, (err, contents) => {
          if (err) {
            res.status(404);
          } else {
            res.status(200);
            res.send(contents);
            res.end();
          }
        })
      }
    });
  });
});

// serving other static files normally
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(10000);
