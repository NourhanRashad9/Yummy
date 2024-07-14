
var rowDataElement = document.querySelector("#rowData");
let submitButton;
var searchContainerElement = document.querySelector("#searchContainer");
$(document).ready(async () => {
    await searchByName("");
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
});

function openSideNav() {
    $(".side-nav-menu").animate({ left: 0 }, 500);
    $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");

    $(".links li").each((i, li) => {
        $(li).animate({ top: 0 }, (i + 5) * 100);
    });
}

$(document).ready(function() {
    closeSideNav();

    $(".side-nav-menu i.open-close-icon").click(() => {
        if ($(".side-nav-menu").css("left") === "0px") {
            closeSideNav();
        } else {
            openSideNav();
        }
    });

   
});

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500);

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({
        top: 300
    }, 500);
}

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500);
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

    $(".links li").each((i, li) => {
        $(li).animate({
            top: 0
        }, (i + 5) * 100);
    });
}

function displayMeals(arr) {
    let cartoona = "";

    arr.forEach(meal => {
        cartoona += `
        <div class="col-md-3">
            <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="" srcset="">
                <div class="layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>`;
    });

    rowData.innerHTML = cartoona;
}

async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".screen").fadeOut(300)

}
function displayMealDetails(meal) {
    searchContainer.innerHTML = "";

    const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
        .map(i => meal[`strIngredient${i}`] ? `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>` : '')
        .join('');

    const tagsStr = (meal.strTags?.split(",") || [])
        .map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`)
        .join('');

    const cartoona = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
            </ul>
            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`;

    rowData.innerHTML = cartoona;
}



