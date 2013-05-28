define(["backbone","account/model/account","account/config/config"],function(Backbone,accountModel,config){
	
	var accountCollection =  Backbone.Collection.extend({
		model:accountModel, //the model for the collection
		url:config.account  //url of the data
	});
	return accountCollection;
});
