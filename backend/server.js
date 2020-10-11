const express = require('express');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');

const productRoutes = require('./routes/productRoutes');

dotenv.config();

// MongoDB Connection
connectDb();

// Express app initialization
const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/products', productRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Server start
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
