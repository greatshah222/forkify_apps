// if u want to export many things u need tpo use named module instaed of default
// so name it like add

/*
export const add=(a,b)=>a + b ;
export const multiply=(a,b) =>a *b ;
export const ID =23;

*/


// start project 
import { elements, renderLoader } from './base';

export const getInput = () => elements.searchInput.value;
// here we put the curly bracket because we are doing nothing in this arrow function and it might just return the first part
export const clearInput = () => {
    elements.searchInput.value = '';
};
// innerHtml since we need to remove whole html content from the search result list
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};
// to make active the class we are using for css 
export const highlightSelected = id => {
    document.querySelector(`a[href="#${id}"]`).classList.add('.results__link--active');
};


// for making the title less in the main page 
// for title  char limitation 17 is the test number. limit= 17 is the default parameter which can be changed later if u wish
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        // split the title into words based on space and then use the reduce method.Reuce method has the accumulator
        //Remeber it becomes an array.
        // example chicken korma dopiaza. Here acc means accumulater
        /*
         first step))acc = 0 ||  so acc +  ||cur.lenght = 6|| so newtitle =[chicken]
        
          second step))acc = 6 ||  so acc +  ||cur.lenght = 11|| so newtitle =['chicken','korma']
          third step))acc = 11 ||  so acc +  ||cur.lenght = 18|| so newtitle =['chicken','korma'] so not pushed here
        */
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;

        }, 0);
        // return result in array so we have to join it and we use .join
        // join is the opposite of split so it adds the content of array into string separating them using spaces that is why we have join('')}
        return `${newTitle.join('')}...`;

    }
    return title;
}



/*
 This is the easiest method to limit character by using function expression which i found in google 

*/
//  const limitRecipeTitle = (title) =>{
//     return title.replace(/^(.{17}[^\s]*).*/, "$1"); 
// };



// here we dont need to write export in this function because we are not using this function outside this page
const renderRecipe = recipe => {
    const markup = `
    <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="{recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    
    
    `;
    // now rendering into dom
    // insertAdjacentHtml(position,text)
    // check internet to check where to place insertAdjacentHTML
    elements.searchResList.insertAdjacentHTML('beforeend', markup);

};
// this function is for render function
// type: 'prev' or 'next'
// data-goto=${type === 'prev' ? page - 1 : page + 1} will be used later to handle event 
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;



// ceil round to next integer 4.4 is 5 not 4 here

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // only btn to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // both button
        button = `
        ${ createButton(page, 'prev') }
        ${ createButton(page, 'next') }`

        ;

    } else if (page === pages && pages > 1) {
        // only btn to go to previous pages
        button = createButton(page, 'prev');



    }
    // now inserting button in our html 
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);

}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // not display all 30 but according to our pagination which is 10 for now 
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // here recipes is the array of 30 object to now we can use the slice method to copy shallow portion of array 
    // one function for one single task so we created a function called renderRecipe
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination button
    renderButtons(page,recipes.length,resPerPage);
};