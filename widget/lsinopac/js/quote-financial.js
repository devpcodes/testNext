(function ($) {
    //################################################################################
    //################################################################################
    // The LabCI object for Generic Widget Package
    // LabCI = { WP: { ... } }

    if (typeof LabCI === 'undefined') LabCI = { WP: {} };
    else if (typeof LabCI.WP === 'undefined') LabCI.WP = {};

    //################################################################################

    // Create a new PSPageObj ...
    LabCI.WP.createquotefinancialpageobj = function (id) {
        var pobj = LabCI.AbstractPageObj.extend(id ? id : 'lsinopac-quote-financial', LabCI.WP.FinancialPageObj);
        return pobj;
    };

    // The PSPageObj class
    // The main object definition is here...
    LabCI.WP.FinancialPageObj = {
        financial: {
            $this: null,
        },
        currentquoteric: null,

        initImpl: function () {
            // Get ready
            var that = this;

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

            this._financial_loaddata();

            this.financial.$this = $('#lsinopac-quote-financial');

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
            return this; // chain this
        },

        resetImpl: function () {
            return this; // chain this
        },

        ////////////////////////////////////////////////////////////////////

        getStateDataImpl: function () {
            return {};
        },
        _financial_loaddata: function () {
            function parseDBFormat(src) {
                if (src) {
                    src = parseFloat(src).toFixed(2);
                    src = src.toString();
                    var pattern = /(-?\d+)(\d{3})/;
                    while (pattern.test(src)) src = src.replace(pattern, '$1,$2');
                    result = src;
                } else {
                    result = '-';
                }
                return result;
            }

            var that = this;

            this.$pageobj.loaddata(
                'financialdata',
                '/data/getfinancial',
                {
                    ric: this.currentquoteric,
                    pid: 'financial',
                    lang: this.lang,
                    token: encodeURIComponent(LabCI.getToken()),
                },
                function (result) {
                    datalist = result.data.datalist;
                    $.each(datalist.bal_sheet, function (k, v) {
                        y = '.y' + (k + 1);
                        tmp_date = new Date(v.period_end_date);
                        that.$pageobj
                            .find('.headerrow')
                            .find(y)
                            .html(
                                LabCI.WP.CommonRC.getRes('month', that.lang)[tmp_date.getMonth()] +
                                    ', ' +
                                    tmp_date.getFullYear().toString(),
                            );
                        that.$pageobj.find('.SCSI').find(y).html(parseDBFormat(v.SCSI));
                        that.$pageobj.find('.ATRC').find(y).html(parseDBFormat(v.ATRC));
                        that.$pageobj.find('.AITL').find(y).html(parseDBFormat(v.AITL));
                        that.$pageobj.find('.SOCA').find(y).html(parseDBFormat(v.SOCA));
                        that.$pageobj.find('.ATCA').find(y).html(parseDBFormat(v.ATCA));
                        that.$pageobj.find('.ACDB').find(y).html(parseDBFormat(v.ACDB));
                        that.$pageobj.find('.ASEC').find(y).html(parseDBFormat(v.ASEC));
                        that.$pageobj.find('.SOEA').find(y).html(parseDBFormat(v.SOEA));
                        that.$pageobj.find('.ANTL').find(y).html(parseDBFormat(v.ANTL));
                        that.$pageobj.find('.APPN').find(y).html(parseDBFormat(v.APPN));
                        that.$pageobj.find('.AINT').find(y).html(parseDBFormat(v.AINT));
                        that.$pageobj.find('.SINV').find(y).html(parseDBFormat(v.SINV));
                        that.$pageobj.find('.SOLA').find(y).html(parseDBFormat(v.SOLA));
                        that.$pageobj.find('.SOAT').find(y).html(parseDBFormat(v.SOAT));
                        that.$pageobj.find('.ATOT').find(y).html(parseDBFormat(v.ATOT));
                        that.$pageobj.find('.LTCL').find(y).html(parseDBFormat(v.LTCL));
                        that.$pageobj.find('.LTTD').find(y).html(parseDBFormat(v.LTTD));
                        that.$pageobj.find('.SLTL').find(y).html(parseDBFormat(v.SLTL));
                        that.$pageobj.find('.LMIN').find(y).html(parseDBFormat(v.LMIN));
                        that.$pageobj.find('.LTLL').find(y).html(parseDBFormat(v.LTLL));
                        that.$pageobj.find('.SRPR').find(y).html(parseDBFormat(v.SRPR));
                        that.$pageobj.find('.SPRS').find(y).html(parseDBFormat(v.SPRS));
                        that.$pageobj.find('.SCMS').find(y).html(parseDBFormat(v.SCMS));
                        that.$pageobj.find('.SOTE').find(y).html(parseDBFormat(v.SOTE));
                        that.$pageobj.find('.QTLE').find(y).html(parseDBFormat(v.QTLE));
                        that.$pageobj.find('.QTLL').find(y).html(parseDBFormat(v.QTLL));
                        that.$pageobj.find('.QTCO').find(y).html(parseDBFormat(v.QTCO));
                        that.$pageobj.find('.QTPO').find(y).html(parseDBFormat(v.QTPO));
                    });

                    $.each(datalist.income_stat, function (k, v) {
                        y = '.y' + (k + 1);
                        that.$pageobj.find('.RTLR').find(y).html(parseDBFormat(v.RTLR));
                        that.$pageobj.find('.SSGA').find(y).html(parseDBFormat(v.SSGA));
                        that.$pageobj.find('.SDPR').find(y).html(parseDBFormat(v.SDPR));
                        that.$pageobj.find('.ETOE').find(y).html(parseDBFormat(v.ETOE));
                        that.$pageobj.find('.SOPI').find(y).html(parseDBFormat(v.SOPI));
                        that.$pageobj.find('.SNII').find(y).html(parseDBFormat(v.SNII));
                        that.$pageobj.find('.SNIE').find(y).html(parseDBFormat(v.SNIE));
                        that.$pageobj.find('.ENII').find(y).html(parseDBFormat(v.ENII));
                        that.$pageobj.find('.SBTR').find(y).html(parseDBFormat(v.SBTR));
                        that.$pageobj.find('.EIBT').find(y).html(parseDBFormat(v.EIBT));
                        that.$pageobj.find('.NINC').find(y).html(parseDBFormat(v.NINC));
                        that.$pageobj.find('.SBBF').find(y).html(parseDBFormat(v.SBBF));
                        that.$pageobj.find('.SBAI').find(y).html(parseDBFormat(v.SBAI));
                    });

                    $.each(datalist.cashflow, function (k, v) {
                        y = '.y' + (k + 1);
                        that.$pageobj.find('.OTLO').find(y).html(parseDBFormat(v.OTLO));
                        that.$pageobj.find('.ITLI').find(y).html(parseDBFormat(v.ITLI));
                        that.$pageobj.find('.FTLF').find(y).html(parseDBFormat(v.FTLF));
                        that.$pageobj.find('.SDED').find(y).html(parseDBFormat(v.SDED));
                        that.$pageobj.find('.SAMT').find(y).html(parseDBFormat(v.SAMT));
                        that.$pageobj.find('.SNCI').find(y).html(parseDBFormat(v.SNCI));
                        that.$pageobj.find('.SOCF').find(y).html(parseDBFormat(v.SOCF));
                        that.$pageobj.find('.SCEX').find(y).html(parseDBFormat(v.SCEX));
                        that.$pageobj.find('.FCDP').find(y).html(parseDBFormat(v.FCDP));
                        that.$pageobj.find('.SNCC').find(y).html(parseDBFormat(v.SNCC));
                        that.$pageobj.find('.SNCB').find(y).html(parseDBFormat(v.SNCB));
                        that.$pageobj.find('.SNCE').find(y).html(parseDBFormat(v.SNCE));
                    });
                },
                0,
                {
                    datatype: 'jsonp',
                },
            );
        },
        ////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////

        // Build up the UI on-the-fly for different languages
        _setUILabels: function () {
            var that = this;

            rb = that.pageobj_rb.bal_sheet;
            dt = that.$pageobj.find('.datatable.bal_sheet');
            dt.find('.headerrow .title').html(rb.title);
            $.each(rb, function (id, value) {
                dt.find('.' + id + ' .title').html(value);
            });

            rb = that.pageobj_rb.income_stat;
            dt = that.$pageobj.find('.datatable.income_stat');
            dt.find('.headerrow .title').html(rb.title);
            $.each(rb, function (id, value) {
                dt.find('.' + id + ' .title').html(value);
            });

            rb = that.pageobj_rb.cashflow;
            dt = that.$pageobj.find('.datatable.cashflow');
            dt.find('.headerrow .title').html(rb.title);
            $.each(rb, function (id, value) {
                dt.find('.' + id + ' .title').html(value);
            });
        },

        ////////////////////////////////////////////////////////////////////

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {},
        },
    };
})(jQuery);
