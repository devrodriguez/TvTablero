var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var sql = require('mssql');
var moment = require('moment');

var config = {
    user: 'sa',
    //password: 'N4tufl0r4D3v',
    password: 'DbNf2006',
    //server: '138.128.167.162\\natuflora', // You can use 'localhost\\instance' to connect to named instance 
    server: '192.168.1.23\\natuflora',
    database: 'BD_Cultivo',
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
};

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/8ren', function(req, res){
    sql.connect(config)
    .then(function(){
        new sql.Request()
        .execute('cultivo_rendimientos_ultima_hora')
        .then(function(recordset){
            res.send('callback(' + JSON.stringify(recordset) + ');');
        }).catch(function(err){
            console.log(err);
        });
    });
});

io.on('connection', function(socket){
    console.log('Listen...');
    socket.on('getData', function(data){
        console.log('Geting data...')
        setInterval(function(){
            console.log('New Interval... ' + moment(new Date()).format('DD/MM/YYYY hh:mm:ss'));

            sql.connect(config)
            .then(function(){
                new sql.Request()
                .execute('cultivo_rendimientos_ultima_hora')
                .then(function(recordset){
                    io.emit('res', recordset);
                }).catch(function(err){
                    console.log(err);
                });
            });
        }, 30000);
    });
});

server.listen(3000);