import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';

import { elements, renderLoader, clearLoader } from './views/base';


// quest)  When we declare using const this is block scope, currently state is in global scope. Why are we able to access state within controlSearch function ?. Does this imply that scope chain is being used here .....


// 1. Yeah, it's possible to change/add/delete properties of the object assigned to the constant. Actually, variables declared with const cannot be reassigned, but in case of objects, their properties can be changed. So, it wouldn't be possible to assign another value to the state constant, for example, state = 'Hello' will thros Uncaught TypeError: Assignment to constant variable

// 2. Variables declared with let and const statements are block-scoped, but in JavaScript we can access the variables of the higher scope, so all variables declared in the global scope can be accessed from inside of any function.

// what is the state of app in given time frame or model?? what is the 
/*
-- search object
-- current recipe object
-- liked recipe or shopping list object 
everything is state and we need in one central place or one variable and here it is defined as const state and accessed in this controller:

*/
const state = {}; // empty everytime page is reloaded
// for testing making it global
window.state = state;


/*
---------Search Controller-------
---------Search Controller-------
---------Search Controller-------

*/
const controlSearch = async () => {
    // get query from the view
    const query = searchView.getInput();
   // console.log(query);

    // if there is a query then search object

    if (query) {
        // New search object and add it to the state
        state.search = new Search(query);

        // prepare UI for results
        // clear the input
        searchView.clearInput();
        // clear the result from previous search
        searchView.clearResults();
        // render our loader so import it first and after attach it with parent element which in our case is result and after put in dom 
        renderLoader(elements.searchRes);



        // search for recipes so it gives here a promise since it is async result 
        await state.search.getResult();

        // render results on UI after we recive from api so there is await in above command
        //console.log(state.search.result);
        // clear the loader before we get the data
        clearLoader();
        
        searchView.renderResults(state.search.result);
    }





}
// adding event listner for the search and goes into the controller


// here submit button is used instead of click 
//Note that submit is fired only on the form element, not the button or submit input. (Forms are submitted, not buttons.)"
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // to not allow to reload again because when are clicking that search button it is reloading

    // creating a function that is triggeerd whenever event happens
    controlSearch();

});

elements.searchResPages.addEventListener('click', e => {
    // chose close to our target element becuase we have multiple target element
    // no matter where we click it will always go to .btn-inline
    const btn = e.target.closest('.btn-inline');
    //console.log(e.target);
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        // 10 means base 10 and from 0-9
        // if we had written 2 it means 0 and 1
        // clear result before adding pagination
        searchView.clearResults();
        // render result based on page
        searchView.renderResults(state.search.result, gotoPage);
        //console.log(gotoPage);
    }
});

















// here we will put our controller

/*
---------Recipe Controller-------
---------Recipe Controller-------
---------Recipe Controller-------

*/

// hashchange and this is always added to the window 

const controlRecipe = async () => {
    // get id from the url and replace # so we will only get the id required for our search
    const id = window.location.hash.replace('#', '');

    if (id) {
        // prepare the ui for changes
        recipeView.clearRecipe();
        // render loader means the spinning animation 
        renderLoader(elements.recipe);

        // make active or highlight the dom we are working
        if(state.search) searchView.highlightSelected(id);


        // create new recipe object
        state.recipe = new Recipe(id);

        try {
            // get recipe data and parse ingrediets
            // await because we want to happen in the background and we are getting data from the api
            await state.recipe.getRecipe();
            //console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();


            // calculate servings and time 
            state.recipe.calcTime();
            state.recipe.calcServings();


            // render recipe 

            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }
        catch (error) {
            // alert('something went wrong in the main file ');
            console.log(error);
            alert('error proccessing recipe');

        }


    }


}




/*
---------List Controller-------
---------List Controller-------
---------List Controller-------

*/
const controlList = ()=>{
    // create a list if there is none yet

    if(!state.list) state.list =new List();


    // add each ingredients to the list and UI
    // this is an array so foreach 
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count,el.unit,el.ingredient);
        listView.renderItem(item);
        
    });
}
// Handle delete and update list item event


elements.shopping.addEventListener('click',e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete button 
    if(e.target.matches('.shopping__delete ,  .shopping__delete  *')){
        // delete from state
        state.list.deleteItem(id);

        // delete form the ui
        listView.deleteItem(id);
        // handle the count update
    } else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id,val);
    }

});















// is fired everytime we chnage the hash 
// event dose not happen when we dont change thw hash
window.addEventListener('hashchange', controlRecipe);

// is fired when the page is loaded so that the user dont lose the page data when they reload the page

window.addEventListener('load', controlRecipe);

// since we are adding the different things in sam efunction it can be done in the following ways as well
/*

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));
 */


// Button for the ingredients.Handling recipe button click. We can not use the closest button here so we have test and react accordingly
// here * means any child of btn-decrease
elements.recipe.addEventListener('click', e=>{
    if(e.target.matches('.btn-decrease,.btn-decrease *')){
        // decrease button is clicked
        // no not allow negative serving we put the if conditon 
        if(state.recipe.servings >1){

        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);

        }
    }else if (e.target.matches('.btn-increase,.btn-increase *')){
        // increasebutton is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    } else if(e.target.matches('.recipe__btn--add,.recipe__btn--add *')){
        controlList();
    }
});


window.l= new List();


