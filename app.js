const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const debug = require('debug')('app');
//FileSystem package
const fs = require('fs');
// bring in environment variables
require('dotenv').config();

debug(`Starting App.js in ${process.env.NODE_ENV} mode`);
debug(`App Path root is ${__dirname}`)


// Start here with app
const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// This responds with "Hello" on the homepage
app.get('/', function (req, res) {
   debug('GET /');
   debug('Query parameters: ');
   debug(req.query);
   res.send('Hello GET');
})

// 
app.get('/api',function (req, res) {
    debug('GET /api : Query String  %o',req.query);
    debug('GET /api : Parameters %o',req.params);
    //console.log(req.params);
    var filename = path.join(__dirname,req.query.file+'.json');
    debug('returning json file %s',filename);
    const statusCode = 200;
    fs.readFile(filename, 'utf8', (err,json) => {

        if (err) {
            debug('Endpoint not found on server');
            res.status(404).json({error: req.params.file + ' is not a valid endpoint'});
        }
        else {
            const data = JSON.parse(json);
            res.status(200).json(data);
            debug(json);
        };
    });
})

// This responds a POST request for the homepage
app.post('/api', function (req, res) {
   debug("POST /api checking body");
   debug(req.body);
   debug(req.query);
   var filename = path.join(__dirname,req.query.file+'.json');
   debug(`returning json file ${filename}`);
   const statusCode = 200;
   fs.readFile(filename, 'utf8', (err,json) => {
       if (err) {
           debug('Endpoint not found on server');
           res.status(404).json({error: req.params.file + ' is not a valid endpoint'});
       }
       else {
           const data = JSON.parse(json);
           res.status(200).json(data);
           debug(json);
       };
   });
})

var server = app.listen(process.env.PORT, function () {
   var host = server.address().address
   var port = server.address().port
   debug("Mockup Api app listening at http://%s:%s", host, port)
})