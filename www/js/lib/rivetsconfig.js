define(["rivets","backbone"],function(rivets,backbone){
 rivets.configure({
        adapter:{
            subscribe:function (obj, keypath, callback) {
                if (obj instanceof Backbone.Collection) {
                    obj.on('add remove reset', function () {
                        callback(obj[keypath]);
                    });
                } else {
                    obj.on('change:' + keypath, function (m, v) {
                        callback(v);
                    });
                }
            },
            unsubscribe:function (obj, keypath, callback) {
                if (obj instanceof Backbone.Collection) {
                    obj.off('add remove reset', function () {
                        callback(obj[keypath]);
                    });
                } else {
                    obj.off('change:' + keypath, function (m, v) {
                        callback(v);
                    });
                }
            },
            read:function (obj, keypath) {
                if (obj instanceof Backbone.Collection) {
                    return obj["models"];
                } else {
                    return obj.get(keypath);
                }
            },
            publish:function (obj, keypath, value) {
                if (obj instanceof Backbone.Collection) {
                    obj["models"] = value;
                } else {
                    obj.set(keypath, value);
                }
            }
        }
});
return rivets
});