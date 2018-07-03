import * as express from 'express';
import {Request, Response} from 'express';
import {readFile} from 'fs';
import {NextFunction} from "express-serve-static-core"

const app = express();

app.use((request: Request, response: Response, next: NextFunction): void => {
  response.setHeader('Content-Type', 'application/json');
  next();
  // response.send('POST');
});

app.get('/', (request: Request, response: Response): void => {
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
});

/* app.get('/users/:id', (request: Request, response: Response): void => {
  response.send(request.params.id);
});*/

app.listen(3000);
