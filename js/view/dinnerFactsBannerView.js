//DinnerFactsBannerView Object constructor
var DinnerFactsBannerView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	var that = this;
  	this.numberOfGuestsO = container.find('#guestNumberOutput');
  	this.numberOfGuestsO.html(model.getNumberOfGuests());

	//Registers observer.
	model.addObserver(this);

	//Updates this view when being called.
	this.update = function(obj){
		if(obj == 'numberOfGuests'){
			that.numberOfGuestsO.html(model.getNumberOfGuests());
		}
	}
}