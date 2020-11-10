
if (typeof(LabCI)==="undefined") LabCI = { WP: { } };
else if (typeof(LabCI.WP)==="undefined") LabCI.WP = { };
LabCI.WP.CommonRC = {

    getRes: function(key, lang) {
        // If not specifying a language, or the corresponding language resource (lang or key) not defined...
        // i.e. missing resource, then return key as it is
        if (!lang || typeof(LabCI.WP.CommonRC[lang])==="undefined" || typeof(LabCI.WP.CommonRC[lang][key])==="undefined") return key;

        // Done
        return LabCI.WP.CommonRC[lang][key];
    },

    ////////////////////////////////////////////////////////////////////////////

    trbc2name: function(key, lang) {
        var name = this.getRes("trbc2name", lang)[key];
        if (!name) name = key;
        return name;
    },

    ccy2name: function(key, lang) {
        var name = this.getRes("ccy2name", lang)[key];
        if (!name) name = key;
        return name;
    },

    exchsect2name: function(key, lang) {
        var name = this.getRes("exchsect", lang)["s"][key];
        if (!name) name = key;
        return name;
    },
    exchsect2longname: function(key, lang) {
        var name = this.getRes("exchsect", lang)["l"][key];
        if (!name) name = key;
        return name;
    },

    wntcbbctype2name: function(key, lang) {
        var name = this.getRes("wntcbbctype2name", lang)[key];
        if (!name) name = key;
        return name;
    },

    ////////////////////////////////////////////////////////////////////////////

    brokerrating2id: function(r) {
        // With this new rule, boundary case will take the better one, e.g. 1x"3" and 1x"4" = 3.5 score, will go r="4" (matching with SR+ portal behaviour)
        r = Number(r);
        if (isNaN(r) || r < 0) {
            r = "NA";
        }
        else if (r >= 1 && r < 1.5) {
            r = "1";
        }
        else if (r >= 1.5 && r < 2.5) {
            r = "2";
        }
        else if (r >= 2.5 && r < 3.5) {
            r = "3";
        }
        else if (r >= 3.5 && r < 4.5) {
            r = "4";
        }
        else if (r >= 4.5 && r <= 5) {
            r = "5";
        }
        else {
            r = "NA";
        }
        return r;
    },
    brokerrating2name: function(r, lang) {
        var key = this.brokerrating2id(r);
        var name = this.getRes("brokerrating2name", lang)[key];
        if (!name) name = key;
        return name;
    },

    ////////////////////////////////////////////////////////////////////////////

    unitscale2name: function(key, lang) {
        var name = this.getRes("unitscale", lang)[key];
        if (!name) name = key;
        return name;
    },
    
    tt2name: function(key, lang) {
        var name = this.getRes("tradetone", lang)[key];
        if (!name) name = key;
        return name;
    },
    
    moneyness2name: function(key, lang) {
        var name = this.getRes("moneyness", lang)[key];
        if (!name) name = key;
        return name;
    },
    
    scflag2name: function(key, lang) {
        var name = this.getRes("scflag", lang)[key];
        if (!name) name = key;
        return name;
    },
    
    ////////////////////////////////////////////////////////////////////////////

    getDF: function(key, lang) {
        var df = this.getRes("df", lang)[key];
        if (!df) df = "";
        return df;
    },
    fmtDT: function(dt, key, lang) {
        var df = this.getDF(key, lang);
        return this.doFmtDateTime(dt, df);
    },

    doFmtDateTime: function(dt, df) {
        if (!dt || !df) return "-";
        return dt.toString(df);
    },

    ////////////////////////////////////////////////////////////////////////////

    getMsg: function(key, lang) {
        return this.getRes("msg", lang)[key];
    },
    getFmtMsg: function(key, lang, values) {
        var msg = this.getRes("msg", lang)[key];
        return this.doFmtMsg(msg, values);
    },
    
    doFmtMsg: function(tmpl, values) {
        var msg = tmpl;
        $.each(values, function(id, value) {
            var rx = new RegExp("{"+id+"}", "gi");
            msg = msg.replace(rx, value);
        });
        return msg;
    }

};
