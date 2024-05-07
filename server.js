
const express = require('express');
const session = require('express-session');
//const exphbs = require('express-handlebars');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const db = require('./config/connection');
const { User, Post, Restaurant,Reservation,Review } = require('./models');

const app = express();
const PORT = process.env.PORT || 3030;
// Setup Handlebars with custom helpers
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views'), 
    helpers: {
        truncate: (text, maxLength) => {
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup session with Sequelize store
app.use(session({
    secret: 'super secret',  // Use an environment variable in production
    store: new SequelizeStore({
        db: db
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // set to true if using https
        httpOnly: true,
        maxAge: 3600000 // 1 hour
    }
    //cookie: { secure: false }  // Set to true if using HTTPS
}));

// Routes
app.get('/', async (req, res) => {
  try {
      const posts = await Post.findAll({
          include: [{ model: User, attributes: ['username'] }],
          order: [['createdAt', 'DESC']]
      });
      const postList = posts.map(post => post.get({ plain: true }));
      res.render('homepage', {
          posts: postList,
          logged_in: req.session.loggedIn || false
      });
  } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Error loading the homepage');
  }
});

// // Routes
 const userRoutes = require('./routes/loginRoute');
 const reservationRoutes = require('./routes/ReservationRoutes');
 const restaurantRoutes = require('./routes/restaurantsRoute');

 app.use('/', userRoutes);
 app.use('/reservations', reservationRoutes);
 app.use('/restaurants', restaurantRoutes);


// Sync database and start the server
db.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
    console.error('Failed to sync db: ' + err.message);
});





















// const express = require('express');
// const session = require('express-session');
// //const exphbs = require('express-handlebars');
// const path = require('path');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const db = require('./config/connection');
// const { User, Post, Comment } = require('./models');

// const app = express();
// const PORT = process.env.PORT || 3037;


// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Handlebars setup
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// // Session setup
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true if using HTTPS
// }));

// // Routes
// const userRoutes = require('./routes/userRoutes');
// const reservationRoutes = require('./routes/reservationRoutes');
// const restaurantRoutes = require('./routes/restaurantRoutes');

// app.use('/', userRoutes);
// app.use('/reservations', reservationRoutes);
// app.use('/restaurants', restaurantRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
