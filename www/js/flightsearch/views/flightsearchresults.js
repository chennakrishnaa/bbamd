//flightsearchresults.js
define(['backbone', 'text!searchresults', 'flight'], function(Backbone, template, flightView) {
	initialize:function(options) {
		this.collection = options.collection;
	},
	render: function() {
		this.collection.each(this.renderFlight);
	},
	renderFlight: function(model) {
		var flightView = new flightView({model:model});
		flightView.render();
		this.$el.append(flightView.el);
	}
});