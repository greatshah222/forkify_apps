import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;

    }
    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
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
        const units = [...unitsShort, 'kg', 'g','gm','ml'];


        const newIngredients = this.ingredients.map(el => {
            // uniform units by replacing the content of unitshort to unitlong
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);

            });

            // remove parantheses if exist
            // now google by typing js remove parenthesis. AFter replace the content is called regular expression
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');



            // parse ingredients into count unit and ingredients. YOu have to return this is how map method work
            // check if there is unit so converting ingredietn into array
            const arrIng = ingredient.split( ' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if(unitIndex > -1){
                // it means there is a unit
                // example 4 1/2 cups . arrCount is [4,1/2]
                // example 4 cups, arrCount is [4]

                const arrCount = arrIng.slice(0,unitIndex);
                // so
                let count;
                if(arrCount.length ===1){
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    // example 4 1/2 cups . arrCount is [4,1/2]
                    // after eval it will be 4.5
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }
                objIng ={
                    count,
                    unit:arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex + 1).join(' ')
                };
            }
            else if(parseInt(arrIng[0],10)){
                // there is no unit but first element is number
                objIng = {
                    count:parseInt(arrIng[0],10),
                    unit:'',
                    ingredient:arrIng.slice(1).join(' ')

                }

            } else if(unitIndex === -1){
                // there is no unit and no number in the fist position

                objIng = {
                    count:1,
                    unit:'',
                    ingredient// this means ingredient is ingredient 
                }
            }

            return objIng;


        });

        this.ingredients = newIngredients;
    }

    updateServings(type){

        // servings 
        const newServings = type ==='dec' ? this.servings - 1 : this.servings +1 ;


        // ingredients
        this.ingredients.forEach(ing => {
           ing.count = ing.count * (newServings/ this.servings); 
        });
        this.servings =newServings;

    }
}