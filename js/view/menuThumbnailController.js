//MenuListController Object constructor
var MenuThumbnailController = function (view, model) {
	
	//Does responses to the interactions.
	view.searchButton.click(function() {
		model.setSearchType(view.searchType.val());
		model.setFilterKeyword(view.filterKeyword.val());
	});

	view.divAll.on('click', ':button', function(){
		console.log(this.id);
		model.getDishExternal(this.id, function(){
			$('#menuThumbnailView').hide();
			//view.update('all')
			$('#dishDetailView').show();
		});
		console.log(model.getCurrentDish());
	});

	view.searchType.change(function(){
		model.setFilterKeyword(view.filterKeyword.val());
		model.setSearchType(view.searchType.val());
	});
}