const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

// MongoDB Connection
connectDb();

// Express app initialization
const app = express();

app.use(express.json());
app.use(morgan('dev'));



// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes);


// const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// Middlewares
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;

// Server start
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
