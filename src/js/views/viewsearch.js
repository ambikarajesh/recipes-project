import {elements} from './elements';

//get search recipe name
export const getSearchInput = () => elements.searchInput.value;

//clear search input 
export const clearSearchInput = () => {
    elements.searchInput.value = '';
}

//clear previous search display
export const clearSearchDisplay = () => {
    elements.searchDisplay.innerHTML = '';
    elements.buttonDisplay.innerHTML = '';
}

export const hightLightSelected = id => {
    const arrSarRec = Array.from(document.querySelectorAll('.results__link'));
    arrSarRec.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
}

//display search recipes
export const limitTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length>limit){
        title = title.split(' ');
      title.reduce((total, current) => {
        if(total+current.length<=limit){
                newTitle.push(current);
            }
            return total+current.length;
        },0);
        title = newTitle.join(' ') + '...';
        return title; 
    } 
    else{
        return title;
    }  
}
const displayRecipe = (recipe) => {
   const recipeList  = `
   <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
   elements.searchDisplay.insertAdjacentHTML('beforeend',recipeList);   
}

const createButton = (page,type) => {    
        const button = `<button class="btn-inline results__btn--${type}" data-togo="${type==='prev'? page-1 : page+1}">
                            <span>Page ${type==='prev'? page-1 : page+1}</span>
                            <svg class="search__icon">
                                <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
                            </svg>
                        </button>`;
        return button;
}
const pageButton = (page, numOfRecipes, recipesPerPage) => {
    const pages =Math.ceil(numOfRecipes/recipesPerPage);
   
    let button;
    if(page===1&&pages>1){
        //create next button
        button = createButton(page, 'next');
    }
    else if(page<pages){
        // create both button
        button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;
    }
    else if(page===pages&&pages>1){
        //create prev button
        button = createButton(page, 'prev');
    }
    elements.buttonDisplay.insertAdjacentHTML('afterbegin', button);

}
export const displaySearchResult = (recipes, page=1, recipesPerPage = 10) => {
    const start =(page-1)*recipesPerPage;
    const end = page*recipesPerPage;
    //display 10 search recipes per page
    recipes.slice(start, end).forEach(displayRecipe);
    //create page button
    pageButton(page, recipes.length, recipesPerPage);
      
}