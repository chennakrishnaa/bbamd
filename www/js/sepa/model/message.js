define(["backbone"], function(Backbone) {
    //config holds the url for data fetch
    "use strict";
    return Backbone.Model.extend({
        initialize: function() {
            this.on("change:option", this.updateOption);
            this.on("change:option", this.characters);
            //this.on("change:euro", this.characters);
        },
        defaults: {
            option: "nomessage",
            structured: "",
            euro: "RF",
            freetext: ""
        },
        characters: function() {
            //var keys = Object.keys(this.changed);
            //console.log(Object.keys(this.changed).length);
            //if (keys.length > 0) {
            //    return (this.changed[keys[0]].length);
            //}
            //console.log(this.get("option"));
            if (this.get("option") !== "nomessage") {
                //console.log(this.get(this.get("option")));
                return (this.get(this.get("option")).length);
            }
            
            
        },
        updateOption: function() {
            //console.log(this.get("option"));
            this.set("structured", "");
            this.set("euro", "RF");
            this.set("freetext", "");
            /*var self= this;
        
        _.each(_.keys(self.attributes), function(attr) {
            console.log(attr);
            if (attr != "option") {
                self.set(attr,false);
            }
        });
        if (!this.get(this.get("option"))) {
            this.set(this.get("option"),true);
        }*/
            //console.log(this.get(this.get("option")));
        }
    });

});