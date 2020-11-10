////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2017, LabCI Limited
// -----------------------------------------------------------------------------
// Uses:
//     utils.js
// -----------------------------------------------------------------------------
// jQuery in No-Conflict Mode:
//     var $ = jQuery.noConflict();

(function ($) {
    ////################################################################################
    ////################################################################################
    ///*
    // * jQuery.ajaxQueue - A queue for ajax requests
    // *
    // * (c) 2011 Corey Frang
    // * Dual licensed under the MIT and GPL licenses.
    // *
    // * Requires jQuery 1.5+
    // */
    //
    //// jQuery on an empty object, we are going to use this as our Queue
    //var ajaxQueues = [ $({}), $({}) ];
    //var nextqidx = 0;
    //
    //$.clearAjaxQueue = function() {
    //    $.each(ajaxQueues, function(index, ajaxQueue) {
    //        ajaxQueue.clearQueue();
    //    })
    //};
    //
    //$.ajaxQueue = function(ajaxOpts) {
    //    var jqXHR,
    //        dfd = $.Deferred(),
    //        promise = dfd.promise();
    //
    //    var ajaxQueue = ajaxQueues[nextqidx++];
    //    if (nextqidx == ajaxQueues.length) nextqidx = 0;
    //
    //    // queue our ajax request
    //    ajaxQueue.queue(doRequest);
    //
    //    // add the abort method
    //    promise.abort = function(statusText) {
    //
    //        // proxy abort to the jqXHR if it is active
    //        if (jqXHR && jqXHR.abort) {
    //            return jqXHR.abort(statusText);
    //        }
    //
    //        // if there wasn't already a jqXHR we need to remove from queue
    //        var queue = ajaxQueue.queue(),
    //            index = $.inArray(doRequest, queue);
    //
    //        if (index > -1) {
    //            queue.splice(index, 1);
    //        }
    //
    //        // and then reject the deferred
    //        dfd.rejectWith(ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ]);
    //        return promise;
    //    };
    //
    //    // run the actual query
    //    function doRequest(next) {
    //        jqXHR = $.ajax(ajaxOpts)
    //            .done(dfd.resolve)
    //            .fail(dfd.reject)
    //            .then(next, next);
    //    }
    //
    //    return promise;
    //};

    /*
     * jQuery.ajaxQueue - A fake version to support old jQuery 1.3.2, actual not a queue and just simply use $.ajax
     */
    (function ($) {
        $.ajaxQueue = function (ajaxOpts) {
            // prepare the returen object for callback, pretend the new XHR object since jQuery 1.5+
            var fnDone;
            var fnFail;
            var retobj = {
                done: function (fn) {
                    fnDone = fn;
                    return this;
                },
                fail: function (fn) {
                    fnFail = fn;
                    return this;
                },
            };

            // run the actual query
            $.ajax(
                $.extend(ajaxOpts, {
                    success: function (rawdata) {
                        if (fnDone) fnDone(rawdata);
                    },
                    error: function (jqXHR, textStatus) {
                        if (fnFail) fnFail(jqXHR, textStatus);
                    },
                }),
            );

            return retobj;
        };
    })(jQuery);

    //################################################################################
    //################################################################################
    // The LabCI object for {S}nap{S}hot{D}ata{L}oader
    // LabCI = {
    //     SSDL: { ... }
    // }

    // Call to load data, binding to the caller object
    ($.fn.loaddata = function (extrarefid, api, jsonparams, success, autorefreshinterval, options) {
        // Construct the querystring
        var qs = '';
        $.each(jsonparams, function (key, val) {
            qs += '&' + key + '=' + val;
        });
        var url = LabCI.SSDLConf.DATA_PATH + api + '?' + qs;
        if (api.indexOf('http://') != -1) {
            url = api + '?' + qs;
        }

        $(this).each(function () {
            LabCI.SSDL._loaddata($(this), extrarefid, url, options, success, autorefreshinterval);
        });
    }),
        // Call to stop auto-refresh regardlessly
        ($.fn.stopautorefresh = function () {
            $(this).each(function () {
                LabCI.SSDL._stopautorefresh($(this));
            });
        });

    //################################################################################

    LabCI.SSDL = {
        // Response Codes
        _API_RC: {
            SYSTEM_ERROR: 'SSDL99999',
            INVALID_FORMAT: 'SSDL00002',
            REQUEST_TIMEOUT: 'SSDL00001',
            REQUEST_ABORT: 'SSDL00011',
        },

        _loaddata: function ($refobj, extrarefid, url, options, success, autorefreshinterval, isAutoRefreshCall) {
            // Abort any existing loading call
            var datarefid = 'loaddata-' + extrarefid;
            //         var data = {
            //             qid: 0,
            //             url: null,
            //             jqXHR: null
            //         };
            var data = $refobj.data(datarefid);
            if (data && data.jqXHR) {
                if (!data.isJSONP && data.jqXHR.abort) data.jqXHR.abort(); // jQuery $.ajax JSONP call cannot be abort()
                data.qid = 0;
                data.url = url;
                data.isJSONP = false;
                data.jqXHR = null;
            } else {
                data = {
                    qid: 0,
                    url: url,
                    isJSONP: false,
                    jqXHR: null,
                };
            }

            // And clear any waiting auto-refresh timer
            LabCI.SSDL._stopautorefresh($refobj);

            // Fetch new data now
            var _thisqid = new Date().getTime(); // generate a unique id of this request

            var requrl = data.url + (data.url.indexOf('?') > 0 ? '&' : '?') + 'qid=' + _thisqid;
            var reqtype = options ? (options.type ? options.type : 'GET') : 'GET';
            var reqdata = options ? (options.data ? options.data : {}) : {};
            var datatype = options ? (options.datatype ? options.datatype : 'text') : 'text';

            // Save the reference
            data.qid = _thisqid;
            data.isJSONP = datatype == 'jsonp';
            $refobj.data(datarefid, data);

            // Make request now
            data.jqXHR = $.ajaxQueue({
                url: requrl,
                type: reqtype,
                data: reqdata,
                dataType: datatype,
                timeout: LabCI.SSDLConf.TIMEOUT,
            })
                .done(function (rawdata) {
                    // When this is what we are waiting for...
                    var data = $refobj.data(datarefid);
                    if (data && _thisqid == data.qid) {
                        // Check if result is a system authentiction/session error condition
                        var result;
                        if (rawdata != null) result = rawdata; // With JSON/JSONP response, the data has been parsed/verified as a valid json ;)

                        // Check if any error condition received / reported from the API
                        if (datatype == 'text') {
                            // "text" is raw data format, leave it as raw, even if it is null
                            if (success) success(result, isAutoRefreshCall);
                        } else {
                            // For other than "text", check if any error condition received / reported from the API
                            if (!result || !result.data) {
                                result = { data: { responseCode: 'F', reasonCode: LabCI.SSDL._API_RC.INVALID_FORMAT } };
                                onReceiveInvalidData(result.data);
                            }

                            // Callback
                            if (success) success(result, isAutoRefreshCall);
                        }

                        // Done, clear the references
                        $refobj.data(datarefid, null);

                        // Do auto-refresh?
                        LabCI.SSDL._startautorefresh($refobj, autorefreshinterval, function () {
                            LabCI.SSDL._loaddata($refobj, extrarefid, url, options, success, autorefreshinterval, true);
                        });
                    }
                })
                .fail(function (jqXHR, textStatus) {
                    // When this is what we are waiting for...
                    var data = $refobj.data(datarefid);
                    if (data && _thisqid == data.qid) {
                        // So, failed :(
                        var result;

                        // Warn the user now for something failed...
                        if (textStatus == 'timeout') {
                            // Timeout?!
                            result = { data: { responseCode: 'F', reasonCode: LabCI.SSDL._API_RC.REQUEST_TIMEOUT } };
                            onReceiveInvalidData(result.data);
                        } else if (textStatus == 'abort') {
                            // Abort?! ... just ignore ;)
                            result = { data: { responseCode: 'F', reasonCode: LabCI.SSDL._API_RC.REQUEST_ABORT } };
                        } else {
                            // Any other error case?!
                            result = { data: { responseCode: 'F', reasonCode: LabCI.SSDL._API_RC.SYSTEM_ERROR } };
                            onReceiveInvalidData(result.data);
                        }

                        // Callback
                        if (success) success(result, isAutoRefreshCall);

                        // Done, clear the references
                        $refobj.data(datarefid, null);

                        // Do auto-refresh? (even from a failed case)
                        LabCI.SSDL._startautorefresh($refobj, autorefreshinterval, function () {
                            LabCI.SSDL._loaddata($refobj, extrarefid, url, options, success, autorefreshinterval, true);
                        });
                    }
                });
        },

        _startautorefresh: function ($refobj, autorefreshinterval, fn) {
            if (autorefreshinterval) $refobj.delaycall('autorefresh', fn, autorefreshinterval);
        },

        _stopautorefresh: function ($refobj) {
            $refobj.cleardelaycall('autorefresh');
        },
    };

    ////////////////////////////////////////////////////////////////////////////////

    // If not defined, let's define the function for when encountering error during loaddata()...
    // errcodeobj = {
    //     responseCode: "F" = Failed; "S" = Success; "W" = Other Issues
    //     reasonCode: "-1"
    // }
    $(function () {
        if (typeof onReceiveInvalidData == 'undefined') {
            onReceiveInvalidData = function (errcodeobj) {
                LabCI.Utils.CONSOLELOGGER.error('SSDL DATA ERROR: ' + JSON.stringify(errcodeobj));
            };
        }
    });
})(jQuery);
