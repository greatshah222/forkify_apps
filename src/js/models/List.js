import uniqid from 'uniqid';

export default class List {

    constructor() {
        // all item array will be saved here
        this.items = [];
    }
    // here uniqid() will create an automatic id so we dont have to create it auto matically
    // it is called uniqid()
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        //console.log(id); 

        this.items.push(item);
        return item;
    }
    deleteItem(id) {
        // [2,4,6] splice(1,2)-> returns [4,6] original array is [2]

        // [2,4,6] slice(1,2)-> returns 4, original array is (2,4,6) so doesnot mutate the array. slice method doesnot take its last ending parameter here we write it (1,2) but it will only take (1,1) the last parameter of end is not taken

        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1); // we only want to delete 1 element
    }
    // update only count but not unit or ingredient
    // just update count but not unit or ingredient
    // here find method returns the value of the first element in the provided array that satisfies the provided testing function.

    /*

    const array1 = [5, 12, 8, 130, 44];

    const found = array1.find(element => element > 10);

    console.log(found);
//  expected output: 12



     */
    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;

    }
}