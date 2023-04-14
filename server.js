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




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './notes.html'))
);


app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    db = JSON.parse(data);
    //console.log(db);
  })
  res.json(db);
});

app.post('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
    if (err) {
      res.status(500).send('Error on reading the file')
    }

    console.log(data);
    let notesTake = JSON.parse(data);
    notesTake.push(req.body);
    res.send('Data written successfully')
    res.json(fs.writeFile('./db/db.json', JSON.stringify(notesTake), (err) => 
    {
      if (err) {
        res.status(500).send('Error on writing the file')
      }
      
    }))

  })

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
