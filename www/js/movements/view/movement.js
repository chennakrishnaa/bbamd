define(
	["backbone","rivetsconfig", 
	"movement/collections/movement","text!movement/template/movement.html","pagebus" ],
	function(Backbone,rivets, movementCollection,template,Pagebus){
		return Backbone.View.extend ({
			initialize: function () {
				var view = this,
				//set model
				model = this.model = new movementCollection(),
				//topic 
				topic = this.options.topic;
				 // Wire the queue listeners for responding to events coming from the bus
				 Pagebus.subscribe(topic,this, function (param) {
					 view.updateModel(param.accountid);
				 });
				//load the application html
				el=this.$el;
				//append template
				this.$el.append(template);
				//render the accounts only once the page is loaded
				this.listenTo(this.model, 'reset', this.render);
				//fetch data
				//model.fetch({success:function() {console.log(model)}});
				
				
			},
			//render the template
			render: function(evt) {
					console.log("rivets Called" + evt);
					//render template
					rivets.bind(this.$el,{movements:this.model});
					//setTimeout(function(){console.log("rivets Called")})
					//this.$el.html(this.template(this.model.attributes));
			},
			/**
			  * Updates the account model
			  *
			  * @param userid to update. If '', then clears the collection
			  */
			 updateModel: function (userid) {
				 
				 this.model.userid = userid;
				this.model.reset();
				 if (userid === '') {
					 this.model.reset();
					 return;
				 }
				//fetch model
				 this.model.fetch();
			 },
		});
	
});
