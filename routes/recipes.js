var express = require('express');
var router = express.Router();


let recipes = [
  {
    id:1,
    name: 'Chicken Fajitas',
    ingredients: ['chicken', 'bell peppers', 'onions', 'fajita seasonin'],
    description:'Lorem ipsum solorem esta es la descripcion de la receta de chicken fajitas ',
  },
  {
    id:2,
    name: 'Tacos de Carnitas',
    ingredients: ['pork', 'onions', 'garlic', 'lard'],
    description:'Lorem ipsum solorem esta es la descripcion de la receta de tacos de carnitas',
  },
  {
    id:3,
    name: 'Enchiladas Rojas',
    ingredients: ['chicken', 'red sauce', 'cheese', 'tortillas'],
    description:'Lorem ipsum solorem esta es la descripcion de la receta de enchiladas rojas',
  },
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(recipes);

});


router.post('/', function(req, res, next) {
  let {name, ingredients, description} = req.body;
  
  if(!name || !ingredients || !description){
    return res.status(400).json({message: 'name, ingredients and description are required'})
  }

  let newRecipe = {
    id: recipes.length + 1,
    name,
    ingredients,
    description
    }
  recipes.push(newRecipe);
  res.json(newRecipe);
});

router.put('/update/:id', function(req, res, next){
  let id = req.params.id;
  let {name, ingredients, description} = req.body;
  let recipe = recipes.find(recipe => recipe.id === parseInt(id));
  if(!recipe){
    return res.status(404).json({message: 'recipe not found'})
  }
  if(name) recipe.name = name;
  if(ingredients) recipe.ingredients = ingredients;
  if(description) recipe.description = description;
  res.json(recipe); 
})

router.delete('/delete/:id', function(req,res,next){
  let id = req.params.id;
  let recipe = recipes.find(recipe => recipe.id === parseInt(id));
  if(!recipe){
    return res.status(404).json({message: 'recipe not found'})
  }
  let index = recipes.indexOf(recipe);
  recipes.splice(index, 1);
  res.json({message: 'recipe deleted'})
})

//get by id
router.get('/:id', function(req, res, next){
  let id = req.params.id;
  let recipe = recipes.find(recipe => recipe.id === parseInt(id));
  if(!recipe){
    return res.status(404).json({message: 'recipe not found'})
  }
  res.json(recipe);
})




module.exports = router;
