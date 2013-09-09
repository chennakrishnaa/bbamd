//parent view for the flight search, which is rendered when the flight search is 
//clicked by the user.
define(['backbone', 'text!flightsearch.html','flightsearchresults', 'findflights', 'model/searchresults', 'model/searchoptions'],
    function(Backbone, template, searchResultsView, findFlightsView searchResults, searchOptions ) {
        return Backbone.View.extend({
            initialize: function(options) {
                //initialize the view
                //initiate the model for the Search Results/flight details and search options
                this.searchResults = new searchResults();
                this.searchOptions = new searchOptions();
                this.event_aggregator.on('findFlights:showResults, flightDetails:back', this.showSearchResults);
                this.event_aggregator.on('searchResults:back', this.render);
            },
            render: function() {
                //when render is called, call the first subview i.e. findflights.js
                //this render assumes that the template contains a ".subview" element.
                this.findFlightsView = new findFlights({model:this.searchResults});

                //Render parent view 
                this.$el.html(this.template());
                this.renderFindFlights();
                return this;

            },
            renderFindFlights: function() {
            	this.searchResultsView.close();
            	this.assign({
                    '.subview': this.findFlightsView
                });
            },
            showSearchResults: function() {
                //fetch search results
                //close the findFlightsView
                this.findFlightsView.close();
                this.renderSearchResults;
                
            },
            renderSearchResults: function() {
            	this.searchResultsView = new SearchResultsView ({model:this.searchResults});
            	this.assign({
                    '.subview': this.searchResultsView
                });
                return this;
            },
            //this can be set to the Backbone.View.Prototype.assign 
            //so that it can be used by multiple views
            assign: function(selector, view) {
                var selectors;
                if (_.isObject(selector)) {
                    selectors = selector;
                } else {
                    selectors = {};
                    selectors[selector] = view;
                }
                if (!selectors) return;
                _.each(selectors, function(view, selector) {
                    view.setElement(this.$(selector)).render();
                }, this);
            }
        })
    })