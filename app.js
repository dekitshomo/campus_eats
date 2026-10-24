const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
<<<<<<< HEAD
dotenv.config();
const { connectMongo } = require('./config/mongo');
if (process.env.NODE_ENV !== 'test') {
  connectMongo().catch(err => console.error('MongoDB connection failed:', err));
}
=======

dotenv.config();
const { connectMongo } = require('./config/mongo');
connectMongo().catch(err => console.error('MongoDB connection failed:', err));
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3


const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

<<<<<<< HEAD
// Static files and body parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
=======
HEAD
// Static files and body parsing
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json());
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3

// Sessions (must come before routes)
app.use(session({
  secret: process.env.SESSION_SECRET || 'campus-eats-dev-secret',
  resave: false,
  saveUninitialized: false,
}));

// Make the logged-in user available to every view
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes (after sessions)
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

<<<<<<< HEAD
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

module.exports = app;
=======
 HEAD
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start server (last)
app.listen(PORT, () => {
  console.log(`Campus Eats running at http://localhost:${PORT}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Campus Eats running at http://localhost:${PORT}`);
});


const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
