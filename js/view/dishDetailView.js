//DishDetailView Object constructor
var DishDetailView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	var dishId = 2;
  	var dish = model.getDish(dishId); //should use the very dish seleceted

  	//Where the dish name locates.
  	this.dishName = container.find('#dishName');  	
  	this.dishName.html(dish.name);

  	//Where the dish image locates.
  	var imgPath = 'images/'
  	this.dishImage = container.find('#dishImage');
  	jQuery('<img/>', {
  		src: imgPath.concat(dish.image),
  		alt: dish.name,
  	}).appendTo(dishImage);

  	//Where the dish description locates.
  	this.dishDescription = container.find('#dishDescription');
  	this.dishDescription.html(dish.description.substring(0,100).concat('...'))
  	
  	//Where the number of guests locates.
  	this.numberOfGuestsO = container.find('#guestNumberOutput');
  	this.numberOfGuestsO.html(model.getNumberOfGuests());

	//Where the dish ingredients locate.
	this.dishIngredients = container.find('#dishIngredients');
	for(i = 0; i < dish.ingredients.length; i++){
		var ingredient = dish.ingredients[i];
		var tr = $('<tr>');
		var tdQuantity = $('<td>');
		tdQuantity.html([ingredient.quantity * model.getNumberOfGuests(), ingredient.unit].join(' '));
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
		this.dishIngredients.append(tr);
	}
	//Where the dish price locates.
	this.dishPrice = container.find('#dishPrice');
	this.dishPrice.html(model.getSinglePrice(dishId) * model.getNumberOfGuests());

	//Where the dish preparation locates. 
	//Now it's just dish preparation since there is no preparation in data
	this.dishPreparation = container.find('#dishPreparation');
  	this.dishPreparation.html(dish.description);

	// dynamicly creates rows

	// var tableBody = container.find('#selectedDish tbody');
	// var tr = $('<tr>');
	// var tdName = $('<td>');
	// tdName.html('Something');
	// var tdPrice = $('<td>');
	// tdPrice.html(5);
	// tr.append(tdName);
	// tr.append(tdPrice);
	// tableBody.append(tr);
}

