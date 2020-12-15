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

(function($) {

//################################################################################
//################################################################################
// The LabCI object for Utils
// LabCI = {
//     Utils: { ... }
// }

if (typeof(LabCI) == "undefined") {
    LabCI = {
        Utils: { }
    };
}
else {
    if (typeof(LabCI.Utils) == "undefined") LabCI.Utils = { };
}

//################################################################################

// Returning either "upval", "downval", or "" as the CSS class for displaying these up, down or no-change value
LabCI.Utils.getUpDownClass = function(nc) {
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
};

//################################################################################

// Determine the temperature of a percentage change value
//LabCI.Utils._HEATMAPTEMP_RANGES = [0, 1.43, 2.86, 4.29, 5.72, 7.15, 8.58, 10];
LabCI.Utils._HEATMAPTEMP_RANGES = [0, 1, 2, 3, 4, 5, 6, 7];
LabCI.Utils.getHeatmapTemp = function(pc) {
    if (pc) {
        // Check if 0
        var nval = Number(pc.replace(',', ''));
        if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[7]) {
            return "hmp8";
        }
        else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[6] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[7]) {
            return "hmp7";
        }
        else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[5] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[6]) {
            return "hmp6";
        }
        else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[4] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[5]) {
            return "hmp5";
        }
        else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[3] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[4]) {
            return "hmp4";
        }
        else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[2] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[3]) {
            return "hmp3";
        }
        else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[1] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[2]) {
            return "hmp2";
        }
        else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[0] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[1]) {
            return "hmp1";
        }
        else if (nval == LabCI.Utils._HEATMAPTEMP_RANGES[0]) {
            return "hm0";
        }
        else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[1] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[0]) {
            return "hmn1";
        }
        else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[2] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[1]) {
            return "hmn2";
        }
        else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[3] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[2]) {
            return "hmn3";
        }
        else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[4] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[3]) {
            return "hmn4";
        }
        else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[5] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[4]) {
            return "hmn5";
        }
        else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[6] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[5]) {
            return "hmn6";
        }
        else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[7] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[6]) {
            return "hmn7";
        }
        else if (nval < -LabCI.Utils._HEATMAPTEMP_RANGES[7]) {
            return "hmn8";
        }
    }

    // Any other case?!
    return "hm0";
};

//################################################################################

// Helper for adding comma separators to numerical value, e.g. 1000 -> 1,000
LabCI.Utils.addCommaSeparators = function(s) {
    var stg = s.toString();
    stg = stg.replace(/^0+/,"");
    if (stg.substring(0,1) == ".") {
        stg = "0" + stg;
    }
    var f = stg.replace(/,/g,"").split(".");
    f[0] = f[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return f.join(".");
};

// Helper for removing comma separators from numerical text, e.g. 1,000 -> 1000
LabCI.Utils.removeCommaSeparators = function(s) {
    var stg = s.toString();
    stg = stg.replace(/^0+/,"");
    if (stg.substring(0,1) == ".") {
        stg = "0" + stg;
    }
    var f = stg.replace(/,/g,"");
    return f;
};

//################################################################################

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

})(jQuery);
