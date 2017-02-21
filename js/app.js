$(function() {
	//Model instantiation
	var model = new DinnerModel();
	
	//View creation
	var homeView = new HomeView($("#homeView"), model);
	var menuListView = new MenuListView($("#menuListView"), model);
	var menuThumbnailView = new MenuThumbnailView($("#menuThumbnailView"), model);
	var dishDetailView = new DishDetailView($("#dishDetailView"), model);
	var dinnerFactsBannerView = new DinnerFactsBannerView($("#dinnerFactsBannerView"), model);
	var menuSummaryView = new MenuSummaryView($("#menuSummaryView"), model);
	var preparationView = new PreparationView($("#preparationView"), model);

	//Controller creation
	var homeController = new HomeController(homeView, model, menuThumbnailView);
	var menuListController = new MenuListController(menuListView, model);
	var menuThumbnailController = new MenuThumbnailController(menuThumbnailView, model);
	var dishDetailController = new DishDetailController(dishDetailView, model);
	var dinnerFactsBannerController = new DinnerFactsBannerController(dinnerFactsBannerView, model);
	var menuSummaryController = new MenuSummaryController(menuSummaryView, model);
	var preparationController = new PreparationController(preparationView, model);
});