////////////////////////////////////////////////////////////////////////////////
// LabCI Sinopac Widget - ECI
//////////////////////////////////////////////////////////////////////////////////

(function ($) {
    //################################################################################
    //################################################################################
    // The LabCI object for Generic Widget Package
    // LabCI = { WP: { ... } }

    if (typeof LabCI === 'undefined') LabCI = { WP: {} };
    else if (typeof LabCI.WP === 'undefined') LabCI.WP = {};

    //################################################################################

    // Create a new SctHmPageObj ...
    LabCI.WP.createecipageobj = function () {
        var pobj = LabCI.AbstractPageObj.extend('lsinopac_eci', LabCI.WP.ECIPageObj);
        return pobj;
    };

    // The SctHmPageObj class
    // The main object definition is here...
    LabCI.WP.ECIPageObj = {
        ////////////////////////////////////////////////////////////////////
        // Some setting constants

        DEFAULT_RECPERPAGE: 10,

        ////////////////////////////////////////////////////////////////////
        $countryselect: {
            $this: null,
            $dropdown: null,
            $selected: null,
        },
        $dateselect: {
            $this: null,
            $dropdown: null,
            $selected: null,
        },
        $canvasBox: null,
        $ecilist: {
            $this: null,
            $dbox: null,
            $dtmpl: null,
        },
        curmkt: 'HKG',
        cursct: null, // when zoomed in, otherwise, null

        cursizetype: 'mc',
        curper: 'p1d',

        curpn: 1,

        $tachartbox: null,
        $chartbox: null,

        initImpl: function () {
            // Get ready
            var that = this;

            ////////////////////////////////////////////////////////////////////

            // Create the HTML...
            var $obj, $box;
            $box = this.$pageobj.find('#ecilist');
            this.$ecilist = {
                $this: $box,
                $dbox: $box.find('.resultbox'),
                $dtmpl: $box.find('.resultbox .rowtpl').detach(),
            };

            $countryselect = this.$pageobj.find(' #countrySelectGroup');
            this.$countryselect = {
                $this: $countryselect,
                $current: $countryselect.find('.currentvalue'),
                $dropdown: $countryselect.find('.dropdown-menu'),
            };

            $dateselect = this.$pageobj.find('#dateSelectGroup');
            this.$dateselect = {
                $this: $dateselect,
                $current: $dateselect.find('.currentvalue'),
                $dropdown: $dateselect.find('.dropdown-menu'),
            };

            this.$canvasBox = this.$pageobj.find('.tachartbox');

            this.initDateDropDown();
            this.initCountryDropDown();

            // Prepare the resize function
            // ... this has to be created here, because when resize() is called, the "this" will be in a different context
            // ... hence, use "that" in the function scope here to build this resize() function
            // ... a bad trick, but works ;)
            this.resize = function () {
                that.$pageobj.delaycall(
                    'resize',
                    function () {
                        that.resizeImpl();
                    },
                    100,
                );
            };

            ////////////////////////////////////////////////////////////////////

            return this; // chain this
        },

        ////////////////////////////////////////////////////////////////////
        initCountryDropDown: function () {
            var that = this;
            var rb, $o, lbl;
            ////////////////////////////////////////////////////////////////////////////////
            rb = this.pageobj_rb.country;
            this.$countryselect.$dropdown.append(
                ($button = $('<button/>')
                    .attr({ value: 'all', type: 'button' })
                    .addClass('dropdown-item')
                    .html(this.pageobj_rb.ecilist.all)),
            );

            for (key in rb) {
                $button = $('<button/>').attr({ value: key, type: 'button' }).addClass('dropdown-item').html(rb[key]);
                this.$countryselect.$dropdown.append($button);
            }

            this.$countryselect.$dropdown.find('.dropdown-item').on('click', function () {
                that.$countryselect.$current.html($(this).html()).attr('value', $(this).attr('value'));
                that._loaddata();
            });

            this.$countryselect.$dropdown.find("[value='Taiwan']").click();
        },
        initDateDropDown: function () {
            var that = this;
            var rb, $o, lbl;

            rb = LabCI.WP.CommonRC.getRes('month', this.lang);
            c_date = new Date();
            this.$dateselect.$dropdown.append(
                ($button = $('<button/>')
                    .attr({ value: 'all', type: 'button' })
                    .addClass('dropdown-item')
                    .html(this.pageobj_rb.ecilist.all)),
            );
            c_date.addMonths(-4);

            for (var i = 0; i < 4; i++) {
                date = c_date.addMonths(1);
                m = date.getMonth() + 1;
                if (m < 9) val = '0' + m + '-' + date.getFullYear();
                else val = m + '-' + date.getFullYear();

                if (this.lang == 'zh_TW' || this.lang == 'zh_CN' || this.lang == 'zh_HK') {
                    date_s = date.getFullYear().toString().split('');
                    html = '';
                    for (var j = 0; j < 4; j++) {
                        html += LabCI.WP.CommonRC.getRes('number', this.lang)[date_s[j]];
                    }
                    html += LabCI.WP.CommonRC.getRes('year', this.lang);
                    html += rb[date.getMonth()];
                } else {
                    html = rb[date.getMonth()] + ', ' + date.getFullYear().toString();
                }

                this.$dateselect.$dropdown.append(
                    ($button = $('<button/>')
                        .attr({ value: val, type: 'button' })
                        .addClass('dropdown-item')
                        .html(html)),
                );
            }

            this.$dateselect.$dropdown.find('.dropdown-item').on('click', function () {
                that.$dateselect.$current.html($(this).html()).attr('value', $(this).attr('value'));
                that._loaddata();
            });

            this.$dateselect.$dropdown.find('button')[0].click();
        },
        resize: null,
        resizeImpl: function () {},

        ////////////////////////////////////////////////////////////////////

        showImpl: function (statedata) {
            //        // Get ready
            //        var that = this;

            // Trigger a resize to catch the current dimension
            $(window).resize(this.resize);
            this.resizeImpl();
            this._loaddata();
            // Clear all fields
            this._clearitemlist();

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
            this._loadheatmapdata();
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
        _setloadingheatmap: function () {},

        _clearitemlist: function () {
            var e = LabCI.WP.CommonRC.getMsg('empty', this.lang);
        },
        _setloadingitemlist: function () {
            this._clearitemlist();
        },

        ////////////////////////////////////////////////////////////////////

        curdata: {
            lastupdate: null,
        },

        _cleardata: function () {
            this.$ecilist.$dbox.find('.datarow').remove();
        },
        _loaddata: function () {
            // Get ready
            this._cleardata();
            var that = this;
            this.$pageobj.loaddata(
                'eci',
                '/data/eci',
                {
                    pid: 'eci',
                    lang: this.lang,
                    token: encodeURIComponent(LabCI.getToken('eci')),
                    country: that.$countryselect.$current.attr('value'),
                    date: that.$dateselect.$current.attr('value'),
                },
                function (result) {
                    ecilist = result.data.resultdata.ecilist;
                    $.each(ecilist, function (i, r) {
                        var $row = that.$ecilist.$dtmpl.clone();

                        tmp_date = new Date(r.announce_time_start);
                        if (!r.date && isNaN(tmp_date.getTime())) tmp_date = new Date(r.date.replace(/-/g, '/'));

                        flag = r.country.toLowerCase().replace(' ', '_');
                        $row.attr('data-ric', r.ric);
                        $row.find('.data.date').html(
                            tmp_date.getDate() +
                                ' ' +
                                LabCI.WP.CommonRC.getRes('month', that.lang)[tmp_date.getMonth()],
                        );
                        $row.find('.data.flag').addClass(flag);
                        $row.find('.data.idx').html(r.idx);
                        $row.find('.data.period').html(r.period);
                        $row.find('.data.actual').addClass(LabCI.Utils.getUpDownClass(r.actual)).html(r.actual);
                        $row.find('.data.consensus_est')
                            .addClass(LabCI.Utils.getUpDownClass(r.reuters_survey))
                            .html(r.reuters_survey);
                        $row.on('click', function () {
                            $('#chartCanvasMobile').remove();
                            $chart_m = $('<img/>')
                                .attr({
                                    id: 'chartCanvasMobile',
                                    src:
                                        APP_CONFIG.DataAPIPath +
                                        '/lsinopac/ui/genchart.jsp?sizeid=C20&sym=' +
                                        r.ric +
                                        '&style=1&int=6&per=15',
                                })
                                .addClass('m_o');
                            $(this).append($chart_m);
                            $(this).show();

                            $('#chartCanvas').remove();
                            $chart = $('<img/>')
                                .attr({
                                    id: 'chartCanvas',
                                    src:
                                        APP_CONFIG.DataAPIPath +
                                        '/lsinopac/ui/genchart.jsp?sizeid=C20&sym=' +
                                        r.ric +
                                        '&style=1&int=6&per=15',
                                })
                                .addClass('d_o');
                            that.$canvasBox.append($chart);
                        });

                        that.$ecilist.$dbox.append($row.removeClass('rowtpl'));
                    });
                    $(that.$ecilist.$dbox.find('.datarow')[0]).click();
                },
                0,
                {
                    datatype: 'jsonp',
                },
            );

            return this; // chain this
        },

        ////////////////////////////////////////////////////////////////////

        // Build up the UI on-the-fly for different languages
        _setUILabels: function () {
            var that = this;
            var rb, $o, lbl;
            ////////////////////////////////////////////////////////////////////////////////
            rb = this.pageobj_rb.ecilist;
            $o = this.$ecilist.$this;

            $o.find('.head.date').html(rb.date);
            $o.find('.head.idx').html(rb.index);
            $o.find('.head.period').html(rb.period);
            $o.find('.head.actual').html(rb.actual);
            $o.find('.head.consensus_est').html(rb.consensus_est);

            $o = this.$ecilist.$dtmpl;
            $o.find('.head.period').html(rb.period);
            $o.find('.head.actual').html(rb.actual);
            $o.find('.head.consensus_est').html(rb.consensus_est);
        },

        ////////////////////////////////////////////////////////////////////

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {
                def: {
                    mkt: 'HKG',
                    per: 'p1d',
                    sct: '50',
                    ord: '1d;desc',
                    pn: 1,
                },
            },
        },
    };
    // Returning either "upval", "downval", or "" as the CSS class for displaying these up, down or no-change value
    LabCI.Utils.getUpDownClass = function (nc) {
        if (nc) {
            var ncval = Number(nc);

            // Check if 0
            if (ncval == 0) {
                return '';
            }
            // If -nnn ?
            else if (nc.length > 1 && nc.startsWith('-')) {
                return 'downval';
            }
            // If +nnn ?
            else if ((nc.length > 1 && nc.startsWith('+')) || ncval > 0) {
                return 'upval';
            }
        }

        // Any other case, return ""
        return '';
    };
})(jQuery);
