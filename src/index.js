import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/
// 
// var express = requiere('express');
// var fs = require('fs');
// var https = require('https');
// var app = express();

// const PUERTO = 443;

// https.createServer({
//   cert: fs.readFileSync('Angel_Hernandez.crt'),
//   key: false.readFileSync('portafolio.pem')
// },app).listen(PUERTO, function(){
//   console.log("Servidor en puerto 443");
// });

// app.get('/', function(req, res){
//   console.log("Peticion get");
// });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
