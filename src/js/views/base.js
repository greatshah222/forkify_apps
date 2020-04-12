// for dom element not to make page messy



export const elements = {
    searchForm:document.querySelector('.search'),
    searchInput:document.querySelector('.search__field'),
    searchRes:document.querySelector('.results'),
    searchResList:document.querySelector('.results__list'),
    searchResPages:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shopping:document.querySelector('.shopping__list'),
    likesMenu:document.querySelector('.likes__field'),
    likesList:document.querySelector('.likes__list')



};
// for clearing the loader 
export const elementStrings = {
    loader:'loader'
};


// building spinner for different aspect
// we are passing the loader in the parent element 
// loader is the class in the css

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};
// getting rod of the loader. we can select directly loader because it is still processing
// deleting we have to go to parent element and then delete its child
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    // checking if it exist because it might not be there before clicking our button and we have to remove the child we have to go to pareent element and then remove its child
    if (loader) 
    loader.parentElement.removeChild(loader);
};
