////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2017, LabCI Limited
// -----------------------------------------------------------------------------
// Uses:
//   -
// -----------------------------------------------------------------------------
// jQuery in No-Conflict Mode:
//     var jq$ = jQuery.noConflict();

(function ($) {
    //################################################################################
    //################################################################################
    // The LabCI object for {S}nap{S}hot{D}ata{L}oader
    // LabCI = {
    //     SSDL: { ... }
    // }

    if (typeof LabCI === 'undefined') {
        LabCI = {
            SSDLConf: {},
            SSDL: {},
        };
    } else {
        if (typeof LabCI.SSDLConf === 'undefined') LabCI.SSDLConf = {};
        if (typeof LabCI.SSDL === 'undefined') LabCI.SSDL = {};
    }

    //################################################################################
    //################################################################################
    // SSDL Configuration

    LabCI.SSDLConf = {
        // API host
        //  DATA_PATH: "data/",
        DATA_PATH: '<PLACEHOLDER>',

        // API call timeout
        TIMEOUT: 30000,
    };
})(jQuery);
