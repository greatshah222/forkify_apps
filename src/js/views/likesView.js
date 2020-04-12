import { elements } from './base';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    // here we are selcting the item which herin our case is .recipe__love use and then setting the href attribute and then adding our iconString
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    // icons.svg#icon-heart-outlined
};
// the like icon on the right hand of the page will be displayed only if there is likes which is done by changing the visiblity property of the icon
export const toggleLikeMenu = numLikes =>{
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible': 'hidden';

};

export const renderLike = like =>{
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
`;
elements.likesList.insertAdjacentHTML('beforeend', markup);
};
// here we have (`.likes__link[href*="${id}"]`) not 'a[href*="${id}"] because we dont want to select all but only with the likes link class
// we dont just want to remove link but the whole content so put .parentElement
export const deleteLike = id =>{
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
}
