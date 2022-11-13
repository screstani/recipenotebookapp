//Query Selectors
const recipeForm = document.querySelector('#recipe-form');
const recipeContainer = document.getElementById('#recipe-container');
let listItems = [];

//FUNCTIONS
function handleFormSubmit(e) {
    e.preventDefault();
    const name = DOMPurify.sanitize(recipeForm.querySelector('#name').value);
    const ingredients = DOMPurify.sanitize(recipeForm.querySelector('#ingredients').value);
    const instructions = DOMPurify.sanitize(recipeForm.querySelector('#instructions').value);
    const preptime = DOMPurify.sanitize(recipeForm.querySelector('#preptime').value);
    const level = DOMPurify.sanitize(recipeForm.querySelector('#level').value);
    const newRecipe = {
        name,
        ingredients,
        instructions,
        preptime,
        level,
        id: Date.now(),
    }
    listItems.push(newRecipe);
    e.target.reset();
    recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));
}

function displayRecipes() {
    const tempString = listItems.map(item => `
        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm border-primary">
                <div class="card-header py-3 text-white bg-primary border-primary">
                    <h4 class="my-0">${item.name}</h4>
                </div>
                <div class="card-body">
                    <ul class="text-start">
                        <li><strong>Ingredients: </strong>${item.ingredients}</li>
                        <li><strong>Instructions: </strong>${item.instructions}</li>
                        <li><strong>Preparation Time: </strong>${item.preptime}</li>
                        <li><strong>Difficulty: </strong>${item.level}</li>
                    </ul>
                    <button class="btn btn-lg btn-outline-danger" aria-label="Delete ${item.name}"
                     value="${item.id}">Delete Recipe</button>
                </div>
            </div>
        </div>
        `).join('');
    recipeContainer = tempString;
}

function mirrorStateToLocalStorage() {
    localStorage.setItem('recipeContainer.list', JSON.stringify(listItems));
}

function loadInitialUI() {
    const tempLocalStorage = localStorage.getItem('recipeContainer.list');
    if(tempLocalStorage === null || tempLocalStorage === []) return;
    const tempRecipes = JSON.parse(tempLocalStorage);
    listItems.push(...tempRecipes);
    recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));
}

function deleteRecipeFromList(id) {
    listItems = listItems.filter(item => item.id !== id);
    recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));
    }


function setupTabs () {
    document.querySelectorAll(".tabs__button").forEach(button => {
        button.addEventListener("click", () => {
            const sideBar = button.parentElement;
            const tabsContainer = sideBar.parentElement;
            const tabNumber = button.dataset.forTab;
            const tabToActivate = tabsContainer.querySelector(`.tabs__content[data-tab="${tabNumber}"]`);
        
            sideBar.querySelectorAll(".tabs__button").forEach(button => {
                button.classList.remove("tabs__button--active");
            });

            tabsContainer.querySelectorAll(".tabs__content").forEach(tab => {
                tab.classList.remove("tabs__content--active");
            });

            button.classList.add("tabs__button--active");
            tabToActivate.classList.add("tabs__content--active");

        });
    });
}

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', setupTabs);
recipeForm.addEventListener('submit', handleFormSubmit);
recipeContainer.addEventListener('refreshRecipes', displayRecipes);
recipeContainer.addEventListener('refreshRecipes', mirrorStateToLocalStorage);
recipeContainer.addEventListener('click', loadInitialUI);
window.addEventListener('DOMContentLoaded', loadInitialUI);
recipeContainer.addEventListener('click', (e) => {
    if(e.target.matches('.btn-outline-danger')){
        deleteRecipeFromList(Number(e.target.value));
    };
})
