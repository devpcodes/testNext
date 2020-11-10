(function ($) {
    //################################################################################
    //################################################################################
    // The LabCI object for Generic Widget Package
    // LabCI = { WP: { ... } }

    if (typeof LabCI === 'undefined') LabCI = { WP: {} };
    else if (typeof LabCI.WP === 'undefined') LabCI.WP = {};

    /*    var ranking = {
     "TWN": ["NG", "NL", "PG", "PL", "AV", "AM"],
     "TWN_WNT": ["NG", "NL", "PG", "PL", "AV", "AM"],
     "HKG": ["NG", "NL", "PG", "PL", "AV", "AM"],
     "HKG_MAIN": ["NG", "NL", "PG", "PL", "AV", "AM"],
     "HKG_GEN": ["NG", "NL", "PG", "PL", "AV", "AM"],
     "SHH": ["NG", "NL", "PG", "PL", "AV", "AM"],
     "SHZ": ["NG", "NL", "PG", "PL", "AV", "AM"],
     "NYSE": ["NG", "NL", "PG", "PL", "AV"],
     "NYSE_AMER": ["NG", "NL", "PG", "PL", "AV"],
     "NYSE_ARCA": ["NG", "NL", "PG", "PL", "AV"],
     "NASDAQ": ["NG", "NL", "PG", "PL", "AV"]
     };
     */
    //################################################################################

    // Create a new IndexPageObj ...
    LabCI.WP.createrankingpageobj = function () {
        var pobj = LabCI.AbstractPageObj.extend('lsinopac-ranking', LabCI.WP.RankingPageObj);
        return pobj;
    };

    LabCI.WP.RankingPageObj = {
        $resultMobile: null,
        $resultDesktop: null,
        current_mkt: 'TWN',
        current_rank: 'AM',
        initImpl: function () {
            // Get ready
            var that = this;

            this.$resultMobile = this.$pageobj.find('.result-mobile');
            this.$resultDesktop = this.$pageobj.find('.result-desktop');

            this.$pageobj.find('.ranking-item').click(function () {
                that.current_mkt = $(this).attr('mkt');
                that.current_rank = $(this).attr('rank');
                $('#rankingModel').modal('hide');
                that._loaddata();
            });
            this.$pageobj.find('.ranking-box').click(function () {
                that.current_mkt = $(this).attr('mkt');
                that.current_rank = $(this).attr('rank');
                that._loaddata();
            });

            this.$pageobj.find('.refreshBtn').click(function () {
                that._loaddata();
            });

            /*        this.$mswiper = new Swiper(".swiper-container", {
             direction: 'vertical',
             slidesPerView: 'auto',
             //    autoHeight: true,
             freeMode: true,
             mousewheel: true
             });
             */

            return this;
        },

        showImpl: function (statedata) {
            var that = this;

            if (statedata) {
                if (statedata.mkt) {
                    this.current_mkt = statedata.mkt;
                }
                if (statedata.rank) {
                    this.current_rank = statedata.rank;
                }
            }

            that._loaddata();

            return this;
        },
        _loaddata: function () {
            // Get ready
            var that = this;

            this.$resultMobile.find('li').remove();
            this.$resultDesktop.find('.ranking-table-item').remove();
            var text = this.pageobj_rb.lbl['ranking-title']
                .replace('%rank%', this.pageobj_rb.lbl[this.current_rank])
                .replace('%mkt%', this.pageobj_rb.lbl[this.current_mkt]);

            if (that.$resultDesktop.is(':visible')) {
                text = text.replace('<br/>', ' ');
            }

            this.$pageobj.find('.ranking-title-word').html(text);

            this.$pageobj.loaddata(
                'ranking',
                '/data/ranking',
                {
                    mkt: this.current_mkt,
                    rank: this.current_rank,
                    lang: this.lang,
                    token: encodeURIComponent(LabCI.getToken()),
                },
                function (result) {
                    if (result && result.data && result.data.responseCode !== 'F') {
                        if (result.data.stocklist && result.data.stocklist.length > 0) {
                            that.$pageobj.find('.result-no-count').hide();
                            $.each(result.data.stocklist, function (index, ricdata) {
                                // For this RIC...
                                var ric = ricdata.ric;
                                var updownclass = getUpDownClass(ricdata.nc);
                                if (ricdata.td == '') {
                                    ricdata.td = ricdata.tm;
                                    ricdata.tm = '';
                                }

                                if (that.$resultMobile.is(':visible')) {
                                    var li =
                                        '<li class="list-group-item p-0" style="cursor:pointer" ric="' +
                                        ric +
                                        '" symbol="' +
                                        ricdata.symbol +
                                        '" exchange="' +
                                        LabCI.WP.AppUtils.INTEGRATION_EXCHANGE_MAPPING[ricdata.exchsect] +
                                        '"><div class="row">' +
                                        '<div class="col-10 stock-date"><div class="row"><div class="col-8 name pr-0">' +
                                        ricdata.nm +
                                        ' (' +
                                        ricdata.symbol +
                                        ')</div><div class="col-4 text-right price pl-0 pr-0">' +
                                        ricdata.ls +
                                        '</div></div>' +
                                        '<div class="row"><div class="col-4 lblchange pr-0">' +
                                        that.pageobj_rb.lbl['change'] +
                                        '</div><div class="col-8 downval text-right change pl-0 pr-0 ' +
                                        updownclass +
                                        '">' +
                                        ricdata.nc +
                                        ' (' +
                                        ricdata.pc +
                                        '%)</div></div>' +
                                        '<div class="row"><div class="col-4 lblvolume pr-0">' +
                                        that.pageobj_rb.lbl['volume'] +
                                        '</div><div class="col-8 text-right volume pl-0 pr-0">' +
                                        ricdata.vo +
                                        LabCI.WP.CommonRC.unitscale2name(ricdata.vounit, that.lang) +
                                        '</div></div>' +
                                        '<div class="row turnoverrow"><div class="col lblturnover pr-0">' +
                                        that.pageobj_rb.lbl['turnover'] +
                                        '</div><div class="col text-right turnover pl-0 pr-0">' +
                                        ricdata.am +
                                        LabCI.WP.CommonRC.unitscale2name(ricdata.amunit, that.lang) +
                                        '</div></div>' +
                                        '</div><div class="col-2 text-right add-watchlist"><div class="row">' +
                                        '<div class="col"><button type="button" class="btn btn-add">' +
                                        that.pageobj_rb.lbl['add'] +
                                        '</button></div>' +
                                        '<div class="col"><button type="button" class="btn buybutton2">' +
                                        that.pageobj_rb.lbl['buy'] +
                                        '</button></div>' +
                                        '</div></div></div></li>';

                                    var addedRowObj = $(li);

                                    $(addedRowObj)
                                        .find('.btn-add')
                                        .on(_CLICK_EVENT, function (e) {
                                            LabCI.WP.AppUtils.addFavourIntegration(ricdata.symbol, ricdata.exchsect);
                                            e.stopPropagation();
                                        });
                                    $(addedRowObj)
                                        .find('.buybutton2')
                                        .on(_CLICK_EVENT, function (e) {
                                            LabCI.WP.AppUtils.buysellIntegration(
                                                ricdata.symbol,
                                                ricdata.exchsect,
                                                ricdata.ls,
                                                'B',
                                            );
                                            e.stopPropagation();
                                        });
                                    $(addedRowObj)
                                        .find('.sellbutton')
                                        .on(_CLICK_EVENT, function (e) {
                                            LabCI.WP.AppUtils.buysellIntegration(
                                                ricdata.symbol,
                                                ricdata.exchsect,
                                                ricdata.ls,
                                                'S',
                                            );
                                            e.stopPropagation();
                                        });

                                    that.$resultMobile.find('ul').append(addedRowObj);

                                    $(addedRowObj).on(_CLICK_EVENT, function () {
                                        var that2 = this;
                                        LabCI.WP.AppUtils.openQuotePage(
                                            $(that2).attr('symbol'),
                                            $(that2).attr('exchange'),
                                        );
                                    });

                                    //remove turnover for US
                                    if (
                                        that.current_mkt == 'NYSE' ||
                                        that.current_mkt == 'NYSE_AMER' ||
                                        that.current_mkt == 'NYSE_ARCA' ||
                                        that.current_mkt == 'NASDAQ'
                                    ) {
                                        that.$resultMobile.find('.turnoverrow').hide();
                                    } else {
                                        that.$resultMobile.find('.turnoverrow').show();
                                    }
                                }

                                if (that.$resultDesktop.is(':visible')) {
                                    var tr =
                                        '<tr class="ranking-table-item" style="cursor:pointer" ric="' +
                                        ric +
                                        '" symbol="' +
                                        ricdata.symbol +
                                        '" exchange="' +
                                        LabCI.WP.AppUtils.INTEGRATION_EXCHANGE_MAPPING[ricdata.exchsect] +
                                        '"><td class="code" style="line-height: 35px" ric="' +
                                        ric +
                                        '">' +
                                        ricdata.symbol +
                                        '</td>' +
                                        '<td class="name" style="line-height: 35px" ric="' +
                                        ric +
                                        '">' +
                                        ricdata.nm +
                                        '</td>' +
                                        //    '<td><button type="button" class="btn buybutton">'+that.pageobj_rb.lbl["buy"]+'</button><button type="button" class="btn sellbutton">'+that.pageobj_rb.lbl["sell"]+'</button></td>'+
                                        '<td class="ccy" style="line-height: 35px">' +
                                        ricdata.ccy +
                                        '</td>' +
                                        '<td class="last text-right" style="line-height: 35px">' +
                                        ricdata.ls +
                                        '</td>' +
                                        '<td class="change text-right ' +
                                        updownclass +
                                        '" style="line-height: 35px">' +
                                        ricdata.nc +
                                        '</td>' +
                                        '<td class="pctchange text-right ' +
                                        updownclass +
                                        '" style="line-height: 35px">' +
                                        ricdata.pc +
                                        '</td>' +
                                        '<td class="volume text-right" style="line-height: 35px">' +
                                        ricdata.vo +
                                        LabCI.WP.CommonRC.unitscale2name(ricdata.vounit, that.lang) +
                                        '</td>' +
                                        '<td class="turnover text-right" style="line-height: 35px">' +
                                        ricdata.am +
                                        LabCI.WP.CommonRC.unitscale2name(ricdata.amunit, that.lang) +
                                        '</td>' +
                                        '<td class="addwatchlist text-center"><button type="button" class="btn btn-add">' +
                                        that.pageobj_rb.lbl['add'] +
                                        '</button>' +
                                        '<button type="button" class="btn buybutton2">' +
                                        that.pageobj_rb.lbl['buy'] +
                                        '</button></td></tr>';

                                    var addedRowObj = $(tr);

                                    $(addedRowObj)
                                        .find('.btn-add')
                                        .on(_CLICK_EVENT, function (e) {
                                            LabCI.WP.AppUtils.addFavourIntegration(ricdata.symbol, ricdata.exchsect);
                                            e.stopPropagation();
                                        });
                                    $(addedRowObj)
                                        .find('.buybutton2')
                                        .on(_CLICK_EVENT, function (e) {
                                            LabCI.WP.AppUtils.buysellIntegration(
                                                ricdata.symbol,
                                                ricdata.exchsect,
                                                ricdata.ls,
                                                'B',
                                            );
                                            e.stopPropagation();
                                        });
                                    $(addedRowObj)
                                        .find('.sellbutton')
                                        .on(_CLICK_EVENT, function (e) {
                                            LabCI.WP.AppUtils.buysellIntegration(
                                                ricdata.symbol,
                                                ricdata.exchsect,
                                                ricdata.ls,
                                                'S',
                                            );
                                            e.stopPropagation();
                                        });

                                    that.$resultDesktop.find('table').append(addedRowObj);

                                    $(addedRowObj).on(_CLICK_EVENT, function () {
                                        var that2 = this;
                                        LabCI.WP.AppUtils.openQuotePage(
                                            $(that2).attr('symbol'),
                                            $(that2).attr('exchange'),
                                        );
                                    });

                                    //remove turnover for US
                                    if (
                                        that.current_mkt == 'NYSE' ||
                                        that.current_mkt == 'NYSE_AMER' ||
                                        that.current_mkt == 'NYSE_ARCA' ||
                                        that.current_mkt == 'NASDAQ'
                                    ) {
                                        that.$resultDesktop.find('.turnover').hide();
                                    } else {
                                        that.$resultDesktop.find('.turnover').show();
                                    }
                                }
                            });
                        } else {
                            that.$pageobj.find('.result-no-count').show();
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
                    datatype: 'jsonp',
                },
            );
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
            return statedata;
        },
        ////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////

        // Build up the UI on-the-fly for different languages
        _setUILabels: function () {
            var that = this;
            var rblbl = that.pageobj_rb.lbl;
            $.each(rblbl, function (id, value) {
                that.$pageobj.find('.lbl' + id).html(value);
            });
        },

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {},
        },
    };
})(jQuery);
