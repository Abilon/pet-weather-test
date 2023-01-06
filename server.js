const net = require('net');
const port = 7777;
const host = '94.103.90.12'

const express = require ("express");
const path = require ("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('dist'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const server = app.listen (process.env.PORT || port);
const portNumber = server.address().port;
console.log(portNumber);
