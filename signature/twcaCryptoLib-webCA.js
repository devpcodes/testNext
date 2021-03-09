/*
 almond 0.3.3 Copyright jQuery Foundation and other contributors.
 Released under MIT license, http://github.com/requirejs/almond/LICENSE
*/
var separation = '|-|',
    MobileUtils = {
        unregisterFunction: function (E) {
            'string' == typeof func && delete window[E];
        },
        count: new Date().getTime(),
        registerFunction: function (E) {
            if ('function' == typeof E) {
                MobileUtils.count++;
                var p = 'mobilejscbf' + MobileUtils.count;
                window[p] = function () {
                    E.apply(this, arguments);
                    delete window[p];
                };
                return p;
            }
            return 'string' == typeof E ? E : '';
        },
        supportTwidAndroid: function () {
            return 'undefined' != typeof this.androidInterface && 'function' == typeof this.androidInterface.GetVersion;
        },
        toNumber: function (E) {
            return 'number' != typeof E ? ((E = parseInt(E)), isNaN(E) ? 0 : E) : E;
        },
        androidInterface: window.twidMobile || window.mobile,
    };
function mobileAndTabletcheck() {
    var E = !1;
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (E = !0);
    return E;
}
function TwcaCryptoLibAlertDialog() {
    this.show = function (E, p, H, t, K, B) {
        if (!document.getElementById('dialogoverlay')) {
            var y = document.createElement('DIV');
            y.id = 'dialogoverlay';
            document.body.appendChild(y);
        }
        if (!document.getElementById('dialogbox')) {
            y = document.createElement('DIV');
            y.id = 'dialogbox';
            var C = document.createElement('DIV');
            C.id = 'dialogboxhead';
            var z = document.createElement('DIV');
            z.id = 'dialogboxbody';
            var a = document.createElement('DIV');
            a.id = 'dialogboxfoot';
            y.appendChild(C);
            y.appendChild(z);
            y.appendChild(a);
            document.body.appendChild(y);
        }
        y = window.innerWidth;
        var g = window.innerHeight;
        if (void 0 === y || void 0 === g)
            (y = document.documentElement.clientWidth), (g = document.documentElement.clientHeight);
        var d = Math.max(Math.min(0.35 * y, 420), 280),
            G = document.getElementById('dialogoverlay'),
            h = document.getElementById('dialogbox');
        C = document.getElementById('dialogboxhead');
        z = document.getElementById('dialogboxbody');
        a = document.getElementById('dialogboxfoot');
        G.style.display = 'block';
        G.style.height = g + 'px';
        G.style.opacity = 0.8;
        G.style.position = 'fixed';
        G.style.top = '0px';
        G.style.left = '0px';
        G.style.background = '#000';
        G.style.width = '100%';
        G.style.zIndex = 10;
        h.style.display = 'block';
        h.style.left = y / 2 - d / 2 + 'px';
        h.style.top = 0.15 * g + 'px';
        h.style.position = 'fixed';
        h.style.background = '#FFF';
        h.style.width = d + 'px';
        h.style.zIndex = 10;
        h.style.border = 'solid';
        h.style.borderWidth = '1px';
        h.style.borderColor = '#000000';
        h.style.borderTopLeftRadius = '5px';
        h.style.borderTopRightRadius = '5px';
        h.style.borderBottomLeftRadius = '5px';
        h.style.borderBottomRightRadius = '5px';
        C.style.background = '#E2E2E2';
        C.style.borderColor = '#000000';
        C.style.color = '#666666';
        C.style.fontWeight = 'bold';
        C.style.font.size = '19px';
        C.style.padding = '10px';
        C.style.borderTopLeftRadius = '5px';
        C.style.borderTopRightRadius = '5px';
        C.style.textAlign = 'center';
        z.style.font.size = '18px';
        z.style.color = '#717171';
        z.style.textAlign = 'center';
        a.style.background = '#E2E2E2';
        a.style.borderColor = '#000000';
        a.style.font.size = '10px';
        a.style.height = '35px';
        a.style.lineHeight = '35px';
        a.style.textAlign = 'center';
        a.style.borderBottomLeftRadius = '5px';
        a.style.borderBottomRightRadius = '5px';
        twcaDialogParams = B;
        document.getElementById('dialogboxhead').innerHTML = E;
        document.getElementById('dialogboxbody').innerHTML =
            '<br/>&nbsp;&nbsp;' +
            p +
            '<br/>&nbsp;&nbsp;' +
            H +
            '&nbsp;<input id="twcaCryptoLibInput" type="password"/><br/><br/>';
        document.getElementById('dialogboxfoot').innerHTML =
            '<input type="button" id="twcaCryptoLibAlertDialogBtnCancel" value="' +
            t +
            '" onclick="twcaCryptoLibAlertDialog.cancel(twcaDialogParams);" style="width:' +
            0.25 * d +
            'px;" /> &nbsp; <input id="twcaCryptoLibAlertDialogBtnOK" type="button" value="' +
            K +
            '" onclick="twcaCryptoLibAlertDialog.ok(twcaDialogParams);" style="width:' +
            0.25 * d +
            'px;" />';
        document.getElementById('twcaCryptoLibInput').addEventListener('keyup', function (a) {
            a.preventDefault();
            13 == a.keyCode && document.getElementById('twcaCryptoLibAlertDialogBtnOK').click();
            27 == a.keyCode && document.getElementById('twcaCryptoLibAlertDialogBtnCancel').click();
        });
        document.getElementById('twcaCryptoLibInput').focus();
    };
    this.ok = function (E) {
        twcaDialogParams = null;
        document.getElementById('dialogbox').style.display = 'none';
        document.getElementById('dialogoverlay').style.display = 'none';
        'SelectSignerEx' == E[0]
            ? E[10].SelectSignerEx(
                  E[1],
                  E[2],
                  E[3],
                  document.getElementById('twcaCryptoLibInput').value,
                  E[5],
                  E[6],
                  E[7],
                  E[8],
                  E[9],
              )
            : 'SelectSignerExFromChild' == E[0] &&
              E[10].SelectSignerEx(
                  E[1],
                  E[2],
                  E[3],
                  document.getElementById('twcaCryptoLibInput').value,
                  E[5],
                  E[6],
                  E[7],
                  E[8],
                  E[9],
              );
    };
    this.cancel = function (E) {
        twcaDialogParams = null;
        document.getElementById('dialogbox').style.display = 'none';
        document.getElementById('dialogoverlay').style.display = 'none';
        'SelectSignerEx' == E[0]
            ? E[10].callback(E[9], 5070, '\u4f7f\u7528\u8005\u6309\u4e0b\u53d6\u6d88', '')
            : 'SelectSignerExFromChild' == E[0] &&
              E[10].callback(E[9], 5070, '\u4f7f\u7528\u8005\u6309\u4e0b\u53d6\u6d88', '');
    };
}
var support_amd;
try {
    support_amd = define.amd;
} catch (E) {
    (function (p, H) {
        'function' === typeof define && define.amd ? define([], H) : (p.forge = H());
    })(this, function () {
        var p, H, t;
        (function (K) {
            function B(c, a) {
                var e,
                    l,
                    r = a && a.split('/'),
                    n = b.map,
                    q = (n && n['*']) || {};
                if (c) {
                    c = c.split('/');
                    var m = c.length - 1;
                    b.nodeIdCompat && u.test(c[m]) && (c[m] = c[m].replace(u, ''));
                    '.' === c[0].charAt(0) && r && ((m = r.slice(0, r.length - 1)), (c = m.concat(c)));
                    for (m = 0; m < c.length; m++) {
                        var x = c[m];
                        '.' === x
                            ? (c.splice(m, 1), --m)
                            : '..' === x &&
                              0 !== m &&
                              (1 !== m || '..' !== c[2]) &&
                              '..' !== c[m - 1] &&
                              0 < m &&
                              (c.splice(m - 1, 2), (m -= 2));
                    }
                    c = c.join('/');
                }
                if ((r || q) && n) {
                    x = c.split('/');
                    for (m = x.length; 0 < m; --m) {
                        var f = x.slice(0, m).join('/');
                        if (r)
                            for (l = r.length; 0 < l; --l)
                                if ((e = n[r.slice(0, l).join('/')]))
                                    if ((e = e[f])) {
                                        var k = e;
                                        var D = m;
                                        break;
                                    }
                        if (k) break;
                        if (!d && q && q[f]) {
                            var d = q[f];
                            var v = m;
                        }
                    }
                    !k && d && ((k = d), (D = v));
                    k && (x.splice(0, D, k), (c = x.join('/')));
                }
                return c;
            }
            function y(c, a) {
                return function () {
                    var b = k.call(arguments, 0);
                    'string' !== typeof b[0] && 1 === b.length && b.push(null);
                    return G.apply(K, b.concat([c, a]));
                };
            }
            function C(c) {
                return function (a) {
                    return B(a, c);
                };
            }
            function z(c) {
                return function (a) {
                    h[c] = a;
                };
            }
            function a(c) {
                if (w.call(f, c)) {
                    var a = f[c];
                    delete f[c];
                    e[c] = !0;
                    q.apply(K, a);
                }
                if (!w.call(h, c) && !w.call(e, c)) throw Error('No ' + c);
                return h[c];
            }
            function g(c) {
                var a = c ? c.indexOf('!') : -1;
                if (-1 < a) {
                    var b = c.substring(0, a);
                    c = c.substring(a + 1, c.length);
                }
                return [b, c];
            }
            function d(c) {
                return function () {
                    return (b && b.config && b.config[c]) || {};
                };
            }
            var G,
                h = {},
                f = {},
                b = {},
                e = {},
                w = Object.prototype.hasOwnProperty,
                k = [].slice,
                u = /\.js$/;
            var v = function (c, b) {
                var e = g(c),
                    l = e[0],
                    r = b[1];
                c = e[1];
                if (l) {
                    l = B(l, r);
                    var n = a(l);
                }
                l
                    ? (c = n && n.normalize ? n.normalize(c, C(r)) : B(c, r))
                    : ((c = B(c, r)), (e = g(c)), (l = e[0]), (c = e[1]), l && (n = a(l)));
                return { f: l ? l + '!' + c : c, n: c, pr: l, p: n };
            };
            var c = {
                require: function (c) {
                    return y(c);
                },
                exports: function (c) {
                    var a = h[c];
                    return 'undefined' !== typeof a ? a : (h[c] = {});
                },
                module: function (c) {
                    return { id: c, uri: '', exports: h[c], config: d(c) };
                },
            };
            var q = function (b, q, A, l) {
                var r,
                    n = [];
                var x = typeof A;
                var m = (l = l || b) ? g(l) : [];
                if ('undefined' === x || 'function' === x) {
                    q = !q.length && A.length ? ['require', 'exports', 'module'] : q;
                    for (r = 0; r < q.length; r += 1) {
                        var k = v(q[r], m);
                        x = k.f;
                        if ('require' === x) n[r] = c.require(b);
                        else if ('exports' === x) {
                            n[r] = c.exports(b);
                            var D = !0;
                        } else if ('module' === x) var I = (n[r] = c.module(b));
                        else if (w.call(h, x) || w.call(f, x) || w.call(e, x)) n[r] = a(x);
                        else if (k.p) k.p.load(k.n, y(l, !0), z(x), {}), (n[r] = h[x]);
                        else throw Error(b + ' missing ' + x);
                    }
                    q = A ? A.apply(h[b], n) : void 0;
                    b &&
                        (I && I.exports !== K && I.exports !== h[b]
                            ? (h[b] = I.exports)
                            : (q === K && D) || (h[b] = q));
                } else b && (h[b] = A);
            };
            p = H = G = function (e, f, A, l, r) {
                if ('string' === typeof e) return c[e] ? c[e](f) : a(v(e, f ? g(f) : []).f);
                if (!e.splice) {
                    b = e;
                    b.deps && G(b.deps, b.callback);
                    if (!f) return;
                    f.splice ? ((e = f), (f = A), (A = null)) : (e = K);
                }
                f = f || function () {};
                'function' === typeof A && ((A = l), (l = r));
                l
                    ? q(K, e, f, A)
                    : setTimeout(function () {
                          q(K, e, f, A);
                      }, 4);
                return G;
            };
            G.config = function (c) {
                return G(c);
            };
            p._defined = h;
            t = function (c, a, b) {
                if ('string' !== typeof c) throw Error('See almond README: incorrect module build, no module name');
                a.splice || ((b = a), (a = []));
                w.call(h, c) || w.call(f, c) || (f[c] = [c, a, b]);
            };
            t.amd = { jQuery: !0 };
        })();
        t('node_modules/almond/almond', function () {});
        (function () {
            function p(a) {
                function g(c) {
                    this.data = '';
                    this.read = 0;
                    if ('string' === typeof c) this.data = c;
                    else if (d.isArrayBuffer(c) || d.isArrayBufferView(c)) {
                        c = new Uint8Array(c);
                        try {
                            this.data = String.fromCharCode.apply(null, c);
                        } catch (x) {
                            for (var a = 0; a < c.length; ++a) this.putByte(c[a]);
                        }
                    } else if (
                        c instanceof g ||
                        ('object' === typeof c && 'string' === typeof c.data && 'number' === typeof c.read)
                    )
                        (this.data = c.data), (this.read = c.read);
                    this._constructedStringLength = 0;
                }
                var d = (a.util = a.util || {});
                (function () {
                    if ('undefined' !== typeof process && process.nextTick)
                        (d.nextTick = process.nextTick),
                            (d.setImmediate = 'function' === typeof setImmediate ? setImmediate : d.nextTick);
                    else if ('function' === typeof setImmediate)
                        (d.setImmediate = function () {
                            return setImmediate.apply(void 0, arguments);
                        }),
                            (d.nextTick = function (c) {
                                return setImmediate(c);
                            });
                    else {
                        d.setImmediate = function (c) {
                            setTimeout(c, 0);
                        };
                        if ('undefined' !== typeof window && 'function' === typeof window.postMessage) {
                            var c = [];
                            d.setImmediate = function (a) {
                                c.push(a);
                                1 === c.length && window.postMessage('forge.setImmediate', '*');
                            };
                            window.addEventListener(
                                'message',
                                function (a) {
                                    a.source === window &&
                                        'forge.setImmediate' === a.data &&
                                        (a.stopPropagation(),
                                        (a = c.slice()),
                                        (c.length = 0),
                                        a.forEach(function (c) {
                                            c();
                                        }));
                                },
                                !0,
                            );
                        }
                        if ('undefined' !== typeof MutationObserver) {
                            var a = Date.now(),
                                b = !0,
                                e = document.createElement('div');
                            c = [];
                            new MutationObserver(function () {
                                var a = c.slice();
                                c.length = 0;
                                a.forEach(function (c) {
                                    c();
                                });
                            }).observe(e, { attributes: !0 });
                            var f = d.setImmediate;
                            d.setImmediate = function (l) {
                                15 < Date.now() - a
                                    ? ((a = Date.now()), f(l))
                                    : (c.push(l), 1 === c.length && e.setAttribute('a', (b = !b)));
                            };
                        }
                        d.nextTick = d.setImmediate;
                    }
                })();
                d.isArray =
                    Array.isArray ||
                    function (c) {
                        return '[object Array]' === Object.prototype.toString.call(c);
                    };
                d.isArrayBuffer = function (c) {
                    return 'undefined' !== typeof ArrayBuffer && c instanceof ArrayBuffer;
                };
                d.isArrayBufferView = function (c) {
                    return c && d.isArrayBuffer(c.buffer) && void 0 !== c.byteLength;
                };
                d.ByteBuffer = g;
                d.ByteStringBuffer = g;
                d.ByteStringBuffer.prototype._optimizeConstructedString = function (c) {
                    this._constructedStringLength += c;
                    4096 < this._constructedStringLength &&
                        (this.data.substr(0, 1), (this._constructedStringLength = 0));
                };
                d.ByteStringBuffer.prototype.length = function () {
                    return this.data.length - this.read;
                };
                d.ByteStringBuffer.prototype.isEmpty = function () {
                    return 0 >= this.length();
                };
                d.ByteStringBuffer.prototype.putByte = function (c) {
                    return this.putBytes(String.fromCharCode(c));
                };
                d.ByteStringBuffer.prototype.fillWithByte = function (c, a) {
                    c = String.fromCharCode(c);
                    for (var b = this.data; 0 < a; ) a & 1 && (b += c), (a >>>= 1), 0 < a && (c += c);
                    this.data = b;
                    this._optimizeConstructedString(a);
                    return this;
                };
                d.ByteStringBuffer.prototype.putBytes = function (c) {
                    this.data += c;
                    this._optimizeConstructedString(c.length);
                    return this;
                };
                d.ByteStringBuffer.prototype.putString = function (c) {
                    return this.putBytes(d.encodeUtf8(c));
                };
                d.ByteStringBuffer.prototype.putInt16 = function (c) {
                    return this.putBytes(String.fromCharCode((c >> 8) & 255) + String.fromCharCode(c & 255));
                };
                d.ByteStringBuffer.prototype.putInt24 = function (c) {
                    return this.putBytes(
                        String.fromCharCode((c >> 16) & 255) +
                            String.fromCharCode((c >> 8) & 255) +
                            String.fromCharCode(c & 255),
                    );
                };
                d.ByteStringBuffer.prototype.putInt32 = function (c) {
                    return this.putBytes(
                        String.fromCharCode((c >> 24) & 255) +
                            String.fromCharCode((c >> 16) & 255) +
                            String.fromCharCode((c >> 8) & 255) +
                            String.fromCharCode(c & 255),
                    );
                };
                d.ByteStringBuffer.prototype.putInt16Le = function (c) {
                    return this.putBytes(String.fromCharCode(c & 255) + String.fromCharCode((c >> 8) & 255));
                };
                d.ByteStringBuffer.prototype.putInt24Le = function (c) {
                    return this.putBytes(
                        String.fromCharCode(c & 255) +
                            String.fromCharCode((c >> 8) & 255) +
                            String.fromCharCode((c >> 16) & 255),
                    );
                };
                d.ByteStringBuffer.prototype.putInt32Le = function (c) {
                    return this.putBytes(
                        String.fromCharCode(c & 255) +
                            String.fromCharCode((c >> 8) & 255) +
                            String.fromCharCode((c >> 16) & 255) +
                            String.fromCharCode((c >> 24) & 255),
                    );
                };
                d.ByteStringBuffer.prototype.putInt = function (c, a) {
                    var b = '';
                    do (a -= 8), (b += String.fromCharCode((c >> a) & 255));
                    while (0 < a);
                    return this.putBytes(b);
                };
                d.ByteStringBuffer.prototype.putSignedInt = function (c, a) {
                    0 > c && (c += 2 << (a - 1));
                    return this.putInt(c, a);
                };
                d.ByteStringBuffer.prototype.putBuffer = function (c) {
                    return this.putBytes(c.getBytes());
                };
                d.ByteStringBuffer.prototype.getByte = function () {
                    return this.data.charCodeAt(this.read++);
                };
                d.ByteStringBuffer.prototype.getInt16 = function () {
                    var c = (this.data.charCodeAt(this.read) << 8) ^ this.data.charCodeAt(this.read + 1);
                    this.read += 2;
                    return c;
                };
                d.ByteStringBuffer.prototype.getInt24 = function () {
                    var c =
                        (this.data.charCodeAt(this.read) << 16) ^
                        (this.data.charCodeAt(this.read + 1) << 8) ^
                        this.data.charCodeAt(this.read + 2);
                    this.read += 3;
                    return c;
                };
                d.ByteStringBuffer.prototype.getInt32 = function () {
                    var c =
                        (this.data.charCodeAt(this.read) << 24) ^
                        (this.data.charCodeAt(this.read + 1) << 16) ^
                        (this.data.charCodeAt(this.read + 2) << 8) ^
                        this.data.charCodeAt(this.read + 3);
                    this.read += 4;
                    return c;
                };
                d.ByteStringBuffer.prototype.getInt16Le = function () {
                    var c = this.data.charCodeAt(this.read) ^ (this.data.charCodeAt(this.read + 1) << 8);
                    this.read += 2;
                    return c;
                };
                d.ByteStringBuffer.prototype.getInt24Le = function () {
                    var c =
                        this.data.charCodeAt(this.read) ^
                        (this.data.charCodeAt(this.read + 1) << 8) ^
                        (this.data.charCodeAt(this.read + 2) << 16);
                    this.read += 3;
                    return c;
                };
                d.ByteStringBuffer.prototype.getInt32Le = function () {
                    var c =
                        this.data.charCodeAt(this.read) ^
                        (this.data.charCodeAt(this.read + 1) << 8) ^
                        (this.data.charCodeAt(this.read + 2) << 16) ^
                        (this.data.charCodeAt(this.read + 3) << 24);
                    this.read += 4;
                    return c;
                };
                d.ByteStringBuffer.prototype.getInt = function (c) {
                    var a = 0;
                    do (a = (a << 8) + this.data.charCodeAt(this.read++)), (c -= 8);
                    while (0 < c);
                    return a;
                };
                d.ByteStringBuffer.prototype.getSignedInt = function (c) {
                    var a = this.getInt(c);
                    c = 2 << (c - 2);
                    a >= c && (a -= c << 1);
                    return a;
                };
                d.ByteStringBuffer.prototype.getBytes = function (c) {
                    if (c) {
                        c = Math.min(this.length(), c);
                        var a = this.data.slice(this.read, this.read + c);
                        this.read += c;
                    } else
                        0 === c
                            ? (a = '')
                            : ((a = 0 === this.read ? this.data : this.data.slice(this.read)), this.clear());
                    return a;
                };
                d.ByteStringBuffer.prototype.bytes = function (c) {
                    return 'undefined' === typeof c
                        ? this.data.slice(this.read)
                        : this.data.slice(this.read, this.read + c);
                };
                d.ByteStringBuffer.prototype.at = function (c) {
                    return this.data.charCodeAt(this.read + c);
                };
                d.ByteStringBuffer.prototype.setAt = function (c, a) {
                    this.data =
                        this.data.substr(0, this.read + c) +
                        String.fromCharCode(a) +
                        this.data.substr(this.read + c + 1);
                    return this;
                };
                d.ByteStringBuffer.prototype.last = function () {
                    return this.data.charCodeAt(this.data.length - 1);
                };
                d.ByteStringBuffer.prototype.copy = function () {
                    var c = d.createBuffer(this.data);
                    c.read = this.read;
                    return c;
                };
                d.ByteStringBuffer.prototype.compact = function () {
                    0 < this.read && ((this.data = this.data.slice(this.read)), (this.read = 0));
                    return this;
                };
                d.ByteStringBuffer.prototype.clear = function () {
                    this.data = '';
                    this.read = 0;
                    return this;
                };
                d.ByteStringBuffer.prototype.truncate = function (c) {
                    c = Math.max(0, this.length() - c);
                    this.data = this.data.substr(this.read, c);
                    this.read = 0;
                    return this;
                };
                d.ByteStringBuffer.prototype.toHex = function () {
                    for (var c = '', a = this.read; a < this.data.length; ++a) {
                        var b = this.data.charCodeAt(a);
                        16 > b && (c += '0');
                        c += b.toString(16);
                    }
                    return c;
                };
                d.ByteStringBuffer.prototype.toString = function () {
                    return d.decodeUtf8(this.bytes());
                };
                d.DataBuffer = function (c, a) {
                    a = a || {};
                    this.read = a.readOffset || 0;
                    this.growSize = a.growSize || 1024;
                    var b = d.isArrayBuffer(c),
                        e = d.isArrayBufferView(c);
                    b || e
                        ? ((this.data = b ? new DataView(c) : new DataView(c.buffer, c.byteOffset, c.byteLength)),
                          (this.write = 'writeOffset' in a ? a.writeOffset : this.data.byteLength))
                        : ((this.data = new DataView(new ArrayBuffer(0))),
                          (this.write = 0),
                          null !== c && void 0 !== c && this.putBytes(c),
                          'writeOffset' in a && (this.write = a.writeOffset));
                };
                d.DataBuffer.prototype.length = function () {
                    return this.write - this.read;
                };
                d.DataBuffer.prototype.isEmpty = function () {
                    return 0 >= this.length();
                };
                d.DataBuffer.prototype.accommodate = function (c, a) {
                    if (this.length() >= c) return this;
                    a = Math.max(a || this.growSize, c);
                    var b = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.byteLength),
                        e = new Uint8Array(this.length() + a);
                    e.set(b);
                    this.data = new DataView(e.buffer);
                    return this;
                };
                d.DataBuffer.prototype.putByte = function (c) {
                    this.accommodate(1);
                    this.data.setUint8(this.write++, c);
                    return this;
                };
                d.DataBuffer.prototype.fillWithByte = function (c, a) {
                    this.accommodate(a);
                    for (var b = 0; b < a; ++b) this.data.setUint8(c);
                    return this;
                };
                d.DataBuffer.prototype.putBytes = function (c, a) {
                    if (d.isArrayBufferView(c)) {
                        var b = new Uint8Array(c.buffer, c.byteOffset, c.byteLength),
                            e = b.byteLength - b.byteOffset;
                        this.accommodate(e);
                        var q = new Uint8Array(this.data.buffer, this.write);
                        q.set(b);
                        this.write += e;
                        return this;
                    }
                    if (d.isArrayBuffer(c))
                        return (
                            (b = new Uint8Array(c)),
                            this.accommodate(b.byteLength),
                            (q = new Uint8Array(this.data.buffer)),
                            q.set(b, this.write),
                            (this.write += b.byteLength),
                            this
                        );
                    if (
                        c instanceof d.DataBuffer ||
                        ('object' === typeof c &&
                            'number' === typeof c.read &&
                            'number' === typeof c.write &&
                            d.isArrayBufferView(c.data))
                    )
                        return (
                            (b = new Uint8Array(c.data.byteLength, c.read, c.length())),
                            this.accommodate(b.byteLength),
                            (q = new Uint8Array(c.data.byteLength, this.write)),
                            q.set(b),
                            (this.write += b.byteLength),
                            this
                        );
                    c instanceof d.ByteStringBuffer && ((c = c.data), (a = 'binary'));
                    a = a || 'binary';
                    if ('string' === typeof c) {
                        if ('hex' === a)
                            return (
                                this.accommodate(Math.ceil(c.length / 2)),
                                (b = new Uint8Array(this.data.buffer, this.write)),
                                (this.write += d.binary.hex.decode(c, b, this.write)),
                                this
                            );
                        if ('base64' === a)
                            return (
                                this.accommodate(3 * Math.ceil(c.length / 4)),
                                (b = new Uint8Array(this.data.buffer, this.write)),
                                (this.write += d.binary.base64.decode(c, b, this.write)),
                                this
                            );
                        'utf8' === a && ((c = d.encodeUtf8(c)), (a = 'binary'));
                        if ('binary' === a || 'raw' === a)
                            return (
                                this.accommodate(c.length),
                                (b = new Uint8Array(this.data.buffer, this.write)),
                                (this.write += d.binary.raw.decode(b)),
                                this
                            );
                        if ('utf16' === a)
                            return (
                                this.accommodate(2 * c.length),
                                (b = new Uint16Array(this.data.buffer, this.write)),
                                (this.write += d.text.utf16.encode(b)),
                                this
                            );
                        throw Error('Invalid encoding: ' + a);
                    }
                    throw Error('Invalid parameter: ' + c);
                };
                d.DataBuffer.prototype.putBuffer = function (c) {
                    this.putBytes(c);
                    c.clear();
                    return this;
                };
                d.DataBuffer.prototype.putString = function (c) {
                    return this.putBytes(c, 'utf16');
                };
                d.DataBuffer.prototype.putInt16 = function (c) {
                    this.accommodate(2);
                    this.data.setInt16(this.write, c);
                    this.write += 2;
                    return this;
                };
                d.DataBuffer.prototype.putInt24 = function (c) {
                    this.accommodate(3);
                    this.data.setInt16(this.write, (c >> 8) & 65535);
                    this.data.setInt8(this.write, (c >> 16) & 255);
                    this.write += 3;
                    return this;
                };
                d.DataBuffer.prototype.putInt32 = function (c) {
                    this.accommodate(4);
                    this.data.setInt32(this.write, c);
                    this.write += 4;
                    return this;
                };
                d.DataBuffer.prototype.putInt16Le = function (c) {
                    this.accommodate(2);
                    this.data.setInt16(this.write, c, !0);
                    this.write += 2;
                    return this;
                };
                d.DataBuffer.prototype.putInt24Le = function (c) {
                    this.accommodate(3);
                    this.data.setInt8(this.write, (c >> 16) & 255);
                    this.data.setInt16(this.write, (c >> 8) & 65535, !0);
                    this.write += 3;
                    return this;
                };
                d.DataBuffer.prototype.putInt32Le = function (c) {
                    this.accommodate(4);
                    this.data.setInt32(this.write, c, !0);
                    this.write += 4;
                    return this;
                };
                d.DataBuffer.prototype.putInt = function (c, a) {
                    this.accommodate(a / 8);
                    do (a -= 8), this.data.setInt8(this.write++, (c >> a) & 255);
                    while (0 < a);
                    return this;
                };
                d.DataBuffer.prototype.putSignedInt = function (c, a) {
                    this.accommodate(a / 8);
                    0 > c && (c += 2 << (a - 1));
                    return this.putInt(c, a);
                };
                d.DataBuffer.prototype.getByte = function () {
                    return this.data.getInt8(this.read++);
                };
                d.DataBuffer.prototype.getInt16 = function () {
                    var c = this.data.getInt16(this.read);
                    this.read += 2;
                    return c;
                };
                d.DataBuffer.prototype.getInt24 = function () {
                    var c = (this.data.getInt16(this.read) << 8) ^ this.data.getInt8(this.read + 2);
                    this.read += 3;
                    return c;
                };
                d.DataBuffer.prototype.getInt32 = function () {
                    var c = this.data.getInt32(this.read);
                    this.read += 4;
                    return c;
                };
                d.DataBuffer.prototype.getInt16Le = function () {
                    var c = this.data.getInt16(this.read, !0);
                    this.read += 2;
                    return c;
                };
                d.DataBuffer.prototype.getInt24Le = function () {
                    var c = this.data.getInt8(this.read) ^ (this.data.getInt16(this.read + 1, !0) << 8);
                    this.read += 3;
                    return c;
                };
                d.DataBuffer.prototype.getInt32Le = function () {
                    var c = this.data.getInt32(this.read, !0);
                    this.read += 4;
                    return c;
                };
                d.DataBuffer.prototype.getInt = function (c) {
                    var a = 0;
                    do (a = (a << 8) + this.data.getInt8(this.read++)), (c -= 8);
                    while (0 < c);
                    return a;
                };
                d.DataBuffer.prototype.getSignedInt = function (c) {
                    var a = this.getInt(c);
                    c = 2 << (c - 2);
                    a >= c && (a -= c << 1);
                    return a;
                };
                d.DataBuffer.prototype.getBytes = function (c) {
                    if (c) {
                        c = Math.min(this.length(), c);
                        var a = this.data.slice(this.read, this.read + c);
                        this.read += c;
                    } else
                        0 === c
                            ? (a = '')
                            : ((a = 0 === this.read ? this.data : this.data.slice(this.read)), this.clear());
                    return a;
                };
                d.DataBuffer.prototype.bytes = function (c) {
                    return 'undefined' === typeof c
                        ? this.data.slice(this.read)
                        : this.data.slice(this.read, this.read + c);
                };
                d.DataBuffer.prototype.at = function (c) {
                    return this.data.getUint8(this.read + c);
                };
                d.DataBuffer.prototype.setAt = function (c, a) {
                    this.data.setUint8(c, a);
                    return this;
                };
                d.DataBuffer.prototype.last = function () {
                    return this.data.getUint8(this.write - 1);
                };
                d.DataBuffer.prototype.copy = function () {
                    return new d.DataBuffer(this);
                };
                d.DataBuffer.prototype.compact = function () {
                    if (0 < this.read) {
                        var c = new Uint8Array(this.data.buffer, this.read),
                            a = new Uint8Array(c.byteLength);
                        a.set(c);
                        this.data = new DataView(a);
                        this.write -= this.read;
                        this.read = 0;
                    }
                    return this;
                };
                d.DataBuffer.prototype.clear = function () {
                    this.data = new DataView(new ArrayBuffer(0));
                    this.read = this.write = 0;
                    return this;
                };
                d.DataBuffer.prototype.truncate = function (c) {
                    this.write = Math.max(0, this.length() - c);
                    this.read = Math.min(this.read, this.write);
                    return this;
                };
                d.DataBuffer.prototype.toHex = function () {
                    for (var c = '', a = this.read; a < this.data.byteLength; ++a) {
                        var b = this.data.getUint8(a);
                        16 > b && (c += '0');
                        c += b.toString(16);
                    }
                    return c;
                };
                d.DataBuffer.prototype.toString = function (c) {
                    var a = new Uint8Array(this.data, this.read, this.length());
                    c = c || 'utf8';
                    if ('binary' === c || 'raw' === c) return d.binary.raw.encode(a);
                    if ('hex' === c) return d.binary.hex.encode(a);
                    if ('base64' === c) return d.binary.base64.encode(a);
                    if ('utf8' === c) return d.text.utf8.decode(a);
                    if ('utf16' === c) return d.text.utf16.decode(a);
                    throw Error('Invalid encoding: ' + c);
                };
                d.createBuffer = function (c, a) {
                    void 0 !== c && 'utf8' === (a || 'raw') && (c = d.encodeUtf8(c));
                    return new d.ByteBuffer(c);
                };
                d.fillString = function (c, a) {
                    for (var b = ''; 0 < a; ) a & 1 && (b += c), (a >>>= 1), 0 < a && (c += c);
                    return b;
                };
                d.xorBytes = function (c, a, b) {
                    for (var e = '', f, l = '', r = 0, n = 0; 0 < b; --b, ++r)
                        (f = c.charCodeAt(r) ^ a.charCodeAt(r)),
                            10 <= n && ((e += l), (l = ''), (n = 0)),
                            (l += String.fromCharCode(f)),
                            ++n;
                    return e + l;
                };
                d.hexToBytes = function (c) {
                    var a = '',
                        b = 0;
                    c.length & 1 && ((b = 1), (a += String.fromCharCode(parseInt(c[0], 16))));
                    for (; b < c.length; b += 2) a += String.fromCharCode(parseInt(c.substr(b, 2), 16));
                    return a;
                };
                d.bytesToHex = function (c) {
                    return d.createBuffer(c).toHex();
                };
                d.int32ToBytes = function (c) {
                    return (
                        String.fromCharCode((c >> 24) & 255) +
                        String.fromCharCode((c >> 16) & 255) +
                        String.fromCharCode((c >> 8) & 255) +
                        String.fromCharCode(c & 255)
                    );
                };
                var G = [
                    62,
                    -1,
                    -1,
                    -1,
                    63,
                    52,
                    53,
                    54,
                    55,
                    56,
                    57,
                    58,
                    59,
                    60,
                    61,
                    -1,
                    -1,
                    -1,
                    64,
                    -1,
                    -1,
                    -1,
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    26,
                    27,
                    28,
                    29,
                    30,
                    31,
                    32,
                    33,
                    34,
                    35,
                    36,
                    37,
                    38,
                    39,
                    40,
                    41,
                    42,
                    43,
                    44,
                    45,
                    46,
                    47,
                    48,
                    49,
                    50,
                    51,
                ];
                d.encode64 = function (c, a) {
                    for (var b = '', e = '', f, l, r, n = 0; n < c.length; )
                        (f = c.charCodeAt(n++)),
                            (l = c.charCodeAt(n++)),
                            (r = c.charCodeAt(n++)),
                            (b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(f >> 2)),
                            (b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(
                                ((f & 3) << 4) | (l >> 4),
                            )),
                            isNaN(l)
                                ? (b += '==')
                                : ((b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(
                                      ((l & 15) << 2) | (r >> 6),
                                  )),
                                  (b += isNaN(r)
                                      ? '='
                                      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(
                                            r & 63,
                                        ))),
                            a && b.length > a && ((e += b.substr(0, a) + '\r\n'), (b = b.substr(a)));
                    return e + b;
                };
                d.decode64 = function (c) {
                    c = c.replace(/[^A-Za-z0-9\+\/=]/g, '');
                    for (var a = '', b, e, f, l, r = 0; r < c.length; )
                        (b = G[c.charCodeAt(r++) - 43]),
                            (e = G[c.charCodeAt(r++) - 43]),
                            (f = G[c.charCodeAt(r++) - 43]),
                            (l = G[c.charCodeAt(r++) - 43]),
                            (a += String.fromCharCode((b << 2) | (e >> 4))),
                            64 !== f &&
                                ((a += String.fromCharCode(((e & 15) << 4) | (f >> 2))),
                                64 !== l && (a += String.fromCharCode(((f & 3) << 6) | l)));
                    return a;
                };
                d.encodeUtf8 = function (c) {
                    return unescape(encodeURIComponent(c));
                };
                d.decodeUtf8 = function (c) {
                    return decodeURIComponent(escape(c));
                };
                d.binary = { raw: {}, hex: {}, base64: {} };
                d.binary.raw.encode = function (c) {
                    return String.fromCharCode.apply(null, c);
                };
                d.binary.raw.decode = function (c, a, b) {
                    var e = a;
                    e || (e = new Uint8Array(c.length));
                    for (var f = (b = b || 0), l = 0; l < c.length; ++l) e[f++] = c.charCodeAt(l);
                    return a ? f - b : e;
                };
                d.binary.hex.encode = d.bytesToHex;
                d.binary.hex.decode = function (c, a, b) {
                    var e = a;
                    e || (e = new Uint8Array(Math.ceil(c.length / 2)));
                    b = b || 0;
                    var f = 0,
                        l = b;
                    c.length & 1 && ((f = 1), (e[l++] = parseInt(c[0], 16)));
                    for (; f < c.length; f += 2) e[l++] = parseInt(c.substr(f, 2), 16);
                    return a ? l - b : e;
                };
                d.binary.base64.encode = function (c, a) {
                    for (var b = '', e = '', f, l, r, n = 0; n < c.byteLength; )
                        (f = c[n++]),
                            (l = c[n++]),
                            (r = c[n++]),
                            (b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(f >> 2)),
                            (b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(
                                ((f & 3) << 4) | (l >> 4),
                            )),
                            isNaN(l)
                                ? (b += '==')
                                : ((b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(
                                      ((l & 15) << 2) | (r >> 6),
                                  )),
                                  (b += isNaN(r)
                                      ? '='
                                      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(
                                            r & 63,
                                        ))),
                            a && b.length > a && ((e += b.substr(0, a) + '\r\n'), (b = b.substr(a)));
                    return e + b;
                };
                d.binary.base64.decode = function (c, a, b) {
                    var e = a;
                    e || (e = new Uint8Array(3 * Math.ceil(c.length / 4)));
                    c = c.replace(/[^A-Za-z0-9\+\/=]/g, '');
                    b = b || 0;
                    for (var f, l, r, n, q = 0, m = b; q < c.length; )
                        (f = G[c.charCodeAt(q++) - 43]),
                            (l = G[c.charCodeAt(q++) - 43]),
                            (r = G[c.charCodeAt(q++) - 43]),
                            (n = G[c.charCodeAt(q++) - 43]),
                            (e[m++] = (f << 2) | (l >> 4)),
                            64 !== r &&
                                ((e[m++] = ((l & 15) << 4) | (r >> 2)), 64 !== n && (e[m++] = ((r & 3) << 6) | n));
                    return a ? m - b : e.subarray(0, m);
                };
                d.text = { utf8: {}, utf16: {} };
                d.text.utf8.encode = function (c, a, b) {
                    c = d.encodeUtf8(c);
                    var e = a;
                    e || (e = new Uint8Array(c.length));
                    for (var f = (b = b || 0), l = 0; l < c.length; ++l) e[f++] = c.charCodeAt(l);
                    return a ? f - b : e;
                };
                d.text.utf8.decode = function (c) {
                    return d.decodeUtf8(String.fromCharCode.apply(null, c));
                };
                d.text.utf16.encode = function (c, a, b) {
                    var e = a;
                    e || (e = new Uint8Array(2 * c.length));
                    for (var f = new Uint16Array(e.buffer), l = (b = b || 0), r = b, n = 0; n < c.length; ++n)
                        (f[r++] = c.charCodeAt(n)), (l += 2);
                    return a ? l - b : e;
                };
                d.text.utf16.decode = function (c) {
                    return String.fromCharCode.apply(null, new Uint16Array(c.buffer));
                };
                d.deflate = function (c, a, b) {
                    a = d.decode64(c.deflate(d.encode64(a)).rval);
                    b && ((c = 2), a.charCodeAt(1) & 32 && (c = 6), (a = a.substring(c, a.length - 4)));
                    return a;
                };
                d.inflate = function (c, a, b) {
                    c = c.inflate(d.encode64(a)).rval;
                    return null === c ? null : d.decode64(c);
                };
                var h = function (c, a, b) {
                        if (!c) throw Error('WebStorage not available.');
                        null === b
                            ? (c = c.removeItem(a))
                            : ((b = d.encode64(JSON.stringify(b))), (c = c.setItem(a, b)));
                        if ('undefined' !== typeof c && !0 !== c.rval)
                            throw ((a = Error(c.error.message)), (a.id = c.error.id), (a.name = c.error.name), a);
                    },
                    f = function (c, a) {
                        if (!c) throw Error('WebStorage not available.');
                        var b = c.getItem(a);
                        if (c.init)
                            if (null === b.rval) {
                                if (b.error) {
                                    var e = Error(b.error.message);
                                    e.id = b.error.id;
                                    e.name = b.error.name;
                                    throw e;
                                }
                                b = null;
                            } else b = b.rval;
                        null !== b && (b = JSON.parse(d.decode64(b)));
                        return b;
                    },
                    b = function (c, a, b, e) {
                        var q = f(c, a);
                        null === q && (q = {});
                        q[b] = e;
                        h(c, a, q);
                    },
                    e = function (c, a, b) {
                        c = f(c, a);
                        null !== c && (c = b in c ? c[b] : null);
                        return c;
                    },
                    w = function (c, a, b) {
                        var e = f(c, a);
                        if (null !== e && b in e) {
                            delete e[b];
                            b = !0;
                            for (var q in e) {
                                b = !1;
                                break;
                            }
                            b && (e = null);
                            h(c, a, e);
                        }
                    },
                    k = function (c, a) {
                        h(c, a, null);
                    },
                    u = function (c, a, b) {
                        var e = null;
                        'undefined' === typeof b && (b = ['web', 'flash']);
                        var f = !1,
                            l = null,
                            r;
                        for (r in b) {
                            var n = b[r];
                            try {
                                if ('flash' === n || 'both' === n) {
                                    if (null === a[0]) throw Error('Flash local storage not available.');
                                    e = c.apply(this, a);
                                    f = 'flash' === n;
                                }
                                if ('web' === n || 'both' === n)
                                    (a[0] = localStorage), (e = c.apply(this, a)), (f = !0);
                            } catch (F) {
                                l = F;
                            }
                            if (f) break;
                        }
                        if (!f) throw l;
                        return e;
                    };
                d.setItem = function (a, e, f, k, A) {
                    u(b, arguments, A);
                };
                d.getItem = function (a, b, f, k) {
                    return u(e, arguments, k);
                };
                d.removeItem = function (a, b, e, f) {
                    u(w, arguments, f);
                };
                d.clearItems = function (a, b, e) {
                    u(k, arguments, e);
                };
                d.parseUrl = function (a) {
                    var c = /^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;
                    c.lastIndex = 0;
                    c = c.exec(a);
                    if ((a = null === c ? null : { full: a, scheme: c[1], host: c[2], port: c[3], path: c[4] }))
                        (a.fullHost = a.host),
                            a.port
                                ? 80 !== a.port && 'http' === a.scheme
                                    ? (a.fullHost += ':' + a.port)
                                    : 443 !== a.port && 'https' === a.scheme && (a.fullHost += ':' + a.port)
                                : 'http' === a.scheme
                                ? (a.port = 80)
                                : 'https' === a.scheme && (a.port = 443),
                            (a.full = a.scheme + '://' + a.fullHost);
                    return a;
                };
                var v = null;
                d.getQueryVariables = function (a) {
                    var c = function (a) {
                        var c = {};
                        a = a.split('&');
                        for (var b = 0; b < a.length; b++) {
                            var l = a[b].indexOf('=');
                            if (0 < l) {
                                var e = a[b].substring(0, l);
                                l = a[b].substring(l + 1);
                            } else (e = a[b]), (l = null);
                            e in c || (c[e] = []);
                            e in Object.prototype || null === l || c[e].push(unescape(l));
                        }
                        return c;
                    };
                    'undefined' === typeof a
                        ? (null === v &&
                              (v =
                                  'undefined' !== typeof window && window.location && window.location.search
                                      ? c(window.location.search.substring(1))
                                      : {}),
                          (a = v))
                        : (a = c(a));
                    return a;
                };
                d.parseFragment = function (a) {
                    var c = a,
                        b = '',
                        e = a.indexOf('?');
                    0 < e && ((c = a.substring(0, e)), (b = a.substring(e + 1)));
                    a = c.split('/');
                    0 < a.length && '' === a[0] && a.shift();
                    e = '' === b ? {} : d.getQueryVariables(b);
                    return { pathString: c, queryString: b, path: a, query: e };
                };
                d.makeRequest = function (a) {
                    var c = d.parseFragment(a),
                        b = {
                            path: c.pathString,
                            query: c.queryString,
                            getPath: function (a) {
                                return 'undefined' === typeof a ? c.path : c.path[a];
                            },
                            getQuery: function (a, b) {
                                if ('undefined' === typeof a) var l = c.query;
                                else (l = c.query[a]) && 'undefined' !== typeof b && (l = l[b]);
                                return l;
                            },
                            getQueryLast: function (a, c) {
                                var l = b.getQuery(a);
                                return l ? l[l.length - 1] : c;
                            },
                        };
                    return b;
                };
                d.makeLink = function (a, b, e) {
                    a = jQuery.isArray(a) ? a.join('/') : a;
                    b = jQuery.param(b || {});
                    e = e || '';
                    return a + (0 < b.length ? '?' + b : '') + (0 < e.length ? '#' + e : '');
                };
                d.setPath = function (a, b, e) {
                    if ('object' === typeof a && null !== a)
                        for (var c = 0, f = b.length; c < f; ) {
                            var l = b[c++];
                            if (c == f) a[l] = e;
                            else {
                                var r = l in a;
                                if (!r || (r && 'object' !== typeof a[l]) || (r && null === a[l])) a[l] = {};
                                a = a[l];
                            }
                        }
                };
                d.getPath = function (a, b, e) {
                    for (var c = 0, f = b.length, l = !0; l && c < f && 'object' === typeof a && null !== a; ) {
                        var r = b[c++];
                        (l = r in a) && (a = a[r]);
                    }
                    return l ? a : e;
                };
                d.deletePath = function (a, b) {
                    if ('object' === typeof a && null !== a)
                        for (var c = 0, e = b.length; c < e; ) {
                            var f = b[c++];
                            if (c == e) delete a[f];
                            else {
                                if (!(f in a) || 'object' !== typeof a[f] || null === a[f]) break;
                                a = a[f];
                            }
                        }
                };
                d.isEmpty = function (a) {
                    for (var c in a) if (a.hasOwnProperty(c)) return !1;
                    return !0;
                };
                d.format = function (a) {
                    var c = /%./g,
                        b,
                        e,
                        f = 0,
                        l = [];
                    for (e = 0; (b = c.exec(a)); )
                        switch (
                            ((e = a.substring(e, c.lastIndex - 2)),
                            0 < e.length && l.push(e),
                            (e = c.lastIndex),
                            (b = b[0][1]),
                            b)
                        ) {
                            case 's':
                            case 'o':
                                f < arguments.length ? l.push(arguments[f++ + 1]) : l.push('<?>');
                                break;
                            case '%':
                                l.push('%');
                                break;
                            default:
                                l.push('<%' + b + '?>');
                        }
                    l.push(a.substring(e));
                    return l.join('');
                };
                d.formatNumber = function (a, b, e, f) {
                    var c = isNaN((b = Math.abs(b))) ? 2 : b;
                    b = void 0 === e ? ',' : e;
                    f = void 0 === f ? '.' : f;
                    e = 0 > a ? '-' : '';
                    var l = parseInt((a = Math.abs(+a || 0).toFixed(c)), 10) + '',
                        r = 3 < l.length ? l.length % 3 : 0;
                    return (
                        e +
                        (r ? l.substr(0, r) + f : '') +
                        l.substr(r).replace(/(\d{3})(?=\d)/g, '$1' + f) +
                        (c
                            ? b +
                              Math.abs(a - l)
                                  .toFixed(c)
                                  .slice(2)
                            : '')
                    );
                };
                d.formatSize = function (a) {
                    return (a =
                        1073741824 <= a
                            ? d.formatNumber(a / 1073741824, 2, '.', '') + ' GiB'
                            : 1048576 <= a
                            ? d.formatNumber(a / 1048576, 2, '.', '') + ' MiB'
                            : 1024 <= a
                            ? d.formatNumber(a / 1024, 0) + ' KiB'
                            : d.formatNumber(a, 0) + ' bytes');
                };
                d.bytesFromIP = function (a) {
                    return -1 !== a.indexOf('.')
                        ? d.bytesFromIPv4(a)
                        : -1 !== a.indexOf(':')
                        ? d.bytesFromIPv6(a)
                        : null;
                };
                d.bytesFromIPv4 = function (a) {
                    a = a.split('.');
                    if (4 !== a.length) return null;
                    for (var c = d.createBuffer(), b = 0; b < a.length; ++b) {
                        var e = parseInt(a[b], 10);
                        if (isNaN(e)) return null;
                        c.putByte(e);
                    }
                    return c.getBytes();
                };
                d.bytesFromIPv6 = function (a) {
                    var c = 0;
                    a = a.split(':').filter(function (a) {
                        0 === a.length && ++c;
                        return !0;
                    });
                    for (var b = 2 * (8 - a.length + c), e = d.createBuffer(), f = 0; 8 > f; ++f)
                        if (a[f] && 0 !== a[f].length) {
                            var l = d.hexToBytes(a[f]);
                            2 > l.length && e.putByte(0);
                            e.putBytes(l);
                        } else e.fillWithByte(0, b), (b = 0);
                    return e.getBytes();
                };
                d.bytesToIP = function (a) {
                    return 4 === a.length ? d.bytesToIPv4(a) : 16 === a.length ? d.bytesToIPv6(a) : null;
                };
                d.bytesToIPv4 = function (a) {
                    if (4 !== a.length) return null;
                    for (var c = [], b = 0; b < a.length; ++b) c.push(a.charCodeAt(b));
                    return c.join('.');
                };
                d.bytesToIPv6 = function (a) {
                    if (16 !== a.length) return null;
                    for (var b = [], c = [], e = 0, f = 0; f < a.length; f += 2) {
                        for (var l = d.bytesToHex(a[f] + a[f + 1]); '0' === l[0] && '0' !== l; ) l = l.substr(1);
                        if ('0' === l) {
                            var r = c[c.length - 1],
                                n = b.length;
                            r && n === r.end + 1
                                ? ((r.end = n), r.end - r.start > c[e].end - c[e].start && (e = c.length - 1))
                                : c.push({ start: n, end: n });
                        }
                        b.push(l);
                    }
                    0 < c.length &&
                        ((a = c[e]),
                        0 < a.end - a.start &&
                            (b.splice(a.start, a.end - a.start + 1, ''),
                            0 === a.start && b.unshift(''),
                            7 === a.end && b.push('')));
                    return b.join(':');
                };
                d.estimateCores = function (a, b) {
                    function c(a, n, k) {
                        if (0 === n) {
                            var r = Math.floor(
                                a.reduce(function (a, b) {
                                    return a + b;
                                }, 0) / a.length,
                            );
                            d.cores = Math.max(1, r);
                            URL.revokeObjectURL(l);
                            return b(null, d.cores);
                        }
                        e(k, function (b, e) {
                            a.push(f(k, e));
                            c(a, n - 1, k);
                        });
                    }
                    function e(a, b) {
                        for (var c = [], n = [], e = 0; e < a; ++e) {
                            var r = new Worker(l);
                            r.addEventListener('message', function (e) {
                                n.push(e.data);
                                if (n.length === a) {
                                    for (e = 0; e < a; ++e) c[e].terminate();
                                    b(null, n);
                                }
                            });
                            c.push(r);
                        }
                        for (e = 0; e < a; ++e) c[e].postMessage(e);
                    }
                    function f(a, b) {
                        for (var c = [], n = 0; n < a; ++n)
                            for (var e = b[n], l = (c[n] = []), r = 0; r < a; ++r)
                                if (n !== r) {
                                    var f = b[r];
                                    ((e.st > f.st && e.st < f.et) || (f.st > e.st && f.st < e.et)) && l.push(r);
                                }
                        return c.reduce(function (a, b) {
                            return Math.max(a, b.length);
                        }, 0);
                    }
                    'function' === typeof a && ((b = a), (a = {}));
                    a = a || {};
                    if ('cores' in d && !a.update) return b(null, d.cores);
                    if (
                        'undefined' !== typeof navigator &&
                        'hardwareConcurrency' in navigator &&
                        0 < navigator.hardwareConcurrency
                    )
                        return (d.cores = navigator.hardwareConcurrency), b(null, d.cores);
                    if ('undefined' === typeof Worker) return (d.cores = 1), b(null, d.cores);
                    if ('undefined' === typeof Blob) return (d.cores = 2), b(null, d.cores);
                    var l = URL.createObjectURL(
                        new Blob(
                            [
                                '(',
                                function () {
                                    self.addEventListener('message', function (a) {
                                        a = Date.now();
                                        for (var b = a + 4; Date.now() < b; );
                                        self.postMessage({ st: a, et: b });
                                    });
                                }.toString(),
                                ')()',
                            ],
                            { type: 'application/javascript' },
                        ),
                    );
                    c([], 5, 16);
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.util) return d.util;
                        d.defined.util = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.util;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/util', ['require', 'module'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                a.cipher = a.cipher || {};
                a.cipher.algorithms = a.cipher.algorithms || {};
                a.cipher.createCipher = function (d, g) {
                    var h = d;
                    'string' === typeof h && (h = a.cipher.getAlgorithm(h)) && (h = h());
                    if (!h) throw Error('Unsupported algorithm: ' + d);
                    return new a.cipher.BlockCipher({ algorithm: h, key: g, decrypt: !1 });
                };
                a.cipher.createDecipher = function (d, g) {
                    var h = d;
                    'string' === typeof h && (h = a.cipher.getAlgorithm(h)) && (h = h());
                    if (!h) throw Error('Unsupported algorithm: ' + d);
                    return new a.cipher.BlockCipher({ algorithm: h, key: g, decrypt: !0 });
                };
                a.cipher.registerAlgorithm = function (d, g) {
                    d = d.toUpperCase();
                    a.cipher.algorithms[d] = g;
                };
                a.cipher.getAlgorithm = function (d) {
                    d = d.toUpperCase();
                    return d in a.cipher.algorithms ? a.cipher.algorithms[d] : null;
                };
                var g = (a.cipher.BlockCipher = function (a) {
                    this.algorithm = a.algorithm;
                    this.mode = this.algorithm.mode;
                    this.blockSize = this.mode.blockSize;
                    this._finish = !1;
                    this.output = this._input = null;
                    this._op = a.decrypt ? this.mode.decrypt : this.mode.encrypt;
                    this._decrypt = a.decrypt;
                    this.algorithm.initialize(a);
                });
                g.prototype.start = function (d) {
                    d = d || {};
                    var g = {},
                        h;
                    for (h in d) g[h] = d[h];
                    g.decrypt = this._decrypt;
                    this._finish = !1;
                    this._input = a.util.createBuffer();
                    this.output = d.output || a.util.createBuffer();
                    this.mode.start(g);
                };
                g.prototype.update = function (a) {
                    for (
                        a && this._input.putBuffer(a);
                        !this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish;

                    );
                    this._input.compact();
                };
                g.prototype.finish = function (a) {
                    !a ||
                        ('ECB' !== this.mode.name && 'CBC' !== this.mode.name) ||
                        ((this.mode.pad = function (d) {
                            return a(this.blockSize, d, !1);
                        }),
                        (this.mode.unpad = function (d) {
                            return a(this.blockSize, d, !0);
                        }));
                    var d = {};
                    d.decrypt = this._decrypt;
                    d.overflow = this._input.length() % this.blockSize;
                    if (!this._decrypt && this.mode.pad && !this.mode.pad(this._input, d)) return !1;
                    this._finish = !0;
                    this.update();
                    return (this._decrypt && this.mode.unpad && !this.mode.unpad(this.output, d)) ||
                        (this.mode.afterFinish && !this.mode.afterFinish(this.output, d))
                        ? !1
                        : !0;
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.cipher) return d.cipher;
                        d.defined.cipher = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.cipher;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/cipher', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(f) {
                    'string' === typeof f && (f = a.util.createBuffer(f));
                    if (a.util.isArray(f) && 4 < f.length) {
                        var b = f;
                        f = a.util.createBuffer();
                        for (var e = 0; e < b.length; ++e) f.putByte(b[e]);
                    }
                    a.util.isArray(f) || (f = [f.getInt32(), f.getInt32(), f.getInt32(), f.getInt32()]);
                    return f;
                }
                function d(a) {
                    a[a.length - 1] = (a[a.length - 1] + 1) & 4294967295;
                }
                function G(a) {
                    return [(a / 4294967296) | 0, a & 4294967295];
                }
                a.cipher = a.cipher || {};
                var h = (a.cipher.modes = a.cipher.modes || {});
                h.ecb = function (a) {
                    a = a || {};
                    this.name = 'ECB';
                    this.cipher = a.cipher;
                    this.blockSize = a.blockSize || 16;
                    this._ints = this.blockSize / 4;
                    this._inBlock = Array(this._ints);
                    this._outBlock = Array(this._ints);
                };
                h.ecb.prototype.start = function (a) {};
                h.ecb.prototype.encrypt = function (a, b, e) {
                    if (a.length() < this.blockSize && !(e && 0 < a.length())) return !0;
                    for (e = 0; e < this._ints; ++e) this._inBlock[e] = a.getInt32();
                    this.cipher.encrypt(this._inBlock, this._outBlock);
                    for (e = 0; e < this._ints; ++e) b.putInt32(this._outBlock[e]);
                };
                h.ecb.prototype.decrypt = function (a, b, e) {
                    if (a.length() < this.blockSize && !(e && 0 < a.length())) return !0;
                    for (e = 0; e < this._ints; ++e) this._inBlock[e] = a.getInt32();
                    this.cipher.decrypt(this._inBlock, this._outBlock);
                    for (e = 0; e < this._ints; ++e) b.putInt32(this._outBlock[e]);
                };
                h.ecb.prototype.pad = function (a, b) {
                    var e = a.length() === this.blockSize ? this.blockSize : this.blockSize - a.length();
                    a.fillWithByte(e, e);
                    return !0;
                };
                h.ecb.prototype.unpad = function (a, b) {
                    if (0 < b.overflow) return !1;
                    var e = a.length();
                    e = a.at(e - 1);
                    if (e > this.blockSize << 2) return !1;
                    a.truncate(e);
                    return !0;
                };
                h.cbc = function (a) {
                    a = a || {};
                    this.name = 'CBC';
                    this.cipher = a.cipher;
                    this.blockSize = a.blockSize || 16;
                    this._ints = this.blockSize / 4;
                    this._inBlock = Array(this._ints);
                    this._outBlock = Array(this._ints);
                };
                h.cbc.prototype.start = function (a) {
                    if (null === a.iv) {
                        if (!this._prev) throw Error('Invalid IV parameter.');
                        this._iv = this._prev.slice(0);
                    } else if ('iv' in a) (this._iv = g(a.iv)), (this._prev = this._iv.slice(0));
                    else throw Error('Invalid IV parameter.');
                };
                h.cbc.prototype.encrypt = function (a, b, e) {
                    if (a.length() < this.blockSize && !(e && 0 < a.length())) return !0;
                    for (e = 0; e < this._ints; ++e) this._inBlock[e] = this._prev[e] ^ a.getInt32();
                    this.cipher.encrypt(this._inBlock, this._outBlock);
                    for (e = 0; e < this._ints; ++e) b.putInt32(this._outBlock[e]);
                    this._prev = this._outBlock;
                };
                h.cbc.prototype.decrypt = function (a, b, e) {
                    if (a.length() < this.blockSize && !(e && 0 < a.length())) return !0;
                    for (e = 0; e < this._ints; ++e) this._inBlock[e] = a.getInt32();
                    this.cipher.decrypt(this._inBlock, this._outBlock);
                    for (e = 0; e < this._ints; ++e) b.putInt32(this._prev[e] ^ this._outBlock[e]);
                    this._prev = this._inBlock.slice(0);
                };
                h.cbc.prototype.pad = function (a, b) {
                    var e = a.length() === this.blockSize ? this.blockSize : this.blockSize - a.length();
                    a.fillWithByte(e, e);
                    return !0;
                };
                h.cbc.prototype.unpad = function (a, b) {
                    if (0 < b.overflow) return !1;
                    var e = a.length();
                    e = a.at(e - 1);
                    if (e > this.blockSize << 2) return !1;
                    a.truncate(e);
                    return !0;
                };
                h.cfb = function (f) {
                    f = f || {};
                    this.name = 'CFB';
                    this.cipher = f.cipher;
                    this.blockSize = f.blockSize || 16;
                    this._ints = this.blockSize / 4;
                    this._inBlock = null;
                    this._outBlock = Array(this._ints);
                    this._partialBlock = Array(this._ints);
                    this._partialOutput = a.util.createBuffer();
                    this._partialBytes = 0;
                };
                h.cfb.prototype.start = function (a) {
                    if (!('iv' in a)) throw Error('Invalid IV parameter.');
                    this._iv = g(a.iv);
                    this._inBlock = this._iv.slice(0);
                    this._partialBytes = 0;
                };
                h.cfb.prototype.encrypt = function (a, b, e) {
                    var f = a.length();
                    if (0 === f) return !0;
                    this.cipher.encrypt(this._inBlock, this._outBlock);
                    if (0 === this._partialBytes && f >= this.blockSize)
                        for (var k = 0; k < this._ints; ++k)
                            (this._inBlock[k] = a.getInt32() ^ this._outBlock[k]), b.putInt32(this._inBlock[k]);
                    else {
                        var d = (this.blockSize - f) % this.blockSize;
                        0 < d && (d = this.blockSize - d);
                        this._partialOutput.clear();
                        for (k = 0; k < this._ints; ++k)
                            (this._partialBlock[k] = a.getInt32() ^ this._outBlock[k]),
                                this._partialOutput.putInt32(this._partialBlock[k]);
                        if (0 < d) a.read -= this.blockSize;
                        else for (k = 0; k < this._ints; ++k) this._inBlock[k] = this._partialBlock[k];
                        0 < this._partialBytes && this._partialOutput.getBytes(this._partialBytes);
                        if (0 < d && !e)
                            return (
                                b.putBytes(this._partialOutput.getBytes(d - this._partialBytes)),
                                (this._partialBytes = d),
                                !0
                            );
                        b.putBytes(this._partialOutput.getBytes(f - this._partialBytes));
                        this._partialBytes = 0;
                    }
                };
                h.cfb.prototype.decrypt = function (a, b, e) {
                    var f = a.length();
                    if (0 === f) return !0;
                    this.cipher.encrypt(this._inBlock, this._outBlock);
                    if (0 === this._partialBytes && f >= this.blockSize)
                        for (var k = 0; k < this._ints; ++k)
                            (this._inBlock[k] = a.getInt32()), b.putInt32(this._inBlock[k] ^ this._outBlock[k]);
                    else {
                        var d = (this.blockSize - f) % this.blockSize;
                        0 < d && (d = this.blockSize - d);
                        this._partialOutput.clear();
                        for (k = 0; k < this._ints; ++k)
                            (this._partialBlock[k] = a.getInt32()),
                                this._partialOutput.putInt32(this._partialBlock[k] ^ this._outBlock[k]);
                        if (0 < d) a.read -= this.blockSize;
                        else for (k = 0; k < this._ints; ++k) this._inBlock[k] = this._partialBlock[k];
                        0 < this._partialBytes && this._partialOutput.getBytes(this._partialBytes);
                        if (0 < d && !e)
                            return (
                                b.putBytes(this._partialOutput.getBytes(d - this._partialBytes)),
                                (this._partialBytes = d),
                                !0
                            );
                        b.putBytes(this._partialOutput.getBytes(f - this._partialBytes));
                        this._partialBytes = 0;
                    }
                };
                h.ofb = function (f) {
                    f = f || {};
                    this.name = 'OFB';
                    this.cipher = f.cipher;
                    this.blockSize = f.blockSize || 16;
                    this._ints = this.blockSize / 4;
                    this._inBlock = null;
                    this._outBlock = Array(this._ints);
                    this._partialOutput = a.util.createBuffer();
                    this._partialBytes = 0;
                };
                h.ofb.prototype.start = function (a) {
                    if (!('iv' in a)) throw Error('Invalid IV parameter.');
                    this._iv = g(a.iv);
                    this._inBlock = this._iv.slice(0);
                    this._partialBytes = 0;
                };
                h.ofb.prototype.encrypt = function (a, b, e) {
                    var f = a.length();
                    if (0 === a.length()) return !0;
                    this.cipher.encrypt(this._inBlock, this._outBlock);
                    if (0 === this._partialBytes && f >= this.blockSize)
                        for (var k = 0; k < this._ints; ++k)
                            b.putInt32(a.getInt32() ^ this._outBlock[k]), (this._inBlock[k] = this._outBlock[k]);
                    else {
                        var d = (this.blockSize - f) % this.blockSize;
                        0 < d && (d = this.blockSize - d);
                        this._partialOutput.clear();
                        for (k = 0; k < this._ints; ++k) this._partialOutput.putInt32(a.getInt32() ^ this._outBlock[k]);
                        if (0 < d) a.read -= this.blockSize;
                        else for (k = 0; k < this._ints; ++k) this._inBlock[k] = this._outBlock[k];
                        0 < this._partialBytes && this._partialOutput.getBytes(this._partialBytes);
                        if (0 < d && !e)
                            return (
                                b.putBytes(this._partialOutput.getBytes(d - this._partialBytes)),
                                (this._partialBytes = d),
                                !0
                            );
                        b.putBytes(this._partialOutput.getBytes(f - this._partialBytes));
                        this._partialBytes = 0;
                    }
                };
                h.ofb.prototype.decrypt = h.ofb.prototype.encrypt;
                h.ctr = function (f) {
                    f = f || {};
                    this.name = 'CTR';
                    this.cipher = f.cipher;
                    this.blockSize = f.blockSize || 16;
                    this._ints = this.blockSize / 4;
                    this._inBlock = null;
                    this._outBlock = Array(this._ints);
                    this._partialOutput = a.util.createBuffer();
                    this._partialBytes = 0;
                };
                h.ctr.prototype.start = function (a) {
                    if (!('iv' in a)) throw Error('Invalid IV parameter.');
                    this._iv = g(a.iv);
                    this._inBlock = this._iv.slice(0);
                    this._partialBytes = 0;
                };
                h.ctr.prototype.encrypt = function (a, b, e) {
                    var f = a.length();
                    if (0 === f) return !0;
                    this.cipher.encrypt(this._inBlock, this._outBlock);
                    if (0 === this._partialBytes && f >= this.blockSize)
                        for (var k = 0; k < this._ints; ++k) b.putInt32(a.getInt32() ^ this._outBlock[k]);
                    else {
                        var h = (this.blockSize - f) % this.blockSize;
                        0 < h && (h = this.blockSize - h);
                        this._partialOutput.clear();
                        for (k = 0; k < this._ints; ++k) this._partialOutput.putInt32(a.getInt32() ^ this._outBlock[k]);
                        0 < h && (a.read -= this.blockSize);
                        0 < this._partialBytes && this._partialOutput.getBytes(this._partialBytes);
                        if (0 < h && !e)
                            return (
                                b.putBytes(this._partialOutput.getBytes(h - this._partialBytes)),
                                (this._partialBytes = h),
                                !0
                            );
                        b.putBytes(this._partialOutput.getBytes(f - this._partialBytes));
                        this._partialBytes = 0;
                    }
                    d(this._inBlock);
                };
                h.ctr.prototype.decrypt = h.ctr.prototype.encrypt;
                h.gcm = function (f) {
                    f = f || {};
                    this.name = 'GCM';
                    this.cipher = f.cipher;
                    this.blockSize = f.blockSize || 16;
                    this._ints = this.blockSize / 4;
                    this._inBlock = Array(this._ints);
                    this._outBlock = Array(this._ints);
                    this._partialOutput = a.util.createBuffer();
                    this._partialBytes = 0;
                    this._R = 3774873600;
                };
                h.gcm.prototype.start = function (f) {
                    if (!('iv' in f)) throw Error('Invalid IV parameter.');
                    var b = a.util.createBuffer(f.iv);
                    this._cipherLength = 0;
                    var e = 'additionalData' in f ? a.util.createBuffer(f.additionalData) : a.util.createBuffer();
                    this._tagLength = 'tagLength' in f ? f.tagLength : 128;
                    this._tag = null;
                    if (
                        f.decrypt &&
                        ((this._tag = a.util.createBuffer(f.tag).getBytes()), this._tag.length !== this._tagLength / 8)
                    )
                        throw Error('Authentication tag does not match tag length.');
                    this._hashBlock = Array(this._ints);
                    this.tag = null;
                    this._hashSubkey = Array(this._ints);
                    this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey);
                    this.componentBits = 4;
                    this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
                    f = b.length();
                    if (12 === f) this._j0 = [b.getInt32(), b.getInt32(), b.getInt32(), 1];
                    else {
                        for (this._j0 = [0, 0, 0, 0]; 0 < b.length(); )
                            this._j0 = this.ghash(this._hashSubkey, this._j0, [
                                b.getInt32(),
                                b.getInt32(),
                                b.getInt32(),
                                b.getInt32(),
                            ]);
                        this._j0 = this.ghash(this._hashSubkey, this._j0, [0, 0].concat(G(8 * f)));
                    }
                    this._inBlock = this._j0.slice(0);
                    d(this._inBlock);
                    this._partialBytes = 0;
                    e = a.util.createBuffer(e);
                    this._aDataLength = G(8 * e.length());
                    (b = e.length() % this.blockSize) && e.fillWithByte(0, this.blockSize - b);
                    for (this._s = [0, 0, 0, 0]; 0 < e.length(); )
                        this._s = this.ghash(this._hashSubkey, this._s, [
                            e.getInt32(),
                            e.getInt32(),
                            e.getInt32(),
                            e.getInt32(),
                        ]);
                };
                h.gcm.prototype.encrypt = function (a, b, e) {
                    var f = a.length();
                    if (0 === f) return !0;
                    this.cipher.encrypt(this._inBlock, this._outBlock);
                    if (0 === this._partialBytes && f >= this.blockSize) {
                        for (var k = 0; k < this._ints; ++k) b.putInt32((this._outBlock[k] ^= a.getInt32()));
                        this._cipherLength += this.blockSize;
                    } else {
                        var h = (this.blockSize - f) % this.blockSize;
                        0 < h && (h = this.blockSize - h);
                        this._partialOutput.clear();
                        for (k = 0; k < this._ints; ++k) this._partialOutput.putInt32(a.getInt32() ^ this._outBlock[k]);
                        if (0 === h || e) {
                            e
                                ? ((k = f % this.blockSize),
                                  (this._cipherLength += k),
                                  this._partialOutput.truncate(this.blockSize - k))
                                : (this._cipherLength += this.blockSize);
                            for (k = 0; k < this._ints; ++k) this._outBlock[k] = this._partialOutput.getInt32();
                            this._partialOutput.read -= this.blockSize;
                        }
                        0 < this._partialBytes && this._partialOutput.getBytes(this._partialBytes);
                        if (0 < h && !e)
                            return (
                                (a.read -= this.blockSize),
                                b.putBytes(this._partialOutput.getBytes(h - this._partialBytes)),
                                (this._partialBytes = h),
                                !0
                            );
                        b.putBytes(this._partialOutput.getBytes(f - this._partialBytes));
                        this._partialBytes = 0;
                    }
                    this._s = this.ghash(this._hashSubkey, this._s, this._outBlock);
                    d(this._inBlock);
                };
                h.gcm.prototype.decrypt = function (a, b, e) {
                    var f = a.length();
                    if (f < this.blockSize && !(e && 0 < f)) return !0;
                    this.cipher.encrypt(this._inBlock, this._outBlock);
                    d(this._inBlock);
                    this._hashBlock[0] = a.getInt32();
                    this._hashBlock[1] = a.getInt32();
                    this._hashBlock[2] = a.getInt32();
                    this._hashBlock[3] = a.getInt32();
                    this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
                    for (a = 0; a < this._ints; ++a) b.putInt32(this._outBlock[a] ^ this._hashBlock[a]);
                    this._cipherLength =
                        f < this.blockSize
                            ? this._cipherLength + (f % this.blockSize)
                            : this._cipherLength + this.blockSize;
                };
                h.gcm.prototype.afterFinish = function (f, b) {
                    var e = !0;
                    b.decrypt && b.overflow && f.truncate(this.blockSize - b.overflow);
                    this.tag = a.util.createBuffer();
                    var d = this._aDataLength.concat(G(8 * this._cipherLength));
                    this._s = this.ghash(this._hashSubkey, this._s, d);
                    d = [];
                    this.cipher.encrypt(this._j0, d);
                    for (var k = 0; k < this._ints; ++k) this.tag.putInt32(this._s[k] ^ d[k]);
                    this.tag.truncate(this.tag.length() % (this._tagLength / 8));
                    b.decrypt && this.tag.bytes() !== this._tag && (e = !1);
                    return e;
                };
                h.gcm.prototype.multiply = function (a, b) {
                    for (var e = [0, 0, 0, 0], f = b.slice(0), k = 0; 128 > k; ++k)
                        a[(k / 32) | 0] & (1 << (31 - (k % 32))) &&
                            ((e[0] ^= f[0]), (e[1] ^= f[1]), (e[2] ^= f[2]), (e[3] ^= f[3])),
                            this.pow(f, f);
                    return e;
                };
                h.gcm.prototype.pow = function (a, b) {
                    for (var e = a[3] & 1, f = 3; 0 < f; --f) b[f] = (a[f] >>> 1) | ((a[f - 1] & 1) << 31);
                    b[0] = a[0] >>> 1;
                    e && (b[0] ^= this._R);
                };
                h.gcm.prototype.tableMultiply = function (a) {
                    for (var b = [0, 0, 0, 0], e = 0; 32 > e; ++e) {
                        var f = this._m[e][(a[(e / 8) | 0] >>> (4 * (7 - (e % 8)))) & 15];
                        b[0] ^= f[0];
                        b[1] ^= f[1];
                        b[2] ^= f[2];
                        b[3] ^= f[3];
                    }
                    return b;
                };
                h.gcm.prototype.ghash = function (a, b, e) {
                    b[0] ^= e[0];
                    b[1] ^= e[1];
                    b[2] ^= e[2];
                    b[3] ^= e[3];
                    return this.tableMultiply(b);
                };
                h.gcm.prototype.generateHashTable = function (a, b) {
                    var e = 8 / b,
                        f = 4 * e;
                    e *= 16;
                    for (var k = Array(e), d = 0; d < e; ++d) {
                        var h = [0, 0, 0, 0];
                        h[(d / f) | 0] = (1 << (b - 1)) << ((f - 1 - (d % f)) * b);
                        k[d] = this.generateSubHashTable(this.multiply(h, a), b);
                    }
                    return k;
                };
                h.gcm.prototype.generateSubHashTable = function (a, b) {
                    var e = 1 << b,
                        f = e >>> 1,
                        k = Array(e);
                    k[f] = a.slice(0);
                    for (var d = f >>> 1; 0 < d; ) this.pow(k[2 * d], (k[d] = [])), (d >>= 1);
                    for (d = 2; d < f; ) {
                        for (var h = 1; h < d; ++h) {
                            var c = k[d],
                                q = k[h];
                            k[d + h] = [c[0] ^ q[0], c[1] ^ q[1], c[2] ^ q[2], c[3] ^ q[3]];
                        }
                        d *= 2;
                    }
                    k[0] = [0, 0, 0, 0];
                    for (d = f + 1; d < e; ++d)
                        (h = k[d ^ f]), (k[d] = [a[0] ^ h[0], a[1] ^ h[1], a[2] ^ h[2], a[3] ^ h[3]]);
                    return k;
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.cipherModes) return d.cipherModes;
                        d.defined.cipherModes = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.cipherModes;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/cipherModes', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(b, c) {
                    a.cipher.registerAlgorithm(b, function () {
                        return new a.aes.Algorithm(b, c);
                    });
                }
                function d() {
                    b = !0;
                    u = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
                    for (var a = Array(256), e = 0; 128 > e; ++e)
                        (a[e] = e << 1), (a[e + 128] = ((e + 128) << 1) ^ 283);
                    w = Array(256);
                    k = Array(256);
                    v = Array(4);
                    c = Array(4);
                    for (e = 0; 4 > e; ++e) (v[e] = Array(256)), (c[e] = Array(256));
                    var f = 0,
                        d = 0;
                    for (e = 0; 256 > e; ++e) {
                        var l = d ^ (d << 1) ^ (d << 2) ^ (d << 3) ^ (d << 4);
                        l = (l >> 8) ^ (l & 255) ^ 99;
                        w[f] = l;
                        k[l] = f;
                        var r = a[l];
                        var n = a[f];
                        var F = a[n];
                        var m = a[F];
                        r ^= (r << 24) ^ (l << 16) ^ (l << 8) ^ l;
                        F = ((n ^ F ^ m) << 24) ^ ((f ^ m) << 16) ^ ((f ^ F ^ m) << 8) ^ f ^ n ^ m;
                        for (var h = 0; 4 > h; ++h)
                            (v[h][f] = r), (c[h][l] = F), (r = (r << 24) | (r >>> 8)), (F = (F << 24) | (F >>> 8));
                        0 === f ? (f = d = 1) : ((f = n ^ a[a[a[n ^ m]]]), (d ^= a[a[d]]));
                    }
                }
                function G(a, b) {
                    for (var f = a.slice(0), k, l = 1, r = f.length, n = e * (r + 6 + 1), d = r; d < n; ++d)
                        (k = f[d - 1]),
                            0 === d % r
                                ? ((k =
                                      (w[(k >>> 16) & 255] << 24) ^
                                      (w[(k >>> 8) & 255] << 16) ^
                                      (w[k & 255] << 8) ^
                                      w[k >>> 24] ^
                                      (u[l] << 24)),
                                  l++)
                                : 6 < r &&
                                  4 === d % r &&
                                  (k =
                                      (w[k >>> 24] << 24) ^
                                      (w[(k >>> 16) & 255] << 16) ^
                                      (w[(k >>> 8) & 255] << 8) ^
                                      w[k & 255]),
                            (f[d] = f[d - r] ^ k);
                    if (b) {
                        l = c[0];
                        r = c[1];
                        var m = c[2],
                            q = c[3],
                            x = f.slice(0);
                        n = f.length;
                        d = 0;
                        for (var I = n - e; d < n; d += e, I -= e)
                            if (0 === d || d === n - e)
                                (x[d] = f[I]), (x[d + 1] = f[I + 3]), (x[d + 2] = f[I + 2]), (x[d + 3] = f[I + 1]);
                            else
                                for (var h = 0; h < e; ++h)
                                    (k = f[I + h]),
                                        (x[d + (3 & -h)] =
                                            l[w[k >>> 24]] ^
                                            r[w[(k >>> 16) & 255]] ^
                                            m[w[(k >>> 8) & 255]] ^
                                            q[w[k & 255]]);
                        f = x;
                    }
                    return f;
                }
                function h(a, b, e, f) {
                    var l = a.length / 4 - 1;
                    if (f) {
                        var r = c[0];
                        var n = c[1];
                        var d = c[2];
                        var m = c[3];
                        var q = k;
                    } else (r = v[0]), (n = v[1]), (d = v[2]), (m = v[3]), (q = w);
                    var A = b[0] ^ a[0];
                    var I = b[f ? 3 : 1] ^ a[1];
                    var x = b[2] ^ a[2];
                    b = b[f ? 1 : 3] ^ a[3];
                    for (var h = 3, g = 1; g < l; ++g) {
                        var D = r[A >>> 24] ^ n[(I >>> 16) & 255] ^ d[(x >>> 8) & 255] ^ m[b & 255] ^ a[++h];
                        var u = r[I >>> 24] ^ n[(x >>> 16) & 255] ^ d[(b >>> 8) & 255] ^ m[A & 255] ^ a[++h];
                        var G = r[x >>> 24] ^ n[(b >>> 16) & 255] ^ d[(A >>> 8) & 255] ^ m[I & 255] ^ a[++h];
                        b = r[b >>> 24] ^ n[(A >>> 16) & 255] ^ d[(I >>> 8) & 255] ^ m[x & 255] ^ a[++h];
                        A = D;
                        I = u;
                        x = G;
                    }
                    e[0] =
                        (q[A >>> 24] << 24) ^
                        (q[(I >>> 16) & 255] << 16) ^
                        (q[(x >>> 8) & 255] << 8) ^
                        q[b & 255] ^
                        a[++h];
                    e[f ? 3 : 1] =
                        (q[I >>> 24] << 24) ^
                        (q[(x >>> 16) & 255] << 16) ^
                        (q[(b >>> 8) & 255] << 8) ^
                        q[A & 255] ^
                        a[++h];
                    e[2] =
                        (q[x >>> 24] << 24) ^
                        (q[(b >>> 16) & 255] << 16) ^
                        (q[(A >>> 8) & 255] << 8) ^
                        q[I & 255] ^
                        a[++h];
                    e[f ? 1 : 3] =
                        (q[b >>> 24] << 24) ^
                        (q[(A >>> 16) & 255] << 16) ^
                        (q[(I >>> 8) & 255] << 8) ^
                        q[x & 255] ^
                        a[++h];
                }
                function f(b) {
                    b = b || {};
                    var c = 'AES-' + (b.mode || 'CBC').toUpperCase();
                    var e = b.decrypt ? a.cipher.createDecipher(c, b.key) : a.cipher.createCipher(c, b.key);
                    var f = e.start;
                    e.start = function (b, c) {
                        var n = null;
                        c instanceof a.util.ByteBuffer && ((n = c), (c = {}));
                        c = c || {};
                        c.output = n;
                        c.iv = b;
                        f.call(e, c);
                    };
                    return e;
                }
                a.aes = a.aes || {};
                a.aes.startEncrypting = function (a, b, c, e) {
                    a = f({ key: a, output: c, decrypt: !1, mode: e });
                    a.start(b);
                    return a;
                };
                a.aes.createEncryptionCipher = function (a, b) {
                    return f({ key: a, output: null, decrypt: !1, mode: b });
                };
                a.aes.startDecrypting = function (a, b, c, e) {
                    a = f({ key: a, output: c, decrypt: !0, mode: e });
                    a.start(b);
                    return a;
                };
                a.aes.createDecryptionCipher = function (a, b) {
                    return f({ key: a, output: null, decrypt: !0, mode: b });
                };
                a.aes.Algorithm = function (a, c) {
                    b || d();
                    var e = this;
                    e.name = a;
                    e.mode = new c({
                        blockSize: 16,
                        cipher: {
                            encrypt: function (a, b) {
                                return h(e._w, a, b, !1);
                            },
                            decrypt: function (a, b) {
                                return h(e._w, a, b, !0);
                            },
                        },
                    });
                    e._init = !1;
                };
                a.aes.Algorithm.prototype.initialize = function (b) {
                    if (!this._init) {
                        var c = b.key;
                        if ('string' === typeof c && (16 === c.length || 24 === c.length || 32 === c.length))
                            c = a.util.createBuffer(c);
                        else if (a.util.isArray(c) && (16 === c.length || 24 === c.length || 32 === c.length)) {
                            var e = c;
                            c = a.util.createBuffer();
                            for (var f = 0; f < e.length; ++f) c.putByte(e[f]);
                        }
                        if (!a.util.isArray(c)) {
                            e = c;
                            c = [];
                            var l = e.length();
                            if (16 === l || 24 === l || 32 === l)
                                for (l >>>= 2, f = 0; f < l; ++f) c.push(e.getInt32());
                        }
                        if (!a.util.isArray(c) || (4 !== c.length && 6 !== c.length && 8 !== c.length))
                            throw Error('Invalid key parameter.');
                        e = -1 !== ['CFB', 'OFB', 'CTR', 'GCM'].indexOf(this.mode.name);
                        this._w = G(c, b.decrypt && !e);
                        this._init = !0;
                    }
                };
                a.aes._expandKey = function (a, c) {
                    b || d();
                    return G(a, c);
                };
                a.aes._updateBlock = h;
                g('AES-ECB', a.cipher.modes.ecb);
                g('AES-CBC', a.cipher.modes.cbc);
                g('AES-CFB', a.cipher.modes.cfb);
                g('AES-OFB', a.cipher.modes.ofb);
                g('AES-CTR', a.cipher.modes.ctr);
                g('AES-GCM', a.cipher.modes.gcm);
                var b = !1,
                    e = 4,
                    w,
                    k,
                    u,
                    v,
                    c;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.aes) return d.aes;
                        d.defined.aes = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.aes;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/aes', ['require', 'module', './cipher', './cipherModes', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                a.pki = a.pki || {};
                a = a.pki.oids = a.oids = a.oids || {};
                a['1.2.840.113549.1.1.1'] = 'rsaEncryption';
                a.rsaEncryption = '1.2.840.113549.1.1.1';
                a['1.2.840.113549.1.1.4'] = 'md5WithRSAEncryption';
                a.md5WithRSAEncryption = '1.2.840.113549.1.1.4';
                a['1.2.840.113549.1.1.5'] = 'sha1WithRSAEncryption';
                a.sha1WithRSAEncryption = '1.2.840.113549.1.1.5';
                a['1.2.840.113549.1.1.7'] = 'RSAES-OAEP';
                a['RSAES-OAEP'] = '1.2.840.113549.1.1.7';
                a['1.2.840.113549.1.1.8'] = 'mgf1';
                a.mgf1 = '1.2.840.113549.1.1.8';
                a['1.2.840.113549.1.1.9'] = 'pSpecified';
                a.pSpecified = '1.2.840.113549.1.1.9';
                a['1.2.840.113549.1.1.10'] = 'RSASSA-PSS';
                a['RSASSA-PSS'] = '1.2.840.113549.1.1.10';
                a['1.2.840.113549.1.1.11'] = 'sha256WithRSAEncryption';
                a.sha256WithRSAEncryption = '1.2.840.113549.1.1.11';
                a['1.2.840.113549.1.1.12'] = 'sha384WithRSAEncryption';
                a.sha384WithRSAEncryption = '1.2.840.113549.1.1.12';
                a['1.2.840.113549.1.1.13'] = 'sha512WithRSAEncryption';
                a.sha512WithRSAEncryption = '1.2.840.113549.1.1.13';
                a['1.3.14.3.2.7'] = 'desCBC';
                a.desCBC = '1.3.14.3.2.7';
                a['1.3.14.3.2.26'] = 'sha1';
                a.sha1 = '1.3.14.3.2.26';
                a['2.16.840.1.101.3.4.2.1'] = 'sha256';
                a.sha256 = '2.16.840.1.101.3.4.2.1';
                a['2.16.840.1.101.3.4.2.2'] = 'sha384';
                a.sha384 = '2.16.840.1.101.3.4.2.2';
                a['2.16.840.1.101.3.4.2.3'] = 'sha512';
                a.sha512 = '2.16.840.1.101.3.4.2.3';
                a['1.2.840.113549.2.5'] = 'md5';
                a.md5 = '1.2.840.113549.2.5';
                a['1.2.840.113549.1.7.1'] = 'data';
                a.data = '1.2.840.113549.1.7.1';
                a['1.2.840.113549.1.7.2'] = 'signedData';
                a.signedData = '1.2.840.113549.1.7.2';
                a['1.2.840.113549.1.7.3'] = 'envelopedData';
                a.envelopedData = '1.2.840.113549.1.7.3';
                a['1.2.840.113549.1.7.4'] = 'signedAndEnvelopedData';
                a.signedAndEnvelopedData = '1.2.840.113549.1.7.4';
                a['1.2.840.113549.1.7.5'] = 'digestedData';
                a.digestedData = '1.2.840.113549.1.7.5';
                a['1.2.840.113549.1.7.6'] = 'encryptedData';
                a.encryptedData = '1.2.840.113549.1.7.6';
                a['1.2.840.113549.1.9.1'] = 'emailAddress';
                a.emailAddress = '1.2.840.113549.1.9.1';
                a['1.2.840.113549.1.9.2'] = 'unstructuredName';
                a.unstructuredName = '1.2.840.113549.1.9.2';
                a['1.2.840.113549.1.9.3'] = 'contentType';
                a.contentType = '1.2.840.113549.1.9.3';
                a['1.2.840.113549.1.9.4'] = 'messageDigest';
                a.messageDigest = '1.2.840.113549.1.9.4';
                a['1.2.840.113549.1.9.5'] = 'signingTime';
                a.signingTime = '1.2.840.113549.1.9.5';
                a['1.2.840.113549.1.9.6'] = 'counterSignature';
                a.counterSignature = '1.2.840.113549.1.9.6';
                a['1.2.840.113549.1.9.7'] = 'challengePdw';
                a.challengePdw = '1.2.840.113549.1.9.7';
                a['1.2.840.113549.1.9.8'] = 'unstructuredAddress';
                a.unstructuredAddress = '1.2.840.113549.1.9.8';
                a['1.2.840.113549.1.9.14'] = 'extensionRequest';
                a.extensionRequest = '1.2.840.113549.1.9.14';
                a['1.2.840.113549.1.9.20'] = 'friendlyName';
                a.friendlyName = '1.2.840.113549.1.9.20';
                a['1.2.840.113549.1.9.21'] = 'localKeyId';
                a.localKeyId = '1.2.840.113549.1.9.21';
                a['1.2.840.113549.1.9.22.1'] = 'x509Certificate';
                a.x509Certificate = '1.2.840.113549.1.9.22.1';
                a['1.2.840.113549.1.12.10.1.1'] = 'keyBag';
                a.keyBag = '1.2.840.113549.1.12.10.1.1';
                a['1.2.840.113549.1.12.10.1.2'] = 'pkcs8ShroudedKeyBag';
                a.pkcs8ShroudedKeyBag = '1.2.840.113549.1.12.10.1.2';
                a['1.2.840.113549.1.12.10.1.3'] = 'certBag';
                a.certBag = '1.2.840.113549.1.12.10.1.3';
                a['1.2.840.113549.1.12.10.1.4'] = 'crlBag';
                a.crlBag = '1.2.840.113549.1.12.10.1.4';
                a['1.2.840.113549.1.12.10.1.5'] = 'secretBag';
                a.secretBag = '1.2.840.113549.1.12.10.1.5';
                a['1.2.840.113549.1.12.10.1.6'] = 'safeContentsBag';
                a.safeContentsBag = '1.2.840.113549.1.12.10.1.6';
                a['1.2.840.113549.1.5.13'] = 'pkcs5PBES2';
                a.pkcs5PBES2 = '1.2.840.113549.1.5.13';
                a['1.2.840.113549.1.5.12'] = 'pkcs5PBKDF2';
                a.pkcs5PBKDF2 = '1.2.840.113549.1.5.12';
                a['1.2.840.113549.1.12.1.1'] = 'pbeWithSHAAnd128BitRC4';
                a.pbeWithSHAAnd128BitRC4 = '1.2.840.113549.1.12.1.1';
                a['1.2.840.113549.1.12.1.2'] = 'pbeWithSHAAnd40BitRC4';
                a.pbeWithSHAAnd40BitRC4 = '1.2.840.113549.1.12.1.2';
                a['1.2.840.113549.1.12.1.3'] = 'pbeWithSHAAnd3-KeyTripleDES-CBC';
                a['pbeWithSHAAnd3-KeyTripleDES-CBC'] = '1.2.840.113549.1.12.1.3';
                a['1.2.840.113549.1.12.1.4'] = 'pbeWithSHAAnd2-KeyTripleDES-CBC';
                a['pbeWithSHAAnd2-KeyTripleDES-CBC'] = '1.2.840.113549.1.12.1.4';
                a['1.2.840.113549.1.12.1.5'] = 'pbeWithSHAAnd128BitRC2-CBC';
                a['pbeWithSHAAnd128BitRC2-CBC'] = '1.2.840.113549.1.12.1.5';
                a['1.2.840.113549.1.12.1.6'] = 'pbewithSHAAnd40BitRC2-CBC';
                a['pbewithSHAAnd40BitRC2-CBC'] = '1.2.840.113549.1.12.1.6';
                a['1.2.840.113549.2.7'] = 'hmacWithSHA1';
                a.hmacWithSHA1 = '1.2.840.113549.2.7';
                a['1.2.840.113549.2.8'] = 'hmacWithSHA224';
                a.hmacWithSHA224 = '1.2.840.113549.2.8';
                a['1.2.840.113549.2.9'] = 'hmacWithSHA256';
                a.hmacWithSHA256 = '1.2.840.113549.2.9';
                a['1.2.840.113549.2.10'] = 'hmacWithSHA384';
                a.hmacWithSHA384 = '1.2.840.113549.2.10';
                a['1.2.840.113549.2.11'] = 'hmacWithSHA512';
                a.hmacWithSHA512 = '1.2.840.113549.2.11';
                a['1.2.840.113549.3.7'] = 'des-EDE3-CBC';
                a['des-EDE3-CBC'] = '1.2.840.113549.3.7';
                a['2.16.840.1.101.3.4.1.2'] = 'aes128-CBC';
                a['aes128-CBC'] = '2.16.840.1.101.3.4.1.2';
                a['2.16.840.1.101.3.4.1.22'] = 'aes192-CBC';
                a['aes192-CBC'] = '2.16.840.1.101.3.4.1.22';
                a['2.16.840.1.101.3.4.1.42'] = 'aes256-CBC';
                a['aes256-CBC'] = '2.16.840.1.101.3.4.1.42';
                a['2.5.4.3'] = 'commonName';
                a.commonName = '2.5.4.3';
                a['2.5.4.5'] = 'serialName';
                a.serialName = '2.5.4.5';
                a['2.5.4.6'] = 'countryName';
                a.countryName = '2.5.4.6';
                a['2.5.4.7'] = 'localityName';
                a.localityName = '2.5.4.7';
                a['2.5.4.8'] = 'stateOrProvinceName';
                a.stateOrProvinceName = '2.5.4.8';
                a['2.5.4.10'] = 'organizationName';
                a.organizationName = '2.5.4.10';
                a['2.5.4.11'] = 'organizationalUnitName';
                a.organizationalUnitName = '2.5.4.11';
                a['2.16.840.1.113730.1.1'] = 'nsCertType';
                a.nsCertType = '2.16.840.1.113730.1.1';
                a['2.5.29.1'] = 'authorityKeyIdentifier';
                a['2.5.29.2'] = 'keyAttributes';
                a['2.5.29.3'] = 'certificatePolicies';
                a['2.5.29.4'] = 'keyUsageRestriction';
                a['2.5.29.5'] = 'policyMapping';
                a['2.5.29.6'] = 'subtreesConstraint';
                a['2.5.29.7'] = 'subjectAltName';
                a['2.5.29.8'] = 'issuerAltName';
                a['2.5.29.9'] = 'subjectDirectoryAttributes';
                a['2.5.29.10'] = 'basicConstraints';
                a['2.5.29.11'] = 'nameConstraints';
                a['2.5.29.12'] = 'policyConstraints';
                a['2.5.29.13'] = 'basicConstraints';
                a['2.5.29.14'] = 'subjectKeyIdentifier';
                a.subjectKeyIdentifier = '2.5.29.14';
                a['2.5.29.15'] = 'keyUsage';
                a.keyUsage = '2.5.29.15';
                a['2.5.29.16'] = 'privateKeyUsagePeriod';
                a['2.5.29.17'] = 'subjectAltName';
                a.subjectAltName = '2.5.29.17';
                a['2.5.29.18'] = 'issuerAltName';
                a.issuerAltName = '2.5.29.18';
                a['2.5.29.19'] = 'basicConstraints';
                a.basicConstraints = '2.5.29.19';
                a['2.5.29.20'] = 'cRLNumber';
                a['2.5.29.21'] = 'cRLReason';
                a['2.5.29.22'] = 'expirationDate';
                a['2.5.29.23'] = 'instructionCode';
                a['2.5.29.24'] = 'invalidityDate';
                a['2.5.29.25'] = 'cRLDistributionPoints';
                a['2.5.29.26'] = 'issuingDistributionPoint';
                a['2.5.29.27'] = 'deltaCRLIndicator';
                a['2.5.29.28'] = 'issuingDistributionPoint';
                a['2.5.29.29'] = 'certificateIssuer';
                a['2.5.29.30'] = 'nameConstraints';
                a['2.5.29.31'] = 'cRLDistributionPoints';
                a.cRLDistributionPoints = '2.5.29.31';
                a['2.5.29.32'] = 'certificatePolicies';
                a.certificatePolicies = '2.5.29.32';
                a['2.5.29.33'] = 'policyMappings';
                a['2.5.29.34'] = 'policyConstraints';
                a['2.5.29.35'] = 'authorityKeyIdentifier';
                a.authorityKeyIdentifier = '2.5.29.35';
                a['2.5.29.36'] = 'policyConstraints';
                a['2.5.29.37'] = 'extKeyUsage';
                a.extKeyUsage = '2.5.29.37';
                a['2.5.29.46'] = 'freshestCRL';
                a['2.5.29.54'] = 'inhibitAnyPolicy';
                a['1.3.6.1.4.1.11129.2.4.2'] = 'timestampList';
                a.timestampList = '1.3.6.1.4.1.11129.2.4.2';
                a['1.3.6.1.5.5.7.1.1'] = 'authorityInfoAccess';
                a.authorityInfoAccess = '1.3.6.1.5.5.7.1.1';
                a['1.3.6.1.5.5.7.3.1'] = 'serverAuth';
                a.serverAuth = '1.3.6.1.5.5.7.3.1';
                a['1.3.6.1.5.5.7.3.2'] = 'clientAuth';
                a.clientAuth = '1.3.6.1.5.5.7.3.2';
                a['1.3.6.1.5.5.7.3.3'] = 'codeSigning';
                a.codeSigning = '1.3.6.1.5.5.7.3.3';
                a['1.3.6.1.5.5.7.3.4'] = 'emailProtection';
                a.emailProtection = '1.3.6.1.5.5.7.3.4';
                a['1.3.6.1.5.5.7.3.8'] = 'timeStamping';
                a.timeStamping = '1.3.6.1.5.5.7.3.8';
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.oids) return d.oids;
                        d.defined.oids = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.oids;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/oids', ['require', 'module'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                var g = (a.asn1 = a.asn1 || {});
                g.Class = { UNIVERSAL: 0, APPLICATION: 64, CONTEXT_SPECIFIC: 128, PRIVATE: 192 };
                g.Type = {
                    NONE: 0,
                    BOOLEAN: 1,
                    INTEGER: 2,
                    BITSTRING: 3,
                    OCTETSTRING: 4,
                    NULL: 5,
                    OID: 6,
                    ODESC: 7,
                    EXTERNAL: 8,
                    REAL: 9,
                    ENUMERATED: 10,
                    EMBEDDED: 11,
                    UTF8: 12,
                    ROID: 13,
                    SEQUENCE: 16,
                    SET: 17,
                    PRINTABLESTRING: 19,
                    IA5STRING: 22,
                    UTCTIME: 23,
                    GENERALIZEDTIME: 24,
                    BMPSTRING: 30,
                };
                g.create = function (d, f, b, e) {
                    if (a.util.isArray(e)) {
                        for (var h = [], k = 0; k < e.length; ++k) void 0 !== e[k] && h.push(e[k]);
                        e = h;
                    }
                    return { tagClass: d, type: f, constructed: b, composed: b || a.util.isArray(e), value: e };
                };
                var d = (g.getBerValueLength = function (a) {
                    var f = a.getByte();
                    if (128 !== f) return f & 128 ? a.getInt((f & 127) << 3) : f;
                });
                g.fromDer = function (h, f) {
                    void 0 === f && (f = !0);
                    'string' === typeof h && (h = a.util.createBuffer(h));
                    if (2 > h.length()) {
                        var b = Error('Too few bytes to parse DER.');
                        b.bytes = h.length();
                        throw b;
                    }
                    var e = h.getByte();
                    b = e & 192;
                    var w = e & 31,
                        k = d(h);
                    if (h.length() < k) {
                        if (f)
                            throw (
                                ((b = Error('Too few bytes to read ASN.1 value.')),
                                (b.detail = h.length() + ' < ' + k),
                                b)
                            );
                        k = h.length();
                    }
                    var u = 32 === (e & 32);
                    var v = u;
                    if (!v && b === g.Class.UNIVERSAL && w === g.Type.BITSTRING && 1 < k) {
                        var c = h.read;
                        if (
                            0 === h.getByte() &&
                            ((e = h.getByte()), (e &= 192), e === g.Class.UNIVERSAL || e === g.Class.CONTEXT_SPECIFIC)
                        )
                            try {
                                if ((v = d(h) === k - (h.read - c))) ++c, --k;
                            } catch (q) {}
                        h.read = c;
                    }
                    if (v)
                        if (((v = []), void 0 === k))
                            for (;;) {
                                if (h.bytes(2) === String.fromCharCode(0, 0)) {
                                    h.getBytes(2);
                                    break;
                                }
                                v.push(g.fromDer(h, f));
                            }
                        else
                            for (c = h.length(); 0 < k; )
                                v.push(g.fromDer(h, f)), (k -= c - h.length()), (c = h.length());
                    else {
                        if (void 0 === k) {
                            if (f) throw Error('Non-constructed ASN.1 object of indefinite length.');
                            k = h.length();
                        }
                        if (w === g.Type.BMPSTRING)
                            for (v = '', c = 0; c < k; c += 2) v += String.fromCharCode(h.getInt16());
                        else v = h.getBytes(k);
                    }
                    return g.create(b, w, u, v);
                };
                g.toDer = function (d) {
                    var f = a.util.createBuffer(),
                        b = d.tagClass | d.type,
                        e = a.util.createBuffer();
                    if (d.composed) {
                        d.constructed ? (b |= 32) : e.putByte(0);
                        for (var h = 0; h < d.value.length; ++h)
                            void 0 !== d.value[h] && e.putBuffer(g.toDer(d.value[h]));
                    } else if (d.type === g.Type.BMPSTRING)
                        for (h = 0; h < d.value.length; ++h) e.putInt16(d.value.charCodeAt(h));
                    else
                        d.type === g.Type.INTEGER &&
                        1 < d.value.length &&
                        ((0 === d.value.charCodeAt(0) && 0 === (d.value.charCodeAt(1) & 128)) ||
                            (255 === d.value.charCodeAt(0) && 128 === (d.value.charCodeAt(1) & 128)))
                            ? e.putBytes(d.value.substr(1))
                            : e.putBytes(d.value);
                    f.putByte(b);
                    if (127 >= e.length()) f.putByte(e.length() & 127);
                    else {
                        h = e.length();
                        d = '';
                        do (d += String.fromCharCode(h & 255)), (h >>>= 8);
                        while (0 < h);
                        f.putByte(d.length | 128);
                        for (h = d.length - 1; 0 <= h; --h) f.putByte(d.charCodeAt(h));
                    }
                    f.putBuffer(e);
                    return f;
                };
                g.oidToDer = function (d) {
                    d = d.split('.');
                    var f = a.util.createBuffer();
                    f.putByte(40 * parseInt(d[0], 10) + parseInt(d[1], 10));
                    for (var b, e, h, k, g = 2; g < d.length; ++g) {
                        b = !0;
                        e = [];
                        h = parseInt(d[g], 10);
                        do (k = h & 127), (h >>>= 7), b || (k |= 128), e.push(k), (b = !1);
                        while (0 < h);
                        for (b = e.length - 1; 0 <= b; --b) f.putByte(e[b]);
                    }
                    return f;
                };
                g.derToOid = function (d) {
                    'string' === typeof d && (d = a.util.createBuffer(d));
                    var f = d.getByte();
                    var b = Math.floor(f / 40) + '.' + (f % 40);
                    for (var e = 0; 0 < d.length(); )
                        (f = d.getByte()), (e <<= 7), f & 128 ? (e += f & 127) : ((b += '.' + (e + f)), (e = 0));
                    return b;
                };
                g.utcTimeToDate = function (a) {
                    var f = new Date(),
                        b = parseInt(a.substr(0, 2), 10);
                    b = 50 <= b ? 1900 + b : 2e3 + b;
                    var e = parseInt(a.substr(2, 2), 10) - 1,
                        d = parseInt(a.substr(4, 2), 10),
                        k = parseInt(a.substr(6, 2), 10),
                        h = parseInt(a.substr(8, 2), 10),
                        v = 0;
                    if (11 < a.length) {
                        var c = a.charAt(10),
                            q = 10;
                        '+' !== c && '-' !== c && ((v = parseInt(a.substr(10, 2), 10)), (q += 2));
                    }
                    f.setUTCFullYear(b, e, d);
                    f.setUTCHours(k, h, v, 0);
                    q &&
                        ((c = a.charAt(q)), '+' === c || '-' === c) &&
                        ((b = parseInt(a.substr(q + 1, 2), 10)),
                        (a = parseInt(a.substr(q + 4, 2), 10)),
                        (a = 6e4 * (60 * b + a)),
                        '+' === c ? f.setTime(+f - a) : f.setTime(+f + a));
                    return f;
                };
                g.generalizedTimeToDate = function (a) {
                    var f = new Date(),
                        b = parseInt(a.substr(0, 4), 10),
                        e = parseInt(a.substr(4, 2), 10) - 1,
                        d = parseInt(a.substr(6, 2), 10),
                        k = parseInt(a.substr(8, 2), 10),
                        h = parseInt(a.substr(10, 2), 10),
                        v = parseInt(a.substr(12, 2), 10),
                        c = 0,
                        q = 0,
                        x = !1;
                    'Z' === a.charAt(a.length - 1) && (x = !0);
                    var g = a.length - 5,
                        A = a.charAt(g);
                    if ('+' === A || '-' === A)
                        (q = parseInt(a.substr(g + 1, 2), 10)),
                            (g = parseInt(a.substr(g + 4, 2), 10)),
                            (q = 6e4 * (60 * q + g)),
                            '+' === A && (q *= -1),
                            (x = !0);
                    '.' === a.charAt(14) && (c = 1e3 * parseFloat(a.substr(14), 10));
                    x
                        ? (f.setUTCFullYear(b, e, d), f.setUTCHours(k, h, v, c), f.setTime(+f + q))
                        : (f.setFullYear(b, e, d), f.setHours(k, h, v, c));
                    return f;
                };
                g.dateToUtcTime = function (a) {
                    if ('string' === typeof a) return a;
                    var f = '',
                        b = [];
                    b.push(('' + a.getUTCFullYear()).substr(2));
                    b.push('' + (a.getUTCMonth() + 1));
                    b.push('' + a.getUTCDate());
                    b.push('' + a.getUTCHours());
                    b.push('' + a.getUTCMinutes());
                    b.push('' + a.getUTCSeconds());
                    for (a = 0; a < b.length; ++a) 2 > b[a].length && (f += '0'), (f += b[a]);
                    return f + 'Z';
                };
                g.dateToGeneralizedTime = function (a) {
                    if ('string' === typeof a) return a;
                    var f = '',
                        b = [];
                    b.push('' + a.getUTCFullYear());
                    b.push('' + (a.getUTCMonth() + 1));
                    b.push('' + a.getUTCDate());
                    b.push('' + a.getUTCHours());
                    b.push('' + a.getUTCMinutes());
                    b.push('' + a.getUTCSeconds());
                    for (a = 0; a < b.length; ++a) 2 > b[a].length && (f += '0'), (f += b[a]);
                    return f + 'Z';
                };
                g.integerToDer = function (d) {
                    var f = a.util.createBuffer();
                    if (-128 <= d && 128 > d) return f.putSignedInt(d, 8);
                    if (-32768 <= d && 32768 > d) return f.putSignedInt(d, 16);
                    if (-8388608 <= d && 8388608 > d) return f.putSignedInt(d, 24);
                    if (-2147483648 <= d && 2147483648 > d) return f.putSignedInt(d, 32);
                    f = Error('Integer too large; max is 32-bits.');
                    f.integer = d;
                    throw f;
                };
                g.derToInteger = function (d) {
                    'string' === typeof d && (d = a.util.createBuffer(d));
                    var f = 8 * d.length();
                    if (32 < f) throw Error('Integer too large; max is 32-bits.');
                    return d.getSignedInt(f);
                };
                g.validate = function (d, f, b, e) {
                    var h = !1;
                    if (
                        (d.tagClass !== f.tagClass && 'undefined' !== typeof f.tagClass) ||
                        (d.type !== f.type && 'undefined' !== typeof f.type)
                    )
                        e &&
                            (d.tagClass !== f.tagClass &&
                                e.push(
                                    '[' +
                                        f.name +
                                        '] Expected tag class "' +
                                        f.tagClass +
                                        '", got "' +
                                        d.tagClass +
                                        '"',
                                ),
                            d.type !== f.type &&
                                e.push('[' + f.name + '] Expected type "' + f.type + '", got "' + d.type + '"'));
                    else if (d.constructed === f.constructed || 'undefined' === typeof f.constructed) {
                        h = !0;
                        if (f.value && a.util.isArray(f.value))
                            for (var k = 0, u = 0; h && u < f.value.length; ++u)
                                (h = f.value[u].optional || !1),
                                    d.value[k] &&
                                        ((h = g.validate(d.value[k], f.value[u], b, e))
                                            ? ++k
                                            : f.value[u].optional && (h = !0)),
                                    !h &&
                                        e &&
                                        e.push(
                                            '[' +
                                                f.name +
                                                '] Tag class "' +
                                                f.tagClass +
                                                '", type "' +
                                                f.type +
                                                '" expected value length "' +
                                                f.value.length +
                                                '", got "' +
                                                d.value.length +
                                                '"',
                                        );
                        h && b && (f.capture && (b[f.capture] = d.value), f.captureAsn1 && (b[f.captureAsn1] = d));
                    } else
                        e &&
                            e.push(
                                '[' +
                                    f.name +
                                    '] Expected constructed "' +
                                    f.constructed +
                                    '", got "' +
                                    d.constructed +
                                    '"',
                            );
                    return h;
                };
                var G = /[^\\u0000-\\u00ff]/;
                g.prettyPrint = function (d, f, b) {
                    var e = '';
                    f = f || 0;
                    b = b || 2;
                    0 < f && (e += '\n');
                    for (var h = '', k = 0; k < f * b; ++k) h += ' ';
                    e += h + 'Tag: ';
                    switch (d.tagClass) {
                        case g.Class.UNIVERSAL:
                            e += 'Universal:';
                            break;
                        case g.Class.APPLICATION:
                            e += 'Application:';
                            break;
                        case g.Class.CONTEXT_SPECIFIC:
                            e += 'Context-Specific:';
                            break;
                        case g.Class.PRIVATE:
                            e += 'Private:';
                    }
                    if (d.tagClass === g.Class.UNIVERSAL)
                        switch (((e += d.type), d.type)) {
                            case g.Type.NONE:
                                e += ' (None)';
                                break;
                            case g.Type.BOOLEAN:
                                e += ' (Boolean)';
                                break;
                            case g.Type.BITSTRING:
                                e += ' (Bit string)';
                                break;
                            case g.Type.INTEGER:
                                e += ' (Integer)';
                                break;
                            case g.Type.OCTETSTRING:
                                e += ' (Octet string)';
                                break;
                            case g.Type.NULL:
                                e += ' (Null)';
                                break;
                            case g.Type.OID:
                                e += ' (Object Identifier)';
                                break;
                            case g.Type.ODESC:
                                e += ' (Object Descriptor)';
                                break;
                            case g.Type.EXTERNAL:
                                e += ' (External or Instance of)';
                                break;
                            case g.Type.REAL:
                                e += ' (Real)';
                                break;
                            case g.Type.ENUMERATED:
                                e += ' (Enumerated)';
                                break;
                            case g.Type.EMBEDDED:
                                e += ' (Embedded PDV)';
                                break;
                            case g.Type.UTF8:
                                e += ' (UTF8)';
                                break;
                            case g.Type.ROID:
                                e += ' (Relative Object Identifier)';
                                break;
                            case g.Type.SEQUENCE:
                                e += ' (Sequence)';
                                break;
                            case g.Type.SET:
                                e += ' (Set)';
                                break;
                            case g.Type.PRINTABLESTRING:
                                e += ' (Printable String)';
                                break;
                            case g.Type.IA5String:
                                e += ' (IA5String (ASCII))';
                                break;
                            case g.Type.UTCTIME:
                                e += ' (UTC time)';
                                break;
                            case g.Type.GENERALIZEDTIME:
                                e += ' (Generalized time)';
                                break;
                            case g.Type.BMPSTRING:
                                e += ' (BMP String)';
                        }
                    else e += d.type;
                    e = e + '\n' + (h + 'Constructed: ' + d.constructed + '\n');
                    if (d.composed) {
                        var u = 0,
                            v = '';
                        for (k = 0; k < d.value.length; ++k)
                            void 0 !== d.value[k] &&
                                ((u += 1),
                                (v += g.prettyPrint(d.value[k], f + 1, b)),
                                k + 1 < d.value.length && (v += ','));
                        e += h + 'Sub values: ' + u + v;
                    } else if (
                        ((e += h + 'Value: '),
                        d.type === g.Type.OID &&
                            ((f = g.derToOid(d.value)),
                            (e += f),
                            a.pki && a.pki.oids && f in a.pki.oids && (e += ' (' + a.pki.oids[f] + ') ')),
                        d.type === g.Type.INTEGER)
                    )
                        try {
                            e += g.derToInteger(d.value);
                        } catch (c) {
                            e += '0x' + a.util.bytesToHex(d.value);
                        }
                    else
                        d.type === g.Type.OCTETSTRING
                            ? (G.test(d.value) || (e += '(' + d.value + ') '), (e += '0x' + a.util.bytesToHex(d.value)))
                            : (e =
                                  d.type === g.Type.UTF8
                                      ? e + a.util.decodeUtf8(d.value)
                                      : d.type === g.Type.PRINTABLESTRING || d.type === g.Type.IA5String
                                      ? e + d.value
                                      : G.test(d.value)
                                      ? e + ('0x' + a.util.bytesToHex(d.value))
                                      : 0 === d.value.length
                                      ? e + '[null]'
                                      : e + d.value);
                    return e;
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.asn1) return d.asn1;
                        d.defined.asn1 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.asn1;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/asn1', ['require', 'module', './util', './oids'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g() {
                    h = String.fromCharCode(128);
                    h += a.util.fillString(String.fromCharCode(0), 64);
                    f = [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        1,
                        6,
                        11,
                        0,
                        5,
                        10,
                        15,
                        4,
                        9,
                        14,
                        3,
                        8,
                        13,
                        2,
                        7,
                        12,
                        5,
                        8,
                        11,
                        14,
                        1,
                        4,
                        7,
                        10,
                        13,
                        0,
                        3,
                        6,
                        9,
                        12,
                        15,
                        2,
                        0,
                        7,
                        14,
                        5,
                        12,
                        3,
                        10,
                        1,
                        8,
                        15,
                        6,
                        13,
                        4,
                        11,
                        2,
                        9,
                    ];
                    b = [
                        7,
                        12,
                        17,
                        22,
                        7,
                        12,
                        17,
                        22,
                        7,
                        12,
                        17,
                        22,
                        7,
                        12,
                        17,
                        22,
                        5,
                        9,
                        14,
                        20,
                        5,
                        9,
                        14,
                        20,
                        5,
                        9,
                        14,
                        20,
                        5,
                        9,
                        14,
                        20,
                        4,
                        11,
                        16,
                        23,
                        4,
                        11,
                        16,
                        23,
                        4,
                        11,
                        16,
                        23,
                        4,
                        11,
                        16,
                        23,
                        6,
                        10,
                        15,
                        21,
                        6,
                        10,
                        15,
                        21,
                        6,
                        10,
                        15,
                        21,
                        6,
                        10,
                        15,
                        21,
                    ];
                    e = Array(64);
                    for (var d = 0; 64 > d; ++d) e[d] = Math.floor(4294967296 * Math.abs(Math.sin(d + 1)));
                    w = !0;
                }
                function d(a, d, v) {
                    for (var c, k, x, g, A, l, r, n = v.length(); 64 <= n; ) {
                        k = a.h0;
                        x = a.h1;
                        g = a.h2;
                        A = a.h3;
                        for (r = 0; 16 > r; ++r)
                            (d[r] = v.getInt32Le()),
                                (c = A ^ (x & (g ^ A))),
                                (c = k + c + e[r] + d[r]),
                                (l = b[r]),
                                (k = A),
                                (A = g),
                                (g = x),
                                (x += (c << l) | (c >>> (32 - l)));
                        for (; 32 > r; ++r)
                            (c = g ^ (A & (x ^ g))),
                                (c = k + c + e[r] + d[f[r]]),
                                (l = b[r]),
                                (k = A),
                                (A = g),
                                (g = x),
                                (x += (c << l) | (c >>> (32 - l)));
                        for (; 48 > r; ++r)
                            (c = x ^ g ^ A),
                                (c = k + c + e[r] + d[f[r]]),
                                (l = b[r]),
                                (k = A),
                                (A = g),
                                (g = x),
                                (x += (c << l) | (c >>> (32 - l)));
                        for (; 64 > r; ++r)
                            (c = g ^ (x | ~A)),
                                (c = k + c + e[r] + d[f[r]]),
                                (l = b[r]),
                                (k = A),
                                (A = g),
                                (g = x),
                                (x += (c << l) | (c >>> (32 - l)));
                        a.h0 = (a.h0 + k) | 0;
                        a.h1 = (a.h1 + x) | 0;
                        a.h2 = (a.h2 + g) | 0;
                        a.h3 = (a.h3 + A) | 0;
                        n -= 64;
                    }
                }
                var G = (a.md5 = a.md5 || {});
                a.md = a.md || {};
                a.md.algorithms = a.md.algorithms || {};
                a.md.md5 = a.md.algorithms.md5 = G;
                G.create = function () {
                    w || g();
                    var b = null,
                        e = a.util.createBuffer(),
                        f = Array(16),
                        c = {
                            algorithm: 'md5',
                            blockLength: 64,
                            digestLength: 16,
                            messageLength: 0,
                            fullMessageLength: null,
                            messageLengthSize: 8,
                            start: function () {
                                c.messageLength = 0;
                                c.fullMessageLength = c.messageLength64 = [];
                                for (var f = c.messageLengthSize / 4, d = 0; d < f; ++d) c.fullMessageLength.push(0);
                                e = a.util.createBuffer();
                                b = { h0: 1732584193, h1: 4023233417, h2: 2562383102, h3: 271733878 };
                                return c;
                            },
                        };
                    c.start();
                    c.update = function (k, x) {
                        'utf8' === x && (k = a.util.encodeUtf8(k));
                        var q = k.length;
                        c.messageLength += q;
                        q = [(q / 4294967296) >>> 0, q >>> 0];
                        for (var A = c.fullMessageLength.length - 1; 0 <= A; --A)
                            (c.fullMessageLength[A] += q[1]),
                                (q[1] = q[0] + ((c.fullMessageLength[A] / 4294967296) >>> 0)),
                                (c.fullMessageLength[A] >>>= 0),
                                (q[0] = (q[1] / 4294967296) >>> 0);
                        e.putBytes(k);
                        d(b, f, e);
                        (2048 < e.read || 0 === e.length()) && e.compact();
                        return c;
                    };
                    c.digest = function () {
                        var k = a.util.createBuffer();
                        k.putBytes(e.bytes());
                        k.putBytes(
                            h.substr(
                                0,
                                c.blockLength -
                                    ((c.fullMessageLength[c.fullMessageLength.length - 1] + c.messageLengthSize) &
                                        (c.blockLength - 1)),
                            ),
                        );
                        for (var x, g = 0, A = c.fullMessageLength.length - 1; 0 <= A; --A)
                            (x = 8 * c.fullMessageLength[A] + g), (g = (x / 4294967296) >>> 0), k.putInt32Le(x >>> 0);
                        x = { h0: b.h0, h1: b.h1, h2: b.h2, h3: b.h3 };
                        d(x, f, k);
                        k = a.util.createBuffer();
                        k.putInt32Le(x.h0);
                        k.putInt32Le(x.h1);
                        k.putInt32Le(x.h2);
                        k.putInt32Le(x.h3);
                        return k;
                    };
                    return c;
                };
                var h = null,
                    f = null,
                    b = null,
                    e = null,
                    w = !1;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.md5) return d.md5;
                        d.defined.md5 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.md5;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/md5', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(a, b, e) {
                    for (var f, d, g, v, c, q, x, h, A = e.length(); 64 <= A; ) {
                        d = a.h0;
                        g = a.h1;
                        v = a.h2;
                        c = a.h3;
                        q = a.h4;
                        for (h = 0; 16 > h; ++h)
                            (f = e.getInt32()),
                                (b[h] = f),
                                (x = c ^ (g & (v ^ c))),
                                (f = ((d << 5) | (d >>> 27)) + x + q + 1518500249 + f),
                                (q = c),
                                (c = v),
                                (v = ((g << 30) | (g >>> 2)) >>> 0),
                                (g = d),
                                (d = f);
                        for (; 20 > h; ++h)
                            (f = b[h - 3] ^ b[h - 8] ^ b[h - 14] ^ b[h - 16]),
                                (f = (f << 1) | (f >>> 31)),
                                (b[h] = f),
                                (x = c ^ (g & (v ^ c))),
                                (f = ((d << 5) | (d >>> 27)) + x + q + 1518500249 + f),
                                (q = c),
                                (c = v),
                                (v = ((g << 30) | (g >>> 2)) >>> 0),
                                (g = d),
                                (d = f);
                        for (; 32 > h; ++h)
                            (f = b[h - 3] ^ b[h - 8] ^ b[h - 14] ^ b[h - 16]),
                                (f = (f << 1) | (f >>> 31)),
                                (b[h] = f),
                                (x = g ^ v ^ c),
                                (f = ((d << 5) | (d >>> 27)) + x + q + 1859775393 + f),
                                (q = c),
                                (c = v),
                                (v = ((g << 30) | (g >>> 2)) >>> 0),
                                (g = d),
                                (d = f);
                        for (; 40 > h; ++h)
                            (f = b[h - 6] ^ b[h - 16] ^ b[h - 28] ^ b[h - 32]),
                                (f = (f << 2) | (f >>> 30)),
                                (b[h] = f),
                                (x = g ^ v ^ c),
                                (f = ((d << 5) | (d >>> 27)) + x + q + 1859775393 + f),
                                (q = c),
                                (c = v),
                                (v = ((g << 30) | (g >>> 2)) >>> 0),
                                (g = d),
                                (d = f);
                        for (; 60 > h; ++h)
                            (f = b[h - 6] ^ b[h - 16] ^ b[h - 28] ^ b[h - 32]),
                                (f = (f << 2) | (f >>> 30)),
                                (b[h] = f),
                                (x = (g & v) | (c & (g ^ v))),
                                (f = ((d << 5) | (d >>> 27)) + x + q + 2400959708 + f),
                                (q = c),
                                (c = v),
                                (v = ((g << 30) | (g >>> 2)) >>> 0),
                                (g = d),
                                (d = f);
                        for (; 80 > h; ++h)
                            (f = b[h - 6] ^ b[h - 16] ^ b[h - 28] ^ b[h - 32]),
                                (f = (f << 2) | (f >>> 30)),
                                (b[h] = f),
                                (x = g ^ v ^ c),
                                (f = ((d << 5) | (d >>> 27)) + x + q + 3395469782 + f),
                                (q = c),
                                (c = v),
                                (v = ((g << 30) | (g >>> 2)) >>> 0),
                                (g = d),
                                (d = f);
                        a.h0 = (a.h0 + d) | 0;
                        a.h1 = (a.h1 + g) | 0;
                        a.h2 = (a.h2 + v) | 0;
                        a.h3 = (a.h3 + c) | 0;
                        a.h4 = (a.h4 + q) | 0;
                        A -= 64;
                    }
                }
                var d = (a.sha1 = a.sha1 || {});
                a.md = a.md || {};
                a.md.algorithms = a.md.algorithms || {};
                a.md.sha1 = a.md.algorithms.sha1 = d;
                d.create = function () {
                    h ||
                        ((G = String.fromCharCode(128)),
                        (G += a.util.fillString(String.fromCharCode(0), 64)),
                        (h = !0));
                    var f = null,
                        b = a.util.createBuffer(),
                        e = Array(80),
                        d = {
                            algorithm: 'sha1',
                            blockLength: 64,
                            digestLength: 20,
                            messageLength: 0,
                            fullMessageLength: null,
                            messageLengthSize: 8,
                            start: function () {
                                d.messageLength = 0;
                                d.fullMessageLength = d.messageLength64 = [];
                                for (var e = d.messageLengthSize / 4, g = 0; g < e; ++g) d.fullMessageLength.push(0);
                                b = a.util.createBuffer();
                                f = { h0: 1732584193, h1: 4023233417, h2: 2562383102, h3: 271733878, h4: 3285377520 };
                                return d;
                            },
                        };
                    d.start();
                    d.update = function (k, h) {
                        'utf8' === h && (k = a.util.encodeUtf8(k));
                        var v = k.length;
                        d.messageLength += v;
                        v = [(v / 4294967296) >>> 0, v >>> 0];
                        for (var c = d.fullMessageLength.length - 1; 0 <= c; --c)
                            (d.fullMessageLength[c] += v[1]),
                                (v[1] = v[0] + ((d.fullMessageLength[c] / 4294967296) >>> 0)),
                                (d.fullMessageLength[c] >>>= 0),
                                (v[0] = (v[1] / 4294967296) >>> 0);
                        b.putBytes(k);
                        g(f, e, b);
                        (2048 < b.read || 0 === b.length()) && b.compact();
                        return d;
                    };
                    d.digest = function () {
                        var k = a.util.createBuffer();
                        k.putBytes(b.bytes());
                        k.putBytes(
                            G.substr(
                                0,
                                d.blockLength -
                                    ((d.fullMessageLength[d.fullMessageLength.length - 1] + d.messageLengthSize) &
                                        (d.blockLength - 1)),
                            ),
                        );
                        for (var h, v, c = 8 * d.fullMessageLength[0], q = 0; q < d.fullMessageLength.length - 1; ++q)
                            (h = 8 * d.fullMessageLength[q + 1]),
                                (v = (h / 4294967296) >>> 0),
                                (c += v),
                                k.putInt32(c >>> 0),
                                (c = h >>> 0);
                        k.putInt32(c);
                        h = { h0: f.h0, h1: f.h1, h2: f.h2, h3: f.h3, h4: f.h4 };
                        g(h, e, k);
                        k = a.util.createBuffer();
                        k.putInt32(h.h0);
                        k.putInt32(h.h1);
                        k.putInt32(h.h2);
                        k.putInt32(h.h3);
                        k.putInt32(h.h4);
                        return k;
                    };
                    return d;
                };
                var G = null,
                    h = !1;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.sha1) return d.sha1;
                        d.defined.sha1 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.sha1;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/sha1', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(a, e, d) {
                    for (var b, g, v, c, q, x, h, A, l, r, n, F, m, w = d.length(); 64 <= w; ) {
                        for (q = 0; 16 > q; ++q) e[q] = d.getInt32();
                        for (; 64 > q; ++q)
                            (b = e[q - 2]),
                                (b = ((b >>> 17) | (b << 15)) ^ ((b >>> 19) | (b << 13)) ^ (b >>> 10)),
                                (g = e[q - 15]),
                                (g = ((g >>> 7) | (g << 25)) ^ ((g >>> 18) | (g << 14)) ^ (g >>> 3)),
                                (e[q] = (b + e[q - 7] + g + e[q - 16]) | 0);
                        x = a.h0;
                        h = a.h1;
                        A = a.h2;
                        l = a.h3;
                        r = a.h4;
                        n = a.h5;
                        F = a.h6;
                        m = a.h7;
                        for (q = 0; 64 > q; ++q)
                            (b = ((r >>> 6) | (r << 26)) ^ ((r >>> 11) | (r << 21)) ^ ((r >>> 25) | (r << 7))),
                                (v = F ^ (r & (n ^ F))),
                                (g = ((x >>> 2) | (x << 30)) ^ ((x >>> 13) | (x << 19)) ^ ((x >>> 22) | (x << 10))),
                                (c = (x & h) | (A & (x ^ h))),
                                (b = m + b + v + f[q] + e[q]),
                                (g += c),
                                (m = F),
                                (F = n),
                                (n = r),
                                (r = (l + b) >>> 0),
                                (l = A),
                                (A = h),
                                (h = x),
                                (x = (b + g) >>> 0);
                        a.h0 = (a.h0 + x) | 0;
                        a.h1 = (a.h1 + h) | 0;
                        a.h2 = (a.h2 + A) | 0;
                        a.h3 = (a.h3 + l) | 0;
                        a.h4 = (a.h4 + r) | 0;
                        a.h5 = (a.h5 + n) | 0;
                        a.h6 = (a.h6 + F) | 0;
                        a.h7 = (a.h7 + m) | 0;
                        w -= 64;
                    }
                }
                var d = (a.sha256 = a.sha256 || {});
                a.md = a.md || {};
                a.md.algorithms = a.md.algorithms || {};
                a.md.sha256 = a.md.algorithms.sha256 = d;
                d.create = function () {
                    h ||
                        ((G = String.fromCharCode(128)),
                        (G += a.util.fillString(String.fromCharCode(0), 64)),
                        (f = [
                            1116352408,
                            1899447441,
                            3049323471,
                            3921009573,
                            961987163,
                            1508970993,
                            2453635748,
                            2870763221,
                            3624381080,
                            310598401,
                            607225278,
                            1426881987,
                            1925078388,
                            2162078206,
                            2614888103,
                            3248222580,
                            3835390401,
                            4022224774,
                            264347078,
                            604807628,
                            770255983,
                            1249150122,
                            1555081692,
                            1996064986,
                            2554220882,
                            2821834349,
                            2952996808,
                            3210313671,
                            3336571891,
                            3584528711,
                            113926993,
                            338241895,
                            666307205,
                            773529912,
                            1294757372,
                            1396182291,
                            1695183700,
                            1986661051,
                            2177026350,
                            2456956037,
                            2730485921,
                            2820302411,
                            3259730800,
                            3345764771,
                            3516065817,
                            3600352804,
                            4094571909,
                            275423344,
                            430227734,
                            506948616,
                            659060556,
                            883997877,
                            958139571,
                            1322822218,
                            1537002063,
                            1747873779,
                            1955562222,
                            2024104815,
                            2227730452,
                            2361852424,
                            2428436474,
                            2756734187,
                            3204031479,
                            3329325298,
                        ]),
                        (h = !0));
                    var b = null,
                        e = a.util.createBuffer(),
                        d = Array(64),
                        k = {
                            algorithm: 'sha256',
                            blockLength: 64,
                            digestLength: 32,
                            messageLength: 0,
                            fullMessageLength: null,
                            messageLengthSize: 8,
                            start: function () {
                                k.messageLength = 0;
                                k.fullMessageLength = k.messageLength64 = [];
                                for (var d = k.messageLengthSize / 4, f = 0; f < d; ++f) k.fullMessageLength.push(0);
                                e = a.util.createBuffer();
                                b = {
                                    h0: 1779033703,
                                    h1: 3144134277,
                                    h2: 1013904242,
                                    h3: 2773480762,
                                    h4: 1359893119,
                                    h5: 2600822924,
                                    h6: 528734635,
                                    h7: 1541459225,
                                };
                                return k;
                            },
                        };
                    k.start();
                    k.update = function (f, v) {
                        'utf8' === v && (f = a.util.encodeUtf8(f));
                        var c = f.length;
                        k.messageLength += c;
                        c = [(c / 4294967296) >>> 0, c >>> 0];
                        for (var q = k.fullMessageLength.length - 1; 0 <= q; --q)
                            (k.fullMessageLength[q] += c[1]),
                                (c[1] = c[0] + ((k.fullMessageLength[q] / 4294967296) >>> 0)),
                                (k.fullMessageLength[q] >>>= 0),
                                (c[0] = (c[1] / 4294967296) >>> 0);
                        e.putBytes(f);
                        g(b, d, e);
                        (2048 < e.read || 0 === e.length()) && e.compact();
                        return k;
                    };
                    k.digest = function () {
                        var f = a.util.createBuffer();
                        f.putBytes(e.bytes());
                        f.putBytes(
                            G.substr(
                                0,
                                k.blockLength -
                                    ((k.fullMessageLength[k.fullMessageLength.length - 1] + k.messageLengthSize) &
                                        (k.blockLength - 1)),
                            ),
                        );
                        for (var v, c, q = 8 * k.fullMessageLength[0], x = 0; x < k.fullMessageLength.length - 1; ++x)
                            (v = 8 * k.fullMessageLength[x + 1]),
                                (c = (v / 4294967296) >>> 0),
                                (q += c),
                                f.putInt32(q >>> 0),
                                (q = v >>> 0);
                        f.putInt32(q);
                        v = { h0: b.h0, h1: b.h1, h2: b.h2, h3: b.h3, h4: b.h4, h5: b.h5, h6: b.h6, h7: b.h7 };
                        g(v, d, f);
                        f = a.util.createBuffer();
                        f.putInt32(v.h0);
                        f.putInt32(v.h1);
                        f.putInt32(v.h2);
                        f.putInt32(v.h3);
                        f.putInt32(v.h4);
                        f.putInt32(v.h5);
                        f.putInt32(v.h6);
                        f.putInt32(v.h7);
                        return f;
                    };
                    return k;
                };
                var G = null,
                    h = !1,
                    f = null;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.sha256) return d.sha256;
                        d.defined.sha256 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.sha256;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/sha256', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(a, e, f) {
                    for (
                        var d, c, k, g, h, A, l, r, n, F, m, N, u, I, Q, P, w, G, t, p, W, y, J, L, S, T = f.length();
                        128 <= T;

                    ) {
                        for (S = 0; 16 > S; ++S) (e[S][0] = f.getInt32() >>> 0), (e[S][1] = f.getInt32() >>> 0);
                        for (; 80 > S; ++S)
                            (h = e[S - 2]),
                                (n = h[0]),
                                (h = h[1]),
                                (d = (((n >>> 19) | (h << 13)) ^ ((h >>> 29) | (n << 3)) ^ (n >>> 6)) >>> 0),
                                (c =
                                    (((n << 13) | (h >>> 19)) ^ ((h << 3) | (n >>> 29)) ^ ((n << 26) | (h >>> 6))) >>>
                                    0),
                                (h = e[S - 15]),
                                (n = h[0]),
                                (h = h[1]),
                                (k = (((n >>> 1) | (h << 31)) ^ ((n >>> 8) | (h << 24)) ^ (n >>> 7)) >>> 0),
                                (g =
                                    (((n << 31) | (h >>> 1)) ^ ((n << 24) | (h >>> 8)) ^ ((n << 25) | (h >>> 7))) >>>
                                    0),
                                (n = e[S - 7]),
                                (F = e[S - 16]),
                                (h = c + n[1] + g + F[1]),
                                (e[S][0] = (d + n[0] + k + F[0] + ((h / 4294967296) >>> 0)) >>> 0),
                                (e[S][1] = h >>> 0);
                        n = a[0][0];
                        F = a[0][1];
                        m = a[1][0];
                        N = a[1][1];
                        u = a[2][0];
                        I = a[2][1];
                        Q = a[3][0];
                        P = a[3][1];
                        w = a[4][0];
                        G = a[4][1];
                        t = a[5][0];
                        p = a[5][1];
                        W = a[6][0];
                        y = a[6][1];
                        J = a[7][0];
                        L = a[7][1];
                        for (S = 0; 80 > S; ++S)
                            (d = (((w >>> 14) | (G << 18)) ^ ((w >>> 18) | (G << 14)) ^ ((G >>> 9) | (w << 23))) >>> 0),
                                (h =
                                    (((w << 18) | (G >>> 14)) ^ ((w << 14) | (G >>> 18)) ^ ((G << 23) | (w >>> 9))) >>>
                                    0),
                                (c = (W ^ (w & (t ^ W))) >>> 0),
                                (A = (y ^ (G & (p ^ y))) >>> 0),
                                (k =
                                    (((n >>> 28) | (F << 4)) ^ ((F >>> 2) | (n << 30)) ^ ((F >>> 7) | (n << 25))) >>>
                                    0),
                                (g =
                                    (((n << 4) | (F >>> 28)) ^ ((F << 30) | (n >>> 2)) ^ ((F << 25) | (n >>> 7))) >>>
                                    0),
                                (l = ((n & m) | (u & (n ^ m))) >>> 0),
                                (r = ((F & N) | (I & (F ^ N))) >>> 0),
                                (h = L + h + A + b[S][1] + e[S][1]),
                                (d = (J + d + c + b[S][0] + e[S][0] + ((h / 4294967296) >>> 0)) >>> 0),
                                (c = h >>> 0),
                                (h = g + r),
                                (k = (k + l + ((h / 4294967296) >>> 0)) >>> 0),
                                (g = h >>> 0),
                                (J = W),
                                (L = y),
                                (W = t),
                                (y = p),
                                (t = w),
                                (p = G),
                                (h = P + c),
                                (w = (Q + d + ((h / 4294967296) >>> 0)) >>> 0),
                                (G = h >>> 0),
                                (Q = u),
                                (P = I),
                                (u = m),
                                (I = N),
                                (m = n),
                                (N = F),
                                (h = c + g),
                                (n = (d + k + ((h / 4294967296) >>> 0)) >>> 0),
                                (F = h >>> 0);
                        h = a[0][1] + F;
                        a[0][0] = (a[0][0] + n + ((h / 4294967296) >>> 0)) >>> 0;
                        a[0][1] = h >>> 0;
                        h = a[1][1] + N;
                        a[1][0] = (a[1][0] + m + ((h / 4294967296) >>> 0)) >>> 0;
                        a[1][1] = h >>> 0;
                        h = a[2][1] + I;
                        a[2][0] = (a[2][0] + u + ((h / 4294967296) >>> 0)) >>> 0;
                        a[2][1] = h >>> 0;
                        h = a[3][1] + P;
                        a[3][0] = (a[3][0] + Q + ((h / 4294967296) >>> 0)) >>> 0;
                        a[3][1] = h >>> 0;
                        h = a[4][1] + G;
                        a[4][0] = (a[4][0] + w + ((h / 4294967296) >>> 0)) >>> 0;
                        a[4][1] = h >>> 0;
                        h = a[5][1] + p;
                        a[5][0] = (a[5][0] + t + ((h / 4294967296) >>> 0)) >>> 0;
                        a[5][1] = h >>> 0;
                        h = a[6][1] + y;
                        a[6][0] = (a[6][0] + W + ((h / 4294967296) >>> 0)) >>> 0;
                        a[6][1] = h >>> 0;
                        h = a[7][1] + L;
                        a[7][0] = (a[7][0] + J + ((h / 4294967296) >>> 0)) >>> 0;
                        a[7][1] = h >>> 0;
                        T -= 128;
                    }
                }
                var d = (a.sha512 = a.sha512 || {});
                a.md = a.md || {};
                a.md.algorithms = a.md.algorithms || {};
                a.md.sha512 = a.md.algorithms.sha512 = d;
                var G = (a.sha384 = a.sha512.sha384 = a.sha512.sha384 || {});
                G.create = function () {
                    return d.create('SHA-384');
                };
                a.md.sha384 = a.md.algorithms.sha384 = G;
                a.sha512.sha256 = a.sha512.sha256 || {
                    create: function () {
                        return d.create('SHA-512/256');
                    },
                };
                a.md['sha512/256'] = a.md.algorithms['sha512/256'] = a.sha512.sha256;
                a.sha512.sha224 = a.sha512.sha224 || {
                    create: function () {
                        return d.create('SHA-512/224');
                    },
                };
                a.md['sha512/224'] = a.md.algorithms['sha512/224'] = a.sha512.sha224;
                d.create = function (d) {
                    f ||
                        ((h = String.fromCharCode(128)),
                        (h += a.util.fillString(String.fromCharCode(0), 128)),
                        (b = [
                            [1116352408, 3609767458],
                            [1899447441, 602891725],
                            [3049323471, 3964484399],
                            [3921009573, 2173295548],
                            [961987163, 4081628472],
                            [1508970993, 3053834265],
                            [2453635748, 2937671579],
                            [2870763221, 3664609560],
                            [3624381080, 2734883394],
                            [310598401, 1164996542],
                            [607225278, 1323610764],
                            [1426881987, 3590304994],
                            [1925078388, 4068182383],
                            [2162078206, 991336113],
                            [2614888103, 633803317],
                            [3248222580, 3479774868],
                            [3835390401, 2666613458],
                            [4022224774, 944711139],
                            [264347078, 2341262773],
                            [604807628, 2007800933],
                            [770255983, 1495990901],
                            [1249150122, 1856431235],
                            [1555081692, 3175218132],
                            [1996064986, 2198950837],
                            [2554220882, 3999719339],
                            [2821834349, 766784016],
                            [2952996808, 2566594879],
                            [3210313671, 3203337956],
                            [3336571891, 1034457026],
                            [3584528711, 2466948901],
                            [113926993, 3758326383],
                            [338241895, 168717936],
                            [666307205, 1188179964],
                            [773529912, 1546045734],
                            [1294757372, 1522805485],
                            [1396182291, 2643833823],
                            [1695183700, 2343527390],
                            [1986661051, 1014477480],
                            [2177026350, 1206759142],
                            [2456956037, 344077627],
                            [2730485921, 1290863460],
                            [2820302411, 3158454273],
                            [3259730800, 3505952657],
                            [3345764771, 106217008],
                            [3516065817, 3606008344],
                            [3600352804, 1432725776],
                            [4094571909, 1467031594],
                            [275423344, 851169720],
                            [430227734, 3100823752],
                            [506948616, 1363258195],
                            [659060556, 3750685593],
                            [883997877, 3785050280],
                            [958139571, 3318307427],
                            [1322822218, 3812723403],
                            [1537002063, 2003034995],
                            [1747873779, 3602036899],
                            [1955562222, 1575990012],
                            [2024104815, 1125592928],
                            [2227730452, 2716904306],
                            [2361852424, 442776044],
                            [2428436474, 593698344],
                            [2756734187, 3733110249],
                            [3204031479, 2999351573],
                            [3329325298, 3815920427],
                            [3391569614, 3928383900],
                            [3515267271, 566280711],
                            [3940187606, 3454069534],
                            [4118630271, 4000239992],
                            [116418474, 1914138554],
                            [174292421, 2731055270],
                            [289380356, 3203993006],
                            [460393269, 320620315],
                            [685471733, 587496836],
                            [852142971, 1086792851],
                            [1017036298, 365543100],
                            [1126000580, 2618297676],
                            [1288033470, 3409855158],
                            [1501505948, 4234509866],
                            [1607167915, 987167468],
                            [1816402316, 1246189591],
                        ]),
                        (e = {
                            'SHA-512': [
                                [1779033703, 4089235720],
                                [3144134277, 2227873595],
                                [1013904242, 4271175723],
                                [2773480762, 1595750129],
                                [1359893119, 2917565137],
                                [2600822924, 725511199],
                                [528734635, 4215389547],
                                [1541459225, 327033209],
                            ],
                            'SHA-384': [
                                [3418070365, 3238371032],
                                [1654270250, 914150663],
                                [2438529370, 812702999],
                                [355462360, 4144912697],
                                [1731405415, 4290775857],
                                [2394180231, 1750603025],
                                [3675008525, 1694076839],
                                [1203062813, 3204075428],
                            ],
                            'SHA-512/256': [
                                [573645204, 4230739756],
                                [2673172387, 3360449730],
                                [596883563, 1867755857],
                                [2520282905, 1497426621],
                                [2519219938, 2827943907],
                                [3193839141, 1401305490],
                                [721525244, 746961066],
                                [246885852, 2177182882],
                            ],
                            'SHA-512/224': [
                                [2352822216, 424955298],
                                [1944164710, 2312950998],
                                [502970286, 855612546],
                                [1738396948, 1479516111],
                                [258812777, 2077511080],
                                [2011393907, 79989058],
                                [1067287976, 1780299464],
                                [286451373, 2446758561],
                            ],
                        }),
                        (f = !0));
                    'undefined' === typeof d && (d = 'SHA-512');
                    if (!(d in e)) throw Error('Invalid SHA-512 algorithm: ' + d);
                    for (var k = e[d], u = null, v = a.util.createBuffer(), c = Array(80), q = 0; 80 > q; ++q)
                        c[q] = Array(2);
                    var x = {
                        algorithm: d.replace('-', '').toLowerCase(),
                        blockLength: 128,
                        digestLength: 64,
                        messageLength: 0,
                        fullMessageLength: null,
                        messageLengthSize: 16,
                        start: function () {
                            x.messageLength = 0;
                            x.fullMessageLength = x.messageLength128 = [];
                            for (var b = x.messageLengthSize / 4, c = 0; c < b; ++c) x.fullMessageLength.push(0);
                            v = a.util.createBuffer();
                            u = Array(k.length);
                            for (c = 0; c < k.length; ++c) u[c] = k[c].slice(0);
                            return x;
                        },
                    };
                    x.start();
                    x.update = function (b, e) {
                        'utf8' === e && (b = a.util.encodeUtf8(b));
                        var l = b.length;
                        x.messageLength += l;
                        l = [(l / 4294967296) >>> 0, l >>> 0];
                        for (var r = x.fullMessageLength.length - 1; 0 <= r; --r)
                            (x.fullMessageLength[r] += l[1]),
                                (l[1] = l[0] + ((x.fullMessageLength[r] / 4294967296) >>> 0)),
                                (x.fullMessageLength[r] >>>= 0),
                                (l[0] = (l[1] / 4294967296) >>> 0);
                        v.putBytes(b);
                        g(u, c, v);
                        (2048 < v.read || 0 === v.length()) && v.compact();
                        return x;
                    };
                    x.digest = function () {
                        var b = a.util.createBuffer();
                        b.putBytes(v.bytes());
                        b.putBytes(
                            h.substr(
                                0,
                                x.blockLength -
                                    ((x.fullMessageLength[x.fullMessageLength.length - 1] + x.messageLengthSize) &
                                        (x.blockLength - 1)),
                            ),
                        );
                        for (var e, l, r = 8 * x.fullMessageLength[0], n = 0; n < x.fullMessageLength.length - 1; ++n)
                            (e = 8 * x.fullMessageLength[n + 1]),
                                (l = (e / 4294967296) >>> 0),
                                (r += l),
                                b.putInt32(r >>> 0),
                                (r = e >>> 0);
                        b.putInt32(r);
                        e = Array(u.length);
                        for (n = 0; n < u.length; ++n) e[n] = u[n].slice(0);
                        g(e, c, b);
                        b = a.util.createBuffer();
                        l = 'SHA-512' === d ? e.length : 'SHA-384' === d ? e.length - 2 : e.length - 4;
                        for (n = 0; n < l; ++n)
                            b.putInt32(e[n][0]), (n === l - 1 && 'SHA-512/224' === d) || b.putInt32(e[n][1]);
                        return b;
                    };
                    return x;
                };
                var h = null,
                    f = !1,
                    b = null,
                    e = null;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.sha512) return d.sha512;
                        d.defined.sha512 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.sha512;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/sha512', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                a.md = a.md || {};
                a.md.algorithms = { md5: a.md5, sha1: a.sha1, sha256: a.sha256 };
                a.md.md5 = a.md5;
                a.md.sha1 = a.sha1;
                a.md.sha256 = a.sha256;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.md) return d.md;
                        d.defined.md = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.md;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/md', 'require module ./md5 ./sha1 ./sha256 ./sha512'.split(' '), function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                (a.hmac = a.hmac || {}).create = function () {
                    var g = null,
                        d = null,
                        G = null,
                        h = {
                            start: function (f, b) {
                                if (null !== f)
                                    if ('string' === typeof f)
                                        if (((f = f.toLowerCase()), f in a.md.algorithms))
                                            g = a.md.algorithms[f].create();
                                        else throw Error('Unknown hash algorithm "' + f + '"');
                                    else g = f;
                                if (null !== b) {
                                    if ('string' === typeof b) b = a.util.createBuffer(b);
                                    else if (a.util.isArray(b)) {
                                        var e = b;
                                        b = a.util.createBuffer();
                                        for (var h = 0; h < e.length; ++h) b.putByte(e[h]);
                                    }
                                    var k = b.length();
                                    k > g.blockLength && (g.start(), g.update(b.bytes()), (b = g.digest()));
                                    d = a.util.createBuffer();
                                    G = a.util.createBuffer();
                                    k = b.length();
                                    for (h = 0; h < k; ++h) (e = b.at(h)), d.putByte(54 ^ e), G.putByte(92 ^ e);
                                    if (k < g.blockLength)
                                        for (e = g.blockLength - k, h = 0; h < e; ++h) d.putByte(54), G.putByte(92);
                                    d = d.bytes();
                                    G = G.bytes();
                                }
                                g.start();
                                g.update(d);
                            },
                            update: function (a) {
                                g.update(a);
                            },
                            getMac: function () {
                                var a = g.digest().bytes();
                                g.start();
                                g.update(G);
                                g.update(a);
                                return g.digest();
                            },
                        };
                    h.digest = h.getMac;
                    return h;
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (f) {
                                return a(f);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.hmac) return d.hmac;
                        d.defined.hmac = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.hmac;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/hmac', ['require', 'module', './md', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(a) {
                    for (
                        var d = a.name + ': ',
                            f = [],
                            b = function (a, b) {
                                return ' ' + b;
                            },
                            e = 0;
                        e < a.values.length;
                        ++e
                    )
                        f.push(a.values[e].replace(/^(\S+\r\n)/, b));
                    d += f.join(',') + '\r\n';
                    f = 0;
                    a = -1;
                    for (e = 0; e < d.length; ++e, ++f)
                        if (65 < f && -1 !== a)
                            (f = d[a]),
                                ',' === f
                                    ? (++a, (d = d.substr(0, a) + '\r\n ' + d.substr(a)))
                                    : (d = d.substr(0, a) + '\r\n' + f + d.substr(a + 1)),
                                (f = e - a - 1),
                                (a = -1),
                                ++e;
                        else if (' ' === d[e] || '\t' === d[e] || ',' === d[e]) a = e;
                    return d;
                }
                var d = (a.pem = a.pem || {});
                d.encode = function (d, h) {
                    h = h || {};
                    var f = '-----BEGIN ' + d.type + '-----\r\n';
                    if (d.procType) {
                        var b = { name: 'Proc-Type', values: [String(d.procType.version), d.procType.type] };
                        f += g(b);
                    }
                    d.contentDomain && ((b = { name: 'Content-Domain', values: [d.contentDomain] }), (f += g(b)));
                    d.dekInfo &&
                        ((b = { name: 'DEK-Info', values: [d.dekInfo.algorithm] }),
                        d.dekInfo.parameters && b.values.push(d.dekInfo.parameters),
                        (f += g(b)));
                    if (d.headers) for (b = 0; b < d.headers.length; ++b) f += g(d.headers[b]);
                    d.procType && (f += '\r\n');
                    f += a.util.encode64(d.body, h.maxline || 64) + '\r\n';
                    return (f += '-----END ' + d.type + '-----\r\n');
                };
                d.decode = function (d) {
                    for (
                        var g = [],
                            f = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g,
                            b = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/,
                            e = /\r?\n/,
                            w;
                        ;

                    ) {
                        w = f.exec(d);
                        if (!w) break;
                        var k = {
                            type: w[1],
                            procType: null,
                            contentDomain: null,
                            dekInfo: null,
                            headers: [],
                            body: a.util.decode64(w[3]),
                        };
                        g.push(k);
                        if (w[2]) {
                            for (var u = w[2].split(e), v = 0; w && v < u.length; ) {
                                w = u[v].replace(/\s+$/, '');
                                for (var c = v + 1; c < u.length; ++c) {
                                    var q = u[c];
                                    if (!/\s/.test(q[0])) break;
                                    w += q;
                                    v = c;
                                }
                                if ((w = w.match(b))) {
                                    c = { name: w[1], values: [] };
                                    q = w[2].split(',');
                                    for (var x = 0; x < q.length; ++x) c.values.push(q[x].replace(/^\s+/, ''));
                                    if (k.procType)
                                        if (k.contentDomain || 'Content-Domain' !== c.name)
                                            if (k.dekInfo || 'DEK-Info' !== c.name) k.headers.push(c);
                                            else {
                                                if (0 === c.values.length)
                                                    throw Error(
                                                        'Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.',
                                                    );
                                                k.dekInfo = { algorithm: q[0], parameters: q[1] || null };
                                            }
                                        else k.contentDomain = q[0] || '';
                                    else {
                                        if ('Proc-Type' !== c.name)
                                            throw Error(
                                                'Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".',
                                            );
                                        if (2 !== c.values.length)
                                            throw Error(
                                                'Invalid PEM formatted message. The "Proc-Type" header must have two subfields.',
                                            );
                                        k.procType = { version: q[0], type: q[1] };
                                    }
                                }
                                ++v;
                            }
                            if ('ENCRYPTED' === k.procType && !k.dekInfo)
                                throw Error(
                                    'Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".',
                                );
                        }
                    }
                    if (0 === g.length) throw Error('Invalid PEM formatted message.');
                    return g;
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.pem) return d.pem;
                        d.defined.pem = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pem;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/pem', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(b, e) {
                    a.cipher.registerAlgorithm(b, function () {
                        return new a.des.Algorithm(b, e);
                    });
                }
                function d(a, d, g, D) {
                    var c = 32 === a.length ? 3 : 9;
                    D =
                        3 === c
                            ? D
                                ? [30, -2, -2]
                                : [0, 32, 2]
                            : D
                            ? [94, 62, -2, 32, 64, 2, 30, -2, -2]
                            : [0, 32, 2, 62, 30, -2, 64, 96, 2];
                    var l = d[0],
                        r = d[1];
                    d = ((l >>> 4) ^ r) & 252645135;
                    r ^= d;
                    l ^= d << 4;
                    d = ((l >>> 16) ^ r) & 65535;
                    r ^= d;
                    l ^= d << 16;
                    d = ((r >>> 2) ^ l) & 858993459;
                    l ^= d;
                    r ^= d << 2;
                    d = ((r >>> 8) ^ l) & 16711935;
                    l ^= d;
                    r ^= d << 8;
                    d = ((l >>> 1) ^ r) & 1431655765;
                    r ^= d;
                    l ^= d << 1;
                    l = (l << 1) | (l >>> 31);
                    r = (r << 1) | (r >>> 31);
                    for (var n = 0; n < c; n += 3) {
                        for (var F = D[n + 1], m = D[n + 2], q = D[n]; q != F; q += m) {
                            var x = r ^ a[q],
                                I = ((r >>> 4) | (r << 28)) ^ a[q + 1];
                            d = l;
                            l = r;
                            r =
                                d ^
                                (f[(x >>> 24) & 63] |
                                    e[(x >>> 16) & 63] |
                                    k[(x >>> 8) & 63] |
                                    v[x & 63] |
                                    h[(I >>> 24) & 63] |
                                    b[(I >>> 16) & 63] |
                                    w[(I >>> 8) & 63] |
                                    u[I & 63]);
                        }
                        d = l;
                        l = r;
                        r = d;
                    }
                    l = (l >>> 1) | (l << 31);
                    r = (r >>> 1) | (r << 31);
                    d = ((l >>> 1) ^ r) & 1431655765;
                    r ^= d;
                    l ^= d << 1;
                    d = ((r >>> 8) ^ l) & 16711935;
                    l ^= d;
                    r ^= d << 8;
                    d = ((r >>> 2) ^ l) & 858993459;
                    l ^= d;
                    r ^= d << 2;
                    d = ((l >>> 16) ^ r) & 65535;
                    r ^= d;
                    l ^= d << 16;
                    d = ((l >>> 4) ^ r) & 252645135;
                    g[0] = l ^ (d << 4);
                    g[1] = r ^ d;
                }
                function G(b) {
                    b = b || {};
                    var c = 'DES-' + (b.mode || 'CBC').toUpperCase();
                    var e = b.decrypt ? a.cipher.createDecipher(c, b.key) : a.cipher.createCipher(c, b.key);
                    var d = e.start;
                    e.start = function (b, c) {
                        var l = null;
                        c instanceof a.util.ByteBuffer && ((l = c), (c = {}));
                        c = c || {};
                        c.output = l;
                        c.iv = b;
                        d.call(e, c);
                    };
                    return e;
                }
                a.des = a.des || {};
                a.des.startEncrypting = function (a, b, e, d) {
                    a = G({ key: a, output: e, decrypt: !1, mode: d || (null === b ? 'ECB' : 'CBC') });
                    a.start(b);
                    return a;
                };
                a.des.createEncryptionCipher = function (a, b) {
                    return G({ key: a, output: null, decrypt: !1, mode: b });
                };
                a.des.startDecrypting = function (a, b, e, d) {
                    a = G({ key: a, output: e, decrypt: !0, mode: d || (null === b ? 'ECB' : 'CBC') });
                    a.start(b);
                    return a;
                };
                a.des.createDecryptionCipher = function (a, b) {
                    return G({ key: a, output: null, decrypt: !0, mode: b });
                };
                a.des.Algorithm = function (a, b) {
                    var c = this;
                    c.name = a;
                    c.mode = new b({
                        blockSize: 8,
                        cipher: {
                            encrypt: function (a, b) {
                                return d(c._keys, a, b, !1);
                            },
                            decrypt: function (a, b) {
                                return d(c._keys, a, b, !0);
                            },
                        },
                    });
                    c._init = !1;
                };
                a.des.Algorithm.prototype.initialize = function (b) {
                    if (!this._init) {
                        b = a.util.createBuffer(b.key);
                        if (0 === this.name.indexOf('3DES') && 24 !== b.length())
                            throw Error('Invalid Triple-DES key size: ' + 8 * b.length());
                        for (
                            var c = [
                                    0,
                                    4,
                                    536870912,
                                    536870916,
                                    65536,
                                    65540,
                                    536936448,
                                    536936452,
                                    512,
                                    516,
                                    536871424,
                                    536871428,
                                    66048,
                                    66052,
                                    536936960,
                                    536936964,
                                ],
                                e = [
                                    0,
                                    1,
                                    1048576,
                                    1048577,
                                    67108864,
                                    67108865,
                                    68157440,
                                    68157441,
                                    256,
                                    257,
                                    1048832,
                                    1048833,
                                    67109120,
                                    67109121,
                                    68157696,
                                    68157697,
                                ],
                                d = [
                                    0,
                                    8,
                                    2048,
                                    2056,
                                    16777216,
                                    16777224,
                                    16779264,
                                    16779272,
                                    0,
                                    8,
                                    2048,
                                    2056,
                                    16777216,
                                    16777224,
                                    16779264,
                                    16779272,
                                ],
                                f = [
                                    0,
                                    2097152,
                                    134217728,
                                    136314880,
                                    8192,
                                    2105344,
                                    134225920,
                                    136323072,
                                    131072,
                                    2228224,
                                    134348800,
                                    136445952,
                                    139264,
                                    2236416,
                                    134356992,
                                    136454144,
                                ],
                                l = [
                                    0,
                                    262144,
                                    16,
                                    262160,
                                    0,
                                    262144,
                                    16,
                                    262160,
                                    4096,
                                    266240,
                                    4112,
                                    266256,
                                    4096,
                                    266240,
                                    4112,
                                    266256,
                                ],
                                r = [
                                    0,
                                    1024,
                                    32,
                                    1056,
                                    0,
                                    1024,
                                    32,
                                    1056,
                                    33554432,
                                    33555456,
                                    33554464,
                                    33555488,
                                    33554432,
                                    33555456,
                                    33554464,
                                    33555488,
                                ],
                                n = [
                                    0,
                                    268435456,
                                    524288,
                                    268959744,
                                    2,
                                    268435458,
                                    524290,
                                    268959746,
                                    0,
                                    268435456,
                                    524288,
                                    268959744,
                                    2,
                                    268435458,
                                    524290,
                                    268959746,
                                ],
                                k = [
                                    0,
                                    65536,
                                    2048,
                                    67584,
                                    536870912,
                                    536936448,
                                    536872960,
                                    536938496,
                                    131072,
                                    196608,
                                    133120,
                                    198656,
                                    537001984,
                                    537067520,
                                    537004032,
                                    537069568,
                                ],
                                m = [
                                    0,
                                    262144,
                                    0,
                                    262144,
                                    2,
                                    262146,
                                    2,
                                    262146,
                                    33554432,
                                    33816576,
                                    33554432,
                                    33816576,
                                    33554434,
                                    33816578,
                                    33554434,
                                    33816578,
                                ],
                                g = [
                                    0,
                                    268435456,
                                    8,
                                    268435464,
                                    0,
                                    268435456,
                                    8,
                                    268435464,
                                    1024,
                                    268436480,
                                    1032,
                                    268436488,
                                    1024,
                                    268436480,
                                    1032,
                                    268436488,
                                ],
                                h = [
                                    0,
                                    32,
                                    0,
                                    32,
                                    1048576,
                                    1048608,
                                    1048576,
                                    1048608,
                                    8192,
                                    8224,
                                    8192,
                                    8224,
                                    1056768,
                                    1056800,
                                    1056768,
                                    1056800,
                                ],
                                I = [
                                    0,
                                    16777216,
                                    512,
                                    16777728,
                                    2097152,
                                    18874368,
                                    2097664,
                                    18874880,
                                    67108864,
                                    83886080,
                                    67109376,
                                    83886592,
                                    69206016,
                                    85983232,
                                    69206528,
                                    85983744,
                                ],
                                v = [
                                    0,
                                    4096,
                                    134217728,
                                    134221824,
                                    524288,
                                    528384,
                                    134742016,
                                    134746112,
                                    16,
                                    4112,
                                    134217744,
                                    134221840,
                                    524304,
                                    528400,
                                    134742032,
                                    134746128,
                                ],
                                P = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261],
                                u = 8 < b.length() ? 3 : 1,
                                w = [],
                                G = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
                                t = 0,
                                p,
                                y = 0;
                            y < u;
                            y++
                        ) {
                            var J = b.getInt32(),
                                L = b.getInt32();
                            p = ((J >>> 4) ^ L) & 252645135;
                            L ^= p;
                            J ^= p << 4;
                            p = ((L >>> -16) ^ J) & 65535;
                            J ^= p;
                            L ^= p << -16;
                            p = ((J >>> 2) ^ L) & 858993459;
                            L ^= p;
                            J ^= p << 2;
                            p = ((L >>> -16) ^ J) & 65535;
                            J ^= p;
                            L ^= p << -16;
                            p = ((J >>> 1) ^ L) & 1431655765;
                            L ^= p;
                            J ^= p << 1;
                            p = ((L >>> 8) ^ J) & 16711935;
                            J ^= p;
                            L ^= p << 8;
                            p = ((J >>> 1) ^ L) & 1431655765;
                            L ^= p;
                            J ^= p << 1;
                            p = (J << 8) | ((L >>> 20) & 240);
                            J = (L << 24) | ((L << 8) & 16711680) | ((L >>> 8) & 65280) | ((L >>> 24) & 240);
                            L = p;
                            for (var S = 0; S < G.length; ++S) {
                                G[S]
                                    ? ((J = (J << 2) | (J >>> 26)), (L = (L << 2) | (L >>> 26)))
                                    : ((J = (J << 1) | (J >>> 27)), (L = (L << 1) | (L >>> 27)));
                                J &= -15;
                                L &= -15;
                                var T =
                                        c[J >>> 28] |
                                        e[(J >>> 24) & 15] |
                                        d[(J >>> 20) & 15] |
                                        f[(J >>> 16) & 15] |
                                        l[(J >>> 12) & 15] |
                                        r[(J >>> 8) & 15] |
                                        n[(J >>> 4) & 15],
                                    O =
                                        k[L >>> 28] |
                                        m[(L >>> 24) & 15] |
                                        g[(L >>> 20) & 15] |
                                        h[(L >>> 16) & 15] |
                                        I[(L >>> 12) & 15] |
                                        v[(L >>> 8) & 15] |
                                        P[(L >>> 4) & 15];
                                p = ((O >>> 16) ^ T) & 65535;
                                w[t++] = T ^ p;
                                w[t++] = O ^ (p << 16);
                            }
                        }
                        this._keys = w;
                        this._init = !0;
                    }
                };
                g('DES-ECB', a.cipher.modes.ecb);
                g('DES-CBC', a.cipher.modes.cbc);
                g('DES-CFB', a.cipher.modes.cfb);
                g('DES-OFB', a.cipher.modes.ofb);
                g('DES-CTR', a.cipher.modes.ctr);
                g('3DES-ECB', a.cipher.modes.ecb);
                g('3DES-CBC', a.cipher.modes.cbc);
                g('3DES-CFB', a.cipher.modes.cfb);
                g('3DES-OFB', a.cipher.modes.ofb);
                g('3DES-CTR', a.cipher.modes.ctr);
                var h = [
                        16843776,
                        0,
                        65536,
                        16843780,
                        16842756,
                        66564,
                        4,
                        65536,
                        1024,
                        16843776,
                        16843780,
                        1024,
                        16778244,
                        16842756,
                        16777216,
                        4,
                        1028,
                        16778240,
                        16778240,
                        66560,
                        66560,
                        16842752,
                        16842752,
                        16778244,
                        65540,
                        16777220,
                        16777220,
                        65540,
                        0,
                        1028,
                        66564,
                        16777216,
                        65536,
                        16843780,
                        4,
                        16842752,
                        16843776,
                        16777216,
                        16777216,
                        1024,
                        16842756,
                        65536,
                        66560,
                        16777220,
                        1024,
                        4,
                        16778244,
                        66564,
                        16843780,
                        65540,
                        16842752,
                        16778244,
                        16777220,
                        1028,
                        66564,
                        16843776,
                        1028,
                        16778240,
                        16778240,
                        0,
                        65540,
                        66560,
                        0,
                        16842756,
                    ],
                    f = [
                        -2146402272,
                        -2147450880,
                        32768,
                        1081376,
                        1048576,
                        32,
                        -2146435040,
                        -2147450848,
                        -2147483616,
                        -2146402272,
                        -2146402304,
                        -2147483648,
                        -2147450880,
                        1048576,
                        32,
                        -2146435040,
                        1081344,
                        1048608,
                        -2147450848,
                        0,
                        -2147483648,
                        32768,
                        1081376,
                        -2146435072,
                        1048608,
                        -2147483616,
                        0,
                        1081344,
                        32800,
                        -2146402304,
                        -2146435072,
                        32800,
                        0,
                        1081376,
                        -2146435040,
                        1048576,
                        -2147450848,
                        -2146435072,
                        -2146402304,
                        32768,
                        -2146435072,
                        -2147450880,
                        32,
                        -2146402272,
                        1081376,
                        32,
                        32768,
                        -2147483648,
                        32800,
                        -2146402304,
                        1048576,
                        -2147483616,
                        1048608,
                        -2147450848,
                        -2147483616,
                        1048608,
                        1081344,
                        0,
                        -2147450880,
                        32800,
                        -2147483648,
                        -2146435040,
                        -2146402272,
                        1081344,
                    ],
                    b = [
                        520,
                        134349312,
                        0,
                        134348808,
                        134218240,
                        0,
                        131592,
                        134218240,
                        131080,
                        134217736,
                        134217736,
                        131072,
                        134349320,
                        131080,
                        134348800,
                        520,
                        134217728,
                        8,
                        134349312,
                        512,
                        131584,
                        134348800,
                        134348808,
                        131592,
                        134218248,
                        131584,
                        131072,
                        134218248,
                        8,
                        134349320,
                        512,
                        134217728,
                        134349312,
                        134217728,
                        131080,
                        520,
                        131072,
                        134349312,
                        134218240,
                        0,
                        512,
                        131080,
                        134349320,
                        134218240,
                        134217736,
                        512,
                        0,
                        134348808,
                        134218248,
                        131072,
                        134217728,
                        134349320,
                        8,
                        131592,
                        131584,
                        134217736,
                        134348800,
                        134218248,
                        520,
                        134348800,
                        131592,
                        8,
                        134348808,
                        131584,
                    ],
                    e = [
                        8396801,
                        8321,
                        8321,
                        128,
                        8396928,
                        8388737,
                        8388609,
                        8193,
                        0,
                        8396800,
                        8396800,
                        8396929,
                        129,
                        0,
                        8388736,
                        8388609,
                        1,
                        8192,
                        8388608,
                        8396801,
                        128,
                        8388608,
                        8193,
                        8320,
                        8388737,
                        1,
                        8320,
                        8388736,
                        8192,
                        8396928,
                        8396929,
                        129,
                        8388736,
                        8388609,
                        8396800,
                        8396929,
                        129,
                        0,
                        0,
                        8396800,
                        8320,
                        8388736,
                        8388737,
                        1,
                        8396801,
                        8321,
                        8321,
                        128,
                        8396929,
                        129,
                        1,
                        8192,
                        8388609,
                        8193,
                        8396928,
                        8388737,
                        8193,
                        8320,
                        8388608,
                        8396801,
                        128,
                        8388608,
                        8192,
                        8396928,
                    ],
                    w = [
                        256,
                        34078976,
                        34078720,
                        1107296512,
                        524288,
                        256,
                        1073741824,
                        34078720,
                        1074266368,
                        524288,
                        33554688,
                        1074266368,
                        1107296512,
                        1107820544,
                        524544,
                        1073741824,
                        33554432,
                        1074266112,
                        1074266112,
                        0,
                        1073742080,
                        1107820800,
                        1107820800,
                        33554688,
                        1107820544,
                        1073742080,
                        0,
                        1107296256,
                        34078976,
                        33554432,
                        1107296256,
                        524544,
                        524288,
                        1107296512,
                        256,
                        33554432,
                        1073741824,
                        34078720,
                        1107296512,
                        1074266368,
                        33554688,
                        1073741824,
                        1107820544,
                        34078976,
                        1074266368,
                        256,
                        33554432,
                        1107820544,
                        1107820800,
                        524544,
                        1107296256,
                        1107820800,
                        34078720,
                        0,
                        1074266112,
                        1107296256,
                        524544,
                        33554688,
                        1073742080,
                        524288,
                        0,
                        1074266112,
                        34078976,
                        1073742080,
                    ],
                    k = [
                        536870928,
                        541065216,
                        16384,
                        541081616,
                        541065216,
                        16,
                        541081616,
                        4194304,
                        536887296,
                        4210704,
                        4194304,
                        536870928,
                        4194320,
                        536887296,
                        536870912,
                        16400,
                        0,
                        4194320,
                        536887312,
                        16384,
                        4210688,
                        536887312,
                        16,
                        541065232,
                        541065232,
                        0,
                        4210704,
                        541081600,
                        16400,
                        4210688,
                        541081600,
                        536870912,
                        536887296,
                        16,
                        541065232,
                        4210688,
                        541081616,
                        4194304,
                        16400,
                        536870928,
                        4194304,
                        536887296,
                        536870912,
                        16400,
                        536870928,
                        541081616,
                        4210688,
                        541065216,
                        4210704,
                        541081600,
                        0,
                        541065232,
                        16,
                        16384,
                        541065216,
                        4210704,
                        16384,
                        4194320,
                        536887312,
                        0,
                        541081600,
                        536870912,
                        4194320,
                        536887312,
                    ],
                    u = [
                        2097152,
                        69206018,
                        67110914,
                        0,
                        2048,
                        67110914,
                        2099202,
                        69208064,
                        69208066,
                        2097152,
                        0,
                        67108866,
                        2,
                        67108864,
                        69206018,
                        2050,
                        67110912,
                        2099202,
                        2097154,
                        67110912,
                        67108866,
                        69206016,
                        69208064,
                        2097154,
                        69206016,
                        2048,
                        2050,
                        69208066,
                        2099200,
                        2,
                        67108864,
                        2099200,
                        67108864,
                        2099200,
                        2097152,
                        67110914,
                        67110914,
                        69206018,
                        69206018,
                        2,
                        2097154,
                        67108864,
                        67110912,
                        2097152,
                        69208064,
                        2050,
                        2099202,
                        69208064,
                        2050,
                        67108866,
                        69208066,
                        69206016,
                        2099200,
                        0,
                        2,
                        69208066,
                        0,
                        2099202,
                        69206016,
                        2048,
                        67108866,
                        67110912,
                        2048,
                        2097154,
                    ],
                    v = [
                        268439616,
                        4096,
                        262144,
                        268701760,
                        268435456,
                        268439616,
                        64,
                        268435456,
                        262208,
                        268697600,
                        268701760,
                        266240,
                        268701696,
                        266304,
                        4096,
                        64,
                        268697600,
                        268435520,
                        268439552,
                        4160,
                        266240,
                        262208,
                        268697664,
                        268701696,
                        4160,
                        0,
                        0,
                        268697664,
                        268435520,
                        268439552,
                        266304,
                        262144,
                        266304,
                        262144,
                        268701696,
                        4096,
                        64,
                        268697664,
                        4096,
                        266304,
                        268439552,
                        64,
                        268435520,
                        268697600,
                        268697664,
                        268435456,
                        262144,
                        268439616,
                        0,
                        268701760,
                        262208,
                        268435520,
                        268697600,
                        268439552,
                        268439616,
                        0,
                        268701760,
                        266240,
                        266240,
                        4160,
                        4160,
                        262208,
                        268435456,
                        268701696,
                    ];
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.des) return d.des;
                        d.defined.des = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.des;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/des', ['require', 'module', './cipher', './cipherModes', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                var g = (a.pkcs5 = a.pkcs5 || {}),
                    d = 'undefined' !== typeof process && process.versions && process.versions.node,
                    G;
                d && !a.disableNativeCode && (G = H('crypto'));
                a.pbkdf2 = g.pbkdf2 = function (g, f, b, e, w, k) {
                    function h() {
                        if (r > q) return k(null, A);
                        D.start(null, null);
                        D.update(f);
                        D.update(a.util.int32ToBytes(r));
                        n = l = D.digest().getBytes();
                        F = 2;
                        v();
                    }
                    function v() {
                        if (F <= b)
                            return (
                                D.start(null, null),
                                D.update(l),
                                (m = D.digest().getBytes()),
                                (n = a.util.xorBytes(n, m, c)),
                                (l = m),
                                ++F,
                                a.util.setImmediate(v)
                            );
                        A += r < q ? n : n.substr(0, x);
                        ++r;
                        h();
                    }
                    'function' === typeof w && ((k = w), (w = null));
                    if (
                        d &&
                        !a.disableNativeCode &&
                        G.pbkdf2 &&
                        (null === w || 'object' !== typeof w) &&
                        (4 < G.pbkdf2Sync.length || !w || 'sha1' === w)
                    )
                        return (
                            'string' !== typeof w && (w = 'sha1'),
                            (f = new Buffer(f, 'binary')),
                            k
                                ? 4 === G.pbkdf2Sync.length
                                    ? G.pbkdf2(g, f, b, e, function (a, b) {
                                          if (a) return k(a);
                                          k(null, b.toString('binary'));
                                      })
                                    : G.pbkdf2(g, f, b, e, w, function (a, b) {
                                          if (a) return k(a);
                                          k(null, b.toString('binary'));
                                      })
                                : 4 === G.pbkdf2Sync.length
                                ? G.pbkdf2Sync(g, f, b, e).toString('binary')
                                : G.pbkdf2Sync(g, f, b, e, w).toString('binary')
                        );
                    if ('undefined' === typeof w || null === w) w = a.md.sha1.create();
                    if ('string' === typeof w) {
                        if (!(w in a.md.algorithms)) throw Error('Unknown hash algorithm: ' + w);
                        w = a.md[w].create();
                    }
                    var c = w.digestLength;
                    if (e > 4294967295 * c) {
                        g = Error('Derived key is too long.');
                        if (k) return k(g);
                        throw g;
                    }
                    var q = Math.ceil(e / c),
                        x = e - (q - 1) * c,
                        D = a.hmac.create();
                    D.start(w, g);
                    var A = '',
                        l;
                    if (!k) {
                        for (var r = 1; r <= q; ++r) {
                            D.start(null, null);
                            D.update(f);
                            D.update(a.util.int32ToBytes(r));
                            var n = (l = D.digest().getBytes());
                            for (var F = 2; F <= b; ++F) {
                                D.start(null, null);
                                D.update(l);
                                var m = D.digest().getBytes();
                                n = a.util.xorBytes(n, m, c);
                                l = m;
                            }
                            A += r < q ? n : n.substr(0, x);
                        }
                        return A;
                    }
                    r = 1;
                    h();
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.pbkdf2) return d.pbkdf2;
                        d.defined.pbkdf2 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pbkdf2;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/pbkdf2', ['require', 'module', './hmac', './md', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                var g = 'undefined' !== typeof process && process.versions && process.versions.node,
                    d = null;
                a.disableNativeCode || !g || process.versions['node-webkit'] || (d = H('crypto'));
                (a.prng = a.prng || {}).create = function (g) {
                    function h(a) {
                        if (32 <= e.pools[0].messageLength) return f(), a();
                        e.seedFile((32 - e.pools[0].messageLength) << 5, function (b, c) {
                            if (b) return a(b);
                            e.collect(c);
                            f();
                            a();
                        });
                    }
                    function f() {
                        var a = e.plugin.md.create();
                        a.update(e.pools[0].digest().getBytes());
                        e.pools[0].start();
                        for (var b = 1, c = 1; 32 > c; ++c)
                            (b = 31 === b ? 2147483648 : b << 2),
                                0 === b % e.reseeds && (a.update(e.pools[c].digest().getBytes()), e.pools[c].start());
                        b = a.digest().getBytes();
                        a.start();
                        a.update(b);
                        a = a.digest().getBytes();
                        e.key = e.plugin.formatKey(b);
                        e.seed = e.plugin.formatSeed(a);
                        e.reseeds = 4294967295 === e.reseeds ? 0 : e.reseeds + 1;
                        e.generated = 0;
                    }
                    function b(b) {
                        var e = null;
                        if ('undefined' !== typeof window) {
                            var c = window.crypto || window.msCrypto;
                            c &&
                                c.getRandomValues &&
                                (e = function (a) {
                                    return c.getRandomValues(a);
                                });
                        }
                        var d = a.util.createBuffer();
                        if (e)
                            for (; d.length() < b; ) {
                                var f = Math.max(1, Math.min(b - d.length(), 65536) / 4),
                                    k = new Uint32Array(Math.floor(f));
                                try {
                                    for (e(k), f = 0; f < k.length; ++f) d.putInt32(k[f]);
                                } catch (A) {
                                    if (!('undefined' !== typeof QuotaExceededError && A instanceof QuotaExceededError))
                                        throw A;
                                }
                            }
                        if (d.length() < b)
                            for (e = Math.floor(65536 * Math.random()); d.length() < b; )
                                for (
                                    f = 16807 * (e & 65535),
                                        e = 16807 * (e >> 16),
                                        f += (e & 32767) << 16,
                                        f += e >> 15,
                                        f = (f & 2147483647) + (f >> 31),
                                        e = f & 4294967295,
                                        f = 0;
                                    3 > f;
                                    ++f
                                )
                                    (k = e >>> (f << 3)),
                                        (k ^= Math.floor(256 * Math.random())),
                                        d.putByte(String.fromCharCode(k & 255));
                        return d.getBytes(b);
                    }
                    var e = { plugin: g, key: null, seed: null, time: null, reseeds: 0, generated: 0 };
                    g = g.md;
                    for (var w = Array(32), k = 0; 32 > k; ++k) w[k] = g.create();
                    e.pools = w;
                    e.pool = 0;
                    e.generate = function (b, d) {
                        function c(r) {
                            if (r) return d(r);
                            if (l.length() >= b) return d(null, l.getBytes(b));
                            1048575 < e.generated && (e.key = null);
                            if (null === e.key)
                                return a.util.nextTick(function () {
                                    h(c);
                                });
                            r = f(e.key, e.seed);
                            e.generated += r.length;
                            l.putBytes(r);
                            e.key = g(f(e.key, k(e.seed)));
                            e.seed = A(f(e.key, e.seed));
                            a.util.setImmediate(c);
                        }
                        if (!d) return e.generateSync(b);
                        var f = e.plugin.cipher,
                            k = e.plugin.increment,
                            g = e.plugin.formatKey,
                            A = e.plugin.formatSeed,
                            l = a.util.createBuffer();
                        e.key = null;
                        c();
                    };
                    e.generateSync = function (b) {
                        var d = e.plugin.cipher,
                            c = e.plugin.increment,
                            k = e.plugin.formatKey,
                            g = e.plugin.formatSeed;
                        e.key = null;
                        for (var h = a.util.createBuffer(); h.length() < b; ) {
                            1048575 < e.generated && (e.key = null);
                            null === e.key &&
                                (32 <= e.pools[0].messageLength ||
                                    e.collect(e.seedFileSync((32 - e.pools[0].messageLength) << 5)),
                                f());
                            var A = d(e.key, e.seed);
                            e.generated += A.length;
                            h.putBytes(A);
                            e.key = k(d(e.key, c(e.seed)));
                            e.seed = g(d(e.key, e.seed));
                        }
                        return h.getBytes(b);
                    };
                    d
                        ? ((e.seedFile = function (a, b) {
                              d.randomBytes(a, function (a, e) {
                                  if (a) return b(a);
                                  b(null, e.toString());
                              });
                          }),
                          (e.seedFileSync = function (a) {
                              return d.randomBytes(a).toString();
                          }))
                        : ((e.seedFile = function (a, e) {
                              try {
                                  e(null, b(a));
                              } catch (c) {
                                  e(c);
                              }
                          }),
                          (e.seedFileSync = b));
                    e.collect = function (a) {
                        for (var b = a.length, c = 0; c < b; ++c)
                            e.pools[e.pool].update(a.substr(c, 1)), (e.pool = 31 === e.pool ? 0 : e.pool + 1);
                    };
                    e.collectInt = function (a, b) {
                        for (var c = '', d = 0; d < b; d += 8) c += String.fromCharCode((a >> d) & 255);
                        e.collect(c);
                    };
                    e.registerWorker = function (a) {
                        a === self
                            ? (e.seedFile = function (a, b) {
                                  function c(a) {
                                      a = a.data;
                                      a.forge &&
                                          a.forge.prng &&
                                          (self.removeEventListener('message', c),
                                          b(a.forge.prng.err, a.forge.prng.bytes));
                                  }
                                  self.addEventListener('message', c);
                                  self.postMessage({ forge: { prng: { needed: a } } });
                              })
                            : a.addEventListener('message', function (b) {
                                  b = b.data;
                                  b.forge &&
                                      b.forge.prng &&
                                      e.seedFile(b.forge.prng.needed, function (b, e) {
                                          a.postMessage({ forge: { prng: { err: b, bytes: e } } });
                                      });
                              });
                    };
                    return e;
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.prng) return d.prng;
                        d.defined.prng = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.prng;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/prng', ['require', 'module', './md', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                (a.random && a.random.getBytes) ||
                    (function (g) {
                        function d() {
                            var b = a.prng.create(p);
                            b.getBytes = function (a, e) {
                                return b.generate(a, e);
                            };
                            b.getBytesSync = function (a) {
                                return b.generate(a);
                            };
                            return b;
                        }
                        var p = {},
                            h = Array(4),
                            f = a.util.createBuffer();
                        p.formatKey = function (b) {
                            var c = a.util.createBuffer(b);
                            b = Array(4);
                            b[0] = c.getInt32();
                            b[1] = c.getInt32();
                            b[2] = c.getInt32();
                            b[3] = c.getInt32();
                            return a.aes._expandKey(b, !1);
                        };
                        p.formatSeed = function (b) {
                            var c = a.util.createBuffer(b);
                            b = Array(4);
                            b[0] = c.getInt32();
                            b[1] = c.getInt32();
                            b[2] = c.getInt32();
                            b[3] = c.getInt32();
                            return b;
                        };
                        p.cipher = function (b, c) {
                            a.aes._updateBlock(b, c, h, !1);
                            f.putInt32(h[0]);
                            f.putInt32(h[1]);
                            f.putInt32(h[2]);
                            f.putInt32(h[3]);
                            return f.getBytes();
                        };
                        p.increment = function (a) {
                            ++a[3];
                            return a;
                        };
                        p.md = a.md.sha256;
                        var b = d(),
                            e = 'undefined' !== typeof process && process.versions && process.versions.node,
                            w = null;
                        if ('undefined' !== typeof window) {
                            var k = window.crypto || window.msCrypto;
                            k &&
                                k.getRandomValues &&
                                (w = function (a) {
                                    return k.getRandomValues(a);
                                });
                        }
                        if (a.disableNativeCode || (!e && !w)) {
                            b.collectInt(+new Date(), 32);
                            if ('undefined' !== typeof navigator) {
                                e = '';
                                for (var u in navigator)
                                    try {
                                        'string' == typeof navigator[u] && (e += navigator[u]);
                                    } catch (v) {}
                                b.collect(e);
                                e = null;
                            }
                            g &&
                                (g().mousemove(function (a) {
                                    b.collectInt(a.clientX, 16);
                                    b.collectInt(a.clientY, 16);
                                }),
                                g().keypress(function (a) {
                                    b.collectInt(a.charCode, 8);
                                }));
                        }
                        if (a.random) for (u in b) a.random[u] = b[u];
                        else a.random = b;
                        a.random.createInstance = d;
                    })('undefined' !== typeof jQuery ? jQuery : null);
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.random) return d.random;
                        d.defined.random = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.random;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/random', 'require module ./aes ./md ./prng ./util'.split(' '), function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                var g = [
                        217,
                        120,
                        249,
                        196,
                        25,
                        221,
                        181,
                        237,
                        40,
                        233,
                        253,
                        121,
                        74,
                        160,
                        216,
                        157,
                        198,
                        126,
                        55,
                        131,
                        43,
                        118,
                        83,
                        142,
                        98,
                        76,
                        100,
                        136,
                        68,
                        139,
                        251,
                        162,
                        23,
                        154,
                        89,
                        245,
                        135,
                        179,
                        79,
                        19,
                        97,
                        69,
                        109,
                        141,
                        9,
                        129,
                        125,
                        50,
                        189,
                        143,
                        64,
                        235,
                        134,
                        183,
                        123,
                        11,
                        240,
                        149,
                        33,
                        34,
                        92,
                        107,
                        78,
                        130,
                        84,
                        214,
                        101,
                        147,
                        206,
                        96,
                        178,
                        28,
                        115,
                        86,
                        192,
                        20,
                        167,
                        140,
                        241,
                        220,
                        18,
                        117,
                        202,
                        31,
                        59,
                        190,
                        228,
                        209,
                        66,
                        61,
                        212,
                        48,
                        163,
                        60,
                        182,
                        38,
                        111,
                        191,
                        14,
                        218,
                        70,
                        105,
                        7,
                        87,
                        39,
                        242,
                        29,
                        155,
                        188,
                        148,
                        67,
                        3,
                        248,
                        17,
                        199,
                        246,
                        144,
                        239,
                        62,
                        231,
                        6,
                        195,
                        213,
                        47,
                        200,
                        102,
                        30,
                        215,
                        8,
                        232,
                        234,
                        222,
                        128,
                        82,
                        238,
                        247,
                        132,
                        170,
                        114,
                        172,
                        53,
                        77,
                        106,
                        42,
                        150,
                        26,
                        210,
                        113,
                        90,
                        21,
                        73,
                        116,
                        75,
                        159,
                        208,
                        94,
                        4,
                        24,
                        164,
                        236,
                        194,
                        224,
                        65,
                        110,
                        15,
                        81,
                        203,
                        204,
                        36,
                        145,
                        175,
                        80,
                        161,
                        244,
                        112,
                        57,
                        153,
                        124,
                        58,
                        133,
                        35,
                        184,
                        180,
                        122,
                        252,
                        2,
                        54,
                        91,
                        37,
                        85,
                        151,
                        49,
                        45,
                        93,
                        250,
                        152,
                        227,
                        138,
                        146,
                        174,
                        5,
                        223,
                        41,
                        16,
                        103,
                        108,
                        186,
                        201,
                        211,
                        0,
                        230,
                        207,
                        225,
                        158,
                        168,
                        44,
                        99,
                        22,
                        1,
                        63,
                        88,
                        226,
                        137,
                        169,
                        13,
                        56,
                        52,
                        27,
                        171,
                        51,
                        255,
                        176,
                        187,
                        72,
                        12,
                        95,
                        185,
                        177,
                        205,
                        46,
                        197,
                        243,
                        219,
                        71,
                        229,
                        165,
                        156,
                        119,
                        10,
                        166,
                        32,
                        104,
                        254,
                        127,
                        193,
                        173,
                    ],
                    d = [1, 2, 3, 5];
                a.rc2 = a.rc2 || {};
                a.rc2.expandKey = function (d, f) {
                    'string' === typeof d && (d = a.util.createBuffer(d));
                    f = f || 128;
                    var b = d,
                        e = d.length(),
                        h = f,
                        k = Math.ceil(h / 8);
                    h = 255 >> (h & 7);
                    var u;
                    for (u = e; 128 > u; u++) b.putByte(g[(b.at(u - 1) + b.at(u - e)) & 255]);
                    b.setAt(128 - k, g[b.at(128 - k) & h]);
                    for (u = 127 - k; 0 <= u; u--) b.setAt(u, g[b.at(u + 1) ^ b.at(u + k)]);
                    return b;
                };
                var p = function (g, f, b) {
                    var e = !1,
                        h = null,
                        k = null,
                        u = null,
                        v,
                        c,
                        q = [];
                    g = a.rc2.expandKey(g, f);
                    for (v = 0; 64 > v; v++) q.push(g.getInt16Le());
                    if (b) {
                        var x = function (a) {
                            for (v = 0; 4 > v; v++) {
                                a[v] += q[c] + (a[(v + 3) % 4] & a[(v + 2) % 4]) + (~a[(v + 3) % 4] & a[(v + 1) % 4]);
                                var b = a[v],
                                    e = d[v];
                                a[v] = ((b << e) & 65535) | ((b & 65535) >> (16 - e));
                                c++;
                            }
                        };
                        var D = function (a) {
                            for (v = 0; 4 > v; v++) a[v] += q[a[(v + 3) % 4] & 63];
                        };
                    } else
                        (x = function (a) {
                            for (v = 3; 0 <= v; v--) {
                                var b = a[v],
                                    e = d[v];
                                a[v] = ((b & 65535) >> e) | ((b << (16 - e)) & 65535);
                                a[v] -= q[c] + (a[(v + 3) % 4] & a[(v + 2) % 4]) + (~a[(v + 3) % 4] & a[(v + 1) % 4]);
                                c--;
                            }
                        }),
                            (D = function (a) {
                                for (v = 3; 0 <= v; v--) a[v] -= q[a[(v + 3) % 4] & 63];
                            });
                    var A = null;
                    return (A = {
                        start: function (b, c) {
                            b && 'string' === typeof b && (b = a.util.createBuffer(b));
                            e = !1;
                            h = a.util.createBuffer();
                            k = c || new a.util.createBuffer();
                            u = b;
                            A.output = k;
                        },
                        update: function (a) {
                            for (e || h.putBuffer(a); 8 <= h.length(); ) {
                                a = [
                                    [5, x],
                                    [1, D],
                                    [6, x],
                                    [1, D],
                                    [5, x],
                                ];
                                var d = [];
                                for (v = 0; 4 > v; v++) {
                                    var n = h.getInt16Le();
                                    null !== u && (b ? (n ^= u.getInt16Le()) : u.putInt16Le(n));
                                    d.push(n & 65535);
                                }
                                c = b ? 0 : 63;
                                for (n = 0; n < a.length; n++) for (var l = 0; l < a[n][0]; l++) a[n][1](d);
                                for (v = 0; 4 > v; v++)
                                    null !== u && (b ? u.putInt16Le(d[v]) : (d[v] ^= u.getInt16Le())),
                                        k.putInt16Le(d[v]);
                            }
                        },
                        finish: function (a) {
                            var c = !0;
                            if (b)
                                if (a) c = a(8, h, !b);
                                else {
                                    var n = 8 === h.length() ? 8 : 8 - h.length();
                                    h.fillWithByte(n, n);
                                }
                            c && ((e = !0), A.update());
                            !b &&
                                (c = 0 === h.length()) &&
                                (a
                                    ? (c = a(8, k, !b))
                                    : ((a = k.length()), (n = k.at(a - 1)), n > a ? (c = !1) : k.truncate(n)));
                            return c;
                        },
                    });
                };
                a.rc2.startEncrypting = function (d, f, b) {
                    d = a.rc2.createEncryptionCipher(d, 128);
                    d.start(f, b);
                    return d;
                };
                a.rc2.createEncryptionCipher = function (a, d) {
                    return p(a, d, !0);
                };
                a.rc2.startDecrypting = function (d, f, b) {
                    d = a.rc2.createDecryptionCipher(d, 128);
                    d.start(f, b);
                    return d;
                };
                a.rc2.createDecryptionCipher = function (a, d) {
                    return p(a, d, !1);
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.rc2) return d.rc2;
                        d.defined.rc2 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.rc2;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/rc2', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(a, b, c) {
                    this.data = [];
                    null != a &&
                        ('number' == typeof a
                            ? this.fromNumber(a, b, c)
                            : null == b && 'string' != typeof a
                            ? this.fromString(a, 256)
                            : this.fromString(a, b));
                }
                function d() {
                    return new g(null);
                }
                function p(a, b, c, e, n, d) {
                    for (; 0 <= --d; ) {
                        var l = b * this.data[a++] + c.data[e] + n;
                        n = Math.floor(l / 67108864);
                        c.data[e++] = l & 67108863;
                    }
                    return n;
                }
                function h(a, b, c, e, n, d) {
                    var l = b & 32767;
                    for (b >>= 15; 0 <= --d; ) {
                        var m = this.data[a] & 32767,
                            f = this.data[a++] >> 15,
                            r = b * m + f * l;
                        m = l * m + ((r & 32767) << 15) + c.data[e] + (n & 1073741823);
                        n = (m >>> 30) + (r >>> 15) + b * f + (n >>> 30);
                        c.data[e++] = m & 1073741823;
                    }
                    return n;
                }
                function f(a, b, c, e, n, d) {
                    var l = b & 16383;
                    for (b >>= 14; 0 <= --d; ) {
                        var m = this.data[a] & 16383,
                            f = this.data[a++] >> 14,
                            r = b * m + f * l;
                        m = l * m + ((r & 16383) << 14) + c.data[e] + n;
                        n = (m >> 28) + (r >> 14) + b * f;
                        c.data[e++] = m & 268435455;
                    }
                    return n;
                }
                function b(a, b) {
                    var c = F[a.charCodeAt(b)];
                    return null == c ? -1 : c;
                }
                function e(a) {
                    var b = d();
                    b.fromInt(a);
                    return b;
                }
                function w(a) {
                    var b = 1,
                        c;
                    0 != (c = a >>> 16) && ((a = c), (b += 16));
                    0 != (c = a >> 8) && ((a = c), (b += 8));
                    0 != (c = a >> 4) && ((a = c), (b += 4));
                    0 != (c = a >> 2) && ((a = c), (b += 2));
                    0 != a >> 1 && (b += 1);
                    return b;
                }
                function k(a) {
                    this.m = a;
                }
                function u(a) {
                    this.m = a;
                    this.mp = a.invDigit();
                    this.mpl = this.mp & 32767;
                    this.mph = this.mp >> 15;
                    this.um = (1 << (a.DB - 15)) - 1;
                    this.mt2 = 2 * a.t;
                }
                function v(a, b) {
                    return a & b;
                }
                function c(a, b) {
                    return a | b;
                }
                function q(a, b) {
                    return a ^ b;
                }
                function x(a, b) {
                    return a & ~b;
                }
                function D() {}
                function A(a) {
                    return a;
                }
                function l(a) {
                    this.r2 = d();
                    this.q3 = d();
                    g.ONE.dlShiftTo(2 * a.t, this.r2);
                    this.mu = this.r2.divide(a);
                    this.m = a;
                }
                function r() {
                    return {
                        nextBytes: function (a) {
                            for (var b = 0; b < a.length; ++b) a[b] = Math.floor(256 * Math.random());
                        },
                    };
                }
                if ('undefined' === typeof navigator) {
                    g.prototype.am = f;
                    var n = 28;
                } else 'Microsoft Internet Explorer' == navigator.appName ? ((g.prototype.am = h), (n = 30)) : 'Netscape' != navigator.appName ? ((g.prototype.am = p), (n = 26)) : ((g.prototype.am = f), (n = 28));
                g.prototype.DB = n;
                g.prototype.DM = (1 << n) - 1;
                g.prototype.DV = 1 << n;
                g.prototype.FV = Math.pow(2, 52);
                g.prototype.F1 = 52 - n;
                g.prototype.F2 = 2 * n - 52;
                var F = [],
                    m;
                n = 48;
                for (m = 0; 9 >= m; ++m) F[n++] = m;
                n = 97;
                for (m = 10; 36 > m; ++m) F[n++] = m;
                n = 65;
                for (m = 10; 36 > m; ++m) F[n++] = m;
                k.prototype.convert = function (a) {
                    return 0 > a.s || 0 <= a.compareTo(this.m) ? a.mod(this.m) : a;
                };
                k.prototype.revert = function (a) {
                    return a;
                };
                k.prototype.reduce = function (a) {
                    a.divRemTo(this.m, null, a);
                };
                k.prototype.mulTo = function (a, b, c) {
                    a.multiplyTo(b, c);
                    this.reduce(c);
                };
                k.prototype.sqrTo = function (a, b) {
                    a.squareTo(b);
                    this.reduce(b);
                };
                u.prototype.convert = function (a) {
                    var b = d();
                    a.abs().dlShiftTo(this.m.t, b);
                    b.divRemTo(this.m, null, b);
                    0 > a.s && 0 < b.compareTo(g.ZERO) && this.m.subTo(b, b);
                    return b;
                };
                u.prototype.revert = function (a) {
                    var b = d();
                    a.copyTo(b);
                    this.reduce(b);
                    return b;
                };
                u.prototype.reduce = function (a) {
                    for (; a.t <= this.mt2; ) a.data[a.t++] = 0;
                    for (var b = 0; b < this.m.t; ++b) {
                        var c = a.data[b] & 32767,
                            e =
                                (c * this.mpl + (((c * this.mph + (a.data[b] >> 15) * this.mpl) & this.um) << 15)) &
                                a.DM;
                        c = b + this.m.t;
                        for (a.data[c] += this.m.am(0, e, a, b, 0, this.m.t); a.data[c] >= a.DV; )
                            (a.data[c] -= a.DV), a.data[++c]++;
                    }
                    a.clamp();
                    a.drShiftTo(this.m.t, a);
                    0 <= a.compareTo(this.m) && a.subTo(this.m, a);
                };
                u.prototype.mulTo = function (a, b, c) {
                    a.multiplyTo(b, c);
                    this.reduce(c);
                };
                u.prototype.sqrTo = function (a, b) {
                    a.squareTo(b);
                    this.reduce(b);
                };
                g.prototype.copyTo = function (a) {
                    for (var b = this.t - 1; 0 <= b; --b) a.data[b] = this.data[b];
                    a.t = this.t;
                    a.s = this.s;
                };
                g.prototype.fromInt = function (a) {
                    this.t = 1;
                    this.s = 0 > a ? -1 : 0;
                    0 < a ? (this.data[0] = a) : -1 > a ? (this.data[0] = a + this.DV) : (this.t = 0);
                };
                g.prototype.fromString = function (a, c) {
                    if (16 == c) var e = 4;
                    else if (8 == c) e = 3;
                    else if (256 == c) e = 8;
                    else if (2 == c) e = 1;
                    else if (32 == c) e = 5;
                    else if (4 == c) e = 2;
                    else {
                        this.fromRadix(a, c);
                        return;
                    }
                    this.s = this.t = 0;
                    for (var n = a.length, d = !1, l = 0; 0 <= --n; ) {
                        var m = 8 == e ? a[n] & 255 : b(a, n);
                        0 > m
                            ? '-' == a.charAt(n) && (d = !0)
                            : ((d = !1),
                              0 == l
                                  ? (this.data[this.t++] = m)
                                  : l + e > this.DB
                                  ? ((this.data[this.t - 1] |= (m & ((1 << (this.DB - l)) - 1)) << l),
                                    (this.data[this.t++] = m >> (this.DB - l)))
                                  : (this.data[this.t - 1] |= m << l),
                              (l += e),
                              l >= this.DB && (l -= this.DB));
                    }
                    8 == e &&
                        0 != (a[0] & 128) &&
                        ((this.s = -1), 0 < l && (this.data[this.t - 1] |= ((1 << (this.DB - l)) - 1) << l));
                    this.clamp();
                    d && g.ZERO.subTo(this, this);
                };
                g.prototype.clamp = function () {
                    for (var a = this.s & this.DM; 0 < this.t && this.data[this.t - 1] == a; ) --this.t;
                };
                g.prototype.dlShiftTo = function (a, b) {
                    var c;
                    for (c = this.t - 1; 0 <= c; --c) b.data[c + a] = this.data[c];
                    for (c = a - 1; 0 <= c; --c) b.data[c] = 0;
                    b.t = this.t + a;
                    b.s = this.s;
                };
                g.prototype.drShiftTo = function (a, b) {
                    for (var c = a; c < this.t; ++c) b.data[c - a] = this.data[c];
                    b.t = Math.max(this.t - a, 0);
                    b.s = this.s;
                };
                g.prototype.lShiftTo = function (a, b) {
                    var c = a % this.DB,
                        e = this.DB - c,
                        n = (1 << e) - 1,
                        d = Math.floor(a / this.DB),
                        l = (this.s << c) & this.DM,
                        m;
                    for (m = this.t - 1; 0 <= m; --m)
                        (b.data[m + d + 1] = (this.data[m] >> e) | l), (l = (this.data[m] & n) << c);
                    for (m = d - 1; 0 <= m; --m) b.data[m] = 0;
                    b.data[d] = l;
                    b.t = this.t + d + 1;
                    b.s = this.s;
                    b.clamp();
                };
                g.prototype.rShiftTo = function (a, b) {
                    b.s = this.s;
                    var c = Math.floor(a / this.DB);
                    if (c >= this.t) b.t = 0;
                    else {
                        var e = a % this.DB,
                            n = this.DB - e,
                            d = (1 << e) - 1;
                        b.data[0] = this.data[c] >> e;
                        for (var l = c + 1; l < this.t; ++l)
                            (b.data[l - c - 1] |= (this.data[l] & d) << n), (b.data[l - c] = this.data[l] >> e);
                        0 < e && (b.data[this.t - c - 1] |= (this.s & d) << n);
                        b.t = this.t - c;
                        b.clamp();
                    }
                };
                g.prototype.subTo = function (a, b) {
                    for (var c = 0, e = 0, n = Math.min(a.t, this.t); c < n; )
                        (e += this.data[c] - a.data[c]), (b.data[c++] = e & this.DM), (e >>= this.DB);
                    if (a.t < this.t) {
                        for (e -= a.s; c < this.t; ) (e += this.data[c]), (b.data[c++] = e & this.DM), (e >>= this.DB);
                        e += this.s;
                    } else {
                        for (e += this.s; c < a.t; ) (e -= a.data[c]), (b.data[c++] = e & this.DM), (e >>= this.DB);
                        e -= a.s;
                    }
                    b.s = 0 > e ? -1 : 0;
                    -1 > e ? (b.data[c++] = this.DV + e) : 0 < e && (b.data[c++] = e);
                    b.t = c;
                    b.clamp();
                };
                g.prototype.multiplyTo = function (a, b) {
                    var c = this.abs(),
                        e = a.abs(),
                        n = c.t;
                    for (b.t = n + e.t; 0 <= --n; ) b.data[n] = 0;
                    for (n = 0; n < e.t; ++n) b.data[n + c.t] = c.am(0, e.data[n], b, n, 0, c.t);
                    b.s = 0;
                    b.clamp();
                    this.s != a.s && g.ZERO.subTo(b, b);
                };
                g.prototype.squareTo = function (a) {
                    for (var b = this.abs(), c = (a.t = 2 * b.t); 0 <= --c; ) a.data[c] = 0;
                    for (c = 0; c < b.t - 1; ++c) {
                        var e = b.am(c, b.data[c], a, 2 * c, 0, 1);
                        (a.data[c + b.t] += b.am(c + 1, 2 * b.data[c], a, 2 * c + 1, e, b.t - c - 1)) >= b.DV &&
                            ((a.data[c + b.t] -= b.DV), (a.data[c + b.t + 1] = 1));
                    }
                    0 < a.t && (a.data[a.t - 1] += b.am(c, b.data[c], a, 2 * c, 0, 1));
                    a.s = 0;
                    a.clamp();
                };
                g.prototype.divRemTo = function (a, b, c) {
                    var e = a.abs();
                    if (!(0 >= e.t)) {
                        var n = this.abs();
                        if (n.t < e.t) null != b && b.fromInt(0), null != c && this.copyTo(c);
                        else {
                            null == c && (c = d());
                            var l = d(),
                                m = this.s;
                            a = a.s;
                            var f = this.DB - w(e.data[e.t - 1]);
                            0 < f ? (e.lShiftTo(f, l), n.lShiftTo(f, c)) : (e.copyTo(l), n.copyTo(c));
                            e = l.t;
                            n = l.data[e - 1];
                            if (0 != n) {
                                var r = n * (1 << this.F1) + (1 < e ? l.data[e - 2] >> this.F2 : 0),
                                    k = this.FV / r;
                                r = (1 << this.F1) / r;
                                var A = 1 << this.F2,
                                    h = c.t,
                                    F = h - e,
                                    q = null == b ? d() : b;
                                l.dlShiftTo(F, q);
                                0 <= c.compareTo(q) && ((c.data[c.t++] = 1), c.subTo(q, c));
                                g.ONE.dlShiftTo(e, q);
                                for (q.subTo(l, l); l.t < e; ) l.data[l.t++] = 0;
                                for (; 0 <= --F; ) {
                                    var x =
                                        c.data[--h] == n
                                            ? this.DM
                                            : Math.floor(c.data[h] * k + (c.data[h - 1] + A) * r);
                                    if ((c.data[h] += l.am(0, x, c, F, 0, e)) < x)
                                        for (l.dlShiftTo(F, q), c.subTo(q, c); c.data[h] < --x; ) c.subTo(q, c);
                                }
                                null != b && (c.drShiftTo(e, b), m != a && g.ZERO.subTo(b, b));
                                c.t = e;
                                c.clamp();
                                0 < f && c.rShiftTo(f, c);
                                0 > m && g.ZERO.subTo(c, c);
                            }
                        }
                    }
                };
                g.prototype.invDigit = function () {
                    if (1 > this.t) return 0;
                    var a = this.data[0];
                    if (0 == (a & 1)) return 0;
                    var b = a & 3;
                    b = (b * (2 - (a & 15) * b)) & 15;
                    b = (b * (2 - (a & 255) * b)) & 255;
                    b = (b * (2 - (((a & 65535) * b) & 65535))) & 65535;
                    b = (b * (2 - ((a * b) % this.DV))) % this.DV;
                    return 0 < b ? this.DV - b : -b;
                };
                g.prototype.isEven = function () {
                    return 0 == (0 < this.t ? this.data[0] & 1 : this.s);
                };
                g.prototype.exp = function (a, b) {
                    if (4294967295 < a || 1 > a) return g.ONE;
                    var c = d(),
                        e = d(),
                        n = b.convert(this),
                        l = w(a) - 1;
                    for (n.copyTo(c); 0 <= --l; )
                        if ((b.sqrTo(c, e), 0 < (a & (1 << l)))) b.mulTo(e, n, c);
                        else {
                            var m = c;
                            c = e;
                            e = m;
                        }
                    return b.revert(c);
                };
                g.prototype.toString = function (a) {
                    if (0 > this.s) return '-' + this.negate().toString(a);
                    if (16 == a) a = 4;
                    else if (8 == a) a = 3;
                    else if (2 == a) a = 1;
                    else if (32 == a) a = 5;
                    else if (4 == a) a = 2;
                    else return this.toRadix(a);
                    var b = (1 << a) - 1,
                        c,
                        e = !1,
                        n = '',
                        l = this.t,
                        d = this.DB - ((l * this.DB) % a);
                    if (0 < l--)
                        for (
                            d < this.DB &&
                            0 < (c = this.data[l] >> d) &&
                            ((e = !0), (n = '0123456789abcdefghijklmnopqrstuvwxyz'.charAt(c)));
                            0 <= l;

                        )
                            d < a
                                ? ((c = (this.data[l] & ((1 << d) - 1)) << (a - d)),
                                  (c |= this.data[--l] >> (d += this.DB - a)))
                                : ((c = (this.data[l] >> (d -= a)) & b), 0 >= d && ((d += this.DB), --l)),
                                0 < c && (e = !0),
                                e && (n += '0123456789abcdefghijklmnopqrstuvwxyz'.charAt(c));
                    return e ? n : '0';
                };
                g.prototype.negate = function () {
                    var a = d();
                    g.ZERO.subTo(this, a);
                    return a;
                };
                g.prototype.abs = function () {
                    return 0 > this.s ? this.negate() : this;
                };
                g.prototype.compareTo = function (a) {
                    var b = this.s - a.s;
                    if (0 != b) return b;
                    var c = this.t;
                    b = c - a.t;
                    if (0 != b) return 0 > this.s ? -b : b;
                    for (; 0 <= --c; ) if (0 != (b = this.data[c] - a.data[c])) return b;
                    return 0;
                };
                g.prototype.bitLength = function () {
                    return 0 >= this.t ? 0 : this.DB * (this.t - 1) + w(this.data[this.t - 1] ^ (this.s & this.DM));
                };
                g.prototype.mod = function (a) {
                    var b = d();
                    this.abs().divRemTo(a, null, b);
                    0 > this.s && 0 < b.compareTo(g.ZERO) && a.subTo(b, b);
                    return b;
                };
                g.prototype.modPowInt = function (a, b) {
                    var c = 256 > a || b.isEven() ? new k(b) : new u(b);
                    return this.exp(a, c);
                };
                g.ZERO = e(0);
                g.ONE = e(1);
                D.prototype.convert = A;
                D.prototype.revert = A;
                D.prototype.mulTo = function (a, b, c) {
                    a.multiplyTo(b, c);
                };
                D.prototype.sqrTo = function (a, b) {
                    a.squareTo(b);
                };
                l.prototype.convert = function (a) {
                    if (0 > a.s || a.t > 2 * this.m.t) return a.mod(this.m);
                    if (0 > a.compareTo(this.m)) return a;
                    var b = d();
                    a.copyTo(b);
                    this.reduce(b);
                    return b;
                };
                l.prototype.revert = function (a) {
                    return a;
                };
                l.prototype.reduce = function (a) {
                    a.drShiftTo(this.m.t - 1, this.r2);
                    a.t > this.m.t + 1 && ((a.t = this.m.t + 1), a.clamp());
                    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
                    for (this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); 0 > a.compareTo(this.r2); )
                        a.dAddOffset(1, this.m.t + 1);
                    for (a.subTo(this.r2, a); 0 <= a.compareTo(this.m); ) a.subTo(this.m, a);
                };
                l.prototype.mulTo = function (a, b, c) {
                    a.multiplyTo(b, c);
                    this.reduce(c);
                };
                l.prototype.sqrTo = function (a, b) {
                    a.squareTo(b);
                    this.reduce(b);
                };
                var N = [
                        2,
                        3,
                        5,
                        7,
                        11,
                        13,
                        17,
                        19,
                        23,
                        29,
                        31,
                        37,
                        41,
                        43,
                        47,
                        53,
                        59,
                        61,
                        67,
                        71,
                        73,
                        79,
                        83,
                        89,
                        97,
                        101,
                        103,
                        107,
                        109,
                        113,
                        127,
                        131,
                        137,
                        139,
                        149,
                        151,
                        157,
                        163,
                        167,
                        173,
                        179,
                        181,
                        191,
                        193,
                        197,
                        199,
                        211,
                        223,
                        227,
                        229,
                        233,
                        239,
                        241,
                        251,
                        257,
                        263,
                        269,
                        271,
                        277,
                        281,
                        283,
                        293,
                        307,
                        311,
                        313,
                        317,
                        331,
                        337,
                        347,
                        349,
                        353,
                        359,
                        367,
                        373,
                        379,
                        383,
                        389,
                        397,
                        401,
                        409,
                        419,
                        421,
                        431,
                        433,
                        439,
                        443,
                        449,
                        457,
                        461,
                        463,
                        467,
                        479,
                        487,
                        491,
                        499,
                        503,
                        509,
                    ],
                    M = 67108864 / N[N.length - 1];
                g.prototype.chunkSize = function (a) {
                    return Math.floor((Math.LN2 * this.DB) / Math.log(a));
                };
                g.prototype.toRadix = function (a) {
                    null == a && (a = 10);
                    if (0 == this.signum() || 2 > a || 36 < a) return '0';
                    var b = this.chunkSize(a);
                    b = Math.pow(a, b);
                    var c = e(b),
                        n = d(),
                        l = d(),
                        m = '';
                    for (this.divRemTo(c, n, l); 0 < n.signum(); )
                        (m = (b + l.intValue()).toString(a).substr(1) + m), n.divRemTo(c, n, l);
                    return l.intValue().toString(a) + m;
                };
                g.prototype.fromRadix = function (a, c) {
                    this.fromInt(0);
                    null == c && (c = 10);
                    for (
                        var e = this.chunkSize(c), n = Math.pow(c, e), l = !1, d = 0, m = 0, f = 0;
                        f < a.length;
                        ++f
                    ) {
                        var r = b(a, f);
                        0 > r
                            ? '-' == a.charAt(f) && 0 == this.signum() && (l = !0)
                            : ((m = c * m + r), ++d >= e && (this.dMultiply(n), this.dAddOffset(m, 0), (m = d = 0)));
                    }
                    0 < d && (this.dMultiply(Math.pow(c, d)), this.dAddOffset(m, 0));
                    l && g.ZERO.subTo(this, this);
                };
                g.prototype.fromNumber = function (a, b, e) {
                    if ('number' == typeof b)
                        if (2 > a) this.fromInt(1);
                        else
                            for (
                                this.fromNumber(a, e),
                                    this.testBit(a - 1) || this.bitwiseTo(g.ONE.shiftLeft(a - 1), c, this),
                                    this.isEven() && this.dAddOffset(1, 0);
                                !this.isProbablePrime(b);

                            )
                                this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(g.ONE.shiftLeft(a - 1), this);
                    else {
                        e = [];
                        var n = a & 7;
                        e.length = (a >> 3) + 1;
                        b.nextBytes(e);
                        e[0] = 0 < n ? e[0] & ((1 << n) - 1) : 0;
                        this.fromString(e, 256);
                    }
                };
                g.prototype.bitwiseTo = function (a, b, c) {
                    var e,
                        n = Math.min(a.t, this.t);
                    for (e = 0; e < n; ++e) c.data[e] = b(this.data[e], a.data[e]);
                    if (a.t < this.t) {
                        var l = a.s & this.DM;
                        for (e = n; e < this.t; ++e) c.data[e] = b(this.data[e], l);
                        c.t = this.t;
                    } else {
                        l = this.s & this.DM;
                        for (e = n; e < a.t; ++e) c.data[e] = b(l, a.data[e]);
                        c.t = a.t;
                    }
                    c.s = b(this.s, a.s);
                    c.clamp();
                };
                g.prototype.changeBit = function (a, b) {
                    var c = g.ONE.shiftLeft(a);
                    this.bitwiseTo(c, b, c);
                    return c;
                };
                g.prototype.addTo = function (a, b) {
                    for (var c = 0, e = 0, n = Math.min(a.t, this.t); c < n; )
                        (e += this.data[c] + a.data[c]), (b.data[c++] = e & this.DM), (e >>= this.DB);
                    if (a.t < this.t) {
                        for (e += a.s; c < this.t; ) (e += this.data[c]), (b.data[c++] = e & this.DM), (e >>= this.DB);
                        e += this.s;
                    } else {
                        for (e += this.s; c < a.t; ) (e += a.data[c]), (b.data[c++] = e & this.DM), (e >>= this.DB);
                        e += a.s;
                    }
                    b.s = 0 > e ? -1 : 0;
                    0 < e ? (b.data[c++] = e) : -1 > e && (b.data[c++] = this.DV + e);
                    b.t = c;
                    b.clamp();
                };
                g.prototype.dMultiply = function (a) {
                    this.data[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
                    ++this.t;
                    this.clamp();
                };
                g.prototype.dAddOffset = function (a, b) {
                    if (0 != a) {
                        for (; this.t <= b; ) this.data[this.t++] = 0;
                        for (this.data[b] += a; this.data[b] >= this.DV; )
                            (this.data[b] -= this.DV), ++b >= this.t && (this.data[this.t++] = 0), ++this.data[b];
                    }
                };
                g.prototype.multiplyLowerTo = function (a, b, c) {
                    var e = Math.min(this.t + a.t, b);
                    c.s = 0;
                    for (c.t = e; 0 < e; ) c.data[--e] = 0;
                    var n;
                    for (n = c.t - this.t; e < n; ++e) c.data[e + this.t] = this.am(0, a.data[e], c, e, 0, this.t);
                    for (n = Math.min(a.t, b); e < n; ++e) this.am(0, a.data[e], c, e, 0, b - e);
                    c.clamp();
                };
                g.prototype.multiplyUpperTo = function (a, b, c) {
                    --b;
                    var e = (c.t = this.t + a.t - b);
                    for (c.s = 0; 0 <= --e; ) c.data[e] = 0;
                    for (e = Math.max(b - this.t, 0); e < a.t; ++e)
                        c.data[this.t + e - b] = this.am(b - e, a.data[e], c, 0, 0, this.t + e - b);
                    c.clamp();
                    c.drShiftTo(1, c);
                };
                g.prototype.modInt = function (a) {
                    if (0 >= a) return 0;
                    var b = this.DV % a,
                        c = 0 > this.s ? a - 1 : 0;
                    if (0 < this.t)
                        if (0 == b) c = this.data[0] % a;
                        else for (var e = this.t - 1; 0 <= e; --e) c = (b * c + this.data[e]) % a;
                    return c;
                };
                g.prototype.millerRabin = function (a) {
                    var b = this.subtract(g.ONE),
                        c = b.getLowestSetBit();
                    if (0 >= c) return !1;
                    for (var e = b.shiftRight(c), n = r(), l, d = 0; d < a; ++d) {
                        do l = new g(this.bitLength(), n);
                        while (0 >= l.compareTo(g.ONE) || 0 <= l.compareTo(b));
                        l = l.modPow(e, this);
                        if (0 != l.compareTo(g.ONE) && 0 != l.compareTo(b)) {
                            for (var m = 1; m++ < c && 0 != l.compareTo(b); )
                                if (((l = l.modPowInt(2, this)), 0 == l.compareTo(g.ONE))) return !1;
                            if (0 != l.compareTo(b)) return !1;
                        }
                    }
                    return !0;
                };
                g.prototype.clone = function () {
                    var a = d();
                    this.copyTo(a);
                    return a;
                };
                g.prototype.intValue = function () {
                    if (0 > this.s) {
                        if (1 == this.t) return this.data[0] - this.DV;
                        if (0 == this.t) return -1;
                    } else {
                        if (1 == this.t) return this.data[0];
                        if (0 == this.t) return 0;
                    }
                    return ((this.data[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this.data[0];
                };
                g.prototype.byteValue = function () {
                    return 0 == this.t ? this.s : (this.data[0] << 24) >> 24;
                };
                g.prototype.shortValue = function () {
                    return 0 == this.t ? this.s : (this.data[0] << 16) >> 16;
                };
                g.prototype.signum = function () {
                    return 0 > this.s ? -1 : 0 >= this.t || (1 == this.t && 0 >= this.data[0]) ? 0 : 1;
                };
                g.prototype.toByteArray = function () {
                    var a = this.t,
                        b = [];
                    b[0] = this.s;
                    var c = this.DB - ((a * this.DB) % 8),
                        e,
                        n = 0;
                    if (0 < a--)
                        for (
                            c < this.DB &&
                            (e = this.data[a] >> c) != (this.s & this.DM) >> c &&
                            (b[n++] = e | (this.s << (this.DB - c)));
                            0 <= a;

                        )
                            if (
                                (8 > c
                                    ? ((e = (this.data[a] & ((1 << c) - 1)) << (8 - c)),
                                      (e |= this.data[--a] >> (c += this.DB - 8)))
                                    : ((e = (this.data[a] >> (c -= 8)) & 255), 0 >= c && ((c += this.DB), --a)),
                                0 != (e & 128) && (e |= -256),
                                0 == n && (this.s & 128) != (e & 128) && ++n,
                                0 < n || e != this.s)
                            )
                                b[n++] = e;
                    return b;
                };
                g.prototype.equals = function (a) {
                    return 0 == this.compareTo(a);
                };
                g.prototype.min = function (a) {
                    return 0 > this.compareTo(a) ? this : a;
                };
                g.prototype.max = function (a) {
                    return 0 < this.compareTo(a) ? this : a;
                };
                g.prototype.and = function (a) {
                    var b = d();
                    this.bitwiseTo(a, v, b);
                    return b;
                };
                g.prototype.or = function (a) {
                    var b = d();
                    this.bitwiseTo(a, c, b);
                    return b;
                };
                g.prototype.xor = function (a) {
                    var b = d();
                    this.bitwiseTo(a, q, b);
                    return b;
                };
                g.prototype.andNot = function (a) {
                    var b = d();
                    this.bitwiseTo(a, x, b);
                    return b;
                };
                g.prototype.not = function () {
                    for (var a = d(), b = 0; b < this.t; ++b) a.data[b] = this.DM & ~this.data[b];
                    a.t = this.t;
                    a.s = ~this.s;
                    return a;
                };
                g.prototype.shiftLeft = function (a) {
                    var b = d();
                    0 > a ? this.rShiftTo(-a, b) : this.lShiftTo(a, b);
                    return b;
                };
                g.prototype.shiftRight = function (a) {
                    var b = d();
                    0 > a ? this.lShiftTo(-a, b) : this.rShiftTo(a, b);
                    return b;
                };
                g.prototype.getLowestSetBit = function () {
                    for (var a = 0; a < this.t; ++a)
                        if (0 != this.data[a]) {
                            var b = a * this.DB;
                            a = this.data[a];
                            if (0 == a) a = -1;
                            else {
                                var c = 0;
                                0 == (a & 65535) && ((a >>= 16), (c += 16));
                                0 == (a & 255) && ((a >>= 8), (c += 8));
                                0 == (a & 15) && ((a >>= 4), (c += 4));
                                0 == (a & 3) && ((a >>= 2), (c += 2));
                                0 == (a & 1) && ++c;
                                a = c;
                            }
                            return b + a;
                        }
                    return 0 > this.s ? this.t * this.DB : -1;
                };
                g.prototype.bitCount = function () {
                    for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c) {
                        for (var e = this.data[c] ^ b, n = 0; 0 != e; ) (e &= e - 1), ++n;
                        a += n;
                    }
                    return a;
                };
                g.prototype.testBit = function (a) {
                    var b = Math.floor(a / this.DB);
                    return b >= this.t ? 0 != this.s : 0 != (this.data[b] & (1 << a % this.DB));
                };
                g.prototype.setBit = function (a) {
                    return this.changeBit(a, c);
                };
                g.prototype.clearBit = function (a) {
                    return this.changeBit(a, x);
                };
                g.prototype.flipBit = function (a) {
                    return this.changeBit(a, q);
                };
                g.prototype.add = function (a) {
                    var b = d();
                    this.addTo(a, b);
                    return b;
                };
                g.prototype.subtract = function (a) {
                    var b = d();
                    this.subTo(a, b);
                    return b;
                };
                g.prototype.multiply = function (a) {
                    var b = d();
                    this.multiplyTo(a, b);
                    return b;
                };
                g.prototype.divide = function (a) {
                    var b = d();
                    this.divRemTo(a, b, null);
                    return b;
                };
                g.prototype.remainder = function (a) {
                    var b = d();
                    this.divRemTo(a, null, b);
                    return b;
                };
                g.prototype.divideAndRemainder = function (a) {
                    var b = d(),
                        c = d();
                    this.divRemTo(a, b, c);
                    return [b, c];
                };
                g.prototype.modPow = function (a, b) {
                    var c = a.bitLength(),
                        n = e(1);
                    if (0 >= c) return n;
                    var m = 18 > c ? 1 : 48 > c ? 3 : 144 > c ? 4 : 768 > c ? 5 : 6;
                    var f = 8 > c ? new k(b) : b.isEven() ? new l(b) : new u(b);
                    var r = [],
                        g = 3,
                        A = m - 1,
                        h = (1 << m) - 1;
                    r[1] = f.convert(this);
                    if (1 < m)
                        for (c = d(), f.sqrTo(r[1], c); g <= h; ) (r[g] = d()), f.mulTo(c, r[g - 2], r[g]), (g += 2);
                    var F = a.t - 1,
                        q = !0,
                        x = d();
                    for (c = w(a.data[F]) - 1; 0 <= F; ) {
                        if (c >= A) var v = (a.data[F] >> (c - A)) & h;
                        else
                            (v = (a.data[F] & ((1 << (c + 1)) - 1)) << (A - c)),
                                0 < F && (v |= a.data[F - 1] >> (this.DB + c - A));
                        for (g = m; 0 == (v & 1); ) (v >>= 1), --g;
                        0 > (c -= g) && ((c += this.DB), --F);
                        if (q) r[v].copyTo(n), (q = !1);
                        else {
                            for (; 1 < g; ) f.sqrTo(n, x), f.sqrTo(x, n), (g -= 2);
                            0 < g ? f.sqrTo(n, x) : ((g = n), (n = x), (x = g));
                            f.mulTo(x, r[v], n);
                        }
                        for (; 0 <= F && 0 == (a.data[F] & (1 << c)); )
                            f.sqrTo(n, x), (g = n), (n = x), (x = g), 0 > --c && ((c = this.DB - 1), --F);
                    }
                    return f.revert(n);
                };
                g.prototype.modInverse = function (a) {
                    var b = a.isEven();
                    if ((this.isEven() && b) || 0 == a.signum()) return g.ZERO;
                    for (
                        var c = a.clone(), n = this.clone(), l = e(1), d = e(0), m = e(0), f = e(1);
                        0 != c.signum();

                    ) {
                        for (; c.isEven(); )
                            c.rShiftTo(1, c),
                                b
                                    ? ((l.isEven() && d.isEven()) || (l.addTo(this, l), d.subTo(a, d)),
                                      l.rShiftTo(1, l))
                                    : d.isEven() || d.subTo(a, d),
                                d.rShiftTo(1, d);
                        for (; n.isEven(); )
                            n.rShiftTo(1, n),
                                b
                                    ? ((m.isEven() && f.isEven()) || (m.addTo(this, m), f.subTo(a, f)),
                                      m.rShiftTo(1, m))
                                    : f.isEven() || f.subTo(a, f),
                                f.rShiftTo(1, f);
                        0 <= c.compareTo(n)
                            ? (c.subTo(n, c), b && l.subTo(m, l), d.subTo(f, d))
                            : (n.subTo(c, n), b && m.subTo(l, m), f.subTo(d, f));
                    }
                    if (0 != n.compareTo(g.ONE)) return g.ZERO;
                    if (0 <= f.compareTo(a)) return f.subtract(a);
                    if (0 > f.signum()) f.addTo(a, f);
                    else return f;
                    return 0 > f.signum() ? f.add(a) : f;
                };
                g.prototype.pow = function (a) {
                    return this.exp(a, new D());
                };
                g.prototype.gcd = function (a) {
                    var b = 0 > this.s ? this.negate() : this.clone();
                    a = 0 > a.s ? a.negate() : a.clone();
                    if (0 > b.compareTo(a)) {
                        var c = b;
                        b = a;
                        a = c;
                    }
                    c = b.getLowestSetBit();
                    var e = a.getLowestSetBit();
                    if (0 > e) return b;
                    c < e && (e = c);
                    0 < e && (b.rShiftTo(e, b), a.rShiftTo(e, a));
                    for (; 0 < b.signum(); )
                        0 < (c = b.getLowestSetBit()) && b.rShiftTo(c, b),
                            0 < (c = a.getLowestSetBit()) && a.rShiftTo(c, a),
                            0 <= b.compareTo(a) ? (b.subTo(a, b), b.rShiftTo(1, b)) : (a.subTo(b, a), a.rShiftTo(1, a));
                    0 < e && a.lShiftTo(e, a);
                    return a;
                };
                g.prototype.isProbablePrime = function (a) {
                    var b,
                        c = this.abs();
                    if (1 == c.t && c.data[0] <= N[N.length - 1]) {
                        for (b = 0; b < N.length; ++b) if (c.data[0] == N[b]) return !0;
                        return !1;
                    }
                    if (c.isEven()) return !1;
                    for (b = 1; b < N.length; ) {
                        for (var e = N[b], n = b + 1; n < N.length && e < M; ) e *= N[n++];
                        for (e = c.modInt(e); b < n; ) if (0 == e % N[b++]) return !1;
                    }
                    return c.millerRabin(a);
                };
                a.jsbn = a.jsbn || {};
                a.jsbn.BigInteger = g;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.jsbn) return d.jsbn;
                        d.defined.jsbn = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.jsbn;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/jsbn', ['require', 'module'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(d, g, f) {
                    f || (f = a.md.sha1.create());
                    for (var b = '', e = Math.ceil(g / f.digestLength), h = 0; h < e; ++h) {
                        var k = String.fromCharCode((h >> 24) & 255, (h >> 16) & 255, (h >> 8) & 255, h & 255);
                        f.start();
                        f.update(d + k);
                        b += f.digest().getBytes();
                    }
                    return b.substring(0, g);
                }
                var d = (a.pkcs1 = a.pkcs1 || {});
                d.encode_rsa_oaep = function (d, h, f, b, e) {
                    if ('string' === typeof f) {
                        var w = f;
                        var k = b || void 0;
                        var u = e || void 0;
                    } else if (
                        f &&
                        ((w = f.label || void 0), (k = f.seed || void 0), (u = f.md || void 0), f.mgf1 && f.mgf1.md)
                    )
                        var v = f.mgf1.md;
                    u ? u.start() : (u = a.md.sha1.create());
                    v || (v = u);
                    d = Math.ceil(d.n.bitLength() / 8);
                    f = d - 2 * u.digestLength - 2;
                    if (h.length > f)
                        throw (
                            ((v = Error('RSAES-OAEP input message length is too long.')),
                            (v.length = h.length),
                            (v.maxLength = f),
                            v)
                        );
                    w || (w = '');
                    u.update(w, 'raw');
                    w = u.digest();
                    b = '';
                    f -= h.length;
                    for (e = 0; e < f; e++) b += '\x00';
                    h = w.getBytes() + b + '\u0001' + h;
                    if (!k) k = a.random.getBytes(u.digestLength);
                    else if (k.length !== u.digestLength)
                        throw (
                            ((v = Error('Invalid RSAES-OAEP seed. The seed length must match the digest length.')),
                            (v.seedLength = k.length),
                            (v.digestLength = u.digestLength),
                            v)
                        );
                    d = g(k, d - u.digestLength - 1, v);
                    h = a.util.xorBytes(h, d, h.length);
                    u = g(h, u.digestLength, v);
                    return '\x00' + a.util.xorBytes(k, u, k.length) + h;
                };
                d.decode_rsa_oaep = function (d, h, f, b) {
                    if ('string' === typeof f) {
                        var e = f;
                        var w = b || void 0;
                    } else if (f && ((e = f.label || void 0), (w = f.md || void 0), f.mgf1 && f.mgf1.md))
                        var k = f.mgf1.md;
                    f = Math.ceil(d.n.bitLength() / 8);
                    if (h.length !== f)
                        throw (
                            ((k = Error('RSAES-OAEP encoded message length is invalid.')),
                            (k.length = h.length),
                            (k.expectedLength = f),
                            k)
                        );
                    void 0 === w ? (w = a.md.sha1.create()) : w.start();
                    k || (k = w);
                    if (f < 2 * w.digestLength + 2) throw Error('RSAES-OAEP key is too short for the hash function.');
                    e || (e = '');
                    w.update(e, 'raw');
                    e = w.digest().getBytes();
                    d = h.charAt(0);
                    b = h.substring(1, w.digestLength + 1);
                    h = h.substring(1 + w.digestLength);
                    var u = g(h, w.digestLength, k);
                    b = a.util.xorBytes(b, u, b.length);
                    k = g(b, f - w.digestLength - 1, k);
                    h = a.util.xorBytes(h, k, h.length);
                    f = h.substring(0, w.digestLength);
                    k = '\x00' !== d;
                    for (d = 0; d < w.digestLength; ++d) k |= e.charAt(d) !== f.charAt(d);
                    e = 1;
                    for (w = d = w.digestLength; w < h.length; w++)
                        (f = h.charCodeAt(w)), (b = (f & 1) ^ 1), (k |= f & (e ? 65534 : 0)), (e &= b), (d += e);
                    if (k || 1 !== h.charCodeAt(d)) throw Error('Invalid RSAES-OAEP padding.');
                    return h.substring(d + 1);
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.pkcs1) return d.pkcs1;
                        d.defined.pkcs1 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pkcs1;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/pkcs1', ['require', 'module', './util', './random', './sha1'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(a, b, e, f) {
                    return 'workers' in e ? p(a, b, e, f) : d(a, b, e, f);
                }
                function d(b, c, e, k) {
                    var g = h(b, c),
                        A = 0,
                        l = f(g.bitLength());
                    'millerRabinTests' in e && (l = e.millerRabinTests);
                    var r = 10;
                    'maxBlockTime' in e && (r = e.maxBlockTime);
                    var n = +new Date();
                    do {
                        g.bitLength() > b && (g = h(b, c));
                        if (g.isProbablePrime(l)) return k(null, g);
                        g.dAddOffset(w[A++ % 8], 0);
                    } while (0 > r || +new Date() - n < r);
                    a.util.setImmediate(function () {
                        d(b, c, e, k);
                    });
                }
                function p(b, c, f, k) {
                    function g() {
                        function a(a) {
                            if (!q) {
                                --g;
                                var l = a.data;
                                if (l.found) {
                                    for (a = 0; a < d.length; ++a) d[a].terminate();
                                    q = !0;
                                    return k(null, new e(l.prime, 16));
                                }
                                A.bitLength() > b && (A = h(b, c));
                                l = A.toString(16);
                                a.target.postMessage({ hex: l, workLoad: r });
                                A.dAddOffset(n, 0);
                            }
                        }
                        l = Math.max(1, l);
                        for (var d = [], f = 0; f < l; ++f) d[f] = new Worker(F);
                        var g = l;
                        for (f = 0; f < l; ++f) d[f].addEventListener('message', a);
                        var q = !1;
                    }
                    if ('undefined' === typeof Worker) return d(b, c, f, k);
                    var A = h(b, c),
                        l = f.workers,
                        r = f.workLoad || 100,
                        n = (30 * r) / 8,
                        F = f.workerScript || 'forge/prime.worker.js';
                    if (-1 === l)
                        return a.util.estimateCores(function (a, b) {
                            a && (b = 2);
                            l = b - 1;
                            g();
                        });
                    g();
                }
                function h(a, b) {
                    var c = new e(a, b),
                        d = a - 1;
                    c.testBit(d) || c.bitwiseTo(e.ONE.shiftLeft(d), u, c);
                    c.dAddOffset(31 - c.mod(k).byteValue(), 0);
                    return c;
                }
                function f(a) {
                    return 100 >= a
                        ? 27
                        : 150 >= a
                        ? 18
                        : 200 >= a
                        ? 15
                        : 250 >= a
                        ? 12
                        : 300 >= a
                        ? 9
                        : 350 >= a
                        ? 8
                        : 400 >= a
                        ? 7
                        : 500 >= a
                        ? 6
                        : 600 >= a
                        ? 5
                        : 800 >= a
                        ? 4
                        : 1250 >= a
                        ? 3
                        : 2;
                }
                if (!a.prime) {
                    var b = (a.prime = a.prime || {}),
                        e = a.jsbn.BigInteger,
                        w = [6, 4, 2, 4, 2, 4, 6, 2],
                        k = new e(null);
                    k.fromInt(30);
                    var u = function (a, b) {
                        return a | b;
                    };
                    b.generateProbablePrime = function (b, c, e) {
                        'function' === typeof c && ((e = c), (c = {}));
                        c = c || {};
                        var d = c.algorithm || 'PRIMEINC';
                        'string' === typeof d && (d = { name: d });
                        d.options = d.options || {};
                        var f = c.prng || a.random;
                        c = {
                            nextBytes: function (a) {
                                for (var b = f.getBytesSync(a.length), c = 0; c < a.length; ++c) a[c] = b.charCodeAt(c);
                            },
                        };
                        if ('PRIMEINC' === d.name) return g(b, c, d.options, e);
                        throw Error('Invalid prime generation algorithm: ' + d.name);
                    };
                }
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.prime) return d.prime;
                        d.defined.prime = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.prime;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/prime', ['require', 'module', './util', './jsbn', './random'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(b, c, e) {
                    var n = a.util.createBuffer();
                    c = Math.ceil(c.n.bitLength() / 8);
                    if (b.length > c - 11)
                        throw (
                            ((n = Error('Message is too long for PKCS#1 v1.5 padding.')),
                            (n.length = b.length),
                            (n.max = c - 11),
                            n)
                        );
                    n.putByte(0);
                    n.putByte(e);
                    c = c - 3 - b.length;
                    if (0 === e || 1 === e) {
                        e = 0 === e ? 0 : 255;
                        for (var d = 0; d < c; ++d) n.putByte(e);
                    } else
                        for (; 0 < c; ) {
                            var l = 0,
                                f = a.random.getBytes(c);
                            for (d = 0; d < c; ++d) (e = f.charCodeAt(d)), 0 === e ? ++l : n.putByte(e);
                            c = l;
                        }
                    n.putByte(0);
                    n.putBytes(b);
                    return n;
                }
                function d(b, c, e, d) {
                    c = Math.ceil(c.n.bitLength() / 8);
                    b = a.util.createBuffer(b);
                    var n = b.getByte(),
                        l = b.getByte();
                    if (
                        0 !== n ||
                        (e && 0 !== l && 1 !== l) ||
                        (!e && 2 != l) ||
                        (e && 0 === l && 'undefined' === typeof d)
                    )
                        throw Error('Encryption block is invalid.');
                    e = 0;
                    if (0 === l)
                        for (e = c - 3 - d, d = 0; d < e; ++d) {
                            if (0 !== b.getByte()) throw Error('Encryption block is invalid.');
                        }
                    else if (1 === l)
                        for (e = 0; 1 < b.length(); ) {
                            if (255 !== b.getByte()) {
                                --b.read;
                                break;
                            }
                            ++e;
                        }
                    else if (2 === l)
                        for (e = 0; 1 < b.length(); ) {
                            if (0 === b.getByte()) {
                                --b.read;
                                break;
                            }
                            ++e;
                        }
                    if (0 !== b.getByte() || e !== c - 3 - b.length()) throw Error('Encryption block is invalid.');
                    return b.getBytes();
                }
                function p(b, c, e) {
                    function d() {
                        n(b.pBits, function (a, c) {
                            if (a) return e(a);
                            b.p = c;
                            if (null !== b.q) return l(a, b.q);
                            n(b.qBits, l);
                        });
                    }
                    function n(b, c) {
                        a.prime.generateProbablePrime(b, f, c);
                    }
                    function l(a, c) {
                        if (a) return e(a);
                        b.q = c;
                        if (0 > b.p.compareTo(b.q)) {
                            var f = b.p;
                            b.p = b.q;
                            b.q = f;
                        }
                        0 !== b.p.subtract(k.ONE).gcd(b.e).compareTo(k.ONE)
                            ? ((b.p = null), d())
                            : 0 !== b.q.subtract(k.ONE).gcd(b.e).compareTo(k.ONE)
                            ? ((b.q = null), n(b.qBits, l))
                            : ((b.p1 = b.p.subtract(k.ONE)),
                              (b.q1 = b.q.subtract(k.ONE)),
                              (b.phi = b.p1.multiply(b.q1)),
                              0 !== b.phi.gcd(b.e).compareTo(k.ONE)
                                  ? ((b.p = b.q = null), d())
                                  : ((b.n = b.p.multiply(b.q)),
                                    b.n.bitLength() !== b.bits
                                        ? ((b.q = null), n(b.qBits, l))
                                        : ((f = b.e.modInverse(b.phi)),
                                          (b.keys = {
                                              privateKey: v.rsa.setPrivateKey(
                                                  b.n,
                                                  b.e,
                                                  f,
                                                  b.p,
                                                  b.q,
                                                  f.mod(b.p1),
                                                  f.mod(b.q1),
                                                  b.q.modInverse(b.p),
                                              ),
                                              publicKey: v.rsa.setPublicKey(b.n, b.e),
                                          }),
                                          e(null, b.keys))));
                    }
                    'function' === typeof c && ((e = c), (c = {}));
                    c = c || {};
                    var f = {
                        algorithm: {
                            name: c.algorithm || 'PRIMEINC',
                            options: {
                                workers: c.workers || 2,
                                workLoad: c.workLoad || 100,
                                workerScript: c.workerScript,
                            },
                        },
                    };
                    'prng' in c && (f.prng = c.prng);
                    d();
                }
                function h(b) {
                    b = b.toString(16);
                    '8' <= b[0] && (b = '00' + b);
                    b = a.util.hexToBytes(b);
                    return 1 < b.length &&
                        ((0 === b.charCodeAt(0) && 0 === (b.charCodeAt(1) & 128)) ||
                            (255 === b.charCodeAt(0) && 128 === (b.charCodeAt(1) & 128)))
                        ? b.substr(1)
                        : b;
                }
                function f(a) {
                    return 100 >= a
                        ? 27
                        : 150 >= a
                        ? 18
                        : 200 >= a
                        ? 15
                        : 250 >= a
                        ? 12
                        : 300 >= a
                        ? 9
                        : 350 >= a
                        ? 8
                        : 400 >= a
                        ? 7
                        : 500 >= a
                        ? 6
                        : 600 >= a
                        ? 5
                        : 800 >= a
                        ? 4
                        : 1250 >= a
                        ? 3
                        : 2;
                }
                function b(a) {
                    return (
                        'undefined' !== typeof window &&
                        'object' === typeof window.crypto &&
                        'object' === typeof window.crypto.subtle &&
                        'function' === typeof window.crypto.subtle[a]
                    );
                }
                function e(a) {
                    return (
                        'undefined' !== typeof window &&
                        'object' === typeof window.msCrypto &&
                        'object' === typeof window.msCrypto.subtle &&
                        'function' === typeof window.msCrypto.subtle[a]
                    );
                }
                function w(b) {
                    b = a.util.hexToBytes(b.toString(16));
                    for (var c = new Uint8Array(b.length), e = 0; e < b.length; ++e) c[e] = b.charCodeAt(e);
                    return c;
                }
                if ('undefined' === typeof k) var k = a.jsbn.BigInteger;
                var u = a.asn1;
                a.pki = a.pki || {};
                a.pki.rsa = a.rsa = a.rsa || {};
                var v = a.pki,
                    c = [6, 4, 2, 4, 2, 4, 6, 2],
                    q = {
                        name: 'PrivateKeyInfo',
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'PrivateKeyInfo.version',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyVersion',
                            },
                            {
                                name: 'PrivateKeyInfo.privateKeyAlgorithm',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.SEQUENCE,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'AlgorithmIdentifier.algorithm',
                                        tagClass: u.Class.UNIVERSAL,
                                        type: u.Type.OID,
                                        constructed: !1,
                                        capture: 'privateKeyOid',
                                    },
                                ],
                            },
                            {
                                name: 'PrivateKeyInfo',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.OCTETSTRING,
                                constructed: !1,
                                capture: 'privateKey',
                            },
                        ],
                    },
                    x = {
                        name: 'RSAPrivateKey',
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'RSAPrivateKey.version',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyVersion',
                            },
                            {
                                name: 'RSAPrivateKey.modulus',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyModulus',
                            },
                            {
                                name: 'RSAPrivateKey.publicExponent',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyPublicExponent',
                            },
                            {
                                name: 'RSAPrivateKey.privateExponent',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyPrivateExponent',
                            },
                            {
                                name: 'RSAPrivateKey.prime1',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyPrime1',
                            },
                            {
                                name: 'RSAPrivateKey.prime2',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyPrime2',
                            },
                            {
                                name: 'RSAPrivateKey.exponent1',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyExponent1',
                            },
                            {
                                name: 'RSAPrivateKey.exponent2',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyExponent2',
                            },
                            {
                                name: 'RSAPrivateKey.coefficient',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'privateKeyCoefficient',
                            },
                        ],
                    },
                    D = {
                        name: 'RSAPublicKey',
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'RSAPublicKey.modulus',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'publicKeyModulus',
                            },
                            {
                                name: 'RSAPublicKey.exponent',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.INTEGER,
                                constructed: !1,
                                capture: 'publicKeyExponent',
                            },
                        ],
                    },
                    A = (a.pki.rsa.publicKeyValidator = {
                        name: 'SubjectPublicKeyInfo',
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.SEQUENCE,
                        constructed: !0,
                        captureAsn1: 'subjectPublicKeyInfo',
                        value: [
                            {
                                name: 'SubjectPublicKeyInfo.AlgorithmIdentifier',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.SEQUENCE,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'AlgorithmIdentifier.algorithm',
                                        tagClass: u.Class.UNIVERSAL,
                                        type: u.Type.OID,
                                        constructed: !1,
                                        capture: 'publicKeyOid',
                                    },
                                ],
                            },
                            {
                                name: 'SubjectPublicKeyInfo.subjectPublicKey',
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.BITSTRING,
                                constructed: !1,
                                value: [
                                    {
                                        name: 'SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey',
                                        tagClass: u.Class.UNIVERSAL,
                                        type: u.Type.SEQUENCE,
                                        constructed: !0,
                                        optional: !0,
                                        captureAsn1: 'rsaPublicKey',
                                    },
                                ],
                            },
                        ],
                    }),
                    l = function (a) {
                        if (a.algorithm in v.oids) var b = v.oids[a.algorithm];
                        else throw ((b = Error('Unknown message digest algorithm.')), (b.algorithm = a.algorithm), b);
                        var c = u.oidToDer(b).getBytes();
                        b = u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, []);
                        var e = u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, []);
                        e.value.push(u.create(u.Class.UNIVERSAL, u.Type.OID, !1, c));
                        e.value.push(u.create(u.Class.UNIVERSAL, u.Type.NULL, !1, ''));
                        a = u.create(u.Class.UNIVERSAL, u.Type.OCTETSTRING, !1, a.digest().getBytes());
                        b.value.push(e);
                        b.value.push(a);
                        return u.toDer(b).getBytes();
                    },
                    r = function (b, c, e) {
                        if (e) return b.modPow(c.e, c.n);
                        if (!c.p || !c.q) return b.modPow(c.d, c.n);
                        c.dP || (c.dP = c.d.mod(c.p.subtract(k.ONE)));
                        c.dQ || (c.dQ = c.d.mod(c.q.subtract(k.ONE)));
                        c.qInv || (c.qInv = c.q.modInverse(c.p));
                        do e = new k(a.util.bytesToHex(a.random.getBytes(c.n.bitLength() / 8)), 16);
                        while (0 <= e.compareTo(c.n) || !e.gcd(c.n).equals(k.ONE));
                        b = b.multiply(e.modPow(c.e, c.n)).mod(c.n);
                        var d = b.mod(c.p).modPow(c.dP, c.p);
                        for (b = b.mod(c.q).modPow(c.dQ, c.q); 0 > d.compareTo(b); ) d = d.add(c.p);
                        b = d.subtract(b).multiply(c.qInv).mod(c.p).multiply(c.q).add(b);
                        return (b = b.multiply(e.modInverse(c.n)).mod(c.n));
                    };
                v.rsa.encrypt = function (b, c, e) {
                    var d = e,
                        l = Math.ceil(c.n.bitLength() / 8);
                    !1 !== e && !0 !== e
                        ? ((d = 2 === e), (e = g(b, c, e)))
                        : ((e = a.util.createBuffer()), e.putBytes(b));
                    b = new k(e.toHex(), 16);
                    c = r(b, c, d).toString(16);
                    d = a.util.createBuffer();
                    for (l -= Math.ceil(c.length / 2); 0 < l; ) d.putByte(0), --l;
                    d.putBytes(a.util.hexToBytes(c));
                    return d.getBytes();
                };
                v.rsa.decrypt = function (b, c, e, l) {
                    var n = Math.ceil(c.n.bitLength() / 8);
                    if (b.length !== n)
                        throw (
                            ((c = Error('Encrypted message length is invalid.')),
                            (c.length = b.length),
                            (c.expected = n),
                            c)
                        );
                    b = new k(a.util.createBuffer(b).toHex(), 16);
                    if (0 <= b.compareTo(c.n)) throw Error('Encrypted message is invalid.');
                    b = r(b, c, e).toString(16);
                    var f = a.util.createBuffer();
                    for (n -= Math.ceil(b.length / 2); 0 < n; ) f.putByte(0), --n;
                    f.putBytes(a.util.hexToBytes(b));
                    return !1 !== l ? d(f.getBytes(), c, e) : f.getBytes();
                };
                v.rsa.createKeyPairGenerationState = function (b, c, e) {
                    'string' === typeof b && (b = parseInt(b, 10));
                    b = b || 2048;
                    e = e || {};
                    var d = e.prng || a.random,
                        l = {
                            nextBytes: function (a) {
                                for (var b = d.getBytesSync(a.length), c = 0; c < a.length; ++c) a[c] = b.charCodeAt(c);
                            },
                        };
                    e = e.algorithm || 'PRIMEINC';
                    if ('PRIMEINC' === e)
                        (b = {
                            algorithm: e,
                            state: 0,
                            bits: b,
                            rng: l,
                            eInt: c || 65537,
                            e: new k(null),
                            p: null,
                            q: null,
                            qBits: b >> 1,
                            pBits: b - (b >> 1),
                            pqState: 0,
                            num: null,
                            keys: null,
                        }),
                            b.e.fromInt(b.eInt);
                    else throw Error('Invalid key generation algorithm: ' + e);
                    return b;
                };
                v.rsa.stepKeyPairGenerationState = function (a, b) {
                    'algorithm' in a || (a.algorithm = 'PRIMEINC');
                    var e = new k(null);
                    e.fromInt(30);
                    for (
                        var d = 0,
                            l = function (a, b) {
                                return a | b;
                            },
                            n = +new Date(),
                            r,
                            g = 0;
                        null === a.keys && (0 >= b || g < b);

                    ) {
                        if (0 === a.state) {
                            r = null === a.p ? a.pBits : a.qBits;
                            var h = r - 1;
                            0 === a.pqState
                                ? ((a.num = new k(r, a.rng)),
                                  a.num.testBit(h) || a.num.bitwiseTo(k.ONE.shiftLeft(h), l, a.num),
                                  a.num.dAddOffset(31 - a.num.mod(e).byteValue(), 0),
                                  (d = 0),
                                  ++a.pqState)
                                : 1 === a.pqState
                                ? a.num.bitLength() > r
                                    ? (a.pqState = 0)
                                    : a.num.isProbablePrime(f(a.num.bitLength()))
                                    ? ++a.pqState
                                    : a.num.dAddOffset(c[d++ % 8], 0)
                                : 2 === a.pqState
                                ? (a.pqState = 0 === a.num.subtract(k.ONE).gcd(a.e).compareTo(k.ONE) ? 3 : 0)
                                : 3 === a.pqState &&
                                  ((a.pqState = 0),
                                  null === a.p ? (a.p = a.num) : (a.q = a.num),
                                  null !== a.p && null !== a.q && ++a.state,
                                  (a.num = null));
                        } else
                            1 === a.state
                                ? (0 > a.p.compareTo(a.q) && ((a.num = a.p), (a.p = a.q), (a.q = a.num)), ++a.state)
                                : 2 === a.state
                                ? ((a.p1 = a.p.subtract(k.ONE)),
                                  (a.q1 = a.q.subtract(k.ONE)),
                                  (a.phi = a.p1.multiply(a.q1)),
                                  ++a.state)
                                : 3 === a.state
                                ? 0 === a.phi.gcd(a.e).compareTo(k.ONE)
                                    ? ++a.state
                                    : ((a.p = null), (a.q = null), (a.state = 0))
                                : 4 === a.state
                                ? ((a.n = a.p.multiply(a.q)),
                                  a.n.bitLength() === a.bits ? ++a.state : ((a.q = null), (a.state = 0)))
                                : 5 === a.state &&
                                  ((r = a.e.modInverse(a.phi)),
                                  (a.keys = {
                                      privateKey: v.rsa.setPrivateKey(
                                          a.n,
                                          a.e,
                                          r,
                                          a.p,
                                          a.q,
                                          r.mod(a.p1),
                                          r.mod(a.q1),
                                          a.q.modInverse(a.p),
                                      ),
                                      publicKey: v.rsa.setPublicKey(a.n, a.e),
                                  }));
                        r = +new Date();
                        g += r - n;
                        n = r;
                    }
                    return null !== a.keys;
                };
                v.rsa.generateKeyPair = function (c, d, l, f) {
                    1 === arguments.length
                        ? 'object' === typeof c
                            ? ((l = c), (c = void 0))
                            : 'function' === typeof c && ((f = c), (c = void 0))
                        : 2 === arguments.length
                        ? 'number' === typeof c
                            ? 'function' === typeof d
                                ? ((f = d), (d = void 0))
                                : 'number' !== typeof d && ((l = d), (d = void 0))
                            : ((l = c), (f = d), (d = c = void 0))
                        : 3 === arguments.length &&
                          ('number' === typeof d
                              ? 'function' === typeof l && ((f = l), (l = void 0))
                              : ((f = l), (l = d), (d = void 0)));
                    l = l || {};
                    void 0 === c && (c = l.bits || 2048);
                    void 0 === d && (d = l.e || 65537);
                    if (!a.disableNativeCode && f && 256 <= c && 16384 >= c && (65537 === d || 3 === d)) {
                        if (b('generateKey') && b('exportKey'))
                            return window.crypto.subtle
                                .generateKey(
                                    {
                                        name: 'RSASSA-PKCS1-v1_5',
                                        modulusLength: c,
                                        publicExponent: w(d),
                                        hash: { name: 'SHA-256' },
                                    },
                                    !0,
                                    ['sign', 'verify'],
                                )
                                .then(function (a) {
                                    return window.crypto.subtle.exportKey('pkcs8', a.privateKey);
                                })
                                ['catch'](function (a) {
                                    f(a);
                                })
                                .then(function (b) {
                                    b &&
                                        ((b = v.privateKeyFromAsn1(u.fromDer(a.util.createBuffer(b)))),
                                        f(null, { privateKey: b, publicKey: v.setRsaPublicKey(b.n, b.e) }));
                                });
                        if (e('generateKey') && e('exportKey')) {
                            var n = window.msCrypto.subtle.generateKey(
                                {
                                    name: 'RSASSA-PKCS1-v1_5',
                                    modulusLength: c,
                                    publicExponent: w(d),
                                    hash: { name: 'SHA-256' },
                                },
                                !0,
                                ['sign', 'verify'],
                            );
                            n.oncomplete = function (b) {
                                b = window.msCrypto.subtle.exportKey('pkcs8', b.target.result.privateKey);
                                b.oncomplete = function (b) {
                                    b = v.privateKeyFromAsn1(u.fromDer(a.util.createBuffer(b.target.result)));
                                    f(null, { privateKey: b, publicKey: v.setRsaPublicKey(b.n, b.e) });
                                };
                                b.onerror = function (a) {
                                    f(a);
                                };
                            };
                            n.onerror = function (a) {
                                f(a);
                            };
                            return;
                        }
                    }
                    n = v.rsa.createKeyPairGenerationState(c, d, l);
                    if (!f) return v.rsa.stepKeyPairGenerationState(n, 0), n.keys;
                    p(n, l, f);
                };
                v.setRsaPublicKey = v.rsa.setPublicKey = function (b, c) {
                    var e = {
                        n: b,
                        e: c,
                        encrypt: function (b, c, d) {
                            'string' === typeof c ? (c = c.toUpperCase()) : void 0 === c && (c = 'RSAES-PKCS1-V1_5');
                            if ('RSAES-PKCS1-V1_5' === c)
                                c = {
                                    encode: function (a, b, c) {
                                        return g(a, b, 2).getBytes();
                                    },
                                };
                            else if ('RSA-OAEP' === c || 'RSAES-OAEP' === c)
                                c = {
                                    encode: function (b, c) {
                                        return a.pkcs1.encode_rsa_oaep(c, b, d);
                                    },
                                };
                            else if (-1 !== ['RAW', 'NONE', 'NULL', null].indexOf(c))
                                c = {
                                    encode: function (a) {
                                        return a;
                                    },
                                };
                            else if ('string' === typeof c) throw Error('Unsupported encryption scheme: "' + c + '".');
                            b = c.encode(b, e, !0);
                            return v.rsa.encrypt(b, e, !0);
                        },
                        verify: function (a, b, c) {
                            'string' === typeof c ? (c = c.toUpperCase()) : void 0 === c && (c = 'RSASSA-PKCS1-V1_5');
                            if ('RSASSA-PKCS1-V1_5' === c)
                                c = {
                                    verify: function (a, b) {
                                        b = d(b, e, !0);
                                        var c = u.fromDer(b);
                                        return a === c.value[1].value;
                                    },
                                };
                            else if ('NONE' === c || 'NULL' === c || null === c)
                                c = {
                                    verify: function (a, b) {
                                        b = d(b, e, !0);
                                        return a === b;
                                    },
                                };
                            b = v.rsa.decrypt(b, e, !0, !1);
                            return c.verify(a, b, e.n.bitLength());
                        },
                    };
                    return e;
                };
                v.setRsaPrivateKey = v.rsa.setPrivateKey = function (b, c, e, f, r, k, g, h) {
                    var n = {
                        n: b,
                        e: c,
                        d: e,
                        p: f,
                        q: r,
                        dP: k,
                        dQ: g,
                        qInv: h,
                        decrypt: function (b, c, e) {
                            'string' === typeof c ? (c = c.toUpperCase()) : void 0 === c && (c = 'RSAES-PKCS1-V1_5');
                            b = v.rsa.decrypt(b, n, !1, !1);
                            if ('RSAES-PKCS1-V1_5' === c) c = { decode: d };
                            else if ('RSA-OAEP' === c || 'RSAES-OAEP' === c)
                                c = {
                                    decode: function (b, c) {
                                        return a.pkcs1.decode_rsa_oaep(c, b, e);
                                    },
                                };
                            else if (-1 !== ['RAW', 'NONE', 'NULL', null].indexOf(c))
                                c = {
                                    decode: function (a) {
                                        return a;
                                    },
                                };
                            else throw Error('Unsupported encryption scheme: "' + c + '".');
                            return c.decode(b, n, !1);
                        },
                        sign: function (a, b) {
                            var c = !1;
                            'string' === typeof b && (b = b.toUpperCase());
                            if (void 0 === b || 'RSASSA-PKCS1-V1_5' === b) (b = { encode: l }), (c = 1);
                            else if ('NONE' === b || 'NULL' === b || null === b)
                                (b = {
                                    encode: function () {
                                        return a;
                                    },
                                }),
                                    (c = 1);
                            var e = b.encode(a, n.n.bitLength());
                            return v.rsa.encrypt(e, n, c);
                        },
                    };
                    return n;
                };
                v.wrapRsaPrivateKey = function (a) {
                    return u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, u.integerToDer(0).getBytes()),
                        u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [
                            u.create(u.Class.UNIVERSAL, u.Type.OID, !1, u.oidToDer(v.oids.rsaEncryption).getBytes()),
                            u.create(u.Class.UNIVERSAL, u.Type.NULL, !1, ''),
                        ]),
                        u.create(u.Class.UNIVERSAL, u.Type.OCTETSTRING, !1, u.toDer(a).getBytes()),
                    ]);
                };
                v.privateKeyFromAsn1 = function (b) {
                    var c = {},
                        e = [];
                    u.validate(b, q, c, e) && (b = u.fromDer(a.util.createBuffer(c.privateKey)));
                    c = {};
                    e = [];
                    if (!u.validate(b, x, c, e))
                        throw (
                            ((c = Error('Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.')),
                            (c.errors = e),
                            c)
                        );
                    e = a.util.createBuffer(c.privateKeyModulus).toHex();
                    b = a.util.createBuffer(c.privateKeyPublicExponent).toHex();
                    var d = a.util.createBuffer(c.privateKeyPrivateExponent).toHex();
                    var l = a.util.createBuffer(c.privateKeyPrime1).toHex();
                    var f = a.util.createBuffer(c.privateKeyPrime2).toHex();
                    var n = a.util.createBuffer(c.privateKeyExponent1).toHex();
                    var r = a.util.createBuffer(c.privateKeyExponent2).toHex();
                    c = a.util.createBuffer(c.privateKeyCoefficient).toHex();
                    return v.setRsaPrivateKey(
                        new k(e, 16),
                        new k(b, 16),
                        new k(d, 16),
                        new k(l, 16),
                        new k(f, 16),
                        new k(n, 16),
                        new k(r, 16),
                        new k(c, 16),
                    );
                };
                v.privateKeyToAsn1 = v.privateKeyToRSAPrivateKey = function (a) {
                    return u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, u.integerToDer(0).getBytes()),
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.n)),
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.e)),
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.d)),
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.p)),
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.q)),
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.dP)),
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.dQ)),
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.qInv)),
                    ]);
                };
                v.publicKeyFromAsn1 = function (b) {
                    var c = {},
                        e = [];
                    if (u.validate(b, A, c, e)) {
                        e = u.derToOid(c.publicKeyOid);
                        if (e !== v.oids.rsaEncryption)
                            throw ((c = Error('Cannot read public key. Unknown OID.')), (c.oid = e), c);
                        b = c.rsaPublicKey;
                    }
                    e = [];
                    if (!u.validate(b, D, c, e))
                        throw (
                            ((c = Error('Cannot read public key. ASN.1 object does not contain an RSAPublicKey.')),
                            (c.errors = e),
                            c)
                        );
                    e = a.util.createBuffer(c.publicKeyModulus).toHex();
                    c = a.util.createBuffer(c.publicKeyExponent).toHex();
                    return v.setRsaPublicKey(new k(e, 16), new k(c, 16));
                };
                v.publicKeyToAsn1 = v.publicKeyToSubjectPublicKeyInfo = function (a) {
                    return u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [
                        u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [
                            u.create(u.Class.UNIVERSAL, u.Type.OID, !1, u.oidToDer(v.oids.rsaEncryption).getBytes()),
                            u.create(u.Class.UNIVERSAL, u.Type.NULL, !1, ''),
                        ]),
                        u.create(u.Class.UNIVERSAL, u.Type.BITSTRING, !1, [v.publicKeyToRSAPublicKey(a)]),
                    ]);
                };
                v.publicKeyToRSAPublicKey = function (a) {
                    return u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.n)),
                        u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, h(a.e)),
                    ]);
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.rsa) return d.rsa;
                        d.defined.rsa = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.rsa;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/rsa', 'require module ./asn1 ./jsbn ./oids ./pkcs1 ./prime ./random ./util'.split(' '), function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(a, b) {
                    return a.start().update(b).digest().getBytes();
                }
                function d(a) {
                    if (a) {
                        var c = b.oids[f.derToOid(a)];
                        if (!c)
                            throw (
                                ((c = Error('Unsupported PRF OID.')),
                                (c.oid = a),
                                (c.supported = [
                                    'hmacWithSHA1',
                                    'hmacWithSHA224',
                                    'hmacWithSHA256',
                                    'hmacWithSHA384',
                                    'hmacWithSHA512',
                                ]),
                                c)
                            );
                    } else c = 'hmacWithSHA1';
                    return p(c);
                }
                function p(b) {
                    var c = a.md;
                    switch (b) {
                        case 'hmacWithSHA224':
                            c = a.md.sha512;
                        case 'hmacWithSHA1':
                        case 'hmacWithSHA256':
                        case 'hmacWithSHA384':
                        case 'hmacWithSHA512':
                            b = b.substr(8).toLowerCase();
                            break;
                        default:
                            throw (
                                ((c = Error('Unsupported PRF algorithm.')),
                                (c.algorithm = b),
                                (c.supported = [
                                    'hmacWithSHA1',
                                    'hmacWithSHA224',
                                    'hmacWithSHA256',
                                    'hmacWithSHA384',
                                    'hmacWithSHA512',
                                ]),
                                c)
                            );
                    }
                    return c[b].create();
                }
                if ('undefined' === typeof h) var h = a.jsbn.BigInteger;
                var f = a.asn1,
                    b = (a.pki = a.pki || {});
                b.pbe = a.pbe = a.pbe || {};
                var e = b.oids,
                    w = {
                        name: 'EncryptedPrivateKeyInfo',
                        tagClass: f.Class.UNIVERSAL,
                        type: f.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'EncryptedPrivateKeyInfo.encryptionAlgorithm',
                                tagClass: f.Class.UNIVERSAL,
                                type: f.Type.SEQUENCE,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'AlgorithmIdentifier.algorithm',
                                        tagClass: f.Class.UNIVERSAL,
                                        type: f.Type.OID,
                                        constructed: !1,
                                        capture: 'encryptionOid',
                                    },
                                    {
                                        name: 'AlgorithmIdentifier.parameters',
                                        tagClass: f.Class.UNIVERSAL,
                                        type: f.Type.SEQUENCE,
                                        constructed: !0,
                                        captureAsn1: 'encryptionParams',
                                    },
                                ],
                            },
                            {
                                name: 'EncryptedPrivateKeyInfo.encryptedData',
                                tagClass: f.Class.UNIVERSAL,
                                type: f.Type.OCTETSTRING,
                                constructed: !1,
                                capture: 'encryptedData',
                            },
                        ],
                    },
                    k = {
                        name: 'PBES2Algorithms',
                        tagClass: f.Class.UNIVERSAL,
                        type: f.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'PBES2Algorithms.keyDerivationFunc',
                                tagClass: f.Class.UNIVERSAL,
                                type: f.Type.SEQUENCE,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'PBES2Algorithms.keyDerivationFunc.oid',
                                        tagClass: f.Class.UNIVERSAL,
                                        type: f.Type.OID,
                                        constructed: !1,
                                        capture: 'kdfOid',
                                    },
                                    {
                                        name: 'PBES2Algorithms.params',
                                        tagClass: f.Class.UNIVERSAL,
                                        type: f.Type.SEQUENCE,
                                        constructed: !0,
                                        value: [
                                            {
                                                name: 'PBES2Algorithms.params.salt',
                                                tagClass: f.Class.UNIVERSAL,
                                                type: f.Type.OCTETSTRING,
                                                constructed: !1,
                                                capture: 'kdfSalt',
                                            },
                                            {
                                                name: 'PBES2Algorithms.params.iterationCount',
                                                tagClass: f.Class.UNIVERSAL,
                                                type: f.Type.INTEGER,
                                                constructed: !1,
                                                capture: 'kdfIterationCount',
                                            },
                                            {
                                                name: 'PBES2Algorithms.params.keyLength',
                                                tagClass: f.Class.UNIVERSAL,
                                                type: f.Type.INTEGER,
                                                constructed: !1,
                                                optional: !0,
                                                capture: 'keyLength',
                                            },
                                            {
                                                name: 'PBES2Algorithms.params.prf',
                                                tagClass: f.Class.UNIVERSAL,
                                                type: f.Type.SEQUENCE,
                                                constructed: !0,
                                                optional: !0,
                                                value: [
                                                    {
                                                        name: 'PBES2Algorithms.params.prf.algorithm',
                                                        tagClass: f.Class.UNIVERSAL,
                                                        type: f.Type.OID,
                                                        constructed: !1,
                                                        capture: 'prfOid',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: 'PBES2Algorithms.encryptionScheme',
                                tagClass: f.Class.UNIVERSAL,
                                type: f.Type.SEQUENCE,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'PBES2Algorithms.encryptionScheme.oid',
                                        tagClass: f.Class.UNIVERSAL,
                                        type: f.Type.OID,
                                        constructed: !1,
                                        capture: 'encOid',
                                    },
                                    {
                                        name: 'PBES2Algorithms.encryptionScheme.iv',
                                        tagClass: f.Class.UNIVERSAL,
                                        type: f.Type.OCTETSTRING,
                                        constructed: !1,
                                        capture: 'encIv',
                                    },
                                ],
                            },
                        ],
                    },
                    u = {
                        name: 'pkcs-12PbeParams',
                        tagClass: f.Class.UNIVERSAL,
                        type: f.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'pkcs-12PbeParams.salt',
                                tagClass: f.Class.UNIVERSAL,
                                type: f.Type.OCTETSTRING,
                                constructed: !1,
                                capture: 'salt',
                            },
                            {
                                name: 'pkcs-12PbeParams.iterations',
                                tagClass: f.Class.UNIVERSAL,
                                type: f.Type.INTEGER,
                                constructed: !1,
                                capture: 'iterations',
                            },
                        ],
                    };
                b.encryptPrivateKeyInfo = function (d, c, k) {
                    k = k || {};
                    k.saltSize = k.saltSize || 8;
                    k.count = k.count || 2048;
                    k.algorithm = k.algorithm || 'aes128';
                    k.prfAlgorithm = k.prfAlgorithm || 'sha1';
                    var g = a.random.getBytesSync(k.saltSize),
                        h = k.count,
                        A = f.integerToDer(h),
                        l;
                    if (0 === k.algorithm.indexOf('aes') || 'des' === k.algorithm) {
                        switch (k.algorithm) {
                            case 'aes128':
                                var r = (l = 16);
                                var n = e['aes128-CBC'];
                                var q = a.aes.createEncryptionCipher;
                                break;
                            case 'aes192':
                                l = 24;
                                r = 16;
                                n = e['aes192-CBC'];
                                q = a.aes.createEncryptionCipher;
                                break;
                            case 'aes256':
                                l = 32;
                                r = 16;
                                n = e['aes256-CBC'];
                                q = a.aes.createEncryptionCipher;
                                break;
                            case 'des':
                                r = l = 8;
                                n = e.desCBC;
                                q = a.des.createEncryptionCipher;
                                break;
                            default:
                                throw (
                                    ((g = Error('Cannot encrypt private key. Unknown encryption algorithm.')),
                                    (g.algorithm = k.algorithm),
                                    g)
                                );
                        }
                        k = 'hmacWith' + k.prfAlgorithm.toUpperCase();
                        var m = p(k);
                        m = a.pkcs5.pbkdf2(c, g, h, l, m);
                        c = a.random.getBytesSync(r);
                        h = q(m);
                        h.start(c);
                        h.update(f.toDer(d));
                        h.finish();
                        d = h.output.getBytes();
                        g = f.create(f.Class.UNIVERSAL, f.Type.SEQUENCE, !0, [
                            f.create(f.Class.UNIVERSAL, f.Type.OCTETSTRING, !1, g),
                            f.create(f.Class.UNIVERSAL, f.Type.INTEGER, !1, A.getBytes()),
                        ]);
                        'hmacWithSHA1' !== k &&
                            g.value.push(
                                f.create(f.Class.UNIVERSAL, f.Type.INTEGER, !1, a.util.hexToBytes(l.toString(16))),
                                f.create(f.Class.UNIVERSAL, f.Type.SEQUENCE, !0, [
                                    f.create(f.Class.UNIVERSAL, f.Type.OID, !1, f.oidToDer(b.oids[k]).getBytes()),
                                    f.create(f.Class.UNIVERSAL, f.Type.NULL, !1, ''),
                                ]),
                            );
                        g = f.create(f.Class.UNIVERSAL, f.Type.SEQUENCE, !0, [
                            f.create(f.Class.UNIVERSAL, f.Type.OID, !1, f.oidToDer(e.pkcs5PBES2).getBytes()),
                            f.create(f.Class.UNIVERSAL, f.Type.SEQUENCE, !0, [
                                f.create(f.Class.UNIVERSAL, f.Type.SEQUENCE, !0, [
                                    f.create(f.Class.UNIVERSAL, f.Type.OID, !1, f.oidToDer(e.pkcs5PBKDF2).getBytes()),
                                    g,
                                ]),
                                f.create(f.Class.UNIVERSAL, f.Type.SEQUENCE, !0, [
                                    f.create(f.Class.UNIVERSAL, f.Type.OID, !1, f.oidToDer(n).getBytes()),
                                    f.create(f.Class.UNIVERSAL, f.Type.OCTETSTRING, !1, c),
                                ]),
                            ]),
                        ]);
                    } else if ('3des' === k.algorithm)
                        (l = 24),
                            (n = new a.util.ByteBuffer(g)),
                            (m = b.pbe.generatePkcs12Key(c, n, 1, h, l)),
                            (c = b.pbe.generatePkcs12Key(c, n, 2, h, l)),
                            (h = a.des.createEncryptionCipher(m)),
                            h.start(c),
                            h.update(f.toDer(d)),
                            h.finish(),
                            (d = h.output.getBytes()),
                            (g = f.create(f.Class.UNIVERSAL, f.Type.SEQUENCE, !0, [
                                f.create(
                                    f.Class.UNIVERSAL,
                                    f.Type.OID,
                                    !1,
                                    f.oidToDer(e['pbeWithSHAAnd3-KeyTripleDES-CBC']).getBytes(),
                                ),
                                f.create(f.Class.UNIVERSAL, f.Type.SEQUENCE, !0, [
                                    f.create(f.Class.UNIVERSAL, f.Type.OCTETSTRING, !1, g),
                                    f.create(f.Class.UNIVERSAL, f.Type.INTEGER, !1, A.getBytes()),
                                ]),
                            ]));
                    else
                        throw (
                            ((g = Error('Cannot encrypt private key. Unknown encryption algorithm.')),
                            (g.algorithm = k.algorithm),
                            g)
                        );
                    return f.create(f.Class.UNIVERSAL, f.Type.SEQUENCE, !0, [
                        g,
                        f.create(f.Class.UNIVERSAL, f.Type.OCTETSTRING, !1, d),
                    ]);
                };
                b.decryptPrivateKeyInfo = function (e, c) {
                    var d = null,
                        k = {},
                        g = [];
                    if (!f.validate(e, w, k, g))
                        throw (
                            ((d = Error(
                                'Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.',
                            )),
                            (d.errors = g),
                            d)
                        );
                    g = f.derToOid(k.encryptionOid);
                    g = b.pbe.getCipher(g, k.encryptionParams, c);
                    k = a.util.createBuffer(k.encryptedData);
                    g.update(k);
                    g.finish() && (d = f.fromDer(g.output));
                    return d;
                };
                b.encryptedPrivateKeyToPem = function (b, c) {
                    var e = { type: 'ENCRYPTED PRIVATE KEY', body: f.toDer(b).getBytes() };
                    return a.pem.encode(e, { maxline: c });
                };
                b.encryptedPrivateKeyFromPem = function (b) {
                    b = a.pem.decode(b)[0];
                    if ('ENCRYPTED PRIVATE KEY' !== b.type) {
                        var c = Error(
                            'Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".',
                        );
                        c.headerType = b.type;
                        throw c;
                    }
                    if (b.procType && 'ENCRYPTED' === b.procType.type)
                        throw Error('Could not convert encrypted private key from PEM; PEM is encrypted.');
                    return f.fromDer(b.body);
                };
                b.encryptRsaPrivateKey = function (e, c, d) {
                    d = d || {};
                    if (!d.legacy)
                        return (
                            (e = b.wrapRsaPrivateKey(b.privateKeyToAsn1(e))),
                            (e = b.encryptPrivateKeyInfo(e, c, d)),
                            b.encryptedPrivateKeyToPem(e)
                        );
                    switch (d.algorithm) {
                        case 'aes128':
                            d = 'AES-128-CBC';
                            var k = 16;
                            var g = a.random.getBytesSync(16);
                            var h = a.aes.createEncryptionCipher;
                            break;
                        case 'aes192':
                            d = 'AES-192-CBC';
                            k = 24;
                            g = a.random.getBytesSync(16);
                            h = a.aes.createEncryptionCipher;
                            break;
                        case 'aes256':
                            d = 'AES-256-CBC';
                            k = 32;
                            g = a.random.getBytesSync(16);
                            h = a.aes.createEncryptionCipher;
                            break;
                        case '3des':
                            d = 'DES-EDE3-CBC';
                            k = 24;
                            g = a.random.getBytesSync(8);
                            h = a.des.createEncryptionCipher;
                            break;
                        case 'des':
                            d = 'DES-CBC';
                            k = 8;
                            g = a.random.getBytesSync(8);
                            h = a.des.createEncryptionCipher;
                            break;
                        default:
                            throw (
                                ((e = Error(
                                    'Could not encrypt RSA private key; unsupported encryption algorithm "' +
                                        d.algorithm +
                                        '".',
                                )),
                                (e.algorithm = d.algorithm),
                                e)
                            );
                    }
                    c = a.pbe.opensslDeriveBytes(c, g.substr(0, 8), k);
                    c = h(c);
                    c.start(g);
                    c.update(f.toDer(b.privateKeyToAsn1(e)));
                    c.finish();
                    e = {
                        type: 'RSA PRIVATE KEY',
                        procType: { version: '4', type: 'ENCRYPTED' },
                        dekInfo: { algorithm: d, parameters: a.util.bytesToHex(g).toUpperCase() },
                        body: c.output.getBytes(),
                    };
                    return a.pem.encode(e);
                };
                b.decryptRsaPrivateKey = function (e, c) {
                    var d = null,
                        k = a.pem.decode(e)[0];
                    if ('ENCRYPTED PRIVATE KEY' !== k.type && 'PRIVATE KEY' !== k.type && 'RSA PRIVATE KEY' !== k.type)
                        throw (
                            ((d = Error(
                                'Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".',
                            )),
                            (d.headerType = d),
                            d)
                        );
                    if (k.procType && 'ENCRYPTED' === k.procType.type) {
                        switch (k.dekInfo.algorithm) {
                            case 'DES-CBC':
                                var g = 8;
                                var h = a.des.createDecryptionCipher;
                                break;
                            case 'DES-EDE3-CBC':
                                g = 24;
                                h = a.des.createDecryptionCipher;
                                break;
                            case 'AES-128-CBC':
                                g = 16;
                                h = a.aes.createDecryptionCipher;
                                break;
                            case 'AES-192-CBC':
                                g = 24;
                                h = a.aes.createDecryptionCipher;
                                break;
                            case 'AES-256-CBC':
                                g = 32;
                                h = a.aes.createDecryptionCipher;
                                break;
                            case 'RC2-40-CBC':
                                g = 5;
                                h = function (b) {
                                    return a.rc2.createDecryptionCipher(b, 40);
                                };
                                break;
                            case 'RC2-64-CBC':
                                g = 8;
                                h = function (b) {
                                    return a.rc2.createDecryptionCipher(b, 64);
                                };
                                break;
                            case 'RC2-128-CBC':
                                g = 16;
                                h = function (b) {
                                    return a.rc2.createDecryptionCipher(b, 128);
                                };
                                break;
                            default:
                                throw (
                                    ((d = Error(
                                        'Could not decrypt private key; unsupported encryption algorithm "' +
                                            k.dekInfo.algorithm +
                                            '".',
                                    )),
                                    (d.algorithm = k.dekInfo.algorithm),
                                    d)
                                );
                        }
                        var l = a.util.hexToBytes(k.dekInfo.parameters);
                        g = a.pbe.opensslDeriveBytes(c, l.substr(0, 8), g);
                        h = h(g);
                        h.start(l);
                        h.update(a.util.createBuffer(k.body));
                        if (h.finish()) d = h.output.getBytes();
                        else return d;
                    } else d = k.body;
                    d = 'ENCRYPTED PRIVATE KEY' === k.type ? b.decryptPrivateKeyInfo(f.fromDer(d), c) : f.fromDer(d);
                    null !== d && (d = b.privateKeyFromAsn1(d));
                    return d;
                };
                b.pbe.generatePkcs12Key = function (b, c, e, d, f, k) {
                    var l, r;
                    if ('undefined' === typeof k || null === k) k = a.md.sha1.create();
                    var n = k.digestLength,
                        g = k.blockLength,
                        m = new a.util.ByteBuffer(),
                        h = new a.util.ByteBuffer();
                    if (null !== b && void 0 !== b) {
                        for (r = 0; r < b.length; r++) h.putInt16(b.charCodeAt(r));
                        h.putInt16(0);
                    }
                    b = h.length();
                    var A = c.length(),
                        x = new a.util.ByteBuffer();
                    x.fillWithByte(e, g);
                    var q = g * Math.ceil(A / g);
                    e = new a.util.ByteBuffer();
                    for (r = 0; r < q; r++) e.putByte(c.at(r % A));
                    q = g * Math.ceil(b / g);
                    c = new a.util.ByteBuffer();
                    for (r = 0; r < q; r++) c.putByte(h.at(r % b));
                    h = e;
                    h.putBuffer(c);
                    c = Math.ceil(f / n);
                    for (e = 1; e <= c; e++) {
                        q = new a.util.ByteBuffer();
                        q.putBytes(x.bytes());
                        q.putBytes(h.bytes());
                        for (r = 0; r < d; r++) k.start(), k.update(q.getBytes()), (q = k.digest());
                        var v = new a.util.ByteBuffer();
                        for (r = 0; r < g; r++) v.putByte(q.at(r % n));
                        var u = Math.ceil(A / g) + Math.ceil(b / g),
                            w = new a.util.ByteBuffer();
                        for (l = 0; l < u; l++) {
                            var D = new a.util.ByteBuffer(h.getBytes(g)),
                                p = 511;
                            for (r = v.length() - 1; 0 <= r; r--)
                                (p >>= 8), (p += v.at(r) + D.at(r)), D.setAt(r, p & 255);
                            w.putBuffer(D);
                        }
                        h = w;
                        m.putBuffer(q);
                    }
                    m.truncate(m.length() - f);
                    return m;
                };
                b.pbe.getCipher = function (a, c, e) {
                    switch (a) {
                        case b.oids.pkcs5PBES2:
                            return b.pbe.getCipherForPBES2(a, c, e);
                        case b.oids['pbeWithSHAAnd3-KeyTripleDES-CBC']:
                        case b.oids['pbewithSHAAnd40BitRC2-CBC']:
                            return b.pbe.getCipherForPKCS12PBE(a, c, e);
                        default:
                            throw (
                                ((c = Error('Cannot read encrypted PBE data block. Unsupported OID.')),
                                (c.oid = a),
                                (c.supportedOids = [
                                    'pkcs5PBES2',
                                    'pbeWithSHAAnd3-KeyTripleDES-CBC',
                                    'pbewithSHAAnd40BitRC2-CBC',
                                ]),
                                c)
                            );
                    }
                };
                b.pbe.getCipherForPBES2 = function (e, c, g) {
                    var h = {};
                    e = [];
                    if (!f.validate(c, k, h, e)) {
                        var q = Error(
                            'Cannot read pdw-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.',
                        );
                        q.errors = e;
                        throw q;
                    }
                    e = f.derToOid(h.kdfOid);
                    if (e !== b.oids.pkcs5PBKDF2)
                        throw (
                            ((q = Error('Cannot read encrypted private key. Unsupported key derivation function OID.')),
                            (q.oid = e),
                            (q.supportedOids = ['pkcs5PBKDF2']),
                            q)
                        );
                    e = f.derToOid(h.encOid);
                    if (
                        e !== b.oids['aes128-CBC'] &&
                        e !== b.oids['aes192-CBC'] &&
                        e !== b.oids['aes256-CBC'] &&
                        e !== b.oids['des-EDE3-CBC'] &&
                        e !== b.oids.desCBC
                    )
                        throw (
                            ((q = Error('Cannot read encrypted private key. Unsupported encryption scheme OID.')),
                            (q.oid = e),
                            (q.supportedOids = ['aes128-CBC', 'aes192-CBC', 'aes256-CBC', 'des-EDE3-CBC', 'desCBC']),
                            q)
                        );
                    c = h.kdfSalt;
                    var A = a.util.createBuffer(h.kdfIterationCount);
                    A = A.getInt(A.length() << 3);
                    switch (b.oids[e]) {
                        case 'aes128-CBC':
                            var l = 16;
                            q = a.aes.createDecryptionCipher;
                            break;
                        case 'aes192-CBC':
                            l = 24;
                            q = a.aes.createDecryptionCipher;
                            break;
                        case 'aes256-CBC':
                            l = 32;
                            q = a.aes.createDecryptionCipher;
                            break;
                        case 'des-EDE3-CBC':
                            l = 24;
                            q = a.des.createDecryptionCipher;
                            break;
                        case 'desCBC':
                            (l = 8), (q = a.des.createDecryptionCipher);
                    }
                    e = d(h.prfOid);
                    g = a.pkcs5.pbkdf2(g, c, A, l, e);
                    h = h.encIv;
                    q = q(g);
                    q.start(h);
                    return q;
                };
                b.pbe.getCipherForPKCS12PBE = function (e, c, k) {
                    var g = {},
                        h = [];
                    if (!f.validate(c, u, g, h))
                        throw (
                            ((k = Error(
                                'Cannot read pdw-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.',
                            )),
                            (k.errors = h),
                            k)
                        );
                    h = a.util.createBuffer(g.salt);
                    c = a.util.createBuffer(g.iterations);
                    c = c.getInt(c.length() << 3);
                    switch (e) {
                        case b.oids['pbeWithSHAAnd3-KeyTripleDES-CBC']:
                            var A = 24;
                            var l = 8;
                            e = a.des.startDecrypting;
                            break;
                        case b.oids['pbewithSHAAnd40BitRC2-CBC']:
                            A = 5;
                            l = 8;
                            e = function (b, c) {
                                var e = a.rc2.createDecryptionCipher(b, 40);
                                e.start(c, null);
                                return e;
                            };
                            break;
                        default:
                            throw (
                                ((k = Error('Cannot read PKCS #12 PBE data block. Unsupported OID.')), (k.oid = e), k)
                            );
                    }
                    g = d(g.prfOid);
                    A = b.pbe.generatePkcs12Key(k, h, 1, c, A, g);
                    g.start();
                    k = b.pbe.generatePkcs12Key(k, h, 2, c, l, g);
                    return e(A, k);
                };
                b.pbe.opensslDeriveBytes = function (b, c, e, d) {
                    if ('undefined' === typeof d || null === d) d = a.md.md5.create();
                    null === c && (c = '');
                    for (var f = [g(d, b + c)], k = 16, l = 1; k < e; ++l, k += 16) f.push(g(d, f[l - 1] + b + c));
                    return f.join('').substr(0, e);
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.pbe) return d.pbe;
                        d.defined.pbe = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pbe;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t(
                'js/pbe',
                'require module ./aes ./asn1 ./des ./md ./oids ./pem ./pbkdf2 ./random ./rc2 ./rsa ./util'.split(' '),
                function () {
                    C.apply(null, Array.prototype.slice.call(arguments, 0));
                },
            );
        })();
        (function () {
            function p(a) {
                var g = a.asn1,
                    d = (a.pkcs7asn1 = a.pkcs7asn1 || {});
                a.pkcs7 = a.pkcs7 || {};
                a.pkcs7.asn1 = d;
                a = {
                    name: 'ContentInfo',
                    tagClass: g.Class.UNIVERSAL,
                    type: g.Type.SEQUENCE,
                    constructed: !0,
                    value: [
                        {
                            name: 'ContentInfo.ContentType',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.OID,
                            constructed: !1,
                            capture: 'contentType',
                        },
                        {
                            name: 'ContentInfo.content',
                            tagClass: g.Class.CONTEXT_SPECIFIC,
                            type: 0,
                            constructed: !0,
                            optional: !0,
                            captureAsn1: 'content',
                        },
                    ],
                };
                d.contentInfoValidator = a;
                var p = {
                    name: 'EncryptedContentInfo',
                    tagClass: g.Class.UNIVERSAL,
                    type: g.Type.SEQUENCE,
                    constructed: !0,
                    value: [
                        {
                            name: 'EncryptedContentInfo.contentType',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.OID,
                            constructed: !1,
                            capture: 'contentType',
                        },
                        {
                            name: 'EncryptedContentInfo.contentEncryptionAlgorithm',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.SEQUENCE,
                            constructed: !0,
                            value: [
                                {
                                    name: 'EncryptedContentInfo.contentEncryptionAlgorithm.algorithm',
                                    tagClass: g.Class.UNIVERSAL,
                                    type: g.Type.OID,
                                    constructed: !1,
                                    capture: 'encAlgorithm',
                                },
                                {
                                    name: 'EncryptedContentInfo.contentEncryptionAlgorithm.parameter',
                                    tagClass: g.Class.UNIVERSAL,
                                    captureAsn1: 'encParameter',
                                },
                            ],
                        },
                        {
                            name: 'EncryptedContentInfo.encryptedContent',
                            tagClass: g.Class.CONTEXT_SPECIFIC,
                            type: 0,
                            capture: 'encryptedContent',
                            captureAsn1: 'encryptedContentAsn1',
                        },
                    ],
                };
                d.envelopedDataValidator = {
                    name: 'EnvelopedData',
                    tagClass: g.Class.UNIVERSAL,
                    type: g.Type.SEQUENCE,
                    constructed: !0,
                    value: [
                        {
                            name: 'EnvelopedData.Version',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.INTEGER,
                            constructed: !1,
                            capture: 'version',
                        },
                        {
                            name: 'EnvelopedData.RecipientInfos',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.SET,
                            constructed: !0,
                            captureAsn1: 'recipientInfos',
                        },
                    ].concat(p),
                };
                d.encryptedDataValidator = {
                    name: 'EncryptedData',
                    tagClass: g.Class.UNIVERSAL,
                    type: g.Type.SEQUENCE,
                    constructed: !0,
                    value: [
                        {
                            name: 'EncryptedData.Version',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.INTEGER,
                            constructed: !1,
                            capture: 'version',
                        },
                    ].concat(p),
                };
                d.signedDataValidator = {
                    name: 'SignedData',
                    tagClass: g.Class.UNIVERSAL,
                    type: g.Type.SEQUENCE,
                    constructed: !0,
                    value: [
                        {
                            name: 'SignedData.Version',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.INTEGER,
                            constructed: !1,
                            capture: 'version',
                        },
                        {
                            name: 'SignedData.DigestAlgorithms',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.SET,
                            constructed: !0,
                            captureAsn1: 'digestAlgorithms',
                        },
                        a,
                        {
                            name: 'SignedData.Certificates',
                            tagClass: g.Class.CONTEXT_SPECIFIC,
                            type: 0,
                            optional: !0,
                            captureAsn1: 'certificates',
                        },
                        {
                            name: 'SignedData.CertificateRevocationLists',
                            tagClass: g.Class.CONTEXT_SPECIFIC,
                            type: 1,
                            optional: !0,
                            captureAsn1: 'crls',
                        },
                        {
                            name: 'SignedData.SignerInfos',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.SET,
                            capture: 'signerInfos',
                            optional: !0,
                            value: [
                                {
                                    name: 'SignerInfo',
                                    tagClass: g.Class.UNIVERSAL,
                                    type: g.Type.SEQUENCE,
                                    constructed: !0,
                                    value: [
                                        {
                                            name: 'SignerInfo.version',
                                            tagClass: g.Class.UNIVERSAL,
                                            type: g.Type.INTEGER,
                                            constructed: !1,
                                        },
                                        {
                                            name: 'SignerInfo.issuerAndSerialNumber',
                                            tagClass: g.Class.UNIVERSAL,
                                            type: g.Type.SEQUENCE,
                                            constructed: !0,
                                            value: [
                                                {
                                                    name: 'SignerInfo.issuerAndSerialNumber.issuer',
                                                    tagClass: g.Class.UNIVERSAL,
                                                    type: g.Type.SEQUENCE,
                                                    constructed: !0,
                                                    captureAsn1: 'issuer',
                                                },
                                                {
                                                    name: 'SignerInfo.issuerAndSerialNumber.serialNumber',
                                                    tagClass: g.Class.UNIVERSAL,
                                                    type: g.Type.INTEGER,
                                                    constructed: !1,
                                                    capture: 'serial',
                                                },
                                            ],
                                        },
                                        {
                                            name: 'SignerInfo.digestAlgorithm',
                                            tagClass: g.Class.UNIVERSAL,
                                            type: g.Type.SEQUENCE,
                                            constructed: !0,
                                            value: [
                                                {
                                                    name: 'SignerInfo.digestAlgorithm.algorithm',
                                                    tagClass: g.Class.UNIVERSAL,
                                                    type: g.Type.OID,
                                                    constructed: !1,
                                                    capture: 'digestAlgorithm',
                                                },
                                                {
                                                    name: 'SignerInfo.digestAlgorithm.parameter',
                                                    tagClass: g.Class.UNIVERSAL,
                                                    constructed: !1,
                                                    captureAsn1: 'digestParameter',
                                                    optional: !0,
                                                },
                                            ],
                                        },
                                        {
                                            name: 'SignerInfo.authenticatedAttributes',
                                            tagClass: g.Class.CONTEXT_SPECIFIC,
                                            type: 0,
                                            constructed: !0,
                                            optional: !0,
                                            capture: 'authenticatedAttributes',
                                        },
                                        {
                                            name: 'SignerInfo.digestEncryptionAlgorithm',
                                            tagClass: g.Class.UNIVERSAL,
                                            type: g.Type.SEQUENCE,
                                            constructed: !0,
                                            capture: 'signatureAlgorithm',
                                        },
                                        {
                                            name: 'SignerInfo.encryptedDigest',
                                            tagClass: g.Class.UNIVERSAL,
                                            type: g.Type.OCTETSTRING,
                                            constructed: !1,
                                            capture: 'signature',
                                        },
                                        {
                                            name: 'SignerInfo.unauthenticatedAttributes',
                                            tagClass: g.Class.CONTEXT_SPECIFIC,
                                            type: 1,
                                            constructed: !0,
                                            optional: !0,
                                            capture: 'unauthenticatedAttributes',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                };
                d.recipientInfoValidator = {
                    name: 'RecipientInfo',
                    tagClass: g.Class.UNIVERSAL,
                    type: g.Type.SEQUENCE,
                    constructed: !0,
                    value: [
                        {
                            name: 'RecipientInfo.version',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.INTEGER,
                            constructed: !1,
                            capture: 'version',
                        },
                        {
                            name: 'RecipientInfo.issuerAndSerial',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.SEQUENCE,
                            constructed: !0,
                            value: [
                                {
                                    name: 'RecipientInfo.issuerAndSerial.issuer',
                                    tagClass: g.Class.UNIVERSAL,
                                    type: g.Type.SEQUENCE,
                                    constructed: !0,
                                    captureAsn1: 'issuer',
                                },
                                {
                                    name: 'RecipientInfo.issuerAndSerial.serialNumber',
                                    tagClass: g.Class.UNIVERSAL,
                                    type: g.Type.INTEGER,
                                    constructed: !1,
                                    capture: 'serial',
                                },
                            ],
                        },
                        {
                            name: 'RecipientInfo.keyEncryptionAlgorithm',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.SEQUENCE,
                            constructed: !0,
                            value: [
                                {
                                    name: 'RecipientInfo.keyEncryptionAlgorithm.algorithm',
                                    tagClass: g.Class.UNIVERSAL,
                                    type: g.Type.OID,
                                    constructed: !1,
                                    capture: 'encAlgorithm',
                                },
                                {
                                    name: 'RecipientInfo.keyEncryptionAlgorithm.parameter',
                                    tagClass: g.Class.UNIVERSAL,
                                    constructed: !1,
                                    captureAsn1: 'encParameter',
                                },
                            ],
                        },
                        {
                            name: 'RecipientInfo.encryptedKey',
                            tagClass: g.Class.UNIVERSAL,
                            type: g.Type.OCTETSTRING,
                            constructed: !1,
                            capture: 'encKey',
                        },
                    ],
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.pkcs7asn1) return d.pkcs7asn1;
                        d.defined.pkcs7asn1 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pkcs7asn1;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/pkcs7asn1', ['require', 'module', './asn1', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                a.mgf = a.mgf || {};
                (a.mgf.mgf1 = a.mgf1 = a.mgf1 || {}).create = function (g) {
                    return {
                        generate: function (d, p) {
                            for (
                                var h = new a.util.ByteBuffer(), f = Math.ceil(p / g.digestLength), b = 0;
                                b < f;
                                b++
                            ) {
                                var e = new a.util.ByteBuffer();
                                e.putInt32(b);
                                g.start();
                                g.update(d + e.getBytes());
                                h.putBuffer(g.digest());
                            }
                            h.truncate(h.length() - p);
                            return h.getBytes();
                        },
                    };
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.mgf1) return d.mgf1;
                        d.defined.mgf1 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.mgf1;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/mgf1', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                a.mgf = a.mgf || {};
                a.mgf.mgf1 = a.mgf1;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.mgf) return d.mgf;
                        d.defined.mgf = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.mgf;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/mgf', ['require', 'module', './mgf1'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                (a.pss = a.pss || {}).create = function (g) {
                    3 === arguments.length && (g = { md: arguments[0], mgf: arguments[1], saltLength: arguments[2] });
                    var d = g.md,
                        p = g.mgf,
                        h = d.digestLength,
                        f = g.salt || null;
                    'string' === typeof f && (f = a.util.createBuffer(f));
                    if ('saltLength' in g) var b = g.saltLength;
                    else if (null !== f) b = f.length();
                    else throw Error('Salt length not specified or specific salt not given.');
                    if (null !== f && f.length() !== b)
                        throw Error('Given salt length does not match length of given salt.');
                    var e = g.prng || a.random;
                    return {
                        encode: function (g, k) {
                            var u = k - 1,
                                v = Math.ceil(u / 8),
                                c = g.digest().getBytes();
                            if (v < h + b + 2) throw Error('Message is too long to encrypt.');
                            var q = null === f ? e.getBytesSync(b) : f.bytes();
                            var x = new a.util.ByteBuffer();
                            x.fillWithByte(0, 8);
                            x.putBytes(c);
                            x.putBytes(q);
                            d.start();
                            d.update(x.getBytes());
                            c = d.digest().getBytes();
                            x = new a.util.ByteBuffer();
                            x.fillWithByte(0, v - b - h - 2);
                            x.putByte(1);
                            x.putBytes(q);
                            var w = x.getBytes(),
                                A = v - h - 1,
                                l = p.generate(c, A);
                            q = '';
                            for (x = 0; x < A; x++) q += String.fromCharCode(w.charCodeAt(x) ^ l.charCodeAt(x));
                            u = (65280 >> (8 * v - u)) & 255;
                            q = String.fromCharCode(q.charCodeAt(0) & ~u) + q.substr(1);
                            return q + c + String.fromCharCode(188);
                        },
                        verify: function (e, f, g) {
                            var k = g - 1;
                            g = Math.ceil(k / 8);
                            f = f.substr(-g);
                            if (g < h + b + 2) throw Error('Inconsistent parameters to PSS signature verification.');
                            if (188 !== f.charCodeAt(g - 1)) throw Error('Encoded message does not end in 0xBC.');
                            var c = g - h - 1,
                                q = f.substr(0, c);
                            f = f.substr(c, h);
                            var x = (65280 >> (8 * g - k)) & 255;
                            if (0 !== (q.charCodeAt(0) & x)) throw Error('Bits beyond keysize not zero as expected.');
                            var u = p.generate(f, c),
                                A = '';
                            for (k = 0; k < c; k++) A += String.fromCharCode(q.charCodeAt(k) ^ u.charCodeAt(k));
                            A = String.fromCharCode(A.charCodeAt(0) & ~x) + A.substr(1);
                            g = g - h - b - 2;
                            for (k = 0; k < g; k++)
                                if (0 !== A.charCodeAt(k)) throw Error('Leftmost octets not zero as expected');
                            if (1 !== A.charCodeAt(g)) throw Error('Inconsistent PSS signature, 0x01 marker not found');
                            g = A.substr(-b);
                            c = new a.util.ByteBuffer();
                            c.fillWithByte(0, 8);
                            c.putBytes(e);
                            c.putBytes(g);
                            d.start();
                            d.update(c.getBytes());
                            e = d.digest().getBytes();
                            return f === e;
                        },
                    };
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.pss) return d.pss;
                        d.defined.pss = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pss;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/pss', ['require', 'module', './random', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(a, b) {
                    'string' === typeof b && (b = { shortName: b });
                    for (var c = null, e, d = 0; null === c && d < a.attributes.length; ++d)
                        (e = a.attributes[d]),
                            b.type && b.type === e.type
                                ? (c = e)
                                : b.name && b.name === e.name
                                ? (c = e)
                                : b.shortName && b.shortName === e.shortName && (c = e);
                    return c;
                }
                function d(b) {
                    var c = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
                    b = b.attributes;
                    for (var d = 0; d < b.length; ++d) {
                        var f = b[d];
                        var k = f.value,
                            m = e.Type.PRINTABLESTRING;
                        'valueTagClass' in f &&
                            ((m = f.valueTagClass), m === e.Type.UTF8 && (k = a.util.encodeUtf8(k)));
                        f = e.create(e.Class.UNIVERSAL, e.Type.SET, !0, [
                            e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                                e.create(e.Class.UNIVERSAL, e.Type.OID, !1, e.oidToDer(f.type).getBytes()),
                                e.create(e.Class.UNIVERSAL, m, !1, k),
                            ]),
                        ]);
                        c.value.push(f);
                    }
                    return c;
                }
                function p(a) {
                    for (var b, c = 0; c < a.length; ++c) {
                        b = a[c];
                        'undefined' === typeof b.name &&
                            (b.type && b.type in w.oids
                                ? (b.name = w.oids[b.type])
                                : b.shortName && b.shortName in u && (b.name = w.oids[u[b.shortName]]));
                        if ('undefined' === typeof b.type)
                            if (b.name && b.name in w.oids) b.type = w.oids[b.name];
                            else throw ((a = Error('Attribute type not specified.')), (a.attribute = b), a);
                        'undefined' === typeof b.shortName && b.name && b.name in u && (b.shortName = u[b.name]);
                        if (
                            b.type === k.extensionRequest &&
                            ((b.valueConstructed = !0), (b.valueTagClass = e.Type.SEQUENCE), !b.value && b.extensions)
                        ) {
                            b.value = [];
                            for (var d = 0; d < b.extensions.length; ++d)
                                b.value.push(w.certificateExtensionToAsn1(h(b.extensions[d])));
                        }
                        if ('undefined' === typeof b.value)
                            throw ((a = Error('Attribute value not specified.')), (a.attribute = b), a);
                    }
                }
                function h(b, c) {
                    c = c || {};
                    'undefined' === typeof b.name && b.id && b.id in w.oids && (b.name = w.oids[b.id]);
                    if ('undefined' === typeof b.id)
                        if (b.name && b.name in w.oids) b.id = w.oids[b.name];
                        else {
                            var l = Error('Extension ID not specified.');
                            l.extension = b;
                            throw l;
                        }
                    if ('undefined' !== typeof b.value) return b;
                    if ('keyUsage' === b.name) {
                        var f = 0,
                            g = (l = 0);
                        b.digitalSignature && ((l |= 128), (f = 7));
                        b.nonRepudiation && ((l |= 64), (f = 6));
                        b.keyEncipherment && ((l |= 32), (f = 5));
                        b.dataEncipherment && ((l |= 16), (f = 4));
                        b.keyAgreement && ((l |= 8), (f = 3));
                        b.keyCertSign && ((l |= 4), (f = 2));
                        b.cRLSign && ((l |= 2), (f = 1));
                        b.encipherOnly && ((l |= 1), (f = 0));
                        b.decipherOnly && ((g |= 128), (f = 7));
                        f = String.fromCharCode(f);
                        0 !== g
                            ? (f += String.fromCharCode(l) + String.fromCharCode(g))
                            : 0 !== l && (f += String.fromCharCode(l));
                        b.value = e.create(e.Class.UNIVERSAL, e.Type.BITSTRING, !1, f);
                    } else if ('basicConstraints' === b.name)
                        (b.value = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [])),
                            b.cA &&
                                b.value.value.push(
                                    e.create(e.Class.UNIVERSAL, e.Type.BOOLEAN, !1, String.fromCharCode(255)),
                                ),
                            'pathLenConstraint' in b &&
                                b.value.value.push(
                                    e.create(
                                        e.Class.UNIVERSAL,
                                        e.Type.INTEGER,
                                        !1,
                                        e.integerToDer(b.pathLenConstraint).getBytes(),
                                    ),
                                );
                    else if ('extKeyUsage' === b.name)
                        for (f in ((b.value = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [])),
                        (l = b.value.value),
                        b))
                            !0 === b[f] &&
                                (f in k
                                    ? l.push(e.create(e.Class.UNIVERSAL, e.Type.OID, !1, e.oidToDer(k[f]).getBytes()))
                                    : -1 !== f.indexOf('.') &&
                                      l.push(e.create(e.Class.UNIVERSAL, e.Type.OID, !1, e.oidToDer(f).getBytes())));
                    else if ('nsCertType' === b.name)
                        (l = f = 0),
                            b.client && ((l |= 128), (f = 7)),
                            b.server && ((l |= 64), (f = 6)),
                            b.email && ((l |= 32), (f = 5)),
                            b.objsign && ((l |= 16), (f = 4)),
                            b.reserved && ((l |= 8), (f = 3)),
                            b.sslCA && ((l |= 4), (f = 2)),
                            b.emailCA && ((l |= 2), (f = 1)),
                            b.objCA && ((l |= 1), (f = 0)),
                            (f = String.fromCharCode(f)),
                            0 !== l && (f += String.fromCharCode(l)),
                            (b.value = e.create(e.Class.UNIVERSAL, e.Type.BITSTRING, !1, f));
                    else if ('subjectAltName' === b.name || 'issuerAltName' === b.name) {
                        b.value = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
                        for (var m = 0; m < b.altNames.length; ++m) {
                            g = b.altNames[m];
                            f = g.value;
                            if (7 === g.type && g.ip) {
                                if (((f = a.util.bytesFromIP(g.ip)), null === f))
                                    throw (
                                        ((l = Error('Extension "ip" value is not a valid IPv4 or IPv6 address.')),
                                        (l.extension = b),
                                        l)
                                    );
                            } else 8 === g.type && (f = g.oid ? e.oidToDer(e.oidToDer(g.oid)) : e.oidToDer(f));
                            b.value.value.push(e.create(e.Class.CONTEXT_SPECIFIC, g.type, !1, f));
                        }
                    } else if ('subjectKeyIdentifier' === b.name && c.cert)
                        (l = c.cert.generateSubjectKeyIdentifier()),
                            (b.subjectKeyIdentifier = l.toHex()),
                            (b.value = e.create(e.Class.UNIVERSAL, e.Type.OCTETSTRING, !1, l.getBytes()));
                    else if ('authorityKeyIdentifier' === b.name && c.cert)
                        (b.value = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [])),
                            (l = b.value.value),
                            b.keyIdentifier &&
                                ((f =
                                    !0 === b.keyIdentifier
                                        ? c.cert.generateSubjectKeyIdentifier().getBytes()
                                        : b.keyIdentifier),
                                l.push(e.create(e.Class.CONTEXT_SPECIFIC, 0, !1, f))),
                            b.authorityCertIssuer &&
                                ((f = [
                                    e.create(e.Class.CONTEXT_SPECIFIC, 4, !0, [
                                        d(!0 === b.authorityCertIssuer ? c.cert.issuer : b.authorityCertIssuer),
                                    ]),
                                ]),
                                l.push(e.create(e.Class.CONTEXT_SPECIFIC, 1, !0, f))),
                            b.serialNumber &&
                                ((f = a.util.hexToBytes(!0 === b.serialNumber ? c.cert.serialNumber : b.serialNumber)),
                                l.push(e.create(e.Class.CONTEXT_SPECIFIC, 2, !1, f)));
                    else if ('cRLDistributionPoints' === b.name) {
                        b.value = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
                        l = b.value.value;
                        var h = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []),
                            A = e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, []);
                        for (m = 0; m < b.altNames.length; ++m) {
                            g = b.altNames[m];
                            f = g.value;
                            if (7 === g.type && g.ip) {
                                if (((f = a.util.bytesFromIP(g.ip)), null === f))
                                    throw (
                                        ((l = Error('Extension "ip" value is not a valid IPv4 or IPv6 address.')),
                                        (l.extension = b),
                                        l)
                                    );
                            } else 8 === g.type && (f = g.oid ? e.oidToDer(e.oidToDer(g.oid)) : e.oidToDer(f));
                            A.value.push(e.create(e.Class.CONTEXT_SPECIFIC, g.type, !1, f));
                        }
                        h.value.push(e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [A]));
                        l.push(h);
                    }
                    if ('undefined' === typeof b.value)
                        throw ((l = Error('Extension value not specified.')), (l.extension = b), l);
                    return b;
                }
                function f(a, b) {
                    switch (a) {
                        case k['RSASSA-PSS']:
                            var c = [];
                            void 0 !== b.hash.algorithmOid &&
                                c.push(
                                    e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
                                        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                                            e.create(
                                                e.Class.UNIVERSAL,
                                                e.Type.OID,
                                                !1,
                                                e.oidToDer(b.hash.algorithmOid).getBytes(),
                                            ),
                                            e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, ''),
                                        ]),
                                    ]),
                                );
                            void 0 !== b.mgf.algorithmOid &&
                                c.push(
                                    e.create(e.Class.CONTEXT_SPECIFIC, 1, !0, [
                                        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                                            e.create(
                                                e.Class.UNIVERSAL,
                                                e.Type.OID,
                                                !1,
                                                e.oidToDer(b.mgf.algorithmOid).getBytes(),
                                            ),
                                            e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                                                e.create(
                                                    e.Class.UNIVERSAL,
                                                    e.Type.OID,
                                                    !1,
                                                    e.oidToDer(b.mgf.hash.algorithmOid).getBytes(),
                                                ),
                                                e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, ''),
                                            ]),
                                        ]),
                                    ]),
                                );
                            void 0 !== b.saltLength &&
                                c.push(
                                    e.create(e.Class.CONTEXT_SPECIFIC, 2, !0, [
                                        e.create(
                                            e.Class.UNIVERSAL,
                                            e.Type.INTEGER,
                                            !1,
                                            e.integerToDer(b.saltLength).getBytes(),
                                        ),
                                    ]),
                                );
                            return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, c);
                        default:
                            return e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, '');
                    }
                }
                function b(b) {
                    var c = e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, []);
                    if (0 === b.attributes.length) return c;
                    b = b.attributes;
                    for (var d = 0; d < b.length; ++d) {
                        var f = b[d],
                            g = f.value,
                            m = e.Type.UTF8;
                        'valueTagClass' in f && (m = f.valueTagClass);
                        m === e.Type.UTF8 && (g = a.util.encodeUtf8(g));
                        var k = !1;
                        'valueConstructed' in f && (k = f.valueConstructed);
                        f = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                            e.create(e.Class.UNIVERSAL, e.Type.OID, !1, e.oidToDer(f.type).getBytes()),
                            e.create(e.Class.UNIVERSAL, e.Type.SET, !0, [e.create(e.Class.UNIVERSAL, m, k, g)]),
                        ]);
                        c.value.push(f);
                    }
                    return c;
                }
                var e = a.asn1,
                    w = (a.pki = a.pki || {}),
                    k = w.oids,
                    u = {};
                u.CN = k.commonName;
                u.commonName = 'CN';
                u.C = k.countryName;
                u.countryName = 'C';
                u.L = k.localityName;
                u.localityName = 'L';
                u.ST = k.stateOrProvinceName;
                u.stateOrProvinceName = 'ST';
                u.O = k.organizationName;
                u.organizationName = 'O';
                u.OU = k.organizationalUnitName;
                u.organizationalUnitName = 'OU';
                u.E = k.emailAddress;
                u.emailAddress = 'E';
                var v = a.pki.rsa.publicKeyValidator,
                    c = {
                        name: 'Certificate',
                        tagClass: e.Class.UNIVERSAL,
                        type: e.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'Certificate.TBSCertificate',
                                tagClass: e.Class.UNIVERSAL,
                                type: e.Type.SEQUENCE,
                                constructed: !0,
                                captureAsn1: 'tbsCertificate',
                                value: [
                                    {
                                        name: 'Certificate.TBSCertificate.version',
                                        tagClass: e.Class.CONTEXT_SPECIFIC,
                                        type: 0,
                                        constructed: !0,
                                        optional: !0,
                                        value: [
                                            {
                                                name: 'Certificate.TBSCertificate.version.integer',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.INTEGER,
                                                constructed: !1,
                                                capture: 'certVersion',
                                            },
                                        ],
                                    },
                                    {
                                        name: 'Certificate.TBSCertificate.serialNumber',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Type.INTEGER,
                                        constructed: !1,
                                        capture: 'certSerialNumber',
                                    },
                                    {
                                        name: 'Certificate.TBSCertificate.signature',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Type.SEQUENCE,
                                        constructed: !0,
                                        value: [
                                            {
                                                name: 'Certificate.TBSCertificate.signature.algorithm',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.OID,
                                                constructed: !1,
                                                capture: 'certinfoSignatureOid',
                                            },
                                            {
                                                name: 'Certificate.TBSCertificate.signature.parameters',
                                                tagClass: e.Class.UNIVERSAL,
                                                optional: !0,
                                                captureAsn1: 'certinfoSignatureParams',
                                            },
                                        ],
                                    },
                                    {
                                        name: 'Certificate.TBSCertificate.issuer',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Type.SEQUENCE,
                                        constructed: !0,
                                        captureAsn1: 'certIssuer',
                                    },
                                    {
                                        name: 'Certificate.TBSCertificate.validity',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Type.SEQUENCE,
                                        constructed: !0,
                                        value: [
                                            {
                                                name: 'Certificate.TBSCertificate.validity.notBefore (utc)',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.UTCTIME,
                                                constructed: !1,
                                                optional: !0,
                                                capture: 'certValidity1UTCTime',
                                            },
                                            {
                                                name: 'Certificate.TBSCertificate.validity.notBefore (generalized)',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.GENERALIZEDTIME,
                                                constructed: !1,
                                                optional: !0,
                                                capture: 'certValidity2GeneralizedTime',
                                            },
                                            {
                                                name: 'Certificate.TBSCertificate.validity.notAfter (utc)',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.UTCTIME,
                                                constructed: !1,
                                                optional: !0,
                                                capture: 'certValidity3UTCTime',
                                            },
                                            {
                                                name: 'Certificate.TBSCertificate.validity.notAfter (generalized)',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.GENERALIZEDTIME,
                                                constructed: !1,
                                                optional: !0,
                                                capture: 'certValidity4GeneralizedTime',
                                            },
                                        ],
                                    },
                                    {
                                        name: 'Certificate.TBSCertificate.subject',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Type.SEQUENCE,
                                        constructed: !0,
                                        captureAsn1: 'certSubject',
                                    },
                                    v,
                                    {
                                        name: 'Certificate.TBSCertificate.issuerUniqueID',
                                        tagClass: e.Class.CONTEXT_SPECIFIC,
                                        type: 1,
                                        constructed: !0,
                                        optional: !0,
                                        value: [
                                            {
                                                name: 'Certificate.TBSCertificate.issuerUniqueID.id',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.BITSTRING,
                                                constructed: !1,
                                                capture: 'certIssuerUniqueId',
                                            },
                                        ],
                                    },
                                    {
                                        name: 'Certificate.TBSCertificate.subjectUniqueID',
                                        tagClass: e.Class.CONTEXT_SPECIFIC,
                                        type: 2,
                                        constructed: !0,
                                        optional: !0,
                                        value: [
                                            {
                                                name: 'Certificate.TBSCertificate.subjectUniqueID.id',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.BITSTRING,
                                                constructed: !1,
                                                capture: 'certSubjectUniqueId',
                                            },
                                        ],
                                    },
                                    {
                                        name: 'Certificate.TBSCertificate.extensions',
                                        tagClass: e.Class.CONTEXT_SPECIFIC,
                                        type: 3,
                                        constructed: !0,
                                        captureAsn1: 'certExtensions',
                                        optional: !0,
                                    },
                                ],
                            },
                            {
                                name: 'Certificate.signatureAlgorithm',
                                tagClass: e.Class.UNIVERSAL,
                                type: e.Type.SEQUENCE,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'Certificate.signatureAlgorithm.algorithm',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Type.OID,
                                        constructed: !1,
                                        capture: 'certSignatureOid',
                                    },
                                    {
                                        name: 'Certificate.TBSCertificate.signature.parameters',
                                        tagClass: e.Class.UNIVERSAL,
                                        optional: !0,
                                        captureAsn1: 'certSignatureParams',
                                    },
                                ],
                            },
                            {
                                name: 'Certificate.signatureValue',
                                tagClass: e.Class.UNIVERSAL,
                                type: e.Type.BITSTRING,
                                constructed: !1,
                                capture: 'certSignature',
                            },
                        ],
                    },
                    q = {
                        name: 'rsapss',
                        tagClass: e.Class.UNIVERSAL,
                        type: e.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'rsapss.hashAlgorithm',
                                tagClass: e.Class.CONTEXT_SPECIFIC,
                                type: 0,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'rsapss.hashAlgorithm.AlgorithmIdentifier',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Class.SEQUENCE,
                                        constructed: !0,
                                        optional: !0,
                                        value: [
                                            {
                                                name: 'rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.OID,
                                                constructed: !1,
                                                capture: 'hashOid',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: 'rsapss.maskGenAlgorithm',
                                tagClass: e.Class.CONTEXT_SPECIFIC,
                                type: 1,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'rsapss.maskGenAlgorithm.AlgorithmIdentifier',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Class.SEQUENCE,
                                        constructed: !0,
                                        optional: !0,
                                        value: [
                                            {
                                                name: 'rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.OID,
                                                constructed: !1,
                                                capture: 'maskGenOid',
                                            },
                                            {
                                                name: 'rsapss.maskGenAlgorithm.AlgorithmIdentifier.params',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.SEQUENCE,
                                                constructed: !0,
                                                value: [
                                                    {
                                                        name:
                                                            'rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm',
                                                        tagClass: e.Class.UNIVERSAL,
                                                        type: e.Type.OID,
                                                        constructed: !1,
                                                        capture: 'maskGenHashOid',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: 'rsapss.saltLength',
                                tagClass: e.Class.CONTEXT_SPECIFIC,
                                type: 2,
                                optional: !0,
                                value: [
                                    {
                                        name: 'rsapss.saltLength.saltLength',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Class.INTEGER,
                                        constructed: !1,
                                        capture: 'saltLength',
                                    },
                                ],
                            },
                            {
                                name: 'rsapss.trailerField',
                                tagClass: e.Class.CONTEXT_SPECIFIC,
                                type: 3,
                                optional: !0,
                                value: [
                                    {
                                        name: 'rsapss.trailer.trailer',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Class.INTEGER,
                                        constructed: !1,
                                        capture: 'trailer',
                                    },
                                ],
                            },
                        ],
                    },
                    x = {
                        name: 'CertificationRequest',
                        tagClass: e.Class.UNIVERSAL,
                        type: e.Type.SEQUENCE,
                        constructed: !0,
                        captureAsn1: 'csr',
                        value: [
                            {
                                name: 'CertificationRequestInfo',
                                tagClass: e.Class.UNIVERSAL,
                                type: e.Type.SEQUENCE,
                                constructed: !0,
                                captureAsn1: 'certificationRequestInfo',
                                value: [
                                    {
                                        name: 'CertificationRequestInfo.integer',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Type.INTEGER,
                                        constructed: !1,
                                        capture: 'certificationRequestInfoVersion',
                                    },
                                    {
                                        name: 'CertificationRequestInfo.subject',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Type.SEQUENCE,
                                        constructed: !0,
                                        captureAsn1: 'certificationRequestInfoSubject',
                                    },
                                    v,
                                    {
                                        name: 'CertificationRequestInfo.attributes',
                                        tagClass: e.Class.CONTEXT_SPECIFIC,
                                        type: 0,
                                        constructed: !0,
                                        optional: !0,
                                        capture: 'certificationRequestInfoAttributes',
                                        value: [
                                            {
                                                name: 'CertificationRequestInfo.attributes',
                                                tagClass: e.Class.UNIVERSAL,
                                                type: e.Type.SEQUENCE,
                                                constructed: !0,
                                                value: [
                                                    {
                                                        name: 'CertificationRequestInfo.attributes.type',
                                                        tagClass: e.Class.UNIVERSAL,
                                                        type: e.Type.OID,
                                                        constructed: !1,
                                                    },
                                                    {
                                                        name: 'CertificationRequestInfo.attributes.value',
                                                        tagClass: e.Class.UNIVERSAL,
                                                        type: e.Type.SET,
                                                        constructed: !0,
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: 'CertificationRequest.signatureAlgorithm',
                                tagClass: e.Class.UNIVERSAL,
                                type: e.Type.SEQUENCE,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'CertificationRequest.signatureAlgorithm.algorithm',
                                        tagClass: e.Class.UNIVERSAL,
                                        type: e.Type.OID,
                                        constructed: !1,
                                        capture: 'csrSignatureOid',
                                    },
                                    {
                                        name: 'CertificationRequest.signatureAlgorithm.parameters',
                                        tagClass: e.Class.UNIVERSAL,
                                        optional: !0,
                                        captureAsn1: 'csrSignatureParams',
                                    },
                                ],
                            },
                            {
                                name: 'CertificationRequest.signature',
                                tagClass: e.Class.UNIVERSAL,
                                type: e.Type.BITSTRING,
                                constructed: !1,
                                capture: 'csrSignature',
                            },
                        ],
                    };
                w.RDNAttributesAsArray = function (a, b) {
                    for (var c = [], d, l, f, g = 0; g < a.value.length; ++g) {
                        d = a.value[g];
                        for (var h = 0; h < d.value.length; ++h)
                            (f = {}),
                                (l = d.value[h]),
                                (f.type = e.derToOid(l.value[0].value)),
                                (f.value = l.value[1].value),
                                (f.valueTagClass = l.value[1].type),
                                f.type in k && ((f.name = k[f.type]), f.name in u && (f.shortName = u[f.name])),
                                b && (b.update(f.type), b.update(f.value)),
                                c.push(f);
                    }
                    return c;
                };
                w.CRIAttributesAsArray = function (a) {
                    for (var b = [], c = 0; c < a.length; ++c) {
                        var d = a[c],
                            f = e.derToOid(d.value[0].value);
                        d = d.value[1].value;
                        for (var m = 0; m < d.length; ++m) {
                            var g = {};
                            g.type = f;
                            g.value = d[m].value;
                            g.valueTagClass = d[m].type;
                            g.type in k && ((g.name = k[g.type]), g.name in u && (g.shortName = u[g.name]));
                            if (g.type === k.extensionRequest) {
                                g.extensions = [];
                                for (var h = 0; h < g.value.length; ++h)
                                    g.extensions.push(w.certificateExtensionFromAsn1(g.value[h]));
                            }
                            b.push(g);
                        }
                    }
                    return b;
                };
                var D = function (a, b, c) {
                    var d = {};
                    if (a !== k['RSASSA-PSS']) return d;
                    c &&
                        (d = {
                            hash: { algorithmOid: k.sha1 },
                            mgf: { algorithmOid: k.mgf1, hash: { algorithmOid: k.sha1 } },
                            saltLength: 20,
                        });
                    c = {};
                    a = [];
                    if (!e.validate(b, q, c, a))
                        throw ((b = Error('Cannot read RSASSA-PSS parameter block.')), (b.errors = a), b);
                    void 0 !== c.hashOid && ((d.hash = d.hash || {}), (d.hash.algorithmOid = e.derToOid(c.hashOid)));
                    void 0 !== c.maskGenOid &&
                        ((d.mgf = d.mgf || {}),
                        (d.mgf.algorithmOid = e.derToOid(c.maskGenOid)),
                        (d.mgf.hash = d.mgf.hash || {}),
                        (d.mgf.hash.algorithmOid = e.derToOid(c.maskGenHashOid)));
                    void 0 !== c.saltLength && (d.saltLength = c.saltLength.charCodeAt(0));
                    return d;
                };
                w.certificateFromPem = function (b, c, d) {
                    b = a.pem.decode(b)[0];
                    if ('CERTIFICATE' !== b.type && 'X509 CERTIFICATE' !== b.type && 'TRUSTED CERTIFICATE' !== b.type)
                        throw (
                            ((c = Error(
                                'Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".',
                            )),
                            (c.headerType = b.type),
                            c)
                        );
                    if (b.procType && 'ENCRYPTED' === b.procType.type)
                        throw Error('Could not convert certificate from PEM; PEM is encrypted.');
                    d = e.fromDer(b.body, d);
                    return w.certificateFromAsn1(d, c);
                };
                w.certificateToPem = function (b, c) {
                    var d = { type: 'CERTIFICATE', body: e.toDer(w.certificateToAsn1(b)).getBytes() };
                    return a.pem.encode(d, { maxline: c });
                };
                w.publicKeyFromPem = function (b) {
                    b = a.pem.decode(b)[0];
                    if ('PUBLIC KEY' !== b.type && 'RSA PUBLIC KEY' !== b.type) {
                        var c = Error(
                            'Could not convert public key from PEM; PEM header type is not "PUBLIC KEY" or "RSA PUBLIC KEY".',
                        );
                        c.headerType = b.type;
                        throw c;
                    }
                    if (b.procType && 'ENCRYPTED' === b.procType.type)
                        throw Error('Could not convert public key from PEM; PEM is encrypted.');
                    b = e.fromDer(b.body);
                    return w.publicKeyFromAsn1(b);
                };
                w.publicKeyToPem = function (b, c) {
                    var d = { type: 'PUBLIC KEY', body: e.toDer(w.publicKeyToAsn1(b)).getBytes() };
                    return a.pem.encode(d, { maxline: c });
                };
                w.publicKeyToRSAPublicKeyPem = function (b, c) {
                    var d = { type: 'RSA PUBLIC KEY', body: e.toDer(w.publicKeyToRSAPublicKey(b)).getBytes() };
                    return a.pem.encode(d, { maxline: c });
                };
                w.getPublicKeyFingerprint = function (b, c) {
                    c = c || {};
                    var d = c.md || a.md.sha1.create();
                    switch (c.type || 'RSAPublicKey') {
                        case 'RSAPublicKey':
                            var l = e.toDer(w.publicKeyToRSAPublicKey(b)).getBytes();
                            break;
                        case 'SubjectPublicKeyInfo':
                            l = e.toDer(w.publicKeyToAsn1(b)).getBytes();
                            break;
                        default:
                            throw Error('Unknown fingerprint type "' + c.type + '".');
                    }
                    d.start();
                    d.update(l);
                    d = d.digest();
                    if ('hex' === c.encoding)
                        return (d = d.toHex()), c.delimiter ? d.match(/.{2}/g).join(c.delimiter) : d;
                    if ('binary' === c.encoding) return d.getBytes();
                    if (c.encoding) throw Error('Unknown encoding "' + c.encoding + '".');
                    return d;
                };
                w.certificationRequestFromPem = function (b, c, d) {
                    b = a.pem.decode(b)[0];
                    if ('CERTIFICATE REQUEST' !== b.type)
                        throw (
                            ((c = Error(
                                'Could not convert certification request from PEM; PEM header type is not "CERTIFICATE REQUEST".',
                            )),
                            (c.headerType = b.type),
                            c)
                        );
                    if (b.procType && 'ENCRYPTED' === b.procType.type)
                        throw Error('Could not convert certification request from PEM; PEM is encrypted.');
                    d = e.fromDer(b.body, d);
                    return w.certificationRequestFromAsn1(d, c);
                };
                w.certificationRequestToPem = function (b, c) {
                    var d = { type: 'CERTIFICATE REQUEST', body: e.toDer(w.certificationRequestToAsn1(b)).getBytes() };
                    return a.pem.encode(d, { maxline: c });
                };
                w.createCertificate = function () {
                    var b = { version: 2, serialNumber: '00', signatureOid: null, signature: null, siginfo: {} };
                    b.siginfo.algorithmOid = null;
                    b.validity = {};
                    b.validity.notBefore = new Date();
                    b.validity.notAfter = new Date();
                    b.issuer = {};
                    b.issuer.getField = function (a) {
                        return g(b.issuer, a);
                    };
                    b.issuer.addField = function (a) {
                        p([a]);
                        b.issuer.attributes.push(a);
                    };
                    b.issuer.attributes = [];
                    b.issuer.hash = null;
                    b.subject = {};
                    b.subject.getField = function (a) {
                        return g(b.subject, a);
                    };
                    b.subject.addField = function (a) {
                        p([a]);
                        b.subject.attributes.push(a);
                    };
                    b.subject.attributes = [];
                    b.subject.hash = null;
                    b.extensions = [];
                    b.publicKey = null;
                    b.md = null;
                    b.setSubject = function (a, c) {
                        p(a);
                        b.subject.attributes = a;
                        delete b.subject.uniqueId;
                        c && (b.subject.uniqueId = c);
                        b.subject.hash = null;
                    };
                    b.setIssuer = function (a, c) {
                        p(a);
                        b.issuer.attributes = a;
                        delete b.issuer.uniqueId;
                        c && (b.issuer.uniqueId = c);
                        b.issuer.hash = null;
                    };
                    b.setExtensions = function (a) {
                        for (var c = 0; c < a.length; ++c) h(a[c], { cert: b });
                        b.extensions = a;
                    };
                    b.getExtension = function (a) {
                        'string' === typeof a && (a = { name: a });
                        for (var c = null, e, d = 0; null === c && d < b.extensions.length; ++d)
                            (e = b.extensions[d]),
                                a.id && e.id === a.id ? (c = e) : a.name && e.name === a.name && (c = e);
                        return c;
                    };
                    b.sign = function (c, d) {
                        b.md = d || a.md.sha1.create();
                        var f = k[b.md.algorithm + 'WithRSAEncryption'];
                        if (!f)
                            throw (
                                ((f = Error(
                                    'Could not compute certificate digest. Unknown message digest algorithm OID.',
                                )),
                                (f.algorithm = b.md.algorithm),
                                f)
                            );
                        b.signatureOid = b.siginfo.algorithmOid = f;
                        b.tbsCertificate = w.getTBSCertificate(b);
                        f = e.toDer(b.tbsCertificate);
                        b.md.update(f.getBytes());
                        b.signature = c.sign(b.md);
                    };
                    b.verify = function (c) {
                        var d = !1;
                        if (!b.issued(c)) {
                            d = b.subject;
                            var f = Error(
                                "The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject.",
                            );
                            f.expectedIssuer = c.issuer.attributes;
                            f.actualIssuer = d.attributes;
                            throw f;
                        }
                        f = c.md;
                        if (null === f) {
                            if (c.signatureOid in k)
                                switch (k[c.signatureOid]) {
                                    case 'sha1WithRSAEncryption':
                                        f = a.md.sha1.create();
                                        break;
                                    case 'md5WithRSAEncryption':
                                        f = a.md.md5.create();
                                        break;
                                    case 'sha256WithRSAEncryption':
                                        f = a.md.sha256.create();
                                        break;
                                    case 'sha512WithRSAEncryption':
                                        f = a.md.sha512.create();
                                        break;
                                    case 'RSASSA-PSS':
                                        f = a.md.sha256.create();
                                }
                            if (null === f)
                                throw (
                                    ((f = Error('Could not compute certificate digest. Unknown signature OID.')),
                                    (f.signatureOid = c.signatureOid),
                                    f)
                                );
                            var l = c.tbsCertificate || w.getTBSCertificate(c);
                            l = e.toDer(l);
                            f.update(l.getBytes());
                        }
                        if (null !== f) {
                            switch (c.signatureOid) {
                                case k.sha1WithRSAEncryption:
                                    var m = void 0;
                                    break;
                                case k['RSASSA-PSS']:
                                    d = k[c.signatureParameters.mgf.hash.algorithmOid];
                                    if (void 0 === d || void 0 === a.md[d])
                                        throw (
                                            ((f = Error('Unsupported MGF hash function.')),
                                            (f.oid = c.signatureParameters.mgf.hash.algorithmOid),
                                            (f.name = d),
                                            f)
                                        );
                                    m = k[c.signatureParameters.mgf.algorithmOid];
                                    if (void 0 === m || void 0 === a.mgf[m])
                                        throw (
                                            ((f = Error('Unsupported MGF function.')),
                                            (f.oid = c.signatureParameters.mgf.algorithmOid),
                                            (f.name = m),
                                            f)
                                        );
                                    m = a.mgf[m].create(a.md[d].create());
                                    d = k[c.signatureParameters.hash.algorithmOid];
                                    if (void 0 === d || void 0 === a.md[d])
                                        throw {
                                            message: 'Unsupported RSASSA-PSS hash function.',
                                            oid: c.signatureParameters.hash.algorithmOid,
                                            name: d,
                                        };
                                    m = a.pss.create(a.md[d].create(), m, c.signatureParameters.saltLength);
                            }
                            d = b.publicKey.verify(f.digest().getBytes(), c.signature, m);
                        }
                        return d;
                    };
                    b.isIssuer = function (a) {
                        var c = !1,
                            e = b.issuer;
                        a = a.subject;
                        if (e.hash && a.hash) c = e.hash === a.hash;
                        else if (e.attributes.length === a.attributes.length) {
                            c = !0;
                            for (var d, f, l = 0; c && l < e.attributes.length; ++l)
                                if (
                                    ((d = e.attributes[l]),
                                    (f = a.attributes[l]),
                                    d.type !== f.type || d.value !== f.value)
                                )
                                    c = !1;
                        }
                        return c;
                    };
                    b.issued = function (a) {
                        return a.isIssuer(b);
                    };
                    b.generateSubjectKeyIdentifier = function () {
                        return w.getPublicKeyFingerprint(b.publicKey, { type: 'RSAPublicKey' });
                    };
                    b.verifySubjectKeyIdentifier = function () {
                        for (var c = k.subjectKeyIdentifier, e = 0; e < b.extensions.length; ++e) {
                            var d = b.extensions[e];
                            if (d.id === c)
                                return (
                                    (c = b.generateSubjectKeyIdentifier().getBytes()),
                                    a.util.hexToBytes(d.subjectKeyIdentifier) === c
                                );
                        }
                        return !1;
                    };
                    return b;
                };
                w.certificateFromAsn1 = function (b, d) {
                    var f = {},
                        l = [];
                    if (!e.validate(b, c, f, l))
                        throw (
                            ((f = Error('Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate.')),
                            (f.errors = l),
                            f)
                        );
                    if ('string' !== typeof f.certSignature) {
                        l = '\x00';
                        for (var h = 0; h < f.certSignature.length; ++h) l += e.toDer(f.certSignature[h]).getBytes();
                        f.certSignature = l;
                    }
                    l = e.derToOid(f.publicKeyOid);
                    if (l !== w.oids.rsaEncryption) throw Error('Cannot read public key. OID is not RSA.');
                    var m = w.createCertificate();
                    m.version = f.certVersion ? f.certVersion.charCodeAt(0) : 0;
                    l = a.util.createBuffer(f.certSerialNumber);
                    m.serialNumber = l.toHex();
                    m.signatureOid = a.asn1.derToOid(f.certSignatureOid);
                    m.signatureParameters = D(m.signatureOid, f.certSignatureParams, !0);
                    m.siginfo.algorithmOid = a.asn1.derToOid(f.certinfoSignatureOid);
                    m.siginfo.parameters = D(m.siginfo.algorithmOid, f.certinfoSignatureParams, !1);
                    l = a.util.createBuffer(f.certSignature);
                    ++l.read;
                    m.signature = l.getBytes();
                    l = [];
                    void 0 !== f.certValidity1UTCTime && l.push(e.utcTimeToDate(f.certValidity1UTCTime));
                    void 0 !== f.certValidity2GeneralizedTime &&
                        l.push(e.generalizedTimeToDate(f.certValidity2GeneralizedTime));
                    void 0 !== f.certValidity3UTCTime && l.push(e.utcTimeToDate(f.certValidity3UTCTime));
                    void 0 !== f.certValidity4GeneralizedTime &&
                        l.push(e.generalizedTimeToDate(f.certValidity4GeneralizedTime));
                    if (2 < l.length)
                        throw Error(
                            'Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate.',
                        );
                    if (2 > l.length)
                        throw Error(
                            'Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime.',
                        );
                    m.validity.notBefore = l[0];
                    m.validity.notAfter = l[1];
                    m.tbsCertificate = f.tbsCertificate;
                    if (d) {
                        m.md = null;
                        if (m.signatureOid in k)
                            switch (((l = k[m.signatureOid]), l)) {
                                case 'sha1WithRSAEncryption':
                                    m.md = a.md.sha1.create();
                                    break;
                                case 'md5WithRSAEncryption':
                                    m.md = a.md.md5.create();
                                    break;
                                case 'sha256WithRSAEncryption':
                                    m.md = a.md.sha256.create();
                                    break;
                                case 'sha512WithRSAEncryption':
                                    m.md = a.md.sha512.create();
                                    break;
                                case 'RSASSA-PSS':
                                    m.md = a.md.sha256.create();
                            }
                        if (null === m.md)
                            throw (
                                ((f = Error('Could not compute certificate digest. Unknown signature OID.')),
                                (f.signatureOid = m.signatureOid),
                                f)
                            );
                        l = e.toDer(m.tbsCertificate);
                        m.md.update(l.getBytes());
                    }
                    l = a.md.sha1.create();
                    m.issuer.getField = function (a) {
                        return g(m.issuer, a);
                    };
                    m.issuer.addField = function (a) {
                        p([a]);
                        m.issuer.attributes.push(a);
                    };
                    m.issuer.attributes = w.RDNAttributesAsArray(f.certIssuer, l);
                    f.certIssuerUniqueId && (m.issuer.uniqueId = f.certIssuerUniqueId);
                    m.issuer.hash = l.digest().toHex();
                    l = a.md.sha1.create();
                    m.subject.getField = function (a) {
                        return g(m.subject, a);
                    };
                    m.subject.addField = function (a) {
                        p([a]);
                        m.subject.attributes.push(a);
                    };
                    m.subject.attributes = w.RDNAttributesAsArray(f.certSubject, l);
                    f.certSubjectUniqueId && (m.subject.uniqueId = f.certSubjectUniqueId);
                    m.subject.hash = l.digest().toHex();
                    m.extensions = f.certExtensions ? w.certificateExtensionsFromAsn1(f.certExtensions) : [];
                    m.publicKey = w.publicKeyFromAsn1(f.subjectPublicKeyInfo);
                    return m;
                };
                w.certificateExtensionsFromAsn1 = function (a) {
                    for (var b = [], c = 0; c < a.value.length; ++c)
                        for (var e = a.value[c], d = 0; d < e.value.length; ++d)
                            b.push(w.certificateExtensionFromAsn1(e.value[d]));
                    return b;
                };
                w.certificateExtensionFromAsn1 = function (b) {
                    var c = {};
                    c.id = e.derToOid(b.value[0].value);
                    c.critical = !1;
                    b.value[1].type === e.Type.BOOLEAN
                        ? ((c.critical = 0 !== b.value[1].value.charCodeAt(0)), (c.value = b.value[2].value))
                        : (c.value = b.value[1].value);
                    if (c.id in k)
                        if (((c.name = k[c.id]), 'keyUsage' === c.name)) {
                            b = e.fromDer(c.value);
                            var d = 0,
                                f = 0;
                            1 < b.value.length &&
                                ((d = b.value.charCodeAt(1)), (f = 2 < b.value.length ? b.value.charCodeAt(2) : 0));
                            c.digitalSignature = 128 === (d & 128);
                            c.nonRepudiation = 64 === (d & 64);
                            c.keyEncipherment = 32 === (d & 32);
                            c.dataEncipherment = 16 === (d & 16);
                            c.keyAgreement = 8 === (d & 8);
                            c.keyCertSign = 4 === (d & 4);
                            c.cRLSign = 2 === (d & 2);
                            c.encipherOnly = 1 === (d & 1);
                            c.decipherOnly = 128 === (f & 128);
                        } else if ('basicConstraints' === c.name)
                            (b = e.fromDer(c.value)),
                                (c.cA =
                                    0 < b.value.length && b.value[0].type === e.Type.BOOLEAN
                                        ? 0 !== b.value[0].value.charCodeAt(0)
                                        : !1),
                                (d = null),
                                0 < b.value.length && b.value[0].type === e.Type.INTEGER
                                    ? (d = b.value[0].value)
                                    : 1 < b.value.length && (d = b.value[1].value),
                                null !== d && (c.pathLenConstraint = e.derToInteger(d));
                        else if ('extKeyUsage' === c.name)
                            for (b = e.fromDer(c.value), d = 0; d < b.value.length; ++d)
                                (f = e.derToOid(b.value[d].value)), f in k ? (c[k[f]] = !0) : (c[f] = !0);
                        else if ('nsCertType' === c.name)
                            (b = e.fromDer(c.value)),
                                (d = 0),
                                1 < b.value.length && (d = b.value.charCodeAt(1)),
                                (c.client = 128 === (d & 128)),
                                (c.server = 64 === (d & 64)),
                                (c.email = 32 === (d & 32)),
                                (c.objsign = 16 === (d & 16)),
                                (c.reserved = 8 === (d & 8)),
                                (c.sslCA = 4 === (d & 4)),
                                (c.emailCA = 2 === (d & 2)),
                                (c.objCA = 1 === (d & 1));
                        else if ('subjectAltName' === c.name || 'issuerAltName' === c.name)
                            for (c.altNames = [], b = e.fromDer(c.value), f = 0; f < b.value.length; ++f) {
                                d = b.value[f];
                                var g = { type: d.type, value: d.value };
                                c.altNames.push(g);
                                switch (d.type) {
                                    case 7:
                                        g.ip = a.util.bytesToIP(d.value);
                                        break;
                                    case 8:
                                        g.oid = e.derToOid(d.value);
                                }
                            }
                        else
                            'subjectKeyIdentifier' === c.name &&
                                ((b = e.fromDer(c.value)), (c.subjectKeyIdentifier = a.util.bytesToHex(b.value)));
                    return c;
                };
                w.certificationRequestFromAsn1 = function (b, c) {
                    var d = {},
                        f = [];
                    if (!e.validate(b, x, d, f))
                        throw (
                            ((d = Error(
                                'Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest.',
                            )),
                            (d.errors = f),
                            d)
                        );
                    if ('string' !== typeof d.csrSignature) {
                        f = '\x00';
                        for (var l = 0; l < d.csrSignature.length; ++l) f += e.toDer(d.csrSignature[l]).getBytes();
                        d.csrSignature = f;
                    }
                    f = e.derToOid(d.publicKeyOid);
                    if (f !== w.oids.rsaEncryption) throw Error('Cannot read public key. OID is not RSA.');
                    var m = w.createCertificationRequest();
                    m.version = d.csrVersion ? d.csrVersion.charCodeAt(0) : 0;
                    m.signatureOid = a.asn1.derToOid(d.csrSignatureOid);
                    m.signatureParameters = D(m.signatureOid, d.csrSignatureParams, !0);
                    m.siginfo.algorithmOid = a.asn1.derToOid(d.csrSignatureOid);
                    m.siginfo.parameters = D(m.siginfo.algorithmOid, d.csrSignatureParams, !1);
                    f = a.util.createBuffer(d.csrSignature);
                    ++f.read;
                    m.signature = f.getBytes();
                    m.certificationRequestInfo = d.certificationRequestInfo;
                    if (c) {
                        m.md = null;
                        if (m.signatureOid in k)
                            switch (((f = k[m.signatureOid]), f)) {
                                case 'sha1WithRSAEncryption':
                                    m.md = a.md.sha1.create();
                                    break;
                                case 'md5WithRSAEncryption':
                                    m.md = a.md.md5.create();
                                    break;
                                case 'sha256WithRSAEncryption':
                                    m.md = a.md.sha256.create();
                                    break;
                                case 'sha512WithRSAEncryption':
                                    m.md = a.md.sha512.create();
                                    break;
                                case 'RSASSA-PSS':
                                    m.md = a.md.sha256.create();
                            }
                        if (null === m.md)
                            throw (
                                ((d = Error('Could not compute certification request digest. Unknown signature OID.')),
                                (d.signatureOid = m.signatureOid),
                                d)
                            );
                        f = e.toDer(m.certificationRequestInfo);
                        m.md.update(f.getBytes());
                    }
                    f = a.md.sha1.create();
                    m.subject.getField = function (a) {
                        return g(m.subject, a);
                    };
                    m.subject.addField = function (a) {
                        p([a]);
                        m.subject.attributes.push(a);
                    };
                    m.subject.attributes = w.RDNAttributesAsArray(d.certificationRequestInfoSubject, f);
                    m.subject.hash = f.digest().toHex();
                    m.publicKey = w.publicKeyFromAsn1(d.subjectPublicKeyInfo);
                    m.getAttribute = function (a) {
                        return g(m, a);
                    };
                    m.addAttribute = function (a) {
                        p([a]);
                        m.attributes.push(a);
                    };
                    m.attributes = w.CRIAttributesAsArray(d.certificationRequestInfoAttributes || []);
                    return m;
                };
                w.createCertificationRequest = function () {
                    var b = { version: 0, signatureOid: null, signature: null, siginfo: {} };
                    b.siginfo.algorithmOid = null;
                    b.subject = {};
                    b.subject.getField = function (a) {
                        return g(b.subject, a);
                    };
                    b.subject.addField = function (a) {
                        p([a]);
                        b.subject.attributes.push(a);
                    };
                    b.subject.attributes = [];
                    b.subject.hash = null;
                    b.publicKey = null;
                    b.attributes = [];
                    b.getAttribute = function (a) {
                        return g(b, a);
                    };
                    b.addAttribute = function (a) {
                        p([a]);
                        b.attributes.push(a);
                    };
                    b.md = null;
                    b.setSubject = function (a) {
                        p(a);
                        b.subject.attributes = a;
                        b.subject.hash = null;
                    };
                    b.setAttributes = function (a) {
                        p(a);
                        b.attributes = a;
                    };
                    b.sign = function (c, d) {
                        b.md = d || a.md.sha1.create();
                        var f = k[b.md.algorithm + 'WithRSAEncryption'];
                        if (!f)
                            throw (
                                ((f = Error(
                                    'Could not compute certification request digest. Unknown message digest algorithm OID.',
                                )),
                                (f.algorithm = b.md.algorithm),
                                f)
                            );
                        b.signatureOid = b.siginfo.algorithmOid = f;
                        b.certificationRequestInfo = w.getCertificationRequestInfo(b);
                        f = e.toDer(b.certificationRequestInfo);
                        b.md.update(f.getBytes());
                        b.signature = c.sign(b.md);
                    };
                    b.verify = function () {
                        var c = !1,
                            d = b.md;
                        if (null === d) {
                            if (b.signatureOid in k)
                                switch (k[b.signatureOid]) {
                                    case 'sha1WithRSAEncryption':
                                        d = a.md.sha1.create();
                                        break;
                                    case 'md5WithRSAEncryption':
                                        d = a.md.md5.create();
                                        break;
                                    case 'sha256WithRSAEncryption':
                                        d = a.md.sha256.create();
                                        break;
                                    case 'sha512WithRSAEncryption':
                                        d = a.md.sha512.create();
                                        break;
                                    case 'RSASSA-PSS':
                                        d = a.md.sha256.create();
                                }
                            if (null === d)
                                throw (
                                    ((d = Error(
                                        'Could not compute certification request digest. Unknown signature OID.',
                                    )),
                                    (d.signatureOid = b.signatureOid),
                                    d)
                                );
                            var f = b.certificationRequestInfo || w.getCertificationRequestInfo(b);
                            f = e.toDer(f);
                            d.update(f.getBytes());
                        }
                        if (null !== d) {
                            switch (b.signatureOid) {
                                case k['RSASSA-PSS']:
                                    c = k[b.signatureParameters.mgf.hash.algorithmOid];
                                    if (void 0 === c || void 0 === a.md[c])
                                        throw (
                                            ((d = Error('Unsupported MGF hash function.')),
                                            (d.oid = b.signatureParameters.mgf.hash.algorithmOid),
                                            (d.name = c),
                                            d)
                                        );
                                    var g = k[b.signatureParameters.mgf.algorithmOid];
                                    if (void 0 === g || void 0 === a.mgf[g])
                                        throw (
                                            ((d = Error('Unsupported MGF function.')),
                                            (d.oid = b.signatureParameters.mgf.algorithmOid),
                                            (d.name = g),
                                            d)
                                        );
                                    g = a.mgf[g].create(a.md[c].create());
                                    c = k[b.signatureParameters.hash.algorithmOid];
                                    if (void 0 === c || void 0 === a.md[c])
                                        throw (
                                            ((d = Error('Unsupported RSASSA-PSS hash function.')),
                                            (d.oid = b.signatureParameters.hash.algorithmOid),
                                            (d.name = c),
                                            d)
                                        );
                                    g = a.pss.create(a.md[c].create(), g, b.signatureParameters.saltLength);
                            }
                            c = b.publicKey.verify(d.digest().getBytes(), b.signature, g);
                        }
                        return c;
                    };
                    return b;
                };
                w.getTBSCertificate = function (b) {
                    var c = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                        e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
                            e.create(e.Class.UNIVERSAL, e.Type.INTEGER, !1, e.integerToDer(b.version).getBytes()),
                        ]),
                        e.create(e.Class.UNIVERSAL, e.Type.INTEGER, !1, a.util.hexToBytes(b.serialNumber)),
                        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                            e.create(e.Class.UNIVERSAL, e.Type.OID, !1, e.oidToDer(b.siginfo.algorithmOid).getBytes()),
                            f(b.siginfo.algorithmOid, b.siginfo.parameters),
                        ]),
                        d(b.issuer),
                        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                            e.create(e.Class.UNIVERSAL, e.Type.UTCTIME, !1, e.dateToUtcTime(b.validity.notBefore)),
                            e.create(e.Class.UNIVERSAL, e.Type.UTCTIME, !1, e.dateToUtcTime(b.validity.notAfter)),
                        ]),
                        d(b.subject),
                        w.publicKeyToAsn1(b.publicKey),
                    ]);
                    b.issuer.uniqueId &&
                        c.value.push(
                            e.create(e.Class.CONTEXT_SPECIFIC, 1, !0, [
                                e.create(
                                    e.Class.UNIVERSAL,
                                    e.Type.BITSTRING,
                                    !1,
                                    String.fromCharCode(0) + b.issuer.uniqueId,
                                ),
                            ]),
                        );
                    b.subject.uniqueId &&
                        c.value.push(
                            e.create(e.Class.CONTEXT_SPECIFIC, 2, !0, [
                                e.create(
                                    e.Class.UNIVERSAL,
                                    e.Type.BITSTRING,
                                    !1,
                                    String.fromCharCode(0) + b.subject.uniqueId,
                                ),
                            ]),
                        );
                    0 < b.extensions.length && c.value.push(w.certificateExtensionsToAsn1(b.extensions));
                    return c;
                };
                w.getCertificationRequestInfo = function (a) {
                    return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                        e.create(e.Class.UNIVERSAL, e.Type.INTEGER, !1, e.integerToDer(a.version).getBytes()),
                        d(a.subject),
                        w.publicKeyToAsn1(a.publicKey),
                        b(a),
                    ]);
                };
                w.distinguishedNameToAsn1 = function (a) {
                    return d(a);
                };
                w.certificateToAsn1 = function (a) {
                    var b = a.tbsCertificate || w.getTBSCertificate(a);
                    return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                        b,
                        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                            e.create(e.Class.UNIVERSAL, e.Type.OID, !1, e.oidToDer(a.signatureOid).getBytes()),
                            f(a.signatureOid, a.signatureParameters),
                        ]),
                        e.create(e.Class.UNIVERSAL, e.Type.BITSTRING, !1, String.fromCharCode(0) + a.signature),
                    ]);
                };
                w.certificateExtensionsToAsn1 = function (a) {
                    var b = e.create(e.Class.CONTEXT_SPECIFIC, 3, !0, []),
                        c = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
                    b.value.push(c);
                    for (var d = 0; d < a.length; ++d) c.value.push(w.certificateExtensionToAsn1(a[d]));
                    return b;
                };
                w.certificateExtensionToAsn1 = function (a) {
                    var b = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
                    b.value.push(e.create(e.Class.UNIVERSAL, e.Type.OID, !1, e.oidToDer(a.id).getBytes()));
                    a.critical &&
                        b.value.push(e.create(e.Class.UNIVERSAL, e.Type.BOOLEAN, !1, String.fromCharCode(255)));
                    var c = a.value;
                    'string' !== typeof a.value && (c = e.toDer(c).getBytes());
                    b.value.push(e.create(e.Class.UNIVERSAL, e.Type.OCTETSTRING, !1, c));
                    return b;
                };
                w.certificationRequestToAsn1 = function (a) {
                    var b = a.certificationRequestInfo || w.getCertificationRequestInfo(a);
                    return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                        b,
                        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
                            e.create(e.Class.UNIVERSAL, e.Type.OID, !1, e.oidToDer(a.signatureOid).getBytes()),
                            f(a.signatureOid, a.signatureParameters),
                        ]),
                        e.create(e.Class.UNIVERSAL, e.Type.BITSTRING, !1, String.fromCharCode(0) + a.signature),
                    ]);
                };
                w.createCaStore = function (b) {
                    function c(a) {
                        f(a);
                        return g.certs[a.hash] || null;
                    }
                    function f(b) {
                        if (!b.hash) {
                            var c = a.md.sha1.create();
                            b.attributes = w.RDNAttributesAsArray(d(b), c);
                            b.hash = c.digest().toHex();
                        }
                    }
                    var g = {
                        certs: {},
                        getIssuer: function (a) {
                            return c(a.issuer);
                        },
                        addCertificate: function (b) {
                            'string' === typeof b && (b = a.pki.certificateFromPem(b));
                            f(b.subject);
                            if (!g.hasCertificate(b))
                                if (b.subject.hash in g.certs) {
                                    var c = g.certs[b.subject.hash];
                                    a.util.isArray(c) || (c = [c]);
                                    c.push(b);
                                    g.certs[b.subject.hash] = c;
                                } else g.certs[b.subject.hash] = b;
                        },
                        hasCertificate: function (b) {
                            'string' === typeof b && (b = a.pki.certificateFromPem(b));
                            var d = c(b.subject);
                            if (!d) return !1;
                            a.util.isArray(d) || (d = [d]);
                            b = e.toDer(w.certificateToAsn1(b)).getBytes();
                            for (var f = 0; f < d.length; ++f) {
                                var l = e.toDer(w.certificateToAsn1(d[f])).getBytes();
                                if (b === l) return !0;
                            }
                            return !1;
                        },
                        listAllCertificates: function () {
                            var b = [],
                                c;
                            for (c in g.certs)
                                if (g.certs.hasOwnProperty(c)) {
                                    var e = g.certs[c];
                                    if (a.util.isArray(e)) for (var d = 0; d < e.length; ++d) b.push(e[d]);
                                    else b.push(e);
                                }
                            return b;
                        },
                        removeCertificate: function (b) {
                            'string' === typeof b && (b = a.pki.certificateFromPem(b));
                            f(b.subject);
                            if (!g.hasCertificate(b)) return null;
                            var d = c(b.subject);
                            if (!a.util.isArray(d)) {
                                var l = g.certs[b.subject.hash];
                                delete g.certs[b.subject.hash];
                                return l;
                            }
                            for (var k = e.toDer(w.certificateToAsn1(b)).getBytes(), m = 0; m < d.length; ++m) {
                                var n = e.toDer(w.certificateToAsn1(d[m])).getBytes();
                                k === n && ((l = d[m]), d.splice(m, 1));
                            }
                            0 === d.length && delete g.certs[b.subject.hash];
                            return l;
                        },
                    };
                    if (b) for (var k = 0; k < b.length; ++k) g.addCertificate(b[k]);
                    return g;
                };
                w.certificateError = {
                    bad_certificate: 'forge.pki.BadCertificate',
                    unsupported_certificate: 'forge.pki.UnsupportedCertificate',
                    certificate_revoked: 'forge.pki.CertificateRevoked',
                    certificate_expired: 'forge.pki.CertificateExpired',
                    certificate_unknown: 'forge.pki.CertificateUnknown',
                    unknown_ca: 'forge.pki.UnknownCertificateAuthority',
                };
                w.verifyCertificateChain = function (b, c, e) {
                    c = c.slice(0);
                    var d = c.slice(0),
                        f = new Date(),
                        l = !0,
                        g = null,
                        k = 0;
                    do {
                        var h = c.shift(),
                            r = null,
                            q = !1;
                        if (f < h.validity.notBefore || f > h.validity.notAfter)
                            g = {
                                message: 'Certificate is not valid yet or has expired.',
                                error: w.certificateError.certificate_expired,
                                notBefore: h.validity.notBefore,
                                notAfter: h.validity.notAfter,
                                now: f,
                            };
                        if (null === g) {
                            r = c[0] || b.getIssuer(h);
                            null === r && h.isIssuer(h) && ((q = !0), (r = h));
                            if (r) {
                                var x = r;
                                a.util.isArray(x) || (x = [x]);
                                for (var v = !1; !v && 0 < x.length; ) {
                                    r = x.shift();
                                    try {
                                        v = r.verify(h);
                                    } catch (V) {}
                                }
                                v ||
                                    (g = {
                                        message: 'Certificate signature is invalid.',
                                        error: w.certificateError.bad_certificate,
                                    });
                            }
                            null !== g ||
                                (r && !q) ||
                                b.hasCertificate(h) ||
                                (g = { message: 'Certificate is not trusted.', error: w.certificateError.unknown_ca });
                        }
                        null === g &&
                            r &&
                            !h.isIssuer(r) &&
                            (g = {
                                message: 'Certificate issuer is invalid.',
                                error: w.certificateError.bad_certificate,
                            });
                        if (null === g)
                            for (
                                x = { keyUsage: !0, basicConstraints: !0 }, v = 0;
                                null === g && v < h.extensions.length;
                                ++v
                            ) {
                                var u = h.extensions[v];
                                !u.critical ||
                                    u.name in x ||
                                    (g = {
                                        message: 'Certificate has an unsupported critical extension.',
                                        error: w.certificateError.unsupported_certificate,
                                    });
                            }
                        null !== g ||
                            (l && (0 !== c.length || (r && !q))) ||
                            ((l = h.getExtension('basicConstraints')),
                            (h = h.getExtension('keyUsage')),
                            null !== h &&
                                ((h.keyCertSign && null !== l) ||
                                    (g = {
                                        message:
                                            "Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",
                                        error: w.certificateError.bad_certificate,
                                    })),
                            null !== g ||
                                null === l ||
                                l.cA ||
                                (g = {
                                    message: 'Certificate basicConstraints indicates the certificate is not a CA.',
                                    error: w.certificateError.bad_certificate,
                                }),
                            null === g &&
                                null !== h &&
                                'pathLenConstraint' in l &&
                                k - 1 > l.pathLenConstraint &&
                                (g = {
                                    message: 'Certificate basicConstraints pathLenConstraint violated.',
                                    error: w.certificateError.bad_certificate,
                                }));
                        h = null === g ? !0 : g.error;
                        l = e ? e(h, k, d) : h;
                        if (!0 === l) g = null;
                        else {
                            !0 === h &&
                                (g = {
                                    message: 'The application rejected the certificate.',
                                    error: w.certificateError.bad_certificate,
                                });
                            if (l || 0 === l)
                                'object' !== typeof l || a.util.isArray(l)
                                    ? 'string' === typeof l && (g.error = l)
                                    : (l.message && (g.message = l.message), l.error && (g.error = l.error));
                            throw g;
                        }
                        l = !1;
                        ++k;
                    } while (0 < c.length);
                    return !0;
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.x509) return d.x509;
                        d.defined.x509 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pki;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t(
                'js/x509',
                'require module ./aes ./asn1 ./des ./md ./mgf ./oids ./pem ./pss ./rsa ./util'.split(' '),
                function () {
                    C.apply(null, Array.prototype.slice.call(arguments, 0));
                },
            );
        })();
        (function () {
            function p(a) {
                function g(a, b, c, e) {
                    for (var d = [], f = 0; f < a.length; f++)
                        for (var l = 0; l < a[f].safeBags.length; l++) {
                            var g = a[f].safeBags[l];
                            if (void 0 === e || g.type === e)
                                null === b
                                    ? d.push(g)
                                    : void 0 !== g.attributes[b] && 0 <= g.attributes[b].indexOf(c) && d.push(g);
                        }
                    return d;
                }
                function d(b) {
                    if (b.composed || b.constructed) {
                        for (var c = a.util.createBuffer(), e = 0; e < b.value.length; ++e)
                            c.putBytes(b.value[e].value);
                        b.composed = b.constructed = !1;
                        b.value = c.getBytes();
                    }
                    return b;
                }
                function p(c, f, g, l) {
                    f = b.fromDer(f, g);
                    if (f.tagClass !== b.Class.UNIVERSAL || f.type !== b.Type.SEQUENCE || !0 !== f.constructed)
                        throw Error('PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo');
                    for (var r = 0; r < f.value.length; r++) {
                        var n = {},
                            q = [];
                        if (!b.validate(f.value[r], k, n, q))
                            throw ((c = Error('Cannot read ContentInfo.')), (c.errors = q), c);
                        q = { encrypted: !1 };
                        var m = n.content.value[0];
                        switch (b.derToOid(n.contentType)) {
                            case e.oids.data:
                                if (m.tagClass !== b.Class.UNIVERSAL || m.type !== b.Type.OCTETSTRING)
                                    throw Error('PKCS#12 SafeContents Data is not an OCTET STRING.');
                                n = d(m).value;
                                break;
                            case e.oids.encryptedData:
                                var x = l;
                                n = {};
                                var v = [];
                                if (!b.validate(m, a.pkcs7.asn1.encryptedDataValidator, n, v))
                                    throw ((c = Error('Cannot read EncryptedContentInfo.')), (c.errors = v), c);
                                m = b.derToOid(n.contentType);
                                if (m !== e.oids.data)
                                    throw (
                                        ((c = Error('PKCS#12 EncryptedContentInfo ContentType is not Data.')),
                                        (c.oid = m),
                                        c)
                                    );
                                m = b.derToOid(n.encAlgorithm);
                                m = e.pbe.getCipher(m, n.encParameter, x);
                                n = d(n.encryptedContentAsn1);
                                n = a.util.createBuffer(n.value);
                                m.update(n);
                                if (!m.finish()) throw Error('Failed to decrypt PKCS#12 SafeContents.');
                                n = m.output.getBytes();
                                q.encrypted = !0;
                                break;
                            default:
                                throw (
                                    ((c = Error('Unsupported PKCS#12 contentType.')),
                                    (c.contentType = b.derToOid(n.contentType)),
                                    c)
                                );
                        }
                        q.safeBags = h(n, g, l);
                        c.safeContents.push(q);
                    }
                }
                function h(a, c, d) {
                    if (!c && 0 === a.length) return [];
                    a = b.fromDer(a, c);
                    if (a.tagClass !== b.Class.UNIVERSAL || a.type !== b.Type.SEQUENCE || !0 !== a.constructed)
                        throw Error('PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag.');
                    for (var l = [], g = 0; g < a.value.length; g++) {
                        var k = {},
                            h = [];
                        if (!b.validate(a.value[g], v, k, h))
                            throw ((a = Error('Cannot read SafeBag.')), (a.errors = h), a);
                        var m = { type: b.derToOid(k.bagId), attributes: f(k.bagAttributes) };
                        l.push(m);
                        var x = k.bagValue.value[0];
                        switch (m.type) {
                            case e.oids.pkcs8ShroudedKeyBag:
                                if (((x = e.decryptPrivateKeyInfo(x, d)), null === x))
                                    throw Error('Unable to decrypt PKCS#8 ShroudedKeyBag, wrong pdw?');
                            case e.oids.keyBag:
                                try {
                                    m.key = e.privateKeyFromAsn1(x);
                                } catch (Q) {
                                    (m.key = null), (m.asn1 = x);
                                }
                                continue;
                            case e.oids.certBag:
                                var u = q;
                                var w = function () {
                                    if (b.derToOid(k.certId) !== e.oids.x509Certificate) {
                                        var a = Error('Unsupported certificate type, only X.509 supported.');
                                        a.oid = b.derToOid(k.certId);
                                        throw a;
                                    }
                                    a = b.fromDer(k.cert, c);
                                    try {
                                        m.cert = e.certificateFromAsn1(a, !0);
                                    } catch (P) {
                                        (m.cert = null), (m.asn1 = a);
                                    }
                                };
                                break;
                            default:
                                throw ((a = Error('Unsupported PKCS#12 SafeBag type.')), (a.oid = m.type), a);
                        }
                        if (void 0 !== u && !b.validate(x, u, k, h))
                            throw ((a = Error('Cannot read PKCS#12 ' + u.name)), (a.errors = h), a);
                        w();
                    }
                    return l;
                }
                function f(a) {
                    var d = {};
                    if (void 0 !== a)
                        for (var f = 0; f < a.length; ++f) {
                            var l = {},
                                g = [];
                            if (!b.validate(a[f], c, l, g))
                                throw ((a = Error('Cannot read PKCS#12 BagAttribute.')), (a.errors = g), a);
                            g = b.derToOid(l.oid);
                            if (void 0 !== e.oids[g]) {
                                d[e.oids[g]] = [];
                                for (var k = 0; k < l.values.length; ++k) d[e.oids[g]].push(l.values[k].value);
                            }
                        }
                    return d;
                }
                var b = a.asn1,
                    e = a.pki,
                    w = (a.pkcs12 = a.pkcs12 || {}),
                    k = {
                        name: 'ContentInfo',
                        tagClass: b.Class.UNIVERSAL,
                        type: b.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'ContentInfo.contentType',
                                tagClass: b.Class.UNIVERSAL,
                                type: b.Type.OID,
                                constructed: !1,
                                capture: 'contentType',
                            },
                            {
                                name: 'ContentInfo.content',
                                tagClass: b.Class.CONTEXT_SPECIFIC,
                                constructed: !0,
                                captureAsn1: 'content',
                            },
                        ],
                    },
                    u = {
                        name: 'PFX',
                        tagClass: b.Class.UNIVERSAL,
                        type: b.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'PFX.version',
                                tagClass: b.Class.UNIVERSAL,
                                type: b.Type.INTEGER,
                                constructed: !1,
                                capture: 'version',
                            },
                            k,
                            {
                                name: 'PFX.macData',
                                tagClass: b.Class.UNIVERSAL,
                                type: b.Type.SEQUENCE,
                                constructed: !0,
                                optional: !0,
                                captureAsn1: 'mac',
                                value: [
                                    {
                                        name: 'PFX.macData.mac',
                                        tagClass: b.Class.UNIVERSAL,
                                        type: b.Type.SEQUENCE,
                                        constructed: !0,
                                        value: [
                                            {
                                                name: 'PFX.macData.mac.digestAlgorithm',
                                                tagClass: b.Class.UNIVERSAL,
                                                type: b.Type.SEQUENCE,
                                                constructed: !0,
                                                value: [
                                                    {
                                                        name: 'PFX.macData.mac.digestAlgorithm.algorithm',
                                                        tagClass: b.Class.UNIVERSAL,
                                                        type: b.Type.OID,
                                                        constructed: !1,
                                                        capture: 'macAlgorithm',
                                                    },
                                                    {
                                                        name: 'PFX.macData.mac.digestAlgorithm.parameters',
                                                        tagClass: b.Class.UNIVERSAL,
                                                        captureAsn1: 'macAlgorithmParameters',
                                                    },
                                                ],
                                            },
                                            {
                                                name: 'PFX.macData.mac.digest',
                                                tagClass: b.Class.UNIVERSAL,
                                                type: b.Type.OCTETSTRING,
                                                constructed: !1,
                                                capture: 'macDigest',
                                            },
                                        ],
                                    },
                                    {
                                        name: 'PFX.macData.macSalt',
                                        tagClass: b.Class.UNIVERSAL,
                                        type: b.Type.OCTETSTRING,
                                        constructed: !1,
                                        capture: 'macSalt',
                                    },
                                    {
                                        name: 'PFX.macData.iterations',
                                        tagClass: b.Class.UNIVERSAL,
                                        type: b.Type.INTEGER,
                                        constructed: !1,
                                        optional: !0,
                                        capture: 'macIterations',
                                    },
                                ],
                            },
                        ],
                    },
                    v = {
                        name: 'SafeBag',
                        tagClass: b.Class.UNIVERSAL,
                        type: b.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'SafeBag.bagId',
                                tagClass: b.Class.UNIVERSAL,
                                type: b.Type.OID,
                                constructed: !1,
                                capture: 'bagId',
                            },
                            {
                                name: 'SafeBag.bagValue',
                                tagClass: b.Class.CONTEXT_SPECIFIC,
                                constructed: !0,
                                captureAsn1: 'bagValue',
                            },
                            {
                                name: 'SafeBag.bagAttributes',
                                tagClass: b.Class.UNIVERSAL,
                                type: b.Type.SET,
                                constructed: !0,
                                optional: !0,
                                capture: 'bagAttributes',
                            },
                        ],
                    },
                    c = {
                        name: 'Attribute',
                        tagClass: b.Class.UNIVERSAL,
                        type: b.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'Attribute.attrId',
                                tagClass: b.Class.UNIVERSAL,
                                type: b.Type.OID,
                                constructed: !1,
                                capture: 'oid',
                            },
                            {
                                name: 'Attribute.attrValues',
                                tagClass: b.Class.UNIVERSAL,
                                type: b.Type.SET,
                                constructed: !0,
                                capture: 'values',
                            },
                        ],
                    },
                    q = {
                        name: 'CertBag',
                        tagClass: b.Class.UNIVERSAL,
                        type: b.Type.SEQUENCE,
                        constructed: !0,
                        value: [
                            {
                                name: 'CertBag.certId',
                                tagClass: b.Class.UNIVERSAL,
                                type: b.Type.OID,
                                constructed: !1,
                                capture: 'certId',
                            },
                            {
                                name: 'CertBag.certValue',
                                tagClass: b.Class.CONTEXT_SPECIFIC,
                                constructed: !0,
                                value: [
                                    {
                                        name: 'CertBag.certValue[0]',
                                        tagClass: b.Class.UNIVERSAL,
                                        type: b.Class.OCTETSTRING,
                                        constructed: !1,
                                        capture: 'cert',
                                    },
                                ],
                            },
                        ],
                    };
                w.pkcs12FromAsn1 = function (c, f, k) {
                    'string' === typeof f ? ((k = f), (f = !0)) : void 0 === f && (f = !0);
                    var l = {};
                    if (!b.validate(c, u, l, []))
                        throw (
                            ((f = Error('Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX.')),
                            (f.errors = f),
                            f)
                        );
                    var h = {
                        version: l.version.charCodeAt(0),
                        safeContents: [],
                        getBags: function (b) {
                            var c = {},
                                e;
                            'localKeyId' in b
                                ? (e = b.localKeyId)
                                : 'localKeyIdHex' in b && (e = a.util.hexToBytes(b.localKeyIdHex));
                            void 0 === e &&
                                !('friendlyName' in b) &&
                                'bagType' in b &&
                                (c[b.bagType] = g(h.safeContents, null, null, b.bagType));
                            void 0 !== e && (c.localKeyId = g(h.safeContents, 'localKeyId', e, b.bagType));
                            'friendlyName' in b &&
                                (c.friendlyName = g(h.safeContents, 'friendlyName', b.friendlyName, b.bagType));
                            return c;
                        },
                        getBagsByFriendlyName: function (a, b) {
                            return g(h.safeContents, 'friendlyName', a, b);
                        },
                        getBagsByLocalKeyId: function (a, b) {
                            return g(h.safeContents, 'localKeyId', a, b);
                        },
                    };
                    if (3 !== l.version.charCodeAt(0))
                        throw (
                            ((f = Error('PKCS#12 PFX of version other than 3 not supported.')),
                            (f.version = l.version.charCodeAt(0)),
                            f)
                        );
                    if (b.derToOid(l.contentType) !== e.oids.data)
                        throw (
                            ((f = Error('Only PKCS#12 PFX in pdw integrity mode supported.')),
                            (f.oid = b.derToOid(l.contentType)),
                            f)
                        );
                    c = l.content.value[0];
                    if (c.tagClass !== b.Class.UNIVERSAL || c.type !== b.Type.OCTETSTRING)
                        throw Error('PKCS#12 authSafe content data is not an OCTET STRING.');
                    c = d(c);
                    if (l.mac) {
                        var n = null,
                            q = 0,
                            m = b.derToOid(l.macAlgorithm);
                        switch (m) {
                            case e.oids.sha1:
                                n = a.md.sha1.create();
                                q = 20;
                                break;
                            case e.oids.sha256:
                                n = a.md.sha256.create();
                                q = 32;
                                break;
                            case e.oids.sha384:
                                n = a.md.sha384.create();
                                q = 48;
                                break;
                            case e.oids.sha512:
                                n = a.md.sha512.create();
                                q = 64;
                                break;
                            case e.oids.md5:
                                (n = a.md.md5.create()), (q = 16);
                        }
                        if (null === n) throw Error('PKCS#12 uses unsupported MAC algorithm: ' + m);
                        m = new a.util.ByteBuffer(l.macSalt);
                        var x = 'macIterations' in l ? parseInt(a.util.bytesToHex(l.macIterations), 16) : 1;
                        q = w.generateKey(k, m, 3, x, q, n);
                        m = a.hmac.create();
                        m.start(n, q);
                        m.update(c.value);
                        if (m.getMac().getBytes() !== l.macDigest)
                            throw Error('PKCS#12 MAC could not be verified. Invalid pdw?');
                    }
                    p(h, c.value, f, k);
                    return h;
                };
                w.toPkcs12Asn1 = function (c, d, f, l) {
                    l = l || {};
                    l.saltSize = l.saltSize || 8;
                    l.count = l.count || 2048;
                    l.algorithm = l.algorithm || l.encAlgorithm || 'aes128';
                    'useMac' in l || (l.useMac = !0);
                    'localKeyId' in l || (l.localKeyId = null);
                    'generateLocalKeyId' in l || (l.generateLocalKeyId = !0);
                    var g = l.localKeyId,
                        k;
                    if (null !== g) g = a.util.hexToBytes(g);
                    else if (l.generateLocalKeyId)
                        if (d) {
                            var h = a.util.isArray(d) ? d[0] : d;
                            'string' === typeof h && (h = e.certificateFromPem(h));
                            g = a.md.sha1.create();
                            g.update(b.toDer(e.certificateToAsn1(h)).getBytes());
                            g = g.digest().getBytes();
                        } else g = a.random.getBytes(20);
                    h = [];
                    null !== g &&
                        h.push(
                            b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                                b.create(b.Class.UNIVERSAL, b.Type.OID, !1, b.oidToDer(e.oids.localKeyId).getBytes()),
                                b.create(b.Class.UNIVERSAL, b.Type.SET, !0, [
                                    b.create(b.Class.UNIVERSAL, b.Type.OCTETSTRING, !1, g),
                                ]),
                            ]),
                        );
                    'friendlyName' in l &&
                        h.push(
                            b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                                b.create(b.Class.UNIVERSAL, b.Type.OID, !1, b.oidToDer(e.oids.friendlyName).getBytes()),
                                b.create(b.Class.UNIVERSAL, b.Type.SET, !0, [
                                    b.create(b.Class.UNIVERSAL, b.Type.BMPSTRING, !1, l.friendlyName),
                                ]),
                            ]),
                        );
                    0 < h.length && (k = b.create(b.Class.UNIVERSAL, b.Type.SET, !0, h));
                    g = [];
                    h = [];
                    null !== d && (h = a.util.isArray(d) ? d : [d]);
                    for (var m = [], q = 0; q < h.length; ++q) {
                        d = h[q];
                        'string' === typeof d && (d = e.certificateFromPem(d));
                        var x = 0 === q ? k : void 0;
                        d = e.certificateToAsn1(d);
                        d = b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                            b.create(b.Class.UNIVERSAL, b.Type.OID, !1, b.oidToDer(e.oids.certBag).getBytes()),
                            b.create(b.Class.CONTEXT_SPECIFIC, 0, !0, [
                                b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                                    b.create(
                                        b.Class.UNIVERSAL,
                                        b.Type.OID,
                                        !1,
                                        b.oidToDer(e.oids.x509Certificate).getBytes(),
                                    ),
                                    b.create(b.Class.CONTEXT_SPECIFIC, 0, !0, [
                                        b.create(b.Class.UNIVERSAL, b.Type.OCTETSTRING, !1, b.toDer(d).getBytes()),
                                    ]),
                                ]),
                            ]),
                            x,
                        ]);
                        m.push(d);
                    }
                    0 < m.length &&
                        ((d = b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, m)),
                        (d = b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                            b.create(b.Class.UNIVERSAL, b.Type.OID, !1, b.oidToDer(e.oids.data).getBytes()),
                            b.create(b.Class.CONTEXT_SPECIFIC, 0, !0, [
                                b.create(b.Class.UNIVERSAL, b.Type.OCTETSTRING, !1, b.toDer(d).getBytes()),
                            ]),
                        ])),
                        g.push(d));
                    null !== c &&
                        ((c = e.wrapRsaPrivateKey(e.privateKeyToAsn1(c))),
                        (c =
                            null === f
                                ? b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                                      b.create(b.Class.UNIVERSAL, b.Type.OID, !1, b.oidToDer(e.oids.keyBag).getBytes()),
                                      b.create(b.Class.CONTEXT_SPECIFIC, 0, !0, [c]),
                                      k,
                                  ])
                                : b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                                      b.create(
                                          b.Class.UNIVERSAL,
                                          b.Type.OID,
                                          !1,
                                          b.oidToDer(e.oids.pkcs8ShroudedKeyBag).getBytes(),
                                      ),
                                      b.create(b.Class.CONTEXT_SPECIFIC, 0, !0, [e.encryptPrivateKeyInfo(c, f, l)]),
                                      k,
                                  ])),
                        (c = b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [c])),
                        (c = b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                            b.create(b.Class.UNIVERSAL, b.Type.OID, !1, b.oidToDer(e.oids.data).getBytes()),
                            b.create(b.Class.CONTEXT_SPECIFIC, 0, !0, [
                                b.create(b.Class.UNIVERSAL, b.Type.OCTETSTRING, !1, b.toDer(c).getBytes()),
                            ]),
                        ])),
                        g.push(c));
                    k = b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, g);
                    if (l.useMac) {
                        g = a.md.sha1.create();
                        var v = new a.util.ByteBuffer(a.random.getBytes(l.saltSize));
                        l = l.count;
                        c = w.generateKey(f, v, 3, l, 20);
                        f = a.hmac.create();
                        f.start(g, c);
                        f.update(b.toDer(k).getBytes());
                        f = f.getMac();
                        v = b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                            b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                                b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                                    b.create(b.Class.UNIVERSAL, b.Type.OID, !1, b.oidToDer(e.oids.sha1).getBytes()),
                                    b.create(b.Class.UNIVERSAL, b.Type.NULL, !1, ''),
                                ]),
                                b.create(b.Class.UNIVERSAL, b.Type.OCTETSTRING, !1, f.getBytes()),
                            ]),
                            b.create(b.Class.UNIVERSAL, b.Type.OCTETSTRING, !1, v.getBytes()),
                            b.create(b.Class.UNIVERSAL, b.Type.INTEGER, !1, b.integerToDer(l).getBytes()),
                        ]);
                    }
                    return b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                        b.create(b.Class.UNIVERSAL, b.Type.INTEGER, !1, b.integerToDer(3).getBytes()),
                        b.create(b.Class.UNIVERSAL, b.Type.SEQUENCE, !0, [
                            b.create(b.Class.UNIVERSAL, b.Type.OID, !1, b.oidToDer(e.oids.data).getBytes()),
                            b.create(b.Class.CONTEXT_SPECIFIC, 0, !0, [
                                b.create(b.Class.UNIVERSAL, b.Type.OCTETSTRING, !1, b.toDer(k).getBytes()),
                            ]),
                        ]),
                        v,
                    ]);
                };
                w.generateKey = a.pbe.generatePkcs12Key;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.pkcs12) return d.pkcs12;
                        d.defined.pkcs12 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pkcs12;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t(
                'js/pkcs12',
                'require module ./asn1 ./hmac ./oids ./pkcs7asn1 ./pbe ./random ./rsa ./sha1 ./util ./x509'.split(' '),
                function () {
                    C.apply(null, Array.prototype.slice.call(arguments, 0));
                },
            );
        })();
        (function () {
            function p(a) {
                var g = a.asn1,
                    d = (a.pki = a.pki || {});
                d.pemToDer = function (d) {
                    d = a.pem.decode(d)[0];
                    if (d.procType && 'ENCRYPTED' === d.procType.type)
                        throw Error('Could not convert PEM to DER; PEM is encrypted.');
                    return a.util.createBuffer(d.body);
                };
                d.privateKeyFromPem = function (p) {
                    p = a.pem.decode(p)[0];
                    if ('PRIVATE KEY' !== p.type && 'RSA PRIVATE KEY' !== p.type) {
                        var h = Error(
                            'Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".',
                        );
                        h.headerType = p.type;
                        throw h;
                    }
                    if (p.procType && 'ENCRYPTED' === p.procType.type)
                        throw Error('Could not convert private key from PEM; PEM is encrypted.');
                    p = g.fromDer(p.body);
                    return d.privateKeyFromAsn1(p);
                };
                d.privateKeyToPem = function (p, h) {
                    var f = { type: 'RSA PRIVATE KEY', body: g.toDer(d.privateKeyToAsn1(p)).getBytes() };
                    return a.pem.encode(f, { maxline: h });
                };
                d.privateKeyInfoToPem = function (d, h) {
                    var f = { type: 'PRIVATE KEY', body: g.toDer(d).getBytes() };
                    return a.pem.encode(f, { maxline: h });
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.pki) return d.pki;
                        d.defined.pki = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pki;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t(
                'js/pki',
                'require module ./asn1 ./oids ./pbe ./pem ./pbkdf2 ./pkcs12 ./pss ./rsa ./util ./x509'.split(' '),
                function () {
                    C.apply(null, Array.prototype.slice.call(arguments, 0));
                },
            );
        })();
        (function () {
            function p(a) {
                var g = function (b, c, e, d) {
                        var f = a.util.createBuffer(),
                            l = b.length >> 1,
                            g = l + (b.length & 1),
                            k = b.substr(0, g);
                        g = b.substr(l, g);
                        b = a.util.createBuffer();
                        l = a.hmac.create();
                        e = c + e;
                        var m = Math.ceil(d / 16);
                        c = Math.ceil(d / 20);
                        l.start('MD5', k);
                        k = a.util.createBuffer();
                        b.putBytes(e);
                        for (var h = 0; h < m; ++h)
                            l.start(null, null),
                                l.update(b.getBytes()),
                                b.putBuffer(l.digest()),
                                l.start(null, null),
                                l.update(b.bytes() + e),
                                k.putBuffer(l.digest());
                        l.start('SHA1', g);
                        g = a.util.createBuffer();
                        b.clear();
                        b.putBytes(e);
                        for (h = 0; h < c; ++h)
                            l.start(null, null),
                                l.update(b.getBytes()),
                                b.putBuffer(l.digest()),
                                l.start(null, null),
                                l.update(b.bytes() + e),
                                g.putBuffer(l.digest());
                        f.putBytes(a.util.xorBytes(k.getBytes(), g.getBytes(), d));
                        return f;
                    },
                    d = function (b, c, e) {
                        e = !1;
                        try {
                            var d = b.deflate(c.fragment.getBytes());
                            c.fragment = a.util.createBuffer(d);
                            c.length = d.length;
                            e = !0;
                        } catch (O) {}
                        return e;
                    },
                    p = function (b, c, e) {
                        e = !1;
                        try {
                            var d = b.inflate(c.fragment.getBytes());
                            c.fragment = a.util.createBuffer(d);
                            c.length = d.length;
                            e = !0;
                        } catch (O) {}
                        return e;
                    },
                    h = function (b, c) {
                        var e = 0;
                        switch (c) {
                            case 1:
                                e = b.getByte();
                                break;
                            case 2:
                                e = b.getInt16();
                                break;
                            case 3:
                                e = b.getInt24();
                                break;
                            case 4:
                                e = b.getInt32();
                        }
                        return a.util.createBuffer(b.getBytes(e));
                    },
                    f = function (a, b, c) {
                        a.putInt(c.length(), b << 3);
                        a.putBuffer(c);
                    },
                    b = {
                        Versions: {
                            TLS_1_0: { major: 3, minor: 1 },
                            TLS_1_1: { major: 3, minor: 2 },
                            TLS_1_2: { major: 3, minor: 3 },
                        },
                    };
                b.SupportedVersions = [b.Versions.TLS_1_1, b.Versions.TLS_1_0];
                b.Version = b.SupportedVersions[0];
                b.MaxFragment = 15360;
                b.ConnectionEnd = { server: 0, client: 1 };
                b.PRFAlgorithm = { tls_prf_sha256: 0 };
                b.BulkCipherAlgorithm = { none: null, rc4: 0, des3: 1, aes: 2 };
                b.CipherType = { stream: 0, block: 1, aead: 2 };
                b.MACAlgorithm = {
                    none: null,
                    hmac_md5: 0,
                    hmac_sha1: 1,
                    hmac_sha256: 2,
                    hmac_sha384: 3,
                    hmac_sha512: 4,
                };
                b.CompressionMethod = { none: 0, deflate: 1 };
                b.ContentType = {
                    change_cipher_spec: 20,
                    alert: 21,
                    handshake: 22,
                    application_data: 23,
                    heartbeat: 24,
                };
                b.HandshakeType = {
                    hello_request: 0,
                    client_hello: 1,
                    server_hello: 2,
                    certificate: 11,
                    server_key_exchange: 12,
                    certificate_request: 13,
                    server_hello_done: 14,
                    certificate_verify: 15,
                    client_key_exchange: 16,
                    finished: 20,
                };
                b.Alert = {};
                b.Alert.Level = { warning: 1, fatal: 2 };
                b.Alert.Description = {
                    close_notify: 0,
                    unexpected_message: 10,
                    bad_record_mac: 20,
                    decryption_failed: 21,
                    record_overflow: 22,
                    decompression_failure: 30,
                    handshake_failure: 40,
                    bad_certificate: 42,
                    unsupported_certificate: 43,
                    certificate_revoked: 44,
                    certificate_expired: 45,
                    certificate_unknown: 46,
                    illegal_parameter: 47,
                    unknown_ca: 48,
                    access_denied: 49,
                    decode_error: 50,
                    decrypt_error: 51,
                    export_restriction: 60,
                    protocol_version: 70,
                    insufficient_security: 71,
                    internal_error: 80,
                    user_canceled: 90,
                    no_renegotiation: 100,
                };
                b.HeartbeatMessageType = { heartbeat_request: 1, heartbeat_response: 2 };
                b.CipherSuites = {};
                b.getCipherSuite = function (a) {
                    var c = null,
                        e;
                    for (e in b.CipherSuites) {
                        var d = b.CipherSuites[e];
                        if (d.id[0] === a.charCodeAt(0) && d.id[1] === a.charCodeAt(1)) {
                            c = d;
                            break;
                        }
                    }
                    return c;
                };
                b.handleUnexpected = function (a, c) {
                    (a.open || a.entity !== b.ConnectionEnd.client) &&
                        a.error(a, {
                            message: 'Unexpected message. Received TLS record out of order.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.unexpected_message },
                        });
                };
                b.handleHelloRequest = function (a, c, e) {
                    !a.handshaking &&
                        0 < a.handshakes &&
                        (b.queue(
                            a,
                            b.createAlert(a, {
                                level: b.Alert.Level.warning,
                                description: b.Alert.Description.no_renegotiation,
                            }),
                        ),
                        b.flush(a));
                    a.process();
                };
                b.parseHelloMessage = function (c, e, d) {
                    var f = null,
                        l = c.entity === b.ConnectionEnd.client;
                    if (38 > d)
                        c.error(c, {
                            message: l
                                ? 'Invalid ServerHello message. Message too short.'
                                : 'Invalid ClientHello message. Message too short.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.illegal_parameter },
                        });
                    else {
                        e = e.fragment;
                        var g = e.length();
                        f = {
                            version: { major: e.getByte(), minor: e.getByte() },
                            random: a.util.createBuffer(e.getBytes(32)),
                            session_id: h(e, 1),
                            extensions: [],
                        };
                        l
                            ? ((f.cipher_suite = e.getBytes(2)), (f.compression_method = e.getByte()))
                            : ((f.cipher_suites = h(e, 2)), (f.compression_methods = h(e, 1)));
                        g = d - (g - e.length());
                        if (0 < g) {
                            for (d = h(e, 2); 0 < d.length(); )
                                f.extensions.push({ type: [d.getByte(), d.getByte()], data: h(d, 2) });
                            if (!l)
                                for (d = 0; d < f.extensions.length; ++d)
                                    if (((e = f.extensions[d]), 0 === e.type[0] && 0 === e.type[1]))
                                        for (e = h(e.data, 2); 0 < e.length() && 0 === e.getByte(); )
                                            c.session.extensions.server_name.serverNameList.push(h(e, 2).getBytes());
                        }
                        if (
                            c.session.version &&
                            (f.version.major !== c.session.version.major || f.version.minor !== c.session.version.minor)
                        )
                            return c.error(c, {
                                message: 'TLS version change is disallowed during renegotiation.',
                                send: !0,
                                alert: {
                                    level: b.Alert.Level.fatal,
                                    description: b.Alert.Description.protocol_version,
                                },
                            });
                        if (l) c.session.cipherSuite = b.getCipherSuite(f.cipher_suite);
                        else
                            for (
                                d = a.util.createBuffer(f.cipher_suites.bytes());
                                0 < d.length() &&
                                ((c.session.cipherSuite = b.getCipherSuite(d.getBytes(2))),
                                null === c.session.cipherSuite);

                            );
                        if (null === c.session.cipherSuite)
                            return c.error(c, {
                                message: 'No cipher suites in common.',
                                send: !0,
                                alert: {
                                    level: b.Alert.Level.fatal,
                                    description: b.Alert.Description.handshake_failure,
                                },
                                cipherSuite: a.util.bytesToHex(f.cipher_suite),
                            });
                        c.session.compressionMethod = l ? f.compression_method : b.CompressionMethod.none;
                    }
                    return f;
                };
                b.createSecurityParameters = function (a, c) {
                    var e = a.entity === b.ConnectionEnd.client,
                        d = c.random.bytes(),
                        f = e ? a.session.sp.client_random : d;
                    e = e ? d : b.createRandom().getBytes();
                    a.session.sp = {
                        entity: a.entity,
                        prf_algorithm: b.PRFAlgorithm.tls_prf_sha256,
                        bulk_cipher_algorithm: null,
                        cipher_type: null,
                        enc_key_length: null,
                        block_length: null,
                        fixed_iv_length: null,
                        record_iv_length: null,
                        mac_algorithm: null,
                        mac_length: null,
                        mac_key_length: null,
                        compression_algorithm: a.session.compressionMethod,
                        pre_master_secret: null,
                        master_secret: null,
                        client_random: f,
                        server_random: e,
                    };
                };
                b.handleServerHello = function (a, c, d) {
                    c = b.parseHelloMessage(a, c, d);
                    if (!a.fail) {
                        if (c.version.minor <= a.version.minor) a.version.minor = c.version.minor;
                        else
                            return a.error(a, {
                                message: 'Incompatible TLS version.',
                                send: !0,
                                alert: {
                                    level: b.Alert.Level.fatal,
                                    description: b.Alert.Description.protocol_version,
                                },
                            });
                        a.session.version = a.version;
                        d = c.session_id.bytes();
                        0 < d.length && d === a.session.id
                            ? ((a.expect = v),
                              (a.session.resuming = !0),
                              (a.session.sp.server_random = c.random.bytes()))
                            : ((a.expect = e), (a.session.resuming = !1), b.createSecurityParameters(a, c));
                        a.session.id = d;
                        a.process();
                    }
                };
                b.handleClientHello = function (c, e, d) {
                    e = b.parseHelloMessage(c, e, d);
                    if (!c.fail) {
                        var f = e.session_id.bytes();
                        d = null;
                        if (c.sessionCache)
                            if (((d = c.sessionCache.getSession(f)), null === d)) f = '';
                            else if (d.version.major !== e.version.major || d.version.minor > e.version.minor)
                                (d = null), (f = '');
                        0 === f.length && (f = a.random.getBytes(32));
                        c.session.id = f;
                        c.session.clientHelloVersion = e.version;
                        c.session.sp = {};
                        if (d) (c.version = c.session.version = d.version), (c.session.sp = d.sp);
                        else {
                            for (f = 1; f < b.SupportedVersions.length; ++f) {
                                var l = b.SupportedVersions[f];
                                if (l.minor <= e.version.minor) break;
                            }
                            c.version = { major: l.major, minor: l.minor };
                            c.session.version = c.version;
                        }
                        null !== d
                            ? ((c.expect = r),
                              (c.session.resuming = !0),
                              (c.session.sp.client_random = e.random.bytes()))
                            : ((c.expect = !1 !== c.verifyClient ? D : A),
                              (c.session.resuming = !1),
                              b.createSecurityParameters(c, e));
                        c.open = !0;
                        b.queue(c, b.createRecord(c, { type: b.ContentType.handshake, data: b.createServerHello(c) }));
                        c.session.resuming
                            ? (b.queue(
                                  c,
                                  b.createRecord(c, {
                                      type: b.ContentType.change_cipher_spec,
                                      data: b.createChangeCipherSpec(),
                                  }),
                              ),
                              (c.state.pending = b.createConnectionState(c)),
                              (c.state.current.write = c.state.pending.write),
                              b.queue(
                                  c,
                                  b.createRecord(c, { type: b.ContentType.handshake, data: b.createFinished(c) }),
                              ))
                            : (b.queue(
                                  c,
                                  b.createRecord(c, { type: b.ContentType.handshake, data: b.createCertificate(c) }),
                              ),
                              c.fail ||
                                  (b.queue(
                                      c,
                                      b.createRecord(c, {
                                          type: b.ContentType.handshake,
                                          data: b.createServerKeyExchange(c),
                                      }),
                                  ),
                                  !1 !== c.verifyClient &&
                                      b.queue(
                                          c,
                                          b.createRecord(c, {
                                              type: b.ContentType.handshake,
                                              data: b.createCertificateRequest(c),
                                          }),
                                      ),
                                  b.queue(
                                      c,
                                      b.createRecord(c, {
                                          type: b.ContentType.handshake,
                                          data: b.createServerHelloDone(c),
                                      }),
                                  )));
                        b.flush(c);
                        c.process();
                    }
                };
                b.handleCertificate = function (c, e, d) {
                    if (3 > d)
                        return c.error(c, {
                            message: 'Invalid Certificate message. Message too short.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.illegal_parameter },
                        });
                    d = h(e.fragment, 3);
                    e = [];
                    try {
                        for (; 0 < d.length(); ) {
                            var f = h(d, 3);
                            var l = a.asn1.fromDer(f);
                            f = a.pki.certificateFromAsn1(l, !0);
                            e.push(f);
                        }
                    } catch (R) {
                        return c.error(c, {
                            message: 'Could not parse certificate list.',
                            cause: R,
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.bad_certificate },
                        });
                    }
                    f = c.entity === b.ConnectionEnd.client;
                    (!f && !0 !== c.verifyClient) || 0 !== e.length
                        ? 0 === e.length
                            ? (c.expect = f ? w : A)
                            : (f ? (c.session.serverCertificate = e[0]) : (c.session.clientCertificate = e[0]),
                              b.verifyCertificateChain(c, e) && (c.expect = f ? w : A))
                        : c.error(c, {
                              message: f ? 'No server certificate provided.' : 'No client certificate provided.',
                              send: !0,
                              alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.illegal_parameter },
                          });
                    c.process();
                };
                b.handleServerKeyExchange = function (a, c, e) {
                    if (0 < e)
                        return a.error(a, {
                            message: 'Invalid key parameters. Only RSA is supported.',
                            send: !0,
                            alert: {
                                level: b.Alert.Level.fatal,
                                description: b.Alert.Description.unsupported_certificate,
                            },
                        });
                    a.expect = k;
                    a.process();
                };
                b.handleClientKeyExchange = function (c, e, d) {
                    if (48 > d)
                        return c.error(c, {
                            message: 'Invalid key parameters. Only RSA is supported.',
                            send: !0,
                            alert: {
                                level: b.Alert.Level.fatal,
                                description: b.Alert.Description.unsupported_certificate,
                            },
                        });
                    e = h(e.fragment, 2).getBytes();
                    d = null;
                    if (c.getPrivateKey)
                        try {
                            (d = c.getPrivateKey(c, c.session.serverCertificate)), (d = a.pki.privateKeyFromPem(d));
                        } catch (R) {
                            c.error(c, {
                                message: 'Could not get private key.',
                                cause: R,
                                send: !0,
                                alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.internal_error },
                            });
                        }
                    if (null === d)
                        return c.error(c, {
                            message: 'No private key set.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.internal_error },
                        });
                    try {
                        var f = c.session.sp;
                        f.pre_master_secret = d.decrypt(e);
                        var g = c.session.clientHelloVersion;
                        if (
                            g.major !== f.pre_master_secret.charCodeAt(0) ||
                            g.minor !== f.pre_master_secret.charCodeAt(1)
                        )
                            throw Error('TLS version rollback attack detected.');
                    } catch (R) {
                        f.pre_master_secret = a.random.getBytes(48);
                    }
                    c.expect = r;
                    null !== c.session.clientCertificate && (c.expect = l);
                    c.process();
                };
                b.handleCertificateRequest = function (a, c, e) {
                    if (3 > e)
                        return a.error(a, {
                            message: 'Invalid CertificateRequest. Message too short.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.illegal_parameter },
                        });
                    c = c.fragment;
                    c = { certificate_types: h(c, 1), certificate_authorities: h(c, 2) };
                    a.session.certificateRequest = c;
                    a.expect = u;
                    a.process();
                };
                b.handleCertificateVerify = function (c, e, d) {
                    if (2 > d)
                        return c.error(c, {
                            message: 'Invalid CertificateVerify. Message too short.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.illegal_parameter },
                        });
                    d = e.fragment;
                    d.read -= 4;
                    e = d.bytes();
                    d.read += 4;
                    d = h(d, 2).getBytes();
                    var f = a.util.createBuffer();
                    f.putBuffer(c.session.md5.digest());
                    f.putBuffer(c.session.sha1.digest());
                    f = f.getBytes();
                    try {
                        if (!c.session.clientCertificate.publicKey.verify(f, d, 'NONE'))
                            throw Error('CertificateVerify signature does not match.');
                        c.session.md5.update(e);
                        c.session.sha1.update(e);
                    } catch (O) {
                        return c.error(c, {
                            message: 'Bad signature in CertificateVerify.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.handshake_failure },
                        });
                    }
                    c.expect = r;
                    c.process();
                };
                b.handleServerHelloDone = function (c, e, d) {
                    if (0 < d)
                        return c.error(c, {
                            message: 'Invalid ServerHelloDone message. Invalid length.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.record_overflow },
                        });
                    if (
                        null === c.serverCertificate &&
                        ((e = {
                            message: 'No server certificate provided. Not enough security.',
                            send: !0,
                            alert: {
                                level: b.Alert.Level.fatal,
                                description: b.Alert.Description.insufficient_security,
                            },
                        }),
                        (d = c.verify(c, e.alert.description, 0, [])),
                        !0 !== d)
                    ) {
                        if (d || 0 === d)
                            'object' !== typeof d || a.util.isArray(d)
                                ? 'number' === typeof d && (e.alert.description = d)
                                : (d.message && (e.message = d.message), d.alert && (e.alert.description = d.alert));
                        return c.error(c, e);
                    }
                    null !== c.session.certificateRequest &&
                        ((e = b.createRecord(c, { type: b.ContentType.handshake, data: b.createCertificate(c) })),
                        b.queue(c, e));
                    e = b.createRecord(c, { type: b.ContentType.handshake, data: b.createClientKeyExchange(c) });
                    b.queue(c, e);
                    c.expect = x;
                    e = function (a, c) {
                        null !== a.session.certificateRequest &&
                            null !== a.session.clientCertificate &&
                            b.queue(
                                a,
                                b.createRecord(a, {
                                    type: b.ContentType.handshake,
                                    data: b.createCertificateVerify(a, c),
                                }),
                            );
                        b.queue(
                            a,
                            b.createRecord(a, {
                                type: b.ContentType.change_cipher_spec,
                                data: b.createChangeCipherSpec(),
                            }),
                        );
                        a.state.pending = b.createConnectionState(a);
                        a.state.current.write = a.state.pending.write;
                        b.queue(a, b.createRecord(a, { type: b.ContentType.handshake, data: b.createFinished(a) }));
                        a.expect = v;
                        b.flush(a);
                        a.process();
                    };
                    if (null === c.session.certificateRequest || null === c.session.clientCertificate)
                        return e(c, null);
                    b.getClientSignature(c, e);
                };
                b.handleChangeCipherSpec = function (a, e) {
                    if (1 !== e.fragment.getByte())
                        return a.error(a, {
                            message: 'Invalid ChangeCipherSpec message received.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.illegal_parameter },
                        });
                    var d = a.entity === b.ConnectionEnd.client;
                    if ((a.session.resuming && d) || (!a.session.resuming && !d))
                        a.state.pending = b.createConnectionState(a);
                    a.state.current.read = a.state.pending.read;
                    if ((!a.session.resuming && d) || (a.session.resuming && !d)) a.state.pending = null;
                    a.expect = d ? c : n;
                    a.process();
                };
                b.handleFinished = function (c, e, d) {
                    d = e.fragment;
                    d.read -= 4;
                    var f = d.bytes();
                    d.read += 4;
                    e = e.fragment.getBytes();
                    d = a.util.createBuffer();
                    d.putBuffer(c.session.md5.digest());
                    d.putBuffer(c.session.sha1.digest());
                    var l = c.entity === b.ConnectionEnd.client;
                    d = g(c.session.sp.master_secret, l ? 'server finished' : 'client finished', d.getBytes(), 12);
                    if (d.getBytes() !== e)
                        return c.error(c, {
                            message: 'Invalid verify_data in Finished message.',
                            send: !0,
                            alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.decrypt_error },
                        });
                    c.session.md5.update(f);
                    c.session.sha1.update(f);
                    if ((c.session.resuming && l) || (!c.session.resuming && !l))
                        b.queue(
                            c,
                            b.createRecord(c, {
                                type: b.ContentType.change_cipher_spec,
                                data: b.createChangeCipherSpec(),
                            }),
                        ),
                            (c.state.current.write = c.state.pending.write),
                            (c.state.pending = null),
                            b.queue(c, b.createRecord(c, { type: b.ContentType.handshake, data: b.createFinished(c) }));
                    c.expect = l ? q : F;
                    c.handshaking = !1;
                    ++c.handshakes;
                    c.peerCertificate = l ? c.session.serverCertificate : c.session.clientCertificate;
                    b.flush(c);
                    c.isConnected = !0;
                    c.connected(c);
                    c.process();
                };
                b.handleAlert = function (a, c) {
                    var e = c.fragment;
                    e = { level: e.getByte(), description: e.getByte() };
                    switch (e.description) {
                        case b.Alert.Description.close_notify:
                            var d = 'Connection closed.';
                            break;
                        case b.Alert.Description.unexpected_message:
                            d = 'Unexpected message.';
                            break;
                        case b.Alert.Description.bad_record_mac:
                            d = 'Bad record MAC.';
                            break;
                        case b.Alert.Description.decryption_failed:
                            d = 'Decryption failed.';
                            break;
                        case b.Alert.Description.record_overflow:
                            d = 'Record overflow.';
                            break;
                        case b.Alert.Description.decompression_failure:
                            d = 'Decompression failed.';
                            break;
                        case b.Alert.Description.handshake_failure:
                            d = 'Handshake failure.';
                            break;
                        case b.Alert.Description.bad_certificate:
                            d = 'Bad certificate.';
                            break;
                        case b.Alert.Description.unsupported_certificate:
                            d = 'Unsupported certificate.';
                            break;
                        case b.Alert.Description.certificate_revoked:
                            d = 'Certificate revoked.';
                            break;
                        case b.Alert.Description.certificate_expired:
                            d = 'Certificate expired.';
                            break;
                        case b.Alert.Description.certificate_unknown:
                            d = 'Certificate unknown.';
                            break;
                        case b.Alert.Description.illegal_parameter:
                            d = 'Illegal parameter.';
                            break;
                        case b.Alert.Description.unknown_ca:
                            d = 'Unknown certificate authority.';
                            break;
                        case b.Alert.Description.access_denied:
                            d = 'Access denied.';
                            break;
                        case b.Alert.Description.decode_error:
                            d = 'Decode error.';
                            break;
                        case b.Alert.Description.decrypt_error:
                            d = 'Decrypt error.';
                            break;
                        case b.Alert.Description.export_restriction:
                            d = 'Export restriction.';
                            break;
                        case b.Alert.Description.protocol_version:
                            d = 'Unsupported protocol version.';
                            break;
                        case b.Alert.Description.insufficient_security:
                            d = 'Insufficient security.';
                            break;
                        case b.Alert.Description.internal_error:
                            d = 'Internal error.';
                            break;
                        case b.Alert.Description.user_canceled:
                            d = 'User canceled.';
                            break;
                        case b.Alert.Description.no_renegotiation:
                            d = 'Renegotiation not supported.';
                            break;
                        default:
                            d = 'Unknown error.';
                    }
                    if (e.description === b.Alert.Description.close_notify) return a.close();
                    a.error(a, {
                        message: d,
                        send: !1,
                        origin: a.entity === b.ConnectionEnd.client ? 'server' : 'client',
                        alert: e,
                    });
                    a.process();
                };
                b.handleHandshake = function (c, e) {
                    var d = e.fragment,
                        f = d.getByte(),
                        l = d.getInt24();
                    if (l > d.length())
                        return (c.fragmented = e), (e.fragment = a.util.createBuffer()), (d.read -= 4), c.process();
                    c.fragmented = null;
                    d.read -= 4;
                    var g = d.bytes(l + 4);
                    d.read += 4;
                    f in C[c.entity][c.expect]
                        ? (c.entity !== b.ConnectionEnd.server ||
                              c.open ||
                              c.fail ||
                              ((c.handshaking = !0),
                              (c.session = {
                                  version: null,
                                  extensions: { server_name: { serverNameList: [] } },
                                  cipherSuite: null,
                                  compressionMethod: null,
                                  serverCertificate: null,
                                  clientCertificate: null,
                                  md5: a.md.md5.create(),
                                  sha1: a.md.sha1.create(),
                              })),
                          f !== b.HandshakeType.hello_request &&
                              f !== b.HandshakeType.certificate_verify &&
                              f !== b.HandshakeType.finished &&
                              (c.session.md5.update(g), c.session.sha1.update(g)),
                          C[c.entity][c.expect][f](c, e, l))
                        : b.handleUnexpected(c, e);
                };
                b.handleApplicationData = function (a, b) {
                    a.data.putBuffer(b.fragment);
                    a.dataReady(a);
                    a.process();
                };
                b.handleHeartbeat = function (c, e) {
                    var d = e.fragment,
                        f = d.getByte(),
                        l = d.getInt16();
                    d = d.getBytes(l);
                    if (f === b.HeartbeatMessageType.heartbeat_request) {
                        if (c.handshaking || l > d.length) return c.process();
                        b.queue(
                            c,
                            b.createRecord(c, {
                                type: b.ContentType.heartbeat,
                                data: b.createHeartbeat(b.HeartbeatMessageType.heartbeat_response, d),
                            }),
                        );
                        b.flush(c);
                    } else if (f === b.HeartbeatMessageType.heartbeat_response) {
                        if (d !== c.expectedHeartbeatPayload) return c.process();
                        c.heartbeatReceived && c.heartbeatReceived(c, a.util.createBuffer(d));
                    }
                    c.process();
                };
                var e = 1,
                    w = 2,
                    k = 3,
                    u = 4,
                    v = 5,
                    c = 6,
                    q = 7,
                    x = 8,
                    D = 1,
                    A = 2,
                    l = 3,
                    r = 4,
                    n = 5,
                    F = 6,
                    m = b.handleUnexpected,
                    t = b.handleChangeCipherSpec,
                    M = b.handleAlert,
                    I = b.handleHandshake,
                    Q = b.handleApplicationData,
                    y = b.handleHeartbeat,
                    z = [];
                z[b.ConnectionEnd.client] = [
                    [m, M, I, m, y],
                    [m, M, I, m, y],
                    [m, M, I, m, y],
                    [m, M, I, m, y],
                    [m, M, I, m, y],
                    [t, M, m, m, y],
                    [m, M, I, m, y],
                    [m, M, I, Q, y],
                    [m, M, I, m, y],
                ];
                z[b.ConnectionEnd.server] = [
                    [m, M, I, m, y],
                    [m, M, I, m, y],
                    [m, M, I, m, y],
                    [m, M, I, m, y],
                    [t, M, m, m, y],
                    [m, M, I, m, y],
                    [m, M, I, Q, y],
                    [m, M, I, m, y],
                ];
                t = b.handleHelloRequest;
                M = b.handleCertificate;
                I = b.handleServerKeyExchange;
                Q = b.handleCertificateRequest;
                y = b.handleServerHelloDone;
                var B = b.handleFinished,
                    C = [];
                C[b.ConnectionEnd.client] = [
                    [m, m, b.handleServerHello, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m],
                    [t, m, m, m, m, m, m, m, m, m, m, M, I, Q, y, m, m, m, m, m, m],
                    [t, m, m, m, m, m, m, m, m, m, m, m, I, Q, y, m, m, m, m, m, m],
                    [t, m, m, m, m, m, m, m, m, m, m, m, m, Q, y, m, m, m, m, m, m],
                    [t, m, m, m, m, m, m, m, m, m, m, m, m, m, y, m, m, m, m, m, m],
                    [t, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m],
                    [t, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, B],
                    [t, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m],
                    [t, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m],
                ];
                C[b.ConnectionEnd.server] = [
                    [m, b.handleClientHello, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m],
                    [m, m, m, m, m, m, m, m, m, m, m, M, m, m, m, m, m, m, m, m, m],
                    [m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, b.handleClientKeyExchange, m, m, m, m],
                    [m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, b.handleCertificateVerify, m, m, m, m, m],
                    [m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m],
                    [m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, B],
                    [m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m],
                    [m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m],
                ];
                b.generateKeys = function (a, c) {
                    var e = c.client_random + c.server_random;
                    a.session.resuming ||
                        ((c.master_secret = g(c.pre_master_secret, 'master secret', e, 48).bytes()),
                        (c.pre_master_secret = null));
                    e = c.server_random + c.client_random;
                    var d = 2 * c.mac_key_length + 2 * c.enc_key_length,
                        f =
                            a.version.major === b.Versions.TLS_1_0.major &&
                            a.version.minor === b.Versions.TLS_1_0.minor;
                    f && (d += 2 * c.fixed_iv_length);
                    e = g(c.master_secret, 'key expansion', e, d);
                    d = {
                        client_write_MAC_key: e.getBytes(c.mac_key_length),
                        server_write_MAC_key: e.getBytes(c.mac_key_length),
                        client_write_key: e.getBytes(c.enc_key_length),
                        server_write_key: e.getBytes(c.enc_key_length),
                    };
                    f &&
                        ((d.client_write_IV = e.getBytes(c.fixed_iv_length)),
                        (d.server_write_IV = e.getBytes(c.fixed_iv_length)));
                    return d;
                };
                b.createConnectionState = function (a) {
                    var c = a.entity === b.ConnectionEnd.client,
                        e = function () {
                            var a = {
                                sequenceNumber: [0, 0],
                                macKey: null,
                                macLength: 0,
                                macFunction: null,
                                cipherState: null,
                                cipherFunction: function (a) {
                                    return !0;
                                },
                                compressionState: null,
                                compressFunction: function (a) {
                                    return !0;
                                },
                                updateSequenceNumber: function () {
                                    4294967295 === a.sequenceNumber[1]
                                        ? ((a.sequenceNumber[1] = 0), ++a.sequenceNumber[0])
                                        : ++a.sequenceNumber[1];
                                },
                            };
                            return a;
                        },
                        f = { read: e(), write: e() };
                    f.read.update = function (a, c) {
                        f.read.cipherFunction(c, f.read)
                            ? f.read.compressFunction(a, c, f.read) ||
                              a.error(a, {
                                  message: 'Could not decompress record.',
                                  send: !0,
                                  alert: {
                                      level: b.Alert.Level.fatal,
                                      description: b.Alert.Description.decompression_failure,
                                  },
                              })
                            : a.error(a, {
                                  message: 'Could not decrypt record or bad MAC.',
                                  send: !0,
                                  alert: {
                                      level: b.Alert.Level.fatal,
                                      description: b.Alert.Description.bad_record_mac,
                                  },
                              });
                        return !a.fail;
                    };
                    f.write.update = function (a, c) {
                        f.write.compressFunction(a, c, f.write)
                            ? f.write.cipherFunction(c, f.write) ||
                              a.error(a, {
                                  message: 'Could not encrypt record.',
                                  send: !1,
                                  alert: {
                                      level: b.Alert.Level.fatal,
                                      description: b.Alert.Description.internal_error,
                                  },
                              })
                            : a.error(a, {
                                  message: 'Could not compress record.',
                                  send: !1,
                                  alert: {
                                      level: b.Alert.Level.fatal,
                                      description: b.Alert.Description.internal_error,
                                  },
                              });
                        return !a.fail;
                    };
                    if (a.session)
                        switch (
                            ((e = a.session.sp),
                            a.session.cipherSuite.initSecurityParameters(e),
                            (e.keys = b.generateKeys(a, e)),
                            (f.read.macKey = c ? e.keys.server_write_MAC_key : e.keys.client_write_MAC_key),
                            (f.write.macKey = c ? e.keys.client_write_MAC_key : e.keys.server_write_MAC_key),
                            a.session.cipherSuite.initConnectionState(f, a, e),
                            e.compression_algorithm)
                        ) {
                            case b.CompressionMethod.none:
                                break;
                            case b.CompressionMethod.deflate:
                                f.read.compressFunction = p;
                                f.write.compressFunction = d;
                                break;
                            default:
                                throw Error('Unsupported compression algorithm.');
                        }
                    return f;
                };
                b.createRandom = function () {
                    var b = new Date();
                    b = +b + 6e4 * b.getTimezoneOffset();
                    var c = a.util.createBuffer();
                    c.putInt32(b);
                    c.putBytes(a.random.getBytes(28));
                    return c;
                };
                b.createRecord = function (a, b) {
                    return b.data
                        ? {
                              type: b.type,
                              version: { major: a.version.major, minor: a.version.minor },
                              length: b.data.length(),
                              fragment: b.data,
                          }
                        : null;
                };
                b.createAlert = function (c, e) {
                    var d = a.util.createBuffer();
                    d.putByte(e.level);
                    d.putByte(e.description);
                    return b.createRecord(c, { type: b.ContentType.alert, data: d });
                };
                b.createClientHello = function (c) {
                    c.session.clientHelloVersion = { major: c.version.major, minor: c.version.minor };
                    for (var e = a.util.createBuffer(), d = 0; d < c.cipherSuites.length; ++d) {
                        var l = c.cipherSuites[d];
                        e.putByte(l.id[0]);
                        e.putByte(l.id[1]);
                    }
                    var g = e.length();
                    d = a.util.createBuffer();
                    d.putByte(b.CompressionMethod.none);
                    var k = d.length();
                    l = a.util.createBuffer();
                    if (c.virtualHost) {
                        var m = a.util.createBuffer();
                        m.putByte(0);
                        m.putByte(0);
                        var h = a.util.createBuffer();
                        h.putByte(0);
                        f(h, 2, a.util.createBuffer(c.virtualHost));
                        var n = a.util.createBuffer();
                        f(n, 2, h);
                        f(m, 2, n);
                        l.putBuffer(m);
                    }
                    m = l.length();
                    0 < m && (m += 2);
                    h = c.session.id;
                    g = h.length + 1 + 2 + 4 + 28 + 2 + g + 1 + k + m;
                    k = a.util.createBuffer();
                    k.putByte(b.HandshakeType.client_hello);
                    k.putInt24(g);
                    k.putByte(c.version.major);
                    k.putByte(c.version.minor);
                    k.putBytes(c.session.sp.client_random);
                    f(k, 1, a.util.createBuffer(h));
                    f(k, 2, e);
                    f(k, 1, d);
                    0 < m && f(k, 2, l);
                    return k;
                };
                b.createServerHello = function (c) {
                    var e = c.session.id,
                        d = e.length + 1 + 2 + 4 + 28 + 2 + 1,
                        l = a.util.createBuffer();
                    l.putByte(b.HandshakeType.server_hello);
                    l.putInt24(d);
                    l.putByte(c.version.major);
                    l.putByte(c.version.minor);
                    l.putBytes(c.session.sp.server_random);
                    f(l, 1, a.util.createBuffer(e));
                    l.putByte(c.session.cipherSuite.id[0]);
                    l.putByte(c.session.cipherSuite.id[1]);
                    l.putByte(c.session.compressionMethod);
                    return l;
                };
                b.createCertificate = function (c) {
                    var e = c.entity === b.ConnectionEnd.client,
                        d = null;
                    c.getCertificate &&
                        (d = c.getCertificate(
                            c,
                            e ? c.session.certificateRequest : c.session.extensions.server_name.serverNameList,
                        ));
                    var l = a.util.createBuffer();
                    if (null !== d)
                        try {
                            a.util.isArray(d) || (d = [d]);
                            for (var g = null, k = 0; k < d.length; ++k) {
                                var m = a.pem.decode(d[k])[0];
                                if (
                                    'CERTIFICATE' !== m.type &&
                                    'X509 CERTIFICATE' !== m.type &&
                                    'TRUSTED CERTIFICATE' !== m.type
                                ) {
                                    var h = Error(
                                        'Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".',
                                    );
                                    h.headerType = m.type;
                                    throw h;
                                }
                                if (m.procType && 'ENCRYPTED' === m.procType.type)
                                    throw Error('Could not convert certificate from PEM; PEM is encrypted.');
                                var n = a.util.createBuffer(m.body);
                                null === g && (g = a.asn1.fromDer(n.bytes(), !1));
                                var r = a.util.createBuffer();
                                f(r, 3, n);
                                l.putBuffer(r);
                            }
                            d = a.pki.certificateFromAsn1(g);
                            e ? (c.session.clientCertificate = d) : (c.session.serverCertificate = d);
                        } catch (aa) {
                            return c.error(c, {
                                message: 'Could not send certificate list.',
                                cause: aa,
                                send: !0,
                                alert: { level: b.Alert.Level.fatal, description: b.Alert.Description.bad_certificate },
                            });
                        }
                    c = 3 + l.length();
                    e = a.util.createBuffer();
                    e.putByte(b.HandshakeType.certificate);
                    e.putInt24(c);
                    f(e, 3, l);
                    return e;
                };
                b.createClientKeyExchange = function (c) {
                    var e = a.util.createBuffer();
                    e.putByte(c.session.clientHelloVersion.major);
                    e.putByte(c.session.clientHelloVersion.minor);
                    e.putBytes(a.random.getBytes(46));
                    var d = c.session.sp;
                    d.pre_master_secret = e.getBytes();
                    e = c.session.serverCertificate.publicKey.encrypt(d.pre_master_secret);
                    c = e.length + 2;
                    d = a.util.createBuffer();
                    d.putByte(b.HandshakeType.client_key_exchange);
                    d.putInt24(c);
                    d.putInt16(e.length);
                    d.putBytes(e);
                    return d;
                };
                b.createServerKeyExchange = function (b) {
                    return a.util.createBuffer();
                };
                b.getClientSignature = function (c, e) {
                    var d = a.util.createBuffer();
                    d.putBuffer(c.session.md5.digest());
                    d.putBuffer(c.session.sha1.digest());
                    d = d.getBytes();
                    c.getSignature =
                        c.getSignature ||
                        function (c, e, d) {
                            var f = null;
                            if (c.getPrivateKey)
                                try {
                                    (f = c.getPrivateKey(c, c.session.clientCertificate)),
                                        (f = a.pki.privateKeyFromPem(f));
                                } catch (Z) {
                                    c.error(c, {
                                        message: 'Could not get private key.',
                                        cause: Z,
                                        send: !0,
                                        alert: {
                                            level: b.Alert.Level.fatal,
                                            description: b.Alert.Description.internal_error,
                                        },
                                    });
                                }
                            null === f
                                ? c.error(c, {
                                      message: 'No private key set.',
                                      send: !0,
                                      alert: {
                                          level: b.Alert.Level.fatal,
                                          description: b.Alert.Description.internal_error,
                                      },
                                  })
                                : (e = f.sign(e, null));
                            d(c, e);
                        };
                    c.getSignature(c, d, e);
                };
                b.createCertificateVerify = function (c, e) {
                    var d = e.length + 2,
                        f = a.util.createBuffer();
                    f.putByte(b.HandshakeType.certificate_verify);
                    f.putInt24(d);
                    f.putInt16(e.length);
                    f.putBytes(e);
                    return f;
                };
                b.createCertificateRequest = function (c) {
                    var e = a.util.createBuffer();
                    e.putByte(1);
                    var d = a.util.createBuffer();
                    for (g in c.caStore.certs) {
                        var l = a.pki.distinguishedNameToAsn1(c.caStore.certs[g].subject);
                        l = a.asn1.toDer(l);
                        d.putInt16(l.length());
                        d.putBuffer(l);
                    }
                    c = 1 + e.length() + 2 + d.length();
                    var g = a.util.createBuffer();
                    g.putByte(b.HandshakeType.certificate_request);
                    g.putInt24(c);
                    f(g, 1, e);
                    f(g, 2, d);
                    return g;
                };
                b.createServerHelloDone = function (c) {
                    c = a.util.createBuffer();
                    c.putByte(b.HandshakeType.server_hello_done);
                    c.putInt24(0);
                    return c;
                };
                b.createChangeCipherSpec = function () {
                    var b = a.util.createBuffer();
                    b.putByte(1);
                    return b;
                };
                b.createFinished = function (c) {
                    var e = a.util.createBuffer();
                    e.putBuffer(c.session.md5.digest());
                    e.putBuffer(c.session.sha1.digest());
                    e = g(
                        c.session.sp.master_secret,
                        c.entity === b.ConnectionEnd.client ? 'client finished' : 'server finished',
                        e.getBytes(),
                        12,
                    );
                    c = a.util.createBuffer();
                    c.putByte(b.HandshakeType.finished);
                    c.putInt24(e.length());
                    c.putBuffer(e);
                    return c;
                };
                b.createHeartbeat = function (b, c, e) {
                    'undefined' === typeof e && (e = c.length);
                    var d = a.util.createBuffer();
                    d.putByte(b);
                    d.putInt16(e);
                    d.putBytes(c);
                    b = d.length();
                    d.putBytes(a.random.getBytes(Math.max(16, b - e - 3)));
                    return d;
                };
                b.queue = function (c, e) {
                    if (
                        e &&
                        (0 !== e.fragment.length() ||
                            (e.type !== b.ContentType.handshake &&
                                e.type !== b.ContentType.alert &&
                                e.type !== b.ContentType.change_cipher_spec))
                    ) {
                        if (e.type === b.ContentType.handshake) {
                            var d = e.fragment.bytes();
                            c.session.md5.update(d);
                            c.session.sha1.update(d);
                        }
                        if (e.fragment.length() <= b.MaxFragment) d = [e];
                        else {
                            d = [];
                            for (var f = e.fragment.bytes(); f.length > b.MaxFragment; )
                                d.push(
                                    b.createRecord(c, {
                                        type: e.type,
                                        data: a.util.createBuffer(f.slice(0, b.MaxFragment)),
                                    }),
                                ),
                                    (f = f.slice(b.MaxFragment));
                            0 < f.length && d.push(b.createRecord(c, { type: e.type, data: a.util.createBuffer(f) }));
                        }
                        for (f = 0; f < d.length && !c.fail; ++f) {
                            var l = d[f];
                            c.state.current.write.update(c, l) && c.records.push(l);
                        }
                    }
                };
                b.flush = function (a) {
                    for (var b = 0; b < a.records.length; ++b) {
                        var c = a.records[b];
                        a.tlsData.putByte(c.type);
                        a.tlsData.putByte(c.version.major);
                        a.tlsData.putByte(c.version.minor);
                        a.tlsData.putInt16(c.fragment.length());
                        a.tlsData.putBuffer(a.records[b].fragment);
                    }
                    a.records = [];
                    return a.tlsDataReady(a);
                };
                var V = function (c) {
                        switch (c) {
                            case !0:
                                return !0;
                            case a.pki.certificateError.bad_certificate:
                                return b.Alert.Description.bad_certificate;
                            case a.pki.certificateError.unsupported_certificate:
                                return b.Alert.Description.unsupported_certificate;
                            case a.pki.certificateError.certificate_revoked:
                                return b.Alert.Description.certificate_revoked;
                            case a.pki.certificateError.certificate_expired:
                                return b.Alert.Description.certificate_expired;
                            case a.pki.certificateError.certificate_unknown:
                                return b.Alert.Description.certificate_unknown;
                            case a.pki.certificateError.unknown_ca:
                                return b.Alert.Description.unknown_ca;
                            default:
                                return b.Alert.Description.bad_certificate;
                        }
                    },
                    W = function (c) {
                        switch (c) {
                            case !0:
                                return !0;
                            case b.Alert.Description.bad_certificate:
                                return a.pki.certificateError.bad_certificate;
                            case b.Alert.Description.unsupported_certificate:
                                return a.pki.certificateError.unsupported_certificate;
                            case b.Alert.Description.certificate_revoked:
                                return a.pki.certificateError.certificate_revoked;
                            case b.Alert.Description.certificate_expired:
                                return a.pki.certificateError.certificate_expired;
                            case b.Alert.Description.certificate_unknown:
                                return a.pki.certificateError.certificate_unknown;
                            case b.Alert.Description.unknown_ca:
                                return a.pki.certificateError.unknown_ca;
                            default:
                                return a.pki.certificateError.bad_certificate;
                        }
                    };
                b.verifyCertificateChain = function (c, e) {
                    try {
                        a.pki.verifyCertificateChain(c.caStore, e, function (e, d, f) {
                            V(e);
                            d = c.verify(c, e, d, f);
                            if (!0 !== d) {
                                if ('object' === typeof d && !a.util.isArray(d))
                                    throw (
                                        ((e = Error('The application rejected the certificate.')),
                                        (e.send = !0),
                                        (e.alert = {
                                            level: b.Alert.Level.fatal,
                                            description: b.Alert.Description.bad_certificate,
                                        }),
                                        d.message && (e.message = d.message),
                                        d.alert && (e.alert.description = d.alert),
                                        e)
                                    );
                                d !== e && (d = W(d));
                            }
                            return d;
                        });
                    } catch (T) {
                        var d = T;
                        if ('object' !== typeof d || a.util.isArray(d))
                            d = { send: !0, alert: { level: b.Alert.Level.fatal, description: V(T) } };
                        'send' in d || (d.send = !0);
                        'alert' in d || (d.alert = { level: b.Alert.Level.fatal, description: V(d.error) });
                        c.error(c, d);
                    }
                    return !c.fail;
                };
                b.createSessionCache = function (b, c) {
                    var e = null;
                    if (b && b.getSession && b.setSession && b.order) e = b;
                    else {
                        e = {};
                        e.cache = b || {};
                        e.capacity = Math.max(c || 100, 1);
                        e.order = [];
                        for (var d in b) e.order.length <= c ? e.order.push(d) : delete b[d];
                        e.getSession = function (b) {
                            var c = null,
                                d = null;
                            b ? (d = a.util.bytesToHex(b)) : 0 < e.order.length && (d = e.order[0]);
                            if (null !== d && d in e.cache) {
                                c = e.cache[d];
                                delete e.cache[d];
                                for (var f in e.order)
                                    if (e.order[f] === d) {
                                        e.order.splice(f, 1);
                                        break;
                                    }
                            }
                            return c;
                        };
                        e.setSession = function (b, c) {
                            if (e.order.length === e.capacity) {
                                var d = e.order.shift();
                                delete e.cache[d];
                            }
                            d = a.util.bytesToHex(b);
                            e.order.push(d);
                            e.cache[d] = c;
                        };
                    }
                    return e;
                };
                b.createConnection = function (c) {
                    var e = null;
                    e = c.caStore
                        ? a.util.isArray(c.caStore)
                            ? a.pki.createCaStore(c.caStore)
                            : c.caStore
                        : a.pki.createCaStore();
                    var d = c.cipherSuites || null;
                    if (null === d) {
                        d = [];
                        for (var f in b.CipherSuites) d.push(b.CipherSuites[f]);
                    }
                    f = c.server ? b.ConnectionEnd.server : b.ConnectionEnd.client;
                    var l = c.sessionCache ? b.createSessionCache(c.sessionCache) : null,
                        g = {
                            version: { major: b.Version.major, minor: b.Version.minor },
                            entity: f,
                            sessionId: c.sessionId,
                            caStore: e,
                            sessionCache: l,
                            cipherSuites: d,
                            connected: c.connected,
                            virtualHost: c.virtualHost || null,
                            verifyClient: c.verifyClient || !1,
                            verify:
                                c.verify ||
                                function (a, b, c, e) {
                                    return b;
                                },
                            getCertificate: c.getCertificate || null,
                            getPrivateKey: c.getPrivateKey || null,
                            getSignature: c.getSignature || null,
                            input: a.util.createBuffer(),
                            tlsData: a.util.createBuffer(),
                            data: a.util.createBuffer(),
                            tlsDataReady: c.tlsDataReady,
                            dataReady: c.dataReady,
                            heartbeatReceived: c.heartbeatReceived,
                            closed: c.closed,
                            error: function (a, e) {
                                e.origin = e.origin || (a.entity === b.ConnectionEnd.client ? 'client' : 'server');
                                e.send && (b.queue(a, b.createAlert(a, e.alert)), b.flush(a));
                                var d = !1 !== e.fatal;
                                d && (a.fail = !0);
                                c.error(a, e);
                                d && a.close(!1);
                            },
                            deflate: c.deflate || null,
                            inflate: c.inflate || null,
                            reset: function (a) {
                                g.version = { major: b.Version.major, minor: b.Version.minor };
                                g.record = null;
                                g.session = null;
                                g.peerCertificate = null;
                                g.state = { pending: null, current: null };
                                g.expect = 0;
                                g.fragmented = null;
                                g.records = [];
                                g.open = !1;
                                g.handshakes = 0;
                                g.handshaking = !1;
                                g.isConnected = !1;
                                g.fail = !(a || 'undefined' === typeof a);
                                g.input.clear();
                                g.tlsData.clear();
                                g.data.clear();
                                g.state.current = b.createConnectionState(g);
                            },
                        };
                    g.reset();
                    g.handshake = function (c) {
                        if (g.entity !== b.ConnectionEnd.client)
                            g.error(g, { message: 'Cannot initiate handshake as a server.', fatal: !1 });
                        else if (g.handshaking) g.error(g, { message: 'Handshake already in progress.', fatal: !1 });
                        else {
                            g.fail && !g.open && 0 === g.handshakes && (g.fail = !1);
                            g.handshaking = !0;
                            c = c || '';
                            var e = null;
                            0 < c.length &&
                                (g.sessionCache && (e = g.sessionCache.getSession(c)), null === e && (c = ''));
                            0 === c.length &&
                                g.sessionCache &&
                                ((e = g.sessionCache.getSession()), null !== e && (c = e.id));
                            g.session = {
                                id: c,
                                version: null,
                                cipherSuite: null,
                                compressionMethod: null,
                                serverCertificate: null,
                                certificateRequest: null,
                                clientCertificate: null,
                                sp: {},
                                md5: a.md.md5.create(),
                                sha1: a.md.sha1.create(),
                            };
                            e && ((g.version = e.version), (g.session.sp = e.sp));
                            g.session.sp.client_random = b.createRandom().getBytes();
                            g.open = !0;
                            b.queue(
                                g,
                                b.createRecord(g, { type: b.ContentType.handshake, data: b.createClientHello(g) }),
                            );
                            b.flush(g);
                        }
                    };
                    g.process = function (c) {
                        var e = 0;
                        c && g.input.putBytes(c);
                        if (!g.fail) {
                            null !== g.record && g.record.ready && g.record.fragment.isEmpty() && (g.record = null);
                            if (null === g.record) {
                                e = 0;
                                c = g.input;
                                var d = c.length();
                                5 > d
                                    ? (e = 5 - d)
                                    : ((g.record = {
                                          type: c.getByte(),
                                          version: { major: c.getByte(), minor: c.getByte() },
                                          length: c.getInt16(),
                                          fragment: a.util.createBuffer(),
                                          ready: !1,
                                      }),
                                      (c = g.record.version.major === g.version.major) &&
                                          g.session &&
                                          g.session.version &&
                                          (c = g.record.version.minor === g.version.minor),
                                      c ||
                                          g.error(g, {
                                              message: 'Incompatible TLS version.',
                                              send: !0,
                                              alert: {
                                                  level: b.Alert.Level.fatal,
                                                  description: b.Alert.Description.protocol_version,
                                              },
                                          }));
                            }
                            if (!g.fail && null !== g.record && !g.record.ready) {
                                e = g;
                                c = 0;
                                d = e.input;
                                var f = d.length();
                                f < e.record.length
                                    ? (c = e.record.length - f)
                                    : (e.record.fragment.putBytes(d.getBytes(e.record.length)),
                                      d.compact(),
                                      e.state.current.read.update(e, e.record) &&
                                          (null !== e.fragmented &&
                                              (e.fragmented.type === e.record.type
                                                  ? (e.fragmented.fragment.putBuffer(e.record.fragment),
                                                    (e.record = e.fragmented))
                                                  : e.error(e, {
                                                        message: 'Invalid fragmented record.',
                                                        send: !0,
                                                        alert: {
                                                            level: b.Alert.Level.fatal,
                                                            description: b.Alert.Description.unexpected_message,
                                                        },
                                                    })),
                                          (e.record.ready = !0)));
                                e = c;
                            }
                            if (!g.fail && null !== g.record && g.record.ready)
                                if (
                                    ((c = g.record),
                                    (d = c.type - b.ContentType.change_cipher_spec),
                                    (f = z[g.entity][g.expect]),
                                    d in f)
                                )
                                    f[d](g, c);
                                else b.handleUnexpected(g, c);
                        }
                        return e;
                    };
                    g.prepare = function (c) {
                        b.queue(
                            g,
                            b.createRecord(g, { type: b.ContentType.application_data, data: a.util.createBuffer(c) }),
                        );
                        return b.flush(g);
                    };
                    g.prepareHeartbeatRequest = function (c, e) {
                        c instanceof a.util.ByteBuffer && (c = c.bytes());
                        'undefined' === typeof e && (e = c.length);
                        g.expectedHeartbeatPayload = c;
                        b.queue(
                            g,
                            b.createRecord(g, {
                                type: b.ContentType.heartbeat,
                                data: b.createHeartbeat(b.HeartbeatMessageType.heartbeat_request, c, e),
                            }),
                        );
                        return b.flush(g);
                    };
                    g.close = function (a) {
                        if (!g.fail && g.sessionCache && g.session) {
                            var c = { id: g.session.id, version: g.session.version, sp: g.session.sp };
                            c.sp.keys = null;
                            g.sessionCache.setSession(c.id, c);
                        }
                        if (g.open) {
                            g.open = !1;
                            g.input.clear();
                            if (g.isConnected || g.handshaking)
                                (g.isConnected = g.handshaking = !1),
                                    b.queue(
                                        g,
                                        b.createAlert(g, {
                                            level: b.Alert.Level.warning,
                                            description: b.Alert.Description.close_notify,
                                        }),
                                    ),
                                    b.flush(g);
                            g.closed(g);
                        }
                        g.reset(a);
                    };
                    return g;
                };
                a.tls = a.tls || {};
                for (var X in b) 'function' !== typeof b[X] && (a.tls[X] = b[X]);
                a.tls.prf_tls1 = g;
                a.tls.hmac_sha1 = function (b, c, e) {
                    var d = a.hmac.create();
                    d.start('SHA1', b);
                    b = a.util.createBuffer();
                    b.putInt32(c[0]);
                    b.putInt32(c[1]);
                    b.putByte(e.type);
                    b.putByte(e.version.major);
                    b.putByte(e.version.minor);
                    b.putInt16(e.length);
                    b.putBytes(e.fragment.bytes());
                    d.update(b.getBytes());
                    return d.digest().getBytes();
                };
                a.tls.createSessionCache = b.createSessionCache;
                a.tls.createConnection = b.createConnection;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.tls) return d.tls;
                        d.defined.tls = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.tls;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/tls', 'require module ./asn1 ./hmac ./md ./pem ./pki ./random ./util'.split(' '), function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(e, g, h) {
                    g = g.entity === a.tls.ConnectionEnd.client;
                    e.read.cipherState = {
                        init: !1,
                        cipher: a.cipher.createDecipher(
                            'AES-CBC',
                            g ? h.keys.server_write_key : h.keys.client_write_key,
                        ),
                        iv: g ? h.keys.server_write_IV : h.keys.client_write_IV,
                    };
                    e.write.cipherState = {
                        init: !1,
                        cipher: a.cipher.createCipher('AES-CBC', g ? h.keys.client_write_key : h.keys.server_write_key),
                        iv: g ? h.keys.client_write_IV : h.keys.server_write_IV,
                    };
                    e.read.cipherFunction = f;
                    e.write.cipherFunction = d;
                    e.read.macLength = e.write.macLength = h.mac_length;
                    e.read.macFunction = e.write.macFunction = b.hmac_sha1;
                }
                function d(e, d) {
                    var f = !1,
                        g = d.macFunction(d.macKey, d.sequenceNumber, e);
                    e.fragment.putBytes(g);
                    d.updateSequenceNumber();
                    g =
                        e.version.minor === b.Versions.TLS_1_0.minor
                            ? d.cipherState.init
                                ? null
                                : d.cipherState.iv
                            : a.random.getBytesSync(16);
                    d.cipherState.init = !0;
                    var c = d.cipherState.cipher;
                    c.start({ iv: g });
                    e.version.minor >= b.Versions.TLS_1_1.minor && c.output.putBytes(g);
                    c.update(e.fragment);
                    c.finish(p) && ((e.fragment = c.output), (e.length = e.fragment.length()), (f = !0));
                    return f;
                }
                function p(a, b, e) {
                    e || ((a -= b.length() % a), b.fillWithByte(a - 1, a));
                    return !0;
                }
                function h(a, b, e) {
                    a = !0;
                    if (e) {
                        e = b.length();
                        for (var d = b.last(), c = e - 1 - d; c < e - 1; ++c) a = a && b.at(c) == d;
                        a && b.truncate(d + 1);
                    }
                    return a;
                }
                function f(d, f) {
                    ++e;
                    var g =
                        d.version.minor === b.Versions.TLS_1_0.minor
                            ? f.cipherState.init
                                ? null
                                : f.cipherState.iv
                            : d.fragment.getBytes(16);
                    f.cipherState.init = !0;
                    var k = f.cipherState.cipher;
                    k.start({ iv: g });
                    k.update(d.fragment);
                    g = k.finish(h);
                    var c = f.macLength,
                        q = a.random.getBytesSync(c),
                        x = k.output.length();
                    x >= c
                        ? ((d.fragment = k.output.getBytes(x - c)), (q = k.output.getBytes(c)))
                        : (d.fragment = k.output.getBytes());
                    d.fragment = a.util.createBuffer(d.fragment);
                    d.length = d.fragment.length();
                    c = f.macFunction(f.macKey, f.sequenceNumber, d);
                    f.updateSequenceNumber();
                    k = f.macKey;
                    x = a.hmac.create();
                    x.start('SHA1', k);
                    x.update(q);
                    q = x.digest().getBytes();
                    x.start(null, null);
                    x.update(c);
                    c = x.digest().getBytes();
                    return q === c && g;
                }
                var b = a.tls;
                b.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA = {
                    id: [0, 47],
                    name: 'TLS_RSA_WITH_AES_128_CBC_SHA',
                    initSecurityParameters: function (a) {
                        a.bulk_cipher_algorithm = b.BulkCipherAlgorithm.aes;
                        a.cipher_type = b.CipherType.block;
                        a.enc_key_length = 16;
                        a.block_length = 16;
                        a.fixed_iv_length = 16;
                        a.record_iv_length = 16;
                        a.mac_algorithm = b.MACAlgorithm.hmac_sha1;
                        a.mac_length = 20;
                        a.mac_key_length = 20;
                    },
                    initConnectionState: g,
                };
                b.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA = {
                    id: [0, 53],
                    name: 'TLS_RSA_WITH_AES_256_CBC_SHA',
                    initSecurityParameters: function (a) {
                        a.bulk_cipher_algorithm = b.BulkCipherAlgorithm.aes;
                        a.cipher_type = b.CipherType.block;
                        a.enc_key_length = 32;
                        a.block_length = 16;
                        a.fixed_iv_length = 16;
                        a.record_iv_length = 16;
                        a.mac_algorithm = b.MACAlgorithm.hmac_sha1;
                        a.mac_length = 20;
                        a.mac_key_length = 20;
                    },
                    initConnectionState: g,
                };
                var e = 0;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.aesCipherSuites) return d.aesCipherSuites;
                        d.defined.aesCipherSuites = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.aesCipherSuites;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/aesCipherSuites', ['require', 'module', './aes', './tls'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                a.debug = a.debug || {};
                a.debug.storage = {};
                a.debug.get = function (g, d) {
                    var p;
                    'undefined' === typeof g
                        ? (p = a.debug.storage)
                        : g in a.debug.storage &&
                          (p = 'undefined' === typeof d ? a.debug.storage[g] : a.debug.storage[g][d]);
                    return p;
                };
                a.debug.set = function (g, d, p) {
                    g in a.debug.storage || (a.debug.storage[g] = {});
                    a.debug.storage[g][d] = p;
                };
                a.debug.clear = function (g, d) {
                    'undefined' === typeof g
                        ? (a.debug.storage = {})
                        : g in a.debug.storage &&
                          ('undefined' === typeof d ? delete a.debug.storage[g] : delete a.debug.storage[g][d]);
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.debug) return d.debug;
                        d.defined.debug = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.debug;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/debug', ['require', 'module'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(d, g, f, b) {
                    d.generate = function (e, d) {
                        for (
                            var k = new a.util.ByteBuffer(),
                                h = Math.ceil(d / b) + f,
                                v = new a.util.ByteBuffer(),
                                c = f;
                            c < h;
                            ++c
                        ) {
                            v.putInt32(c);
                            g.start();
                            g.update(e + v.getBytes());
                            var q = g.digest();
                            k.putBytes(q.getBytes(b));
                        }
                        k.truncate(k.length() - d);
                        return k.getBytes();
                    };
                }
                a.kem = a.kem || {};
                var d = a.jsbn.BigInteger;
                a.kem.rsa = {};
                a.kem.rsa.create = function (g, h) {
                    h = h || {};
                    var f = h.prng || a.random;
                    return {
                        encrypt: function (b, e) {
                            var h = Math.ceil(b.n.bitLength() / 8);
                            do var k = new d(a.util.bytesToHex(f.getBytesSync(h)), 16).mod(b.n);
                            while (k.equals(d.ZERO));
                            k = a.util.hexToBytes(k.toString(16));
                            h -= k.length;
                            0 < h && (k = a.util.fillString(String.fromCharCode(0), h) + k);
                            h = b.encrypt(k, 'NONE');
                            k = g.generate(k, e);
                            return { encapsulation: h, key: k };
                        },
                        decrypt: function (a, e, d) {
                            a = a.decrypt(e, 'NONE');
                            return g.generate(a, d);
                        },
                    };
                };
                a.kem.kdf1 = function (a, d) {
                    g(this, a, 0, d || a.digestLength);
                };
                a.kem.kdf2 = function (a, d) {
                    g(this, a, 1, d || a.digestLength);
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.kem) return d.kem;
                        d.defined.kem = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.kem;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/kem', ['require', 'module', './util', './random', './jsbn'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                a.log = a.log || {};
                a.log.levels = 'none error warning info debug verbose max'.split(' ');
                var g = {},
                    d = [],
                    p = null;
                a.log.LEVEL_LOCKED = 2;
                a.log.NO_LEVEL_CHECK = 4;
                a.log.INTERPOLATE = 8;
                for (var h = 0; h < a.log.levels.length; ++h) {
                    var f = a.log.levels[h];
                    g[f] = { index: h, name: f.toUpperCase() };
                }
                a.log.logMessage = function (b) {
                    for (var e = g[b.level].index, f = 0; f < d.length; ++f) {
                        var h = d[f];
                        h.flags & a.log.NO_LEVEL_CHECK ? h.f(b) : e <= g[h.level].index && h.f(h, b);
                    }
                };
                a.log.prepareStandard = function (a) {
                    'standard' in a || (a.standard = g[a.level].name + ' [' + a.category + '] ' + a.message);
                };
                a.log.prepareFull = function (b) {
                    if (!('full' in b)) {
                        var e = [b.message];
                        e = e.concat([]);
                        b.full = a.util.format.apply(this, e);
                    }
                };
                a.log.prepareStandardFull = function (b) {
                    'standardFull' in b || (a.log.prepareStandard(b), (b.standardFull = b.standard));
                };
                f = ['error', 'warning', 'info', 'debug', 'verbose'];
                for (h = 0; h < f.length; ++h)
                    (function (b) {
                        a.log[b] = function (e, d) {
                            var f = Array.prototype.slice.call(arguments).slice(2);
                            a.log.logMessage({
                                timestamp: new Date(),
                                level: b,
                                category: e,
                                message: d,
                                arguments: f,
                            });
                        };
                    })(f[h]);
                a.log.makeLogger = function (b) {
                    b = { flags: 0, f: b };
                    a.log.setLevel(b, 'none');
                    return b;
                };
                a.log.setLevel = function (b, d) {
                    var e = !1;
                    if (b && !(b.flags & a.log.LEVEL_LOCKED))
                        for (var f = 0; f < a.log.levels.length; ++f)
                            if (d == a.log.levels[f]) {
                                b.level = d;
                                e = !0;
                                break;
                            }
                    return e;
                };
                a.log.lock = function (b, d) {
                    b.flags =
                        'undefined' === typeof d || d ? b.flags | a.log.LEVEL_LOCKED : b.flags & ~a.log.LEVEL_LOCKED;
                };
                a.log.addLogger = function (a) {
                    d.push(a);
                };
                if ('undefined' !== typeof console && 'log' in console) {
                    if (console.error && console.warn && console.info && console.debug) {
                        var b = {
                            error: console.error,
                            warning: console.warn,
                            info: console.info,
                            debug: console.debug,
                            verbose: console.debug,
                        };
                        p = function (e, d) {
                            a.log.prepareStandard(d);
                            var f = b[d.level],
                                g = [d.standard];
                            g = g.concat(d.arguments.slice());
                            f.apply(console, g);
                        };
                    } else
                        p = function (b, d) {
                            a.log.prepareStandardFull(d);
                        };
                    p = a.log.makeLogger(p);
                    a.log.setLevel(p, 'debug');
                    a.log.addLogger(p);
                } else console = { log: function () {} };
                null !== p &&
                    ((h = a.util.getQueryVariables()),
                    'console.level' in h && a.log.setLevel(p, h['console.level'].slice(-1)[0]),
                    'console.lock' in h && 'true' == h['console.lock'].slice(-1)[0] && a.log.lock(p));
                a.log.consoleLogger = p;
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.log) return d.log;
                        d.defined.log = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.log;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/log', ['require', 'module', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                function g(b) {
                    var c = {},
                        e = [];
                    if (!k.validate(b, u.asn1.recipientInfoValidator, c, e))
                        throw (
                            ((b = Error(
                                'Cannot read PKCS#7 RecipientInfo. ASN.1 object is not an PKCS#7 RecipientInfo.',
                            )),
                            (b.errors = e),
                            b)
                        );
                    return {
                        version: c.version.charCodeAt(0),
                        issuer: a.pki.RDNAttributesAsArray(c.issuer),
                        serialNumber: a.util.createBuffer(c.serial).toHex(),
                        encryptedContent: {
                            algorithm: k.derToOid(c.encAlgorithm),
                            parameter: c.encParameter.value,
                            content: c.encKey,
                        },
                    };
                }
                function d(b) {
                    return k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                        k.create(k.Class.UNIVERSAL, k.Type.INTEGER, !1, k.integerToDer(b.version).getBytes()),
                        k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                            a.pki.distinguishedNameToAsn1({ attributes: b.issuer }),
                            k.create(k.Class.UNIVERSAL, k.Type.INTEGER, !1, a.util.hexToBytes(b.serialNumber)),
                        ]),
                        k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                            k.create(
                                k.Class.UNIVERSAL,
                                k.Type.OID,
                                !1,
                                k.oidToDer(b.encryptedContent.algorithm).getBytes(),
                            ),
                            k.create(k.Class.UNIVERSAL, k.Type.NULL, !1, ''),
                        ]),
                        k.create(k.Class.UNIVERSAL, k.Type.OCTETSTRING, !1, b.encryptedContent.content),
                    ]);
                }
                function p(a) {
                    for (var b = [], e = 0; e < a.length; ++e) b.push(d(a[e]));
                    return b;
                }
                function h(b) {
                    var c = k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                        k.create(k.Class.UNIVERSAL, k.Type.INTEGER, !1, k.integerToDer(b.version).getBytes()),
                        k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                            a.pki.distinguishedNameToAsn1({ attributes: b.issuer }),
                            k.create(k.Class.UNIVERSAL, k.Type.INTEGER, !1, a.util.hexToBytes(b.serialNumber)),
                        ]),
                        k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                            k.create(k.Class.UNIVERSAL, k.Type.OID, !1, k.oidToDer(b.digestAlgorithm).getBytes()),
                            k.create(k.Class.UNIVERSAL, k.Type.NULL, !1, ''),
                        ]),
                    ]);
                    b.authenticatedAttributesAsn1 && c.value.push(b.authenticatedAttributesAsn1);
                    c.value.push(
                        k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                            k.create(k.Class.UNIVERSAL, k.Type.OID, !1, k.oidToDer(b.signatureAlgorithm).getBytes()),
                            k.create(k.Class.UNIVERSAL, k.Type.NULL, !1, ''),
                        ]),
                    );
                    c.value.push(k.create(k.Class.UNIVERSAL, k.Type.OCTETSTRING, !1, b.signature));
                    if (0 < b.unauthenticatedAttributes.length) {
                        for (
                            var e = k.create(k.Class.CONTEXT_SPECIFIC, 1, !0, []), d = 0;
                            d < b.unauthenticatedAttributes.length;
                            ++d
                        )
                            e.values.push(f(b.unauthenticatedAttributes[d]));
                        c.value.push(e);
                    }
                    return c;
                }
                function f(b) {
                    if (b.type === a.pki.oids.contentType)
                        var c = k.create(k.Class.UNIVERSAL, k.Type.OID, !1, k.oidToDer(b.value).getBytes());
                    else if (b.type === a.pki.oids.messageDigest)
                        c = k.create(k.Class.UNIVERSAL, k.Type.OCTETSTRING, !1, b.value.bytes());
                    else if (b.type === a.pki.oids.signingTime) {
                        c = new Date('1950-01-01T00:00:00Z');
                        var e = new Date('2050-01-01T00:00:00Z'),
                            d = b.value;
                        if ('string' === typeof d) {
                            var f = Date.parse(d);
                            d = isNaN(f)
                                ? 13 === d.length
                                    ? k.utcTimeToDate(d)
                                    : k.generalizedTimeToDate(d)
                                : new Date(f);
                        }
                        c =
                            d >= c && d < e
                                ? k.create(k.Class.UNIVERSAL, k.Type.UTCTIME, !1, k.dateToUtcTime(d))
                                : k.create(k.Class.UNIVERSAL, k.Type.GENERALIZEDTIME, !1, k.dateToGeneralizedTime(d));
                    }
                    return k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                        k.create(k.Class.UNIVERSAL, k.Type.OID, !1, k.oidToDer(b.type).getBytes()),
                        k.create(k.Class.UNIVERSAL, k.Type.SET, !0, [c]),
                    ]);
                }
                function b(b) {
                    return [
                        k.create(k.Class.UNIVERSAL, k.Type.OID, !1, k.oidToDer(a.pki.oids.data).getBytes()),
                        k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                            k.create(k.Class.UNIVERSAL, k.Type.OID, !1, k.oidToDer(b.algorithm).getBytes()),
                            k.create(k.Class.UNIVERSAL, k.Type.OCTETSTRING, !1, b.parameter.getBytes()),
                        ]),
                        k.create(k.Class.CONTEXT_SPECIFIC, 0, !0, [
                            k.create(k.Class.UNIVERSAL, k.Type.OCTETSTRING, !1, b.content.getBytes()),
                        ]),
                    ];
                }
                function e(b, c, e) {
                    var d = {};
                    if (!k.validate(c, e, d, []))
                        throw (
                            ((b = Error('Cannot read PKCS#7 message. ASN.1 object is not a supported PKCS#7 message.')),
                            (b.errors = b),
                            b)
                        );
                    if (k.derToOid(d.contentType) !== a.pki.oids.data)
                        throw Error('Unsupported PKCS#7 message. Only wrapped ContentType Data supported.');
                    if (d.encryptedContent) {
                        c = '';
                        if (a.util.isArray(d.encryptedContent))
                            for (e = 0; e < d.encryptedContent.length; ++e) {
                                if (d.encryptedContent[e].type !== k.Type.OCTETSTRING)
                                    throw Error(
                                        'Malformed PKCS#7 message, expecting encrypted content constructed of only OCTET STRING objects.',
                                    );
                                c += d.encryptedContent[e].value;
                            }
                        else c = d.encryptedContent;
                        b.encryptedContent = {
                            algorithm: k.derToOid(d.encAlgorithm),
                            parameter: a.util.createBuffer(d.encParameter.value),
                            content: a.util.createBuffer(c),
                        };
                    }
                    if (d.content) {
                        c = '';
                        if (a.util.isArray(d.content))
                            for (e = 0; e < d.content.length; ++e) {
                                if (d.content[e].type !== k.Type.OCTETSTRING)
                                    throw Error(
                                        'Malformed PKCS#7 message, expecting content constructed of only OCTET STRING objects.',
                                    );
                                c += d.content[e].value;
                            }
                        else c = d.content;
                        b.content = a.util.createBuffer(c);
                    }
                    b.version = d.version.charCodeAt(0);
                    return (b.rawCapture = d);
                }
                function w(b) {
                    if (void 0 === b.encryptedContent.key) throw Error('Symmetric key not available.');
                    if (void 0 === b.content) {
                        switch (b.encryptedContent.algorithm) {
                            case a.pki.oids['aes128-CBC']:
                            case a.pki.oids['aes192-CBC']:
                            case a.pki.oids['aes256-CBC']:
                                var c = a.aes.createDecryptionCipher(b.encryptedContent.key);
                                break;
                            case a.pki.oids.desCBC:
                            case a.pki.oids['des-EDE3-CBC']:
                                c = a.des.createDecryptionCipher(b.encryptedContent.key);
                                break;
                            default:
                                throw Error('Unsupported symmetric cipher, OID ' + b.encryptedContent.algorithm);
                        }
                        c.start(b.encryptedContent.parameter);
                        c.update(b.encryptedContent.content);
                        if (!c.finish()) throw Error('Symmetric decryption failed.');
                        b.content = c.output;
                    }
                }
                var k = a.asn1,
                    u = (a.pkcs7 = a.pkcs7 || {});
                u.messageFromPem = function (b) {
                    b = a.pem.decode(b)[0];
                    if ('PKCS7' !== b.type) {
                        var c = Error('Could not convert PKCS#7 message from PEM; PEM header type is not "PKCS#7".');
                        c.headerType = b.type;
                        throw c;
                    }
                    if (b.procType && 'ENCRYPTED' === b.procType.type)
                        throw Error('Could not convert PKCS#7 message from PEM; PEM is encrypted.');
                    b = k.fromDer(b.body);
                    return u.messageFromAsn1(b);
                };
                u.messageToPem = function (b, c) {
                    var e = { type: 'PKCS7', body: k.toDer(b.toAsn1()).getBytes() };
                    return a.pem.encode(e, { maxline: c });
                };
                u.messageFromAsn1 = function (b) {
                    var c = {},
                        e = [];
                    if (!k.validate(b, u.asn1.contentInfoValidator, c, e))
                        throw (
                            ((c = Error('Cannot read PKCS#7 message. ASN.1 object is not an PKCS#7 ContentInfo.')),
                            (c.errors = e),
                            c)
                        );
                    e = k.derToOid(c.contentType);
                    switch (e) {
                        case a.pki.oids.envelopedData:
                            e = u.createEnvelopedData();
                            break;
                        case a.pki.oids.encryptedData:
                            e = u.createEncryptedData();
                            break;
                        case a.pki.oids.signedData:
                            e = u.createSignedData();
                            break;
                        default:
                            throw Error(
                                'Cannot read PKCS#7 message. ContentType with OID ' + e + ' is not (yet) supported.',
                            );
                    }
                    e.fromAsn1(c.content.value[0]);
                    return e;
                };
                u.createSignedData = function () {
                    var b = null;
                    return (b = {
                        type: a.pki.oids.signedData,
                        version: 1,
                        certificates: [],
                        crls: [],
                        signers: [],
                        digestAlgorithmIdentifiers: [],
                        contentInfo: null,
                        signerInfos: [],
                        fromAsn1: function (c) {
                            e(b, c, u.asn1.signedDataValidator);
                            b.certificates = [];
                            b.crls = [];
                            b.digestAlgorithmIdentifiers = [];
                            b.contentInfo = null;
                            b.signerInfos = [];
                            c = b.rawCapture.certificates.value;
                            for (var d = 0; d < c.length; ++d) b.certificates.push(a.pki.certificateFromAsn1(c[d]));
                        },
                        toAsn1: function () {
                            b.contentInfo || b.sign();
                            for (var c = [], e = 0; e < b.certificates.length; ++e)
                                c.push(a.pki.certificateToAsn1(b.certificates[e]));
                            e = [];
                            var d = k.create(k.Class.CONTEXT_SPECIFIC, 0, !0, [
                                k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                                    k.create(
                                        k.Class.UNIVERSAL,
                                        k.Type.INTEGER,
                                        !1,
                                        k.integerToDer(b.version).getBytes(),
                                    ),
                                    k.create(k.Class.UNIVERSAL, k.Type.SET, !0, b.digestAlgorithmIdentifiers),
                                    b.contentInfo,
                                ]),
                            ]);
                            0 < c.length && d.value[0].value.push(k.create(k.Class.CONTEXT_SPECIFIC, 0, !0, c));
                            0 < e.length && d.value[0].value.push(k.create(k.Class.CONTEXT_SPECIFIC, 1, !0, e));
                            d.value[0].value.push(k.create(k.Class.UNIVERSAL, k.Type.SET, !0, b.signerInfos));
                            return k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                                k.create(k.Class.UNIVERSAL, k.Type.OID, !1, k.oidToDer(b.type).getBytes()),
                                d,
                            ]);
                        },
                        addSigner: function (c) {
                            var e = c.issuer,
                                d = c.serialNumber;
                            c.certificate &&
                                ((d = c.certificate),
                                'string' === typeof d && (d = a.pki.certificateFromPem(d)),
                                (e = d.issuer.attributes),
                                (d = d.serialNumber));
                            var f = c.key;
                            if (!f) throw Error('Could not add PKCS#7 signer; no private key specified.');
                            'string' === typeof f && (f = a.pki.privateKeyFromPem(f));
                            var g = c.digestAlgorithm || a.pki.oids.sha1;
                            switch (g) {
                                case a.pki.oids.sha1:
                                case a.pki.oids.sha256:
                                case a.pki.oids.sha384:
                                case a.pki.oids.sha512:
                                case a.pki.oids.md5:
                                    break;
                                default:
                                    throw Error('Could not add PKCS#7 signer; unknown message digest algorithm: ' + g);
                            }
                            c = c.authenticatedAttributes || [];
                            if (0 < c.length) {
                                for (var l = !1, k = !1, h = 0; h < c.length; ++h) {
                                    var F = c[h];
                                    if (!l && F.type === a.pki.oids.contentType) {
                                        if (((l = !0), k)) break;
                                    } else if (!k && F.type === a.pki.oids.messageDigest && ((k = !0), l)) break;
                                }
                                if (!l || !k)
                                    throw Error(
                                        'Invalid signer.authenticatedAttributes. If signer.authenticatedAttributes is specified, then it must contain at least two attributes, PKCS #9 content-type and PKCS #9 message-digest.',
                                    );
                            }
                            b.signers.push({
                                key: f,
                                version: 1,
                                issuer: e,
                                serialNumber: d,
                                digestAlgorithm: g,
                                signatureAlgorithm: a.pki.oids.rsaEncryption,
                                signature: null,
                                authenticatedAttributes: c,
                                unauthenticatedAttributes: [],
                            });
                        },
                        sign: function () {
                            if ('object' !== typeof b.content || null === b.contentInfo)
                                if (
                                    ((b.contentInfo = k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                                        k.create(
                                            k.Class.UNIVERSAL,
                                            k.Type.OID,
                                            !1,
                                            k.oidToDer(a.pki.oids.data).getBytes(),
                                        ),
                                    ])),
                                    'content' in b)
                                ) {
                                    var c;
                                    b.content instanceof a.util.ByteBuffer
                                        ? (c = b.content.bytes())
                                        : 'string' === typeof b.content && (c = a.util.encodeUtf8(b.content));
                                    b.contentInfo.value.push(
                                        k.create(k.Class.CONTEXT_SPECIFIC, 0, !0, [
                                            k.create(k.Class.UNIVERSAL, k.Type.OCTETSTRING, !1, c),
                                        ]),
                                    );
                                }
                            if (0 !== b.signers.length) {
                                c = {};
                                for (var e = 0; e < b.signers.length; ++e) {
                                    var d = b.signers[e],
                                        g = d.digestAlgorithm;
                                    g in c || (c[g] = a.md[a.pki.oids[g]].create());
                                    d.md = 0 === d.authenticatedAttributes.length ? c[g] : a.md[a.pki.oids[g]].create();
                                }
                                b.digestAlgorithmIdentifiers = [];
                                for (g in c)
                                    b.digestAlgorithmIdentifiers.push(
                                        k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                                            k.create(k.Class.UNIVERSAL, k.Type.OID, !1, k.oidToDer(g).getBytes()),
                                            k.create(k.Class.UNIVERSAL, k.Type.NULL, !1, ''),
                                        ]),
                                    );
                                if (2 > b.contentInfo.value.length)
                                    throw Error('Could not sign PKCS#7 message; there is no content to sign.');
                                g = k.derToOid(b.contentInfo.value[0].value);
                                e = b.contentInfo.value[1];
                                e = e.value[0];
                                var p = k.toDer(e);
                                p.getByte();
                                k.getBerValueLength(p);
                                p = p.getBytes();
                                for (var l in c) c[l].start().update(p);
                                l = new Date();
                                for (e = 0; e < b.signers.length; ++e) {
                                    d = b.signers[e];
                                    if (0 === d.authenticatedAttributes.length) {
                                        if (g !== a.pki.oids.data)
                                            throw Error(
                                                'Invalid signer; authenticatedAttributes must be present when the ContentInfo content type is not PKCS#7 Data.',
                                            );
                                    } else {
                                        d.authenticatedAttributesAsn1 = k.create(k.Class.CONTEXT_SPECIFIC, 0, !0, []);
                                        p = k.create(k.Class.UNIVERSAL, k.Type.SET, !0, []);
                                        for (var r = 0; r < d.authenticatedAttributes.length; ++r) {
                                            var n = d.authenticatedAttributes[r];
                                            n.type === a.pki.oids.messageDigest
                                                ? (n.value = c[d.digestAlgorithm].digest())
                                                : n.type !== a.pki.oids.signingTime || n.value || (n.value = l);
                                            p.value.push(f(n));
                                            d.authenticatedAttributesAsn1.value.push(f(n));
                                        }
                                        p = k.toDer(p).getBytes();
                                        d.md.start().update(p);
                                    }
                                    d.signature = d.key.sign(d.md, 'RSASSA-PKCS1-V1_5');
                                }
                                c = b;
                                g = b.signers;
                                l = [];
                                for (e = 0; e < g.length; ++e) l.push(h(g[e]));
                                c.signerInfos = l;
                            }
                        },
                        verify: function () {
                            throw Error('PKCS#7 signature verification not yet implemented.');
                        },
                        addCertificate: function (c) {
                            'string' === typeof c && (c = a.pki.certificateFromPem(c));
                            b.certificates.push(c);
                        },
                        addCertificateRevokationList: function (a) {
                            throw Error('PKCS#7 CRL support not yet implemented.');
                        },
                    });
                };
                u.createEncryptedData = function () {
                    var b = null;
                    return (b = {
                        type: a.pki.oids.encryptedData,
                        version: 0,
                        encryptedContent: { algorithm: a.pki.oids['aes256-CBC'] },
                        fromAsn1: function (a) {
                            e(b, a, u.asn1.encryptedDataValidator);
                        },
                        decrypt: function (a) {
                            void 0 !== a && (b.encryptedContent.key = a);
                            w(b);
                        },
                    });
                };
                u.createEnvelopedData = function () {
                    var d = null;
                    return (d = {
                        type: a.pki.oids.envelopedData,
                        version: 0,
                        recipients: [],
                        encryptedContent: { algorithm: a.pki.oids['aes256-CBC'] },
                        fromAsn1: function (a) {
                            var b = e(d, a, u.asn1.envelopedDataValidator);
                            a = d;
                            b = b.recipientInfos.value;
                            for (var c = [], f = 0; f < b.length; ++f) c.push(g(b[f]));
                            a.recipients = c;
                        },
                        toAsn1: function () {
                            return k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                                k.create(k.Class.UNIVERSAL, k.Type.OID, !1, k.oidToDer(d.type).getBytes()),
                                k.create(k.Class.CONTEXT_SPECIFIC, 0, !0, [
                                    k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, [
                                        k.create(
                                            k.Class.UNIVERSAL,
                                            k.Type.INTEGER,
                                            !1,
                                            k.integerToDer(d.version).getBytes(),
                                        ),
                                        k.create(k.Class.UNIVERSAL, k.Type.SET, !0, p(d.recipients)),
                                        k.create(k.Class.UNIVERSAL, k.Type.SEQUENCE, !0, b(d.encryptedContent)),
                                    ]),
                                ]),
                            ]);
                        },
                        findRecipient: function (a) {
                            for (var b = a.issuer.attributes, c = 0; c < d.recipients.length; ++c) {
                                var e = d.recipients[c],
                                    f = e.issuer;
                                if (e.serialNumber === a.serialNumber && f.length === b.length) {
                                    for (var g = !0, k = 0; k < b.length; ++k)
                                        if (f[k].type !== b[k].type || f[k].value !== b[k].value) {
                                            g = !1;
                                            break;
                                        }
                                    if (g) return e;
                                }
                            }
                            return null;
                        },
                        decrypt: function (b, e) {
                            if (void 0 === d.encryptedContent.key && void 0 !== b && void 0 !== e)
                                switch (b.encryptedContent.algorithm) {
                                    case a.pki.oids.rsaEncryption:
                                    case a.pki.oids.desCBC:
                                        var c = e.decrypt(b.encryptedContent.content);
                                        d.encryptedContent.key = a.util.createBuffer(c);
                                        break;
                                    default:
                                        throw Error(
                                            'Unsupported asymmetric cipher, OID ' + b.encryptedContent.algorithm,
                                        );
                                }
                            w(d);
                        },
                        addRecipient: function (b) {
                            d.recipients.push({
                                version: 0,
                                issuer: b.issuer.attributes,
                                serialNumber: b.serialNumber,
                                encryptedContent: { algorithm: a.pki.oids.rsaEncryption, key: b.publicKey },
                            });
                        },
                        encrypt: function (b, e) {
                            if (void 0 === d.encryptedContent.content) {
                                e = e || d.encryptedContent.algorithm;
                                b = b || d.encryptedContent.key;
                                var c;
                                switch (e) {
                                    case a.pki.oids['aes128-CBC']:
                                        var f = (c = 16);
                                        var g = a.aes.createEncryptionCipher;
                                        break;
                                    case a.pki.oids['aes192-CBC']:
                                        c = 24;
                                        f = 16;
                                        g = a.aes.createEncryptionCipher;
                                        break;
                                    case a.pki.oids['aes256-CBC']:
                                        c = 32;
                                        f = 16;
                                        g = a.aes.createEncryptionCipher;
                                        break;
                                    case a.pki.oids['des-EDE3-CBC']:
                                        c = 24;
                                        f = 8;
                                        g = a.des.createEncryptionCipher;
                                        break;
                                    default:
                                        throw Error('Unsupported symmetric cipher, OID ' + e);
                                }
                                if (void 0 === b) b = a.util.createBuffer(a.random.getBytes(c));
                                else if (b.length() != c)
                                    throw Error(
                                        'Symmetric key has wrong length; got ' +
                                            b.length() +
                                            ' bytes, expected ' +
                                            c +
                                            '.',
                                    );
                                d.encryptedContent.algorithm = e;
                                d.encryptedContent.key = b;
                                d.encryptedContent.parameter = a.util.createBuffer(a.random.getBytes(f));
                                c = g(b);
                                c.start(d.encryptedContent.parameter.copy());
                                c.update(d.content);
                                if (!c.finish()) throw Error('Symmetric encryption failed.');
                                d.encryptedContent.content = c.output;
                            }
                            for (c = 0; c < d.recipients.length; ++c)
                                if (((f = d.recipients[c]), void 0 === f.encryptedContent.content))
                                    switch (f.encryptedContent.algorithm) {
                                        case a.pki.oids.rsaEncryption:
                                            f.encryptedContent.content = f.encryptedContent.key.encrypt(
                                                d.encryptedContent.key.data,
                                            );
                                            break;
                                        default:
                                            throw Error(
                                                'Unsupported asymmetric cipher, OID ' + f.encryptedContent.algorithm,
                                            );
                                    }
                        },
                    });
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.pkcs7) return d.pkcs7;
                        d.defined.pkcs7 = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.pkcs7;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t(
                'js/pkcs7',
                'require module ./aes ./asn1 ./des ./oids ./pem ./pkcs7asn1 ./random ./util ./x509'.split(' '),
                function () {
                    C.apply(null, Array.prototype.slice.call(arguments, 0));
                },
            );
        })();
        (function () {
            function p(a) {
                function g(d, b) {
                    var e = b.toString(16);
                    '8' <= e[0] && (e = '00' + e);
                    e = a.util.hexToBytes(e);
                    d.putInt32(e.length);
                    d.putBytes(e);
                }
                function d(a, b) {
                    a.putInt32(b.length);
                    a.putString(b);
                }
                function p() {
                    for (var d = a.md.sha1.create(), b = arguments.length, e = 0; e < b; ++e) d.update(arguments[e]);
                    return d.digest();
                }
                var h = (a.ssh = a.ssh || {});
                h.privateKeyToPutty = function (f, b, e) {
                    e = e || '';
                    b = b || '';
                    var h = '' === b ? 'none' : 'aes256-cbc';
                    var k =
                        'PuTTY-User-Key-File-2: ssh-rsa\r\n' +
                        ('Encryption: ' + h + '\r\n') +
                        ('Comment: ' + e + '\r\n');
                    var u = a.util.createBuffer();
                    d(u, 'ssh-rsa');
                    g(u, f.e);
                    g(u, f.n);
                    var v = a.util.encode64(u.bytes(), 64),
                        c = Math.floor(v.length / 66) + 1;
                    k += 'Public-Lines: ' + c + '\r\n';
                    k += v;
                    v = a.util.createBuffer();
                    g(v, f.d);
                    g(v, f.p);
                    g(v, f.q);
                    g(v, f.qInv);
                    b
                        ? ((c = v.length() + 16 - 1),
                          (c -= c % 16),
                          (f = p(v.bytes())),
                          f.truncate(f.length() - c + v.length()),
                          v.putBuffer(f),
                          (c = a.util.createBuffer()),
                          c.putBuffer(p('\x00\x00\x00\x00', b)),
                          c.putBuffer(p('\x00\x00\x00\u0001', b)),
                          (c = a.aes.createEncryptionCipher(c.truncate(8), 'CBC')),
                          c.start(a.util.createBuffer().fillWithByte(0, 16)),
                          c.update(v.copy()),
                          c.finish(),
                          (c = c.output),
                          c.truncate(16),
                          (f = a.util.encode64(c.bytes(), 64)))
                        : (f = a.util.encode64(v.bytes(), 64));
                    c = Math.floor(f.length / 66) + 1;
                    k += '\r\nPrivate-Lines: ' + c + '\r\n';
                    k += f;
                    b = p('putty-private-key-file-mac-key', b);
                    c = a.util.createBuffer();
                    d(c, 'ssh-rsa');
                    d(c, h);
                    d(c, e);
                    c.putInt32(u.length());
                    c.putBuffer(u);
                    c.putInt32(v.length());
                    c.putBuffer(v);
                    e = a.hmac.create();
                    e.start('sha1', b);
                    e.update(c.bytes());
                    return (k += '\r\nPrivate-MAC: ' + e.digest().toHex() + '\r\n');
                };
                h.publicKeyToOpenSSH = function (f, b) {
                    b = b || '';
                    var e = a.util.createBuffer();
                    d(e, 'ssh-rsa');
                    g(e, f.e);
                    g(e, f.n);
                    return 'ssh-rsa ' + a.util.encode64(e.bytes()) + ' ' + b;
                };
                h.privateKeyToOpenSSH = function (d, b) {
                    return b
                        ? a.pki.encryptRsaPrivateKey(d, b, { legacy: !0, algorithm: 'aes128' })
                        : a.pki.privateKeyToPem(d);
                };
                h.getPublicKeyFingerprint = function (f, b) {
                    b = b || {};
                    var e = b.md || a.md.md5.create(),
                        h = a.util.createBuffer();
                    d(h, 'ssh-rsa');
                    g(h, f.e);
                    g(h, f.n);
                    e.start();
                    e.update(h.getBytes());
                    e = e.digest();
                    if ('hex' === b.encoding)
                        return (e = e.toHex()), b.delimiter ? e.match(/.{2}/g).join(b.delimiter) : e;
                    if ('binary' === b.encoding) return e.getBytes();
                    if (b.encoding) throw Error('Unknown encoding "' + b.encoding + '".');
                    return e;
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.ssh) return d.ssh;
                        d.defined.ssh = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.ssh;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/ssh', 'require module ./aes ./hmac ./md5 ./sha1 ./util'.split(' '), function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            function p(a) {
                var g = {},
                    d = 0;
                a.debug.set('forge.task', 'tasks', g);
                var p = {};
                a.debug.set('forge.task', 'queues', p);
                var h = { ready: {} };
                h.ready.stop = 'ready';
                h.ready.start = 'running';
                h.ready.cancel = 'done';
                h.ready.fail = 'error';
                h.running = {};
                h.running.stop = 'ready';
                h.running.start = 'running';
                h.running.block = 'blocked';
                h.running.unblock = 'running';
                h.running.sleep = 'sleeping';
                h.running.wakeup = 'running';
                h.running.cancel = 'done';
                h.running.fail = 'error';
                h.blocked = {};
                h.blocked.stop = 'blocked';
                h.blocked.start = 'blocked';
                h.blocked.block = 'blocked';
                h.blocked.unblock = 'blocked';
                h.blocked.sleep = 'blocked';
                h.blocked.wakeup = 'blocked';
                h.blocked.cancel = 'done';
                h.blocked.fail = 'error';
                h.sleeping = {};
                h.sleeping.stop = 'sleeping';
                h.sleeping.start = 'sleeping';
                h.sleeping.block = 'sleeping';
                h.sleeping.unblock = 'sleeping';
                h.sleeping.sleep = 'sleeping';
                h.sleeping.wakeup = 'sleeping';
                h.sleeping.cancel = 'done';
                h.sleeping.fail = 'error';
                h.done = {};
                h.done.stop = 'done';
                h.done.start = 'done';
                h.done.block = 'done';
                h.done.unblock = 'done';
                h.done.sleep = 'done';
                h.done.wakeup = 'done';
                h.done.cancel = 'done';
                h.done.fail = 'error';
                h.error = {};
                h.error.stop = 'error';
                h.error.start = 'error';
                h.error.block = 'error';
                h.error.unblock = 'error';
                h.error.sleep = 'error';
                h.error.wakeup = 'error';
                h.error.cancel = 'error';
                h.error.fail = 'error';
                var f = function (a) {
                    this.id = -1;
                    this.name = a.name || '?';
                    this.parent = a.parent || null;
                    this.run = a.run;
                    this.subtasks = [];
                    this.error = !1;
                    this.state = 'ready';
                    this.blocks = 0;
                    this.userData = this.swapTime = this.timeoutId = null;
                    this.id = d++;
                    g[this.id] = this;
                };
                f.prototype.debug = function (b) {
                    a.log.debug(
                        'forge.task',
                        b || '',
                        '[%s][%s] task:',
                        this.id,
                        this.name,
                        this,
                        'subtasks:',
                        this.subtasks.length,
                        'queue:',
                        p,
                    );
                };
                f.prototype.next = function (a, b) {
                    'function' === typeof a && ((b = a), (a = this.name));
                    var e = new f({ run: b, name: a, parent: this });
                    e.state = 'running';
                    e.type = this.type;
                    e.successCallback = this.successCallback || null;
                    e.failureCallback = this.failureCallback || null;
                    this.subtasks.push(e);
                    return this;
                };
                f.prototype.parallel = function (b, e) {
                    a.util.isArray(b) && ((e = b), (b = this.name));
                    return this.next(b, function (d) {
                        d.block(e.length);
                        for (
                            var c = function (b, c) {
                                    a.task.start({
                                        type: b,
                                        run: function (a) {
                                            e[c](a);
                                        },
                                        success: function (a) {
                                            d.unblock();
                                        },
                                        failure: function (a) {
                                            d.unblock();
                                        },
                                    });
                                },
                                f = 0;
                            f < e.length;
                            f++
                        )
                            c(b + '__parallel-' + d.id + '-' + f, f);
                    });
                };
                f.prototype.stop = function () {
                    this.state = h[this.state].stop;
                };
                f.prototype.start = function () {
                    this.error = !1;
                    this.state = h[this.state].start;
                    'running' === this.state && ((this.start = new Date()), this.run(this), e(this, 0));
                };
                f.prototype.block = function (a) {
                    this.blocks += 'undefined' === typeof a ? 1 : a;
                    0 < this.blocks && (this.state = h[this.state].block);
                };
                f.prototype.unblock = function (a) {
                    this.blocks -= 'undefined' === typeof a ? 1 : a;
                    0 === this.blocks && 'done' !== this.state && ((this.state = 'running'), e(this, 0));
                    return this.blocks;
                };
                f.prototype.sleep = function (a) {
                    this.state = h[this.state].sleep;
                    var b = this;
                    this.timeoutId = setTimeout(
                        function () {
                            b.timeoutId = null;
                            b.state = 'running';
                            e(b, 0);
                        },
                        'undefined' === typeof a ? 0 : a,
                    );
                };
                f.prototype.wait = function (a) {
                    a.wait(this);
                };
                f.prototype.wakeup = function () {
                    'sleeping' === this.state &&
                        (cancelTimeout(this.timeoutId), (this.timeoutId = null), (this.state = 'running'), e(this, 0));
                };
                f.prototype.cancel = function () {
                    this.state = h[this.state].cancel;
                    this.permitsNeeded = 0;
                    null !== this.timeoutId && (cancelTimeout(this.timeoutId), (this.timeoutId = null));
                    this.subtasks = [];
                };
                f.prototype.fail = function (a) {
                    this.error = !0;
                    w(this, !0);
                    if (a) (a.error = this.error), (a.swapTime = this.swapTime), (a.userData = this.userData), e(a, 0);
                    else {
                        if (null !== this.parent) {
                            for (a = this.parent; null !== a.parent; )
                                (a.error = this.error),
                                    (a.swapTime = this.swapTime),
                                    (a.userData = this.userData),
                                    (a = a.parent);
                            w(a, !0);
                        }
                        this.failureCallback && this.failureCallback(this);
                    }
                };
                var b = function (a) {
                        a.error = !1;
                        a.state = h[a.state].start;
                        setTimeout(function () {
                            'running' === a.state && ((a.swapTime = +new Date()), a.run(a), e(a, 0));
                        }, 0);
                    },
                    e = function (a, b) {
                        var d = 30 < b || 20 < +new Date() - a.swapTime,
                            c = function (b) {
                                b++;
                                if ('running' === a.state)
                                    if ((d && (a.swapTime = +new Date()), 0 < a.subtasks.length)) {
                                        var c = a.subtasks.shift();
                                        c.error = a.error;
                                        c.swapTime = a.swapTime;
                                        c.userData = a.userData;
                                        c.run(c);
                                        c.error || e(c, b);
                                    } else
                                        w(a),
                                            a.error ||
                                                null === a.parent ||
                                                ((a.parent.error = a.error),
                                                (a.parent.swapTime = a.swapTime),
                                                (a.parent.userData = a.userData),
                                                e(a.parent, b));
                            };
                        d ? setTimeout(c, 0) : c(b);
                    },
                    w = function (b, e) {
                        b.state = 'done';
                        delete g[b.id];
                        null === b.parent &&
                            (b.type in p
                                ? 0 === p[b.type].length
                                    ? a.log.error('forge.task', '[%s][%s] task queue empty [%s]', b.id, b.name, b.type)
                                    : p[b.type][0] !== b
                                    ? a.log.error(
                                          'forge.task',
                                          '[%s][%s] task not first in queue [%s]',
                                          b.id,
                                          b.name,
                                          b.type,
                                      )
                                    : (p[b.type].shift(),
                                      0 === p[b.type].length ? delete p[b.type] : p[b.type][0].start())
                                : a.log.error('forge.task', '[%s][%s] task queue missing [%s]', b.id, b.name, b.type),
                            e ||
                                (b.error && b.failureCallback
                                    ? b.failureCallback(b)
                                    : !b.error && b.successCallback && b.successCallback(b)));
                    };
                a.task = a.task || {};
                a.task.start = function (a) {
                    var e = new f({ run: a.run, name: a.name || '?' });
                    e.type = a.type;
                    e.successCallback = a.success || null;
                    e.failureCallback = a.failure || null;
                    e.type in p ? p[a.type].push(e) : ((p[e.type] = [e]), b(e));
                };
                a.task.cancel = function (a) {
                    a in p && (p[a] = [p[a][0]]);
                };
                a.task.createCondition = function () {
                    var a = {
                        tasks: {},
                        wait: function (b) {
                            b.id in a.tasks || (b.block(), (a.tasks[b.id] = b));
                        },
                        notify: function () {
                            var b = a.tasks;
                            a.tasks = {};
                            for (var e in b) b[e].unblock();
                        },
                    };
                    return a;
                };
            }
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var B = !0;
                    t = function (a, g) {
                        g(H, module);
                    };
                } else return 'undefined' === typeof forge && (forge = {}), p(forge);
            var y,
                C = function (a, g) {
                    g.exports = function (d) {
                        var g = y
                            .map(function (d) {
                                return a(d);
                            })
                            .concat(p);
                        d = d || {};
                        d.defined = d.defined || {};
                        if (d.defined.task) return d.task;
                        d.defined.task = !0;
                        for (var h = 0; h < g.length; ++h) g[h](d);
                        return d.task;
                    };
                },
                z = t;
            t = function (a, g) {
                y = 'string' === typeof a ? g.slice(2) : a.slice(2);
                if (B) return z.apply(null, Array.prototype.slice.call(arguments, 0));
                t = z;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t('js/task', ['require', 'module', './debug', './log', './util'], function () {
                C.apply(null, Array.prototype.slice.call(arguments, 0));
            });
        })();
        (function () {
            if ('function' !== typeof t)
                if ('object' === typeof module && module.exports) {
                    var p = !0;
                    t = function (p, a) {
                        a(H, module);
                    };
                } else {
                    'undefined' === typeof forge && (forge = { disableNativeCode: !1 });
                    return;
                }
            var B,
                y = function (p, a) {
                    a.exports = function (a) {
                        var d = B.map(function (a) {
                            return p(a);
                        });
                        a = a || {};
                        a.defined = a.defined || {};
                        if (a.defined.forge) return a.forge;
                        a.defined.forge = !0;
                        for (var g = 0; g < d.length; ++g) if ('function' === typeof d[g]) d[g](a);
                        return a;
                    };
                    a.exports.disableNativeCode = !1;
                    a.exports(a.exports);
                },
                C = t;
            t = function (y, a) {
                B = 'string' === typeof y ? a.slice(2) : y.slice(2);
                if (p) return C.apply(null, Array.prototype.slice.call(arguments, 0));
                t = C;
                return t.apply(null, Array.prototype.slice.call(arguments, 0));
            };
            t(
                'js/forge',
                'require module ./aes ./aesCipherSuites ./asn1 ./cipher ./cipherModes ./debug ./des ./hmac ./kem ./log ./md ./mgf1 ./pbkdf2 ./pem ./pkcs7 ./pkcs1 ./pkcs12 ./pki ./prime ./prng ./pss ./random ./rc2 ./ssh ./task ./tls ./util'.split(
                    ' ',
                ),
                function () {
                    y.apply(null, Array.prototype.slice.call(arguments, 0));
                },
            );
        })();
        return H('js/forge');
    });
}
(function () {
    function E(a) {
        return B('>' + C('B', a.length), a);
    }
    function p(a) {
        return B('>' + C('H', a.length), a);
    }
    function H(a) {
        return B('>' + C('L', a.length), a);
    }
    function t(a, b, e) {
        var d = Object.keys(a).length,
            f = B('>H', [d]);
        d = -1 < ['0th', '1st'].indexOf(b) ? 12 * d + 6 : 2 + 12 * d;
        var g = '',
            v = '',
            c;
        for (c in a)
            if (
                ('string' == typeof c && (c = parseInt(c)),
                !(
                    ('0th' == b && -1 < [34665, 34853].indexOf(c)) ||
                    ('Exif' == b && 40965 == c) ||
                    ('1st' == b && -1 < [513, 514].indexOf(c))
                ))
            ) {
                var q = a[c],
                    x = B('>H', [c]),
                    t = h[b][c].type,
                    A = B('>H', [G[t]]);
                'number' == typeof q && (q = [q]);
                var l,
                    r = void 0,
                    n = t;
                t = 8 + d + e + v.length;
                var F = (l = '');
                if ('Byte' == n)
                    (r = q.length), 4 >= r ? (F = E(q) + C('\x00', 4 - r)) : ((F = B('>L', [t])), (l = E(q)));
                else if ('Short' == n)
                    (r = q.length), 2 >= r ? (F = p(q) + C('\x00\x00', 2 - r)) : ((F = B('>L', [t])), (l = p(q)));
                else if ('Long' == n) (r = q.length), 1 >= r ? (F = H(q)) : ((F = B('>L', [t])), (l = H(q)));
                else if ('Ascii' == n)
                    (n = q + '\x00'),
                        (r = n.length),
                        4 < r ? ((F = B('>L', [t])), (l = n)) : (F = n + C('\x00', 4 - r));
                else if ('Rational' == n) {
                    if ('number' == typeof q[0]) (r = 1), (F = q[0]), (l = q[1]), (n = B('>L', [F]) + B('>L', [l]));
                    else {
                        r = q.length;
                        n = '';
                        for (var m = 0; m < r; m++) (F = q[m][0]), (l = q[m][1]), (n += B('>L', [F]) + B('>L', [l]));
                    }
                    F = B('>L', [t]);
                    l = n;
                } else if ('SRational' == n) {
                    if ('number' == typeof q[0]) (r = 1), (F = q[0]), (l = q[1]), (n = B('>l', [F]) + B('>l', [l]));
                    else
                        for (r = q.length, n = '', m = 0; m < r; m++)
                            (F = q[m][0]), (l = q[m][1]), (n += B('>l', [F]) + B('>l', [l]));
                    F = B('>L', [t]);
                    l = n;
                } else
                    'Undefined' == n &&
                        ((r = q.length), 4 < r ? ((F = B('>L', [t])), (l = q)) : (F = q + C('\x00', 4 - r)));
                r = [B('>L', [r]), F, l];
                q = r[2];
                g += x + A + r[0] + r[1];
                v += q;
            }
        return [f + g, v];
    }
    function K(a) {
        if ('\u00ff\u00d8' == a.slice(0, 2)) {
            a = z(a);
            a: {
                for (var b, e = 0; e < a.length; e++)
                    if (((b = a[e]), '\u00ff\u00e1' == b.slice(0, 2) && 'Exif\x00\x00' == b.slice(4, 10))) {
                        a = b;
                        break a;
                    }
                a = null;
            }
            this.tiftag = a ? a.slice(10) : null;
        } else if (-1 < ['II', 'MM'].indexOf(a.slice(0, 2))) this.tiftag = a;
        else if ('Exif' == a.slice(0, 4)) this.tiftag = a.slice(6);
        else throw 'Given file is neither JPEG nor TIFF.';
    }
    function B(a, b) {
        if (!(b instanceof Array)) throw "'pack' error. Got invalid type argument.";
        if (a.length - 1 != b.length) throw "'pack' error. " + (a.length - 1) + ' marks, ' + b.length + ' elements.';
        if ('<' == a[0]) var e = !0;
        else if ('>' == a[0]) e = !1;
        else throw '';
        for (var d = '', f = 1, g, h; (h = a[f]); ) {
            if ('b' == h.toLowerCase()) {
                g = b[f - 1];
                'b' == h && 0 > g && (g += 256);
                if (255 < g || 0 > g) throw "'pack' error.";
                g = String.fromCharCode(g);
            } else if ('H' == h) {
                g = b[f - 1];
                if (65535 < g || 0 > g) throw "'pack' error.";
                g = String.fromCharCode(Math.floor((g % 65536) / 256)) + String.fromCharCode(g % 256);
                e && (g = g.split('').reverse().join(''));
            } else if ('l' == h.toLowerCase()) {
                g = b[f - 1];
                'l' == h && 0 > g && (g += 4294967296);
                if (4294967295 < g || 0 > g) throw "'pack' error.";
                g =
                    String.fromCharCode(Math.floor(g / 16777216)) +
                    String.fromCharCode(Math.floor((g % 16777216) / 65536)) +
                    String.fromCharCode(Math.floor((g % 65536) / 256)) +
                    String.fromCharCode(g % 256);
                e && (g = g.split('').reverse().join(''));
            } else throw "'pack' error.";
            d += g;
            f += 1;
        }
        return d;
    }
    function y(a, b) {
        if ('string' != typeof b) throw "'unpack' error. Got invalid type argument.";
        for (var e = 0, d = 1; d < a.length; d++)
            if ('b' == a[d].toLowerCase()) e += 1;
            else if ('h' == a[d].toLowerCase()) e += 2;
            else if ('l' == a[d].toLowerCase()) e += 4;
            else throw "'unpack' error. Got invalid mark.";
        if (e != b.length) throw "'unpack' error. Mismatch between symbol and string length. " + e + ':' + b.length;
        if ('<' == a[0]) e = !0;
        else if ('>' == a[0]) e = !1;
        else throw "'unpack' error.";
        d = [];
        for (var f = 0, g = 1, h, c, q; (c = a[g]); ) {
            if ('b' == c.toLowerCase())
                (q = 1), (h = b.slice(f, f + q)), (h = h.charCodeAt(0)), 'b' == c && 128 <= h && (h -= 256);
            else if ('H' == c)
                (q = 2),
                    (h = b.slice(f, f + q)),
                    e && (h = h.split('').reverse().join('')),
                    (h = 256 * h.charCodeAt(0) + h.charCodeAt(1));
            else if ('l' == c.toLowerCase())
                (q = 4),
                    (h = b.slice(f, f + q)),
                    e && (h = h.split('').reverse().join('')),
                    (h =
                        16777216 * h.charCodeAt(0) + 65536 * h.charCodeAt(1) + 256 * h.charCodeAt(2) + h.charCodeAt(3)),
                    'l' == c && 2147483648 <= h && (h -= 4294967296);
            else throw "'unpack' error. " + c;
            d.push(h);
            f += q;
            g += 1;
        }
        return d;
    }
    function C(a, b) {
        for (var e = '', d = 0; d < b; d++) e += a;
        return e;
    }
    function z(a) {
        if ('\u00ff\u00d8' != a.slice(0, 2)) throw "Given data isn't JPEG.";
        for (var b = 2, e = ['\u00ff\u00d8']; ; ) {
            if ('\u00ff\u00da' == a.slice(b, b + 2)) {
                e.push(a.slice(b));
                break;
            } else {
                var d = y('>H', a.slice(b + 2, b + 4))[0];
                d = b + d + 2;
                e.push(a.slice(b, d));
                b = d;
            }
            if (b >= a.length) throw 'Wrong JPEG data.';
        }
        return e;
    }
    var a = {
        version: '1.03',
        remove: function (a) {
            var b = !1;
            if ('\u00ff\u00d8' != a.slice(0, 2))
                if ('data:image/jpeg;base64,' == a.slice(0, 23) || 'data:image/jpg;base64,' == a.slice(0, 22))
                    (a = d(a.split(',')[1])), (b = !0);
                else throw 'Given data is not jpeg.';
            a = z(a);
            if ('\u00ff\u00e1' == a[1].slice(0, 2) && 'Exif\x00\x00' == a[1].slice(4, 10))
                a = [a[0]].concat(a.slice(2));
            else if ('\u00ff\u00e1' == a[2].slice(0, 2) && 'Exif\x00\x00' == a[2].slice(4, 10))
                a = a.slice(0, 2).concat(a.slice(3));
            else throw 'Exif not found.';
            a = a.join('');
            b && (a = 'data:image/jpeg;base64,' + g(a));
            return a;
        },
        insert: function (a, b) {
            var e = !1;
            if ('Exif\x00\x00' != a.slice(0, 6)) throw 'Given data is not exif.';
            if ('\u00ff\u00d8' != b.slice(0, 2))
                if ('data:image/jpeg;base64,' == b.slice(0, 23) || 'data:image/jpg;base64,' == b.slice(0, 22))
                    (b = d(b.split(',')[1])), (e = !0);
                else throw 'Given data is not jpeg.';
            var f = '\u00ff\u00e1' + B('>H', [a.length + 2]) + a,
                h = z(b);
            '\u00ff\u00e0' == h[1].slice(0, 2) &&
            '\u00ff\u00e1' == h[2].slice(0, 2) &&
            'Exif\x00\x00' == h[2].slice(4, 10)
                ? f
                    ? ((h[2] = f), (h = ['\u00ff\u00d8'].concat(h.slice(2))))
                    : (h = null == f ? h.slice(0, 2).concat(h.slice(3)) : h.slice(0).concat(h.slice(2)))
                : '\u00ff\u00e0' == h[1].slice(0, 2)
                ? f && (h[1] = f)
                : '\u00ff\u00e1' == h[1].slice(0, 2) && 'Exif\x00\x00' == h[1].slice(4, 10)
                ? f
                    ? (h[1] = f)
                    : null == f && (h = h.slice(0).concat(h.slice(2)))
                : f && (h = [h[0], f].concat(h.slice(1)));
            f = h.join('');
            e && (f = 'data:image/jpeg;base64,' + g(f));
            return f;
        },
        load: function (a) {
            if ('string' == typeof a)
                if ('\u00ff\u00d8' == a.slice(0, 2)) var b = a;
                else if ('data:image/jpeg;base64,' == a.slice(0, 23) || 'data:image/jpg;base64,' == a.slice(0, 22))
                    b = d(a.split(',')[1]);
                else if ('Exif' == a.slice(0, 4)) b = a.slice(6);
                else throw "'load' gots invalid file data.";
            else throw "'load' gots invalid type argument.";
            a = { '0th': {}, Exif: {}, GPS: {}, Interop: {}, '1st': {}, thumbnail: null };
            b = new K(b);
            if (null === b.tiftag) return a;
            'II' == b.tiftag.slice(0, 2) ? (b.endian_mark = '<') : (b.endian_mark = '>');
            var e = y(b.endian_mark + 'L', b.tiftag.slice(4, 8))[0];
            a['0th'] = b.get_ifd(e, '0th');
            var f = a['0th'].first_ifd_pointer;
            delete a['0th'].first_ifd_pointer;
            34665 in a['0th'] && ((e = a['0th'][34665]), (a.Exif = b.get_ifd(e, 'Exif')));
            34853 in a['0th'] && ((e = a['0th'][34853]), (a.GPS = b.get_ifd(e, 'GPS')));
            40965 in a.Exif && ((e = a.Exif[40965]), (a.Interop = b.get_ifd(e, 'Interop')));
            '\x00\x00\x00\x00' != f &&
                ((e = y(b.endian_mark + 'L', f)[0]),
                (a['1st'] = b.get_ifd(e, '1st')),
                513 in a['1st'] &&
                    514 in a['1st'] &&
                    ((b = b.tiftag.slice(a['1st'][513], a['1st'][513] + a['1st'][514])), (a.thumbnail = b)));
            return a;
        },
        dump: function (d) {
            var b = JSON.parse(JSON.stringify(d)),
                e = (d = !1),
                f = !1,
                g = !1,
                h = '0th' in b ? b['0th'] : {};
            if (('Exif' in b && Object.keys(b.Exif).length) || ('Interop' in b && Object.keys(b.Interop).length)) {
                h[34665] = 1;
                d = !0;
                var p = b.Exif;
                if ('Interop' in b && Object.keys(b.Interop).length) {
                    p[40965] = 1;
                    f = !0;
                    var c = b.Interop;
                } else -1 < Object.keys(p).indexOf(a.ExifIFD.InteroperabilityTag.toString()) && delete p[40965];
            } else -1 < Object.keys(h).indexOf(a.ImageIFD.ExifTag.toString()) && delete h[34665];
            if ('GPS' in b && Object.keys(b.GPS).length) {
                h[a.ImageIFD.GPSTag] = 1;
                e = !0;
                var q = b.GPS;
            } else -1 < Object.keys(h).indexOf(a.ImageIFD.GPSTag.toString()) && delete h[a.ImageIFD.GPSTag];
            if ('1st' in b && 'thumbnail' in b && null != b.thumbnail) {
                g = !0;
                b['1st'][513] = 1;
                b['1st'][514] = 1;
                var x = b['1st'];
            }
            var D = t(h, '0th', 0),
                A = D[0].length + 12 * d + 12 * e + 4 + D[1].length;
            h = '';
            var l = 0,
                r = '',
                n = 0,
                F = '',
                m = 0,
                N = '',
                M;
            if (d) {
                var I = t(p, 'Exif', A);
                l = I[0].length + 12 * f + I[1].length;
            }
            e && ((r = t(q, 'GPS', A + l)), (r = r.join('')), (n = r.length));
            f && ((F = t(c, 'Interop', A + l + n)), (F = F.join('')), (m = F.length));
            if (g) {
                var y = t(x, '1st', A + l + n + m);
                for (M = z(b.thumbnail); '\u00ff\u00e0' <= M[1].slice(0, 2) && '\u00ff\u00ef' >= M[1].slice(0, 2); )
                    M = [M[0]].concat(M.slice(2));
                M = M.join('');
                if (64e3 < M.length) throw 'Given thumbnail is too large. max 64kB';
            }
            x = c = b = '';
            p = '\x00\x00\x00\x00';
            if (d) {
                q = B('>L', [8 + A]);
                var P = B('>H', [34665]),
                    U = B('>H', [G.Long]),
                    C = B('>L', [1]);
                b = P + U + C + q;
            }
            e &&
                ((q = B('>L', [8 + A + l])),
                (P = B('>H', [34853])),
                (U = B('>H', [G.Long])),
                (C = B('>L', [1])),
                (c = P + U + C + q));
            f &&
                ((q = B('>L', [8 + A + l + n])),
                (P = B('>H', [40965])),
                (U = B('>H', [G.Long])),
                (C = B('>L', [1])),
                (x = P + U + C + q));
            g &&
                ((e = 8 + A + l + n + m),
                (p = B('>L', [e])),
                (e = '\u0002\u0001\x00\u0004\x00\x00\x00\u0001' + B('>L', [e + y[0].length + 24 + 4 + y[1].length])),
                (f = '\u0002\u0002\x00\u0004\x00\x00\x00\u0001' + B('>L', [M.length])),
                (N = y[0] + e + f + '\x00\x00\x00\x00' + y[1] + M));
            y = D[0] + b + c + p + D[1];
            d && (h = I[0] + x + I[1]);
            return 'Exif\x00\x00MM\x00*\x00\x00\x00\b' + y + h + r + F + N;
        },
    };
    K.prototype = {
        get_ifd: function (a, b) {
            for (
                var e = {},
                    d = y(this.endian_mark + 'H', this.tiftag.slice(a, a + 2))[0],
                    f = a + 2,
                    g = -1 < ['0th', '1st'].indexOf(b) ? 'Image' : b,
                    p = 0;
                p < d;
                p++
            ) {
                a = f + 12 * p;
                var c = y(this.endian_mark + 'H', this.tiftag.slice(a, a + 2))[0],
                    q = y(this.endian_mark + 'H', this.tiftag.slice(a + 2, a + 4))[0],
                    x = y(this.endian_mark + 'L', this.tiftag.slice(a + 4, a + 8))[0],
                    t = this.tiftag.slice(a + 8, a + 12);
                q = [q, x, t];
                c in h[g] && (e[c] = this.convert_value(q));
            }
            '0th' == b && ((a = f + 12 * d), (e.first_ifd_pointer = this.tiftag.slice(a, a + 4)));
            return e;
        },
        convert_value: function (a) {
            var b = a[0],
                e = a[1];
            a = a[2];
            if (1 == b)
                4 < e
                    ? ((a = y(this.endian_mark + 'L', a)[0]),
                      (b = y(this.endian_mark + C('B', e), this.tiftag.slice(a, a + e))))
                    : (b = y(this.endian_mark + C('B', e), a.slice(0, e)));
            else if (2 == b)
                4 < e
                    ? ((a = y(this.endian_mark + 'L', a)[0]), (b = this.tiftag.slice(a, a + e - 1)))
                    : (b = a.slice(0, e - 1));
            else if (3 == b)
                2 < e
                    ? ((a = y(this.endian_mark + 'L', a)[0]),
                      (b = y(this.endian_mark + C('H', e), this.tiftag.slice(a, a + 2 * e))))
                    : (b = y(this.endian_mark + C('H', e), a.slice(0, 2 * e)));
            else if (4 == b)
                1 < e
                    ? ((a = y(this.endian_mark + 'L', a)[0]),
                      (b = y(this.endian_mark + C('L', e), this.tiftag.slice(a, a + 4 * e))))
                    : (b = y(this.endian_mark + C('L', e), a));
            else if (5 == b)
                if (((a = y(this.endian_mark + 'L', a)[0]), 1 < e)) {
                    b = [];
                    for (var d = 0; d < e; d++)
                        b.push([
                            y(this.endian_mark + 'L', this.tiftag.slice(a + 8 * d, a + 4 + 8 * d))[0],
                            y(this.endian_mark + 'L', this.tiftag.slice(a + 4 + 8 * d, a + 8 + 8 * d))[0],
                        ]);
                } else
                    b = [
                        y(this.endian_mark + 'L', this.tiftag.slice(a, a + 4))[0],
                        y(this.endian_mark + 'L', this.tiftag.slice(a + 4, a + 8))[0],
                    ];
            else if (7 == b)
                4 < e
                    ? ((a = y(this.endian_mark + 'L', a)[0]), (b = this.tiftag.slice(a, a + e)))
                    : (b = a.slice(0, e));
            else if (10 == b)
                if (((a = y(this.endian_mark + 'L', a)[0]), 1 < e))
                    for (b = [], d = 0; d < e; d++)
                        b.push([
                            y(this.endian_mark + 'l', this.tiftag.slice(a + 8 * d, a + 4 + 8 * d))[0],
                            y(this.endian_mark + 'l', this.tiftag.slice(a + 4 + 8 * d, a + 8 + 8 * d))[0],
                        ]);
                else
                    b = [
                        y(this.endian_mark + 'l', this.tiftag.slice(a, a + 4))[0],
                        y(this.endian_mark + 'l', this.tiftag.slice(a + 4, a + 8))[0],
                    ];
            else throw 'Exif might be wrong. Got incorrect value type to decode. type:' + b;
            return b instanceof Array && 1 == b.length ? b[0] : b;
        },
    };
    if ('undefined' !== typeof window && 'function' === typeof window.btoa) var g = window.btoa;
    'undefined' === typeof g &&
        (g = function (a) {
            for (var b = '', d, f, g, h, p, c, q = 0; q < a.length; )
                (d = a.charCodeAt(q++)),
                    (f = a.charCodeAt(q++)),
                    (g = a.charCodeAt(q++)),
                    (h = d >> 2),
                    (d = ((d & 3) << 4) | (f >> 4)),
                    (p = ((f & 15) << 2) | (g >> 6)),
                    (c = g & 63),
                    isNaN(f) ? (p = c = 64) : isNaN(g) && (c = 64),
                    (b =
                        b +
                        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(h) +
                        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(d) +
                        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(p) +
                        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(c));
            return b;
        });
    if ('undefined' !== typeof window && 'function' === typeof window.atob) var d = window.atob;
    'undefined' === typeof d &&
        (d = function (a) {
            var b = '',
                d = 0;
            for (a = a.replace(/[^A-Za-z0-9\+\/=]/g, ''); d < a.length; ) {
                var f = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(a.charAt(d++)),
                    g = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(a.charAt(d++)),
                    h = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(a.charAt(d++)),
                    p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(a.charAt(d++));
                f = (f << 2) | (g >> 4);
                g = ((g & 15) << 4) | (h >> 2);
                var c = ((h & 3) << 6) | p;
                b += String.fromCharCode(f);
                64 != h && (b += String.fromCharCode(g));
                64 != p && (b += String.fromCharCode(c));
            }
            return b;
        });
    var G = { Byte: 1, Ascii: 2, Short: 3, Long: 4, Rational: 5, Undefined: 7, SLong: 9, SRational: 10 },
        h = {
            Image: {
                11: { name: 'ProcessingSoftware', type: 'Ascii' },
                254: { name: 'NewSubfileType', type: 'Long' },
                255: { name: 'SubfileType', type: 'Short' },
                256: { name: 'ImageWidth', type: 'Long' },
                257: { name: 'ImageLength', type: 'Long' },
                258: { name: 'BitsPerSample', type: 'Short' },
                259: { name: 'Compression', type: 'Short' },
                262: { name: 'PhotometricInterpretation', type: 'Short' },
                263: { name: 'Threshholding', type: 'Short' },
                264: { name: 'CellWidth', type: 'Short' },
                265: { name: 'CellLength', type: 'Short' },
                266: { name: 'FillOrder', type: 'Short' },
                269: { name: 'DocumentName', type: 'Ascii' },
                270: { name: 'ImageDescription', type: 'Ascii' },
                271: { name: 'Make', type: 'Ascii' },
                272: { name: 'Model', type: 'Ascii' },
                273: { name: 'StripOffsets', type: 'Long' },
                274: { name: 'Orientation', type: 'Short' },
                277: { name: 'SamplesPerPixel', type: 'Short' },
                278: { name: 'RowsPerStrip', type: 'Long' },
                279: { name: 'StripByteCounts', type: 'Long' },
                282: { name: 'XResolution', type: 'Rational' },
                283: { name: 'YResolution', type: 'Rational' },
                284: { name: 'PlanarConfiguration', type: 'Short' },
                290: { name: 'GrayResponseUnit', type: 'Short' },
                291: { name: 'GrayResponseCurve', type: 'Short' },
                292: { name: 'T4Options', type: 'Long' },
                293: { name: 'T6Options', type: 'Long' },
                296: { name: 'ResolutionUnit', type: 'Short' },
                301: { name: 'TransferFunction', type: 'Short' },
                305: { name: 'Software', type: 'Ascii' },
                306: { name: 'DateTime', type: 'Ascii' },
                315: { name: 'Artist', type: 'Ascii' },
                316: { name: 'HostComputer', type: 'Ascii' },
                317: { name: 'Predictor', type: 'Short' },
                318: { name: 'WhitePoint', type: 'Rational' },
                319: { name: 'PrimaryChromaticities', type: 'Rational' },
                320: { name: 'ColorMap', type: 'Short' },
                321: { name: 'HalftoneHints', type: 'Short' },
                322: { name: 'TileWidth', type: 'Short' },
                323: { name: 'TileLength', type: 'Short' },
                324: { name: 'TileOffsets', type: 'Short' },
                325: { name: 'TileByteCounts', type: 'Short' },
                330: { name: 'SubIFDs', type: 'Long' },
                332: { name: 'InkSet', type: 'Short' },
                333: { name: 'InkNames', type: 'Ascii' },
                334: { name: 'NumberOfInks', type: 'Short' },
                336: { name: 'DotRange', type: 'Byte' },
                337: { name: 'TargetPrinter', type: 'Ascii' },
                338: { name: 'ExtraSamples', type: 'Short' },
                339: { name: 'SampleFormat', type: 'Short' },
                340: { name: 'SMinSampleValue', type: 'Short' },
                341: { name: 'SMaxSampleValue', type: 'Short' },
                342: { name: 'TransferRange', type: 'Short' },
                343: { name: 'ClipPath', type: 'Byte' },
                344: { name: 'XClipPathUnits', type: 'Long' },
                345: { name: 'YClipPathUnits', type: 'Long' },
                346: { name: 'Indexed', type: 'Short' },
                347: { name: 'JPEGTables', type: 'Undefined' },
                351: { name: 'OPIProxy', type: 'Short' },
                512: { name: 'JPEGProc', type: 'Long' },
                513: { name: 'JPEGInterchangeFormat', type: 'Long' },
                514: { name: 'JPEGInterchangeFormatLength', type: 'Long' },
                515: { name: 'JPEGRestartInterval', type: 'Short' },
                517: { name: 'JPEGLosslessPredictors', type: 'Short' },
                518: { name: 'JPEGPointTransforms', type: 'Short' },
                519: { name: 'JPEGQTables', type: 'Long' },
                520: { name: 'JPEGDCTables', type: 'Long' },
                521: { name: 'JPEGACTables', type: 'Long' },
                529: { name: 'YCbCrCoefficients', type: 'Rational' },
                530: { name: 'YCbCrSubSampling', type: 'Short' },
                531: { name: 'YCbCrPositioning', type: 'Short' },
                532: { name: 'ReferenceBlackWhite', type: 'Rational' },
                700: { name: 'XMLPacket', type: 'Byte' },
                18246: { name: 'Rating', type: 'Short' },
                18249: { name: 'RatingPercent', type: 'Short' },
                32781: { name: 'ImageID', type: 'Ascii' },
                33421: { name: 'CFARepeatPatternDim', type: 'Short' },
                33422: { name: 'CFAPattern', type: 'Byte' },
                33423: { name: 'BatteryLevel', type: 'Rational' },
                33432: { name: 'Copyright', type: 'Ascii' },
                33434: { name: 'ExposureTime', type: 'Rational' },
                34377: { name: 'ImageResources', type: 'Byte' },
                34665: { name: 'ExifTag', type: 'Long' },
                34675: { name: 'InterColorProfile', type: 'Undefined' },
                34853: { name: 'GPSTag', type: 'Long' },
                34857: { name: 'Interlace', type: 'Short' },
                34858: { name: 'TimeZoneOffset', type: 'Long' },
                34859: { name: 'SelfTimerMode', type: 'Short' },
                37387: { name: 'FlashEnergy', type: 'Rational' },
                37388: { name: 'SpatialFrequencyResponse', type: 'Undefined' },
                37389: { name: 'Noise', type: 'Undefined' },
                37390: { name: 'FocalPlaneXResolution', type: 'Rational' },
                37391: { name: 'FocalPlaneYResolution', type: 'Rational' },
                37392: { name: 'FocalPlaneResolutionUnit', type: 'Short' },
                37393: { name: 'ImageNumber', type: 'Long' },
                37394: { name: 'SecurityClassification', type: 'Ascii' },
                37395: { name: 'ImageHistory', type: 'Ascii' },
                37397: { name: 'ExposureIndex', type: 'Rational' },
                37398: { name: 'TIFFEPStandardID', type: 'Byte' },
                37399: { name: 'SensingMethod', type: 'Short' },
                40091: { name: 'XPTitle', type: 'Byte' },
                40092: { name: 'XPComment', type: 'Byte' },
                40093: { name: 'XPAuthor', type: 'Byte' },
                40094: { name: 'XPKeywords', type: 'Byte' },
                40095: { name: 'XPSubject', type: 'Byte' },
                50341: { name: 'PrintImageMatching', type: 'Undefined' },
                50706: { name: 'DNGVersion', type: 'Byte' },
                50707: { name: 'DNGBackwardVersion', type: 'Byte' },
                50708: { name: 'UniqueCameraModel', type: 'Ascii' },
                50709: { name: 'LocalizedCameraModel', type: 'Byte' },
                50710: { name: 'CFAPlaneColor', type: 'Byte' },
                50711: { name: 'CFALayout', type: 'Short' },
                50712: { name: 'LinearizationTable', type: 'Short' },
                50713: { name: 'BlackLevelRepeatDim', type: 'Short' },
                50714: { name: 'BlackLevel', type: 'Rational' },
                50715: { name: 'BlackLevelDeltaH', type: 'SRational' },
                50716: { name: 'BlackLevelDeltaV', type: 'SRational' },
                50717: { name: 'WhiteLevel', type: 'Short' },
                50718: { name: 'DefaultScale', type: 'Rational' },
                50719: { name: 'DefaultCropOrigin', type: 'Short' },
                50720: { name: 'DefaultCropSize', type: 'Short' },
                50721: { name: 'ColorMatrix1', type: 'SRational' },
                50722: { name: 'ColorMatrix2', type: 'SRational' },
                50723: { name: 'CameraCalibration1', type: 'SRational' },
                50724: { name: 'CameraCalibration2', type: 'SRational' },
                50725: { name: 'ReductionMatrix1', type: 'SRational' },
                50726: { name: 'ReductionMatrix2', type: 'SRational' },
                50727: { name: 'AnalogBalance', type: 'Rational' },
                50728: { name: 'AsShotNeutral', type: 'Short' },
                50729: { name: 'AsShotWhiteXY', type: 'Rational' },
                50730: { name: 'BaselineExposure', type: 'SRational' },
                50731: { name: 'BaselineNoise', type: 'Rational' },
                50732: { name: 'BaselineSharpness', type: 'Rational' },
                50733: { name: 'BayerGreenSplit', type: 'Long' },
                50734: { name: 'LinearResponseLimit', type: 'Rational' },
                50735: { name: 'CameraSerialNumber', type: 'Ascii' },
                50736: { name: 'LensInfo', type: 'Rational' },
                50737: { name: 'ChromaBlurRadius', type: 'Rational' },
                50738: { name: 'AntiAliasStrength', type: 'Rational' },
                50739: { name: 'ShadowScale', type: 'SRational' },
                50740: { name: 'DNGPrivateData', type: 'Byte' },
                50741: { name: 'MakerNoteSafety', type: 'Short' },
                50778: { name: 'CalibrationIlluminant1', type: 'Short' },
                50779: { name: 'CalibrationIlluminant2', type: 'Short' },
                50780: { name: 'BestQualityScale', type: 'Rational' },
                50781: { name: 'RawDataUniqueID', type: 'Byte' },
                50827: { name: 'OriginalRawFileName', type: 'Byte' },
                50828: { name: 'OriginalRawFileData', type: 'Undefined' },
                50829: { name: 'ActiveArea', type: 'Short' },
                50830: { name: 'MaskedAreas', type: 'Short' },
                50831: { name: 'AsShotICCProfile', type: 'Undefined' },
                50832: { name: 'AsShotPreProfileMatrix', type: 'SRational' },
                50833: { name: 'CurrentICCProfile', type: 'Undefined' },
                50834: { name: 'CurrentPreProfileMatrix', type: 'SRational' },
                50879: { name: 'ColorimetricReference', type: 'Short' },
                50931: { name: 'CameraCalibrationSignature', type: 'Byte' },
                50932: { name: 'ProfileCalibrationSignature', type: 'Byte' },
                50934: { name: 'AsShotProfileName', type: 'Byte' },
                50935: { name: 'NoiseReductionApplied', type: 'Rational' },
                50936: { name: 'ProfileName', type: 'Byte' },
                50937: { name: 'ProfileHueSatMapDims', type: 'Long' },
                50938: { name: 'ProfileHueSatMapData1', type: 'Float' },
                50939: { name: 'ProfileHueSatMapData2', type: 'Float' },
                50940: { name: 'ProfileToneCurve', type: 'Float' },
                50941: { name: 'ProfileEmbedPolicy', type: 'Long' },
                50942: { name: 'ProfileCopyright', type: 'Byte' },
                50964: { name: 'ForwardMatrix1', type: 'SRational' },
                50965: { name: 'ForwardMatrix2', type: 'SRational' },
                50966: { name: 'PreviewApplicationName', type: 'Byte' },
                50967: { name: 'PreviewApplicationVersion', type: 'Byte' },
                50968: { name: 'PreviewSettingsName', type: 'Byte' },
                50969: { name: 'PreviewSettingsDigest', type: 'Byte' },
                50970: { name: 'PreviewColorSpace', type: 'Long' },
                50971: { name: 'PreviewDateTime', type: 'Ascii' },
                50972: { name: 'RawImageDigest', type: 'Undefined' },
                50973: { name: 'OriginalRawFileDigest', type: 'Undefined' },
                50974: { name: 'SubTileBlockSize', type: 'Long' },
                50975: { name: 'RowInterleaveFactor', type: 'Long' },
                50981: { name: 'ProfileLookTableDims', type: 'Long' },
                50982: { name: 'ProfileLookTableData', type: 'Float' },
                51008: { name: 'OpcodeList1', type: 'Undefined' },
                51009: { name: 'OpcodeList2', type: 'Undefined' },
                51022: { name: 'OpcodeList3', type: 'Undefined' },
            },
            Exif: {
                33434: { name: 'ExposureTime', type: 'Rational' },
                33437: { name: 'FNumber', type: 'Rational' },
                34850: { name: 'ExposureProgram', type: 'Short' },
                34852: { name: 'SpectralSensitivity', type: 'Ascii' },
                34855: { name: 'ISOSpeedRatings', type: 'Short' },
                34856: { name: 'OECF', type: 'Undefined' },
                34864: { name: 'SensitivityType', type: 'Short' },
                34865: { name: 'StandardOutputSensitivity', type: 'Long' },
                34866: { name: 'RecommendedExposureIndex', type: 'Long' },
                34867: { name: 'ISOSpeed', type: 'Long' },
                34868: { name: 'ISOSpeedLatitudeyyy', type: 'Long' },
                34869: { name: 'ISOSpeedLatitudezzz', type: 'Long' },
                36864: { name: 'ExifVersion', type: 'Undefined' },
                36867: { name: 'DateTimeOriginal', type: 'Ascii' },
                36868: { name: 'DateTimeDigitized', type: 'Ascii' },
                37121: { name: 'ComponentsConfiguration', type: 'Undefined' },
                37122: { name: 'CompressedBitsPerPixel', type: 'Rational' },
                37377: { name: 'ShutterSpeedValue', type: 'SRational' },
                37378: { name: 'ApertureValue', type: 'Rational' },
                37379: { name: 'BrightnessValue', type: 'SRational' },
                37380: { name: 'ExposureBiasValue', type: 'SRational' },
                37381: { name: 'MaxApertureValue', type: 'Rational' },
                37382: { name: 'SubjectDistance', type: 'Rational' },
                37383: { name: 'MeteringMode', type: 'Short' },
                37384: { name: 'LightSource', type: 'Short' },
                37385: { name: 'Flash', type: 'Short' },
                37386: { name: 'FocalLength', type: 'Rational' },
                37396: { name: 'SubjectArea', type: 'Short' },
                37500: { name: 'MakerNote', type: 'Undefined' },
                37510: { name: 'UserComment', type: 'Ascii' },
                37520: { name: 'SubSecTime', type: 'Ascii' },
                37521: { name: 'SubSecTimeOriginal', type: 'Ascii' },
                37522: { name: 'SubSecTimeDigitized', type: 'Ascii' },
                40960: { name: 'FlashpixVersion', type: 'Undefined' },
                40961: { name: 'ColorSpace', type: 'Short' },
                40962: { name: 'PixelXDimension', type: 'Long' },
                40963: { name: 'PixelYDimension', type: 'Long' },
                40964: { name: 'RelatedSoundFile', type: 'Ascii' },
                40965: { name: 'InteroperabilityTag', type: 'Long' },
                41483: { name: 'FlashEnergy', type: 'Rational' },
                41484: { name: 'SpatialFrequencyResponse', type: 'Undefined' },
                41486: { name: 'FocalPlaneXResolution', type: 'Rational' },
                41487: { name: 'FocalPlaneYResolution', type: 'Rational' },
                41488: { name: 'FocalPlaneResolutionUnit', type: 'Short' },
                41492: { name: 'SubjectLocation', type: 'Short' },
                41493: { name: 'ExposureIndex', type: 'Rational' },
                41495: { name: 'SensingMethod', type: 'Short' },
                41728: { name: 'FileSource', type: 'Undefined' },
                41729: { name: 'SceneType', type: 'Undefined' },
                41730: { name: 'CFAPattern', type: 'Undefined' },
                41985: { name: 'CustomRendered', type: 'Short' },
                41986: { name: 'ExposureMode', type: 'Short' },
                41987: { name: 'WhiteBalance', type: 'Short' },
                41988: { name: 'DigitalZoomRatio', type: 'Rational' },
                41989: { name: 'FocalLengthIn35mmFilm', type: 'Short' },
                41990: { name: 'SceneCaptureType', type: 'Short' },
                41991: { name: 'GainControl', type: 'Short' },
                41992: { name: 'Contrast', type: 'Short' },
                41993: { name: 'Saturation', type: 'Short' },
                41994: { name: 'Sharpness', type: 'Short' },
                41995: { name: 'DeviceSettingDescription', type: 'Undefined' },
                41996: { name: 'SubjectDistanceRange', type: 'Short' },
                42016: { name: 'ImageUniqueID', type: 'Ascii' },
                42032: { name: 'CameraOwnerName', type: 'Ascii' },
                42033: { name: 'BodySerialNumber', type: 'Ascii' },
                42034: { name: 'LensSpecification', type: 'Rational' },
                42035: { name: 'LensMake', type: 'Ascii' },
                42036: { name: 'LensModel', type: 'Ascii' },
                42037: { name: 'LensSerialNumber', type: 'Ascii' },
                42240: { name: 'Gamma', type: 'Rational' },
            },
            GPS: {
                0: { name: 'GPSVersionID', type: 'Byte' },
                1: { name: 'GPSLatitudeRef', type: 'Ascii' },
                2: { name: 'GPSLatitude', type: 'Rational' },
                3: { name: 'GPSLongitudeRef', type: 'Ascii' },
                4: { name: 'GPSLongitude', type: 'Rational' },
                5: { name: 'GPSAltitudeRef', type: 'Byte' },
                6: { name: 'GPSAltitude', type: 'Rational' },
                7: { name: 'GPSTimeStamp', type: 'Rational' },
                8: { name: 'GPSSatellites', type: 'Ascii' },
                9: { name: 'GPSStatus', type: 'Ascii' },
                10: { name: 'GPSMeasureMode', type: 'Ascii' },
                11: { name: 'GPSDOP', type: 'Rational' },
                12: { name: 'GPSSpeedRef', type: 'Ascii' },
                13: { name: 'GPSSpeed', type: 'Rational' },
                14: { name: 'GPSTrackRef', type: 'Ascii' },
                15: { name: 'GPSTrack', type: 'Rational' },
                16: { name: 'GPSImgDirectionRef', type: 'Ascii' },
                17: { name: 'GPSImgDirection', type: 'Rational' },
                18: { name: 'GPSMapDatum', type: 'Ascii' },
                19: { name: 'GPSDestLatitudeRef', type: 'Ascii' },
                20: { name: 'GPSDestLatitude', type: 'Rational' },
                21: { name: 'GPSDestLongitudeRef', type: 'Ascii' },
                22: { name: 'GPSDestLongitude', type: 'Rational' },
                23: { name: 'GPSDestBearingRef', type: 'Ascii' },
                24: { name: 'GPSDestBearing', type: 'Rational' },
                25: { name: 'GPSDestDistanceRef', type: 'Ascii' },
                26: { name: 'GPSDestDistance', type: 'Rational' },
                27: { name: 'GPSProcessingMethod', type: 'Undefined' },
                28: { name: 'GPSAreaInformation', type: 'Undefined' },
                29: { name: 'GPSDateStamp', type: 'Ascii' },
                30: { name: 'GPSDifferential', type: 'Short' },
                31: { name: 'GPSHPositioningError', type: 'Rational' },
            },
            Interop: { 1: { name: 'InteroperabilityIndex', type: 'Ascii' } },
        };
    h['0th'] = h.Image;
    h['1st'] = h.Image;
    a.TAGS = h;
    a.ImageIFD = {
        ProcessingSoftware: 11,
        NewSubfileType: 254,
        SubfileType: 255,
        ImageWidth: 256,
        ImageLength: 257,
        BitsPerSample: 258,
        Compression: 259,
        PhotometricInterpretation: 262,
        Threshholding: 263,
        CellWidth: 264,
        CellLength: 265,
        FillOrder: 266,
        DocumentName: 269,
        ImageDescription: 270,
        Make: 271,
        Model: 272,
        StripOffsets: 273,
        Orientation: 274,
        SamplesPerPixel: 277,
        RowsPerStrip: 278,
        StripByteCounts: 279,
        XResolution: 282,
        YResolution: 283,
        PlanarConfiguration: 284,
        GrayResponseUnit: 290,
        GrayResponseCurve: 291,
        T4Options: 292,
        T6Options: 293,
        ResolutionUnit: 296,
        TransferFunction: 301,
        Software: 305,
        DateTime: 306,
        Artist: 315,
        HostComputer: 316,
        Predictor: 317,
        WhitePoint: 318,
        PrimaryChromaticities: 319,
        ColorMap: 320,
        HalftoneHints: 321,
        TileWidth: 322,
        TileLength: 323,
        TileOffsets: 324,
        TileByteCounts: 325,
        SubIFDs: 330,
        InkSet: 332,
        InkNames: 333,
        NumberOfInks: 334,
        DotRange: 336,
        TargetPrinter: 337,
        ExtraSamples: 338,
        SampleFormat: 339,
        SMinSampleValue: 340,
        SMaxSampleValue: 341,
        TransferRange: 342,
        ClipPath: 343,
        XClipPathUnits: 344,
        YClipPathUnits: 345,
        Indexed: 346,
        JPEGTables: 347,
        OPIProxy: 351,
        JPEGProc: 512,
        JPEGInterchangeFormat: 513,
        JPEGInterchangeFormatLength: 514,
        JPEGRestartInterval: 515,
        JPEGLosslessPredictors: 517,
        JPEGPointTransforms: 518,
        JPEGQTables: 519,
        JPEGDCTables: 520,
        JPEGACTables: 521,
        YCbCrCoefficients: 529,
        YCbCrSubSampling: 530,
        YCbCrPositioning: 531,
        ReferenceBlackWhite: 532,
        XMLPacket: 700,
        Rating: 18246,
        RatingPercent: 18249,
        ImageID: 32781,
        CFARepeatPatternDim: 33421,
        CFAPattern: 33422,
        BatteryLevel: 33423,
        Copyright: 33432,
        ExposureTime: 33434,
        ImageResources: 34377,
        ExifTag: 34665,
        InterColorProfile: 34675,
        GPSTag: 34853,
        Interlace: 34857,
        TimeZoneOffset: 34858,
        SelfTimerMode: 34859,
        FlashEnergy: 37387,
        SpatialFrequencyResponse: 37388,
        Noise: 37389,
        FocalPlaneXResolution: 37390,
        FocalPlaneYResolution: 37391,
        FocalPlaneResolutionUnit: 37392,
        ImageNumber: 37393,
        SecurityClassification: 37394,
        ImageHistory: 37395,
        ExposureIndex: 37397,
        TIFFEPStandardID: 37398,
        SensingMethod: 37399,
        XPTitle: 40091,
        XPComment: 40092,
        XPAuthor: 40093,
        XPKeywords: 40094,
        XPSubject: 40095,
        PrintImageMatching: 50341,
        DNGVersion: 50706,
        DNGBackwardVersion: 50707,
        UniqueCameraModel: 50708,
        LocalizedCameraModel: 50709,
        CFAPlaneColor: 50710,
        CFALayout: 50711,
        LinearizationTable: 50712,
        BlackLevelRepeatDim: 50713,
        BlackLevel: 50714,
        BlackLevelDeltaH: 50715,
        BlackLevelDeltaV: 50716,
        WhiteLevel: 50717,
        DefaultScale: 50718,
        DefaultCropOrigin: 50719,
        DefaultCropSize: 50720,
        ColorMatrix1: 50721,
        ColorMatrix2: 50722,
        CameraCalibration1: 50723,
        CameraCalibration2: 50724,
        ReductionMatrix1: 50725,
        ReductionMatrix2: 50726,
        AnalogBalance: 50727,
        AsShotNeutral: 50728,
        AsShotWhiteXY: 50729,
        BaselineExposure: 50730,
        BaselineNoise: 50731,
        BaselineSharpness: 50732,
        BayerGreenSplit: 50733,
        LinearResponseLimit: 50734,
        CameraSerialNumber: 50735,
        LensInfo: 50736,
        ChromaBlurRadius: 50737,
        AntiAliasStrength: 50738,
        ShadowScale: 50739,
        DNGPrivateData: 50740,
        MakerNoteSafety: 50741,
        CalibrationIlluminant1: 50778,
        CalibrationIlluminant2: 50779,
        BestQualityScale: 50780,
        RawDataUniqueID: 50781,
        OriginalRawFileName: 50827,
        OriginalRawFileData: 50828,
        ActiveArea: 50829,
        MaskedAreas: 50830,
        AsShotICCProfile: 50831,
        AsShotPreProfileMatrix: 50832,
        CurrentICCProfile: 50833,
        CurrentPreProfileMatrix: 50834,
        ColorimetricReference: 50879,
        CameraCalibrationSignature: 50931,
        ProfileCalibrationSignature: 50932,
        AsShotProfileName: 50934,
        NoiseReductionApplied: 50935,
        ProfileName: 50936,
        ProfileHueSatMapDims: 50937,
        ProfileHueSatMapData1: 50938,
        ProfileHueSatMapData2: 50939,
        ProfileToneCurve: 50940,
        ProfileEmbedPolicy: 50941,
        ProfileCopyright: 50942,
        ForwardMatrix1: 50964,
        ForwardMatrix2: 50965,
        PreviewApplicationName: 50966,
        PreviewApplicationVersion: 50967,
        PreviewSettingsName: 50968,
        PreviewSettingsDigest: 50969,
        PreviewColorSpace: 50970,
        PreviewDateTime: 50971,
        RawImageDigest: 50972,
        OriginalRawFileDigest: 50973,
        SubTileBlockSize: 50974,
        RowInterleaveFactor: 50975,
        ProfileLookTableDims: 50981,
        ProfileLookTableData: 50982,
        OpcodeList1: 51008,
        OpcodeList2: 51009,
        OpcodeList3: 51022,
        NoiseProfile: 51041,
    };
    a.ExifIFD = {
        ExposureTime: 33434,
        FNumber: 33437,
        ExposureProgram: 34850,
        SpectralSensitivity: 34852,
        ISOSpeedRatings: 34855,
        OECF: 34856,
        SensitivityType: 34864,
        StandardOutputSensitivity: 34865,
        RecommendedExposureIndex: 34866,
        ISOSpeed: 34867,
        ISOSpeedLatitudeyyy: 34868,
        ISOSpeedLatitudezzz: 34869,
        ExifVersion: 36864,
        DateTimeOriginal: 36867,
        DateTimeDigitized: 36868,
        ComponentsConfiguration: 37121,
        CompressedBitsPerPixel: 37122,
        ShutterSpeedValue: 37377,
        ApertureValue: 37378,
        BrightnessValue: 37379,
        ExposureBiasValue: 37380,
        MaxApertureValue: 37381,
        SubjectDistance: 37382,
        MeteringMode: 37383,
        LightSource: 37384,
        Flash: 37385,
        FocalLength: 37386,
        SubjectArea: 37396,
        MakerNote: 37500,
        UserComment: 37510,
        SubSecTime: 37520,
        SubSecTimeOriginal: 37521,
        SubSecTimeDigitized: 37522,
        FlashpixVersion: 40960,
        ColorSpace: 40961,
        PixelXDimension: 40962,
        PixelYDimension: 40963,
        RelatedSoundFile: 40964,
        InteroperabilityTag: 40965,
        FlashEnergy: 41483,
        SpatialFrequencyResponse: 41484,
        FocalPlaneXResolution: 41486,
        FocalPlaneYResolution: 41487,
        FocalPlaneResolutionUnit: 41488,
        SubjectLocation: 41492,
        ExposureIndex: 41493,
        SensingMethod: 41495,
        FileSource: 41728,
        SceneType: 41729,
        CFAPattern: 41730,
        CustomRendered: 41985,
        ExposureMode: 41986,
        WhiteBalance: 41987,
        DigitalZoomRatio: 41988,
        FocalLengthIn35mmFilm: 41989,
        SceneCaptureType: 41990,
        GainControl: 41991,
        Contrast: 41992,
        Saturation: 41993,
        Sharpness: 41994,
        DeviceSettingDescription: 41995,
        SubjectDistanceRange: 41996,
        ImageUniqueID: 42016,
        CameraOwnerName: 42032,
        BodySerialNumber: 42033,
        LensSpecification: 42034,
        LensMake: 42035,
        LensModel: 42036,
        LensSerialNumber: 42037,
        Gamma: 42240,
    };
    a.GPSIFD = {
        GPSVersionID: 0,
        GPSLatitudeRef: 1,
        GPSLatitude: 2,
        GPSLongitudeRef: 3,
        GPSLongitude: 4,
        GPSAltitudeRef: 5,
        GPSAltitude: 6,
        GPSTimeStamp: 7,
        GPSSatellites: 8,
        GPSStatus: 9,
        GPSMeasureMode: 10,
        GPSDOP: 11,
        GPSSpeedRef: 12,
        GPSSpeed: 13,
        GPSTrackRef: 14,
        GPSTrack: 15,
        GPSImgDirectionRef: 16,
        GPSImgDirection: 17,
        GPSMapDatum: 18,
        GPSDestLatitudeRef: 19,
        GPSDestLatitude: 20,
        GPSDestLongitudeRef: 21,
        GPSDestLongitude: 22,
        GPSDestBearingRef: 23,
        GPSDestBearing: 24,
        GPSDestDistanceRef: 25,
        GPSDestDistance: 26,
        GPSProcessingMethod: 27,
        GPSAreaInformation: 28,
        GPSDateStamp: 29,
        GPSDifferential: 30,
        GPSHPositioningError: 31,
    };
    a.InteropIFD = { InteroperabilityIndex: 1 };
    a.GPSHelper = {
        degToDmsRational: function (a) {
            var b = (a % 1) * 60;
            return [
                [Math.floor(a), 1],
                [Math.floor(b), 1],
                [Math.round((b % 1) * 6e3), 100],
            ];
        },
        dmsRationalToDeg: function (a, b) {
            return (
                (('S' === b || 'W' === b ? -1 : 1) * a[0][0]) / a[0][1] +
                a[1][0] / a[1][1] / 60 +
                a[2][0] / a[2][1] / 3600
            );
        },
    };
    'undefined' !== typeof exports
        ? ('undefined' !== typeof module && module.exports && (exports = module.exports = a), (exports.piexif = a))
        : (window.piexif = a);
})();
var twcaLib = new twidCryptoLibSync(),
    twcaCryptoLibAlertDialog = new TwcaCryptoLibAlertDialog(),
    twcaDialogParams;
function twidCryptoLibSync() {
    function E() {
        var a = !1;
        try {
            window.opener &&
                window.opener.twcaLib &&
                window.location.hostname === window.opener.location.hostname &&
                (window.opener.twcaLib.setOpenWindowObject(window), (a = !0));
        } catch (r) {
            a = !1;
        }
        return a;
    }
    function p(a, c, e, f) {
        function g(a, b, c, d, e, f) {
            var g = forge.pkcs7.createSignedData();
            switch (c) {
                case 0:
                    g.content = forge.util.createBuffer(z(a), 'raw');
                    break;
                case 1:
                    g.content = forge.util.createBuffer(a, 'utf8');
                    break;
                case 2:
                    g.content =
                        'undefined' == typeof Big5Encoding
                            ? forge.util.createBuffer(a, 'utf8')
                            : forge.util.createBuffer(Big5Encoding.getBig5Encoding(a), 'raw');
                    break;
                default:
                    g.content = forge.util.createBuffer(z(a), 'raw');
            }
            g.addCertificate(e);
            a = { key: f, certificate: e, digestAlgorithm: b };
            n &&
                (a.authenticatedAttributes = [
                    { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
                    { type: forge.pki.oids.messageDigest },
                    { type: forge.pki.oids.signingTime },
                ]);
            g.addSigner(a);
            g.sign();
            d = d ? forge.pkcs7.messageToPem(g) : forge.pkcs7.messageToPemWithoutContent(g);
            d = d.replace(/\-----BEGIN PKCS7-----/g, '');
            d = d.replace(/\-----END PKCS7-----/g, '');
            return (d = d.replace(/(?:\\[rn]|[\r\n]+)+/g, ''));
        }
        var l = '',
            h = null,
            k = null;
        if (null == b.selectedCertInfo || null != c) K(c, e);
        else {
            switch (61440 & f) {
                case 0:
                    c = forge.pki.oids.sha1;
                    break;
                case 4096:
                    c = forge.pki.oids.md5;
                    break;
                case 8192:
                    c = forge.pki.oids.sha256;
                    break;
                case 16384:
                    c = forge.pki.oids.sha512;
                    break;
                default:
                    c = forge.pki.oids.sha1;
            }
            e = 1024 == (3840 & f) ? !1 : !0;
            f &= 15;
            var n = !1;
            h = d();
            k = h.oPrivateKey;
            h = h.oCert;
            if ('string' === typeof a) l = g(a, c, f, e, h, k);
            else if (Array.isArray(a)) {
                l = '';
                for (var r = 0; r < a.length; r++) l = l + '||' + g(a[r], c, f, e, h, k);
                l = l.substring(2, l.length);
            }
        }
        return l;
    }
    function H(a, c, e, f) {
        function g(a, b, c, d, e) {
            h = b.create();
            switch (c) {
                case 0:
                    h.update(z(a));
                    break;
                case 1:
                    h.update(a, 'utf8');
                    break;
                case 2:
                    'undefined' == typeof Big5Encoding
                        ? h.update(a, 'utf8')
                        : h.update(Big5Encoding.getBig5Encoding(a));
                    break;
                default:
                    h.update(z(a));
            }
            return d ? forge.util.bytesToHex(e.sign(h)) : forge.util.encode64(e.sign(h));
        }
        var l = null,
            h = null;
        if (null == b.selectedCertInfo || null != c) K(c, e);
        else {
            switch (61440 & f) {
                case 0:
                    c = forge.md.sha1;
                    break;
                case 4096:
                    c = forge.md.md5;
                    break;
                case 8192:
                    c = forge.md.sha256;
                    break;
                case 16384:
                    c = forge.md.sha512;
                    break;
                default:
                    c = forge.md.sha1;
            }
            e = 256 == (3840 & f) ? !1 : !0;
            f &= 15;
            l = d().oPrivateKey;
            if ('string' === typeof a) var k = g(a, c, f, e, l);
            else if (Array.isArray(a)) {
                k = '';
                for (var n = 0; n < a.length; n++) k = k + '||' + g(a[n], c, f, e, l);
                k = k.substring(2, k.length);
            }
        }
        return k;
    }
    function t(a, c, e) {
        function f(a, b) {
            var c = forge.asn1.oidToDer(forge.pki.oids[b]).getBytes(),
                d = forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, !0, []),
                e = forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, !0, []);
            e.value.push(forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.OID, !1, c));
            e.value.push(forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.NULL, !1, ''));
            c = forge.asn1.create(
                forge.asn1.Class.UNIVERSAL,
                forge.asn1.Type.OCTETSTRING,
                !1,
                forge.util.hexToBytes(a),
            );
            d.value.push(e);
            d.value.push(c);
            return forge.asn1.toDer(d).getBytes();
        }
        function g(a) {
            if (0 >= a.length) return !1;
            for (var b = !0, c = a[0].length, d = 1; d < a.length; d++)
                if (a[d].length != c) {
                    b = !1;
                    break;
                }
            return b;
        }
        var l = null;
        do
            if (null == b.selectedCertInfo || null != c) K(c, e);
            else {
                if ('string' === typeof a) l = a.length;
                else {
                    if (!g(a)) break;
                    l = a[0].length;
                }
                switch (l) {
                    case 20:
                        var h = 'md5';
                        break;
                    case 40:
                        h = 'sha1';
                        break;
                    case 64:
                        h = 'sha256';
                        break;
                    case 128:
                        h = 'sha512';
                }
                l = d();
                if ('string' === typeof a) {
                    p1Encoded = f(a, h);
                    var k = forge.pki.rsa.encrypt(p1Encoded, l.oPrivateKey, 1);
                    k = forge.util.encode64(k);
                } else if (Array.isArray(a)) {
                    k = '';
                    for (var n = 0; n < a.length; n++) {
                        p1Encoded = f(a[n], h);
                        var r = forge.pki.rsa.encrypt(p1Encoded, l.oPrivateKey, 1);
                        k = k + '||' + forge.util.encode64(r);
                    }
                    k = k.substring(2, k.length);
                }
            }
        while (0);
        return k;
    }
    function K(b, c, d, e) {
        var l = -1,
            k = [],
            n = null;
        var r = localStorage.getItem('TWCACertIdxRef');
        if (null == r) n = {};
        else if ('' == r) n = {};
        else
            try {
                n = JSON.parse(r);
            } catch (Z) {
                n = {};
            }
        r = n;
        n = {};
        var q = null,
            p = '',
            x = !1,
            F = !1,
            u = !1;
        do {
            4096 == (61440 & d) && (x = !0);
            4 == (4 & d) && (F = !0);
            8 == (8 & d) && (u = !0);
            var t = d & 240;
            if (null == b || '' == b) (l = 5005), (q = null);
            else if (
                ('//S' != b.substring(0, 3) && '//I' != b.substring(0, 3)) ||
                '//' != b.substring(b.length - 2, b.length)
            )
                (l = 5005), (q = null);
            else if (null == c || '' == c || (14 == c.length && !isNaN(c))) {
                var A = b
                    .replace(/^\/\/|\/\/\s*$/g, '')
                    .replace(/\s*=\s*/gm, '=')
                    .split('//');
                for (var v = 0; v < A.length; v++) k[v] = g(A[v]);
                if (G(k, 5005) || '' == k[0]) (l = 5005), (q = null);
                else {
                    for (var w in r) {
                        A = r[w];
                        A.certb64 = JSON.parse(localStorage.getItem(w)).certb64;
                        if (u) v = B(A, k);
                        else {
                            v = k;
                            for (var D = a(A.certb64).subject, y = !1, z = 0; z < v.length; z++) {
                                var H = !1;
                                if (
                                    v[z].S_C == D.C &&
                                    (null == D.O || (null != v[z].S_O && v[z].S_O.length == D.O.length))
                                ) {
                                    for (var E = 0; null != D.O && E < D.O.length; E++) G(v[z].S_O, D.O[E]) || (H = !0);
                                    if (
                                        !H &&
                                        (null == D.OU || (null != v[z].S_OU && v[z].S_OU.length == D.OU.length))
                                    ) {
                                        for (E = 0; null != D.OU && E < D.OU.length; E++)
                                            G(v[z].S_OU, D.OU[E]) || (H = !0);
                                        if (!H && v[z].S_CN == D.CN) {
                                            y = !0;
                                            break;
                                        }
                                    }
                                }
                            }
                            v = y;
                        }
                        '' != c ? A.notAfter < c && (v = !1) : F && ((D = C(new Date())), A.notAfter < D && (v = !1));
                        v && null != localStorage.getItem(w) && '' != localStorage.getItem(w) && (n[w] = A);
                    }
                    for (var K in n)
                        if (null == q) (p = K), (q = n[K]);
                        else
                            switch (t) {
                                case 0:
                                    q.notBefore <= n[K].notBefore && ((p = K), (q = n[K]));
                                    break;
                                case 16:
                                    q.notBefore <= n[K].notBefore && ((p = K), (q = n[K]));
                                    break;
                                case 32:
                                    q.notBefore >= n[K].notBefore && ((p = K), (q = n[K]));
                                    break;
                                case 64:
                                    q.notAfter <= n[K].notAfter && ((p = K), (q = n[K]));
                                    break;
                                case 128:
                                    q.notAfter >= n[K].notAfter && ((p = K), (q = n[K]));
                                    break;
                                default:
                                    q.notAfter <= n[K].notAfter && ((p = K), (q = n[K]));
                            }
                    if (null == q) (l = 5010), (q = null);
                    else if (
                        ((q.b64P12Cert = JSON.parse(localStorage.getItem(p)).b64P12Cert),
                        (q.keySet = JSON.parse(localStorage.getItem(p)).keySet),
                        (q.certfinger = JSON.parse(localStorage.getItem(p)).certfinger),
                        (q.certb64 = JSON.parse(localStorage.getItem(p)).certb64),
                        !x)
                    ) {
                        sessionStorage.removeItem('twcaSelectedKey');
                        if (q.b64P12Cert) {
                            t = e;
                            A = null;
                            try {
                                A = forge.pkcs12.pkcs12FromAsn1(
                                    forge.asn1.fromDer(forge.util.decode64(q.b64P12Cert)),
                                    t,
                                );
                            } catch (Z) {}
                            t = A;
                            if (!t) {
                                l = 5071;
                                q = null;
                                break;
                            }
                            t = t.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[
                                forge.pki.oids.pkcs8ShroudedKeyBag
                            ][0].key;
                            if (!t) {
                                l = 5071;
                                q = null;
                                break;
                            }
                            JSON.stringify(f(t));
                        } else if (q.keySet) {
                            t = h(q.keySet, e);
                            if (!t) {
                                l = 5071;
                                q = null;
                                break;
                            }
                            JSON.stringify(f(t));
                        } else {
                            l = 5112;
                            q = null;
                            break;
                        }
                        sessionStorage.setItem('twcaSelectedKey', forge.util.encode64(e));
                    }
                }
            } else (l = 5005), (rtnCodeInfo = null);
        } while (0);
        return null != q ? q : l;
    }
    function B(b, c) {
        var d = a(b.certb64),
            e = d.subject;
        d = d.issuer;
        for (var f = !1, g = 0; g < c.length; g++) {
            var l = !0,
                h;
            for (h in c[g])
                if ('S_SN' == h) c[g][h].toUpperCase() != e.SN && (l = !1);
                else if ('S_CN' == h) 0 > e.CN.indexOf(c[g][h]) && (l = !1);
                else if ('S_OU' == h) for (var k = 0; k < c[g][h].length; k++) G(e.OU, c[g][h][k]) || (l = !1);
                else if ('S_O' == h) for (k = 0; k < c[g][h].length; k++) G(e.O, c[g][h][k]) || (l = !1);
                else if ('S_C' == h) c[g][h] != e.C && (l = !1);
                else if ('I_CN' == h) c[g][h] != d.CN && (l = !1);
                else if ('I_OU' == h) for (k = 0; k < c[g][h].length; k++) G(d.OU, c[g][h][k]) || (l = !1);
                else if ('I_O' == h) for (k = 0; k < c[g][h].length; k++) G(d.O, c[g][h][k]) || (l = !1);
                else 'I_C' == h && c[g][h] != d.C && (l = !1);
            if ((f = f || l)) break;
        }
        return f;
    }
    function y(a) {
        return a
            ? '"sn":"' +
                  a.serial +
                  '","cn":"' +
                  a.cn +
                  '","ntb":"' +
                  a.notBefore +
                  '","nta":"' +
                  a.notAfter +
                  '","issdn":"' +
                  a.issuer +
                  '","subdn":"' +
                  a.subject +
                  '","certfinger":"' +
                  a.certfinger +
                  '","certb64":"' +
                  a.certb64 +
                  '"'
            : '';
    }
    function C(a) {
        var b = a.getFullYear();
        var c = a.getMonth() + 1;
        var d = a.getDate();
        var e = a.getHours();
        var f = a.getMinutes();
        a = a.getSeconds();
        b = '0000' + b;
        b = b.substring(b.length - 4, b.length);
        c = '00' + c;
        c = c.substring(c.length - 2, c.length);
        d = '00' + d;
        d = d.substring(d.length - 2, d.length);
        e = '00' + e;
        e = e.substring(e.length - 2, e.length);
        f = '00' + f;
        f = f.substring(f.length - 2, f.length);
        a = '00' + a;
        a = a.substring(a.length - 2, a.length);
        return b + c + d + e + f + a;
    }
    function z(a) {
        for (var b = new Uint8Array(2 * a.length), c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            b[2 * c] = d & 255;
            b[2 * c + 1] = (d >> 8) & 255;
        }
        a = '';
        for (c = 0; c < b.length; c++) (a = 16 > b[c] ? a + '%0' : a + '%'), (a += b[c].toString(16));
        return unescape(a);
    }
    function a(a) {
        ret = {};
        try {
            var b = forge.asn1.fromDer(forge.util.decode64(a));
            b = forge.pki.certificateFromAsn1(b);
        } catch (F) {
            return null;
        }
        ret.subject = {};
        for (a = 0; a < b.subject.attributes.length; a++) {
            var c = b.subject.attributes[a];
            'C' == c.shortName && (ret.subject.C = c.value);
            'O' == c.shortName && (null == ret.subject.O && (ret.subject.O = []), ret.subject.O.push(c.value));
            'OU' == c.shortName && (null == ret.subject.OU && (ret.subject.OU = []), ret.subject.OU.push(c.value));
            'CN' == c.shortName && (ret.subject.CN = c.value);
        }
        ret.subject.SN = b.serialNumber.toUpperCase();
        ret.issuer = {};
        for (a = 0; a < b.issuer.attributes.length; a++)
            (c = b.issuer.attributes[a]),
                'C' == c.shortName && (ret.issuer.C = c.value),
                'O' == c.shortName && (null == ret.issuer.O && (ret.issuer.O = []), ret.issuer.O.push(c.value)),
                'OU' == c.shortName && (null == ret.issuer.OU && (ret.issuer.OU = []), ret.issuer.OU.push(c.value)),
                'CN' == c.shortName && (ret.issuer.CN = c.value);
        return ret;
    }
    function g(a) {
        for (var b = {}, c = 'S_CL S_SN S_CN S_OU S_O S_C I_CN I_OU I_O I_C'.split(' '); 0 < a.length; ) {
            var d = a.substring(0, a.indexOf('='));
            if (!G(c, d)) return 5005;
            a = a.substring(a.indexOf('=') + 1, a.length);
            var e = a.length,
                f = a.indexOf(',S_'),
                g = a.indexOf(',I_');
            0 < f && f < e && (e = f);
            0 < g && g < e && (e = g);
            f = a.substring(0, e);
            'S_O' == d || 'S_OU' == d || 'I_O' == d || 'I_OU' == d ? (b[d] || (b[d] = []), b[d].push(f)) : (b[d] = f);
            a = a.substring(e + 1, a.length);
        }
        return b;
    }
    function d() {
        var a = {},
            c = sessionStorage.getItem('twcaSelectedKey');
        if (b.selectedCertInfo.b64P12Cert) {
            p12Cert = forge.pkcs12.pkcs12FromAsn1(
                forge.asn1.fromDer(forge.util.decode64(b.selectedCertInfo.b64P12Cert)),
                forge.util.decode64(c),
            );
            var d = p12Cert.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[
                forge.pki.oids.pkcs8ShroudedKeyBag
            ][0].key;
            c = p12Cert.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];
            for (var e = 0; e < c.length; e++) {
                var f = c[e].cert;
                if (f.publicKey.n.data[0] == d.n.data[0] && f.publicKey.n.data[1] == d.n.data[1]) {
                    oCert = p12Cert.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag][e].cert;
                    break;
                }
            }
            oCert || (oCert = p12Cert.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag][0].cert);
        } else
            b.selectedCertInfo.keySet &&
                ((oCert = forge.asn1.fromDer(forge.util.decode64(b.selectedCertInfo.certb64))),
                (oCert = forge.pki.certificateFromAsn1(oCert)),
                (d = h(b.selectedCertInfo.keySet, forge.util.decode64(c))));
        a.oPrivateKey = d;
        a.oCert = oCert;
        return a;
    }
    function G(a, b) {
        for (var c in a) if (a[c] == b) return !0;
        return !1;
    }
    function h(a, b, c) {
        var d = null;
        try {
            if (3 > arguments.length) {
                var e = forge.md.sha256.create();
                e.update(b);
                var f = e.digest().getBytes(),
                    g = forge.cipher.createDecipher('AES-CBC', f);
                g.start({ iv: '' });
                g.update(forge.util.createBuffer(forge.util.decode64(a)));
                g.finish();
                var l = g.output.data.split('||');
                'TWCA' == l[8] &&
                    (d = forge.pki.setRsaPrivateKey(
                        new forge.jsbn.BigInteger(l[1], 16),
                        new forge.jsbn.BigInteger(l[0], 16),
                        new forge.jsbn.BigInteger(l[7], 16),
                        new forge.jsbn.BigInteger(l[2], 16),
                        new forge.jsbn.BigInteger(l[3], 16),
                        new forge.jsbn.BigInteger(l[4], 16),
                        new forge.jsbn.BigInteger(l[5], 16),
                        new forge.jsbn.BigInteger(l[6], 16),
                    ));
            } else
                d = forge.pki.setRsaPrivateKey(
                    new forge.jsbn.BigInteger(c.n, 16),
                    new forge.jsbn.BigInteger(c.e, 16),
                    new forge.jsbn.BigInteger(c.d, 16),
                    new forge.jsbn.BigInteger(c.p, 16),
                    new forge.jsbn.BigInteger(c.q, 16),
                    new forge.jsbn.BigInteger(c.dP, 16),
                    new forge.jsbn.BigInteger(c.dQ, 16),
                    new forge.jsbn.BigInteger(c.qInv, 16),
                );
        } catch (Q) {
            d = null;
        }
        return d;
    }
    function f(a) {
        if (a) {
            var b = {};
            b.n = a.n.toString(16);
            b.e = a.e.toString(16);
            b.d = a.d.toString(16);
            b.p = a.p.toString(16);
            b.q = a.q.toString(16);
            b.dP = a.dP.toString(16);
            b.dQ = a.dQ.toString(16);
            b.qInv = a.qInv.toString(16);
            return b;
        }
    }
    var b = this,
        e = null,
        w = null,
        k = null,
        u = !1;
    -1 < navigator.userAgent.indexOf('TWID') && (u = !0);
    this.SelectSignerEx = function (a, c, d, f, g, h, k, q, p) {
        if (E() && 0 == (h & 15728640))
            (e = [a, c, d, f, g, h, k, q, p]),
                window.opener.twcaLib.SelectSignerEx(
                    a,
                    c,
                    d,
                    f,
                    g,
                    h,
                    k,
                    q,
                    'oTwcaLib._childWindow.twcaLib.SelectSignerExFromChildWindowHandler',
                );
        else {
            if (u)
                try {
                    'undefined' == typeof p && (p = 'ret_SelectSignerEx');
                    var l = MobileUtils.registerFunction(p),
                        m = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.SelectSignerEx(a, c, d, f, g, MobileUtils.toNumber(h), k, q, l),
                          0)
                        : 0 < m.indexOf('iPhone') || 0 < m.indexOf('iPad')
                        ? ((document.location =
                              'PKI::SelectSignerEx::' +
                              encodeURI(
                                  a +
                                      separation +
                                      c +
                                      separation +
                                      d +
                                      separation +
                                      f +
                                      separation +
                                      g +
                                      separation +
                                      h +
                                      separation +
                                      k +
                                      separation +
                                      q +
                                      separation +
                                      l,
                              )),
                          0)
                        : 1;
                } catch (V) {
                    return alert(V), -1;
                }
            if (4 >= arguments.length) return K(a, g, h, f);
            l = 0;
            m = '\u6210\u529f';
            var n = '',
                r = K(a, g, h, f);
            if ('number' == typeof r)
                switch (r) {
                    case 5005:
                        l = 5005;
                        m = '\u53c3\u6578\u932f\u8aa4';
                        break;
                    case 5010:
                        l = 5010;
                        m = '\u7121\u6191\u8b49';
                        break;
                    case 5071:
                        if (
                            null == f &&
                            0 > 'oTwcaLib._childWindow.twcaLib.SelectSignerExFromChildWindowHandler'.indexOf(p)
                        ) {
                            twcaCryptoLibAlertDialog.show(
                                '\u8f38\u5165\u5bc6\u78bc',
                                '\u8acb\u8f38\u5165\u6191\u8b49\u5bc6\u78bc',
                                '',
                                '\u53d6\u6d88',
                                '\u78ba\u8a8d',
                                ['SelectSignerEx', a, c, d, f, g, h, k, q, p, twcaLib],
                            );
                            return;
                        }
                        l = 5071;
                        m = '\u6191\u8b49\u5bc6\u78bc\u932f\u8aa4';
                        break;
                    case 5112:
                        l = 5112;
                        m = '\u8b80\u53d6\u6191\u8b49\u5931\u6557';
                        break;
                    default:
                        (l = 5001), (m = '\u4e00\u822c\u932f\u8aa4');
                }
            else
                0 == (h & 61440) &&
                    ((b.selectedCertInfo = r), sessionStorage.setItem('selectedCertInfo', JSON.stringify(r))),
                    (n = '{' + y(r) + '}');
            b.callback(p, l, m, n);
        }
    };
    this.SignPkcs7 = function (a, c, d, f) {
        if (E())
            (e = [a, c, d]),
                window.opener.twcaLib.SignPkcs7(a, c, 'oTwcaLib._childWindow.twcaLib.SignPkcs7FromChildWindowHandler');
        else {
            if (u)
                try {
                    'undefined' == typeof d && (d = 'ret_SignPkcs7');
                    var g = !1,
                        l = a;
                    if ('[object Array]' === Object.prototype.toString.call(a)) {
                        g = !0;
                        for (index = 0; index < a.length; ++index) {
                            var h = forge.util.binary.raw.encode(forge.util.text.utf8.encode(a[index])),
                                k = forge.util.binary.base64.encode(forge.util.binary.raw.decode(h));
                            a[index] = k;
                        }
                        l = a.join('#');
                    }
                    var n = MobileUtils.registerFunction(d),
                        r = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (g
                              ? MobileUtils.androidInterface.SignPkcs7Batch(l, MobileUtils.toNumber(c), n)
                              : MobileUtils.androidInterface.SignPkcs7(l, MobileUtils.toNumber(c), n),
                          0)
                        : 0 < r.indexOf('iPhone') || 0 < r.indexOf('iPad')
                        ? ((document.location = g
                              ? 'PKI::SignPkcs7Batch::' + encodeURI(l + separation + c + separation + n)
                              : 'PKI::SignPkcs7::' + encodeURI(l + separation + c + separation + n)),
                          0)
                        : 1;
                } catch (U) {
                    return alert(U), -1;
                }
            if (4 <= arguments.length) return p(a, c, d, f);
            g = 0;
            l = '\u6210\u529f';
            h = '';
            if (null == a || 0 >= a.length) (g = 5005), (l = '\u53c3\u6578\u932f\u8aa4');
            else {
                if ((k = sessionStorage.getItem('selectedCertInfo'))) b.selectedCertInfo = JSON.parse(k);
                k = sessionStorage.getItem('twcaSelectedKey');
                b.selectedCertInfo && null != k
                    ? ((k = p(a, null, null, c)),
                      null == k || '' == k
                          ? ((g = 5061), (l = '\u7c3d\u7ae0\u5931\u6557'))
                          : (h = '{' + y(b.selectedCertInfo) + ',"signature":"' + k + '"}'))
                    : ((g = 5067),
                      (l = '\u57f7\u884c\u7c3d\u7ae0\u6642\uff0c\u5c1a\u672a\u9078\u64c7\u7c3d\u7ae0\u6191\u8b49'));
            }
            b.callback(d, g, l, h);
        }
    };
    this.SignPkcs1 = function (a, c, d, f) {
        if (E())
            (e = [a, c, d]),
                window.opener.twcaLib.SignPkcs1(a, c, 'oTwcaLib._childWindow.twcaLib.SignPkcs1FromChildWindowHandler');
        else {
            if (u)
                try {
                    'undefined' == typeof d && (d = 'ret_SignPkcs1');
                    var g = !1,
                        l = a;
                    if ('[object Array]' === Object.prototype.toString.call(a)) {
                        g = !0;
                        for (index = 0; index < a.length; ++index) {
                            var h = forge.util.binary.raw.encode(forge.util.text.utf8.encode(a[index])),
                                k = forge.util.binary.base64.encode(forge.util.binary.raw.decode(h));
                            a[index] = k;
                        }
                        l = a.join('#');
                    }
                    var n = MobileUtils.registerFunction(d),
                        r = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (g
                              ? MobileUtils.androidInterface.SignPkcs1Batch(l, MobileUtils.toNumber(c), n)
                              : MobileUtils.androidInterface.SignPkcs1(l, MobileUtils.toNumber(c), n),
                          0)
                        : 0 < r.indexOf('iPhone') || 0 < r.indexOf('iPad')
                        ? ((document.location = g
                              ? 'PKI::SignPkcs1Batch::' + encodeURI(l + separation + c + separation + n)
                              : 'PKI::SignPkcs1::' + encodeURI(l + separation + c + separation + n)),
                          0)
                        : 1;
                } catch (U) {
                    return alert(U), -1;
                }
            if (4 <= arguments.length) return H(a, c, d, f);
            g = 0;
            l = '\u6210\u529f';
            h = '';
            if (null == a || 0 >= a.length) (g = 5005), (l = '\u53c3\u6578\u932f\u8aa4');
            else {
                if ((k = sessionStorage.getItem('selectedCertInfo'))) b.selectedCertInfo = JSON.parse(k);
                k = sessionStorage.getItem('twcaSelectedKey');
                b.selectedCertInfo && null != k
                    ? ((k = H(a, null, null, c)),
                      null == k || '' == k
                          ? ((g = 5061), (l = '\u7c3d\u7ae0\u5931\u6557'))
                          : (h = '{"signature":"' + k + '",' + y(b.selectedCertInfo) + '}'))
                    : ((g = 5067),
                      (l = '\u57f7\u884c\u7c3d\u7ae0\u6642\uff0c\u5c1a\u672a\u9078\u64c7\u7c3d\u7ae0\u6191\u8b49'));
            }
            b.callback(d, g, l, h);
        }
    };
    this.SignPkcs1FromHash = function (a, c, d) {
        if (E())
            (e = [a, c]),
                window.opener.twcaLib.SignPkcs1FromHash(
                    a,
                    'oTwcaLib._childWindow.twcaLib.SignPkcs1FromChildWindowHandler',
                );
        else {
            if (u)
                try {
                    'undefined' == typeof c && (c = 'ret_SignPkcs1FromHash');
                    var f = !1,
                        g = a;
                    if ('[object Array]' === Object.prototype.toString.call(a)) {
                        f = !0;
                        for (index = 0; index < a.length; ++index) {
                            var l = forge.util.binary.raw.encode(forge.util.text.utf8.encode(a[index])),
                                h = forge.util.binary.base64.encode(forge.util.binary.raw.decode(l));
                            a[index] = h;
                        }
                        g = a.join('#');
                    }
                    var k = MobileUtils.registerFunction(c),
                        n = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (f
                              ? MobileUtils.androidInterface.SignPkcs1FromHashBatch(g, k)
                              : MobileUtils.androidInterface.SignPkcs1FromHash(g, k),
                          0)
                        : 0 < n.indexOf('iPhone') || 0 < n.indexOf('iPad')
                        ? ((document.location = f
                              ? 'PKI::SignPkcs1FromHashBatch::' + encodeURI(g + separation + k)
                              : 'PKI::SignPkcs1FromHash::' + encodeURI(g + separation + k)),
                          0)
                        : 1;
                } catch (P) {
                    return alert(P), -1;
                }
            if (3 <= arguments.length) return t(a, c, dwFlags2);
            f = 0;
            g = '\u6210\u529f';
            l = '';
            if (null == a || 0 >= a.length) (f = 5005), (g = '\u53c3\u6578\u932f\u8aa4');
            else {
                if ((h = sessionStorage.getItem('selectedCertInfo'))) b.selectedCertInfo = JSON.parse(h);
                h = sessionStorage.getItem('twcaSelectedKey');
                b.selectedCertInfo && null != h
                    ? ((h = t(a, null, null)),
                      null == h || '' == h
                          ? ((f = 5061), (g = '\u7c3d\u7ae0\u5931\u6557'))
                          : (l = Array.isArray(h)
                                ? '{"signature":' + JSON.stringify(h) + ',' + y(b.selectedCertInfo) + '}'
                                : '{"signature":"' + h + '",' + y(b.selectedCertInfo) + '}'))
                    : ((f = 5067),
                      (g = '\u57f7\u884c\u7c3d\u7ae0\u6642\uff0c\u5c1a\u672a\u9078\u64c7\u7c3d\u7ae0\u6191\u8b49'));
            }
            b.callback(c, f, g, l);
        }
    };
    this.ResetKey = function (a) {
        if (E())
            (e = [a]), window.opener.twcaLib.ResetKey('oTwcaLib._childWindow.twcaLib.ResetKeyFromChildWindowHandler');
        else {
            if (u)
                try {
                    'undefined' == typeof a && (a = 'ret_ResetKey');
                    var c = MobileUtils.registerFunction(a),
                        d = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.ResetKey(c), 0)
                        : 0 < d.indexOf('iPhone') || 0 < d.indexOf('iPad')
                        ? ((document.location = 'PKI::ResetKey::' + encodeURI(c)), 0)
                        : 1;
                } catch (F) {
                    return alert(F), -1;
                }
            b.selectedCertInfo = null;
            sessionStorage.removeItem('selectedCertInfo');
            sessionStorage.removeItem('twcaSelectedKey');
            if (0 >= arguments.length) return 0;
            b.callback(a, 0, '\u6210\u529f', '');
        }
    };
    this.GetVersion = function (a) {
        if (E())
            (e = [a]),
                window.opener.twcaLib.GetVersion('oTwcaLib._childWindow.twcaLib.GetVersionFromChildWindowHandler');
        else {
            if (u)
                try {
                    'undefined' == typeof a && (a = 'ret_GetVersion');
                    var c = MobileUtils.registerFunction(a),
                        d = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.GetVersion(c), 0)
                        : 0 < d.indexOf('iPhone') || 0 < d.indexOf('iPad')
                        ? ((document.location = 'PKI::GetVersion::' + encodeURI(c)), 0)
                        : 1;
                } catch (F) {
                    return alert(F), -1;
                }
            if (0 >= arguments.length) return '1.4.0.0';
            b.callback(a, 0, '\u6210\u529f', '{"version":"1.4.0.0"}');
        }
    };
    this.Hash = function (a, c, d) {
        try {
            'undefined' == typeof d && (d = 'ret_Hash');
            var e = MobileUtils.registerFunction(d),
                f = navigator.userAgent;
            if (MobileUtils.supportTwidAndroid())
                return MobileUtils.androidInterface.Hash(a, MobileUtils.toNumber(c), e), 0;
            if (0 < f.indexOf('iPhone') || 0 < f.indexOf('iPad'))
                return (document.location = 'PKI::Hash::' + encodeURI(a + separation + c + separation + e)), 0;
            e = null;
            f = '';
            var g = performance.now();
            switch (61440 & c) {
                case 0:
                    var l = forge.md.sha1;
                    break;
                case 4096:
                    l = forge.md.md5;
                    break;
                case 8192:
                    l = forge.md.sha256;
                    break;
                case 16384:
                    l = forge.md.sha512;
                    break;
                default:
                    l = forge.md.sha1;
            }
            var h = l.create();
            switch (15 & c) {
                case 0:
                    h.update(z(a));
                    break;
                case 1:
                    h.update(a, 'utf8');
                    break;
                case 2:
                    'undefined' == typeof Big5Encoding
                        ? h.update(a, 'utf8')
                        : h.update(Big5Encoding.getBig5Encoding(a));
                    break;
                default:
                    h.update(z(a));
            }
            e = h.digest().toHex();
            var k = performance.now();
            f =
                '{"hashValue":"' +
                e +
                '","time":"' +
                (k - g) +
                '","length":"' +
                a.length +
                '","length":"' +
                a.length +
                '"}';
            if (3 <= arguments.length) b.callback(d, 0, '\u6210\u529f', f);
            else return f;
        } catch (P) {
            return alert(P), -1;
        }
    };
    this.Hmac = function (a, c, d, e) {
        var f = 0,
            g = '\u6210\u529f',
            l = '';
        switch (d) {
            case 1:
                d = 'md5';
                break;
            case 3:
                d = 'sha256';
                break;
            default:
                d = 'sha1';
        }
        a = forge.util.binary.raw.encode(forge.util.binary.hex.decode(a));
        var h = forge.hmac.create();
        h.start(d, a);
        h.update(forge.util.binary.raw.encode(forge.util.text.utf16.encode(c)));
        (c = forge.util.binary.base64.encode(forge.util.binary.raw.decode(h.getMac().getBytes())))
            ? (l = '{"hmacValue":"' + c + '"}')
            : ((f = 5001), (g = '\u932f\u8aa4'));
        'string' === typeof e ? b.callback(e, f, g, l) : e(f, g, '', l);
        return 0;
    };
    this.CreatePKCS7FromSignedData = function (a, c, d, e, f) {
        var g = 0,
            l = '\u6210\u529f',
            h = '',
            m = performance.now();
        a: {
            var n = null;
            if (a && c && d) {
                switch (61440 & e) {
                    case 0:
                        var r = forge.pki.oids.sha1;
                        break;
                    case 4096:
                        r = forge.pki.oids.md5;
                        break;
                    case 8192:
                        r = forge.pki.oids.sha256;
                        break;
                    case 16384:
                        r = forge.pki.oids.sha512;
                        break;
                    default:
                        r = forge.pki.oids.sha1;
                }
                switch (15 & e) {
                    case 0:
                        var q = forge.util.createBuffer(z(a), 'raw');
                        break;
                    case 1:
                        q = forge.util.createBuffer(a, 'utf8');
                        break;
                    case 2:
                        q =
                            'undefined' == typeof Big5Encoding
                                ? forge.util.createBuffer(a, 'utf8')
                                : forge.util.createBuffer(Big5Encoding.getBig5Encoding(a), 'raw');
                        break;
                    default:
                        q = forge.util.createBuffer(z(a), 'raw');
                }
                try {
                    (n = forge.asn1.fromDer(forge.util.decode64(c))), (n = forge.pki.certificateFromAsn1(n));
                } catch (W) {
                    p7Value = { errCode: 2, errMsg: '\u6191\u8b49\u89e3\u6790\u932f\u8aa4' };
                    break a;
                }
                if (c != k) {
                    var p = forge.pkcs7.createSignedData();
                    p.content = q;
                    p.addCertificate(n);
                    p.addSigner({
                        key:
                            '-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQBbE4weWXGL8ehZU2UsCeRRBcU6S09/ph5IW4QtZKic1GDnanM1Ur/ohPHQsFLg6xBFiIBGPz/96eGAlg/NjcU/D3S4OmEF9PLxOT+Vg3I+dRZjmXFRrlfkmZ4ATNbZI4gzTrPUN9CV1soNlWQ/ClAniF+mqHLYFBXUhk8BCyV8j1SNp4sdiO4fHHCRZp44ppqRyG4op5/c9DUjeAsi4qgQyvxpO5lxzBZ73IkQ2aP/DKMF8rjKxKWM3JjInadcru/aAUO5TimDUrSMCaGYo5fzjqTCGD4iuz3J3tFoh20Z7H7s/kj4YK2l+YXbemCp0F13o70Hyb21Z87YqCzber5RAgMBAAECggEAMKI7jGlOzOAcprZ1rBKMLQfbzckxZoSaXyEfb+30a+qs5GZfpvXNLKjxR/MgDqL3SWoetWRJE5m0pSl8vtMZpRbnyQjDjp7CrDVZ0skiVF/J2N2zOV7T6GpviNF/WOw0atF4DbbQV3Me6ioAIfmr27BjA2eoC+KN1bLytSfymJR8G0CktovhhkD3wUZVuTcUGbg0yyif74y9dwmnHOQbOMdSWIHuIpTzQSGelRoQCmbLmhE2hAbIlT5mz6vFZCSmgTFSPk87sonHaFrBeesu5ut8LG686s97n78oPz27U/ek7lV/Cj/UJeljuRM5tDoCJJKkTB+0xsNrfNayWEQcwQKBgQCyGWMsRw1tprYqXp7nLS/nja6qf3bIs/IwtO1wsxmmtxXcXnb+/D285mUDsEelPB0AXJcOe1SP0fDFB1HMAFlJ5hWATbUveSEk5U2L+LjeREhCDlH0MJBDBc+vixo8MoHXq3sjpe3/HP76V+fvUOSx7vtasGG1I4fGUDMxLhbLzQKBgQCC6c0L4+idGcg5P7KvHlSwYHHKbLpuDiRNnSjqgQZ7EUxohYOCOk9tLFPaxMhhzgjI5hFPY48+Kv8NCCzzNWc25VI82qFcG6a8Mw1bUXb2/8/FKhUqTdaLlOZuVZW6LobxEM4Z4hEUnLfgrFbvlMKopbynwZ82UK5rm25Y0i6glQKBgQCobAm1HZw9TaKHfuOWisz6lKnQ4qlaM5GdLfw8z6I6Xnl15H9zsuZPdTGhw1p9j9N9PBI9x7O4LjkamkloOgw2Lje3FcV6F3qYgaBL9fIdf0U18oTd/+7s8tnskAdHVhwj8C6LD6d50dnutKLJVh5vhih9Ir/DpM4JZF6E66jzIQKBgGQy8RcltJfx8NcokuoIDAgHeXDW8YZk2pJxNKzwXnZ5kgL6FeLqIHrOD8yFC14YpY6m0R7zc+LAZACkfksUV9CjiuM674AhRegMJy/61VRODce54wNDGnAxYoGWjgg3rl76XtVeu3YMUYzsO4oaUTdly1SXFPYsoKOKDtZ64OdVAoGBAK14Yk03Hr8fR3F0uqmt8uu9GN7tNfzvifRPYQ+/sfMUDG1C2+gh/roSKnHX8p1Wwtf26cv5Klq5ySxUT3NxJErf1I7voDiLVM4pmq8DKiebsl/8QbJv3e3DMbGqiRAmfRNJqb7UcQsDEWORFt7U9XcCncCzIBuO2ETzDQshlcNE-----END RSA PRIVATE KEY-----',
                        certificate: n,
                        digestAlgorithm: r,
                    });
                    p.sign();
                    w = p;
                    k = c;
                } else if (
                    ((p = w),
                    (p.content = q),
                    (p.contentInfo = null),
                    (p.contentInfo = forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, !0, [
                        forge.asn1.create(
                            forge.asn1.Class.UNIVERSAL,
                            forge.asn1.Type.OID,
                            !1,
                            forge.asn1.oidToDer(forge.pki.oids.data).getBytes(),
                        ),
                    ])),
                    'content' in p)
                ) {
                    var x;
                    p.content instanceof forge.util.ByteBuffer
                        ? (x = p.content.bytes())
                        : 'string' === typeof p.content && (x = forge.util.encodeUtf8(p.content));
                    p.contentInfo.value.push(
                        forge.asn1.create(forge.asn1.Class.CONTEXT_SPECIFIC, 0, !0, [
                            forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.OCTETSTRING, !1, x),
                        ]),
                    );
                }
                p.signers[0].signature = forge.util.decode64(d);
                n = forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, !0, [
                    forge.asn1.create(
                        forge.asn1.Class.UNIVERSAL,
                        forge.asn1.Type.INTEGER,
                        !1,
                        forge.asn1.integerToDer(p.signers[0].version).getBytes(),
                    ),
                    forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, !0, [
                        forge.pki.distinguishedNameToAsn1({ attributes: p.signers[0].issuer }),
                        forge.asn1.create(
                            forge.asn1.Class.UNIVERSAL,
                            forge.asn1.Type.INTEGER,
                            !1,
                            forge.util.hexToBytes(p.signers[0].serialNumber),
                        ),
                    ]),
                    forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, !0, [
                        forge.asn1.create(
                            forge.asn1.Class.UNIVERSAL,
                            forge.asn1.Type.OID,
                            !1,
                            forge.asn1.oidToDer(p.signers[0].digestAlgorithm).getBytes(),
                        ),
                        forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.NULL, !1, ''),
                    ]),
                ]);
                p.signers[0].authenticatedAttributesAsn1 && n.value.push(p.signers[0].authenticatedAttributesAsn1);
                n.value.push(
                    forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, !0, [
                        forge.asn1.create(
                            forge.asn1.Class.UNIVERSAL,
                            forge.asn1.Type.OID,
                            !1,
                            forge.asn1.oidToDer(p.signers[0].signatureAlgorithm).getBytes(),
                        ),
                        forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.NULL, !1, ''),
                    ]),
                );
                n.value.push(
                    forge.asn1.create(
                        forge.asn1.Class.UNIVERSAL,
                        forge.asn1.Type.OCTETSTRING,
                        !1,
                        p.signers[0].signature,
                    ),
                );
                if (0 < p.signers[0].unauthenticatedAttributes.length) {
                    r = forge.asn1.create(forge.asn1.Class.CONTEXT_SPECIFIC, 1, !0, []);
                    for (q = 0; q < p.signers[0].unauthenticatedAttributes.length; ++q)
                        r.values.push(_attributeToAsn1(p.signers[0].unauthenticatedAttributes[q]));
                    n.value.push(r);
                }
                p.signerInfos[0] = n;
                signValue = forge.pkcs7.messageToPem(p);
                signValue = signValue.replace(/\-----BEGIN PKCS7-----/g, '');
                signValue = signValue.replace(/\-----END PKCS7-----/g, '');
                p7Value = signValue = signValue.replace(/(?:\\[rn]|[\r\n]+)+/g, '');
            } else p7Value = { errCode: 2, errMsg: '\u53c3\u6578\u932f\u8aa4' };
        }
        p = performance.now();
        'string' != typeof p7Value
            ? ((g = p7Value.errCode), (l = p7Value.errMsg))
            : (h =
                  '{"p7Value":"' +
                  p7Value +
                  '","time":"' +
                  (p - m) +
                  '","length":"' +
                  a.length +
                  '","length":"' +
                  a.length +
                  '"}');
        if (5 <= arguments.length) b.callback(f, g, l, h);
        else return h;
    };
    this.EncrytAESCBC = function (a, c, d) {
        var e = 0,
            f = '\u6210\u529f';
        var g = '';
        do {
            var l = /[^A-Fa-f0-9]/;
            if (64 != c.length || 0 >= a.length || l.test(a) || l.test(c)) (e = 5005), (f = '\u53c3\u6578\u932f\u8aa4');
            else {
                try {
                    var h = forge.util.binary.raw.encode(forge.util.binary.hex.decode(a));
                    var k = forge.util.binary.raw.encode(forge.util.binary.hex.decode(c));
                } catch (U) {
                    e = 5005;
                    f = '\u53c3\u6578\u932f\u8aa4';
                    break;
                }
                g = h;
                var n = k;
                l = forge.util.createBuffer(new Uint8Array(16), 'raw');
                n = forge.cipher.createCipher('AES-CBC', n);
                n.start({ iv: l });
                n.update(forge.util.createBuffer(g, 'raw'));
                n.finish();
                g = n.output.toHex();
                g = '{"encryptedHexString":"' + g + '","key":"' + c + '","plain":"' + a + '"}';
            }
        } while (0);
        if (3 <= arguments.length) b.callback(d, e, f, g);
        else return '' == g ? e : g;
    };
    this.DecrytAESCBC = function (a, c, d) {
        var e = 0,
            f = '\u6210\u529f',
            g = '';
        do {
            var l = /[^A-Fa-f0-9]/;
            if (64 != c.length || 0 >= a.length || l.test(a) || l.test(c)) (e = 5005), (f = '\u53c3\u6578\u932f\u8aa4');
            else {
                try {
                    var h = forge.util.binary.raw.encode(forge.util.binary.hex.decode(a));
                    var k = forge.util.binary.raw.encode(forge.util.binary.hex.decode(c));
                } catch (Y) {
                    e = 5005;
                    f = '\u53c3\u6578\u932f\u8aa4';
                    break;
                }
                l = h;
                var n = k,
                    r = forge.util.createBuffer(new Uint8Array(16), 'raw');
                n = forge.cipher.createDecipher('AES-CBC', n);
                n.start({ iv: r });
                n.update(forge.util.createBuffer(l, 'raw'));
                l = n.finish() ? n.output.toHex() : null;
                null == l
                    ? ((e = 5080), (f = '\u52a0\u89e3\u5bc6\u5931\u6557'))
                    : (g = '{"plainString":"' + l + '","key":"' + c + '","encrypted":"' + a + '"}');
            }
        } while (0);
        if (3 <= arguments.length) b.callback(d, e, f, g);
        else return 0 == e ? g : e;
    };
    if (u)
        (this.CheckCert = function (a, b, c) {
            try {
                'undefined' == typeof c && (c = 'ret_CheckCert');
                var d = MobileUtils.registerFunction(c),
                    e = navigator.userAgent;
                return MobileUtils.supportTwidAndroid()
                    ? (MobileUtils.androidInterface.CheckCert(a, b, d), 0)
                    : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                    ? ((document.location = 'PKI::CheckCert::' + encodeURI(a + separation + b + separation + d)), 0)
                    : 1;
            } catch (N) {
                return alert(N), -1;
            }
        }),
            (this.MakeCSR = function (a, b, c, d, e, f) {
                try {
                    'undefined' == typeof f && (f = 'ret_MakeCSR');
                    var g = MobileUtils.registerFunction(f),
                        l = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.MakeCSR(
                              MobileUtils.toNumber(a),
                              b,
                              c,
                              d,
                              MobileUtils.toNumber(e),
                              g,
                          ),
                          0)
                        : 0 < l.indexOf('iPhone') || 0 < l.indexOf('iPad')
                        ? ((document.location =
                              'PKI::MakeCSR::' +
                              encodeURI(
                                  a +
                                      separation +
                                      b +
                                      separation +
                                      c +
                                      separation +
                                      d +
                                      separation +
                                      e +
                                      separation +
                                      g,
                              )),
                          0)
                        : 1;
                } catch (Q) {
                    return alert(Q), -1;
                }
            }),
            (this.MakeCSREx = function (a, b, c, d, e, f, g) {
                try {
                    'undefined' == typeof g && (g = 'ret_MakeCSREx');
                    var l = MobileUtils.registerFunction(g),
                        h = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.MakeCSREx(
                              MobileUtils.toNumber(a),
                              b,
                              c,
                              d,
                              MobileUtils.toNumber(e),
                              JSON.stringify(f),
                              l,
                          ),
                          0)
                        : 0 < h.indexOf('iPhone') || 0 < h.indexOf('iPad')
                        ? ((document.location =
                              'PKI::MakeCSREx::' +
                              encodeURI(
                                  a +
                                      separation +
                                      b +
                                      separation +
                                      c +
                                      separation +
                                      d +
                                      separation +
                                      e +
                                      separation +
                                      JSON.stringify(f) +
                                      separation +
                                      l,
                              )),
                          0)
                        : 1;
                } catch (P) {
                    return alert(P), -1;
                }
            }),
            (this.ImportCert = function (a, b, c, d, e) {
                try {
                    'undefined' == typeof e && (e = 'ret_ImportCert');
                    var f = MobileUtils.registerFunction(e),
                        g = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.ImportCert(a, b, c, d, f), 0)
                        : 0 < g.indexOf('iPhone') || 0 < g.indexOf('iPad')
                        ? ((document.location =
                              'PKI::ImportCert::' +
                              encodeURI(a + separation + b + separation + c + separation + d + separation + f)),
                          0)
                        : 1;
                } catch (I) {
                    return alert(I), -1;
                }
            }),
            (this.ChangePIN = function (a, b, c, d, e, f) {
                try {
                    'undefined' == typeof f && (f = 'ret_ChangePIN');
                    var g = MobileUtils.registerFunction(f),
                        l = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.ChangePIN(a, b, c, d, e, g), 0)
                        : 0 < l.indexOf('iPhone') || 0 < l.indexOf('iPad')
                        ? ((document.location =
                              'PKI::ChangePIN::' +
                              encodeURI(
                                  a +
                                      separation +
                                      b +
                                      separation +
                                      c +
                                      separation +
                                      d +
                                      separation +
                                      e +
                                      separation +
                                      g,
                              )),
                          0)
                        : 1;
                } catch (Q) {
                    return alert(Q), -1;
                }
            }),
            (this.DeleteCert = function (a, b, c) {
                try {
                    'undefined' == typeof c && (c = 'ret_DeleteCert');
                    var d = MobileUtils.registerFunction(c),
                        e = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.DeleteCert(a, b, d), 0)
                        : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                        ? ((document.location = 'PKI::DeleteCert::' + encodeURI(a + separation + b + separation + d)),
                          0)
                        : 1;
                } catch (N) {
                    return alert(N), -1;
                }
            }),
            (this.QueryDeviceID = function (a, b, c) {
                try {
                    'undefined' == typeof c && (c = 'ret_QueryDeviceID');
                    var d = MobileUtils.registerFunction(c),
                        e = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.QueryDeviceID(a, b, d), 0)
                        : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                        ? ((document.location =
                              'PKI::QueryDeviceID::' + encodeURI(a + separation + b + separation + d)),
                          0)
                        : 1;
                } catch (N) {
                    return alert(N), -1;
                }
            }),
            (this.DeleteBrowserCert = function (a, b, c) {
                try {
                    var d = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.DeleteBrowserCert(a, b, c), 0)
                        : 0 < d.indexOf('iPhone') || 0 < d.indexOf('iPad')
                        ? ((document.location =
                              'PKI::DeleteBrowserCert::' + encodeURI(a + separation + b + separation + c)),
                          0)
                        : 1;
                } catch (m) {
                    return alert(m), -1;
                }
            }),
            (this.CertEncryptPkcs7 = function (a, b, c, d) {
                try {
                    var e = MobileUtils.registerFunction(d),
                        f = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.CertEncryptPkcs7(a, b, MobileUtils.toNumber(c), e), 0)
                        : 0 < f.indexOf('iPhone') || 0 < f.indexOf('iPad')
                        ? ((document.location =
                              'PKI::CertEncryptPkcs7::' +
                              encodeURI(a + separation + b + separation + c + separation + e)),
                          0)
                        : 1;
                } catch (M) {
                    return alert(M), -1;
                }
            }),
            (this.SymEncrypt = function (a, b, c, d, e) {
                try {
                    'undefined' == typeof e && (e = 'ret_SymEncrypt');
                    var f = MobileUtils.registerFunction(e),
                        g = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.SymEncrypt(a, b, c, MobileUtils.toNumber(d), f), 0)
                        : 0 < g.indexOf('iPhone') || 0 < g.indexOf('iPad')
                        ? ((document.location =
                              'PKI::SymEncrypt::' +
                              encodeURI(a + separation + b + separation + c + separation + d + separation + f)),
                          0)
                        : 1;
                } catch (I) {
                    return alert(I), -1;
                }
            }),
            (this.SymDecrypt = function (a, b, c, d, e) {
                try {
                    'undefined' == typeof e && (e = 'ret_SymDecrypt');
                    var f = MobileUtils.registerFunction(e),
                        g = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.SymDecrypt(a, b, c, MobileUtils.toNumber(d), f), 0)
                        : 0 < g.indexOf('iPhone') || 0 < g.indexOf('iPad')
                        ? ((document.location =
                              'PKI::SymDecrypt::' +
                              encodeURI(a + separation + b + separation + c + separation + d + separation + f)),
                          0)
                        : 1;
                } catch (I) {
                    return alert(I), -1;
                }
            }),
            (this.ChangeWeb = function (a, b, c) {
                try {
                    'undefined' == typeof c && (c = 'ret_ChangeWeb');
                    var d = MobileUtils.registerFunction(c),
                        e = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.ChangeWeb(MobileUtils.toNumber(a), b, d), 0)
                        : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                        ? ((document.location = 'PKI::ChangeWeb::' + encodeURI(a + separation + b + separation + d)), 0)
                        : 1;
                } catch (N) {
                    return alert(N), -1;
                }
            }),
            (this.SetErrorCode = function (a, b, c) {
                try {
                    'undefined' == typeof c && (c = 'ret_SetErrorCode');
                    var d = MobileUtils.registerFunction(c),
                        e = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.SetErrorCode(MobileUtils.toNumber(a), b, d), 0)
                        : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                        ? ((document.location = 'PKI::SetErrorCode::' + encodeURI(a + separation + b + separation + d)),
                          0)
                        : 1;
                } catch (N) {
                    return alert(N), -1;
                }
            }),
            (this.ExitWebview = function () {
                try {
                    var a = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.ExitWebview(), 0)
                        : 0 < a.indexOf('iPhone') || 0 < a.indexOf('iPad')
                        ? ((document.location = 'PKI::ExitWebview::'), 0)
                        : 1;
                } catch (r) {
                    return alert(r), -1;
                }
            }),
            (this.ExitWebview2 = function (a) {
                try {
                    var b = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.ExitWebview2(a), 0)
                        : 0 < b.indexOf('iPhone') || 0 < b.indexOf('iPad')
                        ? ((document.location = 'PKI::ExitWebview2::' + encodeURI(a)), 0)
                        : 1;
                } catch (n) {
                    return alert(n), -1;
                }
            }),
            (this.CheckCert = function (a, b, c) {
                try {
                    'undefined' == typeof c && (c = 'ret_CheckCert');
                    var d = MobileUtils.registerFunction(c),
                        e = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.CheckCert(a, b, d), 0)
                        : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                        ? ((document.location = 'PKI::CheckCert::' + encodeURI(a + separation + b + separation + d)), 0)
                        : 1;
                } catch (N) {
                    return alert(N), -1;
                }
            }),
            (this.OpenBrowser = function (a, b) {
                try {
                    var c = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (b
                              ? MobileUtils.androidInterface.OpenBrowser(a, b)
                              : MobileUtils.androidInterface.OpenBrowser(a),
                          0)
                        : 0 < c.indexOf('iPhone') || 0 < c.indexOf('iPad')
                        ? ((document.location = b
                              ? 'PKI::OpenBrowser::' + encodeURI(a + separation + b)
                              : 'PKI::OpenBrowser::' + encodeURI(a)),
                          0)
                        : 1;
                } catch (F) {
                    return alert(F), -1;
                }
            }),
            (this.GetServerAuth = function (a) {
                try {
                    'undefined' == typeof a && (a = 'ret_GetServerAuth');
                    var b = MobileUtils.registerFunction(a),
                        c = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.GetServerAuth(b), 0)
                        : 0 < c.indexOf('iPhone') || 0 < c.indexOf('iPad')
                        ? ((document.location = 'PKI::GetServerAuth::' + encodeURI(b)), 0)
                        : 1;
                } catch (F) {
                    return alert(F), -1;
                }
            }),
            (this.VerifyServerResponse = function (a, b) {
                try {
                    'undefined' == typeof b && (b = 'ret_VerifyServerResponse');
                    var c = MobileUtils.registerFunction(b),
                        d = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.VerifyServerResponse(a, c), 0)
                        : 0 < d.indexOf('iPhone') || 0 < d.indexOf('iPad')
                        ? ((document.location = 'PKI::VerifyServerResponse::' + encodeURI(a + separation + c)), 0)
                        : 1;
                } catch (m) {
                    return alert(m), -1;
                }
            }),
            (this.ManageLocalAuth = function (a, b, c, d, e) {
                try {
                    'undefined' == typeof e && (e = 'ret_ManageLocalAuth');
                    var f = MobileUtils.registerFunction(e),
                        g = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.ManageLocalAuth(a, b, c, d, f), 0)
                        : 0 < g.indexOf('iPhone') || 0 < g.indexOf('iPad')
                        ? ((document.location =
                              'PKI::ManageLocalAuth::' +
                              encodeURI(a + separation + b + separation + c + separation + d + separation + f)),
                          0)
                        : 1;
                } catch (I) {
                    return alert(I), -1;
                }
            }),
            (this.CertProcessDone = function () {
                try {
                    var a = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.CertProcessDone(), 0)
                        : 0 < a.indexOf('iPhone') || 0 < a.indexOf('iPad')
                        ? ((document.location = 'PKI::CertProcessDone'), 0)
                        : 1;
                } catch (r) {
                    return alert(r), -1;
                }
            }),
            (this.DecryptAndShowPdf = function (a, b, c, d) {
                try {
                    'undefined' == typeof d && (d = 'ret_DecryptAndShowPdf');
                    var e = MobileUtils.registerFunction(d),
                        f = navigator.userAgent;
                    return MobileUtils.supportTwidAndroid()
                        ? (MobileUtils.androidInterface.DecryptAndShowPdf(a, b, c, e), 0)
                        : 0 < f.indexOf('iPhone') || 0 < f.indexOf('iPad')
                        ? ((document.location =
                              'PKI::DecryptAndShowPdf::' +
                              encodeURI(a + separation + b + separation + c + separation + e)),
                          0)
                        : 1;
                } catch (M) {
                    return alert(M), -1;
                }
            });
    else {
        var v = function (a) {
                var b = null;
                if (a) {
                    b = '';
                    if ('C' == a.attributes[0].shortName)
                        for (var c = 0; c < a.attributes.length; c++)
                            b = b + a.attributes[c].shortName + '=' + a.attributes[c].value + ', ';
                    else
                        for (c = a.attributes.length - 1; 0 <= c; c--)
                            b = b + a.attributes[c].shortName + '=' + a.attributes[c].value + ', ';
                    2 < b.length && (b = b.substring(0, b.length - 2));
                }
                return b;
            },
            c = function (a, b) {
                var c = null;
                try {
                    c = forge.pkcs12.pkcs12FromAsn1(forge.asn1.fromDer(forge.util.decode64(a)), b);
                } catch (F) {}
                return c;
            },
            q = function (a) {
                if ('undefined' === typeof localStorage) return !1;
                var b = 'TWCA' + new Date().getTime().toString(),
                    c = null;
                if (null == localStorage.getItem('TWCACertIdxRef')) c = {};
                else if ('' == localStorage.getItem('TWCACertIdxRef')) c = {};
                else
                    try {
                        c = JSON.parse(localStorage.getItem('TWCACertIdxRef'));
                    } catch (M) {
                        c = {};
                    }
                for (var d in c)
                    if (c[d].issuer == a.issuer) {
                        var e = a.cn
                                .replace(/^\s+|\s+$/, '')
                                .replace(/^0*/, '')
                                .toUpperCase()
                                .split('-')[0],
                            f = c[d].cn
                                .replace(/^\s+|\s+$/, '')
                                .replace(/^0*/, '')
                                .toUpperCase()
                                .split('-')[0];
                        if (e == f) {
                            c[d] = null;
                            delete c[d];
                            localStorage.removeItem(d);
                            break;
                        }
                    }
                c[b] = {
                    cn: a.cn,
                    issuer: a.issuer,
                    subject: a.subject,
                    serial: a.serial,
                    notBefore: a.notBefore,
                    notAfter: a.notAfter,
                };
                try {
                    localStorage.setItem('TWCACertIdxRef', JSON.stringify(c)),
                        localStorage.setItem(b, JSON.stringify(a));
                } catch (M) {
                    return !1;
                }
                return b;
            },
            x = function (a, b) {
                if (!a) return null;
                var c = {};
                c.serial = a.serialNumber.toUpperCase();
                c.issuer = v(a.issuer);
                c.subject = v(a.subject);
                c.notBefore = C(new Date(a.validity.notBefore));
                c.notAfter = C(new Date(a.validity.notAfter));
                if (0 < c.subject.length && 0 <= c.subject.indexOf('CN=')) {
                    var d = c.subject.substring(c.subject.indexOf('CN=') + 3, c.subject.length),
                        e = d.length;
                    0 <= d.indexOf(', ') && (e = d.indexOf(', '));
                    c.cn = d.substring(0, e);
                }
                d = forge.pki.certificateToPem(a);
                d = d.replace(/\-----BEGIN CERTIFICATE-----/g, '');
                d = d.replace(/\-----END CERTIFICATE-----/g, '');
                d = d.replace(/(?:\\[rn]|[\r\n]+)+/g, '');
                c.certb64 = d;
                e = forge.md.sha1.create();
                e.update(forge.util.decode64(d));
                c.certfinger = e.digest().toHex();
                c.b64P12Cert = b;
                return c;
            },
            D = function (a, b) {
                for (
                    var c = [],
                        d = b
                            .replace(/^\/\/|\/\/\s*$/g, '')
                            .replace(/\s*=\s*/gm, '=')
                            .split('//'),
                        e = 0;
                    e < d.length;
                    e++
                )
                    c[e] = g(d[e]);
                return B(a, c);
            },
            A = function (a, b) {
                var c = !1;
                if (!(b && a && a.subject && a.subject.attributes)) return c;
                for (var d = 0; d < a.subject.attributes.length; d++) {
                    var e = a.subject.attributes[d];
                    e && e.value && 0 <= e.value.indexOf(b) && (c = !0);
                }
                return c;
            };
        this.QueryDeviceID = function (a, c, d) {
            function e() {
                function a() {
                    return Math.floor(65536 * (1 + Math.random()))
                        .toString(16)
                        .substring(1);
                }
                return a() + a() + '-' + a() + '-' + a() + '-' + a() + '-' + a() + a() + a();
            }
            function f() {
                if (-1 < navigator.platform.indexOf('Win')) var a = 'PC';
                else
                    -1 < navigator.platform.indexOf('Mac')
                        ? (a = 'PC')
                        : navigator.userAgent.match(/iPhone/i)
                        ? (a = 'IP')
                        : navigator.userAgent.match(/iPad/i)
                        ? (a = 'IA')
                        : navigator.userAgent.match(/Android/i)
                        ? ((a = 'GP'), navigator.userAgent.match(/Mobile/i) || (a = 'GA'))
                        : (a = '');
                return a;
            }
            a = 0;
            var g = '\u6210\u529f',
                h = '';
            try {
                'undefined' == typeof d && (d = 'ret_QueryDeviceID');
                if (c) {
                    var l = localStorage.getItem('TWCAAccountUqiDeviceID');
                    l
                        ? ((l = JSON.parse(l)),
                          l[c] ||
                              ((l[c] = e() + '-' + new Date().getTime()),
                              localStorage.setItem('TWCAAccountUqiDeviceID', JSON.stringify(l))),
                          (k = l[c]))
                        : ((k = e() + '-' + new Date().getTime()),
                          (l = {}),
                          (l[c] = k),
                          localStorage.setItem('TWCAAccountUqiDeviceID', JSON.stringify(l)));
                } else {
                    var k = localStorage.getItem('TWCABrowserUqiDeviceID');
                    k || ((k = e() + '-' + new Date().getTime()), localStorage.setItem('TWCABrowserUqiDeviceID', k));
                }
                h = '{"deviceType":"' + f() + '","deviceId":"' + k + '","osVersion":"","appVersion":""}';
            } catch (P) {
                console.error(P), (a = 5999), (g = '\u8b80\u53d6DeviceID\u5931\u6557');
            }
            b.callback(d, a, g, h);
        };
        this.MakeCSR = function (a, c, d, e, f) {
            function g(a) {
                var c = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 65537 });
                null == c
                    ? b.callback(f, 5065, '\u7522\u751f\u91d1\u9470\u5931\u6557', '')
                    : l(c.privateKey, c.publicKey, a);
            }
            function h(a, b) {
                var c = forge.pki.privateKeyFromAsn1(forge.asn1.fromDer(forge.util.createBuffer(a))),
                    d = forge.pki.setRsaPublicKey(c.n, c.e);
                l(c, d, b);
            }
            function l(a, c, e) {
                var g = forge.pki.encryptRsaPrivateKey(a, d),
                    h = forge.pki.createCertificationRequest();
                h.publicKey = c;
                e && h.setSubject([{ name: 'commonName', value: e }]);
                h.sign(a);
                h = forge.pki.certificationRequestToPem(h);
                g = g.replace(/(?:\\[rn]|[\r\n]+)+/g, '');
                g = g.replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '');
                g = g.replace('-----END ENCRYPTED PRIVATE KEY-----', '');
                h = h.replace(/(?:\\[rn]|[\r\n]+)+/g, '');
                h = h.replace('-----BEGIN CERTIFICATE REQUEST-----', '');
                h = h.replace('-----END CERTIFICATE REQUEST-----', '');
                n = '{"b64Key":"' + g + '","csr":"' + h + '"}';
                b.callback(f, 0, '\u6210\u529f', n);
            }
            var k = 0,
                m = '\u6210\u529f',
                n = '';
            if (d)
                if (1024 != a && 2048 != a && 4096 != a)
                    (k = 5005), (m = '\u53c3\u6578\u932f\u8aa4\uff0c\u4e0d\u652f\u63f4\u7684\u91d1\u9470\u9577\u5ea6');
                else if (0 != c && 512 != c && 1024 != c)
                    (k = 5005), (m = '\u53c3\u6578\u932f\u8aa4\uff0c\u4e0d\u652f\u63f4\u7684\u6f14\u7b97\u6cd5');
                else {
                    switch (c) {
                        case 0:
                            c = 'SHA-1';
                            break;
                        case 512:
                            c = 'SHA-256';
                            break;
                        case 768:
                            c = 'SHA-512';
                            break;
                        default:
                            c = 'SHA-256';
                    }
                    a = {
                        name: 'RSASSA-PKCS1-v1_5',
                        modulusLength: a,
                        publicExponent: new Uint8Array([1, 0, 1]),
                        hash: { name: c },
                    };
                    try {
                        if (window.crypto)
                            if (crypto.subtle && crypto.subtle.generateKey)
                                crypto.subtle
                                    .generateKey(a, !0, ['sign', 'verify'])
                                    .then(function (a) {
                                        return crypto.subtle.exportKey('pkcs8', a.privateKey);
                                    })
                                    .then(function (a) {
                                        h(a, e);
                                    })
                                    ['catch'](function (a) {
                                        console.error(a);
                                        g(e);
                                    });
                            else {
                                g(e);
                                return;
                            }
                        else if (window.msCrypto) {
                            var q = window.msCrypto.subtle.generateKey(a, !0, ['sign', 'verify']);
                            q.onerror = function (a) {
                                console.log('genOp.onerror event handler fired.');
                                g(e);
                            };
                            q.oncomplete = function (a) {
                                a = window.msCrypto.subtle.exportKey('pkcs8', a.target.result.privateKey);
                                a.onerror = function (a) {
                                    console.log('expOp.onerror event handler fired.');
                                    g(e);
                                };
                                a.oncomplete = function (a) {
                                    h(a.target.result, e);
                                };
                            };
                        } else {
                            g(e);
                            return;
                        }
                    } catch (ba) {
                        g(e);
                        return;
                    }
                }
            else (k = 5005), (m = '\u53c3\u6578\u932f\u8aa4\uff0c\u5bc6\u78bc\u4e0d\u53ef\u7a7a\u767d');
            0 != k && b.callback(f, k, m, n);
        };
        this.ImportCert = function (a, c, d, e, f, g) {
            var h = 0,
                l = '\u6210\u529f',
                k = '';
            if (a && c && d && e && g) {
                0 > e.indexOf('-----BEGIN CERTIFICATE-----') && (e = '-----BEGIN CERTIFICATE-----' + e);
                0 > e.indexOf('-----END CERTIFICATE-----') && (e += '-----END CERTIFICATE-----');
                0 > d.indexOf('-----BEGIN ENCRYPTED PRIVATE KEY-----') &&
                    (d = '-----BEGIN ENCRYPTED PRIVATE KEY-----' + d);
                0 > d.indexOf('-----END ENCRYPTED PRIVATE KEY-----') && (d += '-----END ENCRYPTED PRIVATE KEY-----');
                try {
                    try {
                        e = forge.pki.certificateFromPem(e);
                    } catch (X) {
                        e = e.replace('CERTIFICATE', 'PKCS7');
                        e = e.replace('CERTIFICATE', 'PKCS7');
                        for (
                            var m = forge.pkcs7.messageFromPem(e).certificates, n = 0;
                            n < m.length && ((e = m[n]), !A(m[n], a));
                            n++
                        );
                    }
                    d = forge.pki.decryptRsaPrivateKey(d, c);
                    m = !1;
                    if (d && e && d.n.data && e.publicKey.n.data && d.n.data.length == e.publicKey.n.data.length) {
                        for (n = 0; n < e.publicKey.n.data.length && d.n.data[n] == e.publicKey.n.data[n]; n++);
                        m = !0;
                    }
                    if (m)
                        if (A(e, a)) {
                            var p = forge.pkcs12.toPkcs12Asn1(d, e, c, { algorithm: '3des' }),
                                r = forge.asn1.toDer(p).getBytes(),
                                t = forge.util.encode64(r),
                                u = x(e, t);
                            D(u, f)
                                ? q(u)
                                    ? (k = '{' + y(u) + '}')
                                    : ((h = 5110), (l = '\u5132\u5b58\u6191\u8b49\u5931\u6557'))
                                : ((h = 5115),
                                  (l =
                                      '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u689d\u4ef6\u4e0d\u7b26'));
                        } else
                            (h = 5115),
                                (l =
                                    '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u8207\u4f7f\u7528\u8005\u4e0d\u7b26');
                    else
                        (h = 5115),
                            (l =
                                '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u8207\u91d1\u9470\u4e0d\u7b26');
                } catch (X) {
                    console.error(X), (h = 5111), (l = '\u532f\u5165\u6191\u8b49\u5931\u6557');
                }
            } else (h = 5005), (l = '\u53c3\u6578\u932f\u8aa4');
            b.callback(g, h, l, k);
        };
        this.ImportCertStore = function (a, d, e, f, g) {
            var h = 0,
                l = '\u6210\u529f',
                k = '';
            do
                if (a && d && e) {
                    if (/.*Android.*/.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent))
                        try {
                            var m = piexif.load(e);
                            if (null == m) {
                                console.error(ex);
                                h = 5005;
                                l = '\u53c3\u6578\u932f\u8aa4\uff1a\u5716\u7247\u683c\u5f0f\u932f\u8aa4';
                                break;
                            }
                            e = m['0th']['33432'];
                        } catch (V) {
                            console.error(V);
                            h = 5005;
                            l = '\u53c3\u6578\u932f\u8aa4\uff1a\u5716\u7247\u683c\u5f0f\u932f\u8aa4';
                            break;
                        }
                    if (e)
                        try {
                            try {
                                if (0 >= forge.asn1.fromDer(forge.util.decode64(e)).value.length) {
                                    h = 5040;
                                    l = '\u6191\u8b49\u683c\u5f0f\u932f\u8aa4';
                                    break;
                                }
                            } catch (V) {
                                console.error(V);
                                h = 5040;
                                l = '\u6191\u8b49\u683c\u5f0f\u932f\u8aa4';
                                break;
                            }
                            pkcs12 = c(e, d);
                            if (null == pkcs12) (h = 5071), (l = '\u6191\u8b49\u5bc6\u78bc\u932f\u8aa4');
                            else {
                                for (
                                    var n = -1,
                                        p = pkcs12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag],
                                        r = 0;
                                    r < p.length;
                                    r++
                                )
                                    if (A(p[r].cert, a)) {
                                        n = r;
                                        break;
                                    }
                                if (0 > n)
                                    (h = 5115),
                                        (l =
                                            '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u8207\u4f7f\u7528\u8005\u4e0d\u7b26');
                                else {
                                    var t = x(p[n].cert, e);
                                    D(t, f)
                                        ? q(t)
                                            ? (k = '{' + y(t) + '}')
                                            : ((h = 5110), (l = '\u5132\u5b58\u6191\u8b49\u5931\u6557'))
                                        : ((h = 5115),
                                          (l =
                                              '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u689d\u4ef6\u4e0d\u7b26'));
                                }
                            }
                        } catch (V) {
                            console.error(V), (h = 5111), (l = '\u532f\u5165\u6191\u8b49\u5931\u6557');
                        }
                    else (h = 5005), (l = '\u53c3\u6578\u932f\u8aa4');
                } else (h = 5005), (l = '\u53c3\u6578\u932f\u8aa4');
            while (0);
            b.callback(g, h, l, k);
        };
        this.ExportCertStore = function (a, c, d) {
            var e = 0,
                f = '\u6210\u529f',
                g = '';
            do {
                var h = null,
                    l = '';
                if (d && c) {
                    try {
                        if (((h = sessionStorage.getItem('selectedCertInfo')), !h)) {
                            e = 5067;
                            f = '\u5c1a\u672a\u9078\u64c7\u6191\u8b49';
                            break;
                        }
                    } catch (P) {
                        console.error(P);
                        e = 5112;
                        f = '\u8b80\u53d6\u6191\u8b49\u5931\u6557';
                        break;
                    }
                    h = JSON.parse(h);
                    if (h.b64P12Cert) {
                        if (/.*Android.*/.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                            if (!a) {
                                e = 5005;
                                f = '\u53c3\u6578\u932f\u8aa4';
                                break;
                            }
                            try {
                                var k = piexif.load(a);
                                if (null == k) {
                                    console.error(ex);
                                    e = 5005;
                                    f = '\u53c3\u6578\u932f\u8aa4\uff1a\u5716\u7247\u683c\u5f0f\u932f\u8aa4';
                                    break;
                                }
                                k['0th']['33432'] = h.b64P12Cert;
                                l = piexif.insert(piexif.dump(k), a);
                            } catch (P) {
                                console.error(P);
                                e = 5005;
                                f = '\u53c3\u6578\u932f\u8aa4\uff1a\u5716\u7247\u683c\u5f0f\u932f\u8aa4';
                                break;
                            }
                        } else l = h.b64P12Cert;
                        g = '{"certStore":"' + l + '","userId":"' + c + '"}';
                    } else (e = 5060), (f = '\u91d1\u9470\u4e0d\u5b58\u5728');
                } else (e = 5005), (f = '\u53c3\u6578\u932f\u8aa4');
            } while (0);
            b.callback(d, e, f, g);
        };
        this.ChangePIN = function (a, d, e) {
            var f = 0,
                g = '\u6210\u529f',
                h = '';
            do
                try {
                    var l = null;
                    if (a && d && e) {
                        try {
                            if (((l = JSON.parse(sessionStorage.getItem('selectedCertInfo'))), !l)) {
                                f = 5067;
                                g = '\u5c1a\u672a\u9078\u64c7\u6191\u8b49';
                                break;
                            }
                        } catch (T) {
                            console.error(T);
                            f = 5112;
                            g = '\u8b80\u53d6\u6191\u8b49\u5931\u6557';
                            break;
                        }
                        var k = l.b64P12Cert;
                        k = c(k, a);
                        if (null == k) (f = 5071), (g = '\u6191\u8b49\u5bc6\u78bc\u932f\u8aa4');
                        else {
                            for (
                                var n = k.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag],
                                    q = k.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[
                                        forge.pki.oids.pkcs8ShroudedKeyBag
                                    ][0].key,
                                    p = [],
                                    r = 0;
                                r < n.length;
                                r++
                            )
                                p.push(n[r].cert);
                            var x = forge.pkcs12.toPkcs12Asn1(q, p, d, { algorithm: '3des' }),
                                t = forge.asn1.toDer(x).getBytes(),
                                u = forge.util.encode64(t);
                            a: {
                                p = void 0;
                                r = l;
                                var A = null;
                                if (localStorage.getItem('TWCACertIdxRef')) {
                                    try {
                                        A = JSON.parse(localStorage.getItem('TWCACertIdxRef'));
                                    } catch (T) {
                                        var v = null;
                                        break a;
                                    }
                                    for (p in A)
                                        if (A[p].issuer == r.issuer) {
                                            var D = r.cn
                                                    .replace(/^\s+|\s+$/, '')
                                                    .replace(/^0*/, '')
                                                    .toUpperCase()
                                                    .split('-')[0],
                                                w = A[p].cn
                                                    .replace(/^\s+|\s+$/, '')
                                                    .replace(/^0*/, '')
                                                    .toUpperCase()
                                                    .split('-')[0];
                                            if (D == w) {
                                                v = p;
                                                break a;
                                            }
                                        }
                                    v = void 0;
                                } else v = null;
                            }
                            v
                                ? ((l.b64P12Cert = u),
                                  localStorage.setItem(v, JSON.stringify(l)),
                                  sessionStorage.setItem('selectedCertInfo', JSON.stringify(l)),
                                  sessionStorage.setItem('twcaSelectedKey', forge.util.encode64(d)),
                                  (h = '{' + y(l) + '}'))
                                : (console.error(ex), (f = 5121), (g = '\u8b8a\u66f4\u5bc6\u78bc\u5931\u6557'));
                        }
                    } else (f = 5005), (g = '\u53c3\u6578\u932f\u8aa4');
                } catch (T) {
                    console.error(T), (f = 5121), (g = '\u8b8a\u66f4\u5bc6\u78bc\u5931\u6557');
                }
            while (0);
            b.callback(e, f, g, h);
        };
    }
    this.GetCertSubjectCN = function () {
        return b.getSelectedCertFieldValue('cn');
    };
    this.GetCertSubject = function () {
        return b.getSelectedCertFieldValue('subject');
    };
    this.GetCertIssuer = function () {
        return b.getSelectedCertFieldValue('issuer');
    };
    this.GetCertSerial = function () {
        return b.getSelectedCertFieldValue('serial');
    };
    this.GetCertNotBefore = function () {
        return b.getSelectedCertFieldValue('notBefore');
    };
    this.GetCertNotAfter = function () {
        return b.getSelectedCertFieldValue('notAfter');
    };
    this.getSelectedCertFieldValue = function (a) {
        return b.selectedCertInfo && 'undefined' != typeof b.selectedCertInfo[a] ? b.selectedCertInfo[a] : '';
    };
    this.setOpenWindowObject = function (a) {
        if ('object' != typeof a) return 5005;
        b._childWindow = a;
    };
    this.SelectSignerExFromChildWindowHandler = function (a, c, d, f) {
        5071 == a && null == e[3]
            ? twcaCryptoLibAlertDialog.show(
                  '\u8f38\u5165\u5bc6\u78bc',
                  '\u8acb\u8f38\u5165\u6191\u8b49\u5bc6\u78bc',
                  '',
                  '\u53d6\u6d88',
                  '\u78ba\u8a8d',
                  ['SelectSignerExFromChild', e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], twcaLib],
              )
            : ((d = e[8]), (e = null), b.callback(d, a, c, f));
    };
    this.SignPkcs7FromChildWindowHandler = function (a, c, d, f) {
        d = e[2];
        e = null;
        b.callback(d, a, c, f);
    };
    this.SignPkcs1FromChildWindowHandler = function (a, c, d, f) {
        d = e[2];
        e = null;
        b.callback(d, a, c, f);
    };
    this.ResetKeyFromChildWindowHandler = function (a, c, d, f) {
        d = e[0];
        e = null;
        b.callback(d, a, c, f);
    };
    this.GetVersionFromChildWindowHandler = function (a, c, d, f) {
        d = e[0];
        e = null;
        b.callback(d, a, c, f);
    };
    this.callback = function (a, c, d, e) {
        if ('string' === typeof a && 0 == a.indexOf('oTwcaLib._childWindow.twcaLib.'))
            (a = a.substring(30, a.length)), b._childWindow.twcaLib[a](c, d, '', e);
        else if ('string' === typeof a && 0 == a.indexOf('twcaLib.')) (a = a.substring(8, a.length)), b[a](c, d, '', e);
        else {
            var f = {};
            if (a && '[object Function]' === f.toString.call(a)) a(c, d, '', e);
            else window[a](c, d, '', e);
        }
    };
}
try {
    support_amd = define.amd;
} catch (E) {}
support_amd &&
    define(function (E) {
        var p = require('twca/forge');
        return new (function () {
            function E() {
                var a = !1;
                try {
                    window.opener &&
                        window.opener.twcaLib &&
                        window.location.hostname === window.opener.location.hostname &&
                        (window.opener.twcaLib.setOpenWindowObject(window), (a = !0));
                } catch (q) {
                    a = !1;
                }
                return a;
            }
            function t(a, b, f, g) {
                function c(a, b, c, e, f, g) {
                    var h = p.pkcs7.createSignedData();
                    switch (c) {
                        case 0:
                            h.content = p.util.createBuffer(d(a), 'raw');
                            break;
                        case 1:
                            h.content = p.util.createBuffer(a, 'utf8');
                            break;
                        case 2:
                            h.content =
                                'undefined' == typeof Big5Encoding
                                    ? p.util.createBuffer(a, 'utf8')
                                    : p.util.createBuffer(Big5Encoding.getBig5Encoding(a), 'raw');
                            break;
                        default:
                            h.content = p.util.createBuffer(d(a), 'raw');
                    }
                    h.addCertificate(f);
                    a = { key: g, certificate: f, digestAlgorithm: b };
                    q &&
                        (a.authenticatedAttributes = [
                            { type: p.pki.oids.contentType, value: p.pki.oids.data },
                            { type: p.pki.oids.messageDigest },
                            { type: p.pki.oids.signingTime },
                        ]);
                    h.addSigner(a);
                    h.sign();
                    e = e ? p.pkcs7.messageToPem(h) : p.pkcs7.messageToPemWithoutContent(h);
                    e = e.replace(/\-----BEGIN PKCS7-----/g, '');
                    e = e.replace(/\-----END PKCS7-----/g, '');
                    return (e = e.replace(/(?:\\[rn]|[\r\n]+)+/g, ''));
                }
                var l = '',
                    k = null,
                    n = null;
                if (null == e.selectedCertInfo || null != b) y(b, f);
                else {
                    switch (61440 & g) {
                        case 0:
                            b = p.pki.oids.sha1;
                            break;
                        case 4096:
                            b = p.pki.oids.md5;
                            break;
                        case 8192:
                            b = p.pki.oids.sha256;
                            break;
                        case 16384:
                            b = p.pki.oids.sha512;
                            break;
                        default:
                            b = p.pki.oids.sha1;
                    }
                    f = 1024 == (3840 & g) ? !1 : !0;
                    g &= 15;
                    var q = !1;
                    k = h();
                    n = k.oPrivateKey;
                    k = k.oCert;
                    if ('string' === typeof a) l = c(a, b, g, f, k, n);
                    else if (Array.isArray(a)) {
                        l = '';
                        for (var m = 0; m < a.length; m++) l = l + '||' + c(a[m], b, g, f, k, n);
                        l = l.substring(2, l.length);
                    }
                }
                return l;
            }
            function K(a, b, f, g) {
                function c(a, b, c, e, f) {
                    k = b.create();
                    switch (c) {
                        case 0:
                            k.update(d(a));
                            break;
                        case 1:
                            k.update(a, 'utf8');
                            break;
                        case 2:
                            'undefined' == typeof Big5Encoding
                                ? k.update(a, 'utf8')
                                : k.update(Big5Encoding.getBig5Encoding(a));
                            break;
                        default:
                            k.update(d(a));
                    }
                    return e ? p.util.bytesToHex(f.sign(k)) : p.util.encode64(f.sign(k));
                }
                var l = null,
                    k = null;
                if (null == e.selectedCertInfo || null != b) y(b, f);
                else {
                    switch (61440 & g) {
                        case 0:
                            b = p.md.sha1;
                            break;
                        case 4096:
                            b = p.md.md5;
                            break;
                        case 8192:
                            b = p.md.sha256;
                            break;
                        case 16384:
                            b = p.md.sha512;
                            break;
                        default:
                            b = p.md.sha1;
                    }
                    f = 256 == (3840 & g) ? !1 : !0;
                    g &= 15;
                    l = h().oPrivateKey;
                    if ('string' === typeof a) var n = c(a, b, g, f, l);
                    else if (Array.isArray(a)) {
                        n = '';
                        for (var q = 0; q < a.length; q++) n = n + '||' + c(a[q], b, g, f, l);
                        n = n.substring(2, n.length);
                    }
                }
                return n;
            }
            function B(a, b, d) {
                function c(a, b) {
                    var c = p.asn1.oidToDer(p.pki.oids[b]).getBytes(),
                        d = p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.SEQUENCE, !0, []),
                        e = p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.SEQUENCE, !0, []);
                    e.value.push(p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.OID, !1, c));
                    e.value.push(p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.NULL, !1, ''));
                    c = p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.OCTETSTRING, !1, p.util.hexToBytes(a));
                    d.value.push(e);
                    d.value.push(c);
                    return p.asn1.toDer(d).getBytes();
                }
                function f(a) {
                    if (0 >= a.length) return !1;
                    for (var b = !0, c = a[0].length, d = 1; d < a.length; d++)
                        if (a[d].length != c) {
                            b = !1;
                            break;
                        }
                    return b;
                }
                var g = null;
                do
                    if (null == e.selectedCertInfo || null != b) y(b, d);
                    else {
                        if ('string' === typeof a) g = a.length;
                        else {
                            if (!f(a)) break;
                            g = a[0].length;
                        }
                        switch (g) {
                            case 20:
                                var k = 'md5';
                                break;
                            case 40:
                                k = 'sha1';
                                break;
                            case 64:
                                k = 'sha256';
                                break;
                            case 128:
                                k = 'sha512';
                        }
                        g = h();
                        if ('string' === typeof a) {
                            p1Encoded = c(a, k);
                            var n = p.pki.rsa.encrypt(p1Encoded, g.oPrivateKey, 1);
                            n = p.util.encode64(n);
                        } else if (Array.isArray(a)) {
                            n = '';
                            for (var q = 0; q < a.length; q++) {
                                p1Encoded = c(a[q], k);
                                var m = p.pki.rsa.encrypt(p1Encoded, g.oPrivateKey, 1);
                                n = n + '||' + p.util.encode64(m);
                            }
                            n = n.substring(2, n.length);
                        }
                    }
                while (0);
                return n;
            }
            function y(a, d, e, h) {
                var c = -1,
                    l = [],
                    k = g('TWCACertIdxRef'),
                    n = {},
                    q = null,
                    m = '',
                    x = !1,
                    t = !1,
                    u = !1;
                do {
                    4096 == (61440 & e) && (x = !0);
                    4 == (4 & e) && (t = !0);
                    8 == (8 & e) && (u = !0);
                    var v = e & 240;
                    if (null == a || '' == a) (c = 5005), (q = null);
                    else if (
                        ('//S' != a.substring(0, 3) && '//I' != a.substring(0, 3)) ||
                        '//' != a.substring(a.length - 2, a.length)
                    )
                        (c = 5005), (q = null);
                    else if (null == d || '' == d || (14 == d.length && !isNaN(d))) {
                        var w = a
                            .replace(/^\/\/|\/\/\s*$/g, '')
                            .replace(/\s*=\s*/gm, '=')
                            .split('//');
                        for (var D = 0; D < w.length; D++) {
                            var y = D;
                            a: {
                                var z = {};
                                for (
                                    var B = 'S_CL S_SN S_CN S_OU S_O S_C I_CN I_OU I_O I_C'.split(' '), E = w[D];
                                    0 < E.length;

                                ) {
                                    var H = E.substring(0, E.indexOf('='));
                                    if (!f(B, H)) {
                                        z = 5005;
                                        break a;
                                    }
                                    E = E.substring(E.indexOf('=') + 1, E.length);
                                    var J = E.length,
                                        L = E.indexOf(',S_'),
                                        K = E.indexOf(',I_');
                                    0 < L && L < J && (J = L);
                                    0 < K && K < J && (J = K);
                                    L = E.substring(0, J);
                                    'S_O' == H || 'S_OU' == H || 'I_O' == H || 'I_OU' == H
                                        ? (z[H] || (z[H] = []), z[H].push(L))
                                        : (z[H] = L);
                                    E = E.substring(J + 1, E.length);
                                }
                            }
                            l[y] = z;
                        }
                        if (f(l, 5005) || '' == l[0]) (c = 5005), (q = null);
                        else {
                            for (var T in k) {
                                w = k[T];
                                w.certb64 = JSON.parse(localStorage.getItem(T)).certb64;
                                if (u) {
                                    D = l;
                                    z = G(w.certb64);
                                    y = z.subject;
                                    z = z.issuer;
                                    B = !1;
                                    for (E = 0; E < D.length; E++) {
                                        H = !0;
                                        for (var O in D[E])
                                            if ('S_SN' == O) D[E][O].toUpperCase() != y.SN && (H = !1);
                                            else if ('S_CN' == O) 0 > y.CN.indexOf(D[E][O]) && (H = !1);
                                            else if ('S_OU' == O)
                                                for (J = 0; J < D[E][O].length; J++) f(y.OU, D[E][O][J]) || (H = !1);
                                            else if ('S_O' == O)
                                                for (J = 0; J < D[E][O].length; J++) f(y.O, D[E][O][J]) || (H = !1);
                                            else if ('S_C' == O) D[E][O] != y.C && (H = !1);
                                            else if ('I_CN' == O) D[E][O] != z.CN && (H = !1);
                                            else if ('I_OU' == O)
                                                for (J = 0; J < D[E][O].length; J++) f(z.OU, D[E][O][J]) || (H = !1);
                                            else if ('I_O' == O)
                                                for (J = 0; J < D[E][O].length; J++) f(z.O, D[E][O][J]) || (H = !1);
                                            else 'I_C' == O && D[E][O] != z.C && (H = !1);
                                        if ((B = B || H)) break;
                                    }
                                    D = B;
                                } else {
                                    D = l;
                                    y = G(w.certb64).subject;
                                    z = !1;
                                    for (B = 0; B < D.length; B++)
                                        if (
                                            ((E = !1),
                                            D[B].S_C == y.C &&
                                                (null == y.O || (null != D[B].S_O && D[B].S_O.length == y.O.length)))
                                        ) {
                                            for (H = 0; null != y.O && H < y.O.length; H++)
                                                f(D[B].S_O, y.O[H]) || (E = !0);
                                            if (
                                                !E &&
                                                (null == y.OU || (null != D[B].S_OU && D[B].S_OU.length == y.OU.length))
                                            ) {
                                                for (H = 0; null != y.OU && H < y.OU.length; H++)
                                                    f(D[B].S_OU, y.OU[H]) || (E = !0);
                                                if (!E && D[B].S_CN == y.CN) {
                                                    z = !0;
                                                    break;
                                                }
                                            }
                                        }
                                    D = z;
                                }
                                '' != d
                                    ? w.notAfter < d && (D = !1)
                                    : t &&
                                      ((H = new Date()),
                                      (y = H.getFullYear()),
                                      (z = H.getMonth() + 1),
                                      H.getDate(),
                                      (B = H.getHours()),
                                      (E = H.getMinutes()),
                                      (J = H.getSeconds()),
                                      (y = '0000' + y),
                                      (y = y.substring(y.length - 4, y.length)),
                                      (z = '00' + z),
                                      (z = z.substring(z.length - 2, z.length)),
                                      (H = '00' + z),
                                      (H = H.substring(H.length - 2, H.length)),
                                      (B = '00' + B),
                                      (B = B.substring(B.length - 2, B.length)),
                                      (E = '00' + E),
                                      (E = E.substring(E.length - 2, E.length)),
                                      (J = '00' + J),
                                      (J = J.substring(J.length - 2, J.length)),
                                      w.notAfter < y + z + H + B + E + J && (D = !1));
                                D && null != localStorage.getItem(T) && '' != localStorage.getItem(T) && (n[T] = w);
                            }
                            for (var R in n)
                                if (null == q) (m = R), (q = n[R]);
                                else
                                    switch (v) {
                                        case 0:
                                            q.notBefore <= n[R].notBefore && ((m = R), (q = n[R]));
                                            break;
                                        case 16:
                                            q.notBefore <= n[R].notBefore && ((m = R), (q = n[R]));
                                            break;
                                        case 32:
                                            q.notBefore >= n[R].notBefore && ((m = R), (q = n[R]));
                                            break;
                                        case 64:
                                            q.notAfter <= n[R].notAfter && ((m = R), (q = n[R]));
                                            break;
                                        case 128:
                                            q.notAfter >= n[R].notAfter && ((m = R), (q = n[R]));
                                            break;
                                        default:
                                            q.notAfter <= n[R].notAfter && ((m = R), (q = n[R]));
                                    }
                            if (null == q) (c = 5010), (q = null);
                            else if (
                                ((q.b64P12Cert = JSON.parse(localStorage.getItem(m)).b64P12Cert),
                                (q.keySet = JSON.parse(localStorage.getItem(m)).keySet),
                                (q.certfinger = JSON.parse(localStorage.getItem(m)).certfinger),
                                (q.certb64 = JSON.parse(localStorage.getItem(m)).certb64),
                                !x)
                            ) {
                                sessionStorage.removeItem('twcaSelectedKey');
                                if (q.b64P12Cert) {
                                    v = C(q.b64P12Cert, h);
                                    if (!v) {
                                        c = 5071;
                                        q = null;
                                        break;
                                    }
                                    v = v.getBags({ bagType: p.pki.oids.pkcs8ShroudedKeyBag })[
                                        p.pki.oids.pkcs8ShroudedKeyBag
                                    ][0].key;
                                    if (!v) {
                                        c = 5071;
                                        q = null;
                                        break;
                                    }
                                } else if (q.keySet) {
                                    if (((v = b(q.keySet, h)), !v)) {
                                        c = 5071;
                                        q = null;
                                        break;
                                    }
                                } else {
                                    c = 5112;
                                    q = null;
                                    break;
                                }
                                sessionStorage.setItem('twcaSelectedKey', p.util.encode64(h));
                            }
                        }
                    } else (c = 5005), (rtnCodeInfo = null);
                } while (0);
                return null != q ? q : c;
            }
            function C(a, b) {
                var c = null;
                try {
                    c = p.pkcs12.pkcs12FromAsn1(p.asn1.fromDer(p.util.decode64(a)), b);
                } catch (D) {}
                return c;
            }
            function z(a) {
                var b = 'TWCA' + new Date().getTime().toString(),
                    c = g('TWCACertIdxRef');
                c[b] = {
                    cn: a.cn,
                    issuer: a.issuer,
                    subject: a.subject,
                    serial: a.serial,
                    notBefore: a.notBefore,
                    notAfter: a.notAfter,
                };
                localStorage.setItem('TWCACertIdxRef', JSON.stringify(c));
                localStorage.setItem(b, JSON.stringify(a));
                return b;
            }
            function a(a) {
                return a
                    ? '"sn":"' +
                          a.serial +
                          '","cn":"' +
                          a.cn +
                          '","ntb":"' +
                          a.notBefore +
                          '","nta":"' +
                          a.notAfter +
                          '","issdn":"' +
                          a.issuer +
                          '","subdn":"' +
                          a.subject +
                          '","certfinger":"' +
                          a.certfinger +
                          '","certb64":"' +
                          a.certb64 +
                          '"'
                    : '';
            }
            function g(a) {
                var b = null;
                a = localStorage.getItem(a);
                if (null == a) b = {};
                else if ('' == a) b = {};
                else
                    try {
                        b = JSON.parse(a);
                    } catch (x) {
                        b = {};
                    }
                return b;
            }
            function d(a) {
                for (var b = new Uint8Array(2 * a.length), c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    b[2 * c] = d & 255;
                    b[2 * c + 1] = (d >> 8) & 255;
                }
                a = '';
                for (c = 0; c < b.length; c++) (a = 16 > b[c] ? a + '%0' : a + '%'), (a += b[c].toString(16));
                return unescape(a);
            }
            function G(a) {
                ret = {};
                try {
                    var b = p.asn1.fromDer(p.util.decode64(a));
                    b = p.pki.certificateFromAsn1(b);
                } catch (D) {
                    return null;
                }
                ret.subject = {};
                for (a = 0; a < b.subject.attributes.length; a++) {
                    var c = b.subject.attributes[a];
                    'C' == c.shortName && (ret.subject.C = c.value);
                    'O' == c.shortName && (null == ret.subject.O && (ret.subject.O = []), ret.subject.O.push(c.value));
                    'OU' == c.shortName &&
                        (null == ret.subject.OU && (ret.subject.OU = []), ret.subject.OU.push(c.value));
                    'CN' == c.shortName && (ret.subject.CN = c.value);
                }
                ret.subject.SN = b.serialNumber.toUpperCase();
                ret.issuer = {};
                for (a = 0; a < b.issuer.attributes.length; a++)
                    (c = b.issuer.attributes[a]),
                        'C' == c.shortName && (ret.issuer.C = c.value),
                        'O' == c.shortName && (null == ret.issuer.O && (ret.issuer.O = []), ret.issuer.O.push(c.value)),
                        'OU' == c.shortName &&
                            (null == ret.issuer.OU && (ret.issuer.OU = []), ret.issuer.OU.push(c.value)),
                        'CN' == c.shortName && (ret.issuer.CN = c.value);
                return ret;
            }
            function h() {
                var a = {},
                    d = sessionStorage.getItem('twcaSelectedKey');
                if (e.selectedCertInfo.b64P12Cert) {
                    p12Cert = p.pkcs12.pkcs12FromAsn1(
                        p.asn1.fromDer(p.util.decode64(e.selectedCertInfo.b64P12Cert)),
                        p.util.decode64(d),
                    );
                    var f = p12Cert.getBags({ bagType: p.pki.oids.pkcs8ShroudedKeyBag })[
                        p.pki.oids.pkcs8ShroudedKeyBag
                    ][0].key;
                    d = p12Cert.getBags({ bagType: p.pki.oids.certBag })[p.pki.oids.certBag];
                    for (var g = 0; g < d.length; g++) {
                        var h = d[g].cert;
                        if (h.publicKey.n.data[0] == f.n.data[0] && h.publicKey.n.data[1] == f.n.data[1]) {
                            oCert = p12Cert.getBags({ bagType: p.pki.oids.certBag })[p.pki.oids.certBag][g].cert;
                            break;
                        }
                    }
                    oCert || (oCert = p12Cert.getBags({ bagType: p.pki.oids.certBag })[p.pki.oids.certBag][0].cert);
                } else
                    e.selectedCertInfo.keySet &&
                        ((oCert = p.asn1.fromDer(p.util.decode64(e.selectedCertInfo.certb64))),
                        (oCert = p.pki.certificateFromAsn1(oCert)),
                        (f = b(e.selectedCertInfo.keySet, p.util.decode64(d))));
                a.oPrivateKey = f;
                a.oCert = oCert;
                return a;
            }
            function f(a, b) {
                for (var c in a) if (a[c] == b) return !0;
                return !1;
            }
            function b(a, b, d) {
                var c = null;
                try {
                    if (3 > arguments.length) {
                        var e = p.md.sha256.create();
                        e.update(b);
                        var f = e.digest().getBytes(),
                            g = p.cipher.createDecipher('AES-CBC', f);
                        g.start({ iv: '' });
                        g.update(p.util.createBuffer(p.util.decode64(a)));
                        g.finish();
                        var h = g.output.data.split('||');
                        'TWCA' == h[8] &&
                            (c = p.pki.setRsaPrivateKey(
                                new p.jsbn.BigInteger(h[1], 16),
                                new p.jsbn.BigInteger(h[0], 16),
                                new p.jsbn.BigInteger(h[7], 16),
                                new p.jsbn.BigInteger(h[2], 16),
                                new p.jsbn.BigInteger(h[3], 16),
                                new p.jsbn.BigInteger(h[4], 16),
                                new p.jsbn.BigInteger(h[5], 16),
                                new p.jsbn.BigInteger(h[6], 16),
                            ));
                    } else
                        c = p.pki.setRsaPrivateKey(
                            new p.jsbn.BigInteger(d.n, 16),
                            new p.jsbn.BigInteger(d.e, 16),
                            new p.jsbn.BigInteger(d.d, 16),
                            new p.jsbn.BigInteger(d.p, 16),
                            new p.jsbn.BigInteger(d.q, 16),
                            new p.jsbn.BigInteger(d.dP, 16),
                            new p.jsbn.BigInteger(d.dQ, 16),
                            new p.jsbn.BigInteger(d.qInv, 16),
                        );
                } catch (F) {
                    c = null;
                }
                return c;
            }
            var e = this;
            twcaLib = e;
            var w = null,
                k = null,
                u = null,
                v = !1;
            -1 < navigator.userAgent.indexOf('TWID') && (v = !0);
            this.SelectSignerEx = function (b, d, f, g, h, l, k, n, p) {
                if (E() && 0 == (l & 15728640))
                    (w = [b, d, f, g, h, l, k, n, p]),
                        window.opener.twcaLib.SelectSignerEx(
                            b,
                            d,
                            f,
                            g,
                            h,
                            l,
                            k,
                            n,
                            'oTwcaLib._childWindow.twcaLib.SelectSignerExFromChildWindowHandler',
                        );
                else {
                    if (v)
                        try {
                            'undefined' == typeof p && (p = 'ret_SelectSignerEx');
                            var c = MobileUtils.registerFunction(p),
                                q = navigator.userAgent;
                            return MobileUtils.supportTwidAndroid()
                                ? (MobileUtils.androidInterface.SelectSignerEx(
                                      b,
                                      d,
                                      f,
                                      g,
                                      h,
                                      MobileUtils.toNumber(l),
                                      k,
                                      n,
                                      c,
                                  ),
                                  0)
                                : 0 < q.indexOf('iPhone') || 0 < q.indexOf('iPad')
                                ? ((document.location =
                                      'PKI::SelectSignerEx::' +
                                      encodeURI(
                                          b +
                                              separation +
                                              d +
                                              separation +
                                              f +
                                              separation +
                                              g +
                                              separation +
                                              h +
                                              separation +
                                              l +
                                              separation +
                                              k +
                                              separation +
                                              n +
                                              separation +
                                              c,
                                      )),
                                  0)
                                : 1;
                        } catch (Q) {
                            return alert(Q), -1;
                        }
                    if (4 >= arguments.length) return y(b, h, l, g);
                    c = 0;
                    q = '\u6210\u529f';
                    var r = '',
                        x = y(b, h, l, g);
                    if ('number' == typeof x)
                        switch (x) {
                            case 5005:
                                c = 5005;
                                q = '\u53c3\u6578\u932f\u8aa4';
                                break;
                            case 5010:
                                c = 5010;
                                q = '\u7121\u6191\u8b49';
                                break;
                            case 5071:
                                if (
                                    null == g &&
                                    0 > 'oTwcaLib._childWindow.twcaLib.SelectSignerExFromChildWindowHandler'.indexOf(p)
                                ) {
                                    twcaCryptoLibAlertDialog.show(
                                        '\u8f38\u5165\u5bc6\u78bc',
                                        '\u8acb\u8f38\u5165\u6191\u8b49\u5bc6\u78bc',
                                        '',
                                        '\u53d6\u6d88',
                                        '\u78ba\u8a8d',
                                        ['SelectSignerEx', b, d, f, g, h, l, k, n, p, twcaLib],
                                    );
                                    return;
                                }
                                c = 5071;
                                q = '\u6191\u8b49\u5bc6\u78bc\u932f\u8aa4';
                                break;
                            case 5112:
                                c = 5112;
                                q = '\u8b80\u53d6\u6191\u8b49\u5931\u6557';
                                break;
                            default:
                                (c = 5001), (q = '\u4e00\u822c\u932f\u8aa4');
                        }
                    else
                        0 == (l & 61440) &&
                            ((e.selectedCertInfo = x), sessionStorage.setItem('selectedCertInfo', JSON.stringify(x))),
                            (r = '{' + a(x) + '}');
                    e.callback(p, c, q, r);
                }
            };
            this.SignPkcs7 = function (b, d, f, g) {
                if (E())
                    (w = [b, d, f]),
                        window.opener.twcaLib.SignPkcs7(
                            b,
                            d,
                            'oTwcaLib._childWindow.twcaLib.SignPkcs7FromChildWindowHandler',
                        );
                else {
                    if (v)
                        try {
                            'undefined' == typeof f && (f = 'ret_SignPkcs7');
                            var c = !1,
                                h = b;
                            if ('[object Array]' === Object.prototype.toString.call(b)) {
                                c = !0;
                                for (index = 0; index < b.length; ++index) {
                                    var k = p.util.binary.raw.encode(p.util.text.utf8.encode(b[index])),
                                        n = p.util.binary.base64.encode(p.util.binary.raw.decode(k));
                                    b[index] = n;
                                }
                                h = b.join('#');
                            }
                            var q = MobileUtils.registerFunction(f),
                                m = navigator.userAgent;
                            return MobileUtils.supportTwidAndroid()
                                ? (c
                                      ? MobileUtils.androidInterface.SignPkcs7Batch(b, MobileUtils.toNumber(d), q)
                                      : MobileUtils.androidInterface.SignPkcs7(b, MobileUtils.toNumber(d), q),
                                  0)
                                : 0 < m.indexOf('iPhone') || 0 < m.indexOf('iPad')
                                ? ((document.location = c
                                      ? 'PKI::SignPkcs7Batch::' + encodeURI(h + separation + d + separation + q)
                                      : 'PKI::SignPkcs7::' + encodeURI(h + separation + d + separation + q)),
                                  0)
                                : 1;
                        } catch (N) {
                            return alert(N), -1;
                        }
                    if (4 <= arguments.length) return t(b, d, f, g);
                    c = 0;
                    h = '\u6210\u529f';
                    k = '';
                    if (null == b || 0 >= b.length) (c = 5005), (h = '\u53c3\u6578\u932f\u8aa4');
                    else {
                        if ((n = sessionStorage.getItem('selectedCertInfo'))) e.selectedCertInfo = JSON.parse(n);
                        n = sessionStorage.getItem('twcaSelectedKey');
                        e.selectedCertInfo && null != n
                            ? ((n = t(b, null, null, d)),
                              null == n || '' == n
                                  ? ((c = 5061), (h = '\u7c3d\u7ae0\u5931\u6557'))
                                  : (k = '{' + a(e.selectedCertInfo) + ',"signature":"' + n + '"}'))
                            : ((c = 5067),
                              (h =
                                  '\u57f7\u884c\u7c3d\u7ae0\u6642\uff0c\u5c1a\u672a\u9078\u64c7\u7c3d\u7ae0\u6191\u8b49'));
                    }
                    e.callback(f, c, h, k);
                }
            };
            this.SignPkcs1 = function (b, d, f, g) {
                if (E())
                    (w = [b, d, f]),
                        window.opener.twcaLib.SignPkcs1(
                            b,
                            d,
                            'oTwcaLib._childWindow.twcaLib.SignPkcs1FromChildWindowHandler',
                        );
                else {
                    if (v)
                        try {
                            'undefined' == typeof f && (f = 'ret_SignPkcs1');
                            var c = !1,
                                h = b;
                            if ('[object Array]' === Object.prototype.toString.call(b)) {
                                c = !0;
                                for (index = 0; index < b.length; ++index) {
                                    var k = p.util.binary.raw.encode(p.util.text.utf8.encode(b[index])),
                                        n = p.util.binary.base64.encode(p.util.binary.raw.decode(k));
                                    b[index] = n;
                                }
                                h = b.join('#');
                            }
                            var q = MobileUtils.registerFunction(f),
                                m = navigator.userAgent;
                            return MobileUtils.supportTwidAndroid()
                                ? (c
                                      ? MobileUtils.androidInterface.SignPkcs1Batch(h, MobileUtils.toNumber(d), q)
                                      : MobileUtils.androidInterface.SignPkcs1(h, MobileUtils.toNumber(d), q),
                                  0)
                                : 0 < m.indexOf('iPhone') || 0 < m.indexOf('iPad')
                                ? ((document.location = c
                                      ? 'PKI::SignPkcs1Batch::' + encodeURI(h + separation + d + separation + q)
                                      : 'PKI::SignPkcs1::' + encodeURI(h + separation + d + separation + q)),
                                  0)
                                : 1;
                        } catch (N) {
                            return alert(N), -1;
                        }
                    if (4 <= arguments.length) return K(b, d, f, g);
                    c = 0;
                    h = '\u6210\u529f';
                    k = '';
                    if (null == b || 0 >= b.length) (c = 5005), (h = '\u53c3\u6578\u932f\u8aa4');
                    else {
                        if ((n = sessionStorage.getItem('selectedCertInfo'))) e.selectedCertInfo = JSON.parse(n);
                        n = sessionStorage.getItem('twcaSelectedKey');
                        e.selectedCertInfo && null != n
                            ? ((n = K(b, null, null, d)),
                              null == n || '' == n
                                  ? ((c = 5061), (h = '\u7c3d\u7ae0\u5931\u6557'))
                                  : (k = '{"signature":"' + n + '",' + a(e.selectedCertInfo) + '}'))
                            : ((c = 5067),
                              (h =
                                  '\u57f7\u884c\u7c3d\u7ae0\u6642\uff0c\u5c1a\u672a\u9078\u64c7\u7c3d\u7ae0\u6191\u8b49'));
                    }
                    e.callback(f, c, h, k);
                }
            };
            this.SignPkcs1FromHash = function (b, d, f) {
                if (E())
                    (w = [b, d]),
                        window.opener.twcaLib.SignPkcs1FromHash(
                            b,
                            'oTwcaLib._childWindow.twcaLib.SignPkcs1FromChildWindowHandler',
                        );
                else {
                    if (v)
                        try {
                            'undefined' == typeof d && (d = 'ret_SignPkcs1FromHash');
                            var c = !1,
                                g = b;
                            if ('[object Array]' === Object.prototype.toString.call(b)) {
                                c = !0;
                                for (index = 0; index < b.length; ++index) {
                                    var h = p.util.binary.raw.encode(p.util.text.utf8.encode(b[index])),
                                        k = p.util.binary.base64.encode(p.util.binary.raw.decode(h));
                                    b[index] = k;
                                }
                                g = b.join('#');
                            }
                            var n = MobileUtils.registerFunction(d),
                                q = navigator.userAgent;
                            return MobileUtils.supportTwidAndroid()
                                ? (c
                                      ? MobileUtils.androidInterface.SignPkcs1FromHashBatch(g, n)
                                      : MobileUtils.androidInterface.SignPkcs1FromHash(g, n),
                                  0)
                                : 0 < q.indexOf('iPhone') || 0 < q.indexOf('iPad')
                                ? ((document.location = c
                                      ? 'PKI::SignPkcs1FromHashBatch::' + encodeURI(g + separation + n)
                                      : 'PKI::SignPkcs1FromHash::' + encodeURI(g + separation + n)),
                                  0)
                                : 1;
                        } catch (m) {
                            return alert(m), -1;
                        }
                    if (3 <= arguments.length) return B(b, d, dwFlags2);
                    c = 0;
                    g = '\u6210\u529f';
                    h = '';
                    if (null == b || 0 >= b.length) (c = 5005), (g = '\u53c3\u6578\u932f\u8aa4');
                    else {
                        if ((k = sessionStorage.getItem('selectedCertInfo'))) e.selectedCertInfo = JSON.parse(k);
                        k = sessionStorage.getItem('twcaSelectedKey');
                        e.selectedCertInfo && null != k
                            ? ((k = B(b, null, null)),
                              null == k || '' == k
                                  ? ((c = 5061), (g = '\u7c3d\u7ae0\u5931\u6557'))
                                  : (h = Array.isArray(k)
                                        ? '{"signature":' + JSON.stringify(k) + ',' + a(e.selectedCertInfo) + '}'
                                        : '{"signature":"' + k + '",' + a(e.selectedCertInfo) + '}'))
                            : ((c = 5067),
                              (g =
                                  '\u57f7\u884c\u7c3d\u7ae0\u6642\uff0c\u5c1a\u672a\u9078\u64c7\u7c3d\u7ae0\u6191\u8b49'));
                    }
                    e.callback(d, c, g, h);
                }
            };
            this.ResetKey = function (a) {
                if (E())
                    (w = [a]),
                        window.opener.twcaLib.ResetKey('oTwcaLib._childWindow.twcaLib.ResetKeyFromChildWindowHandler');
                else {
                    if (v)
                        try {
                            'undefined' == typeof a && (a = 'ret_ResetKey');
                            var b = MobileUtils.registerFunction(a),
                                c = navigator.userAgent;
                            return MobileUtils.supportTwidAndroid()
                                ? (MobileUtils.androidInterface.ResetKey(b), 0)
                                : 0 < c.indexOf('iPhone') || 0 < c.indexOf('iPad')
                                ? ((document.location = 'PKI::ResetKey::' + encodeURI(b)), 0)
                                : 1;
                        } catch (D) {
                            return alert(D), -1;
                        }
                    e.selectedCertInfo = null;
                    sessionStorage.removeItem('selectedCertInfo');
                    sessionStorage.removeItem('twcaSelectedKey');
                    if (0 >= arguments.length) return 0;
                    e.callback(a, 0, '\u6210\u529f', '');
                }
            };
            this.GetVersion = function (a) {
                if (E())
                    (w = [a]),
                        window.opener.twcaLib.GetVersion(
                            'oTwcaLib._childWindow.twcaLib.GetVersionFromChildWindowHandler',
                        );
                else {
                    if (v)
                        try {
                            'undefined' == typeof a && (a = 'ret_GetVersion');
                            var b = MobileUtils.registerFunction(a),
                                c = navigator.userAgent;
                            return MobileUtils.supportTwidAndroid()
                                ? (MobileUtils.androidInterface.GetVersion(b), 0)
                                : 0 < c.indexOf('iPhone') || 0 < c.indexOf('iPad')
                                ? ((document.location = 'PKI::GetVersion::' + encodeURI(b)), 0)
                                : 1;
                        } catch (D) {
                            return alert(D), -1;
                        }
                    if (0 >= arguments.length) return '1.4.0.0';
                    e.callback(a, 0, '\u6210\u529f', '{"version":"1.4.0.0"}');
                }
            };
            this.Hash = function (a, b, f) {
                try {
                    'undefined' == typeof f && (f = 'ret_Hash');
                    var c = MobileUtils.registerFunction(f),
                        g = navigator.userAgent;
                    if (MobileUtils.supportTwidAndroid())
                        return MobileUtils.androidInterface.Hash(a, MobileUtils.toNumber(b), c), 0;
                    if (0 < g.indexOf('iPhone') || 0 < g.indexOf('iPad'))
                        return (document.location = 'PKI::Hash::' + encodeURI(a + separation + b + separation + c)), 0;
                    c = null;
                    g = '';
                    var h = performance.now();
                    switch (61440 & b) {
                        case 0:
                            var k = p.md.sha1;
                            break;
                        case 4096:
                            k = p.md.md5;
                            break;
                        case 8192:
                            k = p.md.sha256;
                            break;
                        case 16384:
                            k = p.md.sha512;
                            break;
                        default:
                            k = p.md.sha1;
                    }
                    var n = k.create();
                    switch (15 & b) {
                        case 0:
                            n.update(d(a));
                            break;
                        case 1:
                            n.update(a, 'utf8');
                            break;
                        case 2:
                            'undefined' == typeof Big5Encoding
                                ? n.update(a, 'utf8')
                                : n.update(Big5Encoding.getBig5Encoding(a));
                            break;
                        default:
                            n.update(d(a));
                    }
                    c = n.digest().toHex();
                    var q = performance.now();
                    g =
                        '{"hashValue":"' +
                        c +
                        '","time":"' +
                        (q - h) +
                        '","length":"' +
                        a.length +
                        '","length":"' +
                        a.length +
                        '"}';
                    if (3 <= arguments.length) e.callback(f, 0, '\u6210\u529f', g);
                    else return g;
                } catch (m) {
                    return alert(m), -1;
                }
            };
            this.Hmac = function (a, b, d, f) {
                var c = 0,
                    g = '\u6210\u529f',
                    h = '';
                switch (d) {
                    case 1:
                        d = 'md5';
                        break;
                    case 3:
                        d = 'sha256';
                        break;
                    default:
                        d = 'sha1';
                }
                a = p.util.binary.raw.encode(p.util.binary.hex.decode(a));
                var k = p.hmac.create();
                k.start(d, a);
                k.update(p.util.binary.raw.encode(p.util.text.utf16.encode(b)));
                (b = p.util.binary.base64.encode(p.util.binary.raw.decode(k.getMac().getBytes())))
                    ? (h = '{"hmacValue":"' + b + '"}')
                    : ((c = 5001), (g = '\u932f\u8aa4'));
                'string' === typeof f ? e.callback(f, c, g, h) : f(c, g, '', h);
                return 0;
            };
            this.CreatePKCS7FromSignedData = function (a, b, f, g, h) {
                var c = 0,
                    q = '\u6210\u529f',
                    n = '',
                    x = performance.now();
                a: {
                    var m = null;
                    if (a && b && f) {
                        switch (61440 & g) {
                            case 0:
                                var t = p.pki.oids.sha1;
                                break;
                            case 4096:
                                t = p.pki.oids.md5;
                                break;
                            case 8192:
                                t = p.pki.oids.sha256;
                                break;
                            case 16384:
                                t = p.pki.oids.sha512;
                                break;
                            default:
                                t = p.pki.oids.sha1;
                        }
                        switch (15 & g) {
                            case 0:
                                var v = p.util.createBuffer(d(a), 'raw');
                                break;
                            case 1:
                                v = p.util.createBuffer(a, 'utf8');
                                break;
                            case 2:
                                v =
                                    'undefined' == typeof Big5Encoding
                                        ? p.util.createBuffer(a, 'utf8')
                                        : p.util.createBuffer(Big5Encoding.getBig5Encoding(a), 'raw');
                                break;
                            default:
                                v = p.util.createBuffer(d(a), 'raw');
                        }
                        try {
                            (m = p.asn1.fromDer(p.util.decode64(b))), (m = p.pki.certificateFromAsn1(m));
                        } catch (P) {
                            p7Value = { errCode: 2, errMsg: '\u6191\u8b49\u89e3\u6790\u932f\u8aa4' };
                            break a;
                        }
                        if (b != u) {
                            var w = p.pkcs7.createSignedData();
                            w.content = v;
                            w.addCertificate(m);
                            w.addSigner({
                                key:
                                    '-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQBbE4weWXGL8ehZU2UsCeRRBcU6S09/ph5IW4QtZKic1GDnanM1Ur/ohPHQsFLg6xBFiIBGPz/96eGAlg/NjcU/D3S4OmEF9PLxOT+Vg3I+dRZjmXFRrlfkmZ4ATNbZI4gzTrPUN9CV1soNlWQ/ClAniF+mqHLYFBXUhk8BCyV8j1SNp4sdiO4fHHCRZp44ppqRyG4op5/c9DUjeAsi4qgQyvxpO5lxzBZ73IkQ2aP/DKMF8rjKxKWM3JjInadcru/aAUO5TimDUrSMCaGYo5fzjqTCGD4iuz3J3tFoh20Z7H7s/kj4YK2l+YXbemCp0F13o70Hyb21Z87YqCzber5RAgMBAAECggEAMKI7jGlOzOAcprZ1rBKMLQfbzckxZoSaXyEfb+30a+qs5GZfpvXNLKjxR/MgDqL3SWoetWRJE5m0pSl8vtMZpRbnyQjDjp7CrDVZ0skiVF/J2N2zOV7T6GpviNF/WOw0atF4DbbQV3Me6ioAIfmr27BjA2eoC+KN1bLytSfymJR8G0CktovhhkD3wUZVuTcUGbg0yyif74y9dwmnHOQbOMdSWIHuIpTzQSGelRoQCmbLmhE2hAbIlT5mz6vFZCSmgTFSPk87sonHaFrBeesu5ut8LG686s97n78oPz27U/ek7lV/Cj/UJeljuRM5tDoCJJKkTB+0xsNrfNayWEQcwQKBgQCyGWMsRw1tprYqXp7nLS/nja6qf3bIs/IwtO1wsxmmtxXcXnb+/D285mUDsEelPB0AXJcOe1SP0fDFB1HMAFlJ5hWATbUveSEk5U2L+LjeREhCDlH0MJBDBc+vixo8MoHXq3sjpe3/HP76V+fvUOSx7vtasGG1I4fGUDMxLhbLzQKBgQCC6c0L4+idGcg5P7KvHlSwYHHKbLpuDiRNnSjqgQZ7EUxohYOCOk9tLFPaxMhhzgjI5hFPY48+Kv8NCCzzNWc25VI82qFcG6a8Mw1bUXb2/8/FKhUqTdaLlOZuVZW6LobxEM4Z4hEUnLfgrFbvlMKopbynwZ82UK5rm25Y0i6glQKBgQCobAm1HZw9TaKHfuOWisz6lKnQ4qlaM5GdLfw8z6I6Xnl15H9zsuZPdTGhw1p9j9N9PBI9x7O4LjkamkloOgw2Lje3FcV6F3qYgaBL9fIdf0U18oTd/+7s8tnskAdHVhwj8C6LD6d50dnutKLJVh5vhih9Ir/DpM4JZF6E66jzIQKBgGQy8RcltJfx8NcokuoIDAgHeXDW8YZk2pJxNKzwXnZ5kgL6FeLqIHrOD8yFC14YpY6m0R7zc+LAZACkfksUV9CjiuM674AhRegMJy/61VRODce54wNDGnAxYoGWjgg3rl76XtVeu3YMUYzsO4oaUTdly1SXFPYsoKOKDtZ64OdVAoGBAK14Yk03Hr8fR3F0uqmt8uu9GN7tNfzvifRPYQ+/sfMUDG1C2+gh/roSKnHX8p1Wwtf26cv5Klq5ySxUT3NxJErf1I7voDiLVM4pmq8DKiebsl/8QbJv3e3DMbGqiRAmfRNJqb7UcQsDEWORFt7U9XcCncCzIBuO2ETzDQshlcNE-----END RSA PRIVATE KEY-----',
                                certificate: m,
                                digestAlgorithm: t,
                            });
                            w.sign();
                            k = w;
                            u = b;
                        } else if (
                            ((w = k),
                            (w.content = v),
                            (w.contentInfo = null),
                            (w.contentInfo = p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.SEQUENCE, !0, [
                                p.asn1.create(
                                    p.asn1.Class.UNIVERSAL,
                                    p.asn1.Type.OID,
                                    !1,
                                    p.asn1.oidToDer(p.pki.oids.data).getBytes(),
                                ),
                            ])),
                            'content' in w)
                        ) {
                            var A;
                            w.content instanceof p.util.ByteBuffer
                                ? (A = w.content.bytes())
                                : 'string' === typeof w.content && (A = p.util.encodeUtf8(w.content));
                            w.contentInfo.value.push(
                                p.asn1.create(p.asn1.Class.CONTEXT_SPECIFIC, 0, !0, [
                                    p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.OCTETSTRING, !1, A),
                                ]),
                            );
                        }
                        w.signers[0].signature = p.util.decode64(f);
                        m = p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.SEQUENCE, !0, [
                            p.asn1.create(
                                p.asn1.Class.UNIVERSAL,
                                p.asn1.Type.INTEGER,
                                !1,
                                p.asn1.integerToDer(w.signers[0].version).getBytes(),
                            ),
                            p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.SEQUENCE, !0, [
                                p.pki.distinguishedNameToAsn1({ attributes: w.signers[0].issuer }),
                                p.asn1.create(
                                    p.asn1.Class.UNIVERSAL,
                                    p.asn1.Type.INTEGER,
                                    !1,
                                    p.util.hexToBytes(w.signers[0].serialNumber),
                                ),
                            ]),
                            p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.SEQUENCE, !0, [
                                p.asn1.create(
                                    p.asn1.Class.UNIVERSAL,
                                    p.asn1.Type.OID,
                                    !1,
                                    p.asn1.oidToDer(w.signers[0].digestAlgorithm).getBytes(),
                                ),
                                p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.NULL, !1, ''),
                            ]),
                        ]);
                        w.signers[0].authenticatedAttributesAsn1 &&
                            m.value.push(w.signers[0].authenticatedAttributesAsn1);
                        m.value.push(
                            p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.SEQUENCE, !0, [
                                p.asn1.create(
                                    p.asn1.Class.UNIVERSAL,
                                    p.asn1.Type.OID,
                                    !1,
                                    p.asn1.oidToDer(w.signers[0].signatureAlgorithm).getBytes(),
                                ),
                                p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.NULL, !1, ''),
                            ]),
                        );
                        m.value.push(
                            p.asn1.create(p.asn1.Class.UNIVERSAL, p.asn1.Type.OCTETSTRING, !1, w.signers[0].signature),
                        );
                        if (0 < w.signers[0].unauthenticatedAttributes.length) {
                            t = p.asn1.create(p.asn1.Class.CONTEXT_SPECIFIC, 1, !0, []);
                            for (v = 0; v < w.signers[0].unauthenticatedAttributes.length; ++v)
                                t.values.push(_attributeToAsn1(w.signers[0].unauthenticatedAttributes[v]));
                            m.value.push(t);
                        }
                        w.signerInfos[0] = m;
                        signValue = p.pkcs7.messageToPem(w);
                        signValue = signValue.replace(/\-----BEGIN PKCS7-----/g, '');
                        signValue = signValue.replace(/\-----END PKCS7-----/g, '');
                        p7Value = signValue = signValue.replace(/(?:\\[rn]|[\r\n]+)+/g, '');
                    } else p7Value = { errCode: 2, errMsg: '\u53c3\u6578\u932f\u8aa4' };
                }
                w = performance.now();
                'string' != typeof p7Value
                    ? ((c = p7Value.errCode), (q = p7Value.errMsg))
                    : (n =
                          '{"p7Value":"' +
                          p7Value +
                          '","time":"' +
                          (w - x) +
                          '","length":"' +
                          a.length +
                          '","length":"' +
                          a.length +
                          '"}');
                if (5 <= arguments.length) e.callback(h, c, q, n);
                else return n;
            };
            this.EncrytAESCBC = function (a, b, d) {
                var c = 0,
                    f = '\u6210\u529f';
                var g = '';
                do {
                    var h = /[^A-Fa-f0-9]/;
                    if (64 != b.length || 0 >= a.length || h.test(a) || h.test(b))
                        (c = 5005), (f = '\u53c3\u6578\u932f\u8aa4');
                    else {
                        try {
                            var k = p.util.binary.raw.encode(p.util.binary.hex.decode(a));
                            var q = p.util.binary.raw.encode(p.util.binary.hex.decode(b));
                        } catch (m) {
                            c = 5005;
                            f = '\u53c3\u6578\u932f\u8aa4';
                            break;
                        }
                        g = _encryptAESCBC(k, q);
                        g = '{"encryptedHexString":"' + g + '","key":"' + b + '","plain":"' + a + '"}';
                    }
                } while (0);
                if (3 <= arguments.length) e.callback(d, c, f, g);
                else return '' == g ? c : g;
            };
            this.DecrytAESCBC = function (a, b, d) {
                var c = 0,
                    f = '\u6210\u529f',
                    g = '';
                do {
                    var h = /[^A-Fa-f0-9]/;
                    if (64 != b.length || 0 >= a.length || h.test(a) || h.test(b))
                        (c = 5005), (f = '\u53c3\u6578\u932f\u8aa4');
                    else {
                        try {
                            var k = p.util.binary.raw.encode(p.util.binary.hex.decode(a));
                            var q = p.util.binary.raw.encode(p.util.binary.hex.decode(b));
                        } catch (m) {
                            c = 5005;
                            f = '\u53c3\u6578\u932f\u8aa4';
                            break;
                        }
                        h = _decryptAESCBC(k, q);
                        null == h
                            ? ((c = 5080), (f = '\u52a0\u89e3\u5bc6\u5931\u6557'))
                            : (g = '{"plainString":"' + h + '","key":"' + b + '","encrypted":"' + a + '"}');
                    }
                } while (0);
                if (3 <= arguments.length) e.callback(d, c, f, g);
                else return 0 == c ? g : c;
            };
            v
                ? ((this.CheckCert = function (a, b, d) {
                      try {
                          'undefined' == typeof d && (d = 'ret_CheckCert');
                          var c = MobileUtils.registerFunction(d),
                              e = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.CheckCert(a, b, c), 0)
                              : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::CheckCert::' + encodeURI(a + separation + b + separation + c)),
                                0)
                              : 1;
                      } catch (l) {
                          return alert(l), -1;
                      }
                  }),
                  (this.MakeCSR = function (a, b, d, e, f, g) {
                      try {
                          'undefined' == typeof g && (g = 'ret_MakeCSR');
                          var c = MobileUtils.registerFunction(g),
                              h = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.MakeCSR(
                                    MobileUtils.toNumber(a),
                                    b,
                                    d,
                                    e,
                                    MobileUtils.toNumber(f),
                                    c,
                                ),
                                0)
                              : 0 < h.indexOf('iPhone') || 0 < h.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::MakeCSR::' +
                                    encodeURI(
                                        a +
                                            separation +
                                            b +
                                            separation +
                                            d +
                                            separation +
                                            e +
                                            separation +
                                            f +
                                            separation +
                                            c,
                                    )),
                                0)
                              : 1;
                      } catch (F) {
                          return alert(F), -1;
                      }
                  }),
                  (this.MakeCSREx = function (a, b, d, e, f, g, h) {
                      try {
                          'undefined' == typeof h && (h = 'ret_MakeCSREx');
                          var c = MobileUtils.registerFunction(h),
                              k = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.MakeCSREx(
                                    MobileUtils.toNumber(a),
                                    b,
                                    d,
                                    e,
                                    MobileUtils.toNumber(f),
                                    JSON.stringify(g),
                                    c,
                                ),
                                0)
                              : 0 < k.indexOf('iPhone') || 0 < k.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::MakeCSREx::' +
                                    encodeURI(
                                        a +
                                            separation +
                                            b +
                                            separation +
                                            d +
                                            separation +
                                            e +
                                            separation +
                                            f +
                                            separation +
                                            JSON.stringify(g) +
                                            separation +
                                            c,
                                    )),
                                0)
                              : 1;
                      } catch (m) {
                          return alert(m), -1;
                      }
                  }),
                  (this.ImportCert = function (a, b, d, e, f) {
                      try {
                          'undefined' == typeof f && (f = 'ret_ImportCert');
                          var c = MobileUtils.registerFunction(f),
                              g = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.ImportCert(a, b, d, e, c), 0)
                              : 0 < g.indexOf('iPhone') || 0 < g.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::ImportCert::' +
                                    encodeURI(a + separation + b + separation + d + separation + e + separation + c)),
                                0)
                              : 1;
                      } catch (n) {
                          return alert(n), -1;
                      }
                  }),
                  (this.ChangePIN = function (a, b, d, e, f, g) {
                      try {
                          'undefined' == typeof g && (g = 'ret_ChangePIN');
                          var c = MobileUtils.registerFunction(g),
                              h = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.ChangePIN(a, b, d, e, f, c), 0)
                              : 0 < h.indexOf('iPhone') || 0 < h.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::ChangePIN::' +
                                    encodeURI(
                                        a +
                                            separation +
                                            b +
                                            separation +
                                            d +
                                            separation +
                                            e +
                                            separation +
                                            f +
                                            separation +
                                            c,
                                    )),
                                0)
                              : 1;
                      } catch (F) {
                          return alert(F), -1;
                      }
                  }),
                  (this.DeleteCert = function (a, b, d) {
                      try {
                          'undefined' == typeof d && (d = 'ret_DeleteCert');
                          var c = MobileUtils.registerFunction(d),
                              e = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.DeleteCert(a, b, c), 0)
                              : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::DeleteCert::' + encodeURI(a + separation + b + separation + c)),
                                0)
                              : 1;
                      } catch (l) {
                          return alert(l), -1;
                      }
                  }),
                  (this.QueryDeviceID = function (a, b, d) {
                      try {
                          'undefined' == typeof d && (d = 'ret_QueryDeviceID');
                          var c = MobileUtils.registerFunction(d),
                              e = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.QueryDeviceID(a, b, c), 0)
                              : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::QueryDeviceID::' + encodeURI(a + separation + b + separation + c)),
                                0)
                              : 1;
                      } catch (l) {
                          return alert(l), -1;
                      }
                  }),
                  (this.DeleteBrowserCert = function (a, b, d) {
                      try {
                          var c = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.DeleteBrowserCert(a, b, d), 0)
                              : 0 < c.indexOf('iPhone') || 0 < c.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::DeleteBrowserCert::' + encodeURI(a + separation + b + separation + d)),
                                0)
                              : 1;
                      } catch (A) {
                          return alert(A), -1;
                      }
                  }),
                  (this.CertEncryptPkcs7 = function (a, b, d, e) {
                      try {
                          var c = MobileUtils.registerFunction(e),
                              f = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.CertEncryptPkcs7(a, b, MobileUtils.toNumber(d), c), 0)
                              : 0 < f.indexOf('iPhone') || 0 < f.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::CertEncryptPkcs7::' +
                                    encodeURI(a + separation + b + separation + d + separation + c)),
                                0)
                              : 1;
                      } catch (r) {
                          return alert(r), -1;
                      }
                  }),
                  (this.SymEncrypt = function (a, b, d, e, f) {
                      try {
                          'undefined' == typeof f && (f = 'ret_SymEncrypt');
                          var c = MobileUtils.registerFunction(f),
                              g = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.SymEncrypt(a, b, d, MobileUtils.toNumber(e), c), 0)
                              : 0 < g.indexOf('iPhone') || 0 < g.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::SymEncrypt::' +
                                    encodeURI(a + separation + b + separation + d + separation + e + separation + c)),
                                0)
                              : 1;
                      } catch (n) {
                          return alert(n), -1;
                      }
                  }),
                  (this.SymDecrypt = function (a, b, d, e, f) {
                      try {
                          'undefined' == typeof f && (f = 'ret_SymDecrypt');
                          var c = MobileUtils.registerFunction(f),
                              g = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.SymDecrypt(a, b, d, MobileUtils.toNumber(e), c), 0)
                              : 0 < g.indexOf('iPhone') || 0 < g.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::SymDecrypt::' +
                                    encodeURI(a + separation + b + separation + d + separation + e + separation + c)),
                                0)
                              : 1;
                      } catch (n) {
                          return alert(n), -1;
                      }
                  }),
                  (this.ChangeWeb = function (a, b, d) {
                      try {
                          'undefined' == typeof d && (d = 'ret_ChangeWeb');
                          var c = MobileUtils.registerFunction(d),
                              e = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.ChangeWeb(MobileUtils.toNumber(a), b, c), 0)
                              : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::ChangeWeb::' + encodeURI(a + separation + b + separation + c)),
                                0)
                              : 1;
                      } catch (l) {
                          return alert(l), -1;
                      }
                  }),
                  (this.SetErrorCode = function (a, b, d) {
                      try {
                          'undefined' == typeof d && (d = 'ret_SetErrorCode');
                          var c = MobileUtils.registerFunction(d),
                              e = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.SetErrorCode(MobileUtils.toNumber(a), b, c), 0)
                              : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::SetErrorCode::' + encodeURI(a + separation + b + separation + c)),
                                0)
                              : 1;
                      } catch (l) {
                          return alert(l), -1;
                      }
                  }),
                  (this.ExitWebview = function () {
                      try {
                          var a = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.ExitWebview(), 0)
                              : 0 < a.indexOf('iPhone') || 0 < a.indexOf('iPad')
                              ? ((document.location = 'PKI::ExitWebview::'), 0)
                              : 1;
                      } catch (q) {
                          return alert(q), -1;
                      }
                  }),
                  (this.ExitWebview2 = function (a) {
                      try {
                          var b = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.ExitWebview2(a), 0)
                              : 0 < b.indexOf('iPhone') || 0 < b.indexOf('iPad')
                              ? ((document.location = 'PKI::ExitWebview2::' + encodeURI(a)), 0)
                              : 1;
                      } catch (x) {
                          return alert(x), -1;
                      }
                  }),
                  (this.CheckCert = function (a, b, d) {
                      try {
                          'undefined' == typeof d && (d = 'ret_CheckCert');
                          var c = MobileUtils.registerFunction(d),
                              e = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.CheckCert(a, b, c), 0)
                              : 0 < e.indexOf('iPhone') || 0 < e.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::CheckCert::' + encodeURI(a + separation + b + separation + c)),
                                0)
                              : 1;
                      } catch (l) {
                          return alert(l), -1;
                      }
                  }),
                  (this.OpenBrowser = function (a, b) {
                      try {
                          var c = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (b
                                    ? MobileUtils.androidInterface.OpenBrowser(a, b)
                                    : MobileUtils.androidInterface.OpenBrowser(a),
                                0)
                              : 0 < c.indexOf('iPhone') || 0 < c.indexOf('iPad')
                              ? ((document.location = b
                                    ? 'PKI::OpenBrowser::' + encodeURI(a + separation + b)
                                    : 'PKI::OpenBrowser::' + encodeURI(a)),
                                0)
                              : 1;
                      } catch (D) {
                          return alert(D), -1;
                      }
                  }),
                  (this.GetServerAuth = function (a) {
                      try {
                          'undefined' == typeof a && (a = 'ret_GetServerAuth');
                          var b = MobileUtils.registerFunction(a),
                              c = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.GetServerAuth(b), 0)
                              : 0 < c.indexOf('iPhone') || 0 < c.indexOf('iPad')
                              ? ((document.location = 'PKI::GetServerAuth::' + encodeURI(b)), 0)
                              : 1;
                      } catch (D) {
                          return alert(D), -1;
                      }
                  }),
                  (this.VerifyServerResponse = function (a, b) {
                      try {
                          'undefined' == typeof b && (b = 'ret_VerifyServerResponse');
                          var c = MobileUtils.registerFunction(b),
                              d = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.VerifyServerResponse(a, c), 0)
                              : 0 < d.indexOf('iPhone') || 0 < d.indexOf('iPad')
                              ? ((document.location = 'PKI::VerifyServerResponse::' + encodeURI(a + separation + c)), 0)
                              : 1;
                      } catch (A) {
                          return alert(A), -1;
                      }
                  }),
                  (this.ManageLocalAuth = function (a, b, d, e, f) {
                      try {
                          'undefined' == typeof f && (f = 'ret_ManageLocalAuth');
                          var c = MobileUtils.registerFunction(f),
                              g = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.ManageLocalAuth(a, b, d, e, c), 0)
                              : 0 < g.indexOf('iPhone') || 0 < g.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::ManageLocalAuth::' +
                                    encodeURI(a + separation + b + separation + d + separation + e + separation + c)),
                                0)
                              : 1;
                      } catch (n) {
                          return alert(n), -1;
                      }
                  }),
                  (this.CertProcessDone = function () {
                      try {
                          var a = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.CertProcessDone(), 0)
                              : 0 < a.indexOf('iPhone') || 0 < a.indexOf('iPad')
                              ? ((document.location = 'PKI::CertProcessDone'), 0)
                              : 1;
                      } catch (q) {
                          return alert(q), -1;
                      }
                  }),
                  (this.DecryptAndShowPdf = function (a, b, d, e) {
                      try {
                          'undefined' == typeof e && (e = 'ret_DecryptAndShowPdf');
                          var c = MobileUtils.registerFunction(e),
                              f = navigator.userAgent;
                          return MobileUtils.supportTwidAndroid()
                              ? (MobileUtils.androidInterface.DecryptAndShowPdf(a, b, d, c), 0)
                              : 0 < f.indexOf('iPhone') || 0 < f.indexOf('iPad')
                              ? ((document.location =
                                    'PKI::DecryptAndShowPdf::' +
                                    encodeURI(a + separation + b + separation + d + separation + c)),
                                0)
                              : 1;
                      } catch (r) {
                          return alert(r), -1;
                      }
                  }))
                : ((this.QueryDeviceID = function (a, b, d) {
                      function c() {
                          function a() {
                              return Math.floor(65536 * (1 + Math.random()))
                                  .toString(16)
                                  .substring(1);
                          }
                          return a() + a() + '-' + a() + '-' + a() + '-' + a() + '-' + a() + a() + a();
                      }
                      function f() {
                          if (-1 < navigator.platform.indexOf('Win')) var a = 'PC';
                          else
                              -1 < navigator.platform.indexOf('Mac')
                                  ? (a = 'PC')
                                  : navigator.userAgent.match(/iPhone/i)
                                  ? (a = 'IP')
                                  : navigator.userAgent.match(/iPad/i)
                                  ? (a = 'IA')
                                  : navigator.userAgent.match(/Android/i)
                                  ? ((a = 'GP'), navigator.userAgent.match(/Mobile/i) || (a = 'GA'))
                                  : (a = '');
                          return a;
                      }
                      a = 0;
                      var g = '\u6210\u529f',
                          h = '';
                      try {
                          'undefined' == typeof d && (d = 'ret_QueryDeviceID');
                          if (b) {
                              var k = localStorage.getItem('TWCAAccountUqiDeviceID');
                              k
                                  ? ((k = JSON.parse(k)),
                                    k[b] ||
                                        ((k[b] = c() + '-' + new Date().getTime()),
                                        localStorage.setItem('TWCAAccountUqiDeviceID', JSON.stringify(k))),
                                    (p = k[b]))
                                  : ((p = c() + '-' + new Date().getTime()),
                                    (k = {}),
                                    (k[b] = p),
                                    localStorage.setItem('TWCAAccountUqiDeviceID', JSON.stringify(k)));
                          } else {
                              var p = localStorage.getItem('TWCABrowserUqiDeviceID');
                              p ||
                                  ((p = c() + '-' + new Date().getTime()),
                                  localStorage.setItem('TWCABrowserUqiDeviceID', p));
                          }
                          h = '{"deviceType":"' + f() + '","deviceId":"' + p + '","osVersion":"","appVersion":""}';
                      } catch (m) {
                          console.error(m), (a = 5999), (g = '\u8b80\u53d6DeviceID\u5931\u6557');
                      }
                      e.callback(d, a, g, h);
                  }),
                  (this.MakeCSR = function (a, b, d, f, g) {
                      function c(a) {
                          var b = p.pki.rsa.generateKeyPair({ bits: 2048, e: 65537 });
                          null == b
                              ? e.callback(g, 5065, '\u7522\u751f\u91d1\u9470\u5931\u6557', '')
                              : k(b.privateKey, b.publicKey, a);
                      }
                      function h(a, b) {
                          var c = p.pki.privateKeyFromAsn1(p.asn1.fromDer(p.util.createBuffer(a))),
                              d = p.pki.setRsaPublicKey(c.n, c.e);
                          k(c, d, b);
                      }
                      function k(a, b, c) {
                          var f = p.pki.encryptRsaPrivateKey(a, d),
                              h = p.pki.createCertificationRequest();
                          h.publicKey = b;
                          c && h.setSubject([{ name: 'commonName', value: c }]);
                          h.sign(a);
                          h = p.pki.certificationRequestToPem(h);
                          f = f.replace(/(?:\\[rn]|[\r\n]+)+/g, '');
                          f = f.replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '');
                          f = f.replace('-----END ENCRYPTED PRIVATE KEY-----', '');
                          h = h.replace(/(?:\\[rn]|[\r\n]+)+/g, '');
                          h = h.replace('-----BEGIN CERTIFICATE REQUEST-----', '');
                          h = h.replace('-----END CERTIFICATE REQUEST-----', '');
                          t = '{"b64Key":"' + f + '","csr":"' + h + '"}';
                          e.callback(g, 0, '\u6210\u529f', t);
                      }
                      var q = 0,
                          m = '\u6210\u529f',
                          t = '';
                      if (d)
                          if (1024 != a && 2048 != a && 4096 != a)
                              (q = 5005),
                                  (m =
                                      '\u53c3\u6578\u932f\u8aa4\uff0c\u4e0d\u652f\u63f4\u7684\u91d1\u9470\u9577\u5ea6');
                          else if (0 != b && 512 != b && 1024 != b)
                              (q = 5005),
                                  (m = '\u53c3\u6578\u932f\u8aa4\uff0c\u4e0d\u652f\u63f4\u7684\u6f14\u7b97\u6cd5');
                          else {
                              switch (b) {
                                  case 0:
                                      b = 'SHA-1';
                                      break;
                                  case 512:
                                      b = 'SHA-256';
                                      break;
                                  case 768:
                                      b = 'SHA-512';
                                      break;
                                  default:
                                      b = 'SHA-256';
                              }
                              a = {
                                  name: 'RSASSA-PKCS1-v1_5',
                                  modulusLength: a,
                                  publicExponent: new Uint8Array([1, 0, 1]),
                                  hash: { name: b },
                              };
                              try {
                                  if (window.crypto)
                                      if (crypto.subtle && crypto.subtle.generateKey)
                                          crypto.subtle
                                              .generateKey(a, !0, ['sign', 'verify'])
                                              .then(function (a) {
                                                  return crypto.subtle.exportKey('pkcs8', a.privateKey);
                                              })
                                              .then(function (a) {
                                                  h(a, f);
                                              })
                                              ['catch'](function (a) {
                                                  console.error(a);
                                                  c(f);
                                              });
                                      else {
                                          c(f);
                                          return;
                                      }
                                  else if (window.msCrypto) {
                                      var u = window.msCrypto.subtle.generateKey(a, !0, ['sign', 'verify']);
                                      u.onerror = function (a) {
                                          console.log('genOp.onerror event handler fired.');
                                          c(f);
                                      };
                                      u.oncomplete = function (a) {
                                          a = window.msCrypto.subtle.exportKey('pkcs8', a.target.result.privateKey);
                                          a.onerror = function (a) {
                                              console.log('expOp.onerror event handler fired.');
                                              c(f);
                                          };
                                          a.oncomplete = function (a) {
                                              h(a.target.result, f);
                                          };
                                      };
                                  } else {
                                      c(f);
                                      return;
                                  }
                              } catch (I) {
                                  c(f);
                                  return;
                              }
                          }
                      else (q = 5005), (m = '\u53c3\u6578\u932f\u8aa4\uff0c\u5bc6\u78bc\u4e0d\u53ef\u7a7a\u767d');
                      0 != q && e.callback(g, q, m, t);
                  }),
                  (this.ImportCert = function (b, d, f, g, h, k) {
                      var c = 0,
                          l = '\u6210\u529f',
                          q = '';
                      if (b && d && f && g && k) {
                          0 > g.indexOf('-----BEGIN CERTIFICATE-----') && (g = '-----BEGIN CERTIFICATE-----' + g);
                          0 > g.indexOf('-----END CERTIFICATE-----') && (g += '-----END CERTIFICATE-----');
                          0 > f.indexOf('-----BEGIN ENCRYPTED PRIVATE KEY-----') &&
                              (f = '-----BEGIN ENCRYPTED PRIVATE KEY-----' + f);
                          0 > f.indexOf('-----END ENCRYPTED PRIVATE KEY-----') &&
                              (f += '-----END ENCRYPTED PRIVATE KEY-----');
                          try {
                              try {
                                  g = p.pki.certificateFromPem(g);
                              } catch (U) {
                                  g = g.replace('CERTIFICATE', 'PKCS7');
                                  g = g.replace('CERTIFICATE', 'PKCS7');
                                  for (
                                      var m = p.pkcs7.messageFromPem(g).certificates, t = 0;
                                      t < m.length && ((g = m[t]), !isIdInSubject(m[t], b));
                                      t++
                                  );
                              }
                              f = p.pki.decryptRsaPrivateKey(f, d);
                              if (isPrivateKeyMatchesCert(f, g))
                                  if (isIdInSubject(g, b)) {
                                      var u = p.pkcs12.toPkcs12Asn1(f, g, d, { algorithm: '3des' }),
                                          v = p.asn1.toDer(u).getBytes(),
                                          w = p.util.encode64(v),
                                          x = parseCertObjToCertInfo(g, w);
                                      isCertMatchesFilter(x, h)
                                          ? z(x)
                                              ? (q = '{' + a(x) + '}')
                                              : ((c = 5110), (l = '\u5132\u5b58\u6191\u8b49\u5931\u6557'))
                                          : ((c = 5115),
                                            (l =
                                                '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u689d\u4ef6\u4e0d\u7b26'));
                                  } else
                                      (c = 5115),
                                          (l =
                                              '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u8207\u4f7f\u7528\u8005\u4e0d\u7b26');
                              else
                                  (c = 5115),
                                      (l =
                                          '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u8207\u91d1\u9470\u4e0d\u7b26');
                          } catch (U) {
                              console.error(U), (c = 5111), (l = '\u532f\u5165\u6191\u8b49\u5931\u6557');
                          }
                      } else (c = 5005), (l = '\u53c3\u6578\u932f\u8aa4');
                      e.callback(k, c, l, q);
                  }),
                  (this.ImportCertStore = function (b, d, f, g, h) {
                      var c = 0,
                          k = '\u6210\u529f',
                          n = '';
                      do
                          if (b && d && f) {
                              if (isMobile())
                                  try {
                                      var q = piexif.load(f);
                                      if (null == q) {
                                          console.error(ex);
                                          c = 5005;
                                          k = '\u53c3\u6578\u932f\u8aa4\uff1a\u5716\u7247\u683c\u5f0f\u932f\u8aa4';
                                          break;
                                      }
                                      f = q['0th']['33432'];
                                  } catch (Q) {
                                      console.error(Q);
                                      c = 5005;
                                      k = '\u53c3\u6578\u932f\u8aa4\uff1a\u5716\u7247\u683c\u5f0f\u932f\u8aa4';
                                      break;
                                  }
                              if (f)
                                  try {
                                      try {
                                          if (0 >= p.asn1.fromDer(p.util.decode64(f)).value.length) {
                                              c = 5040;
                                              k = '\u6191\u8b49\u683c\u5f0f\u932f\u8aa4';
                                              break;
                                          }
                                      } catch (Q) {
                                          console.error(Q);
                                          c = 5040;
                                          k = '\u6191\u8b49\u683c\u5f0f\u932f\u8aa4';
                                          break;
                                      }
                                      pkcs12 = C(f, d);
                                      if (null == pkcs12) (c = 5071), (k = '\u6191\u8b49\u5bc6\u78bc\u932f\u8aa4');
                                      else {
                                          for (
                                              var m = -1,
                                                  t = pkcs12.getBags({ bagType: p.pki.oids.certBag })[
                                                      p.pki.oids.certBag
                                                  ],
                                                  u = 0;
                                              u < t.length;
                                              u++
                                          )
                                              if (isIdInSubject(t[u].cert, b)) {
                                                  m = u;
                                                  break;
                                              }
                                          if (0 > m)
                                              (c = 5115),
                                                  (k =
                                                      '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u8207\u4f7f\u7528\u8005\u4e0d\u7b26');
                                          else {
                                              var v = parseCertObjToCertInfo(t[m].cert, f);
                                              isCertMatchesFilter(v, g)
                                                  ? z(v)
                                                      ? (n = '{' + a(v) + '}')
                                                      : ((c = 5110), (k = '\u5132\u5b58\u6191\u8b49\u5931\u6557'))
                                                  : ((c = 5115),
                                                    (k =
                                                        '\u6191\u8b49\u9a57\u8b49\u932f\u8aa4\uff1a\u6191\u8b49\u689d\u4ef6\u4e0d\u7b26'));
                                          }
                                      }
                                  } catch (Q) {
                                      console.error(Q), (c = 5111), (k = '\u532f\u5165\u6191\u8b49\u5931\u6557');
                                  }
                              else (c = 5005), (k = '\u53c3\u6578\u932f\u8aa4');
                          } else (c = 5005), (k = '\u53c3\u6578\u932f\u8aa4');
                      while (0);
                      e.callback(h, c, k, n);
                  }),
                  (this.ExportCertStore = function (a, b, d) {
                      var c = 0,
                          f = '\u6210\u529f',
                          g = '';
                      do {
                          var h = null,
                              k = '';
                          if (d && b) {
                              try {
                                  if (((h = sessionStorage.getItem('selectedCertInfo')), !h)) {
                                      c = 5067;
                                      f = '\u5c1a\u672a\u9078\u64c7\u6191\u8b49';
                                      break;
                                  }
                              } catch (m) {
                                  console.error(m);
                                  c = 5112;
                                  f = '\u8b80\u53d6\u6191\u8b49\u5931\u6557';
                                  break;
                              }
                              h = JSON.parse(h);
                              if (h.b64P12Cert) {
                                  if (isMobile()) {
                                      if (!a) {
                                          c = 5005;
                                          f = '\u53c3\u6578\u932f\u8aa4';
                                          break;
                                      }
                                      try {
                                          var p = piexif.load(a);
                                          if (null == p) {
                                              console.error(ex);
                                              c = 5005;
                                              f = '\u53c3\u6578\u932f\u8aa4\uff1a\u5716\u7247\u683c\u5f0f\u932f\u8aa4';
                                              break;
                                          }
                                          p['0th']['33432'] = h.b64P12Cert;
                                          k = piexif.insert(piexif.dump(p), a);
                                      } catch (m) {
                                          console.error(m);
                                          c = 5005;
                                          f = '\u53c3\u6578\u932f\u8aa4\uff1a\u5716\u7247\u683c\u5f0f\u932f\u8aa4';
                                          break;
                                      }
                                  } else k = h.b64P12Cert;
                                  g = '{"certStore":"' + k + '","userId":"' + b + '"}';
                              } else (c = 5060), (f = '\u91d1\u9470\u4e0d\u5b58\u5728');
                          } else (c = 5005), (f = '\u53c3\u6578\u932f\u8aa4');
                      } while (0);
                      e.callback(d, c, f, g);
                  }),
                  (this.ChangePIN = function (b, d, f) {
                      var c = 0,
                          g = '\u6210\u529f',
                          h = '';
                      do
                          try {
                              var k = null;
                              if (b && d && f) {
                                  try {
                                      if (((k = JSON.parse(sessionStorage.getItem('selectedCertInfo'))), !k)) {
                                          c = 5067;
                                          g = '\u5c1a\u672a\u9078\u64c7\u6191\u8b49';
                                          break;
                                      }
                                  } catch (Y) {
                                      console.error(Y);
                                      c = 5112;
                                      g = '\u8b80\u53d6\u6191\u8b49\u5931\u6557';
                                      break;
                                  }
                                  var n = k.b64P12Cert;
                                  n = C(n, b);
                                  if (null == n) (c = 5071), (g = '\u6191\u8b49\u5bc6\u78bc\u932f\u8aa4');
                                  else {
                                      for (
                                          var q = n.getBags({ bagType: p.pki.oids.certBag })[p.pki.oids.certBag],
                                              m = n.getBags({ bagType: p.pki.oids.pkcs8ShroudedKeyBag })[
                                                  p.pki.oids.pkcs8ShroudedKeyBag
                                              ][0].key,
                                              t = [],
                                              u = 0;
                                          u < q.length;
                                          u++
                                      )
                                          t.push(q[u].cert);
                                      var v = p.pkcs12.toPkcs12Asn1(m, t, d, { algorithm: '3des' }),
                                          w = p.asn1.toDer(v).getBytes(),
                                          x = p.util.encode64(w),
                                          y = getCertIndexByCertInfo(k);
                                      y
                                          ? ((k.b64P12Cert = x),
                                            localStorage.setItem(y, JSON.stringify(k)),
                                            sessionStorage.setItem('selectedCertInfo', JSON.stringify(k)),
                                            sessionStorage.setItem('twcaSelectedKey', p.util.encode64(d)),
                                            (h = '{' + a(k) + '}'))
                                          : (console.error(ex),
                                            (c = 5121),
                                            (g = '\u8b8a\u66f4\u5bc6\u78bc\u5931\u6557'));
                                  }
                              } else (c = 5005), (g = '\u53c3\u6578\u932f\u8aa4');
                          } catch (Y) {
                              console.error(Y), (c = 5121), (g = '\u8b8a\u66f4\u5bc6\u78bc\u5931\u6557');
                          }
                      while (0);
                      e.callback(f, c, g, h);
                  }));
            this.GetCertSubjectCN = function () {
                return e.getSelectedCertFieldValue('cn');
            };
            this.GetCertSubject = function () {
                return e.getSelectedCertFieldValue('subject');
            };
            this.GetCertIssuer = function () {
                return e.getSelectedCertFieldValue('issuer');
            };
            this.GetCertSerial = function () {
                return e.getSelectedCertFieldValue('serial');
            };
            this.GetCertNotBefore = function () {
                return e.getSelectedCertFieldValue('notBefore');
            };
            this.GetCertNotAfter = function () {
                return e.getSelectedCertFieldValue('notAfter');
            };
            this.getSelectedCertFieldValue = function (a) {
                return e.selectedCertInfo && 'undefined' != typeof e.selectedCertInfo[a] ? e.selectedCertInfo[a] : '';
            };
            this.setOpenWindowObject = function (a) {
                if ('object' != typeof a) return 5005;
                e._childWindow = a;
            };
            this.SelectSignerExFromChildWindowHandler = function (a, b, d, f) {
                5071 == a && null == w[3]
                    ? twcaCryptoLibAlertDialog.show(
                          '\u8f38\u5165\u5bc6\u78bc',
                          '\u8acb\u8f38\u5165\u6191\u8b49\u5bc6\u78bc',
                          '',
                          '\u53d6\u6d88',
                          '\u78ba\u8a8d',
                          ['SelectSignerExFromChild', w[0], w[1], w[2], w[3], w[4], w[5], w[6], w[7], w[8], e],
                      )
                    : ((d = w[8]), (w = null), e.callback(d, a, b, f));
            };
            this.SignPkcs7FromChildWindowHandler = function (a, b, d, f) {
                d = w[2];
                w = null;
                e.callback(d, a, b, f);
            };
            this.SignPkcs1FromChildWindowHandler = function (a, b, d, f) {
                d = w[2];
                w = null;
                e.callback(d, a, b, f);
            };
            this.ResetKeyFromChildWindowHandler = function (a, b, d, f) {
                d = w[0];
                w = null;
                e.callback(d, a, b, f);
            };
            this.GetVersionFromChildWindowHandler = function (a, b, d, f) {
                d = w[0];
                w = null;
                e.callback(d, a, b, f);
            };
            this.callback = function (a, b, d, f) {
                if ('string' === typeof a && 0 == a.indexOf('oTwcaLib._childWindow.twcaLib.'))
                    (a = a.substring(30, a.length)), e._childWindow.twcaLib[a](b, d, '', f);
                else if ('string' === typeof a && 0 == a.indexOf('twcaLib.'))
                    (a = a.substring(8, a.length)), e[a](b, d, '', f);
                else {
                    var c = {};
                    if (a && '[object Function]' === c.toString.call(a)) a(b, d, '', f);
                    else window[a](b, d, '', f);
                }
            };
        })();
    });
