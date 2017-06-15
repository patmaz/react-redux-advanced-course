/**
 * Created by patrykmazurkiewicz on 15/06/2017.
 */
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

//app
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//db
mongoose.connect('mongodb://localhost:auth/auth');

//server
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listen on port: ', port);