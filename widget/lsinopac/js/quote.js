
(function ($) {

//################################################################################
//################################################################################
// The LabCI object for Generic Widget Package
// LabCI = { WP: { ... } }

    if (typeof (LabCI) === "undefined")
        LabCI = {WP: {}};
    else if (typeof (LabCI.WP) === "undefined")
        LabCI.WP = {};

    var _DEFAULT_INDEXRIC = "2890.TW";

//################################################################################

// Create a new IndexPageObj ...
    LabCI.WP.createquotepageobj = function () {
        var pobj = LabCI.AbstractPageObj.extend("lsinopac-quote", LabCI.WP.QuotePageObj);
        return pobj;
    };

    LabCI.WP.QuotePageObj = {
        chart: {
            $this: null,
            $chartwidget: null,
            chartframeobj: null,
            CHARTNAME_MAINCHART: "mainchart",
            $chartpane: null,
            $chartpane_canvasbox: null,
            mainchartobj: null,
            _TAPANE_HEIGHT: 100, // in pixels
            curperiod: "1W",
            curtype: "line",
            curta: {
                overlay: "nooverlay",
                tapane: "notapane"
            }
        },
        $quote: null,
        $stockinfopanel: null,
        $sectionbox: null,
        $quotedetail: null,
        $quoterelated: null,
        $mobilenavbar: null,
        recperpage: 10,
        changedric: false,
        //    currentrealtedStock: null,
        //    $mswiper: null,
        currentquoteric: _DEFAULT_INDEXRIC,
        currentSymbol: null,
        currentExchange: null,
        currentPrice: null,
        currentsection: "summary",
        mode: "desktop",
        breakpoint: null,
        streamingTimer: null,
        initImpl: function () {
            // Get ready
            var that = this;
            this.$sectionbox = this.$pageobj.find(".sectionbox");
            this.$quote = this.$pageobj.find("#lsinopac-quote");
            this.$stockinfopanel = this.$pageobj.find(".stockinfopanel");
            this.$quotedetail = this.$pageobj.find("#lsinopac-quote-detail");
            this.$quoterelated = this.$pageobj.find("#lsinopac-quote-related");
            this.$mobilenavbar = this.$pageobj.find(".mobile-navbar");


            this.$sectionbox.find(".sectionboxitem").on("click", function () {
                that.$sectionbox.find(".sectionboxitem").removeClass("selected");
                $(this).addClass("selected");
                if ($(this).attr("mode") == "chart") {
                    that.currentsection = "chart";
                    that._loadChartWidget();
                } else if ($(this).attr("mode") == "summary") {
                    that.currentsection = "summary";
                    that._loadSummaryWidget();
                } else if ($(this).attr("mode") == "srplus") {
                    that.currentsection = "srplus";
                    that._loadSRPlusWidget();
                } else if ($(this).attr("mode") == "financial") {
                    that.currentsection = "financial";
                    that._loadFinancialWidget();
                }
            });

            this.$mobilenavbar.find(".tab").on("click", function () {
                that.$mobilenavbar.find(".tab").removeClass("selected");
                $(this).addClass("selected");
                if ($(this).attr("mode") == "chart") {
                    that.currentsection = "chart";
                    that._loadChartWidget();
                } else if ($(this).attr("mode") == "summary") {
                    that.currentsection = "summary";
                    that._loadSummaryWidget();
                } else if ($(this).attr("mode") == "srplus") {
                    that.currentsection = "srplus";
                    that._loadSRPlusWidget();
                } else if ($(this).attr("mode") == "financial") {
                    that.currentsection = "financial";
                    that._loadFinancialWidget();
                }
            });

            this.$pageobj.find(".buybutton2").on("click", function () {
                if (that.currentSymbol != null && that.currentExchange != null) {
                    LabCI.WP.AppUtils.buysellIntegration(that.currentSymbol, that.currentExchange, that.currentPrice, 'B');
                }
            });
            /*
             this.$pageobj.find(".buybutton").on("click", function () {
             if (that.currentSymbol != null && that.currentExchange != null) {
             LabCI.WP.AppUtils.buysellIntegration(that.currentSymbol, that.currentExchange, that.currentPrice, 'B');
             }
             });
             
             this.$pageobj.find(".sellbutton").on("click", function () {
             if (that.currentSymbol != null && that.currentExchange != null) {
             LabCI.WP.AppUtils.buysellIntegration(that.currentSymbol, that.currentExchange, that.currentPrice, 'S');
             }
             });
             */
            this.$pageobj.find(".watchlistbutton").on("click", function () {
                if (that.currentSymbol != null && that.currentExchange != null) {
                    LabCI.WP.AppUtils.addFavourIntegration(that.currentSymbol, that.currentExchange);
                }
            });


            /*        this.$pageobj.find(".sectionselect").on("change", function () {
             
             if ($(this).val() == "chart") {
             that.currentsection = "chart";
             that._loadChartWidget();
             } else if ($(this).val() == "summary") {
             that.currentsection = "summary";
             that._loadSummaryWidget();
             }
             });
             */

            /*    this.$pageobj.find(".dropdown-item").on("click", function () {
             
             that.$pageobj.find(".currentvalue").html($(this).html());
             if ($(this).val() == "chart") {
             that.currentsection = "chart";
             that._loadChartWidget();
             } else if ($(this).val() == "summary") {
             that.currentsection = "summary";
             that._loadSummaryWidget();
             } else if ($(this).val() == "srplus") {
             that.currentsection = "srplus";
             that._loadSRPlusWidget();
             }
             });
             */

            // c5
            /*
             this.chart.$this = this.$quotedetail.find(".chartbox");
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

            this.resize();

            return this;
        },

        changeRicBySymbol: function (symbol, exch) {
            var that = this;

            this.$pageobj.loaddata("searchdata", "/data/ps",
                    {
                        k: symbol,
                        e: exch,
                        l: 1,
                        exact: 1,
                        token: encodeURIComponent(LabCI.getToken()),
                        lang: this.lang
                    },
                    function (result) {
                        if (result && result.data && result.data.responseCode !== "F") {
                            if (result.data.results && result.data.results.length > 0) {
                                that.currentquoteric = result.data.results[0].ric;
                                that.changeRic(that.currentquoteric);
                                $(that.$pageobj).find(".tab2Refresh").attr("data-refresh-value", that.currentquoteric);
                                /*        that.changedric = true;
                                 
                                 if (that.currentsection == "summary") {
                                 that._loadSummaryWidget();
                                 } else if (that.currentsection == "chart") {
                                 that._loadChartWidget();
                                 } else if (that.currentsection == "srplus") {
                                 that._loadSRPlusWidget();
                                 }
                                 
                                 
                                 //make as data changed
                                 $("#lsinopac-quote-summary-chart").addClass("changed");
                                 that.$quoterelated.addClass("changed");
                                 $("#lsinopac-quote-chart").addClass("changed");
                                 $("#lsinopac-quote-srplus").addClass("changed");
                                 */

                            }


                        } else {

                            //make as data changed
                            //    $("#lsinopac-quote-summary-chart").addClass("changed");
                            //    that.$quoterelated.addClass("changed");
                            //    $("#lsinopac-quote-chart").addClass("changed");
                            //    $("#lsinopac-quote-srplus").addClass("changed");

                            $('#invalidricModel').modal('show');


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

            //  this._loadQuoteData(ric);

            /*    if (this.currentsection == "summary") {
             this._loadSummaryWidget();
             } else if (this.currentsection == "chart") {
             this._loadChartWidget();
             } else if (this.currentsection == "srplus") {
             this._loadSRPlusWidget();
             }
             */
        },
        changeRic: function (ric) {
            var that = this;

            if (that.streamingTimer && that.streamingTimer !== null) {
                clearInterval(that.streamingTimer);
                that.streamingTimer = null;
            }
            this._loadQuoteData(ric);

            /*    if (this.currentsection == "summary") {
             this._loadSummaryWidget();
             } else if (this.currentsection == "chart") {
             this._loadChartWidget();
             } else if (this.currentsection == "srplus") {
             this._loadSRPlusWidget();
             }
             */
        },
        _resetQuoteDate: function () {
            var that = this;
            that.$stockinfopanel.find(".name").html("-");
            that.$stockinfopanel.find(".price").html("-");
            that.$stockinfopanel.find(".netchange").removeClass("upval").removeClass("downval").html("-");
            that.$stockinfopanel.find(".pctchange").removeClass("upval").removeClass("downval").html("-");
            that.$stockinfopanel.find(".note1").html("-");
            that.$stockinfopanel.find(".note2").html("-");

            that.$quotedetail.find(".opdata").removeClass("upval").removeClass("downval").html("-");
            that.$quotedetail.find(".hidata").removeClass("upval").removeClass("downval").html("-");
            that.$quotedetail.find(".lodata").removeClass("upval").removeClass("downval").html("-");
            that.$quotedetail.find(".vwapdata").removeClass("upval").removeClass("downval").html("-");
            that.$quotedetail.find(".wk52highdata").removeClass("upval").removeClass("downval").html("-");
            that.$quotedetail.find(".wk52lowdata").removeClass("upval").removeClass("downval").html("-");
            that.$quotedetail.find(".biddata").removeClass("upval").removeClass("downval").html("-");
            that.$quotedetail.find(".askdata").removeClass("upval").removeClass("downval").html("-");
            that.$quotedetail.find(".hcdata").removeClass("upval").removeClass("downval").html("-");
            that.$quotedetail.find(".epsdata").html("-");
            that.$quotedetail.find(".perdata").html("-");
            that.$quotedetail.find(".pbrdata").html("-");
            that.$quotedetail.find(".dividenddata").html("-");
            that.$quotedetail.find(".yielddata").html("-");
            that.$quotedetail.find(".dividendexdatedata").html("-");
            that.$quotedetail.find(".dividendpaydatedata").html("-");
            that.$quotedetail.find(".marketcapdata").html("-");
            that.$quotedetail.find(".volumedata").html("-");
            that.$quotedetail.find(".turnoverdata").html("-");
            that.$quotedetail.find(".lotsizedata").html("-");
        },
        _fillIndividualQuoteDate: function (obj, data, isStreaming) {
            if (obj) {
                if (obj.html() !== data) {
                    if (isStreaming) {
                        obj.stop().animate({backgroundColor: '#fadadd'}, 1000).animate({backgroundColor: 'none'}, 1000);
                    }
                    obj.html(data);
                }
            }
        },
        _fillQuoteDate: function (result, isStreaming) {
            var that = this;
            var updownclass = getUpDownClass(result.data.datalist[0].nc);
            that.$stockinfopanel.find(".name").html(result.data.datalist[0].nm + " (" + result.data.datalist[0].symbol + ")");
            that._fillIndividualQuoteDate(that.$stockinfopanel.find(".price"), result.data.datalist[0].ls, isStreaming);
            //    that.$stockinfopanel.find(".price").html(result.data.datalist[0].ls);

            var netChange = setValue(result.data.datalist[0].nc, null, false, "-", result.data.datalist[0].ls);
            that.$stockinfopanel.find(".netchange").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$stockinfopanel.find(".netchange"), netChange, isStreaming);
            //    that.$stockinfopanel.find(".netchange").removeClass("upval").removeClass("downval").addClass(updownclass).setValue(result.data.datalist[0].nc, null, false, "-", result.data.datalist[0].ls);

            var pctChange = setValue(result.data.datalist[0].pc, "%", false, "-", result.data.datalist[0].ls);
            that.$stockinfopanel.find(".pctchange").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$stockinfopanel.find(".pctchange"), pctChange, isStreaming);


            //    that.$stockinfopanel.find(".pctchange").removeClass("upval").removeClass("downval").addClass(updownclass).setValue(result.data.datalist[0].pc, "%", false, "-", result.data.datalist[0].ls);
            var quoteNote1 = that.pageobj_rb.lbl[result.data.datalist[0].exchsect] + " " + that.pageobj_rb.lbl[result.data.datalist[0].dc] + "." + that.pageobj_rb.lbl["ccy"] + that.pageobj_rb.lbl["ccy_" + result.data.datalist[0].ccy] + "  ";
            var quoteNote2 = formatShortTime(result.data.datalist[0].tm) + " " + formatShortDate(result.data.datalist[0].td);

            that.$stockinfopanel.find(".note1").html(quoteNote1);
            that._fillIndividualQuoteDate(that.$stockinfopanel.find(".note2"), quoteNote2, isStreaming);

            that.currentSymbol = result.data.datalist[0].symbol;
            that.currentExchange = result.data.datalist[0].exchsect;
            that.currentPrice = result.data.datalist[0].ls;

            //    if (that.$quotedetail.is(":visible")) {
            var ricData = result.data.datalist[0];
            var updownclass = "";

            updownclass = that._getRefUpDownClass(ricData.op, ricData.refprice);
            //    that.$quotedetail.find(".opdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.op);
            that.$quotedetail.find(".opdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".opdata"), ricData.op, isStreaming);

            updownclass = that._getRefUpDownClass(ricData.hi, ricData.refprice);
            //    that.$quotedetail.find(".hidata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.hi);
            that.$quotedetail.find(".hidata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".hidata"), ricData.hi, isStreaming);

            updownclass = that._getRefUpDownClass(ricData.lo, ricData.refprice);
            //    that.$quotedetail.find(".lodata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.lo);
            that.$quotedetail.find(".lodata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".lodata"), ricData.lo, isStreaming);

            updownclass = that._getRefUpDownClass(ricData.vwap, ricData.refprice);
            //    that.$quotedetail.find(".vwapdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.vwap);
            that.$quotedetail.find(".vwapdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".vwapdata"), ricData.vwap, isStreaming);

            updownclass = that._getRefUpDownClass(ricData.yh, ricData.refprice);
            //    that.$quotedetail.find(".wk52highdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.yh);
            that.$quotedetail.find(".wk52highdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".wk52highdata"), ricData.yh, isStreaming);

            updownclass = that._getRefUpDownClass(ricData.yl, ricData.refprice);
            //    that.$quotedetail.find(".wk52lowdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.yl);
            that.$quotedetail.find(".wk52lowdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".wk52lowdata"), ricData.yl, isStreaming);

            if (ricData.bd && ricData.bd != "-") {
                updownclass = that._getRefUpDownClass(ricData.bd, ricData.refprice);
                //   that.$quotedetail.find(".biddata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.bd + " x " + ricData.bdsize);
                that.$quotedetail.find(".biddata").removeClass("upval").removeClass("downval").addClass(updownclass);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".biddata"), ricData.bd + " x " + ricData.bdsize, isStreaming);
            } else {
                //    that.$quotedetail.find(".biddata").removeClass("upval").removeClass("downval").addClass(updownclass).html("-");
                that.$quotedetail.find(".biddata").removeClass("upval").removeClass("downval").addClass(updownclass);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".biddata"), "-", isStreaming);
            }

            if (ricData.as && ricData.as != "-") {
                updownclass = that._getRefUpDownClass(ricData.as, ricData.refprice);
                //    that.$quotedetail.find(".askdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.as + " x " + ricData.assize);
                that.$quotedetail.find(".askdata").removeClass("upval").removeClass("downval").addClass(updownclass);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".askdata"), ricData.as + " x " + ricData.assize, isStreaming);
            } else {
                //    that.$quotedetail.find(".askdata").removeClass("upval").removeClass("downval").addClass(updownclass).html("-");
                that.$quotedetail.find(".askdata").removeClass("upval").removeClass("downval").addClass(updownclass);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".askdata"), "-", isStreaming);
            }

            updownclass = that._getRefUpDownClass(ricData.hc, ricData.refprice);
            //    that.$quotedetail.find(".hcdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.hc);
            that.$quotedetail.find(".hcdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".hcdata"), ricData.hc, isStreaming);

            if (ricData.eps != null) {
                //    that.$quotedetail.find(".epsdata").html(ricData.eps);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".epsdata"), ricData.eps, isStreaming);
            }
            if (ricData.per != null) {
                //    that.$quotedetail.find(".perdata").html(ricData.per);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".perdata"), ricData.per, isStreaming);
            }

            if (ricData.cc == "USA") {
                that.$quotedetail.find(".vwaprow").hide();
                that.$quotedetail.find(".yrhighrow").hide();
                that.$quotedetail.find(".yrlowrow").hide();
                that.$quotedetail.find(".epsrow").hide();
                that.$quotedetail.find(".perrow").hide();
                that.$quotedetail.find(".pbrrow").hide();
                that.$quotedetail.find(".dividendrow").hide();
                that.$quotedetail.find(".yieldrow").hide();
                that.$quotedetail.find(".exdaterow").hide();
                that.$quotedetail.find(".paydaterow").hide();
                that.$quotedetail.find(".turnoverrow").hide();
            } else {
                that.$quotedetail.find(".vwaprow").show();
                that.$quotedetail.find(".yrhighrow").show();
                that.$quotedetail.find(".yrlowrow").show();
                that.$quotedetail.find(".epsrow").show();
                that.$quotedetail.find(".perrow").show();
                that.$quotedetail.find(".pbrrow").show();
                that.$quotedetail.find(".dividendrow").show();
                that.$quotedetail.find(".yieldrow").show();
                that.$quotedetail.find(".exdaterow").show();
                that.$quotedetail.find(".paydaterow").show();
                that.$quotedetail.find(".turnoverrow").show();
                //    that.$quotedetail.find(".pbrdata").html(ricData.pbr);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".pbrdata"), ricData.pbr, isStreaming);
            }

            if (ricData.div) {
                //   that.$quotedetail.find(".dividenddata").html(ricData.div + " " + ricData.currency);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividenddata"), ricData.div + " " + ricData.currency, isStreaming);
            } else {
                //     that.$quotedetail.find(".dividenddata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividenddata"), "-", isStreaming);
            }

            if (ricData.yield) {
                //    that.$quotedetail.find(".yielddata").html(ricData.yield + '%');
                that._fillIndividualQuoteDate(that.$quotedetail.find(".yielddata"), ricData.yield + '%', isStreaming);
            } else {
                //    that.$quotedetail.find(".yielddata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".yielddata"), "-", isStreaming);
            }

            if (ricData.exdate != null && ricData.exdate != undefined && ricData.exdate != "-") {
                //        that.$quotedetail.find(".dividendexdatedata").html(formatLongDate(ricData.exdate));
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividendexdatedata"), formatLongDate(ricData.exdate), isStreaming);
            } else {
                //        that.$quotedetail.find(".dividendexdatedata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividendexdatedata"), "-", isStreaming);
            }

            if (ricData.paydate != null && ricData.paydate != undefined && ricData.paydate != "-") {
                //        that.$quotedetail.find(".dividendpaydatedata").html(formatLongDate(ricData.paydate));
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividendpaydatedata"), formatLongDate(ricData.paydate), isStreaming);
            } else {
                //        that.$quotedetail.find(".dividendpaydatedata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividendpaydatedata"), "-", isStreaming);
            }


            if (ricData.cc == "USA") {
                that.$quotedetail.find(".marketcaprow").hide();
            } else {
                that.$quotedetail.find(".marketcaprow").show();
                if (ricData.mktvalue && ricData.mktvalue != "-") {
                    //        that.$quotedetail.find(".marketcapdata").html(ricData.mktvalue + " " + ricData.currency);
                    that._fillIndividualQuoteDate(that.$quotedetail.find(".marketcapdata"), ricData.mktvalue + " " + ricData.currency, isStreaming);
                } else {
                    //        that.$quotedetail.find(".marketcapdata").html("-");
                    that._fillIndividualQuoteDate(that.$quotedetail.find(".marketcapdata"), "-", isStreaming);
                }
            }
            /*         if (ricData.mktvalue && ricData.mktvalue != "-") {
             //        that.$quotedetail.find(".marketcapdata").html(ricData.mktvalue + " " + ricData.currency);
             that._fillIndividualQuoteDate(that.$quotedetail.find(".marketcapdata"), ricData.mktvalue + " " + ricData.currency, isStreaming);
             } else {
             //        that.$quotedetail.find(".marketcapdata").html("-");
             that._fillIndividualQuoteDate(that.$quotedetail.find(".marketcapdata"), "-", isStreaming);
             }
             */
            //    that.$quotedetail.find(".volumedata").html(ricData.vo);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".volumedata"), ricData.vo, isStreaming);
            if (ricData.am && ricData.am != "-") {
                //        that.$quotedetail.find(".turnoverdata").html(ricData.am + " " + ricData.currency);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".turnoverdata"), ricData.am + " " + ricData.currency, isStreaming);
            } else {
                //        that.$quotedetail.find(".turnoverdata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".turnoverdata"), "-", isStreaming);
            }
            if (ricData.cc == "USA") {
                that.$quotedetail.find(".lotsizerow").hide();
            } else {
                that.$quotedetail.find(".lotsizerow").show();
                that.$quotedetail.find(".lotsizedata").html(ricData.lot);
            }
        },
        _loadQuoteData: function (ric) {
            var that = this;


            this.$pageobj.loaddata("quotedata", "/data/getquote",
                    {
                        ric: ric,
                        token: encodeURIComponent(LabCI.getToken()),
                        lang: this.lang
                    },
                    function (result) {

                        if (result && result.data && result.data.responseCode !== "F" && result.data.datalist && result.data.datalist[0] && result.data.datalist[0].status == 0) {

                            //reset
                            that._resetQuoteDate();

                            that.$pageobj.find(".chartbox").hide();

                            that.$quoterelated.find(".relatedstock").remove();

                            that.currentquoteric = ric;
                            that.changedric = true;

                            if (result.data.datalist && result.data.datalist.length > 0) {

                                if (that.currentsection == "summary") {
                                    that._loadSummaryWidget();
                                } else if (that.currentsection == "chart") {
                                    that._loadChartWidget();
                                } else if (that.currentsection == "srplus") {
                                    that._loadSRPlusWidget();
                                } else if (that.currentsection == "financial") {
                                    that._loadFinancialWidget();
                                }

                                //make as data changed
                                $("#lsinopac-quote-summary-chart").addClass("changed");
                                that.$quoterelated.addClass("changed");
                                $("#lsinopac-quote-chart").addClass("changed");
                                $("#lsinopac-quote-srplus").addClass("changed");
                                $("#lsinopac-quote-financial").addClass("changed");

                                that._fillQuoteDate(result);

                                //    }

                                that.$pageobj.find(".chartbox").show();

                                that._loadRelatedStockData(1);
                                if (result.data.datalist[0].dc === 'realStream') {
                                    that.streamingTimer = setInterval(function () {
                                        that._loadStreamData(ric)
                                    }, 3000);
                                }

                            }
                        } else if (result.data.datalist && result.data.datalist[0] && result.data.datalist[0].status == 3) {

                            //make as data changed
                            //    $("#lsinopac-quote-summary-chart").addClass("changed");
                            //    that.$quoterelated.addClass("changed");
                            //    $("#lsinopac-quote-chart").addClass("changed");
                            //    $("#lsinopac-quote-srplus").addClass("changed");

                            $('#invalidricModel').modal('show');


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
        _loadStreamData: function (ric) {
            var that = this;

            this.$pageobj.loaddata("quotedata", "/data/getquote",
                    {
                        ric: ric,
                        token: encodeURIComponent(LabCI.getToken()),
                        lang: this.lang
                    },
                    function (result) {
                        if (result && result.data && result.data.responseCode !== "F" && result.data.datalist[0].status == 0) {
                            //            that._resetQuoteDate();
                            that._fillQuoteDate(result, true);

                            //add or update tick in 
                            if (window["lsinopac_quote-chart"]) {
                                window["lsinopac_quote-chart"].pollData();
                            }
                        }
                    },
                    0,
                    {
                        datatype: "jsonp"
                    });

        },
        _getRefUpDownClass: function (price, refPrice) {
            if (price && refPrice) {
                var priceval = Number(price.replace(",", ""));
                var refpriceval = Number(refPrice.replace(",", ""));

                // Check if 0
                if (priceval == 0 || refpriceval == 0) {
                    return "";
                }
                // If -nnn ?
                else if (priceval < refpriceval) {
                    return "downval";
                }
                // If +nnn ?
                else if (priceval > refpriceval) {
                    return "upval";
                }
            }
            // Any other case, return ""
            return "";
        },
        _loadRelatedStockData: function (pn) {
            var that = this;
            var ric = this.currentquoteric;
            if (this.$quoterelated.is(":visible")) {

                //        if (that.$quoterelated.hasClass("changed") || pn != 1) {
                this.$pageobj.loaddata("quoterelateddata", "/data/getrelatedstockquote",
                        {
                            ric: ric,
                            pn: pn,
                            token: encodeURIComponent(LabCI.getToken()),
                            lang: this.lang
                        },
                        function (result) {

                            //                        that.$quoterelated.attr("ric", ric);

                            that.$quoterelated.find(".relatedstock").remove();
                            that.$quoterelated.removeClass("changed")
                            if (result && result.data && result.data.responseCode !== "F") {
                                that.$pageobj.find(".result-count").show();
                                that.$pageobj.find(".result-no-count").hide();
                                that.$pageobj.find(".pagination").show();
                                that.$pageobj.find(".stockfrom").html("-");
                                that.$pageobj.find(".stockto").html("-");
                                that.$pageobj.find(".stocktotal").html("-");

                                if (result.data.datalist && result.data.datalist.length > 0) {
                                    that.$quoterelated.find(".stockfrom").html(result.data.from);
                                    that.$quoterelated.find(".stockto").html(result.data.to);
                                    that.$quoterelated.find(".stocktotal").html(result.data.totalrec);

                                    for (var key in result.data.datalist) {
                                        var updownclass = getUpDownClass(result.data.datalist[key].nc);

                                        var addedRow = $("<tr class='relatedstock' style='cursor:pointer'; ric='" + result.data.datalist[key].ric + "' symbol='" + result.data.datalist[key].symbol + "' exchange='" + LabCI.WP.AppUtils.INTEGRATION_EXCHANGE_MAPPING[result.data.datalist[key].exchange_code] + "'><td>" + result.data.datalist[key].symbol + "</td>" +
                                                "<td>" + result.data.datalist[key].name + "</td>" +
                                                "<td>" + result.data.datalist[key].trbc_name + "</td>" +
                                                "<td class='text-right'>" + result.data.datalist[key].ls + "</td>" +
                                                "<td class='" + updownclass + " text-right'>" + setValue(result.data.datalist[key].nc, null, false, "-", result.data.datalist[key].ls) + "</td>" +
                                                "<td class='" + updownclass + " text-right'>" + setValue(result.data.datalist[key].pc, "%", false, "-", result.data.datalist[key].ls) + "</td>" +
                                                "<td class='text-right'>" + result.data.datalist[key].vo + "</td>" +
                                                "</tr>");

                                        that.$quoterelated.find("table").append(addedRow);

                                        $(addedRow).on(_CLICK_EVENT, function () {
                                            var that2 = this;
                                            //    $("html, body").animate({scrollTop: 0}, 400, function () {
                                            //        that.changeRic($(that2).attr('ric'));
                                            //    });
                                            LabCI.WP.AppUtils.openQuotePage($(that2).attr('symbol'), $(that2).attr('exchange'));
                                        });
                                    }

                                    //for pagination...
                                    var pagination = that.$quoterelated.find(".desktop-pagination");
                                    var pageno = pn * 1; //cast to int...
                                    var maxPage = Math.ceil(result.data.totalrec / that.recperpage);
                                    var paginationFrom = pageno - 3;
                                    var paginationTo = pageno + 2;

                                    if (paginationFrom <= 0) {
                                        paginationTo = Math.abs(paginationFrom) + paginationTo;
                                        paginationFrom = 1;
                                    } else {
                                        paginationFrom += 1;
                                    }

                                    if (paginationTo > maxPage) {
                                        var diff = paginationTo - maxPage;
                                        paginationFrom -= diff;
                                        paginationTo -= diff;
                                    }
                                    if (paginationFrom < 1) {
                                        paginationFrom = 1;
                                    }

                                    pagination.find(".page-no").remove();
                                    pagination.find("li").removeClass("disabled").removeClass("active");

                                    pagination.find(".page-dropdown > option").remove();

                                    if (pageno == 1) {
                                        pagination.find("li[item='prev']").addClass("disabled");
                                    } else {
                                        pagination.find("li[item='prev'] span").attr("pn", pageno - 1);
                                    }

                                    for (var i = paginationFrom; i <= paginationTo; ++i) {
                                        if (i == pageno) {
                                            pagination.find("li[item='next']").before('<li class="page-item page-no active" item="' + pageno + '"><span class="page-link">' + pageno + '</span></li>');
                                        } else {
                                            pagination.find("li[item='next']").before('<li class="page-item page-no" item="' + i + '"><span class="page-link" pn="' + i + '" onclick="window[\'lsinopac_quote\']._loadRelatedStocksPage(this)">' + i + '</span></li>');
                                        }
                                    }

                                    if (pageno + 1 > maxPage) {
                                        pagination.find("li[item='next']").addClass("disabled");
                                    } else {
                                        pagination.find("li[item='next'] span").attr("pn", pageno + 1);
                                    }

                                    for (var i = 0; i < maxPage; ++i) {
                                        //drop down...
                                        if (pageno == i + 1) {
                                            pagination.find(".page-dropdown").append('<option selected value="' + (i + 1) + '">' + (i + 1) + '</option>');
                                        } else {
                                            pagination.find(".page-dropdown").append('<option value="' + (i + 1) + '">' + (i + 1) + '</option>');
                                        }
                                    }

                                } else {
                                    that.$pageobj.find(".result-count").hide();
                                    that.$pageobj.find(".result-no-count").show();
                                    that.$pageobj.find(".pagination").hide();
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
                //            }
            }

        },
        _hideAllSubWidget: function () {
            if (LabCI.WP["createquotesummarypageobj"]) {
                window["lsinopac-quote-summary-chart"].hide();
                this.$quoterelated.parent().hide();
            }
            if (LabCI.WP["createquotechartpageobj"]) {
                window["lsinopac_quote-chart"].hide();
            }
            if (LabCI.WP["createquotesrpluspageobj"]) {
                window["lsinopac_quote-srplus"].hide();
            }
            if (LabCI.WP["createquotefinancialpageobj"]) {
                window["lsinopac_quote-financial"].hide();
            }
        },
        _loadChartWidget: function () {
            this._hideAllSubWidget();
            var ric = this.currentquoteric;
            var lang = this.lang;
            this.$quotedetail.show();

            if (LabCI.WP["createquotechartpageobj"]) {
                window["lsinopac_quote-chart"].show({ric: ric});
            } else {
                $("#lsinopac-quote-chart").loadwidget("quote-chart.html?_=" + (new Date()).getTime(), function () {
                    window["lsinopac_quote-chart"] = LabCI.WP["createquotechartpageobj"].call(that).init(lang).show({ric: ric});
                });
            }
        },
        _preloadChartWidget: function () {
            //    this._hideAllSubWidget();
            var ric = this.currentquoteric;
            var lang = this.lang;
            //    this.$quotedetail.show();

            if (LabCI.WP["createquotechartpageobj"]) {
                //   window["lsinopac_quote-chart"].show({ric: ric});
            } else {
                $("#lsinopac-quote-chart").loadwidget("quote-chart.html?_=" + (new Date()).getTime(), function () {
                    window["lsinopac_quote-chart"] = LabCI.WP["createquotechartpageobj"].call(that).init(lang).show({ric: ric, preload: "1"});
                });
            }
        },
        _loadSummaryWidget: function () {
            var that = this;
            this._hideAllSubWidget();
            var ric = this.currentquoteric;
            var lang = this.lang;
            this.$quoterelated.parent().show();
            this.$quotedetail.show();

            if (LabCI.WP["createquotesummarypageobj"]) {
                window["lsinopac-quote-summary-chart"].show({ric: ric});
                if (that.$quoterelated.hasClass("changed")) {
                    that._loadRelatedStockData(1);
                }
            } else {
                $("#lsinopac-quote-summary-chart").loadwidget("quote-summary.html?_=" + (new Date()).getTime(), function () {
                    window["lsinopac-quote-summary-chart"] = LabCI.WP["createquotesummarypageobj"].call(that).init(lang).show({ric: ric});
                    //            that._loadRelatedStockData(1);

                    if (LabCI.WP.AppUtils.getMobileOrDesktop() == "DESKTOP") {
                        //    that.$pageobj.find(".preloadchartframe").attr("src", APP_CONFIG.DataAPIPath + "/c5/ui/c5?ric=" + this.currentquoteric + "&token=" + encodeURIComponent(LabCI.getToken()) + "&lang=" + this.lang);
                        //APP_CONFIG.DataAPIPath + "/c5/ui/c5?ric=" + ric + "&token=" + encodeURIComponent(LabCI.getToken()) + "&lang=" + this.lang               
                        //    that._loadChartWidget();
                        that._preloadChartWidget();
                    }

                });
            }
        },
        _loadFinancialWidget: function () {
            var that = this;
            this._hideAllSubWidget();
            var ric = this.currentquoteric;
            var lang = this.lang;
            this.$quotedetail.hide();

            try {
                if (LabCI.WP["createquotefinancialpageobj"]) {
                    window["lsinopac_quote-financial"].show({ric: ric});
                } else {
                    $("#lsinopac-quote-financial").loadwidget("quote-financial.html?_=" + (new Date()).getTime(), function () {
                        window["lsinopac_quote-financial"] = LabCI.WP["createquotefinancialpageobj"].call(that).init(lang).show({ric: ric});
                    });
                }
            } catch (err) {
                window["lsinopac_quote-financial"].show({ric: ric});
            }

        },
        _loadSRPlusWidget: function () {
            var that = this;
            this._hideAllSubWidget();
            var ric = this.currentquoteric;
            var lang = this.lang;

            this.$quotedetail.hide();

            try {
                if (LabCI.WP["createquotesrpluspageobj"]) {
                    window["lsinopac_quote-srplus"].show({ric: ric});
                } else {
                    $("#lsinopac-quote-srplus").loadwidget("quote-srplus.html?_=" + (new Date()).getTime(), function () {
                        window["lsinopac_quote-srplus"] = LabCI.WP["createquotesrpluspageobj"].call(that).init(lang).show({ric: ric});
                    });
                }
            } catch (err) {
                window["lsinopac_quote-srplus"].show({ric: ric});
            }

        },
        _loadRelatedStocksPage: function (obj) {

            this.pageno = $(obj).attr("pn");
            this._loadRelatedStockData(this.pageno);
        },
        _loadRelatedStocksPageFromSelect: function (obj) {

            this.pageno = $(obj).val();
            this._loadRelatedStockData(this.pageno);
        },
        resizeImpl: function () {
            var that = this;
            var param = "code:" + this.currentquoteric;
            /*        if(that.breakpoint == null){
             //init
             that.breakpoint = LabCI.WP.AppUtils.getMobileOrDesktop();
             }else if(that.breakpoint != LabCI.WP.AppUtils.getMobileOrDesktop()){
             alert('in');
             that.breakpoint = LabCI.WP.AppUtils.getMobileOrDesktop();
             that.showImpl();
             }         
             //    alert(LabCI.WP.AppUtils.getMobileOrDesktop());
             */
            /*        var currentMode;
             
             if ($(window).width() < 750) {
             this.$pageobj.find(".desktoptemplate").hide();
             this.$pageobj.find(".mobiletemplate").show();
             currentMode = "mobile";
             } else {
             this.$pageobj.find(".mobiletemplate").hide();
             this.$pageobj.find(".desktoptemplate").show();
             currentMode = "desktop";
             }
             
             //    if (currentMode == "desktop" && this.mode != "desktop" ||
             //            currentMode == "mobile" && this.mode != "mobile") {
             if (currentMode == "desktop") {
             this.mode = "desktop";
             //            this.$pageobj.find("#lsinopac-ps").removeClass("mobile");
             //            this.$pageobj.find("#psbox").removeClass("mobile");
             //            this.$pageobj.find("#lsinopac-ps > input").removeClass("mobile");
             } else {
             this.mode = "mobile";
             //            alert("m");
             //            this.$pageobj.find("#lsinopac-ps").addClass("mobile");
             //            this.$pageobj.find("#psbox").addClass("mobile");
             //            this.$pageobj.find("#lsinopac-ps > input").addClass("mobile");
             }
             */

            //        this.show();
            //        }

            //  if(window["lsinopac_quote-chart"]){
            //      window["lsinopac_quote-chart"].resizeImpl();
            //  }



            // c5
            //    this.$pageobj.css("min-height", ($(window).innerHeight()) + "px");
            // Force resizing C5 in order to show the chart correctly ;)
            //    this.resizeMainChart.call(this);

        },
        ////////////////////////////////////////////////////////////////////
        /*
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
         */
        showImpl: function (statedata) {

            var that = this;
            var isStart = true;

            if (statedata) {
                if (statedata.ric) {
                    this.currentquoteric = statedata.ric;
                    this.changeRic(this.currentquoteric);
                } else if (statedata.symbol && statedata.exch) {
                    this.changeRicBySymbol(statedata.symbol, statedata.exch);
                } else {
                    //default...
                    this.currentquoteric = _DEFAULT_INDEXRIC;
                    this.changeRic(this.currentquoteric);
                }
            }

            if (this.currentsection == "summary") {
                //default...
                //    this._loadSummaryWidget();
            } else if (this.currentsection == "chart") {
                this._loadChartWidget();
            }


            //        that._loaddata();
            //    if (that.mode == "desktop") {
            //        that.$quotedetail.appendTo(that.$mapQuoteBox);
            //        that.$quotedetail.show();
            //        that._loaddataquote();
            //    } else if (that.mode == "mobile") {
            //         this.$pageobj.find(".mobiletemplate").show();
            //    }
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
        /*
         _loaddata: function () {
         // Get ready
         var that = this;
         
         // Load assetinfo and start streaming...
         var riclist = this.QUOTELISTRICLIST[0];
         
         
         this.$pageobj.loaddata("worldnav", "/data/worldnav",
         {
         symbol: riclist,
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
         that.$quotedetail.find(".turnover").html(ricdata.am + that._vounit2name(ricdata.amunit));
         that.$quotedetail.find(".r1M").removeClass("upval").removeClass("downval").addClass(getUpDownClass(ricdata.p1m)).setValue(ricdata.p1m, "%", true);
         that.$quotedetail.find(".r3M").removeClass("upval").removeClass("downval").addClass(getUpDownClass(ricdata.p3m)).setValue(ricdata.p3m, "%", true);
         that.$quotedetail.find(".r6M").removeClass("upval").removeClass("downval").addClass(getUpDownClass(ricdata.p6m)).setValue(ricdata.p6m, "%", true);
         that.$quotedetail.find(".r1Y").removeClass("upval").removeClass("downval").addClass(getUpDownClass(ricdata.p1y)).setValue(ricdata.p1y, "%", true);
         
         }
         
         //    that.$mapQuoteBox.find(".chart").load( "http://localhost:45516/sinopacwidget/lsinopac/ui/c5.html?token=b1nE86wAvsHOxV0b2cM2%2FlqSt1WPKdvbVc4R55zD8mA%3D");
         //    http://localhost:45516/sinopacwidget/lsinopac/ui/c5.html?token=b1nE86wAvsHOxV0b2cM2%2FlqSt1WPKdvbVc4R55zD8mA%3D
         
         //    if (ric == that.currentquoteric) {
         //        $databox.addClass("selected");
         //    }
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
         that._chart_loaddata(ric);
         
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
         i: "d",
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

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {
            }
        }

    };

})(jQuery);