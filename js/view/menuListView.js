//MenuListView Object constructor
var MenuListView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

  	//container.hide();

  	var that = this;

  	this.numberOfGuestsI = container.find("#guestNumberInput");
  	this.numberOfGuestsI.val(model.getNumberOfGuests());

  	this.plusGuestButton = container.find("#plusGuestButton");
  	this.minusGuestButton = container.find("#minusGuestButton");
  	this.confirmDinnerButton = container.find('#confirmDinnerButton');

	// create rows for menu list 
	var tableBody = container.find('#selectedDish tbody');
	var popMenuList = function(menu){
		// why using "key" would cause a bug here?
		tableBody.html('');
		for (i = 0 ; i < menu.length; i++){
			var tr = $('<tr>');

			var tdName = $('<td>');
			tdName.html(model.getDish(menu[i])['name']);	

			var tdPrice = $('<td>');
			tdPrice.html(model.getSinglePrice(menu[i])*model.getNumberOfGuests());

			tr.append(tdName);
			tr.append(tdPrice);

			tableBody.append(tr);
		}
	}

	//Load the menu list first.
	popMenuList(model.getFullMenuInId());

	//Displays the total menu price.
	this.totalMenuPrice = container.find('#totalMenuPrice');
	this.totalMenuPrice.html(model.getTotalMenuPrice());
	
	//Registers observer.
	model.addObserver(this);
	
	//Updates this view when being called.
	this.update = function(obj){
		if(obj == 'numberOfGuests'){
			that.numberOfGuestsI.val(model.getNumberOfGuests());
			that.totalMenuPrice.html(model.getTotalMenuPrice());
		}
		if(obj == 'menuList' || obj == 'numberOfGuests'){
			popMenuList(model.getFullMenuInId());
		}
	}
}

