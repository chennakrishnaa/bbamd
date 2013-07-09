define(["backbone", "movement/model/period", "movement/config/config"],
	function(Backbone, movementModel, config) {

		var movementCollection = Backbone.Collection.extend({
			//model: movementModel, //the model for the collection
			//periodCollection: new Backbone.collection(),
			url: config.account, //url of the data
			initialize: function(movementModel) {
				this.model = movementModel;
			},
			parse: function(response) {
				var groups = _.groupBy(response.movementDTOList, 'period');
				//console.log(JSON.stringify(groups));
				var mappedGroups = _.map(groups, function(item) {
					return {
						period: item[0].period,
						movements: item
					};
				});
				//console.log(JSON.stringify(mappedGroups));
				//console.log(this);
				return mappedGroups
				//console.log(movements);
			}
		});
		return movementCollection;
		/*
	Movements //collection of movements
		MovementPeriod //collection of transactions
			Period //
			Transactions //collection
	*/
	});