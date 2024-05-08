const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
       next();
    }
}

// Render the signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Render the login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Username is already taken.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.status(201).json({ user: newUser, message: 'You are now signed up and logged in.' });
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Error signing up user.', error: error.message });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Both username and password are required.' });
    }

    try {
        const userData = await User.findOne({ where: { username } });
        if (!userData) {
           
            return res.status(401).json({ message: 'Incorrect username.' });
        }

        const validPassword = await bcrypt.compare(password, userData.password);
        console.error('Password comparison result:', validPassword);

        if (!validPassword) {
            return res.status(401).json({ message: 'Incorrect password, please try again.' });
            
        }

        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
       res.json({ user: userData, message: 'You are now logged in!' });
      
      // res.redirect('/reservationList');
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Error logging in.', error: err.message });
    }
});


// POST route for creating a new post
router.post('/posts/create', async (req, res) => {
    try {
        const { title, content } = req.body;

        await Post.create({ title, content, userId: req.session.userId });

        res.redirect('/dashboard'); // Redirect to dashboard 
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post');
    }
});

// Logout route
router.post('/logout', (req, res) => {
   // if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    //} else {
      // res.status(404).send({ message: 'No active session.' });
   //}

});

module.exports = router;


  