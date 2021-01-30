import express from 'express';
import { helloGoStack } from './routes';

const app = express();

app.get('/', helloGoStack);

app.listen(3333);