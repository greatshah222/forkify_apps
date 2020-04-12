
import { elements, renderLoader } from './base';
import {Fraction} from 'fractional';
import fracty from 'fracty';

export const clearRecipe = () =>
elements.recipe.innerHTML = '';
;


const formatCount = count =>{
    if(count){
        // example= 2.5 which will be 5/2 and in our project it will be  2 1/2
        // count = 0.5 which will bbe 1/2
        // seperate the integer part 

// we are converting into string so that we can split it and now it will become an array
// we use map to chsnge into number
        const[int,dec] = count.toString().split('.').map(el=> parseInt(el,10));

        if(!dec) 
        return `${fracty(count)}`;


        if(int === 0) {
            // using the fractional library
            const fr = new Fraction(count);

         return `${(fr.numerator)}/${(fr.denominator)}`;
        } else {
            const fr = new Fraction(count-int);
            return `${int}${(fr.numerator)}/${(fr.denominator)}`;

        }


    }
    return '?';

};

// here in this constIngredient 
// in the part             
// ${ingredient.ingredient}  it will return an array so we have to join it to make it a string which is done below in the function renderRecipe

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient} 
            
</div>
</li>
`;

// here isLiked is pass to check whether the recipe has been liked or not
export const renderRecipe = (recipe,isLiked) => {
    const markup = `
        <figure class="recipe__fig">
        <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
</figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text">servings </span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
            </ul>


            <button class="btn-small recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
        <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
    </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div> `
;

// rendereing now

elements.recipe.insertAdjacentHTML('afterbegin',markup);
};


export const updateServingsIngredients = recipe => {
    // Update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // Update ingredeints
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
};