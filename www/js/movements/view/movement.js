define(
	["backbone", "rivetsconfig", "movement/model/period",
		"movement/collections/movement", "text!movement/template/movement.html", "pagebus"
	],
	function(Backbone, rivets, movementModel, movementCollection, template, Pagebus) {
		return Backbone.View.extend({
			initialize: function(options) {
				var view = this.view = this,
					//set model
					model = this.model = new movementCollection(movementModel),
					//topic 
					topic = this.options.topic;
					//el = this.$el = options.el;
					counter = this.counter = 0;
					console.log(options.el);
				// Wire the queue listeners for responding to events coming from the bus
				//this.$el = $(this.el);
				var el = this.$el = this.el = $(options.el);
				Pagebus.subscribe(topic, this, function(param) {
					this.counter =0;
					console.log($(this.$el));
					this.delegateEvents();
					//.on('scroll',this.updateOnScroll);
					view.updateModel(param.accountid);
				});
				//load the application html
				
				//append template
				console.log(template);
				this.$el.append(template);
				console.log(this.$el);
				rivets.bind(this.$el, {
					movements: this.model
				});
				//this.bind('reset', this.destroy_veiw);
				//render the accounts only once the page is loaded
				//this.model.listenToOnce(this.model, 'add', this.render);
				//fetch data
				//model.fetch({success:function() {console.log(model)}});
				//rivets.bind(this.$el,{movements:this.model});
				//$(window).scroll(this.updateOnScroll);
			},
			//render the template
			render: function(evt) {
				console.log("rivets Called" + evt);
				//render template
				rivets.bind(this.$el, {
					movements: this.model
				});
				//setTimeout(function(){console.log("rivets Called")})
				//this.$el.html(this.template(this.model.attributes));
			},
			/**
			 * Updates the account model
			 *
			 * @param userid to update. If '', then clears the collection
			 */
			updateModel: function(userid, isRemove) {

				/*this.model.userid = userid;
				//this.model.reset();
				 if (userid === '') {
					 this.model.reset();
					 return;
				 }*/
				//fetch model
				//this.view.remove();
				if (isRemove === undefined) {
					isRemove = true;
				}
				/*if (isRemove)
				{
					this.$el.on('scroll', this.updateOnScroll);
				}*/
				console.log(this.model);
				this.model.fetch({
					remove: isRemove,
					success: function(model) {
						console.log(model);
					}
				});
			},
			updateOnScroll: function() {
				//console.log("scroll event received");
				//console.log("stop:" + this.$el.scrollTop());
				//console.log("height:" + this.$el.height());
				//	console.log($(window).height());
				console.log(this.$el.scrollTop() + this.$el.innerHeight())
				console.log((this.$el)[0].scrollHeight);
				//console.log(this.el);
				console.log(this.counter);
				if (this.$el.scrollTop() + this.$el.innerHeight() +1 >= (this.$el)[0].scrollHeight) {
					setTimeout(this.updateModel(1000, false),3000);
					this.counter++;
					if (this.counter === 5) {
						this.$el.off('scroll');
					}
				}
			},
			destroy_view: function() {

				//COMPLETELY UNBIND THE VIEW
				this.undelegateEvents();

				this.$el.removeData().unbind();

				//Remove view from DOM
				this.remove();
				Backbone.View.prototype.remove.call(this);

			},
			events: {
				'scroll': 'updateOnScroll'
			}

		});

	});