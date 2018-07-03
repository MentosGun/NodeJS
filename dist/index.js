"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var bodyParser = require("body-parser");
var class_validator_1 = require("class-validator");
// import {Repository} from 'typeorm/repository/Repository'
typeorm_1.createConnection().then(function (connection) {
    var app = express();
    var userRepo = connection.getRepository(User_1.User);
    app.use(bodyParser.json());
    /* app.use((request: Request, response: Response, next: NextFunction): void => {
      response.setHeader('Content-Type', 'application/json');
      next();
      // response.send('POST');
    }); */
    app.get('/users', function (request, response) {
        userRepo.find().then(function (users) {
            response.send(JSON.stringify(users));
        });
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
    app.get('/users/:id', function (request, response) {
        userRepo.findOne(request.params.id, { relations: ['messages'] }).then(function (user) {
            response.send(JSON.stringify(user));
        });
    });
    app.post('/users', function (request, response) {
        var user = userRepo.create(request.body);
        class_validator_1.validate(user).then(function (errors) {
            if (errors.length > 0) {
                response.statusCode = 400;
                response.send(JSON.stringify(errors));
            }
            else {
                userRepo.save(user).then(function (user) {
                    response.send(JSON.stringify(user));
                }).catch(function (e) {
                    response.statusCode = 503;
                    response.send(JSON.stringify(e));
                });
            }
        });
        userRepo.save(user).then(function (user) {
            response.send(JSON.stringify(user));
        }).catch(function (e) {
            response.statusCode = 500;
            response.send(JSON.stringify(e));
        });
    });
    app.listen(3000);
}).catch(function (error) {
    console.log(error);
});
