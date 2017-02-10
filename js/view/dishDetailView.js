//DishDetailView Object constructor
var DishDetailView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	var that = this;
  	
  	//Where the dish name locates.
  	this.dishName = container.find('#dishName');  	
  	var popName = function(dish){
  		that.dishName.html(dish.name);
  	}

  	//Where the dish image locates.
  	var imgPath = 'images/'
  	this.dishImage = container.find('#dishImage');
  	var popImage = function(dish) {
  		that.dishImage.html('');
  		jQuery('<img/>', {
  			src: imgPath.concat(dish.image),
  			alt: dish.name,
  		}).appendTo(that.dishImage);
  	}

  	//Where the dish description locates.
  	this.dishDescription = container.find('#dishDescription');
  	var popDescription = function(dish) {
  		that.dishDescription.html(dish.description);
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
			tdQuantity.html([(ingredient.quantity * model.getNumberOfGuests()).toFixed(2), ingredient.unit].join(' '));
			tr.append(tdQuantity); 
			var tdName = $('<td>'); 
			tdName.html(ingredient.name);
			tr.append(tdName);
			var tdCurrency = $('<td>'); 
			tdCurrency.html("SEK");
			tr.append(tdCurrency);
			var tdPrice = $('<td>');
			tdPrice.html(ingredient.price * model.getNumberOfGuests());
			tr.append(tdPrice);
			that.dishIngredients.append(tr);
		}
		that.dishPrice.html(model.getSinglePrice(dish.id) * model.getNumberOfGuests());

	}


	//Where the dish preparation locates. 
	//Now it's just dish preparation since there is no preparation in data
	this.dishPreparation = container.find('#dishPreparation');
	var popPreparation = function(dish) {
		that.dishPreparation.html(dish.description);
	}

	var popDish = function(dish){
		popName(dish);
		popImage(dish);
		popIngredientsList(dish);
		popDescription(dish);
		popPreparation(dish);
	}
	popDish(model.getDish(model.getCurrentDishId()));
	
	//Registers observer.
	model.addObserver(this);

	//Updates this view when being called.
	this.update = function(obj){
		if(obj == 'numberOfGuests'){
			popIngredientsList(model.getDish(model.getCurrentDishId()));
			that.numberOfGuestsO.html(model.getNumberOfGuests());
		}
		if(obj == 'currentDish'){
			popDish(model.getDish(model.getCurrentDishId()));
		}
	}
}

