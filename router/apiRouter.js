var express = require('express');
var route = express.Router();
var checkUser = require('../controllers/userController').checkUser;
var createUser = require('../controllers/userController').createUser;
var getAllUsers = require('../controllers/userController').getAllUsers;
var bodyParser = require('body-parser');
route.use(bodyParser.json());

var apiRouter = function (app) {
    route.route('/checkUser')
        .post(checkUser);

    route.route('/createUser')
        .post(createUser);

    route.route('/allUsers')
        .get(getAllUsers);

    return route;
};

module.exports = apiRouter;