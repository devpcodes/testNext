/* Version 20170704a.C5-V1.0.7.20170724a.PROD-V1.0.7 */

//custom support chartFactory.MODE_STATIC

var chartFactory={

    //========================================
    // Constants
    //========================================

    PRICE_CHART:          1,
    CONDENSE_CHART:       2,
    HTS_DATA:             1,
    MTS_DATA:             2,

    // Technical drawers
    SIMPLE_LINE:          "SIMPLELINE",
    VOLUME:               "Volume",
    CANDLESTICK:          "CANDLESTICK",
    OHLC:                 "OHLC",
    SMA:                  "SMA",         // Simple Moving Average
    EMA:                  "EMA",         // Exponential Moving Average
    MEMA:                 "MEMA",        // Modified Exponential Moving Average (Wilder's EMA)
    WMA:                  "WMA",         // Weighted Moving Average
    MOMENTUM:             "MOM",
    RSI:                  "RSI",         // Relative Strength Index
    RCI:                  "RCI",         // Rank Correlation Index
    CCI:                  "CCI",         // Commodity Channel Index
    UO:                   "UO",          // Ultimate Oscillator
    MACD:                 "MACD",
    ICHIMOKU:             "ICH",
    COMPARISON:           "cmp",         // Overlay & absolute compare
    BASE_COMPARISON:      "cmpBase",     // Base compare
    VOL_BY_PRICE:         "VAP",
    STOCHASTIC_FAST:      "FKD",         // Fast Stochastic
    STOCHASTIC_SLOW:      "SKD",         // Slow Stochastic
    STOCHASTIC:           "SKD",         // Fast/Full/Slow Stochastic
    WILLIAM_R:            "WR",          // William %R
    VOLATILITY:           "VltyCC",
    STD_DEV:              "SD",          // Standard Deviation
    FORCE_INDEX:          "FI",

//    INCIDENT:             "incident",

    /******************************************************************************/

    //==========================//
    // *** Other TA Drawers *** //
    //==========================//

    TURNOVER:             "Turnover",    // Turnover
    HISTOGRAM:            "HISTOGRAM",
    OBV:                  "OBV",         // On Balance Volume
    DMI:                  "DMI",         // Directional Movement Index
    BOLLINGERBANDS:       "BB",          // Bollingerbands
    DPO:                  "DPO",         // Detrended Price Oscillator
    ATR:                  "ATR",         // Average True Range
    ADXR:                 "ADXR",        // Average Directional Movement Index Rating
    SAR:                  "SAR",         // Parabolic Stop and Reveres
    BIAS:                 "Bias",        // Bias
    VECTOR:               "Vector",      // Vector
    ACD:                  "ACD",         // Accumulation Distribution
    ENVELOPE:             "ENV",         // Envelope
    LRT:                  "LRT",         // Linear Regression Trend
    WEIGHTED_CLOSE:       "WC",          // Weighted Close
    UI:                   "UI",          // Ulcer index
    WAD:                  "WAD",         // Williams Accumulation Distribution
    TRIX:                 "Trix",        // Trix
    VOSC:                 "VOSC",        // Volume Oscillator
    VE:                   "VE",          // Volume SMA Envelopes
    PROC:                 "PROC",        // Price Rate Of Change
    VROC:                 "VROC",        // Volume Rate Of Change
    PCV:                  "PCV",         // Price Change Value
    ALF:                  "ALF",         // Alexander Filter
    POSC:                 "POSC",        // Price Oscillator
    NVI:                  "NVI",         // Negative Volume Index
    CC:                   "CC",          // Coppock Curve
    KC:                   "KC",          // Keltner Channel
    EOM:                  "EOM",         // Ease Of Movement
    RMI:                  "RMI",         // Relative Momentum Index
    MASS_INDEX:           "MI",          // Mass Index
    MFI:                  "MFI",         // Money Flow Index
    CHAIKIN_OSC:          "CO",          // Chaikin Oscillator
    CHAIKIN_VOL:          "VC",          // Chaikin's Volatility
    PSY:                  "PL",          // Psychological LIne
    TVMA:                 "TVMA",        // Trading Value(Turnover) Moving Average
    KRI:                  "KRI",         // Kairi Relative Index
    SHINOHARA_RATIO:      "SHI",         // Shinhara Ratio
    FIB:                  "FIB",         // A set of auto-drawn fibonacci lines on the current visible range of Y values
    VR:                   "VR",          // Volume Ratio
    VWAP:                 "VWAP",        // VWAP
    Margin:               "Margin",      // Margin
    RC:                   "RC",          // Ratio Cator
    TP:                   "TP",          // Turning Point
    UPDW:                 "UPDW",        // Up/Down Ratio
    PRR:                  "PRR",         // Price Range Ratio

    /******************************************************************************/

//    TRADE:                "trade",

    /******************************************************************************/

    // Annotation engines
    TREND_LINE:           "trendLine",
    LABEL:                "label",
    FIBONACCI:            "fibonacci",

    LEFT_MARGIN_THIN:     10, // the default thin left margin
    LEFT_MARGIN:          10, // this will be changed to same as RIGHT_MARGIN when doing "overlay" comparsion, i.e. show the left y-axis
    RIGHT_MARGIN:         60,
    TOP_MARGIN:           12,
    BOTTOM_MARGIN:        20,
    BOTTOM_MARGIN_THIN:   10,
    MAX_COL_WIDTH:        5000,

    // Crosshair styles (add to combine)
    CROSSHAIR_HORIZONTAL: 1,
    CROSSHAIR_VERTICAL:   2,
    CROSSHAIR_EXTEND_N:   4,
    CROSSHAIR_EXTEND_S:   8,
    CROSSHAIR_DASH:       16,

    // Grid styles (add to combine)
    GRID_LABEL_X:         1,
    GRID_LABEL_Y:         2,
    GRID_DIMINUTIVE:      4,

    // Grid types
    GRID_DATE_EVEN:       1,
    GRID_DATE_ALIGN:      2,
    GRID_TIME_ALIGN:      3,

    // Grid scales
    GRID_SCALE_AUTO:      1,
    GRID_SCALE_FREE:      2,
    GRID_SCALE_FIXED:     3,

    // Shift types
    SHIFT_TO_LAST:        1,
    SHIFT_TO_SPOT:        2,

    REASON_SHOW:          1,
    REASON_BLANK:         2,
    REASON_RESIZE:        3,
    REASON_GRID_STYLE:    4,
    REASON_GRID_TYPE:     5,
    REASON_DATA_READY:    6,
    REASON_DATA_APPEND:   7,
    REASON_DATA_UPDATE:   8,
    REASON_DATA_DISCOVER: 9,
    REASON_AUX_DATA:      10,
    REASON_FUTURE_DATES:  11,
    REASON_DRAWER_CHANGE: 12,
    REASON_VIEW_SLIDE_X:  13,
    REASON_VIEW_SLIDE_Y:  14,
    REASON_VIEW_ZOOM_X:   15,
    REASON_VIEW_ZOOM_Y:   16,
    REASON_FLIP_Y:        17,
    REASON_LOG_SCALE:     18,
    REASON_RATIO_Y:       19,
    REASON_SHRINK:        20,
    REASON_GRID_SCALE:    21,
    REASON_CROSSHAIR:     22,
    REASON_TRACKER:       23,
    REASON_ANNOTATION:    24,
    REASON_ENGINE_CHANGE: 25,
    REASONS:              [null, "Show", "Blank", "Resize", "Grid Style", "Grid Type", "Data Ready", "Data Append", "Data Update", "Data Discover", "Aux Data",
                                 "Future Dates", "Drawer Change", "View Slide X", "View Slide Y", "View Zoom X", "View Zoom Y", "Flip Y", "Log Scale", "Ratio Y", "Shrink",
                                 "Grid Scale", "Crosshair", "Tracker", "Annotation", "Engine Change"],  // For debugging

    // Regions of a chart
    REGION_DRAWING:        1,
    REGION_X_AXIS:         2,
    REGION_Y_AXIS:         3,
    REGION_V_AXIS:         4,

    TOUCH_TO_MOVE:         -2,
    TOUCH_TO_DRAG:         -3,
    TOUCH_HOLD_TIME:       200,

    MODE_NORMAL:           0,
    MODE_TREND_LINE:       1,
    MODE_TREND_LINE_EX:    2,
    MODE_LABEL:            3,
    MODE_FIB_RETRACE:      4,  // Fibonacci Retracements
    MODE_FIB_FANS:         5,  // Fibonacci Fans
    MODE_FIB_ARCS:         6,  // Fibonacci arcs

    // Tracker types
    TRACKER_PRICE:         1,
    TRACKER_FIELD:         2,
    TRACKER_DATE:          3,

    // Tracker styles (add to combine)
    TRACKER_EXTEND_N:      1,
    TRACKER_EXTEND_S:      2,
    TRACKER_DASH:          4,

    // Annotation events
    ANNOTATION_ADD:          1,
    ANNOTATION_DELETE:       2,
    ANNOTATION_COPY:         3,
    ANNOTATION_FOCUS:        4,
    ANNOTATION_DEFOCUS:      5,
    ANNOTATION_SELECT_BEGIN: 6,
    ANNOTATION_SELECT_END:   7,
    ANNOTATION_DESELECT:     8,

    // Sections of a trend line
    TREND_LINE_HEAD:       1,
    TREND_LINE_TAIL:       2,
    TREND_LINE_BODY:       3,

    TREND_LINE_RADIUS:     3,
    TREND_LINE_THICKNESS:  1,
    TREND_LINE_HIT_DIST:   5,
    TREND_LINE_MIN_HEIGHT: 10,

    LABEL_RADIUS:          10,
    FIBONACCI_THICKNESS:   2,

    LINE_THICKNESS:        2,
    LINE_HIT_DIST:         5,
    BLAZE_RADIUS:          3,
    CONDENSE_HDL_HIT_DIST: 5,

    // Moving average methods
    MA_SMA:                1,
    MA_EMA:                2,
    MA_MEMA:               3,
    MA_WMA:                4,

    AJAX_TIMEOUT:          5000,
    DECIMAL_PLACE:         2,
    DEF_Z_ORDER:           100,
    MAX_PRECISION:         0.0000001,  // To cater for error in floating point number representation
    MONTHS:                [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

    //========================================
    // Common helper methods
    // to set/unset line dash style into a CTX
    //========================================

    setCTXLineDash: function(ctx) {
        ctx.setLineDash([4,2]);
    },
    unsetCTXLineDash: function(ctx) {
        ctx.setLineDash([]);
    },

    //========================================
    // Common helper methods
    // to extend a class prototype
    //========================================

    extendClass: function(subClass, baseClass) {
        // IE 10 doesn't support
        //   Object.setPrototypeOf(subClass.prototype, baseClass.prototype)

        var obj=Object.create(baseClass.prototype);
        for (prop in subClass.prototype)
            obj[prop]=subClass.prototype[prop];
        subClass.prototype=obj;
    },

    //========================================
    // Main factory function
    //========================================

    create: function(/* optional */ options)
    {
        //========================================
        // Utility functions
        //========================================

        function formatDate(year, month, day)
        {
            var arr=[year, "-"];
            if (month<10) arr.push("0");
            arr.push(month);
            arr.push("-");
            if (day<10) arr.push("0");
            arr.push(day);
            return arr.join("");
        }

        function formatShortDate(month, day)
        {
            var arr=[];
            if (month<10) arr.push("0");
            arr.push(month);
            arr.push("/");
            if (day<10) arr.push("0");
            arr.push(day);
            return arr.join("");
        }

        function formatTime(hour, min)
        {
            var arr=[];
            if (hour<10) arr.push("0");
            arr.push(hour);
            arr.push(":");
            if (min<10) arr.push("0");
            arr.push(min);
            return arr.join("");
        }

        function formatDateTime(month, day, hour, min)
        {
            var arr=[];
            if (month<10) arr.push("0");
            arr.push(month);
            arr.push("/");
            if (day<10) arr.push("0");
            arr.push(day);
            arr.push(" ");
            if (hour<10) arr.push("0");
            arr.push(hour);
            arr.push(":");
            if (min<10) arr.push("0");
            arr.push(min);
            return arr.join("");
        }

        function formatNumber(n, decimalPlace, diminutive)
        {
            if (n<chartFactory.MAX_PRECISION && n>-chartFactory.MAX_PRECISION)
                return "0";
            if (diminutive)
            {
//                if (n%1000000000000==0)
//                    return (n/1000000000000) + "T";
                if (n%1000000000==0)
                    return (n/1000000000) + "B";
                else if (n%1000000==0)
                    return (n/1000000) + "M";
                else if (n%1000==0)
                    return (n/1000) + "K";
            }
            if (n%1==0)
                return n.toString();
            if (diminutive)
            {
//                if (n>1000000000000 || n<-1000000000000)
//                    return (n/1000000000000).toFixed(decimalPlace) + "T";
                if (n>1000000000 || n<-1000000000)
                    return (n/1000000000).toFixed(decimalPlace) + "B";
                else if (n>1000000 || n<-1000000)
                    return (n/1000000).toFixed(decimalPlace) + "M";
                else if (n>1000 || n<-1000)
                    return (n/1000).toFixed(decimalPlace) + "K";
            }
            return n.toFixed(decimalPlace);
        }

        function roundInterval(n)
        {
            var factor;
            if (n<0.000001)
                factor=chartFactory.MAX_PRECISION;
            else if (n<0.00001)
                factor=0.000001;
            else if (n<0.0001)
                factor=0.00001;
            else if (n<0.001)
                factor=0.0001;
            else if (n<0.01)
                factor=0.001;
            else if (n<0.1)
                factor=0.01;
            else if (n<1)
                factor=0.1;
            else if (n<10)
                factor=1;
            else if (n<100)
                factor=10;
            else if (n<1000)
                factor=100;
            else if (n<10000)
                factor=1000;
            else if (n<100000)
                factor=10000;
            else if (n<1000000)
                factor=100000;
            else if (n<10000000)
                factor=1000000;
            else if (n<100000000)
                factor=10000000;
            else
                factor=100000000;
            return ((n/factor + 0.6)|0) * factor;  // The rounding is 40% up
        }

        function extrapolate(x0, y0, x1, y1, x)
        {
            return y0 + (y1 - y0)*(x - x0)/(x1 - x0);
        }

        function distanceBetween(x0, y0, x1, y1)
        {
            return Math.sqrt((x1 - x0)*(x1 - x0) + (y1 - y0)*(y1 - y0));
        }

        function max(a, b)
        {
            return (a>b ? a : b);
        }

        function min(a, b)
        {
            return (a<b ? a : b);
        }

        //========================================
        // CompactSeries class
        //========================================

        function CompactSeries(series)
        {
            this.points=null;
            this.spotCount=0;
            this.decimalPlace=series.decimalPlace;
            this.ctr(series);
        }

        CompactSeries.prototype={
            ctr: function(series)
            {
                var arr=[], pos=0;
                for (var i=0;i<series.points.length;i++)
                {
                    var pt=series.points[i];
                    if (!pt.gap)
                    {
                        arr.push(pt);
                        if (i<series.spotCount)
                            pos++;
                    }
                }
                this.points=arr;
                this.spotCount=pos;
            }
        };

        //========================================
        // HtsSeries class
        //========================================

        function HtsSeries(name, url, parent, decimalPlace, verifyFunc, successFunc, discoverFunc, errorFunc, caller)
        {
            this.name=name;
            this.url=url;
            this.parent=parent;
            this.decimalPlace=(decimalPlace==undefined ? chartFactory.DECIMAL_PLACE : decimalPlace);
            this.verifyFunc=verifyFunc;
            this.successFunc=successFunc;
            this.discoverFunc=discoverFunc;
            this.errorFunc=errorFunc;
            this.caller=(caller==undefined ? this : caller);

            this.points=null;
            this.spotCount=0;  // Number of points not in the future
            this.ready=false;
            this.discover=false;
            this.gapCount=0;
            this.compactSeries=null;

            // For special logic for MRGN data
            if (typeof(this.name)==="string")
                this.isMRGN=this.name.startsWith("MRGN");
            else
                this.isMRGN=false;

            this.ctr();
        }

        HtsSeries.prototype={
            className: "HtsSeries",

            indexOf: function(date) {
                for (var i=0;i<this.spotCount;i++)
                    if (date<=this.points[i].date)
                        return i;
                return -1;
            },

            indexEq: function(date) {
                var t1=date.getTime();
                for (var i=0;i<this.spotCount;i++) {
                    var t2=this.points[i].date.getTime();
                    if (t1<=t2)
                        if (t1==t2)
                            return i;
                        else
                            break;
                }
                return -1;
            },

            convTimeStr: function(s) {
                if (s.length==19 && s.charAt(10)==" ")
                    return new Date(s.substr(0,10) + "T" + s.substr(11) + "Z");
                else if (s.length==16 && s.charAt(10)==" ")
                    return Date.parseExact(s, "yyyy-MM-dd HH:mm");
                else if (s.length==12)
                    return Date.parseExact(s, "yyyyMMddHHmm");
                else if (s.length==8)
                    return new Date(s.substr(0,4) +"-"+ s.substr(4,2) +"-"+ s.substr(6,2));
                else
                    return new Date(s);
            },

            gapPoint: function(date, isnextpointbreak) {
                var pt={ date:date, year:date.getFullYear(), month:date.getMonth()+1, day:date.getDate(), hour:date.getHours(), min:date.getMinutes(),
                         gap:true };
                if (isnextpointbreak) isnextpointbreak==="s" ? pt.daybreak=true : pt.lunchbreak=true;
                return pt;
            },

            _parserawdata: function(data) {
                var rows=data.split("\n");
                var re=/^(\-|\+)?[0-9]+(\.[0-9]+)?$/;  // Pattern for valid number

                var arr=[];
                var isnextpointbreak;
                for (var i=0;i<rows.length;i++) {
                    // Process the next row...
                    var cells=rows[i].split(",");

                    if (cells.length===2) {
                        var code = cells[1];
                        if (code==="g") {
                            this.gapCount++;
                            arr.push(this.gapPoint(this.convTimeStr(cells[0]), isnextpointbreak));
                            isnextpointbreak = false;
                        }
                        else if (code==="s" || code==="b") {
                            isnextpointbreak = code;
//                            this.gapCount+=2;
//                            arr.push(this.gapPoint(this.convTimeStr(cells[0])));
//                            arr.push(this.gapPoint(this.convTimeStr(cells[0]), true));
                        }
                    }
                    else {
                        if (this.isMRGN) {
                            // Margin data
                            if (cells.length>=3 && re.test(cells[1]) && re.test(cells[2])) {
                                var date=this.convTimeStr(cells[0]);
                                var pt = { date:date, year:date.getFullYear(), month:date.getMonth()+1, day:date.getDate(), hour:date.getHours(), min:date.getMinutes(),
                                           mb:Number(cells[1]), ms:Number(cells[2]) };
                                if (isnextpointbreak) isnextpointbreak==="s" ? pt.daybreak=true : pt.lunchbreak=true;
                                arr.push(pt);
                                isnextpointbreak = false;
                            }
                        }
                        else {
                            // Normal chart data
                            if (cells.length>=7 && re.test(cells[1]) && re.test(cells[2]) && re.test(cells[3])
                                                && re.test(cells[4]) && re.test(cells[5]) && re.test(cells[6])) {
                                var date=this.convTimeStr(cells[0]);

                                var pt = { date:date, year:date.getFullYear(), month:date.getMonth()+1, day:date.getDate(), hour:date.getHours(), min:date.getMinutes(),
                                           open:Number(cells[1]), high:Number(cells[2]), low:Number(cells[3]), close:Number(cells[4]), volume:Number(cells[5]), turnover:Number(cells[6]) };

                                // ... extra handling to deal with close=0, and mark it as a gap
                                if (pt.close===0) {
                                    pt.close=undefined;
                                    pt.gap=true;

                                    if (this.si && this.si.assettype==="EQTY") {
                                        // .. add a gap for EQTY
                                        this.gapCount++;
                                        arr.push(pt);
                                    }
                                    else if (this.si && this.si.assettype==="FUTOPT") {
                                        // ... for FUTOPT, let's skip this point of FUTOPT with close=0 completely ;p
                                    }
                                }
                                else {
                                    if (isnextpointbreak) isnextpointbreak==="s" ? pt.daybreak=true : pt.lunchbreak=true;
                                    arr.push(pt);
                                    isnextpointbreak = false;
                                }
                            }
                        }
                    }
                }
                return arr;
            },

            decode: function(data) {
                var arr = this._parserawdata(data); // parse the data into array of data rows

                if (this.discover) {
                    this.discover=false;
                    if (arr.length>0) {
                        this.points=arr.concat(this.points);
                        this.spotCount += arr.length;
                        this.compactSeries=null;

                        this.parent.dataDiscover(this, arr.length);
                        if (this.discoverFunc != undefined)
                            this.discoverFunc.call(this.caller, arr.length);
                    }
                }
                else {
                    this.ready=true;
                    this.points=arr;
                    this.spotCount=arr.length;

                    if (this.verifyFunc != undefined)
                        this.verifyFunc.call(this.caller);
                    this.parent.dataReady(this);
                    if (this.successFunc != undefined)
                        this.successFunc.call(this.caller);
                }
            },

            append: function(point) {
                if (this.ready) {
//                    var date=point.date;
                    if (this.spotCount<this.points.length) {
                        if (point.gap) {
//                            this.points.splice(this.spotCount, 0, this.gapPoint(date));
                            this.points.splice(this.spotCount, 0, point);
                        }
                        else {
//                            var spot=this.points[this.spotCount];
//                            spot.date=date;
//                            spot.year=date.getFullYear();
//                            spot.month=date.getMonth()+1;
//                            spot.day=date.getDate();
//                            spot.hour=date.getHours();
//                            spot.min=date.getMinutes();
//                            spot.open=point.open;
//                            spot.high=point.high;
//                            spot.low=point.low;
//                            spot.close=point.close;
//                            spot.volume=point.volume;
//                            spot.turnover=point.turnover;
                            this.points[this.spotCount]=point;
                        }
                    }
                    else {
//                        if (point.gap) {
//                            this.points.push(this.gapPoint(date));
//                        }
//                        else {
//                            this.points.push({ date:date, year:date.getFullYear(), month:date.getMonth()+1, day:date.getDate(), hour:date.getHours(), min:date.getMinutes(),
//                                               open:point.open, high:point.high, low:point.low, close:point.close, volume:point.volume, turnover:point.turnover });
//                        }
                        this.points.push(point);
                    }

                    this.spotCount++;
                    if (point.gap) this.gapCount++;
                    this.compactSeries=null;

                    this.parent.dataAppend(this);
                }
            },

            update: function(point) {
                if (this.ready && this.spotCount>0) {
                    var spot=this.points[this.spotCount-1];
                    var date=point.date;
                    if (date != undefined) {
                        spot.date=date;
                        spot.year=date.getFullYear();
                        spot.month=date.getMonth()+1;
                        spot.day=date.getDate();
                        spot.hour=date.getHours();
                        spot.min=date.getMinutes();
                    }
                    if (point.open != undefined) spot.open=point.open;
                    if (point.high != undefined) spot.high=point.high;
                    if (point.low != undefined) spot.low=point.low;
                    if (point.close != undefined) spot.close=point.close;
                    if (point.volume != undefined) spot.volume=point.volume;
                    if (point.turnover != undefined) spot.turnover=point.turnover;

                    this.parent.dataUpdate(this);
                }
            },

            futureDates: function(dates) {
                if (this.ready) {
                    var i;
                    var n=this.spotCount + dates.length;

                    if (n<this.points.length)
                        this.points.splice(n, this.points.length - n);
                    else if (n>this.points.length)
                        for (i=this.points.length;i<n;i++)
                            this.points.push({});

                    for (i=0;i<dates.length;i++) {
                        var pt=this.points[this.spotCount+i];
                        var date=dates[i];

                        pt.year=date.getFullYear();
                        pt.month=date.getMonth()+1;
                        pt.day=date.getDate();
                        pt.hour=date.getHours();
                        pt.min=date.getMinutes();
                        pt.date=date;
                    }

                    this.compactSeries=null;
                    this.parent.futureDates(this);
                }
            },

            gaps: function(dates) {
                if (this.ready) {
                    // Sort the input dates in ascending order
                    dates.sort(function(date1, date2) {
                        if (date1==date2) return 0;
                        else if (date1<date2) return -1;
                        else return 1;
                    });

                    this.gapCount=0;
                    var i=0, j=0;

                    // First, insert any gap points in front of the data list
                    if (this.points.length>0)
                    {
                        var pt=this.points[0];
                        for (;j<dates.length;j++)
                            if (dates[j]<pt.date)
                            {
                                this.points.splice(j, 0, this.gapPoint(dates[j]));
                                this.gapCount++;
                            }
                            else
                                break;
                        i=j;
                        this.spotCount += j;
                    }

                    // Second, insert gap points into the data list and remove any gap points from the data list
                    // that are not present in the input date array

                    while (i<this.points.length) {
                        var pt=this.points[i];
                        if (pt.gap)
                            if (j<dates.length && dates[j]==pt.date) {
                                this.gapCount++; i++; j++;
                            }
                            else {
                                this.points.splice(i,1);
                                if (i<this.spotCount)
                                    this.spotCount--;
                            }
                        else {
                            for (;j<dates.length;j++)
                                if (dates[j]>pt.date)
                                    break;
                                else if (dates[j]<pt.date) {
                                    this.points.splice(i, 0, this.gapPoint(dates[j]));
                                    this.gapCount++;
                                    if (i<this.spotCount)
                                        this.spotCount++;
                                    i++;
                                }
                            i++;
                        }
                    }

                    // Lastly, append the remaining gap points to the end of the data list
                    for (;j<dates.length;j++) {
                        this.points.push(this.gapPoint(dates[j]));
                        this.gapCount++;
                    }

                    this.compactSeries=null;
                    this.parent.gaps(this);
                }
            },

            compact: function() {
                if (this.gapCount>0) {
                    if (this.compactSeries==null)
                        this.compactSeries=new CompactSeries(this);
                    return this.compactSeries;
                }
                else
                    return this;
            },

            open: function()
            {
                if (this.url.charAt(0)=="\n")
                {
                    this.decode(this.url);  // Convenient way to debug without a data connection
                    return;
                }

                $.ajax({
                    type:     "GET",
                    url:      this.url,
                    dataType: "text",
                    timeout:  chartFactory.AJAX_TIMEOUT,
                    context:  this,

                    success: function(data, status, xhr) {
                        this.decode(data);
                    },

                    error: function(xhr, status, error) {
                        if (this.errorFunc != undefined)
                            this.errorFunc.call(this.caller, "Http error: " + error);
                    }
                });
            },

            dig: function()
            {
                //if (this.url.charAt(0)=="\n" || this.discover)
                    return;

                this.discover=true;

                var pt=this.points[0];
                var date=formatDate(pt.year, pt.month, pt.day);

                $.ajax({
                    type:     "GET",
                    url:      this.url,
                    dataType: "text",
                    timeout:  chartFactory.AJAX_TIMEOUT,
                    data:     { before:date },
                    context:  this,

                    success: function(data, status, xhr) {
                        this.decode(data);
                    },

                    error: function(xhr, status, error) {
                        if (this.errorFunc != undefined)
                            this.errorFunc.call(this.caller, "Http error: " + error);
                        this.discover=false;
                    }
                });
            },

            serialize: function(serObj, ctx)
            {
                // If digging is supported, the correct URL that covers the whole range of points (including the dug points)
                // must be used in serialization

                serObj.url=this.url;
                serObj.parent=ctx.writeObject(this.parent);
                serObj.decimalPlace=this.decimalPlace;
                serObj.verifyFunc=ctx.functionName(this.verifyFunc);
                serObj.successFunc=ctx.functionName(this.successFunc);
                serObj.discoverFunc=ctx.functionName(this.discoverFunc);
                serObj.errorFunc=ctx.functionName(this.errorFunc);
                if (this.caller != this)
                    serObj.caller=ctx.externalName(this.caller);
            },

            deserialize: function(serObj, ctx)
            {
                this.url=serObj.url;
                this.parent=ctx.readObject(serObj.parent);
                this.decimalPlace=serObj.decimalPlace;
                this.verifyFunc=ctx.functionObject(serObj.verifyFunc);
                this.successFunc=ctx.functionObject(serObj.successFunc);
                this.discoverFunc=ctx.functionObject(serObj.discoverFunc);
                this.errorFunc=ctx.functionObject(serObj.errorFunc);
                var caller=ctx.externalObject(serObj.caller);
                if (caller != undefined)
                    this.caller=caller;

                this.open();
            },

            toString: function(/* optional */ cols)
            {
                var arr=["index,date"];
                if (cols != undefined)
                    for (var i=0;i<cols.length;i++)
                    {
                        arr.push(",");
                        arr.push(cols[i]);
                    }
                arr.push("\n");

                for (var i=0;i<this.points.length;i++)
                {
                    var pt=this.points[i];
                    arr.push(i);
                    arr.push(",");
                    arr.push(pt.date.toISOString());

                    if (cols != undefined)
                        for (var j=0;j<cols.length;j++)
                        {
                            arr.push(",");
                            var value=pt[cols[j]];
                            if (value != undefined)
                                arr.push(value);
                        }
                    arr.push("\n");
                }
                return arr.join("");
            },

            ctr: function()
            {
            }
        };

        //========================================
        // SerializationContext class
        //========================================

        function SerializationContext()
        {
            this.objList=[];        // Array index is the object ID
            this.funcMap={};        // List of client supplied functions
            this.externMap={};      // List of client supplied objects
            this.creatorFunc=null;  // Function to create custom object
            this.series=null;
            this.ctr();
        }

        SerializationContext.prototype={
            rootObject: function(obj)
            {
                this.objList.push(obj);  // The first object (ID=0) is the root object
            },

            setCreatorFunc: function(func)
            {
                this.creatorFunc=func;
            },

            funcToMatch: function(func)
            {
                this.funcMap[this.functionName(func)]=func;
            },

            objToMatch: function(obj)
            {
                if (obj.name != undefined)
                    this.externMap[obj.name]=obj;
            },

            use: function(series)
            {
                var last=this.series;
                this.series=series;
                return last;
            },

            restore: function(series)
            {
                this.series=series;
            },

            writeObject: function(obj)
            {
                if (obj===undefined) return;
                if (obj===null) return null;

                var id=this.objList.indexOf(obj);
                if (id== -1)
                {
                    if (obj.className==undefined || obj.name==undefined || obj.serialize==undefined || obj.deserialize==undefined)
                        throw "Object not serializable: " + obj.name;

                    id=this.objList.length;
                    this.objList.push(obj);

                    var serObj={ _id:    id,
                                 _class: obj.className,
                                 name:   obj.name };
                    obj.serialize(serObj, this);
                    return serObj;
                }
                else
                    return { _ref:id };
            },

            readObject: function(serObj)
            {
                if (serObj===undefined) return;
                if (serObj===null) return null;

                var id=serObj._id;
                var ref=serObj._ref;

                if (id != undefined)
                {
                    if (this.objList.length != id)
                        throw "Unexpected object ID: " + id;

                    var className=serObj._class;
                    var name=serObj.name;
                    var obj;

                    switch (className)
                    {
                        case HtsSeries.prototype.className:           obj=new HtsSeries(name);            break;
                        case SimpleLineDrawer.prototype.className:    obj=new SimpleLineDrawer(name);     break;
                        case VolumeDrawer.prototype.className:        obj=new VolumeDrawer(name);         break;
                        case CandlestickDrawer.prototype.className:   obj=new CandlestickDrawer(name);    break;
                        case OHLCDrawer.prototype.className:          obj=new OHLCDrawer(name);           break;
                        case MADrawer.prototype.className:            obj=new MADrawer(name);             break;
                        case MomentumDrawer.prototype.className:      obj=new MomentumDrawer(name);       break;
                        case RSIDrawer.prototype.className:           obj=new RSIDrawer(name);            break;
                        case RCIDrawer.prototype.className:           obj=new RCIDrawer(name);            break;
                        case CCIDrawer.prototype.className:           obj=new CCIDrawer(name);            break;
                        case UODrawer.prototype.className:            obj=new UODrawer(name);             break;
                        case MACDDrawer.prototype.className:          obj=new MACDDrawer(name);           break;
                        case IchimokuDrawer.prototype.className:      obj=new IchimokuDrawer(name);       break;
                        case CmpDrawer.prototype.className:           obj=new CmpDrawer(name);            break;
                        case CmpBaseDrawer.prototype.className:       obj=new CmpBaseDrawer(name);        break;
                        case VolByPriceDrawer.prototype.className:    obj=new VolByPriceDrawer(name);     break;
                        case StochasticDrawer.prototype.className:    obj=new StochasticDrawer(name);     break;
                        case WilliamRDrawer.prototype.className:      obj=new WilliamRDrawer(name);       break;
                        case VolatilityDrawer.prototype.className:    obj=new VolatilityDrawer(name);     break;
                        case StdDevDrawer.prototype.className:        obj=new StdDevDrawer(name);         break;
                        case ForceIndexDrawer.prototype.className:    obj=new ForceIndexDrawer(name);     break;

//                        case IncidentDrawer.prototype.className:      obj=new IncidentDrawer(name);       break;

                        case TrendLineEngine.prototype.className:     obj=new TrendLineEngine(name);      break;
                        case LabelEngine.prototype.className:         obj=new LabelEngine(name);          break;
                        case FibonacciEngine.prototype.className:     obj=new FibonacciEngine(name);      break;
                        case PriceChart.prototype.className:          obj=new PriceChart(name);           break;
                        case CondenseChart.prototype.className:       obj=new CondenseChart(name);        break;

                        /******************************************************************************/

                        //==========================//
                        // *** Other TA Drawers *** //
                        //==========================//

                        case TurnoverDrawer.prototype.className:      obj=new TurnoverDrawer(name);       break;
                        case HistogramDrawer.prototype.className:     obj=new HistogramDrawer(name);      break;
                        case OBVDrawer.prototype.className:           obj=new OBVDrawer(name);            break;
                        case DMIDrawer.prototype.className:           obj=new DMIDrawer(name);            break;
                        case BollingerDrawer.prototype.className:     obj=new BollingerDrawer(name);      break;
                        case DPODrawer.prototype.className:           obj=new DPODrawer(name);            break;
                        case ATRDrawer.prototype.className:           obj=new ATRDrawer(name);            break;
                        case SARDrawer.prototype.className:           obj=new SARDrawer(name);            break;
                        case BiasDrawer.prototype.className:          obj=new BiasDrawer(name);           break;
                        case VectorDrawer.prototype.className:        obj=new VectorDrawer(name);         break;
                        case ACDDrawer.prototype.className:           obj=new ACDDrawer(name);            break;
                        case EnvelopeDrawer.prototype.className:      obj=new EnvelopeDrawer(name);       break;
                        case LRTDrawer.prototype.className:           obj=new LRTDrawer(name);            break;
                        case WeightedCloseDrawer.prototype.className: obj=new WeightCloseDrawer(name);    break;
                        case UIDrawer.prototype.className:            obj=new UIDrawer(name);             break;
                        case WADDrawer.prototype.className:           obj=new WADDrawer(name);            break;
                        case TrixDrawer.prototype.className:          obj=new TrixDrawer(name);           break;
                        case VOSCDrawer.prototype.className:          obj=new VOSCDrawer(name);           break;
                        case VEDrawer.prototype.className:            obj=new VEDrawer(name);             break;
                        case VROCDrawer.prototype.className:          obj=new VROCDrawer(name);           break;
                        case POSCDrawer.prototype.className:          obj=new POSCDrawer(name);           break;
                        case PCVDrawer.prototype.className:           obj=new PCVDrawer(name);            break;
                        case ALFDrawer.prototype.className:           obj=new ALFDrawer(name);            break;
                        case NVIDrawer.prototype.className:           obj=new NVIDrawer(name);            break;
                        case CCDrawer.prototype.className:            obj=new CCDrawer(name);             break;
                        case KCDrawer.prototype.className:            obj=new KCDrawer(name);             break;
                        case EOMDrawer.prototype.className:           obj=new EOMDrawer(name);            break;
                        case RMIDrawer.prototype.className:           obj=new RMIDrawer(name);            break;
                        case MassIndexDrawer.prototype.className:     obj=new MassIndexDrawer(name);      break;
                        case MFIDrawer.prototype.className:           obj=new MFIDrawer(name);            break;
                        case ChaikinOscDrawer.prototype.className:    obj=new ChaikinOscDrawer(name);     break;
                        case ChaikinVolDrawer.prototype.className:    obj=new ChaikinVolDrawer(name);     break;
                        case PsychologicalDrawer.prototype.className: obj=new PsychologicalDrawer(name);  break;
                        case TVMADrawer.prototype.className:          obj=new TVMADrawer(name);           break;
                        case KRIDrawer.prototype.className:           obj=new KRIDrawer(name);            break;
                        case SHIDrawer.prototype.className:           obj=new SHIDrawer(name);            break;
                        case FIBDrawer.prototype.className:           obj=new FIBDrawer(name);            break;
                        case VRDrawer.prototype.className:            obj=new VRDrawer(name);             break;
                        case VWAPDrawer.prototype.className:          obj=new VWAPDrawer(name);           break;
                        case MarginDrawer.prototype.className:        obj=new MarginDrawer(name);         break;
                        case RCDrawer.prototype.className:            obj=new RCDrawer(name);             break;
                        case TPDrawer.prototype.className:            obj=new TPDrawer(name);             break;
                        case UPDWDrawer.prototype.className:          obj=new UPDWDrawer(name);           break;
                        case PRRDrawer.prototype.className:           obj=new PRRDrawer(name);            break;

                        /******************************************************************************/

//                        case TradeDrawer.prototype.className:         obj=new TradeDrawer(name);          break;

                        /******************************************************************************/

                        default:
                            if (this.creatorFunc==null || (obj=this.creatorFunc(className, name))==null)
                                throw "Unknown class: " + className;
                    }

                    this.objList.push(obj);
                    obj.deserialize(serObj, this);
                    return obj;
                }
                else if (ref != undefined)
                {
                    if (ref<this.objList.length)
                        return this.objList[ref];
                    else
                        throw "Invalid object reference: " + ref;
                }
                else
                    throw "Missing object ID and object reference";
            },

            functionName: function(func)
            {
                if (func != undefined)
                {
                    // IE 10 doesn't have the "name" property for a function object
                    var arr=func.toString().match(/function (\w+)/);
                    if (arr!=null && arr.length==2)
                        return arr[1];
                }
            },

            functionObject: function(funcName)
            {
                return this.funcMap[funcName];
            },

            externalName: function(obj)
            {
                if (obj != undefined)
                    return obj.name;
            },

            externalObject: function(objName)
            {
                return this.externMap[objName];
            },

            ctr: function()
            {
            }
        };

        //========================================
        // BaseLineDrawer class
        //========================================

        function BaseLineDrawer()
        {
            // Virtual base class, do not instantiate!
        }

        BaseLineDrawer.prototype={
            dataReady: function(series)
            {
            },

            dataUpdate: function(series)
            {
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var value=parseFloat(pt);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined)
                    res[this.name]=pt;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }

                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                if (this.options.blazeColor != null && crosshairX != -1)
                {
                    var pt=series.points[crosshairX][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(crosshairX);
                        var y=axisY.toScreen(parseFloat(pt));

                        ctx.beginPath();
                        ctx.fillStyle=this.options.blazeColor;
                        ctx.arc(x, y, this.options.blazeRadius, 0, Math.PI*2, true);
                        ctx.fill();
                    }
                }
            },

            serialize: function(serObj, ctx) {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx) {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // SimpleLineDrawer class
        //========================================

        function SimpleLineDrawer(name, styleobj)
        {
            this.name=name;
            this.setStyleObj(styleobj);
        }

        SimpleLineDrawer.prototype={
            className: "SimpleLineDrawer",

            hex2rgba: function(c, op) {
                if (c.startsWith("#")) c = c.substr(1);
                var r = parseInt(c.substring(0,2), 16);
                var g = parseInt(c.substring(2,4), 16);
                var b = parseInt(c.substring(4,6), 16);
                return "rgba("+r+","+g+","+b+","+op+")";
            },

            setStyleObj: function(styleobj) {
                this.styleobj=styleobj;

                this.color=styleobj.color?styleobj.color:"#0033CC";
                if (styleobj.fillColor) {
                    this.fillColor = this.hex2rgba(styleobj.fillColor, "0.5"); //"#99CCFF"
                }
                else {
                    this.fillColor = null;
                }
                if (styleobj.fillColor2) {
                    this.fillColor2 = this.hex2rgba(styleobj.fillColor2, "0.5"); //"#FFFFFF"
                }
                else {
                    this.fillColor2 = null;
                }
                this.thickness=styleobj.thickness?styleobj.thickness:chartFactory.LINE_THICKNESS
                this.dash=styleobj.style=='d';
                this.blazeColor=styleobj.blazeColor?styleobj.blazeColor:"#333333";
                this.blazeRadius=styleobj.blazeRadius?styleobj.blazeRadius:chartFactory.BLAZE_RADIUS;
                this.ctr();
            },

            dataReady: function(series)
            {
            },

            dataUpdate: function(series)
            {
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    if (pt.close != undefined)
                    {
                        var value=parseFloat(pt.close);
                        if (res.min==undefined || value<res.min)
                        res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index];
                if (pt.close != undefined)
                {
                    res.open=pt.open;
                    res.high=pt.high;
                    res.low=pt.low;
                    res.close=pt.close;
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
                var pt=series.points[index];
                if (pt.close != undefined)
                {
                    var dy=axisY.toScreen(parseFloat(pt.close)) - crosshairY;
                    if (dy<0) dy= -dy;
                    if (dy<=chartFactory.LINE_HIT_DIST)
                        res.close=pt.close;
                }
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1,right;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i];
                    if (pt.close != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.close));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                        right=i;
                    }
                }

                ctx.lineWidth=this.thickness;
                this.dash?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.strokeStyle=this.color;
                ctx.stroke();

                if (this.fillColor != null)
                {
                    ctx.lineTo(axisX.toScreen(right), axisY.bottom);
                    ctx.lineTo(axisX.toScreen(left), axisY.bottom);
                    if (this.fillColor2 != null)
                    {
                        var grad=ctx.createLinearGradient(0, axisY.top, 0, axisY.bottom);
                        grad.addColorStop(0, this.fillColor);
                        grad.addColorStop(1, this.fillColor2);
                        ctx.fillStyle=grad;
                    }
                    else
                        ctx.fillStyle=this.fillColor;
                    ctx.fill();
                }

                if (this.blazeColor != null && crosshairX != -1)
                {
                    var pt=series.points[crosshairX];
                    if (pt.close != undefined)
                    {
                        var x=axisX.toScreen(crosshairX);
                        var y=axisY.toScreen(parseFloat(pt.close));

                        ctx.beginPath();
                        ctx.fillStyle=this.blazeColor;
                        ctx.arc(x, y, this.blazeRadius, 0, Math.PI*2, true);
                        ctx.fill();
                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.color=this.color;
                serObj.fillColor=this.fillColor;
                serObj.fillColor2=this.fillColor2;
                serObj.blazeColor=this.blazeColor;
                serObj.blazeRadius=this.blazeRadius;
                serObj.thickness=this.thickness;
                serObj.dash=this.dash;
            },

            deserialize: function(serObj, ctx)
            {
                this.color=serObj.color;
                this.fillColor=serObj.fillColor;
                this.fillColor2=serObj.fillColor2;
                this.blazeColor=serObj.blazeColor;
                this.blazeRadius=serObj.blazeRadius;
                this.thickness=serObj.thickness;
                this.dash=serObj.dash;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // VolumeDrawer class
        //========================================

        function VolumeDrawer(name, options)
        {
            this.name=name;
            this.options=options
            this.ctr();
        }

        VolumeDrawer.prototype={
            className: "VolumeDrawer",

            dataReady: function(series)
            {
                series=series.compact();

                if (series.spotCount>0) {
                    var pt=series.points[0];
                    pt[this.name]={
                        s: 1,
                        volume: pt.volume
                    };
                    for (var i=1;i<series.spotCount;i++) {
                        var prevC = parseFloat(series.points[i-1].close);
                        pt=series.points[i];
                        var C = parseFloat(pt.close);
                        pt[this.name]={
                            s: (prevC>C)?-1:1,
                            volume: pt.volume
                        };
                    }
                }
            },

            dataUpdate: function(series)
            {
                series=series.compact();

                var pt=series.points[series.spotCount-1];
                if (series.spotCount===1) {
                    pt[this.name]={
                        s: 1,
                        volume: pt.volume
                    };
                }
                else {
                    var prevC = parseFloat(series.points[series.spotCount-2].close);
                    var C = parseFloat(pt.close);
                    pt[this.name]={
                        s: (prevC>C)?-1:1,
                        volume: pt.volume
                    };
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var value=parseFloat(pt.volume);
                        if (res.min==undefined || res.min>0)
                            res.min=0;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined)
                    res[this.name]={
                        volume: pt.volume,
                        s: pt.s
                    };
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                // Determine the width of the volume bar
                var w=axisX.colWidth|0;
                if (w>40)
                    w -= 10;
                else if (w>30)
                    w -= 8;
                else if (w>20)
                    w -= 6;
                else if (w>10)
                    w -= 4;
                else if (w>2)
                    w -= 1; //2
                else
                    w = 2; //1
                var half=(w/2)|0;
                var base=axisY.toScreen(0);

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;

                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var y=axisY.toScreen(pt.volume);
                        ctx.fillStyle=(pt.s>0) ? this.options.upColor : this.options.downColor;
                        ctx.fillRect(axisX.toScreen(i)-half, y, w, base-y);
                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // CandlestickDrawer class
        //========================================

        function CandlestickDrawer(name, styleobj)
        {
            this.name=name;
            this.setStyleObj(styleobj);
        }

        CandlestickDrawer.prototype={
            className: "CandlestickDrawer",

            setStyleObj: function(styleobj) {
                this.styleobj=styleobj;

                this.upColor=styleobj.upColor?styleobj.upColor:"#CC0000";
                this.upFillColor=styleobj.upFillColor?styleobj.upFillColor:"#FFFFFF";
                this.downColor=styleobj.downColor?styleobj.downColor:"#0066CC";
                this.downFillColor=styleobj.downFillColor?styleobj.downFillColor:"#0066CC";
                this.ctr();
            },

            dataReady: function(series)
            {
            },

            dataUpdate: function(series)
            {
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    if (pt.close != undefined)
                    {
                        var low=parseFloat(pt.low);
                        var high=parseFloat(pt.high);
                        if (res.min==undefined || low<res.min)
                            res.min=low;
                        if (res.max==undefined || high>res.max)
                            res.max=high;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index];
                if (pt.close != undefined)
                {
                    res.open=pt.open;
                    res.high=pt.high;
                    res.low=pt.low;
                    res.close=pt.close;
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
                var pt=series.points[index];
                if (pt.close != undefined)
                {
                    var y0=axisY.toScreen(parseFloat(pt.low));
                    var y1=axisY.toScreen(parseFloat(pt.high));
                    if (y0<=crosshairY && crosshairY<=y1 || y1<=crosshairY && crosshairY<=y0)
                        res.close=pt.close;
                }
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                // Determine the width of the candlestick body
                var w=axisX.colWidth|0;
                if (w>40)
                    w -= 10;
                else if (w>30)
                    w -= 8;
                else if (w>20)
                    w -= 6;
                else if (w>10)
                    w -= 4;
                else if (w>2)
                    w -= 1; //2
                else
                    w=2; //1
//                if (w>10)
//                    w -= 2;
//                else if (w>4)
//                    w -= 1;
//                else
//                    w=3;
                var half=(w/2)|0;

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;

                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    var open=parseFloat(pt.open);
                    var high=parseFloat(pt.high);
                    var low=parseFloat(pt.low);
                    if (pt.close != undefined)
                    {
                        var close=parseFloat(pt.close);

                        var y0=axisY.toScreen(open);
                        var y1=axisY.toScreen(high);
                        var y2=axisY.toScreen(low);
                        var y3=axisY.toScreen(close);

                        var x,h,t;
                        if (close>=open)
                        {
                            ctx.strokeStyle=this.upColor;
                            ctx.fillStyle=this.upColor;
                        }
                        else
                        {
                            t=y3;y3=y0;y0=t;
                            ctx.strokeStyle=this.downColor;
                            ctx.fillStyle=this.downColor;
                        }

                        x=axisX.toScreen(i)+0.5;
                        ctx.beginPath();
                        ctx.moveTo(x, y1);
                        ctx.lineTo(x, y2);
                        ctx.lineWidth=1;
                        ctx.stroke();

                        x=axisX.toScreen(i)-half;
                        h=y0-y3;
                        if (h==0) h=(axisY.flip ? -1 : 1);
                        ctx.fillRect(x, y3, w, h);

                        if (close>=open)
                            ctx.fillStyle=this.upFillColor;
                        else
                            ctx.fillStyle=this.downFillColor;
                        if (h>2)
                            ctx.fillRect(x+1, y3+1, w-2, h-2);
                        else if (h<-2)
                            ctx.fillRect(x+1, y3-1, w-2, h+2);
                    }
//                    else
//                    {
//                        // Missing close, just plot an OHL stick
//                        var y0=axisY.toScreen(open);
//                        var y1=axisY.toScreen(high);
//                        var y2=axisY.toScreen(low);
//
//                        var x=axisX.toScreen(i);
//                        ctx.beginPath();
//                        ctx.moveTo(x+0.5, y1);
//                        ctx.lineTo(x+0.5, y2);
//
//                        ctx.moveTo(x-half, y0+axisY.sharp);
//                        ctx.lineTo(x+1, y0+axisY.sharp);
//
//                        ctx.lineWidth=1;
//                        ctx.strokeStyle=this.downColor;
//                        ctx.stroke();
//                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.upColor=this.upColor;
                serObj.upFillColor=this.upFillColor;
                serObj.downColor=this.downColor;
                serObj.downFillColor=this.downFillColor;
            },

            deserialize: function(serObj, ctx)
            {
                this.upColor=serObj.upColor;
                this.upFillColor=serObj.upFillColor;
                this.downColor=serObj.downColor;
                this.downFillColor=serObj.downFillColor;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // OHLCDrawer class
        //========================================

        function OHLCDrawer(name, styleobj)
        {
            this.name=name;
            this.setStyleObj(styleobj);
        }

        OHLCDrawer.prototype={
            className: "OHLCDrawer",

            setStyleObj: function(styleobj) {
                this.styleobj = styleobj;

                this.upColor=styleobj.upColor?styleobj.upColor:"#0033CC";
                this.downColor=styleobj.downColor?styleobj.downColor:this.upColor;
                this.ctr();
            },

            dataReady: function(series)
            {
            },

            dataUpdate: function(series)
            {
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    if (pt.close != undefined)
                    {
                        var low=parseFloat(pt.low);
                        var high=parseFloat(pt.high);
                        if (res.min==undefined || low<res.min)
                            res.min=low;
                        if (res.max==undefined || high>res.max)
                            res.max=high;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index];
                if (pt.close != undefined)
                {
                    res.open=pt.open;
                    res.high=pt.high;
                    res.low=pt.low;
                    res.close=pt.close;
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
                var pt=series.points[index];
                if (pt.close != undefined)
                {
                    var y0=axisY.toScreen(parseFloat(pt.low));
                    var y1=axisY.toScreen(parseFloat(pt.high));
                    if (y0<=crosshairY && crosshairY<=y1 || y1<=crosshairY && crosshairY<=y0)
                        res.close=pt.close;
                }
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var w=axisX.colWidth|0;
                if (w>40)
                    w -= 10;
                else if (w>30)
                    w -= 8;
                else if (w>20)
                    w -= 6;
                else if (w>10)
                    w -= 4;
                else if (w>2)
                    w -= 2;
                else
                    w=1;
                var half=(w/2)|0;

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;

                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    var open=parseFloat(pt.open);
                    var high=parseFloat(pt.high);
                    var low=parseFloat(pt.low);
                    if (pt.close != undefined)
                    {
                        var close=parseFloat(pt.close);

                        var y0=axisY.toScreen(open);
                        var y1=axisY.toScreen(high);
                        var y2=axisY.toScreen(low);
                        var y3=axisY.toScreen(close);

                        var x=axisX.toScreen(i);
                        ctx.beginPath();
                        ctx.moveTo(x+0.5, y1);
                        ctx.lineTo(x+0.5, y2);

                        ctx.moveTo(x-half, y0+axisY.sharp);
                        ctx.lineTo(x+1, y0+axisY.sharp);

                        ctx.moveTo(x, y3+axisY.sharp);
                        ctx.lineTo(x-half+w, y3+axisY.sharp);

                        ctx.lineWidth=1;
                        ctx.strokeStyle=(close>=open ? this.upColor : this.downColor);
                        ctx.stroke();
                    }
//                    else
//                    {
//                        // Missing close, just plot an OHL stick
//                        var y0=axisY.toScreen(open);
//                        var y1=axisY.toScreen(high);
//                        var y2=axisY.toScreen(low);
//
//                        var x=axisX.toScreen(i);
//                        ctx.beginPath();
//                        ctx.moveTo(x+0.5, y1);
//                        ctx.lineTo(x+0.5, y2);
//
//                        ctx.moveTo(x-half, y0+axisY.sharp);
//                        ctx.lineTo(x+1, y0+axisY.sharp);
//
//                        ctx.lineWidth=1;
//                        ctx.strokeStyle=this.downColor;
//                        ctx.stroke();
//                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.upColor=this.upColor;
                serObj.downColor=this.downColor;
            },

            deserialize: function(serObj, ctx)
            {
                this.upColor=serObj.upColor;
                this.downColor=serObj.downColor;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // MADrawer class
        //========================================

        function MADrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ref_index= -1;
            this.ref_ema= -1;
            this.ema= -1;

            this.ctr();
        }

        MADrawer.prototype={
            className: "MADrawer",

            simpleAvg: function(series, index)
            {
                var pts=series.points;
                var sum=0;
                for (var i=0;i<this.options.period;i++)
                    sum += parseFloat(pts[index-i].close);
                var res=sum / this.options.period;
                pts[index][this.name]=res.toFixed(this.options.dp);

                this.ref_index= -1;
                this.ema=res;
            },

            expAvg: function(series, index, factor)
            {
                if (this.ref_index != index-1)
                {
                    this.ref_index=index-1;
                    this.ref_ema=this.ema;
                }

                var pt=series.points[index];
                var close=parseFloat(pt.close);
                this.ema=(close - this.ref_ema)*factor + this.ref_ema;
                pt[this.name]=this.ema.toFixed(this.options.dp);
            },

            weightedAvg: function(series, index)
            {
                var pts=series.points;
                var sum=0;
//                var i=index-this.options.period;
//                for (var w=1;w<=this.options.period;w++)
//                    sum += parseFloat(pts[i+w].close)*w;
//                pts[index][this.name]=(sum / this.options.period / (this.options.period+1) * 2).toFixed(this.options.dp);

                var cnt=0;
                for (var i=0;i<this.options.period;i++) {
                    sum += parseFloat(pts[index-i].close)*(this.options.period-i);
                    cnt+=(this.options.period-i);
                }
                var res = sum/cnt;
                pts[index][this.name] = res.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                if (series.spotCount>=this.options.period)
                {
                    // First moving average
                    if (this.options.method==chartFactory.MA_WMA)
                        this.weightedAvg(series, this.options.period-1);
                    else
                        this.simpleAvg(series, this.options.period-1);

                    // Subsequent moving averages
                    for (var i=this.options.period;i<series.spotCount;i++)
                        if (this.options.method==chartFactory.MA_SMA)
                            this.simpleAvg(series, i);
                        else if (this.options.method==chartFactory.MA_EMA)
                            this.expAvg(series, i, 2/(this.options.period+1));
                        else if (this.options.method==chartFactory.MA_MEMA)
                            this.expAvg(series, i, 1/this.options.period);
                        else
                            this.weightedAvg(series, i);
                }
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount>=this.options.period)
                {
                    var i=series.spotCount-1;

                    if (series.spotCount==this.options.period)  // First moving average
                    {
                        if (this.options.method==chartFactory.MA_WMA)
                            this.weightedAvg(series, i);
                        else
                            this.simpleAvg(series, i);
                    }
                    else  // Subsequent moving average
                        if (this.options.method==chartFactory.MA_SMA)
                            this.simpleAvg(series, i);
                        else if (this.options.method==chartFactory.MA_EMA)
                            this.expAvg(series, i, 2/(this.options.period+1));
                        else if (this.options.method==chartFactory.MA_MEMA)
                            this.expAvg(series, i, 1/this.options.period);
                        else
                            this.weightedAvg(series, i);
                }
            }
        };

        chartFactory.extendClass(MADrawer, BaseLineDrawer);

        //========================================
        // MomentumDrawer class
        //========================================

        function MomentumDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        MomentumDrawer.prototype={
            className: "MomentumDrawer",

            rc: function(series, index) {
                var pts=series.points;
                var N=this.options.period;
                pts[index][this.name]=(pts[index].close-pts[index-N].close).toFixed(this.options.dp);
            },

            dataReady: function(series) {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                var sN=this.options.period;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.rc(series, i);
            },

            dataUpdate: function(series) {
                series=series.compact();
                var N=this.options.period;
                if (series.spotCount>N) {
                    this.rc(series, series.spotCount-1);
                }
            },
        };

        chartFactory.extendClass(MomentumDrawer, BaseLineDrawer);

        //========================================
        // RSIDrawer class
        //========================================

        function RSIDrawer(name, options) {
            // Ref: http://www.tradingsolutions.com/functions/RelativeMomentumIndex.html
            this.name=name;
            this.options=options;
            this.options.dp=2;

            if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA) {
                var N=this.options.period;
                if (this.options.method===chartFactory.MA_EMA) {
                    this.emafactor = 2/(N+1);
                }
                else {
                    this.emafactor = 1/N;
                }
            }

            this.ref_index = -1;
            this.ref_emaU = -1;
            this.ref_emaD = -1;
            this.emaU = -1;
            this.emaD = -1;

            this.ctr();
        }

        RSIDrawer.prototype={
            className: "RSIDrawer",

            simpleAvg: function(series, index) {
                var pts=series.points;
                var pt=pts[index];
                var gain=0, loss=0;
                var N=this.options.period;
                for (var i=0;i<N;i++) {
                    var change=pts[index-i][this.name+"_"];
                    if (change>=0)
                        gain += change;
                    else
                        loss -= change;
                }
                gain/=N;
                loss/=N;
                pt[this.name]=(gain/(gain+loss)*100).toFixed(this.options.dp);

                this.ref_index= -1;
                this.emaU=gain;
                this.emaD=loss;
            },

            expAvg: function(series, index) {
                if (this.ref_index != index-1) {
                    this.ref_index = index-1;
                    this.ref_emaU = this.emaU;
                    this.ref_emaD = this.emaD;
                }

                var pts=series.points;
                var pt=pts[index];
                var gain=0, loss=0;
                var change=pt[this.name+"_"];
                if (change>=0) {
                    gain=this.ref_emaU + (change - this.ref_emaU) * this.emafactor;
                    loss=this.ref_emaD - this.ref_emaD * this.emafactor;
                }
                else {
                    gain=this.ref_emaU - this.ref_emaU * this.emafactor;
                    loss=this.ref_emaD - (change + this.ref_emaD) * this.emafactor;
                }
                pt[this.name]=(gain/(gain+loss)*100).toFixed(this.options.dp);

                this.emaU=gain;
                this.emaD=loss;
            },

            weightedAvg: function(series, index) {
                var pts=series.points;
                var pt=pts[index];
                var gain=0, loss=0;
                var N=this.options.period;
                var s=index-N;
                var cnt=0;
                for (var i=1; i<=N; i++) {
                    cnt+=i;
                    var change=pts[s+i][this.name+"_"] * i;
                    if (change>=0)
                        gain += change;
                    else
                        loss -= change;
                }
                gain/=cnt;
                loss/=cnt;
                pt[this.name]=(gain/(gain+loss)*100).toFixed(this.options.dp);
            },

            rsi: function(series, index) {
                var pts=series.points;
                var pt=pts[index];
                var N=this.options.period;

                if (index===0) {
                    delete pt[this.name]; // won't work with just 1 point
                }
                else {
                    var prevC=parseFloat(pts[index-1].close);
                    var C=parseFloat(pt.close);
                    pt[this.name+"_"]=C-prevC; // calc the change first for all points

                    if (index===N) {
                        // First moving average
                        if (this.options.method===chartFactory.MA_WMA)
                            this.weightedAvg(series, index);
                        else
                            this.simpleAvg(series, index);
                    }
                    else if (index>N) {
                        if (this.options.method===chartFactory.MA_SMA)
                            this.simpleAvg(series, index);
                        else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                            this.expAvg(series, index);
                        else
                            this.weightedAvg(series, index);
                    }
                    else {
                        delete pt[this.name]; // not yet a RSI point
                    }
                }
            },

            dataReady: function(series) {
                series=series.compact();
                for (var i=0; i<series.spotCount; i++)
                    this.rsi(series,i);
            },

            dataUpdate: function(series) {
                series=series.compact();
                this.rsi(series,series.spotCount-1);
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                if (res.min==undefined || res.min>0)
                    res.min=0;
                if (res.max==undefined || res.max<100)
                    res.max=100;
            }
        };

        chartFactory.extendClass(RSIDrawer, BaseLineDrawer);

        //========================================
        // RCIDrawer class
        //========================================

        function RCIDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        RCIDrawer.prototype={
            className: "RCIDrawer",

            compare: function(o1, o2)
            {
                return o2.close - o1.close;
            },

            rci: function(series, index)
            {
                var pts=series.points;
                var arr=[];
                var N=this.options.period;

                // Assign date rank
                for (var i=0;i<N;i++)
                    arr.push({dateRank:i+1, close:parseFloat(pts[index-i].close)});
                arr.sort(this.compare);  // Sort by close (descending)

                // Assign value rank (average value is used for same close prices)
                var sum=0, count=0, prev, i;
                for (i=0;i<N;i++)
                {
                    var close=arr[i].close;
                    if (i>0 && prev != close)
                    {
                        for (var j=i-count;j<i;j++)
                            arr[j].valueRank=sum/count;
                        sum=i+1;
                        count=1;
                    }
                    else
                    {
                        sum += i+1;
                        count++;
                    }
                    prev=close;
                }
                for (var j=i-count;j<i;j++)
                    arr[j].valueRank=sum/count;

                // Calculate RCI
                var total=0;
                for (var i=0;i<N;i++)
                {
                    var d=arr[i].dateRank - arr[i].valueRank;
                    total += d*d;
                }
                var res=(1 - 6 * total / (N * (N*N - 1))) * 100;
                pts[index][this.name]=res.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN; i<series.spotCount; i++)
                    this.rci(series,i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount>=this.options.period)
                    this.rci(series, series.spotCount-1);
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                if (res.min==undefined || res.min>-100)
                    res.min= -100;
                if (res.max==undefined || res.max<100)
                    res.max=100;
            }
        };

        chartFactory.extendClass(RCIDrawer, BaseLineDrawer);

        //========================================
        // CCIDrawer class
        //========================================

        function CCIDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.tps=[];
            this.ctr();
        }

        CCIDrawer.prototype={
            className: "CCIDrawer",

            cci: function(series, index)
            {
                var pt=series.points[index];

                var tp=(parseFloat(pt.high) + parseFloat(pt.low) + parseFloat(pt.close)) / 3;
                this.tps[index % this.options.period]=tp;

                if (index>=this.options.period-1)
                {
                    var sum=0;
                    for (var i=0;i<this.options.period;i++)
                        sum += this.tps[i];
                    var avg=sum / this.options.period;

                    sum=0;
                    for (var i=0;i<this.options.period;i++)
                    {
                        var d=this.tps[i] - avg;
                        if (d<0) d= -d;
                        sum += d;
                    }
                    var md=sum / this.options.period;

                    pt[this.name]=((tp - avg) / (0.015 * md)).toFixed(this.options.dp);
                }
                else {
                    // Clear any old data, hence avoid drawing in draw()
                    delete pt[this.name];
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.cci(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                this.cci(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(CCIDrawer, BaseLineDrawer);

        //========================================
        // UODrawer class
        //========================================

        function UODrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.bps=[];
            this.bps2=[];
            this.bps3=[];

            this.trs=[];
            this.trs2=[];
            this.trs3=[];

            this.ctr();
        }

        UODrawer.prototype={
            className: "UODrawer",

            uo: function(series, index) {
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:ultimate_oscillator
                var pt=series.points[index];
                var low=parseFloat(pt.low);
                var high=parseFloat(pt.high);
                var close=parseFloat(pt.close);
                var prev=parseFloat(series.points[index-1].close);

                var bp=close - min(low, prev);            // Buying pressure
                var tr=max(high, prev) - min(low, prev);  // True range

                this.bps[index % this.options.period]=this.bps2[index % this.options.period2]=this.bps3[index % this.options.period3]=bp;
                this.trs[index % this.options.period]=this.trs2[index % this.options.period2]=this.trs3[index % this.options.period3]=tr;

                if (index>=this.options.period3) {
                    var bpSum=0, bpSum2=0, bpSum3=0;
                    var trSum=0, trSum2=0, trSum3=0;

                    for (var i=0;i<this.options.period;i++) {
                        bpSum += this.bps[i];
                        trSum += this.trs[i];
                    }
                    for (var i=0;i<this.options.period2;i++) {
                        bpSum2 += this.bps2[i];
                        trSum2 += this.trs2[i];
                    }
                    for (var i=0;i<this.options.period3;i++) {
                        bpSum3 += this.bps3[i];
                        trSum3 += this.trs3[i];
                    }

                    var uo=(4*bpSum/trSum + 2*bpSum2/trSum2 + bpSum3/trSum3)/7*100;
                    pt[this.name]=uo.toFixed(this.options.dp);
                }
                else {
                    // Clear any old data, hence avoid drawing in draw()
                    delete pt[this.name];
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=1;i<series.spotCount;i++)
                    this.uo(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount>1)
                    this.uo(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(UODrawer, BaseLineDrawer);

        //========================================
        // MACDDrawer class
        //========================================

        function MACDDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ref_index= -1;
            this.ref_shortEMA= -1;
            this.ref_longEMA= -1;
            this.ref_signal= -1;

            this.shortEMA= -1;
            this.longEMA= -1;
            this.signal= -1;

            this.ctr();
        }

        MACDDrawer.prototype={
            className: "MACDDrawer",

            process: function(series, index)
            {
                if (this.ref_index != index-1)
                {
                    this.ref_index=index-1;
                    this.ref_shortEMA=this.shortEMA;
                    this.ref_longEMA=this.longEMA;
                    this.ref_signal=this.signal;
                }

                var pt=series.points[index];
                var close=parseFloat(pt.close);
                pt=pt[this.name]={};

                var decimalPlace=this.options.dp;
                var signalStart=this.options.macd.period2 + this.options.signal.period - 2;
                var macd;

                // 12-day EMA
                if (index==this.options.macd.period-1)
                {
                    var sum=0;
                    for (var i=0;i<this.options.macd.period;i++)
                        sum += parseFloat(series.points[i].close);
                    this.shortEMA=sum/this.options.macd.period;
                }
                else
                {
                    var factor=2/(this.options.macd.period+1);
                    this.shortEMA=(close - this.ref_shortEMA)*factor + this.ref_shortEMA;
                }

                // 26-day EMA
                if (index>=this.options.macd.period2-1)
                {
                    if (index==this.options.macd.period2-1)
                    {
                        var sum=0;
                        for (var i=0;i<this.options.macd.period2;i++)
                            sum += parseFloat(series.points[i].close);
                        this.longEMA=sum/this.options.macd.period2;
                        this.ref_signal=0;  // Prepare to calculate 9-day SMA of MACD
                    }
                    else
                    {
                        var factor=2/(this.options.macd.period2+1);
                        this.longEMA=(close - this.ref_longEMA)*factor + this.ref_longEMA;
                    }

                    if (this.options.ppo)
                        macd=(this.shortEMA - this.longEMA) / this.longEMA * 100;  // PPO
                    else
                        macd=this.shortEMA - this.longEMA;

                    pt.macd=macd.toFixed(decimalPlace);
                    if (index<=signalStart)
                        this.signal=this.ref_signal + macd;
                }

                // Signal line (9-day EMA of MACD)
                if (index>=signalStart)
                {
                    if (index==signalStart)
                        this.signal=(this.ref_signal + macd) / this.options.signal.period;
                    else
                    {
                        var factor=2/(this.options.signal.period+1);
                        this.signal=(macd - this.ref_signal)*factor + this.ref_signal;
                    }

                    pt.signal=this.signal.toFixed(decimalPlace);
                    pt.histogram=(macd - this.signal).toFixed(decimalPlace);
                }
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                var sN=this.options.macd.period-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN; i<series.spotCount; i++)
                    this.process(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount>=this.options.macd.period)
                    this.process(series, series.spotCount-1);
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        if (pt.macd != undefined)
                        {
                            var value=parseFloat(pt.macd);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                        if (pt.signal != undefined)
                        {
                            var value=parseFloat(pt.signal);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                        if (pt.histogram != undefined)
                        {
                            var value=parseFloat(pt.histogram);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                    }
                }

                // Make sure that the zero line is always visible
                if (res.min>0) res.min=0;
                if (res.max<0) res.max=0;
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined) {
                    if (pt.macd != undefined)
                        if (this.ppo)
                            res.ppo=pt.macd;
                        else
                            res.macd=pt.macd;
                    if (pt.signal != undefined)
                        res.signal=pt.signal;
                    if (pt.histogram != undefined)
                        res.histogram=pt.histogram;
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            drawHistogram: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                // Determine the width of the bar
                var w=axisX.colWidth|0;
                if (w>40)
                    w -= 10;
                else if (w>30)
                    w -= 8;
                else if (w>20)
                    w -= 6;
                else if (w>10)
                    w -= 4;
                else if (w>2)
                    w -= 2;
                else
                    w=1;
                var half=(w/2)|0;
                var base=axisY.toScreen(0);

                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        if (pt.histogram != undefined)
                        {
                            var value=parseFloat(pt.histogram);
                            var y=axisY.toScreen(value);

                            ctx.fillStyle=(value >=0 ? this.options.hist.posColor : this.options.hist.negColor);
                            ctx.fillRect(axisX.toScreen(i)-half, y, w, base-y);
                        }
                    }
                }
            },

            drawMACDLine: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        if (pt.macd != undefined)
                        {
                            var x=axisX.toScreen(i);
                            var y=axisY.toScreen(parseFloat(pt.macd));
                            if (left===-1)
                            {
                                ctx.moveTo(x,y);
                                left=i;
                            }
                            else
                                ctx.lineTo(x,y);
                        }
                    }
                }

                ctx.lineWidth=this.options.macd.thickness;
                ctx.strokeStyle=this.options.macd.color;
                this.options.macd.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            drawSignalLine: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        if (pt.signal != undefined)
                        {
                            var x=axisX.toScreen(i);
                            var y=axisY.toScreen(parseFloat(pt.signal));
                            if (left===-1)
                            {
                                ctx.moveTo(x,y);
                                left=i;
                            }
                            else
                                ctx.lineTo(x,y);
                        }
                    }
                }

                ctx.lineWidth=this.options.signal.thickness;
                ctx.strokeStyle=this.options.signal.color;
                this.options.signal.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;

                this.drawHistogram(series, startIndex, endIndex, axisX, axisY, ctx);
                this.drawMACDLine(series, startIndex, endIndex, axisX, axisY, ctx);
                this.drawSignalLine(series, startIndex, endIndex, axisX, axisY, ctx);
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // IchimokuDrawer class
        //========================================

        function IchimokuDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

//            this.period=period;    // 9 days
//            this.period2=period2;  // 26 days
//            this.period3=period3;  // 52 days
//            this.convLineColor=convLineColor;
//            this.baseLineColor=baseLineColor;
//            this.leadSpanAColor=leadSpanAColor;
//            this.leadSpanBColor=leadSpanBColor;
//            this.upCloudColor=upCloudColor;
//            this.downCloudColor=downCloudColor;
//            this.lagSpanColor=lagSpanColor;
            this.active=true;
            this.res={};

            this.ctr();
        }

        IchimokuDrawer.prototype={
            className: "IchimokuDrawer",

            periodHighLow: function(pts, period, end, res)
            {
                for (var i=0;i<period;i++)
                {
                    var x=end-i;
                    if (x >= 0) {
                        var pt=pts[x];
                        var low=parseFloat(pt.low);
                        var high=parseFloat(pt.high);
                        if (i==0 || low<res.min)
                            res.min=low;
                        if (i==0 || high>res.max)
                            res.max=high;
                    }
                }
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();

                var pts=series.points;
                var n=series.spotCount;
                var decimalPlace=this.options.dp;
                var res=this.res;

                var t_period=this.options.period;
                var k_period=this.options.period2;
                var sb_period=this.options.period3;

                if (n + k_period>pts.length)
                {
                    this.active=false;
                    return;
                }
                else
                    this.active=true;

                // Conversion Line
                for (var i=t_period-2;i>=0;i--) delete pts[i].convLine;
                for (var i=t_period-1;i<n;i++)
                {
                    this.periodHighLow(pts, t_period, i, res);
                    pts[i].convLine=((res.max + res.min)/2).toFixed(decimalPlace);
                }

                // Base Line
                for (var i=k_period-2;i>=0;i--) delete pts[i].baseLine;
                for (var i=k_period-1;i<n;i++)
                {
                    this.periodHighLow(pts, k_period, i, res);
                    pts[i].baseLine=((res.max + res.min)/2).toFixed(decimalPlace);
                }

                // For Leading Span A & B, moving the points into the future by k_period
                var j=n + k_period;
                for (var i=j;i<pts.length;i++) {
                    // clear any left-over future data from points that are no longer covered in this TA setting (i.e. >= n+k_period)
                    var pt=pts[i];
                    if (pt!==undefined) {
                        delete pt.leadSpanA;
                        delete pt.leadSpanB;
                    }
                }

                // Leading Span A
                for (var i=k_period+k_period-2;i>=0;i--) if (pts[i]!==undefined) delete pts[i].leadSpanA;
                for (var i=k_period+k_period-1; i<j; i++)
                {
                    var trail=pts[i-k_period];
                    if (trail.convLine) {
                        trail._leadSpanA_k_period=((parseFloat(trail.convLine) + parseFloat(trail.baseLine))/2).toFixed(decimalPlace); // save the value in trail for future reference
                        pts[i].leadSpanA=trail._leadSpanA_k_period; // shift this point from trail to the future
                    }
                }

                // Leading Span B
                for (var i=k_period+sb_period-2;i>=0;i--) if (pts[i]!==undefined) delete pts[i].leadSpanB;
                for (var i=k_period+sb_period-1; i<j; i++)
                {
                    var trail=pts[i-k_period];
                    this.periodHighLow(pts, sb_period, i-k_period, res);
                    trail._leadSpanB_k_period=((res.max + res.min)/2).toFixed(decimalPlace); // save the value in trail for future reference
                    pts[i].leadSpanB=trail._leadSpanB_k_period; // shift this point from trail to the future
                }

                // Lagging Span
                var chikou_period=k_period-1; // Client's suggestion to include the current days, hence period-1
                j=n - chikou_period;
                for (var i=j;i<n;i++) if (pts[i]!==undefined) delete pts[i].lagSpan;
                for (var i=0;i<j;i++)
                    pts[i].lagSpan=pts[i + chikou_period].close;
            },

            dataUpdate: function(series)
            {
                series=series.compact();

                var pts=series.points;
                var n=series.spotCount;
                var decimalPlace=this.options.dp;
                var spot=pts[n-1];
                var res=this.res;

                var t_period=this.options.period;
                var k_period=this.options.period2;
                var sb_period=this.options.period3;

                if (!this.active)
                    return;

                if (n + k_period>pts.length)
                {
                    this.active=false;
                    return;
                }

                // Conversion Line
                if (n>=t_period)
                {
                    this.periodHighLow(pts, t_period, n-1, res);
                    spot.convLine=((res.max + res.min)/2).toFixed(decimalPlace);
                }

                // Base Line
                if (n>=k_period)
                {
                    this.periodHighLow(pts, k_period, n-1, res);
                    spot.baseLine=((res.max + res.min)/2).toFixed(decimalPlace);
                }

                // For Leading Span A & B, moving the points into the future by k_period
                var trail=pts[n-1-k_period];
                // ... data is from trail
                if (trail!==undefined) {
                    spot.leadSpanA=trail._leadSpanA_k_period;
                    spot.leadSpanB=trail._leadSpanB_k_period;
                }

                // Leading Span A
                if (n>=k_period) {
                    spot._leadSpanA_k_period=((parseFloat(spot.convLine) + parseFloat(spot.baseLine))/2).toFixed(decimalPlace); // save the value in trail for future reference
                    pts[n-1+k_period].leadSpanA=spot._leadSpanA_k_period; // shift this point from trail to the future
                }

                // Leading Span B
                if (n>=sb_period)
                {
                    this.periodHighLow(pts, sb_period, n-1, res);
                    spot._leadSpanB_k_period=((res.max + res.min)/2).toFixed(decimalPlace); // save the value in trail for future reference
                    pts[n-1+k_period].leadSpanB=spot._leadSpanB_k_period; // shift this point from trail to the future
                }

                // Lagging Span
                var chikou_period=k_period-1; // Client's suggestion to include the current days, hence period-1
                if (n>chikou_period)
                    pts[n-1-chikou_period].lagSpan=pts[n-1].close;
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                if (this.active)
                    for (var i=startIndex;i<=endIndex;i++)
                    {
                        var pt=series.points[i];
                        if (pt.convLine != undefined)
                        {
                            var value=parseFloat(pt.convLine);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                        if (pt.baseLine != undefined)
                        {
                            var value=parseFloat(pt.baseLine);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                        if (pt.leadSpanA != undefined)
                        {
                            var value=parseFloat(pt.leadSpanA);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                        if (pt.leadSpanB != undefined)
                        {
                            var value=parseFloat(pt.leadSpanB);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                        if (pt.lagSpan != undefined)
                        {
                            var value=parseFloat(pt.lagSpan);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                    }
            },

            tooltip: function(series, index, res)
            {
                if (this.active)
                {
                    var pt=series.points[index];
                    res[this.name] = { };
                    if (pt.convLine != undefined)
                        res[this.name].convLine=pt.convLine;
                    if (pt.baseLine != undefined)
                        res[this.name].baseLine=pt.baseLine;
                    if (pt.leadSpanA != undefined)
                        res[this.name].leadSpanA=pt.leadSpanA;
                    if (pt.leadSpanB != undefined)
                        res[this.name].leadSpanB=pt.leadSpanB;
                    if (pt.lagSpan != undefined)
                        res[this.name].lagSpan=pt.lagSpan;
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            drawConvLine: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                ctx.beginPath();
                for (var i=startIndex,left=-1;i<=endIndex;i++)
                {
                    var pt=series.points[i];
                    if (pt.convLine != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.convLine));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.convLine.thickness;
                ctx.strokeStyle=this.options.convLine.color;
                this.options.convLine.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            drawBaseLine: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                ctx.beginPath();
                for (var i=startIndex,left=-1;i<=endIndex;i++)
                {
                    var pt=series.points[i];
                    if (pt.baseLine != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.baseLine));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.baseLine.thickness;
                ctx.strokeStyle=this.options.baseLine.color;
                this.options.baseLine.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            pathLeadingSpanA: function(series, startIndex, endIndex, axisX, axisY, ctx, closed, upward)
            {
                var left=-1,right;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i];
                    if (pt.leadSpanA != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.leadSpanA));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                        right=i;
                    }
                }

                if (closed)
                {
                    var y=(upward ? axisY.top : axisY.bottom);
                    ctx.lineTo(axisX.toScreen(right), y);
                    ctx.lineTo(axisX.toScreen(left), y);
                }
            },

            pathLeadingSpanB: function(series, startIndex, endIndex, axisX, axisY, ctx, closed, upward)
            {
                var left=-1,right;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var value=parseFloat(series.points[i].leadSpanB);
                    var pt=series.points[i];
                    if (pt.leadSpanB != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.leadSpanB));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                        right=i;
                    }
                }

                if (closed)
                {
                    var y=(upward ? axisY.top : axisY.bottom);
                    ctx.lineTo(axisX.toScreen(right), y);
                    ctx.lineTo(axisX.toScreen(left), y);
                }
            },

            drawLagSpan: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                ctx.beginPath();
                for (var i=startIndex,left=-1;i<=endIndex;i++)
                {
                    var pt=series.points[i];
                    if (pt.lagSpan != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.lagSpan));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.lagSpan.thickness;
                ctx.strokeStyle=this.options.lagSpan.color;
                this.options.lagSpan.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                if (this.active)
                {
                    var startIndex=axisX.startIndexEx;
                    var endIndex=axisX.endIndexEx;

                    ctx.lineWidth=chartFactory.LINE_THICKNESS;
                    this.drawConvLine(series, startIndex, endIndex, axisX, axisY, ctx);
                    this.drawBaseLine(series, startIndex, endIndex, axisX, axisY, ctx);

                    // Green Cloud
                    ctx.save();
                    this.pathLeadingSpanB(series, startIndex, endIndex, axisX, axisY, ctx, true, true);
                    ctx.clip();
                    this.pathLeadingSpanA(series, startIndex, endIndex, axisX, axisY, ctx, true, false);
                    ctx.fillStyle=this.options.upCloud.color;
                    ctx.fill();
                    ctx.restore();

                    // Red Cloud
                    ctx.save();
                    this.pathLeadingSpanA(series, startIndex, endIndex, axisX, axisY, ctx, true, true);
                    ctx.clip();
                    this.pathLeadingSpanB(series, startIndex, endIndex, axisX, axisY, ctx, true, false);
                    ctx.fillStyle=this.options.downCloud.color;
                    ctx.fill();
                    ctx.restore();

                    this.pathLeadingSpanA(series, startIndex, endIndex, axisX, axisY, ctx, false, false);
                    ctx.lineWidth=this.options.leadSpanA.thickness;
                    ctx.strokeStyle=this.options.leadSpanA.color;
                    this.options.leadSpanA.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();

                    this.pathLeadingSpanB(series, startIndex, endIndex, axisX, axisY, ctx, false, false);
                    ctx.lineWidth=this.options.leadSpanB.thickness;
                    ctx.strokeStyle=this.options.leadSpanB.color;
                    this.options.leadSpanB.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();

                    this.drawLagSpan(series, startIndex, endIndex, axisX, axisY, ctx);
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // CmpDrawer class
        //========================================

        function CmpDrawer(name, ref, styleobj)
        {
            this.name=name;
            this.ref=ref;   // Compare against this reference series
            this.sheet={};  // Worksheet for the re-based line
            this.setStyleObj(styleobj);
            this.ctr();
        }

        CmpDrawer.prototype={
            className: "CmpDrawer",

            setStyleObj: function(styleobj) {
                this.styleobj=styleobj;

                this.color=styleobj.color?styleobj.color:"#0033CC";
                this.thickness=styleobj.thickness?styleobj.thickness:chartFactory.LINE_THICKNESS
                this.dash=styleobj.style=='d';
                this.blazeColor=styleobj.blazeColor?styleobj.blazeColor:"#333333";
                this.blazeRadius=styleobj.blazeRadius?styleobj.blazeRadius:chartFactory.BLAZE_RADIUS;
                this.ctr();
            },

            dataReady: function(series)
            {
                this.clearSheet();
            },

            dataUpdate: function(series)
            {
                this.clearSheet();
            },

            require: function(series)
            {
                return (series==this.ref);
            },

            clearSheet: function()
            {
                this.sheet.startIndex= -1;
                this.sheet.endIndex= -1;
            },

            rebase: function(series, startIndex, endIndex)
            {
                if (!this.ref.ready || this.sheet.startIndex==startIndex && this.sheet.endIndex==endIndex)
                    return;

                // Prepare the worksheet for calculation
                this.sheet.startIndex=startIndex;
                this.sheet.endIndex=endIndex;
                this.sheet.closes=null;

                var left=series.points;
                var right=this.ref.points;
                var i;

                // Check if the two series have a common start date
                for (i=startIndex; i>=0 && this.ref.indexEq(left[i].date)== -1; i--);
                var startIndexEx=(i== -1 ? startIndex : i);

                // Check if the two series have a common end date
                for (i=endIndex; i<left.length && this.ref.indexEq(left[i].date)== -1; i++);
                var endIndexEx=(i==left.length ? endIndex : i);

                // Re-base the reference series
                var j=this.ref.indexOf(left[startIndexEx].date);
                if (j!= -1)
                {
                    var closes={};
                    for (var i=startIndexEx; i<=endIndexEx && j<right.length;)
                        if (left[i].date>right[j].date)
                            j++;
                        else
                        {
                            if (left[i].date.getTime()==right[j].date.getTime())
                            {
                                closes[i]=right[j].close;
                                j++;
                            }
                            i++;
                        }
                    this.sheet.closes=closes;
                }

                this.sheet.startIndexEx=startIndexEx;
                this.sheet.endIndexEx=endIndexEx;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                this.rebase(series, startIndex, endIndex);
                if (this.sheet.closes==null)
                    return;

                for (var i=startIndex;i<=endIndex;i++)
                {
                    var close=this.sheet.closes[i];
                    if (close != undefined)
                    {
                        var value=parseFloat(close);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                if (this.sheet.closes != null)
                {
                    var close=this.sheet.closes[index];
                    if (close != undefined)
                        res[this.name]=close;
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                this.rebase(series, axisX.startIndex, axisX.endIndex);
                if (this.sheet.closes==null)
                    return;

                var startIndex=this.sheet.startIndexEx;
                var endIndex=this.sheet.endIndexEx;
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var close=this.sheet.closes[i];
                    if (close != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(close));
                        if (left== -1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }

                ctx.lineWidth=this.thickness;
                this.dash?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.strokeStyle=this.color;
                ctx.stroke();

                if (this.blazeColor != null && crosshairX != -1)
                {
                    var close=this.sheet.closes[crosshairX];
                    if (close != undefined)
                    {
                        var x=axisX.toScreen(crosshairX);
                        var y=axisY.toScreen(parseFloat(close));

                        ctx.beginPath();
                        ctx.fillStyle=this.blazeColor;
                        ctx.arc(x, y, this.blazeRadius, 0, Math.PI*2, true);
                        ctx.fill();
                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.ref=ctx.writeObject(this.ref);
                serObj.color=this.color;
                serObj.blazeColor=this.blazeColor;
            },

            deserialize: function(serObj, ctx)
            {
                this.ref=ctx.readObject(serObj.ref);
                this.color=serObj.color;
                this.blazeColor=serObj.blazeColor;
            },

            ctr: function()
            {
                if (this.ref != null && this.ref.ready)
                    this.dataReady(this.ref);
            }
        };

        //========================================
        // CmpBaseDrawer class
        //========================================

        function CmpBaseDrawer(name, base, styleobj)
        {
            this.name=name;
            this.base=base;
            this.sheet={ comps:[] };  // Worksheet for the re-based line
            this.setStyleObj(styleobj);
            this.ctr();
        }

        CmpBaseDrawer.prototype={
            className: "CmpBaseDrawer",

            setStyleObj: function(styleobj) {
                this.styleobj=styleobj;

                this.color=styleobj.color?styleobj.color:"#0033CC";
                this.thickness=styleobj.thickness?styleobj.thickness:chartFactory.LINE_THICKNESS
                this.dash=styleobj.style=='d';
                this.blazeColor=styleobj.blazeColor?styleobj.blazeColor:"#333333";
                this.blazeRadius=styleobj.blazeRadius?styleobj.blazeRadius:chartFactory.BLAZE_RADIUS;
                this.ctr();
            },

            dataReady: function(series)
            {
                this.clearSheet();
            },

            dataUpdate: function(series)
            {
                this.clearSheet();
            },

            require: function(series)
            {
                var comps=this.sheet.comps;
                for (var i=0;i<comps.length;i++)
                    if (comps[i].ref==series)
                        return true;
                return false;
            },

            clearSheet: function()
            {
                this.sheet.startIndex= -1;
                this.sheet.endIndex= -1;
            },

            addSeries: function(ref, color, blazeColor, blazeRadius, thickness, style)
            {
                return this.addSeries2(ref, {
                    color: color,
                    thickness: thickness,
                    style: style,
                    blazeColor: blazeColor,
                    blazeRadius: blazeRadius
                });
            },
            addSeries2: function(ref, styleobj)
            {
                var comps=this.sheet.comps;
                for (var i=0;i<comps.length;i++)
                    if (comps[i].ref.name==ref.name)
                        return;

                comps.push({ ref:ref, color:styleobj.color, thickness:styleobj.thickness, dash:styleobj.style=='d', blazeColor:styleobj.blazeColor, blazeRadius:styleobj.blazeRadius });
                if (ref.ready)
                    this.dataReady(ref);
            },

            removeSeries: function(ref)
            {
                var comps=this.sheet.comps;
                for (var i=0;i<comps.length;i++)
                    if (comps[i].ref.name==ref.name)
                    {
                        comps.splice(i,1);
                        this.clearSheet();
                        break;
                    }
            },

            rebase: function(series, startIndex, endIndex)
            {
                if (this.sheet.startIndex==startIndex && this.sheet.endIndex==endIndex)
                    return;

                // Prepare the worksheet for calculation
                this.sheet.startIndex=startIndex;
                this.sheet.endIndex=endIndex;
                this.sheet.pcts=null;

                var comps=this.sheet.comps;
                for (var i=0;i<comps.length;i++)
                    comps[i].pcts=null;

                var left=series.points;
                var i,j;

                // Check if all series have a common start date
                for (i=startIndex;i<=endIndex;i++)
                    if (!left[i].gap)
                    {
                        var date=left[i].date;
                        for (j=0;j<comps.length;j++)
                        {
                            var ref=comps[j].ref;
                            if (ref.ready && ref.indexEq(date)== -1)
                                break;
                        }
                        if (j==comps.length) break;
                    }
                if (i==endIndex+1) return;
                var startIndexEx=i;

                // Check if the end date of the main series is a gap
                for (i=endIndex; i<left.length && left[i].gap; i++);
                var endIndexEx=(i==left.length ? endIndex : i);

                // Re-base the main series
                var first=parseFloat(left[startIndexEx].close);
                if (first != 0)
                {
                    var pcts={};
                    for (i=startIndexEx;i<=endIndexEx;i++)
                    {
                        var close=left[i].close;
                        if (close != undefined)
                            pcts[i]=((parseFloat(close) - first)/first*100 + this.base).toFixed(series.decimalPlace);
                    }
                    this.sheet.pcts=pcts;
                }

                for (i=0;i<comps.length;i++)
                {
                    var comp=comps[i];
                    if (!comp.ref.ready) continue;

                    // Check if the main series and this reference series have a common end date
                    for (j=endIndex; j<left.length && comp.ref.indexEq(left[j].date)== -1; j++);
                    comp.endIndexEx=(j==left.length ? endIndex : j);

                    // Re-base this reference series
                    var right=comp.ref.points;
                    var k=comp.ref.indexEq(left[startIndexEx].date);

                    first=parseFloat(right[k].close);
                    if (first != 0)
                    {
                        var pcts={};
                        for (j=startIndexEx; j<=comp.endIndexEx && k<right.length;)
                            if (left[j].date>right[k].date)
                                k++;
                            else
                            {
                                if (left[j].date.getTime()==right[k].date.getTime())
                                {
                                    var close=right[k].close;
                                    if (close != undefined) {
                                        pcts[j]=((parseFloat(close) - first)/first*100 + this.base).toFixed(series.decimalPlace);
                                    }
                                    k++;
                                }
                                j++;
                            }
                        comp.pcts=pcts;
                    }
                }

                this.sheet.startIndexEx=startIndexEx;
                this.sheet.endIndexEx=endIndexEx;
            },

            rangeYLine: function(pcts, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                    if (pcts[i] != undefined)
                    {
                        var value=parseFloat(pcts[i]);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                this.rebase(series, startIndex, endIndex);

                if (this.sheet.pcts != null)
                    this.rangeYLine(this.sheet.pcts, startIndex, endIndex, res);

                var comps=this.sheet.comps;
                for (var i=0;i<comps.length;i++)
                    if (comps[i].pcts != null)
                        this.rangeYLine(comps[i].pcts, startIndex, endIndex, res);
            },

            tooltip: function(series, index, res)
            {
                if (this.sheet.pcts != null)
                {
                    var pct=this.sheet.pcts[index];
                    if (pct != undefined)
                        res[this.name + "_" + series.name]=pct;
                }

                var comps=this.sheet.comps;
                for (var i=0;i<comps.length;i++)
                {
                    var comp=comps[i];
                    if (comp.pcts != null && comp.pcts[index] != undefined)
                        res[this.name + "_" + comp.ref.name]=comp.pcts[index];
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            drawLine: function(pcts, startIndex, endIndex, crosshairX, axisX, axisY, styleobj, ctx)
            {
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                    if (pcts[i] != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pcts[i]));
                        if (left== -1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }

                ctx.lineWidth=styleobj.thickness;
                styleobj.dash?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.strokeStyle=styleobj.color;
                ctx.stroke();

                if (styleobj.blazeColor != null && crosshairX != -1)
                    if (pcts[crosshairX] != undefined)
                    {
                        var x=axisX.toScreen(crosshairX);
                        var y=axisY.toScreen(parseFloat(pcts[crosshairX]));

                        ctx.beginPath();
                        ctx.fillStyle=styleobj.blazeColor;
                        ctx.arc(x, y, styleobj.blazeRadius, 0, Math.PI*2, true);
                        ctx.fill();
                    }
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                this.rebase(series, axisX.startIndex, axisX.endIndex);

                if (this.sheet.pcts != null)
                    this.drawLine(this.sheet.pcts, this.sheet.startIndexEx, this.sheet.endIndexEx, crosshairX, axisX, axisY, {
                                      color:this.color,
                                      thickness:this.thickness,
                                      dash:this.dash,
                                      blazeColor:this.blazeColor,
                                      blazeRadius:this.blazeRadius,
                                  }, ctx);

                var comps=this.sheet.comps;
                for (var i=0;i<comps.length;i++)
                {
                    var comp=comps[i];
                    if (comp.pcts != null)
                        this.drawLine(comp.pcts, this.sheet.startIndexEx, comp.endIndexEx, crosshairX, axisX, axisY, {
                                          color:comp.color,
                                          thickness:comp.thickness,
                                          dash:comp.dash,
                                          blazeColor:comp.blazeColor,
                                          blazeRadius:comp.blazeRadius,
                                      }, ctx);
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.base=this.base;
                serObj.color=this.color;
                serObj.thickness=this.thickness;
                serObj.dash=this.dash;
                serObj.blazeColor=this.blazeColor;
                serObj.blazeRadius=this.blazeRadius;

                var compsSO=[];
                for (var i=0;i<this.sheet.comps.length;i++)
                {
                    var comp=this.sheet.comps[i];
                    compsSO.push({ ref:        ctx.writeObject(comp.ref),
                                   color:      comp.color,
                                   thickness:  comp.thickness,
                                   dash:       comp.dash,
                                   blazeColor: comp.blazeColor,
                                   blazeRadius:comp.blazeRadius });
                }
                serObj.comps=compsSO;
            },

            deserialize: function(serObj, ctx)
            {
                this.base=serObj.base;
                this.color=serObj.color;
                this.thickness=serObj.thickness;
                this.dash=serObj.dash;
                this.blazeColor=serObj.blazeColor;
                this.blazeRadius=serObj.blazeRadius;

                var compsSO=serObj.comps;
                for (var i=0;i<compsSO.length;i++)
                {
                    var compSO=compsSO[i];
                    this.sheet.comps.push({ ref:        ctx.readObject(compSO.ref),
                                            color:      compSO.color,
                                            thickness:  compSO.thickness,
                                            dash:       compSO.dash,
                                            blazeColor: compSO.blazeColor,
                                            blazeRadius:compSO.blazeRadius });
                }
            },

            ctr: function()
            {
            }
        };

        //========================================
        // VolByPriceDrawer class
        //========================================

        function VolByPriceDrawer(name, options) {
            // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:volume_by_price
            this.name=name;
            this.options=options;

            this.sheet={};  // Worksheet for the price zones
            this.ctr();
        }

        VolByPriceDrawer.prototype={
            className: "VolByPriceDrawer",

            dataReady: function(series)
            {
                this.clearSheet();
            },

            dataUpdate: function(series)
            {
                this.clearSheet();
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    if (pt.close != undefined)
                    {
                        var value=parseFloat(pt.close);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                res[this.name]=null; // just return null as a placeholder for tooltip
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            clearSheet: function()
            {
                this.sheet.startIndex= -1;
                this.sheet.endIndex= -1;
            },

            genPriceZones: function(series, startIndex, endIndex, axisY) {
                // In case if the range was not changed, just return here, no need to re-calculate ;)
                if (this.sheet.startIndex==startIndex && this.sheet.endIndex==endIndex) return;

                // Initialize the price zone array
                var prev;
                if (startIndex>0) {
                    var pt=series.points[startIndex-1];
                    if (pt.close != undefined)
                        prev=parseFloat(pt.close);
                }

                var zc=this.options.zoneCount;
                var close=axisY.min;

                var zones=[];
                var inc=(axisY.max - axisY.min)/zc;
                for (var i=0;i<zc;i++) {
                    zones.push({close:close, upVol:0, downVol:0});
                    close += inc;
                }

                // Find the up/down volumes for each price zone
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i];
                    if (pt.close != undefined) {
                        var close=parseFloat(pt.close);
                        var volume=parseFloat(pt.volume);

                        var zone;
                        for (var j=zc-1;j>=0;j--) {
                            zone=zones[j];
                            if (close>=zone.close)
                                break;
                        }

                        if (prev==undefined || close>=prev)
                            zone.upVol += volume;
                        else
                            zone.downVol += volume;
                        prev=close;
                    }
                }

                var maxVol=0;
                for (var i=0;i<zc;i++) {
                    var zone=zones[i];
                    var totVol=zone.upVol + zone.downVol;
                    if (totVol>maxVol)
                        maxVol=totVol;
                }

                this.sheet.startIndex=startIndex;
                this.sheet.endIndex=endIndex;
                this.sheet.maxVol=maxVol;
                this.sheet.zones=zones;
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx) {
                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;

                this.genPriceZones(series, startIndex, endIndex, axisY);

                var maxVol=this.sheet.maxVol;
                if (maxVol==0) return;

                var w=axisX.width * this.options.pctWidth;

                var zones=this.sheet.zones;
                var zc=this.options.zoneCount;
                var y0=axisY.toScreen(axisY.max);
                for (var i=zc-1;i>=0;i--) {
                    var zone=zones[i];

                    var y1=axisY.toScreen(zone.close);
                    var x0=(zone.upVol / maxVol * w)|0;
                    var x1=((zone.upVol + zone.downVol) / maxVol * w)|0;

                    var h=y1-y0;
                    h += (h>0 ? -1 : 1);

                    ctx.fillStyle=this.options.upColor;
                    ctx.fillRect(0, y0, x0, h);
                    ctx.fillStyle=this.options.downColor;
                    ctx.fillRect(x0, y0, x1-x0, h);

                    y0=y1;
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // StochasticDrawer class
        //========================================

        function StochasticDrawer(name, options)
        {
            // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:stochastic_oscillator_fast_slow_and_full
            // Fast stochastic (14,3)   => periodK=14, periodD=3, periodF=0
            // Slow stochastic (14,3,3) => periodK=14, periodD=3, periodF=3 (set periodD = periodF, i.e. Slow)
            // Full stochastic (14,3,3) => periodK=14, periodD=3, periodF=3
            // -- Fast --
            // Fast %K = %K basic calculation using periodK
            // Fast %D = periodD SMA of Fast %K
            // -- Slow --
            // Slow %K = Fast %K using periodK, smoothed with periodD SMA (= Fast %D)
            // Slow %D = periodD SMA of Slow %K
            // -- Full --
            // Full %K = Fast %K using periodK, smoothed with periodD SMA (= Fast %D)
            // Full %D = periodF SMA of Full %K

            this.name=name;
            this.options=options;
            this.options.dp=2;

            if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA) {
                if (this.options.method===chartFactory.MA_EMA) {
                    this.emafactorD = 2/(this.options.periodD+1);
                    this.emafactorF = 2/(this.options.periodF+1);
                }
                else {
                    this.emafactorD = 1/this.options.periodD;
                    this.emafactorF = 1/this.options.periodF;
                }
            }

            this.ref_indexD= -1;
            this.ref_emaD= -1;
            this.emaD= -1;

            this.ref_indexF= -1;
            this.ref_emaF= -1;
            this.emaF= -1;

            this.ctr();
        }

        StochasticDrawer.prototype={
            className: "StochasticDrawer",

            fastK: function(series, index)
            {
                var min, max;
                for (var i=0;i<this.options.periodK;i++)
                {
                    var pt=series.points[index-i];
                    var low=parseFloat(pt.low);
                    var high=parseFloat(pt.high);

                    if (i==0 || low<min)
                        min=low;
                    if (i==0 || high>max)
                        max=high;
                }

                var pt=series.points[index];
                var close=parseFloat(pt.close);
                pt[this.name]={}; // always start with fastK ;)
                pt[this.name].fastK=((close-min)/(max-min)*100).toFixed(this.options.dp);
            },

            simpleAvgD: function(series, index) {
                var pts=series.points;
                var sum=0;
                var N = this.options.periodD;
                for (var i = 0; i<N; i++) {
                    sum += parseFloat(pts[index-i][this.name].fastK);
                }
                var ma = sum / N; // sma
                pts[index][this.name].fastD = ma.toFixed(this.options.dp);
                this.ref_indexD = -1;
                this.emaD = ma;
            },
            expAvgD: function(series, index) {
                if (this.ref_indexD != index-1) {
                    this.ref_indexD = index-1;
                    this.ref_emaD = this.emaD;
                }
                var pts=series.points;
                var ma = (parseFloat(pts[index][this.name].fastK) - this.ref_emaD)*this.emafactorD + this.ref_emaD; // ema
                pts[index][this.name].fastD = ma.toFixed(this.options.dp);
                this.emaD = ma;
            },
            weightedAvgD: function(series, index) {
                var pts=series.points;
                var N = this.options.periodD;
                var sum=0;
                var cnt=0;
                for (var i = 0; i<N; i++) {
                    sum += parseFloat(pts[index-i][this.name].fastK) * (N-i);
                    cnt += (N-i);
                }
                var ma = sum / cnt; // wma
                pts[index][this.name].fastD = ma.toFixed(this.options.dp);
            },
            fastD: function(series, index)
            {
                var pts=series.points;

                var N = this.options.periodD;
                if (index===N) {
                    if (this.options.method===chartFactory.MA_WMA)
                        this.weightedAvgD(series, index);
                    else
                        this.simpleAvgD(series, index);
                }
                else if (index>N) {
                    if (this.options.method===chartFactory.MA_SMA)
                        this.simpleAvgD(series, index);
                    else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                        this.expAvgD(series, index);
                    else
                        this.weightedAvgD(series, index);
                }
            },

            simpleAvgF: function(series, index) {
                var pts=series.points;
                var sum=0;
                var N = this.options.periodF;
                for (var i = 0; i<N; i++) {
                    sum += parseFloat(pts[index-i][this.name].fastD);
                }
                var ma = sum / N; // sma
                pts[index][this.name].slowD = ma.toFixed(this.options.dp);
                this.ref_indexF = -1;
                this.emaF = ma;
            },
            expAvgF: function(series, index) {
                if (this.ref_indexF != index-1) {
                    this.ref_indexF = index-1;
                    this.ref_emaF = this.emaF;
                }
                var pts=series.points;
                var ma = (parseFloat(pts[index][this.name].fastD) - this.ref_emaF)*this.emafactorF + this.ref_emaF; // ema
                pts[index][this.name].slowD = ma.toFixed(this.options.dp);
                this.emaF = ma;
            },
            weightedAvgF: function(series, index) {
                var pts=series.points;
                var N = this.options.periodF;
                var sum=0;
                var cnt=0;
                for (var i = 0; i<N; i++) {
                    sum += parseFloat(pts[index-i][this.name].fastD) * (N-i);
                    cnt += (N-i);
                }
                var ma = sum / cnt; // wma
                pts[index][this.name].slowD = ma.toFixed(this.options.dp);
            },
            slowD: function(series, index)
            {
                var pts=series.points;

                var N = this.options.periodF;
                if (index===N) {
                    if (this.options.method===chartFactory.MA_WMA)
                        this.weightedAvgF(series, index);
                    else
                        this.simpleAvgF(series, index);
                }
                else if (index>N) {
                    if (this.options.method===chartFactory.MA_SMA)
                        this.simpleAvgF(series, index);
                    else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                        this.expAvgF(series, index);
                    else
                        this.weightedAvgF(series, index);
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                var n=series.spotCount;

                for (var i=this.options.periodK-1; i<n; i++)
                    this.fastK(series, i);
                for (var i=this.options.periodK+this.options.periodD-2; i<n; i++)
                    this.fastD(series, i);
                if (this.options.periodF>0)
                    for (var i=this.options.periodK+this.options.periodD+this.options.periodF-3; i<n; i++)
                        this.slowD(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                var n=series.spotCount;

                if (n>=this.options.periodK)
                    this.fastK(series, n-1);
                if (n>=this.options.periodK+this.options.periodD-1)
                    this.fastD(series, n-1);
                if (this.options.periodF>0 && n>=this.options.periodK+this.options.periodD+this.options.periodF-2)
                    this.slowD(series, n-1);
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                if (res.min==undefined || res.min>0)
                    res.min=0;
                if (res.max==undefined || res.max<100)
                    res.max=100;
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined) {
                    if (this.options.periodF>0)
                    {
                        // Full stochastic
                        if (pt.fastD != undefined)
                            res.pctK=pt.fastD;
                        if (pt.slowD != undefined)
                            res.pctD=pt.slowD;
                    }
                    else
                    {
                        // Fast stochastic
                        if (pt.fastK != undefined)
                            res.pctK=pt.fastK;
                        if (pt.fastD != undefined)
                            res.pctD=pt.fastD;
                    }
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            drawLine: function(series, startIndex, endIndex, axisX, axisY, field, color, thickness, style, ctx)
            {
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt[field] != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt[field]));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }

                ctx.lineWidth=thickness;
                ctx.strokeStyle=color;
                style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                if (this.options.periodF>0)
                {
                    // Slow/Full stochastic
                    this.drawLine(series, startIndex, endIndex, axisX, axisY, "fastD", this.options.colorK, this.options.thicknessK, this.options.styleK, ctx);
                    this.drawLine(series, startIndex, endIndex, axisX, axisY, "slowD", this.options.colorD, this.options.thicknessD, this.options.styleD, ctx);
                }
                else
                {
                    // Fast stochastic
                    this.drawLine(series, startIndex, endIndex, axisX, axisY, "fastK", this.options.colorK, this.options.thicknessK, this.options.styleK, ctx);
                    this.drawLine(series, startIndex, endIndex, axisX, axisY, "fastD", this.options.colorD, this.options.thicknessD, this.options.styleD, ctx);
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // WilliamRDrawer class
        //========================================

        function WilliamRDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        WilliamRDrawer.prototype={
            className: "WilliamRDrawer",

            pctR: function(series, index) {
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:williams_r
                var min, max;
                for (var i=0;i<this.options.period;i++)
                {
                    var pt=series.points[index-i];
                    var low=parseFloat(pt.low);
                    var high=parseFloat(pt.high);

                    if (i==0 || low<min)
                        min=low;
                    if (i==0 || high>max)
                        max=high;
                }

                var pt=series.points[index];
                var close=parseFloat(pt.close);
                pt[this.name]=((max - close)/(max - min)* -100).toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.pctR(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount>=this.options.period)
                    this.pctR(series, series.spotCount-1);
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                if (res.min==undefined || res.min>-100)
                    res.min= -100;
                if (res.max==undefined || res.max<0)
                    res.max=0;
            }
        };

        chartFactory.extendClass(WilliamRDrawer, BaseLineDrawer);

        //========================================
        // VolatilityDrawer class
        //========================================

        function VolatilityDrawer(name, options) //period, timeFactor, color, blazeColor
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        VolatilityDrawer.prototype={
            className: "VolatilityDrawer",

            volatility: function(series, index) {
                // Ref: http://www.investopedia.com/university/optionvolatility/volatility2.asp
                var pts=series.points;
                var sumC = 0, sumC2 = 0;
                var prev;

                var N=this.options.period;
                for (var i=index-N; i<=index; i++) {
                    var close = parseFloat(pts[i].close);
                    if (close<=0) {
                        pts[index][this.name] = "0";
                        return;
                    }
                    if (prev) {
                        var C = (close-prev)*100 / prev;
                        sumC += C;
                        sumC2 += C*C;
                    }
                    prev = close;
                }

                var sC = Math.sqrt((sumC2 - sumC*sumC/N) / N);
                var res = sC * Math.sqrt(this.options.timeFactor);
                pts[index][this.name] = res.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN; i<series.spotCount; i++)
                    this.volatility(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount>this.options.period)
                    this.volatility(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(VolatilityDrawer, BaseLineDrawer);

        //========================================
        // StdDevDrawer class
        //========================================

        function StdDevDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        StdDevDrawer.prototype={
            className: "StdDevDrawer",

            stddev: function(series, index)
            {
                var pts=series.points;
                var sumX=0, sumX2=0;
                for (var i=0;i<this.options.period;i++)
                {
                    var x=parseFloat(pts[index-i].close);
                    sumX += x;
                    sumX2 += x*x;
                }

                var res=Math.sqrt(sumX2 * this.options.period - sumX * sumX) / this.options.period;
                pts[index][this.name]=res.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                var sN=this.options.period-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN; i<series.spotCount; i++)
                    this.stddev(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount>=this.options.period)
                    this.stddev(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(StdDevDrawer, BaseLineDrawer);

        //========================================
        // ForceIndexDrawer class
        //========================================

        function ForceIndexDrawer(name, options)
        {
            this.name=name;
            this.options = options;
            this.options.dp=2;

            if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA) {
                var N=this.options.period;
                if (this.options.method===chartFactory.MA_EMA) {
                    this.emafactor = 2/(N+1);
                }
                else {
                    this.emafactor = 1/N;
                }
            }

            this.ref_index= -1;
            this.ref_ema= -1;
            this.ema= -1;

            this.ctr();
        }

        ForceIndexDrawer.prototype={
            className: "ForceIndexDrawer",

            simpleAvg: function(series, index) {
                var pts=series.points;
                var sum=0;
                var N=this.options.period;
                for (var i=0;i<N;i++) {
                    sum += pts[index-i][this.name].fi1;
                }
                var ma = sum / N; // sma
                pts[index][this.name].fi = ma.toFixed(this.options.dp);
                this.ref_index= -1;
                this.ema = ma;
            },

            expAvg: function(series, index) {
                if (this.ref_index != index-1) {
                    this.ref_index = index-1;
                    this.ref_ema = this.ema;
                }
                var pts=series.points;
                var ma = (pts[index][this.name].fi1 - this.ref_ema)*this.emafactor + this.ref_ema; // ema
                pts[index][this.name].fi = ma.toFixed(this.options.dp);
                this.ema = ma;
            },

            weightedAvg: function(series, index) {
                var pts=series.points;
                var N=this.options.period;
                var sum=0;
                var cnt=0;
                for (var i=0;i<N;i++) {
                    sum += pts[index-i][this.name].fi1 * (N-i);
                    cnt += (N-i);
                }
                var ma = sum / cnt; // wma
                pts[index][this.name].fi = ma.toFixed(this.options.dp);
            },

            forceIndex: function(series, index) {
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:force_index
                var pts=series.points;
                pts[index][this.name] = { };

                var prev = parseFloat(pts[index-1].close);
                var pt = pts[index];
                var close = parseFloat(pt.close);
                var volume = parseFloat(pt.volume);
                var fi1 = (close - prev) * volume;
                pt[this.name].fi1 = fi1;

                var N=this.options.period;
                if (index===N) {
                    if (this.options.method===chartFactory.MA_WMA)
                        this.weightedAvg(series, index);
                    else
                        this.simpleAvg(series, index);
                }
                else if (index > N) {
                    if (this.options.method===chartFactory.MA_SMA)
                        this.simpleAvg(series, index);
                    else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                        this.expAvg(series, index);
                    else
                        this.weightedAvg(series, index);
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=1;i<series.spotCount;i++)
                    this.forceIndex(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount > 1)
                    this.forceIndex(series, series.spotCount-1);
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.fi != undefined) {
                        var value=parseFloat(pt.fi);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }

                // Make sure that the zero line is always visible
                if (res.min > 0) res.min=0;
                if (res.max < 0) res.max=0;
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined && pt.fi != undefined)
                    res[this.name]=pt.fi;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1,right;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.fi != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.fi));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                        right=i;
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                if (this.options.fillColor != null) {
                    var base = axisY.toScreen(0);
                    ctx.lineTo(axisX.toScreen(right), base);
                    ctx.lineTo(axisX.toScreen(left), base);
                    ctx.fillStyle=this.options.fillColor;
                    ctx.fill();
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

//        //========================================
//        // IncidentDrawer class
//        //========================================
//
//        function IncidentDrawer(name, selector, width, height, sticky)
//        {
//            this.name=name;
//            this.selector=selector;
//            this.width=width;
//            this.height=height;
//            this.sticky=sticky;
//
//            this.ctr();
//        }
//
//        IncidentDrawer.prototype={
//            className: "IncidentDrawer",
//
//            dataReady: function(series)
//            {
//            },
//
//            dataUpdate: function(series)
//            {
//            },
//
//            require: function(series)
//            {
//                return false;
//            },
//
//            rangeY: function(series, startIndex, endIndex, res)
//            {
//                var incidents=series[this.name];
//                for (var i=0;i<incidents.length;i++)
//                {
//                    var incident=incidents[i];
//                    if (incident.close != undefined)
//                        if (this.sticky || incident.x>=startIndex && incident.x<=endIndex)
//                        {
//                            var value=incident.close;
//                            if (res.min==undefined || value<res.min)
//                                res.min=value;
//                            if (res.max==undefined || value>res.max)
//                                res.max=value;
//                        }
//                }
//            },
//
//            tooltip: function(series, index, res)
//            {
//            },
//
//            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
//            {
//                var startIndex=axisX.startIndex;
//                var endIndex=axisX.endIndex;
//                var w=(this.width/2)|0;
//
//                var incidents=series[this.name];
//                for (var i=incidents.length-1;i>=0;i--)
//                {
//                    var incident=incidents[i];
//
//                    var dx;
//                    if (incident.x>=startIndex && incident.x<=endIndex)
//                        dx=axisX.toScreen(incident.x) - axisX.toScreen(index);
//                    else if (this.sticky)
//                        dx=axisX.toScreen(incident.x<startIndex ? startIndex : endIndex) - axisX.toScreen(index);
//                    else
//                        continue;
//
//                    if (dx<0) dx= -dx;
//                    if (dx<=w)
//                    {
//                        var dy, h;
//                        if (incident.close != undefined)
//                        {
//                            dy=axisY.toScreen(incident.close) - crosshairY;
//                            h=(this.height/2)|0;
//                        }
//                        else
//                        {
//                            dy=axisY.bottom - crosshairY;
//                            h=this.height;
//                        }
//
//                        if (dy<0) dy= -dy;
//                        if (dy<=h)
//                        {
//                            res[this.name]=incident.hint;
//                            break;
//                        }
//                    }
//                }
//            },
//
//            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
//            {
//                var startIndex=axisX.startIndex;
//                var endIndex=axisX.endIndex;
//
//                var half_w=(this.width/2)|0;
//                var half_h=(this.height/2)|0;
//                var n=(this.image.naturalWidth / this.width)|0;
//
//                var incidents=series[this.name];
//                for (var i=0;i<incidents.length;i++)
//                {
//                    var incident=incidents[i];
//                    var icon=incident.icon
//
//                    var x;
//                    if (incident.x>=startIndex && incident.x<=endIndex)
//                        x=axisX.toScreen(incident.x) - half_w;
//                    else if (this.sticky)
//                    {
//                        x=axisX.toScreen(incident.x<startIndex ? startIndex : endIndex) - half_w;
//                        if (incident.icon2 != undefined)
//                            icon=incident.icon2;
//                    }
//                    else
//                        continue;
//
//                    var y;
//                    if (incident.close != undefined)
//                        y=axisY.toScreen(incident.close) - half_h;
//                    else if (axisY.flip)
//                        y=axisY.bottom;
//                    else
//                        y=axisY.bottom - this.height;
//
//                    var sx=icon % n * this.width;
//                    var sy=(icon/n|0) * this.height;
//                    ctx.drawImage(this.image, sx, sy, this.width, this.height, x, y, this.width, this.height);
//                }
//            },
//
//            serialize: function(serObj, ctx)
//            {
//                serObj.selector=this.selector;
//                serObj.width=this.width;
//                serObj.height=this.height;
//                serObj.sticky=this.sticky;
//            },
//
//            deserialize: function(serObj, ctx)
//            {
//                this.selector=serObj.selector;
//                this.width=serObj.width;
//                this.height=serObj.height;
//                this.sticky=serObj.sticky;
//
//                this.image=$(this.selector).get(0);
//            },
//
//            ctr: function()
//            {
//                if (this.selector != undefined)
//                    this.image=$(this.selector).get(0);
//            }
//        };

        //========================================
        // TrendLineEngine class
        //========================================

        function TrendLineEngine(name, color, focusColor, thickness, dash)
        {
            this.name=name;
            this.color=color;
            this.focusColor=focusColor?focusColor:color;
            this.thickness=thickness?thickness:chartFactory.TREND_LINE_THICKNESS;
            this.dash=dash;

            this.focusIndex= -1;
            this.focusSection= -1;
            this.selectIndex= -1;
            this.ctr();
        }

        TrendLineEngine.prototype={
            className: "TrendLineEngine",

            dataReady: function(series)
            {
                if (series.trendLinesSO != undefined)  // Any de-serialized trend lines to process?
                {
                    var trendLinesSO=series.trendLinesSO;
                    var trendLines=[];

                    for (var i=0;i<trendLinesSO.length;i++)
                    {
                        var t=trendLinesSO[i];
                        var x0=series.indexOf(new Date(t.x0));
                        var x1=series.indexOf(new Date(t.x1));
                        if (x0!= -1 && x1!= -1)
                            trendLines.push({
                                x0:x0,
                                y0:t.y0,
                                x1:x1,
                                y1:t.y1,
                                mode:t.mode,
                                color:t.color,
                                focusColor:t.focusColor,
                                thickness:t.thickness,
                                dash:t.dash
                            });
                    }

                    series.trendLines=trendLines;
                    delete series.trendLinesSO;
                }
                else
                {
                    if (series.trendLines==undefined)  // Preserve previously drawn trend lines
                        series.trendLines=[];

                    this.focusIndex= -1;
                    this.selectIndex= -1;
                }
            },

            dataUpdate: function(series)
            {
            },

            dataDiscover: function(series, size)
            {
                var trendLines=series.trendLines;
                for (var i=0;i<trendLines.length;i++)
                {
                    var t=trendLines[i];
                    t.x0 += size;
                    t.x1 += size;
                }
            },

            selectAnnotation: function(series, x, y, axisX, axisY)
            {
                this.selectIndex=this.focusIndex;
                return series.trendLines[this.selectIndex];
            },

            deselectAnnotation: function(series)
            {
                var t=series.trendLines[this.selectIndex];
                this.selectIndex= -1;
                return t;
            },

            getAnnotation: function(series)
            {
                return series.trendLines[this.selectIndex];
            },

            addAnnotation: function(series, x, y, axisX, axisY, mode)
            {
                var i=(x==axisX.startIndex ? x+1 : x-1);
                var a=axisY.fromScreen(y);
                var t={
                    x0:i,
                    y0:a,
                    x1:x,
                    y1:a,
                    mode:mode,
                    color:this.color,
                    focusColor:this.focusColor,
                    thickness:this.thickness,
                    dash:this.dash
                };
                series.trendLines.push(t);

                this.focusIndex=series.trendLines.length - 1;
                this.focusSection=chartFactory.TREND_LINE_TAIL;
                this.selectIndex=this.focusIndex;
                return t;
            },

            moveAnnotation: function(series, srcX, srcY, destX, destY, axisX, axisY)
            {
                var t=series.trendLines[this.selectIndex];
                if (this.focusSection==chartFactory.TREND_LINE_HEAD)
                {
                    // Move head of trend line
                    if (t.x1==destX)
                    {
                        var d=axisY.toScreen(t.y1) - destY;
                        if (d<0) d= -d;
                        if (d<chartFactory.TREND_LINE_MIN_HEIGHT)
                            return false;
                    }
                    t.x0=destX;
                    t.y0=axisY.fromScreen(destY);
                }
                else if (this.focusSection==chartFactory.TREND_LINE_TAIL)
                {
                    // Move tail of trend line
                    if (t.x0==destX)
                    {
                        var d=axisY.toScreen(t.y0) - destY;
                        if (d<0) d= -d;
                        if (d<chartFactory.TREND_LINE_MIN_HEIGHT)
                            return false;
                    }
                    t.x1=destX;
                    t.y1=axisY.fromScreen(destY);
                }
                else
                {
                    // Parallel shift
                    var dx=destX - srcX;
                    var dy=axisY.fromScreenLength(destY - srcY);

                    var i0=t.x0 + dx;
                    var i1=t.x1 + dx;

                    var a0, a1;
                    if (axisY.logScale())
                    {
                        a0=t.y0 / dy;
                        a1=t.y1 / dy;
                    }
                    else
                    {
                        a0=t.y0 - dy;
                        a1=t.y1 - dy;
                    }

                    var n=series.points.length;
                    var b0=a0 * axisY.ratio;
                    var b1=a1 * axisY.ratio;
                    if (i0<0 || i1<0 || i0>=n || i1>=n || b0<axisY.start || b1<axisY.start || b0>axisY.end || b1>axisY.end)
                        return false;

                    t.x0=i0;
                    t.x1=i1;
                    t.y0=a0;
                    t.y1=a1;
                }
                return true;
            },

            deleteAnnotation: function(series)
            {
                var t=series.trendLines[this.selectIndex];
                series.trendLines.splice(this.selectIndex, 1);
                this.focusIndex= -1;
                this.selectIndex= -1;
                return t;
            },

            clearAnnotations: function(series, mode)
            {
                var trendLines=series.trendLines;
                var arr=[];
                for (var i=0;i<trendLines.length;i++)
                {
                    var t=trendLines[i];
                    if (t.mode != mode)
                        arr.push(t);
                }
                series.trendLines=arr;
                this.focusIndex= -1;
                this.selectIndex= -1;
            },

            copyAnnotation: function(series, axisX, axisY)
            {
                var t=series.trendLines[this.selectIndex];
                var gap=axisY.inc/2;
                var res;

                if (t.y0 - gap>=axisY.start && t.y1 - gap>=axisY.start)
                    res={ x0:t.x0, y0:t.y0-gap, x1:t.x1, y1:t.y1-gap, mode:t.mode, color:t.color, focusColor:t.focusColor, thickness:t.thickness, dash:t.dash };
                else if (t.y0 + gap<=axisY.end && t.y1 + gap<=axisY.end)
                    res={ x0:t.x0, y0:t.y0+gap, x1:t.x1, y1:t.y1+gap, mode:t.mode, color:t.color, focusColor:t.focusColor, thickness:t.thickness, dash:t.dash };
                else
                    return null;

                series.trendLines.push(res);
                this.selectIndex=series.trendLines.length - 1;
                return res;
            },

            hitTest: function(series, x, y, axisX, axisY, res)
            {
                if (res.focusEngine != null)  // Some engine has grabbed the focus before me
                {
                    if (this.focusIndex != -1)
                    {
                        res.defocusEngine=this;
                        res.defocusAnnot=series.trendLines[this.focusIndex];
                        this.focusIndex= -1;
                    }
                    return;
                }

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;
                var trendLines=series.trendLines;

                var i=0;
                for (;i<trendLines.length;i++)
                {
                    var t=trendLines[i];
                    var extend=(t.mode==chartFactory.MODE_TREND_LINE_EX);

                    if (t.x0>=startIndex && t.x0<=endIndex)
                    {
                        var dx=axisX.toScreen(t.x0) - axisX.toScreen(x);
                        if (dx<0) dx= -dx;
                        var dy=axisY.toScreen(t.y0) - y;
                        if (dy<0) dy= -dy;
                        if (dx<=chartFactory.TREND_LINE_RADIUS && dy<=chartFactory.TREND_LINE_RADIUS)
                        {
                            this.focusSection=chartFactory.TREND_LINE_HEAD;
                            break;
                        }
                    }

                    if (t.x1>=startIndex && t.x1<=endIndex)
                    {
                        var dx=axisX.toScreen(t.x1) - axisX.toScreen(x);
                        if (dx<0) dx= -dx;
                        var dy=axisY.toScreen(t.y1) - y;
                        if (dy<0) dy= -dy;
                        if (dx<=chartFactory.TREND_LINE_RADIUS && dy<=chartFactory.TREND_LINE_RADIUS)
                        {
                            this.focusSection=chartFactory.TREND_LINE_TAIL;
                            break;
                        }
                    }

                    if (t.x0==t.x1)  // A vertical trend line
                    {
                        if (t.x0>=startIndex && t.x0<=endIndex)
                        {
                            var dx=axisX.toScreen(t.x0) - axisX.toScreen(x);
                            if (dx<0) dx= -dx;
                            if (dx<=chartFactory.TREND_LINE_HIT_DIST)
                            {
                                var a0=axisY.toScreen(t.y0);
                                var a1=axisY.toScreen(t.y1);
                                if (extend || y>=a0 && y<=a1 || y>=a1 && y<=a0)
                                {
                                    this.focusSection=chartFactory.TREND_LINE_BODY;
                                    break;
                                }
                            }
                        }
                    }
                    else if (extend || x>=t.x0 && x<=t.x1 || x>=t.x1 && x<=t.x0)
                    {
                        var a0=axisY.toScreen(t.y0);
                        var a1=axisY.toScreen(t.y1);
                        var dy=extrapolate(t.x0, a0, t.x1, a1, x) - y;
                        if (dy<0) dy= -dy;
                        if (dy<=chartFactory.TREND_LINE_HIT_DIST)
                        {
                            this.focusSection=chartFactory.TREND_LINE_BODY;
                            break;
                        }
                    }
                }

                if (i==trendLines.length)
                    i= -1;
                else
                    res.focusEngine=this;

                if (this.focusIndex != i)
                {
                    if (i== -1)
                    {
                        res.defocusEngine=this;
                        res.defocusAnnot=trendLines[this.focusIndex];
                    }
                    else
                        res.focusAnnot=trendLines[i];
                    this.focusIndex=i;
                }
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                var trendLines=series.trendLines;
                for (var i=0;i<trendLines.length;i++)
                {
                    var t=trendLines[i];
                    if (t.x0>=startIndex && t.x0<=endIndex)
                    {
                        if (res.min==undefined || t.y0<res.min)
                            res.min=t.y0;
                        if (res.max==undefined || t.y0>res.max)
                            res.max=t.y0;
                    }
                    if (t.x1>=startIndex && t.x1<=endIndex)
                    {
                        if (res.min==undefined || t.y1<res.min)
                            res.min=t.y1;
                        if (res.max==undefined || t.y1>res.max)
                            res.max=t.y1;
                    }
                }
            },

            draw: function(series, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;
                var trendLines=series.trendLines;

                for (var j=0;j<trendLines.length;j++)
                {
                    var t=trendLines[j];
                    var extend=(t.mode==chartFactory.MODE_TREND_LINE_EX);
                    var i0, i1, a0, a1;

                    if (extend)
                        if (t.x0==t.x1)  // A vertical extended trend line
                        {
                            if (t.x0<startIndex || t.x0>endIndex)
                                continue;

                            i0=t.x0;
                            i1=t.x0;
                            a0=0;
                            a1=axisY.height;
                        }
                        else
                        {
                            i0=startIndex;
                            i1=startIndex + axisX.colCount - 1;

                            var b0=axisY.toScreen(t.y0);
                            var b1=axisY.toScreen(t.y1);
                            a0=extrapolate(t.x0, b0, t.x1, b1, i0);
                            a1=extrapolate(t.x0, b0, t.x1, b1, i1);

                            if (a0<0 && a1<0 || a0>axisY.height && a1>axisY.height)
                                continue;
                        }
                    else
                        if (t.x0<startIndex && t.x1<startIndex || t.x0>endIndex && t.x1>endIndex)
                            continue;
                        else
                        {
                            i0=t.x0;
                            i1=t.x1;
                            var b0=axisY.toScreen(t.y0);
                            var b1=axisY.toScreen(t.y1);
                            a0=b0;
                            a1=b1;

                            if (t.x0<startIndex)
                            {
                                i0=startIndex;
                                a0=extrapolate(t.x0, b0, t.x1, b1, i0);
                            }
                            else if (t.x1<startIndex)
                            {
                                i1=startIndex;
                                a1=extrapolate(t.x0, b0, t.x1, b1, i1);
                            }

                            if (t.x0>endIndex)
                            {
                                i0=endIndex;
                                a0=extrapolate(t.x0, b0, t.x1, b1, i0);
                            }
                            else if (t.x1>endIndex)
                            {
                                i1=endIndex;
                                a1=extrapolate(t.x0, b0, t.x1, b1, i1);
                            }
                        }

                    ctx.beginPath();
                    ctx.moveTo(axisX.toScreen(i0), a0);
                    ctx.lineTo(axisX.toScreen(i1), a1);
                    ctx.lineWidth=t.thickness?t.thickness:this.thickness;
                    ctx.strokeStyle=(j==this.focusIndex ? t.focusColor : t.color);
                    (t.dash || t.dash==undefined&&this.dash) ? chartFactory.setCTXLineDash(ctx) : chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();
                }

                if (this.selectIndex != -1)
                {
                    var t=trendLines[this.selectIndex];
                    var a0=axisY.toScreen(t.y0);
                    var a1=axisY.toScreen(t.y1);

                    ctx.fillStyle=(this.selectIndex==this.focusIndex ? t.focusColor : t.color);

                    if (t.x0>=startIndex && t.x0<=endIndex)
                    {
                        ctx.beginPath();
                        ctx.arc(axisX.toScreen(t.x0), a0, chartFactory.TREND_LINE_RADIUS, 0, Math.PI*2, true);
                        ctx.fill();
                    }
                    if (t.x1>=startIndex && t.x1<=endIndex)
                    {
                        ctx.beginPath();
                        ctx.arc(axisX.toScreen(t.x1), a1, chartFactory.TREND_LINE_RADIUS, 0, Math.PI*2, true);
                        ctx.fill();
                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.color=this.color;
                serObj.focusColor=this.focusColor;
                serObj.thickness=this.thickness;
                serObj.dash=this.dash;
                serObj.selectIndex=this.selectIndex;

                var trendLines=ctx.series.trendLines;
                var points=ctx.series.points;
                var trendLinesSO=[];

                for (var i=0;i<trendLines.length;i++)
                {
                    var t=trendLines[i];
                    trendLinesSO.push({ x0:    points[t.x0].date,
                                        y0:    t.y0,
                                        x1:    points[t.x1].date,
                                        y1:    t.y1,
                                        mode:  t.mode,
                                        color: t.color,
                                        focusColor: t.focusColor,
                                        thickness: t.thickness,
                                        dash:  t.dash });
                }

                serObj.trendLines=trendLinesSO;
            },

            deserialize: function(serObj, ctx)
            {
                this.color=serObj.color;
                this.focusColor=serObj.focusColor;
                this.thickness=serObj.thickness;
                this.dash=serObj.dash;
                this.selectIndex=serObj.selectIndex;

                // Conversion of dates to indices will be done when the series becomes ready
                ctx.series.trendLinesSO=serObj.trendLines;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // LabelEngine class
        //========================================

        function LabelEngine(name, color, textColor, focusColor, selectColor)
        {
            this.name=name;
            this.color=color;
            this.textColor=textColor;
            this.focusColor=focusColor?focusColor:color;
            this.selectColor=selectColor?selectColor:this.focusColor;

            this.focusIndex= -1;
            this.selectIndex= -1;
            this.ctr();
        }

        LabelEngine.prototype={
            className: "LabelEngine",

            dataReady: function(series)
            {
                if (series.labelsSO != undefined)  // Any de-serialized labels to process?
                {
                    var labelsSO=series.labelsSO;
                    var labels=[];

                    for (var i=0;i<labelsSO.length;i++)
                    {
                        var lb=labelsSO[i];
                        var x=series.indexOf(new Date(lb.x));
                        if (x!= -1)
                            labels.push({
                                x:x,
                                y:lb.y,
                                text:lb.text,
                                body:lb.body,
                                color:lb.color,
                                textColor:lb.textColor,
                                focusColor:lb.focusColor,
                                selectColor:lb.selectColor
                            });
                    }

                    series.labels=labels;
                    delete series.labelsSO;
                }
                else
                {
                    if (series.labels==undefined)  // Preserve previously drawn labels
                        series.labels=[];

                    this.focusIndex= -1;
                    this.selectIndex= -1;
                }
            },

            dataUpdate: function(series)
            {
            },

            dataDiscover: function(series, size)
            {
                var lbs=series.labels;
                for (var i=0;i<lbs.length;i++)
                    lbs[i].x += size;
            },

            selectAnnotation: function(series, x, y, axisX, axisY)
            {
                this.selectIndex=this.focusIndex;
                return series.labels[this.selectIndex];
            },

            deselectAnnotation: function(series)
            {
                var lb=series.labels[this.selectIndex];
                this.selectIndex= -1;
                return lb;
            },

            getAnnotation: function(series)
            {
                return series.labels[this.selectIndex];
            },

            addAnnotation: function(series, x, y, axisX, axisY, mode)
            {
                var lb={
                    x:x,
                    y:axisY.fromScreen(y),
                    text:"A",
                    body:"",
                    color:this.color,
                    textColor:this.textColor,
                    focusColor:this.focusColor,
                    selectColor:this.selectColor,
                };
                series.labels.push(lb);

                this.focusIndex=series.labels.length - 1;
                this.selectIndex=this.focusIndex;
                return lb;
            },

            moveAnnotation: function(series, srcX, srcY, destX, destY, axisX, axisY)
            {
                var lb=series.labels[this.selectIndex];
                lb.x=destX;
                lb.y=axisY.fromScreen(destY);
                return true;
            },

            deleteAnnotation: function(series)
            {
                var lb=series.labels[this.selectIndex];
                series.labels.splice(this.selectIndex, 1);
                this.focusIndex= -1;
                this.selectIndex= -1;
                return lb;
            },

            clearAnnotations: function(series, mode)
            {
                series.labels=[];
                this.focusIndex= -1;
                this.selectIndex= -1;
            },

            copyAnnotation: function(series, axisX, axisY)
            {
                return null;
            },

            hitTest: function(series, x, y, axisX, axisY, res)
            {
                if (res.focusEngine != null)  // Some engine has grabbed the focus before me
                {
                    if (this.focusIndex != -1)
                    {
                        res.defocusEngine=this;
                        res.defocusAnnot=series.labels[this.focusIndex];
                        this.focusIndex= -1;
                    }
                    return;
                }

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;
                var lbs=series.labels;

                var i=0;
                for (;i<lbs.length;i++)
                {
                    var lb=lbs[i];
                    if (lb.x>=startIndex && lb.x<=endIndex)
                    {
                        var dx=axisX.toScreen(lb.x) - axisX.toScreen(x);
                        if (dx<0) dx= -dx;
                        var dy=axisY.toScreen(lb.y) - y;
                        if (dy<0) dy= -dy;
                        if (dx<=chartFactory.LABEL_RADIUS && dy<=chartFactory.LABEL_RADIUS)
                            break;
                    }
                }

                if (i==lbs.length)
                    i= -1;
                else
                    res.focusEngine=this;

                if (this.focusIndex != i)
                {
                    if (i== -1)
                    {
                        res.defocusEngine=this;
                        res.defocusAnnot=lbs[this.focusIndex];
                    }
                    else
                        res.focusAnnot=lbs[i];
                    this.focusIndex=i;
                }
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                var lbs=series.labels;
                for (var i=0;i<lbs.length;i++)
                {
                    var lb=lbs[i];
                    if (lb.x>=startIndex && lb.x<=endIndex)
                    {
                        if (res.min==undefined || lb.y<res.min)
                            res.min=lb.y;
                        if (res.max==undefined || lb.y>res.max)
                            res.max=lb.y;
                    }
                }
            },

            draw: function(series, axisX, axisY, ctx)
            {
                ctx.textBaseline="middle";
                ctx.textAlign="center";

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;
                var lbs=series.labels;

                for (var i=0;i<lbs.length;i++)
                {
                    var lb=lbs[i];
                    if (lb.x>=startIndex && lb.x<=endIndex)
                    {
                        var a=axisY.toScreen(lb.y);
                        ctx.beginPath();
                        ctx.fillStyle=(i==this.focusIndex ? lb.focusColor : lb.color);
                        ctx.arc(axisX.toScreen(lb.x), a, chartFactory.LABEL_RADIUS, 0, Math.PI*2, true);
                        ctx.fill();

                        if (i==this.selectIndex)
                        {
                            ctx.beginPath();
                            ctx.fillStyle=lb.selectColor;
                            ctx.arc(axisX.toScreen(lb.x), a, chartFactory.LABEL_RADIUS-3, 0, Math.PI*2, true);
                            ctx.fill();
                        }

                        ctx.fillStyle=lb.textColor;
                        ctx.fillText(lb.text, axisX.toScreen(lb.x), a);
                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.color=this.color;
                serObj.textColor=this.textColor;
                serObj.focusColor=this.focusColor;
                serObj.selectColor=this.selectColor;
                serObj.selectIndex=this.selectIndex;

                var lbs=ctx.series.labels;
                var points=ctx.series.points;
                var labelsSO=[];

                for (var i=0;i<lbs.length;i++)
                {
                    var lb=lbs[i];
                    labelsSO.push({ x:     points[lb.x].date,
                                    y:     lb.y,
                                    text:  lb.text,
                                    body:  lb.body,
                                    color: lb.color });
                }

                serObj.labels=labelsSO;
            },

            deserialize: function(serObj, ctx)
            {
                this.color=serObj.color;
                this.textColor=serObj.textColor;
                this.focusColor=serObj.focusColor;
                this.selectColor=serObj.selectColor;
                this.selectIndex=serObj.selectIndex;

                // Conversion of dates to indices will be done when the series becomes ready
                ctx.series.labelsSO=serObj.labels;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // FibonacciEngine class
        //========================================

        function FibonacciEngine(name, color, baseLineColor, textColor, focusColor, thickness, dash)
        {
            this.name=name;
            this.color=color;
            this.baseLineColor=baseLineColor;
            this.textColor=textColor;
            this.focusColor=focusColor?focusColor:color;
            this.thickness=thickness?thickness:chartFactory.FIBONACCI_THICKNESS;
            this.dash=dash;

            this.focusIndex= -1;
            this.focusSection= -1;
            this.selectIndex= -1;
            this.ctr();
        }

        FibonacciEngine.prototype={
            className: "FibonacciEngine",

            dataReady: function(series)
            {
                if (series.fibonaccisSO != undefined)  // Any de-serialized Fibonacci(s) to process?
                {
                    var fibonaccisSO=series.fibonaccisSO;
                    var fibonaccis=[];

                    for (var i=0;i<fibonaccisSO.length;i++)
                    {
                        var f=fibonaccisSO[i];
                        var x0=series.indexOf(new Date(f.x0));
                        var x1=series.indexOf(new Date(f.x1));
                        if (x0!= -1 && x1!= -1)
                            fibonaccis.push({
                                x0:x0,
                                y0:f.y0,
                                x1:x1,
                                y1:f.y1,
                                mode:f.mode,
                                color:f.color,
                                focusColor:f.focusColor,
                                thickness:f.thickness,
                                dash:f.dash,
                                baseLineColor:f.baseLineColor,
                                textColor:f.textColor
                            });
                    }

                    series.fibonaccis=fibonaccis;
                    delete series.fibonaccisSO;
                }
                else
                {
                    if (series.fibonaccis==undefined)  // Preserve previously drawn Fibonacci(s)
                        series.fibonaccis=[];

                    this.focusIndex= -1;
                    this.selectIndex= -1;
                }
            },

            dataUpdate: function(series)
            {
            },

            dataDiscover: function(series, size)
            {
                var fibonaccis=series.fibonaccis;
                for (var i=0;i<fibonaccis.length;i++)
                {
                    var f=fibonaccis[i];
                    f.x0 += size;
                    f.x1 += size;
                }
            },

            selectAnnotation: function(series, x, y, axisX, axisY)
            {
                this.selectIndex=this.focusIndex;
                return series.fibonaccis[this.selectIndex];
            },

            deselectAnnotation: function(series)
            {
                var f=series.fibonaccis[this.selectIndex];
                this.selectIndex= -1;
                return f;
            },

            getAnnotation: function(series)
            {
                return series.fibonaccis[this.selectIndex];
            },

            addAnnotation: function(series, x, y, axisX, axisY, mode)
            {
                var i=(x==axisX.startIndex ? x+1 : x-1);
                var a=axisY.fromScreen(y);
                var f={
                    x0:i,
                    y0:a,
                    x1:x,
                    y1:a,
                    mode:mode,
                    color:this.color,
                    focusColor:this.focusColor,
                    thickness:this.thickness,
                    dash:this.dash,
                    baseLineColor:this.baseLineColor,
                    textColor:this.textColor
                };
                series.fibonaccis.push(f);

                this.focusIndex=series.fibonaccis.length - 1;
                this.focusSection=chartFactory.TREND_LINE_TAIL;
                this.selectIndex=this.focusIndex;
                return f;
            },

            moveAnnotation: function(series, srcX, srcY, destX, destY, axisX, axisY)
            {
                var f=series.fibonaccis[this.selectIndex];
                if (this.focusSection==chartFactory.TREND_LINE_HEAD)
                {
                    // Move head of trend line
                    if (f.x1==destX)
                    {
                        var d=axisY.toScreen(f.y1) - destY;
                        if (d<0) d= -d;
                        if (d<chartFactory.TREND_LINE_MIN_HEIGHT)
                            return false;
                    }
                    f.x0=destX;
                    f.y0=axisY.fromScreen(destY);
                }
                else if (this.focusSection==chartFactory.TREND_LINE_TAIL)
                {
                    // Move tail of trend line
                    if (f.x0==destX)
                    {
                        var d=axisY.toScreen(f.y0) - destY;
                        if (d<0) d= -d;
                        if (d<chartFactory.TREND_LINE_MIN_HEIGHT)
                            return false;
                    }
                    f.x1=destX;
                    f.y1=axisY.fromScreen(destY);
                }
                else
                {
                    // Parallel shift
                    var dx=destX - srcX;
                    var dy=axisY.fromScreenLength(destY - srcY);

                    var i0=f.x0 + dx;
                    var i1=f.x1 + dx;

                    var a0, a1;
                    if (axisY.logScale())
                    {
                        a0=f.y0 / dy;
                        a1=f.y1 / dy;
                    }
                    else
                    {
                        a0=f.y0 - dy;
                        a1=f.y1 - dy;
                    }

                    var n=series.points.length;
                    var b0=a0 * axisY.ratio;
                    var b1=a1 * axisY.ratio;
                    if (i0<0 || i1<0 || i0>=n || i1>=n || b0<axisY.start || b1<axisY.start || b0>axisY.end || b1>axisY.end)
                        return false;

                    f.x0=i0;
                    f.x1=i1;
                    f.y0=a0;
                    f.y1=a1;
                }
                return true;
            },

            deleteAnnotation: function(series)
            {
                var f=series.fibonaccis[this.selectIndex];
                series.fibonaccis.splice(this.selectIndex, 1);
                this.focusIndex= -1;
                this.selectIndex= -1;
                return f;
            },

            clearAnnotations: function(series, mode)
            {
                var fibonaccis=series.fibonaccis;
                var arr=[];
                for (var i=0;i<fibonaccis.length;i++)
                {
                    var f=fibonaccis[i];
                    if (f.mode != mode)
                        arr.push(f);
                }
                series.fibonaccis=arr;
                this.focusIndex= -1;
                this.selectIndex= -1;
            },

            copyAnnotation: function(series, axisX, axisY)
            {
                return null;
            },

            hitTest: function(series, x, y, axisX, axisY, res)
            {
                if (res.focusEngine != null)  // Some engine has grabbed the focus before me
                {
                    if (this.focusIndex != -1)
                    {
                        res.defocusEngine=this;
                        res.defocusAnnot=series.fibonaccis[this.focusIndex];
                        this.focusIndex= -1;
                    }
                    return;
                }

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;
                var fibonaccis=series.fibonaccis;

                var i=0;
                for (;i<fibonaccis.length;i++)
                {
                    var f=fibonaccis[i];
                    if (f.x0>=startIndex && f.x0<=endIndex)
                    {
                        var dx=axisX.toScreen(f.x0) - axisX.toScreen(x);
                        if (dx<0) dx= -dx;
                        var dy=axisY.toScreen(f.y0) - y;
                        if (dy<0) dy= -dy;
                        if (dx<=chartFactory.TREND_LINE_RADIUS && dy<=chartFactory.TREND_LINE_RADIUS)
                        {
                            this.focusSection=chartFactory.TREND_LINE_HEAD;
                            break;
                        }
                    }

                    if (f.x1>=startIndex && f.x1<=endIndex)
                    {
                        var dx=axisX.toScreen(f.x1) - axisX.toScreen(x);
                        if (dx<0) dx= -dx;
                        var dy=axisY.toScreen(f.y1) - y;
                        if (dy<0) dy= -dy;
                        if (dx<=chartFactory.TREND_LINE_RADIUS && dy<=chartFactory.TREND_LINE_RADIUS)
                        {
                            this.focusSection=chartFactory.TREND_LINE_TAIL;
                            break;
                        }
                    }

                    if (f.x0==f.x1)  // A vertical trend line
                    {
                        if (f.x0>=startIndex && f.x0<=endIndex)
                        {
                            var dx=axisX.toScreen(f.x0) - axisX.toScreen(x);
                            if (dx<0) dx= -dx;
                            if (dx<=chartFactory.TREND_LINE_HIT_DIST)
                            {
                                var a0=axisY.toScreen(f.y0);
                                var a1=axisY.toScreen(f.y1);
                                if (y>=a0 && y<=a1 || y>=a1 && y<=a0)
                                {
                                    this.focusSection=chartFactory.TREND_LINE_BODY;
                                    break;
                                }
                            }
                        }
                    }
                    else if (x>=f.x0 && x<=f.x1 || x>=f.x1 && x<=f.x0)
                    {
                        var a0=axisY.toScreen(f.y0);
                        var a1=axisY.toScreen(f.y1);
                        var dy=extrapolate(f.x0, a0, f.x1, a1, x) - y;
                        if (dy<0) dy= -dy;
                        if (dy<=chartFactory.TREND_LINE_HIT_DIST)
                        {
                            this.focusSection=chartFactory.TREND_LINE_BODY;
                            break;
                        }
                    }
                }

                if (i==fibonaccis.length)
                    i= -1;
                else
                    res.focusEngine=this;

                if (this.focusIndex != i)
                {
                    if (i== -1)
                    {
                        res.defocusEngine=this;
                        res.defocusAnnot=fibonaccis[this.focusIndex];
                    }
                    else
                        res.focusAnnot=fibonaccis[i];
                    this.focusIndex=i;
                }
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                var fibonaccis=series.fibonaccis;
                for (var i=0;i<fibonaccis.length;i++)
                {
                    var f=fibonaccis[i];
                    if (f.x0>=startIndex && f.x0<=endIndex)
                    {
                        if (res.min==undefined || f.y0<res.min)
                            res.min=f.y0;
                        if (res.max==undefined || f.y0>res.max)
                            res.max=f.y0;
                    }
                    if (f.x1>=startIndex && f.x1<=endIndex)
                    {
                        if (res.min==undefined || f.y1<res.min)
                            res.min=f.y1;
                        if (res.max==undefined || f.y1>res.max)
                            res.max=f.y1;
                    }
                }
            },

            draw: function(series, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;
                var fibonaccis=series.fibonaccis;

                for (var j=0;j<fibonaccis.length;j++)
                {
                    var f=fibonaccis[j];
                    if (f.x0<startIndex && f.x1<startIndex || f.x0>endIndex && f.x1>endIndex)
                        continue;

                    // Base line
                    var i0=f.x0;
                    var i1=f.x1;
                    var b0=axisY.toScreen(f.y0);
                    var b1=axisY.toScreen(f.y1);
                    var a0=b0;
                    var a1=b1;

                    if (f.x0<startIndex)
                    {
                        i0=startIndex;
                        a0=extrapolate(f.x0, b0, f.x1, b1, i0);
                    }
                    else if (f.x1<startIndex)
                    {
                        i1=startIndex;
                        a1=extrapolate(f.x0, b0, f.x1, b1, i1);
                    }

                    if (f.x0>endIndex)
                    {
                        i0=endIndex;
                        a0=extrapolate(f.x0, b0, f.x1, b1, i0);
                    }
                    else if (f.x1>endIndex)
                    {
                        i1=endIndex;
                        a1=extrapolate(f.x0, b0, f.x1, b1, i1);
                    }

                    ctx.beginPath();
                    ctx.moveTo(axisX.toScreen(i0), a0);
                    ctx.lineTo(axisX.toScreen(i1), a1);
                    ctx.lineWidth=chartFactory.TREND_LINE_THICKNESS;
                    ctx.strokeStyle=(j==this.focusIndex ? f.focusColor : f.baseLineColor);
                    chartFactory.setCTXLineDash(ctx);
                    ctx.stroke();
                    chartFactory.unsetCTXLineDash(ctx);

                    if (i0==f.x0 && i1==f.x1 && i0!=i1 && a0!=a1)
                    {
                        if (i0>i1)
                        {
                            var tmp;
                            tmp=i0; i0=i1; i1=tmp;
                            tmp=a0; a0=a1; a1=tmp;
                        }

                        ctx.lineWidth=f.thickness?f.thickness:this.thickness;
                        ctx.strokeStyle=(j==this.focusIndex ? f.focusColor : f.color);
                        (f.dash || f.dash==undefined&&this.dash) ? chartFactory.setCTXLineDash(ctx) : chartFactory.unsetCTXLineDash(ctx);
                        ctx.fillStyle=(j==this.focusIndex ? f.focusColor : f.textColor);

                        if (f.mode==chartFactory.MODE_FIB_RETRACE)
                        {
                            var i2=startIndex + axisX.colCount - 1;
                            var a2=[];
                            a2[0]=a1-(a1-a0)*0.382;
                            a2[1]=a1-(a1-a0)*0.5;
                            a2[2]=a1-(a1-a0)*0.618;

                            ctx.beginPath();
                            ctx.moveTo(axisX.toScreen(i0), a2[0]);
                            ctx.lineTo(axisX.toScreen(i2), a2[0]);
                            ctx.moveTo(axisX.toScreen(i0), a2[1]);
                            ctx.lineTo(axisX.toScreen(i2), a2[1]);
                            ctx.moveTo(axisX.toScreen(i0), a2[2]);
                            ctx.lineTo(axisX.toScreen(i2), a2[2]);
                            ctx.stroke();

                            ctx.textAlign="center";
                            ctx.textBaseline="bottom";
                            ctx.fillText("38.2%", axisX.toScreen(i1), a2[0]);
                            ctx.fillText("50%", axisX.toScreen(i1), a2[1]);
                            ctx.fillText("61.8%", axisX.toScreen(i1), a2[2]);
                        }
                        else if (f.mode==chartFactory.MODE_FIB_FANS)
                        {
                            var i2=startIndex + axisX.colCount - 1;
                            var a2=[], c1=[];
                            c1[0]=a1-(a1-a0)*0.382;
                            c1[1]=a1-(a1-a0)*0.5;
                            c1[2]=a1-(a1-a0)*0.618;
                            a2[0]=extrapolate(i0, a0, i1, c1[0], i2);
                            a2[1]=extrapolate(i0, a0, i1, c1[1], i2);
                            a2[2]=extrapolate(i0, a0, i1, c1[2], i2);

                            ctx.beginPath();
                            ctx.moveTo(axisX.toScreen(i0), a0);
                            ctx.lineTo(axisX.toScreen(i2), a2[0]);
                            ctx.moveTo(axisX.toScreen(i0), a0);
                            ctx.lineTo(axisX.toScreen(i2), a2[1]);
                            ctx.moveTo(axisX.toScreen(i0), a0);
                            ctx.lineTo(axisX.toScreen(i2), a2[2]);
                            ctx.stroke();

                            ctx.textAlign="left";
                            ctx.textBaseline=(a1>a0 ? "bottom" : "top");
                            ctx.fillText("38.2%", axisX.toScreen(i1), c1[0]);
                            ctx.fillText("50%", axisX.toScreen(i1), c1[1]);
                            ctx.fillText("61.8%", axisX.toScreen(i1), c1[2]);
                        }
                        else if (f.mode==chartFactory.MODE_FIB_ARCS)
                        {
                            var cx=axisX.toScreen(i1);
                            var cy=a1;
                            var anticlockwise=(a1>a0);
                            var d=distanceBetween(axisX.toScreen(i0), a0, axisX.toScreen(i1), a1);

                            ctx.beginPath();
                            ctx.arc(cx, cy, d*0.382, 0, Math.PI, anticlockwise);
                            ctx.moveTo(cx + d*0.5, cy);
                            ctx.arc(cx, cy, d*0.5, 0, Math.PI, anticlockwise);
                            ctx.moveTo(cx + d*0.618, cy);
                            ctx.arc(cx, cy, d*0.618, 0, Math.PI, anticlockwise);
                            ctx.stroke();

                            if (a1<a0) d= -d;

                            ctx.textAlign="center";
                            ctx.textBaseline=(a1>a0 ? "bottom" : "top");
                            ctx.fillText("38.2%", cx, a1-d*0.382);
                            ctx.fillText("50%",   cx, a1-d*0.5);
                            ctx.fillText("61.8%", cx, a1-d*0.618);
                        }
                    }
                }

                if (this.selectIndex != -1)
                {
                    var f=fibonaccis[this.selectIndex];
                    var a0=axisY.toScreen(f.y0);
                    var a1=axisY.toScreen(f.y1);

                    ctx.fillStyle=(this.selectIndex==this.focusIndex ? f.focusColor : f.baseLineColor);

                    if (f.x0>=startIndex && f.x0<=endIndex)
                    {
                        ctx.beginPath();
                        ctx.arc(axisX.toScreen(f.x0), a0, chartFactory.TREND_LINE_RADIUS, 0, Math.PI*2, true);
                        ctx.fill();
                    }
                    if (f.x1>=startIndex && f.x1<=endIndex)
                    {
                        ctx.beginPath();
                        ctx.arc(axisX.toScreen(f.x1), a1, chartFactory.TREND_LINE_RADIUS, 0, Math.PI*2, true);
                        ctx.fill();
                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.selectIndex=this.selectIndex;
                serObj.color=this.color;
                serObj.baseLineColor=this.baseLineColor;
                serObj.textColor=this.textColor;
                serObj.focusColor=this.focusColor;
                serObj.thickness=this.thickness;
                serObj.dash=this.dash;
                serObj.selectIndex=this.selectIndex;

                var fibonaccis=ctx.series.fibonaccis;
                var points=ctx.series.points;
                var fibonaccisSO=[];

                for (var i=0;i<fibonaccis.length;i++)
                {
                    var f=fibonaccis[i];
                    fibonaccisSO.push({ x0:            points[f.x0].date,
                                        y0:            f.y0,
                                        x1:            points[f.x1].date,
                                        y1:            f.y1,
                                        mode:          f.mode,
                                        color:         f.color,
                                        focusColor:    f.focusColor,
                                        thickness:     f.thickness,
                                        dash:          f.dash,
                                        baseLineColor: f.baseLineColor,
                                        textColor:     f.textColor });
                }

                serObj.fibonaccis=fibonaccisSO;
            },

            deserialize: function(serObj, ctx)
            {
                this.selectIndex=serObj.selectIndex;
                this.color=serObj.color;
                this.baseLineColor=serObj.baseLineColor;
                this.textColor=serObj.textColor;
                this.focusColor=serObj.focusColor;
                this.thickness=serObj.thickness;
                this.dash=serObj.dash;
                this.selectIndex=serObj.selectIndex;

                // Conversion of dates to indices will be done when the series becomes ready
                ctx.series.fibonaccisSO=serObj.fibonaccis;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // AxisY structure
        //========================================

        function AxisY()
        {
            this.flip=false;
            this.sharp=0.5;
            this.log=false;
            this.ratio=1;
            this.shrink=0;
        }

        AxisY.prototype={

            // Helper functions

            logScale: function()
            {
                return (this.log && this.start>0);
            },

            toScreen: function(p, /* optional */ ratio)
            {
                if (ratio==undefined) ratio=this.ratio;

                var y;
                if (this.logScale())
                    y=(this.height * Math.log(p * ratio / this.start) / Math.log(this.end / this.start))|0;
                else
                    y=(this.height * (p * ratio - this.start) / (this.end - this.start))|0;

                return (this.flip ? y : this.height-y);
            },

            fromScreen: function(y, /* optional */ ratio)
            {
                if (!this.flip) y=this.height-y;
                if (ratio==undefined) ratio=this.ratio;

                if (this.logScale())
                    return Math.pow(this.end / this.start, y / this.height) * this.start / ratio;
                else
                    return (y*(this.end - this.start)/this.height + this.start) / ratio;
            },

            fromScreenLength: function(n)
            {
                if (this.flip) n= -n;
                if (this.logScale())
                    return Math.pow(this.end / this.start, n / this.height);
                else
                    return n*(this.end - this.start)/(this.height * this.ratio);
            }
        };

        //========================================
        // PriceChart class
        //========================================

        function PriceChart(name, width, height, selector, parent,
                            gridStyle, gridType, crosshairStyle, shiftType, joinDataURL,
                            crosshairFunc, tooltipFunc, tradeHintFunc, dateRangeFunc, annotEvtFunc, caller, isCrosshair)
        {
            this.name=name;
            this.width=width;
            this.height=height;
            this.selector=selector;
            this.parent=parent;

            this.gridStyle=(gridStyle==undefined ? chartFactory.GRID_LABEL_X|chartFactory.GRID_LABEL_Y|chartFactory.GRID_DIMINUTIVE : gridStyle);
            this.gridType=(gridType==undefined ? chartFactory.GRID_DATE_EVEN : gridType);
            this.crosshairStyle=(crosshairStyle==undefined ? chartFactory.CROSSHAIR_HORIZONTAL|chartFactory.CROSSHAIR_VERTICAL : crosshairStyle);
            this.shiftType=(shiftType==undefined ? chartFactory.SHIFT_TO_LAST : shiftType);
            this.joinDataURL=(joinDataURL==undefined ? true : joinDataURL);
            this.crosshairFunc=crosshairFunc;
            this.tooltipFunc=tooltipFunc;
            this.tradeHintFunc=tradeHintFunc;
            this.dateRangeFunc=dateRangeFunc;
            this.annotEvtFunc=annotEvtFunc;
            this.caller=(caller==undefined ? this : caller);
            this.isCrosshair = (isCrosshair==undefined ? true : false);          

            this.canvas=null;
            this.ctx=null;
            this.displayRatio=1;  // For hi-res display
            this.bottomMargin=((this.gridStyle & chartFactory.GRID_LABEL_X)>0 ? chartFactory.BOTTOM_MARGIN : chartFactory.BOTTOM_MARGIN_THIN);
            this.series=null;
            this.drawers=[];
            this.overlayCount=0;
            this.engines=[];      // Annotation engines
            this.engineMap={};    // Mode -> Annotation engine
            this.focusEngine=null;
            this.actionEngine=null;
            this.htres={};        // Hit test results
            this.startDate=null;
            this.endDate=null;
            this.active=false;
            this.axisX={
                // Helper functions
                toScreen: function(i) { return (i-this.startIndex+0.5)*this.colWidth|0; },
                toBorder: function(i) { return (i-this.startIndex)*this.colWidth|0; },
                fromScreen: function(x) {
                    for (var i=this.startIndex+(x/this.colWidth|0); i<this.endIndex; i++)
                    {
                        var next=(i-this.startIndex+1)*this.colWidth|0;
                        if (x<next) return i;
                    }
                    return this.endIndex;
                }
            };
            this.axisY=new AxisY();
            this.axisV=new AxisY();  // Y-axis on the left
            this.gridScale=chartFactory.GRID_SCALE_AUTO;
            this.fixedScaleStart=0;
            this.fixedScaleEnd=0;
            this.trackers=[];
            this.crosshairX= -1;
            this.crosshairY= -1;
            this.dash=false;
            this.drag2Slide=false;
            this.drag2ZoomX=false;
            this.drag2ZoomY=false;
            this.drag2ZoomV=false;
            this.dragX= -1;
            this.dragY= -1;
            this.touchTime= -1;
            this.touchX= -1;
            this.touchY= -1;
            this.mode=chartFactory.MODE_NORMAL;


            this.ctr();
        }

        PriceChart.prototype={
            className: "PriceChart",

            attach: function(canvas)
            {
                this.canvas=canvas;
                this.ctx=canvas.get(0).getContext("2d");

                var devRatio=window.devicePixelRatio || 1;                 // IE 10 doesn't have this property
                var bkStoreRatio=this.ctx.webkitBackingStorePixelRatio || 1;
                var ratio=devRatio / bkStoreRatio;
                if (ratio != 1)
                {
                    canvas.get(0).width=this.width * ratio;                // Expand the canvas coordinate system ...
                    canvas.get(0).height=this.height * ratio;
                    canvas.css({ width:this.width, height:this.height });  // ... and put the canvas in the desired HTML box
                    this.ctx.scale(ratio, ratio);                          // Finally, scale up everything to create the original drawing
                }
                this.displayRatio=ratio;

                //CUSTOM...supprot static chart...
                if(this.isCrosshair != false){
                    canvas.mousemove(this, this._mousemove);
                    canvas.mousedown(this, this._mousedown);
                    canvas.mouseup(this, this._mouseup);
                    canvas.mouseout(this, this._mouseout);
                    canvas.click(this, this._mouseclick);

                    canvas.keydown(this, this._keydown);

                    canvas.on("touchstart", this, this._touchstart);
                    canvas.on("touchmove", this, this._touchmove);
                    canvas.on("touchend", this, this._touchend);
                    canvas.on("touchcancel", this, this._touchcancel);  
}

            },

            data: function(series)
            {
                if (series==undefined)
                    return this.series;
                else if (series != this.series)
                {
                    if (series.ready)
                    {
                        for (var i=0;i<this.drawers.length;i++)
                            this.drawers[i].obj.dataReady(series);
                        for (var i=0;i<this.engines.length;i++)
                            this.engines[i].dataReady(series);
                    }

                    this.series=series;
                    this.startDate=null;
                    this.endDate=null;
                    this.crosshairX= -1;
                    this.crosshairY= -1;
                    if (this.gridScale==chartFactory.GRID_SCALE_FREE)
                        this.gridScale=chartFactory.GRID_SCALE_AUTO;

                    this.active=false;
                    this.draw(chartFactory.REASON_BLANK);
                }
            },

            addDrawer: function(drawer, overlay, zOrder)
            {
                // Drawers sorted by their z-order
                if (zOrder===undefined) zOrder = chartFactory.DEF_Z_ORDER;
                if (overlay===undefined) overlay = false;

                var i;
                for (i=this.drawers.length-1; i>=0; i--)
                    if (zOrder>=this.drawers[i].zOrder)
                        break;
                this.drawers.splice(i+1, 0, { overlay:overlay, zOrder:zOrder, visible:true, obj:drawer });

                if (overlay)
                    this.overlayCount++;
                if (this.series != null && this.series.ready)
                    drawer.dataReady(this.series);
                if (this.active)
                    this.draw(chartFactory.REASON_DRAWER_CHANGE);

                return drawer;
            },

            removeDrawer: function(name)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                    {
                        if (this.drawers[i].overlay)
                            this.overlayCount--;
                        this.drawers.splice(i,1);
                        if (this.active)
                            this.draw(chartFactory.REASON_DRAWER_CHANGE);
                        break;
                    }
            },

            removeAllDrawers: function()
            {
                this.drawers=[];
                this.overlayCount=0;
                if (this.active)
                    this.draw(chartFactory.REASON_DRAWER_CHANGE);
            },

            showDrawer: function(name, visible)
            {
                for (var i=0;i<this.drawers.length;i++)
                {
                    var env=this.drawers[i];
                    if (env.obj.name==name)
                    {
                        if (env.visible != visible)
                        {
                            env.visible=visible;
                            if (this.active)
                                this.draw(chartFactory.REASON_DRAWER_CHANGE);
                        }
                        break;
                    }
                }
            },

            getDrawer: function(name)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return this.drawers[i].obj;
                return null;
            },

            addLine: function(color, fillColor, fillColor2, blazeColor, zOrder, blazeRadius, thickness, style)
            {
                return this.addLine2({
                    color: color,
                    fillColor: fillColor,
                    fillColor2: fillColor2,
                    thickness: thickness,
                    style: style,
                    blazeColor: blazeColor,
                    blazeRadius: blazeRadius
                }, zOrder);
            },
            addLine2: function(styleobj, zOrder)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.SIMPLE_LINE)
                        return null;
                return this.addDrawer(new SimpleLineDrawer(chartFactory.SIMPLE_LINE, styleobj), false, zOrder);
            },

            removeLine: function()
            {
                this.removeDrawer(chartFactory.SIMPLE_LINE);
            },

            addVolume: function(options)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.VOLUME)
                        return null;
                return this.addDrawer(new VolumeDrawer(chartFactory.VOLUME, options));
            },

            removeVolume: function()
            {
                this.removeDrawer(chartFactory.VOLUME);
            },

            addCandlestick: function(upColor, upFillColor, downColor, downFillColor, zOrder)
            {
                return this.addCandlestick2({
                    upColor: upColor,
                    upFillColor: upFillColor,
                    downColor: downColor,
                    downFillColor: downFillColor
                }, zOrder);
            },
            addCandlestick2: function(styleobj, zOrder)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.CANDLESTICK)
                        return null;
                return this.addDrawer(new CandlestickDrawer(chartFactory.CANDLESTICK, styleobj), false, zOrder);
            },

            removeCandlestick: function()
            {
                this.removeDrawer(chartFactory.CANDLESTICK);
            },

            addOHLC: function(upColor, downColor, zOrder)
            {
                return this.addOHLC2({
                    upColor: upColor,
                    downColor: downColor
                }, zOrder);
            },
            addOHLC2: function(styleobj, zOrder)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.OHLC)
                        return null;
                return this.addDrawer(new OHLCDrawer(chartFactory.OHLC, styleobj), false, zOrder);
            },

            removeOHLC: function()
            {
                this.removeDrawer(chartFactory.OHLC);
            },

            addSMA: function(options, zOrder)
            {
                var name=chartFactory.SMA + "_" + options.period;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                options.method=chartFactory.MA_SMA;
                return this.addDrawer(new MADrawer(name, options), false, zOrder);
            },

            removeSMA: function(options)
            {
                this.removeDrawer(chartFactory.SMA + "_" + options.period);
            },

            addEMA: function(options, zOrder)
            {
                var name=chartFactory.EMA + "_" + options.period;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                options.method=chartFactory.MA_EMA;
                return this.addDrawer(new MADrawer(name, options), false, zOrder);
            },

            removeEMA: function(options)
            {
                this.removeDrawer(chartFactory.EMA + "_" + options.period);
            },

            addMEMA: function(options, zOrder)
            {
                var name=chartFactory.MEMA + "_" + options.period;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                options.method=chartFactory.MA_MEMA;
                return this.addDrawer(new MADrawer(name, options), false, zOrder);
            },

            removeMEMA: function(options)
            {
                this.removeDrawer(chartFactory.MEMA + "_" + options.period);
            },

            addWMA: function(options, zOrder)
            {
                var name=chartFactory.WMA + "_" + options.period;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                options.method=chartFactory.MA_WMA;
                return this.addDrawer(new MADrawer(name, options), false, zOrder);
            },

            removeWMA: function(options)
            {
                this.removeDrawer(chartFactory.WMA + "_" + options.period);
            },

            addMomentum: function(options)
            {
                var name=chartFactory.MOMENTUM;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new MomentumDrawer(name, options));
            },

            removeMomentum: function()
            {
                this.removeDrawer(chartFactory.MOMENTUM);
            },

            addRSI: function(options)
            {
                var name=chartFactory.RSI + "_" + options.method + "_" + options.period;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new RSIDrawer(name, options));
            },

            removeRSI: function(options)
            {
                this.removeDrawer(chartFactory.RSI + "_" + options.method + "_" + options.period);
            },

            addRCI: function(options)
            {
                var name=chartFactory.RCI;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new RCIDrawer(name, options));
            },

            removeRCI: function()
            {
                this.removeDrawer(chartFactory.RCI);
            },

            addCCI: function(options)
            {
                var name=chartFactory.CCI;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new CCIDrawer(name, options));
            },

            removeCCI: function()
            {
                this.removeDrawer(chartFactory.CCI);
            },

            addUO: function(options)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.UO)
                        return null;
                return this.addDrawer(new UODrawer(chartFactory.UO, options));
            },

            removeUO: function()
            {
                this.removeDrawer(chartFactory.UO);
            },

            addMACD: function(options)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.MACD)
                        return null;
                return this.addDrawer(new MACDDrawer(chartFactory.MACD, options));
            },

            removeMACD: function()
            {
                this.removeDrawer(chartFactory.MACD);
            },

            addIchimoku: function(options, zOrder)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.ICHIMOKU)
                        return null;
                return this.addDrawer(new IchimokuDrawer(chartFactory.ICHIMOKU, options), false, zOrder);
            },

            removeIchimoku: function()
            {
                this.removeDrawer(chartFactory.ICHIMOKU);
            },

            addComparison: function(ref, overlay, color, blazeColor, zOrder, blazeRadius, thickness, style)  // "ref" is reference series or null, "base" can be -2, -1, 0 or 100
            {
                return this.addComparison2(ref, overlay, {
                    color: color,
                    thickness: thickness,
                    style: style,
                    blazeColor: blazeColor,
                    blazeRadius: blazeRadius
                }, zOrder);
            },
            addComparison2: function(ref, overlay, styleobj, zOrder)
            {
                var name=chartFactory.COMPARISON;
                if (ref != null)
                {
                    name += "_";
                    name += ref.name;
                }
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new CmpDrawer(name, ref, styleobj), overlay, zOrder);
            },

            removeComparison: function(ref)
            {
                var name=chartFactory.COMPARISON;
                if (ref != null)
                {
                    name += "_";
                    name += ref.name;
                }
                this.removeDrawer(name);
            },

            addBaseComparison: function(base, color, blazeColor, zOrder, blazeRadius, thickness, style)
            {
                return this.addBaseComparison2(base, {
                    color: color,
                    thickness: thickness,
                    style: style,
                    blazeColor: blazeColor,
                    blazeRadius: blazeRadius
                }, zOrder);
            },
            addBaseComparison2: function(base, styleobj, zOrder)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.BASE_COMPARISON)
                        return null;
                return this.addDrawer(new CmpBaseDrawer(chartFactory.BASE_COMPARISON, base, styleobj), false, zOrder);
            },

            removeBaseComparison: function()
            {
                this.removeDrawer(chartFactory.BASE_COMPARISON);
            },

            addVolByPrice: function(options, zOrder)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.VOL_BY_PRICE)
                        return null;
                return this.addDrawer(new VolByPriceDrawer(chartFactory.VOL_BY_PRICE, options), false, zOrder);
            },

            removeVolByPrice: function(options)
            {
                this.removeDrawer(chartFactory.VOL_BY_PRICE);
            },

            addFastStochastic: function(options)
            {
                options.periodF=null; // set periodF=null, hence a fast stochastic, meaning no extra smoothing over the %K and %D
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.STOCHASTIC_FAST)
                        return null;
                return this.addDrawer(new StochasticDrawer(chartFactory.STOCHASTIC_FAST, options));
            },

            removeFastStochastic: function()
            {
                this.removeDrawer(chartFactory.STOCHASTIC_FAST);
            },

            addSlowStochastic: function(options)
            {
                options.periodF=options.periodD; // set periodF=periodD, hence a slow stochastic, meaning smoothing %K and %D with same SMA period as to calculate %D
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.STOCHASTIC_SLOW)
                        return null;
                return this.addDrawer(new StochasticDrawer(chartFactory.STOCHASTIC_SLOW, options));
            },

            removeSlowStochastic: function()
            {
                this.removeDrawer(chartFactory.STOCHASTIC_SLOW);
            },

            addStochastic: function(options)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.STOCHASTIC)
                        return null;
                return this.addDrawer(new StochasticDrawer(chartFactory.STOCHASTIC, options));
            },

            removeStochastic: function()
            {
                this.removeDrawer(chartFactory.STOCHASTIC);
            },

            addWilliamR: function(options)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.WILLIAM_R)
                        return null;
                return this.addDrawer(new WilliamRDrawer(chartFactory.WILLIAM_R, options));
            },

            removeWilliamR: function()
            {
                this.removeDrawer(chartFactory.WILLIAM_R);
            },

            addVolatility: function(options) //period, timeFactor, color, blazeColor
            {
                var name=chartFactory.VOLATILITY;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new VolatilityDrawer(name, options));
            },

            removeVolatility: function()
            {
                this.removeDrawer(chartFactory.VOLATILITY);
            },

            addStdDev: function(options)
            {
                var name=chartFactory.STD_DEV;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new StdDevDrawer(name, options));
            },

            removeStdDev: function(period)
            {
                this.removeDrawer(chartFactory.STD_DEV + "_" + period);
            },

            addForceIndex: function(options)
            {
                var name=chartFactory.FORCE_INDEX;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new ForceIndexDrawer(name, options));
            },

            removeForceIndex: function()
            {
                this.removeDrawer(chartFactory.FORCE_INDEX);
            },

//            addIncident: function(type, selector, width, height, sticky, zOrder)
//            {
//                var name=chartFactory.INCIDENT + "_" + type;
//                for (var i=0;i<this.drawers.length;i++)
//                    if (this.drawers[i].obj.name==name)
//                        return null;
//                return this.addDrawer(new IncidentDrawer(name, selector, width, height, sticky), false, zOrder);
//            },
//
//            removeIncident: function(type)
//            {
//                this.removeDrawer(chartFactory.INCIDENT + "_" + type);
//            },

            addCustomDrawer: function(drawer, overlay, zOrder)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==drawer.name)
                        return null;
                return this.addDrawer(drawer, overlay, zOrder);
            },

            removeCustomDrawer: function(drawer)
            {
                this.removeDrawer(drawer.name);
            },

            addEngine: function(engine, modes)
            {
                this.engines.push(engine);
                for (var i=0;i<modes.length;i++)
                    this.engineMap[modes[i]]=engine;

                if (this.series != null && this.series.ready)
                    engine.dataReady(this.series);
                if (this.active)
                    this.draw(chartFactory.REASON_ENGINE_CHANGE);
                return engine;
            },

            removeEngine: function(name)
            {
                for (var i=0;i<this.engines.length;i++)
                {
                    var engine=this.engines[i];
                    if (engine.name==name)
                    {
                        this.engines.splice(i, 1);

                        for (var mode in this.engineMap)
                            if (this.engineMap[mode].name==name)
                                delete this.engineMap[mode];

                        if (this.focusEngine==engine)
                            this.focusEngine=null;
                        if (this.actionEngine==engine)
                            this.actionEngine=null;

                        if (this.active)
                            this.draw(chartFactory.REASON_ENGINE_CHANGE);
                        break;
                    }
                }
            },

            getEngine: function(name)
            {
                for (var i=0;i<this.engines.length;i++)
                    if (this.engines[i].name==name)
                        return this.engines[i];
                return null;
            },

            enableTrendLine: function(color, focusColor)
            {
                for (var i=0;i<this.engines.length;i++)
                    if (this.engines[i].name==chartFactory.TREND_LINE)
                        return null;
                return this.addEngine(new TrendLineEngine(chartFactory.TREND_LINE, color, focusColor),
                                      [chartFactory.MODE_TREND_LINE, chartFactory.MODE_TREND_LINE_EX]);
            },

            disableTrendLine: function()
            {
                this.removeEngine(chartFactory.TREND_LINE);
            },

            enableLabel: function(color, textColor, focusColor, selectColor)
            {
                for (var i=0;i<this.engines.length;i++)
                    if (this.engines[i].name==chartFactory.LABEL)
                        return null;
                return this.addEngine(new LabelEngine(chartFactory.LABEL, color, textColor, focusColor, selectColor),
                                      [chartFactory.MODE_LABEL]);
            },

            disableLabel: function()
            {
                this.removeEngine(chartFactory.LABEL);
            },

            enableFibonacci: function(color, baseLineColor, textColor, focusColor)
            {
                for (var i=0;i<this.engines.length;i++)
                    if (this.engines[i].name==chartFactory.FIBONACCI)
                        return null;
                return this.addEngine(new FibonacciEngine(chartFactory.FIBONACCI, color, baseLineColor, textColor, focusColor),
                                      [chartFactory.MODE_FIB_RETRACE, chartFactory.MODE_FIB_FANS, chartFactory.MODE_FIB_ARCS]);
            },

            disableFibonacci: function()
            {
                this.removeEngine(chartFactory.FIBONACCI);
            },

            addCustomEngine: function(engine, modes)
            {
                for (var i=0;i<this.engines.length;i++)
                    if (this.engines[i].name==engine.name)
                        return null;
                return this.addEngine(engine, modes);
            },

            removeCustomEngine: function(engine)
            {
                this.removeEngine(engine.name);
            },

            addPriceTracker: function(name, value, color, textColor, invertColor, dashstyle, front, dp)
            {
                return this.addPriceTracker2(name, value, { color:color, textColor:textColor, invertColor:invertColor, dashstyle:dashstyle, thickness:chartFactory.TREND_LINE_THICKNESS, front:front, dp:dp });
            },
            addPriceTracker2: function(name, value, styleobj)
            {
                for (var i=0;i<this.trackers.length;i++)
                    if (this.trackers[i].name==name)
                        return;

                this.trackers.push({ type:chartFactory.TRACKER_PRICE, name:name, value:value, color:styleobj.color, textColor:styleobj.textColor, invertColor:styleobj.invertColor, dashstyle:styleobj.dashstyle, thickness:styleobj.thickness?styleobj.thickness:chartFactory.TREND_LINE_THICKNESS, front:styleobj.front?styleobj.front:false, dp:styleobj.dp });
                if (this.active)
                    this.draw(chartFactory.REASON_TRACKER);
            },

            addFieldTracker: function(name, field, value, textColor, invertColor, front, dp)
            {
                return this.addFieldTracker2(name, field, value, { textColor:textColor, invertColor:invertColor, front:front, dp:dp });
            },
            addFieldTracker2: function(name, field, value, styleobj)
            {
                for (var i=0;i<this.trackers.length;i++)
                    if (this.trackers[i].name==name && this.trackers[i].field==field && this.trackers[i].value==value)
                        return;

                this.trackers.push({ type:chartFactory.TRACKER_FIELD, name:name, field:field, value:value, textColor:styleobj.textColor, invertColor:styleobj.invertColor, front:styleobj.front, dp:styleobj.dp });
                if (this.active)
                    this.draw(chartFactory.REASON_TRACKER);
            },

            addDateTracker: function(name, field, color, style)
            {
                return this.addDateTracker2(name, field, { color:color, dashstyle:style, thickness:chartFactory.TREND_LINE_THICKNESS, front:false });
            },
            addDateTracker2: function(name, field, styleobj)
            {
                for (var i=0;i<this.trackers.length;i++)
                    if (this.trackers[i].name==name)
                        return;

//                this.trackers.push({ type:chartFactory.TRACKER_DATE, name:name, field:field, color:color, style:style, front:false });
                this.trackers.push({ type:chartFactory.TRACKER_DATE, name:name, field:field, color:styleobj.color, dashstyle:styleobj.dashstyle, thickness:styleobj.thickness?styleobj.thickness:chartFactory.TREND_LINE_THICKNESS, front:styleobj.front?styleobj.front:false });
                if (this.active)
                    this.draw(chartFactory.REASON_TRACKER);
            },

            removeTracker: function(name, field)
            {
                for (var i=0;i<this.trackers.length;i++)
                    if (this.trackers[i].name==name && (!field || this.trackers[i].field==field)) {
                        this.trackers.splice(i, 1);

                        if (this.active)
                            this.draw(chartFactory.REASON_TRACKER);
                        break;
                    }
            },

            removeAllTrackers: function()
            {
                this.trackers=[];
                if (this.active)
                    this.draw(chartFactory.REASON_TRACKER);
            },

            tracker: function(name, value)
            {
                for (var i=0;i<this.trackers.length;i++)
                {
                    var t=this.trackers[i];
                    if (t.name==name)
                    {
                        if (t.type==chartFactory.TRACKER_PRICE)
                            if (value===undefined)
                                return t.value;
                            else
                            {
                                t.value=value;
                                if (this.active)
                                    this.draw(chartFactory.REASON_TRACKER);
                            }
                        break;
                    }
                }
            },

            showByDates: function(startDate, endDate, axisX, series)
            {
                if (endDate != null && endDate<startDate)
                    return;

                if (series != null && series.ready)
                {
                    var i=series.indexOf(startDate);
                    if (i!= -1)
                    {
                        axisX.startIndex=i;
                        if (endDate != null)
                        {
                            var j=series.indexOf(endDate);
                            axisX.endIndex=(j!= -1 && j!=i ? j : series.points.length-1);
                        }
                        else
                            axisX.endIndex=series.points.length-1;

                        this.crosshairX= -1;
                        this.crosshairY= -1;
                        this.active=true;

                        if (this.dateRangeFunc != undefined)
                            this.dateRangeFunc.call(this.caller, series.points[i].date, series.points[axisX.endIndex].date);
                        this.draw(chartFactory.REASON_SHOW);
                        return;
                    }
                }

                this.startDate=startDate;
                this.endDate=endDate;
            },

            showByCount: function(count, axisX, series)
            {
            },

            showByObject: function(obj, axisX, series)
            {
                if (obj.className==this.className && obj.series==series)  // "obj" is a PriceChart with the same series
                    if (obj.active)
                    {
                        axisX.startIndex=obj.axisX.startIndex;
                        axisX.endIndex=obj.axisX.endIndex;

                        this.crosshairX= -1;
                        this.crosshairY= -1;
                        this.active=true;

                        if (this.dateRangeFunc != undefined)
                            this.dateRangeFunc.call(this.caller, series.points[axisX.startIndex].date, series.points[axisX.endIndex].date);
                        this.draw(chartFactory.REASON_SHOW);
                    }
                    else
                    {
                        this.startDate=obj.startDate;
                        this.endDate=obj.endDate;
                    }
            },

            show: function(/* optional */ p1, p2)
            {
                var t1=$.type(p1);
                var t2=$.type(p2);

                if (t1=="date")
                {
                    if (t2=="date")
                        this.showByDates(p1, p2, this.axisX, this.series);
                    else
                        this.showByDates(p1, null, this.axisX, this.series);
                }
                else if (t1=="number")
                    this.showByCount(p1, this.axisX, this.series);
                else if (t1=="object")
                    this.showByObject(p1, this.axisX, this.series);
                else
                    this.draw(chartFactory.REASON_SHOW);
            },

            setGridStyle: function(value)
            {
                if (value != this.gridStyle)
                {
                    this.gridStyle=value;
                    this.bottomMargin=((value & chartFactory.GRID_LABEL_X)>0 ? chartFactory.BOTTOM_MARGIN : chartFactory.BOTTOM_MARGIN_THIN);
                    if (this.active)
                        this.draw(chartFactory.REASON_GRID_STYLE);
                }
            },

            setGridType: function(value)
            {
                if (value != this.gridType)
                {
                    this.gridType=value;
                    if (this.active)
                        this.draw(chartFactory.REASON_GRID_TYPE);
                }
            },

            setCrosshairStyle: function(value)
            {
                if (value != this.crosshairStyle)
                {
                    this.crosshairStyle=value;
                    if (this.active)
                        this.draw(chartFactory.REASON_CROSSHAIR);
                }
            },

            flip: function(value)
            {
                if (value==undefined)
                    return this.axisY.flip;
                else
                    if (value != this.axisY.flip)
                    {
                        this.axisY.flip=value;
                        this.axisY.sharp= -this.axisY.sharp;
                        this.axisV.flip=value;
                        this.axisV.sharp= -this.axisV.sharp;

                        if (this.active)
                            this.draw(chartFactory.REASON_FLIP_Y);
                    }
            },

            logScale: function(value)
            {
                if (value==undefined)
                    return this.axisY.log;
                else
                    if (value != this.axisY.log)
                    {
                        this.axisY.log=value;
                        this.axisV.log=value;

                        if (this.active)
                            this.draw(chartFactory.REASON_LOG_SCALE);
                    }
            },

            ratio: function(value)
            {
                if (value==undefined)
                    return this.axisY.ratio;
                else
                    if (value != this.axisY.ratio)
                    {
                        this.axisY.ratio=value;
                        this.axisV.ratio=value;

                        if (this.active)
                            this.draw(chartFactory.REASON_RATIO_Y);
                    }
            },

            shrink: function(value)
            {
                if (value==undefined)
                    return this.axisY.shrink;
                else
                    if (value != this.axisY.shrink)
                {
                        this.axisY.shrink=value;
                        this.axisV.shrink=value;

                    if (this.active)
                        this.draw(chartFactory.REASON_SHRINK);
                }
            },

            autoScale: function()
            {
                if (this.gridScale != chartFactory.GRID_SCALE_AUTO)
                {
                    this.gridScale=chartFactory.GRID_SCALE_AUTO;
                    if (this.active)
                        this.draw(chartFactory.REASON_GRID_SCALE);
                }
            },

            freeScale: function()
            {
                if (this.gridScale != chartFactory.GRID_SCALE_FREE)
                {
                    this.gridScale=chartFactory.GRID_SCALE_FREE;
                    if (this.active)
                        this.draw(chartFactory.REASON_GRID_SCALE);
                }
            },

            fixedScale: function(start, end)
            {
                if (start<end && (this.gridScale != chartFactory.GRID_SCALE_FIXED ||
                                    start != this.fixedScaleStart ||
                                    end != this.fixedScaleEnd))
                {
                    this.gridScale=chartFactory.GRID_SCALE_FIXED;
                    this.fixedScaleStart=start;
                    this.fixedScaleEnd=end;

                    if (this.active)
                        this.draw(chartFactory.REASON_GRID_SCALE);
                }
            },

            dataReady: function(series)
            {
                if (series==this.series)
                {
                    for (var i=0;i<this.drawers.length;i++)
                        this.drawers[i].obj.dataReady(series);
                    for (var i=0;i<this.engines.length;i++)
                        this.engines[i].dataReady(series);

                    if (this.startDate != null)
                    {
                        var i=series.indexOf(this.startDate);
                        if (i!= -1)
                        {
                            this.axisX.startIndex=i;
                            if (this.endDate != null)
                            {
                                var j=series.indexOf(this.endDate);
                                this.axisX.endIndex=(j!= -1 && j!=i ? j : series.points.length-1);
                            }
                            else
                                this.axisX.endIndex=series.points.length-1;

                            this.active=true;

                            if (this.dateRangeFunc != undefined)
                                this.dateRangeFunc.call(this.caller, series.points[i].date, series.points[this.axisX.endIndex].date);
                            this.draw(chartFactory.REASON_DATA_READY);
                        }
                    }
                }
                else
                    this.auxDataReady(series);
            },

            dataAppend: function(series)
            {
                if (series==this.series)
                {
                    for (var i=0;i<this.drawers.length;i++)
                        this.drawers[i].obj.dataUpdate(series);
                    for (var i=0;i<this.engines.length;i++)
                        this.engines[i].dataUpdate(series);

                    var axisX=this.axisX;
                    if (this.active)
                    {
                        var i=axisX.startIndex;
                        var j=axisX.endIndex;

                        if (j==series.points.length-2 && (this.shiftType==chartFactory.SHIFT_TO_LAST ||
                                                          this.shiftType==chartFactory.SHIFT_TO_SPOT && series.spotCount==series.points.length))
                        {
                            j++;
                            if (j-i+1 > axisX.colCount)
                                i++;
                        }
                        else if (j==series.spotCount-2 && this.shiftType==chartFactory.SHIFT_TO_SPOT)
                        {
                            j++; i++;
                        }

                        if (j != axisX.endIndex)
                        {
                            axisX.endIndex=j;
                            if (i != axisX.startIndex)
                            {
                                axisX.startIndex=i;
                                this.crosshairX= -1;
                                this.crosshairY= -1;
                            }
                            if (this.dateRangeFunc != undefined)
                                this.dateRangeFunc.call(this.caller, series.points[i].date, series.points[j].date);
                            this.draw(chartFactory.REASON_DATA_APPEND);
                        }
                    }
                    else if (this.startDate != null)  // Same as dataReady()...
                    {
                        var i=series.indexOf(this.startDate);
                        if (i!= -1)
                        {
                            axisX.startIndex=i;
                            if (this.endDate != null)
                            {
                                var j=series.indexOf(this.endDate);
                                axisX.endIndex=(j!= -1 && j!=i ? j : series.points.length-1);
                            }
                            else
                                axisX.endIndex=series.points.length-1;

                            this.active=true;

                            if (this.dateRangeFunc != undefined)
                                this.dateRangeFunc.call(this.caller, series.points[i].date, series.points[axisX.endIndex].date);
                            this.draw(chartFactory.REASON_DATA_READY);
                        }
                    }
                }
                else
                    this.auxDataUpdate(series);
            },

            dataUpdate: function(series)
            {
                if (series==this.series)
                {
                    for (var i=0;i<this.drawers.length;i++)
                        this.drawers[i].obj.dataUpdate(series);
                    for (var i=0;i<this.engines.length;i++)
                        this.engines[i].dataUpdate(series);

                    var i=series.spotCount - 1;
                    if (this.active && this.axisX.startIndex<=i && i<=this.axisX.endIndex)
                        this.draw(chartFactory.REASON_DATA_UPDATE);
                }
                else
                    this.auxDataUpdate(series);
            },

            dataDiscover: function(series, size)
            {
                if (series==this.series)
                {
                    for (var i=0;i<this.drawers.length;i++)
                        this.drawers[i].obj.dataReady(series);
                    for (var i=0;i<this.engines.length;i++)
                        this.engines[i].dataDiscover(series, size);

                    if (this.active)
                    {
                        this.axisX.startIndex += size;
                        this.axisX.endIndex += size;
                        this.cancelDrag();
                        this.draw(chartFactory.REASON_DATA_DISCOVER);
                    }
                }
                else
                    this.auxDataReady(series);
            },

            futureDates: function(series)
            {
                if (series==this.series && this.active)
                {
                    var axisX=this.axisX;
                    var i=axisX.startIndex;
                    var j=axisX.endIndex;
                    var n=series.points.length;

                    if (j >= n)
                    {
                        j=n-1;
                        if (i >= j)
                            i=(j>0 ? j-1 : 0);
                        this.crosshairX= -1;
                        this.crosshairY= -1;
                    }
                    else
                    {
                        var space=axisX.colCount - (j-i+1);
                        var extra=n-j-1;
                        var inc=(space < extra ? space : extra);
                        if (inc > 0)
                            j += inc;
                    }

                    if (i != axisX.startIndex || j != axisX.endIndex)
                    {
                        axisX.startIndex=i;
                        axisX.endIndex=j;

                        if (this.dateRangeFunc != undefined)
                            this.dateRangeFunc.call(this.caller, series.points[i].date, series.points[j].date);
                        this.draw(chartFactory.REASON_FUTURE_DATES);
                    }
                }
            },

            gaps: function(series)
            {
                if (series==this.series && this.active)
                {
                    this.startDate=null;
                    this.endDate=null;
                    this.crosshairX= -1;
                    this.crosshairY= -1;
                    if (this.gridScale==chartFactory.GRID_SCALE_FREE)
                        this.gridScale=chartFactory.GRID_SCALE_AUTO;

                    this.active=false;
                    this.draw(chartFactory.REASON_BLANK);
                }
            },

            auxDataReady: function(series)
            {
                var found=false;
                for (var i=0;i<this.drawers.length;i++)
                {
                    var drawer=this.drawers[i].obj;
                    if (drawer.require(series))
                    {
                        drawer.dataReady(series);
                        found=true;
                    }
                }
                if (found && this.active)
                    this.draw(chartFactory.REASON_AUX_DATA);
            },

            auxDataUpdate: function(series)
            {
                var found=false;
                for (var i=0;i<this.drawers.length;i++)
                {
                    var drawer=this.drawers[i].obj;
                    if (drawer.require(series))
                    {
                        drawer.dataUpdate(series);
                        found=true;
                    }
                }
                if (found && this.active)
                    this.draw(chartFactory.REASON_AUX_DATA);
            },

            serialize: function(serObj, ctx)
            {
                serObj.width=this.width;
                serObj.height=this.height;
                serObj.selector=this.selector;
                serObj.parent=ctx.writeObject(this.parent);
                serObj.gridStyle=this.gridStyle;
                serObj.gridType=this.gridType;
                serObj.crosshairStyle=this.crosshairStyle;
                serObj.shiftType=this.shiftType;
                serObj.joinDataURL=this.joinDataURL;
                serObj.crosshairFunc=ctx.functionName(this.crosshairFunc);
                serObj.tooltipFunc=ctx.functionName(this.tooltipFunc);
                serObj.tradeHintFunc=ctx.functionName(this.tradeHintFunc);
                serObj.dateRangeFunc=ctx.functionName(this.dateRangeFunc);
                serObj.annotEvtFunc=ctx.functionName(this.annotEvtFunc);
                if (this.caller != this)
                    serObj.caller=ctx.externalName(this.caller);
                serObj.series=ctx.writeObject(this.series);
                serObj.overlayCount=this.overlayCount;
                if (this.active)
                {
                    serObj.startDate=this.series.points[this.axisX.startIndex].date;
                    serObj.endDate=this.series.points[this.axisX.endIndex].date;
                }
                else
                {
                    serObj.startDate=this.startDate;
                    serObj.endDate=this.endDate;
                }
                serObj.flipY=this.axisY.flip;
                serObj.logScale=this.axisY.log;
                serObj.ratio=this.axisY.ratio;
                serObj.shrink=this.axisY.shrink;
                serObj.gridScale=(this.gridScale==chartFactory.GRID_SCALE_FREE ? chartFactory.GRID_SCALE_AUTO : this.gridScale);
                serObj.fixedScaleStart=this.fixedScaleStart;
                serObj.fixedScaleEnd=this.fixedScaleEnd;
                serObj.mode=this.mode;
                serObj.trackers=this.trackers;

                var lastSeries=ctx.use(this.series);

                var drawersSO=[];
                for (var i=0;i<this.drawers.length;i++)
                {
                    var env=this.drawers[i];
                    drawersSO.push({ overlay: env.overlay,
                                     zOrder:  env.zOrder,
                                     visible: env.visible,
                                     obj:     ctx.writeObject(env.obj) });
                }
                serObj.drawers=drawersSO;

                var enginesSO=[];
                for (var i=0;i<this.engines.length;i++)
                    enginesSO.push(ctx.writeObject(this.engines[i]));
                serObj.engines=enginesSO;

                var engineMapSO={};
                for (var mode in this.engineMap)
                    engineMapSO[mode]=ctx.writeObject(this.engineMap[mode]);
                serObj.engineMap=engineMapSO;
                serObj.actionEngine=ctx.writeObject(this.actionEngine);

                ctx.restore(lastSeries);
            },

            deserialize: function(serObj, ctx)
            {
                this.width=serObj.width;
                this.height=serObj.height;
                this.selector=serObj.selector;
                this.parent=ctx.readObject(serObj.parent);
                this.gridStyle=serObj.gridStyle;
                this.gridType=serObj.gridType;
                this.crosshairStyle=serObj.crosshairStyle;
                this.shiftType=serObj.shiftType;
                this.joinDataURL=serObj.joinDataURL;
                this.crosshairFunc=ctx.functionObject(serObj.crosshairFunc);
                this.tooltipFunc=ctx.functionObject(serObj.tooltipFunc);
                this.tradeHintFunc=ctx.functionObject(serObj.tradeHintFunc);
                this.dateRangeFunc=ctx.functionObject(serObj.dateRangeFunc);
                this.annotEvtFunc=ctx.functionObject(serObj.annotEvtFunc);
                var caller=ctx.externalObject(serObj.caller);
                if (caller != undefined)
                    this.caller=caller;
                this.series=ctx.readObject(serObj.series);
                this.overlayCount=serObj.overlayCount;
                if (serObj.startDate != null)
                    this.startDate=new Date(serObj.startDate);
                if (serObj.endDate != null)
                    this.endDate=new Date(serObj.endDate);
                if (serObj.flipY != this.axisY.flip)
                {
                    this.axisY.flip=serObj.flipY;
                    this.axisY.sharp= -this.axisY.sharp;
                    this.axisV.flip=serObj.flipY;
                    this.axisV.sharp= -this.axisV.sharp;
                }
                this.axisY.log=serObj.logScale;
                this.axisV.log=serObj.logScale;
                this.axisY.ratio=serObj.ratio;
                this.axisV.ratio=serObj.ratio;
                this.axisY.shrink=serObj.shrink;
                this.axisV.shrink=serObj.shrink;
                this.gridScale=serObj.gridScale;
                this.fixedScaleStart=serObj.fixedScaleStart;
                this.fixedScaleEnd=serObj.fixedScaleEnd;
                this.mode=serObj.mode;
                this.trackers=serObj.trackers;

                this.bottomMargin=((this.gridStyle & chartFactory.GRID_LABEL_X)>0 ? chartFactory.BOTTOM_MARGIN : chartFactory.BOTTOM_MARGIN_THIN);

                var lastSeries=ctx.use(this.series);

                var drawersSO=serObj.drawers;
                for (var i=0;i<drawersSO.length;i++)
                {
                    var envSO=drawersSO[i];
                    this.drawers.push({ overlay: envSO.overlay,
                                        zOrder:  envSO.zOrder,
                                        visible: envSO.visible,
                                        obj:     ctx.readObject(envSO.obj) });
                }

                var enginesSO=serObj.engines;
                for (var i=0;i<enginesSO.length;i++)
                    this.engines.push(ctx.readObject(enginesSO[i]));

                var engineMapSO=serObj.engineMap;
                for (var mode in engineMapSO)
                    this.engineMap[mode]=ctx.readObject(engineMapSO[mode]);
                this.actionEngine=ctx.readObject(serObj.actionEngine);

                ctx.restore(lastSeries);
            },

            viewSlideX: function(startIndex, endIndex)
            {
                this.axisX.startIndex=startIndex;
                this.axisX.endIndex=endIndex;

                if (this.dateRangeFunc != undefined)
                {
                    var pts=this.series.points;
                    this.dateRangeFunc.call(this.caller, pts[startIndex].date, pts[endIndex].date);
                }
                this.draw(chartFactory.REASON_VIEW_SLIDE_X);
            },

            viewZoomX: function(startIndex, endIndex)
            {
                this.axisX.startIndex=startIndex;
                this.axisX.endIndex=endIndex;

                if (this.dateRangeFunc != undefined)
                {
                    var pts=this.series.points;
                    this.dateRangeFunc.call(this.caller, pts[startIndex].date, pts[endIndex].date);
                }
                this.draw(chartFactory.REASON_VIEW_ZOOM_X);
            },

            crosshair: function(x, y)
            {
                var notify=(this.tooltipFunc != undefined && x != -1 && x != this.crosshairX);

                this.crosshairX=x;
                this.crosshairY=y;
                this.draw(chartFactory.REASON_CROSSHAIR);

                if (notify)
                {
                    var res={ date:this.series.points[x].date };
                    for (var i=0;i<this.drawers.length;i++)
                        this.drawers[i].obj.tooltip(this.series, x, res);
                    this.tooltipFunc.call(this.caller, res);
                }
            },

            clickDrawers: function(x, y)
            {
                if (this.tradeHintFunc != undefined)
                {
                    var res={ date:this.series.points[x].date };
                    for (var i=0;i<this.drawers.length;i++)
                        this.drawers[i].obj.tradeHint(this.series, x, y, this.axisX, this.axisY, res);

                    if (Object.keys(res).length>1)
                    {
                        this.tradeHintFunc.call(this.caller, this.axisX.toScreen(x) + this.axisX.frameOffset, y + this.axisY.frameOffset, res);
                        return true;
                    }
                }
                return false;
            },

            resize: function(w, h)
            {
                if (w != this.width || h != this.height)
                {
                    var ratio=this.displayRatio;
                    if (ratio==1)
                    {
                        this.canvas.get(0).width=w;
                        this.canvas.get(0).height=h;
                    }
                    else
                    {
                        this.canvas.get(0).width=w * ratio;
                        this.canvas.get(0).height=h * ratio;
                        this.canvas.css({ width:w, height:h });
                        this.ctx.scale(ratio, ratio);
                    }
                    this.width=w;
                    this.height=h;

                    if (this.active)
                    {
                        if (this.dateRangeFunc != undefined)
                        {
                            var pts=this.series.points;
                            this.dateRangeFunc.call(this.caller, pts[this.axisX.startIndex].date, pts[this.axisX.endIndex].date);
                        }
                        this.draw(chartFactory.REASON_RESIZE);
                    }
                }
            },

            gridX_DateEven: function(res, rescale)
            {
                if (rescale)  // Determine the column width and column count
                {
                    res.width=this.width - chartFactory.LEFT_MARGIN - chartFactory.RIGHT_MARGIN;
                    res.frameOffset=chartFactory.LEFT_MARGIN;

                    var maxLabelCount=res.width / this.parent.gridLabelWidth / 2;
                    var n=res.endIndex - res.startIndex + 1;

                    res.inc=Math.ceil(n / maxLabelCount);
                    res.colWidth=res.width / n;                     // "colWidth" is a floating point number
                    if (res.colWidth>chartFactory.MAX_COL_WIDTH)
                    {
                        res.colWidth=chartFactory.MAX_COL_WIDTH;
                        res.colCount=(res.width / chartFactory.MAX_COL_WIDTH)|0;
                    }
                    else
                        res.colCount=n;
                }

                // Determine the periodicity
                var period= -1;
                for (var i=res.startIndex + res.inc; i<=res.endIndex; i+=res.inc)
                {
                    var curr=this.series.points[i];
                    var prev=this.series.points[i - res.inc];

                    if (curr.year != prev.year)
                    {
                        if (period<0)
                            period=0;       // Yearly
                    }
                    else if (curr.month != prev.month)
                    {
                        if (period<1)
                            period=1;       // Monthly
                    }
                    else
                        period=2;           // Daily
                }

                // Generate the labels
                var labels={};
                for (var i=res.startIndex; i<=res.endIndex; i+=res.inc)
                {
                    var curr=this.series.points[i];
                    var prev=(i==res.startIndex ? null : this.series.points[i - res.inc]);

                    if (period==0)          // Yearly
                        labels[i]=curr.year;
                    else if (period==1)     // Monthly
                    {
                        if (prev != null && curr.year != prev.year)
                            labels[i]=curr.year;
                        else
                            labels[i]=chartFactory.MONTHS[curr.month];
                    }
                    else                    // Daily
                    {
                        if (prev != null && curr.month != prev.month)
                            labels[i]=chartFactory.MONTHS[curr.month];
                        else
                            labels[i]=curr.day;
                    }
                }
                res.labels=labels;
            },

            gridX_DateAlign: function(res, rescale)
            {
                var n=res.endIndex - res.startIndex + 1;
                if (rescale)  // Determine the column width and column count
                {
                    res.width=this.width - chartFactory.LEFT_MARGIN - chartFactory.RIGHT_MARGIN;
                    res.frameOffset=chartFactory.LEFT_MARGIN;

                    res.colWidth=res.width / n;                     // "colWidth" is a floating point number
                    if (res.colWidth>chartFactory.MAX_COL_WIDTH)
                    {
                        res.colWidth=chartFactory.MAX_COL_WIDTH;
                        res.colCount=(res.width / chartFactory.MAX_COL_WIDTH)|0;
                    }
                    else
                        res.colCount=n;
                }

                var cols={};
                for (var i=res.startIndex; i<=res.endIndex; i++)
                    cols[i]=res.toScreen(i);

                var minGridCol=this.parent.gridLabelWidth * 2;
                var minGridLine=res.colWidth * n / (this.parent.gridLabelWidth * 4) | 0;

                // Determine the periodicity
                var prevY= -1, prevM= -1;
                var posY= -1, posM= -1;
                var countY=0, countM=0;

                for (var i=res.startIndex; i<=res.endIndex; i++)
                {
                    var pt=this.series.points[i];
                    if (prevY != -1 && prevY != pt.year && (posY== -1 || cols[i] - posY>minGridCol))
                    {
                        posY=cols[i];
                        countY++;
                    }
                    if (prevM != -1 && prevM != pt.month && (posM== -1 || cols[i] - posM>minGridCol))
                    {
                        posM=cols[i];
                        countM++;
                    }
                    prevY=pt.year;
                    prevM=pt.month;
                }

                var period;
                if (countY>minGridLine)      period=0;  // Yearly
                else if (countM>minGridLine) period=1;  // Monthly
                else                           period=2;  // Daily

                // For monthly grid, generate the year labels first
                // For daily grid, generate the month labels first

                var labels={};
                var arr=[];
                var prev= -1;

                if (period==1)  // Monthly
                    for (var i=res.startIndex; i<=res.endIndex; i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != -1 && prev != pt.year)
                        {
                            arr.push(cols[i]);
                            labels[i]=pt.year;
                        }
                        prev=pt.year;
                    }
                else if (period==2)  // Daily
                    for (var i=res.startIndex; i<=res.endIndex; i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != -1 && prev != pt.month)
                        {
                            arr.push(cols[i]);
                            labels[i]=chartFactory.MONTHS[pt.month];
                        }
                        prev=pt.month;
                    }

                // Generate the remaining labels
                var pos= -1;
                prev= -1;

                if (period==0)  // Yearly
                    for (var i=res.startIndex; i<=res.endIndex; i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != -1 && prev != pt.year && (pos== -1 || cols[i] - pos>minGridCol))
                        {
                            pos=cols[i];
                            labels[i]=pt.year;
                        }
                        prev=pt.year;
                    }
                else if (period==1)  // Monthly
                    for (var i=res.startIndex; i<=res.endIndex; i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != -1 && prev != pt.month && (pos== -1 || cols[i] - pos>minGridCol) &&
                            !this.clashGridLabel(cols[i], arr, minGridCol))
                        {
                            pos=cols[i];
                            labels[i]=chartFactory.MONTHS[pt.month];
                        }
                        prev=pt.month;
                    }
                else  // Daily
                    for (var i=res.startIndex; i<=res.endIndex; i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != pt.day && (pos== -1 || cols[i] - pos>minGridCol) &&
                            !this.clashGridLabel(cols[i], arr, minGridCol))
                        {
                            pos=cols[i];
                            labels[i]=pt.day;
                        }
                        prev=pt.day;
                    }

                res.labels=labels;
            },

            clashGridLabel: function(x, arr, limit)
            {
                // Check if a time label is getting too close to any day labels
                for (var i=0;i<arr.length;i++)
                {
                    var d=arr[i] - x;
                    if (d<0) d= -d;
                    if (d<=limit) return true;
                }
                return false;
            },

            gridX_TimeAlign: function(res, rescale)
            {
                var n=res.endIndex - res.startIndex + 1;
                if (rescale)  // Determine the column width and column count
                {
                    res.width=this.width - chartFactory.LEFT_MARGIN - chartFactory.RIGHT_MARGIN;
                    res.frameOffset=chartFactory.LEFT_MARGIN;

                    res.colWidth=res.width / n;                     // "colWidth" is a floating point number
                    if (res.colWidth>chartFactory.MAX_COL_WIDTH)
                    {
                        res.colWidth=chartFactory.MAX_COL_WIDTH;
                        res.colCount=(res.width / chartFactory.MAX_COL_WIDTH)|0;
                    }
                    else
                        res.colCount=n;
                }

                var cols={};
                for (var i=res.startIndex; i<=res.endIndex; i++)
                    cols[i]=res.toScreen(i);

                var minGridCol=this.parent.gridLabelWidth * 2;
                var minGridLine=res.colWidth * n / (this.parent.gridLabelWidth * 4) | 0;
                var labels={};

                // Generate the day labels
                var prev= -1;
                var pos= -1;
                var arr=[];

                for (var i=res.startIndex; i<=res.endIndex; i++)
                {
                    var pt=this.series.points[i];
                    if (prev != -1 && prev != pt.day && (pos== -1 || cols[i] - pos>minGridCol))
                    {
                        pos=cols[i];
                        arr.push(pos);
                        labels[i]=formatShortDate(pt.month, pt.day);
                    }
                    prev=pt.day;
                }

                // Determine the alignment
                var pos60= -1, pos30= -1, pos15= -1, pos5= -1;
                var count60=0, count30=0, count15=0, count5=0;

                for (var i=res.startIndex; i<=res.endIndex; i++)
                {
                    if (this.clashGridLabel(cols[i], arr, minGridCol))
                        continue;

                    var min=this.series.points[i].min;
                    if (min==0 && (pos60== -1 || cols[i] - pos60>minGridCol))
                    {
                        pos60=cols[i];
                        count60++;
                    }
                    if (min%30==0 && (pos30== -1 || cols[i] - pos30>minGridCol))
                    {
                        pos30=cols[i];
                        count30++;
                    }
                    if (min%15==0 && (pos15== -1 || cols[i] - pos15>minGridCol))
                    {
                        pos15=cols[i];
                        count15++;
                    }
                    if (min%5==0 && (pos5== -1 || cols[i] - pos5>minGridCol))
                    {
                        pos5=cols[i];
                        count5++;
                    }
                }

                var align;
                if (count60>minGridLine)      align=60;
                else if (count30>minGridLine) align=30;
                else if (count15>minGridLine) align=15;
                else if (count5>minGridLine)  align=5;
                else                            align=1;

                // Generate the time labels
                pos= -1;
                for (var i=res.startIndex; i<=res.endIndex; i++)
                {
                    var pt=this.series.points[i];
                    if (pt.min % align==0 && (pos== -1 || cols[i] - pos>minGridCol) &&
                        !this.clashGridLabel(cols[i], arr, minGridCol))
                    {
                        pos=cols[i];
                        labels[i]=formatTime(pt.hour, pt.min);
                    }
                }
                res.labels=labels;
            },

            rangeY: function(res)
            {
                delete res.min;
                delete res.max;

                for (var i=0;i<this.trackers.length;i++)
                {
                    var t=this.trackers[i];
                    if (t.type==chartFactory.TRACKER_PRICE && t.value != null)
                    {
                        if (res.min==undefined || t.value<res.min)
                            res.min=t.value;
                        if (res.max==undefined || t.value>res.max)
                            res.max=t.value;
                    }
                }

                var startIndex=this.axisX.startIndex;
                var endIndex=this.axisX.endIndex;

                for (var i=0;i<this.drawers.length;i++)
                    if (!this.drawers[i].overlay)
                        this.drawers[i].obj.rangeY(this.series, startIndex, endIndex, res);

                for (var i=0;i<this.engines.length;i++)
                    this.engines[i].rangeY(this.series, startIndex, endIndex, res);

                if (res.min==undefined || res.max==undefined)
                {
                    res.min=0;
                    res.max=100;
                }
                else if (res.min==res.max)
                    res.max=res.min + 100;
            },

            rangeV: function(res)
            {
                delete res.min;
                delete res.max;

                var startIndex=this.axisX.startIndex;
                var endIndex=this.axisX.endIndex;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].overlay)
                        this.drawers[i].obj.rangeY(this.series, startIndex, endIndex, res);

                if (res.min==undefined || res.max==undefined)
                {
                    res.min=0;
                    res.max=100;
                }
                else if (res.min==res.max)
                    res.max=res.min + 100;
            },

            gridY_Auto: function(res, decimalPlace)
            {
                if (this.canvas.parent().length == 0) return; // shortcut to skip this function, since no parent found...

                res.height=this.height - chartFactory.TOP_MARGIN - this.bottomMargin;
                if (res.flip)
                {
                    res.top=res.height;
                    res.bottom=0;
                }
                else
                {
                    res.top=0;
                    res.bottom=res.height;
                }
                res.frameOffset=this.canvas.offset().top - this.canvas.parent().offset().top + chartFactory.TOP_MARGIN;

                var maxLabelCount=(res.height / this.parent.fontHeight / 3 + 0.5)|0;
                if (maxLabelCount==0) maxLabelCount=1;

                // Apply ratio and shrinking to data range
                var padding=(res.max - res.min) * res.shrink / 2;
                var max=(res.max + padding) * res.ratio;
                var min=(res.min - padding) * res.ratio;

                var interval=(max - min) / maxLabelCount;
                if (interval<chartFactory.MAX_PRECISION)
                    interval=max / maxLabelCount;
                interval=roundInterval(interval);

                // In case the interval has more decimal places than that needed for display
                var smallest=Math.pow(10, -decimalPlace);
                if (interval<smallest) interval=smallest;

                res.start=((min/interval)|0) * interval;
                res.end=((max/interval)|0) * interval;
                if (res.start>min)
                    res.start -= interval;
                if (res.start==res.end || res.end<max)
                    res.end += interval;
                res.inc=interval;
                res.indent=res.start;  // First horizontal grid line
            },

            gridY_Fixed: function(res, decimalPlace)
            {
                if (this.canvas.parent().length == 0) return; // shortcut to skip this function, since no parent found...

                res.height=this.height - chartFactory.TOP_MARGIN - this.bottomMargin;
                if (res.flip)
                {
                    res.top=res.height;
                    res.bottom=0;
                }
                else
                {
                    res.top=0;
                    res.bottom=res.height;
                }
                res.frameOffset=this.canvas.offset().top - this.canvas.parent().offset().top + chartFactory.TOP_MARGIN;

                var maxLabelCount=(res.height / this.parent.fontHeight / 3 + 0.5)|0;
                if (maxLabelCount==0) maxLabelCount=1;

                res.start=this.fixedScaleStart;
                res.end=this.fixedScaleEnd;
                res.indent=res.start;  // First horizontal grid line

                var range=res.end - res.start;
                var i=maxLabelCount + 1;
                var j=(i/2)|0;  // It's not desirable to have too few grid lines

                if (range<i)  // i.e. range/i<1
                    range=(range*Math.pow(10, decimalPlace) + chartFactory.MAX_PRECISION)|0;

                if (range>0)
                    while (i>j)
                        if (range%i==0)
                        {
                            res.inc=(res.end - res.start)/i;
                            return;
                        }
                        else
                            i--;

                var interval=(res.end - res.start) / maxLabelCount;
                interval=roundInterval(interval);

                // In case the interval has more decimal places than that needed for display
                var smallest=Math.pow(10, -decimalPlace);
                if (interval<smallest) interval=smallest;

                res.inc=interval;
            },

            showDash: function(value, ctx)
            {
                // IE 10 doesn't support dash line
                if (value != this.dash)
                {
                    value ? chartFactory.setCTXLineDash(ctx) : chartFactory.unsetCTXLineDash(ctx);
                    this.dash=value;
                }
            },

            drawPriceTracker: function(t, series, axisX, axisY, ctx)
            {
                if (t.value != null)
                {
                    var y=axisY.toScreen(t.value);
                    this.showDash((t.dashstyle & chartFactory.TRACKER_DASH)>0, ctx);

                    ctx.beginPath();
                    ctx.moveTo(0, y + axisY.sharp);
                    ctx.lineTo(axisX.width, y + axisY.sharp);
                    ctx.strokeStyle=t.color;

                    var lw=ctx.lineWidth;
                    ctx.lineWidth=t.thickness;
                    ctx.stroke();
                    ctx.lineWidth=lw;

                    var dp=t.dp;
                    if (dp===undefined) dp=series.decimalPlace;
                    else if (dp<0) {
                        dp=-dp; // -ve means min dp, and use series' dp if series' dp is more
                        if (series.decimalPlace>dp) dp=series.decimalPlace;
                    }
                    var diminutive=(this.gridStyle & chartFactory.GRID_DIMINUTIVE)>0;
                    var label=formatNumber(t.value * axisY.ratio, dp, diminutive);

                    if (t.invertColor != null)
                    {
                        var w=ctx.measureText(label).width + 2;
                        var h=this.parent.fontHeight + 1;
                        var half=(h/2)|0;

                        ctx.fillStyle=t.invertColor;
                        ctx.fillRect(axisX.width+1, y-half, w, h);
                    }
                    ctx.fillStyle=t.textColor;
                    ctx.textBaseline="middle";
                    ctx.textAlign="start";
                    ctx.fillText(label, axisX.width+2, y);
                }
            },

            drawFieldTracker: function(t, series, axisX, axisY, ctx)
            {
                var pt=series.points[axisX.endIndex];
                if (pt[t.field] != undefined)
                {
//                    var value=parseFloat(pt[t.field]);
                    var value;
                    if (t.value != undefined) {
                        if (pt[t.field] != undefined) {
                            if (pt[t.field][t.value] != undefined)
                                value=parseFloat(pt[t.field][t.value]);
                        }
                    }
                    else {
                        if (pt[t.field] != undefined)
                            value=parseFloat(pt[t.field]);
                    }
                    var y=axisY.toScreen(value);

                    var dp=t.dp;
                    if (dp===undefined) dp=series.decimalPlace;
                    else if (dp<0) {
                        dp=-dp; // -ve means min dp, and use series' dp if series' dp is more
                        if (series.decimalPlace>dp) dp=series.decimalPlace;
                    }
                    var diminutive=(this.gridStyle & chartFactory.GRID_DIMINUTIVE)>0;
                    var label=formatNumber(value * axisY.ratio, dp, diminutive);

                    if (t.invertColor != null)
                    {
                        var w=ctx.measureText(label).width + 2;
                        var h=this.parent.fontHeight + 1;
                        var half=(h/2)|0;

                        ctx.fillStyle=t.invertColor;
                        ctx.fillRect(axisX.width+1, y-half, w, h);
                    }

                    ctx.fillStyle=t.textColor;
                    ctx.textBaseline="middle";
                    ctx.textAlign="start";
                    ctx.fillText(label, axisX.width+2, y);
                }
            },

            drawDateTracker: function(t, series, axisX, axisY, ctx)
            {
                this.showDash((t.dashstyle & chartFactory.TRACKER_DASH)>0, ctx);

                var extendN=(t.style & chartFactory.TRACKER_EXTEND_N)>0;
                var extendS=(t.style & chartFactory.TRACKER_EXTEND_S)>0;
                var hasGridLabelX=(this.gridStyle & chartFactory.GRID_LABEL_X)>0;

                ctx.beginPath();
                for (var i=axisX.startIndex+1; i<=axisX.endIndex; i++)
                {
                    if (series.points[i][t.field])
                    {
                        var x=axisX.toBorder(i) + 0.5;

                        if (extendN)
                            ctx.moveTo(x, -chartFactory.TOP_MARGIN);
                        else
                            ctx.moveTo(x, 0);
                        if (extendS && !hasGridLabelX)
                            ctx.lineTo(x, axisY.height + this.bottomMargin);
                        else
                            ctx.lineTo(x, axisY.height);
                    }
                }
                ctx.strokeStyle=t.color;

                var lw=ctx.lineWidth;
                ctx.lineWidth=t.thickness;
                ctx.stroke();
                ctx.lineWidth=lw;
            },

            drawTrackers: function(front, series, axisX, axisY, ctx)
            {
                for (var i=0;i<this.trackers.length;i++)
                {
                    var t=this.trackers[i];
                    if (t.front==front)
                    {
                        if (t.type==chartFactory.TRACKER_PRICE)
                            this.drawPriceTracker(t, series, axisX, axisY, ctx);
                        else if (t.type==chartFactory.TRACKER_FIELD)
                            this.drawFieldTracker(t, series, axisX, axisY, ctx);
                        else
                            this.drawDateTracker(t, series, axisX, axisY, ctx);
                    }
                }
            },

            skipGapBackward: function(series, index)
            {
                var i;
                for (i=index; i>=0 && series.points[i].gap; i--);
                return (i== -1 ? index : i);
            },

            skipGapForward: function(series, index)
            {
                var size=series.points.length;
                var i;
                for (i=index; i<size && series.points[i].gap; i++);
                return (i==size ? index : i);
            },

            draw: function(reason)
            {
                if (!this.series) return; // sanity check, for escaping this state

                var ctx=this.ctx;
                var axisX=this.axisX;
                var axisY=this.axisY;
                var axisV=this.axisV;
                var series=this.series;
                var decimalPlace=series.decimalPlace;

                ctx.clearRect(0, 0, this.width, this.height);  // Background is transparent
                if (!this.active) return;

                if (reason != chartFactory.REASON_VIEW_SLIDE_Y &&
                    reason != chartFactory.REASON_VIEW_ZOOM_Y &&
                    reason != chartFactory.REASON_CROSSHAIR &&
                    reason != chartFactory.REASON_ANNOTATION)
                {
                    if (this.gridScale==chartFactory.GRID_SCALE_AUTO)
                    {
                        this.rangeY(axisY);
                        this.gridY_Auto(axisY, decimalPlace);

                        if (this.overlayCount>0)
                        {
                            this.rangeV(axisV);
                            this.gridY_Auto(axisV, decimalPlace);
                        }
                    }
                    else if (this.gridScale==chartFactory.GRID_SCALE_FIXED)
                    {
                        this.rangeY(axisY);
                        this.gridY_Fixed(axisY, decimalPlace);

                        if (this.overlayCount>0)
                        {
                            this.rangeV(axisV);
                            this.gridY_Fixed(axisV, decimalPlace);
                        }
                    }

                    if (reason != chartFactory.REASON_GRID_STYLE &&
                        reason != chartFactory.REASON_DATA_UPDATE &&
                        reason != chartFactory.REASON_AUX_DATA &&
                        reason != chartFactory.REASON_DRAWER_CHANGE &&
                        reason != chartFactory.REASON_FLIP_Y &&
                        reason != chartFactory.REASON_LOG_SCALE &&
                        reason != chartFactory.REASON_RATIO_Y &&
                        reason != chartFactory.REASON_SHRINK &&
                        reason != chartFactory.REASON_GRID_SCALE &&
                        reason != chartFactory.REASON_TRACKER &&
                        reason != chartFactory.REASON_ENGINE_CHANGE)
                    {
                        var rescale=(reason != chartFactory.REASON_DATA_APPEND &&
                                     reason != chartFactory.REASON_FUTURE_DATES &&
                                     reason != chartFactory.REASON_VIEW_SLIDE_X);

                        if (this.gridType==chartFactory.GRID_DATE_EVEN)
                            this.gridX_DateEven(axisX, rescale);
                        else if (this.gridType==chartFactory.GRID_DATE_ALIGN)
                            this.gridX_DateAlign(axisX, rescale);
                        else
                            this.gridX_TimeAlign(axisX, rescale);
                    }
                }

                if (this.parent.chartColor != null)
                {
                    ctx.fillStyle=this.parent.chartColor;
                    ctx.fillRect(chartFactory.LEFT_MARGIN, chartFactory.TOP_MARGIN, axisX.width, axisY.height);
                }

                //======== Grid lines and back trackers ========
                ctx.save();
                ctx.translate(chartFactory.LEFT_MARGIN, chartFactory.TOP_MARGIN);

                ctx.beginPath();
                ctx.fillStyle=this.parent.gridLabelColor;
                ctx.font=this.parent.font;
                ctx.textBaseline="middle";

                var hasGridLabelX=(this.gridStyle & chartFactory.GRID_LABEL_X)>0;
                var hasGridLabelY=(this.gridStyle & chartFactory.GRID_LABEL_Y)>0;
                var diminutive=(this.gridStyle & chartFactory.GRID_DIMINUTIVE)>0;

                // Horizontal grid lines
                ctx.moveTo(0, axisY.top + axisY.sharp);
                ctx.lineTo(axisX.width, axisY.top + axisY.sharp);
                ctx.moveTo(0, axisY.bottom + axisY.sharp);
                ctx.lineTo(axisX.width, axisY.bottom + axisY.sharp);

                if (hasGridLabelY)
                {
                    var bound=axisY.end + chartFactory.MAX_PRECISION;
                    for (var i=axisY.indent; i<=bound; i+=axisY.inc)
                    {
                        var y=axisY.toScreen(i, 1) + axisY.sharp;
                        ctx.moveTo(0, y);
                        ctx.lineTo(axisX.width, y);
                        ctx.fillText(formatNumber(i, decimalPlace, diminutive), axisX.width+2, y);
                    }

                    if (this.overlayCount>0)
                    {
                        ctx.fillStyle=this.parent.overlayLabelColor;
                        ctx.textAlign="end";

                        bound=axisV.end + chartFactory.MAX_PRECISION;
                        for (var i=axisV.indent; i<=bound; i+=axisV.inc)
                        {
                            var y=axisV.toScreen(i, 1) + axisY.sharp;
                            ctx.fillText(formatNumber(i, decimalPlace, diminutive), -1, y);
                        }
                    }
                }

                // Vertical grid lines
                ctx.moveTo(0.5, 0);
                ctx.lineTo(0.5, axisY.height);
                ctx.moveTo(axisX.width+0.5, 0);
                ctx.lineTo(axisX.width+0.5, axisY.height);

                ctx.textBaseline="top";
                ctx.textAlign="center";

                for (var i in axisX.labels)
                {
                    var x=axisX.toScreen(i)+0.5;
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, axisY.height);
                    if (hasGridLabelX)
                        ctx.fillText(axisX.labels[i], x, axisY.height+1);
                }

                ctx.strokeStyle=this.parent.gridColor;
                this.parent.gridDash?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                this.dash=false;  // Clear the dash line state
                this.drawTrackers(false, series, axisX, axisY, ctx);  // Back trackers
                ctx.restore();

                //======== Drawers and annotation engines =========
                ctx.save();
                ctx.translate(chartFactory.LEFT_MARGIN, chartFactory.TOP_MARGIN);
                ctx.font=this.parent.font;

                // Create a clip region
                ctx.beginPath();
                if (axisY.flip)
                {
                    ctx.moveTo(0, -1);
                    ctx.lineTo(axisX.width, -1);
                    ctx.lineTo(axisX.width, axisY.height);
                    ctx.lineTo(0, axisY.height);
                }
                else
                {
                    ctx.moveTo(0, 0);
                    ctx.lineTo(axisX.width, 0);
                    ctx.lineTo(axisX.width, axisY.height+1);
                    ctx.lineTo(0, axisY.height+1);
                }
                ctx.clip();

                // When a gap is at the left/right end of the chart, the extended indices will ensure that
                // a line appear to be continuous at the left/right end

                axisX.startIndexEx=this.skipGapBackward(series, axisX.startIndex);
                axisX.endIndexEx=this.skipGapForward(series, axisX.endIndex);

                for (var i=0;i<this.drawers.length;i++)
                {
                    var env=this.drawers[i];
                    if (env.visible)
                        if (env.overlay)
                            env.obj.draw(series, this.crosshairX, this.crosshairY, axisX, axisV, ctx);
                    else
                            env.obj.draw(series, this.crosshairX, this.crosshairY, axisX, axisY, ctx);
                }

                for (var i=0;i<this.engines.length;i++)
                    this.engines[i].draw(series, axisX, axisY, ctx);
                ctx.restore();

                //======== Front trackers and crosshair ========
                ctx.save();
                ctx.translate(chartFactory.LEFT_MARGIN, chartFactory.TOP_MARGIN);
                ctx.font=this.parent.font;

                this.dash=false;  // Clear the dash line state
                this.drawTrackers(true, series, axisX, axisY, ctx);  // Front trackers

                this.showDash((this.crosshairStyle & chartFactory.CROSSHAIR_DASH)>0, ctx);

                // Horizontal crosshair
                if (this.crosshairY != -1 && (this.crosshairStyle & chartFactory.CROSSHAIR_HORIZONTAL)>0)
                {
                    var y=this.crosshairY;

                    ctx.beginPath();
                    ctx.moveTo(0, y + axisY.sharp);
                    ctx.lineTo(axisX.width, y + axisY.sharp);
                    ctx.strokeStyle=this.parent.crosshairColor;
                    ctx.stroke();

                    var label=formatNumber(axisY.fromScreen(y, 1), decimalPlace, diminutive);
                    var w=ctx.measureText(label).width + 2;
                    var h=this.parent.fontHeight + 1;
                    var half=(h/2)|0;

                    ctx.fillStyle=this.parent.crosshairColor;
                    ctx.fillRect(axisX.width+1, y-half, w, h);

                    ctx.fillStyle=this.parent.crosshairTextColor;
                    ctx.textBaseline="middle";
                    ctx.fillText(label, axisX.width+2, y);

                    if (this.overlayCount>0)
                    {
                        label=formatNumber(axisV.fromScreen(y, 1), decimalPlace, diminutive);
                        w=ctx.measureText(label).width + 2;

                        ctx.fillStyle=this.parent.crosshairColor;
                        ctx.fillRect(-w, y-half, w, h);

                        ctx.fillStyle=this.parent.crosshairTextColor;
                        ctx.textAlign="end";
                        ctx.fillText(label, -1, y);
                    }
                }

                // Vertical crosshair
                if (this.crosshairX != -1 && (this.crosshairStyle & chartFactory.CROSSHAIR_VERTICAL)>0)
                {
                    var x=axisX.toScreen(this.crosshairX);

                    ctx.beginPath();
                    if ((this.crosshairStyle & chartFactory.CROSSHAIR_EXTEND_N)>0)
                        ctx.moveTo(x+0.5, -chartFactory.TOP_MARGIN);
                    else
                        ctx.moveTo(x+0.5, 0);
                    if ((this.crosshairStyle & chartFactory.CROSSHAIR_EXTEND_S)>0 && !hasGridLabelX)
                        ctx.lineTo(x+0.5, axisY.height + this.bottomMargin);
                    else
                        ctx.lineTo(x+0.5, axisY.height);
                    ctx.strokeStyle=this.parent.crosshairColor;
                    ctx.stroke();

                    var pt=series.points[this.crosshairX];
                    if (hasGridLabelX)
                    {
                        var label;
                        if (this.gridType==chartFactory.GRID_DATE_EVEN || this.gridType==chartFactory.GRID_DATE_ALIGN)
                            label=formatDate(pt.year, pt.month, pt.day);
                        else
                            label=formatDateTime(pt.month, pt.day, pt.hour, pt.min);

                        var w=ctx.measureText(label).width + 2;
                        var half=(w/2)|0;
                        var h=this.parent.fontHeight + 1;

                        ctx.fillStyle=this.parent.crosshairColor;
                        ctx.fillRect(x-half, axisY.height + (axisY.flip ? 0 : 1), w, h);

                        ctx.fillStyle=this.parent.crosshairTextColor;
                        ctx.textBaseline="top";
                        ctx.textAlign="center";
                        ctx.fillText(label, x, axisY.height+1);
                    }
                }
            
                ctx.restore();
            },

            slideX: function(distance)
            {
                var startIndex=this.axisX.startIndex;
                var endIndex=this.axisX.endIndex;

                if (distance>0)  // Slide towards the start of the data series
                {
                    if (startIndex>0)
                    {
                        if (startIndex<=distance)
                        {
                            distance=startIndex;
                            this.series.dig();
                        }

                        var i=startIndex - distance;
                        var colCount=this.axisX.colCount;

                        if (endIndex - i + 1<=colCount)
                            this.parent.viewSlideX(i, endIndex, this);
                        else
                            this.parent.viewSlideX(i, i + colCount - 1, this);
                    }
                }
                else  // Slide towards the end of the data series
                {
                    var i=startIndex - distance;
                    var j=endIndex - distance;
                    var n=this.series.points.length;

                    if (i>n-2) i=n-2;
                    if (j>n-1) j=n-1;

                    if (i != startIndex || j != endIndex)
                        this.parent.viewSlideX(i, j, this);
                }
            },

            slideY: function(axisY, y)
            {
                var dy=y - this.dragY;
                if (axisY.flip) dy= -dy;
                if (axisY.logScale())
                {
                    var shift=Math.pow(axisY.end / axisY.start, dy / axisY.height);
                    axisY.start *= shift;
                    axisY.end *= shift;
                }
                else
                {
                    var shift=dy * (axisY.end - axisY.start) / axisY.height;
                    axisY.start += shift;
                    axisY.end += shift;
                }

                var inc=axisY.inc;
                var indent=((axisY.start/inc)|0) * inc;
                if (indent<axisY.start)
                    indent += inc;
                axisY.indent=indent;  // First horizontal grid line
                this.draw(chartFactory.REASON_VIEW_SLIDE_Y);
            },

            zoomX: function(distance)
            {
                var startIndex=this.axisX.startIndex;
                var endIndex=this.axisX.endIndex;

                if (distance>0)  // Zoom out
                {
                    if (startIndex>0)
                    {
                        if (startIndex<=distance)
                        {
                            distance=startIndex;
                            this.series.dig();
                        }
                        this.parent.viewZoomX(startIndex - distance, endIndex, this);
                    }
                }
                else  // Zoom in
                {
                    var minColCount=(this.axisX.width / chartFactory.MAX_COL_WIDTH)|0;
                    var extra=endIndex - startIndex + 1 - minColCount;
                    if (extra>0)
                    {
                        distance= -distance;
                        if (distance>extra)
                            distance=extra;
                        this.parent.viewZoomX(startIndex + distance, endIndex, this);
                    }
                }
            },

            zoomY: function(axisY, y)
            {
                if (!axisY.flip) y=axisY.height-y;
                if (y>0)
                {
                    var anchor=axisY.fromScreen(this.dragY, 1);
                    var end;
                    if (axisY.logScale())
                        end=axisY.start * Math.pow(anchor / axisY.start, axisY.height / y);
                    else
                        end=axisY.start + axisY.height*(anchor - axisY.start)/y;

                    // Restrict the zooming range
                    var range=end - axisY.start;
                    var fold=range / axisY.ratio / (axisY.max - axisY.min);
                    var smallest=Math.pow(10, -this.series.decimalPlace);
                    if (range<smallest || fold>10)
                        return;

                    var interval=range * this.parent.fontHeight * 3 / axisY.height;
                    interval=roundInterval(interval);
                    // In case the interval has more decimal places than that needed for display
                    if (interval<smallest) interval=smallest;

                    axisY.end=end;
                    axisY.inc=interval;
                    this.draw(chartFactory.REASON_VIEW_ZOOM_Y);
                }
            },

            region: function(x, y)
            {
                if (x>=0)
                {
                    if (x<this.axisX.width)
                    {
                        if (y>=0)
                            if (y<=this.axisY.height)
                                return chartFactory.REGION_DRAWING;
                            else if ((this.gridStyle & chartFactory.GRID_LABEL_X)>0)
                                return chartFactory.REGION_X_AXIS;
                    }
                    else if (y>=0 && y<=this.axisY.height)
                        return chartFactory.REGION_Y_AXIS;
                }
                else if (this.overlayCount>0 && y >=0 && y<=this.axisV.height)
                    return chartFactory.REGION_V_AXIS;

                return 0;
            },

            selectAnnotation: function(x, y)
            {
                if (this.focusEngine != null)
                {
                    if (this.actionEngine != null && this.actionEngine != this.focusEngine)
                    {
                        var a=this.actionEngine.deselectAnnotation(this.series);
                        if (this.annotEvtFunc != undefined)
                            this.annotEvtFunc.call(this.caller, chartFactory.ANNOTATION_DESELECT, this.actionEngine, a, -1, -1);
                    }

                    var axisX=this.axisX;
                    var axisY=this.axisY;
                    var a=this.focusEngine.selectAnnotation(this.series, x, y, axisX, axisY);
                    if (this.annotEvtFunc != undefined)
                        this.annotEvtFunc.call(this.caller, chartFactory.ANNOTATION_SELECT_BEGIN, this.focusEngine, a, axisX.toScreen(x) + axisX.frameOffset, y + axisY.frameOffset);

                    this.actionEngine=this.focusEngine;
                    this.canvas.css("cursor", "move");
                    this.draw(chartFactory.REASON_ANNOTATION);
                    return true;
                }

                if (this.actionEngine != null)
                {
                    var a=this.actionEngine.deselectAnnotation(this.series);
                    if (this.annotEvtFunc != undefined)
                        this.annotEvtFunc.call(this.caller, chartFactory.ANNOTATION_DESELECT, this.actionEngine, a, -1, -1);

                    this.actionEngine=null;
                    this.draw(chartFactory.REASON_ANNOTATION);
                }

                return false;
            },

            addAnnotation: function(x, y)
            {
                var engine=this.engineMap[this.mode];
                if (engine != undefined)
                {
                    var axisX=this.axisX;
                    var axisY=this.axisY;

                    var a=engine.addAnnotation(this.series, x, y, axisX, axisY, this.mode);
                    if (a != null)
                    {
                        if (this.annotEvtFunc != undefined)
                            this.annotEvtFunc.call(this.caller, chartFactory.ANNOTATION_ADD, engine, a, axisX.toScreen(x) + axisX.frameOffset, y + axisY.frameOffset);

                        this.focusEngine=engine;
                        this.actionEngine=engine;

                        this.canvas.css("cursor", "move");
                        this.draw(chartFactory.REASON_ANNOTATION);
                        return true;
                    }
                }

                return false;
            },

            deleteAnnotation: function()
            {
                if (this.actionEngine != null)
                {
                    var a=this.actionEngine.deleteAnnotation(this.series);
                    if (this.annotEvtFunc != undefined)
                        this.annotEvtFunc.call(this.caller, chartFactory.ANNOTATION_DELETE, this.actionEngine, a, -1, -1);

                    this.actionEngine=null;
                    this.draw(chartFactory.REASON_ANNOTATION);
                }
            },

            clearAnnotations: function(mode)
            {
                var engine=this.engineMap[mode];
                if (engine != undefined)
                {
                    engine.clearAnnotations(this.series, mode);
                    this.draw(chartFactory.REASON_ANNOTATION);
                }
            },

            copyAnnotation: function()
            {
                if (this.actionEngine != null)
                {
                    var a=this.actionEngine.copyAnnotation(this.series, this.axisX, this.axisY);
                    if (a != null)
                    {
                        if (this.annotEvtFunc != undefined)
                            this.annotEvtFunc.call(this.caller, chartFactory.ANNOTATION_COPY, this.actionEngine, a, -1, -1);

                        this.draw(chartFactory.REASON_ANNOTATION);
                        return true;
                    }
                }

                return false;
            },

            moveAnnotation: function(x, y)
            {
                if (this.actionEngine != null)
                {
                    if ((this.dragX != x || this.dragY != y) &&
                        this.actionEngine.moveAnnotation(this.series, this.dragX, this.dragY, x, y, this.axisX, this.axisY))
                    {
                        this.dragX=x;
                        this.dragY=y;
                        this.draw(chartFactory.REASON_ANNOTATION);
                    }
                    return true;
                }
                else
                    return false;
            },

            refreshAnnotation: function()
            {
                this.draw(chartFactory.REASON_ANNOTATION);
            },

            hitTest: function(x, y)
            {
                var res=this.htres;

                res.focusEngine=null;
                res.focusAnnot=null;
                res.defocusEngine=null;
                res.defocusAnnot=null;

                // focusEngine==null                         => No focus is found
                // focusEngine!=null && focusAnnot==null     => Focus remains unchanged
                // focusEngine!=null && focusAnnot!=null     => Focus moves to this annotation
                // defocusEngine!=null && defocusAnnot!=null => Focus is lost from this annotation

                for (var i=0;i<this.engines.length;i++)
                    this.engines[i].hitTest(this.series, x, y, this.axisX, this.axisY, res);

                if (this.annotEvtFunc != undefined)
                {
                    if (res.defocusAnnot != null)
                        this.annotEvtFunc.call(this.caller, chartFactory.ANNOTATION_DEFOCUS, res.defocusEngine, res.defocusAnnot, -1, -1);
                    if (res.focusAnnot != null)
                        this.annotEvtFunc.call(this.caller, chartFactory.ANNOTATION_FOCUS, res.focusEngine, res.focusAnnot, this.axisX.toScreen(x) + this.axisX.frameOffset, y + this.axisY.frameOffset);
                }

                this.focusEngine=res.focusEngine;
                if (res.focusAnnot != null || res.defocusAnnot != null)
                    this.draw(chartFactory.REASON_ANNOTATION);
            },

            mousemove: function(pageX, pageY)
            {
                if (!this.active) return;

                var offset=this.canvas.offset();
                var x=pageX - offset.left - chartFactory.LEFT_MARGIN;
                var y=pageY - (offset.top|0) - chartFactory.TOP_MARGIN;  // "top" is not an integer in IE
                var region=this.region(x, y);
                var i=this.axisX.fromScreen(x);

                if (this.drag2Slide)  // Sliding
                {
                    if (region==chartFactory.REGION_DRAWING)
                    {
                        if (!this.moveAnnotation(i, y))
                        {
                            var distance=i - this.dragX;
                            if (distance!=0)
                            {
                                this.slideX(distance);  // No need to adjust the drag origin
                            }
                            else if (this.gridScale==chartFactory.GRID_SCALE_FREE && this.dragY != y)
                            {
                                this.slideY(this.axisY, y);
                                if (this.overlayCount>0)
                                    this.slideY(this.axisV, y);
                                this.dragY=y;
                            }
                        }
                    }
                    else
                    {
                        this.canvas.css("cursor", "auto");
                        this.drag2Slide=false;
                    }
                }
                else if (this.drag2ZoomX)  // Zoom X
                {
                    if (region==chartFactory.REGION_X_AXIS || region==chartFactory.REGION_DRAWING)
                    {
                        var distance=i - this.dragX;
                        if (distance!=0)
                            this.zoomX(distance);  // No need to adjust the drag origin
                    }
                    else
                    {
                        this.canvas.css("cursor", "auto");
                        this.drag2ZoomX=false;
                    }
                }
                else if (this.drag2ZoomY)  // Zoom Y
                {
                    if (region==chartFactory.REGION_Y_AXIS || region==chartFactory.REGION_DRAWING)
                    {
                        if (this.dragY != y)
                        {
                            this.zoomY(this.axisY, y);
                            this.dragY=y;
                        }
                    }
                    else
                    {
                        this.canvas.css("cursor", "auto");
                        this.drag2ZoomY=false;
                    }
                }
                else if (this.drag2ZoomV)  // Zoom V
                {
                    if (region==chartFactory.REGION_V_AXIS || region==chartFactory.REGION_DRAWING)
                    {
                        if (this.dragY != y)
                        {
                            this.zoomY(this.axisV, y);
                            this.dragY=y;
                        }
                    }
                    else
                    {
                        this.canvas.css("cursor", "auto");
                        this.drag2ZoomV=false;
                    }
                }
                else if (region==chartFactory.REGION_DRAWING)  // Crosshair
                {
                    if (this.crosshairX != i || this.crosshairY != y)
                    {
                        this.parent.crosshair(i, y, this);
                        if (this.crosshairFunc != undefined)
                            this.crosshairFunc.call(this.caller, this.axisX.toScreen(i) + this.axisX.frameOffset, y + this.axisY.frameOffset);
                        this.hitTest(i, y);
                    }
                }
                else if (this.crosshairX != -1 || this.crosshairY != -1)  // Hide crosshair
                {
                    this.parent.crosshair(-1, -1, this);
                    if (this.crosshairFunc != undefined)
                        this.crosshairFunc.call(this.caller, -1, -1);
                }
            },

            mousedown: function(pageX, pageY)
            {
                if (!this.active) return;

                var offset=this.canvas.offset();
                var x=pageX - offset.left - chartFactory.LEFT_MARGIN;
                var y=pageY - (offset.top|0) - chartFactory.TOP_MARGIN;  // "top" is not an integer in IE
                var region=this.region(x, y);

                if (region==chartFactory.REGION_DRAWING)
                {
                    this.parent.crosshair(-1, -1, this);
                    if (this.crosshairFunc != undefined)
                        this.crosshairFunc.call(this.caller, -1, -1);

                    var i=this.axisX.fromScreen(x);
                    if (this.selectAnnotation(i, y) || this.addAnnotation(i, y))
                    {
                        this.drag2Slide=true;
                        this.dragX=i;
                        this.dragY=y;
                    }
                    else if (!this.clickDrawers(i, y))
                    {
                        this.drag2Slide=true;
                        this.dragX=i;
                        this.dragY=y;
                        this.canvas.css("cursor", (this.gridScale==chartFactory.GRID_SCALE_FREE ? "move" : "e-resize"));
                    }
                }
                else if (region==chartFactory.REGION_X_AXIS)
                {
                    this.canvas.css("cursor", "e-resize");
                    this.drag2ZoomX=true;
                    this.dragX=this.axisX.fromScreen(x);
                }
                else if (region==chartFactory.REGION_Y_AXIS)
                {
                    if (this.gridScale==chartFactory.GRID_SCALE_FREE)
                    {
                        this.canvas.css("cursor", "s-resize");
                        this.drag2ZoomY=true;
                        this.dragY=y;
                    }
                }
                else if (region==chartFactory.REGION_V_AXIS)
                {
                    if (this.gridScale==chartFactory.GRID_SCALE_FREE)
                    {
                        this.canvas.css("cursor", "s-resize");
                        this.drag2ZoomV=true;
                        this.dragY=y;
                    }
                }
            },

            mouseup: function(pageX, pageY)
            {
                if (this.drag2Slide && this.actionEngine != null && this.annotEvtFunc != undefined)
                {
                    var offset=this.canvas.offset();
                    var x=pageX - offset.left - chartFactory.LEFT_MARGIN;
                    var y=pageY - (offset.top|0) - chartFactory.TOP_MARGIN;  // "top" is not an integer in IE

                    var axisX=this.axisX;
                    var i=axisX.fromScreen(x);
                    var a=this.actionEngine.getAnnotation(this.series);

                    this.annotEvtFunc.call(this.caller, chartFactory.ANNOTATION_SELECT_END, this.actionEngine, a, axisX.toScreen(i) + axisX.frameOffset, y + this.axisY.frameOffset);
                }
                this.cancelDrag();
            },

            mouseout: function(pageX, pageY)
            {
                this.cancelDrag();
            },

            mouseclick: function(pageX, pageY)
            {
            },

            cancelDrag: function()
            {
                this.canvas.css("cursor", "auto");
                this.drag2Slide=false;
                this.drag2ZoomX=false;
                this.drag2ZoomY=false;
                this.drag2ZoomV=false;
            },

            keydown: function(evt)
            {
                if (evt.keyCode==46)
                    this.deleteAnnotation();
            },

            touchstart: function(evt)
            {
                evt.preventDefault();

                if (evt.originalEvent.touches.length==1)  // The first finger on the surface
                {
                    var tp=evt.originalEvent.touches[0];
                    this.touchTime=evt.timeStamp;
                    this.touchX=tp.pageX;
                    this.touchY=tp.pageY;

                    this.mousemove(tp.pageX, tp.pageY);
                }
            },

            touchmove: function(evt)
            {
                evt.preventDefault();

                var tp=evt.originalEvent.touches[0];
                this.touchX=tp.pageX;
                this.touchY=tp.pageY;

                if (this.touchTime==chartFactory.TOUCH_TO_MOVE || this.touchTime==chartFactory.TOUCH_TO_DRAG)
                {
                    this.mousemove(tp.pageX, tp.pageY);
                }
                else if (evt.timeStamp - this.touchTime>chartFactory.TOUCH_HOLD_TIME)
                {
                    this.touchTime=chartFactory.TOUCH_TO_DRAG;
                    this.mousedown(tp.pageX, tp.pageY);
                    this.mousemove(tp.pageX, tp.pageY);
                }
                else
                {
                    this.touchTime=chartFactory.TOUCH_TO_MOVE;
                    this.mousemove(tp.pageX, tp.pageY);
                }
            },

            touchend: function(evt)
            {
                evt.preventDefault();

                if (evt.originalEvent.touches.length==0)  // The last finger off the surface
                {
                    if (this.touchTime>=0)
                    {
                        this.mousedown(this.touchX, this.touchY);
                        this.mouseup(this.touchX, this.touchY);
                        this.mouseclick(this.touchX, this.touchY);
                        this.mousemove(this.touchX, this.touchY);
                    }
                    else if (this.touchTime==chartFactory.TOUCH_TO_DRAG)
                    {
                        this.mouseup(this.touchX, this.touchY);
                        this.mouseclick(this.touchX, this.touchY);
                        this.mousemove(this.touchX, this.touchY);
                    }

                    this.touchTime= -1;
                }
            },

            touchcancel: function(evt)
            {
                this.touchend(evt);
            },

            //========================================
            // PriceChart event functions
            //========================================

            _mousemove: function(evt) { evt.data.mousemove(evt.pageX, evt.pageY); },
            _mousedown: function(evt) { evt.data.mousedown(evt.pageX, evt.pageY); },
            _mouseup: function(evt) { evt.data.mouseup(evt.pageX, evt.pageY); },
            _mouseout: function(evt) { evt.data.mouseout(evt.pageX, evt.pageY); },
            _mouseclick: function(evt) { evt.data.mouseclick(evt.pageX, evt.pageY); },

            _keydown: function(evt) { evt.data.keydown(evt); },

            _touchstart: function(evt) { evt.data.touchstart(evt); },
            _touchmove: function(evt) { evt.data.touchmove(evt); },
            _touchend: function(evt) { evt.data.touchend(evt); },
            _touchcancel: function(evt) { evt.data.touchcancel(evt); },

            ctr: function()
            {
            },

            /******************************************************************************/

            //==========================//
            // *** Other TA Drawers *** //
            //==========================//

            addTurnover: function(options)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.TURNOVER)
                        return null;
                return this.addDrawer(new TurnoverDrawer(chartFactory.TURNOVER, options));
            },

            removeTurnover: function()
            {
                this.removeDrawer(chartFactory.TURNOVER);
            },

            addHistogram: function(upColor, upFillColor, downColor, downFillColor, zOrder)
            {
                return this.addHistogram2({
                    upColor: upColor,
                    upFillColor: upFillColor,
                    downColor: downColor,
                    downFillColor: downFillColor
                }, zOrder);
            },
            addHistogram2: function(styleobj, zOrder)
            {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==chartFactory.HISTOGRAM)
                        return null;
                return this.addDrawer(new HistogramDrawer(chartFactory.HISTOGRAM, styleobj), false, zOrder);
            },

            removeHistogram: function()
            {
                this.removeDrawer(chartFactory.HISTOGRAM);
            },

            addOBV: function(options)
            {
                var name=chartFactory.OBV;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new OBVDrawer(name, options));
            },

            removeOBV: function()
            {
                this.removeDrawer(chartFactory.OBV);
            },

            addDMI: function(options)
            {
                var name=chartFactory.DMI;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new DMIDrawer(name, options));
            },

            removeDMI: function()
            {
                this.removeDrawer(chartFactory.DMI);
            },

            addBollinger: function(options, zOrder)
            {
                var name=chartFactory.BOLLINGERBANDS+"_"+options.period;
                if (options.deviation) name+="_"+options.deviation.value;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new BollingerDrawer(name, options), false, zOrder);
            },

            removeBollinger: function(options)
            {
                var name=chartFactory.BOLLINGERBANDS+"_"+options.period;
                if (options.deviation) name+="_"+options.deviation.value;
                this.removeDrawer(name);
            },

            addDPO: function(options)
            {
                var name=chartFactory.DPO;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new DPODrawer(name, options));
            },

            removeDPO: function()
            {
                this.removeDrawer(chartFactory.DPO);
            },

            addATR: function(options)
            {
                var name=chartFactory.ATR;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new ATRDrawer(name, options));
            },

            removeATR: function()
            {
                this.removeDrawer(chartFactory.ATR);
            },

            addADXR: function(options)
            {
                var name=chartFactory.ADXR;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new DMIDrawer(name, options));
            },

            removeADXR: function()
            {
                this.removeDrawer(chartFactory.ADXR);
            },

            addSAR: function(options, zOrder)
            {
                var name=chartFactory.SAR;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new SARDrawer(name, options), false, zOrder);
            },

            removeSAR: function()
            {
                this.removeDrawer(chartFactory.SAR);
            },

            addBias: function(options)
            {
                var name=chartFactory.BIAS;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new BiasDrawer(name, options));
            },

            removeBias: function()
            {
                this.removeDrawer(chartFactory.BIAS);
            },

            addVector: function(options)
            {
                var name=chartFactory.VECTOR;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new VectorDrawer(name, options));
            },

            removeVector: function(period, period2)
            {
                this.removeDrawer(chartFactory.VECTOR + "_" + period + "_" + period2);
            },

            addACD: function(color)
            {
                var name=chartFactory.ACD;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new ACDDrawer(name, color));
            },

            removeACD: function()
            {
                this.removeDrawer(chartFactory.ACD);
            },

            addEnvelope: function(options, zOrder)
            {
                var name=chartFactory.ENVELOPE+"_"+options.period;
                if (options.factor) name+="_"+options.factor.value;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new EnvelopeDrawer(name, options), false, zOrder);
            },

            removeEnvelope: function(options)
            {
                var name=chartFactory.ENVELOPE+"_"+options.period;
                if (options.factor) name+="_"+options.factor.value;
                this.removeDrawer(name);
            },

            addLRT: function(options, zOrder)
            {
                var name=chartFactory.LRT;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new LRTDrawer(name, options), false, zOrder);
            },

            removeLRT: function()
            {
                this.removeDrawer(chartFactory.LRT);
            },

            addWeightedClose: function(options, zOrder)
            {
                var name=chartFactory.WEIGHTED_CLOSE;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new WeightedCloseDrawer(name, options), false, zOrder);
            },

            removeWeightedClose: function()
            {
                this.removeDrawer(chartFactory.WEIGHTED_CLOSE);
            },

            addUI: function(options)
            {
                var name=chartFactory.UI;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new UIDrawer(name, options));
            },

            removeUI: function()
            {
                this.removeDrawer(chartFactory.UI);
            },

            addWAD: function(options)
            {
                var name=chartFactory.WAD;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new WADDrawer(name, options));
            },

            removeWAD: function()
            {
                this.removeDrawer(chartFactory.WAD);
            },

            addTrix: function(options)
            {
                var name=chartFactory.TRIX;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new TrixDrawer(name, options));
            },

            removeTrix: function()
            {
                this.removeDrawer(chartFactory.TRIX);
            },

            addVOSC: function(options)
            {
                var name=chartFactory.VOSC;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new VOSCDrawer(name, options));
            },

            removeVOSC: function(options)
            {
                this.removeDrawer(chartFactory.VOSC);
            },

            addVE: function(options)
            {
                var name=chartFactory.VE;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new VEDrawer(name, options));
            },

            removeVE: function()
            {
                this.removeDrawer(chartFactory.VE);
            },

            addVROC: function(options)
            {
                var name=chartFactory.VROC;
                options.field="volume";
                options.relative=true;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new VROCDrawer(name, options));
            },

            removeVROC: function()
            {
                this.removeDrawer(chartFactory.VROC);
            },

            addPROC: function(options)
            {
                var name=chartFactory.PROC;
                options.field="close";
                options.relative=true;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new VROCDrawer(name, options));
            },

            removePROC: function()
            {
                this.removeDrawer(chartFactory.PROC);
            },

            addPCV: function(options)
            {
                var name=chartFactory.PCV;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new PCVDrawer(name, options));
            },

            removePCV: function()
            {
                this.removeDrawer(chartFactory.PCV);
            },

            addALF: function(options)
            {
                var name=chartFactory.ALF;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new ALFDrawer(name, options));
            },

            removeALF: function()
            {
                this.removeDrawer(chartFactory.ALF);
            },

            addPOSC: function(options)
            {
                var name=chartFactory.POSC;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new POSCDrawer(name, options));
            },

            removePOSC: function()
            {
                this.removeDrawer(chartFactory.POSC);
            },

            addNVI: function(options)
            {
                var name=chartFactory.NVI + "_" + options.s.period;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new NVIDrawer(name, options));
            },

            removeNVI: function(options)
            {
                this.removeDrawer(chartFactory.NVI + "_" + options.s.period);
            },

            addCC: function(options)
            {
                var name=chartFactory.CC;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new CCDrawer(name, options));
            },

            removeCC: function()
            {
                this.removeDrawer(chartFactory.CC);
            },

            addKC: function(options, zOrder)
            {
                var name=chartFactory.KC+"_"+options.period;
                if (options.atr) name+="_"+options.atr.value;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new KCDrawer(name, options), false, zOrder);
            },

            removeKC: function(options)
            {
                var name=chartFactory.KC+"_"+options.period;
                if (options.atr) name+="_"+options.atr.value;
                this.removeDrawer(name);
            },

            addEOM: function(options)
            {
                var name=chartFactory.EOM;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new EOMDrawer(name, options));
            },

            removeEOM: function(period)
            {
                this.removeDrawer(chartFactory.EOM);
            },

            addRMI: function(options)
            {
                var name=chartFactory.RMI;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new RMIDrawer(name, options));
            },

            removeRMI: function()
            {
                this.removeDrawer(chartFactory.RMI);
            },

            addMassIndex: function(options)
            {
                var name=chartFactory.MASS_INDEX;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new MassIndexDrawer(name, options));
            },

            removeMassIndex: function()
            {
                this.removeDrawer(chartFactory.MASS_INDEX);
            },

            addMFI: function(options)
            {
                var name=chartFactory.MFI;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new MFIDrawer(name, options));
            },

            removeMFI: function()
            {
                this.removeDrawer(chartFactory.MFI);
            },

            addChaikinOsc: function(options)
            {
                var name=chartFactory.CHAIKIN_OSC;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new ChaikinOscDrawer(name, options));
            },

            removeChaikinOsc: function()
            {
                this.removeDrawer(chartFactory.CHAIKIN_OSC);
            },

            addChaikinVol: function(options)
            {
                var name=chartFactory.CHAIKIN_VOL;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new ChaikinVolDrawer(name, options));
            },

            removeChaikinVol: function()
            {
                this.removeDrawer(chartFactory.CHAIKIN_VOL);
            },

            addPsychological: function(options)
            {
                var name=chartFactory.PSY;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new PsychologicalDrawer(name, options));
            },

            removePsychological: function()
            {
                this.removeDrawer(chartFactory.PSY);
            },

            addTVMA: function(options, zOrder)
            {
                var name=chartFactory.TVMA;

                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].name==name)
                        return null;
                return this.addDrawer(new TVMADrawer(name, options), false, zOrder);
            },

            removeTVMA: function(period)
            {
                this.removeDrawer(chartFactory.TVMA);
            },

            addKRI: function(options) {
                var name=chartFactory.KRI + "_" + options.period;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new KRIDrawer(name, options));
            },

            removeKRI: function(options) {
                this.removeDrawer(chartFactory.KRI + "_" + options.period);
            },

            addShinoharaRatio: function(options) {
                var name=chartFactory.SHINOHARA_RATIO;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new SHIDrawer(name, options));
            },

            removeShinoharaRatio: function(options) {
                this.removeDrawer(chartFactory.SHINOHARA_RATIO);
            },

            addFIB: function(options, zOrder) {
                var name=chartFactory.FIB;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new FIBDrawer(name, options), false, zOrder);
            },

            removeFIB: function(options) {
                this.removeDrawer(chartFactory.FIB);
            },

            addVR: function(options) {
                var name=chartFactory.VR;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new VRDrawer(name, options));
            },

            removeVR: function() {
                this.removeDrawer(chartFactory.VR);
            },

            addVWAP: function(options, zOrder) {
                var name=chartFactory.VWAP;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new VWAPDrawer(name, options), false, zOrder);
            },

            removeVWAP: function() {
                this.removeDrawer(chartFactory.VWAP);
            },

            addMargin: function(options) {
                var name=chartFactory.Margin;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new MarginDrawer(name, options));
            },

            removeMargin: function() {
                this.removeDrawer(chartFactory.Margin);
            },

            addRC: function(options) {
                var name=chartFactory.RC;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new RCDrawer(name, options));
            },

            removeRC: function() {
                this.removeDrawer(chartFactory.RC);
            },

            addTP: function(options, zOrder) {
                var name=chartFactory.TP;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new TPDrawer(name, options), false, zOrder);
            },

            removeTP: function() {
                this.removeDrawer(chartFactory.TP);
            },

            addUPDW: function(options) {
                var name=chartFactory.UPDW + "_" + options.period;
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==name)
                        return null;
                return this.addDrawer(new UPDWDrawer(name, options));
            },

            removeUPDW: function(options) {
                this.removeDrawer(chartFactory.UPDW + "_" + options.period);
            },

            addPRR: function(options, zOrder) {
                for (var i=0;i<this.drawers.length;i++)
                    if (this.drawers[i].obj.name==chartFactory.PRR)
                        return null;
                return this.addDrawer(new PRRDrawer(chartFactory.PRR, options), false, zOrder);
            },

            removePRR: function() {
                this.removeDrawer(chartFactory.PRR);
            }

            /******************************************************************************/

//            addTrade: function()
//            {
//                for (var i=0;i<this.drawers.length;i++)
//                    if (this.drawers[i].name==chartFactory.TRADE)
//                        return null;
//                return this.addDrawer(new TradeDrawer(chartFactory.TRADE));
//            },
//
//            removeTrade: function()
//            {
//                this.removeDrawer(chartFactory.TRADE);
//            },

        };

        //========================================
        // CondenseChart class
        //========================================

        function CondenseChart(name, width, height, selector, parent, gridType, color, color2, fillColor, fillColor2, fillColor3, handleColor, chartColor, gridLabelColor)
        {
            this.name=name;
            this.width=width;
            this.height=height;
            this.selector=selector;
            this.parent=parent;

            this.joinDataURL=false;
            this.gridType=(gridType==undefined ? chartFactory.GRID_DATE_EVEN : gridType);
            this.color=(color==undefined ? "#CCCCCC" : color);
            this.color2=(color2==undefined ? "#0033CC" : color2);
            this.fillColor=(fillColor==undefined ? "rgba(255,255,255,0.75)" : fillColor); //#FFFFFF
            this.fillColor2=(fillColor2==undefined ? "rgba(240,240,255,0.75)" : fillColor2); //#F0F0FF
            this.fillColor3=(fillColor3==undefined ? "rgba(255,255,255,0)" : fillColor3); //#FFFFFF
            this.handleColor=(handleColor==undefined ? "#333333" : handleColor);
            this.chartColor=(chartColor==undefined ? this.parent.chartColor : chartColor);
            this.gridLabelColor=(gridLabelColor==undefined ? this.parent.gridLabelColor : gridLabelColor);

            this.canvas=null;
            this.ctx=null;
            this.displayRatio=1;  // For hi-res display
            this.series=null;
            this.startDate=null;
            this.endDate=null;
            this.active=false;
            this.axisX={
                toScreen: function(i) { return (i+0.5)*this.colWidth|0; },
                toBorder: function(i) { return i*this.colWidth|0; },
                fromScreen: function(x) {
                    for (var i=x/this.colWidth|0; i<this.pointCount; i++)
                    {
                        var next=(i+1)*this.colWidth|0;
                        if (x<next) return i;
                    }
                    return this.pointCount-1;
                }
            };
            this.axisY=new AxisY();
            this.drag2Slide=false;
            this.drag2ExpandL=false;
            this.drag2ExpandR=false;
            this.dragX= -1;

            this.ctr();
        }

        CondenseChart.prototype={
            className: "CondenseChart",

            attach: function(canvas)
            {
                this.canvas=canvas;
                this.ctx=canvas.get(0).getContext("2d");

                var devRatio=window.devicePixelRatio || 1;                 // IE 10 doesn't have this property
                var bkStoreRatio=this.ctx.webkitBackingStorePixelRatio || 1;
                var ratio=devRatio / bkStoreRatio;
                if (ratio != 1)
                {
                    canvas.get(0).width=this.width * ratio;                // Expand the canvas coordinate system ...
                    canvas.get(0).height=this.height * ratio;
                    canvas.css({ width:this.width, height:this.height });  // ... and put the canvas in the desired HTML box
                    this.ctx.scale(ratio, ratio);                          // Finally, scale up everything to create the original drawing
                }
                this.displayRatio=ratio;

                canvas.mousemove(this, this._mousemove);
                canvas.mousedown(this, this._mousedown);
                canvas.mouseup(this, this._mouseup);
                canvas.mouseout(this, this._mouseout);
                canvas.click(this, this._mouseclick);

                canvas.keydown(this, this._keydown);

                canvas.on("touchstart", this, this._touchstart);
                canvas.on("touchmove", this, this._touchmove);
                canvas.on("touchend", this, this._touchend);
                canvas.on("touchcancel", this, this._touchcancel);
            },

            data: function(series)
            {
                if (series==undefined)
                    return this.series;
                else if (series != this.series)
                {
                    this.series=series;
                    this.startDate=null;
                    this.endDate=null;

                    this.active=false;
                    this.draw(chartFactory.REASON_BLANK);
                }
            },

            showByDates: function(startDate, endDate, axisX, series)
            {
                if (endDate != null && endDate<startDate)
                    return;

                if (series != null && series.ready)
                {
                    var i=series.indexOf(startDate);
                    if (i!= -1)
                    {
                        this.axisX.startIndex=i;
                        if (endDate != null)
                        {
                            var j=series.indexOf(endDate);
                            axisX.endIndex=(j!= -1 && j!=i ? j : series.points.length-1);
                        }
                        else
                            axisX.endIndex=series.points.length-1;

                        this.active=true;
                        this.draw(chartFactory.REASON_SHOW);
                        return;
                    }
                }

                this.startDate=startDate;
                this.endDate=endDate;
            },

            showByCount: function(count, axisX, series)
            {
            },

            showByObject: function(obj, axisX, series)
            {
                if (obj.className==PriceChart.prototype.className && obj.series==series)  // "obj" is a PriceChart object with the same series
                    if (obj.active)
                    {
                        axisX.startIndex=obj.axisX.startIndex;
                        axisX.endIndex=obj.axisX.endIndex;

                        this.active=true;
                        this.draw(chartFactory.REASON_SHOW);
                    }
                    else
                    {
                        this.startDate=obj.startDate;
                        this.endDate=obj.endDate;
                    }
            },

            show: function(/* optional */ p1, p2)
            {
                var t1=$.type(p1);
                var t2=$.type(p2);

                if (t1=="date")
                {
                    if (t2=="date")
                        this.showByDates(p1, p2, this.axisX, this.series);
                    else
                        this.showByDates(p1, null, this.axisX, this.series);
                }
                else if (t1=="number")
                    this.showByCount(p1, this.axisX, this.series);
                else if (t1=="object")
                    this.showByObject(p1, this.axisX, this.series);
                else
                    this.draw(chartFactory.REASON_SHOW);
            },

            setGridType: function(value)
            {
                if (value != this.gridType)
                {
                    this.gridType=value;
                    if (this.active)
                        this.draw(chartFactory.REASON_GRID_TYPE);
                }
            },

            dataReady: function(series)
            {
                if (series==this.series && this.startDate != null)
                {
                    var i=series.indexOf(this.startDate);
                    if (i!= -1)
                    {
                        this.axisX.startIndex=i;
                        if (this.endDate != null)
                        {
                            var j=series.indexOf(this.endDate);
                            this.axisX.endIndex=(j!= -1 && j!=i ? j : series.points.length-1);
                        }
                        else
                            this.axisX.endIndex=series.points.length-1;

                        this.active=true;
                        this.draw(chartFactory.REASON_DATA_READY);
                    }
                }
            },

            dataAppend: function(series)
            {
                if (series==this.series)
                    if (this.active)
                    {
                        if (this.axisX.endIndex==series.points.length-2)
                            this.axisX.endIndex++;
                        this.draw(chartFactory.REASON_DATA_APPEND);
                    }
                    else if (this.startDate != null)  // Same as dataReady()...
                    {
                        var i=series.indexOf(this.startDate);
                        if (i!= -1)
                        {
                            this.axisX.startIndex=i;
                            if (this.endDate != null)
                            {
                                var j=series.indexOf(this.endDate);
                                this.axisX.endIndex=(j!= -1 && j!=i ? j : series.points.length-1);
                            }
                            else
                                this.axisX.endIndex=series.points.length-1;

                            this.active=true;
                            this.draw(chartFactory.REASON_DATA_READY);
                        }
                    }
            },

            dataUpdate: function(series)
            {
                if (series==this.series && this.active)
                    this.draw(chartFactory.REASON_DATA_UPDATE);
            },

            dataDiscover: function(series, size)
            {
                if (series==this.series && this.active)
                {
                    this.axisX.startIndex += size;
                    this.axisX.endIndex += size;
                    this.cancelDrag();
                    this.draw(chartFactory.REASON_DATA_DISCOVER);
                }
            },

            futureDates: function(series)
            {
                if (series==this.series && this.active)
                {
                    var n=series.points.length;
                    var axisX=this.axisX;

                    if (axisX.endIndex>=n)
                    {
                        axisX.endIndex=n-1;
                        if (axisX.startIndex>=axisX.endIndex)
                            axisX.startIndex=(axisX.endIndex>0 ? axisX.endIndex-1 : 0);
                    }
                    this.draw(chartFactory.REASON_FUTURE_DATES);
                }
            },

            gaps: function(series)
            {
                if (series==this.series && this.active)
                {
                    this.startDate=null;
                    this.endDate=null;

                    this.active=false;
                    this.draw(chartFactory.REASON_BLANK);
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.width=this.width;
                serObj.height=this.height;
                serObj.selector=this.selector;
                serObj.parent=ctx.writeObject(this.parent);
                serObj.series=ctx.writeObject(this.series);
                if (this.active)
                {
                    serObj.startDate=this.series.points[this.axisX.startIndex].date;
                    serObj.endDate=this.series.points[this.axisX.endIndex].date;
                }
                else
                {
                    serObj.startDate=this.startDate;
                    serObj.endDate=this.endDate;
                }
                serObj.gridType=this.gridType;
                serObj.color=this.color;
                serObj.color2=this.color2;
                serObj.fillColor=this.fillColor;
                serObj.fillColor2=this.fillColor2;
                serObj.fillColor3=this.fillColor3;
                serObj.handleColor=this.handleColor;
            },

            deserialize: function(serObj, ctx)
            {
                this.width=serObj.width;
                this.height=serObj.height;
                this.selector=serObj.selector;
                this.parent=ctx.readObject(serObj.parent);
                this.series=ctx.readObject(serObj.series);
                if (serObj.startDate != null)
                    this.startDate=new Date(serObj.startDate);
                if (serObj.endDate != null)
                    this.endDate=new Date(serObj.endDate);
                this.gridType=serObj.gridType;
                this.color=serObj.color;
                this.color2=serObj.color2;
                this.fillColor=serObj.fillColor;
                this.fillColor2=serObj.fillColor2;
                this.fillColor3=serObj.fillColor3;
                this.handleColor=serObj.handleColor;
            },

            viewSlideX: function(startIndex, endIndex)
            {
                this.axisX.startIndex=startIndex;
                this.axisX.endIndex=endIndex;
                this.draw(chartFactory.REASON_VIEW_SLIDE_X);
            },

            viewZoomX: function(startIndex, endIndex)
            {
                this.axisX.startIndex=startIndex;
                this.axisX.endIndex=endIndex;
                this.draw(chartFactory.REASON_VIEW_ZOOM_X);
            },

            crosshair: function(x, y)
            {
            },

            resize: function(w, h)
            {
                if (w != this.width || h != this.height)
                {
                    var ratio=this.displayRatio;
                    if (ratio==1)
                    {
                    this.canvas.get(0).width=w;
                    this.canvas.get(0).height=h;
                    }
                    else
                    {
                        this.canvas.get(0).width=w * ratio;
                        this.canvas.get(0).height=h * ratio;
                        this.canvas.css({ width:w, height:h });
                        this.ctx.scale(ratio, ratio);
                    }
                    this.width=w;
                    this.height=h;

                    if (this.active)
                        this.draw(chartFactory.REASON_RESIZE);
                }
            },

            gridX_DateEven: function(res)
            {
                res.width=this.width - chartFactory.LEFT_MARGIN_THIN - chartFactory.RIGHT_MARGIN;

                var maxLabelCount=res.width / this.parent.gridLabelWidth / 2;
                var n=this.series.points.length;

                var inc=Math.ceil(n / maxLabelCount);
                res.colWidth=res.width / n;                     // "colWidth" is a floating point number
                if (res.colWidth>chartFactory.MAX_COL_WIDTH)
                    res.colWidth=chartFactory.MAX_COL_WIDTH;
                res.pointCount=n;

                // Determine the periodicity
                var period= -1;
                for (var i=inc; i<n; i+=inc)
                {
                    var curr=this.series.points[i];
                    var prev=this.series.points[i - inc];

                    if (curr.year != prev.year)
                    {
                        if (period<0)
                            period=0;       // Yearly
                    }
                    else if (curr.month != prev.month)
                    {
                        if (period<1)
                            period=1;       // Monthly
                    }
                    else
                        period=2;           // Daily
                }

                // Generate the labels
                var labels={};
                for (var i=0;i<n;i+=inc)
                {
                    var curr=this.series.points[i];
                    var prev=(i==0 ? null : this.series.points[i - inc]);

                    if (period==0)          // Yearly
                        labels[i]=curr.year;
                    else if (period==1)     // Monthly
                    {
                        if (prev != null && curr.year != prev.year)
                            labels[i]=curr.year;
                        else
                            labels[i]=chartFactory.MONTHS[curr.month];
                    }
                    else                    // Daily
                    {
                        if (prev != null && curr.month != prev.month)
                            labels[i]=chartFactory.MONTHS[curr.month];
                        else
                            labels[i]=curr.day;
                    }
                }
                res.labels=labels;
            },

            gridX_DateAlign: function(res)
            {
                res.width=this.width - chartFactory.LEFT_MARGIN_THIN - chartFactory.RIGHT_MARGIN;
                var n=this.series.points.length;

                res.colWidth=res.width / n;                     // "colWidth" is a floating point number
                if (res.colWidth>chartFactory.MAX_COL_WIDTH)
                    res.colWidth=chartFactory.MAX_COL_WIDTH;
                res.pointCount=n;

                var cols=[];
                for (var i=0;i<n;i++)
                    cols.push(res.toScreen(i));

                var minGridCol=this.parent.gridLabelWidth * 2;
                var minGridLine=res.colWidth * n / (this.parent.gridLabelWidth * 4) | 0;

                // Determine the periodicity
                var prevY= -1, prevM= -1;
                var posY= -1, posM= -1;
                var countY=0, countM=0;

                for (var i=0;i<n;i++)
                {
                    var pt=this.series.points[i];
                    if (prevY != -1 && prevY != pt.year && (posY== -1 || cols[i] - posY>minGridCol))
                    {
                        posY=cols[i];
                        countY++;
                    }
                    if (prevM != -1 && prevM != pt.month && (posM== -1 || cols[i] - posM>minGridCol))
                    {
                        posM=cols[i];
                        countM++;
                    }
                    prevY=pt.year;
                    prevM=pt.month;
                }

                var period;
                if (countY>minGridLine)      period=0;  // Yearly
                else if (countM>minGridLine) period=1;  // Monthly
                else                           period=2;  // Daily

                // For monthly grid, generate the year labels first
                // For daily grid, generate the month labels first

                var labels={};
                var arr=[];
                var prev= -1;

                if (period==1)  // Monthly
                    for (var i=0;i<n;i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != -1 && prev != pt.year)
                        {
                            arr.push(cols[i]);
                            labels[i]=pt.year;
                        }
                        prev=pt.year;
                    }
                else if (period==2)  // Daily
                    for (var i=0;i<n;i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != -1 && prev != pt.month)
                        {
                            arr.push(cols[i]);
                            labels[i]=chartFactory.MONTHS[pt.month];
                        }
                        prev=pt.month;
                    }

                // Generate the remaining labels
                var pos= -1;
                prev= -1;

                if (period==0)  // Yearly
                    for (var i=0;i<n;i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != -1 && prev != pt.year && (pos== -1 || cols[i] - pos>minGridCol))
                        {
                            pos=cols[i];
                            labels[i]=pt.year;
                        }
                        prev=pt.year;
                    }
                else if (period==1)  // Monthly
                    for (var i=0;i<n;i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != -1 && prev != pt.month && (pos== -1 || cols[i] - pos>minGridCol) &&
                            !this.clashGridLabel(cols[i], arr, minGridCol))
                        {
                            pos=cols[i];
                            labels[i]=chartFactory.MONTHS[pt.month];
                        }
                        prev=pt.month;
                    }
                else  // Daily
                    for (var i=0;i<n;i++)
                    {
                        var pt=this.series.points[i];
                        if (prev != pt.day && (pos== -1 || cols[i] - pos>minGridCol) &&
                            !this.clashGridLabel(cols[i], arr, minGridCol))
                        {
                            pos=cols[i];
                            labels[i]=pt.day;
                        }
                        prev=pt.day;
                    }

                res.labels=labels;
            },

            clashGridLabel: function(x, arr, limit)
            {
                // Check if a time label is getting too close to any day labels
                for (var i=0;i<arr.length;i++)
                {
                    var d=arr[i] - x;
                    if (d<0) d= -d;
                    if (d<=limit) return true;
                }
                return false;
            },

            rangeY: function(res)
            {
                delete res.min;
                delete res.max;

                var series=this.series;
                for (var i=0;i<series.spotCount;i++)
                {
                    var pt=series.points[i];
                    if (pt.close != undefined)
                    {
                        var value=parseFloat(pt.close);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }

                if (res.min==undefined || res.max==undefined)
                {
                    res.min=0;
                    res.max=100;
                }
                else if (res.min==res.max)
                    res.max=res.min + 100;
            },

            gridY: function(res)
            {
                res.height=this.height - chartFactory.TOP_MARGIN - chartFactory.BOTTOM_MARGIN;
                var maxLabelCount=(res.height / this.parent.fontHeight / 3 + 0.5)|0;
                if (maxLabelCount==0) maxLabelCount=1;

                var interval=(res.max - res.min) / maxLabelCount;
                if (interval<chartFactory.MAX_PRECISION)
                    interval=res.max / maxLabelCount;
                interval=roundInterval(interval);

                res.start=((res.min/interval)|0) * interval;
                res.end=((res.max/interval)|0) * interval;
                if (res.start>res.min)
                    res.start -= interval;
                if (res.start==res.end || res.end<res.max)
                    res.end += interval;
                res.inc=interval;
            },

            skipGapBackward: function(series, index)
            {
                var i;
                for (i=index; i>=0 && series.points[i].gap; i--);
                return (i== -1 ? index : i);
            },

            skipGapForward: function(series, index)
            {
                var size=series.points.length;
                var i;
                for (i=index; i<size && series.points[i].gap; i++);
                return (i==size ? index : i);
            },

            drawSectionBody: function(startIndex, endIndex, color, fillColor, upward)
            {
                var ctx=this.ctx;
                var axisX=this.axisX;
                var axisY=this.axisY;
                var series=this.series;

                // Create a clip region for the section
                var x0=axisX.toBorder(startIndex);
                var x1=axisX.toBorder(endIndex + 1);

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x0, 0);
                ctx.lineTo(x1, 0);
                ctx.lineTo(x1, axisY.height+1);
                ctx.lineTo(x0, axisY.height+1);
                ctx.clip();

                // When a gap spans across two sections, the extended indices will ensure that
                // the line appears to be continuous across the two sections

                var startIndexEx=this.skipGapBackward(series, startIndex);
                var endIndexEx=this.skipGapForward(series, endIndex);
                var left=-1,right;
                var lastX,lastY;

                ctx.beginPath();
                for (var i=startIndexEx; i<=endIndexEx; i++)
                {
                    var pt=series.points[i];
                    if (pt.close != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.close));

                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else if (x!=lastX || y!=lastY)  // Display optimisation
                            ctx.lineTo(x,y);

                        right=i;
                        lastX=x;
                        lastY=y;
                    }
                }

                ctx.lineWidth=2;
                ctx.strokeStyle=color;
                ctx.stroke();

                var y=(upward ? 0 : axisY.height);
                ctx.lineTo(axisX.toScreen(right), y);
                ctx.lineTo(axisX.toScreen(left), y);
                ctx.fillStyle=fillColor;
                ctx.fill();
                ctx.restore();
            },

            drawSectionHandle: function(index)
            {
                var ctx=this.ctx;
                var axisX=this.axisX;
                var axisY=this.axisY;

                ctx.beginPath();
                var x=axisX.toScreen(index);

                ctx.moveTo(x-3, axisY.height-0.5);
                ctx.lineTo(x+4, axisY.height-0.5);
                ctx.moveTo(x-2, axisY.height-1.5);
                ctx.lineTo(x+3, axisY.height-1.5);
                ctx.moveTo(x-1, axisY.height-2.5);
                ctx.lineTo(x+2, axisY.height-2.5);
                ctx.moveTo(x, axisY.height-3.5);
                ctx.lineTo(x+1, axisY.height-3.5);

                ctx.lineWidth=1;
                ctx.strokeStyle=this.handleColor;
                ctx.stroke();
            },

            draw: function(reason)
            {
                var ctx=this.ctx;
                var axisX=this.axisX;
                var axisY=this.axisY;

                ctx.clearRect(0, 0, this.width, this.height);  // Background is transparent
                if (!this.active) return;

                this.rangeY(axisY);
                this.gridY(axisY);
                if (reason != chartFactory.REASON_DATA_UPDATE)
                    if (this.gridType==chartFactory.GRID_DATE_EVEN)
                        this.gridX_DateEven(axisX);
                    else
                        this.gridX_DateAlign(axisX);

                if (this.chartColor != null)
                {
                    ctx.fillStyle=this.chartColor;
                    ctx.fillRect(chartFactory.LEFT_MARGIN_THIN, chartFactory.TOP_MARGIN, axisX.width, axisY.height);
                }

                //======== Grid lines ========
                ctx.save();
                ctx.translate(chartFactory.LEFT_MARGIN_THIN, chartFactory.TOP_MARGIN);

                ctx.beginPath();
                ctx.fillStyle=this.gridLabelColor;
                ctx.font=this.parent.font;
                ctx.textBaseline="middle";

                // Horizontal grid lines
                ctx.moveTo(0, 0.5);
                ctx.lineTo(axisX.width, 0.5);

                var decimalPlace=this.series.decimalPlace;
                var bound=axisY.end + chartFactory.MAX_PRECISION;

                for (var i=axisY.start; i<=bound; i+=axisY.inc)
                {
                    var y=axisY.toScreen(i, 1) + 0.5;
                    ctx.moveTo(0, y);
                    ctx.lineTo(axisX.width, y);
                    ctx.fillText(formatNumber(i, decimalPlace, true), axisX.width+2, y);
                }

                // Vertical grid lines
                ctx.moveTo(0.5, 0);
                ctx.lineTo(0.5, axisY.height);
                ctx.moveTo(axisX.width+0.5, 0);
                ctx.lineTo(axisX.width+0.5, axisY.height);

                ctx.textBaseline="top";
                ctx.textAlign="center";

                for (var i in axisX.labels)
                {
                    var x=axisX.toScreen(parseInt(i)) + 0.5;
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, axisY.height);
                    ctx.fillText(axisX.labels[i], x, axisY.height+1);
                }

                ctx.strokeStyle=this.parent.gridColor;
                this.parent.gridDash ? chartFactory.setCTXLineDash(ctx) : chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
                ctx.restore();

                //======== Line sections ========
                ctx.save();
                ctx.translate(chartFactory.LEFT_MARGIN_THIN, chartFactory.TOP_MARGIN);

                this.drawSectionBody(0, axisX.startIndex, this.color, this.fillColor, false);
                this.drawSectionBody(axisX.startIndex, axisX.endIndex, this.color2, this.fillColor2, false);
                this.drawSectionBody(axisX.startIndex, axisX.endIndex, this.color2, this.fillColor3, true);
                this.drawSectionBody(axisX.endIndex, this.series.points.length-1, this.color, this.fillColor, false);

                // Create a clip region
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(axisX.width, 0);
                ctx.lineTo(axisX.width, axisY.height+1);
                ctx.lineTo(0, axisY.height+1);
                ctx.clip();

                this.drawSectionHandle(axisX.startIndex);
                this.drawSectionHandle(axisX.endIndex);
                ctx.restore();
            },

            mousemove: function(pageX, pageY)
            {
                if (!this.active) return;

                var offset=this.canvas.offset();
                var x=pageX - offset.left - chartFactory.LEFT_MARGIN_THIN;
                var y=pageY - (offset.top|0) - chartFactory.TOP_MARGIN;  // "top" is not an integer in IE

                var axisX=this.axisX;
                var axisY=this.axisY;

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;

                if (x>=0 && x<axisX.width && y>=0 && y<=axisY.height)
                {
                    var i=axisX.fromScreen(x);

                    if (this.drag2ExpandL)
                    {
                        if (i != startIndex && i<endIndex)
                        {
                            if (i==0) this.series.dig();
                            this.parent.viewZoomX(i, endIndex, this);
                        }
                    }
                    else if (this.drag2ExpandR)
                    {
                        if (i != endIndex && i>startIndex)
                            this.parent.viewZoomX(startIndex, i, this);
                    }
                    else if (this.drag2Slide)
                    {
                        var distance=this.dragX - i;
                        if (distance>0)  // Slide towards the start of the data series
                        {
                            if (startIndex>0)
                            {
                                if (startIndex<=distance)
                                {
                                    distance=startIndex;
                                    this.series.dig();
                                }
                                this.parent.viewZoomX(startIndex - distance, endIndex - distance, this);
                                this.dragX=i;
                            }
                        }
                        else if (distance<0)  // Slide towards the end of the data series
                        {
                            var extra=this.series.points.length - endIndex - 1;
                            if (extra>0)
                            {
                                distance= -distance;
                                if (extra<distance)
                                    distance=extra;
                                this.parent.viewZoomX(startIndex + distance, endIndex + distance, this);
                                this.dragX=i;
                            }
                        }
                    }
                }
                else if (this.drag2ExpandL)
                {
                    this.canvas.css("cursor", "auto");
                    this.drag2ExpandL=false;
                }
                else if (this.drag2ExpandR)
                {
                    this.canvas.css("cursor", "auto");
                    this.drag2ExpandR=false;
                }
                else if (this.drag2Slide)
                {
                    this.canvas.css("cursor", "auto");
                    this.drag2Slide=false;
                }
            },

            mousedown: function(pageX, pageY)
            {
                if (!this.active) return;

                var offset=this.canvas.offset();
                var x=pageX - offset.left - chartFactory.LEFT_MARGIN_THIN;
                var y=pageY - (offset.top|0) - chartFactory.TOP_MARGIN;  // "top" is not an integer in IE

                var axisX=this.axisX;
                var axisY=this.axisY;

                if (x>=0 && x<axisX.width && y>=0 && y<=axisY.height)
                {
                    var x0=axisX.toScreen(axisX.startIndex);
                    var d0=x0 - x;
                    if (d0<0) d0= -d0;
                    if (d0<=chartFactory.CONDENSE_HDL_HIT_DIST)
                    {
                        this.drag2ExpandL=true;
                        this.canvas.css("cursor", "e-resize");
                        return;
                    }

                    var x1=axisX.toScreen(axisX.endIndex);
                    var d1=x1 - x;
                    if (d1<0) d1= -d1;
                    if (d1<=chartFactory.CONDENSE_HDL_HIT_DIST)
                    {
                        this.drag2ExpandR=true;
                        this.canvas.css("cursor", "e-resize");
                        return;
                    }

                    if (x>x0 && x<x1)
                    {
                        this.drag2Slide=true;
                        this.dragX=axisX.fromScreen(x);
                        this.canvas.css("cursor", "e-resize");
                    }
                }
            },

            mouseup: function(pageX, pageY)
            {
                this.cancelDrag();
            },

            mouseout: function(pageX, pageY)
            {
                this.cancelDrag();
            },

            mouseclick: function(pageX, pageY)
            {
            },

            cancelDrag: function()
            {
                this.canvas.css("cursor", "auto");
                this.drag2Slide=false;
                this.drag2ExpandL=false;
                this.drag2ExpandR=false;
            },

            keydown: function(evt)
            {
            },

            touchstart: function(evt)
            {
                evt.preventDefault();

                if (evt.originalEvent.touches.length==1)  // The first finger on the surface
                {
                    var tp=evt.originalEvent.touches[0];
                    this.touchTime=evt.timeStamp;
                    this.touchX=tp.pageX;
                    this.touchY=tp.pageY;

                    this.mousemove(tp.pageX, tp.pageY);
                }
            },

            touchmove: function(evt)
            {
                evt.preventDefault();

                var tp=evt.originalEvent.touches[0];
                this.touchX=tp.pageX;
                this.touchY=tp.pageY;

                if (this.touchTime==chartFactory.TOUCH_TO_MOVE || this.touchTime==chartFactory.TOUCH_TO_DRAG)
                {
                    this.mousemove(tp.pageX, tp.pageY);
                }
                else if (evt.timeStamp - this.touchTime>chartFactory.TOUCH_HOLD_TIME)
                {
                    this.touchTime=chartFactory.TOUCH_TO_DRAG;
                    this.mousedown(tp.pageX, tp.pageY);
                    this.mousemove(tp.pageX, tp.pageY);
                }
                else
                {
                    this.touchTime=chartFactory.TOUCH_TO_MOVE;
                    this.mousemove(tp.pageX, tp.pageY);
                }
            },

            touchend: function(evt)
            {
                evt.preventDefault();

                if (evt.originalEvent.touches.length==0)  // The last finger off the surface
                {
                    if (this.touchTime>=0)
                    {
                        this.mousedown(this.touchX, this.touchY);
                        this.mouseup(this.touchX, this.touchY);
                        this.mouseclick(this.touchX, this.touchY);
                        this.mousemove(this.touchX, this.touchY);
                    }
                    else if (this.touchTime==chartFactory.TOUCH_TO_DRAG)
                    {
                        this.mouseup(this.touchX, this.touchY);
                        this.mouseclick(this.touchX, this.touchY);
                        this.mousemove(this.touchX, this.touchY);
                    }

                    this.touchTime= -1;
                }
            },

            touchcancel: function(evt)
            {
                this.touchend(evt);
            },

            //========================================
            // CondenseChart event functions
            //========================================

            _mousemove: function(evt) { evt.data.mousemove(evt.pageX, evt.pageY); },
            _mousedown: function(evt) { evt.data.mousedown(evt.pageX, evt.pageY); },
            _mouseup: function(evt) { evt.data.mouseup(evt.pageX, evt.pageY); },
            _mouseout: function(evt) { evt.data.mouseout(evt.pageX, evt.pageY); },
            _mouseclick: function(evt) { evt.data.mouseclick(evt.pageX, evt.pageY); },

            _keydown: function(evt) { evt.data.keydown(evt); },

            _touchstart: function(evt) { evt.data.touchstart(evt); },
            _touchmove: function(evt) { evt.data.touchmove(evt); },
            _touchend: function(evt) { evt.data.touchend(evt); },
            _touchcancel: function(evt) { evt.data.touchcancel(evt); },

            ctr: function()
            {
            }
        };

        //========================================
        // ChartFrame class
        //========================================

        function ChartFrame(options)
        {
            // Default options
            this.chartColor="#FFFFFF";
            this.font="10px sans-serif";
            this.fontHeight=11;
            this.gridLabelWidth=24;
            this.gridLabelColor="#333333";
            this.overlayLabelColor="#333333";
            this.gridColor="#DDDDDD";
            this.gridDash=false; // default draw solid line
            this.crosshairColor="#444444";
            this.crosshairTextColor="#FFFFFF";

            this.charts=[];
            this.ctr(options);
        }

        ChartFrame.prototype={
            add: function(type, name, width, height, selector, /* optional */ options, seq)
            {
                for (var i=0;i<this.charts.length;i++)
                    if (this.charts[i].name==name)
                        return null;

                var chart;
                if (type==chartFactory.PRICE_CHART)
                {
                    if (options==undefined)
                        chart=new PriceChart(name, width, height, selector, this);
                    else
                        chart=new PriceChart(name, width, height, selector, this,
                                             options.gridStyle, options.gridType, options.crosshairStyle, options.shiftType, options.joinDataURL,
                                             options.crosshairFunc, options.tooltipFunc, options.tradeHintFunc, options.dateRangeFunc,
                                             options.annotEvtFunc, options.caller, options.isCrosshair);
                }
                else if (type==chartFactory.CONDENSE_CHART)
                {
                    if (options==undefined)
                        chart=new CondenseChart(name, width, height, selector, this);
                    else
                        chart=new CondenseChart(name, width, height, selector, this,
                                                options.gridType, options.color, options.color2, options.fillColor, options.fillColor2, options.fillColor3, options.handleColor);
                }
                else
                    return null;

                var canvas=$("<canvas style='display:block; outline:none' width='" + width + "' height='" + height + "' tabindex='100' data-name='" + name + "'/>");
                if (seq) {
                    // Need specific ordering...
                    canvas.attr("seq", seq);

                    // Find a place for this canvas ;)
                    var $s = $(selector);
                    var $cs = $s.children("canvas");
                    var notfound = true;
                    $.each($cs, function() {
                        var $tmp = $(this);
                        var s = $tmp.attr("seq");
                        if (s == undefined || seq<s) {
                            canvas.insertBefore($tmp);
                            notfound = false;
                            return false;
                        }
                    });
                    if (notfound) $(selector).append(canvas);
                }
                else {
                    $(selector).append(canvas);
                }

                chart.attach(canvas);
                this.charts.push(chart);
                return chart;
            },

            remove: function(name)
            {
                for (var i=0;i<this.charts.length;i++)
                    if (this.charts[i].name==name)
                    {
                        this.charts[i].canvas.remove();
                        this.charts.splice(i,1);
                        break;
                    }
            },

            chart: function(name)
            {
                for (var i=0;i<this.charts.length;i++)
                    if (this.charts[i].name==name)
                        return this.charts[i];
                return null;
            },

            data: function(type, name, url, /* optional */ options)
            {
                var series;
                if (type==chartFactory.HTS_DATA)
                {
                    series = new HtsSeries(name, url, this, options.decimalPlace, options.verifyFunc, options.successFunc, options.discoverFunc, options.errorFunc, options.caller);
                }
                else if (type==chartFactory.MTS_DATA) // use the same HtsSeries to handle ;)
                {
                    series = new HtsSeries(name, url, this, options.decimalPlace, options.verifyFunc, options.successFunc, options.discoverFunc, options.errorFunc, options.caller);
                }

                // Save the extra info of the instrument of this series
                series.type = type;
                series.si = options.si;
                series.info = options.info;
                return series;
            },

            save: function()
            {
                if (this.charts.length==0)
                    throw "No chart is defined";

                // Initialize the serialization context
                var ctx=new SerializationContext();
                ctx.rootObject(this);

                var chartsSO=[];
                for (var i=0;i<this.charts.length;i++)
                    chartsSO.push(ctx.writeObject(this.charts[i]));

                var serObj={ chartColor:         this.chartColor,
                             font:               this.font,
                             gridLabelColor:     this.gridLabelColor,
                             overlayLabelColor:  this.overlayLabelColor,
                             gridColor:          this.gridColor,
                             crosshairColor:     this.crosshairColor,
                             crosshairTextColor: this.crosshairTextColor,
                             charts:             chartsSO };

                return serObj;
            },

            toString: function()
            {
                return JSON.stringify(this.save());
            },

            restore: function(p1)
            {
                var serObj=($.type(p1)=="string" ? $.parseJSON(p1) : p1);

                for (var i=0;i<this.charts.length;i++)
                    this.charts[i].canvas.remove();
                this.charts.length=0;

                // Initialize the serialization context
                var ctx=new SerializationContext();
                ctx.rootObject(this);

                if (arguments.length>=2 && arguments[1]!=null)
                    ctx.setCreatorFunc(arguments[1]);

                for (var i=2;i<arguments.length;i++)
                    if ($.type(arguments[i])=="function")
                        ctx.funcToMatch(arguments[i]);
                    else
                        ctx.objToMatch(arguments[i]);

                this.configure(serObj);

                var chartsSO=serObj.charts;
                for (var i=0;i<chartsSO.length;i++)
                {
                    var chart=ctx.readObject(chartsSO[i]);

                    var canvas=$("<canvas style='display:block; outline:none' width='" + chart.width + "' height='" + chart.height + "' tabindex='100' data-name='" + chart.name + "'/>");
                    $(chart.selector).append(canvas);

                    chart.attach(canvas);
                    this.charts.push(chart);
                }
            },

            toDataURL: function()
            {
                if (this.charts.length>0)
                {
                    var w=0;
                    var h=0;
                    for (var i=0;i<this.charts.length;i++)
                    {
                        var chart=this.charts[i];
                        if (chart.joinDataURL)
                        {
                            if (chart.width>w) w=chart.width;
                            h += this.charts[i].height;
                        }
                    }

                    var tmpCanvas=$("<canvas width='" + w + "' height='" + h + "'/>");
                    var ctx=tmpCanvas.get(0).getContext("2d");

                    var y=0;
                    for (var i=0;i<this.charts.length;i++)
                    {
                        var chart=this.charts[i];
                        if (chart.joinDataURL)
                        {
                            ctx.drawImage(chart.canvas.get(0), 0, y, w, chart.height);
                            y += chart.height;
                        }
                    }

                    return tmpCanvas.get(0).toDataURL("image/png");
                }
                else
                    return null;
            },

            dataReady: function(series)
            {
                for (var i=0;i<this.charts.length;i++)
                    this.charts[i].dataReady(series);
            },

            dataAppend: function(series)
            {
                for (var i=0;i<this.charts.length;i++)
                    this.charts[i].dataAppend(series);
            },

            dataUpdate: function(series)
            {
                for (var i=0;i<this.charts.length;i++)
                    this.charts[i].dataUpdate(series);
            },

            dataDiscover: function(series, size)
            {
                for (var i=0;i<this.charts.length;i++)
                    this.charts[i].dataDiscover(series, size);
            },

            futureDates: function(series)
            {
                for (var i=0;i<this.charts.length;i++)
                    this.charts[i].futureDates(series);
            },

            gaps: function(series)
            {
                for (var i=0;i<this.charts.length;i++)
                    this.charts[i].gaps(series);
            },

            viewSlideX: function(startIndex, endIndex, src)
            {
                for (var i=0;i<this.charts.length;i++)
                {
                    var chart=this.charts[i];
                    if (chart.series==src.series)
                        chart.viewSlideX(startIndex, endIndex);
                }
            },

            viewZoomX: function(startIndex, endIndex, src)
            {
                for (var i=0;i<this.charts.length;i++)
                {
                    var chart=this.charts[i];
                    if (chart.series==src.series)
                        chart.viewZoomX(startIndex, endIndex);
                }
            },

            crosshair: function(x, y, src)
            {
                for (var i=0;i<this.charts.length;i++)
                {
                    var chart=this.charts[i];
                    if (chart==src)
                        chart.crosshair(x, y);
                    else if (chart.series==src.series)
                        chart.crosshair(x, -1);
                }
            },

            measureText: function()
            {
                var span=$("<span style='font:" + this.font + "'>2015</span>");
                $("body").append(span);
                this.fontHeight=span.height();
                this.gridLabelWidth=span.width();
                span.remove();
            },

            configure: function(options)
            {
                if (options.chartColor != undefined)
                    this.chartColor=options.chartColor;
                if (options.font != undefined)
                {
                    this.font=options.font;
                    this.measureText();
                }
                if (options.gridLabelColor != undefined)
                    this.gridLabelColor=options.gridLabelColor;
                if (options.overlayLabelColor != undefined)
                    this.overlayLabelColor=options.overlayLabelColor;
                if (options.gridColor != undefined)
                    this.gridColor=options.gridColor;
                if (options.crosshairColor != undefined)
                    this.crosshairColor=options.crosshairColor;
                if (options.crosshairTextColor != undefined)
                    this.crosshairTextColor=options.crosshairTextColor;
            },

            ctr: function(options)
            {
                if (options != undefined)
                    this.configure(options);
            }
        };

        /******************************************************************************/

        //==========================//
        // *** Other TA Drawers *** //
        //==========================//

        //========================================
        // TurnoverDrawer class
        //========================================

        function TurnoverDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.ctr();
        }

        TurnoverDrawer.prototype={
            className: "TurnoverDrawer",

            dataReady: function(series)
            {
            },

            dataUpdate: function(series)
            {
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    if (pt != undefined && pt.turnover != undefined) {
                        var value=parseFloat(pt.turnover);
                        if (res.min==undefined || res.min>0)
                            res.min=0;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index];
                if (pt != undefined && pt.turnover != undefined)
                    res.turnover=pt.turnover;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                // Determine the width of the volume bar
                var w=axisX.colWidth|0;
                if (w > 40)
                    w -= 10;
                else if (w > 30)
                    w -= 8;
                else if (w > 20)
                    w -= 6;
                else if (w > 10)
                    w -= 4;
                else if (w > 2)
                    w -= 2;
                else
                    w=1;
                var half=(w/2)|0;
                var base=axisY.toScreen(0);

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;

                if (endIndex >= series.spotCount)
                    endIndex=series.spotCount-1;

                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    if (pt != undefined && pt.turnover != undefined) {
                        var turnover=parseFloat(pt.turnover);
                        var y=axisY.toScreen(turnover);

                        ctx.fillStyle=this.options.color;
                        ctx.fillRect(axisX.toScreen(i)-half, y, w, base-y);
                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // HistogramDrawer class
        //========================================

        //  styleobj = {
        //      upColor: "#DDDDDD",
        //      upFillColor: this.upColor,
        //      downColor: this.upColor,
        //      downFillColor: this.upColor
        //  }
        function HistogramDrawer(name, styleobj)
        {
            this.name=name;
            this.setStyleObj(styleobj);
        }

        HistogramDrawer.prototype={
            className: "HistogramDrawer",

            setStyleObj: function(styleobj) {
                this.styleobj=styleobj;

                this.upColor=styleobj.upColor?styleobj.upColor:"#DDDDDD";
                this.upFillColor=styleobj.upFillColor?styleobj.upFillColor:this.upColor;
                this.downColor=styleobj.downColor?styleobj.downColor:this.upColor;
                this.downFillColor=styleobj.downColor?styleobj.downFillColor:this.upColor;
            },

            dataReady: function(series)
            {
            },

            dataUpdate: function(series)
            {
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    if (pt != undefined) {
                        var value=parseFloat(pt.close);
                        if (res.min==undefined || res.min > 0)
                            res.min=0;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index];
                if (pt != undefined)
                    res.close=pt.close;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                // Determine the width of the volume bar
                var w=axisX.colWidth|0;
                if (w>40)
                    w -= 10;
                else if (w>30)
                    w -= 8;
                else if (w>20)
                    w -= 6;
                else if (w>10)
                    w -= 4;
                else if (w>2)
                    w -= 2;
                else
                    w=1;
                var half=(w/2)|0;
                var base=axisY.toScreen(0);

                var startIndex=axisX.startIndex;
                var endIndex=axisX.endIndex;

                if (endIndex >= series.spotCount)
                    endIndex=series.spotCount-1;

                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    if (pt != undefined) {
                        var open=parseFloat(pt.open);
                        var close=parseFloat(pt.close);

                        var y3=axisY.toScreen(close);
                        var x=axisX.toScreen(i);

                        var h=base-y3;
                        if (h==0) h=(axisY.flip ? -1 : 1);
                        ctx.fillStyle=(close >= open ? this.upFillColor : this.downFillColor);
                        ctx.fillRect(x+0.5-half, y3, w, h);

                        ctx.beginPath();
                        ctx.moveTo(x+0.5-half, base);
                        ctx.lineTo(x+0.5-half, y3);
                        ctx.lineTo(x+0.5-half+w, y3);
                        ctx.lineTo(x+0.5-half+w, base);
                        ctx.lineWidth=1;
                        ctx.strokeStyle=(close >= open ? this.upColor : this.downColor);
                        ctx.stroke();
                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.upColor=this.upColor;
                serObj.upFillColor=this.upFillColor;
                serObj.downColor=this.downColor;
                serObj.downFillColor=this.downFillColor;
            },

            deserialize: function(serObj, ctx)
            {
                this.upColor=serObj.upColor;
                this.upFillColor=serObj.upFillColor;
                this.downColor=serObj.downColor;
                this.downFillColor=serObj.downFillColor;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // OBVDrawer class
        //========================================

        function OBVDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=0;

            this.ctr();
        }

        OBVDrawer.prototype={
            classname: "OBVDrawer",

            obv: function(series, index)
            {
                var pts=series.points;
                var pt=pts[index];
                var prevPt=pts[index-1];

                var obv=0;
                if (index>1) obv=parseFloat(prevPt[this.name]);
                if (pt.close>prevPt.close)
                    obv+=pt.volume;
                else if (pt.close<prevPt.close)
                    obv-=pt.volume;

                pt[this.name]=obv.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=1; i<series.spotCount; i++)
                    this.obv(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount > 1)
                    this.obv(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(OBVDrawer, BaseLineDrawer);

        //========================================
        // DMIDrawer class
        //========================================

        function DMIDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            var N=this.options.dmi.period; // EMA/MEMA period for calculating +/-DI and ADX, i.e. the DMI
            this.siDX=N;
            this.siADX=N*2-1;
            // ADX-R needs to go further ;)
            this.siADXR = this.options.adxr&&this.options.adxr.period ? this.siADX+this.options.adxr.period : 0;

//            this.emafactor = 2/(N+1); // EMA
            this.emafactor = 1/N; // MEMA

            this.ref_index = -1;
            this.ref_emaup = -1;
            this.ref_emadn = -1;
            this.ref_ematr = -1;
            this.emaup = -1;
            this.emadn = -1;
            this.ematr = -1;

            this.ref_indexADX = -1;
            this.ref_emaADX = -1;
            this.emaADX = -1;

            this.ctr();
        }

        DMIDrawer.prototype={
            classname: "DMIDrawer",

            simpleAvg: function(series, index) {
                var pts=series.points;
                var pt;
                var N=this.options.dmi.period; // EMA/MEMA period for calculating +/-DI and ADX, i.e. the DMI

                var sumup=0, sumdn=0, sumtr=0;
                for (var i=0;i<N;i++) {
                    pt=pts[index-i][this.name];
                    sumup += pt.up;
                    sumdn += pt.dn;
                    sumtr += pt.tr;
                }
                var emaup=sumup/N; // single-sma
                var emadn=sumdn/N; // single-sma
                var ematr=sumtr/N; // single-sma

                var dip=100*emaup/ematr;
                var dim=100*emadn/ematr;
                pt=pts[index][this.name];
                pt.dip=dip.toFixed(this.options.dp);
                pt.dim=dim.toFixed(this.options.dp);
                pt.dx=100*Math.abs(dip-dim)/(dip+dim);

                this.ref_index= -1;
                this.emaup = emaup;
                this.emadn = emadn;
                this.ematr = ematr;
            },
            expAvg: function(series, index) {
                if (this.ref_index != index-1) {
                    this.ref_index = index-1;
                    this.ref_emaup = this.emaup;
                    this.ref_emadn = this.emadn;
                    this.ref_ematr = this.ematr;
                }

                var pts=series.points;
                var pt=pts[index][this.name];
//                 var N=this.options.dmi.period; // EMA/MEMA period for calculating +/-DI and ADX, i.e. the DMI

                var emaup=(pt.up - this.ref_emaup)*this.emafactor + this.ref_emaup; // ema
                var emadn=(pt.dn - this.ref_emadn)*this.emafactor + this.ref_emadn; // ema
                var ematr=(pt.tr - this.ref_ematr)*this.emafactor + this.ref_ematr; // ema

                var dip=100*emaup/ematr;
                var dim=100*emadn/ematr;
                pt.dip=dip.toFixed(this.options.dp);
                pt.dim=dim.toFixed(this.options.dp);
                pt.dx=100*Math.abs(dip-dim)/(dip+dim);

                this.emaup = emaup;
                this.emadn = emadn;
                this.ematr = ematr;
            },

            simpleAvgADX: function(series, index) {
                var pts=series.points;
                var pt;
                var N=this.options.dmi.period; // EMA/MEMA period for calculating +/-DI and ADX, i.e. the DMI

                var sum=0;
                for (var i=0;i<N;i++) {
                    pt=pts[index-i][this.name];
                    sum += pt.dx;
                }
                var ema=sum/N; // single-sma

                pt=pts[index][this.name];
                pt.adx=ema.toFixed(this.options.dp);

                this.ref_indexADX= -1;
                this.emaADX = ema;
            },
            expAvgADX: function(series, index) {
                if (this.ref_indexADX != index-1) {
                    this.ref_indexADX = index-1;
                    this.ref_emaADX = this.emaADX;
                }

                var pts=series.points;
                var pt=pts[index][this.name];
//                 var N=this.options.dmi.period; // EMA/MEMA period for calculating +/-DI and ADX, i.e. the DMI

                var ema=(pt.dx - this.ref_emaADX)*this.emafactor + this.ref_emaADX; // ema
                pt.adx=ema.toFixed(this.options.dp);
                this.emaADX= ema;
            },

            dmi: function(series, index) {
                // Ref: http://www.investopedia.com/articles/technical/02/050602.asp
                // Ref: http://www.investopedia.com/terms/a/adx.asp
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:average_directional_index_adx
                var pts=series.points;
                var pt=pts[index][this.name]={ };
//                var N=this.options.dmi.period; // EMA/MEMA period for calculating +/-DI and ADX, i.e. the DMI

                if (index>0) {
                    var thispt=pts[index];
                    var prevpt=pts[index-1];
                    var h=thispt.high, l=thispt.low;
                    var ph=prevpt.high, pl=prevpt.low, pc=prevpt.close;

                    // Find U and D for +/-DI calculation
                    var up=h-ph;
                    var dn=pl-l;
                    if (up>dn && up>0) pt.up=up; else pt.up=0;
                    if (dn>up && dn>0) pt.dn=dn; else pt.dn=0;

                    // Find the True Range
                    pt.tr=Math.max((h-l), Math.abs(h-pc), Math.abs(l-pc));

                    if (index>=this.siDX) {
                        if (index===this.siDX) {
                            this.simpleAvg(series, index);
                        }
                        else {
                            this.expAvg(series, index);

                            // ADX, the EMA of DX
                            if (index>=this.siADX) {
                                if (index===this.siADX) {
                                    this.simpleAvgADX(series, index);
                                }
                                else {
                                    this.expAvgADX(series, index);
                                }
                            }
                            else {
                                pt.adx=null;
                            }
                        }
                    }
                    else {
                        pt.dip=null;
                        pt.dim=null;
                        pt.dx=null;
                        pt.adx=null;
                    }
                }
            },

            adxr: function (series, index) {
                var pts=series.points;
                var pt=pts[index][this.name];
                if (index>=this.siADXR) {
                    var prev=pts[index-this.options.adxr.period][this.name];
                    pt.adxr = ((parseFloat(pt.adx) + parseFloat(prev.adx)) / 2).toFixed(this.options.dp);
                }
                else {
                    pt.adxr=null;
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++) {
                    this.dmi(series, i);
                    if (this.siADXR) this.adxr(series, i);
                }
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                var i=series.spotCount-1;
                this.dmi(series, i);
                if (this.siADXR) this.adxr(series, i);
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        var dip, dim, adx, adxr;
                        if (pt.dip && this.options.di.posColor) dip=parseFloat(pt.dip);
                        if (pt.dim && this.options.di.negColor) dim=parseFloat(pt.dim);
                        if (pt.adx && this.options.adx.color) adx=parseFloat(pt.adx);
                        if (pt.adxr && this.options.adxr.color) adxr=parseFloat(pt.adxr);

                        var max=adx; if (!max || (dip && dip>max)) max=dip; if (!max || (dim && dim>max)) max=dim; if (!max || (adxr && adxr>max)) max=adxr;
                        if (res.min==undefined || min<res.min) res.min=min;

                        var min=adx; if (!min || (dip && dip<min)) min=dip; if (!min || (dim && dim<min)) min=dim; if (!min || (adxr && adxr<min)) min=adxr;
                        if (res.max==undefined || max>res.max) res.max=max;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined) {
                    if (pt.dip) res.p = pt.dip;
                    if (pt.dim) res.m = pt.dim;
                    if (pt.adx) res.adx = pt.adx;
                    if (pt.adxr) res.adxr = pt.adxr;
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left;

                // Draw +DI
                if (this.options.di.posColor) {
                    left=-1;
                    ctx.beginPath();
                    for (var i=startIndex;i<=endIndex;i++)
                    {
                        var pt=series.points[i][this.name];
                        if (pt != undefined && pt.dip != undefined) {
                            var value=parseFloat(pt.dip);
    //                        if (isNaN(value)) continue;
                            var x=axisX.toScreen(i);
                            var y=axisY.toScreen(value);
                            if (left===-1)
                            {
                                ctx.moveTo(x,y);
                                left=i;
                            }
                            else
                                ctx.lineTo(x,y);
                        }
                    }
                    ctx.lineWidth=this.options.di.thickness;
                    ctx.strokeStyle=this.options.di.posColor;
                    this.options.di.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();
                }

                // Draw -DI
                if (this.options.di.negColor) {
                    left=-1;
                    ctx.beginPath();
                    for (var i=startIndex;i<=endIndex;i++)
                    {
                        var pt=series.points[i][this.name];
                        if (pt != undefined && pt.dim != undefined) {
                            var value=parseFloat(pt.dim);
    //                        if (isNaN(value)) continue;
                            var x=axisX.toScreen(i);
                            var y=axisY.toScreen(value);
                            if (left===-1)
                            {
                                ctx.moveTo(x,y);
                                left=i;
                            }
                            else
                                ctx.lineTo(x,y);
                        }
                    }
                    ctx.lineWidth=this.options.di.thickness;
                    ctx.strokeStyle=this.options.di.negColor;
                    this.options.di.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();
                }

                // Draw ADX Line
                if (this.options.adx.color) {
                    left=-1;
                    ctx.beginPath();
                    for (var i=startIndex;i<=endIndex;i++)
                    {
                        var pt=series.points[i][this.name];
                        if (pt != undefined && pt.adx != undefined) {
                            var value=parseFloat(pt.adx);
    //                        if (isNaN(value)) continue;
                            var x=axisX.toScreen(i);
                            var y=axisY.toScreen(value);
                            if (left===-1)
                            {
                                ctx.moveTo(x,y);
                                left=i;
                            }
                            else
                                ctx.lineTo(x,y);
                        }
                    }
                    ctx.lineWidth=this.options.adx.thickness;
                    ctx.strokeStyle=this.options.adx.color;
                    this.options.adx.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();
                }

                // Draw ADX-R Line
                if (this.options.adxr.color) {
                    left=-1;
                    ctx.beginPath();
                    for (var i=startIndex;i<=endIndex;i++)
                    {
                        var pt=series.points[i][this.name];
                        if (pt != undefined && pt.adxr != undefined) {
                            var value=parseFloat(pt.adxr);
    //                        if (isNaN(value)) continue;
                            var x=axisX.toScreen(i);
                            var y=axisY.toScreen(value);
                            if (left===-1)
                            {
                                ctx.moveTo(x,y);
                                left=i;
                            }
                            else
                                ctx.lineTo(x,y);
                        }
                    }
                    ctx.lineWidth=this.options.adxr.thickness;
                    ctx.strokeStyle=this.options.adxr.color;
                    this.options.adxr.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // BollingerDrawer class
        //========================================

        function BollingerDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        BollingerDrawer.prototype={
            classname: "BollingerDrawer",

            middleband: function (series, index) {
                var pts=series.points;
                var pt=pts[index][this.name] = {};

                var N=this.options.period;
                var cnt=N;
                var sum=0;
                for (var j=0;j<cnt && index>=j;j++) {
                    if (pts[index-j].close)
                        sum += parseFloat(pts[index-j].close);
                    else
                        cnt++;
                }
                pt.mid=(sum/N).toFixed(this.options.dp);
            },

            updownband: function(series, index) {
                var pts=series.points;
                var pt=pts[index][this.name];

                var N=this.options.period;
                var cnt=N;
                var sum=0;
                for (var j=0; j<cnt && j<=index; j++) {
                    if (pts[index-j].close) {
                        var d = parseFloat(pts[index-j].close) - parseFloat(pt.mid);
                        sum += d*d;
                    }
                    else
                        cnt++;
                }
                var sigma=Math.sqrt(sum/N);
                var d=this.options.deviation.value*sigma;
                var mid=parseFloat(pt.mid);
                pt.sigma=sigma;
                pt.upper = (mid+d).toFixed(this.options.dp);
                pt.lower = (mid-d).toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                var N1=this.options.period-1;
                for (var i=N1; i<series.spotCount; i++)
                    this.middleband(series, i);
                if (this.options.deviation) {
                    for (var i=N1; i<series.spotCount; i++)
                        this.updownband(series, i);
                }
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period-1) {
                    this.middleband(series, series.spotCount-1);
                    if (this.options.deviation) {
                        this.updownband(series, series.spotCount-1);
                    }
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var upper,lower;
                        if (this.options.deviation) {
                            upper=parseFloat(pt.upper);
                            lower=parseFloat(pt.lower);
                        }
                        else {
                            upper=parseFloat(pt.mid);
                            lower=upper;
                        }
                        if (res.min==undefined || lower < res.min)
                            res.min=lower;
                        if (res.max==undefined || upper > res.max)
                            res.max=upper;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined) {
                    if (this.options.deviation) {
                        res[this.name] = {
                            u: pt.upper,
                            m: pt.mid,
                            l: pt.lower
                        };
                    }
                    else {
                        res[this.name] = {
                            m: pt.mid
                        };
                    }
                }
                else {
                    res[this.name] = { };
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            drawUpperBand: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.upper));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.deviation.thickness;
                ctx.strokeStyle=this.options.deviation.color0;
                this.options.deviation.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            drawMiddleBand: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(pt.mid);
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            drawLowerBand: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(pt.lower);
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.deviation.thickness;
                ctx.strokeStyle=this.options.deviation.color1;
                this.options.deviation.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                if (this.options.deviation) {
                    this.drawUpperBand(series, startIndex, endIndex, axisX, axisY, ctx);
                    this.drawLowerBand(series, startIndex, endIndex, axisX, axisY, ctx);
                }
                else {
                    this.drawMiddleBand(series, startIndex, endIndex, axisX, axisY, ctx);
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // DPODrawer class
        //========================================

        function DPODrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        DPODrawer.prototype={
            classname: "DPODrawer",

            dpo: function(series, index)
            {
                var pts=series.points;
                var N=this.options.period;
                var sum=0;
                for (var i=0;i<N;i++)
                    sum += parseFloat(pts[index-i].close);
                var sma=sum/N;

                var timeshift = Math.round(N/2+1);
                var tsindex = index-timeshift;
                if (tsindex>=0)
                    pts[tsindex][this.name]=(pts[tsindex].close - sma).toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                var sN=this.options.period-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }
                for (var i=pts.length-1;i>pts.length-sN&&i>0;i--) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.dpo(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                var N=this.options.period;
                if (series.spotCount >= N) {
                    this.dpo(series, series.spotCount-1);
                }
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1,right;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                        right=i;
                    }
                }

                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                if (this.options.fillColor != null) {
                    var base = axisY.toScreen(0);
                    ctx.lineTo(axisX.toScreen(right), base);
                    ctx.lineTo(axisX.toScreen(left), base);
                    ctx.fillStyle=this.options.fillColor;
                    ctx.fill();
                }
            }
        };

        chartFactory.extendClass(DPODrawer, BaseLineDrawer);

        //========================================
        // ATRDrawer class
        //========================================

        function ATRDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        ATRDrawer.prototype={
            classname: "ATRDrawer",

            atr: function(series, index)
            {
                var pts=series.points;
                var sum=0;
                var aN=this.options.period;
                for (var i=0;i<aN && index>=i;i++) {
                    var H=pts[index-i].high;
                    var L=pts[index-i].low;
                    var prevC=pts[index-i-1].close;

                    var daily_tr=H-L;
                    var h_pc_tr=Math.abs(H-prevC);
                    var l_pc_tr=Math.abs(L-prevC);

                    sum+=Math.max(daily_tr, h_pc_tr, l_pc_tr);
                }
                var sma=sum/aN;
                pts[index][this.name]=sma.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                var sN=this.options.period;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.atr(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period+1) {
                    this.atr(series, series.spotCount-1);
                }
            }
        };

        chartFactory.extendClass(ATRDrawer, BaseLineDrawer);

        //========================================
        // SARDrawer class
        //========================================

        function SARDrawer(name, options) {
            this.name=name;
            this.options=options;

            this.ctr();
        }

        SARDrawer.prototype={
            classname: "SARDrawer",

            sar: function (series, index) {
                var pts=series.points;
                pts[index][this.name] = {};

                if (index == 3) {
                    pts[index][this.name].dir = 1;
                    pts[index][this.name].sar = 0;
                    pts[index][this.name].ep = 0;
                    pts[index][this.name].af = 0;
                    pts[index][this.name].afd = 0;
                }
                else {
                    if (index == 4) {
                        pts[index][this.name].dir = 1;
                        pts[index][this.name].af = this.options.factor.def;
                        pts[index][this.name].sar = pts[index].low;
                        pts[index][this.name].ep = pts[index].high;
                        for (var i = 1; i < 5; i++) {
                            pts[index][this.name].sar = Math.min(parseFloat(pts[index][this.name].sar), pts[index - i].low);
                            pts[index][this.name].ep = Math.max(pts[index][this.name].ep, pts[index - i].high);
                        }
                    }
                    else {
                        // SAR
                        pts[index][this.name].sar = parseFloat(pts[index - 1][this.name].sar) + parseFloat(pts[index - 1][this.name].af) * (parseFloat(pts[index - 1][this.name].ep) - parseFloat(pts[index - 1][this.name].sar));
                        pts[index][this.name].dir = pts[index - 1][this.name].dir;
                        pts[index][this.name].af = pts[index - 1][this.name].af;
                        pts[index][this.name].ep = pts[index - 1][this.name].ep;

                        if (pts[index - 1][this.name].dir == 1) {
                            // Up Trend
                            pts[index][this.name].sar = Math.min(parseFloat(pts[index][this.name].sar), pts[index - 1].low, pts[index - 2].low);
                            if (pts[index].high > pts[index - 1][this.name].ep) {
                                pts[index][this.name].ep = pts[index].high;
                                pts[index][this.name].af = Math.min(parseFloat(pts[index - 1][this.name].af) + this.options.factor.inc, this.options.factor.max);
                            }
                            if (pts[index][this.name].sar > pts[index].low) {  // Trend Change
                                pts[index][this.name].dir = -1;
                                pts[index][this.name].sar = pts[index][this.name].ep;
                                pts[index][this.name].af = this.options.factor.def;
                                pts[index][this.name].ep = pts[index].low;
                            }
                        }
                        else {
                            // Down Trend
                            pts[index][this.name].sar = Math.max(parseFloat(pts[index][this.name].sar), pts[index - 1].high, pts[index - 2].high);
                            if (pts[index].low < pts[index - 1][this.name].ep) {
                                pts[index][this.name].ep = pts[index].low;
                                pts[index][this.name].af = Math.min(parseFloat(pts[index - 1][this.name].af) + this.options.factor.inc, this.options.factor.max);
                            }
                            if (pts[index][this.name].sar < pts[index].high) {  // Trend Change
                                pts[index][this.name].dir = 1;
                                pts[index][this.name].sar = pts[index][this.name].ep;
                                pts[index][this.name].af = this.options.factor.def;
                                pts[index][this.name].ep = pts[index].high;
                            }
                        }
                    }
                }
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                for (var i=3; i<series.spotCount; i++)
                    this.sar(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount>3) {
                    this.sar(series, series.spotCount-1);
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.sar)
                    {
                        var value=parseFloat(pt.sar);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined && pt.sar)
                    res[this.name]=pt.sar.toFixed(this.options.dp);
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                for (var i=startIndex;i<=endIndex;i++)
                {
                    ctx.beginPath();
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.sar) {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(pt.sar);
                        ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
                        ctx.fillStyle = this.options.color;
                        ctx.fill();
                    }
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // BiasDrawer class
        //========================================

        function BiasDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        BiasDrawer.prototype={
            className: "BiasDrawer",

            bias: function(series, index)
            {
                var pts=series.points;
                var sum = 0;
                for (var i=0;i<this.options.period;i++)
                    sum += parseFloat(pts[index-i].close);
                var res= (sum/this.options.period/parseFloat(pts[index].close)-1)*100;
                pts[index][this.name]= res.toFixed(this.options.dp);

            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.bias(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period)
                {
                    this.bias(series, series.spotCount-1);
                }
            }
        };

        chartFactory.extendClass(BiasDrawer, BaseLineDrawer);

        //========================================
        // VectorDrawer class
        //========================================

        function VectorDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        VectorDrawer.prototype={
            className: "VectorDrawer",

            vector: function(series, index) {
                var pts=series.points;
                pts[index][this.name] = { };

                var vN = this.options.periodV;
                var sN = this.options.periodS;

                // Linear Regresss Slope (LRS), i.e. b... LRT formula is Y = bX + A
//                var b = (parseFloat(pts[index].close) - parseFloat(pts[index-vN+1].close)) / vN;
                var sumX = 0, sumX2 = 0;
                var sumY = 0, sumY2 = 0;
                var sumXY = 0;
                var Xstart=index-vN+1, Xend=index, XN=vN;
                for (var X = Xstart; X <= Xend; X++) {
                    var Y = parseFloat(pts[X].close);
                    sumX += X;
                    sumX2 += X*X;
                    sumY += Y;
                    sumY2 += Y*Y;
                    sumXY += X*Y;
                }
//                var mX = sumX / XN;
//                var mY = sumY / XN;
                var b = (XN*sumXY-sumX*sumY)/(XN*sumX2-sumX*sumX);
//                var A = mY - b * mX;

                var sumV = 0;
                for (var i = 0; i < vN; i++)
                    sumV += parseFloat(pts[index-i].close);

                var smaV = sumV / vN;
                var res = b / smaV * 1000;
                pts[index][this.name].v = res.toFixed(this.options.dp);

                if (index >= vN+sN-1) {
                    var sumS = 0;
                    for (var i = 0; i < sN; i++)
                        sumS += parseFloat(pts[index-i][this.name].v);

                    var smaS = sumS/sN;
                    pts[index][this.name].s = smaS.toFixed(this.options.dp);
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                var vN = this.options.periodV;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<vN-1&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=vN-1;i<series.spotCount;i++)
                    this.vector(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                var vN = this.options.periodV;
                if (series.spotCount >= vN)
                {
                    this.vector(series, series.spotCount-1);
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt = series.points[i][this.name];
                    if (pt != undefined) {
                        var value = parseFloat(pt.v);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;

                        if (pt.s) {
                            value = parseFloat(pt.s);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined)
                    res[this.name]=pt;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                var pt,left;

                if (this.options.colorV) {
                    left=-1;
                    ctx.beginPath();
                    for (var i=startIndex;i<=endIndex;i++) {
                        pt=series.points[i][this.name];
                        if (pt != undefined && pt.v != undefined) {
                            var value=parseFloat(pt.v);
                            var x=axisX.toScreen(i);
                            var y=axisY.toScreen(value);
                            if (left===-1)
                            {
                                ctx.moveTo(x,y);
                                left=i;
                            }
                            else
                                ctx.lineTo(x,y);
                        }
                    }
                    ctx.lineWidth=this.options.thicknessV;
                    ctx.strokeStyle=this.options.colorV;
                    this.options.styleV=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();
                }

                if (this.options.colorS) {
                    left=-1;
                    ctx.beginPath();
                    for (var i=startIndex;i<=endIndex;i++) {
                        pt=series.points[i][this.name];
                        if (pt != undefined && pt.s != undefined) {
                            var value=parseFloat(pt.s);
                            var x=axisX.toScreen(i);
                            var y=axisY.toScreen(value);
                            if (left===-1)
                            {
                                ctx.moveTo(x,y);
                                left=i;
                            }
                            else
                                ctx.lineTo(x,y);
                        }
                    }
                    ctx.lineWidth=this.options.thicknessS;
                    ctx.strokeStyle=this.options.colorS;
                    this.options.styleS=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // ACDDrawer class
        //========================================

        function ACDDrawer(name, options)
        {
            this.name=name;
            this.options=options;
//            this.options.dp=2;

            this.ctr();
        }

        ACDDrawer.prototype={
            className: "ACDDrawer",

            acd: function(series, index) {
                // This is ADL of Chaikin Oscillator
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:accumulation_distribution_line
                var pts=series.points;
//                if (index == 0) {
//                    pts[index][this.name] = 0;
//                }
//                else {
                    var close = parseFloat(pts[index].close);
                    var high = parseFloat(pts[index].high);
                    var low = parseFloat(pts[index].low);

                    var mfm = ((close - low) - (high - close)) / (high - low);
                    var mfv = mfm * parseFloat(pts[index].volume);
                    var adl = mfv;
                    if (index>0) adl += pts[index-1][this.name];
//                    var adl = pts[index-1][this.name] + mfv;
                    pts[index][this.name] = adl;
//                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.acd(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                this.acd(series, series.spotCount-1);
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined)
                    res[this.name]=pt.toFixed(0);
            }
        };

        chartFactory.extendClass(ACDDrawer, BaseLineDrawer);

        //========================================
        // EnvelopeDrawer class
        //========================================

        function EnvelopeDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        EnvelopeDrawer.prototype={
            classname: "EnvelopeDrawer",

            middleband: function (series, index) {
                var pts=series.points;
                pts[index][this.name] = {};

                var N=this.options.period;
                var cnt=N;
                var sum=0;
                for (var j=0;j<cnt && index>=j;j++) {
                    if (pts[index-j].close)
                        sum += parseFloat(pts[index-j].close);
                    else
                        cnt++;
                }
                pts[index][this.name].mid=(sum/N).toFixed(this.options.dp);
            },

            updownband: function (series, index) {
                var pts=series.points;

                var N=this.options.period;
                var cnt=N;
//                var sum=0;
                for (var j=0; j<cnt && j<=index; j++) {
                    if (pts[index-j].close && pts[index-j][this.name] && pts[index-j][this.name].mid) {
//                        sum+=parseFloat(pts[index-j].close;
                    }
                    else
                        cnt++;
                }
                var factor=parseFloat(this.options.factor.value);
                var mid=parseFloat(pts[index][this.name].mid); //sum/N
                pts[index][this.name].upper = (mid*(1+factor)).toFixed(this.options.dp);
                pts[index][this.name].lower = (mid*(1-factor)).toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                var N1=this.options.period-1;
                for (var i=N1; i<series.spotCount; i++)
                    this.middleband(series, i);
                if (this.options.factor) {
                    for (var i=N1; i<series.spotCount; i++)
                        this.updownband(series, i);
                }
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period-1) {
                    this.middleband(series, series.spotCount-1);
                    if (this.options.factor) {
                        this.updownband(series, series.spotCount-1);
                    }
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                var pt,upper,lower;
                for (var i=startIndex;i<=endIndex;i++)
                {
                    pt=series.points[i][this.name];
                    if (pt != undefined) {
                        if (this.options.factor) {
                            upper=parseFloat(pt.upper);
                            lower=parseFloat(pt.lower);
                        }
                        else {
                            upper=parseFloat(pt.mid);
                            lower=upper;
                        }
                        if (res.min==undefined || lower < res.min)
                            res.min=lower;
                        if (res.max==undefined || upper > res.max)
                            res.max=upper;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined) {
                    if (this.options.factor) {
                        res[this.name] = {
                            u: pt.upper,
                            m: pt.mid,
                            l: pt.lower
                        };
                    }
                    else {
                        res[this.name] = {
                            m: pt.mid
                        };
                    }
                }
                else {
                    res[this.name] = { };
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            drawUpperBand: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.upper));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.factor.thickness;
                ctx.strokeStyle=this.options.factor.color0;
                this.options.factor.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            drawMiddleBand: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.mid));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            drawLowerBand: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.lower));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.factor.thickness;
                ctx.strokeStyle=this.options.factor.color1;
                this.options.factor.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

//                var N1=this.options.period-1;
//                if (startIndex < N1)
//                    startIndex=N1;
//                if (endIndex >= series.spotCount)
//                    endIndex=series.spotCount-1;

                if (this.options.factor) {
                    this.drawUpperBand(series, startIndex, endIndex, axisX, axisY, ctx);
                    this.drawLowerBand(series, startIndex, endIndex, axisX, axisY, ctx);
                }
                else {
                    this.drawMiddleBand(series, startIndex, endIndex, axisX, axisY, ctx);
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // LRTDrawer class
        //========================================

        function LRTDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

//            if (this.options.showfullrangeLRT)
//                this.options.vid="f"; // ...meaning full range
//            else
//                this.options.vid="v"; // ...meaning visible range
            this.options.vid="v";

            this.ctr();
        }

        LRTDrawer.prototype={
            className: "LRTDrawer",

            lrt: function(series, startIndex, endIndex, vid) {
                // Ref: http://onlinestatbook.com/2/regression/intro.html
                var pts=series.points;
                var N = endIndex-startIndex+1;

                var sumX = 0, sumX2 = 0;
                var sumY = 0, sumY2 = 0;
                var sumXY = 0;
                var Xstart=startIndex, Xend=endIndex, XN=N;
                for (var X = Xstart; X <= Xend; X++) {
                    if (pts[X].close != undefined) {
                        var Y = parseFloat(pts[X].close);
                        sumX += X;
                        sumX2 += X*X;
                        sumY += Y;
                        sumY2 += Y*Y;
                        sumXY += X*Y;
                    }
                }
                var mX = sumX / XN;
                var mY = sumY / XN;
                var b = (XN*sumXY-sumX*sumY)/(XN*sumX2-sumX*sumX);
                var A = mY - b * mX;

                for (var X = startIndex; X <= endIndex; X++) {
                    if (pts[X].close != undefined) {
                        var res = b*X + A;
                        if (!pts[X][this.name]) pts[X][this.name]={};
                        pts[X][this.name][this.options.vid] = res;
                    }
                }
            },

            dataReady: function(series) {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

//                // for the full range
//                series=series.compact();
//                this.lrt(series, 0, series.spotCount-1, "f"); // vid="f" meaning full range
            },

            dataUpdate: function(series) {
//                // for the full range
//                series=series.compact();
//                this.lrt(series, 0, series.spotCount-1, "f");
            },

            require: function(series) {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res) {
                if (this.options.vid==="v") {
                    // do the TA calculation here for the visible range
                    this.lrt(series, startIndex, endIndex, "v");
                }

                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        var value=pt[this.options.vid];
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res) {
                var pt=series.points[index][this.name];
                if (pt != undefined)
                    res[this.name] = pt[this.options.vid].toFixed(this.options.dp);
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res) { },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx) {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                ctx.beginPath();
                var pt,x,y;

                pt=series.points[startIndex][this.name];
                while (pt == undefined && startIndex < endIndex) {
                    startIndex++;
                    if (startIndex < endIndex)
                        pt=series.points[startIndex][this.name];
                    else
                        pt=undefined;
                }
                if (pt != undefined) {
                    x = axisX.toScreen(startIndex);
                    y = axisY.toScreen(pt[this.options.vid]);
                    ctx.moveTo(x, y);
                }

                pt=series.points[endIndex][this.name];
                while (pt == undefined && endIndex > startIndex) {
                    endIndex--;
                    if (endIndex > startIndex)
                        pt=series.points[endIndex][this.name];
                    else
                        pt=undefined;
                }
                if (pt != undefined) {
                    x = axisX.toScreen(endIndex);
                    y = axisY.toScreen(pt[this.options.vid]);
                    ctx.lineTo(x, y);
                }

                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx) {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx) {
                this.options=serObj.options;
            },

            ctr: function() { }
        };

        //========================================
        // WeightCloseDrawer class
        //========================================

        function WeightedCloseDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        WeightedCloseDrawer.prototype={
            className: "WeightedCloseDrawer",

            wc: function(series, index)
            {
                var pts=series.points;
                var res = (parseFloat(pts[index].high) + parseFloat(pts[index].low) + parseFloat(this.options.factor) * parseFloat(pts[index].close)) / (2 + this.options.factor);
                pts[index][this.name] = res.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.wc(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                var i=series.spotCount-1;
                this.wc(series, i);
            }
        };

        chartFactory.extendClass(WeightedCloseDrawer, BaseLineDrawer);

        //========================================
        // UIDrawer class
        //========================================

        function UIDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.siN=this.options.period-1;
//            this.siN2=this.siN*2;

            this.ctr();
        }

        UIDrawer.prototype={
            className: "UIDrawer",

            ui: function(series, index) {
                var pts=series.points;
                var pt=pts[index];
                var N=this.options.period;

                if (index>=this.siN) {
//                    // A different interpretation of the formula and a new implementation...
//                    // This implementation finds the max price in a period first, before calculating the drawdown percentage of each point in the period
//                    // This was probably WRONG!
//                    // Ref: https://en.wikipedia.org/wiki/Ulcer_index
//                    var max=0;
//                    for (var j=0;j<N;j++)
//                        max=Math.max(max, pts[index-j].close);
//                    var r=100*(pt.close-max)/max;
//                    var r2=r*r;
//                    pt[this.name+"_"] = { max: max, r2: r2 };
//
//                    if (index>=this.siN2) {
//                        var rsum=0;
//                        for (var i=0;i<N;i++)
//                            rsum += pts[index-i][this.name+"_"].r2;
//
//                        var res = Math.sqrt(rsum/N);
//                        pt[this.name] = res.toFixed(this.options.dp);
//                    }
//                    console.log("-----" + pt.close + "," + pt[this.name+"_"].max + "," + pt[this.name+"_"].r2.toFixed(2) + "," + pt[this.name]);

                    // A corrected implementation of the formula as used by Java Chart
                    // The formula should cover only up to N points, but the old implementation cover the N+1 point too in the for-loop (it checks up to j<=N)
                    // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:ulcer_index
                    // Ref: http://www.tangotools.com/ui/ui.htm
                    var i=index-N+1;
                    var max=pts[i].close;
                    var rsum=0;
                    for (var j=1;j<N;j++) {
                        var c=pts[i+j].close;
                        if (c>max)
                            max=c;
                        else {
                            var r=100*(c-max)/max;
                            var r2=r*r;
                            rsum+=r2;
                        }
                    }
                    var res = Math.sqrt(rsum/N);
                    pt[this.name]=res.toFixed(this.options.dp);
//                    console.log("-----" + pt.close + "," + pt[this.name]);

//                    // The Java Chart / F-one implementation (note F-one further/intentionally set the point 1 datapoint to the right, hence to align the points, but still incorrect)
//                    // Ref: http://www.tangotools.com/ui/ui.htm
//                    var i=index-N+1;
//                    var max=pts[i].close;
//                    var rsum=0;
//                    for (var j=1;j<=N;j++) {
//                        if (!pts[i+j]) continue;
//                        var c=pts[i+j].close;
//                        if (c>max)
//                            max=c;
//                        else {
//                            var r=100*(c-max)/max;
//                            var r2=r*r;
//                            rsum+=r2;
//                        }
//                    }
//                    var res = Math.sqrt(rsum/N);
//                    pt[this.name]=res.toFixed(this.options.dp);
//                    console.log("-----" + pt.close + "," + pt[this.name]);
                }
                else {
                    delete pt[this.name];
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.ui(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                this.ui(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(UIDrawer, BaseLineDrawer);

        //========================================
        // WADDrawer class
        //========================================

        function WADDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        WADDrawer.prototype={
            className: "WADDrawer",

            wad: function(series, index)
            {
                var pts=series.points;
                var prevPt=pts[index-1];
                var pt=pts[index];

                if (index===0) {
                    delete pt[this.name];
                }
                else {
                    var prevC=parseFloat(prevPt.close);
                    var C=parseFloat(pt.close);
                    var thigh = Math.max(prevC, parseFloat(pt.high));
                    var tlow = Math.min(prevC, parseFloat(pt.low));

                    var ad = 0;
                    if (C > prevC)
                        ad = C - tlow;
                    else if (C < prevC)
                        ad = C - thigh;
                    else
                        ad = 0;

                    var res;
                    if (prevPt[this.name])
                        res=parseFloat(prevPt[this.name])+ad;
                    else
                        res=ad;
                    pt[this.name] = res.toFixed(this.options.dp);
                }
            },

            dataReady: function(series)
            {
                this.options.dp=series.decimalPlace; // receive a new series, update "dp" according to this series

                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.wad(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                var i=series.spotCount-1;
                this.wad(series, i);
            },

            require: function(series)
            {
                return false;
            }
        };

        chartFactory.extendClass(WADDrawer, BaseLineDrawer);

        //========================================
        // TrixDrawer class
        //========================================

        function TrixDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=3;

            this.ctr();
        }

        TrixDrawer.prototype={
            className: "TrixDrawer",

            ema1: function(series, index)
            {
                var pts=series.points;

                var res = 0;
                if (index == this.options.trix.period-1) {
                    var sum = 0;
                    for (var i=0;i<this.options.trix.period;i++)
                        sum += parseFloat(pts[index-i].close);

                    res = sum/this.options.trix.period;
                }
                else {
                    var factor = 2 / (this.options.trix.period + 1);
                    res = (pts[index].close - pts[index-1][this.name].ema1) * factor + pts[index-1][this.name].ema1;
                }

                pts[index][this.name].ema1 = res;
            },

            ema2: function(series, index)
            {
                var pts=series.points;

                var res = 0;
                if (index == 2*this.options.trix.period-2) {
                    var sum = 0;
                    for (var i=0;i<this.options.trix.period;i++)
                        sum += pts[index-i][this.name].ema1;

                    res = sum/this.options.trix.period;
                }
                else {
                    var factor = 2 / (this.options.trix.period + 1);
                    res = (pts[index][this.name].ema1 - pts[index-1][this.name].ema2) * factor + pts[index-1][this.name].ema2;
                }

                pts[index][this.name].ema2 = res;
            },

            ema3: function(series, index)
            {
                var pts=series.points;

                var res = 0;
                if (index == 3*this.options.trix.period-3) {
                    var sum = 0;
                    for (var i=0;i<this.options.trix.period;i++)
                        sum += pts[index-i][this.name].ema2;

                    res = sum/this.options.trix.period;
                }
                else {
                    var factor = 2 / (this.options.trix.period + 1);
                    res = (pts[index][this.name].ema2 - pts[index-1][this.name].ema3) * factor + pts[index-1][this.name].ema3;
                }

                pts[index][this.name].ema3 = res;
            },

            trix: function(series, index)
            {
                var pts=series.points;
                var pt = pts[index][this.name] = {};

                var ema1periodStartIdx = this.options.trix.period-1;
                var ema2periodStartIdx = 2*this.options.trix.period-2;
                var ema3periodStartIdx = 3*this.options.trix.period-3;
                var trixStartIdx = ema3periodStartIdx + 1;
                var trixmaStartIdx = trixStartIdx + this.options.signal.period-1;

                // Clear any old data
                if (index < trixmaStartIdx) {
                    delete pt.trixma;
                    if (index < trixStartIdx) delete pt.trix;
                }

                if (index >= ema1periodStartIdx) {
                    this.ema1(series, index);

                    if (index >= ema2periodStartIdx) {
                        this.ema2(series, index);

                        if (index >= ema3periodStartIdx) {
                            this.ema3(series, index);

                            if (index >= trixStartIdx) {
                                var res = (pt.ema3 - pts[index-1][this.name].ema3) / pts[index-1][this.name].ema3 * 100;
                                pt.trix_ = res;
                                pt.trix = res.toFixed(this.options.dp);

                                if (index >= trixmaStartIdx) {
                                    var res2;
                                    if (index === trixmaStartIdx) {
                                        var sum = 0;
                                        for (var i=0; i<this.options.signal.period;i++)
                                            sum += pts[index-i][this.name].trix_;

                                        res2 = sum / this.options.signal.period;
                                    }
                                    else {
                                        var factor = 2 / (this.options.signal.period + 1);
                                        var res2 = (pt.trix_ - pts[index-1][this.name].trixma_) * factor + pts[index-1][this.name].trixma_;
                                    }
                                    pt.trixma_ = res2;
                                    pt.trixma = res2.toFixed(this.options.dp);
                                }
                            }
                        }
                    }
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.trix(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                this.trix(series, series.spotCount-1);
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.trix != undefined) {
                        var value=parseFloat(pt.trix);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;

                        if (pt.trixma) {
                            value=parseFloat(pt.trixma);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined && pt.trix != undefined) {
                    res.trix = series.points[index][this.name].trix;
                    if (pt.trixma) {
                        res.s = series.points[index][this.name].trixma;
                    }
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.trix != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.trix));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.trix.thickness;
                ctx.strokeStyle=this.options.trix.color;
                this.options.trix.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.trixma)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.trixma));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.signal.thickness;
                ctx.strokeStyle=this.options.signal.color;
                this.options.signal.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // VOSCDrawer class
        //========================================

        function VOSCDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        VOSCDrawer.prototype={
            className: "VOSCDrawer",

            vosc: function(series, index) {
                // Ref: http://www.esignal.com/support/options-analytix/WebHelp/Price_Oscillator_(OSC).htm
                // Ref: https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/volume-oscillator
                var pts=series.points;

                var sum=0;
                for (var i=0;i<this.options.period;i++)
                    sum+=parseFloat(pts[index-i].volume);
                var short_sma = sum/this.options.period;

                sum=0;
                for (var i=0;i<this.options.period2;i++)
                    sum+=parseFloat(pts[index-i].volume);
                var long_sma = sum/this.options.period2

                var res = (short_sma - long_sma) / long_sma * 100;
                pts[index][this.name] = res.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period2-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.vosc(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period2)
                {
                    this.vosc(series, series.spotCount-1);
                }
            }
        };

        chartFactory.extendClass(VOSCDrawer, BaseLineDrawer);

        //========================================
        // VEDrawer class
        //========================================

        function VEDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        VEDrawer.prototype={
            className: "VEDrawer",

            ve: function(series, index) {
                // Ref: http://swing-trade.net/trade203.html
                var pts=series.points;
                pts[index][this.name] = {};

                var sum=0;
                for (var i=0;i<this.options.period;i++)
                    sum+=parseFloat(pts[index-i].volume);
                var sma = sum/this.options.period;

                var up = sma * (1 + this.options.factor);
                var lo = sma * (1 - this.options.factor);
                pts[index][this.name].up = up.toFixed(this.options.dp);
                pts[index][this.name].lo = lo.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.ve(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period)
                {
                    var i=series.spotCount-1;
                    this.ve(series, i);
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i];
                    if (pt.volume != undefined) {
                        value=parseFloat(pt.volume);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;

                        pt=pt[this.name];
                        if (pt != undefined) {
                            var value=parseFloat(pt.up);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;

                            value=parseFloat(pt.lo);
                            if (res.min==undefined || value<res.min)
                                res.min=value;
                            if (res.max==undefined || value>res.max)
                                res.max=value;
                        }
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index];
                if (pt.volume != undefined) {
                    res.volume=pt.volume;

                    pt=pt[this.name];
                    if (pt != undefined)
                        res[this.name]=pt;
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                var w=axisX.colWidth|0;
                if (w > 40)
                    w -= 10;
                else if (w > 30)
                    w -= 8;
                else if (w > 20)
                    w -= 6;
                else if (w > 10)
                    w -= 4;
                else if (w > 2)
                    w -= 2;
                else
                    w=1;
                var half=(w/2)|0;
                var base=axisY.toScreen(0);

                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i];
                    if (pt.volume) {
                        var y=axisY.toScreen(parseFloat(pt.volume));
                        ctx.fillStyle=this.options.volume.color;
                        ctx.fillRect(axisX.toScreen(i)-half, y, w, base-y);
                    }
                }

                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.up));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }

                ctx.lineWidth=this.options.envelope.thickness;
                ctx.strokeStyle=this.options.envelope.uColor;
                this.options.envelope.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.lo));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }

                ctx.lineWidth=this.options.envelope.thickness;
                ctx.strokeStyle=this.options.envelope.bColor;
                this.options.envelope.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // VROCDrawer class
        //========================================

        function VROCDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            if (this.options.dp==undefined) this.options.dp=2;
            if (!this.options.field) this.options.field="volume";

            this.ctr();
        }

        VROCDrawer.prototype={
            className: "VROCDrawer",

            vroc: function(series, index)
            {
                var pts=series.points;
                var N=this.options.period;
                var C=pts[index][this.options.field];
                var prevC=pts[index-N][this.options.field];
                var chg=C-prevC;
                if (this.options.relative) chg=chg*100/prevC;
                pts[index][this.name] = chg.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.vroc(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount > this.options.period)
                {
                    var i=series.spotCount-1;
                    this.vroc(series, i);
                }
            }
        };

        chartFactory.extendClass(VROCDrawer, BaseLineDrawer);

        //========================================
        // PCVDrawer class
        //========================================

        function PCVDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        PCVDrawer.prototype={
            className: "PCVDrawer",

            pcv: function(series, index)
            {
                var pts=series.points;
                var range=pts[index].high-pts[index].low;
                pts[index][this.name] = range.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.pcv(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                this.pcv(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(PCVDrawer, BaseLineDrawer);

        //========================================
        // ALFDrawer class
        //========================================

        function ALFDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        ALFDrawer.prototype={
            className: "ALFDrawer",

            alf: function(series, index)
            {
                var pts=series.points;

                var res = (pts[index].close/pts[index-this.options.period].close - 1)*100;
                pts[index][this.name] = res.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.alf(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period)
                {
                    var i=series.spotCount-1;
                    this.alf(series, i);
                }
            }
        };

        chartFactory.extendClass(ALFDrawer, BaseLineDrawer);

        //========================================
        // POSCDrawer class
        //========================================

        function POSCDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        POSCDrawer.prototype={
            className: "POSCDrawer",

            posc: function(series, index) {
                // Ref: http://www.esignal.com/support/options-analytix/WebHelp/Price_Oscillator_(OSC).htm
                // Ref: https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/volume-oscillator
                var pts=series.points;

                var sum=0;
                for (var i=0;i<this.options.period;i++)
                    sum+=parseFloat(pts[index-i].close);
                var short_sma = sum/this.options.period;

                sum=0;
                for (var i=0;i<this.options.period2;i++)
                    sum+=parseFloat(pts[index-i].close);
                var long_sma = sum/this.options.period2

                var res = (short_sma - long_sma) / long_sma * 100;
                pts[index][this.name] = res.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period2-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.posc(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period2)
                {
                    var i=series.spotCount-1;
                    this.posc(series, i);
                }
            }
        };

        chartFactory.extendClass(POSCDrawer, BaseLineDrawer);

        //========================================
        // NVIDrawer class
        //========================================

        function NVIDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

//            this.options.s.method=chartFactory.MA_SMA; // hardcoded to use SMA to follow the original Java Chart
            this.options.s.method=chartFactory.MA_EMA; // hardcoded to use EMA to follow the online reference suggestion
            if (this.options.s.method==chartFactory.MA_EMA)
                this.emafactor=2/(this.options.s.period+1);
            else if (this.options.s.method==chartFactory.MA_MEMA)
                this.emafactor=1/this.options.s.period;

            this.ctr();
        }

        NVIDrawer.prototype={
            className: "NVIDrawer",

            nvi: function(series, index) {
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:negative_volume_inde
                var pts=series.points;
                var pt=pts[index];
                var P = pt[this.name] = {};

                if (index===0) {
                    P.cnvi = 1000;
                }
                else {
                    var prev=pts[index-1];
                    var prevP=pts[index-1][this.name];

                    if (pt.volume < prev.volume) {
                        var pct=(pt.close - prev.close) / prev.close * 100;
                        P.cnvi = prevP.cnvi + pct;
                    }
                    else
                        P.cnvi = prevP.cnvi;
                }

                var N=this.options.s.period;
                if (index>=N-1) {
                    if (this.options.s.method===chartFactory.MA_WMA) {
                        var sum=0;
                        var cnt=0;
                        for (var i=0;i<N;i++) {
                            var w=N-i;
                            cnt+=w;
                            sum+=pts[index-i][this.name].cnvi*w;
                        }
                        P.s=sum/N;
                    }
                    else if (index===N-1 || this.options.s.method===chartFactory.MA_SMA) {
                        var sum=0;
                        for (var i=0;i<N;i++) {
                            sum+=pts[index-i][this.name].cnvi;
                        }
                        P.s=sum/N;
                    }
                    else {
                        P.s=(P.cnvi - prevP.s)*this.emafactor + prevP.s;
                    }
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.nvi(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                this.nvi(series, series.spotCount-1);
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var p=series.points[i][this.name];
                    if (p != undefined) {
                        var min,max;
                        if (p.s == undefined) {
                            min=p.cnvi;
                            max=min;
                        }
                        else {
                            min=Math.min(p.cnvi, p.s);
                            max=Math.max(p.cnvi, p.s);
                        }
                        if (res.min==undefined || min<res.min)
                            res.min=min;
                        if (res.max==undefined || max>res.max)
                            res.max=max;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var p=series.points[index][this.name];
                if (p != undefined) {
                    res[this.name]={
                        cnvi: p.cnvi.toFixed(this.options.dp)
                    }
                    if (p.s != undefined)
                        res[this.name].s=p.s.toFixed(this.options.dp);
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var p=series.points[i][this.name];
                    if (p != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(p.cnvi));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.cnvi.thickness;
                ctx.strokeStyle=this.options.cnvi.color;
                this.options.s.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var p=series.points[i][this.name];
                    if (p != undefined && p.s != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(p.s));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.s.thickness;
                ctx.strokeStyle=this.options.s.color;
                this.options.s.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // CCDrawer class
        //========================================

        function CCDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        CCDrawer.prototype={
            className: "CCDrawer",

            cc: function(series, index) {
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:coppock_curve
                var pts=series.points;

                var sN,lN;
                if (this.options.period2 > this.options.period3) {
                    lN=this.options.period2;
                    sN=this.options.period3;
                }
                else {
                    sN=this.options.period2;
                    lN=this.options.period3;
                }
                if (index >= lN) {
                    var C=parseFloat(pts[index].close);
                    var sC=parseFloat(pts[index-sN].close);
                    var lC=parseFloat(pts[index-lN].close);
                    var roc_s = (C-sC)/sC * 100;
                    var roc_l = (C-lC)/lC * 100;

                    pts[index][this.name+"_"] = roc_s+roc_l;

                    var maN=this.options.period;
                    if (index >= maN-1 + lN) {
                        var sum=0;
                        var cnt=0;
                        for (var i=0;i<maN;i++) {
                            var w=maN-i;
                            sum += parseFloat(pts[index-i][this.name+"_"])*w;
                            cnt+=w;
                        }
                        var res = sum/cnt;
                        pts[index][this.name] = res.toFixed(this.options.dp);
                    }
                    else {
                        delete pts[index][this.name];
                    }
                }
                else {
                    delete pts[index][this.name];
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.cc(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                this.cc(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(CCDrawer, BaseLineDrawer);

        //========================================
        // KCDrawer class
        //========================================

        function KCDrawer(name, options) {
            // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:keltner_channels
            this.name=name;
            this.options=options;
            this.options.dp=2;

//            if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA) {
//                var N=this.options.period;
//                if (this.options.method===chartFactory.MA_EMA) {
//                    this.emafactor = 2/(N+1);
//                }
//                else {
//                    this.emafactor = 1/N;
//                }
//            }
            this.emafactor = 2/(this.options.period+1); // do EMA only for KC

            this.ref_index = -1;
            this.ref_ema = -1;
            this.ema = -1;

            this.ctr();
        }

        KCDrawer.prototype={
            classname: "KCDrawer",

            atr: function(series, index) {
                var pts=series.points;
                var sum=0;
                var aN=this.options.atr.period;
                if (index >= aN) {
                    for (var i=0;i<aN && index>=i;i++) {
                        var H=pts[index-i].high;
                        var L=pts[index-i].low;
                        var prevC=pts[index-i-1].close;

                        var daily_tr=H-L;
                        var h_pc_tr=Math.abs(H-prevC);
                        var l_pc_tr=Math.abs(L-prevC);

                        sum+=Math.max(daily_tr, h_pc_tr, l_pc_tr);
                    }
                    var sma=sum/aN;
                    pts[index][this.name].atr=sma;
                }
            },

            middleband: function (series, index) {
                // do EMA calculation for the mid value
                var pts=series.points;
                var N=this.options.period;
                var sN=N-1;
                var pt;
                if (index===sN) {
                    // 1st data point, do normal SMA
                    var sum = 0, tp;
                    for (var i=0;i<N;i++) {
                        pt = pts[index-i];
                        tp = pt.close;
//                        tp = (pt.high+pt.low+pt.close)/3;
                        sum += tp;
                    }
                    var ma = sum/N; // sma
                    pts[index][this.name].mid=ma.toFixed(this.options.dp);

                    this.ref_index= -1;
                    this.ema = ma;
                }
                else if (index>sN) {
                    // following points, do EMA
                    if (this.ref_index != index-1) {
                        this.ref_index = index-1;
                        this.ref_ema = this.ema;
                    }
                    pt = pts[index];
                    var tp = pt.close;
//                    var tp = (pt.high+pt.low+pt.close)/3;
                    var ma = (tp - this.ref_ema)*this.emafactor + this.ref_ema; // ema
                    pts[index][this.name].mid=ma.toFixed(this.options.dp);

                    this.ema = ma;
                }
            },

            updownband: function (series, index) {
                var pts=series.points;

                var atr=pts[index][this.name].atr;
                var mid=pts[index][this.name].mid;
                if (atr != undefined && mid != undefined) {
                    mid=parseFloat(mid);
                    var d=this.options.atr.value*atr;
                    pts[index][this.name].upper=(mid+d).toFixed(this.options.dp);
                    pts[index][this.name].lower=(mid-d).toFixed(this.options.dp);
                }
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                var pts=series.points;
                var sN = this.options.atr ? Math.max(this.options.period-1, this.options.atr.period) : undefined;

                for (var i=0; i<series.spotCount; i++) {
                    pts[i][this.name]={};

                    if (this.options.atr) this.atr(series, i);
                    this.middleband(series, i);

                    if (sN && i>=sN)
                        this.updownband(series, i); // from here we will render the up/lo band
                }
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                var pts=series.points;
                var sN = this.options.atr ? Math.max(this.options.period-1, this.options.atr.period) : undefined;

                var i=series.spotCount-1;
                pts[i][this.name]={};

                if (this.options.atr) this.atr(series, i);
                this.middleband(series, i);

                if (sN && i>=sN)
                    this.updownband(series, i); // from here we will render the up/lo band
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        var upper,lower;
                        if (this.options.atr) {
                            upper=parseFloat(pt.upper);
                            lower=parseFloat(pt.lower);
                        }
                        else {
                            upper=parseFloat(pt.mid);
                            lower=upper;
                        }
                        if (res.min==undefined || lower < res.min)
                            res.min=lower;
                        if (res.max==undefined || upper > res.max)
                            res.max=upper;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined) {
                    if (this.options.atr) {
                        res[this.name] = {
                            u: pt.upper,
                            m: pt.mid,
                            l: pt.lower
                        };
                    }
                    else {
                        res[this.name] = {
                            m: pt.mid
                        };
                    }
                }
                else {
                    res[this.name] = { };
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            drawUpperBand: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.upper != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.upper));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.atr.thickness;
                ctx.strokeStyle=this.options.atr.color0;
                this.options.atr.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            drawMiddleBand: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.mid != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.mid));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            drawLowerBand: function(series, startIndex, endIndex, axisX, axisY, ctx)
            {
                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.lower != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.lower));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.atr.thickness;
                ctx.strokeStyle=this.options.atr.color1;
                this.options.atr.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                if (this.options.atr) {
                    this.drawUpperBand(series, startIndex, endIndex, axisX, axisY, ctx);
                    this.drawLowerBand(series, startIndex, endIndex, axisX, axisY, ctx);
                }
                else {
                    this.drawMiddleBand(series, startIndex, endIndex, axisX, axisY, ctx);
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // EOMDrawer class
        //========================================

        function EOMDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.options.scale=1000000;

            if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA) {
                var N=this.options.period;
                if (this.options.method===chartFactory.MA_EMA) {
                    this.emafactor = 2/(N+1);
                }
                else {
                    this.emafactor = 1/N;
                }
            }

            this.ref_index= -1;
            this.ref_ema= -1;
            this.ema= -1;

            this.ctr();
        }

        EOMDrawer.prototype={
            className: "EOMDrawer",

            simpleAvg: function(series, index) {
                var pts=series.points;
                var sum=0;
                var N=this.options.period;
                for (var i=0;i<N;i++) {
                    sum += pts[index-i][this.name].eom1;
                }
                var ma = sum / N; // sma
                pts[index][this.name].eom = ma.toFixed(this.options.dp);
                this.ref_index= -1;
                this.ema = ma;
            },

            expAvg: function(series, index) {
                if (this.ref_index != index-1) {
                    this.ref_index = index-1;
                    this.ref_ema = this.ema;
                }
                var pts=series.points;
                var ma = (pts[index][this.name].eom1 - this.ref_ema)*this.emafactor + this.ref_ema; // ema
                pts[index][this.name].eom = ma.toFixed(this.options.dp);
                this.ema = ma;
            },

            weightedAvg: function(series, index) {
                var pts=series.points;
                var N=this.options.period;
                var sum=0;
                var cnt=0;
                for (var i=0;i<N;i++) {
                    sum += pts[index-i][this.name].eom1 * (N-i);
                    cnt += (N-i);
                }
                var ma = sum / cnt; // wma
                pts[index][this.name].eom = ma.toFixed(this.options.dp);
            },

            eom: function(series, index) {
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:ease_of_movement_emv
                var pts=series.points;
                pts[index][this.name] = { };

//                var prev = pts[index-1];
//                var pH = parseFloat(prev.high);
//                var pL = parseFloat(prev.low);
                var pt=pts[index];
                var H=parseFloat(pt.high);
                var L=parseFloat(pt.low);
                pt[this.name].mid=(H+L)/2;

                if (index > 0) {
                    var V = parseFloat(pt.volume);
                    var d = pt[this.name].mid - pts[index-1][this.name].mid; // distance moved
                    var r = (V/this.options.scale) / (H-L); // box ratio
                    var eom1 = d / r;
                    pt[this.name].eom1 = eom1;

                    var N=this.options.period;
                    if (index===N) {
                        if (this.options.method===chartFactory.MA_WMA)
                            this.weightedAvg(series, index);
                        else
                            this.simpleAvg(series, index);
                    }
                    else if (index > N) {
                        if (this.options.method===chartFactory.MA_SMA)
                            this.simpleAvg(series, index);
                        else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                            this.expAvg(series, index);
                        else
                            this.weightedAvg(series, index);
                    }
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.eom(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                this.eom(series, series.spotCount-1);
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex; i<=endIndex; i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.eom != undefined) {
                        var value=parseFloat(pt.eom);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }

                // Make sure that the zero line is always visible
                if (res.min > 0) res.min=0;
                if (res.max < 0) res.max=0;
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined && pt.eom != undefined)
                    res[this.name]=series.points[index][this.name].eom;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1,right;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.eom != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.eom));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                        right=i;
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                if (this.options.fillColor != null) {
                    var base = axisY.toScreen(0);
                    ctx.lineTo(axisX.toScreen(right), base);
                    ctx.lineTo(axisX.toScreen(left), base);
                    ctx.fillStyle=this.options.fillColor;
                    ctx.fill();
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // RMIDrawer class
        //========================================

        function RMIDrawer(name, options) {
            // Ref: http://www.tradingsolutions.com/functions/RelativeMomentumIndex.html
            this.name=name;
            this.options=options;
            this.options.dp=2;

            if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA) {
                var N=this.options.period;
                if (this.options.method===chartFactory.MA_EMA) {
                    this.emafactor = 2/(N+1);
                }
                else {
                    this.emafactor = 1/N;
                }
            }

            this.ref_index = -1;
            this.ref_ema0 = -1;
            this.ref_ema1 = -1;
            this.ema0 = -1;
            this.ema1 = -1;

            this.ctr();
        }

        RMIDrawer.prototype={
            className: "RMIDrawer",

            simpleAvg: function(series, index) {
                var pts=series.points;
                var sumG=0, sumL=0;
                var N=this.options.period;
                for (var i=0;i<N;i++) {
                    var C=parseFloat(pts[index-i].close);
                    var prevC=parseFloat(pts[index-i-this.options.periodM].close);
                    if (C>prevC)
                        sumG+=(C-prevC);
                    else
                        sumL+=(prevC-C);
                }
                var aG=sumG/N;
                var aL=sumL/N;

                var rmi;
                var aGL=aG+aL;
                if (aGL===0)
                    rmi=50;
                else
                    rmi=aG*100/(aGL);
                pts[index][this.name] = rmi.toFixed(this.options.dp);

                this.ref_index= -1;
                this.ema0 = aG;
                this.ema1 = aL;
            },

            expAvg: function(series, index) {
                if (this.ref_index != index-1) {
                    this.ref_index = index-1;
                    this.ref_ema0 = this.ema0;
                    this.ref_ema1 = this.ema1;
                }
                var pts=series.points;
                var C=parseFloat(pts[index].close);
                var prevC=parseFloat(pts[index-this.options.periodM].close);
                var aG=this.ref_ema0, aL=this.ref_ema1;
                if (C>prevC) {
                    aG = ((C-prevC) - this.ref_ema0)*this.emafactor + this.ref_ema0; // ema
                    aL = this.ref_ema1 - this.ref_ema1*this.emafactor;
                }
                else {
                    aG = this.ref_ema0 - this.ref_ema0*this.emafactor;
                    aL = ((prevC-C) - this.ref_ema1)*this.emafactor + this.ref_ema1; // ema
                }

                var rmi;
                var aGL=aG+aL;
                if (aGL===0)
                    rmi=50;
                else
                    rmi=aG*100/(aGL);
                pts[index][this.name] = rmi.toFixed(this.options.dp);

                this.ema0 = aG;
                this.ema1 = aL;
            },

            weightedAvg: function(series, index) {
                var pts=series.points;
                var N=this.options.period;
                var sumG=0, sumL=0;
                var cntG=0, cntL=0;
                for (var i=0;i<N;i++) {
                    var C=parseFloat(pts[index-i].close);
                    var prevC=parseFloat(pts[index-i-this.options.periodM].close);
                    if (C>prevC) {
                        sumG+=(C-prevC);
                        cntG += (N-i);
                    }
                    else {
                        sumL+=(prevC-C);
                        cntL += (N-i);
                    }
                }
                var aG = sumG/cntG; // wma
                var aL = sumL/cntL; // wma

                var rmi;
                var aGL=aG+aL;
                if (aGL===0)
                    rmi=50;
                else
                    rmi=aG*100/(aGL);
                pts[index][this.name] = rmi.toFixed(this.options.dp);
            },

            dataReady: function(series) {
                series=series.compact();
                var N=this.options.period;
                var M = this.options.periodM;
                var sN=N+M-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                if (series.spotCount >= N+M) {
                    // First moving average
                    if (this.options.method===chartFactory.MA_WMA)
                        this.weightedAvg(series, N+M-1);
                    else
                        this.simpleAvg(series, N+M-1);

                    // Subsequent moving averages
                    for (var i = N+M; i < series.spotCount; i++) {
                        if (this.options.method===chartFactory.MA_SMA)
                            this.simpleAvg(series, i);
                        else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                            this.expAvg(series, i);
                        else
                            this.weightedAvg(series, i);
                    }
                }
            },

            dataUpdate: function(series) {
                series=series.compact();
                var N=this.options.period;
                var M = this.options.periodM;
                if (series.spotCount >= N+M) {
                    var i = series.spotCount-1;

                    // First moving average
                    if (series.spotCount===N+M) {
                        if (this.options.method===chartFactory.MA_WMA)
                            this.weightedAvg(series, i);
                        else
                            this.simpleAvg(series, i);
                    }
                    // Subsequent moving average
                    else {
                        if (this.options.method===chartFactory.MA_SMA)
                            this.simpleAvg(series, i);
                        else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                            this.expAvg(series, i);
                        else
                            this.weightedAvg(series, i);
                    }
                }
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                if (res.min==undefined || res.min>0)
                    res.min=0;
                if (res.max==undefined || res.max<100)
                    res.max=100;
            }
        };

        chartFactory.extendClass(RMIDrawer, BaseLineDrawer);

        //========================================
        // MassIndexDrawer class
        //========================================

        function MassIndexDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA) {
                var N=this.options.period1; // EMA period of high-low difference
                if (this.options.method===chartFactory.MA_EMA) {
                    this.emafactor = 2/(N+1);
                }
                else {
                    this.emafactor = 1/N;
                }
            }

            this.ref_index0 = -1;
            this.ref_ema0 = -1;
            this.ema0 = -1;
            this.ref_index1 = -1;
            this.ref_ema1 = -1;
            this.ema1 = -1;

            this.ctr();
        }

        MassIndexDrawer.prototype={
            className: "MassIndexDrawer",

            simpleAvg0: function(series, index) {
                var pts=series.points;
                var sum0=0;
                var N=this.options.period1; // MA period of high-low difference

                for (var i=0;i<N;i++) {
                    sum0 += parseFloat(pts[index-i][this.name].diff);
                }
                var ma0 = sum0 / N; // single-sma
                pts[index][this.name].ma0 = ma0;

                this.ref_index0 = -1;
                this.ema0 = ma0;
            },
            simpleAvg1: function(series, index) {
                var pts=series.points;
                var sum1=0;
                var N=this.options.period1; // MA period of high-low difference

                for (var i=0;i<N;i++) {
                    sum1 += pts[index-i][this.name].ma0;
                }
                var ma1 = sum1 / N; // double-sma
                pts[index][this.name].ma1 = ma1;

                this.ref_index1 = -1;
                this.ema1 = ma1;
            },

            expAvg0: function(series, index) {
                if (this.ref_index0 != index-1) {
                    this.ref_index0 = index-1;
                    this.ref_ema0 = this.ema0;
                }
                var pts=series.points;
//                var N=this.options.period1; // MA period of high-low difference
                var diff = pts[index][this.name].diff;
                var ma0 = (diff - this.ref_ema0)*this.emafactor + this.ref_ema0; // ema
                pts[index][this.name].ma0 = ma0;
                this.ema0 = ma0;
            },
            expAvg1: function(series, index) {
                if (this.ref_index1 != index-1) {
                    this.ref_index1 = index-1;
                    this.ref_ema1 = this.ema1;
                }
                var pts=series.points;
//                var N=this.options.period1; // MA period of high-low difference
                var ma0 = pts[index][this.name].ma0;
                var ma1 = (ma0 - this.ref_ema1)*this.emafactor + this.ref_ema1; // ema
                pts[index][this.name].ma1 = ma1;
                this.ema1 = ma1;
            },

            weightedAvg0: function(series, index) {
                var pts=series.points;
                var N=this.options.period1; // MA period of high-low difference
                var sum0=0;
                var cnt0=0;

                for (var i=0;i<N;i++) {
                    var w=N-i;
                    sum0 += pts[index-i][this.name].diff * w;
                    cnt0 += w;
                }
                var ma0 = sum0 / cnt0; // wma
                pts[index][this.name].ma0 = ma0;
            },
            weightedAvg1: function(series, index) {
                var pts=series.points;
                var N=this.options.period1; // MA period of high-low difference
                var sum1=0;
                var cnt1=0;

                for (var i=0;i<N;i++) {
                    var w=N-i;
                    sum1 += pts[index-i][this.name].ma0 * w;
                    cnt1 += w;
                }
                var ma1 = sum1 / cnt1; // wma
                pts[index][this.name].ma1 = ma1;
            },

            mi: function(series, index) {
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:mass_index
                var pts=series.points;
                var pt=pts[index][this.name]={};

                var M=this.options.period0; // SUM period of MI
                var N=this.options.period1; // EMA period of high-low difference

                var high = parseFloat(pts[index].high);
                var low = parseFloat(pts[index].low);
                pt.diff = high-low;

                // Calcuate the moving averages of h-l diff on N period...
                // 1) 1st EMA
                var sN0=N-1, sN1=sN0*2, sM=sN1+M-1;
                if (index===sN0) {
                    if (this.options.method===chartFactory.MA_WMA)
                        this.weightedAvg0(series, index);
                    else
                        this.simpleAvg0(series, index);
                }
                else if (index>sN0) {
                    if (this.options.method===chartFactory.MA_SMA)
                        this.simpleAvg0(series, index);
                    else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                        this.expAvg0(series, index);
                    else
                        this.weightedAvg0(series, index);
                }

                // 2) 2nd EMA
                if (index===sN1) {
                    if (this.options.method===chartFactory.MA_WMA)
                        this.weightedAvg1(series, index);
                    else
                        this.simpleAvg1(series, index);
                }
                else if (index>sN1) {
                    if (this.options.method===chartFactory.MA_SMA)
                        this.simpleAvg1(series, index);
                    else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                        this.expAvg1(series, index);
                    else
                        this.weightedAvg1(series, index);
                }

                // 3) The single-MA/double-MA ratio
                if (index>=sN1) {
                    pt.r=100*pt.ma0/pt.ma1;
                }

                // 4) MI, sum on M period of the single-MA/double-MA ratio
                if (index>=sM) {
                    var mi=0;
                    for (var i=0; i<M; i++)
                        mi += pts[index-i][this.name].r;
                    pt.mi=mi.toFixed(this.options.dp);
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.mi(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= 1)
                    this.mi(series, series.spotCount-1);
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && (pt.mi && !isNaN(pt.mi))) {
                        var value=parseFloat(pt.mi);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined && (pt.mi && !isNaN(pt.mi)))
                    res[this.name]=pt.mi;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && (pt.mi && !isNaN(pt.mi)))
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.mi));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx)
            {
                serObj.period=this.period;
                serObj.color=this.color;
            },

            deserialize: function(serObj, ctx)
            {
                this.period=serObj.period;
                this.color=serObj.color;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // MFIDrawer class
        //========================================

        function MFIDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        MFIDrawer.prototype={
            className: "MFIDrawer",

            mfi: function(series, index) {
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:money_flow_index_mfi
                var pts=series.points;
                pts[index][this.name] = { };

                var N=this.options.period;

                var pt = pts[index];
//                var open = parseFloat(pt.open);
                var close = parseFloat(pt.close);
                var high = parseFloat(pt.high);
                var low = parseFloat(pt.low);
                var volume = parseFloat(pt.volume);

                pt = pt[this.name];
                pt.tp = (high + low + close)/3;

                if (index > 0) {
                    pt.s = pt.tp>pts[index-1][this.name].tp?1:-1; // +ve chg : -ve chg
                    pt.rmf = pt.tp * volume;

                    // Calcuate the moving averages of Money Flow Ratio...
                    if (index >= N) {
                        var sum0=0, sum1=0;
                        for (var i=0;i<N;i++) {
                            var pi = pts[index-i][this.name];
                            if (pi.s > 0)
                                sum0 += pi.rmf; // +ve chg
                            else
                                sum1 += pi.rmf; // -ve chg
                        }

                        var mfi = 100;
                        if (sum1>0) {
                            var mfr = sum0/sum1; // +ve sum / -ve sum
                            mfi = 100 - 100/(1+mfr); // rsi forumla
                        }
                        pt.mfi = mfi.toFixed(this.options.dp);
                    }
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.mfi(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= 1) {
                    var i = series.spotCount-1;
                    this.mfi(series, i);
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.mfi != undefined) {
                        var value=parseFloat(pt.mfi);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined && pt.mfi != undefined)
                    res[this.name]=series.points[index][this.name].mfi;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.mfi != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.mfi));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // ChaikinOscDrawer class
        //========================================

        function ChaikinOscDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=0;

            if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA) {
                var N0 = this.options.period0;
                var N1 = this.options.period1;
                if (this.options.method===chartFactory.MA_EMA) {
                    this.emafactor0 = 2/(N0+1);
                    this.emafactor1 = 2/(N1+1);
                }
                else {
                    this.emafactor0 = 1/N0;
                    this.emafactor1 = 1/N1;
                }
            }

            this.ref_index0 = -1;
            this.ref_ema0 = -1;
            this.ema0 = -1;
            this.ref_index1 = -1;
            this.ref_ema1 = -1;
            this.ema1 = -1;

            this.ctr();
        }

        ChaikinOscDrawer.prototype={
            className: "ChaikinOscDrawer",

            simpleAvg0: function(series, index) {
                var pts=series.points;
                var sum0=0;
                var N0=this.options.period0;
                for (var i=0; i<N0; i++) {
                    sum0 += pts[index-i][this.name].adl;
                }
                var ma0 = sum0 / N0; // sma

                pts[index][this.name].ma0=ma0;
                this.ref_index0=-1;
                this.ema0=ma0;
            },
            expAvg0: function(series, index) {
                if (this.ref_index0 != index-1) {
                    this.ref_index0 = index-1;
                    this.ref_ema0 = this.ema0;
                }
                var pts=series.points;
//                var N0=this.options.period0;
                var adl = pts[index][this.name].adl;
                var ma0 = (adl - this.ref_ema0)*this.emafactor0 + this.ref_ema0; // ema

                pts[index][this.name].ma0=ma0;
                this.ema0=ma0;
            },
            weightedAvg0: function(series, index) {
                var pts=series.points;
                var N0=this.options.period0;
                var sum0=0;
                var cnt0=0;
                for (var i=0; i<N0; i++) {
                    sum0 += pts[index-i][this.name].adl * (N0-i);
                    cnt0 += (N0-i);
                }
                var ma0 = sum0 / cnt0; // wma

                pts[index][this.name].ma0=ma0;
            },

            simpleAvg1: function(series, index) {
                var pts=series.points;
                var sum1=0;
                var N1=this.options.period1;
                for (var i=0; i<N1; i++) {
                    sum1 += pts[index-i][this.name].adl;
                }
                var ma1 = sum1 / N1; // sma

                pts[index][this.name].ma1=ma1;
                this.ref_index1=-1;
                this.ema1=ma1;
            },
            expAvg1: function(series, index) {
                if (this.ref_index1 != index-1) {
                    this.ref_index1 = index-1;
                    this.ref_ema1 = this.ema1;
                }
                var pts=series.points;
//                var N1=this.options.period1;
                var adl = pts[index][this.name].adl;
                var ma1 = (adl - this.ref_ema1)*this.emafactor1 + this.ref_ema1; // ema

                pts[index][this.name].ma1=ma1;
                this.ema1=ma1;
            },
            weightedAvg1: function(series, index) {
                var pts=series.points;
                var N1=this.options.period1;
                var sum1=0;
                var cnt1=0;
                for (var i=0; i<N1; i++) {
                    sum1 += pts[index-i][this.name].adl * (N1-i);
                    cnt1 += (N1-i);
                }
                var ma1 = sum1 / cnt1; // wma

                pts[index][this.name].ma1=ma1;
            },

            co: function(series, index) {
                // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:chaikin_oscillator
                var pts=series.points;
                var pt=pts[index][this.name]={};

                var sN0=this.options.period0-1;
                var sN1=this.options.period1-1;

                var close = parseFloat(pts[index].close);
                var high = parseFloat(pts[index].high);
                var low = parseFloat(pts[index].low);

                var mfm = high!=low ? ((close-low)-(high-close))/(high-low) : 0;
                var mfv = mfm * parseFloat(pts[index].volume);

                var adl = mfv;
                if (index > 0) adl += pts[index-1][this.name].adl;
                pt.adl = adl;

                // Calcuate the moving averages of ADL...
                if (index===sN0) {
                    if (this.options.method===chartFactory.MA_WMA)
                        this.weightedAvg0(series, index);
                    else
                        this.simpleAvg0(series, index);
                }
                else if (index>sN0) {
                    if (this.options.method===chartFactory.MA_SMA)
                        this.simpleAvg0(series, index);
                    else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                        this.expAvg0(series, index);
                    else
                        this.weightedAvg0(series, index);
                }

                if (index===sN1) {
                    if (this.options.method===chartFactory.MA_WMA)
                        this.weightedAvg1(series, index);
                    else
                        this.simpleAvg1(series, index);
                }
                else if (index>sN1) {
                    if (this.options.method===chartFactory.MA_SMA)
                        this.simpleAvg1(series, index);
                    else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                        this.expAvg1(series, index);
                    else
                        this.weightedAvg1(series, index);
                }

                var sN=Math.max(sN0,sN1);
                if (index>=sN) {
                    var ma0=pt.ma0;
                    var ma1=pt.ma1;
                    var co = sN0<sN1 ? (ma0-ma1) : (ma1-ma0);
                    pt.co = co.toFixed(this.options.dp);
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.co(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= 1) {
                    var i=series.spotCount-1;
                    this.co(series, i);
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.co != undefined) {
                        var value=parseFloat(pt.co);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined && pt.co != undefined)
                    res[this.name]=pt.co;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.co != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.co));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // ChaikinVolDrawer class
        //========================================

        function ChaikinVolDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        ChaikinVolDrawer.prototype={
            className: "ChaikinVolDrawer",

            cvol: function(series, index) {
                // Ref: https://wiki.timetotrade.com/Chaikin_Volatility
                // Ref: https://www.scottrade.com/knowledge-center/investment-education/research-analysis/technical-analysis/the-indicators/chaikins-volatility.html
                var pts=series.points;
                var pt=pts[index][this.name]={};
                var N=this.options.period;

                var p=pts[index];
                pt.hl=parseFloat(p.high)-parseFloat(p.low);

                var rema=0;
                if (index>=N-1) {
                    if (index===N-1) {
                        var sum=0;
                        for (var i=0;i<N;i++)
                            sum+=pts[index-i][this.name].hl;
                        rema=sum/N;
                    }
                    else {
                        var factor=2/(N+1);
                        rema=(pt.hl-parseFloat(pts[index-1][this.name].rema))*factor + parseFloat(pts[index-1][this.name].rema);
                    }
                    pt.rema=rema;

                    if (index>=2*N-1) {
                        var phl=pts[index-N][this.name].rema;
                        var cv = (phl===0) ? 0 : (rema-phl)/phl*100;
                        pt.cv=cv.toFixed(this.options.dp);
                    }
                }
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period-1;

//                // Clear any old data, hence avoid drawing in draw()
//                var pts=series.points;
//                for (var i=0;i<sN&&i<pts.length;i++) {
//                    delete pts[i][this.name];
//                }

                for (var i=0;i<series.spotCount;i++)
                    this.cvol(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period) {
                    var i=series.spotCount-1;
                    this.cvol(series, i);
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.cv != undefined)
                    {
                        var value=parseFloat(pt.cv);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined && pt.cv != undefined)
                    res[this.name]=pt.cv;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.cv != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.cv));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // PsychologicalDrawer class
        //========================================

        function PsychologicalDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        PsychologicalDrawer.prototype={
            className: "PsychologicalDrawer",

            psy: function(series, index)
            {
                var pts=series.points;

                var sum=0;
                for (var i=0;i<this.options.period;i++) {
                    var rise=0;
                    if(parseFloat(pts[index-i].close)>parseFloat(pts[index-i-1].close))
                        rise=1;

                    sum+=rise;
                }
                var psy=sum/this.options.period*100;
                pts[index][this.name]=psy.toFixed(this.options.dp);
            },

            dataReady: function(series)
            {
                series=series.compact();
                var sN=this.options.period;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.psy(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period+1) {
                    var i=series.spotCount-1;
                    this.psy(series, i);
                }
            }
        };

        chartFactory.extendClass(PsychologicalDrawer, BaseLineDrawer);

        //========================================
        // TVMADrawer class
        //========================================

        function TVMADrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        TVMADrawer.prototype={
            className: "TVMADrawer",

            tvma: function(series, index) {
                // Ref: http://www.sevendata.co.jp/shihyou/jukyuu/baibaidaikin.html
                // Ref: http://www.kabutatu.jp/wp/wp-content/pdf/shihyou/baibaidaikin.pdf
                var pts=series.points;
                var pt=pts[index];
                var N=this.options.period;

                var cv=parseFloat(pt.close)*parseFloat(pt.volume);
                pt[this.name+"_"]=cv;

                if (index < N-1) {
                    delete pt[this.name];
                }
                else {
                    var sumv=0;
                    var sumcv=0;
                    for (var i=0;i<N;i++) {
                        var p=pts[index-i];
                        sumv+=parseFloat(p.volume);
                        sumcv+=p[this.name+"_"];
                    }

                    if (sumv===0) {
                        delete pt[this.name];
                    }
                    else {
                        var tvma=sumcv/sumv;
                        pt[this.name]=tvma.toFixed(this.options.dp);
                    }
                }
            },

            dataReady: function(series)
            {
                this.options.dp=(series.decimalPlace>2)?series.decimalPlace:2; // set MA calculation that rounds to the series' data dp to avoid losing significancy if the data uses more than 2 dp

                series=series.compact();
                for (var i=0;i<series.spotCount;i++)
                    this.tvma(series, i);
            },

            dataUpdate: function(series)
            {
                series=series.compact();
                if (series.spotCount >= this.options.period) {
                    var i=series.spotCount-1;
                    this.tvma(series, i);
                }
            }
        };

        chartFactory.extendClass(TVMADrawer, BaseLineDrawer);

        //========================================
        // KRIDrawer class
        //========================================

        function KRIDrawer(name, options) {
            // Ref: http://www.investopedia.com/articles/forex/09/kairi-relative-strength-index.asp
            this.name=name;
            this.options=options;
            this.options.dp=2;

            if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA) {
                var N=this.options.period;
                if (this.options.method===chartFactory.MA_EMA) {
                    this.emafactor = 2/(N+1);
                }
                else {
                    this.emafactor = 1/N;
                }
            }

            this.ref_index = -1;
            this.ref_ema = -1;
            this.ema = -1;

            this.ctr();
        }

        KRIDrawer.prototype={
            className: "KRIDrawer",

            simpleAvg: function(series, index) {
                var pts=series.points;
                var sum = 0;
                var N=this.options.period;
                var co = this.options.coefficient;
                for (var i=0;i<N;i++) {
                    sum += parseFloat(pts[index-i][co]);
                }
                var ma = sum / N; // sma

                var kri = (pts[index][co] - ma) * 100 / ma; // kri = (close - ma(close,n)) / ma(close,n)
                pts[index][this.name] = {
                    ma: ma,
                    kri: kri.toFixed(this.options.dp)
                };
                this.ref_index= -1;
                this.ema = ma;
            },

            expAvg: function(series, index) {
                if (this.ref_index != index-1) {
                    this.ref_index = index-1;
                    this.ref_ema = this.ema;
                }
                var pts=series.points;
                var co = this.options.coefficient;
                var ma = (parseFloat(pts[index][co]) - this.ref_ema)*this.emafactor + this.ref_ema; // ema

                var kri = (pts[index][co] - ma) * 100 / ma; // kri = (close - ma(close,n)) / ma(close,n)
                pts[index][this.name] = {
                    ma: ma,
                    kri: kri.toFixed(this.options.dp)
                };
                this.ema = ma;
            },

            weightedAvg: function(series, index) {
                var pts=series.points;
                var N=this.options.period;
                var sum = 0;
                var cnt = 0;
                var co = this.options.coefficient;
                for (var i=0;i<N;i++) {
                    sum += parseFloat(pts[index-i][co]) * (N-i);
                    cnt += (N-i);
                }
                var ma = sum / cnt; // wma

                var kri = (pts[index][co] - ma) * 100 / ma; // kri = (close - ma(close,n)) / ma(close,n)
                pts[index][this.name] = {
                    ma: ma,
                    kri: kri.toFixed(this.options.dp)
                };
            },

            dataReady: function(series) {
                series=series.compact();
                var sN=this.options.period;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                if (series.spotCount >= sN) {
                    // First moving average
                    if (this.options.method===chartFactory.MA_WMA)
                        this.weightedAvg(series, sN-1);
                    else
                        this.simpleAvg(series, sN-1);

                    // Subsequent moving averages
                    for (var i=sN;i<series.spotCount;i++) {
                        if (this.options.method===chartFactory.MA_SMA)
                            this.simpleAvg(series, i);
                        else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                            this.expAvg(series, i);
                        else
                            this.weightedAvg(series, i);
                    }
                }
            },

            dataUpdate: function(series) {
                series=series.compact();
                var N=this.options.period;
                if (series.spotCount >= N) {
                    var i = series.spotCount-1;

                    // First moving average
                    if (series.spotCount===N) {
                        if (this.options.method===chartFactory.MA_WMA)
                            this.weightedAvg(series, i);
                        else
                            this.simpleAvg(series, i);
                    }
                    // Subsequent moving average
                    else {
                        if (this.options.method===chartFactory.MA_SMA)
                            this.simpleAvg(series, i);
                        else if (this.options.method===chartFactory.MA_EMA || this.options.method===chartFactory.MA_MEMA)
                            this.expAvg(series, i);
                        else
                            this.weightedAvg(series, i);
                    }
                }
            },

            require: function(series)
            {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res)
            {
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        var value=parseFloat(pt.kri);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                var pt=series.points[index][this.name];
                if (pt != undefined)
                    res[this.name]=pt.kri;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
            {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++)
                {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.kri));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // SHIDrawer class
        //========================================

        function SHIDrawer(name, options) {
            // Ref: http://www.kabudream.com/technical/shinohara.html
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        SHIDrawer.prototype={
            className: "SHIDrawer",

            shi: function(series, index) {
                var pts=series.points;
                var N=this.options.period;
                var sumSE=0,sumWE=0; // Ratio A = Strong Energy (SE) / Week Energy (WE)
                var sumSP=0,sumWP=0; // Ratio B = Strong Popularity (SP) / Week Popularity (WP)
                for (var i=0;i<N;i++) {
                    var pt=pts[index-i];
                    var open=pt.open;
                    var high=pt.high;
                    var low=pt.low;
                    var prev=pts[index-i-1].close;
                    sumSE += high-open;
                    sumWE += open-low;
                    sumSP += high-prev;
                    sumWP += prev-low;
                }
                var a=sumSE*100/sumWE;
                var b=sumSP*100/sumWP;
                pts[index][this.name] = {
                    a: a.toFixed(this.options.dp),
                    b: b.toFixed(this.options.dp)
                };
            },

            dataReady: function(series) {
                series=series.compact();
                var sN=this.options.period;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.shi(series, i);
            },

            dataUpdate: function(series) {
                series=series.compact();
                var N=this.options.period;
                if (series.spotCount >= N+1) {
                    this.shi(series, series.spotCount-1);
                }
            },

            require: function(series) {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res) {
//                var N=this.options.period;
//                if (startIndex<N+1)
//                    startIndex=N;
//                if (endIndex >= series.spotCount)
//                    endIndex=series.spotCount-1;

                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        var a=parseFloat(pt.a);
                        var b=parseFloat(pt.b);
                        var max,min;
                        if (a>b) { max=a; min=b; } else { max=b; min=a; }
                        if (res.min==undefined || min<res.min)
                            res.min=min;
                        if (res.max==undefined || max>res.max)
                            res.max=max;
                    }
                }
            },

            tooltip: function(series, index, res) {
                if (index >= this.options.period && index < series.spotCount)
                    res[this.name]=series.points[index][this.name];
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res) { },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx) {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.a));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thicknessA;
                ctx.strokeStyle=this.options.colorA;
                this.options.styleA=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                left=-1
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.b));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thicknessB;
                ctx.strokeStyle=this.options.colorB;
                this.options.styleB=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx) {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx) {
                this.options=serObj.options;
            },

            ctr: function() { }
        };

        //========================================
        // FIBDrawer class
        //========================================

        function FIBDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        FIBDrawer.prototype={
            className: "FIBDrawer",

            fib: function(series, startIndex, endIndex) {
                var pts=series.points;

                var range={};
                this.rangeY(series, startIndex, endIndex, range);

                var Y0,Y1,Y2,Y3,Y4;
                var d=range.max-range.min;
                if (d>0) {
                    Y0=range.min+d*0.764;
                    Y1=range.min+d*0.618;
                    Y2=range.min+d*0.5;
                    Y3=range.min+d*0.382;
                    Y4=range.min+d*0.236;
                }
                else {
                    Y0=parseFloat(pts[startIndex].close);
                    Y1=Y0; Y2=Y0; Y3=Y0; Y4=Y0;
                }

                var fib={
                    y0: Y0.toFixed(this.options.dp),
                    y1: Y1.toFixed(this.options.dp),
                    y2: Y2.toFixed(this.options.dp),
                    y3: Y3.toFixed(this.options.dp),
                    y4: Y4.toFixed(this.options.dp)
                };
                pts[0][this.name]=fib;
                //pts[endIndex][this.name]=fib;
                for (var i=startIndex; i<=endIndex; i++)
                    pts[i][this.name]=fib;
            },

            dataReady: function(series) { }, // do LRT calculation at draw, since LRT depends on the display range

            dataUpdate: function(series) { }, // do LRT calculation at draw, since LRT depends on the display range

            require: function(series) { return false; },

            rangeY: function(series, startIndex, endIndex, res) {
                var pts=series.points;
                var pt,min,max;
                for (var X=startIndex; X<=endIndex; X++) {
                    pt=pts[X].close;
                    if (pt != undefined) {
                        Y=parseFloat(pt);
                        if (min == undefined) {
                            min=Y;
                            max=Y;
                        }
                        else if (Y<min) min=Y;
                        else if (Y>max) max=Y;
                    }
                }
                if (res.min==undefined || min<res.min) res.min=min;
                if (res.max==undefined || max>res.max) res.max=max;
            },

            tooltip: function(series, index, res) {
                res[this.name] = series.points[0][this.name];
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res) { },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx) {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                this.fib(series, startIndex, endIndex); // do the TA calculation here, rather than at dateReady() and dataUpdate(), since FIB depends on the actual range of display - i.e. needs start/end index

                var x0=axisX.toScreen(startIndex);
                var x1=axisX.toScreen(endIndex);
                var key,y;
                for (var i=0; i<5; i++) {
                    ctx.beginPath();
                    key="y"+i;
                    y=axisY.toScreen(parseFloat(series.points[0][this.name][key]));
                    ctx.moveTo(x0,y);
                    ctx.lineTo(x1,y);
                    ctx.lineWidth=this.options[key].thickness;
                    ctx.strokeStyle=this.options[key].color;
                    this.options[key].style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                    ctx.stroke();
                }
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        //========================================
        // VRDrawer class
        //========================================

        function VRDrawer(name, options)
        {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        VRDrawer.prototype={
            className: "VRDrawer",

            vr: function(series, index) {
                // Ref: http://www.investopedia.com/university/marketbreadth/marketbreadth1.asp
                var pts=series.points;
                var N=this.options.period;
                var pt;
                var sumU=0,sumN=0,sumD=0,sumV=0;
                for (var i=0;i<N;i++) {
                    pt=pts[index-i];
                    sumV+=pt.volume;
                    if (pt.close>pt.open)
                        sumU+=pt.volume;
                    else if (pt.close<pt.open)
                        sumD+=pt.volume;
                    else
                        sumN+=pt.volume;
                }
//                var vr=(sumU + sumN/2)*100 / sumV;
                var vr=sumU/sumD;
                pts[index][this.name] = vr.toFixed(this.options.dp);
            },

            dataReady: function(series) {
                series=series.compact();
                var sN=this.options.period-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.vr(series, i);
            },

            dataUpdate: function(series) {
                series=series.compact();
                var N=this.options.period;
                if (series.spotCount>=N)
                    this.vr(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(VRDrawer, BaseLineDrawer);

        //========================================
        // VWAPDrawer class
        //========================================

        function VWAPDrawer(name, options) {
            // Ref: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:vwap_intraday
            // Ref: https://www.tradingview.com/stock-charts-support/index.php/Volume_Weighted_Average_Price_(VWAP)
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        VWAPDrawer.prototype={
            className: "VWAPDrawer",

            tpv: function(series, index) {
                var pts=series.points;
                var pt=pts[index];
                var TPV=pt.volume*(pt.high+pt.low+pt.close)/3;
//                var TPV=pt.turnover;
                pt[this.name]={
                    TPV: TPV
                };
            },

            vwap: function(series, startIndex, endIndex) {
                var pts=series.points;
                var pt;
                var TPVSUM=0,VSUM=0;
                var VWAP;
                for (var i=startIndex;i<=endIndex;i++) {
                    pt=pts[i];
                    VSUM+=pt.volume;
                    if (VSUM > 0) {
                        TPVSUM+=pt[this.name].TPV;
                        VWAP=TPVSUM/VSUM;
                        pt[this.name].VWAP=VWAP.toFixed(this.options.dp);
                    }
                    else {
                        delete pt[this.name].VWAP;
                    }
                }
            },

            calculateIntradayVWAP: function(series) {
//                // VWAP is basically for intraday chart, and the data is calculated on a day boundary
//                if (series.type===chartFactory.MTS_DATA) {
                    // Find day boundary and start the VWAP calculation until the next day boundary
                    var pts=series.points;
                    var pt;
                    var startidx=0, endidx=-1;
                    var curpt=pts[0];

                    var ses1 = series.info.ses["1"];
                    var ses2 = series.info.ses["2"];
                    var _haslunchbreak = (ses2 !== undefined); // meaning there are 2 sessions
                    var ses_fr = ses1.fr;
                    var ses_to = _haslunchbreak ? ses2.to : ses1.to;
                    var _overnightses = 0;
                    if (ses1.fr > ses1.to) _overnightses = 1;
                    else if (ses2 && (ses2.fr > ses2.to)) _overnightses = 2;

                    var cutoff = new Date(curpt.date);
                    if (_overnightses == 0 || cutoff.toString("HH:mm") > ses_fr) cutoff.addDays(1);
                    if (cutoff.getDay()===Date.SAT) cutoff.addDays(2);
                    cutoff.setHours(ses_fr.substring(0,2));
                    cutoff.setMinutes(ses_fr.substring(3,5));

                    for (var i=1; i<series.spotCount; i++) {
                        pt=pts[i];
                        if (pt.date.compareTo(cutoff) >= 0) {
                            // Rolling over to next *trade* day, split here and do a round of calculation...
                            endidx=i-1;
                            this.vwap(series, startidx, endidx);

                            // Prepare for the next day
                            startidx=i;

                            cutoff=new Date(pt.date);
                            if (_overnightses == 0 || cutoff.toString("HH:mm") > ses_fr) cutoff.addDays(1);
                            if (cutoff.getDay()===Date.SAT) cutoff.addDays(2);
                            cutoff.setHours(ses_fr.substring(0,2));
                            cutoff.setMinutes(ses_fr.substring(3,5));
                        }
                    }
                    if (startidx>endidx) {
                        // Finally for the current day
                        endidx=series.spotCount-1;
                        this.vwap(series, startidx, endidx);
                    }
//                }
            },

            dataReady: function(series) {
                var _type=series.type, _info=series.info;
                series=series.compact(); series.type=_type; series.info=_info;

                for (var i=0;i<series.spotCount;i++)
                    this.tpv(series, i);

                // Calculate the intraday VWAP, i.e. the *real* meat is here~~
                if (_type===chartFactory.MTS_DATA) this.calculateIntradayVWAP(series);
            },

            dataUpdate: function(series) {
                var _type=series.type, _info=series.info;
                series=series.compact(); series.type=_type; series.info=_info;

                if (series.spotCount > 0)
                    this.tpv(series, series.spotCount-1);

                // Calculate the intraday VWAP, i.e. the *real* meat is here~~
                // @TODO A better implementation will just calculate the VWAP of the latest datapoint, or just for the affected day...
                //       Here, as a quick solution, simply re-calculate all data points to save the trouble
                if (_type===chartFactory.MTS_DATA) this.calculateIntradayVWAP(series);
            },

            require: function(series) {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res) {
                // Calculate VWAP now for historical chart, i.e. only specifically calculate the VWAP for the visible date range
                if (series.type===chartFactory.HTS_DATA)
                    this.vwap(series, startIndex, endIndex);

                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined) {
                        var value=parseFloat(pt.VWAP);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res) {
                var pt=series.points[index][this.name];
                if (pt != undefined)
                    res[this.name]=pt.VWAP;
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res) { },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx) {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;
                var left=-1;

                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i][this.name];
                    if (pt != undefined && pt.VWAP != undefined)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt.VWAP));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thickness;
                ctx.strokeStyle=this.options.color;
                this.options.style=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx) {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx) {
                this.options=serObj.options;
            },

            ctr: function() { }
        };

        //========================================
        // MarginDrawer class
        //========================================

        function MarginDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=0;

            this.ctr();
        }

        MarginDrawer.prototype={
            className: "MarginDrawer",

            dataReady: function(series) { },

            dataUpdate: function(series) { },

            require: function(series) {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res) {
                if (endIndex >= series.spotCount)
                    endIndex=series.spotCount-1;

                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i];
                    var value=Math.max(pt.mb, pt.ms);
                    if (res.max==undefined || value>res.max)
                        res.max=value;
                }
                if (res.max<0) res.max=0;
                if (res.min==undefined || res.min<0) res.min=0;
            },

            tooltip: function(series, index, res) {
                if (index < series.spotCount) {
                    var pt=series.points[index];
                    res.mb=pt.mb;
                    res.ms=pt.ms;
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res) { },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx) {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                var left=-1;
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i].mb;
                    if (pt != undefined && pt >= 0)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thicknessB;
                ctx.strokeStyle=this.options.colorB;
                this.options.styleB=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();

                left=-1
                ctx.beginPath();
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i].ms;
                    if (pt != undefined && pt >= 0)
                    {
                        var x=axisX.toScreen(i);
                        var y=axisY.toScreen(parseFloat(pt));
                        if (left===-1)
                        {
                            ctx.moveTo(x,y);
                            left=i;
                        }
                        else
                            ctx.lineTo(x,y);
                    }
                }
                ctx.lineWidth=this.options.thicknessS;
                ctx.strokeStyle=this.options.colorS;
                this.options.styleS=='d'?chartFactory.setCTXLineDash(ctx):chartFactory.unsetCTXLineDash(ctx);
                ctx.stroke();
            },

            serialize: function(serObj, ctx) {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx) {
                this.options=serObj.options;
            },

            ctr: function() { }
        };

        //========================================
        // RCDrawer class
        //========================================

        function RCDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        RCDrawer.prototype={
            className: "RCDrawer",

            rc: function(series, index) {
                var pts=series.points;
                var N=this.options.period;
                var bpt = pts[index-N];
                var pt = pts[index];
                var T = (bpt.idx) ? bpt.close/bpt.idx : 0;
                var B = (pt.idx)  ?  pt.close/pt.idx  : 0;
                var rc;
                if (T!=0 && B!=0) {
                    rc=T*100/B;
                    pt[this.name]=rc.toFixed(this.options.dp);
                }
                else {
                    pt[this.name]=pts[index-1][this.name];
                }
            },

            dataReady: function(series) {
                series=series.compact();
                var sN=this.options.period;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                for (var i=sN;i<series.spotCount;i++)
                    this.rc(series, i);
            },

            dataUpdate: function(series) {
                series=series.compact();
                var N=this.options.period;
                if (series.spotCount > N) {
                    this.rc(series, series.spotCount-1);
                }
            }
        };

        chartFactory.extendClass(RCDrawer, BaseLineDrawer);

        //========================================
        // TPDrawer class
        //========================================

        function TPDrawer(name, options)
        {
            this.name=name;
            this.options=options;

            this.ctr();
        }

        TPDrawer.prototype={
            className: "TPDrawer",

            tp: function(series, index) {
                var pts=series.points;
                var N=this.options.period;

                var turnH=-1,turnL=-1;
                var pt=pts[index];
                var thisH=pt.high, thisL=pt.low;
                for (var i=index-N; i<=index+N; i++) {
                    if (i!==index) {
                        pt=pts[i];
                        if (turnH!=0 && thisH>pt.high) {
                            // Still a high turning point
                            turnH=1;
                        }
                        else {
                            turnH=0;
                        }
                        if (turnL!=0 && thisL<pt.low) {
                            // Still a low turning point
                            turnL=1;
                        }
                        else {
                            turnL=0;
                        }
                    }
                }

                var tp=0;
                if (turnH===1) tp=1;
                else if (turnL===1) tp=-1;
                pts[index][this.name]=tp;
            },

            dataReady: function(series) {
                series=series.compact();
                var N=this.options.period;
                var mincnt=N*2+1;
                var pts=series.points;
                for (var i=0;i<series.spotCount&&i<mincnt;i++)
                    delete pts[i][this.name]; // clear any old data first

                if (series.spotCount>=mincnt)
                    for (var i=N;i<series.spotCount-N;i++)
                        this.tp(series, i);
            },

            dataUpdate: function(series) {
                series=series.compact();
                var N=this.options.period;
                var mincnt=N*2+1;
                if (series.spotCount>=mincnt)
                    this.tp(series, series.spotCount-N-1);
            },

            require: function(series) {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res) {
                var tp, hasUpTP, hasDownTP, value;
                for (var i=startIndex;i<=endIndex;i++) {
                    tp=series.points[i][this.name];
                    if (tp != undefined) {
                        if (tp>0)
                            hasUpTP=true;
                        else if (tp<0)
                            hasDownTP=true;

                        value=series.points[i].close;
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }

                if (hasUpTP || hasDownTP) {
                    var mgn=(res.max-res.min)*0.1;
                    if (hasUpTP) res.max+=mgn;
                    if (hasDownTP) res.min-=mgn;
                }
            },

            tooltip: function(series, index, res) {
                var pt=series.points[index];
                var tp=pt[this.name];
                if (tp!=undefined && tp!==0) {
                    res[this.name]={
                        tp: tp,
                        date: pt.date,
                        value: (tp>0)?pt.high:pt.low
                    }
                }
                else {
                    res[this.name]={
                        tp: 0
                    }
                }
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res) {
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx) {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                var tph=24;
                ctx.beginPath();
                ctx.fillStyle=this.options.color;
                ctx.font="10px sans-serif";
                ctx.textBaseline="middle";
                ctx.textAlign="center";

                var pt,x,y1,y2,tp,value;
                for (var i=startIndex;i<=endIndex;i++) {
                    tp=series.points[i][this.name];
                    if (tp!=undefined && tp!==0) {
                        x=axisX.toScreen(i);
                        pt=series.points[i];
                        if (axisY.flip) {
                            if (tp>0) {
                                y1=axisY.toScreen(pt.high)+tph;
                                y2=y1-12;
                                value=pt.high;
                            }
                            else if (tp<0) {
                                y1=axisY.toScreen(pt.low)-tph+12;
                                y2=y1-12;
                                value=pt.low;
                            }
                        }
                        else {
                            if (tp>0) {
                                y1=axisY.toScreen(pt.high)-tph;
                                y2=y1+12;
                                value=pt.high;
                            }
                            else if (tp<0) {
                                y1=axisY.toScreen(pt.low)+tph-12;
                                y2=y1+12;
                                value=pt.low;
                            }
                        }
                        ctx.fillText(pt.date.toString(series.type==chartFactory.HTS_DATA?"MM/dd":"MM/dd HH:mm"), x, y1);
                        ctx.fillText(value, x, y2);
                    }
                }
            },

            serialize: function(serObj, ctx) {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx) {
                this.options=serObj.options;
            },

            ctr: function() {
            }
        };

        //========================================
        // UPDWDrawer class
        //========================================

        function UPDWDrawer(name, options) {
            this.name=name;
            this.options=options;
            this.options.dp=2;

            this.ctr();
        }

        UPDWDrawer.prototype={
            className: "UPDWDrawer",

            updw: function(series, index) {
                var pts=series.points;
                if (pts[index].adv >= 0) {
                    var tadv=0,tdec=0;
                    var N=this.options.period;

                    var adv,dec;
                    for (var i=index-N+1; i<=index; i++) {
                        // If -1 (meaning no such data point), then we shall also skip this point
                        adv=pts[i].adv; if (adv>0) tadv+=adv;
                        dec=pts[i].dec; if (dec>0) tdec+=dec;
                    }
                    pts[index][this.name]=(tadv*100/tdec).toFixed(this.options.dp);
                }
                else {
                    // Set this as null, meaning no such data point... which will be skipped in the drawing
                    pts[index][this.name]=null;
                }
            },

            dataReady: function(series) {
                series=series.compact();
                var sN=this.options.period-1;

                // Clear any old data, hence avoid drawing in draw()
                var pts=series.points;
                for (var i=0;i<sN&&i<pts.length;i++) {
                    delete pts[i][this.name];
                }

                if (series.spotCount>sN) {
                    for (var i=sN;i<series.spotCount;i++)
                        this.updw(series, i);
                }
            },

            dataUpdate: function(series) {
                series=series.compact();
                var N=this.options.period;
                if (series.spotCount>N-1)
                    this.updw(series, series.spotCount-1);
            }
        };

        chartFactory.extendClass(UPDWDrawer, BaseLineDrawer);

        //========================================
        // PRRDrawer class
        //========================================

        function PRRDrawer(name, options) {
            // Ref: ???
            this.name=name;
            this.options=options;

            this.sheet={};  // Worksheet for the price zones
            this.ctr();
        }

        PRRDrawer.prototype={
            className: "PRRDrawer",

            dataReady: function(series) {
                this.clearSheet();
            },

            dataUpdate: function(series) {
                this.clearSheet();
            },

            require: function(series) {
                return false;
            },

            rangeY: function(series, startIndex, endIndex, res) {
                for (var i=startIndex; i<=endIndex; i++) {
                    var pt=series.points[i].close;
                    if (pt != undefined) {
                        var value=parseFloat(pt);
                        if (res.min==undefined || value<res.min)
                            res.min=value;
                        if (res.max==undefined || value>res.max)
                            res.max=value;
                    }
                }
            },

            tooltip: function(series, index, res)
            {
                res[this.name]=null; // just return null as a placeholder for tooltip
            },

            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
            {
            },

            clearSheet: function()
            {
                this.sheet.startIndex= -1;
                this.sheet.endIndex= -1;
            },

            genPriceZones: function(series, startIndex, endIndex, axisY)
            {
                // In case if the range was not changed, just return here, no need to re-calculate ;)
                if (this.sheet.startIndex==startIndex && this.sheet.endIndex==endIndex) return;

                // Find the up/down volumes for each price value
                var zones={};
                var prev;
                for (var i=startIndex;i<=endIndex;i++) {
                    var pt=series.points[i];
                    if (pt.close != undefined && pt.volume != undefined) {
                        var close=parseFloat(pt.close);
                        var volume=parseFloat(pt.volume);

                        var key=""+close;
                        var zone=zones[key];
                        if (!zone) {
                            zone={close:close,upVol:0,downVol:0};
                            zones[key]=zone;
                        }

                        if (prev==undefined || close >= prev)
                            zone.upVol += volume;
                        else
                            zone.downVol += volume;
                        prev=close;
                    }
                }

                var maxVol=0;
                $.each(zones, function(key, zone) {
                    var totVol=zone.upVol + zone.downVol;
                    if (totVol > maxVol)
                        maxVol=totVol;
                });

                this.sheet.startIndex=startIndex;
                this.sheet.endIndex=endIndex;
                this.sheet.maxVol=maxVol;
                this.sheet.zones=zones;
            },

            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx) {
                var startIndex=axisX.startIndexEx;
                var endIndex=axisX.endIndexEx;

                this.genPriceZones(series, startIndex, endIndex, axisY);

                var maxVol=this.sheet.maxVol;
                if (maxVol==0) return;

                var w=axisX.width * this.options.pctWidth;

                var zones=this.sheet.zones;
                var options=this.options;
                $.each(zones, function(key, zone) {
                    var y=axisY.toScreen(zone.close);
                    var x0=(zone.upVol / maxVol * w)|0;
                    var x1=((zone.upVol + zone.downVol) / maxVol * w)|0;

                    ctx.fillStyle=options.upColor;   ctx.fillRect(0, y, x0, 1);
                    ctx.fillStyle=options.downColor; ctx.fillRect(x0, y, x1-x0, 1);
                });
            },

            serialize: function(serObj, ctx)
            {
                serObj.options=this.options;
            },

            deserialize: function(serObj, ctx)
            {
                this.options=serObj.options;
            },

            ctr: function()
            {
            }
        };

        /******************************************************************************/

//        //========================================
//        // TradeDrawer class
//        //========================================
//
//        function TradeDrawer(name)
//        {
//            this.name=name;
//            this.ctr();
//        }
//
//        TradeDrawer.prototype={
//            className: "TradeDrawer",
//
//            dataReady: function(series)
//            {
//            },
//
//            dataUpdate: function(series)
//            {
//            },
//
//            require: function(series)
//            {
//                return false;
//            },
//
//            rangeY: function(series, startIndex, endIndex, res)
//            {
//            },
//
//            tooltip: function(series, index, res)
//            {
//            },
//
//            tradeHint: function(series, index, crosshairY, axisX, axisY, res)
//            {
//                res.incident_trade=axisY.fromScreen(crosshairY).toFixed(series.decimalPlace);
//            },
//
//            draw: function(series, crosshairX, crosshairY, axisX, axisY, ctx)
//            {
//            },
//
//            serialize: function(serObj, ctx)
//            {
//            },
//
//            deserialize: function(serObj, ctx)
//            {
//            },
//
//            ctr: function()
//            {
//            }
//        };

        // Finally, the chartFactory.create() method returns a new instance of ChartFrame ;)
        return new ChartFrame(options);
    }
};
