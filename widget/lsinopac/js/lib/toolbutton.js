////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015, LabCI Limited
// Our specific toolbutton widget, optionally with radio button behaviour
// -----------------------------------------------------------------------------
// Uses:
//   consolelogger.js
//   utils.js
//
//<%--
// This is loaded by widget.js.jsp, with defining the following in JSP code:
//   lang: request parameter "lang", can be accessed with <%=lang%>
//--%>

/*
 *  options =
 *  {
 *      isradio: false, // Optional, default false
 *      istoggle: false, // Optional, default false, use only if isradio = false
 *      click: function(id, isselected) { ... } // Optional, default do nothing
 *      hover: { "in": function(id) { ... }, "out": function(id) { ... } } // Optional, default do nothing
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
                var data = $this.data("toolbutton");
                if (!data) {
                    // Get ready
                    var id = $this.attr("id");
                    var that = this;

                    // 1st time initialization to become a toolbutton
                    data = {};

                    // Process the options...
                    data.options = {
                        isradio: false,
                        istoggle: false,
                        click: null,
                        hover: null
                    };
                    if (options) {
                        // Save the options into this object
                        $.extend(data.options, options);
                    }

                    // Starting in an enabled state
                    data.isenabled = true;

                    // The click effect...
                    $this.click(function(e) {
                        methods["select"].call($(this), true);
                        e.stopPropagation();
                    });

                    // When hovering over...
                    $this.hover(function() {
                        methods["hoverin"].call($(this));
                    }, function() {
                        methods["hoverout"].call($(this));
                    });

                    // Save the data into this object
                    $this.data("toolbutton", data);
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

                // Must have been initialized in order to proceed...
                var data = $this.data("toolbutton");
                if (data) {
                    // Unbind any event handling and destroy any underlying widget
                    $this.off(_CLICK_EVENT);

                    // Drop all related CSS classes
                    // nop~

                    // Remove all created html structure
                    // nop~

                    // Finally, clear the underlying data
                    $this.removeData("toolbutton");
                }
            });

            // For chaining...
            return $(this);
        },

        hoverin: function() {
            // For each...
            $(this).each(function() {
                // Get ready
                var $this = $(this);

                // Must have been initialized in order to proceed...
                var data = $this.data("toolbutton");
                if (data) {
//                    $this.addClass("highlighted"); // better use :hover, and highlighted is reserved for specific usage to hardwiring such highlight effect
                    if (data.options.hover && data.options.hover["in"]) data.options.hover["in"]($this.attr("id"));
                }
            });

            // For chaining...
            return $(this);
        },

        hoverout: function() {
            // For each...
            $(this).each(function() {
                // Get ready
                var $this = $(this);

                // Must have been initialized in order to proceed...
                var data = $this.data("toolbutton");
                if (data) {
//                    $this.removeClass("highlighted"); // better use :hover, and highlighted is reserved for specific usage to hardwiring such highlight effect
                    if (data.options.hover && data.options.hover["out"]) data.options.hover["out"]($this.attr("id"));
                }
            });

            // For chaining...
            return $(this);
        },

        unselect: function() {
            // For each...
            $(this).each(function() {
                // Get ready
                var $this = $(this);

                // Must have been initialized in order to proceed...
                var data = $this.data("toolbutton");
                if (data) {
                    $this.removeClass("selected");
                }
            });

            // For chaining...
            return $(this);
        },

        select: function(doclick) {
            // For each...
            $(this).each(function() {
                // Get ready
                var $this = $(this);

                // Must have been initialized in order to proceed...
                var data = $this.data("toolbutton");
                if (data) {
                    // If has class ".disabled", don't do anything...
                    if ($this.hasClass("disabled")) {
                        // no-op
                    }
                    else {
                        // For being a radio button, uncheck the others, and toggle this as checked
                        if (data.options.isradio) {
//                            $("[toolbuttongroup='"+$this.attr("toolbuttongroup")+"']").removeClass("selected");
//                            $this.addClass("selected");
                            $this.addClass("selected").siblings().removeClass("selected"); // JH 20121212> Assuming all and only same toolbuttongroup are together under the same container, hence hoping to achieve a better performance (avoiding slowness of jQuery selector logic in IE)
                        }
                        // For being a toggle button, toggle the state
                        else if (data.options.istoggle) {
                            $this.toggleClass("selected");
                        }

                        // Callback as the click action...
                        if (data.options.click && doclick && data.isenabled) {
                            data.options.click($this.attr("id"), $this.hasClass("selected"));
                        }
                    }
                }
            });

            // For chaining...
            return $(this);
        },

        isSelected: function() {
            // Get ready
            var $this = $(this);

            // Must have been initialized in order to proceed...
            var data = $this.data("toolbutton");
            if (data) {
                // The status of the first one will be returned and end the call now
                return $this.hasClass("selected");
            }
            else {
                return false;
            }
        },

        isEnabled: function() {
            // Must have been initialized in order to proceed...
            var data = $(this).data("toolbutton");
            if (data) {
                // The status of the first one will be returned and end the call now
                return data.isenabled;
            }
        },

        enable: function() {
            // For each...
            $(this).each(function() {
                // Get ready
                var $this = $(this);

                // Must have been initialized in order to proceed...
                var data = $this.data("toolbutton");
                if (data) {
                    data.isenabled = true;
                    $this.removeClass("disabled");
                }
            });

            // For chaining...
            return $(this);
        },

        disable: function() {
            // For each...
            $(this).each(function() {
                // Get ready
                var $this = $(this);

                // Must have been initialized in order to proceed...
                var data = $this.data("toolbutton");
                if (data) {
                    data.isenabled = false;
                    $this.addClass("disabled");
                }
            });

            // For chaining...
            return $(this);
        },

        _makeFunction: function(name, toolbutton) {
            var args = Array.prototype.slice.call(arguments, 1);
            return function(event) {
                // $(this) is not the "this" of makeFunction
                // $(this) is the "this" when this "function(event)" is called
                //methods[name].call($(this), event, toolbutton);
                methods[name].apply($(this), $.merge([ event ], args));
            };
        }

    };

    $.fn.toolbutton = function(method) {
        if (!method || typeof method == 'object')
            return methods.init.apply(this, arguments);
        else if (methods[method] && method.charAt(0) != "_") // Prevent call to private functions
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // "arguments" is not an actual array
    }

})(jQuery);

////////////////////////////////////////////////////////////////////////////////
// Our specific toolbuttongroup widget, building up with toolbuttons in radio
// mode, for rendering the following controls:
// - tab bar
// - button group
// - switches
// -----------------------------------------------------------------------------
// Uses:
//   consolelogger.js
//   utils.js

/*
 *  This object must have a unique id, and this id will be used as the
 *  "toolbuttongroup" group id, hence a unique set of radio buttons.
 *
 *  options =
 *  {
 *      type: tab | button | switch, // Mandatory, default is "button"
 *      click: function(id) { ... } // Optional, default do nothing
 *      hover: { "in": function(id) { ... }, "out": function(id) { ... } } // Optional, default do nothing
 *  }
 */
(function($) {

    var methods = {

        init: function(options) {
            // For each...
            $(this).each(function() {
                // Already initialized?
                var data = $(this).data("toolbuttongroup");
                if (!data) {
                    // Get ready
                    var id = $(this).attr("id");
                    var that = this;

                    // 1st time initialization to become a toolbutton
                    data = {};

                    // Process the options...
                    data.options = {
                        type: "button",
                        isradio: true,
                        click: null,
                        hover: null
                    };
                    if (options) {
                        // Save the options into this object
                        $.extend(data.options, options);
                    }

                    // Prepare the HTML for later adding more buttons...
                    var typecss;
                    if (data.options.type == "tab") typecss = "tabbar";
                                               else typecss = "toolbuttongroup";
                    $(this).addClass(typecss);

                    // Generate a unique random id for this toolbuttongroup
                    data.toolbuttongroupid = Date.now() + Math.random();

                    // Save the data into this object
                    $(this).data("toolbuttongroup", data);
                }
            });

            // For chaining...
            return $(this);
        },

        destroy: function() {
            // For each...
            $(this).each(function() {
                // Must have been initialized in order to proceed...
                var data = $(this).data("toolbuttongroup");
                if (data) {
                    // Unbind any event handling and destroy any underlying widget
                    //$(this).children().toolbutton("destroy");

                    // Drop all related CSS classes
                    $(this).removeClass("tabbar toolbuttongroup");

                    // Remove all created html structure
                    $(this).empty();

                    // Finally, clear the underlying data
                    $(this).removeData("toolbuttongroup");
                }
            });

            // For chaining...
            return $(this);
        },

        addButton: function(id, label, spancss) {
            // For each...
            $(this).each(function() {
                // Must have been initialized in order to proceed...
                var data = $(this).data("toolbuttongroup");
                if (data) {
                    // Which style?
                    var typecss;
                    if (data.options.type == "tab") typecss = "tab";
                    else if (data.options.type == "switch") typecss = "button switchbutton";
                    else typecss = "button";

                    // Create the HTML for this new button
                    var $label = $("<span/>").html(label); if (spancss) $label.addClass(spancss);
                    var $newbutton = $("<div/>").attr({"toolbuttongroup": data.toolbuttongroupid, "id": id}).addClass(typecss).append($label);
                    $(this).append($newbutton);

                    // Finally make it a toolbutton to work along the same toolbuttongroup
                    $newbutton.toolbutton(data.options)
                }
            });

            // For chaining...
            return $(this);
        },

        removeButton: function(id) {
            // For each...
            $(this).each(function() {
                // Must have been initialized in order to proceed...
                var data = $(this).data("toolbuttongroup");
                if (data) {
                    $(this).children("#"+id).remove();
                }
            });

            // For chaining...
            return $(this);
        },

        getSelected: function() {
            // Must have been initialized in order to proceed...
            var data = $(this).data("toolbuttongroup");
            if (data) {
                // The status of the first one will be returned and end the call now
                return $(this).children(".selected").attr("id");
            }
            else {
                return null;
            }
        },

        unselect: function(id) {
            // For each...
            $(this).each(function() {
                // Must have been initialized in order to proceed...
                var data = $(this).data("toolbuttongroup");
                if (data) {
                    $(this).children("#"+id).toolbutton("unselect");
                }
            });

            // For chaining...
            return $(this);
        },

        select: function(id, doclick) {
            // For each...
            $(this).each(function() {
                // Must have been initialized in order to proceed...
                var data = $(this).data("toolbuttongroup");
                if (data) {
                    $(this).children("#"+id).toolbutton("select", doclick);
                }
            });

            // For chaining...
            return $(this);
        },

        isSelected: function(id) {
            // Must have been initialized in order to proceed...
            var data = $(this).data("toolbuttongroup");
            if (data) {
                // The status of the first one will be returned and end the call now
                return $(this).children("#"+id).toolbutton("isSelected");
            }
            else {
                return false;
            }
        },

        isEnabled: function(id) {
            // Must have been initialized in order to proceed...
            var data = $(this).data("toolbuttongroup");
            if (data) {
                // The status of the first one will be returned and end the call now
                return $(this).children("#"+id).toolbutton("isEnabled");
            }
        },

        enable: function(id) {
            // For each...
            $(this).each(function() {
                // Must have been initialized in order to proceed...
                var data = $(this).data("toolbuttongroup");
                if (data) {
                    $(this).children("#"+id).toolbutton("enable");
                }
            });

            // For chaining...
            return $(this);
        },

        disable: function(id) {
            // For each...
            $(this).each(function() {
                // Must have been initialized in order to proceed...
                var data = $(this).data("toolbuttongroup");
                if (data) {
                    $(this).children("#"+id).toolbutton("disable");
                }
            });

            // For chaining...
            return $(this);
        },

        show: function(id) {
            // For each...
            $(this).each(function() {
                // Must have been initialized in order to proceed...
                var data = $(this).data("toolbuttongroup");
                if (data) {
                    $(this).children("#"+id).show();
                }
            });

            // For chaining...
            return $(this);
        },

        hide: function(id) {
            // For each...
            $(this).each(function() {
                // Must have been initialized in order to proceed...
                var data = $(this).data("toolbuttongroup");
                if (data) {
                    $(this).children("#"+id).hide();
                }
            });

            // For chaining...
            return $(this);
        },

        _makeFunction: function(name, toolbuttongroup) {
            var args = Array.prototype.slice.call(arguments, 1);
            return function(event) {
                // $(this) is not the "this" of makeFunction
                // $(this) is the "this" when this "function(event)" is called
                //methods[name].call($(this), event, toolbutton);
                methods[name].apply($(this), $.merge([ event ], args));
            };
        }

    };

    $.fn.toolbuttongroup = function(method) {
        if (!method || typeof method == 'object')
            return methods.init.apply(this, arguments);
        else if (methods[method] && method.charAt(0) != "_") // Prevent call to private functions
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // "arguments" is not an actual array
    }

})(jQuery);
