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
            return '';
        }
        // If -nnn ?
        else if (nc.length > 1 && nc.startsWith('-')) {
            return 'downval';
        }
        // If +nnn ?
        else if ((nc.length > 1 && nc.startsWith('+')) || ncval > 0) {
            return 'upval';
        }
    }

    // Any other case, return ""
    return '';
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
            return 'hmp8';
        } else if (nval > _HEATMAPTEMP_RANGES[6] && nval <= _HEATMAPTEMP_RANGES[7]) {
            return 'hmp7';
        } else if (nval > _HEATMAPTEMP_RANGES[5] && nval <= _HEATMAPTEMP_RANGES[6]) {
            return 'hmp6';
        } else if (nval > _HEATMAPTEMP_RANGES[4] && nval <= _HEATMAPTEMP_RANGES[5]) {
            return 'hmp5';
        } else if (nval > _HEATMAPTEMP_RANGES[3] && nval <= _HEATMAPTEMP_RANGES[4]) {
            return 'hmp4';
        } else if (nval > _HEATMAPTEMP_RANGES[2] && nval <= _HEATMAPTEMP_RANGES[3]) {
            return 'hmp3';
        } else if (nval > _HEATMAPTEMP_RANGES[1] && nval <= _HEATMAPTEMP_RANGES[2]) {
            return 'hmp2';
        } else if (nval > _HEATMAPTEMP_RANGES[0] && nval <= _HEATMAPTEMP_RANGES[1]) {
            return 'hmp1';
        } else if (nval == _HEATMAPTEMP_RANGES[0]) {
            return 'hm0';
        } else if (nval >= -_HEATMAPTEMP_RANGES[1] && nval < -_HEATMAPTEMP_RANGES[0]) {
            return 'hmn1';
        } else if (nval >= -_HEATMAPTEMP_RANGES[2] && nval < -_HEATMAPTEMP_RANGES[1]) {
            return 'hmn2';
        } else if (nval >= -_HEATMAPTEMP_RANGES[3] && nval < -_HEATMAPTEMP_RANGES[2]) {
            return 'hmn3';
        } else if (nval >= -_HEATMAPTEMP_RANGES[4] && nval < -_HEATMAPTEMP_RANGES[3]) {
            return 'hmn4';
        } else if (nval >= -_HEATMAPTEMP_RANGES[5] && nval < -_HEATMAPTEMP_RANGES[4]) {
            return 'hmn5';
        } else if (nval >= -_HEATMAPTEMP_RANGES[6] && nval < -_HEATMAPTEMP_RANGES[5]) {
            return 'hmn6';
        } else if (nval >= -_HEATMAPTEMP_RANGES[7] && nval < -_HEATMAPTEMP_RANGES[6]) {
            return 'hmn7';
        } else if (nval < -_HEATMAPTEMP_RANGES[7]) {
            return 'hmn8';
        }
    }

    // Any other case?!
    return 'hm0';
}

////////////////////////////////////////////////////////////////////////////////

// Helper for adding comma separators to numerical value, e.g. 1000 -> 1,000
function addCommaSeparators(s) {
    var stg = s.toString();
    stg = stg.replace(/^0+/, '');
    if (stg.substring(0, 1) == '.') {
        stg = '0' + stg;
    }
    var f = stg.replace(/,/g, '').split('.');
    f[0] = f[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return f.join('.');
}

// Helper for removing comma separators from numerical text, e.g. 1,000 -> 1000
function removeCommaSeparators(s) {
    var stg = s.toString();
    stg = stg.replace(/^0+/, '');
    if (stg.substring(0, 1) == '.') {
        stg = '0' + stg;
    }
    var f = stg.replace(/,/g, '');
    return f;
}

////////////////////////////////////////////////////////////////////////////////

// A common method that set a value, optionally with unit, to an element (i.e.
// using .html()), with consideration of null, "", or "-" value, and optionally
// replace 0 too
$.prototype.setValue = function (val, unit, replacezero, replacechar, refval) {
    $(this).each(function () {
        if (refval == '' || refval == '-' || (replacezero && Number(refval) == 0)) {
            // The refval is "", or "-", or 0 if replacezero = true
            val = null;
        }

        var valstr;
        if (val == null || val == '' || val == '-' || (replacezero && Number(val) == 0)) {
            if (replacechar != null) valstr = replacechar;
            // if provided with specific replacechar
            else valstr = '-'; // a default replacement character for null, "-", and optionally for 0 (number)
        } else if (unit) {
            valstr = [val, unit].join('');
        } else {
            valstr = val;
        }
        $(this).html(valstr);
    });

    // For chaining...
    return $(this);
};

function getValue(val, unit, replacezero, replacechar, refval) {
    if (refval == '' || refval == '-' || (replacezero && Number(refval) == 0)) {
        // The refval is "", or "-", or 0 if replacezero = true
        val = null;
    }

    var valstr;
    if (val == null || val == '' || val == '-' || (replacezero && Number(val) == 0)) {
        if (replacechar != null) valstr = replacechar;
        // if provided with specific replacechar
        else valstr = '-'; // a default replacement character for null, "-", and optionally for 0 (number)
    } else if (unit) {
        valstr = [val, unit].join('');
    } else {
        valstr = val;
    }
    return valstr;
}

////////////////////////////////////////////////////////////////////////////////

// A helper for formatting a date object into a specific display format of an event date
function formatEventDateString(dt) {
    if (dt) {
        return dt.toString(FORMATPATTERN_TRADE_DATE_MD) + ' (' + weekday2name(dt.getDay()) + ')';
    } else {
        return '-';
    }
}

//input YYYYMMDD
function formatShortDate(dateString) {
    if (dateString) {
        return dateString.substring(6, 8) + '/' + dateString.substring(4, 6);
    } else {
        return '-';
    }
}

//input HHMM
function formatShortTime(timeString) {
    if (timeString) {
        return timeString.substring(0, 2) + ':' + timeString.substring(2, 4);
    } else {
        return '-';
    }
}
