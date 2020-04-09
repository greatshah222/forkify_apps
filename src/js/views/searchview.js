// if u want to export many things u need tpo use named module instaed of default
// so name it like add

/*
export const add=(a,b)=>a + b ;
export const multiply=(a,b) =>a *b ;
export const ID =23;

*/


// start project 
import {elements} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = ''; 
// innerHtml since we need to remove whole html content from the search result list
export const clearResults = ()=> elements.searchResList.innerHTML = '';

// for title  char limitation 17 is the test number
const limitRecipeTitle = (title,limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        // split the title into words based on spaca and then use the reduce method
        // example chicken korma dopiaza. Here acc means accumulater
        /*
         first step))acc = 0 ||  so acc +  ||cur.lenght = 6|| so newtitle =[chicken]
        
          second step))acc = 6 ||  so acc +  ||cur.lenght = 11|| so newtitle =['chicken','korma']
          third step))acc = 11 ||  so acc +  ||cur.lenght = 18|| so newtitle =['chicken','korma'] so not pushed here
        */
        title.split(' ').reduce((acc,cur)=>{
            if (acc + cur.length <=limit){
                newTitle.push(cur);
            }
            return acc + cur.length;

        },0);
        // return result
        // join is the opposite of split so it adds the content of array into string separating them using commas
        return `${newTitle.join('')}...`;

    }
    return title;
}

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
    elements.searchResList.insertAdjacentHTML('beforeend',markup);

}


export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}