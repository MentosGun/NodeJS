import * as express from 'express';
import {Request, Response} from 'express';
import {readFile} from 'fs';
import {NextFunction} from "express-serve-static-core";
import {createConnection, Connection, Repository} from 'typeorm';
import {User} from './entity/User'
// import {Repository} from 'typeorm/repository/Repository'

createConnection().then((connection: Connection) => {
  const app = express();
  const userRepo: Repository<User> = connection.getRepository(User);

  app.use((request: Request, response: Response, next: NextFunction): void => {
    response.setHeader('Content-Type', 'application/json');
    next();
    // response.send('POST');
  });

  app.get('/users', (request: Request, response: Response) : Promise<User[]> => {
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
}).catch((error) => {
  console.log(error)
})



/* app.get('/users/:id', (request: Request, response: Response): void => {
  response.send(request.params.id);
});*/
