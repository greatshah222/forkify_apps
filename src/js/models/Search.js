

// starting with defualt export


// export default 'i am an export string';


/*  first way of importing (from her to below . the above codes are for export)


// while importing the convention is that u write the import and then name which is given here as str so 

//  1) import str 
// 2) now imported from where so 
// 3 ) ./models/Search.  Here . means this folder and dont write extension like .js


import str from './models/Search';

*/

/* Second way


// now importing multiple things 
// we need to use the same name to import and export. if u want to change the name u can do as foolows. After theat in the console.log part u can use a and m instead of add and multiply
// import {add as a, multiply as m,ID} from           './views/searchview';


import {add, multiply,ID} from './views/searchview';


console.log(`using imported function ${add(ID,2)} and ${multiply(2,ID)}. ${str}`)

*/
/*   3rd part 
// now the 3rd way of importing is given below we need to give name again after * ( all) so name is here searchView

import * as searchView from './views/searchview';


console.log(`using imported function ${searchView.add(searchView.ID,2)} and ${searchView.multiply(2,searchView.ID)}. ${str}`)



*/





// project start 
import axios from 'axios';// no need to define path because it is installed and is auto done.convention is to give the same name as the package 

// using class to define data model. so exporting class and classname

export default class Search{
    // now add the constructor method while adding class
    constructor(query){
        this.query = query;

    }
    // we are adding async because it is async methof of this class
    async getResult(){
    // here we are using axiom instead of fetch because fetch migght not be recognized by older browser . so install it first from the terminal 

    // we have now installed the package so now we need to import it

    // it automatically returns json so no need to convert it. No api or proxy required for us inm this project
    try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        // this.query because query is already passed to the function before

        this.result= res.data.recipes;// it is in the console of data the name recipes
    
        // console.log(this.result);
    } catch (error)
    {
        alert(error);
    }   
}
}







