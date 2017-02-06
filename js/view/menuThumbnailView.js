//MenuThumbnailView Object constructor
var MenuThumbnailView = function (container, model) {
	

	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

	// create rows for menu list 
	// var tBody = container.find('#menu tbody');
	// var menu = model.getFullMenuInId();  //should be search results
	// var imgPath = 'images/'
	// for (i = 0; i < menu.length; i+=4){
	// 	var tr = jQuery('<tr/>', {class: 'col-md-12', valign: 'top'});
	// 	for (j = 0; j < 4 && i + j < menu.length; j ++){
	// 		var td = $('<td>').attr({class: 'col-md-3'});
	// 		//td.html(model.getDish(menu[i+j])['name']);
	// 		jQuery('<img/>', {
	// 			src: imgPath.concat(model.getDish(menu[i+j]).image),
	// 			alt: model.getDish(menu[i+j]).name,
	// 			style: "height:200px;width:200px",
	// 		}).appendTo(td);
			
	// 		var name = $('<div>');
	// 		name.html(model.getDish(menu[i+j]).name);
	// 		td.append(name);
			
	// 		var description = $('<div>');
	// 		description.html(model.getDish(menu[i+j]).description.substring(0,100).concat('...'));
	// 		td.append(description);
			
	// 		tr.append(td);	
	// 	}
	// 	tBody.append(tr);
	// }

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

// var tbl = $('<table></table>').attr({ id: "bob" });
// var row = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(tbl);
// $('<td></td>').text("text1").appendTo(row);
// $('<td></td>').text("Test22").prepend($('<a></a>').attr({ href: "#" }).text("LINK")).appendTo(row);        
// tbl.appendTo($(".somePlaceInHtml"));  