//MenuThumbnailView Object constructor
var MenuThumbnailView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)





    var that = this;

    this.filterKeyword = container.find('#filterKeyword');
    this.searchType = container.find('#searchType');
    this.searchButton = container.find('#searchButton');

  	// Where the search results locates.
  	this.divAll = container.find('#menu');
  	
  	this.allPanels = [];

  	this.popSearchResultList = function(imgBase, menu) {
  		that.divAll.html(''); //Initiation.
  		for (i = 0; i < menu.length; i++){		
        // var dish = model.getDish(menu[i]);
        
        var div = $('<div class="col-md-4 panel-body">');

        var divPanel = jQuery('<button/>', {
        	class: "panel",
        	id: menu[i].id,
        });

        that.allPanels[i] = divPanel;

            //var divPanel = $('<div class="panel">');

            var divImage = $('<div class="panel-body">');

            jQuery('<img/>', {
            	src: imgBase.concat(menu[i].imageUrls[0]),
            	alt: menu[i].title,
            	class: "img-responsive",
            	style: "width:100%; height:200px",
            }).appendTo(divImage);
            divPanel.append(divImage);

            var name = $('<div class="tool panel-heading">');
            name.html(menu[i].title);
            divPanel.append(name);

            var time = $('<div class="panel-footer">');
            time.html(menu[i]['readyInMinutes'].toString().concat(' mins'));
            divPanel.append(time);

            div.append(divPanel);
            that.divAll.append(div);
        }
    }

	//Loads the view first.
    //model.getAllDishesInId(model.getSearchType(), model.getFilterKeyword(), this.popSearchResultList /*, callbackErr */);
    this.filterKeyword.val(model.getFilterKeyword());
    this.searchType.val(model.getSearchType());

    //Registers observer.
    model.addObserver(this);

	//Updates this view when being called.
	this.update = function(obj) {
		if(obj == 'searchType' || obj == 'filterKeyword'){
			model.getAllDishesInId(model.getSearchType(), model.getFilterKeyword(), that.popSearchResultList /*, callbackErr */);
			that.filterKeyword.val(model.getFilterKeyword());
			that.searchType.val(model.getSearchType());
            console.log(model.getSearchType());
		}
	}	
}
