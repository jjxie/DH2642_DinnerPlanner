//DinnerFactsBannerController Object constructor
var DinnerFactsBannerController = function (view, model) {
	
	//Does responses to the interactions.

    view.editDinnerButton.click(function(){
        $('#dinnerFactsBannerView').hide();
        $('#menuSummaryView').hide();
        $('#preparationView').hide();
        $('#menuListView').show();
        $('#menuThumbnailView').show();
  	});
  }

