import * as express from 'express';
import {Request, Response} from 'express';
import {readFile} from 'fs';
import {NextFunction} from "express-serve-static-core";
import {createConnection, Connection, Repository} from 'typeorm';
import {User} from './entity/User'
import * as bodyParser from 'body-parser'
import {validate, ValidationError} from 'class-validator'
// import {Repository} from 'typeorm/repository/Repository'

createConnection().then((connection: Connection) => {
  const app = express();
  const userRepo: Repository<User> = connection.getRepository(User);

  app.use(bodyParser.json());

  /* app.use((request: Request, response: Response, next: NextFunction): void => {
    response.setHeader('Content-Type', 'application/json');
    next();
    // response.send('POST');
  }); */

  app.get('/users', (request: Request, response: Response) : void => {
    userRepo.find().then((users: User[]) => {
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

  app.get('/users/:id', (request: Request, response: Response): void => {
    userRepo.findOne(request.params.id, {relations: ['messages']}).then((user: User) => {
      response.send(JSON.stringify(user));
    });
  });

  app.post('/users', (request: Request, response: Response): void => {
    const user: User = userRepo.create(<User> request.body);

    validate(user).then((errors: ValidationError[]) => {
      if(errors.length > 0) {
        response.statusCode = 400;
        response.send(JSON.stringify(errors));
      } else {
        userRepo.save<User>(user).then((user: User) => {
          response.send(JSON.stringify(user));
        }).catch((e) => {
          response.statusCode = 503;
          response.send(JSON.stringify(e));
        })
      }
    });


    userRepo.save<User>(user).then((user: User) => {
      response.send(JSON.stringify(user));
    }).catch((e) => {
      response.statusCode = 500;
      response.send(JSON.stringify(e));
    })
  });

  app.listen(3000);
}).catch((error) => {
  console.log(error)
})
