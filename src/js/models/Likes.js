export default class Likes{

    constructor(){
        this.likes = [];
        
    }
    addLike(id,title,author,img){
        const like = {id,title,author,img};
        this.likes.push(like);
        // when we change the likes array we want to store it in local storage
        this.persistData();
        return like;

    }
    deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1); 
    // persist data in local storage

    this.persistData();

}
isLiked(id){
    return this.likes.findIndex(el =>el.id === id) !== -1;

}
getNumLikes(){
    return this.likes.length;
}
// here in the localstorage u can only store string 
// The JSON.stringify() method converts a JavaScript object or value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.
/*
console.log(JSON.stringify({ x: 5, y: 6 }));
// expected output: "{"x":5,"y":6}"

console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
// expected output: "[3,"false",false]"

console.log(JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }));
// expected output: "{"x":[10,null,null,null]}"

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// expected output: ""2006-01-02T15:04:05.000Z""


*/
persistData(){
    localStorage.setItem('likes',JSON.stringify(this.likes));
}
// how to read info from the localStorage

readStorage(){
    // here we are returned string and we need to convert back to array 
    const storage =JSON.parse(localStorage.getItem('likes'));
    // here we are restoring the likes from the local storage
    if(storage)this.likes = storage;

}
}
