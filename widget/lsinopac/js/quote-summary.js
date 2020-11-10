(function ($) {
    //################################################################################
    //################################################################################
    // The LabCI object for Generic Widget Package
    // LabCI = { WP: { ... } }

    if (typeof LabCI === 'undefined') LabCI = { WP: {} };
    else if (typeof LabCI.WP === 'undefined') LabCI.WP = {};

    //################################################################################

    // Create a new PSPageObj ...
    LabCI.WP.createquotesummarypageobj = function (id) {
        var pobj = LabCI.AbstractPageObj.extend(id ? id : 'lsinopac-quote-summary-chart', LabCI.WP.QuoteSummaryPageObj);
        return pobj;
    };

    // The PSPageObj class
    // The main object definition is here...
    LabCI.WP.QuoteSummaryPageObj = {
        chart: {
            $this: null,
            $chartwidget: null,
            chartframeobj: null,
            CHARTNAME_MAINCHART: 'mainchart',
            $chartpane: null,
            $chartpane_canvasbox: null,
            mainchartobj: null,
            _TAPANE_HEIGHT: 100, // in pixels
            curperiod: '1W',
            curtype: 'line',
            curta: {
                overlay: 'nooverlay',
                tapane: 'notapane',
            },
        },
        currentquoteric: null,

        //test...
        $tachartbox: null,
        $chartbox: null,

        initImpl: function () {
            // Get ready
            var that = this;

            // c5
            //    this.chart.$this = this.$pageobj.find(".chartbox");

            this.chart.$this = $('#lsinopac-quote-summary .chartbox');
            // Prepare the Chart Factory
            this.chart.$chartwidget = this.chart.$this.find('.c5box');

            this.chart.chartframeobj = chartFactory.create();
            this.chart.$chartpane = this.chart.$chartwidget.children('.chartpane1');
            this.chart.$chartpane_canvasbox = this.chart.$chartpane.children('.canvasbox');

            /*        // Create the price chart object here
            this.chart.mainchartobj = this.chart.chartframeobj.add(chartFactory.PRICE_CHART, this.chart.CHARTNAME_MAINCHART, 1, 1, this.chart.$chartpane_canvasbox, {
                gridType: chartFactory.GRID_DATE_ALIGN, // do not set here, until later when we know whether it is a HTS or MTS chart in _fxchart_loaddata()...
                gridStyle: chartFactory.GRID_LABEL_X | chartFactory.GRID_LABEL_Y,
                isCrosshair: false
            }, 1); // use seq=1 to ensure that this is the 1st chart ;)
            this.chart.mainchartobj.shrink(0.1);

            this._chart_changeperiod(); // initialize with the default period
            this._chart_changetype(); // initialize with the default type          
*/
            ////////////////////////////////////////////////////////////////////

            //TEST...
            this.$tachartbox = this.$pageobj.find('.tachartbox');
            this.$chartbox = this.$tachartbox.find('#chartCanvas').sschart({
                span: 'MINUTE_1',
                period: 'DAY_1',
                type: 'LINE',
                brand: null,
                gid: null,
                trend: false,
                imageOnly: true,
                onZoomToCustom: null,
                onCrossHairMove: function (event, data) {},
                onTAValueChange: function (event, result) {},
                onChange: function (event, data) {},
            });

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
        resizeImpl: function () {
            // c5
            //    this.$pageobj.css("min-height", ($(window).innerHeight()) + "px");
            // Force resizing C5 in order to show the chart correctly ;)

            this.resizeMainChart.call(this);
        },
        // c5
        resizeMainChart: function () {
            /*
            // Not showing any TA, put date/time on mainchartobj's x-axis
            this.chart.mainchartobj.setGridStyle(chartFactory.GRID_LABEL_X | chartFactory.GRID_LABEL_Y);


            // Main Chart
            this.chart.mainchartobj.resize(
                    this.chart.$chartpane_canvasbox.width(),
                    this.chart.$this.height()
                    );
            this.chart.mainchartobj.show();
            this.chart.mainchartobj.c5pobj = this; // ensure the reference to this c5pobj is saved
*/
        },

        /*    // c5
        _chart_changeperiod: function (period) {
            // Save it and apply


            if (period) {
                var _old = this.chart.curperiod;
                this.chart.curperiod = period;
                if (_old !== this.chart.curperiod) {
                    // Period changed, save it and check if need to refresh the data with differet interval...
                    switch (this.chart.curperiod) {
                        case "1D":
                        case "1W":
                            // Different MTS period use different intervals
                            // hence end here, since we need to load data with different interval
                            return this._chart_loaddata();
                            break;

                        default:
                            switch (_old) {
                                case "1D":
                                case "1W":
                                    // Switching from MTS period to HTS period
                                    // hence end here, since we need to load data with different interval
                                    return this._chart_loaddata();
                                    break;
                            }
                            break;
                    }
                }
            }

            var showfr = new Date();
            switch (this.chart.curperiod) {
                case "1D":
                    showfr.addDays(-1);
                    break;
                case "1W":
                    showfr.addDays(-7);
                    break;
                case "1M":
                    showfr.addMonths(-1);
                    break;
                case "3M":
                    showfr.addMonths(-3);
                    break;
                case "6M":
                    showfr.addMonths(-6);
                    break;
                case "1Y":
                    showfr.addMonths(-12);
                    break;
            }
            var showto = null;

            this.chart.mainchartobj.show(showfr, showto);

            this.resizeImpl();

        },

        _chart_changetype: function (type) {
            // Remove the old one
            switch (this.chart.curtype) {
                case "candlestick":
                    this.chart.mainchartobj.removeCandlestick();
                    break;
                case "bar":
                    this.chart.mainchartobj.removeOHLC();
                    break;
                case "line":
                    this.chart.mainchartobj.removeLine();
                    break;
            }

            // Save it and apply
            if (type)
                this.chart.curtype = type;
            switch (this.chart.curtype) {
                case "bar":
                    var styleobj =
                            {
                                upColor: "#d0021b", //--upcolor
                                downColor: "#00a546"  //--downcolor
                            };
                    this.chart.mainchartdrawer = this.chart.mainchartobj.addOHLC2(styleobj, 1);
                    break;

                case "candlestick":
                    var styleobj =
                            {
                                upColor: "#d0021b", //--upcolor
                                upFillColor: "#d0021b", //--upcolor
                                downColor: "#00a546", //--downcolor
                                downFillColor: "#00a546"  //--downcolor
                            };
                    this.chart.mainchartdrawer = this.chart.mainchartobj.addCandlestick2(styleobj, 1);
                    break;

                case "line":
                default:
                    var styleobj = {
                        color: "#b19545", //var(--digital-blue)
                        //    fillColor: "#99CCFF",
                        //    fillColor2: "#FFFFFF",
                        //    thickness: 2,
                        style: 0
                    };
                    this.chart.mainchartdrawer = this.chart.mainchartobj.addLine2(styleobj, 1);
                    break;
            }


        },

        _chart_loaddata: function () {
            // Get ready and load data of this FX
            var that = this;
            var _dataopts = {
                fx: this._curfx,
                _c5api: null,
                _c5apiparam_i: null,
                _datatype: null,
                _gridtype: null,
                _dtfmt: null
            };
            switch (this.chart.curperiod) {
                case "1D":
                    _dataopts._c5api = "mts";
                    _dataopts._c5apiparam_i = "1";
                    _dataopts._datatype = chartFactory.MTS_DATA;
                    _dataopts._gridtype = chartFactory.GRID_TIME_ALIGN;
                    _dataopts._dtfmt = "FORMATPATTERN_CHARTDATETIME";
                    break;

                case "1W":
                    _dataopts._c5api = "mts";
                    _dataopts._c5apiparam_i = "60";
                    _dataopts._datatype = chartFactory.MTS_DATA;
                    _dataopts._gridtype = chartFactory.GRID_TIME_ALIGN;
                    _dataopts._dtfmt = "FORMATPATTERN_CHARTDATETIME";
                    break;

                default:
                    _dataopts._c5api = "hts";
                    _dataopts._c5apiparam_i = "d";
                    _dataopts._datatype = chartFactory.HTS_DATA;
                    _dataopts._gridtype = chartFactory.GRID_DATE_ALIGN;
                    _dataopts._dtfmt = "FORMATPATTERN_CHARTDATE";
                    break;
            }
            this.chart._curdataopts = _dataopts;

            this.chart.$this.loaddata("loadchartdata", "/data/" + _dataopts._c5api, {
                ric: this.currentquoteric,
                i: _dataopts._c5apiparam_i,
                pid: "chartpane",
                lang: this.lang,
                token: encodeURIComponent(LabCI.getToken())
            },
                    function (result) {
                        // Prep the data

                        //    var si = LabCI.WP.SUPPORTED_FX[_dataopts.fx];
                        var dp = 2;

                        var _DS = that.chart.chartframeobj.data(_dataopts._datatype, _dataopts.fx, '\n' + result, {decimalPlace: dp});
                        _DS.open();

                        that.chart.mainchartobj.data(_DS);
                        that.chart.mainchartobj.setGridType(_dataopts._gridtype);

                        that._chart_changeperiod();
                    },
                    0,
                    {
                        datatype: "text"
                    });
        },
        ////////////////////////////////////////////////////////////////////
*/
        showImpl: function (statedata) {
            //        // Get ready
            //        var that = this;

            if (this.$pageobj.hasClass('changed')) {
                this.currentquoteric = statedata.ric;
                //    this._chart_loaddata(this.currentquoteric);
                // Trigger a resize to catch the current dimension
                this.$pageobj.removeClass('changed');
            }

            this.$chartbox.sschart(
                'setMultiOption',
                'code:' +
                    this.currentquoteric +
                    '|assettype:EQUITY|span:MINUTE_1|period:DAY_1|type:LINE|token:' +
                    encodeURIComponent(LabCI.getToken()),
            );

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
            var that = this;
            var rblbl = that.pageobj_rb.lbl;

            $.each(rblbl, function (id, value) {
                that.$pageobj.find('.' + id).html(value);
            });
        },

        ////////////////////////////////////////////////////////////////////

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {},
        },
    };
})(jQuery);
