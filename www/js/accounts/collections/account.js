define(["backbone", "account/model/account", "account/config/config"], function (Backbone, accountModel, config) {
	
	var accountCollection =  Backbone.Collection.extend({
		//model:accountModel, //the model for the collection
		url: config.account, //url of the data
		summary: new Backbone.Collection(),
		//summaryModel: new Backbone.Model.extend({}),
		initialize: function (model) {
			this.model = model;
			//this.summary.model= this.summaryModel;
		},
		parse: function (data) {
			this.summary =  this.summary.set(data.summary);
			return data.productlist;
		}
	});
	return accountCollection;
});
