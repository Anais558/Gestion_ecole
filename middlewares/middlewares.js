// middlewares.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configuration du middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
