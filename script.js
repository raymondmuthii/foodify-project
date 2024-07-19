const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mealContainer = document.getElementById('meal-container');
const homepage = document.getElementById('homepage');
const backButton = document.getElementById('back-button');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const recipeDetails = document.getElementById('recipe-details');

const apiKey = 'ae55277eaamshf56b5c81f1faaebp156f4cjsn0065f146bcd4';
const apiHost = 'tasty.p.rapidapi.com';

searchBtn.addEventListener('click', function() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    homepage.style.display = 'none';
    mealContainer.style.display = 'flex';
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${searchTerm}`, {
      method: 'GET',
      headers: {
        'X-Rapidapi-Key': apiKey,
        'X-Rapidapi-Host': apiHost
      }
    })
    .then(response => response.json())
    .then(data => {
      const meals = data.results;
      if (meals) {
        displayMeals(meals);
      } else {
        mealContainer.innerHTML = "No meals found for that search term.";
      }
    })
    .catch(error => {
      console.error('Error fetching meals:', error);
      mealContainer.innerHTML = "Error fetching meals. Please try again later.";
    });
  } else {
    alert("Please enter a search term.");
  }
});

backButton.addEventListener('click', function() {
  homepage.style.display = 'flex';
  mealContainer.style.display = 'none';
  recipeDetails.style.display = 'none';
});

signupBtn.addEventListener('click', function() {
  signupForm.style.display = 'block';
  loginForm.style.display = 'none';
  homepage.style.display = 'none';
  mealContainer.style.display = 'none';
  recipeDetails.style.display = 'none';
});

loginBtn.addEventListener('click', function() {
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  homepage.style.display = 'none';
  mealContainer.style.display = 'none';
  recipeDetails.style.display = 'none';
});

logoutBtn.addEventListener('click', function() {
  logout();
});

signupForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  signUp(email, password);
});

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  login(email, password);
});

function displayMeals(meals) {
  mealContainer.innerHTML = "";

  meals.forEach(meal => {
    const mealElement = createMealElement(meal);
    mealContainer.appendChild(mealElement);
  });
}

function createMealElement(meal) {
  const title = document.createElement('h1');
  title.textContent = meal.name;

  const image = document.createElement('img');
  image.src = meal.thumbnail_url;
  image.alt = meal.name;

  const instructions = document.createElement('p');
  instructions.innerHTML = formatInstructions(meal.instructions);

  const mealContent = document.createElement('div');
  mealContent.classList.add('meal-content');
  mealContent.appendChild(title);
  mealContent.appendChild(instructions);

  const mealElem = document.createElement('div');
  mealElem.classList.add('meal');
  mealElem.appendChild(image);
  mealElem.appendChild(mealContent);

  mealElem.addEventListener('click', function() {
    displayRecipeDetails(meal);
  });

  return mealElem;
}

function formatInstructions(instructions) {
  if (Array.isArray(instructions)) {
    return instructions.map(instruction => instruction.display_text).join('<br><br>');
  }
  return instructions || '#';
}

function displayRecipeDetails(meal) {
  recipeDetails.style.display = 'block';
  homepage.style.display = 'none';
  mealContainer.style.display = 'none';

  document.getElementById('recipe-image').src = meal.thumbnail_url;
  document.getElementById('recipe-title').textContent = meal.name;
  document.getElementById('recipe-ingredients').innerHTML = formatIngredients(meal.sections);
  document.getElementById('recipe-instructions').innerHTML = formatInstructions(meal.instructions);
  document.getElementById('recipe-nutrition').innerHTML = formatNutrition(meal.nutrition);
  displayComments(meal.id);
}

function formatIngredients(sections) {
  return sections.map(section => section.components.map(component => component.raw_text).join('<br>')).join('<br><br>');
}

function formatNutrition(nutrition) {
  return Object.entries(nutrition).map(([key, value]) => `${key}: ${value}`).join('<br>');
}

function signUp(email, password) {
  // Sign up using email and password
  alert('Sign up successful!');
  signupForm.style.display = 'none';
}

function login(email, password) {
  // Login using email and password
  alert('Login successful!');
  loginForm.style.display = 'none';
  logoutBtn.style.display = 'block';
  loginBtn.style.display = 'none';
  signupBtn.style.display = 'none';
}

function logout() {
  // Logout
  alert('Logout successful!');
  logoutBtn.style.display = 'none';
  loginBtn.style.display = 'block';
  signupBtn.style.display = 'block';
}
