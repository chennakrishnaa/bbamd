define('backbone', function(Backbone) {
    var controller = _.extend({}, Backbone.Events);
    return controller;
    /*return Backbone.router.extend({
    	routers: {
    		'identification':'ident',
    		'authentication':'auth',
    		'contractsel':'contractsel'
    	},
    	'initialize': function(appView, homeView) {
    		this.appView = appView;
    		this.appView.showView(homeView);
    	},
    	ident:function(identView) {
    		this.appView.showView(identView);
    	},
    	auth: function(authView) {
    		this.appView.showView(authView);
    	},
    	contractSel: function(contractSelView) {
    		this.appView.showView(contractSelView);
    	}
    });*/
});