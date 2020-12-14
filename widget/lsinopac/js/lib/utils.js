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