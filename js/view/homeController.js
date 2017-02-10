//HomeController Object constructor
var HomeController = function (view, model) {
	
	//Does responses to the interactions.

	//Adds guest to model.
    view.newDinner.click(function(){
        console.log('hello');
        view.currentContainer.hide();
  	});
  }

