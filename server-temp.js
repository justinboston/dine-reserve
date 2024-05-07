const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({});

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);

app.get("/", (req, res) => {
    res.render("homepage", {
        logged_in: false
    })
})

app.get("/login", (req, res) => {
    res.render("login", {
        logged_in: false
    })
})

app.get("/restaurants", (req, res) => {
    res.render("restaurants", {
        logged_in: false,
        restaurants: [
            { name: 'The Gourmet Place', type: 'Fine Dining', address: '123 Main St', image: './photo.png'},
            { name: 'Quick Bites', type: 'Fast Food', address: '456 Elm St', image: 'image_url2.jpg' },
            { name: 'Sushi World', type: 'Japanese', address: '789 Pine St', image: 'https://d2sygdwsqncsjz.cloudfront.net/364245.jpg' },
            { name: 'Pasta House', type: 'Italian', address: '321 Maple St', image: 'image_url4.jpg' },
            { name: 'Café Delight', type: 'Café', address: '654 Oak St', image: 'image_url5.jpg' }
        ]
    })

})

app.get("/reservations", (req, res) => {
    res.render("reservations", {
        logged_in: false,
        reservations: [
            {
                date: new Date('2024-05-01'), time: '19:00', guests: 2, restaurant: {
                    name: 'The Gourmet Place', type: 'Fine Dining', address: '123 Main St', image: 'https://d2sygdwsqncsjz.cloudfront.net/364245.jpg'
                }
            },
            {
                date: new Date('2024-05-04'), time: '18:00', guests: 3, restaurant: {
                    name: 'Pasta House', type: 'Italian', address: '321 Maple St', image: 'https://d2sygdwsqncsjz.cloudfront.net/364245.jpg'
                }
            },
            {
                date: new Date('2024-05-05'), time: '20:00', guests: 1, restaurant: {
                    name: 'Sushi World, type: 'Japanese', address: '789 Pine St', image: 'https://media.timeout.com/images/106013795/750/422/image.jpg'
                }
            },
        ]
    })
})

app.listen(PORT, () => console.log('Now listening'));
