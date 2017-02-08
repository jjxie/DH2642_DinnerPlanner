//PreparationView Object constructor
var PreparationView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	
  	this.numberOfGuests = container.find('#numberOfGuestsData');	
  	this.numberOfGuests.html(model.getNumberOfGuests());

  	var dishId = 100;
  	var dish = model.getDish(dishId); //should use the very dish seleceted

  	//Where the dish name locates.
  	this.dishName = container.find('#selectedName');  	
  	this.dishName.html(dish.name);

  	//Where the dish image locates.
  	var imgPath = 'images/'
  	this.dishImage = container.find('#img');
  	jQuery('<img/>', {
  		src: imgPath.concat(dish.image),
  		alt: dish.name,
  		class: "panel-body",
  	}).appendTo(this.dishImage);

  	//Where the dish description locates.
  	this.dishDescription = container.find('#selectedIntro1');
  	this.dishDescription.html(dish.description);

  	this.dishPreparation = container.find('#selectedPrep1');
  	this.dishPreparation.html(dish.description);
  	

}

