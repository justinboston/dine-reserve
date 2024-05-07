const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/environment'); // Assuming PORT is defined in the environment configuration

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Session setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

app.use('/', userRoutes);
app.use('/reservations', reservationRoutes);
app.use('/restaurants', restaurantRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
