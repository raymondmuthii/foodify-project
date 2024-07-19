const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mealContainer = document.getElementById('meal-container');
const homepage = document.getElementById('homepage');

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
document.getElementById('back-button').addEventListener('click', function() {
  document.getElementById('homepage').style.display = 'flex';
  document.getElementById('meal-container').style.display = 'none';
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

  return mealElem;
}

function formatInstructions(instructions) {
  if (Array.isArray(instructions)) {
    return instructions.map(instruction => instruction.display_text).join('<br><br>');
  }
  return instructions || '#.';
}
