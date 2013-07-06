define(["backbone","movement/model/movement"],function(Backbone,movementModel,config){
	
	var movementCollection =  Backbone.Collection.extend({
		model:movementModel, //the model for the collection
		//url:config.account  //url of the data
	});
	return movementCollection;
	/*
	Movements
		Periods
			Transactions
	*/
});