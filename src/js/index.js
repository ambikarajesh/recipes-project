import Search from './models/search';
import Recipe from './models/recipe';
import ShopList from './models/shopList';
import Likes from './models/likes';
import * as viewSearch from './views/viewsearch';
import * as viewRecipe from './views/viewrecipe';
import * as viewShopList from './views/shoplistview';
import * as viewLikes from './views/viewlikes';
import {elements, displayLoader,removeLoader} from './views/elements';

// state variable fro storing current data
const state = {};

//search object
const controlSearch = async ()=> {
    //1. get search data from view
    const query = viewSearch.getSearchInput();

    //2. add to current search object to state
    state.curSearch = new Search(query);

    //3. clear search input in UI 
    viewSearch.clearSearchInput();
    viewSearch.clearSearchDisplay();
    displayLoader(elements.searchDisplayParent);

    try{
    //4. get all search recipes
    await state.curSearch.getResult();   
    

    //5. display recipes in UI 
    removeLoader();
    viewSearch.displaySearchResult(state.curSearch.result);
    }
    catch(err){        
        alert('going wrong in search recipes getting....')
        removeLoader();
    }
    
}

elements.searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    controlSearch();
})

elements.buttonDisplay.addEventListener('click', (e) =>{
    const clickBtn = parseInt(e.target.closest('.btn-inline').dataset.togo);
    //clear search preious display
    viewSearch.clearSearchDisplay();
    
    //display current click page search recipes    
    viewSearch.displaySearchResult(state.curSearch.result, clickBtn);

})


// recipe object

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');;
    if(id){
        //1. prepare for UI change
        viewRecipe.clearRecipeDisplay();
        displayLoader(elements.recipeDisplay);
        if(state.curSearch){
            viewSearch.hightLightSelected(id);
        }
        //2. create recipe object
        state.recipe = new Recipe(id);
        try{
            //3. get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //4. calculate serving and preparation time
            state.recipe.calcPrepareTime();
            state.recipe.calcServing();
            //5. display recipe information
            removeLoader();
            viewRecipe.displayRecipe(state.recipe, state.likes.isLiked(id));
            console.log(state);
        }
        catch(err){
            alert('going wrong in recipe getting....')
        }
    }
}

['hashchange', 'load'].forEach( (event) => window.addEventListener(event, controlRecipe));

//control shop list

const controlShopList = () =>{
    if(!state.shoplist){
        //add item to state and UI
        state.shoplist = new ShopList();
    }
        state.recipe.ingredients.forEach(el => {
            const itemadd = state.shoplist.addItem(el.count, el.unit, el.Ingredient);    
            viewShopList.addItemShop(itemadd);        
        })
        //delete item to state and UI
        elements.shopList.addEventListener('click', e => {

            const id = e.target.closest('.shopping__item').dataset.itemid; 
                    
            if(e.target.matches('.shopping__delete, .shopping__delete *')){
                    
                state.shoplist.deleteItem(id);
                viewShopList.deleteItemShop(id);
            }  
            if(e.target.matches('.shopping__count-value, .shopping__count-value *')){
                //update count
                let val = parseFloat(e.target.value);
                state.shoplist.updateItemsCount(id, val);
            }
            
        })
    }

//control likes
const controlLikes = () => {
    
    if(!state.likes){
        state.likes = new Likes();        
    }
    
    const currentId = state.recipe.id;
    if(!state.likes.isLiked(currentId)){
        //add like to state
        const newLikes = state.likes.addlikes(currentId, state.recipe.title,state.recipe.author,state.recipe.image);
        viewLikes.displayLikes(newLikes)
        // toggle button change
        viewLikes.ToggleChange(true);
        //console.log(state)

    }else{
        //remove like from state        
        state.likes.deleteLikes(state.recipe.id);
        viewLikes.removeLikes(currentId);
        // toggle button change
        viewLikes.ToggleChange(false);
    }
    viewLikes.LikesMenu(state.likes.totalLikes())
    //console.log(state.likes)
    
   
}

elements.recipeDisplay.addEventListener('click', (e)=>{
    if(e.target.matches('.btn-increase, .btn-increase *')){
        //console.log('increase');
        
            state.recipe.updateServing('increase');
            viewRecipe.updateServingSize(state.recipe);
    }else if(e.target.matches('.btn-decrease, .btn-decrease *')){
        //console.log('decrease');
        if(state.recipe.serving>1){
            state.recipe.updateServing('decrease');
            viewRecipe.updateServingSize(state.recipe);
        }
    }
    else if(e.target.matches('.recipe__btn-add, .recipe__btn-add *')){
        controlShopList();
    }
    else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }
    //console.log(state.recipe)
})

// store from localStorage to state and also in display
window.addEventListener('load', ()=>{
    state.likes = new Likes();
    state.likes.readStorage();
    viewLikes.LikesMenu(state.likes.totalLikes())
    state.likes.likes.forEach(like => viewLikes.displayLikes(like));
})