import uniqueid from 'uniqid';

export default class ShopList {
    constructor(){
        this.items = [];
    }
    addItem(count, unit, ingredient){
        let item = {
            id:uniqueid(),
            count:count,
            unit:unit,
            ingredient:ingredient

        }
        this.items.push(item);
        return item;
    }
    deleteItem(id){
        const Index = this.items.findIndex(item=>item.id===id);
        this.items.splice(Index,1);       
    }
    updateItemsCount(id,newCount){        
        this.items.find(item=>item.id===id).count = newCount;
        //console.log(newCount)
    }
}