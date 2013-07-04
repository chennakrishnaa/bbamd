define(["account/view/account","account/model/account", "account/collections/account"],function(account, accountModel, accountCollection){
	var accountCollection = new accountCollection(accountModel);
	var accountsView = new account({el:$('#accounts'), topic:"startapp",accountCollection:accountCollection});
	
});
