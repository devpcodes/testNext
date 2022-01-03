if (typeof (LabCI) === "undefined")
    LabCI = {};
LabCI.WDSSTREAMING = {
    provisionPath: null,
    company: null,
    fids: null,
    onReceiveStream: null,
    onErrorStream: null,
    sock: null,
    auth: false,
    //   flashTimer: 0,
    apiXhr: null,
    idleTimer: 0,
    MAX_IDLE_TIME: 60,
    ticket: null,
    token: null,
    init: function (provisionPath, company, fids, maxIdleTime, onReceiveStream, onErrorStream) {
        this.provisionPath = provisionPath;
        this.company = company;
        this.fids = fids;
        this.onErrorStream = onErrorStream;
        this.MAX_IDLE_TIME = maxIdleTime;
        this.onReceiveStream = onReceiveStream;
    },
    setToken: function (token) {
        this.token = token;
    },
    getProvision: function (ricArray, onReceived) {
        var that = this;
        var ricsString = '';
        if (ricArray) {
            for (var i = 0; i < ricArray.length; ++i) {
                ricsString += ricArray[0] + ';';
            }
        }
        if (this.apiXhr != null) {
            this.apiXhr.abort();
        }
        ;
        this.apiXhr = $.ajax({
            dataType: "json",
            url: this.provisionPath,
            data: {rics: ricsString, company: this.company, token: this.token},
           //    data: {rics: ricsString, token: this.token},
            //    tryCount: 0,
            //    retryLimit: this.retryLimit,
            success: function (data) {
                if (onReceived) {
                    onReceived(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (that.sock != null) {
                    that.sock.close();
                }
                that.idleTimer = 0;
                if (that.onErrorStream != null) {
                    that.onErrorStream('PROVISION_ERROR');
                }
                /*     console.log('Provision Error');
                 console.log(textStatus + " " + errorThrown);
                 this.tryCount++;
                 if (this.tryCount <= this.retryLimit) {
                 //try again
                 $.ajax(this);
                 return;
                 }
                 if (onError) {
                 onError(jqXHR, textStatus, errorThrown);
                 }
                 
                 return;*/
            }
        });
    },
    connect: function (ticket) {
        var that = this;
        this.ticket = ticket;
        setTimeout(function () {
            that.tick();
        }, 1000);
        this._connect();
    },
    _connect: function () {
        var that = this;
        this.sock = new WebSocket("wss://" + this.ticket.host + "/wds/rt");
        var sock = this.sock;
        sock.onopen = function (event) {
            console.log(that.token + " "+ that.company);
            var login = "{'type':'login','token':'" + that.token + "', 'company': " + that.company + " ,'conflate': 3000}";
            sock.send(login);
        };
        sock.onclose = function (event) {
            if (sock.lastError)
                console.log("ERROR: Disconnected: " + sock.lastError);
            else
                console.log("Disconnected: " + event.reason);
            // UI handling on close
            this.auth = false;
            sock = null;
        };
        sock.onmessage = function (event) {
            var resp = JSON.parse(event.data);
            if (!this.auth)
            {
                if (resp.type == "live")
                {
                    console.log("Connected to " + resp.server + " (" + resp.connection + ")");
                    that.request();
                    this.auth = true;
                }
            } else if (resp.type == "update")
            {
                var data = resp.data;
                for (var service in data)
                {
                    var rics = data[service];
                    for (var ric in rics)
                    {
                        var fields = rics[ric];
                        if (that.onReceiveStream != null) {

                            $('[streamric="' + ric + '"]').each(function () {
                                $(this).find('[streamdata="' + data + '"]').each(function () {
                                    var dataType = $(this).attr('streamtype');
                                    var oldValue = $(this).html();
                                    var newValue = that.formatDate(value, dataType);
                                    if (oldValue !== newValue) {
                                        $(this).html(newValue);
                                    }
                                });
                            });
                            that.onReceiveStream(ric, fields);
                        }
                    }
                }
            }
            that.idleTimer = 0;
        };
        sock.onerror = function (event) {
            sock.lastError = "Connection error";
            that.idleTimer = 0;
            if (that.onErrorStream != null) {
                that.onErrorStream('STREAMING_CONNECTION_ERROR');
            }
        };
    },
    close: function () {
        this.sock.close(1000, "logout");
    },
    request: function () {
        var request = "{'type':'request','service':'" + this.ticket.service + "','rics': " + JSON.stringify(this.ticket.rics) + ",'fids':[" + this.fids + "],'ticket':'" + this.ticket.ticket + "'}";
        this.sock.send(request);
        console.log("Request sent");
    },
    cancel: function () {
        var cancel = "{'type':'cancel','service':'" + this.ticket.service + "','rics': " + JSON.stringify(this.ticket.rics) + "}";
        this.sock.send(cancel);
    },
    tick: function () {
        // Connection idle
        var that = this;
        if (this.sock != null && ++this.idleTimer == this.MAX_IDLE_TIME)
        {
            this.sock.lastError = "Connection idle";
            this.sock.close();
            this.idleTimer = 0;
            //reconnect...TODO...may need to prevision and get token again...
            //    this._connect();
            if (that.onErrorStream != null) {
                that.onErrorStream('STREAMING_CONNECTION_IDLE');
            }
        }

        setTimeout(function () {
            that.tick();
        }, 1000);
    },
    updateUI: function (ric, data, value, upDownClass) {
        var that = this;
        $('[streamric="' + ric + '"]').each(function () {
            var streamRicObj = $(this);
            $(this).find('[streamdata="' + data + '"]').each(function () {
                var dataType = $(this).attr('streamtype');
                var oldValue = $(this).html();
                var format = {};
                format.dp = streamRicObj.attr('dp');
                if ($(this).attr('dp')) {
                    format.dp = $(this).attr('dp');
                }
                if ($(this).attr('dateformat')) {
                    format.dateformat = $(this).attr('dateformat');
                }
                var newValue = that.formatDate(value, dataType, format);
                if (oldValue !== newValue) {
                    $(this).html(newValue).stop().animate({backgroundColor: '#fadadd'}, 0).animate({backgroundColor: 'none'}, 500);
                    if (dataType === 'change') {
                        var upDownClass = that.getUpDownClass(value);
                        if (!$(this).find('[streamdata="change"]').hasClass(upDownClass)) {
                            $(this).find('[streamdata="change"]').removeClass("upval").removeClass("downval").addClass(upDownClass);
                            $(this).find('[streamdata="netchange"]').removeClass("upval").removeClass("downval").addClass(upDownClass);
                        }
                    }
                    if (upDownClass) {
                        $(this).removeClass("upval").removeClass("downval").addClass(upDownClass);
                    }
                }
            });
        });
    },
    /*  updateUI: function (uiRef, ric, lastValueParsed, lastValueFid) {
     if (uiRef.attr('streamric') === ric) {
     uiRef.find('[streamdata]').each(function () {
     var data = $(this).attr('streamdata');
     var newValue;
     if (lastValueParsed[data]) {
     newValue = lastValueParsed[data];
     } else if (lastValueFid[data]) {
     newValue = lastValueFid[data];
     }
     
     if(newValue){
     newValue = this.formatDate(newValue)
     }
     
     });
     }
     },
     */
    getUpDownClass: function (nc) {
        if (nc !== undefined) {
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
    },
    getUpDownClassCompare: function (val1, val2) {
        if (val1 !== undefined && val2 !== undefined) {
            var v1 = Number(val1);
            var v2 = Number(val2);
            if (v1 === v2) {
                return "";
            } else if (v1 < v2) {
                return "downval";
            } else if (v1 > v2) {
                return "upval";
            }
        }

        // Any other case, return ""
        return "";
    },
    formatDate: function (data, type, format) {
        if (data !== undefined) {
            if (type === 'price') {
                var num = parseFloat(data).toFixed(format.dp);
                return this.replaceNumberWithCommas(num);
            }
            if (type === 'change') {
                if (data > 0) {
                    var num = parseFloat(data).toFixed(format.dp);
                    return '+' + this.replaceNumberWithCommas(num);
                } else {
                    var num = parseFloat(data).toFixed(format.dp);
                    return this.replaceNumberWithCommas(num);
                }
            }
            if (type === 'pctchange') {
                if (data > 0) {
                    var num = parseFloat(data).toFixed(format.dp);
                    return '+' + this.replaceNumberWithCommas(num) + '%';
                } else {
                    var num = parseFloat(data).toFixed(format.dp);
                    return this.replaceNumberWithCommas(num) + '%';
                }
            }
            if (type === 'pct') {
                var num = parseFloat(data).toFixed(format.dp);
                return this.replaceNumberWithCommas(num) + '%';
            }
            if (type === 'number') {
                return this.replaceNumberWithCommas(data);
            }
            if (type === 'ratio') {
                var num = parseFloat(data).toFixed(2);
                return this.replaceNumberWithCommas(num);
            }
            if (type === 'date') {
                var date = moment(data, 'DD MMM YYYY');
                return date.format(format.dateformat);
            }

        }
        return data;
    },
    numberFormatter: function (num, digits, lang) {
        const lookup_lang = {
            en: [
                {value: 1, symbol: ""},
                {value: 1e3, symbol: "k"},
                {value: 1e6, symbol: "M"},
                {value: 1e9, symbol: "B"}
            ],
            zh_HK: [
                {value: 1, symbol: ""},
                {value: 1e3, symbol: "千"},
                {value: 1e4, symbol: "萬"},
                {value: 1e6, symbol: "百萬"},
                {value: 1e7, symbol: "千萬"},
                {value: 1e8, symbol: "億"}
            ],
            zh_TW: [
                {value: 1, symbol: ""},
                {value: 1e3, symbol: "千"},
                {value: 1e4, symbol: "萬"},
                {value: 1e6, symbol: "百萬"},
                {value: 1e7, symbol: "千萬"},
                {value: 1e8, symbol: "億"}
            ],
            zh_CN: [
                {value: 1, symbol: ""},
                {value: 1e3, symbol: "千"},
                {value: 1e4, symbol: "万"},
                {value: 1e6, symbol: "百万"},
                {value: 1e7, symbol: "千万"},
                {value: 1e8, symbol: "亿"}
            ]

        };
        var lookup = lookup_lang[lang];
        //    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits) + item.symbol : "0";
    },
    replaceNumberWithCommas: function (yourNumber) {
        //Seperates the components of the number
        var n = yourNumber.toString().split(".");
        //Comma-fies the first part
        n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //Combines the two sections
        return n.join(".");
    },
    scaleUpAmountByUnit: function (value, unit) {
        var multipler = 1;
        switch (unit) {
            case "x10":
                multipler = 10;
                break;
            case "x100":
                multipler = 100;
                break;
            case "x1000":
                multipler = 1000;
                break;
            case "x1M":
                multipler = 1000000;
                break;
            case "x10M":
                multipler = 10000000;
                break;
            case "x100M":
                multipler = 100000000;
                break;
            case "x1B":
                multipler = 1000000000;
                break;
            case "x10K":
                multipler = 10000;
                break;
            case "x100K":
                multipler = 100000;
                break;
            case "x0.1":
                multipler = 0.1;
                break;
            case "x0.01":
                multipler = 0.01;
                break;
            default:
                multipler = 1;
                break;
        }
        return value * multipler;
    },
    updateChartTick: function (chartRef, lastValueParsed, sessionInfo) {
        var series = chartRef.mainchartobj.series;
        if (series && lastValueParsed.last !== undefined && lastValueParsed.dateTimeLocal !== undefined) {

//test code...
//lastValueParsed.dateTimeLocal = moment(lastValueParsed.dateTimeLocal).set('date', 22).toDate();            

            var lastchartSpot = series.points[series.spotCount - 1];
            var interval;
            var intervalUnit;
            var lastChartDateTime;
            var currentTickTime;
            //   console.log(lastchartSpot);
            //for mimi-chart and mobile chart
            if (chartRef._curdataopts && chartRef._curdataopts._c5api === 'mts') {
                interval = chartRef._curdataopts._c5apiparam_i;
                intervalUnit = 'm';
            } else if (chartRef._curdataopts && chartRef._curdataopts._c5api === 'hts') {
                interval = 1;
                if (chartRef._curdataopts._c5apiparam_i === 'd') {
                    intervalUnit = 'd';
                }
                if (chartRef._curdataopts._c5apiparam_i === 'w') {
                    intervalUnit = 'w';
                }
                if (chartRef._curdataopts._c5apiparam_i === 'm') {
                    intervalUnit = 'M';
                }
            } else {
//for desktop C5
                if (chartRef.STATE && chartRef.STATE.data && chartRef.STATE.data.int && chartRef.STATE.data.int.current) {
                    interval = 1;
                    if (chartRef.STATE.data.int.current === 'd') {
                        intervalUnit = 'd';
                    } else if (chartRef.STATE.data.int.current === 'w') {
                        intervalUnit = 'w';
                    } else if (chartRef.STATE.data.int.current === 'm') {
                        intervalUnit = 'M';
                    } else {
                        intervalUnit = 'm';
                        interval = chartRef.STATE.data.int.current;
                    }
                }
            }

            if (intervalUnit === 'm') { //mts
                lastChartDateTime = moment(lastchartSpot.year + " " + lastchartSpot.month + " " + lastchartSpot.day + " " + lastchartSpot.hour + ":" + lastchartSpot.min, 'YYYY M D H:m');
                //format date according to the inrerval
                var reminder = lastChartDateTime.minutes() % interval;
                lastChartDateTime = lastChartDateTime.subtract(reminder, 'minutes').toDate();
                currentTickTime = lastValueParsed.dateTimeLocal;
            } else {
                lastChartDateTime = moment(lastchartSpot.year + " " + lastchartSpot.month + " " + lastchartSpot.day + " 00:00", 'YYYY M D H:m').toDate();
                currentTickTime = lastValueParsed.dateTimeLocal;
            }

            lastchartSpot.date = lastChartDateTime;
            if (
                    ((intervalUnit === 'm' || intervalUnit === 'd') && moment(currentTickTime).isSameOrAfter(lastChartDateTime) && moment(currentTickTime).isBefore(moment(lastChartDateTime).add(interval, intervalUnit)))
                    || ((intervalUnit === 'w' || intervalUnit === 'M') && moment(currentTickTime).isSameOrBefore(lastChartDateTime, 'day'))
                    ) {
//within last chart interval...so update the last tick data
                var point = {date: lastchartSpot.date,
                    open: lastchartSpot.open,
                    high: lastchartSpot.high,
                    low: lastchartSpot.low,
                    close: lastValueParsed.last,
                    volume: 0, turnover: 0};
                if (lastValueParsed.last > lastchartSpot.high) {
                    point.high = lastValueParsed.last;
                }
                if (lastValueParsed.last < lastchartSpot.low) {
                    point.low = lastValueParsed.last;
                }

                if (intervalUnit === 'w' || intervalUnit === 'M') {
                    if (lastValueParsed.high > point.high) {
                        point.high = lastValueParsed.high;
                    }
                    if (lastValueParsed.low < point.low) {
                        point.low = lastValueParsed.low;
                    }
                }

                //    if (intervalUnit === 'm') {
                //volume and turnover... 
                if (lastValueParsed.acVol) {
                    if (!series.lastAccVol) {
                        series.lastAccVol = lastValueParsed.acVol;
                    } else {
                        point.volume = lastValueParsed.acVol - series.lastAccVol;
                    }
                }
                if (lastValueParsed.turnover) {
                    if (!series.lastTurnover) {
                        series.lastTurnover = lastValueParsed.turnover;
                    } else {
                        point.turnover = lastValueParsed.turnover - series.lastTurnover;
                    }
                }

                /*
                 if (!series.accTickVol) {
                 var accTickVol = 0;
                 var accTickTurnover = 0;
                 var currentDateMoment = moment(lastchartSpot.date);
                 for (var i = 0; i < series.points.length; ++i) {
                 if (currentDateMoment.isSame(series.points[i].date, 'day')) {
                 if (series.points[i] && series.points[i].volume) {
                 accTickVol = accTickVol + series.points[i].volume;
                 }
                 if (series.points[i] && series.points[i].turnover) {
                 accTickTurnover = accTickTurnover + series.points[i].turnover;
                 }
                 }
                 }
                 
                 series.accTickVol = accTickVol;
                 series.accTickTurnover = accTickTurnover;
                 }
                 //TODO...
                 if (lastValueParsed.acVol) {
                 point.volume = lastValueParsed.acVol - series.accTickVol;
                 //    series.accTickVol = lastValueParsed.acVol;
                 }
                 
                 if (lastValueParsed.turnover) {
                 point.turnover = lastValueParsed.turnover - series.accTickTurnover;
                 //    series.accTickTurnover = lastValueParsed.turnover;
                 }
                 */
                //    } else {
                /*       
                 //HTS
                 //volume and turnover...
                 if (intervalUnit === 'd') {
                 //daily
                 if (lastValueParsed.acVol) {
                 point.volume = lastValueParsed.acVol;
                 }
                 
                 if (lastValueParsed.turnover) {
                 point.turnover = lastValueParsed.turnover;
                 }
                 } else {
                 //TODO...
                 if (!series.accTickVol) { //no record last vlume for last tick
                 if (lastValueParsed.acVol) {
                 point.volume = point.volume + lastValueParsed.acVol;
                 series.accTickVol = accTickVol;
                 }
                 
                 if (lastValueParsed.turnover) {
                 point.turnover = point.turnover + lastValueParsed.turnover;
                 series.accTickTurnover = accTickTurnover;
                 }
                 } else {
                 if (lastValueParsed.acVol) {
                 point.volume = point.volume - series.accTickVol + lastValueParsed.acVol;
                 }
                 
                 if (lastValueParsed.turnover) {
                 point.turnover = point.turnover - accTickTurnover + lastValueParsed.turnover;
                 }
                 }
                 */
                //      }

                //    }
                console.log('update');
                series.update(point);
                chartRef.mainchartobj.draw(chartFactory.REASON_DATA_UPDATE);
            } else {
//add
                var _mDate = moment(lastValueParsed.dateTimeLocal);
                var point = {date: lastValueParsed.dateTimeLocal,
                    open: lastchartSpot.close,
                    high: lastValueParsed.last,
                    low: lastValueParsed.last,
                    close: lastValueParsed.last,
                    year: _mDate.year(),
                    month: _mDate.month() + 1,
                    day: _mDate.date(),
                    hour: _mDate.hour(),
                    min: _mDate.minute(),
                    volume: 0, turnover: 0};
                if (intervalUnit !== 'm') {
                    point.hour = 0;
                    point.min = 0;
                    if (intervalUnit === 'd') {
                        point.open = lastValueParsed.open;
                        point.high = lastValueParsed.high;
                        point.low = lastValueParsed.low;
                    }
                }
                //    delete series.accTickVol;
                delete series.lastAccVol;
                //    delete series.accTickTurnover;
                delete series.lastTurnover;

                series.append(point);
                chartRef.mainchartobj.draw(chartFactory.REASON_DATA_APPEND);

                // roll 1 day, if it is a new day
                if (intervalUnit === 'm' && sessionInfo && sessionInfo.ses) {
                    if (lastchartSpot && moment(lastchartSpot.date).isBefore(lastValueParsed.dateTimeLocal, 'day')) {
                        //        var lastchartSpot = series.points[series.spotCount - 2];
                        //        var lastChartDateTime = moment(lastchartSpot.year + " " + lastchartSpot.month + " " + lastchartSpot.day + " " + lastchartSpot.hour + ":" + lastchartSpot.min, 'YYYY M D H:m').toDate();

                        //appending date to the end to fit whole trading time range
                        
                        var futureDates = [];
                        var futureDate = new Date(lastValueParsed.dateTimeLocal.getTime());
                        var interval = 1;
                        var sessionEndTime;
                        var session = sessionInfo.ses;
                        if (session[1] !== undefined) {
                            //    startTime = session[1].fr;
                            if (session[2] !== undefined) {
                                sessionEndTime = session[2].to;
                            } else {
                                sessionEndTime = session[1].to;
                            }
                        }
                        
                        //mobile C5
                        if(chartRef.curperiod){
                            if(chartRef.curperiod  === '1W'){
                                interval = 60;                               
                            }
                        }else if(chartRef.STATE && chartRef.STATE.data && chartRef.STATE.data.int && chartRef.STATE.data.int.current){
                            interval = chartRef.STATE.data.int.current;
                //            console.log(interval);
                        }
                        
                        while (futureDate.toString("HH:mm") < sessionEndTime) {
                            futureDate = new Date(futureDate.addMinutes(interval));
                            futureDates.push(futureDate);
                        }
                        chartRef.mainchartobj.series.futureDates(futureDates);

                        //roll.. TODO TA Pane ansl need to roll, TODO roll 1 day only
                        chartRef.mainchartobj.show(lastValueParsed.dateTimeLocal, null);
                        if (chartRef.tachartobjarr) {
                            for (var i = 0; i < chartRef.tachartobjarr.length; ++i) {
                                chartRef.tachartobjarr[i].chart.show(lastValueParsed.dateTimeLocal, null);
                            }
                        }
                        if (chartRef.tachartobj) {
                            chartRef.tachartobj.show(lastValueParsed.dateTimeLocal, null);
                        }
                    }
                }

                console.log('add');
            }
        }
    }

};