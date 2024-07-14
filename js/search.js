function searchInputs() {
    const searchInputTemplate = (onkeyupHandler, placeholder, maxlength = '') => `
        <div class="col-md-6">
            <input 
                onkeyup="${onkeyupHandler}(this.value)" 
                class="form-control bg-transparent text-white" 
                type="text" 
                placeholder="${placeholder}" 
                ${maxlength ? `maxlength="${maxlength}"` : ''}
            >
        </div>`;

    searchContainer.innerHTML = `
        <div class="row py-4">
            ${searchInputTemplate('searchByName', 'Search By Name')}
            ${searchInputTemplate('searchByFLetter', 'Search By First Letter', 1)}
        </div>`;

    rowData.innerHTML = "";
}

async function searchByName(term) {
    closeSideNav();
    rowData.innerHTML = "";
    $(".screen").fadeIn(300);

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        response = await response.json();

        response.meals ? displayMeals(response.meals) : displayMeals([]);
    } catch (error) {
        console.error("Error fetching meals:", error);
        displayMeals([]); 
    } finally {
        $(".screen").fadeOut(300);
    }
}


async function searchByFLetter(term) {
    closeSideNav();
    rowData.innerHTML = "";
    $(".screen").fadeIn(300);

    term = term || "a"; 

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
        response = await response.json();

        response.meals ? displayMeals(response.meals) : displayMeals([]);
    } catch (error) {
        console.error("Error fetching meals by first letter:", error);
        displayMeals([]); 
    } finally {
        $(".screen").fadeOut(300);
    }
}





