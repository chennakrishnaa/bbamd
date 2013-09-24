(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    var formatAmount,
        __slice = [].slice,
        __indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        },
        _this = this;

    $.formatField = {};

    $.formatField.fn = {};

    $.fn.formatField = function() {
        var args, method;
        method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return $.formatField.fn[method].apply(this, args);
    };

    restrictNumeric = function(e) {
        var input;
        console.log(e.which);
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    };

    restrictAmount = function(e) {
        var input, $target, value;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        //$target = $(e.currentTarget);
        //if (hasTextSelected($target)) {
       //     return;
        //}
        return !!/[\d\.,]/.test(input);
        /*if (/[^\d\.,]/.test(input)) {
            return false;
        }*/
        //value = $target.val() + input;
        //value = value.replace(/[^\d\.,]/g, '');
        //return !!/^(?:(?:[\d]{1,5})|(?:[\d]{1,5}(,|\.){1}[\d]{0,2}))$/g.test(value);
    };
    hasTextSelected = function($target) {
        var _ref;
        if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
            return true;
        }
        if (typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? typeof _ref.createRange === "function" ? _ref.createRange().text : void 0 : void 0 : void 0) {
            return true;
        }
        return false;
    };

    restrictStructuredMessage = function(e) {
        var $target, length, value;
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        $target = $(e.currentTarget);
        value = $target.val();
        if (($target.prop('selectionStart') !== null) && $target.prop('selectionStart') !== value.length) {
            return;
        }
        value = value + digit;
        e.preventDefault();
        return $target.val(value.replace(/[\+]{3}(\d)(?=(\d{5})(?!\d))/g, "$1 "));

    };

    /**
     * [formatCardNumber description]
     * @return {[type]} [description]
     */
    $.formatField.fn.formatAmount = function() {
        this.formatField('restrictAmount');
        this.on('keypress', formatBackAmount);
        this.on('blur', formatAmount);
        //this.on('keydown', formatBackCardNumber);
        //this.on('keyup', setCardType);
        this.on('paste', reformatAmount);
        return this;
    };
    $.formatField.fn.structuredMessage = function() {
        this.formatField('restrictNumeric');
        this.on('keypress', restrictStructuredMessage);
        this.on('blur', formatAmount);
        //this.on('keydown', formatBackCardNumber);
        //this.on('keyup', setCardType);
        this.on('paste', restrictStructuredMessage);
        return this;
    };
    /**
     * [formatAmount description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    formatAmount = function(e) {
        var $target, value, decimals, seperator;
        $target = $(e.currentTarget);
        value = $target.val();
        value = $.formatField.formatAmount(value);
        return $target.val(value);

    };
    formatBackAmount = function(e) {
        var $target, value, input;
        $target = $(e.currentTarget);
        //if (hasTextSelected($target)) {
        //     return;
        //}
        if (hasTextSelected($target)) {
           return;
        }
        /*if (/[^\d\.,]/.test(input)) {
            return false;
        }*/
        input = String.fromCharCode(e.which);
        value = $target.val() + input;
        value = value.replace(/[^\d\.,]/g, '');
        return !!/^(?:(?:[\d]{1,15})|(?:[\d]{1,15}(,|\.){1}[\d]{0,2}))$/g.test(value);
    };
    reformatAmount = function(e) {
        return setTimeout(function() {
            var $target, value;
            $target = $(e.currentTarget);
            value = $target.val();
            value = $.formatField.formatAmount(value);
            return $target.val(value);
        });
    };
    /**
     * [formatCardNumber description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    formatCard = function(e) {
        var $target, length, value;
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        $target = $(e.currentTarget);
        value = $target.val();
        if (($target.prop('selectionStart') !== null) && $target.prop('selectionStart') !== value.length) {
            return;
        }
        value = value + digit;
        e.preventDefault();
        return $target.val(value.replace(/(\d)(?=(\d{5})(?!\d))/g, "$1 "));

    };
    $.formatField.formatAmount = function(value){
        var seperator;
        //if 0 return ""
        if (parseFloat(value.replace(',','.')) ===0) {
            return "";
        }

        //if only number return true;
        if (/^[\d]+$/.test(value)) {
            return value;
        }
        //if pasting other than numbers return false
        if (/[^\d\.,]/g.test(value)){
            return ""
        }

        value = value.replace(/[^\d\.,]/g, '');
        if ((seperator = /([\d]+(?:,|\.))([\d]{0,2})/g.exec(value)) !== null) {
            seperator[2] = (seperator[2] + "00").slice(0, 2);
            return seperator[1] + seperator[2];
        }
        return value;
    };
    /**
     * [restrictNumeric description]
     * @return {[type]} [description]
     */
    $.formatField.fn.restrictNumeric = function() {
        this.on('keypress', restrictNumeric);
        return this;
    };
    $.formatField.fn.restrictAmount = function() {
        this.on('keypress', restrictAmount);
        return this;
    }
}));