//HomeController Object constructor
var HomeController = function (view, model) {
	
	//Does responses to the interactions.

	view.newDinnerButton.click(function(){
		$('#homeView').hide();
		$('#menuListView').show();
		$('#menuThumbnailView').show();
	});
}

