//DishDetailController Object constructor
var DishDetailController = function (view, model) {
	
	//Does responses to the interactions.

	view.setDishButton.click(function() {
		if(model.isOnMenu(model.getCurrentDishId())) {
			model.removeDishFromMenu(model.getCurrentDishId());
			}
		else {
			model.addDishToMenu(model.getCurrentDishId());
		}
	});

	view.goBackButton.click(function() {
		$('#dishDetailView').hide();
		$('#menuThumbnailView').show();
	})
}

