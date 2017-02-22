//DishDetailView Object constructor
var DishDetailView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	//model.getCurrentDish();

  	var that = this;
  	
  	this.goBackButton = container.find('#goBackButton');
  	
  	//Where the dish name locates.
  	this.dishName = container.find('#dishName');  	
  	var popName = function(dish){
  		that.dishName.html(dish.name);
  	}

  	//Where the dish image locates.
  	this.dishImage = container.find('#dishImage');
  	var popImage = function(dish) {
  		that.dishImage.html('');
  		jQuery('<img/>', {
  			src: dish.image,
  			alt: dish.title,
  			class: "img-responsive",
  			style: "width:100%; height:350px",
  		}).appendTo(that.dishImage);
  	}

  	//Where the dish summary locates.
  	this.dishSummary = container.find('#dishSummary');
  	var popSummary = function(dish) {
  		that.dishSummary.html(dish.summary);
  	}

  	//Where the number of guests locates.
  	this.numberOfGuestsO = container.find('#guestNumberOutput');
  	this.numberOfGuestsO.html(model.getNumberOfGuests());

	//Where the dish ingredients locate.
	this.dishIngredients = container.find('#dishIngredients');
	this.dishPrice = container.find('#dishPrice');

	var popIngredientsList = function(dish) {
		that.dishIngredients.html('');
		for(i = 0; i < dish.ingredients.length; i++){
			var ingredient = dish.ingredients[i];
			var tr = $('<tr>');
			var tdQuantity = $('<td>');
			tdQuantity.html([(ingredient.amount * model.getNumberOfGuests()).toFixed(2), ingredient.unit].join(' '));
			tr.append(tdQuantity); 
			var tdName = $('<td>'); 
			tdName.html(ingredient.name);
			tr.append(tdName);
			var tdCurrency = $('<td>'); 
			tdCurrency.html("SEK");
			tr.append(tdCurrency);
			var tdPrice = $('<td>');
			tdPrice.html((ingredient.amount * 1 * model.getNumberOfGuests()).toFixed(2));
			tr.append(tdPrice);
			that.dishIngredients.append(tr);
		}
		that.dishPrice.html((dish.singlePrice * model.getNumberOfGuests()).toFixed(2));
	}

	//The button to add/delete the dish to/from the menu.
	this.setDishButton = container.find('#setDishButton');
	
	var popSetDishButton = function() {
		if(model.isOnMenu(model.getCurrentDishId())) {
			that.setDishButton.html('Remove this dish');
		}
		else {
			that.setDishButton.html('Add this dish');
		}
	}


	//Where the dish preparation locates. 
	//Now it's just dish preparation since there is no preparation in data
	this.dishPreparation = container.find('#dishPreparation');
	var popPreparation = function(dish) {
		that.dishPreparation.html(dish.preparation);
	}

	var popDish = function(dish) {
		popName(dish);
		popImage(dish);
		popIngredientsList(dish);
		popPreparation(dish);
		popSetDishButton();
		popSummary(dish);
	}
	
	//Registers observer.
	model.addObserver(this);

	//Updates this view when being called.
	this.update = function(obj){
		if(obj == 'numberOfGuests' || 'all'){
			popIngredientsList(model.getCurrentDish());
			that.numberOfGuestsO.html(model.getNumberOfGuests());
		}
		if(obj == 'currentDish' || 'all'){
			popDish(model.getCurrentDish());
		}
		if(obj == 'menuList' || 'all'){
			popSetDishButton();
		}
	}
}

