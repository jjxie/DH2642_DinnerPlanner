//DinnerFactsBannerView Object constructor
var DinnerFactsBannerView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	
	this.numberOfGuestsO = container.find('#guestNumberOutput');
	this.numberOfGuestsO.html(model.getNumberOfGuests());


}

