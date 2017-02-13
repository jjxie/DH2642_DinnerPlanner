//MenuSummaryController Object constructor
var MenuSummaryController = function (view, model) {
	
	//Does responses to the interactions.

    view.fullRecipeButton.click(function(){
        $('#menuSummaryView').hide();
        $('#preparationView').show();
  	});
  }

