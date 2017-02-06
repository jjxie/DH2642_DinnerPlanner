//MenuThumbnailView Object constructor
var MenuThumbnailView = function (container, model) {
	

	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)


	var divAll = container.find('#menu');
	var menu = model.getFullMenuInId();  //should be search results
	var imgPath = 'images/'
	for (i = 0; i < menu.length; i++){		
			var div = $('<div class="col-md-4 panel-body">');
			var divPanel = $('<div class="panel">');

			var imgDiv = $('<div class="panel-body">');
			jQuery('<img/>', {
				src: imgPath.concat(model.getDish(menu[i]).image),
				alt: model.getDish(menu[i]).name,
				class: "img-responsive",
				style: "width:200px; height:200px",
			}).appendTo(imgDiv);
			divPanel.append(imgDiv);
			
			var name = $('<div class="panel-heading">');
			name.html(model.getDish(menu[i]).name);
			divPanel.append(name);
			
			var description = $('<div class="panel-footer">');
			description.html(model.getDish(menu[i]).description.substring(0,50).concat('...'));
			divPanel.append(description);

			div.append(divPanel);
			divAll.append(div);		
		}	
	}
