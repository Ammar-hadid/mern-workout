// Importeer Express
import express from 'express';
import workoutRoutes from './src/routes/workoutRoutes.js';

import mongoose from 'mongoose'

// Maak Express app
const app = express();

// Haal PORT uit .env (of gebruik 4000)
const PORT = process.env.PORT || 4000;

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

// Test route - reageer op GET /
app.get('/', (req, res) => {
  res.json({
    message: 'Mijn eerste backend!',
    success: true
  });
});

app.use('/workout', workoutRoutes)


// Start de server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});

