//HomeController Object constructor
var HomeController = function (view, model, view2) {
	
	//Does responses to the interactions.
	view.newDinnerButton.click(function(){
		model.getAllDishesInId(model.getSearchType(), model.getFilterKeyword(), function(imgBase, menu){
			view2.popSearchResultList(imgBase, menu); /*, callbackErr */
			$('#homeView').hide();
			$('#menuListView').show();
			$('#menuThumbnailView').show();
		});
	});
}

