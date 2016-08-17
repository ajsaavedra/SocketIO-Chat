var mysql = require('mysql');
var connection = require('../config/mysql');

exports.checkUser = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    connection.query(
        'SELECT * FROM ChatUsers WHERE username = ?', [username],
        function(err, rows) {
            if (!err && rows.length === 0) {
                var err =  {
                    "Error": "User not found"
                };
                res.send(err);
            } else {
                if (rows[0].password === password) {
                    res.send(rows[0]);
                } else {
                    var err =  {
                    "Error": "Invalid password"
                    };
                    res.send(err);
                }
            }
        }
    );
};

exports.createUser = function (req, res) {
    var username = req.body.username;
    var userExists = false;
    connection.query(
        'SELECT * FROM ChatUsers WHERE username = ?', [username],
        function(err, rows) {
            if (!err && rows.length !== 0) {
                var err =  {
                    "Error": "Username taken. Use another."
                };
                userExists = true;
                res.send(err);
                return;
            }
            var password = req.body.password;
            var confirmation = req.body.confirmation;
            if (password !== confirmation) {
                var err =  {
                    "Error": "Password fields did not match"
                };
                res.send(err);
            } else {
                connection.query('INSERT INTO ChatUsers (username, password) VALUES(?, ?)', [username, password],
                    function(err, rows) {
                        if (!err) {
                            res.send(rows);
                        } else {
                            var err =  {
                                "Error": "Could not create user"
                            };
                            res.send(err);
                        }
                    }
                );
            }
        }
    );
};

exports.getAllUsers = function(req, res) {
    connection.query(
        'SELECT * FROM ChatUsers',
        function(err, rows) {
            if (!err && rows.length !== 0) {
                res.send(rows);
            }
        });
};