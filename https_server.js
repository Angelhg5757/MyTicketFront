const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

const options = {
    key: fs.readFileSync('portafolio.pem'), // Replace with the path to your key
    cert: fs.readFileSync('Angel_Hernandez.crt') // Replace with the path to your certificate
}

app.use((req, res, next) => {
    res.send('https works');
});

const port = 443;

https.createServer(options, app).listen(port,() => {
    console.log('Server listening on port ' + port);
});
