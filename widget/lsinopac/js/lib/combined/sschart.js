////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015, LabCI Limited
// jquery.ui.sschart.js...
// -----------------------------------------------------------------------------
// Uses:
//   widget/utils.js
//Constants
var MODE_VIEW = 0;
var MODE_DRAW = 1;
var MODE_SELECT = 2;
var MODE_ZOOM = 3;
var MODE_REMOVE = 4;
var MODE_ANNO = 5;
var MODE_COPY = 6;

//Config serlet paths
var tsrendererURL = "/sschart/render_ta?";
var rendererSerletURL = "/sschart/render_ta?";
var rendererServletMarginURL = "/sschart/render_margin?";
var errorImgURL = "/sschart/cna.png?";
var canvasImgURL = "/sschart/chart_img.gif?";
var printChartURL = "/chart/stockchartpdf?";
var pointPath = "/lsinopac/images/sschart/point.png";
var blankImg = "/lsinopac/images/sschart/space.gif";
var monthmap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//  Line Drawing variables
var tsheight = 50;
var tsmargin = 0;

//var _IS_MSIE_8 = $("html").hasClass("ie8");

(function ($) {

    var otherTAInfo = "";
    var otherTAInfoHeight = 80;

    //    var xList;
    //    var taParams = [];

    $.widget("ui.sschart", {
        mode: MODE_VIEW,
        //list of default options
        options: {
            ta: "",
            period: "MONTH_3",
            span: "DAILY",
            //code:".HSI",
            instrument: "",
            type: "CANDLE_STICK",
            caption: "",
            rp: "false",
            imageOnly: "false",
            dp: -1, //default =-1, uses default awt property value
            brand: "",
            trend: false
        },
        _create: function () {
            this.createCanvas();
        },
        reload: function () {
            this.createCanvas();
        },
        destroy: function () {
            this.element.next().remove();
        },
        _setOption: function (option, value) {
            this.element.empty();
            this.element.unbind();
            $.Widget.prototype._setOption.apply(this, arguments);
        },
        setTrend: function (trend) {
            this.options.trend = trend;
        },
//        setMultiOption: function( value ) {
        setMultiOption: function (value, keepTrend) {
            if (value != undefined) {
                var valuePairsArray = value.split("|");
                for (var i = 0; i < valuePairsArray.length; i++) {
                    var valuePair = valuePairsArray[i].split(":");
                    this._setOption(valuePair[0], valuePair[1]);
                }

                if (!keepTrend) {
                    this.lineArr = [];
                    this.lineid = 0;
                    this.annoArr = [];
                    this.annoid = 0;
                }

                this.createCanvas();
            }
        },
        setMode: function (value) {
            if (value != undefined) {
                if (value == MODE_VIEW || value == MODE_DRAW || value == MODE_SELECT || value == MODE_ZOOM || value == MODE_REMOVE || value == MODE_ANNO || value == MODE_COPY)
                    this.mode = value;
                else
                    this.mode = MODE_VIEW;

                if (this.mode != MODE_VIEW) {
                    this.element.find("#chartContainer #crosshair").detach();
                    this.element.find("#chartContainer #crosshairHorizontal2").detach();
                    this.element.find("#chartContainer #positionTagHorizontal2").detach();
                    this.element.find("#chartContainer #positionTagVertical").detach();
                    this.element.find("#chartContainer #point").detach();
                }
            }
        },
        triggerZoomToCustom: function (value) {
            this._trigger('onZoomToCustom', null, value);
        },
        triggerCrossHairValue: function (value) {
            this._trigger('onCrossHairMove', null, value);
        },
        triggerTAValue: function (value) {
            this._trigger('onTAValueChange', null, value);
        },
        triggerChange: function (value) {
            this._trigger('onChange', null, value);
        },
        createTSCanvas: function (json) {
            var options = this.options;
            var that = this;
            var ele = this.element;
            var code = options.code;
            var instrument = options.instrument;

            //    var hashId = options.hashId;
            var channel = options.channel;
            //    var region = options.region;
            var token = options.token;

            var width = ele.width();
            var tsurl = tsrendererURL +
                    "width=" + (width - tsmargin * 2) +
                    "&height=" + tsheight +
                    "&ta=&instrument=" + instrument +
                    "&span=DAILY" +
                    "&period=YEAR_2" +
                    "&code=" + code +
                    "&type=LINE" +
                    "&imageOnly=false" +
                    "&theme=theme-panel-white" +
                    "&axis=false" +
                    //        "&hashId=" + hashId +
                   // "&channel=" + channel +
                    //        "&region=" + region +
                    "&token=" + token;

            $(that).loaddata("tschartdata", tsurl, {}, function (result) {
                that._tsChartCallbackHandler(result.data);
            },
                    0,
                    {
                        datatype: "jsonp"
                    });
        },
        createCanvas: function () {
            var that = this;
            var options = this.options;
            var code = options.code;
            var ele = this.element;
            var sschartImg;
 
            if (code == "" || code == undefined || code == null || code == "null") {
                //when ric request is empty string, append the blankImg and bypass all servlet request
                this.element.find("#crosshair").remove();
                this.element.find("#chartContainer div").remove();
                this.xList = [];
                this.tsxList = [];
                sschartImg = $("<img id='chart'/>");
                $(sschartImg).attr("src", LabCI.SSDLConf.DATA_PATH + blankImg);
                ele.append(sschartImg);
            } else {
                // These labels should be app language sensitive...
                this._TALABELS = _taLabels;
                this._TANAMES = _taNames;
                this._TANAMESSHORT = _taNamesShort;

                this.taSignatures = {};
                this.taSignaturesMap = {};
                otherTAInfo = "";
                otherTAInfoHeight = 80;
                var ts = new Date().getTime();
                ele.empty();

                var ta = options.ta;
                var span = options.span;
                var type = options.type;
                var caption = options.caption;
                var imageOnly = options.imageOnly;
                var period = options.period;
                var instrument = options.instrument;
                var assettype = options.assettype;
                var cc = options.cc;
                var height = ele.height() - (options.trend ? tsheight : 0);
                var width = ele.width();

                //        var hashId = options.hashId;
                var channel = options.channel;
                //        var region = options.region;
                var token = options.token;

                var url = rendererSerletURL +
                        "width=" + width +
                        "&height=" + height +
                        "&ta=" + ta +
                        "&span=" + span +
                        "&code=" + code +
                        "&instrument=" + instrument +
                        "&type=" + type +
                        "&caption=" + caption +
                        "&ts=" + ts +
                        "&imageOnly=" + imageOnly +
                        "&dp=" + options.dp +
                        "&element=" + this.element.attr("id") +
                        "&assettype=" + assettype +
                        "&cc=" + cc +
                        //        "&hashId=" + hashId +
                        "&channel=" + channel +
                        //         "&region=" + region +
                        "&token=" + token;

                if (period.indexOf("CUSTOM_INTRADAY") == 0) {
                    url += "&period=CUSTOM_INTRADAY&from=" + period.split(",")[1].split("-")[0] + "&to=" + period.split(",")[1].split("-")[1];
                } else if (period.indexOf("CUSTOM") == 0) {
                    url += "&period=CUSTOM&from=" + period.split(",")[1].split("-")[0] + "&to=" + period.split(",")[1].split("-")[1];
                } else {
                    url += "&period=" + period;
                }
                url += "&lang=" + LabCI.getLang();
                if ((width != 0) && (height != 0)) {
                    $(that).loaddata("tachartdata", url, {}, function (result) {
                        that._taChartCallbackHandler(result.data);
                        if (options.trend)
                            that.createTSCanvas();
                    },
                            0,
                            {
                                datatype: "jsonp"
                            });
                }
            }
        },
        print: function () {
            var that = this;
            var options = this.options;
            var code = options.code;
            if (code == "" || code == undefined || code == null || code == "null") {
            } else {
                var ts = new Date().getTime();
                var ta = options.ta;
                var span = options.span;
                var type = options.type;
                var caption = options.caption;
                var period = options.period;
                var instrument = options.instrument;
                var assettype = options.assettype;
                var cc = options.cc;
                var brand = options.brand;

                //        var hashId = options.hashId;
                var channel = options.channel;
                //        var region = options.region;
                var token = options.token;


                var url = printChartURL +
                        "ta=" + ta +
                        "&span=" + span +
                        "&code=" + code +
                        "&instrument=" + instrument +
                        "&type=" + type +
                        "&caption=" + caption +
                        "&ts=" + ts +
                        "&dp=" + options.dp +
                        "&element=" + this.element.attr("id") +
                        "&assettype=" + assettype +
                        "&cc=" + cc +
                        "&brand=" + brand;
                if (period.indexOf("CUSTOM_INTRADAY") == 0) {
                    url += "&period=CUSTOM_INTRADAY&from=" + period.split(",")[1].split("-")[0] + "&to=" + period.split(",")[1].split("-")[1];
                } else if (period.indexOf("CUSTOM") == 0) {
                    url += "&period=CUSTOM&from=" + period.split(",")[1].split("-")[0] + "&to=" + period.split(",")[1].split("-")[1];
                } else {
                    url += "&period=" + period;
                }
                url += "&theme=theme-white&lang=" + LabCI.getLang();


                window.open(url);
            }
        },
        _taChartCallbackHandler: function (json) {
            //Handle all updates from the returned json
            var that = this;
            var colors = [];
            otherTAInfo = "";
            otherTAInfoHeight = 80;
            var options = this.options;
            var ele = this.element;
            ele.empty();
            var ts = new Date().getTime();
            var sschartImg;
            var ta = options.ta;
            var span = options.span;
            var code = options.code;
            var type = options.type;
            var caption = options.caption;
            var period = options.period;
            var instrument = options.instrument;
            var assettype = options.assettype;
            var cc = options.cc;
            var height = ele.height() - (options.trend ? tsheight : 0);
            var width = ele.width();

            //    var hashId = options.hashId;
            var channel = options.channel;
            //    var region = options.region;
            var token = options.token;

            this.element.find("#crosshair").remove();
            this.element.find("#chartContainer div").remove();

            if (json && !jQuery.isEmptyObject(json)) {
                if (json["errormsg"] != undefined) {
                    this.xList = [];
                    sschartImg = $("<img id='chartNonIE6'/>");
                    sschartImg.attr("src", LabCI.SSDLConf.DATA_PATH + canvasImgURL + "uuid=" + uuid + "&lang=" + LabCI.getLang() + "&span=" + span + "&code=" + code + "&assettype=" + assettype + "&cc=" + cc + "&channel=" + channel + "&token=" + token);
                    ele.append(sschartImg);
                } else {
                    var uuid = json["uuid"];
                    var innerDiv = $("<div id='chartContainer'/>");
                    var outterDiv = $("<div id='chartContainerVisible'/>").css("visibility", "hidden").append(innerDiv);
                    var sschartImg = $("<img id='chartNonIE6'/>")
                            .load(function () {
                                outterDiv.css("visibility", "visible");
                            })
                            .attr("src", LabCI.SSDLConf.DATA_PATH + canvasImgURL + "uuid=" + uuid + "&width=" + width + "&height=" + height + "&lang=" + LabCI.getLang() + "&span=" + span + "&code=" + code + "&assettype=" + assettype + "&cc=" + cc + "&channel=" + channel + "&token=" + token);
                    innerDiv.append(sschartImg);
                    ele.append(outterDiv);//append image onto the chart area

                    if (uuid != "") {
                        if (!json["imageOnly"]) {
                            that.colors = json["colorsMap"];
                            that.xList = json["x"];
                            function s(a, b) {
                                return a > b ? 1 : -1;
                            }
                            that.xList.sort(s);
                            that.data = json["data"];

                            that.element.sschart("triggerChange", {
                                from: that.data[that.xList[0]]["ts"],
                                to: that.data[that.xList[that.xList.length - 1]]["ts"]
                            });

//                        this.allowZoom = json["allowZoom"];
                            this.allowZoom = false;
                            that.VAPxyMap = null;
                            that.VAPSortedys = null;

                            this.taSignatureVAPi = null;
                            var taSignaturesR = json["taSignsMap"];

                            $.each(taSignaturesR, function (a, b) {
                                that.taSignatures[b] = a;

                                //VAP availability check
                                if (a == "VAP") {
                                    that.taSignatureVAPi = b;
                                    that.isVAP = true;
                                }
                            });

                            this.rightX = null;
                            this.rightXval = null;
                            this.leftX = null;
                            this.leftXval = null;
                            this.topY = null;
                            this.topYval = null;
                            this.bottomY = null;
                            this.bottomYval = null;

                            $.each(that.data, function (key, value) {
                                if (!that.rightX) {
                                    that.rightX = parseInt(key);
                                    that.rightXval = parseFloat(value.ts);
                                    that.leftX = parseInt(key);
                                    that.leftXval = parseFloat(value.ts);
                                    that.topY = parseInt(value.y);
                                    that.topYval = parseFloat(value.rc.c);
                                    that.bottomY = parseInt(value.y);
                                    that.bottomYval = parseFloat(value.rc.c);
                                } else {
                                    that.rightX = Math.max(that.rightX, parseInt(key));
                                    that.rightXval = Math.max(that.rightXval, parseFloat(value.ts));
                                    that.leftX = Math.min(that.leftX, parseInt(key));
                                    that.leftXval = Math.min(that.leftXval, parseFloat(value.ts));
                                    that.topY = Math.min(that.topY, parseInt(value.y));
                                    that.topYval = Math.max(that.topYval, parseFloat(value.rc.c));
                                    that.bottomY = Math.max(that.bottomY, parseInt(value.y));
                                    that.bottomYval = Math.min(that.bottomYval, parseFloat(value.rc.c));
                                }
                            });

                            this._collectTASignaturesInfo(that.taSignatures);

                            var taParamsA = json["taParams"];
                            var tpa = taParamsA.split(";");
                            $.each(tpa, function (i, v) {
                                if (v != "") {
                                    var keyParam = v.split("=");
                                    //             taParams[keyParam[0]] = keyParam[1];
                                }
                            });
                            this.pos = json["pos"];
                            //var chartX =ele.offset().left;
                            //var chartY =ele.offset().top;
                            var chartX = ele.position().left;
                            var chartY = ele.position().top;
                            var $dragArea = that.element.find("#dragArea");
                            var prevDate = 0;

                            that.element.find("#chartContainer").bind("mouseleave touchleave", function (e) {
                                if (that.mode == MODE_VIEW) {
                                    if (that.idSetTimeoutFadeOutHorizontalComponents == undefined) {
                                        that.idSetTimeoutFadeOutHorizontalComponents = setTimeout(function () {
                                            that.element.find("#chartContainer #crosshair").fadeOut(500);
                                            that.element.find("#chartContainer #crosshairHorizontal2").fadeOut(500);
                                            that.element.find("#chartContainer #positionTagHorizontal2").fadeOut(500);
                                            that.element.find("#chartContainer #positionTagVertical").fadeOut(500);
                                            that.element.find("#chartContainer #point").fadeOut(500);
                                        }, 1000);
                                    }
                                }
                            });

                            that.element.find("#chartContainer").bind("mouseenter touchenter", function (e) {
                                if (that.mode == MODE_VIEW) {
                                    if (that.idSetTimeoutFadeOutHorizontalComponents != undefined) {
                                        clearTimeout(that.idSetTimeoutFadeOutHorizontalComponents);
                                        that.idSetTimeoutFadeOutHorizontalComponents = undefined;
                                    }
                                    if (that.element.find("#chartContainer #crosshair").length > 0) {
                                        that.element.find("#chartContainer #crosshair").stop().animate({opacity: '100'}).show();
                                        that.element.find("#chartContainer #crosshairHorizontal2").stop().animate({opacity: '100'}).show();
                                        that.element.find("#chartContainer #positionTagHorizontal2").stop().animate({opacity: '100'}).show();
                                        that.element.find("#chartContainer #positionTagVertical").stop().animate({opacity: '100'}).show();
                                        that.element.find("#chartContainer #point").stop().animate({opacity: '100'}).show();
                                    }
                                }
                            });

            //                that.element.find("#chartContainer").bind("mousemove touchmove", function (evt) {
                            that.element.find("#chartContainer").bind("mousemove", function (evt) {
                                var e = evt.clientX ? evt : evt.originalEvent;
                                e.preventDefault();
                                if (e.targetTouches)
                                    e = e.targetTouches[0];

                                if (that.mode == MODE_VIEW) {
                                    var date = new Date().getTime();
                                    if (date - prevDate > 50) {//IE work around to fix crosshair performance issue
                                        if (that.xList && that.xList.length > 0) {
                                            //var offsetX =ele.offset().left;
                                            var offsetX = that.element.offset().left;
                                            var relativeX = e.clientX - offsetX;
                                            var nearX = near(that.xList, relativeX);
                                            //var offsetY = ele.offset().top;
                                            var offsetY = that.element.position().top;
                                            var relativeY = e.clientY - offsetY;
                                            var $dragArea = that.element.find("#dragArea");
                                            if ($dragArea.length > 0) {
                                                var offsetXdrag = 0;
                                                var orgX = +$dragArea.attr("x");
                                                var width = Math.abs(offsetXdrag + nearX - (+$dragArea.attr("x")));
                                                var backward = orgX > nearX + offsetXdrag;

                                                if (backward) {
                                                    $dragArea.css("left", (offsetXdrag + nearX) + "px");
                                                    $dragArea.css("width", width + "px");
                                                } else {
                                                    $dragArea.css("left", orgX + "px");
                                                    $dragArea.css("width", (width) + "px");
                                                }
                                            }
                                            moveHandlerXY(nearX);
                                        }
                                        prevDate = date;
                                    }
                                } else if (that.mode == MODE_DRAW) {
                                    if (that.drawing) {
                                        var clientX = e.clientX;
                                        var clientY = e.clientY - 4 + $(window).scrollTop();

                                        var $curr = $('.new');

                                        var datax = near(that.xList, clientX - that.element.find('#chartContainer').offset().left);
                                        var endx = datax;
                                        var datay = clientY - that.element.find('#chartContainer').offset().top;
                                        var val;
                                        if (datay < that.topY)
                                            val = ((that.topY - datay) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY)) + that.topYval;
                                        else
                                            val = that.topYval - ((datay - that.topY) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY));

                                        var x = endx - that.originX;
                                        var y = datay - that.originY;

                                        var length = Math.sqrt(x * x + y * y);
                                        $curr.css({width: length}).attr({tts: that.data[datax].ts, tval: val});

//                                        if (_IS_MSIE_8) {
//                                            $curr.attr({'width8': length});
//                                            var rad = Math.atan(y / x);
//                                            var M11 = Math.cos(rad);
//                                            var M12 = -1 * Math.sin(rad);
//                                            var M21 = Math.sin(rad);
//                                            var M22 = Math.cos(rad);
//
//                                            $curr.attr({deg: rad});
//
//                                            $curr.get(0).style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + M11 + ', M12=' + M12 + ', M21=' + M21 + ', M22=' + M22 + ', sizingMethod=\'auto expand\')';
//                                            if (rad < 0 && endx < that.originX) {
//                                                $curr.css({'left': endx + 'px', 'top': that.originY + 'px'}).removeAttr('ys').attr({'xs': true});
//                                            } else if (rad >= 0 && endx >= that.originX) {
//                                                $curr.css({'left': that.originX + 'px', 'top': that.originY + 'px'}).removeAttr('xs').removeAttr('ys');
//                                            } else if (rad < 0 && endx >= that.originX) {
//                                                $curr.css({'left': that.originX + 'px', 'top': datay + 'px'}).removeAttr('xs').attr({'ys': true});
//                                            } else {
//                                                $curr.css({'left': endx + 'px', 'top': datay + 'px'}).attr({'xs': true, 'ys': true});
//                                            }
//                                        } else {
                                        var angle = 180 / 3.14 * Math.atan(Math.abs(y) / Math.abs(x));
                                        if (y < 0)
                                            angle *= -1;
                                        if (x < 0)
                                            angle = 180 - angle;

                                        $curr.css({'-webkit-transform': 'rotate(' + angle + 'deg)',
                                            '-moz-transform': 'rotate(' + angle + 'deg)',
                                            '-o-transform': 'rotate(' + angle + 'deg)',
                                            '-ms-transform': 'rotate(' + angle + 'deg)',
                                            'transform': 'rotate(' + angle + 'deg)'})
                                                .attr({deg: angle});
//                                        }
                                    }
                                } else if (that.mode == MODE_SELECT) {
                                    if (that.element.find('.line.selected').length > 0) {    // Moving Line
                                        var $line = that.element.find('.line.selected');
                                        var dx = parseInt($line.attr('dx'));
                                        var dy = parseInt($line.attr('dy'));
                                        var datax = near(that.xList, e.clientX - dx);

                                        //                var y = (event.clientY - dy) - $('#chartContainer').offset().top;
                                        var y = (e.clientY - dy);

                                        var fval;
                                        if (y < that.topY)
                                            fval = ((that.topY - y) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY)) + that.topYval;
                                        else
                                            fval = that.topYval - ((y - that.topY) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY));

//                                        if (_IS_MSIE_8) {
//                                            var rad = $line.attr('deg');
//                                            var xs = $line.attr('xs');
//                                            var ys = $line.attr('ys');
//                                            var deltax = Math.abs($line.attr('width8') * Math.cos(rad));
//                                            var deltay = Math.abs($line.attr('width8') * Math.sin(rad));
//
//                                            var tmp_x;
//                                            if (!xs && !ys) {
//                                                tmp_x = datax + deltax;
//                                                x2 = near(that.xList, tmp_x);
//                                                if (x2 == that.xList[that.xList.length - 1]) {
//                                                    tmp_x = x2 - deltax;
//                                                    datax = near(that.xList, tmp_x);
//                                                    x1 = datax;
//                                                }
//
//                                                y2 = y + deltay;
//                                            } else if (!xs) {
//                                                y2 = y;
//                                                y = y + deltay;
//
//                                                if (y < that.topY)
//                                                    fval = ((that.topY - y) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY)) + that.topYval;
//                                                else
//                                                    fval = that.topYval - ((y - that.topY) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY));
//
//                                                x2 = near(that.xList, datax + deltax);
//                                                if (x2 == that.xList[that.xList.length - 1]) {
//                                                    datax = near(that.xList, x2 - deltax);
//                                                    x1 = datax;
//                                                }
//                                            } else if (!ys) {
//                                                x2 = datax;
//                                                datax = near(that.xList, datax + deltax);
//                                                if (datax == that.xList[that.xList.length - 1]) {
//                                                    x2 = near(that.xList, datax - deltax);
//                                                    x1 = x2;
//                                                }
//                                                y2 = y + deltay;
//                                            } else {
//                                                x2 = near(that.xList, datax + deltax);
//                                                if (x2 == that.xList[that.xList.length - 1]) {
//                                                    x1 = near(that.xList, x2 - deltax);
//                                                    datax = x1;
//                                                }
//                                                y2 = y + deltay;
//                                            }
//
//                                            var tval;
//                                            if (y2 < that.topY)
//                                                tval = ((that.topY - y2) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY)) + that.topYval;
//                                            else
//                                                tval = that.topYval - ((y2 - that.topY) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY));
//                                        } else {
                                        var deltax = $line.width() * Math.cos(3.14 / 180 * parseFloat($line.attr('deg')));
                                        var x2 = near(that.xList, datax + deltax);

                                        var deltay = $line.width() * Math.sin(3.14 / 180 * parseFloat($line.attr('deg')));
                                        var y2 = y + deltay;
                                        var tval;
                                        if (y2 < that.topY)
                                            tval = ((that.topY - y2) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY)) + that.topYval;
                                        else
                                            tval = that.topYval - ((y2 - that.topY) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY));
//                                        }
                                        //                $line.css({left: datax + $('#chartContainer').offset().left, top: event.clientY - dy}).attr({fts: data[datax].ts, fval: fval, tts: data[x2].ts, tval: tval});
                                        $line.css({left: datax, top: e.clientY - dy}).attr({fts: that.data[datax].ts, fval: fval, tts: that.data[x2].ts, tval: tval});
                                    } else if (that.element.find('.anno_dot.selected').length > 0) {
                                        var $anno = that.element.find('.anno_dot.selected');

                                        var x = near(that.xList, e.clientX - that.element.offset().left);
                                        var left = x - Math.floor($anno.width() / 2);
                                        var y = e.clientY - that.element.offset().top;
                                        var top = y - Math.floor($anno.height() / 2);

                                        var val;
                                        if (y < that.topY)
                                            val = ((that.topY - y) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY)) + that.topYval;
                                        else
                                            val = that.topYval - ((y - that.topY) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY));

                                        $anno.css({left: left, top: top}).attr({ts: that.data[x].ts, val: val});
                                    }
                                }
                            });

                            try {
                                if (that.lineArr.length > 0) {
                                    relocateLines();
                                }
                                if (that.annoArr.length > 0) {
                                    relocateAnno();
                                }
                            } catch (e) {
                                console.log(e);
                            }

                            that.element.find("#chartContainer").bind("mousedown touchstart", function (evt) {
                                var e = evt.clientX ? evt : evt.originalEvent;
                                e.preventDefault();
                                if (e.targetTouches)
                                    e = e.targetTouches[0];

                                var chartContainer = $(this);
                                if (that.mode == MODE_VIEW) {

                                    if (that.allowZoom) {
                                        //var offset = ele.offset();
                                        var offsetX = 0;
                                        //                                var offsetY = that.element.position().top;
                                        var relativeX = e.clientX - that.element.offset().left;
                                        var nearX = near(that.xList, relativeX);
                                        var x = offsetX + nearX;

                                        var y = 4;
                                        var dragArea = $("<div id='dragArea' x='" + x + "' />").css({
                                            position: "absolute",
                                            top: y + "px",
                                            left: x + "px",
                                            height: (that.element.height() - 25 - (options.trend ? tsheight : 0)) + "px",
                                            "z-Index": 999,
                                            "background-color": "#1C89FF",
                                            "opacity": "0.3"
                                        });

                                        that.element.append(dragArea);
                                    }
                                } else if (that.mode == MODE_DRAW) {
                                    that.drawing = true;
                                    drawEvent(e, $(this));
                                } else if (that.mode == MODE_ANNO) {
                                    if (!that.edit_anno) {
                                        that.annoid++;
                                        var anno = $("<div/>").addClass('anno_dot').attr({id: 'anno_' + that.annoid}).html('A').bind('mousedown touchstart', function (evt) {
                                            if (that.mode == MODE_SELECT) {
                                                $(this).addClass('selected');
                                            } else if (that.mode == MODE_REMOVE) {
                                                var $anno = $(this);
                                                $(that.annoArr).each(function (idx) {
                                                    if ($anno.attr("id") == $(this).attr("id"))
                                                        that.annoArr.splice(idx, 1);
                                                });
                                                $anno.detach();
                                            } else if (that.mode == MODE_ANNO) {
                                                that.edit_anno = true;
                                                var $anno = $(this);

                                                var left = parseInt($(this).css('left').replace(/[^-\d\.]/g, ''));
                                                var top = parseInt($(this).css('top').replace(/[^-\d\.]/g, ''));

                                                var dialog_left = left + Math.floor(anno.width() / 2);
                                                var dialog = $('<div/>').attr({annoid: 'anno_' + that.annoid}).addClass('anno_set')
                                                        .append($('<div/>').attr({id: 'title'}).html('Set Annotation'))
                                                        .append($('<div/>').attr({id: 'content'}).append($('<input/>').attr({id: 'anno_content'}).val($anno.attr('text')).bind('keypress', function (e) {
                                                            if (!e)
                                                                e = window.event;
                                                            var code;
                                                            if ((e.charCode) && (e.keyCode == 0))
                                                                code = e.charCode;
                                                            else
                                                                code = e.keyCode;

                                                            if (code == 13)
                                                                $(this).parent().parent().find('#confirm input').click();
                                                        })))
                                                        .append($('<div/>').attr({id: 'confirm'}).append($('<input/>').attr({type: 'button', align: 'center', value: 'OK'}).css({width: '50px'})
                                                                .bind('click touchend', function (e) {
                                                                    $anno.attr({'text': $(this).parent().parent().find('#anno_content').val()});
                                                                    $(this).parent().parent().detach();
                                                                    that.edit_anno = false;
                                                                })));
                                                dialog.hide();
                                                $(this).parent().append(dialog);

                                                if (dialog.outerWidth() + left > that.element.width())
                                                    dialog_left -= dialog.outerWidth();
                                                dialog.css({left: dialog_left, top: top + Math.floor(anno.height() / 2)})
                                                dialog.show();
                                                dialog.find('#content input').focus();
                                            }
                                        })
                                                .bind('mouseup touchend', function (evt) {
                                                    $(this).removeClass('selected');
                                                })
                                                .bind('mouseenter touchenter', function (evt) {
                                                    var $anno_display;
                                                    if (chartContainer.find('.anno_display').length == 0) {
                                                        $anno_display = $("<div/>").addClass('anno_display');
                                                        chartContainer.append($anno_display);
                                                    } else
                                                        $anno_display = chartContainer.find('.anno_display');

                                                    $anno_display.hide();
                                                    $anno_display.append($("<div/>").addClass('anno_dot').css({position: 'relative', 'float': 'left', 'top': '3px', 'margin-right': '3px'}).html('A')).append($("<span/>").html($(this).attr('text')));
                                                    $anno_display.css({top: that.pos[0][3] - $anno_display.height()});
                                                    $anno_display.show();
                                                })
                                                .bind('mouseleave touchleave', function (ect) {
                                                    var $anno_display = chartContainer.find('.anno_display');
                                                    $anno_display.detach();
                                                });

                                        anno.hide();
                                        $(this).append(anno);

                                        var x = near(that.xList, e.clientX - that.element.offset().left);
                                        var left = x - Math.floor(anno.width() / 2);
                                        var y = e.clientY - that.element.offset().top;
                                        var top = y - Math.floor(anno.height() / 2);

                                        var val;
                                        if (y < that.topY)
                                            val = ((that.topY - y) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY)) + that.topYval;
                                        else
                                            val = that.topYval - ((y - that.topY) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY));

                                        anno.css({left: left, top: top}).attr({ts: that.data[x].ts, val: val});
                                        anno.show();

                                        that.annoArr.push(anno);

                                        var dialog_left = left + Math.floor(anno.width() / 2);
                                        var dialog = $('<div/>').attr({annoid: 'anno_' + that.annoid}).addClass('anno_set')
                                                .append($('<div/>').attr({id: 'title'}).html('Set Annotation'))
                                                .append($('<div/>').attr({id: 'content'}).append($('<input/>').attr({id: 'anno_content'}).bind('keypress', function (e) {
                                                    if (!e)
                                                        e = window.event;
                                                    var code;
                                                    if ((e.charCode) && (e.keyCode == 0))
                                                        code = e.charCode;
                                                    else
                                                        code = e.keyCode;

                                                    if (code == 13)
                                                        $(this).parent().parent().find('#confirm input').click();
                                                })))
                                                .append($('<div/>').attr({id: 'confirm'}).append($('<input/>').attr({type: 'button', align: 'center', value: 'OK'}).css({width: '50px'})
                                                        .bind('click touchend', function (e) {
                                                            var annoid = '#' + $(this).parent().parent().attr('annoid');
                                                            that.element.find(annoid).attr({'text': $(this).parent().parent().find('#anno_content').val()});
                                                            $(this).parent().parent().detach();
                                                        })));
                                        dialog.hide();
                                        $(this).parent().append(dialog);

                                        if (dialog.outerWidth() + left > that.element.width())
                                            dialog_left -= dialog.outerWidth();
                                        dialog.css({left: dialog_left, top: top + Math.floor(anno.height() / 2)})

                                        dialog.show();

                                        dialog.find('#content input').focus();
                                    }
                                }
                            });

                            that.element.find("#chartContainer").bind("mouseup touchend", function (evt) {
                                var e = evt.clientX ? evt : evt.originalEvent;
                                e.preventDefault();
                                if (e.targetTouches)
                                    e = e.targetTouches[0];

                                if (that.mode == MODE_VIEW) {
                                    if (that.xList && that.xList.length > 0) {
                                        var $dragArea = that.element.find("#dragArea");
                                        if ($dragArea.length > 0) {
                                            //var chartX = ele.offset().left;
                                            //var areaOffset = $("#dragArea").offset();
                                            // var chartX = that.element.parent().position().left;
                                            var areaOffset = $dragArea.position();
                                            var fromX = near(that.xList, areaOffset.left + 1);
                                            var toX = near(that.xList, areaOffset.left + $dragArea.width() + 1);

                                            if (fromX != toX) {
                                                var _from = that.data[fromX]["ts"];
                                                var _to = that.data[toX]["ts"];
                                                $dragArea.remove();

                                                that.element.sschart({
                                                    period: "CUSTOM," + _from + "-" + _to
                                                });
                                                // this._trigger( 'zoomToCustom', null, { from: _from, to:_to } );
                                                that.element.sschart("triggerZoomToCustom", {
                                                    from: _from,
                                                    to: _to
                                                });
                                                that.element.sschart("createCanvas");
                                            }
                                        }
                                    }
                                } else if (that.mode == MODE_DRAW) {
                                    $('.new').removeClass('new');
                                    that.drawing = false;
                                    that.originX = -1;
                                    that.originY = -1;
                                }
                            });

                            function drawEvent(event, ele) {
                                var clientX, clientY;

                                if (event.clientX) {
                                    clientX = event.clientX;
                                    clientY = event.clientY;
                                } else if (event.touches.length > 0) {
                                    clientX = event.touches[0].clientX;
                                    clientY = event.touches[0].clientY;
                                }

                                if (that.xList) {
                                    var x = near(that.xList, clientX - ele.offset().left);

                                    that.originX = x;
                                    that.originY = clientY - 4 - ele.offset().top + $(window).scrollTop();
                                    var y = that.originY;
                                    var val;
                                    if (y < that.topY)
                                        val = ((that.topY - y) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY)) + that.topYval;
                                    else
                                        val = that.topYval - ((y - that.topY) * (that.topYval - that.bottomYval) / (that.bottomY - that.topY));

                                    var $newline = $('<div/>').addClass("new line").attr({id: ++that.lineid}).css({left: that.originX, top: that.originY}).attr({fts: that.data[x].ts, fval: val})
                                            .bind('mousedown touchstart', function (evt) {
                                                if (that.mode == MODE_SELECT) {
//                                                            that.selectLine(this, evt.clientX ? evt : evt.originalEvent);

                                                    var event = evt.clientX ? evt : evt.originalEvent;
                                                    var clientX, clientY;

                                                    if (event.clientX) {
                                                        clientX = event.clientX;
                                                        clientY = event.clientY;
                                                    } else if (event.touches.length > 0) {
                                                        clientX = event.touches[0].clientX;
                                                        clientY = event.touches[0].clientY;
                                                    }
                                                    that.element.find('.line').removeClass('selected');

                                                    var oriX = parseInt($(this).css('left').replace(/[^-\d\.]/g, ''));
                                                    var oriY = parseInt($(this).css('top').replace(/[^-\d\.]/g, ''));
                                                    $(this).addClass('selected').attr({dx: clientX - oriX, dy: clientY - oriY});

                                                } else if (that.mode == MODE_REMOVE) {
//                                                            that.removeLine(this);
                                                    var $line = $(this);
                                                    $(that.lineArr).each(function (idx) {
                                                        if ($line.attr("id") == $(this).attr("id"))
                                                            that.lineArr.splice(idx, 1);
                                                    });
                                                    $line.detach();
                                                } else if (that.mode == MODE_COPY) {
                                                    var top = parseInt($(this).css('top').replace(/[^-\d\.]/g, ''));
                                                    var $copy = $(this).clone();
                                                    var y = top - 4 - ele.offset().top;
                                                    var delta = 20;
                                                    var delta_val = delta * (that.topYval - that.bottomYval) / (that.bottomY - that.topY);
                                                    $copy.css({top: top + delta}).attr({id: ++that.lineid, fval: $(this).attr('fval') - delta_val, tval: $(this).attr('tval') - delta_val});

//                                                            that.setMode(MODE_SELECT);
                                                    //that.element.parent().parent().find("#chartControl #selectButton").click();
                                                    that.element.parent().parent().find("#drawmenu #drag").click();

                                                    reBindEvent($copy);
                                                    ele.append($copy);
                                                    that.lineArr.push($copy);
                                                }
                                            })
                                            .bind('mouseup touchend', function (evt) {
                                                $(this).removeClass('selected');
                                            })
                                            .append($('<div/>').addClass('line_trans')).append($('<div/>').addClass('line_color')).append($('<div/>').addClass('line_trans'));

                                    ele.append($newline);
                                    that.lineArr.push($newline);
                                    that.drawing = true;
                                }
                            }
                            ;

                            function relocateAnno() {
                                var chartContainer = that.element.find('#chartContainer');
                                $(that.annoArr).each(function () {
                                    var ts = $(this).attr('ts');
                                    var val = $(this).attr('val');
                                    var startx = that.data[that.xList[0]].ts;
                                    var endx = that.data[that.xList[that.xList.length - 1]].ts;

                                    if (ts >= startx && ts <= endx && val <= that.topYval && val >= that.bottomYval) {
                                        var y = that.topY + (that.topYval - val) * (that.bottomY - that.topY) / (that.topYval - that.bottomYval);

                                        for (var i = 0; i < that.xList.length; i++) {
                                            var key = that.xList[i];
                                            if (ts == that.data[key].ts) {
                                                $(this).bind('mousedown touchstart', function (evt) {
                                                    if (that.mode == MODE_SELECT) {
                                                        $(this).addClass('selected');
                                                    } else if (that.mode == MODE_REMOVE) {
                                                        var $anno = $(this);
                                                        $(that.annoArr).each(function (idx) {
                                                            if ($anno.attr("id") == $(this).attr("id"))
                                                                that.annoArr.splice(idx, 1);
                                                        });
                                                        $anno.detach();
                                                    } else if (that.mode == MODE_ANNO) {
                                                        that.edit_anno = true;
                                                        var $anno = $(this);

                                                        var left = parseInt($(this).css('left').replace(/[^-\d\.]/g, ''));
                                                        var top = parseInt($(this).css('top').replace(/[^-\d\.]/g, ''));

                                                        var dialog_left = left + Math.floor($anno.width() / 2);
                                                        var dialog = $('<div/>').attr({annoid: 'anno_' + that.annoid}).addClass('anno_set')
                                                                .append($('<div/>').attr({id: 'title'}).html('Set Annotation'))
                                                                .append($('<div/>').attr({id: 'content'}).append($('<input/>').attr({id: 'anno_content'}).val($anno.attr('text')).bind('keypress', function (e) {
                                                                    if (!e)
                                                                        e = window.event;
                                                                    var code;
                                                                    if ((e.charCode) && (e.keyCode == 0))
                                                                        code = e.charCode;
                                                                    else
                                                                        code = e.keyCode;

                                                                    if (code == 13)
                                                                        $(this).parent().parent().find('#confirm input').click();
                                                                })))
                                                                .append($('<div/>').attr({id: 'confirm'}).append($('<input/>').attr({type: 'button', align: 'center', value: 'OK'}).css({width: '50px'})
                                                                        .bind('click touchend', function (e) {
                                                                            $anno.attr({'text': $(this).parent().parent().find('#anno_content').val()});
                                                                            $(this).parent().parent().detach();
                                                                            that.edit_anno = false;
                                                                        })));
                                                        dialog.hide();
                                                        $(this).parent().append(dialog);

                                                        if (dialog.outerWidth() + left > that.element.width())
                                                            dialog_left -= dialog.outerWidth();
                                                        dialog.css({left: dialog_left, top: top + Math.floor($anno.height() / 2)})
                                                        dialog.show();
                                                        dialog.find('#content input').focus();
                                                    }
                                                })
                                                        .bind('mouseup touchend', function (evt) {
                                                            $(this).removeClass('selected');
                                                        })
                                                        .bind('mouseenter touchenter', function (evt) {
                                                            var $anno_display;
                                                            if (chartContainer.find('.anno_display').length == 0) {
                                                                $anno_display = $("<div/>").addClass('anno_display');
                                                                chartContainer.append($anno_display);
                                                            } else
                                                                $anno_display = chartContainer.find('.anno_display');

                                                            $anno_display.hide();
                                                            $anno_display.append($("<div/>").addClass('anno_dot').css({position: 'relative', 'float': 'left', 'top': '3px', 'margin-right': '3px'}).html('A')).append($("<span/>").html($(this).attr('text')));
                                                            $anno_display.css({top: that.pos[0][3] - $anno_display.height()});
                                                            $anno_display.show();
                                                        })
                                                        .bind('mouseleave touchleave', function (ect) {
                                                            var $anno_display = chartContainer.find('.anno_display');
                                                            $anno_display.detach();
                                                        });

                                                $(this).hide();
                                                chartContainer.append($(this));
                                                $(this).css({left: key - Math.floor($(this).width() / 2), top: y - Math.floor($(this).height() / 2)});
                                                $(this).html('A');
                                                $(this).show();
                                            }
                                        }
                                    }

                                });
                            }

                            function relocateLines() {
                                $(that.lineArr).each(function () {
                                    var fts = $(this).attr('fts');
                                    var fval = parseFloat($(this).attr('fval'));
                                    var tts = $(this).attr('tts');
                                    var tval = parseFloat($(this).attr('tval'));


                                    if (fts > tts) {
                                        fts = tts;
                                        fval = tval;
                                        tts = $(this).attr('fts');
                                        tval = parseFloat($(this).attr('fval'));
                                    }

                                    var newtx;
                                    var newty;

                                    var fin = false;
                                    var tin = false;
                                    for (var i = 0; i < that.xList.length; i++) {
                                        var key = that.xList[i];
                                        var value = that.data[key];
                                        if (value.ts == fts) {
                                            fin = true;
                                            var y;
                                            if (fval > that.topYval) {
                                                y = that.topY - (fval - that.topYval) * (that.bottomY - that.topY) / (that.topYval - that.bottomYval);
                                            } else {
                                                y = that.topY + (that.topYval - fval) * (that.bottomY - that.topY) / (that.topYval - that.bottomYval);
                                            }
                                            $(this).css({left: parseInt(key), top: y});
                                        }
                                        if (value.ts == tts) {
                                            tin = true;
                                            newtx = parseInt(key);
                                            if (tval > that.topYval) {
                                                newty = that.topY - (tval - that.topYval) * (that.bottomY - that.topY) / (that.topYval - that.bottomYval);
                                            } else {
                                                newty = that.topY + (that.topYval - tval) * (that.bottomY - that.topY) / (that.topYval - that.bottomYval);
                                            }

                                            var left = parseInt($(this).css('left').replace(/[^-\d\.]/g, ''));
                                            var top = parseInt($(this).css('top').replace(/[^-\d\.]/g, ''));

                                            var dx = newtx - left;
                                            var dy = newty - top;

                                            var len = Math.sqrt(dx * dx + dy * dy);

//                                            if (_IS_MSIE_8) {
//                                                $(this).attr({'width8': len});
//                                                var rad = Math.atan(dy / dx);
//                                                var M11 = Math.cos(rad);
//                                                var M12 = -1 * Math.sin(rad);
//                                                var M21 = Math.sin(rad);
//                                                var M22 = Math.cos(rad);
//
//                                                $(this).css({deg: rad, width: len});
//                                                $(this).get(0).style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + M11 + ', M12=' + M12 + ', M21=' + M21 + ', M22=' + M22 + ', sizingMethod=\'auto expand\')';
//                                                if (rad < 0 && newtx < left) {
//                                                    $(this).css({'left': newtx + 'px', 'top': top + 'px'}).removeAttr('ys').attr({'xs': true});
//                                                } else if (rad >= 0 && newtx >= left) {
//                                                    $(this).css({'left': left + 'px', 'top': top + 'px'}).removeAttr('xs').removeAttr('ys');
//                                                } else if (rad < 0 && newtx >= left) {
//                                                    $(this).css({'left': left + 'px', 'top': newty + 'px'}).removeAttr('xs').attr({'ys': true});
//                                                } else {
//                                                    $(this).css({'left': newtx + 'px', 'top': newty + 'px'}).attr({'xs': true, 'ys': true});
//                                                }
//                                            } else {
                                            var deg = 180 / 3.14 * Math.atan(dy / dx);

                                            $(this).css({width: len,
                                                '-webkit-transform': 'rotate(' + deg + 'deg)',
                                                '-moz-transform': 'rotate(' + deg + 'deg)',
                                                '-ms-transform': 'rotate(' + deg + 'deg)',
                                                'transform': 'rotate(' + deg + 'deg)'})
                                                    .attr({deg: deg});
//                                            }
                                        }
                                    }

                                    reBindEvent($(this));

                                    if (fin && tin)
                                        that.element.find('#chartContainer').append($(this));
                                });

                            }

                            function reBindEvent(line) {
                                $(line).bind('mousedown touchstart', function (evt) {
                                    if (that.mode == MODE_SELECT) {
                                        var event = evt.clientX ? evt : evt.originalEvent;
                                        var clientX, clientY;

                                        if (event.clientX) {
                                            clientX = event.clientX;
                                            clientY = event.clientY;
                                        } else if (event.touches.length > 0) {
                                            clientX = event.touches[0].clientX;
                                            clientY = event.touches[0].clientY;
                                        }
                                        that.element.find('.line').removeClass('selected');

                                        var oriX = parseInt($(this).css('left').replace(/[^-\d\.]/g, ''));
                                        var oriY = parseInt($(this).css('top').replace(/[^-\d\.]/g, ''));
                                        $(this).addClass('selected').attr({dx: clientX - oriX, dy: clientY - oriY});

                                    } else if (that.mode == MODE_REMOVE) {
                                        var $line = $(this);
                                        $(that.lineArr).each(function (idx) {
                                            if ($line.attr("id") == $(this).attr("id"))
                                                that.lineArr.splice(idx, 1);
                                        });
                                        $line.detach();
                                    } else if (that.mode == MODE_COPY) {
                                        var top = parseInt($(this).css('top').replace(/[^-\d\.]/g, ''));
                                        var $copy = $(this).clone();
                                        var y = top - 4 - that.element.offset().top;
                                        var delta = 20;
                                        var delta_val = delta * (that.topYval - that.bottomYval) / (that.bottomY - that.topY);
                                        $copy.css({top: top + delta}).attr({id: ++that.lineid, fval: $(this).attr('fval') - delta_val, tval: $(this).attr('tval') - delta_val});

//                                    that.setMode(MODE_SELECT);
                                        //that.element.parent().parent().find("#chartControl #selectButton").click();
                                        that.element.parent().parent().find("#drawmenu #drag").click();

                                        reBindEvent($copy);
                                        that.element.find('#chartContainer').append($copy);
                                        that.lineArr.push($copy);
                                    }
                                })
                                        .bind('mouseup touchend', function (evt) {
                                            $(this).removeClass('selected');
                                        });
                            }

                            function moveHandlerXY(nearX, ele) {
                                var chartWidth = +that.pos[0][2] - +that.pos[0][0];
                                var chartHeight = +that.pos[0][3] - +that.pos[0][1];
                                var idSetTimeoutFadeOutTooltipBox = undefined;
                                var idSetTimeoutFadeOutHorizontalComponents = undefined;
                                // that.element.children("#chartContainerVisible #chartContainer div.tooltip").remove();

                                var $chartContainer = that.element.find("#chartContainer");
                                //var $chartContainer=$("#chartContainer");

                                //var offset = $("#chartContainer").offset();
                                // var offset = that.element.children("#chartContainer").parent().position();
                                var offset = $chartContainer.parent().position();

                                var offsetX = 0;
                                var offsetY = 0;
                                if (offset != null) {
                                    offsetX = offset.left;
                                }
                                if ($chartContainer.position() != null) {
                                    offsetY = $chartContainer.position().top;
                                }
                                var crosshairX = offsetX + nearX;

                                var attributes = that.data[nearX]["at"];
                                var pointX = (+nearX) + offsetX - 3;
                                var pointY = +that.data[nearX]["y"] + offsetY - 3
                                this.vapValue = null;
                                if (that.isVAP) {
                                    that.vapValue = getVAPValue(nearX, that.taSignatureVAPi, that.VAPxyMap, that.VAPSortedys, that.data);
                                }

                                //Left boundary check - Data obj describes valid point if
                                //the "rc" attribute contains properites (open high low close);
                                //If invalid point is reached, skip performing the rest of actions;
                                //point and crosshairs remain unchanged.
                                var ohlc = that.data[nearX]["rc"];
                                if ($.isEmptyObject(ohlc)) {
                                    return;
                                }

                                var isReachedBoundaryX = false;
                                if ($chartContainer.find("#crosshair").length == 0) {
                                    //initialise components
                                    var point = $("<div  id='point' />").css({
                                        position: "absolute",
                                        top: pointY + 1 + "px",
                                        width: "7px",
                                        height: "7px",
                                        left: pointX + 1 + "px",
                                        background: "url('" + LabCI.SSDLConf.DATA_PATH + pointPath + "') no-repeat 0px 0px",
                                        "z-Index": 990

                                    });
                                    $chartContainer.append(point);

                                    var ver = $("<div id='crosshair' />").css({
                                        width: "1px",
                                        height: ($chartContainer.height() - 25) + "px",
                                        //"background-color": "#FF8426",
                                        //"background-color": "orange",
                                        "background-color": "#DEB887",
                                        position: "absolute",
                                        top: (offsetY + 3) + "px",
                                        //left: (+nearX) + "px",
                                        left: offsetX + "px",
                                        "opacity": "1"
                                    });

                                    var ver2Height = 12;
                                    var ver2VerticalAdjusment = -ver2Height / 2;
                                    var ver2 = $("<div id='positionTagVertical'></div>").css({
                                        width: "auto",
                                        padding: "0 2px 1px 2px",
                                        "text-align": "right",
                                        height: ver2Height + "px",
                                        "background-color": "#555555",
                                        "color": "white",
                                //        "font": "10px arial",
                                        "font-size": "10px",
                                        //border: "1px solid orange",
                                        position: "absolute",
                                        top: (offsetY + $chartContainer.height() - 14) + "px",
                                        "margin-top": ver2VerticalAdjusment,
                                        "opacity": "1"
                                    });

                                    $chartContainer.append(ver);
                                    $chartContainer.append(ver2);

                                    var chartElementRegion = $("<div id='chartElementRegion' />").css({
                                        width: chartWidth + "px",
                                        height: chartHeight + "px",
                                        position: "absolute",
                                        top: offsetY + 4 + "px",
                                        left: +that.pos[0][0] + "px",
                                        "z-index": 999
                                    });

//                                    if (/MSIE 6/i.test(navigator.userAgent)) {
//                                        chartElementRegion.css("background-image", "url(1x1.png)");
//                                    }

                                    $chartContainer.append(chartElementRegion);

                                    var crosshairHorizontal2 = $("<div id='crosshairHorizontal2' />").css({
                                        width: chartWidth + "px",
                                        //width: ( $chartContainer.width()) + "px",
                                        height: "0px",
                                        "border-top": "1px solid #DEB887",
                                        //"border-top":"1px solid orange",
                                        //"background-color": "orange",
                                        position: "absolute",
                                        top: pointY + 3 + "px",
                                        left: +that.pos[0][0] + "px",
                                        "opacity": "1"
                                    });
                                    $chartContainer.append(crosshairHorizontal2);

                                    var ver2Height = 12;
                                    var ver2VerticalAdjusment = -ver2Height / 2;
                                    var positionTagHorizontal2 = $("<div id='positionTagHorizontal2'></div>").css({
                                        width: "auto",
                                        padding: "0px 2px 1px 2px",
                                        height: ver2Height + "px",
                                    //    "font": "10px arial",
                                        "font-size": "10px",
                                        //"background-color": "yellow",
                                        //border: "1px solid orange",
                                        "background-color": "#555555",
                                        "color": "white",
                                        position: "absolute",
                                        top: pointY + 3 + "px",
                                        left: +that.pos[0][0] + "px",
                                        //right: "0px",
                                        "margin-top": ver2VerticalAdjusment,
                                        "opacity": "1"
                                    });
                                    $chartContainer.append(positionTagHorizontal2);
                                } else {
                                    //update components position/values
                                    var oldTag = $chartContainer.find("#positionTagVertical").html();
                                    if (oldTag != that.data[nearX]["te"]) {
                                        //only preform update when the nearest point changed
                                        $chartContainer.find("#positionTagVertical").html(that.data[nearX]["te"]).css("left", crosshairX + "px");
                                        $chartContainer.find("#crosshair").css("left", crosshairX + "px");

                                        $chartContainer.find("#point").css({
                                            "left": pointX + "px",
                                            "top": pointY + "px"
                                        });
                                        $chartContainer.find("#crosshairHorizontal2").css({
                                            'top': pointY + 3 + "px",
                                            'left': +that.pos[0][0] + "px"
                                        });
                                        //for dp formating the canvas crosshair close value
                                        if (that.options.dp != -1) {
                                            var output = new NumberFormat();
                                            output.setPlaces(that.options.dp);
                                            output.setNumber("" + ohlc["c"]);
                                            ohlc["c"] = output.toFormatted();
                                        } else {
                                            ohlc["c"] = parseFloat(ohlc["c"]);
                                        }
                                        $chartContainer.find("#positionTagHorizontal2").css({
                                            'top': pointY + 3 + "px",
                                            'left': pointX + 8 + "px"
                                        }).html(ohlc["c"]);
                                    }
                                }

                                otherTAInfoHeight = 80;
                                otherTAInfo = "";
                                var allTAValueJSON = "";
                                $.each(attributes, function (i, item) {
                                    var x = +that.pos[i][0] + offsetX + 3;
                                    var y = +that.pos[i][1] + offsetY + 1;

                                    var taValue = that._parseTASignaturesHelper(item, x, y);
                                    if (taValue != undefined) {
                                        allTAValueJSON += taValue;
                                    }
                                });
                                if (allTAValueJSON != "") {
                                    that.element.sschart("triggerTAValue", "{\"resultList\":[" + allTAValueJSON.substring(1) + "]}");
                                }

                                if (that.options.dp != -1) {
                                    var ohlcFormat = new NumberFormat();
                                    ohlcFormat.setPlaces(that.options.dp);
                                    ohlcFormat.setNumber(ohlc["c"]);
                                    ohlc["c"] = ohlcFormat.toFormatted();
                                    ohlcFormat.setNumber(ohlc["h"]);
                                    ohlc["h"] = ohlcFormat.toFormatted();
                                    ohlcFormat.setNumber(ohlc["l"]);
                                    ohlc["l"] = ohlcFormat.toFormatted();
                                    ohlcFormat.setNumber(ohlc["o"]);
                                    ohlc["o"] = ohlcFormat.toFormatted();
                                } else {
                                    ohlc["o"] = parseFloat(ohlc["o"]);
                                    ohlc["h"] = parseFloat(ohlc["h"]);
                                    ohlc["l"] = parseFloat(ohlc["l"]);
                                    ohlc["c"] = parseFloat(ohlc["c"]);
                                }

                                that.element.sschart("triggerCrossHairValue", {
                                    date: that.data[nearX]["te"],
                                    open: ohlc["o"],
                                    close: ohlc["c"],
                                    high: ohlc["h"],
                                    low: ohlc["l"]
                                });
                            }//end moveHandlerXY()

                            //touch event handling
                            ele.bind("touchmove", function (event) {
                                //handle touchmove events:or 1 touch point, invoke touchMoveHandlerXY for crosshair positioning,
                                //for 2 touch points, calculate highlighted custom zoom area
                                var e = event.originalEvent;
                                e.preventDefault();
                                if (that.xList && that.xList.length > 0) {
                                    if (e.targetTouches.length == 1) {
                                        //for single touch event

                                        var touch = e.targetTouches[0];

                                        //var offsetX = $("#chartContainer").offset().left;
                                        var offsetX = $("#chartContainer").position().left;

                                        var relativeX = touch.clientX - offsetX;
                                        var nearX = near(that.xList, relativeX);

                                        touchMoveHandlerXY(e, nearX, ele);
                                    } else if (e.targetTouches.length == 2) {
                                        //for 2 touch event,
                                        if (that.allowZoom) {
                                            var touch = e.targetTouches[0];
                                            var touch2 = e.targetTouches[1];

                                            //var offsetX = $("#chartContainer").offset().left;
                                            var offsetX = $("#chartContainer").position().left;

                                            var relativeX = touch.clientX - offsetX;
                                            var nearX = near(that.xList, relativeX);

                                            var relativeX2 = touch2.clientX - offsetX;
                                            var nearX2 = near(that.xList, relativeX2);

                                            var smallNearX = nearX < nearX2 ? nearX : nearX2;
                                            var largeNearX = nearX > nearX2 ? nearX : nearX2;

                                            if ($("#dragArea").length > 0) {
                                                var width = largeNearX - smallNearX;
                                                $("#dragArea").css("left", (offsetX + smallNearX + 1) + "px");
                                                $("#dragArea").css("width", width + "px");
                                            }
                                        }
                                    }
                                }
                            });

                            //handle touchstart events: same implementation as of touchmove
                            ele.bind("touchstart", function (event) {
                                var e = event.originalEvent;
                                e.preventDefault();
                                if (that.xList && that.xList.length > 0) {
                                    if (e.targetTouches.length == 1) {
                                        var touch = e.targetTouches[0];

                                        //var offsetX = ele.offset().left;
                                        var offsetX = ele.position().left;

                                        var relativeX = touch.clientX - offsetX;
                                        var nearX = near(that.xList, relativeX);

                                        touchMoveHandlerXY(e, nearX, ele);
                                    } else if (e.targetTouches.length == 2) {
                                        if (that.allowZoom) {
                                            var touch = e.targetTouches[0];
                                            var touch2 = e.targetTouches[1];

                                            //var offsetX = $("#chartContainer").offset().left;
                                            var offsetX = $("#chartContainer").position().left;

                                            var relativeX = touch.clientX - offsetX;
                                            var nearX = near(that.xList, relativeX);

                                            var relativeX2 = touch2.clientX - offsetX;
                                            var nearX2 = near(that.xList, relativeX2);


                                            var smallNearX = nearX < nearX2 ? nearX : nearX2;
                                            var largeNearX = nearX > nearX2 ? nearX : nearX2;

                                            //var offset = $("#chartContainer").offset();
                                            var offset = $("#chartContainer").position();

                                            var x = offsetX + smallNearX;
                                            var y = offset.top + 4;
                                            var width = largeNearX - smallNearX;
                                            var dragArea = $("<div id='dragArea' x='" + x + "' />").css({
                                                position: "absolute",
                                                top: y + "px",
                                                left: x + "px",
                                                width: width + "px",
                                                height: ($("#chartContainer").height() - 25) + "px",
                                                "z-Index": 999,
                                                "background-color": "#1C89FF",
                                                "opacity": "0.3"
                                            });

                                            $("#chartContainer").append(dragArea);
                                        }
                                    }
                                }
                            });

                            //handle touchend events: trigger custom zoom if theres area selected
                            ele.bind("touchend", function (event) {
                                if (that.xList && that.xList.length > 0) {
                                    if ($("#dragArea").length > 0) {
                                        //var chartX = ele.offset().left;
                                        //var areaOffset = $("#dragArea").offset();
                                        var chartX = ele.position().left;
                                        var areaOffset = $("#dragArea").position();

                                        var fromX = near(that.xList, areaOffset.left - chartX);
                                        var toX = near(that.xList, areaOffset.left + $("#dragArea").width() + 1 - chartX);

                                        if (fromX != toX) {
                                            var _from = data[fromX]["ts"];
                                            var _to = data[toX]["ts"];

                                            $("#dragArea").remove();

                                            ele.sschart({
                                                period: "CUSTOM," + _from + "-" + _to
                                            });
                                            // this._trigger( 'zoomToCustom', null, { from: _from, to:_to } );
                                            ele.sschart("triggerZoomToCustom", {
                                                from: _from,
                                                to: _to
                                            });
                                            ele.sschart("createCanvas");
                                        }
                                    }
                                    $("#dragArea").remove();
                                }
                            });

                            function touchMoveHandlerXY(e, nearX, ele) {
                                //modified move handler for touch event, remove tooltip, fade out, drag zoom in features
                                var idSetTimeoutFadeOutTooltipBox = undefined;
                                var idSetTimeoutFadeOutHorizontalComponents = undefined;
                                var posMax = that.pos.length - 1;
                                var chartWidth = +that.pos[posMax][2] - +that.pos[0][0];
                                var chartHeight = +that.pos[posMax][3] - +that.pos[0][1];

                                $("#chartContainer div.tooltip").remove();

                                //var offset = ele.offset();
                                var offset = ele.position();

                                var offsetX = offset.left;
                                var offsetY = offset.top;

                                var crosshairX = offsetX + nearX;

                                var attributes = that.data[nearX]["at"];
                                var pointX = (+nearX) + offsetX - 3;
                                var pointY = +that.data[nearX]["y"] + offsetY - 3;

                                //Left boundary check - Data obj describes valid point if
                                //the "ric" attribute contains properites (open high low close);
                                //If invalid point is reached, skip performing the rest of actions;
                                //point and crosshairs remain unchanged.
                                var ohlc = that.data[nearX]["rc"];
                                if ($.isEmptyObject(ohlc)) {
                                    return;
                                }

                                var isReachedBoundaryX = false;

                                if (e.clientX > offsetX + chartWidth || e.clientX < offsetX) {
                                    isReachedBoundaryX = true;
                                    if (idSetTimeoutFadeOutHorizontalComponents == undefined) {
                                        idSetTimeoutFadeOutHorizontalComponents = setTimeout(function () {
                                            $("#crosshair").fadeOut(500);
                                            $("#positionTagVertical").fadeOut(500);
                                            $("#point").fadeOut(500);
                                        }, 1000);
                                    }
                                } else {
                                    isReachedBoundaryX = false;
                                    if (idSetTimeoutFadeOutHorizontalComponents != undefined) {
                                        clearTimeout(idSetTimeoutFadeOutHorizontalComponents);
                                        idSetTimeoutFadeOutHorizontalComponents = undefined;
                                    }
                                    $("#crosshair").show();
                                    $("#positionTagVertical").show();
                                    $("#point").show();
                                }

                                if ($("#crosshair").length == 0) {
                                    var point = $("<div  id='point' />").css({
                                        position: "absolute",
                                        top: pointY + 1 + "px",
                                        width: "7px",
                                        height: "7px",
                                        left: pointX + 1 + "px",
                                        background: "url('" + LabCI.SSDLConf.DATA_PATH + pointPath + "') no-repeat 0px 0px",
                                        "z-Index": 990

                                    });
                                    ele.append(point);

                                    var ver = $("<div id='crosshair' />").css({
                                        width: "1px",
                                        height: ($("#chartContainer").height() - 25) + "px",
                                        //"background-color": "#FF8426",
                                        //"background-color": "orange",
                                        "background-color": "#DEB887",
                                        position: "absolute",
                                        top: (offsetY + 3) + "px",
                                        //left: (+nearX) + "px",
                                        left: pointX + 3 + "px",
                                        "opacity": "1"
                                    });

                                    var ver2Height = 12;
                                    var ver2VerticalAdjusment = -ver2Height / 2;
                                    var ver2 = $("<div id='positionTagVertical'></div>").css({
                                        width: "auto",
                                        padding: "0 2px 1px 2px",
                                        "text-align": "right",
                                        height: ver2Height + "px",
                                        "background-color": "#555555",
                                        "color": "white",
                                    //    "font": "12px arial",
                                        "font-size": "10px",
                                        //border: "1px solid orange",
                                        position: "absolute",
                                        top: (offsetY + $("#chartContainer").height() - 14) + "px",
                                        "margin-top": ver2VerticalAdjusment,
                                        "opacity": "1",
                                        "left": crosshairX + "px"
                                    });

                                    ele.append(ver);
                                    ele.append(ver2);

                                    var chartElementRegion = $("<div id='chartElementRegion' />").css({
                                        width: chartWidth + "px",
                                        height: chartHeight + "px",
                                        position: "absolute",
                                        top: offsetY + 4 + "px",
                                        left: that.pos[0] + "px",
                                        "z-index": 999
                                    });

                                    ele.append(chartElementRegion);
//                                    if (/MSIE 6/i.test(navigator.userAgent)) {
//                                        chartElementRegion.css("background-image", "url(1x1.png)");
//                                    }
                                } else {
                                    if (isReachedBoundaryX == false) {
                                        $("#crosshair").css("left", crosshairX + "px");
                                        $("#positionTagVertical").css("left", crosshairX + "px");

                                        $("#point").css({
                                            "left": pointX + "px",
                                            "top": pointY + "px"
                                        });
                                    }
                                }

                                if ($("#crosshairHorizontal2").length == 0) {
                                    var crosshairHorizontal2 = $("<div id='crosshairHorizontal2' />").css({
                                        width: chartWidth + "px",
                                        // width : "100%",
                                        height: "0px",
                                        "border-top": "1px solid #DEB887",
                                        //"border-top":"1px solid orange",
                                        //"background-color": "orange",
                                        position: "absolute",
                                        top: pointY + 3 + "px",
                                        left: offsetX + "px",
                                        "opacity": "1"
                                    });
                                    $("#chartContainer").append(crosshairHorizontal2);

                                    var ver2Height = 12;
                                    var ver2VerticalAdjusment = -ver2Height / 2;
                                    var positionTagHorizontal2 = $("<div id='positionTagHorizontal2'></div>").css({
                                        width: "auto",
                                        padding: "0px 2px 1px 2px",
                                        height: ver2Height + "px",
                                    //    "font": "12px arial",
                                        "font-size": "10px",
                                        //"background-color": "yellow",
                                        //border: "1px solid orange",
                                        "background-color": "#555555",
                                        "color": "white",
                                        position: "absolute",
                                        top: pointY + 3 + "px",
                                        left: pointX + "px",
                                        //right: "0px",
                                        "margin-top": ver2VerticalAdjusment,
                                        "opacity": "1"
                                    });
                                    $("#chartContainer").append(positionTagHorizontal2);
                                } else {
                                    $("#crosshairHorizontal2").css("top", pointY + 3 + "px");
                                    $("#positionTagHorizontal2").css("top", pointY + 3 + "px");
                                    $("#positionTagHorizontal2").css("left", pointX + 10 + "px");
                                }

                                var allTAValueJSON = "";

                                $.each(attributes, function (i, item) {
                                    var x = +that.pos[i][0] + offsetX + 3;
                                    var y = +that.pos[i][1] + offsetY + 1;
                                    if (that.isVAP == true) {
                                        if (i == 0) {
                                            x = 5;
                                        } else {
                                            x = 66;
                                        }
                                    }
                                    var taValue = that._parseTASignaturesHelper(item, x, y);

                                    if (taValue != undefined) {
                                        allTAValueJSON += taValue;
                                        //             ele.sschart("triggerTAValue", taValue);
                                    }
                                });

                                if (allTAValueJSON != "") {
                                    that.element.sschart("triggerTAValue", "{\"resultList\":[" + allTAValueJSON.substring(1) + "]}");
                                }

                                var quote = that.data[nearX]["rc"];

                                $("#positionTagVertical").html(that.data[nearX]["te"]);
                                $("#positionTagHorizontal2").html(quote["c"]);
                                ele.sschart("triggerCrossHairValue", {
                                    date: that.data[nearX]["te"],
                                    open: quote["o"],
                                    close: quote["c"],
                                    high: quote["h"],
                                    low: quote["l"]
                                });
                            }//end touchMoveHandlerXY()
                        }//end imageOnly check
                    }//end uuid==""
                }
            } else {
                this.xList = [];
                this.element.find("#dataContainer").html("");
                sschartImg = $("<img id='chart'/>");
                $(sschartImg).attr("src", errorImgURL + "width=" + width + "&height=" + height + "&lang=" + LabCI.getLang());
                ele.append(sschartImg);
            }
        }, //end callbackmethod

        _tsChartCallbackHandler: function (json) {
            var that = this;
            var tschartImg;
            var ele = this.element;
            ele.empty();
            var options = this.options;
            var assettype = options.assettype;
            var cc = options.cc;
            var width = ele.width() - tsmargin * 2;

            if (json && !jQuery.isEmptyObject(json)) {
                if (json["errormsg"] != undefined) {
                    this.tsxList = [];
                    tschartImg = $("<img id='tschart'/>");
                    $(tschartImg).attr("src", LabCI.SSDLConf.DATA_PATH + canvasImgURL +"uuid=" + "&span=DAILY&assettype=" + assettype + "&cc=" + cc);
                    ele.append(tschartImg);
                } else {
                    try {
                        this.tsxList = json["x"];
                        function s(a, b) {
                            return a > b ? 1 : -1;
                        }
                        this.tsxList = $(this.tsxList).sort(s);
                        this.tsdata = json["data"];

                        var tsuuid = json["uuid"];
                        var tsinnerDiv = $("<div id='tschartContainer'/>");
                        var tsoutterDiv = $("<div id='tschartContainerVisible'/>").css("visibility", "hidden").append(tsinnerDiv);
                        var img = LabCI.SSDLConf.DATA_PATH + canvasImgURL + "uuid=" + tsuuid + "&width=" + width + "&height=" + tsheight + "&span=DAILY&assettype=" + assettype + "&cc=" + cc;
                        $(tsinnerDiv).css({'background': '#FFFFFF url("' + img + '") no-repeat ' + tsmargin + 'px 0'});
                        $(tsoutterDiv).css("visibility", "visible");
                        ele.append(tsoutterDiv);

                        var l_margin = $('<div/>').attr('id', 'l_margin').addClass('ts_margin').css({left: 0, 'float': 'left', 'border-right': '1px solid #000000'});
                        $(tsinnerDiv).append(l_margin);

                        var r_margin = $('<div/>').attr('id', 'r_margin').addClass('ts_margin').css({right: 0, 'float': 'right', 'border-left': '1px solid #000000'});
                        $(tsinnerDiv).append(r_margin);

                        var $dragicon_left = $('<div/>').addClass('dragicon left');
                        $dragicon_left.bind('mousedown touchstart', function (event) {
                            if (that.tsxList)
                                that.leftdrag = true;
                        })
                        $(tsinnerDiv).append($dragicon_left);

                        var $dragicon_right = $('<div/>').addClass('dragicon right');
                        $dragicon_right.bind('mousedown touchstart', function (event) {
                            if (that.tsxList)
                                that.rightdrag = true;
                        })
                        $(tsinnerDiv).append($dragicon_right);

                        var prev_month;
                        var base = tsmargin;
                        var bottom = 0;
                        for (var i = 0; i < this.tsxList.length; i++) {
                            var ts = this.tsdata[this.tsxList[i]].ts;
                            var date = new Date(ts);
                            var month = monthmap[date.getMonth()];
                            var year = date.getFullYear().toString().substr(2);
                            var this_month = month + ' ' + year;
                            if (prev_month != this_month && date.getMonth() % 3 == 1) {
                                var $date_indi = $('<div/>').addClass('date_indi').css({left: parseInt(this.tsxList[i]) + base});
                                var $date_indi_label = $('<div/>').addClass('date_indi_label').css({left: parseInt(this.tsxList[i] + base + 3), bottom: bottom}).html(this_month);
                                $(tsinnerDiv).append($date_indi).append($date_indi_label);
                            }
                            prev_month = this_month;
                        }
                        setTSPos();
                    } catch (e) {
                        console.log(e);
                    }
                }


                that.element.find('#tschartContainer').bind('mouseup mouseleave touchend touchleave', function (evt) {
                    var e = evt.clientX ? evt : evt.originalEvent;

                    e.preventDefault();
                    if (that.tsxList) {
                        if (that.leftdrag || that.rightdrag) {

                            that.leftdrag = false;
                            that.rightdrag = false;

                            var x1 = that.element.find('.dragicon.left').position().left + 9 - tsmargin;
                            var x2 = that.element.find('.dragicon.right').position().left + 9 - tsmargin;

                            var _from = that.tsdata[x1]["ts"];
                            var _to = that.tsdata[x2]["ts"];

                            that.element.sschart({
                                period: "CUSTOM," + _from + "-" + _to
                            });
                            // this._trigger( 'zoomToCustom', null, { from: _from, to:_to } );
                            that.element.sschart("triggerZoomToCustom", {
                                from: _from,
                                to: _to
                            });
                            that.element.sschart("createCanvas");

                        }
                    }

                });

                that.element.find('#tschartContainer').bind('mousemove touchmove', function (evt) {
                    var e = evt.clientX ? evt : evt.originalEvent;
                    e.preventDefault();
                    if (e.targetTouches)
                        e = e.targetTouches[0];

                    if (that.tsxList) {
                        var offsetX = that.element.find("#tschartContainer").offset().left;
                        if (that.leftdrag) {
                            var x = Math.max(near(that.tsxList, e.clientX - tsmargin - offsetX) + tsmargin, tsmargin);

                            var rightx = that.element.find('.dragicon.right').position().left + 9;
                            if (x >= rightx)
                                return;

                            that.element.find('.dragicon.left').css({left: x - 9});
                            that.element.find('#l_margin').css({right: that.element.find('#tschartContainer').width() - x});
                        }

                        if (that.rightdrag) {
                            var x2 = Math.max(near(that.tsxList, e.clientX - tsmargin - offsetX) + tsmargin, tsmargin);

                            var leftx = that.element.find('.dragicon.left').position().left + 9;
                            if (x2 <= leftx)
                                return;

                            that.element.find('.dragicon.right').css({left: x2 - 9});
                            that.element.find('#r_margin').css({left: x2});
                        }
                    }
                });


                function setTSPos() {
                    if (that.data && that.tsdata) {
                        var base = tsmargin;
                        var $l_margin = that.element.find('#l_margin');
                        var $r_margin = that.element.find('#r_margin');

                        var ts1 = that.data[that.xList[0]].ts;
                        var ts2 = that.data[that.xList[that.xList.length - 1]].ts;
                        var x1;
                        var x2;

                        for (var i = 0; i < that.tsxList.length; i++) {
                            if (ts1 == that.tsdata[that.tsxList[i]].ts) {
                                x1 = that.tsxList[i];
                            }
                            if (ts2 == that.tsdata[that.tsxList[i]].ts) {
                                x2 = that.tsxList[i];
                            }
                            if (x1 && x2)
                                break;
                        }

                        if (x1 == null) {
                            x1 = that.tsxList[0];
                        }

                        if (x2 == null) {
                            x2 = that.tsxList[that.tsxList.length - 1];
                        }

                        if (x1 != null && x2 != null) {
                            that.element.find('.dragicon.left').css({left: base + x1 - 9});
                            $l_margin.css({right: ele.width() - x1 - base})
                            that.element.find('.dragicon.right').css({left: base + x2 - 9});
                            $r_margin.css({left: base + x2});
                        }
                    }
                }
            }
        },
        _collectTASignaturesInfo: function () {
            var that = this;
            $.each(that.taSignatures, function (i, key) {
                var realKey = "";
                var subKey = "";
                var subKeyT = "";
                var subKeyL = "";
                var colorFormal = that.colors[key];
                var color = "#000000";
                if (colorFormal != undefined) {
                    color = colorFormal.match(/.+([a-fA-F0-9]{6})$/);
                    color = '#' + color[1];
                }
                //general case
                var halves = key.split(/\)\./);
                if (halves.length == 2) {
                    realKey = halves[0] + ")";
                    subKey = halves[1];
                } else {
                    var halves2 = key.split(/\./);
                    if (halves2.length == 3) {
                        realKey = halves2[0];
                        subKey = halves2[1] + "." + halves2[2];
                    } else {
                        realKey = key;
                        subKey = "";
                    }
                }
                subKeyT = subKey;
                subKeyL = subKey;

                if (that._TALABELS[subKey] !== undefined) {
                    subKeyT = that._TALABELS[subKey];
                    subKeyL = subKeyT;
                }
                var isMACD = false;
                realKey = realKey.replace(/\s+/g, "");
                if (/^MA\(/.test(realKey)) {
                    realKey = realKey.replace(/^MA\((SMA|MEMA|EMA|WMA),([^\)]+)\)$/, "$1($2)");
                } else if (/^ICH\(/.test(realKey)) {
                    var pStg = realKey.replace(/.+\((.+)\)/, "$1");
                    var params = pStg.split(",");
                    if (params.length == 3) {
                        if (subKey == "Tenkan") {
                            subKeyL += params[0];
                        } else if (subKey == "Kijun" || subKey == "Chikou") {
                            subKeyL += params[1];
                        }
                    }
                } else if (/^MACD\(/.test(realKey)) {
                    realKey = realKey.replace(/\((SMA|MEMA|EMA|WMA),/, "(");
                    var pStg = realKey.replace(/.+\((.+)\)/, "$1");
                    var params = pStg.split(",");
                    if (params.length == 3) {
                        if (subKey == "MACD") {
                            subKeyL = params[0] + "," + params[1];
                        } else if (subKey == "Signal") {
                            subKeyL += params[2];
                        }
                    }
                    isMACD = true;
                } else if (/^KRI\(/.test(realKey)) {
                    //var ma = realKey.replace(/.+\((SMA|MEMA|EMA|WMA).+/, "$1");
                    //realKey = realKey.replace(/(SMA|MEMA|EMA|WMA)/, that._TALABELS[ma]);
                    var p = realKey.replace(/.+(Close|Volume).+/, "$1");
                    realKey = realKey.replace(/(Close|Volume)/, that._TALABELS[p]);
                    var str = realKey.match(/,\d+/g);
                    if (str.length == 2) {
                        realKey = realKey.replace(/KRI/, "KRI_2");
                    }
                } else if (/^FKD|VC|CO|TVMA|EOM|^FI|^MFI|RMI\(/.test(realKey)) {
                    var ma = realKey.replace(/.+\((SMA|MEMA|EMA|WMA).+/, "$1");
                    realKey = realKey.replace(/(SMA|MEMA|EMA|WMA)/, that._TALABELS[ma]);
                } else if (/^RSI\(/.test(realKey)) {
                    var ma = realKey.replace(/.+\((SMA|MEMA|EMA|WMA).+/, "$1");
                    realKey = realKey.replace(/(SMA|MEMA|EMA|WMA)/, that._TALABELS[ma]);
                    realKey = realKey.replace(/MA,\s*1,/, "MA,");
                } else if (/^(ADXR|ENV|DMI)\(/.test(realKey)) {
                    realKey = realKey.replace(/\((SMA|MEMA|EMA|WMA),/, "(");
                } else if (/^(VOSC|POSC|VE)\(/.test(realKey)) {
                    realKey = realKey.replace(/\((SMA|MEMA|EMA|WMA),/, "(");
                    realKey = realKey.replace(/,?Volume|Close,?/, "");
                } else if (/^RSI\(/.test(realKey)) {
                    realKey = realKey.replace(/^RSI\(([^,]+),1,([0-9]+)\)$/, "RSI($1,$2)");
                } else if (/^Volume\./.test(realKey)) {
                    realKey = "Volume";
                } else if (/^PreviousClose/.test(realKey)) {
                    realKey = "PreviousClose";
                } else if (/^FIB\./.test(realKey)) {
                    realKey = "FIB";
                } else if (/^SKD\(/.test(realKey)) {
                    realKey = realKey.replace(/^SKD\(/, "SKD(" + that._TALABELS["SMA"] + ","); // SKD always SMA in SSChart
                }

                //convert label to local language
                var taUni = realKey.replace(/\(.+/, "");
                var taUni2 = realKey.replace(/.+\(/, "(");
                if (!/^\(/.test(taUni2)) {
                    taUni2 = "";
                }
                var legendStr = "";
                if (legendStr == "") {
                    if (taUni.substring(0, 6) == 'Margin') {
                        taUni = 'Margin';
                    }
                    var taName = that._TANAMES[taUni];
                    var params = taUni2;
                    if (taUni == "SAR") {
                        params = params.replace(/\(([^,]+),([^,]+),([^,]+)\)/, "(" + that._TALABELS["SAR_Param1"] + " $1, " + that._TALABELS["SAR_Param2"] + " $2, " + that._TALABELS["SAR_Param3"] + " $3)");
                    } else if (taUni == "VAP") {
                        taName = "";
                    }
                    if (taUni == "LINE"){
                        legendStr = taName;
                    }else{
                        legendStr = taName + params;                        
                    }
                }
                if (/^(FKD|RSI|TVMA|VC)\(/.test(realKey)) {
                    taUni2 = taUni2.replace(/^\([^A-Z]+((MEMA|SMA|EMA|WMA),.+)\)$/, "$1");
                }
                var params = "";
                if (/^(SMA|EMA|WMA|ICH|MACD|SD|Volume|VAP|OBV|FIB|PCV|RCI)\(/.test(realKey)) {
                    //not showing parameters
                } else {
                    params = taUni2.replace(/\(([^\(\)]+)\)/, "$1");
                }
                var keyValue = that._TANAMES[taUni] + " " + subKeyL + " " + params;
                if (that._TANAMESSHORT[taUni] !== undefined) {
                    keyValue = that._TANAMESSHORT[taUni] + " " + subKeyL + " " + params;
                }

                if (that.taSignaturesMap[key] == undefined) {
                    that.taSignaturesMap[key] = {
                        "kVal": keyValue,
                        "tSrs": "<span style='color:" + color + "'>" + keyValue.replace(/\s+/, "<br />") + "</span>",
                        "subT": subKeyT,
                        "color": color,
                        "legendStr": legendStr,
                        "isMACD": isMACD
                    };
                }
            });
        },
        _parseTASignaturesHelper: function (item, x, y) {
            var that = this;
            var taListCallbackStr = "";

            $.each(item, function (index, attribute) {
                var legendStr = "";
                var sParams = "";
                var sParamsText = "";
                var valueStr = "";
                var callbackValueStr = "";
                var callbackColourStr = "";
                var callbackUnitStr = "";
                var type = "";
                $.each(attribute, function (key, value) {
                    key = that.taSignatures[key];
                    type = key;
                    if (key == "VAP") {
                        value = that.vapValue;
                    }

                    if (value && value != "null" && value != "-") {
                        value = convertKMB(value);
                        if (key == "TP") {
                            value = value.split(";")[1];
                        }

                        legendStr = that.taSignaturesMap[key]["legendStr"];
                        var keyValue = that.taSignaturesMap[key]["kVal"];
                        var subKeyT = that.taSignaturesMap[key]["subT"];
                        var color = that.taSignaturesMap[key]["color"];
                        var colorB = (color == "#000000") ? "#FFFFFF" : color;
                        //MACD shows dynamic colors
                        if (that.taSignaturesMap[key]["isMACD"] && subKeyT == "OSCI") {
                            if (value > 0) {
                                color = "#EE0101";
                            } else if (value < 0) {
                                color = "#009ACD";
                            }
                            colorB = color;
                        }
                        if (subKeyT != undefined && /[0-9]+/.test(subKeyT)) {
                            sParams += "<span style='color:" + color + "'>" + subKeyT + "</span>,";
                            sParamsText += subKeyT + ",";
                            valueStr += "<span style='color:" + color + "'>" + value + "</span> ";
                        } else if (subKeyT != undefined && /^[^0-9]/.test(subKeyT)) {
                            valueStr += "<span style='color:" + color + "'>" + subKeyT + "&nbsp;" + value + "</span> ";
                        } else {
                            valueStr += "<span style='color:" + color + "'>" + value + "</span> ";
                        }
                        callbackColourStr += ",\"" + color + "\"";
                        callbackUnitStr += ",\"" + subKeyT + "\"";
                        otherTAInfo += "<tr><td style='padding-right: 20px;color:" + colorB + "'>" + keyValue + " </td><td style='text-align:right;color:" + colorB + "'>" + value + "</td></tr>";
                        otherTAInfoHeight += 15;
                    }
                    var oneTALineJson = ", {\"value\":\"" + value + "\",\"color\": \"" + color + "\",\"unit\": \"" + subKeyT + "\" }"
                    callbackValueStr += oneTALineJson;
                });
                taListCallbackStr += ", {\"name\":\"" + legendStr + "\",\"x\":" + x + ",\"y\":\"" + y + "\",\"type\":\"" + type + "\", \"data\":[" + callbackValueStr.substring(1) + "]}"
            });
            if (taListCallbackStr != "") {
                return taListCallbackStr;
            }
        }
    });//end widget("ui.sschart")

})(jQuery);



/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var defaultPeriods = new Array();
defaultPeriods[0] = {"MINUTE_1":"DAY_1","MINUTE_5":"DAY_1","MINUTE_15":"DAY_2",
    "HOURLY":"DAY_5","DAILY":"MONTH_6","WEEKLY":"YEAR_1",
    "MONTHLY":"YEAR_3","QUARTERLY":"YEAR_10"};
defaultPeriods[1] = {"MINUTE_1":"DAY_1","MINUTE_5":"DAY_1",
    "HOURLY":"DAY_2","DAILY":"MONTH_6","WEEKLY":"YEAR_1",
    "MONTHLY":"YEAR_2"};
defaultPeriods[2] = {"MINUTE_1":"DAY_1","MINUTE_5":"DAY_1","MINUTE_15":"DAY_2",
    "HOURLY":"DAY_5","DAILY":"MONTH_6","WEEKLY":"YEAR_1"};

function updateDefaultPeriod(e)
{
    var it = $("#InstrumentType").val();
    var p = $(e.target).val();
    var m;
    if (it=="JP_STOCK"||it=="ASIA_STOCK"||it=="JP_INDEX"||it=="ASIA_INDEX"||it=="OTHER_INDEX"){
      m = defaultPeriods[0];
    }else if (it=="JP_FOREX"||it=="ASIA_FOREX"){
      m = defaultPeriods[1];
    }else if (it=="FUTURE2"||it=="N225OPTION"||it=="COMMODITY"){
      m = defaultPeriods[2];
    }
    if (m !== undefined){
      $("#"+p).val(m[p]);
    }
}

function searchFocus(id){
    var obj = $("#"+id+" input");
    if (obj.value=="")
        obj.value = "";
    else{
        obj.select();
    }
}

    
function isKeyInAttributes(key){
    var isKeyIn = false;
            try{
                $.each(data, function(i, v){
                    $.each(v["at"], function(k, l){
                        $.each(l, function(o, j){
                            if (key in j){
                                isKeyIn=true;
                                     return false;
                            } 
                        });
                        if (isKeyIn==true) return false;
                    });
                    if (isKeyIn==true) return false;
                });
            }catch(e){
                isKeyIn = false;
            }
    return isKeyIn;
}

function convertKMB(v){

     var value = v;
     if (value >= 1000000000 || value <= -1000000000){
         value = (value/1000000000).toFixed(2) + "B";
     }
     else if (value >= 1000000 || value <= -1000000){
         value = (value/1000000).toFixed(2) + "M";
     }
     else if (value >= 100000 || value <= -100000){
         value = Math.floor(value/1000) + "K";
     }
     return value;
}

function getUrlVarsSpecial()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        //"good_luck_buddy".split(/_(.+)?/)[1]
        var s = hashes[i];

        hash = s.split('=');
        vars.push(hash[0]);
        vars[hash[0]] = s.substring(s.indexOf("=")+1);

    }
    return vars;
}


//util functions to map value for TA: VAP
function getVAPxyMap(VAPxyMap,data){
    if (VAPxyMap == null){
        VAPxyMap = new Array();
        $.each(data,function(x, y){
            if (x < 71){
                VAPxyMap[ data[x]["y"] ] = x;
            }
        });
    }
    return VAPxyMap;
}

function getVAPSortedys(VAPSortedys,data){
    if (VAPSortedys == null){
        VAPSortedys = new Array();
        $.each(data,function(x, y){
            if (x < 71){
                VAPSortedys.push(data[x]["y"]);
            }
        });
        VAPSortedys = VAPSortedys.sort(function(a,b){
            return a-b;
        });
    }
    return VAPSortedys;    
}

function getVAPValue(nearX, vapI, VAPxyMap,VAPSortedys,data){
    var vapValue = "-";
    try{
        var thisVAPxyMap = getVAPxyMap(VAPxyMap,data);
        var thisVAPSortedys = getVAPSortedys(VAPSortedys,data);
        var nearestY = near(thisVAPSortedys,data[nearX]["y"] );
        for (var i in thisVAPxyMap){
            if (i == nearestY){
                vapValue = data[ thisVAPxyMap[i] ]["at"][1][0][vapI] ;
                break;
            }
        }
    }catch(e){
        //somehow VAP value is not retrievable
        vapValue = "-";
    }
    return vapValue;
}

//util functions for common crosshair movement
function near(array, x){
//    var min = 0;
//    var max = array.length - 1;
//    do{
//        var mid = min + Math.ceil( (max - min) / 2);
//        if(x > array[mid+1]){
//            min = mid + 1;
//        }else if(x < array[mid]){
//            max = mid - 1;
//        }else{
//            return array[mid];
//        }
//    } while( max >= min );
//
//    return array[0];
 
    var left;
    var right;

    for (var i=0; i<array.length; i++){
        if (i == 0){
            left = -1;
            right = (array[1] - array[0])/2 + array[0];
        }else if (i == array.length - 1){
            left = (array[i] - array[i-1]) / 2 + array[i-1];
            right = -1;
        }else{
            left = (array[i] - array[i-1]) / 2 + array[i-1];
            right = (array[i+1] - array[i]) / 2 + array[i];
        }

        if (left < 0){
            if (x <= right)
                return array[i];
        }else if (right < 0){
            if (x > left)
                return array[i];
        }else {
            if (x > left && x <= right)
                return array[i];
        }

    }
}     

function next(array, x){
    var min = 0;
    var max = array.length - 1;
    do{
        var mid = min + Math.ceil( (max - min) / 2);
        if(x > array[mid+1]){
            min = mid + 1;
        }else if(x < array[mid]){
            max = mid - 1;
        }else{
            return array[mid+1];
        }
    } while( max >= min );
    return array[0];
}
//function findNearX(mouseX, data){
//    var nearX = 999999999;
//    var diff =  999999999;
//    $.each(data,function(x,item){
//        if(Math.abs(mouseX - x) < diff){
//            diff = Math.abs(mouseX - x);
//            nearX = x;
//        }
//    });
//    return nearX;
//}



//function setTimerUpdateChart(){
//    if (span=="MINUTE_1"||span=="MINUTE_5"||span=="MINUTE_15"||span=="HOURLY"){
//        if (timerUpdateChart === undefined){
//            timerUpdateChart = setInterval("updateChart()", 60000);
//        }
//    }else{
//        if (timerUpdateChart !== undefined){
//            clearInterval(timerUpdateChart);
//            timerUpdateChart = undefined;
//        }
//    }
//}