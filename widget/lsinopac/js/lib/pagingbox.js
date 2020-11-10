////////////////////////////////////////////////////////////////////////////////
// A smartlisttable widget
// -----------------------------------------------------------------------------
// Uses:
//   consolelogger.js
//   toolbutton.js
//   utils.js
//
//<%--
// This is loaded by widget.js.jsp, with defining the following in JSP code:
//   lang: request parameter "lang", can be accessed with <%=lang%>
//--%>

/*
 *  options =
 *  {
 *      currentpage: 1, // Mandatory, showing which page is currently in
 *      totalpages: 1,  // Mandatory, the total number of pages
 *      goPage: function(page) { ... }, // Optional, the callback when a paging button is clicked, with "page" to indicate which page to be jumped to
 *      noofpagingbuttonsperblock: 10, // Optional, defining the number of paging buttons per each block (i.e. [1], [2], [3]... but not those [<], [|<<]... page-to buttons
 *     showall: false
 *  }
 */
(function ($) {
    var methods = {
        init: function (options) {
            // For each...
            $(this).each(function () {
                // Get ready
                var $this = $(this);

                // Already initialized?
                var data = $this.data('pagingbox');
                if (!data) {
                    // Get ready
                    //                    var id = $this.attr("id");
                    //                    var that = this;

                    // 1st time initialization to become a pagingbox
                    data = {};

                    // Process the options...
                    data.options = {
                        currentpage: 1,
                        totalpages: 1,
                        goPage: null,
                        noofpagingbuttonsperblock: 10,
                        showall: false,
                        lang: 'en',
                    };
                    if (options) {
                        // Save the options into this object
                        $.extend(data.options, options);
                    }

                    // Ensure the input are numbers
                    data.options.currentpage = Number(data.options.currentpage);
                    data.options.totalpages = Number(data.options.totalpages);

                    // Construct the html structure...
                    var $pagingcontrol = $('<div/>').addClass('toolbuttongroup');

                    // Only make sense to add these controls when there is more than 1 page ;)
                    if (data.options.showall || data.options.totalpages > 1) {
                        var labels = PAGINGBOX_RESOURCEBUNDLE[data.options.lang].label;

                        var block = Math.floor((data.options.currentpage - 1) / data.options.noofpagingbuttonsperblock);
                        var noofblocks = Math.ceil(data.options.totalpages / data.options.noofpagingbuttonsperblock);
                        var startpageno = block * data.options.noofpagingbuttonsperblock + 1;

                        var toolbuttongroupid = Date.now() + Math.random();
                        var toolbuttongroupname_pageto = toolbuttongroupid + '_pageto';
                        var toolbuttongroupname_paging = toolbuttongroupid + '_paging';

                        //                        var $gofirst = $("<div/>").attr("toolbuttongroup", toolbuttongroupname_pageto).attr("id","first").addClass("pagetobutton pushbutton").html($("<span/>").html(labels.first)).appendTo($pagingcontrol);
                        //                        if (data.options.currentpage == 1 || noofblocks == 1) {
                        //                            if (data.options.showall) {
                        //                                $gofirst.addClass("disabled");
                        //                            } else {
                        //                                $gofirst.css("display", "none");
                        //                            }
                        //                        }

                        var $goprev = $('<div/>')
                            .attr('toolbuttongroup', toolbuttongroupname_pageto)
                            .attr('id', 'prev')
                            .addClass('pagetobutton pushbutton')
                            .html($('<span/>').html(labels.prev))
                            .appendTo($pagingcontrol);
                        if (data.options.currentpage == 1) {
                            if (data.options.showall) {
                                $goprev.addClass('disabled');
                            } else {
                                $goprev.css('display', 'none');
                            }
                        }

                        //                        var $goprev10 = $("<div/>").attr("toolbuttongroup", toolbuttongroupname_pageto).attr("id","prev10").addClass("pagetobutton pushbutton").html($("<span/>").html(labels.prev10)).appendTo($pagingcontrol);
                        //                        if (block == 0 || noofblocks == 1) $goprev10.css("display", "none"); //$goprev10.css("visibility", "hidden");

                        for (var i = startpageno; i < startpageno + data.options.noofpagingbuttonsperblock; i++) {
                            var $gopage = $('<div/>')
                                .attr('toolbuttongroup', toolbuttongroupname_paging)
                                .attr('id', i)
                                .addClass('pagingbutton pushbutton')
                                .html($('<span/>').html(i))
                                .appendTo($pagingcontrol);
                            if (i == data.options.currentpage) $gopage.addClass('selected');
                            else if (i > data.options.totalpages) $gopage.css('display', 'none'); //$gopage.css("visibility", "hidden");
                        }

                        //                        var $gonext10 = $("<div/>").attr("toolbuttongroup", toolbuttongroupname_pageto).attr("id","next10").addClass("pagetobutton pushbutton").html($("<span/>").html(labels.next10)).appendTo($pagingcontrol);
                        //                        if (block == noofblocks-1 || noofblocks == 1) $gonext10.css("display", "none"); //$gonext10.css("visibility", "hidden");

                        var $gonext = $('<div/>')
                            .attr('toolbuttongroup', toolbuttongroupname_pageto)
                            .attr('id', 'next')
                            .addClass('pagetobutton pushbutton')
                            .html($('<span/>').html(labels.next))
                            .appendTo($pagingcontrol);
                        if (data.options.currentpage == data.options.totalpages) {
                            if (data.options.showall) {
                                $gonext.addClass('disabled');
                            } else {
                                $gonext.css('display', 'none');
                            }
                        }

                        //                        var $golast = $("<div/>").attr("toolbuttongroup", toolbuttongroupname_pageto).attr("id","last").addClass("pagetobutton pushbutton").html($("<span/>").html(labels.last)).appendTo($pagingcontrol);
                        //                        if (data.options.currentpage == data.options.totalpages || noofblocks == 1) {
                        //                            if (data.options.showall) {
                        //                                $golast.addClass("disabled");
                        //                            } else {
                        //                                $golast.css("display", "none");
                        //                            }
                        //                        }

                        $this.addClass('pagingbox').append($pagingcontrol);
                    }

                    // Now the toolbuttongroup of paging buttons
                    $pagingcontrol.children("[toolbuttongroup='" + toolbuttongroupname_paging + "']").toolbutton({
                        isradio: true,
                        click: function (id) {
                            if (data.options.goPage) data.options.goPage(id);
                        },
                    });

                    // Then the toolbuttongroup of pageto buttons
                    $pagingcontrol.children("[toolbuttongroup='" + toolbuttongroupname_pageto + "']").toolbutton({
                        click: function (id) {
                            if (data.options.goPage) {
                                var pageno;
                                switch (id) {
                                    case 'first':
                                        pageno = 1;
                                        break;
                                    case 'prev':
                                        pageno = data.options.currentpage - 1;
                                        if (pageno < 1) pageno = 1;
                                        break;
                                    case 'prev10':
                                        pageno = data.options.currentpage - data.options.noofpagingbuttonsperblock;
                                        if (pageno < 1) pageno = 1;
                                        break;
                                    case 'next10':
                                        pageno = data.options.currentpage + data.options.noofpagingbuttonsperblock;
                                        if (pageno > data.options.totalpages) pageno = data.options.totalpages;
                                        break;
                                    case 'next':
                                        pageno = data.options.currentpage + 1;
                                        if (pageno > data.options.totalpages) pageno = data.options.totalpages;
                                        break;
                                    case 'last':
                                        pageno = data.options.totalpages;
                                        break;
                                }
                                if (pageno) data.options.goPage(pageno);
                            }
                        },
                    });

                    // Save the data into this object
                    $this.data('pagingbox', data);
                }
            });

            // For chaining...
            return $(this);
        },

        destroy: function () {
            // For each...
            $(this).each(function () {
                // Get ready
                var $this = $(this);

                // Must have been initialized...
                var data = $this.data('pagingbox');
                if (data) {
                    $this.removeData('pagingbox');
                    $this.empty();
                }
            });

            // For chaining...
            return $(this);
        },

        _makeFunction: function (name, pagingbox) {
            var args = Array.prototype.slice.call(arguments, 1);
            return function (event) {
                // $(this) is not the "this" of makeFunction
                // $(this) is the "this" when this "function(event)" is called
                //methods[name].call($(this), event, pagingbox);
                methods[name].apply($(this), $.merge([event], args));
            };
        },
    };

    $.fn.pagingbox = function (method) {
        if (!method || typeof method == 'object') return methods.init.apply(this, arguments);
        else if (methods[method] && method.charAt(0) != '_')
            // Prevent call to private functions
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // "arguments" is not an actual array
    };
})(jQuery);

////////////////////////////////////////////////////////////////////////////////
// Global variables

var PAGINGBOX_RESOURCEBUNDLE = {
    en: {
        label: {
            first: 'First',
            prev: 'Previous',
            prev10: '...',
            next10: '...',
            next: 'Next',
            last: 'Last',
        },
    },
    zh_HK: {
        label: {
            first: 'First',
            prev: 'Previous',
            prev10: '...',
            next10: '...',
            next: 'Next',
            last: 'Last',
        },
    },
    zh_CN: {
        label: {
            first: 'First',
            prev: 'Previous',
            prev10: '...',
            next10: '...',
            next: 'Next',
            last: 'Last',
        },
    },
};
