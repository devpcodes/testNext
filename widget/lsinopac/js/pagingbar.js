/*
 *  options =
 *  {
 *      pn: 1, // Mandatory, showing which page is currently in
 *      rpp: 10, // Mandatory, the number of records per page, hence to calculate the number of pages and show in the infobox
 *      total: 100,  // Mandatory, the total number of records
 *      noofpagingbuttonsperblock: 5, // Optional, how many page number labels will be visible
 *      showinfobox: true, // Optional, whether to the infobox (i.e. "1 of 50"), default is true
 *      goPage: function(pn) { ... } // Optional, the callback when a paging button is clicked, with "page" to indicate which page to be jumped to
 *  }
 */
(function($) {

    var methods = {

        init: function(options) {
            // For each...
            $(this).each(function() {
                // Get ready
                var $this = $(this);
                
                // Already initialized?
                var data = $this.data("pagingbar");
                if (!data) {
                    // Get ready
//                    var id = $this.attr("id");
//                    var that = this;

                    // 1st time initialization to become a pagingbar
                    data = {};

                    // Process the options...
                    data.options = {
                        pn: 1,
                        rpp: 10,
                        total: 0,
                        goPage: null,
                        showinfobox: true,
                        noofpagingbuttonsperblock: 5
                    };
                    if (options) {
                        // Save the options into this object
                        $.extend(data.options, options);
                    }

                    // Ensure the input are numbers
                    data.options.pn = Number(data.options.pn);
                    data.options.rpp = Number(data.options.rpp);
                    data.options.total = Number(data.options.total);
                    
                    var _totalpn = data.options.total > 0 ? Math.floor((data.options.total-1)/data.options.rpp) + 1 : 0;

                    // Construct the html structure...
                    $this.addClass("pagingbar");
                    var rb = LabCI.WP.CommonRC.getRes("pagingbar", LabCI.WP.AppUtils.getLang());
                    // Prepare the <infobox> into the structure
                    if (data.options.showinfobox && data.options.total > 0) {
                        var _fr = (data.options.pn - 1) * data.options.rpp + 1;
                        var _to = _fr + data.options.rpp -1 ; if (_to > data.options.total) _to = data.options.total;
                        var infomsg = LabCI.WP.CommonRC.doFmtMsg(rb.info, { fr: _fr, to: _to, total: data.options.total });
                        
                        var $infobox = $("<div/>").addClass("infobox").append(infomsg);
                        $this.append($infobox);
                    }
                    
                    // Only make sense to add these controls when there is more than 1 page ;)
                    if (_totalpn > 1) {
                        // Add the <control> to the structure
                        var $control = $("<div/>").addClass("control");
                        $this.append($control);

                        var block = Math.floor((data.options.pn-1) / data.options.noofpagingbuttonsperblock);
                        var startpageno = block * data.options.noofpagingbuttonsperblock + 1;

                        var $goprev = $("<span/>").addClass("menulink prevbtn").html(rb.prev).appendTo($control);
                        if (data.options.pn == 1) $goprev.addClass("disabled");

                        for (var i = startpageno; i < startpageno + data.options.noofpagingbuttonsperblock && i <= _totalpn; i++) {
                            var $gopage = $("<span/>").attr("pn", i).addClass("menulink pagebtn").html(i).appendTo($control);
                            if (i == data.options.pn) $gopage.addClass("selected");
//                            else if (i > _totalpn) $gopage.hide(); //$gopage.css("visibility", "hidden");
                        }

                        var $gonext = $("<span/>").addClass("menulink nextbtn").html(rb.next).appendTo($control);
                        if (data.options.pn == _totalpn) $gonext.addClass("disabled");
                            
                        var goselect_html = "";
                        for (var i =0 ; i < _totalpn ; i++){
                            page = i+1;
                            if (data.options.pn == page)
                                goselect_html += '<option value="'+page+'" selected>'+page+'</option>';
                            else
                                goselect_html += '<option value="'+page+'">'+page+'</option>';
                        }
                        var $goselect = $("<select/>").html(goselect_html);
                        var $goselect_outer = $("<span/>").addClass("menulink").html($goselect).appendTo($control);

                        // Now the toolbuttongroup of paging buttons
                        $control.children(".pagebtn").click(function() {
                            if (data.options.goPage) data.options.goPage($(this).attr("pn"));
                        });
                        $control.children(".prevbtn").click(function() {
                            var prevpn = data.options.pn - 1; if (prevpn < 1) prevpn = 1;
                            if (data.options.goPage) data.options.goPage(prevpn);
                        });
                        $control.children(".nextbtn").click(function() {
                            var nextpn = data.options.pn + 1; if (nextpn > _totalpn) nextpn = 1;
                            if (data.options.goPage) data.options.goPage(nextpn);
                        });
                        $control.children("span").children("select").change(function(){
                            if (data.options.goPage) data.options.goPage($(this).val());
                        });
                    }

                    // Save the data into this object
                    $this.data("pagingbar", data);
                }
            });

            // For chaining...
            return $(this);
        },

        destroy: function() {
            // For each...
            $(this).each(function() {
                // Get ready
                var $this = $(this);

                // Must have been initialized...
                var data = $this.data("pagingbar");
                if (data) {
                    $this.removeData("pagingbar");
                    $this.empty();
                }
            });

            // For chaining...
            return $(this);
        },

        _makeFunction: function(name, pagingbar) {
            var args = Array.prototype.slice.call(arguments, 1);
            return function(event) {
                // $(this) is not the "this" of makeFunction
                // $(this) is the "this" when this "function(event)" is called
                //methods[name].call($(this), event, pagingbar);
                methods[name].apply($(this), $.merge([ event ], args));
            };
        }

    };

    $.fn.pagingbar = function(method) {
        if (!method || typeof method == 'object')
            return methods.init.apply(this, arguments);
        else if (methods[method] && method.charAt(0) != "_") // Prevent call to private functions
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // "arguments" is not an actual array
    }

})(jQuery);
