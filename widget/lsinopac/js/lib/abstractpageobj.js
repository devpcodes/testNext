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

(function ($) {
    //################################################################################
    //################################################################################
    // The LabCI object for an abstraction of a generic PageObj
    // LabCI = {
    //     AbstractPageObj: { ... }
    // }

    if (typeof LabCI === 'undefined') LabCI = { AbstractPageObj: {} };
    else if (typeof LabCI.AbstractPageObj === 'undefined') LabCI.AbstractPageObj = {};

    //################################################################################

    LabCI.AbstractPageObj = {
        // To extend, i.e. extending the LabCI.AbstractPageObj, with specific {impl}, becoming a specific pageobj instance...
        // Usage: var YourPageObj = new LabCI.AbstractPageObj.extend("yourpageobjdivid", { /* your custom implementation */ });
        extend: function (id, impl) {
            return $.extend(true, {}, LabCI.AbstractPageObj, impl, { id: id });
        },

        ////////////////////////////////////////////////////////////////////////////////

        // Various abstract implementations
        initImpl: function () {
            return this;
        }, // when this is initialized
        showImpl: function (statedata) {
            return this;
        }, // whenever this is to be shown in the view
        hideImpl: function () {
            return this;
        }, // whenever this is to be hidden in the view
        refreshImpl: function () {
            return this;
        }, // when a refresh is required, with state retention
        resetImpl: function () {
            return this;
        }, // when wanting to clear any state retention

        // Abstract implementation - when the framework wants to extract the current state in this
        getStateDataImpl: function () {
            var statedata = {};
            return statedata;
        },

        // Implementation should override this to provide the specific set of resources to be used in this page, and how to set UI labels accordingly
        PAGEOBJ_RESOURCEBUNDLE: null,
        _setUILabels: function () {}, // Set UI labels on the fly...

        ////////////////////////////////////////////////////////////////////////////////

        // Core functions that are used by the framework when manipulating a page
        initialized: false,

        id: null,
        $pageobj: null,

        // Localization specific
        lang: 'en',
        pageobj_rb: null,

        ////////////////////////////////////////////////////////////////////////////////

        // A state to indicate that this is being initialized, hence to avoid double init() being triggered when initializing
        _initializing: false,

        init: function (lang) {
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
                this.$pageobj = $('#' + this.id);

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

        show: function (statedata) {
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
                this.$pageobj.delaycall(
                    'show',
                    function () {
                        that.showImpl(statedata);
                    },
                    100,
                );
            }

            //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: In view now");

            // For chaining...
            return this;
        },

        hide: function () {
            // No-op if not yet init
            if (!this.initialized) return this;
            //        // Initialize this if not yet...
            //        if (!this.initialized) this.init();

            //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: About to hide...");

            // Logically hide this page object
            if (this.$pageobj.is(':visible')) {
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

        refresh: function () {
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

        reset: function () {
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

        getStateData: function () {
            // No-op if not yet init
            if (!this.initialized) return this;
            //        // Initialize this if not yet...
            //        if (!this.initialized) this.init();

            //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Getting the current state data...");

            // Call if any specific getStateData() logic
            var statedata;
            if (this.getStateDataImpl) statedata = this.getStateDataImpl();

            // Save the current language automatically too
            if (!statedata) statedata = {};
            statedata.lang = this.lang;

            //////LabCI.Utils.CONSOLELOGGER.debug("[pageobj:"+this.id+"]: Finished getting the current state data");

            // Done
            return statedata;
        },
    };
})(jQuery);
