webpackJsonp([12], {
    1077: function (e, r, t) {
        'use strict';
        (r.createInputsPropertyPage = function (e, r) {
            var t = e.getInputsPropertyPage();
            return null == t ? null : new t(e.properties(), r, e);
        }),
            (r.createStudyStrategyPropertyPage = function (e, r) {
                var t = e.getStrategyPropertyPage();
                return null == t ? null : new t(e.properties(), r, e);
            }),
            (r.createStylesPropertyPage = function (e, r) {
                var t = e.getStylesPropertyPage();
                return null == t ? null : new t(e.properties(), r, e);
            }),
            (r.createDisplayPropertyPage = function (e, r) {
                var t = e.getDisplayPropertyPage();
                return null == t ? null : new t(e.properties(), r, e);
            }),
            (r.createVisibilitiesPropertyPage = function (e, r) {
                var t = e.getVisibilitiesPropertyPage();
                return null == t ? null : new t(e.properties(), r, e);
            }),
            (r.hasInputsPropertyPage = function (e) {
                return null !== e.getInputsPropertyPage();
            }),
            (r.hasStylesPropertyPage = function (e) {
                return null !== e.getStylesPropertyPage();
            });
    },
});
