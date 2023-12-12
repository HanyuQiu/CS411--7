# Recipe Search Web Application

## Overview
This repository contains a web application for searching and displaying recipes. It integrates a frontend web interface with a backend server that fetches data from an online API and a SQL database. The application is built using a combination of technologies including Python, Java, JavaScript, HTML, and CSS.

## Files and Directories
**spoontacular.py**, **meals.py**: Python scripts to fetch data from the Spoonacular API and interact with a SQLite database.

**meals.java**: Java file handling SQL queries and OAuth authentication.

**meals.db**: SQLite database storing meal information.

**index.html**: Main webpage for the application.

**script.js**: JavaScript file with functions to interact with the backend and update the web interface.

**style.css**: CSS file for styling the web interface.

**app.js**: Node.js application entry point, setting up the server and routes.

**router.js**: Express router handling API endpoints.

**package.json**, **package-lock.json**: Node.js project manifest and lock file for managing dependencies.

## Setup and Installation
Install Dependencies: Run npm install to install the necessary Node.js dependencies listed in package.json.

Database Setup: Ensure meals.db is correctly set up and accessible.

API Keys: Replace YOUR_SPOONACULAR_API_KEY in spoontacular.py with your actual API key.

Running the Backend Server: Execute node app.js to start the Node.js server.

Accessing the Web Interface: Open index.html in a web browser to access the application.

## Usage
Searching Recipes: Use the search bar in the web interface to search for recipes.

Viewing Recipes: The application displays a list of recipes by showing the YouTube video link or specific procedures based on the fetching API and based on the search criteria.

User Authentication: Need to register/log in according to user's account info.
