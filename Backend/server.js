const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
require('./schedulers');


dotenv.config();
connectDB();

const routes = require('./routes');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: true, credentials: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the Equipment Rental and Sharing Service API');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
