//MenuThumbnailView Object constructor
var MenuThumbnailView = function (container, model) {
	

	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)


	this.divAll = container.find('#menu');
	var menu = model.getAllDishesInId(model.getSearchType());  //should be search results
	var imgPath = 'images/'
	for (i = 0; i < menu.length; i++){		
			var dish = model.getDish(menu[i]);
			var div = $('<div class="col-md-4 panel-body">');
			var divPanel = $('<div class="panel">');

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
			this.divAll.append(div);		
		}	
	}
