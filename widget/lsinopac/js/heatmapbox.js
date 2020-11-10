////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015, LabCI Limited
// Project Code for HSBC Enhanced Market Data Widget
//
// Common Widget - Heatmap Box
// -----------------------------------------------------------------------------
// Uses:
//   consolelogger.js
//   utils.js

/*
 *  options =
 *  {
 *      onClick: function({ "ric": celldata.ric, "trbc": celldata.trbc }) { ... } // optional, a callback when clicked on a heatmap cell
 *      renderCell: function($hmc, $hmctbx, celldata) { ... } // optional, for rendering the content inside a cell if provided
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
                var data = $this.data('heatmapbox');
                if (!data) {
                    // 1st time initialization to become a widget
                    data = { id: $this.attr('id') };

                    // Process the options...
                    data.options = {
                        onClick: null,
                        renderCell: null,
                    };
                    if (options) {
                        // Save the options into this object
                        $.extend(data.options, options);
                    }

                    // Extract the provided elements, modify with necessary attributes/classes and turn the whole thing into a visual button ;)
                    // ...

                    // Construct the html structure...
                    var $contentpane = $('<div/>').addClass('heatmapboxcontentpane');
                    var $celltmpl = $('<div/>')
                        .addClass('heatmapcell hmcell')
                        .append($('<div/>').addClass('heatmapcelltextbox'));
                    //var $celltmpl = $('<div class="heatmapcell hmcell"><div class="heatmapcelltextbox"></div></div>');

                    // Show them in the DOM
                    $this.addClass('heatmapbox').append($contentpane);

                    // Save the key objects' reference
                    data.$contentpane = $contentpane;
                    data.$celltmpl = $celltmpl;

                    // Save the data into this object
                    $this.data('heatmapbox', data);

                    // Event handling...
                    // ...

                    // Additional initialization codes after all setup...
                    // ...
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
                var data = $this.data('heatmapbox');
                if (data) {
                    $this.removeData('heatmapbox');
                    $this.empty();
                }
            });

            // For chaining...
            return $(this);
        },

        // An internal helper method to construct a new heatmap cell
        // celldata = {
        //     id: "cell id",
        //     name: "display name",
        //     value: "display cell value and the value to determine the cell temperature",
        //     left: left,
        //     width: width,
        //     top: top,
        //     height: height
        // }
        _createNewCell: function (data, celldata) {
            // Create a $newdatarow and firstly set the effect styles
            var $hmc = data.$celltmpl.clone();

            if (celldata) {
                // Set attributes and style
                $hmc.attr({ id: celldata.id, ric: celldata.ric, trbc: celldata.trbc })
                    .css({ left: celldata.left, width: celldata.width, top: celldata.top, height: celldata.height })
                    .addClass(LabCI.Utils.getHeatmapTemp(celldata.value));
                var $hmctbx = $hmc.children('.heatmapcelltextbox');
                if (data.options.renderCell) data.options.renderCell($hmc, $hmctbx, celldata);

                // Event handling
                if (data.options.onClick) {
                    $hmc.click(function (e) {
                        if ($('#itemlist').hasClass('sct')) {
                            data.options.onClick({ ric: celldata.ric, trbc: celldata.trbc }, e);
                        } else {
                            data.options.onClick(
                                {
                                    symbol: celldata.id,
                                    exchange: LabCI.WP.AppUtils.INTEGRATION_EXCHANGE_MAPPING[celldata.exchsect],
                                },
                                e,
                            );
                        }
                    });
                }
            }

            // Done
            return $hmc;
        },

        // Append this list of cells into the box
        // celldatalist = [{
        //     id: "cell id",
        //     name: "display name",
        //     value: "display cell value and the value to determine the cell temperature",
        //     left: left,
        //     width: width,
        //     top: top,
        //     height: height
        // },
        // ...]
        _MINWDTH: 50, // cell minimun width
        _MINHGHT: 28, // cell minimun height
        addCells: function (celldatalist, idorderlist) {
            // For each...
            $(this).each(function () {
                // Get ready
                var $this = $(this);

                // Must have been initialized...
                var data = $this.data('heatmapbox');
                if (data) {
                    var fnLayoutHMCtbx = function ($hmc) {
                        // Layout the underlying textbox element in the UI accordingly
                        var $hmctbx = $hmc.children();
                        //                        $hmctbx.css({ left: ($hmc.width() - $hmctbx.width()) / 2, top: ($hmc.height() - $hmctbx.height()) / 2 });
                    };

                    // Create all hmc boxes now...
                    $.each(celldatalist, function (index, celldata) {
                        // Create the next cell
                        var $hmc = methods._createNewCell.call($this, data, celldata);
                        data.$contentpane.append($hmc);
                    });

                    // If specific order is requested, do the ordering specifically and add the order"n" class
                    // ... then fit the inner textbox accordingly
                    if (idorderlist) {
                        $.each(idorderlist, function (index, id) {
                            var $hmc = data.$contentpane
                                .children('#' + id)
                                .addClass('order' + index)
                                .detach();
                            data.$contentpane.append($hmc);

                            // Fit the textbox accordingly
                            fnLayoutHMCtbx($hmc);
                        });
                    } else {
                        $.each(data.$contentpane.children(), function (index, hmc) {
                            // Fit the textbox accordingly
                            fnLayoutHMCtbx($(hmc));
                        });
                    }
                }
            });

            // For chaining...
            return $(this);
        },

        // Replace with this list of cells into the box
        // celldatalist = [{
        //     id: "cell id",
        //     name: "display name",
        //     value: "display cell value and the value to determine the cell temperature",
        //     left: left,
        //     width: width,
        //     top: top,
        //     height: height
        // },
        // ...]
        setCells: function (celldatalist) {
            // For each...
            $(this).each(function () {
                // Get ready
                var $this = $(this);

                // Must have been initialized...
                var data = $this.data('heatmapbox');
                if (data) {
                    data.$contentpane.empty(); // remove all existing
                    $.each(celldatalist, function (index, celldata) {
                        // Create the next cell
                        var $hmc = methods._createNewCell.call($this, data, celldata);
                        data.$contentpane.append($hmc);

                        // ... and layout the underlying textbox element in the UI accordingly
                        var $hmctbx = $hmc.children();
                        $hmctbx.css({
                            left: ($hmc.width() - $hmctbx.width()) / 2,
                            top: ($hmc.height() - $hmctbx.height()) / 2,
                        });
                    });
                }
            });

            // For chaining...
            return $(this);
        },

        removeAllCells: function () {
            // For each...
            $(this).each(function () {
                // Get ready
                var $this = $(this);

                // Must have been initialized...
                var data = $this.data('heatmapbox');
                if (data) {
                    data.$contentpane.empty();
                }
            });

            // For chaining...
            return $(this);
        },

        doClick: function (doclick) {
            // For each...
            $(this).each(function () {
                // Get ready
                var $this = $(this);

                // Must have been initialized...
                var data = $this.data('heatmapbox');
                if (data) {
                    if (doclick && data.options.onClick) {
                        data.options.onClick(data.id);
                    }
                }
            });

            // For chaining...
            return $(this);
        },

        _makeFunction: function (name, heatmapbox) {
            var args = Array.prototype.slice.call(arguments, 1);
            return function (event) {
                // $(this) is not the "this" of makeFunction
                // $(this) is the "this" when this "function(event)" is called
                //methods[name].call($(this), event, button);
                methods[name].apply($(this), $.merge([event], args));
            };
        },
    };

    $.fn.heatmapbox = function (method) {
        if (!method || typeof method == 'object') return methods.init.apply(this, arguments);
        else if (methods[method] && method.charAt(0) != '_')
            // Prevent call to private functions
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // "arguments" is not an actual array
    };
})(jQuery);
