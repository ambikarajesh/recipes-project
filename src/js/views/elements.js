// all elements
export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchDisplay: document.querySelector('.results__list'),
    searchDisplayParent: document.querySelector('.results'),
    buttonDisplay: document.querySelector('.results__pages'),
    recipeDisplay:document.querySelector('.recipe'),
    shopList:document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList:document.querySelector('.likes__list')
}
//spin loader elements
export const elementLoader = {
    loader : 'loader'
}

//display spin loader in search display during get data from website
export const displayLoader = (parent) => {
    const loader = `
        <div class='${elementLoader.loader}'>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
}

// remove spin loader after get data from website
export const removeLoader = () => {
    const removeLoader = document.querySelector(`.${elementLoader.loader}`)
    if(removeLoader){
        removeLoader.parentElement.removeChild(removeLoader);
    }
}