////////////////////////////////////////////////////////////////////////////////
// LabCI Sinopac Widget - Sector Heatmap
//////////////////////////////////////////////////////////////////////////////////

(function($) {

//################################################################################
//################################################################################
// The LabCI object for Generic Widget Package
// LabCI = { WP: { ... } }

if (typeof(LabCI)==="undefined") LabCI = { WP: { } };
else if (typeof(LabCI.WP)==="undefined") LabCI.WP = { };

//################################################################################

// Create a new SctHmPageObj ...
LabCI.WP.createscthmpageobj = function() {
    var pobj = LabCI.AbstractPageObj.extend("lsinopac_scthm", LabCI.WP.SctHmPageObj);
    return pobj;
};

// The SctHmPageObj class
// The main object definition is here...
LabCI.WP.SctHmPageObj = {

    ////////////////////////////////////////////////////////////////////
    // Some setting constants

    DEFAULT_RECPERPAGE: 10,

    ////////////////////////////////////////////////////////////////////

    curmkt: "HKG",
    cursct: null, // when zoomed in, otherwise, null

    cursizetype: "mc",
    curper: "p1d",

    curpn: 1,

    ////////////////////////////////////////////////////////////////////

    $refreshbtn: null,

    $mktbar: null,
        $mktbarcells: null,
    $perbar: null,
        $perbarcells: null,

    $heatmapnavbox: null,
        $breadcrumb_lv1: null,
        $breadcrumb_lv2: null,
        $top3: null,
        $bottom3: null,

    $heatmapbox: null,
        $heatmaplegend: null,
        $sizetypeselect: null,
        $heatmapcanvas: null,

    $itemlist: {
        $this: null,
        $dbox: null,
        $dtmpl: null,
        $pagingbar: null,
        $lastupdate: null
    },

    initImpl: function() {
        // Get ready
        var that = this;

        ////////////////////////////////////////////////////////////////////

        // Create the HTML...
        var $obj, $box;

        // Action buttons
        this.$refreshbtn = this.$pageobj.find("#lsinopac_refreshbtn").click(function() {
            that.refresh();
        });

        ////////////////////////////////////////////////////////////////////

        // Func Bar
        this.$mktbar = this.$pageobj.find("#lsinopac_mktbar");
        this.$mktbarcells = this.$mktbar.find(".funcbarcell").click(function() {
            var mkt = $(this).attr("id");
            that.switchmktper(mkt, null, true);
        });
        this.$perbar = this.$pageobj.find("#lsinopac_perbar");
        this.$perbarcells = this.$perbar.find(".funcbarcell").click(function() {
            var per = $(this).attr("id");
            that.switchmktper(null, per, false); // just changing the period, no need to refresh/reload data, just re-populate will be good enough :D
        });

        ////////////////////////////////////////////////////////////////////

        this.$heatmapbox = this.$pageobj.find("#heatmapbox");

        this.$heatmapnavbox = this.$heatmapbox.find("#heatmapnavbox");
        this.$breadcrumb_lv1 = this.$heatmapnavbox.find("#breadcrumb-lv1").click(function() {
            if ($(this).hasClass("textlink")) that._heatmapzoomout(); // when this is a link, i.e. when lv2 is being shown, trigger a zoomout
        });
        this.$breadcrumb_lv2 = this.$heatmapnavbox.find("#breadcrumb-lv2");
        this.$top3 = this.$heatmapnavbox.find("#top3");
        this.$bottom3 = this.$heatmapnavbox.find("#bottom3");
        this.$heatmapnavbox.find(".nm").click(function() {
            if (that.cursct) {
                // A stock...
                LabCI.switchWidget("quote", { ric: $(this).attr("ric"), func: "basicquote" });
            }
            else {
                // A sector...
                that._heatmapzoomin($(this).attr("trbc"));
            }
        });

        this.$heatmaplegend = this.$heatmapbox.find("#heatmaplegend");

        this.$heatmapcanvas = this.$heatmapbox.children("#heatmapcanvas").heatmapbox({
            onClick: function(celldata, e) {
                // Zoom in to a deeper level, allowing only once
                if (celldata && celldata.trbc) {
                    // A sector was clicked...
                    that._heatmapzoomin(celldata.trbc);
                }
                else {
                    // A stock was clicked
                    LabCI.WP.AppUtils.openQuotePage(celldata.symbol, celldata.exchange);
                }
            },
            renderCell: function($hmc, $hmctbx, celldata) {
                var pctval = celldata.value + "%";
                $hmctbx.append($("<div/>").addClass("cellname").html($("<a href='javascript:void(0)'/>").html(celldata.name)));
                $hmctbx.append($("<div/>").addClass("cellvalue").html(pctval));
                $hmctbx.attr("title", celldata.name + " " + pctval);
                return $hmctbx;
            }
        });

        ////////////////////////////////////////////////////////////////////

        $box = this.$pageobj.find("#itemlist");
        this.$itemlist = {
            $this: $box,
            $dbox: $box.find(".resultbox"),
            $dtmpl: $box.find(".resultbox .datarowtmpl").detach(),
            $pagingbar: $box.find(".pagingbar"),
            $lastupdate: this.$pageobj.find("#dclm .lastupdate")
        };

        ////////////////////////////////////////////////////////////////////

        $("body").click(function(e) {
            var $this = $(e.target);
        });

        ////////////////////////////////////////////////////////////////////

        // Help Bubbles...
        LabCI.WP.AppUtils.initHelpBubble(this.$pageobj.find(".helpbubble"));

        ////////////////////////////////////////////////////////////////////

        // Prepare the resize function
        // ... this has to be created here, because when resize() is called, the "this" will be in a different context
        // ... hence, use "that" in the function scope here to build this resize() function
        // ... a bad trick, but works ;)
        this.resize = function() {
            that.$pageobj.delaycall("resize", function() {
                that.resizeImpl();
            }, 100);
        };

        ////////////////////////////////////////////////////////////////////

        return this; // chain this
    },

    ////////////////////////////////////////////////////////////////////

    switchmktper: function(mkt, per, dorefresh) {
        // Save the reference
        var isnewmkt;
        if (mkt && this.curmkt !== mkt) {
            isnewmkt = true;
            this.curmkt = mkt;
        }
        if (per) this.curper = per;

        // Back to lv1, if mkt changed
        if (isnewmkt) {
            this._heatmapzoomout(true); // just do the visual, do not load data yet
        }

        // Some visual stuffs...
        // Update the breadcrumb of lv1
        var rb = this.pageobj_rb.breakcrumb;
        this.$breadcrumb_lv1.text(rb[this.curmkt]);

        // Set the UI effect and trigger to load data...
        this.$mktbarcells.removeClass("selected").filter("[id='"+this.curmkt+"']").addClass("selected");
        this.$perbarcells.removeClass("selected").filter("[id='"+this.curper+"']").addClass("selected");

        // Refresh data now, if required...
        if (dorefresh) this._loadheatmapdata();
                  else this._populateheatmapdata(); // don't refresh, just re-populate the data into the view
    },

    ////////////////////////////////////////////////////////////////////

    _settopbottom3title: function() {
        if (this.cursct) {
            // Update the top 3, which at zoomin state, they are showing top stocks
            var rb = this.pageobj_rb.heatmapbox.rowtitle;
            this.$top3.children(".rowtitle").text(rb.top3 + rb.stk);
            this.$bottom3.children(".rowtitle").text(rb.bottom3 + rb.stk);
        }
        else {
            // Update the top 3, which at zoomout state, they are showing top sectors
            var rb = this.pageobj_rb.heatmapbox.rowtitle;
            this.$top3.children(".rowtitle").text(rb.top3 + rb.sct);
            this.$bottom3.children(".rowtitle").text(rb.bottom3 + rb.sct);
        }

        return this; // chain this
    },

    _heatmapzoomin: function(zoomintrbc, noreloaddata) {
        // Set the state
        this.cursct = zoomintrbc;

        // Do the visual...
        this.$breadcrumb_lv1.addClass("textlink");
        this.$breadcrumb_lv2.text(LabCI.WP.CommonRC.trbc2name(zoomintrbc, this.lang)).show();
        this._settopbottom3title();

        // Reload data if needed
        if (!noreloaddata) this._loadheatmapdata();
    },

    _heatmapzoomout: function(noreloaddata) {
        // Set the state
        this.cursct = null;

        // Do the visual...
        this.$breadcrumb_lv1.removeClass();
        this.$breadcrumb_lv2.hide().empty();
        this._settopbottom3title();

        // Reload data if needed
        if (!noreloaddata) this._loadheatmapdata();
    },

    ////////////////////////////////////////////////////////////////////

    resize: null,
    resizeImpl: function() {

    },

    ////////////////////////////////////////////////////////////////////

    showImpl: function(statedata) {
//        // Get ready
//        var that = this;

        // Trigger a resize to catch the current dimension
        $(window).resize(this.resize);
        this.resizeImpl();

        // Clear all fields
        this._clearheatmap();
        this._clearitemlist();

        // Kickstart by switching the tabs ;)
        this.switchmktper(null, null, true);

        return this; // chain this
    },

    hideImpl: function() {
//        // Get ready
//        var that = this;

        // Unbind the resize event
        $(window).unbind(_RESIZE_EVENT, this.resize);

        return this; // chain this
    },

    refreshImpl: function() {
        this._loadheatmapdata();
        return this; // chain this
    },

    resetImpl: function() {
        return this; // chain this
    },

    ////////////////////////////////////////////////////////////////////

    getStateDataImpl: function() {
        return { };
    },

    ////////////////////////////////////////////////////////////////////

    _clearheatmap: function() {
//        var na = LabCI.WP.CommonRC.getMsg("NA", this.lang);
        this.$top3.children(".cell").hide();
        this.$top3.children(".empty").show();
        this.$bottom3.children(".cell").hide();
        this.$bottom3.children(".empty").show();

        this.$heatmapnavbox.find(".cell").hide();
        this.$heatmapcanvas.heatmapbox("removeAllCells").children(".datarow.empty").remove();
    },
    _setloadingheatmap: function() {
        this._clearheatmap();

        var ldg = LabCI.WP.CommonRC.getMsg("loading", this.lang);
        this.$heatmapcanvas.append("<div class='datarow empty loading'>"+ldg+"</div>");
    },

    _clearitemlist: function() {
        this.$itemlist.$dbox.empty();

        var e = LabCI.WP.CommonRC.getMsg("empty", this.lang);
        this.$itemlist.$lastupdate.text(e);

        this.$itemlist.$pagingbar.pagingbar("destroy").hide(); // clear the paging bar too, if any
    },
    _setloadingitemlist: function() {
        this._clearitemlist();
        LabCI.WP.AppUtils.setloadingdatarow(this.$itemlist.$dbox, this.lang);
    },

    ////////////////////////////////////////////////////////////////////

    curdata: {
        heatmap: null,
        lastupdate: null
    },

    _loadheatmapdata: function() {
        // Get ready
        var that = this;

        this._setloadingheatmap();
        this._setloadingitemlist();
        this.$pageobj.loaddata("scthm", "/data/scthm",
        {
            pid: "scthm",
            mkt: this.curmkt,
            sct: this.cursct ? this.cursct : "", // if cursct is set, meaning that we are zooming into a sector - i.e. this is list of stocks
            pn: this.curpn,
            lang: this.lang,
            token: encodeURIComponent(LabCI.getToken("scthm"))
        },
        function(result) {
            if (result && result.data && result.data.responseCode!=="F") {
                // Save the latest full set of data
                that.curdata = result.data;

                // Populate data into the Heatmap 2D and the item list...
                that._populateheatmapdata();
            }
            else {
                // Error handling...
                LabCI.WP.AppUtils.setemptydatarow(that.$heatmapcanvas, "NA", that.lang);
                LabCI.WP.AppUtils.setemptydatarow(that.$itemlist.$dbox, "NA", that.lang);

                // Prompt error message, if defined ;)
                if (result && result.data) LabCI.WP.AppUtils.onReceiveFailResp(result.data, that.$pageobj);
            }
        },
        0,
        {
            datatype: "jsonp"
        });

        return this; // chain this
    },

    _populateheatmapdata: function() {
        var that = this;
        this._clearheatmap();
        this._clearitemlist();

        // Prepare the list of heatmap items that will go into the heatmap 2D layout (i.e. those items with hmbox: { } data structure
        var _allheatmapdata = new Array();
        that.curdata.allheatmapdata = _allheatmapdata;

        var _heatmap2Ddata = new Array();
        that.curdata.heatmapdata = _heatmap2Ddata;

        $.each(that.curdata.heatmap, function(i, item) {
            // Prepare this item...
            var id, name;
            if (that.cursct) {
                // if cursct is set, meaning that we are zooming into a sector - i.e. this is list of stocks
                id = item.symbol;
                name = item.nm;
            }
            else {
                // otherwise, this is a list of sectors
                id = item.trbc;
                name = LabCI.WP.CommonRC.trbc2name(item.trbc, that.lang);
            }
            var hm = {
                id: id,
                ric: item.ric,
                exchsect: item.exchsect,
                trbc: item.trbc,
                name: name,
                value: item[that.curper],
                p1d: item.p1d,
                p1m: item.p1m,
                p1w: item.p1w,
                p6m: item.p6m,
                ccy: item.ccy,
                ls: item.perf_ls,
                si: item
            };
            _allheatmapdata.push(hm);

            // If this item has hmbox defined for this size type, add this to the heatmap data for laying out into the heatmap 2D
            var ps = item.hmbox[that.cursizetype];
            if (ps) {
                hm.left = ps.left + "%";
                hm.width = ps.width + "%";
                hm.top = ps.top + "%";
                hm.height = ps.height + "%";
                _heatmap2Ddata.push(hm);
            }
        });

        // Show it...
        that.$heatmapcanvas.children(".datarow.empty").remove();
        if (_heatmap2Ddata.length > 0) {
            // Using the prepared heatmap data
            that.$heatmapcanvas.heatmapbox("addCells", _heatmap2Ddata, (that.cursizetype === "am") ? that.curdata.orderlist_am : that.curdata.orderlist_mc);

            // Sort the list and refresh the top/bottom 3 using the orginal full list...
            _allheatmapdata.sort(function(a, b) {
                return parseFloat(b.value) - parseFloat(a.value);
            });

            var datalen = _allheatmapdata.length;
            var cnt;

            // Top 3
            var top3 = new Array();
            cnt = 0;
            for (var i = 0; i < datalen; i++) {
                var item = _allheatmapdata[i];
                var value = parseFloat(item.value);
                if (value >= 0) {
                    top3.push(item);
                    cnt++;
                }
                else {
                    break; // no more +ve
                }
                if (cnt === 3) break; // enough
            }
            that.$top3.children(".cell").hide();
            if (top3.length > 0) {
                $.each(top3, function(i, item) {
                    var $item = that.$top3.children("#item"+i).show();
                    $item.children(".nm").text(item.name).attr({ "ric": item.ric, "trbc": item.trbc });
                    $item.children(".pc").setValue(item.value, "%").removeClass("upval downval").addClass(LabCI.Utils.getUpDownClass(item.value));
                });
            }
            else {
                that.$top3.children(".empty").show();
            }

            // Bottom 3
            var bottom3 = new Array();
            cnt = 0;
            for (var i = datalen-1; i > 0; i--) {
                var item = _allheatmapdata[i];
                var value = parseFloat(item.value);
                if (value < 0) {
                    bottom3.push(item);
                    cnt++;
                }
                else {
                    break; // no more -ve
                }
                if (cnt === 3) break; // enough
            }
            that.$bottom3.children(".cell").hide();
            if (bottom3.length > 0) {
                $.each(bottom3, function(i, item) {
                    var $item = that.$bottom3.children("#item"+i).show();
                    $item.children(".nm").text(item.name).attr({ "ric": item.ric, "trbc": item.trbc });
                    $item.children(".pc").setValue(item.value, "%").removeClass("upval downval").addClass(LabCI.Utils.getUpDownClass(item.value));
                });
            }
            else {
                that.$bottom3.children(".empty").show();
            }

            // Fill in the itemlist too
            if (that.cursct) {
                // For showing stocks
                that.$itemlist.$this.removeClass("sct").addClass("stk");
            }
            else {
                // For showing sectors
                that.$itemlist.$this.removeClass("stk").addClass("sct");
            }

            that.$itemlist.$dbox.empty();
            
            $row = that.$itemlist.$dtmpl.clone();
            $row.attr("class","headerrow datarow");
            rb = this.pageobj_rb.itemlist.th;
            ps = LabCI.WP.CommonRC.getRes("period", this.lang); 
            $row.find(".symbol").removeClass("textlink").html(rb.symbol);
            $row.find(".nm").removeClass("textlink").html(rb.nm);
            $row.find(".ls").html(rb.ls);
            $row.find(".p1d").html(ps.p1d);
            $row.find(".p1w").html(ps.p1w);
            $row.find(".p1m").html(ps.p1m);
            $row.find(".p6m").html(ps.p6m);
            
            that.$itemlist.$dbox.append($row.removeClass("datarowtmpl").css("display","table-row"));
            
            $.each(_allheatmapdata, function(i, item) {
                var $row = that.$itemlist.$dtmpl.clone();
                if (i%2>0) $row.addClass("alt");
                if ($("#itemlist").hasClass("stk")){
                   $row.addClass("stk")
                   $row.attr({"symbol": item.id, "exchange": LabCI.WP.AppUtils.INTEGRATION_EXCHANGE_MAPPING[item.exchsect]});
                }
                
                $row.attr({ "ric": item.ric, "trbc": item.trbc });
                $row.children(".order").text((i+1));
                $row.find(".symbol").text(item.id);
                var $nm = $row.find(".nm").text(item.name);

                // When showing a stock
                if (that.cursct) {
                    $nm.attr("title", item.name);
                    $row.children(".ccy").text(LabCI.WP.CommonRC.ccy2name(item.ccy, that.lang));
                    $row.children(".ls").text(item.ls);

                    // Setup buy/sell button actions
                    var $bsbtngrp = $row.find("#bsbtngrp");

                    // Specifically remove the textlink when SHZ stock, started with 3 (which are for institutional trade only)
                    if (item.exchsect === "SHZ" && item.id.startsWith("3")) $row.children(".textlink").removeClass("textlink");
                }

                $row.children(".p1d").addClass(LabCI.Utils.getHeatmapTemp(item.p1d)).setValue(item.p1d, "%");
                $row.children(".p1w").addClass(LabCI.Utils.getHeatmapTemp(item.p1w)).setValue(item.p1w, "%");
                $row.children(".p1m").addClass(LabCI.Utils.getHeatmapTemp(item.p1m)).setValue(item.p1m, "%");
                $row.children(".p6m").addClass(LabCI.Utils.getHeatmapTemp(item.p6m)).setValue(item.p6m, "%");

                // Ready ;)
                that.$itemlist.$dbox.append($row.removeClass("datarowtmpl").css("display","table-row"));
            });

            // When showing lv3 stocks, setup the pagingbar if more than 1 page
            if (that.cursct) {
                var total = _allheatmapdata.length ;
                if (total > that.DEFAULT_RECPERPAGE) {
                    // Prepare the corresponding function
                    var fnGoPage = function(pn) {
                        that.curpn = pn;

                        // Show the records of the corresponding page
                        var $rows = that.$itemlist.$dbox.children().hide();
                        var startidx = ((that.curpn-1) * that.DEFAULT_RECPERPAGE) +1 ;
                        var endidx = startidx + that.DEFAULT_RECPERPAGE; 
                        if (endidx > total+1) endidx = total+1;
                        for (var i = startidx; i < endidx; i++) {
                            $rows.eq(i).show();
                        }

                        // Setup a new paging bar of the corresponding page
                        that.$itemlist.$pagingbar.show().pagingbar("destroy").pagingbar({
                            pn: that.curpn,
                            rpp: that.DEFAULT_RECPERPAGE,
                            total: total,
                            goPage: function(pn) {
                                fnGoPage(pn);
                            }
                        });
                    };

                    // Now, move to Page 1
                    fnGoPage(1);
                }
            }

            // Add click action
            that.$itemlist.$dbox.find(".datarow .textlink").click(function() {
                if ($(this).parents(".datarow").hasClass("stk")){
                    // A stcok...
                    $this = $(this).parents(".datarow")
                    LabCI.WP.AppUtils.openQuotePage($this.attr("symbol"), $this.attr("exchange"));
                }else{
                    // A sector...
                    that._heatmapzoomin($(this).parents(".datarow").attr("trbc"));
                }
            });
            
            that._setDCLMlabel(that.curmkt);
            if (that.curdata.lastupdate) {
                var dt = Date.parseExact(that.curdata.lastupdate, "yyyyMMddHHmm");
                that.$itemlist.$lastupdate.text(LabCI.WP.CommonRC.fmtDT(dt, "FORMATPATTERN_DATETIME_SHORTMD_DCLM", that.lang));
            }
            else {
                that.$itemlist.$lastupdate.text("-");
            }
        }
    },

    ////////////////////////////////////////////////////////////////////

    // Build up the UI on-the-fly for different languages
    _setUILabels: function() {
        var that = this;
        var rb, $o, lbl;
        var ps = LabCI.WP.CommonRC.getRes("period", this.lang);
        rb = this.pageobj_rb.pagetitlebar;
        $o = this.$pageobj.children("#lsinopac_pagetitlebar");
        $o.children("#lsinopac_pagetitle").html(rb.title);
        $o.children("#lsinopac_pagedesc").html(rb.desc);

        rb = this.pageobj_rb.mktbar;
        this.$mktbarcells.filter("#HKG").find(".lbl").html(rb.HKG);
        this.$mktbarcells.filter("#USA").find(".lbl").html(rb.USA);
        this.$mktbarcells.filter("#TAI").find(".lbl").html(rb.TAI);
        this.$mktbarcells.filter("#SHH").find(".lbl").html(rb.SHH);
        this.$mktbarcells.filter("#SHZ").find(".lbl").html(rb.SHZ);

        this.$perbarcells.filter("#p1d").find(".lbl").html(ps.p1d);
        this.$perbarcells.filter("#p1w").find(".lbl").html(ps.p1w);
        this.$perbarcells.filter("#p1m").find(".lbl").html(ps.p1m);
        this.$perbarcells.filter("#p6m").find(".lbl").html(ps.p6m);
        
        rb = LabCI.WP.CommonRC.getRes("button", this.lang);
        this.$refreshbtn.text(rb.refresh);

        rb = this.pageobj_rb.heatmapbox;
        this.$top3.children(".rowtitle").text(rb.rowtitle.top3);
        this.$bottom3.children(".rowtitle").text(rb.rowtitle.bottom3);
        var na = LabCI.WP.CommonRC.getMsg("NA", this.lang);
        this.$top3.children(".empty").text(na);
        this.$bottom3.children(".cell").hide();
        this.$bottom3.children(".empty").text(na);

        this._settopbottom3title(); // setup some additional visual

        rb = LabCI.WP.CommonRC.getRes("heatmaplegend", this.lang);
        this.$heatmaplegend.children("#heatmaplegend-n").text(rb.n);
        this.$heatmaplegend.children("#heatmaplegend-p").text(rb.p);
        this.$heatmaplegend.children("#heatmaplegend-lbl").text(rb.lbl);

        this.$itemlist.$lastupdate.prev().html(this.pageobj_rb.dclm);

////////////////////////////////////////////////////////////////////////////////
// Custom code for Sinopac, to create link of TR disclaimer
// Require: apputils.js
LabCI.WP.AppUtils.initTRdclm(this.$pageobj, this.lang);
////////////////////////////////////////////////////////////////////////////////

    },
    _setDCLMlabel: function(mkt) {
        if (mkt.startsWith("HKG")) mkt = "HKG";
        else if (mkt.indexOf("Z") !== -1) mkt = "SHZ";
        else mkt = "SHH";
        this.$itemlist.$this.find("#dclm .lbl").html(this.pageobj_rb.dclm[mkt]); // HKG, SHH or SHZ
    },

    ////////////////////////////////////////////////////////////////////

    // A placeholder for resources, to be defined in separate resource files for specific languages
    PAGEOBJ_RESOURCEBUNDLE: {
        conf: {
            def: {
                mkt: "HKG",
                per: "p1d",
                sct: "50",
                ord: "1d;desc",
                pn: 1
            }
        }
    }

};

LabCI.Utils._HEATMAPTEMP_RANGES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
LabCI.Utils.getHeatmapTemp = function(pc) {
    if (pc) {
        // Check if 0
        var nval = Number(pc.replace(',', ''));
        if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[9]) {
            return "hmp10";
        }else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[8] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[9]) {
            return "hmp9";
        }else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[7] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[8]) {
            return "hmp8";
        }else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[6] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[7]) {
            return "hmp7";
        }else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[5] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[6]) {
            return "hmp6";
        }else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[4] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[5]) {
            return "hmp5";
        }else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[3] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[4]) {
            return "hmp4";
        }else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[2] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[3]) {
            return "hmp3";
        }else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[1] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[2]) {
            return "hmp2";
        }else if (nval > LabCI.Utils._HEATMAPTEMP_RANGES[0] && nval <= LabCI.Utils._HEATMAPTEMP_RANGES[1]) {
            return "hmp1";
        }else if (nval == LabCI.Utils._HEATMAPTEMP_RANGES[0]) {
            return "hm0";
        }else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[1] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[0]) {
            return "hmn1";
        }else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[2] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[1]) {
            return "hmn2";
        }else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[3] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[2]) {
            return "hmn3";
        }else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[4] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[3]) {
            return "hmn4";
        }else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[5] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[4]) {
            return "hmn5";
        }else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[6] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[5]) {
            return "hmn6";
        }else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[7] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[6]) {
            return "hmn7";
        }else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[8] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[7]) {
            return "hmn8";
        }else if (nval >= -LabCI.Utils._HEATMAPTEMP_RANGES[9] && nval < -LabCI.Utils._HEATMAPTEMP_RANGES[8]) {
            return "hmn9";
        }else if (nval < -LabCI.Utils._HEATMAPTEMP_RANGES[9]) {
            return "hmn10";
        }
    }

    // Any other case?!
    return "hm0";
};

// Returning either "upval", "downval", or "" as the CSS class for displaying these up, down or no-change value
LabCI.Utils.getUpDownClass = function(nc) {
    if (nc) {
        var ncval = Number(nc);

        // Check if 0
        if (ncval == 0) {
            return "";
        }
        // If -nnn ?
        else if (nc.length > 1 && nc.startsWith("-")) {
            return "downval";
        }
        // If +nnn ?
        else if (nc.length > 1 && nc.startsWith("+") || ncval > 0) {
            return "upval";
        }
    }

    // Any other case, return ""
    return "";
};

})(jQuery);