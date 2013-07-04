define(
	["backbone","rivetsconfig", 
	"account/collections/account","text!account/template/account.html","pagebus" ],
	function(Backbone,rivets, accountCollection,template,Pagebus){
		return Backbone.View.extend ({
			initialize: function () {
				var view = this.view,
				//set model
				model = this.model = this.options.accountCollection,
				//topic 
				topic = this.options.topic;
				 // Wire the queue listeners for responding to events coming from the bus
				 console.log("subscribing to " + topic);
				 //var list = Pagebus.query(topic);
				 /*if (list.length)
				 {
				 	_.forEach(list, function(obj){
				 		console.log(obj.topic);
				 	});
				 }*/
				 Pagebus.subscribe(topic, function (param) {
					 view.updateModel(param.userid);
				 });
				//load the application html
				el=this.$el;
				//append the el
				this.$el.append(template);
				//console.log(this.$el);
				//render the accounts only once the page is loaded
				//this.listenToOnce(this.model, 'add', this.render);
				//fetch data
				rivets.bind(this.$el,{accounts:this.model,summary:this.model.summary})
				//this.model.listenToOnce(this.model, 'add', this.render);
				model.fetch({success:function() {console.log(model)}});
				
				
			},
			events:{
				'click #account-list li':'publishEvent'
			},
			//render the template
			render: function() {
					//render template
					//var data = new Backbone.Model(this.model.models[0]);
					//console.log(data.productlist);
					//var accounts = new Backbone.Model(data.attributes.productlist),
					//summary = new Backbone.Model(data.attributes.summary);
					//console.log(accounts);
					//console.log(summary);
					console.log(this.model.summary);
					rivets.bind(this.$el,{accounts:this.model,summary:this.model.summary})
					//this.$el.html(this.template(this.model.attributes));
					
			},
			publishEvent: function(el) {
				//console.log($(el))
				console.log($(el.target).attr('id'));
				Pagebus.publish("showmovements", {"accountid":$(el.target).attr('id')})
			},
			/**
			  * Updates the account model
			  *
			  * @param userid to update. If '', then clears the collection
			  */
			 updateModel: function (userId) {
				 
				 this.model.userid = userid;

				 if (userid === '') {
					 this.model.reset();
					 return;
				 }

				 this.model.fetch();
			 },
		});
	
});
