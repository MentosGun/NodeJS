"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs_1 = require("fs");
var app = express();
app.use(function (request, response, next) {
    response.setHeader('Content-Type', 'application/json');
    next();
    // response.send('POST');
});
app.get('/', function (request, response) {
    fs_1.readFile('./dist/index.html', function (err, data) {
        if (null !== err) {
            response.statusCode = 500;
            console.log(err);
            response.send('error');
        }
        else {
            response.setHeader('Content-Type', 'text/html');
            response.send(data);
        }
    });
});
/* app.get('/users/:id', (request: Request, response: Response): void => {
  response.send(request.params.id);
});*/
app.listen(3000);
