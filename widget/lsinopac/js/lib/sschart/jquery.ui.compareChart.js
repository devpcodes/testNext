////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015, LabCI Limited
// jquery.ui.compareChart.js...
// -----------------------------------------------------------------------------
// Uses:
//   widget/utils.js
var rendererCompareChartSerletURL = "../sschart/render_compare?";
var compareChartcanvasImgURL = LabCI.SSDLConf.DATA_PATH + "../sschart/chart_img.gif?";
var printCompareChartURL = "chart/comparechartpdf?";
var blankImg = "/lsinopac/images/sschart/space.gif";
(function($) {
    
    var compareChartQid= 0;
    var compareEle;
    
    //default widget options
    $.widget("ui.compareChart", {  
        options: {
            ricdetails:"",
            period:"MONTH_3",
            span:"DAILY",
            //  comp: ".HSI:;.N225:",
            caption:"",
            locale: "jp",
            instruement: "",
            rp: "false",
            imageOnly:"false"
        },
       
        _create: function() {
            this.createCompareCanvas();
        },
        reload: function() {
            this.createCompareCanvas();
        },
       
        destroy: function() {
            this.element.next().remove();
        },
         
        addCompRic: function( value ) {
            //to add a compare ric, value must be in format: xxxx-yyyyyy or xxxx
            //where xxxx=ric code, yyyyyy=hex color code
            var oldCompString=this.options.comp;
            if(oldCompString!=""){
                this._setOption("comp", this.options.comp+";"+value);
                this.createCompareCanvas();
            }
        },
        removeCompRic: function( value ) {
            //to remove a compare ric
            var compString=this.options.comp;
            var oldCompArray=compString.split(";");
            
            if(oldCompArray.length>1){
                for(var i=1;i<oldCompArray.length;i++){
                    if(oldCompArray[i].split("-")[0]==value){
                        compString=compString.replace(";"+oldCompArray[i],"");
                    }
                }
                this._setOption("comp", compString);
                this.createCompareCanvas();
            }
        },
        changePrimaryRic: function( value ) {
            //to change the primary ric, value must be in format: xxxx-yyyyyy or xxxx
            //where xxxx=ric code, yyyyyy=hex color code
            var compString=this.options.comp;
            var oldCompArray=compString.split(";");
            var newRicArray=value.split("-");
            if(newRicArray.length==1){
                //only change RIC, colour code remained the same
                compString=compString.replace(oldCompArray[0].split("-")[0],value);
                this._setOption("comp", compString);
                this.createCompareCanvas();
            }else if(newRicArray.length==2){
                //change RIC and colour code
                compString=compString.replace(oldCompArray[0],value);
                this._setOption("comp", compString);
                this.createCompareCanvas();
            }
          
        },
         
        addLongCompRic: function( value ) {
            //to add a compare ric, value must be in format: xxxx-yyyyyy or xxxx
            //where xxxx=ric code, yyyyyy=hex color code
            var oldLongCompString=this.options.longcomp;
            if(oldLongCompString!=""){
                this._setOption("longcomp", this.options.longcomp+";"+value);
            //                  this.createCompareCanvas();
            }
        },
        removeLongCompRic: function( value ) {
            //to remove a compare ric
            var longCompString=this.options.longcomp;
            var oldLongCompArray=longCompString.split(";");
            
            if(oldLongCompArray.length>1){
                for(var i=1;i<oldLongCompArray.length;i++){
                    if(oldLongCompArray[i].split("-")[0]==value){
                        longCompString=longCompString.replace(";"+oldLongCompArray[i],"");
                    }
                }
                this._setOption("longcomp", longCompString);
            //                this.createCompareCanvas();
            }
        },
        changeLongPrimaryRic: function( value ) {
            //to change the primary ric, value must be in format: xxxx-yyyyyy or xxxx
            //where xxxx=ric code, yyyyyy=hex color code
            var longCompString=this.options.longcomp;
            var oldLongCompArray=longCompString.split(";");
            var newRicArray=value.split("-");
            if(newRicArray.length==1){
                //only change RIC, colour code remained the same
                longCompString=longCompString.replace(oldLongCompArray[0].split("-")[0],value);
                this._setOption("longcomp", longCompString);
            //                this.createCompareCanvas();
            }else if(newRicArray.length==2){
                //change RIC and colour code
                longCompString=longCompString.replace(oldLongCompArray[0],value);
                this._setOption("longcomp", longCompString);
            //                this.createCompareCanvas();
            }
          
        },
        
        _setOption: function(option, value) {
            this.element.empty();
            this.element.unbind();
            $.Widget.prototype._setOption.apply( this, arguments );
        },
        
        setMultiOption: function( value ) {
            if ( value != undefined ) {
                var valuePairsArray= value.split("|");
                for(i=0;i<valuePairsArray.length;i++){
                    var valuePair= valuePairsArray[i].split(":");
                    this._setOption(valuePair[0],valuePair[1]);
                }
                this.createCompareCanvas();
            }
        },
        triggerCrossHairValue:function(value){
            this._trigger('onCrossHairMove', null,value);
        },
        triggerRPValid:function(value){
            this._trigger('onRPValid', null,value);
        },
        triggerIsRebase: function ( value ){
            this._trigger('onRebaseTrigger', null,value);
        },
        
        triggerChange:function(value){
            this._trigger('onChange', null, value);
        },
        
        createCompareCanvas: function() {
            var that=this;
            var opt=this.options;
            var comp=opt.comp;
            if(comp==""||comp==undefined||comp==null){
                
                //when ric request is empty string, append the blankImg and bypass all servlet request
                this.element.find("#crosshair").remove();
                this.element.find("#compareChartContainer div").remove();
                this.element.empty()
                this.xList = [];
                var sschartImg = $("<img id='chart'/>");
                $( sschartImg ).attr("src", blankImg );
                this.element.append( sschartImg );
            }else{
                var ts=new Date().getTime() ;
                compareEle=this.element;
                compareEle.empty()
                compareChartQid++;
                this.isRPChart=opt.rp;
                var height  = parseInt(compareEle.css('height'), 10);
                var width   =parseInt( compareEle.css('width'),10);
                var url = rendererCompareChartSerletURL+"width=" +width+
                "&height="+height +
                "&span=" + opt.span +
                "&caption=" + opt.caption +
                "&type=" + opt.type +
                "&instrument="+opt.instrument+
                "&locale=" +opt.locale+
                "&comp=" + opt.comp +
                "&ts="+ts+
                "&imageOnly="+opt.imageOnly+
                "&element="+this.element.attr("id")+
                "&callback=?";
                if(opt.period.indexOf("CUSTOM")==0 ){
                    url += "&period=CUSTOM" + "&from=" + opt.period.split(",")[1].split("-")[0] + "&to=" + opt.period.split(",")[1].split("-")[1];
                }else{
                    url+="&period=" + opt.period;
                }
                url+="&theme="+getAppTheme()+"&lang="+getAppLang();
                //alert("compareChart.js: url="+url);
                $(that).loaddata("compchartdata", url, function(result){
                    that._compareChartCallbackHandler(result.data);
                });
            }
        },
        
        print: function() {
            var that=this;
            var options= this.options;
            var comp=options.comp;
            if(comp==""||comp==undefined||comp==null){
            }
            else{
                var ts=new Date().getTime() ;
                //alert(encodeURIComponent(options.ricdetails));
                var url = printCompareChartURL +
                "span=" + options.span +
                "&caption=" + options.caption +
                "&type=" + options.type +
                "&instrument="+options.instrument+
                "&locale=" +options.locale+
                "&comp=" + options.comp +
                "&longcomp=" + options.longcomp +
                "&ts="+ts+
                "&element="+this.element.attr("id")+
                "&callback=?";
                if(options.period.indexOf("CUSTOM")==0 ){
                    url += "&period=CUSTOM" + "&from=" + options.period.split(",")[1].split("-")[0] + "&to=" + options.period.split(",")[1].split("-")[1];
                }else{
                    url+="&period=" + options.period;
                }
                url+="&theme=theme-white&lang="+getAppLang();
                //                alert(url);
                window.open(url);
            }
        },
        _compareChartCallbackHandler: function(json){
            var that=this;
            var  ele = this.element;
            var o = this.options;
            var    height  = parseInt(ele.css('height'), 10);
            var  width   =parseInt( ele.css('width'),10);
            var sschartImg;
            this.element.find("#compareChartContainer").remove();
            ///////////////////////////////////////////////////////////
            if(json && !jQuery.isEmptyObject(json) ){
                function showChart(w,h,uuid,ele,o){
                    var innerDiv=$("<div id='compareChartContainer'/>");
                    $(innerDiv).attr("style", "height:"+h+"px" );
                    if (/MSIE 6/i.test(navigator.userAgent)){
                        try{
                            that.element.find(innerDiv+" img").remove();
                        }catch(e){}
                        var chartNonIE6com = $("<img id='chartIE6com' width="+w+" height="+h+" />");
                        innerDiv.append( chartNonIE6com );
                        $(chartNonIE6com).attr("src", compareChartcanvasImgURL+"uuid=" + uuid + "&width="+w+"&height="+h+"&theme="+getAppTheme()+"&lang="+getAppLang()+"&span="+o.span+"&comp="+o.comp);
                    }else{
                        //$("#com").css("background-image","url(chart_img.gif?uuid=" + uuid + "&width="+w+"&height="+h+")");
                        //$("#rp").css("background-image","url(chart_img.gif?uuid=" + uuid + "-rp&width="+w+"&height="+h+")");
                        try{
                            that.element.find(innerDiv+" img").remove();
                        }catch(e){}
                        var chartNonIE6com = $("<img id='chartNonIE6com' width="+w+" height="+h+" />");
                        innerDiv.append( chartNonIE6com );
                        $(chartNonIE6com).attr("src", compareChartcanvasImgURL+"uuid=" + uuid + "&width="+w+"&height="+h+"&theme="+getAppTheme()+"&lang="+getAppLang()+"&span="+o.span+"&comp="+o.comp);
                    }
                    ele.append(  innerDiv );
                    that.xList = json["x"];
                    if(that.xList.length>0){
                        function s(a, b){
                            return a > b ? 1 : -1;
                        }
                        that.xList.sort(s);
                        that.data = json["data"];
                    
                        that.element.compareChart("triggerChange",{
                            from: that.data[that.xList[0]]["ts"],
                            to: that.data[that.xList[that.xList.length-1]]["ts"]
                        });
                    }
                }
                function showRPChart(w,h,uuid,ele){
                    var innerDiv=$("<div id='compareChartContainer'/>");
                    $(innerDiv).attr("style", "height:"+h+"px" );
                    if (/MSIE 6/i.test(navigator.userAgent)){
                        try{
                            $(innerDiv+" img").remove();
                        }catch(e){}
                        var chartNonIE6com = $("<img id='chartIE6com' width="+w+" height="+h+" />");
                        $(innerDiv).append( chartNonIE6com );
                        $(chartNonIE6com).attr("src", compareChartcanvasImgURL+"uuid=" + uuid + "-rp&width="+w+"&height="+h+"&theme="+getAppTheme()+"&lang="+getAppLang()+"&span="+o.span+"&comp="+o.comp);
                    }else{
                        try{
                            $(innerDiv+" img").remove();
                        }catch(e){}
                        var chartNonIE6com = $("<img id='chartNonIE6com' width="+w+" height="+h+" />");
                        $(innerDiv).append( chartNonIE6com );
                        $(chartNonIE6com).attr("src", compareChartcanvasImgURL+"uuid=" + uuid + "-rp&width="+w+"&height="+h+"&theme="+getAppTheme()+"&lang="+getAppLang()+"&span="+o.span+"&comp="+o.comp);
                    }
                    ele.append(  innerDiv );
                }
                function compareChartMoveHandler (x,y,ele,isRPChecked){
  
                    that.element.find("#compareChartContainer div:not(#com, #rp)").remove();
                    var nearX = near(that.xList,x);
                    var offset = ele.parent().offset();
                    var offsetY=0;
                    if( that.element.find("#compareChartContainer").position()!=null){
                        offsetY =  that.element.find("#compareChartContainer").position().top;
                    }
                    var pointY = +that.compareChartData[nearX]["y"] + offsetY - 3;
        
                    if( that.element.find("#compareChartCrosshair").length == 0){
                        //setup crosshair for the first time
                        var ver = $("<div id='compareChartCrosshair' />").css({
                            width: "1px",
                            height: ( that.element.find("#compareChartContainer").height() - 24 ) + "px",
                            "background-color": "#FF8426",
                            position: "absolute",
                            //top:  offset.top+3+"px",
                            top:  5 + "px",
                            left: (+nearX) + "px",
                            // left: (+nearX) +offset.left+ "px",
                            "opacity": "0.4",
                            "display": "block"
                        });
                        that.element.find("#compareChartContainer").append(ver);
                    }else{
                        //update crosshair, only need to adjust its horizontal position
                        that.element.find("#compareChartCrosshair").css("left",(+nearX) + "px");
                    }
     
                    var attributes = that.compareChartData[nearX]["attributes"];
                    var offset =  that.element.find("#compareChartContainer").offset();
                    var x = offset.left + 5;
                    var y = offset.top + 5;
                    var html = "";
                    var t = 1;
                    var triggerValue={};
                    if (isRPChecked=="false"){
                        $.each(attributes,function(key,value){
                            if (value!=null && key!="RP"){
                                var ric={};
                                ric.value=value;
                                ric.color=that.nameMap[key]["color"];
                                ric.date=that.compareChartData[nearX]["time"];
                                triggerValue[key]=ric;
                            }
                        });
                        ele.compareChart("triggerCrossHairValue",{
                            valueList: triggerValue
                        });
                    //   ele.sschart("triggerCrossHairValue","pointValue");
                    }else{
                        $.each(attributes,function(key,value){
                    
                            if (value!=null && key=="RP"){
                                var ric={};
                                ric.value=value;
                                ric.date=that.compareChartData[nearX]["time"];
                                triggerValue[key]=ric;
                
                            }
                        });
                        ele.compareChart("triggerCrossHairValue",{
                            valueList: triggerValue
                        });
                    }
                    var compareChartTooltip = $("<div id='compareChartTooltip'/>").css({
                        position: "absolute",
                        top: y + "px",
                        //left: (+nearX) + "px",
                        left: x + "px",
                        "font-size":"10px",
                        "z-Index": 0,
                        "width": "400px",
                        "height": "100px"
                    }).html(html);
                    that.element.find("#compareChartContainer").append(compareChartTooltip);
        
  
                }//end compareChartMoveHandler
                ///////////////////////////////////////////////////////////
                if(json){
                    ele.compareChart("triggerRPValid",{
                        rp: json["isRPValid"]
                    });
                    ele.compareChart("triggerIsRebase",{
                        isRebase:json["isRebase"]
                    });
                    var uuid = json["uuid"];
                    if(this.isRPChart=="false"){
                        showChart(width,height,uuid,ele,o);
                    }else{
                        showRPChart(width,height,uuid,ele,o);
                    }
                }else{
                    if(this.isRPChart=="false"){
                        showChart(width,height,"",ele,o);
                    }else{
                        showRPChart(width,height,"",ele,o);
                    }
                }
                if(uuid!=""){
                    if(!json["imageOnly"]){
                        this.xList = json["x"];
                        this.compareChartData = json["data"];
                        countries = json["countries"];
                        this.nameMap = json["names"];
                        ele.bind("mousemove",function(e){
                            if(that.xList && that.xList.length > 0){
                                var offset = that.element.offset();
                                var x = e.clientX - offset.left;
                                var y = e.clientY - offset.top;
                                compareChartMoveHandler(x,y,ele,that.isRPChart);
                            }
                        });
                    }
                }//end uuid=="" 
            }else{
                this.xList = [];
                this.element.find("#dataContainer").html("");
                sschartImg = $("<img id='chart'/>");
                $( sschartImg ).attr("src", errorImgURL+"width="+width+"&height="+height+"&theme="+getAppTheme()+"&lang="+getAppLang() );
                ele.append( sschartImg );
            }
        }//end compareChartCallbackHandler
    });//compareChart widget end
})(jQuery);
