
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
        streaming: {
            lastValue: {},
            lastValueParsed: {isClosungRun: false}
        },
        sessionInfo: null,
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
                    // Piwik code
                    try {
                        window.top._paq.push(['trackEvent', 'widget', 'sub_figure']);
                    } catch (err) {
                    }

                    that.currentsection = "chart";
                    that._loadChartWidget();
                } else if ($(this).attr("mode") == "summary") {
                    that.currentsection = "summary";
                    that._loadSummaryWidget();
                } else if ($(this).attr("mode") == "srplus") {
                    // Piwik code
                    try {
                        window.top._paq.push(['trackEvent', 'widget', 'sub_report']);
                    } catch (err) {
                    }

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
                // Piwik code
                try {
                    window.top._paq.push(['trackEvent', 'order', 'sub_order']);
                } catch (err) {
                }

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
                // Piwik code
                try {
                    window.top._paq.push(['trackEvent', 'widget', 'sub_addself']);
                } catch (err) {
                }
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
            //close existing streaming connection
            if (LabCI.WDSSTREAMING.sock) {
                LabCI.WDSSTREAMING.cancel();
                LabCI.WDSSTREAMING.close();
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
            that.$stockinfopanel.removeAttr("streamric");
            that.$stockinfopanel.removeAttr("dp");
            that.$stockinfopanel.find(".name").html("-");
            that.$stockinfopanel.find(".price").html("-");
            that.$stockinfopanel.find(".netchange").removeClass("upval").removeClass("downval").html("-");
            that.$stockinfopanel.find(".pctchange").removeClass("upval").removeClass("downval").html("-");
            that.$stockinfopanel.find(".note1").html("-");
            that.$stockinfopanel.find(".note2").html("-");

            that.$stockinfopanel.removeAttr("streamric");
            that.$stockinfopanel.removeAttr("dp");
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
        _fillIndividualQuoteDate: function (obj, data) {
            if (obj) {
                if (obj.html() !== data) {
                    obj.html(data);
                }
            }
        },
        _fillQuoteDate: function (result) {
            var that = this;
            that.$stockinfopanel.attr("streamric", that.currentquoteric);
            that.$quotedetail.attr("streamric", that.currentquoteric);

            var dp = result.data.datalist[0].dp;
            if (result.data.datalist[0].asset_type && result.data.datalist[0].asset_type == "EQTYIDX") {
                dp = 2;
            }

            if (result.data.datalist[0].cc && result.data.datalist[0].cc == "USA") {
                dp = 2;
            }
            that.$quotedetail.attr("dp", dp);
            that.$stockinfopanel.attr("dp", dp);

            var updownclass = getUpDownClass(result.data.datalist[0].nc);
            that.$stockinfopanel.find(".name").html(result.data.datalist[0].nm + " (" + result.data.datalist[0].symbol + ")");
            that._fillIndividualQuoteDate(that.$stockinfopanel.find(".price"), result.data.datalist[0].ls);
            //    that.$stockinfopanel.find(".price").html(result.data.datalist[0].ls);

            var netChange = setValue(result.data.datalist[0].nc, null, false, "-", result.data.datalist[0].ls);
            that.$stockinfopanel.find(".netchange").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$stockinfopanel.find(".netchange"), netChange);
            //    that.$stockinfopanel.find(".netchange").removeClass("upval").removeClass("downval").addClass(updownclass).setValue(result.data.datalist[0].nc, null, false, "-", result.data.datalist[0].ls);

            var pctChange = setValue(result.data.datalist[0].pc, "%", false, "-", result.data.datalist[0].ls);
            that.$stockinfopanel.find(".pctchange").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$stockinfopanel.find(".pctchange"), pctChange);


            //    that.$stockinfopanel.find(".pctchange").removeClass("upval").removeClass("downval").addClass(updownclass).setValue(result.data.datalist[0].pc, "%", false, "-", result.data.datalist[0].ls);
            var quoteNote1 = that.pageobj_rb.lbl[result.data.datalist[0].exchsect] + " " + that.pageobj_rb.lbl[result.data.datalist[0].dc] + "." + that.pageobj_rb.lbl["ccy"] + that.pageobj_rb.lbl["ccy_" + result.data.datalist[0].ccy] + "  ";
            var quoteNote2 = formatShortTime(result.data.datalist[0].tm) + " " + formatShortDate(result.data.datalist[0].td);

            that.$stockinfopanel.find(".note1").html(quoteNote1);
            that._fillIndividualQuoteDate(that.$stockinfopanel.find(".note2"), quoteNote2);

            that.currentSymbol = result.data.datalist[0].symbol;
            that.currentExchange = result.data.datalist[0].exchsect;
            that.currentPrice = result.data.datalist[0].ls;

            //    if (that.$quotedetail.is(":visible")) {
            var ricData = result.data.datalist[0];
            var updownclass = "";

            updownclass = that._getRefUpDownClass(ricData.op, ricData.refprice);
            //    that.$quotedetail.find(".opdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.op);
            that.$quotedetail.find(".opdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".opdata"), ricData.op);

            updownclass = that._getRefUpDownClass(ricData.hi, ricData.refprice);
            //    that.$quotedetail.find(".hidata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.hi);
            that.$quotedetail.find(".hidata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".hidata"), ricData.hi);

            updownclass = that._getRefUpDownClass(ricData.lo, ricData.refprice);
            //    that.$quotedetail.find(".lodata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.lo);
            that.$quotedetail.find(".lodata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".lodata"), ricData.lo);

            updownclass = that._getRefUpDownClass(ricData.vwap, ricData.refprice);
            //    that.$quotedetail.find(".vwapdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.vwap);
            that.$quotedetail.find(".vwapdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".vwapdata"), ricData.vwap);

            updownclass = that._getRefUpDownClass(ricData.yh, ricData.refprice);
            //    that.$quotedetail.find(".wk52highdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.yh);
            that.$quotedetail.find(".wk52highdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".wk52highdata"), ricData.yh);

            updownclass = that._getRefUpDownClass(ricData.yl, ricData.refprice);
            //    that.$quotedetail.find(".wk52lowdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.yl);
            that.$quotedetail.find(".wk52lowdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".wk52lowdata"), ricData.yl);

            if (ricData.bd && ricData.bd != "-") {
                updownclass = that._getRefUpDownClass(ricData.bd, ricData.refprice);
                //   that.$quotedetail.find(".biddata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.bd + " x " + ricData.bdsize);
                that.$quotedetail.find(".biddata").removeClass("upval").removeClass("downval").addClass(updownclass);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".biddata"), ricData.bd + " x " + ricData.bdsize);
            } else {
                //    that.$quotedetail.find(".biddata").removeClass("upval").removeClass("downval").addClass(updownclass).html("-");
                that.$quotedetail.find(".biddata").removeClass("upval").removeClass("downval").addClass(updownclass);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".biddata"), "-");
            }

            if (ricData.as && ricData.as != "-") {
                updownclass = that._getRefUpDownClass(ricData.as, ricData.refprice);
                //    that.$quotedetail.find(".askdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.as + " x " + ricData.assize);
                that.$quotedetail.find(".askdata").removeClass("upval").removeClass("downval").addClass(updownclass);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".askdata"), ricData.as + " x " + ricData.assize);
            } else {
                //    that.$quotedetail.find(".askdata").removeClass("upval").removeClass("downval").addClass(updownclass).html("-");
                that.$quotedetail.find(".askdata").removeClass("upval").removeClass("downval").addClass(updownclass);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".askdata"), "-");
            }

            updownclass = that._getRefUpDownClass(ricData.hc, ricData.refprice);
            //    that.$quotedetail.find(".hcdata").removeClass("upval").removeClass("downval").addClass(updownclass).html(ricData.hc);
            that.$quotedetail.find(".hcdata").removeClass("upval").removeClass("downval").addClass(updownclass);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".hcdata"), ricData.hc);

            if (ricData.eps != null) {
                //    that.$quotedetail.find(".epsdata").html(ricData.eps);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".epsdata"), ricData.eps);
            }
            if (ricData.per != null) {
                //    that.$quotedetail.find(".perdata").html(ricData.per);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".perdata"), ricData.per);
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
                that._fillIndividualQuoteDate(that.$quotedetail.find(".pbrdata"), ricData.pbr);
            }

            if (ricData.div) {
                //   that.$quotedetail.find(".dividenddata").html(ricData.div + " " + ricData.currency);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividenddata"), ricData.div + " " + ricData.currency);
            } else {
                //     that.$quotedetail.find(".dividenddata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividenddata"), "-");
            }

            if (ricData.yield) {
                //    that.$quotedetail.find(".yielddata").html(ricData.yield + '%');
                that._fillIndividualQuoteDate(that.$quotedetail.find(".yielddata"), ricData.yield + '%');
            } else {
                //    that.$quotedetail.find(".yielddata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".yielddata"), "-");
            }

            if (ricData.exdate != null && ricData.exdate != undefined && ricData.exdate != "-") {
                //        that.$quotedetail.find(".dividendexdatedata").html(formatLongDate(ricData.exdate));
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividendexdatedata"), formatLongDate(ricData.exdate));
            } else {
                //        that.$quotedetail.find(".dividendexdatedata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividendexdatedata"), "-");
            }

            if (ricData.paydate != null && ricData.paydate != undefined && ricData.paydate != "-") {
                //        that.$quotedetail.find(".dividendpaydatedata").html(formatLongDate(ricData.paydate));
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividendpaydatedata"), formatLongDate(ricData.paydate));
            } else {
                //        that.$quotedetail.find(".dividendpaydatedata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".dividendpaydatedata"), "-");
            }


            if (ricData.cc == "USA") {
                that.$quotedetail.find(".marketcaprow").hide();
            } else {
                that.$quotedetail.find(".marketcaprow").show();
                if (ricData.mktvalue && ricData.mktvalue != "-") {
                    //        that.$quotedetail.find(".marketcapdata").html(ricData.mktvalue + " " + ricData.currency);
                    that._fillIndividualQuoteDate(that.$quotedetail.find(".marketcapdata"), ricData.mktvalue + " " + ricData.currency);
                } else {
                    //        that.$quotedetail.find(".marketcapdata").html("-");
                    that._fillIndividualQuoteDate(that.$quotedetail.find(".marketcapdata"), "-");
                }
            }
            /*         if (ricData.mktvalue && ricData.mktvalue != "-") {
             //        that.$quotedetail.find(".marketcapdata").html(ricData.mktvalue + " " + ricData.currency);
             that._fillIndividualQuoteDate(that.$quotedetail.find(".marketcapdata"), ricData.mktvalue + " " + ricData.currency);
             } else {
             //        that.$quotedetail.find(".marketcapdata").html("-");
             that._fillIndividualQuoteDate(that.$quotedetail.find(".marketcapdata"), "-");
             }
             */
            //    that.$quotedetail.find(".volumedata").html(ricData.vo);
            that._fillIndividualQuoteDate(that.$quotedetail.find(".volumedata"), ricData.vo);
            if (ricData.am && ricData.am != "-") {
                //        that.$quotedetail.find(".turnoverdata").html(ricData.am + " " + ricData.currency);
                that._fillIndividualQuoteDate(that.$quotedetail.find(".turnoverdata"), ricData.am + " " + ricData.currency);
            } else {
                //        that.$quotedetail.find(".turnoverdata").html("-");
                that._fillIndividualQuoteDate(that.$quotedetail.find(".turnoverdata"), "-");
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
                                    var RETRY_LIMIT = 3;
                                    var tryCount = 0;
                                    LabCI.WDSSTREAMING.init(APP_CONFIG.WDS_PROVISION_URL, APP_CONFIG.WDS_USER,
                                            '-1,6,3372,79,1465,21,11,56,19,12,13,32,100,16,18,3854,3404,3265,3266,34,36,354,4043,380,90,91,22,30,25,31,71,35,2150,32742,71,35,39,38,15,2744',
                                            APP_CONFIG.WDS_MAX_IDLE_TIME,
                                            function (ric, fields) {
                                                that.onReceiveStream(ric, fields);
                                            },
                                            function (err) {
                                                console.log(err);
                                                if (tryCount < RETRY_LIMIT) {
                                                    that.connectStreaming([ric]);
                                                    ++tryCount;
                                                    console.log('Retry count: ' + tryCount);
                                                }
                                            }
                                    );

                                    that.connectStreaming([ric]);
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
        msToTime: function (s) {
            // Pad to 2 or 3 digits, default is 2
            function pad(n, z) {
                z = z || 2;
                return ('00' + n).slice(-z);
            }

            var ms = s % 1000;
            s = (s - ms) / 1000;
            var secs = s % 60;
            s = (s - secs) / 60;
            var mins = s % 60;
            var hrs = (s - mins) / 60;

            return pad(hrs) + pad(mins);
        },
        getTimeZone: function (exchangeCode) {
            if (exchangeCode === 'SHZ' || exchangeCode === 'SHH') {
                return 'Asia/Shanghai';
            } else if (exchangeCode === 'HKG') {
                return 'Asia/Hong_Kong';
            } else if (exchangeCode === 'NBA' || exchangeCode === 'NBN' || exchangeCode === 'NXB') {
                return 'America/New_York';
            }
            return 'Asia/Taipei';
        },
        connectStreaming: function (ricArray) {
            this.$pageobj.loaddata("wdstoken", "/data/getwdstoken",
                    {
                        token: encodeURIComponent(LabCI.getToken())
                    },
                    function (result) {
                        if (result && result.data && result.data.t) {
                            var wdsToken = result.data.t;
                            //    wdsToken = 'ZukkYNWg0UiC70BGZi22O8duIw5oiaF73abEx81twTDxDRDm9Oz7HqcCKbv5s4d7';
                            LabCI.WDSSTREAMING.setToken(wdsToken);
                            LabCI.WDSSTREAMING.getProvision(ricArray,
                                    function (result) {
                                        if (result && result.ticketList && result.ticketList.length > 0) {
                                            LabCI.WDSSTREAMING.connect(result.ticketList[0]);
                                            //currently support singel connect only
                                            //    for (var i = 0; i < result.ticketList.length; ++i) {
                                            //        LabCI.WDSSTREAMING.connect(result.ticketList[i]);
                                            //    }
                                        }
                                    });
                        }
                    },
                    0,
                    {
                        datatype: "jsonp"
                    });
        },
        onReceiveStream: function (ric, fields) {
            var that = this;
            if (this.currentquoteric && this.currentquoteric !== null && this.currentquoteric === ric) {
                this.streaming.lastValue = $.extend(this.streaming.lastValue, fields);
                //    console.log(fields);
                var is_OFF_CLOSE = false;
                var hcval = null;
                //for Trade Price
                if (fields['6'] !== undefined && fields['6'] !== '') {
                    this.streaming.lastValueParsed.last = Number(fields['6']);
                }
                //for Official Close Handling
                if (this.currentExchange === 'SHH' ||
                        this.currentExchange === 'TAI' || this.currentExchange === 'TWO' || this.currentExchange === '.TWII' ||
                        this.currentExchange === 'NBA' || this.currentExchange === 'NBN' || this.currentExchange === 'NXB') {
                    if (fields['3372'] !== undefined && fields['3372'] !== '' && fields['3372'] !== '0') {
                        this.streaming.lastValueParsed.last = Number(fields['3372']);
                        is_OFF_CLOSE = true;
                    }
                }

                if (this.streaming.lastValue['6']) {
                    this.streaming.lastValueParsed.isClosungRun = false;
                } else {
                    this.streaming.lastValueParsed.isClosungRun = true;
                }

                //for Historical Closing Date
                if (fields['79'] !== undefined && fields['79'] !== '') {
                    this.streaming.lastValueParsed.historicalCloseDate = moment(fields['79'], 'DD MMM YYYY').toDate();
                }

                //for historical Close
                if (fields['21'] !== undefined && fields['21'] !== '') {
                    this.streaming.lastValueParsed.historicalClose = Number(fields['21']);
                }
                //for Adjusted Close Handling
                if (this.currentExchange === 'SHH' || this.currentExchange === 'SHZ' ||
                        this.currentExchange === 'TAI' || this.currentExchange === 'TWO' || this.currentExchange === '.TWII') {
                    if (fields['1465'] !== undefined && fields['1465'] !== '' && fields['1465'] !== '0') {
                        this.streaming.lastValueParsed.historicalClose = Number(fields['1465']);
                        if (is_OFF_CLOSE) {
                            hcval = this.streaming.lastValueParsed.historicalClose;
                        }
                    }
                }
                if (fields['1465'] !== undefined && fields['1465'] !== '' && fields['1465'] !== '0') {
                    this.streaming.lastValueParsed.adjustedClose = Number(fields['1465']);
                }

                if (this.streaming.lastValueParsed.isClosungRun) {
                    //closing run...no updates
                    //     console.log('Closing run...');
                    if (this.streaming.lastValueParsed.historicalClose) {
                        this.streaming.lastValueParsed.last = this.streaming.lastValueParsed.historicalClose;
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'last', this.streaming.lastValueParsed.last);
                    }
                    if (this.streaming.lastValueParsed.historicalCloseDate) {
                        this.streaming.lastValueParsed.dateTimeLocal = moment(this.streaming.lastValueParsed.historicalCloseDate);
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'datetime', moment(this.streaming.lastValueParsed.historicalCloseDate).format('- DD/MM'));
                        //LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'last', this.streaming.lastValueParsed.last);                        
                    }
                    //    delete this.streaming.lastValueParsed.last;
                    //    delete this.streaming.lastValueParsed.dateTimeLocal;
                    delete this.streaming.lastValueParsed.open;
                    delete this.streaming.lastValueParsed.high;
                    delete this.streaming.lastValueParsed.low;
                    delete this.streaming.lastValueParsed.acVol;
                    delete this.streaming.lastValueParsed.turnover;



                } else {
                    //last
                    if (fields['6'] || fields['3372']) {
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'last', this.streaming.lastValueParsed.last);
                    }

                    // Specific when official close is used, manually calculate netchange and %change
                    if (is_OFF_CLOSE && this.streaming.lastValueParsed.last && this.streaming.lastValueParsed.historicalClose) {
                        if (fields['3372'] && fields['1465']) {
                            var ncval = this.streaming.lastValueParsed.last - this.streaming.lastValueParsed.historicalClose;
                            var pctval = ncval / this.streaming.lastValueParsed.historicalClose * 100;
                            LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'netchange', ncval);
                            LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'pctchange', pctval);
                        }
                    } else {
                        //netchange
                        if (fields['11']) {
                            LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'netchange', fields['11']);
                        }
                        //pct change
                        if (fields['56']) {
                            LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'pctchange', fields['56']);
                        }
                    }

                    //hst close
                    if (fields['21'] || fields['1465']) {
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'hstclose', this.streaming.lastValueParsed.historicalClose);
                    }

                    //for Open Price
                    if (fields['19']) {
                        this.streaming.lastValueParsed.open = Number(this.streaming.lastValue['19']);
                        var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(fields['19'], this.streaming.lastValueParsed.adjustedClose);
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'open', fields['19'], upDownClass);

                        //  this.streaming.lastValueParsed.adjustedClose.... format color...
                    }

                    //for High Price
                    if (fields['12']) {
                        this.streaming.lastValueParsed.high = Number(this.streaming.lastValue['12']);
                        var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(fields['12'], this.streaming.lastValueParsed.adjustedClose);
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'high', fields['12'], upDownClass);
                    }

                    //for Low Price
                    if (fields['13']) {
                        this.streaming.lastValueParsed.low = Number(this.streaming.lastValue['13']);
                        var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(fields['13'], this.streaming.lastValueParsed.adjustedClose);
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'low', fields['13'], upDownClass);
                    }

                    //for Accumlated Volume
                    if (fields['32']) {
                        var vol = LabCI.WDSSTREAMING.scaleUpAmountByUnit(fields['32'], this.streaming.lastValue['4043']);
                        this.streaming.lastValueParsed.acVol = Number(vol);
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'volume', vol);
                    }

                    //for turnover
                    if (fields['100']) {
                        var turnover = LabCI.WDSSTREAMING.scaleUpAmountByUnit(fields['100'], this.streaming.lastValue['380']);
                        this.streaming.lastValueParsed.turnover = Number(turnover);
                        var numFormatted = LabCI.WDSSTREAMING.replaceNumberWithCommas(LabCI.WDSSTREAMING.numberFormatter(turnover, 2, this.lang));
                        if (this.streaming.lastValue['15']) {
                            numFormatted = numFormatted + ' ' + this.streaming.lastValue['15'];
                        }
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'turnover', numFormatted);
                    }

                    //datetime...
                    if (this.currentExchange === 'NBA' || this.currentExchange === 'NBN' || this.currentExchange === 'NXB') {
                        //for NB ric
                        if ((fields['16'] && fields['16'] !== '') || (fields['3854'] && fields['3854'] !== '')) {
                            var timeStr = this.streaming.lastValue['16'] + " " + this.msToTime(this.streaming.lastValue['3854']);
                            var momentDate = moment.tz(timeStr, 'DD MMM YYYY HH:mm', 'GMT').tz(this.getTimeZone(this.currentExchange));
                            var d = momentDate.format('YYYY-MM-DD HH:mm:ss');
                            this.streaming.lastValueParsed.dateTimeLocal = new Date(d);
                            LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'datetime', momentDate.format('HH:mm DD/MM'));
                        }
                    } else {
                        if ((fields['16'] && fields['16'] !== '') || (fields['18'] && fields['18'] !== '')) {
                            var timeStr = this.streaming.lastValue['16'] + " " + this.streaming.lastValue['18'];
                            var momentDate = moment.tz(timeStr, 'DD MMM YYYY HH:mm:ss', 'GMT').tz(this.getTimeZone(this.currentExchange));
                            var d = momentDate.format('YYYY-MM-DD HH:mm:ss');
                            this.streaming.lastValueParsed.dateTimeLocal = new Date(d);
                            LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'datetime', momentDate.format('HH:mm DD/MM'));
                        }
                    }

                }

                //bid
                if ((fields['22'] && fields['22'] !== '') || (fields['30'] && fields['30'] !== '')) {
                    var bid = this.streaming.lastValue['22'];
                    var bidSize = this.streaming.lastValue['30'];
                    var dp = $('[streamric="' + ric + '"]').attr('dp');
                    var displayData = LabCI.WDSSTREAMING.formatDate(bid, 'price', {dp: dp}) + ' x ' + bidSize;
                    var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(bid, this.streaming.lastValueParsed.adjustedClose);
                    LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'biddata', displayData, upDownClass);
                }

                //ask
                if ((fields['25'] && fields['25'] !== '') || (fields['31'] && fields['31'] !== '')) {
                    var ask = this.streaming.lastValue['25'];
                    var askSize = this.streaming.lastValue['31'];
                    var dp = $('[streamric="' + ric + '"]').attr('dp');
                    var displayData = LabCI.WDSSTREAMING.formatDate(ask, 'price', {dp: dp}) + ' x ' + askSize;
                    var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(ask, this.streaming.lastValueParsed.adjustedClose);
                    LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'askdata', displayData, upDownClass);
                }

                //vwap
                if (fields['3404'] && fields['3404'] !== '') {
                    var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(fields['3404'], this.streaming.lastValueParsed.adjustedClose);
                    LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'vwap', fields['3404'], upDownClass);
                }

                //52Wk High
                if (this.currentExchange === 'TAI' || this.currentExchange === 'TWO' || this.currentExchange === '.TWII') {
                    if (fields['90'] && fields['90'] !== '') {
                        var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(fields['90'], this.streaming.lastValueParsed.adjustedClose);
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, '52WHigh', fields['90'], upDownClass);
                    }
                } else {
                    if (fields['3265'] && fields['3265'] !== '') {
                        var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(fields['3265'], this.streaming.lastValueParsed.adjustedClose);
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, '52WHigh', fields['3265'], upDownClass);
                    }
                }

                //52Wk Low
                if (this.currentExchange === 'TAI' || this.currentExchange === 'TWO' || this.currentExchange === '.TWII') {
                    if (fields['91'] && fields['91'] !== '') {
                        var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(fields['91'], this.streaming.lastValueParsed.adjustedClose);
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, '52WLow', fields['91'], upDownClass);
                    }
                } else {
                    if (fields['3266'] && fields['3266'] !== '') {
                        var upDownClass = LabCI.WDSSTREAMING.getUpDownClassCompare(fields['3266'], this.streaming.lastValueParsed.adjustedClose);
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, '52WLow', fields['3266'], upDownClass);
                    }
                }

                //mkt Cap
                if (this.currentExchange === 'TAI' || this.currentExchange === 'TWO' || this.currentExchange === '.TWII') {
                    if (fields['2744']) {
                        var mktCap = fields['2744'] * 1000000;
                        var numFormatted = LabCI.WDSSTREAMING.replaceNumberWithCommas(LabCI.WDSSTREAMING.numberFormatter(mktCap, 2, this.lang));
                        if (this.streaming.lastValue['15']) {
                            numFormatted = numFormatted + ' ' + this.streaming.lastValue['15'];
                        }
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'marketcap', numFormatted);
                    }
                } else if (this.currentExchange === 'HKG') {
                    if (fields['2150']) {
                        var numFormatted = LabCI.WDSSTREAMING.replaceNumberWithCommas(LabCI.WDSSTREAMING.numberFormatter(fields['2150'], 2, this.lang));
                        if (this.streaming.lastValue['15']) {
                            numFormatted = numFormatted + ' ' + this.streaming.lastValue['15'];
                        }
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'marketcap', numFormatted);
                    }
                } else if (this.currentExchange === 'SHZ' || this.currentExchange === 'SHH') {
                    if (fields['32742']) {
                        var numFormatted = LabCI.WDSSTREAMING.replaceNumberWithCommas(LabCI.WDSSTREAMING.numberFormatter(fields['32742'], 2, this.lang));
                        if (this.streaming.lastValue['15']) {
                            numFormatted = numFormatted + ' ' + this.streaming.lastValue['15'];
                        }
                        LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'marketcap', numFormatted);
                    }
                }

                //dividend
                if (fields['71'] && fields['71'] !== '') {
                    var dividendText = fields['71'];
                    if (this.streaming.lastValue['15']) {
                        dividendText = dividendText + ' ' + this.streaming.lastValue['15'];
                    }
                    LabCI.WDSSTREAMING.updateUI(this.currentquoteric, 'dividend', dividendText);
                }

                //remaining date...
                $.each(fields, function (key, val) {
                    LabCI.WDSSTREAMING.updateUI(that.currentquoteric, key, val);
                });



                //no need to update chart when closing run.....
                if (!this.streaming.lastValueParsed.isClosungRun && LabCI.WP["createquotesummarypageobj"]) {
                //    this.streaming.lastValueParsed.dateTimeLocal = moment('2021-11-13 09:30').toDate();
                //    this.streaming.lastValueParsed.open = 1103.3100;
                //    this.streaming.lastValueParsed.high = 1104.7800;
                //    this.streaming.lastValueParsed.low = 1091.1391;
                //    this.streaming.lastValueParsed.last = 1091.7500;
                //    this.streaming.lastValueParsed.acVol = 354415;
                    //    this.streaming.lastValueParsed.turnover = 354415;
                    LabCI.WDSSTREAMING.updateChartTick(window["lsinopac-quote-summary-chart"].chart, this.streaming.lastValueParsed, LabCI.WP.QuotePageObj.sessionInfo);
                }
                if (!this.streaming.lastValueParsed.isClosungRun && LabCI.WP["createquotechartpageobj"]) {
                    if (LabCI.WP.AppUtils.getMobileOrDesktop() == "DESKTOP") {
                        //for large desktop chart
                        if (window["lsinopac_chartframe"]) {
                            var sendObj = {data: this.streaming.lastValueParsed, ric: this.currentquoteric, t: encodeURIComponent(LabCI.getToken())};
                            window["lsinopac_chartframe"].contentWindow.postMessage(sendObj, APP_CONFIG.DataAPIPath);
                        }
                    } else {
                        //for large mobile chart
                        if (window["lsinopac_quote-chart"] && window["lsinopac_quote-chart"].chart && window["lsinopac_quote-chart"].chart.mainchartobj) {                          
                            LabCI.WDSSTREAMING.updateChartTick(window["lsinopac_quote-chart"].chart, this.streaming.lastValueParsed, LabCI.WP.QuotePageObj.sessionInfo);
                        }
                    }
                }
            }
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