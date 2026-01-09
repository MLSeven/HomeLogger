const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const debug = require('debug')('app');
//FileSystem package
const fs = require('fs');

// bring in environment variables
require('dotenv').config();

//SQLite3
//const sqlite3 = require('sqlite3');

// Import Repo
const repo = require(path.join(__dirname,'repo.js'));

debug(`Starting App.js in ${process.env.NODE_ENV} mode`);
debug(`App Path root is ${__dirname}`);

//Create and seed datbase if required
repo.createLog();

// Start here with app
const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.route('/')
    // This responds with "Hello" on the homepage
    .get((req,res) => {
        debug('GET /');
        debug('Query parameters: ');
        debug(req.query);
        res.send('Hello GET').status(200);
    })

// /api route
app.route('/api')
    //get
    .get(async (req, res) => {
        //debug('GET /api : Query String  %o',req.query);
        //debug('GET /api : Parameters %o',req.params);
        //console.log(req.params);
        debug('Get Request - Quering database');
        const dbRows =  await repo.getLogEntries();
        debug('sending response');
        debug(dbRows);
        res.send(dbRows).status(200);
    })
    .post(async (req, res) => {
        debug('POST /api : body ...');
        debug(req.body);

        //const jsonData = JSON.parse(req.body);
        await repo.newLogEntry(req.body);
        res.status(201);
    })

var server = app.listen(process.env.PORT, function () {
   var host = server.address().address
   var port = server.address().port
   debug("Mockup Api app listening at http://%s:%s", host, port)
})