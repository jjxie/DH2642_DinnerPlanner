//MenuListController Object constructor
var MenuListController = function (view, model) {
	
	//Does responses to the interactions.

	//Adds guest to model.
    view.plusButton.click(function(){
        model.setNumberOfGuests(model.getNumberOfGuests() + 1);
  		// console.log(model.getNumberOfGuests());
  	});
  	//Reduces guest from model.
  	view.minusButton.click(function(){
  		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
  		// console.log(model.getNumberOfGuests());
  	});
  }

