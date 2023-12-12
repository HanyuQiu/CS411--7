const express = require('express');
const meals = require('./meals'); // Importing the backend functionality

const router = express.Router();

// Handle POST request for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const loginResult = await meals.exist(username, password);
        res.send(loginResult);
    } catch (error) {
        res.status(500).send('Error during login');
    }
});

// Handle POST request for user registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const registerResult = await meals.register(username, password);
        res.send(registerResult);
    } catch (error) {
        res.status(500).send('Error during registration');
    }
});

// Handle GET request for recipe search
router.get('/search', async (req, res) => {
    const { ingredients } = req.query;
    const ingredientsArray = ingredients.split(',').map(i => i.trim());
    try {
        const searchResult = await meals.getURL(ingredientsArray);
        res.send(searchResult);
    } catch (error) {
        res.status(500).send('Error during recipe search');
    }
});

module.exports = router;