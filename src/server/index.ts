import express from 'express';
import webhookRouter from './webhook';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the webhook router
app.use('/api', webhookRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 