define(
	["backbone", "rivetsconfig", "login/controller/controller", "login/view/ident", "login/view/auth", "login/view/contractsel"],
	function(Backbone, rivets, Controller, IdentView, AuthView, ContractSelView) {
		return Backbone.View.extend({
			
			initialize: function(options) {
				var view = this.view = this,
					//set model
					counter = this.counter = 0,
					//initialize Controller
					controller = this.controller = null;
				//controller.navigate()
				controller = new Controller(this.appView, IdentView);
				
			},
			//render the template
			render: function() {
				//console.log("rivets Called" + evt);
				//render template
				//var that = this;
				rivets.bind(this.$el, {
					movements: this.model.periodCollection
				});
				
				
				//setTimeout(function(){console.log("rivets Called")})
				//this.$el.html(this.template(this.model.attributes));
			},
			appView: function() {

			}
			

		});

	});