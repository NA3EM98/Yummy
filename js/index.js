///<reference types="../@types/jquery" />

let categoriesData=[];
let areaData=[];
let ingrediantsMainData=[];
let ingrediantData=[];
let clickedMainIngrediantData=[];
let clickedIngrediantData=[];

let mainIngrediantCol=``;
let mainIngrediantDetailsCol=``;
let ingrediantDetailsCol=``;
let categoryCol=``;
let areaCol=``;
let ingrediantCol=``;
let recipesDetails = ``
let mealName=''
let idMeal=0;

async function mainIngredientApi() {
    let categoriesResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalCategoriesResponse = await categoriesResponse.json();
    categoriesData=finalCategoriesResponse.categories;
    // console.log(categoriesData);
    
    let areaResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let finalAreaResponse = await areaResponse.json();
    areaData=finalAreaResponse.meals;
    // console.log(" areaData ",areaData);

    // let ingrediantMainResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`);
    // let finalingrediantMainResponse = await ingrediantMainResponse.json();
    // ingrediantsMainData=finalingrediantMainResponse.meals;
    // // console.log(" ingrediantsMainData ",ingrediantsMainData);

    let ingrediantResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let finalingrediantResponse = await ingrediantResponse.json();
    ingrediantData=finalingrediantResponse.meals;
    // console.log(" ingrediantData ",ingrediantData);
}


async function singleItemDetails(idMeal){    
    let clickedMainIngrediantResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let finalClickedMainIngrediantResponse = await clickedMainIngrediantResponse.json();
    clickedMainIngrediantData=finalClickedMainIngrediantResponse.meals[0];
}
function onItemClick() {
$('.card-info').on('click',async function(e){
    $('#ingrediantsDetails').toggleClass('d-none');
    $('#details').toggleClass('d-none');

    let currentIdMeal= $(e.currentTarget).find('.idMeal').html();
    await singleItemDetails(currentIdMeal)

    for (let i = 1; i <= 20; i++) {
        if (clickedMainIngrediantData[`strIngredient${i}`]) {
            recipesDetails += `<li class="alert alert-info m-2 p-1">${clickedMainIngrediantData[`strMeasure${i}`]} ${clickedMainIngrediantData[`strIngredient${i}`]}</li>`
        }}

    mainIngrediantDetailsCol +=`
        <div class="col-md-4">
        <div class="img">
        <img class="w-100 rounded-3" src="${clickedMainIngrediantData.strMealThumb}" alt="img">
        <h2 class="text-center my-4">${clickedMainIngrediantData.strMeal}</h2>
        </div></div>
        <div class="col-md-8">
        <div class="details">
        <h4 class="fw-bold">Instructions : </h4>
        <p class="card-text">${clickedMainIngrediantData.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${clickedMainIngrediantData.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${clickedMainIngrediantData.strCategory}</h3>
        <h4 class="fw-bold">Recipes : </h4>
        <ul class="list-unstyled d-flex g-3 flex-wrap">${recipesDetails}</ul>
        <a target="_blank" href="${clickedMainIngrediantData.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${clickedMainIngrediantData.strYoutube}" class="btn btn-danger">Youtube</a>
        </div></div>
        `
    $('#details .row').html( mainIngrediantDetailsCol )
})
}

async function displayCategory() {
    for(let i=0;i<categoriesData.length;i++){
        categoryCol+=`        
        <div class="col-md-3 cat">
        <div class="cat-item">
        <div class="card">
        <img src="${categoriesData[i].strCategoryThumb}" class="card-img-top" alt="...">
        <div class="card-body category-info">
        <div class="inner">        
        <h4 class="card-text cat-info"> ${categoriesData[i].strCategory} </h4>
        <p class="card-text"> ${categoriesData[i].strCategoryDescription.split(" ").slice(0,20).join(" ")} </p>
        </div></div></div></div></div>
        `
    }
    $('#categories .row').html(categoryCol);
    await onCatClick()
}

async function onCatClick() {
        $('.cat').on('click',async function(e){
            let currentcatName= $(e.currentTarget).find('.cat-info').html();
            let catName = currentcatName;
            console.log(catName);
            return catName
        })
    }

async function singleClickedCatDetails(){
    let resultcat=catName;
    console.log(catName);
    areaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${resultcat}`)
    let finalAreaResponse = await areaResponse.json();
    let z =await finalAreaResponse.meals;
    console.log(finalAreaResponse);
}

async function displayIngrediant(){
    for(let i=0;i<20;i++){
        ingrediantCol+=`        
        <div class="col-md-3 ingrediant-info">
        <div class="type text-center fs-1 text-white">
            <i class="fa-solid fa-drumstick-bite"></i>
            <h4 class="fs-1 ingrediantName">${ingrediantData[i].strIngredient}</h4>
            <p class="fs-5">${ingrediantData[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
    </div>
        `
    $('#ingredients .row').html(ingrediantCol);
    }
}

let xx=``
async function allItemsDetails(mealName) {
    let ingrediantMainResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`);
    let finalingrediantMainResponse = await ingrediantMainResponse.json();
    ingrediantsMainData=finalingrediantMainResponse.meals;
    // console.log(" ingrediantsMainData ",ingrediantsMainData);
    xx=await ingrediantsMainData;
}

async function singleAreaDetails(idMeal){    
    let clickedAreaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let finalClickedAreaResponse = await clickedAreaResponse.json();
    clickedAreaData=finalClickedAreaResponse.meals[0];
    console.log(clickedAreaData);
}
async function displayArea() {
    for(let i=0;i<areaData.length;i++){
        areaCol+=`        
        <div class="col-md-3 area">
        <div class="city text-center fs-1 text-white">
            <i class="fa-solid fa-flag"></i>
            <h4 class="fs-1 area-info"> ${areaData[i].strArea} </h4>
        </div>
    </div>
        `
    }
    $('#area .row').html(areaCol);
    await onAreaClick();
}

function onAreaClick() {
    $('.area').on('click',async function(e){
        let currentAreaName= $(e.currentTarget).find('.area-info').html();
        let areaName = currentAreaName;
        console.log(areaName);
        return areaName
})}
async function singleClickedAreaDetails(){
    console.log(areaResult);
    areaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    let finalAreaResponse = await areaResponse.json();
    let z =await finalAreaResponse.meals;
    console.log(finalAreaResponse);
    // let areasName = onAreaClick();
}

function onIngrediantClick() {
    $('.ingrediant-info').on('click',async function(e){
        let currentIngrediantName= $(e.currentTarget).find('.ingrediantName').html();
        mealName = currentIngrediantName;
        console.log(mealName);
        // await allItemsDetails(mealName);
        // $('#ingredients').addClass("d-none");
        // $('#ingrediantsDetails').removeClass("d-none");
})}

async function displayIngrediants(){
    await allItemsDetails(mealName);
    for(let i=0;i<28;i++){
        mainIngrediantCol+=`            
            <div class="col-md-3">
                <div class="item">
                    <div class="card">
                        <img src="${ingrediantsMainData[i].strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body card-info">
                        <p class="card-text "> ${ingrediantsMainData[i].strMeal} </p>
                        <p hidden class="idMeal">${ingrediantsMainData[i].idMeal}</p>
                        </div></div></div></div>
            `
}
$('#ingrediantsDetails .row').html(mainIngrediantCol);
}

$(async function(){
    // await singleClickedAreaDetails()
    // await singleAreaDetails()
// async function getData(){
    await mainIngredientApi();
    await onHomeDisplay();
// }
// getData();

function onAsideIconClick(){
        $('.toggled').animate({width:'toggle'},600);
        $('.links').show(300)
        $('.toggledIcon').toggleClass('fa-bars','fa-x');
        $('.toggledIcon').toggleClass('fa-x','fa-bars');
    }
$('.closeIcon').on('click',function () {onAsideIconClick()})

// $('#aside .search').on('click',async function(){
//     $('#search').removeClass("d-none");
//     $('#search').siblings().addClass('d-none');
//     onAsideIconClick()
//     $('.searchByNameInput').on('input',async function(){
//     await searchByName()
//     })
//     $('.searchByFirstLetterInput').on('input',async function(){
//         await searchByLetter()
//         })

// })

$('.back-home , .close-icons img').on('click',function(){window.location.reload();})

$('#aside .categories').on('click',async function(){
    $('#categories').removeClass("d-none");
    $('#categories').siblings().addClass('d-none');
    onAsideIconClick()
    await displayCategory();
    // $('#categories .row').html(categoryCol);
})


async function onHomeDisplay(){
    await displayIngrediants()
    $('#ingrediantsDetails').removeClass('d-none');
    onItemClick();
}


$('#aside .area').on('click',async function(){
$('#area').removeClass("d-none");
$('#area').siblings().addClass('d-none');
onAsideIconClick();
await displayArea();
// $('#area .row').html(areaCol);
    // await singleClickedAreaDetails()
})

$('#aside .ingrediants').on('click',async function(){
$('#ingredients').removeClass("d-none");
$('#ingredients').siblings().addClass('d-none');
onAsideIconClick()
await displayIngrediant();
// $('#ingredients .row').html(ingrediantCol);
await onIngrediantClick();
})

$('#aside .contactUs').on('click',function () {
$('#contactUs').removeClass("d-none");
$('#contactUs').siblings().addClass('d-none');
onAsideIconClick()

})

});

// async function searchByName() {
//     let name= $('.searchByNameInput').val()
//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
//     response = await response.json()
//     let res=await response.meals ;
//     console.log(res);
//     $('#ingrediantsDetails').removeClass("d-none");
//     $('#ingrediantsDetails .row').html(res)
// }


// async function searchByLetter() {
//     let letter= $('.searchByFirstLetterInput').val()
//     term == "" ? term = "a" : "";
//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
//     response = await response.json()
//     let letterres=await response.meals ;
//     console.log(letterres);
//     $('#ingrediantsDetails').removeClass("d-none");
//     $('#ingrediantsDetails .row').html(res)
// }

const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = "";

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
      });
    // Clear search text
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
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
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

// Event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});