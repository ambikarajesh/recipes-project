export default class Likes {
    constructor(){
        this.likes = [];
    }
    addlikes(id,title,author,img){
        let like ={
            id:id,
            title:title,
            author:author,
            image:img
        }
        this.likes.push(like);
        //store add like in localStorage
        this.storeData();
        return like;
    }
    deleteLikes(id){
        const Index = this.likes.findIndex(el=>el.id===id);
        this.likes.splice(Index,1);
        //store delete like in localStorage
        this.storeData();
    }
    isLiked(id){
        return this.likes.findIndex(el=>el.id===id)!==-1;
    }
    totalLikes(){
        return this.likes.length;
    }
    //store all likes in localStorage 
    storeData(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }
    //store from localStorage to likes
    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage){
            this.likes = storage;
        }
    }
};