// App specific stuffs

if (typeof LabCI === 'undefined') LabCI = { WP: {} };
else if (typeof LabCI.WP === 'undefined') LabCI.WP = {};

LabCI.WP.AppUtils = {
    getLang: function () {
        var lang = LabCI.Utils.getURLParameter('lang');
        if (lang == null || lang == undefined || lang == '') {
            lang = 'zh_TW';
        }
        return lang;
    },
    setloadingdatarow: function ($dbox, lang) {
        var ldg = LabCI.WP.CommonRC.getMsg('loading', lang ? lang : LabCI.getLang());
        var row = "<div class='datarow empty loading'>" + ldg + '</div>';
        $dbox.empty().html(row);
    },

    setemptydatarow: function ($dbox, msgid, lang) {
        var na = LabCI.WP.CommonRC.getMsg('NA', lang ? lang : LabCI.getLang());
        var row = "<div class='datarow empty'>" + na + '</div>';
        $dbox.empty().html(row);
    },

    onReceiveFailResp: function (errcodeobj, $refobj) {
        // log
        LabCI.Utils.CONSOLELOGGER.error('FAIL RESPONSE: ' + JSON.stringify(errcodeobj));

        // prompt once...
        var lang = LabCI.Utils.getURLParameter('lang');
        var err = LabCI.WP.CommonRC.getMsg('err', lang);
        var msg = err[errcodeobj.reasonCode];
        if (msg === undefined) msg = err.defmsg;
        if (msg) LabCI.WP.AppUtils.openAlert(null, msg, lang, false, null, null, $refobj);
    },

    _ALERTDIALOG_HTML:
        '\
<div id="lscbw-alertdialog" class="lscbw" style="display:none">\
<div class="datatable">\
<div class="headerrow"><div class="col smallheadertext" id="title"></div></div>\
<div class="datarow"><div class="col" id="msg"></div></div>\
<div class="datarow actionbtnrow"><div class="actionbtn" id="ok"></div><div class="actionbtn" id="cancel"></div></div>\
</div>\
</div>',
    openAlert: function (title, msg, lang, isconfirm, onOK, onCancel, $refobj, _usebigbox) {
        // Sanity flow when there is already an alert dialog opened...
        if (this.$alertdialog !== undefined) {
            // Close the last one regardlessly
            this.$alertdialog.remove();
            this.$alertdialog = undefined;
            this.$alertdialogcurtain.remove();
            this.$alertdialogcurtain = undefined;
        }

        // Create a new one...
        var that = this;
        this.$alertdialog = $(this._ALERTDIALOG_HTML);
        if (_usebigbox) this.$alertdialog.addClass('bigbox');

        var rb = LabCI.WP.CommonRC.getRes('alertdialog', lang);
        var $ok = this.$alertdialog
            .find('#ok')
            .click(function () {
                if (onOK) onOK();
                that.$alertdialog.remove();
                that.$alertdialog = undefined;
                that.$alertdialogcurtain.remove();
                that.$alertdialogcurtain = undefined;
            })
            .html(rb.button.ok);
        var $cancel = this.$alertdialog.find('#cancel');
        if (isconfirm) {
            $cancel
                .click(function () {
                    if (onCancel) onCancel();
                    that.$alertdialog.remove();
                    that.$alertdialog = undefined;
                    that.$alertdialogcurtain.remove();
                    that.$alertdialogcurtain = undefined;
                })
                .html(rb.button.cancel);
        } else {
            $cancel.remove();
        }

        this.$alertdialog.find('#title').html(title ? title : isconfirm ? rb.title.confirm : rb.title.alert);
        this.$alertdialog.find('#msg').html(msg);

        // Open the TA selection/configuration popup menu
        var $body = $('body');
        var $window = $(window);
        this.$alertdialogcurtain = $('<div/>').attr('id', 'lscbw-alertdialogcurtain').appendTo($body).show();
        this.$alertdialog.appendTo($body).show();

        var left, top;
        if ($refobj) {
            var pos = $refobj.offset();
            left = pos.left + ($refobj.width() - this.$alertdialog.outerWidth()) / 2;
            top = $body.scrollTop() + pos.top;
        } else {
            left = ($window.width() - this.$alertdialog.outerWidth()) / 2;
            top = $body.scrollTop() + ($window.height() - this.$alertdialog.outerHeight()) / 2;
        }
        this.$alertdialog.css({ left: left + 'px', top: top + 'px' });
    },

    INTEGRATION_EXCHANGE_MAPPING: {
        HKG: 'HKG',
        SHH: 'SHH',
        SHZ: 'SHZ',
        TAI: 'TAI',
        TWO: 'TAI',
        /*    'NYQ': 'NYSE',
        'PCQ': 'NYSE',
        'ASQ': 'AMEX',
        'NMQ': 'NASDAQ',
        'NAQ': 'NASDAQ',
        'NSQ': 'NASDAQ',
        'PNK': 'PINK',
        'OTC': 'PINK',
        'OBB': 'OBB' 
        */
        NXB: 'NASDAQ',
        NBA: 'NASDAQ',
        NBN: 'NASDAQ',
    },
    buysellIntegration: function (code, exch, price, bs) {
        var exchange = this.INTEGRATION_EXCHANGE_MAPPING[exch];
        if (exchange == null || exchange == undefined) {
            return;
        }
        var p = '';
        try {
            if (price != null && price != undefined) {
                p = price.replace(',', '');
                p = parseFloat(p);
                if (isNaN(p)) {
                    p = '';
                }
            }
        } catch (e) {
            p = '';
        }

        console.log('buysellIntegration: ' + code + ' ' + exchange + ' ' + p + ' ' + bs);
        var subBrokerage = window.parent.subBrokerage;
        if (subBrokerage && subBrokerage.goOrderDialog && typeof subBrokerage.goOrderDialog.open === 'function') {
            var opt = {
                //    type: "H", //require, Predefined values are "TW equity", "subBrokerage equity", and "futuresOptions"
                //    type: "stock", //require, Predefined values are "stock", "recommissioned", and "futuresOptions"
                code: code, //require, stock code
                bs: bs, //bollean default true, true=buy,false=sell
                exchange: exchange, //if type = recommissioned,it is require
            };

            if (exchange === 'TAI' || exchange === 'TWO') {
                // situation when user select TW stock
                opt.type = 'S';
            } else {
                opt.type = 'H';
            }

            if (p !== '') {
                opt.price = p;
            }
            subBrokerage.goOrderDialog.open(opt);
        }
    },
    addFavourIntegration: function (code, exch) {
        var exchange = this.INTEGRATION_EXCHANGE_MAPPING[exch];
        if (exchange == null || exchange == undefined) {
            return;
        }
        console.log('addFavourIntegration: ' + code + ' ' + exchange);
        var subBrokerage = window.parent.subBrokerage;
        if (subBrokerage && subBrokerage.selfStockDialog && typeof subBrokerage.selfStockDialog.open === 'function') {
            var parameterObj = {
                symbol: code,
                exchange: exchange,
            };
            subBrokerage.selfStockDialog.open(parameterObj);
        }
    },
    /*    openQuotePage: function(ric, token){
        window.open("quote.html?token="+token+"&ric="+ric, "_blank");
    },
*/
    openQuotePage: function (symbol, exchange) {
        console.log(symbol + ' ' + exchange);
        window.open(
            parent.Utility.subPath + 'TradingCenter_TWStocks_SubBrokerage?tab=2&symbol=' + symbol + '&exch=' + exchange,
        );

        //    window.open(Utility.subPath +"TradingCenter_TWStocks_SubBrokerage?tab=2&symbol="+symbol+"&exch="+exchange);
    },
    getResponsiveBreakpoint: function () {
        var envs = { xs: 'd-none', sm: 'd-sm-none', md: 'd-md-none', lg: 'd-lg-none', xl: 'd-xl-none' };
        var env = '';

        var $el = $('<div>');
        $el.appendTo($('body'));

        for (var i = Object.keys(envs).length - 1; i >= 0; i--) {
            env = Object.keys(envs)[i];
            $el.addClass(envs[env]);
            if ($el.is(':hidden')) {
                break; // env detected
            }
        }
        $el.remove();
        return env;
    },
    getMobileOrDesktop: function () {
        var bp = this.getResponsiveBreakpoint();
        if (bp == null || bp == undefined) {
            return null;
        }
        if (bp == 'xs' || bp == 'sm') {
            return 'MBOILE';
        }
        return 'DESKTOP';
    },

    /*
    // For HK,SH,SZ stocks...
    _SYM2RIC_PADZEROS_HK: [ null, "000", "00", "0", "", "" ],
    _SYM2RIC_PADZEROS_SZ: [ null, "00000", "0000", "000", "00", "0", "" ],
    symbol2ric: function(symbol) {
        // Format: 11.HK, 600601.SH, 1.SZ...
    //    var symarr = symbol.split(".");
    //    if (symarr.length===2) {
    //        return LabCI.WP.AppUtils.sym2ric(symarr[0], symarr[1]);
    //    }
    //    else {
    //        return null;
    //    }
    //TODO sinpoac FX, symbol to ric...
    return symbol;
    },
    sym2ric: function(sym, exch) {
        // Symbol must be a number and not -ve
        try {
            var s = parseInt(sym);
            if (!isNaN(s) && s > 0) {
                sym = ""+s;
                var l = sym.length;

                if (exch==="HK" && l <= 5) {
                    return LabCI.WP.AppUtils._SYM2RIC_PADZEROS_HK[l]+sym+".HK";
                }
                else if (exch==="SZ" && l <= 6) {
                    return LabCI.WP.AppUtils._SYM2RIC_PADZEROS_SZ[l]+sym+".SZ";
                }
                else if (exch==="SH" && l == 6) {
                    return sym+".SS";
                }
                else {
                    // Error: invalide sym format (?)
                    return null;
                }
            }
            else {
                // Error: -ve
                return null;
            }
        }
        catch (e) {
            // Error: not a number
            return null;
        }
    },

    ////////////////////////////////////////////////////////////////////////////

    _ALERTDIALOG_HTML: "\
<div id=\"lsinopac-alertdialog\" class=\"lsinopac\" style=\"display:none\">\
<div class=\"datatable\">\
<div class=\"headerrow\"><div class=\"col smallheadertext\" id=\"title\"></div></div>\
<div class=\"datarow\"><div class=\"col\" id=\"msg\"></div></div>\
<div class=\"datarow actionbtnrow\"><div class=\"actionbtn\" id=\"ok\"></div><div class=\"actionbtn\" id=\"cancel\"></div></div>\
</div>\
</div>",
    openAlert: function(title, msg, lang, isconfirm, onOK, onCancel, $refobj) {
        var that = this;
        
        // Create a new one...
        this.$alertdialog = $(this._ALERTDIALOG_HTML);
        
        var rb = LabCI.WP.CommonRC.getRes("alertdialog", lang);
        var $ok = this.$alertdialog.find("#ok").click(function() {
            if (onOK) onOK();
            that.$alertdialog.remove();
            that.$alertdialogcurtain.remove();
        })
        .html(rb.button.ok);
        var $cancel = this.$alertdialog.find("#cancel");
        if (isconfirm) {
            $cancel.click(function() {
                if (onCancel) onCancel();
                that.$alertdialog.remove();
                that.$alertdialogcurtain.remove();
            })
            .html(rb.button.cancel);
        }
        else {
            $cancel.remove();
        }
               
        this.$alertdialog.find("#title").html(title ? title : (isconfirm ? rb.title.confirm : rb.title.alert));        
        this.$alertdialog.find("#msg").html(msg);
        
        // Open the TA selection/configuration popup menu
        var $body = $("body");
        var $window = $(window);
        this.$alertdialogcurtain = $("<div/>").attr("id", "lsinopac-alertdialogcurtain").appendTo($body).show();
        this.$alertdialog.appendTo($body).show();
        
        var left, top;
        if ($refobj) {
            var pos = $refobj.offset();
            left = pos.left + ($refobj.width() - this.$alertdialog.outerWidth()) / 2;
            top = $body.scrollTop() + pos.top;
        }
        else {
            left = ($window.width() - this.$alertdialog.outerWidth()) / 2;
            top = $body.scrollTop() + ($window.height() - this.$alertdialog.outerHeight()) / 2;
        }
        this.$alertdialog.css({ left: left+"px", top: top+"px" });
    },
 */
    ////////////////////////////////////////////////////////////////////////////
    // Initialize a common .tabbar | .tabbarV2 structure
    ////////////////////////////////////////////////////////////////////////////

    initactionbuttongroup: function ($obj, opts) {
        //        // Prep the opts
        //        var opts = {
        //            onchange: null
        //        };
        //        if (thisopts) opts = $.extend(opts, thisopts);

        $obj.find('.actionbutton').on(_CLICK_EVENT, function () {
            var $thistab = $(this);
            var tabid = $thistab.attr('tabid');
            var issametab;
            if ($thistab.hasClass('selected')) {
                issametab = true;
            } else {
                // Apply the effect now
                $thistab.addClass('selected').siblings().removeClass('selected');
            }

            // Notify the change...
            if (opts.onchange) opts.onchange(tabid, issametab);
        });
        return $obj;
    },

    inittabbox: function ($obj, opts) {
        //        // Prep the opts
        //        var opts = {
        //            onchange: null,
        //            onchangescrolltop: false
        //        };
        //        if (thisopts) opts = $.extend(opts, thisopts);

        var tabbox = {
            $this: null,
            $tabbar: null,
            $tabbodys: null,
            switchtab: function (tabid) {
                this.$tabbar.children("[tabid='" + tabid + "']").trigger(_CLICK_EVENT);
            },
        };

        tabbox.$this = $obj;
        tabbox.$tabbar = tabbox.$this.children('.tabbar,.tabbarV2');
        tabbox.$tabbodys = tabbox.$this.find('.tabbody');
        LabCI.WP.AppUtils.initactionbuttongroup(tabbox.$tabbar, {
            onchange: function (tabid, issametab) {
                if (LabCI.resetIdleTimeoutCountdown) LabCI.resetIdleTimeoutCountdown(); // WTFX-533 Reset idle timemout

                // Switch the tabbody too
                if (!issametab && opts.onchangescrolltop) $(window).scrollTop(0); // back to top, if a different tab, and want to auto-scroll top
                tabbox.$tabbodys
                    .filter("[tabid='" + tabid + "']")
                    .show()
                    .siblings()
                    .hide();

                // Notify the change...
                if (opts.onchange) opts.onchange.call(tabbox.$this, tabid, issametab);
            },
        });
        return tabbox;
    },
    ////////////////////////////////////////////////////////////////////////////
    // Show/Hide Curtain
    ////////////////////////////////////////////////////////////////////////////
    initHelpBubble: function ($hb, msg) {
        $hb.hover(
            // Hover in
            function (e) {
                var id = $(this).attr('helpmsgid');
                var msg = LabCI.WP.CommonRC.getMsg('helpmsg.' + id, LabCI.getLang());

                // Create the popup, if not yet...
                if (!LabCI.WP.AppUtils.$helpbubblepopup) {
                    LabCI.WP.AppUtils.$helpbubblepopup = $("<div id='lscbw-helpbubblepopup'/>").html(msg);
                }

                // Position it nicely ;)
                var x = e.pageX,
                    y = e.pageY;
                var $pageobj = $hb.parents('.lscbw');

                var $p = LabCI.WP.AppUtils.$helpbubblepopup;
                $p.appendTo($pageobj).show();

                var w = $p.outerWidth();
                var h = $p.outerHeight();
                var maxx = $pageobj.outerWidth();
                var maxy = $pageobj.offset().top + $pageobj.outerHeight();
                var offsetpos = $pageobj.offset(); // relative to the $pageobj
                x -= offsetpos.left;
                y -= offsetpos.top;
                if (x + w < maxx) {
                    // Within the width, do it a normal left-align
                    $p.css({ left: x + 1 + 'px' });
                } else {
                    // Popping outside the width, do it a reverse right-align
                    x -= w;
                    $p.css({ left: x - 1 + 'px' });
                }
                if (y + h < maxy) {
                    // Within the height, do it a normal from top
                    $p.css({ top: y + 1 + 'px' });
                } else {
                    // Popping outside the height, do it a reverse from bottom
                    y -= h;
                    $p.css({ top: y - 1 + 'px' });
                }

                // Tune the box height
                $p.css({ height: $p.children('.helptext').height() + 33 + 'px' });
            },
            // Hover out
            function (e) {
                // Kill the popup...
                if (LabCI.WP.AppUtils.$helpbubblepopup) {
                    LabCI.WP.AppUtils.$helpbubblepopup.detach();
                }
                LabCI.WP.AppUtils.$helpbubblepopup = null;
            },
        );
    },

    initTRdclm: function ($pageobj, lang) {
        var $trdclm = $("<a href='#' class='textlink'>" + LabCI.WP.CommonRC.getMsg('trdclm', lang) + '</a>').click(
            function () {
                LabCI.WP.AppUtils.openTRdclm(lang);
                return false;
            },
        );
        $pageobj.find('.trdclm').html($trdclm);
    },
    $curtain: null,
    showcurtain: function ($refobj, opts) {
        //        // Prep the opts
        //        var opts = {
        //            onchange: null,
        //            showloadingindicator: false
        //        };
        //        if (thisopts) opts = $.extend(opts, thisopts);

        // Hide the existing one, if any
        if (this.$curtain) this.hidecurtain();

        // Make a new curtain here
        this.$curtain = $("<div id='lsinopac-curtain'/>");
        $refobj.append(this.$curtain);

        if (opts) {
            if (opts.oncancel) {
                // Click anywhere to close the curtain?
                var that = this;
                this.$curtain.on(_CLICK_EVENT, function () {
                    that.hidecurtain();
                    opts.oncancel(); // callback here
                });
            }
            if (opts.showloadingindicator) {
                // Add the loading indicator...
                // @TODO...
            }
        }
    },
    hidecurtain: function () {
        if (this.$curtain) {
            this.$curtain.remove();
            this.$curtain = null;
        }
    },
};
