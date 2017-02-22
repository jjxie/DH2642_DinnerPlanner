//MenuListController Object constructor
var MenuThumbnailController = function (view, model) {
	
	//Does responses to the interactions.
	view.searchButton.click(function() {
		model.setSearchType(view.searchType.val());
		model.setFilterKeyword(view.filterKeyword.val());
	});

	view.divAll.on('click', ':button', function(){
		console.log("buton");
		console.log(model.getCurrentDish());
		console.log(model.getFullMenu());
		model.getDishExternal(this.id, function(){
			$('#menuThumbnailView').hide();
			//view.update('all')
			$('#dishDetailView').show();
		});
	});

	view.searchType.change(function(){
		model.setFilterKeyword(view.filterKeyword.val());
		model.setSearchType(view.searchType.val());
	});
}