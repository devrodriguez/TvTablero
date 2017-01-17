var app = require('express')();
var sql = require('mssql');

var config = {
    user: 'aplicacion_televisor',
    password: 'TvsN4tuF10R4PC',
    server: '192.168.1.23\\natuflora',
    database: 'BD_Cultivo',
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
};

// Configuration
app.set("jsonp callback", true);

app.get('/', function(req, res){
    sql.connect(config)
    .then(function(){
        new sql.Request()
        .query('select * from finca')
        .then(function(recordset){
            res.send(recordset);
        }).catch(function(err){
            console.log(err);
        });
    });
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

app.get('/8pren', function(req, res){
    sql.connect(config)
    .then(function(){
        new sql.Request()
        .execute('cultivo_peores_rendimientos')
        .then(function(recordset){
            res.send('callback(' + JSON.stringify(recordset) + ');');
        }).catch(function(err){
            console.log(err);

        });
    });
});

app.get('/stream', function(req, res){
    sql.connect(config)
    .then(function(){
        var request = new sql.Request();
        request.stream = true;

        request.query('select * from finca');
        request.on('recordset', function(columns){
            res.send(columns);
        });
    });
});

var server = app.listen(5000, function(){
    console.log('running...');
});