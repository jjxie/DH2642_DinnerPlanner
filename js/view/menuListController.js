//MenuListController Object constructor
var MenuListController = function (view, model) {
	
	//Does responses to the interactions.

	//Adds guest to model.
    view.plusGuestButton.click(function(){
        model.setNumberOfGuests(model.getNumberOfGuests() + 1);
    });

    //Reduces guest from model.
    view.minusGuestButton.click(function(){
        model.setNumberOfGuests(model.getNumberOfGuests() - 1);
    });

    //Confirm dinner and turn to overview page.
    view.confirmDinnerButton.click(function(){
        $('#menuListView').hide();
        $('#menuThumbnailView').hide();
        $('#dishDetailView').hide();
        $('#dinnerFactsBannerView').show();
        $('#menuSummaryView').show();
    });
}

