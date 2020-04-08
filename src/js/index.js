
/*  first way


// while importing the convention is that u write the import and then name which is given here as str so 

// import str 
// now imported from where so 
// ./models/Search.  Here . means this folder and dont write extension like .js


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