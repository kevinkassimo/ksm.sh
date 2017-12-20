const express = require('express');
const compression = require('compression');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

let pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ksm_articles',
    insecureAuth: true
});

const PAGE_SIZE = 10;

const app = express();
app.use(compression({threshold: 0}));

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
                                result.info.push({'id': row.id, 'title': row.title, 'time': row.time, 'file_path': row.file_path})
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

// serving other static files normally
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(80);
