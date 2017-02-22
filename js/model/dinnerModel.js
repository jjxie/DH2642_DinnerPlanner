//DinnerModel Object constructor
var DinnerModel = function() {
	
	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu
	var that = this;
	//Stores the number of guests
	var numberOfGuests = 1;

	//Stores the id of each dish in selected menu
	var selectedMenuById = [];

	//Stores each dish of the selected menu
	var selectedMenu = [];

	//Stores the current search type
	var searchType = "";

	//Stores the current filter keyword
	var filterKeyword = '';

	//Stores the id of current concerning dish
	var currentDishId = -1;

	//Stores the detail of current concerning dish
	var currentDish = {
		'id': -1,
		'name': '',
		'image': '',
		'summary':'',
		'ingredients': [],
		'singlePrice': 0,
		'preparation': []
	};

	this.resetCurrentDish = function(){
		this.setCurrentDishId(-1);
		currentDish = {};
	}

	//Writes the number of guests
	this.setNumberOfGuests = function(num) {
		if(num != numberOfGuests){ 
			numberOfGuests = num >= 1 ? num : 1;
			notifyObservers('numberOfGuests');
		}
	}

	//Returns the current number of guests
	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}

	//Writes the search type
	this.setSearchType = function(type) {
		if(type != searchType) {
			searchType = type;
			notifyObservers('searchType');
		}
	}

	//Returns the current search type
	this.getSearchType = function() {
		return searchType;
	}
	
	//Writes the filter keyword
	this.setFilterKeyword = function(filter) {
		if(filter != filterKeyword) {
			filterKeyword = filter;
			notifyObservers('filterKeyword');
		}
	}

	//Returns the current filter keyword
	this.getFilterKeyword = function() {
		return filterKeyword;
	}

	//Writes the current dish id
	this.setCurrentDishId = function(id) {
		if(id != currentDishId) {
			currentDishId = id;
			notifyObservers('currentDish');
		}
	}

	//Returns the current dish id
	this.getCurrentDishId = function() {
		return currentDishId;
	}

	//Returns the current dish
	this.getCurrentDish = function() {
		return currentDish;
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned

	// this.getAllDishes = function (type,filter) {
	// 	var searchResult = [];
	// 	if (type == 'all'){
	// 		searchResult.push(this.getAllDishes('starter', filter));
	// 		searchResult.push(this.getAllDishes('main dish', filter));
	// 		searchResult.push(this.getAllDishes('dessert', filter));
	// 	}
	// 	else{
	// 		searchResult = dishes.filter(function(dish) {
	// 			var found = true;
	// 			if(filter){
	// 				found = false;
	// 				dish.ingredients.forEach(function(ingredient) {
	// 					if(ingredient.name.indexOf(filter)!=-1) {
	// 						found = true;
	// 					}
	// 				});
	// 				if(dish.name.indexOf(filter) != -1)
	// 				{
	// 					found = true;
	// 				}
	// 			}
	// 			return dish.type == type && found;
	// 		});	
	// 	}
	// 	return searchResult;
	// }

	this.getAllDishesInId = function(type, filter, callback, callbackErr) {
		// var searchResultsInId = [];	
		// if (type == 'all'){
		// 	var all = ['starter', 'main dish', 'dessert'];
		// 	for (key in all){
		// 		var temp = this.getAllDishesInId(all[key],filter);
		// 		for (i = 0; i < temp.length; i ++){
		// 			searchResultsInId.push(temp[i]);
		// 		}
		// 	}
		// }
		// var searchResults = dishes.filter(function(dish) {
		// 	var found = true;
		// 	if(filter){
		// 		found = false;
		// 		dish.ingredients.forEach(function(ingredient) {
		// 			if(ingredient.name.indexOf(filter)!=-1) {
		// 				found = true;
		// 			}
		// 		});
		// 		if(dish.name.indexOf(filter) != -1)
		// 		{
		// 			found = true;
		// 		}
		// 	}
		// 	return dish.type == type && found;
		// }); 
		// for (key in searchResults){
		// 	searchResultsInId.push(searchResults[key].id);
		// }

		// return searchResultsInId;

		//API request: Search Recipes
		$.ajax( {
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
			dataType: 'json',
			cache: false,
			type: 'GET',
			headers: {
				'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
			},
			data: {
				query: filter,
				type: type,
				number: 12,
			},
			success: function(data) {
				callback(data['baseUri'], data['results']);
			},
			error: function(data) {
				callbackErr();
			},
		}); 
	}
	
	//Retrieve a dish by ID and set it as current dish
	this.getDishExternal = function(id, callback, callbackErrInfo, callbackErrSum) {
		// console.log("entry");
		// console.log(that.getFullMenu());
		//API request: Get Recipe Information
		$.ajax( {
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id+'/information',
			dataType: 'json',
			cache: false,
			type: 'GET',
			headers: {
				'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
			},
			data: {
				includeNutrition: false,
			},
			success: function(data) {
				// console.log("success entry");
				// console.log(that.getFullMenu());
				currentDish.id = data.id;
				currentDish.name = data.title;
				currentDish.image = data.image;
				currentDish.ingredients = data.extendedIngredients;
				currentDish.singlePrice = that.getSinglePrice(data);
				currentDish.preparation = data.instructions;
				// callback(data);
				//API request: Summarize Recipe
				$.ajax( {
					url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id+'/summary',
					dataType: 'json',
					cache: false,
					type: 'GET',
					headers: {
						'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
					},
					success: function(result) {
						// console.log("second success entry");
						// console.log(that.getFullMenu());
						currentDish.summary = result.summary;
						that.setCurrentDishId(result.id);
						callback(result);
						// console.log("second success exit");
						// console.log(that.getFullMenu());
					},
					error: function(result) {
						callbackErrSum();
					},
				}); 
				// console.log("first success exit");
				// console.log(that.getFullMenu());	
			},
			error: function(data) {
				callbackErrInfo();
			},
			complete: function() {

			}
		}); 

	}

	//Returns a dish from the selected menu
	this.getDishInternal = function(id) {
		for(dishKey = 0; dishKey < selectedMenu.length; dishKey++){
			if(selectedMenu[dishKey].id == id) {
				return dishes[dishKey];
			}
			else{
				alert("Error: no match found.");
			}
		}
	}

	//Returns the dish that is on the menu for selected type
	this.getSelectedDish = function(type) {
		var fullMenu = this.getFullMenu();
		return fullMenu.filter(function(dish) { 
			return dish.type == type;
		});	
	}
	
	//Returns the ingredients of one dish
	this.getIngredients = function(id) {
		var theDish = this.getDishInternal(id);
		return theDish.ingredients;
	}

	//Returns the single price of dish
	this.getSinglePrice = function(data) {
		var ingredients = data.extendedIngredients;
		var singlePrice = 0;
		for (key in ingredients){
			singlePrice += ingredients[key]["amount"] * 1; 
		}
		return singlePrice;
	}

	//Returns all the dishes on the menu in id
	this.getFullMenuInId = function() {
		return selectedMenuById;
	}

	//Returns all the dishes on the menu
	this.getFullMenu = function() {
		return selectedMenu;
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var allIngredients =[];
		for (key in selectedMenuById){
			allIngredients.push(this.getIngredients(selectedMenuById[key]));
		}
		return allIngredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var singleMenuPrice = 0;
		for (TMPkey = 0; TMPkey < selectedMenu.length; TMPkey++){
			singleMenuPrice += selectedMenu[TMPkey].singlePrice;
		}
		return singleMenuPrice * numberOfGuests;
	}

	//Adds the current dish to the menu.
	this.addDishToMenu = function(id) {
		if ((id == currentDishId) && !(that.isOnMenu(id))){
			selectedMenuById.push(id);
			// console.log('before push')
			// console.log(currentDish);
			// console.log(id);
			// console.log(selectedMenuById);
			// console.log(selectedMenu);
			selectedMenu.push(that.getCurrentDish());
			// console.log('after push')
			// console.log(selectedMenu);
			// console.log(id);
			// console.log(currentDish);

			notifyObservers('menuList');	
		}
	}

	//Removes the current dish from the menu.
	this.removeDishFromMenu = function(id) {
		if ((id == currentDishId) && (that.isOnMenu(id))){
			selectedMenuById.splice(selectedMenuById.indexOf(id), 1);
			for (dishNo = 0; dishNo < selectedMenu.length; dishNo++){
				if (id == selectedMenu[dishNo].id){
					selectedMenu.splice(dishNo, 1);
				}
			}
			notifyObservers('menuList');	
		}
	}
	
	//Returns if the current dish is on the menu.
	this.isOnMenu = function(id) {
		var yes = false;
		if(selectedMenuById.indexOf(id) != -1) {
			yes = true;
		}
		return yes;
	}
	//Stores observers;
	var observerList = [];

	//Adds new observer to the array
	this.addObserver = function(observer) {
		observerList.push(observer); 

	}

	//Calls the update method on each of the observers in the array
	var notifyObservers = function(obj) {
		for(thisObserver = 0; thisObserver < observerList.length; thisObserver++){
			observerList[thisObserver].update(obj);
		}
	}





	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
// 	var dishes = [{
// 		'id':1,
// 		'name':'French toast',
// 		'type':'starter',
// 		'image':'toast.jpg',
// 		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
// 		'ingredients':[{ 
// 			'name':'eggs',
// 			'quantity':0.5,
// 			'unit':'',
// 			'price':10
// 		},{
// 			'name':'milk',
// 			'quantity':30,
// 			'unit':'ml',
// 			'price':6
// 		},{
// 			'name':'brown sugar',
// 			'quantity':7,
// 			'unit':'g',
// 			'price':1
// 		},{
// 			'name':'ground nutmeg',
// 			'quantity':0.5,
// 			'unit':'g',
// 			'price':12
// 		},{
// 			'name':'white bread',
// 			'quantity':2,
// 			'unit':'slices',
// 			'price':2
// 		}]
// 	},{
// 		'id':2,
// 		'name':'Sourdough Starter',
// 		'type':'starter',
// 		'image':'sourdough.jpg',
// 		'description':"Here is how you make it... Lore ipsum...",
// 		'ingredients':[{ 
// 			'name':'active dry yeast',
// 			'quantity':0.5,
// 			'unit':'g',
// 			'price':4
// 		},{
// 			'name':'warm water',
// 			'quantity':30,
// 			'unit':'ml',
// 			'price':0
// 		},{
// 			'name':'all-purpose flour',
// 			'quantity':15,
// 			'unit':'g',
// 			'price':2
// 		}]
// 	},{
// 		'id':3,
// 		'name':'Baked Brie with Peaches',
// 		'type':'starter',
// 		'image':'bakedbrie.jpg',
// 		'description':"Here is how you make it... Lore ipsum...",
// 		'ingredients':[{ 
// 			'name':'round Brie cheese',
// 			'quantity':10,
// 			'unit':'g',
// 			'price':8
// 		},{
// 			'name':'raspberry preserves',
// 			'quantity':15,
// 			'unit':'g',
// 			'price':10
// 		},{
// 			'name':'peaches',
// 			'quantity':1,
// 			'unit':'',
// 			'price':4
// 		}]
// 	},{
// 		'id':100,
// 		'name':'Meat balls',
// 		'type':'main dish',
// 		'image':'meatballs.jpg',
// 		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
// 		'ingredients':[{ 
// 			'name':'extra lean ground beef',
// 			'quantity':115,
// 			'unit':'g',
// 			'price':20
// 		},{
// 			'name':'sea salt',
// 			'quantity':0.7,
// 			'unit':'g',
// 			'price':3
// 		},{
// 			'name':'small onion, diced',
// 			'quantity':0.25,
// 			'unit':'',
// 			'price':2
// 		},{
// 			'name':'garlic salt',
// 			'quantity':0.7,
// 			'unit':'g',
// 			'price':2
// 		},{
// 			'name':'Italian seasoning',
// 			'quantity':0.6,
// 			'unit':'g',
// 			'price':3
// 		},{
// 			'name':'dried oregano',
// 			'quantity':0.3,
// 			'unit':'g',
// 			'price':3
// 		},{
// 			'name':'crushed red pepper flakes',
// 			'quantity':0.6,
// 			'unit':'g',
// 			'price':3
// 		},{
// 			'name':'Worcestershire sauce',
// 			'quantity':6,
// 			'unit':'ml',
// 			'price':7
// 		},{
// 			'name':'milk',
// 			'quantity':20,
// 			'unit':'ml',
// 			'price':4
// 		},{
// 			'name':'grated Parmesan cheese',
// 			'quantity':5,
// 			'unit':'g',
// 			'price':8
// 		},{
// 			'name':'seasoned bread crumbs',
// 			'quantity':15,
// 			'unit':'g',
// 			'price':4
// 		}]
// 	},{
// 		'id':101,
// 		'name':'MD 2',
// 		'type':'main dish',
// 		'image':'bakedbrie.jpg',
// 		'description':"Here is how you make it... Lore ipsum...",
// 		'ingredients':[{ 
// 			'name':'ingredient 1',
// 			'quantity':1,
// 			'unit':'pieces',
// 			'price':8
// 		},{
// 			'name':'ingredient 2',
// 			'quantity':15,
// 			'unit':'g',
// 			'price':7
// 		},{
// 			'name':'ingredient 3',
// 			'quantity':10,
// 			'unit':'ml',
// 			'price':4
// 		}]
// 	},{
// 		'id':102,
// 		'name':'MD 3',
// 		'type':'main dish',
// 		'image':'meatballs.jpg',
// 		'description':"Here is how you make it... Lore ipsum...",
// 		'ingredients':[{ 
// 			'name':'ingredient 1',
// 			'quantity':2,
// 			'unit':'pieces',
// 			'price':8
// 		},{
// 			'name':'ingredient 2',
// 			'quantity':10,
// 			'unit':'g',
// 			'price':7
// 		},{
// 			'name':'ingredient 3',
// 			'quantity':5,
// 			'unit':'ml',
// 			'price':4
// 		}]
// 	},{
// 		'id':103,
// 		'name':'MD 4',
// 		'type':'main dish',
// 		'image':'meatballs.jpg',
// 		'description':"Here is how you make it... Lore ipsum...",
// 		'ingredients':[{ 
// 			'name':'ingredient 1',
// 			'quantity':1,
// 			'unit':'pieces',
// 			'price':4
// 		},{
// 			'name':'ingredient 2',
// 			'quantity':12,
// 			'unit':'g',
// 			'price':7
// 		},{
// 			'name':'ingredient 3',
// 			'quantity':6,
// 			'unit':'ml',
// 			'price':4
// 		}]
// 	},{
// 		'id':200,
// 		'name':'Chocolat Ice cream',
// 		'type':'dessert',
// 		'image':'icecream.jpg',
// 		'description':"Here is how you make it... Lore ipsum...",
// 		'ingredients':[{ 
// 			'name':'ice cream',
// 			'quantity':100,
// 			'unit':'ml',
// 			'price':6
// 		}]
// 	},{
// 		'id':201,
// 		'name':'Vanilla Ice cream',
// 		'type':'dessert',
// 		'image':'icecream.jpg',
// 		'description':"Here is how you make it... Lore ipsum...",
// 		'ingredients':[{ 
// 			'name':'ice cream',
// 			'quantity':100,
// 			'unit':'ml',
// 			'price':6
// 		}]
// 	},{
// 		'id':202,
// 		'name':'Strawberry',
// 		'type':'dessert',
// 		'image':'icecream.jpg',
// 		'description':"Here is how you make it... Lore ipsum...",
// 		'ingredients':[{ 
// 			'name':'ice cream',
// 			'quantity':100,
// 			'unit':'ml',
// 			'price':6
// 		}]
// 	}
// 	];

}
