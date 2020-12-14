
//////////////////////////////////////////////////////////////////////////////////
// LabCI Sinopac Widget - A+H
//////////////////////////////////////////////////////////////////////////////////

(function($) {

//################################################################################
//################################################################################
// The LabCI object for Generic Widget Package
// LabCI = { WP: { ... } }

if (typeof(LabCI)==="undefined") LabCI = { WP: { } };
else if (typeof(LabCI.WP)==="undefined") LabCI.WP = { };

//################################################################################

// Create a new AHPageObj ...
LabCI.WP.createahpageobj = function() {
    var pobj = LabCI.AbstractPageObj.extend("lsinopac_ah", LabCI.WP.AHPageObj);
    return pobj;
};

// The AHPageObj class
// The main object definition is here...
LabCI.WP.AHPageObj = {

    ////////////////////////////////////////////////////////////////////
    // Some setting constants

    DEFAULT_RECPERPAGE: 10,
    _UPARR: "&#x25B2;",
    _DNARR: "&#x25BC;",

    ////////////////////////////////////////////////////////////////////

    curpn: 1,
    curord: "asc",

    $refreshbtn: null,

    $ahheatmap: {
        $this: null,
        $cells: null
    },

    $stocklist: {
        $this: null,
        $dbox: null,
        $dbox_p: null,
        $dbox_d: null,
        $dtmpl: null,
        $pagingbar: null,
        $lastupdate: {
            Hshr: null,
            Ashr: null
        },
        $fx: {
            $this: null,
            fxrate: null,
            lastupdate: null
        }
    },
    $ahrsortbtn: null,

    initImpl: function() {
        // Get ready
        var that = this;

        ////////////////////////////////////////////////////////////////////

        // Create the HTML...
        var $obj, $box;

        ////////////////////////////////////////////////////////////////////

        // Heatmap
        var $box = this.$pageobj.find("#lscbw-ahheatmap");
        this.$ahheatmap = {
            $this: $box,
            $cells: $box.find(".ahheatmapcell")
        };

        ////////////////////////////////////////////////////////////////////

        $box = this.$pageobj.find("#stocklist");
        this.$stocklist = {
            $this: $box,
            $dbox: $box.find(".resultbox"),
            $dbox_d: $box.find(".resultbox.discount"),
            $dbox_p: $box.find(".resultbox.premium"),
            $dtmpl: $box.find(".resultbox .datarowtmpl").detach(),
            $pagingbar: $box.find(".pagingbar"),
            $pagingbar_d: $box.find(".pagingbar.discount"),
            $pagingbar_p: $box.find(".pagingbar.premium"),
            
            $lastupdate: {
                Hshr: $box.find("#dclm .lastupdate.Hshr"),
                Ashr: $box.find("#dclm .lastupdate.Ashr")
            },
            $fx: {
                $this: $box.find("#dclm .FX"),
                fxrate: null,
                lastupdate: null
            }
        };

        this.$ahrsortbtn = this.$stocklist.$this.children(".headerrow").children(".ahr").click(function() {
            // Re-sort in opposition order
            if (that.curord === "asc") {
                that.curord = "desc";
                that.$ahrsortbtn.find(".sort").html(that._DNARR);
            }
            else {
                that.curord = "asc";
                that.$ahrsortbtn.find(".sort").html(that._UPARR);
            }

            // Flip the order, and re-filter again set the paging
            var $rs = that.$stocklist.$dbox.children(".datarow").detach();
            $.each($rs, function() {
                that.$stocklist.$dbox.prepend($(this));
            });
            that._filterstocklist();
        });

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

    // This will filter the stocklist according to the selected groups
    _filterstocklist: function() {
        // Remove the empty datarow (if any) regardlessly ;)
        this.$stocklist.$dbox.children(".datarow.empty").remove();


        // Paging bar discount
        // Starting with hiding all rows
        var $rows_d = this.$stocklist.$dbox_d.children("tbody").children().hide();
        
        var total_d = this.$stocklist.$dbox_d.children("tbody").children().length;
        if (total_d > 0) {
            // Reset the paging state
            this.curpn = 1;

            // For among these visible rows, apply paging if necessary...
            if (total_d > this.DEFAULT_RECPERPAGE) {
                // Prepare the corresponding function
                var that = this;
                var fnGoPage_d = function(pn) {
                    that.curpn = pn;

                    // Show the records of the corresponding page
                    $rows_d.hide();
                    var startidx = (that.curpn-1) * that.DEFAULT_RECPERPAGE;
                    var endidx = startidx + that.DEFAULT_RECPERPAGE; if (endidx > total_d) endidx = total_d;
                    for (var i = startidx; i < endidx; i++) {
                        $rows_d.eq(i).show();
                    }

                    // Setup a new paging bar of the corresponding page
                    that.$stocklist.$pagingbar_d.show().pagingbar("destroy").pagingbar({
                        pn: that.curpn,
                        rpp: that.DEFAULT_RECPERPAGE,
                        total: total_d,
                        goPage: function(pn) {
                            fnGoPage_d(pn);
                        }
                    });
                };

                // Now, move to Page 1
                fnGoPage_d(1);
            }
            else {
                // No need ;)
                this.$stocklist.$pagingbar_d.pagingbar("destroy").hide();
                this.$stocklist.$dbox_d.children("tbody").children().css("display","table-row");
            }
        }
        else {
            // None visible, show empty row
            var $rows_d = this.$stocklist.$dbox.children(".datarow").hide().detach(); // detach all *real* data rows first
            LabCI.WP.AppUtils.setemptydatarow(this.$stocklist.$dbox, "NA", this.lang); // show the empty row using the apputils function
            this.$stocklist.$dbox.append($rows_d); // add back the *real* data rows
        }
        
        // Paging bar discount
        // Starting with hiding all rows
        var $rows_p = this.$stocklist.$dbox_p.children("tbody").children().hide();
        
        var total_p = this.$stocklist.$dbox_p.children("tbody").children().length;
        if (total_p > 0) {
            // Reset the paging state
            this.curpn = 1;

            // For among these visible rows, apply paging if necessary...
            if (total_p > this.DEFAULT_RECPERPAGE) {
                // Prepare the corresponding function
                var that = this;
                var fnGoPage_p = function(pn) {
                    that.curpn = pn;

                    // Show the records of the corresponding page
                    $rows_p.hide();
                    var startidx = (that.curpn-1) * that.DEFAULT_RECPERPAGE;
                    var endidx = startidx + that.DEFAULT_RECPERPAGE; if (endidx > total_p) endidx = total_p;
                    for (var i = startidx; i < endidx; i++) {
                        $rows_p.eq(i).show();
                    }

                    // Setup a new paging bar of the corresponding page
                    that.$stocklist.$pagingbar_p.show().pagingbar("destroy").pagingbar({
                        pn: that.curpn,
                        rpp: that.DEFAULT_RECPERPAGE,
                        total: total_p,
                        goPage: function(pn) {
                            fnGoPage_p(pn);
                        }
                    });
                };

                // Now, move to Page 1
                fnGoPage_p(1);
            }
            else {
                // No need ;)
                this.$stocklist.$pagingbar_p.pagingbar("destroy").hide();
                this.$stocklist.$dbox_p.children("tbody").children().css("display","table-row");
            }
        }
        else {
            // None visible, show empty row
            var $rows_p = this.$stocklist.$dbox.children(".datarow").hide().detach(); // detach all *real* data rows first
            LabCI.WP.AppUtils.setemptydatarow(this.$stocklist.$dbox, "NA", this.lang); // show the empty row using the apputils function
            this.$stocklist.$dbox.append($rows_p); // add back the *real* data rows
        }
        
        
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
        this._clearstocklist();

        // Load data immediately
        this._loadahlist();
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
        this._loadahlist();
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

    _clearstocklist: function() {
        this.$stocklist.$dbox.children(".datarow").empty();

        var e = LabCI.WP.CommonRC.getMsg("empty", this.lang);
        this.$stocklist.$lastupdate.Hshr.text(e);
        this.$stocklist.$lastupdate.Ashr.text(e);
        this.$stocklist.$fx.fxrate.text(e);
        this.$stocklist.$fx.lastupdate.text(e);

        this.$ahheatmap.$cells.find("span.cnt").text(e);

        this.$stocklist.$pagingbar.pagingbar("destroy").hide(); // clear the paging bar too, if any

        return this; // chain this
    },
    _setloadingstocklist: function() {
        this._clearstocklist();
        //LabCI.WP.AppUtils.setloadingdatarow(this.$stocklist.$dbox, this.lang);
        var ldg = LabCI.WP.CommonRC.getMsg("loading", LabCI.WP.AppUtils.getLang());
        var row = "<div class='datarow empty loading'>"+ldg+"</div>";
        this.$stocklist.$dbox.children(".datarow").empty();
        $("#stocklist").append(row)
        
        return this; // chain this
    },

    ////////////////////////////////////////////////////////////////////

    curdata: null,

    _loadahlist: function() {
        // Get ready
        var that = this;

        this._setloadingstocklist();
        this.$pageobj.loaddata("ah", "/data/ah",
        {
            pid: "ah",
            lang: this.lang,
            token: encodeURIComponent(LabCI.getToken("ah"))
        },
        function(result) {
            if (result && result.data && result.data.responseCode!=="F") {
                // Save the latest full set of data
                that.curdata = result.data;
                var p_count =0;
                var d_count =0;
                // Fit the data into the UI
                var d = that.curdata.lastupdate;
                var dt;
                if (d.h) {
                    if (d.h.length > 8) {
                        dt = Date.parseExact(d.h, "yyyyMMddHHmm");
                        that.$stocklist.$lastupdate.Hshr.text(LabCI.WP.CommonRC.fmtDT(dt, "FORMATPATTERN_DATETIME_SHORTMD_DCLM", that.lang));
                    }
                    else {
                        dt = Date.parseExact(d.h, "yyyyMMdd");
                        that.$stocklist.$lastupdate.Hshr.text(LabCI.WP.CommonRC.fmtDT(dt, "FORMATPATTERN_DATE_SHORTYMD", that.lang));
                    }
                }
                if (d.a) {
                    if (d.a.length > 8) {
                        dt = Date.parseExact(d.a, "yyyyMMddHHmm");
                        that.$stocklist.$lastupdate.Ashr.text(LabCI.WP.CommonRC.fmtDT(dt, "FORMATPATTERN_DATETIME_SHORTMD_DCLM", that.lang));
                    }
                    else {
                        dt = Date.parseExact(d.a, "yyyyMMdd");
                        that.$stocklist.$lastupdate.Ashr.text(LabCI.WP.CommonRC.fmtDT(dt, "FORMATPATTERN_DATE_SHORTYMD", that.lang));
                    }
                }

                d = that.curdata.fx;
                dt = Date.parseExact(d.hc_d, "yyyyMMdd");
                that.$stocklist.$fx.lastupdate.text(LabCI.WP.CommonRC.fmtDT(dt, "FORMATPATTERN_DATE_SHORTYMD", that.lang));
                that.$stocklist.$fx.fxrate.setValue(d.hc);

                // For grouping...
                var d3=0, d2=0, d1=0, p1=0, p2=0, p3=0;

                that.$stocklist.$dbox.children(".datarow").empty();
                d = that.curdata.stocklist;
                $.each(d, function(i, r) {
                    var $row = that.$stocklist.$dtmpl.clone();
//                    if (i%2>0) $row.addClass("alt"); // since there is specific filtering by selected groups, the zebra colours will be assigned after filtered

                    var $o, s;  
                    $row.find(".nm span").text(r.h.nm);
                    $o = $row.find(".scflag span");
                    $o.text(LabCI.WP.CommonRC.scflag2name(r.a.exchsect, that.lang)).addClass(r.a.exchsect);

                    // Hshr
                    s = r.h;
                    $o = $row.attr("ric", s.ric);
                    $o.find(".Hshr_symbol").text(s.symbol);
                    $o.find(".Hshr_ls").text(s.ls);
                    $o.find(".Hshr_nc").text(s.nc);
                    $o.find(".Hshr_nm").text(s.nm);
                    $o.find(".Hshr_pc").addClass(LabCI.Utils.getUpDownClass(s.pc)).setValue(s.pc, "%");
                    if (r.a.nbscflag) $o.show().text(LabCI.WP.CommonRC.scflag2name(r.a.exchsect, that.lang));
                        else $o.hide();
                    

                    // Ashr
                    s = r.a;
                    $o.find(".Ashr_symbol").text(s.symbol);
                    $o.find(".ls_HKD").text(s.ls);
                    $o.find(".ls_CNY").text(parseFloat(parseFloat(s.ls) / parseFloat(that.curdata.fx.hc)).toFixed(2));
                    $o.find(".Ashr_nc").text(s.nc);
                    $o.find(".Ashr_nm").text(s.nm);
                    $o.find(".Ashr_pc").addClass(LabCI.Utils.getUpDownClass(s.pc)).setValue(s.pc, "%");

                    // Finally, the AH arbitary
                    $row.find(".ahr").addClass(LabCI.Utils.getUpDownClass(r.ahdcnt)).setValue(r.ahdcnt, "%");

                    // Count into the corresponding group and tag with the group id
                    var ahr = parseFloat(r.ahdcnt);
                    if (20.0 < ahr)                       { p3++; $row.addClass("p3"); }
                    else if (10.0 < ahr && ahr <= 20.0)   { p2++; $row.addClass("p2"); }
                    else if (0.0 <= ahr && ahr <= 10.0)   { p1++; $row.addClass("p1"); }
                    else if (-10.0 <= ahr && ahr < 0.0)   { d1++; $row.addClass("d1"); }
                    else if (-20.0 <= ahr && ahr < -10.0) { d2++; $row.addClass("d2"); }
                    else if (ahr < -20.0)                 { d3++; $row.addClass("d3"); }

                    // Ready ;
                    if (ahr< 0){
                        d_count++;
                        that.$stocklist.$dbox_d.append($row.removeClass("datarowtmpl").show());
                    }else{
                        p_count++;
                        that.$stocklist.$dbox_p.append($row.removeClass("datarowtmpl").show());
                    }
                });
                var revBody = that.$stocklist.$dbox_p.find("tbody");
                revBody.html($("tr",revBody).get().reverse());
                
                that.$pageobj.find("#d_p_sacle_wrapper .discount.no_of_stock").html(d_count);
                that.$pageobj.find("#d_p_sacle_wrapper .premium.no_of_stock").html(p_count);
                that.$pageobj.find("#d_p_sacle_wrapper .d_p_sacle").attr("data-sacle",Math.round(d_count / (d_count+p_count) * 100 / 5));
                
                // Last step, hide/show the stocks that fall into the currently selected groups
                that._filterstocklist();

                // Show the counts
                that.$ahheatmap.$cells.filter("#p3").find("span.cnt").text(p3);
                that.$ahheatmap.$cells.filter("#p2").find("span.cnt").text(p2);
                that.$ahheatmap.$cells.filter("#p1").find("span.cnt").text(p1);
                that.$ahheatmap.$cells.filter("#d1").find("span.cnt").text(d1);
                that.$ahheatmap.$cells.filter("#d2").find("span.cnt").text(d2);
                that.$ahheatmap.$cells.filter("#d3").find("span.cnt").text(d3);

                // Set the click action
                that.$stocklist.$dbox.find(".textlink").click(function() {
                    var ric = $(this).parent().attr("ric");
                    LabCI.switchWidget("quote", { ric: ric, func: "basicquote" });
                });
                
                $(".empty.loading").remove();
            }
            else {
                // Error handling...
                LabCI.WP.AppUtils.setemptydatarow(that.$stocklist.$dbox, "NA", that.lang);

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

    ////////////////////////////////////////////////////////////////////

    // Build up the UI on-the-fly for different languages
    _setUILabels: function() {
        var that = this;
        var rb, $o;
        
        rb = this.pageobj_rb.stocklist.title;
        $o = $(this.$pageobj);
        $o.find(".SHH_label").html(LabCI.WP.CommonRC.scflag2name("SHH", that.lang));
        $o.find(".SHZ_label").html(LabCI.WP.CommonRC.scflag2name("SHZ", that.lang));
        $o.find("#discount_title").html(rb.discount);
        $o.find("#premium_title").html(rb.premium);
        $o.find(".discount_no").html(rb.discount_no);
        $o.find(".premium_no").html(rb.premium_no);

        rb = this.pageobj_rb.ahheatmap;
        this.$ahheatmap.$this.find(".dcntlbl").html(rb.dcntlbl);
        this.$ahheatmap.$this.find(".pmmlbl").html(rb.pmmlbl);
        this.$ahheatmap.$cells.find("span.unit").text(LabCI.WP.CommonRC.getMsg("stocks", this.lang));
        
        

        $o = this.$stocklist.$this
        rb = this.pageobj_rb.stocklist.title;
        this.$ahrsortbtn.html(rb.ahr).find(".sort").html(this.curord==="asc"?this._UPARR:this._DNARR);
        $o.find(".Hshr_title").html(rb.h);
        $o.find(".Ashr_title").html(rb.a);
        rb = this.pageobj_rb.stocklist.th;
        $o.find(".nm").html(rb.nm);
        $o.find(".nc").html(rb.nc);
        $o.find(".ls").html(rb.ls);
        $o.find(".symbol").html(rb.symbol);
        $o.find(".pc").html(rb.pc);
        $o.find(".ls_HKD").html(rb.ls_h);
        $o.find(".ls_CNY").html(rb.ls_a);
        $o.find(".ahr").html(rb.ahr);

        $o = this.$stocklist.$dtmpl;
        $o.find(".buybtn").text(rb.buy);
        $o.find(".sellbtn").text(rb.sell);

        rb = this.pageobj_rb.stocklist.dclm;
        this.$stocklist.$this.find("#dclm .lbl.Hshr").html(rb.Hshr);
        this.$stocklist.$this.find("#dclm .lbl.Ashr").html(rb.Ashr);
        this.$stocklist.$this.find("#dclm .lbl.FX").html(rb.FX);
        // ... no we have the complete HTML code of the FX dclm label, get the fields' reference
        this.$stocklist.$fx.fxrate = this.$stocklist.$fx.$this.children(".fxrate");
        this.$stocklist.$fx.lastupdate = this.$stocklist.$fx.$this.children(".lastupdate");

////////////////////////////////////////////////////////////////////////////////
// Require: apputils.js
LabCI.WP.AppUtils.initTRdclm(this.$pageobj, this.lang);
////////////////////////////////////////////////////////////////////////////////

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