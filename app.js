const apiUrl = 'https://tasty.p.rapidapi.com/recipes/auto-complete';
let authToken = null;



async function searchRecipes() {
    const searchInput = document.getElementById('searchInput').value;

    try {
        const response = await fetch(`${apiUrl}/search?query=${searchInput}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            console.error('Recipe search failed');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    //clear the previous result
    resultsContainer.innerHTML = ''; 

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found</p>';
        return;
    }

    results.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const title = document.createElement('h2');
        title.textContent = recipe.title;

        const ingredients = document.createElement('p');
        ingredients.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;

        const instructions = document.createElement('p');
        instructions.textContent = `Instructions: ${recipe.instructions}`;

        recipeCard.appendChild(title);
        recipeCard.appendChild(ingredients);
        recipeCard.appendChild(instructions);

        resultsContainer.appendChild(recipeCard);
    });
}



