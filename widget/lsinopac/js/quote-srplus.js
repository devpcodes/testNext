(function ($) {
    //################################################################################
    //################################################################################
    // The LabCI object for Generic Widget Package
    // LabCI = { WP: { ... } }

    if (typeof LabCI === 'undefined') LabCI = { WP: {} };
    else if (typeof LabCI.WP === 'undefined') LabCI.WP = {};

    //################################################################################

    // Create a new PSPageObj ...
    LabCI.WP.createquotesrpluspageobj = function (id) {
        var pobj = LabCI.AbstractPageObj.extend(id ? id : 'lsinopac-quote-srplus', LabCI.WP.QuoteSRPlusPageObj);
        return pobj;
    };

    // The PSPageObj class
    // The main object definition is here...
    LabCI.WP.QuoteSRPlusPageObj = {
        currentquoteric: null,
        $avgscore: null,
        $scoretrendimage: null,
        $compscoreimage: null,
        $borkerrating: null,
        $companyscore: null,
        $peer: null,
        initImpl: function () {
            // Get ready
            var that = this;
            this.$avgscore = this.$pageobj.find('.avgscore-container');
            this.$scoretrendimage = this.$pageobj.find('.scoretrendimage');
            this.$compscoreimage = this.$pageobj.find('.scorespiderchartimg');
            this.$borkerrating = this.$pageobj.find('.broker-rating-container');
            this.$companyscore = this.$pageobj.find('.component-score-container');
            this.$peer = this.$pageobj.find('.peer-container');
            ////////////////////////////////////////////////////////////////////

            return this; // chain this
        },

        resize: null,
        resizeImpl: function () {
            var that = this;
            that.$scoretrendimage.empty();
            that._loadScoreTrendImage();
        },

        ////////////////////////////////////////////////////////////////////

        showImpl: function (statedata) {
            //        // Get ready

            var that = this;
            if (statedata)
                if (statedata.click && typeof statedata.click === 'function') {
                    this.click = statedata.click;
                }

            var ric = '.TWII';
            if (statedata.ric) {
                ric = statedata.ric;
                this.currentquoteric = ric;
            }
            this._loadData();

            return this; // chain this
        },
        _loadData: function () {
            var that = this;
            var ric = this.currentquoteric;

            this.$avgscore.find('.avgscore-outlook').html('-');
            this.$avgscore.find('.avgscore-outlookmsg').html('-');
            this.$avgscore.find('.avgscorebadge').empty();
            this.$borkerrating.find('.brokerratingscore').html('-');
            this.$borkerrating.find('.ratingpointer').hide();
            this.$companyscore.find('.stock-earning').html('-');
            this.$companyscore.find('.sector-earning').html('-');
            this.$companyscore.find('.stock-fundamental').html('-');
            this.$companyscore.find('.sector-fundamental').html('-');
            this.$companyscore.find('.stock-valuation').html('-');
            this.$companyscore.find('.sector-valuation').html('-');
            this.$companyscore.find('.stock-risk').html('-');
            this.$companyscore.find('.sector-risk').html('-');
            this.$companyscore.find('.stock-momentum').html('-');
            this.$companyscore.find('.sector-momentum').html('-');
            this.$companyscore.find('.stock-overall').html('-');
            this.$companyscore.find('.sector-overall').html('-');
            this.$companyscore.find('.spiderchartStock').html('-');
            this.$companyscore.find('.spiderchartSector').html('-');
            this.$pageobj.find('.business-summary-desc').html('-');
            if (this.$peer.is(':visible')) {
                this.$peer.find('table .peer').remove();
                this.$peer.find('.sectorname').html('-');
                this.$peer.find('.sectorscore').html('-');
                this.$peer.find('.industryname').html('-');
                this.$peer.find('.industryscore').html('-');
                this.$peer.find('.mktcapname').html('-');
                this.$peer.find('.mktcapscore').html('-');
                this.$peer.find('.indexname').html('-');
                this.$peer.find('.indexscore').html('-');
            }
            this.$scoretrendimage.empty();
            this.$compscoreimage.empty();

            this.$pageobj.loaddata(
                'quotesrplusdata',
                '/data/srplus',
                {
                    ric: ric,
                    token: encodeURIComponent(LabCI.getToken()),
                    lang: this.lang,
                },
                function (result) {
                    that.$pageobj.find('.result-no').hide();
                    that.$pageobj.find('.srplusbody').hide();
                    if (result && result.data && result.data.responseCode !== 'F') {
                        that.$pageobj.find('.result-no').hide();
                        that.$pageobj.find('.srplusbody').show();
                        if (result.data) {
                            var avgScore = result.data.meta.s_avg;
                            if (avgScore == null) {
                                avgScore = 'NR';
                            }
                            var msg = that.pageobj_rb.lbl.srplusavgscoreoutlook['as' + avgScore].msg.replace(
                                '@TICKER@',
                                result.data.meta.ticker,
                            );

                            if (avgScore == '1') {
                                msg = msg.replace('@LOWCNT@', result.data.meta.LOWCNT);
                            } else if (avgScore == '10') {
                                msg = msg.replace('@HIGHCNT@', result.data.meta.HIGHCNT);
                            }

                            that.$avgscore
                                .find('.avgscore-outlook')
                                .html(that.pageobj_rb.lbl.srplusavgscoreoutlook['as' + avgScore].title);
                            that.$avgscore.find('.avgscore-outlookmsg').html(msg);

                            that.$avgscore.find('.avgscorebadge').append(
                                $('<img/>')
                                    .attr('width', '100')
                                    .attr('height', '135')
                                    .attr('src', '../images/score/' + that.lang + '/s' + avgScore + '.png'),
                            );

                            //    that.$scoretrendimage.append($("<img/>").attr("src", "data:image/png;base64," + result.data.scoretrendimage));
                            that._loadScoreTrendImage();

                            var rate = result.data.meta.br;
                            var rateid = LabCI.WP.CommonRC.brokerrating2id(rate);
                            that.$borkerrating
                                .find('.brokerratingscore')
                                .html(LabCI.WP.CommonRC.brokerrating2name(rate, that.lang))
                                .removeClass('r1 r2 r3 r4 r5')
                                .addClass('r' + rateid);

                            var $rp = that.$borkerrating.find('.ratingpointer');
                            if (rateid != 'NA') {
                                $rp.attr('rate', rate)
                                    .css('left', (rate - 1) * 23 + '%')
                                    .show();

                                // For rating at boundary, make a small offset to the right to fit it nicer ;)
                                rate = Number(rate);
                                if (rate === 1.5 || rate === 2.5 || rate === 3.5 || rate === 4.5)
                                    $rp.addClass('atedge');
                                else $rp.removeClass('atedge');
                            } else {
                                $rp.hide();
                            }

                            that.$companyscore.find('.stock-earning').setValue(result.data.meta.s_e, null, true);
                            that.$companyscore.find('.sector-earning').setValue(result.data.meta.c_e, null, true);
                            that.$companyscore.find('.stock-fundamental').setValue(result.data.meta.s_f, null, true);
                            that.$companyscore.find('.sector-fundamental').setValue(result.data.meta.c_f, null, true);
                            that.$companyscore.find('.stock-valuation').setValue(result.data.meta.s_v, null, true);
                            that.$companyscore.find('.sector-valuation').setValue(result.data.meta.c_v, null, true);
                            that.$companyscore.find('.stock-risk').setValue(result.data.meta.s_r, null, true);
                            that.$companyscore.find('.sector-risk').setValue(result.data.meta.c_r, null, true);
                            that.$companyscore.find('.stock-momentum').setValue(result.data.meta.s_m, null, true);
                            that.$companyscore.find('.sector-momentum').setValue(result.data.meta.c_m, null, true);
                            that.$companyscore.find('.stock-overall').setValue(result.data.meta.s_avg, null, true);
                            that.$companyscore.find('.sector-overall').setValue(result.data.meta.c_avg, null, true);

                            that._loadCompScoreImage();
                            that.$companyscore.find('.spiderchartStock').html(result.data.meta.ticker);
                            that.$companyscore.find('.spiderchartSector').html(result.data.meta.trbc_name);
                            that.$pageobj.find('.business-summary-desc').html(result.data.meta.bizdesc);

                            if (that.$peer.is(':visible')) {
                                //desktop...
                                that.$peer.find('.sectorname').html(result.data.meta.sector_name);
                                that.$peer.find('.sectorscore').html(result.data.meta.SECTOR_TSS_AVG);
                                that.$peer.find('.industryname').html(result.data.meta.trbc_name);
                                that.$peer.find('.industryscore').html(result.data.meta.INDUSTRY_TSS_AVG);
                                that.$peer
                                    .find('.mktcapname')
                                    .html(
                                        that.pageobj_rb.lbl.peerbox.srplusnamemap.mktcap[result.data.meta.MKTCAP_NAME],
                                    );
                                that.$peer.find('.mktcapscore').html(result.data.meta.MKTCAP_TSS_AVG);
                                that.$peer
                                    .find('.indexname')
                                    .html(that.pageobj_rb.lbl.peerbox.srplusnamemap.index[result.data.meta.INDEX_NAME]);
                                that.$peer.find('.indexscore').html(result.data.meta.INDEX_TSS_AVG);

                                if (result.data.peer) {
                                    for (var key in result.data.peer) {
                                        var addedRow = $(
                                            "<tr class='peer' style='cursor:pointer'; ric='" +
                                                result.data.peer[key].ric +
                                                "' symbol='" +
                                                result.data.peer[key].symbol +
                                                "' exchange='" +
                                                LabCI.WP.AppUtils.INTEGRATION_EXCHANGE_MAPPING[
                                                    result.data.peer[key].exchsect
                                                ] +
                                                "'><td>" +
                                                result.data.peer[key].nm +
                                                ' (' +
                                                result.data.peer[key].symbol +
                                                ')' +
                                                '</td>' +
                                                "<td style='text-align:center'>" +
                                                result.data.peer[key].AVG_SCORE_6M +
                                                '</td>' +
                                                "<td style='text-align:center'>" +
                                                result.data.peer[key].AVG_SCORE_3M +
                                                '</td>' +
                                                "<td style='text-align:center'>" +
                                                result.data.peer[key].AVG_SCORE_1M +
                                                '</td>' +
                                                "<td style='text-align:center'>" +
                                                result.data.peer[key].AVG_SCORE_1W +
                                                '</td>' +
                                                "<td style='text-align:center'>" +
                                                result.data.peer[key].AVG_SCORE +
                                                '</td>' +
                                                '</tr>',
                                        );

                                        that.$peer.find('table').append(addedRow);

                                        $(addedRow).on(_CLICK_EVENT, function () {
                                            var that2 = this;
                                            //    $("html, body").animate({scrollTop: 0}, 400, function () {
                                            //        window["lsinopac_quote"].changeRic($(that2).attr('ric'));
                                            //    });
                                            LabCI.WP.AppUtils.openQuotePage(
                                                $(that2).attr('symbol'),
                                                $(that2).attr('exchange'),
                                            );
                                        });
                                    }
                                }
                            }
                        }
                    } else {
                        that.$pageobj.find('.result-no').show();
                        that.$pageobj.find('.srplusbody').hide();
                        //Error handling...
                        //    that.$avgscore.find(".avgscore-outlook").html(that.pageobj_rb.lbl.srplusavgscoreoutlook["asNR"].title);
                        //    that.$avgscore.find(".avgscore-outlookmsg").html(that.pageobj_rb.lbl.srplusavgscoreoutlook["asNR"].msg);
                        //    that.$avgscore.find(".avgscorebadge").append($("<img/>").attr("width", "100").attr("height", "135").attr("src", "../images/score/" + that.lang + "/sNR.png"));
                        //    that._loadCompScoreImage();
                        //    that._loadScoreTrendImage();
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
        _loadScoreTrendImage: function () {
            var that = this;
            var ric = this.currentquoteric;

            this.$pageobj.loaddata(
                'srplus_scoretrendimage',
                '/data/srplus_scoretrendimage',
                {
                    ric: ric,
                    w: that.$scoretrendimage.width(),
                    h: that.$scoretrendimage.height(),
                    token: encodeURIComponent(LabCI.getToken()),
                    lang: this.lang,
                },
                function (result) {
                    if (result && result.data && result.data.responseCode !== 'F') {
                        if (result.data) {
                            that.$scoretrendimage.append(
                                $('<img/>').attr('src', 'data:image/png;base64,' + result.data.scoretrendimage),
                            );
                        }
                        var now = new Date();
                        that.$avgscore
                            .find('#x0')
                            .html(LabCI.WP.CommonRC.fmtDT(now, 'FORMATPATTERN_DATE_SHORTYM', that.lang));
                        that.$avgscore
                            .find('#x1')
                            .html(LabCI.WP.CommonRC.fmtDT(now.addYears(-1), 'FORMATPATTERN_DATE_SHORTYM', that.lang));
                        that.$avgscore
                            .find('#x2')
                            .html(LabCI.WP.CommonRC.fmtDT(now.addYears(-1), 'FORMATPATTERN_DATE_SHORTYM', that.lang));
                        that.$avgscore
                            .find('#x3')
                            .html(LabCI.WP.CommonRC.fmtDT(now.addYears(-1), 'FORMATPATTERN_DATE_SHORTYM', that.lang));
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
        _loadCompScoreImage: function () {
            var that = this;
            var ric = this.currentquoteric;

            this.$compscoreimage.parent().addClass(this.lang);

            this.$pageobj.loaddata(
                'srplus_compscoreimage',
                '/data/srplus_compscoreimage',
                {
                    ric: ric,
                    w: that.$compscoreimage.width(),
                    h: that.$compscoreimage.height(),
                    token: encodeURIComponent(LabCI.getToken()),
                    lang: this.lang,
                },
                function (result) {
                    if (result && result.data && result.data.responseCode !== 'F') {
                        if (result.data) {
                            that.$compscoreimage.append(
                                $('<img/>').attr('src', 'data:image/png;base64,' + result.data.loadCompScoreImage),
                            );
                        }
                        //     var now = new Date();
                        //     that.$avgscore.find("#x0").html(LabCI.WP.CommonRC.fmtDT(now, "FORMATPATTERN_DATE_SHORTYM", that.lang));
                        //     that.$avgscore.find("#x1").html(LabCI.WP.CommonRC.fmtDT(now.addYears(-1), "FORMATPATTERN_DATE_SHORTYM", that.lang));
                        //     that.$avgscore.find("#x2").html(LabCI.WP.CommonRC.fmtDT(now.addYears(-1), "FORMATPATTERN_DATE_SHORTYM", that.lang));
                        //     that.$avgscore.find("#x3").html(LabCI.WP.CommonRC.fmtDT(now.addYears(-1), "FORMATPATTERN_DATE_SHORTYM", that.lang));
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
                that.$pageobj.find('.lbl' + id).html(value);
            });
        },

        ////////////////////////////////////////////////////////////////////

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {
                def: {},
            },
        },
    };
})(jQuery);
