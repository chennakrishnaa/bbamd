define(["backbone","deep-model", "movement/collections/movements"], function(Backbone,DeepModel, movements) {
	//config holds the url for data fetch
	return Backbone.DeepModel.extend({
		initialize: function() {
			var movementList = new movements(this.get("movements"));
    		this.set("movements",movementList);
		}

	});

});