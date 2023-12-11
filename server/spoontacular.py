import requests
import sqlite3

# Your Spoonacular API key
api_key = 'YOUR_SPOONACULAR_API_KEY'

# Database connection
conn = sqlite3.connect('meals.db')
cursor = conn.cursor()

# Create table for meals
cursor.execute('''
    CREATE TABLE IF NOT EXISTS spoonacular_meals (
        "index" INTEGER PRIMARY KEY AUTOINCREMENT,
        "meal_name" TEXT,
        "type" TEXT,
        "ingredients" TEXT,
        "recipe_info" TEXT,
        "cuisine" TEXT
    )
''')


api_key = '8420a2002cd44209b94a0cd2e39baabb'
# Function to fetch meal details
def fetch_meals():
    url = 'https://api.spoonacular.com/recipes/complexSearch'
    params = {
        'apiKey': api_key,
        'number': 200,
        'addRecipeInformation': True,
        'fillIngredients': True
    }
    response = requests.get(url, params=params)
    print(response.text)  # Add this line to print the raw response
    return response.json()['results']

# Fetch meals and insert into the database
meals = fetch_meals()
for meal in meals:
    meal_name = meal['title']
    meal_type = meal['dishTypes'][0] if meal['dishTypes'] else 'Not Specified'
    ingredients = ', '.join([ingredient['name'] for ingredient in meal['extendedIngredients']])
    recipe_info = meal['summary']
    cuisine = meal['cuisines'][0] if meal['cuisines'] else 'Not Specified'
    
    cursor.execute('''
        INSERT INTO spoonacular_meals (meal_name, type, ingredients, recipe_info, cuisine)
        VALUES (?, ?, ?, ?, ?)
    ''', (meal_name, meal_type, ingredients, recipe_info, cuisine))

# Commit changes and close connection
conn.commit()
conn.close()
