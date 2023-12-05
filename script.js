function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Here you should add code to send the username and password to the server
    // Assuming successful login
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('ingredient-input').style.display = 'block';
}

function getRecipes() {
    var ingredient = document.getElementById('ingredient').value;

    // Send ingredients to the back end
    fetch('/get-recipes', {
        method: 'POST',
        body: JSON.stringify({ ingredient: ingredient }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayRecipes(data.recipes);
    });
}

function displayRecipes(recipes) {
    var recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = '';
    recipes.forEach(recipe => {
        var p = document.createElement('p');
        p.textContent = recipe;
        recipesDiv.appendChild(p);
    });
}
