import axios from 'axios';
import {key} from '../config'

//get recipes from food2fork website...
export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResult(){
        const url=`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`;
        // try{
        //         const res = await axios(url);
        //         this.result = res.data.recipes;
        // }
        // catch(err){
        //     console.log(err)
        // }
        await axios.get(url)
        .then(res => this.result = res.data.recipes)
        .catch(err => console.log(err));
    }
};
