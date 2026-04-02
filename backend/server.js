// Importeer Express
import express from 'express';
import workoutRoutes from './src/routes/workoutRoutes.js';
import authRoutes from './src/routes/userRoutes.js'

import mongoose from 'mongoose'

import cors from 'cors';

// Maak Express app
const app = express();

// Haal PORT uit .env (of gebruik 4000)
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173'
}))

// Middleware: lees JSON
app.use(express.json());

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Verbonden met MongoDB');

    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost: ${PORT}`)
    })
  })

app.use('/api/workouts', workoutRoutes)
app.use('/api/auth', authRoutes)


// Start de server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});

