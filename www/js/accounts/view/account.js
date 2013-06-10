define(
	["backbone","rivetsconfig", 
	"account/collections/account","text!account/template/account.html","pagebus" ,"account/helpers/viewhelpers"],
	function(Backbone,rivets, accountCollection,template,Pagebus,viewHelpers){
		return Backbone.View.extend ({
			template: _.template(template),
			el: $('#accounts'),
			initialize: function () {
				var view = this.view,
				//set model
				model = this.model = new accountCollection(),
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
				//el=this.$el;
				//append the el
				//this.$el.append(template);
				//console.log(this.$el);
				//render the accounts only once the page is loaded
				this.listenToOnce(this.model, 'add', this.render);
				//fetch data
				model.fetch({success:function() {console.log(model)}});
				
				
			},
			events:{
				'click li':'publishEvent'
			},
			//render the template
			render: function() {
					//render template
					//rivets.bind(this.$el,{accounts:this.model})
					//this.$el.html(this.template(this.model.attributes));
					var data = this.model.toJSON();
					_.extend(data,viewHelpers)
					console.log(viewHelpers);
					$(this.el).html(this.template({accounts:data}));
					
			},
			publishEvent: function(el) {
				//console.log($(el))
				el.preventDefault();
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
