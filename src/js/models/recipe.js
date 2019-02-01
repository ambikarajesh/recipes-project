import axios from 'axios';
import {key} from '../config'

//get recipes from food2fork website...
export default class Recipe{
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        const url=`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`;
        
        await axios.get(url)
        .then(res => {
            this.title = res.data.recipe.title;
            this.image = res.data.recipe.image_url;
            this.author = res.data.recipe.publisher;
            this.ingredients = res.data.recipe.ingredients;
            this.url = res.data.recipe.source_url;
            //console.log(res);
        })
        .catch(err => console.log(err));
    }
    calcPrepareTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods*15;
    }
    calcServing(){
       const serving  = 4;
       this.serving = serving;
    }
    parseIngredients(){
        const Long = ['teaspoons', 'teaspoon', 'cups', 'ounces', 'ounce', 'tablespoons', 'tablespoon', 'pounds','packages', 'packages', 'jars', 'jar'];
        const Short = ['tsp', 'tsp', 'cup', 'oz', 'oz', 'tbsp', 'tbsp', 'pound','pkg','pkg', 'jar', 'jar'];
        const newIngredients = this.ingredients.map((Ingredient) => {
          Ingredient = Ingredient.toLowerCase();
          Long.forEach((str, i)=> {
            //replace units in short notation
            Ingredient = Ingredient.replace(str,Short[i]);            
          })
          //replace parantheses
          Ingredient = Ingredient.replace(/ *\([^)]*\) */g, " ");
          //store object like count, unit, ingredients
          let obj;
          let arrIngt = Ingredient.split(' ');    
          let unitIndex = arrIngt.findIndex(el => Short.includes(el));
          if(unitIndex===-1){
            // no unit, no count
            let count=1;
            if(parseInt(arrIngt[0])){
               count = parseInt(arrIngt[0]);
               Ingredient = arrIngt.slice(1,arrIngt.length).join(' ');
             }
              obj={
                count:count,
                unit:'',
                Ingredient:Ingredient
              };
          }
          else{
            //unit
            if(unitIndex===1){
                arrIngt[0] = arrIngt[0].replace('-','+');
                let count = eval(arrIngt[0]);
              obj={
                  count:count,
                  unit:arrIngt[unitIndex],
                  Ingredient:arrIngt.slice(unitIndex+1,arrIngt.length).join(' ')
              };
            }else if(unitIndex===2){
              let unitJoin;
              if(arrIngt[0]===''){
                unitJoin = eval(arrIngt[1]);
              }else{
                 unitJoin = eval(arrIngt[0]+'+'+arrIngt[1]);
              }       
              obj={
                  count:unitJoin,
                  unit:arrIngt[unitIndex],
                  Ingredient:arrIngt.slice(unitIndex+1,arrIngt.length).join(' ')
              };
            }      
          }
          return obj;
        })
        this.ingredients = newIngredients;
      }
      updateServing(type){
        //update serving
            const updatedServing = type==='increase'? this.serving+1 : this.serving - 1;

        //update Ingredients
        this.ingredients.forEach(Ingredient =>{
            Ingredient.count = Ingredient.count*(updatedServing/this.serving)
        })

        this.serving = updatedServing;

    }
    
};

