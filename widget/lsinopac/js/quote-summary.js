
(function ($) {

//################################################################################
//################################################################################
// The LabCI object for Generic Widget Package
// LabCI = { WP: { ... } }

    if (typeof (LabCI) === "undefined")
        LabCI = {WP: {}};
    else if (typeof (LabCI.WP) === "undefined")
        LabCI.WP = {};

//################################################################################

// Create a new PSPageObj ...
    LabCI.WP.createquotesummarypageobj = function (id) {
        var pobj = LabCI.AbstractPageObj.extend(id ? id : "lsinopac-quote-summary-chart", LabCI.WP.QuoteSummaryPageObj);
        return pobj;
    };

// The PSPageObj class
// The main object definition is here...
    LabCI.WP.QuoteSummaryPageObj = {

        chart: {
            $this: null,
            $chartwidget: null,
            chartframeobj: null,
            CHARTNAME_MAINCHART: "mainchart",
            $chartpane: null,
            $chartpane_canvasbox: null,
            mainchartobj: null,
            curperiod: "1D",
            curtype: "line"
        },
        currentquoteric: null,       

        initImpl: function () {
            // Get ready
            var that = this;

            // c5
            this.chart.$this = $("#lsinopac-quote-summary .chartbox");
            // Prepare the Chart Factory
            this.chart.$chartwidget = this.chart.$this.find(".c5box");
            chartFactory.RIGHT_MARGIN = 40;
            chartFactory.LEFT_MARGIN = 15;
            this.chart.chartframeobj = chartFactory.create();
            this.chart.$chartpane = this.chart.$chartwidget.children(".chartpane1");
            this.chart.$chartpane_canvasbox = this.chart.$chartpane.children(".canvasbox");

            // Create the price chart object here
            this.chart.mainchartobj = this.chart.chartframeobj.add(chartFactory.PRICE_CHART, this.chart.CHARTNAME_MAINCHART, 1, 1, this.chart.$chartpane_canvasbox, {
                gridType: chartFactory.GRID_DATE_ALIGN, // do not set here, until later when we know whether it is a HTS or MTS chart in _fxchart_loaddata()...
                gridStyle: chartFactory.GRID_LABEL_X | chartFactory.GRID_LABEL_Y,
                isCrosshair: false
            }, 1); // use seq=1 to ensure that this is the 1st chart ;)
            this.chart.mainchartobj.shrink(0.1);
            this._chart_changetype(); // initialize with the default type          

            ////////////////////////////////////////////////////////////////////

            // Prepare the resize function
            // ... this has to be created here, because when resize() is called, the "this" will be in a different context
            // ... hence, use "that" in the function scope here to build this resize() function
            // ... a bad trick, but works ;)
            this.resize = function () {
                that.$pageobj.delaycall("resize", function () {
                    that.resizeImpl();
                }, 100);
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

            // Not showing any TA, put date/time on mainchartobj's x-axis
            this.chart.mainchartobj.setGridStyle(chartFactory.GRID_LABEL_X | chartFactory.GRID_LABEL_Y);

            // Main Chart
            this.chart.mainchartobj.resize(
                    this.chart.$chartpane_canvasbox.width(),
                    this.chart.$this.height()
                    );
            this.chart.mainchartobj.show();
            this.chart.mainchartobj.c5pobj = this; // ensure the reference to this c5pobj is saved
        },

        // c5
        _chart_changeperiod: function (fr, to, lastDate) {
            var showfr = new Date();
            if (fr !== null) {
                //   showfr.setHours(fr.split(":")[0], fr.split(":")[1], 0);
            }
            switch (this.chart.curperiod) {
                case "1D":
                    if (lastDate !== null) {
                        lastDate.setHours(fr.split(":")[0], fr.split(":")[1], 0);
                        showfr = lastDate;
                    } else {
                        showfr.setHours(fr.split(":")[0], fr.split(":")[1], 0);
                        showfr.addDays(-1);
                    }
                    break;
            }
            var showto = null;
            if (fr !== null) {
                showto = new Date();
                //    showto.setHours(to.split(":")[0], to.split(":")[1], 0);
            }

            this.chart.mainchartobj.show(showfr, showto);
            this.resizeImpl();

        },

        _chart_changetype: function (type) {
            // Remove the old one
            this.chart.mainchartobj.removeLine();


            var styleobj = {
                color: "#bc9144",
                fillColor: "#ddc8a1",
                fillColor2: "#ddc8a1",
                thickness: 2,
                style: 0
            };
            this.chart.mainchartdrawer = this.chart.mainchartobj.addLine2(styleobj, 1);
        },

        _chart_loaddata: function () {
            var that = this;
            if (this.currentquoteric === null) {
                return;
            }

            //info
            var info = null;
            var startTime = null;
            var endTime = null;
            this.chart.$this.loaddata("loadchartinfo_overview", "/data/si", {
                ric: this.currentquoteric,
                lang: this.lang,
                token: encodeURIComponent(LabCI.getToken())
            },
                    function (result) {
                        if (result !== undefined && result.data !== undefined && result.data.info !== undefined && result.data.info.ses !== undefined) {
                            info = result.data.info;
                            var session = result.data.info.ses;
                            if (session[1] !== undefined) {
                                startTime = session[1].fr;
                                if (session[2] !== undefined) {
                                    endTime = session[2].to;
                                } else {
                                    endTime = session[1].to;
                                }
                            }


                            //get chart data...
                            var _dataopts = {
                                _c5api: "mts",
                                _c5apiparam_i: 1,
                                _datatype: chartFactory.MTS_DATA,
                                _gridtype: chartFactory.GRID_TIME_ALIGN,
                                _dtfmt: "FORMATPATTERN_CHARTDATETIME"
                            };
                            that.chart._curdataopts = _dataopts;
                            that.chart.$this.loaddata("loadchartdata_overview", "/data/" + _dataopts._c5api, {
                                ric: that.currentquoteric,
                                i: _dataopts._c5apiparam_i,
                                pid: "chartpane",
                                lang: that.lang,
                                token: encodeURIComponent(LabCI.getToken())
                            },
                                    function (result) {
                                        // Prep the data
                                        //    var si = LabCI.WP.SUPPORTED_FX[_dataopts.fx];
                                        var dp = 2;
                                        //    var data = that._prepareMTSdata(info, result, 1, startTime, endTime);
                                        var _DS = that.chart.chartframeobj.data(_dataopts._datatype, _dataopts.fx, '\n' + result, {decimalPlace: dp});                                       
                                        _DS.open();
                                        that.chart.mainchartobj.data(_DS);
                                        that.chart.mainchartobj.setGridType(_dataopts._gridtype);
                                        var lastDate = null;
                                        try {
                                            lastDate = _DS.points[_DS.points.length - 1].date;

                                            //appending date to the end to fit whole trading time range
                                            var futureDates = [];
                                            var futureDate = new Date(lastDate.getTime());
                                            while (futureDate.toString("HH:mm") < endTime) {
                                                futureDate = new Date(futureDate.addMinutes(1));
                                                futureDates.push(futureDate);
                                            }
                                            that.chart.mainchartobj.series.futureDates(futureDates);

                                        } catch (err) {
                                            console.log('Error to get last chart date');
                                        }
                                        LabCI.WP.QuotePageObj.sessionInfo = info;
                                        that._chart_changeperiod(startTime, endTime, lastDate);
                                    },
                                    0,
                                    {
                                        datatype: "text"
                                    });
//end of get chart data


                        }
                    },
                    0,
                    {
                        datatype: "jsonp"
                    });


        },
        _prepareMTSdata: function (info, mtsdata, int, startTime, endTime) {
            let ses1 = info.ses["1"];
            let ses2 = info.ses["2"];
            let _haslunchbreak = (ses2 !== undefined);

            var _islunchbreak = function (dt) {
                var t = dt.toString("HH:mm");
                //console.log(ses1.to + "=" +t + "=" + ses2.fr);
                if (_haslunchbreak && (ses1.to <= t && t < ses2.fr))
                    return true;
                else
                    return false;
            };

            var _isNotEndOfDate = function (dt) {
                var t = dt.toString("HH:mm");
                console.log(t + "<=" + ses1.to);
                ses1.to = "15:30";
                if (t >= ses1.fr && t <= ses1.to)
                    return true;
                else
                    return false;
            };

            let tmparr = new Array();
            let rows = mtsdata.split('\n');
            let dt;
            let t;
            $.each(rows, function (index, row) {
                if (row.length >= 6) {
                    dt = Date.parseExact(row.substring(0, 12), "yyyyMMddHHmm");
                    t = dt.toString("HH:mm");
                    tmparr.push(row);

                    /*     if (_islunchbreak(dt)){
                     //console.log('111');
                     while (_islunchbreak(dt)) {
                     dt.addMinutes(int); // skip until reaching the next session, if having and during lunch break
                     //      if (that.DATALOADER._SHOW_LUNCHBREAKGAP) dataarr.push(dt.toString("yyyyMMddHHmm") + ",g");
                     if(_islunchbreak(dt))
                     tmparr.push(dt.toString("yyyyMMddHHmm") + ",g");
                     }
                     //  if (!that.DATALOADER._SHOW_LUNCHBREAKGAP) dataarr.push(dt.toString("yyyyMMddHHmm") + ",b");
                     } 
                     */


                }
            });

            mtsdata = tmparr.join("\n");
            return mtsdata;
        },
        ////////////////////////////////////////////////////////////////////

        showImpl: function (statedata) {
//        // Get ready
//        var that = this;

            if (this.$pageobj.hasClass("changed")) {
                this.currentquoteric = statedata.ric;
                this._chart_loaddata(this.currentquoteric);
                // Trigger a resize to catch the current dimension    
                this.$pageobj.removeClass("changed");
            }

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
            //    this.$chartbox.sschart("reload");
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
                that.$pageobj.find("." + id).html(value);
            });
        },

        ////////////////////////////////////////////////////////////////////

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {
            }
        }

    };

})(jQuery);