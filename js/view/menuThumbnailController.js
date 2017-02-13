//MenuListController Object constructor
var MenuThumbnailController = function (view, model) {
	
	//Does responses to the interactions.
	view.searchButton.click(function() {
		model.setSearchType(view.searchType.val());
		model.setFilterKeyword(view.filterKeyword.val());
	});

	for(key in view.allPanels) {
		view.allPanels[key].click(function() {
			view.allPanels[key].html('hello');
			//model.setCurrentDish(view.allPanels[key]);
			//$('#menuThumbnailView').hide();    		
			//$('#dishDetailView').show();
		})
	}

}

