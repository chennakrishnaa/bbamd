(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    var defaults = {};
    $.fn.checkCount = function(options) {
        $.extend(defaults, options);
        $(this).keyup(function() {
            checkCount(this);
        }).blur(function() {
            checkCount(this);
        }).keyup();



        function checkCount(argE) {
            //var tId = $(argE).attr("id");
            var tMax = $(argE).attr("maxLength");
            var left = tMax - $(argE).val().length;
            if (left < 0) left = 0;
            $(argE).val($(argE).val().substr(0, tMax));
            $(defaults.elem).text(left);
        }

    };

}));