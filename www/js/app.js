// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "account":"../accounts",
      "movement":"../movements",
     
    },
    "shim": {
    	
        "jquery.alpha": ["jquery"],
        "jquery.beta": ["jquery"],
        "underscore": {
        	exports:"_"
        },
        "pagebus":{
        	exports:"PageBus"
        },
        "backbone": {
        	deps:["jquery","underscore"],
        	exports:"Backbone"
        },
        "rivets":{
        	exports:"rivets"
        }
    },
    config:{
    	"account/model/account": {
    		accountUrl:"someUrl"
    	}
    },
    waitSeconds:0
});

// Load the main app module to start the app
requirejs(["../main"]);
