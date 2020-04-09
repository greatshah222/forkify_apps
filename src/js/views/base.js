// for dom element not to make page messy



export const elements = {
    searchForm:document.querySelector('.search'),
    searchInput:document.querySelector('.search__field'),
    searchRes:document.querySelector('.results'),
    searchResList:document.querySelector('.results__list'),
    searchResPages:document.querySelector('.results__pages')
};

export const elementStrings = {
    loader:'loader'
};


// building spinner for different aspect
// we are passing the loader in the paren t element 

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
    if (loader) loader.parentElement.removeChild(loader);
};
