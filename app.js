var express = require('express');
var app = express();
var http = require('http').Server(app);

var port = process.env.PORT || 3000;

app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');

var apiRouter = require('./router/apiRouter')(app);

app.use('/api', apiRouter);

app.get ('/', function (req, res) {
    res.render('index', {
        title: 'Socket Chat'
    });
});

var io = require('./controllers/socketController').listen(http);

http.listen(port, function (err) {
    console.log('Express is running on port ' + port);
});