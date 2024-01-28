
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join('');
        }
      });
    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"  />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});

function onAsideIconClick() {
  $(".toggled").animate({ width: "toggle" }, 600);
  $(".links").show(300);
  $(".toggledIcon").toggleClass("fa-bars", "fa-x");
  $(".toggledIcon").toggleClass("fa-x", "fa-bars");
}
$(".closeIcon").on("click", function () {
  onAsideIconClick();
});
$(".back-home , .close-icons img").on("click", function () {
  window.location.reload();
});

$("#aside .categories").on("click", async function () {
  $("#categories").removeClass("d-none");
  $("#categories").siblings().addClass("d-none");
  onAsideIconClick();
  await displayCategory();
  // $('#categories .row').html(categoryCol);
});

async function onHomeDisplay() {
  await displayIngrediants();
  $("#ingrediantsDetails").removeClass("d-none");
  onItemClick();
}

$("#aside .area").on("click", async function () {
  $("#area").removeClass("d-none");
  $("#area").siblings().addClass("d-none");
  onAsideIconClick();
  await displayArea();
  // $('#area .row').html(areaCol);
  // await singleClickedAreaDetails()
});

$("#aside .ingrediants").on("click", async function () {
  $("#ingredients").removeClass("d-none");
  $("#ingredients").siblings().addClass("d-none");
  onAsideIconClick();
  await displayIngrediant();
  // $('#ingredients .row').html(ingrediantCol);
  await onIngrediantClick();
});

$("#aside .contactUs").on("click", function () {
  $("#contactUs").removeClass("d-none");
  $("#contactUs").siblings().addClass("d-none");
  onAsideIconClick();
});