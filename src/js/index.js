import Search from './models/Search';
import * as searchView from './views/searchView';

import { elements, renderLoader, clearLoader } from './views/base';

// what is the state of app in given time frame or model?? So state management is here 
/*
-- search object
-- current recipe object
-- liked recipe

*/
const state = {}; // empty everytime page is reloaded

const controlSearch = async () => {
    // get query from the view
    const query = searchView.getInput();
    // console.log(query);
    // TODO

    // if there is a query then serach object

    if (query) {
        // new search object and add it to the state
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

        // render results on UI
        //console.log(state.search.result);
        // clear the loader before we get the data
        clearLoader();
        searchView.renderResults(state.search.result);
    }





}
// adding event listner for the search and goes into the controller



elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // to not allow to reload again 
    controlSearch();

});

elements.searchResPages.addEventListener('click', e => {
    // chose close to our target element
    const btn = e.target.closest('.btn-inline');
    //console.log(e.target);
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        // clear result before adding pagination
        searchView.clearResults();

        searchView.renderResults(state.search.result, gotoPage);
        //console.log(gotoPage);
    }
});

















const search = new Search('pizza');
// console.log(search);

search.getResult();

// here we will put our controller

