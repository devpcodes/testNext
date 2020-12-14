
(function ($) {

//################################################################################
//################################################################################
// The LabCI object for Generic Widget Package
// LabCI = { WP: { ... } }

    if (typeof (LabCI) === "undefined")
        LabCI = {WP: {}};
    else if (typeof (LabCI.WP) === "undefined")
        LabCI.WP = {};

    var _DEFAULT_INDEXRIC = ".HSI";

//################################################################################

// Create a new IndexPageObj ...
    LabCI.WP.createworldnavpageobj = function () {
        var pobj = LabCI.AbstractPageObj.extend("lsinopac-worldnav", LabCI.WP.WorldNavPageObj);
        return pobj;
    };

    LabCI.WP.WorldNavPageObj = {
        QUOTELISTRICLIST: {
           // 0: ".HSI,.SSEC,.SZSC,.N225,.TWII,.STI,.DJI,.IXIC"
           0: ".HSI,.TWII,.DJI,.IXIC"
        },
        RIC2BOXID: {
            ".HSI": "HONGKONG",
            ".SSEC": "CHINA1",
            ".SZSC": "CHINA2",
            ".N225": "JAPAN",
            ".TWII": "TAIWAN",
            ".STI": "SINGAPORE",
            ".DJI": "US1",
            ".IXIC": "US2"
        },
        CCNAME: {
            "SINGAPORE": "SINGAPORE",
            "CHINA1": "CHINA1",
            "CHINA2": "CHINA2",
            "TAIWAN": "TAIWAN",
            "HONGKONG": "HONGKONG",
            "JAPAN": "JAPAN",
            "US1": "US1",
            "US2": "US2"
        },
        IDXNAME: {
            "TAIWAN": "TWII",
            "CHINA1": "SSEC",
            "CHINA2": "SZSC",
            "HONGKONG": "HSI",
            "US1": "DJI",
            "US2": "IXIC",
            "SINGAPORE": "STI",
            "JAPAN": "NIKKEI"
        },
        _UNITSCALE2NAME: {
            "x1000": "K ",
            "x10000": "x10K ",
            "x10K": "x10K ",
            "x1000000": "M ",
            "x1M": "M ",
            "x100000000": "x100M "
        },
        _MAPQUOTEBOX_MAP: {
            "worldmap": {
                "TAIWAN": ["TAIWAN", "TWII"],
                "HONGKONG": ["HONGKONG", "HSI"]
            //    "CHINA1": ["CHINA1", "SSEC"],
            //    "CHINA2": ["CHINA2", "SZSC"],
            //    "SINGAPORE": ["SINGAPORE", "STI"],
            //    "US1": ["US1", "DJI"],
            //    "US2": ["US2", "IXIC"],
            //    "JAPAN": ["JAPAN", "NIKKEI"]
            }
        },
        _LABELS: {
            "TRIDX": "TR-IDX",
            "TSE33": "TSE33-IDX",
            "TRBC": "TR-SCT",
            "unit.vo": "", // 株
            "unit.PER": "", // 倍
            "unit.mktschedule": "", // 社

            "label.fxcodeselect.prefix": "FX - ",
            "msg.maxpopoutscreen": "Max number popout windows have been opened. Please close some before opening another.",
            "errmsg.login.default": "",
            "errmsg.login.s1": "Session Timeout",
            "errmsg.login.l1": "Invalid Username or Password",
            "errmsg.login.l2": "Account Inactive",
            "errmsg.login.l3": "System error was encountered, please login again.",
            "label.setting": "Confirm",
            "label.ok": "Confirm",
            "label.cancel": "Cancel",
            "label.end": "End"
        },
        /*    chart: {
         $this: null,
         $chartwidget: null,
         chartframeobj: null,
         CHARTNAME_MAINCHART: "mainchart",
         $chartpane: null,
         $chartpane_canvasbox: null,
         mainchartobj: null,
         _TAPANE_HEIGHT: 100, // in pixels
         curperiod: "1D",
         curtype: "line",
         curta: {
         overlay: "nooverlay",
         tapane: "notapane"
         }
         },
         */
        $worldnav: null,
        $mapregionbox: null,
        $mapQuoteBox: null,
        $mpanel: null,
        $quotedetail: null,
        $mswiper: null,
        $tachartbox: null,
        $chartbox: null,
        currentquoteric: _DEFAULT_INDEXRIC,
        currentperiod: "MINUTE_1",
        currentinterval: "DAY_1",
        mode: "desktop",
        initImpl: function () {
            // Get ready
            var that = this;
            this.$mapregionbox = this.$pageobj.find(".mapregion");
            this.$mapQuoteBox = this.$pageobj.find(".quoteregion");
            this.$worldnav = this.$pageobj.find("#lsinopac-worldnav");
            this.$mpanel = this.$pageobj.find(".mpanel");
            this.$quotedetail = this.$pageobj.find(".quotedetail");

            //refresh button...

            this.$pageobj.find(".refreshBtn").on("click", function () {
                that._loaddata();
                that._loaddataquote();
            });


            //set the region...
            for (var key in that._MAPQUOTEBOX_MAP) {
                var tmpObj = $("<img style='width: 630px' src='../images/worldnav/world_map3.png'/><div class='mapquoteboxlayer'></div>")
                this.$mapregionbox.append(tmpObj);

                for (var key2 in that._MAPQUOTEBOX_MAP[key]) {
                    var tmpObj2 = $(
                            '<div class="mapquotebox box_' + key2 + '" boxId ="' + key2 + '"> \
                            <div class="title"><div class="ccname font1 ' + that.IDXNAME[key2] + 'slabel">' + that.IDXNAME[key2] + '</div><div class="stream time td" format="date">--/--</div><div class="stream time tm" format="timenoreplace">--:--</div></div> \
                            <div class="content"> \
                                <div class="boxprice" style="float:left"> \
                                    <div class="stream flash font1 price ls">-</div> \
                                </div> \
                                <div class="boxchange" style="float:right"> \
                                    <div class="stream flash change nc" style="padding-bottom:3px" nozero="true">-</div><div class="stream flash change pc" nozero="true" dp="2" percentage="true">-</div> \
                                </div>  \
                                <div style="clear:both"> \
                            </div> \
                        </div>'
                            );

                    if (that.CCNAME[key2] == "") {
                        tmpObj2.find(".title").hide();
                    } else {
                        tmpObj2.find(".title").show();
                    }
                    this.$mapregionbox.find(".mapquoteboxlayer").append(tmpObj2);
                }
            }


            this.$mapregionbox.find(".mapquotebox").on("click", function () {
                that.currentquoteric = $(this).attr("ric");
                that._loaddata();
                that._loaddataquote();
                that.$mapregionbox.find(".mapquotebox").removeClass("selected");
                $(this).addClass("selected");
            });

            // c5

            /*    this.chart.$this = this.$quotedetail.find(".chartbox");
             // Prepare the Chart Factory
             this.chart.$chartwidget = this.chart.$this.find(".c5box");
             chartFactory.LEFT_MARGIN = 15;
             chartFactory.RIGHT_MARGIN = 30;
             chartFactory.TOP_MARGIN = 5;
             chartFactory.BOTTOM_MARGIN = 15;
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
             
             
             this._chart_changeperiod(); // initialize with the default period
             this._chart_changetype(); // initialize with the default type        
             */

            this.$tachartbox = this.$pageobj.find(".tachartbox");
            this.$chartbox = this.$tachartbox.find("#chartCanvas").sschart({
                span: "HOURLY",
                period: "DAY_4",
                type: "LINE",
                brand: null,
                gid: null,
                trend: false,
                imageOnly: true,
                onZoomToCustom: null,
                onCrossHairMove: function (event, data) {
                },
                onTAValueChange: function (event, result) {

                },
                onChange: function (event, data) {
                }
            });

            ////////////////////////////////////////////////////////////////////

            // Prepare the resize function
            // ... this has to be created here, because when resize() is called, the "this" will be in a different context
            // ... hence, use "that" in the function scope here to build this resize() function
            // ... a bad trick, but works ;)
            this.resize = function () {
                var that = this;
                that.$pageobj.delaycall("resize", function () {
                    that.resizeImpl();
                }, 100);
            };

            this.$quotedetail.find(".periodselect").on("click", function () {
                that.$quotedetail.find(".periodselect").removeClass("selected");
                $(this).addClass("selected");
                that._chart_changeperiod($(this).attr("p"));
            });


            //mobile version...
            $.each(this._MAPQUOTEBOX_MAP["worldmap"], function (index, ricdata) {
                var lastAddedClass = "";
                if (index == "JAPAN") {
                    lastAddedClass = "last";
                }

                that.$mpanel.append('<div class="mquoteinfo mbox_' + index + ' swiper-slide ' + lastAddedClass + '" mboxid="' + index + '"> \
                        <div class="mquote ' + index + '"><div class="row namerow"> \
                            <div class="name col-8 text-left ' + index + '" style="padding-right: 0px">' + that.pageobj_rb.lbl[ that.IDXNAME[index] + "label" ] + '</div> \
                            <div class="date col-4 text-right align-middle" style="padding-left: 0px">-</div> \
                        </div> \
                        <div class="row pricerow" style=""> \
                            <div class="price col-5 text-left">-</div> \
                            <div class="netchange col-3 text-right align-middle"style="padding-left:0px;padding-right:0px">-</div> \
                            <div class="pctchange col-4 text-right align-middle" style="padding-left:0px">-</div> \
                        </div></div> \
                    </div> ');
            });

            this.$mswiper = new Swiper(".swiper-container", {
                direction: 'vertical',
                slidesPerView: 'auto',
                //    autoHeight: true,
                freeMode: true,
                mousewheel: true
            });

            this.$mpanel.find(".mquote").on("click", function () {
                that._loaddata();
                that._getMQuote($(this).parent().attr("ric"));


            });

            that.resizeImpl();

            return this;
        },
        resizeImpl: function () {
            var that = this;
            var param = "code:" + this.currentquoteric;

            if (this.$pageobj.find(".mobiletemplate").is(":visible")) {
                //        this.$pageobj.find(".desktoptemplate").hide();
                //        this.$pageobj.find(".mobiletemplate").show();
                //    .mobiletemplate{
                //        display: block;
                //    } 
            } else {
                //        this.$pageobj.find(".mobiletemplate").hide();
                //        this.$pageobj.find(".desktoptemplate").show();
            }

            if (this.$pageobj.find(".desktoptemplate").is(":visible") && this.mode != "desktop" ||
                    this.$pageobj.find(".mobiletemplate").is(":visible") && this.mode != "mobile") {
                if (this.$pageobj.find(".desktoptemplate").is(":visible")) {
                    this.mode = "desktop";
                } else {
                    this.mode = "mobile";
                }
                this.show();
            }




            // c5
            //    this.$pageobj.css("min-height", ($(window).innerHeight()) + "px");
            // Force resizing C5 in order to show the chart correctly ;)

            this.resizeMainChart.call(this);

        },
        ////////////////////////////////////////////////////////////////////

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

        showImpl: function (statedata) {

            var that = this;
            var isStart = true;

            if (statedata) {
                if (statedata.ric) {
                    this.currentquoteric = statedata.ric;
                }
            }

            that._loaddata();
            if (that.mode == "desktop") {
                that.$quotedetail.appendTo(that.$mapQuoteBox);
                that.$quotedetail.show();
                that._loaddataquote();
            } else if (that.mode == "mobile") {
                //       that._getMQuote(this.currentquoteric);
                //    this.$pageobj.find(".mobiletemplate").show();
            }

            that.$chartbox.sschart("setMultiOption", "code:" + this.currentquoteric + "|span:" + that.currentperiod + "|period:" + that.currentinterval + "|type:LINE|token:" + encodeURIComponent(LabCI.getToken()));

            return this;
        },
        hideImpl: function () {
            // Chain this...
            return this;
        },
        refreshImpl: function () {
            return this.show();
        },
        resetImpl: function () {
            return this; // chain this
        },
        ////////////////////////////////////////////////////////////////////

        getStateDataImpl: function () {
            var that = this;
            var statedata = {};
            statedata.ric = this.currentquoteric;
            return statedata;
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
        _getMQuote: function (ric) {
            var that = this;
            if (that.currentquoteric == ric && that.$quotedetail.is(":visible")) {
                //same ric
                that.$quotedetail.slideUp(400, function () {
                    that.$mswiper.update();
                });

            } else {
                that.currentquoteric = ric;
                that.$quotedetail.slideUp(400, function () {
                    that.$quotedetail.appendTo(that.$mpanel.find(".mquoteinfo.mbox_" + that.RIC2BOXID[ric]));
                    that.$quotedetail.slideDown(400, function () {
                        that.$mswiper.update();
                        that._loaddataquote();
                    });
                });


            }

        },
        _loaddata: function () {
            // Get ready
            var that = this;

            // Load assetinfo and start streaming...
            var riclist = this.QUOTELISTRICLIST[0];


            this.$pageobj.loaddata("worldnav", "/data/worldnav",
                    {
                        symbol: riclist,
                        lang: this.lang,
                        token: encodeURIComponent(LabCI.getToken())
                    },
                    function (result) {
                        if (result && result.data && result.data.responseCode !== "F") {
                            if (result.data.datalist && result.data.datalist.length > 0) {
                                $.each(result.data.datalist, function (index, ricdata) {
                                    // For this RIC...
                                    var ric = ricdata.ric;
                                    if (that.mode == "desktop") {
                                        var $databox = that.$mapregionbox.find(".mapquotebox.box_" + that.RIC2BOXID[ric]);
                                        $databox.attr("ric", ric);

                                        //     $databox.find(".idxname").html(ricdata.nm);

                                        var fidmap = ricdata;

                                        if (fidmap) {
                                            var updownclass = getUpDownClass(ricdata.nc);
                                            if (ricdata.td == "") {
                                                ricdata.td = ricdata.tm;
                                                ricdata.tm = "";
                                            }
                                            $databox.find("div.stream").attr("ric", ric);
                                            $databox.find(".td").attr("fid", fidmap.td).attr("timeref", fidmap.tm).html(formatShortDate(ricdata.td));
                                            $databox.find(".tm").attr("fid", fidmap.tm).html(formatShortTime(ricdata.tm) + ", ");
                                            $databox.find(".ls").attr("fid", fidmap.ls).attr("dp", ricdata.dp).attr("flashfid", fidmap.nc + " " + fidmap.pc).html(ricdata.ls);
                                            $databox.find(".nc").attr("fid", fidmap.nc).attr("dp", ricdata.dp).addClass(updownclass).setValue(ricdata.nc, null, true);
                                            $databox.find(".pc").attr("fid", fidmap.pc).addClass(updownclass).setValue(ricdata.pc, "%", true);
                                        }

                                        if (ric == that.currentquoteric) {
                                            that.$mapregionbox.find(".mapquotebox").removeClass("selected");
                                            $databox.addClass("selected");
                                        }
                                    } else if (that.mode == "mobile") {

                                        var $databox = that.$mpanel.find(".mbox_" + that.RIC2BOXID[ric]);
                                        $databox.attr("ric", ric);
                                        var fidmap = ricdata;
                                        if (fidmap) {
                                            var updownclass = getUpDownClass(ricdata.nc);
                                            if (ricdata.td == "") {
                                                ricdata.td = ricdata.tm;
                                                ricdata.tm = "";
                                            }
                                            //    $databox.find("div.stream").attr("ric", ric);
                                            $databox.find(".date").attr("fid", fidmap.td).attr("timeref", fidmap.tm).html(formatShortTime(ricdata.tm) + ",&nbsp;" + formatShortDate(ricdata.td));
                                            $databox.find(".tm").attr("fid", fidmap.tm).html(formatShortTime(ricdata.tm));
                                            $databox.find(".price").attr("fid", fidmap.ls).attr("dp", ricdata.dp).attr("flashfid", fidmap.nc + " " + fidmap.pc).html(ricdata.ls);
                                            $databox.find(".netchange").attr("fid", fidmap.nc).attr("dp", ricdata.dp).removeClass("upval").removeClass("downval").addClass(updownclass).setValue(ricdata.nc, null, true);
                                            $databox.find(".pctchange").attr("fid", fidmap.pc).removeClass("upval").removeClass("downval").addClass(updownclass).setValue(ricdata.pc, "%", true);
                                        }
                                    }
                                });

                            }


                        } else {
                            //Error handling...
                        }
                        //    if (result && result.data && result.data.responseCode!=="F") {
                        //        $imgdiv.append($("<img/>").attr("src", "data:image/png;base64," + result.data.compscoreimage));
                        //    }
                        //    else {
                        //        // Error handling...
//
                        //    }
                    },
                    0,
                    {
                        datatype: "jsonp"
                    });
        },

        _loaddataquote: function () {
            // Get ready
            var that = this;
            var ric = that.currentquoteric;

            this.$pageobj.loaddata("worldnav_quote", "/data/worldnav_quote",
                    {
                        symbol: ric,
                        lang: this.lang,
                        token: encodeURIComponent(LabCI.getToken())
                    },
                    function (result) {
                        if (result && result.data && result.data.responseCode !== "F") {

                            if (result.data.datalist && result.data.datalist.length > 0) {

                                $.each(result.data.datalist, function (index, ricdata) {
                                    // For this RIC...
                                    var ric = ricdata.ric;


                                    var fidmap = ricdata;

                                    if (fidmap) {
                                        var updownclass = getUpDownClass(ricdata.nc);
                                        if (ricdata.td == "") {
                                            ricdata.td = ricdata.tm;
                                            ricdata.tm = "";
                                        }

                                        that.$mapQuoteBox.find(".name").html(that.pageobj_rb.lbl[ that.IDXNAME[that.RIC2BOXID[ric]] + "label" ]);
                                        that.$mapQuoteBox.find(".date").html(formatShortTime(ricdata.tm) + ",&nbsp;&nbsp; " + formatShortDate(ricdata.td));
                                        that.$mapQuoteBox.find(".price").html(ricdata.ls);
                                        that.$mapQuoteBox.find(".netchange").removeClass("upval").removeClass("downval").addClass(updownclass).setValue(ricdata.nc, null, true);
                                        that.$mapQuoteBox.find(".pctchange").removeClass("upval").removeClass("downval").addClass(updownclass).setValue(ricdata.pc, "%", true);
                                        if (ric == ".HSI") {
                                            that.$quotedetail.find(".turnover").html(ricdata.mktam + LabCI.WP.CommonRC.unitscale2name(ricdata.mktamunit, that.lang) + that.pageobj_rb.lbl['unit']);
                                        } else {
                                            that.$quotedetail.find(".turnover").html(ricdata.am + LabCI.WP.CommonRC.unitscale2name(ricdata.amunit, that.lang) + that.pageobj_rb.lbl['unit']);
                                        }

                                        that.$quotedetail.find(".r1M").removeClass("upval").removeClass("downval").addClass(getUpDownClass(ricdata.p1m)).setValue(ricdata.p1m, "%", true);
                                        that.$quotedetail.find(".r3M").removeClass("upval").removeClass("downval").addClass(getUpDownClass(ricdata.p3m)).setValue(ricdata.p3m, "%", true);
                                        that.$quotedetail.find(".r6M").removeClass("upval").removeClass("downval").addClass(getUpDownClass(ricdata.p6m)).setValue(ricdata.p6m, "%", true);
                                        that.$quotedetail.find(".r1Y").removeClass("upval").removeClass("downval").addClass(getUpDownClass(ricdata.p1y)).setValue(ricdata.p1y, "%", true);

                                    }

                                });

                            }


                        } else {
                            //Error handling...
                        }
                        //    if (result && result.data && result.data.responseCode!=="F") {
                        //        $imgdiv.append($("<img/>").attr("src", "data:image/png;base64," + result.data.compscoreimage));
                        //    }
                        //    else {
                        //        // Error handling...
//
                        //    }
                    },
                    0,
                    {
                        datatype: "jsonp"
                    });

            // c5 load chart
            //    that._chart_loaddata(ric);
            that.$chartbox.sschart("setMultiOption", "code:" + ric + "|span:" + that.currentperiod + "|period:" + that.currentinterval + "|type:LINE|token:" + encodeURIComponent(LabCI.getToken()));

        },

        // c5
        _chart_changeperiod: function (period) {
            // Save it and apply
            if (period) {
                // Period changed, save it and check if need to refresh the data with differet interval...
                this.currentperiod = period;
                switch (this.currentperiod) {
                    case "MINUTE_1":
                        this.currentinterval = "DAY_1";
                        break;
                    case "DAILY":
                        this.currentinterval = "MONTH_1";
                        break;
                    case "WEEKLY":
                        this.currentinterval = "MONTH_3";
                        break;
                    case "MONTHLY":
                        this.currentinterval = "YEAR_5";
                        break;
                }
                this.$chartbox.sschart("setMultiOption", "code:" + this.currentquoteric + "|assettype:EQUITY|span:" + this.currentperiod + "|period:" + this.currentinterval + "|type:LINE|token:" + encodeURIComponent(LabCI.getToken()));


                /*    var _old = this.chart.curperiod;
                 this.chart.curperiod = period;
                 if (_old !== this.chart.curperiod) {
                 // Period changed, save it and check if need to refresh the data with differet interval...
                 switch (this.chart.curperiod) {
                 case "1D":
                 case "1W":
                 case "1M":
                 case "3M":
                 case "6M":
                 case "1Y":
                 // Different MTS period use different intervals
                 // hence end here, since we need to load data with different interval
                 return this._chart_loaddata();
                 break;
                 
                 default:
                 switch (_old) {
                 case "1D":
                 case "1W":
                 case "1M":
                 case "3M":
                 case "6M":
                 case "1Y":
                 // Switching from MTS period to HTS period
                 // hence end here, since we need to load data with different interval
                 return this._chart_loaddata();
                 break;
                 }
                 break;
                 }
                 }
                 */
            }

            /*        var showfr = new Date();
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
             */
            this.resizeImpl();

        },

        /*    _chart_changetype: function (type) {
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
         */
        /*        _chart_loaddata: function () {
         
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
         
         case "1M":
         _dataopts._c5api = "hts";
         _dataopts._c5apiparam_i = "d";
         _dataopts._datatype = chartFactory.HTS_DATA;
         _dataopts._gridtype = chartFactory.GRID_DATE_ALIGN;
         _dataopts._dtfmt = "FORMATPATTERN_CHARTDATE";
         break;
         case "3M":
         _dataopts._c5api = "hts";
         _dataopts._c5apiparam_i = "w";
         _dataopts._datatype = chartFactory.HTS_DATA;
         _dataopts._gridtype = chartFactory.GRID_DATE_ALIGN;
         _dataopts._dtfmt = "FORMATPATTERN_CHARTDATE";
         break;
         case "6M":
         _dataopts._c5api = "hts";
         _dataopts._c5apiparam_i = "w";
         _dataopts._datatype = chartFactory.HTS_DATA;
         _dataopts._gridtype = chartFactory.GRID_DATE_ALIGN;
         _dataopts._dtfmt = "FORMATPATTERN_CHARTDATE";
         break;
         case "1Y":
         _dataopts._c5api = "hts";
         _dataopts._c5apiparam_i = "m";
         _dataopts._datatype = chartFactory.HTS_DATA;
         _dataopts._gridtype = chartFactory.GRID_DATE_ALIGN;
         _dataopts._dtfmt = "FORMATPATTERN_CHARTDATE";
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
         */
        _unitscale2name: function (sc) {
            var name = this._UNITSCALE2NAME[sc];
            if (!name)
                name = sc;
            return name;
        },
        _vounit2name: function (vounit) {
            if (vounit == null || vounit == "-")
                return "";
            return this._unitscale2name(vounit) + this._getLabel("unit.vo");
        },
        _getLabel: function (key) {
            var name = this._LABELS[key];
            if (name == null)
                name = key;
            return name;
        },
        _unitscale2name: function (sc) {
            var name = this._UNITSCALE2NAME[sc];
            if (!name)
                name = sc;
            return name;
        },
        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {
            }
        }

    };

})(jQuery);