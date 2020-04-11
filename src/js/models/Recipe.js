import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;

    }
    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            //console.log(res);
            // our data is in data.recipe
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;


        } catch (error) {
            console.log(error);
            alert('something went wrong while fetching recipe');
        }
    }
    calcTime() {
        // Assuming that we need 15 for each 3 ingredients
        // numIng = number of ingredients this.length because ingredients is an array
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;


    }

    calcServings() {
        this.servings = 4;
    }

    // for parsing ingredients since they have theri own value like cups sometime and cup cometime
    parseIngredients() {
        // put fist plural and then singular else it wil change again in these unitsLong name
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        // ... it means all content of unitsShort
        const units = [...unitsShort, 'kg', 'g', 'gm', 'ml'];


        const newIngredients = this.ingredients.map(el => {
            // uniform units by replacing the content of unitshort to unitlong
            let ingredient = el.toLowerCase();
            // replace the curreent value stored in the unit with unitsShort[i]
            // here unit is current element
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);

            });

            // remove parantheses and all content inside the parantheses if exist
            // now google by typing js remove parenthesis. AFter replace the content is called regular expression
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');



            // parse ingredients into count unit and ingredients. YOu have to return this is how map method work
            // check if there is unit so converting ingredietn into array

            const arrIng = ingredient.split(' ');
            // we dont know what unit to look at so we use findIndex method
            // findIndex we pass a callback function
            // includes a brand new array method in Es7. it will return true if the element we are passing is  in the array  and false if it is not in units(array)
            // for example includes returns true if there is ounces(for instance) and then it will find the index of that ounces and store in unitIndex

            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            // several possiblity for unitIndex
            // if the index is -1 it means it is not in the array. so it has to be greater than -1.

            let objIng;// this will be the final object which willbe returned
            if (unitIndex > -1) {

                const arrCount = arrIng.slice(0, unitIndex);
                // it means there is a unit
                // example 4 1/2 cups . arrCount is [4,1/2]
                // example 4 cups, arrCount is [4]

                let count;
                // only one number like 4 cups 
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));

                    // we use the replace mehod because in some of our ingredients we have data like (1-1/2 cups) which is not minus so to add them we will replace the minus sign as plus
                }
                // more than one number like 
                // example 4 1/2 cups . 
                // eval means evaluate the string 

                else {
                    // example 4 1/2 cups . arrCount is [4,1/2]
                    // after eval it will be 4.5
                    // join them and then use eval which evaluates them
                    // example of eval [4,1/2] wil turn out to be string "4+1/2" and then eval will evaluate as js code and will do the math and return as 4.5
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count,
                    // here count means count = count
                    unit: arrIng[unitIndex],
                    // slice selects the part of the array and then join back into the string 
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            }
            // this coditions apply if we dont have any unit but there is a possiblilty that it migth have a number and represent for instance 1 bread so to match this condition we need the following conditon
            else if (parseInt(arrIng[0], 10)) {
                // there is no unit but first element is number
                // we dont have any unit
                // we put slice(1) cause ist elemnt is for number used for count here
                // we use join so they dont return an array

                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')

                }

            } else if (unitIndex === -1) {
                // there is no unit and no number in the fist position
                // we put 1 in the count cause tomato sauce = 1 tomato sauce
                // we dont have any unit

                objIng = {
                    count: 1,
                    unit: '',
                    ingredient// this means ingredient is ingredient 
                }
            }

            return objIng;


        });

        this.ingredients = newIngredients;
    }

    updateServings(type) {

        // servings using ternary operator here
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;


        // ingredients
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newServings / this.servings);
            
        });
        this.servings = newServings;

    }
}