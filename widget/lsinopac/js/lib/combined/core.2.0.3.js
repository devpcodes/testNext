////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2017, LabCI Limited
// -----------------------------------------------------------------------------
// Uses:
//     jQuery 1.12.4
//     -------------------------------------------------------------------------
//     utils.js
// -----------------------------------------------------------------------------
// jQuery in No-Conflict Mode:
//     var jq$ = jQuery.noConflict();

(function($){

//################################################################################
//################################################################################
// The LabCI object for an abstraction of a generic PageObj
// LabCI = {
//     AbstractPageObj: { ... }
// }

if (typeof(LabCI)==="undefined") LabCI = { AbstractPageObj: { } };
else if (typeof(LabCI.AbstractPageObj)==="undefined") LabCI.AbstractPageObj = { };

//################################################################################

LabCI.AbstractPageObj = {

    // To extend, i.e. extending the LabCI.AbstractPageObj, with specific {impl}, becoming a specific pageobj instance...
    // Usage: var YourPageObj = new LabCI.AbstractPageObj.extend("yourpageobjdivid", { /* your custom implementation */ });
    extend: function(id, impl) {
        return $.extend(true, { }, LabCI.AbstractPageObj, impl, { id: id });
    },

////////////////////////////////////////////////////////////////////////////////

    // Various abstract implementations
    initImpl: function() { return this; }, // when this is initialized
    showImpl: function(statedata) { return this; }, // whenever this is to be shown in the view
    hideImpl: function() { return this; }, // whenever this is to be hidden in the view
    refreshImpl: function() { return this; }, // when a refresh is required, with state retention
    resetImpl: function() { return this; }, // when wanting to clear any state retention

    // Abstract implementation - when the framework wants to extract the current state in this
    getStateDataImpl: function() { var statedata = { }; return statedata; },

    // Implementation should override this to provide the specific set of resources to be used in this page, and how to set UI labels accordingly
    PAGEOBJ_RESOURCEBUNDLE: null,
    _setUILabels: function() { }, // Set UI labels on the fly...

////////////////////////////////////////////////////////////////////////////////

    // Core functions that are used by the framework when manipulating a page
    initialized: false,

    id: null,
    $pageobj: null,

    // Localization specific
    lang: "en",
    pageobj_rb: null,

////////////////////////////////////////////////////////////////////////////////

    // A state to indicate that this is being initialized, hence to avoid double init() being triggered when initializing
    _initializing: false,

    init: function(lang) {
        // Get ready...
//        var that = this;

        // To avoid double init() being triggered when initializing...
        if (this._initializing) {
//            // Being init? Wait a while and check again if this has been initialized
//            $main.delaycall("LabCI.AbstractPageObj.init", function() {
//                that.init();
//            }, 500);

            // Noop~ Just return to avoid duplicate init() calls...
            return this;
        }

        this._initializing = true; // now start to initialize

        // Initialize for the first time, if not yet...
        if (!this.initialized) {
            // Update the initialization status
            //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Initializing...");
            this.initialized = true;

            // Get the $object of the corresponding id of this page object
            this.$pageobj = $("#"+this.id);

            // Show this page object hence for any dimension and visual access for initialization purpose
            this.$pageobj.show();

            // Set the resource language too...
            if (lang) this.lang = lang;
            this.$pageobj.addClass(this.lang); // set the new lang onto this widget <div> for CSS use
            this.pageobj_rb = this.PAGEOBJ_RESOURCEBUNDLE[this.lang];

            // Call if any specific init() logic
            if (this.initImpl) this.initImpl();
            // Then, set labels
            this._setUILabels();

            // Hide this page object after initialization
            this.$pageobj.hide();

            //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Initialized");
        }

        this._initializing = false; // finish :)

        // For chaining...
        return this;
    },

    show: function(statedata) {
        // Initialize this if not yet...
        if (!this.initialized) this.init();

        //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: About to show... statedata = " + JSON.stringify(statedata));

        // Apply statedata.lang automatically
        if (statedata && statedata.lang) {
            this.$pageobj.removeClass(this.lang); // remove the old lang
            this.lang = statedata.lang; // save the new lang
            // Set the resource language too...
            this.$pageobj.addClass(this.lang); // set the new lang onto this widget <div> for CSS use
            this.pageobj_rb = this.PAGEOBJ_RESOURCEBUNDLE[this.lang];

            // Then, set labels
            this._setUILabels();
        }

        // Show this page object
        this.$pageobj.show();

        // Call if any specific show() logic
        if (this.showImpl) {
            var that = this;
            this.$pageobj.delaycall("show", function() {
                that.showImpl(statedata);
            }, 100);
        }

        //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: In view now");

        // For chaining...
        return this;
    },

    hide: function() {
        // No-op if not yet init
        if (!this.initialized) return this;
//        // Initialize this if not yet...
//        if (!this.initialized) this.init();

        //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: About to hide...");

        // Logically hide this page object
        if (this.$pageobj.is(":visible")) {
            // Call if any specific hide() logic
            if (this.hideImpl) this.hideImpl();

            //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Now hidden, logically");
        }
//        else {
//            //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Not visible, no need to hide, logically");
//        }

        // Now visually hide it
        this.$pageobj.hide();

        // For chaining...
        return this;
    },

    refresh: function() {
        // No-op if not yet init
        if (!this.initialized) return this;
//        // Initialize this if not yet...
//        if (!this.initialized) this.init();

        //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: About to refresh...");

        // Call if any specific refresh() logic
        if (this.refreshImpl) this.refreshImpl();

        //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Refreshed");

        // For chaining...
        return this;
    },

    reset: function() {
        // No-op if not yet init
        if (!this.initialized) return this;
//        // Initialize this if not yet...
//        if (!this.initialized) this.init();

        //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: About to reset...");

        // Call if any specific reset() logic
        if (this.resetImpl) this.resetImpl();

        //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Reset finished");

        // For chaining...
        return this;
    },

////////////////////////////////////////////////////////////////////////////////

    getStateData: function() {
        // No-op if not yet init
        if (!this.initialized) return this;
//        // Initialize this if not yet...
//        if (!this.initialized) this.init();

        //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Getting the current state data...");

        // Call if any specific getStateData() logic
        var statedata;
        if (this.getStateDataImpl) statedata = this.getStateDataImpl();

        // Save the current language automatically too
        if (!statedata) statedata = { };
        statedata.lang = this.lang;

        //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Finished getting the current state data");

        // Done
        return statedata;
    },

};

})(jQuery);



////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2017, LabCI Limited
// -----------------------------------------------------------------------------
// Uses:
//     jQuery 1.12.4
//     jQueryUI 1.12.1 (if enabling CONSOLELOGGER.useconsoleloggerdialog = true)
//     -------------------------------------------------------------------------
//     -
// -----------------------------------------------------------------------------
// jQuery in No-Conflict Mode:
//     var $ = jQuery.noConflict();

(function ($) {

//################################################################################
//################################################################################
    /*
     CSS Browser Selector v0.4.0 (Nov 02, 2010)
     Rafael Lima (http://rafael.adm.br)
     http://rafael.adm.br/css_browser_selector
     License: http://creativecommons.org/licenses/by/2.5/
     Contributors: http://rafael.adm.br/css_browser_selector#contributors
     */
//function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);

//################################################################################
//################################################################################
// Some utility functions, set onto jQuery $.fn

// Add the startsWith() function for any String object
    String.prototype.startsWith = function (pattern) {
        return (this.indexOf(pattern) === 0);
    };

// Add the endsWith() function for any String object
    String.prototype.endsWith = function (pattern) {
        var d = this.length - pattern.length;
        return d >= 0 && this.lastIndexOf(pattern) === d;
    };

////////////////////////////////////////////////////////////////////////////////

// A helper function to make a call-once-only delayed call
    $.fn.delaycall = function (cid, fn, delaytime) {
        $(this).cleardelaycall(cid).each(function () {
            $(this).data("dct-" + cid, setTimeout(fn, delaytime));
        });
        return $(this);
    };
       

// A helper function to clear a call-once-only delayed call
    $.fn.cleardelaycall = function (cid) {
        $(this).each(function () {
            var $this = $(this);
            var delaycalltimer = $this.data("dct-" + cid);
            if (delaycalltimer) {
                clearTimeout(delaycalltimer);
                $this.data("dct-" + cid, null);
            }
        });
        return $(this);
    };

////////////////////////////////////////////////////////////////////////////////

// A helper function to set placeholder text in the input fields, assuming "_placeholder" attribute is set...
    $.fn.setinputplaceholder = function () {
        $(this).each(function () {
            var $input = $(this);
            if ($input.attr("_placeholder")) {
                $input.focus(function () {
                    $input.removeClass("placeholder");
                    if ($input.val() == $input.attr("_placeholder")) {
                        $input.val("");
                    }
                }).blur(function () {
                    if ($input.val() == "" || $input.val() == $input.attr("_placeholder")) {
                        $input.addClass("placeholder");
                        $input.val($input.attr("_placeholder"));
                    }
                }).blur();
            }
        });
        return $(this);
    };

////////////////////////////////////////////////////////////////////////////////

// A common method that set a value, optionally with unit, to an element (i.e.
// using .html()), with consideration of null, "", or "-" value, and optionally
// replace 0 too
    $.prototype.setValue = function (val, unit, replacezero, replacechar, refval) {
        $(this).each(function () {
            if (refval == "" || refval == "-" || (replacezero && Number(refval) == 0)) {
                // The refval is "", or "-", or 0 if replacezero = true
                val = null;
            }

            var valstr;
            if (val == null || val == "" || val == "-" || (replacezero && Number(val) == 0)) {
                if (replacechar != null)
                    valstr = replacechar; // if provided with specific replacechar
                else
                    valstr = "-"; // a default replacement character for null, "-", and optionally for 0 (number)
            } else if (unit) {
                valstr = [val, unit].join("");
            } else {
                valstr = val;
            }
            $(this).html(valstr);
        });

        // For chaining...
        return $(this);
    };
    
    setValue = function (val, unit, replacezero, replacechar, refval) {
            if (refval == "" || refval == "-" || (replacezero && Number(refval) == 0)) {
                // The refval is "", or "-", or 0 if replacezero = true
                val = null;
            }

            var valstr;
            if (val == null || val == "" || val == "-" || (replacezero && Number(val) == 0)) {
                if (replacechar != null)
                    valstr = replacechar; // if provided with specific replacechar
                else
                    valstr = "-"; // a default replacement character for null, "-", and optionally for 0 (number)
            } else if (unit) {
                valstr = [val, unit].join("");
            } else {
                valstr = val;
            }
            return valstr;

    };    

//################################################################################
//################################################################################
// The LabCI object for Utils
// LabCI = {
//     Utils: { ... }
// }

    if (typeof (LabCI) == "undefined") {
        LabCI = {
            Utils: {}
        };
    } else {
        if (typeof (LabCI.Utils) == "undefined")
            LabCI.Utils = {};
    }

//################################################################################

// Extract a parameter value from the URL
    LabCI.Utils.getURLParameter = function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return results[1];
    }

    LabCI.Utils.dateAdd = function (date, interval, units) {
        var ret = new Date(date); //don't change original date
        var checkRollover = function () {
            if (ret.getDate() != date.getDate())
                ret.setDate(0);
        };
        switch (interval.toLowerCase()) {
            case 'year'   :
                ret.setFullYear(ret.getFullYear() + units);
                checkRollover();
                break;
            case 'quarter':
                ret.setMonth(ret.getMonth() + 3 * units);
                checkRollover();
                break;
            case 'month'  :
                ret.setMonth(ret.getMonth() + units);
                checkRollover();
                break;
            case 'week'   :
                ret.setDate(ret.getDate() + 7 * units);
                break;
            case 'day'    :
                ret.setDate(ret.getDate() + units);
                break;
            case 'hour'   :
                ret.setTime(ret.getTime() + units * 3600000);
                break;
            case 'minute' :
                ret.setTime(ret.getTime() + units * 60000);
                break;
            case 'second' :
                ret.setTime(ret.getTime() + units * 1000);
                break;
            default       :
                ret = undefined;
                break;
        }
        return ret;
    }

    LabCI.Utils.dateFormat = function (date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var h = date.getHours();
        var mm = date.getMinutes();
        var ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12; // the hour '0' should be '12'        

        var result = (d <= 9 ? '0' + d : d) + "/" + (m <= 9 ? '0' + m : m) + "/" + y + " " + (h <= 9 ? '0' + h : h) + ":" + (mm <= 9 ? '0' + mm : mm) + " " + ampm;
        return result;
    }

//################################################################################

// CONSOLELOGGER is a static utility object that manage logging in the browser
    LabCI.Utils.CONSOLELOGGER = {
        isdebug: false,
        useconsoleloggerdialog: false,
        showfulldatetime: true,
        _$consoleloggerdialog: null, // use this when useconsoleloggerdialog=true or console is not available

        isDebugEnabled: function () {
            return this.isdebug;
        },
        error: function (msg) {
            this._logmsg(this._gettime() + " ERROR " + msg);
        },
        info: function (msg) {
            this._logmsg(this._gettime() + " INFO  " + msg);
        },
        debug: function (msg) {
            if (this.isdebug) {
                this._logmsg(this._gettime() + " DEBUG " + msg);
            }
        },
        _gettime: function () {
            if (this.showfulldatetime) {
                return new Date();
            } else {
                return (new Date).getTime();
            }
        },
        _logmsg: function (msg) {
            if (!this.useconsoleloggerdialog) {
                try {
                    // Default try using console for logging purpose
                    console.log(msg);
                } catch (e) {
//                // Fallback to console logger dialog, since console is probably not available
//                this._logmsg2consoleloggerdialog(msg);
                }
            } else {
                // Always use console logger dialog
                this._logmsg2consoleloggerdialog(msg);
            }
        },
        _logmsg2consoleloggerdialog: function (msg) {
            // Create the console logger dialog for logging purpose since console is probably not available
            if (!this._$consoleloggerdialog)
                this._$consoleloggerdialog = $("<div/>").attr("id", "consoleloggerdialog").css("display", "none");

            // If we were previously at the bottom of the list, keep showing the very latest one just added at the bottom by some scrolling...
            var isbottom = true;
            if (this._$consoleloggerdialog[0].scrollTop + this._$consoleloggerdialog[0].offsetHeight < this._$consoleloggerdialog[0].scrollHeight) {
                isbottom = false;
            }

            // Append this msg now
            this._$consoleloggerdialog.append(msg + "<br/>");

            // Scroll accordingly
            if (isbottom)
                this._$consoleloggerdialog.scrollTop(10000);

            // Tricky part, since the $("body") may not be ready yet, we don't show dialog until it is ready and the dialog can be opened
            if ($("body").length > 0) {
                // If not yet have the dialog setup, add it to $("body") and show the dialog now
                if ($("#consoleloggerdialog").length == 0) {
                    $("body").append(this._$consoleloggerdialog);
                    this._$consoleloggerdialog.dialog({
                        width: 500,
                        height: 150,
                        position: "left bottom",
                        title: "Console"
                    });

                    // Scroll to the bottom for the first time
                    this._$consoleloggerdialog.scrollTop(10000);
                } else {
                    // Already setup? Just show it :)
                    this._$consoleloggerdialog.dialog("open");
                }
            }
        }
    };

})(jQuery);

//################################################################################

// Defining various events...
var _RESIZE_EVENT = 'onorientationchange' in window ? 'orientationchange' : 'resize';
//var _HAS_TOUCH = 'ontouchstart' in window
////var _TOUCHSTART_EVENT = _HAS_TOUCH ? 'touchstart' : 'mousedown';
////var _TOUCHMOVE_EVENT = _HAS_TOUCH ? 'touchmove' : 'mousemove';
////var _TOUCHEND_EVENT = _HAS_TOUCH ? 'touchend' : 'mouseup';
////var _TOUCHCANCEL_EVENT = _HAS_TOUCH ? 'touchcancel' : 'mouseup';
//var _GESTUREEND_EVENT = _HAS_TOUCH ? 'gestureend' : 'mouseup';
//var _CLICK_EVENT = _HAS_TOUCH ? 'touchend' : 'click';
var _CLICK_EVENT = $("html").hasClass("iphone") ? 'touchend' : 'mousedown'; // css_browser_selector to determine if this is an "iphone"


////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015, LabCI Limited
// financialdataformat.js
// -----------------------------------------------------------------------------
// jQuery in No-Conflict Mode:
//     var jq$ = jQuery.noConflict();

//////////////////////////////////////////////////////////////////////////////////
//// Date/Time patterns
//
//// Default for HKG
//var FORMATPATTERN_TRADE_DATE_LONGYMD = "dd/MM/yyyy";
//var FORMATPATTERN_TRADE_DATE_SHORTYMD = "dd/MM/yy";
//var FORMATPATTERN_TRADE_DATE_MD = "dd/MM";
//var FORMATPATTERN_TRADE_DATE_YM = "MM/yy";
//var FORMMTPATTERN_TRADE_DATE_LONGYM = "MM/yyyy";
//
//var FORMATPATTERN_DATETIME_LONGYMD = "dd/MM/yyyy HH:mm";
//var FORMATPATTERN_DATETIME_SHORTYMD = "dd/MM/yy HH:mm";
//var FORMATPATTERN_DATETIME_MD = "dd/MM HH:mm";
//var FORMATPATTERN_SALTIME_MD="HH:mm";

////////////////////////////////////////////////////////////////////////////////

// Returning either "upval", "downval", or "" as the CSS class for displaying these up, down or no-change value
function getUpDownClass(nc) {
    if (nc) {
        var ncval = Number(nc);

        // Check if 0
        if (ncval == 0) {
            return "";
        }
        // If -nnn ?
        else if (nc.length > 1 && nc.startsWith("-")) {
            return "downval";
        }
        // If +nnn ?
        else if (nc.length > 1 && nc.startsWith("+") || ncval > 0) {
            return "upval";
        }
    }

    // Any other case, return ""
    return "";
}

////////////////////////////////////////////////////////////////////////////////

// Determine the temperature of a percentage change value
//var _HEATMAPTEMP_RANGES = [0, 1.43, 2.86, 4.29, 5.72, 7.15, 8.58, 10];
var _HEATMAPTEMP_RANGES = [0, 1, 2, 3, 4, 5, 6, 7];
function getHeatmapTemp(pc) {
    if (pc) {
        // Check if 0
        var nval = Number(pc.replace(',', ''));
        if (nval > _HEATMAPTEMP_RANGES[7]) {
            return "hmp8";
        }
        else if (nval > _HEATMAPTEMP_RANGES[6] && nval <= _HEATMAPTEMP_RANGES[7]) {
            return "hmp7";
        }
        else if (nval > _HEATMAPTEMP_RANGES[5] && nval <= _HEATMAPTEMP_RANGES[6]) {
            return "hmp6";
        }
        else if (nval > _HEATMAPTEMP_RANGES[4] && nval <= _HEATMAPTEMP_RANGES[5]) {
            return "hmp5";
        }
        else if (nval > _HEATMAPTEMP_RANGES[3] && nval <= _HEATMAPTEMP_RANGES[4]) {
            return "hmp4";
        }
        else if (nval > _HEATMAPTEMP_RANGES[2] && nval <= _HEATMAPTEMP_RANGES[3]) {
            return "hmp3";
        }
        else if (nval > _HEATMAPTEMP_RANGES[1] && nval <= _HEATMAPTEMP_RANGES[2]) {
            return "hmp2";
        }
        else if (nval > _HEATMAPTEMP_RANGES[0] && nval <= _HEATMAPTEMP_RANGES[1]) {
            return "hmp1";
        }
        else if (nval == _HEATMAPTEMP_RANGES[0]) {
            return "hm0";
        }
        else if (nval >= -_HEATMAPTEMP_RANGES[1] && nval < -_HEATMAPTEMP_RANGES[0]) {
            return "hmn1";
        }
        else if (nval >= -_HEATMAPTEMP_RANGES[2] && nval < -_HEATMAPTEMP_RANGES[1]) {
            return "hmn2";
        }
        else if (nval >= -_HEATMAPTEMP_RANGES[3] && nval < -_HEATMAPTEMP_RANGES[2]) {
            return "hmn3";
        }
        else if (nval >= -_HEATMAPTEMP_RANGES[4] && nval < -_HEATMAPTEMP_RANGES[3]) {
            return "hmn4";
        }
        else if (nval >= -_HEATMAPTEMP_RANGES[5] && nval < -_HEATMAPTEMP_RANGES[4]) {
            return "hmn5";
        }
        else if (nval >= -_HEATMAPTEMP_RANGES[6] && nval < -_HEATMAPTEMP_RANGES[5]) {
            return "hmn6";
        }
        else if (nval >= -_HEATMAPTEMP_RANGES[7] && nval < -_HEATMAPTEMP_RANGES[6]) {
            return "hmn7";
        }
        else if (nval < -_HEATMAPTEMP_RANGES[7]) {
            return "hmn8";
        }
    }

    // Any other case?!
    return "hm0";
}

////////////////////////////////////////////////////////////////////////////////

// Helper for adding comma separators to numerical value, e.g. 1000 -> 1,000
function addCommaSeparators(s) {
    if(s === undefined){
        return s;
    }
    var stg = s.toString();
    stg = stg.replace(/^0+/,"");
    if (stg.substring(0,1) == ".") {
        stg = "0" + stg;
    }
    var f = stg.replace(/,/g,"").split(".");
    f[0] = f[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return f.join(".");
}

// Helper for removing comma separators from numerical text, e.g. 1,000 -> 1000
function removeCommaSeparators(s) {
    var stg = s.toString();
    stg = stg.replace(/^0+/,"");
    if (stg.substring(0,1) == ".") {
        stg = "0" + stg;
    }
    var f = stg.replace(/,/g,"");
    return f;
}

////////////////////////////////////////////////////////////////////////////////

// A common method that set a value, optionally with unit, to an element (i.e.
// using .html()), with consideration of null, "", or "-" value, and optionally
// replace 0 too
$.prototype.setValue = function(val, unit, replacezero, replacechar, refval) {
    $(this).each(function() {
        if (refval == "" || refval == "-" || (replacezero && Number(refval) == 0)) {
            // The refval is "", or "-", or 0 if replacezero = true
            val = null;
        }

        var valstr;
        if (val == null || val == "" || val == "-" || (replacezero && Number(val) == 0)) {
            if (replacechar != null) valstr = replacechar; // if provided with specific replacechar
                                else valstr = "-"; // a default replacement character for null, "-", and optionally for 0 (number)
        }
        else if (unit) {
            valstr = [val, unit].join("");
        }
        else {
            valstr = val;
        }
        $(this).html(valstr);
    });

    // For chaining...
    return $(this);
};

function getValue(val, unit, replacezero, replacechar, refval) {
    if (refval == "" || refval == "-" || (replacezero && Number(refval) == 0)) {
        // The refval is "", or "-", or 0 if replacezero = true
        val = null;
    }

    var valstr;
    if (val == null || val == "" || val == "-" || (replacezero && Number(val) == 0)) {
        if (replacechar != null)
            valstr = replacechar; // if provided with specific replacechar
        else
            valstr = "-"; // a default replacement character for null, "-", and optionally for 0 (number)
    }
    else if (unit) {
        valstr = [val, unit].join("");
    }
    else {
        valstr = val;
    }
    return valstr;
}

////////////////////////////////////////////////////////////////////////////////

// A helper for formatting a date object into a specific display format of an event date
function formatEventDateString(dt) {
    if (dt) {
        return dt.toString(FORMATPATTERN_TRADE_DATE_MD) + " (" + weekday2name(dt.getDay()) + ")";
    }
    else {
        return "-";
    }
}

//input YYYYMMDD
function formatShortDate(dateString){
    if(dateString){
        return dateString.substring(6,8) + "/" + dateString.substring(4,6);
    }else{
        return "-";
    }
}

function formatLongDate(dateString){
    if(dateString){
        return dateString.substring(6,8) + "/" + dateString.substring(4,6) + "/" + dateString.substring(0,4);
    }else{
        return "-";
    }
}

//input HHMM
function formatShortTime(timeString){
    if(timeString){
        return timeString.substring(0,2) + ":" + timeString.substring(2,4);
    }else{
        return "-";
    }
}





////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2017, LabCI Limited
// -----------------------------------------------------------------------------
// Uses:
//     utils.js
// -----------------------------------------------------------------------------
// jQuery in No-Conflict Mode:
//     var $ = jQuery.noConflict();

(function($) {

////################################################################################
////################################################################################
///*
// * jQuery.ajaxQueue - A queue for ajax requests
// *
// * (c) 2011 Corey Frang
// * Dual licensed under the MIT and GPL licenses.
// *
// * Requires jQuery 1.5+
// */
//
//// jQuery on an empty object, we are going to use this as our Queue
//var ajaxQueues = [ $({}), $({}) ];
//var nextqidx = 0;
//
//$.clearAjaxQueue = function() {
//    $.each(ajaxQueues, function(index, ajaxQueue) {
//        ajaxQueue.clearQueue();
//    })
//};
//
//$.ajaxQueue = function(ajaxOpts) {
//    var jqXHR,
//        dfd = $.Deferred(),
//        promise = dfd.promise();
//
//    var ajaxQueue = ajaxQueues[nextqidx++];
//    if (nextqidx == ajaxQueues.length) nextqidx = 0;
//
//    // queue our ajax request
//    ajaxQueue.queue(doRequest);
//
//    // add the abort method
//    promise.abort = function(statusText) {
//
//        // proxy abort to the jqXHR if it is active
//        if (jqXHR && jqXHR.abort) {
//            return jqXHR.abort(statusText);
//        }
//
//        // if there wasn't already a jqXHR we need to remove from queue
//        var queue = ajaxQueue.queue(),
//            index = $.inArray(doRequest, queue);
//
//        if (index > -1) {
//            queue.splice(index, 1);
//        }
//
//        // and then reject the deferred
//        dfd.rejectWith(ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ]);
//        return promise;
//    };
//
//    // run the actual query
//    function doRequest(next) {
//        jqXHR = $.ajax(ajaxOpts)
//            .done(dfd.resolve)
//            .fail(dfd.reject)
//            .then(next, next);
//    }
//
//    return promise;
//};

/*
 * jQuery.ajaxQueue - A fake version to support old jQuery 1.3.2, actual not a queue and just simply use $.ajax
 */
(function($) {

    $.ajaxQueue = function(ajaxOpts) {
        // prepare the returen object for callback, pretend the new XHR object since jQuery 1.5+
        var fnDone;
        var fnFail;
        var retobj = {
            done: function(fn) {
                fnDone = fn;
                return this;
            },
            fail: function(fn) {
                fnFail = fn;
                return this;
            }
        };
        
        // run the actual query
        $.ajax($.extend(ajaxOpts, {
            success: function(rawdata) {
                if (fnDone) fnDone(rawdata);
            },
            error: function(jqXHR, textStatus) {
                if (fnFail) fnFail(jqXHR, textStatus);
            }
        }));
        
        return retobj;
    };

})(jQuery);

//################################################################################
//################################################################################
// The LabCI object for {S}nap{S}hot{D}ata{L}oader
// LabCI = { 
//     SSDL: { ... }
// }

// Call to load data, binding to the caller object
$.fn.loaddata = function(extrarefid, api, jsonparams, success, autorefreshinterval, options) {
    // Construct the querystring
    var qs = ""; $.each(jsonparams, function(key, val) { qs += "&"+key+"="+val; });
    var url = LabCI.SSDLConf.DATA_PATH + api + "?" + qs;
    if(api.indexOf("http://") != -1){
        url = api + "?" + qs;
    } 
    
    $(this).each(function() {
        LabCI.SSDL._loaddata($(this), extrarefid, url, options, success, autorefreshinterval);
    });
},

// Call to stop auto-refresh regardlessly
$.fn.stopautorefresh = function() {
    $(this).each(function() {
        LabCI.SSDL._stopautorefresh($(this));
    });
};

//################################################################################

LabCI.SSDL = {

    // Response Codes
    _API_RC: {
        SYSTEM_ERROR:    "SSDL99999",
        INVALID_FORMAT:  "SSDL00002",
        REQUEST_TIMEOUT: "SSDL00001",
        REQUEST_ABORT:   "SSDL00011"
    },
    
    _loaddata: function($refobj, extrarefid, url, options, success, autorefreshinterval, isAutoRefreshCall) {
        // Abort any existing loading call
        var datarefid = "loaddata-"+extrarefid;
//         var data = {
//             qid: 0,
//             url: null,
//             jqXHR: null
//         };
        var data = $refobj.data(datarefid);
        if (data && data.jqXHR) {
            if (!data.isJSONP && data.jqXHR.abort) data.jqXHR.abort(); // jQuery $.ajax JSONP call cannot be abort()
            data.qid = 0;
            data.url = url;
            data.isJSONP = false;
            data.jqXHR = null;
        }
        else {
            data = {
                qid: 0,
                url: url,
                isJSONP: false,
                jqXHR: null
            };
        }

        // And clear any waiting auto-refresh timer
        LabCI.SSDL._stopautorefresh($refobj);

        // Fetch new data now
        var _thisqid = (new Date).getTime(); // generate a unique id of this request

        var requrl = data.url + (data.url.indexOf("?") > 0 ? "&" : "?") + "qid=" + _thisqid;
        var reqtype = options ? options.type ? options.type : "GET" : "GET";
        var reqdata = options ? options.data ? options.data : {} : {};
        var datatype = options ? options.datatype ? options.datatype : "text" : "text";
        
        // Save the reference
        data.qid = _thisqid;
        data.isJSONP = (datatype == "jsonp");
        $refobj.data(datarefid, data);
    
        // Make request now
        data.jqXHR = $.ajaxQueue({ url: requrl, type: reqtype, data: reqdata, dataType: datatype, timeout: LabCI.SSDLConf.TIMEOUT })
            .done(function(rawdata) {
                // When this is what we are waiting for...
                var data = $refobj.data(datarefid);
                if (data && _thisqid == data.qid) {
                    // Check if result is a system authentiction/session error condition
                    var result;
                    if (rawdata != null) result = rawdata; // With JSON/JSONP response, the data has been parsed/verified as a valid json ;)

                    // Check if any error condition received / reported from the API
                    if (datatype == "text") {
                        // "text" is raw data format, leave it as raw, even if it is null
                        if (success) success(result, isAutoRefreshCall);
                    }
                    else {
                        // For other than "text", check if any error condition received / reported from the API
                        if (!result || !result.data) {
                            result = { data: { responseCode: "F", reasonCode: LabCI.SSDL._API_RC.INVALID_FORMAT } };
                            onReceiveInvalidData(result.data);
                        }

                        // Callback
                        if (success) success(result, isAutoRefreshCall);
                    }

                    // Done, clear the references
                    $refobj.data(datarefid, null);

                    // Do auto-refresh?
                    LabCI.SSDL._startautorefresh($refobj, autorefreshinterval, function() {
                        LabCI.SSDL._loaddata($refobj, extrarefid, url, options, success, autorefreshinterval, true);
                    });
                }
            })
            .fail(function(jqXHR, textStatus) {
                // When this is what we are waiting for...
                // if status 401, login again
                function removeStorage(){
                    localStorage.removeItem('newweb_token');
                    // 清除 sessionStorage 裡與來源別相關的值
                    sessionStorage.removeItem('newweb_platform');
                    sessionStorage.removeItem('source'); // 舊站下架後可移除這行
                    sessionStorage.removeItem('platform'); // 舊站下架後可移除這行
                }
                if (jqXHR.status === 401){
                    let path = encodeURIComponent('/TradingCenter_TWStocks_SubBrokerage/')
                    console.log('path', path)
                    let queryStr = '';
                    let queryIndex = window.parent.window.parent.location.href.indexOf('?');
                    if(queryIndex >= 0){
                        queryStr = '?'+window.parent.window.parent.location.href.split('?').slice(-1).pop();
                    }
                    removeStorage();
                    const newHref = location.protocol + '//' + location.host + '/newweb/'+'/SinoTrade_login?currentPath='+path+queryStr;
                    alert('帳號逾時，請重新登入')
                    $.post("/lykan/api/v1/auth/logout", function (res) {
                        window.parent.window.parent.location.href = newHref;
                    })
                    
                    // if (typeof (parent.$.alert) === 'function') {
                    //     parent.$.alert({
                    //         content: '帳號逾時，請重新登入',
                    //         buttons: {
                    //             '確定': {
                    //                 action: function () {
                    //                     parent.cookieController.setCookie("doLoginPage", parent.location.href);
                    //                     $.get("/SinoTrade-Service/sino/logout", function (res) {
                    //                         if (res.status_code === "S101") {
                    //                             parent.location.href = parent.Utility.subPath + "#doLogin";
                    //                         }
                    //                     })
                    //                 }
                    //             }
                    //         }
                    //     })
                    // }
                    // else {
                    //     //native alert
                    //     alert('帳號逾時，請重新登入')
                    //     parent.cookieController.setCookie("doLoginPage", parent.location.href);
                    //     $.get("/SinoTrade-Service/sino/logout", function (res) {
                    //         if (res.status_code === "S101") {
                    //             parent.location.href = parent.Utility.subPath + "#doLogin";
                    //         }
                    //     })
                    // }
                    // parent.removeCookieForLogout();
                } else {
                    var data = $refobj.data(datarefid);
                    if (data && _thisqid == data.qid) {
                        // So, failed :(
                        var result;
    
                        // Warn the user now for something failed...
                        if (textStatus == "timeout") {
                            // Timeout?!
                            result = { data: { responseCode: "F", reasonCode: LabCI.SSDL._API_RC.REQUEST_TIMEOUT } };
                            onReceiveInvalidData(result.data);
                        }
                        else if (textStatus == "abort") {
                            // Abort?! ... just ignore ;)
                            result = { data: { responseCode: "F", reasonCode: LabCI.SSDL._API_RC.REQUEST_ABORT } };
                        }
                        else {
                            // Any other error case?!
                            result = { data: { responseCode: "F", reasonCode: LabCI.SSDL._API_RC.SYSTEM_ERROR } };
                            onReceiveInvalidData(result.data);
                        }
    
                        // Callback
                        if (success) success(result, isAutoRefreshCall);
    
                        // Done, clear the references
                        $refobj.data(datarefid, null);
    
                        // Do auto-refresh? (even from a failed case)
                        LabCI.SSDL._startautorefresh($refobj, autorefreshinterval, function() {
                            LabCI.SSDL._loaddata($refobj, extrarefid, url, options, success, autorefreshinterval, true);
                        });
                    }
                }
                
            });
    },

    _startautorefresh: function($refobj, autorefreshinterval, fn) {
        if (autorefreshinterval) $refobj.delaycall("autorefresh", fn, autorefreshinterval);
    },
    
    _stopautorefresh: function($refobj) {
        $refobj.cleardelaycall("autorefresh");
    }
    
};

////////////////////////////////////////////////////////////////////////////////

// If not defined, let's define the function for when encountering error during loaddata()...
// errcodeobj = {
//     responseCode: "F" = Failed; "S" = Success; "W" = Other Issues
//     reasonCode: "-1"
// }
$(function() {
    if (typeof(onReceiveInvalidData) == "undefined") {
        onReceiveInvalidData = function(errcodeobj) {
            LabCI.Utils.CONSOLELOGGER.error("SSDL DATA ERROR: " + JSON.stringify(errcodeobj));
        };
    }
});

})(jQuery);



////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2017, LabCI Limited
// -----------------------------------------------------------------------------
// Uses:
//   -
// -----------------------------------------------------------------------------
// jQuery in No-Conflict Mode:
//     var jq$ = jQuery.noConflict();

(function($){

//################################################################################
//################################################################################
// The LabCI object for {S}nap{S}hot{D}ata{L}oader
// LabCI = {
//     SSDL: { ... }
// }

if (typeof(LabCI)==="undefined") {
    LabCI = {
        SSDLConf: { },
        SSDL: { }
    };
}
else {
    if (typeof(LabCI.SSDLConf)==="undefined") LabCI.SSDLConf = { };
    if (typeof(LabCI.SSDL)==="undefined")     LabCI.SSDL = { };
}

//################################################################################
//################################################################################
// SSDL Configuration

LabCI.SSDLConf = {

    // API host
//  DATA_PATH: "data/",
    DATA_PATH: "<PLACEHOLDER>", 

    // API call timeout
    TIMEOUT: 30000

};

})(jQuery);

//////////////////////////////////////////////////////////////////////////////////
// LabCI Sinpoac Widget - Common Resources
//////////////////////////////////////////////////////////////////////////////////

if (typeof(LabCI)==="undefined") LabCI = { WP: { } };
else if (typeof(LabCI.WP)==="undefined") LabCI.WP = { };
LabCI.WP.CommonRC = {

    getRes: function(key, lang) {
        // If not specifying a language, or the corresponding language resource (lang or key) not defined...
        // i.e. missing resource, then return key as it is
        if (!lang || typeof(LabCI.WP.CommonRC[lang])==="undefined" || typeof(LabCI.WP.CommonRC[lang][key])==="undefined") return key;

        // Done
        return LabCI.WP.CommonRC[lang][key];
    },

    ////////////////////////////////////////////////////////////////////////////

    trbc2name: function(key, lang) {
        var name = this.getRes("trbc2name", lang)[key];
        if (!name) name = key;
        return name;
    },

    ccy2name: function(key, lang) {
        var name = this.getRes("ccy2name", lang)[key];
        if (!name) name = key;
        return name;
    },

    exchsect2name: function(key, lang) {
        var name = this.getRes("exchsect", lang)["s"][key];
        if (!name) name = key;
        return name;
    },
    exchsect2longname: function(key, lang) {
        var name = this.getRes("exchsect", lang)["l"][key];
        if (!name) name = key;
        return name;
    },

    wntcbbctype2name: function(key, lang) {
        var name = this.getRes("wntcbbctype2name", lang)[key];
        if (!name) name = key;
        return name;
    },

    ////////////////////////////////////////////////////////////////////////////

    brokerrating2id: function(r) {
        // With this new rule, boundary case will take the better one, e.g. 1x"3" and 1x"4" = 3.5 score, will go r="4" (matching with SR+ portal behaviour)
        r = Number(r);
        if (isNaN(r) || r < 0) {
            r = "NA";
        }
        else if (r >= 1 && r < 1.5) {
            r = "1";
        }
        else if (r >= 1.5 && r < 2.5) {
            r = "2";
        }
        else if (r >= 2.5 && r < 3.5) {
            r = "3";
        }
        else if (r >= 3.5 && r < 4.5) {
            r = "4";
        }
        else if (r >= 4.5 && r <= 5) {
            r = "5";
        }
        else {
            r = "NA";
        }
        return r;
    },
    brokerrating2name: function(r, lang) {
        var key = this.brokerrating2id(r);
        var name = this.getRes("brokerrating2name", lang)[key];
        if (!name) name = key;
        return name;
    },

    ////////////////////////////////////////////////////////////////////////////

    unitscale2name: function(key, lang) {
        var name = this.getRes("unitscale", lang)[key];
        if (!name) name = key;
        return name;
    },
    
    tt2name: function(key, lang) {
        var name = this.getRes("tradetone", lang)[key];
        if (!name) name = key;
        return name;
    },
    
    moneyness2name: function(key, lang) {
        var name = this.getRes("moneyness", lang)[key];
        if (!name) name = key;
        return name;
    },
    
    scflag2name: function(key, lang) {
        var name = this.getRes("scflag", lang)[key];
        if (!name) name = key;
        return name;
    },
    
    ////////////////////////////////////////////////////////////////////////////

    getDF: function(key, lang) {
        var df = this.getRes("df", lang)[key];
        if (!df) df = "";
        return df;
    },
    fmtDT: function(dt, key, lang) {
        var df = this.getDF(key, lang);
        return this.doFmtDateTime(dt, df);
    },

    doFmtDateTime: function(dt, df) {
        if (!dt || !df) return "-";
        return dt.toString(df);
    },

    ////////////////////////////////////////////////////////////////////////////

    getMsg: function(key, lang) {
        return this.getRes("msg", lang)[key];
    },
    getFmtMsg: function(key, lang, values) {
        var msg = this.getRes("msg", lang)[key];
        return this.doFmtMsg(msg, values);
    },
    
    doFmtMsg: function(tmpl, values) {
        var msg = tmpl;
        $.each(values, function(id, value) {
            var rx = new RegExp("{"+id+"}", "gi");
            msg = msg.replace(rx, value);
        });
        return msg;
    }

};

