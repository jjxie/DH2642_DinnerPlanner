//MenuThumbnailView Object constructor
var MenuThumbnailView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

    container.hide();

    var that = this;

    var imgPath = 'images/'

    this.filterKeyword = container.find('#filterKeyword');
    this.searchType = container.find('#searchType');
    this.searchButton = container.find('#searchButton');

  	// Where the search results locates.
  	this.divAll = container.find('#menu');
  	
    this.allPanels = [];

    var popSearchResultList = function(menu) {
  		that.divAll.html(''); //Initiation.
  		for (i = 0; i < menu.length; i++){		
  			var dish = model.getDish(menu[i]);
  			
            var div = $('<div class="col-md-4 panel-body">');
  			
            var divPanel = jQuery('<button/>', {
                class: "panel",
                id: menu[i],
            });

            that.allPanels[i] = divPanel;

            //var divPanel = $('<div class="panel">');

            var divImage = $('<div class="panel-body">');
            jQuery('<img/>', {
                src: imgPath.concat(dish.image),
                alt: dish.name,
                class: "img-responsive",
                style: "width:100%; height:200px",
            }).appendTo(divImage);
            divPanel.append(divImage);

            var name = $('<div class="panel-heading">');
            name.html(dish.name);
            divPanel.append(name);

            var description = $('<div class="panel-footer">');
            description.html(dish.description.substring(0,40).concat('...'));
            divPanel.append(description);

            div.append(divPanel);
            that.divAll.append(div);
        }
    }

	//Loads the view first.
	popSearchResultList(model.getAllDishesInId(model.getSearchType(), model.getFilterKeyword()));
    this.filterKeyword.val(model.getFilterKeyword());
    this.searchType.val(model.getSearchType());

    //Registers observer.
    model.addObserver(this);

	//Updates this view when being called.
	this.update = function(obj) {
		if(obj == 'searchType' || obj == 'filterKeyword'){
			popSearchResultList(model.getAllDishesInId(model.getSearchType(), model.getFilterKeyword()));
          that.filterKeyword.val(model.getFilterKeyword());
          that.searchType.val(model.getSearchType());
      }
  }	
}
