import express, { Request, Response, Application } from 'express';
import { json } from 'body-parser';
import imageRouter from './routes/images';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: '*', // This should be set to the domain or specific URL of your form
  optionsSuccessStatus: 200,
};

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Image Upload tool');
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

app.use(cors(corsOptions));
app.use(json());
app.use(imageRouter);
