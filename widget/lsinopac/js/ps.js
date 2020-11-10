(function ($) {
    //################################################################################
    //################################################################################
    // The LabCI object for Generic Widget Package
    // LabCI = { WP: { ... } }

    if (typeof LabCI === 'undefined') LabCI = { WP: {} };
    else if (typeof LabCI.WP === 'undefined') LabCI.WP = {};

    //################################################################################

    // Create a new PSPageObj ...
    LabCI.WP.createpspageobj = function (id) {
        var pobj = LabCI.AbstractPageObj.extend(id ? id : 'lsinopac-ps', LabCI.WP.PSPageObj);
        return pobj;
    };

    // The PSPageObj class
    // The main object definition is here...
    LabCI.WP.PSPageObj = {
        ////////////////////////////////////////////////////////////////////
        // Some setting constants

        _PS_RESULT_LIMIT: 10,
        _PS_KEYDOWN_TIMEOUT: 250,
        _PS_MINCHARS: 1,

        ////////////////////////////////////////////////////////////////////

        $input: null,
        $resultdropdown: null,
        click: null,

        initImpl: function () {
            // Get ready
            var that = this;

            ////////////////////////////////////////////////////////////////////

            // Create the HTML...
            this.$resultdropdown = $('<div/>').addClass('resultdropdown');
            this.$pageobj.append(this.$resultdropdown);
            var closeresultdropdown = function () {
                that.$resultdropdown.hide();
            };
            $('.tab2Refresh').on('click', function () {
                window['lsinopac_quote'].changeRic($(this).attr('data-refresh-value'));
            });
            this.$input = this.$pageobj
                .children('input')
                .focus(function () {
                    that.$input.keydown(); // immediate trigger a powersearch, hence will open the result box ;)
                })
                .keydown(function (e) {
                    // Shortcut to deal with some special keys immediately
                    var keyCode = e.keyCode;
                    if (keyCode === 38 || keyCode === 40) {
                        // up (38) | down (40)
                        // Select an item in the result list
                        e.preventDefault();
                        if (that.$resultdropdown.is(':visible')) {
                            var $entry = that.$resultdropdown.children('.result');
                            if ($entry.length > 0) {
                                // Starting with a result dropdown with real result(s)...
                                var $next;
                                var $cur = $entry.filter('.hover');
                                if ($cur.length === 0) {
                                    // No, first time selecting
                                    if (keyCode === 40) {
                                        $next = $entry.first();
                                    } else {
                                        $next = $entry.last();
                                    }
                                } else {
                                    // Already selecting, move the selection up/down accordingly
                                    var $next;
                                    if (keyCode === 40) {
                                        $next = $cur.next();
                                        if ($next.length === 0) $next = $entry.first();
                                    } else {
                                        $next = $cur.prev();
                                        if ($next.length === 0) $next = $entry.last();
                                    }
                                    $cur.removeClass('hover');
                                }
                                $next.addClass('hover'); // found $next, let's set with hovering highlight ;)
                            }
                        }
                    } else if (keyCode === 13) {
                        // enter
                        // Anything should happen with the [enter]?
                        e.preventDefault();
                        if (that.$resultdropdown.is(':visible')) {
                            var $entry = that.$resultdropdown.children('.result');
                            if ($entry.length > 0) {
                                // Starting with a result dropdown with real result(s)...
                                var $cur = $entry.filter('.hover');
                                if ($cur.length === 0) $cur = $entry.first(); // no one was selected, pick the first one la
                                $cur.click();
                            }
                        }
                        //                    else {
                        //                        // Direct "ENTER" before $resultdropdown, if user inputing a pure number...
                        //                        var _key = that.$input.val();
                        //                        if (!that.$input.hasClass("placeholder") && !isNaN(Number(_key))) {
                        //                            // Generate a RIC based on the input number characteristics...
                        //                            var ric;
                        //                            var l = _key.length;
                        //                            if (l <= 5) ric = LabCI.WP.AppUtils.sym2ric(_key, "HK");
                        //                            else if (l <= 6 && !_key.startsWith("0")) ric = LabCI.WP.AppUtils.sym2ric(_key, "SS");
                        //                            else if (l===6  && !_key.startsWith("3")) ric = LabCI.WP.AppUtils.sym2ric(_key, "SZ");
                        //
                        //                            // For a possibly valid RIC...
                        //                            // Trigger a direct jump to Quote widget, if not specifying any custom click callback
                        //                            if (ric!==undefined && !that.click) {
                        //                                // ... but firstly, test if this is a valid RIC first
                        //                                that.$pageobj.addClass("loading").loaddata("ps-testric", "ps_testric",
                        //                                    {
                        //                                        ric: ric,
                        //                                        token: LabCI.getToken("ps-testric")
                        //                                    },
                        //                                    function(result) {
                        //                                        if (result && result.data && result.data.responseCode==="S") {
                        //                                            // Clear the input to end this search completely ;)
                        //                                            that.$input.val("").blur();
                        //                                            that.$resultdropdown.hide();
                        //
                        //                                            // Cool, this is a valid RIC, let's keep it ;)
                        //                                            LabCI.switchWidget("quote", { ric: ric });
                        //                                        }
                        //                                    },
                        //                                    // no auto-refresh and use JSONP
                        //                                    0,
                        //                                    {
                        //                                        datatype: "jsonp"
                        //                                    }
                        //                                );
                        //                            }
                        //                        }
                        //                    }
                    } else {
                        // Entering or editing, clear (or just hide) $resultdropdown first...
                        if (keyCode !== 37 && keyCode !== 39) {
                            // left (37) | right (39) | ..., since the input was not changed, no need clear/hide ;)
                            that.$resultdropdown.hide();
                        }

                        // Fire search at a delayed time...
                        that.$input.delaycall(
                            'powersearch',
                            function () {
                                // Get the input keyword...
                                var _key = that.$input.val();
                                if (!that.$input.hasClass('placeholder') && _key.length >= that._PS_MINCHARS) {
                                    // Un-hook for the clicking elsewhere logic
                                    $('body').unbind('click', closeresultdropdown);

                                    // Clear and close the current $resultdropdown
                                    that.$resultdropdown.empty().hide();

                                    // Show the loading indicator and load data now
                                    that.$pageobj.addClass('loading').loaddata(
                                        'ps',
                                        '/data/ps',
                                        {
                                            k: encodeURIComponent(encodeURIComponent(_key)),
                                            e: 'ALL',
                                            l: that._PS_RESULT_LIMIT,
                                            lang: that.lang,
                                            token: encodeURIComponent(LabCI.getToken()),
                                        },
                                        function (result) {
                                            // Hide the loading indicator
                                            that.$pageobj.removeClass('loading');

                                            // Process the result now...
                                            //                                    if (LabCI.Utils.CONSOLELOGGER.isdebug) LabCI.Utils.CONSOLELOGGER.debug("that.$input powersearch: " + JSON.stringify(result));
                                            if (result && result.data && result.data.responseCode === 'S') {
                                                var data = result.data.results;
                                                if (data.length > 0) {
                                                    // show results
                                                    $.each(data, function (i, entry) {
                                                        //     console.log(entry);
                                                        var $entry = $(
                                                            "<div class='result'><div class='symbol'>" +
                                                                entry.symbol +
                                                                "</div><div class='nm'>" +
                                                                entry.nm +
                                                                "</div><div class='exch'>" +
                                                                that.pageobj_rb[entry.exchsect] +
                                                                '</div></div>',
                                                        )
                                                            .data(entry)
                                                            .click(function () {
                                                                // Choose this...
                                                                that.$resultdropdown.hide();
                                                                that.$input.data('si', entry).val(entry.symbol);

                                                                // Trigger a callback for this new selection...
                                                                if (that.click) {
                                                                    that.click(entry);
                                                                }
                                                                //         else      LabCI.switchWidget("quote", {ric: entry.ric});
                                                                else {
                                                                    window['lsinopac_quote'].changeRic(entry.ric);
                                                                    $('.tab2Refresh').attr(
                                                                        'data-refresh-value',
                                                                        entry.ric,
                                                                    );
                                                                }

                                                                /* Sensors tracker*/
                                                                if (
                                                                    typeof parent.subBrokerage.shell.sensorsTrack ===
                                                                    'function'
                                                                ) {
                                                                    var keyword = entry.symbol;
                                                                    var click_content =
                                                                        entry.symbol + ' ' + entry.exchsect;
                                                                    parent.subBrokerage.shell.sensorsTrack(
                                                                        keyword,
                                                                        click_content,
                                                                    );
                                                                }

                                                                // Clear the input to end this search completely ;)
                                                                that.$input.val('').blur();
                                                            })
                                                            .hover(
                                                                // Manual create the hovering effect, rather than using :hover, since we need better control over a combination of mouseover and up/down keyboard event
                                                                function () {
                                                                    $(this)
                                                                        .addClass('hover')
                                                                        .siblings()
                                                                        .removeClass('hover');
                                                                },
                                                                function () {
                                                                    $(this).removeClass('hover');
                                                                },
                                                            );
                                                        that.$resultdropdown.append($entry);
                                                    });
                                                } else {
                                                    // Show error message
                                                    that.$resultdropdown.html(
                                                        "<div class='result empty'>" +
                                                            that.pageobj_rb.empty +
                                                            '</span>',
                                                    );
                                                }
                                            } else {
                                                // Show error message
                                                that.$resultdropdown.html(
                                                    "<div class='result empty'>" + that.pageobj_rb.empty + '</span>',
                                                );
                                            }

                                            // Show it ;)
                                            that.$resultdropdown.show();

                                            // Hook for closing that.$resultdropdown when clicking elsewhere
                                            $('body').click(closeresultdropdown);
                                        },
                                        // no auto-refresh and use JSONP
                                        0,
                                        {
                                            datatype: 'jsonp',
                                        },
                                    );
                                } else {
                                    // Not yet enough input, clear and hide the result box
                                    closeresultdropdown();
                                }
                            },
                            that._PS_KEYDOWN_TIMEOUT,
                        );
                    }
                });

            ////////////////////////////////////////////////////////////////////

            // Prepare the resize function
            // ... this has to be created here, because when resize() is called, the "this" will be in a different context
            // ... hence, use "that" in the function scope here to build this resize() function
            // ... a bad trick, but works ;)
            this.resize = function () {
                that.$pageobj.delaycall(
                    'resize',
                    function () {
                        that.resizeImpl();
                    },
                    100,
                );
            };

            ////////////////////////////////////////////////////////////////////

            return this; // chain this
        },

        ////////////////////////////////////////////////////////////////////

        resize: null,
        resizeImpl: function () {},

        ////////////////////////////////////////////////////////////////////

        showImpl: function (statedata) {
            //        // Get ready
            //        var that = this;

            if (statedata)
                if (statedata.click && typeof statedata.click === 'function') {
                    this.click = statedata.click;
                }

            // Trigger a resize to catch the current dimension
            $(window).resize(this.resize);
            this.resizeImpl();

            return this; // chain this
        },

        hideImpl: function () {
            //        // Get ready
            //        var that = this;

            // Unbind the resize event
            $(window).unbind(_RESIZE_EVENT, this.resize);

            return this; // chain this
        },

        refreshImpl: function () {
            return this; // chain this
        },

        resetImpl: function () {
            return this; // chain this
        },

        ////////////////////////////////////////////////////////////////////

        getStateDataImpl: function () {
            return {};
        },

        ////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////

        // Build up the UI on-the-fly for different languages
        _setUILabels: function () {
            //        var that = this;
            //this.$input.attr("_placeholder", this.pageobj_rb.placeholder);
            this.$input.attr('_placeholder', this.pageobj_rb.placeholder).setinputplaceholder();
        },

        ////////////////////////////////////////////////////////////////////

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {
                def: {},
            },
        },
    };
})(jQuery);
