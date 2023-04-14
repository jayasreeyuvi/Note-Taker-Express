//dependencies//
const express = require('express');
const path = require('path');
const fs = require('fs');
let db = require('./db/db.json');
const bodyParser = require('body-parser');


//Express App setting//

const app = express();

console.log(db);

//const PORT = 3000;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
