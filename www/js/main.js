define(["pagebus"],function(PageBus){
	PageBus.subscribe('**', this,function(subj,msg,data){
		console.log("Pagebus event received: " + subj + ' - ' + JSON.stringify(msg));
	});
	 (function (Pagebus) {
		Pagebus.publish("startapp", {"userid":"123456"});
		requirejs(["account/main"]);
		requirejs(["movement/main"]);
})(PageBus);
});
