import requests
import sqlite3

# Database connection
conn = sqlite3.connect('meals.db')
cursor = conn.cursor()

# Create table for meals
cursor.execute('''
    CREATE TABLE IF NOT EXISTS meals (
        "index" INTEGER PRIMARY KEY AUTOINCREMENT,
        "meal_name" TEXT,
        "category" TEXT,
        "ingredients" TEXT,
        "youtube_link" TEXT,
        "tags" TEXT,
        "area" TEXT
    )
''')

# Function to fetch meal details
def fetch_meal_details():
    response = requests.get('https://www.themealdb.com/api/json/v1/1/random.php')
    meal = response.json()['meals'][0]
    ingredients = ', '.join([meal[f'strIngredient{i}'] for i in range(1, 21) if meal[f'strIngredient{i}']])
    tags = meal['strTags'] if meal['strTags'] else 'None'
    return {
        'name': meal['strMeal'],
        'category': meal['strCategory'],
        'ingredients': ingredients,
        'youtube_link': meal['strYoutube'],
        'tags': tags,
        'area': meal['strArea']
    }

# Insert 300 unique meals into the database
meal_names = set()
while len(meal_names) < 300:
    details = fetch_meal_details()
    if details['name'] not in meal_names:
        meal_names.add(details['name'])
        cursor.execute('''
            INSERT INTO meals (meal_name, category, ingredients, youtube_link, tags, area) VALUES (?, ?, ?, ?, ?, ?)
        ''', (details['name'], details['category'], details['ingredients'], details['youtube_link'], details['tags'], details['area']))

# Commit changes and close connection
conn.commit()
conn.close()
