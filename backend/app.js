const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const csp = require('helmet-csp');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const https = require('https');

const ec = require('express-comment');
const drivers = ec.drivers;

let pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ksm_articles',
    insecureAuth: true
});

const PAGE_SIZE = 10;
const FILE_PATH = path.join(__dirname, 'files');

const app = express();

app.use(compression({threshold: 0})); // enable compression gzip
app.use(helmet()); // add multiple security related header
app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://*.google-analytics.com", "https://*.google.com", "https://*.facebook.com"],
    imgSrc: ["'self'", "https://*.google.com", "data:", "https://*.google-analytics.com"],
    connectSrc: ["'self'", "https://*.google.com", "wss://ksm.sh"],
    styleSrc: ["'self'", "'unsafe-inline'"],
  },
}));

// force https
app.use('/', function(req, res, next) {
  if(!req.secure) {
    let secureUrl = "https://" + req.headers['host'] + req.url;
    res.writeHead(301, { "Location":  secureUrl });
    res.end();
  }
  next();
});

app.get("/api", (req, res, next) => {
    next();
});

// Get total article count
app.get("/api/article-count", (req, res) => {
    let result = {
        count: -1
    };

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.end()
        } else {
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
        }
    });
});

app.get("/api/article-info", (req, res) => {
    let fromID = Number(req.query['from']);
    if (fromID === undefined || fromID === null) {
        fromID = 0;
    }
    let toID = Number(req.query['to']);
    if (toID === undefined || fromID === null) {
        toID = fromID + PAGE_SIZE;
    }

    let result = {
        info: []
    };

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.end();
        } else {
            connection.query(`SELECT id, title, time, file_path FROM Articles WHERE id >= ${fromID} AND id <= ${toID};`,
                    (error, results, fields) => {
                        connection.release();
                        if (error) {
                            // fail silently
                            console.log(error);
                        } else {
                            for (let row of results) {
                                result.info.push({'id': row.id, 'title': row.title, 'time': row.time})
                            }
                        }
                        res.status(200);
                        res.send(JSON.stringify(result));
                        res.end();
                    });
        }
    });
});

app.get("/api/article", (req, res) => {
    let id = req.query.id;
    if (id === undefined || id === null) {
        id = 1;
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.end();
        } else {
            connection.query(`SELECT * FROM Articles WHERE id = ${id};`, (error, results, fields) => {
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
                    if (results.length <= 0 || results[0].file_path === undefined) {
                        res.status(404);
                        res.end()
                    } else {
                        fs.readFile(results[0].file_path, (err, contents) => {
                            if (err) {
                                res.status(404);
                                res.end();
                            } else {
                                res.status(200);
                                res.set({
                                  'Cache-Control': 'public, max-age=300'
                                });
                                res.send(contents);
                                res.end();
                            }
                        });
                    }
                }
            });
        }
    });
});

// comment middleware
const sql_settings = {
  database: 'ksm-comments',
  username: 'root',
  password: '',

  settings: {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

const ecSettings = {
  maxReplyLevel: 2,
};

const rejectDelete = (req, res, next) => {
  if (req.body && req.body.action) {
    if (req.body.action.toString().toLowerCase() === 'delete') {
      next('delete rejected');
    } else {
      next();
    }
  }
};

app.use('/api/comments', bodyParser.urlencoded({ extended: true }), rejectDelete, ec(drivers.sql(sql_settings), ecSettings));

// serving special static files under path "files"
app.use('/files', express.static(path.resolve(__dirname, 'files'), {maxAge: '5m'}));

// serving other static files normally
app.use(express.static(path.resolve(__dirname, 'public'), {maxAge: '5m'}));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'), {maxAge: '5m'});
});

const options = {
  cert: fs.readFileSync('../ssl/fullchain.pem'),
  key: fs.readFileSync('../ssl/privkey.pem'),
}

module.exports = {
  server: app,
  httpsServer: https.createServer(options, app),
}
// app.listen(80);
// https.createServer(options, app).listen(443);

