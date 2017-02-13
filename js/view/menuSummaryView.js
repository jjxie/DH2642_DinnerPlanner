//MenuSummaryView Object constructor
var MenuSummaryView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	container.hide();
  	
  	var that = this;

	var imgPath = 'images/';

	this.fullRecipeButton = container.find('#fullRecipeButton');
	
	//Where the menu summary locates.
	this.divAll = container.find('#menuSummary');
	var popMenuSummary = function(menu) {
		that.divAll.html('');
		for (i = 0; i < menu.length; i++){		
			var dish = model.getDish(menu[i]);
			var div = $('<div class="col-md-3 panel-body">');
			var divPanel = $('<div class="panel">');

			var divImage = $('<div class="panel-body">');
			jQuery('<img/>', {
				src: imgPath.concat(dish.image),
				alt: dish.name,
				class: "img-responsive",
				style: "width:100%; height:200px",
			}).appendTo(divImage);
			divPanel.append(divImage);

			var dishName = $('<div class="panel-heading">');
			dishName.html(dish.name);
			divPanel.append(dishName);

			var dishPrice = $('<div class="panel-footer" style="text-align: right">');
			dishPrice.html(model.getSinglePrice(menu[i]) * model.getNumberOfGuests() + ' SEK');
			divPanel.append(dishPrice);

			div.append(divPanel);
			that.divAll.append(div);	
		}	
	}
	popMenuSummary(model.getFullMenuInId());

	this.totalPrice = container.find('#totalPrice');
	this.totalPrice.html(model.getTotalMenuPrice());

	//Registers observer.
	model.addObserver(this);
	
	//Updates this view when being called.
	this.update = function(obj){
		if(obj == 'menuList' || obj == 'numberOfGuests'){
			popMenuSummary(model.getFullMenuInId());
			that.totalPrice.html(model.getTotalMenuPrice());
		}
	}

}
