"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () { var e = { 3900: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { AbiCoder: function () { return re; }, ConstructorFragment: function () { return S; }, ErrorFragment: function () { return x; }, EventFragment: function () { return b; }, FormatTypes: function () { return d; }, Fragment: function () { return y; }, FunctionFragment: function () { return E; }, Indexed: function () { return fe; }, Interface: function () { return de; }, LogDescription: function () { return ae; }, ParamType: function () { return g; }, TransactionDescription: function () { return ce; }, checkResultErrors: function () { return T; }, defaultAbiCoder: function () { return ne; } });
        var n = r(2593), i = r(3587), o = r(711);
        var s = "abi/5.5.0", a = new o.Logger(s), c = {};
        var u = { calldata: !0, memory: !0, storage: !0 }, f = { calldata: !0, memory: !0 };
        function l(e, t) { if ("bytes" === e || "string" === e) {
            if (u[t])
                return !0;
        }
        else if ("address" === e) {
            if ("payable" === t)
                return !0;
        }
        else if ((e.indexOf("[") >= 0 || "tuple" === e) && f[t])
            return !0; return (u[t] || "payable" === t) && a.throwArgumentError("invalid modifier", "name", t), !1; }
        function h(e, t) { for (var r_1 in t)
            (0, i.defineReadOnly)(e, r_1, t[r_1]); }
        var d = Object.freeze({ sighash: "sighash", minimal: "minimal", full: "full", json: "json" }), p = new RegExp(/^(.*)\[([0-9]*)\]$/);
        var g = (function () {
            function g(e, t) {
                e !== c && a.throwError("use fromString", o.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new ParamType()" }), h(this, t);
                var r = this.type.match(p);
                h(this, r ? { arrayLength: parseInt(r[2] || "-1"), arrayChildren: g.fromObject({ type: r[1], components: this.components }), baseType: "array" } : { arrayLength: null, arrayChildren: null, baseType: null != this.components ? "tuple" : this.type }), this._isParamType = !0, Object.freeze(this);
            }
            g.prototype.format = function (e) { if (e || (e = d.sighash), d[e] || a.throwArgumentError("invalid format type", "format", e), e === d.json) {
                var t_1 = { type: "tuple" === this.baseType ? "tuple" : this.type, name: this.name || void 0 };
                return "boolean" == typeof this.indexed && (t_1.indexed = this.indexed), this.components && (t_1.components = this.components.map((function (t) { return JSON.parse(t.format(e)); }))), JSON.stringify(t_1);
            } var t = ""; return "array" === this.baseType ? (t += this.arrayChildren.format(e), t += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]") : "tuple" === this.baseType ? (e !== d.sighash && (t += this.type), t += "(" + this.components.map((function (t) { return t.format(e); })).join(e === d.full ? ", " : ",") + ")") : t += this.type, e !== d.sighash && (!0 === this.indexed && (t += " indexed"), e === d.full && this.name && (t += " " + this.name)), t; };
            g.from = function (e, t) { return "string" == typeof e ? g.fromString(e, t) : g.fromObject(e); };
            g.fromObject = function (e) { return g.isParamType(e) ? e : new g(c, { name: e.name || null, type: N(e.type), indexed: null == e.indexed ? null : !!e.indexed, components: e.components ? e.components.map(g.fromObject) : null }); };
            g.fromString = function (e, t) { return r = function (e, t) { var r = e; function n(t) { a.throwArgumentError("unexpected character at position " + t, "param", e); } function i(e) { var r = { type: "", name: "", parent: e, state: { allowType: !0 } }; return t && (r.indexed = !1), r; } e = e.replace(/\s/g, " "); var o = { type: "", name: "", state: { allowType: !0 } }, s = o; for (var r_2 = 0; r_2 < e.length; r_2++) {
                var o_1 = e[r_2];
                switch (o_1) {
                    case "(":
                        s.state.allowType && "" === s.type ? s.type = "tuple" : s.state.allowParams || n(r_2), s.state.allowType = !1, s.type = N(s.type), s.components = [i(s)], s = s.components[0];
                        break;
                    case ")":
                        delete s.state, "indexed" === s.name && (t || n(r_2), s.indexed = !0, s.name = ""), l(s.type, s.name) && (s.name = ""), s.type = N(s.type);
                        var e_1 = s;
                        s = s.parent, s || n(r_2), delete e_1.parent, s.state.allowParams = !1, s.state.allowName = !0, s.state.allowArray = !0;
                        break;
                    case ",":
                        delete s.state, "indexed" === s.name && (t || n(r_2), s.indexed = !0, s.name = ""), l(s.type, s.name) && (s.name = ""), s.type = N(s.type);
                        var a_1 = i(s.parent);
                        s.parent.components.push(a_1), delete s.parent, s = a_1;
                        break;
                    case " ":
                        s.state.allowType && "" !== s.type && (s.type = N(s.type), delete s.state.allowType, s.state.allowName = !0, s.state.allowParams = !0), s.state.allowName && "" !== s.name && ("indexed" === s.name ? (t || n(r_2), s.indexed && n(r_2), s.indexed = !0, s.name = "") : l(s.type, s.name) ? s.name = "" : s.state.allowName = !1);
                        break;
                    case "[":
                        s.state.allowArray || n(r_2), s.type += o_1, s.state.allowArray = !1, s.state.allowName = !1, s.state.readArray = !0;
                        break;
                    case "]":
                        s.state.readArray || n(r_2), s.type += o_1, s.state.readArray = !1, s.state.allowArray = !0, s.state.allowName = !0;
                        break;
                    default: s.state.allowType ? (s.type += o_1, s.state.allowParams = !0, s.state.allowArray = !0) : s.state.allowName ? (s.name += o_1, delete s.state.allowArray) : s.state.readArray ? s.type += o_1 : n(r_2);
                }
            } return s.parent && a.throwArgumentError("unexpected eof", "param", e), delete o.state, "indexed" === s.name ? (t || n(r.length - 7), s.indexed && n(r.length - 7), s.indexed = !0, s.name = "") : l(s.type, s.name) && (s.name = ""), o.type = N(o.type), o; }(e, !!t), g.fromObject({ name: r.name, type: r.type, indexed: r.indexed, components: r.components }); var r; };
            g.isParamType = function (e) { return !(null == e || !e._isParamType); };
            return g;
        }());
        function m(e, t) { return function (e) { e = e.trim(); var t = [], r = "", n = 0; for (var i_1 = 0; i_1 < e.length; i_1++) {
            var o_2 = e[i_1];
            "," === o_2 && 0 === n ? (t.push(r), r = "") : (r += o_2, "(" === o_2 ? n++ : ")" === o_2 && (n--, -1 === n && a.throwArgumentError("unbalanced parenthesis", "value", e)));
        } return r && t.push(r), t; }(e).map((function (e) { return g.fromString(e, t); })); }
        var y = (function () {
            function y(e, t) {
                e !== c && a.throwError("use a static from method", o.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new Fragment()" }), h(this, t), this._isFragment = !0, Object.freeze(this);
            }
            y.from = function (e) { return y.isFragment(e) ? e : "string" == typeof e ? y.fromString(e) : y.fromObject(e); };
            y.fromObject = function (e) { if (y.isFragment(e))
                return e; switch (e.type) {
                case "function": return E.fromObject(e);
                case "event": return b.fromObject(e);
                case "constructor": return S.fromObject(e);
                case "error": return x.fromObject(e);
                case "fallback":
                case "receive": return null;
            } return a.throwArgumentError("invalid fragment object", "value", e); };
            y.fromString = function (e) { return "event" === (e = (e = (e = e.replace(/\s/g, " ")).replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ")).trim()).split(" ")[0] ? b.fromString(e.substring(5).trim()) : "function" === e.split(" ")[0] ? E.fromString(e.substring(8).trim()) : "constructor" === e.split("(")[0].trim() ? S.fromString(e.trim()) : "error" === e.split(" ")[0] ? x.fromString(e.substring(5).trim()) : a.throwArgumentError("unsupported fragment", "value", e); };
            y.isFragment = function (e) { return !(!e || !e._isFragment); };
            return y;
        }());
        var b = (function (_super) {
            __extends(b, _super);
            function b() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            b.prototype.format = function (e) { if (e || (e = d.sighash), d[e] || a.throwArgumentError("invalid format type", "format", e), e === d.json)
                return JSON.stringify({ type: "event", anonymous: this.anonymous, name: this.name, inputs: this.inputs.map((function (t) { return JSON.parse(t.format(e)); })) }); var t = ""; return e !== d.sighash && (t += "event "), t += this.name + "(" + this.inputs.map((function (t) { return t.format(e); })).join(e === d.full ? ", " : ",") + ") ", e !== d.sighash && this.anonymous && (t += "anonymous "), t.trim(); };
            b.from = function (e) { return "string" == typeof e ? b.fromString(e) : b.fromObject(e); };
            b.fromObject = function (e) { if (b.isEventFragment(e))
                return e; "event" !== e.type && a.throwArgumentError("invalid event object", "value", e); var t = { name: P(e.name), anonymous: e.anonymous, inputs: e.inputs ? e.inputs.map(g.fromObject) : [], type: "event" }; return new b(c, t); };
            b.fromString = function (e) { var t = e.match(_); t || a.throwArgumentError("invalid event string", "value", e); var r = !1; return t[3].split(" ").forEach((function (e) { switch (e.trim()) {
                case "anonymous":
                    r = !0;
                    break;
                case "": break;
                default: a.warn("unknown modifier: " + e);
            } })), b.fromObject({ name: t[1].trim(), anonymous: r, inputs: m(t[2], !0), type: "event" }); };
            b.isEventFragment = function (e) { return e && e._isFragment && "event" === e.type; };
            return b;
        }(y));
        function v(e, t) { t.gas = null; var r = e.split("@"); return 1 !== r.length ? (r.length > 2 && a.throwArgumentError("invalid human-readable ABI signature", "value", e), r[1].match(/^[0-9]+$/) || a.throwArgumentError("invalid human-readable ABI signature gas", "value", e), t.gas = n.O$.from(r[1]), r[0]) : e; }
        function w(e, t) { t.constant = !1, t.payable = !1, t.stateMutability = "nonpayable", e.split(" ").forEach((function (e) { switch (e.trim()) {
            case "constant":
                t.constant = !0;
                break;
            case "payable":
                t.payable = !0, t.stateMutability = "payable";
                break;
            case "nonpayable":
                t.payable = !1, t.stateMutability = "nonpayable";
                break;
            case "pure":
                t.constant = !0, t.stateMutability = "pure";
                break;
            case "view":
                t.constant = !0, t.stateMutability = "view";
                break;
            case "external":
            case "public":
            case "": break;
            default: console.log("unknown modifier: " + e);
        } })); }
        function A(e) { var t = { constant: !1, payable: !0, stateMutability: "payable" }; return null != e.stateMutability ? (t.stateMutability = e.stateMutability, t.constant = "view" === t.stateMutability || "pure" === t.stateMutability, null != e.constant && !!e.constant !== t.constant && a.throwArgumentError("cannot have constant function with mutability " + t.stateMutability, "value", e), t.payable = "payable" === t.stateMutability, null != e.payable && !!e.payable !== t.payable && a.throwArgumentError("cannot have payable function with mutability " + t.stateMutability, "value", e)) : null != e.payable ? (t.payable = !!e.payable, null != e.constant || t.payable || "constructor" === e.type || a.throwArgumentError("unable to determine stateMutability", "value", e), t.constant = !!e.constant, t.constant ? t.stateMutability = "view" : t.stateMutability = t.payable ? "payable" : "nonpayable", t.payable && t.constant && a.throwArgumentError("cannot have constant payable function", "value", e)) : null != e.constant ? (t.constant = !!e.constant, t.payable = !t.constant, t.stateMutability = t.constant ? "view" : "payable") : "constructor" !== e.type && a.throwArgumentError("unable to determine stateMutability", "value", e), t; }
        var S = (function (_super) {
            __extends(S, _super);
            function S() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            S.prototype.format = function (e) { if (e || (e = d.sighash), d[e] || a.throwArgumentError("invalid format type", "format", e), e === d.json)
                return JSON.stringify({ type: "constructor", stateMutability: "nonpayable" !== this.stateMutability ? this.stateMutability : void 0, payable: this.payable, gas: this.gas ? this.gas.toNumber() : void 0, inputs: this.inputs.map((function (t) { return JSON.parse(t.format(e)); })) }); e === d.sighash && a.throwError("cannot format a constructor for sighash", o.Logger.errors.UNSUPPORTED_OPERATION, { operation: "format(sighash)" }); var t = "constructor(" + this.inputs.map((function (t) { return t.format(e); })).join(e === d.full ? ", " : ",") + ") "; return this.stateMutability && "nonpayable" !== this.stateMutability && (t += this.stateMutability + " "), t.trim(); };
            S.from = function (e) { return "string" == typeof e ? S.fromString(e) : S.fromObject(e); };
            S.fromObject = function (e) { if (S.isConstructorFragment(e))
                return e; "constructor" !== e.type && a.throwArgumentError("invalid constructor object", "value", e); var t = A(e); t.constant && a.throwArgumentError("constructor cannot be constant", "value", e); var r = { name: null, type: e.type, inputs: e.inputs ? e.inputs.map(g.fromObject) : [], payable: t.payable, stateMutability: t.stateMutability, gas: e.gas ? n.O$.from(e.gas) : null }; return new S(c, r); };
            S.fromString = function (e) { var t = { type: "constructor" }, r = (e = v(e, t)).match(_); return r && "constructor" === r[1].trim() || a.throwArgumentError("invalid constructor string", "value", e), t.inputs = m(r[2].trim(), !1), w(r[3].trim(), t), S.fromObject(t); };
            S.isConstructorFragment = function (e) { return e && e._isFragment && "constructor" === e.type; };
            return S;
        }(y));
        var E = (function (_super) {
            __extends(E, _super);
            function E() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            E.prototype.format = function (e) { if (e || (e = d.sighash), d[e] || a.throwArgumentError("invalid format type", "format", e), e === d.json)
                return JSON.stringify({ type: "function", name: this.name, constant: this.constant, stateMutability: "nonpayable" !== this.stateMutability ? this.stateMutability : void 0, payable: this.payable, gas: this.gas ? this.gas.toNumber() : void 0, inputs: this.inputs.map((function (t) { return JSON.parse(t.format(e)); })), outputs: this.outputs.map((function (t) { return JSON.parse(t.format(e)); })) }); var t = ""; return e !== d.sighash && (t += "function "), t += this.name + "(" + this.inputs.map((function (t) { return t.format(e); })).join(e === d.full ? ", " : ",") + ") ", e !== d.sighash && (this.stateMutability ? "nonpayable" !== this.stateMutability && (t += this.stateMutability + " ") : this.constant && (t += "view "), this.outputs && this.outputs.length && (t += "returns (" + this.outputs.map((function (t) { return t.format(e); })).join(", ") + ") "), null != this.gas && (t += "@" + this.gas.toString() + " ")), t.trim(); };
            E.from = function (e) { return "string" == typeof e ? E.fromString(e) : E.fromObject(e); };
            E.fromObject = function (e) { if (E.isFunctionFragment(e))
                return e; "function" !== e.type && a.throwArgumentError("invalid function object", "value", e); var t = A(e); var r = { type: e.type, name: P(e.name), constant: t.constant, inputs: e.inputs ? e.inputs.map(g.fromObject) : [], outputs: e.outputs ? e.outputs.map(g.fromObject) : [], payable: t.payable, stateMutability: t.stateMutability, gas: e.gas ? n.O$.from(e.gas) : null }; return new E(c, r); };
            E.fromString = function (e) { var t = { type: "function" }, r = (e = v(e, t)).split(" returns "); r.length > 2 && a.throwArgumentError("invalid function string", "value", e); var n = r[0].match(_); if (n || a.throwArgumentError("invalid function signature", "value", e), t.name = n[1].trim(), t.name && P(t.name), t.inputs = m(n[2], !1), w(n[3].trim(), t), r.length > 1) {
                var n_1 = r[1].match(_);
                "" == n_1[1].trim() && "" == n_1[3].trim() || a.throwArgumentError("unexpected tokens", "value", e), t.outputs = m(n_1[2], !1);
            }
            else
                t.outputs = []; return E.fromObject(t); };
            E.isFunctionFragment = function (e) { return e && e._isFragment && "function" === e.type; };
            return E;
        }(S));
        function k(e) { var t = e.format(); return "Error(string)" !== t && "Panic(uint256)" !== t || a.throwArgumentError("cannot specify user defined " + t + " error", "fragment", e), e; }
        var x = (function (_super) {
            __extends(x, _super);
            function x() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            x.prototype.format = function (e) { if (e || (e = d.sighash), d[e] || a.throwArgumentError("invalid format type", "format", e), e === d.json)
                return JSON.stringify({ type: "error", name: this.name, inputs: this.inputs.map((function (t) { return JSON.parse(t.format(e)); })) }); var t = ""; return e !== d.sighash && (t += "error "), t += this.name + "(" + this.inputs.map((function (t) { return t.format(e); })).join(e === d.full ? ", " : ",") + ") ", t.trim(); };
            x.from = function (e) { return "string" == typeof e ? x.fromString(e) : x.fromObject(e); };
            x.fromObject = function (e) { if (x.isErrorFragment(e))
                return e; "error" !== e.type && a.throwArgumentError("invalid error object", "value", e); var t = { type: e.type, name: P(e.name), inputs: e.inputs ? e.inputs.map(g.fromObject) : [] }; return k(new x(c, t)); };
            x.fromString = function (e) { var t = { type: "error" }, r = e.match(_); return r || a.throwArgumentError("invalid error signature", "value", e), t.name = r[1].trim(), t.name && P(t.name), t.inputs = m(r[2], !1), k(x.fromObject(t)); };
            x.isErrorFragment = function (e) { return e && e._isFragment && "error" === e.type; };
            return x;
        }(y));
        function N(e) { return e.match(/^uint($|[^1-9])/) ? e = "uint256" + e.substring(4) : e.match(/^int($|[^1-9])/) && (e = "int256" + e.substring(3)), e; }
        var B = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
        function P(e) { return e && e.match(B) || a.throwArgumentError("invalid identifier \"" + e + "\"", "value", e), e; }
        var _ = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
        var I = r(3286);
        var O = new o.Logger(s);
        function T(e) { var t = [], r = function (e, n) { if (Array.isArray(n))
            for (var i_2 in n) {
                var o_3 = e.slice();
                o_3.push(i_2);
                try {
                    r(o_3, n[i_2]);
                }
                catch (e) {
                    t.push({ path: o_3, error: e });
                }
            } }; return r([], e), t; }
        var R = (function () {
            function R(e, t, r, n) {
                this.name = e, this.type = t, this.localName = r, this.dynamic = n;
            }
            R.prototype._throwError = function (e, t) { O.throwArgumentError(e, this.localName, t); };
            return R;
        }());
        var C = (function () {
            function C(e) {
                (0, i.defineReadOnly)(this, "wordSize", e || 32), this._data = [], this._dataLength = 0, this._padding = new Uint8Array(e);
            }
            Object.defineProperty(C.prototype, "data", {
                get: function () { return (0, I.hexConcat)(this._data); },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(C.prototype, "length", {
                get: function () { return this._dataLength; },
                enumerable: false,
                configurable: true
            });
            C.prototype._writeData = function (e) { return this._data.push(e), this._dataLength += e.length, e.length; };
            C.prototype.appendWriter = function (e) { return this._writeData((0, I.concat)(e._data)); };
            C.prototype.writeBytes = function (e) { var t = (0, I.arrayify)(e); var r = t.length % this.wordSize; return r && (t = (0, I.concat)([t, this._padding.slice(r)])), this._writeData(t); };
            C.prototype._getValue = function (e) { var t = (0, I.arrayify)(n.O$.from(e)); return t.length > this.wordSize && O.throwError("value out-of-bounds", o.Logger.errors.BUFFER_OVERRUN, { length: this.wordSize, offset: t.length }), t.length % this.wordSize && (t = (0, I.concat)([this._padding.slice(t.length % this.wordSize), t])), t; };
            C.prototype.writeValue = function (e) { return this._writeData(this._getValue(e)); };
            C.prototype.writeUpdatableValue = function () {
                var _this = this;
                var e = this._data.length;
                return this._data.push(this._padding), this._dataLength += this.wordSize, function (t) { _this._data[e] = _this._getValue(t); };
            };
            return C;
        }());
        var M = (function () {
            function M(e, t, r, n) {
                (0, i.defineReadOnly)(this, "_data", (0, I.arrayify)(e)), (0, i.defineReadOnly)(this, "wordSize", t || 32), (0, i.defineReadOnly)(this, "_coerceFunc", r), (0, i.defineReadOnly)(this, "allowLoose", n), this._offset = 0;
            }
            Object.defineProperty(M.prototype, "data", {
                get: function () { return (0, I.hexlify)(this._data); },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(M.prototype, "consumed", {
                get: function () { return this._offset; },
                enumerable: false,
                configurable: true
            });
            M.coerce = function (e, t) { var r = e.match("^u?int([0-9]+)$"); return r && parseInt(r[1]) <= 48 && (t = t.toNumber()), t; };
            M.prototype.coerce = function (e, t) { return this._coerceFunc ? this._coerceFunc(e, t) : M.coerce(e, t); };
            M.prototype._peekBytes = function (e, t, r) { var n = Math.ceil(t / this.wordSize) * this.wordSize; return this._offset + n > this._data.length && (this.allowLoose && r && this._offset + t <= this._data.length ? n = t : O.throwError("data out-of-bounds", o.Logger.errors.BUFFER_OVERRUN, { length: this._data.length, offset: this._offset + n })), this._data.slice(this._offset, this._offset + n); };
            M.prototype.subReader = function (e) { return new M(this._data.slice(this._offset + e), this.wordSize, this._coerceFunc, this.allowLoose); };
            M.prototype.readBytes = function (e, t) { var r = this._peekBytes(0, e, !!t); return this._offset += r.length, r.slice(0, e); };
            M.prototype.readValue = function () { return n.O$.from(this.readBytes(this.wordSize)); };
            return M;
        }());
        var L = r(4594);
        var U = (function (_super) {
            __extends(U, _super);
            function U(e) {
                return _super.call(this, "address", "address", e, !1) || this;
            }
            U.prototype.defaultValue = function () { return "0x0000000000000000000000000000000000000000"; };
            U.prototype.encode = function (e, t) { try {
                t = (0, L.getAddress)(t);
            }
            catch (e) {
                this._throwError(e.message, t);
            } return e.writeValue(t); };
            U.prototype.decode = function (e) { return (0, L.getAddress)((0, I.hexZeroPad)(e.readValue().toHexString(), 20)); };
            return U;
        }(R));
        var D = (function (_super) {
            __extends(D, _super);
            function D(e) {
                var _this = this;
                _this = _super.call(this, e.name, e.type, void 0, e.dynamic) || this, _this.coder = e;
                return _this;
            }
            D.prototype.defaultValue = function () { return this.coder.defaultValue(); };
            D.prototype.encode = function (e, t) { return this.coder.encode(e, t); };
            D.prototype.decode = function (e) { return this.coder.decode(e); };
            return D;
        }(R));
        var F = new o.Logger(s);
        function j(e, t, r) { var n = null; if (Array.isArray(r))
            n = r;
        else if (r && "object" == typeof r) {
            var e_2 = {};
            n = t.map((function (t) { var n = t.localName; return n || F.throwError("cannot encode object for signature with missing names", o.Logger.errors.INVALID_ARGUMENT, { argument: "values", coder: t, value: r }), e_2[n] && F.throwError("cannot encode object for signature with duplicate names", o.Logger.errors.INVALID_ARGUMENT, { argument: "values", coder: t, value: r }), e_2[n] = !0, r[n]; }));
        }
        else
            F.throwArgumentError("invalid tuple value", "tuple", r); t.length !== n.length && F.throwArgumentError("types/value length mismatch", "tuple", r); var i = new C(e.wordSize), s = new C(e.wordSize), a = []; t.forEach((function (e, t) { var r = n[t]; if (e.dynamic) {
            var t_2 = s.length;
            e.encode(s, r);
            var n_2 = i.writeUpdatableValue();
            a.push((function (e) { n_2(e + t_2); }));
        }
        else
            e.encode(i, r); })), a.forEach((function (e) { e(i.length); })); var c = e.appendWriter(i); return c += e.appendWriter(s), c; }
        function H(e, t) { var r = [], n = e.subReader(0); t.forEach((function (t) { var i = null; if (t.dynamic) {
            var r_3 = e.readValue(), s_1 = n.subReader(r_3.toNumber());
            try {
                i = t.decode(s_1);
            }
            catch (e) {
                if (e.code === o.Logger.errors.BUFFER_OVERRUN)
                    throw e;
                i = e, i.baseType = t.name, i.name = t.localName, i.type = t.type;
            }
        }
        else
            try {
                i = t.decode(e);
            }
            catch (e) {
                if (e.code === o.Logger.errors.BUFFER_OVERRUN)
                    throw e;
                i = e, i.baseType = t.name, i.name = t.localName, i.type = t.type;
            } null != i && r.push(i); })); var i = t.reduce((function (e, t) { var r = t.localName; return r && (e[r] || (e[r] = 0), e[r]++), e; }), {}); t.forEach((function (e, t) { var n = e.localName; if (!n || 1 !== i[n])
            return; if ("length" === n && (n = "_length"), null != r[n])
            return; var o = r[t]; o instanceof Error ? Object.defineProperty(r, n, { enumerable: !0, get: function () { throw o; } }) : r[n] = o; })); var _loop_1 = function (e_3) {
            var t_3 = r[e_3];
            t_3 instanceof Error && Object.defineProperty(r, e_3, { enumerable: !0, get: function () { throw t_3; } });
        }; for (var e_3 = 0; e_3 < r.length; e_3++) {
            _loop_1(e_3);
        } return Object.freeze(r); }
        var V = (function (_super) {
            __extends(V, _super);
            function V(e, t, r) {
                var _this = this;
                _this = _super.call(this, "array", e.type + "[" + (t >= 0 ? t : "") + "]", r, -1 === t || e.dynamic) || this, _this.coder = e, _this.length = t;
                return _this;
            }
            V.prototype.defaultValue = function () { var e = this.coder.defaultValue(), t = []; for (var r_4 = 0; r_4 < this.length; r_4++)
                t.push(e); return t; };
            V.prototype.encode = function (e, t) { Array.isArray(t) || this._throwError("expected array value", t); var r = this.length; -1 === r && (r = t.length, e.writeValue(t.length)), F.checkArgumentCount(t.length, r, "coder array" + (this.localName ? " " + this.localName : "")); var n = []; for (var e_4 = 0; e_4 < t.length; e_4++)
                n.push(this.coder); return j(e, n, t); };
            V.prototype.decode = function (e) { var t = this.length; -1 === t && (t = e.readValue().toNumber(), 32 * t > e._data.length && F.throwError("insufficient data length", o.Logger.errors.BUFFER_OVERRUN, { length: e._data.length, count: t })); var r = []; for (var e_5 = 0; e_5 < t; e_5++)
                r.push(new D(this.coder)); return e.coerce(this.name, H(e, r)); };
            return V;
        }(R));
        var z = (function (_super) {
            __extends(z, _super);
            function z(e) {
                return _super.call(this, "bool", "bool", e, !1) || this;
            }
            z.prototype.defaultValue = function () { return !1; };
            z.prototype.encode = function (e, t) { return e.writeValue(t ? 1 : 0); };
            z.prototype.decode = function (e) { return e.coerce(this.type, !e.readValue().isZero()); };
            return z;
        }(R));
        var G = (function (_super) {
            __extends(G, _super);
            function G(e, t) {
                return _super.call(this, e, e, t, !0) || this;
            }
            G.prototype.defaultValue = function () { return "0x"; };
            G.prototype.encode = function (e, t) { t = (0, I.arrayify)(t); var r = e.writeValue(t.length); return r += e.writeBytes(t), r; };
            G.prototype.decode = function (e) { return e.readBytes(e.readValue().toNumber(), !0); };
            return G;
        }(R));
        var q = (function (_super) {
            __extends(q, _super);
            function q(e) {
                return _super.call(this, "bytes", e) || this;
            }
            q.prototype.decode = function (e) { return e.coerce(this.name, (0, I.hexlify)(_super.prototype.decode.call(this, e))); };
            return q;
        }(G));
        var K = (function (_super) {
            __extends(K, _super);
            function K(e, t) {
                var _this = this;
                var r = "bytes" + String(e);
                _this = _super.call(this, r, r, t, !1) || this, _this.size = e;
                return _this;
            }
            K.prototype.defaultValue = function () { return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + 2 * this.size); };
            K.prototype.encode = function (e, t) { var r = (0, I.arrayify)(t); return r.length !== this.size && this._throwError("incorrect data length", t), e.writeBytes(r); };
            K.prototype.decode = function (e) { return e.coerce(this.name, (0, I.hexlify)(e.readBytes(this.size))); };
            return K;
        }(R));
        var W = (function (_super) {
            __extends(W, _super);
            function W(e) {
                return _super.call(this, "null", "", e, !1) || this;
            }
            W.prototype.defaultValue = function () { return null; };
            W.prototype.encode = function (e, t) { return null != t && this._throwError("not null", t), e.writeBytes([]); };
            W.prototype.decode = function (e) { return e.readBytes(0), e.coerce(this.name, null); };
            return W;
        }(R));
        var $ = r(1046);
        var J = (function (_super) {
            __extends(J, _super);
            function J(e, t, r) {
                var _this = this;
                var n = (t ? "int" : "uint") + 8 * e;
                _this = _super.call(this, n, n, r, !1) || this, _this.size = e, _this.signed = t;
                return _this;
            }
            J.prototype.defaultValue = function () { return 0; };
            J.prototype.encode = function (e, t) { var r = n.O$.from(t), i = $.Bz.mask(8 * e.wordSize); if (this.signed) {
                var e_6 = i.mask(8 * this.size - 1);
                (r.gt(e_6) || r.lt(e_6.add($.fh).mul($.tL))) && this._throwError("value out-of-bounds", t);
            }
            else
                (r.lt($._Y) || r.gt(i.mask(8 * this.size))) && this._throwError("value out-of-bounds", t); return r = r.toTwos(8 * this.size).mask(8 * this.size), this.signed && (r = r.fromTwos(8 * this.size).toTwos(8 * e.wordSize)), e.writeValue(r); };
            J.prototype.decode = function (e) { var t = e.readValue().mask(8 * this.size); return this.signed && (t = t.fromTwos(8 * this.size)), e.coerce(this.name, t); };
            return J;
        }(R));
        var Z = r(4242);
        var X = (function (_super) {
            __extends(X, _super);
            function X(e) {
                return _super.call(this, "string", e) || this;
            }
            X.prototype.defaultValue = function () { return ""; };
            X.prototype.encode = function (e, t) { return _super.prototype.encode.call(this, e, (0, Z.Y0)(t)); };
            X.prototype.decode = function (e) { return (0, Z.ZN)(_super.prototype.decode.call(this, e)); };
            return X;
        }(G));
        var Y = (function (_super) {
            __extends(Y, _super);
            function Y(e, t) {
                var _this = this;
                var r = !1;
                var n = [];
                e.forEach((function (e) { e.dynamic && (r = !0), n.push(e.type); })), _this = _super.call(this, "tuple", "tuple(" + n.join(",") + ")", t, r) || this, _this.coders = e;
                return _this;
            }
            Y.prototype.defaultValue = function () { var e = []; this.coders.forEach((function (t) { e.push(t.defaultValue()); })); var t = this.coders.reduce((function (e, t) { var r = t.localName; return r && (e[r] || (e[r] = 0), e[r]++), e; }), {}); return this.coders.forEach((function (r, n) { var i = r.localName; i && 1 === t[i] && ("length" === i && (i = "_length"), null == e[i] && (e[i] = e[n])); })), Object.freeze(e); };
            Y.prototype.encode = function (e, t) { return j(e, this.coders, t); };
            Y.prototype.decode = function (e) { return e.coerce(this.name, H(e, this.coders)); };
            return Y;
        }(R));
        var Q = new o.Logger(s), ee = new RegExp(/^bytes([0-9]*)$/), te = new RegExp(/^(u?int)([0-9]*)$/);
        var re = (function () {
            function re(e) {
                var _newTarget = this.constructor;
                Q.checkNew(_newTarget, re), (0, i.defineReadOnly)(this, "coerceFunc", e || null);
            }
            re.prototype._getCoder = function (e) {
                var _this = this;
                switch (e.baseType) {
                    case "address": return new U(e.name);
                    case "bool": return new z(e.name);
                    case "string": return new X(e.name);
                    case "bytes": return new q(e.name);
                    case "array": return new V(this._getCoder(e.arrayChildren), e.arrayLength, e.name);
                    case "tuple": return new Y((e.components || []).map((function (e) { return _this._getCoder(e); })), e.name);
                    case "": return new W(e.name);
                }
                var t = e.type.match(te);
                if (t) {
                    var r_5 = parseInt(t[2] || "256");
                    return (0 === r_5 || r_5 > 256 || r_5 % 8 != 0) && Q.throwArgumentError("invalid " + t[1] + " bit length", "param", e), new J(r_5 / 8, "int" === t[1], e.name);
                }
                if (t = e.type.match(ee), t) {
                    var r_6 = parseInt(t[1]);
                    return (0 === r_6 || r_6 > 32) && Q.throwArgumentError("invalid bytes length", "param", e), new K(r_6, e.name);
                }
                return Q.throwArgumentError("invalid type", "type", e.type);
            };
            re.prototype._getWordSize = function () { return 32; };
            re.prototype._getReader = function (e, t) { return new M(e, this._getWordSize(), this.coerceFunc, t); };
            re.prototype._getWriter = function () { return new C(this._getWordSize()); };
            re.prototype.getDefaultValue = function (e) {
                var _this = this;
                var t = e.map((function (e) { return _this._getCoder(g.from(e)); }));
                return new Y(t, "_").defaultValue();
            };
            re.prototype.encode = function (e, t) {
                var _this = this;
                e.length !== t.length && Q.throwError("types/values length mismatch", o.Logger.errors.INVALID_ARGUMENT, { count: { types: e.length, values: t.length }, value: { types: e, values: t } });
                var r = e.map((function (e) { return _this._getCoder(g.from(e)); })), n = new Y(r, "_"), i = this._getWriter();
                return n.encode(i, t), i.data;
            };
            re.prototype.decode = function (e, t, r) {
                var _this = this;
                var n = e.map((function (e) { return _this._getCoder(g.from(e)); }));
                return new Y(n, "_").decode(this._getReader((0, I.arrayify)(t), r));
            };
            return re;
        }());
        var ne = new re;
        var ie = r(2046), oe = r(8197);
        var se = new o.Logger(s);
        var ae = (function (_super) {
            __extends(ae, _super);
            function ae() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ae;
        }(i.Description));
        var ce = (function (_super) {
            __extends(ce, _super);
            function ce() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ce;
        }(i.Description));
        var ue = (function (_super) {
            __extends(ue, _super);
            function ue() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ue;
        }(i.Description));
        var fe = (function (_super) {
            __extends(fe, _super);
            function fe() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            fe.isIndexed = function (e) { return !(!e || !e._isIndexed); };
            return fe;
        }(i.Description));
        var le = { "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: !0 }, "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] } };
        function he(e, t) { var r = new Error("deferred error during ABI decoding triggered accessing " + e); return r.error = t, r; }
        var de = (function () {
            function de(e) {
                var _newTarget = this.constructor;
                var _this = this;
                se.checkNew(_newTarget, de);
                var t = [];
                t = "string" == typeof e ? JSON.parse(e) : e, (0, i.defineReadOnly)(this, "fragments", t.map((function (e) { return y.from(e); })).filter((function (e) { return null != e; }))), (0, i.defineReadOnly)(this, "_abiCoder", (0, i.getStatic)(_newTarget, "getAbiCoder")()), (0, i.defineReadOnly)(this, "functions", {}), (0, i.defineReadOnly)(this, "errors", {}), (0, i.defineReadOnly)(this, "events", {}), (0, i.defineReadOnly)(this, "structs", {}), this.fragments.forEach((function (e) { var t = null; switch (e.type) {
                    case "constructor": return _this.deploy ? void se.warn("duplicate definition - constructor") : void (0, i.defineReadOnly)(_this, "deploy", e);
                    case "function":
                        t = _this.functions;
                        break;
                    case "event":
                        t = _this.events;
                        break;
                    case "error":
                        t = _this.errors;
                        break;
                    default: return;
                } var r = e.format(); t[r] ? se.warn("duplicate definition - " + r) : t[r] = e; })), this.deploy || (0, i.defineReadOnly)(this, "deploy", S.from({ payable: !1, type: "constructor" })), (0, i.defineReadOnly)(this, "_isInterface", !0);
            }
            de.prototype.format = function (e) { e || (e = d.full), e === d.sighash && se.throwArgumentError("interface does not support formatting sighash", "format", e); var t = this.fragments.map((function (t) { return t.format(e); })); return e === d.json ? JSON.stringify(t.map((function (e) { return JSON.parse(e); }))) : t; };
            de.getAbiCoder = function () { return ne; };
            de.getAddress = function (e) { return (0, L.getAddress)(e); };
            de.getSighash = function (e) { return (0, I.hexDataSlice)((0, ie.id)(e.format()), 0, 4); };
            de.getEventTopic = function (e) { return (0, ie.id)(e.format()); };
            de.prototype.getFunction = function (e) { if ((0, I.isHexString)(e)) {
                for (var t_4 in this.functions)
                    if (e === this.getSighash(t_4))
                        return this.functions[t_4];
                se.throwArgumentError("no matching function", "sighash", e);
            } if (-1 === e.indexOf("(")) {
                var t_5 = e.trim(), r_7 = Object.keys(this.functions).filter((function (e) { return e.split("(")[0] === t_5; }));
                return 0 === r_7.length ? se.throwArgumentError("no matching function", "name", t_5) : r_7.length > 1 && se.throwArgumentError("multiple matching functions", "name", t_5), this.functions[r_7[0]];
            } var t = this.functions[E.fromString(e).format()]; return t || se.throwArgumentError("no matching function", "signature", e), t; };
            de.prototype.getEvent = function (e) { if ((0, I.isHexString)(e)) {
                var t_6 = e.toLowerCase();
                for (var e_7 in this.events)
                    if (t_6 === this.getEventTopic(e_7))
                        return this.events[e_7];
                se.throwArgumentError("no matching event", "topichash", t_6);
            } if (-1 === e.indexOf("(")) {
                var t_7 = e.trim(), r_8 = Object.keys(this.events).filter((function (e) { return e.split("(")[0] === t_7; }));
                return 0 === r_8.length ? se.throwArgumentError("no matching event", "name", t_7) : r_8.length > 1 && se.throwArgumentError("multiple matching events", "name", t_7), this.events[r_8[0]];
            } var t = this.events[b.fromString(e).format()]; return t || se.throwArgumentError("no matching event", "signature", e), t; };
            de.prototype.getError = function (e) { if ((0, I.isHexString)(e)) {
                var t_8 = (0, i.getStatic)(this.constructor, "getSighash");
                for (var r_9 in this.errors)
                    if (e === t_8(this.errors[r_9]))
                        return this.errors[r_9];
                se.throwArgumentError("no matching error", "sighash", e);
            } if (-1 === e.indexOf("(")) {
                var t_9 = e.trim(), r_10 = Object.keys(this.errors).filter((function (e) { return e.split("(")[0] === t_9; }));
                return 0 === r_10.length ? se.throwArgumentError("no matching error", "name", t_9) : r_10.length > 1 && se.throwArgumentError("multiple matching errors", "name", t_9), this.errors[r_10[0]];
            } var t = this.errors[E.fromString(e).format()]; return t || se.throwArgumentError("no matching error", "signature", e), t; };
            de.prototype.getSighash = function (e) { if ("string" == typeof e)
                try {
                    e = this.getFunction(e);
                }
                catch (t) {
                    try {
                        e = this.getError(e);
                    }
                    catch (e) {
                        throw t;
                    }
                } return (0, i.getStatic)(this.constructor, "getSighash")(e); };
            de.prototype.getEventTopic = function (e) { return "string" == typeof e && (e = this.getEvent(e)), (0, i.getStatic)(this.constructor, "getEventTopic")(e); };
            de.prototype._decodeParams = function (e, t) { return this._abiCoder.decode(e, t); };
            de.prototype._encodeParams = function (e, t) { return this._abiCoder.encode(e, t); };
            de.prototype.encodeDeploy = function (e) { return this._encodeParams(this.deploy.inputs, e || []); };
            de.prototype.decodeErrorResult = function (e, t) { "string" == typeof e && (e = this.getError(e)); var r = (0, I.arrayify)(t); return (0, I.hexlify)(r.slice(0, 4)) !== this.getSighash(e) && se.throwArgumentError("data signature does not match error " + e.name + ".", "data", (0, I.hexlify)(r)), this._decodeParams(e.inputs, r.slice(4)); };
            de.prototype.encodeErrorResult = function (e, t) { return "string" == typeof e && (e = this.getError(e)), (0, I.hexlify)((0, I.concat)([this.getSighash(e), this._encodeParams(e.inputs, t || [])])); };
            de.prototype.decodeFunctionData = function (e, t) { "string" == typeof e && (e = this.getFunction(e)); var r = (0, I.arrayify)(t); return (0, I.hexlify)(r.slice(0, 4)) !== this.getSighash(e) && se.throwArgumentError("data signature does not match function " + e.name + ".", "data", (0, I.hexlify)(r)), this._decodeParams(e.inputs, r.slice(4)); };
            de.prototype.encodeFunctionData = function (e, t) { return "string" == typeof e && (e = this.getFunction(e)), (0, I.hexlify)((0, I.concat)([this.getSighash(e), this._encodeParams(e.inputs, t || [])])); };
            de.prototype.decodeFunctionResult = function (e, t) { "string" == typeof e && (e = this.getFunction(e)); var r = (0, I.arrayify)(t), n = null, i = null, s = null, a = null; switch (r.length % this._abiCoder._getWordSize()) {
                case 0:
                    try {
                        return this._abiCoder.decode(e.outputs, r);
                    }
                    catch (e) { }
                    break;
                case 4: {
                    var e_8 = (0, I.hexlify)(r.slice(0, 4)), t_10 = le[e_8];
                    if (t_10)
                        i = this._abiCoder.decode(t_10.inputs, r.slice(4)), s = t_10.name, a = t_10.signature, t_10.reason && (n = i[0]);
                    else
                        try {
                            var t_11 = this.getError(e_8);
                            i = this._abiCoder.decode(t_11.inputs, r.slice(4)), s = t_11.name, a = t_11.format();
                        }
                        catch (e) {
                            console.log(e);
                        }
                    break;
                }
            } return se.throwError("call revert exception", o.Logger.errors.CALL_EXCEPTION, { method: e.format(), errorArgs: i, errorName: s, errorSignature: a, reason: n }); };
            de.prototype.encodeFunctionResult = function (e, t) { return "string" == typeof e && (e = this.getFunction(e)), (0, I.hexlify)(this._abiCoder.encode(e.outputs, t || [])); };
            de.prototype.encodeFilterTopics = function (e, t) {
                var _this = this;
                "string" == typeof e && (e = this.getEvent(e)), t.length > e.inputs.length && se.throwError("too many arguments for " + e.format(), o.Logger.errors.UNEXPECTED_ARGUMENT, { argument: "values", value: t });
                var r = [];
                e.anonymous || r.push(this.getEventTopic(e));
                var n = function (e, t) { return "string" === e.type ? (0, ie.id)(t) : "bytes" === e.type ? (0, oe.keccak256)((0, I.hexlify)(t)) : ("address" === e.type && _this._abiCoder.encode(["address"], [t]), (0, I.hexZeroPad)((0, I.hexlify)(t), 32)); };
                for (t.forEach((function (t, i) { var o = e.inputs[i]; o.indexed ? null == t ? r.push(null) : "array" === o.baseType || "tuple" === o.baseType ? se.throwArgumentError("filtering with tuples or arrays not supported", "contract." + o.name, t) : Array.isArray(t) ? r.push(t.map((function (e) { return n(o, e); }))) : r.push(n(o, t)) : null != t && se.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + o.name, t); })); r.length && null === r[r.length - 1];)
                    r.pop();
                return r;
            };
            de.prototype.encodeEventLog = function (e, t) {
                var _this = this;
                "string" == typeof e && (e = this.getEvent(e));
                var r = [], n = [], i = [];
                return e.anonymous || r.push(this.getEventTopic(e)), t.length !== e.inputs.length && se.throwArgumentError("event arguments/values mismatch", "values", t), e.inputs.forEach((function (e, o) { var s = t[o]; if (e.indexed)
                    if ("string" === e.type)
                        r.push((0, ie.id)(s));
                    else if ("bytes" === e.type)
                        r.push((0, oe.keccak256)(s));
                    else {
                        if ("tuple" === e.baseType || "array" === e.baseType)
                            throw new Error("not implemented");
                        r.push(_this._abiCoder.encode([e.type], [s]));
                    }
                else
                    n.push(e), i.push(s); })), { data: this._abiCoder.encode(n, i), topics: r };
            };
            de.prototype.decodeEventLog = function (e, t, r) { if ("string" == typeof e && (e = this.getEvent(e)), null != r && !e.anonymous) {
                var t_12 = this.getEventTopic(e);
                (0, I.isHexString)(r[0], 32) && r[0].toLowerCase() === t_12 || se.throwError("fragment/topic mismatch", o.Logger.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: t_12, value: r[0] }), r = r.slice(1);
            } var n = [], i = [], s = []; e.inputs.forEach((function (e, t) { e.indexed ? "string" === e.type || "bytes" === e.type || "tuple" === e.baseType || "array" === e.baseType ? (n.push(g.fromObject({ type: "bytes32", name: e.name })), s.push(!0)) : (n.push(e), s.push(!1)) : (i.push(e), s.push(!1)); })); var a = null != r ? this._abiCoder.decode(n, (0, I.concat)(r)) : null, c = this._abiCoder.decode(i, t, !0), u = [], f = 0, l = 0; e.inputs.forEach((function (e, t) { if (e.indexed)
                if (null == a)
                    u[t] = new fe({ _isIndexed: !0, hash: null });
                else if (s[t])
                    u[t] = new fe({ _isIndexed: !0, hash: a[l++] });
                else
                    try {
                        u[t] = a[l++];
                    }
                    catch (e) {
                        u[t] = e;
                    }
            else
                try {
                    u[t] = c[f++];
                }
                catch (e) {
                    u[t] = e;
                } if (e.name && null == u[e.name]) {
                var r_11 = u[t];
                r_11 instanceof Error ? Object.defineProperty(u, e.name, { enumerable: !0, get: function () { throw he("property " + JSON.stringify(e.name), r_11); } }) : u[e.name] = r_11;
            } })); var _loop_2 = function (e_9) {
                var t_13 = u[e_9];
                t_13 instanceof Error && Object.defineProperty(u, e_9, { enumerable: !0, get: function () { throw he("index " + e_9, t_13); } });
            }; for (var e_9 = 0; e_9 < u.length; e_9++) {
                _loop_2(e_9);
            } return Object.freeze(u); };
            de.prototype.parseTransaction = function (e) { var t = this.getFunction(e.data.substring(0, 10).toLowerCase()); return t ? new ce({ args: this._abiCoder.decode(t.inputs, "0x" + e.data.substring(10)), functionFragment: t, name: t.name, signature: t.format(), sighash: this.getSighash(t), value: n.O$.from(e.value || "0") }) : null; };
            de.prototype.parseLog = function (e) { var t = this.getEvent(e.topics[0]); return !t || t.anonymous ? null : new ae({ eventFragment: t, name: t.name, signature: t.format(), topic: this.getEventTopic(t), args: this.decodeEventLog(t, e.data, e.topics) }); };
            de.prototype.parseError = function (e) { var t = (0, I.hexlify)(e); var r = this.getError(t.substring(0, 10).toLowerCase()); return r ? new ue({ args: this._abiCoder.decode(r.inputs, "0x" + t.substring(10)), errorFragment: r, name: r.name, signature: r.format(), sighash: this.getSighash(r) }) : null; };
            de.isInterface = function (e) { return !(!e || !e._isInterface); };
            return de;
        }());
    }, 4353: function (e, t, r) {
        "use strict";
        r.d(t, { Sg: function () { return a; }, zt: function () { return c; } });
        var n = r(2593), i = r(3587), o = r(711);
        var s = new o.Logger("abstract-provider/5.5.1");
        var a = (function (_super) {
            __extends(a, _super);
            function a() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            a.isForkEvent = function (e) { return !(!e || !e._isForkEvent); };
            return a;
        }(i.Description));
        var c = (function () {
            function c() {
                var _newTarget = this.constructor;
                s.checkAbstract(_newTarget, c), (0, i.defineReadOnly)(this, "_isProvider", !0);
            }
            c.prototype.getFeeData = function () { return e = this, t = void 0, o = function () { var _a, e, t, r, o; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, (0, i.resolveProperties)({ block: this.getBlock("latest"), gasPrice: this.getGasPrice().catch((function (e) { return null; })) })];
                    case 1:
                        _a = _b.sent(), e = _a.block, t = _a.gasPrice;
                        r = null, o = null;
                        return [2, (e && e.baseFeePerGas && (o = n.O$.from("2500000000"), r = e.baseFeePerGas.mul(2).add(o)), { maxFeePerGas: r, maxPriorityFeePerGas: o, gasPrice: t })];
                }
            }); }, new ((r = void 0) || (r = Promise))((function (n, i) { function s(e) { try {
                c(o.next(e));
            }
            catch (e) {
                i(e);
            } } function a(e) { try {
                c(o.throw(e));
            }
            catch (e) {
                i(e);
            } } function c(e) { var t; e.done ? n(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(s, a); } c((o = o.apply(e, t || [])).next()); })); var e, t, r, o; };
            c.prototype.addListener = function (e, t) { return this.on(e, t); };
            c.prototype.removeListener = function (e, t) { return this.off(e, t); };
            c.isProvider = function (e) { return !(!e || !e._isProvider); };
            return c;
        }());
    }, 8171: function (e, t, r) {
        "use strict";
        r.d(t, { E: function () { return u; } });
        var n = r(3587), i = r(711), o = function (e, t, r, n) { return new (r || (r = Promise))((function (i, o) { function s(e) { try {
            c(n.next(e));
        }
        catch (e) {
            o(e);
        } } function a(e) { try {
            c(n.throw(e));
        }
        catch (e) {
            o(e);
        } } function c(e) { var t; e.done ? i(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(s, a); } c((n = n.apply(e, t || [])).next()); })); };
        var s = new i.Logger("abstract-signer/5.5.0"), a = ["accessList", "chainId", "customData", "data", "from", "gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "to", "type", "value"], c = [i.Logger.errors.INSUFFICIENT_FUNDS, i.Logger.errors.NONCE_EXPIRED, i.Logger.errors.REPLACEMENT_UNDERPRICED];
        var u = (function () {
            function u() {
                var _newTarget = this.constructor;
                s.checkAbstract(_newTarget, u), (0, n.defineReadOnly)(this, "_isSigner", !0);
            }
            u.prototype.getBalance = function (e) { return o(this, void 0, void 0, (function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("getBalance");
                        return [4, this.provider.getBalance(this.getAddress(), e)];
                    case 1: return [2, _a.sent()];
                }
            }); })); };
            u.prototype.getTransactionCount = function (e) { return o(this, void 0, void 0, (function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("getTransactionCount");
                        return [4, this.provider.getTransactionCount(this.getAddress(), e)];
                    case 1: return [2, _a.sent()];
                }
            }); })); };
            u.prototype.estimateGas = function (e) { return o(this, void 0, void 0, (function () { var t; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("estimateGas");
                        return [4, (0, n.resolveProperties)(this.checkTransaction(e))];
                    case 1:
                        t = _a.sent();
                        return [4, this.provider.estimateGas(t)];
                    case 2: return [2, _a.sent()];
                }
            }); })); };
            u.prototype.call = function (e, t) { return o(this, void 0, void 0, (function () { var r; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("call");
                        return [4, (0, n.resolveProperties)(this.checkTransaction(e))];
                    case 1:
                        r = _a.sent();
                        return [4, this.provider.call(r, t)];
                    case 2: return [2, _a.sent()];
                }
            }); })); };
            u.prototype.sendTransaction = function (e) { return o(this, void 0, void 0, (function () { var t, r; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("sendTransaction");
                        return [4, this.populateTransaction(e)];
                    case 1:
                        t = _a.sent();
                        return [4, this.signTransaction(t)];
                    case 2:
                        r = _a.sent();
                        return [4, this.provider.sendTransaction(r)];
                    case 3: return [2, _a.sent()];
                }
            }); })); };
            u.prototype.getChainId = function () { return o(this, void 0, void 0, (function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("getChainId");
                        return [4, this.provider.getNetwork()];
                    case 1: return [2, (_a.sent()).chainId];
                }
            }); })); };
            u.prototype.getGasPrice = function () { return o(this, void 0, void 0, (function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("getGasPrice");
                        return [4, this.provider.getGasPrice()];
                    case 1: return [2, _a.sent()];
                }
            }); })); };
            u.prototype.getFeeData = function () { return o(this, void 0, void 0, (function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("getFeeData");
                        return [4, this.provider.getFeeData()];
                    case 1: return [2, _a.sent()];
                }
            }); })); };
            u.prototype.resolveName = function (e) { return o(this, void 0, void 0, (function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("resolveName");
                        return [4, this.provider.resolveName(e)];
                    case 1: return [2, _a.sent()];
                }
            }); })); };
            u.prototype.checkTransaction = function (e) { for (var t_14 in e)
                -1 === a.indexOf(t_14) && s.throwArgumentError("invalid transaction key: " + t_14, "transaction", e); var t = (0, n.shallowCopy)(e); return null == t.from ? t.from = this.getAddress() : t.from = Promise.all([Promise.resolve(t.from), this.getAddress()]).then((function (t) { return (t[0].toLowerCase() !== t[1].toLowerCase() && s.throwArgumentError("from address mismatch", "transaction", e), t[0]); })), t; };
            u.prototype.populateTransaction = function (e) { return o(this, void 0, void 0, (function () {
                var t, r, e_10, e_11;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, (0, n.resolveProperties)(this.checkTransaction(e))];
                        case 1:
                            t = _a.sent();
                            null != t.to && (t.to = Promise.resolve(t.to).then((function (e) { return o(_this, void 0, void 0, (function () { var t; return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (null == e)
                                            return [2, null];
                                        return [4, this.resolveName(e)];
                                    case 1:
                                        t = _a.sent();
                                        return [2, (null == t && s.throwArgumentError("provided ENS name resolves to null", "tx.to", e), t)];
                                }
                            }); })); })), t.to.catch((function (e) { })));
                            r = null != t.maxFeePerGas || null != t.maxPriorityFeePerGas;
                            if (!(null == t.gasPrice || 2 !== t.type && !r ? 0 !== t.type && 1 !== t.type || !r || s.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", e) : s.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", e), 2 !== t.type && null != t.type || null == t.maxFeePerGas || null == t.maxPriorityFeePerGas)) return [3, 5];
                            if (!(0 === t.type || 1 === t.type)) return [3, 2];
                            null == t.gasPrice && (t.gasPrice = this.getGasPrice());
                            return [3, 4];
                        case 2: return [4, this.getFeeData()];
                        case 3:
                            e_10 = _a.sent();
                            if (null == t.type)
                                if (null != e_10.maxFeePerGas && null != e_10.maxPriorityFeePerGas)
                                    if (t.type = 2, null != t.gasPrice) {
                                        e_11 = t.gasPrice;
                                        delete t.gasPrice, t.maxFeePerGas = e_11, t.maxPriorityFeePerGas = e_11;
                                    }
                                    else
                                        null == t.maxFeePerGas && (t.maxFeePerGas = e_10.maxFeePerGas), null == t.maxPriorityFeePerGas && (t.maxPriorityFeePerGas = e_10.maxPriorityFeePerGas);
                                else
                                    null != e_10.gasPrice ? (r && s.throwError("network does not support EIP-1559", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "populateTransaction" }), null == t.gasPrice && (t.gasPrice = e_10.gasPrice), t.type = 0) : s.throwError("failed to get consistent fee data", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "signer.getFeeData" });
                            else
                                2 === t.type && (null == t.maxFeePerGas && (t.maxFeePerGas = e_10.maxFeePerGas), null == t.maxPriorityFeePerGas && (t.maxPriorityFeePerGas = e_10.maxPriorityFeePerGas));
                            _a.label = 4;
                        case 4: return [3, 6];
                        case 5:
                            t.type = 2;
                            _a.label = 6;
                        case 6:
                            null == t.nonce && (t.nonce = this.getTransactionCount("pending")), null == t.gasLimit && (t.gasLimit = this.estimateGas(t).catch((function (e) { if (c.indexOf(e.code) >= 0)
                                throw e; return s.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", i.Logger.errors.UNPREDICTABLE_GAS_LIMIT, { error: e, tx: t }); }))), null == t.chainId ? t.chainId = this.getChainId() : t.chainId = Promise.all([Promise.resolve(t.chainId), this.getChainId()]).then((function (t) { return (0 !== t[1] && t[0] !== t[1] && s.throwArgumentError("chainId address mismatch", "transaction", e), t[0]); }));
                            return [4, (0, n.resolveProperties)(t)];
                        case 7: return [2, _a.sent()];
                    }
                });
            })); };
            u.prototype._checkProvider = function (e) { this.provider || s.throwError("missing provider", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: e || "_checkProvider" }); };
            u.isSigner = function (e) { return !(!e || !e._isSigner); };
            return u;
        }());
    }, 4594: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { getAddress: function () { return d; }, getContractAddress: function () { return m; }, getCreate2Address: function () { return y; }, getIcapAddress: function () { return g; }, isAddress: function () { return p; } });
        var n = r(3286), i = r(2593), o = r(8197), s = r(1843);
        var a = new (r(711).Logger)("address/5.5.0");
        function c(e) { (0, n.isHexString)(e, 20) || a.throwArgumentError("invalid address", "address", e); var t = (e = e.toLowerCase()).substring(2).split(""), r = new Uint8Array(40); for (var e_12 = 0; e_12 < 40; e_12++)
            r[e_12] = t[e_12].charCodeAt(0); var i = (0, n.arrayify)((0, o.keccak256)(r)); for (var e_13 = 0; e_13 < 40; e_13 += 2)
            i[e_13 >> 1] >> 4 >= 8 && (t[e_13] = t[e_13].toUpperCase()), (15 & i[e_13 >> 1]) >= 8 && (t[e_13 + 1] = t[e_13 + 1].toUpperCase()); return "0x" + t.join(""); }
        var u = {};
        for (var e_14 = 0; e_14 < 10; e_14++)
            u[String(e_14)] = String(e_14);
        for (var e_15 = 0; e_15 < 26; e_15++)
            u[String.fromCharCode(65 + e_15)] = String(10 + e_15);
        var f = Math.floor((l = 9007199254740991, Math.log10 ? Math.log10(l) : Math.log(l) / Math.LN10));
        var l;
        function h(e) { var t = (e = (e = e.toUpperCase()).substring(4) + e.substring(0, 2) + "00").split("").map((function (e) { return u[e]; })).join(""); for (; t.length >= f;) {
            var e_16 = t.substring(0, f);
            t = parseInt(e_16, 10) % 97 + t.substring(e_16.length);
        } var r = String(98 - parseInt(t, 10) % 97); for (; r.length < 2;)
            r = "0" + r; return r; }
        function d(e) { var t = null; if ("string" != typeof e && a.throwArgumentError("invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/))
            "0x" !== e.substring(0, 2) && (e = "0x" + e), t = c(e), e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && t !== e && a.throwArgumentError("bad address checksum", "address", e);
        else if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
            for (e.substring(2, 4) !== h(e) && a.throwArgumentError("bad icap checksum", "address", e), t = (0, i.g$)(e.substring(4)); t.length < 40;)
                t = "0" + t;
            t = c("0x" + t);
        }
        else
            a.throwArgumentError("invalid address", "address", e); return t; }
        function p(e) { try {
            return d(e), !0;
        }
        catch (e) { } return !1; }
        function g(e) { var t = (0, i.t2)(d(e).substring(2)).toUpperCase(); for (; t.length < 30;)
            t = "0" + t; return "XE" + h("XE00" + t) + t; }
        function m(e) { var t = null; try {
            t = d(e.from);
        }
        catch (t) {
            a.throwArgumentError("missing from address", "transaction", e);
        } var r = (0, n.stripZeros)((0, n.arrayify)(i.O$.from(e.nonce).toHexString())); return d((0, n.hexDataSlice)((0, o.keccak256)((0, s.encode)([t, r])), 12)); }
        function y(e, t, r) { return 32 !== (0, n.hexDataLength)(t) && a.throwArgumentError("salt must be 32 bytes", "salt", t), 32 !== (0, n.hexDataLength)(r) && a.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", r), d((0, n.hexDataSlice)((0, o.keccak256)((0, n.concat)(["0xff", d(e), t, r])), 12)); }
    }, 9567: function (e, t, r) {
        "use strict";
        r.d(t, { J: function () { return i; }, c: function () { return o; } });
        var n = r(3286);
        function i(e) { e = atob(e); var t = []; for (var r_12 = 0; r_12 < e.length; r_12++)
            t.push(e.charCodeAt(r_12)); return (0, n.arrayify)(t); }
        function o(e) { e = (0, n.arrayify)(e); var t = ""; for (var r_13 = 0; r_13 < e.length; r_13++)
            t += String.fromCharCode(e[r_13]); return btoa(t); }
    }, 4089: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { decode: function () { return n.J; }, encode: function () { return n.c; } });
        var n = r(9567);
    }, 7727: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { BaseX: function () { return o; }, Base32: function () { return s; }, Base58: function () { return a; } });
        var n = r(3286), i = r(3587);
        var o = (function () {
            function o(e) {
                (0, i.defineReadOnly)(this, "alphabet", e), (0, i.defineReadOnly)(this, "base", e.length), (0, i.defineReadOnly)(this, "_alphabetMap", {}), (0, i.defineReadOnly)(this, "_leader", e.charAt(0));
                for (var t_15 = 0; t_15 < e.length; t_15++)
                    this._alphabetMap[e.charAt(t_15)] = t_15;
            }
            o.prototype.encode = function (e) { var t = (0, n.arrayify)(e); if (0 === t.length)
                return ""; var r = [0]; for (var e_17 = 0; e_17 < t.length; ++e_17) {
                var n_3 = t[e_17];
                for (var e_18 = 0; e_18 < r.length; ++e_18)
                    n_3 += r[e_18] << 8, r[e_18] = n_3 % this.base, n_3 = n_3 / this.base | 0;
                for (; n_3 > 0;)
                    r.push(n_3 % this.base), n_3 = n_3 / this.base | 0;
            } var i = ""; for (var e_19 = 0; 0 === t[e_19] && e_19 < t.length - 1; ++e_19)
                i += this._leader; for (var e_20 = r.length - 1; e_20 >= 0; --e_20)
                i += this.alphabet[r[e_20]]; return i; };
            o.prototype.decode = function (e) { if ("string" != typeof e)
                throw new TypeError("Expected String"); var t = []; if (0 === e.length)
                return new Uint8Array(t); t.push(0); for (var r_14 = 0; r_14 < e.length; r_14++) {
                var n_4 = this._alphabetMap[e[r_14]];
                if (void 0 === n_4)
                    throw new Error("Non-base" + this.base + " character");
                var i_3 = n_4;
                for (var e_21 = 0; e_21 < t.length; ++e_21)
                    i_3 += t[e_21] * this.base, t[e_21] = 255 & i_3, i_3 >>= 8;
                for (; i_3 > 0;)
                    t.push(255 & i_3), i_3 >>= 8;
            } for (var r_15 = 0; e[r_15] === this._leader && r_15 < e.length - 1; ++r_15)
                t.push(0); return (0, n.arrayify)(new Uint8Array(t.reverse())); };
            return o;
        }());
        var s = new o("abcdefghijklmnopqrstuvwxyz234567"), a = new o("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
    }, 8794: function (e, t, r) {
        "use strict";
        r.d(t, { i: function () { return n; } });
        var n = "bignumber/5.5.0";
    }, 2593: function (e, t, r) {
        "use strict";
        r.d(t, { Zm: function () { return h; }, O$: function () { return p; }, g$: function () { return v; }, t2: function () { return w; } });
        var n = r(3550), i = r.n(n), o = r(3286), s = r(711), a = r(8794), c = i().BN;
        var u = new s.Logger(a.i), f = {}, l = 9007199254740991;
        function h(e) { return null != e && (p.isBigNumber(e) || "number" == typeof e && e % 1 == 0 || "string" == typeof e && !!e.match(/^-?[0-9]+$/) || (0, o.isHexString)(e) || "bigint" == typeof e || (0, o.isBytes)(e)); }
        var d = !1;
        var p = (function () {
            function p(e, t) {
                var _newTarget = this.constructor;
                u.checkNew(_newTarget, p), e !== f && u.throwError("cannot call constructor directly; use BigNumber.from", s.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new (BigNumber)" }), this._hex = t, this._isBigNumber = !0, Object.freeze(this);
            }
            p.prototype.fromTwos = function (e) { return m(y(this).fromTwos(e)); };
            p.prototype.toTwos = function (e) { return m(y(this).toTwos(e)); };
            p.prototype.abs = function () { return "-" === this._hex[0] ? p.from(this._hex.substring(1)) : this; };
            p.prototype.add = function (e) { return m(y(this).add(y(e))); };
            p.prototype.sub = function (e) { return m(y(this).sub(y(e))); };
            p.prototype.div = function (e) { return p.from(e).isZero() && b("division by zero", "div"), m(y(this).div(y(e))); };
            p.prototype.mul = function (e) { return m(y(this).mul(y(e))); };
            p.prototype.mod = function (e) { var t = y(e); return t.isNeg() && b("cannot modulo negative values", "mod"), m(y(this).umod(t)); };
            p.prototype.pow = function (e) { var t = y(e); return t.isNeg() && b("cannot raise to negative values", "pow"), m(y(this).pow(t)); };
            p.prototype.and = function (e) { var t = y(e); return (this.isNegative() || t.isNeg()) && b("cannot 'and' negative values", "and"), m(y(this).and(t)); };
            p.prototype.or = function (e) { var t = y(e); return (this.isNegative() || t.isNeg()) && b("cannot 'or' negative values", "or"), m(y(this).or(t)); };
            p.prototype.xor = function (e) { var t = y(e); return (this.isNegative() || t.isNeg()) && b("cannot 'xor' negative values", "xor"), m(y(this).xor(t)); };
            p.prototype.mask = function (e) { return (this.isNegative() || e < 0) && b("cannot mask negative values", "mask"), m(y(this).maskn(e)); };
            p.prototype.shl = function (e) { return (this.isNegative() || e < 0) && b("cannot shift negative values", "shl"), m(y(this).shln(e)); };
            p.prototype.shr = function (e) { return (this.isNegative() || e < 0) && b("cannot shift negative values", "shr"), m(y(this).shrn(e)); };
            p.prototype.eq = function (e) { return y(this).eq(y(e)); };
            p.prototype.lt = function (e) { return y(this).lt(y(e)); };
            p.prototype.lte = function (e) { return y(this).lte(y(e)); };
            p.prototype.gt = function (e) { return y(this).gt(y(e)); };
            p.prototype.gte = function (e) { return y(this).gte(y(e)); };
            p.prototype.isNegative = function () { return "-" === this._hex[0]; };
            p.prototype.isZero = function () { return y(this).isZero(); };
            p.prototype.toNumber = function () { try {
                return y(this).toNumber();
            }
            catch (e) {
                b("overflow", "toNumber", this.toString());
            } return null; };
            p.prototype.toBigInt = function () { try {
                return BigInt(this.toString());
            }
            catch (e) { } return u.throwError("this platform does not support BigInt", s.Logger.errors.UNSUPPORTED_OPERATION, { value: this.toString() }); };
            p.prototype.toString = function () { return arguments.length > 0 && (10 === arguments[0] ? d || (d = !0, u.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : 16 === arguments[0] ? u.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", s.Logger.errors.UNEXPECTED_ARGUMENT, {}) : u.throwError("BigNumber.toString does not accept parameters", s.Logger.errors.UNEXPECTED_ARGUMENT, {})), y(this).toString(10); };
            p.prototype.toHexString = function () { return this._hex; };
            p.prototype.toJSON = function (e) { return { type: "BigNumber", hex: this.toHexString() }; };
            p.from = function (e) { if (e instanceof p)
                return e; if ("string" == typeof e)
                return e.match(/^-?0x[0-9a-f]+$/i) ? new p(f, g(e)) : e.match(/^-?[0-9]+$/) ? new p(f, g(new c(e))) : u.throwArgumentError("invalid BigNumber string", "value", e); if ("number" == typeof e)
                return e % 1 && b("underflow", "BigNumber.from", e), (e >= l || e <= -l) && b("overflow", "BigNumber.from", e), p.from(String(e)); var t = e; if ("bigint" == typeof t)
                return p.from(t.toString()); if ((0, o.isBytes)(t))
                return p.from((0, o.hexlify)(t)); if (t)
                if (t.toHexString) {
                    var e_22 = t.toHexString();
                    if ("string" == typeof e_22)
                        return p.from(e_22);
                }
                else {
                    var e_23 = t._hex;
                    if (null == e_23 && "BigNumber" === t.type && (e_23 = t.hex), "string" == typeof e_23 && ((0, o.isHexString)(e_23) || "-" === e_23[0] && (0, o.isHexString)(e_23.substring(1))))
                        return p.from(e_23);
                } return u.throwArgumentError("invalid BigNumber value", "value", e); };
            p.isBigNumber = function (e) { return !(!e || !e._isBigNumber); };
            return p;
        }());
        function g(e) { if ("string" != typeof e)
            return g(e.toString(16)); if ("-" === e[0])
            return "-" === (e = e.substring(1))[0] && u.throwArgumentError("invalid hex", "value", e), "0x00" === (e = g(e)) ? e : "-" + e; if ("0x" !== e.substring(0, 2) && (e = "0x" + e), "0x" === e)
            return "0x00"; for (e.length % 2 && (e = "0x0" + e.substring(2)); e.length > 4 && "0x00" === e.substring(0, 4);)
            e = "0x" + e.substring(4); return e; }
        function m(e) { return p.from(g(e)); }
        function y(e) { var t = p.from(e).toHexString(); return "-" === t[0] ? new c("-" + t.substring(3), 16) : new c(t.substring(2), 16); }
        function b(e, t, r) { var n = { fault: e, operation: t }; return null != r && (n.value = r), u.throwError(e, s.Logger.errors.NUMERIC_FAULT, n); }
        function v(e) { return new c(e, 36).toString(16); }
        function w(e) { return new c(e, 16).toString(36); }
    }, 3286: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { arrayify: function () { return u; }, concat: function () { return f; }, hexConcat: function () { return b; }, hexDataLength: function () { return m; }, hexDataSlice: function () { return y; }, hexStripZeros: function () { return w; }, hexValue: function () { return v; }, hexZeroPad: function () { return A; }, hexlify: function () { return g; }, isBytes: function () { return c; }, isBytesLike: function () { return s; }, isHexString: function () { return d; }, joinSignature: function () { return E; }, splitSignature: function () { return S; }, stripZeros: function () { return l; }, zeroPad: function () { return h; } });
        var n = new (r(711).Logger)("bytes/5.5.0");
        function i(e) { return !!e.toHexString; }
        function o(e) { return e.slice || (e.slice = function () { var t = Array.prototype.slice.call(arguments); return o(new Uint8Array(Array.prototype.slice.apply(e, t))); }), e; }
        function s(e) { return d(e) && !(e.length % 2) || c(e); }
        function a(e) { return "number" == typeof e && e == e && e % 1 == 0; }
        function c(e) { if (null == e)
            return !1; if (e.constructor === Uint8Array)
            return !0; if ("string" == typeof e)
            return !1; if (!a(e.length) || e.length < 0)
            return !1; for (var t_16 = 0; t_16 < e.length; t_16++) {
            var r_16 = e[t_16];
            if (!a(r_16) || r_16 < 0 || r_16 >= 256)
                return !1;
        } return !0; }
        function u(e, t) { if (t || (t = {}), "number" == typeof e) {
            n.checkSafeUint53(e, "invalid arrayify value");
            var t_17 = [];
            for (; e;)
                t_17.unshift(255 & e), e = parseInt(String(e / 256));
            return 0 === t_17.length && t_17.push(0), o(new Uint8Array(t_17));
        } if (t.allowMissingPrefix && "string" == typeof e && "0x" !== e.substring(0, 2) && (e = "0x" + e), i(e) && (e = e.toHexString()), d(e)) {
            var r_17 = e.substring(2);
            r_17.length % 2 && ("left" === t.hexPad ? r_17 = "0x0" + r_17.substring(2) : "right" === t.hexPad ? r_17 += "0" : n.throwArgumentError("hex data is odd-length", "value", e));
            var i_4 = [];
            for (var e_24 = 0; e_24 < r_17.length; e_24 += 2)
                i_4.push(parseInt(r_17.substring(e_24, e_24 + 2), 16));
            return o(new Uint8Array(i_4));
        } return c(e) ? o(new Uint8Array(e)) : n.throwArgumentError("invalid arrayify value", "value", e); }
        function f(e) { var t = e.map((function (e) { return u(e); })), r = t.reduce((function (e, t) { return e + t.length; }), 0), n = new Uint8Array(r); return t.reduce((function (e, t) { return (n.set(t, e), e + t.length); }), 0), o(n); }
        function l(e) { var t = u(e); if (0 === t.length)
            return t; var r = 0; for (; r < t.length && 0 === t[r];)
            r++; return r && (t = t.slice(r)), t; }
        function h(e, t) { (e = u(e)).length > t && n.throwArgumentError("value out of range", "value", arguments[0]); var r = new Uint8Array(t); return r.set(e, t - e.length), o(r); }
        function d(e, t) { return !("string" != typeof e || !e.match(/^0x[0-9A-Fa-f]*$/) || t && e.length !== 2 + 2 * t); }
        var p = "0123456789abcdef";
        function g(e, t) { if (t || (t = {}), "number" == typeof e) {
            n.checkSafeUint53(e, "invalid hexlify value");
            var t_18 = "";
            for (; e;)
                t_18 = p[15 & e] + t_18, e = Math.floor(e / 16);
            return t_18.length ? (t_18.length % 2 && (t_18 = "0" + t_18), "0x" + t_18) : "0x00";
        } if ("bigint" == typeof e)
            return (e = e.toString(16)).length % 2 ? "0x0" + e : "0x" + e; if (t.allowMissingPrefix && "string" == typeof e && "0x" !== e.substring(0, 2) && (e = "0x" + e), i(e))
            return e.toHexString(); if (d(e))
            return e.length % 2 && ("left" === t.hexPad ? e = "0x0" + e.substring(2) : "right" === t.hexPad ? e += "0" : n.throwArgumentError("hex data is odd-length", "value", e)), e.toLowerCase(); if (c(e)) {
            var t_19 = "0x";
            for (var r_18 = 0; r_18 < e.length; r_18++) {
                var n_5 = e[r_18];
                t_19 += p[(240 & n_5) >> 4] + p[15 & n_5];
            }
            return t_19;
        } return n.throwArgumentError("invalid hexlify value", "value", e); }
        function m(e) { if ("string" != typeof e)
            e = g(e);
        else if (!d(e) || e.length % 2)
            return null; return (e.length - 2) / 2; }
        function y(e, t, r) { return "string" != typeof e ? e = g(e) : (!d(e) || e.length % 2) && n.throwArgumentError("invalid hexData", "value", e), t = 2 + 2 * t, null != r ? "0x" + e.substring(t, 2 + 2 * r) : "0x" + e.substring(t); }
        function b(e) { var t = "0x"; return e.forEach((function (e) { t += g(e).substring(2); })), t; }
        function v(e) { var t = w(g(e, { hexPad: "left" })); return "0x" === t ? "0x0" : t; }
        function w(e) { "string" != typeof e && (e = g(e)), d(e) || n.throwArgumentError("invalid hex string", "value", e), e = e.substring(2); var t = 0; for (; t < e.length && "0" === e[t];)
            t++; return "0x" + e.substring(t); }
        function A(e, t) { for ("string" != typeof e ? e = g(e) : d(e) || n.throwArgumentError("invalid hex string", "value", e), e.length > 2 * t + 2 && n.throwArgumentError("value out of range", "value", arguments[1]); e.length < 2 * t + 2;)
            e = "0x0" + e.substring(2); return e; }
        function S(e) { var t = { r: "0x", s: "0x", _vs: "0x", recoveryParam: 0, v: 0 }; if (s(e)) {
            var r_19 = u(e);
            65 !== r_19.length && n.throwArgumentError("invalid signature string; must be 65 bytes", "signature", e), t.r = g(r_19.slice(0, 32)), t.s = g(r_19.slice(32, 64)), t.v = r_19[64], t.v < 27 && (0 === t.v || 1 === t.v ? t.v += 27 : n.throwArgumentError("signature invalid v byte", "signature", e)), t.recoveryParam = 1 - t.v % 2, t.recoveryParam && (r_19[32] |= 128), t._vs = g(r_19.slice(32, 64));
        }
        else {
            if (t.r = e.r, t.s = e.s, t.v = e.v, t.recoveryParam = e.recoveryParam, t._vs = e._vs, null != t._vs) {
                var r_20 = h(u(t._vs), 32);
                t._vs = g(r_20);
                var i_5 = r_20[0] >= 128 ? 1 : 0;
                null == t.recoveryParam ? t.recoveryParam = i_5 : t.recoveryParam !== i_5 && n.throwArgumentError("signature recoveryParam mismatch _vs", "signature", e), r_20[0] &= 127;
                var o_4 = g(r_20);
                null == t.s ? t.s = o_4 : t.s !== o_4 && n.throwArgumentError("signature v mismatch _vs", "signature", e);
            }
            if (null == t.recoveryParam)
                null == t.v ? n.throwArgumentError("signature missing v and recoveryParam", "signature", e) : 0 === t.v || 1 === t.v ? t.recoveryParam = t.v : t.recoveryParam = 1 - t.v % 2;
            else if (null == t.v)
                t.v = 27 + t.recoveryParam;
            else {
                var r_21 = 0 === t.v || 1 === t.v ? t.v : 1 - t.v % 2;
                t.recoveryParam !== r_21 && n.throwArgumentError("signature recoveryParam mismatch v", "signature", e);
            }
            null != t.r && d(t.r) ? t.r = A(t.r, 32) : n.throwArgumentError("signature missing or invalid r", "signature", e), null != t.s && d(t.s) ? t.s = A(t.s, 32) : n.throwArgumentError("signature missing or invalid s", "signature", e);
            var r_22 = u(t.s);
            r_22[0] >= 128 && n.throwArgumentError("signature s out of range", "signature", e), t.recoveryParam && (r_22[0] |= 128);
            var i_6 = g(r_22);
            t._vs && (d(t._vs) || n.throwArgumentError("signature invalid _vs", "signature", e), t._vs = A(t._vs, 32)), null == t._vs ? t._vs = i_6 : t._vs !== i_6 && n.throwArgumentError("signature _vs mismatch v and s", "signature", e);
        } return t; }
        function E(e) { return g(f([(e = S(e)).r, e.s, e.recoveryParam ? "0x1c" : "0x1b"])); }
    }, 1046: function (e, t, r) {
        "use strict";
        r.d(t, { tL: function () { return i; }, _Y: function () { return o; }, fh: function () { return s; }, Bz: function () { return a; } });
        var n = r(2593);
        var i = n.O$.from(-1), o = n.O$.from(0), s = n.O$.from(1), a = n.O$.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    }, 7218: function (e, t, r) {
        "use strict";
        r.d(t, { R: function () { return n; } });
        var n = "0x0000000000000000000000000000000000000000000000000000000000000000";
    }, 5644: function (e, t, r) {
        "use strict";
        r.d(t, { i: function () { return n; } });
        var n = "hash/5.5.0";
    }, 2046: function (e, t, r) {
        "use strict";
        r.d(t, { id: function () { return o; } });
        var n = r(8197), i = r(4242);
        function o(e) { return (0, n.keccak256)((0, i.Y0)(e)); }
    }, 5931: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { id: function () { return n.id; }, namehash: function () { return i.V; }, isValidName: function () { return i.r; }, messagePrefix: function () { return o.B; }, hashMessage: function () { return o.r; }, _TypedDataEncoder: function () { return s.E; } });
        var n = r(2046), i = r(4706), o = r(3684), s = r(7827);
    }, 3684: function (e, t, r) {
        "use strict";
        r.d(t, { B: function () { return s; }, r: function () { return a; } });
        var n = r(3286), i = r(8197), o = r(4242);
        var s = "Ethereum Signed Message:\n";
        function a(e) { return "string" == typeof e && (e = (0, o.Y0)(e)), (0, i.keccak256)((0, n.concat)([(0, o.Y0)(s), (0, o.Y0)(String(e.length)), e])); }
    }, 4706: function (e, t, r) {
        "use strict";
        r.d(t, { r: function () { return h; }, V: function () { return d; } });
        var n = r(3286), i = r(5637), o = r(4242), s = r(8197), a = r(711), c = r(5644);
        var u = new a.Logger(c.i), f = new Uint8Array(32);
        f.fill(0);
        var l = new RegExp("^((.*)\\.)?([^.]+)$");
        function h(e) { try {
            var t_20 = e.split(".");
            for (var e_25 = 0; e_25 < t_20.length; e_25++)
                if (0 === (0, i.Ll)(t_20[e_25]).length)
                    throw new Error("empty");
            return !0;
        }
        catch (e) { } return !1; }
        function d(e) { "string" != typeof e && u.throwArgumentError("invalid ENS name; not a string", "name", e); var t = e, r = f; for (; t.length;) {
            var a_2 = t.match(l);
            null != a_2 && "" !== a_2[2] || u.throwArgumentError("invalid ENS address; missing component", "name", e);
            var c_1 = (0, o.Y0)((0, i.Ll)(a_2[3]));
            r = (0, s.keccak256)((0, n.concat)([r, (0, s.keccak256)(c_1)])), t = a_2[2] || "";
        } return (0, n.hexlify)(r); }
    }, 7827: function (e, t, r) {
        "use strict";
        r.d(t, { E: function () { return x; } });
        var n = r(4594), i = r(2593), o = r(3286), s = r(8197), a = r(3587), c = r(711), u = r(5644), f = r(2046);
        var l = new c.Logger(u.i), h = new Uint8Array(32);
        h.fill(0);
        var d = i.O$.from(-1), p = i.O$.from(0), g = i.O$.from(1), m = i.O$.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), y = (0, o.hexZeroPad)(g.toHexString(), 32), b = (0, o.hexZeroPad)(p.toHexString(), 32), v = { name: "string", version: "string", chainId: "uint256", verifyingContract: "address", salt: "bytes32" }, w = ["name", "version", "chainId", "verifyingContract", "salt"];
        function A(e) { return function (t) { return "string" != typeof t && l.throwArgumentError("invalid domain value for " + JSON.stringify(e), "domain." + e, t), t; }; }
        var S = { name: A("name"), version: A("version"), chainId: function (e) { try {
                return i.O$.from(e).toString();
            }
            catch (e) { } return l.throwArgumentError('invalid domain value for "chainId"', "domain.chainId", e); }, verifyingContract: function (e) { try {
                return (0, n.getAddress)(e).toLowerCase();
            }
            catch (e) { } return l.throwArgumentError('invalid domain value "verifyingContract"', "domain.verifyingContract", e); }, salt: function (e) { try {
                var t_21 = (0, o.arrayify)(e);
                if (32 !== t_21.length)
                    throw new Error("bad length");
                return (0, o.hexlify)(t_21);
            }
            catch (e) { } return l.throwArgumentError('invalid domain value "salt"', "domain.salt", e); } };
        function E(e) { {
            var t_22 = e.match(/^(u?)int(\d*)$/);
            if (t_22) {
                var r_23 = "" === t_22[1], n_6 = parseInt(t_22[2] || "256");
                (n_6 % 8 != 0 || n_6 > 256 || t_22[2] && t_22[2] !== String(n_6)) && l.throwArgumentError("invalid numeric width", "type", e);
                var s_2 = m.mask(r_23 ? n_6 - 1 : n_6), a_3 = r_23 ? s_2.add(g).mul(d) : p;
                return function (t) { var r = i.O$.from(t); return (r.lt(a_3) || r.gt(s_2)) && l.throwArgumentError("value out-of-bounds for " + e, "value", t), (0, o.hexZeroPad)(r.toTwos(256).toHexString(), 32); };
            }
        } {
            var t_23 = e.match(/^bytes(\d+)$/);
            if (t_23) {
                var r_24 = parseInt(t_23[1]);
                return (0 === r_24 || r_24 > 32 || t_23[1] !== String(r_24)) && l.throwArgumentError("invalid bytes width", "type", e), function (t) { return (0, o.arrayify)(t).length !== r_24 && l.throwArgumentError("invalid length for " + e, "value", t), function (e) { var t = (0, o.arrayify)(e), r = t.length % 32; return r ? (0, o.hexConcat)([t, h.slice(r)]) : (0, o.hexlify)(t); }(t); };
            }
        } switch (e) {
            case "address": return function (e) { return (0, o.hexZeroPad)((0, n.getAddress)(e), 32); };
            case "bool": return function (e) { return e ? y : b; };
            case "bytes": return function (e) { return (0, s.keccak256)(e); };
            case "string": return function (e) { return (0, f.id)(e); };
        } return null; }
        function k(e, t) { return e + "(" + t.map((function (_a) {
            var e = _a.name, t = _a.type;
            return t + " " + e;
        })).join(",") + ")"; }
        var x = (function () {
            function x(e) {
                (0, a.defineReadOnly)(this, "types", Object.freeze((0, a.deepCopy)(e))), (0, a.defineReadOnly)(this, "_encoderCache", {}), (0, a.defineReadOnly)(this, "_types", {});
                var t = {}, r = {}, n = {};
                Object.keys(e).forEach((function (e) { t[e] = {}, r[e] = [], n[e] = {}; }));
                var _loop_3 = function (n_7) {
                    var i_7 = {};
                    e[n_7].forEach((function (o) { i_7[o.name] && l.throwArgumentError("duplicate variable name " + JSON.stringify(o.name) + " in " + JSON.stringify(n_7), "types", e), i_7[o.name] = !0; var s = o.type.match(/^([^\x5b]*)(\x5b|$)/)[1]; s === n_7 && l.throwArgumentError("circular type reference to " + JSON.stringify(s), "types", e), E(s) || (r[s] || l.throwArgumentError("unknown type " + JSON.stringify(s), "types", e), r[s].push(n_7), t[n_7][s] = !0); }));
                };
                for (var n_7 in e) {
                    _loop_3(n_7);
                }
                var i = Object.keys(r).filter((function (e) { return 0 === r[e].length; }));
                0 === i.length ? l.throwArgumentError("missing primary type", "types", e) : i.length > 1 && l.throwArgumentError("ambiguous primary types or unused types: " + i.map((function (e) { return JSON.stringify(e); })).join(", "), "types", e), (0, a.defineReadOnly)(this, "primaryType", i[0]), function i(o, s) { s[o] && l.throwArgumentError("circular type reference to " + JSON.stringify(o), "types", e), s[o] = !0, Object.keys(t[o]).forEach((function (e) { r[e] && (i(e, s), Object.keys(s).forEach((function (t) { n[t][e] = !0; }))); })), delete s[o]; }(this.primaryType, {});
                for (var t_24 in n) {
                    var r_25 = Object.keys(n[t_24]);
                    r_25.sort(), this._types[t_24] = k(t_24, e[t_24]) + r_25.map((function (t) { return k(t, e[t]); })).join("");
                }
            }
            x.prototype.getEncoder = function (e) { var t = this._encoderCache[e]; return t || (t = this._encoderCache[e] = this._getEncoder(e)), t; };
            x.prototype._getEncoder = function (e) {
                var _this = this;
                {
                    var t_25 = E(e);
                    if (t_25)
                        return t_25;
                }
                var t = e.match(/^(.*)(\x5b(\d*)\x5d)$/);
                if (t) {
                    var e_26 = t[1], r_26 = this.getEncoder(e_26), n_8 = parseInt(t[3]);
                    return function (t) { n_8 >= 0 && t.length !== n_8 && l.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", t); var i = t.map(r_26); return _this._types[e_26] && (i = i.map(s.keccak256)), (0, s.keccak256)((0, o.hexConcat)(i)); };
                }
                var r = this.types[e];
                if (r) {
                    var t_26 = (0, f.id)(this._types[e]);
                    return function (e) { var n = r.map((function (_a) {
                        var t = _a.name, r = _a.type;
                        var n = _this.getEncoder(r)(e[t]);
                        return _this._types[r] ? (0, s.keccak256)(n) : n;
                    })); return n.unshift(t_26), (0, o.hexConcat)(n); };
                }
                return l.throwArgumentError("unknown type: " + e, "type", e);
            };
            x.prototype.encodeType = function (e) { var t = this._types[e]; return t || l.throwArgumentError("unknown type: " + JSON.stringify(e), "name", e), t; };
            x.prototype.encodeData = function (e, t) { return this.getEncoder(e)(t); };
            x.prototype.hashStruct = function (e, t) { return (0, s.keccak256)(this.encodeData(e, t)); };
            x.prototype.encode = function (e) { return this.encodeData(this.primaryType, e); };
            x.prototype.hash = function (e) { return this.hashStruct(this.primaryType, e); };
            x.prototype._visit = function (e, t, r) {
                var _this = this;
                if (E(e))
                    return r(e, t);
                var n = e.match(/^(.*)(\x5b(\d*)\x5d)$/);
                if (n) {
                    var e_27 = n[1], i_8 = parseInt(n[3]);
                    return i_8 >= 0 && t.length !== i_8 && l.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", t), t.map((function (t) { return _this._visit(e_27, t, r); }));
                }
                var i = this.types[e];
                return i ? i.reduce((function (e, _a) {
                    var n = _a.name, i = _a.type;
                    return (e[n] = _this._visit(i, t[n], r), e);
                }), {}) : l.throwArgumentError("unknown type: " + e, "type", e);
            };
            x.prototype.visit = function (e, t) { return this._visit(this.primaryType, e, t); };
            x.from = function (e) { return new x(e); };
            x.getPrimaryType = function (e) { return x.from(e).primaryType; };
            x.hashStruct = function (e, t, r) { return x.from(t).hashStruct(e, r); };
            x.hashDomain = function (e) { var t = []; for (var r_27 in e) {
                var n_9 = v[r_27];
                n_9 || l.throwArgumentError("invalid typed-data domain key: " + JSON.stringify(r_27), "domain", e), t.push({ name: r_27, type: n_9 });
            } return t.sort((function (e, t) { return w.indexOf(e.name) - w.indexOf(t.name); })), x.hashStruct("EIP712Domain", { EIP712Domain: t }, e); };
            x.encode = function (e, t, r) { return (0, o.hexConcat)(["0x1901", x.hashDomain(e), x.from(t).hash(r)]); };
            x.hash = function (e, t, r) { return (0, s.keccak256)(x.encode(e, t, r)); };
            x.resolveNames = function (e, t, r, n) { return i = this, s = void 0, u = function () { var i, s, _a, _b, _i, e_28, _c, _d; return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        e = (0, a.shallowCopy)(e);
                        i = {};
                        e.verifyingContract && !(0, o.isHexString)(e.verifyingContract, 20) && (i[e.verifyingContract] = "0x");
                        s = x.from(t);
                        s.visit(r, (function (e, t) { return ("address" !== e || (0, o.isHexString)(t, 20) || (i[t] = "0x"), t); }));
                        _a = [];
                        for (_b in i)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        e_28 = _a[_i];
                        _c = i;
                        _d = e_28;
                        return [4, n(e_28)];
                    case 2:
                        _c[_d] = _f.sent();
                        _f.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2, (e.verifyingContract && i[e.verifyingContract] && (e.verifyingContract = i[e.verifyingContract]), r = s.visit(r, (function (e, t) { return "address" === e && i[t] ? i[t] : t; })), { domain: e, value: r })];
                }
            }); }, new ((c = void 0) || (c = Promise))((function (e, t) { function r(e) { try {
                o(u.next(e));
            }
            catch (e) {
                t(e);
            } } function n(e) { try {
                o(u.throw(e));
            }
            catch (e) {
                t(e);
            } } function o(t) { var i; t.done ? e(t.value) : (i = t.value, i instanceof c ? i : new c((function (e) { e(i); }))).then(r, n); } o((u = u.apply(i, s || [])).next()); })); var i, s, c, u; };
            x.getPayload = function (e, t, r) { x.hashDomain(e); var n = {}, s = []; w.forEach((function (t) { var r = e[t]; null != r && (n[t] = S[t](r), s.push({ name: t, type: v[t] })); })); var c = x.from(t), u = (0, a.shallowCopy)(t); return u.EIP712Domain ? l.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", t) : u.EIP712Domain = s, c.encode(r), { types: u, domain: n, primaryType: c.primaryType, message: c.visit(r, (function (e, t) { if (e.match(/^bytes(\d*)/))
                    return (0, o.hexlify)((0, o.arrayify)(t)); if (e.match(/^u?int/))
                    return i.O$.from(t).toString(); switch (e) {
                    case "address": return t.toLowerCase();
                    case "bool": return !!t;
                    case "string": return "string" != typeof t && l.throwArgumentError("invalid string", "value", t), t;
                } return l.throwArgumentError("unsupported type", "type", e); })) }; };
            return x;
        }());
    }, 4692: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { HDNode: function () { return O; }, defaultPath: function () { return I; }, entropyToMnemonic: function () { return C; }, getAccountPath: function () { return L; }, isValidMnemonic: function () { return M; }, mnemonicToEntropy: function () { return R; }, mnemonicToSeed: function () { return T; } });
        var n = r(7727), i = r(3286), o = r(2593), s = r(4242), a = r(5306), c = r(3587), u = r(2768), f = r(7158), l = r(1261), h = r(4377), d = r(2046), p = r(711);
        var g = new p.Logger("wordlists/5.5.0");
        var m = (function () {
            function m(e) {
                var _newTarget = this.constructor;
                g.checkAbstract(_newTarget, m), (0, c.defineReadOnly)(this, "locale", e);
            }
            m.prototype.split = function (e) { return e.toLowerCase().split(/ +/g); };
            m.prototype.join = function (e) { return e.join(" "); };
            m.check = function (e) { var t = []; for (var r_28 = 0; r_28 < 2048; r_28++) {
                var n_10 = e.getWord(r_28);
                if (r_28 !== e.getWordIndex(n_10))
                    return "0x";
                t.push(n_10);
            } return (0, d.id)(t.join("\n") + "\n"); };
            m.register = function (e, t) { t || (t = e.locale); };
            return m;
        }());
        var y = null;
        function b(e) { if (null == y && (y = "AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo".replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" "), "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60" !== m.check(e)))
            throw y = null, new Error("BIP39 Wordlist for en (English) FAILED"); }
        var v = new (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super.call(this, "en") || this;
            }
            class_1.prototype.getWord = function (e) { return b(this), y[e]; };
            class_1.prototype.getWordIndex = function (e) { return b(this), y.indexOf(e); };
            return class_1;
        }(m));
        m.register(v);
        var w = { en: v }, A = new p.Logger("hdnode/5.5.0"), S = o.O$.from("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), E = (0, s.Y0)("Bitcoin seed"), k = 2147483648;
        function x(e) { return (1 << e) - 1 << 8 - e; }
        function N(e) { return (0, i.hexZeroPad)((0, i.hexlify)(e), 32); }
        function B(e) { return n.Base58.encode((0, i.concat)([e, (0, i.hexDataSlice)((0, f.JQ)((0, f.JQ)(e)), 0, 4)])); }
        function P(e) { if (null == e)
            return w.en; if ("string" == typeof e) {
            var t_27 = w[e];
            return null == t_27 && A.throwArgumentError("unknown locale", "wordlist", e), t_27;
        } return e; }
        var _ = {}, I = "m/44'/60'/0'/0/0";
        var O = (function () {
            function O(e, t, r, n, o, s, a, l) {
                var _newTarget = this.constructor;
                if (A.checkNew(_newTarget, O), e !== _)
                    throw new Error("HDNode constructor cannot be called directly");
                if (t) {
                    var e_29 = new u.SigningKey(t);
                    (0, c.defineReadOnly)(this, "privateKey", e_29.privateKey), (0, c.defineReadOnly)(this, "publicKey", e_29.compressedPublicKey);
                }
                else
                    (0, c.defineReadOnly)(this, "privateKey", null), (0, c.defineReadOnly)(this, "publicKey", (0, i.hexlify)(r));
                (0, c.defineReadOnly)(this, "parentFingerprint", n), (0, c.defineReadOnly)(this, "fingerprint", (0, i.hexDataSlice)((0, f.bP)((0, f.JQ)(this.publicKey)), 0, 4)), (0, c.defineReadOnly)(this, "address", (0, h.computeAddress)(this.publicKey)), (0, c.defineReadOnly)(this, "chainCode", o), (0, c.defineReadOnly)(this, "index", s), (0, c.defineReadOnly)(this, "depth", a), null == l ? ((0, c.defineReadOnly)(this, "mnemonic", null), (0, c.defineReadOnly)(this, "path", null)) : "string" == typeof l ? ((0, c.defineReadOnly)(this, "mnemonic", null), (0, c.defineReadOnly)(this, "path", l)) : ((0, c.defineReadOnly)(this, "mnemonic", l), (0, c.defineReadOnly)(this, "path", l.path));
            }
            Object.defineProperty(O.prototype, "extendedKey", {
                get: function () { if (this.depth >= 256)
                    throw new Error("Depth too large!"); return B((0, i.concat)([null != this.privateKey ? "0x0488ADE4" : "0x0488B21E", (0, i.hexlify)(this.depth), this.parentFingerprint, (0, i.hexZeroPad)((0, i.hexlify)(this.index), 4), this.chainCode, null != this.privateKey ? (0, i.concat)(["0x00", this.privateKey]) : this.publicKey])); },
                enumerable: false,
                configurable: true
            });
            O.prototype.neuter = function () { return new O(_, null, this.publicKey, this.parentFingerprint, this.chainCode, this.index, this.depth, this.path); };
            O.prototype._derive = function (e) { if (e > 4294967295)
                throw new Error("invalid index - " + String(e)); var t = this.path; t && (t += "/" + (2147483647 & e)); var r = new Uint8Array(37); if (e & k) {
                if (!this.privateKey)
                    throw new Error("cannot derive child of neutered node");
                r.set((0, i.arrayify)(this.privateKey), 1), t && (t += "'");
            }
            else
                r.set((0, i.arrayify)(this.publicKey)); for (var t_28 = 24; t_28 >= 0; t_28 -= 8)
                r[33 + (t_28 >> 3)] = e >> 24 - t_28 & 255; var n = (0, i.arrayify)((0, f.Gy)(l.p.sha512, this.chainCode, r)), s = n.slice(0, 32), a = n.slice(32); var c = null, h = null; this.privateKey ? c = N(o.O$.from(s).add(this.privateKey).mod(S)) : h = new u.SigningKey((0, i.hexlify)(s))._addPoint(this.publicKey); var d = t; var p = this.mnemonic; return p && (d = Object.freeze({ phrase: p.phrase, path: t, locale: p.locale || "en" })), new O(_, c, h, this.fingerprint, N(a), e, this.depth + 1, d); };
            O.prototype.derivePath = function (e) { var t = e.split("/"); if (0 === t.length || "m" === t[0] && 0 !== this.depth)
                throw new Error("invalid path - " + e); "m" === t[0] && t.shift(); var r = this; for (var e_30 = 0; e_30 < t.length; e_30++) {
                var n_11 = t[e_30];
                if (n_11.match(/^[0-9]+'$/)) {
                    var e_31 = parseInt(n_11.substring(0, n_11.length - 1));
                    if (e_31 >= k)
                        throw new Error("invalid path index - " + n_11);
                    r = r._derive(k + e_31);
                }
                else {
                    if (!n_11.match(/^[0-9]+$/))
                        throw new Error("invalid path component - " + n_11);
                    {
                        var e_32 = parseInt(n_11);
                        if (e_32 >= k)
                            throw new Error("invalid path index - " + n_11);
                        r = r._derive(e_32);
                    }
                }
            } return r; };
            O._fromSeed = function (e, t) { var r = (0, i.arrayify)(e); if (r.length < 16 || r.length > 64)
                throw new Error("invalid seed"); var n = (0, i.arrayify)((0, f.Gy)(l.p.sha512, E, r)); return new O(_, N(n.slice(0, 32)), null, "0x00000000", N(n.slice(32)), 0, 0, t); };
            O.fromMnemonic = function (e, t, r) { return e = C(R(e, r = P(r)), r), O._fromSeed(T(e, t), { phrase: e, path: "m", locale: r.locale }); };
            O.fromSeed = function (e) { return O._fromSeed(e, null); };
            O.fromExtendedKey = function (e) { var t = n.Base58.decode(e); 82 === t.length && B(t.slice(0, 78)) === e || A.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]"); var r = t[4], o = (0, i.hexlify)(t.slice(5, 9)), s = parseInt((0, i.hexlify)(t.slice(9, 13)).substring(2), 16), a = (0, i.hexlify)(t.slice(13, 45)), c = t.slice(45, 78); switch ((0, i.hexlify)(t.slice(0, 4))) {
                case "0x0488b21e":
                case "0x043587cf": return new O(_, null, (0, i.hexlify)(c), o, a, s, r, null);
                case "0x0488ade4":
                case "0x04358394 ":
                    if (0 !== c[0])
                        break;
                    return new O(_, (0, i.hexlify)(c.slice(1)), null, o, a, s, r, null);
            } return A.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]"); };
            return O;
        }());
        function T(e, t) { t || (t = ""); var r = (0, s.Y0)("mnemonic" + t, s.Uj.NFKD); return (0, a.n)((0, s.Y0)(e, s.Uj.NFKD), r, 2048, 64, "sha512"); }
        function R(e, t) { t = P(t), A.checkNormalize(); var r = t.split(e); if (r.length % 3 != 0)
            throw new Error("invalid mnemonic"); var n = (0, i.arrayify)(new Uint8Array(Math.ceil(11 * r.length / 8))); var o = 0; for (var e_33 = 0; e_33 < r.length; e_33++) {
            var i_9 = t.getWordIndex(r[e_33].normalize("NFKD"));
            if (-1 === i_9)
                throw new Error("invalid mnemonic");
            for (var e_34 = 0; e_34 < 11; e_34++)
                i_9 & 1 << 10 - e_34 && (n[o >> 3] |= 1 << 7 - o % 8), o++;
        } var s = 32 * r.length / 3, a = x(r.length / 3); if (((0, i.arrayify)((0, f.JQ)(n.slice(0, s / 8)))[0] & a) != (n[n.length - 1] & a))
            throw new Error("invalid checksum"); return (0, i.hexlify)(n.slice(0, s / 8)); }
        function C(e, t) { if (t = P(t), (e = (0, i.arrayify)(e)).length % 4 != 0 || e.length < 16 || e.length > 32)
            throw new Error("invalid entropy"); var r = [0]; var n = 11; for (var t_29 = 0; t_29 < e.length; t_29++)
            n > 8 ? (r[r.length - 1] <<= 8, r[r.length - 1] |= e[t_29], n -= 8) : (r[r.length - 1] <<= n, r[r.length - 1] |= e[t_29] >> 8 - n, r.push(e[t_29] & (1 << 8 - n) - 1), n += 3); var o = e.length / 4, s = (0, i.arrayify)((0, f.JQ)(e))[0] & x(o); return r[r.length - 1] <<= o, r[r.length - 1] |= s >> 8 - o, t.join(r.map((function (e) { return t.getWord(e); }))); }
        function M(e, t) { try {
            return R(e, t), !0;
        }
        catch (e) { } return !1; }
        function L(e) { return ("number" != typeof e || e < 0 || e >= k || e % 1) && A.throwArgumentError("invalid account index", "index", e), "m/44'/60'/" + e + "'/0/0"; }
    }, 9816: function (e, t, r) {
        "use strict";
        r.d(t, { i: function () { return n; } });
        var n = "json-wallets/5.5.0";
    }, 6883: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { decryptCrowdsale: function () { return m; }, decryptJsonWallet: function () { return A; }, decryptJsonWalletSync: function () { return S; }, decryptKeystore: function () { return w.pe; }, decryptKeystoreSync: function () { return w.hb; }, encryptKeystore: function () { return w.HI; }, getJsonWalletAddress: function () { return v; }, isCrowdsaleWallet: function () { return y; }, isKeystoreWallet: function () { return b; } });
        var n = r(8826), i = r.n(n), o = r(4594), s = r(3286), a = r(8197), c = r(5306), u = r(4242), f = r(3587), l = r(711), h = r(9816), d = r(7013);
        var p = new l.Logger(h.i);
        var g = (function (_super) {
            __extends(g, _super);
            function g() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            g.prototype.isCrowdsaleAccount = function (e) { return !(!e || !e._isCrowdsaleAccount); };
            return g;
        }(f.Description));
        function m(e, t) { var r = JSON.parse(e); t = (0, d.Ij)(t); var n = (0, o.getAddress)((0, d.gx)(r, "ethaddr")), f = (0, d.p3)((0, d.gx)(r, "encseed")); f && f.length % 16 == 0 || p.throwArgumentError("invalid encseed", "json", e); var l = (0, s.arrayify)((0, c.n)(t, t, 2e3, 32, "sha256")).slice(0, 16), h = f.slice(0, 16), m = f.slice(16), y = new (i().ModeOfOperation.cbc)(l, h), b = i().padding.pkcs7.strip((0, s.arrayify)(y.decrypt(m))); var v = ""; for (var e_35 = 0; e_35 < b.length; e_35++)
            v += String.fromCharCode(b[e_35]); var w = (0, u.Y0)(v), A = (0, a.keccak256)(w); return new g({ _isCrowdsaleAccount: !0, address: n, privateKey: A }); }
        function y(e) { var t = null; try {
            t = JSON.parse(e);
        }
        catch (e) {
            return !1;
        } return t.encseed && t.ethaddr; }
        function b(e) { var t = null; try {
            t = JSON.parse(e);
        }
        catch (e) {
            return !1;
        } return !(!t.version || parseInt(t.version) !== t.version || 3 !== parseInt(t.version)); }
        function v(e) { if (y(e))
            try {
                return (0, o.getAddress)(JSON.parse(e).ethaddr);
            }
            catch (e) {
                return null;
            } if (b(e))
            try {
                return (0, o.getAddress)(JSON.parse(e).address);
            }
            catch (e) {
                return null;
            } return null; }
        var w = r(1964);
        function A(e, t, r) { if (y(e)) {
            r && r(0);
            var n_12 = m(e, t);
            return r && r(1), Promise.resolve(n_12);
        } return b(e) ? (0, w.pe)(e, t, r) : Promise.reject(new Error("invalid JSON wallet")); }
        function S(e, t) { if (y(e))
            return m(e, t); if (b(e))
            return (0, w.hb)(e, t); throw new Error("invalid JSON wallet"); }
    }, 1964: function (e, t, r) {
        "use strict";
        r.d(t, { hb: function () { return x; }, pe: function () { return N; }, HI: function () { return B; } });
        var n = r(8826), i = r.n(n), o = r(7635), s = r.n(o), a = r(4594), c = r(3286), u = r(4692), f = r(8197), l = r(5306), h = r(4478), d = r(3587), p = r(4377), g = r(7013), m = r(711), y = r(9816);
        var b = new m.Logger(y.i);
        function v(e) { return null != e && e.mnemonic && e.mnemonic.phrase; }
        var w = (function (_super) {
            __extends(w, _super);
            function w() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            w.prototype.isKeystoreAccount = function (e) { return !(!e || !e._isKeystoreAccount); };
            return w;
        }(d.Description));
        function A(e, t) { var r = (0, g.p3)((0, g.gx)(e, "crypto/ciphertext")); if ((0, c.hexlify)((0, f.keccak256)((0, c.concat)([t.slice(16, 32), r]))).substring(2) !== (0, g.gx)(e, "crypto/mac").toLowerCase())
            throw new Error("invalid password"); var n = function (e, t, r) { if ("aes-128-ctr" === (0, g.gx)(e, "crypto/cipher")) {
            var n_13 = (0, g.p3)((0, g.gx)(e, "crypto/cipherparams/iv")), o_5 = new (i().Counter)(n_13), s_3 = new (i().ModeOfOperation.ctr)(t, o_5);
            return (0, c.arrayify)(s_3.decrypt(r));
        } return null; }(e, t.slice(0, 16), r); n || b.throwError("unsupported cipher", m.Logger.errors.UNSUPPORTED_OPERATION, { operation: "decrypt" }); var o = t.slice(32, 64), s = (0, p.computeAddress)(n); if (e.address) {
            var t_30 = e.address.toLowerCase();
            if ("0x" !== t_30.substring(0, 2) && (t_30 = "0x" + t_30), (0, a.getAddress)(t_30) !== s)
                throw new Error("address mismatch");
        } var l = { _isKeystoreAccount: !0, address: s, privateKey: (0, c.hexlify)(n) }; if ("0.1" === (0, g.gx)(e, "x-ethers/version")) {
            var t_31 = (0, g.p3)((0, g.gx)(e, "x-ethers/mnemonicCiphertext")), r_29 = (0, g.p3)((0, g.gx)(e, "x-ethers/mnemonicCounter")), n_14 = new (i().Counter)(r_29), s_4 = new (i().ModeOfOperation.ctr)(o, n_14), a_4 = (0, g.gx)(e, "x-ethers/path") || u.defaultPath, f_1 = (0, g.gx)(e, "x-ethers/locale") || "en", h_1 = (0, c.arrayify)(s_4.decrypt(t_31));
            try {
                var e_36 = (0, u.entropyToMnemonic)(h_1, f_1), t_32 = u.HDNode.fromMnemonic(e_36, null, f_1).derivePath(a_4);
                if (t_32.privateKey != l.privateKey)
                    throw new Error("mnemonic mismatch");
                l.mnemonic = t_32.mnemonic;
            }
            catch (e) {
                if (e.code !== m.Logger.errors.INVALID_ARGUMENT || "wordlist" !== e.argument)
                    throw e;
            }
        } return new w(l); }
        function S(e, t, r, n, i) { return (0, c.arrayify)((0, l.n)(e, t, r, n, i)); }
        function E(e, t, r, n, i) { return Promise.resolve(S(e, t, r, n, i)); }
        function k(e, t, r, n, i) { var o = (0, g.Ij)(t), s = (0, g.gx)(e, "crypto/kdf"); if (s && "string" == typeof s) {
            var t_33 = function (e, t) { return b.throwArgumentError("invalid key-derivation function parameters", e, t); };
            if ("scrypt" === s.toLowerCase()) {
                var r_30 = (0, g.p3)((0, g.gx)(e, "crypto/kdfparams/salt")), a_5 = parseInt((0, g.gx)(e, "crypto/kdfparams/n")), c_2 = parseInt((0, g.gx)(e, "crypto/kdfparams/r")), u_1 = parseInt((0, g.gx)(e, "crypto/kdfparams/p"));
                a_5 && c_2 && u_1 || t_33("kdf", s), 0 != (a_5 & a_5 - 1) && t_33("N", a_5);
                var f_2 = parseInt((0, g.gx)(e, "crypto/kdfparams/dklen"));
                return 32 !== f_2 && t_33("dklen", f_2), n(o, r_30, a_5, c_2, u_1, 64, i);
            }
            if ("pbkdf2" === s.toLowerCase()) {
                var n_15 = (0, g.p3)((0, g.gx)(e, "crypto/kdfparams/salt"));
                var i_10 = null;
                var s_5 = (0, g.gx)(e, "crypto/kdfparams/prf");
                "hmac-sha256" === s_5 ? i_10 = "sha256" : "hmac-sha512" === s_5 ? i_10 = "sha512" : t_33("prf", s_5);
                var a_6 = parseInt((0, g.gx)(e, "crypto/kdfparams/c")), c_3 = parseInt((0, g.gx)(e, "crypto/kdfparams/dklen"));
                return 32 !== c_3 && t_33("dklen", c_3), r(o, n_15, a_6, c_3, i_10);
            }
        } return b.throwArgumentError("unsupported key-derivation function", "kdf", s); }
        function x(e, t) { var r = JSON.parse(e); return A(r, k(r, t, S, s().syncScrypt)); }
        function N(e, t, r) { return n = this, i = void 0, a = function () { var n, _a, _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    n = JSON.parse(e);
                    _a = A;
                    _b = [n];
                    return [4, k(n, t, E, s().scrypt, r)];
                case 1: return [2, _a.apply(void 0, _b.concat([_c.sent()]))];
            }
        }); }, new ((o = void 0) || (o = Promise))((function (e, t) { function r(e) { try {
            c(a.next(e));
        }
        catch (e) {
            t(e);
        } } function s(e) { try {
            c(a.throw(e));
        }
        catch (e) {
            t(e);
        } } function c(t) { var n; t.done ? e(t.value) : (n = t.value, n instanceof o ? n : new o((function (e) { e(n); }))).then(r, s); } c((a = a.apply(n, i || [])).next()); })); var n, i, o, a; }
        function B(e, t, r, n) { try {
            if ((0, a.getAddress)(e.address) !== (0, p.computeAddress)(e.privateKey))
                throw new Error("address/privateKey mismatch");
            if (v(e)) {
                var t_34 = e.mnemonic;
                if (u.HDNode.fromMnemonic(t_34.phrase, null, t_34.locale).derivePath(t_34.path || u.defaultPath).privateKey != e.privateKey)
                    throw new Error("mnemonic mismatch");
            }
        }
        catch (e) {
            return Promise.reject(e);
        } "function" != typeof r || n || (n = r, r = {}), r || (r = {}); var o = (0, c.arrayify)(e.privateKey), l = (0, g.Ij)(t); var d = null, m = null, y = null; if (v(e)) {
            var t_35 = e.mnemonic;
            d = (0, c.arrayify)((0, u.mnemonicToEntropy)(t_35.phrase, t_35.locale || "en")), m = t_35.path || u.defaultPath, y = t_35.locale || "en";
        } var b = r.client; b || (b = "ethers.js"); var w = null; w = r.salt ? (0, c.arrayify)(r.salt) : (0, h.O)(32); var A = null; if (r.iv) {
            if (A = (0, c.arrayify)(r.iv), 16 !== A.length)
                throw new Error("invalid iv");
        }
        else
            A = (0, h.O)(16); var S = null; if (r.uuid) {
            if (S = (0, c.arrayify)(r.uuid), 16 !== S.length)
                throw new Error("invalid uuid");
        }
        else
            S = (0, h.O)(16); var E = 1 << 17, k = 8, x = 1; return r.scrypt && (r.scrypt.N && (E = r.scrypt.N), r.scrypt.r && (k = r.scrypt.r), r.scrypt.p && (x = r.scrypt.p)), s().scrypt(l, w, E, k, x, 64, n).then((function (t) { var r = (t = (0, c.arrayify)(t)).slice(0, 16), n = t.slice(16, 32), s = t.slice(32, 64), a = new (i().Counter)(A), u = new (i().ModeOfOperation.ctr)(r, a), l = (0, c.arrayify)(u.encrypt(o)), p = (0, f.keccak256)((0, c.concat)([n, l])), v = { address: e.address.substring(2).toLowerCase(), id: (0, g.EH)(S), version: 3, Crypto: { cipher: "aes-128-ctr", cipherparams: { iv: (0, c.hexlify)(A).substring(2) }, ciphertext: (0, c.hexlify)(l).substring(2), kdf: "scrypt", kdfparams: { salt: (0, c.hexlify)(w).substring(2), n: E, dklen: 32, p: x, r: k }, mac: p.substring(2) } }; if (d) {
            var e_37 = (0, h.O)(16), t_36 = new (i().Counter)(e_37), r_31 = new (i().ModeOfOperation.ctr)(s, t_36), n_16 = (0, c.arrayify)(r_31.encrypt(d)), o_6 = new Date, a_7 = o_6.getUTCFullYear() + "-" + (0, g.VP)(o_6.getUTCMonth() + 1, 2) + "-" + (0, g.VP)(o_6.getUTCDate(), 2) + "T" + (0, g.VP)(o_6.getUTCHours(), 2) + "-" + (0, g.VP)(o_6.getUTCMinutes(), 2) + "-" + (0, g.VP)(o_6.getUTCSeconds(), 2) + ".0Z";
            v["x-ethers"] = { client: b, gethFilename: "UTC--" + a_7 + "--" + v.address, mnemonicCounter: (0, c.hexlify)(e_37).substring(2), mnemonicCiphertext: (0, c.hexlify)(n_16).substring(2), path: m, locale: y, version: "0.1" };
        } return JSON.stringify(v); })); }
    }, 7013: function (e, t, r) {
        "use strict";
        r.d(t, { p3: function () { return o; }, VP: function () { return s; }, Ij: function () { return a; }, gx: function () { return c; }, EH: function () { return u; } });
        var n = r(3286), i = r(4242);
        function o(e) { return "string" == typeof e && "0x" !== e.substring(0, 2) && (e = "0x" + e), (0, n.arrayify)(e); }
        function s(e, t) { for (e = String(e); e.length < t;)
            e = "0" + e; return e; }
        function a(e) { return "string" == typeof e ? (0, i.Y0)(e, i.Uj.NFKC) : (0, n.arrayify)(e); }
        function c(e, t) { var r = e; var n = t.toLowerCase().split("/"); for (var e_38 = 0; e_38 < n.length; e_38++) {
            var t_37 = null;
            for (var i_11 in r)
                if (i_11.toLowerCase() === n[e_38]) {
                    t_37 = r[i_11];
                    break;
                }
            if (null === t_37)
                return null;
            r = t_37;
        } return r; }
        function u(e) { var t = (0, n.arrayify)(e); t[6] = 15 & t[6] | 64, t[8] = 63 & t[8] | 128; var r = (0, n.hexlify)(t); return [r.substring(2, 10), r.substring(10, 14), r.substring(14, 18), r.substring(18, 22), r.substring(22, 34)].join("-"); }
    }, 8197: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { keccak256: function () { return s; } });
        var n = r(1094), i = r.n(n), o = r(3286);
        function s(e) { return "0x" + i().keccak_256((0, o.arrayify)(e)); }
    }, 711: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { ErrorCode: function () { return f; }, LogLevel: function () { return u; }, Logger: function () { return h; } });
        var n = !1, i = !1;
        var o = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
        var s = o.default, a = null;
        var c = function () { try {
            var e_39 = [];
            if (["NFD", "NFC", "NFKD", "NFKC"].forEach((function (t) { try {
                if ("test" !== "test".normalize(t))
                    throw new Error("bad normalize");
            }
            catch (r) {
                e_39.push(t);
            } })), e_39.length)
                throw new Error("missing " + e_39.join(", "));
            if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
                throw new Error("broken implementation");
        }
        catch (e) {
            return e.message;
        } return null; }();
        var u, f;
        !function (e) { e.DEBUG = "DEBUG", e.INFO = "INFO", e.WARNING = "WARNING", e.ERROR = "ERROR", e.OFF = "OFF"; }(u || (u = {})), function (e) { e.UNKNOWN_ERROR = "UNKNOWN_ERROR", e.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", e.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", e.NETWORK_ERROR = "NETWORK_ERROR", e.SERVER_ERROR = "SERVER_ERROR", e.TIMEOUT = "TIMEOUT", e.BUFFER_OVERRUN = "BUFFER_OVERRUN", e.NUMERIC_FAULT = "NUMERIC_FAULT", e.MISSING_NEW = "MISSING_NEW", e.INVALID_ARGUMENT = "INVALID_ARGUMENT", e.MISSING_ARGUMENT = "MISSING_ARGUMENT", e.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", e.CALL_EXCEPTION = "CALL_EXCEPTION", e.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", e.NONCE_EXPIRED = "NONCE_EXPIRED", e.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", e.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", e.TRANSACTION_REPLACED = "TRANSACTION_REPLACED"; }(f || (f = {}));
        var l = "0123456789abcdef";
        var h = (function () {
            function h(e) {
                Object.defineProperty(this, "version", { enumerable: !0, value: e, writable: !1 });
            }
            h.prototype._log = function (e, t) { var r = e.toLowerCase(); null == o[r] && this.throwArgumentError("invalid log level name", "logLevel", e), s > o[r] || console.log.apply(console, t); };
            h.prototype.debug = function () {
                var e = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    e[_i] = arguments[_i];
                }
                this._log(h.levels.DEBUG, e);
            };
            h.prototype.info = function () {
                var e = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    e[_i] = arguments[_i];
                }
                this._log(h.levels.INFO, e);
            };
            h.prototype.warn = function () {
                var e = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    e[_i] = arguments[_i];
                }
                this._log(h.levels.WARNING, e);
            };
            h.prototype.makeError = function (e, t, r) { if (i)
                return this.makeError("censored error", t, {}); t || (t = h.errors.UNKNOWN_ERROR), r || (r = {}); var n = []; Object.keys(r).forEach((function (e) { var t = r[e]; try {
                if (t instanceof Uint8Array) {
                    var r_32 = "";
                    for (var e_40 = 0; e_40 < t.length; e_40++)
                        r_32 += l[t[e_40] >> 4], r_32 += l[15 & t[e_40]];
                    n.push(e + "=Uint8Array(0x" + r_32 + ")");
                }
                else
                    n.push(e + "=" + JSON.stringify(t));
            }
            catch (t) {
                n.push(e + "=" + JSON.stringify(r[e].toString()));
            } })), n.push("code=" + t), n.push("version=" + this.version); var o = e; n.length && (e += " (" + n.join(", ") + ")"); var s = new Error(e); return s.reason = o, s.code = t, Object.keys(r).forEach((function (e) { s[e] = r[e]; })), s; };
            h.prototype.throwError = function (e, t, r) { throw this.makeError(e, t, r); };
            h.prototype.throwArgumentError = function (e, t, r) { return this.throwError(e, h.errors.INVALID_ARGUMENT, { argument: t, value: r }); };
            h.prototype.assert = function (e, t, r, n) { e || this.throwError(t, r, n); };
            h.prototype.assertArgument = function (e, t, r, n) { e || this.throwArgumentError(t, r, n); };
            h.prototype.checkNormalize = function (e) { null == e && (e = "platform missing String.prototype.normalize"), c && this.throwError("platform missing String.prototype.normalize", h.errors.UNSUPPORTED_OPERATION, { operation: "String.prototype.normalize", form: c }); };
            h.prototype.checkSafeUint53 = function (e, t) { "number" == typeof e && (null == t && (t = "value not safe"), (e < 0 || e >= 9007199254740991) && this.throwError(t, h.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "out-of-safe-range", value: e }), e % 1 && this.throwError(t, h.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "non-integer", value: e })); };
            h.prototype.checkArgumentCount = function (e, t, r) { r = r ? ": " + r : "", e < t && this.throwError("missing argument" + r, h.errors.MISSING_ARGUMENT, { count: e, expectedCount: t }), e > t && this.throwError("too many arguments" + r, h.errors.UNEXPECTED_ARGUMENT, { count: e, expectedCount: t }); };
            h.prototype.checkNew = function (e, t) { e !== Object && null != e || this.throwError("missing new", h.errors.MISSING_NEW, { name: t.name }); };
            h.prototype.checkAbstract = function (e, t) { e === t ? this.throwError("cannot instantiate abstract class " + JSON.stringify(t.name) + " directly; use a sub-class", h.errors.UNSUPPORTED_OPERATION, { name: e.name, operation: "new" }) : e !== Object && null != e || this.throwError("missing new", h.errors.MISSING_NEW, { name: t.name }); };
            h.globalLogger = function () { return a || (a = new h("logger/5.5.0")), a; };
            h.setCensorship = function (e, t) { if (!e && t && this.globalLogger().throwError("cannot permanently disable censorship", h.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" }), n) {
                if (!e)
                    return;
                this.globalLogger().throwError("error censorship permanent", h.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" });
            } i = !!e, n = !!t; };
            h.setLogLevel = function (e) { var t = o[e.toLowerCase()]; null != t ? s = t : h.globalLogger().warn("invalid log level - " + e); };
            h.from = function (e) { return new h(e); };
            return h;
        }());
        h.errors = f, h.levels = u;
    }, 5306: function (e, t, r) {
        "use strict";
        r.d(t, { n: function () { return o; } });
        var n = r(3286), i = r(7158);
        function o(e, t, r, o, s) { var a; e = (0, n.arrayify)(e), t = (0, n.arrayify)(t); var c = 1; var u = new Uint8Array(o), f = new Uint8Array(t.length + 4); var l, h; f.set(t); for (var d = 1; d <= c; d++) {
            f[t.length] = d >> 24 & 255, f[t.length + 1] = d >> 16 & 255, f[t.length + 2] = d >> 8 & 255, f[t.length + 3] = 255 & d;
            var p = (0, n.arrayify)((0, i.Gy)(s, e, f));
            a || (a = p.length, h = new Uint8Array(a), c = Math.ceil(o / a), l = o - (c - 1) * a), h.set(p);
            for (var t_38 = 1; t_38 < r; t_38++) {
                p = (0, n.arrayify)((0, i.Gy)(s, e, p));
                for (var e_41 = 0; e_41 < a; e_41++)
                    h[e_41] ^= p[e_41];
            }
            var g = (d - 1) * a, m = d === c ? l : a;
            u.set((0, n.arrayify)(h).slice(0, m), g);
        } return (0, n.hexlify)(u); }
    }, 3587: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { Description: function () { return p; }, checkProperties: function () { return c; }, deepCopy: function () { return d; }, defineReadOnly: function () { return o; }, getStatic: function () { return s; }, resolveProperties: function () { return a; }, shallowCopy: function () { return u; } });
        var n = r(711);
        var i = new n.Logger("properties/5.5.0");
        function o(e, t, r) { Object.defineProperty(e, t, { enumerable: !0, value: r, writable: !1 }); }
        function s(e, t) { for (var r_33 = 0; r_33 < 32; r_33++) {
            if (e[t])
                return e[t];
            if (!e.prototype || "object" != typeof e.prototype)
                break;
            e = Object.getPrototypeOf(e.prototype).constructor;
        } return null; }
        function a(e) { return t = this, r = void 0, i = function () { var t; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = Object.keys(e).map((function (t) { var r = e[t]; return Promise.resolve(r).then((function (e) { return ({ key: t, value: e }); })); }));
                    return [4, Promise.all(t)];
                case 1: return [2, (_a.sent()).reduce((function (e, t) { return (e[t.key] = t.value, e); }), {})];
            }
        }); }, new ((n = void 0) || (n = Promise))((function (e, o) { function s(e) { try {
            c(i.next(e));
        }
        catch (e) {
            o(e);
        } } function a(e) { try {
            c(i.throw(e));
        }
        catch (e) {
            o(e);
        } } function c(t) { var r; t.done ? e(t.value) : (r = t.value, r instanceof n ? r : new n((function (e) { e(r); }))).then(s, a); } c((i = i.apply(t, r || [])).next()); })); var t, r, n, i; }
        function c(e, t) { e && "object" == typeof e || i.throwArgumentError("invalid object", "object", e), Object.keys(e).forEach((function (r) { t[r] || i.throwArgumentError("invalid object key - " + r, "transaction:" + r, e); })); }
        function u(e) { var t = {}; for (var r_34 in e)
            t[r_34] = e[r_34]; return t; }
        var f = { bigint: !0, boolean: !0, function: !0, number: !0, string: !0 };
        function l(e) { if (null == e || f[typeof e])
            return !0; if (Array.isArray(e) || "object" == typeof e) {
            if (!Object.isFrozen(e))
                return !1;
            var t_39 = Object.keys(e);
            for (var r_35 = 0; r_35 < t_39.length; r_35++) {
                var n_17 = null;
                try {
                    n_17 = e[t_39[r_35]];
                }
                catch (e) {
                    continue;
                }
                if (!l(n_17))
                    return !1;
            }
            return !0;
        } return i.throwArgumentError("Cannot deepCopy " + typeof e, "object", e); }
        function h(e) { if (l(e))
            return e; if (Array.isArray(e))
            return Object.freeze(e.map((function (e) { return d(e); }))); if ("object" == typeof e) {
            var t_40 = {};
            for (var r_36 in e) {
                var n_18 = e[r_36];
                void 0 !== n_18 && o(t_40, r_36, d(n_18));
            }
            return t_40;
        } return i.throwArgumentError("Cannot deepCopy " + typeof e, "object", e); }
        function d(e) { return h(e); }
        var p = (function () {
            function p(e) {
                for (var t_41 in e)
                    this[t_41] = d(e[t_41]);
            }
            return p;
        }());
    }, 7986: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { randomBytes: function () { return n.O; }, shuffled: function () { return i; } });
        var n = r(4478);
        function i(e) { for (var t_42 = (e = e.slice()).length - 1; t_42 > 0; t_42--) {
            var r_37 = Math.floor(Math.random() * (t_42 + 1)), n_19 = e[t_42];
            e[t_42] = e[r_37], e[r_37] = n_19;
        } return e; }
    }, 4478: function (e, t, r) {
        "use strict";
        r.d(t, { O: function () { return c; } });
        var n = r(3286), i = r(711);
        var o = new i.Logger("random/5.5.0");
        var s = null;
        try {
            if (s = window, null == s)
                throw new Error("try next");
        }
        catch (e) {
            try {
                if (s = r.g, null == s)
                    throw new Error("try next");
            }
            catch (e) {
                s = {};
            }
        }
        var a = s.crypto || s.msCrypto;
        function c(e) { (e <= 0 || e > 1024 || e % 1 || e != e) && o.throwArgumentError("invalid length", "length", e); var t = new Uint8Array(e); return a.getRandomValues(t), (0, n.arrayify)(t); }
        a && a.getRandomValues || (o.warn("WARNING: Missing strong random number source"), a = { getRandomValues: function (e) { return o.throwError("no secure random source avaialble", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "crypto.getRandomValues" }); } });
    }, 1843: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { decode: function () { return h; }, encode: function () { return u; } });
        var n = r(3286), i = r(711);
        var o = new i.Logger("rlp/5.5.0");
        function s(e) { var t = []; for (; e;)
            t.unshift(255 & e), e >>= 8; return t; }
        function a(e, t, r) { var n = 0; for (var i_12 = 0; i_12 < r; i_12++)
            n = 256 * n + e[t + i_12]; return n; }
        function c(e) { if (Array.isArray(e)) {
            var t_43 = [];
            if (e.forEach((function (e) { t_43 = t_43.concat(c(e)); })), t_43.length <= 55)
                return t_43.unshift(192 + t_43.length), t_43;
            var r_38 = s(t_43.length);
            return r_38.unshift(247 + r_38.length), r_38.concat(t_43);
        } (0, n.isBytesLike)(e) || o.throwArgumentError("RLP object must be BytesLike", "object", e); var t = Array.prototype.slice.call((0, n.arrayify)(e)); if (1 === t.length && t[0] <= 127)
            return t; if (t.length <= 55)
            return t.unshift(128 + t.length), t; var r = s(t.length); return r.unshift(183 + r.length), r.concat(t); }
        function u(e) { return (0, n.hexlify)(c(e)); }
        function f(e, t, r, n) { var s = []; for (; r < t + 1 + n;) {
            var a_8 = l(e, r);
            s.push(a_8.result), (r += a_8.consumed) > t + 1 + n && o.throwError("child data too short", i.Logger.errors.BUFFER_OVERRUN, {});
        } return { consumed: 1 + n, result: s }; }
        function l(e, t) { if (0 === e.length && o.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {}), e[t] >= 248) {
            var r_39 = e[t] - 247;
            t + 1 + r_39 > e.length && o.throwError("data short segment too short", i.Logger.errors.BUFFER_OVERRUN, {});
            var n_20 = a(e, t + 1, r_39);
            return t + 1 + r_39 + n_20 > e.length && o.throwError("data long segment too short", i.Logger.errors.BUFFER_OVERRUN, {}), f(e, t, t + 1 + r_39, r_39 + n_20);
        } if (e[t] >= 192) {
            var r_40 = e[t] - 192;
            return t + 1 + r_40 > e.length && o.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {}), f(e, t, t + 1, r_40);
        } if (e[t] >= 184) {
            var r_41 = e[t] - 183;
            t + 1 + r_41 > e.length && o.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {});
            var s_6 = a(e, t + 1, r_41);
            return t + 1 + r_41 + s_6 > e.length && o.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {}), { consumed: 1 + r_41 + s_6, result: (0, n.hexlify)(e.slice(t + 1 + r_41, t + 1 + r_41 + s_6)) };
        } if (e[t] >= 128) {
            var r_42 = e[t] - 128;
            return t + 1 + r_42 > e.length && o.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {}), { consumed: 1 + r_42, result: (0, n.hexlify)(e.slice(t + 1, t + 1 + r_42)) };
        } return { consumed: 1, result: (0, n.hexlify)(e[t]) }; }
        function h(e) { var t = (0, n.arrayify)(e), r = l(t, 0); return r.consumed !== t.length && o.throwArgumentError("invalid rlp data", "data", e), r.result; }
    }, 1278: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { computeHmac: function () { return n.Gy; }, ripemd160: function () { return n.bP; }, sha256: function () { return n.JQ; }, sha512: function () { return n.o; }, SupportedAlgorithm: function () { return i.p; } });
        var n = r(7158), i = r(1261);
    }, 7158: function (e, t, r) {
        "use strict";
        r.d(t, { Gy: function () { return h; }, bP: function () { return u; }, JQ: function () { return f; }, o: function () { return l; } });
        var n = r(3715), i = r.n(n), o = r(3286), s = r(1261), a = r(711);
        var c = new a.Logger("sha2/5.5.0");
        function u(e) { return "0x" + i().ripemd160().update((0, o.arrayify)(e)).digest("hex"); }
        function f(e) { return "0x" + i().sha256().update((0, o.arrayify)(e)).digest("hex"); }
        function l(e) { return "0x" + i().sha512().update((0, o.arrayify)(e)).digest("hex"); }
        function h(e, t, r) { return s.p[e] || c.throwError("unsupported algorithm " + e, a.Logger.errors.UNSUPPORTED_OPERATION, { operation: "hmac", algorithm: e }), "0x" + i().hmac(i()[e], (0, o.arrayify)(t)).update((0, o.arrayify)(r)).digest("hex"); }
    }, 1261: function (e, t, r) {
        "use strict";
        var n;
        r.d(t, { p: function () { return n; } }), function (e) { e.sha256 = "sha256", e.sha512 = "sha512"; }(n || (n = {}));
    }, 2768: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { SigningKey: function () { return $; }, computePublicKey: function () { return Z; }, recoverPublicKey: function () { return J; } });
        var n = r(3550), i = r.n(n), o = r(3715), s = r.n(o);
        function a(e, t, r) { return r = { path: t, exports: {}, require: function (e, t) { return function () { throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs"); }(null == t && r.path); } }, e(r, r.exports), r.exports; }
        "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== r.g ? r.g : "undefined" != typeof self && self;
        var c = u;
        function u(e, t) { if (!e)
            throw new Error(t || "Assertion failed"); }
        u.equal = function (e, t, r) { if (e != t)
            throw new Error(r || "Assertion failed: " + e + " != " + t); };
        var f = a((function (e, t) { var r = t; function n(e) { return 1 === e.length ? "0" + e : e; } function i(e) { for (var t = "", r = 0; r < e.length; r++)
            t += n(e[r].toString(16)); return t; } r.toArray = function (e, t) { if (Array.isArray(e))
            return e.slice(); if (!e)
            return []; var r = []; if ("string" != typeof e) {
            for (var n = 0; n < e.length; n++)
                r[n] = 0 | e[n];
            return r;
        } if ("hex" === t)
            for ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e), n = 0; n < e.length; n += 2)
                r.push(parseInt(e[n] + e[n + 1], 16));
        else
            for (n = 0; n < e.length; n++) {
                var i = e.charCodeAt(n), o = i >> 8, s = 255 & i;
                o ? r.push(o, s) : r.push(s);
            } return r; }, r.zero2 = n, r.toHex = i, r.encode = function (e, t) { return "hex" === t ? i(e) : e; }; })), l = a((function (e, t) { var r = t; r.assert = c, r.toArray = f.toArray, r.zero2 = f.zero2, r.toHex = f.toHex, r.encode = f.encode, r.getNAF = function (e, t, r) { var n = new Array(Math.max(e.bitLength(), r) + 1); n.fill(0); for (var i = 1 << t + 1, o = e.clone(), s = 0; s < n.length; s++) {
            var a, c = o.andln(i - 1);
            o.isOdd() ? (a = c > (i >> 1) - 1 ? (i >> 1) - c : c, o.isubn(a)) : a = 0, n[s] = a, o.iushrn(1);
        } return n; }, r.getJSF = function (e, t) { var r = [[], []]; e = e.clone(), t = t.clone(); for (var n, i = 0, o = 0; e.cmpn(-i) > 0 || t.cmpn(-o) > 0;) {
            var s, a, c = e.andln(3) + i & 3, u = t.andln(3) + o & 3;
            3 === c && (c = -1), 3 === u && (u = -1), s = 0 == (1 & c) ? 0 : 3 != (n = e.andln(7) + i & 7) && 5 !== n || 2 !== u ? c : -c, r[0].push(s), a = 0 == (1 & u) ? 0 : 3 != (n = t.andln(7) + o & 7) && 5 !== n || 2 !== c ? u : -u, r[1].push(a), 2 * i === s + 1 && (i = 1 - i), 2 * o === a + 1 && (o = 1 - o), e.iushrn(1), t.iushrn(1);
        } return r; }, r.cachedProperty = function (e, t, r) { var n = "_" + t; e.prototype[t] = function () { return void 0 !== this[n] ? this[n] : this[n] = r.call(this); }; }, r.parseBytes = function (e) { return "string" == typeof e ? r.toArray(e, "hex") : e; }, r.intFromLE = function (e) { return new (i())(e, "hex", "le"); }; })), h = l.getNAF, d = l.getJSF, p = l.assert;
        function g(e, t) { this.type = e, this.p = new (i())(t.p, 16), this.red = t.prime ? i().red(t.prime) : i().mont(this.p), this.zero = new (i())(0).toRed(this.red), this.one = new (i())(1).toRed(this.red), this.two = new (i())(2).toRed(this.red), this.n = t.n && new (i())(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0; var r = this.n && this.p.div(this.n); !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red)); }
        var m = g;
        function y(e, t) { this.curve = e, this.type = t, this.precomputed = null; }
        g.prototype.point = function () { throw new Error("Not implemented"); }, g.prototype.validate = function () { throw new Error("Not implemented"); }, g.prototype._fixedNafMul = function (e, t) { p(e.precomputed); var r = e._getDoubles(), n = h(t, 1, this._bitLength), i = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1); i /= 3; var o, s, a = []; for (o = 0; o < n.length; o += r.step) {
            s = 0;
            for (var c = o + r.step - 1; c >= o; c--)
                s = (s << 1) + n[c];
            a.push(s);
        } for (var u = this.jpoint(null, null, null), f = this.jpoint(null, null, null), l = i; l > 0; l--) {
            for (o = 0; o < a.length; o++)
                (s = a[o]) === l ? f = f.mixedAdd(r.points[o]) : s === -l && (f = f.mixedAdd(r.points[o].neg()));
            u = u.add(f);
        } return u.toP(); }, g.prototype._wnafMul = function (e, t) { var r = 4, n = e._getNAFPoints(r); r = n.wnd; for (var i = n.points, o = h(t, r, this._bitLength), s = this.jpoint(null, null, null), a = o.length - 1; a >= 0; a--) {
            for (var c = 0; a >= 0 && 0 === o[a]; a--)
                c++;
            if (a >= 0 && c++, s = s.dblp(c), a < 0)
                break;
            var u = o[a];
            p(0 !== u), s = "affine" === e.type ? u > 0 ? s.mixedAdd(i[u - 1 >> 1]) : s.mixedAdd(i[-u - 1 >> 1].neg()) : u > 0 ? s.add(i[u - 1 >> 1]) : s.add(i[-u - 1 >> 1].neg());
        } return "affine" === e.type ? s.toP() : s; }, g.prototype._wnafMulAdd = function (e, t, r, n, i) { var o, s, a, c = this._wnafT1, u = this._wnafT2, f = this._wnafT3, l = 0; for (o = 0; o < n; o++) {
            var p = (a = t[o])._getNAFPoints(e);
            c[o] = p.wnd, u[o] = p.points;
        } for (o = n - 1; o >= 1; o -= 2) {
            var g = o - 1, m = o;
            if (1 === c[g] && 1 === c[m]) {
                var y = [t[g], null, null, t[m]];
                0 === t[g].y.cmp(t[m].y) ? (y[1] = t[g].add(t[m]), y[2] = t[g].toJ().mixedAdd(t[m].neg())) : 0 === t[g].y.cmp(t[m].y.redNeg()) ? (y[1] = t[g].toJ().mixedAdd(t[m]), y[2] = t[g].add(t[m].neg())) : (y[1] = t[g].toJ().mixedAdd(t[m]), y[2] = t[g].toJ().mixedAdd(t[m].neg()));
                var b = [-3, -1, -5, -7, 0, 7, 5, 1, 3], v = d(r[g], r[m]);
                for (l = Math.max(v[0].length, l), f[g] = new Array(l), f[m] = new Array(l), s = 0; s < l; s++) {
                    var w = 0 | v[0][s], A = 0 | v[1][s];
                    f[g][s] = b[3 * (w + 1) + (A + 1)], f[m][s] = 0, u[g] = y;
                }
            }
            else
                f[g] = h(r[g], c[g], this._bitLength), f[m] = h(r[m], c[m], this._bitLength), l = Math.max(f[g].length, l), l = Math.max(f[m].length, l);
        } var S = this.jpoint(null, null, null), E = this._wnafT4; for (o = l; o >= 0; o--) {
            for (var k = 0; o >= 0;) {
                var x = !0;
                for (s = 0; s < n; s++)
                    E[s] = 0 | f[s][o], 0 !== E[s] && (x = !1);
                if (!x)
                    break;
                k++, o--;
            }
            if (o >= 0 && k++, S = S.dblp(k), o < 0)
                break;
            for (s = 0; s < n; s++) {
                var N = E[s];
                0 !== N && (N > 0 ? a = u[s][N - 1 >> 1] : N < 0 && (a = u[s][-N - 1 >> 1].neg()), S = "affine" === a.type ? S.mixedAdd(a) : S.add(a));
            }
        } for (o = 0; o < n; o++)
            u[o] = null; return i ? S : S.toP(); }, g.BasePoint = y, y.prototype.eq = function () { throw new Error("Not implemented"); }, y.prototype.validate = function () { return this.curve.validate(this); }, g.prototype.decodePoint = function (e, t) { e = l.toArray(e, t); var r = this.p.byteLength(); if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * r)
            return 6 === e[0] ? p(e[e.length - 1] % 2 == 0) : 7 === e[0] && p(e[e.length - 1] % 2 == 1), this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r)); if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r)
            return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]); throw new Error("Unknown point format"); }, y.prototype.encodeCompressed = function (e) { return this.encode(e, !0); }, y.prototype._encode = function (e) { var t = this.curve.p.byteLength(), r = this.getX().toArray("be", t); return e ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", t)); }, y.prototype.encode = function (e, t) { return l.encode(this._encode(t), e); }, y.prototype.precompute = function (e) { if (this.precomputed)
            return this; var t = { doubles: null, naf: null, beta: null }; return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this; }, y.prototype._hasDoubles = function (e) { if (!this.precomputed)
            return !1; var t = this.precomputed.doubles; return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step); }, y.prototype._getDoubles = function (e, t) { if (this.precomputed && this.precomputed.doubles)
            return this.precomputed.doubles; for (var r = [this], n = this, i = 0; i < t; i += e) {
            for (var o = 0; o < e; o++)
                n = n.dbl();
            r.push(n);
        } return { step: e, points: r }; }, y.prototype._getNAFPoints = function (e) { if (this.precomputed && this.precomputed.naf)
            return this.precomputed.naf; for (var t = [this], r = (1 << e) - 1, n = 1 === r ? null : this.dbl(), i = 1; i < r; i++)
            t[i] = t[i - 1].add(n); return { wnd: e, points: t }; }, y.prototype._getBeta = function () { return null; }, y.prototype.dblp = function (e) { for (var t = this, r = 0; r < e; r++)
            t = t.dbl(); return t; };
        var b = a((function (e) { "function" == typeof Object.create ? e.exports = function (e, t) { t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })); } : e.exports = function (e, t) { if (t) {
            e.super_ = t;
            var r = function () { };
            r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e;
        } }; })), v = l.assert;
        function w(e) { m.call(this, "short", e), this.a = new (i())(e.a, 16).toRed(this.red), this.b = new (i())(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4); }
        b(w, m);
        var A = w;
        function S(e, t, r, n) { m.BasePoint.call(this, e, "affine"), null === t && null === r ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new (i())(t, 16), this.y = new (i())(r, 16), n && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1); }
        function E(e, t, r, n) { m.BasePoint.call(this, e, "jacobian"), null === t && null === r && null === n ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new (i())(0)) : (this.x = new (i())(t, 16), this.y = new (i())(r, 16), this.z = new (i())(n, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one; }
        w.prototype._getEndomorphism = function (e) { if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
            var t, r;
            if (e.beta)
                t = new (i())(e.beta, 16).toRed(this.red);
            else {
                var n = this._getEndoRoots(this.p);
                t = (t = n[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red);
            }
            if (e.lambda)
                r = new (i())(e.lambda, 16);
            else {
                var o = this._getEndoRoots(this.n);
                0 === this.g.mul(o[0]).x.cmp(this.g.x.redMul(t)) ? r = o[0] : (r = o[1], v(0 === this.g.mul(r).x.cmp(this.g.x.redMul(t))));
            }
            return { beta: t, lambda: r, basis: e.basis ? e.basis.map((function (e) { return { a: new (i())(e.a, 16), b: new (i())(e.b, 16) }; })) : this._getEndoBasis(r) };
        } }, w.prototype._getEndoRoots = function (e) { var t = e === this.p ? this.red : i().mont(e), r = new (i())(2).toRed(t).redInvm(), n = r.redNeg(), o = new (i())(3).toRed(t).redNeg().redSqrt().redMul(r); return [n.redAdd(o).fromRed(), n.redSub(o).fromRed()]; }, w.prototype._getEndoBasis = function (e) { for (var t, r, n, o, s, a, c, u, f, l = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), h = e, d = this.n.clone(), p = new (i())(1), g = new (i())(0), m = new (i())(0), y = new (i())(1), b = 0; 0 !== h.cmpn(0);) {
            var v = d.div(h);
            u = d.sub(v.mul(h)), f = m.sub(v.mul(p));
            var w = y.sub(v.mul(g));
            if (!n && u.cmp(l) < 0)
                t = c.neg(), r = p, n = u.neg(), o = f;
            else if (n && 2 == ++b)
                break;
            c = u, d = h, h = u, m = p, p = f, y = g, g = w;
        } s = u.neg(), a = f; var A = n.sqr().add(o.sqr()); return s.sqr().add(a.sqr()).cmp(A) >= 0 && (s = t, a = r), n.negative && (n = n.neg(), o = o.neg()), s.negative && (s = s.neg(), a = a.neg()), [{ a: n, b: o }, { a: s, b: a }]; }, w.prototype._endoSplit = function (e) { var t = this.endo.basis, r = t[0], n = t[1], i = n.b.mul(e).divRound(this.n), o = r.b.neg().mul(e).divRound(this.n), s = i.mul(r.a), a = o.mul(n.a), c = i.mul(r.b), u = o.mul(n.b); return { k1: e.sub(s).sub(a), k2: c.add(u).neg() }; }, w.prototype.pointFromX = function (e, t) { (e = new (i())(e, 16)).red || (e = e.toRed(this.red)); var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), n = r.redSqrt(); if (0 !== n.redSqr().redSub(r).cmp(this.zero))
            throw new Error("invalid point"); var o = n.fromRed().isOdd(); return (t && !o || !t && o) && (n = n.redNeg()), this.point(e, n); }, w.prototype.validate = function (e) { if (e.inf)
            return !0; var t = e.x, r = e.y, n = this.a.redMul(t), i = t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b); return 0 === r.redSqr().redISub(i).cmpn(0); }, w.prototype._endoWnafMulAdd = function (e, t, r) { for (var n = this._endoWnafT1, i = this._endoWnafT2, o = 0; o < e.length; o++) {
            var s = this._endoSplit(t[o]), a = e[o], c = a._getBeta();
            s.k1.negative && (s.k1.ineg(), a = a.neg(!0)), s.k2.negative && (s.k2.ineg(), c = c.neg(!0)), n[2 * o] = a, n[2 * o + 1] = c, i[2 * o] = s.k1, i[2 * o + 1] = s.k2;
        } for (var u = this._wnafMulAdd(1, n, i, 2 * o, r), f = 0; f < 2 * o; f++)
            n[f] = null, i[f] = null; return u; }, b(S, m.BasePoint), w.prototype.point = function (e, t, r) { return new S(this, e, t, r); }, w.prototype.pointFromJSON = function (e, t) { return S.fromJSON(this, e, t); }, S.prototype._getBeta = function () { if (this.curve.endo) {
            var e = this.precomputed;
            if (e && e.beta)
                return e.beta;
            var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
            if (e) {
                var r = this.curve, n = function (e) { return r.point(e.x.redMul(r.endo.beta), e.y); };
                e.beta = t, t.precomputed = { beta: null, naf: e.naf && { wnd: e.naf.wnd, points: e.naf.points.map(n) }, doubles: e.doubles && { step: e.doubles.step, points: e.doubles.points.map(n) } };
            }
            return t;
        } }, S.prototype.toJSON = function () { return this.precomputed ? [this.x, this.y, this.precomputed && { doubles: this.precomputed.doubles && { step: this.precomputed.doubles.step, points: this.precomputed.doubles.points.slice(1) }, naf: this.precomputed.naf && { wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1) } }] : [this.x, this.y]; }, S.fromJSON = function (e, t, r) { "string" == typeof t && (t = JSON.parse(t)); var n = e.point(t[0], t[1], r); if (!t[2])
            return n; function i(t) { return e.point(t[0], t[1], r); } var o = t[2]; return n.precomputed = { beta: null, doubles: o.doubles && { step: o.doubles.step, points: [n].concat(o.doubles.points.map(i)) }, naf: o.naf && { wnd: o.naf.wnd, points: [n].concat(o.naf.points.map(i)) } }, n; }, S.prototype.inspect = function () { return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"; }, S.prototype.isInfinity = function () { return this.inf; }, S.prototype.add = function (e) { if (this.inf)
            return e; if (e.inf)
            return this; if (this.eq(e))
            return this.dbl(); if (this.neg().eq(e))
            return this.curve.point(null, null); if (0 === this.x.cmp(e.x))
            return this.curve.point(null, null); var t = this.y.redSub(e.y); 0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm())); var r = t.redSqr().redISub(this.x).redISub(e.x), n = t.redMul(this.x.redSub(r)).redISub(this.y); return this.curve.point(r, n); }, S.prototype.dbl = function () { if (this.inf)
            return this; var e = this.y.redAdd(this.y); if (0 === e.cmpn(0))
            return this.curve.point(null, null); var t = this.curve.a, r = this.x.redSqr(), n = e.redInvm(), i = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(n), o = i.redSqr().redISub(this.x.redAdd(this.x)), s = i.redMul(this.x.redSub(o)).redISub(this.y); return this.curve.point(o, s); }, S.prototype.getX = function () { return this.x.fromRed(); }, S.prototype.getY = function () { return this.y.fromRed(); }, S.prototype.mul = function (e) { return e = new (i())(e, 16), this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e); }, S.prototype.mulAdd = function (e, t, r) { var n = [this, t], i = [e, r]; return this.curve.endo ? this.curve._endoWnafMulAdd(n, i) : this.curve._wnafMulAdd(1, n, i, 2); }, S.prototype.jmulAdd = function (e, t, r) { var n = [this, t], i = [e, r]; return this.curve.endo ? this.curve._endoWnafMulAdd(n, i, !0) : this.curve._wnafMulAdd(1, n, i, 2, !0); }, S.prototype.eq = function (e) { return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y)); }, S.prototype.neg = function (e) { if (this.inf)
            return this; var t = this.curve.point(this.x, this.y.redNeg()); if (e && this.precomputed) {
            var r = this.precomputed, n = function (e) { return e.neg(); };
            t.precomputed = { naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(n) }, doubles: r.doubles && { step: r.doubles.step, points: r.doubles.points.map(n) } };
        } return t; }, S.prototype.toJ = function () { return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one); }, b(E, m.BasePoint), w.prototype.jpoint = function (e, t, r) { return new E(this, e, t, r); }, E.prototype.toP = function () { if (this.isInfinity())
            return this.curve.point(null, null); var e = this.z.redInvm(), t = e.redSqr(), r = this.x.redMul(t), n = this.y.redMul(t).redMul(e); return this.curve.point(r, n); }, E.prototype.neg = function () { return this.curve.jpoint(this.x, this.y.redNeg(), this.z); }, E.prototype.add = function (e) { if (this.isInfinity())
            return e; if (e.isInfinity())
            return this; var t = e.z.redSqr(), r = this.z.redSqr(), n = this.x.redMul(t), i = e.x.redMul(r), o = this.y.redMul(t.redMul(e.z)), s = e.y.redMul(r.redMul(this.z)), a = n.redSub(i), c = o.redSub(s); if (0 === a.cmpn(0))
            return 0 !== c.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl(); var u = a.redSqr(), f = u.redMul(a), l = n.redMul(u), h = c.redSqr().redIAdd(f).redISub(l).redISub(l), d = c.redMul(l.redISub(h)).redISub(o.redMul(f)), p = this.z.redMul(e.z).redMul(a); return this.curve.jpoint(h, d, p); }, E.prototype.mixedAdd = function (e) { if (this.isInfinity())
            return e.toJ(); if (e.isInfinity())
            return this; var t = this.z.redSqr(), r = this.x, n = e.x.redMul(t), i = this.y, o = e.y.redMul(t).redMul(this.z), s = r.redSub(n), a = i.redSub(o); if (0 === s.cmpn(0))
            return 0 !== a.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl(); var c = s.redSqr(), u = c.redMul(s), f = r.redMul(c), l = a.redSqr().redIAdd(u).redISub(f).redISub(f), h = a.redMul(f.redISub(l)).redISub(i.redMul(u)), d = this.z.redMul(s); return this.curve.jpoint(l, h, d); }, E.prototype.dblp = function (e) { if (0 === e)
            return this; if (this.isInfinity())
            return this; if (!e)
            return this.dbl(); var t; if (this.curve.zeroA || this.curve.threeA) {
            var r = this;
            for (t = 0; t < e; t++)
                r = r.dbl();
            return r;
        } var n = this.curve.a, i = this.curve.tinv, o = this.x, s = this.y, a = this.z, c = a.redSqr().redSqr(), u = s.redAdd(s); for (t = 0; t < e; t++) {
            var f = o.redSqr(), l = u.redSqr(), h = l.redSqr(), d = f.redAdd(f).redIAdd(f).redIAdd(n.redMul(c)), p = o.redMul(l), g = d.redSqr().redISub(p.redAdd(p)), m = p.redISub(g), y = d.redMul(m);
            y = y.redIAdd(y).redISub(h);
            var b = u.redMul(a);
            t + 1 < e && (c = c.redMul(h)), o = g, a = b, u = y;
        } return this.curve.jpoint(o, u.redMul(i), a); }, E.prototype.dbl = function () { return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl(); }, E.prototype._zeroDbl = function () { var e, t, r; if (this.zOne) {
            var n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), s = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
            s = s.redIAdd(s);
            var a = n.redAdd(n).redIAdd(n), c = a.redSqr().redISub(s).redISub(s), u = o.redIAdd(o);
            u = (u = u.redIAdd(u)).redIAdd(u), e = c, t = a.redMul(s.redISub(c)).redISub(u), r = this.y.redAdd(this.y);
        }
        else {
            var f = this.x.redSqr(), l = this.y.redSqr(), h = l.redSqr(), d = this.x.redAdd(l).redSqr().redISub(f).redISub(h);
            d = d.redIAdd(d);
            var p = f.redAdd(f).redIAdd(f), g = p.redSqr(), m = h.redIAdd(h);
            m = (m = m.redIAdd(m)).redIAdd(m), e = g.redISub(d).redISub(d), t = p.redMul(d.redISub(e)).redISub(m), r = (r = this.y.redMul(this.z)).redIAdd(r);
        } return this.curve.jpoint(e, t, r); }, E.prototype._threeDbl = function () { var e, t, r; if (this.zOne) {
            var n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), s = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
            s = s.redIAdd(s);
            var a = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a), c = a.redSqr().redISub(s).redISub(s);
            e = c;
            var u = o.redIAdd(o);
            u = (u = u.redIAdd(u)).redIAdd(u), t = a.redMul(s.redISub(c)).redISub(u), r = this.y.redAdd(this.y);
        }
        else {
            var f = this.z.redSqr(), l = this.y.redSqr(), h = this.x.redMul(l), d = this.x.redSub(f).redMul(this.x.redAdd(f));
            d = d.redAdd(d).redIAdd(d);
            var p = h.redIAdd(h), g = (p = p.redIAdd(p)).redAdd(p);
            e = d.redSqr().redISub(g), r = this.y.redAdd(this.z).redSqr().redISub(l).redISub(f);
            var m = l.redSqr();
            m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m), t = d.redMul(p.redISub(e)).redISub(m);
        } return this.curve.jpoint(e, t, r); }, E.prototype._dbl = function () { var e = this.curve.a, t = this.x, r = this.y, n = this.z, i = n.redSqr().redSqr(), o = t.redSqr(), s = r.redSqr(), a = o.redAdd(o).redIAdd(o).redIAdd(e.redMul(i)), c = t.redAdd(t), u = (c = c.redIAdd(c)).redMul(s), f = a.redSqr().redISub(u.redAdd(u)), l = u.redISub(f), h = s.redSqr(); h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h); var d = a.redMul(l).redISub(h), p = r.redAdd(r).redMul(n); return this.curve.jpoint(f, d, p); }, E.prototype.trpl = function () { if (!this.curve.zeroA)
            return this.dbl().add(this); var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(), n = t.redSqr(), i = e.redAdd(e).redIAdd(e), o = i.redSqr(), s = this.x.redAdd(t).redSqr().redISub(e).redISub(n), a = (s = (s = (s = s.redIAdd(s)).redAdd(s).redIAdd(s)).redISub(o)).redSqr(), c = n.redIAdd(n); c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c); var u = i.redIAdd(s).redSqr().redISub(o).redISub(a).redISub(c), f = t.redMul(u); f = (f = f.redIAdd(f)).redIAdd(f); var l = this.x.redMul(a).redISub(f); l = (l = l.redIAdd(l)).redIAdd(l); var h = this.y.redMul(u.redMul(c.redISub(u)).redISub(s.redMul(a))); h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h); var d = this.z.redAdd(s).redSqr().redISub(r).redISub(a); return this.curve.jpoint(l, h, d); }, E.prototype.mul = function (e, t) { return e = new (i())(e, t), this.curve._wnafMul(this, e); }, E.prototype.eq = function (e) { if ("affine" === e.type)
            return this.eq(e.toJ()); if (this === e)
            return !0; var t = this.z.redSqr(), r = e.z.redSqr(); if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))
            return !1; var n = t.redMul(this.z), i = r.redMul(e.z); return 0 === this.y.redMul(i).redISub(e.y.redMul(n)).cmpn(0); }, E.prototype.eqXToP = function (e) { var t = this.z.redSqr(), r = e.toRed(this.curve.red).redMul(t); if (0 === this.x.cmp(r))
            return !0; for (var n = e.clone(), i = this.curve.redN.redMul(t);;) {
            if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)
                return !1;
            if (r.redIAdd(i), 0 === this.x.cmp(r))
                return !0;
        } }, E.prototype.inspect = function () { return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"; }, E.prototype.isInfinity = function () { return 0 === this.z.cmpn(0); };
        var k = a((function (e, t) { var r = t; r.base = m, r.short = A, r.mont = null, r.edwards = null; })), x = a((function (e, t) { var r, n = t, i = l.assert; function o(e) { "short" === e.type ? this.curve = new k.short(e) : "edwards" === e.type ? this.curve = new k.edwards(e) : this.curve = new k.mont(e), this.g = this.curve.g, this.n = this.curve.n, this.hash = e.hash, i(this.g.validate(), "Invalid curve"), i(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O"); } function a(e, t) { Object.defineProperty(n, e, { configurable: !0, enumerable: !0, get: function () { var r = new o(t); return Object.defineProperty(n, e, { configurable: !0, enumerable: !0, value: r }), r; } }); } n.PresetCurve = o, a("p192", { type: "short", prime: "p192", p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff", a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc", b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1", n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831", hash: s().sha256, gRed: !1, g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"] }), a("p224", { type: "short", prime: "p224", p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001", a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe", b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4", n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d", hash: s().sha256, gRed: !1, g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"] }), a("p256", { type: "short", prime: null, p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff", a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc", b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b", n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551", hash: s().sha256, gRed: !1, g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"] }), a("p384", { type: "short", prime: null, p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff", a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc", b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef", n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973", hash: s().sha384, gRed: !1, g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"] }), a("p521", { type: "short", prime: null, p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff", a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc", b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00", n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409", hash: s().sha512, gRed: !1, g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"] }), a("curve25519", { type: "mont", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "76d06", b: "1", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: s().sha256, gRed: !1, g: ["9"] }), a("ed25519", { type: "edwards", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "-1", c: "1", d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: s().sha256, gRed: !1, g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"] }); try {
            r = null.crash();
        }
        catch (e) {
            r = void 0;
        } a("secp256k1", { type: "short", prime: "k256", p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f", a: "0", b: "7", n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141", h: "1", hash: s().sha256, beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72", basis: [{ a: "3086d221a7d46bcde86c90e49284eb15", b: "-e4437ed6010e88286f547fa90abfe4c3" }, { a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15" }], gRed: !1, g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", r] }); }));
        function N(e) { if (!(this instanceof N))
            return new N(e); this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null; var t = f.toArray(e.entropy, e.entropyEnc || "hex"), r = f.toArray(e.nonce, e.nonceEnc || "hex"), n = f.toArray(e.pers, e.persEnc || "hex"); c(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(t, r, n); }
        var B = N;
        N.prototype._init = function (e, t, r) { var n = e.concat(t).concat(r); this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8); for (var i = 0; i < this.V.length; i++)
            this.K[i] = 0, this.V[i] = 1; this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656; }, N.prototype._hmac = function () { return new (s().hmac)(this.hash, this.K); }, N.prototype._update = function (e) { var t = this._hmac().update(this.V).update([0]); e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest()); }, N.prototype.reseed = function (e, t, r, n) { "string" != typeof t && (n = r, r = t, t = null), e = f.toArray(e, t), r = f.toArray(r, n), c(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(e.concat(r || [])), this._reseed = 1; }, N.prototype.generate = function (e, t, r, n) { if (this._reseed > this.reseedInterval)
            throw new Error("Reseed is required"); "string" != typeof t && (n = r, r = t, t = null), r && (r = f.toArray(r, n || "hex"), this._update(r)); for (var i = []; i.length < e;)
            this.V = this._hmac().update(this.V).digest(), i = i.concat(this.V); var o = i.slice(0, e); return this._update(r), this._reseed++, f.encode(o, t); };
        var P = l.assert;
        function _(e, t) { this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc); }
        var I = _;
        _.fromPublic = function (e, t, r) { return t instanceof _ ? t : new _(e, { pub: t, pubEnc: r }); }, _.fromPrivate = function (e, t, r) { return t instanceof _ ? t : new _(e, { priv: t, privEnc: r }); }, _.prototype.validate = function () { var e = this.getPublic(); return e.isInfinity() ? { result: !1, reason: "Invalid public key" } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" }; }, _.prototype.getPublic = function (e, t) { return "string" == typeof e && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub; }, _.prototype.getPrivate = function (e) { return "hex" === e ? this.priv.toString(16, 2) : this.priv; }, _.prototype._importPrivate = function (e, t) { this.priv = new (i())(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n); }, _.prototype._importPublic = function (e, t) { if (e.x || e.y)
            return "mont" === this.ec.curve.type ? P(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || P(e.x && e.y, "Need both x and y coordinate"), void (this.pub = this.ec.curve.point(e.x, e.y)); this.pub = this.ec.curve.decodePoint(e, t); }, _.prototype.derive = function (e) { return e.validate() || P(e.validate(), "public point not validated"), e.mul(this.priv).getX(); }, _.prototype.sign = function (e, t, r) { return this.ec.sign(e, this, t, r); }, _.prototype.verify = function (e, t) { return this.ec.verify(e, t, this); }, _.prototype.inspect = function () { return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"; };
        var O = l.assert;
        function T(e, t) { if (e instanceof T)
            return e; this._importDER(e, t) || (O(e.r && e.s, "Signature without r or s"), this.r = new (i())(e.r, 16), this.s = new (i())(e.s, 16), void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam); }
        var R = T;
        function C() { this.place = 0; }
        function M(e, t) { var r = e[t.place++]; if (!(128 & r))
            return r; var n = 15 & r; if (0 === n || n > 4)
            return !1; for (var i = 0, o = 0, s = t.place; o < n; o++, s++)
            i <<= 8, i |= e[s], i >>>= 0; return !(i <= 127) && (t.place = s, i); }
        function L(e) { for (var t = 0, r = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < r;)
            t++; return 0 === t ? e : e.slice(t); }
        function U(e, t) { if (t < 128)
            e.push(t);
        else {
            var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
            for (e.push(128 | r); --r;)
                e.push(t >>> (r << 3) & 255);
            e.push(t);
        } }
        T.prototype._importDER = function (e, t) { e = l.toArray(e, t); var r = new C; if (48 !== e[r.place++])
            return !1; var n = M(e, r); if (!1 === n)
            return !1; if (n + r.place !== e.length)
            return !1; if (2 !== e[r.place++])
            return !1; var o = M(e, r); if (!1 === o)
            return !1; var s = e.slice(r.place, o + r.place); if (r.place += o, 2 !== e[r.place++])
            return !1; var a = M(e, r); if (!1 === a)
            return !1; if (e.length !== a + r.place)
            return !1; var c = e.slice(r.place, a + r.place); if (0 === s[0]) {
            if (!(128 & s[1]))
                return !1;
            s = s.slice(1);
        } if (0 === c[0]) {
            if (!(128 & c[1]))
                return !1;
            c = c.slice(1);
        } return this.r = new (i())(s), this.s = new (i())(c), this.recoveryParam = null, !0; }, T.prototype.toDER = function (e) { var t = this.r.toArray(), r = this.s.toArray(); for (128 & t[0] && (t = [0].concat(t)), 128 & r[0] && (r = [0].concat(r)), t = L(t), r = L(r); !(r[0] || 128 & r[1]);)
            r = r.slice(1); var n = [2]; U(n, t.length), (n = n.concat(t)).push(2), U(n, r.length); var i = n.concat(r), o = [48]; return U(o, i.length), o = o.concat(i), l.encode(o, e); };
        var D = function () { throw new Error("unsupported"); }, F = l.assert;
        function j(e) { if (!(this instanceof j))
            return new j(e); "string" == typeof e && (F(Object.prototype.hasOwnProperty.call(x, e), "Unknown curve " + e), e = x[e]), e instanceof x.PresetCurve && (e = { curve: e }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash; }
        var H = j;
        j.prototype.keyPair = function (e) { return new I(this, e); }, j.prototype.keyFromPrivate = function (e, t) { return I.fromPrivate(this, e, t); }, j.prototype.keyFromPublic = function (e, t) { return I.fromPublic(this, e, t); }, j.prototype.genKeyPair = function (e) { e || (e = {}); for (var t = new B({ hash: this.hash, pers: e.pers, persEnc: e.persEnc || "utf8", entropy: e.entropy || D(this.hash.hmacStrength), entropyEnc: e.entropy && e.entropyEnc || "utf8", nonce: this.n.toArray() }), r = this.n.byteLength(), n = this.n.sub(new (i())(2));;) {
            var o = new (i())(t.generate(r));
            if (!(o.cmp(n) > 0))
                return o.iaddn(1), this.keyFromPrivate(o);
        } }, j.prototype._truncateToN = function (e, t) { var r = 8 * e.byteLength() - this.n.bitLength(); return r > 0 && (e = e.ushrn(r)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e; }, j.prototype.sign = function (e, t, r, n) { "object" == typeof r && (n = r, r = null), n || (n = {}), t = this.keyFromPrivate(t, r), e = this._truncateToN(new (i())(e, 16)); for (var o = this.n.byteLength(), s = t.getPrivate().toArray("be", o), a = e.toArray("be", o), c = new B({ hash: this.hash, entropy: s, nonce: a, pers: n.pers, persEnc: n.persEnc || "utf8" }), u = this.n.sub(new (i())(1)), f = 0;; f++) {
            var l = n.k ? n.k(f) : new (i())(c.generate(this.n.byteLength()));
            if (!((l = this._truncateToN(l, !0)).cmpn(1) <= 0 || l.cmp(u) >= 0)) {
                var h = this.g.mul(l);
                if (!h.isInfinity()) {
                    var d = h.getX(), p = d.umod(this.n);
                    if (0 !== p.cmpn(0)) {
                        var g = l.invm(this.n).mul(p.mul(t.getPrivate()).iadd(e));
                        if (0 !== (g = g.umod(this.n)).cmpn(0)) {
                            var m = (h.getY().isOdd() ? 1 : 0) | (0 !== d.cmp(p) ? 2 : 0);
                            return n.canonical && g.cmp(this.nh) > 0 && (g = this.n.sub(g), m ^= 1), new R({ r: p, s: g, recoveryParam: m });
                        }
                    }
                }
            }
        } }, j.prototype.verify = function (e, t, r, n) { e = this._truncateToN(new (i())(e, 16)), r = this.keyFromPublic(r, n); var o = (t = new R(t, "hex")).r, s = t.s; if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0)
            return !1; if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
            return !1; var a, c = s.invm(this.n), u = c.mul(e).umod(this.n), f = c.mul(o).umod(this.n); return this.curve._maxwellTrick ? !(a = this.g.jmulAdd(u, r.getPublic(), f)).isInfinity() && a.eqXToP(o) : !(a = this.g.mulAdd(u, r.getPublic(), f)).isInfinity() && 0 === a.getX().umod(this.n).cmp(o); }, j.prototype.recoverPubKey = function (e, t, r, n) { F((3 & r) === r, "The recovery param is more than two bits"), t = new R(t, n); var o = this.n, s = new (i())(e), a = t.r, c = t.s, u = 1 & r, f = r >> 1; if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && f)
            throw new Error("Unable to find sencond key candinate"); a = f ? this.curve.pointFromX(a.add(this.curve.n), u) : this.curve.pointFromX(a, u); var l = t.r.invm(o), h = o.sub(s).mul(l).umod(o), d = c.mul(l).umod(o); return this.g.mulAdd(h, a, d); }, j.prototype.getKeyRecoveryParam = function (e, t, r, n) { if (null !== (t = new R(t, n)).recoveryParam)
            return t.recoveryParam; for (var i = 0; i < 4; i++) {
            var o;
            try {
                o = this.recoverPubKey(e, t, i);
            }
            catch (e) {
                continue;
            }
            if (o.eq(r))
                return i;
        } throw new Error("Unable to find valid recovery factor"); };
        var V = a((function (e, t) { var r = t; r.version = "6.5.4", r.utils = l, r.rand = function () { throw new Error("unsupported"); }, r.curve = k, r.curves = x, r.ec = H, r.eddsa = null; })).ec, z = r(3286), G = r(3587);
        var q = new (r(711).Logger)("signing-key/5.5.0");
        var K = null;
        function W() { return K || (K = new V("secp256k1")), K; }
        var $ = (function () {
            function $(e) {
                (0, G.defineReadOnly)(this, "curve", "secp256k1"), (0, G.defineReadOnly)(this, "privateKey", (0, z.hexlify)(e));
                var t = W().keyFromPrivate((0, z.arrayify)(this.privateKey));
                (0, G.defineReadOnly)(this, "publicKey", "0x" + t.getPublic(!1, "hex")), (0, G.defineReadOnly)(this, "compressedPublicKey", "0x" + t.getPublic(!0, "hex")), (0, G.defineReadOnly)(this, "_isSigningKey", !0);
            }
            $.prototype._addPoint = function (e) { var t = W().keyFromPublic((0, z.arrayify)(this.publicKey)), r = W().keyFromPublic((0, z.arrayify)(e)); return "0x" + t.pub.add(r.pub).encodeCompressed("hex"); };
            $.prototype.signDigest = function (e) { var t = W().keyFromPrivate((0, z.arrayify)(this.privateKey)), r = (0, z.arrayify)(e); 32 !== r.length && q.throwArgumentError("bad digest length", "digest", e); var n = t.sign(r, { canonical: !0 }); return (0, z.splitSignature)({ recoveryParam: n.recoveryParam, r: (0, z.hexZeroPad)("0x" + n.r.toString(16), 32), s: (0, z.hexZeroPad)("0x" + n.s.toString(16), 32) }); };
            $.prototype.computeSharedSecret = function (e) { var t = W().keyFromPrivate((0, z.arrayify)(this.privateKey)), r = W().keyFromPublic((0, z.arrayify)(Z(e))); return (0, z.hexZeroPad)("0x" + t.derive(r.getPublic()).toString(16), 32); };
            $.isSigningKey = function (e) { return !(!e || !e._isSigningKey); };
            return $;
        }());
        function J(e, t) { var r = (0, z.splitSignature)(t), n = { r: (0, z.arrayify)(r.r), s: (0, z.arrayify)(r.s) }; return "0x" + W().recoverPubKey((0, z.arrayify)(e), n, r.recoveryParam).encode("hex", !1); }
        function Z(e, t) { var r = (0, z.arrayify)(e); if (32 === r.length) {
            var e_42 = new $(r);
            return t ? "0x" + W().keyFromPrivate(r).getPublic(!0, "hex") : e_42.publicKey;
        } return 33 === r.length ? t ? (0, z.hexlify)(r) : "0x" + W().keyFromPublic(r).getPublic(!1, "hex") : 65 === r.length ? t ? "0x" + W().keyFromPublic(r).getPublic(!0, "hex") : (0, z.hexlify)(r) : q.throwArgumentError("invalid public or private key", "key", "[REDACTED]"); }
    }, 3777: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { keccak256: function () { return g; }, pack: function () { return p; }, sha256: function () { return m; } });
        var n = r(2593), i = r(3286), o = r(8197), s = r(7158), a = r(4242), c = r(711);
        var u = new RegExp("^bytes([0-9]+)$"), f = new RegExp("^(u?int)([0-9]*)$"), l = new RegExp("^(.*)\\[([0-9]*)\\]$"), h = new c.Logger("solidity/5.5.0");
        function d(e, t, r) { switch (e) {
            case "address": return r ? (0, i.zeroPad)(t, 32) : (0, i.arrayify)(t);
            case "string": return (0, a.Y0)(t);
            case "bytes": return (0, i.arrayify)(t);
            case "bool": return t = t ? "0x01" : "0x00", r ? (0, i.zeroPad)(t, 32) : (0, i.arrayify)(t);
        } var o = e.match(f); if (o) {
            var s_7 = parseInt(o[2] || "256");
            return (o[2] && String(s_7) !== o[2] || s_7 % 8 != 0 || 0 === s_7 || s_7 > 256) && h.throwArgumentError("invalid number type", "type", e), r && (s_7 = 256), t = n.O$.from(t).toTwos(s_7), (0, i.zeroPad)(t, s_7 / 8);
        } if (o = e.match(u), o) {
            var n_21 = parseInt(o[1]);
            return (String(n_21) !== o[1] || 0 === n_21 || n_21 > 32) && h.throwArgumentError("invalid bytes type", "type", e), (0, i.arrayify)(t).byteLength !== n_21 && h.throwArgumentError("invalid value for " + e, "value", t), r ? (0, i.arrayify)((t + "0000000000000000000000000000000000000000000000000000000000000000").substring(0, 66)) : t;
        } if (o = e.match(l), o && Array.isArray(t)) {
            var r_43 = o[1];
            parseInt(o[2] || String(t.length)) != t.length && h.throwArgumentError("invalid array length for " + e, "value", t);
            var n_22 = [];
            return t.forEach((function (e) { n_22.push(d(r_43, e, !0)); })), (0, i.concat)(n_22);
        } return h.throwArgumentError("invalid type", "type", e); }
        function p(e, t) { e.length != t.length && h.throwArgumentError("wrong number of values; expected ${ types.length }", "values", t); var r = []; return e.forEach((function (e, n) { r.push(d(e, t[n])); })), (0, i.hexlify)((0, i.concat)(r)); }
        function g(e, t) { return (0, o.keccak256)(p(e, t)); }
        function m(e, t) { return (0, s.JQ)(p(e, t)); }
    }, 5637: function (e, t, r) {
        "use strict";
        r.d(t, { Ll: function () { return p; } });
        var n = r(4242);
        function i(e, t) { t || (t = function (e) { return [parseInt(e, 16)]; }); var r = 0, n = {}; return e.split(",").forEach((function (e) { var i = e.split(":"); r += parseInt(i[0], 16), n[r] = t(i[1]); })), n; }
        function o(e) { var t = 0; return e.split(",").map((function (e) { var r = e.split("-"); 1 === r.length ? r[1] = "0" : "" === r[1] && (r[1] = "1"); var n = t + parseInt(r[0], 16); return t = parseInt(r[1], 16), { l: n, h: t }; })); }
        function s(e, t) { var r = 0; for (var n_23 = 0; n_23 < t.length; n_23++) {
            var i_13 = t[n_23];
            if (r += i_13.l, e >= r && e <= r + i_13.h && (e - r) % (i_13.d || 1) == 0) {
                if (i_13.e && -1 !== i_13.e.indexOf(e - r))
                    continue;
                return i_13;
            }
        } return null; }
        var a = o("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"), c = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((function (e) { return parseInt(e, 16); })), u = [{ h: 25, s: 32, l: 65 }, { h: 30, s: 32, e: [23], l: 127 }, { h: 54, s: 1, e: [48], l: 64, d: 2 }, { h: 14, s: 1, l: 57, d: 2 }, { h: 44, s: 1, l: 17, d: 2 }, { h: 10, s: 1, e: [2, 6, 8], l: 61, d: 2 }, { h: 16, s: 1, l: 68, d: 2 }, { h: 84, s: 1, e: [18, 24, 66], l: 19, d: 2 }, { h: 26, s: 32, e: [17], l: 435 }, { h: 22, s: 1, l: 71, d: 2 }, { h: 15, s: 80, l: 40 }, { h: 31, s: 32, l: 16 }, { h: 32, s: 1, l: 80, d: 2 }, { h: 52, s: 1, l: 42, d: 2 }, { h: 12, s: 1, l: 55, d: 2 }, { h: 40, s: 1, e: [38], l: 15, d: 2 }, { h: 14, s: 1, l: 48, d: 2 }, { h: 37, s: 48, l: 49 }, { h: 148, s: 1, l: 6351, d: 2 }, { h: 88, s: 1, l: 160, d: 2 }, { h: 15, s: 16, l: 704 }, { h: 25, s: 26, l: 854 }, { h: 25, s: 32, l: 55915 }, { h: 37, s: 40, l: 1247 }, { h: 25, s: -119711, l: 53248 }, { h: 25, s: -119763, l: 52 }, { h: 25, s: -119815, l: 52 }, { h: 25, s: -119867, e: [1, 4, 5, 7, 8, 11, 12, 17], l: 52 }, { h: 25, s: -119919, l: 52 }, { h: 24, s: -119971, e: [2, 7, 8, 17], l: 52 }, { h: 24, s: -120023, e: [2, 7, 13, 15, 16, 17], l: 52 }, { h: 25, s: -120075, l: 52 }, { h: 25, s: -120127, l: 52 }, { h: 25, s: -120179, l: 52 }, { h: 25, s: -120231, l: 52 }, { h: 25, s: -120283, l: 52 }, { h: 25, s: -120335, l: 52 }, { h: 24, s: -119543, e: [17], l: 56 }, { h: 24, s: -119601, e: [17], l: 58 }, { h: 24, s: -119659, e: [17], l: 58 }, { h: 24, s: -119717, e: [17], l: 58 }, { h: 24, s: -119775, e: [17], l: 58 }], f = i("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"), l = i("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"), h = i("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", (function (e) { if (e.length % 4 != 0)
            throw new Error("bad data"); var t = []; for (var r_44 = 0; r_44 < e.length; r_44 += 4)
            t.push(parseInt(e.substring(r_44, r_44 + 4), 16)); return t; })), d = o("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
        function p(e) { if (e.match(/^[a-z0-9-]*$/i) && e.length <= 59)
            return e.toLowerCase(); var t = (0, n.XL)(e); var r; r = t.map((function (e) { if (c.indexOf(e) >= 0)
            return []; if (e >= 65024 && e <= 65039)
            return []; var t = function (e) { var t = s(e, u); if (t)
            return [e + t.s]; var r = f[e]; if (r)
            return r; var n = l[e]; return n ? [e + n[0]] : h[e] || null; }(e); return t || [e]; })), t = r.reduce((function (e, t) { return (t.forEach((function (t) { e.push(t); })), e); }), []), t = (0, n.XL)((0, n.uu)(t), n.Uj.NFKC), t.forEach((function (e) { if (s(e, d))
            throw new Error("STRINGPREP_CONTAINS_PROHIBITED"); })), t.forEach((function (e) { if (s(e, a))
            throw new Error("STRINGPREP_CONTAINS_UNASSIGNED"); })); var i = (0, n.uu)(t); if ("-" === i.substring(0, 1) || "--" === i.substring(2, 4) || "-" === i.substring(i.length - 1))
            throw new Error("invalid hyphen"); if (i.length > 63)
            throw new Error("too long"); return i; }
    }, 937: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { UnicodeNormalizationForm: function () { return o.Uj; }, Utf8ErrorFuncs: function () { return o.te; }, Utf8ErrorReason: function () { return o.Uw; }, _toEscapedUtf8String: function () { return o.U$; }, formatBytes32String: function () { return s; }, nameprep: function () { return c.Ll; }, parseBytes32String: function () { return a; }, toUtf8Bytes: function () { return o.Y0; }, toUtf8CodePoints: function () { return o.XL; }, toUtf8String: function () { return o.ZN; } });
        var n = r(7218), i = r(3286), o = r(4242);
        function s(e) { var t = (0, o.Y0)(e); if (t.length > 31)
            throw new Error("bytes32 string must be less than 32 bytes"); return (0, i.hexlify)((0, i.concat)([t, n.R]).slice(0, 32)); }
        function a(e) { var t = (0, i.arrayify)(e); if (32 !== t.length)
            throw new Error("invalid bytes32 - not 32 bytes long"); if (0 !== t[31])
            throw new Error("invalid bytes32 string - no null terminator"); var r = 31; for (; 0 === t[r - 1];)
            r--; return (0, o.ZN)(t.slice(0, r)); }
        var c = r(5637);
    }, 4242: function (e, t, r) {
        "use strict";
        r.d(t, { Uj: function () { return o; }, te: function () { return c; }, Uw: function () { return s; }, U$: function () { return h; }, uu: function () { return d; }, Y0: function () { return f; }, XL: function () { return g; }, ZN: function () { return p; } });
        var n = r(3286);
        var i = new (r(711).Logger)("strings/5.5.0");
        var o, s;
        function a(e, t, r, n, i) { if (e === s.BAD_PREFIX || e === s.UNEXPECTED_CONTINUE) {
            var e_43 = 0;
            for (var n_24 = t + 1; n_24 < r.length && r[n_24] >> 6 == 2; n_24++)
                e_43++;
            return e_43;
        } return e === s.OVERRUN ? r.length - t - 1 : 0; }
        !function (e) { e.current = "", e.NFC = "NFC", e.NFD = "NFD", e.NFKC = "NFKC", e.NFKD = "NFKD"; }(o || (o = {})), function (e) { e.UNEXPECTED_CONTINUE = "unexpected continuation byte", e.BAD_PREFIX = "bad codepoint prefix", e.OVERRUN = "string overrun", e.MISSING_CONTINUE = "missing continuation byte", e.OUT_OF_RANGE = "out of UTF-8 range", e.UTF16_SURROGATE = "UTF-16 surrogate", e.OVERLONG = "overlong representation"; }(s || (s = {}));
        var c = Object.freeze({ error: function (e, t, r, n, o) { return i.throwArgumentError("invalid codepoint at offset " + t + "; " + e, "bytes", r); }, ignore: a, replace: function (e, t, r, n, i) { return e === s.OVERLONG ? (n.push(i), 0) : (n.push(65533), a(e, t, r)); } });
        function u(e, t) { null == t && (t = c.error), e = (0, n.arrayify)(e); var r = []; var i = 0; for (; i < e.length;) {
            var n_25 = e[i++];
            if (n_25 >> 7 == 0) {
                r.push(n_25);
                continue;
            }
            var o_7 = null, a_9 = null;
            if (192 == (224 & n_25))
                o_7 = 1, a_9 = 127;
            else if (224 == (240 & n_25))
                o_7 = 2, a_9 = 2047;
            else {
                if (240 != (248 & n_25)) {
                    i += t(128 == (192 & n_25) ? s.UNEXPECTED_CONTINUE : s.BAD_PREFIX, i - 1, e, r);
                    continue;
                }
                o_7 = 3, a_9 = 65535;
            }
            if (i - 1 + o_7 >= e.length) {
                i += t(s.OVERRUN, i - 1, e, r);
                continue;
            }
            var c_4 = n_25 & (1 << 8 - o_7 - 1) - 1;
            for (var n_26 = 0; n_26 < o_7; n_26++) {
                var n_27 = e[i];
                if (128 != (192 & n_27)) {
                    i += t(s.MISSING_CONTINUE, i, e, r), c_4 = null;
                    break;
                }
                c_4 = c_4 << 6 | 63 & n_27, i++;
            }
            null !== c_4 && (c_4 > 1114111 ? i += t(s.OUT_OF_RANGE, i - 1 - o_7, e, r, c_4) : c_4 >= 55296 && c_4 <= 57343 ? i += t(s.UTF16_SURROGATE, i - 1 - o_7, e, r, c_4) : c_4 <= a_9 ? i += t(s.OVERLONG, i - 1 - o_7, e, r, c_4) : r.push(c_4));
        } return r; }
        function f(e, t) {
            if (t === void 0) { t = o.current; }
            t != o.current && (i.checkNormalize(), e = e.normalize(t));
            var r = [];
            for (var t_44 = 0; t_44 < e.length; t_44++) {
                var n_28 = e.charCodeAt(t_44);
                if (n_28 < 128)
                    r.push(n_28);
                else if (n_28 < 2048)
                    r.push(n_28 >> 6 | 192), r.push(63 & n_28 | 128);
                else if (55296 == (64512 & n_28)) {
                    t_44++;
                    var i_14 = e.charCodeAt(t_44);
                    if (t_44 >= e.length || 56320 != (64512 & i_14))
                        throw new Error("invalid utf-8 string");
                    var o_8 = 65536 + ((1023 & n_28) << 10) + (1023 & i_14);
                    r.push(o_8 >> 18 | 240), r.push(o_8 >> 12 & 63 | 128), r.push(o_8 >> 6 & 63 | 128), r.push(63 & o_8 | 128);
                }
                else
                    r.push(n_28 >> 12 | 224), r.push(n_28 >> 6 & 63 | 128), r.push(63 & n_28 | 128);
            }
            return (0, n.arrayify)(r);
        }
        function l(e) { var t = "0000" + e.toString(16); return "\\u" + t.substring(t.length - 4); }
        function h(e, t) { return '"' + u(e, t).map((function (e) { if (e < 256) {
            switch (e) {
                case 8: return "\\b";
                case 9: return "\\t";
                case 10: return "\\n";
                case 13: return "\\r";
                case 34: return '\\"';
                case 92: return "\\\\";
            }
            if (e >= 32 && e < 127)
                return String.fromCharCode(e);
        } return e <= 65535 ? l(e) : l(55296 + ((e -= 65536) >> 10 & 1023)) + l(56320 + (1023 & e)); })).join("") + '"'; }
        function d(e) { return e.map((function (e) { return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode(55296 + (e >> 10 & 1023), 56320 + (1023 & e))); })).join(""); }
        function p(e, t) { return d(u(e, t)); }
        function g(e, t) {
            if (t === void 0) { t = o.current; }
            return u(f(e, t));
        }
    }, 4377: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { TransactionTypes: function () { return d; }, accessListify: function () { return S; }, computeAddress: function () { return b; }, parse: function () { return P; }, recoverAddress: function () { return v; }, serialize: function () { return N; } });
        var n = r(4594), i = r(2593), o = r(3286), s = r(1046), a = r(8197), c = r(3587), u = r(1843), f = r(2768), l = r(711);
        var h = new l.Logger("transactions/5.5.0");
        var d;
        function p(e) { return "0x" === e ? null : (0, n.getAddress)(e); }
        function g(e) { return "0x" === e ? s._Y : i.O$.from(e); }
        !function (e) { e[e.legacy = 0] = "legacy", e[e.eip2930 = 1] = "eip2930", e[e.eip1559 = 2] = "eip1559"; }(d || (d = {}));
        var m = [{ name: "nonce", maxLength: 32, numeric: !0 }, { name: "gasPrice", maxLength: 32, numeric: !0 }, { name: "gasLimit", maxLength: 32, numeric: !0 }, { name: "to", length: 20 }, { name: "value", maxLength: 32, numeric: !0 }, { name: "data" }], y = { chainId: !0, data: !0, gasLimit: !0, gasPrice: !0, nonce: !0, to: !0, type: !0, value: !0 };
        function b(e) { var t = (0, f.computePublicKey)(e); return (0, n.getAddress)((0, o.hexDataSlice)((0, a.keccak256)((0, o.hexDataSlice)(t, 1)), 12)); }
        function v(e, t) { return b((0, f.recoverPublicKey)((0, o.arrayify)(e), t)); }
        function w(e, t) { var r = (0, o.stripZeros)(i.O$.from(e).toHexString()); return r.length > 32 && h.throwArgumentError("invalid length for " + t, "transaction:" + t, e), r; }
        function A(e, t) { return { address: (0, n.getAddress)(e), storageKeys: (t || []).map((function (t, r) { return (32 !== (0, o.hexDataLength)(t) && h.throwArgumentError("invalid access list storageKey", "accessList[" + e + ":" + r + "]", t), t.toLowerCase()); })) }; }
        function S(e) { if (Array.isArray(e))
            return e.map((function (e, t) { return Array.isArray(e) ? (e.length > 2 && h.throwArgumentError("access list expected to be [ address, storageKeys[] ]", "value[" + t + "]", e), A(e[0], e[1])) : A(e.address, e.storageKeys); })); var t = Object.keys(e).map((function (t) { var r = e[t].reduce((function (e, t) { return (e[t] = !0, e); }), {}); return A(t, Object.keys(r).sort()); })); return t.sort((function (e, t) { return e.address.localeCompare(t.address); })), t; }
        function E(e) { return S(e).map((function (e) { return [e.address, e.storageKeys]; })); }
        function k(e, t) { if (null != e.gasPrice) {
            var t_45 = i.O$.from(e.gasPrice), r_45 = i.O$.from(e.maxFeePerGas || 0);
            t_45.eq(r_45) || h.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", { gasPrice: t_45, maxFeePerGas: r_45 });
        } var r = [w(e.chainId || 0, "chainId"), w(e.nonce || 0, "nonce"), w(e.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"), w(e.maxFeePerGas || 0, "maxFeePerGas"), w(e.gasLimit || 0, "gasLimit"), null != e.to ? (0, n.getAddress)(e.to) : "0x", w(e.value || 0, "value"), e.data || "0x", E(e.accessList || [])]; if (t) {
            var e_44 = (0, o.splitSignature)(t);
            r.push(w(e_44.recoveryParam, "recoveryParam")), r.push((0, o.stripZeros)(e_44.r)), r.push((0, o.stripZeros)(e_44.s));
        } return (0, o.hexConcat)(["0x02", u.encode(r)]); }
        function x(e, t) { var r = [w(e.chainId || 0, "chainId"), w(e.nonce || 0, "nonce"), w(e.gasPrice || 0, "gasPrice"), w(e.gasLimit || 0, "gasLimit"), null != e.to ? (0, n.getAddress)(e.to) : "0x", w(e.value || 0, "value"), e.data || "0x", E(e.accessList || [])]; if (t) {
            var e_45 = (0, o.splitSignature)(t);
            r.push(w(e_45.recoveryParam, "recoveryParam")), r.push((0, o.stripZeros)(e_45.r)), r.push((0, o.stripZeros)(e_45.s));
        } return (0, o.hexConcat)(["0x01", u.encode(r)]); }
        function N(e, t) { if (null == e.type || 0 === e.type)
            return null != e.accessList && h.throwArgumentError("untyped transactions do not support accessList; include type: 1", "transaction", e), function (e, t) { (0, c.checkProperties)(e, y); var r = []; m.forEach((function (t) { var n = e[t.name] || []; var i = {}; t.numeric && (i.hexPad = "left"), n = (0, o.arrayify)((0, o.hexlify)(n, i)), t.length && n.length !== t.length && n.length > 0 && h.throwArgumentError("invalid length for " + t.name, "transaction:" + t.name, n), t.maxLength && (n = (0, o.stripZeros)(n), n.length > t.maxLength && h.throwArgumentError("invalid length for " + t.name, "transaction:" + t.name, n)), r.push((0, o.hexlify)(n)); })); var n = 0; if (null != e.chainId ? (n = e.chainId, "number" != typeof n && h.throwArgumentError("invalid transaction.chainId", "transaction", e)) : t && !(0, o.isBytesLike)(t) && t.v > 28 && (n = Math.floor((t.v - 35) / 2)), 0 !== n && (r.push((0, o.hexlify)(n)), r.push("0x"), r.push("0x")), !t)
                return u.encode(r); var i = (0, o.splitSignature)(t); var s = 27 + i.recoveryParam; return 0 !== n ? (r.pop(), r.pop(), r.pop(), s += 2 * n + 8, i.v > 28 && i.v !== s && h.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", t)) : i.v !== s && h.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", t), r.push((0, o.hexlify)(s)), r.push((0, o.stripZeros)((0, o.arrayify)(i.r))), r.push((0, o.stripZeros)((0, o.arrayify)(i.s))), u.encode(r); }(e, t); switch (e.type) {
            case 1: return x(e, t);
            case 2: return k(e, t);
        } return h.throwError("unsupported transaction type: " + e.type, l.Logger.errors.UNSUPPORTED_OPERATION, { operation: "serializeTransaction", transactionType: e.type }); }
        function B(e, t, r) { try {
            var r_46 = g(t[0]).toNumber();
            if (0 !== r_46 && 1 !== r_46)
                throw new Error("bad recid");
            e.v = r_46;
        }
        catch (e) {
            h.throwArgumentError("invalid v for transaction type: 1", "v", t[0]);
        } e.r = (0, o.hexZeroPad)(t[1], 32), e.s = (0, o.hexZeroPad)(t[2], 32); try {
            var t_46 = (0, a.keccak256)(r(e));
            e.from = v(t_46, { r: e.r, s: e.s, recoveryParam: e.v });
        }
        catch (e) {
            console.log(e);
        } }
        function P(e) { var t = (0, o.arrayify)(e); if (t[0] > 127)
            return function (e) { var t = u.decode(e); 9 !== t.length && 6 !== t.length && h.throwArgumentError("invalid raw transaction", "rawTransaction", e); var r = { nonce: g(t[0]).toNumber(), gasPrice: g(t[1]), gasLimit: g(t[2]), to: p(t[3]), value: g(t[4]), data: t[5], chainId: 0 }; if (6 === t.length)
                return r; try {
                r.v = i.O$.from(t[6]).toNumber();
            }
            catch (e) {
                return console.log(e), r;
            } if (r.r = (0, o.hexZeroPad)(t[7], 32), r.s = (0, o.hexZeroPad)(t[8], 32), i.O$.from(r.r).isZero() && i.O$.from(r.s).isZero())
                r.chainId = r.v, r.v = 0;
            else {
                r.chainId = Math.floor((r.v - 35) / 2), r.chainId < 0 && (r.chainId = 0);
                var n_29 = r.v - 27;
                var i_15 = t.slice(0, 6);
                0 !== r.chainId && (i_15.push((0, o.hexlify)(r.chainId)), i_15.push("0x"), i_15.push("0x"), n_29 -= 2 * r.chainId + 8);
                var s_8 = (0, a.keccak256)(u.encode(i_15));
                try {
                    r.from = v(s_8, { r: (0, o.hexlify)(r.r), s: (0, o.hexlify)(r.s), recoveryParam: n_29 });
                }
                catch (e) {
                    console.log(e);
                }
                r.hash = (0, a.keccak256)(e);
            } return r.type = null, r; }(t); switch (t[0]) {
            case 1: return function (e) { var t = u.decode(e.slice(1)); 8 !== t.length && 11 !== t.length && h.throwArgumentError("invalid component count for transaction type: 1", "payload", (0, o.hexlify)(e)); var r = { type: 1, chainId: g(t[0]).toNumber(), nonce: g(t[1]).toNumber(), gasPrice: g(t[2]), gasLimit: g(t[3]), to: p(t[4]), value: g(t[5]), data: t[6], accessList: S(t[7]) }; return 8 === t.length || (r.hash = (0, a.keccak256)(e), B(r, t.slice(8), x)), r; }(t);
            case 2: return function (e) { var t = u.decode(e.slice(1)); 9 !== t.length && 12 !== t.length && h.throwArgumentError("invalid component count for transaction type: 2", "payload", (0, o.hexlify)(e)); var r = g(t[2]), n = g(t[3]), i = { type: 2, chainId: g(t[0]).toNumber(), nonce: g(t[1]).toNumber(), maxPriorityFeePerGas: r, maxFeePerGas: n, gasPrice: null, gasLimit: g(t[4]), to: p(t[5]), value: g(t[6]), data: t[7], accessList: S(t[8]) }; return 9 === t.length || (i.hash = (0, a.keccak256)(e), B(i, t.slice(9), k)), i; }(t);
        } return h.throwError("unsupported transaction type: " + t[0], l.Logger.errors.UNSUPPORTED_OPERATION, { operation: "parseTransaction", transactionType: t[0] }); }
    }, 7616: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { commify: function () { return S; }, formatEther: function () { return x; }, formatUnits: function () { return E; }, parseEther: function () { return N; }, parseUnits: function () { return k; } });
        var n = r(3286), i = r(711), o = r(8794), s = r(2593);
        var a = new i.Logger(o.i), c = {}, u = s.O$.from(0), f = s.O$.from(-1);
        function l(e, t, r, n) { var o = { fault: t, operation: r }; return void 0 !== n && (o.value = n), a.throwError(e, i.Logger.errors.NUMERIC_FAULT, o); }
        var h = "0";
        for (; h.length < 256;)
            h += h;
        function d(e) { if ("number" != typeof e)
            try {
                e = s.O$.from(e).toNumber();
            }
            catch (e) { } return "number" == typeof e && e >= 0 && e <= 256 && !(e % 1) ? "1" + h.substring(0, e) : a.throwArgumentError("invalid decimal size", "decimals", e); }
        function p(e, t) { null == t && (t = 0); var r = d(t), n = (e = s.O$.from(e)).lt(u); n && (e = e.mul(f)); var i = e.mod(r).toString(); for (; i.length < r.length - 1;)
            i = "0" + i; i = i.match(/^([0-9]*[1-9]|0)(0*)/)[1]; var o = e.div(r).toString(); return e = 1 === r.length ? o : o + "." + i, n && (e = "-" + e), e; }
        function g(e, t) { null == t && (t = 0); var r = d(t); "string" == typeof e && e.match(/^-?[0-9.]+$/) || a.throwArgumentError("invalid decimal value", "value", e); var n = "-" === e.substring(0, 1); n && (e = e.substring(1)), "." === e && a.throwArgumentError("missing value", "value", e); var i = e.split("."); i.length > 2 && a.throwArgumentError("too many decimal points", "value", e); var o = i[0], c = i[1]; for (o || (o = "0"), c || (c = "0"); "0" === c[c.length - 1];)
            c = c.substring(0, c.length - 1); for (c.length > r.length - 1 && l("fractional component exceeds decimals", "underflow", "parseFixed"), "" === c && (c = "0"); c.length < r.length - 1;)
            c += "0"; var u = s.O$.from(o), h = s.O$.from(c); var p = u.mul(r).add(h); return n && (p = p.mul(f)), p; }
        var m = (function () {
            function m(e, t, r, n) {
                e !== c && a.throwError("cannot use FixedFormat constructor; use FixedFormat.from", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.signed = t, this.width = r, this.decimals = n, this.name = (t ? "" : "u") + "fixed" + String(r) + "x" + String(n), this._multiplier = d(n), Object.freeze(this);
            }
            m.from = function (e) { if (e instanceof m)
                return e; "number" == typeof e && (e = "fixed128x" + e); var t = !0, r = 128, n = 18; if ("string" == typeof e)
                if ("fixed" === e)
                    ;
                else if ("ufixed" === e)
                    t = !1;
                else {
                    var i_16 = e.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
                    i_16 || a.throwArgumentError("invalid fixed format", "format", e), t = "u" !== i_16[1], r = parseInt(i_16[2]), n = parseInt(i_16[3]);
                }
            else if (e) {
                var i_17 = function (t, r, n) { return null == e[t] ? n : (typeof e[t] !== r && a.throwArgumentError("invalid fixed format (" + t + " not " + r + ")", "format." + t, e[t]), e[t]); };
                t = i_17("signed", "boolean", t), r = i_17("width", "number", r), n = i_17("decimals", "number", n);
            } return r % 8 && a.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", r), n > 80 && a.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", n), new m(c, t, r, n); };
            return m;
        }());
        var y = (function () {
            function y(e, t, r, n) {
                var _newTarget = this.constructor;
                a.checkNew(_newTarget, y), e !== c && a.throwError("cannot use FixedNumber constructor; use FixedNumber.from", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.format = n, this._hex = t, this._value = r, this._isFixedNumber = !0, Object.freeze(this);
            }
            y.prototype._checkFormat = function (e) { this.format.name !== e.format.name && a.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", e); };
            y.prototype.addUnsafe = function (e) { this._checkFormat(e); var t = g(this._value, this.format.decimals), r = g(e._value, e.format.decimals); return y.fromValue(t.add(r), this.format.decimals, this.format); };
            y.prototype.subUnsafe = function (e) { this._checkFormat(e); var t = g(this._value, this.format.decimals), r = g(e._value, e.format.decimals); return y.fromValue(t.sub(r), this.format.decimals, this.format); };
            y.prototype.mulUnsafe = function (e) { this._checkFormat(e); var t = g(this._value, this.format.decimals), r = g(e._value, e.format.decimals); return y.fromValue(t.mul(r).div(this.format._multiplier), this.format.decimals, this.format); };
            y.prototype.divUnsafe = function (e) { this._checkFormat(e); var t = g(this._value, this.format.decimals), r = g(e._value, e.format.decimals); return y.fromValue(t.mul(this.format._multiplier).div(r), this.format.decimals, this.format); };
            y.prototype.floor = function () { var e = this.toString().split("."); 1 === e.length && e.push("0"); var t = y.from(e[0], this.format); var r = !e[1].match(/^(0*)$/); return this.isNegative() && r && (t = t.subUnsafe(b.toFormat(t.format))), t; };
            y.prototype.ceiling = function () { var e = this.toString().split("."); 1 === e.length && e.push("0"); var t = y.from(e[0], this.format); var r = !e[1].match(/^(0*)$/); return !this.isNegative() && r && (t = t.addUnsafe(b.toFormat(t.format))), t; };
            y.prototype.round = function (e) { null == e && (e = 0); var t = this.toString().split("."); if (1 === t.length && t.push("0"), (e < 0 || e > 80 || e % 1) && a.throwArgumentError("invalid decimal count", "decimals", e), t[1].length <= e)
                return this; var r = y.from("1" + h.substring(0, e), this.format), n = v.toFormat(this.format); return this.mulUnsafe(r).addUnsafe(n).floor().divUnsafe(r); };
            y.prototype.isZero = function () { return "0.0" === this._value || "0" === this._value; };
            y.prototype.isNegative = function () { return "-" === this._value[0]; };
            y.prototype.toString = function () { return this._value; };
            y.prototype.toHexString = function (e) { if (null == e)
                return this._hex; e % 8 && a.throwArgumentError("invalid byte width", "width", e); var t = s.O$.from(this._hex).fromTwos(this.format.width).toTwos(e).toHexString(); return (0, n.hexZeroPad)(t, e / 8); };
            y.prototype.toUnsafeFloat = function () { return parseFloat(this.toString()); };
            y.prototype.toFormat = function (e) { return y.fromString(this._value, e); };
            y.fromValue = function (e, t, r) { return null != r || null == t || (0, s.Zm)(t) || (r = t, t = null), null == t && (t = 0), null == r && (r = "fixed"), y.fromString(p(e, t), m.from(r)); };
            y.fromString = function (e, t) { null == t && (t = "fixed"); var r = m.from(t), i = g(e, r.decimals); !r.signed && i.lt(u) && l("unsigned value cannot be negative", "overflow", "value", e); var o = null; r.signed ? o = i.toTwos(r.width).toHexString() : (o = i.toHexString(), o = (0, n.hexZeroPad)(o, r.width / 8)); var s = p(i, r.decimals); return new y(c, o, s, r); };
            y.fromBytes = function (e, t) { null == t && (t = "fixed"); var r = m.from(t); if ((0, n.arrayify)(e).length > r.width / 8)
                throw new Error("overflow"); var i = s.O$.from(e); r.signed && (i = i.fromTwos(r.width)); var o = i.toTwos((r.signed ? 0 : 1) + r.width).toHexString(), a = p(i, r.decimals); return new y(c, o, a, r); };
            y.from = function (e, t) { if ("string" == typeof e)
                return y.fromString(e, t); if ((0, n.isBytes)(e))
                return y.fromBytes(e, t); try {
                return y.fromValue(e, 0, t);
            }
            catch (e) {
                if (e.code !== i.Logger.errors.INVALID_ARGUMENT)
                    throw e;
            } return a.throwArgumentError("invalid FixedNumber value", "value", e); };
            y.isFixedNumber = function (e) { return !(!e || !e._isFixedNumber); };
            return y;
        }());
        var b = y.from(1), v = y.from("0.5"), w = new i.Logger("units/5.5.0"), A = ["wei", "kwei", "mwei", "gwei", "szabo", "finney", "ether"];
        function S(e) { var t = String(e).split("."); (t.length > 2 || !t[0].match(/^-?[0-9]*$/) || t[1] && !t[1].match(/^[0-9]*$/) || "." === e || "-." === e) && w.throwArgumentError("invalid value", "value", e); var r = t[0], n = ""; for ("-" === r.substring(0, 1) && (n = "-", r = r.substring(1)); "0" === r.substring(0, 1);)
            r = r.substring(1); "" === r && (r = "0"); var i = ""; for (2 === t.length && (i = "." + (t[1] || "0")); i.length > 2 && "0" === i[i.length - 1];)
            i = i.substring(0, i.length - 1); var o = []; for (; r.length;) {
            if (r.length <= 3) {
                o.unshift(r);
                break;
            }
            {
                var e_46 = r.length - 3;
                o.unshift(r.substring(e_46)), r = r.substring(0, e_46);
            }
        } return n + o.join(",") + i; }
        function E(e, t) { if ("string" == typeof t) {
            var e_47 = A.indexOf(t);
            -1 !== e_47 && (t = 3 * e_47);
        } return p(e, null != t ? t : 18); }
        function k(e, t) { if ("string" != typeof e && w.throwArgumentError("value must be a string", "value", e), "string" == typeof t) {
            var e_48 = A.indexOf(t);
            -1 !== e_48 && (t = 3 * e_48);
        } return g(e, null != t ? t : 18); }
        function x(e) { return E(e, 18); }
        function N(e) { return k(e, 18); }
    }, 4958: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { Wallet: function () { return w; }, verifyMessage: function () { return A; }, verifyTypedData: function () { return S; } });
        var n = r(4594), i = r(4353), o = r(8171), s = r(3286), a = r(3684), c = r(7827), u = r(4692), f = r(8197), l = r(3587), h = r(4478), d = r(2768), p = r(6883), g = r(1964), m = r(4377), y = r(711), b = function (e, t, r, n) { return new (r || (r = Promise))((function (i, o) { function s(e) { try {
            c(n.next(e));
        }
        catch (e) {
            o(e);
        } } function a(e) { try {
            c(n.throw(e));
        }
        catch (e) {
            o(e);
        } } function c(e) { var t; e.done ? i(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(s, a); } c((n = n.apply(e, t || [])).next()); })); };
        var v = new y.Logger("wallet/5.5.0");
        var w = (function (_super) {
            __extends(w, _super);
            function w(e, t) {
                var _newTarget = this.constructor;
                var _this = this;
                if (v.checkNew(_newTarget, w), _this = _super.call(this) || this, null != (r = e) && (0, s.isHexString)(r.privateKey, 32) && null != r.address) {
                    var t_47 = new d.SigningKey(e.privateKey);
                    if ((0, l.defineReadOnly)(_this, "_signingKey", (function () { return t_47; })), (0, l.defineReadOnly)(_this, "address", (0, m.computeAddress)(_this.publicKey)), _this.address !== (0, n.getAddress)(e.address) && v.throwArgumentError("privateKey/address mismatch", "privateKey", "[REDACTED]"), function (e) { var t = e.mnemonic; return t && t.phrase; }(e)) {
                        var t_48 = e.mnemonic;
                        (0, l.defineReadOnly)(_this, "_mnemonic", (function () { return ({ phrase: t_48.phrase, path: t_48.path || u.defaultPath, locale: t_48.locale || "en" }); }));
                        var r_47 = _this.mnemonic, n_30 = u.HDNode.fromMnemonic(r_47.phrase, null, r_47.locale).derivePath(r_47.path);
                        (0, m.computeAddress)(n_30.privateKey) !== _this.address && v.throwArgumentError("mnemonic/address mismatch", "privateKey", "[REDACTED]");
                    }
                    else
                        (0, l.defineReadOnly)(_this, "_mnemonic", (function () { return null; }));
                }
                else {
                    if (d.SigningKey.isSigningKey(e))
                        "secp256k1" !== e.curve && v.throwArgumentError("unsupported curve; must be secp256k1", "privateKey", "[REDACTED]"), (0, l.defineReadOnly)(_this, "_signingKey", (function () { return e; }));
                    else {
                        "string" == typeof e && e.match(/^[0-9a-f]*$/i) && 64 === e.length && (e = "0x" + e);
                        var t_49 = new d.SigningKey(e);
                        (0, l.defineReadOnly)(_this, "_signingKey", (function () { return t_49; }));
                    }
                    (0, l.defineReadOnly)(_this, "_mnemonic", (function () { return null; })), (0, l.defineReadOnly)(_this, "address", (0, m.computeAddress)(_this.publicKey));
                }
                var r;
                t && !i.zt.isProvider(t) && v.throwArgumentError("invalid provider", "provider", t), (0, l.defineReadOnly)(_this, "provider", t || null);
                return _this;
            }
            Object.defineProperty(w.prototype, "mnemonic", {
                get: function () { return this._mnemonic(); },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(w.prototype, "privateKey", {
                get: function () { return this._signingKey().privateKey; },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(w.prototype, "publicKey", {
                get: function () { return this._signingKey().publicKey; },
                enumerable: false,
                configurable: true
            });
            w.prototype.getAddress = function () { return Promise.resolve(this.address); };
            w.prototype.connect = function (e) { return new w(this, e); };
            w.prototype.signTransaction = function (e) {
                var _this = this;
                return (0, l.resolveProperties)(e).then((function (t) { null != t.from && ((0, n.getAddress)(t.from) !== _this.address && v.throwArgumentError("transaction from address mismatch", "transaction.from", e.from), delete t.from); var r = _this._signingKey().signDigest((0, f.keccak256)((0, m.serialize)(t))); return (0, m.serialize)(t, r); }));
            };
            w.prototype.signMessage = function (e) { return b(this, void 0, void 0, (function () { return __generator(this, function (_a) {
                return [2, (0, s.joinSignature)(this._signingKey().signDigest((0, a.r)(e)))];
            }); })); };
            w.prototype._signTypedData = function (e, t, r) { return b(this, void 0, void 0, (function () {
                var n;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, c.E.resolveNames(e, t, r, (function (e) { return (null == _this.provider && v.throwError("cannot resolve ENS names without a provider", y.Logger.errors.UNSUPPORTED_OPERATION, { operation: "resolveName", value: e }), _this.provider.resolveName(e)); }))];
                        case 1:
                            n = _a.sent();
                            return [2, (0, s.joinSignature)(this._signingKey().signDigest(c.E.hash(n.domain, t, n.value)))];
                    }
                });
            })); };
            w.prototype.encrypt = function (e, t, r) { if ("function" != typeof t || r || (r = t, t = {}), r && "function" != typeof r)
                throw new Error("invalid callback"); return t || (t = {}), (0, g.HI)(this, e, t, r); };
            w.createRandom = function (e) { var t = (0, h.O)(16); e || (e = {}), e.extraEntropy && (t = (0, s.arrayify)((0, s.hexDataSlice)((0, f.keccak256)((0, s.concat)([t, e.extraEntropy])), 0, 16))); var r = (0, u.entropyToMnemonic)(t, e.locale); return w.fromMnemonic(r, e.path, e.locale); };
            w.fromEncryptedJson = function (e, t, r) { return (0, p.decryptJsonWallet)(e, t, r).then((function (e) { return new w(e); })); };
            w.fromEncryptedJsonSync = function (e, t) { return new w((0, p.decryptJsonWalletSync)(e, t)); };
            w.fromMnemonic = function (e, t, r) { return t || (t = u.defaultPath), new w(u.HDNode.fromMnemonic(e, null, r).derivePath(t)); };
            return w;
        }(o.E));
        function A(e, t) { return (0, m.recoverAddress)((0, a.r)(e), t); }
        function S(e, t, r, n) { return (0, m.recoverAddress)(c.E.hash(e, t, r), n); }
    }, 8341: function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, { _fetchData: function () { return h; }, fetchJson: function () { return d; }, poll: function () { return p; } });
        var n = r(9567), i = r(3286), o = r(3587), s = r(4242), a = r(711);
        function c(e, t) { return r = this, n = void 0, s = function () { var r, n, o, s; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    null == t && (t = {});
                    r = { method: t.method || "GET", headers: t.headers || {}, body: t.body || void 0 };
                    !0 !== t.skipFetchSetup && (r.mode = "cors", r.cache = "no-cache", r.credentials = "same-origin", r.redirect = "follow", r.referrer = "client");
                    return [4, fetch(e, r)];
                case 1:
                    n = _a.sent();
                    return [4, n.arrayBuffer()];
                case 2:
                    o = _a.sent(), s = {};
                    return [2, (n.headers.forEach ? n.headers.forEach((function (e, t) { s[t.toLowerCase()] = e; })) : n.headers.keys().forEach((function (e) { s[e.toLowerCase()] = n.headers.get(e); })), { headers: s, statusCode: n.status, statusMessage: n.statusText, body: (0, i.arrayify)(new Uint8Array(o)) })];
            }
        }); }, new ((o = void 0) || (o = Promise))((function (e, t) { function i(e) { try {
            c(s.next(e));
        }
        catch (e) {
            t(e);
        } } function a(e) { try {
            c(s.throw(e));
        }
        catch (e) {
            t(e);
        } } function c(t) { var r; t.done ? e(t.value) : (r = t.value, r instanceof o ? r : new o((function (e) { e(r); }))).then(i, a); } c((s = s.apply(r, n || [])).next()); })); var r, n, o, s; }
        var u = new a.Logger("web/5.5.1");
        function f(e) { return new Promise((function (t) { setTimeout(t, e); })); }
        function l(e, t) { if (null == e)
            return null; if ("string" == typeof e)
            return e; if ((0, i.isBytesLike)(e)) {
            if (t && ("text" === t.split("/")[0] || "application/json" === t.split(";")[0].trim()))
                try {
                    return (0, s.ZN)(e);
                }
                catch (e) { }
            return (0, i.hexlify)(e);
        } return e; }
        function h(e, t, r) { var i = "object" == typeof e && null != e.throttleLimit ? e.throttleLimit : 12; u.assertArgument(i > 0 && i % 1 == 0, "invalid connection throttle limit", "connection.throttleLimit", i); var o = "object" == typeof e ? e.throttleCallback : null, h = "object" == typeof e && "number" == typeof e.throttleSlotInterval ? e.throttleSlotInterval : 100; u.assertArgument(h > 0 && h % 1 == 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", h); var d = {}; var p = null; var g = { method: "GET" }; var m = !1, y = 12e4; if ("string" == typeof e)
            p = e;
        else if ("object" == typeof e) {
            if (null != e && null != e.url || u.throwArgumentError("missing URL", "connection.url", e), p = e.url, "number" == typeof e.timeout && e.timeout > 0 && (y = e.timeout), e.headers)
                for (var t_50 in e.headers)
                    d[t_50.toLowerCase()] = { key: t_50, value: String(e.headers[t_50]) }, ["if-none-match", "if-modified-since"].indexOf(t_50.toLowerCase()) >= 0 && (m = !0);
            if (g.allowGzip = !!e.allowGzip, null != e.user && null != e.password) {
                "https:" !== p.substring(0, 6) && !0 !== e.allowInsecureAuthentication && u.throwError("basic authentication requires a secure https url", a.Logger.errors.INVALID_ARGUMENT, { argument: "url", url: p, user: e.user, password: "[REDACTED]" });
                var t_51 = e.user + ":" + e.password;
                d.authorization = { key: "Authorization", value: "Basic " + (0, n.c)((0, s.Y0)(t_51)) };
            }
        } var b = new RegExp("^data:([a-z0-9-]+/[a-z0-9-]+);base64,(.*)$", "i"), v = p ? p.match(b) : null; if (v)
            try {
                var e_49 = { statusCode: 200, statusMessage: "OK", headers: { "content-type": v[1] }, body: (0, n.J)(v[2]) };
                var t_52 = e_49.body;
                return r && (t_52 = r(e_49.body, e_49)), Promise.resolve(t_52);
            }
            catch (e) {
                u.throwError("processing response error", a.Logger.errors.SERVER_ERROR, { body: l(v[1], v[2]), error: e, requestBody: null, requestMethod: "GET", url: p });
            } t && (g.method = "POST", g.body = t, null == d["content-type"] && (d["content-type"] = { key: "Content-Type", value: "application/octet-stream" }), null == d["content-length"] && (d["content-length"] = { key: "Content-Length", value: String(t.length) })); var w = {}; Object.keys(d).forEach((function (e) { var t = d[e]; w[t.key] = t.value; })), g.headers = w; var A = function () { var e = null; return { promise: new Promise((function (t, r) { y && (e = setTimeout((function () { null != e && (e = null, r(u.makeError("timeout", a.Logger.errors.TIMEOUT, { requestBody: l(g.body, w["content-type"]), requestMethod: g.method, timeout: y, url: p }))); }), y)); })), cancel: function () { null != e && (clearTimeout(e), e = null); } }; }(), S = function () { return e = this, t = void 0, s = function () { var e_51, t_53, e_52, r_49, _a, r_50, n_31, e_50, n_32, e_53, r_48, t_54, _b, t_55; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e_51 = 0;
                    _c.label = 1;
                case 1:
                    if (!(e_51 < i)) return [3, 20];
                    t_53 = null;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 9, , 10]);
                    return [4, c(p, g)];
                case 3:
                    if (!(t_53 = _c.sent(), e_51 < i)) return [3, 8];
                    if (!(301 === t_53.statusCode || 302 === t_53.statusCode)) return [3, 4];
                    e_52 = t_53.headers.location || "";
                    if ("GET" === g.method && e_52.match(/^https:/)) {
                        p = t_53.headers.location;
                        return [3, 19];
                    }
                    return [3, 8];
                case 4:
                    if (!(429 === t_53.statusCode)) return [3, 8];
                    r_49 = !0;
                    _a = o;
                    if (!_a) return [3, 6];
                    return [4, o(e_51, p)];
                case 5:
                    _a = (r_49 = _c.sent());
                    _c.label = 6;
                case 6:
                    if (!(_a, r_49)) return [3, 8];
                    r_50 = 0;
                    n_31 = t_53.headers["retry-after"];
                    r_50 = "string" == typeof n_31 && n_31.match(/^[1-9][0-9]*$/) ? 1e3 * parseInt(n_31) : h * parseInt(String(Math.random() * Math.pow(2, e_51)));
                    return [4, f(r_50)];
                case 7:
                    _c.sent();
                    return [3, 19];
                case 8: return [3, 10];
                case 9:
                    e_50 = _c.sent();
                    t_53 = e_50.response, null == t_53 && (A.cancel(), u.throwError("missing response", a.Logger.errors.SERVER_ERROR, { requestBody: l(g.body, w["content-type"]), requestMethod: g.method, serverError: e_50, url: p }));
                    return [3, 10];
                case 10:
                    n_32 = t_53.body;
                    if (!(m && 304 === t_53.statusCode ? n_32 = null : (t_53.statusCode < 200 || t_53.statusCode >= 300) && (A.cancel(), u.throwError("bad response", a.Logger.errors.SERVER_ERROR, { status: t_53.statusCode, headers: t_53.headers, body: l(n_32, t_53.headers ? t_53.headers["content-type"] : null), requestBody: l(g.body, w["content-type"]), requestMethod: g.method, url: p })), r)) return [3, 18];
                    _c.label = 11;
                case 11:
                    _c.trys.push([11, 13, , 18]);
                    return [4, r(n_32, t_53)];
                case 12:
                    e_53 = _c.sent();
                    return [2, (A.cancel(), e_53)];
                case 13:
                    r_48 = _c.sent();
                    if (!(r_48.throttleRetry && e_51 < i)) return [3, 17];
                    t_54 = !0;
                    _b = o;
                    if (!_b) return [3, 15];
                    return [4, o(e_51, p)];
                case 14:
                    _b = (t_54 = _c.sent());
                    _c.label = 15;
                case 15:
                    if (!(_b, t_54)) return [3, 17];
                    t_55 = h * parseInt(String(Math.random() * Math.pow(2, e_51)));
                    return [4, f(t_55)];
                case 16:
                    _c.sent();
                    return [3, 19];
                case 17:
                    A.cancel(), u.throwError("processing response error", a.Logger.errors.SERVER_ERROR, { body: l(n_32, t_53.headers ? t_53.headers["content-type"] : null), error: r_48, requestBody: l(g.body, w["content-type"]), requestMethod: g.method, url: p });
                    return [3, 18];
                case 18: return [2, (A.cancel(), n_32)];
                case 19:
                    e_51++;
                    return [3, 1];
                case 20: return [2, u.throwError("failed response", a.Logger.errors.SERVER_ERROR, { requestBody: l(g.body, w["content-type"]), requestMethod: g.method, url: p })];
            }
        }); }, new ((n = void 0) || (n = Promise))((function (r, i) { function o(e) { try {
            c(s.next(e));
        }
        catch (e) {
            i(e);
        } } function a(e) { try {
            c(s.throw(e));
        }
        catch (e) {
            i(e);
        } } function c(e) { var t; e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) { e(t); }))).then(o, a); } c((s = s.apply(e, t || [])).next()); })); var e, t, n, s; }(); return Promise.race([A.promise, S]); }
        function d(e, t, r) { var n = null; if (null != t) {
            n = (0, s.Y0)(t);
            var r_51 = "string" == typeof e ? { url: e } : (0, o.shallowCopy)(e);
            r_51.headers ? 0 !== Object.keys(r_51.headers).filter((function (e) { return "content-type" === e.toLowerCase(); })).length || (r_51.headers = (0, o.shallowCopy)(r_51.headers), r_51.headers["content-type"] = "application/json") : r_51.headers = { "content-type": "application/json" }, e = r_51;
        } return h(e, n, (function (e, t) { var n = null; if (null != e)
            try {
                n = JSON.parse((0, s.ZN)(e));
            }
            catch (t) {
                u.throwError("invalid JSON", a.Logger.errors.SERVER_ERROR, { body: e, error: t });
            } return r && (n = r(n, t)), n; })); }
        function p(e, t) { return t || (t = {}), null == (t = (0, o.shallowCopy)(t)).floor && (t.floor = 0), null == t.ceiling && (t.ceiling = 1e4), null == t.interval && (t.interval = 250), new Promise((function (r, n) { var i = null, o = !1; var s = function () { return !o && (o = !0, i && clearTimeout(i), !0); }; t.timeout && (i = setTimeout((function () { s() && n(new Error("timeout")); }), t.timeout)); var a = t.retryLimit; var c = 0; !function i() { return e().then((function (e) { if (void 0 !== e)
            s() && r(e);
        else if (t.oncePoll)
            t.oncePoll.once("poll", i);
        else if (t.onceBlock)
            t.onceBlock.once("block", i);
        else if (!o) {
            if (c++, c > a)
                return void (s() && n(new Error("retry limit reached")));
            var e_54 = t.interval * parseInt(String(Math.random() * Math.pow(2, c)));
            e_54 < t.floor && (e_54 = t.floor), e_54 > t.ceiling && (e_54 = t.ceiling), setTimeout(i, e_54);
        } return null; }), (function (e) { s() && n(e); })); }(); })); }
    }, 8826: function (e) {
        "use strict";
        !function (t) { function r(e) { return parseInt(e) === e; } function n(e) { if (!r(e.length))
            return !1; for (var t = 0; t < e.length; t++)
            if (!r(e[t]) || e[t] < 0 || e[t] > 255)
                return !1; return !0; } function i(e, t) { if (e.buffer && ArrayBuffer.isView(e) && "Uint8Array" === e.name)
            return t && (e = e.slice ? e.slice() : Array.prototype.slice.call(e)), e; if (Array.isArray(e)) {
            if (!n(e))
                throw new Error("Array contains invalid value: " + e);
            return new Uint8Array(e);
        } if (r(e.length) && n(e))
            return new Uint8Array(e); throw new Error("unsupported array-like object"); } function o(e) { return new Uint8Array(e); } function s(e, t, r, n, i) { null == n && null == i || (e = e.slice ? e.slice(n, i) : Array.prototype.slice.call(e, n, i)), t.set(e, r); } var a, c = { toBytes: function (e) { var t = [], r = 0; for (e = encodeURI(e); r < e.length;) {
                var n = e.charCodeAt(r++);
                37 === n ? (t.push(parseInt(e.substr(r, 2), 16)), r += 2) : t.push(n);
            } return i(t); }, fromBytes: function (e) { for (var t = [], r = 0; r < e.length;) {
                var n = e[r];
                n < 128 ? (t.push(String.fromCharCode(n)), r++) : n > 191 && n < 224 ? (t.push(String.fromCharCode((31 & n) << 6 | 63 & e[r + 1])), r += 2) : (t.push(String.fromCharCode((15 & n) << 12 | (63 & e[r + 1]) << 6 | 63 & e[r + 2])), r += 3);
            } return t.join(""); } }, u = (a = "0123456789abcdef", { toBytes: function (e) { for (var t = [], r = 0; r < e.length; r += 2)
                t.push(parseInt(e.substr(r, 2), 16)); return t; }, fromBytes: function (e) { for (var t = [], r = 0; r < e.length; r++) {
                var n = e[r];
                t.push(a[(240 & n) >> 4] + a[15 & n]);
            } return t.join(""); } }), f = { 16: 10, 24: 12, 32: 14 }, l = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145], h = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22], d = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125], p = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986], g = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766], m = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126], y = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436], b = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890], v = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935], w = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600], A = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480], S = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795], E = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855], k = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150], x = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925]; function N(e) { for (var t = [], r = 0; r < e.length; r += 4)
            t.push(e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3]); return t; } var B = function (e) { if (!(this instanceof B))
            throw Error("AES must be instanitated with `new`"); Object.defineProperty(this, "key", { value: i(e, !0) }), this._prepare(); }; B.prototype._prepare = function () { var e = f[this.key.length]; if (null == e)
            throw new Error("invalid key size (must be 16, 24 or 32 bytes)"); this._Ke = [], this._Kd = []; for (var t = 0; t <= e; t++)
            this._Ke.push([0, 0, 0, 0]), this._Kd.push([0, 0, 0, 0]); var r, n = 4 * (e + 1), i = this.key.length / 4, o = N(this.key); for (t = 0; t < i; t++)
            r = t >> 2, this._Ke[r][t % 4] = o[t], this._Kd[e - r][t % 4] = o[t]; for (var s, a = 0, c = i; c < n;) {
            if (s = o[i - 1], o[0] ^= h[s >> 16 & 255] << 24 ^ h[s >> 8 & 255] << 16 ^ h[255 & s] << 8 ^ h[s >> 24 & 255] ^ l[a] << 24, a += 1, 8 != i)
                for (t = 1; t < i; t++)
                    o[t] ^= o[t - 1];
            else {
                for (t = 1; t < i / 2; t++)
                    o[t] ^= o[t - 1];
                for (s = o[i / 2 - 1], o[i / 2] ^= h[255 & s] ^ h[s >> 8 & 255] << 8 ^ h[s >> 16 & 255] << 16 ^ h[s >> 24 & 255] << 24, t = i / 2 + 1; t < i; t++)
                    o[t] ^= o[t - 1];
            }
            for (t = 0; t < i && c < n;)
                u = c >> 2, d = c % 4, this._Ke[u][d] = o[t], this._Kd[e - u][d] = o[t++], c++;
        } for (var u = 1; u < e; u++)
            for (var d = 0; d < 4; d++)
                s = this._Kd[u][d], this._Kd[u][d] = S[s >> 24 & 255] ^ E[s >> 16 & 255] ^ k[s >> 8 & 255] ^ x[255 & s]; }, B.prototype.encrypt = function (e) { if (16 != e.length)
            throw new Error("invalid plaintext size (must be 16 bytes)"); for (var t = this._Ke.length - 1, r = [0, 0, 0, 0], n = N(e), i = 0; i < 4; i++)
            n[i] ^= this._Ke[0][i]; for (var s = 1; s < t; s++) {
            for (i = 0; i < 4; i++)
                r[i] = p[n[i] >> 24 & 255] ^ g[n[(i + 1) % 4] >> 16 & 255] ^ m[n[(i + 2) % 4] >> 8 & 255] ^ y[255 & n[(i + 3) % 4]] ^ this._Ke[s][i];
            n = r.slice();
        } var a, c = o(16); for (i = 0; i < 4; i++)
            a = this._Ke[t][i], c[4 * i] = 255 & (h[n[i] >> 24 & 255] ^ a >> 24), c[4 * i + 1] = 255 & (h[n[(i + 1) % 4] >> 16 & 255] ^ a >> 16), c[4 * i + 2] = 255 & (h[n[(i + 2) % 4] >> 8 & 255] ^ a >> 8), c[4 * i + 3] = 255 & (h[255 & n[(i + 3) % 4]] ^ a); return c; }, B.prototype.decrypt = function (e) { if (16 != e.length)
            throw new Error("invalid ciphertext size (must be 16 bytes)"); for (var t = this._Kd.length - 1, r = [0, 0, 0, 0], n = N(e), i = 0; i < 4; i++)
            n[i] ^= this._Kd[0][i]; for (var s = 1; s < t; s++) {
            for (i = 0; i < 4; i++)
                r[i] = b[n[i] >> 24 & 255] ^ v[n[(i + 3) % 4] >> 16 & 255] ^ w[n[(i + 2) % 4] >> 8 & 255] ^ A[255 & n[(i + 1) % 4]] ^ this._Kd[s][i];
            n = r.slice();
        } var a, c = o(16); for (i = 0; i < 4; i++)
            a = this._Kd[t][i], c[4 * i] = 255 & (d[n[i] >> 24 & 255] ^ a >> 24), c[4 * i + 1] = 255 & (d[n[(i + 3) % 4] >> 16 & 255] ^ a >> 16), c[4 * i + 2] = 255 & (d[n[(i + 2) % 4] >> 8 & 255] ^ a >> 8), c[4 * i + 3] = 255 & (d[255 & n[(i + 1) % 4]] ^ a); return c; }; var P = function (e) { if (!(this instanceof P))
            throw Error("AES must be instanitated with `new`"); this.description = "Electronic Code Block", this.name = "ecb", this._aes = new B(e); }; P.prototype.encrypt = function (e) { if ((e = i(e)).length % 16 != 0)
            throw new Error("invalid plaintext size (must be multiple of 16 bytes)"); for (var t = o(e.length), r = o(16), n = 0; n < e.length; n += 16)
            s(e, r, 0, n, n + 16), s(r = this._aes.encrypt(r), t, n); return t; }, P.prototype.decrypt = function (e) { if ((e = i(e)).length % 16 != 0)
            throw new Error("invalid ciphertext size (must be multiple of 16 bytes)"); for (var t = o(e.length), r = o(16), n = 0; n < e.length; n += 16)
            s(e, r, 0, n, n + 16), s(r = this._aes.decrypt(r), t, n); return t; }; var _ = function (e, t) { if (!(this instanceof _))
            throw Error("AES must be instanitated with `new`"); if (this.description = "Cipher Block Chaining", this.name = "cbc", t) {
            if (16 != t.length)
                throw new Error("invalid initialation vector size (must be 16 bytes)");
        }
        else
            t = o(16); this._lastCipherblock = i(t, !0), this._aes = new B(e); }; _.prototype.encrypt = function (e) { if ((e = i(e)).length % 16 != 0)
            throw new Error("invalid plaintext size (must be multiple of 16 bytes)"); for (var t = o(e.length), r = o(16), n = 0; n < e.length; n += 16) {
            s(e, r, 0, n, n + 16);
            for (var a = 0; a < 16; a++)
                r[a] ^= this._lastCipherblock[a];
            this._lastCipherblock = this._aes.encrypt(r), s(this._lastCipherblock, t, n);
        } return t; }, _.prototype.decrypt = function (e) { if ((e = i(e)).length % 16 != 0)
            throw new Error("invalid ciphertext size (must be multiple of 16 bytes)"); for (var t = o(e.length), r = o(16), n = 0; n < e.length; n += 16) {
            s(e, r, 0, n, n + 16), r = this._aes.decrypt(r);
            for (var a = 0; a < 16; a++)
                t[n + a] = r[a] ^ this._lastCipherblock[a];
            s(e, this._lastCipherblock, 0, n, n + 16);
        } return t; }; var I = function (e, t, r) { if (!(this instanceof I))
            throw Error("AES must be instanitated with `new`"); if (this.description = "Cipher Feedback", this.name = "cfb", t) {
            if (16 != t.length)
                throw new Error("invalid initialation vector size (must be 16 size)");
        }
        else
            t = o(16); r || (r = 1), this.segmentSize = r, this._shiftRegister = i(t, !0), this._aes = new B(e); }; I.prototype.encrypt = function (e) { if (e.length % this.segmentSize != 0)
            throw new Error("invalid plaintext size (must be segmentSize bytes)"); for (var t, r = i(e, !0), n = 0; n < r.length; n += this.segmentSize) {
            t = this._aes.encrypt(this._shiftRegister);
            for (var o = 0; o < this.segmentSize; o++)
                r[n + o] ^= t[o];
            s(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), s(r, this._shiftRegister, 16 - this.segmentSize, n, n + this.segmentSize);
        } return r; }, I.prototype.decrypt = function (e) { if (e.length % this.segmentSize != 0)
            throw new Error("invalid ciphertext size (must be segmentSize bytes)"); for (var t, r = i(e, !0), n = 0; n < r.length; n += this.segmentSize) {
            t = this._aes.encrypt(this._shiftRegister);
            for (var o = 0; o < this.segmentSize; o++)
                r[n + o] ^= t[o];
            s(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), s(e, this._shiftRegister, 16 - this.segmentSize, n, n + this.segmentSize);
        } return r; }; var O = function (e, t) { if (!(this instanceof O))
            throw Error("AES must be instanitated with `new`"); if (this.description = "Output Feedback", this.name = "ofb", t) {
            if (16 != t.length)
                throw new Error("invalid initialation vector size (must be 16 bytes)");
        }
        else
            t = o(16); this._lastPrecipher = i(t, !0), this._lastPrecipherIndex = 16, this._aes = new B(e); }; O.prototype.encrypt = function (e) { for (var t = i(e, !0), r = 0; r < t.length; r++)
            16 === this._lastPrecipherIndex && (this._lastPrecipher = this._aes.encrypt(this._lastPrecipher), this._lastPrecipherIndex = 0), t[r] ^= this._lastPrecipher[this._lastPrecipherIndex++]; return t; }, O.prototype.decrypt = O.prototype.encrypt; var T = function (e) { if (!(this instanceof T))
            throw Error("Counter must be instanitated with `new`"); 0 === e || e || (e = 1), "number" == typeof e ? (this._counter = o(16), this.setValue(e)) : this.setBytes(e); }; T.prototype.setValue = function (e) { if ("number" != typeof e || parseInt(e) != e)
            throw new Error("invalid counter value (must be an integer)"); for (var t = 15; t >= 0; --t)
            this._counter[t] = e % 256, e >>= 8; }, T.prototype.setBytes = function (e) { if (16 != (e = i(e, !0)).length)
            throw new Error("invalid counter bytes size (must be 16 bytes)"); this._counter = e; }, T.prototype.increment = function () { for (var e = 15; e >= 0; e--) {
            if (255 !== this._counter[e]) {
                this._counter[e]++;
                break;
            }
            this._counter[e] = 0;
        } }; var R = function (e, t) { if (!(this instanceof R))
            throw Error("AES must be instanitated with `new`"); this.description = "Counter", this.name = "ctr", t instanceof T || (t = new T(t)), this._counter = t, this._remainingCounter = null, this._remainingCounterIndex = 16, this._aes = new B(e); }; R.prototype.encrypt = function (e) { for (var t = i(e, !0), r = 0; r < t.length; r++)
            16 === this._remainingCounterIndex && (this._remainingCounter = this._aes.encrypt(this._counter._counter), this._remainingCounterIndex = 0, this._counter.increment()), t[r] ^= this._remainingCounter[this._remainingCounterIndex++]; return t; }, R.prototype.decrypt = R.prototype.encrypt; var C = { AES: B, Counter: T, ModeOfOperation: { ecb: P, cbc: _, cfb: I, ofb: O, ctr: R }, utils: { hex: u, utf8: c }, padding: { pkcs7: { pad: function (e) { var t = 16 - (e = i(e, !0)).length % 16, r = o(e.length + t); s(e, r); for (var n = e.length; n < r.length; n++)
                        r[n] = t; return r; }, strip: function (e) { if ((e = i(e, !0)).length < 16)
                        throw new Error("PKCS#7 invalid length"); var t = e[e.length - 1]; if (t > 16)
                        throw new Error("PKCS#7 padding byte out of range"); for (var r = e.length - t, n = 0; n < t; n++)
                        if (e[r + n] !== t)
                            throw new Error("PKCS#7 invalid padding byte"); var a = o(r); return s(e, a, 0, 0, r), a; } } }, _arrayTest: { coerceArray: i, createArray: o, copyArray: s } }; e.exports = C; }();
    }, 2882: function (e) {
        "use strict";
        for (var t = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", r = {}, n = 0; n < t.length; n++) {
            var i = t.charAt(n);
            if (void 0 !== r[i])
                throw new TypeError(i + " is ambiguous");
            r[i] = n;
        }
        function o(e) { var t = e >> 25; return (33554431 & e) << 5 ^ 996825010 & -(t >> 0 & 1) ^ 642813549 & -(t >> 1 & 1) ^ 513874426 & -(t >> 2 & 1) ^ 1027748829 & -(t >> 3 & 1) ^ 705979059 & -(t >> 4 & 1); }
        function s(e) { for (var t = 1, r = 0; r < e.length; ++r) {
            var n = e.charCodeAt(r);
            if (n < 33 || n > 126)
                return "Invalid prefix (" + e + ")";
            t = o(t) ^ n >> 5;
        } for (t = o(t), r = 0; r < e.length; ++r) {
            var i = e.charCodeAt(r);
            t = o(t) ^ 31 & i;
        } return t; }
        function a(e, t) { if (t = t || 90, e.length < 8)
            return e + " too short"; if (e.length > t)
            return "Exceeds length limit"; var n = e.toLowerCase(), i = e.toUpperCase(); if (e !== n && e !== i)
            return "Mixed-case string " + e; var a = (e = n).lastIndexOf("1"); if (-1 === a)
            return "No separator character for " + e; if (0 === a)
            return "Missing prefix for " + e; var c = e.slice(0, a), u = e.slice(a + 1); if (u.length < 6)
            return "Data too short"; var f = s(c); if ("string" == typeof f)
            return f; for (var l = [], h = 0; h < u.length; ++h) {
            var d = u.charAt(h), p = r[d];
            if (void 0 === p)
                return "Unknown character " + d;
            f = o(f) ^ p, h + 6 >= u.length || l.push(p);
        } return 1 !== f ? "Invalid checksum for " + e : { prefix: c, words: l }; }
        function c(e, t, r, n) { for (var i = 0, o = 0, s = (1 << r) - 1, a = [], c = 0; c < e.length; ++c)
            for (i = i << t | e[c], o += t; o >= r;)
                o -= r, a.push(i >> o & s); if (n)
            o > 0 && a.push(i << r - o & s);
        else {
            if (o >= t)
                return "Excess padding";
            if (i << r - o & s)
                return "Non-zero padding";
        } return a; }
        e.exports = { decodeUnsafe: function () { var e = a.apply(null, arguments); if ("object" == typeof e)
                return e; }, decode: function (e) { var t = a.apply(null, arguments); if ("object" == typeof t)
                return t; throw new Error(t); }, encode: function (e, r, n) { if (n = n || 90, e.length + 7 + r.length > n)
                throw new TypeError("Exceeds length limit"); var i = s(e = e.toLowerCase()); if ("string" == typeof i)
                throw new Error(i); for (var a = e + "1", c = 0; c < r.length; ++c) {
                var u = r[c];
                if (u >> 5 != 0)
                    throw new Error("Non 5-bit word");
                i = o(i) ^ u, a += t.charAt(u);
            } for (c = 0; c < 6; ++c)
                i = o(i); for (i ^= 1, c = 0; c < 6; ++c)
                a += t.charAt(i >> 5 * (5 - c) & 31); return a; }, toWordsUnsafe: function (e) { var t = c(e, 8, 5, !0); if (Array.isArray(t))
                return t; }, toWords: function (e) { var t = c(e, 8, 5, !0); if (Array.isArray(t))
                return t; throw new Error(t); }, fromWordsUnsafe: function (e) { var t = c(e, 5, 8, !1); if (Array.isArray(t))
                return t; }, fromWords: function (e) { var t = c(e, 5, 8, !1); if (Array.isArray(t))
                return t; throw new Error(t); } };
    }, 3550: function (e, t, r) { !function (e, t) {
        "use strict";
        function n(e, t) { if (!e)
            throw new Error(t || "Assertion failed"); }
        function i(e, t) { e.super_ = t; var r = function () { }; r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e; }
        function o(e, t, r) { if (o.isBN(e))
            return e; this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== e && ("le" !== t && "be" !== t || (r = t, t = 10), this._init(e || 0, t || 10, r || "be")); }
        var s;
        "object" == typeof e ? e.exports = o : t.BN = o, o.BN = o, o.wordSize = 26;
        try {
            s = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : r(6601).Buffer;
        }
        catch (e) { }
        function a(e, t) { var r = e.charCodeAt(t); return r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : r - 48 & 15; }
        function c(e, t, r) { var n = a(e, r); return r - 1 >= t && (n |= a(e, r - 1) << 4), n; }
        function u(e, t, r, n) { for (var i = 0, o = Math.min(e.length, r), s = t; s < o; s++) {
            var a = e.charCodeAt(s) - 48;
            i *= n, i += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a;
        } return i; }
        o.isBN = function (e) { return e instanceof o || null !== e && "object" == typeof e && e.constructor.wordSize === o.wordSize && Array.isArray(e.words); }, o.max = function (e, t) { return e.cmp(t) > 0 ? e : t; }, o.min = function (e, t) { return e.cmp(t) < 0 ? e : t; }, o.prototype._init = function (e, t, r) { if ("number" == typeof e)
            return this._initNumber(e, t, r); if ("object" == typeof e)
            return this._initArray(e, t, r); "hex" === t && (t = 16), n(t === (0 | t) && t >= 2 && t <= 36); var i = 0; "-" === (e = e.toString().replace(/\s+/g, ""))[0] && (i++, this.negative = 1), i < e.length && (16 === t ? this._parseHex(e, i, r) : (this._parseBase(e, t, i), "le" === r && this._initArray(this.toArray(), t, r))); }, o.prototype._initNumber = function (e, t, r) { e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [67108863 & e], this.length = 1) : e < 4503599627370496 ? (this.words = [67108863 & e, e / 67108864 & 67108863], this.length = 2) : (n(e < 9007199254740992), this.words = [67108863 & e, e / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), t, r); }, o.prototype._initArray = function (e, t, r) { if (n("number" == typeof e.length), e.length <= 0)
            return this.words = [0], this.length = 1, this; this.length = Math.ceil(e.length / 3), this.words = new Array(this.length); for (var i = 0; i < this.length; i++)
            this.words[i] = 0; var o, s, a = 0; if ("be" === r)
            for (i = e.length - 1, o = 0; i >= 0; i -= 3)
                s = e[i] | e[i - 1] << 8 | e[i - 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++);
        else if ("le" === r)
            for (i = 0, o = 0; i < e.length; i += 3)
                s = e[i] | e[i + 1] << 8 | e[i + 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++); return this.strip(); }, o.prototype._parseHex = function (e, t, r) { this.length = Math.ceil((e.length - t) / 6), this.words = new Array(this.length); for (var n = 0; n < this.length; n++)
            this.words[n] = 0; var i, o = 0, s = 0; if ("be" === r)
            for (n = e.length - 1; n >= t; n -= 2)
                i = c(e, t, n) << o, this.words[s] |= 67108863 & i, o >= 18 ? (o -= 18, s += 1, this.words[s] |= i >>> 26) : o += 8;
        else
            for (n = (e.length - t) % 2 == 0 ? t + 1 : t; n < e.length; n += 2)
                i = c(e, t, n) << o, this.words[s] |= 67108863 & i, o >= 18 ? (o -= 18, s += 1, this.words[s] |= i >>> 26) : o += 8; this.strip(); }, o.prototype._parseBase = function (e, t, r) { this.words = [0], this.length = 1; for (var n = 0, i = 1; i <= 67108863; i *= t)
            n++; n--, i = i / t | 0; for (var o = e.length - r, s = o % n, a = Math.min(o, o - s) + r, c = 0, f = r; f < a; f += n)
            c = u(e, f, f + n, t), this.imuln(i), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c); if (0 !== s) {
            var l = 1;
            for (c = u(e, f, e.length, t), f = 0; f < s; f++)
                l *= t;
            this.imuln(l), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);
        } this.strip(); }, o.prototype.copy = function (e) { e.words = new Array(this.length); for (var t = 0; t < this.length; t++)
            e.words[t] = this.words[t]; e.length = this.length, e.negative = this.negative, e.red = this.red; }, o.prototype.clone = function () { var e = new o(null); return this.copy(e), e; }, o.prototype._expand = function (e) { for (; this.length < e;)
            this.words[this.length++] = 0; return this; }, o.prototype.strip = function () { for (; this.length > 1 && 0 === this.words[this.length - 1];)
            this.length--; return this._normSign(); }, o.prototype._normSign = function () { return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this; }, o.prototype.inspect = function () { return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"; };
        var f = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], l = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], h = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
        function d(e, t, r) { r.negative = t.negative ^ e.negative; var n = e.length + t.length | 0; r.length = n, n = n - 1 | 0; var i = 0 | e.words[0], o = 0 | t.words[0], s = i * o, a = 67108863 & s, c = s / 67108864 | 0; r.words[0] = a; for (var u = 1; u < n; u++) {
            for (var f = c >>> 26, l = 67108863 & c, h = Math.min(u, t.length - 1), d = Math.max(0, u - e.length + 1); d <= h; d++) {
                var p = u - d | 0;
                f += (s = (i = 0 | e.words[p]) * (o = 0 | t.words[d]) + l) / 67108864 | 0, l = 67108863 & s;
            }
            r.words[u] = 0 | l, c = 0 | f;
        } return 0 !== c ? r.words[u] = 0 | c : r.length--, r.strip(); }
        o.prototype.toString = function (e, t) { var r; if (t = 0 | t || 1, 16 === (e = e || 10) || "hex" === e) {
            r = "";
            for (var i = 0, o = 0, s = 0; s < this.length; s++) {
                var a = this.words[s], c = (16777215 & (a << i | o)).toString(16);
                r = 0 != (o = a >>> 24 - i & 16777215) || s !== this.length - 1 ? f[6 - c.length] + c + r : c + r, (i += 2) >= 26 && (i -= 26, s--);
            }
            for (0 !== o && (r = o.toString(16) + r); r.length % t != 0;)
                r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
        } if (e === (0 | e) && e >= 2 && e <= 36) {
            var u = l[e], d = h[e];
            r = "";
            var p = this.clone();
            for (p.negative = 0; !p.isZero();) {
                var g = p.modn(d).toString(e);
                r = (p = p.idivn(d)).isZero() ? g + r : f[u - g.length] + g + r;
            }
            for (this.isZero() && (r = "0" + r); r.length % t != 0;)
                r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
        } n(!1, "Base should be between 2 and 36"); }, o.prototype.toNumber = function () { var e = this.words[0]; return 2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -e : e; }, o.prototype.toJSON = function () { return this.toString(16); }, o.prototype.toBuffer = function (e, t) { return n(void 0 !== s), this.toArrayLike(s, e, t); }, o.prototype.toArray = function (e, t) { return this.toArrayLike(Array, e, t); }, o.prototype.toArrayLike = function (e, t, r) { var i = this.byteLength(), o = r || Math.max(1, i); n(i <= o, "byte array longer than desired length"), n(o > 0, "Requested array length <= 0"), this.strip(); var s, a, c = "le" === t, u = new e(o), f = this.clone(); if (c) {
            for (a = 0; !f.isZero(); a++)
                s = f.andln(255), f.iushrn(8), u[a] = s;
            for (; a < o; a++)
                u[a] = 0;
        }
        else {
            for (a = 0; a < o - i; a++)
                u[a] = 0;
            for (a = 0; !f.isZero(); a++)
                s = f.andln(255), f.iushrn(8), u[o - a - 1] = s;
        } return u; }, Math.clz32 ? o.prototype._countBits = function (e) { return 32 - Math.clz32(e); } : o.prototype._countBits = function (e) { var t = e, r = 0; return t >= 4096 && (r += 13, t >>>= 13), t >= 64 && (r += 7, t >>>= 7), t >= 8 && (r += 4, t >>>= 4), t >= 2 && (r += 2, t >>>= 2), r + t; }, o.prototype._zeroBits = function (e) { if (0 === e)
            return 26; var t = e, r = 0; return 0 == (8191 & t) && (r += 13, t >>>= 13), 0 == (127 & t) && (r += 7, t >>>= 7), 0 == (15 & t) && (r += 4, t >>>= 4), 0 == (3 & t) && (r += 2, t >>>= 2), 0 == (1 & t) && r++, r; }, o.prototype.bitLength = function () { var e = this.words[this.length - 1], t = this._countBits(e); return 26 * (this.length - 1) + t; }, o.prototype.zeroBits = function () { if (this.isZero())
            return 0; for (var e = 0, t = 0; t < this.length; t++) {
            var r = this._zeroBits(this.words[t]);
            if (e += r, 26 !== r)
                break;
        } return e; }, o.prototype.byteLength = function () { return Math.ceil(this.bitLength() / 8); }, o.prototype.toTwos = function (e) { return 0 !== this.negative ? this.abs().inotn(e).iaddn(1) : this.clone(); }, o.prototype.fromTwos = function (e) { return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone(); }, o.prototype.isNeg = function () { return 0 !== this.negative; }, o.prototype.neg = function () { return this.clone().ineg(); }, o.prototype.ineg = function () { return this.isZero() || (this.negative ^= 1), this; }, o.prototype.iuor = function (e) { for (; this.length < e.length;)
            this.words[this.length++] = 0; for (var t = 0; t < e.length; t++)
            this.words[t] = this.words[t] | e.words[t]; return this.strip(); }, o.prototype.ior = function (e) { return n(0 == (this.negative | e.negative)), this.iuor(e); }, o.prototype.or = function (e) { return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this); }, o.prototype.uor = function (e) { return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this); }, o.prototype.iuand = function (e) { var t; t = this.length > e.length ? e : this; for (var r = 0; r < t.length; r++)
            this.words[r] = this.words[r] & e.words[r]; return this.length = t.length, this.strip(); }, o.prototype.iand = function (e) { return n(0 == (this.negative | e.negative)), this.iuand(e); }, o.prototype.and = function (e) { return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this); }, o.prototype.uand = function (e) { return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this); }, o.prototype.iuxor = function (e) { var t, r; this.length > e.length ? (t = this, r = e) : (t = e, r = this); for (var n = 0; n < r.length; n++)
            this.words[n] = t.words[n] ^ r.words[n]; if (this !== t)
            for (; n < t.length; n++)
                this.words[n] = t.words[n]; return this.length = t.length, this.strip(); }, o.prototype.ixor = function (e) { return n(0 == (this.negative | e.negative)), this.iuxor(e); }, o.prototype.xor = function (e) { return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this); }, o.prototype.uxor = function (e) { return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this); }, o.prototype.inotn = function (e) { n("number" == typeof e && e >= 0); var t = 0 | Math.ceil(e / 26), r = e % 26; this._expand(t), r > 0 && t--; for (var i = 0; i < t; i++)
            this.words[i] = 67108863 & ~this.words[i]; return r > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - r), this.strip(); }, o.prototype.notn = function (e) { return this.clone().inotn(e); }, o.prototype.setn = function (e, t) { n("number" == typeof e && e >= 0); var r = e / 26 | 0, i = e % 26; return this._expand(r + 1), this.words[r] = t ? this.words[r] | 1 << i : this.words[r] & ~(1 << i), this.strip(); }, o.prototype.iadd = function (e) { var t, r, n; if (0 !== this.negative && 0 === e.negative)
            return this.negative = 0, t = this.isub(e), this.negative ^= 1, this._normSign(); if (0 === this.negative && 0 !== e.negative)
            return e.negative = 0, t = this.isub(e), e.negative = 1, t._normSign(); this.length > e.length ? (r = this, n = e) : (r = e, n = this); for (var i = 0, o = 0; o < n.length; o++)
            t = (0 | r.words[o]) + (0 | n.words[o]) + i, this.words[o] = 67108863 & t, i = t >>> 26; for (; 0 !== i && o < r.length; o++)
            t = (0 | r.words[o]) + i, this.words[o] = 67108863 & t, i = t >>> 26; if (this.length = r.length, 0 !== i)
            this.words[this.length] = i, this.length++;
        else if (r !== this)
            for (; o < r.length; o++)
                this.words[o] = r.words[o]; return this; }, o.prototype.add = function (e) { var t; return 0 !== e.negative && 0 === this.negative ? (e.negative = 0, t = this.sub(e), e.negative ^= 1, t) : 0 === e.negative && 0 !== this.negative ? (this.negative = 0, t = e.sub(this), this.negative = 1, t) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this); }, o.prototype.isub = function (e) { if (0 !== e.negative) {
            e.negative = 0;
            var t = this.iadd(e);
            return e.negative = 1, t._normSign();
        } if (0 !== this.negative)
            return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign(); var r, n, i = this.cmp(e); if (0 === i)
            return this.negative = 0, this.length = 1, this.words[0] = 0, this; i > 0 ? (r = this, n = e) : (r = e, n = this); for (var o = 0, s = 0; s < n.length; s++)
            o = (t = (0 | r.words[s]) - (0 | n.words[s]) + o) >> 26, this.words[s] = 67108863 & t; for (; 0 !== o && s < r.length; s++)
            o = (t = (0 | r.words[s]) + o) >> 26, this.words[s] = 67108863 & t; if (0 === o && s < r.length && r !== this)
            for (; s < r.length; s++)
                this.words[s] = r.words[s]; return this.length = Math.max(this.length, s), r !== this && (this.negative = 1), this.strip(); }, o.prototype.sub = function (e) { return this.clone().isub(e); };
        var p = function (e, t, r) { var n, i, o, s = e.words, a = t.words, c = r.words, u = 0, f = 0 | s[0], l = 8191 & f, h = f >>> 13, d = 0 | s[1], p = 8191 & d, g = d >>> 13, m = 0 | s[2], y = 8191 & m, b = m >>> 13, v = 0 | s[3], w = 8191 & v, A = v >>> 13, S = 0 | s[4], E = 8191 & S, k = S >>> 13, x = 0 | s[5], N = 8191 & x, B = x >>> 13, P = 0 | s[6], _ = 8191 & P, I = P >>> 13, O = 0 | s[7], T = 8191 & O, R = O >>> 13, C = 0 | s[8], M = 8191 & C, L = C >>> 13, U = 0 | s[9], D = 8191 & U, F = U >>> 13, j = 0 | a[0], H = 8191 & j, V = j >>> 13, z = 0 | a[1], G = 8191 & z, q = z >>> 13, K = 0 | a[2], W = 8191 & K, $ = K >>> 13, J = 0 | a[3], Z = 8191 & J, X = J >>> 13, Y = 0 | a[4], Q = 8191 & Y, ee = Y >>> 13, te = 0 | a[5], re = 8191 & te, ne = te >>> 13, ie = 0 | a[6], oe = 8191 & ie, se = ie >>> 13, ae = 0 | a[7], ce = 8191 & ae, ue = ae >>> 13, fe = 0 | a[8], le = 8191 & fe, he = fe >>> 13, de = 0 | a[9], pe = 8191 & de, ge = de >>> 13; r.negative = e.negative ^ t.negative, r.length = 19; var me = (u + (n = Math.imul(l, H)) | 0) + ((8191 & (i = (i = Math.imul(l, V)) + Math.imul(h, H) | 0)) << 13) | 0; u = ((o = Math.imul(h, V)) + (i >>> 13) | 0) + (me >>> 26) | 0, me &= 67108863, n = Math.imul(p, H), i = (i = Math.imul(p, V)) + Math.imul(g, H) | 0, o = Math.imul(g, V); var ye = (u + (n = n + Math.imul(l, G) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, q) | 0) + Math.imul(h, G) | 0)) << 13) | 0; u = ((o = o + Math.imul(h, q) | 0) + (i >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, n = Math.imul(y, H), i = (i = Math.imul(y, V)) + Math.imul(b, H) | 0, o = Math.imul(b, V), n = n + Math.imul(p, G) | 0, i = (i = i + Math.imul(p, q) | 0) + Math.imul(g, G) | 0, o = o + Math.imul(g, q) | 0; var be = (u + (n = n + Math.imul(l, W) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, $) | 0) + Math.imul(h, W) | 0)) << 13) | 0; u = ((o = o + Math.imul(h, $) | 0) + (i >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, n = Math.imul(w, H), i = (i = Math.imul(w, V)) + Math.imul(A, H) | 0, o = Math.imul(A, V), n = n + Math.imul(y, G) | 0, i = (i = i + Math.imul(y, q) | 0) + Math.imul(b, G) | 0, o = o + Math.imul(b, q) | 0, n = n + Math.imul(p, W) | 0, i = (i = i + Math.imul(p, $) | 0) + Math.imul(g, W) | 0, o = o + Math.imul(g, $) | 0; var ve = (u + (n = n + Math.imul(l, Z) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, X) | 0) + Math.imul(h, Z) | 0)) << 13) | 0; u = ((o = o + Math.imul(h, X) | 0) + (i >>> 13) | 0) + (ve >>> 26) | 0, ve &= 67108863, n = Math.imul(E, H), i = (i = Math.imul(E, V)) + Math.imul(k, H) | 0, o = Math.imul(k, V), n = n + Math.imul(w, G) | 0, i = (i = i + Math.imul(w, q) | 0) + Math.imul(A, G) | 0, o = o + Math.imul(A, q) | 0, n = n + Math.imul(y, W) | 0, i = (i = i + Math.imul(y, $) | 0) + Math.imul(b, W) | 0, o = o + Math.imul(b, $) | 0, n = n + Math.imul(p, Z) | 0, i = (i = i + Math.imul(p, X) | 0) + Math.imul(g, Z) | 0, o = o + Math.imul(g, X) | 0; var we = (u + (n = n + Math.imul(l, Q) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ee) | 0) + Math.imul(h, Q) | 0)) << 13) | 0; u = ((o = o + Math.imul(h, ee) | 0) + (i >>> 13) | 0) + (we >>> 26) | 0, we &= 67108863, n = Math.imul(N, H), i = (i = Math.imul(N, V)) + Math.imul(B, H) | 0, o = Math.imul(B, V), n = n + Math.imul(E, G) | 0, i = (i = i + Math.imul(E, q) | 0) + Math.imul(k, G) | 0, o = o + Math.imul(k, q) | 0, n = n + Math.imul(w, W) | 0, i = (i = i + Math.imul(w, $) | 0) + Math.imul(A, W) | 0, o = o + Math.imul(A, $) | 0, n = n + Math.imul(y, Z) | 0, i = (i = i + Math.imul(y, X) | 0) + Math.imul(b, Z) | 0, o = o + Math.imul(b, X) | 0, n = n + Math.imul(p, Q) | 0, i = (i = i + Math.imul(p, ee) | 0) + Math.imul(g, Q) | 0, o = o + Math.imul(g, ee) | 0; var Ae = (u + (n = n + Math.imul(l, re) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ne) | 0) + Math.imul(h, re) | 0)) << 13) | 0; u = ((o = o + Math.imul(h, ne) | 0) + (i >>> 13) | 0) + (Ae >>> 26) | 0, Ae &= 67108863, n = Math.imul(_, H), i = (i = Math.imul(_, V)) + Math.imul(I, H) | 0, o = Math.imul(I, V), n = n + Math.imul(N, G) | 0, i = (i = i + Math.imul(N, q) | 0) + Math.imul(B, G) | 0, o = o + Math.imul(B, q) | 0, n = n + Math.imul(E, W) | 0, i = (i = i + Math.imul(E, $) | 0) + Math.imul(k, W) | 0, o = o + Math.imul(k, $) | 0, n = n + Math.imul(w, Z) | 0, i = (i = i + Math.imul(w, X) | 0) + Math.imul(A, Z) | 0, o = o + Math.imul(A, X) | 0, n = n + Math.imul(y, Q) | 0, i = (i = i + Math.imul(y, ee) | 0) + Math.imul(b, Q) | 0, o = o + Math.imul(b, ee) | 0, n = n + Math.imul(p, re) | 0, i = (i = i + Math.imul(p, ne) | 0) + Math.imul(g, re) | 0, o = o + Math.imul(g, ne) | 0; var Se = (u + (n = n + Math.imul(l, oe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, se) | 0) + Math.imul(h, oe) | 0)) << 13) | 0; u = ((o = o + Math.imul(h, se) | 0) + (i >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, n = Math.imul(T, H), i = (i = Math.imul(T, V)) + Math.imul(R, H) | 0, o = Math.imul(R, V), n = n + Math.imul(_, G) | 0, i = (i = i + Math.imul(_, q) | 0) + Math.imul(I, G) | 0, o = o + Math.imul(I, q) | 0, n = n + Math.imul(N, W) | 0, i = (i = i + Math.imul(N, $) | 0) + Math.imul(B, W) | 0, o = o + Math.imul(B, $) | 0, n = n + Math.imul(E, Z) | 0, i = (i = i + Math.imul(E, X) | 0) + Math.imul(k, Z) | 0, o = o + Math.imul(k, X) | 0, n = n + Math.imul(w, Q) | 0, i = (i = i + Math.imul(w, ee) | 0) + Math.imul(A, Q) | 0, o = o + Math.imul(A, ee) | 0, n = n + Math.imul(y, re) | 0, i = (i = i + Math.imul(y, ne) | 0) + Math.imul(b, re) | 0, o = o + Math.imul(b, ne) | 0, n = n + Math.imul(p, oe) | 0, i = (i = i + Math.imul(p, se) | 0) + Math.imul(g, oe) | 0, o = o + Math.imul(g, se) | 0; var Ee = (u + (n = n + Math.imul(l, ce) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ue) | 0) + Math.imul(h, ce) | 0)) << 13) | 0; u = ((o = o + Math.imul(h, ue) | 0) + (i >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, n = Math.imul(M, H), i = (i = Math.imul(M, V)) + Math.imul(L, H) | 0, o = Math.imul(L, V), n = n + Math.imul(T, G) | 0, i = (i = i + Math.imul(T, q) | 0) + Math.imul(R, G) | 0, o = o + Math.imul(R, q) | 0, n = n + Math.imul(_, W) | 0, i = (i = i + Math.imul(_, $) | 0) + Math.imul(I, W) | 0, o = o + Math.imul(I, $) | 0, n = n + Math.imul(N, Z) | 0, i = (i = i + Math.imul(N, X) | 0) + Math.imul(B, Z) | 0, o = o + Math.imul(B, X) | 0, n = n + Math.imul(E, Q) | 0, i = (i = i + Math.imul(E, ee) | 0) + Math.imul(k, Q) | 0, o = o + Math.imul(k, ee) | 0, n = n + Math.imul(w, re) | 0, i = (i = i + Math.imul(w, ne) | 0) + Math.imul(A, re) | 0, o = o + Math.imul(A, ne) | 0, n = n + Math.imul(y, oe) | 0, i = (i = i + Math.imul(y, se) | 0) + Math.imul(b, oe) | 0, o = o + Math.imul(b, se) | 0, n = n + Math.imul(p, ce) | 0, i = (i = i + Math.imul(p, ue) | 0) + Math.imul(g, ce) | 0, o = o + Math.imul(g, ue) | 0; var ke = (u + (n = n + Math.imul(l, le) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, he) | 0) + Math.imul(h, le) | 0)) << 13) | 0; u = ((o = o + Math.imul(h, he) | 0) + (i >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, n = Math.imul(D, H), i = (i = Math.imul(D, V)) + Math.imul(F, H) | 0, o = Math.imul(F, V), n = n + Math.imul(M, G) | 0, i = (i = i + Math.imul(M, q) | 0) + Math.imul(L, G) | 0, o = o + Math.imul(L, q) | 0, n = n + Math.imul(T, W) | 0, i = (i = i + Math.imul(T, $) | 0) + Math.imul(R, W) | 0, o = o + Math.imul(R, $) | 0, n = n + Math.imul(_, Z) | 0, i = (i = i + Math.imul(_, X) | 0) + Math.imul(I, Z) | 0, o = o + Math.imul(I, X) | 0, n = n + Math.imul(N, Q) | 0, i = (i = i + Math.imul(N, ee) | 0) + Math.imul(B, Q) | 0, o = o + Math.imul(B, ee) | 0, n = n + Math.imul(E, re) | 0, i = (i = i + Math.imul(E, ne) | 0) + Math.imul(k, re) | 0, o = o + Math.imul(k, ne) | 0, n = n + Math.imul(w, oe) | 0, i = (i = i + Math.imul(w, se) | 0) + Math.imul(A, oe) | 0, o = o + Math.imul(A, se) | 0, n = n + Math.imul(y, ce) | 0, i = (i = i + Math.imul(y, ue) | 0) + Math.imul(b, ce) | 0, o = o + Math.imul(b, ue) | 0, n = n + Math.imul(p, le) | 0, i = (i = i + Math.imul(p, he) | 0) + Math.imul(g, le) | 0, o = o + Math.imul(g, he) | 0; var xe = (u + (n = n + Math.imul(l, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ge) | 0) + Math.imul(h, pe) | 0)) << 13) | 0; u = ((o = o + Math.imul(h, ge) | 0) + (i >>> 13) | 0) + (xe >>> 26) | 0, xe &= 67108863, n = Math.imul(D, G), i = (i = Math.imul(D, q)) + Math.imul(F, G) | 0, o = Math.imul(F, q), n = n + Math.imul(M, W) | 0, i = (i = i + Math.imul(M, $) | 0) + Math.imul(L, W) | 0, o = o + Math.imul(L, $) | 0, n = n + Math.imul(T, Z) | 0, i = (i = i + Math.imul(T, X) | 0) + Math.imul(R, Z) | 0, o = o + Math.imul(R, X) | 0, n = n + Math.imul(_, Q) | 0, i = (i = i + Math.imul(_, ee) | 0) + Math.imul(I, Q) | 0, o = o + Math.imul(I, ee) | 0, n = n + Math.imul(N, re) | 0, i = (i = i + Math.imul(N, ne) | 0) + Math.imul(B, re) | 0, o = o + Math.imul(B, ne) | 0, n = n + Math.imul(E, oe) | 0, i = (i = i + Math.imul(E, se) | 0) + Math.imul(k, oe) | 0, o = o + Math.imul(k, se) | 0, n = n + Math.imul(w, ce) | 0, i = (i = i + Math.imul(w, ue) | 0) + Math.imul(A, ce) | 0, o = o + Math.imul(A, ue) | 0, n = n + Math.imul(y, le) | 0, i = (i = i + Math.imul(y, he) | 0) + Math.imul(b, le) | 0, o = o + Math.imul(b, he) | 0; var Ne = (u + (n = n + Math.imul(p, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p, ge) | 0) + Math.imul(g, pe) | 0)) << 13) | 0; u = ((o = o + Math.imul(g, ge) | 0) + (i >>> 13) | 0) + (Ne >>> 26) | 0, Ne &= 67108863, n = Math.imul(D, W), i = (i = Math.imul(D, $)) + Math.imul(F, W) | 0, o = Math.imul(F, $), n = n + Math.imul(M, Z) | 0, i = (i = i + Math.imul(M, X) | 0) + Math.imul(L, Z) | 0, o = o + Math.imul(L, X) | 0, n = n + Math.imul(T, Q) | 0, i = (i = i + Math.imul(T, ee) | 0) + Math.imul(R, Q) | 0, o = o + Math.imul(R, ee) | 0, n = n + Math.imul(_, re) | 0, i = (i = i + Math.imul(_, ne) | 0) + Math.imul(I, re) | 0, o = o + Math.imul(I, ne) | 0, n = n + Math.imul(N, oe) | 0, i = (i = i + Math.imul(N, se) | 0) + Math.imul(B, oe) | 0, o = o + Math.imul(B, se) | 0, n = n + Math.imul(E, ce) | 0, i = (i = i + Math.imul(E, ue) | 0) + Math.imul(k, ce) | 0, o = o + Math.imul(k, ue) | 0, n = n + Math.imul(w, le) | 0, i = (i = i + Math.imul(w, he) | 0) + Math.imul(A, le) | 0, o = o + Math.imul(A, he) | 0; var Be = (u + (n = n + Math.imul(y, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(y, ge) | 0) + Math.imul(b, pe) | 0)) << 13) | 0; u = ((o = o + Math.imul(b, ge) | 0) + (i >>> 13) | 0) + (Be >>> 26) | 0, Be &= 67108863, n = Math.imul(D, Z), i = (i = Math.imul(D, X)) + Math.imul(F, Z) | 0, o = Math.imul(F, X), n = n + Math.imul(M, Q) | 0, i = (i = i + Math.imul(M, ee) | 0) + Math.imul(L, Q) | 0, o = o + Math.imul(L, ee) | 0, n = n + Math.imul(T, re) | 0, i = (i = i + Math.imul(T, ne) | 0) + Math.imul(R, re) | 0, o = o + Math.imul(R, ne) | 0, n = n + Math.imul(_, oe) | 0, i = (i = i + Math.imul(_, se) | 0) + Math.imul(I, oe) | 0, o = o + Math.imul(I, se) | 0, n = n + Math.imul(N, ce) | 0, i = (i = i + Math.imul(N, ue) | 0) + Math.imul(B, ce) | 0, o = o + Math.imul(B, ue) | 0, n = n + Math.imul(E, le) | 0, i = (i = i + Math.imul(E, he) | 0) + Math.imul(k, le) | 0, o = o + Math.imul(k, he) | 0; var Pe = (u + (n = n + Math.imul(w, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(w, ge) | 0) + Math.imul(A, pe) | 0)) << 13) | 0; u = ((o = o + Math.imul(A, ge) | 0) + (i >>> 13) | 0) + (Pe >>> 26) | 0, Pe &= 67108863, n = Math.imul(D, Q), i = (i = Math.imul(D, ee)) + Math.imul(F, Q) | 0, o = Math.imul(F, ee), n = n + Math.imul(M, re) | 0, i = (i = i + Math.imul(M, ne) | 0) + Math.imul(L, re) | 0, o = o + Math.imul(L, ne) | 0, n = n + Math.imul(T, oe) | 0, i = (i = i + Math.imul(T, se) | 0) + Math.imul(R, oe) | 0, o = o + Math.imul(R, se) | 0, n = n + Math.imul(_, ce) | 0, i = (i = i + Math.imul(_, ue) | 0) + Math.imul(I, ce) | 0, o = o + Math.imul(I, ue) | 0, n = n + Math.imul(N, le) | 0, i = (i = i + Math.imul(N, he) | 0) + Math.imul(B, le) | 0, o = o + Math.imul(B, he) | 0; var _e = (u + (n = n + Math.imul(E, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(E, ge) | 0) + Math.imul(k, pe) | 0)) << 13) | 0; u = ((o = o + Math.imul(k, ge) | 0) + (i >>> 13) | 0) + (_e >>> 26) | 0, _e &= 67108863, n = Math.imul(D, re), i = (i = Math.imul(D, ne)) + Math.imul(F, re) | 0, o = Math.imul(F, ne), n = n + Math.imul(M, oe) | 0, i = (i = i + Math.imul(M, se) | 0) + Math.imul(L, oe) | 0, o = o + Math.imul(L, se) | 0, n = n + Math.imul(T, ce) | 0, i = (i = i + Math.imul(T, ue) | 0) + Math.imul(R, ce) | 0, o = o + Math.imul(R, ue) | 0, n = n + Math.imul(_, le) | 0, i = (i = i + Math.imul(_, he) | 0) + Math.imul(I, le) | 0, o = o + Math.imul(I, he) | 0; var Ie = (u + (n = n + Math.imul(N, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(N, ge) | 0) + Math.imul(B, pe) | 0)) << 13) | 0; u = ((o = o + Math.imul(B, ge) | 0) + (i >>> 13) | 0) + (Ie >>> 26) | 0, Ie &= 67108863, n = Math.imul(D, oe), i = (i = Math.imul(D, se)) + Math.imul(F, oe) | 0, o = Math.imul(F, se), n = n + Math.imul(M, ce) | 0, i = (i = i + Math.imul(M, ue) | 0) + Math.imul(L, ce) | 0, o = o + Math.imul(L, ue) | 0, n = n + Math.imul(T, le) | 0, i = (i = i + Math.imul(T, he) | 0) + Math.imul(R, le) | 0, o = o + Math.imul(R, he) | 0; var Oe = (u + (n = n + Math.imul(_, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(_, ge) | 0) + Math.imul(I, pe) | 0)) << 13) | 0; u = ((o = o + Math.imul(I, ge) | 0) + (i >>> 13) | 0) + (Oe >>> 26) | 0, Oe &= 67108863, n = Math.imul(D, ce), i = (i = Math.imul(D, ue)) + Math.imul(F, ce) | 0, o = Math.imul(F, ue), n = n + Math.imul(M, le) | 0, i = (i = i + Math.imul(M, he) | 0) + Math.imul(L, le) | 0, o = o + Math.imul(L, he) | 0; var Te = (u + (n = n + Math.imul(T, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(T, ge) | 0) + Math.imul(R, pe) | 0)) << 13) | 0; u = ((o = o + Math.imul(R, ge) | 0) + (i >>> 13) | 0) + (Te >>> 26) | 0, Te &= 67108863, n = Math.imul(D, le), i = (i = Math.imul(D, he)) + Math.imul(F, le) | 0, o = Math.imul(F, he); var Re = (u + (n = n + Math.imul(M, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(M, ge) | 0) + Math.imul(L, pe) | 0)) << 13) | 0; u = ((o = o + Math.imul(L, ge) | 0) + (i >>> 13) | 0) + (Re >>> 26) | 0, Re &= 67108863; var Ce = (u + (n = Math.imul(D, pe)) | 0) + ((8191 & (i = (i = Math.imul(D, ge)) + Math.imul(F, pe) | 0)) << 13) | 0; return u = ((o = Math.imul(F, ge)) + (i >>> 13) | 0) + (Ce >>> 26) | 0, Ce &= 67108863, c[0] = me, c[1] = ye, c[2] = be, c[3] = ve, c[4] = we, c[5] = Ae, c[6] = Se, c[7] = Ee, c[8] = ke, c[9] = xe, c[10] = Ne, c[11] = Be, c[12] = Pe, c[13] = _e, c[14] = Ie, c[15] = Oe, c[16] = Te, c[17] = Re, c[18] = Ce, 0 !== u && (c[19] = u, r.length++), r; };
        function g(e, t, r) { return (new m).mulp(e, t, r); }
        function m(e, t) { this.x = e, this.y = t; }
        Math.imul || (p = d), o.prototype.mulTo = function (e, t) { var r, n = this.length + e.length; return r = 10 === this.length && 10 === e.length ? p(this, e, t) : n < 63 ? d(this, e, t) : n < 1024 ? function (e, t, r) { r.negative = t.negative ^ e.negative, r.length = e.length + t.length; for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
            var s = i;
            i = 0;
            for (var a = 67108863 & n, c = Math.min(o, t.length - 1), u = Math.max(0, o - e.length + 1); u <= c; u++) {
                var f = o - u, l = (0 | e.words[f]) * (0 | t.words[u]), h = 67108863 & l;
                a = 67108863 & (h = h + a | 0), i += (s = (s = s + (l / 67108864 | 0) | 0) + (h >>> 26) | 0) >>> 26, s &= 67108863;
            }
            r.words[o] = a, n = s, s = i;
        } return 0 !== n ? r.words[o] = n : r.length--, r.strip(); }(this, e, t) : g(this, e, t), r; }, m.prototype.makeRBT = function (e) { for (var t = new Array(e), r = o.prototype._countBits(e) - 1, n = 0; n < e; n++)
            t[n] = this.revBin(n, r, e); return t; }, m.prototype.revBin = function (e, t, r) { if (0 === e || e === r - 1)
            return e; for (var n = 0, i = 0; i < t; i++)
            n |= (1 & e) << t - i - 1, e >>= 1; return n; }, m.prototype.permute = function (e, t, r, n, i, o) { for (var s = 0; s < o; s++)
            n[s] = t[e[s]], i[s] = r[e[s]]; }, m.prototype.transform = function (e, t, r, n, i, o) { this.permute(o, e, t, r, n, i); for (var s = 1; s < i; s <<= 1)
            for (var a = s << 1, c = Math.cos(2 * Math.PI / a), u = Math.sin(2 * Math.PI / a), f = 0; f < i; f += a)
                for (var l = c, h = u, d = 0; d < s; d++) {
                    var p = r[f + d], g = n[f + d], m = r[f + d + s], y = n[f + d + s], b = l * m - h * y;
                    y = l * y + h * m, m = b, r[f + d] = p + m, n[f + d] = g + y, r[f + d + s] = p - m, n[f + d + s] = g - y, d !== a && (b = c * l - u * h, h = c * h + u * l, l = b);
                } }, m.prototype.guessLen13b = function (e, t) { var r = 1 | Math.max(t, e), n = 1 & r, i = 0; for (r = r / 2 | 0; r; r >>>= 1)
            i++; return 1 << i + 1 + n; }, m.prototype.conjugate = function (e, t, r) { if (!(r <= 1))
            for (var n = 0; n < r / 2; n++) {
                var i = e[n];
                e[n] = e[r - n - 1], e[r - n - 1] = i, i = t[n], t[n] = -t[r - n - 1], t[r - n - 1] = -i;
            } }, m.prototype.normalize13b = function (e, t) { for (var r = 0, n = 0; n < t / 2; n++) {
            var i = 8192 * Math.round(e[2 * n + 1] / t) + Math.round(e[2 * n] / t) + r;
            e[n] = 67108863 & i, r = i < 67108864 ? 0 : i / 67108864 | 0;
        } return e; }, m.prototype.convert13b = function (e, t, r, i) { for (var o = 0, s = 0; s < t; s++)
            o += 0 | e[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13; for (s = 2 * t; s < i; ++s)
            r[s] = 0; n(0 === o), n(0 == (-8192 & o)); }, m.prototype.stub = function (e) { for (var t = new Array(e), r = 0; r < e; r++)
            t[r] = 0; return t; }, m.prototype.mulp = function (e, t, r) { var n = 2 * this.guessLen13b(e.length, t.length), i = this.makeRBT(n), o = this.stub(n), s = new Array(n), a = new Array(n), c = new Array(n), u = new Array(n), f = new Array(n), l = new Array(n), h = r.words; h.length = n, this.convert13b(e.words, e.length, s, n), this.convert13b(t.words, t.length, u, n), this.transform(s, o, a, c, n, i), this.transform(u, o, f, l, n, i); for (var d = 0; d < n; d++) {
            var p = a[d] * f[d] - c[d] * l[d];
            c[d] = a[d] * l[d] + c[d] * f[d], a[d] = p;
        } return this.conjugate(a, c, n), this.transform(a, c, h, o, n, i), this.conjugate(h, o, n), this.normalize13b(h, n), r.negative = e.negative ^ t.negative, r.length = e.length + t.length, r.strip(); }, o.prototype.mul = function (e) { var t = new o(null); return t.words = new Array(this.length + e.length), this.mulTo(e, t); }, o.prototype.mulf = function (e) { var t = new o(null); return t.words = new Array(this.length + e.length), g(this, e, t); }, o.prototype.imul = function (e) { return this.clone().mulTo(e, this); }, o.prototype.imuln = function (e) { n("number" == typeof e), n(e < 67108864); for (var t = 0, r = 0; r < this.length; r++) {
            var i = (0 | this.words[r]) * e, o = (67108863 & i) + (67108863 & t);
            t >>= 26, t += i / 67108864 | 0, t += o >>> 26, this.words[r] = 67108863 & o;
        } return 0 !== t && (this.words[r] = t, this.length++), this; }, o.prototype.muln = function (e) { return this.clone().imuln(e); }, o.prototype.sqr = function () { return this.mul(this); }, o.prototype.isqr = function () { return this.imul(this.clone()); }, o.prototype.pow = function (e) { var t = function (e) { for (var t = new Array(e.bitLength()), r = 0; r < t.length; r++) {
            var n = r / 26 | 0, i = r % 26;
            t[r] = (e.words[n] & 1 << i) >>> i;
        } return t; }(e); if (0 === t.length)
            return new o(1); for (var r = this, n = 0; n < t.length && 0 === t[n]; n++, r = r.sqr())
            ; if (++n < t.length)
            for (var i = r.sqr(); n < t.length; n++, i = i.sqr())
                0 !== t[n] && (r = r.mul(i)); return r; }, o.prototype.iushln = function (e) { n("number" == typeof e && e >= 0); var t, r = e % 26, i = (e - r) / 26, o = 67108863 >>> 26 - r << 26 - r; if (0 !== r) {
            var s = 0;
            for (t = 0; t < this.length; t++) {
                var a = this.words[t] & o, c = (0 | this.words[t]) - a << r;
                this.words[t] = c | s, s = a >>> 26 - r;
            }
            s && (this.words[t] = s, this.length++);
        } if (0 !== i) {
            for (t = this.length - 1; t >= 0; t--)
                this.words[t + i] = this.words[t];
            for (t = 0; t < i; t++)
                this.words[t] = 0;
            this.length += i;
        } return this.strip(); }, o.prototype.ishln = function (e) { return n(0 === this.negative), this.iushln(e); }, o.prototype.iushrn = function (e, t, r) { var i; n("number" == typeof e && e >= 0), i = t ? (t - t % 26) / 26 : 0; var o = e % 26, s = Math.min((e - o) / 26, this.length), a = 67108863 ^ 67108863 >>> o << o, c = r; if (i -= s, i = Math.max(0, i), c) {
            for (var u = 0; u < s; u++)
                c.words[u] = this.words[u];
            c.length = s;
        } if (0 === s)
            ;
        else if (this.length > s)
            for (this.length -= s, u = 0; u < this.length; u++)
                this.words[u] = this.words[u + s];
        else
            this.words[0] = 0, this.length = 1; var f = 0; for (u = this.length - 1; u >= 0 && (0 !== f || u >= i); u--) {
            var l = 0 | this.words[u];
            this.words[u] = f << 26 - o | l >>> o, f = l & a;
        } return c && 0 !== f && (c.words[c.length++] = f), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip(); }, o.prototype.ishrn = function (e, t, r) { return n(0 === this.negative), this.iushrn(e, t, r); }, o.prototype.shln = function (e) { return this.clone().ishln(e); }, o.prototype.ushln = function (e) { return this.clone().iushln(e); }, o.prototype.shrn = function (e) { return this.clone().ishrn(e); }, o.prototype.ushrn = function (e) { return this.clone().iushrn(e); }, o.prototype.testn = function (e) { n("number" == typeof e && e >= 0); var t = e % 26, r = (e - t) / 26, i = 1 << t; return !(this.length <= r || !(this.words[r] & i)); }, o.prototype.imaskn = function (e) { n("number" == typeof e && e >= 0); var t = e % 26, r = (e - t) / 26; if (n(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r)
            return this; if (0 !== t && r++, this.length = Math.min(r, this.length), 0 !== t) {
            var i = 67108863 ^ 67108863 >>> t << t;
            this.words[this.length - 1] &= i;
        } return this.strip(); }, o.prototype.maskn = function (e) { return this.clone().imaskn(e); }, o.prototype.iaddn = function (e) { return n("number" == typeof e), n(e < 67108864), e < 0 ? this.isubn(-e) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < e ? (this.words[0] = e - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e); }, o.prototype._iaddn = function (e) { this.words[0] += e; for (var t = 0; t < this.length && this.words[t] >= 67108864; t++)
            this.words[t] -= 67108864, t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++; return this.length = Math.max(this.length, t + 1), this; }, o.prototype.isubn = function (e) { if (n("number" == typeof e), n(e < 67108864), e < 0)
            return this.iaddn(-e); if (0 !== this.negative)
            return this.negative = 0, this.iaddn(e), this.negative = 1, this; if (this.words[0] -= e, 1 === this.length && this.words[0] < 0)
            this.words[0] = -this.words[0], this.negative = 1;
        else
            for (var t = 0; t < this.length && this.words[t] < 0; t++)
                this.words[t] += 67108864, this.words[t + 1] -= 1; return this.strip(); }, o.prototype.addn = function (e) { return this.clone().iaddn(e); }, o.prototype.subn = function (e) { return this.clone().isubn(e); }, o.prototype.iabs = function () { return this.negative = 0, this; }, o.prototype.abs = function () { return this.clone().iabs(); }, o.prototype._ishlnsubmul = function (e, t, r) { var i, o, s = e.length + r; this._expand(s); var a = 0; for (i = 0; i < e.length; i++) {
            o = (0 | this.words[i + r]) + a;
            var c = (0 | e.words[i]) * t;
            a = ((o -= 67108863 & c) >> 26) - (c / 67108864 | 0), this.words[i + r] = 67108863 & o;
        } for (; i < this.length - r; i++)
            a = (o = (0 | this.words[i + r]) + a) >> 26, this.words[i + r] = 67108863 & o; if (0 === a)
            return this.strip(); for (n(-1 === a), a = 0, i = 0; i < this.length; i++)
            a = (o = -(0 | this.words[i]) + a) >> 26, this.words[i] = 67108863 & o; return this.negative = 1, this.strip(); }, o.prototype._wordDiv = function (e, t) { var r = (this.length, e.length), n = this.clone(), i = e, s = 0 | i.words[i.length - 1]; 0 != (r = 26 - this._countBits(s)) && (i = i.ushln(r), n.iushln(r), s = 0 | i.words[i.length - 1]); var a, c = n.length - i.length; if ("mod" !== t) {
            (a = new o(null)).length = c + 1, a.words = new Array(a.length);
            for (var u = 0; u < a.length; u++)
                a.words[u] = 0;
        } var f = n.clone()._ishlnsubmul(i, 1, c); 0 === f.negative && (n = f, a && (a.words[c] = 1)); for (var l = c - 1; l >= 0; l--) {
            var h = 67108864 * (0 | n.words[i.length + l]) + (0 | n.words[i.length + l - 1]);
            for (h = Math.min(h / s | 0, 67108863), n._ishlnsubmul(i, h, l); 0 !== n.negative;)
                h--, n.negative = 0, n._ishlnsubmul(i, 1, l), n.isZero() || (n.negative ^= 1);
            a && (a.words[l] = h);
        } return a && a.strip(), n.strip(), "div" !== t && 0 !== r && n.iushrn(r), { div: a || null, mod: n }; }, o.prototype.divmod = function (e, t, r) { return n(!e.isZero()), this.isZero() ? { div: new o(0), mod: new o(0) } : 0 !== this.negative && 0 === e.negative ? (a = this.neg().divmod(e, t), "mod" !== t && (i = a.div.neg()), "div" !== t && (s = a.mod.neg(), r && 0 !== s.negative && s.iadd(e)), { div: i, mod: s }) : 0 === this.negative && 0 !== e.negative ? (a = this.divmod(e.neg(), t), "mod" !== t && (i = a.div.neg()), { div: i, mod: a.mod }) : 0 != (this.negative & e.negative) ? (a = this.neg().divmod(e.neg(), t), "div" !== t && (s = a.mod.neg(), r && 0 !== s.negative && s.isub(e)), { div: a.div, mod: s }) : e.length > this.length || this.cmp(e) < 0 ? { div: new o(0), mod: this } : 1 === e.length ? "div" === t ? { div: this.divn(e.words[0]), mod: null } : "mod" === t ? { div: null, mod: new o(this.modn(e.words[0])) } : { div: this.divn(e.words[0]), mod: new o(this.modn(e.words[0])) } : this._wordDiv(e, t); var i, s, a; }, o.prototype.div = function (e) { return this.divmod(e, "div", !1).div; }, o.prototype.mod = function (e) { return this.divmod(e, "mod", !1).mod; }, o.prototype.umod = function (e) { return this.divmod(e, "mod", !0).mod; }, o.prototype.divRound = function (e) { var t = this.divmod(e); if (t.mod.isZero())
            return t.div; var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod, n = e.ushrn(1), i = e.andln(1), o = r.cmp(n); return o < 0 || 1 === i && 0 === o ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1); }, o.prototype.modn = function (e) { n(e <= 67108863); for (var t = (1 << 26) % e, r = 0, i = this.length - 1; i >= 0; i--)
            r = (t * r + (0 | this.words[i])) % e; return r; }, o.prototype.idivn = function (e) { n(e <= 67108863); for (var t = 0, r = this.length - 1; r >= 0; r--) {
            var i = (0 | this.words[r]) + 67108864 * t;
            this.words[r] = i / e | 0, t = i % e;
        } return this.strip(); }, o.prototype.divn = function (e) { return this.clone().idivn(e); }, o.prototype.egcd = function (e) { n(0 === e.negative), n(!e.isZero()); var t = this, r = e.clone(); t = 0 !== t.negative ? t.umod(e) : t.clone(); for (var i = new o(1), s = new o(0), a = new o(0), c = new o(1), u = 0; t.isEven() && r.isEven();)
            t.iushrn(1), r.iushrn(1), ++u; for (var f = r.clone(), l = t.clone(); !t.isZero();) {
            for (var h = 0, d = 1; 0 == (t.words[0] & d) && h < 26; ++h, d <<= 1)
                ;
            if (h > 0)
                for (t.iushrn(h); h-- > 0;)
                    (i.isOdd() || s.isOdd()) && (i.iadd(f), s.isub(l)), i.iushrn(1), s.iushrn(1);
            for (var p = 0, g = 1; 0 == (r.words[0] & g) && p < 26; ++p, g <<= 1)
                ;
            if (p > 0)
                for (r.iushrn(p); p-- > 0;)
                    (a.isOdd() || c.isOdd()) && (a.iadd(f), c.isub(l)), a.iushrn(1), c.iushrn(1);
            t.cmp(r) >= 0 ? (t.isub(r), i.isub(a), s.isub(c)) : (r.isub(t), a.isub(i), c.isub(s));
        } return { a: a, b: c, gcd: r.iushln(u) }; }, o.prototype._invmp = function (e) { n(0 === e.negative), n(!e.isZero()); var t = this, r = e.clone(); t = 0 !== t.negative ? t.umod(e) : t.clone(); for (var i, s = new o(1), a = new o(0), c = r.clone(); t.cmpn(1) > 0 && r.cmpn(1) > 0;) {
            for (var u = 0, f = 1; 0 == (t.words[0] & f) && u < 26; ++u, f <<= 1)
                ;
            if (u > 0)
                for (t.iushrn(u); u-- > 0;)
                    s.isOdd() && s.iadd(c), s.iushrn(1);
            for (var l = 0, h = 1; 0 == (r.words[0] & h) && l < 26; ++l, h <<= 1)
                ;
            if (l > 0)
                for (r.iushrn(l); l-- > 0;)
                    a.isOdd() && a.iadd(c), a.iushrn(1);
            t.cmp(r) >= 0 ? (t.isub(r), s.isub(a)) : (r.isub(t), a.isub(s));
        } return (i = 0 === t.cmpn(1) ? s : a).cmpn(0) < 0 && i.iadd(e), i; }, o.prototype.gcd = function (e) { if (this.isZero())
            return e.abs(); if (e.isZero())
            return this.abs(); var t = this.clone(), r = e.clone(); t.negative = 0, r.negative = 0; for (var n = 0; t.isEven() && r.isEven(); n++)
            t.iushrn(1), r.iushrn(1); for (;;) {
            for (; t.isEven();)
                t.iushrn(1);
            for (; r.isEven();)
                r.iushrn(1);
            var i = t.cmp(r);
            if (i < 0) {
                var o = t;
                t = r, r = o;
            }
            else if (0 === i || 0 === r.cmpn(1))
                break;
            t.isub(r);
        } return r.iushln(n); }, o.prototype.invm = function (e) { return this.egcd(e).a.umod(e); }, o.prototype.isEven = function () { return 0 == (1 & this.words[0]); }, o.prototype.isOdd = function () { return 1 == (1 & this.words[0]); }, o.prototype.andln = function (e) { return this.words[0] & e; }, o.prototype.bincn = function (e) { n("number" == typeof e); var t = e % 26, r = (e - t) / 26, i = 1 << t; if (this.length <= r)
            return this._expand(r + 1), this.words[r] |= i, this; for (var o = i, s = r; 0 !== o && s < this.length; s++) {
            var a = 0 | this.words[s];
            o = (a += o) >>> 26, a &= 67108863, this.words[s] = a;
        } return 0 !== o && (this.words[s] = o, this.length++), this; }, o.prototype.isZero = function () { return 1 === this.length && 0 === this.words[0]; }, o.prototype.cmpn = function (e) { var t, r = e < 0; if (0 !== this.negative && !r)
            return -1; if (0 === this.negative && r)
            return 1; if (this.strip(), this.length > 1)
            t = 1;
        else {
            r && (e = -e), n(e <= 67108863, "Number is too big");
            var i = 0 | this.words[0];
            t = i === e ? 0 : i < e ? -1 : 1;
        } return 0 !== this.negative ? 0 | -t : t; }, o.prototype.cmp = function (e) { if (0 !== this.negative && 0 === e.negative)
            return -1; if (0 === this.negative && 0 !== e.negative)
            return 1; var t = this.ucmp(e); return 0 !== this.negative ? 0 | -t : t; }, o.prototype.ucmp = function (e) { if (this.length > e.length)
            return 1; if (this.length < e.length)
            return -1; for (var t = 0, r = this.length - 1; r >= 0; r--) {
            var n = 0 | this.words[r], i = 0 | e.words[r];
            if (n !== i) {
                n < i ? t = -1 : n > i && (t = 1);
                break;
            }
        } return t; }, o.prototype.gtn = function (e) { return 1 === this.cmpn(e); }, o.prototype.gt = function (e) { return 1 === this.cmp(e); }, o.prototype.gten = function (e) { return this.cmpn(e) >= 0; }, o.prototype.gte = function (e) { return this.cmp(e) >= 0; }, o.prototype.ltn = function (e) { return -1 === this.cmpn(e); }, o.prototype.lt = function (e) { return -1 === this.cmp(e); }, o.prototype.lten = function (e) { return this.cmpn(e) <= 0; }, o.prototype.lte = function (e) { return this.cmp(e) <= 0; }, o.prototype.eqn = function (e) { return 0 === this.cmpn(e); }, o.prototype.eq = function (e) { return 0 === this.cmp(e); }, o.red = function (e) { return new E(e); }, o.prototype.toRed = function (e) { return n(!this.red, "Already a number in reduction context"), n(0 === this.negative, "red works only with positives"), e.convertTo(this)._forceRed(e); }, o.prototype.fromRed = function () { return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this); }, o.prototype._forceRed = function (e) { return this.red = e, this; }, o.prototype.forceRed = function (e) { return n(!this.red, "Already a number in reduction context"), this._forceRed(e); }, o.prototype.redAdd = function (e) { return n(this.red, "redAdd works only with red numbers"), this.red.add(this, e); }, o.prototype.redIAdd = function (e) { return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e); }, o.prototype.redSub = function (e) { return n(this.red, "redSub works only with red numbers"), this.red.sub(this, e); }, o.prototype.redISub = function (e) { return n(this.red, "redISub works only with red numbers"), this.red.isub(this, e); }, o.prototype.redShl = function (e) { return n(this.red, "redShl works only with red numbers"), this.red.shl(this, e); }, o.prototype.redMul = function (e) { return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e); }, o.prototype.redIMul = function (e) { return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e); }, o.prototype.redSqr = function () { return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this); }, o.prototype.redISqr = function () { return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this); }, o.prototype.redSqrt = function () { return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this); }, o.prototype.redInvm = function () { return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this); }, o.prototype.redNeg = function () { return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this); }, o.prototype.redPow = function (e) { return n(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e); };
        var y = { k256: null, p224: null, p192: null, p25519: null };
        function b(e, t) { this.name = e, this.p = new o(t, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp(); }
        function v() { b.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"); }
        function w() { b.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"); }
        function A() { b.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"); }
        function S() { b.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"); }
        function E(e) { if ("string" == typeof e) {
            var t = o._prime(e);
            this.m = t.p, this.prime = t;
        }
        else
            n(e.gtn(1), "modulus must be greater than 1"), this.m = e, this.prime = null; }
        function k(e) { E.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv); }
        b.prototype._tmp = function () { var e = new o(null); return e.words = new Array(Math.ceil(this.n / 13)), e; }, b.prototype.ireduce = function (e) { var t, r = e; do {
            this.split(r, this.tmp), t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength();
        } while (t > this.n); var n = t < this.n ? -1 : r.ucmp(this.p); return 0 === n ? (r.words[0] = 0, r.length = 1) : n > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip(), r; }, b.prototype.split = function (e, t) { e.iushrn(this.n, 0, t); }, b.prototype.imulK = function (e) { return e.imul(this.k); }, i(v, b), v.prototype.split = function (e, t) { for (var r = 4194303, n = Math.min(e.length, 9), i = 0; i < n; i++)
            t.words[i] = e.words[i]; if (t.length = n, e.length <= 9)
            return e.words[0] = 0, void (e.length = 1); var o = e.words[9]; for (t.words[t.length++] = o & r, i = 10; i < e.length; i++) {
            var s = 0 | e.words[i];
            e.words[i - 10] = (s & r) << 4 | o >>> 22, o = s;
        } o >>>= 22, e.words[i - 10] = o, 0 === o && e.length > 10 ? e.length -= 10 : e.length -= 9; }, v.prototype.imulK = function (e) { e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2; for (var t = 0, r = 0; r < e.length; r++) {
            var n = 0 | e.words[r];
            t += 977 * n, e.words[r] = 67108863 & t, t = 64 * n + (t / 67108864 | 0);
        } return 0 === e.words[e.length - 1] && (e.length--, 0 === e.words[e.length - 1] && e.length--), e; }, i(w, b), i(A, b), i(S, b), S.prototype.imulK = function (e) { for (var t = 0, r = 0; r < e.length; r++) {
            var n = 19 * (0 | e.words[r]) + t, i = 67108863 & n;
            n >>>= 26, e.words[r] = i, t = n;
        } return 0 !== t && (e.words[e.length++] = t), e; }, o._prime = function (e) { if (y[e])
            return y[e]; var t; if ("k256" === e)
            t = new v;
        else if ("p224" === e)
            t = new w;
        else if ("p192" === e)
            t = new A;
        else {
            if ("p25519" !== e)
                throw new Error("Unknown prime " + e);
            t = new S;
        } return y[e] = t, t; }, E.prototype._verify1 = function (e) { n(0 === e.negative, "red works only with positives"), n(e.red, "red works only with red numbers"); }, E.prototype._verify2 = function (e, t) { n(0 == (e.negative | t.negative), "red works only with positives"), n(e.red && e.red === t.red, "red works only with red numbers"); }, E.prototype.imod = function (e) { return this.prime ? this.prime.ireduce(e)._forceRed(this) : e.umod(this.m)._forceRed(this); }, E.prototype.neg = function (e) { return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this); }, E.prototype.add = function (e, t) { this._verify2(e, t); var r = e.add(t); return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this); }, E.prototype.iadd = function (e, t) { this._verify2(e, t); var r = e.iadd(t); return r.cmp(this.m) >= 0 && r.isub(this.m), r; }, E.prototype.sub = function (e, t) { this._verify2(e, t); var r = e.sub(t); return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this); }, E.prototype.isub = function (e, t) { this._verify2(e, t); var r = e.isub(t); return r.cmpn(0) < 0 && r.iadd(this.m), r; }, E.prototype.shl = function (e, t) { return this._verify1(e), this.imod(e.ushln(t)); }, E.prototype.imul = function (e, t) { return this._verify2(e, t), this.imod(e.imul(t)); }, E.prototype.mul = function (e, t) { return this._verify2(e, t), this.imod(e.mul(t)); }, E.prototype.isqr = function (e) { return this.imul(e, e.clone()); }, E.prototype.sqr = function (e) { return this.mul(e, e); }, E.prototype.sqrt = function (e) { if (e.isZero())
            return e.clone(); var t = this.m.andln(3); if (n(t % 2 == 1), 3 === t) {
            var r = this.m.add(new o(1)).iushrn(2);
            return this.pow(e, r);
        } for (var i = this.m.subn(1), s = 0; !i.isZero() && 0 === i.andln(1);)
            s++, i.iushrn(1); n(!i.isZero()); var a = new o(1).toRed(this), c = a.redNeg(), u = this.m.subn(1).iushrn(1), f = this.m.bitLength(); for (f = new o(2 * f * f).toRed(this); 0 !== this.pow(f, u).cmp(c);)
            f.redIAdd(c); for (var l = this.pow(f, i), h = this.pow(e, i.addn(1).iushrn(1)), d = this.pow(e, i), p = s; 0 !== d.cmp(a);) {
            for (var g = d, m = 0; 0 !== g.cmp(a); m++)
                g = g.redSqr();
            n(m < p);
            var y = this.pow(l, new o(1).iushln(p - m - 1));
            h = h.redMul(y), l = y.redSqr(), d = d.redMul(l), p = m;
        } return h; }, E.prototype.invm = function (e) { var t = e._invmp(this.m); return 0 !== t.negative ? (t.negative = 0, this.imod(t).redNeg()) : this.imod(t); }, E.prototype.pow = function (e, t) { if (t.isZero())
            return new o(1).toRed(this); if (0 === t.cmpn(1))
            return e.clone(); var r = new Array(16); r[0] = new o(1).toRed(this), r[1] = e; for (var n = 2; n < r.length; n++)
            r[n] = this.mul(r[n - 1], e); var i = r[0], s = 0, a = 0, c = t.bitLength() % 26; for (0 === c && (c = 26), n = t.length - 1; n >= 0; n--) {
            for (var u = t.words[n], f = c - 1; f >= 0; f--) {
                var l = u >> f & 1;
                i !== r[0] && (i = this.sqr(i)), 0 !== l || 0 !== s ? (s <<= 1, s |= l, (4 == ++a || 0 === n && 0 === f) && (i = this.mul(i, r[s]), a = 0, s = 0)) : a = 0;
            }
            c = 26;
        } return i; }, E.prototype.convertTo = function (e) { var t = e.umod(this.m); return t === e ? t.clone() : t; }, E.prototype.convertFrom = function (e) { var t = e.clone(); return t.red = null, t; }, o.mont = function (e) { return new k(e); }, i(k, E), k.prototype.convertTo = function (e) { return this.imod(e.ushln(this.shift)); }, k.prototype.convertFrom = function (e) { var t = this.imod(e.mul(this.rinv)); return t.red = null, t; }, k.prototype.imul = function (e, t) { if (e.isZero() || t.isZero())
            return e.words[0] = 0, e.length = 1, e; var r = e.imul(t), n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), i = r.isub(n).iushrn(this.shift), o = i; return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this); }, k.prototype.mul = function (e, t) { if (e.isZero() || t.isZero())
            return new o(0)._forceRed(this); var r = e.mul(t), n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), i = r.isub(n).iushrn(this.shift), s = i; return i.cmp(this.m) >= 0 ? s = i.isub(this.m) : i.cmpn(0) < 0 && (s = i.iadd(this.m)), s._forceRed(this); }, k.prototype.invm = function (e) { return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this); };
    }(e = r.nmd(e), this); }, 9931: function (e, t, r) { var n; function i(e) { this.rand = e; } if (e.exports = function (e) { return n || (n = new i(null)), n.generate(e); }, e.exports.Rand = i, i.prototype.generate = function (e) { return this._rand(e); }, i.prototype._rand = function (e) { if (this.rand.getBytes)
        return this.rand.getBytes(e); for (var t = new Uint8Array(e), r = 0; r < t.length; r++)
        t[r] = this.rand.getByte(); return t; }, "object" == typeof self)
        self.crypto && self.crypto.getRandomValues ? i.prototype._rand = function (e) { var t = new Uint8Array(e); return self.crypto.getRandomValues(t), t; } : self.msCrypto && self.msCrypto.getRandomValues ? i.prototype._rand = function (e) { var t = new Uint8Array(e); return self.msCrypto.getRandomValues(t), t; } : "object" == typeof window && (i.prototype._rand = function () { throw new Error("Not implemented yet"); });
    else
        try {
            var o = r(9214);
            if ("function" != typeof o.randomBytes)
                throw new Error("Not supported");
            i.prototype._rand = function (e) { return o.randomBytes(e); };
        }
        catch (e) { } }, 1924: function (e, t, r) {
        "use strict";
        var n = r(210), i = r(5559), o = i(n("String.prototype.indexOf"));
        e.exports = function (e, t) { var r = n(e, !!t); return "function" == typeof r && o(e, ".prototype.") > -1 ? i(r) : r; };
    }, 5559: function (e, t, r) {
        "use strict";
        var n = r(8612), i = r(210), o = i("%Function.prototype.apply%"), s = i("%Function.prototype.call%"), a = i("%Reflect.apply%", !0) || n.call(s, o), c = i("%Object.getOwnPropertyDescriptor%", !0), u = i("%Object.defineProperty%", !0), f = i("%Math.max%");
        if (u)
            try {
                u({}, "a", { value: 1 });
            }
            catch (e) {
                u = null;
            }
        e.exports = function (e) { var t = a(n, s, arguments); if (c && u) {
            var r = c(t, "length");
            r.configurable && u(t, "length", { value: 1 + f(0, e.length - (arguments.length - 1)) });
        } return t; };
        var l = function () { return a(n, o, arguments); };
        u ? u(e.exports, "apply", { value: l }) : e.exports.apply = l;
    }, 4289: function (e, t, r) {
        "use strict";
        var n = r(2215), i = "function" == typeof Symbol && "symbol" == typeof Symbol("foo"), o = Object.prototype.toString, s = Array.prototype.concat, a = Object.defineProperty, c = a && function () { var e = {}; try {
            for (var t in a(e, "x", { enumerable: !1, value: e }), e)
                return !1;
            return e.x === e;
        }
        catch (e) {
            return !1;
        } }(), u = function (e, t, r, n) { var i; (!(t in e) || "function" == typeof (i = n) && "[object Function]" === o.call(i) && n()) && (c ? a(e, t, { configurable: !0, enumerable: !1, value: r, writable: !0 }) : e[t] = r); }, f = function (e, t) { var r = arguments.length > 2 ? arguments[2] : {}, o = n(t); i && (o = s.call(o, Object.getOwnPropertySymbols(t))); for (var a = 0; a < o.length; a += 1)
            u(e, o[a], t[o[a]], r[o[a]]); };
        f.supportsDescriptors = !!c, e.exports = f;
    }, 6266: function (e, t, r) {
        "use strict";
        var n = t;
        n.version = r(8597).i8, n.utils = r(2987), n.rand = r(9931), n.curve = r(8254), n.curves = r(5427), n.ec = r(7954), n.eddsa = r(5980);
    }, 4918: function (e, t, r) {
        "use strict";
        var n = r(3550), i = r(2987), o = i.getNAF, s = i.getJSF, a = i.assert;
        function c(e, t) { this.type = e, this.p = new n(t.p, 16), this.red = t.prime ? n.red(t.prime) : n.mont(this.p), this.zero = new n(0).toRed(this.red), this.one = new n(1).toRed(this.red), this.two = new n(2).toRed(this.red), this.n = t.n && new n(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0; var r = this.n && this.p.div(this.n); !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red)); }
        function u(e, t) { this.curve = e, this.type = t, this.precomputed = null; }
        e.exports = c, c.prototype.point = function () { throw new Error("Not implemented"); }, c.prototype.validate = function () { throw new Error("Not implemented"); }, c.prototype._fixedNafMul = function (e, t) { a(e.precomputed); var r = e._getDoubles(), n = o(t, 1, this._bitLength), i = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1); i /= 3; var s, c, u = []; for (s = 0; s < n.length; s += r.step) {
            c = 0;
            for (var f = s + r.step - 1; f >= s; f--)
                c = (c << 1) + n[f];
            u.push(c);
        } for (var l = this.jpoint(null, null, null), h = this.jpoint(null, null, null), d = i; d > 0; d--) {
            for (s = 0; s < u.length; s++)
                (c = u[s]) === d ? h = h.mixedAdd(r.points[s]) : c === -d && (h = h.mixedAdd(r.points[s].neg()));
            l = l.add(h);
        } return l.toP(); }, c.prototype._wnafMul = function (e, t) { var r = 4, n = e._getNAFPoints(r); r = n.wnd; for (var i = n.points, s = o(t, r, this._bitLength), c = this.jpoint(null, null, null), u = s.length - 1; u >= 0; u--) {
            for (var f = 0; u >= 0 && 0 === s[u]; u--)
                f++;
            if (u >= 0 && f++, c = c.dblp(f), u < 0)
                break;
            var l = s[u];
            a(0 !== l), c = "affine" === e.type ? l > 0 ? c.mixedAdd(i[l - 1 >> 1]) : c.mixedAdd(i[-l - 1 >> 1].neg()) : l > 0 ? c.add(i[l - 1 >> 1]) : c.add(i[-l - 1 >> 1].neg());
        } return "affine" === e.type ? c.toP() : c; }, c.prototype._wnafMulAdd = function (e, t, r, n, i) { var a, c, u, f = this._wnafT1, l = this._wnafT2, h = this._wnafT3, d = 0; for (a = 0; a < n; a++) {
            var p = (u = t[a])._getNAFPoints(e);
            f[a] = p.wnd, l[a] = p.points;
        } for (a = n - 1; a >= 1; a -= 2) {
            var g = a - 1, m = a;
            if (1 === f[g] && 1 === f[m]) {
                var y = [t[g], null, null, t[m]];
                0 === t[g].y.cmp(t[m].y) ? (y[1] = t[g].add(t[m]), y[2] = t[g].toJ().mixedAdd(t[m].neg())) : 0 === t[g].y.cmp(t[m].y.redNeg()) ? (y[1] = t[g].toJ().mixedAdd(t[m]), y[2] = t[g].add(t[m].neg())) : (y[1] = t[g].toJ().mixedAdd(t[m]), y[2] = t[g].toJ().mixedAdd(t[m].neg()));
                var b = [-3, -1, -5, -7, 0, 7, 5, 1, 3], v = s(r[g], r[m]);
                for (d = Math.max(v[0].length, d), h[g] = new Array(d), h[m] = new Array(d), c = 0; c < d; c++) {
                    var w = 0 | v[0][c], A = 0 | v[1][c];
                    h[g][c] = b[3 * (w + 1) + (A + 1)], h[m][c] = 0, l[g] = y;
                }
            }
            else
                h[g] = o(r[g], f[g], this._bitLength), h[m] = o(r[m], f[m], this._bitLength), d = Math.max(h[g].length, d), d = Math.max(h[m].length, d);
        } var S = this.jpoint(null, null, null), E = this._wnafT4; for (a = d; a >= 0; a--) {
            for (var k = 0; a >= 0;) {
                var x = !0;
                for (c = 0; c < n; c++)
                    E[c] = 0 | h[c][a], 0 !== E[c] && (x = !1);
                if (!x)
                    break;
                k++, a--;
            }
            if (a >= 0 && k++, S = S.dblp(k), a < 0)
                break;
            for (c = 0; c < n; c++) {
                var N = E[c];
                0 !== N && (N > 0 ? u = l[c][N - 1 >> 1] : N < 0 && (u = l[c][-N - 1 >> 1].neg()), S = "affine" === u.type ? S.mixedAdd(u) : S.add(u));
            }
        } for (a = 0; a < n; a++)
            l[a] = null; return i ? S : S.toP(); }, c.BasePoint = u, u.prototype.eq = function () { throw new Error("Not implemented"); }, u.prototype.validate = function () { return this.curve.validate(this); }, c.prototype.decodePoint = function (e, t) { e = i.toArray(e, t); var r = this.p.byteLength(); if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * r)
            return 6 === e[0] ? a(e[e.length - 1] % 2 == 0) : 7 === e[0] && a(e[e.length - 1] % 2 == 1), this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r)); if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r)
            return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]); throw new Error("Unknown point format"); }, u.prototype.encodeCompressed = function (e) { return this.encode(e, !0); }, u.prototype._encode = function (e) { var t = this.curve.p.byteLength(), r = this.getX().toArray("be", t); return e ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", t)); }, u.prototype.encode = function (e, t) { return i.encode(this._encode(t), e); }, u.prototype.precompute = function (e) { if (this.precomputed)
            return this; var t = { doubles: null, naf: null, beta: null }; return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this; }, u.prototype._hasDoubles = function (e) { if (!this.precomputed)
            return !1; var t = this.precomputed.doubles; return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step); }, u.prototype._getDoubles = function (e, t) { if (this.precomputed && this.precomputed.doubles)
            return this.precomputed.doubles; for (var r = [this], n = this, i = 0; i < t; i += e) {
            for (var o = 0; o < e; o++)
                n = n.dbl();
            r.push(n);
        } return { step: e, points: r }; }, u.prototype._getNAFPoints = function (e) { if (this.precomputed && this.precomputed.naf)
            return this.precomputed.naf; for (var t = [this], r = (1 << e) - 1, n = 1 === r ? null : this.dbl(), i = 1; i < r; i++)
            t[i] = t[i - 1].add(n); return { wnd: e, points: t }; }, u.prototype._getBeta = function () { return null; }, u.prototype.dblp = function (e) { for (var t = this, r = 0; r < e; r++)
            t = t.dbl(); return t; };
    }, 1138: function (e, t, r) {
        "use strict";
        var n = r(2987), i = r(3550), o = r(5717), s = r(4918), a = n.assert;
        function c(e) { this.twisted = 1 != (0 | e.a), this.mOneA = this.twisted && -1 == (0 | e.a), this.extended = this.mOneA, s.call(this, "edwards", e), this.a = new i(e.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new i(e.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new i(e.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), a(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | e.c); }
        function u(e, t, r, n, o) { s.BasePoint.call(this, e, "projective"), null === t && null === r && null === n ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new i(t, 16), this.y = new i(r, 16), this.z = n ? new i(n, 16) : this.curve.one, this.t = o && new i(o, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm())))); }
        o(c, s), e.exports = c, c.prototype._mulA = function (e) { return this.mOneA ? e.redNeg() : this.a.redMul(e); }, c.prototype._mulC = function (e) { return this.oneC ? e : this.c.redMul(e); }, c.prototype.jpoint = function (e, t, r, n) { return this.point(e, t, r, n); }, c.prototype.pointFromX = function (e, t) { (e = new i(e, 16)).red || (e = e.toRed(this.red)); var r = e.redSqr(), n = this.c2.redSub(this.a.redMul(r)), o = this.one.redSub(this.c2.redMul(this.d).redMul(r)), s = n.redMul(o.redInvm()), a = s.redSqrt(); if (0 !== a.redSqr().redSub(s).cmp(this.zero))
            throw new Error("invalid point"); var c = a.fromRed().isOdd(); return (t && !c || !t && c) && (a = a.redNeg()), this.point(e, a); }, c.prototype.pointFromY = function (e, t) { (e = new i(e, 16)).red || (e = e.toRed(this.red)); var r = e.redSqr(), n = r.redSub(this.c2), o = r.redMul(this.d).redMul(this.c2).redSub(this.a), s = n.redMul(o.redInvm()); if (0 === s.cmp(this.zero)) {
            if (t)
                throw new Error("invalid point");
            return this.point(this.zero, e);
        } var a = s.redSqrt(); if (0 !== a.redSqr().redSub(s).cmp(this.zero))
            throw new Error("invalid point"); return a.fromRed().isOdd() !== t && (a = a.redNeg()), this.point(a, e); }, c.prototype.validate = function (e) { if (e.isInfinity())
            return !0; e.normalize(); var t = e.x.redSqr(), r = e.y.redSqr(), n = t.redMul(this.a).redAdd(r), i = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(r))); return 0 === n.cmp(i); }, o(u, s.BasePoint), c.prototype.pointFromJSON = function (e) { return u.fromJSON(this, e); }, c.prototype.point = function (e, t, r, n) { return new u(this, e, t, r, n); }, u.fromJSON = function (e, t) { return new u(e, t[0], t[1], t[2]); }, u.prototype.inspect = function () { return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"; }, u.prototype.isInfinity = function () { return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve.c)); }, u.prototype._extDbl = function () { var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(); r = r.redIAdd(r); var n = this.curve._mulA(e), i = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t), o = n.redAdd(t), s = o.redSub(r), a = n.redSub(t), c = i.redMul(s), u = o.redMul(a), f = i.redMul(a), l = s.redMul(o); return this.curve.point(c, u, l, f); }, u.prototype._projDbl = function () { var e, t, r, n, i, o, s = this.x.redAdd(this.y).redSqr(), a = this.x.redSqr(), c = this.y.redSqr(); if (this.curve.twisted) {
            var u = (n = this.curve._mulA(a)).redAdd(c);
            this.zOne ? (e = s.redSub(a).redSub(c).redMul(u.redSub(this.curve.two)), t = u.redMul(n.redSub(c)), r = u.redSqr().redSub(u).redSub(u)) : (i = this.z.redSqr(), o = u.redSub(i).redISub(i), e = s.redSub(a).redISub(c).redMul(o), t = u.redMul(n.redSub(c)), r = u.redMul(o));
        }
        else
            n = a.redAdd(c), i = this.curve._mulC(this.z).redSqr(), o = n.redSub(i).redSub(i), e = this.curve._mulC(s.redISub(n)).redMul(o), t = this.curve._mulC(n).redMul(a.redISub(c)), r = n.redMul(o); return this.curve.point(e, t, r); }, u.prototype.dbl = function () { return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl(); }, u.prototype._extAdd = function (e) { var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)), r = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)), n = this.t.redMul(this.curve.dd).redMul(e.t), i = this.z.redMul(e.z.redAdd(e.z)), o = r.redSub(t), s = i.redSub(n), a = i.redAdd(n), c = r.redAdd(t), u = o.redMul(s), f = a.redMul(c), l = o.redMul(c), h = s.redMul(a); return this.curve.point(u, f, h, l); }, u.prototype._projAdd = function (e) { var t, r, n = this.z.redMul(e.z), i = n.redSqr(), o = this.x.redMul(e.x), s = this.y.redMul(e.y), a = this.curve.d.redMul(o).redMul(s), c = i.redSub(a), u = i.redAdd(a), f = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(o).redISub(s), l = n.redMul(c).redMul(f); return this.curve.twisted ? (t = n.redMul(u).redMul(s.redSub(this.curve._mulA(o))), r = c.redMul(u)) : (t = n.redMul(u).redMul(s.redSub(o)), r = this.curve._mulC(c).redMul(u)), this.curve.point(l, t, r); }, u.prototype.add = function (e) { return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e); }, u.prototype.mul = function (e) { return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e); }, u.prototype.mulAdd = function (e, t, r) { return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !1); }, u.prototype.jmulAdd = function (e, t, r) { return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !0); }, u.prototype.normalize = function () { if (this.zOne)
            return this; var e = this.z.redInvm(); return this.x = this.x.redMul(e), this.y = this.y.redMul(e), this.t && (this.t = this.t.redMul(e)), this.z = this.curve.one, this.zOne = !0, this; }, u.prototype.neg = function () { return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg()); }, u.prototype.getX = function () { return this.normalize(), this.x.fromRed(); }, u.prototype.getY = function () { return this.normalize(), this.y.fromRed(); }, u.prototype.eq = function (e) { return this === e || 0 === this.getX().cmp(e.getX()) && 0 === this.getY().cmp(e.getY()); }, u.prototype.eqXToP = function (e) { var t = e.toRed(this.curve.red).redMul(this.z); if (0 === this.x.cmp(t))
            return !0; for (var r = e.clone(), n = this.curve.redN.redMul(this.z);;) {
            if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)
                return !1;
            if (t.redIAdd(n), 0 === this.x.cmp(t))
                return !0;
        } }, u.prototype.toP = u.prototype.normalize, u.prototype.mixedAdd = u.prototype.add;
    }, 8254: function (e, t, r) {
        "use strict";
        var n = t;
        n.base = r(4918), n.short = r(6673), n.mont = r(2881), n.edwards = r(1138);
    }, 2881: function (e, t, r) {
        "use strict";
        var n = r(3550), i = r(5717), o = r(4918), s = r(2987);
        function a(e) { o.call(this, "mont", e), this.a = new n(e.a, 16).toRed(this.red), this.b = new n(e.b, 16).toRed(this.red), this.i4 = new n(4).toRed(this.red).redInvm(), this.two = new n(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two)); }
        function c(e, t, r) { o.BasePoint.call(this, e, "projective"), null === t && null === r ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new n(t, 16), this.z = new n(r, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red))); }
        i(a, o), e.exports = a, a.prototype.validate = function (e) { var t = e.normalize().x, r = t.redSqr(), n = r.redMul(t).redAdd(r.redMul(this.a)).redAdd(t); return 0 === n.redSqrt().redSqr().cmp(n); }, i(c, o.BasePoint), a.prototype.decodePoint = function (e, t) { return this.point(s.toArray(e, t), 1); }, a.prototype.point = function (e, t) { return new c(this, e, t); }, a.prototype.pointFromJSON = function (e) { return c.fromJSON(this, e); }, c.prototype.precompute = function () { }, c.prototype._encode = function () { return this.getX().toArray("be", this.curve.p.byteLength()); }, c.fromJSON = function (e, t) { return new c(e, t[0], t[1] || e.one); }, c.prototype.inspect = function () { return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"; }, c.prototype.isInfinity = function () { return 0 === this.z.cmpn(0); }, c.prototype.dbl = function () { var e = this.x.redAdd(this.z).redSqr(), t = this.x.redSub(this.z).redSqr(), r = e.redSub(t), n = e.redMul(t), i = r.redMul(t.redAdd(this.curve.a24.redMul(r))); return this.curve.point(n, i); }, c.prototype.add = function () { throw new Error("Not supported on Montgomery curve"); }, c.prototype.diffAdd = function (e, t) { var r = this.x.redAdd(this.z), n = this.x.redSub(this.z), i = e.x.redAdd(e.z), o = e.x.redSub(e.z).redMul(r), s = i.redMul(n), a = t.z.redMul(o.redAdd(s).redSqr()), c = t.x.redMul(o.redISub(s).redSqr()); return this.curve.point(a, c); }, c.prototype.mul = function (e) { for (var t = e.clone(), r = this, n = this.curve.point(null, null), i = []; 0 !== t.cmpn(0); t.iushrn(1))
            i.push(t.andln(1)); for (var o = i.length - 1; o >= 0; o--)
            0 === i[o] ? (r = r.diffAdd(n, this), n = n.dbl()) : (n = r.diffAdd(n, this), r = r.dbl()); return n; }, c.prototype.mulAdd = function () { throw new Error("Not supported on Montgomery curve"); }, c.prototype.jumlAdd = function () { throw new Error("Not supported on Montgomery curve"); }, c.prototype.eq = function (e) { return 0 === this.getX().cmp(e.getX()); }, c.prototype.normalize = function () { return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this; }, c.prototype.getX = function () { return this.normalize(), this.x.fromRed(); };
    }, 6673: function (e, t, r) {
        "use strict";
        var n = r(2987), i = r(3550), o = r(5717), s = r(4918), a = n.assert;
        function c(e) { s.call(this, "short", e), this.a = new i(e.a, 16).toRed(this.red), this.b = new i(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4); }
        function u(e, t, r, n) { s.BasePoint.call(this, e, "affine"), null === t && null === r ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new i(t, 16), this.y = new i(r, 16), n && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1); }
        function f(e, t, r, n) { s.BasePoint.call(this, e, "jacobian"), null === t && null === r && null === n ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new i(0)) : (this.x = new i(t, 16), this.y = new i(r, 16), this.z = new i(n, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one; }
        o(c, s), e.exports = c, c.prototype._getEndomorphism = function (e) { if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
            var t, r;
            if (e.beta)
                t = new i(e.beta, 16).toRed(this.red);
            else {
                var n = this._getEndoRoots(this.p);
                t = (t = n[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red);
            }
            if (e.lambda)
                r = new i(e.lambda, 16);
            else {
                var o = this._getEndoRoots(this.n);
                0 === this.g.mul(o[0]).x.cmp(this.g.x.redMul(t)) ? r = o[0] : (r = o[1], a(0 === this.g.mul(r).x.cmp(this.g.x.redMul(t))));
            }
            return { beta: t, lambda: r, basis: e.basis ? e.basis.map((function (e) { return { a: new i(e.a, 16), b: new i(e.b, 16) }; })) : this._getEndoBasis(r) };
        } }, c.prototype._getEndoRoots = function (e) { var t = e === this.p ? this.red : i.mont(e), r = new i(2).toRed(t).redInvm(), n = r.redNeg(), o = new i(3).toRed(t).redNeg().redSqrt().redMul(r); return [n.redAdd(o).fromRed(), n.redSub(o).fromRed()]; }, c.prototype._getEndoBasis = function (e) { for (var t, r, n, o, s, a, c, u, f, l = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), h = e, d = this.n.clone(), p = new i(1), g = new i(0), m = new i(0), y = new i(1), b = 0; 0 !== h.cmpn(0);) {
            var v = d.div(h);
            u = d.sub(v.mul(h)), f = m.sub(v.mul(p));
            var w = y.sub(v.mul(g));
            if (!n && u.cmp(l) < 0)
                t = c.neg(), r = p, n = u.neg(), o = f;
            else if (n && 2 == ++b)
                break;
            c = u, d = h, h = u, m = p, p = f, y = g, g = w;
        } s = u.neg(), a = f; var A = n.sqr().add(o.sqr()); return s.sqr().add(a.sqr()).cmp(A) >= 0 && (s = t, a = r), n.negative && (n = n.neg(), o = o.neg()), s.negative && (s = s.neg(), a = a.neg()), [{ a: n, b: o }, { a: s, b: a }]; }, c.prototype._endoSplit = function (e) { var t = this.endo.basis, r = t[0], n = t[1], i = n.b.mul(e).divRound(this.n), o = r.b.neg().mul(e).divRound(this.n), s = i.mul(r.a), a = o.mul(n.a), c = i.mul(r.b), u = o.mul(n.b); return { k1: e.sub(s).sub(a), k2: c.add(u).neg() }; }, c.prototype.pointFromX = function (e, t) { (e = new i(e, 16)).red || (e = e.toRed(this.red)); var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), n = r.redSqrt(); if (0 !== n.redSqr().redSub(r).cmp(this.zero))
            throw new Error("invalid point"); var o = n.fromRed().isOdd(); return (t && !o || !t && o) && (n = n.redNeg()), this.point(e, n); }, c.prototype.validate = function (e) { if (e.inf)
            return !0; var t = e.x, r = e.y, n = this.a.redMul(t), i = t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b); return 0 === r.redSqr().redISub(i).cmpn(0); }, c.prototype._endoWnafMulAdd = function (e, t, r) { for (var n = this._endoWnafT1, i = this._endoWnafT2, o = 0; o < e.length; o++) {
            var s = this._endoSplit(t[o]), a = e[o], c = a._getBeta();
            s.k1.negative && (s.k1.ineg(), a = a.neg(!0)), s.k2.negative && (s.k2.ineg(), c = c.neg(!0)), n[2 * o] = a, n[2 * o + 1] = c, i[2 * o] = s.k1, i[2 * o + 1] = s.k2;
        } for (var u = this._wnafMulAdd(1, n, i, 2 * o, r), f = 0; f < 2 * o; f++)
            n[f] = null, i[f] = null; return u; }, o(u, s.BasePoint), c.prototype.point = function (e, t, r) { return new u(this, e, t, r); }, c.prototype.pointFromJSON = function (e, t) { return u.fromJSON(this, e, t); }, u.prototype._getBeta = function () { if (this.curve.endo) {
            var e = this.precomputed;
            if (e && e.beta)
                return e.beta;
            var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
            if (e) {
                var r = this.curve, n = function (e) { return r.point(e.x.redMul(r.endo.beta), e.y); };
                e.beta = t, t.precomputed = { beta: null, naf: e.naf && { wnd: e.naf.wnd, points: e.naf.points.map(n) }, doubles: e.doubles && { step: e.doubles.step, points: e.doubles.points.map(n) } };
            }
            return t;
        } }, u.prototype.toJSON = function () { return this.precomputed ? [this.x, this.y, this.precomputed && { doubles: this.precomputed.doubles && { step: this.precomputed.doubles.step, points: this.precomputed.doubles.points.slice(1) }, naf: this.precomputed.naf && { wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1) } }] : [this.x, this.y]; }, u.fromJSON = function (e, t, r) { "string" == typeof t && (t = JSON.parse(t)); var n = e.point(t[0], t[1], r); if (!t[2])
            return n; function i(t) { return e.point(t[0], t[1], r); } var o = t[2]; return n.precomputed = { beta: null, doubles: o.doubles && { step: o.doubles.step, points: [n].concat(o.doubles.points.map(i)) }, naf: o.naf && { wnd: o.naf.wnd, points: [n].concat(o.naf.points.map(i)) } }, n; }, u.prototype.inspect = function () { return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"; }, u.prototype.isInfinity = function () { return this.inf; }, u.prototype.add = function (e) { if (this.inf)
            return e; if (e.inf)
            return this; if (this.eq(e))
            return this.dbl(); if (this.neg().eq(e))
            return this.curve.point(null, null); if (0 === this.x.cmp(e.x))
            return this.curve.point(null, null); var t = this.y.redSub(e.y); 0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm())); var r = t.redSqr().redISub(this.x).redISub(e.x), n = t.redMul(this.x.redSub(r)).redISub(this.y); return this.curve.point(r, n); }, u.prototype.dbl = function () { if (this.inf)
            return this; var e = this.y.redAdd(this.y); if (0 === e.cmpn(0))
            return this.curve.point(null, null); var t = this.curve.a, r = this.x.redSqr(), n = e.redInvm(), i = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(n), o = i.redSqr().redISub(this.x.redAdd(this.x)), s = i.redMul(this.x.redSub(o)).redISub(this.y); return this.curve.point(o, s); }, u.prototype.getX = function () { return this.x.fromRed(); }, u.prototype.getY = function () { return this.y.fromRed(); }, u.prototype.mul = function (e) { return e = new i(e, 16), this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e); }, u.prototype.mulAdd = function (e, t, r) { var n = [this, t], i = [e, r]; return this.curve.endo ? this.curve._endoWnafMulAdd(n, i) : this.curve._wnafMulAdd(1, n, i, 2); }, u.prototype.jmulAdd = function (e, t, r) { var n = [this, t], i = [e, r]; return this.curve.endo ? this.curve._endoWnafMulAdd(n, i, !0) : this.curve._wnafMulAdd(1, n, i, 2, !0); }, u.prototype.eq = function (e) { return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y)); }, u.prototype.neg = function (e) { if (this.inf)
            return this; var t = this.curve.point(this.x, this.y.redNeg()); if (e && this.precomputed) {
            var r = this.precomputed, n = function (e) { return e.neg(); };
            t.precomputed = { naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(n) }, doubles: r.doubles && { step: r.doubles.step, points: r.doubles.points.map(n) } };
        } return t; }, u.prototype.toJ = function () { return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one); }, o(f, s.BasePoint), c.prototype.jpoint = function (e, t, r) { return new f(this, e, t, r); }, f.prototype.toP = function () { if (this.isInfinity())
            return this.curve.point(null, null); var e = this.z.redInvm(), t = e.redSqr(), r = this.x.redMul(t), n = this.y.redMul(t).redMul(e); return this.curve.point(r, n); }, f.prototype.neg = function () { return this.curve.jpoint(this.x, this.y.redNeg(), this.z); }, f.prototype.add = function (e) { if (this.isInfinity())
            return e; if (e.isInfinity())
            return this; var t = e.z.redSqr(), r = this.z.redSqr(), n = this.x.redMul(t), i = e.x.redMul(r), o = this.y.redMul(t.redMul(e.z)), s = e.y.redMul(r.redMul(this.z)), a = n.redSub(i), c = o.redSub(s); if (0 === a.cmpn(0))
            return 0 !== c.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl(); var u = a.redSqr(), f = u.redMul(a), l = n.redMul(u), h = c.redSqr().redIAdd(f).redISub(l).redISub(l), d = c.redMul(l.redISub(h)).redISub(o.redMul(f)), p = this.z.redMul(e.z).redMul(a); return this.curve.jpoint(h, d, p); }, f.prototype.mixedAdd = function (e) { if (this.isInfinity())
            return e.toJ(); if (e.isInfinity())
            return this; var t = this.z.redSqr(), r = this.x, n = e.x.redMul(t), i = this.y, o = e.y.redMul(t).redMul(this.z), s = r.redSub(n), a = i.redSub(o); if (0 === s.cmpn(0))
            return 0 !== a.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl(); var c = s.redSqr(), u = c.redMul(s), f = r.redMul(c), l = a.redSqr().redIAdd(u).redISub(f).redISub(f), h = a.redMul(f.redISub(l)).redISub(i.redMul(u)), d = this.z.redMul(s); return this.curve.jpoint(l, h, d); }, f.prototype.dblp = function (e) { if (0 === e)
            return this; if (this.isInfinity())
            return this; if (!e)
            return this.dbl(); var t; if (this.curve.zeroA || this.curve.threeA) {
            var r = this;
            for (t = 0; t < e; t++)
                r = r.dbl();
            return r;
        } var n = this.curve.a, i = this.curve.tinv, o = this.x, s = this.y, a = this.z, c = a.redSqr().redSqr(), u = s.redAdd(s); for (t = 0; t < e; t++) {
            var f = o.redSqr(), l = u.redSqr(), h = l.redSqr(), d = f.redAdd(f).redIAdd(f).redIAdd(n.redMul(c)), p = o.redMul(l), g = d.redSqr().redISub(p.redAdd(p)), m = p.redISub(g), y = d.redMul(m);
            y = y.redIAdd(y).redISub(h);
            var b = u.redMul(a);
            t + 1 < e && (c = c.redMul(h)), o = g, a = b, u = y;
        } return this.curve.jpoint(o, u.redMul(i), a); }, f.prototype.dbl = function () { return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl(); }, f.prototype._zeroDbl = function () { var e, t, r; if (this.zOne) {
            var n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), s = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
            s = s.redIAdd(s);
            var a = n.redAdd(n).redIAdd(n), c = a.redSqr().redISub(s).redISub(s), u = o.redIAdd(o);
            u = (u = u.redIAdd(u)).redIAdd(u), e = c, t = a.redMul(s.redISub(c)).redISub(u), r = this.y.redAdd(this.y);
        }
        else {
            var f = this.x.redSqr(), l = this.y.redSqr(), h = l.redSqr(), d = this.x.redAdd(l).redSqr().redISub(f).redISub(h);
            d = d.redIAdd(d);
            var p = f.redAdd(f).redIAdd(f), g = p.redSqr(), m = h.redIAdd(h);
            m = (m = m.redIAdd(m)).redIAdd(m), e = g.redISub(d).redISub(d), t = p.redMul(d.redISub(e)).redISub(m), r = (r = this.y.redMul(this.z)).redIAdd(r);
        } return this.curve.jpoint(e, t, r); }, f.prototype._threeDbl = function () { var e, t, r; if (this.zOne) {
            var n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), s = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
            s = s.redIAdd(s);
            var a = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a), c = a.redSqr().redISub(s).redISub(s);
            e = c;
            var u = o.redIAdd(o);
            u = (u = u.redIAdd(u)).redIAdd(u), t = a.redMul(s.redISub(c)).redISub(u), r = this.y.redAdd(this.y);
        }
        else {
            var f = this.z.redSqr(), l = this.y.redSqr(), h = this.x.redMul(l), d = this.x.redSub(f).redMul(this.x.redAdd(f));
            d = d.redAdd(d).redIAdd(d);
            var p = h.redIAdd(h), g = (p = p.redIAdd(p)).redAdd(p);
            e = d.redSqr().redISub(g), r = this.y.redAdd(this.z).redSqr().redISub(l).redISub(f);
            var m = l.redSqr();
            m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m), t = d.redMul(p.redISub(e)).redISub(m);
        } return this.curve.jpoint(e, t, r); }, f.prototype._dbl = function () { var e = this.curve.a, t = this.x, r = this.y, n = this.z, i = n.redSqr().redSqr(), o = t.redSqr(), s = r.redSqr(), a = o.redAdd(o).redIAdd(o).redIAdd(e.redMul(i)), c = t.redAdd(t), u = (c = c.redIAdd(c)).redMul(s), f = a.redSqr().redISub(u.redAdd(u)), l = u.redISub(f), h = s.redSqr(); h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h); var d = a.redMul(l).redISub(h), p = r.redAdd(r).redMul(n); return this.curve.jpoint(f, d, p); }, f.prototype.trpl = function () { if (!this.curve.zeroA)
            return this.dbl().add(this); var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(), n = t.redSqr(), i = e.redAdd(e).redIAdd(e), o = i.redSqr(), s = this.x.redAdd(t).redSqr().redISub(e).redISub(n), a = (s = (s = (s = s.redIAdd(s)).redAdd(s).redIAdd(s)).redISub(o)).redSqr(), c = n.redIAdd(n); c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c); var u = i.redIAdd(s).redSqr().redISub(o).redISub(a).redISub(c), f = t.redMul(u); f = (f = f.redIAdd(f)).redIAdd(f); var l = this.x.redMul(a).redISub(f); l = (l = l.redIAdd(l)).redIAdd(l); var h = this.y.redMul(u.redMul(c.redISub(u)).redISub(s.redMul(a))); h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h); var d = this.z.redAdd(s).redSqr().redISub(r).redISub(a); return this.curve.jpoint(l, h, d); }, f.prototype.mul = function (e, t) { return e = new i(e, t), this.curve._wnafMul(this, e); }, f.prototype.eq = function (e) { if ("affine" === e.type)
            return this.eq(e.toJ()); if (this === e)
            return !0; var t = this.z.redSqr(), r = e.z.redSqr(); if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))
            return !1; var n = t.redMul(this.z), i = r.redMul(e.z); return 0 === this.y.redMul(i).redISub(e.y.redMul(n)).cmpn(0); }, f.prototype.eqXToP = function (e) { var t = this.z.redSqr(), r = e.toRed(this.curve.red).redMul(t); if (0 === this.x.cmp(r))
            return !0; for (var n = e.clone(), i = this.curve.redN.redMul(t);;) {
            if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)
                return !1;
            if (r.redIAdd(i), 0 === this.x.cmp(r))
                return !0;
        } }, f.prototype.inspect = function () { return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"; }, f.prototype.isInfinity = function () { return 0 === this.z.cmpn(0); };
    }, 5427: function (e, t, r) {
        "use strict";
        var n, i = t, o = r(3715), s = r(8254), a = r(2987).assert;
        function c(e) { "short" === e.type ? this.curve = new s.short(e) : "edwards" === e.type ? this.curve = new s.edwards(e) : this.curve = new s.mont(e), this.g = this.curve.g, this.n = this.curve.n, this.hash = e.hash, a(this.g.validate(), "Invalid curve"), a(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O"); }
        function u(e, t) { Object.defineProperty(i, e, { configurable: !0, enumerable: !0, get: function () { var r = new c(t); return Object.defineProperty(i, e, { configurable: !0, enumerable: !0, value: r }), r; } }); }
        i.PresetCurve = c, u("p192", { type: "short", prime: "p192", p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff", a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc", b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1", n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831", hash: o.sha256, gRed: !1, g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"] }), u("p224", { type: "short", prime: "p224", p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001", a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe", b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4", n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d", hash: o.sha256, gRed: !1, g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"] }), u("p256", { type: "short", prime: null, p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff", a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc", b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b", n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551", hash: o.sha256, gRed: !1, g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"] }), u("p384", { type: "short", prime: null, p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff", a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc", b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef", n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973", hash: o.sha384, gRed: !1, g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"] }), u("p521", { type: "short", prime: null, p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff", a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc", b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00", n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409", hash: o.sha512, gRed: !1, g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"] }), u("curve25519", { type: "mont", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "76d06", b: "1", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: o.sha256, gRed: !1, g: ["9"] }), u("ed25519", { type: "edwards", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "-1", c: "1", d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: o.sha256, gRed: !1, g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"] });
        try {
            n = r(1037);
        }
        catch (e) {
            n = void 0;
        }
        u("secp256k1", { type: "short", prime: "k256", p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f", a: "0", b: "7", n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141", h: "1", hash: o.sha256, beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72", basis: [{ a: "3086d221a7d46bcde86c90e49284eb15", b: "-e4437ed6010e88286f547fa90abfe4c3" }, { a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15" }], gRed: !1, g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", n] });
    }, 7954: function (e, t, r) {
        "use strict";
        var n = r(3550), i = r(2156), o = r(2987), s = r(5427), a = r(9931), c = o.assert, u = r(1251), f = r(611);
        function l(e) { if (!(this instanceof l))
            return new l(e); "string" == typeof e && (c(Object.prototype.hasOwnProperty.call(s, e), "Unknown curve " + e), e = s[e]), e instanceof s.PresetCurve && (e = { curve: e }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash; }
        e.exports = l, l.prototype.keyPair = function (e) { return new u(this, e); }, l.prototype.keyFromPrivate = function (e, t) { return u.fromPrivate(this, e, t); }, l.prototype.keyFromPublic = function (e, t) { return u.fromPublic(this, e, t); }, l.prototype.genKeyPair = function (e) { e || (e = {}); for (var t = new i({ hash: this.hash, pers: e.pers, persEnc: e.persEnc || "utf8", entropy: e.entropy || a(this.hash.hmacStrength), entropyEnc: e.entropy && e.entropyEnc || "utf8", nonce: this.n.toArray() }), r = this.n.byteLength(), o = this.n.sub(new n(2));;) {
            var s = new n(t.generate(r));
            if (!(s.cmp(o) > 0))
                return s.iaddn(1), this.keyFromPrivate(s);
        } }, l.prototype._truncateToN = function (e, t) { var r = 8 * e.byteLength() - this.n.bitLength(); return r > 0 && (e = e.ushrn(r)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e; }, l.prototype.sign = function (e, t, r, o) { "object" == typeof r && (o = r, r = null), o || (o = {}), t = this.keyFromPrivate(t, r), e = this._truncateToN(new n(e, 16)); for (var s = this.n.byteLength(), a = t.getPrivate().toArray("be", s), c = e.toArray("be", s), u = new i({ hash: this.hash, entropy: a, nonce: c, pers: o.pers, persEnc: o.persEnc || "utf8" }), l = this.n.sub(new n(1)), h = 0;; h++) {
            var d = o.k ? o.k(h) : new n(u.generate(this.n.byteLength()));
            if (!((d = this._truncateToN(d, !0)).cmpn(1) <= 0 || d.cmp(l) >= 0)) {
                var p = this.g.mul(d);
                if (!p.isInfinity()) {
                    var g = p.getX(), m = g.umod(this.n);
                    if (0 !== m.cmpn(0)) {
                        var y = d.invm(this.n).mul(m.mul(t.getPrivate()).iadd(e));
                        if (0 !== (y = y.umod(this.n)).cmpn(0)) {
                            var b = (p.getY().isOdd() ? 1 : 0) | (0 !== g.cmp(m) ? 2 : 0);
                            return o.canonical && y.cmp(this.nh) > 0 && (y = this.n.sub(y), b ^= 1), new f({ r: m, s: y, recoveryParam: b });
                        }
                    }
                }
            }
        } }, l.prototype.verify = function (e, t, r, i) { e = this._truncateToN(new n(e, 16)), r = this.keyFromPublic(r, i); var o = (t = new f(t, "hex")).r, s = t.s; if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0)
            return !1; if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
            return !1; var a, c = s.invm(this.n), u = c.mul(e).umod(this.n), l = c.mul(o).umod(this.n); return this.curve._maxwellTrick ? !(a = this.g.jmulAdd(u, r.getPublic(), l)).isInfinity() && a.eqXToP(o) : !(a = this.g.mulAdd(u, r.getPublic(), l)).isInfinity() && 0 === a.getX().umod(this.n).cmp(o); }, l.prototype.recoverPubKey = function (e, t, r, i) { c((3 & r) === r, "The recovery param is more than two bits"), t = new f(t, i); var o = this.n, s = new n(e), a = t.r, u = t.s, l = 1 & r, h = r >> 1; if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && h)
            throw new Error("Unable to find sencond key candinate"); a = h ? this.curve.pointFromX(a.add(this.curve.n), l) : this.curve.pointFromX(a, l); var d = t.r.invm(o), p = o.sub(s).mul(d).umod(o), g = u.mul(d).umod(o); return this.g.mulAdd(p, a, g); }, l.prototype.getKeyRecoveryParam = function (e, t, r, n) { if (null !== (t = new f(t, n)).recoveryParam)
            return t.recoveryParam; for (var i = 0; i < 4; i++) {
            var o;
            try {
                o = this.recoverPubKey(e, t, i);
            }
            catch (e) {
                continue;
            }
            if (o.eq(r))
                return i;
        } throw new Error("Unable to find valid recovery factor"); };
    }, 1251: function (e, t, r) {
        "use strict";
        var n = r(3550), i = r(2987).assert;
        function o(e, t) { this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc); }
        e.exports = o, o.fromPublic = function (e, t, r) { return t instanceof o ? t : new o(e, { pub: t, pubEnc: r }); }, o.fromPrivate = function (e, t, r) { return t instanceof o ? t : new o(e, { priv: t, privEnc: r }); }, o.prototype.validate = function () { var e = this.getPublic(); return e.isInfinity() ? { result: !1, reason: "Invalid public key" } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" }; }, o.prototype.getPublic = function (e, t) { return "string" == typeof e && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub; }, o.prototype.getPrivate = function (e) { return "hex" === e ? this.priv.toString(16, 2) : this.priv; }, o.prototype._importPrivate = function (e, t) { this.priv = new n(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n); }, o.prototype._importPublic = function (e, t) { if (e.x || e.y)
            return "mont" === this.ec.curve.type ? i(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || i(e.x && e.y, "Need both x and y coordinate"), void (this.pub = this.ec.curve.point(e.x, e.y)); this.pub = this.ec.curve.decodePoint(e, t); }, o.prototype.derive = function (e) { return e.validate() || i(e.validate(), "public point not validated"), e.mul(this.priv).getX(); }, o.prototype.sign = function (e, t, r) { return this.ec.sign(e, this, t, r); }, o.prototype.verify = function (e, t) { return this.ec.verify(e, t, this); }, o.prototype.inspect = function () { return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"; };
    }, 611: function (e, t, r) {
        "use strict";
        var n = r(3550), i = r(2987), o = i.assert;
        function s(e, t) { if (e instanceof s)
            return e; this._importDER(e, t) || (o(e.r && e.s, "Signature without r or s"), this.r = new n(e.r, 16), this.s = new n(e.s, 16), void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam); }
        function a() { this.place = 0; }
        function c(e, t) { var r = e[t.place++]; if (!(128 & r))
            return r; var n = 15 & r; if (0 === n || n > 4)
            return !1; for (var i = 0, o = 0, s = t.place; o < n; o++, s++)
            i <<= 8, i |= e[s], i >>>= 0; return !(i <= 127) && (t.place = s, i); }
        function u(e) { for (var t = 0, r = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < r;)
            t++; return 0 === t ? e : e.slice(t); }
        function f(e, t) { if (t < 128)
            e.push(t);
        else {
            var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
            for (e.push(128 | r); --r;)
                e.push(t >>> (r << 3) & 255);
            e.push(t);
        } }
        e.exports = s, s.prototype._importDER = function (e, t) { e = i.toArray(e, t); var r = new a; if (48 !== e[r.place++])
            return !1; var o = c(e, r); if (!1 === o)
            return !1; if (o + r.place !== e.length)
            return !1; if (2 !== e[r.place++])
            return !1; var s = c(e, r); if (!1 === s)
            return !1; var u = e.slice(r.place, s + r.place); if (r.place += s, 2 !== e[r.place++])
            return !1; var f = c(e, r); if (!1 === f)
            return !1; if (e.length !== f + r.place)
            return !1; var l = e.slice(r.place, f + r.place); if (0 === u[0]) {
            if (!(128 & u[1]))
                return !1;
            u = u.slice(1);
        } if (0 === l[0]) {
            if (!(128 & l[1]))
                return !1;
            l = l.slice(1);
        } return this.r = new n(u), this.s = new n(l), this.recoveryParam = null, !0; }, s.prototype.toDER = function (e) { var t = this.r.toArray(), r = this.s.toArray(); for (128 & t[0] && (t = [0].concat(t)), 128 & r[0] && (r = [0].concat(r)), t = u(t), r = u(r); !(r[0] || 128 & r[1]);)
            r = r.slice(1); var n = [2]; f(n, t.length), (n = n.concat(t)).push(2), f(n, r.length); var o = n.concat(r), s = [48]; return f(s, o.length), s = s.concat(o), i.encode(s, e); };
    }, 5980: function (e, t, r) {
        "use strict";
        var n = r(3715), i = r(5427), o = r(2987), s = o.assert, a = o.parseBytes, c = r(9087), u = r(3622);
        function f(e) { if (s("ed25519" === e, "only tested with ed25519 so far"), !(this instanceof f))
            return new f(e); e = i[e].curve, this.curve = e, this.g = e.g, this.g.precompute(e.n.bitLength() + 1), this.pointClass = e.point().constructor, this.encodingLength = Math.ceil(e.n.bitLength() / 8), this.hash = n.sha512; }
        e.exports = f, f.prototype.sign = function (e, t) { e = a(e); var r = this.keyFromSecret(t), n = this.hashInt(r.messagePrefix(), e), i = this.g.mul(n), o = this.encodePoint(i), s = this.hashInt(o, r.pubBytes(), e).mul(r.priv()), c = n.add(s).umod(this.curve.n); return this.makeSignature({ R: i, S: c, Rencoded: o }); }, f.prototype.verify = function (e, t, r) { e = a(e), t = this.makeSignature(t); var n = this.keyFromPublic(r), i = this.hashInt(t.Rencoded(), n.pubBytes(), e), o = this.g.mul(t.S()); return t.R().add(n.pub().mul(i)).eq(o); }, f.prototype.hashInt = function () { for (var e = this.hash(), t = 0; t < arguments.length; t++)
            e.update(arguments[t]); return o.intFromLE(e.digest()).umod(this.curve.n); }, f.prototype.keyFromPublic = function (e) { return c.fromPublic(this, e); }, f.prototype.keyFromSecret = function (e) { return c.fromSecret(this, e); }, f.prototype.makeSignature = function (e) { return e instanceof u ? e : new u(this, e); }, f.prototype.encodePoint = function (e) { var t = e.getY().toArray("le", this.encodingLength); return t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0, t; }, f.prototype.decodePoint = function (e) { var t = (e = o.parseBytes(e)).length - 1, r = e.slice(0, t).concat(-129 & e[t]), n = 0 != (128 & e[t]), i = o.intFromLE(r); return this.curve.pointFromY(i, n); }, f.prototype.encodeInt = function (e) { return e.toArray("le", this.encodingLength); }, f.prototype.decodeInt = function (e) { return o.intFromLE(e); }, f.prototype.isPoint = function (e) { return e instanceof this.pointClass; };
    }, 9087: function (e, t, r) {
        "use strict";
        var n = r(2987), i = n.assert, o = n.parseBytes, s = n.cachedProperty;
        function a(e, t) { this.eddsa = e, this._secret = o(t.secret), e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = o(t.pub); }
        a.fromPublic = function (e, t) { return t instanceof a ? t : new a(e, { pub: t }); }, a.fromSecret = function (e, t) { return t instanceof a ? t : new a(e, { secret: t }); }, a.prototype.secret = function () { return this._secret; }, s(a, "pubBytes", (function () { return this.eddsa.encodePoint(this.pub()); })), s(a, "pub", (function () { return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv()); })), s(a, "privBytes", (function () { var e = this.eddsa, t = this.hash(), r = e.encodingLength - 1, n = t.slice(0, e.encodingLength); return n[0] &= 248, n[r] &= 127, n[r] |= 64, n; })), s(a, "priv", (function () { return this.eddsa.decodeInt(this.privBytes()); })), s(a, "hash", (function () { return this.eddsa.hash().update(this.secret()).digest(); })), s(a, "messagePrefix", (function () { return this.hash().slice(this.eddsa.encodingLength); })), a.prototype.sign = function (e) { return i(this._secret, "KeyPair can only verify"), this.eddsa.sign(e, this); }, a.prototype.verify = function (e, t) { return this.eddsa.verify(e, t, this); }, a.prototype.getSecret = function (e) { return i(this._secret, "KeyPair is public only"), n.encode(this.secret(), e); }, a.prototype.getPublic = function (e) { return n.encode(this.pubBytes(), e); }, e.exports = a;
    }, 3622: function (e, t, r) {
        "use strict";
        var n = r(3550), i = r(2987), o = i.assert, s = i.cachedProperty, a = i.parseBytes;
        function c(e, t) { this.eddsa = e, "object" != typeof t && (t = a(t)), Array.isArray(t) && (t = { R: t.slice(0, e.encodingLength), S: t.slice(e.encodingLength) }), o(t.R && t.S, "Signature without R or S"), e.isPoint(t.R) && (this._R = t.R), t.S instanceof n && (this._S = t.S), this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded, this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded; }
        s(c, "S", (function () { return this.eddsa.decodeInt(this.Sencoded()); })), s(c, "R", (function () { return this.eddsa.decodePoint(this.Rencoded()); })), s(c, "Rencoded", (function () { return this.eddsa.encodePoint(this.R()); })), s(c, "Sencoded", (function () { return this.eddsa.encodeInt(this.S()); })), c.prototype.toBytes = function () { return this.Rencoded().concat(this.Sencoded()); }, c.prototype.toHex = function () { return i.encode(this.toBytes(), "hex").toUpperCase(); }, e.exports = c;
    }, 1037: function (e) { e.exports = { doubles: { step: 4, points: [["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"], ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"], ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"], ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"], ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"], ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"], ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"], ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"], ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"], ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"], ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"], ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"], ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"], ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"], ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"], ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"], ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"], ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"], ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"], ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"], ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"], ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"], ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"], ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"], ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"], ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"], ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"], ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"], ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"], ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"], ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"], ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"], ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"], ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"], ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"], ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"], ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"], ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"], ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"], ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"], ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"], ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"], ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"], ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"], ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"], ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"], ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"], ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"], ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"], ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"], ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"], ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"], ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"], ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"], ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"], ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"], ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"], ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"], ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"], ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"], ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"], ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"], ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"], ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"], ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]] }, naf: { wnd: 7, points: [["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"], ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"], ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"], ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"], ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"], ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"], ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"], ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"], ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"], ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"], ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"], ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"], ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"], ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"], ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"], ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"], ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"], ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"], ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"], ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"], ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"], ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"], ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"], ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"], ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"], ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"], ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"], ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"], ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"], ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"], ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"], ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"], ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"], ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"], ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"], ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"], ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"], ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"], ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"], ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"], ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"], ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"], ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"], ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"], ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"], ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"], ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"], ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"], ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"], ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"], ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"], ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"], ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"], ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"], ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"], ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"], ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"], ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"], ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"], ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"], ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"], ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"], ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"], ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"], ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"], ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"], ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"], ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"], ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"], ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"], ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"], ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"], ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"], ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"], ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"], ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"], ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"], ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"], ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"], ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"], ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"], ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"], ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"], ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"], ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"], ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"], ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"], ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"], ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"], ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"], ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"], ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"], ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"], ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"], ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"], ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"], ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"], ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"], ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"], ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"], ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"], ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"], ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"], ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"], ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"], ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"], ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"], ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"], ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"], ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"], ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"], ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"], ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"], ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"], ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"], ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"], ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"], ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"], ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"], ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"], ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"], ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"], ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"], ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"], ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"], ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"], ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]] } }; }, 2987: function (e, t, r) {
        "use strict";
        var n = t, i = r(3550), o = r(9746), s = r(4504);
        n.assert = o, n.toArray = s.toArray, n.zero2 = s.zero2, n.toHex = s.toHex, n.encode = s.encode, n.getNAF = function (e, t, r) { var n = new Array(Math.max(e.bitLength(), r) + 1); n.fill(0); for (var i = 1 << t + 1, o = e.clone(), s = 0; s < n.length; s++) {
            var a, c = o.andln(i - 1);
            o.isOdd() ? (a = c > (i >> 1) - 1 ? (i >> 1) - c : c, o.isubn(a)) : a = 0, n[s] = a, o.iushrn(1);
        } return n; }, n.getJSF = function (e, t) { var r = [[], []]; e = e.clone(), t = t.clone(); for (var n, i = 0, o = 0; e.cmpn(-i) > 0 || t.cmpn(-o) > 0;) {
            var s, a, c = e.andln(3) + i & 3, u = t.andln(3) + o & 3;
            3 === c && (c = -1), 3 === u && (u = -1), s = 0 == (1 & c) ? 0 : 3 != (n = e.andln(7) + i & 7) && 5 !== n || 2 !== u ? c : -c, r[0].push(s), a = 0 == (1 & u) ? 0 : 3 != (n = t.andln(7) + o & 7) && 5 !== n || 2 !== c ? u : -u, r[1].push(a), 2 * i === s + 1 && (i = 1 - i), 2 * o === a + 1 && (o = 1 - o), e.iushrn(1), t.iushrn(1);
        } return r; }, n.cachedProperty = function (e, t, r) { var n = "_" + t; e.prototype[t] = function () { return void 0 !== this[n] ? this[n] : this[n] = r.call(this); }; }, n.parseBytes = function (e) { return "string" == typeof e ? n.toArray(e, "hex") : e; }, n.intFromLE = function (e) { return new i(e, "hex", "le"); };
    }, 1503: function (e, t, r) {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator, i = r(4149), o = r(5320), s = r(8923), a = r(2636), c = function (e, t) { if (null == e)
            throw new TypeError("Cannot call method on " + e); if ("string" != typeof t || "number" !== t && "string" !== t)
            throw new TypeError('hint must be "string" or "number"'); var r, n, s, a = "string" === t ? ["toString", "valueOf"] : ["valueOf", "toString"]; for (s = 0; s < a.length; ++s)
            if (r = e[a[s]], o(r) && (n = r.call(e), i(n)))
                return n; throw new TypeError("No default value"); }, u = function (e, t) { var r = e[t]; if (null != r) {
            if (!o(r))
                throw new TypeError(r + " returned for property " + t + " of object " + e + " is not a function");
            return r;
        } };
        e.exports = function (e) { if (i(e))
            return e; var t, r = "default"; if (arguments.length > 1 && (arguments[1] === String ? r = "string" : arguments[1] === Number && (r = "number")), n && (Symbol.toPrimitive ? t = u(e, Symbol.toPrimitive) : a(e) && (t = Symbol.prototype.valueOf)), void 0 !== t) {
            var o = t.call(e, r);
            if (i(o))
                return o;
            throw new TypeError("unable to convert exotic object to primitive");
        } return "default" === r && (s(e) || a(e)) && (r = "string"), c(e, "default" === r ? "number" : r); };
    }, 2116: function (e, t, r) {
        "use strict";
        var n = Object.prototype.toString, i = r(4149), o = r(5320), s = function (e) { var t; if ((t = arguments.length > 1 ? arguments[1] : "[object Date]" === n.call(e) ? String : Number) === String || t === Number) {
            var r, s, a = t === String ? ["toString", "valueOf"] : ["valueOf", "toString"];
            for (s = 0; s < a.length; ++s)
                if (o(e[a[s]]) && (r = e[a[s]](), i(r)))
                    return r;
            throw new TypeError("No default value");
        } throw new TypeError("invalid [[DefaultValue]] hint supplied"); };
        e.exports = function (e) { return i(e) ? e : arguments.length > 1 ? s(e, arguments[1]) : s(e); };
    }, 4149: function (e) {
        "use strict";
        e.exports = function (e) { return null === e || "function" != typeof e && "object" != typeof e; };
    }, 6371: function (e, t, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function (e, t, r, n) { void 0 === n && (n = r), Object.defineProperty(e, n, { enumerable: !0, get: function () { return t[r]; } }); } : function (e, t, r, n) { void 0 === n && (n = r), e[n] = t[r]; }), i = this && this.__setModuleDefault || (Object.create ? function (e, t) { Object.defineProperty(e, "default", { enumerable: !0, value: t }); } : function (e, t) { e.default = t; }), o = this && this.__importStar || function (e) { if (e && e.__esModule)
            return e; var t = {}; if (null != e)
            for (var r in e)
                "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && n(t, e, r); return i(t, e), t; };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.formatBytes32String = t.Utf8ErrorFuncs = t.toUtf8String = t.toUtf8CodePoints = t.toUtf8Bytes = t._toEscapedUtf8String = t.nameprep = t.hexDataSlice = t.hexDataLength = t.hexZeroPad = t.hexValue = t.hexStripZeros = t.hexConcat = t.isHexString = t.hexlify = t.base64 = t.base58 = t.TransactionDescription = t.LogDescription = t.Interface = t.SigningKey = t.HDNode = t.defaultPath = t.isBytesLike = t.isBytes = t.zeroPad = t.stripZeros = t.concat = t.arrayify = t.shallowCopy = t.resolveProperties = t.getStatic = t.defineReadOnly = t.deepCopy = t.checkProperties = t.poll = t.fetchJson = t._fetchData = t.RLP = t.Logger = t.checkResultErrors = t.FormatTypes = t.ParamType = t.FunctionFragment = t.EventFragment = t.ErrorFragment = t.ConstructorFragment = t.Fragment = t.defaultAbiCoder = t.AbiCoder = void 0, t.Indexed = t.Utf8ErrorReason = t.UnicodeNormalizationForm = t.SupportedAlgorithm = t.mnemonicToSeed = t.isValidMnemonic = t.entropyToMnemonic = t.mnemonicToEntropy = t.getAccountPath = t.verifyTypedData = t.verifyMessage = t.recoverPublicKey = t.computePublicKey = t.recoverAddress = t.computeAddress = t.getJsonWalletAddress = t.TransactionTypes = t.serializeTransaction = t.parseTransaction = t.accessListify = t.joinSignature = t.splitSignature = t.soliditySha256 = t.solidityKeccak256 = t.solidityPack = t.shuffled = t.randomBytes = t.sha512 = t.sha256 = t.ripemd160 = t.keccak256 = t.computeHmac = t.commify = t.parseUnits = t.formatUnits = t.parseEther = t.formatEther = t.isAddress = t.getCreate2Address = t.getContractAddress = t.getIcapAddress = t.getAddress = t._TypedDataEncoder = t.id = t.isValidName = t.namehash = t.hashMessage = t.parseBytes32String = void 0;
        var s = r(3900);
        Object.defineProperty(t, "AbiCoder", { enumerable: !0, get: function () { return s.AbiCoder; } }), Object.defineProperty(t, "checkResultErrors", { enumerable: !0, get: function () { return s.checkResultErrors; } }), Object.defineProperty(t, "ConstructorFragment", { enumerable: !0, get: function () { return s.ConstructorFragment; } }), Object.defineProperty(t, "defaultAbiCoder", { enumerable: !0, get: function () { return s.defaultAbiCoder; } }), Object.defineProperty(t, "ErrorFragment", { enumerable: !0, get: function () { return s.ErrorFragment; } }), Object.defineProperty(t, "EventFragment", { enumerable: !0, get: function () { return s.EventFragment; } }), Object.defineProperty(t, "FormatTypes", { enumerable: !0, get: function () { return s.FormatTypes; } }), Object.defineProperty(t, "Fragment", { enumerable: !0, get: function () { return s.Fragment; } }), Object.defineProperty(t, "FunctionFragment", { enumerable: !0, get: function () { return s.FunctionFragment; } }), Object.defineProperty(t, "Indexed", { enumerable: !0, get: function () { return s.Indexed; } }), Object.defineProperty(t, "Interface", { enumerable: !0, get: function () { return s.Interface; } }), Object.defineProperty(t, "LogDescription", { enumerable: !0, get: function () { return s.LogDescription; } }), Object.defineProperty(t, "ParamType", { enumerable: !0, get: function () { return s.ParamType; } }), Object.defineProperty(t, "TransactionDescription", { enumerable: !0, get: function () { return s.TransactionDescription; } });
        var a = r(4594);
        Object.defineProperty(t, "getAddress", { enumerable: !0, get: function () { return a.getAddress; } }), Object.defineProperty(t, "getCreate2Address", { enumerable: !0, get: function () { return a.getCreate2Address; } }), Object.defineProperty(t, "getContractAddress", { enumerable: !0, get: function () { return a.getContractAddress; } }), Object.defineProperty(t, "getIcapAddress", { enumerable: !0, get: function () { return a.getIcapAddress; } }), Object.defineProperty(t, "isAddress", { enumerable: !0, get: function () { return a.isAddress; } });
        var c = o(r(4089));
        t.base64 = c;
        var u = r(7727);
        Object.defineProperty(t, "base58", { enumerable: !0, get: function () { return u.Base58; } });
        var f = r(3286);
        Object.defineProperty(t, "arrayify", { enumerable: !0, get: function () { return f.arrayify; } }), Object.defineProperty(t, "concat", { enumerable: !0, get: function () { return f.concat; } }), Object.defineProperty(t, "hexConcat", { enumerable: !0, get: function () { return f.hexConcat; } }), Object.defineProperty(t, "hexDataSlice", { enumerable: !0, get: function () { return f.hexDataSlice; } }), Object.defineProperty(t, "hexDataLength", { enumerable: !0, get: function () { return f.hexDataLength; } }), Object.defineProperty(t, "hexlify", { enumerable: !0, get: function () { return f.hexlify; } }), Object.defineProperty(t, "hexStripZeros", { enumerable: !0, get: function () { return f.hexStripZeros; } }), Object.defineProperty(t, "hexValue", { enumerable: !0, get: function () { return f.hexValue; } }), Object.defineProperty(t, "hexZeroPad", { enumerable: !0, get: function () { return f.hexZeroPad; } }), Object.defineProperty(t, "isBytes", { enumerable: !0, get: function () { return f.isBytes; } }), Object.defineProperty(t, "isBytesLike", { enumerable: !0, get: function () { return f.isBytesLike; } }), Object.defineProperty(t, "isHexString", { enumerable: !0, get: function () { return f.isHexString; } }), Object.defineProperty(t, "joinSignature", { enumerable: !0, get: function () { return f.joinSignature; } }), Object.defineProperty(t, "zeroPad", { enumerable: !0, get: function () { return f.zeroPad; } }), Object.defineProperty(t, "splitSignature", { enumerable: !0, get: function () { return f.splitSignature; } }), Object.defineProperty(t, "stripZeros", { enumerable: !0, get: function () { return f.stripZeros; } });
        var l = r(5931);
        Object.defineProperty(t, "_TypedDataEncoder", { enumerable: !0, get: function () { return l._TypedDataEncoder; } }), Object.defineProperty(t, "hashMessage", { enumerable: !0, get: function () { return l.hashMessage; } }), Object.defineProperty(t, "id", { enumerable: !0, get: function () { return l.id; } }), Object.defineProperty(t, "isValidName", { enumerable: !0, get: function () { return l.isValidName; } }), Object.defineProperty(t, "namehash", { enumerable: !0, get: function () { return l.namehash; } });
        var h = r(4692);
        Object.defineProperty(t, "defaultPath", { enumerable: !0, get: function () { return h.defaultPath; } }), Object.defineProperty(t, "entropyToMnemonic", { enumerable: !0, get: function () { return h.entropyToMnemonic; } }), Object.defineProperty(t, "getAccountPath", { enumerable: !0, get: function () { return h.getAccountPath; } }), Object.defineProperty(t, "HDNode", { enumerable: !0, get: function () { return h.HDNode; } }), Object.defineProperty(t, "isValidMnemonic", { enumerable: !0, get: function () { return h.isValidMnemonic; } }), Object.defineProperty(t, "mnemonicToEntropy", { enumerable: !0, get: function () { return h.mnemonicToEntropy; } }), Object.defineProperty(t, "mnemonicToSeed", { enumerable: !0, get: function () { return h.mnemonicToSeed; } });
        var d = r(6883);
        Object.defineProperty(t, "getJsonWalletAddress", { enumerable: !0, get: function () { return d.getJsonWalletAddress; } });
        var p = r(8197);
        Object.defineProperty(t, "keccak256", { enumerable: !0, get: function () { return p.keccak256; } });
        var g = r(711);
        Object.defineProperty(t, "Logger", { enumerable: !0, get: function () { return g.Logger; } });
        var m = r(1278);
        Object.defineProperty(t, "computeHmac", { enumerable: !0, get: function () { return m.computeHmac; } }), Object.defineProperty(t, "ripemd160", { enumerable: !0, get: function () { return m.ripemd160; } }), Object.defineProperty(t, "sha256", { enumerable: !0, get: function () { return m.sha256; } }), Object.defineProperty(t, "sha512", { enumerable: !0, get: function () { return m.sha512; } });
        var y = r(3777);
        Object.defineProperty(t, "solidityKeccak256", { enumerable: !0, get: function () { return y.keccak256; } }), Object.defineProperty(t, "solidityPack", { enumerable: !0, get: function () { return y.pack; } }), Object.defineProperty(t, "soliditySha256", { enumerable: !0, get: function () { return y.sha256; } });
        var b = r(7986);
        Object.defineProperty(t, "randomBytes", { enumerable: !0, get: function () { return b.randomBytes; } }), Object.defineProperty(t, "shuffled", { enumerable: !0, get: function () { return b.shuffled; } });
        var v = r(3587);
        Object.defineProperty(t, "checkProperties", { enumerable: !0, get: function () { return v.checkProperties; } }), Object.defineProperty(t, "deepCopy", { enumerable: !0, get: function () { return v.deepCopy; } }), Object.defineProperty(t, "defineReadOnly", { enumerable: !0, get: function () { return v.defineReadOnly; } }), Object.defineProperty(t, "getStatic", { enumerable: !0, get: function () { return v.getStatic; } }), Object.defineProperty(t, "resolveProperties", { enumerable: !0, get: function () { return v.resolveProperties; } }), Object.defineProperty(t, "shallowCopy", { enumerable: !0, get: function () { return v.shallowCopy; } });
        var w = o(r(1843));
        t.RLP = w;
        var A = r(2768);
        Object.defineProperty(t, "computePublicKey", { enumerable: !0, get: function () { return A.computePublicKey; } }), Object.defineProperty(t, "recoverPublicKey", { enumerable: !0, get: function () { return A.recoverPublicKey; } }), Object.defineProperty(t, "SigningKey", { enumerable: !0, get: function () { return A.SigningKey; } });
        var S = r(937);
        Object.defineProperty(t, "formatBytes32String", { enumerable: !0, get: function () { return S.formatBytes32String; } }), Object.defineProperty(t, "nameprep", { enumerable: !0, get: function () { return S.nameprep; } }), Object.defineProperty(t, "parseBytes32String", { enumerable: !0, get: function () { return S.parseBytes32String; } }), Object.defineProperty(t, "_toEscapedUtf8String", { enumerable: !0, get: function () { return S._toEscapedUtf8String; } }), Object.defineProperty(t, "toUtf8Bytes", { enumerable: !0, get: function () { return S.toUtf8Bytes; } }), Object.defineProperty(t, "toUtf8CodePoints", { enumerable: !0, get: function () { return S.toUtf8CodePoints; } }), Object.defineProperty(t, "toUtf8String", { enumerable: !0, get: function () { return S.toUtf8String; } }), Object.defineProperty(t, "Utf8ErrorFuncs", { enumerable: !0, get: function () { return S.Utf8ErrorFuncs; } });
        var E = r(4377);
        Object.defineProperty(t, "accessListify", { enumerable: !0, get: function () { return E.accessListify; } }), Object.defineProperty(t, "computeAddress", { enumerable: !0, get: function () { return E.computeAddress; } }), Object.defineProperty(t, "parseTransaction", { enumerable: !0, get: function () { return E.parse; } }), Object.defineProperty(t, "recoverAddress", { enumerable: !0, get: function () { return E.recoverAddress; } }), Object.defineProperty(t, "serializeTransaction", { enumerable: !0, get: function () { return E.serialize; } }), Object.defineProperty(t, "TransactionTypes", { enumerable: !0, get: function () { return E.TransactionTypes; } });
        var k = r(7616);
        Object.defineProperty(t, "commify", { enumerable: !0, get: function () { return k.commify; } }), Object.defineProperty(t, "formatEther", { enumerable: !0, get: function () { return k.formatEther; } }), Object.defineProperty(t, "parseEther", { enumerable: !0, get: function () { return k.parseEther; } }), Object.defineProperty(t, "formatUnits", { enumerable: !0, get: function () { return k.formatUnits; } }), Object.defineProperty(t, "parseUnits", { enumerable: !0, get: function () { return k.parseUnits; } });
        var x = r(4958);
        Object.defineProperty(t, "verifyMessage", { enumerable: !0, get: function () { return x.verifyMessage; } }), Object.defineProperty(t, "verifyTypedData", { enumerable: !0, get: function () { return x.verifyTypedData; } });
        var N = r(8341);
        Object.defineProperty(t, "_fetchData", { enumerable: !0, get: function () { return N._fetchData; } }), Object.defineProperty(t, "fetchJson", { enumerable: !0, get: function () { return N.fetchJson; } }), Object.defineProperty(t, "poll", { enumerable: !0, get: function () { return N.poll; } });
        var B = r(1278);
        Object.defineProperty(t, "SupportedAlgorithm", { enumerable: !0, get: function () { return B.SupportedAlgorithm; } });
        var P = r(937);
        Object.defineProperty(t, "UnicodeNormalizationForm", { enumerable: !0, get: function () { return P.UnicodeNormalizationForm; } }), Object.defineProperty(t, "Utf8ErrorReason", { enumerable: !0, get: function () { return P.Utf8ErrorReason; } });
    }, 7648: function (e) {
        "use strict";
        var t = "Function.prototype.bind called on incompatible ", r = Array.prototype.slice, n = Object.prototype.toString, i = "[object Function]";
        e.exports = function (e) { var o = this; if ("function" != typeof o || n.call(o) !== i)
            throw new TypeError(t + o); for (var s, a = r.call(arguments, 1), c = function () { if (this instanceof s) {
            var t = o.apply(this, a.concat(r.call(arguments)));
            return Object(t) === t ? t : this;
        } return o.apply(e, a.concat(r.call(arguments))); }, u = Math.max(0, o.length - a.length), f = [], l = 0; l < u; l++)
            f.push("$" + l); if (s = Function("binder", "return function (" + f.join(",") + "){ return binder.apply(this,arguments); }")(c), o.prototype) {
            var h = function () { };
            h.prototype = o.prototype, s.prototype = new h, h.prototype = null;
        } return s; };
    }, 8612: function (e, t, r) {
        "use strict";
        var n = r(7648);
        e.exports = Function.prototype.bind || n;
    }, 210: function (e, t, r) {
        "use strict";
        var n, i = SyntaxError, o = Function, s = TypeError, a = function (e) { try {
            return o('"use strict"; return (' + e + ").constructor;")();
        }
        catch (e) { } }, c = Object.getOwnPropertyDescriptor;
        if (c)
            try {
                c({}, "");
            }
            catch (e) {
                c = null;
            }
        var u = function () { throw new s; }, f = c ? function () { try {
            return u;
        }
        catch (e) {
            try {
                return c(arguments, "callee").get;
            }
            catch (e) {
                return u;
            }
        } }() : u, l = r(1405)(), h = Object.getPrototypeOf || function (e) { return e.__proto__; }, d = {}, p = "undefined" == typeof Uint8Array ? n : h(Uint8Array), g = { "%AggregateError%": "undefined" == typeof AggregateError ? n : AggregateError, "%Array%": Array, "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? n : ArrayBuffer, "%ArrayIteratorPrototype%": l ? h([][Symbol.iterator]()) : n, "%AsyncFromSyncIteratorPrototype%": n, "%AsyncFunction%": d, "%AsyncGenerator%": d, "%AsyncGeneratorFunction%": d, "%AsyncIteratorPrototype%": d, "%Atomics%": "undefined" == typeof Atomics ? n : Atomics, "%BigInt%": "undefined" == typeof BigInt ? n : BigInt, "%Boolean%": Boolean, "%DataView%": "undefined" == typeof DataView ? n : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": "undefined" == typeof Float32Array ? n : Float32Array, "%Float64Array%": "undefined" == typeof Float64Array ? n : Float64Array, "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? n : FinalizationRegistry, "%Function%": o, "%GeneratorFunction%": d, "%Int8Array%": "undefined" == typeof Int8Array ? n : Int8Array, "%Int16Array%": "undefined" == typeof Int16Array ? n : Int16Array, "%Int32Array%": "undefined" == typeof Int32Array ? n : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": l ? h(h([][Symbol.iterator]())) : n, "%JSON%": "object" == typeof JSON ? JSON : n, "%Map%": "undefined" == typeof Map ? n : Map, "%MapIteratorPrototype%": "undefined" != typeof Map && l ? h((new Map)[Symbol.iterator]()) : n, "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": "undefined" == typeof Promise ? n : Promise, "%Proxy%": "undefined" == typeof Proxy ? n : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": "undefined" == typeof Reflect ? n : Reflect, "%RegExp%": RegExp, "%Set%": "undefined" == typeof Set ? n : Set, "%SetIteratorPrototype%": "undefined" != typeof Set && l ? h((new Set)[Symbol.iterator]()) : n, "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? n : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": l ? h(""[Symbol.iterator]()) : n, "%Symbol%": l ? Symbol : n, "%SyntaxError%": i, "%ThrowTypeError%": f, "%TypedArray%": p, "%TypeError%": s, "%Uint8Array%": "undefined" == typeof Uint8Array ? n : Uint8Array, "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? n : Uint8ClampedArray, "%Uint16Array%": "undefined" == typeof Uint16Array ? n : Uint16Array, "%Uint32Array%": "undefined" == typeof Uint32Array ? n : Uint32Array, "%URIError%": URIError, "%WeakMap%": "undefined" == typeof WeakMap ? n : WeakMap, "%WeakRef%": "undefined" == typeof WeakRef ? n : WeakRef, "%WeakSet%": "undefined" == typeof WeakSet ? n : WeakSet }, m = function e(t) { var r; if ("%AsyncFunction%" === t)
            r = a("async function () {}");
        else if ("%GeneratorFunction%" === t)
            r = a("function* () {}");
        else if ("%AsyncGeneratorFunction%" === t)
            r = a("async function* () {}");
        else if ("%AsyncGenerator%" === t) {
            var n = e("%AsyncGeneratorFunction%");
            n && (r = n.prototype);
        }
        else if ("%AsyncIteratorPrototype%" === t) {
            var i = e("%AsyncGenerator%");
            i && (r = h(i.prototype));
        } return g[t] = r, r; }, y = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, b = r(8612), v = r(7642), w = b.call(Function.call, Array.prototype.concat), A = b.call(Function.apply, Array.prototype.splice), S = b.call(Function.call, String.prototype.replace), E = b.call(Function.call, String.prototype.slice), k = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, x = /\\(\\)?/g, N = function (e) { var t = E(e, 0, 1), r = E(e, -1); if ("%" === t && "%" !== r)
            throw new i("invalid intrinsic syntax, expected closing `%`"); if ("%" === r && "%" !== t)
            throw new i("invalid intrinsic syntax, expected opening `%`"); var n = []; return S(e, k, (function (e, t, r, i) { n[n.length] = r ? S(i, x, "$1") : t || e; })), n; }, B = function (e, t) { var r, n = e; if (v(y, n) && (n = "%" + (r = y[n])[0] + "%"), v(g, n)) {
            var o = g[n];
            if (o === d && (o = m(n)), void 0 === o && !t)
                throw new s("intrinsic " + e + " exists, but is not available. Please file an issue!");
            return { alias: r, name: n, value: o };
        } throw new i("intrinsic " + e + " does not exist!"); };
        e.exports = function (e, t) { if ("string" != typeof e || 0 === e.length)
            throw new s("intrinsic name must be a non-empty string"); if (arguments.length > 1 && "boolean" != typeof t)
            throw new s('"allowMissing" argument must be a boolean'); var r = N(e), n = r.length > 0 ? r[0] : "", o = B("%" + n + "%", t), a = o.name, u = o.value, f = !1, l = o.alias; l && (n = l[0], A(r, w([0, 1], l))); for (var h = 1, d = !0; h < r.length; h += 1) {
            var p = r[h], m = E(p, 0, 1), y = E(p, -1);
            if (('"' === m || "'" === m || "`" === m || '"' === y || "'" === y || "`" === y) && m !== y)
                throw new i("property names with quotes must have matching quotes");
            if ("constructor" !== p && d || (f = !0), v(g, a = "%" + (n += "." + p) + "%"))
                u = g[a];
            else if (null != u) {
                if (!(p in u)) {
                    if (!t)
                        throw new s("base intrinsic for " + e + " exists, but the property is not available.");
                    return;
                }
                if (c && h + 1 >= r.length) {
                    var b = c(u, p);
                    u = (d = !!b) && "get" in b && !("originalValue" in b.get) ? b.get : u[p];
                }
                else
                    d = v(u, p), u = u[p];
                d && !f && (g[a] = u);
            }
        } return u; };
    }, 1405: function (e, t, r) {
        "use strict";
        var n = "undefined" != typeof Symbol && Symbol, i = r(5419);
        e.exports = function () { return "function" == typeof n && "function" == typeof Symbol && "symbol" == typeof n("foo") && "symbol" == typeof Symbol("bar") && i(); };
    }, 5419: function (e) {
        "use strict";
        e.exports = function () { if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols)
            return !1; if ("symbol" == typeof Symbol.iterator)
            return !0; var e = {}, t = Symbol("test"), r = Object(t); if ("string" == typeof t)
            return !1; if ("[object Symbol]" !== Object.prototype.toString.call(t))
            return !1; if ("[object Symbol]" !== Object.prototype.toString.call(r))
            return !1; for (t in e[t] = 42, e)
            return !1; if ("function" == typeof Object.keys && 0 !== Object.keys(e).length)
            return !1; if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length)
            return !1; var n = Object.getOwnPropertySymbols(e); if (1 !== n.length || n[0] !== t)
            return !1; if (!Object.prototype.propertyIsEnumerable.call(e, t))
            return !1; if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var i = Object.getOwnPropertyDescriptor(e, t);
            if (42 !== i.value || !0 !== i.enumerable)
                return !1;
        } return !0; };
    }, 6410: function (e, t, r) {
        "use strict";
        var n = r(5419);
        e.exports = function () { return n() && !!Symbol.toStringTag; };
    }, 7642: function (e, t, r) {
        "use strict";
        var n = r(8612);
        e.exports = n.call(Function.call, Object.prototype.hasOwnProperty);
    }, 3715: function (e, t, r) { var n = t; n.utils = r(6436), n.common = r(5772), n.sha = r(9041), n.ripemd = r(2949), n.hmac = r(2344), n.sha1 = n.sha.sha1, n.sha256 = n.sha.sha256, n.sha224 = n.sha.sha224, n.sha384 = n.sha.sha384, n.sha512 = n.sha.sha512, n.ripemd160 = n.ripemd.ripemd160; }, 5772: function (e, t, r) {
        "use strict";
        var n = r(6436), i = r(9746);
        function o() { this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32; }
        t.BlockHash = o, o.prototype.update = function (e, t) { if (e = n.toArray(e, t), this.pending ? this.pending = this.pending.concat(e) : this.pending = e, this.pendingTotal += e.length, this.pending.length >= this._delta8) {
            var r = (e = this.pending).length % this._delta8;
            this.pending = e.slice(e.length - r, e.length), 0 === this.pending.length && (this.pending = null), e = n.join32(e, 0, e.length - r, this.endian);
            for (var i = 0; i < e.length; i += this._delta32)
                this._update(e, i, i + this._delta32);
        } return this; }, o.prototype.digest = function (e) { return this.update(this._pad()), i(null === this.pending), this._digest(e); }, o.prototype._pad = function () { var e = this.pendingTotal, t = this._delta8, r = t - (e + this.padLength) % t, n = new Array(r + this.padLength); n[0] = 128; for (var i = 1; i < r; i++)
            n[i] = 0; if (e <<= 3, "big" === this.endian) {
            for (var o = 8; o < this.padLength; o++)
                n[i++] = 0;
            n[i++] = 0, n[i++] = 0, n[i++] = 0, n[i++] = 0, n[i++] = e >>> 24 & 255, n[i++] = e >>> 16 & 255, n[i++] = e >>> 8 & 255, n[i++] = 255 & e;
        }
        else
            for (n[i++] = 255 & e, n[i++] = e >>> 8 & 255, n[i++] = e >>> 16 & 255, n[i++] = e >>> 24 & 255, n[i++] = 0, n[i++] = 0, n[i++] = 0, n[i++] = 0, o = 8; o < this.padLength; o++)
                n[i++] = 0; return n; };
    }, 2344: function (e, t, r) {
        "use strict";
        var n = r(6436), i = r(9746);
        function o(e, t, r) { if (!(this instanceof o))
            return new o(e, t, r); this.Hash = e, this.blockSize = e.blockSize / 8, this.outSize = e.outSize / 8, this.inner = null, this.outer = null, this._init(n.toArray(t, r)); }
        e.exports = o, o.prototype._init = function (e) { e.length > this.blockSize && (e = (new this.Hash).update(e).digest()), i(e.length <= this.blockSize); for (var t = e.length; t < this.blockSize; t++)
            e.push(0); for (t = 0; t < e.length; t++)
            e[t] ^= 54; for (this.inner = (new this.Hash).update(e), t = 0; t < e.length; t++)
            e[t] ^= 106; this.outer = (new this.Hash).update(e); }, o.prototype.update = function (e, t) { return this.inner.update(e, t), this; }, o.prototype.digest = function (e) { return this.outer.update(this.inner.digest()), this.outer.digest(e); };
    }, 2949: function (e, t, r) {
        "use strict";
        var n = r(6436), i = r(5772), o = n.rotl32, s = n.sum32, a = n.sum32_3, c = n.sum32_4, u = i.BlockHash;
        function f() { if (!(this instanceof f))
            return new f; u.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"; }
        function l(e, t, r, n) { return e <= 15 ? t ^ r ^ n : e <= 31 ? t & r | ~t & n : e <= 47 ? (t | ~r) ^ n : e <= 63 ? t & n | r & ~n : t ^ (r | ~n); }
        function h(e) { return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838; }
        function d(e) { return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0; }
        n.inherits(f, u), t.ripemd160 = f, f.blockSize = 512, f.outSize = 160, f.hmacStrength = 192, f.padLength = 64, f.prototype._update = function (e, t) { for (var r = this.h[0], n = this.h[1], i = this.h[2], u = this.h[3], f = this.h[4], b = r, v = n, w = i, A = u, S = f, E = 0; E < 80; E++) {
            var k = s(o(c(r, l(E, n, i, u), e[p[E] + t], h(E)), m[E]), f);
            r = f, f = u, u = o(i, 10), i = n, n = k, k = s(o(c(b, l(79 - E, v, w, A), e[g[E] + t], d(E)), y[E]), S), b = S, S = A, A = o(w, 10), w = v, v = k;
        } k = a(this.h[1], i, A), this.h[1] = a(this.h[2], u, S), this.h[2] = a(this.h[3], f, b), this.h[3] = a(this.h[4], r, v), this.h[4] = a(this.h[0], n, w), this.h[0] = k; }, f.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h, "little") : n.split32(this.h, "little"); };
        var p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], g = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], m = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], y = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
    }, 9041: function (e, t, r) {
        "use strict";
        t.sha1 = r(4761), t.sha224 = r(799), t.sha256 = r(9344), t.sha384 = r(772), t.sha512 = r(5900);
    }, 4761: function (e, t, r) {
        "use strict";
        var n = r(6436), i = r(5772), o = r(7038), s = n.rotl32, a = n.sum32, c = n.sum32_5, u = o.ft_1, f = i.BlockHash, l = [1518500249, 1859775393, 2400959708, 3395469782];
        function h() { if (!(this instanceof h))
            return new h; f.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80); }
        n.inherits(h, f), e.exports = h, h.blockSize = 512, h.outSize = 160, h.hmacStrength = 80, h.padLength = 64, h.prototype._update = function (e, t) { for (var r = this.W, n = 0; n < 16; n++)
            r[n] = e[t + n]; for (; n < r.length; n++)
            r[n] = s(r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], 1); var i = this.h[0], o = this.h[1], f = this.h[2], h = this.h[3], d = this.h[4]; for (n = 0; n < r.length; n++) {
            var p = ~~(n / 20), g = c(s(i, 5), u(p, o, f, h), d, r[n], l[p]);
            d = h, h = f, f = s(o, 30), o = i, i = g;
        } this.h[0] = a(this.h[0], i), this.h[1] = a(this.h[1], o), this.h[2] = a(this.h[2], f), this.h[3] = a(this.h[3], h), this.h[4] = a(this.h[4], d); }, h.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h, "big") : n.split32(this.h, "big"); };
    }, 799: function (e, t, r) {
        "use strict";
        var n = r(6436), i = r(9344);
        function o() { if (!(this instanceof o))
            return new o; i.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]; }
        n.inherits(o, i), e.exports = o, o.blockSize = 512, o.outSize = 224, o.hmacStrength = 192, o.padLength = 64, o.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h.slice(0, 7), "big") : n.split32(this.h.slice(0, 7), "big"); };
    }, 9344: function (e, t, r) {
        "use strict";
        var n = r(6436), i = r(5772), o = r(7038), s = r(9746), a = n.sum32, c = n.sum32_4, u = n.sum32_5, f = o.ch32, l = o.maj32, h = o.s0_256, d = o.s1_256, p = o.g0_256, g = o.g1_256, m = i.BlockHash, y = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
        function b() { if (!(this instanceof b))
            return new b; m.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = y, this.W = new Array(64); }
        n.inherits(b, m), e.exports = b, b.blockSize = 512, b.outSize = 256, b.hmacStrength = 192, b.padLength = 64, b.prototype._update = function (e, t) { for (var r = this.W, n = 0; n < 16; n++)
            r[n] = e[t + n]; for (; n < r.length; n++)
            r[n] = c(g(r[n - 2]), r[n - 7], p(r[n - 15]), r[n - 16]); var i = this.h[0], o = this.h[1], m = this.h[2], y = this.h[3], b = this.h[4], v = this.h[5], w = this.h[6], A = this.h[7]; for (s(this.k.length === r.length), n = 0; n < r.length; n++) {
            var S = u(A, d(b), f(b, v, w), this.k[n], r[n]), E = a(h(i), l(i, o, m));
            A = w, w = v, v = b, b = a(y, S), y = m, m = o, o = i, i = a(S, E);
        } this.h[0] = a(this.h[0], i), this.h[1] = a(this.h[1], o), this.h[2] = a(this.h[2], m), this.h[3] = a(this.h[3], y), this.h[4] = a(this.h[4], b), this.h[5] = a(this.h[5], v), this.h[6] = a(this.h[6], w), this.h[7] = a(this.h[7], A); }, b.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h, "big") : n.split32(this.h, "big"); };
    }, 772: function (e, t, r) {
        "use strict";
        var n = r(6436), i = r(5900);
        function o() { if (!(this instanceof o))
            return new o; i.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]; }
        n.inherits(o, i), e.exports = o, o.blockSize = 1024, o.outSize = 384, o.hmacStrength = 192, o.padLength = 128, o.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h.slice(0, 12), "big") : n.split32(this.h.slice(0, 12), "big"); };
    }, 5900: function (e, t, r) {
        "use strict";
        var n = r(6436), i = r(5772), o = r(9746), s = n.rotr64_hi, a = n.rotr64_lo, c = n.shr64_hi, u = n.shr64_lo, f = n.sum64, l = n.sum64_hi, h = n.sum64_lo, d = n.sum64_4_hi, p = n.sum64_4_lo, g = n.sum64_5_hi, m = n.sum64_5_lo, y = i.BlockHash, b = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
        function v() { if (!(this instanceof v))
            return new v; y.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = b, this.W = new Array(160); }
        function w(e, t, r, n, i) { var o = e & r ^ ~e & i; return o < 0 && (o += 4294967296), o; }
        function A(e, t, r, n, i, o) { var s = t & n ^ ~t & o; return s < 0 && (s += 4294967296), s; }
        function S(e, t, r, n, i) { var o = e & r ^ e & i ^ r & i; return o < 0 && (o += 4294967296), o; }
        function E(e, t, r, n, i, o) { var s = t & n ^ t & o ^ n & o; return s < 0 && (s += 4294967296), s; }
        function k(e, t) { var r = s(e, t, 28) ^ s(t, e, 2) ^ s(t, e, 7); return r < 0 && (r += 4294967296), r; }
        function x(e, t) { var r = a(e, t, 28) ^ a(t, e, 2) ^ a(t, e, 7); return r < 0 && (r += 4294967296), r; }
        function N(e, t) { var r = a(e, t, 14) ^ a(e, t, 18) ^ a(t, e, 9); return r < 0 && (r += 4294967296), r; }
        function B(e, t) { var r = s(e, t, 1) ^ s(e, t, 8) ^ c(e, t, 7); return r < 0 && (r += 4294967296), r; }
        function P(e, t) { var r = a(e, t, 1) ^ a(e, t, 8) ^ u(e, t, 7); return r < 0 && (r += 4294967296), r; }
        function _(e, t) { var r = a(e, t, 19) ^ a(t, e, 29) ^ u(e, t, 6); return r < 0 && (r += 4294967296), r; }
        n.inherits(v, y), e.exports = v, v.blockSize = 1024, v.outSize = 512, v.hmacStrength = 192, v.padLength = 128, v.prototype._prepareBlock = function (e, t) { for (var r = this.W, n = 0; n < 32; n++)
            r[n] = e[t + n]; for (; n < r.length; n += 2) {
            var i = (m = r[n - 4], y = r[n - 3], b = void 0, (b = s(m, y, 19) ^ s(y, m, 29) ^ c(m, y, 6)) < 0 && (b += 4294967296), b), o = _(r[n - 4], r[n - 3]), a = r[n - 14], u = r[n - 13], f = B(r[n - 30], r[n - 29]), l = P(r[n - 30], r[n - 29]), h = r[n - 32], g = r[n - 31];
            r[n] = d(i, o, a, u, f, l, h, g), r[n + 1] = p(i, o, a, u, f, l, h, g);
        } var m, y, b; }, v.prototype._update = function (e, t) { this._prepareBlock(e, t); var r, n, i, a = this.W, c = this.h[0], u = this.h[1], d = this.h[2], p = this.h[3], y = this.h[4], b = this.h[5], v = this.h[6], B = this.h[7], P = this.h[8], _ = this.h[9], I = this.h[10], O = this.h[11], T = this.h[12], R = this.h[13], C = this.h[14], M = this.h[15]; o(this.k.length === a.length); for (var L = 0; L < a.length; L += 2) {
            var U = C, D = M, F = (i = void 0, (i = s(r = P, n = _, 14) ^ s(r, n, 18) ^ s(n, r, 9)) < 0 && (i += 4294967296), i), j = N(P, _), H = w(P, 0, I, 0, T), V = A(0, _, 0, O, 0, R), z = this.k[L], G = this.k[L + 1], q = a[L], K = a[L + 1], W = g(U, D, F, j, H, V, z, G, q, K), $ = m(U, D, F, j, H, V, z, G, q, K);
            U = k(c, u), D = x(c, u), F = S(c, 0, d, 0, y), j = E(0, u, 0, p, 0, b);
            var J = l(U, D, F, j), Z = h(U, D, F, j);
            C = T, M = R, T = I, R = O, I = P, O = _, P = l(v, B, W, $), _ = h(B, B, W, $), v = y, B = b, y = d, b = p, d = c, p = u, c = l(W, $, J, Z), u = h(W, $, J, Z);
        } f(this.h, 0, c, u), f(this.h, 2, d, p), f(this.h, 4, y, b), f(this.h, 6, v, B), f(this.h, 8, P, _), f(this.h, 10, I, O), f(this.h, 12, T, R), f(this.h, 14, C, M); }, v.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h, "big") : n.split32(this.h, "big"); };
    }, 7038: function (e, t, r) {
        "use strict";
        var n = r(6436).rotr32;
        function i(e, t, r) { return e & t ^ ~e & r; }
        function o(e, t, r) { return e & t ^ e & r ^ t & r; }
        function s(e, t, r) { return e ^ t ^ r; }
        t.ft_1 = function (e, t, r, n) { return 0 === e ? i(t, r, n) : 1 === e || 3 === e ? s(t, r, n) : 2 === e ? o(t, r, n) : void 0; }, t.ch32 = i, t.maj32 = o, t.p32 = s, t.s0_256 = function (e) { return n(e, 2) ^ n(e, 13) ^ n(e, 22); }, t.s1_256 = function (e) { return n(e, 6) ^ n(e, 11) ^ n(e, 25); }, t.g0_256 = function (e) { return n(e, 7) ^ n(e, 18) ^ e >>> 3; }, t.g1_256 = function (e) { return n(e, 17) ^ n(e, 19) ^ e >>> 10; };
    }, 6436: function (e, t, r) {
        "use strict";
        var n = r(9746), i = r(5717);
        function o(e, t) { return 55296 == (64512 & e.charCodeAt(t)) && !(t < 0 || t + 1 >= e.length) && 56320 == (64512 & e.charCodeAt(t + 1)); }
        function s(e) { return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0; }
        function a(e) { return 1 === e.length ? "0" + e : e; }
        function c(e) { return 7 === e.length ? "0" + e : 6 === e.length ? "00" + e : 5 === e.length ? "000" + e : 4 === e.length ? "0000" + e : 3 === e.length ? "00000" + e : 2 === e.length ? "000000" + e : 1 === e.length ? "0000000" + e : e; }
        t.inherits = i, t.toArray = function (e, t) { if (Array.isArray(e))
            return e.slice(); if (!e)
            return []; var r = []; if ("string" == typeof e)
            if (t) {
                if ("hex" === t)
                    for ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e), i = 0; i < e.length; i += 2)
                        r.push(parseInt(e[i] + e[i + 1], 16));
            }
            else
                for (var n = 0, i = 0; i < e.length; i++) {
                    var s = e.charCodeAt(i);
                    s < 128 ? r[n++] = s : s < 2048 ? (r[n++] = s >> 6 | 192, r[n++] = 63 & s | 128) : o(e, i) ? (s = 65536 + ((1023 & s) << 10) + (1023 & e.charCodeAt(++i)), r[n++] = s >> 18 | 240, r[n++] = s >> 12 & 63 | 128, r[n++] = s >> 6 & 63 | 128, r[n++] = 63 & s | 128) : (r[n++] = s >> 12 | 224, r[n++] = s >> 6 & 63 | 128, r[n++] = 63 & s | 128);
                }
        else
            for (i = 0; i < e.length; i++)
                r[i] = 0 | e[i]; return r; }, t.toHex = function (e) { for (var t = "", r = 0; r < e.length; r++)
            t += a(e[r].toString(16)); return t; }, t.htonl = s, t.toHex32 = function (e, t) { for (var r = "", n = 0; n < e.length; n++) {
            var i = e[n];
            "little" === t && (i = s(i)), r += c(i.toString(16));
        } return r; }, t.zero2 = a, t.zero8 = c, t.join32 = function (e, t, r, i) { var o = r - t; n(o % 4 == 0); for (var s = new Array(o / 4), a = 0, c = t; a < s.length; a++, c += 4) {
            var u;
            u = "big" === i ? e[c] << 24 | e[c + 1] << 16 | e[c + 2] << 8 | e[c + 3] : e[c + 3] << 24 | e[c + 2] << 16 | e[c + 1] << 8 | e[c], s[a] = u >>> 0;
        } return s; }, t.split32 = function (e, t) { for (var r = new Array(4 * e.length), n = 0, i = 0; n < e.length; n++, i += 4) {
            var o = e[n];
            "big" === t ? (r[i] = o >>> 24, r[i + 1] = o >>> 16 & 255, r[i + 2] = o >>> 8 & 255, r[i + 3] = 255 & o) : (r[i + 3] = o >>> 24, r[i + 2] = o >>> 16 & 255, r[i + 1] = o >>> 8 & 255, r[i] = 255 & o);
        } return r; }, t.rotr32 = function (e, t) { return e >>> t | e << 32 - t; }, t.rotl32 = function (e, t) { return e << t | e >>> 32 - t; }, t.sum32 = function (e, t) { return e + t >>> 0; }, t.sum32_3 = function (e, t, r) { return e + t + r >>> 0; }, t.sum32_4 = function (e, t, r, n) { return e + t + r + n >>> 0; }, t.sum32_5 = function (e, t, r, n, i) { return e + t + r + n + i >>> 0; }, t.sum64 = function (e, t, r, n) { var i = e[t], o = n + e[t + 1] >>> 0, s = (o < n ? 1 : 0) + r + i; e[t] = s >>> 0, e[t + 1] = o; }, t.sum64_hi = function (e, t, r, n) { return (t + n >>> 0 < t ? 1 : 0) + e + r >>> 0; }, t.sum64_lo = function (e, t, r, n) { return t + n >>> 0; }, t.sum64_4_hi = function (e, t, r, n, i, o, s, a) { var c = 0, u = t; return c += (u = u + n >>> 0) < t ? 1 : 0, c += (u = u + o >>> 0) < o ? 1 : 0, e + r + i + s + (c += (u = u + a >>> 0) < a ? 1 : 0) >>> 0; }, t.sum64_4_lo = function (e, t, r, n, i, o, s, a) { return t + n + o + a >>> 0; }, t.sum64_5_hi = function (e, t, r, n, i, o, s, a, c, u) { var f = 0, l = t; return f += (l = l + n >>> 0) < t ? 1 : 0, f += (l = l + o >>> 0) < o ? 1 : 0, f += (l = l + a >>> 0) < a ? 1 : 0, e + r + i + s + c + (f += (l = l + u >>> 0) < u ? 1 : 0) >>> 0; }, t.sum64_5_lo = function (e, t, r, n, i, o, s, a, c, u) { return t + n + o + a + u >>> 0; }, t.rotr64_hi = function (e, t, r) { return (t << 32 - r | e >>> r) >>> 0; }, t.rotr64_lo = function (e, t, r) { return (e << 32 - r | t >>> r) >>> 0; }, t.shr64_hi = function (e, t, r) { return e >>> r; }, t.shr64_lo = function (e, t, r) { return (e << 32 - r | t >>> r) >>> 0; };
    }, 2156: function (e, t, r) {
        "use strict";
        var n = r(3715), i = r(4504), o = r(9746);
        function s(e) { if (!(this instanceof s))
            return new s(e); this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null; var t = i.toArray(e.entropy, e.entropyEnc || "hex"), r = i.toArray(e.nonce, e.nonceEnc || "hex"), n = i.toArray(e.pers, e.persEnc || "hex"); o(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(t, r, n); }
        e.exports = s, s.prototype._init = function (e, t, r) { var n = e.concat(t).concat(r); this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8); for (var i = 0; i < this.V.length; i++)
            this.K[i] = 0, this.V[i] = 1; this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656; }, s.prototype._hmac = function () { return new n.hmac(this.hash, this.K); }, s.prototype._update = function (e) { var t = this._hmac().update(this.V).update([0]); e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest()); }, s.prototype.reseed = function (e, t, r, n) { "string" != typeof t && (n = r, r = t, t = null), e = i.toArray(e, t), r = i.toArray(r, n), o(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(e.concat(r || [])), this._reseed = 1; }, s.prototype.generate = function (e, t, r, n) { if (this._reseed > this.reseedInterval)
            throw new Error("Reseed is required"); "string" != typeof t && (n = r, r = t, t = null), r && (r = i.toArray(r, n || "hex"), this._update(r)); for (var o = []; o.length < e;)
            this.V = this._hmac().update(this.V).digest(), o = o.concat(this.V); var s = o.slice(0, e); return this._update(r), this._reseed++, i.encode(s, t); };
    }, 5717: function (e) { "function" == typeof Object.create ? e.exports = function (e, t) { t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })); } : e.exports = function (e, t) { if (t) {
        e.super_ = t;
        var r = function () { };
        r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e;
    } }; }, 9496: function (e, t, r) {
        "use strict";
        var n = r(210), i = r(7642), o = r(7478)(), s = n("%TypeError%"), a = { assert: function (e, t) { if (!e || "object" != typeof e && "function" != typeof e)
                throw new s("`O` is not an object"); if ("string" != typeof t)
                throw new s("`slot` must be a string"); o.assert(e); }, get: function (e, t) { if (!e || "object" != typeof e && "function" != typeof e)
                throw new s("`O` is not an object"); if ("string" != typeof t)
                throw new s("`slot` must be a string"); var r = o.get(e); return r && r["$" + t]; }, has: function (e, t) { if (!e || "object" != typeof e && "function" != typeof e)
                throw new s("`O` is not an object"); if ("string" != typeof t)
                throw new s("`slot` must be a string"); var r = o.get(e); return !!r && i(r, "$" + t); }, set: function (e, t, r) { if (!e || "object" != typeof e && "function" != typeof e)
                throw new s("`O` is not an object"); if ("string" != typeof t)
                throw new s("`slot` must be a string"); var n = o.get(e); n || (n = {}, o.set(e, n)), n["$" + t] = r; } };
        Object.freeze && Object.freeze(a), e.exports = a;
    }, 5320: function (e) {
        "use strict";
        var t, r, n = Function.prototype.toString, i = "object" == typeof Reflect && null !== Reflect && Reflect.apply;
        if ("function" == typeof i && "function" == typeof Object.defineProperty)
            try {
                t = Object.defineProperty({}, "length", { get: function () { throw r; } }), r = {}, i((function () { throw 42; }), null, t);
            }
            catch (e) {
                e !== r && (i = null);
            }
        else
            i = null;
        var o = /^\s*class\b/, s = function (e) { try {
            var t = n.call(e);
            return o.test(t);
        }
        catch (e) {
            return !1;
        } }, a = Object.prototype.toString, c = "function" == typeof Symbol && !!Symbol.toStringTag, u = "object" == typeof document && void 0 === document.all && void 0 !== document.all ? document.all : {};
        e.exports = i ? function (e) { if (e === u)
            return !0; if (!e)
            return !1; if ("function" != typeof e && "object" != typeof e)
            return !1; if ("function" == typeof e && !e.prototype)
            return !0; try {
            i(e, null, t);
        }
        catch (e) {
            if (e !== r)
                return !1;
        } return !s(e); } : function (e) { if (e === u)
            return !0; if (!e)
            return !1; if ("function" != typeof e && "object" != typeof e)
            return !1; if ("function" == typeof e && !e.prototype)
            return !0; if (c)
            return function (e) { try {
                return !s(e) && (n.call(e), !0);
            }
            catch (e) {
                return !1;
            } }(e); if (s(e))
            return !1; var t = a.call(e); return "[object Function]" === t || "[object GeneratorFunction]" === t; };
    }, 8923: function (e, t, r) {
        "use strict";
        var n = Date.prototype.getDay, i = Object.prototype.toString, o = r(6410)();
        e.exports = function (e) { return "object" == typeof e && null !== e && (o ? function (e) { try {
            return n.call(e), !0;
        }
        catch (e) {
            return !1;
        } }(e) : "[object Date]" === i.call(e)); };
    }, 8420: function (e, t, r) {
        "use strict";
        var n, i, o, s, a = r(1924), c = r(6410)();
        if (c) {
            n = a("Object.prototype.hasOwnProperty"), i = a("RegExp.prototype.exec"), o = {};
            var u = function () { throw o; };
            s = { toString: u, valueOf: u }, "symbol" == typeof Symbol.toPrimitive && (s[Symbol.toPrimitive] = u);
        }
        var f = a("Object.prototype.toString"), l = Object.getOwnPropertyDescriptor;
        e.exports = c ? function (e) { if (!e || "object" != typeof e)
            return !1; var t = l(e, "lastIndex"); if (!t || !n(t, "value"))
            return !1; try {
            i(e, s);
        }
        catch (e) {
            return e === o;
        } } : function (e) { return !(!e || "object" != typeof e && "function" != typeof e) && "[object RegExp]" === f(e); };
    }, 2636: function (e, t, r) {
        "use strict";
        var n = Object.prototype.toString;
        if (r(1405)()) {
            var i = Symbol.prototype.toString, o = /^Symbol\(.*\)$/;
            e.exports = function (e) { if ("symbol" == typeof e)
                return !0; if ("[object Symbol]" !== n.call(e))
                return !1; try {
                return function (e) { return "symbol" == typeof e.valueOf() && o.test(i.call(e)); }(e);
            }
            catch (e) {
                return !1;
            } };
        }
        else
            e.exports = function (e) { return !1; };
    }, 1094: function (e, t, r) { var n; !function () {
        "use strict";
        var i = "input is invalid type", o = "object" == typeof window, s = o ? window : {};
        s.JS_SHA3_NO_WINDOW && (o = !1);
        var a = !o && "object" == typeof self;
        !s.JS_SHA3_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node ? s = r.g : a && (s = self);
        var c = !s.JS_SHA3_NO_COMMON_JS && e.exports, u = r.amdO, f = !s.JS_SHA3_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, l = "0123456789abcdef".split(""), h = [4, 1024, 262144, 67108864], d = [0, 8, 16, 24], p = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648], g = [224, 256, 384, 512], m = [128, 256], y = ["hex", "buffer", "arrayBuffer", "array", "digest"], b = { 128: 168, 256: 136 };
        !s.JS_SHA3_NO_NODE_JS && Array.isArray || (Array.isArray = function (e) { return "[object Array]" === Object.prototype.toString.call(e); }), !f || !s.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function (e) { return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer; });
        for (var v = function (e, t, r) { return function (n) { return new C(e, t, e).update(n)[r](); }; }, w = function (e, t, r) { return function (n, i) { return new C(e, t, i).update(n)[r](); }; }, A = function (e, t, r) { return function (t, n, i, o) { return N["cshake" + e].update(t, n, i, o)[r](); }; }, S = function (e, t, r) { return function (t, n, i, o) { return N["kmac" + e].update(t, n, i, o)[r](); }; }, E = function (e, t, r, n) { for (var i = 0; i < y.length; ++i) {
            var o = y[i];
            e[o] = t(r, n, o);
        } return e; }, k = function (e, t) { var r = v(e, t, "hex"); return r.create = function () { return new C(e, t, e); }, r.update = function (e) { return r.create().update(e); }, E(r, v, e, t); }, x = [{ name: "keccak", padding: [1, 256, 65536, 16777216], bits: g, createMethod: k }, { name: "sha3", padding: [6, 1536, 393216, 100663296], bits: g, createMethod: k }, { name: "shake", padding: [31, 7936, 2031616, 520093696], bits: m, createMethod: function (e, t) { var r = w(e, t, "hex"); return r.create = function (r) { return new C(e, t, r); }, r.update = function (e, t) { return r.create(t).update(e); }, E(r, w, e, t); } }, { name: "cshake", padding: h, bits: m, createMethod: function (e, t) { var r = b[e], n = A(e, 0, "hex"); return n.create = function (n, i, o) { return i || o ? new C(e, t, n).bytepad([i, o], r) : N["shake" + e].create(n); }, n.update = function (e, t, r, i) { return n.create(t, r, i).update(e); }, E(n, A, e, t); } }, { name: "kmac", padding: h, bits: m, createMethod: function (e, t) { var r = b[e], n = S(e, 0, "hex"); return n.create = function (n, i, o) { return new M(e, t, i).bytepad(["KMAC", o], r).bytepad([n], r); }, n.update = function (e, t, r, i) { return n.create(e, r, i).update(t); }, E(n, S, e, t); } }], N = {}, B = [], P = 0; P < x.length; ++P)
            for (var _ = x[P], I = _.bits, O = 0; O < I.length; ++O) {
                var T = _.name + "_" + I[O];
                if (B.push(T), N[T] = _.createMethod(I[O], _.padding), "sha3" !== _.name) {
                    var R = _.name + I[O];
                    B.push(R), N[R] = N[T];
                }
            }
        function C(e, t, r) { this.blocks = [], this.s = [], this.padding = t, this.outputBits = r, this.reset = !0, this.finalized = !1, this.block = 0, this.start = 0, this.blockCount = 1600 - (e << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = r >> 5, this.extraBytes = (31 & r) >> 3; for (var n = 0; n < 50; ++n)
            this.s[n] = 0; }
        function M(e, t, r) { C.call(this, e, t, r); }
        C.prototype.update = function (e) { if (this.finalized)
            throw new Error("finalize already called"); var t, r = typeof e; if ("string" !== r) {
            if ("object" !== r)
                throw new Error(i);
            if (null === e)
                throw new Error(i);
            if (f && e.constructor === ArrayBuffer)
                e = new Uint8Array(e);
            else if (!(Array.isArray(e) || f && ArrayBuffer.isView(e)))
                throw new Error(i);
            t = !0;
        } for (var n, o, s = this.blocks, a = this.byteCount, c = e.length, u = this.blockCount, l = 0, h = this.s; l < c;) {
            if (this.reset)
                for (this.reset = !1, s[0] = this.block, n = 1; n < u + 1; ++n)
                    s[n] = 0;
            if (t)
                for (n = this.start; l < c && n < a; ++l)
                    s[n >> 2] |= e[l] << d[3 & n++];
            else
                for (n = this.start; l < c && n < a; ++l)
                    (o = e.charCodeAt(l)) < 128 ? s[n >> 2] |= o << d[3 & n++] : o < 2048 ? (s[n >> 2] |= (192 | o >> 6) << d[3 & n++], s[n >> 2] |= (128 | 63 & o) << d[3 & n++]) : o < 55296 || o >= 57344 ? (s[n >> 2] |= (224 | o >> 12) << d[3 & n++], s[n >> 2] |= (128 | o >> 6 & 63) << d[3 & n++], s[n >> 2] |= (128 | 63 & o) << d[3 & n++]) : (o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(++l)), s[n >> 2] |= (240 | o >> 18) << d[3 & n++], s[n >> 2] |= (128 | o >> 12 & 63) << d[3 & n++], s[n >> 2] |= (128 | o >> 6 & 63) << d[3 & n++], s[n >> 2] |= (128 | 63 & o) << d[3 & n++]);
            if (this.lastByteIndex = n, n >= a) {
                for (this.start = n - a, this.block = s[u], n = 0; n < u; ++n)
                    h[n] ^= s[n];
                L(h), this.reset = !0;
            }
            else
                this.start = n;
        } return this; }, C.prototype.encode = function (e, t) { var r = 255 & e, n = 1, i = [r]; for (r = 255 & (e >>= 8); r > 0;)
            i.unshift(r), r = 255 & (e >>= 8), ++n; return t ? i.push(n) : i.unshift(n), this.update(i), i.length; }, C.prototype.encodeString = function (e) { var t, r = typeof e; if ("string" !== r) {
            if ("object" !== r)
                throw new Error(i);
            if (null === e)
                throw new Error(i);
            if (f && e.constructor === ArrayBuffer)
                e = new Uint8Array(e);
            else if (!(Array.isArray(e) || f && ArrayBuffer.isView(e)))
                throw new Error(i);
            t = !0;
        } var n = 0, o = e.length; if (t)
            n = o;
        else
            for (var s = 0; s < e.length; ++s) {
                var a = e.charCodeAt(s);
                a < 128 ? n += 1 : a < 2048 ? n += 2 : a < 55296 || a >= 57344 ? n += 3 : (a = 65536 + ((1023 & a) << 10 | 1023 & e.charCodeAt(++s)), n += 4);
            } return n += this.encode(8 * n), this.update(e), n; }, C.prototype.bytepad = function (e, t) { for (var r = this.encode(t), n = 0; n < e.length; ++n)
            r += this.encodeString(e[n]); var i = t - r % t, o = []; return o.length = i, this.update(o), this; }, C.prototype.finalize = function () { if (!this.finalized) {
            this.finalized = !0;
            var e = this.blocks, t = this.lastByteIndex, r = this.blockCount, n = this.s;
            if (e[t >> 2] |= this.padding[3 & t], this.lastByteIndex === this.byteCount)
                for (e[0] = e[r], t = 1; t < r + 1; ++t)
                    e[t] = 0;
            for (e[r - 1] |= 2147483648, t = 0; t < r; ++t)
                n[t] ^= e[t];
            L(n);
        } }, C.prototype.toString = C.prototype.hex = function () { this.finalize(); for (var e, t = this.blockCount, r = this.s, n = this.outputBlocks, i = this.extraBytes, o = 0, s = 0, a = ""; s < n;) {
            for (o = 0; o < t && s < n; ++o, ++s)
                e = r[o], a += l[e >> 4 & 15] + l[15 & e] + l[e >> 12 & 15] + l[e >> 8 & 15] + l[e >> 20 & 15] + l[e >> 16 & 15] + l[e >> 28 & 15] + l[e >> 24 & 15];
            s % t == 0 && (L(r), o = 0);
        } return i && (e = r[o], a += l[e >> 4 & 15] + l[15 & e], i > 1 && (a += l[e >> 12 & 15] + l[e >> 8 & 15]), i > 2 && (a += l[e >> 20 & 15] + l[e >> 16 & 15])), a; }, C.prototype.arrayBuffer = function () { this.finalize(); var e, t = this.blockCount, r = this.s, n = this.outputBlocks, i = this.extraBytes, o = 0, s = 0, a = this.outputBits >> 3; e = i ? new ArrayBuffer(n + 1 << 2) : new ArrayBuffer(a); for (var c = new Uint32Array(e); s < n;) {
            for (o = 0; o < t && s < n; ++o, ++s)
                c[s] = r[o];
            s % t == 0 && L(r);
        } return i && (c[o] = r[o], e = e.slice(0, a)), e; }, C.prototype.buffer = C.prototype.arrayBuffer, C.prototype.digest = C.prototype.array = function () { this.finalize(); for (var e, t, r = this.blockCount, n = this.s, i = this.outputBlocks, o = this.extraBytes, s = 0, a = 0, c = []; a < i;) {
            for (s = 0; s < r && a < i; ++s, ++a)
                e = a << 2, t = n[s], c[e] = 255 & t, c[e + 1] = t >> 8 & 255, c[e + 2] = t >> 16 & 255, c[e + 3] = t >> 24 & 255;
            a % r == 0 && L(n);
        } return o && (e = a << 2, t = n[s], c[e] = 255 & t, o > 1 && (c[e + 1] = t >> 8 & 255), o > 2 && (c[e + 2] = t >> 16 & 255)), c; }, M.prototype = new C, M.prototype.finalize = function () { return this.encode(this.outputBits, !0), C.prototype.finalize.call(this); };
        var L = function (e) { var t, r, n, i, o, s, a, c, u, f, l, h, d, g, m, y, b, v, w, A, S, E, k, x, N, B, P, _, I, O, T, R, C, M, L, U, D, F, j, H, V, z, G, q, K, W, $, J, Z, X, Y, Q, ee, te, re, ne, ie, oe, se, ae, ce, ue, fe; for (n = 0; n < 48; n += 2)
            i = e[0] ^ e[10] ^ e[20] ^ e[30] ^ e[40], o = e[1] ^ e[11] ^ e[21] ^ e[31] ^ e[41], s = e[2] ^ e[12] ^ e[22] ^ e[32] ^ e[42], a = e[3] ^ e[13] ^ e[23] ^ e[33] ^ e[43], c = e[4] ^ e[14] ^ e[24] ^ e[34] ^ e[44], u = e[5] ^ e[15] ^ e[25] ^ e[35] ^ e[45], f = e[6] ^ e[16] ^ e[26] ^ e[36] ^ e[46], l = e[7] ^ e[17] ^ e[27] ^ e[37] ^ e[47], t = (h = e[8] ^ e[18] ^ e[28] ^ e[38] ^ e[48]) ^ (s << 1 | a >>> 31), r = (d = e[9] ^ e[19] ^ e[29] ^ e[39] ^ e[49]) ^ (a << 1 | s >>> 31), e[0] ^= t, e[1] ^= r, e[10] ^= t, e[11] ^= r, e[20] ^= t, e[21] ^= r, e[30] ^= t, e[31] ^= r, e[40] ^= t, e[41] ^= r, t = i ^ (c << 1 | u >>> 31), r = o ^ (u << 1 | c >>> 31), e[2] ^= t, e[3] ^= r, e[12] ^= t, e[13] ^= r, e[22] ^= t, e[23] ^= r, e[32] ^= t, e[33] ^= r, e[42] ^= t, e[43] ^= r, t = s ^ (f << 1 | l >>> 31), r = a ^ (l << 1 | f >>> 31), e[4] ^= t, e[5] ^= r, e[14] ^= t, e[15] ^= r, e[24] ^= t, e[25] ^= r, e[34] ^= t, e[35] ^= r, e[44] ^= t, e[45] ^= r, t = c ^ (h << 1 | d >>> 31), r = u ^ (d << 1 | h >>> 31), e[6] ^= t, e[7] ^= r, e[16] ^= t, e[17] ^= r, e[26] ^= t, e[27] ^= r, e[36] ^= t, e[37] ^= r, e[46] ^= t, e[47] ^= r, t = f ^ (i << 1 | o >>> 31), r = l ^ (o << 1 | i >>> 31), e[8] ^= t, e[9] ^= r, e[18] ^= t, e[19] ^= r, e[28] ^= t, e[29] ^= r, e[38] ^= t, e[39] ^= r, e[48] ^= t, e[49] ^= r, g = e[0], m = e[1], W = e[11] << 4 | e[10] >>> 28, $ = e[10] << 4 | e[11] >>> 28, _ = e[20] << 3 | e[21] >>> 29, I = e[21] << 3 | e[20] >>> 29, ae = e[31] << 9 | e[30] >>> 23, ce = e[30] << 9 | e[31] >>> 23, z = e[40] << 18 | e[41] >>> 14, G = e[41] << 18 | e[40] >>> 14, M = e[2] << 1 | e[3] >>> 31, L = e[3] << 1 | e[2] >>> 31, y = e[13] << 12 | e[12] >>> 20, b = e[12] << 12 | e[13] >>> 20, J = e[22] << 10 | e[23] >>> 22, Z = e[23] << 10 | e[22] >>> 22, O = e[33] << 13 | e[32] >>> 19, T = e[32] << 13 | e[33] >>> 19, ue = e[42] << 2 | e[43] >>> 30, fe = e[43] << 2 | e[42] >>> 30, te = e[5] << 30 | e[4] >>> 2, re = e[4] << 30 | e[5] >>> 2, U = e[14] << 6 | e[15] >>> 26, D = e[15] << 6 | e[14] >>> 26, v = e[25] << 11 | e[24] >>> 21, w = e[24] << 11 | e[25] >>> 21, X = e[34] << 15 | e[35] >>> 17, Y = e[35] << 15 | e[34] >>> 17, R = e[45] << 29 | e[44] >>> 3, C = e[44] << 29 | e[45] >>> 3, x = e[6] << 28 | e[7] >>> 4, N = e[7] << 28 | e[6] >>> 4, ne = e[17] << 23 | e[16] >>> 9, ie = e[16] << 23 | e[17] >>> 9, F = e[26] << 25 | e[27] >>> 7, j = e[27] << 25 | e[26] >>> 7, A = e[36] << 21 | e[37] >>> 11, S = e[37] << 21 | e[36] >>> 11, Q = e[47] << 24 | e[46] >>> 8, ee = e[46] << 24 | e[47] >>> 8, q = e[8] << 27 | e[9] >>> 5, K = e[9] << 27 | e[8] >>> 5, B = e[18] << 20 | e[19] >>> 12, P = e[19] << 20 | e[18] >>> 12, oe = e[29] << 7 | e[28] >>> 25, se = e[28] << 7 | e[29] >>> 25, H = e[38] << 8 | e[39] >>> 24, V = e[39] << 8 | e[38] >>> 24, E = e[48] << 14 | e[49] >>> 18, k = e[49] << 14 | e[48] >>> 18, e[0] = g ^ ~y & v, e[1] = m ^ ~b & w, e[10] = x ^ ~B & _, e[11] = N ^ ~P & I, e[20] = M ^ ~U & F, e[21] = L ^ ~D & j, e[30] = q ^ ~W & J, e[31] = K ^ ~$ & Z, e[40] = te ^ ~ne & oe, e[41] = re ^ ~ie & se, e[2] = y ^ ~v & A, e[3] = b ^ ~w & S, e[12] = B ^ ~_ & O, e[13] = P ^ ~I & T, e[22] = U ^ ~F & H, e[23] = D ^ ~j & V, e[32] = W ^ ~J & X, e[33] = $ ^ ~Z & Y, e[42] = ne ^ ~oe & ae, e[43] = ie ^ ~se & ce, e[4] = v ^ ~A & E, e[5] = w ^ ~S & k, e[14] = _ ^ ~O & R, e[15] = I ^ ~T & C, e[24] = F ^ ~H & z, e[25] = j ^ ~V & G, e[34] = J ^ ~X & Q, e[35] = Z ^ ~Y & ee, e[44] = oe ^ ~ae & ue, e[45] = se ^ ~ce & fe, e[6] = A ^ ~E & g, e[7] = S ^ ~k & m, e[16] = O ^ ~R & x, e[17] = T ^ ~C & N, e[26] = H ^ ~z & M, e[27] = V ^ ~G & L, e[36] = X ^ ~Q & q, e[37] = Y ^ ~ee & K, e[46] = ae ^ ~ue & te, e[47] = ce ^ ~fe & re, e[8] = E ^ ~g & y, e[9] = k ^ ~m & b, e[18] = R ^ ~x & B, e[19] = C ^ ~N & P, e[28] = z ^ ~M & U, e[29] = G ^ ~L & D, e[38] = Q ^ ~q & W, e[39] = ee ^ ~K & $, e[48] = ue ^ ~te & ne, e[49] = fe ^ ~re & ie, e[0] ^= p[n], e[1] ^= p[n + 1]; };
        if (c)
            e.exports = N;
        else {
            for (P = 0; P < B.length; ++P)
                s[B[P]] = N[B[P]];
            u && (void 0 === (n = function () { return N; }.call(t, r, t, e)) || (e.exports = n));
        }
    }(); }, 9746: function (e) { function t(e, t) { if (!e)
        throw new Error(t || "Assertion failed"); } e.exports = t, t.equal = function (e, t, r) { if (e != t)
        throw new Error(r || "Assertion failed: " + e + " != " + t); }; }, 4504: function (e, t) {
        "use strict";
        var r = t;
        function n(e) { return 1 === e.length ? "0" + e : e; }
        function i(e) { for (var t = "", r = 0; r < e.length; r++)
            t += n(e[r].toString(16)); return t; }
        r.toArray = function (e, t) { if (Array.isArray(e))
            return e.slice(); if (!e)
            return []; var r = []; if ("string" != typeof e) {
            for (var n = 0; n < e.length; n++)
                r[n] = 0 | e[n];
            return r;
        } if ("hex" === t)
            for ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e), n = 0; n < e.length; n += 2)
                r.push(parseInt(e[n] + e[n + 1], 16));
        else
            for (n = 0; n < e.length; n++) {
                var i = e.charCodeAt(n), o = i >> 8, s = 255 & i;
                o ? r.push(o, s) : r.push(s);
            } return r; }, r.zero2 = n, r.toHex = i, r.encode = function (e, t) { return "hex" === t ? i(e) : e; };
    }, 631: function (e, t, r) { var n = "function" == typeof Map && Map.prototype, i = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, o = n && i && "function" == typeof i.get ? i.get : null, s = n && Map.prototype.forEach, a = "function" == typeof Set && Set.prototype, c = Object.getOwnPropertyDescriptor && a ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, u = a && c && "function" == typeof c.get ? c.get : null, f = a && Set.prototype.forEach, l = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null, h = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null, d = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null, p = Boolean.prototype.valueOf, g = Object.prototype.toString, m = Function.prototype.toString, y = String.prototype.match, b = "function" == typeof BigInt ? BigInt.prototype.valueOf : null, v = Object.getOwnPropertySymbols, w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null, A = "function" == typeof Symbol && "object" == typeof Symbol.iterator, S = "function" == typeof Symbol && Symbol.toStringTag && (Symbol.toStringTag, 1) ? Symbol.toStringTag : null, E = Object.prototype.propertyIsEnumerable, k = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function (e) { return e.__proto__; } : null), x = r(4654).custom, N = x && I(x) ? x : null; function B(e, t, r) { var n = "double" === (r.quoteStyle || t) ? '"' : "'"; return n + e + n; } function P(e) { return String(e).replace(/"/g, "&quot;"); } function _(e) { return !("[object Array]" !== R(e) || S && "object" == typeof e && S in e); } function I(e) { if (A)
        return e && "object" == typeof e && e instanceof Symbol; if ("symbol" == typeof e)
        return !0; if (!e || "object" != typeof e || !w)
        return !1; try {
        return w.call(e), !0;
    }
    catch (e) { } return !1; } e.exports = function e(t, r, n, i) { var a = r || {}; if (T(a, "quoteStyle") && "single" !== a.quoteStyle && "double" !== a.quoteStyle)
        throw new TypeError('option "quoteStyle" must be "single" or "double"'); if (T(a, "maxStringLength") && ("number" == typeof a.maxStringLength ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : null !== a.maxStringLength))
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'); var c = !T(a, "customInspect") || a.customInspect; if ("boolean" != typeof c && "symbol" !== c)
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"); if (T(a, "indent") && null !== a.indent && "\t" !== a.indent && !(parseInt(a.indent, 10) === a.indent && a.indent > 0))
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`'); if (void 0 === t)
        return "undefined"; if (null === t)
        return "null"; if ("boolean" == typeof t)
        return t ? "true" : "false"; if ("string" == typeof t)
        return M(t, a); if ("number" == typeof t)
        return 0 === t ? 1 / 0 / t > 0 ? "0" : "-0" : String(t); if ("bigint" == typeof t)
        return String(t) + "n"; var g = void 0 === a.depth ? 5 : a.depth; if (void 0 === n && (n = 0), n >= g && g > 0 && "object" == typeof t)
        return _(t) ? "[Array]" : "[Object]"; var v, E = function (e, t) { var r; if ("\t" === e.indent)
        r = "\t";
    else {
        if (!("number" == typeof e.indent && e.indent > 0))
            return null;
        r = Array(e.indent + 1).join(" ");
    } return { base: r, prev: Array(t + 1).join(r) }; }(a, n); if (void 0 === i)
        i = [];
    else if (C(i, t) >= 0)
        return "[Circular]"; function x(t, r, o) { if (r && (i = i.slice()).push(r), o) {
        var s = { depth: a.depth };
        return T(a, "quoteStyle") && (s.quoteStyle = a.quoteStyle), e(t, s, n + 1, i);
    } return e(t, a, n + 1, i); } if ("function" == typeof t) {
        var O = function (e) { if (e.name)
            return e.name; var t = y.call(m.call(e), /^function\s*([\w$]+)/); return t ? t[1] : null; }(t), L = H(t, x);
        return "[Function" + (O ? ": " + O : " (anonymous)") + "]" + (L.length > 0 ? " { " + L.join(", ") + " }" : "");
    } if (I(t)) {
        var V = A ? String(t).replace(/^(Symbol\(.*\))_[^)]*$/, "$1") : w.call(t);
        return "object" != typeof t || A ? V : U(V);
    } if ((v = t) && "object" == typeof v && ("undefined" != typeof HTMLElement && v instanceof HTMLElement || "string" == typeof v.nodeName && "function" == typeof v.getAttribute)) {
        for (var z = "<" + String(t.nodeName).toLowerCase(), G = t.attributes || [], q = 0; q < G.length; q++)
            z += " " + G[q].name + "=" + B(P(G[q].value), "double", a);
        return z += ">", t.childNodes && t.childNodes.length && (z += "..."), z + "</" + String(t.nodeName).toLowerCase() + ">";
    } if (_(t)) {
        if (0 === t.length)
            return "[]";
        var K = H(t, x);
        return E && !function (e) { for (var t = 0; t < e.length; t++)
            if (C(e[t], "\n") >= 0)
                return !1; return !0; }(K) ? "[" + j(K, E) + "]" : "[ " + K.join(", ") + " ]";
    } if (function (e) { return !("[object Error]" !== R(e) || S && "object" == typeof e && S in e); }(t)) {
        var W = H(t, x);
        return 0 === W.length ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + W.join(", ") + " }";
    } if ("object" == typeof t && c) {
        if (N && "function" == typeof t[N])
            return t[N]();
        if ("symbol" !== c && "function" == typeof t.inspect)
            return t.inspect();
    } if (function (e) { if (!o || !e || "object" != typeof e)
        return !1; try {
        o.call(e);
        try {
            u.call(e);
        }
        catch (e) {
            return !0;
        }
        return e instanceof Map;
    }
    catch (e) { } return !1; }(t)) {
        var $ = [];
        return s.call(t, (function (e, r) { $.push(x(r, t, !0) + " => " + x(e, t)); })), F("Map", o.call(t), $, E);
    } if (function (e) { if (!u || !e || "object" != typeof e)
        return !1; try {
        u.call(e);
        try {
            o.call(e);
        }
        catch (e) {
            return !0;
        }
        return e instanceof Set;
    }
    catch (e) { } return !1; }(t)) {
        var J = [];
        return f.call(t, (function (e) { J.push(x(e, t)); })), F("Set", u.call(t), J, E);
    } if (function (e) { if (!l || !e || "object" != typeof e)
        return !1; try {
        l.call(e, l);
        try {
            h.call(e, h);
        }
        catch (e) {
            return !0;
        }
        return e instanceof WeakMap;
    }
    catch (e) { } return !1; }(t))
        return D("WeakMap"); if (function (e) { if (!h || !e || "object" != typeof e)
        return !1; try {
        h.call(e, h);
        try {
            l.call(e, l);
        }
        catch (e) {
            return !0;
        }
        return e instanceof WeakSet;
    }
    catch (e) { } return !1; }(t))
        return D("WeakSet"); if (function (e) { if (!d || !e || "object" != typeof e)
        return !1; try {
        return d.call(e), !0;
    }
    catch (e) { } return !1; }(t))
        return D("WeakRef"); if (function (e) { return !("[object Number]" !== R(e) || S && "object" == typeof e && S in e); }(t))
        return U(x(Number(t))); if (function (e) { if (!e || "object" != typeof e || !b)
        return !1; try {
        return b.call(e), !0;
    }
    catch (e) { } return !1; }(t))
        return U(x(b.call(t))); if (function (e) { return !("[object Boolean]" !== R(e) || S && "object" == typeof e && S in e); }(t))
        return U(p.call(t)); if (function (e) { return !("[object String]" !== R(e) || S && "object" == typeof e && S in e); }(t))
        return U(x(String(t))); if (!function (e) { return !("[object Date]" !== R(e) || S && "object" == typeof e && S in e); }(t) && !function (e) { return !("[object RegExp]" !== R(e) || S && "object" == typeof e && S in e); }(t)) {
        var Z = H(t, x), X = k ? k(t) === Object.prototype : t instanceof Object || t.constructor === Object, Y = t instanceof Object ? "" : "null prototype", Q = !X && S && Object(t) === t && S in t ? R(t).slice(8, -1) : Y ? "Object" : "", ee = (X || "function" != typeof t.constructor ? "" : t.constructor.name ? t.constructor.name + " " : "") + (Q || Y ? "[" + [].concat(Q || [], Y || []).join(": ") + "] " : "");
        return 0 === Z.length ? ee + "{}" : E ? ee + "{" + j(Z, E) + "}" : ee + "{ " + Z.join(", ") + " }";
    } return String(t); }; var O = Object.prototype.hasOwnProperty || function (e) { return e in this; }; function T(e, t) { return O.call(e, t); } function R(e) { return g.call(e); } function C(e, t) { if (e.indexOf)
        return e.indexOf(t); for (var r = 0, n = e.length; r < n; r++)
        if (e[r] === t)
            return r; return -1; } function M(e, t) { if (e.length > t.maxStringLength) {
        var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
        return M(e.slice(0, t.maxStringLength), t) + n;
    } return B(e.replace(/(['\\])/g, "\\$1").replace(/[\x00-\x1f]/g, L), "single", t); } function L(e) { var t = e.charCodeAt(0), r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[t]; return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + t.toString(16).toUpperCase(); } function U(e) { return "Object(" + e + ")"; } function D(e) { return e + " { ? }"; } function F(e, t, r, n) { return e + " (" + t + ") {" + (n ? j(r, n) : r.join(", ")) + "}"; } function j(e, t) { if (0 === e.length)
        return ""; var r = "\n" + t.prev + t.base; return r + e.join("," + r) + "\n" + t.prev; } function H(e, t) { var r = _(e), n = []; if (r) {
        n.length = e.length;
        for (var i = 0; i < e.length; i++)
            n[i] = T(e, i) ? t(e[i], e) : "";
    } var o, s = "function" == typeof v ? v(e) : []; if (A) {
        o = {};
        for (var a = 0; a < s.length; a++)
            o["$" + s[a]] = s[a];
    } for (var c in e)
        T(e, c) && (r && String(Number(c)) === c && c < e.length || A && o["$" + c] instanceof Symbol || (/[^\w$]/.test(c) ? n.push(t(c, e) + ": " + t(e[c], e)) : n.push(c + ": " + t(e[c], e)))); if ("function" == typeof v)
        for (var u = 0; u < s.length; u++)
            E.call(e, s[u]) && n.push("[" + t(s[u]) + "]: " + t(e[s[u]], e)); return n; } }, 8987: function (e, t, r) {
        "use strict";
        var n;
        if (!Object.keys) {
            var i = Object.prototype.hasOwnProperty, o = Object.prototype.toString, s = r(1414), a = Object.prototype.propertyIsEnumerable, c = !a.call({ toString: null }, "toString"), u = a.call((function () { }), "prototype"), f = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], l = function (e) { var t = e.constructor; return t && t.prototype === e; }, h = { $applicationCache: !0, $console: !0, $external: !0, $frame: !0, $frameElement: !0, $frames: !0, $innerHeight: !0, $innerWidth: !0, $onmozfullscreenchange: !0, $onmozfullscreenerror: !0, $outerHeight: !0, $outerWidth: !0, $pageXOffset: !0, $pageYOffset: !0, $parent: !0, $scrollLeft: !0, $scrollTop: !0, $scrollX: !0, $scrollY: !0, $self: !0, $webkitIndexedDB: !0, $webkitStorageInfo: !0, $window: !0 }, d = function () { if ("undefined" == typeof window)
                return !1; for (var e in window)
                try {
                    if (!h["$" + e] && i.call(window, e) && null !== window[e] && "object" == typeof window[e])
                        try {
                            l(window[e]);
                        }
                        catch (e) {
                            return !0;
                        }
                }
                catch (e) {
                    return !0;
                } return !1; }();
            n = function (e) { var t = null !== e && "object" == typeof e, r = "[object Function]" === o.call(e), n = s(e), a = t && "[object String]" === o.call(e), h = []; if (!t && !r && !n)
                throw new TypeError("Object.keys called on a non-object"); var p = u && r; if (a && e.length > 0 && !i.call(e, 0))
                for (var g = 0; g < e.length; ++g)
                    h.push(String(g)); if (n && e.length > 0)
                for (var m = 0; m < e.length; ++m)
                    h.push(String(m));
            else
                for (var y in e)
                    p && "prototype" === y || !i.call(e, y) || h.push(String(y)); if (c)
                for (var b = function (e) { if ("undefined" == typeof window || !d)
                    return l(e); try {
                    return l(e);
                }
                catch (e) {
                    return !1;
                } }(e), v = 0; v < f.length; ++v)
                    b && "constructor" === f[v] || !i.call(e, f[v]) || h.push(f[v]); return h; };
        }
        e.exports = n;
    }, 2215: function (e, t, r) {
        "use strict";
        var n = Array.prototype.slice, i = r(1414), o = Object.keys, s = o ? function (e) { return o(e); } : r(8987), a = Object.keys;
        s.shim = function () { if (Object.keys) {
            var e = function () { var e = Object.keys(arguments); return e && e.length === arguments.length; }(1, 2);
            e || (Object.keys = function (e) { return i(e) ? a(n.call(e)) : a(e); });
        }
        else
            Object.keys = s; return Object.keys || s; }, e.exports = s;
    }, 1414: function (e) {
        "use strict";
        var t = Object.prototype.toString;
        e.exports = function (e) { var r = t.call(e), n = "[object Arguments]" === r; return n || (n = "[object Array]" !== r && null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Function]" === t.call(e.callee)), n; };
    }, 2043: function (e, t) { !function (e) {
        "use strict";
        var t = (function () {
            function t() {
            }
            t.isArrayBuffer = function (e) { return "[object ArrayBuffer]" === Object.prototype.toString.call(e); };
            t.toArrayBuffer = function (e) { var t = this.toUint8Array(e); return t.byteOffset || t.length ? t.buffer.slice(t.byteOffset, t.byteOffset + t.length) : t.buffer; };
            t.toUint8Array = function (e) { return this.toView(e, Uint8Array); };
            t.toView = function (e, t) { if ("undefined" != typeof Buffer && Buffer.isBuffer(e))
                return new t(e.buffer, e.byteOffset, e.byteLength); if (this.isArrayBuffer(e))
                return new t(e); if (this.isArrayBufferView(e))
                return new t(e.buffer, e.byteOffset, e.byteLength); throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'"); };
            t.isBufferSource = function (e) { return this.isArrayBufferView(e) || this.isArrayBuffer(e); };
            t.isArrayBufferView = function (e) { return ArrayBuffer.isView(e) || e && this.isArrayBuffer(e.buffer); };
            t.isEqual = function (e, r) { var n = t.toUint8Array(e), i = t.toUint8Array(r); if (n.length !== i.byteLength)
                return !1; for (var e_55 = 0; e_55 < n.length; e_55++)
                if (n[e_55] !== i[e_55])
                    return !1; return !0; };
            return t;
        }());
        var r = (function () {
            function r() {
            }
            r.fromString = function (e) { var t = unescape(encodeURIComponent(e)), r = new Uint8Array(t.length); for (var e_56 = 0; e_56 < t.length; e_56++)
                r[e_56] = t.charCodeAt(e_56); return r.buffer; };
            r.toString = function (e) { var r = t.toUint8Array(e); var n = ""; for (var e_57 = 0; e_57 < r.length; e_57++)
                n += String.fromCharCode(r[e_57]); return decodeURIComponent(escape(n)); };
            return r;
        }());
        var n = (function () {
            function n() {
            }
            n.toString = function (e, r) {
                if (r === void 0) { r = !1; }
                var n = t.toArrayBuffer(e), i = new DataView(n);
                var o = "";
                for (var e_58 = 0; e_58 < n.byteLength; e_58 += 2) {
                    var t_56 = i.getUint16(e_58, r);
                    o += String.fromCharCode(t_56);
                }
                return o;
            };
            n.fromString = function (e, t) {
                if (t === void 0) { t = !1; }
                var r = new ArrayBuffer(2 * e.length), n = new DataView(r);
                for (var r_52 = 0; r_52 < e.length; r_52++)
                    n.setUint16(2 * r_52, e.charCodeAt(r_52), t);
                return r;
            };
            return n;
        }());
        var i = (function () {
            function i() {
            }
            i.isHex = function (e) { return "string" == typeof e && /^[a-z0-9]+$/i.test(e); };
            i.isBase64 = function (e) { return "string" == typeof e && /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e); };
            i.isBase64Url = function (e) { return "string" == typeof e && /^[a-zA-Z0-9-_]+$/i.test(e); };
            i.ToString = function (e, r) {
                if (r === void 0) { r = "utf8"; }
                var i = t.toUint8Array(e);
                switch (r.toLowerCase()) {
                    case "utf8": return this.ToUtf8String(i);
                    case "binary": return this.ToBinary(i);
                    case "hex": return this.ToHex(i);
                    case "base64": return this.ToBase64(i);
                    case "base64url": return this.ToBase64Url(i);
                    case "utf16le": return n.toString(i, !0);
                    case "utf16":
                    case "utf16be": return n.toString(i);
                    default: throw new Error("Unknown type of encoding '" + r + "'");
                }
            };
            i.FromString = function (e, t) {
                if (t === void 0) { t = "utf8"; }
                if (!e)
                    return new ArrayBuffer(0);
                switch (t.toLowerCase()) {
                    case "utf8": return this.FromUtf8String(e);
                    case "binary": return this.FromBinary(e);
                    case "hex": return this.FromHex(e);
                    case "base64": return this.FromBase64(e);
                    case "base64url": return this.FromBase64Url(e);
                    case "utf16le": return n.fromString(e, !0);
                    case "utf16":
                    case "utf16be": return n.fromString(e);
                    default: throw new Error("Unknown type of encoding '" + t + "'");
                }
            };
            i.ToBase64 = function (e) { var r = t.toUint8Array(e); if ("undefined" != typeof btoa) {
                var e_59 = this.ToString(r, "binary");
                return btoa(e_59);
            } return Buffer.from(r).toString("base64"); };
            i.FromBase64 = function (e) { var t = this.formatString(e); if (!t)
                return new ArrayBuffer(0); if (!i.isBase64(t))
                throw new TypeError("Argument 'base64Text' is not Base64 encoded"); return "undefined" != typeof atob ? this.FromBinary(atob(t)) : new Uint8Array(Buffer.from(t, "base64")).buffer; };
            i.FromBase64Url = function (e) { var t = this.formatString(e); if (!t)
                return new ArrayBuffer(0); if (!i.isBase64Url(t))
                throw new TypeError("Argument 'base64url' is not Base64Url encoded"); return this.FromBase64(this.Base64Padding(t.replace(/\-/g, "+").replace(/\_/g, "/"))); };
            i.ToBase64Url = function (e) { return this.ToBase64(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, ""); };
            i.FromUtf8String = function (e, t) {
                if (t === void 0) { t = i.DEFAULT_UTF8_ENCODING; }
                switch (t) {
                    case "ascii": return this.FromBinary(e);
                    case "utf8": return r.fromString(e);
                    case "utf16":
                    case "utf16be": return n.fromString(e);
                    case "utf16le":
                    case "usc2": return n.fromString(e, !0);
                    default: throw new Error("Unknown type of encoding '" + t + "'");
                }
            };
            i.ToUtf8String = function (e, t) {
                if (t === void 0) { t = i.DEFAULT_UTF8_ENCODING; }
                switch (t) {
                    case "ascii": return this.ToBinary(e);
                    case "utf8": return r.toString(e);
                    case "utf16":
                    case "utf16be": return n.toString(e);
                    case "utf16le":
                    case "usc2": return n.toString(e, !0);
                    default: throw new Error("Unknown type of encoding '" + t + "'");
                }
            };
            i.FromBinary = function (e) { var t = e.length, r = new Uint8Array(t); for (var n_33 = 0; n_33 < t; n_33++)
                r[n_33] = e.charCodeAt(n_33); return r.buffer; };
            i.ToBinary = function (e) { var r = t.toUint8Array(e); var n = ""; for (var e_60 = 0; e_60 < r.length; e_60++)
                n += String.fromCharCode(r[e_60]); return n; };
            i.ToHex = function (e) { var r = t.toUint8Array(e), n = [], i = r.length; for (var e_61 = 0; e_61 < i; e_61++) {
                var t_57 = r[e_61].toString(16).padStart(2, "0");
                n.push(t_57);
            } return n.join(""); };
            i.FromHex = function (e) { var t = this.formatString(e); if (!t)
                return new ArrayBuffer(0); if (!i.isHex(t))
                throw new TypeError("Argument 'hexString' is not HEX encoded"); t.length % 2 && (t = "0" + t); var r = new Uint8Array(t.length / 2); for (var e_62 = 0; e_62 < t.length; e_62 += 2) {
                var n_34 = t.slice(e_62, e_62 + 2);
                r[e_62 / 2] = parseInt(n_34, 16);
            } return r.buffer; };
            i.ToUtf16String = function (e, t) {
                if (t === void 0) { t = !1; }
                return n.toString(e, t);
            };
            i.FromUtf16String = function (e, t) {
                if (t === void 0) { t = !1; }
                return n.fromString(e, t);
            };
            i.Base64Padding = function (e) { var t = 4 - e.length % 4; if (t < 4)
                for (var r_53 = 0; r_53 < t; r_53++)
                    e += "="; return e; };
            i.formatString = function (e) { return (null == e ? void 0 : e.replace(/[\n\r\t ]/g, "")) || ""; };
            return i;
        }());
        i.DEFAULT_UTF8_ENCODING = "utf8", e.BufferSourceConverter = t, e.Convert = i, e.assign = function (e) {
            var t = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                t[_i - 1] = arguments[_i];
            }
            var r = arguments[0];
            for (var e_63 = 1; e_63 < arguments.length; e_63++) {
                var t_58 = arguments[e_63];
                for (var e_64 in t_58)
                    r[e_64] = t_58[e_64];
            }
            return r;
        }, e.combine = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            var t = e.map((function (e) { return e.byteLength; })).reduce((function (e, t) { return e + t; })), r = new Uint8Array(t);
            var n = 0;
            return e.map((function (e) { return new Uint8Array(e); })).forEach((function (e) { for (var _i = 0, e_65 = e; _i < e_65.length; _i++) {
                var t_59 = e_65[_i];
                r[n++] = t_59;
            } })), r.buffer;
        }, e.isEqual = function (e, t) { if (!e || !t)
            return !1; if (e.byteLength !== t.byteLength)
            return !1; var r = new Uint8Array(e), n = new Uint8Array(t); for (var t_60 = 0; t_60 < e.byteLength; t_60++)
            if (r[t_60] !== n[t_60])
                return !1; return !0; }, Object.defineProperty(e, "__esModule", { value: !0 });
    }(t); }, 3697: function (e) {
        "use strict";
        var t = Object, r = TypeError;
        e.exports = function () { if (null != this && this !== t(this))
            throw new r("RegExp.prototype.flags getter called on non-object"); var e = ""; return this.global && (e += "g"), this.ignoreCase && (e += "i"), this.multiline && (e += "m"), this.dotAll && (e += "s"), this.unicode && (e += "u"), this.sticky && (e += "y"), e; };
    }, 2847: function (e, t, r) {
        "use strict";
        var n = r(4289), i = r(5559), o = r(3697), s = r(1721), a = r(2753), c = i(o);
        n(c, { getPolyfill: s, implementation: o, shim: a }), e.exports = c;
    }, 1721: function (e, t, r) {
        "use strict";
        var n = r(3697), i = r(4289).supportsDescriptors, o = Object.getOwnPropertyDescriptor, s = TypeError;
        e.exports = function () { if (!i)
            throw new s("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors"); if ("gim" === /a/gim.flags) {
            var e = o(RegExp.prototype, "flags");
            if (e && "function" == typeof e.get && "boolean" == typeof /a/.dotAll)
                return e.get;
        } return n; };
    }, 2753: function (e, t, r) {
        "use strict";
        var n = r(4289).supportsDescriptors, i = r(1721), o = Object.getOwnPropertyDescriptor, s = Object.defineProperty, a = TypeError, c = Object.getPrototypeOf, u = /a/;
        e.exports = function () { if (!n || !c)
            throw new a("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors"); var e = i(), t = c(u), r = o(t, "flags"); return r && r.get === e || s(t, "flags", { configurable: !0, enumerable: !1, get: e }), e; };
    }, 7635: function (e) {
        "use strict";
        !function (t) { var r = 2147483647; function n(e) { var t = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]); var r = 1779033703, n = 3144134277, i = 1013904242, o = 2773480762, s = 1359893119, a = 2600822924, c = 528734635, u = 1541459225; var f = new Uint32Array(64); function l(e) { var l = 0, h = e.length; for (; h >= 64;) {
            var d_1 = void 0, p_1 = void 0, g_1 = void 0, m_1 = void 0, y_1 = void 0, b = r, v = n, w = i, A = o, S = s, E = a, k = c, x = u;
            for (p_1 = 0; p_1 < 16; p_1++)
                g_1 = l + 4 * p_1, f[p_1] = (255 & e[g_1]) << 24 | (255 & e[g_1 + 1]) << 16 | (255 & e[g_1 + 2]) << 8 | 255 & e[g_1 + 3];
            for (p_1 = 16; p_1 < 64; p_1++)
                d_1 = f[p_1 - 2], m_1 = (d_1 >>> 17 | d_1 << 15) ^ (d_1 >>> 19 | d_1 << 13) ^ d_1 >>> 10, d_1 = f[p_1 - 15], y_1 = (d_1 >>> 7 | d_1 << 25) ^ (d_1 >>> 18 | d_1 << 14) ^ d_1 >>> 3, f[p_1] = (m_1 + f[p_1 - 7] | 0) + (y_1 + f[p_1 - 16] | 0) | 0;
            for (p_1 = 0; p_1 < 64; p_1++)
                m_1 = (((S >>> 6 | S << 26) ^ (S >>> 11 | S << 21) ^ (S >>> 25 | S << 7)) + (S & E ^ ~S & k) | 0) + (x + (t[p_1] + f[p_1] | 0) | 0) | 0, y_1 = ((b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10)) + (b & v ^ b & w ^ v & w) | 0, x = k, k = E, E = S, S = A + m_1 | 0, A = w, w = v, v = b, b = m_1 + y_1 | 0;
            r = r + b | 0, n = n + v | 0, i = i + w | 0, o = o + A | 0, s = s + S | 0, a = a + E | 0, c = c + k | 0, u = u + x | 0, l += 64, h -= 64;
        } } l(e); var h, d = e.length % 64, p = e.length / 536870912 | 0, g = e.length << 3, m = d < 56 ? 56 : 120, y = e.slice(e.length - d, e.length); for (y.push(128), h = d + 1; h < m; h++)
            y.push(0); return y.push(p >>> 24 & 255), y.push(p >>> 16 & 255), y.push(p >>> 8 & 255), y.push(p >>> 0 & 255), y.push(g >>> 24 & 255), y.push(g >>> 16 & 255), y.push(g >>> 8 & 255), y.push(g >>> 0 & 255), l(y), [r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, r >>> 0 & 255, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n >>> 0 & 255, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, i >>> 0 & 255, o >>> 24 & 255, o >>> 16 & 255, o >>> 8 & 255, o >>> 0 & 255, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, s >>> 0 & 255, a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, a >>> 0 & 255, c >>> 24 & 255, c >>> 16 & 255, c >>> 8 & 255, c >>> 0 & 255, u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, u >>> 0 & 255]; } function i(e, t, r) { e = e.length <= 64 ? e : n(e); var i = 64 + t.length + 4, o = new Array(i), s = new Array(64); var a, c = []; for (a = 0; a < 64; a++)
            o[a] = 54; for (a = 0; a < e.length; a++)
            o[a] ^= e[a]; for (a = 0; a < t.length; a++)
            o[64 + a] = t[a]; for (a = i - 4; a < i; a++)
            o[a] = 0; for (a = 0; a < 64; a++)
            s[a] = 92; for (a = 0; a < e.length; a++)
            s[a] ^= e[a]; function u() { for (var e_66 = i - 1; e_66 >= i - 4; e_66--) {
            if (o[e_66]++, o[e_66] <= 255)
                return;
            o[e_66] = 0;
        } } for (; r >= 32;)
            u(), c = c.concat(n(s.concat(n(o)))), r -= 32; return r > 0 && (u(), c = c.concat(n(s.concat(n(o))).slice(0, r))), c; } function o(e, t, r, n, i) { var o; for (u(e, 16 * (2 * r - 1), i, 0, 16), o = 0; o < 2 * r; o++)
            c(e, 16 * o, i, 16), a(i, n), u(i, 0, e, t + 16 * o, 16); for (o = 0; o < r; o++)
            u(e, t + 2 * o * 16, e, 16 * o, 16); for (o = 0; o < r; o++)
            u(e, t + 16 * (2 * o + 1), e, 16 * (o + r), 16); } function s(e, t) { return e << t | e >>> 32 - t; } function a(e, t) { u(e, 0, t, 0, 16); for (var e_67 = 8; e_67 > 0; e_67 -= 2)
            t[4] ^= s(t[0] + t[12], 7), t[8] ^= s(t[4] + t[0], 9), t[12] ^= s(t[8] + t[4], 13), t[0] ^= s(t[12] + t[8], 18), t[9] ^= s(t[5] + t[1], 7), t[13] ^= s(t[9] + t[5], 9), t[1] ^= s(t[13] + t[9], 13), t[5] ^= s(t[1] + t[13], 18), t[14] ^= s(t[10] + t[6], 7), t[2] ^= s(t[14] + t[10], 9), t[6] ^= s(t[2] + t[14], 13), t[10] ^= s(t[6] + t[2], 18), t[3] ^= s(t[15] + t[11], 7), t[7] ^= s(t[3] + t[15], 9), t[11] ^= s(t[7] + t[3], 13), t[15] ^= s(t[11] + t[7], 18), t[1] ^= s(t[0] + t[3], 7), t[2] ^= s(t[1] + t[0], 9), t[3] ^= s(t[2] + t[1], 13), t[0] ^= s(t[3] + t[2], 18), t[6] ^= s(t[5] + t[4], 7), t[7] ^= s(t[6] + t[5], 9), t[4] ^= s(t[7] + t[6], 13), t[5] ^= s(t[4] + t[7], 18), t[11] ^= s(t[10] + t[9], 7), t[8] ^= s(t[11] + t[10], 9), t[9] ^= s(t[8] + t[11], 13), t[10] ^= s(t[9] + t[8], 18), t[12] ^= s(t[15] + t[14], 7), t[13] ^= s(t[12] + t[15], 9), t[14] ^= s(t[13] + t[12], 13), t[15] ^= s(t[14] + t[13], 18); for (var r_54 = 0; r_54 < 16; ++r_54)
            e[r_54] += t[r_54]; } function c(e, t, r, n) { for (var i_18 = 0; i_18 < n; i_18++)
            r[i_18] ^= e[t + i_18]; } function u(e, t, r, n, i) { for (; i--;)
            r[n++] = e[t++]; } function f(e) { if (!e || "number" != typeof e.length)
            return !1; for (var t_61 = 0; t_61 < e.length; t_61++) {
            var r_55 = e[t_61];
            if ("number" != typeof r_55 || r_55 % 1 || r_55 < 0 || r_55 >= 256)
                return !1;
        } return !0; } function l(e, t) { if ("number" != typeof e || e % 1)
            throw new Error("invalid " + t); return e; } function h(e, t, n, s, a, h, d) { if (n = l(n, "N"), s = l(s, "r"), a = l(a, "p"), h = l(h, "dkLen"), 0 === n || 0 != (n & n - 1))
            throw new Error("N must be power of 2"); if (n > r / 128 / s)
            throw new Error("N too large"); if (s > r / 128 / a)
            throw new Error("r too large"); if (!f(e))
            throw new Error("password must be an array or buffer"); if (e = Array.prototype.slice.call(e), !f(t))
            throw new Error("salt must be an array or buffer"); t = Array.prototype.slice.call(t); var p = i(e, t, 128 * a * s); var g = new Uint32Array(32 * a * s); for (var e_68 = 0; e_68 < g.length; e_68++) {
            var t_62 = 4 * e_68;
            g[e_68] = (255 & p[t_62 + 3]) << 24 | (255 & p[t_62 + 2]) << 16 | (255 & p[t_62 + 1]) << 8 | (255 & p[t_62 + 0]) << 0;
        } var m = new Uint32Array(64 * s), y = new Uint32Array(32 * s * n), b = 32 * s, v = new Uint32Array(16), w = new Uint32Array(16), A = a * n * 2; var S, E, k = 0, x = null, N = !1, B = 0, P = 0; var _ = d ? parseInt(1e3 / s) : 4294967295, I = "undefined" != typeof setImmediate ? setImmediate : setTimeout, O = function () { if (N)
            return d(new Error("cancelled"), k / A); var t; switch (B) {
            case 0: E = 32 * P * s, u(g, E, m, 0, b), B = 1, S = 0;
            case 1:
                t = n - S, t > _ && (t = _);
                for (var e_69 = 0; e_69 < t; e_69++)
                    u(m, 0, y, (S + e_69) * b, b), o(m, b, s, v, w);
                if (S += t, k += t, d) {
                    var e_70 = parseInt(1e3 * k / A);
                    if (e_70 !== x) {
                        if (N = d(null, k / A), N)
                            break;
                        x = e_70;
                    }
                }
                if (S < n)
                    break;
                S = 0, B = 2;
            case 2:
                t = n - S, t > _ && (t = _);
                for (var e_71 = 0; e_71 < t; e_71++) {
                    var e_72 = m[16 * (2 * s - 1)] & n - 1;
                    c(y, e_72 * b, m, b), o(m, b, s, v, w);
                }
                if (S += t, k += t, d) {
                    var e_73 = parseInt(1e3 * k / A);
                    if (e_73 !== x) {
                        if (N = d(null, k / A), N)
                            break;
                        x = e_73;
                    }
                }
                if (S < n)
                    break;
                if (u(m, 0, g, E, b), P++, P < a) {
                    B = 0;
                    break;
                }
                p = [];
                for (var e_74 = 0; e_74 < g.length; e_74++)
                    p.push(g[e_74] >> 0 & 255), p.push(g[e_74] >> 8 & 255), p.push(g[e_74] >> 16 & 255), p.push(g[e_74] >> 24 & 255);
                var r_56 = i(e, p, h);
                return d && d(null, 1, r_56), r_56;
        } d && I(O); }; if (!d)
            for (;;) {
                var e_75 = O();
                if (null != e_75)
                    return e_75;
            } O(); } var d = { scrypt: function (e, t, r, n, i, o, s) { return new Promise((function (a, c) { var u = 0; s && s(0), h(e, t, r, n, i, o, (function (e, t, r) { if (e)
                c(e);
            else if (r)
                s && 1 !== u && s(1), a(new Uint8Array(r));
            else if (s && t !== u)
                return u = t, s(t); })); })); }, syncScrypt: function (e, t, r, n, i, o) { return new Uint8Array(h(e, t, r, n, i, o)); } }; e.exports = d; }();
    }, 7478: function (e, t, r) {
        "use strict";
        var n = r(210), i = r(1924), o = r(631), s = n("%TypeError%"), a = n("%WeakMap%", !0), c = n("%Map%", !0), u = i("WeakMap.prototype.get", !0), f = i("WeakMap.prototype.set", !0), l = i("WeakMap.prototype.has", !0), h = i("Map.prototype.get", !0), d = i("Map.prototype.set", !0), p = i("Map.prototype.has", !0), g = function (e, t) { for (var r, n = e; null !== (r = n.next); n = r)
            if (r.key === t)
                return n.next = r.next, r.next = e.next, e.next = r, r; };
        e.exports = function () { var e, t, r, n = { assert: function (e) { if (!n.has(e))
                throw new s("Side channel does not contain " + o(e)); }, get: function (n) { if (a && n && ("object" == typeof n || "function" == typeof n)) {
                if (e)
                    return u(e, n);
            }
            else if (c) {
                if (t)
                    return h(t, n);
            }
            else if (r)
                return function (e, t) { var r = g(e, t); return r && r.value; }(r, n); }, has: function (n) { if (a && n && ("object" == typeof n || "function" == typeof n)) {
                if (e)
                    return l(e, n);
            }
            else if (c) {
                if (t)
                    return p(t, n);
            }
            else if (r)
                return function (e, t) { return !!g(e, t); }(r, n); return !1; }, set: function (n, i) { a && n && ("object" == typeof n || "function" == typeof n) ? (e || (e = new a), f(e, n, i)) : c ? (t || (t = new c), d(t, n, i)) : (r || (r = { key: {}, next: null }), function (e, t, r) { var n = g(e, t); n ? n.value = r : e.next = { key: t, next: e.next, value: r }; }(r, n, i)); } }; return n; };
    }, 9505: function (e, t, r) {
        "use strict";
        var n = r(581), i = r(1391), o = r(7364), s = r(840), a = r(6846), c = r(9619), u = r(1924), f = r(1405)(), l = r(2847), h = u("String.prototype.indexOf"), d = r(6966), p = function (e) { var t = d(); if (f && "symbol" == typeof Symbol.matchAll) {
            var r = o(e, Symbol.matchAll);
            return r === RegExp.prototype[Symbol.matchAll] && r !== t ? t : r;
        } if (s(e))
            return t; };
        e.exports = function (e) { var t = c(this); if (null != e) {
            if (s(e)) {
                var r = "flags" in e ? i(e, "flags") : l(e);
                if (c(r), h(a(r), "g") < 0)
                    throw new TypeError("matchAll requires a global regular expression");
            }
            var o = p(e);
            if (void 0 !== o)
                return n(o, e, [t]);
        } var u = a(t), f = new RegExp(e, "g"); return n(p(f), f, [u]); };
    }, 4956: function (e, t, r) {
        "use strict";
        var n = r(5559), i = r(4289), o = r(9505), s = r(3447), a = r(2376), c = n(o);
        i(c, { getPolyfill: s, implementation: o, shim: a }), e.exports = c;
    }, 6966: function (e, t, r) {
        "use strict";
        var n = r(1405)(), i = r(7201);
        e.exports = function () { return n && "symbol" == typeof Symbol.matchAll && "function" == typeof RegExp.prototype[Symbol.matchAll] ? RegExp.prototype[Symbol.matchAll] : i; };
    }, 3447: function (e, t, r) {
        "use strict";
        var n = r(9505);
        e.exports = function () { if (String.prototype.matchAll)
            try {
                "".matchAll(RegExp.prototype);
            }
            catch (e) {
                return String.prototype.matchAll;
            } return n; };
    }, 7201: function (e, t, r) {
        "use strict";
        var n = r(3937), i = r(1391), o = r(105), s = r(9655), a = r(8305), c = r(6846), u = r(3633), f = r(2847), l = RegExp, h = "flags" in RegExp.prototype, d = function (e) { var t = this; if ("Object" !== u(t))
            throw new TypeError('"this" value must be an Object'); var r = c(e), d = function (e, t) { var r = "flags" in t ? i(t, "flags") : c(f(t)); return { flags: r, matcher: new e(h && "string" == typeof r ? t : e === l ? t.source : t, r) }; }(s(t, l), t), p = d.flags, g = d.matcher, m = a(i(t, "lastIndex")); o(g, "lastIndex", m, !0); var y = p.indexOf("g") > -1, b = p.indexOf("u") > -1; return n(g, r, y, b); }, p = Object.defineProperty, g = Object.getOwnPropertyDescriptor;
        if (p && g) {
            var m = g(d, "name");
            m && m.configurable && p(d, "name", { value: "[Symbol.matchAll]" });
        }
        e.exports = d;
    }, 2376: function (e, t, r) {
        "use strict";
        var n = r(4289), i = r(1405)(), o = r(3447), s = r(6966), a = Object.defineProperty, c = Object.getOwnPropertyDescriptor;
        e.exports = function () { var e = o(); if (n(String.prototype, { matchAll: e }, { matchAll: function () { return String.prototype.matchAll !== e; } }), i) {
            var t = Symbol.matchAll || (Symbol.for ? Symbol.for("Symbol.matchAll") : Symbol("Symbol.matchAll"));
            if (n(Symbol, { matchAll: t }, { matchAll: function () { return Symbol.matchAll !== t; } }), a && c) {
                var r = c(Symbol, t);
                r && !r.configurable || a(Symbol, t, { configurable: !1, enumerable: !1, value: t, writable: !1 });
            }
            var u = s(), f = {};
            f[t] = u;
            var l = {};
            l[t] = function () { return RegExp.prototype[t] !== u; }, n(RegExp.prototype, f, l);
        } return e; };
    }, 6601: function () { }, 9214: function () { }, 4654: function () { }, 4800: function () { }, 1085: function () { }, 7912: function (e, t, r) {
        "use strict";
        var n = r(210)("%Array%"), i = !n.isArray && r(1924)("Object.prototype.toString");
        e.exports = n.isArray || function (e) { return "[object Array]" === i(e); };
    }, 4200: function (e, t, r) {
        "use strict";
        var n = r(210), i = r(2432), o = r(7312), s = r(3633), a = r(1645), c = n("%TypeError%");
        e.exports = function (e, t, r) { if ("String" !== s(e))
            throw new c("Assertion failed: `S` must be a String"); if (!o(t) || t < 0 || t > a)
            throw new c("Assertion failed: `length` must be an integer >= 0 and <= 2**53"); if ("Boolean" !== s(r))
            throw new c("Assertion failed: `unicode` must be a Boolean"); return r ? t + 1 >= e.length ? t + 1 : t + i(e, t)["[[CodeUnitCount]]"] : t + 1; };
    }, 581: function (e, t, r) {
        "use strict";
        var n = r(210), i = r(1924), o = n("%TypeError%"), s = r(6975), a = n("%Reflect.apply%", !0) || i("%Function.prototype.apply%");
        e.exports = function (e, t) { var r = arguments.length > 2 ? arguments[2] : []; if (!s(r))
            throw new o("Assertion failed: optional `argumentsList`, if provided, must be a List"); return a(e, t, r); };
    }, 2432: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(1924), o = r(9544), s = r(5424), a = r(3633), c = r(4857), u = i("String.prototype.charAt"), f = i("String.prototype.charCodeAt");
        e.exports = function (e, t) { if ("String" !== a(e))
            throw new n("Assertion failed: `string` must be a String"); var r = e.length; if (t < 0 || t >= r)
            throw new n("Assertion failed: `position` must be >= 0, and < the length of `string`"); var i = f(e, t), l = u(e, t), h = o(i), d = s(i); if (!h && !d)
            return { "[[CodePoint]]": l, "[[CodeUnitCount]]": 1, "[[IsUnpairedSurrogate]]": !1 }; if (d || t + 1 === r)
            return { "[[CodePoint]]": l, "[[CodeUnitCount]]": 1, "[[IsUnpairedSurrogate]]": !0 }; var p = f(e, t + 1); return s(p) ? { "[[CodePoint]]": c(i, p), "[[CodeUnitCount]]": 2, "[[IsUnpairedSurrogate]]": !1 } : { "[[CodePoint]]": l, "[[CodeUnitCount]]": 1, "[[IsUnpairedSurrogate]]": !0 }; };
    }, 2658: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(3633);
        e.exports = function (e, t) { if ("Boolean" !== i(t))
            throw new n("Assertion failed: Type(done) is not Boolean"); return { value: e, done: t }; };
    }, 7730: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(3682), o = r(8334), s = r(3746), a = r(4305), c = r(484), u = r(3633);
        e.exports = function (e, t, r) { if ("Object" !== u(e))
            throw new n("Assertion failed: Type(O) is not Object"); if (!a(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true"); return i(s, c, o, e, t, { "[[Configurable]]": !0, "[[Enumerable]]": !1, "[[Value]]": r, "[[Writable]]": !0 }); };
    }, 3937: function (e, t, r) {
        "use strict";
        var n = r(210), i = r(1405)(), o = n("%TypeError%"), s = n("%IteratorPrototype%", !0), a = n("%Object.defineProperty%", !0), c = r(4200), u = r(2658), f = r(7730), l = r(1391), h = r(953), d = r(6258), p = r(105), g = r(8305), m = r(6846), y = r(3633), b = r(9496), v = function (e, t, r, n) { if ("String" !== y(t))
            throw new o("`S` must be a string"); if ("Boolean" !== y(r))
            throw new o("`global` must be a boolean"); if ("Boolean" !== y(n))
            throw new o("`fullUnicode` must be a boolean"); b.set(this, "[[IteratingRegExp]]", e), b.set(this, "[[IteratedString]]", t), b.set(this, "[[Global]]", r), b.set(this, "[[Unicode]]", n), b.set(this, "[[Done]]", !1); };
        s && (v.prototype = h(s)), f(v.prototype, "next", (function () { var e = this; if ("Object" !== y(e))
            throw new o("receiver must be an object"); if (!(e instanceof v && b.has(e, "[[IteratingRegExp]]") && b.has(e, "[[IteratedString]]") && b.has(e, "[[Global]]") && b.has(e, "[[Unicode]]") && b.has(e, "[[Done]]")))
            throw new o('"this" value must be a RegExpStringIterator instance'); if (b.get(e, "[[Done]]"))
            return u(void 0, !0); var t = b.get(e, "[[IteratingRegExp]]"), r = b.get(e, "[[IteratedString]]"), n = b.get(e, "[[Global]]"), i = b.get(e, "[[Unicode]]"), s = d(t, r); if (null === s)
            return b.set(e, "[[Done]]", !0), u(void 0, !0); if (n) {
            if ("" === m(l(s, "0"))) {
                var a = g(l(t, "lastIndex")), f = c(r, a, i);
                p(t, "lastIndex", f, !0);
            }
            return u(s, !1);
        } return b.set(e, "[[Done]]", !0), u(s, !1); })), i && (Symbol.toStringTag && (a ? a(v.prototype, Symbol.toStringTag, { configurable: !0, enumerable: !1, value: "RegExp String Iterator", writable: !1 }) : v.prototype[Symbol.toStringTag] = "RegExp String Iterator"), Symbol.iterator && "function" != typeof v.prototype[Symbol.iterator]) && f(v.prototype, Symbol.iterator, (function () { return this; })), e.exports = function (e, t, r, n) { return new v(e, t, r, n); };
    }, 3950: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(2435), o = r(3682), s = r(8334), a = r(9527), c = r(3746), u = r(4305), f = r(484), l = r(9916), h = r(3633);
        e.exports = function (e, t, r) { if ("Object" !== h(e))
            throw new n("Assertion failed: Type(O) is not Object"); if (!u(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true"); var d = i({ Type: h, IsDataDescriptor: c, IsAccessorDescriptor: a }, r) ? r : l(r); if (!i({ Type: h, IsDataDescriptor: c, IsAccessorDescriptor: a }, d))
            throw new n("Assertion failed: Desc is not a valid Property Descriptor"); return o(c, f, s, e, t, d); };
    }, 8334: function (e, t, r) {
        "use strict";
        var n = r(2188), i = r(3633);
        e.exports = function (e) { if (void 0 === e)
            return e; n(i, "Property Descriptor", "Desc", e); var t = {}; return "[[Value]]" in e && (t.value = e["[[Value]]"]), "[[Writable]]" in e && (t.writable = e["[[Writable]]"]), "[[Get]]" in e && (t.get = e["[[Get]]"]), "[[Set]]" in e && (t.set = e["[[Set]]"]), "[[Enumerable]]" in e && (t.enumerable = e["[[Enumerable]]"]), "[[Configurable]]" in e && (t.configurable = e["[[Configurable]]"]), t; };
    }, 1391: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(631), o = r(4305), s = r(3633);
        e.exports = function (e, t) { if ("Object" !== s(e))
            throw new n("Assertion failed: Type(O) is not Object"); if (!o(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true, got " + i(t)); return e[t]; };
    }, 7364: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(8509), o = r(1787), s = r(4305);
        e.exports = function (e, t) { if (!s(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true"); var r = i(e, t); if (null != r) {
            if (!o(r))
                throw new n(t + "is not a function");
            return r;
        } };
    }, 8509: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(4305), o = r(821);
        e.exports = function (e, t) { if (!i(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true"); return o(e)[t]; };
    }, 9527: function (e, t, r) {
        "use strict";
        var n = r(7642), i = r(2188), o = r(3633);
        e.exports = function (e) { return void 0 !== e && (i(o, "Property Descriptor", "Desc", e), !(!n(e, "[[Get]]") && !n(e, "[[Set]]"))); };
    }, 6975: function (e, t, r) {
        "use strict";
        var n = r(210)("%Array%"), i = !n.isArray && r(1924)("Object.prototype.toString");
        e.exports = n.isArray || function (e) { return "[object Array]" === i(e); };
    }, 1787: function (e, t, r) {
        "use strict";
        e.exports = r(5320);
    }, 1974: function (e, t, r) {
        "use strict";
        var n = r(4445)("%Reflect.construct%", !0), i = r(3950);
        try {
            i({}, "", { "[[Get]]": function () { } });
        }
        catch (e) {
            i = null;
        }
        if (i && n) {
            var o = {}, s = {};
            i(s, "length", { "[[Get]]": function () { throw o; }, "[[Enumerable]]": !0 }), e.exports = function (e) { try {
                n(e, s);
            }
            catch (e) {
                return e === o;
            } };
        }
        else
            e.exports = function (e) { return "function" == typeof e && !!e.prototype; };
    }, 3746: function (e, t, r) {
        "use strict";
        var n = r(7642), i = r(2188), o = r(3633);
        e.exports = function (e) { return void 0 !== e && (i(o, "Property Descriptor", "Desc", e), !(!n(e, "[[Value]]") && !n(e, "[[Writable]]"))); };
    }, 7312: function (e, t, r) {
        "use strict";
        var n = r(4908), i = r(375), o = r(3633), s = r(9086), a = r(2633);
        e.exports = function (e) { if ("Number" !== o(e) || s(e) || !a(e))
            return !1; var t = n(e); return i(t) === t; };
    }, 4305: function (e) {
        "use strict";
        e.exports = function (e) { return "string" == typeof e || "symbol" == typeof e; };
    }, 840: function (e, t, r) {
        "use strict";
        var n = r(210)("%Symbol.match%", !0), i = r(8420), o = r(9731);
        e.exports = function (e) { if (!e || "object" != typeof e)
            return !1; if (n) {
            var t = e[n];
            if (void 0 !== t)
                return o(t);
        } return i(e); };
    }, 953: function (e, t, r) {
        "use strict";
        var n = r(210), i = n("%Object.create%", !0), o = n("%TypeError%"), s = n("%SyntaxError%"), a = r(6975), c = r(3633), u = !({ __proto__: null } instanceof Object);
        e.exports = function (e) { if (null !== e && "Object" !== c(e))
            throw new o("Assertion failed: `proto` must be null or an object"); var t = arguments.length < 2 ? [] : arguments[1]; if (!a(t))
            throw new o("Assertion failed: `additionalInternalSlotsList` must be an Array"); if (t.length > 0)
            throw new s("es-abstract does not yet support internal slots"); if (i)
            return i(e); if (u)
            return { __proto__: e }; if (null === e)
            throw new s("native Object.create support is required to create null objects"); var r = function () { }; return r.prototype = e, new r; };
    }, 6258: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(1924)("RegExp.prototype.exec"), o = r(581), s = r(1391), a = r(1787), c = r(3633);
        e.exports = function (e, t) { if ("Object" !== c(e))
            throw new n("Assertion failed: `R` must be an Object"); if ("String" !== c(t))
            throw new n("Assertion failed: `S` must be a String"); var r = s(e, "exec"); if (a(r)) {
            var u = o(r, e, [t]);
            if (null === u || "Object" === c(u))
                return u;
            throw new n('"exec" method must return `null` or an Object');
        } return i(e, t); };
    }, 9619: function (e, t, r) {
        "use strict";
        e.exports = r(4559);
    }, 484: function (e, t, r) {
        "use strict";
        var n = r(9086);
        e.exports = function (e, t) { return e === t ? 0 !== e || 1 / e == 1 / t : n(e) && n(t); };
    }, 105: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(4305), o = r(484), s = r(3633), a = function () { try {
            return delete [].length, !0;
        }
        catch (e) {
            return !1;
        } }();
        e.exports = function (e, t, r, c) { if ("Object" !== s(e))
            throw new n("Assertion failed: `O` must be an Object"); if (!i(t))
            throw new n("Assertion failed: `P` must be a Property Key"); if ("Boolean" !== s(c))
            throw new n("Assertion failed: `Throw` must be a Boolean"); if (c) {
            if (e[t] = r, a && !o(e[t], r))
                throw new n("Attempted to assign to readonly property.");
            return !0;
        } try {
            return e[t] = r, !a || o(e[t], r);
        }
        catch (e) {
            return !1;
        } };
    }, 9655: function (e, t, r) {
        "use strict";
        var n = r(210), i = n("%Symbol.species%", !0), o = n("%TypeError%"), s = r(1974), a = r(3633);
        e.exports = function (e, t) { if ("Object" !== a(e))
            throw new o("Assertion failed: Type(O) is not Object"); var r = e.constructor; if (void 0 === r)
            return t; if ("Object" !== a(r))
            throw new o("O.constructor is not an Object"); var n = i ? r[i] : void 0; if (null == n)
            return t; if (s(n))
            return n; throw new o("no constructor found"); };
    }, 9731: function (e) {
        "use strict";
        e.exports = function (e) { return !!e; };
    }, 751: function (e, t, r) {
        "use strict";
        var n = r(775), i = r(5631);
        e.exports = function (e) { var t = i(e); return 0 !== t && (t = n(t)), 0 === t ? 0 : t; };
    }, 8305: function (e, t, r) {
        "use strict";
        var n = r(1645), i = r(751);
        e.exports = function (e) { var t = i(e); return t <= 0 ? 0 : t > n ? n : t; };
    }, 5631: function (e, t, r) {
        "use strict";
        var n = r(210), i = n("%TypeError%"), o = n("%Number%"), s = n("%RegExp%"), a = n("%parseInt%"), c = r(1924), u = r(823), f = r(4790), l = c("String.prototype.slice"), h = u(/^0b[01]+$/i), d = u(/^0o[0-7]+$/i), p = u(/^[-+]0x[0-9a-f]+$/i), g = u(new s("[" + ["", "​", "￾"].join("") + "]", "g")), m = ["\t\n\v\f\r   ᠎    ", "         　\u2028", "\u2029\ufeff"].join(""), y = new RegExp("(^[" + m + "]+)|([" + m + "]+$)", "g"), b = c("String.prototype.replace"), v = r(4607);
        e.exports = function e(t) { var r = f(t) ? t : v(t, o); if ("symbol" == typeof r)
            throw new i("Cannot convert a Symbol value to a number"); if ("bigint" == typeof r)
            throw new i("Conversion from 'BigInt' to 'number' is not allowed."); if ("string" == typeof r) {
            if (h(r))
                return e(a(l(r, 2), 2));
            if (d(r))
                return e(a(l(r, 2), 8));
            if (g(r) || p(r))
                return NaN;
            var n = function (e) { return b(e, y, ""); }(r);
            if (n !== r)
                return e(n);
        } return o(r); };
    }, 821: function (e, t, r) {
        "use strict";
        var n = r(210)("%Object%"), i = r(9619);
        e.exports = function (e) { return i(e), n(e); };
    }, 4607: function (e, t, r) {
        "use strict";
        var n = r(1503);
        e.exports = function (e) { return arguments.length > 1 ? n(e, arguments[1]) : n(e); };
    }, 9916: function (e, t, r) {
        "use strict";
        var n = r(7642), i = r(210)("%TypeError%"), o = r(3633), s = r(9731), a = r(1787);
        e.exports = function (e) { if ("Object" !== o(e))
            throw new i("ToPropertyDescriptor requires an object"); var t = {}; if (n(e, "enumerable") && (t["[[Enumerable]]"] = s(e.enumerable)), n(e, "configurable") && (t["[[Configurable]]"] = s(e.configurable)), n(e, "value") && (t["[[Value]]"] = e.value), n(e, "writable") && (t["[[Writable]]"] = s(e.writable)), n(e, "get")) {
            var r = e.get;
            if (void 0 !== r && !a(r))
                throw new i("getter must be a function");
            t["[[Get]]"] = r;
        } if (n(e, "set")) {
            var c = e.set;
            if (void 0 !== c && !a(c))
                throw new i("setter must be a function");
            t["[[Set]]"] = c;
        } if ((n(t, "[[Get]]") || n(t, "[[Set]]")) && (n(t, "[[Value]]") || n(t, "[[Writable]]")))
            throw new i("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute"); return t; };
    }, 6846: function (e, t, r) {
        "use strict";
        var n = r(210), i = n("%String%"), o = n("%TypeError%");
        e.exports = function (e) { if ("symbol" == typeof e)
            throw new o("Cannot convert a Symbol value to a string"); return i(e); };
    }, 3633: function (e, t, r) {
        "use strict";
        var n = r(3951);
        e.exports = function (e) { return "symbol" == typeof e ? "Symbol" : "bigint" == typeof e ? "BigInt" : n(e); };
    }, 4857: function (e, t, r) {
        "use strict";
        var n = r(210), i = n("%TypeError%"), o = n("%String.fromCharCode%"), s = r(9544), a = r(5424);
        e.exports = function (e, t) { if (!s(e) || !a(t))
            throw new i("Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code"); return o(e) + o(t); };
    }, 4908: function (e, t, r) {
        "use strict";
        var n = r(210)("%Math.abs%");
        e.exports = function (e) { return n(e); };
    }, 375: function (e) {
        "use strict";
        var t = Math.floor;
        e.exports = function (e) { return t(e); };
    }, 4559: function (e, t, r) {
        "use strict";
        var n = r(210)("%TypeError%");
        e.exports = function (e, t) { if (null == e)
            throw new n(t || "Cannot call method on " + e); return e; };
    }, 775: function (e, t, r) {
        "use strict";
        var n = r(7890), i = r(2748), o = r(7709), s = r(9086), a = r(2633), c = r(8111);
        e.exports = function (e) { var t = o(e); return s(t) ? 0 : 0 !== t && a(t) ? c(t) * i(n(t)) : t; };
    }, 7709: function (e, t, r) {
        "use strict";
        var n = r(1950);
        e.exports = function (e) { var t = n(e, Number); if ("string" != typeof t)
            return +t; var r = t.replace(/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g, ""); return /^0[ob]|^[+-]0x/.test(r) ? NaN : +r; };
    }, 1950: function (e, t, r) {
        "use strict";
        e.exports = r(2116);
    }, 3951: function (e) {
        "use strict";
        e.exports = function (e) { return null === e ? "Null" : void 0 === e ? "Undefined" : "function" == typeof e || "object" == typeof e ? "Object" : "number" == typeof e ? "Number" : "boolean" == typeof e ? "Boolean" : "string" == typeof e ? "String" : void 0; };
    }, 7890: function (e, t, r) {
        "use strict";
        var n = r(210)("%Math.abs%");
        e.exports = function (e) { return n(e); };
    }, 2748: function (e) {
        "use strict";
        var t = Math.floor;
        e.exports = function (e) { return t(e); };
    }, 4445: function (e, t, r) {
        "use strict";
        e.exports = r(210);
    }, 3682: function (e, t, r) {
        "use strict";
        var n = r(210)("%Object.defineProperty%", !0);
        if (n)
            try {
                n({}, "a", { value: 1 });
            }
            catch (e) {
                n = null;
            }
        var i = Object.defineProperty && 0 === Object.defineProperty([], "length", { value: 1 }).length, o = i && r(7912), s = r(1924)("Object.prototype.propertyIsEnumerable");
        e.exports = function (e, t, r, a, c, u) { if (!n) {
            if (!e(u))
                return !1;
            if (!u["[[Configurable]]"] || !u["[[Writable]]"])
                return !1;
            if (c in a && s(a, c) !== !!u["[[Enumerable]]"])
                return !1;
            var f = u["[[Value]]"];
            return a[c] = f, t(a[c], f);
        } return i && "length" === c && "[[Value]]" in u && o(a) && a.length !== u["[[Value]]"] ? (a.length = u["[[Value]]"], a.length === u["[[Value]]"]) : (n(a, c, r(u)), !0); };
    }, 2188: function (e, t, r) {
        "use strict";
        var n = r(210), i = n("%TypeError%"), o = n("%SyntaxError%"), s = r(7642), a = { "Property Descriptor": function (e, t) { if ("Object" !== e(t))
                return !1; var r = { "[[Configurable]]": !0, "[[Enumerable]]": !0, "[[Get]]": !0, "[[Set]]": !0, "[[Value]]": !0, "[[Writable]]": !0 }; for (var n in t)
                if (s(t, n) && !r[n])
                    return !1; var o = s(t, "[[Value]]"), a = s(t, "[[Get]]") || s(t, "[[Set]]"); if (o && a)
                throw new i("Property Descriptors may not be both accessor and data descriptors"); return !0; } };
        e.exports = function (e, t, r, n) { var s = a[t]; if ("function" != typeof s)
            throw new o("unknown record type: " + t); if (!s(e, n))
            throw new i(r + " must be a " + t); };
    }, 2633: function (e) {
        "use strict";
        var t = Number.isNaN || function (e) { return e != e; };
        e.exports = Number.isFinite || function (e) { return "number" == typeof e && !t(e) && e !== 1 / 0 && e !== -1 / 0; };
    }, 9544: function (e) {
        "use strict";
        e.exports = function (e) { return "number" == typeof e && e >= 55296 && e <= 56319; };
    }, 9086: function (e) {
        "use strict";
        e.exports = Number.isNaN || function (e) { return e != e; };
    }, 4790: function (e) {
        "use strict";
        e.exports = function (e) { return null === e || "function" != typeof e && "object" != typeof e; };
    }, 2435: function (e, t, r) {
        "use strict";
        var n = r(210), i = r(7642), o = n("%TypeError%");
        e.exports = function (e, t) { if ("Object" !== e.Type(t))
            return !1; var r = { "[[Configurable]]": !0, "[[Enumerable]]": !0, "[[Get]]": !0, "[[Set]]": !0, "[[Value]]": !0, "[[Writable]]": !0 }; for (var n in t)
            if (i(t, n) && !r[n])
                return !1; if (e.IsDataDescriptor(t) && e.IsAccessorDescriptor(t))
            throw new o("Property Descriptors may not be both accessor and data descriptors"); return !0; };
    }, 5424: function (e) {
        "use strict";
        e.exports = function (e) { return "number" == typeof e && e >= 56320 && e <= 57343; };
    }, 1645: function (e, t, r) {
        "use strict";
        var n = r(210), i = n("%Math%"), o = n("%Number%");
        e.exports = o.MAX_SAFE_INTEGER || i.pow(2, 53) - 1;
    }, 823: function (e, t, r) {
        "use strict";
        var n = r(210)("RegExp.prototype.test"), i = r(5559);
        e.exports = function (e) { return i(n, e); };
    }, 8111: function (e) {
        "use strict";
        e.exports = function (e) { return e >= 0 ? 1 : -1; };
    }, 8597: function (e) {
        "use strict";
        e.exports = { i8: "6.5.4" };
    } }, t = {}; function r(n) { var i = t[n]; if (void 0 !== i)
    return i.exports; var o = t[n] = { id: n, loaded: !1, exports: {} }; return e[n].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports; } r.amdO = {}, r.n = function (e) { var t = e && e.__esModule ? function () { return e.default; } : function () { return e; }; return r.d(t, { a: t }), t; }, r.d = function (e, t) { for (var n in t)
    r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] }); }, r.g = function () { if ("object" == typeof globalThis)
    return globalThis; try {
    return this || new Function("return this")();
}
catch (e) {
    if ("object" == typeof window)
        return window;
} }(), r.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t); }, r.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }, r.nmd = function (e) { return (e.paths = [], e.children || (e.children = []), e); }, (function () {
    "use strict";
    var e = {};
    r.r(e), r.d(e, { Any: function () { return je; }, BaseBlock: function () { return G; }, BitString: function () { return oe; }, BmpString: function () { return be; }, Boolean: function () { return Y; }, CharacterString: function () { return Oe; }, Choice: function () { return Fe; }, Constructed: function () { return $; }, DATE: function () { return Ce; }, DateTime: function () { return Le; }, Duration: function () { return Ue; }, EndOfContent: function () { return Z; }, Enumerated: function () { return ce; }, GeneralString: function () { return Ie; }, GeneralizedTime: function () { return Re; }, GraphicString: function () { return Pe; }, HexBlock: function () { return j; }, IA5String: function () { return Be; }, Integer: function () { return ae; }, Null: function () { return te; }, NumericString: function () { return Ee; }, ObjectIdentifier: function () { return le; }, OctetString: function () { return ne; }, Primitive: function () { return K; }, PrintableString: function () { return ke; }, RawData: function () { return Ve; }, RelativeObjectIdentifier: function () { return me; }, Repeated: function () { return He; }, Sequence: function () { return Q; }, Set: function () { return ee; }, TIME: function () { return De; }, TeletexString: function () { return xe; }, TimeOfDay: function () { return Me; }, UTCTime: function () { return Te; }, UniversalString: function () { return we; }, Utf8String: function () { return de; }, ValueBlock: function () { return z; }, VideotexString: function () { return Ne; }, VisibleString: function () { return _e; }, compareSchema: function () { return qe; }, fromBER: function () { return Ge; }, fromJSON: function () { return We; }, verifySchema: function () { return Ke; } });
    var t = r(1094);
    function n(e) { for (var t = "", r = 0; r < e.length; r++)
        t += "" + e.charCodeAt(r).toString(16); return t; }
    function i(e) {
        if (e === void 0) { e = ""; }
        "0x" === e.substr(0, 2).toLowerCase() && (e = e.substr(2));
        var t = [], r = __spreadArray([], e, true);
        r.length % 2 && r.unshift("0");
        var n, i = "";
        if (!r || void 0 === r || !r.length)
            return [];
        for (; r.length;) {
            if (i = "", i += r.shift() + r.shift(), n = parseInt(i, 16), isNaN(n))
                throw new Error("hexStringToArray input is not a hex string.");
            t.push(n);
        }
        return t;
    }
    function o(e) {
        if (e === void 0) { e = ""; }
        return Uint8Array.from(i(e));
    }
    function s(e) {
        if (e === void 0) { e = ""; }
        return p(o(e)).split("/").join("_").split("+").join("-");
    }
    function a(e, t) {
        if (t === void 0) { t = x.P; }
        var r = e % t;
        return r >= 0n ? r : t + r;
    }
    function c(e, t) {
        if (t === void 0) { t = x.P; }
        if (0n === e || t <= 0n)
            throw new Error("invert: expected positive integers");
        var _a = function (e, t) {
            var _a, _b, _c;
            var _d = [0n, 1n, 1n, 0n], r = _d[0], n = _d[1], i = _d[2], o = _d[3];
            for (; 0n !== e;) {
                var _f = [t / e, t % e], s_9 = _f[0], a_10 = _f[1], _g = [r - i * s_9, n - o * s_9], c_5 = _g[0], u_2 = _g[1];
                _a = [e, a_10], t = _a[0], e = _a[1], (_b = [i, o], r = _b[0], n = _b[1]), (_c = [c_5, u_2], i = _c[0], o = _c[1]);
            }
            return [t, r, n];
        }(a(e, t), t), r = _a[0], n = _a[1];
        if (1n !== r)
            throw new Error("invert: does not exist");
        return a(n, t);
    }
    function u(e) { return function (e) { var t = []; return Uint8Array.from(e).forEach((function (e) { var r = e.toString(16); r.length % 2 && (r = "0" + r), t.push(r); })), BigInt("0x" + t.join("")); }(e); }
    function f(e) { return l(e); }
    function l(e, t) {
        if (t === void 0) { t = 0; }
        var r = BigInt(e).toString(16).padStart(2 * t, "0");
        r.length % 2 && (r = "0" + r);
        for (var n = r.length / 2, i = new Uint8Array(n), o = 0, s = 0; o < n;)
            i[o] = parseInt(r.slice(s, s + 2), 16), o += 1, s += 2;
        return i;
    }
    function h(e) { if (1 === e.length)
        return e[0]; var t = Uint8Array.from([]); if (0 === e.length)
        return t; for (var r_57 = 0; r_57 < e.length; r_57++) {
        if ("object" != typeof e[r_57] || "number" != typeof e[r_57].length)
            throw new Error("wrong input values");
        var n_35 = Uint8Array.from(e[r_57]);
        if (!n_35 || !n_35.length)
            continue;
        var i_19 = new Uint8Array(t.length + n_35.length);
        i_19.set(t), i_19.set(n_35, t.length), t = i_19;
    } return t; }
    function d(e) { if (!e)
        return ""; var t = "", r = e.byteLength; for (var n_36 = 0; n_36 < r; n_36++)
        t += String.fromCharCode(e[n_36]); return t; }
    function p(e) { var t = d(e); return "undefined" != typeof window && window.btoa ? window.btoa(t) : new Buffer(t).toString("base64"); }
    function g(e) { var t; return e = function (e) { var t = e.split(/\r?\n/); for (; "" === t[t.length - 1].trim();)
        t.pop(); return "---" === e.slice(0, 3) && (t.shift(), t.pop()), (e = t.join("")).split("_").join("/").split("-").join("+").split(".").join("="); }(e), t = "undefined" != typeof window && window.atob ? Uint8Array.from(atob(e), (function (e) { return e.charCodeAt(0); })) : Uint8Array.from(Buffer.from(e, "base64")), t; }
    function m(e) { for (var t = [], r = 0; r < e.length; r++)
        t.push(e.charCodeAt(r)); return t; }
    function y(e, t, r) { var n = 1n, i = e; for (; t > 0n;)
        1n & t && (n = n * i % r), i = i * i % r, t >>= 1n; return n; }
    function b(e) { return e && e.length ? Array.from(e).map((function (e) { return ("0" + e.toString(16)).slice(-2); })).join("") : ""; }
    function v(e) { return "undefined" != typeof Buffer ? Buffer.from(e) : e; }
    function w(e) { var t = Math.floor(e / Math.pow(2, 32)); return new Uint8Array([t, t << 8, t << 16, t << 24, e, e << 8, e << 16, e << 24].map((function (e) { return e >>> 24; }))); }
    function A(e) { return function (e) { var r = Array.from(e); return h([new Uint8Array(32), new Uint8Array(i(t.keccak256(r)))]).slice(-32); }(Uint8Array.from(m(e))); }
    function S(e) {
        var t = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            t[_i - 1] = arguments[_i];
        }
        e > 1 || console.log.apply(console, t);
    }
    var E = { P: Math.pow(2n, 256n) - Math.pow(2n, 32n) - 977n, n: Math.pow(2n, 256n) - 432420386565659656852420866394968145599n, magicExp: (Math.pow(2n, 256n) - Math.pow(2n, 32n) - 977n + 1n) / 4n, A: 0n, B: 7n }, k = { p256: { P: BigInt("0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF"), A: BigInt("0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC"), B: BigInt("0x5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B"), n: BigInt("0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551"), GX: BigInt("0x6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296"), GY: BigInt("0x4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5"), h: 1n }, secp256k1: { P: Math.pow(2n, 256n) - Math.pow(2n, 32n) - 977n, A: 0n, B: 7n, n: Math.pow(2n, 256n) - 432420386565659656852420866394968145599n, GX: 55066263022277343669578718895168534326250603453777594175500187360389116729240n, GY: 32670510020758816978083085130507043184471273380659243275938904335757337482424n }, BN256: { P: 115792089237314936872688561244471742058375878355761205198700409522629664518163n, n: 115792089237314936872688561244471742058035595988840268584488757999429535617037n, magicExp: 115792089237314936872688561244471742058375878355761205198700409522629664518164n >> 2n, A: 0n, B: 3n, h: 1n } }, x = { P: 21888242871839275222246405745257275088696311157297823662689037894645226208583n, n: 21888242871839275222246405745257275088548364400416034343698204186575808495617n, A: 0n, B: 3n, h: 1n };
    var N = (function () {
        function N(e, t, r) {
            if (r === void 0) { r = k.secp256r1; }
            this.x = e, this.y = t, this.useCurve = r;
        }
        N.prototype.double = function () { var e = this.x, t = this.y, r = a(3n * Math.pow(e, 2n) * c(2n * t, this.useCurve.P), this.useCurve.P), n = a(r * r - 2n * e, this.useCurve.P), i = a(r * (e - n) - t, this.useCurve.P); return new N(n, i, this.useCurve); };
        N.prototype.newZero = function () { return new N(0n, 0n, this.useCurve); };
        N.prototype.add = function (e) { var _a = [this, e], t = _a[0], r = _a[1], _b = [t.x, t.y, r.x, r.y], n = _b[0], i = _b[1], o = _b[2], s = _b[3]; if (0n === n || 0n === i)
            return r; if (0n === o || 0n === s)
            return t; if (n === o && i === s)
            return this.double(); if (n === o && i === -s)
            return this.newZero(); var u = a((s - i) * c(o - n, this.useCurve.P), this.useCurve.P), f = a(u * u - n - o, this.useCurve.P), l = a(u * (n - f) - i, this.useCurve.P); return new N(f, l, this.useCurve); };
        N.prototype.multiplyDA = function (e) { var t = this.newZero(), r = this; for (; e > 0n;)
            1n & e && (t = t.add(r)), r = r.double(), e >>= 1n; return t; };
        N.prototype.isInfinity = function () { return null == this.x || null == this.y; };
        N.prototype.getEncoded = function (e) {
            if (e === void 0) { e = !1; }
            if (this.isInfinity())
                return new Uint8Array(0);
            var t = l(this.x, 32);
            return h(e ? [Uint8Array.from([2]), t] : [Uint8Array.from([4]), t, l(this.y, 32)]);
        };
        N.prototype.equals = function (e) { if (null == e)
            return !1; var t = this.isInfinity(), r = e.isInfinity(); if (t || r)
            return t && r; var n = e; return this.x === n.x && this.y === n.y; };
        N.decodeFromHex = function (e, t) {
            if (t === void 0) { t = E; }
            if (130 != e.length)
                throw new Error("only decompressed points allowed. 65 bytes.");
            return N.decodeFromUint8(o(e), t);
        };
        N.decodeFromUint8 = function (e, t) {
            if (t === void 0) { t = E; }
            if (65 != e.length)
                throw new Error("only decompressed points allowed. 65 bytes.");
            var r;
            if (4 !== e[0])
                throw new Error("only decompressed points allowed");
            {
                var n_37 = u(e.slice(1, 33)), i_20 = u(e.slice(33));
                r = new N(n_37, i_20, t);
            }
            if (!r.validate()) {
                var e_76 = "Point is not valid (" + r.x.toString(16) + "," + r.y.toString(16) + ")";
                throw S(1, e_76), new Error(e_76);
            }
            return r;
        };
        N.prototype.validate = function () { return 0n == a(a(this.y * this.y, this.useCurve.P) - a(y(this.x, 3n, this.useCurve.P) + a(this.x * this.useCurve.A, this.useCurve.P) + this.useCurve.B, this.useCurve.P), this.useCurve.P); };
        N.prototype.negate = function () { return new N(this.x, this.useCurve.P - this.y, this.useCurve); };
        N.prototype.subtract = function (e) { return this.add(e.negate()); };
        return N;
    }());
    function B(e, t, r) { return e instanceof Object == 0 ? r : t in e ? e[t] : r; }
    function P(e, t, r, n) {
        if (t === void 0) { t = 0; }
        if (r === void 0) { r = e.byteLength - t; }
        if (n === void 0) { n = !1; }
        var i = "";
        for (var _i = 0, _a = new Uint8Array(e, t, r); _i < _a.length; _i++) {
            var o_9 = _a[_i];
            var e_77 = o_9.toString(16).toUpperCase();
            1 === e_77.length && (i += "0"), i += e_77, n && (i += " ");
        }
        return i.trim();
    }
    function _(e, t, r, n) { return t instanceof ArrayBuffer == 0 ? (e.error = 'Wrong parameter: inputBuffer must be "ArrayBuffer"', !1) : 0 === t.byteLength ? (e.error = "Wrong parameter: inputBuffer has zero length", !1) : r < 0 ? (e.error = "Wrong parameter: inputOffset less than zero", !1) : n < 0 ? (e.error = "Wrong parameter: inputLength less than zero", !1) : !(t.byteLength - r - n < 0 && (e.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", 1)); }
    function I(e, t) { var r = 0; if (1 === e.length)
        return e[0]; for (var n_38 = e.length - 1; n_38 >= 0; n_38--)
        r += e[e.length - 1 - n_38] * Math.pow(2, t * n_38); return r; }
    function O(e, t, r) {
        if (r === void 0) { r = -1; }
        var n = r;
        var i = e, o = 0, s = Math.pow(2, t);
        for (var r_58 = 1; r_58 < 8; r_58++) {
            if (e < s) {
                var e_78 = void 0;
                if (n < 0)
                    e_78 = new ArrayBuffer(r_58), o = r_58;
                else {
                    if (n < r_58)
                        return new ArrayBuffer(0);
                    e_78 = new ArrayBuffer(n), o = n;
                }
                var s_10 = new Uint8Array(e_78);
                for (var e_79 = r_58 - 1; e_79 >= 0; e_79--) {
                    var r_59 = Math.pow(2, e_79 * t);
                    s_10[o - e_79 - 1] = Math.floor(i / r_59), i -= s_10[o - e_79 - 1] * r_59;
                }
                return e_78;
            }
            s *= Math.pow(2, t);
        }
        return new ArrayBuffer(0);
    }
    function T() {
        var e = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            e[_i] = arguments[_i];
        }
        var t = 0, r = 0;
        for (var _a = 0, e_80 = e; _a < e_80.length; _a++) {
            var r_60 = e_80[_a];
            t += r_60.byteLength;
        }
        var n = new ArrayBuffer(t), i = new Uint8Array(n);
        for (var _b = 0, e_81 = e; _b < e_81.length; _b++) {
            var t_63 = e_81[_b];
            i.set(new Uint8Array(t_63), r), r += t_63.byteLength;
        }
        return n;
    }
    function R() {
        var e = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            e[_i] = arguments[_i];
        }
        var t = 0, r = 0;
        for (var _a = 0, e_82 = e; _a < e_82.length; _a++) {
            var r_61 = e_82[_a];
            t += r_61.length;
        }
        var n = new ArrayBuffer(t), i = new Uint8Array(n);
        for (var _b = 0, e_83 = e; _b < e_83.length; _b++) {
            var t_64 = e_83[_b];
            i.set(t_64, r), r += t_64.length;
        }
        return i;
    }
    function C() { var e = new Uint8Array(this.valueHex); if (this.valueHex.byteLength >= 2) {
        var t_65 = 255 === e[0] && 128 & e[1], r_62 = 0 === e[0] && 0 == (128 & e[1]);
        (t_65 || r_62) && this.warnings.push("Needlessly long format");
    } var t = new ArrayBuffer(this.valueHex.byteLength), r = new Uint8Array(t); for (var e_84 = 0; e_84 < this.valueHex.byteLength; e_84++)
        r[e_84] = 0; r[0] = 128 & e[0]; var n = I(r, 8), i = new ArrayBuffer(this.valueHex.byteLength), o = new Uint8Array(i); for (var t_66 = 0; t_66 < this.valueHex.byteLength; t_66++)
        o[t_66] = e[t_66]; return o[0] &= 127, I(o, 8) - n; }
    function M(e, t) { if (e.byteLength !== t.byteLength)
        return !1; var r = new Uint8Array(e), n = new Uint8Array(t); for (var e_85 = 0; e_85 < r.length; e_85++)
        if (r[e_85] !== n[e_85])
            return !1; return !0; }
    function L(e, t) { var r = e.toString(10); if (t < r.length)
        return ""; var n = t - r.length, i = new Array(n); for (var e_86 = 0; e_86 < n; e_86++)
        i[e_86] = "0"; return i.join("").concat(r); }
    Math.log(2);
    var U = [new Uint8Array([1])], D = "0123456789";
    var F = (function () {
        function F(e) {
            if (e === void 0) { e = {}; }
            this.blockLength = B(e, "blockLength", 0), this.error = B(e, "error", ""), this.warnings = B(e, "warnings", []), this.valueBeforeDecode = "valueBeforeDecode" in e ? e.valueBeforeDecode.slice(0) : new ArrayBuffer(0);
        }
        F.blockName = function () { return "baseBlock"; };
        F.prototype.toJSON = function () { return { blockName: this.constructor.blockName(), blockLength: this.blockLength, error: this.error, warnings: this.warnings, valueBeforeDecode: P(this.valueBeforeDecode, 0, this.valueBeforeDecode.byteLength) }; };
        return F;
    }());
    var j = function (e) { return (function (_super) {
        __extends(class_2, _super);
        function class_2(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.isHexOnly = B(e, "isHexOnly", !1), _this.valueHex = "valueHex" in e ? e.valueHex.slice(0) : new ArrayBuffer(0);
            return _this;
        }
        class_2.blockName = function () { return "hexBlock"; };
        class_2.prototype.fromBER = function (e, t, r) { return !1 === _(this, e, t, r) ? -1 : 0 === new Uint8Array(e, t, r).length ? (this.warnings.push("Zero buffer length"), t) : (this.valueHex = e.slice(t, t + r), this.blockLength = r, t + r); };
        class_2.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            return !0 !== this.isHexOnly ? (this.error = 'Flag "isHexOnly" is not set, abort', new ArrayBuffer(0)) : !0 === e ? new ArrayBuffer(this.valueHex.byteLength) : this.valueHex.slice(0);
        };
        class_2.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.blockName = this.constructor.blockName(), e.isHexOnly = this.isHexOnly, e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e; };
        return class_2;
    }(e)); };
    var H = (function (_super) {
        __extends(H, _super);
        function H(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this) || this, "idBlock" in e ? (_this.isHexOnly = B(e.idBlock, "isHexOnly", !1), _this.valueHex = B(e.idBlock, "valueHex", new ArrayBuffer(0)), _this.tagClass = B(e.idBlock, "tagClass", -1), _this.tagNumber = B(e.idBlock, "tagNumber", -1), _this.isConstructed = B(e.idBlock, "isConstructed", !1)) : (_this.tagClass = -1, _this.tagNumber = -1, _this.isConstructed = !1);
            return _this;
        }
        H.blockName = function () { return "identificationBlock"; };
        H.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            var t, r, n = 0;
            switch (this.tagClass) {
                case 1:
                    n |= 0;
                    break;
                case 2:
                    n |= 64;
                    break;
                case 3:
                    n |= 128;
                    break;
                case 4:
                    n |= 192;
                    break;
                default: return this.error = "Unknown tag class", new ArrayBuffer(0);
            }
            if (this.isConstructed && (n |= 32), this.tagNumber < 31 && !this.isHexOnly) {
                if (t = new ArrayBuffer(1), r = new Uint8Array(t), !e) {
                    var e_87 = this.tagNumber;
                    e_87 &= 31, n |= e_87, r[0] = n;
                }
                return t;
            }
            if (!1 === this.isHexOnly) {
                var i_21 = O(this.tagNumber, 7), o_10 = new Uint8Array(i_21), s_11 = i_21.byteLength;
                if (t = new ArrayBuffer(s_11 + 1), r = new Uint8Array(t), r[0] = 31 | n, !e) {
                    for (var e_88 = 0; e_88 < s_11 - 1; e_88++)
                        r[e_88 + 1] = 128 | o_10[e_88];
                    r[s_11] = o_10[s_11 - 1];
                }
                return t;
            }
            if (t = new ArrayBuffer(this.valueHex.byteLength + 1), r = new Uint8Array(t), r[0] = 31 | n, !1 === e) {
                var e_89 = new Uint8Array(this.valueHex);
                for (var t_67 = 0; t_67 < e_89.length - 1; t_67++)
                    r[t_67 + 1] = 128 | e_89[t_67];
                r[this.valueHex.byteLength] = e_89[e_89.length - 1];
            }
            return t;
        };
        H.prototype.fromBER = function (e, t, r) { if (!1 === _(this, e, t, r))
            return -1; var n = new Uint8Array(e, t, r); if (0 === n.length)
            return this.error = "Zero buffer length", -1; switch (192 & n[0]) {
            case 0:
                this.tagClass = 1;
                break;
            case 64:
                this.tagClass = 2;
                break;
            case 128:
                this.tagClass = 3;
                break;
            case 192:
                this.tagClass = 4;
                break;
            default: return this.error = "Unknown tag class", -1;
        } this.isConstructed = 32 == (32 & n[0]), this.isHexOnly = !1; var i = 31 & n[0]; if (31 !== i)
            this.tagNumber = i, this.blockLength = 1;
        else {
            var e_90 = 1;
            this.valueHex = new ArrayBuffer(255);
            var t_68 = 255, r_63 = new Uint8Array(this.valueHex);
            for (; 128 & n[e_90];) {
                if (r_63[e_90 - 1] = 127 & n[e_90], e_90++, e_90 >= n.length)
                    return this.error = "End of input reached before message was fully decoded", -1;
                if (e_90 === t_68) {
                    t_68 += 255;
                    var e_91 = new ArrayBuffer(t_68), n_39 = new Uint8Array(e_91);
                    for (var e_92 = 0; e_92 < r_63.length; e_92++)
                        n_39[e_92] = r_63[e_92];
                    this.valueHex = new ArrayBuffer(t_68), r_63 = new Uint8Array(this.valueHex);
                }
            }
            this.blockLength = e_90 + 1, r_63[e_90 - 1] = 127 & n[e_90];
            var i_22 = new ArrayBuffer(e_90), o_11 = new Uint8Array(i_22);
            for (var t_69 = 0; t_69 < e_90; t_69++)
                o_11[t_69] = r_63[t_69];
            this.valueHex = new ArrayBuffer(e_90), r_63 = new Uint8Array(this.valueHex), r_63.set(o_11), this.blockLength <= 9 ? this.tagNumber = I(r_63, 7) : (this.isHexOnly = !0, this.warnings.push("Tag too long, represented as hex-coded"));
        } if (1 === this.tagClass && this.isConstructed)
            switch (this.tagNumber) {
                case 1:
                case 2:
                case 5:
                case 6:
                case 9:
                case 13:
                case 14:
                case 23:
                case 24:
                case 31:
                case 32:
                case 33:
                case 34: return this.error = "Constructed encoding used for primitive type", -1;
            } return t + this.blockLength; };
        H.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.blockName = this.constructor.blockName(), e.tagClass = this.tagClass, e.tagNumber = this.tagNumber, e.isConstructed = this.isConstructed, e; };
        return H;
    }((j(F))));
    var V = (function (_super) {
        __extends(V, _super);
        function V(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this) || this, "lenBlock" in e ? (_this.isIndefiniteForm = B(e.lenBlock, "isIndefiniteForm", !1), _this.longFormUsed = B(e.lenBlock, "longFormUsed", !1), _this.length = B(e.lenBlock, "length", 0)) : (_this.isIndefiniteForm = !1, _this.longFormUsed = !1, _this.length = 0);
            return _this;
        }
        V.blockName = function () { return "lengthBlock"; };
        V.prototype.fromBER = function (e, t, r) { if (!1 === _(this, e, t, r))
            return -1; var n = new Uint8Array(e, t, r); if (0 === n.length)
            return this.error = "Zero buffer length", -1; if (255 === n[0])
            return this.error = "Length block 0xFF is reserved by standard", -1; if (this.isIndefiniteForm = 128 === n[0], !0 === this.isIndefiniteForm)
            return this.blockLength = 1, t + this.blockLength; if (this.longFormUsed = !!(128 & n[0]), !1 === this.longFormUsed)
            return this.length = n[0], this.blockLength = 1, t + this.blockLength; var i = 127 & n[0]; if (i > 8)
            return this.error = "Too big integer", -1; if (i + 1 > n.length)
            return this.error = "End of input reached before message was fully decoded", -1; var o = new Uint8Array(i); for (var e_93 = 0; e_93 < i; e_93++)
            o[e_93] = n[e_93 + 1]; return 0 === o[i - 1] && this.warnings.push("Needlessly long encoded length"), this.length = I(o, 8), this.longFormUsed && this.length <= 127 && this.warnings.push("Unnecessary usage of long length form"), this.blockLength = i + 1, t + this.blockLength; };
        V.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            var t, r;
            if (this.length > 127 && (this.longFormUsed = !0), this.isIndefiniteForm)
                return t = new ArrayBuffer(1), !1 === e && (r = new Uint8Array(t), r[0] = 128), t;
            if (!0 === this.longFormUsed) {
                var n_40 = O(this.length, 8);
                if (n_40.byteLength > 127)
                    return this.error = "Too big length", new ArrayBuffer(0);
                if (t = new ArrayBuffer(n_40.byteLength + 1), !0 === e)
                    return t;
                var i_23 = new Uint8Array(n_40);
                r = new Uint8Array(t), r[0] = 128 | n_40.byteLength;
                for (var e_94 = 0; e_94 < n_40.byteLength; e_94++)
                    r[e_94 + 1] = i_23[e_94];
                return t;
            }
            return t = new ArrayBuffer(1), !1 === e && (r = new Uint8Array(t), r[0] = this.length), t;
        };
        V.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.blockName = this.constructor.blockName(), e.isIndefiniteForm = this.isIndefiniteForm, e.longFormUsed = this.longFormUsed, e.length = this.length, e; };
        return V;
    }(F));
    var z = (function (_super) {
        __extends(z, _super);
        function z(e) {
            if (e === void 0) { e = {}; }
            return _super.call(this, e) || this;
        }
        z.blockName = function () { return "valueBlock"; };
        z.prototype.fromBER = function (e, t, r) { throw TypeError('User need to make a specific function in a class which extends "ValueBlock"'); };
        z.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            throw TypeError('User need to make a specific function in a class which extends "ValueBlock"');
        };
        return z;
    }(F));
    var G = (function (_super) {
        __extends(G, _super);
        function G(e, t) {
            if (e === void 0) { e = {}; }
            if (t === void 0) { t = z; }
            var _this = this;
            _this = _super.call(this, e) || this, "name" in e && (_this.name = e.name), "optional" in e && (_this.optional = e.optional), "primitiveSchema" in e && (_this.primitiveSchema = e.primitiveSchema), _this.idBlock = new H(e), _this.lenBlock = new V(e), _this.valueBlock = new t(e);
            return _this;
        }
        G.blockName = function () { return "BaseBlock"; };
        G.prototype.fromBER = function (e, t, r) { var n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); };
        G.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            var t;
            var r = this.idBlock.toBER(e), n = this.valueBlock.toBER(!0);
            var i;
            if (this.lenBlock.length = n.byteLength, t = T(r, this.lenBlock.toBER(e)), i = !1 === e ? this.valueBlock.toBER(e) : new ArrayBuffer(this.lenBlock.length), t = T(t, i), !0 === this.lenBlock.isIndefiniteForm) {
                var r_64 = new ArrayBuffer(2);
                if (!1 === e) {
                    var e_95 = new Uint8Array(r_64);
                    e_95[0] = 0, e_95[1] = 0;
                }
                t = T(t, r_64);
            }
            return t;
        };
        G.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.idBlock = this.idBlock.toJSON(), e.lenBlock = this.lenBlock.toJSON(), e.valueBlock = this.valueBlock.toJSON(), "name" in this && (e.name = this.name), "optional" in this && (e.optional = this.optional), "primitiveSchema" in this && (e.primitiveSchema = this.primitiveSchema.toJSON()), e; };
        G.prototype.toString = function () { return this.constructor.blockName() + " : " + P(this.valueBlock.valueHex); };
        return G;
    }(F));
    var q = (function (_super) {
        __extends(q, _super);
        function q(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.valueHex = "valueHex" in e ? e.valueHex.slice(0) : new ArrayBuffer(0), _this.isHexOnly = B(e, "isHexOnly", !0);
            return _this;
        }
        q.prototype.fromBER = function (e, t, r) { if (!1 === _(this, e, t, r))
            return -1; var n = new Uint8Array(e, t, r); if (0 === n.length)
            return this.warnings.push("Zero buffer length"), t; this.valueHex = new ArrayBuffer(n.length); var i = new Uint8Array(this.valueHex); for (var e_96 = 0; e_96 < n.length; e_96++)
            i[e_96] = n[e_96]; return this.blockLength = r, t + r; };
        q.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            return this.valueHex.slice(0);
        };
        q.blockName = function () { return "PrimitiveValueBlock"; };
        q.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e.isHexOnly = this.isHexOnly, e; };
        return q;
    }(z));
    var K = (function (_super) {
        __extends(K, _super);
        function K(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, q) || this, _this.idBlock.isConstructed = !1;
            return _this;
        }
        K.blockName = function () { return "PRIMITIVE"; };
        return K;
    }(G));
    var W = (function (_super) {
        __extends(W, _super);
        function W(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.value = B(e, "value", []), _this.isIndefiniteForm = B(e, "isIndefiniteForm", !1);
            return _this;
        }
        W.prototype.fromBER = function (e, t, r) { var n = t, i = r; if (!1 === _(this, e, t, r))
            return -1; if (0 === new Uint8Array(e, t, r).length)
            return this.warnings.push("Zero buffer length"), t; var o = t; for (; (!0 === this.isIndefiniteForm ? 1 : r) > 0;) {
            var t_70 = ze(e, o, r);
            if (-1 === t_70.offset)
                return this.error = t_70.result.error, this.warnings.concat(t_70.result.warnings), -1;
            if (o = t_70.offset, this.blockLength += t_70.result.blockLength, r -= t_70.result.blockLength, this.value.push(t_70.result), !0 === this.isIndefiniteForm && t_70.result.constructor.blockName() === Z.blockName())
                break;
        } return !0 === this.isIndefiniteForm && (this.value[this.value.length - 1].constructor.blockName() === Z.blockName() ? this.value.pop() : this.warnings.push("No EndOfContent block encoded")), this.valueBeforeDecode = e.slice(n, n + i), o; };
        W.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            var t = new ArrayBuffer(0);
            for (var r_65 = 0; r_65 < this.value.length; r_65++)
                t = T(t, this.value[r_65].toBER(e));
            return t;
        };
        W.blockName = function () { return "ConstructedValueBlock"; };
        W.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } e.isIndefiniteForm = this.isIndefiniteForm, e.value = []; for (var t_71 = 0; t_71 < this.value.length; t_71++)
            e.value.push(this.value[t_71].toJSON()); return e; };
        return W;
    }(z));
    var $ = (function (_super) {
        __extends($, _super);
        function $(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, W) || this, _this.idBlock.isConstructed = !0;
            return _this;
        }
        $.blockName = function () { return "CONSTRUCTED"; };
        $.prototype.fromBER = function (e, t, r) { this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm; var n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); };
        $.prototype.toString = function () { var e = []; for (var _i = 0, _a = this.valueBlock.value; _i < _a.length; _i++) {
            var t_72 = _a[_i];
            e.push(t_72.toString().split("\n").map((function (e) { return "  " + e; })).join("\n"));
        } var t = 3 === this.idBlock.tagClass ? "[" + this.idBlock.tagNumber + "]" : this.constructor.blockName(); return e.length ? t + " :\n" + e.join("\n") : t + " :"; };
        return $;
    }(G));
    var J = (function (_super) {
        __extends(J, _super);
        function J(e) {
            if (e === void 0) { e = {}; }
            return _super.call(this, e) || this;
        }
        J.prototype.fromBER = function (e, t, r) { return t; };
        J.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            return new ArrayBuffer(0);
        };
        J.blockName = function () { return "EndOfContentValueBlock"; };
        return J;
    }(z));
    var Z = (function (_super) {
        __extends(Z, _super);
        function Z(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, J) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 0;
            return _this;
        }
        Z.blockName = function () { return "EndOfContent"; };
        return Z;
    }(G));
    var X = (function (_super) {
        __extends(X, _super);
        function X(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.value = B(e, "value", !1), _this.isHexOnly = B(e, "isHexOnly", !1), "valueHex" in e ? _this.valueHex = e.valueHex.slice(0) : (_this.valueHex = new ArrayBuffer(1), !0 === _this.value && (new Uint8Array(_this.valueHex)[0] = 255));
            return _this;
        }
        X.prototype.fromBER = function (e, t, r) { if (!1 === _(this, e, t, r))
            return -1; var n = new Uint8Array(e, t, r); r > 1 && this.warnings.push("Boolean value encoded in more then 1 octet"), this.isHexOnly = !0, this.valueHex = new ArrayBuffer(n.length); var i = new Uint8Array(this.valueHex); for (var e_97 = 0; e_97 < n.length; e_97++)
            i[e_97] = n[e_97]; return 0 !== C.call(this) ? this.value = !0 : this.value = !1, this.blockLength = r, t + r; };
        X.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            return this.valueHex;
        };
        X.blockName = function () { return "BooleanValueBlock"; };
        X.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.value = this.value, e.isHexOnly = this.isHexOnly, e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e; };
        return X;
    }(z));
    var Y = (function (_super) {
        __extends(Y, _super);
        function Y(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, X) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 1;
            return _this;
        }
        Y.blockName = function () { return "BOOLEAN"; };
        Y.prototype.toString = function () { return this.constructor.blockName() + " : " + this.valueBlock.value; };
        return Y;
    }(G));
    var Q = (function (_super) {
        __extends(Q, _super);
        function Q(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 16;
            return _this;
        }
        Q.blockName = function () { return "SEQUENCE"; };
        return Q;
    }($));
    var ee = (function (_super) {
        __extends(ee, _super);
        function ee(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 17;
            return _this;
        }
        ee.blockName = function () { return "SET"; };
        return ee;
    }($));
    var te = (function (_super) {
        __extends(te, _super);
        function te(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, F) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 5;
            return _this;
        }
        te.blockName = function () { return "NULL"; };
        te.prototype.fromBER = function (e, t, r) { return this.lenBlock.length > 0 && this.warnings.push("Non-zero length of value block for Null type"), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), this.blockLength += r, t + r > e.byteLength ? (this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", -1) : t + r; };
        te.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            var t = new ArrayBuffer(2);
            if (!0 === e)
                return t;
            var r = new Uint8Array(t);
            return r[0] = 5, r[1] = 0, t;
        };
        te.prototype.toString = function () { return "" + this.constructor.blockName(); };
        return te;
    }(G));
    var re = (function (_super) {
        __extends(re, _super);
        function re(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.isConstructed = B(e, "isConstructed", !1);
            return _this;
        }
        re.prototype.fromBER = function (e, t, r) { var n = 0; if (!0 === this.isConstructed) {
            if (this.isHexOnly = !1, n = W.prototype.fromBER.call(this, e, t, r), -1 === n)
                return n;
            for (var e_98 = 0; e_98 < this.value.length; e_98++) {
                var t_73 = this.value[e_98].constructor.blockName();
                if (t_73 === Z.blockName()) {
                    if (!0 === this.isIndefiniteForm)
                        break;
                    return this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only", -1;
                }
                if (t_73 !== ne.blockName())
                    return this.error = "OCTET STRING may consists of OCTET STRINGs only", -1;
            }
        }
        else
            this.isHexOnly = !0, n = _super.prototype.fromBER.call(this, e, t, r), this.blockLength = r; return n; };
        re.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            if (!0 === this.isConstructed)
                return W.prototype.toBER.call(this, e);
            var t = new ArrayBuffer(this.valueHex.byteLength);
            return !0 === e || 0 === this.valueHex.byteLength || (t = this.valueHex.slice(0)), t;
        };
        re.blockName = function () { return "OctetStringValueBlock"; };
        re.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.isConstructed = this.isConstructed, e.isHexOnly = this.isHexOnly, e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e; };
        return re;
    }((j(W))));
    var ne = (function (_super) {
        __extends(ne, _super);
        function ne(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, re) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 4;
            return _this;
        }
        ne.prototype.fromBER = function (e, t, r) { if (this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, 0 === r)
            return 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), t; if (!this.valueBlock.isConstructed) {
            var n_41 = e.slice(t, t + r);
            try {
                var e_99 = Ge(n_41);
                -1 !== e_99.offset && e_99.offset === r && (this.valueBlock.value = [e_99.result]);
            }
            catch (e) { }
        } return _super.prototype.fromBER.call(this, e, t, r); };
        ne.blockName = function () { return "OCTET STRING"; };
        ne.prototype.isEqual = function (e) { return e instanceof ne != 0 && JSON.stringify(this) === JSON.stringify(e); };
        ne.prototype.toString = function () { return this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length ? $.prototype.toString.call(this) : this.constructor.blockName() + " : " + P(this.valueBlock.valueHex); };
        return ne;
    }(G));
    var ie = (function (_super) {
        __extends(ie, _super);
        function ie(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.unusedBits = B(e, "unusedBits", 0), _this.isConstructed = B(e, "isConstructed", !1), _this.blockLength = _this.valueHex.byteLength;
            return _this;
        }
        ie.prototype.fromBER = function (e, t, r) { if (0 === r)
            return t; var n = -1; if (!0 === this.isConstructed) {
            if (n = W.prototype.fromBER.call(this, e, t, r), -1 === n)
                return n;
            for (var e_100 = 0; e_100 < this.value.length; e_100++) {
                var t_74 = this.value[e_100].constructor.blockName();
                if (t_74 === Z.blockName()) {
                    if (!0 === this.isIndefiniteForm)
                        break;
                    return this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only", -1;
                }
                if (t_74 !== oe.blockName())
                    return this.error = "BIT STRING may consists of BIT STRINGs only", -1;
                if (this.unusedBits > 0 && this.value[e_100].valueBlock.unusedBits > 0)
                    return this.error = 'Using of "unused bits" inside constructive BIT STRING allowed for least one only', -1;
                if (this.unusedBits = this.value[e_100].valueBlock.unusedBits, this.unusedBits > 7)
                    return this.error = "Unused bits for BitString must be in range 0-7", -1;
            }
            return n;
        } if (!1 === _(this, e, t, r))
            return -1; var i = new Uint8Array(e, t, r); if (this.unusedBits = i[0], this.unusedBits > 7)
            return this.error = "Unused bits for BitString must be in range 0-7", -1; if (!this.unusedBits) {
            var n_42 = e.slice(t + 1, t + r);
            try {
                var e_101 = Ge(n_42);
                -1 !== e_101.offset && e_101.offset === r - 1 && (this.value = [e_101.result]);
            }
            catch (e) { }
        } this.valueHex = new ArrayBuffer(i.length - 1); var o = new Uint8Array(this.valueHex); for (var e_102 = 0; e_102 < r - 1; e_102++)
            o[e_102] = i[e_102 + 1]; return this.blockLength = i.length, t + r; };
        ie.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            if (!0 === this.isConstructed)
                return W.prototype.toBER.call(this, e);
            if (!0 === e)
                return new ArrayBuffer(this.valueHex.byteLength + 1);
            if (0 === this.valueHex.byteLength)
                return new ArrayBuffer(0);
            var t = new Uint8Array(this.valueHex), r = new ArrayBuffer(this.valueHex.byteLength + 1), n = new Uint8Array(r);
            n[0] = this.unusedBits;
            for (var e_103 = 0; e_103 < this.valueHex.byteLength; e_103++)
                n[e_103 + 1] = t[e_103];
            return r;
        };
        ie.blockName = function () { return "BitStringValueBlock"; };
        ie.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.unusedBits = this.unusedBits, e.isConstructed = this.isConstructed, e.isHexOnly = this.isHexOnly, e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e; };
        return ie;
    }((j(W))));
    var oe = (function (_super) {
        __extends(oe, _super);
        function oe(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, ie) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 3;
            return _this;
        }
        oe.blockName = function () { return "BIT STRING"; };
        oe.prototype.fromBER = function (e, t, r) { return 0 === r ? t : (this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, _super.prototype.fromBER.call(this, e, t, r)); };
        oe.prototype.isEqual = function (e) { return e instanceof oe != 0 && JSON.stringify(this) === JSON.stringify(e); };
        oe.prototype.toString = function () { if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length)
            return $.prototype.toString.call(this); {
            var e_104 = [], t_76 = new Uint8Array(this.valueBlock.valueHex);
            for (var _i = 0, t_75 = t_76; _i < t_75.length; _i++) {
                var r_66 = t_75[_i];
                e_104.push(r_66.toString(2).padStart(8, "0"));
            }
            return this.constructor.blockName() + " : " + e_104.join("");
        } };
        return oe;
    }(G));
    var se = (function (_super) {
        __extends(se, _super);
        function se(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, "value" in e && (_this.valueDec = e.value);
            return _this;
        }
        Object.defineProperty(se.prototype, "valueHex", {
            get: function () { return this._valueHex; },
            set: function (e) { this._valueHex = e.slice(0), e.byteLength >= 4 ? (this.warnings.push("Too big Integer for decoding, hex only"), this.isHexOnly = !0, this._valueDec = 0) : (this.isHexOnly = !1, e.byteLength > 0 && (this._valueDec = C.call(this))); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(se.prototype, "valueDec", {
            get: function () { return this._valueDec; },
            set: function (e) { this._valueDec = e, this.isHexOnly = !1, this._valueHex = function (e) { var t = e < 0 ? -1 * e : e; var r = 128; for (var n_43 = 1; n_43 < 8; n_43++) {
                if (t <= r) {
                    if (e < 0) {
                        var e_105 = O(r - t, 8, n_43);
                        return new Uint8Array(e_105)[0] |= 128, e_105;
                    }
                    var i_24 = O(t, 8, n_43), o_12 = new Uint8Array(i_24);
                    if (128 & o_12[0]) {
                        var e_106 = i_24.slice(0), t_77 = new Uint8Array(e_106);
                        i_24 = new ArrayBuffer(i_24.byteLength + 1), o_12 = new Uint8Array(i_24);
                        for (var r_67 = 0; r_67 < e_106.byteLength; r_67++)
                            o_12[r_67 + 1] = t_77[r_67];
                        o_12[0] = 0;
                    }
                    return i_24;
                }
                r *= Math.pow(2, 8);
            } return new ArrayBuffer(0); }(e); },
            enumerable: false,
            configurable: true
        });
        se.prototype.fromDER = function (e, t, r, n) {
            if (n === void 0) { n = 0; }
            var i = this.fromBER(e, t, r);
            if (-1 === i)
                return i;
            var o = new Uint8Array(this._valueHex);
            if (0 === o[0] && 0 != (128 & o[1])) {
                var e_107 = new ArrayBuffer(this._valueHex.byteLength - 1);
                new Uint8Array(e_107).set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1)), this._valueHex = e_107.slice(0);
            }
            else if (0 !== n && this._valueHex.byteLength < n) {
                n - this._valueHex.byteLength > 1 && (n = this._valueHex.byteLength + 1);
                var e_108 = new ArrayBuffer(n);
                new Uint8Array(e_108).set(o, n - this._valueHex.byteLength), this._valueHex = e_108.slice(0);
            }
            return i;
        };
        se.prototype.toDER = function (e) {
            if (e === void 0) { e = !1; }
            var t = new Uint8Array(this._valueHex);
            switch (!0) {
                case 0 != (128 & t[0]):
                    {
                        var e_109 = new ArrayBuffer(this._valueHex.byteLength + 1), r_68 = new Uint8Array(e_109);
                        r_68[0] = 0, r_68.set(t, 1), this._valueHex = e_109.slice(0);
                    }
                    break;
                case 0 === t[0] && 0 == (128 & t[1]): {
                    var e_110 = new ArrayBuffer(this._valueHex.byteLength - 1);
                    new Uint8Array(e_110).set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1)), this._valueHex = e_110.slice(0);
                }
            }
            return this.toBER(e);
        };
        se.prototype.fromBER = function (e, t, r) { var n = _super.prototype.fromBER.call(this, e, t, r); return -1 === n ? n : (this.blockLength = r, t + r); };
        se.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            return this.valueHex.slice(0);
        };
        se.blockName = function () { return "IntegerValueBlock"; };
        se.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.valueDec = this.valueDec, e; };
        se.prototype.toString = function () { function e(e, t) { var r = new Uint8Array([0]); var n = new Uint8Array(e), i = new Uint8Array(t), o = n.slice(0); var s = o.length - 1; var a = i.slice(0); var c = a.length - 1; var u = 0, f = 0; for (var e_111 = c < s ? s : c; e_111 >= 0; e_111--, f++)
            u = 1 == f < a.length ? o[s - f] + a[c - f] + r[0] : o[s - f] + r[0], r[0] = u / 10, 1 == f >= o.length ? o = R(new Uint8Array([u % 10]), o) : o[s - f] = u % 10; return r[0] > 0 && (o = R(r, o)), o.slice(0); } function t(e) { if (e >= U.length)
            for (var t_78 = U.length; t_78 <= e; t_78++) {
                var e_112 = new Uint8Array([0]);
                var r_69 = U[t_78 - 1].slice(0);
                for (var t_79 = r_69.length - 1; t_79 >= 0; t_79--) {
                    var n_44 = new Uint8Array([(r_69[t_79] << 1) + e_112[0]]);
                    e_112[0] = n_44[0] / 10, r_69[t_79] = n_44[0] % 10;
                }
                e_112[0] > 0 && (r_69 = R(e_112, r_69)), U.push(r_69);
            } return U[e]; } function r(e, t) { var r = 0, n = new Uint8Array(e), i = new Uint8Array(t), o = n.slice(0); var s = o.length - 1; var a = i.slice(0); var c = a.length - 1; var u, f = 0; for (var e_113 = c; e_113 >= 0; e_113--, f++)
            u = o[s - f] - a[c - f] - r, 1 == u < 0 ? (r = 1, o[s - f] = u + 10) : (r = 0, o[s - f] = u); if (r > 0)
            for (var e_114 = s - c + 1; e_114 >= 0; e_114--, f++) {
                if (u = o[s - f] - r, !(u < 0)) {
                    r = 0, o[s - f] = u;
                    break;
                }
                r = 1, o[s - f] = u + 10;
            } return o.slice(); } var n = 8 * this._valueHex.byteLength - 1; var i, o = new Uint8Array(8 * this._valueHex.byteLength / 3), s = 0; var a = new Uint8Array(this._valueHex); var c = "", u = !1; for (var u_3 = this._valueHex.byteLength - 1; u_3 >= 0; u_3--) {
            i = a[u_3];
            for (var a_11 = 0; a_11 < 8; a_11++)
                1 == (1 & i) && (s === n ? (o = r(t(s), o), c = "-") : o = e(o, t(s))), s++, i >>= 1;
        } for (var e_115 = 0; e_115 < o.length; e_115++)
            o[e_115] && (u = !0), u && (c += D.charAt(o[e_115])); return !1 === u && (c += D.charAt(0)), c; };
        return se;
    }((j(z))));
    var ae = (function (_super) {
        __extends(ae, _super);
        function ae(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, se) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 2;
            return _this;
        }
        ae.blockName = function () { return "INTEGER"; };
        ae.prototype.isEqual = function (e) { return e instanceof ae ? this.valueBlock.isHexOnly && e.valueBlock.isHexOnly ? M(this.valueBlock.valueHex, e.valueBlock.valueHex) : this.valueBlock.isHexOnly === e.valueBlock.isHexOnly && this.valueBlock.valueDec === e.valueBlock.valueDec : e instanceof ArrayBuffer && M(this.valueBlock.valueHex, e); };
        ae.prototype.convertToDER = function () { var e = new ae({ valueHex: this.valueBlock.valueHex }); return e.valueBlock.toDER(), e; };
        ae.prototype.convertFromDER = function () { var e = this.valueBlock.valueHex.byteLength % 2 ? this.valueBlock.valueHex.byteLength + 1 : this.valueBlock.valueHex.byteLength, t = new ae({ valueHex: this.valueBlock.valueHex }); return t.valueBlock.fromDER(t.valueBlock.valueHex, 0, t.valueBlock.valueHex.byteLength, e), t; };
        ae.prototype.toString = function () { var e = P(this.valueBlock.valueHex), t = BigInt("0x" + e); return this.constructor.blockName() + " : " + t.toString(); };
        return ae;
    }(G));
    var ce = (function (_super) {
        __extends(ce, _super);
        function ce(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 10;
            return _this;
        }
        ce.blockName = function () { return "ENUMERATED"; };
        return ce;
    }(ae));
    var ue = (function (_super) {
        __extends(ue, _super);
        function ue(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.valueDec = B(e, "valueDec", -1), _this.isFirstSid = B(e, "isFirstSid", !1);
            return _this;
        }
        ue.blockName = function () { return "sidBlock"; };
        ue.prototype.fromBER = function (e, t, r) { if (0 === r)
            return t; if (!1 === _(this, e, t, r))
            return -1; var n = new Uint8Array(e, t, r); this.valueHex = new ArrayBuffer(r); var i = new Uint8Array(this.valueHex); for (var e_116 = 0; e_116 < r && (i[e_116] = 127 & n[e_116], this.blockLength++, 0 != (128 & n[e_116])); e_116++)
            ; var o = new ArrayBuffer(this.blockLength), s = new Uint8Array(o); for (var e_117 = 0; e_117 < this.blockLength; e_117++)
            s[e_117] = i[e_117]; return this.valueHex = o.slice(0), i = new Uint8Array(this.valueHex), 0 != (128 & n[this.blockLength - 1]) ? (this.error = "End of input reached before message was fully decoded", -1) : (0 === i[0] && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = I(i, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), t + this.blockLength); };
        ue.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            var t, r;
            if (this.isHexOnly) {
                if (!0 === e)
                    return new ArrayBuffer(this.valueHex.byteLength);
                var n_45 = new Uint8Array(this.valueHex);
                t = new ArrayBuffer(this.blockLength), r = new Uint8Array(t);
                for (var e_118 = 0; e_118 < this.blockLength - 1; e_118++)
                    r[e_118] = 128 | n_45[e_118];
                return r[this.blockLength - 1] = n_45[this.blockLength - 1], t;
            }
            var n = O(this.valueDec, 7);
            if (0 === n.byteLength)
                return this.error = "Error during encoding SID value", new ArrayBuffer(0);
            if (t = new ArrayBuffer(n.byteLength), !1 === e) {
                var e_119 = new Uint8Array(n);
                r = new Uint8Array(t);
                for (var t_80 = 0; t_80 < n.byteLength - 1; t_80++)
                    r[t_80] = 128 | e_119[t_80];
                r[n.byteLength - 1] = e_119[n.byteLength - 1];
            }
            return t;
        };
        ue.prototype.toString = function () { var e = ""; if (!0 === this.isHexOnly)
            e = P(this.valueHex, 0, this.valueHex.byteLength);
        else if (this.isFirstSid) {
            var t_81 = this.valueDec;
            this.valueDec <= 39 ? e = "0." : this.valueDec <= 79 ? (e = "1.", t_81 -= 40) : (e = "2.", t_81 -= 80), e += t_81.toString();
        }
        else
            e = this.valueDec.toString(); return e; };
        ue.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.valueDec = this.valueDec, e.isFirstSid = this.isFirstSid, e; };
        return ue;
    }((j(F))));
    var fe = (function (_super) {
        __extends(fe, _super);
        function fe(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.fromString(B(e, "value", ""));
            return _this;
        }
        fe.prototype.fromBER = function (e, t, r) { var n = t; for (; r > 0;) {
            var t_82 = new ue;
            if (n = t_82.fromBER(e, n, r), -1 === n)
                return this.blockLength = 0, this.error = t_82.error, n;
            0 === this.value.length && (t_82.isFirstSid = !0), this.blockLength += t_82.blockLength, r -= t_82.blockLength, this.value.push(t_82);
        } return n; };
        fe.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            var t = new ArrayBuffer(0);
            for (var r_70 = 0; r_70 < this.value.length; r_70++) {
                var n_46 = this.value[r_70].toBER(e);
                if (0 === n_46.byteLength)
                    return this.error = this.value[r_70].error, new ArrayBuffer(0);
                t = T(t, n_46);
            }
            return t;
        };
        fe.prototype.fromString = function (e) { this.value = []; var t = 0, r = 0, n = "", i = !1; do {
            if (r = e.indexOf(".", t), n = -1 === r ? e.substr(t) : e.substr(t, r - t), t = r + 1, i) {
                var e_120 = this.value[0];
                var t_83 = 0;
                switch (e_120.valueDec) {
                    case 0: break;
                    case 1:
                        t_83 = 40;
                        break;
                    case 2:
                        t_83 = 80;
                        break;
                    default: return this.value = [], !1;
                }
                var r_71 = parseInt(n, 10);
                if (isNaN(r_71))
                    return !0;
                e_120.valueDec = r_71 + t_83, i = !1;
            }
            else {
                var e_121 = new ue;
                if (e_121.valueDec = parseInt(n, 10), isNaN(e_121.valueDec))
                    return !0;
                0 === this.value.length && (e_121.isFirstSid = !0, i = !0), this.value.push(e_121);
            }
        } while (-1 !== r); return !0; };
        fe.prototype.toString = function () { var e = "", t = !1; for (var r_72 = 0; r_72 < this.value.length; r_72++) {
            t = this.value[r_72].isHexOnly;
            var n_47 = this.value[r_72].toString();
            0 !== r_72 && (e = e + "."), t ? (n_47 = "{" + n_47 + "}", this.value[r_72].isFirstSid ? e = "2.{" + n_47 + " - 80}" : e += n_47) : e += n_47;
        } return e; };
        fe.blockName = function () { return "ObjectIdentifierValueBlock"; };
        fe.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } e.value = this.toString(), e.sidArray = []; for (var t_84 = 0; t_84 < this.value.length; t_84++)
            e.sidArray.push(this.value[t_84].toJSON()); return e; };
        return fe;
    }(z));
    var le = (function (_super) {
        __extends(le, _super);
        function le(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, fe) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 6;
            return _this;
        }
        le.blockName = function () { return "OBJECT IDENTIFIER"; };
        le.prototype.toString = function () { return this.constructor.blockName() + " : " + this.valueBlock.toString(); };
        return le;
    }(G));
    var he = (function (_super) {
        __extends(he, _super);
        function he(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.isHexOnly = !0, _this.value = "";
            return _this;
        }
        he.blockName = function () { return "Utf8StringValueBlock"; };
        he.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.value = this.value, e; };
        return he;
    }((j(F))));
    var de = (function (_super) {
        __extends(de, _super);
        function de(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, he) || this, "value" in e && _this.fromString(e.value), _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 12;
            return _this;
        }
        de.blockName = function () { return "UTF8String"; };
        de.prototype.fromBER = function (e, t, r) { var n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); };
        de.prototype.fromBuffer = function (e) { this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(e)); try {
            this.valueBlock.value = decodeURIComponent(escape(this.valueBlock.value));
        }
        catch (e) {
            this.warnings.push("Error during \"decodeURIComponent\": " + e + ", using raw string");
        } };
        de.prototype.fromString = function (e) { var t = unescape(encodeURIComponent(e)), r = t.length; this.valueBlock.valueHex = new ArrayBuffer(r); var n = new Uint8Array(this.valueBlock.valueHex); for (var e_122 = 0; e_122 < r; e_122++)
            n[e_122] = t.charCodeAt(e_122); this.valueBlock.value = e; };
        de.prototype.toString = function () { return this.constructor.blockName() + " : " + this.valueBlock.value; };
        return de;
    }(G));
    var pe = (function (_super) {
        __extends(pe, _super);
        function pe(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.valueDec = B(e, "valueDec", -1);
            return _this;
        }
        pe.blockName = function () { return "relativeSidBlock"; };
        pe.prototype.fromBER = function (e, t, r) { if (0 === r)
            return t; if (!1 === _(this, e, t, r))
            return -1; var n = new Uint8Array(e, t, r); this.valueHex = new ArrayBuffer(r); var i = new Uint8Array(this.valueHex); for (var e_123 = 0; e_123 < r && (i[e_123] = 127 & n[e_123], this.blockLength++, 0 != (128 & n[e_123])); e_123++)
            ; var o = new ArrayBuffer(this.blockLength), s = new Uint8Array(o); for (var e_124 = 0; e_124 < this.blockLength; e_124++)
            s[e_124] = i[e_124]; return this.valueHex = o.slice(0), i = new Uint8Array(this.valueHex), 0 != (128 & n[this.blockLength - 1]) ? (this.error = "End of input reached before message was fully decoded", -1) : (0 === i[0] && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = I(i, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), t + this.blockLength); };
        pe.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            var t, r;
            if (this.isHexOnly) {
                if (!0 === e)
                    return new ArrayBuffer(this.valueHex.byteLength);
                var n_48 = new Uint8Array(this.valueHex);
                t = new ArrayBuffer(this.blockLength), r = new Uint8Array(t);
                for (var e_125 = 0; e_125 < this.blockLength - 1; e_125++)
                    r[e_125] = 128 | n_48[e_125];
                return r[this.blockLength - 1] = n_48[this.blockLength - 1], t;
            }
            var n = O(this.valueDec, 7);
            if (0 === n.byteLength)
                return this.error = "Error during encoding SID value", new ArrayBuffer(0);
            if (t = new ArrayBuffer(n.byteLength), !1 === e) {
                var e_126 = new Uint8Array(n);
                r = new Uint8Array(t);
                for (var t_85 = 0; t_85 < n.byteLength - 1; t_85++)
                    r[t_85] = 128 | e_126[t_85];
                r[n.byteLength - 1] = e_126[n.byteLength - 1];
            }
            return t;
        };
        pe.prototype.toString = function () { var e = ""; return e = !0 === this.isHexOnly ? P(this.valueHex, 0, this.valueHex.byteLength) : this.valueDec.toString(), e; };
        pe.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.valueDec = this.valueDec, e; };
        return pe;
    }((j(F))));
    var ge = (function (_super) {
        __extends(ge, _super);
        function ge(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.fromString(B(e, "value", ""));
            return _this;
        }
        ge.prototype.fromBER = function (e, t, r) { var n = t; for (; r > 0;) {
            var t_86 = new pe;
            if (n = t_86.fromBER(e, n, r), -1 === n)
                return this.blockLength = 0, this.error = t_86.error, n;
            this.blockLength += t_86.blockLength, r -= t_86.blockLength, this.value.push(t_86);
        } return n; };
        ge.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            var t = new ArrayBuffer(0);
            for (var r_73 = 0; r_73 < this.value.length; r_73++) {
                var n_49 = this.value[r_73].toBER(e);
                if (0 === n_49.byteLength)
                    return this.error = this.value[r_73].error, new ArrayBuffer(0);
                t = T(t, n_49);
            }
            return t;
        };
        ge.prototype.fromString = function (e) { this.value = []; var t = 0, r = 0, n = ""; do {
            r = e.indexOf(".", t), n = -1 === r ? e.substr(t) : e.substr(t, r - t), t = r + 1;
            var i_25 = new pe;
            if (i_25.valueDec = parseInt(n, 10), isNaN(i_25.valueDec))
                return !0;
            this.value.push(i_25);
        } while (-1 !== r); return !0; };
        ge.prototype.toString = function () { var e = "", t = !1; for (var r_74 = 0; r_74 < this.value.length; r_74++) {
            t = this.value[r_74].isHexOnly;
            var n_50 = this.value[r_74].toString();
            0 !== r_74 && (e = e + "."), t ? (n_50 = "{" + n_50 + "}", e += n_50) : e += n_50;
        } return e; };
        ge.blockName = function () { return "RelativeObjectIdentifierValueBlock"; };
        ge.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } e.value = this.toString(), e.sidArray = []; for (var t_87 = 0; t_87 < this.value.length; t_87++)
            e.sidArray.push(this.value[t_87].toJSON()); return e; };
        return ge;
    }(z));
    var me = (function (_super) {
        __extends(me, _super);
        function me(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, ge) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 13;
            return _this;
        }
        me.blockName = function () { return "RelativeObjectIdentifier"; };
        return me;
    }(G));
    var ye = (function (_super) {
        __extends(ye, _super);
        function ye(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.isHexOnly = !0, _this.value = "";
            return _this;
        }
        ye.blockName = function () { return "BmpStringValueBlock"; };
        ye.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.value = this.value, e; };
        return ye;
    }((j(F))));
    var be = (function (_super) {
        __extends(be, _super);
        function be(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, ye) || this, "value" in e && _this.fromString(e.value), _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 30;
            return _this;
        }
        be.blockName = function () { return "BMPString"; };
        be.prototype.fromBER = function (e, t, r) { var n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); };
        be.prototype.fromBuffer = function (e) { var t = e.slice(0), r = new Uint8Array(t); for (var e_127 = 0; e_127 < r.length; e_127 += 2) {
            var t_88 = r[e_127];
            r[e_127] = r[e_127 + 1], r[e_127 + 1] = t_88;
        } this.valueBlock.value = String.fromCharCode.apply(null, new Uint16Array(t)); };
        be.prototype.fromString = function (e) { var t = e.length; this.valueBlock.valueHex = new ArrayBuffer(2 * t); var r = new Uint8Array(this.valueBlock.valueHex); for (var n_51 = 0; n_51 < t; n_51++) {
            var t_89 = O(e.charCodeAt(n_51), 8), i_26 = new Uint8Array(t_89);
            if (i_26.length > 2)
                continue;
            var o_13 = 2 - i_26.length;
            for (var e_128 = i_26.length - 1; e_128 >= 0; e_128--)
                r[2 * n_51 + e_128 + o_13] = i_26[e_128];
        } this.valueBlock.value = e; };
        be.prototype.toString = function () { return this.constructor.blockName() + " : " + this.valueBlock.value; };
        return be;
    }(G));
    var ve = (function (_super) {
        __extends(ve, _super);
        function ve(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.isHexOnly = !0, _this.value = "";
            return _this;
        }
        ve.blockName = function () { return "UniversalStringValueBlock"; };
        ve.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.value = this.value, e; };
        return ve;
    }((j(F))));
    var we = (function (_super) {
        __extends(we, _super);
        function we(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, ve) || this, "value" in e && _this.fromString(e.value), _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 28;
            return _this;
        }
        we.blockName = function () { return "UniversalString"; };
        we.prototype.fromBER = function (e, t, r) { var n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); };
        we.prototype.fromBuffer = function (e) { var t = e.slice(0), r = new Uint8Array(t); for (var e_129 = 0; e_129 < r.length; e_129 += 4)
            r[e_129] = r[e_129 + 3], r[e_129 + 1] = r[e_129 + 2], r[e_129 + 2] = 0, r[e_129 + 3] = 0; this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(t)); };
        we.prototype.fromString = function (e) { var t = e.length; this.valueBlock.valueHex = new ArrayBuffer(4 * t); var r = new Uint8Array(this.valueBlock.valueHex); for (var n_52 = 0; n_52 < t; n_52++) {
            var t_90 = O(e.charCodeAt(n_52), 8), i_27 = new Uint8Array(t_90);
            if (i_27.length > 4)
                continue;
            var o_14 = 4 - i_27.length;
            for (var e_130 = i_27.length - 1; e_130 >= 0; e_130--)
                r[4 * n_52 + e_130 + o_14] = i_27[e_130];
        } this.valueBlock.value = e; };
        we.prototype.toString = function () { return this.constructor.blockName() + " : " + this.valueBlock.value; };
        return we;
    }(G));
    var Ae = (function (_super) {
        __extends(Ae, _super);
        function Ae(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.value = "", _this.isHexOnly = !0;
            return _this;
        }
        Ae.blockName = function () { return "SimpleStringValueBlock"; };
        Ae.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.value = this.value, e; };
        return Ae;
    }((j(F))));
    var Se = (function (_super) {
        __extends(Se, _super);
        function Se(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e, Ae) || this, "value" in e && _this.fromString(e.value);
            return _this;
        }
        Se.blockName = function () { return "SIMPLESTRING"; };
        Se.prototype.fromBER = function (e, t, r) { var n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); };
        Se.prototype.fromBuffer = function (e) { this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(e)); };
        Se.prototype.fromString = function (e) { var t = e.length; this.valueBlock.valueHex = new ArrayBuffer(t); var r = new Uint8Array(this.valueBlock.valueHex); for (var n_53 = 0; n_53 < t; n_53++)
            r[n_53] = e.charCodeAt(n_53); this.valueBlock.value = e; };
        Se.prototype.toString = function () { return this.constructor.blockName() + " : " + this.valueBlock.value; };
        return Se;
    }(G));
    var Ee = (function (_super) {
        __extends(Ee, _super);
        function Ee(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 18;
            return _this;
        }
        Ee.blockName = function () { return "NumericString"; };
        return Ee;
    }(Se));
    var ke = (function (_super) {
        __extends(ke, _super);
        function ke(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 19;
            return _this;
        }
        ke.blockName = function () { return "PrintableString"; };
        return ke;
    }(Se));
    var xe = (function (_super) {
        __extends(xe, _super);
        function xe(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 20;
            return _this;
        }
        xe.blockName = function () { return "TeletexString"; };
        return xe;
    }(Se));
    var Ne = (function (_super) {
        __extends(Ne, _super);
        function Ne(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 21;
            return _this;
        }
        Ne.blockName = function () { return "VideotexString"; };
        return Ne;
    }(Se));
    var Be = (function (_super) {
        __extends(Be, _super);
        function Be(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 22;
            return _this;
        }
        Be.blockName = function () { return "IA5String"; };
        return Be;
    }(Se));
    var Pe = (function (_super) {
        __extends(Pe, _super);
        function Pe(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 25;
            return _this;
        }
        Pe.blockName = function () { return "GraphicString"; };
        return Pe;
    }(Se));
    var _e = (function (_super) {
        __extends(_e, _super);
        function _e(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 26;
            return _this;
        }
        _e.blockName = function () { return "VisibleString"; };
        return _e;
    }(Se));
    var Ie = (function (_super) {
        __extends(Ie, _super);
        function Ie(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 27;
            return _this;
        }
        Ie.blockName = function () { return "GeneralString"; };
        return Ie;
    }(Se));
    var Oe = (function (_super) {
        __extends(Oe, _super);
        function Oe(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 29;
            return _this;
        }
        Oe.blockName = function () { return "CharacterString"; };
        return Oe;
    }(Se));
    var Te = (function (_super) {
        __extends(Te, _super);
        function Te(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            if (_this = _super.call(this, e) || this, _this.year = 0, _this.month = 0, _this.day = 0, _this.hour = 0, _this.minute = 0, _this.second = 0, "value" in e) {
                _this.fromString(e.value), _this.valueBlock.valueHex = new ArrayBuffer(e.value.length);
                var t_91 = new Uint8Array(_this.valueBlock.valueHex);
                for (var r_75 = 0; r_75 < e.value.length; r_75++)
                    t_91[r_75] = e.value.charCodeAt(r_75);
            }
            "valueDate" in e && (_this.fromDate(e.valueDate), _this.valueBlock.valueHex = _this.toBuffer()), _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 23;
            return _this;
        }
        Te.prototype.fromBER = function (e, t, r) { var n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); };
        Te.prototype.fromBuffer = function (e) { this.fromString(String.fromCharCode.apply(null, new Uint8Array(e))); };
        Te.prototype.toBuffer = function () { var e = this.toString(), t = new ArrayBuffer(e.length), r = new Uint8Array(t); for (var t_92 = 0; t_92 < e.length; t_92++)
            r[t_92] = e.charCodeAt(t_92); return t; };
        Te.prototype.fromDate = function (e) { this.year = e.getUTCFullYear(), this.month = e.getUTCMonth() + 1, this.day = e.getUTCDate(), this.hour = e.getUTCHours(), this.minute = e.getUTCMinutes(), this.second = e.getUTCSeconds(); };
        Te.prototype.toDate = function () { return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second)); };
        Te.prototype.fromString = function (e) { var t = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/gi.exec(e); if (null === t)
            return void (this.error = "Wrong input string for convertion"); var r = parseInt(t[1], 10); this.year = r >= 50 ? 1900 + r : 2e3 + r, this.month = parseInt(t[2], 10), this.day = parseInt(t[3], 10), this.hour = parseInt(t[4], 10), this.minute = parseInt(t[5], 10), this.second = parseInt(t[6], 10); };
        Te.prototype.toString = function () { var e = new Array(7); return e[0] = L(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2), e[1] = L(this.month, 2), e[2] = L(this.day, 2), e[3] = L(this.hour, 2), e[4] = L(this.minute, 2), e[5] = L(this.second, 2), e[6] = "Z", e.join(""); };
        Te.blockName = function () { return "UTCTime"; };
        Te.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.year = this.year, e.month = this.month, e.day = this.day, e.hour = this.hour, e.minute = this.minute, e.second = this.second, e; };
        return Te;
    }(_e));
    var Re = (function (_super) {
        __extends(Re, _super);
        function Re(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            if (_this = _super.call(this, e) || this, _this.year = 0, _this.month = 0, _this.day = 0, _this.hour = 0, _this.minute = 0, _this.second = 0, _this.millisecond = 0, "value" in e) {
                _this.fromString(e.value), _this.valueBlock.valueHex = new ArrayBuffer(e.value.length);
                var t_93 = new Uint8Array(_this.valueBlock.valueHex);
                for (var r_76 = 0; r_76 < e.value.length; r_76++)
                    t_93[r_76] = e.value.charCodeAt(r_76);
            }
            "valueDate" in e && (_this.fromDate(e.valueDate), _this.valueBlock.valueHex = _this.toBuffer()), _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 24;
            return _this;
        }
        Re.prototype.fromBER = function (e, t, r) { var n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); };
        Re.prototype.fromBuffer = function (e) { this.fromString(String.fromCharCode.apply(null, new Uint8Array(e))); };
        Re.prototype.toBuffer = function () { var e = this.toString(), t = new ArrayBuffer(e.length), r = new Uint8Array(t); for (var t_94 = 0; t_94 < e.length; t_94++)
            r[t_94] = e.charCodeAt(t_94); return t; };
        Re.prototype.fromDate = function (e) { this.year = e.getUTCFullYear(), this.month = e.getUTCMonth() + 1, this.day = e.getUTCDate(), this.hour = e.getUTCHours(), this.minute = e.getUTCMinutes(), this.second = e.getUTCSeconds(), this.millisecond = e.getUTCMilliseconds(); };
        Re.prototype.toDate = function () { return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)); };
        Re.prototype.fromString = function (e) { var t, r = !1, n = "", i = "", o = 0, s = 0, a = 0; if ("Z" === e[e.length - 1])
            n = e.substr(0, e.length - 1), r = !0;
        else {
            var t_95 = new Number(e[e.length - 1]);
            if (isNaN(t_95.valueOf()))
                throw new Error("Wrong input string for convertion");
            n = e;
        } if (r) {
            if (-1 !== n.indexOf("+"))
                throw new Error("Wrong input string for convertion");
            if (-1 !== n.indexOf("-"))
                throw new Error("Wrong input string for convertion");
        }
        else {
            var e_131 = 1, t_96 = n.indexOf("+"), r_77 = "";
            if (-1 === t_96 && (t_96 = n.indexOf("-"), e_131 = -1), -1 !== t_96) {
                if (r_77 = n.substr(t_96 + 1), n = n.substr(0, t_96), 2 !== r_77.length && 4 !== r_77.length)
                    throw new Error("Wrong input string for convertion");
                var i_28 = new Number(r_77.substr(0, 2));
                if (isNaN(i_28.valueOf()))
                    throw new Error("Wrong input string for convertion");
                if (s = e_131 * i_28, 4 === r_77.length) {
                    if (i_28 = new Number(r_77.substr(2, 2)), isNaN(i_28.valueOf()))
                        throw new Error("Wrong input string for convertion");
                    a = e_131 * i_28;
                }
            }
        } var c = n.indexOf("."); if (-1 === c && (c = n.indexOf(",")), -1 !== c) {
            var e_132 = new Number("0" + n.substr(c));
            if (isNaN(e_132.valueOf()))
                throw new Error("Wrong input string for convertion");
            o = e_132.valueOf(), i = n.substr(0, c);
        }
        else
            i = n; switch (!0) {
            case 8 === i.length:
                if (t = /(\d{4})(\d{2})(\d{2})/gi, -1 !== c)
                    throw new Error("Wrong input string for convertion");
                break;
            case 10 === i.length:
                if (t = /(\d{4})(\d{2})(\d{2})(\d{2})/gi, -1 !== c) {
                    var e_133 = 60 * o;
                    this.minute = Math.floor(e_133), e_133 = 60 * (e_133 - this.minute), this.second = Math.floor(e_133), e_133 = 1e3 * (e_133 - this.second), this.millisecond = Math.floor(e_133);
                }
                break;
            case 12 === i.length:
                if (t = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/gi, -1 !== c) {
                    var e_134 = 60 * o;
                    this.second = Math.floor(e_134), e_134 = 1e3 * (e_134 - this.second), this.millisecond = Math.floor(e_134);
                }
                break;
            case 14 === i.length:
                if (t = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/gi, -1 !== c) {
                    var e_135 = 1e3 * o;
                    this.millisecond = Math.floor(e_135);
                }
                break;
            default: throw new Error("Wrong input string for convertion");
        } var u = t.exec(i); if (null === u)
            throw new Error("Wrong input string for convertion"); for (var e_136 = 1; e_136 < u.length; e_136++)
            switch (e_136) {
                case 1:
                    this.year = parseInt(u[e_136], 10);
                    break;
                case 2:
                    this.month = parseInt(u[e_136], 10);
                    break;
                case 3:
                    this.day = parseInt(u[e_136], 10);
                    break;
                case 4:
                    this.hour = parseInt(u[e_136], 10) + s;
                    break;
                case 5:
                    this.minute = parseInt(u[e_136], 10) + a;
                    break;
                case 6:
                    this.second = parseInt(u[e_136], 10);
                    break;
                default: throw new Error("Wrong input string for convertion");
            } if (!1 === r) {
            var e_137 = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
            this.year = e_137.getUTCFullYear(), this.month = e_137.getUTCMonth(), this.day = e_137.getUTCDay(), this.hour = e_137.getUTCHours(), this.minute = e_137.getUTCMinutes(), this.second = e_137.getUTCSeconds(), this.millisecond = e_137.getUTCMilliseconds();
        } };
        Re.prototype.toString = function () { var e = []; return e.push(L(this.year, 4)), e.push(L(this.month, 2)), e.push(L(this.day, 2)), e.push(L(this.hour, 2)), e.push(L(this.minute, 2)), e.push(L(this.second, 2)), 0 !== this.millisecond && (e.push("."), e.push(L(this.millisecond, 3))), e.push("Z"), e.join(""); };
        Re.blockName = function () { return "GeneralizedTime"; };
        Re.prototype.toJSON = function () { var e = {}; try {
            e = _super.prototype.toJSON.call(this);
        }
        catch (e) { } return e.year = this.year, e.month = this.month, e.day = this.day, e.hour = this.hour, e.minute = this.minute, e.second = this.second, e.millisecond = this.millisecond, e; };
        return Re;
    }(_e));
    var Ce = (function (_super) {
        __extends(Ce, _super);
        function Ce(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 31;
            return _this;
        }
        Ce.blockName = function () { return "DATE"; };
        return Ce;
    }(de));
    var Me = (function (_super) {
        __extends(Me, _super);
        function Me(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 32;
            return _this;
        }
        Me.blockName = function () { return "TimeOfDay"; };
        return Me;
    }(de));
    var Le = (function (_super) {
        __extends(Le, _super);
        function Le(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 33;
            return _this;
        }
        Le.blockName = function () { return "DateTime"; };
        return Le;
    }(de));
    var Ue = (function (_super) {
        __extends(Ue, _super);
        function Ue(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 34;
            return _this;
        }
        Ue.blockName = function () { return "Duration"; };
        return Ue;
    }(de));
    var De = (function (_super) {
        __extends(De, _super);
        function De(e) {
            if (e === void 0) { e = {}; }
            var _this = this;
            _this = _super.call(this, e) || this, _this.idBlock.tagClass = 1, _this.idBlock.tagNumber = 14;
            return _this;
        }
        De.blockName = function () { return "TIME"; };
        return De;
    }(de));
    var Fe = (function () {
        function Fe(e) {
            if (e === void 0) { e = {}; }
            this.value = B(e, "value", []), this.optional = B(e, "optional", !1);
        }
        return Fe;
    }());
    var je = (function () {
        function je(e) {
            if (e === void 0) { e = {}; }
            this.name = B(e, "name", ""), this.optional = B(e, "optional", !1);
        }
        return je;
    }());
    var He = (function () {
        function He(e) {
            if (e === void 0) { e = {}; }
            this.name = B(e, "name", ""), this.optional = B(e, "optional", !1), this.value = B(e, "value", new je), this.local = B(e, "local", !1);
        }
        return He;
    }());
    var Ve = (function () {
        function Ve(e) {
            if (e === void 0) { e = {}; }
            this.data = B(e, "data", new ArrayBuffer(0));
        }
        Ve.prototype.fromBER = function (e, t, r) { return this.data = e.slice(t, r), t + r; };
        Ve.prototype.toBER = function (e) {
            if (e === void 0) { e = !1; }
            return this.data;
        };
        return Ve;
    }());
    function ze(e, t, r) { var n = t; var i = new G({}, Object); var o = new F; if (!1 === _(o, e, t, r))
        return i.error = o.error, { offset: -1, result: i }; if (0 === new Uint8Array(e, t, r).length)
        return i.error = "Zero buffer length", { offset: -1, result: i }; var s = i.idBlock.fromBER(e, t, r); if (i.warnings.concat(i.idBlock.warnings), -1 === s)
        return i.error = i.idBlock.error, { offset: -1, result: i }; if (t = s, r -= i.idBlock.blockLength, s = i.lenBlock.fromBER(e, t, r), i.warnings.concat(i.lenBlock.warnings), -1 === s)
        return i.error = i.lenBlock.error, { offset: -1, result: i }; if (t = s, r -= i.lenBlock.blockLength, !1 === i.idBlock.isConstructed && !0 === i.lenBlock.isIndefiniteForm)
        return i.error = "Indefinite length form used for primitive encoding form", { offset: -1, result: i }; var a = G; if (1 === i.idBlock.tagClass) {
        if (i.idBlock.tagNumber >= 37 && !1 === i.idBlock.isHexOnly)
            return i.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard", { offset: -1, result: i };
        switch (i.idBlock.tagNumber) {
            case 0:
                if (!0 === i.idBlock.isConstructed && i.lenBlock.length > 0)
                    return i.error = "Type [UNIVERSAL 0] is reserved", { offset: -1, result: i };
                a = Z;
                break;
            case 1:
                a = Y;
                break;
            case 2:
                a = ae;
                break;
            case 3:
                a = oe;
                break;
            case 4:
                a = ne;
                break;
            case 5:
                a = te;
                break;
            case 6:
                a = le;
                break;
            case 10:
                a = ce;
                break;
            case 12:
                a = de;
                break;
            case 13:
                a = me;
                break;
            case 14:
                a = De;
                break;
            case 15: return i.error = "[UNIVERSAL 15] is reserved by ASN.1 standard", { offset: -1, result: i };
            case 16:
                a = Q;
                break;
            case 17:
                a = ee;
                break;
            case 18:
                a = Ee;
                break;
            case 19:
                a = ke;
                break;
            case 20:
                a = xe;
                break;
            case 21:
                a = Ne;
                break;
            case 22:
                a = Be;
                break;
            case 23:
                a = Te;
                break;
            case 24:
                a = Re;
                break;
            case 25:
                a = Pe;
                break;
            case 26:
                a = _e;
                break;
            case 27:
                a = Ie;
                break;
            case 28:
                a = we;
                break;
            case 29:
                a = Oe;
                break;
            case 30:
                a = be;
                break;
            case 31:
                a = Ce;
                break;
            case 32:
                a = Me;
                break;
            case 33:
                a = Le;
                break;
            case 34:
                a = Ue;
                break;
            default: {
                var e_138;
                e_138 = !0 === i.idBlock.isConstructed ? new $ : new K, e_138.idBlock = i.idBlock, e_138.lenBlock = i.lenBlock, e_138.warnings = i.warnings, i = e_138;
            }
        }
    }
    else
        a = !0 === i.idBlock.isConstructed ? $ : K; return i = function (e, t) { if (e instanceof t)
        return e; var r = new t; return r.idBlock = e.idBlock, r.lenBlock = e.lenBlock, r.warnings = e.warnings, r.valueBeforeDecode = e.valueBeforeDecode.slice(0), r; }(i, a), s = i.fromBER(e, t, !0 === i.lenBlock.isIndefiniteForm ? r : i.lenBlock.length), i.valueBeforeDecode = e.slice(n, n + i.blockLength), { offset: s, result: i }; }
    function Ge(e) { if (0 === e.byteLength) {
        var e_139 = new G({}, Object);
        return e_139.error = "Input buffer has zero length", { offset: -1, result: e_139 };
    } return ze(e, 0, e.byteLength); }
    function qe(e, t, r) { if (r instanceof Fe) {
        var n_54 = !1;
        for (var n_55 = 0; n_55 < r.value.length; n_55++)
            if (!0 === qe(e, t, r.value[n_55]).verified)
                return { verified: !0, result: e };
        if (!1 === n_54) {
            var e_140 = { verified: !1, result: { error: "Wrong values for Choice type" } };
            return r.hasOwnProperty("name") && (e_140.name = r.name), e_140;
        }
    } if (r instanceof je)
        return r.hasOwnProperty("name") && (e[r.name] = t), { verified: !0, result: e }; if (e instanceof Object == 0)
        return { verified: !1, result: { error: "Wrong root object" } }; if (t instanceof Object == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 data" } }; if (r instanceof Object == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if ("idBlock" in r == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if ("fromBER" in r.idBlock == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if ("toBER" in r.idBlock == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; var n = r.idBlock.toBER(!1); if (0 === n.byteLength)
        return { verified: !1, result: { error: "Error encoding idBlock for ASN.1 schema" } }; if (-1 === r.idBlock.fromBER(n, 0, n.byteLength))
        return { verified: !1, result: { error: "Error decoding idBlock for ASN.1 schema" } }; if (!1 === r.idBlock.hasOwnProperty("tagClass"))
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if (r.idBlock.tagClass !== t.idBlock.tagClass)
        return { verified: !1, result: e }; if (!1 === r.idBlock.hasOwnProperty("tagNumber"))
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if (r.idBlock.tagNumber !== t.idBlock.tagNumber)
        return { verified: !1, result: e }; if (!1 === r.idBlock.hasOwnProperty("isConstructed"))
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if (r.idBlock.isConstructed !== t.idBlock.isConstructed)
        return { verified: !1, result: e }; if ("isHexOnly" in r.idBlock == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if (r.idBlock.isHexOnly !== t.idBlock.isHexOnly)
        return { verified: !1, result: e }; if (!0 === r.idBlock.isHexOnly) {
        if ("valueHex" in r.idBlock == 0)
            return { verified: !1, result: { error: "Wrong ASN.1 schema" } };
        var n_56 = new Uint8Array(r.idBlock.valueHex), i_29 = new Uint8Array(t.idBlock.valueHex);
        if (n_56.length !== i_29.length)
            return { verified: !1, result: e };
        for (var t_97 = 0; t_97 < n_56.length; t_97++)
            if (n_56[t_97] !== i_29[1])
                return { verified: !1, result: e };
    } if (r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (e[r.name] = t)), !0 === r.idBlock.isConstructed) {
        var n_57 = 0, i_30 = { verified: !1 }, o_15 = r.valueBlock.value.length;
        if (o_15 > 0 && r.valueBlock.value[0] instanceof He && (o_15 = t.valueBlock.value.length), 0 === o_15)
            return { verified: !0, result: e };
        if (0 === t.valueBlock.value.length && 0 !== r.valueBlock.value.length) {
            var t_98 = !0;
            for (var e_141 = 0; e_141 < r.valueBlock.value.length; e_141++)
                t_98 = t_98 && (r.valueBlock.value[e_141].optional || !1);
            return !0 === t_98 ? { verified: !0, result: e } : (r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && delete e[r.name]), e.error = "Inconsistent object length", { verified: !1, result: e });
        }
        for (var s_12 = 0; s_12 < o_15; s_12++)
            if (s_12 - n_57 >= t.valueBlock.value.length) {
                if (!1 === r.valueBlock.value[s_12].optional) {
                    var t_99 = { verified: !1, result: e };
                    return e.error = "Inconsistent length between ASN.1 data and schema", r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (delete e[r.name], t_99.name = r.name)), t_99;
                }
            }
            else if (r.valueBlock.value[0] instanceof He) {
                if (i_30 = qe(e, t.valueBlock.value[s_12], r.valueBlock.value[0].value), !1 === i_30.verified) {
                    if (!0 !== r.valueBlock.value[0].optional)
                        return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && delete e[r.name]), i_30;
                    n_57++;
                }
                if ("name" in r.valueBlock.value[0] && r.valueBlock.value[0].name.length > 0) {
                    var n_58 = {};
                    n_58 = "local" in r.valueBlock.value[0] && !0 === r.valueBlock.value[0].local ? t : e, void 0 === n_58[r.valueBlock.value[0].name] && (n_58[r.valueBlock.value[0].name] = []), n_58[r.valueBlock.value[0].name].push(t.valueBlock.value[s_12]);
                }
            }
            else if (i_30 = qe(e, t.valueBlock.value[s_12 - n_57], r.valueBlock.value[s_12]), !1 === i_30.verified) {
                if (!0 !== r.valueBlock.value[s_12].optional)
                    return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && delete e[r.name]), i_30;
                n_57++;
            }
        if (!1 === i_30.verified) {
            var t_100 = { verified: !1, result: e };
            return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (delete e[r.name], t_100.name = r.name)), t_100;
        }
        return { verified: !0, result: e };
    } if ("primitiveSchema" in r && "valueHex" in t.valueBlock) {
        var n_59 = Ge(t.valueBlock.valueHex);
        if (-1 === n_59.offset) {
            var t_101 = { verified: !1, result: n_59.result };
            return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (delete e[r.name], t_101.name = r.name)), t_101;
        }
        return qe(e, n_59.result, r.primitiveSchema);
    } return { verified: !0, result: e }; }
    function Ke(e, t) { if (t instanceof Object == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema type" } }; var r = Ge(e); return -1 === r.offset ? { verified: !1, result: r.result } : qe(r.result, r.result, t); }
    function We(e) { }
    var $e, Je, Ze, Xe;
    (Xe = $e || ($e = {}))[Xe.Sequence = 0] = "Sequence", Xe[Xe.Set = 1] = "Set", Xe[Xe.Choice = 2] = "Choice", (Ze = Je || (Je = {}))[Ze.Any = 1] = "Any", Ze[Ze.Boolean = 2] = "Boolean", Ze[Ze.OctetString = 3] = "OctetString", Ze[Ze.BitString = 4] = "BitString", Ze[Ze.Integer = 5] = "Integer", Ze[Ze.Enumerated = 6] = "Enumerated", Ze[Ze.ObjectIdentifier = 7] = "ObjectIdentifier", Ze[Ze.Utf8String = 8] = "Utf8String", Ze[Ze.BmpString = 9] = "BmpString", Ze[Ze.UniversalString = 10] = "UniversalString", Ze[Ze.NumericString = 11] = "NumericString", Ze[Ze.PrintableString = 12] = "PrintableString", Ze[Ze.TeletexString = 13] = "TeletexString", Ze[Ze.VideotexString = 14] = "VideotexString", Ze[Ze.IA5String = 15] = "IA5String", Ze[Ze.GraphicString = 16] = "GraphicString", Ze[Ze.VisibleString = 17] = "VisibleString", Ze[Ze.GeneralString = 18] = "GeneralString", Ze[Ze.CharacterString = 19] = "CharacterString", Ze[Ze.UTCTime = 20] = "UTCTime", Ze[Ze.GeneralizedTime = 21] = "GeneralizedTime", Ze[Ze.DATE = 22] = "DATE", Ze[Ze.TimeOfDay = 23] = "TimeOfDay", Ze[Ze.DateTime = 24] = "DateTime", Ze[Ze.Duration = 25] = "Duration", Ze[Ze.TIME = 26] = "TIME", Ze[Ze.Null = 27] = "Null";
    var Ye = { fromASN: function (e) { return e instanceof te ? null : e.valueBeforeDecode; }, toASN: function (e) { if (null === e)
            return new te; var t = Ge(e); if (t.result.error)
            throw new Error(t.result.error); return t.result; } }, Qe = { fromASN: function (e) { return e.valueBlock.valueHex.byteLength > 4 ? e.valueBlock.toString() : e.valueBlock.valueDec; }, toASN: function (e) { return new ae({ value: e }); } }, et = { fromASN: function (e) { return e.valueBlock.valueDec; }, toASN: function (e) { return new ce({ value: e }); } }, tt = { fromASN: function (e) { return e.valueBlock.valueHex; }, toASN: function (e) { return new oe({ valueHex: e }); } }, rt = { fromASN: function (e) { return e.valueBlock.toString(); }, toASN: function (e) { return new le({ value: e }); } }, nt = { fromASN: function (e) { return e.valueBlock.value; }, toASN: function (e) { return new Y({ value: e }); } }, it = { fromASN: function (e) { return e.valueBlock.valueHex; }, toASN: function (e) { return new ne({ valueHex: e }); } };
    function ot(e) { return { fromASN: function (e) { return e.valueBlock.value; }, toASN: function (t) { return new e({ value: t }); } }; }
    var st = ot(de), at = ot(be), ct = ot(we), ut = ot(Ee), ft = ot(ke), lt = ot(xe), ht = ot(Ne), dt = ot(Be), pt = ot(Pe), gt = ot(_e), mt = ot(Ie), yt = ot(Oe), bt = { fromASN: function (e) { return e.toDate(); }, toASN: function (e) { return new Te({ valueDate: e }); } }, vt = { fromASN: function (e) { return e.toDate(); }, toASN: function (e) { return new Re({ valueDate: e }); } }, wt = { fromASN: function (e) { return null; }, toASN: function (e) { return new te; } };
    function At(e) { switch (e) {
        case Je.Any: return Ye;
        case Je.BitString: return tt;
        case Je.BmpString: return at;
        case Je.Boolean: return nt;
        case Je.CharacterString: return yt;
        case Je.Enumerated: return et;
        case Je.GeneralString: return mt;
        case Je.GeneralizedTime: return vt;
        case Je.GraphicString: return pt;
        case Je.IA5String: return dt;
        case Je.Integer: return Qe;
        case Je.Null: return wt;
        case Je.NumericString: return ut;
        case Je.ObjectIdentifier: return rt;
        case Je.OctetString: return it;
        case Je.PrintableString: return ft;
        case Je.TeletexString: return lt;
        case Je.UTCTime: return bt;
        case Je.UniversalString: return ct;
        case Je.Utf8String: return st;
        case Je.VideotexString: return ht;
        case Je.VisibleString: return gt;
        default: return null;
    } }
    function St(e) { return e && e.prototype ? !(!e.prototype.toASN || !e.prototype.fromASN) || St(e.prototype) : !!(e && e.toASN && e.fromASN); }
    function Et(e) { var t; if (e) {
        var r_78 = Object.getPrototypeOf(e);
        return (null === (t = null == r_78 ? void 0 : r_78.prototype) || void 0 === t ? void 0 : t.constructor) === Array || Et(r_78);
    } return !1; }
    r(2043);
    var kt = new (function () {
        function class_3() {
            this.items = new WeakMap;
        }
        class_3.prototype.has = function (e) { return this.items.has(e); };
        class_3.prototype.get = function (e) { var t, r, n, i; var o = this.items.get(e); if (!o)
            throw new Error("Cannot get schema for '" + (null !== (i = null === (n = null === (r = null === (t = e) || void 0 === t ? void 0 : t.prototype) || void 0 === r ? void 0 : r.constructor) || void 0 === n ? void 0 : n.name) && void 0 !== i ? i : e) + "' target"); return o; };
        class_3.prototype.cache = function (e) { var t = this.get(e); t.schema || (t.schema = this.create(e, !0)); };
        class_3.prototype.createDefault = function (e) { var t = { type: $e.Sequence, items: {} }, r = this.findParentSchema(e); return r && (Object.assign(t, r), t.items = Object.assign({}, t.items, r.items)), t; };
        class_3.prototype.create = function (t, r) { var n = this.items.get(t) || this.createDefault(t), i = []; for (var t_102 in n.items) {
            var o_16 = n.items[t_102], s_13 = r ? t_102 : "";
            var a_12 = void 0;
            if ("number" == typeof o_16.type) {
                var t_103 = Je[o_16.type], r_79 = e[t_103];
                if (!r_79)
                    throw new Error("Cannot get ASN1 class by name '" + t_103 + "'");
                a_12 = new r_79({ name: s_13 });
            }
            else
                St(o_16.type) ? a_12 = (new o_16.type).toSchema(s_13) : o_16.optional ? this.get(o_16.type).type === $e.Choice ? a_12 = new je({ name: s_13 }) : (a_12 = this.create(o_16.type, !1), a_12.name = s_13) : a_12 = new je({ name: s_13 });
            var c_6 = !!o_16.optional || void 0 !== o_16.defaultValue;
            if (o_16.repeated && (a_12.name = "", a_12 = new ("set" === o_16.repeated ? ee : Q)({ name: "", value: [new He({ name: s_13, value: a_12 })] })), null !== o_16.context && void 0 !== o_16.context)
                if (o_16.implicit)
                    if ("number" == typeof o_16.type || St(o_16.type)) {
                        var e_142 = o_16.repeated ? $ : K;
                        i.push(new e_142({ name: s_13, optional: c_6, idBlock: { tagClass: 3, tagNumber: o_16.context } }));
                    }
                    else {
                        this.cache(o_16.type);
                        var e_143 = !!o_16.repeated;
                        var t_104 = e_143 ? a_12 : this.get(o_16.type).schema;
                        t_104 = t_104.valueBlock ? t_104.valueBlock.value : t_104.value, i.push(new $({ name: e_143 ? "" : s_13, optional: c_6, idBlock: { tagClass: 3, tagNumber: o_16.context }, value: t_104 }));
                    }
                else
                    i.push(new $({ optional: c_6, idBlock: { tagClass: 3, tagNumber: o_16.context }, value: [a_12] }));
            else
                a_12.optional = c_6, i.push(a_12);
        } switch (n.type) {
            case $e.Sequence: return new Q({ value: i, name: "" });
            case $e.Set: return new ee({ value: i, name: "" });
            case $e.Choice: return new Fe({ value: i, name: "" });
            default: throw new Error("Unsupported ASN1 type in use");
        } };
        class_3.prototype.set = function (e, t) { return this.items.set(e, t), this; };
        class_3.prototype.findParentSchema = function (e) { var t = e.__proto__; return t ? this.items.get(t) || this.findParentSchema(t) : null; };
        return class_3;
    }()), xt = function (e) { return function (t) { var r; kt.has(t) ? r = kt.get(t) : (r = kt.createDefault(t), kt.set(t, r)), Object.assign(r, e); }; }, Nt = function (e) { return function (t, r) { var n; kt.has(t.constructor) ? n = kt.get(t.constructor) : (n = kt.createDefault(t.constructor), kt.set(t.constructor, n)); var i = Object.assign({}, e); if ("number" == typeof i.type && !i.converter) {
        var n_60 = At(e.type);
        if (!n_60)
            throw new Error("Cannot get default converter for property '" + r + "' of " + t.constructor.name);
        i.converter = n_60;
    } n.items[r] = i; }; };
    var Bt = (function (_super) {
        __extends(Bt, _super);
        function Bt() {
            var _this = this;
            _this = _super.apply(this, arguments) || this, _this.schemas = [];
            return _this;
        }
        return Bt;
    }(Error));
    var Pt = (function () {
        function Pt() {
        }
        Pt.parse = function (e, t) { var r; if (e instanceof ArrayBuffer)
            r = e;
        else if ("undefined" != typeof Buffer && Buffer.isBuffer(e))
            r = new Uint8Array(e).buffer;
        else {
            if (!(ArrayBuffer.isView(e) || e.buffer instanceof ArrayBuffer))
                throw new TypeError("Wrong type of 'data' argument");
            r = e.buffer;
        } var n = Ge(r); if (n.result.error)
            throw new Error(n.result.error); return this.fromASN(n.result, t); };
        Pt.fromASN = function (t, r) {
            var _this = this;
            var n;
            try {
                if (St(r))
                    return (new r).fromASN(t);
                var i_31 = kt.get(r);
                kt.cache(r);
                var o_17 = i_31.schema;
                if (t.constructor === $ && i_31.type !== $e.Choice) {
                    o_17 = new $({ idBlock: { tagClass: 3, tagNumber: t.idBlock.tagNumber }, value: i_31.schema.valueBlock.value });
                    for (var e_144 in i_31.items)
                        delete t[e_144];
                }
                var s_14 = qe(t, t, o_17);
                if (!s_14.verified)
                    throw new Bt("Data does not match to " + r.name + " ASN1 schema. " + s_14.result.error);
                var a_13 = new r;
                if (Et(r)) {
                    if ("number" == typeof i_31.itemType) {
                        var e_145 = At(i_31.itemType);
                        if (!e_145)
                            throw new Error("Cannot get default converter for array item of " + r.name + " ASN1 schema");
                        return r.from(t.valueBlock.value, (function (t) { return e_145.fromASN(t); }));
                    }
                    return r.from(t.valueBlock.value, (function (e) { return _this.fromASN(e, i_31.itemType); }));
                }
                var _loop_4 = function (r_80) {
                    if (!t[r_80])
                        return "continue";
                    var o_18 = i_31.items[r_80];
                    if ("number" == typeof o_18.type || St(o_18.type)) {
                        var i_32 = null !== (n = o_18.converter) && void 0 !== n ? n : St(o_18.type) ? new o_18.type : null;
                        if (!i_32)
                            throw new Error("Converter is empty");
                        if (o_18.repeated)
                            if (o_18.implicit) {
                                var e_146 = new ("sequence" === o_18.repeated ? Q : ee);
                                e_146.valueBlock = t[r_80].valueBlock;
                                var n_61 = Ge(e_146.toBER(!1)).result.valueBlock.value;
                                a_13[r_80] = Array.from(n_61, (function (e) { return i_32.fromASN(e); }));
                            }
                            else
                                a_13[r_80] = Array.from(t[r_80], (function (e) { return i_32.fromASN(e); }));
                        else {
                            var n_62 = t[r_80];
                            if (o_18.implicit) {
                                var t_105 = void 0;
                                if (St(o_18.type))
                                    t_105 = (new o_18.type).toSchema("");
                                else {
                                    var r_81 = Je[o_18.type], n_63 = e[r_81];
                                    if (!n_63)
                                        throw new Error("Cannot get '" + r_81 + "' class from asn1js module");
                                    t_105 = new n_63;
                                }
                                t_105.valueBlock = n_62.valueBlock, n_62 = Ge(t_105.toBER(!1)).result;
                            }
                            a_13[r_80] = i_32.fromASN(n_62);
                        }
                    }
                    else
                        o_18.repeated ? a_13[r_80] = Array.from(t[r_80], (function (e) { return _this.fromASN(e, o_18.type); })) : a_13[r_80] = this_1.fromASN(t[r_80], o_18.type);
                };
                var this_1 = this;
                for (var r_80 in i_31.items) {
                    _loop_4(r_80);
                }
                return a_13;
            }
            catch (e) {
                throw e instanceof Bt && e.schemas.push(r.name), e;
            }
        };
        return Pt;
    }());
    var _t = (function (_super) {
        __extends(_t, _super);
        function _t(e) {
            if (e === void 0) { e = []; }
            var _this = this;
            if ("number" == typeof e)
                _this = _super.call(this, e) || this;
            else {
                _this = _super.call(this) || this;
                for (var _i = 0, e_147 = e; _i < e_147.length; _i++) {
                    var t_106 = e_147[_i];
                    _this.push(t_106);
                }
            }
            return _this;
        }
        return _t;
    }(Array));
    var It = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var Ot = (function () {
        function Ot() {
        }
        return Ot;
    }());
    It([Nt({ type: Je.OctetString })], Ot.prototype, "riddle", void 0), It([Nt({ type: Je.OctetString })], Ot.prototype, "challengePoint", void 0), It([Nt({ type: Je.OctetString })], Ot.prototype, "responseValue", void 0), It([Nt({ type: Je.OctetString })], Ot.prototype, "nonce", void 0);
    var Tt = (function () {
        function Tt() {
        }
        return Tt;
    }());
    It([Nt({ type: Je.OctetString })], Tt.prototype, "challengePoint", void 0), It([Nt({ type: Je.OctetString })], Tt.prototype, "responseValue", void 0), It([Nt({ type: Je.OctetString })], Tt.prototype, "nonce", void 0), r(4956);
    var Rt = { END_OF_CONTENT: 0, BOOLEAN: 1, INTEGER: 2, BIT_STRING: 3, OCTET_STRING: 4, NULL_VALUE: 5, OBJECT_ID: 6, OBJECT_DESCRIPTOR: 7, EXTERNAL: 8, REAL: 9, ENUMERATED: 10, EMBEDDED_PDV: 11, UTF8STRING: 12, RELATIVE_OID: 13, SEQUENCE_10: 16, SET_OF: 17, NUMERABLE_STRING: 18, PRINTABLE_STRING: 19, T61STRING: 20, VIDEO_TEX_STRING: 21, IA5STRING: 22, UTC_TIME: 23, GENERALIZED_TIME: 24, GRAPHIC_STRING: 25, VISIBLE_STRING: 26, GENERAL_STRING: 27, UNIVERSAL_STRING: 28, CHARACTER_STRING: 29, BMP_STRING: 30, SEQUENCE_30: 48, SET: 49 }, Ct = { 0: "END_OF_CONTENT", 1: "BOOLEAN", 2: "INTEGER", 3: "BIT_STRING", 4: "OCTET_STRING", 5: "NULL_VALUE", 6: "OBJECT_ID", 7: "OBJECT_DESCRIPTOR", 8: "EXTERNAL", 9: "REAL", 10: "ENUMERATED", 11: "EMBEDDED_PDV", 12: "UTF8STRING", 13: "RELATIVE_OID", 16: "SEQUENCE_10", 19: "PRINTABLE_STRING", 22: "IA5STRING", 24: "GENERALIZED_TIME", 26: "VISIBLE_STRING", 48: "SEQUENCE_30", 49: "SET" }, Mt = { CN: "2.5.4.3", C: "2.5.4.6", O: "2.5.4.10", OU: "2.5.4.11", L: "2.5.4.7", labeledURI: "1.3.6.1.4.1.250.1.57" };
    var Lt = (function () {
        function Lt() {
        }
        Lt.encodeAsInteger = function (e) { return this.encode("INTEGER", e); };
        Lt.encodeObjectId = function (e) { return Lt.encode("SEQUENCE_30", Lt.encode("OBJECT_ID", e)); };
        Lt.parseX500Names = function (e) { var t = e.matchAll(/(\w+)=("[^"]+"|[\w\.]+)/g), r = ""; if (!t)
            throw new Error("wrong Name format"); var n = []; for (var _i = 0, t_107 = t; _i < t_107.length; _i++) {
            var e_148 = t_107[_i];
            var t_108 = e_148[1], i_33 = e_148[2];
            if ('"' == i_33.substr(0, 1) && '"' == i_33.substr(-1) && (i_33 = i_33.slice(1, i_33.length - 1)), r = Mt[t_108], !r)
                throw new Error('Type "' + t_108 + '" not implemented yet');
            n.push({ type: t_108, value: i_33 });
        } return n; };
        Lt.encodeName = function (e) { var t = ""; return Lt.parseX500Names(e).forEach((function (e) { var r = Mt[e.type]; if (!r)
            throw new Error("X500 Name Object ID not implemented.(" + e.value + ")"); var n = Lt.encode("OBJECT_ID", r) + Lt.encode("UTF8STRING", e.value); t += Lt.encode("SEQUENCE_30", n); })), Lt.encode("SEQUENCE_30", Lt.encode("SET", t)); };
        Lt.encode = function (e, t, r) {
            if (r === void 0) { r = 0; }
            if (void 0 === t)
                throw new Error("Missing value for Der encoding");
            var i = Rt[e], o = "";
            switch (e) {
                case "OBJECT_ID":
                    if ("string" != typeof t)
                        throw new Error("OBJECT_ID value must be a string");
                    var s_15 = t.split("."), a_14 = s_15.shift(), c_7 = s_15.shift();
                    s_15.unshift((40 * parseInt(a_14) + parseInt(c_7)).toString()), s_15.forEach((function (e) { var t = parseInt(e), r = "", n = !0; do {
                        var e_149 = 127 & t;
                        t >>= 7, e_149 += n ? 0 : 128, r = e_149.toString(16).padStart(2, "0") + r, n = !1;
                    } while (t); o += r; }));
                    break;
                case "NULL_VALUE":
                    o = "";
                    break;
                case "GENERALIZED_TIME":
                    o = n(function (e) { var t = new Date(e), r = "" + (t.getUTCMonth() + 1), n = "" + t.getUTCDate(), i = t.getUTCFullYear(); var o = "" + t.getUTCHours(), s = "" + t.getUTCMinutes(), a = "" + t.getUTCSeconds(); return r.length < 2 && (r = "0" + r), n.length < 2 && (n = "0" + n), o.length < 2 && (o = "0" + o), s.length < 2 && (s = "0" + s), a.length < 2 && (a = "0" + a), [i, r, n, o, s, a].join("") + "Z"; }(t));
                    break;
                case "VISIBLE_STRING":
                case "UTF8STRING":
                    o = n(t);
                    break;
                case "INTEGER":
                    o = BigInt(t).toString(16), o = (o.length % 2 ? "0" : "") + o, parseInt("0x" + o.slice(0, 1), 16) > 7 && (o = "00" + o);
                    break;
                case "TAG":
                    if (r > 15)
                        throw new Error("DER TAG more than 15 is not implemented");
                    i = parseInt("0xA" + r);
                case "SEQUENCE_30":
                case "SET":
                case "OCTET_STRING":
                    if ("string" == typeof t)
                        o = t;
                    else {
                        if (t.constructor !== Uint8Array)
                            throw new Error("Wrong data type for OCTET_STRING");
                        o = b(t);
                    }
                    break;
                case "BIT_STRING":
                    o = "00" + t;
                    break;
                case "BOOLEAN":
                    o = parseInt(t).toString().padStart(2, "0");
                    break;
                default: throw new Error("Sorry, " + e + " not implemented.");
            }
            var s = "", a = Math.ceil(o.length / 2), c = a.toString(16);
            return a || (c = "00"), c = (c.length % 2 ? "0" : "") + c, s = a < 128 ? c : (128 + Math.round(c.length / 2)).toString(16) + c, o = (o.length % 2 ? "0" : "") + o, i.toString(16).padStart(2, "0") + s + o;
        };
        Lt.prototype.decode = function (e) { var t = Array.from(e); return this.read(t); };
        Lt.prototype.lenEncoded = function (e) { var t = e.shift(); if (t < 128)
            return t; if (t > 128) {
            var r_82 = 0;
            for (var n_64 = 0; n_64 < t - 128; n_64++)
                r_82 = (r_82 << 8) + e.shift();
            return r_82;
        } if (128 == t)
            throw new Error("have to code variable length"); };
        Lt.prototype.readFromHexString = function (e) { return this.read(i(e)); };
        Lt.prototype.readFromUint8Array = function (e) { return this.read(Array.from(e)); };
        Lt.prototype.readFromBase64String = function (e) { return this.readFromUint8Array(g(e)); };
        Lt.prototype.readFromUrlBase64String = function (e) { var t = e.split("_").join("/").split("-").join("+").split(".").join("="); return this.readFromBase64String(t); };
        Lt.prototype.read = function (e) { var t = e.shift(), r = this.lenEncoded(e), n = Ct[t]; S(4, "Der utility typeTagName:" + n); var i = []; for (var t_109 = 0; t_109 < r; t_109++)
            i.push(e.shift()); S(4, "Der Utility content"), S(4, i); var o = ""; switch (n) {
            case "SEQUENCE_30": return this.BodySequence(i);
            case "INTEGER":
            case "BIT_STRING":
                var e_150 = 0n;
                for (; i.length;)
                    e_150 <<= 8n, e_150 += BigInt(i.shift());
                return e_150;
            case "OCTET_STRING":
                for (; i.length;)
                    o += i.shift().toString(16).padStart(2, "0");
                return o;
            case "GENERALIZED_TIME":
            case "VISIBLE_STRING":
                for (; i.length;)
                    o += String.fromCharCode(i.shift());
                return o;
        } };
        Lt.prototype.BodySequence = function (e) { var t = []; for (; e.length;)
            t.push(this.read(e)); return t; };
        return Lt;
    }());
    var Ut = (function () {
        function Ut() {
        }
        Ut.fromData = function (e, t, r) {
            if (r === void 0) { r = new Uint8Array([]); }
            var n = new this;
            return n.tPoint = e, n.challenge = t, n.nonce = r, n.encoding = n.makeEncoding(e, t), n;
        };
        Ut.prototype.fromBase64 = function (e) { this.encoding = e, this.fromBytes(g(e)); };
        Ut.prototype.fromBytes = function (e) { this.encodingBytes = e; var t = Pt.parse(v(e), Tt); this.challenge = u(new Uint8Array(t.challengePoint)); var r = new Uint8Array(t.responseValue); this.nonce = new Uint8Array(t.nonce), this.tPoint = N.decodeFromHex(b(r), x); };
        Ut.prototype.makeEncoding = function (e, t) { var r = Lt.encode("OCTET_STRING", b(f(this.challenge))) + Lt.encode("OCTET_STRING", b(this.tPoint.getEncoded(!1))) + Lt.encode("OCTET_STRING", b(this.nonce)); return Lt.encode("SEQUENCE_30", r); };
        Ut.prototype.getPoint = function () { return this.tPoint; };
        Ut.prototype.getChallenge = function () { return this.challenge; };
        Ut.prototype.getDerEncoding = function () { return this.encoding; };
        Ut.prototype.getNonce = function () { return this.nonce; };
        return Ut;
    }());
    var Dt = (function () {
        function Dt() {
        }
        Dt.fromData = function (e, t, r, n) {
            if (n === void 0) { n = new Uint8Array([]); }
            var i = new this;
            return i.riddle = e, i.tPoint = t, i.challenge = r, i.nonce = n, i.encoding = i.makeEncoding(e, t, r, n), i;
        };
        Dt.fromBytes = function (e) { var t = Pt.parse(v(e), Ot); return this.fromASNType(t); };
        Dt.fromASNType = function (e) { var t = new Uint8Array(e.riddle), r = N.decodeFromUint8(t, x), n = u(new Uint8Array(e.challengePoint)), i = new Uint8Array(e.responseValue), o = N.decodeFromUint8(i, x), s = new Uint8Array(e.nonce); return this.fromData(r, o, n, s); };
        Dt.fromBase64 = function (e) { return Dt.fromBytes(g(e)); };
        Dt.prototype.makeEncoding = function (e, t, r, n) {
            if (n === void 0) { n = new Uint8Array([]); }
            var i = Lt.encode("OCTET_STRING", b(e.getEncoded())) + Lt.encode("OCTET_STRING", r.toString(16)) + Lt.encode("OCTET_STRING", b(t.getEncoded())) + Lt.encode("OCTET_STRING", b(n));
            return Lt.encode("SEQUENCE_30", i);
        };
        Dt.prototype.getRiddle = function () { return this.riddle; };
        Dt.prototype.getPoint = function () { return this.tPoint; };
        Dt.prototype.getChallenge = function () { return this.challenge; };
        Dt.prototype.getNonce = function () { return this.nonce; };
        Dt.prototype.getUsageProofOfExponent = function () { return Ut.fromData(this.tPoint, this.challenge, this.nonce); };
        Dt.prototype.getDerEncoding = function () { return this.encoding; };
        return Dt;
    }());
    var Ft = r(4800);
    var jt = r(1094);
    var Ht = new N(21282764439311451829394129092047993080259557426320933158672611067687630484067n, 3813889942691430704369624600187664845713336792511424430006907067499686345744n, x), Vt = new N(10844896013696871595893151490650636250667003995871483372134187278207473369077n, 9393217696329481319187854592386054938412168121447413803797200472841959383227n, x);
    var zt = (function () {
        function zt() {
            if (this.curveOrderBitLength = 254n, this.rand = this.makeSecret(), !this.verifyCurveOrder(x.n))
                throw new Error("Static values do not work with current implementation");
        }
        zt.prototype.verifyCurveOrder = function (e) { var t = BigInt(e.toString(2).length); return !(e < 1n << t - 1n || e >> t > 0n) || (S(1, "Curve order is not 253 bits which is required by the current implementation"), !1); };
        zt.prototype.getType = function (e) { switch (e.toLowerCase()) {
            case "mail": return 1;
            case "phone": return 0;
            case "inetpersona": return 2;
            default: throw new Error("Wrong type of identifier");
        } };
        zt.prototype.makeCommitment = function (e, t, r) { var n = this.mapToCurveMultiplier(t, e); return Ht.multiplyDA(n).add(Vt.multiplyDA(r)).getEncoded(!1); };
        zt.prototype.makeCommitmentFromHiding = function (e, t, r) { var n = this.mapToCurveMultiplier(t, e); return Ht.multiplyDA(n).add(r).getEncoded(!1); };
        zt.prototype.injectIdentifierType = function (e, t) { return h([Uint8Array.from([0, 0, 0, e]), t]); };
        zt.prototype.mapToInteger = function (e) { return BigInt("0x" + jt.keccak256(e)) >> 256n - this.curveOrderBitLength; };
        zt.prototype.mapToCurveMultiplier = function (e, t) { var r = Uint8Array.from(m(t.trim().toLowerCase())), n = u(this.injectIdentifierType(e, r)); do {
            n = this.mapToInteger(f(n));
        } while (n >= x.n); return n; };
        zt.prototype.computePoint_bn256 = function (e) { var t = x.P; e = a(e, t); var r, n, i, o = 0n, s = 0n, c = t + 1n >> 2n, u = t - 1n >> 1n; do {
            do {
                e = a(e + 1n), s = a(y(e, 3n, t) + x.A * e + x.B), i = y(s, u, t);
            } while (1n !== i);
            o = y(s, c, t), r = new N(e, o, x), r.x > t >> 1n && (r = new N(e, t - o, x)), n = r.multiplyDA(x.n - 1n), n.y > t >> 1n && (n = new N(n.x, t - n.y, x));
        } while (!r.equals(n) || r.isInfinity()); return r; };
        zt.prototype.makeSecret = function (e) {
            if (e === void 0) { e = 48; }
            return a(BigInt(zt.generateRandomHexString(e)), x.n);
        };
        zt.generateRandomHexString = function (e) { var t = new Uint8Array(e); window && window.crypto ? window.crypto.getRandomValues(t) : t = new Uint8Array(Ft.randomBytes(e)); var r = "0x"; for (var n = 0; n < t.length; n++)
            r += t[n].toString(16).padStart(2, "0"); return r; };
        zt.prototype.computeAttestationProof = function (e, t) {
            if (t === void 0) { t = new Uint8Array([]); }
            var r = Vt.multiplyDA(e), n = [Vt, r];
            return this.constructSchnorrPOK(r, e, n, t);
        };
        zt.prototype.computeEqualityProof = function (e, t, r, n, i) {
            if (i === void 0) { i = new Uint8Array([]); }
            var o = N.decodeFromHex(e, x), s = N.decodeFromHex(t, x), c = o.subtract(s), u = a(r - n, x.n), f = [Vt, o, s];
            return this.constructSchnorrPOK(c, u, f, i).getUsageProofOfExponent();
        };
        zt.prototype.constructSchnorrPOK = function (e, t, r, n) { var i, o, s, c; do {
            o = this.makeSecret(), i = Vt.multiplyDA(o), s = this.computeChallenge(i, r, n);
        } while (s >= x.n); return c = a(o + s * t, x.n), Dt.fromData(e, i, c, n); };
        zt.prototype.computeChallenge = function (e, t, r) { var n = t.concat(e), i = h([this.makeArray(n), r]); return this.mapToInteger(i); };
        zt.prototype.verifyFullProof = function (e) { var t = this.computeChallenge(e.getPoint(), [Vt, e.getRiddle()], e.getNonce()); return this.verifyPok(e, t); };
        zt.prototype.verifyEqualityProof = function (e, t, r) { var n = N.decodeFromUint8(e, x), i = N.decodeFromUint8(t, x), o = n.subtract(i), s = this.computeChallenge(r.getPoint(), [Vt, n, i], r.getNonce()); return this.verifyPok(Dt.fromData(o, r.getPoint(), r.getChallenge(), r.getNonce()), s); };
        zt.prototype.verifyPok = function (e, t) { if (t >= x.n)
            return !1; var r = Vt.multiplyDA(e.getChallenge()), n = e.getRiddle().multiplyDA(t).add(e.getPoint()); return r.equals(n); };
        zt.prototype.makeArray = function (e) { var t = new Uint8Array(0); return e.forEach((function (e) { t = new Uint8Array(__spreadArray(__spreadArray([], t, true), e.getEncoded(!1), true)); })), t; };
        zt.hashWithKeccak = function (e) { return jt.keccak256(e); };
        return zt;
    }());
    zt.OID_SIGNATURE_ALG = "1.2.840.10045.2.1", zt.BYTES_IN_DIGEST = 32;
    var Gt = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var qt = (function () {
        function qt() {
        }
        return qt;
    }());
    Gt([Nt({ type: Je.ObjectIdentifier })], qt.prototype, "algorithm", void 0), Gt([Nt({ type: Je.Any, optional: !0 })], qt.prototype, "parameters", void 0);
    var Kt = (function () {
        function Kt() {
            this.version = 0;
        }
        return Kt;
    }());
    Gt([Nt({ type: Je.Integer })], Kt.prototype, "version", void 0);
    var Wt = (function () {
        function Wt() {
        }
        return Wt;
    }());
    Gt([Nt({ type: Je.UTCTime })], Wt.prototype, "utcTime", void 0), Gt([Nt({ type: Je.GeneralizedTime })], Wt.prototype, "generalizedTime", void 0), Wt = Gt([xt({ type: $e.Choice })], Wt);
    var $t = (function () {
        function $t() {
        }
        return $t;
    }());
    Gt([Nt({ type: Wt })], $t.prototype, "notBefore", void 0), Gt([Nt({ type: Wt })], $t.prototype, "notAfter", void 0);
    var Jt = (function () {
        function Jt() {
        }
        return Jt;
    }());
    Gt([Nt({ type: $t, context: 0 })], Jt.prototype, "value", void 0), Gt([Nt({ type: Je.Integer, context: 1 })], Jt.prototype, "null", void 0), Jt = Gt([xt({ type: $e.Choice })], Jt);
    var Zt = (function () {
        function Zt() {
        }
        return Zt;
    }());
    Gt([Nt({ type: Je.ObjectIdentifier })], Zt.prototype, "extnId", void 0), Gt([Nt({ type: Je.Boolean })], Zt.prototype, "critical", void 0), Gt([Nt({ type: Je.OctetString })], Zt.prototype, "extnValue", void 0);
    var Xt = (function () {
        function Xt() {
        }
        return Xt;
    }());
    Gt([Nt({ type: Zt })], Xt.prototype, "extension", void 0);
    var Yt = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var Qt = (function () {
        function Qt() {
        }
        return Qt;
    }());
    Yt([Nt({ type: Je.Utf8String })], Qt.prototype, "devconId", void 0), Yt([Nt({ type: Je.Integer })], Qt.prototype, "ticketId", void 0), Yt([Nt({ type: Je.Integer })], Qt.prototype, "ticketClass", void 0), Yt([Nt({ type: Je.OctetString })], Qt.prototype, "commitment", void 0);
    var er = (function () {
        function er() {
        }
        return er;
    }());
    Yt([Nt({ type: qt })], er.prototype, "algorithm", void 0), Yt([Nt({ type: Je.BitString })], er.prototype, "publicKey", void 0);
    var tr = (function () {
        function tr() {
        }
        return tr;
    }());
    Yt([Nt({ type: Qt })], tr.prototype, "ticket", void 0), Yt([Nt({ type: er, optional: !0 })], tr.prototype, "publicKeyInfo", void 0), Yt([Nt({ type: Je.BitString })], tr.prototype, "signatureValue", void 0);
    var rr = (function (_super) {
        __extends(rr, _super);
        function rr() {
            var _this = this;
            _this = _super.call(this) || this, _this.magicLinkURLPrefix = "https://ticket.devcon.org/";
            return _this;
        }
        rr.prototype.fromData = function (e, t, r, n) { this.ticketId = t, this.ticketClass = r, this.devconId = e, this.keys = n; };
        rr.prototype.createWithCommitment = function (e, t, r, n, i, o) { if (this.fromData(e, t, r, o), this.commitment = n, this.signature = i, this.encoded = this.encodeSignedTicket(this.makeTicket()), !this.verify())
            throw new Error("Signature is invalid"); };
        rr.createWithMail = function (e, t, r, n, o, s) { var a = new this; a.fromData(t, r, n, o); var c, u = new zt; try {
            a.commitment = u.makeCommitment(e, u.getType("mail"), s);
            var t_110 = a.makeTicket();
            c = o[a.devconId].signRawBytesWithEthereum(i(t_110));
        }
        catch (e) {
            throw new Error(e);
        } return a.createWithCommitment(t, r, n, a.commitment, c, o), a; };
        rr.prototype.makeTicket = function () { var e = Lt.encode("UTF8STRING", this.devconId) + Lt.encode("INTEGER", this.ticketId) + Lt.encode("INTEGER", this.ticketClass) + Lt.encode("OCTET_STRING", b(this.commitment)); return Lt.encode("SEQUENCE_30", e); };
        rr.prototype.encodeSignedTicket = function (e) { var t = e + Lt.encode("BIT_STRING", this.signature); return Lt.encode("SEQUENCE_30", t); };
        rr.prototype.getDerEncodingWithPK = function () { var e = this.makeTicket() + Lt.encode("OCTET_STRING", b(this.commitment)) + this.keys[this.devconId].getAsnDerPublic() + Lt.encode("BIT_STRING", this.signature); return Lt.encode("SEQUENCE_30", e); };
        rr.prototype.getDerEncoding = function () { return this.encoded; };
        rr.prototype.verify = function () { return this.keys[this.devconId].verifyBytesWithEthereum(i(this.makeTicket()), this.signature); };
        rr.prototype.checkValidity = function () { return !0; };
        rr.prototype.getTicketId = function () { return this.ticketId; };
        rr.prototype.getTicketClass = function () { return this.ticketClass; };
        rr.prototype.getSignature = function () { return this.signature; };
        rr.fromBase64 = function (e, t) { var r = new this; return r.fromBytes(g(e), t), r; };
        rr.prototype.fromBytes = function (e, t) { var r = Pt.parse(v(e), tr); var n = r.ticket.devconId, i = BigInt(r.ticket.ticketId), o = r.ticket.ticketClass, s = r.ticket.commitment, a = r.signatureValue; this.createWithCommitment(n, i, o, new Uint8Array(s), b(new Uint8Array(a)), t); };
        rr.prototype.getCommitment = function () { return this.commitment; };
        rr.prototype.getUrlEncoding = function () { };
        return rr;
    }((function () {
        function class_4() {
        }
        class_4.prototype.getDerEncoding = function () { return this.encoded; };
        class_4.prototype.getCommitment = function () { return this.commitment; };
        return class_4;
    }())));
    var nr, ir, or = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var sr = (function () {
        function sr() {
        }
        return sr;
    }());
    or([Nt({ type: Je.ObjectIdentifier })], sr.prototype, "type", void 0), or([Nt({ type: Je.Utf8String })], sr.prototype, "value", void 0);
    var ar = nr = (function (_super) {
        __extends(nr, _super);
        function nr(e) {
            var _this = this;
            _this = _super.call(this, e) || this, Object.setPrototypeOf(_this, nr.prototype);
            return _this;
        }
        return nr;
    }(_t));
    ar = nr = or([xt({ type: $e.Set, itemType: sr })], ar);
    var cr = ir = (function (_super) {
        __extends(ir, _super);
        function ir(e) {
            var _this = this;
            _this = _super.call(this, e) || this, Object.setPrototypeOf(_this, ir.prototype);
            return _this;
        }
        return ir;
    }(_t));
    cr = ir = or([xt({ type: $e.Sequence, itemType: ar })], cr);
    var ur = (function () {
        function ur() {
        }
        return ur;
    }());
    or([Nt({ type: cr })], ur.prototype, "rdnSequence", void 0), or([Nt({ type: Je.Null })], ur.prototype, "null", void 0), ur = or([xt({ type: $e.Choice })], ur);
    var fr = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var lr = (function () {
        function lr() {
        }
        return lr;
    }());
    fr([Nt({ type: Je.Any })], lr.prototype, "algorithm", void 0), fr([Nt({ type: Je.BitString })], lr.prototype, "publicKey", void 0);
    var hr = (function () {
        function hr() {
            this.null = !1;
        }
        return hr;
    }());
    fr([Nt({ type: lr })], hr.prototype, "value", void 0), fr([Nt({ type: Je.Any })], hr.prototype, "null", void 0), hr = fr([xt({ type: $e.Choice })], hr);
    var dr = (function () {
        function dr() {
        }
        return dr;
    }());
    fr([Nt({ type: Je.Integer })], dr.prototype, "one", void 0), fr([Nt({ type: Je.OctetString })], dr.prototype, "privateKey", void 0), fr([Nt({ type: Je.Any, context: 0 })], dr.prototype, "algDescr", void 0), fr([Nt({ type: Je.BitString, context: 1 })], dr.prototype, "publicKey", void 0);
    var pr = (function () {
        function pr() {
        }
        return pr;
    }());
    fr([Nt({ type: Je.Integer })], pr.prototype, "one", void 0), fr([Nt({ type: Je.Any })], pr.prototype, "algIdent", void 0), fr([Nt({ type: Je.OctetString })], pr.prototype, "keysData", void 0);
    var gr = (function () {
        function gr() {
        }
        return gr;
    }());
    fr([Nt({ type: Xt, context: 3 })], gr.prototype, "extensions", void 0), fr([Nt({ type: Je.Any, context: 4 })], gr.prototype, "dataObject", void 0), gr = fr([xt({ type: $e.Choice })], gr);
    var mr = (function () {
        function mr() {
        }
        return mr;
    }());
    fr([Nt({ type: Je.Integer })], mr.prototype, "value", void 0);
    var yr = (function () {
        function yr() {
        }
        return yr;
    }());
    fr([Nt({ type: Kt })], yr.prototype, "version", void 0), fr([Nt({ type: Je.Integer })], yr.prototype, "serialNumber", void 0), fr([Nt({ type: qt })], yr.prototype, "signature", void 0), fr([Nt({ type: ur })], yr.prototype, "issuer", void 0), fr([Nt({ type: $t, optional: !0 })], yr.prototype, "validity", void 0), fr([Nt({ type: ur })], yr.prototype, "subject", void 0), fr([Nt({ type: hr })], yr.prototype, "subjectPublicKeyInfo", void 0), fr([Nt({ type: mr, optional: !0 })], yr.prototype, "contract", void 0), fr([Nt({ type: gr, optional: !0 })], yr.prototype, "attestsTo", void 0);
    var br = (function () {
        function br() {
            this.signedInfo = new Uint8Array;
        }
        return br;
    }());
    fr([Nt({ type: Je.Any })], br.prototype, "signedInfo", void 0), fr([Nt({ type: qt })], br.prototype, "signatureAlgorithm", void 0), fr([Nt({ type: Je.BitString })], br.prototype, "signatureValue", void 0);
    var vr = r(3286), wr = r(7158), Ar = r(8197), Sr = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var Er = (function () {
        function Er() {
        }
        return Er;
    }());
    Sr([Nt({ type: Je.Integer })], Er.prototype, "r", void 0), Sr([Nt({ type: Je.Integer })], Er.prototype, "s", void 0);
    var kr, xr = r(6266);
    kr = "object" == typeof crypto && crypto.subtle ? crypto.subtle : r(4800).webcrypto.subtle;
    var Nr = new xr.ec("secp256k1"), Br = r(1094);
    var Pr = { p192: null, p224: null, p256: "P-256", p384: "P-384", p521: "P-521", curve25519: null, ed25519: null, secp256k1: null };
    new N(55066263022277343669578718895168534326250603453777594175500187360389116729240n, 32670510020758816978083085130507043184471273380659243275938904335757337482424n);
    var _r = (function () {
        function _r() {
            this.ethereumPrefix = "Ethereum Signed Message:\n", this.algorithmASNList = { secp256k1: ["3081ec06072a8648ce3d02013081e0020101302c06072a8648ce3d0101022100fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f3044042000000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000000000704410479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8022100fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141020101", "06052b8104000a"], sect283k1: ["3081f806072a8648ce3d02013081ec020101302506072a8648ce3d0102301a0202011b06092a8648ce3d01020303300902010502010702010c304c042400000000000000000000000000000000000000000000000000000000000000000000000004240000000000000000000000000000000000000000000000000000000000000000000000010449040503213f78ca44883f1a3b8162f188e553cd265f23c1567a16876913b0c2ac245849283601ccda380f1c9e318d90f95d07e5426fe87e45c0e8184698e45962364e34116177dd2259022401ffffffffffffffffffffffffffffffffffe9ae2ed07577265dff7f94451e061e163c61020104"], p256: ["3081ec06072a8648ce3d02013081e0020101302c06072a8648ce3d0101022100ffffffff00000001000000000000000000000000ffffffffffffffffffffffff30440420ffffffff00000001000000000000000000000000fffffffffffffffffffffffc04205ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b0441046b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c2964fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5022100ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551020101"] };
        }
        _r.prototype.getPrivateAsUint8 = function () { return this.privKey; };
        _r.prototype.getPrivateAsHexString = function () { return b(this.privKey); };
        _r.prototype.getPrivateAsBigInt = function () { return u(this.privKey); };
        _r.privateFromBigInt = function (e) { var t = new this; return t.privKey = new Uint8Array(i(e.toString(16).padStart(64, "0"))), t; };
        _r.fromPublicHex = function (e) { if (null === e.toLowerCase().match(/^[a-f0-9]+$/i))
            throw new Error("Wrong Hex string input"); if (e.length < 129 || e.length > 130)
            throw new Error("Wrong public hex length"); var t = new this; return t.pubKey = new Uint8Array(i(e)), t; };
        _r.fromPrivateUint8 = function (e, t) {
            if (t === void 0) { t = ""; }
            if (!e || 32 != e.length)
                throw new Error("Wrong private key. Should be 32 bytes Uint8");
            var r = new this;
            if (r.privKey = e, !t || !k.hasOwnProperty(t))
                throw new Error("Algorithm " + t + " not implemented.");
            return r.algorithm = t, r;
        };
        _r.publicFromBase64 = function (e) { var t = new this, r = g(e), n = Pt.parse(v(r), lr); return t.pubKey = new Uint8Array(n.publicKey), t; };
        _r.publicFromSubjectPublicKeyInfo = function (e) { var t = new this; return t.pubKey = new Uint8Array(e.value.publicKey), t; };
        _r.publicFromSubjectPublicKeyValue = function (e) { var t = new this; return t.pubKey = new Uint8Array(e.publicKey), t.algorithm = t.getAlgorithNameFromASN1(b(new Uint8Array(e.algorithm))), t; };
        _r.publicFromUint = function (e) { var t = new this; if (65 != e.byteLength)
            throw S(1, "Wrong public key length"), new Error("Wrong public key length"); return t.pubKey = new Uint8Array(e), t; };
        _r.privateFromKeyInfo = function (e) { var t = new this, r = Pt.parse(e.keysData, dr); return t.algorithm = t.getAlgorithNameFromASN1(b(new Uint8Array(e.algIdent))), t.privKey = new Uint8Array(r.privateKey), t; };
        _r.privateFromKeyDataPEM = function (e) { var t = g(e); var r = Pt.parse(v(t), dr), n = new this; return n.algorithm = n.getAlgorithNameFromASN1(b(new Uint8Array(r.algDescr))), n.privKey = new Uint8Array(r.privateKey), n; };
        _r.prototype.getAlgorithNameFromASN1 = function (e) { var t = {}; var _loop_5 = function (e_151) {
            this_2.algorithmASNList[e_151].forEach((function (r) { t[r] = e_151; }));
        }; var this_2 = this; for (var e_151 in this.algorithmASNList) {
            _loop_5(e_151);
        } if (t.hasOwnProperty(e))
            return t[e]; {
            var e_152 = "Unknown algorithm.";
            throw S(1, e_152), new Error(e_152);
        } };
        _r.privateFromPEM = function (e) { var t = g(e); var r = Pt.parse(v(t), pr); return _r.privateFromKeyInfo(r); };
        _r.publicFromPEM = function (e) { var t = g(e); var r = Pt.parse(v(t), lr); return _r.publicFromUint(new Uint8Array(r.publicKey)); };
        _r.generateKeyAsync = function () {
            return __awaiter(this, void 0, void 0, function () { var e, t, r; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, !0, ["encrypt"])];
                    case 1:
                        e = _a.sent();
                        t = ["0x"];
                        return [4, crypto.subtle.exportKey("raw", e)];
                    case 2:
                        r = _a.sent();
                        return [2, (new Uint8Array(r).forEach((function (e) { var r = e.toString(16); r.length % 2 && (r = "0" + r), t.push(r); })), this.privateFromBigInt(BigInt(t.join("")) % E.n))];
                }
            }); });
        };
        _r.createKeys = function () { return this.privateFromBigInt(BigInt("0x" + b(crypto.getRandomValues(new Uint8Array(32)))) % E.n); };
        _r.prototype.getPublicKeyAsHexStr = function () { if (this.pubKey)
            return b(this.pubKey); if (k.hasOwnProperty(this.algorithm) && Pr.hasOwnProperty(this.algorithm)) {
            var e_153 = new xr.ec(this.algorithm);
            if (!this.getPrivateAsHexString())
                throw console.log(this), new Error("Cant sign. This is only public key.");
            return e_153.keyFromPrivate(this.getPrivateAsHexString(), "hex").getPublic("hex").toString();
        } {
            var e_154 = 'Private -> Public key not implemented for that aglorighm - "' + this.algorithm + '"';
            throw S(1, e_154), new Error(e_154);
        } };
        _r.prototype.getAsnDerPublic = function () { var e = this.getPublicKeyAsHexStr(); var t = ""; if (this.algorithm) {
            if (!this.algorithmASNList.hasOwnProperty(this.algorithm)) {
                var e_155 = "Fatal Error. Algorithm not implemented yet - " + this.algorithm;
                throw S(1, e_155), new Error(e_155);
            }
            t = this.algorithmASNList[this.algorithm][0];
        }
        else
            S(4, "algorithm undefined, lets use default."), t = this.algorithmASNList.secp256k1[0]; return Lt.encode("SEQUENCE_30", t + Lt.encode("BIT_STRING", e)); };
        _r.prototype.getAddress = function () { var e = this.getPublicKeyAsHexStr(); return e = e.substr(2), "0x" + Br.keccak256(i(e)).substr(-40).toUpperCase(); };
        _r.prototype.signBytes = function (e) { if (!this.getPrivateAsHexString())
            throw new Error("Cant sign. This is only public key."); var t = Nr.keyFromPrivate(this.getPrivateAsHexString(), "hex"), r = Br.keccak256(e); return t.sign(r).toDER("hex"); };
        _r.prototype.signStringWithEthereum = function (e) { if (!this.getPrivateAsHexString())
            throw new Error("Cant sign. This is only public key."); var t = Nr.keyFromPrivate(this.getPrivateAsHexString(), "hex"), r = this.ethereumPrefix + e.length + e, n = Br.keccak256(m(r)); return t.sign(n).toDER("hex"); };
        _r.prototype.signHexStringWithEthereum = function (e) { return this.signStringWithEthereum("0x" + e); };
        _r.prototype.signBytesWithEthereum = function (e) { var t = "0x" + b(new Uint8Array(e)); return console.log("message: " + t), this.signStringWithEthereum(t); };
        _r.prototype.signDeterministicSHA256 = function (e) { var t = Array.from(vr.arrayify(wr.JQ(e))); return this.signBytes(t); };
        _r.prototype.verifyDeterministicSHA256 = function (e, t) { var r, n, i = wr.JQ(e).substr(2); if (!k.hasOwnProperty(this.algorithm) || !Pr.hasOwnProperty(this.algorithm)) {
            var e_156 = 'Elliptic.js curve not implemented for that aglorighm - "' + this.algorithm + '"';
            throw S(1, e_156), new Error(e_156);
        } if (r = new xr.ec(this.algorithm).keyFromPublic(this.getPublicKeyAsHexStr(), "hex"), 128 == t.length || 130 == t.length) {
            var s = t.match(/([a-f\d]{64})/gi);
            n = { r: s[0], s: s[1] };
        }
        else {
            var e_157 = Pt.parse(v(o(t)), Er);
            n = { r: BigInt(e_157.r).toString(16).padStart(64, "0"), s: BigInt(e_157.s).toString(16).padStart(64, "0") };
        } return r.verify(i, n); };
        _r.prototype.verifyHexStringWithEthereum = function (e, t) { var r = "0x" + e, n = Br.keccak256(m(this.ethereumPrefix + r.length + r)), i = Nr.keyFromPublic(this.getPublicKeyAsHexStr(), "hex"); var o = t.match(/([a-f\d]{64})/gi); var s = { r: o[0], s: o[1] }; return i.verify(n, s); };
        _r.prototype.signRawBytesWithEthereum = function (e) { var t = Ar.keccak256(e).substring(2); if (S(3, "signRawBytesWithEthereum: key: " + this.getAddress() + ", hash: " + t), !this.getPrivateAsHexString())
            throw new Error("Cant sign. This is only public key."); var r = Nr.keyFromPrivate(this.getPrivateAsHexString(), "hex"); return function (e, t) { try {
            var r_83 = e.r.toString(16).padStart(64, "0"), n_65 = e.s, i_34 = e.recoveryParam, o_19 = t.ec.curve.n.shrn(1);
            return n_65.cmp(o_19) > 0 && (n_65 = t.ec.curve.n.sub(n_65), i_34 = 1 - i_34), r_83 + n_65.toString(16).padStart(64, "0") + (1 == i_34 ? "1c" : "1b");
        }
        catch (e) {
            throw S(1, e), new Error("Signature format doesn't fit.");
        } }(r.sign(o(t)), r); };
        _r.prototype.verifyBytesWithEthereum = function (e, t) { if (!e || !e.length)
            throw new Error("Missing data to verify"); if (!t)
            throw new Error("Missing signature to verify"); var r = i(Ar.keccak256(e)), n = Nr.keyFromPublic(this.getPublicKeyAsHexStr(), "hex"); S(3, "verifyBytesWithEthereum: key: " + this.getAddress() + ", hash: " + b(new Uint8Array(r))); var o = (t = b(_r.anySignatureToRawUint8(t))).match(/([a-f\d]{64})/gi); var s = { r: o[0], s: o[1] }; return n.verify(r, s); };
        _r.prototype.getJWTParams = function () { var e = Pr[this.algorithm]; if (!e) {
            var e_158 = "Cant create subtleCrypto key for curve '" + this.algorithm + "'";
            throw S(1, e_158), new Error(e_158);
        } var t = this.getPublicKeyAsHexStr(); return { crv: e, d: p(this.getPrivateAsUint8()), key_ops: ["sign"], kty: "EC", x: p(o(t.substr(2, 64))), y: p(o(t.substr(66, 64))) }; };
        _r.prototype.getSubtlePrivateKey = function () { var e = Pr[this.algorithm]; return kr.importKey("jwk", this.getJWTParams(), { name: "ECDSA", namedCurve: e }, !0, ["sign"]); };
        _r.prototype.getSubtlePublicKey = function () { var e = Pr[this.algorithm], t = this.getJWTParams(); return delete t.d, t.key_ops = ["verify"], kr.importKey("jwk", t, { name: "ECDSA", namedCurve: e }, !0, ["verify"]); };
        _r.prototype.signStringWithSubtle = function (e) {
            return __awaiter(this, void 0, void 0, function () { var _a, _b, _c; return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = kr).sign;
                        _c = [{ name: "ECDSA", hash: { name: "SHA-256" } }];
                        return [4, this.getSubtlePrivateKey()];
                    case 1: return [4, _b.apply(_a, _c.concat([_d.sent(), Uint8Array.from(m(e))]))];
                    case 2: return [2, _d.sent()];
                }
            }); });
        };
        _r.prototype.verifyStringWithSubtle = function (e, t) {
            return __awaiter(this, void 0, void 0, function () { var _a, _b, _c, _d, _f; return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        S(4, "pubkey: " + this.getPublicKeyAsHexStr() + " msg:" + t + " signature:" + b(e));
                        _a = S;
                        _b = [4];
                        return [4, this.getSubtlePublicKey()];
                    case 1:
                        _a.apply(void 0, _b.concat([_g.sent()]));
                        _d = (_c = kr).verify;
                        _f = [{ name: "ECDSA", hash: { name: "SHA-256" } }];
                        return [4, this.getSubtlePublicKey()];
                    case 2: return [4, _d.apply(_c, _f.concat([_g.sent(), e, Uint8Array.from(m(t))]))];
                    case 3: return [2, _g.sent()];
                }
            }); });
        };
        _r.prototype.verifyStringWithSubtleDerSignature = function (e, t) {
            return __awaiter(this, void 0, void 0, function () { var r, n; return __generator(this, function (_a) {
                r = Pt.parse(v(e), Er);
                n = BigInt(r.r).toString(16).padStart(64, "0") + BigInt(r.s).toString(16).padStart(64, "0");
                return [2, this.verifyStringWithSubtle(o(n), t)];
            }); });
        };
        _r.anySignatureToRawUint8 = function (e) { var t, r; if (t = "string" == typeof e ? o(e) : e, !t || !t.length)
            throw new Error("Empty signature received"); switch (t.length) {
            case 64: S(1, "anySignatureToRawUint8 received 64 bytes signature (without v value) = " + b(t));
            case 65:
                r = t;
                break;
            case 66:
                if (4 != t[0])
                    throw new Error("Cant recognize signature: " + b(t));
                r = t.slice(1, 65);
                break;
            case 70:
            case 71:
            case 72:
                var e_159 = Pt.parse(v(t), Er);
                r = o(BigInt(e_159.r).toString(16).padStart(64, "0") + BigInt(e_159.s).toString(16).padStart(64, "0"));
                break;
            default:
                var n_66 = "wrong Signature: " + b(t);
                throw new Error(n_66);
        } return S(4, "ready signature:" + b(r)), r; };
        return _r;
    }());
    var Ir = (function () {
        function Ir(e) {
            if (e === void 0) { e = null; }
            this.ALLOWED_ROUNDING = 1e4, this.validity = 0, e || (this.time = Date.now()), "number" == typeof e && (this.time = e), "string" == typeof e && (this.time = Ir.stringTimestampToLong(e)), this.time = this.time - this.time % 1e3;
        }
        Ir.prototype.fromString = function (e) { this.time = Ir.stringTimestampToLong(e); };
        Ir.prototype.getValidity = function () { return this.validity; };
        Ir.prototype.setValidity = function (e) { this.validity = e; };
        Ir.prototype.getTime = function () { return this.time; };
        Ir.prototype.getTimeAsString = function () { var e = new Date(this.time).toString(); return e.substr(0, e.indexOf("(") - 1); };
        Ir.prototype.validateTimestamp = function () { var e = this.getCurrentTime(); return !(this.time > e + this.ALLOWED_ROUNDING || this.time + this.ALLOWED_ROUNDING + this.validity < e); };
        Ir.prototype.validateAgainstExpiration = function (e) { var t = this.getCurrentTime(); return this.time > t + this.ALLOWED_ROUNDING ? (S(1, "Object still not valid. Details: not valid before = " + this.time + ", currentTime = " + t), !1) : e < t - this.ALLOWED_ROUNDING ? (S(1, "Object is not longer valid. Details: attNotAfter = " + e + ", currentTime = " + t), !1) : !(e - this.time > this.validity + this.ALLOWED_ROUNDING && (S(1, e + "\n" + this.time + "\n" + this.validity + "\n" + this.ALLOWED_ROUNDING + "\n" + (e - this.time) + "\n" + (this.validity + this.ALLOWED_ROUNDING) + "\n"), 1)); };
        Ir.stringTimestampToLong = function (e) { return Date.parse(e); };
        Ir.prototype.getCurrentTime = function () { return Date.now(); };
        return Ir;
    }());
    Ir.TIMESTAMP_FORMAT = "EEE MMM d yyyy HH:mm:ss 'GMT'Z", Ir.ALLOWED_ROUNDING = 1e4, Ir.UNLIMITED = 0xe677d1e8e998, Ir.DEFAULT_TOKEN_TIME_LIMIT = 31536e6, Ir.DEFAULT_TIME_LIMIT_MS = 12e5;
    var Or = (function () {
        function Or() {
            this.version = 18;
        }
        Or.prototype.parseNames = function (e) { var t = {}; Object.keys(Mt).forEach((function (e) { t[Mt[e].toLowerCase()] = e; })); var r = []; return e.forEach((function (e) { var n = t[e.type.toString().toLowerCase()]; if (!n)
            throw new Error("X500 with name " + e.type.toString() + " not implemented yet."); r.push(n + "=\"" + e.value + "\""); })), r.join(","); };
        Or.prototype.fromBytes = function (e) { var t = this; var r = Pt.parse(v(e), yr); t.signedInfo = e, t.version = r.version.version, t.serialNumber = r.serialNumber, t.signingAlgorithm = r.signature.algorithm.toString(), r.validity && (t.notValidBefore = r.validity.notBefore.generalizedTime.getTime(), t.notValidAfter = r.validity.notAfter.generalizedTime.getTime()); var n = r.subject.rdnSequence; t.subject = "", n && n[0] && n[0].length && (t.subject = this.parseNames(n[0])), t.subjectKey = _r.publicFromSubjectPublicKeyInfo(r.subjectPublicKeyInfo); var i = r.issuer.rdnSequence; if (t.issuer = "", i.length && (t.issuer = this.parseNames(i[0])), r.contract && (t.smartcontracts = r.contract), r.attestsTo && r.attestsTo.extensions)
            t.extensions = r.attestsTo.extensions, t.commitment = new Uint8Array(t.extensions.extension.extnValue);
        else if (r.attestsTo && r.attestsTo.dataObject)
            throw new Error("Implement parse dataObject"); };
        Or.prototype.isValidX509 = function () { return 0 != this.version && 1 != this.version && 2 != this.version ? (S(1, "Incorrect version number"), !1) : this.issuer ? null == this.notValidBefore || null == this.notValidAfter ? (S(1, "Validity period not set"), !1) : null == this.subject ? (S(1, "Subject info not set"), !1) : this.subjectKey ? null != this.smartcontracts ? (S(1, "Smart contract info set"), !1) : null != this.dataObject ? (S(1, "Data object set"), !1) : null != this.version && null != this.serialNumber && null != this.signingAlgorithm || (S(1, "Version, serial number, subject or algorithm missing"), !1) : (S(1, "No subject public key info set"), !1) : (S(1, "Issuer info not set"), !1); };
        Or.prototype.getDerEncoding = function () { if (this.signedInfo || (this.signedInfo = this.getPrehash()), !this.signedInfo)
            throw new Error("Empty Attestaion Der Encoding"); return b(new Uint8Array(this.signedInfo)); };
        Or.prototype.getCommitment = function () { return this.commitment; };
        Or.prototype.getNotValidBefore = function () { return this.notValidBefore; };
        Or.prototype.setNotValidBefore = function (e) { this.notValidBefore = e; };
        Or.prototype.getNotValidAfter = function () { return this.notValidAfter; };
        Or.prototype.setNotValidAfter = function (e) { this.notValidAfter = e; };
        Or.prototype.getSubjectPublicKeyInfo = function () { return this.subjectKey; };
        Or.prototype.checkValidity = function () { if (null == this.version)
            return S(1, "Attest version missed"), !1; if (null == this.serialNumber)
            return S(1, "Attest serial number missed"), !1; if (null == this.subject)
            return S(1, "Attest subject missed"), !1; if (null == this.signingAlgorithm)
            return S(1, "Attest signing algorithm missed"), !1; var e = this.getNotValidBefore(), t = this.getNotValidAfter(), r = new Ir(e); return r.setValidity(t - e), !(!r.validateAgainstExpiration(t) || null != this.extensions && null != this.dataObject && (S(1, "Both Extensions and dataObject not allowed"), 1)); };
        Or.prototype.getExtensions = function () { return this.extensions; };
        Or.prototype.setVersion = function (e) { this.version = e; };
        Or.prototype.getVersion = function () { return this.version; };
        Or.prototype.setSubject = function (e) { this.subject = e; };
        Or.prototype.getSubject = function () { return this.subject; };
        Or.prototype.setSigningAlgorithm = function (e) { this.signingAlgorithm = e; };
        Or.prototype.getPrehash = function () { if (!this.checkValidity())
            return null; var e = Lt.encode("TAG", Lt.encode("INTEGER", this.version), 0) + Lt.encode("INTEGER", this.serialNumber) + Lt.encodeObjectId(this.signingAlgorithm); if (e += this.issuer ? Lt.encodeName(this.issuer) : Lt.encode("NULL_VALUE", ""), null != this.notValidAfter && null != this.notValidBefore) {
            var t_111 = Lt.encode("GENERALIZED_TIME", this.notValidBefore) + Lt.encode("GENERALIZED_TIME", this.notValidAfter);
            e += Lt.encode("SEQUENCE_30", t_111);
        }
        else
            e += Lt.encode("NULL_VALUE", ""); return e += this.subject ? Lt.encodeName(this.subject) : Lt.encode("NULL_VALUE", ""), e += this.subjectKey ? this.subjectKey.getAsnDerPublic() : Lt.encode("NULL_VALUE", ""), null != this.smartcontracts && (e += this.smartcontracts), null != this.extensions && (e += Lt.encode("TAG", Lt.encode("SEQUENCE_30", Lt.encode("SEQUENCE_30", this.extensions)), 3)), null != this.dataObject && (e += Lt.encode("TAG", Lt.encode("SEQUENCE_30", Lt.encode("SEQUENCE_30", this.dataObject)), 4)), o(Lt.encode("SEQUENCE_30", e)); };
        Or.prototype.getSigningAlgorithm = function () { return this.signingAlgorithm; };
        return Or;
    }());
    Or.OID_OCTETSTRING = "1.3.6.1.4.1.1466.115.121.1.40";
    var Tr = (function (_super) {
        __extends(Tr, _super);
        function Tr() {
            return _super.call(this) || this;
        }
        Tr.prototype.fromCommitment = function (e, t) { this.subjectKey = t, this.setVersion(Tr.HIDDEN_IDENTIFIER_VERSION), this.setSubject("CN="), this.setSigningAlgorithm(Tr.DEFAULT_SIGNING_ALGORITHM), this.setSubjectPublicKeyInfo(t), this.setCommitment(e), this.type = Tr.HIDDEN_TYPE, this.identifier = Tr.HIDDEN_IDENTIFIER, this.setUnlimitedValidity(); };
        Tr.prototype.setUnlimitedValidity = function () { _super.prototype.setNotValidBefore.call(this, Date.now()), _super.prototype.setNotValidAfter.call(this, Date.parse("31 Dec 9999 23:59:59")); };
        Tr.fromData = function (e, t, r, n) { var i = (new zt).makeCommitment(e, t, n), o = new this; return o.fromCommitment(i, r), o.type = t.toString(), o.identifier = e, o; };
        Tr.fromLabelAndUrl = function (e, t, r) { var n = new this; return n.subjectKey = r, n.setVersion(Tr.NFT_VERSION), n.setSubject(n.makeLabeledURI(e, t)), n.setSigningAlgorithm(Tr.DEFAULT_SIGNING_ALGORITHM), n.setIssuer("CN=attestation.id"), n.setSerialNumber(1), n.setSubjectPublicKeyInfo(r), n.setUnlimitedValidity(), n.type = e, n.identifier = t, n; };
        Tr.prototype.makeLabeledURI = function (e, t) { return Tr.LABELED_URI_LABEL + "=\"" + t + " " + e + "\""; };
        Tr.fromBytes = function (e) { var t = new this; if (t.fromBytes(e), !t.checkValidity())
            throw new Error("Could not validate object"); if (t.getVersion() == Tr.NFT_VERSION) {
            var e_160 = Lt.parseX500Names(t.getSubject()), r_84 = !1;
            if (e_160.forEach((function (e) { if (!r_84 && e.type == Tr.LABELED_URI_LABEL) {
                r_84 = !0;
                var n_67 = e.value.split(" ");
                if (2 != n_67.length)
                    throw new Error("LabeledURI values should be separated with space and 2 items only: " + e.value);
                t.type = n_67[0], t.identifier = n_67[1];
            } })), !r_84)
                throw new Error("Cant find LABELED_URI");
        }
        else
            t.type = Tr.HIDDEN_TYPE, t.identifier = Tr.HIDDEN_IDENTIFIER; return t; };
        Tr.prototype.setSubjectPublicKeyInfo = function (e) { this.subjectKey = e; };
        Tr.prototype.setCommitment = function (e) { this.commitment = e; };
        Tr.prototype.checkValidity = function () { return _super.prototype.checkValidity.call(this) ? this.getVersion() != Tr.HIDDEN_IDENTIFIER_VERSION && this.getVersion() != Tr.NFT_VERSION ? (S(1, "The version number is " + this.getVersion() + ", it must be either " + Tr.HIDDEN_IDENTIFIER_VERSION + " or " + Tr.NFT_VERSION), !1) : this.getSigningAlgorithm() !== Tr.DEFAULT_SIGNING_ALGORITHM ? (S(1, "The subject is supposed to only be an Ethereum address as the Common Name"), !1) : this.getVersion() != Tr.NFT_VERSION || this.subject.includes(Tr.LABELED_URI_LABEL + "=") ? !(this.getVersion() == Tr.HIDDEN_IDENTIFIER_VERSION && this.getCommitment().length < zt.BYTES_IN_DIGEST && (S(1, "The attestation does not contain a valid commitment"), 1)) : (S(1, "A NFT Identifier attestation must have a labeled uri as subject. subject = " + this.getSubject()), !1) : (S(1, "IdentifierAttestation super.checkValidity() filed;"), !1); };
        Tr.prototype.setIssuer = function (e) { this.issuer = e; };
        Tr.prototype.getSerialNumber = function () { return this.serialNumber; };
        Tr.prototype.setSerialNumber = function (e) { this.serialNumber = e; };
        Tr.prototype.getAddress = function () { return this.subjectKey.getAddress(); };
        return Tr;
    }(Or));
    Tr.OID_OCTETSTRING = "1.3.6.1.4.1.1466.115.121.1.40", Tr.DEFAULT_SIGNING_ALGORITHM = "1.2.840.10045.4.2", Tr.HIDDEN_IDENTIFIER_VERSION = 18, Tr.NFT_VERSION = 19, Tr.HIDDEN_TYPE = "HiddenType", Tr.HIDDEN_IDENTIFIER = "HiddenIdentifier", Tr.LABELED_URI = "1.3.6.1.4.1.250.1.57", Tr.LABELED_URI_LABEL = "labeledURI";
    var Rr = (function () {
        function Rr() {
        }
        Rr.fromBytes = function (e, t) { var r = Pt.parse(v(e), br); return this.fromASNType(r, t, e); };
        Rr.fromASNType = function (e, t, r) {
            if (r === void 0) { r = new Uint8Array(0); }
            var n = new this;
            n.uint8data = r, n.attestorKeys = t;
            var i = e.signatureAlgorithm.algorithm;
            if (n.att = Tr.fromBytes(e.signedInfo), n.signature = b(new Uint8Array(e.signatureValue)), i !== n.att.getSigningAlgorithm())
                throw new Error("Algorithm specified is not consistent");
            return n.constructorCheck(), n;
        };
        Rr.fromData = function (e, t) { var r = new this; return r.attestorKeys = t, r.att = e, r.signature = r.attestorKeys.signRawBytesWithEthereum(Array.from(r.att.getPrehash())), r.constructorCheck(), r; };
        Rr.prototype.verify = function () { try {
            return this.attestorKeys.verifyBytesWithEthereum(i(this.att.getDerEncoding()), this.signature);
        }
        catch (e) {
            return S(1, e), !1;
        } };
        Rr.prototype.checkValidity = function () { return this.getUnsignedAttestation().checkValidity(); };
        Rr.prototype.getUnsignedAttestation = function () { return this.att; };
        Rr.prototype.getDerEncoding = function () { return this.uint8data && this.uint8data.length ? b(new Uint8Array(this.uint8data)) : this.constructSignedAttestation(this.getUnsignedAttestation(), this.signature); };
        Rr.prototype.constructSignedAttestation = function (e, t) { var r = e.getPrehash(), n = Lt.encode("OBJECT_ID", e.getSigningAlgorithm()), i = b(r) + Lt.encode("SEQUENCE_30", n) + Lt.encode("BIT_STRING", b(_r.anySignatureToRawUint8(t))); return Lt.encode("SEQUENCE_30", i); };
        Rr.prototype.constructorCheck = function () { if (!this.verify())
            throw new Error("The signature is not valid"); };
        return Rr;
    }());
    Rr.ECDSA_WITH_SHA256 = "1.2.840.10045.4.3.2";
    var Cr = (function () {
        function Cr() {
        }
        Cr.prototype.create = function (e, t, r, n) { this.attestableObject = e, this.att = t, this.attestationSecret = r, this.objectSecret = n, this.crypto = new zt, this.pok = this.makeProof(r, n, this.crypto), this.derEncodedProof = this.pok.getDerEncoding(), this.fillPresignData(); };
        Cr.prototype.setWebDomain = function (e) { this.webDomain = e; };
        Cr.prototype.fillPresignData = function () { this.preSignEncoded = this.attestableObject.getDerEncoding() + this.att.getDerEncoding() + this.pok.getDerEncoding(), this.encoding = Lt.encode("SEQUENCE_30", this.preSignEncoded); };
        Cr.prototype.fromDecodedData = function (e, t, r) { this.attestableObject = e, this.att = t, this.pok = r, this.fillPresignData(), this.userKeyPair = this.att.getUnsignedAttestation().getSubjectPublicKeyInfo(), this.constructorCheck(); };
        Cr.prototype.verify = function () { return this.attestableObject.verify() ? this.att.verify() ? !!this.crypto.verifyEqualityProof(this.att.getUnsignedAttestation().getCommitment(), this.attestableObject.getCommitment(), this.pok) || (S(1, "Could not verify the consistency between the commitment in the attestation and the attested object"), !1) : (S(1, "Could not verify attestation"), !1) : (S(1, "Could not verify attestable object"), !1); };
        Cr.fromBytes = function (e, t, r, n, i) { var o = Pt.parse(v(e), t), s = new this; s.attestableObject = new n, s.attestableObject.fromBytes(o.signedToken, i), s.att = Rr.fromBytes(new Uint8Array(o.attestation), r); var a = new Ut; a.fromBytes(new Uint8Array(o.proof)), s.pok = a; var c = s.att.getUnsignedAttestation().getCommitment(), u = s.attestableObject.getCommitment(); if (!(new zt).verifyEqualityProof(c, u, a))
            throw new Error("The redeem proof did not verify"); return s; };
        Cr.prototype.makeProof = function (e, t, r) { var n = this.att.getUnsignedAttestation().getCommitment(), i = this.attestableObject.getCommitment(), o = r.computeEqualityProof(b(n), b(i), e, t); if (!r.verifyEqualityProof(n, i, o))
            throw new Error("The redeem proof did not verify"); return o; };
        Cr.prototype.getAttestableObject = function () { return this.attestableObject; };
        Cr.prototype.getAtt = function () { return this.att; };
        Cr.prototype.getDerEncodeProof = function () { return this.derEncodedProof; };
        Cr.prototype.getDerEncoding = function () { return this.encoding; };
        Cr.prototype.getUserPublicKey = function () { return this.userPublicKey; };
        Cr.prototype.constructorCheck = function () { if (!this.verify())
            throw new Error("The redeem request is not valid"); };
        Cr.prototype.checkValidity = function () { try {
            var e_161 = this.att.getUnsignedAttestation().getDerEncoding();
            if (!Tr.fromBytes(new Uint8Array(i(e_161))).checkValidity())
                return S(1, "The attestation is not a valid standard attestation"), !1;
        }
        catch (e) {
            return S(1, "The attestation is invalid"), !1;
        } try {
            if (!this.getAttestableObject().checkValidity())
                return S(1, "Cheque is not valid"), !1;
        }
        catch (e) {
            return S(1, "Cheque validation failed"), !1;
        } try {
            var e_162 = this.getAtt().getUnsignedAttestation().getAddress();
            if (S(3, "attestationEthereumAddress: " + e_162), S(3, this.getUserPublicKey()), S(3, "this.getUserPublicKey()).getAddress(): " + _r.publicFromUint(this.getUserPublicKey()).getAddress()), e_162.toLowerCase() !== _r.publicFromUint(this.getUserPublicKey()).getAddress().toLowerCase())
                return S(1, "The attestation is not to the same Ethereum user who is sending this request"), !1;
        }
        catch (e) {
            return S(1, "Address validation failed"), S(2, e), !1;
        } return !0; };
        return Cr;
    }());
    Cr.Eip712UserData = { payload: "", description: "", timestamp: 0 }, Cr.Eip712UserDataTypes = [{ name: "payload", type: "string" }, { name: "description", type: "string" }, { name: "timestamp", type: "uint256" }], Cr.Eip712UserDataPrimaryName = "Authentication", Cr.Eip712UserDataDescription = "Single-use authentication";
    var Mr = { attestationOrigin: "http://stage.attestation.id", tokensOrigin: "https://devcontickets.herokuapp.com/outlet/", tokenUrlName: "ticket", tokenSecretName: "secret", unsignedTokenDataName: "ticket", tokenParser: tr, localStorageItemName: "dcTokens", base64senderPublicKey: "-----BEGIN PUBLIC KEY-----\nMIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA////////////////\n/////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5m\nfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0\nSKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFB\nAgEBA0IABJUMfAvtI8PKxcwxu7mq2btVMjh4gmcKwrHN8HmasOvHZMJn9wTo/doH\nlquDl6TSEBAk0kxO//aVs6QX8u0OSM0=\n-----END PUBLIC KEY-----", base64attestorPubKey: "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=", webDomain: "devcon.org" };
    var Lr = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var Ur = (function () {
        function Ur() {
        }
        return Ur;
    }());
    Lr([Nt({ type: Je.Integer })], Ur.prototype, "type", void 0), Lr([Nt({ type: Ot })], Ur.prototype, "proof", void 0);
    var Dr = (function () {
        function Dr() {
        }
        Dr.fromData = function (e, t) { var r = new this; if (r.type = e, r.pok = t, !r.verify())
            throw new Error("The proof is not valid"); return r; };
        Dr.prototype.getDerEncoding = function () { var e = Lt.encode("INTEGER", this.type) + this.pok.getDerEncoding(); return Lt.encode("SEQUENCE_30", e); };
        Dr.fromBytes = function (e) { var t, r = new this; try {
            t = Pt.parse(v(e), Ur), r.type = t.type;
        }
        catch (e) {
            throw new Error("Cant parse AttestationRequest Identifier");
        } try {
            var e_163 = new Uint8Array(t.proof.riddle), n_68 = new Uint8Array(t.proof.challengePoint), i_35 = new Uint8Array(t.proof.responseValue), o_20 = new Uint8Array(t.proof.nonce), s_16 = N.decodeFromHex(b(e_163), x), a_15 = u(n_68), c_8 = N.decodeFromHex(b(i_35), x);
            r.pok = Dt.fromData(s_16, c_8, a_15, o_20);
        }
        catch (e) {
            throw new Error("Cant create FullProofOfExponent");
        } if (!r.verify())
            throw new Error("Could not verify the proof"); return S(3, "proof OK"), r; };
        Dr.prototype.verify = function () { return !!(new zt).verifyFullProof(this.pok) && (S(3, "VerifyAttestationRequestProof OK"), !0); };
        Dr.prototype.getPok = function () { return this.pok; };
        Dr.prototype.getType = function () { return this.type; };
        return Dr;
    }());
    var Fr = r(4958), jr = r(3684), Hr = r(2768), Vr = r(2046), zr = r(3587), Gr = r(711);
    var qr = "providers/5.5.1";
    var Kr = r(8171), Wr = r(2593), $r = r(7827), Jr = r(4242), Zr = r(4377), Xr = r(8341), Yr = r(4353), Qr = r(7727), en = r(7218), tn = r(4706);
    var rn = new Gr.Logger("networks/5.5.1");
    function nn(e) { var t = function (t, r) { null == r && (r = {}); var n = []; if (t.InfuraProvider)
        try {
            n.push(new t.InfuraProvider(e, r.infura));
        }
        catch (e) { } if (t.EtherscanProvider)
        try {
            n.push(new t.EtherscanProvider(e, r.etherscan));
        }
        catch (e) { } if (t.AlchemyProvider)
        try {
            n.push(new t.AlchemyProvider(e, r.alchemy));
        }
        catch (e) { } if (t.PocketProvider) {
        var r_85 = ["goerli", "ropsten", "rinkeby"];
        try {
            var i_36 = new t.PocketProvider(e);
            i_36.network && -1 === r_85.indexOf(i_36.network.name) && n.push(i_36);
        }
        catch (e) { }
    } if (t.CloudflareProvider)
        try {
            n.push(new t.CloudflareProvider(e));
        }
        catch (e) { } if (0 === n.length)
        return null; if (t.FallbackProvider) {
        var i_37 = 1;
        return null != r.quorum ? i_37 = r.quorum : "homestead" === e && (i_37 = 2), new t.FallbackProvider(n, i_37);
    } return n[0]; }; return t.renetwork = function (e) { return nn(e); }, t; }
    function on(e, t) { var r = function (r, n) { return r.JsonRpcProvider ? new r.JsonRpcProvider(e, t) : null; }; return r.renetwork = function (t) { return on(e, t); }, r; }
    var sn = { chainId: 1, ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", name: "homestead", _defaultProvider: nn("homestead") }, an = { chainId: 3, ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", name: "ropsten", _defaultProvider: nn("ropsten") }, cn = { chainId: 63, name: "classicMordor", _defaultProvider: on("https://www.ethercluster.com/mordor", "classicMordor") }, un = { unspecified: { chainId: 0, name: "unspecified" }, homestead: sn, mainnet: sn, morden: { chainId: 2, name: "morden" }, ropsten: an, testnet: an, rinkeby: { chainId: 4, ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", name: "rinkeby", _defaultProvider: nn("rinkeby") }, kovan: { chainId: 42, name: "kovan", _defaultProvider: nn("kovan") }, goerli: { chainId: 5, ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", name: "goerli", _defaultProvider: nn("goerli") }, classic: { chainId: 61, name: "classic", _defaultProvider: on("https://www.ethercluster.com/etc", "classic") }, classicMorden: { chainId: 62, name: "classicMorden" }, classicMordor: cn, classicTestnet: cn, classicKotti: { chainId: 6, name: "classicKotti", _defaultProvider: on("https://www.ethercluster.com/kotti", "classicKotti") }, xdai: { chainId: 100, name: "xdai" }, matic: { chainId: 137, name: "matic" }, maticmum: { chainId: 80001, name: "maticmum" }, optimism: { chainId: 10, name: "optimism" }, "optimism-kovan": { chainId: 69, name: "optimism-kovan" }, "optimism-goerli": { chainId: 420, name: "optimism-goerli" }, arbitrum: { chainId: 42161, name: "arbitrum" }, "arbitrum-rinkeby": { chainId: 421611, name: "arbitrum-rinkeby" }, bnb: { chainId: 56, name: "bnb" }, bnbt: { chainId: 97, name: "bnbt" } };
    var fn = r(2882), ln = r.n(fn), hn = r(4594);
    var dn = new Gr.Logger(qr);
    var pn = (function () {
        function pn() {
            var _newTarget = this.constructor;
            dn.checkNew(_newTarget, pn), this.formats = this.getDefaultFormats();
        }
        pn.prototype.getDefaultFormats = function () {
            var _this = this;
            var e = {}, t = this.address.bind(this), r = this.bigNumber.bind(this), n = this.blockTag.bind(this), i = this.data.bind(this), o = this.hash.bind(this), s = this.hex.bind(this), a = this.number.bind(this), c = this.type.bind(this);
            return e.transaction = { hash: o, type: c, accessList: pn.allowNull(this.accessList.bind(this), null), blockHash: pn.allowNull(o, null), blockNumber: pn.allowNull(a, null), transactionIndex: pn.allowNull(a, null), confirmations: pn.allowNull(a, null), from: t, gasPrice: pn.allowNull(r), maxPriorityFeePerGas: pn.allowNull(r), maxFeePerGas: pn.allowNull(r), gasLimit: r, to: pn.allowNull(t, null), value: r, nonce: a, data: i, r: pn.allowNull(this.uint256), s: pn.allowNull(this.uint256), v: pn.allowNull(a), creates: pn.allowNull(t, null), raw: pn.allowNull(i) }, e.transactionRequest = { from: pn.allowNull(t), nonce: pn.allowNull(a), gasLimit: pn.allowNull(r), gasPrice: pn.allowNull(r), maxPriorityFeePerGas: pn.allowNull(r), maxFeePerGas: pn.allowNull(r), to: pn.allowNull(t), value: pn.allowNull(r), data: pn.allowNull((function (e) { return _this.data(e, !0); })), type: pn.allowNull(a), accessList: pn.allowNull(this.accessList.bind(this), null) }, e.receiptLog = { transactionIndex: a, blockNumber: a, transactionHash: o, address: t, topics: pn.arrayOf(o), data: i, logIndex: a, blockHash: o }, e.receipt = { to: pn.allowNull(this.address, null), from: pn.allowNull(this.address, null), contractAddress: pn.allowNull(t, null), transactionIndex: a, root: pn.allowNull(s), gasUsed: r, logsBloom: pn.allowNull(i), blockHash: o, transactionHash: o, logs: pn.arrayOf(this.receiptLog.bind(this)), blockNumber: a, confirmations: pn.allowNull(a, null), cumulativeGasUsed: r, effectiveGasPrice: pn.allowNull(r), status: pn.allowNull(a), type: c }, e.block = { hash: o, parentHash: o, number: a, timestamp: a, nonce: pn.allowNull(s), difficulty: this.difficulty.bind(this), gasLimit: r, gasUsed: r, miner: t, extraData: i, transactions: pn.allowNull(pn.arrayOf(o)), baseFeePerGas: pn.allowNull(r) }, e.blockWithTransactions = (0, zr.shallowCopy)(e.block), e.blockWithTransactions.transactions = pn.allowNull(pn.arrayOf(this.transactionResponse.bind(this))), e.filter = { fromBlock: pn.allowNull(n, void 0), toBlock: pn.allowNull(n, void 0), blockHash: pn.allowNull(o, void 0), address: pn.allowNull(t, void 0), topics: pn.allowNull(this.topics.bind(this), void 0) }, e.filterLog = { blockNumber: pn.allowNull(a), blockHash: pn.allowNull(o), transactionIndex: a, removed: pn.allowNull(this.boolean.bind(this)), address: t, data: pn.allowFalsish(i, "0x"), topics: pn.arrayOf(o), transactionHash: o, logIndex: a }, e;
        };
        pn.prototype.accessList = function (e) { return (0, Zr.accessListify)(e || []); };
        pn.prototype.number = function (e) { return "0x" === e ? 0 : Wr.O$.from(e).toNumber(); };
        pn.prototype.type = function (e) { return "0x" === e || null == e ? 0 : Wr.O$.from(e).toNumber(); };
        pn.prototype.bigNumber = function (e) { return Wr.O$.from(e); };
        pn.prototype.boolean = function (e) { if ("boolean" == typeof e)
            return e; if ("string" == typeof e) {
            if ("true" === (e = e.toLowerCase()))
                return !0;
            if ("false" === e)
                return !1;
        } throw new Error("invalid boolean - " + e); };
        pn.prototype.hex = function (e, t) { return "string" == typeof e && (t || "0x" === e.substring(0, 2) || (e = "0x" + e), (0, vr.isHexString)(e)) ? e.toLowerCase() : dn.throwArgumentError("invalid hash", "value", e); };
        pn.prototype.data = function (e, t) { var r = this.hex(e, t); if (r.length % 2 != 0)
            throw new Error("invalid data; odd-length - " + e); return r; };
        pn.prototype.address = function (e) { return (0, hn.getAddress)(e); };
        pn.prototype.callAddress = function (e) { if (!(0, vr.isHexString)(e, 32))
            return null; var t = (0, hn.getAddress)((0, vr.hexDataSlice)(e, 12)); return "0x0000000000000000000000000000000000000000" === t ? null : t; };
        pn.prototype.contractAddress = function (e) { return (0, hn.getContractAddress)(e); };
        pn.prototype.blockTag = function (e) { if (null == e)
            return "latest"; if ("earliest" === e)
            return "0x0"; if ("latest" === e || "pending" === e)
            return e; if ("number" == typeof e || (0, vr.isHexString)(e))
            return (0, vr.hexValue)(e); throw new Error("invalid blockTag"); };
        pn.prototype.hash = function (e, t) { var r = this.hex(e, t); return 32 !== (0, vr.hexDataLength)(r) ? dn.throwArgumentError("invalid hash", "value", e) : r; };
        pn.prototype.difficulty = function (e) { if (null == e)
            return null; var t = Wr.O$.from(e); try {
            return t.toNumber();
        }
        catch (e) { } return null; };
        pn.prototype.uint256 = function (e) { if (!(0, vr.isHexString)(e))
            throw new Error("invalid uint256"); return (0, vr.hexZeroPad)(e, 32); };
        pn.prototype._block = function (e, t) { null != e.author && null == e.miner && (e.miner = e.author); var r = null != e._difficulty ? e._difficulty : e.difficulty, n = pn.check(t, e); return n._difficulty = null == r ? null : Wr.O$.from(r), n; };
        pn.prototype.block = function (e) { return this._block(e, this.formats.block); };
        pn.prototype.blockWithTransactions = function (e) { return this._block(e, this.formats.blockWithTransactions); };
        pn.prototype.transactionRequest = function (e) { return pn.check(this.formats.transactionRequest, e); };
        pn.prototype.transactionResponse = function (e) { null != e.gas && null == e.gasLimit && (e.gasLimit = e.gas), e.to && Wr.O$.from(e.to).isZero() && (e.to = "0x0000000000000000000000000000000000000000"), null != e.input && null == e.data && (e.data = e.input), null == e.to && null == e.creates && (e.creates = this.contractAddress(e)), 1 !== e.type && 2 !== e.type || null != e.accessList || (e.accessList = []); var t = pn.check(this.formats.transaction, e); if (null != e.chainId) {
            var r_86 = e.chainId;
            (0, vr.isHexString)(r_86) && (r_86 = Wr.O$.from(r_86).toNumber()), t.chainId = r_86;
        }
        else {
            var r_87 = e.networkId;
            null == r_87 && null == t.v && (r_87 = e.chainId), (0, vr.isHexString)(r_87) && (r_87 = Wr.O$.from(r_87).toNumber()), "number" != typeof r_87 && null != t.v && (r_87 = (t.v - 35) / 2, r_87 < 0 && (r_87 = 0), r_87 = parseInt(r_87)), "number" != typeof r_87 && (r_87 = 0), t.chainId = r_87;
        } return t.blockHash && "x" === t.blockHash.replace(/0/g, "") && (t.blockHash = null), t; };
        pn.prototype.transaction = function (e) { return (0, Zr.parse)(e); };
        pn.prototype.receiptLog = function (e) { return pn.check(this.formats.receiptLog, e); };
        pn.prototype.receipt = function (e) { var t = pn.check(this.formats.receipt, e); if (null != t.root)
            if (t.root.length <= 4) {
                var e_164 = Wr.O$.from(t.root).toNumber();
                0 === e_164 || 1 === e_164 ? (null != t.status && t.status !== e_164 && dn.throwArgumentError("alt-root-status/status mismatch", "value", { root: t.root, status: t.status }), t.status = e_164, delete t.root) : dn.throwArgumentError("invalid alt-root-status", "value.root", t.root);
            }
            else
                66 !== t.root.length && dn.throwArgumentError("invalid root hash", "value.root", t.root); return null != t.status && (t.byzantium = !0), t; };
        pn.prototype.topics = function (e) {
            var _this = this;
            return Array.isArray(e) ? e.map((function (e) { return _this.topics(e); })) : null != e ? this.hash(e, !0) : null;
        };
        pn.prototype.filter = function (e) { return pn.check(this.formats.filter, e); };
        pn.prototype.filterLog = function (e) { return pn.check(this.formats.filterLog, e); };
        pn.check = function (e, t) { var r = {}; for (var n_69 in e)
            try {
                var i_38 = e[n_69](t[n_69]);
                void 0 !== i_38 && (r[n_69] = i_38);
            }
            catch (e) {
                throw e.checkKey = n_69, e.checkValue = t[n_69], e;
            } return r; };
        pn.allowNull = function (e, t) { return function (r) { return null == r ? t : e(r); }; };
        pn.allowFalsish = function (e, t) { return function (r) { return r ? e(r) : t; }; };
        pn.arrayOf = function (e) { return function (t) { if (!Array.isArray(t))
            throw new Error("not an array"); var r = []; return t.forEach((function (t) { r.push(e(t)); })), r; }; };
        return pn;
    }());
    var gn = function (e, t, r, n) { return new (r || (r = Promise))((function (i, o) { function s(e) { try {
        c(n.next(e));
    }
    catch (e) {
        o(e);
    } } function a(e) { try {
        c(n.throw(e));
    }
    catch (e) {
        o(e);
    } } function c(e) { var t; e.done ? i(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(s, a); } c((n = n.apply(e, t || [])).next()); })); };
    var mn = new Gr.Logger(qr);
    function yn(e) { return null == e ? "null" : (32 !== (0, vr.hexDataLength)(e) && mn.throwArgumentError("invalid topic", "topic", e), e.toLowerCase()); }
    function bn(e) { for (e = e.slice(); e.length > 0 && null == e[e.length - 1];)
        e.pop(); return e.map((function (e) { if (Array.isArray(e)) {
        var t_112 = {};
        e.forEach((function (e) { t_112[yn(e)] = !0; }));
        var r_88 = Object.keys(t_112);
        return r_88.sort(), r_88.join("|");
    } return yn(e); })).join("&"); }
    function vn(e) { if ("string" == typeof e) {
        if (e = e.toLowerCase(), 32 === (0, vr.hexDataLength)(e))
            return "tx:" + e;
        if (-1 === e.indexOf(":"))
            return e;
    }
    else {
        if (Array.isArray(e))
            return "filter:*:" + bn(e);
        if (Yr.Sg.isForkEvent(e))
            throw mn.warn("not implemented"), new Error("not implemented");
        if (e && "object" == typeof e)
            return "filter:" + (e.address || "*") + ":" + bn(e.topics || []);
    } throw new Error("invalid event - " + e); }
    function wn() { return (new Date).getTime(); }
    function An(e) { return new Promise((function (t) { setTimeout(t, e); })); }
    var Sn = ["block", "network", "pending", "poll"];
    var En = (function () {
        function En(e, t, r) {
            (0, zr.defineReadOnly)(this, "tag", e), (0, zr.defineReadOnly)(this, "listener", t), (0, zr.defineReadOnly)(this, "once", r);
        }
        Object.defineProperty(En.prototype, "event", {
            get: function () { switch (this.type) {
                case "tx": return this.hash;
                case "filter": return this.filter;
            } return this.tag; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(En.prototype, "type", {
            get: function () { return this.tag.split(":")[0]; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(En.prototype, "hash", {
            get: function () { var e = this.tag.split(":"); return "tx" !== e[0] ? null : e[1]; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(En.prototype, "filter", {
            get: function () { var e = this.tag.split(":"); if ("filter" !== e[0])
                return null; var t = e[1], r = "" === (n = e[2]) ? [] : n.split(/&/g).map((function (e) { if ("" === e)
                return []; var t = e.split("|").map((function (e) { return "null" === e ? null : e; })); return 1 === t.length ? t[0] : t; })); var n; var i = {}; return r.length > 0 && (i.topics = r), t && "*" !== t && (i.address = t), i; },
            enumerable: false,
            configurable: true
        });
        En.prototype.pollable = function () { return this.tag.indexOf(":") >= 0 || Sn.indexOf(this.tag) >= 0; };
        return En;
    }());
    var kn = { 0: { symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc" }, 2: { symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc" }, 3: { symbol: "doge", p2pkh: 30, p2sh: 22 }, 60: { symbol: "eth", ilk: "eth" }, 61: { symbol: "etc", ilk: "eth" }, 700: { symbol: "xdai", ilk: "eth" } };
    function xn(e) { return (0, vr.hexZeroPad)(Wr.O$.from(e).toHexString(), 32); }
    function Nn(e) { return Qr.Base58.encode((0, vr.concat)([e, (0, vr.hexDataSlice)((0, wr.JQ)((0, wr.JQ)(e)), 0, 4)])); }
    var Bn = [new RegExp("^(https)://(.*)$", "i"), new RegExp("^(data):(.*)$", "i"), new RegExp("^(ipfs)://(.*)$", "i"), new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")];
    function Pn(e) { try {
        return (0, Jr.ZN)(_n(e));
    }
    catch (e) { } return null; }
    function _n(e) { if ("0x" === e)
        return null; var t = Wr.O$.from((0, vr.hexDataSlice)(e, 0, 32)).toNumber(), r = Wr.O$.from((0, vr.hexDataSlice)(e, t, t + 32)).toNumber(); return (0, vr.hexDataSlice)(e, t + 32, t + 32 + r); }
    var In = (function () {
        function In(e, t, r, n) {
            (0, zr.defineReadOnly)(this, "provider", e), (0, zr.defineReadOnly)(this, "name", r), (0, zr.defineReadOnly)(this, "address", e.formatter.address(t)), (0, zr.defineReadOnly)(this, "_resolvedAddress", n);
        }
        In.prototype._fetchBytes = function (e, t) { return gn(this, void 0, void 0, (function () { var r, _a, e_165; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = { to: this.address, data: (0, vr.hexConcat)([e, (0, tn.V)(this.name), t || "0x"]) };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = _n;
                    return [4, this.provider.call(r)];
                case 2: return [2, _a.apply(void 0, [_b.sent()])];
                case 3:
                    e_165 = _b.sent();
                    return [2, (e_165.code, Gr.Logger.errors.CALL_EXCEPTION, null)];
                case 4: return [2];
            }
        }); })); };
        In.prototype._getAddress = function (e, t) { var r = kn[String(e)]; if (null == r && mn.throwError("unsupported coin type: " + e, Gr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "getAddress(" + e + ")" }), "eth" === r.ilk)
            return this.provider.formatter.address(t); var n = (0, vr.arrayify)(t); if (null != r.p2pkh) {
            var e_166 = t.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
            if (e_166) {
                var t_113 = parseInt(e_166[1], 16);
                if (e_166[2].length === 2 * t_113 && t_113 >= 1 && t_113 <= 75)
                    return Nn((0, vr.concat)([[r.p2pkh], "0x" + e_166[2]]));
            }
        } if (null != r.p2sh) {
            var e_167 = t.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
            if (e_167) {
                var t_114 = parseInt(e_167[1], 16);
                if (e_167[2].length === 2 * t_114 && t_114 >= 1 && t_114 <= 75)
                    return Nn((0, vr.concat)([[r.p2sh], "0x" + e_167[2]]));
            }
        } if (null != r.prefix) {
            var e_168 = n[1];
            var t_115 = n[0];
            if (0 === t_115 ? 20 !== e_168 && 32 !== e_168 && (t_115 = -1) : t_115 = -1, t_115 >= 0 && n.length === 2 + e_168 && e_168 >= 1 && e_168 <= 75) {
                var e_169 = ln().toWords(n.slice(2));
                return e_169.unshift(t_115), ln().encode(r.prefix, e_169);
            }
        } return null; };
        In.prototype.getAddress = function (e) { return gn(this, void 0, void 0, (function () { var e_171, t_116, e_170, t, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(null == e && (e = 60), 60 === e)) return [3, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    e_171 = { to: this.address, data: "0x3b3b57de" + (0, tn.V)(this.name).substring(2) };
                    return [4, this.provider.call(e_171)];
                case 2:
                    t_116 = _a.sent();
                    return [2, "0x" === t_116 || t_116 === en.R ? null : this.provider.formatter.callAddress(t_116)];
                case 3:
                    e_170 = _a.sent();
                    if (e_170.code === Gr.Logger.errors.CALL_EXCEPTION)
                        return [2, null];
                    throw e_170;
                case 4: return [4, this._fetchBytes("0xf1cb7e06", xn(e))];
                case 5:
                    t = _a.sent();
                    if (null == t || "0x" === t)
                        return [2, null];
                    r = this._getAddress(e, t);
                    return [2, (null == r && mn.throwError("invalid or unsupported coin data", Gr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "getAddress(" + e + ")", coinType: e, data: t }), r)];
            }
        }); })); };
        In.prototype.getAvatar = function () { return gn(this, void 0, void 0, (function () { var e, t_117, r_89, n_70, _a, r_90, i_39, o_21, _b, s_17, a_16, t_118, _c, _d, t_119, _f, _g, c_9, u_4, _h, f_3, e_172; return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    e = [];
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 19, , 20]);
                    return [4, this.getText("avatar")];
                case 2:
                    t_117 = _j.sent();
                    if (null == t_117)
                        return [2, null];
                    r_89 = 0;
                    _j.label = 3;
                case 3:
                    if (!(r_89 < Bn.length)) return [3, 18];
                    n_70 = t_117.match(Bn[r_89]);
                    if (!(null != n_70)) return [3, 17];
                    _a = n_70[1];
                    switch (_a) {
                        case "https": return [3, 4];
                        case "data": return [3, 5];
                        case "ipfs": return [3, 6];
                        case "erc721": return [3, 7];
                        case "erc1155": return [3, 7];
                    }
                    return [3, 17];
                case 4: return [2, (e.push({ type: "url", content: t_117 }), { linkage: e, url: t_117 })];
                case 5: return [2, (e.push({ type: "data", content: t_117 }), { linkage: e, url: t_117 })];
                case 6: return [2, (e.push({ type: "ipfs", content: t_117 }), { linkage: e, url: "https://gateway.ipfs.io/ipfs/" + t_117.substring(7) })];
                case 7:
                    r_90 = "erc721" === n_70[1] ? "0xc87b56dd" : "0x0e89341c";
                    e.push({ type: n_70[1], content: t_117 });
                    _b = this._resolvedAddress;
                    if (_b) return [3, 9];
                    return [4, this.getAddress()];
                case 8:
                    _b = (_j.sent());
                    _j.label = 9;
                case 9:
                    i_39 = _b, o_21 = (n_70[2] || "").split("/");
                    if (2 !== o_21.length)
                        return [2, null];
                    return [4, this.provider.formatter.address(o_21[0])];
                case 10:
                    s_17 = _j.sent(), a_16 = (0, vr.hexZeroPad)(Wr.O$.from(o_21[1]).toHexString(), 32);
                    if (!("erc721" === n_70[1])) return [3, 12];
                    _d = (_c = this.provider.formatter).callAddress;
                    return [4, this.provider.call({ to: s_17, data: (0, vr.hexConcat)(["0x6352211e", a_16]) })];
                case 11:
                    t_118 = _d.apply(_c, [_j.sent()]);
                    if (i_39 !== t_118)
                        return [2, null];
                    e.push({ type: "owner", content: t_118 });
                    return [3, 14];
                case 12:
                    if (!("erc1155" === n_70[1])) return [3, 14];
                    _g = (_f = Wr.O$).from;
                    return [4, this.provider.call({ to: s_17, data: (0, vr.hexConcat)(["0x00fdd58e", (0, vr.hexZeroPad)(i_39, 32), a_16]) })];
                case 13:
                    t_119 = _g.apply(_f, [_j.sent()]);
                    if (t_119.isZero())
                        return [2, null];
                    e.push({ type: "balance", content: t_119.toString() });
                    _j.label = 14;
                case 14:
                    c_9 = { to: this.provider.formatter.address(o_21[0]), data: (0, vr.hexConcat)([r_90, a_16]) };
                    _h = Pn;
                    return [4, this.provider.call(c_9)];
                case 15:
                    u_4 = _h.apply(void 0, [_j.sent()]);
                    if (null == u_4)
                        return [2, null];
                    e.push({ type: "metadata-url", content: u_4 }), "erc1155" === n_70[1] && (u_4 = u_4.replace("{id}", a_16.substring(2)));
                    return [4, (0, Xr.fetchJson)(u_4)];
                case 16:
                    f_3 = _j.sent();
                    return [2, f_3 && "string" == typeof f_3.image && f_3.image.match(/^(https:\/\/|data:)/i) ? (e.push({ type: "metadata", content: JSON.stringify(f_3) }), e.push({ type: "url", content: f_3.image }), { linkage: e, url: f_3.image }) : null];
                case 17:
                    r_89++;
                    return [3, 3];
                case 18: return [3, 20];
                case 19:
                    e_172 = _j.sent();
                    return [3, 20];
                case 20: return [2, null];
            }
        }); })); };
        In.prototype.getContentHash = function () { return gn(this, void 0, void 0, (function () { var e, t, e_173, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this._fetchBytes("0xbc1c58d1")];
                case 1:
                    e = _a.sent();
                    if (null == e || "0x" === e)
                        return [2, null];
                    t = e.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
                    if (t) {
                        e_173 = parseInt(t[3], 16);
                        if (t[4].length === 2 * e_173)
                            return [2, "ipfs://" + Qr.Base58.encode("0x" + t[1])];
                    }
                    r = e.match(/^0xe40101fa011b20([0-9a-f]*)$/);
                    return [2, r && 64 === r[1].length ? "bzz://" + r[1] : mn.throwError("invalid or unsupported content hash data", Gr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "getContentHash()", data: e })];
            }
        }); })); };
        In.prototype.getText = function (e) { return gn(this, void 0, void 0, (function () { var t, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = (0, Jr.Y0)(e);
                    t = (0, vr.concat)([xn(64), xn(t.length), t]), t.length % 32 != 0 && (t = (0, vr.concat)([t, (0, vr.hexZeroPad)("0x", 32 - e.length % 32)]));
                    return [4, this._fetchBytes("0x59d1d43c", (0, vr.hexlify)(t))];
                case 1:
                    r = _a.sent();
                    return [2, null == r || "0x" === r ? null : (0, Jr.ZN)(r)];
            }
        }); })); };
        return In;
    }());
    var On = null, Tn = 1;
    var Rn = (function (_super) {
        __extends(Rn, _super);
        function Rn(e) {
            var _newTarget = this.constructor;
            var _this = this;
            if (mn.checkNew(_newTarget, Yr.zt), _this = _super.call(this) || this, _this._events = [], _this._emitted = { block: -2 }, _this.formatter = _newTarget.getFormatter(), (0, zr.defineReadOnly)(_this, "anyNetwork", "any" === e), _this.anyNetwork && (e = _this.detectNetwork()), e instanceof Promise)
                _this._networkPromise = e, e.catch((function (e) { })), _this._ready().catch((function (e) { }));
            else {
                var t_120 = (0, zr.getStatic)(_newTarget, "getNetwork")(e);
                t_120 ? ((0, zr.defineReadOnly)(_this, "_network", t_120), _this.emit("network", t_120, null)) : mn.throwArgumentError("invalid network", "network", e);
            }
            _this._maxInternalBlockNumber = -1024, _this._lastBlockNumber = -2, _this._pollingInterval = 4e3, _this._fastQueryDate = 0;
            return _this;
        }
        Rn.prototype._ready = function () { return gn(this, void 0, void 0, (function () { var e_175, e_174, _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(null == this._network)) return [3, 7];
                    e_175 = null;
                    if (!this._networkPromise) return [3, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, this._networkPromise];
                case 2:
                    e_175 = _b.sent();
                    return [3, 4];
                case 3:
                    e_174 = _b.sent();
                    return [3, 4];
                case 4:
                    _a = null == e_175;
                    if (!_a) return [3, 6];
                    return [4, this.detectNetwork()];
                case 5:
                    _a = (e_175 = _b.sent());
                    _b.label = 6;
                case 6:
                    _a, e_175 || mn.throwError("no network detected", Gr.Logger.errors.UNKNOWN_ERROR, {}), null == this._network && (this.anyNetwork ? this._network = e_175 : (0, zr.defineReadOnly)(this, "_network", e_175), this.emit("network", e_175, null));
                    _b.label = 7;
                case 7: return [2, this._network];
            }
        }); })); };
        Object.defineProperty(Rn.prototype, "ready", {
            get: function () {
                var _this = this;
                return (0, Xr.poll)((function () { return _this._ready().then((function (e) { return e; }), (function (e) { if (e.code !== Gr.Logger.errors.NETWORK_ERROR || "noNetwork" !== e.event)
                    throw e; })); }));
            },
            enumerable: false,
            configurable: true
        });
        Rn.getFormatter = function () { return null == On && (On = new pn), On; };
        Rn.getNetwork = function (e) { return function (e) { if (null == e)
            return null; if ("number" == typeof e) {
            for (var t_121 in un) {
                var r_91 = un[t_121];
                if (r_91.chainId === e)
                    return { name: r_91.name, chainId: r_91.chainId, ensAddress: r_91.ensAddress || null, _defaultProvider: r_91._defaultProvider || null };
            }
            return { chainId: e, name: "unknown" };
        } if ("string" == typeof e) {
            var t_122 = un[e];
            return null == t_122 ? null : { name: t_122.name, chainId: t_122.chainId, ensAddress: t_122.ensAddress, _defaultProvider: t_122._defaultProvider || null };
        } var t = un[e.name]; if (!t)
            return "number" != typeof e.chainId && rn.throwArgumentError("invalid network chainId", "network", e), e; 0 !== e.chainId && e.chainId !== t.chainId && rn.throwArgumentError("network chainId mismatch", "network", e); var r = e._defaultProvider || null; var n; return null == r && t._defaultProvider && (r = (n = t._defaultProvider) && "function" == typeof n.renetwork ? t._defaultProvider.renetwork(e) : t._defaultProvider), { name: e.name, chainId: t.chainId, ensAddress: e.ensAddress || t.ensAddress || null, _defaultProvider: r }; }(null == e ? "homestead" : e); };
        Rn.prototype._getInternalBlockNumber = function (e) { return gn(this, void 0, void 0, (function () {
            var t_123, r_92, e_176, t, r;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._ready()];
                    case 1:
                        if (!(_a.sent(), e > 0)) return [3, 7];
                        _a.label = 2;
                    case 2:
                        if (!this._internalBlockNumber) return [3, 7];
                        t_123 = this._internalBlockNumber;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4, t_123];
                    case 4:
                        r_92 = _a.sent();
                        if (wn() - r_92.respTime <= e)
                            return [2, r_92.blockNumber];
                        return [3, 7];
                    case 5:
                        e_176 = _a.sent();
                        if (this._internalBlockNumber === t_123)
                            return [3, 7];
                        return [3, 6];
                    case 6: return [3, 2];
                    case 7:
                        t = wn(), r = (0, zr.resolveProperties)({ blockNumber: this.perform("getBlockNumber", {}), networkError: this.getNetwork().then((function (e) { return null; }), (function (e) { return e; })) }).then((function (_a) {
                            var e = _a.blockNumber, n = _a.networkError;
                            if (n)
                                throw _this._internalBlockNumber === r && (_this._internalBlockNumber = null), n;
                            var i = wn();
                            return (e = Wr.O$.from(e).toNumber()) < _this._maxInternalBlockNumber && (e = _this._maxInternalBlockNumber), _this._maxInternalBlockNumber = e, _this._setFastBlockNumber(e), { blockNumber: e, reqTime: t, respTime: i };
                        }));
                        this._internalBlockNumber = r, r.catch((function (e) { _this._internalBlockNumber === r && (_this._internalBlockNumber = null); }));
                        return [4, r];
                    case 8: return [2, (_a.sent()).blockNumber];
                }
            });
        })); };
        Rn.prototype.poll = function () { return gn(this, void 0, void 0, (function () {
            var e, t, r, e_177, e_178;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e = Tn++, t = [];
                        r = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this._getInternalBlockNumber(100 + this.pollingInterval / 2)];
                    case 2:
                        r = _a.sent();
                        return [3, 4];
                    case 3:
                        e_177 = _a.sent();
                        return [2, void this.emit("error", e_177)];
                    case 4:
                        if (this._setFastBlockNumber(r), this.emit("poll", e, r), r !== this._lastBlockNumber) {
                            if (-2 === this._emitted.block && (this._emitted.block = r - 1), Math.abs(this._emitted.block - r) > 1e3)
                                mn.warn("network block skew detected; skipping block events (emitted=" + this._emitted.block + " blockNumber" + r + ")"), this.emit("error", mn.makeError("network block skew detected", Gr.Logger.errors.NETWORK_ERROR, { blockNumber: r, event: "blockSkew", previousBlockNumber: this._emitted.block })), this.emit("block", r);
                            else
                                for (e_178 = this._emitted.block + 1; e_178 <= r; e_178++)
                                    this.emit("block", e_178);
                            this._emitted.block !== r && (this._emitted.block = r, Object.keys(this._emitted).forEach((function (e) { if ("block" === e)
                                return; var t = _this._emitted[e]; "pending" !== t && r - t > 12 && delete _this._emitted[e]; }))), -2 === this._lastBlockNumber && (this._lastBlockNumber = r - 1), this._events.forEach((function (e) { switch (e.type) {
                                case "tx": {
                                    var r_93 = e.hash;
                                    var n_71 = _this.getTransactionReceipt(r_93).then((function (e) { return e && null != e.blockNumber ? (_this._emitted["t:" + r_93] = e.blockNumber, _this.emit(r_93, e), null) : null; })).catch((function (e) { _this.emit("error", e); }));
                                    t.push(n_71);
                                    break;
                                }
                                case "filter": {
                                    var n_72 = e.filter;
                                    n_72.fromBlock = _this._lastBlockNumber + 1, n_72.toBlock = r;
                                    var i_40 = _this.getLogs(n_72).then((function (e) { 0 !== e.length && e.forEach((function (e) { _this._emitted["b:" + e.blockHash] = e.blockNumber, _this._emitted["t:" + e.transactionHash] = e.blockNumber, _this.emit(n_72, e); })); })).catch((function (e) { _this.emit("error", e); }));
                                    t.push(i_40);
                                    break;
                                }
                            } })), this._lastBlockNumber = r, Promise.all(t).then((function () { _this.emit("didPoll", e); })).catch((function (e) { _this.emit("error", e); }));
                        }
                        else
                            this.emit("didPoll", e);
                        return [2];
                }
            });
        })); };
        Rn.prototype.resetEventsBlock = function (e) { this._lastBlockNumber = e - 1, this.polling && this.poll(); };
        Object.defineProperty(Rn.prototype, "network", {
            get: function () { return this._network; },
            enumerable: false,
            configurable: true
        });
        Rn.prototype.detectNetwork = function () { return gn(this, void 0, void 0, (function () { return __generator(this, function (_a) {
            return [2, mn.throwError("provider does not support network detection", Gr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "provider.detectNetwork" })];
        }); })); };
        Rn.prototype.getNetwork = function () { return gn(this, void 0, void 0, (function () { var e, t, r_94; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this._ready()];
                case 1:
                    e = _a.sent();
                    return [4, this.detectNetwork()];
                case 2:
                    t = _a.sent();
                    if (!(e.chainId !== t.chainId)) return [3, 5];
                    if (!this.anyNetwork) return [3, 4];
                    this._network = t, this._lastBlockNumber = -2, this._fastBlockNumber = null, this._fastBlockNumberPromise = null, this._fastQueryDate = 0, this._emitted.block = -2, this._maxInternalBlockNumber = -1024, this._internalBlockNumber = null, this.emit("network", t, e);
                    return [4, An(0)];
                case 3: return [2, (_a.sent(), this._network)];
                case 4:
                    r_94 = mn.makeError("underlying network changed", Gr.Logger.errors.NETWORK_ERROR, { event: "changed", network: e, detectedNetwork: t });
                    throw this.emit("error", r_94), r_94;
                case 5: return [2, e];
            }
        }); })); };
        Object.defineProperty(Rn.prototype, "blockNumber", {
            get: function () {
                var _this = this;
                return this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((function (e) { _this._setFastBlockNumber(e); }), (function (e) { })), null != this._fastBlockNumber ? this._fastBlockNumber : -1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rn.prototype, "polling", {
            get: function () { return null != this._poller; },
            set: function (e) {
                var _this = this;
                e && !this._poller ? (this._poller = setInterval((function () { _this.poll(); }), this.pollingInterval), this._bootstrapPoll || (this._bootstrapPoll = setTimeout((function () { _this.poll(), _this._bootstrapPoll = setTimeout((function () { _this._poller || _this.poll(), _this._bootstrapPoll = null; }), _this.pollingInterval); }), 0))) : !e && this._poller && (clearInterval(this._poller), this._poller = null);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rn.prototype, "pollingInterval", {
            get: function () { return this._pollingInterval; },
            set: function (e) {
                var _this = this;
                if ("number" != typeof e || e <= 0 || parseInt(String(e)) != e)
                    throw new Error("invalid polling interval");
                this._pollingInterval = e, this._poller && (clearInterval(this._poller), this._poller = setInterval((function () { _this.poll(); }), this._pollingInterval));
            },
            enumerable: false,
            configurable: true
        });
        Rn.prototype._getFastBlockNumber = function () {
            var _this = this;
            var e = wn();
            return e - this._fastQueryDate > 2 * this._pollingInterval && (this._fastQueryDate = e, this._fastBlockNumberPromise = this.getBlockNumber().then((function (e) { return ((null == _this._fastBlockNumber || e > _this._fastBlockNumber) && (_this._fastBlockNumber = e), _this._fastBlockNumber); }))), this._fastBlockNumberPromise;
        };
        Rn.prototype._setFastBlockNumber = function (e) { null != this._fastBlockNumber && e < this._fastBlockNumber || (this._fastQueryDate = wn(), (null == this._fastBlockNumber || e > this._fastBlockNumber) && (this._fastBlockNumber = e, this._fastBlockNumberPromise = Promise.resolve(e))); };
        Rn.prototype.waitForTransaction = function (e, t, r) { return gn(this, void 0, void 0, (function () { return __generator(this, function (_a) {
            return [2, this._waitForTransaction(e, null == t ? 1 : t, r || 0, null)];
        }); })); };
        Rn.prototype._waitForTransaction = function (e, t, r, n) { return gn(this, void 0, void 0, (function () {
            var i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getTransactionReceipt(e)];
                    case 1:
                        i = _a.sent();
                        return [2, (i ? i.confirmations : 0) >= t ? i : new Promise((function (i, o) { var s = []; var a = !1; var c = function () { return !!a || (a = !0, s.forEach((function (e) { e(); })), !1); }, u = function (e) { e.confirmations < t || c() || i(e); }; if (_this.on(e, u), s.push((function () { _this.removeListener(e, u); })), n) {
                                var r_95 = n.startBlock, i_41 = null;
                                var u_5 = function (s) { return gn(_this, void 0, void 0, (function () {
                                    var _a;
                                    var _this = this;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = a;
                                                if (_a) return [3, 2];
                                                return [4, An(1e3)];
                                            case 1:
                                                _a = (_b.sent(), this.getTransactionCount(n.from).then((function (f) { return gn(_this, void 0, void 0, (function () { var t_124, r_96, i_42, s_18, r_97, i_43; return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!!a) return [3, 11];
                                                            if (!(f <= n.nonce)) return [3, 1];
                                                            r_95 = s;
                                                            return [3, 10];
                                                        case 1: return [4, this.getTransaction(e)];
                                                        case 2:
                                                            t_124 = _a.sent();
                                                            if (t_124 && null != t_124.blockNumber)
                                                                return [2];
                                                            null == i_41 && (i_41 = r_95 - 3, i_41 < n.startBlock && (i_41 = n.startBlock));
                                                            _a.label = 3;
                                                        case 3:
                                                            if (!(i_41 <= s)) return [3, 10];
                                                            if (a)
                                                                return [2];
                                                            return [4, this.getBlockWithTransactions(i_41)];
                                                        case 4:
                                                            r_96 = _a.sent();
                                                            i_42 = 0;
                                                            _a.label = 5;
                                                        case 5:
                                                            if (!(i_42 < r_96.transactions.length)) return [3, 8];
                                                            s_18 = r_96.transactions[i_42];
                                                            if (s_18.hash === e)
                                                                return [2];
                                                            if (!(s_18.from === n.from && s_18.nonce === n.nonce)) return [3, 7];
                                                            if (a)
                                                                return [2];
                                                            return [4, this.waitForTransaction(s_18.hash, t)];
                                                        case 6:
                                                            r_97 = _a.sent();
                                                            if (c())
                                                                return [2];
                                                            i_43 = "replaced";
                                                            return [2, (s_18.data === n.data && s_18.to === n.to && s_18.value.eq(n.value) ? i_43 = "repriced" : "0x" === s_18.data && s_18.from === s_18.to && s_18.value.isZero() && (i_43 = "cancelled"), void o(mn.makeError("transaction was replaced", Gr.Logger.errors.TRANSACTION_REPLACED, { cancelled: "replaced" === i_43 || "cancelled" === i_43, reason: i_43, replacement: this._wrapTransaction(s_18), hash: e, receipt: r_97 })))];
                                                        case 7:
                                                            i_42++;
                                                            return [3, 5];
                                                        case 8:
                                                            i_41++;
                                                            _a.label = 9;
                                                        case 9: return [3, 3];
                                                        case 10:
                                                            a || this.once("block", u_5);
                                                            _a.label = 11;
                                                        case 11: return [2];
                                                    }
                                                }); })); }), (function (e) { a || _this.once("block", u_5); })));
                                                _b.label = 2;
                                            case 2:
                                                _a;
                                                return [2];
                                        }
                                    });
                                })); };
                                if (a)
                                    return;
                                _this.once("block", u_5), s.push((function () { _this.removeListener("block", u_5); }));
                            } if ("number" == typeof r && r > 0) {
                                var e_179 = setTimeout((function () { c() || o(mn.makeError("timeout exceeded", Gr.Logger.errors.TIMEOUT, { timeout: r })); }), r);
                                e_179.unref && e_179.unref(), s.push((function () { clearTimeout(e_179); }));
                            } }))];
                }
            });
        })); };
        Rn.prototype.getBlockNumber = function () { return gn(this, void 0, void 0, (function () { return __generator(this, function (_a) {
            return [2, this._getInternalBlockNumber(0)];
        }); })); };
        Rn.prototype.getGasPrice = function () { return gn(this, void 0, void 0, (function () { var e; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    _a.sent();
                    return [4, this.perform("getGasPrice", {})];
                case 2:
                    e = _a.sent();
                    try {
                        return [2, Wr.O$.from(e)];
                    }
                    catch (t) {
                        return [2, mn.throwError("bad result from backend", Gr.Logger.errors.SERVER_ERROR, { method: "getGasPrice", result: e, error: t })];
                    }
                    return [2];
            }
        }); })); };
        Rn.prototype.getBalance = function (e, t) { return gn(this, void 0, void 0, (function () { var r, n; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    _a.sent();
                    return [4, (0, zr.resolveProperties)({ address: this._getAddress(e), blockTag: this._getBlockTag(t) })];
                case 2:
                    r = _a.sent();
                    return [4, this.perform("getBalance", r)];
                case 3:
                    n = _a.sent();
                    try {
                        return [2, Wr.O$.from(n)];
                    }
                    catch (e) {
                        return [2, mn.throwError("bad result from backend", Gr.Logger.errors.SERVER_ERROR, { method: "getBalance", params: r, result: n, error: e })];
                    }
                    return [2];
            }
        }); })); };
        Rn.prototype.getTransactionCount = function (e, t) { return gn(this, void 0, void 0, (function () { var r, n; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    _a.sent();
                    return [4, (0, zr.resolveProperties)({ address: this._getAddress(e), blockTag: this._getBlockTag(t) })];
                case 2:
                    r = _a.sent();
                    return [4, this.perform("getTransactionCount", r)];
                case 3:
                    n = _a.sent();
                    try {
                        return [2, Wr.O$.from(n).toNumber()];
                    }
                    catch (e) {
                        return [2, mn.throwError("bad result from backend", Gr.Logger.errors.SERVER_ERROR, { method: "getTransactionCount", params: r, result: n, error: e })];
                    }
                    return [2];
            }
        }); })); };
        Rn.prototype.getCode = function (e, t) { return gn(this, void 0, void 0, (function () { var r, n; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    _a.sent();
                    return [4, (0, zr.resolveProperties)({ address: this._getAddress(e), blockTag: this._getBlockTag(t) })];
                case 2:
                    r = _a.sent();
                    return [4, this.perform("getCode", r)];
                case 3:
                    n = _a.sent();
                    try {
                        return [2, (0, vr.hexlify)(n)];
                    }
                    catch (e) {
                        return [2, mn.throwError("bad result from backend", Gr.Logger.errors.SERVER_ERROR, { method: "getCode", params: r, result: n, error: e })];
                    }
                    return [2];
            }
        }); })); };
        Rn.prototype.getStorageAt = function (e, t, r) { return gn(this, void 0, void 0, (function () { var n, i; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    _a.sent();
                    return [4, (0, zr.resolveProperties)({ address: this._getAddress(e), blockTag: this._getBlockTag(r), position: Promise.resolve(t).then((function (e) { return (0, vr.hexValue)(e); })) })];
                case 2:
                    n = _a.sent();
                    return [4, this.perform("getStorageAt", n)];
                case 3:
                    i = _a.sent();
                    try {
                        return [2, (0, vr.hexlify)(i)];
                    }
                    catch (e) {
                        return [2, mn.throwError("bad result from backend", Gr.Logger.errors.SERVER_ERROR, { method: "getStorageAt", params: n, result: i, error: e })];
                    }
                    return [2];
            }
        }); })); };
        Rn.prototype._wrapTransaction = function (e, t, r) {
            var _this = this;
            if (null != t && 32 !== (0, vr.hexDataLength)(t))
                throw new Error("invalid response - sendTransaction");
            var n = e;
            return null != t && e.hash !== t && mn.throwError("Transaction hash mismatch from Provider.sendTransaction.", Gr.Logger.errors.UNKNOWN_ERROR, { expectedHash: e.hash, returnedHash: t }), n.wait = function (t, n) { return gn(_this, void 0, void 0, (function () { var i, o; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        null == t && (t = 1), null == n && (n = 0), 0 !== t && null != r && (i = { data: e.data, from: e.from, nonce: e.nonce, to: e.to, value: e.value, startBlock: r });
                        return [4, this._waitForTransaction(e.hash, t, n, i)];
                    case 1:
                        o = _a.sent();
                        return [2, null == o && 0 === t ? null : (this._emitted["t:" + e.hash] = o.blockNumber, 0 === o.status && mn.throwError("transaction failed", Gr.Logger.errors.CALL_EXCEPTION, { transactionHash: e.hash, transaction: e, receipt: o }), o)];
                }
            }); })); }, n;
        };
        Rn.prototype.sendTransaction = function (e) { return gn(this, void 0, void 0, (function () { var t, r, n, e_181, e_180; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    _a.sent();
                    return [4, Promise.resolve(e).then((function (e) { return (0, vr.hexlify)(e); }))];
                case 2:
                    t = _a.sent(), r = this.formatter.transaction(e);
                    null == r.confirmations && (r.confirmations = 0);
                    return [4, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                case 3:
                    n = _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4, this.perform("sendTransaction", { signedTransaction: t })];
                case 5:
                    e_181 = _a.sent();
                    return [2, this._wrapTransaction(r, e_181, n)];
                case 6:
                    e_180 = _a.sent();
                    throw e_180.transaction = r, e_180.transactionHash = r.hash, e_180;
                case 7: return [2];
            }
        }); })); };
        Rn.prototype._getTransactionRequest = function (e) { return gn(this, void 0, void 0, (function () {
            var t, r, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, e];
                    case 1:
                        t = _c.sent(), r = {};
                        ["from", "to"].forEach((function (e) { null != t[e] && (r[e] = Promise.resolve(t[e]).then((function (e) { return e ? _this._getAddress(e) : null; }))); })), ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach((function (e) { null != t[e] && (r[e] = Promise.resolve(t[e]).then((function (e) { return e ? Wr.O$.from(e) : null; }))); })), ["type"].forEach((function (e) { null != t[e] && (r[e] = Promise.resolve(t[e]).then((function (e) { return null != e ? e : null; }))); })), t.accessList && (r.accessList = this.formatter.accessList(t.accessList)), ["data"].forEach((function (e) { null != t[e] && (r[e] = Promise.resolve(t[e]).then((function (e) { return e ? (0, vr.hexlify)(e) : null; }))); }));
                        _b = (_a = this.formatter).transactionRequest;
                        return [4, (0, zr.resolveProperties)(r)];
                    case 2: return [2, _b.apply(_a, [_c.sent()])];
                }
            });
        })); };
        Rn.prototype._getFilter = function (e) { return gn(this, void 0, void 0, (function () {
            var t, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, e];
                    case 1:
                        e = _c.sent();
                        t = {};
                        null != e.address && (t.address = this._getAddress(e.address)), ["blockHash", "topics"].forEach((function (r) { null != e[r] && (t[r] = e[r]); })), ["fromBlock", "toBlock"].forEach((function (r) { null != e[r] && (t[r] = _this._getBlockTag(e[r])); }));
                        _b = (_a = this.formatter).filter;
                        return [4, (0, zr.resolveProperties)(t)];
                    case 2: return [2, _b.apply(_a, [_c.sent()])];
                }
            });
        })); };
        Rn.prototype.call = function (e, t) { return gn(this, void 0, void 0, (function () { var r, n; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    _a.sent();
                    return [4, (0, zr.resolveProperties)({ transaction: this._getTransactionRequest(e), blockTag: this._getBlockTag(t) })];
                case 2:
                    r = _a.sent();
                    return [4, this.perform("call", r)];
                case 3:
                    n = _a.sent();
                    try {
                        return [2, (0, vr.hexlify)(n)];
                    }
                    catch (e) {
                        return [2, mn.throwError("bad result from backend", Gr.Logger.errors.SERVER_ERROR, { method: "call", params: r, result: n, error: e })];
                    }
                    return [2];
            }
        }); })); };
        Rn.prototype.estimateGas = function (e) { return gn(this, void 0, void 0, (function () { var t, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    _a.sent();
                    return [4, (0, zr.resolveProperties)({ transaction: this._getTransactionRequest(e) })];
                case 2:
                    t = _a.sent();
                    return [4, this.perform("estimateGas", t)];
                case 3:
                    r = _a.sent();
                    try {
                        return [2, Wr.O$.from(r)];
                    }
                    catch (e) {
                        return [2, mn.throwError("bad result from backend", Gr.Logger.errors.SERVER_ERROR, { method: "estimateGas", params: t, result: r, error: e })];
                    }
                    return [2];
            }
        }); })); };
        Rn.prototype._getAddress = function (e) { return gn(this, void 0, void 0, (function () { var _a, t; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = "string";
                    return [4, e];
                case 1:
                    _a != typeof (e = _b.sent()) && mn.throwArgumentError("invalid address or ENS name", "name", e);
                    return [4, this.resolveName(e)];
                case 2:
                    t = _b.sent();
                    return [2, (null == t && mn.throwError("ENS name not configured", Gr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "resolveName(" + JSON.stringify(e) + ")" }), t)];
            }
        }); })); };
        Rn.prototype._getBlock = function (e, t) { return gn(this, void 0, void 0, (function () {
            var r, n, _a, t_125;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.getNetwork()];
                    case 1:
                        _b.sent();
                        return [4, e];
                    case 2:
                        e = _b.sent();
                        r = -128;
                        n = { includeTransactions: !!t };
                        if (!(0, vr.isHexString)(e, 32)) return [3, 3];
                        n.blockHash = e;
                        return [3, 6];
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        _a = n;
                        return [4, this._getBlockTag(e)];
                    case 4:
                        _a.blockTag = _b.sent(), (0, vr.isHexString)(n.blockTag) && (r = parseInt(n.blockTag.substring(2), 16));
                        return [3, 6];
                    case 5:
                        t_125 = _b.sent();
                        mn.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", e);
                        return [3, 6];
                    case 6: return [2, (0, Xr.poll)((function () { return gn(_this, void 0, void 0, (function () {
                            var e, t_126, r_98, n_73, _a, e_182, r_99;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4, this.perform("getBlock", n)];
                                    case 1:
                                        e = _b.sent();
                                        if (null == e)
                                            return [2, null != n.blockHash && null == this._emitted["b:" + n.blockHash] || null != n.blockTag && r > this._emitted.block ? null : void 0];
                                        if (!t) return [3, 8];
                                        t_126 = null;
                                        r_98 = 0;
                                        _b.label = 2;
                                    case 2:
                                        if (!(r_98 < e.transactions.length)) return [3, 7];
                                        n_73 = e.transactions[r_98];
                                        if (!(null == n_73.blockNumber)) return [3, 3];
                                        n_73.confirmations = 0;
                                        return [3, 6];
                                    case 3:
                                        if (!(null == n_73.confirmations)) return [3, 6];
                                        _a = null == t_126;
                                        if (!_a) return [3, 5];
                                        return [4, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                                    case 4:
                                        _a = (t_126 = _b.sent());
                                        _b.label = 5;
                                    case 5:
                                        _a;
                                        e_182 = t_126 - n_73.blockNumber + 1;
                                        e_182 <= 0 && (e_182 = 1), n_73.confirmations = e_182;
                                        _b.label = 6;
                                    case 6:
                                        r_98++;
                                        return [3, 2];
                                    case 7:
                                        r_99 = this.formatter.blockWithTransactions(e);
                                        return [2, (r_99.transactions = r_99.transactions.map((function (e) { return _this._wrapTransaction(e); })), r_99)];
                                    case 8: return [2, this.formatter.block(e)];
                                }
                            });
                        })); }), { oncePoll: this })];
                }
            });
        })); };
        Rn.prototype.getBlock = function (e) { return this._getBlock(e, !1); };
        Rn.prototype.getBlockWithTransactions = function (e) { return this._getBlock(e, !0); };
        Rn.prototype.getTransaction = function (e) { return gn(this, void 0, void 0, (function () {
            var t;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4, e];
                    case 2:
                        e = _a.sent();
                        t = { transactionHash: this.formatter.hash(e, !0) };
                        return [2, (0, Xr.poll)((function () { return gn(_this, void 0, void 0, (function () { var r, n, e_183; return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.perform("getTransaction", t)];
                                    case 1:
                                        r = _a.sent();
                                        if (null == r)
                                            return [2, null == this._emitted["t:" + e] ? null : void 0];
                                        n = this.formatter.transactionResponse(r);
                                        if (!(null == n.blockNumber)) return [3, 2];
                                        n.confirmations = 0;
                                        return [3, 4];
                                    case 2:
                                        if (!(null == n.confirmations)) return [3, 4];
                                        return [4, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                                    case 3:
                                        e_183 = (_a.sent()) - n.blockNumber + 1;
                                        e_183 <= 0 && (e_183 = 1), n.confirmations = e_183;
                                        _a.label = 4;
                                    case 4: return [2, this._wrapTransaction(n)];
                                }
                            }); })); }), { oncePoll: this })];
                }
            });
        })); };
        Rn.prototype.getTransactionReceipt = function (e) { return gn(this, void 0, void 0, (function () {
            var t;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4, e];
                    case 2:
                        e = _a.sent();
                        t = { transactionHash: this.formatter.hash(e, !0) };
                        return [2, (0, Xr.poll)((function () { return gn(_this, void 0, void 0, (function () { var r, n, e_184; return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.perform("getTransactionReceipt", t)];
                                    case 1:
                                        r = _a.sent();
                                        if (null == r)
                                            return [2, null == this._emitted["t:" + e] ? null : void 0];
                                        if (null == r.blockHash)
                                            return [2];
                                        n = this.formatter.receipt(r);
                                        if (!(null == n.blockNumber)) return [3, 2];
                                        n.confirmations = 0;
                                        return [3, 4];
                                    case 2:
                                        if (!(null == n.confirmations)) return [3, 4];
                                        return [4, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                                    case 3:
                                        e_184 = (_a.sent()) - n.blockNumber + 1;
                                        e_184 <= 0 && (e_184 = 1), n.confirmations = e_184;
                                        _a.label = 4;
                                    case 4: return [2, n];
                                }
                            }); })); }), { oncePoll: this })];
                }
            });
        })); };
        Rn.prototype.getLogs = function (e) { return gn(this, void 0, void 0, (function () { var t, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    _a.sent();
                    return [4, (0, zr.resolveProperties)({ filter: this._getFilter(e) })];
                case 2:
                    t = _a.sent();
                    return [4, this.perform("getLogs", t)];
                case 3:
                    r = _a.sent();
                    return [2, (r.forEach((function (e) { null == e.removed && (e.removed = !1); })), pn.arrayOf(this.formatter.filterLog.bind(this.formatter))(r))];
            }
        }); })); };
        Rn.prototype.getEtherPrice = function () { return gn(this, void 0, void 0, (function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.getNetwork()];
                case 1: return [2, (_a.sent(), this.perform("getEtherPrice", {}))];
            }
        }); })); };
        Rn.prototype._getBlockTag = function (e) { return gn(this, void 0, void 0, (function () { var _a, t_127; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = "number";
                    return [4, e];
                case 1:
                    if (!(_a == typeof (e = _b.sent()) && e < 0)) return [3, 3];
                    e % 1 && mn.throwArgumentError("invalid BlockTag", "blockTag", e);
                    return [4, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                case 2:
                    t_127 = _b.sent();
                    return [2, (t_127 += e, t_127 < 0 && (t_127 = 0), this.formatter.blockTag(t_127))];
                case 3: return [2, this.formatter.blockTag(e)];
            }
        }); })); };
        Rn.prototype.getResolver = function (e) { return gn(this, void 0, void 0, (function () { var t_128, e_185; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, this._getResolver(e)];
                case 1:
                    t_128 = _a.sent();
                    return [2, null == t_128 ? null : new In(this, t_128, e)];
                case 2:
                    e_185 = _a.sent();
                    return [2, (e_185.code, Gr.Logger.errors.CALL_EXCEPTION, null)];
                case 3: return [2];
            }
        }); })); };
        Rn.prototype._getResolver = function (e) { return gn(this, void 0, void 0, (function () { var t, r, _a, _b, e_186; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, this.getNetwork()];
                case 1:
                    t = _c.sent();
                    t.ensAddress || mn.throwError("network does not support ENS", Gr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "ENS", network: t.name });
                    r = { to: t.ensAddress, data: "0x0178b8bf" + (0, tn.V)(e).substring(2) };
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    _b = (_a = this.formatter).callAddress;
                    return [4, this.call(r)];
                case 3: return [2, _b.apply(_a, [_c.sent()])];
                case 4:
                    e_186 = _c.sent();
                    if (e_186.code === Gr.Logger.errors.CALL_EXCEPTION)
                        return [2, null];
                    throw e_186;
                case 5: return [2];
            }
        }); })); };
        Rn.prototype.resolveName = function (e) { return gn(this, void 0, void 0, (function () { var t, _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, e];
                case 1:
                    e = _b.sent();
                    try {
                        return [2, Promise.resolve(this.formatter.address(e))];
                    }
                    catch (t) {
                        if ((0, vr.isHexString)(e))
                            throw t;
                    }
                    "string" != typeof e && mn.throwArgumentError("invalid ENS name", "name", e);
                    return [4, this.getResolver(e)];
                case 2:
                    t = _b.sent();
                    if (!t) return [3, 4];
                    return [4, t.getAddress()];
                case 3:
                    _a = _b.sent();
                    return [3, 5];
                case 4:
                    _a = null;
                    _b.label = 5;
                case 5: return [2, _a];
            }
        }); })); };
        Rn.prototype.lookupAddress = function (e) { return gn(this, void 0, void 0, (function () { var t, r, n, _a, i, o; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, e];
                case 1:
                    e = _b.sent();
                    t = (e = this.formatter.address(e)).substring(2).toLowerCase() + ".addr.reverse";
                    return [4, this._getResolver(t)];
                case 2:
                    r = _b.sent();
                    if (!r)
                        return [2, null];
                    _a = (0, vr.arrayify);
                    return [4, this.call({ to: r, data: "0x691f3431" + (0, tn.V)(t).substring(2) })];
                case 3:
                    n = _a.apply(void 0, [_b.sent()]);
                    if (n.length < 32 || !Wr.O$.from(n.slice(0, 32)).eq(32))
                        return [2, null];
                    if (n = n.slice(32), n.length < 32)
                        return [2, null];
                    i = Wr.O$.from(n.slice(0, 32)).toNumber();
                    if (n = n.slice(32), i > n.length)
                        return [2, null];
                    o = (0, Jr.ZN)(n.slice(0, i));
                    return [4, this.resolveName(o)];
                case 4: return [2, (_b.sent()) != e ? null : o];
            }
        }); })); };
        Rn.prototype.getAvatar = function (e) { return gn(this, void 0, void 0, (function () { var t, r_100, n_74, i_44, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = null;
                    if (!(0, vr.isHexString)(e)) return [3, 2];
                    r_100 = this.formatter.address(e), n_74 = r_100.substring(2).toLowerCase() + ".addr.reverse";
                    return [4, this._getResolver(n_74)];
                case 1:
                    i_44 = _a.sent();
                    if (!i_44)
                        return [2, null];
                    t = new In(this, i_44, "_", r_100);
                    return [3, 4];
                case 2: return [4, this.getResolver(e)];
                case 3:
                    if (t = _a.sent(), !t)
                        return [2, null];
                    _a.label = 4;
                case 4: return [4, t.getAvatar()];
                case 5:
                    r = _a.sent();
                    return [2, null == r ? null : r.url];
            }
        }); })); };
        Rn.prototype.perform = function (e, t) { return mn.throwError(e + " not implemented", Gr.Logger.errors.NOT_IMPLEMENTED, { operation: e }); };
        Rn.prototype._startEvent = function (e) { this.polling = this._events.filter((function (e) { return e.pollable(); })).length > 0; };
        Rn.prototype._stopEvent = function (e) { this.polling = this._events.filter((function (e) { return e.pollable(); })).length > 0; };
        Rn.prototype._addEventListener = function (e, t, r) { var n = new En(vn(e), t, r); return this._events.push(n), this._startEvent(n), this; };
        Rn.prototype.on = function (e, t) { return this._addEventListener(e, t, !1); };
        Rn.prototype.once = function (e, t) { return this._addEventListener(e, t, !0); };
        Rn.prototype.emit = function (e) {
            var _this = this;
            var t = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                t[_i - 1] = arguments[_i];
            }
            var r = !1, n = [], i = vn(e);
            return this._events = this._events.filter((function (e) { return e.tag !== i || (setTimeout((function () { e.listener.apply(_this, t); }), 0), r = !0, !e.once || (n.push(e), !1)); })), n.forEach((function (e) { _this._stopEvent(e); })), r;
        };
        Rn.prototype.listenerCount = function (e) { if (!e)
            return this._events.length; var t = vn(e); return this._events.filter((function (e) { return e.tag === t; })).length; };
        Rn.prototype.listeners = function (e) { if (null == e)
            return this._events.map((function (e) { return e.listener; })); var t = vn(e); return this._events.filter((function (e) { return e.tag === t; })).map((function (e) { return e.listener; })); };
        Rn.prototype.off = function (e, t) {
            var _this = this;
            if (null == t)
                return this.removeAllListeners(e);
            var r = [];
            var n = !1, i = vn(e);
            return this._events = this._events.filter((function (e) { return e.tag !== i || e.listener != t || !!n || (n = !0, r.push(e), !1); })), r.forEach((function (e) { _this._stopEvent(e); })), this;
        };
        Rn.prototype.removeAllListeners = function (e) {
            var _this = this;
            var t = [];
            if (null == e)
                t = this._events, this._events = [];
            else {
                var r_101 = vn(e);
                this._events = this._events.filter((function (e) { return e.tag !== r_101 || (t.push(e), !1); }));
            }
            return t.forEach((function (e) { _this._stopEvent(e); })), this;
        };
        return Rn;
    }(Yr.zt));
    var Cn = function (e, t, r, n) { return new (r || (r = Promise))((function (i, o) { function s(e) { try {
        c(n.next(e));
    }
    catch (e) {
        o(e);
    } } function a(e) { try {
        c(n.throw(e));
    }
    catch (e) {
        o(e);
    } } function c(e) { var t; e.done ? i(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(s, a); } c((n = n.apply(e, t || [])).next()); })); };
    var Mn = new Gr.Logger(qr), Ln = ["call", "estimateGas"];
    function Un(e, t, r) { if ("call" === e && t.code === Gr.Logger.errors.SERVER_ERROR) {
        var e_187 = t.error;
        if (e_187 && e_187.message.match("reverted") && (0, vr.isHexString)(e_187.data))
            return e_187.data;
        Mn.throwError("missing revert data in call exception", Gr.Logger.errors.CALL_EXCEPTION, { error: t, data: "0x" });
    } var n = t.message; t.code === Gr.Logger.errors.SERVER_ERROR && t.error && "string" == typeof t.error.message ? n = t.error.message : "string" == typeof t.body ? n = t.body : "string" == typeof t.responseText && (n = t.responseText), n = (n || "").toLowerCase(); var i = r.transaction || r.signedTransaction; throw n.match(/insufficient funds|base fee exceeds gas limit/) && Mn.throwError("insufficient funds for intrinsic transaction cost", Gr.Logger.errors.INSUFFICIENT_FUNDS, { error: t, method: e, transaction: i }), n.match(/nonce too low/) && Mn.throwError("nonce has already been used", Gr.Logger.errors.NONCE_EXPIRED, { error: t, method: e, transaction: i }), n.match(/replacement transaction underpriced/) && Mn.throwError("replacement fee too low", Gr.Logger.errors.REPLACEMENT_UNDERPRICED, { error: t, method: e, transaction: i }), n.match(/only replay-protected/) && Mn.throwError("legacy pre-eip-155 transactions not supported", Gr.Logger.errors.UNSUPPORTED_OPERATION, { error: t, method: e, transaction: i }), Ln.indexOf(e) >= 0 && n.match(/gas required exceeds allowance|always failing transaction|execution reverted/) && Mn.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Gr.Logger.errors.UNPREDICTABLE_GAS_LIMIT, { error: t, method: e, transaction: i }), t; }
    function Dn(e) { return new Promise((function (t) { setTimeout(t, e); })); }
    function Fn(e) { if (e.error) {
        var t_129 = new Error(e.error.message);
        throw t_129.code = e.error.code, t_129.data = e.error.data, t_129;
    } return e.result; }
    function jn(e) { return e ? e.toLowerCase() : e; }
    var Hn = {};
    var Vn = (function (_super) {
        __extends(Vn, _super);
        function Vn(e, t, r) {
            var _newTarget = this.constructor;
            var _this = this;
            if (Mn.checkNew(_newTarget, Vn), _this = _super.call(this) || this, e !== Hn)
                throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
            (0, zr.defineReadOnly)(_this, "provider", t), null == r && (r = 0), "string" == typeof r ? ((0, zr.defineReadOnly)(_this, "_address", _this.provider.formatter.address(r)), (0, zr.defineReadOnly)(_this, "_index", null)) : "number" == typeof r ? ((0, zr.defineReadOnly)(_this, "_index", r), (0, zr.defineReadOnly)(_this, "_address", null)) : Mn.throwArgumentError("invalid address or index", "addressOrIndex", r);
            return _this;
        }
        Vn.prototype.connect = function (e) { return Mn.throwError("cannot alter JSON-RPC Signer connection", Gr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "connect" }); };
        Vn.prototype.connectUnchecked = function () { return new zn(Hn, this.provider, this._address || this._index); };
        Vn.prototype.getAddress = function () {
            var _this = this;
            return this._address ? Promise.resolve(this._address) : this.provider.send("eth_accounts", []).then((function (e) { return (e.length <= _this._index && Mn.throwError("unknown account #" + _this._index, Gr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "getAddress" }), _this.provider.formatter.address(e[_this._index])); }));
        };
        Vn.prototype.sendUncheckedTransaction = function (e) {
            var _this = this;
            e = (0, zr.shallowCopy)(e);
            var t = this.getAddress().then((function (e) { return (e && (e = e.toLowerCase()), e); }));
            if (null == e.gasLimit) {
                var r_102 = (0, zr.shallowCopy)(e);
                r_102.from = t, e.gasLimit = this.provider.estimateGas(r_102);
            }
            return null != e.to && (e.to = Promise.resolve(e.to).then((function (e) { return Cn(_this, void 0, void 0, (function () { var t; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (null == e)
                            return [2, null];
                        return [4, this.provider.resolveName(e)];
                    case 1:
                        t = _a.sent();
                        return [2, (null == t && Mn.throwArgumentError("provided ENS name resolves to null", "tx.to", e), t)];
                }
            }); })); }))), (0, zr.resolveProperties)({ tx: (0, zr.resolveProperties)(e), sender: t }).then((function (_a) {
                var t = _a.tx, r = _a.sender;
                null != t.from ? t.from.toLowerCase() !== r && Mn.throwArgumentError("from address mismatch", "transaction", e) : t.from = r;
                var n = _this.provider.constructor.hexlifyTransaction(t, { from: !0 });
                return _this.provider.send("eth_sendTransaction", [n]).then((function (e) { return e; }), (function (e) { return Un("sendTransaction", e, n); }));
            }));
        };
        Vn.prototype.signTransaction = function (e) { return Mn.throwError("signing transactions is unsupported", Gr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "signTransaction" }); };
        Vn.prototype.sendTransaction = function (e) { return Cn(this, void 0, void 0, (function () {
            var t, r, e_188;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval)];
                    case 1:
                        t = _a.sent();
                        return [4, this.sendUncheckedTransaction(e)];
                    case 2:
                        r = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4, (0, Xr.poll)((function () { return Cn(_this, void 0, void 0, (function () { var e; return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.provider.getTransaction(r)];
                                    case 1:
                                        e = _a.sent();
                                        if (null !== e)
                                            return [2, this.provider._wrapTransaction(e, r, t)];
                                        return [2];
                                }
                            }); })); }), { oncePoll: this.provider })];
                    case 4: return [2, _a.sent()];
                    case 5:
                        e_188 = _a.sent();
                        throw e_188.transactionHash = r, e_188;
                    case 6: return [2];
                }
            });
        })); };
        Vn.prototype.signMessage = function (e) { return Cn(this, void 0, void 0, (function () { var t, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = "string" == typeof e ? (0, Jr.Y0)(e) : e;
                    return [4, this.getAddress()];
                case 1:
                    r = _a.sent();
                    return [4, this.provider.send("personal_sign", [(0, vr.hexlify)(t), r.toLowerCase()])];
                case 2: return [2, _a.sent()];
            }
        }); })); };
        Vn.prototype._legacySignMessage = function (e) { return Cn(this, void 0, void 0, (function () { var t, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = "string" == typeof e ? (0, Jr.Y0)(e) : e;
                    return [4, this.getAddress()];
                case 1:
                    r = _a.sent();
                    return [4, this.provider.send("eth_sign", [r.toLowerCase(), (0, vr.hexlify)(t)])];
                case 2: return [2, _a.sent()];
            }
        }); })); };
        Vn.prototype._signTypedData = function (e, t, r) { return Cn(this, void 0, void 0, (function () {
            var n, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, $r.E.resolveNames(e, t, r, (function (e) { return _this.provider.resolveName(e); }))];
                    case 1:
                        n = _a.sent();
                        return [4, this.getAddress()];
                    case 2:
                        i = _a.sent();
                        return [4, this.provider.send("eth_signTypedData_v4", [i.toLowerCase(), JSON.stringify($r.E.getPayload(n.domain, t, n.value))])];
                    case 3: return [2, _a.sent()];
                }
            });
        })); };
        Vn.prototype.unlock = function (e) { return Cn(this, void 0, void 0, (function () { var t, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = this.provider;
                    return [4, this.getAddress()];
                case 1:
                    r = _a.sent();
                    return [2, t.send("personal_unlockAccount", [r.toLowerCase(), e, null])];
            }
        }); })); };
        return Vn;
    }(Kr.E));
    var zn = (function (_super) {
        __extends(zn, _super);
        function zn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        zn.prototype.sendTransaction = function (e) {
            var _this = this;
            return this.sendUncheckedTransaction(e).then((function (e) { return ({ hash: e, nonce: null, gasLimit: null, gasPrice: null, data: null, value: null, chainId: null, confirmations: 0, from: null, wait: function (t) { return _this.provider.waitForTransaction(e, t); } }); }));
        };
        return zn;
    }(Vn));
    var Gn = { chainId: !0, data: !0, gasLimit: !0, gasPrice: !0, nonce: !0, to: !0, value: !0, type: !0, accessList: !0, maxFeePerGas: !0, maxPriorityFeePerGas: !0 };
    var qn = (function (_super) {
        __extends(qn, _super);
        function qn(e, t) {
            var _newTarget = this.constructor;
            var _this = this;
            Mn.checkNew(_newTarget, qn);
            var r = t;
            null == r && (r = new Promise((function (e, t) { setTimeout((function () { _this.detectNetwork().then((function (t) { e(t); }), (function (e) { t(e); })); }), 0); }))), _this = _super.call(this, r) || this, e || (e = (0, zr.getStatic)(_this.constructor, "defaultUrl")()), "string" == typeof e ? (0, zr.defineReadOnly)(_this, "connection", Object.freeze({ url: e })) : (0, zr.defineReadOnly)(_this, "connection", Object.freeze((0, zr.shallowCopy)(e))), _this._nextId = 42;
            return _this;
        }
        Object.defineProperty(qn.prototype, "_cache", {
            get: function () { return null == this._eventLoopCache && (this._eventLoopCache = {}), this._eventLoopCache; },
            enumerable: false,
            configurable: true
        });
        qn.defaultUrl = function () { return "http://localhost:8545"; };
        qn.prototype.detectNetwork = function () {
            var _this = this;
            return this._cache.detectNetwork || (this._cache.detectNetwork = this._uncachedDetectNetwork(), setTimeout((function () { _this._cache.detectNetwork = null; }), 0)), this._cache.detectNetwork;
        };
        qn.prototype._uncachedDetectNetwork = function () { return Cn(this, void 0, void 0, (function () { var e, t_130, e_189, t_131; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Dn(0)];
                case 1:
                    _a.sent();
                    e = null;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 9]);
                    return [4, this.send("eth_chainId", [])];
                case 3:
                    e = _a.sent();
                    return [3, 9];
                case 4:
                    t_130 = _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4, this.send("net_version", [])];
                case 6:
                    e = _a.sent();
                    return [3, 8];
                case 7:
                    e_189 = _a.sent();
                    return [3, 8];
                case 8: return [3, 9];
                case 9:
                    if (null != e) {
                        t_131 = (0, zr.getStatic)(this.constructor, "getNetwork");
                        try {
                            return [2, t_131(Wr.O$.from(e).toNumber())];
                        }
                        catch (t) {
                            return [2, Mn.throwError("could not detect network", Gr.Logger.errors.NETWORK_ERROR, { chainId: e, event: "invalidNetwork", serverError: t })];
                        }
                    }
                    return [2, Mn.throwError("could not detect network", Gr.Logger.errors.NETWORK_ERROR, { event: "noNetwork" })];
            }
        }); })); };
        qn.prototype.getSigner = function (e) { return new Vn(Hn, this, e); };
        qn.prototype.getUncheckedSigner = function (e) { return this.getSigner(e).connectUnchecked(); };
        qn.prototype.listAccounts = function () {
            var _this = this;
            return this.send("eth_accounts", []).then((function (e) { return e.map((function (e) { return _this.formatter.address(e); })); }));
        };
        qn.prototype.send = function (e, t) {
            var _this = this;
            var r = { method: e, params: t, id: this._nextId++, jsonrpc: "2.0" };
            this.emit("debug", { action: "request", request: (0, zr.deepCopy)(r), provider: this });
            var n = ["eth_chainId", "eth_blockNumber"].indexOf(e) >= 0;
            if (n && this._cache[e])
                return this._cache[e];
            var i = (0, Xr.fetchJson)(this.connection, JSON.stringify(r), Fn).then((function (e) { return (_this.emit("debug", { action: "response", request: r, response: e, provider: _this }), e); }), (function (e) { throw _this.emit("debug", { action: "response", error: e, request: r, provider: _this }), e; }));
            return n && (this._cache[e] = i, setTimeout((function () { _this._cache[e] = null; }), 0)), i;
        };
        qn.prototype.prepareRequest = function (e, t) { switch (e) {
            case "getBlockNumber": return ["eth_blockNumber", []];
            case "getGasPrice": return ["eth_gasPrice", []];
            case "getBalance": return ["eth_getBalance", [jn(t.address), t.blockTag]];
            case "getTransactionCount": return ["eth_getTransactionCount", [jn(t.address), t.blockTag]];
            case "getCode": return ["eth_getCode", [jn(t.address), t.blockTag]];
            case "getStorageAt": return ["eth_getStorageAt", [jn(t.address), t.position, t.blockTag]];
            case "sendTransaction": return ["eth_sendRawTransaction", [t.signedTransaction]];
            case "getBlock": return t.blockTag ? ["eth_getBlockByNumber", [t.blockTag, !!t.includeTransactions]] : t.blockHash ? ["eth_getBlockByHash", [t.blockHash, !!t.includeTransactions]] : null;
            case "getTransaction": return ["eth_getTransactionByHash", [t.transactionHash]];
            case "getTransactionReceipt": return ["eth_getTransactionReceipt", [t.transactionHash]];
            case "call": return ["eth_call", [(0, zr.getStatic)(this.constructor, "hexlifyTransaction")(t.transaction, { from: !0 }), t.blockTag]];
            case "estimateGas": return ["eth_estimateGas", [(0, zr.getStatic)(this.constructor, "hexlifyTransaction")(t.transaction, { from: !0 })]];
            case "getLogs": return t.filter && null != t.filter.address && (t.filter.address = jn(t.filter.address)), ["eth_getLogs", [t.filter]];
        } return null; };
        qn.prototype.perform = function (e, t) { return Cn(this, void 0, void 0, (function () { var e_190, r_104, r, r_103; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!("call" === e || "estimateGas" === e)) return [3, 2];
                    e_190 = t.transaction;
                    if (!(e_190 && null != e_190.type && Wr.O$.from(e_190.type).isZero() && null == e_190.maxFeePerGas && null == e_190.maxPriorityFeePerGas)) return [3, 2];
                    return [4, this.getFeeData()];
                case 1:
                    r_104 = _a.sent();
                    null == r_104.maxFeePerGas && null == r_104.maxPriorityFeePerGas && ((t = (0, zr.shallowCopy)(t)).transaction = (0, zr.shallowCopy)(e_190), delete t.transaction.type);
                    _a.label = 2;
                case 2:
                    r = this.prepareRequest(e, t);
                    null == r && Mn.throwError(e + " not implemented", Gr.Logger.errors.NOT_IMPLEMENTED, { operation: e });
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4, this.send(r[0], r[1])];
                case 4: return [2, _a.sent()];
                case 5:
                    r_103 = _a.sent();
                    return [2, Un(e, r_103, t)];
                case 6: return [2];
            }
        }); })); };
        qn.prototype._startEvent = function (e) { "pending" === e.tag && this._startPending(), _super.prototype._startEvent.call(this, e); };
        qn.prototype._startPending = function () { if (null != this._pendingFilter)
            return; var e = this, t = this.send("eth_newPendingTransactionFilter", []); this._pendingFilter = t, t.then((function (r) { return function n() { e.send("eth_getFilterChanges", [r]).then((function (r) { if (e._pendingFilter != t)
            return null; var n = Promise.resolve(); return r.forEach((function (t) { e._emitted["t:" + t.toLowerCase()] = "pending", n = n.then((function () { return e.getTransaction(t).then((function (t) { return e.emit("pending", t), null; })); })); })), n.then((function () { return Dn(1e3); })); })).then((function () { if (e._pendingFilter == t)
            return setTimeout((function () { n(); }), 0), null; e.send("eth_uninstallFilter", [r]); })).catch((function (e) { })); }(), r; })).catch((function (e) { })); };
        qn.prototype._stopEvent = function (e) { "pending" === e.tag && 0 === this.listenerCount("pending") && (this._pendingFilter = null), _super.prototype._stopEvent.call(this, e); };
        qn.hexlifyTransaction = function (e, t) { var r = (0, zr.shallowCopy)(Gn); if (t)
            for (var e_191 in t)
                t[e_191] && (r[e_191] = !0); (0, zr.checkProperties)(e, r); var n = {}; return ["gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach((function (t) { if (null == e[t])
            return; var r = (0, vr.hexValue)(e[t]); "gasLimit" === t && (t = "gas"), n[t] = r; })), ["from", "to", "data"].forEach((function (t) { null != e[t] && (n[t] = (0, vr.hexlify)(e[t])); })), e.accessList && (n.accessList = (0, Zr.accessListify)(e.accessList)), n; };
        return qn;
    }(Rn));
    var Kn = new Gr.Logger(qr);
    var Wn = 1;
    function $n(e, t) { var r = "Web3LegacyFetcher"; return function (e, n) {
        var _this = this;
        var i = { method: e, params: n, id: Wn++, jsonrpc: "2.0" };
        return new Promise((function (e, n) { _this.emit("debug", { action: "request", fetcher: r, request: (0, zr.deepCopy)(i), provider: _this }), t(i, (function (t, o) { if (t)
            return _this.emit("debug", { action: "response", fetcher: r, error: t, request: i, provider: _this }), n(t); if (_this.emit("debug", { action: "response", fetcher: r, request: i, response: o, provider: _this }), o.error) {
            var e_192 = new Error(o.error.message);
            return e_192.code = o.error.code, e_192.data = o.error.data, n(e_192);
        } e(o.result); })); }));
    }; }
    var Jn = (function (_super) {
        __extends(Jn, _super);
        function Jn(e, t) {
            var _newTarget = this.constructor;
            var _this = this;
            Kn.checkNew(_newTarget, Jn), null == e && Kn.throwArgumentError("missing provider", "provider", e);
            var r = null, n = null, i = null;
            "function" == typeof e ? (r = "unknown:", n = e) : (r = e.host || e.path || "", !r && e.isMetaMask && (r = "metamask"), i = e, e.request ? ("" === r && (r = "eip-1193:"), n = function (e) { return function (t, r) {
                var _this = this;
                null == r && (r = []);
                var n = { method: t, params: r };
                return this.emit("debug", { action: "request", fetcher: "Eip1193Fetcher", request: (0, zr.deepCopy)(n), provider: this }), e.request(n).then((function (e) { return (_this.emit("debug", { action: "response", fetcher: "Eip1193Fetcher", request: n, response: e, provider: _this }), e); }), (function (e) { throw _this.emit("debug", { action: "response", fetcher: "Eip1193Fetcher", request: n, error: e, provider: _this }), e; }));
            }; }(e)) : e.sendAsync ? n = $n(0, e.sendAsync.bind(e)) : e.send ? n = $n(0, e.send.bind(e)) : Kn.throwArgumentError("unsupported provider", "provider", e), r || (r = "unknown:")), _this = _super.call(this, r, t) || this, (0, zr.defineReadOnly)(_this, "jsonRpcFetchFunc", n), (0, zr.defineReadOnly)(_this, "provider", i);
            return _this;
        }
        Jn.prototype.send = function (e, t) { return this.jsonRpcFetchFunc(e, t); };
        return Jn;
    }(qn));
    var Zn = r(6371);
    var Xn = new (r(6266).ec)("secp256k1"), Yn = r(1094);
    var Qn = (function () {
        function Qn() {
        }
        Qn.sign = function (e, t) { var r = Xn.keyFromPrivate(t.getPrivateAsHexString(), "hex"), n = Yn.keccak256(i(e)); return r.sign(n).toDER("hex"); };
        Qn.verify = function (e, t, r) { return Qn.verifyArrayBuf(i(e), t, r); };
        Qn.verifyArrayBuf = function (e, t, r) { var n = Xn.keyFromPublic(r.getPublicKeyAsHexStr(), "hex"), i = Yn.keccak256(e); return n.verify(i, t); };
        Qn.signMessageWithBrowserWallet = function (e) {
            return __awaiter(this, void 0, void 0, function () { var t; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Qn.connectMetamaskAndGetAddress()];
                    case 1:
                        _a.sent();
                        t = new Jn(window.ethereum).getSigner();
                        return [4, t.signMessage(e)];
                    case 2: return [2, _a.sent()];
                }
            }); });
        };
        Qn.recoverPublicKeyFromMessageSignature = function (e, t) {
            return __awaiter(this, void 0, void 0, function () { var r, n; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = jr.r(e), n = vr.arrayify(r);
                        return [4, Hr.recoverPublicKey(n, t)];
                    case 1: return [2, _a.sent()];
                }
            }); });
        };
        Qn.recoverPublicKeyFromTypedMessageSignature = function (e, t) { var r, n; try {
            var t_132 = e.message.payload;
            e.message.payload = Vr.id(t_132).substr(2);
            var n_75 = e.types;
            delete n_75.EIP712Domain, r = Zn._TypedDataEncoder.hash(e.domain, n_75, e.message), e.message.payload = t_132;
        }
        catch (e) {
            throw new Error("Cant sign data, possibly wrong format. " + e);
        } try {
            n = (0, Zn.recoverPublicKey)(o(r.substr(2)), t);
        }
        catch (e) {
            throw new Error("Cant recoverPublicKey. " + e);
        } return n; };
        Qn.signEIP712WithBrowserWallet = function (e, t, r, n, i) {
            if (i === void 0) { i = null; }
            return __awaiter(this, void 0, void 0, function () { var o_22, s_19, a_17, c_10, u_6, f_4, l_1, e_193; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (o_22 = i ? new Fr.Wallet("0x" + i.getPrivateAsHexString()) : new Jn(window.ethereum).getSigner(), !o_22)
                            throw new Error("Active Wallet required");
                        s_19 = { name: e, version: Qn.Eip712Data.PROTOCOL_VERSION }, a_17 = {};
                        a_17[n] = r;
                        c_10 = Object.assign({}, t);
                        c_10.payload = Yn.keccak256(c_10.payload);
                        return [4, o_22._signTypedData(s_19, a_17, c_10)];
                    case 1:
                        u_6 = _a.sent(), f_4 = { types: { EIP712Domain: Qn.Eip712domainTypes }, primaryType: n, message: t, domain: s_19 };
                        f_4.types[n] = a_17[n];
                        l_1 = { signatureInHex: u_6, jsonSigned: JSON.stringify(f_4) };
                        return [2, JSON.stringify(l_1)];
                    case 2:
                        e_193 = _a.sent();
                        return [2, (S(1, "Cant sign eip712 data. Error: " + e_193), "")];
                    case 3: return [2];
                }
            }); });
        };
        Qn.connectMetamaskAndGetAddress = function () {
            return __awaiter(this, void 0, void 0, function () { var e; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window.ethereum)
                            throw new Error("Please install metamask before.");
                        return [4, window.ethereum.request({ method: "eth_requestAccounts" })];
                    case 1:
                        e = _a.sent();
                        if (!e || !e.length)
                            throw new Error("Active Wallet required");
                        return [2, e[0]];
                }
            }); });
        };
        Qn.getChainIdFromSignature = function (e) { var t = Number("0x" + e.substr(-2)); return 27 == t || 28 == t ? 0 : t - 35 >> 1; };
        Qn.convertToPersonalEthMessage = function (e) { return m(this.ethereumPrefix + e.length + e); };
        return Qn;
    }());
    Qn.ethereumPrefix = "Ethereum Signed Message:\n", Qn.OID_ECDSA_PUBLICKEY = "1.2.840.10045.2.1", Qn.Eip712Data = { PROTOCOL_VERSION: "0.1" }, Qn.Eip712domainTypes = [{ name: "name", type: "string" }, { name: "version", type: "string" }];
    var ei = (function () {
        function ei() {
        }
        ei.validateTimestamp = function (e, t, r) { return !(e > t + r || e < t - r); };
        ei.isAddress = function (e) { return null !== e.toLowerCase().match(/^0x[a-f0-9]{40}$/i) || (S(1, "Wrong Ethereum Address"), !1); };
        ei.isNullOrAddress = function (e) { return null == e || this.isAddress(e); };
        return ei;
    }());
    ei.ADDRESS_LENGTH_IN_BYTES = 42;
    var ti = (function () {
        function ti() {
            this.DEFAULT_NONCE_TIME_LIMIT_MS = 12e5;
        }
        ti.makeNonce = function (e, t, r, n) {
            if (e === void 0) { e = ""; }
            if (r === void 0) { r = new Uint8Array(0); }
            if (n === void 0) { n = 0; }
            return __awaiter(this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = e;
                        if (_a) return [3, 2];
                        return [4, Qn.connectMetamaskAndGetAddress()];
                    case 1:
                        _a = (e = _b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a, !ei.isAddress(e))
                            throw new Error("Address is not valid");
                        return [2, (e = e.toUpperCase(), n || (n = Date.now()), h([Uint8Array.from(m(e)), A(t), w(n), r]))];
                }
            }); });
        };
        ti.prototype.validateNonce = function (e, t, r, n, i, o) {
            if (o === void 0) { o = new Uint8Array(0); }
            return ti.validateAddress(e, t) ? this.validateReceiverIdentifier(e, r) ? this.validateTimestamp(e, n, i) ? this.validateOtherData(e, o) ? this.validateOtherData(e, o) : (S(1, "otherData check failed"), !1) : (S(1, "timestamp check failed"), !1) : (S(1, "validateReceiverIdentifier check failed"), !1) : (S(1, "validateAddress check failed for " + t), !1);
        };
        ti.prototype.validateTimestamp = function (e, t, r) { var n = ti.getTimestamp(e), i = new Ir(n); return i.setValidity(r - t), i.validateAgainstExpiration(r); };
        ti.validateAddress = function (e, t) { var r = d(e.slice(ti.senderAddressIndexStart, ti.senderAddressIndexStop)); return t.toUpperCase() === r.toUpperCase() || (S(1, "nonceAddress = " + r), !1); };
        ti.prototype.validateReceiverIdentifier = function (e, t) { return b(A(t)).toLowerCase() === b(e.slice(ti.receiverIdentifierIndexStart, ti.receiverIdentifierIndexStop)).toLowerCase(); };
        ti.prototype.validateOtherData = function (e, t) { return b(t).toLowerCase() === b(e.slice(ti.otherDataIndexStart, ti.otherDataIndexStart + t.length)).toLowerCase(); };
        ti.getTimestamp = function (e) { var t = u(e.slice(ti.timestampIndexStart, ti.timestampIndexStop)); if (t > BigInt(Number.MAX_SAFE_INTEGER))
            throw new Error("timestamp value bigger than MAX_SAFE_INTEGER"); return Number(t); };
        return ti;
    }());
    ti.LONG_BYTES = 8, ti.senderAddressIndexStart = 0, ti.senderAddressIndexStop = ei.ADDRESS_LENGTH_IN_BYTES, ti.receiverIdentifierIndexStart = ti.senderAddressIndexStop, ti.receiverIdentifierIndexStop = ti.receiverIdentifierIndexStart + 32, ti.timestampIndexStart = ti.receiverIdentifierIndexStop, ti.timestampIndexStop = ti.timestampIndexStart + ti.LONG_BYTES, ti.otherDataIndexStart = ti.timestampIndexStop;
    var ri = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var ni = (function () {
        function ni() {
        }
        return ni;
    }());
    ri([Nt({ type: Je.Any })], ni.prototype, "signedToken", void 0), ri([Nt({ type: Je.Any })], ni.prototype, "attestation", void 0), ri([Nt({ type: Je.Any })], ni.prototype, "proof", void 0);
    var ii = (function () {
        function ii() {
            this.XMLConfig = Mr;
        }
        ii.stringIsAValidUrl = function (e) { var t; try {
            t = new URL(e);
        }
        catch (e) {
            return S(1, "cant construct url. Error:", e), !1;
        } return "http:" === t.protocol || "https:" === t.protocol; };
        ii.prototype.setDomainAndTimout = function (e) { if (!ii.stringIsAValidUrl(e))
            throw new Error("wrong domain"); this.domain = e; };
        ii.prototype.setDomain = function (e) { if (!ii.stringIsAValidUrl(e))
            throw new Error("wrong domain"); this.domain = e; };
        ii.prototype.getDomain = function () { return this.domain; };
        ii.prototype.validateRequest = function (e) { try {
            var t_133 = JSON.parse(e), r_105 = JSON.parse(t_133.jsonSigned), n_76 = r_105.domain, i_45 = r_105.message;
            return this.retrieveAttestedObject(i_45), this.validateDomain(n_76);
        }
        catch (e) {
            return S(1, "Validate error!", e), !1;
        } };
        ii.prototype.validateDomain = function (e) { return e.name.toLowerCase() !== this.domain.toLowerCase() ? (S(1, "Domain name is not valid"), !1) : e.version === Qn.Eip712Data.PROTOCOL_VERSION || (S(1, "Protocol version is wrong"), !1); };
        ii.prototype.retrieveAttestedObject = function (e) { var t = e.payload, r = _r.publicFromBase64(Mr.base64attestorPubKey), n = _r.publicFromBase64(Mr.base64senderPublicKey); return Cr.fromBytes(o(t), ni, r, rr, n); };
        ii.prototype.verifySignature = function (e, t) { var r = JSON.parse(e), n = r.signatureInHex, i = JSON.parse(r.jsonSigned), o = Qn.recoverPublicKeyFromTypedMessageSignature(i, n), s = _r.fromPublicHex(o.substr(2)); return t.toLowerCase() !== i.message.address.toLowerCase() ? (S(1, "message.address is not equal pkAddress"), !1) : t.toLowerCase() === s.getAddress().toLowerCase() || (S(1, "Recovered address is not equal pkAddress"), !1); };
        return ii;
    }());
    var oi = (function (_super) {
        __extends(oi, _super);
        function oi() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return oi;
    }(ii));
    var si = (function (_super) {
        __extends(si, _super);
        function si(e, t) {
            if (e === void 0) { e = null; }
            if (t === void 0) { t = Ir.DEFAULT_TIME_LIMIT_MS; }
            var _this = this;
            _this = _super.call(this) || this, _this.Eip712UserDataTypes = [{ name: "payload", type: "string" }, { name: "description", type: "string" }, { name: "timestamp", type: "string" }, { name: "identifier", type: "string" }], _this.Eip712UserDataPrimaryName = "AttestationRequest", _this.Eip712UserDataDescription = "Linking Ethereum address to phone or email", _this.userKey = e, _this.acceptableTimeLimit = t;
            return _this;
        }
        si.prototype.addData = function (e, t, r, n) {
            if (t === void 0) { t = Ir.DEFAULT_TIME_LIMIT_MS; }
            return __awaiter(this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.setDomain(e), this.attestationRequest = n, this.acceptableTimeLimit = t;
                        _a = this;
                        return [4, this.makeToken(r)];
                    case 1:
                        _a.jsonEncoding = _b.sent();
                        try {
                            this.fillJsonData(this.jsonEncoding);
                        }
                        catch (e) {
                            return [2, (S(1, e), !1)];
                        }
                        return [2];
                }
            }); });
        };
        si.prototype.fillJsonData = function (e) { if (!e)
            throw new Error("Empty json"); this.jsonEncoding = e; var t = JSON.parse(e), r = t.signatureInHex, n = JSON.parse(t.jsonSigned); this.eip712DomainData = n.domain, this.data = n.message; try {
            var e_194 = Qn.recoverPublicKeyFromTypedMessageSignature(n, r);
            this.requestorKeys = _r.fromPublicHex(e_194.substr(2)), S(3, "restored address: " + this.requestorKeys.getAddress());
        }
        catch (e) {
            var t_134 = "Recover Address failed with error:" + e;
            throw S(1, t_134, e), new Error(t_134);
        } this.attestationRequest || (this.attestationRequest = Dr.fromBytes(g(this.data.payload))), this.constructorCheck(); };
        si.prototype.constructorCheck = function () { if (!this.verify())
            throw new Error("Could not verify Eip712 AttestationRequest"); S(3, "Eip712 Attestaion Request verify OK"); };
        si.prototype.makeToken = function (e) {
            return __awaiter(this, void 0, void 0, function () { var t, _a, r, n, i; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.userKey) return [3, 1];
                        _a = this.userKey.getAddress();
                        return [3, 3];
                    case 1: return [4, Qn.connectMetamaskAndGetAddress()];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        t = _a;
                        r = ti.getTimestamp(this.attestationRequest.getPok().getNonce()), n = new Ir(r).getTimeAsString(), i = { payload: s(this.attestationRequest.getDerEncoding()), description: this.Eip712UserDataDescription, timestamp: n, identifier: e };
                        return [4, Qn.signEIP712WithBrowserWallet(this.domain, i, this.Eip712UserDataTypes, this.Eip712UserDataPrimaryName, this.userKey)];
                    case 4: return [2, _b.sent()];
                }
            }); });
        };
        si.prototype.setAcceptableTimeLimit = function (e) { this.acceptableTimeLimit = e; };
        si.prototype.getJsonEncoding = function () { return this.jsonEncoding; };
        si.prototype.verify = function () { return !!this.attestationRequest.verify() && this.verifyDomainData(); };
        si.prototype.verifyDomainData = function () { return this.eip712DomainData.name.toLowerCase() === this.getDomain().toLowerCase() && this.eip712DomainData.version === Qn.Eip712Data.PROTOCOL_VERSION; };
        si.prototype.checkValidity = function () { if (this.data.description !== this.Eip712UserDataDescription)
            return S(2, "Description is not correct. :" + this.data.description + " !== " + this.Eip712UserDataDescription), !1; var e = new Ir(this.data.timestamp); return e.setValidity(this.acceptableTimeLimit), e.validateTimestamp() ? !!(new ti).validateNonce(this.getPok().getNonce(), this.requestorKeys.getAddress(), this.domain, Ir.stringTimestampToLong(this.data.timestamp) - this.acceptableTimeLimit, Ir.stringTimestampToLong(this.data.timestamp) + this.acceptableTimeLimit) || (S(1, "nonce is not correct"), !1) : (S(1, "timestamp is not correct. timestamp = " + this.data.timestamp + ", acceptableTimeLimit = " + this.acceptableTimeLimit), !1); };
        si.prototype.getIdentifier = function () { return this.data.identifier; };
        si.prototype.getType = function () { return this.attestationRequest.getType(); };
        si.prototype.getPok = function () { return this.attestationRequest.getPok(); };
        si.prototype.getUserPublicKey = function () { return this.requestorKeys; };
        return si;
    }(oi));
    var ai = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var ci = (function () {
        function ci() {
        }
        return ci;
    }());
    ai([Nt({ type: br })], ci.prototype, "attestation", void 0), ai([Nt({ type: Je.Integer })], ci.prototype, "type", void 0), ai([Nt({ type: Ot })], ci.prototype, "proof", void 0), ai([Nt({ type: lr })], ci.prototype, "sessionKey", void 0);
    var ui = (function () {
        function ui() {
        }
        ui.fromData = function (e, t, r, n) { var i = new this; return i.attestation = e, i.type = t, i.pok = r, i.sessionPublicKey = n, i.encoding = i.makeEncoding(e, t, r, n), i.constructorCheck(), i; };
        ui.fromBytes = function (e, t) { var r, n = new this; try {
            r = Pt.parse(v(e), ci);
        }
        catch (e) {
            throw new Error("Cant parse UseAttestationASN. " + e);
        } try {
            n.attestation = Rr.fromASNType(r.attestation, t), n.type = r.type, n.pok = Dt.fromASNType(r.proof), n.sessionPublicKey = _r.publicFromSubjectPublicKeyValue(r.sessionKey);
        }
        catch (e) {
            throw new Error("Cant decode internal data. " + e);
        } return n.constructorCheck(), n; };
        ui.prototype.constructorCheck = function () { if (!this.verify())
            throw new Error("The use attestation object is not valid"); };
        ui.prototype.makeEncoding = function (e, t, r, n) { var i = e.getDerEncoding() + Lt.encode("INTEGER", t) + r.getDerEncoding() + n.getAsnDerPublic(); return Lt.encode("SEQUENCE_30", i); };
        ui.prototype.getAttestation = function () { return this.attestation; };
        ui.prototype.getType = function () { return this.type; };
        ui.prototype.getPok = function () { return this.pok; };
        ui.prototype.getSessionPublicKey = function () { return this.sessionPublicKey; };
        ui.prototype.getDerEncoding = function () { return this.encoding; };
        ui.prototype.verify = function () { return this.attestation.verify() && (new zt).verifyFullProof(this.pok); };
        ui.prototype.checkValidity = function () { return this.attestation.checkValidity(); };
        return ui;
    }());
    var fi = (function (_super) {
        __extends(fi, _super);
        function fi(e, t) {
            if (e === void 0) { e = null; }
            if (t === void 0) { t = Ir.DEFAULT_TOKEN_TIME_LIMIT; }
            var _this = this;
            _this = _super.call(this) || this, _this.PLACEHOLDER_CHAIN_ID = 0, _this.Eip712PrimaryName = "AttestationUsage", _this.Eip712Description = 'Prove that the "identifier" is the identifier hidden in attestation contained in"payload".', _this.Eip712UserTypes = [{ name: "description", type: "string" }, { name: "identifier", type: "string" }, { name: "payload", type: "string" }, { name: "timestamp", type: "string" }, { name: "expirationTime", type: "string" }], _this.maxTokenValidityInMs = t, _this.userKey = e;
            return _this;
        }
        fi.prototype.addData = function (e, t, r) {
            return __awaiter(this, void 0, void 0, function () { var _a, e_195; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.setDomain(e), this.useAttestation = r;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4, this.makeToken(t, r)];
                    case 2:
                        _a.jsonEncoding = _b.sent();
                        return [3, 4];
                    case 3:
                        e_195 = _b.sent();
                        throw S(1, e_195), new Error("Could not encode object. " + e_195);
                    case 4:
                        try {
                            this.fillJsonData(this.jsonEncoding);
                        }
                        catch (e) {
                            return [2, (S(1, e), !1)];
                        }
                        this.constructorCheck();
                        return [2];
                }
            }); });
        };
        fi.prototype.fillJsonData = function (e, t) {
            if (t === void 0) { t = null; }
            if (!e)
                throw new Error("Empty json");
            null !== t && (this.attestorKey = t), this.jsonEncoding = e;
            var r = JSON.parse(e), n = r.signatureInHex, i = JSON.parse(r.jsonSigned);
            this.eip712DomainData = i.domain, this.data = i.message;
            try {
                var e_196 = Qn.recoverPublicKeyFromTypedMessageSignature(i, n);
                this.requestorKeys = _r.fromPublicHex(e_196.substr(2)), S(3, "restored address: " + this.requestorKeys.getAddress());
            }
            catch (e) {
                var t_135 = "Recover Address failed with error:" + e;
                throw S(1, t_135, e), new Error(t_135);
            }
            if (!this.useAttestation)
                try {
                    S(4, b(g(this.data.payload))), this.useAttestation = ui.fromBytes(g(this.data.payload), this.attestorKey);
                }
                catch (e) {
                    var t_136 = "Failed to read UseAttestation. " + e;
                    throw S(2, t_136, e), new Error(t_136);
                }
            this.constructorCheck();
        };
        fi.prototype.constructorCheck = function () { if (!this.verify())
            throw new Error("Could not verify Eip712 use attestation"); };
        fi.prototype.makeToken = function (e, t) {
            return __awaiter(this, void 0, void 0, function () { var _a, r; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.userKey;
                        if (_a) return [3, 2];
                        return [4, Qn.connectMetamaskAndGetAddress()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        _a;
                        r = { payload: s(t.getDerEncoding()), description: this.Eip712Description, timestamp: (new Ir).getTimeAsString(), identifier: e, expirationTime: new Ir(Date.now() + this.maxTokenValidityInMs).getTimeAsString() };
                        return [4, Qn.signEIP712WithBrowserWallet(this.domain, r, this.Eip712UserTypes, this.Eip712PrimaryName, this.userKey)];
                    case 3: return [2, _b.sent()];
                }
            }); });
        };
        fi.prototype.proofLinking = function () { var e = (new zt).mapToCurveMultiplier(this.getType(), this.getIdentifier()); return !!N.decodeFromUint8(this.getAttestation().getUnsignedAttestation().getCommitment(), x).subtract(Ht.multiplyDA(e)).equals(this.getPok().getRiddle()) || (S(1, "candidateRiddle.equals(this.getPok().getRiddle()) error"), !1); };
        fi.prototype.getPok = function () { return this.useAttestation.getPok(); };
        fi.prototype.getType = function () { return this.useAttestation.type; };
        fi.prototype.getIdentifier = function () { return this.data.identifier; };
        fi.prototype.getAttestation = function () { return this.useAttestation.getAttestation(); };
        fi.prototype.getJsonEncoding = function () { return this.jsonEncoding; };
        fi.prototype.checkTokenValidity = function () { var e = Ir.stringTimestampToLong(this.data.expirationTime) - this.maxTokenValidityInMs - 2 * Ir.ALLOWED_ROUNDING, t = Ir.stringTimestampToLong(this.data.expirationTime); if (!this.useAttestation.checkValidity())
            return S(1, "useAttestation.checkValidity failed"), !1; if (this.data.description != this.Eip712Description)
            return S(1, "wrong description: \"" + this.data.description + "\", must be \"" + this.Eip712Description + "\""), !1; var r = new Ir(this.data.timestamp); return r.setValidity(this.maxTokenValidityInMs), r.validateAgainstExpiration(Ir.stringTimestampToLong(this.data.expirationTime)) ? this.requestorKeys.getAddress().toLowerCase() !== this.useAttestation.getAttestation().getUnsignedAttestation().getAddress().toLowerCase() ? (S(1, "wrong address"), !1) : (new ti).validateNonce(this.useAttestation.getPok().getNonce(), this.useAttestation.getAttestation().getUnsignedAttestation().getAddress(), this.domain, e, t) ? !!this.proofLinking() || (S(1, "wrong proofLinking"), !1) : (S(1, "wrong Nonce"), !1) : (S(1, "verify timestamp failed.\n" + this.data.timestamp + "\n" + this.maxTokenValidityInMs + "\n" + this.data.expirationTime + "\n" + Ir.stringTimestampToLong(this.data.expirationTime) + "\n"), !1); };
        fi.prototype.verify = function () { return !!this.useAttestation.verify(); };
        fi.prototype.getSessionPublicKey = function () { return this.useAttestation.getSessionPublicKey(); };
        return fi;
    }(oi));
    var li = function (e, t, r, n) { var i, o = arguments.length, s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, n);
    else
        for (var a = e.length - 1; a >= 0; a--)
            (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s); return o > 3 && s && Object.defineProperty(t, r, s), s; };
    var hi = (function () {
        function hi() {
        }
        return hi;
    }());
    li([Nt({ type: Je.Integer })], hi.prototype, "type", void 0), li([Nt({ type: Ot })], hi.prototype, "proof", void 0), li([Nt({ type: lr })], hi.prototype, "sessionKey", void 0);
    var di = (function () {
        function di() {
        }
        di.fromData = function (e, t, r) { var n = new this; if (n.type = e, n.pok = t, n.sessionPublicKey = r, !n.verify())
            throw new Error("Could not verify the proof"); return n; };
        di.fromBytes = function (e) { var t, r = new this; try {
            t = Pt.parse(v(e), hi), r.type = t.type, r.sessionPublicKey = _r.publicFromSubjectPublicKeyValue(t.sessionKey);
        }
        catch (e) {
            throw new Error("Cant parse AttestationRequest Identifier");
        } try {
            var e_197 = new Uint8Array(t.proof.riddle), n_77 = new Uint8Array(t.proof.challengePoint), i_46 = new Uint8Array(t.proof.responseValue), o_23 = new Uint8Array(t.proof.nonce), s_20 = N.decodeFromHex(b(e_197), x), a_18 = u(n_77), c_11 = N.decodeFromHex(b(i_46), x);
            r.pok = Dt.fromData(s_20, c_11, a_18, o_23);
        }
        catch (e) {
            throw new Error("Cant create FullProofOfExponent");
        } if (!r.verify())
            throw new Error("Could not verify the proof"); return S(3, "proof OK"), r; };
        di.prototype.verify = function () { return !!(new zt).verifyFullProof(this.pok); };
        di.prototype.getDerEncoding = function () { var e = Lt.encode("INTEGER", this.type) + this.pok.getDerEncoding() + this.sessionPublicKey.getAsnDerPublic(); return Lt.encode("SEQUENCE_30", e); };
        di.prototype.getPok = function () { return this.pok; };
        di.prototype.getType = function () { return this.type; };
        di.prototype.getSessionPublicKey = function () { return this.sessionPublicKey; };
        return di;
    }());
    var pi = (function (_super) {
        __extends(pi, _super);
        function pi(e, t, r) {
            if (e === void 0) { e = null; }
            if (t === void 0) { t = Ir.DEFAULT_TIME_LIMIT_MS; }
            if (r === void 0) { r = Ir.DEFAULT_TOKEN_TIME_LIMIT; }
            var _this = this;
            _this = _super.call(this) || this, _this.Eip712UserDataTypes = [{ name: "payload", type: "string" }, { name: "description", type: "string" }, { name: "identifier", type: "string" }, { name: "timestamp", type: "string" }, { name: "expirationTime", type: "string" }], _this.Eip712UserDataPrimaryName = "AttestationRequestWUsage", _this.Eip712UserDataDescription = 'Prove that the "identifier" is the identifier hidden in attestation contained in"payload" and use this to authorize usage of local, temporary keys.', _this.userKey = e, _this.acceptableTimeLimit = t, _this.maxTokenValidityInMs = r;
            return _this;
        }
        pi.prototype.fromData = function (e, t, r, n, i, o) {
            if (t === void 0) { t = Ir.DEFAULT_TIME_LIMIT_MS; }
            if (r === void 0) { r = Ir.DEFAULT_TOKEN_TIME_LIMIT; }
            if (o === void 0) { o = null; }
            return __awaiter(this, void 0, void 0, function () { var _a, e_198; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.setDomain(e), o && (this.userKey = o);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.acceptableTimeLimit = t, this.maxTokenValidityInMs = r, this.attestationRequestWithUsage = i;
                        _a = this;
                        return [4, this.makeToken(n, i)];
                    case 2:
                        _a.jsonEncoding = _b.sent();
                        return [3, 4];
                    case 3:
                        e_198 = _b.sent();
                        throw S(1, e_198), new Error("Could not encode object");
                    case 4:
                        try {
                            this.fillJsonData(this.jsonEncoding);
                        }
                        catch (e) {
                            throw new Error("Could not decode object");
                        }
                        return [2];
                }
            }); });
        };
        pi.prototype.Eip712AttestationRequestWithUsage = function (e, t, r, n) { try {
            this.acceptableTimeLimit = t, this.maxTokenValidityInMs = r, this.jsonEncoding = n, this.fillJsonData(this.jsonEncoding);
        }
        catch (e) {
            throw S(1, e), new Error("Could not decode object");
        } };
        pi.prototype.fillJsonData = function (e) { if (!e)
            throw new Error("Empty json"); this.jsonEncoding = e; var t = JSON.parse(e), r = t.signatureInHex, n = JSON.parse(t.jsonSigned); this.eip712DomainData = n.domain, this.data = n.message; try {
            var e_199 = Qn.recoverPublicKeyFromTypedMessageSignature(n, r);
            this.userPublicKey = _r.fromPublicHex(e_199.substr(2)), S(3, "Eip712 withUsage restored address: " + this.userPublicKey.getAddress());
        }
        catch (e) {
            var t_137 = "Recover Address failed with error:" + e;
            throw S(1, t_137, e), new Error(t_137);
        } this.attestationRequestWithUsage || (this.attestationRequestWithUsage = di.fromBytes(g(this.data.payload))), this.constructorCheck(); };
        pi.prototype.constructorCheck = function () { if (!this.verify())
            throw new Error("Could not verify Eip712 use attestation"); };
        pi.prototype.makeToken = function (e, t) {
            return __awaiter(this, void 0, void 0, function () { var _a, r, n, i; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.userKey;
                        if (_a) return [3, 2];
                        return [4, Qn.connectMetamaskAndGetAddress()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        _a;
                        r = (new Ir).getTimeAsString(), n = new Ir(Date.now() + this.maxTokenValidityInMs).getTimeAsString(), i = { payload: s(t.getDerEncoding()), description: this.Eip712UserDataDescription, timestamp: r, identifier: e, expirationTime: n };
                        return [4, Qn.signEIP712WithBrowserWallet(this.domain, i, this.Eip712UserDataTypes, this.Eip712UserDataPrimaryName, this.userKey)];
                    case 3: return [2, _b.sent()];
                }
            }); });
        };
        pi.prototype.getIdentifier = function () { return this.data.identifier; };
        pi.prototype.getUserPublicKey = function () { return this.userPublicKey; };
        pi.prototype.getPok = function () { return this.attestationRequestWithUsage.getPok(); };
        pi.prototype.getType = function () { return this.attestationRequestWithUsage.getType(); };
        pi.prototype.getSessionPublicKey = function () { return this.attestationRequestWithUsage.getSessionPublicKey(); };
        pi.prototype.getJsonEncoding = function () { return this.jsonEncoding; };
        pi.prototype.checkValidity = function () { return !!this.testNonceAndDescription(this.acceptableTimeLimit); };
        pi.prototype.checkTokenValidity = function () { var e = new Ir(this.data.timestamp); return e.setValidity(this.maxTokenValidityInMs), e.validateAgainstExpiration(Ir.stringTimestampToLong(this.data.expirationTime)) ? !!this.testNonceAndDescription(this.maxTokenValidityInMs) : (S(1, "time.validateAgainstExpiration filed"), !1); };
        pi.prototype.testNonceAndDescription = function (e) { if (!e)
            throw new Error("timeLimit required"); var t = Ir.stringTimestampToLong(this.data.timestamp) - e, r = Ir.stringTimestampToLong(this.data.timestamp) + e; return !!(new ti).validateNonce(this.attestationRequestWithUsage.getPok().getNonce(), this.userPublicKey.getAddress(), this.domain, t, r) && this.data.description === this.Eip712UserDataDescription; };
        pi.prototype.verify = function () { return !!this.attestationRequestWithUsage.verify(); };
        return pi;
    }(oi));
    var gi;
    gi = "object" == typeof crypto && crypto.subtle ? crypto.subtle : r(1085).webcrypto.subtle;
    var mi = (function () {
        function mi(e) {
            if (e === void 0) { e = !1; }
            this.negotiator = e;
            var t = Mr;
            this.base64senderPublicKey = t.base64senderPublicKey, this.base64attestorPubKey = t.base64attestorPubKey, this.webDomain = t.webDomain;
        }
        mi.prototype.getAuthenticationBlob = function (e, t) { this.signedTokenBlob = e.ticketBlob, this.magicLink = e.magicLink, this.email = e.email, this.signedTokenSecret = e.ticketSecret, this.attestationOrigin = e.attestationOrigin, this.authResultCallback = t, this.getIdentifierAttestation(); };
        mi.prototype.getIdentifierAttestation = function () { S(3, "getIdentifierAttestation. create iframe with " + this.attestationOrigin), this.attachPostMessageListener(this.postMessageAttestationListener.bind(this)); var e = document.createElement("iframe"); this.iframe = e, e.src = this.attestationOrigin, e.style.width = "800px", e.style.height = "700px", e.style.maxWidth = "100%", e.style.background = "#fff"; var t = document.createElement("div"); this.iframeWrap = t, t.setAttribute("style", "width:100%;min-height: 100vh; position: fixed; align-items: center; justify-content: center;display: none;top: 0; left: 0; background: #fffa"), t.appendChild(e), document.body.appendChild(t); };
        mi.prototype.getUseTicket = function (e, t, r, n, i, o) {
            return __awaiter(this, void 0, void 0, function () { var s, a, e_200, r_106, n_78; return __generator(this, function (_a) {
                try {
                    if (s = rr.fromBase64(r, { 6: _r.publicFromBase64(o) }), !s.checkValidity())
                        throw S(1, "Could not validate ticket"), new Error("Validation failed");
                    if (!s.verify())
                        throw S(1, "Could not verify ticket"), new Error("Verification failed");
                    S(2, "ticked valid (signature OK)");
                }
                catch (e) {
                    throw S(2, "getUseTicket: ticket validation failed", e), new Error("getUseTicket: ticked validation failed");
                }
                try {
                    e_200 = _r.publicFromBase64(i);
                    if (a = Rr.fromBytes(g(n), e_200), !a.checkValidity())
                        throw S(1, "Could not validate attestation"), new Error("Validation failed");
                    if (!a.verify())
                        throw S(1, "Could not verify attestation"), new Error("Verification failed");
                    S(3, "attestaion valid");
                }
                catch (e) {
                    throw S(1, "getUseTicket: attestation validation failed"), S(2, e), new Error("getUseTicket: attestation validation failed");
                }
                try {
                    r_106 = new Cr;
                    r_106.create(s, a, BigInt(t), BigInt(e));
                    n_78 = r_106.getDerEncoding();
                    return [2, (S(3, n_78), n_78)];
                }
                catch (e) {
                    throw S(1, "getUseTicket: redeem failed"), S(2, e), new Error("getUseTicket: redeem failed");
                }
                return [2];
            }); });
        };
        mi.prototype.postMessageAttestationListener = function (e) {
            var _this = this;
            var t = new URL(this.attestationOrigin);
            if (e.origin === t.origin) {
                if (S(3, "postMessageAttestationListener event (Authenticator)", e), void 0 !== e.data.ready && !0 === e.data.ready) {
                    var e_201 = { force: !1 };
                    return this.magicLink && (e_201.magicLink = this.magicLink), this.email && (e_201.email = this.email), void this.iframe.contentWindow.postMessage(e_201, this.attestationOrigin);
                }
                if (void 0 !== e.data.display && (!0 === e.data.display ? (this.iframeWrap.style.display = "flex", this.negotiator && this.negotiator.commandDisplayIframe()) : (e.data.error && (S(1, "Error received from the iframe: " + e.data.error), this.authResultCallback(null, e.data.error)), this.iframeWrap.style.display = "none", this.negotiator && this.negotiator.commandHideIframe())), e.data.hasOwnProperty("attestation") && e.data.hasOwnProperty("requestSecret")) {
                    this.iframeWrap.remove(), this.attestationBlob = e.data.attestation, this.attestationSecret = e.data.requestSecret, S(3, "attestation data received."), S(3, this.attestationBlob), S(3, this.attestationSecret), S(3, this.base64attestorPubKey);
                    try {
                        this.getUseTicket(this.signedTokenSecret, this.attestationSecret, this.signedTokenBlob, this.attestationBlob, this.base64attestorPubKey, this.base64senderPublicKey).then((function (e) { e ? (S(3, "this.authResultCallback( useToken ): "), _this.authResultCallback(e)) : (S(3, "this.authResultCallback( empty ): "), _this.authResultCallback(e)); }));
                    }
                    catch (e) {
                        S(1, "UseDevconTicket. Something went wrong. " + e), this.authResultCallback(!1);
                    }
                }
            }
        };
        mi.prototype.attachPostMessageListener = function (e) { window.addEventListener ? window.addEventListener("message", (function (t) { e(t); }), !1) : window.attachEvent("onmessage", (function (t) { e(t); })); };
        mi.requestAttest = function (e, t, r, n, i) {
            if (i === void 0) { i = null; }
            return __awaiter(this, void 0, void 0, function () { var o, s, e_202, a, c, u, f; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        s = new zt;
                        if (!i) return [3, 1];
                        o = i.getAddress();
                        return [3, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, Qn.connectMetamaskAndGetAddress()];
                    case 2:
                        o = _a.sent();
                        return [3, 4];
                    case 3:
                        e_202 = _a.sent();
                        return [2, (S(1, "Cant find user Ethereum Address. Please check Metamask. " + e_202), void S(2, e_202))];
                    case 4: return [4, ti.makeNonce(o, r)];
                    case 5:
                        a = _a.sent();
                        S(3, "nonce = " + b(a));
                        c = s.computeAttestationProof(n, a), u = Dr.fromData(s.getType(t), c), f = new si(i);
                        return [4, f.addData(r, 2e4, e, u)];
                    case 6: return [2, (_a.sent(), f.getJsonEncoding())];
                }
            }); });
        };
        mi.constructAttest = function (e, t, r, n, i) { var o, s, a, c = new zt; try {
            s = new si, s.setDomain(i), s.fillJsonData(n), mi.checkAttestRequestVerifiability(s), mi.checkAttestRequestValidity(s);
        }
        catch (e) {
            S(2, "Failed to fill attestation data from json. " + e + "\nRestores as an Eip712AttestationRequestWithUsage object instead");
            try {
                s = new pi, s.setDomain(i), s.fillJsonData(n), mi.checkAttestRequestVerifiability(s), mi.checkAttestRequestValidity(s);
            }
            catch (e) {
                var t_138 = "Failed to parse Eip712AttestationRequestWithUsage. " + e;
                throw S(2, t_138), S(2, e), new Error(t_138);
            }
        } a = c.makeCommitmentFromHiding(s.getIdentifier(), s.getType(), s.getPok().getRiddle()), o = new Tr, o.fromCommitment(a, s.getUserPublicKey()), o.setIssuer("CN=" + t), o.setSerialNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)); var u = Date.now(); return o.setNotValidBefore(u), o.setNotValidAfter(u + r), Rr.fromData(o, e).getDerEncoding(); };
        mi.useAttest = function (e, t, r, n, i, o, s, a) {
            if (s === void 0) { s = null; }
            if (a === void 0) { a = null; }
            return __awaiter(this, void 0, void 0, function () { var c, f, l, h, d, _a, p, m, e_204, t_139, e_203; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        c = g(e);
                        l = Rr.fromBytes(c, r), h = u(g(t).slice(4)), d = new zt;
                        if (!a) return [3, 1];
                        _a = a.getAddress();
                        return [3, 3];
                    case 1: return [4, Qn.connectMetamaskAndGetAddress()];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        f = _a;
                        return [4, ti.makeNonce(f, o)];
                    case 4:
                        p = _b.sent(), m = d.computeAttestationProof(h, p);
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        e_204 = ui.fromData(l, d.getType(i), m, s), t_139 = new fi(a);
                        return [4, t_139.addData(o, n, e_204)];
                    case 6: return [2, (_b.sent(), t_139.getJsonEncoding())];
                    case 7:
                        e_203 = _b.sent();
                        S(1, e_203);
                        return [3, 8];
                    case 8: return [2];
                }
            }); });
        };
        mi.checkAttestRequestVerifiability = function (e) { if (!e.verify())
            throw S(2, "Could not verify attestation signing request"), new Error("Verification failed"); };
        mi.checkAttestRequestValidity = function (e) { if (!e.checkValidity())
            throw S(3, "Could not validate attestation signing request"), new Error("Validation failed"); };
        mi.checkUsageVerifiability = function (e) { if (!e.verify())
            throw S(1, "Could not verify usage request"), new Error("Verification failed"); };
        mi.checkUsageValidity = function (e) { if (!e.checkTokenValidity())
            throw S(1, "Could not validate usage request"), new Error("Validation failed"); };
        mi.verifyUsage = function (e, t, r, n, i) {
            return __awaiter(this, void 0, void 0, function () { var o, r_107, r_108, e_205; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            r_107 = new fi;
                            r_107.setDomain(n), r_107.fillJsonData(e, t), mi.checkUsageVerifiability(r_107), mi.checkUsageValidity(r_107), o = r_107.getSessionPublicKey();
                        }
                        catch (t) {
                            S(2, "Eip712AttestationUsage failed. " + t + ". Lets try to verify Eip712AttestationRequestWithUsage");
                            r_108 = new pi;
                            r_108.setDomain(n), r_108.fillJsonData(e), mi.checkUsageVerifiability(r_108), mi.checkUsageValidity(r_108), o = r_108.getSessionPublicKey();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, o.verifyStringWithSubtle(_r.anySignatureToRawUint8(i), r)];
                    case 2:
                        if (!(_a.sent()))
                            throw S(2, "Could not verify message signature"), new Error("Signature verification failed");
                        return [2, "SUCCESSFULLY validated usage request!"];
                    case 3:
                        e_205 = _a.sent();
                        S(1, "Cant verify session with subtle. " + e_205), S(2, e_205);
                        return [3, 4];
                    case 4: return [2];
                }
            }); });
        };
        mi.requestAttestAndUsage = function (e, t, r, n, i, o) {
            return __awaiter(this, void 0, void 0, function () { var s_21, a_19, _a, c_12, f_5, l_2, h_2, d_2, e_206; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        a_19 = u(g(i));
                        if (!e) return [3, 1];
                        _a = e.getAddress();
                        return [3, 3];
                    case 1: return [4, Qn.connectMetamaskAndGetAddress()];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        s_21 = _a;
                        return [4, ti.makeNonce(s_21, n, new Uint8Array(0), Date.now())];
                    case 4:
                        c_12 = _b.sent(), f_5 = new zt, l_2 = f_5.computeAttestationProof(a_19, c_12), h_2 = di.fromData(f_5.getType(r), l_2, o), d_2 = new pi(e);
                        return [4, d_2.fromData(n, void 0, void 0, t, h_2)];
                    case 5: return [2, (_b.sent(), d_2.getJsonEncoding())];
                    case 6:
                        e_206 = _b.sent();
                        S(1, "requestAttestAndUsage error. " + e_206), S(2, e_206);
                        return [3, 7];
                    case 7: return [2];
                }
            }); });
        };
        return mi;
    }());
    window.Authenticator = mi, window.Attest = si, window.AttestationCrypto = zt;
})(); })();
//# sourceMappingURL=authenticator.js.map