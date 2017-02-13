//PreparationView Object constructor
var PreparationView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

  	var that = this;

    var imgPath = 'images/';
    
    this.preparationList = container.find('#preparation');

    var popPreparationList = function(menu) {
        that.preparationList.html('');
        for(i = 0; i < menu.length; i++){
            var divAll = $('<div class="col-md-12">');

            var divSpace = $('<div class="col-md-1">');
            divAll.append(divSpace);

            var divImage = $('<div class="col-md-2 panel-body">');
            jQuery('<img/>', {
                src: imgPath.concat(menu[i].image),
                alt: menu[i].name,
                style: "width:100%; height:150px",
            }).appendTo(divImage);
            divAll.append(divImage);

            //Where the dish name locates.
            var divDescription = $('<div class="col-md-4 panel-body">'); 
            var dishName = $('<div style="font-size: x-large; font-weight: bold;">');
            var dishDescription = $('<div>');
            dishName.html(menu[i].name);
            dishDescription.html(menu[i].description);
            divDescription.append(dishName);
            divDescription.append(dishDescription);  
            divAll.append(divDescription);



            var divPreparation = $('<div class="col-md-4 panel-body">');
            var titlePreparation = $('<div>');
            var dishPreparation = $('<div>');
            titlePreparation.html("Preparation:");
            dishPreparation.html(menu[i].description);
            divPreparation.append(titlePreparation);
            divPreparation.append(dishPreparation);  
            divAll.append(divPreparation);

            that.preparationList.append(divAll);
        }
    }

    popPreparationList(model.getFullMenu());

    //Registers observer.
    model.addObserver(this);
    
    //Updates this view when being called.
    this.update = function(obj){
        if(obj == 'menuList'){
            popPreparationList(model.getFullMenu());
        }
    }

}

