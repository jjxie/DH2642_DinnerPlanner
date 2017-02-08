//MenuListController Object constructor
var MenuThumbnailController = function (view, model) {
	
	//Does responses to the interactions.
    view.searchButton.click(function(){
        model.setSearchType(view.searchType.val());
        model.setFilterKeyword(view.filterKeyword.val());
    });
}

