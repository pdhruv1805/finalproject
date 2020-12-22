var express = require('express');

var app = express();
const bodyParser = require('body-parser');
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors')


app.use(cors())




app.use(express.json())
app.use(express.static(__dirname + '/src'));




app.get('/login', function (req, res) {
  res.sendFile(__dirname +'/src/login/main.html');
});

app.get('/petition', function (req, res) {
  res.sendFile(__dirname + '/src/petition/petition.html');
});



app.listen(4000);