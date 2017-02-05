//MenuListView Object constructor
var MenuListView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	
	this.numberOfGuestsI = container.find("#guestNumberInput");
	//this.plusButton = container.find("#plusGuest");
	//this.minusButton = container.find("#minusGuest");
	this.numberOfGuestsI.val(model.getNumberOfGuests());

	// create rows for menu list 
	var tableBody = container.find('#selectedDish tbody');
	var menu = model.getFullMenuInId();
	// why using "key" would cause a bug here?
	for (i = 0 ; i < menu.length; i++){
		var tr = $('<tr>');
		
		var tdName = $('<td>');
		tdName.html(model.getDish(menu[i])['name']);	
		
		var tdPrice = $('<td>');
		tdPrice.html(model.getSinglePrice(menu[i]));
		
		tr.append(tdName);
		tr.append(tdPrice);
		
		tableBody.append(tr);
	}
	
	//Displays the total menu price
	this.totalMenuPrice = container.find('#totalMenuPrice');
	this.totalMenuPrice.html(model.getTotalMenuPrice());
}

