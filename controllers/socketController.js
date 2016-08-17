var socketio = require('socket.io');

module.exports.listen = function (app) {
    var users = [];
    var numUsers = 0;
    var usersTyping = [];

    io = socketio.listen(app);

    io.on('connect', function(socket) {
        socket.on('disconnect', function () {
            defineUserConnection(socket.username, false);
            io.emit('userExitUpdate', socket.username);
        });

        socket.on('disconnectUser', function(username) {
            defineUserConnection(username, false);
            io.emit('userExitUpdate', socket.username);
        });

        socket.on('chat message', function(msg, username) {
            io.emit('chat message', msg, username, new Date());
        });

        socket.on('startType', function(username) {
            usersTyping.push(username);
            io.emit('userTypingUpdate', usersTyping);
        });

        socket.on('stopType', function(username) {
            var index = usersTyping.indexOf(username);
            usersTyping.splice(index, 1);
            io.emit('userTypingUpdate', usersTyping);
        });

        socket.on('connectUser', function(username) {
            if (userExists(username)) {
                defineUserConnection(username, true);
            } else {
                users.push({username: username, isConnected: true});
                numUsers++;
            }
            socket.username = username;
            io.emit('userConnectUpdate', username);
        });
        
        socket.on('connectedUsers', function() {
            io.emit('connectedUsers', users);
        });
    });

    function defineUserConnection(username, connection) {
        for (var i = 0; i < numUsers; i++) {
            if (users[i].username === username) {
                users[i].isConnected = connection;
                return;
            }
        }
    }

    function userExists(username) {
        for (var i = 0; i < numUsers; i++) {
            if (users[i].username === username) {
                return true;
            }
        }
        return false;
    }

    return io;
}