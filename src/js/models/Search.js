

// starting with defualt export


// export default 'i am an export string';


/*  first way of importing (from here to below . the above codes are for export)


// while importing the convention is that u write the import name  and the package  name  same for example import axios from 'axios; now other way  

import str from './models/Search';
//  1) import str 
// 2) now imported from where so 
// 3 ) ./models/Search.  Here . means this folder and dont write extension like .js

*/

/* Second way


// now importing multiple things 
// we need to use the same name to import and export. if u want to change the name u can do as follows. After that in the console.log part u can use a and m instead of add and multiply
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

export default class Search {
    // now add the constructor method while adding class
    constructor(query) {
        this.query = query;

    }
    // we are adding async because it is async method  of this class and this is new way of adding mehod to class instead of the prototype property used in E5 class constructor
    // here getResult is the method of an object that is why we need to write this.query since it will not get the property of this from its parent
    async getResult() {
        // here we are using axiom instead of fetch because fetch migght not be recognized by older browser . so install it first from the terminal 

        // we have now installed the package so now we need to import it

        // it automatically returns json so no need to convert it. No api or proxy required for us inm this project
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            // this.query because query is already passed to the function before. When u console.log(res) u will get all the info from this search property and from there we knew the data name was recipes
            //console.log(res);


            // The result property of the Search object was created and initialized with a value in one line. That's why you haven't seen it declared before. that is why we have this.result

           

            // We're declaring and initializing the result property with a value in one line. Let's say you have some object

            // const obj = {};

            // obj.result = 'some result';
            // you can add a property to an object using dot notation, like this obj.result = 'some result';


            this.result = res.data.recipes;// it is in the console of data the name recipes

            console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}







