"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
// import {Repository} from 'typeorm/repository/Repository'
typeorm_1.createConnection().then(function (connection) {
    var app = express();
    var userRepo = connection.getRepository(User_1.User);
    app.use(function (request, response, next) {
        response.setHeader('Content-Type', 'application/json');
        next();
        // response.send('POST');
    });
    app.get('/users', function (request, response) {
        return userRepo.find();
    });
    /* app.get('/', (request: Request, response: Response): void => {
      readFile( './dist/index.html', (err: NodeJS.ErrnoException, data: Buffer): void => {
        if (null !== err) {
          response.statusCode = 500;
          console.log(err);
          response.send('error')
        } else {
          response.setHeader('Content-Type', 'text/html');
          response.send(data);
        }
      })
    }); */
    app.listen(3000);
}).catch(function (error) {
    console.log(error);
});
/* app.get('/users/:id', (request: Request, response: Response): void => {
  response.send(request.params.id);
});*/
