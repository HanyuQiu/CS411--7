const express = require('express');
const bodyParser = require('body-parser');
const mealsRouter = require('./mealsRouter'); // Assuming the router file is named mealsRouter.js

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/meals', mealsRouter); // Mounting the mealsRouter on /meals route

// Error handling middleware (if needed)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});