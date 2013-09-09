//Find Flights View
define(['backbone', 'text!findflights.html'], function(Backbone, template) {
    initialize: function(options) {
    	//initializetion
    	this.model = options.model;
    },
    render: function() {
    	this.$el.html(this.template());
    },
    events: function() {
    	'click .findflights': 'findflights'
    },
    findflights: function() {
    	//collect data
    	this.model.fetch(success:function() {
    		this.event_aggregator.trigger('findFlights:showSearchResults');
    	});
    }
});