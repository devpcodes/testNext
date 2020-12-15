
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
    LabCI.WP.createquotechartpageobj = function (id) {
        var pobj = LabCI.AbstractPageObj.extend(id ? id : "lsinopac-quote-chart", LabCI.WP.QuoteChartPageObj);
        return pobj;
    };

// The PSPageObj class
// The main object definition is here...
    LabCI.WP.QuoteChartPageObj = {

        chart: {
            $this: null,
            $chartwidget: null,
            chartframeobj: null,
            CHARTNAME_MAINCHART: "mainchart",
            $chartpane: null,
            $chartpane_canvasbox: null,
            mainchartobj: null,
//            CHARTNAME_SCROLLPANECHART = "scrollpanechart",
//            $scrollpane: null,
//            $scrollpane_canvasbox: null,
//            $scrollpane_openpanehandle: null,
//            scrollpanechartobj: null,
            _TAPANE_HEIGHT: 100, // in pixels
            _WIDESCRN_WIDTH: 400, // in pixels, >= this size considered as wide screen (i.e. iPhone 6+)
            $periodoptbtn: null,
            $typeoptbtn: null,
            $taoptbtn: null,
            $maxbtn: null,
            curperiod: "3M",
            curtype: "candlestick",
            curta: {
                overlay: "nooverlay",
                tapane: "notapane"
            }
        },
        $periodoptbtn: null,
        $typeoptbtn: null,
        $taoptbtn: null,
        $taparamOverlay: null,
        $taparam: null,

        currentquoteric: null,
        mode: "desktop",
        initImpl: function () {
            // Get ready
            var that = this;

            ////////////////////////////////////////////////////////////////////

            return this; // chain this
        },

        ////////////////////////////////////////////////////////////////////
        _iswidescrn: false, // a general flag to indicate if the viewport is wide enough for more information to be shown...
        resize: null,
        resizeImpl: function () {
            var that = this;


            if (this.$pageobj.find(".mobilechart").is(":visible")) {
                //mobile
            //    this.$pageobj.find(".chart_d").hide();
            //    this.$pageobj.find(".mobilechart").show();

                this._iswidescrn = this.$pageobj.width() >= this.chart._WIDESCRN_WIDTH; // more than this pixels will be wide enough to go widescreen ;)                

                this.resizeMainChart.call(this);
                if (this.mode == "desktop") {
                    //    this.mode = "mobile";
                    //desktop to mobile...
                    this.show();
                }
            } else {
                //desktop
            //    this.$pageobj.find(".mobilechart").hide();
            //    this.$pageobj.find(".chart_d").show();
                if (this.$pageobj.width()) {
                    this.$pageobj.find(".chartframe").width(this.$pageobj.width());
                }
                if (this.mode == "mobile") {
                    //mobile to desktop...
                    //    this.mode = "desktop";
                  
                  //  this.show();
                }
            }


            // this.$pageobj.find(".chartframe")
        },

        ////////////////////////////////////////////////////////////////////

        showImpl: function (statedata) {
//        // Get ready

            var that = this;
            if (statedata)
                if (statedata.click && typeof (statedata.click) === "function") {
                    this.click = statedata.click;
                }

            var ric = ".TWII";
            if (statedata.ric) {
                ric = statedata.ric;
                this.currentquoteric = ric;
            }

            if (this.$pageobj.find(".mobilechart").is(":visible")) {
                this.mode = "mobile";

                if (this.$pageobj.hasClass("changed")) {
                    if (this.chart.$this == null) {
                        this.chart.$this = $("#lsinopac-quote-chart .chartbox");
                        // Prepare the Chart Factory
                        this.chart.$chartwidget = this.chart.$this.find(".c5box");
                        chartFactory.RIGHT_MARGIN = 40;
                        //        chartFactory.TOP_MARGIN = 30;
                        this.chart.chartframeobj = chartFactory.create();
                        this.chart.$chartpane = this.chart.$chartwidget.children(".chartpane1");
                        this.chart.$chartpane_canvasbox = this.chart.$chartpane.children(".canvasbox");

                        // Create the price chart object here
                        this.chart.mainchartobj = this.chart.chartframeobj.add(chartFactory.PRICE_CHART, this.chart.CHARTNAME_MAINCHART, 1, 1, this.chart.$chartpane_canvasbox, {
                            gridType: chartFactory.GRID_DATE_ALIGN, // do not set here, until later when we know whether it is a HTS or MTS chart in _fxchart_loaddata()...
                            gridStyle: chartFactory.GRID_LABEL_X | chartFactory.GRID_LABEL_Y,
                            crosshairStyle: chartFactory.CROSSHAIR_HORIZONTAL | chartFactory.CROSSHAIR_VERTICAL | chartFactory.CROSSHAIR_DASH,
                            crosshairFunc: this.crosshairFunc,
                            tooltipFunc: this.tooltipFunc
                        }, 1); // use seq=1 to ensure that this is the 1st chart ;)
                        this.chart.mainchartobj.shrink(0.1);


                        // Period
                        this.chart.$periodoptbtn = this.chart.$this.find("#periodoptbtn").on(_CLICK_EVENT, function () {
                            // Show the curtain first
                            LabCI.WP.AppUtils.showcurtain(that.$pageobj, {
                                oncancel: function () {
                                    // Do nothing, just hide the curtain and back to original ;)
                                    that.chart.$periodoptselbox.hide(); // remove the $chartoptselbox
                                }
                            });
                            // Then, show the menu at the right place...
                            var pos = $(this).offset();
                            that.chart.$periodoptselbox.css({top: pos.top, left: pos.left}).show();
                        });
                        this.chart.$periodoptselbox = this.chart.$periodoptbtn.children(".chartoptselbox").detach().appendTo(this.$pageobj);

                        LabCI.WP.AppUtils.initactionbuttongroup(this.chart.$periodoptselbox, {
                            onchange: function (tabid, issametab) {
                                that.chart.$periodoptselbox.hide(); // remove the $chartoptselbox
                                LabCI.WP.AppUtils.hidecurtain(); // hide the curtain
                                that._chart_changeperiod(tabid); // change period now
                            }
                        });

                        // Type
                        this.chart.$typeoptbtn = this.chart.$this.find("#typeoptbtn").on(_CLICK_EVENT, function () {
                            // Show the curtain first
                            LabCI.WP.AppUtils.showcurtain(that.$pageobj, {
                                oncancel: function () {
                                    // Do nothing, just hide the curtain and back to original ;)
                                    that.chart.$typeoptselbox.hide(); // remove the $chartoptselbox
                                }
                            });
                            // Then, show the menu at the right place...
                            var pos = $(this).offset();
                            that.chart.$typeoptselbox.css({top: pos.top, left: pos.left}).show();
                        });
                        this.chart.$typeoptselbox = this.chart.$typeoptbtn.children(".chartoptselbox").detach().appendTo(this.$pageobj);
                        LabCI.WP.AppUtils.initactionbuttongroup(this.chart.$typeoptselbox, {
                            onchange: function (tabid, issametab) {
                                that.chart.$typeoptselbox.hide(); // remove the $chartoptselbox
                                LabCI.WP.AppUtils.hidecurtain(); // hide the curtain
                                that._chart_changetype(tabid); // change type now
                            }
                        });

                        // TA
                        this.chart.$taoptbtn = this.chart.$this.find("#taoptbtn").on(_CLICK_EVENT, function () {
                            // Show the curtain first
                            LabCI.WP.AppUtils.showcurtain(that.$pageobj, {
                                oncancel: function () {
                                    // Do nothing, just hide the curtain and back to original ;)
                                    that.chart.$taconfigbox.hide(); // remove the $chartoptselbox
                                }
                            });
                            // Then, show the menu at the right place...
                            var pos = $(this).offset();
                            that.chart.$taconfigbox.css({top: pos.top}).show();
                        });
                        this.chart.$taconfigbox = this.chart.$taoptbtn.children("#taconfigbox").detach().appendTo(this.$pageobj);
                        var $taconfigpanels = this.chart.$taconfigbox.find(".panel");
                        $.each($taconfigpanels, function () {
                            $(this).find("select").change(function () {
                                var ta = $(this).val();
                                that._chart_changeta(ta);
                            });
                        });
                        $taconfigpanels.find("input").change(function () {
                            var $thisinput = $(this);
                            var ta = $thisinput.parent().parent().attr("id");
                            that._chart_changeta(ta);
                        });

                        // Maximize
                        this.chart.$maxbtn = this.chart.$this.find("#maxbtn").on(_CLICK_EVENT, function () {
                            that.$pageobj.toggleClass("landscape"); // toggle to/back landscape layout
                            that.resizeMainChart();
                        });

                        this._chart_changeperiod(); // initialize with the default period
                        this._chart_changetype(); // initialize with the default type                 
                        this._chart_changeta(this.chart.curta.overlay);
                        this._chart_changeta(this.chart.curta.tapane);
                    }


                    this._chart_loaddata(this.currentquoteric);

                    this.resize = function () {
                        that.$pageobj.delaycall("resize", function () {
                            that.resizeImpl();
                        }, 100);
                    };
                    this.$pageobj.removeClass("changed");
                }




            } else {
                this.mode = "desktop";

                        if(statedata.preload != undefined && statedata.preload != null && statedata.preload == '1'){
                            //preload only...
                            this.$pageobj.find(".chartframe").css("display","none");
                        }else{
                            this.$pageobj.find(".chartframe").css("display","block");
                        }

                if (this.$pageobj.hasClass("changed")) {

        // TODO cross domain...           if (typeof (this.$pageobj.find(".chartframe")[0].contentWindow.changeRic) == "function") {
        //                this.$pageobj.find(".chartframe")[0].contentWindow.changeRic(ric);
        //            } else {
                        this.$pageobj.find(".chartframe").attr("src", APP_CONFIG.DataAPIPath + "/c5/ui/c5?ric=" + ric + "&token=" + encodeURIComponent(LabCI.getToken()) + "&lang=" + this.lang);
        //            }

                    this.$pageobj.removeClass("changed");
                }





                /*            $.ajax({
                 url: APP_CONFIG.DataAPIPath+"/c5/ui/c5demo",
                 data: {ric: ".HSI", token: LabCI.getToken(), ts: (new Date()).getTime()},
                 type: "GET",
                 success: function (html) {
                 that.$pageobj.find(".chart").html(html);
                 },
                 error: function (jqXHR, textStatus) {
                 
                 }
                 });
                 */
            }


            // Trigger a resize to catch the current dimension
            $(window).resize(this.resize);
            this.resizeImpl();

            return this; // chain this
        },
        // c5
        resizeMainChart: function () {
            // Hide crosshair in Chart
            this.hideCrosshair();

            // TA Chart
            if (this.chart.tachartobj) {
                this.chart.tachartobj.resize(
                        this.chart.$chartpane_canvasbox.width(),
                        this.chart._TAPANE_HEIGHT
                        );
                this.chart.tachartobj.show();
                this.chart.tachartobj.c5pobj = this; // ensure the reference to this c5pobj is saved

                // When TA is shown, no need to put duplicated date/time display on mainchartobj's x-axis
                this.chart.mainchartobj.setGridStyle(chartFactory.GRID_LABEL_Y);
            } else {
                // Not showing any TA, put date/time on mainchartobj's x-axis
                this.chart.mainchartobj.setGridStyle(chartFactory.GRID_LABEL_X | chartFactory.GRID_LABEL_Y);
            }

            // Main Chart
            var chartCanvasboxHeight = this.chart.$chartpane_canvasbox.height();
            if (this.$pageobj.hasClass("landscape")) {
                chartCanvasboxHeight = window.innerHeight - 70;
                //offset: 70px

            }

            this.chart.mainchartobj.resize(
                    this.chart.$chartpane_canvasbox.width(),
                    this.chart.tachartobj ? chartCanvasboxHeight - this.chart._TAPANE_HEIGHT : chartCanvasboxHeight
                    );
            this.chart.mainchartobj.show();
            this.chart.mainchartobj.c5pobj = this; // ensure the reference to this c5pobj is saved

        },
        crosshairFunc: function (x, y) {
            // Get ready... note, calling sequence in alpha_chart.js, tooltipFunc > crosshairFunc
            var that = this.c5pobj; // when in the mainchartobj callback, we do this to find the real this, which we have initially saved this as c5pobj in the mainchartobj ;)
            if (y === -1) {
                // Reset/clear the value boxes...
                that.hideCrosshair(); // simply hide them all
            }
        },
        hideCrosshair: function () {
            // Switch off the current crosshair positioning
            this.chart.chartframeobj.crosshair(-1, -1, this.chart.mainchartobj);

            // Ensure a reset of the canvasvalueboxes
            if (this.chart.$tooltipbox)
                this.chart.$tooltipbox.empty();
            if (this.chart.$tooltipbox2)
                this.chart.$tooltipbox2.empty();
        },
        _parseTAinput: function (s, usefloat) {
            var v = usefloat ? parseFloat(s) : parseInt(s);
            if (isNaN(v) || v <= 0)
                return null;
            else
                return v;
        },
        _getMainChartOptions: function () {
            return {
                gridType: this.chart.mainchartobj.gridType,
                gridStyle: this.chart.mainchartobj.gridStyle,
                crosshairStyle: this.chart.mainchartobj.crosshairStyle,
                crosshairFunc: this.chart.mainchartobj.crosshairFunc,
                tooltipFunc: this.chart.mainchartobj.tooltipFunc
//            dateRangeFunc:  this.fxchart.mainchartobj.dateRangeFunc
            };
        },
        tooltipFunc: function (res) {
            var that = this.c5pobj; // when in the mainchartobj callback, we do this to find the real this, which we have initially saved this as c5pobj in the mainchartobj ;)
            var $cc = that.chart.$chartpane_canvasbox.children("canvas");
            if (that.chart.$tooltipbox === undefined) {
                that.chart.$tooltipbox = $("<div/>").addClass("canvasvaluebox").insertBefore($cc.eq(0));
            }
            if (that.chart.tachartobj && that.chart.$tooltipbox2 === undefined) {
                that.chart.$tooltipbox2 = $("<div/>").addClass("canvasvaluebox").insertBefore($cc.eq(1));
            }

            var rb = that.pageobj_rb.lbl;
            var str = "";
            if (res.date) {
                if (this.name === "mainchart") {

                    str = rb.dt + ": <b>" + LabCI.WP.CommonRC.fmtDT(res.date, that.chart._curdataopts._dtfmt, that.lang) + "</b> ";
                    if (that._iswidescrn) {
                        str += rb.o + ": <b>" + res.open + "</b> "
                                + rb.h + ": <b>" + res.high + "</b> "
                                + rb.l + ": <b>" + res.low + "</b> "
                                + rb.c + ": <b>" + res.close + "</b><br/>";

                        // Show TA values only when wide enough
                        var taParam = null;
                        if (that.$taparamOverlay != null) {
                            taParam = that.$taparamOverlay.split(":")
                        }

                        if (taParam != null && taParam[0] == "BB") {
                            var bb = res["BB_" + taParam[1] + "_" + taParam[2]];
                            str += "<b>" + rb.BB + "</b> " + taParam[1] + "," + taParam[2] + "σ: <span style='color:#555555'><b>MA " + bb.m + "</b> (" + taParam[1] + ")</span> <b>" + taParam[2] + "σ</b> <span style='color:#0091ea'><b>" + bb.u + "</b> (UB)</span> <span style='color:#d0021b'><b>" + bb.l + "</b> (LB)</span>";
                        } else if (taParam != null && taParam[0] == "SMA") {
                            var sma1 = res["SMA_" + taParam[1]];
                            var sma2 = res["SMA_" + taParam[2]];
                            var sma3 = res["SMA_" + taParam[3]];
                            str += "<b>" + rb.SMA + "</b> " + taParam[1] + "," + taParam[2] + "," + taParam[3] + ": <span style='color:#9933FF'><b>" + sma1 + "</b> (" + taParam[1] + ")</span> <span style='color:#FFB0B0'><b>" + sma2 + "</b> (" + taParam[2] + ")</span> <span style='color:#449999'><b>" + sma3 + "</b> (" + taParam[3] + ")</span>";
                        }
                    } else {
                        // Not wide enough :(
                        str += rb.c + ": <b>" + res.close + "</b><br/> "
                                + rb.o + ": <b>" + res.open + "</b> "
                                + rb.h + ": <b>" + res.high + "</b> "
                                + rb.l + ": <b>" + res.low + "</b><br/>";
                    }
                    that.chart.$tooltipbox.html(str);
                } else {
                    // Otherwise, must be TA chart, and make sure that we have TA chart...
                    if (that.chart.tachartobj) {
                        if (that._iswidescrn) {
                            // Show TA values only when wide enough
                            var taParam = null;
                            if (that.$taparam != null) {
                                taParam = that.$taparam.split(":")
                            }


                            if (this.name === "RSI" && taParam != null) {
                                str = "<b>" + rb.RSI + "</b> EMA-" + taParam[1] + ": <span style='color:#00a546'><b>" + res["RSI_2_" + taParam[1]] + "</b> (EMA-" + taParam[1] + ")</span>"; //var(--stanchart-green)
                            } else if (this.name === "MACD" && taParam != null) {
                                //            str = "<b>" + rb.MACD + "</b> " + taParam[2] + "," + taParam[3] + "," + taParam[1]+": <span style='color:#d0021b'><b>" + res.macd + "</b> (MACD)</span> <span style='color:#555555'><b>" + res.signal + "</b> (" + rb.signal + ")</span> <span><b>" + res.histogram + "</b> (" + rb.oscillator + ")</span>";
                                str = "<b>" + rb.MACD + "</b> " + taParam[2] + "," + taParam[3] + "," + taParam[1] + ": <span style='color:#d0021b'><b>" + res.macd + "</b> (MACD)</span> <span style='color:#555555'><b>" + res.signal + "</b> (" + rb.signal + ")</span>";
                            }
                            //else if (res.pctK) {
                            else if (this.name === "SKD" && taParam != null) {
                                str = "<b>" + rb.SKD + "</b> SMA," + taParam[1] + "," + taParam[2] + ": <span style='color:#d0021b'><b>%K " + res.pctK + "</b></span> <span style='color:#0080FF'><b>%D " + res.pctD + "</b></span>";
                            } else if (this.name === "FKD" && taParam != null) {
                                str = "<b>" + rb.FKD + "</b> SMA," + taParam[1] + "," + taParam[2] + ": <span style='color:#d0021b'><b>%K " + res.pctK + "</b></span> <span style='color:#0080FF'><b>%D " + res.pctD + "</b></span>";
                            }
                        } else {
                            // Otherwise, just show the TA name
                            var taParam = null;
                            if (that.$taparam != null) {
                                taParam = that.$taparam.split(":")
                            }

                            if (this.name === "RSI" && taParam != null) {
                                str = "<b>" + rb.RSI + "</b> EMA-" + taParam[1];
                            } else if (this.name === "MACD" && taParam != null) {
                                str = "<b>" + rb.MACD + "</b> " + taParam[2] + "," + taParam[3] + "," + taParam[1];
                            }
                            //else if (res.pctK) {
                            else if (this.name === "SKD" && taParam != null) {
                                str = "<b>" + rb.SKD + "</b> SMA," + taParam[1] + "," + taParam[2];
                            } else if (this.name === "FKD" && taParam != null) {
                                str = "<b>" + rb.FKD + "</b> SMA," + taParam[1] + "," + taParam[2];
                            }
                        }
                        that.chart.$tooltipbox2.html(str);
                    }
                }
            }
        },

        // c5
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

            // UI
            this.chart.$periodoptbtn.attr("tabid", this.chart.curperiod); // set the display name
            this.chart.$periodoptbtn.text(this.chart.curperiod);
            this.chart.$periodoptselbox.children(".chartoptbtn[tabid='" + this.chart.curperiod + "']").addClass("selected");
            //    this.resizeImpl();

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
            // UI
            this.chart.$typeoptbtn.attr("tabid", this.chart.curtype); // set the display icon
            this.chart.$typeoptselbox.children(".chartoptbtn[tabid='" + this.chart.curtype + "']").addClass("selected");

        },

        _OVERLAY_TALIST: [
            "nooverlay",
            "SMA",
            "BB",
            "SAR"
        ],
        _TAPANE_TALIST: [
            "notapane",
            "RSI",
            "MACD",
            "SKD",
            "FKD"
        ],
        _chart_changeta: function (ta) {
            // Remove the current one in the corresponding pane (i.e. overlay or ta pane)
            var _isoverlay;
            if ($.inArray(ta, this._OVERLAY_TALIST) !== -1) {
                _isoverlay = true;
                if (this.chart.curta.overlay)
                    this._chart_removeTAOverlay(this.chart.curta.overlay);
                this.chart.curta.overlay = ta; // save the new one
            } else {
                _isoverlay = false;
                if (this.chart.curta.tapane)
                    this._chart_removeTAPane(this.chart.curta.tapane);
                this.chart.curta.tapane = ta; // save the new one
            }

            // Apply the new TA settings
            var $panel = _isoverlay ? this.chart.$taconfigbox.children("#overlay") : this.chart.$taconfigbox.children("#tapane");
            $panel.find("select").val(ta);
            $panel.find(".taparam").hide().filter("[id='" + ta + "']").show();
            _isoverlay ? this._chart_addTAOverlay(ta) : this._chart_addTAPane(ta);

            // Save to cookie
            //   this.savecookie();
        },
        _chart_addTAPane: function (ta) {
            // State check
            if (!this.chart.mainchartobj)
                return;

            // Hide crosshair in Chart
            this.hideCrosshair();

            var that = this;
            var $taparam = this.chart.$taconfigbox.find("#tapane .taparam[id='" + ta + "']");
            var $input = $taparam.find("input");
            var p;

            switch (ta) {
                case "RSI":
                    p = $input.eq(0);
                    if (p.length > 0) {
                        p = this._parseTAinput(p.val());
                        if (p !== null) {
                            this.chart.tachartobj = this.chart.chartframeobj.add(chartFactory.PRICE_CHART, chartFactory.RSI, this.chart.$this.width(), this.chart._TAPANE_HEIGHT, this.chart.$chartpane_canvasbox, this._getMainChartOptions.call(this), 100);
                            this.chart.tachartobj.setGridStyle(chartFactory.GRID_LABEL_X);
                            this.chart.tachartobj.data(this.chart.mainchartobj.series);

                            this.chart.tachartobj.addPriceTracker2("lowerRSI", 25, {color: "#000080", textColor: "#333333", dashstyle: chartFactory.TRACKER_DASH});
                            this.chart.tachartobj.addPriceTracker2("upperRSI", 75, {color: "#000080", textColor: "#333333", dashstyle: chartFactory.TRACKER_DASH});
                            this.chart.tachartobj.addPriceTracker2("y50", 50, {color: "#EEEEEE", textColor: "#333333", dash: 0});
                            this.chart.tachartobj.fixedScale(0, 100);
                            this.chart.tachartobj.addRSI({
                                method: chartFactory.MA_EMA,
                                period: p,
                                color: "#00a546", //var(--stanchart-green)
                                thickness: 2,
                                style: 0
                            });
                            this.chart.tachartobj.show(this.chart.mainchartobj);
                        }
                        this.$taparam = "RSI:" + p;
                    }
                    break;

                case "MACD":
                    p = $input.eq(2);
                    var p1 = $input.eq(0), p2 = $input.eq(1);
                    if (p.length > 0) {
                        p = this._parseTAinput(p.val());
                        p1 = this._parseTAinput(p1.val());
                        p2 = this._parseTAinput(p2.val());
                        if (p !== null && p1 !== null && p2 !== null) {
                            this.chart.tachartobj = this.chart.chartframeobj.add(chartFactory.PRICE_CHART, chartFactory.MACD, this.chart.$this.width(), this.chart._TAPANE_HEIGHT, this.chart.$chartpane_canvasbox, this._getMainChartOptions.call(this), 100);
                            this.chart.tachartobj.setGridStyle(chartFactory.GRID_LABEL_X | chartFactory.GRID_LABEL_Y);
                            this.chart.tachartobj.data(this.chart.mainchartobj.series);

                            this.chart.tachartobj.addMACD({
                                macd: {
                                    period: p1,
                                    period2: p2,
                                    color: "#d0021b",
                                    thickness: 2,
                                    style: 0
                                },
                                signal: {
                                    period: p,
                                    color: "#555555",
                                    thickness: 2,
                                    style: 0
                                },
                                hist: {
                                    posColor: "#0091ea",
                                    negColor: "#d0021b"
                                }
                            });
                            this.chart.tachartobj.show(this.chart.mainchartobj);
                        }
                        this.$taparam = "MACD:" + p + ":" + p1 + ":" + p2;
                    }
                    break;

                case "SKD":
                    p = $input.eq(0);
                    var p1 = $input.eq(1);
                    if (p.length > 0) {
                        p = this._parseTAinput(p.val());
                        p1 = this._parseTAinput(p1.val());
                        if (p !== null && p1 !== null) {
                            this.chart.tachartobj = this.chart.chartframeobj.add(chartFactory.PRICE_CHART, chartFactory.STOCHASTIC_SLOW, this.chart.$this.width(), this.chart._TAPANE_HEIGHT, this.chart.$chartpane_canvasbox, this._getMainChartOptions.call(this), 100);
                            this.chart.tachartobj.setGridStyle(chartFactory.GRID_LABEL_X);
                            this.chart.tachartobj.data(this.chart.mainchartobj.series);

                            this.chart.tachartobj.addPriceTracker2("lowerSKD", 25, {color: "#000080", textColor: "#333333", dashstyle: chartFactory.TRACKER_DASH});
                            this.chart.tachartobj.addPriceTracker2("upperSKD", 75, {color: "#000080", textColor: "#333333", dashstyle: chartFactory.TRACKER_DASH});
                            this.chart.tachartobj.addPriceTracker2("y50", 50, {color: "#EEEEEE", textColor: "#333333", dash: 0});
                            this.chart.tachartobj.fixedScale(0, 100);
                            this.chart.tachartobj.addStochastic({
                                method: chartFactory.MA_SMA,
                                periodK: p,
                                colorK: "#d0021b",
                                thicknessK: 2,
                                styleK: 0,
                                periodD: p1,
                                periodF: 3,
                                colorD: "#0080FF",
                                thicknessD: 2,
                                styleD: 0
                            });
                            this.chart.tachartobj.show(this.chart.mainchartobj);
                        }
                        this.$taparam = "SKD:" + p + ":" + p1 + ":3";
                    }
                    break;

                case "FKD":
                    p = $input.eq(0);
                    var p1 = $input.eq(1);
                    if (p.length > 0) {
                        p = this._parseTAinput(p.val());
                        p1 = this._parseTAinput(p1.val());
                        if (p !== null && p1 !== null) {
                            this.chart.tachartobj = this.chart.chartframeobj.add(chartFactory.PRICE_CHART, chartFactory.STOCHASTIC_FAST, this.chart.$this.width(), this.chart._TAPANE_HEIGHT, this.chart.$chartpane_canvasbox, this._getMainChartOptions.call(this), 100);
                            this.chart.tachartobj.setGridStyle(chartFactory.GRID_LABEL_X);
                            this.chart.tachartobj.data(this.chart.mainchartobj.series);

                            this.chart.tachartobj.addPriceTracker2("lowerFKD", 25, {color: "#000080", textColor: "#333333", dashstyle: chartFactory.TRACKER_DASH});
                            this.chart.tachartobj.addPriceTracker2("upperFKD", 75, {color: "#000080", textColor: "#333333", dashstyle: chartFactory.TRACKER_DASH});
                            this.chart.tachartobj.addPriceTracker2("y50", 50, {color: "#EEEEEE", textColor: "#333333", dash: 0});
                            this.chart.tachartobj.fixedScale(0, 100);
                            this.chart.tachartobj.addFastStochastic({
                                method: chartFactory.MA_SMA,
                                periodK: p,
                                colorK: "#d0021b",
                                thicknessK: 2,
                                styleK: 0,
                                periodD: p1,
                                periodF: 3,
                                colorD: "#0080FF",
                                thicknessD: 2,
                                styleD: 0
                            });
                            this.chart.tachartobj.show(this.chart.mainchartobj);
                        }
                        this.$taparam = "FKD:" + p + ":" + p1 + ":3";
                    }
                    break;

                case "notapane":
                    this.$taparam = null;
                default:
                    break;
            }

            if (this.chart.tachartobj)
                this.chart.tachartobj.c5pobj = this; // ensure the reference to this c5pobj is saved, if there is a TAChartObj (i.e. not removed ;)

            // Make sure it is shown properly ;)
            this.resizeImpl();
        },
        _chart_removeTAPane: function (ta) {
            switch (ta) {
                case "RSI":
                    this.chart.chartframeobj.remove(chartFactory.RSI);
                    break;

                case "MACD":
                    this.chart.chartframeobj.remove(chartFactory.MACD);
                    break;

                case "SKD":
                    this.chart.chartframeobj.remove(chartFactory.STOCHASTIC_SLOW);
                    break;

                case "FKD":
                    this.chart.chartframeobj.remove(chartFactory.STOCHASTIC_FAST);
                    break;

                case "notapane":
                default:
                    break;
            }

            this.chart.tachartobj = null; // clear the reference

            // Make sure it is shown properly ;)
            this.resizeImpl();
        },
        _chart_addTAOverlay: function (ta) {
            // State check
            if (!this.chart.mainchartobj)
                return;

            // Hide crosshair in Chart
            this.hideCrosshair();

//        var that = this;
            var $taparam = this.chart.$taconfigbox.find("#overlay .taparam[id='" + ta + "']");
            var $input = $taparam.find("input");
            var p;

            switch (ta) {
                case "SMA":
                    p = $input.eq(0);
                    if (p.length > 0) {
                        p = this._parseTAinput(p.val());
                        if (p !== null) {
                            this.chart.mainchartobj.addSMA({
                                period: p,
                                color: "#d0021b",
                                thickness: 2,
                                style: 0
                            }, 100);
                        }
                        this.$taparamOverlay = "SMA:" + p;
                    }
                    p = $input.eq(1);
                    if (p.length > 0) {
                        p = this._parseTAinput(p.val());
                        if (p !== null) {
                            this.chart.mainchartobj.addSMA({
                                period: p,
                                color: "#FFB0B0",
                                thickness: 2,
                                style: 0
                            }, 100);
                        }
                        this.$taparamOverlay += ":" + p;
                    }
                    p = $input.eq(2);
                    if (p.length > 0) {
                        p = this._parseTAinput(p.val());
                        if (p !== null) {
                            this.chart.mainchartobj.addSMA({
                                period: p,
                                color: "#449999",
                                thickness: 2,
                                style: 0
                            }, 100);
                        }
                        this.$taparamOverlay += ":" + p;
                    }
                    break;

                case "BB":
                    // ... add BB
                    p = $input.eq(0);
                    if (p.length > 0) {
                        p = this._parseTAinput(p.val());
                        if (p !== null) {
                            //        this.chart.mainchartobj.addBollinger({
                            //            period: 25,
                            //            deviation: {
                            //                value: 1,
                            //                color0: "#FFB0B0",
                            //                color1: "#449999",
                            //                thickness: 1,
                            //                style: 0
                            //            }
                            //        }, 100);
                            this.chart.mainchartobj.addBollinger({
                                period: p,
                                deviation: {
                                    value: 2,
                                    color0: "#0091ea",
                                    color1: "#d0021b",
                                    thickness: 2,
                                    style: 0
                                }
                            }, 100);
                            //        this.chart.mainchartobj.addBollinger({
                            //            period: 25,
                            //            deviation: {
                            //                value: 3,
                            //                color0: "#FFB0B0",
                            //                color1: "#449999",
                            //                thickness: 1,
                            //                style: 0
                            //            }
                            //        }, 100);
                            this.chart.mainchartobj.addBollinger({
                                period: 25,
                                color: "#555555",
                                thickness: 1,
                                style: "d"
                            }, 100);
                        }
                        this.$taparamOverlay = "BB:" + p + ":2";
                    }
                    break;

                case "SAR":
                    this.chart.mainchartobj.addSAR({
                        color: "#d0021b",
                        factor: {
                            def: 0.02,
                            inc: 0.02,
                            max: 0.2
                        }
                    }, 100);
                    this.$taparamOverlay = "SAR";
                    break;

                case "nooverlay":
                    this.$taparamOverlay = null;
                default:
                    break;
            }
        },
        _chart_removeTAOverlay: function (ta) {
            switch (ta) {
                case "SMA":
                    var ids = [];
                    var drawers = this.chart.mainchartobj.drawers;
                    for (var i = 0; i < drawers.length; i++) {
                        if (drawers[i].obj.name.startsWith(chartFactory.SMA))
                            ids.push(drawers[i].obj.name);
                    }

                    for (var i = 0; i < ids.length; i++) {
                        this.chart.mainchartobj.removeDrawer(ids[i]);
                    }
                    break;

                case "BB":
                    var ids = [];
                    var drawers = this.chart.mainchartobj.drawers;
                    for (var i = 0; i < drawers.length; i++) {
                        if (drawers[i].obj.name.startsWith(chartFactory.BOLLINGERBANDS))
                            ids.push(drawers[i].obj.name);
                    }
                    for (var i = 0; i < ids.length; i++) {
                        this.chart.mainchartobj.removeDrawer(ids[i]);
                    }
                    break;

                case "SAR":
                    this.chart.mainchartobj.removeDrawer(chartFactory.SAR);
                    break;

                case "nooverlay":
                default:
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

            var lblrb = this.pageobj_rb.lbl;
            $.each(this.$pageobj.find("[lbl]"), function () {
                var $obj = $(this);
                var id = $obj.attr("lbl");
                var lbl = lblrb[id];
                if (!lbl)
                    lbl = LabCI.WP.CommonRC.getMsg(id, LabCI.getLang());
                $obj.html(lbl);
            });

//        var that = this;
//this.$input.attr("_placeholder", this.pageobj_rb.placeholder);
        },

        ////////////////////////////////////////////////////////////////////

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {
                def: {

                }
            }
        }

    };

})(jQuery);