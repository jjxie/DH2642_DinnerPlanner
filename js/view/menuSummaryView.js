//MenuSummaryView Object constructor
var MenuSummaryView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	
  	var that = this;

	this.fullRecipeButton = container.find('#fullRecipeButton');
	
	//Where the menu summary locates.
	this.divAll = container.find('#menuSummary');
	var popMenuSummary = function(menu) {
		that.divAll.html('');
		for (i = 0; i < menu.length; i++){		
			var dish = menu[i];
			var div = $('<div class="col-md-3 panel-body">');
			var divPanel = $('<div class="panel">');

			var divImage = $('<div class="panel-body">');
			jQuery('<img/>', {
				src: dish.image,
				alt: dish.name,
				class: "img-responsive",
				style: "width:100%; height:200px",
			}).appendTo(divImage);
			divPanel.append(divImage);

			var dishName = $('<div class="tool panel-heading">');
			dishName.html(dish.name);
			divPanel.append(dishName);

			var dishPrice = $('<div class="panel-footer" style="text-align: right">');
			dishPrice.html((dish.singlePrice * model.getNumberOfGuests()).toFixed(2) + ' SEK');
			divPanel.append(dishPrice);

			div.append(divPanel);
			that.divAll.append(div);	
		}	
	}
	popMenuSummary(model.getFullMenu());

	this.totalPrice = container.find('#totalPrice');
	this.totalPrice.html((model.getTotalMenuPrice()).toFixed(2));

	//Registers observer.
	model.addObserver(this);
	
	//Updates this view when being called.
	this.update = function(obj){
		if(obj == 'menuList' || obj == 'numberOfGuests'){
			popMenuSummary(model.getFullMenu());
			that.totalPrice.html((model.getTotalMenuPrice()).toFixed(2));
		}
	}

}
