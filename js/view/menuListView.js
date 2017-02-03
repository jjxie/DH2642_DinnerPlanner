//MenuListView Object constructor
var MenuListView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	
  	this.numberOfGuests = container.find('#numberOfGuestsData');
  	
  	this.numberOfGuests.html(model.getNumberOfGuests());
  	
	// this.numberOfGuests = container.find("#guestNumber");
	// this.plusButton = container.find("#plusGuest");
	// this.minusButton = container.find("#minusGuest");
	
	// this.numberOfGuests.val(model.getNumberOfGuests());

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

