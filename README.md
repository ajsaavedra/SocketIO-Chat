# SocketIO-Chat-Node-Express
This application is built with node.js and express. Using socketIO, it is used as the main server for the 
[SocketChat iOS application] (https://github.com/ajsaavedra/SocketChat), wherein users can register and log in to chat
with other online users.

It is necessary to include a file in a 'config' directory in order to wire up the database connection. 

There, simply add your credentials to connect to MySQL. 

For example, simply require mysql and import the connection:
```
var connection = mysql.createConnection({
    host: 'YOUR HOST',
    user: 'YOUR USER',
    password: 'YOUR PASSWORD',
    database: 'YOUR DATABASE'
});

connection.connect();
```
