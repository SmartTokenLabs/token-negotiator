"use strict";
(() => { var e = { 3900: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { AbiCoder: () => re, ConstructorFragment: () => w, ErrorFragment: () => k, EventFragment: () => y, FormatTypes: () => d, Fragment: () => b, FunctionFragment: () => E, Indexed: () => ue, Interface: () => de, LogDescription: () => se, ParamType: () => g, TransactionDescription: () => ce, checkResultErrors: () => O, defaultAbiCoder: () => ne });
        var n = r(2593), i = r(3587), o = r(711);
        const a = "abi/5.4.1", s = new o.Logger(a), c = {};
        let l = { calldata: !0, memory: !0, storage: !0 }, u = { calldata: !0, memory: !0 };
        function f(e, t) { if ("bytes" === e || "string" === e) {
            if (l[t])
                return !0;
        }
        else if ("address" === e) {
            if ("payable" === t)
                return !0;
        }
        else if ((e.indexOf("[") >= 0 || "tuple" === e) && u[t])
            return !0; return (l[t] || "payable" === t) && s.throwArgumentError("invalid modifier", "name", t), !1; }
        function h(e, t) { for (let r in t)
            (0, i.defineReadOnly)(e, r, t[r]); }
        const d = Object.freeze({ sighash: "sighash", minimal: "minimal", full: "full", json: "json" }), p = new RegExp(/^(.*)\[([0-9]*)\]$/);
        class g {
            constructor(e, t) { e !== c && s.throwError("use fromString", o.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new ParamType()" }), h(this, t); let r = this.type.match(p); h(this, r ? { arrayLength: parseInt(r[2] || "-1"), arrayChildren: g.fromObject({ type: r[1], components: this.components }), baseType: "array" } : { arrayLength: null, arrayChildren: null, baseType: null != this.components ? "tuple" : this.type }), this._isParamType = !0, Object.freeze(this); }
            format(e) { if (e || (e = d.sighash), d[e] || s.throwArgumentError("invalid format type", "format", e), e === d.json) {
                let t = { type: "tuple" === this.baseType ? "tuple" : this.type, name: this.name || void 0 };
                return "boolean" == typeof this.indexed && (t.indexed = this.indexed), this.components && (t.components = this.components.map((t => JSON.parse(t.format(e))))), JSON.stringify(t);
            } let t = ""; return "array" === this.baseType ? (t += this.arrayChildren.format(e), t += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]") : "tuple" === this.baseType ? (e !== d.sighash && (t += this.type), t += "(" + this.components.map((t => t.format(e))).join(e === d.full ? ", " : ",") + ")") : t += this.type, e !== d.sighash && (!0 === this.indexed && (t += " indexed"), e === d.full && this.name && (t += " " + this.name)), t; }
            static from(e, t) { return "string" == typeof e ? g.fromString(e, t) : g.fromObject(e); }
            static fromObject(e) { return g.isParamType(e) ? e : new g(c, { name: e.name || null, type: B(e.type), indexed: null == e.indexed ? null : !!e.indexed, components: e.components ? e.components.map(g.fromObject) : null }); }
            static fromString(e, t) { return r = function (e, t) { let r = e; function n(t) { s.throwArgumentError(`unexpected character at position ${t}`, "param", e); } function i(e) { let r = { type: "", name: "", parent: e, state: { allowType: !0 } }; return t && (r.indexed = !1), r; } e = e.replace(/\s/g, " "); let o = { type: "", name: "", state: { allowType: !0 } }, a = o; for (let r = 0; r < e.length; r++) {
                let o = e[r];
                switch (o) {
                    case "(":
                        a.state.allowType && "" === a.type ? a.type = "tuple" : a.state.allowParams || n(r), a.state.allowType = !1, a.type = B(a.type), a.components = [i(a)], a = a.components[0];
                        break;
                    case ")":
                        delete a.state, "indexed" === a.name && (t || n(r), a.indexed = !0, a.name = ""), f(a.type, a.name) && (a.name = ""), a.type = B(a.type);
                        let e = a;
                        a = a.parent, a || n(r), delete e.parent, a.state.allowParams = !1, a.state.allowName = !0, a.state.allowArray = !0;
                        break;
                    case ",":
                        delete a.state, "indexed" === a.name && (t || n(r), a.indexed = !0, a.name = ""), f(a.type, a.name) && (a.name = ""), a.type = B(a.type);
                        let s = i(a.parent);
                        a.parent.components.push(s), delete a.parent, a = s;
                        break;
                    case " ":
                        a.state.allowType && "" !== a.type && (a.type = B(a.type), delete a.state.allowType, a.state.allowName = !0, a.state.allowParams = !0), a.state.allowName && "" !== a.name && ("indexed" === a.name ? (t || n(r), a.indexed && n(r), a.indexed = !0, a.name = "") : f(a.type, a.name) ? a.name = "" : a.state.allowName = !1);
                        break;
                    case "[":
                        a.state.allowArray || n(r), a.type += o, a.state.allowArray = !1, a.state.allowName = !1, a.state.readArray = !0;
                        break;
                    case "]":
                        a.state.readArray || n(r), a.type += o, a.state.readArray = !1, a.state.allowArray = !0, a.state.allowName = !0;
                        break;
                    default: a.state.allowType ? (a.type += o, a.state.allowParams = !0, a.state.allowArray = !0) : a.state.allowName ? (a.name += o, delete a.state.allowArray) : a.state.readArray ? a.type += o : n(r);
                }
            } return a.parent && s.throwArgumentError("unexpected eof", "param", e), delete o.state, "indexed" === a.name ? (t || n(r.length - 7), a.indexed && n(r.length - 7), a.indexed = !0, a.name = "") : f(a.type, a.name) && (a.name = ""), o.type = B(o.type), o; }(e, !!t), g.fromObject({ name: r.name, type: r.type, indexed: r.indexed, components: r.components }); var r; }
            static isParamType(e) { return !(null == e || !e._isParamType); }
        }
        function m(e, t) { return function (e) { e = e.trim(); let t = [], r = "", n = 0; for (let i = 0; i < e.length; i++) {
            let o = e[i];
            "," === o && 0 === n ? (t.push(r), r = "") : (r += o, "(" === o ? n++ : ")" === o && (n--, -1 === n && s.throwArgumentError("unbalanced parenthesis", "value", e)));
        } return r && t.push(r), t; }(e).map((e => g.fromString(e, t))); }
        class b {
            constructor(e, t) { e !== c && s.throwError("use a static from method", o.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new Fragment()" }), h(this, t), this._isFragment = !0, Object.freeze(this); }
            static from(e) { return b.isFragment(e) ? e : "string" == typeof e ? b.fromString(e) : b.fromObject(e); }
            static fromObject(e) { if (b.isFragment(e))
                return e; switch (e.type) {
                case "function": return E.fromObject(e);
                case "event": return y.fromObject(e);
                case "constructor": return w.fromObject(e);
                case "error": return k.fromObject(e);
                case "fallback":
                case "receive": return null;
            } return s.throwArgumentError("invalid fragment object", "value", e); }
            static fromString(e) { return "event" === (e = (e = (e = e.replace(/\s/g, " ")).replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ")).trim()).split(" ")[0] ? y.fromString(e.substring(5).trim()) : "function" === e.split(" ")[0] ? E.fromString(e.substring(8).trim()) : "constructor" === e.split("(")[0].trim() ? w.fromString(e.trim()) : "error" === e.split(" ")[0] ? k.fromString(e.substring(5).trim()) : s.throwArgumentError("unsupported fragment", "value", e); }
            static isFragment(e) { return !(!e || !e._isFragment); }
        }
        class y extends b {
            format(e) { if (e || (e = d.sighash), d[e] || s.throwArgumentError("invalid format type", "format", e), e === d.json)
                return JSON.stringify({ type: "event", anonymous: this.anonymous, name: this.name, inputs: this.inputs.map((t => JSON.parse(t.format(e)))) }); let t = ""; return e !== d.sighash && (t += "event "), t += this.name + "(" + this.inputs.map((t => t.format(e))).join(e === d.full ? ", " : ",") + ") ", e !== d.sighash && this.anonymous && (t += "anonymous "), t.trim(); }
            static from(e) { return "string" == typeof e ? y.fromString(e) : y.fromObject(e); }
            static fromObject(e) { if (y.isEventFragment(e))
                return e; "event" !== e.type && s.throwArgumentError("invalid event object", "value", e); const t = { name: M(e.name), anonymous: e.anonymous, inputs: e.inputs ? e.inputs.map(g.fromObject) : [], type: "event" }; return new y(c, t); }
            static fromString(e) { let t = e.match(C); t || s.throwArgumentError("invalid event string", "value", e); let r = !1; return t[3].split(" ").forEach((e => { switch (e.trim()) {
                case "anonymous":
                    r = !0;
                    break;
                case "": break;
                default: s.warn("unknown modifier: " + e);
            } })), y.fromObject({ name: t[1].trim(), anonymous: r, inputs: m(t[2], !0), type: "event" }); }
            static isEventFragment(e) { return e && e._isFragment && "event" === e.type; }
        }
        function v(e, t) { t.gas = null; let r = e.split("@"); return 1 !== r.length ? (r.length > 2 && s.throwArgumentError("invalid human-readable ABI signature", "value", e), r[1].match(/^[0-9]+$/) || s.throwArgumentError("invalid human-readable ABI signature gas", "value", e), t.gas = n.O$.from(r[1]), r[0]) : e; }
        function A(e, t) { t.constant = !1, t.payable = !1, t.stateMutability = "nonpayable", e.split(" ").forEach((e => { switch (e.trim()) {
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
        function S(e) { let t = { constant: !1, payable: !0, stateMutability: "payable" }; return null != e.stateMutability ? (t.stateMutability = e.stateMutability, t.constant = "view" === t.stateMutability || "pure" === t.stateMutability, null != e.constant && !!e.constant !== t.constant && s.throwArgumentError("cannot have constant function with mutability " + t.stateMutability, "value", e), t.payable = "payable" === t.stateMutability, null != e.payable && !!e.payable !== t.payable && s.throwArgumentError("cannot have payable function with mutability " + t.stateMutability, "value", e)) : null != e.payable ? (t.payable = !!e.payable, null != e.constant || t.payable || "constructor" === e.type || s.throwArgumentError("unable to determine stateMutability", "value", e), t.constant = !!e.constant, t.constant ? t.stateMutability = "view" : t.stateMutability = t.payable ? "payable" : "nonpayable", t.payable && t.constant && s.throwArgumentError("cannot have constant payable function", "value", e)) : null != e.constant ? (t.constant = !!e.constant, t.payable = !t.constant, t.stateMutability = t.constant ? "view" : "payable") : "constructor" !== e.type && s.throwArgumentError("unable to determine stateMutability", "value", e), t; }
        class w extends b {
            format(e) { if (e || (e = d.sighash), d[e] || s.throwArgumentError("invalid format type", "format", e), e === d.json)
                return JSON.stringify({ type: "constructor", stateMutability: "nonpayable" !== this.stateMutability ? this.stateMutability : void 0, payable: this.payable, gas: this.gas ? this.gas.toNumber() : void 0, inputs: this.inputs.map((t => JSON.parse(t.format(e)))) }); e === d.sighash && s.throwError("cannot format a constructor for sighash", o.Logger.errors.UNSUPPORTED_OPERATION, { operation: "format(sighash)" }); let t = "constructor(" + this.inputs.map((t => t.format(e))).join(e === d.full ? ", " : ",") + ") "; return this.stateMutability && "nonpayable" !== this.stateMutability && (t += this.stateMutability + " "), t.trim(); }
            static from(e) { return "string" == typeof e ? w.fromString(e) : w.fromObject(e); }
            static fromObject(e) { if (w.isConstructorFragment(e))
                return e; "constructor" !== e.type && s.throwArgumentError("invalid constructor object", "value", e); let t = S(e); t.constant && s.throwArgumentError("constructor cannot be constant", "value", e); const r = { name: null, type: e.type, inputs: e.inputs ? e.inputs.map(g.fromObject) : [], payable: t.payable, stateMutability: t.stateMutability, gas: e.gas ? n.O$.from(e.gas) : null }; return new w(c, r); }
            static fromString(e) { let t = { type: "constructor" }, r = (e = v(e, t)).match(C); return r && "constructor" === r[1].trim() || s.throwArgumentError("invalid constructor string", "value", e), t.inputs = m(r[2].trim(), !1), A(r[3].trim(), t), w.fromObject(t); }
            static isConstructorFragment(e) { return e && e._isFragment && "constructor" === e.type; }
        }
        class E extends w {
            format(e) { if (e || (e = d.sighash), d[e] || s.throwArgumentError("invalid format type", "format", e), e === d.json)
                return JSON.stringify({ type: "function", name: this.name, constant: this.constant, stateMutability: "nonpayable" !== this.stateMutability ? this.stateMutability : void 0, payable: this.payable, gas: this.gas ? this.gas.toNumber() : void 0, inputs: this.inputs.map((t => JSON.parse(t.format(e)))), outputs: this.outputs.map((t => JSON.parse(t.format(e)))) }); let t = ""; return e !== d.sighash && (t += "function "), t += this.name + "(" + this.inputs.map((t => t.format(e))).join(e === d.full ? ", " : ",") + ") ", e !== d.sighash && (this.stateMutability ? "nonpayable" !== this.stateMutability && (t += this.stateMutability + " ") : this.constant && (t += "view "), this.outputs && this.outputs.length && (t += "returns (" + this.outputs.map((t => t.format(e))).join(", ") + ") "), null != this.gas && (t += "@" + this.gas.toString() + " ")), t.trim(); }
            static from(e) { return "string" == typeof e ? E.fromString(e) : E.fromObject(e); }
            static fromObject(e) { if (E.isFunctionFragment(e))
                return e; "function" !== e.type && s.throwArgumentError("invalid function object", "value", e); let t = S(e); const r = { type: e.type, name: M(e.name), constant: t.constant, inputs: e.inputs ? e.inputs.map(g.fromObject) : [], outputs: e.outputs ? e.outputs.map(g.fromObject) : [], payable: t.payable, stateMutability: t.stateMutability, gas: e.gas ? n.O$.from(e.gas) : null }; return new E(c, r); }
            static fromString(e) { let t = { type: "function" }, r = (e = v(e, t)).split(" returns "); r.length > 2 && s.throwArgumentError("invalid function string", "value", e); let n = r[0].match(C); if (n || s.throwArgumentError("invalid function signature", "value", e), t.name = n[1].trim(), t.name && M(t.name), t.inputs = m(n[2], !1), A(n[3].trim(), t), r.length > 1) {
                let n = r[1].match(C);
                "" == n[1].trim() && "" == n[3].trim() || s.throwArgumentError("unexpected tokens", "value", e), t.outputs = m(n[2], !1);
            }
            else
                t.outputs = []; return E.fromObject(t); }
            static isFunctionFragment(e) { return e && e._isFragment && "function" === e.type; }
        }
        function T(e) { const t = e.format(); return "Error(string)" !== t && "Panic(uint256)" !== t || s.throwArgumentError(`cannot specify user defined ${t} error`, "fragment", e), e; }
        class k extends b {
            format(e) { if (e || (e = d.sighash), d[e] || s.throwArgumentError("invalid format type", "format", e), e === d.json)
                return JSON.stringify({ type: "error", name: this.name, inputs: this.inputs.map((t => JSON.parse(t.format(e)))) }); let t = ""; return e !== d.sighash && (t += "error "), t += this.name + "(" + this.inputs.map((t => t.format(e))).join(e === d.full ? ", " : ",") + ") ", t.trim(); }
            static from(e) { return "string" == typeof e ? k.fromString(e) : k.fromObject(e); }
            static fromObject(e) { if (k.isErrorFragment(e))
                return e; "error" !== e.type && s.throwArgumentError("invalid error object", "value", e); const t = { type: e.type, name: M(e.name), inputs: e.inputs ? e.inputs.map(g.fromObject) : [] }; return T(new k(c, t)); }
            static fromString(e) { let t = { type: "error" }, r = e.match(C); return r || s.throwArgumentError("invalid error signature", "value", e), t.name = r[1].trim(), t.name && M(t.name), t.inputs = m(r[2], !1), T(k.fromObject(t)); }
            static isErrorFragment(e) { return e && e._isFragment && "error" === e.type; }
        }
        function B(e) { return e.match(/^uint($|[^1-9])/) ? e = "uint256" + e.substring(4) : e.match(/^int($|[^1-9])/) && (e = "int256" + e.substring(3)), e; }
        const P = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
        function M(e) { return e && e.match(P) || s.throwArgumentError(`invalid identifier "${e}"`, "value", e), e; }
        const C = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
        var L = r(3286);
        const F = new o.Logger(a);
        function O(e) { const t = [], r = function (e, n) { if (Array.isArray(n))
            for (let i in n) {
                const o = e.slice();
                o.push(i);
                try {
                    r(o, n[i]);
                }
                catch (e) {
                    t.push({ path: o, error: e });
                }
            } }; return r([], e), t; }
        class x {
            constructor(e, t, r, n) { this.name = e, this.type = t, this.localName = r, this.dynamic = n; }
            _throwError(e, t) { F.throwArgumentError(e, this.localName, t); }
        }
        class N {
            constructor(e) { (0, i.defineReadOnly)(this, "wordSize", e || 32), this._data = [], this._dataLength = 0, this._padding = new Uint8Array(e); }
            get data() { return (0, L.hexConcat)(this._data); }
            get length() { return this._dataLength; }
            _writeData(e) { return this._data.push(e), this._dataLength += e.length, e.length; }
            appendWriter(e) { return this._writeData((0, L.concat)(e._data)); }
            writeBytes(e) { let t = (0, L.arrayify)(e); const r = t.length % this.wordSize; return r && (t = (0, L.concat)([t, this._padding.slice(r)])), this._writeData(t); }
            _getValue(e) { let t = (0, L.arrayify)(n.O$.from(e)); return t.length > this.wordSize && F.throwError("value out-of-bounds", o.Logger.errors.BUFFER_OVERRUN, { length: this.wordSize, offset: t.length }), t.length % this.wordSize && (t = (0, L.concat)([this._padding.slice(t.length % this.wordSize), t])), t; }
            writeValue(e) { return this._writeData(this._getValue(e)); }
            writeUpdatableValue() { const e = this._data.length; return this._data.push(this._padding), this._dataLength += this.wordSize, t => { this._data[e] = this._getValue(t); }; }
        }
        class R {
            constructor(e, t, r, n) { (0, i.defineReadOnly)(this, "_data", (0, L.arrayify)(e)), (0, i.defineReadOnly)(this, "wordSize", t || 32), (0, i.defineReadOnly)(this, "_coerceFunc", r), (0, i.defineReadOnly)(this, "allowLoose", n), this._offset = 0; }
            get data() { return (0, L.hexlify)(this._data); }
            get consumed() { return this._offset; }
            static coerce(e, t) { let r = e.match("^u?int([0-9]+)$"); return r && parseInt(r[1]) <= 48 && (t = t.toNumber()), t; }
            coerce(e, t) { return this._coerceFunc ? this._coerceFunc(e, t) : R.coerce(e, t); }
            _peekBytes(e, t, r) { let n = Math.ceil(t / this.wordSize) * this.wordSize; return this._offset + n > this._data.length && (this.allowLoose && r && this._offset + t <= this._data.length ? n = t : F.throwError("data out-of-bounds", o.Logger.errors.BUFFER_OVERRUN, { length: this._data.length, offset: this._offset + n })), this._data.slice(this._offset, this._offset + n); }
            subReader(e) { return new R(this._data.slice(this._offset + e), this.wordSize, this._coerceFunc, this.allowLoose); }
            readBytes(e, t) { let r = this._peekBytes(0, e, !!t); return this._offset += r.length, r.slice(0, e); }
            readValue() { return n.O$.from(this.readBytes(this.wordSize)); }
        }
        var I = r(4594);
        class D extends x {
            constructor(e) { super("address", "address", e, !1); }
            defaultValue() { return "0x0000000000000000000000000000000000000000"; }
            encode(e, t) { try {
                t = (0, I.getAddress)(t);
            }
            catch (e) {
                this._throwError(e.message, t);
            } return e.writeValue(t); }
            decode(e) { return (0, I.getAddress)((0, L.hexZeroPad)(e.readValue().toHexString(), 20)); }
        }
        class J extends x {
            constructor(e) { super(e.name, e.type, void 0, e.dynamic), this.coder = e; }
            defaultValue() { return this.coder.defaultValue(); }
            encode(e, t) { return this.coder.encode(e, t); }
            decode(e) { return this.coder.decode(e); }
        }
        const _ = new o.Logger(a);
        function U(e, t, r) { let n = null; if (Array.isArray(r))
            n = r;
        else if (r && "object" == typeof r) {
            let e = {};
            n = t.map((t => { const n = t.localName; return n || _.throwError("cannot encode object for signature with missing names", o.Logger.errors.INVALID_ARGUMENT, { argument: "values", coder: t, value: r }), e[n] && _.throwError("cannot encode object for signature with duplicate names", o.Logger.errors.INVALID_ARGUMENT, { argument: "values", coder: t, value: r }), e[n] = !0, r[n]; }));
        }
        else
            _.throwArgumentError("invalid tuple value", "tuple", r); t.length !== n.length && _.throwArgumentError("types/value length mismatch", "tuple", r); let i = new N(e.wordSize), a = new N(e.wordSize), s = []; t.forEach(((e, t) => { let r = n[t]; if (e.dynamic) {
            let t = a.length;
            e.encode(a, r);
            let n = i.writeUpdatableValue();
            s.push((e => { n(e + t); }));
        }
        else
            e.encode(i, r); })), s.forEach((e => { e(i.length); })); let c = e.appendWriter(i); return c += e.appendWriter(a), c; }
        function H(e, t) { let r = [], n = e.subReader(0); t.forEach((t => { let i = null; if (t.dynamic) {
            let r = e.readValue(), a = n.subReader(r.toNumber());
            try {
                i = t.decode(a);
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
            } null != i && r.push(i); })); const i = t.reduce(((e, t) => { const r = t.localName; return r && (e[r] || (e[r] = 0), e[r]++), e; }), {}); t.forEach(((e, t) => { let n = e.localName; if (!n || 1 !== i[n])
            return; if ("length" === n && (n = "_length"), null != r[n])
            return; const o = r[t]; o instanceof Error ? Object.defineProperty(r, n, { enumerable: !0, get: () => { throw o; } }) : r[n] = o; })); for (let e = 0; e < r.length; e++) {
            const t = r[e];
            t instanceof Error && Object.defineProperty(r, e, { enumerable: !0, get: () => { throw t; } });
        } return Object.freeze(r); }
        class G extends x {
            constructor(e, t, r) { super("array", e.type + "[" + (t >= 0 ? t : "") + "]", r, -1 === t || e.dynamic), this.coder = e, this.length = t; }
            defaultValue() { const e = this.coder.defaultValue(), t = []; for (let r = 0; r < this.length; r++)
                t.push(e); return t; }
            encode(e, t) { Array.isArray(t) || this._throwError("expected array value", t); let r = this.length; -1 === r && (r = t.length, e.writeValue(t.length)), _.checkArgumentCount(t.length, r, "coder array" + (this.localName ? " " + this.localName : "")); let n = []; for (let e = 0; e < t.length; e++)
                n.push(this.coder); return U(e, n, t); }
            decode(e) { let t = this.length; -1 === t && (t = e.readValue().toNumber(), 32 * t > e._data.length && _.throwError("insufficient data length", o.Logger.errors.BUFFER_OVERRUN, { length: e._data.length, count: t })); let r = []; for (let e = 0; e < t; e++)
                r.push(new J(this.coder)); return e.coerce(this.name, H(e, r)); }
        }
        class j extends x {
            constructor(e) { super("bool", "bool", e, !1); }
            defaultValue() { return !1; }
            encode(e, t) { return e.writeValue(t ? 1 : 0); }
            decode(e) { return e.coerce(this.type, !e.readValue().isZero()); }
        }
        class X extends x {
            constructor(e, t) { super(e, e, t, !0); }
            defaultValue() { return "0x"; }
            encode(e, t) { t = (0, L.arrayify)(t); let r = e.writeValue(t.length); return r += e.writeBytes(t), r; }
            decode(e) { return e.readBytes(e.readValue().toNumber(), !0); }
        }
        class V extends X {
            constructor(e) { super("bytes", e); }
            decode(e) { return e.coerce(this.name, (0, L.hexlify)(super.decode(e))); }
        }
        class z extends x {
            constructor(e, t) { let r = "bytes" + String(e); super(r, r, t, !1), this.size = e; }
            defaultValue() { return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + 2 * this.size); }
            encode(e, t) { let r = (0, L.arrayify)(t); return r.length !== this.size && this._throwError("incorrect data length", t), e.writeBytes(r); }
            decode(e) { return e.coerce(this.name, (0, L.hexlify)(e.readBytes(this.size))); }
        }
        class Z extends x {
            constructor(e) { super("null", "", e, !1); }
            defaultValue() { return null; }
            encode(e, t) { return null != t && this._throwError("not null", t), e.writeBytes([]); }
            decode(e) { return e.readBytes(0), e.coerce(this.name, null); }
        }
        var K = r(1046);
        class q extends x {
            constructor(e, t, r) { const n = (t ? "int" : "uint") + 8 * e; super(n, n, r, !1), this.size = e, this.signed = t; }
            defaultValue() { return 0; }
            encode(e, t) { let r = n.O$.from(t), i = K.Bz.mask(8 * e.wordSize); if (this.signed) {
                let e = i.mask(8 * this.size - 1);
                (r.gt(e) || r.lt(e.add(K.fh).mul(K.tL))) && this._throwError("value out-of-bounds", t);
            }
            else
                (r.lt(K._Y) || r.gt(i.mask(8 * this.size))) && this._throwError("value out-of-bounds", t); return r = r.toTwos(8 * this.size).mask(8 * this.size), this.signed && (r = r.fromTwos(8 * this.size).toTwos(8 * e.wordSize)), e.writeValue(r); }
            decode(e) { let t = e.readValue().mask(8 * this.size); return this.signed && (t = t.fromTwos(8 * this.size)), e.coerce(this.name, t); }
        }
        var Q = r(4242);
        class W extends X {
            constructor(e) { super("string", e); }
            defaultValue() { return ""; }
            encode(e, t) { return super.encode(e, (0, Q.Y0)(t)); }
            decode(e) { return (0, Q.ZN)(super.decode(e)); }
        }
        class Y extends x {
            constructor(e, t) { let r = !1; const n = []; e.forEach((e => { e.dynamic && (r = !0), n.push(e.type); })), super("tuple", "tuple(" + n.join(",") + ")", t, r), this.coders = e; }
            defaultValue() { const e = []; this.coders.forEach((t => { e.push(t.defaultValue()); })); const t = this.coders.reduce(((e, t) => { const r = t.localName; return r && (e[r] || (e[r] = 0), e[r]++), e; }), {}); return this.coders.forEach(((r, n) => { let i = r.localName; i && 1 === t[i] && ("length" === i && (i = "_length"), null == e[i] && (e[i] = e[n])); })), Object.freeze(e); }
            encode(e, t) { return U(e, this.coders, t); }
            decode(e) { return e.coerce(this.name, H(e, this.coders)); }
        }
        const $ = new o.Logger(a), ee = new RegExp(/^bytes([0-9]*)$/), te = new RegExp(/^(u?int)([0-9]*)$/);
        class re {
            constructor(e) { $.checkNew(new.target, re), (0, i.defineReadOnly)(this, "coerceFunc", e || null); }
            _getCoder(e) { switch (e.baseType) {
                case "address": return new D(e.name);
                case "bool": return new j(e.name);
                case "string": return new W(e.name);
                case "bytes": return new V(e.name);
                case "array": return new G(this._getCoder(e.arrayChildren), e.arrayLength, e.name);
                case "tuple": return new Y((e.components || []).map((e => this._getCoder(e))), e.name);
                case "": return new Z(e.name);
            } let t = e.type.match(te); if (t) {
                let r = parseInt(t[2] || "256");
                return (0 === r || r > 256 || r % 8 != 0) && $.throwArgumentError("invalid " + t[1] + " bit length", "param", e), new q(r / 8, "int" === t[1], e.name);
            } if (t = e.type.match(ee), t) {
                let r = parseInt(t[1]);
                return (0 === r || r > 32) && $.throwArgumentError("invalid bytes length", "param", e), new z(r, e.name);
            } return $.throwArgumentError("invalid type", "type", e.type); }
            _getWordSize() { return 32; }
            _getReader(e, t) { return new R(e, this._getWordSize(), this.coerceFunc, t); }
            _getWriter() { return new N(this._getWordSize()); }
            getDefaultValue(e) { const t = e.map((e => this._getCoder(g.from(e)))); return new Y(t, "_").defaultValue(); }
            encode(e, t) { e.length !== t.length && $.throwError("types/values length mismatch", o.Logger.errors.INVALID_ARGUMENT, { count: { types: e.length, values: t.length }, value: { types: e, values: t } }); const r = e.map((e => this._getCoder(g.from(e)))), n = new Y(r, "_"), i = this._getWriter(); return n.encode(i, t), i.data; }
            decode(e, t, r) { const n = e.map((e => this._getCoder(g.from(e)))); return new Y(n, "_").decode(this._getReader((0, L.arrayify)(t), r)); }
        }
        const ne = new re;
        var ie = r(2046), oe = r(8197);
        const ae = new o.Logger(a);
        class se extends i.Description {
        }
        class ce extends i.Description {
        }
        class le extends i.Description {
        }
        class ue extends i.Description {
            static isIndexed(e) { return !(!e || !e._isIndexed); }
        }
        const fe = { "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: !0 }, "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] } };
        function he(e, t) { const r = new Error(`deferred error during ABI decoding triggered accessing ${e}`); return r.error = t, r; }
        class de {
            constructor(e) { ae.checkNew(new.target, de); let t = []; t = "string" == typeof e ? JSON.parse(e) : e, (0, i.defineReadOnly)(this, "fragments", t.map((e => b.from(e))).filter((e => null != e))), (0, i.defineReadOnly)(this, "_abiCoder", (0, i.getStatic)(new.target, "getAbiCoder")()), (0, i.defineReadOnly)(this, "functions", {}), (0, i.defineReadOnly)(this, "errors", {}), (0, i.defineReadOnly)(this, "events", {}), (0, i.defineReadOnly)(this, "structs", {}), this.fragments.forEach((e => { let t = null; switch (e.type) {
                case "constructor": return this.deploy ? void ae.warn("duplicate definition - constructor") : void (0, i.defineReadOnly)(this, "deploy", e);
                case "function":
                    t = this.functions;
                    break;
                case "event":
                    t = this.events;
                    break;
                case "error":
                    t = this.errors;
                    break;
                default: return;
            } let r = e.format(); t[r] ? ae.warn("duplicate definition - " + r) : t[r] = e; })), this.deploy || (0, i.defineReadOnly)(this, "deploy", w.from({ payable: !1, type: "constructor" })), (0, i.defineReadOnly)(this, "_isInterface", !0); }
            format(e) { e || (e = d.full), e === d.sighash && ae.throwArgumentError("interface does not support formatting sighash", "format", e); const t = this.fragments.map((t => t.format(e))); return e === d.json ? JSON.stringify(t.map((e => JSON.parse(e)))) : t; }
            static getAbiCoder() { return ne; }
            static getAddress(e) { return (0, I.getAddress)(e); }
            static getSighash(e) { return (0, L.hexDataSlice)((0, ie.id)(e.format()), 0, 4); }
            static getEventTopic(e) { return (0, ie.id)(e.format()); }
            getFunction(e) { if ((0, L.isHexString)(e)) {
                for (const t in this.functions)
                    if (e === this.getSighash(t))
                        return this.functions[t];
                ae.throwArgumentError("no matching function", "sighash", e);
            } if (-1 === e.indexOf("(")) {
                const t = e.trim(), r = Object.keys(this.functions).filter((e => e.split("(")[0] === t));
                return 0 === r.length ? ae.throwArgumentError("no matching function", "name", t) : r.length > 1 && ae.throwArgumentError("multiple matching functions", "name", t), this.functions[r[0]];
            } const t = this.functions[E.fromString(e).format()]; return t || ae.throwArgumentError("no matching function", "signature", e), t; }
            getEvent(e) { if ((0, L.isHexString)(e)) {
                const t = e.toLowerCase();
                for (const e in this.events)
                    if (t === this.getEventTopic(e))
                        return this.events[e];
                ae.throwArgumentError("no matching event", "topichash", t);
            } if (-1 === e.indexOf("(")) {
                const t = e.trim(), r = Object.keys(this.events).filter((e => e.split("(")[0] === t));
                return 0 === r.length ? ae.throwArgumentError("no matching event", "name", t) : r.length > 1 && ae.throwArgumentError("multiple matching events", "name", t), this.events[r[0]];
            } const t = this.events[y.fromString(e).format()]; return t || ae.throwArgumentError("no matching event", "signature", e), t; }
            getError(e) { if ((0, L.isHexString)(e)) {
                const t = (0, i.getStatic)(this.constructor, "getSighash");
                for (const r in this.errors)
                    if (e === t(this.errors[r]))
                        return this.errors[r];
                ae.throwArgumentError("no matching error", "sighash", e);
            } if (-1 === e.indexOf("(")) {
                const t = e.trim(), r = Object.keys(this.errors).filter((e => e.split("(")[0] === t));
                return 0 === r.length ? ae.throwArgumentError("no matching error", "name", t) : r.length > 1 && ae.throwArgumentError("multiple matching errors", "name", t), this.errors[r[0]];
            } const t = this.errors[E.fromString(e).format()]; return t || ae.throwArgumentError("no matching error", "signature", e), t; }
            getSighash(e) { if ("string" == typeof e)
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
                } return (0, i.getStatic)(this.constructor, "getSighash")(e); }
            getEventTopic(e) { return "string" == typeof e && (e = this.getEvent(e)), (0, i.getStatic)(this.constructor, "getEventTopic")(e); }
            _decodeParams(e, t) { return this._abiCoder.decode(e, t); }
            _encodeParams(e, t) { return this._abiCoder.encode(e, t); }
            encodeDeploy(e) { return this._encodeParams(this.deploy.inputs, e || []); }
            decodeErrorResult(e, t) { "string" == typeof e && (e = this.getError(e)); const r = (0, L.arrayify)(t); return (0, L.hexlify)(r.slice(0, 4)) !== this.getSighash(e) && ae.throwArgumentError(`data signature does not match error ${e.name}.`, "data", (0, L.hexlify)(r)), this._decodeParams(e.inputs, r.slice(4)); }
            encodeErrorResult(e, t) { return "string" == typeof e && (e = this.getError(e)), (0, L.hexlify)((0, L.concat)([this.getSighash(e), this._encodeParams(e.inputs, t || [])])); }
            decodeFunctionData(e, t) { "string" == typeof e && (e = this.getFunction(e)); const r = (0, L.arrayify)(t); return (0, L.hexlify)(r.slice(0, 4)) !== this.getSighash(e) && ae.throwArgumentError(`data signature does not match function ${e.name}.`, "data", (0, L.hexlify)(r)), this._decodeParams(e.inputs, r.slice(4)); }
            encodeFunctionData(e, t) { return "string" == typeof e && (e = this.getFunction(e)), (0, L.hexlify)((0, L.concat)([this.getSighash(e), this._encodeParams(e.inputs, t || [])])); }
            decodeFunctionResult(e, t) { "string" == typeof e && (e = this.getFunction(e)); let r = (0, L.arrayify)(t), n = null, i = null, a = null, s = null; switch (r.length % this._abiCoder._getWordSize()) {
                case 0:
                    try {
                        return this._abiCoder.decode(e.outputs, r);
                    }
                    catch (e) { }
                    break;
                case 4: {
                    const e = (0, L.hexlify)(r.slice(0, 4)), t = fe[e];
                    if (t)
                        i = this._abiCoder.decode(t.inputs, r.slice(4)), a = t.name, s = t.signature, t.reason && (n = i[0]);
                    else
                        try {
                            const t = this.getError(e);
                            i = this._abiCoder.decode(t.inputs, r.slice(4)), a = t.name, s = t.format();
                        }
                        catch (e) {
                            console.log(e);
                        }
                    break;
                }
            } return ae.throwError("call revert exception", o.Logger.errors.CALL_EXCEPTION, { method: e.format(), errorArgs: i, errorName: a, errorSignature: s, reason: n }); }
            encodeFunctionResult(e, t) { return "string" == typeof e && (e = this.getFunction(e)), (0, L.hexlify)(this._abiCoder.encode(e.outputs, t || [])); }
            encodeFilterTopics(e, t) { "string" == typeof e && (e = this.getEvent(e)), t.length > e.inputs.length && ae.throwError("too many arguments for " + e.format(), o.Logger.errors.UNEXPECTED_ARGUMENT, { argument: "values", value: t }); let r = []; e.anonymous || r.push(this.getEventTopic(e)); const n = (e, t) => "string" === e.type ? (0, ie.id)(t) : "bytes" === e.type ? (0, oe.keccak256)((0, L.hexlify)(t)) : ("address" === e.type && this._abiCoder.encode(["address"], [t]), (0, L.hexZeroPad)((0, L.hexlify)(t), 32)); for (t.forEach(((t, i) => { let o = e.inputs[i]; o.indexed ? null == t ? r.push(null) : "array" === o.baseType || "tuple" === o.baseType ? ae.throwArgumentError("filtering with tuples or arrays not supported", "contract." + o.name, t) : Array.isArray(t) ? r.push(t.map((e => n(o, e)))) : r.push(n(o, t)) : null != t && ae.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + o.name, t); })); r.length && null === r[r.length - 1];)
                r.pop(); return r; }
            encodeEventLog(e, t) { "string" == typeof e && (e = this.getEvent(e)); const r = [], n = [], i = []; return e.anonymous || r.push(this.getEventTopic(e)), t.length !== e.inputs.length && ae.throwArgumentError("event arguments/values mismatch", "values", t), e.inputs.forEach(((e, o) => { const a = t[o]; if (e.indexed)
                if ("string" === e.type)
                    r.push((0, ie.id)(a));
                else if ("bytes" === e.type)
                    r.push((0, oe.keccak256)(a));
                else {
                    if ("tuple" === e.baseType || "array" === e.baseType)
                        throw new Error("not implemented");
                    r.push(this._abiCoder.encode([e.type], [a]));
                }
            else
                n.push(e), i.push(a); })), { data: this._abiCoder.encode(n, i), topics: r }; }
            decodeEventLog(e, t, r) { if ("string" == typeof e && (e = this.getEvent(e)), null != r && !e.anonymous) {
                let t = this.getEventTopic(e);
                (0, L.isHexString)(r[0], 32) && r[0].toLowerCase() === t || ae.throwError("fragment/topic mismatch", o.Logger.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: t, value: r[0] }), r = r.slice(1);
            } let n = [], i = [], a = []; e.inputs.forEach(((e, t) => { e.indexed ? "string" === e.type || "bytes" === e.type || "tuple" === e.baseType || "array" === e.baseType ? (n.push(g.fromObject({ type: "bytes32", name: e.name })), a.push(!0)) : (n.push(e), a.push(!1)) : (i.push(e), a.push(!1)); })); let s = null != r ? this._abiCoder.decode(n, (0, L.concat)(r)) : null, c = this._abiCoder.decode(i, t, !0), l = [], u = 0, f = 0; e.inputs.forEach(((e, t) => { if (e.indexed)
                if (null == s)
                    l[t] = new ue({ _isIndexed: !0, hash: null });
                else if (a[t])
                    l[t] = new ue({ _isIndexed: !0, hash: s[f++] });
                else
                    try {
                        l[t] = s[f++];
                    }
                    catch (e) {
                        l[t] = e;
                    }
            else
                try {
                    l[t] = c[u++];
                }
                catch (e) {
                    l[t] = e;
                } if (e.name && null == l[e.name]) {
                const r = l[t];
                r instanceof Error ? Object.defineProperty(l, e.name, { enumerable: !0, get: () => { throw he(`property ${JSON.stringify(e.name)}`, r); } }) : l[e.name] = r;
            } })); for (let e = 0; e < l.length; e++) {
                const t = l[e];
                t instanceof Error && Object.defineProperty(l, e, { enumerable: !0, get: () => { throw he(`index ${e}`, t); } });
            } return Object.freeze(l); }
            parseTransaction(e) { let t = this.getFunction(e.data.substring(0, 10).toLowerCase()); return t ? new ce({ args: this._abiCoder.decode(t.inputs, "0x" + e.data.substring(10)), functionFragment: t, name: t.name, signature: t.format(), sighash: this.getSighash(t), value: n.O$.from(e.value || "0") }) : null; }
            parseLog(e) { let t = this.getEvent(e.topics[0]); return !t || t.anonymous ? null : new se({ eventFragment: t, name: t.name, signature: t.format(), topic: this.getEventTopic(t), args: this.decodeEventLog(t, e.data, e.topics) }); }
            parseError(e) { const t = (0, L.hexlify)(e); let r = this.getError(t.substring(0, 10).toLowerCase()); return r ? new le({ args: this._abiCoder.decode(r.inputs, "0x" + t.substring(10)), errorFragment: r, name: r.name, signature: r.format(), sighash: this.getSighash(r) }) : null; }
            static isInterface(e) { return !(!e || !e._isInterface); }
        }
    }, 4353: (e, t, r) => {
        "use strict";
        r.d(t, { Sg: () => s, zt: () => c });
        var n = r(2593), i = r(3587), o = r(711);
        const a = new o.Logger("abstract-provider/5.4.1");
        class s extends i.Description {
            static isForkEvent(e) { return !(!e || !e._isForkEvent); }
        }
        class c {
            constructor() { a.checkAbstract(new.target, c), (0, i.defineReadOnly)(this, "_isProvider", !0); }
            getFeeData() { return e = this, t = void 0, o = function* () { const { block: e, gasPrice: t } = yield (0, i.resolveProperties)({ block: this.getBlock("latest"), gasPrice: this.getGasPrice().catch((e => null)) }); let r = null, o = null; return e && e.baseFeePerGas && (o = n.O$.from("2500000000"), r = e.baseFeePerGas.mul(2).add(o)), { maxFeePerGas: r, maxPriorityFeePerGas: o, gasPrice: t }; }, new ((r = void 0) || (r = Promise))((function (n, i) { function a(e) { try {
                c(o.next(e));
            }
            catch (e) {
                i(e);
            } } function s(e) { try {
                c(o.throw(e));
            }
            catch (e) {
                i(e);
            } } function c(e) { var t; e.done ? n(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(a, s); } c((o = o.apply(e, t || [])).next()); })); var e, t, r, o; }
            addListener(e, t) { return this.on(e, t); }
            removeListener(e, t) { return this.off(e, t); }
            static isProvider(e) { return !(!e || !e._isProvider); }
        }
    }, 8171: (e, t, r) => {
        "use strict";
        r.d(t, { E: () => l });
        var n = r(3587), i = r(711), o = function (e, t, r, n) { return new (r || (r = Promise))((function (i, o) { function a(e) { try {
            c(n.next(e));
        }
        catch (e) {
            o(e);
        } } function s(e) { try {
            c(n.throw(e));
        }
        catch (e) {
            o(e);
        } } function c(e) { var t; e.done ? i(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(a, s); } c((n = n.apply(e, t || [])).next()); })); };
        const a = new i.Logger("abstract-signer/5.4.1"), s = ["accessList", "chainId", "data", "from", "gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "to", "type", "value"], c = [i.Logger.errors.INSUFFICIENT_FUNDS, i.Logger.errors.NONCE_EXPIRED, i.Logger.errors.REPLACEMENT_UNDERPRICED];
        class l {
            constructor() { a.checkAbstract(new.target, l), (0, n.defineReadOnly)(this, "_isSigner", !0); }
            getBalance(e) { return o(this, void 0, void 0, (function* () { return this._checkProvider("getBalance"), yield this.provider.getBalance(this.getAddress(), e); })); }
            getTransactionCount(e) { return o(this, void 0, void 0, (function* () { return this._checkProvider("getTransactionCount"), yield this.provider.getTransactionCount(this.getAddress(), e); })); }
            estimateGas(e) { return o(this, void 0, void 0, (function* () { this._checkProvider("estimateGas"); const t = yield (0, n.resolveProperties)(this.checkTransaction(e)); return yield this.provider.estimateGas(t); })); }
            call(e, t) { return o(this, void 0, void 0, (function* () { this._checkProvider("call"); const r = yield (0, n.resolveProperties)(this.checkTransaction(e)); return yield this.provider.call(r, t); })); }
            sendTransaction(e) { return o(this, void 0, void 0, (function* () { this._checkProvider("sendTransaction"); const t = yield this.populateTransaction(e), r = yield this.signTransaction(t); return yield this.provider.sendTransaction(r); })); }
            getChainId() { return o(this, void 0, void 0, (function* () { return this._checkProvider("getChainId"), (yield this.provider.getNetwork()).chainId; })); }
            getGasPrice() { return o(this, void 0, void 0, (function* () { return this._checkProvider("getGasPrice"), yield this.provider.getGasPrice(); })); }
            getFeeData() { return o(this, void 0, void 0, (function* () { return this._checkProvider("getFeeData"), yield this.provider.getFeeData(); })); }
            resolveName(e) { return o(this, void 0, void 0, (function* () { return this._checkProvider("resolveName"), yield this.provider.resolveName(e); })); }
            checkTransaction(e) { for (const t in e)
                -1 === s.indexOf(t) && a.throwArgumentError("invalid transaction key: " + t, "transaction", e); const t = (0, n.shallowCopy)(e); return null == t.from ? t.from = this.getAddress() : t.from = Promise.all([Promise.resolve(t.from), this.getAddress()]).then((t => (t[0].toLowerCase() !== t[1].toLowerCase() && a.throwArgumentError("from address mismatch", "transaction", e), t[0]))), t; }
            populateTransaction(e) { return o(this, void 0, void 0, (function* () { const t = yield (0, n.resolveProperties)(this.checkTransaction(e)); null != t.to && (t.to = Promise.resolve(t.to).then((e => o(this, void 0, void 0, (function* () { if (null == e)
                return null; const t = yield this.resolveName(e); return null == t && a.throwArgumentError("provided ENS name resolves to null", "tx.to", e), t; })))), t.to.catch((e => { }))); const r = null != t.maxFeePerGas || null != t.maxPriorityFeePerGas; if (null == t.gasPrice || 2 !== t.type && !r ? 0 !== t.type && 1 !== t.type || !r || a.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", e) : a.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", e), 2 !== t.type && null != t.type || null == t.maxFeePerGas || null == t.maxPriorityFeePerGas)
                if (0 === t.type || 1 === t.type)
                    null == t.gasPrice && (t.gasPrice = this.getGasPrice());
                else {
                    const e = yield this.getFeeData();
                    if (null == t.type)
                        if (null != e.maxFeePerGas && null != e.maxPriorityFeePerGas)
                            if (t.type = 2, null != t.gasPrice) {
                                const e = t.gasPrice;
                                delete t.gasPrice, t.maxFeePerGas = e, t.maxPriorityFeePerGas = e;
                            }
                            else
                                null == t.maxFeePerGas && (t.maxFeePerGas = e.maxFeePerGas), null == t.maxPriorityFeePerGas && (t.maxPriorityFeePerGas = e.maxPriorityFeePerGas);
                        else
                            null != e.gasPrice ? (r && a.throwError("network does not support EIP-1559", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "populateTransaction" }), null == t.gasPrice && (t.gasPrice = e.gasPrice), t.type = 0) : a.throwError("failed to get consistent fee data", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "signer.getFeeData" });
                    else
                        2 === t.type && (null == t.maxFeePerGas && (t.maxFeePerGas = e.maxFeePerGas), null == t.maxPriorityFeePerGas && (t.maxPriorityFeePerGas = e.maxPriorityFeePerGas));
                }
            else
                t.type = 2; return null == t.nonce && (t.nonce = this.getTransactionCount("pending")), null == t.gasLimit && (t.gasLimit = this.estimateGas(t).catch((e => { if (c.indexOf(e.code) >= 0)
                throw e; return a.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", i.Logger.errors.UNPREDICTABLE_GAS_LIMIT, { error: e, tx: t }); }))), null == t.chainId ? t.chainId = this.getChainId() : t.chainId = Promise.all([Promise.resolve(t.chainId), this.getChainId()]).then((t => (0 !== t[1] && t[0] !== t[1] && a.throwArgumentError("chainId address mismatch", "transaction", e), t[0]))), yield (0, n.resolveProperties)(t); })); }
            _checkProvider(e) { this.provider || a.throwError("missing provider", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: e || "_checkProvider" }); }
            static isSigner(e) { return !(!e || !e._isSigner); }
        }
    }, 4594: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { getAddress: () => d, getContractAddress: () => m, getCreate2Address: () => b, getIcapAddress: () => g, isAddress: () => p });
        var n = r(3286), i = r(2593), o = r(8197), a = r(1843);
        const s = new (r(711).Logger)("address/5.4.0");
        function c(e) { (0, n.isHexString)(e, 20) || s.throwArgumentError("invalid address", "address", e); const t = (e = e.toLowerCase()).substring(2).split(""), r = new Uint8Array(40); for (let e = 0; e < 40; e++)
            r[e] = t[e].charCodeAt(0); const i = (0, n.arrayify)((0, o.keccak256)(r)); for (let e = 0; e < 40; e += 2)
            i[e >> 1] >> 4 >= 8 && (t[e] = t[e].toUpperCase()), (15 & i[e >> 1]) >= 8 && (t[e + 1] = t[e + 1].toUpperCase()); return "0x" + t.join(""); }
        const l = {};
        for (let e = 0; e < 10; e++)
            l[String(e)] = String(e);
        for (let e = 0; e < 26; e++)
            l[String.fromCharCode(65 + e)] = String(10 + e);
        const u = Math.floor((f = 9007199254740991, Math.log10 ? Math.log10(f) : Math.log(f) / Math.LN10));
        var f;
        function h(e) { let t = (e = (e = e.toUpperCase()).substring(4) + e.substring(0, 2) + "00").split("").map((e => l[e])).join(""); for (; t.length >= u;) {
            let e = t.substring(0, u);
            t = parseInt(e, 10) % 97 + t.substring(e.length);
        } let r = String(98 - parseInt(t, 10) % 97); for (; r.length < 2;)
            r = "0" + r; return r; }
        function d(e) { let t = null; if ("string" != typeof e && s.throwArgumentError("invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/))
            "0x" !== e.substring(0, 2) && (e = "0x" + e), t = c(e), e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && t !== e && s.throwArgumentError("bad address checksum", "address", e);
        else if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
            for (e.substring(2, 4) !== h(e) && s.throwArgumentError("bad icap checksum", "address", e), t = (0, i.g$)(e.substring(4)); t.length < 40;)
                t = "0" + t;
            t = c("0x" + t);
        }
        else
            s.throwArgumentError("invalid address", "address", e); return t; }
        function p(e) { try {
            return d(e), !0;
        }
        catch (e) { } return !1; }
        function g(e) { let t = (0, i.t2)(d(e).substring(2)).toUpperCase(); for (; t.length < 30;)
            t = "0" + t; return "XE" + h("XE00" + t) + t; }
        function m(e) { let t = null; try {
            t = d(e.from);
        }
        catch (t) {
            s.throwArgumentError("missing from address", "transaction", e);
        } const r = (0, n.stripZeros)((0, n.arrayify)(i.O$.from(e.nonce).toHexString())); return d((0, n.hexDataSlice)((0, o.keccak256)((0, a.encode)([t, r])), 12)); }
        function b(e, t, r) { return 32 !== (0, n.hexDataLength)(t) && s.throwArgumentError("salt must be 32 bytes", "salt", t), 32 !== (0, n.hexDataLength)(r) && s.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", r), d((0, n.hexDataSlice)((0, o.keccak256)((0, n.concat)(["0xff", d(e), t, r])), 12)); }
    }, 9567: (e, t, r) => {
        "use strict";
        r.d(t, { J: () => i, c: () => o });
        var n = r(3286);
        function i(e) { e = atob(e); const t = []; for (let r = 0; r < e.length; r++)
            t.push(e.charCodeAt(r)); return (0, n.arrayify)(t); }
        function o(e) { e = (0, n.arrayify)(e); let t = ""; for (let r = 0; r < e.length; r++)
            t += String.fromCharCode(e[r]); return btoa(t); }
    }, 4089: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { decode: () => n.J, encode: () => n.c });
        var n = r(9567);
    }, 7727: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { BaseX: () => o, Base32: () => a, Base58: () => s });
        var n = r(3286), i = r(3587);
        class o {
            constructor(e) { (0, i.defineReadOnly)(this, "alphabet", e), (0, i.defineReadOnly)(this, "base", e.length), (0, i.defineReadOnly)(this, "_alphabetMap", {}), (0, i.defineReadOnly)(this, "_leader", e.charAt(0)); for (let t = 0; t < e.length; t++)
                this._alphabetMap[e.charAt(t)] = t; }
            encode(e) { let t = (0, n.arrayify)(e); if (0 === t.length)
                return ""; let r = [0]; for (let e = 0; e < t.length; ++e) {
                let n = t[e];
                for (let e = 0; e < r.length; ++e)
                    n += r[e] << 8, r[e] = n % this.base, n = n / this.base | 0;
                for (; n > 0;)
                    r.push(n % this.base), n = n / this.base | 0;
            } let i = ""; for (let e = 0; 0 === t[e] && e < t.length - 1; ++e)
                i += this._leader; for (let e = r.length - 1; e >= 0; --e)
                i += this.alphabet[r[e]]; return i; }
            decode(e) { if ("string" != typeof e)
                throw new TypeError("Expected String"); let t = []; if (0 === e.length)
                return new Uint8Array(t); t.push(0); for (let r = 0; r < e.length; r++) {
                let n = this._alphabetMap[e[r]];
                if (void 0 === n)
                    throw new Error("Non-base" + this.base + " character");
                let i = n;
                for (let e = 0; e < t.length; ++e)
                    i += t[e] * this.base, t[e] = 255 & i, i >>= 8;
                for (; i > 0;)
                    t.push(255 & i), i >>= 8;
            } for (let r = 0; e[r] === this._leader && r < e.length - 1; ++r)
                t.push(0); return (0, n.arrayify)(new Uint8Array(t.reverse())); }
        }
        const a = new o("abcdefghijklmnopqrstuvwxyz234567"), s = new o("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
    }, 8794: (e, t, r) => {
        "use strict";
        r.d(t, { i: () => n });
        const n = "bignumber/5.4.2";
    }, 2593: (e, t, r) => {
        "use strict";
        r.d(t, { Zm: () => h, O$: () => p, g$: () => v, t2: () => A });
        var n = r(3550), i = r.n(n), o = r(3286), a = r(711), s = r(8794), c = i().BN;
        const l = new a.Logger(s.i), u = {}, f = 9007199254740991;
        function h(e) { return null != e && (p.isBigNumber(e) || "number" == typeof e && e % 1 == 0 || "string" == typeof e && !!e.match(/^-?[0-9]+$/) || (0, o.isHexString)(e) || "bigint" == typeof e || (0, o.isBytes)(e)); }
        let d = !1;
        class p {
            constructor(e, t) { l.checkNew(new.target, p), e !== u && l.throwError("cannot call constructor directly; use BigNumber.from", a.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new (BigNumber)" }), this._hex = t, this._isBigNumber = !0, Object.freeze(this); }
            fromTwos(e) { return m(b(this).fromTwos(e)); }
            toTwos(e) { return m(b(this).toTwos(e)); }
            abs() { return "-" === this._hex[0] ? p.from(this._hex.substring(1)) : this; }
            add(e) { return m(b(this).add(b(e))); }
            sub(e) { return m(b(this).sub(b(e))); }
            div(e) { return p.from(e).isZero() && y("division by zero", "div"), m(b(this).div(b(e))); }
            mul(e) { return m(b(this).mul(b(e))); }
            mod(e) { const t = b(e); return t.isNeg() && y("cannot modulo negative values", "mod"), m(b(this).umod(t)); }
            pow(e) { const t = b(e); return t.isNeg() && y("cannot raise to negative values", "pow"), m(b(this).pow(t)); }
            and(e) { const t = b(e); return (this.isNegative() || t.isNeg()) && y("cannot 'and' negative values", "and"), m(b(this).and(t)); }
            or(e) { const t = b(e); return (this.isNegative() || t.isNeg()) && y("cannot 'or' negative values", "or"), m(b(this).or(t)); }
            xor(e) { const t = b(e); return (this.isNegative() || t.isNeg()) && y("cannot 'xor' negative values", "xor"), m(b(this).xor(t)); }
            mask(e) { return (this.isNegative() || e < 0) && y("cannot mask negative values", "mask"), m(b(this).maskn(e)); }
            shl(e) { return (this.isNegative() || e < 0) && y("cannot shift negative values", "shl"), m(b(this).shln(e)); }
            shr(e) { return (this.isNegative() || e < 0) && y("cannot shift negative values", "shr"), m(b(this).shrn(e)); }
            eq(e) { return b(this).eq(b(e)); }
            lt(e) { return b(this).lt(b(e)); }
            lte(e) { return b(this).lte(b(e)); }
            gt(e) { return b(this).gt(b(e)); }
            gte(e) { return b(this).gte(b(e)); }
            isNegative() { return "-" === this._hex[0]; }
            isZero() { return b(this).isZero(); }
            toNumber() { try {
                return b(this).toNumber();
            }
            catch (e) {
                y("overflow", "toNumber", this.toString());
            } return null; }
            toBigInt() { try {
                return BigInt(this.toString());
            }
            catch (e) { } return l.throwError("this platform does not support BigInt", a.Logger.errors.UNSUPPORTED_OPERATION, { value: this.toString() }); }
            toString() { return arguments.length > 0 && (10 === arguments[0] ? d || (d = !0, l.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : 16 === arguments[0] ? l.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", a.Logger.errors.UNEXPECTED_ARGUMENT, {}) : l.throwError("BigNumber.toString does not accept parameters", a.Logger.errors.UNEXPECTED_ARGUMENT, {})), b(this).toString(10); }
            toHexString() { return this._hex; }
            toJSON(e) { return { type: "BigNumber", hex: this.toHexString() }; }
            static from(e) { if (e instanceof p)
                return e; if ("string" == typeof e)
                return e.match(/^-?0x[0-9a-f]+$/i) ? new p(u, g(e)) : e.match(/^-?[0-9]+$/) ? new p(u, g(new c(e))) : l.throwArgumentError("invalid BigNumber string", "value", e); if ("number" == typeof e)
                return e % 1 && y("underflow", "BigNumber.from", e), (e >= f || e <= -f) && y("overflow", "BigNumber.from", e), p.from(String(e)); const t = e; if ("bigint" == typeof t)
                return p.from(t.toString()); if ((0, o.isBytes)(t))
                return p.from((0, o.hexlify)(t)); if (t)
                if (t.toHexString) {
                    const e = t.toHexString();
                    if ("string" == typeof e)
                        return p.from(e);
                }
                else {
                    let e = t._hex;
                    if (null == e && "BigNumber" === t.type && (e = t.hex), "string" == typeof e && ((0, o.isHexString)(e) || "-" === e[0] && (0, o.isHexString)(e.substring(1))))
                        return p.from(e);
                } return l.throwArgumentError("invalid BigNumber value", "value", e); }
            static isBigNumber(e) { return !(!e || !e._isBigNumber); }
        }
        function g(e) { if ("string" != typeof e)
            return g(e.toString(16)); if ("-" === e[0])
            return "-" === (e = e.substring(1))[0] && l.throwArgumentError("invalid hex", "value", e), "0x00" === (e = g(e)) ? e : "-" + e; if ("0x" !== e.substring(0, 2) && (e = "0x" + e), "0x" === e)
            return "0x00"; for (e.length % 2 && (e = "0x0" + e.substring(2)); e.length > 4 && "0x00" === e.substring(0, 4);)
            e = "0x" + e.substring(4); return e; }
        function m(e) { return p.from(g(e)); }
        function b(e) { const t = p.from(e).toHexString(); return "-" === t[0] ? new c("-" + t.substring(3), 16) : new c(t.substring(2), 16); }
        function y(e, t, r) { const n = { fault: e, operation: t }; return null != r && (n.value = r), l.throwError(e, a.Logger.errors.NUMERIC_FAULT, n); }
        function v(e) { return new c(e, 36).toString(16); }
        function A(e) { return new c(e, 16).toString(36); }
    }, 3286: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { arrayify: () => c, concat: () => l, hexConcat: () => b, hexDataLength: () => g, hexDataSlice: () => m, hexStripZeros: () => v, hexValue: () => y, hexZeroPad: () => A, hexlify: () => p, isBytes: () => s, isBytesLike: () => a, isHexString: () => h, joinSignature: () => w, splitSignature: () => S, stripZeros: () => u, zeroPad: () => f });
        const n = new (r(711).Logger)("bytes/5.4.0");
        function i(e) { return !!e.toHexString; }
        function o(e) { return e.slice || (e.slice = function () { const t = Array.prototype.slice.call(arguments); return o(new Uint8Array(Array.prototype.slice.apply(e, t))); }), e; }
        function a(e) { return h(e) && !(e.length % 2) || s(e); }
        function s(e) { if (null == e)
            return !1; if (e.constructor === Uint8Array)
            return !0; if ("string" == typeof e)
            return !1; if (null == e.length)
            return !1; for (let t = 0; t < e.length; t++) {
            const r = e[t];
            if ("number" != typeof r || r < 0 || r >= 256 || r % 1)
                return !1;
        } return !0; }
        function c(e, t) { if (t || (t = {}), "number" == typeof e) {
            n.checkSafeUint53(e, "invalid arrayify value");
            const t = [];
            for (; e;)
                t.unshift(255 & e), e = parseInt(String(e / 256));
            return 0 === t.length && t.push(0), o(new Uint8Array(t));
        } if (t.allowMissingPrefix && "string" == typeof e && "0x" !== e.substring(0, 2) && (e = "0x" + e), i(e) && (e = e.toHexString()), h(e)) {
            let r = e.substring(2);
            r.length % 2 && ("left" === t.hexPad ? r = "0x0" + r.substring(2) : "right" === t.hexPad ? r += "0" : n.throwArgumentError("hex data is odd-length", "value", e));
            const i = [];
            for (let e = 0; e < r.length; e += 2)
                i.push(parseInt(r.substring(e, e + 2), 16));
            return o(new Uint8Array(i));
        } return s(e) ? o(new Uint8Array(e)) : n.throwArgumentError("invalid arrayify value", "value", e); }
        function l(e) { const t = e.map((e => c(e))), r = t.reduce(((e, t) => e + t.length), 0), n = new Uint8Array(r); return t.reduce(((e, t) => (n.set(t, e), e + t.length)), 0), o(n); }
        function u(e) { let t = c(e); if (0 === t.length)
            return t; let r = 0; for (; r < t.length && 0 === t[r];)
            r++; return r && (t = t.slice(r)), t; }
        function f(e, t) { (e = c(e)).length > t && n.throwArgumentError("value out of range", "value", arguments[0]); const r = new Uint8Array(t); return r.set(e, t - e.length), o(r); }
        function h(e, t) { return !("string" != typeof e || !e.match(/^0x[0-9A-Fa-f]*$/) || t && e.length !== 2 + 2 * t); }
        const d = "0123456789abcdef";
        function p(e, t) { if (t || (t = {}), "number" == typeof e) {
            n.checkSafeUint53(e, "invalid hexlify value");
            let t = "";
            for (; e;)
                t = d[15 & e] + t, e = Math.floor(e / 16);
            return t.length ? (t.length % 2 && (t = "0" + t), "0x" + t) : "0x00";
        } if ("bigint" == typeof e)
            return (e = e.toString(16)).length % 2 ? "0x0" + e : "0x" + e; if (t.allowMissingPrefix && "string" == typeof e && "0x" !== e.substring(0, 2) && (e = "0x" + e), i(e))
            return e.toHexString(); if (h(e))
            return e.length % 2 && ("left" === t.hexPad ? e = "0x0" + e.substring(2) : "right" === t.hexPad ? e += "0" : n.throwArgumentError("hex data is odd-length", "value", e)), e.toLowerCase(); if (s(e)) {
            let t = "0x";
            for (let r = 0; r < e.length; r++) {
                let n = e[r];
                t += d[(240 & n) >> 4] + d[15 & n];
            }
            return t;
        } return n.throwArgumentError("invalid hexlify value", "value", e); }
        function g(e) { if ("string" != typeof e)
            e = p(e);
        else if (!h(e) || e.length % 2)
            return null; return (e.length - 2) / 2; }
        function m(e, t, r) { return "string" != typeof e ? e = p(e) : (!h(e) || e.length % 2) && n.throwArgumentError("invalid hexData", "value", e), t = 2 + 2 * t, null != r ? "0x" + e.substring(t, 2 + 2 * r) : "0x" + e.substring(t); }
        function b(e) { let t = "0x"; return e.forEach((e => { t += p(e).substring(2); })), t; }
        function y(e) { const t = v(p(e, { hexPad: "left" })); return "0x" === t ? "0x0" : t; }
        function v(e) { "string" != typeof e && (e = p(e)), h(e) || n.throwArgumentError("invalid hex string", "value", e), e = e.substring(2); let t = 0; for (; t < e.length && "0" === e[t];)
            t++; return "0x" + e.substring(t); }
        function A(e, t) { for ("string" != typeof e ? e = p(e) : h(e) || n.throwArgumentError("invalid hex string", "value", e), e.length > 2 * t + 2 && n.throwArgumentError("value out of range", "value", arguments[1]); e.length < 2 * t + 2;)
            e = "0x0" + e.substring(2); return e; }
        function S(e) { const t = { r: "0x", s: "0x", _vs: "0x", recoveryParam: 0, v: 0 }; if (a(e)) {
            const r = c(e);
            65 !== r.length && n.throwArgumentError("invalid signature string; must be 65 bytes", "signature", e), t.r = p(r.slice(0, 32)), t.s = p(r.slice(32, 64)), t.v = r[64], t.v < 27 && (0 === t.v || 1 === t.v ? t.v += 27 : n.throwArgumentError("signature invalid v byte", "signature", e)), t.recoveryParam = 1 - t.v % 2, t.recoveryParam && (r[32] |= 128), t._vs = p(r.slice(32, 64));
        }
        else {
            if (t.r = e.r, t.s = e.s, t.v = e.v, t.recoveryParam = e.recoveryParam, t._vs = e._vs, null != t._vs) {
                const r = f(c(t._vs), 32);
                t._vs = p(r);
                const i = r[0] >= 128 ? 1 : 0;
                null == t.recoveryParam ? t.recoveryParam = i : t.recoveryParam !== i && n.throwArgumentError("signature recoveryParam mismatch _vs", "signature", e), r[0] &= 127;
                const o = p(r);
                null == t.s ? t.s = o : t.s !== o && n.throwArgumentError("signature v mismatch _vs", "signature", e);
            }
            null == t.recoveryParam ? null == t.v ? n.throwArgumentError("signature missing v and recoveryParam", "signature", e) : 0 === t.v || 1 === t.v ? t.recoveryParam = t.v : t.recoveryParam = 1 - t.v % 2 : null == t.v ? t.v = 27 + t.recoveryParam : t.recoveryParam !== 1 - t.v % 2 && n.throwArgumentError("signature recoveryParam mismatch v", "signature", e), null != t.r && h(t.r) ? t.r = A(t.r, 32) : n.throwArgumentError("signature missing or invalid r", "signature", e), null != t.s && h(t.s) ? t.s = A(t.s, 32) : n.throwArgumentError("signature missing or invalid s", "signature", e);
            const r = c(t.s);
            r[0] >= 128 && n.throwArgumentError("signature s out of range", "signature", e), t.recoveryParam && (r[0] |= 128);
            const i = p(r);
            t._vs && (h(t._vs) || n.throwArgumentError("signature invalid _vs", "signature", e), t._vs = A(t._vs, 32)), null == t._vs ? t._vs = i : t._vs !== i && n.throwArgumentError("signature _vs mismatch v and s", "signature", e);
        } return t; }
        function w(e) { return p(l([(e = S(e)).r, e.s, e.recoveryParam ? "0x1c" : "0x1b"])); }
    }, 1046: (e, t, r) => {
        "use strict";
        r.d(t, { tL: () => i, _Y: () => o, fh: () => a, Bz: () => s });
        var n = r(2593);
        const i = n.O$.from(-1), o = n.O$.from(0), a = n.O$.from(1), s = n.O$.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    }, 7218: (e, t, r) => {
        "use strict";
        r.d(t, { R: () => n });
        const n = "0x0000000000000000000000000000000000000000000000000000000000000000";
    }, 5644: (e, t, r) => {
        "use strict";
        r.d(t, { i: () => n });
        const n = "hash/5.4.0";
    }, 2046: (e, t, r) => {
        "use strict";
        r.d(t, { id: () => o });
        var n = r(8197), i = r(4242);
        function o(e) { return (0, n.keccak256)((0, i.Y0)(e)); }
    }, 5931: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { id: () => n.id, namehash: () => i.V, isValidName: () => i.r, messagePrefix: () => o.B, hashMessage: () => o.r, _TypedDataEncoder: () => a.E });
        var n = r(2046), i = r(4706), o = r(3684), a = r(7827);
    }, 3684: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => a, r: () => s });
        var n = r(3286), i = r(8197), o = r(4242);
        const a = "Ethereum Signed Message:\n";
        function s(e) { return "string" == typeof e && (e = (0, o.Y0)(e)), (0, i.keccak256)((0, n.concat)([(0, o.Y0)(a), (0, o.Y0)(String(e.length)), e])); }
    }, 4706: (e, t, r) => {
        "use strict";
        r.d(t, { r: () => h, V: () => d });
        var n = r(3286), i = r(5637), o = r(4242), a = r(8197), s = r(711), c = r(5644);
        const l = new s.Logger(c.i), u = new Uint8Array(32);
        u.fill(0);
        const f = new RegExp("^((.*)\\.)?([^.]+)$");
        function h(e) { try {
            const t = e.split(".");
            for (let e = 0; e < t.length; e++)
                if (0 === (0, i.Ll)(t[e]).length)
                    throw new Error("empty");
            return !0;
        }
        catch (e) { } return !1; }
        function d(e) { "string" != typeof e && l.throwArgumentError("invalid ENS name; not a string", "name", e); let t = e, r = u; for (; t.length;) {
            const s = t.match(f);
            null != s && "" !== s[2] || l.throwArgumentError("invalid ENS address; missing component", "name", e);
            const c = (0, o.Y0)((0, i.Ll)(s[3]));
            r = (0, a.keccak256)((0, n.concat)([r, (0, a.keccak256)(c)])), t = s[2] || "";
        } return (0, n.hexlify)(r); }
    }, 7827: (e, t, r) => {
        "use strict";
        r.d(t, { E: () => k });
        var n = r(4594), i = r(2593), o = r(3286), a = r(8197), s = r(3587), c = r(711), l = r(5644), u = r(2046);
        const f = new c.Logger(l.i), h = new Uint8Array(32);
        h.fill(0);
        const d = i.O$.from(-1), p = i.O$.from(0), g = i.O$.from(1), m = i.O$.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), b = (0, o.hexZeroPad)(g.toHexString(), 32), y = (0, o.hexZeroPad)(p.toHexString(), 32), v = { name: "string", version: "string", chainId: "uint256", verifyingContract: "address", salt: "bytes32" }, A = ["name", "version", "chainId", "verifyingContract", "salt"];
        function S(e) { return function (t) { return "string" != typeof t && f.throwArgumentError(`invalid domain value for ${JSON.stringify(e)}`, `domain.${e}`, t), t; }; }
        const w = { name: S("name"), version: S("version"), chainId: function (e) { try {
                return i.O$.from(e).toString();
            }
            catch (e) { } return f.throwArgumentError('invalid domain value for "chainId"', "domain.chainId", e); }, verifyingContract: function (e) { try {
                return (0, n.getAddress)(e).toLowerCase();
            }
            catch (e) { } return f.throwArgumentError('invalid domain value "verifyingContract"', "domain.verifyingContract", e); }, salt: function (e) { try {
                const t = (0, o.arrayify)(e);
                if (32 !== t.length)
                    throw new Error("bad length");
                return (0, o.hexlify)(t);
            }
            catch (e) { } return f.throwArgumentError('invalid domain value "salt"', "domain.salt", e); } };
        function E(e) { {
            const t = e.match(/^(u?)int(\d*)$/);
            if (t) {
                const r = "" === t[1], n = parseInt(t[2] || "256");
                (n % 8 != 0 || n > 256 || t[2] && t[2] !== String(n)) && f.throwArgumentError("invalid numeric width", "type", e);
                const a = m.mask(r ? n - 1 : n), s = r ? a.add(g).mul(d) : p;
                return function (t) { const r = i.O$.from(t); return (r.lt(s) || r.gt(a)) && f.throwArgumentError(`value out-of-bounds for ${e}`, "value", t), (0, o.hexZeroPad)(r.toTwos(256).toHexString(), 32); };
            }
        } {
            const t = e.match(/^bytes(\d+)$/);
            if (t) {
                const r = parseInt(t[1]);
                return (0 === r || r > 32 || t[1] !== String(r)) && f.throwArgumentError("invalid bytes width", "type", e), function (t) { return (0, o.arrayify)(t).length !== r && f.throwArgumentError(`invalid length for ${e}`, "value", t), function (e) { const t = (0, o.arrayify)(e), r = t.length % 32; return r ? (0, o.hexConcat)([t, h.slice(r)]) : (0, o.hexlify)(t); }(t); };
            }
        } switch (e) {
            case "address": return function (e) { return (0, o.hexZeroPad)((0, n.getAddress)(e), 32); };
            case "bool": return function (e) { return e ? b : y; };
            case "bytes": return function (e) { return (0, a.keccak256)(e); };
            case "string": return function (e) { return (0, u.id)(e); };
        } return null; }
        function T(e, t) { return `${e}(${t.map((({ name: e, type: t }) => t + " " + e)).join(",")})`; }
        class k {
            constructor(e) { (0, s.defineReadOnly)(this, "types", Object.freeze((0, s.deepCopy)(e))), (0, s.defineReadOnly)(this, "_encoderCache", {}), (0, s.defineReadOnly)(this, "_types", {}); const t = {}, r = {}, n = {}; Object.keys(e).forEach((e => { t[e] = {}, r[e] = [], n[e] = {}; })); for (const n in e) {
                const i = {};
                e[n].forEach((o => { i[o.name] && f.throwArgumentError(`duplicate variable name ${JSON.stringify(o.name)} in ${JSON.stringify(n)}`, "types", e), i[o.name] = !0; const a = o.type.match(/^([^\x5b]*)(\x5b|$)/)[1]; a === n && f.throwArgumentError(`circular type reference to ${JSON.stringify(a)}`, "types", e), E(a) || (r[a] || f.throwArgumentError(`unknown type ${JSON.stringify(a)}`, "types", e), r[a].push(n), t[n][a] = !0); }));
            } const i = Object.keys(r).filter((e => 0 === r[e].length)); 0 === i.length ? f.throwArgumentError("missing primary type", "types", e) : i.length > 1 && f.throwArgumentError(`ambiguous primary types or unused types: ${i.map((e => JSON.stringify(e))).join(", ")}`, "types", e), (0, s.defineReadOnly)(this, "primaryType", i[0]), function i(o, a) { a[o] && f.throwArgumentError(`circular type reference to ${JSON.stringify(o)}`, "types", e), a[o] = !0, Object.keys(t[o]).forEach((e => { r[e] && (i(e, a), Object.keys(a).forEach((t => { n[t][e] = !0; }))); })), delete a[o]; }(this.primaryType, {}); for (const t in n) {
                const r = Object.keys(n[t]);
                r.sort(), this._types[t] = T(t, e[t]) + r.map((t => T(t, e[t]))).join("");
            } }
            getEncoder(e) { let t = this._encoderCache[e]; return t || (t = this._encoderCache[e] = this._getEncoder(e)), t; }
            _getEncoder(e) { {
                const t = E(e);
                if (t)
                    return t;
            } const t = e.match(/^(.*)(\x5b(\d*)\x5d)$/); if (t) {
                const e = t[1], r = this.getEncoder(e), n = parseInt(t[3]);
                return t => { n >= 0 && t.length !== n && f.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", t); let i = t.map(r); return this._types[e] && (i = i.map(a.keccak256)), (0, a.keccak256)((0, o.hexConcat)(i)); };
            } const r = this.types[e]; if (r) {
                const t = (0, u.id)(this._types[e]);
                return e => { const n = r.map((({ name: t, type: r }) => { const n = this.getEncoder(r)(e[t]); return this._types[r] ? (0, a.keccak256)(n) : n; })); return n.unshift(t), (0, o.hexConcat)(n); };
            } return f.throwArgumentError(`unknown type: ${e}`, "type", e); }
            encodeType(e) { const t = this._types[e]; return t || f.throwArgumentError(`unknown type: ${JSON.stringify(e)}`, "name", e), t; }
            encodeData(e, t) { return this.getEncoder(e)(t); }
            hashStruct(e, t) { return (0, a.keccak256)(this.encodeData(e, t)); }
            encode(e) { return this.encodeData(this.primaryType, e); }
            hash(e) { return this.hashStruct(this.primaryType, e); }
            _visit(e, t, r) { if (E(e))
                return r(e, t); const n = e.match(/^(.*)(\x5b(\d*)\x5d)$/); if (n) {
                const e = n[1], i = parseInt(n[3]);
                return i >= 0 && t.length !== i && f.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", t), t.map((t => this._visit(e, t, r)));
            } const i = this.types[e]; return i ? i.reduce(((e, { name: n, type: i }) => (e[n] = this._visit(i, t[n], r), e)), {}) : f.throwArgumentError(`unknown type: ${e}`, "type", e); }
            visit(e, t) { return this._visit(this.primaryType, e, t); }
            static from(e) { return new k(e); }
            static getPrimaryType(e) { return k.from(e).primaryType; }
            static hashStruct(e, t, r) { return k.from(t).hashStruct(e, r); }
            static hashDomain(e) { const t = []; for (const r in e) {
                const n = v[r];
                n || f.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(r)}`, "domain", e), t.push({ name: r, type: n });
            } return t.sort(((e, t) => A.indexOf(e.name) - A.indexOf(t.name))), k.hashStruct("EIP712Domain", { EIP712Domain: t }, e); }
            static encode(e, t, r) { return (0, o.hexConcat)(["0x1901", k.hashDomain(e), k.from(t).hash(r)]); }
            static hash(e, t, r) { return (0, a.keccak256)(k.encode(e, t, r)); }
            static resolveNames(e, t, r, n) { return i = this, a = void 0, l = function* () { e = (0, s.shallowCopy)(e); const i = {}; e.verifyingContract && !(0, o.isHexString)(e.verifyingContract, 20) && (i[e.verifyingContract] = "0x"); const a = k.from(t); a.visit(r, ((e, t) => ("address" !== e || (0, o.isHexString)(t, 20) || (i[t] = "0x"), t))); for (const e in i)
                i[e] = yield n(e); return e.verifyingContract && i[e.verifyingContract] && (e.verifyingContract = i[e.verifyingContract]), r = a.visit(r, ((e, t) => "address" === e && i[t] ? i[t] : t)), { domain: e, value: r }; }, new ((c = void 0) || (c = Promise))((function (e, t) { function r(e) { try {
                o(l.next(e));
            }
            catch (e) {
                t(e);
            } } function n(e) { try {
                o(l.throw(e));
            }
            catch (e) {
                t(e);
            } } function o(t) { var i; t.done ? e(t.value) : (i = t.value, i instanceof c ? i : new c((function (e) { e(i); }))).then(r, n); } o((l = l.apply(i, a || [])).next()); })); var i, a, c, l; }
            static getPayload(e, t, r) { k.hashDomain(e); const n = {}, a = []; A.forEach((t => { const r = e[t]; null != r && (n[t] = w[t](r), a.push({ name: t, type: v[t] })); })); const c = k.from(t), l = (0, s.shallowCopy)(t); return l.EIP712Domain ? f.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", t) : l.EIP712Domain = a, c.encode(r), { types: l, domain: n, primaryType: c.primaryType, message: c.visit(r, ((e, t) => { if (e.match(/^bytes(\d*)/))
                    return (0, o.hexlify)((0, o.arrayify)(t)); if (e.match(/^u?int/))
                    return i.O$.from(t).toString(); switch (e) {
                    case "address": return t.toLowerCase();
                    case "bool": return !!t;
                    case "string": return "string" != typeof t && f.throwArgumentError("invalid string", "value", t), t;
                } return f.throwArgumentError("unsupported type", "type", e); })) }; }
        }
    }, 1681: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { HDNode: () => ue, defaultPath: () => le, entropyToMnemonic: () => de, getAccountPath: () => ge, isValidMnemonic: () => pe, mnemonicToEntropy: () => he, mnemonicToSeed: () => fe });
        var n = r(7727), i = r(3286), o = r(2593), a = r(4242), s = r(5306), c = r(3587), l = r(2768), u = r(7158), f = r(1261), h = r(4377), d = r(2046), p = r(711);
        const g = new p.Logger("wordlists/5.4.0");
        class m {
            constructor(e) { g.checkAbstract(new.target, m), (0, c.defineReadOnly)(this, "locale", e); }
            split(e) { return e.toLowerCase().split(/ +/g); }
            join(e) { return e.join(" "); }
            static check(e) { const t = []; for (let r = 0; r < 2048; r++) {
                const n = e.getWord(r);
                if (r !== e.getWordIndex(n))
                    return "0x";
                t.push(n);
            } return (0, d.id)(t.join("\n") + "\n"); }
            static register(e, t) { t || (t = e.locale); }
        }
        let b = null;
        function y(e) { if (null == b && (b = "AbdikaceAbecedaAdresaAgreseAkceAktovkaAlejAlkoholAmputaceAnanasAndulkaAnekdotaAnketaAntikaAnulovatArchaAroganceAsfaltAsistentAspiraceAstmaAstronomAtlasAtletikaAtolAutobusAzylBabkaBachorBacilBaculkaBadatelBagetaBagrBahnoBakterieBaladaBaletkaBalkonBalonekBalvanBalzaBambusBankomatBarbarBaretBarmanBarokoBarvaBaterkaBatohBavlnaBazalkaBazilikaBazukaBednaBeranBesedaBestieBetonBezinkaBezmocBeztakBicyklBidloBiftekBikinyBilanceBiografBiologBitvaBizonBlahobytBlatouchBlechaBleduleBleskBlikatBliznaBlokovatBlouditBludBobekBobrBodlinaBodnoutBohatostBojkotBojovatBokorysBolestBorecBoroviceBotaBoubelBouchatBoudaBouleBouratBoxerBradavkaBramboraBrankaBratrBreptaBriketaBrkoBrlohBronzBroskevBrunetkaBrusinkaBrzdaBrzyBublinaBubnovatBuchtaBuditelBudkaBudovaBufetBujarostBukviceBuldokBulvaBundaBunkrBurzaButikBuvolBuzolaBydletBylinaBytovkaBzukotCapartCarevnaCedrCeduleCejchCejnCelaCelerCelkemCelniceCeninaCennostCenovkaCentrumCenzorCestopisCetkaChalupaChapadloCharitaChataChechtatChemieChichotChirurgChladChlebaChlubitChmelChmuraChobotChocholChodbaCholeraChomoutChopitChorobaChovChrapotChrlitChrtChrupChtivostChudinaChutnatChvatChvilkaChvostChybaChystatChytitCibuleCigaretaCihelnaCihlaCinkotCirkusCisternaCitaceCitrusCizinecCizostClonaCokolivCouvatCtitelCtnostCudnostCuketaCukrCupotCvaknoutCvalCvikCvrkotCyklistaDalekoDarebaDatelDatumDceraDebataDechovkaDecibelDeficitDeflaceDeklDekretDemokratDepreseDerbyDeskaDetektivDikobrazDiktovatDiodaDiplomDiskDisplejDivadloDivochDlahaDlouhoDluhopisDnesDobroDobytekDocentDochutitDodnesDohledDohodaDohraDojemDojniceDokladDokolaDoktorDokumentDolarDolevaDolinaDomaDominantDomluvitDomovDonutitDopadDopisDoplnitDoposudDoprovodDopustitDorazitDorostDortDosahDoslovDostatekDosudDosytaDotazDotekDotknoutDoufatDoutnatDovozceDozaduDoznatDozorceDrahotaDrakDramatikDravecDrazeDrdolDrobnostDrogerieDrozdDrsnostDrtitDrzostDubenDuchovnoDudekDuhaDuhovkaDusitDusnoDutostDvojiceDvorecDynamitEkologEkonomieElektronElipsaEmailEmiseEmoceEmpatieEpizodaEpochaEpopejEposEsejEsenceEskortaEskymoEtiketaEuforieEvoluceExekuceExkurzeExpediceExplozeExportExtraktFackaFajfkaFakultaFanatikFantazieFarmacieFavoritFazoleFederaceFejetonFenkaFialkaFigurantFilozofFiltrFinanceFintaFixaceFjordFlanelFlirtFlotilaFondFosforFotbalFotkaFotonFrakceFreskaFrontaFukarFunkceFyzikaGalejeGarantGenetikaGeologGilotinaGlazuraGlejtGolemGolfistaGotikaGrafGramofonGranuleGrepGrilGrogGroteskaGumaHadiceHadrHalaHalenkaHanbaHanopisHarfaHarpunaHavranHebkostHejkalHejnoHejtmanHektarHelmaHematomHerecHernaHesloHezkyHistorikHladovkaHlasivkyHlavaHledatHlenHlodavecHlohHloupostHltatHlubinaHluchotaHmatHmotaHmyzHnisHnojivoHnoutHoblinaHobojHochHodinyHodlatHodnotaHodovatHojnostHokejHolinkaHolkaHolubHomoleHonitbaHonoraceHoralHordaHorizontHorkoHorlivecHormonHorninaHoroskopHorstvoHospodaHostinaHotovostHoubaHoufHoupatHouskaHovorHradbaHraniceHravostHrazdaHrbolekHrdinaHrdloHrdostHrnekHrobkaHromadaHrotHroudaHrozenHrstkaHrubostHryzatHubenostHubnoutHudbaHukotHumrHusitaHustotaHvozdHybnostHydrantHygienaHymnaHysterikIdylkaIhnedIkonaIluzeImunitaInfekceInflaceInkasoInovaceInspekceInternetInvalidaInvestorInzerceIronieJablkoJachtaJahodaJakmileJakostJalovecJantarJarmarkJaroJasanJasnoJatkaJavorJazykJedinecJedleJednatelJehlanJekotJelenJelitoJemnostJenomJepiceJeseterJevitJezdecJezeroJinakJindyJinochJiskraJistotaJitrniceJizvaJmenovatJogurtJurtaKabaretKabelKabinetKachnaKadetKadidloKahanKajakKajutaKakaoKaktusKalamitaKalhotyKalibrKalnostKameraKamkolivKamnaKanibalKanoeKantorKapalinaKapelaKapitolaKapkaKapleKapotaKaprKapustaKapybaraKaramelKarotkaKartonKasaKatalogKatedraKauceKauzaKavalecKazajkaKazetaKazivostKdekolivKdesiKedlubenKempKeramikaKinoKlacekKladivoKlamKlapotKlasikaKlaunKlecKlenbaKlepatKlesnoutKlidKlimaKlisnaKloboukKlokanKlopaKloubKlubovnaKlusatKluzkostKmenKmitatKmotrKnihaKnotKoaliceKoberecKobkaKoblihaKobylaKocourKohoutKojenecKokosKoktejlKolapsKoledaKolizeKoloKomandoKometaKomikKomnataKomoraKompasKomunitaKonatKonceptKondiceKonecKonfeseKongresKoninaKonkursKontaktKonzervaKopanecKopieKopnoutKoprovkaKorbelKorektorKormidloKoroptevKorpusKorunaKorytoKorzetKosatecKostkaKotelKotletaKotoulKoukatKoupelnaKousekKouzloKovbojKozaKozorohKrabiceKrachKrajinaKralovatKrasopisKravataKreditKrejcarKresbaKrevetaKriketKritikKrizeKrkavecKrmelecKrmivoKrocanKrokKronikaKropitKroupaKrovkaKrtekKruhadloKrupiceKrutostKrvinkaKrychleKryptaKrystalKrytKudlankaKufrKujnostKuklaKulajdaKulichKulkaKulometKulturaKunaKupodivuKurtKurzorKutilKvalitaKvasinkaKvestorKynologKyselinaKytaraKyticeKytkaKytovecKyvadloLabradorLachtanLadnostLaikLakomecLamelaLampaLanovkaLasiceLasoLasturaLatinkaLavinaLebkaLeckdyLedenLedniceLedovkaLedvinaLegendaLegieLegraceLehceLehkostLehnoutLektvarLenochodLentilkaLepenkaLepidloLetadloLetecLetmoLetokruhLevhartLevitaceLevobokLibraLichotkaLidojedLidskostLihovinaLijavecLilekLimetkaLinieLinkaLinoleumListopadLitinaLitovatLobistaLodivodLogikaLogopedLokalitaLoketLomcovatLopataLopuchLordLososLotrLoudalLouhLoukaLouskatLovecLstivostLucernaLuciferLumpLuskLustraceLviceLyraLyrikaLysinaMadamMadloMagistrMahagonMajetekMajitelMajoritaMakakMakoviceMakrelaMalbaMalinaMalovatMalviceMaminkaMandleMankoMarnostMasakrMaskotMasopustMaticeMatrikaMaturitaMazanecMazivoMazlitMazurkaMdlobaMechanikMeditaceMedovinaMelasaMelounMentolkaMetlaMetodaMetrMezeraMigraceMihnoutMihuleMikinaMikrofonMilenecMilimetrMilostMimikaMincovnaMinibarMinometMinulostMiskaMistrMixovatMladostMlhaMlhovinaMlokMlsatMluvitMnichMnohemMobilMocnostModelkaModlitbaMohylaMokroMolekulaMomentkaMonarchaMonoklMonstrumMontovatMonzunMosazMoskytMostMotivaceMotorkaMotykaMouchaMoudrostMozaikaMozekMozolMramorMravenecMrkevMrtvolaMrzetMrzutostMstitelMudrcMuflonMulatMumieMuniceMusetMutaceMuzeumMuzikantMyslivecMzdaNabouratNachytatNadaceNadbytekNadhozNadobroNadpisNahlasNahnatNahodileNahraditNaivitaNajednouNajistoNajmoutNaklonitNakonecNakrmitNalevoNamazatNamluvitNanometrNaokoNaopakNaostroNapadatNapevnoNaplnitNapnoutNaposledNaprostoNaroditNarubyNarychloNasaditNasekatNaslepoNastatNatolikNavenekNavrchNavzdoryNazvatNebeNechatNeckyNedalekoNedbatNeduhNegaceNehetNehodaNejenNejprveNeklidNelibostNemilostNemocNeochotaNeonkaNepokojNerostNervNesmyslNesouladNetvorNeuronNevinaNezvykleNicotaNijakNikamNikdyNiklNikterakNitroNoclehNohaviceNominaceNoraNorekNositelNosnostNouzeNovinyNovotaNozdraNudaNudleNugetNutitNutnostNutrieNymfaObalObarvitObavaObdivObecObehnatObejmoutObezitaObhajobaObilniceObjasnitObjektObklopitOblastOblekOblibaOblohaObludaObnosObohatitObojekOboutObrazecObrnaObrubaObrysObsahObsluhaObstaratObuvObvazObvinitObvodObvykleObyvatelObzorOcasOcelOcenitOchladitOchotaOchranaOcitnoutOdbojOdbytOdchodOdcizitOdebratOdeslatOdevzdatOdezvaOdhadceOdhoditOdjetOdjinudOdkazOdkoupitOdlivOdlukaOdmlkaOdolnostOdpadOdpisOdploutOdporOdpustitOdpykatOdrazkaOdsouditOdstupOdsunOdtokOdtudOdvahaOdvetaOdvolatOdvracetOdznakOfinaOfsajdOhlasOhniskoOhradaOhrozitOhryzekOkapOkeniceOklikaOknoOkouzlitOkovyOkrasaOkresOkrsekOkruhOkupantOkurkaOkusitOlejninaOlizovatOmakOmeletaOmezitOmladinaOmlouvatOmluvaOmylOnehdyOpakovatOpasekOperaceOpiceOpilostOpisovatOporaOpoziceOpravduOprotiOrbitalOrchestrOrgieOrliceOrlojOrtelOsadaOschnoutOsikaOsivoOslavaOslepitOslnitOslovitOsnovaOsobaOsolitOspalecOstenOstrahaOstudaOstychOsvojitOteplitOtiskOtopOtrhatOtrlostOtrokOtrubyOtvorOvanoutOvarOvesOvlivnitOvoceOxidOzdobaPachatelPacientPadouchPahorekPaktPalandaPalecPalivoPalubaPamfletPamlsekPanenkaPanikaPannaPanovatPanstvoPantoflePaprikaParketaParodiePartaParukaParybaPasekaPasivitaPastelkaPatentPatronaPavoukPaznehtPazourekPeckaPedagogPejsekPekloPelotonPenaltaPendrekPenzePeriskopPeroPestrostPetardaPeticePetrolejPevninaPexesoPianistaPihaPijavicePiklePiknikPilinaPilnostPilulkaPinzetaPipetaPisatelPistolePitevnaPivnicePivovarPlacentaPlakatPlamenPlanetaPlastikaPlatitPlavidloPlazPlechPlemenoPlentaPlesPletivoPlevelPlivatPlnitPlnoPlochaPlodinaPlombaPloutPlukPlynPobavitPobytPochodPocitPoctivecPodatPodcenitPodepsatPodhledPodivitPodkladPodmanitPodnikPodobaPodporaPodrazPodstataPodvodPodzimPoeziePohankaPohnutkaPohovorPohromaPohybPointaPojistkaPojmoutPokazitPoklesPokojPokrokPokutaPokynPolednePolibekPolknoutPolohaPolynomPomaluPominoutPomlkaPomocPomstaPomysletPonechatPonorkaPonurostPopadatPopelPopisekPoplachPoprositPopsatPopudPoradcePorcePorodPoruchaPoryvPosaditPosedPosilaPoskokPoslanecPosouditPospoluPostavaPosudekPosypPotahPotkanPotleskPotomekPotravaPotupaPotvoraPoukazPoutoPouzdroPovahaPovidlaPovlakPovozPovrchPovstatPovykPovzdechPozdravPozemekPoznatekPozorPozvatPracovatPrahoryPraktikaPralesPraotecPraporekPrasePravdaPrincipPrknoProbuditProcentoProdejProfeseProhraProjektProlomitPromilePronikatPropadProrokProsbaProtonProutekProvazPrskavkaPrstenPrudkostPrutPrvekPrvohoryPsanecPsovodPstruhPtactvoPubertaPuchPudlPukavecPuklinaPukrlePultPumpaPuncPupenPusaPusinkaPustinaPutovatPutykaPyramidaPyskPytelRacekRachotRadiaceRadniceRadonRaftRagbyRaketaRakovinaRamenoRampouchRandeRarachRaritaRasovnaRastrRatolestRazanceRazidloReagovatReakceReceptRedaktorReferentReflexRejnokReklamaRekordRekrutRektorReputaceRevizeRevmaRevolverRezervaRiskovatRizikoRobotikaRodokmenRohovkaRokleRokokoRomanetoRopovodRopuchaRorejsRosolRostlinaRotmistrRotopedRotundaRoubenkaRouchoRoupRouraRovinaRovniceRozborRozchodRozdatRozeznatRozhodceRozinkaRozjezdRozkazRozlohaRozmarRozpadRozruchRozsahRoztokRozumRozvodRubrikaRuchadloRukaviceRukopisRybaRybolovRychlostRydloRypadloRytinaRyzostSadistaSahatSakoSamecSamizdatSamotaSanitkaSardinkaSasankaSatelitSazbaSazeniceSborSchovatSebrankaSeceseSedadloSedimentSedloSehnatSejmoutSekeraSektaSekundaSekvojeSemenoSenoServisSesaditSeshoraSeskokSeslatSestraSesuvSesypatSetbaSetinaSetkatSetnoutSetrvatSeverSeznamShodaShrnoutSifonSilniceSirkaSirotekSirupSituaceSkafandrSkaliskoSkanzenSkautSkeptikSkicaSkladbaSkleniceSkloSkluzSkobaSkokanSkoroSkriptaSkrzSkupinaSkvostSkvrnaSlabikaSladidloSlaninaSlastSlavnostSledovatSlepecSlevaSlezinaSlibSlinaSlizniceSlonSloupekSlovoSluchSluhaSlunceSlupkaSlzaSmaragdSmetanaSmilstvoSmlouvaSmogSmradSmrkSmrtkaSmutekSmyslSnadSnahaSnobSobotaSochaSodovkaSokolSopkaSotvaSoubojSoucitSoudceSouhlasSouladSoumrakSoupravaSousedSoutokSouvisetSpalovnaSpasitelSpisSplavSpodekSpojenecSpoluSponzorSpornostSpoustaSprchaSpustitSrandaSrazSrdceSrnaSrnecSrovnatSrpenSrstSrubStaniceStarostaStatikaStavbaStehnoStezkaStodolaStolekStopaStornoStoupatStrachStresStrhnoutStromStrunaStudnaStupniceStvolStykSubjektSubtropySucharSudostSuknoSundatSunoutSurikataSurovinaSvahSvalstvoSvetrSvatbaSvazekSvisleSvitekSvobodaSvodidloSvorkaSvrabSykavkaSykotSynekSynovecSypatSypkostSyrovostSyselSytostTabletkaTabuleTahounTajemnoTajfunTajgaTajitTajnostTaktikaTamhleTamponTancovatTanecTankerTapetaTaveninaTazatelTechnikaTehdyTekutinaTelefonTemnotaTendenceTenistaTenorTeplotaTepnaTeprveTerapieTermoskaTextilTichoTiskopisTitulekTkadlecTkaninaTlapkaTleskatTlukotTlupaTmelToaletaTopinkaTopolTorzoTouhaToulecTradiceTraktorTrampTrasaTraverzaTrefitTrestTrezorTrhavinaTrhlinaTrochuTrojiceTroskaTroubaTrpceTrpitelTrpkostTrubecTruchlitTruhliceTrusTrvatTudyTuhnoutTuhostTundraTuristaTurnajTuzemskoTvarohTvorbaTvrdostTvrzTygrTykevUbohostUbozeUbratUbrousekUbrusUbytovnaUchoUctivostUdivitUhraditUjednatUjistitUjmoutUkazatelUklidnitUklonitUkotvitUkrojitUliceUlitaUlovitUmyvadloUnavitUniformaUniknoutUpadnoutUplatnitUplynoutUpoutatUpravitUranUrazitUsednoutUsilovatUsmrtitUsnadnitUsnoutUsouditUstlatUstrnoutUtahovatUtkatUtlumitUtonoutUtopenecUtrousitUvalitUvolnitUvozovkaUzdravitUzelUzeninaUzlinaUznatVagonValchaValounVanaVandalVanilkaVaranVarhanyVarovatVcelkuVchodVdovaVedroVegetaceVejceVelbloudVeletrhVelitelVelmocVelrybaVenkovVerandaVerzeVeselkaVeskrzeVesniceVespoduVestaVeterinaVeverkaVibraceVichrVideohraVidinaVidleVilaViniceVisetVitalitaVizeVizitkaVjezdVkladVkusVlajkaVlakVlasecVlevoVlhkostVlivVlnovkaVloupatVnucovatVnukVodaVodivostVodoznakVodstvoVojenskyVojnaVojskoVolantVolbaVolitVolnoVoskovkaVozidloVozovnaVpravoVrabecVracetVrahVrataVrbaVrcholekVrhatVrstvaVrtuleVsaditVstoupitVstupVtipVybavitVybratVychovatVydatVydraVyfotitVyhledatVyhnoutVyhoditVyhraditVyhubitVyjasnitVyjetVyjmoutVyklopitVykonatVylekatVymazatVymezitVymizetVymysletVynechatVynikatVynutitVypadatVyplatitVypravitVypustitVyrazitVyrovnatVyrvatVyslovitVysokoVystavitVysunoutVysypatVytasitVytesatVytratitVyvinoutVyvolatVyvrhelVyzdobitVyznatVzaduVzbuditVzchopitVzdorVzduchVzdychatVzestupVzhledemVzkazVzlykatVznikVzorekVzpouraVztahVztekXylofonZabratZabydletZachovatZadarmoZadusitZafoukatZahltitZahoditZahradaZahynoutZajatecZajetZajistitZaklepatZakoupitZalepitZamezitZamotatZamysletZanechatZanikatZaplatitZapojitZapsatZarazitZastavitZasunoutZatajitZatemnitZatknoutZaujmoutZavalitZaveletZavinitZavolatZavrtatZazvonitZbavitZbrusuZbudovatZbytekZdalekaZdarmaZdatnostZdivoZdobitZdrojZdvihZdymadloZeleninaZemanZeminaZeptatZezaduZezdolaZhatitZhltnoutZhlubokaZhotovitZhrubaZimaZimniceZjemnitZklamatZkoumatZkratkaZkumavkaZlatoZlehkaZlobaZlomZlostZlozvykZmapovatZmarZmatekZmijeZmizetZmocnitZmodratZmrzlinaZmutovatZnakZnalostZnamenatZnovuZobrazitZotavitZoubekZoufaleZploditZpomalitZpravaZprostitZprudkaZprvuZradaZranitZrcadloZrnitostZrnoZrovnaZrychlitZrzavostZtichaZtratitZubovinaZubrZvednoutZvenkuZveselaZvonZvratZvukovodZvyk".replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" "), "0x25f44555f4af25b51a711136e1c7d6e50ce9f8917d39d6b1f076b2bb4d2fac1a" !== m.check(e)))
            throw b = null, new Error("BIP39 Wordlist for en (English) FAILED"); }
        const v = new class extends m {
            constructor() { super("cz"); }
            getWord(e) { return y(this), b[e]; }
            getWordIndex(e) { return y(this), b.indexOf(e); }
        };
        m.register(v);
        let A = null;
        function S(e) { if (null == A && (A = "AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo".replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" "), "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60" !== m.check(e)))
            throw A = null, new Error("BIP39 Wordlist for en (English) FAILED"); }
        const w = new class extends m {
            constructor() { super("en"); }
            getWord(e) { return S(this), A[e]; }
            getWordIndex(e) { return S(this), A.indexOf(e); }
        };
        m.register(w);
        const E = {};
        let T = null;
        function k(e) { return g.checkNormalize(), (0, a.ZN)(Array.prototype.filter.call((0, a.Y0)(e.normalize("NFD").toLowerCase()), (e => e >= 65 && e <= 90 || e >= 97 && e <= 123))); }
        function B(e) { if (null == T && (T = "A/bacoAbdomenAbejaAbiertoAbogadoAbonoAbortoAbrazoAbrirAbueloAbusoAcabarAcademiaAccesoAccio/nAceiteAcelgaAcentoAceptarA/cidoAclararAcne/AcogerAcosoActivoActoActrizActuarAcudirAcuerdoAcusarAdictoAdmitirAdoptarAdornoAduanaAdultoAe/reoAfectarAficio/nAfinarAfirmarA/gilAgitarAgoni/aAgostoAgotarAgregarAgrioAguaAgudoA/guilaAgujaAhogoAhorroAireAislarAjedrezAjenoAjusteAlacra/nAlambreAlarmaAlbaA/lbumAlcaldeAldeaAlegreAlejarAlertaAletaAlfilerAlgaAlgodo/nAliadoAlientoAlivioAlmaAlmejaAlmi/barAltarAltezaAltivoAltoAlturaAlumnoAlzarAmableAmanteAmapolaAmargoAmasarA/mbarA/mbitoAmenoAmigoAmistadAmorAmparoAmplioAnchoAncianoAnclaAndarAnde/nAnemiaA/nguloAnilloA/nimoAni/sAnotarAntenaAntiguoAntojoAnualAnularAnuncioA~adirA~ejoA~oApagarAparatoApetitoApioAplicarApodoAporteApoyoAprenderAprobarApuestaApuroAradoAra~aArarA/rbitroA/rbolArbustoArchivoArcoArderArdillaArduoA/reaA/ridoAriesArmoni/aArne/sAromaArpaArpo/nArregloArrozArrugaArteArtistaAsaAsadoAsaltoAscensoAsegurarAseoAsesorAsientoAsiloAsistirAsnoAsombroA/speroAstillaAstroAstutoAsumirAsuntoAtajoAtaqueAtarAtentoAteoA/ticoAtletaA/tomoAtraerAtrozAtu/nAudazAudioAugeAulaAumentoAusenteAutorAvalAvanceAvaroAveAvellanaAvenaAvestruzAvio/nAvisoAyerAyudaAyunoAzafra/nAzarAzoteAzu/carAzufreAzulBabaBaborBacheBahi/aBaileBajarBalanzaBalco/nBaldeBambu/BancoBandaBa~oBarbaBarcoBarnizBarroBa/sculaBasto/nBasuraBatallaBateri/aBatirBatutaBau/lBazarBebe/BebidaBelloBesarBesoBestiaBichoBienBingoBlancoBloqueBlusaBoaBobinaBoboBocaBocinaBodaBodegaBoinaBolaBoleroBolsaBombaBondadBonitoBonoBonsa/iBordeBorrarBosqueBoteBoti/nBo/vedaBozalBravoBrazoBrechaBreveBrilloBrincoBrisaBrocaBromaBronceBroteBrujaBruscoBrutoBuceoBucleBuenoBueyBufandaBufo/nBu/hoBuitreBultoBurbujaBurlaBurroBuscarButacaBuzo/nCaballoCabezaCabinaCabraCacaoCada/verCadenaCaerCafe/Cai/daCaima/nCajaCajo/nCalCalamarCalcioCaldoCalidadCalleCalmaCalorCalvoCamaCambioCamelloCaminoCampoCa/ncerCandilCanelaCanguroCanicaCantoCa~aCa~o/nCaobaCaosCapazCapita/nCapoteCaptarCapuchaCaraCarbo/nCa/rcelCaretaCargaCari~oCarneCarpetaCarroCartaCasaCascoCaseroCaspaCastorCatorceCatreCaudalCausaCazoCebollaCederCedroCeldaCe/lebreCelosoCe/lulaCementoCenizaCentroCercaCerdoCerezaCeroCerrarCertezaCe/spedCetroChacalChalecoChampu/ChanclaChapaCharlaChicoChisteChivoChoqueChozaChuletaChuparCiclo/nCiegoCieloCienCiertoCifraCigarroCimaCincoCineCintaCipre/sCircoCiruelaCisneCitaCiudadClamorClanClaroClaseClaveClienteClimaCli/nicaCobreCoccio/nCochinoCocinaCocoCo/digoCodoCofreCogerCoheteCoji/nCojoColaColchaColegioColgarColinaCollarColmoColumnaCombateComerComidaCo/modoCompraCondeConejoCongaConocerConsejoContarCopaCopiaCorazo/nCorbataCorchoCordo/nCoronaCorrerCoserCosmosCostaCra/neoCra/terCrearCrecerCrei/doCremaCri/aCrimenCriptaCrisisCromoCro/nicaCroquetaCrudoCruzCuadroCuartoCuatroCuboCubrirCucharaCuelloCuentoCuerdaCuestaCuevaCuidarCulebraCulpaCultoCumbreCumplirCunaCunetaCuotaCupo/nCu/pulaCurarCuriosoCursoCurvaCutisDamaDanzaDarDardoDa/tilDeberDe/bilDe/cadaDecirDedoDefensaDefinirDejarDelfi/nDelgadoDelitoDemoraDensoDentalDeporteDerechoDerrotaDesayunoDeseoDesfileDesnudoDestinoDesvi/oDetalleDetenerDeudaDi/aDiabloDiademaDiamanteDianaDiarioDibujoDictarDienteDietaDiezDifi/cilDignoDilemaDiluirDineroDirectoDirigirDiscoDise~oDisfrazDivaDivinoDobleDoceDolorDomingoDonDonarDoradoDormirDorsoDosDosisDrago/nDrogaDuchaDudaDueloDue~oDulceDu/oDuqueDurarDurezaDuroE/banoEbrioEcharEcoEcuadorEdadEdicio/nEdificioEditorEducarEfectoEficazEjeEjemploElefanteElegirElementoElevarElipseE/liteElixirElogioEludirEmbudoEmitirEmocio/nEmpateEmpe~oEmpleoEmpresaEnanoEncargoEnchufeEnci/aEnemigoEneroEnfadoEnfermoEnga~oEnigmaEnlaceEnormeEnredoEnsayoEnse~arEnteroEntrarEnvaseEnvi/oE/pocaEquipoErizoEscalaEscenaEscolarEscribirEscudoEsenciaEsferaEsfuerzoEspadaEspejoEspi/aEsposaEspumaEsqui/EstarEsteEstiloEstufaEtapaEternoE/ticaEtniaEvadirEvaluarEventoEvitarExactoExamenExcesoExcusaExentoExigirExilioExistirE/xitoExpertoExplicarExponerExtremoFa/bricaFa/bulaFachadaFa/cilFactorFaenaFajaFaldaFalloFalsoFaltarFamaFamiliaFamosoFarao/nFarmaciaFarolFarsaFaseFatigaFaunaFavorFaxFebreroFechaFelizFeoFeriaFerozFe/rtilFervorFesti/nFiableFianzaFiarFibraFiccio/nFichaFideoFiebreFielFieraFiestaFiguraFijarFijoFilaFileteFilialFiltroFinFincaFingirFinitoFirmaFlacoFlautaFlechaFlorFlotaFluirFlujoFlu/orFobiaFocaFogataFogo/nFolioFolletoFondoFormaForroFortunaForzarFosaFotoFracasoFra/gilFranjaFraseFraudeFrei/rFrenoFresaFri/oFritoFrutaFuegoFuenteFuerzaFugaFumarFuncio/nFundaFurgo/nFuriaFusilFu/tbolFuturoGacelaGafasGaitaGajoGalaGaleri/aGalloGambaGanarGanchoGangaGansoGarajeGarzaGasolinaGastarGatoGavila/nGemeloGemirGenGe/neroGenioGenteGeranioGerenteGermenGestoGiganteGimnasioGirarGiroGlaciarGloboGloriaGolGolfoGolosoGolpeGomaGordoGorilaGorraGotaGoteoGozarGradaGra/ficoGranoGrasaGratisGraveGrietaGrilloGripeGrisGritoGrosorGru/aGruesoGrumoGrupoGuanteGuapoGuardiaGuerraGui/aGui~oGuionGuisoGuitarraGusanoGustarHaberHa/bilHablarHacerHachaHadaHallarHamacaHarinaHazHaza~aHebillaHebraHechoHeladoHelioHembraHerirHermanoHe/roeHervirHieloHierroHi/gadoHigieneHijoHimnoHistoriaHocicoHogarHogueraHojaHombreHongoHonorHonraHoraHormigaHornoHostilHoyoHuecoHuelgaHuertaHuesoHuevoHuidaHuirHumanoHu/medoHumildeHumoHundirHuraca/nHurtoIconoIdealIdiomaI/doloIglesiaIglu/IgualIlegalIlusio/nImagenIma/nImitarImparImperioImponerImpulsoIncapazI/ndiceInerteInfielInformeIngenioInicioInmensoInmuneInnatoInsectoInstanteIntere/sI/ntimoIntuirInu/tilInviernoIraIrisIroni/aIslaIsloteJabali/Jabo/nJamo/nJarabeJardi/nJarraJaulaJazmi/nJefeJeringaJineteJornadaJorobaJovenJoyaJuergaJuevesJuezJugadorJugoJugueteJuicioJuncoJunglaJunioJuntarJu/piterJurarJustoJuvenilJuzgarKiloKoalaLabioLacioLacraLadoLadro/nLagartoLa/grimaLagunaLaicoLamerLa/minaLa/mparaLanaLanchaLangostaLanzaLa/pizLargoLarvaLa/stimaLataLa/texLatirLaurelLavarLazoLealLeccio/nLecheLectorLeerLegio/nLegumbreLejanoLenguaLentoLe~aLeo/nLeopardoLesio/nLetalLetraLeveLeyendaLibertadLibroLicorLi/derLidiarLienzoLigaLigeroLimaLi/miteLimo/nLimpioLinceLindoLi/neaLingoteLinoLinternaLi/quidoLisoListaLiteraLitioLitroLlagaLlamaLlantoLlaveLlegarLlenarLlevarLlorarLloverLluviaLoboLocio/nLocoLocuraLo/gicaLogroLombrizLomoLonjaLoteLuchaLucirLugarLujoLunaLunesLupaLustroLutoLuzMacetaMachoMaderaMadreMaduroMaestroMafiaMagiaMagoMai/zMaldadMaletaMallaMaloMama/MamboMamutMancoMandoManejarMangaManiqui/ManjarManoMansoMantaMa~anaMapaMa/quinaMarMarcoMareaMarfilMargenMaridoMa/rmolMarro/nMartesMarzoMasaMa/scaraMasivoMatarMateriaMatizMatrizMa/ximoMayorMazorcaMechaMedallaMedioMe/dulaMejillaMejorMelenaMelo/nMemoriaMenorMensajeMenteMenu/MercadoMerengueMe/ritoMesMeso/nMetaMeterMe/todoMetroMezclaMiedoMielMiembroMigaMilMilagroMilitarMillo/nMimoMinaMineroMi/nimoMinutoMiopeMirarMisaMiseriaMisilMismoMitadMitoMochilaMocio/nModaModeloMohoMojarMoldeMolerMolinoMomentoMomiaMonarcaMonedaMonjaMontoMo~oMoradaMorderMorenoMorirMorroMorsaMortalMoscaMostrarMotivoMoverMo/vilMozoMuchoMudarMuebleMuelaMuerteMuestraMugreMujerMulaMuletaMultaMundoMu~ecaMuralMuroMu/sculoMuseoMusgoMu/sicaMusloNa/carNacio/nNadarNaipeNaranjaNarizNarrarNasalNatalNativoNaturalNa/useaNavalNaveNavidadNecioNe/ctarNegarNegocioNegroNeo/nNervioNetoNeutroNevarNeveraNichoNidoNieblaNietoNi~ezNi~oNi/tidoNivelNoblezaNocheNo/minaNoriaNormaNorteNotaNoticiaNovatoNovelaNovioNubeNucaNu/cleoNudilloNudoNueraNueveNuezNuloNu/meroNutriaOasisObesoObispoObjetoObraObreroObservarObtenerObvioOcaOcasoOce/anoOchentaOchoOcioOcreOctavoOctubreOcultoOcuparOcurrirOdiarOdioOdiseaOesteOfensaOfertaOficioOfrecerOgroOi/doOi/rOjoOlaOleadaOlfatoOlivoOllaOlmoOlorOlvidoOmbligoOndaOnzaOpacoOpcio/nO/peraOpinarOponerOptarO/pticaOpuestoOracio/nOradorOralO/rbitaOrcaOrdenOrejaO/rganoOrgi/aOrgulloOrienteOrigenOrillaOroOrquestaOrugaOsadi/aOscuroOseznoOsoOstraOto~oOtroOvejaO/vuloO/xidoOxi/genoOyenteOzonoPactoPadrePaellaPa/ginaPagoPai/sPa/jaroPalabraPalcoPaletaPa/lidoPalmaPalomaPalparPanPanalPa/nicoPanteraPa~ueloPapa/PapelPapillaPaquetePararParcelaParedParirParoPa/rpadoParquePa/rrafoPartePasarPaseoPasio/nPasoPastaPataPatioPatriaPausaPautaPavoPayasoPeato/nPecadoPeceraPechoPedalPedirPegarPeinePelarPelda~oPeleaPeligroPellejoPeloPelucaPenaPensarPe~o/nPeo/nPeorPepinoPeque~oPeraPerchaPerderPerezaPerfilPericoPerlaPermisoPerroPersonaPesaPescaPe/simoPesta~aPe/taloPetro/leoPezPezu~aPicarPicho/nPiePiedraPiernaPiezaPijamaPilarPilotoPimientaPinoPintorPinzaPi~aPiojoPipaPirataPisarPiscinaPisoPistaPito/nPizcaPlacaPlanPlataPlayaPlazaPleitoPlenoPlomoPlumaPluralPobrePocoPoderPodioPoemaPoesi/aPoetaPolenPolici/aPolloPolvoPomadaPomeloPomoPompaPonerPorcio/nPortalPosadaPoseerPosiblePostePotenciaPotroPozoPradoPrecozPreguntaPremioPrensaPresoPrevioPrimoPri/ncipePrisio/nPrivarProaProbarProcesoProductoProezaProfesorProgramaProlePromesaProntoPropioPro/ximoPruebaPu/blicoPucheroPudorPuebloPuertaPuestoPulgaPulirPulmo/nPulpoPulsoPumaPuntoPu~alPu~oPupaPupilaPure/QuedarQuejaQuemarQuererQuesoQuietoQui/micaQuinceQuitarRa/banoRabiaRaboRacio/nRadicalRai/zRamaRampaRanchoRangoRapazRa/pidoRaptoRasgoRaspaRatoRayoRazaRazo/nReaccio/nRealidadReba~oReboteRecaerRecetaRechazoRecogerRecreoRectoRecursoRedRedondoReducirReflejoReformaRefra/nRefugioRegaloRegirReglaRegresoRehe/nReinoRei/rRejaRelatoRelevoRelieveRellenoRelojRemarRemedioRemoRencorRendirRentaRepartoRepetirReposoReptilResRescateResinaRespetoRestoResumenRetiroRetornoRetratoReunirReve/sRevistaReyRezarRicoRiegoRiendaRiesgoRifaRi/gidoRigorRinco/nRi~o/nRi/oRiquezaRisaRitmoRitoRizoRobleRoceRociarRodarRodeoRodillaRoerRojizoRojoRomeroRomperRonRoncoRondaRopaRoperoRosaRoscaRostroRotarRubi/RuborRudoRuedaRugirRuidoRuinaRuletaRuloRumboRumorRupturaRutaRutinaSa/badoSaberSabioSableSacarSagazSagradoSalaSaldoSaleroSalirSalmo/nSalo/nSalsaSaltoSaludSalvarSambaSancio/nSandi/aSanearSangreSanidadSanoSantoSapoSaqueSardinaSarte/nSastreSata/nSaunaSaxofo/nSeccio/nSecoSecretoSectaSedSeguirSeisSelloSelvaSemanaSemillaSendaSensorSe~alSe~orSepararSepiaSequi/aSerSerieSermo/nServirSesentaSesio/nSetaSetentaSeveroSexoSextoSidraSiestaSieteSigloSignoSi/labaSilbarSilencioSillaSi/mboloSimioSirenaSistemaSitioSituarSobreSocioSodioSolSolapaSoldadoSoledadSo/lidoSoltarSolucio/nSombraSondeoSonidoSonoroSonrisaSopaSoplarSoporteSordoSorpresaSorteoSoste/nSo/tanoSuaveSubirSucesoSudorSuegraSueloSue~oSuerteSufrirSujetoSulta/nSumarSuperarSuplirSuponerSupremoSurSurcoSure~oSurgirSustoSutilTabacoTabiqueTablaTabu/TacoTactoTajoTalarTalcoTalentoTallaTalo/nTama~oTamborTangoTanqueTapaTapeteTapiaTapo/nTaquillaTardeTareaTarifaTarjetaTarotTarroTartaTatuajeTauroTazaTazo/nTeatroTechoTeclaTe/cnicaTejadoTejerTejidoTelaTele/fonoTemaTemorTemploTenazTenderTenerTenisTensoTeori/aTerapiaTercoTe/rminoTernuraTerrorTesisTesoroTestigoTeteraTextoTezTibioTiburo/nTiempoTiendaTierraTiesoTigreTijeraTildeTimbreTi/midoTimoTintaTi/oTi/picoTipoTiraTiro/nTita/nTi/tereTi/tuloTizaToallaTobilloTocarTocinoTodoTogaToldoTomarTonoTontoToparTopeToqueTo/raxToreroTormentaTorneoToroTorpedoTorreTorsoTortugaTosToscoToserTo/xicoTrabajoTractorTraerTra/ficoTragoTrajeTramoTranceTratoTraumaTrazarTre/bolTreguaTreintaTrenTreparTresTribuTrigoTripaTristeTriunfoTrofeoTrompaTroncoTropaTroteTrozoTrucoTruenoTrufaTuberi/aTuboTuertoTumbaTumorTu/nelTu/nicaTurbinaTurismoTurnoTutorUbicarU/lceraUmbralUnidadUnirUniversoUnoUntarU~aUrbanoUrbeUrgenteUrnaUsarUsuarioU/tilUtopi/aUvaVacaVaci/oVacunaVagarVagoVainaVajillaValeVa/lidoValleValorVa/lvulaVampiroVaraVariarVaro/nVasoVecinoVectorVehi/culoVeinteVejezVelaVeleroVelozVenaVencerVendaVenenoVengarVenirVentaVenusVerVeranoVerboVerdeVeredaVerjaVersoVerterVi/aViajeVibrarVicioVi/ctimaVidaVi/deoVidrioViejoViernesVigorVilVillaVinagreVinoVi~edoVioli/nViralVirgoVirtudVisorVi/speraVistaVitaminaViudoVivazViveroVivirVivoVolca/nVolumenVolverVorazVotarVotoVozVueloVulgarYacerYateYeguaYemaYernoYesoYodoYogaYogurZafiroZanjaZapatoZarzaZonaZorroZumoZurdo".replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ").map((e => function (e) { const t = []; return Array.prototype.forEach.call((0, a.Y0)(e), (e => { 47 === e ? (t.push(204), t.push(129)) : 126 === e ? (t.push(110), t.push(204), t.push(131)) : t.push(e); })), (0, a.ZN)(t); }(e))), T.forEach(((e, t) => { E[k(e)] = t; })), "0xf74fb7092aeacdfbf8959557de22098da512207fb9f109cb526994938cf40300" !== m.check(e)))
            throw T = null, new Error("BIP39 Wordlist for es (Spanish) FAILED"); }
        const P = new class extends m {
            constructor() { super("es"); }
            getWord(e) { return B(this), T[e]; }
            getWordIndex(e) { return B(this), E[k(e)]; }
        };
        m.register(P);
        let M = null;
        const C = {};
        function L(e) { return g.checkNormalize(), (0, a.ZN)(Array.prototype.filter.call((0, a.Y0)(e.normalize("NFD").toLowerCase()), (e => e >= 65 && e <= 90 || e >= 97 && e <= 123))); }
        function F(e) { if (null == M && (M = "AbaisserAbandonAbdiquerAbeilleAbolirAborderAboutirAboyerAbrasifAbreuverAbriterAbrogerAbruptAbsenceAbsoluAbsurdeAbusifAbyssalAcade/mieAcajouAcarienAccablerAccepterAcclamerAccoladeAccrocheAccuserAcerbeAchatAcheterAcidulerAcierAcompteAcque/rirAcronymeActeurActifActuelAdepteAde/quatAdhe/sifAdjectifAdjugerAdmettreAdmirerAdopterAdorerAdoucirAdresseAdroitAdulteAdverbeAe/rerAe/ronefAffaireAffecterAfficheAffreuxAffublerAgacerAgencerAgileAgiterAgraferAgre/ableAgrumeAiderAiguilleAilierAimableAisanceAjouterAjusterAlarmerAlchimieAlerteAlge-breAlgueAlie/nerAlimentAlle/gerAlliageAllouerAllumerAlourdirAlpagaAltesseAlve/oleAmateurAmbiguAmbreAme/nagerAmertumeAmidonAmiralAmorcerAmourAmovibleAmphibieAmpleurAmusantAnalyseAnaphoreAnarchieAnatomieAncienAne/antirAngleAngoisseAnguleuxAnimalAnnexerAnnonceAnnuelAnodinAnomalieAnonymeAnormalAntenneAntidoteAnxieuxApaiserApe/ritifAplanirApologieAppareilAppelerApporterAppuyerAquariumAqueducArbitreArbusteArdeurArdoiseArgentArlequinArmatureArmementArmoireArmureArpenterArracherArriverArroserArsenicArte/rielArticleAspectAsphalteAspirerAssautAsservirAssietteAssocierAssurerAsticotAstreAstuceAtelierAtomeAtriumAtroceAttaqueAttentifAttirerAttraperAubaineAubergeAudaceAudibleAugurerAuroreAutomneAutrucheAvalerAvancerAvariceAvenirAverseAveugleAviateurAvideAvionAviserAvoineAvouerAvrilAxialAxiomeBadgeBafouerBagageBaguetteBaignadeBalancerBalconBaleineBalisageBambinBancaireBandageBanlieueBannie-reBanquierBarbierBarilBaronBarqueBarrageBassinBastionBatailleBateauBatterieBaudrierBavarderBeletteBe/lierBeloteBe/ne/ficeBerceauBergerBerlineBermudaBesaceBesogneBe/tailBeurreBiberonBicycleBiduleBijouBilanBilingueBillardBinaireBiologieBiopsieBiotypeBiscuitBisonBistouriBitumeBizarreBlafardBlagueBlanchirBlessantBlinderBlondBloquerBlousonBobardBobineBoireBoiserBolideBonbonBondirBonheurBonifierBonusBordureBorneBotteBoucleBoueuxBougieBoulonBouquinBourseBoussoleBoutiqueBoxeurBrancheBrasierBraveBrebisBre-cheBreuvageBricolerBrigadeBrillantBriocheBriqueBrochureBroderBronzerBrousseBroyeurBrumeBrusqueBrutalBruyantBuffleBuissonBulletinBureauBurinBustierButinerButoirBuvableBuvetteCabanonCabineCachetteCadeauCadreCafe/ineCaillouCaissonCalculerCalepinCalibreCalmerCalomnieCalvaireCamaradeCame/raCamionCampagneCanalCanetonCanonCantineCanularCapableCaporalCapriceCapsuleCapterCapucheCarabineCarboneCaresserCaribouCarnageCarotteCarreauCartonCascadeCasierCasqueCassureCauserCautionCavalierCaverneCaviarCe/dilleCeintureCe/lesteCelluleCendrierCensurerCentralCercleCe/re/bralCeriseCernerCerveauCesserChagrinChaiseChaleurChambreChanceChapitreCharbonChasseurChatonChaussonChavirerChemiseChenilleChe/quierChercherChevalChienChiffreChignonChime-reChiotChlorureChocolatChoisirChoseChouetteChromeChuteCigareCigogneCimenterCine/maCintrerCirculerCirerCirqueCiterneCitoyenCitronCivilClaironClameurClaquerClasseClavierClientClignerClimatClivageClocheClonageCloporteCobaltCobraCocasseCocotierCoderCodifierCoffreCognerCohe/sionCoifferCoincerCole-reColibriCollineColmaterColonelCombatCome/dieCommandeCompactConcertConduireConfierCongelerConnoterConsonneContactConvexeCopainCopieCorailCorbeauCordageCornicheCorpusCorrectCorte-geCosmiqueCostumeCotonCoudeCoupureCourageCouteauCouvrirCoyoteCrabeCrainteCravateCrayonCre/atureCre/diterCre/meuxCreuserCrevetteCriblerCrierCristalCrite-reCroireCroquerCrotaleCrucialCruelCrypterCubiqueCueillirCuille-reCuisineCuivreCulminerCultiverCumulerCupideCuratifCurseurCyanureCycleCylindreCyniqueDaignerDamierDangerDanseurDauphinDe/battreDe/biterDe/borderDe/briderDe/butantDe/calerDe/cembreDe/chirerDe/ciderDe/clarerDe/corerDe/crireDe/cuplerDe/daleDe/ductifDe/esseDe/fensifDe/filerDe/frayerDe/gagerDe/givrerDe/glutirDe/graferDe/jeunerDe/liceDe/logerDemanderDemeurerDe/molirDe/nicherDe/nouerDentelleDe/nuderDe/partDe/penserDe/phaserDe/placerDe/poserDe/rangerDe/roberDe/sastreDescenteDe/sertDe/signerDe/sobe/irDessinerDestrierDe/tacherDe/testerDe/tourerDe/tresseDevancerDevenirDevinerDevoirDiableDialogueDiamantDicterDiffe/rerDige/rerDigitalDigneDiluerDimancheDiminuerDioxydeDirectifDirigerDiscuterDisposerDissiperDistanceDivertirDiviserDocileDocteurDogmeDoigtDomaineDomicileDompterDonateurDonjonDonnerDopamineDortoirDorureDosageDoseurDossierDotationDouanierDoubleDouceurDouterDoyenDragonDraperDresserDribblerDroitureDuperieDuplexeDurableDurcirDynastieE/blouirE/carterE/charpeE/chelleE/clairerE/clipseE/cloreE/cluseE/coleE/conomieE/corceE/couterE/craserE/cre/merE/crivainE/crouE/cumeE/cureuilE/difierE/duquerEffacerEffectifEffigieEffortEffrayerEffusionE/galiserE/garerE/jecterE/laborerE/largirE/lectronE/le/gantE/le/phantE/le-veE/ligibleE/litismeE/logeE/luciderE/luderEmballerEmbellirEmbryonE/meraudeE/missionEmmenerE/motionE/mouvoirEmpereurEmployerEmporterEmpriseE/mulsionEncadrerEnche-reEnclaveEncocheEndiguerEndosserEndroitEnduireE/nergieEnfanceEnfermerEnfouirEngagerEnginEngloberE/nigmeEnjamberEnjeuEnleverEnnemiEnnuyeuxEnrichirEnrobageEnseigneEntasserEntendreEntierEntourerEntraverE/nume/rerEnvahirEnviableEnvoyerEnzymeE/olienE/paissirE/pargneE/patantE/pauleE/picerieE/pide/mieE/pierE/pilogueE/pineE/pisodeE/pitapheE/poqueE/preuveE/prouverE/puisantE/querreE/quipeE/rigerE/rosionErreurE/ruptionEscalierEspadonEspe-ceEspie-gleEspoirEspritEsquiverEssayerEssenceEssieuEssorerEstimeEstomacEstradeE/tage-reE/talerE/tancheE/tatiqueE/teindreE/tendoirE/ternelE/thanolE/thiqueEthnieE/tirerE/tofferE/toileE/tonnantE/tourdirE/trangeE/troitE/tudeEuphorieE/valuerE/vasionE/ventailE/videnceE/viterE/volutifE/voquerExactExage/rerExaucerExcellerExcitantExclusifExcuseExe/cuterExempleExercerExhalerExhorterExigenceExilerExisterExotiqueExpe/dierExplorerExposerExprimerExquisExtensifExtraireExulterFableFabuleuxFacetteFacileFactureFaiblirFalaiseFameuxFamilleFarceurFarfeluFarineFaroucheFascinerFatalFatigueFauconFautifFaveurFavoriFe/brileFe/conderFe/de/rerFe/linFemmeFe/murFendoirFe/odalFermerFe/roceFerveurFestivalFeuilleFeutreFe/vrierFiascoFicelerFictifFide-leFigureFilatureFiletageFilie-reFilleulFilmerFilouFiltrerFinancerFinirFioleFirmeFissureFixerFlairerFlammeFlasqueFlatteurFle/auFle-cheFleurFlexionFloconFloreFluctuerFluideFluvialFolieFonderieFongibleFontaineForcerForgeronFormulerFortuneFossileFoudreFouge-reFouillerFoulureFourmiFragileFraiseFranchirFrapperFrayeurFre/gateFreinerFrelonFre/mirFre/ne/sieFre-reFriableFrictionFrissonFrivoleFroidFromageFrontalFrotterFruitFugitifFuiteFureurFurieuxFurtifFusionFuturGagnerGalaxieGalerieGambaderGarantirGardienGarnirGarrigueGazelleGazonGe/antGe/latineGe/luleGendarmeGe/ne/ralGe/nieGenouGentilGe/ologieGe/ome-treGe/raniumGermeGestuelGeyserGibierGiclerGirafeGivreGlaceGlaiveGlisserGlobeGloireGlorieuxGolfeurGommeGonflerGorgeGorilleGoudronGouffreGoulotGoupilleGourmandGoutteGraduelGraffitiGraineGrandGrappinGratuitGravirGrenatGriffureGrillerGrimperGrognerGronderGrotteGroupeGrugerGrutierGruye-reGue/pardGuerrierGuideGuimauveGuitareGustatifGymnasteGyrostatHabitudeHachoirHalteHameauHangarHannetonHaricotHarmonieHarponHasardHe/liumHe/matomeHerbeHe/rissonHermineHe/ronHe/siterHeureuxHibernerHibouHilarantHistoireHiverHomardHommageHomoge-neHonneurHonorerHonteuxHordeHorizonHorlogeHormoneHorribleHouleuxHousseHublotHuileuxHumainHumbleHumideHumourHurlerHydromelHygie-neHymneHypnoseIdylleIgnorerIguaneIlliciteIllusionImageImbiberImiterImmenseImmobileImmuableImpactImpe/rialImplorerImposerImprimerImputerIncarnerIncendieIncidentInclinerIncoloreIndexerIndiceInductifIne/ditIneptieInexactInfiniInfligerInformerInfusionInge/rerInhalerInhiberInjecterInjureInnocentInoculerInonderInscrireInsecteInsigneInsoliteInspirerInstinctInsulterIntactIntenseIntimeIntrigueIntuitifInutileInvasionInventerInviterInvoquerIroniqueIrradierIrre/elIrriterIsolerIvoireIvresseJaguarJaillirJambeJanvierJardinJaugerJauneJavelotJetableJetonJeudiJeunesseJoindreJoncherJonglerJoueurJouissifJournalJovialJoyauJoyeuxJubilerJugementJuniorJuponJuristeJusticeJuteuxJuve/nileKayakKimonoKiosqueLabelLabialLabourerLace/rerLactoseLaguneLaineLaisserLaitierLambeauLamelleLampeLanceurLangageLanterneLapinLargeurLarmeLaurierLavaboLavoirLectureLe/galLe/gerLe/gumeLessiveLettreLevierLexiqueLe/zardLiasseLibe/rerLibreLicenceLicorneLie-geLie-vreLigatureLigoterLigueLimerLimiteLimonadeLimpideLine/aireLingotLionceauLiquideLisie-reListerLithiumLitigeLittoralLivreurLogiqueLointainLoisirLombricLoterieLouerLourdLoutreLouveLoyalLubieLucideLucratifLueurLugubreLuisantLumie-reLunaireLundiLuronLutterLuxueuxMachineMagasinMagentaMagiqueMaigreMaillonMaintienMairieMaisonMajorerMalaxerMale/ficeMalheurMaliceMalletteMammouthMandaterManiableManquantManteauManuelMarathonMarbreMarchandMardiMaritimeMarqueurMarronMartelerMascotteMassifMate/rielMatie-reMatraqueMaudireMaussadeMauveMaximalMe/chantMe/connuMe/dailleMe/decinMe/diterMe/duseMeilleurMe/langeMe/lodieMembreMe/moireMenacerMenerMenhirMensongeMentorMercrediMe/riteMerleMessagerMesureMe/talMe/te/oreMe/thodeMe/tierMeubleMiaulerMicrobeMietteMignonMigrerMilieuMillionMimiqueMinceMine/ralMinimalMinorerMinuteMiracleMiroiterMissileMixteMobileModerneMoelleuxMondialMoniteurMonnaieMonotoneMonstreMontagneMonumentMoqueurMorceauMorsureMortierMoteurMotifMoucheMoufleMoulinMoussonMoutonMouvantMultipleMunitionMurailleMure-neMurmureMuscleMuse/umMusicienMutationMuterMutuelMyriadeMyrtilleMyste-reMythiqueNageurNappeNarquoisNarrerNatationNationNatureNaufrageNautiqueNavireNe/buleuxNectarNe/fasteNe/gationNe/gligerNe/gocierNeigeNerveuxNettoyerNeuroneNeutronNeveuNicheNickelNitrateNiveauNobleNocifNocturneNoirceurNoisetteNomadeNombreuxNommerNormatifNotableNotifierNotoireNourrirNouveauNovateurNovembreNoviceNuageNuancerNuireNuisibleNume/roNuptialNuqueNutritifObe/irObjectifObligerObscurObserverObstacleObtenirObturerOccasionOccuperOce/anOctobreOctroyerOctuplerOculaireOdeurOdorantOffenserOfficierOffrirOgiveOiseauOisillonOlfactifOlivierOmbrageOmettreOnctueuxOndulerOne/reuxOniriqueOpaleOpaqueOpe/rerOpinionOpportunOpprimerOpterOptiqueOrageuxOrangeOrbiteOrdonnerOreilleOrganeOrgueilOrificeOrnementOrqueOrtieOscillerOsmoseOssatureOtarieOuraganOursonOutilOutragerOuvrageOvationOxydeOxyge-neOzonePaisiblePalacePalmare-sPalourdePalperPanachePandaPangolinPaniquerPanneauPanoramaPantalonPapayePapierPapoterPapyrusParadoxeParcelleParesseParfumerParlerParoleParrainParsemerPartagerParureParvenirPassionPaste-quePaternelPatiencePatronPavillonPavoiserPayerPaysagePeignePeintrePelagePe/licanPellePelousePeluchePendulePe/ne/trerPe/niblePensifPe/nuriePe/pitePe/plumPerdrixPerforerPe/riodePermuterPerplexePersilPertePeserPe/talePetitPe/trirPeuplePharaonPhobiePhoquePhotonPhrasePhysiquePianoPicturalPie-cePierrePieuvrePilotePinceauPipettePiquerPiroguePiscinePistonPivoterPixelPizzaPlacardPlafondPlaisirPlanerPlaquePlastronPlateauPleurerPlexusPliagePlombPlongerPluiePlumagePochettePoe/siePoe-tePointePoirierPoissonPoivrePolairePolicierPollenPolygonePommadePompierPonctuelPonde/rerPoneyPortiquePositionPosse/derPosturePotagerPoteauPotionPoucePoulainPoumonPourprePoussinPouvoirPrairiePratiquePre/cieuxPre/direPre/fixePre/ludePre/nomPre/sencePre/textePre/voirPrimitifPrincePrisonPriverProble-meProce/derProdigeProfondProgre-sProieProjeterProloguePromenerPropreProspe-reProte/gerProuesseProverbePrudencePruneauPsychosePublicPuceronPuiserPulpePulsarPunaisePunitifPupitrePurifierPuzzlePyramideQuasarQuerelleQuestionQuie/tudeQuitterQuotientRacineRaconterRadieuxRagondinRaideurRaisinRalentirRallongeRamasserRapideRasageRatisserRavagerRavinRayonnerRe/actifRe/agirRe/aliserRe/animerRecevoirRe/citerRe/clamerRe/colterRecruterReculerRecyclerRe/digerRedouterRefaireRe/flexeRe/formerRefrainRefugeRe/galienRe/gionRe/glageRe/gulierRe/ite/rerRejeterRejouerRelatifReleverReliefRemarqueReme-deRemiseRemonterRemplirRemuerRenardRenfortReniflerRenoncerRentrerRenvoiReplierReporterRepriseReptileRequinRe/serveRe/sineuxRe/soudreRespectResterRe/sultatRe/tablirRetenirRe/ticuleRetomberRetracerRe/unionRe/ussirRevancheRevivreRe/volteRe/vulsifRichesseRideauRieurRigideRigolerRincerRiposterRisibleRisqueRituelRivalRivie-reRocheuxRomanceRompreRonceRondinRoseauRosierRotatifRotorRotuleRougeRouilleRouleauRoutineRoyaumeRubanRubisRucheRuelleRugueuxRuinerRuisseauRuserRustiqueRythmeSablerSaboterSabreSacocheSafariSagesseSaisirSaladeSaliveSalonSaluerSamediSanctionSanglierSarcasmeSardineSaturerSaugrenuSaumonSauterSauvageSavantSavonnerScalpelScandaleSce/le/ratSce/narioSceptreSche/maScienceScinderScoreScrutinSculpterSe/anceSe/cableSe/cherSecouerSe/cre/terSe/datifSe/duireSeigneurSe/jourSe/lectifSemaineSemblerSemenceSe/minalSe/nateurSensibleSentenceSe/parerSe/quenceSereinSergentSe/rieuxSerrureSe/rumServiceSe/sameSe/virSevrageSextupleSide/ralSie-cleSie/gerSifflerSigleSignalSilenceSiliciumSimpleSince-reSinistreSiphonSiropSismiqueSituerSkierSocialSocleSodiumSoigneuxSoldatSoleilSolitudeSolubleSombreSommeilSomnolerSondeSongeurSonnetteSonoreSorcierSortirSosieSottiseSoucieuxSoudureSouffleSouleverSoupapeSourceSoutirerSouvenirSpacieuxSpatialSpe/cialSphe-reSpiralStableStationSternumStimulusStipulerStrictStudieuxStupeurStylisteSublimeSubstratSubtilSubvenirSucce-sSucreSuffixeSugge/rerSuiveurSulfateSuperbeSupplierSurfaceSuricateSurmenerSurpriseSursautSurvieSuspectSyllabeSymboleSyme/trieSynapseSyntaxeSyste-meTabacTablierTactileTaillerTalentTalismanTalonnerTambourTamiserTangibleTapisTaquinerTarderTarifTartineTasseTatamiTatouageTaupeTaureauTaxerTe/moinTemporelTenailleTendreTeneurTenirTensionTerminerTerneTerribleTe/tineTexteThe-meThe/orieThe/rapieThoraxTibiaTie-deTimideTirelireTiroirTissuTitaneTitreTituberTobogganTole/rantTomateToniqueTonneauToponymeTorcheTordreTornadeTorpilleTorrentTorseTortueTotemToucherTournageTousserToxineTractionTraficTragiqueTrahirTrainTrancherTravailTre-fleTremperTre/sorTreuilTriageTribunalTricoterTrilogieTriompheTriplerTriturerTrivialTromboneTroncTropicalTroupeauTuileTulipeTumulteTunnelTurbineTuteurTutoyerTuyauTympanTyphonTypiqueTyranUbuesqueUltimeUltrasonUnanimeUnifierUnionUniqueUnitaireUniversUraniumUrbainUrticantUsageUsineUsuelUsureUtileUtopieVacarmeVaccinVagabondVagueVaillantVaincreVaisseauValableValiseVallonValveVampireVanilleVapeurVarierVaseuxVassalVasteVecteurVedetteVe/ge/talVe/hiculeVeinardVe/loceVendrediVe/ne/rerVengerVenimeuxVentouseVerdureVe/rinVernirVerrouVerserVertuVestonVe/te/ranVe/tusteVexantVexerViaducViandeVictoireVidangeVide/oVignetteVigueurVilainVillageVinaigreViolonVipe-reVirementVirtuoseVirusVisageViseurVisionVisqueuxVisuelVitalVitesseViticoleVitrineVivaceVivipareVocationVoguerVoileVoisinVoitureVolailleVolcanVoltigerVolumeVoraceVortexVoterVouloirVoyageVoyelleWagonXe/nonYachtZe-breZe/nithZesteZoologie".replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ").map((e => function (e) { const t = []; return Array.prototype.forEach.call((0, a.Y0)(e), (e => { 47 === e ? (t.push(204), t.push(129)) : 45 === e ? (t.push(204), t.push(128)) : t.push(e); })), (0, a.ZN)(t); }(e))), M.forEach(((e, t) => { C[L(e)] = t; })), "0x51deb7ae009149dc61a6bd18a918eb7ac78d2775726c68e598b92d002519b045" !== m.check(e)))
            throw M = null, new Error("BIP39 Wordlist for fr (French) FAILED"); }
        const O = new class extends m {
            constructor() { super("fr"); }
            getWord(e) { return F(this), M[e]; }
            getWordIndex(e) { return F(this), C[L(e)]; }
        };
        m.register(O);
        const x = ["AQRASRAGBAGUAIRAHBAghAURAdBAdcAnoAMEAFBAFCBKFBQRBSFBCXBCDBCHBGFBEQBpBBpQBIkBHNBeOBgFBVCBhBBhNBmOBmRBiHBiFBUFBZDBvFBsXBkFBlcBjYBwDBMBBTBBTRBWBBWXXaQXaRXQWXSRXCFXYBXpHXOQXHRXhRXuRXmXXbRXlXXwDXTRXrCXWQXWGaBWaKcaYgasFadQalmaMBacAKaRKKBKKXKKjKQRKDRKCYKCRKIDKeVKHcKlXKjHKrYNAHNBWNaRNKcNIBNIONmXNsXNdXNnBNMBNRBNrXNWDNWMNFOQABQAHQBrQXBQXFQaRQKXQKDQKOQKFQNBQNDQQgQCXQCDQGBQGDQGdQYXQpBQpQQpHQLXQHuQgBQhBQhCQuFQmXQiDQUFQZDQsFQdRQkHQbRQlOQlmQPDQjDQwXQMBQMDQcFQTBQTHQrDDXQDNFDGBDGQDGRDpFDhFDmXDZXDbRDMYDRdDTRDrXSAhSBCSBrSGQSEQSHBSVRShYShkSyQSuFSiBSdcSoESocSlmSMBSFBSFKSFNSFdSFcCByCaRCKcCSBCSRCCrCGbCEHCYXCpBCpQCIBCIHCeNCgBCgFCVECVcCmkCmwCZXCZFCdRClOClmClFCjDCjdCnXCwBCwXCcRCFQCFjGXhGNhGDEGDMGCDGCHGIFGgBGVXGVEGVRGmXGsXGdYGoSGbRGnXGwXGwDGWRGFNGFLGFOGFdGFkEABEBDEBFEXOEaBEKSENBENDEYXEIgEIkEgBEgQEgHEhFEudEuFEiBEiHEiFEZDEvBEsXEsFEdXEdREkFEbBEbRElFEPCEfkEFNYAEYAhYBNYQdYDXYSRYCEYYoYgQYgRYuRYmCYZTYdBYbEYlXYjQYRbYWRpKXpQopQnpSFpCXpIBpISphNpdBpdRpbRpcZpFBpFNpFDpFopFrLADLBuLXQLXcLaFLCXLEhLpBLpFLHXLeVLhILdHLdRLoDLbRLrXIABIBQIBCIBsIBoIBMIBRIXaIaRIKYIKRINBINuICDIGBIIDIIkIgRIxFIyQIiHIdRIbYIbRIlHIwRIMYIcRIRVITRIFBIFNIFQOABOAFOBQOaFONBONMOQFOSFOCDOGBOEQOpBOLXOIBOIFOgQOgFOyQOycOmXOsXOdIOkHOMEOMkOWWHBNHXNHXWHNXHDuHDRHSuHSRHHoHhkHmRHdRHkQHlcHlRHwBHWcgAEgAggAkgBNgBQgBEgXOgYcgLXgHjgyQgiBgsFgdagMYgWSgFQgFEVBTVXEVKBVKNVKDVKYVKRVNBVNYVDBVDxVSBVSRVCjVGNVLXVIFVhBVhcVsXVdRVbRVlRhBYhKYhDYhGShxWhmNhdahdkhbRhjohMXhTRxAXxXSxKBxNBxEQxeNxeQxhXxsFxdbxlHxjcxFBxFNxFQxFOxFoyNYyYoybcyMYuBQuBRuBruDMuCouHBudQukkuoBulVuMXuFEmCYmCRmpRmeDmiMmjdmTFmFQiADiBOiaRiKRiNBiNRiSFiGkiGFiERipRiLFiIFihYibHijBijEiMXiWBiFBiFCUBQUXFUaRUNDUNcUNRUNFUDBUSHUCDUGBUGFUEqULNULoUIRUeEUeYUgBUhFUuRUiFUsXUdFUkHUbBUjSUjYUwXUMDUcHURdUTBUrBUrXUrQZAFZXZZaRZKFZNBZQFZCXZGBZYdZpBZLDZIFZHXZHNZeQZVRZVFZmXZiBZvFZdFZkFZbHZbFZwXZcCZcRZRBvBQvBGvBLvBWvCovMYsAFsBDsaRsKFsNFsDrsSHsSFsCXsCRsEBsEHsEfspBsLBsLDsIgsIRseGsbRsFBsFQsFSdNBdSRdCVdGHdYDdHcdVbdySduDdsXdlRdwXdWYdWcdWRkBMkXOkaRkNIkNFkSFkCFkYBkpRkeNkgBkhVkmXksFklVkMBkWDkFNoBNoaQoaFoNBoNXoNaoNEoSRoEroYXoYCoYbopRopFomXojkowXorFbBEbEIbdBbjYlaRlDElMXlFDjKjjSRjGBjYBjYkjpRjLXjIBjOFjeVjbRjwBnXQnSHnpFnLXnINnMBnTRwXBwXNwXYwNFwQFwSBwGFwLXwLDweNwgBwuHwjDwnXMBXMpFMIBMeNMTHcaQcNBcDHcSFcCXcpBcLXcLDcgFcuFcnXcwXccDcTQcrFTQErXNrCHrpFrgFrbFrTHrFcWNYWNbWEHWMXWTR", "ABGHABIJAEAVAYJQALZJAIaRAHNXAHdcAHbRAZJMAZJRAZTRAdVJAklmAbcNAjdRAMnRAMWYAWpRAWgRAFgBAFhBAFdcBNJBBNJDBQKBBQhcBQlmBDEJBYJkBYJTBpNBBpJFBIJBBIJDBIcABOKXBOEJBOVJBOiJBOZJBepBBeLXBeIFBegBBgGJBVJXBuocBiJRBUJQBlXVBlITBwNFBMYVBcqXBTlmBWNFBWiJBWnRBFGHBFwXXKGJXNJBXNZJXDTTXSHSXSVRXSlHXCJDXGQJXEhXXYQJXYbRXOfXXeNcXVJFXhQJXhEJXdTRXjdXXMhBXcQTXRGBXTEBXTnQXFCXXFOFXFgFaBaFaBNJaBCJaBpBaBwXaNJKaNJDaQIBaDpRaEPDaHMFamDJalEJaMZJaFaFaFNBaFQJaFLDaFVHKBCYKBEBKBHDKXaFKXGdKXEJKXpHKXIBKXZDKXwXKKwLKNacKNYJKNJoKNWcKDGdKDTRKChXKGaRKGhBKGbRKEBTKEaRKEPTKLMDKLWRKOHDKVJcKdBcKlIBKlOPKFSBKFEPKFpFNBNJNJBQNBGHNBEPNBHXNBgFNBVXNBZDNBsXNBwXNNaRNNJDNNJENNJkNDCJNDVDNGJRNJiDNZJNNsCJNJFNNFSBNFCXNFEPNFLXNFIFQJBFQCaRQJEQQLJDQLJFQIaRQOqXQHaFQHHQQVJXQVJDQhNJQmEIQZJFQsJXQJrFQWbRDJABDBYJDXNFDXCXDXLXDXZDDXsJDQqXDSJFDJCXDEPkDEqXDYmQDpSJDOCkDOGQDHEIDVJDDuDuDWEBDJFgSBNDSBSFSBGHSBIBSBTQSKVYSJQNSJQiSJCXSEqXSJYVSIiJSOMYSHAHSHaQSeCFSepQSegBSHdHSHrFShSJSJuHSJUFSkNRSrSrSWEBSFaHSJFQSFCXSFGDSFYXSFODSFgBSFVXSFhBSFxFSFkFSFbBSFMFCADdCJXBCXaFCXKFCXNFCXCXCXGBCXEJCXYBCXLDCXIBCXOPCXHXCXgBCXhBCXiBCXlDCXcHCJNBCJNFCDCJCDGBCDVXCDhBCDiDCDJdCCmNCpJFCIaRCOqXCHCHCHZJCViJCuCuCmddCJiFCdNBCdHhClEJCnUJCreSCWlgCWTRCFBFCFNBCFYBCFVFCFhFCFdSCFTBCFWDGBNBGBQFGJBCGBEqGBpBGBgQGNBEGNJYGNkOGNJRGDUFGJpQGHaBGJeNGJeEGVBlGVKjGiJDGvJHGsVJGkEBGMIJGWjNGFBFGFCXGFGBGFYXGFpBGFMFEASJEAWpEJNFECJVEIXSEIQJEOqXEOcFEeNcEHEJEHlFEJgFEhlmEmDJEmZJEiMBEUqXEoSREPBFEPXFEPKFEPSFEPEFEPpFEPLXEPIBEJPdEPcFEPTBEJnXEqlHEMpREFCXEFODEFcFYASJYJAFYBaBYBVXYXpFYDhBYCJBYJGFYYbRYeNcYJeVYiIJYZJcYvJgYvJRYJsXYsJFYMYMYreVpBNHpBEJpBwXpQxFpYEJpeNDpJeDpeSFpeCHpHUJpHbBpHcHpmUJpiiJpUJrpsJuplITpFaBpFQqpFGBpFEfpFYBpFpBpFLJpFIDpFgBpFVXpFyQpFuFpFlFpFjDpFnXpFwXpJFMpFTBLXCJLXEFLXhFLXUJLXbFLalmLNJBLSJQLCLCLGJBLLDJLHaFLeNFLeSHLeCXLepFLhaRLZsJLsJDLsJrLocaLlLlLMdbLFNBLFSBLFEHLFkFIBBFIBXFIBaQIBKXIBSFIBpHIBLXIBgBIBhBIBuHIBmXIBiFIBZXIBvFIBbFIBjQIBwXIBWFIKTRIQUJIDGFICjQIYSRIINXIJeCIVaRImEkIZJFIvJRIsJXIdCJIJoRIbBQIjYBIcqXITFVIreVIFKFIFSFIFCJIFGFIFLDIFIBIJFOIFgBIFVXIJFhIFxFIFmXIFdHIFbBIJFrIJFWOBGBOQfXOOKjOUqXOfXBOqXEOcqXORVJOFIBOFlDHBIOHXiFHNTRHCJXHIaRHHJDHHEJHVbRHZJYHbIBHRsJHRkDHWlmgBKFgBSBgBCDgBGHgBpBgBIBgBVJgBuBgBvFgKDTgQVXgDUJgGSJgOqXgmUMgZIJgTUJgWIEgFBFgFNBgFDJgFSFgFGBgFYXgJFOgFgQgFVXgFhBgFbHgJFWVJABVQKcVDgFVOfXVeDFVhaRVmGdViJYVMaRVFNHhBNDhBCXhBEqhBpFhBLXhNJBhSJRheVXhhKEhxlmhZIJhdBQhkIJhbMNhMUJhMZJxNJgxQUJxDEkxDdFxSJRxplmxeSBxeCXxeGFxeYXxepQxegBxWVcxFEQxFLXxFIBxFgBxFxDxFZtxFdcxFbBxFwXyDJXyDlcuASJuDJpuDIBuCpJuGSJuIJFueEFuZIJusJXudWEuoIBuWGJuFBcuFKEuFNFuFQFuFDJuFGJuFVJuFUtuFdHuFTBmBYJmNJYmQhkmLJDmLJomIdXmiJYmvJRmsJRmklmmMBymMuCmclmmcnQiJABiJBNiJBDiBSFiBCJiBEFiBYBiBpFiBLXiBTHiJNciDEfiCZJiECJiJEqiOkHiHKFieNDiHJQieQcieDHieSFieCXieGFieEFieIHiegFihUJixNoioNXiFaBiFKFiFNDiFEPiFYXitFOitFHiFgBiFVEiFmXiFitiFbBiFMFiFrFUCXQUIoQUIJcUHQJUeCEUHwXUUJDUUqXUdWcUcqXUrnQUFNDUFSHUFCFUFEfUFLXUtFOZBXOZXSBZXpFZXVXZEQJZEJkZpDJZOqXZeNHZeCDZUqXZFBQZFEHZFLXvBAFvBKFvBCXvBEPvBpHvBIDvBgFvBuHvQNJvFNFvFGBvFIBvJFcsXCDsXLXsXsXsXlFsXcHsQqXsJQFsEqXseIFsFEHsFjDdBxOdNpRdNJRdEJbdpJRdhZJdnSJdrjNdFNJdFQHdFhNkNJDkYaRkHNRkHSRkVbRkuMRkjSJkcqDoSJFoEiJoYZJoOfXohEBoMGQocqXbBAFbBXFbBaFbBNDbBGBbBLXbBTBbBWDbGJYbIJHbFQqbFpQlDgQlOrFlVJRjGEBjZJRnXvJnXbBnEfHnOPDngJRnxfXnUJWwXEJwNpJwDpBwEfXwrEBMDCJMDGHMDIJMLJDcQGDcQpHcqXccqNFcqCXcFCJRBSBRBGBRBEJRBpQTBNFTBQJTBpBTBVXTFABTFSBTFCFTFGBTFMDrXCJrXLDrDNJrEfHrFQJrFitWNjdWNTR", "AKLJMANOPFASNJIAEJWXAYJNRAIIbRAIcdaAeEfDAgidRAdjNYAMYEJAMIbRAFNJBAFpJFBBIJYBDZJFBSiJhBGdEBBEJfXBEJqXBEJWRBpaUJBLXrXBIYJMBOcfXBeEfFBestXBjNJRBcDJOBFEqXXNvJRXDMBhXCJNYXOAWpXONJWXHDEBXeIaRXhYJDXZJSJXMDJOXcASJXFVJXaBQqXaBZJFasXdQaFSJQaFEfXaFpJHaFOqXKBNSRKXvJBKQJhXKEJQJKEJGFKINJBKIJjNKgJNSKVElmKVhEBKiJGFKlBgJKjnUJKwsJYKMFIJKFNJDKFIJFKFOfXNJBSFNJBCXNBpJFNJBvQNJBMBNJLJXNJOqXNJeCXNJeGFNdsJCNbTKFNwXUJQNFEPQDiJcQDMSJQSFpBQGMQJQJeOcQyCJEQUJEBQJFBrQFEJqDXDJFDJXpBDJXIMDGiJhDIJGRDJeYcDHrDJDVXgFDkAWpDkIgRDjDEqDMvJRDJFNFDJFIBSKclmSJQOFSJQVHSJQjDSJGJBSJGJFSECJoSHEJqSJHTBSJVJDSViJYSZJNBSJsJDSFSJFSFEfXSJFLXCBUJVCJXSBCJXpBCXVJXCJXsXCJXdFCJNJHCLIJgCHiJFCVNJMChCJhCUHEJCsJTRCJdYcCoQJCCFEfXCFIJgCFUJxCFstFGJBaQGJBIDGQJqXGYJNRGJHKFGeQqDGHEJFGJeLXGHIiJGHdBlGUJEBGkIJTGFQPDGJFEqEAGegEJIJBEJVJXEhQJTEiJNcEJZJFEJoEqEjDEqEPDsXEPGJBEPOqXEPeQFEfDiDEJfEFEfepQEfMiJEqXNBEqDIDEqeSFEqVJXEMvJRYXNJDYXEJHYKVJcYYJEBYJeEcYJUqXYFpJFYFstXpAZJMpBSJFpNBNFpeQPDpHLJDpHIJFpHgJFpeitFpHZJFpJFADpFSJFpJFCJpFOqXpFitBpJFZJLXIJFLIJgRLVNJWLVHJMLwNpJLFGJBLFLJDLFOqXLJFUJIBDJXIBGJBIJBYQIJBIBIBOqXIBcqDIEGJFILNJTIIJEBIOiJhIJeNBIJeIBIhiJIIWoTRIJFAHIJFpBIJFuHIFUtFIJFTHOSBYJOEcqXOHEJqOvBpFOkVJrObBVJOncqDOcNJkHhNJRHuHJuHdMhBgBUqXgBsJXgONJBgHNJDgHHJQgJeitgHsJXgJyNagyDJBgZJDrgsVJQgkEJNgkjSJgJFAHgFCJDgFZtMVJXNFVXQfXVJXDJVXoQJVQVJQVDEfXVDvJHVEqNFVeQfXVHpJFVHxfXVVJSRVVmaRVlIJOhCXVJhHjYkhxCJVhWVUJhWiJcxBNJIxeEqDxfXBFxcFEPxFSJFxFYJXyBDQJydaUJyFOPDuYCJYuLvJRuHLJXuZJLDuFOPDuFZJHuFcqXmKHJdmCQJcmOsVJiJAGFitLCFieOfXiestXiZJMEikNJQirXzFiFQqXiFIJFiFZJFiFvtFUHpJFUteIcUteOcUVCJkUhdHcUbEJEUJqXQUMNJhURjYkUFitFZDGJHZJIxDZJVJXZJFDJZJFpQvBNJBvBSJFvJxBrseQqDsVFVJdFLJDkEJNBkmNJYkFLJDoQJOPoGsJRoEAHBoEJfFbBQqDbBZJHbFVJXlFIJBjYIrXjeitcjjCEBjWMNBwXQfXwXOaFwDsJXwCJTRwrCZJMDNJQcDDJFcqDOPRYiJFTBsJXTQIJBTFEfXTFLJDrXEJFrEJXMrFZJFWEJdEWYTlm", "ABCDEFACNJTRAMBDJdAcNJVXBLNJEBXSIdWRXErNJkXYDJMBXZJCJaXMNJaYKKVJKcKDEJqXKDcNJhKVJrNYKbgJVXKFVJSBNBYBwDNJeQfXNJeEqXNhGJWENJFiJRQlIJbEQJfXxDQqXcfXQFNDEJQFwXUJDYcnUJDJIBgQDIUJTRDJFEqDSJQSJFSJQIJFSOPeZtSJFZJHCJXQfXCTDEqFGJBSJFGJBOfXGJBcqXGJHNJDGJRLiJEJfXEqEJFEJPEFpBEJYJBZJFYBwXUJYiJMEBYJZJyTYTONJXpQMFXFpeGIDdpJFstXpJFcPDLBVSJRLHQJqXLJFZJFIJBNJDIJBUqXIBkFDJIJEJPTIYJGWRIJeQPDIJeEfHIJFsJXOqGDSFHXEJqXgJCsJCgGQJqXgdQYJEgFMFNBgJFcqDVJwXUJVJFZJchIgJCCxOEJqXxOwXUJyDJBVRuscisciJBiJBieUtqXiJFDJkiFsJXQUGEZJcUJFsJXZtXIrXZDZJDrZJFNJDZJFstXvJFQqXvJFCJEsJXQJqkhkNGBbDJdTRbYJMEBlDwXUJMEFiJFcfXNJDRcNJWMTBLJXC", "BraFUtHBFSJFdbNBLJXVJQoYJNEBSJBEJfHSJHwXUJCJdAZJMGjaFVJXEJPNJBlEJfFiJFpFbFEJqIJBVJCrIBdHiJhOPFChvJVJZJNJWxGFNIFLueIBQJqUHEJfUFstOZJDrlXEASJRlXVJXSFwVJNJWD", "QJEJNNJDQJEJIBSFQJEJxegBQJEJfHEPSJBmXEJFSJCDEJqXLXNJFQqXIcQsFNJFIFEJqXUJgFsJXIJBUJEJfHNFvJxEqXNJnXUJFQqD", "IJBEJqXZJ"];
        let N = null;
        function R(e) { return (0, i.hexlify)((0, a.Y0)(e)); }
        function I(e) { if (null !== N)
            return; N = []; const t = {}; function r(e) { let r = ""; for (let n = 0; n < e.length; n++) {
            let i = e[n];
            const o = t[i];
            !1 !== o && (o && (i = o), r += i);
        } return r; } t[(0, a.ZN)([227, 130, 154])] = !1, t[(0, a.ZN)([227, 130, 153])] = !1, t[(0, a.ZN)([227, 130, 133])] = (0, a.ZN)([227, 130, 134]), t[(0, a.ZN)([227, 129, 163])] = (0, a.ZN)([227, 129, 164]), t[(0, a.ZN)([227, 130, 131])] = (0, a.ZN)([227, 130, 132]), t[(0, a.ZN)([227, 130, 135])] = (0, a.ZN)([227, 130, 136]); for (let e = 3; e <= 9; e++) {
            const t = x[e - 3];
            for (let r = 0; r < t.length; r += e) {
                const n = [];
                for (let i = 0; i < e; i++) {
                    const e = "~~AzB~X~a~KN~Q~D~S~C~G~E~Y~p~L~I~O~eH~g~V~hxyumi~~U~~Z~~v~~s~~dkoblPjfnqwMcRTr~W~~~F~~~~~Jt".indexOf(t[r + i]);
                    n.push(227), n.push(64 & e ? 130 : 129), n.push(128 + (63 & e));
                }
                N.push((0, a.ZN)(n));
            }
        } if (N.sort((function (e, t) { return (e = r(e)) < (t = r(t)) ? -1 : e > t ? 1 : 0; })), "0xe3818de38284e3818f" === R(N[442]) && "0xe3818de38283e3818f" === R(N[443])) {
            const e = N[442];
            N[442] = N[443], N[443] = e;
        } if ("0xcb36b09e6baa935787fd762ce65e80b0c6a8dabdfbc3a7f86ac0e2c4fd111600" !== m.check(e))
            throw N = null, new Error("BIP39 Wordlist for ja (Japanese) FAILED"); }
        const D = new class extends m {
            constructor() { super("ja"); }
            getWord(e) { return I(this), N[e]; }
            getWordIndex(e) { return I(this), N.indexOf(e); }
            split(e) { return g.checkNormalize(), e.split(/(?:\u3000| )+/g); }
            join(e) { return e.join("　"); }
        };
        m.register(D);
        const J = ["OYAa", "ATAZoATBl3ATCTrATCl8ATDloATGg3ATHT8ATJT8ATJl3ATLlvATLn4ATMT8ATMX8ATMboATMgoAToLbAToMTATrHgATvHnAT3AnAT3JbAT3MTAT8DbAT8JTAT8LmAT8MYAT8MbAT#LnAUHT8AUHZvAUJXrAUJX8AULnrAXJnvAXLUoAXLgvAXMn6AXRg3AXrMbAX3JTAX3QbAYLn3AZLgvAZrSUAZvAcAZ8AaAZ8AbAZ8AnAZ8HnAZ8LgAZ8MYAZ8MgAZ8OnAaAboAaDTrAaFTrAaJTrAaJboAaLVoAaMXvAaOl8AaSeoAbAUoAbAg8AbAl4AbGnrAbMT8AbMXrAbMn4AbQb8AbSV8AbvRlAb8AUAb8AnAb8HgAb8JTAb8NTAb8RbAcGboAcLnvAcMT8AcMX8AcSToAcrAaAcrFnAc8AbAc8MgAfGgrAfHboAfJnvAfLV8AfLkoAfMT8AfMnoAfQb8AfScrAfSgrAgAZ8AgFl3AgGX8AgHZvAgHgrAgJXoAgJX8AgJboAgLZoAgLn4AgOX8AgoATAgoAnAgoCUAgoJgAgoLXAgoMYAgoSeAgrDUAgrJTAhrFnAhrLjAhrQgAjAgoAjJnrAkMX8AkOnoAlCTvAlCV8AlClvAlFg4AlFl6AlFn3AloSnAlrAXAlrAfAlrFUAlrFbAlrGgAlrOXAlvKnAlvMTAl3AbAl3MnAnATrAnAcrAnCZ3AnCl8AnDg8AnFboAnFl3AnHX4AnHbrAnHgrAnIl3AnJgvAnLXoAnLX4AnLbrAnLgrAnLhrAnMXoAnMgrAnOn3AnSbrAnSeoAnvLnAn3OnCTGgvCTSlvCTvAUCTvKnCTvNTCT3CZCT3GUCT3MTCT8HnCUCZrCULf8CULnvCU3HnCU3JUCY6NUCbDb8CbFZoCbLnrCboOTCboScCbrFnCbvLnCb8AgCb8HgCb$LnCkLfoClBn3CloDUDTHT8DTLl3DTSU8DTrAaDTrLXDTrLjDTrOYDTrOgDTvFXDTvFnDT3HUDT3LfDUCT9DUDT4DUFVoDUFV8DUFkoDUGgrDUJnrDULl8DUMT8DUMXrDUMX4DUMg8DUOUoDUOgvDUOg8DUSToDUSZ8DbDXoDbDgoDbGT8DbJn3DbLg3DbLn4DbMXrDbMg8DbOToDboJXGTClvGTDT8GTFZrGTLVoGTLlvGTLl3GTMg8GTOTvGTSlrGToCUGTrDgGTrJYGTrScGTtLnGTvAnGTvQgGUCZrGUDTvGUFZoGUHXrGULnvGUMT8GUoMgGXoLnGXrMXGXrMnGXvFnGYLnvGZOnvGZvOnGZ8LaGZ8LmGbAl3GbDYvGbDlrGbHX3GbJl4GbLV8GbLn3GbMn4GboJTGboRfGbvFUGb3GUGb4JnGgDX3GgFl$GgJlrGgLX6GgLZoGgLf8GgOXoGgrAgGgrJXGgrMYGgrScGgvATGgvOYGnAgoGnJgvGnLZoGnLg3GnLnrGnQn8GnSbrGnrMgHTClvHTDToHTFT3HTQT8HToJTHToJgHTrDUHTrMnHTvFYHTvRfHT8MnHT8SUHUAZ8HUBb4HUDTvHUoMYHXFl6HXJX6HXQlrHXrAUHXrMnHXrSbHXvFYHXvKXHX3LjHX3MeHYvQlHZrScHZvDbHbAcrHbFT3HbFl3HbJT8HbLTrHbMT8HbMXrHbMbrHbQb8HbSX3HboDbHboJTHbrFUHbrHgHbrJTHb8JTHb8MnHb8QgHgAlrHgDT3HgGgrHgHgrHgJTrHgJT8HgLX@HgLnrHgMT8HgMX8HgMboHgOnrHgQToHgRg3HgoHgHgrCbHgrFnHgrLVHgvAcHgvAfHnAloHnCTrHnCnvHnGTrHnGZ8HnGnvHnJT8HnLf8HnLkvHnMg8HnRTrITvFUITvFnJTAXrJTCV8JTFT3JTFT8JTFn4JTGgvJTHT8JTJT8JTJXvJTJl3JTJnvJTLX4JTLf8JTLhvJTMT8JTMXrJTMnrJTObrJTQT8JTSlvJT8DUJT8FkJT8MTJT8OXJT8OgJT8QUJT8RfJUHZoJXFT4JXFlrJXGZ8JXGnrJXLV8JXLgvJXMXoJXMX3JXNboJXPlvJXoJTJXoLkJXrAXJXrHUJXrJgJXvJTJXvOnJX4KnJYAl3JYJT8JYLhvJYQToJYrQXJY6NUJbAl3JbCZrJbDloJbGT8JbGgrJbJXvJbJboJbLf8JbLhrJbLl3JbMnvJbRg8JbSZ8JboDbJbrCZJbrSUJb3KnJb8LnJfRn8JgAXrJgCZrJgDTrJgGZrJgGZ8JgHToJgJT8JgJXoJgJgvJgLX4JgLZ3JgLZ8JgLn4JgMgrJgMn4JgOgvJgPX6JgRnvJgSToJgoCZJgoJbJgoMYJgrJXJgrJgJgrLjJg6MTJlCn3JlGgvJlJl8Jl4AnJl8FnJl8HgJnAToJnATrJnAbvJnDUoJnGnrJnJXrJnJXvJnLhvJnLnrJnLnvJnMToJnMT8JnMXvJnMX3JnMg8JnMlrJnMn4JnOX8JnST4JnSX3JnoAgJnoAnJnoJTJnoObJnrAbJnrAkJnrHnJnrJTJnrJYJnrOYJnrScJnvCUJnvFaJnvJgJnvJnJnvOYJnvQUJnvRUJn3FnJn3JTKnFl3KnLT6LTDlvLTMnoLTOn3LTRl3LTSb4LTSlrLToAnLToJgLTrAULTrAcLTrCULTrHgLTrMgLT3JnLULnrLUMX8LUoJgLVATrLVDTrLVLb8LVoJgLV8MgLV8RTLXDg3LXFlrLXrCnLXrLXLX3GTLX4GgLX4OYLZAXrLZAcrLZAgrLZAhrLZDXyLZDlrLZFbrLZFl3LZJX6LZJX8LZLc8LZLnrLZSU8LZoJTLZoJnLZrAgLZrAnLZrJYLZrLULZrMgLZrSkLZvAnLZvGULZvJeLZvOTLZ3FZLZ4JXLZ8STLZ8ScLaAT3LaAl3LaHT8LaJTrLaJT8LaJXrLaJgvLaJl4LaLVoLaMXrLaMXvLaMX8LbClvLbFToLbHlrLbJn4LbLZ3LbLhvLbMXrLbMnoLbvSULcLnrLc8HnLc8MTLdrMnLeAgoLeOgvLeOn3LfAl3LfLnvLfMl3LfOX8Lf8AnLf8JXLf8LXLgJTrLgJXrLgJl8LgMX8LgRZrLhCToLhrAbLhrFULhrJXLhvJYLjHTrLjHX4LjJX8LjLhrLjSX3LjSZ4LkFX4LkGZ8LkGgvLkJTrLkMXoLkSToLkSU8LkSZ8LkoOYLl3FfLl3MgLmAZrLmCbrLmGgrLmHboLmJnoLmJn3LmLfoLmLhrLmSToLnAX6LnAb6LnCZ3LnCb3LnDTvLnDb8LnFl3LnGnrLnHZvLnHgvLnITvLnJT8LnJX8LnJlvLnLf8LnLg6LnLhvLnLnoLnMXrLnMg8LnQlvLnSbrLnrAgLnrAnLnrDbLnrFkLnrJdLnrMULnrOYLnrSTLnvAnLnvDULnvHgLnvOYLnvOnLn3GgLn4DULn4JTLn4JnMTAZoMTAloMTDb8MTFT8MTJnoMTJnrMTLZrMTLhrMTLkvMTMX8MTRTrMToATMTrDnMTrOnMT3JnMT4MnMT8FUMT8FaMT8FlMT8GTMT8GbMT8GnMT8HnMT8JTMT8JbMT8OTMUCl8MUJTrMUJU8MUMX8MURTrMUSToMXAX6MXAb6MXCZoMXFXrMXHXrMXLgvMXOgoMXrAUMXrAnMXrHgMXrJYMXrJnMXrMTMXrMgMXrOYMXrSZMXrSgMXvDUMXvOTMX3JgMX3OTMX4JnMX8DbMX8FnMX8HbMX8HgMX8HnMX8LbMX8MnMX8OnMYAb8MYGboMYHTvMYHX4MYLTrMYLnvMYMToMYOgvMYRg3MYSTrMbAToMbAXrMbAl3MbAn8MbGZ8MbJT8MbJXrMbMXvMbMX8MbMnoMbrMUMb8AfMb8FbMb8FkMcJXoMeLnrMgFl3MgGTvMgGXoMgGgrMgGnrMgHT8MgHZrMgJnoMgLnrMgLnvMgMT8MgQUoMgrHnMgvAnMg8HgMg8JYMg8LfMloJnMl8ATMl8AXMl8JYMnAToMnAT4MnAZ8MnAl3MnAl4MnCl8MnHT8MnHg8MnJnoMnLZoMnLhrMnMXoMnMX3MnMnrMnOgvMnrFbMnrFfMnrFnMnrNTMnvJXNTMl8OTCT3OTFV8OTFn3OTHZvOTJXrOTOl3OT3ATOT3JUOT3LZOT3LeOT3MbOT8ATOT8AbOT8AgOT8MbOUCXvOUMX3OXHXvOXLl3OXrMUOXvDbOX6NUOX8JbOYFZoOYLbrOYLkoOYMg8OYSX3ObHTrObHT4ObJgrObLhrObMX3ObOX8Ob8FnOeAlrOeJT8OeJXrOeJnrOeLToOeMb8OgJXoOgLXoOgMnrOgOXrOgOloOgoAgOgoJbOgoMYOgoSTOg8AbOjLX4OjMnoOjSV8OnLVoOnrAgOn3DUPXQlrPXvFXPbvFTPdAT3PlFn3PnvFbQTLn4QToAgQToMTQULV8QURg8QUoJnQXCXvQbFbrQb8AaQb8AcQb8FbQb8MYQb8ScQeAlrQeLhrQjAn3QlFXoQloJgQloSnRTLnvRTrGURTrJTRUJZrRUoJlRUrQnRZrLmRZrMnRZrSnRZ8ATRZ8JbRZ8ScRbMT8RbST3RfGZrRfMX8RfMgrRfSZrRnAbrRnGT8RnvJgRnvLfRnvMTRn8AaSTClvSTJgrSTOXrSTRg3STRnvSToAcSToAfSToAnSToHnSToLjSToMTSTrAaSTrEUST3BYST8AgST8LmSUAZvSUAgrSUDT4SUDT8SUGgvSUJXoSUJXvSULTrSU8JTSU8LjSV8AnSV8JgSXFToSXLf8SYvAnSZrDUSZrMUSZrMnSZ8HgSZ8JTSZ8JgSZ8MYSZ8QUSaQUoSbCT3SbHToSbQYvSbSl4SboJnSbvFbSb8HbSb8JgSb8OTScGZrScHgrScJTvScMT8ScSToScoHbScrMTScvAnSeAZrSeAcrSeHboSeJUoSeLhrSeMT8SeMXrSe6JgSgHTrSkJnoSkLnvSk8CUSlFl3SlrSnSl8GnSmAboSmGT8SmJU8", "ATLnDlATrAZoATrJX4ATrMT8ATrMX4ATrRTrATvDl8ATvJUoATvMl8AT3AToAT3MX8AT8CT3AT8DT8AT8HZrAT8HgoAUAgFnAUCTFnAXoMX8AXrAT8AXrGgvAXrJXvAXrOgoAXvLl3AZvAgoAZvFbrAZvJXoAZvJl8AZvJn3AZvMX8AZvSbrAZ8FZoAZ8LZ8AZ8MU8AZ8OTvAZ8SV8AZ8SX3AbAgFZAboJnoAbvGboAb8ATrAb8AZoAb8AgrAb8Al4Ab8Db8Ab8JnoAb8LX4Ab8LZrAb8LhrAb8MT8Ab8OUoAb8Qb8Ab8ST8AcrAUoAcrAc8AcrCZ3AcrFT3AcrFZrAcrJl4AcrJn3AcrMX3AcrOTvAc8AZ8Ac8MT8AfAcJXAgoFn4AgoGgvAgoGnrAgoLc8AgoMXoAgrLnrAkrSZ8AlFXCTAloHboAlrHbrAlrLhrAlrLkoAl3CZrAl3LUoAl3LZrAnrAl4AnrMT8An3HT4BT3IToBX4MnvBb!Ln$CTGXMnCToLZ4CTrHT8CT3JTrCT3RZrCT#GTvCU6GgvCU8Db8CU8GZrCU8HT8CboLl3CbrGgrCbrMU8Cb8DT3Cb8GnrCb8LX4Cb8MT8Cb8ObrCgrGgvCgrKX4Cl8FZoDTrAbvDTrDboDTrGT6DTrJgrDTrMX3DTrRZrDTrRg8DTvAVvDTvFZoDT3DT8DT3Ln3DT4HZrDT4MT8DT8AlrDT8MT8DUAkGbDUDbJnDYLnQlDbDUOYDbMTAnDbMXSnDboAT3DboFn4DboLnvDj6JTrGTCgFTGTGgFnGTJTMnGTLnPlGToJT8GTrCT3GTrLVoGTrLnvGTrMX3GTrMboGTvKl3GZClFnGZrDT3GZ8DTrGZ8FZ8GZ8MXvGZ8On8GZ8ST3GbCnQXGbMbFnGboFboGboJg3GboMXoGb3JTvGb3JboGb3Mn6Gb3Qb8GgDXLjGgMnAUGgrDloGgrHX4GgrSToGgvAXrGgvAZvGgvFbrGgvLl3GgvMnvGnDnLXGnrATrGnrMboGnuLl3HTATMnHTAgCnHTCTCTHTrGTvHTrHTvHTrJX8HTrLl8HTrMT8HTrMgoHTrOTrHTuOn3HTvAZrHTvDTvHTvGboHTvJU8HTvLl3HTvMXrHTvQb4HT4GT6HT4JT8HT4Jb#HT8Al3HT8GZrHT8GgrHT8HX4HT8Jb8HT8JnoHT8LTrHT8LgvHT8SToHT8SV8HUoJUoHUoJX8HUoLnrHXrLZoHXvAl3HX3LnrHX4FkvHX4LhrHX4MXoHX4OnoHZrAZ8HZrDb8HZrGZ8HZrJnrHZvGZ8HZvLnvHZ8JnvHZ8LhrHbCXJlHbMTAnHboJl4HbpLl3HbrJX8HbrLnrHbrMnvHbvRYrHgoSTrHgrFV8HgrGZ8HgrJXoHgrRnvHgvBb!HgvGTrHgvHX4HgvHn!HgvLTrHgvSU8HnDnLbHnFbJbHnvDn8Hn6GgvHn!BTvJTCTLnJTQgFnJTrAnvJTrLX4JTrOUoJTvFn3JTvLnrJTvNToJT3AgoJT3Jn4JT3LhvJT3ObrJT8AcrJT8Al3JT8JT8JT8JnoJT8LX4JT8LnrJT8MX3JT8Rg3JT8Sc8JUoBTvJU8AToJU8GZ8JU8GgvJU8JTrJU8JXrJU8JnrJU8LnvJU8ScvJXHnJlJXrGgvJXrJU8JXrLhrJXrMT8JXrMXrJXrQUoJXvCTvJXvGZ8JXvGgrJXvQT8JX8Ab8JX8DT8JX8GZ8JX8HZvJX8LnrJX8MT8JX8MXoJX8MnvJX8ST3JYGnCTJbAkGbJbCTAnJbLTAcJboDT3JboLb6JbrAnvJbrCn3JbrDl8JbrGboJbrIZoJbrJnvJbrMnvJbrQb4Jb8RZrJeAbAnJgJnFbJgScAnJgrATrJgvHZ8JgvMn4JlJlFbJlLiQXJlLjOnJlRbOlJlvNXoJlvRl3Jl4AcrJl8AUoJl8MnrJnFnMlJnHgGbJnoDT8JnoFV8JnoGgvJnoIT8JnoQToJnoRg3JnrCZ3JnrGgrJnrHTvJnrLf8JnrOX8JnvAT3JnvFZoJnvGT8JnvJl4JnvMT8JnvMX8JnvOXrJnvPX6JnvSX3JnvSZrJn3MT8Jn3MX8Jn3RTrLTATKnLTJnLTLTMXKnLTRTQlLToGb8LTrAZ8LTrCZ8LTrDb8LTrHT8LT3PX6LT4FZoLT$CTvLT$GgrLUvHX3LVoATrLVoAgoLVoJboLVoMX3LVoRg3LV8CZ3LV8FZoLV8GTvLXrDXoLXrFbrLXvAgvLXvFlrLXvLl3LXvRn6LX4Mb8LX8GT8LYCXMnLYrMnrLZoSTvLZrAZvLZrAloLZrFToLZrJXvLZrJboLZrJl4LZrLnrLZrMT8LZrOgvLZrRnvLZrST4LZvMX8LZvSlvLZ8AgoLZ8CT3LZ8JT8LZ8LV8LZ8LZoLZ8Lg8LZ8SV8LZ8SbrLZ$HT8LZ$Mn4La6CTvLbFbMnLbRYFTLbSnFZLboJT8LbrAT9LbrGb3LbrQb8LcrJX8LcrMXrLerHTvLerJbrLerNboLgrDb8LgrGZ8LgrHTrLgrMXrLgrSU8LgvJTrLgvLl3Lg6Ll3LhrLnrLhrMT8LhvAl4LiLnQXLkoAgrLkoJT8LkoJn4LlrSU8Ll3FZoLl3HTrLl3JX8Ll3JnoLl3LToLmLeFbLnDUFbLnLVAnLnrATrLnrAZoLnrAb8LnrAlrLnrGgvLnrJU8LnrLZrLnrLhrLnrMb8LnrOXrLnrSZ8LnvAb4LnvDTrLnvDl8LnvHTrLnvHbrLnvJT8LnvJU8LnvJbrLnvLhvLnvMX8LnvMb8LnvNnoLnvSU8Ln3Al3Ln4FZoLn4GT6Ln4JgvLn4LhrLn4MT8Ln4SToMToCZrMToJX8MToLX4MToLf8MToRg3MTrEloMTvGb6MT3BTrMT3Lb6MT8AcrMT8AgrMT8GZrMT8JnoMT8LnrMT8MX3MUOUAnMXAbFnMXoAloMXoJX8MXoLf8MXoLl8MXrAb8MXrDTvMXrGT8MXrGgrMXrHTrMXrLf8MXrMU8MXrOXvMXrQb8MXvGT8MXvHTrMXvLVoMX3AX3MX3Jn3MX3LhrMX3MX3MX4AlrMX4OboMX8GTvMX8GZrMX8GgrMX8JT8MX8JX8MX8LhrMX8MT8MYDUFbMYMgDbMbGnFfMbvLX4MbvLl3Mb8Mb8Mb8ST4MgGXCnMg8ATrMg8AgoMg8CZrMg8DTrMg8DboMg8HTrMg8JgrMg8LT8MloJXoMl8AhrMl8JT8MnLgAUMnoJXrMnoLX4MnoLhrMnoMT8MnrAl4MnrDb8MnrOTvMnrOgvMnrQb8MnrSU8MnvGgrMnvHZ8Mn3MToMn4DTrMn4LTrMn4Mg8NnBXAnOTFTFnOToAToOTrGgvOTrJX8OT3JXoOT6MTrOT8GgrOT8HTpOT8MToOUoHT8OUoJT8OUoLn3OXrAgoOXrDg8OXrMT8OXvSToOX6CTvOX8CZrOX8OgrOb6HgvOb8AToOb8MT8OcvLZ8OgvAlrOgvHTvOgvJTrOgvJnrOgvLZrOgvLn4OgvMT8OgvRTrOg8AZoOg8DbvOnrOXoOnvJn4OnvLhvOnvRTrOn3GgoOn3JnvOn6JbvOn8OTrPTGYFTPbBnFnPbGnDnPgDYQTPlrAnvPlrETvPlrLnvPlrMXvPlvFX4QTMTAnQTrJU8QYCnJlQYJlQlQbGTQbQb8JnrQb8LZoQb8LnvQb8MT8Qb8Ml8Qb8ST4QloAl4QloHZvQloJX8QloMn8QnJZOlRTrAZvRTrDTrRTvJn4RTvLhvRT4Jb8RZrAZrRZ8AkrRZ8JU8RZ8LV8RZ8LnvRbJlQXRg3GboRg3MnvRg8AZ8Rg8JboRg8Jl4RnLTCbRnvFl3RnvQb8SToAl4SToCZrSToFZoSToHXrSToJU8SToJgvSToJl4SToLhrSToMX3STrAlvSTrCT9STrCgrSTrGgrSTrHXrSTrHboSTrJnoSTrNboSTvLnrST4AZoST8Ab8ST8JT8SUoJn3SU6HZ#SU6JTvSU8Db8SU8HboSU8LgrSV8JT8SZrAcrSZrAl3SZrJT8SZrJnvSZrMT8SZvLUoSZ4FZoSZ8JnoSZ8RZrScoLnrScoMT8ScoMX8ScrAT4ScrAZ8ScrLZ8ScrLkvScvDb8ScvLf8ScvNToSgrFZrShvKnrSloHUoSloLnrSlrMXoSl8HgrSmrJUoSn3BX6", "ATFlOn3ATLgrDYAT4MTAnAT8LTMnAYJnRTrAbGgJnrAbLV8LnAbvNTAnAeFbLg3AgOYMXoAlQbFboAnDboAfAnJgoJTBToDgAnBUJbAl3BboDUAnCTDlvLnCTFTrSnCYoQTLnDTwAbAnDUDTrSnDUHgHgrDX8LXFnDbJXAcrETvLTLnGTFTQbrGTMnGToGT3DUFbGUJlPX3GbQg8LnGboJbFnGb3GgAYGgAg8ScGgMbAXrGgvAbAnGnJTLnvGnvATFgHTDT6ATHTrDlJnHYLnMn8HZrSbJTHZ8LTFnHbFTJUoHgSeMT8HgrLjAnHgvAbAnHlFUrDlHnDgvAnHnHTFT3HnQTGnrJTAaMXvJTGbCn3JTOgrAnJXvAXMnJbMg8SnJbMnRg3Jb8LTMnJnAl3OnJnGYrQlJnJlQY3LTDlCn3LTJjLg3LTLgvFXLTMg3GTLV8HUOgLXFZLg3LXNXrMnLX8QXFnLX9AlMYLYLXPXrLZAbJU8LZDUJU8LZMXrSnLZ$AgFnLaPXrDULbFYrMnLbMn8LXLboJgJgLeFbLg3LgLZrSnLgOYAgoLhrRnJlLkCTrSnLkOnLhrLnFX%AYLnFZoJXLnHTvJbLnLloAbMTATLf8MTHgJn3MTMXrAXMT3MTFnMUITvFnMXFX%AYMXMXvFbMXrFTDbMYAcMX3MbLf8SnMb8JbFnMgMXrMTMgvAXFnMgvGgCmMnAloSnMnFnJTrOXvMXSnOX8HTMnObJT8ScObLZFl3ObMXCZoPTLgrQXPUFnoQXPU3RXJlPX3RkQXPbrJXQlPlrJbFnQUAhrDbQXGnCXvQYLnHlvQbLfLnvRTOgvJbRXJYrQlRYLnrQlRbLnrQlRlFT8JlRlFnrQXSTClCn3STHTrAnSTLZQlrSTMnGTrSToHgGbSTrGTDnSTvGXCnST3HgFbSU3HXAXSbAnJn3SbFT8LnScLfLnv", "AT3JgJX8AT8FZoSnAT8JgFV8AT8LhrDbAZ8JT8DbAb8GgLhrAb8SkLnvAe8MT8SnAlMYJXLVAl3GYDTvAl3LfLnvBUDTvLl3CTOn3HTrCT3DUGgrCU8MT8AbCbFTrJUoCgrDb8MTDTLV8JX8DTLnLXQlDT8LZrSnDUQb8FZ8DUST4JnvDb8ScOUoDj6GbJl4GTLfCYMlGToAXvFnGboAXvLnGgAcrJn3GgvFnSToGnLf8JnvGn#HTDToHTLnFXJlHTvATFToHTvHTDToHTvMTAgoHT3STClvHT4AlFl6HT8HTDToHUoDgJTrHUoScMX3HbRZrMXoHboJg8LTHgDb8JTrHgMToLf8HgvLnLnoHnHn3HT4Hn6MgvAnJTJU8ScvJT3AaQT8JT8HTrAnJXrRg8AnJbAloMXoJbrATFToJbvMnoSnJgDb6GgvJgDb8MXoJgSX3JU8JguATFToJlPYLnQlJlQkDnLbJlQlFYJlJl8Lf8OTJnCTFnLbJnLTHXMnJnLXGXCnJnoFfRg3JnrMYRg3Jn3HgFl3KT8Dg8LnLTRlFnPTLTvPbLbvLVoSbrCZLXMY6HT3LXNU7DlrLXNXDTATLX8DX8LnLZDb8JU8LZMnoLhrLZSToJU8LZrLaLnrLZvJn3SnLZ8LhrSnLaJnoMT8LbFlrHTvLbrFTLnrLbvATLlvLb6OTFn3LcLnJZOlLeAT6Mn4LeJT3ObrLg6LXFlrLhrJg8LnLhvDlPX4LhvLfLnvLj6JTFT3LnFbrMXoLnQluCTvLnrQXCY6LnvLfLnvLnvMgLnvLnvSeLf8MTMbrJn3MT3JgST3MT8AnATrMT8LULnrMUMToCZrMUScvLf8MXoDT8SnMX6ATFToMX8AXMT8MX8FkMT8MX8HTrDUMX8ScoSnMYJT6CTvMgAcrMXoMg8SToAfMlvAXLg3MnFl3AnvOT3AnFl3OUoATHT8OU3RnLXrOXrOXrSnObPbvFn6Og8HgrSnOg8OX8DbPTvAgoJgPU3RYLnrPXrDnJZrPb8CTGgvPlrLTDlvPlvFUJnoQUvFXrQlQeMnoAl3QlrQlrSnRTFTrJUoSTDlLiLXSTFg6HT3STJgoMn4STrFTJTrSTrLZFl3ST4FnMXoSUrDlHUoScvHTvSnSfLkvMXo", "AUoAcrMXoAZ8HboAg8AbOg6ATFgAg8AloMXoAl3AT8JTrAl8MX8MXoCT3SToJU8Cl8Db8MXoDT8HgrATrDboOT8MXoGTOTrATMnGT8LhrAZ8GnvFnGnQXHToGgvAcrHTvAXvLl3HbrAZoMXoHgBlFXLg3HgMnFXrSnHgrSb8JUoHn6HT8LgvITvATrJUoJUoLZrRnvJU8HT8Jb8JXvFX8QT8JXvLToJTrJYrQnGnQXJgrJnoATrJnoJU8ScvJnvMnvMXoLTCTLgrJXLTJlRTvQlLbRnJlQYvLbrMb8LnvLbvFn3RnoLdCVSTGZrLeSTvGXCnLg3MnoLn3MToLlrETvMT8SToAl3MbrDU6GTvMb8LX4LhrPlrLXGXCnSToLf8Rg3STrDb8LTrSTvLTHXMnSb3RYLnMnSgOg6ATFg", "HUDlGnrQXrJTrHgLnrAcJYMb8DULc8LTvFgGnCk3Mg8JbAnLX4QYvFYHnMXrRUoJnGnvFnRlvFTJlQnoSTrBXHXrLYSUJgLfoMT8Se8DTrHbDb", "AbDl8SToJU8An3RbAb8ST8DUSTrGnrAgoLbFU6Db8LTrMg8AaHT8Jb8ObDl8SToJU8Pb3RlvFYoJl"];
        let _ = null;
        function U(e) { if (null == _ && (_ = [], J.forEach(((e, t) => { t += 4; for (let n = 0; n < e.length; n += t) {
            let i = "";
            for (let o = 0; o < t; o++)
                i += ((r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*".indexOf(e[n + o])) >= 40 ? r = r + 168 - 40 : r >= 19 && (r = r + 97 - 19), (0, a.ZN)([225, 132 + (r >> 6), 128 + (63 & r)]));
            _.push(i);
        } var r; })), _.sort(), "0xf9eddeace9c5d3da9c93cf7d3cd38f6a13ed3affb933259ae865714e8a3ae71a" !== m.check(e)))
            throw _ = null, new Error("BIP39 Wordlist for ko (Korean) FAILED"); }
        const H = new class extends m {
            constructor() { super("ko"); }
            getWord(e) { return U(this), _[e]; }
            getWordIndex(e) { return U(this), _.indexOf(e); }
        };
        m.register(H);
        let G = null;
        function j(e) { if (null == G && (G = "AbacoAbbaglioAbbinatoAbeteAbissoAbolireAbrasivoAbrogatoAccadereAccennoAccusatoAcetoneAchilleAcidoAcquaAcreAcrilicoAcrobataAcutoAdagioAddebitoAddomeAdeguatoAderireAdipeAdottareAdulareAffabileAffettoAffissoAffrantoAforismaAfosoAfricanoAgaveAgenteAgevoleAggancioAgireAgitareAgonismoAgricoloAgrumetoAguzzoAlabardaAlatoAlbatroAlberatoAlboAlbumeAlceAlcolicoAlettoneAlfaAlgebraAlianteAlibiAlimentoAllagatoAllegroAllievoAllodolaAllusivoAlmenoAlogenoAlpacaAlpestreAltalenaAlternoAlticcioAltroveAlunnoAlveoloAlzareAmalgamaAmanitaAmarenaAmbitoAmbratoAmebaAmericaAmetistaAmicoAmmassoAmmendaAmmirareAmmonitoAmoreAmpioAmpliareAmuletoAnacardoAnagrafeAnalistaAnarchiaAnatraAncaAncellaAncoraAndareAndreaAnelloAngeloAngolareAngustoAnimaAnnegareAnnidatoAnnoAnnuncioAnonimoAnticipoAnziApaticoAperturaApodeApparireAppetitoAppoggioApprodoAppuntoAprileArabicaArachideAragostaAraldicaArancioAraturaArazzoArbitroArchivioArditoArenileArgentoArgineArgutoAriaArmoniaArneseArredatoArringaArrostoArsenicoArsoArteficeArzilloAsciuttoAscoltoAsepsiAsetticoAsfaltoAsinoAsolaAspiratoAsproAssaggioAsseAssolutoAssurdoAstaAstenutoAsticeAstrattoAtavicoAteismoAtomicoAtonoAttesaAttivareAttornoAttritoAttualeAusilioAustriaAutistaAutonomoAutunnoAvanzatoAvereAvvenireAvvisoAvvolgereAzioneAzotoAzzimoAzzurroBabeleBaccanoBacinoBacoBadessaBadilataBagnatoBaitaBalconeBaldoBalenaBallataBalzanoBambinoBandireBaraondaBarbaroBarcaBaritonoBarlumeBaroccoBasilicoBassoBatostaBattutoBauleBavaBavosaBeccoBeffaBelgioBelvaBendaBenevoleBenignoBenzinaBereBerlinaBetaBibitaBiciBidoneBifidoBigaBilanciaBimboBinocoloBiologoBipedeBipolareBirbanteBirraBiscottoBisestoBisnonnoBisonteBisturiBizzarroBlandoBlattaBollitoBonificoBordoBoscoBotanicoBottinoBozzoloBraccioBradipoBramaBrancaBravuraBretellaBrevettoBrezzaBrigliaBrillanteBrindareBroccoloBrodoBronzinaBrulloBrunoBubboneBucaBudinoBuffoneBuioBulboBuonoBurloneBurrascaBussolaBustaCadettoCaducoCalamaroCalcoloCalesseCalibroCalmoCaloriaCambusaCamerataCamiciaCamminoCamolaCampaleCanapaCandelaCaneCaninoCanottoCantinaCapaceCapelloCapitoloCapogiroCapperoCapraCapsulaCarapaceCarcassaCardoCarismaCarovanaCarrettoCartolinaCasaccioCascataCasermaCasoCassoneCastelloCasualeCatastaCatenaCatrameCautoCavilloCedibileCedrataCefaloCelebreCellulareCenaCenoneCentesimoCeramicaCercareCertoCerumeCervelloCesoiaCespoCetoChelaChiaroChiccaChiedereChimeraChinaChirurgoChitarraCiaoCiclismoCifrareCignoCilindroCiottoloCircaCirrosiCitricoCittadinoCiuffoCivettaCivileClassicoClinicaCloroCoccoCodardoCodiceCoerenteCognomeCollareColmatoColoreColposoColtivatoColzaComaCometaCommandoComodoComputerComuneConcisoCondurreConfermaCongelareConiugeConnessoConoscereConsumoContinuoConvegnoCopertoCopioneCoppiaCopricapoCorazzaCordataCoricatoCorniceCorollaCorpoCorredoCorsiaCorteseCosmicoCostanteCotturaCovatoCratereCravattaCreatoCredereCremosoCrescitaCretaCricetoCrinaleCrisiCriticoCroceCronacaCrostataCrucialeCruscaCucireCuculoCuginoCullatoCupolaCuratoreCursoreCurvoCuscinoCustodeDadoDainoDalmataDamerinoDanielaDannosoDanzareDatatoDavantiDavveroDebuttoDecennioDecisoDeclinoDecolloDecretoDedicatoDefinitoDeformeDegnoDelegareDelfinoDelirioDeltaDemenzaDenotatoDentroDepositoDerapataDerivareDerogaDescrittoDesertoDesiderioDesumereDetersivoDevotoDiametroDicembreDiedroDifesoDiffusoDigerireDigitaleDiluvioDinamicoDinnanziDipintoDiplomaDipoloDiradareDireDirottoDirupoDisagioDiscretoDisfareDisgeloDispostoDistanzaDisumanoDitoDivanoDiveltoDividereDivoratoDobloneDocenteDoganaleDogmaDolceDomatoDomenicaDominareDondoloDonoDormireDoteDottoreDovutoDozzinaDragoDruidoDubbioDubitareDucaleDunaDuomoDupliceDuraturoEbanoEccessoEccoEclissiEconomiaEderaEdicolaEdileEditoriaEducareEgemoniaEgliEgoismoEgregioElaboratoElargireEleganteElencatoElettoElevareElficoElicaElmoElsaElusoEmanatoEmblemaEmessoEmiroEmotivoEmozioneEmpiricoEmuloEndemicoEnduroEnergiaEnfasiEnotecaEntrareEnzimaEpatiteEpilogoEpisodioEpocaleEppureEquatoreErarioErbaErbosoEredeEremitaErigereErmeticoEroeErosivoErranteEsagonoEsameEsanimeEsaudireEscaEsempioEsercitoEsibitoEsigenteEsistereEsitoEsofagoEsortatoEsosoEspansoEspressoEssenzaEssoEstesoEstimareEstoniaEstrosoEsultareEtilicoEtnicoEtruscoEttoEuclideoEuropaEvasoEvidenzaEvitatoEvolutoEvvivaFabbricaFaccendaFachiroFalcoFamigliaFanaleFanfaraFangoFantasmaFareFarfallaFarinosoFarmacoFasciaFastosoFasulloFaticareFatoFavolosoFebbreFecolaFedeFegatoFelpaFeltroFemminaFendereFenomenoFermentoFerroFertileFessuraFestivoFettaFeudoFiabaFiduciaFifaFiguratoFiloFinanzaFinestraFinireFioreFiscaleFisicoFiumeFlaconeFlamencoFleboFlemmaFloridoFluenteFluoroFobicoFocacciaFocosoFoderatoFoglioFolataFolcloreFolgoreFondenteFoneticoFoniaFontanaForbitoForchettaForestaFormicaFornaioForoFortezzaForzareFosfatoFossoFracassoFranaFrassinoFratelloFreccettaFrenataFrescoFrigoFrollinoFrondeFrugaleFruttaFucilataFucsiaFuggenteFulmineFulvoFumanteFumettoFumosoFuneFunzioneFuocoFurboFurgoneFuroreFusoFutileGabbianoGaffeGalateoGallinaGaloppoGamberoGammaGaranziaGarboGarofanoGarzoneGasdottoGasolioGastricoGattoGaudioGazeboGazzellaGecoGelatinaGelsoGemelloGemmatoGeneGenitoreGennaioGenotipoGergoGhepardoGhiaccioGhisaGialloGildaGineproGiocareGioielloGiornoGioveGiratoGironeGittataGiudizioGiuratoGiustoGlobuloGlutineGnomoGobbaGolfGomitoGommoneGonfioGonnaGovernoGracileGradoGraficoGrammoGrandeGrattareGravosoGraziaGrecaGreggeGrifoneGrigioGrinzaGrottaGruppoGuadagnoGuaioGuantoGuardareGufoGuidareIbernatoIconaIdenticoIdillioIdoloIdraIdricoIdrogenoIgieneIgnaroIgnoratoIlareIllesoIllogicoIlludereImballoImbevutoImboccoImbutoImmaneImmersoImmolatoImpaccoImpetoImpiegoImportoImprontaInalareInarcareInattivoIncantoIncendioInchinoIncisivoInclusoIncontroIncrocioIncuboIndagineIndiaIndoleIneditoInfattiInfilareInflittoIngaggioIngegnoIngleseIngordoIngrossoInnescoInodoreInoltrareInondatoInsanoInsettoInsiemeInsonniaInsulinaIntasatoInteroIntonacoIntuitoInumidireInvalidoInveceInvitoIperboleIpnoticoIpotesiIppicaIrideIrlandaIronicoIrrigatoIrrorareIsolatoIsotopoIstericoIstitutoIstriceItaliaIterareLabbroLabirintoLaccaLaceratoLacrimaLacunaLaddoveLagoLampoLancettaLanternaLardosoLargaLaringeLastraLatenzaLatinoLattugaLavagnaLavoroLegaleLeggeroLemboLentezzaLenzaLeoneLepreLesivoLessatoLestoLetteraleLevaLevigatoLiberoLidoLievitoLillaLimaturaLimitareLimpidoLineareLinguaLiquidoLiraLiricaLiscaLiteLitigioLivreaLocandaLodeLogicaLombareLondraLongevoLoquaceLorenzoLotoLotteriaLuceLucidatoLumacaLuminosoLungoLupoLuppoloLusingaLussoLuttoMacabroMacchinaMaceroMacinatoMadamaMagicoMagliaMagneteMagroMaiolicaMalafedeMalgradoMalintesoMalsanoMaltoMalumoreManaManciaMandorlaMangiareManifestoMannaroManovraMansardaMantideManubrioMappaMaratonaMarcireMarettaMarmoMarsupioMascheraMassaiaMastinoMaterassoMatricolaMattoneMaturoMazurcaMeandroMeccanicoMecenateMedesimoMeditareMegaMelassaMelisMelodiaMeningeMenoMensolaMercurioMerendaMerloMeschinoMeseMessereMestoloMetalloMetodoMettereMiagolareMicaMicelioMicheleMicroboMidolloMieleMiglioreMilanoMiliteMimosaMineraleMiniMinoreMirinoMirtilloMiscelaMissivaMistoMisurareMitezzaMitigareMitraMittenteMnemonicoModelloModificaModuloMoganoMogioMoleMolossoMonasteroMoncoMondinaMonetarioMonileMonotonoMonsoneMontatoMonvisoMoraMordereMorsicatoMostroMotivatoMotosegaMottoMovenzaMovimentoMozzoMuccaMucosaMuffaMughettoMugnaioMulattoMulinelloMultiploMummiaMuntoMuovereMuraleMusaMuscoloMusicaMutevoleMutoNababboNaftaNanometroNarcisoNariceNarratoNascereNastrareNaturaleNauticaNaviglioNebulosaNecrosiNegativoNegozioNemmenoNeofitaNerettoNervoNessunoNettunoNeutraleNeveNevroticoNicchiaNinfaNitidoNobileNocivoNodoNomeNominaNordicoNormaleNorvegeseNostranoNotareNotiziaNotturnoNovellaNucleoNullaNumeroNuovoNutrireNuvolaNuzialeOasiObbedireObbligoObeliscoOblioOboloObsoletoOccasioneOcchioOccidenteOccorrereOccultareOcraOculatoOdiernoOdorareOffertaOffrireOffuscatoOggettoOggiOgnunoOlandeseOlfattoOliatoOlivaOlogrammaOltreOmaggioOmbelicoOmbraOmegaOmissioneOndosoOnereOniceOnnivoroOnorevoleOntaOperatoOpinioneOppostoOracoloOrafoOrdineOrecchinoOreficeOrfanoOrganicoOrigineOrizzonteOrmaOrmeggioOrnativoOrologioOrrendoOrribileOrtensiaOrticaOrzataOrzoOsareOscurareOsmosiOspedaleOspiteOssaOssidareOstacoloOsteOtiteOtreOttagonoOttimoOttobreOvaleOvestOvinoOviparoOvocitoOvunqueOvviareOzioPacchettoPacePacificoPadellaPadronePaesePagaPaginaPalazzinaPalesarePallidoPaloPaludePandoroPannelloPaoloPaonazzoPapricaParabolaParcellaParerePargoloPariParlatoParolaPartireParvenzaParzialePassivoPasticcaPataccaPatologiaPattumePavonePeccatoPedalarePedonalePeggioPelosoPenarePendicePenisolaPennutoPenombraPensarePentolaPepePepitaPerbenePercorsoPerdonatoPerforarePergamenaPeriodoPermessoPernoPerplessoPersuasoPertugioPervasoPesatorePesistaPesoPestiferoPetaloPettinePetulantePezzoPiacerePiantaPiattinoPiccinoPicozzaPiegaPietraPifferoPigiamaPigolioPigroPilaPiliferoPillolaPilotaPimpantePinetaPinnaPinoloPioggiaPiomboPiramidePireticoPiritePirolisiPitonePizzicoPlaceboPlanarePlasmaPlatanoPlenarioPochezzaPoderosoPodismoPoesiaPoggiarePolentaPoligonoPollicePolmonitePolpettaPolsoPoltronaPolverePomicePomodoroPontePopolosoPorfidoPorosoPorporaPorrePortataPosaPositivoPossessoPostulatoPotassioPoterePranzoPrassiPraticaPreclusoPredicaPrefissoPregiatoPrelievoPremerePrenotarePreparatoPresenzaPretestoPrevalsoPrimaPrincipePrivatoProblemaProcuraProdurreProfumoProgettoProlungaPromessaPronomePropostaProrogaProtesoProvaPrudentePrugnaPruritoPsichePubblicoPudicaPugilatoPugnoPulcePulitoPulsantePuntarePupazzoPupillaPuroQuadroQualcosaQuasiQuerelaQuotaRaccoltoRaddoppioRadicaleRadunatoRafficaRagazzoRagioneRagnoRamarroRamingoRamoRandagioRantolareRapatoRapinaRappresoRasaturaRaschiatoRasenteRassegnaRastrelloRataRavvedutoRealeRecepireRecintoReclutaReconditoRecuperoRedditoRedimereRegalatoRegistroRegolaRegressoRelazioneRemareRemotoRennaReplicaReprimereReputareResaResidenteResponsoRestauroReteRetinaRetoricaRettificaRevocatoRiassuntoRibadireRibelleRibrezzoRicaricaRiccoRicevereRiciclatoRicordoRicredutoRidicoloRidurreRifasareRiflessoRiformaRifugioRigareRigettatoRighelloRilassatoRilevatoRimanereRimbalzoRimedioRimorchioRinascitaRincaroRinforzoRinnovoRinomatoRinsavitoRintoccoRinunciaRinvenireRiparatoRipetutoRipienoRiportareRipresaRipulireRisataRischioRiservaRisibileRisoRispettoRistoroRisultatoRisvoltoRitardoRitegnoRitmicoRitrovoRiunioneRivaRiversoRivincitaRivoltoRizomaRobaRoboticoRobustoRocciaRocoRodaggioRodereRoditoreRogitoRollioRomanticoRompereRonzioRosolareRospoRotanteRotondoRotulaRovescioRubizzoRubricaRugaRullinoRumineRumorosoRuoloRupeRussareRusticoSabatoSabbiareSabotatoSagomaSalassoSaldaturaSalgemmaSalivareSalmoneSaloneSaltareSalutoSalvoSapereSapidoSaporitoSaracenoSarcasmoSartoSassosoSatelliteSatiraSatolloSaturnoSavanaSavioSaziatoSbadiglioSbalzoSbancatoSbarraSbattereSbavareSbendareSbirciareSbloccatoSbocciatoSbrinareSbruffoneSbuffareScabrosoScadenzaScalaScambiareScandaloScapolaScarsoScatenareScavatoSceltoScenicoScettroSchedaSchienaSciarpaScienzaScindereScippoSciroppoScivoloSclerareScodellaScolpitoScompartoSconfortoScoprireScortaScossoneScozzeseScribaScrollareScrutinioScuderiaScultoreScuolaScuroScusareSdebitareSdoganareSeccaturaSecondoSedanoSeggiolaSegnalatoSegregatoSeguitoSelciatoSelettivoSellaSelvaggioSemaforoSembrareSemeSeminatoSempreSensoSentireSepoltoSequenzaSerataSerbatoSerenoSerioSerpenteSerraglioServireSestinaSetolaSettimanaSfaceloSfaldareSfamatoSfarzosoSfaticatoSferaSfidaSfilatoSfingeSfocatoSfoderareSfogoSfoltireSforzatoSfrattoSfruttatoSfuggitoSfumareSfusoSgabelloSgarbatoSgonfiareSgorbioSgrassatoSguardoSibiloSiccomeSierraSiglaSignoreSilenzioSillabaSimboloSimpaticoSimulatoSinfoniaSingoloSinistroSinoSintesiSinusoideSiparioSismaSistoleSituatoSlittaSlogaturaSlovenoSmarritoSmemoratoSmentitoSmeraldoSmilzoSmontareSmottatoSmussatoSnellireSnervatoSnodoSobbalzoSobrioSoccorsoSocialeSodaleSoffittoSognoSoldatoSolenneSolidoSollazzoSoloSolubileSolventeSomaticoSommaSondaSonettoSonniferoSopireSoppesoSopraSorgereSorpassoSorrisoSorsoSorteggioSorvolatoSospiroSostaSottileSpadaSpallaSpargereSpatolaSpaventoSpazzolaSpecieSpedireSpegnereSpelaturaSperanzaSpessoreSpettraleSpezzatoSpiaSpigolosoSpillatoSpinosoSpiraleSplendidoSportivoSposoSprangaSprecareSpronatoSpruzzoSpuntinoSquilloSradicareSrotolatoStabileStaccoStaffaStagnareStampatoStantioStarnutoStaseraStatutoSteloSteppaSterzoStilettoStimaStirpeStivaleStizzosoStonatoStoricoStrappoStregatoStriduloStrozzareStruttoStuccareStufoStupendoSubentroSuccosoSudoreSuggeritoSugoSultanoSuonareSuperboSupportoSurgelatoSurrogatoSussurroSuturaSvagareSvedeseSveglioSvelareSvenutoSveziaSviluppoSvistaSvizzeraSvoltaSvuotareTabaccoTabulatoTacciareTaciturnoTaleTalismanoTamponeTanninoTaraTardivoTargatoTariffaTarpareTartarugaTastoTatticoTavernaTavolataTazzaTecaTecnicoTelefonoTemerarioTempoTemutoTendoneTeneroTensioneTentacoloTeoremaTermeTerrazzoTerzettoTesiTesseratoTestatoTetroTettoiaTifareTigellaTimbroTintoTipicoTipografoTiraggioTiroTitanioTitoloTitubanteTizioTizzoneToccareTollerareToltoTombolaTomoTonfoTonsillaTopazioTopologiaToppaTorbaTornareTorroneTortoraToscanoTossireTostaturaTotanoTraboccoTracheaTrafilaTragediaTralcioTramontoTransitoTrapanoTrarreTraslocoTrattatoTraveTrecciaTremolioTrespoloTributoTrichecoTrifoglioTrilloTrinceaTrioTristezzaTrituratoTrivellaTrombaTronoTroppoTrottolaTrovareTruccatoTubaturaTuffatoTulipanoTumultoTunisiaTurbareTurchinoTutaTutelaUbicatoUccelloUccisoreUdireUditivoUffaUfficioUgualeUlisseUltimatoUmanoUmileUmorismoUncinettoUngereUnghereseUnicornoUnificatoUnisonoUnitarioUnteUovoUpupaUraganoUrgenzaUrloUsanzaUsatoUscitoUsignoloUsuraioUtensileUtilizzoUtopiaVacanteVaccinatoVagabondoVagliatoValangaValgoValicoVallettaValorosoValutareValvolaVampataVangareVanitosoVanoVantaggioVanveraVaporeVaranoVarcatoVarianteVascaVedettaVedovaVedutoVegetaleVeicoloVelcroVelinaVellutoVeloceVenatoVendemmiaVentoVeraceVerbaleVergognaVerificaVeroVerrucaVerticaleVescicaVessilloVestaleVeteranoVetrinaVetustoViandanteVibranteVicendaVichingoVicinanzaVidimareVigiliaVignetoVigoreVileVillanoViminiVincitoreViolaViperaVirgolaVirologoVirulentoViscosoVisioneVispoVissutoVisuraVitaVitelloVittimaVivandaVividoViziareVoceVogaVolatileVolereVolpeVoragineVulcanoZampognaZannaZappatoZatteraZavorraZefiroZelanteZeloZenzeroZerbinoZibettoZincoZirconeZittoZollaZoticoZuccheroZufoloZuluZuppa".replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" "), "0x5c1362d88fd4cf614a96f3234941d29f7d37c08c5292fde03bf62c2db6ff7620" !== m.check(e)))
            throw G = null, new Error("BIP39 Wordlist for it (Italian) FAILED"); }
        const X = new class extends m {
            constructor() { super("it"); }
            getWord(e) { return j(this), G[e]; }
            getWordIndex(e) { return j(this), G.indexOf(e); }
        };
        m.register(X);
        const V = "}aE#4A=Yv&co#4N#6G=cJ&SM#66|/Z#4t&kn~46#4K~4q%b9=IR#7l,mB#7W_X2*dl}Uo~7s}Uf&Iw#9c&cw~6O&H6&wx&IG%v5=IQ~8a&Pv#47$PR&50%Ko&QM&3l#5f,D9#4L|/H&tQ;v0~6n]nN<di,AM=W5%QO&ka&ua,hM^tm=zV=JA=wR&+X]7P&NB#4J#5L|/b[dA}tJ<Do&6m&u2[U1&Kb.HM&mC=w0&MW<rY,Hq#6M}QG,13&wP}Jp]Ow%ue&Kg<HP<D9~4k~9T&I2_c6$9T#9/[C5~7O~4a=cs&O7=KK=An&l9$6U$8A&uD&QI|/Y&bg}Ux&F2#6b}E2&JN&kW&kp=U/&bb=Xl<Cj}k+~5J#6L&5z&9i}b4&Fo,ho(X0_g3~4O$Fz&QE<HN=Ww]6/%GF-Vw=tj&/D&PN#9g=YO}cL&Of&PI~5I&Ip=vU=IW#9G;0o-wU}ss&QR<BT&R9=tk$PY_dh&Pq-yh]7T,nj.Xu=EP&76=cI&Fs*Xg}z7$Gb&+I=DF,AF=cA}rL#7j=Dz&3y<Aa$52=PQ}b0(iY$Fa}oL&xV#6U=ec=WZ,xh%RY<dp#9N&Fl&44=WH*A7=sh&TB&8P=07;u+&PK}uh}J5#72)V/=xC,AB$k0&f6;1E|+5=1B,3v]6n&wR%b+&xx]7f=Ol}fl;+D^wG]7E;nB;uh^Ir&l5=JL,nS=cf=g5;u6|/Q$Gc=MH%Hg#5d%M6^86=U+$Gz,l/,ir^5y&Ba&/F-IY&FI&be%IZ#77&PW_Nu$kE(Yf&NX]7Z,Jy&FJ(Xo&Nz#/d=y7&MX<Ag}Z+;nE]Dt(iG#4D=13&Pj~4c%v8&Zo%OL&/X#4W<HR&ie~6J_1O(Y2=y5=Ad*cv_eB#6k&PX:BU#7A;uk&Ft&Fx_dD=U2;vB=U5=4F}+O&GN.HH:9s=b0%NV(jO&IH=JT}Z9=VZ<Af,Kx^4m&uJ%c6,6r;9m#+L}cf%Kh&F3~4H=vP}bu,Hz|++,1w]nv}k6;uu$jw*Kl*WX&uM[x7&Fr[m7$NO&QN]hu=JN}nR^8g#/h(ps|KC;vd}xz=V0}p6&FD$G1#7K<bG_4p~8g&cf;u4=tl}+k%5/}fz;uw<cA=u1}gU}VM=LJ=eX&+L&Pr#4U}p2:nC,2K]7H:jF&9x}uX#9O=MB<fz~8X~5m&4D&kN&u5%E/(h7(ZF&VG<de(qM|/e-Wt=3x(a+,/R]f/&ND$Ro&nU}0g=KA%kH&NK$Ke<dS}cB&IX~5g$TN]6m=Uv,Is&Py=Ef%Kz#+/%bi&+A<F4$OG&4C&FL#9V<Zk=2I_eE&6c]nw&kq$HG}y+&A8$P3}OH=XP]70%IS(AJ_gH%GZ&tY&AZ=vb~6y&/r=VI=Wv<Zi=fl=xf&eL}c8}OL=MJ=g8$F7=YT}9u=0+^xC}JH&nL^N0~4T]K2,Cy%OC#6s;vG(AC^xe^cG&MF}Br#9P;wD-7h$O/&xA}Fn^PC]6i]7G&8V$Qs;vl(TB~73~4l<mW&6V=2y&uY&+3)aP}XF;LP&kx$wU=t7;uy<FN&lz)7E=Oo*Y+;wI}9q}le;J6&Ri&4t&Qr#8B=cb&vG=J5|Ql(h5<Yy~4+}QD,Lx=wn%K/&RK=dO&Pw,Q9=co%4u;9u}g0@6a^4I%b0=zo|/c&tX=dQ=OS#+b=yz_AB&wB&Pm=W9$HP_gR=62=AO=ti=hI,oA&jr&dH=tm&b6$P2(x8=zi;nG~7F;05]0n[Ix&3m}rg=Xp=cd&uz]7t;97=cN;vV<jf&FF&F1=6Q&Ik*Kk&P4,2z=fQ]7D&3u,H0=d/}Uw<ZN<7R}Kv;0f$H7,MD]7n$F0#88~9Z%da=by;+T#/u=VF&fO&kr^kf<AB]sU,I5$Ng&Pz;0i&QD&vM=Yl:BM;nJ_xJ]U7&Kf&30,3f|Z9*dC)je_jA&Q4&Kp$NH(Yz#6S&Id%Ib=KX,AD=KV%dP}tW&Pk^+E_Ni=cq,3R}VZ(Si=b+}rv;0j}rZ]uA,/w(Sx&Jv$w9&4d&wE,NJ$Gy=J/]Ls#7k<ZQ<Y/&uj]Ov$PM;v3,2F&+u:up=On&3e,Jv;90=J+&Qm]6q}bK#+d~8Y(h2]hA;99&AS=I/}qB&dQ}yJ-VM}Vl&ui,iB&G3|Dc]7d=eQ%dX%JC_1L~4d^NP;vJ&/1)ZI#7N]9X[bQ&PL=0L(UZ,Lm&kc&IR}n7(iR<AQ<dg=33=vN}ft}au]7I,Ba=x9=dR~6R&Tq=Xi,3d$Nr&Bc}DI&ku&vf]Dn,/F&iD,Ll&Nw=0y&I7=Ls=/A&tU=Qe}Ua&uk&+F=g4=gh=Vj#+1&Qn}Uy*44#5F,Pc&Rz*Xn=oh=5W;0n_Nf(iE<Y7=vr=Zu]oz#5Z%mI=kN=Bv_Jp(T2;vt_Ml<FS&uI=L/&6P]64$M7}86<bo%QX(SI%IY&VK=Al&Ux;vv;ut*E/%uh<ZE|O3,M2(yc]yu=Wk&tp:Ex}hr,Cl&WE)+Z=8U}I2_4Q,hA_si=iw=OM=tM=yZ%Ia=U7;wT}b+;uo=Za}yS!5x}HD}fb#5O_dA;Nv%uB(yB;01(Sf}Fk;v7}Pt#8v<mZ#7L,/r&Pl~4w&f5=Ph$Fw_LF&8m,bL=yJ&BH}p/*Jn}tU~5Q;wB(h6]Df]8p^+B;E4&Wc=d+;Ea&bw$8C&FN,DM=Yf}mP~5w=fT#6V=mC=Fi=AV}jB&AN}lW}aH#/D)dZ;hl;vE}/7,CJ;31&w8,hj%u9_Js=jJ&4M~8k=TN&eC}nL&uc-wi&lX}dj=Mv=e2#6u=cr$uq$6G]8W}Jb:nm=Yg<b3(UA;vX&6n&xF=KT,jC,De&R8&oY=Zv&oB]7/=Z2&Oa}bf,hh(4h^tZ&72&Nx;D2&xL~5h~40)ZG)h+=OJ&RA]Bv$yB=Oq=df,AQ%Jn}OJ;11,3z&Tl&tj;v+^Hv,Dh(id=s+]7N&N3)9Q~8f,S4=uW=w4&uX,LX&3d]CJ&yp&8x<b2_do&lP=y/<cy_dG=Oi=7R(VH(lt_1T,Iq_AA;12^6T%k6#8K[B1{oO<AU[Bt;1b$9S&Ps<8T=St{bY,jB(Zp&63&Uv$9V,PM]6v&Af}zW[bW_oq}sm}nB&Kq&gC&ff_eq_2m&5F&TI}rf}Gf;Zr_z9;ER&jk}iz_sn<BN~+n&vo=Vi%97|ZR=Wc,WE&6t]6z%85(ly#84=KY)6m_5/=aX,N3}Tm&he&6K]tR_B2-I3;u/&hU&lH<AP=iB&IA=XL;/5&Nh=wv<BH#79=vS=zl<AA=0X_RG}Bw&9p$NW,AX&kP_Lp&/Z(Tc]Mu}hs#6I}5B&cI<bq&H9#6m=K9}vH(Y1(Y0#4B&w6,/9&gG<bE,/O=zb}I4_l8<B/;wL%Qo<HO[Mq=XX}0v&BP&F4(mG}0i}nm,EC=9u{I3,xG&/9=JY*DK&hR)BX=EI=cx=b/{6k}yX%A+&wa}Xb=la;wi^lL;0t}jo&Qb=xg=XB}iO<qo{bR=NV&8f=a0&Jy;0v=uK)HK;vN#6h&jB(h/%ud&NI%wY.X7=Pt}Cu-uL&Gs_hl%mH,tm]78=Lb^Q0#7Y=1u<Bt&+Q=Co_RH,w3;1e}ux<aU;ui}U3&Q5%bt]63&UQ|0l&uL}O7&3o,AV&dm|Nj(Xt*5+(Uu&Hh(p7(UF=VR=Bp^Jl&Hd[ix)9/=Iq]C8<67]66}mB%6f}bb}JI]8T$HA}db=YM&pa=2J}tS&Y0=PS&y4=cX$6E,hX,XP&nR;04,FQ&l0&Vm_Dv#5Y~8Z=Bi%MA]6x=JO:+p,Az&9q,Hj~6/}SD=K1:EJ}nA;Qo#/E]9R,Ie&6X%W3]61&v4=xX_MC=0q;06(Xq=fs}IG}Dv=0l}o7$iZ;9v&LH&DP-7a&OY,SZ,Kz,Cv&dh=fx|Nh,F/~7q=XF&w+;9n&Gw;0h}Z7<7O&JK(S7&LS<AD<ac=wo<Dt&zw%4B=4v#8P;9o~6p*vV=Tm,Or&I6=1q}nY=P0=gq&Bl&Uu,Ch%yb}UY=zh}dh}rl(T4_xk(YA#8R*xH,IN}Jn]7V}C4&Ty}j3]7p=cL=3h&wW%Qv<Z3=f0&RI&+S(ic_zq}oN&/Y=z1;Td=LW=0e=OI(Vc,+b^ju(UL;0r:Za%8v=Rp=zw&58&73&wK}qX]6y&8E)a2}WR=wP^ur&nQ<cH}Re=Aq&wk}Q0&+q=PP,Gc|/d^k5,Fw]8Y}Pg]p3=ju=ed}r5_yf&Cs]7z$/G<Cm&Jp&54_1G_gP_Ll}JZ;0u]k8_7k(Sg]65{9i=LN&Sx&WK,iW&fD&Lk{9a}Em-9c#8N&io=sy]8d&nT&IK(lx#7/$lW(Td<s8~49,3o<7Y=MW(T+_Jr&Wd,iL}Ct=xh&5V;v4&8n%Kx=iF&l2_0B{B+,If(J0,Lv;u8=Kx-vB=HC&vS=Z6&fU&vE^xK;3D=4h=MR#45:Jw;0d}iw=LU}I5=I0]gB*im,K9}GU,1k_4U&Tt=Vs(iX&lU(TF#7y,ZO}oA&m5#5P}PN}Uz=hM<B1&FB<aG,e6~7T<tP(UQ_ZT=wu&F8)aQ]iN,1r_Lo&/g:CD}84{J1_Ki&Na&3n$jz&FE=dc;uv;va}in}ll=fv(h1&3h}fp=Cy}BM(+E~8m}lo%v7=hC(T6$cj=BQ=Bw(DR,2j=Ks,NS|F+;00=fU=70}Mb(YU;+G&m7&hr=Sk%Co]t+(X5_Jw}0r}gC(AS-IP&QK<Z2#8Q$WC]WX}T2&pG_Ka,HC=R4&/N;Z+;ch(C7,D4$3p_Mk&B2$8D=n9%Ky#5z(CT&QJ#7B]DC]gW}nf~5M;Iw#80}Tc_1F#4Z-aC}Hl=ph=fz,/3=aW}JM}nn;DG;vm}wn,4P}T3;wx&RG$u+}zK=0b;+J_Ek{re<aZ=AS}yY#5D]7q,Cp}xN=VP*2C}GZ}aG~+m_Cs=OY#6r]6g<GS}LC(UB=3A=Bo}Jy<c4}Is;1P<AG}Op<Z1}ld}nS=1Z,yM&95&98=CJ(4t:2L$Hk=Zo}Vc;+I}np&N1}9y=iv}CO*7p=jL)px]tb^zh&GS&Vl%v/;vR=14=zJ&49|/f]hF}WG;03=8P}o/&Gg&rp;DB,Kv}Ji&Pb;aA^ll(4j%yt}+K$Ht#4y&hY]7Y<F1,eN}bG(Uh%6Z]t5%G7;+F_RE;it}tL=LS&Da=Xx(S+(4f=8G=yI}cJ}WP=37=jS}pX}hd)fp<A8=Jt~+o$HJ=M6}iX=g9}CS=dv=Cj(mP%Kd,xq|+9&LD(4/=Xm&QP=Lc}LX&fL;+K=Op(lu=Qs.qC:+e&L+=Jj#8w;SL]7S(b+#4I=c1&nG_Lf&uH;+R)ZV<bV%B/,TE&0H&Jq&Ah%OF&Ss(p2,Wv&I3=Wl}Vq;1L&lJ#9b_1H=8r=b8=JH(SZ=hD=J2#7U,/U#/X~6P,FU<eL=jx,mG=hG=CE&PU=Se(qX&LY=X6=y4&tk&QQ&tf=4g&xI}W+&mZ=Dc#7w}Lg;DA;wQ_Kb(cJ=hR%yX&Yb,hw{bX_4X;EP;1W_2M}Uc=b5(YF,CM&Tp^OJ{DD]6s=vF=Yo~8q}XH}Fu%P5(SJ=Qt;MO]s8<F3&B3&8T(Ul-BS*dw&dR<87}/8]62$PZ]Lx<Au}9Q]7c=ja=KR,Go,Us&v6(qk}pG&G2=ev^GM%w4&H4]7F&dv]J6}Ew:9w=sj-ZL}Ym$+h(Ut(Um~4n=Xs(U7%eE=Qc_JR<CA#6t<Fv|/I,IS,EG<F2(Xy$/n<Fa(h9}+9_2o&N4#7X<Zq|+f_Dp=dt&na,Ca=NJ)jY=8C=YG=s6&Q+<DO}D3=xB&R1(lw;Qn<bF(Cu|/B}HV=SS&n7,10&u0]Dm%A6^4Q=WR(TD=Xo<GH,Rj(l8)bP&n/=LM&CF,F5&ml=PJ;0k=LG=tq,Rh,D6@4i=1p&+9=YC%er_Mh;nI;0q=Fw]80=xq=FM$Gv;v6&nc;wK%H2&Kj;vs,AA=YP,66}bI(qR~5U=6q~4b$Ni=K5.X3$So&Iu(p+]8G=Cf=RY(TS_O3(iH&57=fE=Dg_Do#9z#7H;FK{qd_2k%JR}en&gh_z8;Rx}9p<cN_Ne,DO;LN_7o~/p=NF=5Y}gN<ce<C1,QE]Wv=3u<BC}GK]yq}DY&u/_hj=II(pz&rC,jV&+Z}ut=NQ;Cg-SR_ZS,+o=u/;Oy_RK_QF(Fx&xP}Wr&TA,Uh&g1=yr{ax[VF$Pg(YB;Ox=Vy;+W(Sp}XV%dd&33(l/]l4#4Y}OE=6c=bw(A7&9t%wd&N/&mo,JH&Qe)fm=Ao}fu=tH", z = { zh_cn: null, zh_tw: null }, Z = { zh_cn: "0x17bcc4d8547e5a7135e365d1ab443aaae95e76d8230c2782c67305d4f21497a1", zh_tw: "0x51e720e90c7b87bec1d70eb6e74a21a449bd3ec9c020b01d3a40ed991b60ce5d" }, K = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        function q(e) { if (null !== z[e.locale])
            return; z[e.locale] = []; let t = 0; for (let r = 0; r < 2048; r++) {
            const n = "~!@#$%^&*_-=[]{}|;:,.()<>?".indexOf(V[3 * r]), i = [228 + (n >> 2), 128 + K.indexOf(V[3 * r + 1]), 128 + K.indexOf(V[3 * r + 2])];
            if ("zh_tw" === e.locale)
                for (let e = n % 4; e < 3; e++)
                    i[e] = K.indexOf("FAZDC6BALcLZCA+GBARCW8wNCcDDZ8LVFBOqqDUiou+M42TFAyERXFb7EjhP+vmBFpFrUpfDV2F7eB+eCltCHJFWLFCED+pWTojEIHFXc3aFn4F68zqjEuKidS1QBVPDEhE7NA4mhMF7oThD49ot3FgtzHFCK0acW1x8DH1EmLoIlrWFBLE+y5+NA3Cx65wJHTaEZVaK1mWAmPGxgYCdxwOjTDIt/faOEhTl1vqNsKtJCOhJWuio2g07KLZEQsFBUpNtwEByBgxFslFheFbiEPvi61msDvApxCzB6rBCzox7joYA5UdDc+Cb4FSgIabpXFAj3bjkmFAxCZE+mD/SFf/0ELecYCt3nLoxC6WEZf2tKDB4oZvrEmqFkKk7BwILA7gtYBpsTq//D4jD0F0wEB9pyQ1BD5Ba0oYHDI+sbDFhvrHXdDHfgFEIJLi5r8qercNFBgFLC4bo5ERJtamWBDFy73KCEb6M8VpmEt330ygCTK58EIIFkYgF84gtGA9Uyh3m68iVrFbWFbcbqiCYHZ9J1jeRPbL8yswhMiDbhEhdNoSwFbZrLT740ABEqgCkO8J1BLd1VhKKR4sD1yUo0z+FF59Mvg71CFbyEhbHSFBKEIKyoQNgQppq9T0KAqePu0ZFGrXOHdKJqkoTFhYvpDNyuuznrN84thJbsCoO6Cu6Xlvntvy0QYuAExQEYtTUBf3CoCqwgGFZ4u1HJFzDVwEy3cjcpV4QvsPaBC3rCGyCF23o4K3pp2gberGgFEJEHo4nHICtyKH2ZqyxhN05KBBJIQlKh/Oujv/DH32VrlqFdIFC7Fz9Ct4kaqFME0UETLprnN9kfy+kFmtQBB0+5CFu0N9Ij8l/VvJDh2oq3hT6EzjTHKFN7ZjZwoTsAZ4Exsko6Fpa6WC+sduz8jyrLpegTv2h1EBeYpLpm2czQW0KoCcS0bCVXCmuWJDBjN1nQNLdF58SFJ0h7i3pC3oEOKy/FjBklL70XvBEEIWp2yZ04xObzAWDDJG7f+DbqBEA7LyiR95j7MDVdDViz2RE5vWlBMv5e4+VfhP3aXNPhvLSynb9O2x4uFBV+3jqu6d5pCG28/sETByvmu/+IJ0L3wb4rj9DNOLBF6XPIODr4L19U9RRofAG6Nxydi8Bki8BhGJbBAJKzbJxkZSlF9Q2Cu8oKqggB9hBArwLLqEBWEtFowy8XK8bEyw9snT+BeyFk1ZCSrdmgfEwFePTgCjELBEnIbjaDDPJm36rG9pztcEzT8dGk23SBhXBB1H4z+OWze0ooFzz8pDBYFvp9j9tvFByf9y4EFdVnz026CGR5qMr7fxMHN8UUdlyJAzlTBDRC28k+L4FB8078ljyD91tUj1ocnTs8vdEf7znbzm+GIjEZnoZE5rnLL700Xc7yHfz05nWxy03vBB9YGHYOWxgMQGBCR24CVYNE1hpfKxN0zKnfJDmmMgMmBWqNbjfSyFCBWSCGCgR8yFXiHyEj+VtD1FB3FpC1zI0kFbzifiKTLm9yq5zFmur+q8FHqjoOBWsBPiDbnCC2ErunV6cJ6TygXFYHYp7MKN9RUlSIS8/xBAGYLzeqUnBF4QbsTuUkUqGs6CaiDWKWjQK9EJkjpkTmNCPYXL"[t++]) + (0 == e ? 228 : 128);
            z[e.locale].push((0, a.ZN)(i));
        } if (m.check(e) !== Z[e.locale])
            throw z[e.locale] = null, new Error("BIP39 Wordlist for " + e.locale + " (Chinese) FAILED"); }
        class Q extends m {
            constructor(e) { super("zh_" + e); }
            getWord(e) { return q(this), z[this.locale][e]; }
            getWordIndex(e) { return q(this), z[this.locale].indexOf(e); }
            split(e) { return (e = e.replace(/(?:\u3000| )+/g, "")).split(""); }
        }
        const W = new Q("cn");
        m.register(W), m.register(W, "zh");
        const Y = new Q("tw");
        m.register(Y);
        const $ = { cz: v, en: w, es: P, fr: O, it: X, ja: D, ko: H, zh: W, zh_cn: W, zh_tw: Y }, ee = new p.Logger("hdnode/5.4.0"), te = o.O$.from("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), re = (0, a.Y0)("Bitcoin seed"), ne = 2147483648;
        function ie(e) { return (1 << e) - 1 << 8 - e; }
        function oe(e) { return (0, i.hexZeroPad)((0, i.hexlify)(e), 32); }
        function ae(e) { return n.Base58.encode((0, i.concat)([e, (0, i.hexDataSlice)((0, u.JQ)((0, u.JQ)(e)), 0, 4)])); }
        function se(e) { if (null == e)
            return $.en; if ("string" == typeof e) {
            const t = $[e];
            return null == t && ee.throwArgumentError("unknown locale", "wordlist", e), t;
        } return e; }
        const ce = {}, le = "m/44'/60'/0'/0/0";
        class ue {
            constructor(e, t, r, n, o, a, s, f) { if (ee.checkNew(new.target, ue), e !== ce)
                throw new Error("HDNode constructor cannot be called directly"); if (t) {
                const e = new l.SigningKey(t);
                (0, c.defineReadOnly)(this, "privateKey", e.privateKey), (0, c.defineReadOnly)(this, "publicKey", e.compressedPublicKey);
            }
            else
                (0, c.defineReadOnly)(this, "privateKey", null), (0, c.defineReadOnly)(this, "publicKey", (0, i.hexlify)(r)); (0, c.defineReadOnly)(this, "parentFingerprint", n), (0, c.defineReadOnly)(this, "fingerprint", (0, i.hexDataSlice)((0, u.bP)((0, u.JQ)(this.publicKey)), 0, 4)), (0, c.defineReadOnly)(this, "address", (0, h.computeAddress)(this.publicKey)), (0, c.defineReadOnly)(this, "chainCode", o), (0, c.defineReadOnly)(this, "index", a), (0, c.defineReadOnly)(this, "depth", s), null == f ? ((0, c.defineReadOnly)(this, "mnemonic", null), (0, c.defineReadOnly)(this, "path", null)) : "string" == typeof f ? ((0, c.defineReadOnly)(this, "mnemonic", null), (0, c.defineReadOnly)(this, "path", f)) : ((0, c.defineReadOnly)(this, "mnemonic", f), (0, c.defineReadOnly)(this, "path", f.path)); }
            get extendedKey() { if (this.depth >= 256)
                throw new Error("Depth too large!"); return ae((0, i.concat)([null != this.privateKey ? "0x0488ADE4" : "0x0488B21E", (0, i.hexlify)(this.depth), this.parentFingerprint, (0, i.hexZeroPad)((0, i.hexlify)(this.index), 4), this.chainCode, null != this.privateKey ? (0, i.concat)(["0x00", this.privateKey]) : this.publicKey])); }
            neuter() { return new ue(ce, null, this.publicKey, this.parentFingerprint, this.chainCode, this.index, this.depth, this.path); }
            _derive(e) { if (e > 4294967295)
                throw new Error("invalid index - " + String(e)); let t = this.path; t && (t += "/" + (2147483647 & e)); const r = new Uint8Array(37); if (e & ne) {
                if (!this.privateKey)
                    throw new Error("cannot derive child of neutered node");
                r.set((0, i.arrayify)(this.privateKey), 1), t && (t += "'");
            }
            else
                r.set((0, i.arrayify)(this.publicKey)); for (let t = 24; t >= 0; t -= 8)
                r[33 + (t >> 3)] = e >> 24 - t & 255; const n = (0, i.arrayify)((0, u.Gy)(f.p.sha512, this.chainCode, r)), a = n.slice(0, 32), s = n.slice(32); let c = null, h = null; this.privateKey ? c = oe(o.O$.from(a).add(this.privateKey).mod(te)) : h = new l.SigningKey((0, i.hexlify)(a))._addPoint(this.publicKey); let d = t; const p = this.mnemonic; return p && (d = Object.freeze({ phrase: p.phrase, path: t, locale: p.locale || "en" })), new ue(ce, c, h, this.fingerprint, oe(s), e, this.depth + 1, d); }
            derivePath(e) { const t = e.split("/"); if (0 === t.length || "m" === t[0] && 0 !== this.depth)
                throw new Error("invalid path - " + e); "m" === t[0] && t.shift(); let r = this; for (let e = 0; e < t.length; e++) {
                const n = t[e];
                if (n.match(/^[0-9]+'$/)) {
                    const e = parseInt(n.substring(0, n.length - 1));
                    if (e >= ne)
                        throw new Error("invalid path index - " + n);
                    r = r._derive(ne + e);
                }
                else {
                    if (!n.match(/^[0-9]+$/))
                        throw new Error("invalid path component - " + n);
                    {
                        const e = parseInt(n);
                        if (e >= ne)
                            throw new Error("invalid path index - " + n);
                        r = r._derive(e);
                    }
                }
            } return r; }
            static _fromSeed(e, t) { const r = (0, i.arrayify)(e); if (r.length < 16 || r.length > 64)
                throw new Error("invalid seed"); const n = (0, i.arrayify)((0, u.Gy)(f.p.sha512, re, r)); return new ue(ce, oe(n.slice(0, 32)), null, "0x00000000", oe(n.slice(32)), 0, 0, t); }
            static fromMnemonic(e, t, r) { return e = de(he(e, r = se(r)), r), ue._fromSeed(fe(e, t), { phrase: e, path: "m", locale: r.locale }); }
            static fromSeed(e) { return ue._fromSeed(e, null); }
            static fromExtendedKey(e) { const t = n.Base58.decode(e); 82 === t.length && ae(t.slice(0, 78)) === e || ee.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]"); const r = t[4], o = (0, i.hexlify)(t.slice(5, 9)), a = parseInt((0, i.hexlify)(t.slice(9, 13)).substring(2), 16), s = (0, i.hexlify)(t.slice(13, 45)), c = t.slice(45, 78); switch ((0, i.hexlify)(t.slice(0, 4))) {
                case "0x0488b21e":
                case "0x043587cf": return new ue(ce, null, (0, i.hexlify)(c), o, s, a, r, null);
                case "0x0488ade4":
                case "0x04358394 ":
                    if (0 !== c[0])
                        break;
                    return new ue(ce, (0, i.hexlify)(c.slice(1)), null, o, s, a, r, null);
            } return ee.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]"); }
        }
        function fe(e, t) { t || (t = ""); const r = (0, a.Y0)("mnemonic" + t, a.Uj.NFKD); return (0, s.n)((0, a.Y0)(e, a.Uj.NFKD), r, 2048, 64, "sha512"); }
        function he(e, t) { t = se(t), ee.checkNormalize(); const r = t.split(e); if (r.length % 3 != 0)
            throw new Error("invalid mnemonic"); const n = (0, i.arrayify)(new Uint8Array(Math.ceil(11 * r.length / 8))); let o = 0; for (let e = 0; e < r.length; e++) {
            let i = t.getWordIndex(r[e].normalize("NFKD"));
            if (-1 === i)
                throw new Error("invalid mnemonic");
            for (let e = 0; e < 11; e++)
                i & 1 << 10 - e && (n[o >> 3] |= 1 << 7 - o % 8), o++;
        } const a = 32 * r.length / 3, s = ie(r.length / 3); if (((0, i.arrayify)((0, u.JQ)(n.slice(0, a / 8)))[0] & s) != (n[n.length - 1] & s))
            throw new Error("invalid checksum"); return (0, i.hexlify)(n.slice(0, a / 8)); }
        function de(e, t) { if (t = se(t), (e = (0, i.arrayify)(e)).length % 4 != 0 || e.length < 16 || e.length > 32)
            throw new Error("invalid entropy"); const r = [0]; let n = 11; for (let t = 0; t < e.length; t++)
            n > 8 ? (r[r.length - 1] <<= 8, r[r.length - 1] |= e[t], n -= 8) : (r[r.length - 1] <<= n, r[r.length - 1] |= e[t] >> 8 - n, r.push(e[t] & (1 << 8 - n) - 1), n += 3); const o = e.length / 4, a = (0, i.arrayify)((0, u.JQ)(e))[0] & ie(o); return r[r.length - 1] <<= o, r[r.length - 1] |= a >> 8 - o, t.join(r.map((e => t.getWord(e)))); }
        function pe(e, t) { try {
            return he(e, t), !0;
        }
        catch (e) { } return !1; }
        function ge(e) { return ("number" != typeof e || e < 0 || e >= ne || e % 1) && ee.throwArgumentError("invalid account index", "index", e), `m/44'/60'/${e}'/0/0`; }
    }, 9816: (e, t, r) => {
        "use strict";
        r.d(t, { i: () => n });
        const n = "json-wallets/5.4.0";
    }, 6883: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { decryptCrowdsale: () => m, decryptJsonWallet: () => S, decryptJsonWalletSync: () => w, decryptKeystore: () => A.pe, decryptKeystoreSync: () => A.hb, encryptKeystore: () => A.HI, getJsonWalletAddress: () => v, isCrowdsaleWallet: () => b, isKeystoreWallet: () => y });
        var n = r(8826), i = r.n(n), o = r(4594), a = r(3286), s = r(8197), c = r(5306), l = r(4242), u = r(3587), f = r(711), h = r(9816), d = r(7013);
        const p = new f.Logger(h.i);
        class g extends u.Description {
            isCrowdsaleAccount(e) { return !(!e || !e._isCrowdsaleAccount); }
        }
        function m(e, t) { const r = JSON.parse(e); t = (0, d.Ij)(t); const n = (0, o.getAddress)((0, d.gx)(r, "ethaddr")), u = (0, d.p3)((0, d.gx)(r, "encseed")); u && u.length % 16 == 0 || p.throwArgumentError("invalid encseed", "json", e); const f = (0, a.arrayify)((0, c.n)(t, t, 2e3, 32, "sha256")).slice(0, 16), h = u.slice(0, 16), m = u.slice(16), b = new (i().ModeOfOperation.cbc)(f, h), y = i().padding.pkcs7.strip((0, a.arrayify)(b.decrypt(m))); let v = ""; for (let e = 0; e < y.length; e++)
            v += String.fromCharCode(y[e]); const A = (0, l.Y0)(v), S = (0, s.keccak256)(A); return new g({ _isCrowdsaleAccount: !0, address: n, privateKey: S }); }
        function b(e) { let t = null; try {
            t = JSON.parse(e);
        }
        catch (e) {
            return !1;
        } return t.encseed && t.ethaddr; }
        function y(e) { let t = null; try {
            t = JSON.parse(e);
        }
        catch (e) {
            return !1;
        } return !(!t.version || parseInt(t.version) !== t.version || 3 !== parseInt(t.version)); }
        function v(e) { if (b(e))
            try {
                return (0, o.getAddress)(JSON.parse(e).ethaddr);
            }
            catch (e) {
                return null;
            } if (y(e))
            try {
                return (0, o.getAddress)(JSON.parse(e).address);
            }
            catch (e) {
                return null;
            } return null; }
        var A = r(1964);
        function S(e, t, r) { if (b(e)) {
            r && r(0);
            const n = m(e, t);
            return r && r(1), Promise.resolve(n);
        } return y(e) ? (0, A.pe)(e, t, r) : Promise.reject(new Error("invalid JSON wallet")); }
        function w(e, t) { if (b(e))
            return m(e, t); if (y(e))
            return (0, A.hb)(e, t); throw new Error("invalid JSON wallet"); }
    }, 1964: (e, t, r) => {
        "use strict";
        r.d(t, { hb: () => k, pe: () => B, HI: () => P });
        var n = r(8826), i = r.n(n), o = r(7635), a = r.n(o), s = r(4594), c = r(3286), l = r(1681), u = r(8197), f = r(5306), h = r(4478), d = r(3587), p = r(4377), g = r(7013), m = r(711), b = r(9816);
        const y = new m.Logger(b.i);
        function v(e) { return null != e && e.mnemonic && e.mnemonic.phrase; }
        class A extends d.Description {
            isKeystoreAccount(e) { return !(!e || !e._isKeystoreAccount); }
        }
        function S(e, t) { const r = (0, g.p3)((0, g.gx)(e, "crypto/ciphertext")); if ((0, c.hexlify)((0, u.keccak256)((0, c.concat)([t.slice(16, 32), r]))).substring(2) !== (0, g.gx)(e, "crypto/mac").toLowerCase())
            throw new Error("invalid password"); const n = function (e, t, r) { if ("aes-128-ctr" === (0, g.gx)(e, "crypto/cipher")) {
            const n = (0, g.p3)((0, g.gx)(e, "crypto/cipherparams/iv")), o = new (i().Counter)(n), a = new (i().ModeOfOperation.ctr)(t, o);
            return (0, c.arrayify)(a.decrypt(r));
        } return null; }(e, t.slice(0, 16), r); n || y.throwError("unsupported cipher", m.Logger.errors.UNSUPPORTED_OPERATION, { operation: "decrypt" }); const o = t.slice(32, 64), a = (0, p.computeAddress)(n); if (e.address) {
            let t = e.address.toLowerCase();
            if ("0x" !== t.substring(0, 2) && (t = "0x" + t), (0, s.getAddress)(t) !== a)
                throw new Error("address mismatch");
        } const f = { _isKeystoreAccount: !0, address: a, privateKey: (0, c.hexlify)(n) }; if ("0.1" === (0, g.gx)(e, "x-ethers/version")) {
            const t = (0, g.p3)((0, g.gx)(e, "x-ethers/mnemonicCiphertext")), r = (0, g.p3)((0, g.gx)(e, "x-ethers/mnemonicCounter")), n = new (i().Counter)(r), a = new (i().ModeOfOperation.ctr)(o, n), s = (0, g.gx)(e, "x-ethers/path") || l.defaultPath, u = (0, g.gx)(e, "x-ethers/locale") || "en", h = (0, c.arrayify)(a.decrypt(t));
            try {
                const e = (0, l.entropyToMnemonic)(h, u), t = l.HDNode.fromMnemonic(e, null, u).derivePath(s);
                if (t.privateKey != f.privateKey)
                    throw new Error("mnemonic mismatch");
                f.mnemonic = t.mnemonic;
            }
            catch (e) {
                if (e.code !== m.Logger.errors.INVALID_ARGUMENT || "wordlist" !== e.argument)
                    throw e;
            }
        } return new A(f); }
        function w(e, t, r, n, i) { return (0, c.arrayify)((0, f.n)(e, t, r, n, i)); }
        function E(e, t, r, n, i) { return Promise.resolve(w(e, t, r, n, i)); }
        function T(e, t, r, n, i) { const o = (0, g.Ij)(t), a = (0, g.gx)(e, "crypto/kdf"); if (a && "string" == typeof a) {
            const t = function (e, t) { return y.throwArgumentError("invalid key-derivation function parameters", e, t); };
            if ("scrypt" === a.toLowerCase()) {
                const r = (0, g.p3)((0, g.gx)(e, "crypto/kdfparams/salt")), s = parseInt((0, g.gx)(e, "crypto/kdfparams/n")), c = parseInt((0, g.gx)(e, "crypto/kdfparams/r")), l = parseInt((0, g.gx)(e, "crypto/kdfparams/p"));
                s && c && l || t("kdf", a), 0 != (s & s - 1) && t("N", s);
                const u = parseInt((0, g.gx)(e, "crypto/kdfparams/dklen"));
                return 32 !== u && t("dklen", u), n(o, r, s, c, l, 64, i);
            }
            if ("pbkdf2" === a.toLowerCase()) {
                const n = (0, g.p3)((0, g.gx)(e, "crypto/kdfparams/salt"));
                let i = null;
                const a = (0, g.gx)(e, "crypto/kdfparams/prf");
                "hmac-sha256" === a ? i = "sha256" : "hmac-sha512" === a ? i = "sha512" : t("prf", a);
                const s = parseInt((0, g.gx)(e, "crypto/kdfparams/c")), c = parseInt((0, g.gx)(e, "crypto/kdfparams/dklen"));
                return 32 !== c && t("dklen", c), r(o, n, s, c, i);
            }
        } return y.throwArgumentError("unsupported key-derivation function", "kdf", a); }
        function k(e, t) { const r = JSON.parse(e); return S(r, T(r, t, w, a().syncScrypt)); }
        function B(e, t, r) { return n = this, i = void 0, s = function* () { const n = JSON.parse(e); return S(n, yield T(n, t, E, a().scrypt, r)); }, new ((o = void 0) || (o = Promise))((function (e, t) { function r(e) { try {
            c(s.next(e));
        }
        catch (e) {
            t(e);
        } } function a(e) { try {
            c(s.throw(e));
        }
        catch (e) {
            t(e);
        } } function c(t) { var n; t.done ? e(t.value) : (n = t.value, n instanceof o ? n : new o((function (e) { e(n); }))).then(r, a); } c((s = s.apply(n, i || [])).next()); })); var n, i, o, s; }
        function P(e, t, r, n) { try {
            if ((0, s.getAddress)(e.address) !== (0, p.computeAddress)(e.privateKey))
                throw new Error("address/privateKey mismatch");
            if (v(e)) {
                const t = e.mnemonic;
                if (l.HDNode.fromMnemonic(t.phrase, null, t.locale).derivePath(t.path || l.defaultPath).privateKey != e.privateKey)
                    throw new Error("mnemonic mismatch");
            }
        }
        catch (e) {
            return Promise.reject(e);
        } "function" != typeof r || n || (n = r, r = {}), r || (r = {}); const o = (0, c.arrayify)(e.privateKey), f = (0, g.Ij)(t); let d = null, m = null, b = null; if (v(e)) {
            const t = e.mnemonic;
            d = (0, c.arrayify)((0, l.mnemonicToEntropy)(t.phrase, t.locale || "en")), m = t.path || l.defaultPath, b = t.locale || "en";
        } let y = r.client; y || (y = "ethers.js"); let A = null; A = r.salt ? (0, c.arrayify)(r.salt) : (0, h.O)(32); let S = null; if (r.iv) {
            if (S = (0, c.arrayify)(r.iv), 16 !== S.length)
                throw new Error("invalid iv");
        }
        else
            S = (0, h.O)(16); let w = null; if (r.uuid) {
            if (w = (0, c.arrayify)(r.uuid), 16 !== w.length)
                throw new Error("invalid uuid");
        }
        else
            w = (0, h.O)(16); let E = 1 << 17, T = 8, k = 1; return r.scrypt && (r.scrypt.N && (E = r.scrypt.N), r.scrypt.r && (T = r.scrypt.r), r.scrypt.p && (k = r.scrypt.p)), a().scrypt(f, A, E, T, k, 64, n).then((t => { const r = (t = (0, c.arrayify)(t)).slice(0, 16), n = t.slice(16, 32), a = t.slice(32, 64), s = new (i().Counter)(S), l = new (i().ModeOfOperation.ctr)(r, s), f = (0, c.arrayify)(l.encrypt(o)), p = (0, u.keccak256)((0, c.concat)([n, f])), v = { address: e.address.substring(2).toLowerCase(), id: (0, g.EH)(w), version: 3, Crypto: { cipher: "aes-128-ctr", cipherparams: { iv: (0, c.hexlify)(S).substring(2) }, ciphertext: (0, c.hexlify)(f).substring(2), kdf: "scrypt", kdfparams: { salt: (0, c.hexlify)(A).substring(2), n: E, dklen: 32, p: k, r: T }, mac: p.substring(2) } }; if (d) {
            const e = (0, h.O)(16), t = new (i().Counter)(e), r = new (i().ModeOfOperation.ctr)(a, t), n = (0, c.arrayify)(r.encrypt(d)), o = new Date, s = o.getUTCFullYear() + "-" + (0, g.VP)(o.getUTCMonth() + 1, 2) + "-" + (0, g.VP)(o.getUTCDate(), 2) + "T" + (0, g.VP)(o.getUTCHours(), 2) + "-" + (0, g.VP)(o.getUTCMinutes(), 2) + "-" + (0, g.VP)(o.getUTCSeconds(), 2) + ".0Z";
            v["x-ethers"] = { client: y, gethFilename: "UTC--" + s + "--" + v.address, mnemonicCounter: (0, c.hexlify)(e).substring(2), mnemonicCiphertext: (0, c.hexlify)(n).substring(2), path: m, locale: b, version: "0.1" };
        } return JSON.stringify(v); })); }
    }, 7013: (e, t, r) => {
        "use strict";
        r.d(t, { p3: () => o, VP: () => a, Ij: () => s, gx: () => c, EH: () => l });
        var n = r(3286), i = r(4242);
        function o(e) { return "string" == typeof e && "0x" !== e.substring(0, 2) && (e = "0x" + e), (0, n.arrayify)(e); }
        function a(e, t) { for (e = String(e); e.length < t;)
            e = "0" + e; return e; }
        function s(e) { return "string" == typeof e ? (0, i.Y0)(e, i.Uj.NFKC) : (0, n.arrayify)(e); }
        function c(e, t) { let r = e; const n = t.toLowerCase().split("/"); for (let e = 0; e < n.length; e++) {
            let t = null;
            for (const i in r)
                if (i.toLowerCase() === n[e]) {
                    t = r[i];
                    break;
                }
            if (null === t)
                return null;
            r = t;
        } return r; }
        function l(e) { const t = (0, n.arrayify)(e); t[6] = 15 & t[6] | 64, t[8] = 63 & t[8] | 128; const r = (0, n.hexlify)(t); return [r.substring(2, 10), r.substring(10, 14), r.substring(14, 18), r.substring(18, 22), r.substring(22, 34)].join("-"); }
    }, 8197: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { keccak256: () => a });
        var n = r(4867), i = r.n(n), o = r(3286);
        function a(e) { return "0x" + i().keccak_256((0, o.arrayify)(e)); }
    }, 4867: (e, t, r) => { !function () {
        "use strict";
        var t = "object" == typeof window ? window : {};
        !t.JS_SHA3_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node && (t = r.g);
        for (var n = !t.JS_SHA3_NO_COMMON_JS && e.exports, i = "0123456789abcdef".split(""), o = [0, 8, 16, 24], a = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648], s = [224, 256, 384, 512], c = ["hex", "buffer", "arrayBuffer", "array"], l = function (e, t, r) { return function (n) { return new A(e, t, e).update(n)[r](); }; }, u = function (e, t, r) { return function (n, i) { return new A(e, t, i).update(n)[r](); }; }, f = function (e, t) { var r = l(e, t, "hex"); r.create = function () { return new A(e, t, e); }, r.update = function (e) { return r.create().update(e); }; for (var n = 0; n < c.length; ++n) {
            var i = c[n];
            r[i] = l(e, t, i);
        } return r; }, h = [{ name: "keccak", padding: [1, 256, 65536, 16777216], bits: s, createMethod: f }, { name: "sha3", padding: [6, 1536, 393216, 100663296], bits: s, createMethod: f }, { name: "shake", padding: [31, 7936, 2031616, 520093696], bits: [128, 256], createMethod: function (e, t) { var r = u(e, t, "hex"); r.create = function (r) { return new A(e, t, r); }, r.update = function (e, t) { return r.create(t).update(e); }; for (var n = 0; n < c.length; ++n) {
                    var i = c[n];
                    r[i] = u(e, t, i);
                } return r; } }], d = {}, p = [], g = 0; g < h.length; ++g)
            for (var m = h[g], b = m.bits, y = 0; y < b.length; ++y) {
                var v = m.name + "_" + b[y];
                p.push(v), d[v] = m.createMethod(b[y], m.padding);
            }
        function A(e, t, r) { this.blocks = [], this.s = [], this.padding = t, this.outputBits = r, this.reset = !0, this.block = 0, this.start = 0, this.blockCount = 1600 - (e << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = r >> 5, this.extraBytes = (31 & r) >> 3; for (var n = 0; n < 50; ++n)
            this.s[n] = 0; }
        A.prototype.update = function (e) { var t = "string" != typeof e; t && e.constructor === ArrayBuffer && (e = new Uint8Array(e)); for (var r, n, i = e.length, a = this.blocks, s = this.byteCount, c = this.blockCount, l = 0, u = this.s; l < i;) {
            if (this.reset)
                for (this.reset = !1, a[0] = this.block, r = 1; r < c + 1; ++r)
                    a[r] = 0;
            if (t)
                for (r = this.start; l < i && r < s; ++l)
                    a[r >> 2] |= e[l] << o[3 & r++];
            else
                for (r = this.start; l < i && r < s; ++l)
                    (n = e.charCodeAt(l)) < 128 ? a[r >> 2] |= n << o[3 & r++] : n < 2048 ? (a[r >> 2] |= (192 | n >> 6) << o[3 & r++], a[r >> 2] |= (128 | 63 & n) << o[3 & r++]) : n < 55296 || n >= 57344 ? (a[r >> 2] |= (224 | n >> 12) << o[3 & r++], a[r >> 2] |= (128 | n >> 6 & 63) << o[3 & r++], a[r >> 2] |= (128 | 63 & n) << o[3 & r++]) : (n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(++l)), a[r >> 2] |= (240 | n >> 18) << o[3 & r++], a[r >> 2] |= (128 | n >> 12 & 63) << o[3 & r++], a[r >> 2] |= (128 | n >> 6 & 63) << o[3 & r++], a[r >> 2] |= (128 | 63 & n) << o[3 & r++]);
            if (this.lastByteIndex = r, r >= s) {
                for (this.start = r - s, this.block = a[c], r = 0; r < c; ++r)
                    u[r] ^= a[r];
                S(u), this.reset = !0;
            }
            else
                this.start = r;
        } return this; }, A.prototype.finalize = function () { var e = this.blocks, t = this.lastByteIndex, r = this.blockCount, n = this.s; if (e[t >> 2] |= this.padding[3 & t], this.lastByteIndex === this.byteCount)
            for (e[0] = e[r], t = 1; t < r + 1; ++t)
                e[t] = 0; for (e[r - 1] |= 2147483648, t = 0; t < r; ++t)
            n[t] ^= e[t]; S(n); }, A.prototype.toString = A.prototype.hex = function () { this.finalize(); for (var e, t = this.blockCount, r = this.s, n = this.outputBlocks, o = this.extraBytes, a = 0, s = 0, c = ""; s < n;) {
            for (a = 0; a < t && s < n; ++a, ++s)
                e = r[a], c += i[e >> 4 & 15] + i[15 & e] + i[e >> 12 & 15] + i[e >> 8 & 15] + i[e >> 20 & 15] + i[e >> 16 & 15] + i[e >> 28 & 15] + i[e >> 24 & 15];
            s % t == 0 && (S(r), a = 0);
        } return o && (e = r[a], o > 0 && (c += i[e >> 4 & 15] + i[15 & e]), o > 1 && (c += i[e >> 12 & 15] + i[e >> 8 & 15]), o > 2 && (c += i[e >> 20 & 15] + i[e >> 16 & 15])), c; }, A.prototype.arrayBuffer = function () { this.finalize(); var e, t = this.blockCount, r = this.s, n = this.outputBlocks, i = this.extraBytes, o = 0, a = 0, s = this.outputBits >> 3; e = i ? new ArrayBuffer(n + 1 << 2) : new ArrayBuffer(s); for (var c = new Uint32Array(e); a < n;) {
            for (o = 0; o < t && a < n; ++o, ++a)
                c[a] = r[o];
            a % t == 0 && S(r);
        } return i && (c[o] = r[o], e = e.slice(0, s)), e; }, A.prototype.buffer = A.prototype.arrayBuffer, A.prototype.digest = A.prototype.array = function () { this.finalize(); for (var e, t, r = this.blockCount, n = this.s, i = this.outputBlocks, o = this.extraBytes, a = 0, s = 0, c = []; s < i;) {
            for (a = 0; a < r && s < i; ++a, ++s)
                e = s << 2, t = n[a], c[e] = 255 & t, c[e + 1] = t >> 8 & 255, c[e + 2] = t >> 16 & 255, c[e + 3] = t >> 24 & 255;
            s % r == 0 && S(n);
        } return o && (e = s << 2, t = n[a], o > 0 && (c[e] = 255 & t), o > 1 && (c[e + 1] = t >> 8 & 255), o > 2 && (c[e + 2] = t >> 16 & 255)), c; };
        var S = function (e) { var t, r, n, i, o, s, c, l, u, f, h, d, p, g, m, b, y, v, A, S, w, E, T, k, B, P, M, C, L, F, O, x, N, R, I, D, J, _, U, H, G, j, X, V, z, Z, K, q, Q, W, Y, $, ee, te, re, ne, ie, oe, ae, se, ce, le, ue; for (n = 0; n < 48; n += 2)
            i = e[0] ^ e[10] ^ e[20] ^ e[30] ^ e[40], o = e[1] ^ e[11] ^ e[21] ^ e[31] ^ e[41], s = e[2] ^ e[12] ^ e[22] ^ e[32] ^ e[42], c = e[3] ^ e[13] ^ e[23] ^ e[33] ^ e[43], l = e[4] ^ e[14] ^ e[24] ^ e[34] ^ e[44], u = e[5] ^ e[15] ^ e[25] ^ e[35] ^ e[45], f = e[6] ^ e[16] ^ e[26] ^ e[36] ^ e[46], h = e[7] ^ e[17] ^ e[27] ^ e[37] ^ e[47], t = (d = e[8] ^ e[18] ^ e[28] ^ e[38] ^ e[48]) ^ (s << 1 | c >>> 31), r = (p = e[9] ^ e[19] ^ e[29] ^ e[39] ^ e[49]) ^ (c << 1 | s >>> 31), e[0] ^= t, e[1] ^= r, e[10] ^= t, e[11] ^= r, e[20] ^= t, e[21] ^= r, e[30] ^= t, e[31] ^= r, e[40] ^= t, e[41] ^= r, t = i ^ (l << 1 | u >>> 31), r = o ^ (u << 1 | l >>> 31), e[2] ^= t, e[3] ^= r, e[12] ^= t, e[13] ^= r, e[22] ^= t, e[23] ^= r, e[32] ^= t, e[33] ^= r, e[42] ^= t, e[43] ^= r, t = s ^ (f << 1 | h >>> 31), r = c ^ (h << 1 | f >>> 31), e[4] ^= t, e[5] ^= r, e[14] ^= t, e[15] ^= r, e[24] ^= t, e[25] ^= r, e[34] ^= t, e[35] ^= r, e[44] ^= t, e[45] ^= r, t = l ^ (d << 1 | p >>> 31), r = u ^ (p << 1 | d >>> 31), e[6] ^= t, e[7] ^= r, e[16] ^= t, e[17] ^= r, e[26] ^= t, e[27] ^= r, e[36] ^= t, e[37] ^= r, e[46] ^= t, e[47] ^= r, t = f ^ (i << 1 | o >>> 31), r = h ^ (o << 1 | i >>> 31), e[8] ^= t, e[9] ^= r, e[18] ^= t, e[19] ^= r, e[28] ^= t, e[29] ^= r, e[38] ^= t, e[39] ^= r, e[48] ^= t, e[49] ^= r, g = e[0], m = e[1], Z = e[11] << 4 | e[10] >>> 28, K = e[10] << 4 | e[11] >>> 28, C = e[20] << 3 | e[21] >>> 29, L = e[21] << 3 | e[20] >>> 29, se = e[31] << 9 | e[30] >>> 23, ce = e[30] << 9 | e[31] >>> 23, j = e[40] << 18 | e[41] >>> 14, X = e[41] << 18 | e[40] >>> 14, R = e[2] << 1 | e[3] >>> 31, I = e[3] << 1 | e[2] >>> 31, b = e[13] << 12 | e[12] >>> 20, y = e[12] << 12 | e[13] >>> 20, q = e[22] << 10 | e[23] >>> 22, Q = e[23] << 10 | e[22] >>> 22, F = e[33] << 13 | e[32] >>> 19, O = e[32] << 13 | e[33] >>> 19, le = e[42] << 2 | e[43] >>> 30, ue = e[43] << 2 | e[42] >>> 30, te = e[5] << 30 | e[4] >>> 2, re = e[4] << 30 | e[5] >>> 2, D = e[14] << 6 | e[15] >>> 26, J = e[15] << 6 | e[14] >>> 26, v = e[25] << 11 | e[24] >>> 21, A = e[24] << 11 | e[25] >>> 21, W = e[34] << 15 | e[35] >>> 17, Y = e[35] << 15 | e[34] >>> 17, x = e[45] << 29 | e[44] >>> 3, N = e[44] << 29 | e[45] >>> 3, k = e[6] << 28 | e[7] >>> 4, B = e[7] << 28 | e[6] >>> 4, ne = e[17] << 23 | e[16] >>> 9, ie = e[16] << 23 | e[17] >>> 9, _ = e[26] << 25 | e[27] >>> 7, U = e[27] << 25 | e[26] >>> 7, S = e[36] << 21 | e[37] >>> 11, w = e[37] << 21 | e[36] >>> 11, $ = e[47] << 24 | e[46] >>> 8, ee = e[46] << 24 | e[47] >>> 8, V = e[8] << 27 | e[9] >>> 5, z = e[9] << 27 | e[8] >>> 5, P = e[18] << 20 | e[19] >>> 12, M = e[19] << 20 | e[18] >>> 12, oe = e[29] << 7 | e[28] >>> 25, ae = e[28] << 7 | e[29] >>> 25, H = e[38] << 8 | e[39] >>> 24, G = e[39] << 8 | e[38] >>> 24, E = e[48] << 14 | e[49] >>> 18, T = e[49] << 14 | e[48] >>> 18, e[0] = g ^ ~b & v, e[1] = m ^ ~y & A, e[10] = k ^ ~P & C, e[11] = B ^ ~M & L, e[20] = R ^ ~D & _, e[21] = I ^ ~J & U, e[30] = V ^ ~Z & q, e[31] = z ^ ~K & Q, e[40] = te ^ ~ne & oe, e[41] = re ^ ~ie & ae, e[2] = b ^ ~v & S, e[3] = y ^ ~A & w, e[12] = P ^ ~C & F, e[13] = M ^ ~L & O, e[22] = D ^ ~_ & H, e[23] = J ^ ~U & G, e[32] = Z ^ ~q & W, e[33] = K ^ ~Q & Y, e[42] = ne ^ ~oe & se, e[43] = ie ^ ~ae & ce, e[4] = v ^ ~S & E, e[5] = A ^ ~w & T, e[14] = C ^ ~F & x, e[15] = L ^ ~O & N, e[24] = _ ^ ~H & j, e[25] = U ^ ~G & X, e[34] = q ^ ~W & $, e[35] = Q ^ ~Y & ee, e[44] = oe ^ ~se & le, e[45] = ae ^ ~ce & ue, e[6] = S ^ ~E & g, e[7] = w ^ ~T & m, e[16] = F ^ ~x & k, e[17] = O ^ ~N & B, e[26] = H ^ ~j & R, e[27] = G ^ ~X & I, e[36] = W ^ ~$ & V, e[37] = Y ^ ~ee & z, e[46] = se ^ ~le & te, e[47] = ce ^ ~ue & re, e[8] = E ^ ~g & b, e[9] = T ^ ~m & y, e[18] = x ^ ~k & P, e[19] = N ^ ~B & M, e[28] = j ^ ~R & D, e[29] = X ^ ~I & J, e[38] = $ ^ ~V & Z, e[39] = ee ^ ~z & K, e[48] = le ^ ~te & ne, e[49] = ue ^ ~re & ie, e[0] ^= a[n], e[1] ^= a[n + 1]; };
        if (n)
            e.exports = d;
        else
            for (g = 0; g < p.length; ++g)
                t[p[g]] = d[p[g]];
    }(); }, 711: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { ErrorCode: () => u, LogLevel: () => l, Logger: () => h });
        let n = !1, i = !1;
        const o = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
        let a = o.default, s = null;
        const c = function () { try {
            const e = [];
            if (["NFD", "NFC", "NFKD", "NFKC"].forEach((t => { try {
                if ("test" !== "test".normalize(t))
                    throw new Error("bad normalize");
            }
            catch (r) {
                e.push(t);
            } })), e.length)
                throw new Error("missing " + e.join(", "));
            if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
                throw new Error("broken implementation");
        }
        catch (e) {
            return e.message;
        } return null; }();
        var l, u;
        !function (e) { e.DEBUG = "DEBUG", e.INFO = "INFO", e.WARNING = "WARNING", e.ERROR = "ERROR", e.OFF = "OFF"; }(l || (l = {})), function (e) { e.UNKNOWN_ERROR = "UNKNOWN_ERROR", e.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", e.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", e.NETWORK_ERROR = "NETWORK_ERROR", e.SERVER_ERROR = "SERVER_ERROR", e.TIMEOUT = "TIMEOUT", e.BUFFER_OVERRUN = "BUFFER_OVERRUN", e.NUMERIC_FAULT = "NUMERIC_FAULT", e.MISSING_NEW = "MISSING_NEW", e.INVALID_ARGUMENT = "INVALID_ARGUMENT", e.MISSING_ARGUMENT = "MISSING_ARGUMENT", e.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", e.CALL_EXCEPTION = "CALL_EXCEPTION", e.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", e.NONCE_EXPIRED = "NONCE_EXPIRED", e.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", e.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", e.TRANSACTION_REPLACED = "TRANSACTION_REPLACED"; }(u || (u = {}));
        const f = "0123456789abcdef";
        class h {
            constructor(e) { Object.defineProperty(this, "version", { enumerable: !0, value: e, writable: !1 }); }
            _log(e, t) { const r = e.toLowerCase(); null == o[r] && this.throwArgumentError("invalid log level name", "logLevel", e), a > o[r] || console.log.apply(console, t); }
            debug(...e) { this._log(h.levels.DEBUG, e); }
            info(...e) { this._log(h.levels.INFO, e); }
            warn(...e) { this._log(h.levels.WARNING, e); }
            makeError(e, t, r) { if (i)
                return this.makeError("censored error", t, {}); t || (t = h.errors.UNKNOWN_ERROR), r || (r = {}); const n = []; Object.keys(r).forEach((e => { const t = r[e]; try {
                if (t instanceof Uint8Array) {
                    let r = "";
                    for (let e = 0; e < t.length; e++)
                        r += f[t[e] >> 4], r += f[15 & t[e]];
                    n.push(e + "=Uint8Array(0x" + r + ")");
                }
                else
                    n.push(e + "=" + JSON.stringify(t));
            }
            catch (t) {
                n.push(e + "=" + JSON.stringify(r[e].toString()));
            } })), n.push(`code=${t}`), n.push(`version=${this.version}`); const o = e; n.length && (e += " (" + n.join(", ") + ")"); const a = new Error(e); return a.reason = o, a.code = t, Object.keys(r).forEach((function (e) { a[e] = r[e]; })), a; }
            throwError(e, t, r) { throw this.makeError(e, t, r); }
            throwArgumentError(e, t, r) { return this.throwError(e, h.errors.INVALID_ARGUMENT, { argument: t, value: r }); }
            assert(e, t, r, n) { e || this.throwError(t, r, n); }
            assertArgument(e, t, r, n) { e || this.throwArgumentError(t, r, n); }
            checkNormalize(e) { null == e && (e = "platform missing String.prototype.normalize"), c && this.throwError("platform missing String.prototype.normalize", h.errors.UNSUPPORTED_OPERATION, { operation: "String.prototype.normalize", form: c }); }
            checkSafeUint53(e, t) { "number" == typeof e && (null == t && (t = "value not safe"), (e < 0 || e >= 9007199254740991) && this.throwError(t, h.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "out-of-safe-range", value: e }), e % 1 && this.throwError(t, h.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "non-integer", value: e })); }
            checkArgumentCount(e, t, r) { r = r ? ": " + r : "", e < t && this.throwError("missing argument" + r, h.errors.MISSING_ARGUMENT, { count: e, expectedCount: t }), e > t && this.throwError("too many arguments" + r, h.errors.UNEXPECTED_ARGUMENT, { count: e, expectedCount: t }); }
            checkNew(e, t) { e !== Object && null != e || this.throwError("missing new", h.errors.MISSING_NEW, { name: t.name }); }
            checkAbstract(e, t) { e === t ? this.throwError("cannot instantiate abstract class " + JSON.stringify(t.name) + " directly; use a sub-class", h.errors.UNSUPPORTED_OPERATION, { name: e.name, operation: "new" }) : e !== Object && null != e || this.throwError("missing new", h.errors.MISSING_NEW, { name: t.name }); }
            static globalLogger() { return s || (s = new h("logger/5.4.1")), s; }
            static setCensorship(e, t) { if (!e && t && this.globalLogger().throwError("cannot permanently disable censorship", h.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" }), n) {
                if (!e)
                    return;
                this.globalLogger().throwError("error censorship permanent", h.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" });
            } i = !!e, n = !!t; }
            static setLogLevel(e) { const t = o[e.toLowerCase()]; null != t ? a = t : h.globalLogger().warn("invalid log level - " + e); }
            static from(e) { return new h(e); }
        }
        h.errors = u, h.levels = l;
    }, 5306: (e, t, r) => {
        "use strict";
        r.d(t, { n: () => o });
        var n = r(3286), i = r(7158);
        function o(e, t, r, o, a) { let s; e = (0, n.arrayify)(e), t = (0, n.arrayify)(t); let c = 1; const l = new Uint8Array(o), u = new Uint8Array(t.length + 4); let f, h; u.set(t); for (let d = 1; d <= c; d++) {
            u[t.length] = d >> 24 & 255, u[t.length + 1] = d >> 16 & 255, u[t.length + 2] = d >> 8 & 255, u[t.length + 3] = 255 & d;
            let p = (0, n.arrayify)((0, i.Gy)(a, e, u));
            s || (s = p.length, h = new Uint8Array(s), c = Math.ceil(o / s), f = o - (c - 1) * s), h.set(p);
            for (let t = 1; t < r; t++) {
                p = (0, n.arrayify)((0, i.Gy)(a, e, p));
                for (let e = 0; e < s; e++)
                    h[e] ^= p[e];
            }
            const g = (d - 1) * s, m = d === c ? f : s;
            l.set((0, n.arrayify)(h).slice(0, m), g);
        } return (0, n.hexlify)(l); }
    }, 3587: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { Description: () => p, checkProperties: () => c, deepCopy: () => d, defineReadOnly: () => o, getStatic: () => a, resolveProperties: () => s, shallowCopy: () => l });
        var n = r(711);
        const i = new n.Logger("properties/5.4.1");
        function o(e, t, r) { Object.defineProperty(e, t, { enumerable: !0, value: r, writable: !1 }); }
        function a(e, t) { for (let r = 0; r < 32; r++) {
            if (e[t])
                return e[t];
            if (!e.prototype || "object" != typeof e.prototype)
                break;
            e = Object.getPrototypeOf(e.prototype).constructor;
        } return null; }
        function s(e) { return t = this, r = void 0, i = function* () { const t = Object.keys(e).map((t => { const r = e[t]; return Promise.resolve(r).then((e => ({ key: t, value: e }))); })); return (yield Promise.all(t)).reduce(((e, t) => (e[t.key] = t.value, e)), {}); }, new ((n = void 0) || (n = Promise))((function (e, o) { function a(e) { try {
            c(i.next(e));
        }
        catch (e) {
            o(e);
        } } function s(e) { try {
            c(i.throw(e));
        }
        catch (e) {
            o(e);
        } } function c(t) { var r; t.done ? e(t.value) : (r = t.value, r instanceof n ? r : new n((function (e) { e(r); }))).then(a, s); } c((i = i.apply(t, r || [])).next()); })); var t, r, n, i; }
        function c(e, t) { e && "object" == typeof e || i.throwArgumentError("invalid object", "object", e), Object.keys(e).forEach((r => { t[r] || i.throwArgumentError("invalid object key - " + r, "transaction:" + r, e); })); }
        function l(e) { const t = {}; for (const r in e)
            t[r] = e[r]; return t; }
        const u = { bigint: !0, boolean: !0, function: !0, number: !0, string: !0 };
        function f(e) { if (null == e || u[typeof e])
            return !0; if (Array.isArray(e) || "object" == typeof e) {
            if (!Object.isFrozen(e))
                return !1;
            const t = Object.keys(e);
            for (let r = 0; r < t.length; r++) {
                let n = null;
                try {
                    n = e[t[r]];
                }
                catch (e) {
                    continue;
                }
                if (!f(n))
                    return !1;
            }
            return !0;
        } return i.throwArgumentError("Cannot deepCopy " + typeof e, "object", e); }
        function h(e) { if (f(e))
            return e; if (Array.isArray(e))
            return Object.freeze(e.map((e => d(e)))); if ("object" == typeof e) {
            const t = {};
            for (const r in e) {
                const n = e[r];
                void 0 !== n && o(t, r, d(n));
            }
            return t;
        } return i.throwArgumentError("Cannot deepCopy " + typeof e, "object", e); }
        function d(e) { return h(e); }
        class p {
            constructor(e) { for (const t in e)
                this[t] = d(e[t]); }
        }
    }, 7986: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { randomBytes: () => n.O, shuffled: () => i });
        var n = r(4478);
        function i(e) { for (let t = (e = e.slice()).length - 1; t > 0; t--) {
            const r = Math.floor(Math.random() * (t + 1)), n = e[t];
            e[t] = e[r], e[r] = n;
        } return e; }
    }, 4478: (e, t, r) => {
        "use strict";
        r.d(t, { O: () => c });
        var n = r(3286), i = r(711);
        const o = new i.Logger("random/5.4.0");
        let a = null;
        try {
            if (a = window, null == a)
                throw new Error("try next");
        }
        catch (e) {
            try {
                if (a = r.g, null == a)
                    throw new Error("try next");
            }
            catch (e) {
                a = {};
            }
        }
        let s = a.crypto || a.msCrypto;
        function c(e) { (e <= 0 || e > 1024 || e % 1) && o.throwArgumentError("invalid length", "length", e); const t = new Uint8Array(e); return s.getRandomValues(t), (0, n.arrayify)(t); }
        s && s.getRandomValues || (o.warn("WARNING: Missing strong random number source"), s = { getRandomValues: function (e) { return o.throwError("no secure random source avaialble", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "crypto.getRandomValues" }); } });
    }, 1843: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { decode: () => h, encode: () => l });
        var n = r(3286), i = r(711);
        const o = new i.Logger("rlp/5.4.0");
        function a(e) { const t = []; for (; e;)
            t.unshift(255 & e), e >>= 8; return t; }
        function s(e, t, r) { let n = 0; for (let i = 0; i < r; i++)
            n = 256 * n + e[t + i]; return n; }
        function c(e) { if (Array.isArray(e)) {
            let t = [];
            if (e.forEach((function (e) { t = t.concat(c(e)); })), t.length <= 55)
                return t.unshift(192 + t.length), t;
            const r = a(t.length);
            return r.unshift(247 + r.length), r.concat(t);
        } (0, n.isBytesLike)(e) || o.throwArgumentError("RLP object must be BytesLike", "object", e); const t = Array.prototype.slice.call((0, n.arrayify)(e)); if (1 === t.length && t[0] <= 127)
            return t; if (t.length <= 55)
            return t.unshift(128 + t.length), t; const r = a(t.length); return r.unshift(183 + r.length), r.concat(t); }
        function l(e) { return (0, n.hexlify)(c(e)); }
        function u(e, t, r, n) { const a = []; for (; r < t + 1 + n;) {
            const s = f(e, r);
            a.push(s.result), (r += s.consumed) > t + 1 + n && o.throwError("child data too short", i.Logger.errors.BUFFER_OVERRUN, {});
        } return { consumed: 1 + n, result: a }; }
        function f(e, t) { if (0 === e.length && o.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {}), e[t] >= 248) {
            const r = e[t] - 247;
            t + 1 + r > e.length && o.throwError("data short segment too short", i.Logger.errors.BUFFER_OVERRUN, {});
            const n = s(e, t + 1, r);
            return t + 1 + r + n > e.length && o.throwError("data long segment too short", i.Logger.errors.BUFFER_OVERRUN, {}), u(e, t, t + 1 + r, r + n);
        } if (e[t] >= 192) {
            const r = e[t] - 192;
            return t + 1 + r > e.length && o.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {}), u(e, t, t + 1, r);
        } if (e[t] >= 184) {
            const r = e[t] - 183;
            t + 1 + r > e.length && o.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {});
            const a = s(e, t + 1, r);
            return t + 1 + r + a > e.length && o.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {}), { consumed: 1 + r + a, result: (0, n.hexlify)(e.slice(t + 1 + r, t + 1 + r + a)) };
        } if (e[t] >= 128) {
            const r = e[t] - 128;
            return t + 1 + r > e.length && o.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {}), { consumed: 1 + r, result: (0, n.hexlify)(e.slice(t + 1, t + 1 + r)) };
        } return { consumed: 1, result: (0, n.hexlify)(e[t]) }; }
        function h(e) { const t = (0, n.arrayify)(e), r = f(t, 0); return r.consumed !== t.length && o.throwArgumentError("invalid rlp data", "data", e), r.result; }
    }, 1278: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { computeHmac: () => n.Gy, ripemd160: () => n.bP, sha256: () => n.JQ, sha512: () => n.o, SupportedAlgorithm: () => i.p });
        var n = r(7158), i = r(1261);
    }, 7158: (e, t, r) => {
        "use strict";
        r.d(t, { Gy: () => h, bP: () => l, JQ: () => u, o: () => f });
        var n = r(3715), i = r.n(n), o = r(3286), a = r(1261), s = r(711);
        const c = new s.Logger("sha2/5.4.0");
        function l(e) { return "0x" + i().ripemd160().update((0, o.arrayify)(e)).digest("hex"); }
        function u(e) { return "0x" + i().sha256().update((0, o.arrayify)(e)).digest("hex"); }
        function f(e) { return "0x" + i().sha512().update((0, o.arrayify)(e)).digest("hex"); }
        function h(e, t, r) { return a.p[e] || c.throwError("unsupported algorithm " + e, s.Logger.errors.UNSUPPORTED_OPERATION, { operation: "hmac", algorithm: e }), "0x" + i().hmac(i()[e], (0, o.arrayify)(t)).update((0, o.arrayify)(r)).digest("hex"); }
    }, 1261: (e, t, r) => {
        "use strict";
        var n;
        r.d(t, { p: () => n }), function (e) { e.sha256 = "sha256", e.sha512 = "sha512"; }(n || (n = {}));
    }, 2768: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { SigningKey: () => K, computePublicKey: () => Q, recoverPublicKey: () => q });
        var n = r(3550), i = r.n(n), o = r(3715), a = r.n(o);
        function s(e, t, r) { return r = { path: t, exports: {}, require: function (e, t) { return function () { throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs"); }(null == t && r.path); } }, e(r, r.exports), r.exports; }
        "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== r.g ? r.g : "undefined" != typeof self && self;
        var c = l;
        function l(e, t) { if (!e)
            throw new Error(t || "Assertion failed"); }
        l.equal = function (e, t, r) { if (e != t)
            throw new Error(r || "Assertion failed: " + e + " != " + t); };
        var u = s((function (e, t) { var r = t; function n(e) { return 1 === e.length ? "0" + e : e; } function i(e) { for (var t = "", r = 0; r < e.length; r++)
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
                var i = e.charCodeAt(n), o = i >> 8, a = 255 & i;
                o ? r.push(o, a) : r.push(a);
            } return r; }, r.zero2 = n, r.toHex = i, r.encode = function (e, t) { return "hex" === t ? i(e) : e; }; })), f = s((function (e, t) { var r = t; r.assert = c, r.toArray = u.toArray, r.zero2 = u.zero2, r.toHex = u.toHex, r.encode = u.encode, r.getNAF = function (e, t, r) { var n = new Array(Math.max(e.bitLength(), r) + 1); n.fill(0); for (var i = 1 << t + 1, o = e.clone(), a = 0; a < n.length; a++) {
            var s, c = o.andln(i - 1);
            o.isOdd() ? (s = c > (i >> 1) - 1 ? (i >> 1) - c : c, o.isubn(s)) : s = 0, n[a] = s, o.iushrn(1);
        } return n; }, r.getJSF = function (e, t) { var r = [[], []]; e = e.clone(), t = t.clone(); for (var n, i = 0, o = 0; e.cmpn(-i) > 0 || t.cmpn(-o) > 0;) {
            var a, s, c = e.andln(3) + i & 3, l = t.andln(3) + o & 3;
            3 === c && (c = -1), 3 === l && (l = -1), a = 0 == (1 & c) ? 0 : 3 != (n = e.andln(7) + i & 7) && 5 !== n || 2 !== l ? c : -c, r[0].push(a), s = 0 == (1 & l) ? 0 : 3 != (n = t.andln(7) + o & 7) && 5 !== n || 2 !== c ? l : -l, r[1].push(s), 2 * i === a + 1 && (i = 1 - i), 2 * o === s + 1 && (o = 1 - o), e.iushrn(1), t.iushrn(1);
        } return r; }, r.cachedProperty = function (e, t, r) { var n = "_" + t; e.prototype[t] = function () { return void 0 !== this[n] ? this[n] : this[n] = r.call(this); }; }, r.parseBytes = function (e) { return "string" == typeof e ? r.toArray(e, "hex") : e; }, r.intFromLE = function (e) { return new (i())(e, "hex", "le"); }; })), h = f.getNAF, d = f.getJSF, p = f.assert;
        function g(e, t) { this.type = e, this.p = new (i())(t.p, 16), this.red = t.prime ? i().red(t.prime) : i().mont(this.p), this.zero = new (i())(0).toRed(this.red), this.one = new (i())(1).toRed(this.red), this.two = new (i())(2).toRed(this.red), this.n = t.n && new (i())(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0; var r = this.n && this.p.div(this.n); !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red)); }
        var m = g;
        function b(e, t) { this.curve = e, this.type = t, this.precomputed = null; }
        g.prototype.point = function () { throw new Error("Not implemented"); }, g.prototype.validate = function () { throw new Error("Not implemented"); }, g.prototype._fixedNafMul = function (e, t) { p(e.precomputed); var r = e._getDoubles(), n = h(t, 1, this._bitLength), i = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1); i /= 3; var o, a, s = []; for (o = 0; o < n.length; o += r.step) {
            a = 0;
            for (var c = o + r.step - 1; c >= o; c--)
                a = (a << 1) + n[c];
            s.push(a);
        } for (var l = this.jpoint(null, null, null), u = this.jpoint(null, null, null), f = i; f > 0; f--) {
            for (o = 0; o < s.length; o++)
                (a = s[o]) === f ? u = u.mixedAdd(r.points[o]) : a === -f && (u = u.mixedAdd(r.points[o].neg()));
            l = l.add(u);
        } return l.toP(); }, g.prototype._wnafMul = function (e, t) { var r = 4, n = e._getNAFPoints(r); r = n.wnd; for (var i = n.points, o = h(t, r, this._bitLength), a = this.jpoint(null, null, null), s = o.length - 1; s >= 0; s--) {
            for (var c = 0; s >= 0 && 0 === o[s]; s--)
                c++;
            if (s >= 0 && c++, a = a.dblp(c), s < 0)
                break;
            var l = o[s];
            p(0 !== l), a = "affine" === e.type ? l > 0 ? a.mixedAdd(i[l - 1 >> 1]) : a.mixedAdd(i[-l - 1 >> 1].neg()) : l > 0 ? a.add(i[l - 1 >> 1]) : a.add(i[-l - 1 >> 1].neg());
        } return "affine" === e.type ? a.toP() : a; }, g.prototype._wnafMulAdd = function (e, t, r, n, i) { var o, a, s, c = this._wnafT1, l = this._wnafT2, u = this._wnafT3, f = 0; for (o = 0; o < n; o++) {
            var p = (s = t[o])._getNAFPoints(e);
            c[o] = p.wnd, l[o] = p.points;
        } for (o = n - 1; o >= 1; o -= 2) {
            var g = o - 1, m = o;
            if (1 === c[g] && 1 === c[m]) {
                var b = [t[g], null, null, t[m]];
                0 === t[g].y.cmp(t[m].y) ? (b[1] = t[g].add(t[m]), b[2] = t[g].toJ().mixedAdd(t[m].neg())) : 0 === t[g].y.cmp(t[m].y.redNeg()) ? (b[1] = t[g].toJ().mixedAdd(t[m]), b[2] = t[g].add(t[m].neg())) : (b[1] = t[g].toJ().mixedAdd(t[m]), b[2] = t[g].toJ().mixedAdd(t[m].neg()));
                var y = [-3, -1, -5, -7, 0, 7, 5, 1, 3], v = d(r[g], r[m]);
                for (f = Math.max(v[0].length, f), u[g] = new Array(f), u[m] = new Array(f), a = 0; a < f; a++) {
                    var A = 0 | v[0][a], S = 0 | v[1][a];
                    u[g][a] = y[3 * (A + 1) + (S + 1)], u[m][a] = 0, l[g] = b;
                }
            }
            else
                u[g] = h(r[g], c[g], this._bitLength), u[m] = h(r[m], c[m], this._bitLength), f = Math.max(u[g].length, f), f = Math.max(u[m].length, f);
        } var w = this.jpoint(null, null, null), E = this._wnafT4; for (o = f; o >= 0; o--) {
            for (var T = 0; o >= 0;) {
                var k = !0;
                for (a = 0; a < n; a++)
                    E[a] = 0 | u[a][o], 0 !== E[a] && (k = !1);
                if (!k)
                    break;
                T++, o--;
            }
            if (o >= 0 && T++, w = w.dblp(T), o < 0)
                break;
            for (a = 0; a < n; a++) {
                var B = E[a];
                0 !== B && (B > 0 ? s = l[a][B - 1 >> 1] : B < 0 && (s = l[a][-B - 1 >> 1].neg()), w = "affine" === s.type ? w.mixedAdd(s) : w.add(s));
            }
        } for (o = 0; o < n; o++)
            l[o] = null; return i ? w : w.toP(); }, g.BasePoint = b, b.prototype.eq = function () { throw new Error("Not implemented"); }, b.prototype.validate = function () { return this.curve.validate(this); }, g.prototype.decodePoint = function (e, t) { e = f.toArray(e, t); var r = this.p.byteLength(); if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * r)
            return 6 === e[0] ? p(e[e.length - 1] % 2 == 0) : 7 === e[0] && p(e[e.length - 1] % 2 == 1), this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r)); if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r)
            return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]); throw new Error("Unknown point format"); }, b.prototype.encodeCompressed = function (e) { return this.encode(e, !0); }, b.prototype._encode = function (e) { var t = this.curve.p.byteLength(), r = this.getX().toArray("be", t); return e ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", t)); }, b.prototype.encode = function (e, t) { return f.encode(this._encode(t), e); }, b.prototype.precompute = function (e) { if (this.precomputed)
            return this; var t = { doubles: null, naf: null, beta: null }; return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this; }, b.prototype._hasDoubles = function (e) { if (!this.precomputed)
            return !1; var t = this.precomputed.doubles; return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step); }, b.prototype._getDoubles = function (e, t) { if (this.precomputed && this.precomputed.doubles)
            return this.precomputed.doubles; for (var r = [this], n = this, i = 0; i < t; i += e) {
            for (var o = 0; o < e; o++)
                n = n.dbl();
            r.push(n);
        } return { step: e, points: r }; }, b.prototype._getNAFPoints = function (e) { if (this.precomputed && this.precomputed.naf)
            return this.precomputed.naf; for (var t = [this], r = (1 << e) - 1, n = 1 === r ? null : this.dbl(), i = 1; i < r; i++)
            t[i] = t[i - 1].add(n); return { wnd: e, points: t }; }, b.prototype._getBeta = function () { return null; }, b.prototype.dblp = function (e) { for (var t = this, r = 0; r < e; r++)
            t = t.dbl(); return t; };
        var y = s((function (e) { "function" == typeof Object.create ? e.exports = function (e, t) { t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })); } : e.exports = function (e, t) { if (t) {
            e.super_ = t;
            var r = function () { };
            r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e;
        } }; })), v = f.assert;
        function A(e) { m.call(this, "short", e), this.a = new (i())(e.a, 16).toRed(this.red), this.b = new (i())(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4); }
        y(A, m);
        var S = A;
        function w(e, t, r, n) { m.BasePoint.call(this, e, "affine"), null === t && null === r ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new (i())(t, 16), this.y = new (i())(r, 16), n && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1); }
        function E(e, t, r, n) { m.BasePoint.call(this, e, "jacobian"), null === t && null === r && null === n ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new (i())(0)) : (this.x = new (i())(t, 16), this.y = new (i())(r, 16), this.z = new (i())(n, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one; }
        A.prototype._getEndomorphism = function (e) { if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
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
        } }, A.prototype._getEndoRoots = function (e) { var t = e === this.p ? this.red : i().mont(e), r = new (i())(2).toRed(t).redInvm(), n = r.redNeg(), o = new (i())(3).toRed(t).redNeg().redSqrt().redMul(r); return [n.redAdd(o).fromRed(), n.redSub(o).fromRed()]; }, A.prototype._getEndoBasis = function (e) { for (var t, r, n, o, a, s, c, l, u, f = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), h = e, d = this.n.clone(), p = new (i())(1), g = new (i())(0), m = new (i())(0), b = new (i())(1), y = 0; 0 !== h.cmpn(0);) {
            var v = d.div(h);
            l = d.sub(v.mul(h)), u = m.sub(v.mul(p));
            var A = b.sub(v.mul(g));
            if (!n && l.cmp(f) < 0)
                t = c.neg(), r = p, n = l.neg(), o = u;
            else if (n && 2 == ++y)
                break;
            c = l, d = h, h = l, m = p, p = u, b = g, g = A;
        } a = l.neg(), s = u; var S = n.sqr().add(o.sqr()); return a.sqr().add(s.sqr()).cmp(S) >= 0 && (a = t, s = r), n.negative && (n = n.neg(), o = o.neg()), a.negative && (a = a.neg(), s = s.neg()), [{ a: n, b: o }, { a, b: s }]; }, A.prototype._endoSplit = function (e) { var t = this.endo.basis, r = t[0], n = t[1], i = n.b.mul(e).divRound(this.n), o = r.b.neg().mul(e).divRound(this.n), a = i.mul(r.a), s = o.mul(n.a), c = i.mul(r.b), l = o.mul(n.b); return { k1: e.sub(a).sub(s), k2: c.add(l).neg() }; }, A.prototype.pointFromX = function (e, t) { (e = new (i())(e, 16)).red || (e = e.toRed(this.red)); var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), n = r.redSqrt(); if (0 !== n.redSqr().redSub(r).cmp(this.zero))
            throw new Error("invalid point"); var o = n.fromRed().isOdd(); return (t && !o || !t && o) && (n = n.redNeg()), this.point(e, n); }, A.prototype.validate = function (e) { if (e.inf)
            return !0; var t = e.x, r = e.y, n = this.a.redMul(t), i = t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b); return 0 === r.redSqr().redISub(i).cmpn(0); }, A.prototype._endoWnafMulAdd = function (e, t, r) { for (var n = this._endoWnafT1, i = this._endoWnafT2, o = 0; o < e.length; o++) {
            var a = this._endoSplit(t[o]), s = e[o], c = s._getBeta();
            a.k1.negative && (a.k1.ineg(), s = s.neg(!0)), a.k2.negative && (a.k2.ineg(), c = c.neg(!0)), n[2 * o] = s, n[2 * o + 1] = c, i[2 * o] = a.k1, i[2 * o + 1] = a.k2;
        } for (var l = this._wnafMulAdd(1, n, i, 2 * o, r), u = 0; u < 2 * o; u++)
            n[u] = null, i[u] = null; return l; }, y(w, m.BasePoint), A.prototype.point = function (e, t, r) { return new w(this, e, t, r); }, A.prototype.pointFromJSON = function (e, t) { return w.fromJSON(this, e, t); }, w.prototype._getBeta = function () { if (this.curve.endo) {
            var e = this.precomputed;
            if (e && e.beta)
                return e.beta;
            var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
            if (e) {
                var r = this.curve, n = function (e) { return r.point(e.x.redMul(r.endo.beta), e.y); };
                e.beta = t, t.precomputed = { beta: null, naf: e.naf && { wnd: e.naf.wnd, points: e.naf.points.map(n) }, doubles: e.doubles && { step: e.doubles.step, points: e.doubles.points.map(n) } };
            }
            return t;
        } }, w.prototype.toJSON = function () { return this.precomputed ? [this.x, this.y, this.precomputed && { doubles: this.precomputed.doubles && { step: this.precomputed.doubles.step, points: this.precomputed.doubles.points.slice(1) }, naf: this.precomputed.naf && { wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1) } }] : [this.x, this.y]; }, w.fromJSON = function (e, t, r) { "string" == typeof t && (t = JSON.parse(t)); var n = e.point(t[0], t[1], r); if (!t[2])
            return n; function i(t) { return e.point(t[0], t[1], r); } var o = t[2]; return n.precomputed = { beta: null, doubles: o.doubles && { step: o.doubles.step, points: [n].concat(o.doubles.points.map(i)) }, naf: o.naf && { wnd: o.naf.wnd, points: [n].concat(o.naf.points.map(i)) } }, n; }, w.prototype.inspect = function () { return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"; }, w.prototype.isInfinity = function () { return this.inf; }, w.prototype.add = function (e) { if (this.inf)
            return e; if (e.inf)
            return this; if (this.eq(e))
            return this.dbl(); if (this.neg().eq(e))
            return this.curve.point(null, null); if (0 === this.x.cmp(e.x))
            return this.curve.point(null, null); var t = this.y.redSub(e.y); 0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm())); var r = t.redSqr().redISub(this.x).redISub(e.x), n = t.redMul(this.x.redSub(r)).redISub(this.y); return this.curve.point(r, n); }, w.prototype.dbl = function () { if (this.inf)
            return this; var e = this.y.redAdd(this.y); if (0 === e.cmpn(0))
            return this.curve.point(null, null); var t = this.curve.a, r = this.x.redSqr(), n = e.redInvm(), i = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(n), o = i.redSqr().redISub(this.x.redAdd(this.x)), a = i.redMul(this.x.redSub(o)).redISub(this.y); return this.curve.point(o, a); }, w.prototype.getX = function () { return this.x.fromRed(); }, w.prototype.getY = function () { return this.y.fromRed(); }, w.prototype.mul = function (e) { return e = new (i())(e, 16), this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e); }, w.prototype.mulAdd = function (e, t, r) { var n = [this, t], i = [e, r]; return this.curve.endo ? this.curve._endoWnafMulAdd(n, i) : this.curve._wnafMulAdd(1, n, i, 2); }, w.prototype.jmulAdd = function (e, t, r) { var n = [this, t], i = [e, r]; return this.curve.endo ? this.curve._endoWnafMulAdd(n, i, !0) : this.curve._wnafMulAdd(1, n, i, 2, !0); }, w.prototype.eq = function (e) { return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y)); }, w.prototype.neg = function (e) { if (this.inf)
            return this; var t = this.curve.point(this.x, this.y.redNeg()); if (e && this.precomputed) {
            var r = this.precomputed, n = function (e) { return e.neg(); };
            t.precomputed = { naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(n) }, doubles: r.doubles && { step: r.doubles.step, points: r.doubles.points.map(n) } };
        } return t; }, w.prototype.toJ = function () { return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one); }, y(E, m.BasePoint), A.prototype.jpoint = function (e, t, r) { return new E(this, e, t, r); }, E.prototype.toP = function () { if (this.isInfinity())
            return this.curve.point(null, null); var e = this.z.redInvm(), t = e.redSqr(), r = this.x.redMul(t), n = this.y.redMul(t).redMul(e); return this.curve.point(r, n); }, E.prototype.neg = function () { return this.curve.jpoint(this.x, this.y.redNeg(), this.z); }, E.prototype.add = function (e) { if (this.isInfinity())
            return e; if (e.isInfinity())
            return this; var t = e.z.redSqr(), r = this.z.redSqr(), n = this.x.redMul(t), i = e.x.redMul(r), o = this.y.redMul(t.redMul(e.z)), a = e.y.redMul(r.redMul(this.z)), s = n.redSub(i), c = o.redSub(a); if (0 === s.cmpn(0))
            return 0 !== c.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl(); var l = s.redSqr(), u = l.redMul(s), f = n.redMul(l), h = c.redSqr().redIAdd(u).redISub(f).redISub(f), d = c.redMul(f.redISub(h)).redISub(o.redMul(u)), p = this.z.redMul(e.z).redMul(s); return this.curve.jpoint(h, d, p); }, E.prototype.mixedAdd = function (e) { if (this.isInfinity())
            return e.toJ(); if (e.isInfinity())
            return this; var t = this.z.redSqr(), r = this.x, n = e.x.redMul(t), i = this.y, o = e.y.redMul(t).redMul(this.z), a = r.redSub(n), s = i.redSub(o); if (0 === a.cmpn(0))
            return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl(); var c = a.redSqr(), l = c.redMul(a), u = r.redMul(c), f = s.redSqr().redIAdd(l).redISub(u).redISub(u), h = s.redMul(u.redISub(f)).redISub(i.redMul(l)), d = this.z.redMul(a); return this.curve.jpoint(f, h, d); }, E.prototype.dblp = function (e) { if (0 === e)
            return this; if (this.isInfinity())
            return this; if (!e)
            return this.dbl(); var t; if (this.curve.zeroA || this.curve.threeA) {
            var r = this;
            for (t = 0; t < e; t++)
                r = r.dbl();
            return r;
        } var n = this.curve.a, i = this.curve.tinv, o = this.x, a = this.y, s = this.z, c = s.redSqr().redSqr(), l = a.redAdd(a); for (t = 0; t < e; t++) {
            var u = o.redSqr(), f = l.redSqr(), h = f.redSqr(), d = u.redAdd(u).redIAdd(u).redIAdd(n.redMul(c)), p = o.redMul(f), g = d.redSqr().redISub(p.redAdd(p)), m = p.redISub(g), b = d.redMul(m);
            b = b.redIAdd(b).redISub(h);
            var y = l.redMul(s);
            t + 1 < e && (c = c.redMul(h)), o = g, s = y, l = b;
        } return this.curve.jpoint(o, l.redMul(i), s); }, E.prototype.dbl = function () { return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl(); }, E.prototype._zeroDbl = function () { var e, t, r; if (this.zOne) {
            var n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), a = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
            a = a.redIAdd(a);
            var s = n.redAdd(n).redIAdd(n), c = s.redSqr().redISub(a).redISub(a), l = o.redIAdd(o);
            l = (l = l.redIAdd(l)).redIAdd(l), e = c, t = s.redMul(a.redISub(c)).redISub(l), r = this.y.redAdd(this.y);
        }
        else {
            var u = this.x.redSqr(), f = this.y.redSqr(), h = f.redSqr(), d = this.x.redAdd(f).redSqr().redISub(u).redISub(h);
            d = d.redIAdd(d);
            var p = u.redAdd(u).redIAdd(u), g = p.redSqr(), m = h.redIAdd(h);
            m = (m = m.redIAdd(m)).redIAdd(m), e = g.redISub(d).redISub(d), t = p.redMul(d.redISub(e)).redISub(m), r = (r = this.y.redMul(this.z)).redIAdd(r);
        } return this.curve.jpoint(e, t, r); }, E.prototype._threeDbl = function () { var e, t, r; if (this.zOne) {
            var n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), a = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
            a = a.redIAdd(a);
            var s = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a), c = s.redSqr().redISub(a).redISub(a);
            e = c;
            var l = o.redIAdd(o);
            l = (l = l.redIAdd(l)).redIAdd(l), t = s.redMul(a.redISub(c)).redISub(l), r = this.y.redAdd(this.y);
        }
        else {
            var u = this.z.redSqr(), f = this.y.redSqr(), h = this.x.redMul(f), d = this.x.redSub(u).redMul(this.x.redAdd(u));
            d = d.redAdd(d).redIAdd(d);
            var p = h.redIAdd(h), g = (p = p.redIAdd(p)).redAdd(p);
            e = d.redSqr().redISub(g), r = this.y.redAdd(this.z).redSqr().redISub(f).redISub(u);
            var m = f.redSqr();
            m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m), t = d.redMul(p.redISub(e)).redISub(m);
        } return this.curve.jpoint(e, t, r); }, E.prototype._dbl = function () { var e = this.curve.a, t = this.x, r = this.y, n = this.z, i = n.redSqr().redSqr(), o = t.redSqr(), a = r.redSqr(), s = o.redAdd(o).redIAdd(o).redIAdd(e.redMul(i)), c = t.redAdd(t), l = (c = c.redIAdd(c)).redMul(a), u = s.redSqr().redISub(l.redAdd(l)), f = l.redISub(u), h = a.redSqr(); h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h); var d = s.redMul(f).redISub(h), p = r.redAdd(r).redMul(n); return this.curve.jpoint(u, d, p); }, E.prototype.trpl = function () { if (!this.curve.zeroA)
            return this.dbl().add(this); var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(), n = t.redSqr(), i = e.redAdd(e).redIAdd(e), o = i.redSqr(), a = this.x.redAdd(t).redSqr().redISub(e).redISub(n), s = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(o)).redSqr(), c = n.redIAdd(n); c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c); var l = i.redIAdd(a).redSqr().redISub(o).redISub(s).redISub(c), u = t.redMul(l); u = (u = u.redIAdd(u)).redIAdd(u); var f = this.x.redMul(s).redISub(u); f = (f = f.redIAdd(f)).redIAdd(f); var h = this.y.redMul(l.redMul(c.redISub(l)).redISub(a.redMul(s))); h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h); var d = this.z.redAdd(a).redSqr().redISub(r).redISub(s); return this.curve.jpoint(f, h, d); }, E.prototype.mul = function (e, t) { return e = new (i())(e, t), this.curve._wnafMul(this, e); }, E.prototype.eq = function (e) { if ("affine" === e.type)
            return this.eq(e.toJ()); if (this === e)
            return !0; var t = this.z.redSqr(), r = e.z.redSqr(); if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))
            return !1; var n = t.redMul(this.z), i = r.redMul(e.z); return 0 === this.y.redMul(i).redISub(e.y.redMul(n)).cmpn(0); }, E.prototype.eqXToP = function (e) { var t = this.z.redSqr(), r = e.toRed(this.curve.red).redMul(t); if (0 === this.x.cmp(r))
            return !0; for (var n = e.clone(), i = this.curve.redN.redMul(t);;) {
            if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)
                return !1;
            if (r.redIAdd(i), 0 === this.x.cmp(r))
                return !0;
        } }, E.prototype.inspect = function () { return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"; }, E.prototype.isInfinity = function () { return 0 === this.z.cmpn(0); };
        var T = s((function (e, t) { var r = t; r.base = m, r.short = S, r.mont = null, r.edwards = null; })), k = s((function (e, t) { var r, n = t, i = f.assert; function o(e) { "short" === e.type ? this.curve = new T.short(e) : "edwards" === e.type ? this.curve = new T.edwards(e) : this.curve = new T.mont(e), this.g = this.curve.g, this.n = this.curve.n, this.hash = e.hash, i(this.g.validate(), "Invalid curve"), i(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O"); } function s(e, t) { Object.defineProperty(n, e, { configurable: !0, enumerable: !0, get: function () { var r = new o(t); return Object.defineProperty(n, e, { configurable: !0, enumerable: !0, value: r }), r; } }); } n.PresetCurve = o, s("p192", { type: "short", prime: "p192", p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff", a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc", b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1", n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831", hash: a().sha256, gRed: !1, g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"] }), s("p224", { type: "short", prime: "p224", p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001", a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe", b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4", n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d", hash: a().sha256, gRed: !1, g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"] }), s("p256", { type: "short", prime: null, p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff", a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc", b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b", n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551", hash: a().sha256, gRed: !1, g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"] }), s("p384", { type: "short", prime: null, p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff", a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc", b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef", n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973", hash: a().sha384, gRed: !1, g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"] }), s("p521", { type: "short", prime: null, p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff", a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc", b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00", n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409", hash: a().sha512, gRed: !1, g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"] }), s("curve25519", { type: "mont", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "76d06", b: "1", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: a().sha256, gRed: !1, g: ["9"] }), s("ed25519", { type: "edwards", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "-1", c: "1", d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: a().sha256, gRed: !1, g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"] }); try {
            r = null.crash();
        }
        catch (e) {
            r = void 0;
        } s("secp256k1", { type: "short", prime: "k256", p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f", a: "0", b: "7", n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141", h: "1", hash: a().sha256, beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72", basis: [{ a: "3086d221a7d46bcde86c90e49284eb15", b: "-e4437ed6010e88286f547fa90abfe4c3" }, { a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15" }], gRed: !1, g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", r] }); }));
        function B(e) { if (!(this instanceof B))
            return new B(e); this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null; var t = u.toArray(e.entropy, e.entropyEnc || "hex"), r = u.toArray(e.nonce, e.nonceEnc || "hex"), n = u.toArray(e.pers, e.persEnc || "hex"); c(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(t, r, n); }
        var P = B;
        B.prototype._init = function (e, t, r) { var n = e.concat(t).concat(r); this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8); for (var i = 0; i < this.V.length; i++)
            this.K[i] = 0, this.V[i] = 1; this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656; }, B.prototype._hmac = function () { return new (a().hmac)(this.hash, this.K); }, B.prototype._update = function (e) { var t = this._hmac().update(this.V).update([0]); e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest()); }, B.prototype.reseed = function (e, t, r, n) { "string" != typeof t && (n = r, r = t, t = null), e = u.toArray(e, t), r = u.toArray(r, n), c(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(e.concat(r || [])), this._reseed = 1; }, B.prototype.generate = function (e, t, r, n) { if (this._reseed > this.reseedInterval)
            throw new Error("Reseed is required"); "string" != typeof t && (n = r, r = t, t = null), r && (r = u.toArray(r, n || "hex"), this._update(r)); for (var i = []; i.length < e;)
            this.V = this._hmac().update(this.V).digest(), i = i.concat(this.V); var o = i.slice(0, e); return this._update(r), this._reseed++, u.encode(o, t); };
        var M = f.assert;
        function C(e, t) { this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc); }
        var L = C;
        C.fromPublic = function (e, t, r) { return t instanceof C ? t : new C(e, { pub: t, pubEnc: r }); }, C.fromPrivate = function (e, t, r) { return t instanceof C ? t : new C(e, { priv: t, privEnc: r }); }, C.prototype.validate = function () { var e = this.getPublic(); return e.isInfinity() ? { result: !1, reason: "Invalid public key" } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" }; }, C.prototype.getPublic = function (e, t) { return "string" == typeof e && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub; }, C.prototype.getPrivate = function (e) { return "hex" === e ? this.priv.toString(16, 2) : this.priv; }, C.prototype._importPrivate = function (e, t) { this.priv = new (i())(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n); }, C.prototype._importPublic = function (e, t) { if (e.x || e.y)
            return "mont" === this.ec.curve.type ? M(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || M(e.x && e.y, "Need both x and y coordinate"), void (this.pub = this.ec.curve.point(e.x, e.y)); this.pub = this.ec.curve.decodePoint(e, t); }, C.prototype.derive = function (e) { return e.validate() || M(e.validate(), "public point not validated"), e.mul(this.priv).getX(); }, C.prototype.sign = function (e, t, r) { return this.ec.sign(e, this, t, r); }, C.prototype.verify = function (e, t) { return this.ec.verify(e, t, this); }, C.prototype.inspect = function () { return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"; };
        var F = f.assert;
        function O(e, t) { if (e instanceof O)
            return e; this._importDER(e, t) || (F(e.r && e.s, "Signature without r or s"), this.r = new (i())(e.r, 16), this.s = new (i())(e.s, 16), void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam); }
        var x = O;
        function N() { this.place = 0; }
        function R(e, t) { var r = e[t.place++]; if (!(128 & r))
            return r; var n = 15 & r; if (0 === n || n > 4)
            return !1; for (var i = 0, o = 0, a = t.place; o < n; o++, a++)
            i <<= 8, i |= e[a], i >>>= 0; return !(i <= 127) && (t.place = a, i); }
        function I(e) { for (var t = 0, r = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < r;)
            t++; return 0 === t ? e : e.slice(t); }
        function D(e, t) { if (t < 128)
            e.push(t);
        else {
            var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
            for (e.push(128 | r); --r;)
                e.push(t >>> (r << 3) & 255);
            e.push(t);
        } }
        O.prototype._importDER = function (e, t) { e = f.toArray(e, t); var r = new N; if (48 !== e[r.place++])
            return !1; var n = R(e, r); if (!1 === n)
            return !1; if (n + r.place !== e.length)
            return !1; if (2 !== e[r.place++])
            return !1; var o = R(e, r); if (!1 === o)
            return !1; var a = e.slice(r.place, o + r.place); if (r.place += o, 2 !== e[r.place++])
            return !1; var s = R(e, r); if (!1 === s)
            return !1; if (e.length !== s + r.place)
            return !1; var c = e.slice(r.place, s + r.place); if (0 === a[0]) {
            if (!(128 & a[1]))
                return !1;
            a = a.slice(1);
        } if (0 === c[0]) {
            if (!(128 & c[1]))
                return !1;
            c = c.slice(1);
        } return this.r = new (i())(a), this.s = new (i())(c), this.recoveryParam = null, !0; }, O.prototype.toDER = function (e) { var t = this.r.toArray(), r = this.s.toArray(); for (128 & t[0] && (t = [0].concat(t)), 128 & r[0] && (r = [0].concat(r)), t = I(t), r = I(r); !(r[0] || 128 & r[1]);)
            r = r.slice(1); var n = [2]; D(n, t.length), (n = n.concat(t)).push(2), D(n, r.length); var i = n.concat(r), o = [48]; return D(o, i.length), o = o.concat(i), f.encode(o, e); };
        var J = function () { throw new Error("unsupported"); }, _ = f.assert;
        function U(e) { if (!(this instanceof U))
            return new U(e); "string" == typeof e && (_(Object.prototype.hasOwnProperty.call(k, e), "Unknown curve " + e), e = k[e]), e instanceof k.PresetCurve && (e = { curve: e }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash; }
        var H = U;
        U.prototype.keyPair = function (e) { return new L(this, e); }, U.prototype.keyFromPrivate = function (e, t) { return L.fromPrivate(this, e, t); }, U.prototype.keyFromPublic = function (e, t) { return L.fromPublic(this, e, t); }, U.prototype.genKeyPair = function (e) { e || (e = {}); for (var t = new P({ hash: this.hash, pers: e.pers, persEnc: e.persEnc || "utf8", entropy: e.entropy || J(this.hash.hmacStrength), entropyEnc: e.entropy && e.entropyEnc || "utf8", nonce: this.n.toArray() }), r = this.n.byteLength(), n = this.n.sub(new (i())(2));;) {
            var o = new (i())(t.generate(r));
            if (!(o.cmp(n) > 0))
                return o.iaddn(1), this.keyFromPrivate(o);
        } }, U.prototype._truncateToN = function (e, t) { var r = 8 * e.byteLength() - this.n.bitLength(); return r > 0 && (e = e.ushrn(r)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e; }, U.prototype.sign = function (e, t, r, n) { "object" == typeof r && (n = r, r = null), n || (n = {}), t = this.keyFromPrivate(t, r), e = this._truncateToN(new (i())(e, 16)); for (var o = this.n.byteLength(), a = t.getPrivate().toArray("be", o), s = e.toArray("be", o), c = new P({ hash: this.hash, entropy: a, nonce: s, pers: n.pers, persEnc: n.persEnc || "utf8" }), l = this.n.sub(new (i())(1)), u = 0;; u++) {
            var f = n.k ? n.k(u) : new (i())(c.generate(this.n.byteLength()));
            if (!((f = this._truncateToN(f, !0)).cmpn(1) <= 0 || f.cmp(l) >= 0)) {
                var h = this.g.mul(f);
                if (!h.isInfinity()) {
                    var d = h.getX(), p = d.umod(this.n);
                    if (0 !== p.cmpn(0)) {
                        var g = f.invm(this.n).mul(p.mul(t.getPrivate()).iadd(e));
                        if (0 !== (g = g.umod(this.n)).cmpn(0)) {
                            var m = (h.getY().isOdd() ? 1 : 0) | (0 !== d.cmp(p) ? 2 : 0);
                            return n.canonical && g.cmp(this.nh) > 0 && (g = this.n.sub(g), m ^= 1), new x({ r: p, s: g, recoveryParam: m });
                        }
                    }
                }
            }
        } }, U.prototype.verify = function (e, t, r, n) { e = this._truncateToN(new (i())(e, 16)), r = this.keyFromPublic(r, n); var o = (t = new x(t, "hex")).r, a = t.s; if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0)
            return !1; if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0)
            return !1; var s, c = a.invm(this.n), l = c.mul(e).umod(this.n), u = c.mul(o).umod(this.n); return this.curve._maxwellTrick ? !(s = this.g.jmulAdd(l, r.getPublic(), u)).isInfinity() && s.eqXToP(o) : !(s = this.g.mulAdd(l, r.getPublic(), u)).isInfinity() && 0 === s.getX().umod(this.n).cmp(o); }, U.prototype.recoverPubKey = function (e, t, r, n) { _((3 & r) === r, "The recovery param is more than two bits"), t = new x(t, n); var o = this.n, a = new (i())(e), s = t.r, c = t.s, l = 1 & r, u = r >> 1; if (s.cmp(this.curve.p.umod(this.curve.n)) >= 0 && u)
            throw new Error("Unable to find sencond key candinate"); s = u ? this.curve.pointFromX(s.add(this.curve.n), l) : this.curve.pointFromX(s, l); var f = t.r.invm(o), h = o.sub(a).mul(f).umod(o), d = c.mul(f).umod(o); return this.g.mulAdd(h, s, d); }, U.prototype.getKeyRecoveryParam = function (e, t, r, n) { if (null !== (t = new x(t, n)).recoveryParam)
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
        var G = s((function (e, t) { var r = t; r.version = "6.5.4", r.utils = f, r.rand = function () { throw new Error("unsupported"); }, r.curve = T, r.curves = k, r.ec = H, r.eddsa = null; })).ec, j = r(3286), X = r(3587);
        const V = new (r(711).Logger)("signing-key/5.4.0");
        let z = null;
        function Z() { return z || (z = new G("secp256k1")), z; }
        class K {
            constructor(e) { (0, X.defineReadOnly)(this, "curve", "secp256k1"), (0, X.defineReadOnly)(this, "privateKey", (0, j.hexlify)(e)); const t = Z().keyFromPrivate((0, j.arrayify)(this.privateKey)); (0, X.defineReadOnly)(this, "publicKey", "0x" + t.getPublic(!1, "hex")), (0, X.defineReadOnly)(this, "compressedPublicKey", "0x" + t.getPublic(!0, "hex")), (0, X.defineReadOnly)(this, "_isSigningKey", !0); }
            _addPoint(e) { const t = Z().keyFromPublic((0, j.arrayify)(this.publicKey)), r = Z().keyFromPublic((0, j.arrayify)(e)); return "0x" + t.pub.add(r.pub).encodeCompressed("hex"); }
            signDigest(e) { const t = Z().keyFromPrivate((0, j.arrayify)(this.privateKey)), r = (0, j.arrayify)(e); 32 !== r.length && V.throwArgumentError("bad digest length", "digest", e); const n = t.sign(r, { canonical: !0 }); return (0, j.splitSignature)({ recoveryParam: n.recoveryParam, r: (0, j.hexZeroPad)("0x" + n.r.toString(16), 32), s: (0, j.hexZeroPad)("0x" + n.s.toString(16), 32) }); }
            computeSharedSecret(e) { const t = Z().keyFromPrivate((0, j.arrayify)(this.privateKey)), r = Z().keyFromPublic((0, j.arrayify)(Q(e))); return (0, j.hexZeroPad)("0x" + t.derive(r.getPublic()).toString(16), 32); }
            static isSigningKey(e) { return !(!e || !e._isSigningKey); }
        }
        function q(e, t) { const r = (0, j.splitSignature)(t), n = { r: (0, j.arrayify)(r.r), s: (0, j.arrayify)(r.s) }; return "0x" + Z().recoverPubKey((0, j.arrayify)(e), n, r.recoveryParam).encode("hex", !1); }
        function Q(e, t) { const r = (0, j.arrayify)(e); if (32 === r.length) {
            const e = new K(r);
            return t ? "0x" + Z().keyFromPrivate(r).getPublic(!0, "hex") : e.publicKey;
        } return 33 === r.length ? t ? (0, j.hexlify)(r) : "0x" + Z().keyFromPublic(r).getPublic(!1, "hex") : 65 === r.length ? t ? "0x" + Z().keyFromPublic(r).getPublic(!0, "hex") : (0, j.hexlify)(r) : V.throwArgumentError("invalid public or private key", "key", "[REDACTED]"); }
    }, 9155: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { pack: () => h, keccak256: () => d, sha256: () => p });
        var n = r(2593), i = r(3286), o = r(8197), a = r(7158), s = r(4242);
        const c = new RegExp("^bytes([0-9]+)$"), l = new RegExp("^(u?int)([0-9]*)$"), u = new RegExp("^(.*)\\[([0-9]*)\\]$");
        function f(e, t, r) { switch (e) {
            case "address": return r ? (0, i.zeroPad)(t, 32) : (0, i.arrayify)(t);
            case "string": return (0, s.Y0)(t);
            case "bytes": return (0, i.arrayify)(t);
            case "bool": return t = t ? "0x01" : "0x00", r ? (0, i.zeroPad)(t, 32) : (0, i.arrayify)(t);
        } let o = e.match(l); if (o) {
            let a = parseInt(o[2] || "256");
            if (o[2] && String(a) !== o[2] || a % 8 != 0 || 0 === a || a > 256)
                throw new Error("invalid number type - " + e);
            return r && (a = 256), t = n.O$.from(t).toTwos(a), (0, i.zeroPad)(t, a / 8);
        } if (o = e.match(c), o) {
            const n = parseInt(o[1]);
            if (String(n) !== o[1] || 0 === n || n > 32)
                throw new Error("invalid bytes type - " + e);
            if ((0, i.arrayify)(t).byteLength !== n)
                throw new Error("invalid value for " + e);
            return r ? (0, i.arrayify)((t + "0000000000000000000000000000000000000000000000000000000000000000").substring(0, 66)) : t;
        } if (o = e.match(u), o && Array.isArray(t)) {
            const r = o[1];
            if (parseInt(o[2] || String(t.length)) != t.length)
                throw new Error("invalid value for " + e);
            const n = [];
            return t.forEach((function (e) { n.push(f(r, e, !0)); })), (0, i.concat)(n);
        } throw new Error("invalid type - " + e); }
        function h(e, t) { if (e.length != t.length)
            throw new Error("type/value count mismatch"); const r = []; return e.forEach((function (e, n) { r.push(f(e, t[n])); })), (0, i.hexlify)((0, i.concat)(r)); }
        function d(e, t) { return (0, o.keccak256)(h(e, t)); }
        function p(e, t) { return (0, a.JQ)(h(e, t)); }
    }, 5637: (e, t, r) => {
        "use strict";
        r.d(t, { Ll: () => p });
        var n = r(4242);
        function i(e, t) { t || (t = function (e) { return [parseInt(e, 16)]; }); let r = 0, n = {}; return e.split(",").forEach((e => { let i = e.split(":"); r += parseInt(i[0], 16), n[r] = t(i[1]); })), n; }
        function o(e) { let t = 0; return e.split(",").map((e => { let r = e.split("-"); 1 === r.length ? r[1] = "0" : "" === r[1] && (r[1] = "1"); let n = t + parseInt(r[0], 16); return t = parseInt(r[1], 16), { l: n, h: t }; })); }
        function a(e, t) { let r = 0; for (let n = 0; n < t.length; n++) {
            let i = t[n];
            if (r += i.l, e >= r && e <= r + i.h && (e - r) % (i.d || 1) == 0) {
                if (i.e && -1 !== i.e.indexOf(e - r))
                    continue;
                return i;
            }
        } return null; }
        const s = o("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"), c = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((e => parseInt(e, 16))), l = [{ h: 25, s: 32, l: 65 }, { h: 30, s: 32, e: [23], l: 127 }, { h: 54, s: 1, e: [48], l: 64, d: 2 }, { h: 14, s: 1, l: 57, d: 2 }, { h: 44, s: 1, l: 17, d: 2 }, { h: 10, s: 1, e: [2, 6, 8], l: 61, d: 2 }, { h: 16, s: 1, l: 68, d: 2 }, { h: 84, s: 1, e: [18, 24, 66], l: 19, d: 2 }, { h: 26, s: 32, e: [17], l: 435 }, { h: 22, s: 1, l: 71, d: 2 }, { h: 15, s: 80, l: 40 }, { h: 31, s: 32, l: 16 }, { h: 32, s: 1, l: 80, d: 2 }, { h: 52, s: 1, l: 42, d: 2 }, { h: 12, s: 1, l: 55, d: 2 }, { h: 40, s: 1, e: [38], l: 15, d: 2 }, { h: 14, s: 1, l: 48, d: 2 }, { h: 37, s: 48, l: 49 }, { h: 148, s: 1, l: 6351, d: 2 }, { h: 88, s: 1, l: 160, d: 2 }, { h: 15, s: 16, l: 704 }, { h: 25, s: 26, l: 854 }, { h: 25, s: 32, l: 55915 }, { h: 37, s: 40, l: 1247 }, { h: 25, s: -119711, l: 53248 }, { h: 25, s: -119763, l: 52 }, { h: 25, s: -119815, l: 52 }, { h: 25, s: -119867, e: [1, 4, 5, 7, 8, 11, 12, 17], l: 52 }, { h: 25, s: -119919, l: 52 }, { h: 24, s: -119971, e: [2, 7, 8, 17], l: 52 }, { h: 24, s: -120023, e: [2, 7, 13, 15, 16, 17], l: 52 }, { h: 25, s: -120075, l: 52 }, { h: 25, s: -120127, l: 52 }, { h: 25, s: -120179, l: 52 }, { h: 25, s: -120231, l: 52 }, { h: 25, s: -120283, l: 52 }, { h: 25, s: -120335, l: 52 }, { h: 24, s: -119543, e: [17], l: 56 }, { h: 24, s: -119601, e: [17], l: 58 }, { h: 24, s: -119659, e: [17], l: 58 }, { h: 24, s: -119717, e: [17], l: 58 }, { h: 24, s: -119775, e: [17], l: 58 }], u = i("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"), f = i("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"), h = i("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", (function (e) { if (e.length % 4 != 0)
            throw new Error("bad data"); let t = []; for (let r = 0; r < e.length; r += 4)
            t.push(parseInt(e.substring(r, r + 4), 16)); return t; })), d = o("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
        function p(e) { if (e.match(/^[a-z0-9-]*$/i) && e.length <= 59)
            return e.toLowerCase(); let t = (0, n.XL)(e); var r; r = t.map((e => { if (c.indexOf(e) >= 0)
            return []; if (e >= 65024 && e <= 65039)
            return []; let t = function (e) { let t = a(e, l); if (t)
            return [e + t.s]; let r = u[e]; if (r)
            return r; let n = f[e]; return n ? [e + n[0]] : h[e] || null; }(e); return t || [e]; })), t = r.reduce(((e, t) => (t.forEach((t => { e.push(t); })), e)), []), t = (0, n.XL)((0, n.uu)(t), n.Uj.NFKC), t.forEach((e => { if (a(e, d))
            throw new Error("STRINGPREP_CONTAINS_PROHIBITED"); })), t.forEach((e => { if (a(e, s))
            throw new Error("STRINGPREP_CONTAINS_UNASSIGNED"); })); let i = (0, n.uu)(t); if ("-" === i.substring(0, 1) || "--" === i.substring(2, 4) || "-" === i.substring(i.length - 1))
            throw new Error("invalid hyphen"); if (i.length > 63)
            throw new Error("too long"); return i; }
    }, 937: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { UnicodeNormalizationForm: () => o.Uj, Utf8ErrorFuncs: () => o.te, Utf8ErrorReason: () => o.Uw, _toEscapedUtf8String: () => o.U$, formatBytes32String: () => a, nameprep: () => c.Ll, parseBytes32String: () => s, toUtf8Bytes: () => o.Y0, toUtf8CodePoints: () => o.XL, toUtf8String: () => o.ZN });
        var n = r(7218), i = r(3286), o = r(4242);
        function a(e) { const t = (0, o.Y0)(e); if (t.length > 31)
            throw new Error("bytes32 string must be less than 32 bytes"); return (0, i.hexlify)((0, i.concat)([t, n.R]).slice(0, 32)); }
        function s(e) { const t = (0, i.arrayify)(e); if (32 !== t.length)
            throw new Error("invalid bytes32 - not 32 bytes long"); if (0 !== t[31])
            throw new Error("invalid bytes32 string - no null terminator"); let r = 31; for (; 0 === t[r - 1];)
            r--; return (0, o.ZN)(t.slice(0, r)); }
        var c = r(5637);
    }, 4242: (e, t, r) => {
        "use strict";
        r.d(t, { Uj: () => o, te: () => c, Uw: () => a, U$: () => h, uu: () => d, Y0: () => u, XL: () => g, ZN: () => p });
        var n = r(3286);
        const i = new (r(711).Logger)("strings/5.4.0");
        var o, a;
        function s(e, t, r, n, i) { if (e === a.BAD_PREFIX || e === a.UNEXPECTED_CONTINUE) {
            let e = 0;
            for (let n = t + 1; n < r.length && r[n] >> 6 == 2; n++)
                e++;
            return e;
        } return e === a.OVERRUN ? r.length - t - 1 : 0; }
        !function (e) { e.current = "", e.NFC = "NFC", e.NFD = "NFD", e.NFKC = "NFKC", e.NFKD = "NFKD"; }(o || (o = {})), function (e) { e.UNEXPECTED_CONTINUE = "unexpected continuation byte", e.BAD_PREFIX = "bad codepoint prefix", e.OVERRUN = "string overrun", e.MISSING_CONTINUE = "missing continuation byte", e.OUT_OF_RANGE = "out of UTF-8 range", e.UTF16_SURROGATE = "UTF-16 surrogate", e.OVERLONG = "overlong representation"; }(a || (a = {}));
        const c = Object.freeze({ error: function (e, t, r, n, o) { return i.throwArgumentError(`invalid codepoint at offset ${t}; ${e}`, "bytes", r); }, ignore: s, replace: function (e, t, r, n, i) { return e === a.OVERLONG ? (n.push(i), 0) : (n.push(65533), s(e, t, r)); } });
        function l(e, t) { null == t && (t = c.error), e = (0, n.arrayify)(e); const r = []; let i = 0; for (; i < e.length;) {
            const n = e[i++];
            if (n >> 7 == 0) {
                r.push(n);
                continue;
            }
            let o = null, s = null;
            if (192 == (224 & n))
                o = 1, s = 127;
            else if (224 == (240 & n))
                o = 2, s = 2047;
            else {
                if (240 != (248 & n)) {
                    i += t(128 == (192 & n) ? a.UNEXPECTED_CONTINUE : a.BAD_PREFIX, i - 1, e, r);
                    continue;
                }
                o = 3, s = 65535;
            }
            if (i - 1 + o >= e.length) {
                i += t(a.OVERRUN, i - 1, e, r);
                continue;
            }
            let c = n & (1 << 8 - o - 1) - 1;
            for (let n = 0; n < o; n++) {
                let n = e[i];
                if (128 != (192 & n)) {
                    i += t(a.MISSING_CONTINUE, i, e, r), c = null;
                    break;
                }
                c = c << 6 | 63 & n, i++;
            }
            null !== c && (c > 1114111 ? i += t(a.OUT_OF_RANGE, i - 1 - o, e, r, c) : c >= 55296 && c <= 57343 ? i += t(a.UTF16_SURROGATE, i - 1 - o, e, r, c) : c <= s ? i += t(a.OVERLONG, i - 1 - o, e, r, c) : r.push(c));
        } return r; }
        function u(e, t = o.current) { t != o.current && (i.checkNormalize(), e = e.normalize(t)); let r = []; for (let t = 0; t < e.length; t++) {
            const n = e.charCodeAt(t);
            if (n < 128)
                r.push(n);
            else if (n < 2048)
                r.push(n >> 6 | 192), r.push(63 & n | 128);
            else if (55296 == (64512 & n)) {
                t++;
                const i = e.charCodeAt(t);
                if (t >= e.length || 56320 != (64512 & i))
                    throw new Error("invalid utf-8 string");
                const o = 65536 + ((1023 & n) << 10) + (1023 & i);
                r.push(o >> 18 | 240), r.push(o >> 12 & 63 | 128), r.push(o >> 6 & 63 | 128), r.push(63 & o | 128);
            }
            else
                r.push(n >> 12 | 224), r.push(n >> 6 & 63 | 128), r.push(63 & n | 128);
        } return (0, n.arrayify)(r); }
        function f(e) { const t = "0000" + e.toString(16); return "\\u" + t.substring(t.length - 4); }
        function h(e, t) { return '"' + l(e, t).map((e => { if (e < 256) {
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
        } return e <= 65535 ? f(e) : f(55296 + ((e -= 65536) >> 10 & 1023)) + f(56320 + (1023 & e)); })).join("") + '"'; }
        function d(e) { return e.map((e => e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode(55296 + (e >> 10 & 1023), 56320 + (1023 & e))))).join(""); }
        function p(e, t) { return d(l(e, t)); }
        function g(e, t = o.current) { return l(u(e, t)); }
    }, 4377: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { TransactionTypes: () => d, accessListify: () => w, computeAddress: () => y, parse: () => M, recoverAddress: () => v, serialize: () => B });
        var n = r(4594), i = r(2593), o = r(3286), a = r(1046), s = r(8197), c = r(3587), l = r(1843), u = r(2768), f = r(711);
        const h = new f.Logger("transactions/5.4.0");
        var d;
        function p(e) { return "0x" === e ? null : (0, n.getAddress)(e); }
        function g(e) { return "0x" === e ? a._Y : i.O$.from(e); }
        !function (e) { e[e.legacy = 0] = "legacy", e[e.eip2930 = 1] = "eip2930", e[e.eip1559 = 2] = "eip1559"; }(d || (d = {}));
        const m = [{ name: "nonce", maxLength: 32, numeric: !0 }, { name: "gasPrice", maxLength: 32, numeric: !0 }, { name: "gasLimit", maxLength: 32, numeric: !0 }, { name: "to", length: 20 }, { name: "value", maxLength: 32, numeric: !0 }, { name: "data" }], b = { chainId: !0, data: !0, gasLimit: !0, gasPrice: !0, nonce: !0, to: !0, type: !0, value: !0 };
        function y(e) { const t = (0, u.computePublicKey)(e); return (0, n.getAddress)((0, o.hexDataSlice)((0, s.keccak256)((0, o.hexDataSlice)(t, 1)), 12)); }
        function v(e, t) { return y((0, u.recoverPublicKey)((0, o.arrayify)(e), t)); }
        function A(e, t) { const r = (0, o.stripZeros)(i.O$.from(e).toHexString()); return r.length > 32 && h.throwArgumentError("invalid length for " + t, "transaction:" + t, e), r; }
        function S(e, t) { return { address: (0, n.getAddress)(e), storageKeys: (t || []).map(((t, r) => (32 !== (0, o.hexDataLength)(t) && h.throwArgumentError("invalid access list storageKey", `accessList[${e}:${r}]`, t), t.toLowerCase()))) }; }
        function w(e) { if (Array.isArray(e))
            return e.map(((e, t) => Array.isArray(e) ? (e.length > 2 && h.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${t}]`, e), S(e[0], e[1])) : S(e.address, e.storageKeys))); const t = Object.keys(e).map((t => { const r = e[t].reduce(((e, t) => (e[t] = !0, e)), {}); return S(t, Object.keys(r).sort()); })); return t.sort(((e, t) => e.address.localeCompare(t.address))), t; }
        function E(e) { return w(e).map((e => [e.address, e.storageKeys])); }
        function T(e, t) { if (null != e.gasPrice) {
            const t = i.O$.from(e.gasPrice), r = i.O$.from(e.maxFeePerGas || 0);
            t.eq(r) || h.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", { gasPrice: t, maxFeePerGas: r });
        } const r = [A(e.chainId || 0, "chainId"), A(e.nonce || 0, "nonce"), A(e.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"), A(e.maxFeePerGas || 0, "maxFeePerGas"), A(e.gasLimit || 0, "gasLimit"), null != e.to ? (0, n.getAddress)(e.to) : "0x", A(e.value || 0, "value"), e.data || "0x", E(e.accessList || [])]; if (t) {
            const e = (0, o.splitSignature)(t);
            r.push(A(e.recoveryParam, "recoveryParam")), r.push((0, o.stripZeros)(e.r)), r.push((0, o.stripZeros)(e.s));
        } return (0, o.hexConcat)(["0x02", l.encode(r)]); }
        function k(e, t) { const r = [A(e.chainId || 0, "chainId"), A(e.nonce || 0, "nonce"), A(e.gasPrice || 0, "gasPrice"), A(e.gasLimit || 0, "gasLimit"), null != e.to ? (0, n.getAddress)(e.to) : "0x", A(e.value || 0, "value"), e.data || "0x", E(e.accessList || [])]; if (t) {
            const e = (0, o.splitSignature)(t);
            r.push(A(e.recoveryParam, "recoveryParam")), r.push((0, o.stripZeros)(e.r)), r.push((0, o.stripZeros)(e.s));
        } return (0, o.hexConcat)(["0x01", l.encode(r)]); }
        function B(e, t) { if (null == e.type || 0 === e.type)
            return null != e.accessList && h.throwArgumentError("untyped transactions do not support accessList; include type: 1", "transaction", e), function (e, t) { (0, c.checkProperties)(e, b); const r = []; m.forEach((function (t) { let n = e[t.name] || []; const i = {}; t.numeric && (i.hexPad = "left"), n = (0, o.arrayify)((0, o.hexlify)(n, i)), t.length && n.length !== t.length && n.length > 0 && h.throwArgumentError("invalid length for " + t.name, "transaction:" + t.name, n), t.maxLength && (n = (0, o.stripZeros)(n), n.length > t.maxLength && h.throwArgumentError("invalid length for " + t.name, "transaction:" + t.name, n)), r.push((0, o.hexlify)(n)); })); let n = 0; if (null != e.chainId ? (n = e.chainId, "number" != typeof n && h.throwArgumentError("invalid transaction.chainId", "transaction", e)) : t && !(0, o.isBytesLike)(t) && t.v > 28 && (n = Math.floor((t.v - 35) / 2)), 0 !== n && (r.push((0, o.hexlify)(n)), r.push("0x"), r.push("0x")), !t)
                return l.encode(r); const i = (0, o.splitSignature)(t); let a = 27 + i.recoveryParam; return 0 !== n ? (r.pop(), r.pop(), r.pop(), a += 2 * n + 8, i.v > 28 && i.v !== a && h.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", t)) : i.v !== a && h.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", t), r.push((0, o.hexlify)(a)), r.push((0, o.stripZeros)((0, o.arrayify)(i.r))), r.push((0, o.stripZeros)((0, o.arrayify)(i.s))), l.encode(r); }(e, t); switch (e.type) {
            case 1: return k(e, t);
            case 2: return T(e, t);
        } return h.throwError(`unsupported transaction type: ${e.type}`, f.Logger.errors.UNSUPPORTED_OPERATION, { operation: "serializeTransaction", transactionType: e.type }); }
        function P(e, t, r) { try {
            const r = g(t[0]).toNumber();
            if (0 !== r && 1 !== r)
                throw new Error("bad recid");
            e.v = r;
        }
        catch (e) {
            h.throwArgumentError("invalid v for transaction type: 1", "v", t[0]);
        } e.r = (0, o.hexZeroPad)(t[1], 32), e.s = (0, o.hexZeroPad)(t[2], 32); try {
            const t = (0, s.keccak256)(r(e));
            e.from = v(t, { r: e.r, s: e.s, recoveryParam: e.v });
        }
        catch (e) {
            console.log(e);
        } }
        function M(e) { const t = (0, o.arrayify)(e); if (t[0] > 127)
            return function (e) { const t = l.decode(e); 9 !== t.length && 6 !== t.length && h.throwArgumentError("invalid raw transaction", "rawTransaction", e); const r = { nonce: g(t[0]).toNumber(), gasPrice: g(t[1]), gasLimit: g(t[2]), to: p(t[3]), value: g(t[4]), data: t[5], chainId: 0 }; if (6 === t.length)
                return r; try {
                r.v = i.O$.from(t[6]).toNumber();
            }
            catch (e) {
                return console.log(e), r;
            } if (r.r = (0, o.hexZeroPad)(t[7], 32), r.s = (0, o.hexZeroPad)(t[8], 32), i.O$.from(r.r).isZero() && i.O$.from(r.s).isZero())
                r.chainId = r.v, r.v = 0;
            else {
                r.chainId = Math.floor((r.v - 35) / 2), r.chainId < 0 && (r.chainId = 0);
                let n = r.v - 27;
                const i = t.slice(0, 6);
                0 !== r.chainId && (i.push((0, o.hexlify)(r.chainId)), i.push("0x"), i.push("0x"), n -= 2 * r.chainId + 8);
                const a = (0, s.keccak256)(l.encode(i));
                try {
                    r.from = v(a, { r: (0, o.hexlify)(r.r), s: (0, o.hexlify)(r.s), recoveryParam: n });
                }
                catch (e) {
                    console.log(e);
                }
                r.hash = (0, s.keccak256)(e);
            } return r.type = null, r; }(t); switch (t[0]) {
            case 1: return function (e) { const t = l.decode(e.slice(1)); 8 !== t.length && 11 !== t.length && h.throwArgumentError("invalid component count for transaction type: 1", "payload", (0, o.hexlify)(e)); const r = { type: 1, chainId: g(t[0]).toNumber(), nonce: g(t[1]).toNumber(), gasPrice: g(t[2]), gasLimit: g(t[3]), to: p(t[4]), value: g(t[5]), data: t[6], accessList: w(t[7]) }; return 8 === t.length || (r.hash = (0, s.keccak256)(e), P(r, t.slice(8), k)), r; }(t);
            case 2: return function (e) { const t = l.decode(e.slice(1)); 9 !== t.length && 12 !== t.length && h.throwArgumentError("invalid component count for transaction type: 2", "payload", (0, o.hexlify)(e)); const r = g(t[2]), n = g(t[3]), i = { type: 2, chainId: g(t[0]).toNumber(), nonce: g(t[1]).toNumber(), maxPriorityFeePerGas: r, maxFeePerGas: n, gasPrice: null, gasLimit: g(t[4]), to: p(t[5]), value: g(t[6]), data: t[7], accessList: w(t[8]) }; return 9 === t.length || (i.hash = (0, s.keccak256)(e), P(i, t.slice(9), T)), i; }(t);
        } return h.throwError(`unsupported transaction type: ${t[0]}`, f.Logger.errors.UNSUPPORTED_OPERATION, { operation: "parseTransaction", transactionType: t[0] }); }
    }, 7616: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { commify: () => w, formatEther: () => k, formatUnits: () => E, parseEther: () => B, parseUnits: () => T });
        var n = r(3286), i = r(711), o = r(8794), a = r(2593);
        const s = new i.Logger(o.i), c = {}, l = a.O$.from(0), u = a.O$.from(-1);
        function f(e, t, r, n) { const o = { fault: t, operation: r }; return void 0 !== n && (o.value = n), s.throwError(e, i.Logger.errors.NUMERIC_FAULT, o); }
        let h = "0";
        for (; h.length < 256;)
            h += h;
        function d(e) { if ("number" != typeof e)
            try {
                e = a.O$.from(e).toNumber();
            }
            catch (e) { } return "number" == typeof e && e >= 0 && e <= 256 && !(e % 1) ? "1" + h.substring(0, e) : s.throwArgumentError("invalid decimal size", "decimals", e); }
        function p(e, t) { null == t && (t = 0); const r = d(t), n = (e = a.O$.from(e)).lt(l); n && (e = e.mul(u)); let i = e.mod(r).toString(); for (; i.length < r.length - 1;)
            i = "0" + i; i = i.match(/^([0-9]*[1-9]|0)(0*)/)[1]; const o = e.div(r).toString(); return e = 1 === r.length ? o : o + "." + i, n && (e = "-" + e), e; }
        function g(e, t) { null == t && (t = 0); const r = d(t); "string" == typeof e && e.match(/^-?[0-9.,]+$/) || s.throwArgumentError("invalid decimal value", "value", e); const n = "-" === e.substring(0, 1); n && (e = e.substring(1)), "." === e && s.throwArgumentError("missing value", "value", e); const i = e.split("."); i.length > 2 && s.throwArgumentError("too many decimal points", "value", e); let o = i[0], c = i[1]; for (o || (o = "0"), c || (c = "0"); "0" === c[c.length - 1];)
            c = c.substring(0, c.length - 1); for (c.length > r.length - 1 && f("fractional component exceeds decimals", "underflow", "parseFixed"), "" === c && (c = "0"); c.length < r.length - 1;)
            c += "0"; const l = a.O$.from(o), h = a.O$.from(c); let p = l.mul(r).add(h); return n && (p = p.mul(u)), p; }
        class m {
            constructor(e, t, r, n) { e !== c && s.throwError("cannot use FixedFormat constructor; use FixedFormat.from", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.signed = t, this.width = r, this.decimals = n, this.name = (t ? "" : "u") + "fixed" + String(r) + "x" + String(n), this._multiplier = d(n), Object.freeze(this); }
            static from(e) { if (e instanceof m)
                return e; "number" == typeof e && (e = `fixed128x${e}`); let t = !0, r = 128, n = 18; if ("string" == typeof e)
                if ("fixed" === e)
                    ;
                else if ("ufixed" === e)
                    t = !1;
                else {
                    const i = e.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
                    i || s.throwArgumentError("invalid fixed format", "format", e), t = "u" !== i[1], r = parseInt(i[2]), n = parseInt(i[3]);
                }
            else if (e) {
                const i = (t, r, n) => null == e[t] ? n : (typeof e[t] !== r && s.throwArgumentError("invalid fixed format (" + t + " not " + r + ")", "format." + t, e[t]), e[t]);
                t = i("signed", "boolean", t), r = i("width", "number", r), n = i("decimals", "number", n);
            } return r % 8 && s.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", r), n > 80 && s.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", n), new m(c, t, r, n); }
        }
        class b {
            constructor(e, t, r, n) { s.checkNew(new.target, b), e !== c && s.throwError("cannot use FixedNumber constructor; use FixedNumber.from", i.Logger.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.format = n, this._hex = t, this._value = r, this._isFixedNumber = !0, Object.freeze(this); }
            _checkFormat(e) { this.format.name !== e.format.name && s.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", e); }
            addUnsafe(e) { this._checkFormat(e); const t = g(this._value, this.format.decimals), r = g(e._value, e.format.decimals); return b.fromValue(t.add(r), this.format.decimals, this.format); }
            subUnsafe(e) { this._checkFormat(e); const t = g(this._value, this.format.decimals), r = g(e._value, e.format.decimals); return b.fromValue(t.sub(r), this.format.decimals, this.format); }
            mulUnsafe(e) { this._checkFormat(e); const t = g(this._value, this.format.decimals), r = g(e._value, e.format.decimals); return b.fromValue(t.mul(r).div(this.format._multiplier), this.format.decimals, this.format); }
            divUnsafe(e) { this._checkFormat(e); const t = g(this._value, this.format.decimals), r = g(e._value, e.format.decimals); return b.fromValue(t.mul(this.format._multiplier).div(r), this.format.decimals, this.format); }
            floor() { const e = this.toString().split("."); 1 === e.length && e.push("0"); let t = b.from(e[0], this.format); const r = !e[1].match(/^(0*)$/); return this.isNegative() && r && (t = t.subUnsafe(y.toFormat(t.format))), t; }
            ceiling() { const e = this.toString().split("."); 1 === e.length && e.push("0"); let t = b.from(e[0], this.format); const r = !e[1].match(/^(0*)$/); return !this.isNegative() && r && (t = t.addUnsafe(y.toFormat(t.format))), t; }
            round(e) { null == e && (e = 0); const t = this.toString().split("."); if (1 === t.length && t.push("0"), (e < 0 || e > 80 || e % 1) && s.throwArgumentError("invalid decimal count", "decimals", e), t[1].length <= e)
                return this; const r = b.from("1" + h.substring(0, e), this.format), n = v.toFormat(this.format); return this.mulUnsafe(r).addUnsafe(n).floor().divUnsafe(r); }
            isZero() { return "0.0" === this._value || "0" === this._value; }
            isNegative() { return "-" === this._value[0]; }
            toString() { return this._value; }
            toHexString(e) { if (null == e)
                return this._hex; e % 8 && s.throwArgumentError("invalid byte width", "width", e); const t = a.O$.from(this._hex).fromTwos(this.format.width).toTwos(e).toHexString(); return (0, n.hexZeroPad)(t, e / 8); }
            toUnsafeFloat() { return parseFloat(this.toString()); }
            toFormat(e) { return b.fromString(this._value, e); }
            static fromValue(e, t, r) { return null != r || null == t || (0, a.Zm)(t) || (r = t, t = null), null == t && (t = 0), null == r && (r = "fixed"), b.fromString(p(e, t), m.from(r)); }
            static fromString(e, t) { null == t && (t = "fixed"); const r = m.from(t), i = g(e, r.decimals); !r.signed && i.lt(l) && f("unsigned value cannot be negative", "overflow", "value", e); let o = null; r.signed ? o = i.toTwos(r.width).toHexString() : (o = i.toHexString(), o = (0, n.hexZeroPad)(o, r.width / 8)); const a = p(i, r.decimals); return new b(c, o, a, r); }
            static fromBytes(e, t) { null == t && (t = "fixed"); const r = m.from(t); if ((0, n.arrayify)(e).length > r.width / 8)
                throw new Error("overflow"); let i = a.O$.from(e); r.signed && (i = i.fromTwos(r.width)); const o = i.toTwos((r.signed ? 0 : 1) + r.width).toHexString(), s = p(i, r.decimals); return new b(c, o, s, r); }
            static from(e, t) { if ("string" == typeof e)
                return b.fromString(e, t); if ((0, n.isBytes)(e))
                return b.fromBytes(e, t); try {
                return b.fromValue(e, 0, t);
            }
            catch (e) {
                if (e.code !== i.Logger.errors.INVALID_ARGUMENT)
                    throw e;
            } return s.throwArgumentError("invalid FixedNumber value", "value", e); }
            static isFixedNumber(e) { return !(!e || !e._isFixedNumber); }
        }
        const y = b.from(1), v = b.from("0.5"), A = new i.Logger("units/5.4.0"), S = ["wei", "kwei", "mwei", "gwei", "szabo", "finney", "ether"];
        function w(e) { const t = String(e).split("."); (t.length > 2 || !t[0].match(/^-?[0-9]*$/) || t[1] && !t[1].match(/^[0-9]*$/) || "." === e || "-." === e) && A.throwArgumentError("invalid value", "value", e); let r = t[0], n = ""; for ("-" === r.substring(0, 1) && (n = "-", r = r.substring(1)); "0" === r.substring(0, 1);)
            r = r.substring(1); "" === r && (r = "0"); let i = ""; for (2 === t.length && (i = "." + (t[1] || "0")); i.length > 2 && "0" === i[i.length - 1];)
            i = i.substring(0, i.length - 1); const o = []; for (; r.length;) {
            if (r.length <= 3) {
                o.unshift(r);
                break;
            }
            {
                const e = r.length - 3;
                o.unshift(r.substring(e)), r = r.substring(0, e);
            }
        } return n + o.join(",") + i; }
        function E(e, t) { if ("string" == typeof t) {
            const e = S.indexOf(t);
            -1 !== e && (t = 3 * e);
        } return p(e, null != t ? t : 18); }
        function T(e, t) { if ("string" != typeof e && A.throwArgumentError("value must be a string", "value", e), "string" == typeof t) {
            const e = S.indexOf(t);
            -1 !== e && (t = 3 * e);
        } return g(e, null != t ? t : 18); }
        function k(e) { return E(e, 18); }
        function B(e) { return T(e, 18); }
    }, 4958: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { Wallet: () => A, verifyMessage: () => S, verifyTypedData: () => w });
        var n = r(4594), i = r(4353), o = r(8171), a = r(3286), s = r(3684), c = r(7827), l = r(1681), u = r(8197), f = r(3587), h = r(4478), d = r(2768), p = r(6883), g = r(1964), m = r(4377), b = r(711), y = function (e, t, r, n) { return new (r || (r = Promise))((function (i, o) { function a(e) { try {
            c(n.next(e));
        }
        catch (e) {
            o(e);
        } } function s(e) { try {
            c(n.throw(e));
        }
        catch (e) {
            o(e);
        } } function c(e) { var t; e.done ? i(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(a, s); } c((n = n.apply(e, t || [])).next()); })); };
        const v = new b.Logger("wallet/5.4.0");
        class A extends o.E {
            constructor(e, t) { if (v.checkNew(new.target, A), super(), null != (r = e) && (0, a.isHexString)(r.privateKey, 32) && null != r.address) {
                const t = new d.SigningKey(e.privateKey);
                if ((0, f.defineReadOnly)(this, "_signingKey", (() => t)), (0, f.defineReadOnly)(this, "address", (0, m.computeAddress)(this.publicKey)), this.address !== (0, n.getAddress)(e.address) && v.throwArgumentError("privateKey/address mismatch", "privateKey", "[REDACTED]"), function (e) { const t = e.mnemonic; return t && t.phrase; }(e)) {
                    const t = e.mnemonic;
                    (0, f.defineReadOnly)(this, "_mnemonic", (() => ({ phrase: t.phrase, path: t.path || l.defaultPath, locale: t.locale || "en" })));
                    const r = this.mnemonic, n = l.HDNode.fromMnemonic(r.phrase, null, r.locale).derivePath(r.path);
                    (0, m.computeAddress)(n.privateKey) !== this.address && v.throwArgumentError("mnemonic/address mismatch", "privateKey", "[REDACTED]");
                }
                else
                    (0, f.defineReadOnly)(this, "_mnemonic", (() => null));
            }
            else {
                if (d.SigningKey.isSigningKey(e))
                    "secp256k1" !== e.curve && v.throwArgumentError("unsupported curve; must be secp256k1", "privateKey", "[REDACTED]"), (0, f.defineReadOnly)(this, "_signingKey", (() => e));
                else {
                    "string" == typeof e && e.match(/^[0-9a-f]*$/i) && 64 === e.length && (e = "0x" + e);
                    const t = new d.SigningKey(e);
                    (0, f.defineReadOnly)(this, "_signingKey", (() => t));
                }
                (0, f.defineReadOnly)(this, "_mnemonic", (() => null)), (0, f.defineReadOnly)(this, "address", (0, m.computeAddress)(this.publicKey));
            } var r; t && !i.zt.isProvider(t) && v.throwArgumentError("invalid provider", "provider", t), (0, f.defineReadOnly)(this, "provider", t || null); }
            get mnemonic() { return this._mnemonic(); }
            get privateKey() { return this._signingKey().privateKey; }
            get publicKey() { return this._signingKey().publicKey; }
            getAddress() { return Promise.resolve(this.address); }
            connect(e) { return new A(this, e); }
            signTransaction(e) { return (0, f.resolveProperties)(e).then((t => { null != t.from && ((0, n.getAddress)(t.from) !== this.address && v.throwArgumentError("transaction from address mismatch", "transaction.from", e.from), delete t.from); const r = this._signingKey().signDigest((0, u.keccak256)((0, m.serialize)(t))); return (0, m.serialize)(t, r); })); }
            signMessage(e) { return y(this, void 0, void 0, (function* () { return (0, a.joinSignature)(this._signingKey().signDigest((0, s.r)(e))); })); }
            _signTypedData(e, t, r) { return y(this, void 0, void 0, (function* () { const n = yield c.E.resolveNames(e, t, r, (e => (null == this.provider && v.throwError("cannot resolve ENS names without a provider", b.Logger.errors.UNSUPPORTED_OPERATION, { operation: "resolveName", value: e }), this.provider.resolveName(e)))); return (0, a.joinSignature)(this._signingKey().signDigest(c.E.hash(n.domain, t, n.value))); })); }
            encrypt(e, t, r) { if ("function" != typeof t || r || (r = t, t = {}), r && "function" != typeof r)
                throw new Error("invalid callback"); return t || (t = {}), (0, g.HI)(this, e, t, r); }
            static createRandom(e) { let t = (0, h.O)(16); e || (e = {}), e.extraEntropy && (t = (0, a.arrayify)((0, a.hexDataSlice)((0, u.keccak256)((0, a.concat)([t, e.extraEntropy])), 0, 16))); const r = (0, l.entropyToMnemonic)(t, e.locale); return A.fromMnemonic(r, e.path, e.locale); }
            static fromEncryptedJson(e, t, r) { return (0, p.decryptJsonWallet)(e, t, r).then((e => new A(e))); }
            static fromEncryptedJsonSync(e, t) { return new A((0, p.decryptJsonWalletSync)(e, t)); }
            static fromMnemonic(e, t, r) { return t || (t = l.defaultPath), new A(l.HDNode.fromMnemonic(e, null, r).derivePath(t)); }
        }
        function S(e, t) { return (0, m.recoverAddress)((0, s.r)(e), t); }
        function w(e, t, r, n) { return (0, m.recoverAddress)(c.E.hash(e, t, r), n); }
    }, 8341: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { _fetchData: () => h, fetchJson: () => d, poll: () => p });
        var n = r(9567), i = r(3286), o = r(3587), a = r(4242), s = r(711);
        function c(e, t) { return r = this, n = void 0, a = function* () { null == t && (t = {}); const r = { method: t.method || "GET", headers: t.headers || {}, body: t.body || void 0, mode: "cors", cache: "no-cache", credentials: "same-origin", redirect: "follow", referrer: "client" }, n = yield fetch(e, r), o = yield n.arrayBuffer(), a = {}; return n.headers.forEach ? n.headers.forEach(((e, t) => { a[t.toLowerCase()] = e; })) : n.headers.keys().forEach((e => { a[e.toLowerCase()] = n.headers.get(e); })), { headers: a, statusCode: n.status, statusMessage: n.statusText, body: (0, i.arrayify)(new Uint8Array(o)) }; }, new ((o = void 0) || (o = Promise))((function (e, t) { function i(e) { try {
            c(a.next(e));
        }
        catch (e) {
            t(e);
        } } function s(e) { try {
            c(a.throw(e));
        }
        catch (e) {
            t(e);
        } } function c(t) { var r; t.done ? e(t.value) : (r = t.value, r instanceof o ? r : new o((function (e) { e(r); }))).then(i, s); } c((a = a.apply(r, n || [])).next()); })); var r, n, o, a; }
        const l = new s.Logger("web/5.4.0");
        function u(e) { return new Promise((t => { setTimeout(t, e); })); }
        function f(e, t) { if (null == e)
            return null; if ("string" == typeof e)
            return e; if ((0, i.isBytesLike)(e)) {
            if (t && ("text" === t.split("/")[0] || "application/json" === t.split(";")[0].trim()))
                try {
                    return (0, a.ZN)(e);
                }
                catch (e) { }
            return (0, i.hexlify)(e);
        } return e; }
        function h(e, t, r) { const i = "object" == typeof e && null != e.throttleLimit ? e.throttleLimit : 12; l.assertArgument(i > 0 && i % 1 == 0, "invalid connection throttle limit", "connection.throttleLimit", i); const o = "object" == typeof e ? e.throttleCallback : null, h = "object" == typeof e && "number" == typeof e.throttleSlotInterval ? e.throttleSlotInterval : 100; l.assertArgument(h > 0 && h % 1 == 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", h); const d = {}; let p = null; const g = { method: "GET" }; let m = !1, b = 12e4; if ("string" == typeof e)
            p = e;
        else if ("object" == typeof e) {
            if (null != e && null != e.url || l.throwArgumentError("missing URL", "connection.url", e), p = e.url, "number" == typeof e.timeout && e.timeout > 0 && (b = e.timeout), e.headers)
                for (const t in e.headers)
                    d[t.toLowerCase()] = { key: t, value: String(e.headers[t]) }, ["if-none-match", "if-modified-since"].indexOf(t.toLowerCase()) >= 0 && (m = !0);
            if (g.allowGzip = !!e.allowGzip, null != e.user && null != e.password) {
                "https:" !== p.substring(0, 6) && !0 !== e.allowInsecureAuthentication && l.throwError("basic authentication requires a secure https url", s.Logger.errors.INVALID_ARGUMENT, { argument: "url", url: p, user: e.user, password: "[REDACTED]" });
                const t = e.user + ":" + e.password;
                d.authorization = { key: "Authorization", value: "Basic " + (0, n.c)((0, a.Y0)(t)) };
            }
        } t && (g.method = "POST", g.body = t, null == d["content-type"] && (d["content-type"] = { key: "Content-Type", value: "application/octet-stream" }), null == d["content-length"] && (d["content-length"] = { key: "Content-Length", value: String(t.length) })); const y = {}; Object.keys(d).forEach((e => { const t = d[e]; y[t.key] = t.value; })), g.headers = y; const v = function () { let e = null; return { promise: new Promise((function (t, r) { b && (e = setTimeout((() => { null != e && (e = null, r(l.makeError("timeout", s.Logger.errors.TIMEOUT, { requestBody: f(g.body, y["content-type"]), requestMethod: g.method, timeout: b, url: p }))); }), b)); })), cancel: function () { null != e && (clearTimeout(e), e = null); } }; }(), A = function () { return e = this, t = void 0, a = function* () { for (let e = 0; e < i; e++) {
            let t = null;
            try {
                if (t = yield c(p, g), 429 === t.statusCode && e < i) {
                    let r = !0;
                    if (o && (r = yield o(e, p)), r) {
                        let r = 0;
                        const n = t.headers["retry-after"];
                        r = "string" == typeof n && n.match(/^[1-9][0-9]*$/) ? 1e3 * parseInt(n) : h * parseInt(String(Math.random() * Math.pow(2, e))), yield u(r);
                        continue;
                    }
                }
            }
            catch (e) {
                t = e.response, null == t && (v.cancel(), l.throwError("missing response", s.Logger.errors.SERVER_ERROR, { requestBody: f(g.body, y["content-type"]), requestMethod: g.method, serverError: e, url: p }));
            }
            let n = t.body;
            if (m && 304 === t.statusCode ? n = null : (t.statusCode < 200 || t.statusCode >= 300) && (v.cancel(), l.throwError("bad response", s.Logger.errors.SERVER_ERROR, { status: t.statusCode, headers: t.headers, body: f(n, t.headers ? t.headers["content-type"] : null), requestBody: f(g.body, y["content-type"]), requestMethod: g.method, url: p })), r)
                try {
                    const e = yield r(n, t);
                    return v.cancel(), e;
                }
                catch (r) {
                    if (r.throttleRetry && e < i) {
                        let t = !0;
                        if (o && (t = yield o(e, p)), t) {
                            const t = h * parseInt(String(Math.random() * Math.pow(2, e)));
                            yield u(t);
                            continue;
                        }
                    }
                    v.cancel(), l.throwError("processing response error", s.Logger.errors.SERVER_ERROR, { body: f(n, t.headers ? t.headers["content-type"] : null), error: r, requestBody: f(g.body, y["content-type"]), requestMethod: g.method, url: p });
                }
            return v.cancel(), n;
        } return l.throwError("failed response", s.Logger.errors.SERVER_ERROR, { requestBody: f(g.body, y["content-type"]), requestMethod: g.method, url: p }); }, new ((n = void 0) || (n = Promise))((function (r, i) { function o(e) { try {
            c(a.next(e));
        }
        catch (e) {
            i(e);
        } } function s(e) { try {
            c(a.throw(e));
        }
        catch (e) {
            i(e);
        } } function c(e) { var t; e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) { e(t); }))).then(o, s); } c((a = a.apply(e, t || [])).next()); })); var e, t, n, a; }(); return Promise.race([v.promise, A]); }
        function d(e, t, r) { let n = null; if (null != t) {
            n = (0, a.Y0)(t);
            const r = "string" == typeof e ? { url: e } : (0, o.shallowCopy)(e);
            r.headers ? 0 !== Object.keys(r.headers).filter((e => "content-type" === e.toLowerCase())).length || (r.headers = (0, o.shallowCopy)(r.headers), r.headers["content-type"] = "application/json") : r.headers = { "content-type": "application/json" }, e = r;
        } return h(e, n, ((e, t) => { let n = null; if (null != e)
            try {
                n = JSON.parse((0, a.ZN)(e));
            }
            catch (t) {
                l.throwError("invalid JSON", s.Logger.errors.SERVER_ERROR, { body: e, error: t });
            } return r && (n = r(n, t)), n; })); }
        function p(e, t) { return t || (t = {}), null == (t = (0, o.shallowCopy)(t)).floor && (t.floor = 0), null == t.ceiling && (t.ceiling = 1e4), null == t.interval && (t.interval = 250), new Promise((function (r, n) { let i = null, o = !1; const a = () => !o && (o = !0, i && clearTimeout(i), !0); t.timeout && (i = setTimeout((() => { a() && n(new Error("timeout")); }), t.timeout)); const s = t.retryLimit; let c = 0; !function i() { return e().then((function (e) { if (void 0 !== e)
            a() && r(e);
        else if (t.oncePoll)
            t.oncePoll.once("poll", i);
        else if (t.onceBlock)
            t.onceBlock.once("block", i);
        else if (!o) {
            if (c++, c > s)
                return void (a() && n(new Error("retry limit reached")));
            let e = t.interval * parseInt(String(Math.random() * Math.pow(2, c)));
            e < t.floor && (e = t.floor), e > t.ceiling && (e = t.ceiling), setTimeout(i, e);
        } return null; }), (function (e) { a() && n(e); })); }(); })); }
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
            return new Uint8Array(e); throw new Error("unsupported array-like object"); } function o(e) { return new Uint8Array(e); } function a(e, t, r, n, i) { null == n && null == i || (e = e.slice ? e.slice(n, i) : Array.prototype.slice.call(e, n, i)), t.set(e, r); } var s, c = { toBytes: function (e) { var t = [], r = 0; for (e = encodeURI(e); r < e.length;) {
                var n = e.charCodeAt(r++);
                37 === n ? (t.push(parseInt(e.substr(r, 2), 16)), r += 2) : t.push(n);
            } return i(t); }, fromBytes: function (e) { for (var t = [], r = 0; r < e.length;) {
                var n = e[r];
                n < 128 ? (t.push(String.fromCharCode(n)), r++) : n > 191 && n < 224 ? (t.push(String.fromCharCode((31 & n) << 6 | 63 & e[r + 1])), r += 2) : (t.push(String.fromCharCode((15 & n) << 12 | (63 & e[r + 1]) << 6 | 63 & e[r + 2])), r += 3);
            } return t.join(""); } }, l = (s = "0123456789abcdef", { toBytes: function (e) { for (var t = [], r = 0; r < e.length; r += 2)
                t.push(parseInt(e.substr(r, 2), 16)); return t; }, fromBytes: function (e) { for (var t = [], r = 0; r < e.length; r++) {
                var n = e[r];
                t.push(s[(240 & n) >> 4] + s[15 & n]);
            } return t.join(""); } }), u = { 16: 10, 24: 12, 32: 14 }, f = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145], h = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22], d = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125], p = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986], g = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766], m = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126], b = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436], y = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890], v = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935], A = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600], S = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480], w = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795], E = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855], T = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150], k = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925]; function B(e) { for (var t = [], r = 0; r < e.length; r += 4)
            t.push(e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3]); return t; } var P = function (e) { if (!(this instanceof P))
            throw Error("AES must be instanitated with `new`"); Object.defineProperty(this, "key", { value: i(e, !0) }), this._prepare(); }; P.prototype._prepare = function () { var e = u[this.key.length]; if (null == e)
            throw new Error("invalid key size (must be 16, 24 or 32 bytes)"); this._Ke = [], this._Kd = []; for (var t = 0; t <= e; t++)
            this._Ke.push([0, 0, 0, 0]), this._Kd.push([0, 0, 0, 0]); var r, n = 4 * (e + 1), i = this.key.length / 4, o = B(this.key); for (t = 0; t < i; t++)
            r = t >> 2, this._Ke[r][t % 4] = o[t], this._Kd[e - r][t % 4] = o[t]; for (var a, s = 0, c = i; c < n;) {
            if (a = o[i - 1], o[0] ^= h[a >> 16 & 255] << 24 ^ h[a >> 8 & 255] << 16 ^ h[255 & a] << 8 ^ h[a >> 24 & 255] ^ f[s] << 24, s += 1, 8 != i)
                for (t = 1; t < i; t++)
                    o[t] ^= o[t - 1];
            else {
                for (t = 1; t < i / 2; t++)
                    o[t] ^= o[t - 1];
                for (a = o[i / 2 - 1], o[i / 2] ^= h[255 & a] ^ h[a >> 8 & 255] << 8 ^ h[a >> 16 & 255] << 16 ^ h[a >> 24 & 255] << 24, t = i / 2 + 1; t < i; t++)
                    o[t] ^= o[t - 1];
            }
            for (t = 0; t < i && c < n;)
                l = c >> 2, d = c % 4, this._Ke[l][d] = o[t], this._Kd[e - l][d] = o[t++], c++;
        } for (var l = 1; l < e; l++)
            for (var d = 0; d < 4; d++)
                a = this._Kd[l][d], this._Kd[l][d] = w[a >> 24 & 255] ^ E[a >> 16 & 255] ^ T[a >> 8 & 255] ^ k[255 & a]; }, P.prototype.encrypt = function (e) { if (16 != e.length)
            throw new Error("invalid plaintext size (must be 16 bytes)"); for (var t = this._Ke.length - 1, r = [0, 0, 0, 0], n = B(e), i = 0; i < 4; i++)
            n[i] ^= this._Ke[0][i]; for (var a = 1; a < t; a++) {
            for (i = 0; i < 4; i++)
                r[i] = p[n[i] >> 24 & 255] ^ g[n[(i + 1) % 4] >> 16 & 255] ^ m[n[(i + 2) % 4] >> 8 & 255] ^ b[255 & n[(i + 3) % 4]] ^ this._Ke[a][i];
            n = r.slice();
        } var s, c = o(16); for (i = 0; i < 4; i++)
            s = this._Ke[t][i], c[4 * i] = 255 & (h[n[i] >> 24 & 255] ^ s >> 24), c[4 * i + 1] = 255 & (h[n[(i + 1) % 4] >> 16 & 255] ^ s >> 16), c[4 * i + 2] = 255 & (h[n[(i + 2) % 4] >> 8 & 255] ^ s >> 8), c[4 * i + 3] = 255 & (h[255 & n[(i + 3) % 4]] ^ s); return c; }, P.prototype.decrypt = function (e) { if (16 != e.length)
            throw new Error("invalid ciphertext size (must be 16 bytes)"); for (var t = this._Kd.length - 1, r = [0, 0, 0, 0], n = B(e), i = 0; i < 4; i++)
            n[i] ^= this._Kd[0][i]; for (var a = 1; a < t; a++) {
            for (i = 0; i < 4; i++)
                r[i] = y[n[i] >> 24 & 255] ^ v[n[(i + 3) % 4] >> 16 & 255] ^ A[n[(i + 2) % 4] >> 8 & 255] ^ S[255 & n[(i + 1) % 4]] ^ this._Kd[a][i];
            n = r.slice();
        } var s, c = o(16); for (i = 0; i < 4; i++)
            s = this._Kd[t][i], c[4 * i] = 255 & (d[n[i] >> 24 & 255] ^ s >> 24), c[4 * i + 1] = 255 & (d[n[(i + 3) % 4] >> 16 & 255] ^ s >> 16), c[4 * i + 2] = 255 & (d[n[(i + 2) % 4] >> 8 & 255] ^ s >> 8), c[4 * i + 3] = 255 & (d[255 & n[(i + 1) % 4]] ^ s); return c; }; var M = function (e) { if (!(this instanceof M))
            throw Error("AES must be instanitated with `new`"); this.description = "Electronic Code Block", this.name = "ecb", this._aes = new P(e); }; M.prototype.encrypt = function (e) { if ((e = i(e)).length % 16 != 0)
            throw new Error("invalid plaintext size (must be multiple of 16 bytes)"); for (var t = o(e.length), r = o(16), n = 0; n < e.length; n += 16)
            a(e, r, 0, n, n + 16), a(r = this._aes.encrypt(r), t, n); return t; }, M.prototype.decrypt = function (e) { if ((e = i(e)).length % 16 != 0)
            throw new Error("invalid ciphertext size (must be multiple of 16 bytes)"); for (var t = o(e.length), r = o(16), n = 0; n < e.length; n += 16)
            a(e, r, 0, n, n + 16), a(r = this._aes.decrypt(r), t, n); return t; }; var C = function (e, t) { if (!(this instanceof C))
            throw Error("AES must be instanitated with `new`"); if (this.description = "Cipher Block Chaining", this.name = "cbc", t) {
            if (16 != t.length)
                throw new Error("invalid initialation vector size (must be 16 bytes)");
        }
        else
            t = o(16); this._lastCipherblock = i(t, !0), this._aes = new P(e); }; C.prototype.encrypt = function (e) { if ((e = i(e)).length % 16 != 0)
            throw new Error("invalid plaintext size (must be multiple of 16 bytes)"); for (var t = o(e.length), r = o(16), n = 0; n < e.length; n += 16) {
            a(e, r, 0, n, n + 16);
            for (var s = 0; s < 16; s++)
                r[s] ^= this._lastCipherblock[s];
            this._lastCipherblock = this._aes.encrypt(r), a(this._lastCipherblock, t, n);
        } return t; }, C.prototype.decrypt = function (e) { if ((e = i(e)).length % 16 != 0)
            throw new Error("invalid ciphertext size (must be multiple of 16 bytes)"); for (var t = o(e.length), r = o(16), n = 0; n < e.length; n += 16) {
            a(e, r, 0, n, n + 16), r = this._aes.decrypt(r);
            for (var s = 0; s < 16; s++)
                t[n + s] = r[s] ^ this._lastCipherblock[s];
            a(e, this._lastCipherblock, 0, n, n + 16);
        } return t; }; var L = function (e, t, r) { if (!(this instanceof L))
            throw Error("AES must be instanitated with `new`"); if (this.description = "Cipher Feedback", this.name = "cfb", t) {
            if (16 != t.length)
                throw new Error("invalid initialation vector size (must be 16 size)");
        }
        else
            t = o(16); r || (r = 1), this.segmentSize = r, this._shiftRegister = i(t, !0), this._aes = new P(e); }; L.prototype.encrypt = function (e) { if (e.length % this.segmentSize != 0)
            throw new Error("invalid plaintext size (must be segmentSize bytes)"); for (var t, r = i(e, !0), n = 0; n < r.length; n += this.segmentSize) {
            t = this._aes.encrypt(this._shiftRegister);
            for (var o = 0; o < this.segmentSize; o++)
                r[n + o] ^= t[o];
            a(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), a(r, this._shiftRegister, 16 - this.segmentSize, n, n + this.segmentSize);
        } return r; }, L.prototype.decrypt = function (e) { if (e.length % this.segmentSize != 0)
            throw new Error("invalid ciphertext size (must be segmentSize bytes)"); for (var t, r = i(e, !0), n = 0; n < r.length; n += this.segmentSize) {
            t = this._aes.encrypt(this._shiftRegister);
            for (var o = 0; o < this.segmentSize; o++)
                r[n + o] ^= t[o];
            a(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), a(e, this._shiftRegister, 16 - this.segmentSize, n, n + this.segmentSize);
        } return r; }; var F = function (e, t) { if (!(this instanceof F))
            throw Error("AES must be instanitated with `new`"); if (this.description = "Output Feedback", this.name = "ofb", t) {
            if (16 != t.length)
                throw new Error("invalid initialation vector size (must be 16 bytes)");
        }
        else
            t = o(16); this._lastPrecipher = i(t, !0), this._lastPrecipherIndex = 16, this._aes = new P(e); }; F.prototype.encrypt = function (e) { for (var t = i(e, !0), r = 0; r < t.length; r++)
            16 === this._lastPrecipherIndex && (this._lastPrecipher = this._aes.encrypt(this._lastPrecipher), this._lastPrecipherIndex = 0), t[r] ^= this._lastPrecipher[this._lastPrecipherIndex++]; return t; }, F.prototype.decrypt = F.prototype.encrypt; var O = function (e) { if (!(this instanceof O))
            throw Error("Counter must be instanitated with `new`"); 0 === e || e || (e = 1), "number" == typeof e ? (this._counter = o(16), this.setValue(e)) : this.setBytes(e); }; O.prototype.setValue = function (e) { if ("number" != typeof e || parseInt(e) != e)
            throw new Error("invalid counter value (must be an integer)"); for (var t = 15; t >= 0; --t)
            this._counter[t] = e % 256, e >>= 8; }, O.prototype.setBytes = function (e) { if (16 != (e = i(e, !0)).length)
            throw new Error("invalid counter bytes size (must be 16 bytes)"); this._counter = e; }, O.prototype.increment = function () { for (var e = 15; e >= 0; e--) {
            if (255 !== this._counter[e]) {
                this._counter[e]++;
                break;
            }
            this._counter[e] = 0;
        } }; var x = function (e, t) { if (!(this instanceof x))
            throw Error("AES must be instanitated with `new`"); this.description = "Counter", this.name = "ctr", t instanceof O || (t = new O(t)), this._counter = t, this._remainingCounter = null, this._remainingCounterIndex = 16, this._aes = new P(e); }; x.prototype.encrypt = function (e) { for (var t = i(e, !0), r = 0; r < t.length; r++)
            16 === this._remainingCounterIndex && (this._remainingCounter = this._aes.encrypt(this._counter._counter), this._remainingCounterIndex = 0, this._counter.increment()), t[r] ^= this._remainingCounter[this._remainingCounterIndex++]; return t; }, x.prototype.decrypt = x.prototype.encrypt; var N = { AES: P, Counter: O, ModeOfOperation: { ecb: M, cbc: C, cfb: L, ofb: F, ctr: x }, utils: { hex: l, utf8: c }, padding: { pkcs7: { pad: function (e) { var t = 16 - (e = i(e, !0)).length % 16, r = o(e.length + t); a(e, r); for (var n = e.length; n < r.length; n++)
                        r[n] = t; return r; }, strip: function (e) { if ((e = i(e, !0)).length < 16)
                        throw new Error("PKCS#7 invalid length"); var t = e[e.length - 1]; if (t > 16)
                        throw new Error("PKCS#7 padding byte out of range"); for (var r = e.length - t, n = 0; n < t; n++)
                        if (e[r + n] !== t)
                            throw new Error("PKCS#7 invalid padding byte"); var s = o(r); return a(e, s, 0, 0, r), s; } } }, _arrayTest: { coerceArray: i, createArray: o, copyArray: a } }; e.exports = N; }();
    }, 2882: e => {
        "use strict";
        for (var t = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", r = {}, n = 0; n < t.length; n++) {
            var i = t.charAt(n);
            if (void 0 !== r[i])
                throw new TypeError(i + " is ambiguous");
            r[i] = n;
        }
        function o(e) { var t = e >> 25; return (33554431 & e) << 5 ^ 996825010 & -(t >> 0 & 1) ^ 642813549 & -(t >> 1 & 1) ^ 513874426 & -(t >> 2 & 1) ^ 1027748829 & -(t >> 3 & 1) ^ 705979059 & -(t >> 4 & 1); }
        function a(e) { for (var t = 1, r = 0; r < e.length; ++r) {
            var n = e.charCodeAt(r);
            if (n < 33 || n > 126)
                return "Invalid prefix (" + e + ")";
            t = o(t) ^ n >> 5;
        } for (t = o(t), r = 0; r < e.length; ++r) {
            var i = e.charCodeAt(r);
            t = o(t) ^ 31 & i;
        } return t; }
        function s(e, t) { if (t = t || 90, e.length < 8)
            return e + " too short"; if (e.length > t)
            return "Exceeds length limit"; var n = e.toLowerCase(), i = e.toUpperCase(); if (e !== n && e !== i)
            return "Mixed-case string " + e; var s = (e = n).lastIndexOf("1"); if (-1 === s)
            return "No separator character for " + e; if (0 === s)
            return "Missing prefix for " + e; var c = e.slice(0, s), l = e.slice(s + 1); if (l.length < 6)
            return "Data too short"; var u = a(c); if ("string" == typeof u)
            return u; for (var f = [], h = 0; h < l.length; ++h) {
            var d = l.charAt(h), p = r[d];
            if (void 0 === p)
                return "Unknown character " + d;
            u = o(u) ^ p, h + 6 >= l.length || f.push(p);
        } return 1 !== u ? "Invalid checksum for " + e : { prefix: c, words: f }; }
        function c(e, t, r, n) { for (var i = 0, o = 0, a = (1 << r) - 1, s = [], c = 0; c < e.length; ++c)
            for (i = i << t | e[c], o += t; o >= r;)
                o -= r, s.push(i >> o & a); if (n)
            o > 0 && s.push(i << r - o & a);
        else {
            if (o >= t)
                return "Excess padding";
            if (i << r - o & a)
                return "Non-zero padding";
        } return s; }
        e.exports = { decodeUnsafe: function () { var e = s.apply(null, arguments); if ("object" == typeof e)
                return e; }, decode: function (e) { var t = s.apply(null, arguments); if ("object" == typeof t)
                return t; throw new Error(t); }, encode: function (e, r, n) { if (n = n || 90, e.length + 7 + r.length > n)
                throw new TypeError("Exceeds length limit"); var i = a(e = e.toLowerCase()); if ("string" == typeof i)
                throw new Error(i); for (var s = e + "1", c = 0; c < r.length; ++c) {
                var l = r[c];
                if (l >> 5 != 0)
                    throw new Error("Non 5-bit word");
                i = o(i) ^ l, s += t.charAt(l);
            } for (c = 0; c < 6; ++c)
                i = o(i); for (i ^= 1, c = 0; c < 6; ++c)
                s += t.charAt(i >> 5 * (5 - c) & 31); return s; }, toWordsUnsafe: function (e) { var t = c(e, 8, 5, !0); if (Array.isArray(t))
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
        var a;
        "object" == typeof e ? e.exports = o : t.BN = o, o.BN = o, o.wordSize = 26;
        try {
            a = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : r(6601).Buffer;
        }
        catch (e) { }
        function s(e, t) { var r = e.charCodeAt(t); return r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : r - 48 & 15; }
        function c(e, t, r) { var n = s(e, r); return r - 1 >= t && (n |= s(e, r - 1) << 4), n; }
        function l(e, t, r, n) { for (var i = 0, o = Math.min(e.length, r), a = t; a < o; a++) {
            var s = e.charCodeAt(a) - 48;
            i *= n, i += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s;
        } return i; }
        o.isBN = function (e) { return e instanceof o || null !== e && "object" == typeof e && e.constructor.wordSize === o.wordSize && Array.isArray(e.words); }, o.max = function (e, t) { return e.cmp(t) > 0 ? e : t; }, o.min = function (e, t) { return e.cmp(t) < 0 ? e : t; }, o.prototype._init = function (e, t, r) { if ("number" == typeof e)
            return this._initNumber(e, t, r); if ("object" == typeof e)
            return this._initArray(e, t, r); "hex" === t && (t = 16), n(t === (0 | t) && t >= 2 && t <= 36); var i = 0; "-" === (e = e.toString().replace(/\s+/g, ""))[0] && (i++, this.negative = 1), i < e.length && (16 === t ? this._parseHex(e, i, r) : (this._parseBase(e, t, i), "le" === r && this._initArray(this.toArray(), t, r))); }, o.prototype._initNumber = function (e, t, r) { e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [67108863 & e], this.length = 1) : e < 4503599627370496 ? (this.words = [67108863 & e, e / 67108864 & 67108863], this.length = 2) : (n(e < 9007199254740992), this.words = [67108863 & e, e / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), t, r); }, o.prototype._initArray = function (e, t, r) { if (n("number" == typeof e.length), e.length <= 0)
            return this.words = [0], this.length = 1, this; this.length = Math.ceil(e.length / 3), this.words = new Array(this.length); for (var i = 0; i < this.length; i++)
            this.words[i] = 0; var o, a, s = 0; if ("be" === r)
            for (i = e.length - 1, o = 0; i >= 0; i -= 3)
                a = e[i] | e[i - 1] << 8 | e[i - 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++);
        else if ("le" === r)
            for (i = 0, o = 0; i < e.length; i += 3)
                a = e[i] | e[i + 1] << 8 | e[i + 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++); return this.strip(); }, o.prototype._parseHex = function (e, t, r) { this.length = Math.ceil((e.length - t) / 6), this.words = new Array(this.length); for (var n = 0; n < this.length; n++)
            this.words[n] = 0; var i, o = 0, a = 0; if ("be" === r)
            for (n = e.length - 1; n >= t; n -= 2)
                i = c(e, t, n) << o, this.words[a] |= 67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[a] |= i >>> 26) : o += 8;
        else
            for (n = (e.length - t) % 2 == 0 ? t + 1 : t; n < e.length; n += 2)
                i = c(e, t, n) << o, this.words[a] |= 67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[a] |= i >>> 26) : o += 8; this.strip(); }, o.prototype._parseBase = function (e, t, r) { this.words = [0], this.length = 1; for (var n = 0, i = 1; i <= 67108863; i *= t)
            n++; n--, i = i / t | 0; for (var o = e.length - r, a = o % n, s = Math.min(o, o - a) + r, c = 0, u = r; u < s; u += n)
            c = l(e, u, u + n, t), this.imuln(i), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c); if (0 !== a) {
            var f = 1;
            for (c = l(e, u, e.length, t), u = 0; u < a; u++)
                f *= t;
            this.imuln(f), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);
        } this.strip(); }, o.prototype.copy = function (e) { e.words = new Array(this.length); for (var t = 0; t < this.length; t++)
            e.words[t] = this.words[t]; e.length = this.length, e.negative = this.negative, e.red = this.red; }, o.prototype.clone = function () { var e = new o(null); return this.copy(e), e; }, o.prototype._expand = function (e) { for (; this.length < e;)
            this.words[this.length++] = 0; return this; }, o.prototype.strip = function () { for (; this.length > 1 && 0 === this.words[this.length - 1];)
            this.length--; return this._normSign(); }, o.prototype._normSign = function () { return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this; }, o.prototype.inspect = function () { return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"; };
        var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], f = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], h = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
        function d(e, t, r) { r.negative = t.negative ^ e.negative; var n = e.length + t.length | 0; r.length = n, n = n - 1 | 0; var i = 0 | e.words[0], o = 0 | t.words[0], a = i * o, s = 67108863 & a, c = a / 67108864 | 0; r.words[0] = s; for (var l = 1; l < n; l++) {
            for (var u = c >>> 26, f = 67108863 & c, h = Math.min(l, t.length - 1), d = Math.max(0, l - e.length + 1); d <= h; d++) {
                var p = l - d | 0;
                u += (a = (i = 0 | e.words[p]) * (o = 0 | t.words[d]) + f) / 67108864 | 0, f = 67108863 & a;
            }
            r.words[l] = 0 | f, c = 0 | u;
        } return 0 !== c ? r.words[l] = 0 | c : r.length--, r.strip(); }
        o.prototype.toString = function (e, t) { var r; if (t = 0 | t || 1, 16 === (e = e || 10) || "hex" === e) {
            r = "";
            for (var i = 0, o = 0, a = 0; a < this.length; a++) {
                var s = this.words[a], c = (16777215 & (s << i | o)).toString(16);
                r = 0 != (o = s >>> 24 - i & 16777215) || a !== this.length - 1 ? u[6 - c.length] + c + r : c + r, (i += 2) >= 26 && (i -= 26, a--);
            }
            for (0 !== o && (r = o.toString(16) + r); r.length % t != 0;)
                r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
        } if (e === (0 | e) && e >= 2 && e <= 36) {
            var l = f[e], d = h[e];
            r = "";
            var p = this.clone();
            for (p.negative = 0; !p.isZero();) {
                var g = p.modn(d).toString(e);
                r = (p = p.idivn(d)).isZero() ? g + r : u[l - g.length] + g + r;
            }
            for (this.isZero() && (r = "0" + r); r.length % t != 0;)
                r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
        } n(!1, "Base should be between 2 and 36"); }, o.prototype.toNumber = function () { var e = this.words[0]; return 2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -e : e; }, o.prototype.toJSON = function () { return this.toString(16); }, o.prototype.toBuffer = function (e, t) { return n(void 0 !== a), this.toArrayLike(a, e, t); }, o.prototype.toArray = function (e, t) { return this.toArrayLike(Array, e, t); }, o.prototype.toArrayLike = function (e, t, r) { var i = this.byteLength(), o = r || Math.max(1, i); n(i <= o, "byte array longer than desired length"), n(o > 0, "Requested array length <= 0"), this.strip(); var a, s, c = "le" === t, l = new e(o), u = this.clone(); if (c) {
            for (s = 0; !u.isZero(); s++)
                a = u.andln(255), u.iushrn(8), l[s] = a;
            for (; s < o; s++)
                l[s] = 0;
        }
        else {
            for (s = 0; s < o - i; s++)
                l[s] = 0;
            for (s = 0; !u.isZero(); s++)
                a = u.andln(255), u.iushrn(8), l[o - s - 1] = a;
        } return l; }, Math.clz32 ? o.prototype._countBits = function (e) { return 32 - Math.clz32(e); } : o.prototype._countBits = function (e) { var t = e, r = 0; return t >= 4096 && (r += 13, t >>>= 13), t >= 64 && (r += 7, t >>>= 7), t >= 8 && (r += 4, t >>>= 4), t >= 2 && (r += 2, t >>>= 2), r + t; }, o.prototype._zeroBits = function (e) { if (0 === e)
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
            return this.negative = 0, this.length = 1, this.words[0] = 0, this; i > 0 ? (r = this, n = e) : (r = e, n = this); for (var o = 0, a = 0; a < n.length; a++)
            o = (t = (0 | r.words[a]) - (0 | n.words[a]) + o) >> 26, this.words[a] = 67108863 & t; for (; 0 !== o && a < r.length; a++)
            o = (t = (0 | r.words[a]) + o) >> 26, this.words[a] = 67108863 & t; if (0 === o && a < r.length && r !== this)
            for (; a < r.length; a++)
                this.words[a] = r.words[a]; return this.length = Math.max(this.length, a), r !== this && (this.negative = 1), this.strip(); }, o.prototype.sub = function (e) { return this.clone().isub(e); };
        var p = function (e, t, r) { var n, i, o, a = e.words, s = t.words, c = r.words, l = 0, u = 0 | a[0], f = 8191 & u, h = u >>> 13, d = 0 | a[1], p = 8191 & d, g = d >>> 13, m = 0 | a[2], b = 8191 & m, y = m >>> 13, v = 0 | a[3], A = 8191 & v, S = v >>> 13, w = 0 | a[4], E = 8191 & w, T = w >>> 13, k = 0 | a[5], B = 8191 & k, P = k >>> 13, M = 0 | a[6], C = 8191 & M, L = M >>> 13, F = 0 | a[7], O = 8191 & F, x = F >>> 13, N = 0 | a[8], R = 8191 & N, I = N >>> 13, D = 0 | a[9], J = 8191 & D, _ = D >>> 13, U = 0 | s[0], H = 8191 & U, G = U >>> 13, j = 0 | s[1], X = 8191 & j, V = j >>> 13, z = 0 | s[2], Z = 8191 & z, K = z >>> 13, q = 0 | s[3], Q = 8191 & q, W = q >>> 13, Y = 0 | s[4], $ = 8191 & Y, ee = Y >>> 13, te = 0 | s[5], re = 8191 & te, ne = te >>> 13, ie = 0 | s[6], oe = 8191 & ie, ae = ie >>> 13, se = 0 | s[7], ce = 8191 & se, le = se >>> 13, ue = 0 | s[8], fe = 8191 & ue, he = ue >>> 13, de = 0 | s[9], pe = 8191 & de, ge = de >>> 13; r.negative = e.negative ^ t.negative, r.length = 19; var me = (l + (n = Math.imul(f, H)) | 0) + ((8191 & (i = (i = Math.imul(f, G)) + Math.imul(h, H) | 0)) << 13) | 0; l = ((o = Math.imul(h, G)) + (i >>> 13) | 0) + (me >>> 26) | 0, me &= 67108863, n = Math.imul(p, H), i = (i = Math.imul(p, G)) + Math.imul(g, H) | 0, o = Math.imul(g, G); var be = (l + (n = n + Math.imul(f, X) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, V) | 0) + Math.imul(h, X) | 0)) << 13) | 0; l = ((o = o + Math.imul(h, V) | 0) + (i >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, n = Math.imul(b, H), i = (i = Math.imul(b, G)) + Math.imul(y, H) | 0, o = Math.imul(y, G), n = n + Math.imul(p, X) | 0, i = (i = i + Math.imul(p, V) | 0) + Math.imul(g, X) | 0, o = o + Math.imul(g, V) | 0; var ye = (l + (n = n + Math.imul(f, Z) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, K) | 0) + Math.imul(h, Z) | 0)) << 13) | 0; l = ((o = o + Math.imul(h, K) | 0) + (i >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, n = Math.imul(A, H), i = (i = Math.imul(A, G)) + Math.imul(S, H) | 0, o = Math.imul(S, G), n = n + Math.imul(b, X) | 0, i = (i = i + Math.imul(b, V) | 0) + Math.imul(y, X) | 0, o = o + Math.imul(y, V) | 0, n = n + Math.imul(p, Z) | 0, i = (i = i + Math.imul(p, K) | 0) + Math.imul(g, Z) | 0, o = o + Math.imul(g, K) | 0; var ve = (l + (n = n + Math.imul(f, Q) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, W) | 0) + Math.imul(h, Q) | 0)) << 13) | 0; l = ((o = o + Math.imul(h, W) | 0) + (i >>> 13) | 0) + (ve >>> 26) | 0, ve &= 67108863, n = Math.imul(E, H), i = (i = Math.imul(E, G)) + Math.imul(T, H) | 0, o = Math.imul(T, G), n = n + Math.imul(A, X) | 0, i = (i = i + Math.imul(A, V) | 0) + Math.imul(S, X) | 0, o = o + Math.imul(S, V) | 0, n = n + Math.imul(b, Z) | 0, i = (i = i + Math.imul(b, K) | 0) + Math.imul(y, Z) | 0, o = o + Math.imul(y, K) | 0, n = n + Math.imul(p, Q) | 0, i = (i = i + Math.imul(p, W) | 0) + Math.imul(g, Q) | 0, o = o + Math.imul(g, W) | 0; var Ae = (l + (n = n + Math.imul(f, $) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, ee) | 0) + Math.imul(h, $) | 0)) << 13) | 0; l = ((o = o + Math.imul(h, ee) | 0) + (i >>> 13) | 0) + (Ae >>> 26) | 0, Ae &= 67108863, n = Math.imul(B, H), i = (i = Math.imul(B, G)) + Math.imul(P, H) | 0, o = Math.imul(P, G), n = n + Math.imul(E, X) | 0, i = (i = i + Math.imul(E, V) | 0) + Math.imul(T, X) | 0, o = o + Math.imul(T, V) | 0, n = n + Math.imul(A, Z) | 0, i = (i = i + Math.imul(A, K) | 0) + Math.imul(S, Z) | 0, o = o + Math.imul(S, K) | 0, n = n + Math.imul(b, Q) | 0, i = (i = i + Math.imul(b, W) | 0) + Math.imul(y, Q) | 0, o = o + Math.imul(y, W) | 0, n = n + Math.imul(p, $) | 0, i = (i = i + Math.imul(p, ee) | 0) + Math.imul(g, $) | 0, o = o + Math.imul(g, ee) | 0; var Se = (l + (n = n + Math.imul(f, re) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, ne) | 0) + Math.imul(h, re) | 0)) << 13) | 0; l = ((o = o + Math.imul(h, ne) | 0) + (i >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, n = Math.imul(C, H), i = (i = Math.imul(C, G)) + Math.imul(L, H) | 0, o = Math.imul(L, G), n = n + Math.imul(B, X) | 0, i = (i = i + Math.imul(B, V) | 0) + Math.imul(P, X) | 0, o = o + Math.imul(P, V) | 0, n = n + Math.imul(E, Z) | 0, i = (i = i + Math.imul(E, K) | 0) + Math.imul(T, Z) | 0, o = o + Math.imul(T, K) | 0, n = n + Math.imul(A, Q) | 0, i = (i = i + Math.imul(A, W) | 0) + Math.imul(S, Q) | 0, o = o + Math.imul(S, W) | 0, n = n + Math.imul(b, $) | 0, i = (i = i + Math.imul(b, ee) | 0) + Math.imul(y, $) | 0, o = o + Math.imul(y, ee) | 0, n = n + Math.imul(p, re) | 0, i = (i = i + Math.imul(p, ne) | 0) + Math.imul(g, re) | 0, o = o + Math.imul(g, ne) | 0; var we = (l + (n = n + Math.imul(f, oe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, ae) | 0) + Math.imul(h, oe) | 0)) << 13) | 0; l = ((o = o + Math.imul(h, ae) | 0) + (i >>> 13) | 0) + (we >>> 26) | 0, we &= 67108863, n = Math.imul(O, H), i = (i = Math.imul(O, G)) + Math.imul(x, H) | 0, o = Math.imul(x, G), n = n + Math.imul(C, X) | 0, i = (i = i + Math.imul(C, V) | 0) + Math.imul(L, X) | 0, o = o + Math.imul(L, V) | 0, n = n + Math.imul(B, Z) | 0, i = (i = i + Math.imul(B, K) | 0) + Math.imul(P, Z) | 0, o = o + Math.imul(P, K) | 0, n = n + Math.imul(E, Q) | 0, i = (i = i + Math.imul(E, W) | 0) + Math.imul(T, Q) | 0, o = o + Math.imul(T, W) | 0, n = n + Math.imul(A, $) | 0, i = (i = i + Math.imul(A, ee) | 0) + Math.imul(S, $) | 0, o = o + Math.imul(S, ee) | 0, n = n + Math.imul(b, re) | 0, i = (i = i + Math.imul(b, ne) | 0) + Math.imul(y, re) | 0, o = o + Math.imul(y, ne) | 0, n = n + Math.imul(p, oe) | 0, i = (i = i + Math.imul(p, ae) | 0) + Math.imul(g, oe) | 0, o = o + Math.imul(g, ae) | 0; var Ee = (l + (n = n + Math.imul(f, ce) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, le) | 0) + Math.imul(h, ce) | 0)) << 13) | 0; l = ((o = o + Math.imul(h, le) | 0) + (i >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, n = Math.imul(R, H), i = (i = Math.imul(R, G)) + Math.imul(I, H) | 0, o = Math.imul(I, G), n = n + Math.imul(O, X) | 0, i = (i = i + Math.imul(O, V) | 0) + Math.imul(x, X) | 0, o = o + Math.imul(x, V) | 0, n = n + Math.imul(C, Z) | 0, i = (i = i + Math.imul(C, K) | 0) + Math.imul(L, Z) | 0, o = o + Math.imul(L, K) | 0, n = n + Math.imul(B, Q) | 0, i = (i = i + Math.imul(B, W) | 0) + Math.imul(P, Q) | 0, o = o + Math.imul(P, W) | 0, n = n + Math.imul(E, $) | 0, i = (i = i + Math.imul(E, ee) | 0) + Math.imul(T, $) | 0, o = o + Math.imul(T, ee) | 0, n = n + Math.imul(A, re) | 0, i = (i = i + Math.imul(A, ne) | 0) + Math.imul(S, re) | 0, o = o + Math.imul(S, ne) | 0, n = n + Math.imul(b, oe) | 0, i = (i = i + Math.imul(b, ae) | 0) + Math.imul(y, oe) | 0, o = o + Math.imul(y, ae) | 0, n = n + Math.imul(p, ce) | 0, i = (i = i + Math.imul(p, le) | 0) + Math.imul(g, ce) | 0, o = o + Math.imul(g, le) | 0; var Te = (l + (n = n + Math.imul(f, fe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, he) | 0) + Math.imul(h, fe) | 0)) << 13) | 0; l = ((o = o + Math.imul(h, he) | 0) + (i >>> 13) | 0) + (Te >>> 26) | 0, Te &= 67108863, n = Math.imul(J, H), i = (i = Math.imul(J, G)) + Math.imul(_, H) | 0, o = Math.imul(_, G), n = n + Math.imul(R, X) | 0, i = (i = i + Math.imul(R, V) | 0) + Math.imul(I, X) | 0, o = o + Math.imul(I, V) | 0, n = n + Math.imul(O, Z) | 0, i = (i = i + Math.imul(O, K) | 0) + Math.imul(x, Z) | 0, o = o + Math.imul(x, K) | 0, n = n + Math.imul(C, Q) | 0, i = (i = i + Math.imul(C, W) | 0) + Math.imul(L, Q) | 0, o = o + Math.imul(L, W) | 0, n = n + Math.imul(B, $) | 0, i = (i = i + Math.imul(B, ee) | 0) + Math.imul(P, $) | 0, o = o + Math.imul(P, ee) | 0, n = n + Math.imul(E, re) | 0, i = (i = i + Math.imul(E, ne) | 0) + Math.imul(T, re) | 0, o = o + Math.imul(T, ne) | 0, n = n + Math.imul(A, oe) | 0, i = (i = i + Math.imul(A, ae) | 0) + Math.imul(S, oe) | 0, o = o + Math.imul(S, ae) | 0, n = n + Math.imul(b, ce) | 0, i = (i = i + Math.imul(b, le) | 0) + Math.imul(y, ce) | 0, o = o + Math.imul(y, le) | 0, n = n + Math.imul(p, fe) | 0, i = (i = i + Math.imul(p, he) | 0) + Math.imul(g, fe) | 0, o = o + Math.imul(g, he) | 0; var ke = (l + (n = n + Math.imul(f, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, ge) | 0) + Math.imul(h, pe) | 0)) << 13) | 0; l = ((o = o + Math.imul(h, ge) | 0) + (i >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, n = Math.imul(J, X), i = (i = Math.imul(J, V)) + Math.imul(_, X) | 0, o = Math.imul(_, V), n = n + Math.imul(R, Z) | 0, i = (i = i + Math.imul(R, K) | 0) + Math.imul(I, Z) | 0, o = o + Math.imul(I, K) | 0, n = n + Math.imul(O, Q) | 0, i = (i = i + Math.imul(O, W) | 0) + Math.imul(x, Q) | 0, o = o + Math.imul(x, W) | 0, n = n + Math.imul(C, $) | 0, i = (i = i + Math.imul(C, ee) | 0) + Math.imul(L, $) | 0, o = o + Math.imul(L, ee) | 0, n = n + Math.imul(B, re) | 0, i = (i = i + Math.imul(B, ne) | 0) + Math.imul(P, re) | 0, o = o + Math.imul(P, ne) | 0, n = n + Math.imul(E, oe) | 0, i = (i = i + Math.imul(E, ae) | 0) + Math.imul(T, oe) | 0, o = o + Math.imul(T, ae) | 0, n = n + Math.imul(A, ce) | 0, i = (i = i + Math.imul(A, le) | 0) + Math.imul(S, ce) | 0, o = o + Math.imul(S, le) | 0, n = n + Math.imul(b, fe) | 0, i = (i = i + Math.imul(b, he) | 0) + Math.imul(y, fe) | 0, o = o + Math.imul(y, he) | 0; var Be = (l + (n = n + Math.imul(p, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p, ge) | 0) + Math.imul(g, pe) | 0)) << 13) | 0; l = ((o = o + Math.imul(g, ge) | 0) + (i >>> 13) | 0) + (Be >>> 26) | 0, Be &= 67108863, n = Math.imul(J, Z), i = (i = Math.imul(J, K)) + Math.imul(_, Z) | 0, o = Math.imul(_, K), n = n + Math.imul(R, Q) | 0, i = (i = i + Math.imul(R, W) | 0) + Math.imul(I, Q) | 0, o = o + Math.imul(I, W) | 0, n = n + Math.imul(O, $) | 0, i = (i = i + Math.imul(O, ee) | 0) + Math.imul(x, $) | 0, o = o + Math.imul(x, ee) | 0, n = n + Math.imul(C, re) | 0, i = (i = i + Math.imul(C, ne) | 0) + Math.imul(L, re) | 0, o = o + Math.imul(L, ne) | 0, n = n + Math.imul(B, oe) | 0, i = (i = i + Math.imul(B, ae) | 0) + Math.imul(P, oe) | 0, o = o + Math.imul(P, ae) | 0, n = n + Math.imul(E, ce) | 0, i = (i = i + Math.imul(E, le) | 0) + Math.imul(T, ce) | 0, o = o + Math.imul(T, le) | 0, n = n + Math.imul(A, fe) | 0, i = (i = i + Math.imul(A, he) | 0) + Math.imul(S, fe) | 0, o = o + Math.imul(S, he) | 0; var Pe = (l + (n = n + Math.imul(b, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(b, ge) | 0) + Math.imul(y, pe) | 0)) << 13) | 0; l = ((o = o + Math.imul(y, ge) | 0) + (i >>> 13) | 0) + (Pe >>> 26) | 0, Pe &= 67108863, n = Math.imul(J, Q), i = (i = Math.imul(J, W)) + Math.imul(_, Q) | 0, o = Math.imul(_, W), n = n + Math.imul(R, $) | 0, i = (i = i + Math.imul(R, ee) | 0) + Math.imul(I, $) | 0, o = o + Math.imul(I, ee) | 0, n = n + Math.imul(O, re) | 0, i = (i = i + Math.imul(O, ne) | 0) + Math.imul(x, re) | 0, o = o + Math.imul(x, ne) | 0, n = n + Math.imul(C, oe) | 0, i = (i = i + Math.imul(C, ae) | 0) + Math.imul(L, oe) | 0, o = o + Math.imul(L, ae) | 0, n = n + Math.imul(B, ce) | 0, i = (i = i + Math.imul(B, le) | 0) + Math.imul(P, ce) | 0, o = o + Math.imul(P, le) | 0, n = n + Math.imul(E, fe) | 0, i = (i = i + Math.imul(E, he) | 0) + Math.imul(T, fe) | 0, o = o + Math.imul(T, he) | 0; var Me = (l + (n = n + Math.imul(A, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(A, ge) | 0) + Math.imul(S, pe) | 0)) << 13) | 0; l = ((o = o + Math.imul(S, ge) | 0) + (i >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, n = Math.imul(J, $), i = (i = Math.imul(J, ee)) + Math.imul(_, $) | 0, o = Math.imul(_, ee), n = n + Math.imul(R, re) | 0, i = (i = i + Math.imul(R, ne) | 0) + Math.imul(I, re) | 0, o = o + Math.imul(I, ne) | 0, n = n + Math.imul(O, oe) | 0, i = (i = i + Math.imul(O, ae) | 0) + Math.imul(x, oe) | 0, o = o + Math.imul(x, ae) | 0, n = n + Math.imul(C, ce) | 0, i = (i = i + Math.imul(C, le) | 0) + Math.imul(L, ce) | 0, o = o + Math.imul(L, le) | 0, n = n + Math.imul(B, fe) | 0, i = (i = i + Math.imul(B, he) | 0) + Math.imul(P, fe) | 0, o = o + Math.imul(P, he) | 0; var Ce = (l + (n = n + Math.imul(E, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(E, ge) | 0) + Math.imul(T, pe) | 0)) << 13) | 0; l = ((o = o + Math.imul(T, ge) | 0) + (i >>> 13) | 0) + (Ce >>> 26) | 0, Ce &= 67108863, n = Math.imul(J, re), i = (i = Math.imul(J, ne)) + Math.imul(_, re) | 0, o = Math.imul(_, ne), n = n + Math.imul(R, oe) | 0, i = (i = i + Math.imul(R, ae) | 0) + Math.imul(I, oe) | 0, o = o + Math.imul(I, ae) | 0, n = n + Math.imul(O, ce) | 0, i = (i = i + Math.imul(O, le) | 0) + Math.imul(x, ce) | 0, o = o + Math.imul(x, le) | 0, n = n + Math.imul(C, fe) | 0, i = (i = i + Math.imul(C, he) | 0) + Math.imul(L, fe) | 0, o = o + Math.imul(L, he) | 0; var Le = (l + (n = n + Math.imul(B, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(B, ge) | 0) + Math.imul(P, pe) | 0)) << 13) | 0; l = ((o = o + Math.imul(P, ge) | 0) + (i >>> 13) | 0) + (Le >>> 26) | 0, Le &= 67108863, n = Math.imul(J, oe), i = (i = Math.imul(J, ae)) + Math.imul(_, oe) | 0, o = Math.imul(_, ae), n = n + Math.imul(R, ce) | 0, i = (i = i + Math.imul(R, le) | 0) + Math.imul(I, ce) | 0, o = o + Math.imul(I, le) | 0, n = n + Math.imul(O, fe) | 0, i = (i = i + Math.imul(O, he) | 0) + Math.imul(x, fe) | 0, o = o + Math.imul(x, he) | 0; var Fe = (l + (n = n + Math.imul(C, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(C, ge) | 0) + Math.imul(L, pe) | 0)) << 13) | 0; l = ((o = o + Math.imul(L, ge) | 0) + (i >>> 13) | 0) + (Fe >>> 26) | 0, Fe &= 67108863, n = Math.imul(J, ce), i = (i = Math.imul(J, le)) + Math.imul(_, ce) | 0, o = Math.imul(_, le), n = n + Math.imul(R, fe) | 0, i = (i = i + Math.imul(R, he) | 0) + Math.imul(I, fe) | 0, o = o + Math.imul(I, he) | 0; var Oe = (l + (n = n + Math.imul(O, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(O, ge) | 0) + Math.imul(x, pe) | 0)) << 13) | 0; l = ((o = o + Math.imul(x, ge) | 0) + (i >>> 13) | 0) + (Oe >>> 26) | 0, Oe &= 67108863, n = Math.imul(J, fe), i = (i = Math.imul(J, he)) + Math.imul(_, fe) | 0, o = Math.imul(_, he); var xe = (l + (n = n + Math.imul(R, pe) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(R, ge) | 0) + Math.imul(I, pe) | 0)) << 13) | 0; l = ((o = o + Math.imul(I, ge) | 0) + (i >>> 13) | 0) + (xe >>> 26) | 0, xe &= 67108863; var Ne = (l + (n = Math.imul(J, pe)) | 0) + ((8191 & (i = (i = Math.imul(J, ge)) + Math.imul(_, pe) | 0)) << 13) | 0; return l = ((o = Math.imul(_, ge)) + (i >>> 13) | 0) + (Ne >>> 26) | 0, Ne &= 67108863, c[0] = me, c[1] = be, c[2] = ye, c[3] = ve, c[4] = Ae, c[5] = Se, c[6] = we, c[7] = Ee, c[8] = Te, c[9] = ke, c[10] = Be, c[11] = Pe, c[12] = Me, c[13] = Ce, c[14] = Le, c[15] = Fe, c[16] = Oe, c[17] = xe, c[18] = Ne, 0 !== l && (c[19] = l, r.length++), r; };
        function g(e, t, r) { return (new m).mulp(e, t, r); }
        function m(e, t) { this.x = e, this.y = t; }
        Math.imul || (p = d), o.prototype.mulTo = function (e, t) { var r, n = this.length + e.length; return r = 10 === this.length && 10 === e.length ? p(this, e, t) : n < 63 ? d(this, e, t) : n < 1024 ? function (e, t, r) { r.negative = t.negative ^ e.negative, r.length = e.length + t.length; for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
            var a = i;
            i = 0;
            for (var s = 67108863 & n, c = Math.min(o, t.length - 1), l = Math.max(0, o - e.length + 1); l <= c; l++) {
                var u = o - l, f = (0 | e.words[u]) * (0 | t.words[l]), h = 67108863 & f;
                s = 67108863 & (h = h + s | 0), i += (a = (a = a + (f / 67108864 | 0) | 0) + (h >>> 26) | 0) >>> 26, a &= 67108863;
            }
            r.words[o] = s, n = a, a = i;
        } return 0 !== n ? r.words[o] = n : r.length--, r.strip(); }(this, e, t) : g(this, e, t), r; }, m.prototype.makeRBT = function (e) { for (var t = new Array(e), r = o.prototype._countBits(e) - 1, n = 0; n < e; n++)
            t[n] = this.revBin(n, r, e); return t; }, m.prototype.revBin = function (e, t, r) { if (0 === e || e === r - 1)
            return e; for (var n = 0, i = 0; i < t; i++)
            n |= (1 & e) << t - i - 1, e >>= 1; return n; }, m.prototype.permute = function (e, t, r, n, i, o) { for (var a = 0; a < o; a++)
            n[a] = t[e[a]], i[a] = r[e[a]]; }, m.prototype.transform = function (e, t, r, n, i, o) { this.permute(o, e, t, r, n, i); for (var a = 1; a < i; a <<= 1)
            for (var s = a << 1, c = Math.cos(2 * Math.PI / s), l = Math.sin(2 * Math.PI / s), u = 0; u < i; u += s)
                for (var f = c, h = l, d = 0; d < a; d++) {
                    var p = r[u + d], g = n[u + d], m = r[u + d + a], b = n[u + d + a], y = f * m - h * b;
                    b = f * b + h * m, m = y, r[u + d] = p + m, n[u + d] = g + b, r[u + d + a] = p - m, n[u + d + a] = g - b, d !== s && (y = c * f - l * h, h = c * h + l * f, f = y);
                } }, m.prototype.guessLen13b = function (e, t) { var r = 1 | Math.max(t, e), n = 1 & r, i = 0; for (r = r / 2 | 0; r; r >>>= 1)
            i++; return 1 << i + 1 + n; }, m.prototype.conjugate = function (e, t, r) { if (!(r <= 1))
            for (var n = 0; n < r / 2; n++) {
                var i = e[n];
                e[n] = e[r - n - 1], e[r - n - 1] = i, i = t[n], t[n] = -t[r - n - 1], t[r - n - 1] = -i;
            } }, m.prototype.normalize13b = function (e, t) { for (var r = 0, n = 0; n < t / 2; n++) {
            var i = 8192 * Math.round(e[2 * n + 1] / t) + Math.round(e[2 * n] / t) + r;
            e[n] = 67108863 & i, r = i < 67108864 ? 0 : i / 67108864 | 0;
        } return e; }, m.prototype.convert13b = function (e, t, r, i) { for (var o = 0, a = 0; a < t; a++)
            o += 0 | e[a], r[2 * a] = 8191 & o, o >>>= 13, r[2 * a + 1] = 8191 & o, o >>>= 13; for (a = 2 * t; a < i; ++a)
            r[a] = 0; n(0 === o), n(0 == (-8192 & o)); }, m.prototype.stub = function (e) { for (var t = new Array(e), r = 0; r < e; r++)
            t[r] = 0; return t; }, m.prototype.mulp = function (e, t, r) { var n = 2 * this.guessLen13b(e.length, t.length), i = this.makeRBT(n), o = this.stub(n), a = new Array(n), s = new Array(n), c = new Array(n), l = new Array(n), u = new Array(n), f = new Array(n), h = r.words; h.length = n, this.convert13b(e.words, e.length, a, n), this.convert13b(t.words, t.length, l, n), this.transform(a, o, s, c, n, i), this.transform(l, o, u, f, n, i); for (var d = 0; d < n; d++) {
            var p = s[d] * u[d] - c[d] * f[d];
            c[d] = s[d] * f[d] + c[d] * u[d], s[d] = p;
        } return this.conjugate(s, c, n), this.transform(s, c, h, o, n, i), this.conjugate(h, o, n), this.normalize13b(h, n), r.negative = e.negative ^ t.negative, r.length = e.length + t.length, r.strip(); }, o.prototype.mul = function (e) { var t = new o(null); return t.words = new Array(this.length + e.length), this.mulTo(e, t); }, o.prototype.mulf = function (e) { var t = new o(null); return t.words = new Array(this.length + e.length), g(this, e, t); }, o.prototype.imul = function (e) { return this.clone().mulTo(e, this); }, o.prototype.imuln = function (e) { n("number" == typeof e), n(e < 67108864); for (var t = 0, r = 0; r < this.length; r++) {
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
            var a = 0;
            for (t = 0; t < this.length; t++) {
                var s = this.words[t] & o, c = (0 | this.words[t]) - s << r;
                this.words[t] = c | a, a = s >>> 26 - r;
            }
            a && (this.words[t] = a, this.length++);
        } if (0 !== i) {
            for (t = this.length - 1; t >= 0; t--)
                this.words[t + i] = this.words[t];
            for (t = 0; t < i; t++)
                this.words[t] = 0;
            this.length += i;
        } return this.strip(); }, o.prototype.ishln = function (e) { return n(0 === this.negative), this.iushln(e); }, o.prototype.iushrn = function (e, t, r) { var i; n("number" == typeof e && e >= 0), i = t ? (t - t % 26) / 26 : 0; var o = e % 26, a = Math.min((e - o) / 26, this.length), s = 67108863 ^ 67108863 >>> o << o, c = r; if (i -= a, i = Math.max(0, i), c) {
            for (var l = 0; l < a; l++)
                c.words[l] = this.words[l];
            c.length = a;
        } if (0 === a)
            ;
        else if (this.length > a)
            for (this.length -= a, l = 0; l < this.length; l++)
                this.words[l] = this.words[l + a];
        else
            this.words[0] = 0, this.length = 1; var u = 0; for (l = this.length - 1; l >= 0 && (0 !== u || l >= i); l--) {
            var f = 0 | this.words[l];
            this.words[l] = u << 26 - o | f >>> o, u = f & s;
        } return c && 0 !== u && (c.words[c.length++] = u), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip(); }, o.prototype.ishrn = function (e, t, r) { return n(0 === this.negative), this.iushrn(e, t, r); }, o.prototype.shln = function (e) { return this.clone().ishln(e); }, o.prototype.ushln = function (e) { return this.clone().iushln(e); }, o.prototype.shrn = function (e) { return this.clone().ishrn(e); }, o.prototype.ushrn = function (e) { return this.clone().iushrn(e); }, o.prototype.testn = function (e) { n("number" == typeof e && e >= 0); var t = e % 26, r = (e - t) / 26, i = 1 << t; return !(this.length <= r || !(this.words[r] & i)); }, o.prototype.imaskn = function (e) { n("number" == typeof e && e >= 0); var t = e % 26, r = (e - t) / 26; if (n(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r)
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
                this.words[t] += 67108864, this.words[t + 1] -= 1; return this.strip(); }, o.prototype.addn = function (e) { return this.clone().iaddn(e); }, o.prototype.subn = function (e) { return this.clone().isubn(e); }, o.prototype.iabs = function () { return this.negative = 0, this; }, o.prototype.abs = function () { return this.clone().iabs(); }, o.prototype._ishlnsubmul = function (e, t, r) { var i, o, a = e.length + r; this._expand(a); var s = 0; for (i = 0; i < e.length; i++) {
            o = (0 | this.words[i + r]) + s;
            var c = (0 | e.words[i]) * t;
            s = ((o -= 67108863 & c) >> 26) - (c / 67108864 | 0), this.words[i + r] = 67108863 & o;
        } for (; i < this.length - r; i++)
            s = (o = (0 | this.words[i + r]) + s) >> 26, this.words[i + r] = 67108863 & o; if (0 === s)
            return this.strip(); for (n(-1 === s), s = 0, i = 0; i < this.length; i++)
            s = (o = -(0 | this.words[i]) + s) >> 26, this.words[i] = 67108863 & o; return this.negative = 1, this.strip(); }, o.prototype._wordDiv = function (e, t) { var r = (this.length, e.length), n = this.clone(), i = e, a = 0 | i.words[i.length - 1]; 0 != (r = 26 - this._countBits(a)) && (i = i.ushln(r), n.iushln(r), a = 0 | i.words[i.length - 1]); var s, c = n.length - i.length; if ("mod" !== t) {
            (s = new o(null)).length = c + 1, s.words = new Array(s.length);
            for (var l = 0; l < s.length; l++)
                s.words[l] = 0;
        } var u = n.clone()._ishlnsubmul(i, 1, c); 0 === u.negative && (n = u, s && (s.words[c] = 1)); for (var f = c - 1; f >= 0; f--) {
            var h = 67108864 * (0 | n.words[i.length + f]) + (0 | n.words[i.length + f - 1]);
            for (h = Math.min(h / a | 0, 67108863), n._ishlnsubmul(i, h, f); 0 !== n.negative;)
                h--, n.negative = 0, n._ishlnsubmul(i, 1, f), n.isZero() || (n.negative ^= 1);
            s && (s.words[f] = h);
        } return s && s.strip(), n.strip(), "div" !== t && 0 !== r && n.iushrn(r), { div: s || null, mod: n }; }, o.prototype.divmod = function (e, t, r) { return n(!e.isZero()), this.isZero() ? { div: new o(0), mod: new o(0) } : 0 !== this.negative && 0 === e.negative ? (s = this.neg().divmod(e, t), "mod" !== t && (i = s.div.neg()), "div" !== t && (a = s.mod.neg(), r && 0 !== a.negative && a.iadd(e)), { div: i, mod: a }) : 0 === this.negative && 0 !== e.negative ? (s = this.divmod(e.neg(), t), "mod" !== t && (i = s.div.neg()), { div: i, mod: s.mod }) : 0 != (this.negative & e.negative) ? (s = this.neg().divmod(e.neg(), t), "div" !== t && (a = s.mod.neg(), r && 0 !== a.negative && a.isub(e)), { div: s.div, mod: a }) : e.length > this.length || this.cmp(e) < 0 ? { div: new o(0), mod: this } : 1 === e.length ? "div" === t ? { div: this.divn(e.words[0]), mod: null } : "mod" === t ? { div: null, mod: new o(this.modn(e.words[0])) } : { div: this.divn(e.words[0]), mod: new o(this.modn(e.words[0])) } : this._wordDiv(e, t); var i, a, s; }, o.prototype.div = function (e) { return this.divmod(e, "div", !1).div; }, o.prototype.mod = function (e) { return this.divmod(e, "mod", !1).mod; }, o.prototype.umod = function (e) { return this.divmod(e, "mod", !0).mod; }, o.prototype.divRound = function (e) { var t = this.divmod(e); if (t.mod.isZero())
            return t.div; var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod, n = e.ushrn(1), i = e.andln(1), o = r.cmp(n); return o < 0 || 1 === i && 0 === o ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1); }, o.prototype.modn = function (e) { n(e <= 67108863); for (var t = (1 << 26) % e, r = 0, i = this.length - 1; i >= 0; i--)
            r = (t * r + (0 | this.words[i])) % e; return r; }, o.prototype.idivn = function (e) { n(e <= 67108863); for (var t = 0, r = this.length - 1; r >= 0; r--) {
            var i = (0 | this.words[r]) + 67108864 * t;
            this.words[r] = i / e | 0, t = i % e;
        } return this.strip(); }, o.prototype.divn = function (e) { return this.clone().idivn(e); }, o.prototype.egcd = function (e) { n(0 === e.negative), n(!e.isZero()); var t = this, r = e.clone(); t = 0 !== t.negative ? t.umod(e) : t.clone(); for (var i = new o(1), a = new o(0), s = new o(0), c = new o(1), l = 0; t.isEven() && r.isEven();)
            t.iushrn(1), r.iushrn(1), ++l; for (var u = r.clone(), f = t.clone(); !t.isZero();) {
            for (var h = 0, d = 1; 0 == (t.words[0] & d) && h < 26; ++h, d <<= 1)
                ;
            if (h > 0)
                for (t.iushrn(h); h-- > 0;)
                    (i.isOdd() || a.isOdd()) && (i.iadd(u), a.isub(f)), i.iushrn(1), a.iushrn(1);
            for (var p = 0, g = 1; 0 == (r.words[0] & g) && p < 26; ++p, g <<= 1)
                ;
            if (p > 0)
                for (r.iushrn(p); p-- > 0;)
                    (s.isOdd() || c.isOdd()) && (s.iadd(u), c.isub(f)), s.iushrn(1), c.iushrn(1);
            t.cmp(r) >= 0 ? (t.isub(r), i.isub(s), a.isub(c)) : (r.isub(t), s.isub(i), c.isub(a));
        } return { a: s, b: c, gcd: r.iushln(l) }; }, o.prototype._invmp = function (e) { n(0 === e.negative), n(!e.isZero()); var t = this, r = e.clone(); t = 0 !== t.negative ? t.umod(e) : t.clone(); for (var i, a = new o(1), s = new o(0), c = r.clone(); t.cmpn(1) > 0 && r.cmpn(1) > 0;) {
            for (var l = 0, u = 1; 0 == (t.words[0] & u) && l < 26; ++l, u <<= 1)
                ;
            if (l > 0)
                for (t.iushrn(l); l-- > 0;)
                    a.isOdd() && a.iadd(c), a.iushrn(1);
            for (var f = 0, h = 1; 0 == (r.words[0] & h) && f < 26; ++f, h <<= 1)
                ;
            if (f > 0)
                for (r.iushrn(f); f-- > 0;)
                    s.isOdd() && s.iadd(c), s.iushrn(1);
            t.cmp(r) >= 0 ? (t.isub(r), a.isub(s)) : (r.isub(t), s.isub(a));
        } return (i = 0 === t.cmpn(1) ? a : s).cmpn(0) < 0 && i.iadd(e), i; }, o.prototype.gcd = function (e) { if (this.isZero())
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
            return this._expand(r + 1), this.words[r] |= i, this; for (var o = i, a = r; 0 !== o && a < this.length; a++) {
            var s = 0 | this.words[a];
            o = (s += o) >>> 26, s &= 67108863, this.words[a] = s;
        } return 0 !== o && (this.words[a] = o, this.length++), this; }, o.prototype.isZero = function () { return 1 === this.length && 0 === this.words[0]; }, o.prototype.cmpn = function (e) { var t, r = e < 0; if (0 !== this.negative && !r)
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
        var b = { k256: null, p224: null, p192: null, p25519: null };
        function y(e, t) { this.name = e, this.p = new o(t, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp(); }
        function v() { y.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"); }
        function A() { y.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"); }
        function S() { y.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"); }
        function w() { y.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"); }
        function E(e) { if ("string" == typeof e) {
            var t = o._prime(e);
            this.m = t.p, this.prime = t;
        }
        else
            n(e.gtn(1), "modulus must be greater than 1"), this.m = e, this.prime = null; }
        function T(e) { E.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv); }
        y.prototype._tmp = function () { var e = new o(null); return e.words = new Array(Math.ceil(this.n / 13)), e; }, y.prototype.ireduce = function (e) { var t, r = e; do {
            this.split(r, this.tmp), t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength();
        } while (t > this.n); var n = t < this.n ? -1 : r.ucmp(this.p); return 0 === n ? (r.words[0] = 0, r.length = 1) : n > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip(), r; }, y.prototype.split = function (e, t) { e.iushrn(this.n, 0, t); }, y.prototype.imulK = function (e) { return e.imul(this.k); }, i(v, y), v.prototype.split = function (e, t) { for (var r = 4194303, n = Math.min(e.length, 9), i = 0; i < n; i++)
            t.words[i] = e.words[i]; if (t.length = n, e.length <= 9)
            return e.words[0] = 0, void (e.length = 1); var o = e.words[9]; for (t.words[t.length++] = o & r, i = 10; i < e.length; i++) {
            var a = 0 | e.words[i];
            e.words[i - 10] = (a & r) << 4 | o >>> 22, o = a;
        } o >>>= 22, e.words[i - 10] = o, 0 === o && e.length > 10 ? e.length -= 10 : e.length -= 9; }, v.prototype.imulK = function (e) { e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2; for (var t = 0, r = 0; r < e.length; r++) {
            var n = 0 | e.words[r];
            t += 977 * n, e.words[r] = 67108863 & t, t = 64 * n + (t / 67108864 | 0);
        } return 0 === e.words[e.length - 1] && (e.length--, 0 === e.words[e.length - 1] && e.length--), e; }, i(A, y), i(S, y), i(w, y), w.prototype.imulK = function (e) { for (var t = 0, r = 0; r < e.length; r++) {
            var n = 19 * (0 | e.words[r]) + t, i = 67108863 & n;
            n >>>= 26, e.words[r] = i, t = n;
        } return 0 !== t && (e.words[e.length++] = t), e; }, o._prime = function (e) { if (b[e])
            return b[e]; var t; if ("k256" === e)
            t = new v;
        else if ("p224" === e)
            t = new A;
        else if ("p192" === e)
            t = new S;
        else {
            if ("p25519" !== e)
                throw new Error("Unknown prime " + e);
            t = new w;
        } return b[e] = t, t; }, E.prototype._verify1 = function (e) { n(0 === e.negative, "red works only with positives"), n(e.red, "red works only with red numbers"); }, E.prototype._verify2 = function (e, t) { n(0 == (e.negative | t.negative), "red works only with positives"), n(e.red && e.red === t.red, "red works only with red numbers"); }, E.prototype.imod = function (e) { return this.prime ? this.prime.ireduce(e)._forceRed(this) : e.umod(this.m)._forceRed(this); }, E.prototype.neg = function (e) { return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this); }, E.prototype.add = function (e, t) { this._verify2(e, t); var r = e.add(t); return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this); }, E.prototype.iadd = function (e, t) { this._verify2(e, t); var r = e.iadd(t); return r.cmp(this.m) >= 0 && r.isub(this.m), r; }, E.prototype.sub = function (e, t) { this._verify2(e, t); var r = e.sub(t); return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this); }, E.prototype.isub = function (e, t) { this._verify2(e, t); var r = e.isub(t); return r.cmpn(0) < 0 && r.iadd(this.m), r; }, E.prototype.shl = function (e, t) { return this._verify1(e), this.imod(e.ushln(t)); }, E.prototype.imul = function (e, t) { return this._verify2(e, t), this.imod(e.imul(t)); }, E.prototype.mul = function (e, t) { return this._verify2(e, t), this.imod(e.mul(t)); }, E.prototype.isqr = function (e) { return this.imul(e, e.clone()); }, E.prototype.sqr = function (e) { return this.mul(e, e); }, E.prototype.sqrt = function (e) { if (e.isZero())
            return e.clone(); var t = this.m.andln(3); if (n(t % 2 == 1), 3 === t) {
            var r = this.m.add(new o(1)).iushrn(2);
            return this.pow(e, r);
        } for (var i = this.m.subn(1), a = 0; !i.isZero() && 0 === i.andln(1);)
            a++, i.iushrn(1); n(!i.isZero()); var s = new o(1).toRed(this), c = s.redNeg(), l = this.m.subn(1).iushrn(1), u = this.m.bitLength(); for (u = new o(2 * u * u).toRed(this); 0 !== this.pow(u, l).cmp(c);)
            u.redIAdd(c); for (var f = this.pow(u, i), h = this.pow(e, i.addn(1).iushrn(1)), d = this.pow(e, i), p = a; 0 !== d.cmp(s);) {
            for (var g = d, m = 0; 0 !== g.cmp(s); m++)
                g = g.redSqr();
            n(m < p);
            var b = this.pow(f, new o(1).iushln(p - m - 1));
            h = h.redMul(b), f = b.redSqr(), d = d.redMul(f), p = m;
        } return h; }, E.prototype.invm = function (e) { var t = e._invmp(this.m); return 0 !== t.negative ? (t.negative = 0, this.imod(t).redNeg()) : this.imod(t); }, E.prototype.pow = function (e, t) { if (t.isZero())
            return new o(1).toRed(this); if (0 === t.cmpn(1))
            return e.clone(); var r = new Array(16); r[0] = new o(1).toRed(this), r[1] = e; for (var n = 2; n < r.length; n++)
            r[n] = this.mul(r[n - 1], e); var i = r[0], a = 0, s = 0, c = t.bitLength() % 26; for (0 === c && (c = 26), n = t.length - 1; n >= 0; n--) {
            for (var l = t.words[n], u = c - 1; u >= 0; u--) {
                var f = l >> u & 1;
                i !== r[0] && (i = this.sqr(i)), 0 !== f || 0 !== a ? (a <<= 1, a |= f, (4 == ++s || 0 === n && 0 === u) && (i = this.mul(i, r[a]), s = 0, a = 0)) : s = 0;
            }
            c = 26;
        } return i; }, E.prototype.convertTo = function (e) { var t = e.umod(this.m); return t === e ? t.clone() : t; }, E.prototype.convertFrom = function (e) { var t = e.clone(); return t.red = null, t; }, o.mont = function (e) { return new T(e); }, i(T, E), T.prototype.convertTo = function (e) { return this.imod(e.ushln(this.shift)); }, T.prototype.convertFrom = function (e) { var t = this.imod(e.mul(this.rinv)); return t.red = null, t; }, T.prototype.imul = function (e, t) { if (e.isZero() || t.isZero())
            return e.words[0] = 0, e.length = 1, e; var r = e.imul(t), n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), i = r.isub(n).iushrn(this.shift), o = i; return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this); }, T.prototype.mul = function (e, t) { if (e.isZero() || t.isZero())
            return new o(0)._forceRed(this); var r = e.mul(t), n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), i = r.isub(n).iushrn(this.shift), a = i; return i.cmp(this.m) >= 0 ? a = i.isub(this.m) : i.cmpn(0) < 0 && (a = i.iadd(this.m)), a._forceRed(this); }, T.prototype.invm = function (e) { return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this); };
    }(e = r.nmd(e), this); }, 9931: (e, t, r) => { var n; function i(e) { this.rand = e; } if (e.exports = function (e) { return n || (n = new i(null)), n.generate(e); }, e.exports.Rand = i, i.prototype.generate = function (e) { return this._rand(e); }, i.prototype._rand = function (e) { if (this.rand.getBytes)
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
        catch (e) { } }, 1924: (e, t, r) => {
        "use strict";
        var n = r(210), i = r(5559), o = i(n("String.prototype.indexOf"));
        e.exports = function (e, t) { var r = n(e, !!t); return "function" == typeof r && o(e, ".prototype.") > -1 ? i(r) : r; };
    }, 5559: (e, t, r) => {
        "use strict";
        var n = r(8612), i = r(210), o = i("%Function.prototype.apply%"), a = i("%Function.prototype.call%"), s = i("%Reflect.apply%", !0) || n.call(a, o), c = i("%Object.getOwnPropertyDescriptor%", !0), l = i("%Object.defineProperty%", !0), u = i("%Math.max%");
        if (l)
            try {
                l({}, "a", { value: 1 });
            }
            catch (e) {
                l = null;
            }
        e.exports = function (e) { var t = s(n, a, arguments); if (c && l) {
            var r = c(t, "length");
            r.configurable && l(t, "length", { value: 1 + u(0, e.length - (arguments.length - 1)) });
        } return t; };
        var f = function () { return s(n, o, arguments); };
        l ? l(e.exports, "apply", { value: f }) : e.exports.apply = f;
    }, 4289: (e, t, r) => {
        "use strict";
        var n = r(2215), i = "function" == typeof Symbol && "symbol" == typeof Symbol("foo"), o = Object.prototype.toString, a = Array.prototype.concat, s = Object.defineProperty, c = s && function () { var e = {}; try {
            for (var t in s(e, "x", { enumerable: !1, value: e }), e)
                return !1;
            return e.x === e;
        }
        catch (e) {
            return !1;
        } }(), l = function (e, t, r, n) { var i; (!(t in e) || "function" == typeof (i = n) && "[object Function]" === o.call(i) && n()) && (c ? s(e, t, { configurable: !0, enumerable: !1, value: r, writable: !0 }) : e[t] = r); }, u = function (e, t) { var r = arguments.length > 2 ? arguments[2] : {}, o = n(t); i && (o = a.call(o, Object.getOwnPropertySymbols(t))); for (var s = 0; s < o.length; s += 1)
            l(e, o[s], t[o[s]], r[o[s]]); };
        u.supportsDescriptors = !!c, e.exports = u;
    }, 6266: (e, t, r) => {
        "use strict";
        var n = t;
        n.version = r(8597).i8, n.utils = r(2987), n.rand = r(9931), n.curve = r(8254), n.curves = r(5427), n.ec = r(7954), n.eddsa = r(5980);
    }, 4918: (e, t, r) => {
        "use strict";
        var n = r(3550), i = r(2987), o = i.getNAF, a = i.getJSF, s = i.assert;
        function c(e, t) { this.type = e, this.p = new n(t.p, 16), this.red = t.prime ? n.red(t.prime) : n.mont(this.p), this.zero = new n(0).toRed(this.red), this.one = new n(1).toRed(this.red), this.two = new n(2).toRed(this.red), this.n = t.n && new n(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0; var r = this.n && this.p.div(this.n); !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red)); }
        function l(e, t) { this.curve = e, this.type = t, this.precomputed = null; }
        e.exports = c, c.prototype.point = function () { throw new Error("Not implemented"); }, c.prototype.validate = function () { throw new Error("Not implemented"); }, c.prototype._fixedNafMul = function (e, t) { s(e.precomputed); var r = e._getDoubles(), n = o(t, 1, this._bitLength), i = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1); i /= 3; var a, c, l = []; for (a = 0; a < n.length; a += r.step) {
            c = 0;
            for (var u = a + r.step - 1; u >= a; u--)
                c = (c << 1) + n[u];
            l.push(c);
        } for (var f = this.jpoint(null, null, null), h = this.jpoint(null, null, null), d = i; d > 0; d--) {
            for (a = 0; a < l.length; a++)
                (c = l[a]) === d ? h = h.mixedAdd(r.points[a]) : c === -d && (h = h.mixedAdd(r.points[a].neg()));
            f = f.add(h);
        } return f.toP(); }, c.prototype._wnafMul = function (e, t) { var r = 4, n = e._getNAFPoints(r); r = n.wnd; for (var i = n.points, a = o(t, r, this._bitLength), c = this.jpoint(null, null, null), l = a.length - 1; l >= 0; l--) {
            for (var u = 0; l >= 0 && 0 === a[l]; l--)
                u++;
            if (l >= 0 && u++, c = c.dblp(u), l < 0)
                break;
            var f = a[l];
            s(0 !== f), c = "affine" === e.type ? f > 0 ? c.mixedAdd(i[f - 1 >> 1]) : c.mixedAdd(i[-f - 1 >> 1].neg()) : f > 0 ? c.add(i[f - 1 >> 1]) : c.add(i[-f - 1 >> 1].neg());
        } return "affine" === e.type ? c.toP() : c; }, c.prototype._wnafMulAdd = function (e, t, r, n, i) { var s, c, l, u = this._wnafT1, f = this._wnafT2, h = this._wnafT3, d = 0; for (s = 0; s < n; s++) {
            var p = (l = t[s])._getNAFPoints(e);
            u[s] = p.wnd, f[s] = p.points;
        } for (s = n - 1; s >= 1; s -= 2) {
            var g = s - 1, m = s;
            if (1 === u[g] && 1 === u[m]) {
                var b = [t[g], null, null, t[m]];
                0 === t[g].y.cmp(t[m].y) ? (b[1] = t[g].add(t[m]), b[2] = t[g].toJ().mixedAdd(t[m].neg())) : 0 === t[g].y.cmp(t[m].y.redNeg()) ? (b[1] = t[g].toJ().mixedAdd(t[m]), b[2] = t[g].add(t[m].neg())) : (b[1] = t[g].toJ().mixedAdd(t[m]), b[2] = t[g].toJ().mixedAdd(t[m].neg()));
                var y = [-3, -1, -5, -7, 0, 7, 5, 1, 3], v = a(r[g], r[m]);
                for (d = Math.max(v[0].length, d), h[g] = new Array(d), h[m] = new Array(d), c = 0; c < d; c++) {
                    var A = 0 | v[0][c], S = 0 | v[1][c];
                    h[g][c] = y[3 * (A + 1) + (S + 1)], h[m][c] = 0, f[g] = b;
                }
            }
            else
                h[g] = o(r[g], u[g], this._bitLength), h[m] = o(r[m], u[m], this._bitLength), d = Math.max(h[g].length, d), d = Math.max(h[m].length, d);
        } var w = this.jpoint(null, null, null), E = this._wnafT4; for (s = d; s >= 0; s--) {
            for (var T = 0; s >= 0;) {
                var k = !0;
                for (c = 0; c < n; c++)
                    E[c] = 0 | h[c][s], 0 !== E[c] && (k = !1);
                if (!k)
                    break;
                T++, s--;
            }
            if (s >= 0 && T++, w = w.dblp(T), s < 0)
                break;
            for (c = 0; c < n; c++) {
                var B = E[c];
                0 !== B && (B > 0 ? l = f[c][B - 1 >> 1] : B < 0 && (l = f[c][-B - 1 >> 1].neg()), w = "affine" === l.type ? w.mixedAdd(l) : w.add(l));
            }
        } for (s = 0; s < n; s++)
            f[s] = null; return i ? w : w.toP(); }, c.BasePoint = l, l.prototype.eq = function () { throw new Error("Not implemented"); }, l.prototype.validate = function () { return this.curve.validate(this); }, c.prototype.decodePoint = function (e, t) { e = i.toArray(e, t); var r = this.p.byteLength(); if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * r)
            return 6 === e[0] ? s(e[e.length - 1] % 2 == 0) : 7 === e[0] && s(e[e.length - 1] % 2 == 1), this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r)); if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r)
            return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]); throw new Error("Unknown point format"); }, l.prototype.encodeCompressed = function (e) { return this.encode(e, !0); }, l.prototype._encode = function (e) { var t = this.curve.p.byteLength(), r = this.getX().toArray("be", t); return e ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", t)); }, l.prototype.encode = function (e, t) { return i.encode(this._encode(t), e); }, l.prototype.precompute = function (e) { if (this.precomputed)
            return this; var t = { doubles: null, naf: null, beta: null }; return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this; }, l.prototype._hasDoubles = function (e) { if (!this.precomputed)
            return !1; var t = this.precomputed.doubles; return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step); }, l.prototype._getDoubles = function (e, t) { if (this.precomputed && this.precomputed.doubles)
            return this.precomputed.doubles; for (var r = [this], n = this, i = 0; i < t; i += e) {
            for (var o = 0; o < e; o++)
                n = n.dbl();
            r.push(n);
        } return { step: e, points: r }; }, l.prototype._getNAFPoints = function (e) { if (this.precomputed && this.precomputed.naf)
            return this.precomputed.naf; for (var t = [this], r = (1 << e) - 1, n = 1 === r ? null : this.dbl(), i = 1; i < r; i++)
            t[i] = t[i - 1].add(n); return { wnd: e, points: t }; }, l.prototype._getBeta = function () { return null; }, l.prototype.dblp = function (e) { for (var t = this, r = 0; r < e; r++)
            t = t.dbl(); return t; };
    }, 1138: (e, t, r) => {
        "use strict";
        var n = r(2987), i = r(3550), o = r(5717), a = r(4918), s = n.assert;
        function c(e) { this.twisted = 1 != (0 | e.a), this.mOneA = this.twisted && -1 == (0 | e.a), this.extended = this.mOneA, a.call(this, "edwards", e), this.a = new i(e.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new i(e.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new i(e.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), s(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | e.c); }
        function l(e, t, r, n, o) { a.BasePoint.call(this, e, "projective"), null === t && null === r && null === n ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new i(t, 16), this.y = new i(r, 16), this.z = n ? new i(n, 16) : this.curve.one, this.t = o && new i(o, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm())))); }
        o(c, a), e.exports = c, c.prototype._mulA = function (e) { return this.mOneA ? e.redNeg() : this.a.redMul(e); }, c.prototype._mulC = function (e) { return this.oneC ? e : this.c.redMul(e); }, c.prototype.jpoint = function (e, t, r, n) { return this.point(e, t, r, n); }, c.prototype.pointFromX = function (e, t) { (e = new i(e, 16)).red || (e = e.toRed(this.red)); var r = e.redSqr(), n = this.c2.redSub(this.a.redMul(r)), o = this.one.redSub(this.c2.redMul(this.d).redMul(r)), a = n.redMul(o.redInvm()), s = a.redSqrt(); if (0 !== s.redSqr().redSub(a).cmp(this.zero))
            throw new Error("invalid point"); var c = s.fromRed().isOdd(); return (t && !c || !t && c) && (s = s.redNeg()), this.point(e, s); }, c.prototype.pointFromY = function (e, t) { (e = new i(e, 16)).red || (e = e.toRed(this.red)); var r = e.redSqr(), n = r.redSub(this.c2), o = r.redMul(this.d).redMul(this.c2).redSub(this.a), a = n.redMul(o.redInvm()); if (0 === a.cmp(this.zero)) {
            if (t)
                throw new Error("invalid point");
            return this.point(this.zero, e);
        } var s = a.redSqrt(); if (0 !== s.redSqr().redSub(a).cmp(this.zero))
            throw new Error("invalid point"); return s.fromRed().isOdd() !== t && (s = s.redNeg()), this.point(s, e); }, c.prototype.validate = function (e) { if (e.isInfinity())
            return !0; e.normalize(); var t = e.x.redSqr(), r = e.y.redSqr(), n = t.redMul(this.a).redAdd(r), i = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(r))); return 0 === n.cmp(i); }, o(l, a.BasePoint), c.prototype.pointFromJSON = function (e) { return l.fromJSON(this, e); }, c.prototype.point = function (e, t, r, n) { return new l(this, e, t, r, n); }, l.fromJSON = function (e, t) { return new l(e, t[0], t[1], t[2]); }, l.prototype.inspect = function () { return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"; }, l.prototype.isInfinity = function () { return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve.c)); }, l.prototype._extDbl = function () { var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(); r = r.redIAdd(r); var n = this.curve._mulA(e), i = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t), o = n.redAdd(t), a = o.redSub(r), s = n.redSub(t), c = i.redMul(a), l = o.redMul(s), u = i.redMul(s), f = a.redMul(o); return this.curve.point(c, l, f, u); }, l.prototype._projDbl = function () { var e, t, r, n, i, o, a = this.x.redAdd(this.y).redSqr(), s = this.x.redSqr(), c = this.y.redSqr(); if (this.curve.twisted) {
            var l = (n = this.curve._mulA(s)).redAdd(c);
            this.zOne ? (e = a.redSub(s).redSub(c).redMul(l.redSub(this.curve.two)), t = l.redMul(n.redSub(c)), r = l.redSqr().redSub(l).redSub(l)) : (i = this.z.redSqr(), o = l.redSub(i).redISub(i), e = a.redSub(s).redISub(c).redMul(o), t = l.redMul(n.redSub(c)), r = l.redMul(o));
        }
        else
            n = s.redAdd(c), i = this.curve._mulC(this.z).redSqr(), o = n.redSub(i).redSub(i), e = this.curve._mulC(a.redISub(n)).redMul(o), t = this.curve._mulC(n).redMul(s.redISub(c)), r = n.redMul(o); return this.curve.point(e, t, r); }, l.prototype.dbl = function () { return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl(); }, l.prototype._extAdd = function (e) { var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)), r = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)), n = this.t.redMul(this.curve.dd).redMul(e.t), i = this.z.redMul(e.z.redAdd(e.z)), o = r.redSub(t), a = i.redSub(n), s = i.redAdd(n), c = r.redAdd(t), l = o.redMul(a), u = s.redMul(c), f = o.redMul(c), h = a.redMul(s); return this.curve.point(l, u, h, f); }, l.prototype._projAdd = function (e) { var t, r, n = this.z.redMul(e.z), i = n.redSqr(), o = this.x.redMul(e.x), a = this.y.redMul(e.y), s = this.curve.d.redMul(o).redMul(a), c = i.redSub(s), l = i.redAdd(s), u = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(o).redISub(a), f = n.redMul(c).redMul(u); return this.curve.twisted ? (t = n.redMul(l).redMul(a.redSub(this.curve._mulA(o))), r = c.redMul(l)) : (t = n.redMul(l).redMul(a.redSub(o)), r = this.curve._mulC(c).redMul(l)), this.curve.point(f, t, r); }, l.prototype.add = function (e) { return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e); }, l.prototype.mul = function (e) { return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e); }, l.prototype.mulAdd = function (e, t, r) { return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !1); }, l.prototype.jmulAdd = function (e, t, r) { return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !0); }, l.prototype.normalize = function () { if (this.zOne)
            return this; var e = this.z.redInvm(); return this.x = this.x.redMul(e), this.y = this.y.redMul(e), this.t && (this.t = this.t.redMul(e)), this.z = this.curve.one, this.zOne = !0, this; }, l.prototype.neg = function () { return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg()); }, l.prototype.getX = function () { return this.normalize(), this.x.fromRed(); }, l.prototype.getY = function () { return this.normalize(), this.y.fromRed(); }, l.prototype.eq = function (e) { return this === e || 0 === this.getX().cmp(e.getX()) && 0 === this.getY().cmp(e.getY()); }, l.prototype.eqXToP = function (e) { var t = e.toRed(this.curve.red).redMul(this.z); if (0 === this.x.cmp(t))
            return !0; for (var r = e.clone(), n = this.curve.redN.redMul(this.z);;) {
            if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)
                return !1;
            if (t.redIAdd(n), 0 === this.x.cmp(t))
                return !0;
        } }, l.prototype.toP = l.prototype.normalize, l.prototype.mixedAdd = l.prototype.add;
    }, 8254: (e, t, r) => {
        "use strict";
        var n = t;
        n.base = r(4918), n.short = r(6673), n.mont = r(2881), n.edwards = r(1138);
    }, 2881: (e, t, r) => {
        "use strict";
        var n = r(3550), i = r(5717), o = r(4918), a = r(2987);
        function s(e) { o.call(this, "mont", e), this.a = new n(e.a, 16).toRed(this.red), this.b = new n(e.b, 16).toRed(this.red), this.i4 = new n(4).toRed(this.red).redInvm(), this.two = new n(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two)); }
        function c(e, t, r) { o.BasePoint.call(this, e, "projective"), null === t && null === r ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new n(t, 16), this.z = new n(r, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red))); }
        i(s, o), e.exports = s, s.prototype.validate = function (e) { var t = e.normalize().x, r = t.redSqr(), n = r.redMul(t).redAdd(r.redMul(this.a)).redAdd(t); return 0 === n.redSqrt().redSqr().cmp(n); }, i(c, o.BasePoint), s.prototype.decodePoint = function (e, t) { return this.point(a.toArray(e, t), 1); }, s.prototype.point = function (e, t) { return new c(this, e, t); }, s.prototype.pointFromJSON = function (e) { return c.fromJSON(this, e); }, c.prototype.precompute = function () { }, c.prototype._encode = function () { return this.getX().toArray("be", this.curve.p.byteLength()); }, c.fromJSON = function (e, t) { return new c(e, t[0], t[1] || e.one); }, c.prototype.inspect = function () { return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"; }, c.prototype.isInfinity = function () { return 0 === this.z.cmpn(0); }, c.prototype.dbl = function () { var e = this.x.redAdd(this.z).redSqr(), t = this.x.redSub(this.z).redSqr(), r = e.redSub(t), n = e.redMul(t), i = r.redMul(t.redAdd(this.curve.a24.redMul(r))); return this.curve.point(n, i); }, c.prototype.add = function () { throw new Error("Not supported on Montgomery curve"); }, c.prototype.diffAdd = function (e, t) { var r = this.x.redAdd(this.z), n = this.x.redSub(this.z), i = e.x.redAdd(e.z), o = e.x.redSub(e.z).redMul(r), a = i.redMul(n), s = t.z.redMul(o.redAdd(a).redSqr()), c = t.x.redMul(o.redISub(a).redSqr()); return this.curve.point(s, c); }, c.prototype.mul = function (e) { for (var t = e.clone(), r = this, n = this.curve.point(null, null), i = []; 0 !== t.cmpn(0); t.iushrn(1))
            i.push(t.andln(1)); for (var o = i.length - 1; o >= 0; o--)
            0 === i[o] ? (r = r.diffAdd(n, this), n = n.dbl()) : (n = r.diffAdd(n, this), r = r.dbl()); return n; }, c.prototype.mulAdd = function () { throw new Error("Not supported on Montgomery curve"); }, c.prototype.jumlAdd = function () { throw new Error("Not supported on Montgomery curve"); }, c.prototype.eq = function (e) { return 0 === this.getX().cmp(e.getX()); }, c.prototype.normalize = function () { return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this; }, c.prototype.getX = function () { return this.normalize(), this.x.fromRed(); };
    }, 6673: (e, t, r) => {
        "use strict";
        var n = r(2987), i = r(3550), o = r(5717), a = r(4918), s = n.assert;
        function c(e) { a.call(this, "short", e), this.a = new i(e.a, 16).toRed(this.red), this.b = new i(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4); }
        function l(e, t, r, n) { a.BasePoint.call(this, e, "affine"), null === t && null === r ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new i(t, 16), this.y = new i(r, 16), n && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1); }
        function u(e, t, r, n) { a.BasePoint.call(this, e, "jacobian"), null === t && null === r && null === n ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new i(0)) : (this.x = new i(t, 16), this.y = new i(r, 16), this.z = new i(n, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one; }
        o(c, a), e.exports = c, c.prototype._getEndomorphism = function (e) { if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
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
                0 === this.g.mul(o[0]).x.cmp(this.g.x.redMul(t)) ? r = o[0] : (r = o[1], s(0 === this.g.mul(r).x.cmp(this.g.x.redMul(t))));
            }
            return { beta: t, lambda: r, basis: e.basis ? e.basis.map((function (e) { return { a: new i(e.a, 16), b: new i(e.b, 16) }; })) : this._getEndoBasis(r) };
        } }, c.prototype._getEndoRoots = function (e) { var t = e === this.p ? this.red : i.mont(e), r = new i(2).toRed(t).redInvm(), n = r.redNeg(), o = new i(3).toRed(t).redNeg().redSqrt().redMul(r); return [n.redAdd(o).fromRed(), n.redSub(o).fromRed()]; }, c.prototype._getEndoBasis = function (e) { for (var t, r, n, o, a, s, c, l, u, f = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), h = e, d = this.n.clone(), p = new i(1), g = new i(0), m = new i(0), b = new i(1), y = 0; 0 !== h.cmpn(0);) {
            var v = d.div(h);
            l = d.sub(v.mul(h)), u = m.sub(v.mul(p));
            var A = b.sub(v.mul(g));
            if (!n && l.cmp(f) < 0)
                t = c.neg(), r = p, n = l.neg(), o = u;
            else if (n && 2 == ++y)
                break;
            c = l, d = h, h = l, m = p, p = u, b = g, g = A;
        } a = l.neg(), s = u; var S = n.sqr().add(o.sqr()); return a.sqr().add(s.sqr()).cmp(S) >= 0 && (a = t, s = r), n.negative && (n = n.neg(), o = o.neg()), a.negative && (a = a.neg(), s = s.neg()), [{ a: n, b: o }, { a, b: s }]; }, c.prototype._endoSplit = function (e) { var t = this.endo.basis, r = t[0], n = t[1], i = n.b.mul(e).divRound(this.n), o = r.b.neg().mul(e).divRound(this.n), a = i.mul(r.a), s = o.mul(n.a), c = i.mul(r.b), l = o.mul(n.b); return { k1: e.sub(a).sub(s), k2: c.add(l).neg() }; }, c.prototype.pointFromX = function (e, t) { (e = new i(e, 16)).red || (e = e.toRed(this.red)); var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), n = r.redSqrt(); if (0 !== n.redSqr().redSub(r).cmp(this.zero))
            throw new Error("invalid point"); var o = n.fromRed().isOdd(); return (t && !o || !t && o) && (n = n.redNeg()), this.point(e, n); }, c.prototype.validate = function (e) { if (e.inf)
            return !0; var t = e.x, r = e.y, n = this.a.redMul(t), i = t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b); return 0 === r.redSqr().redISub(i).cmpn(0); }, c.prototype._endoWnafMulAdd = function (e, t, r) { for (var n = this._endoWnafT1, i = this._endoWnafT2, o = 0; o < e.length; o++) {
            var a = this._endoSplit(t[o]), s = e[o], c = s._getBeta();
            a.k1.negative && (a.k1.ineg(), s = s.neg(!0)), a.k2.negative && (a.k2.ineg(), c = c.neg(!0)), n[2 * o] = s, n[2 * o + 1] = c, i[2 * o] = a.k1, i[2 * o + 1] = a.k2;
        } for (var l = this._wnafMulAdd(1, n, i, 2 * o, r), u = 0; u < 2 * o; u++)
            n[u] = null, i[u] = null; return l; }, o(l, a.BasePoint), c.prototype.point = function (e, t, r) { return new l(this, e, t, r); }, c.prototype.pointFromJSON = function (e, t) { return l.fromJSON(this, e, t); }, l.prototype._getBeta = function () { if (this.curve.endo) {
            var e = this.precomputed;
            if (e && e.beta)
                return e.beta;
            var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
            if (e) {
                var r = this.curve, n = function (e) { return r.point(e.x.redMul(r.endo.beta), e.y); };
                e.beta = t, t.precomputed = { beta: null, naf: e.naf && { wnd: e.naf.wnd, points: e.naf.points.map(n) }, doubles: e.doubles && { step: e.doubles.step, points: e.doubles.points.map(n) } };
            }
            return t;
        } }, l.prototype.toJSON = function () { return this.precomputed ? [this.x, this.y, this.precomputed && { doubles: this.precomputed.doubles && { step: this.precomputed.doubles.step, points: this.precomputed.doubles.points.slice(1) }, naf: this.precomputed.naf && { wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1) } }] : [this.x, this.y]; }, l.fromJSON = function (e, t, r) { "string" == typeof t && (t = JSON.parse(t)); var n = e.point(t[0], t[1], r); if (!t[2])
            return n; function i(t) { return e.point(t[0], t[1], r); } var o = t[2]; return n.precomputed = { beta: null, doubles: o.doubles && { step: o.doubles.step, points: [n].concat(o.doubles.points.map(i)) }, naf: o.naf && { wnd: o.naf.wnd, points: [n].concat(o.naf.points.map(i)) } }, n; }, l.prototype.inspect = function () { return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"; }, l.prototype.isInfinity = function () { return this.inf; }, l.prototype.add = function (e) { if (this.inf)
            return e; if (e.inf)
            return this; if (this.eq(e))
            return this.dbl(); if (this.neg().eq(e))
            return this.curve.point(null, null); if (0 === this.x.cmp(e.x))
            return this.curve.point(null, null); var t = this.y.redSub(e.y); 0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm())); var r = t.redSqr().redISub(this.x).redISub(e.x), n = t.redMul(this.x.redSub(r)).redISub(this.y); return this.curve.point(r, n); }, l.prototype.dbl = function () { if (this.inf)
            return this; var e = this.y.redAdd(this.y); if (0 === e.cmpn(0))
            return this.curve.point(null, null); var t = this.curve.a, r = this.x.redSqr(), n = e.redInvm(), i = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(n), o = i.redSqr().redISub(this.x.redAdd(this.x)), a = i.redMul(this.x.redSub(o)).redISub(this.y); return this.curve.point(o, a); }, l.prototype.getX = function () { return this.x.fromRed(); }, l.prototype.getY = function () { return this.y.fromRed(); }, l.prototype.mul = function (e) { return e = new i(e, 16), this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e); }, l.prototype.mulAdd = function (e, t, r) { var n = [this, t], i = [e, r]; return this.curve.endo ? this.curve._endoWnafMulAdd(n, i) : this.curve._wnafMulAdd(1, n, i, 2); }, l.prototype.jmulAdd = function (e, t, r) { var n = [this, t], i = [e, r]; return this.curve.endo ? this.curve._endoWnafMulAdd(n, i, !0) : this.curve._wnafMulAdd(1, n, i, 2, !0); }, l.prototype.eq = function (e) { return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y)); }, l.prototype.neg = function (e) { if (this.inf)
            return this; var t = this.curve.point(this.x, this.y.redNeg()); if (e && this.precomputed) {
            var r = this.precomputed, n = function (e) { return e.neg(); };
            t.precomputed = { naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(n) }, doubles: r.doubles && { step: r.doubles.step, points: r.doubles.points.map(n) } };
        } return t; }, l.prototype.toJ = function () { return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one); }, o(u, a.BasePoint), c.prototype.jpoint = function (e, t, r) { return new u(this, e, t, r); }, u.prototype.toP = function () { if (this.isInfinity())
            return this.curve.point(null, null); var e = this.z.redInvm(), t = e.redSqr(), r = this.x.redMul(t), n = this.y.redMul(t).redMul(e); return this.curve.point(r, n); }, u.prototype.neg = function () { return this.curve.jpoint(this.x, this.y.redNeg(), this.z); }, u.prototype.add = function (e) { if (this.isInfinity())
            return e; if (e.isInfinity())
            return this; var t = e.z.redSqr(), r = this.z.redSqr(), n = this.x.redMul(t), i = e.x.redMul(r), o = this.y.redMul(t.redMul(e.z)), a = e.y.redMul(r.redMul(this.z)), s = n.redSub(i), c = o.redSub(a); if (0 === s.cmpn(0))
            return 0 !== c.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl(); var l = s.redSqr(), u = l.redMul(s), f = n.redMul(l), h = c.redSqr().redIAdd(u).redISub(f).redISub(f), d = c.redMul(f.redISub(h)).redISub(o.redMul(u)), p = this.z.redMul(e.z).redMul(s); return this.curve.jpoint(h, d, p); }, u.prototype.mixedAdd = function (e) { if (this.isInfinity())
            return e.toJ(); if (e.isInfinity())
            return this; var t = this.z.redSqr(), r = this.x, n = e.x.redMul(t), i = this.y, o = e.y.redMul(t).redMul(this.z), a = r.redSub(n), s = i.redSub(o); if (0 === a.cmpn(0))
            return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl(); var c = a.redSqr(), l = c.redMul(a), u = r.redMul(c), f = s.redSqr().redIAdd(l).redISub(u).redISub(u), h = s.redMul(u.redISub(f)).redISub(i.redMul(l)), d = this.z.redMul(a); return this.curve.jpoint(f, h, d); }, u.prototype.dblp = function (e) { if (0 === e)
            return this; if (this.isInfinity())
            return this; if (!e)
            return this.dbl(); var t; if (this.curve.zeroA || this.curve.threeA) {
            var r = this;
            for (t = 0; t < e; t++)
                r = r.dbl();
            return r;
        } var n = this.curve.a, i = this.curve.tinv, o = this.x, a = this.y, s = this.z, c = s.redSqr().redSqr(), l = a.redAdd(a); for (t = 0; t < e; t++) {
            var u = o.redSqr(), f = l.redSqr(), h = f.redSqr(), d = u.redAdd(u).redIAdd(u).redIAdd(n.redMul(c)), p = o.redMul(f), g = d.redSqr().redISub(p.redAdd(p)), m = p.redISub(g), b = d.redMul(m);
            b = b.redIAdd(b).redISub(h);
            var y = l.redMul(s);
            t + 1 < e && (c = c.redMul(h)), o = g, s = y, l = b;
        } return this.curve.jpoint(o, l.redMul(i), s); }, u.prototype.dbl = function () { return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl(); }, u.prototype._zeroDbl = function () { var e, t, r; if (this.zOne) {
            var n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), a = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
            a = a.redIAdd(a);
            var s = n.redAdd(n).redIAdd(n), c = s.redSqr().redISub(a).redISub(a), l = o.redIAdd(o);
            l = (l = l.redIAdd(l)).redIAdd(l), e = c, t = s.redMul(a.redISub(c)).redISub(l), r = this.y.redAdd(this.y);
        }
        else {
            var u = this.x.redSqr(), f = this.y.redSqr(), h = f.redSqr(), d = this.x.redAdd(f).redSqr().redISub(u).redISub(h);
            d = d.redIAdd(d);
            var p = u.redAdd(u).redIAdd(u), g = p.redSqr(), m = h.redIAdd(h);
            m = (m = m.redIAdd(m)).redIAdd(m), e = g.redISub(d).redISub(d), t = p.redMul(d.redISub(e)).redISub(m), r = (r = this.y.redMul(this.z)).redIAdd(r);
        } return this.curve.jpoint(e, t, r); }, u.prototype._threeDbl = function () { var e, t, r; if (this.zOne) {
            var n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), a = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
            a = a.redIAdd(a);
            var s = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a), c = s.redSqr().redISub(a).redISub(a);
            e = c;
            var l = o.redIAdd(o);
            l = (l = l.redIAdd(l)).redIAdd(l), t = s.redMul(a.redISub(c)).redISub(l), r = this.y.redAdd(this.y);
        }
        else {
            var u = this.z.redSqr(), f = this.y.redSqr(), h = this.x.redMul(f), d = this.x.redSub(u).redMul(this.x.redAdd(u));
            d = d.redAdd(d).redIAdd(d);
            var p = h.redIAdd(h), g = (p = p.redIAdd(p)).redAdd(p);
            e = d.redSqr().redISub(g), r = this.y.redAdd(this.z).redSqr().redISub(f).redISub(u);
            var m = f.redSqr();
            m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m), t = d.redMul(p.redISub(e)).redISub(m);
        } return this.curve.jpoint(e, t, r); }, u.prototype._dbl = function () { var e = this.curve.a, t = this.x, r = this.y, n = this.z, i = n.redSqr().redSqr(), o = t.redSqr(), a = r.redSqr(), s = o.redAdd(o).redIAdd(o).redIAdd(e.redMul(i)), c = t.redAdd(t), l = (c = c.redIAdd(c)).redMul(a), u = s.redSqr().redISub(l.redAdd(l)), f = l.redISub(u), h = a.redSqr(); h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h); var d = s.redMul(f).redISub(h), p = r.redAdd(r).redMul(n); return this.curve.jpoint(u, d, p); }, u.prototype.trpl = function () { if (!this.curve.zeroA)
            return this.dbl().add(this); var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(), n = t.redSqr(), i = e.redAdd(e).redIAdd(e), o = i.redSqr(), a = this.x.redAdd(t).redSqr().redISub(e).redISub(n), s = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(o)).redSqr(), c = n.redIAdd(n); c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c); var l = i.redIAdd(a).redSqr().redISub(o).redISub(s).redISub(c), u = t.redMul(l); u = (u = u.redIAdd(u)).redIAdd(u); var f = this.x.redMul(s).redISub(u); f = (f = f.redIAdd(f)).redIAdd(f); var h = this.y.redMul(l.redMul(c.redISub(l)).redISub(a.redMul(s))); h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h); var d = this.z.redAdd(a).redSqr().redISub(r).redISub(s); return this.curve.jpoint(f, h, d); }, u.prototype.mul = function (e, t) { return e = new i(e, t), this.curve._wnafMul(this, e); }, u.prototype.eq = function (e) { if ("affine" === e.type)
            return this.eq(e.toJ()); if (this === e)
            return !0; var t = this.z.redSqr(), r = e.z.redSqr(); if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))
            return !1; var n = t.redMul(this.z), i = r.redMul(e.z); return 0 === this.y.redMul(i).redISub(e.y.redMul(n)).cmpn(0); }, u.prototype.eqXToP = function (e) { var t = this.z.redSqr(), r = e.toRed(this.curve.red).redMul(t); if (0 === this.x.cmp(r))
            return !0; for (var n = e.clone(), i = this.curve.redN.redMul(t);;) {
            if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)
                return !1;
            if (r.redIAdd(i), 0 === this.x.cmp(r))
                return !0;
        } }, u.prototype.inspect = function () { return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"; }, u.prototype.isInfinity = function () { return 0 === this.z.cmpn(0); };
    }, 5427: (e, t, r) => {
        "use strict";
        var n, i = t, o = r(3715), a = r(8254), s = r(2987).assert;
        function c(e) { "short" === e.type ? this.curve = new a.short(e) : "edwards" === e.type ? this.curve = new a.edwards(e) : this.curve = new a.mont(e), this.g = this.curve.g, this.n = this.curve.n, this.hash = e.hash, s(this.g.validate(), "Invalid curve"), s(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O"); }
        function l(e, t) { Object.defineProperty(i, e, { configurable: !0, enumerable: !0, get: function () { var r = new c(t); return Object.defineProperty(i, e, { configurable: !0, enumerable: !0, value: r }), r; } }); }
        i.PresetCurve = c, l("p192", { type: "short", prime: "p192", p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff", a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc", b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1", n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831", hash: o.sha256, gRed: !1, g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"] }), l("p224", { type: "short", prime: "p224", p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001", a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe", b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4", n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d", hash: o.sha256, gRed: !1, g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"] }), l("p256", { type: "short", prime: null, p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff", a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc", b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b", n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551", hash: o.sha256, gRed: !1, g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"] }), l("p384", { type: "short", prime: null, p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff", a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc", b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef", n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973", hash: o.sha384, gRed: !1, g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"] }), l("p521", { type: "short", prime: null, p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff", a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc", b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00", n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409", hash: o.sha512, gRed: !1, g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"] }), l("curve25519", { type: "mont", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "76d06", b: "1", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: o.sha256, gRed: !1, g: ["9"] }), l("ed25519", { type: "edwards", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "-1", c: "1", d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: o.sha256, gRed: !1, g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"] });
        try {
            n = r(1037);
        }
        catch (e) {
            n = void 0;
        }
        l("secp256k1", { type: "short", prime: "k256", p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f", a: "0", b: "7", n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141", h: "1", hash: o.sha256, beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72", basis: [{ a: "3086d221a7d46bcde86c90e49284eb15", b: "-e4437ed6010e88286f547fa90abfe4c3" }, { a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15" }], gRed: !1, g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", n] });
    }, 7954: (e, t, r) => {
        "use strict";
        var n = r(3550), i = r(2156), o = r(2987), a = r(5427), s = r(9931), c = o.assert, l = r(1251), u = r(611);
        function f(e) { if (!(this instanceof f))
            return new f(e); "string" == typeof e && (c(Object.prototype.hasOwnProperty.call(a, e), "Unknown curve " + e), e = a[e]), e instanceof a.PresetCurve && (e = { curve: e }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash; }
        e.exports = f, f.prototype.keyPair = function (e) { return new l(this, e); }, f.prototype.keyFromPrivate = function (e, t) { return l.fromPrivate(this, e, t); }, f.prototype.keyFromPublic = function (e, t) { return l.fromPublic(this, e, t); }, f.prototype.genKeyPair = function (e) { e || (e = {}); for (var t = new i({ hash: this.hash, pers: e.pers, persEnc: e.persEnc || "utf8", entropy: e.entropy || s(this.hash.hmacStrength), entropyEnc: e.entropy && e.entropyEnc || "utf8", nonce: this.n.toArray() }), r = this.n.byteLength(), o = this.n.sub(new n(2));;) {
            var a = new n(t.generate(r));
            if (!(a.cmp(o) > 0))
                return a.iaddn(1), this.keyFromPrivate(a);
        } }, f.prototype._truncateToN = function (e, t) { var r = 8 * e.byteLength() - this.n.bitLength(); return r > 0 && (e = e.ushrn(r)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e; }, f.prototype.sign = function (e, t, r, o) { "object" == typeof r && (o = r, r = null), o || (o = {}), t = this.keyFromPrivate(t, r), e = this._truncateToN(new n(e, 16)); for (var a = this.n.byteLength(), s = t.getPrivate().toArray("be", a), c = e.toArray("be", a), l = new i({ hash: this.hash, entropy: s, nonce: c, pers: o.pers, persEnc: o.persEnc || "utf8" }), f = this.n.sub(new n(1)), h = 0;; h++) {
            var d = o.k ? o.k(h) : new n(l.generate(this.n.byteLength()));
            if (!((d = this._truncateToN(d, !0)).cmpn(1) <= 0 || d.cmp(f) >= 0)) {
                var p = this.g.mul(d);
                if (!p.isInfinity()) {
                    var g = p.getX(), m = g.umod(this.n);
                    if (0 !== m.cmpn(0)) {
                        var b = d.invm(this.n).mul(m.mul(t.getPrivate()).iadd(e));
                        if (0 !== (b = b.umod(this.n)).cmpn(0)) {
                            var y = (p.getY().isOdd() ? 1 : 0) | (0 !== g.cmp(m) ? 2 : 0);
                            return o.canonical && b.cmp(this.nh) > 0 && (b = this.n.sub(b), y ^= 1), new u({ r: m, s: b, recoveryParam: y });
                        }
                    }
                }
            }
        } }, f.prototype.verify = function (e, t, r, i) { e = this._truncateToN(new n(e, 16)), r = this.keyFromPublic(r, i); var o = (t = new u(t, "hex")).r, a = t.s; if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0)
            return !1; if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0)
            return !1; var s, c = a.invm(this.n), l = c.mul(e).umod(this.n), f = c.mul(o).umod(this.n); return this.curve._maxwellTrick ? !(s = this.g.jmulAdd(l, r.getPublic(), f)).isInfinity() && s.eqXToP(o) : !(s = this.g.mulAdd(l, r.getPublic(), f)).isInfinity() && 0 === s.getX().umod(this.n).cmp(o); }, f.prototype.recoverPubKey = function (e, t, r, i) { c((3 & r) === r, "The recovery param is more than two bits"), t = new u(t, i); var o = this.n, a = new n(e), s = t.r, l = t.s, f = 1 & r, h = r >> 1; if (s.cmp(this.curve.p.umod(this.curve.n)) >= 0 && h)
            throw new Error("Unable to find sencond key candinate"); s = h ? this.curve.pointFromX(s.add(this.curve.n), f) : this.curve.pointFromX(s, f); var d = t.r.invm(o), p = o.sub(a).mul(d).umod(o), g = l.mul(d).umod(o); return this.g.mulAdd(p, s, g); }, f.prototype.getKeyRecoveryParam = function (e, t, r, n) { if (null !== (t = new u(t, n)).recoveryParam)
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
    }, 1251: (e, t, r) => {
        "use strict";
        var n = r(3550), i = r(2987).assert;
        function o(e, t) { this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc); }
        e.exports = o, o.fromPublic = function (e, t, r) { return t instanceof o ? t : new o(e, { pub: t, pubEnc: r }); }, o.fromPrivate = function (e, t, r) { return t instanceof o ? t : new o(e, { priv: t, privEnc: r }); }, o.prototype.validate = function () { var e = this.getPublic(); return e.isInfinity() ? { result: !1, reason: "Invalid public key" } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" }; }, o.prototype.getPublic = function (e, t) { return "string" == typeof e && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub; }, o.prototype.getPrivate = function (e) { return "hex" === e ? this.priv.toString(16, 2) : this.priv; }, o.prototype._importPrivate = function (e, t) { this.priv = new n(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n); }, o.prototype._importPublic = function (e, t) { if (e.x || e.y)
            return "mont" === this.ec.curve.type ? i(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || i(e.x && e.y, "Need both x and y coordinate"), void (this.pub = this.ec.curve.point(e.x, e.y)); this.pub = this.ec.curve.decodePoint(e, t); }, o.prototype.derive = function (e) { return e.validate() || i(e.validate(), "public point not validated"), e.mul(this.priv).getX(); }, o.prototype.sign = function (e, t, r) { return this.ec.sign(e, this, t, r); }, o.prototype.verify = function (e, t) { return this.ec.verify(e, t, this); }, o.prototype.inspect = function () { return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"; };
    }, 611: (e, t, r) => {
        "use strict";
        var n = r(3550), i = r(2987), o = i.assert;
        function a(e, t) { if (e instanceof a)
            return e; this._importDER(e, t) || (o(e.r && e.s, "Signature without r or s"), this.r = new n(e.r, 16), this.s = new n(e.s, 16), void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam); }
        function s() { this.place = 0; }
        function c(e, t) { var r = e[t.place++]; if (!(128 & r))
            return r; var n = 15 & r; if (0 === n || n > 4)
            return !1; for (var i = 0, o = 0, a = t.place; o < n; o++, a++)
            i <<= 8, i |= e[a], i >>>= 0; return !(i <= 127) && (t.place = a, i); }
        function l(e) { for (var t = 0, r = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < r;)
            t++; return 0 === t ? e : e.slice(t); }
        function u(e, t) { if (t < 128)
            e.push(t);
        else {
            var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
            for (e.push(128 | r); --r;)
                e.push(t >>> (r << 3) & 255);
            e.push(t);
        } }
        e.exports = a, a.prototype._importDER = function (e, t) { e = i.toArray(e, t); var r = new s; if (48 !== e[r.place++])
            return !1; var o = c(e, r); if (!1 === o)
            return !1; if (o + r.place !== e.length)
            return !1; if (2 !== e[r.place++])
            return !1; var a = c(e, r); if (!1 === a)
            return !1; var l = e.slice(r.place, a + r.place); if (r.place += a, 2 !== e[r.place++])
            return !1; var u = c(e, r); if (!1 === u)
            return !1; if (e.length !== u + r.place)
            return !1; var f = e.slice(r.place, u + r.place); if (0 === l[0]) {
            if (!(128 & l[1]))
                return !1;
            l = l.slice(1);
        } if (0 === f[0]) {
            if (!(128 & f[1]))
                return !1;
            f = f.slice(1);
        } return this.r = new n(l), this.s = new n(f), this.recoveryParam = null, !0; }, a.prototype.toDER = function (e) { var t = this.r.toArray(), r = this.s.toArray(); for (128 & t[0] && (t = [0].concat(t)), 128 & r[0] && (r = [0].concat(r)), t = l(t), r = l(r); !(r[0] || 128 & r[1]);)
            r = r.slice(1); var n = [2]; u(n, t.length), (n = n.concat(t)).push(2), u(n, r.length); var o = n.concat(r), a = [48]; return u(a, o.length), a = a.concat(o), i.encode(a, e); };
    }, 5980: (e, t, r) => {
        "use strict";
        var n = r(3715), i = r(5427), o = r(2987), a = o.assert, s = o.parseBytes, c = r(9087), l = r(3622);
        function u(e) { if (a("ed25519" === e, "only tested with ed25519 so far"), !(this instanceof u))
            return new u(e); e = i[e].curve, this.curve = e, this.g = e.g, this.g.precompute(e.n.bitLength() + 1), this.pointClass = e.point().constructor, this.encodingLength = Math.ceil(e.n.bitLength() / 8), this.hash = n.sha512; }
        e.exports = u, u.prototype.sign = function (e, t) { e = s(e); var r = this.keyFromSecret(t), n = this.hashInt(r.messagePrefix(), e), i = this.g.mul(n), o = this.encodePoint(i), a = this.hashInt(o, r.pubBytes(), e).mul(r.priv()), c = n.add(a).umod(this.curve.n); return this.makeSignature({ R: i, S: c, Rencoded: o }); }, u.prototype.verify = function (e, t, r) { e = s(e), t = this.makeSignature(t); var n = this.keyFromPublic(r), i = this.hashInt(t.Rencoded(), n.pubBytes(), e), o = this.g.mul(t.S()); return t.R().add(n.pub().mul(i)).eq(o); }, u.prototype.hashInt = function () { for (var e = this.hash(), t = 0; t < arguments.length; t++)
            e.update(arguments[t]); return o.intFromLE(e.digest()).umod(this.curve.n); }, u.prototype.keyFromPublic = function (e) { return c.fromPublic(this, e); }, u.prototype.keyFromSecret = function (e) { return c.fromSecret(this, e); }, u.prototype.makeSignature = function (e) { return e instanceof l ? e : new l(this, e); }, u.prototype.encodePoint = function (e) { var t = e.getY().toArray("le", this.encodingLength); return t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0, t; }, u.prototype.decodePoint = function (e) { var t = (e = o.parseBytes(e)).length - 1, r = e.slice(0, t).concat(-129 & e[t]), n = 0 != (128 & e[t]), i = o.intFromLE(r); return this.curve.pointFromY(i, n); }, u.prototype.encodeInt = function (e) { return e.toArray("le", this.encodingLength); }, u.prototype.decodeInt = function (e) { return o.intFromLE(e); }, u.prototype.isPoint = function (e) { return e instanceof this.pointClass; };
    }, 9087: (e, t, r) => {
        "use strict";
        var n = r(2987), i = n.assert, o = n.parseBytes, a = n.cachedProperty;
        function s(e, t) { this.eddsa = e, this._secret = o(t.secret), e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = o(t.pub); }
        s.fromPublic = function (e, t) { return t instanceof s ? t : new s(e, { pub: t }); }, s.fromSecret = function (e, t) { return t instanceof s ? t : new s(e, { secret: t }); }, s.prototype.secret = function () { return this._secret; }, a(s, "pubBytes", (function () { return this.eddsa.encodePoint(this.pub()); })), a(s, "pub", (function () { return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv()); })), a(s, "privBytes", (function () { var e = this.eddsa, t = this.hash(), r = e.encodingLength - 1, n = t.slice(0, e.encodingLength); return n[0] &= 248, n[r] &= 127, n[r] |= 64, n; })), a(s, "priv", (function () { return this.eddsa.decodeInt(this.privBytes()); })), a(s, "hash", (function () { return this.eddsa.hash().update(this.secret()).digest(); })), a(s, "messagePrefix", (function () { return this.hash().slice(this.eddsa.encodingLength); })), s.prototype.sign = function (e) { return i(this._secret, "KeyPair can only verify"), this.eddsa.sign(e, this); }, s.prototype.verify = function (e, t) { return this.eddsa.verify(e, t, this); }, s.prototype.getSecret = function (e) { return i(this._secret, "KeyPair is public only"), n.encode(this.secret(), e); }, s.prototype.getPublic = function (e) { return n.encode(this.pubBytes(), e); }, e.exports = s;
    }, 3622: (e, t, r) => {
        "use strict";
        var n = r(3550), i = r(2987), o = i.assert, a = i.cachedProperty, s = i.parseBytes;
        function c(e, t) { this.eddsa = e, "object" != typeof t && (t = s(t)), Array.isArray(t) && (t = { R: t.slice(0, e.encodingLength), S: t.slice(e.encodingLength) }), o(t.R && t.S, "Signature without R or S"), e.isPoint(t.R) && (this._R = t.R), t.S instanceof n && (this._S = t.S), this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded, this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded; }
        a(c, "S", (function () { return this.eddsa.decodeInt(this.Sencoded()); })), a(c, "R", (function () { return this.eddsa.decodePoint(this.Rencoded()); })), a(c, "Rencoded", (function () { return this.eddsa.encodePoint(this.R()); })), a(c, "Sencoded", (function () { return this.eddsa.encodeInt(this.S()); })), c.prototype.toBytes = function () { return this.Rencoded().concat(this.Sencoded()); }, c.prototype.toHex = function () { return i.encode(this.toBytes(), "hex").toUpperCase(); }, e.exports = c;
    }, 1037: e => { e.exports = { doubles: { step: 4, points: [["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"], ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"], ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"], ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"], ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"], ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"], ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"], ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"], ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"], ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"], ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"], ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"], ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"], ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"], ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"], ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"], ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"], ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"], ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"], ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"], ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"], ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"], ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"], ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"], ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"], ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"], ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"], ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"], ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"], ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"], ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"], ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"], ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"], ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"], ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"], ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"], ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"], ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"], ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"], ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"], ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"], ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"], ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"], ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"], ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"], ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"], ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"], ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"], ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"], ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"], ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"], ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"], ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"], ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"], ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"], ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"], ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"], ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"], ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"], ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"], ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"], ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"], ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"], ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"], ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]] }, naf: { wnd: 7, points: [["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"], ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"], ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"], ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"], ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"], ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"], ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"], ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"], ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"], ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"], ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"], ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"], ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"], ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"], ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"], ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"], ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"], ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"], ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"], ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"], ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"], ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"], ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"], ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"], ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"], ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"], ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"], ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"], ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"], ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"], ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"], ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"], ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"], ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"], ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"], ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"], ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"], ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"], ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"], ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"], ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"], ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"], ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"], ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"], ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"], ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"], ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"], ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"], ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"], ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"], ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"], ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"], ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"], ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"], ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"], ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"], ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"], ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"], ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"], ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"], ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"], ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"], ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"], ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"], ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"], ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"], ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"], ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"], ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"], ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"], ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"], ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"], ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"], ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"], ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"], ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"], ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"], ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"], ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"], ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"], ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"], ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"], ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"], ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"], ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"], ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"], ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"], ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"], ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"], ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"], ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"], ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"], ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"], ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"], ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"], ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"], ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"], ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"], ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"], ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"], ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"], ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"], ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"], ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"], ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"], ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"], ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"], ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"], ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"], ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"], ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"], ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"], ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"], ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"], ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"], ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"], ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"], ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"], ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"], ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"], ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"], ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"], ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"], ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"], ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"], ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"], ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]] } }; }, 2987: (e, t, r) => {
        "use strict";
        var n = t, i = r(3550), o = r(9746), a = r(4504);
        n.assert = o, n.toArray = a.toArray, n.zero2 = a.zero2, n.toHex = a.toHex, n.encode = a.encode, n.getNAF = function (e, t, r) { var n = new Array(Math.max(e.bitLength(), r) + 1); n.fill(0); for (var i = 1 << t + 1, o = e.clone(), a = 0; a < n.length; a++) {
            var s, c = o.andln(i - 1);
            o.isOdd() ? (s = c > (i >> 1) - 1 ? (i >> 1) - c : c, o.isubn(s)) : s = 0, n[a] = s, o.iushrn(1);
        } return n; }, n.getJSF = function (e, t) { var r = [[], []]; e = e.clone(), t = t.clone(); for (var n, i = 0, o = 0; e.cmpn(-i) > 0 || t.cmpn(-o) > 0;) {
            var a, s, c = e.andln(3) + i & 3, l = t.andln(3) + o & 3;
            3 === c && (c = -1), 3 === l && (l = -1), a = 0 == (1 & c) ? 0 : 3 != (n = e.andln(7) + i & 7) && 5 !== n || 2 !== l ? c : -c, r[0].push(a), s = 0 == (1 & l) ? 0 : 3 != (n = t.andln(7) + o & 7) && 5 !== n || 2 !== c ? l : -l, r[1].push(s), 2 * i === a + 1 && (i = 1 - i), 2 * o === s + 1 && (o = 1 - o), e.iushrn(1), t.iushrn(1);
        } return r; }, n.cachedProperty = function (e, t, r) { var n = "_" + t; e.prototype[t] = function () { return void 0 !== this[n] ? this[n] : this[n] = r.call(this); }; }, n.parseBytes = function (e) { return "string" == typeof e ? n.toArray(e, "hex") : e; }, n.intFromLE = function (e) { return new i(e, "hex", "le"); };
    }, 1503: (e, t, r) => {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator, i = r(4149), o = r(5320), a = r(8923), s = r(2636), c = function (e, t) { if (null == e)
            throw new TypeError("Cannot call method on " + e); if ("string" != typeof t || "number" !== t && "string" !== t)
            throw new TypeError('hint must be "string" or "number"'); var r, n, a, s = "string" === t ? ["toString", "valueOf"] : ["valueOf", "toString"]; for (a = 0; a < s.length; ++a)
            if (r = e[s[a]], o(r) && (n = r.call(e), i(n)))
                return n; throw new TypeError("No default value"); }, l = function (e, t) { var r = e[t]; if (null != r) {
            if (!o(r))
                throw new TypeError(r + " returned for property " + t + " of object " + e + " is not a function");
            return r;
        } };
        e.exports = function (e) { if (i(e))
            return e; var t, r = "default"; if (arguments.length > 1 && (arguments[1] === String ? r = "string" : arguments[1] === Number && (r = "number")), n && (Symbol.toPrimitive ? t = l(e, Symbol.toPrimitive) : s(e) && (t = Symbol.prototype.valueOf)), void 0 !== t) {
            var o = t.call(e, r);
            if (i(o))
                return o;
            throw new TypeError("unable to convert exotic object to primitive");
        } return "default" === r && (a(e) || s(e)) && (r = "string"), c(e, "default" === r ? "number" : r); };
    }, 2116: (e, t, r) => {
        "use strict";
        var n = Object.prototype.toString, i = r(4149), o = r(5320), a = function (e) { var t; if ((t = arguments.length > 1 ? arguments[1] : "[object Date]" === n.call(e) ? String : Number) === String || t === Number) {
            var r, a, s = t === String ? ["toString", "valueOf"] : ["valueOf", "toString"];
            for (a = 0; a < s.length; ++a)
                if (o(e[s[a]]) && (r = e[s[a]](), i(r)))
                    return r;
            throw new TypeError("No default value");
        } throw new TypeError("invalid [[DefaultValue]] hint supplied"); };
        e.exports = function (e) { return i(e) ? e : arguments.length > 1 ? a(e, arguments[1]) : a(e); };
    }, 4149: e => {
        "use strict";
        e.exports = function (e) { return null === e || "function" != typeof e && "object" != typeof e; };
    }, 6371: function (e, t, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function (e, t, r, n) { void 0 === n && (n = r), Object.defineProperty(e, n, { enumerable: !0, get: function () { return t[r]; } }); } : function (e, t, r, n) { void 0 === n && (n = r), e[n] = t[r]; }), i = this && this.__setModuleDefault || (Object.create ? function (e, t) { Object.defineProperty(e, "default", { enumerable: !0, value: t }); } : function (e, t) { e.default = t; }), o = this && this.__importStar || function (e) { if (e && e.__esModule)
            return e; var t = {}; if (null != e)
            for (var r in e)
                "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && n(t, e, r); return i(t, e), t; };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.formatBytes32String = t.Utf8ErrorFuncs = t.toUtf8String = t.toUtf8CodePoints = t.toUtf8Bytes = t._toEscapedUtf8String = t.nameprep = t.hexDataSlice = t.hexDataLength = t.hexZeroPad = t.hexValue = t.hexStripZeros = t.hexConcat = t.isHexString = t.hexlify = t.base64 = t.base58 = t.TransactionDescription = t.LogDescription = t.Interface = t.SigningKey = t.HDNode = t.defaultPath = t.isBytesLike = t.isBytes = t.zeroPad = t.stripZeros = t.concat = t.arrayify = t.shallowCopy = t.resolveProperties = t.getStatic = t.defineReadOnly = t.deepCopy = t.checkProperties = t.poll = t.fetchJson = t._fetchData = t.RLP = t.Logger = t.checkResultErrors = t.FormatTypes = t.ParamType = t.FunctionFragment = t.EventFragment = t.ErrorFragment = t.ConstructorFragment = t.Fragment = t.defaultAbiCoder = t.AbiCoder = void 0, t.Indexed = t.Utf8ErrorReason = t.UnicodeNormalizationForm = t.SupportedAlgorithm = t.mnemonicToSeed = t.isValidMnemonic = t.entropyToMnemonic = t.mnemonicToEntropy = t.getAccountPath = t.verifyTypedData = t.verifyMessage = t.recoverPublicKey = t.computePublicKey = t.recoverAddress = t.computeAddress = t.getJsonWalletAddress = t.TransactionTypes = t.serializeTransaction = t.parseTransaction = t.accessListify = t.joinSignature = t.splitSignature = t.soliditySha256 = t.solidityKeccak256 = t.solidityPack = t.shuffled = t.randomBytes = t.sha512 = t.sha256 = t.ripemd160 = t.keccak256 = t.computeHmac = t.commify = t.parseUnits = t.formatUnits = t.parseEther = t.formatEther = t.isAddress = t.getCreate2Address = t.getContractAddress = t.getIcapAddress = t.getAddress = t._TypedDataEncoder = t.id = t.isValidName = t.namehash = t.hashMessage = t.parseBytes32String = void 0;
        var a = r(3900);
        Object.defineProperty(t, "AbiCoder", { enumerable: !0, get: function () { return a.AbiCoder; } }), Object.defineProperty(t, "checkResultErrors", { enumerable: !0, get: function () { return a.checkResultErrors; } }), Object.defineProperty(t, "ConstructorFragment", { enumerable: !0, get: function () { return a.ConstructorFragment; } }), Object.defineProperty(t, "defaultAbiCoder", { enumerable: !0, get: function () { return a.defaultAbiCoder; } }), Object.defineProperty(t, "ErrorFragment", { enumerable: !0, get: function () { return a.ErrorFragment; } }), Object.defineProperty(t, "EventFragment", { enumerable: !0, get: function () { return a.EventFragment; } }), Object.defineProperty(t, "FormatTypes", { enumerable: !0, get: function () { return a.FormatTypes; } }), Object.defineProperty(t, "Fragment", { enumerable: !0, get: function () { return a.Fragment; } }), Object.defineProperty(t, "FunctionFragment", { enumerable: !0, get: function () { return a.FunctionFragment; } }), Object.defineProperty(t, "Indexed", { enumerable: !0, get: function () { return a.Indexed; } }), Object.defineProperty(t, "Interface", { enumerable: !0, get: function () { return a.Interface; } }), Object.defineProperty(t, "LogDescription", { enumerable: !0, get: function () { return a.LogDescription; } }), Object.defineProperty(t, "ParamType", { enumerable: !0, get: function () { return a.ParamType; } }), Object.defineProperty(t, "TransactionDescription", { enumerable: !0, get: function () { return a.TransactionDescription; } });
        var s = r(4594);
        Object.defineProperty(t, "getAddress", { enumerable: !0, get: function () { return s.getAddress; } }), Object.defineProperty(t, "getCreate2Address", { enumerable: !0, get: function () { return s.getCreate2Address; } }), Object.defineProperty(t, "getContractAddress", { enumerable: !0, get: function () { return s.getContractAddress; } }), Object.defineProperty(t, "getIcapAddress", { enumerable: !0, get: function () { return s.getIcapAddress; } }), Object.defineProperty(t, "isAddress", { enumerable: !0, get: function () { return s.isAddress; } });
        var c = o(r(4089));
        t.base64 = c;
        var l = r(7727);
        Object.defineProperty(t, "base58", { enumerable: !0, get: function () { return l.Base58; } });
        var u = r(3286);
        Object.defineProperty(t, "arrayify", { enumerable: !0, get: function () { return u.arrayify; } }), Object.defineProperty(t, "concat", { enumerable: !0, get: function () { return u.concat; } }), Object.defineProperty(t, "hexConcat", { enumerable: !0, get: function () { return u.hexConcat; } }), Object.defineProperty(t, "hexDataSlice", { enumerable: !0, get: function () { return u.hexDataSlice; } }), Object.defineProperty(t, "hexDataLength", { enumerable: !0, get: function () { return u.hexDataLength; } }), Object.defineProperty(t, "hexlify", { enumerable: !0, get: function () { return u.hexlify; } }), Object.defineProperty(t, "hexStripZeros", { enumerable: !0, get: function () { return u.hexStripZeros; } }), Object.defineProperty(t, "hexValue", { enumerable: !0, get: function () { return u.hexValue; } }), Object.defineProperty(t, "hexZeroPad", { enumerable: !0, get: function () { return u.hexZeroPad; } }), Object.defineProperty(t, "isBytes", { enumerable: !0, get: function () { return u.isBytes; } }), Object.defineProperty(t, "isBytesLike", { enumerable: !0, get: function () { return u.isBytesLike; } }), Object.defineProperty(t, "isHexString", { enumerable: !0, get: function () { return u.isHexString; } }), Object.defineProperty(t, "joinSignature", { enumerable: !0, get: function () { return u.joinSignature; } }), Object.defineProperty(t, "zeroPad", { enumerable: !0, get: function () { return u.zeroPad; } }), Object.defineProperty(t, "splitSignature", { enumerable: !0, get: function () { return u.splitSignature; } }), Object.defineProperty(t, "stripZeros", { enumerable: !0, get: function () { return u.stripZeros; } });
        var f = r(5931);
        Object.defineProperty(t, "_TypedDataEncoder", { enumerable: !0, get: function () { return f._TypedDataEncoder; } }), Object.defineProperty(t, "hashMessage", { enumerable: !0, get: function () { return f.hashMessage; } }), Object.defineProperty(t, "id", { enumerable: !0, get: function () { return f.id; } }), Object.defineProperty(t, "isValidName", { enumerable: !0, get: function () { return f.isValidName; } }), Object.defineProperty(t, "namehash", { enumerable: !0, get: function () { return f.namehash; } });
        var h = r(1681);
        Object.defineProperty(t, "defaultPath", { enumerable: !0, get: function () { return h.defaultPath; } }), Object.defineProperty(t, "entropyToMnemonic", { enumerable: !0, get: function () { return h.entropyToMnemonic; } }), Object.defineProperty(t, "getAccountPath", { enumerable: !0, get: function () { return h.getAccountPath; } }), Object.defineProperty(t, "HDNode", { enumerable: !0, get: function () { return h.HDNode; } }), Object.defineProperty(t, "isValidMnemonic", { enumerable: !0, get: function () { return h.isValidMnemonic; } }), Object.defineProperty(t, "mnemonicToEntropy", { enumerable: !0, get: function () { return h.mnemonicToEntropy; } }), Object.defineProperty(t, "mnemonicToSeed", { enumerable: !0, get: function () { return h.mnemonicToSeed; } });
        var d = r(6883);
        Object.defineProperty(t, "getJsonWalletAddress", { enumerable: !0, get: function () { return d.getJsonWalletAddress; } });
        var p = r(8197);
        Object.defineProperty(t, "keccak256", { enumerable: !0, get: function () { return p.keccak256; } });
        var g = r(711);
        Object.defineProperty(t, "Logger", { enumerable: !0, get: function () { return g.Logger; } });
        var m = r(1278);
        Object.defineProperty(t, "computeHmac", { enumerable: !0, get: function () { return m.computeHmac; } }), Object.defineProperty(t, "ripemd160", { enumerable: !0, get: function () { return m.ripemd160; } }), Object.defineProperty(t, "sha256", { enumerable: !0, get: function () { return m.sha256; } }), Object.defineProperty(t, "sha512", { enumerable: !0, get: function () { return m.sha512; } });
        var b = r(9155);
        Object.defineProperty(t, "solidityKeccak256", { enumerable: !0, get: function () { return b.keccak256; } }), Object.defineProperty(t, "solidityPack", { enumerable: !0, get: function () { return b.pack; } }), Object.defineProperty(t, "soliditySha256", { enumerable: !0, get: function () { return b.sha256; } });
        var y = r(7986);
        Object.defineProperty(t, "randomBytes", { enumerable: !0, get: function () { return y.randomBytes; } }), Object.defineProperty(t, "shuffled", { enumerable: !0, get: function () { return y.shuffled; } });
        var v = r(3587);
        Object.defineProperty(t, "checkProperties", { enumerable: !0, get: function () { return v.checkProperties; } }), Object.defineProperty(t, "deepCopy", { enumerable: !0, get: function () { return v.deepCopy; } }), Object.defineProperty(t, "defineReadOnly", { enumerable: !0, get: function () { return v.defineReadOnly; } }), Object.defineProperty(t, "getStatic", { enumerable: !0, get: function () { return v.getStatic; } }), Object.defineProperty(t, "resolveProperties", { enumerable: !0, get: function () { return v.resolveProperties; } }), Object.defineProperty(t, "shallowCopy", { enumerable: !0, get: function () { return v.shallowCopy; } });
        var A = o(r(1843));
        t.RLP = A;
        var S = r(2768);
        Object.defineProperty(t, "computePublicKey", { enumerable: !0, get: function () { return S.computePublicKey; } }), Object.defineProperty(t, "recoverPublicKey", { enumerable: !0, get: function () { return S.recoverPublicKey; } }), Object.defineProperty(t, "SigningKey", { enumerable: !0, get: function () { return S.SigningKey; } });
        var w = r(937);
        Object.defineProperty(t, "formatBytes32String", { enumerable: !0, get: function () { return w.formatBytes32String; } }), Object.defineProperty(t, "nameprep", { enumerable: !0, get: function () { return w.nameprep; } }), Object.defineProperty(t, "parseBytes32String", { enumerable: !0, get: function () { return w.parseBytes32String; } }), Object.defineProperty(t, "_toEscapedUtf8String", { enumerable: !0, get: function () { return w._toEscapedUtf8String; } }), Object.defineProperty(t, "toUtf8Bytes", { enumerable: !0, get: function () { return w.toUtf8Bytes; } }), Object.defineProperty(t, "toUtf8CodePoints", { enumerable: !0, get: function () { return w.toUtf8CodePoints; } }), Object.defineProperty(t, "toUtf8String", { enumerable: !0, get: function () { return w.toUtf8String; } }), Object.defineProperty(t, "Utf8ErrorFuncs", { enumerable: !0, get: function () { return w.Utf8ErrorFuncs; } });
        var E = r(4377);
        Object.defineProperty(t, "accessListify", { enumerable: !0, get: function () { return E.accessListify; } }), Object.defineProperty(t, "computeAddress", { enumerable: !0, get: function () { return E.computeAddress; } }), Object.defineProperty(t, "parseTransaction", { enumerable: !0, get: function () { return E.parse; } }), Object.defineProperty(t, "recoverAddress", { enumerable: !0, get: function () { return E.recoverAddress; } }), Object.defineProperty(t, "serializeTransaction", { enumerable: !0, get: function () { return E.serialize; } }), Object.defineProperty(t, "TransactionTypes", { enumerable: !0, get: function () { return E.TransactionTypes; } });
        var T = r(7616);
        Object.defineProperty(t, "commify", { enumerable: !0, get: function () { return T.commify; } }), Object.defineProperty(t, "formatEther", { enumerable: !0, get: function () { return T.formatEther; } }), Object.defineProperty(t, "parseEther", { enumerable: !0, get: function () { return T.parseEther; } }), Object.defineProperty(t, "formatUnits", { enumerable: !0, get: function () { return T.formatUnits; } }), Object.defineProperty(t, "parseUnits", { enumerable: !0, get: function () { return T.parseUnits; } });
        var k = r(4958);
        Object.defineProperty(t, "verifyMessage", { enumerable: !0, get: function () { return k.verifyMessage; } }), Object.defineProperty(t, "verifyTypedData", { enumerable: !0, get: function () { return k.verifyTypedData; } });
        var B = r(8341);
        Object.defineProperty(t, "_fetchData", { enumerable: !0, get: function () { return B._fetchData; } }), Object.defineProperty(t, "fetchJson", { enumerable: !0, get: function () { return B.fetchJson; } }), Object.defineProperty(t, "poll", { enumerable: !0, get: function () { return B.poll; } });
        var P = r(1278);
        Object.defineProperty(t, "SupportedAlgorithm", { enumerable: !0, get: function () { return P.SupportedAlgorithm; } });
        var M = r(937);
        Object.defineProperty(t, "UnicodeNormalizationForm", { enumerable: !0, get: function () { return M.UnicodeNormalizationForm; } }), Object.defineProperty(t, "Utf8ErrorReason", { enumerable: !0, get: function () { return M.Utf8ErrorReason; } });
    }, 7648: e => {
        "use strict";
        var t = "Function.prototype.bind called on incompatible ", r = Array.prototype.slice, n = Object.prototype.toString, i = "[object Function]";
        e.exports = function (e) { var o = this; if ("function" != typeof o || n.call(o) !== i)
            throw new TypeError(t + o); for (var a, s = r.call(arguments, 1), c = function () { if (this instanceof a) {
            var t = o.apply(this, s.concat(r.call(arguments)));
            return Object(t) === t ? t : this;
        } return o.apply(e, s.concat(r.call(arguments))); }, l = Math.max(0, o.length - s.length), u = [], f = 0; f < l; f++)
            u.push("$" + f); if (a = Function("binder", "return function (" + u.join(",") + "){ return binder.apply(this,arguments); }")(c), o.prototype) {
            var h = function () { };
            h.prototype = o.prototype, a.prototype = new h, h.prototype = null;
        } return a; };
    }, 8612: (e, t, r) => {
        "use strict";
        var n = r(7648);
        e.exports = Function.prototype.bind || n;
    }, 210: (e, t, r) => {
        "use strict";
        var n, i = SyntaxError, o = Function, a = TypeError, s = function (e) { try {
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
        var l = function () { throw new a; }, u = c ? function () { try {
            return l;
        }
        catch (e) {
            try {
                return c(arguments, "callee").get;
            }
            catch (e) {
                return l;
            }
        } }() : l, f = r(1405)(), h = Object.getPrototypeOf || function (e) { return e.__proto__; }, d = {}, p = "undefined" == typeof Uint8Array ? n : h(Uint8Array), g = { "%AggregateError%": "undefined" == typeof AggregateError ? n : AggregateError, "%Array%": Array, "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? n : ArrayBuffer, "%ArrayIteratorPrototype%": f ? h([][Symbol.iterator]()) : n, "%AsyncFromSyncIteratorPrototype%": n, "%AsyncFunction%": d, "%AsyncGenerator%": d, "%AsyncGeneratorFunction%": d, "%AsyncIteratorPrototype%": d, "%Atomics%": "undefined" == typeof Atomics ? n : Atomics, "%BigInt%": "undefined" == typeof BigInt ? n : BigInt, "%Boolean%": Boolean, "%DataView%": "undefined" == typeof DataView ? n : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": "undefined" == typeof Float32Array ? n : Float32Array, "%Float64Array%": "undefined" == typeof Float64Array ? n : Float64Array, "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? n : FinalizationRegistry, "%Function%": o, "%GeneratorFunction%": d, "%Int8Array%": "undefined" == typeof Int8Array ? n : Int8Array, "%Int16Array%": "undefined" == typeof Int16Array ? n : Int16Array, "%Int32Array%": "undefined" == typeof Int32Array ? n : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": f ? h(h([][Symbol.iterator]())) : n, "%JSON%": "object" == typeof JSON ? JSON : n, "%Map%": "undefined" == typeof Map ? n : Map, "%MapIteratorPrototype%": "undefined" != typeof Map && f ? h((new Map)[Symbol.iterator]()) : n, "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": "undefined" == typeof Promise ? n : Promise, "%Proxy%": "undefined" == typeof Proxy ? n : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": "undefined" == typeof Reflect ? n : Reflect, "%RegExp%": RegExp, "%Set%": "undefined" == typeof Set ? n : Set, "%SetIteratorPrototype%": "undefined" != typeof Set && f ? h((new Set)[Symbol.iterator]()) : n, "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? n : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": f ? h(""[Symbol.iterator]()) : n, "%Symbol%": f ? Symbol : n, "%SyntaxError%": i, "%ThrowTypeError%": u, "%TypedArray%": p, "%TypeError%": a, "%Uint8Array%": "undefined" == typeof Uint8Array ? n : Uint8Array, "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? n : Uint8ClampedArray, "%Uint16Array%": "undefined" == typeof Uint16Array ? n : Uint16Array, "%Uint32Array%": "undefined" == typeof Uint32Array ? n : Uint32Array, "%URIError%": URIError, "%WeakMap%": "undefined" == typeof WeakMap ? n : WeakMap, "%WeakRef%": "undefined" == typeof WeakRef ? n : WeakRef, "%WeakSet%": "undefined" == typeof WeakSet ? n : WeakSet }, m = function e(t) { var r; if ("%AsyncFunction%" === t)
            r = s("async function () {}");
        else if ("%GeneratorFunction%" === t)
            r = s("function* () {}");
        else if ("%AsyncGeneratorFunction%" === t)
            r = s("async function* () {}");
        else if ("%AsyncGenerator%" === t) {
            var n = e("%AsyncGeneratorFunction%");
            n && (r = n.prototype);
        }
        else if ("%AsyncIteratorPrototype%" === t) {
            var i = e("%AsyncGenerator%");
            i && (r = h(i.prototype));
        } return g[t] = r, r; }, b = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, y = r(8612), v = r(7642), A = y.call(Function.call, Array.prototype.concat), S = y.call(Function.apply, Array.prototype.splice), w = y.call(Function.call, String.prototype.replace), E = y.call(Function.call, String.prototype.slice), T = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, k = /\\(\\)?/g, B = function (e) { var t = E(e, 0, 1), r = E(e, -1); if ("%" === t && "%" !== r)
            throw new i("invalid intrinsic syntax, expected closing `%`"); if ("%" === r && "%" !== t)
            throw new i("invalid intrinsic syntax, expected opening `%`"); var n = []; return w(e, T, (function (e, t, r, i) { n[n.length] = r ? w(i, k, "$1") : t || e; })), n; }, P = function (e, t) { var r, n = e; if (v(b, n) && (n = "%" + (r = b[n])[0] + "%"), v(g, n)) {
            var o = g[n];
            if (o === d && (o = m(n)), void 0 === o && !t)
                throw new a("intrinsic " + e + " exists, but is not available. Please file an issue!");
            return { alias: r, name: n, value: o };
        } throw new i("intrinsic " + e + " does not exist!"); };
        e.exports = function (e, t) { if ("string" != typeof e || 0 === e.length)
            throw new a("intrinsic name must be a non-empty string"); if (arguments.length > 1 && "boolean" != typeof t)
            throw new a('"allowMissing" argument must be a boolean'); var r = B(e), n = r.length > 0 ? r[0] : "", o = P("%" + n + "%", t), s = o.name, l = o.value, u = !1, f = o.alias; f && (n = f[0], S(r, A([0, 1], f))); for (var h = 1, d = !0; h < r.length; h += 1) {
            var p = r[h], m = E(p, 0, 1), b = E(p, -1);
            if (('"' === m || "'" === m || "`" === m || '"' === b || "'" === b || "`" === b) && m !== b)
                throw new i("property names with quotes must have matching quotes");
            if ("constructor" !== p && d || (u = !0), v(g, s = "%" + (n += "." + p) + "%"))
                l = g[s];
            else if (null != l) {
                if (!(p in l)) {
                    if (!t)
                        throw new a("base intrinsic for " + e + " exists, but the property is not available.");
                    return;
                }
                if (c && h + 1 >= r.length) {
                    var y = c(l, p);
                    l = (d = !!y) && "get" in y && !("originalValue" in y.get) ? y.get : l[p];
                }
                else
                    d = v(l, p), l = l[p];
                d && !u && (g[s] = l);
            }
        } return l; };
    }, 1405: (e, t, r) => {
        "use strict";
        var n = "undefined" != typeof Symbol && Symbol, i = r(5419);
        e.exports = function () { return "function" == typeof n && "function" == typeof Symbol && "symbol" == typeof n("foo") && "symbol" == typeof Symbol("bar") && i(); };
    }, 5419: e => {
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
    }, 6410: (e, t, r) => {
        "use strict";
        var n = r(5419);
        e.exports = function () { return n() && !!Symbol.toStringTag; };
    }, 7642: (e, t, r) => {
        "use strict";
        var n = r(8612);
        e.exports = n.call(Function.call, Object.prototype.hasOwnProperty);
    }, 3715: (e, t, r) => { var n = t; n.utils = r(6436), n.common = r(5772), n.sha = r(9041), n.ripemd = r(2949), n.hmac = r(2344), n.sha1 = n.sha.sha1, n.sha256 = n.sha.sha256, n.sha224 = n.sha.sha224, n.sha384 = n.sha.sha384, n.sha512 = n.sha.sha512, n.ripemd160 = n.ripemd.ripemd160; }, 5772: (e, t, r) => {
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
    }, 2344: (e, t, r) => {
        "use strict";
        var n = r(6436), i = r(9746);
        function o(e, t, r) { if (!(this instanceof o))
            return new o(e, t, r); this.Hash = e, this.blockSize = e.blockSize / 8, this.outSize = e.outSize / 8, this.inner = null, this.outer = null, this._init(n.toArray(t, r)); }
        e.exports = o, o.prototype._init = function (e) { e.length > this.blockSize && (e = (new this.Hash).update(e).digest()), i(e.length <= this.blockSize); for (var t = e.length; t < this.blockSize; t++)
            e.push(0); for (t = 0; t < e.length; t++)
            e[t] ^= 54; for (this.inner = (new this.Hash).update(e), t = 0; t < e.length; t++)
            e[t] ^= 106; this.outer = (new this.Hash).update(e); }, o.prototype.update = function (e, t) { return this.inner.update(e, t), this; }, o.prototype.digest = function (e) { return this.outer.update(this.inner.digest()), this.outer.digest(e); };
    }, 2949: (e, t, r) => {
        "use strict";
        var n = r(6436), i = r(5772), o = n.rotl32, a = n.sum32, s = n.sum32_3, c = n.sum32_4, l = i.BlockHash;
        function u() { if (!(this instanceof u))
            return new u; l.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"; }
        function f(e, t, r, n) { return e <= 15 ? t ^ r ^ n : e <= 31 ? t & r | ~t & n : e <= 47 ? (t | ~r) ^ n : e <= 63 ? t & n | r & ~n : t ^ (r | ~n); }
        function h(e) { return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838; }
        function d(e) { return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0; }
        n.inherits(u, l), t.ripemd160 = u, u.blockSize = 512, u.outSize = 160, u.hmacStrength = 192, u.padLength = 64, u.prototype._update = function (e, t) { for (var r = this.h[0], n = this.h[1], i = this.h[2], l = this.h[3], u = this.h[4], y = r, v = n, A = i, S = l, w = u, E = 0; E < 80; E++) {
            var T = a(o(c(r, f(E, n, i, l), e[p[E] + t], h(E)), m[E]), u);
            r = u, u = l, l = o(i, 10), i = n, n = T, T = a(o(c(y, f(79 - E, v, A, S), e[g[E] + t], d(E)), b[E]), w), y = w, w = S, S = o(A, 10), A = v, v = T;
        } T = s(this.h[1], i, S), this.h[1] = s(this.h[2], l, w), this.h[2] = s(this.h[3], u, y), this.h[3] = s(this.h[4], r, v), this.h[4] = s(this.h[0], n, A), this.h[0] = T; }, u.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h, "little") : n.split32(this.h, "little"); };
        var p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], g = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], m = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], b = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
    }, 9041: (e, t, r) => {
        "use strict";
        t.sha1 = r(4761), t.sha224 = r(799), t.sha256 = r(9344), t.sha384 = r(772), t.sha512 = r(5900);
    }, 4761: (e, t, r) => {
        "use strict";
        var n = r(6436), i = r(5772), o = r(7038), a = n.rotl32, s = n.sum32, c = n.sum32_5, l = o.ft_1, u = i.BlockHash, f = [1518500249, 1859775393, 2400959708, 3395469782];
        function h() { if (!(this instanceof h))
            return new h; u.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80); }
        n.inherits(h, u), e.exports = h, h.blockSize = 512, h.outSize = 160, h.hmacStrength = 80, h.padLength = 64, h.prototype._update = function (e, t) { for (var r = this.W, n = 0; n < 16; n++)
            r[n] = e[t + n]; for (; n < r.length; n++)
            r[n] = a(r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], 1); var i = this.h[0], o = this.h[1], u = this.h[2], h = this.h[3], d = this.h[4]; for (n = 0; n < r.length; n++) {
            var p = ~~(n / 20), g = c(a(i, 5), l(p, o, u, h), d, r[n], f[p]);
            d = h, h = u, u = a(o, 30), o = i, i = g;
        } this.h[0] = s(this.h[0], i), this.h[1] = s(this.h[1], o), this.h[2] = s(this.h[2], u), this.h[3] = s(this.h[3], h), this.h[4] = s(this.h[4], d); }, h.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h, "big") : n.split32(this.h, "big"); };
    }, 799: (e, t, r) => {
        "use strict";
        var n = r(6436), i = r(9344);
        function o() { if (!(this instanceof o))
            return new o; i.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]; }
        n.inherits(o, i), e.exports = o, o.blockSize = 512, o.outSize = 224, o.hmacStrength = 192, o.padLength = 64, o.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h.slice(0, 7), "big") : n.split32(this.h.slice(0, 7), "big"); };
    }, 9344: (e, t, r) => {
        "use strict";
        var n = r(6436), i = r(5772), o = r(7038), a = r(9746), s = n.sum32, c = n.sum32_4, l = n.sum32_5, u = o.ch32, f = o.maj32, h = o.s0_256, d = o.s1_256, p = o.g0_256, g = o.g1_256, m = i.BlockHash, b = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
        function y() { if (!(this instanceof y))
            return new y; m.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = b, this.W = new Array(64); }
        n.inherits(y, m), e.exports = y, y.blockSize = 512, y.outSize = 256, y.hmacStrength = 192, y.padLength = 64, y.prototype._update = function (e, t) { for (var r = this.W, n = 0; n < 16; n++)
            r[n] = e[t + n]; for (; n < r.length; n++)
            r[n] = c(g(r[n - 2]), r[n - 7], p(r[n - 15]), r[n - 16]); var i = this.h[0], o = this.h[1], m = this.h[2], b = this.h[3], y = this.h[4], v = this.h[5], A = this.h[6], S = this.h[7]; for (a(this.k.length === r.length), n = 0; n < r.length; n++) {
            var w = l(S, d(y), u(y, v, A), this.k[n], r[n]), E = s(h(i), f(i, o, m));
            S = A, A = v, v = y, y = s(b, w), b = m, m = o, o = i, i = s(w, E);
        } this.h[0] = s(this.h[0], i), this.h[1] = s(this.h[1], o), this.h[2] = s(this.h[2], m), this.h[3] = s(this.h[3], b), this.h[4] = s(this.h[4], y), this.h[5] = s(this.h[5], v), this.h[6] = s(this.h[6], A), this.h[7] = s(this.h[7], S); }, y.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h, "big") : n.split32(this.h, "big"); };
    }, 772: (e, t, r) => {
        "use strict";
        var n = r(6436), i = r(5900);
        function o() { if (!(this instanceof o))
            return new o; i.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]; }
        n.inherits(o, i), e.exports = o, o.blockSize = 1024, o.outSize = 384, o.hmacStrength = 192, o.padLength = 128, o.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h.slice(0, 12), "big") : n.split32(this.h.slice(0, 12), "big"); };
    }, 5900: (e, t, r) => {
        "use strict";
        var n = r(6436), i = r(5772), o = r(9746), a = n.rotr64_hi, s = n.rotr64_lo, c = n.shr64_hi, l = n.shr64_lo, u = n.sum64, f = n.sum64_hi, h = n.sum64_lo, d = n.sum64_4_hi, p = n.sum64_4_lo, g = n.sum64_5_hi, m = n.sum64_5_lo, b = i.BlockHash, y = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
        function v() { if (!(this instanceof v))
            return new v; b.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = y, this.W = new Array(160); }
        function A(e, t, r, n, i) { var o = e & r ^ ~e & i; return o < 0 && (o += 4294967296), o; }
        function S(e, t, r, n, i, o) { var a = t & n ^ ~t & o; return a < 0 && (a += 4294967296), a; }
        function w(e, t, r, n, i) { var o = e & r ^ e & i ^ r & i; return o < 0 && (o += 4294967296), o; }
        function E(e, t, r, n, i, o) { var a = t & n ^ t & o ^ n & o; return a < 0 && (a += 4294967296), a; }
        function T(e, t) { var r = a(e, t, 28) ^ a(t, e, 2) ^ a(t, e, 7); return r < 0 && (r += 4294967296), r; }
        function k(e, t) { var r = s(e, t, 28) ^ s(t, e, 2) ^ s(t, e, 7); return r < 0 && (r += 4294967296), r; }
        function B(e, t) { var r = s(e, t, 14) ^ s(e, t, 18) ^ s(t, e, 9); return r < 0 && (r += 4294967296), r; }
        function P(e, t) { var r = a(e, t, 1) ^ a(e, t, 8) ^ c(e, t, 7); return r < 0 && (r += 4294967296), r; }
        function M(e, t) { var r = s(e, t, 1) ^ s(e, t, 8) ^ l(e, t, 7); return r < 0 && (r += 4294967296), r; }
        function C(e, t) { var r = s(e, t, 19) ^ s(t, e, 29) ^ l(e, t, 6); return r < 0 && (r += 4294967296), r; }
        n.inherits(v, b), e.exports = v, v.blockSize = 1024, v.outSize = 512, v.hmacStrength = 192, v.padLength = 128, v.prototype._prepareBlock = function (e, t) { for (var r = this.W, n = 0; n < 32; n++)
            r[n] = e[t + n]; for (; n < r.length; n += 2) {
            var i = (m = r[n - 4], b = r[n - 3], y = void 0, (y = a(m, b, 19) ^ a(b, m, 29) ^ c(m, b, 6)) < 0 && (y += 4294967296), y), o = C(r[n - 4], r[n - 3]), s = r[n - 14], l = r[n - 13], u = P(r[n - 30], r[n - 29]), f = M(r[n - 30], r[n - 29]), h = r[n - 32], g = r[n - 31];
            r[n] = d(i, o, s, l, u, f, h, g), r[n + 1] = p(i, o, s, l, u, f, h, g);
        } var m, b, y; }, v.prototype._update = function (e, t) { this._prepareBlock(e, t); var r, n, i, s = this.W, c = this.h[0], l = this.h[1], d = this.h[2], p = this.h[3], b = this.h[4], y = this.h[5], v = this.h[6], P = this.h[7], M = this.h[8], C = this.h[9], L = this.h[10], F = this.h[11], O = this.h[12], x = this.h[13], N = this.h[14], R = this.h[15]; o(this.k.length === s.length); for (var I = 0; I < s.length; I += 2) {
            var D = N, J = R, _ = (i = void 0, (i = a(r = M, n = C, 14) ^ a(r, n, 18) ^ a(n, r, 9)) < 0 && (i += 4294967296), i), U = B(M, C), H = A(M, 0, L, 0, O), G = S(0, C, 0, F, 0, x), j = this.k[I], X = this.k[I + 1], V = s[I], z = s[I + 1], Z = g(D, J, _, U, H, G, j, X, V, z), K = m(D, J, _, U, H, G, j, X, V, z);
            D = T(c, l), J = k(c, l), _ = w(c, 0, d, 0, b), U = E(0, l, 0, p, 0, y);
            var q = f(D, J, _, U), Q = h(D, J, _, U);
            N = O, R = x, O = L, x = F, L = M, F = C, M = f(v, P, Z, K), C = h(P, P, Z, K), v = b, P = y, b = d, y = p, d = c, p = l, c = f(Z, K, q, Q), l = h(Z, K, q, Q);
        } u(this.h, 0, c, l), u(this.h, 2, d, p), u(this.h, 4, b, y), u(this.h, 6, v, P), u(this.h, 8, M, C), u(this.h, 10, L, F), u(this.h, 12, O, x), u(this.h, 14, N, R); }, v.prototype._digest = function (e) { return "hex" === e ? n.toHex32(this.h, "big") : n.split32(this.h, "big"); };
    }, 7038: (e, t, r) => {
        "use strict";
        var n = r(6436).rotr32;
        function i(e, t, r) { return e & t ^ ~e & r; }
        function o(e, t, r) { return e & t ^ e & r ^ t & r; }
        function a(e, t, r) { return e ^ t ^ r; }
        t.ft_1 = function (e, t, r, n) { return 0 === e ? i(t, r, n) : 1 === e || 3 === e ? a(t, r, n) : 2 === e ? o(t, r, n) : void 0; }, t.ch32 = i, t.maj32 = o, t.p32 = a, t.s0_256 = function (e) { return n(e, 2) ^ n(e, 13) ^ n(e, 22); }, t.s1_256 = function (e) { return n(e, 6) ^ n(e, 11) ^ n(e, 25); }, t.g0_256 = function (e) { return n(e, 7) ^ n(e, 18) ^ e >>> 3; }, t.g1_256 = function (e) { return n(e, 17) ^ n(e, 19) ^ e >>> 10; };
    }, 6436: (e, t, r) => {
        "use strict";
        var n = r(9746), i = r(5717);
        function o(e, t) { return 55296 == (64512 & e.charCodeAt(t)) && !(t < 0 || t + 1 >= e.length) && 56320 == (64512 & e.charCodeAt(t + 1)); }
        function a(e) { return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0; }
        function s(e) { return 1 === e.length ? "0" + e : e; }
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
                    var a = e.charCodeAt(i);
                    a < 128 ? r[n++] = a : a < 2048 ? (r[n++] = a >> 6 | 192, r[n++] = 63 & a | 128) : o(e, i) ? (a = 65536 + ((1023 & a) << 10) + (1023 & e.charCodeAt(++i)), r[n++] = a >> 18 | 240, r[n++] = a >> 12 & 63 | 128, r[n++] = a >> 6 & 63 | 128, r[n++] = 63 & a | 128) : (r[n++] = a >> 12 | 224, r[n++] = a >> 6 & 63 | 128, r[n++] = 63 & a | 128);
                }
        else
            for (i = 0; i < e.length; i++)
                r[i] = 0 | e[i]; return r; }, t.toHex = function (e) { for (var t = "", r = 0; r < e.length; r++)
            t += s(e[r].toString(16)); return t; }, t.htonl = a, t.toHex32 = function (e, t) { for (var r = "", n = 0; n < e.length; n++) {
            var i = e[n];
            "little" === t && (i = a(i)), r += c(i.toString(16));
        } return r; }, t.zero2 = s, t.zero8 = c, t.join32 = function (e, t, r, i) { var o = r - t; n(o % 4 == 0); for (var a = new Array(o / 4), s = 0, c = t; s < a.length; s++, c += 4) {
            var l;
            l = "big" === i ? e[c] << 24 | e[c + 1] << 16 | e[c + 2] << 8 | e[c + 3] : e[c + 3] << 24 | e[c + 2] << 16 | e[c + 1] << 8 | e[c], a[s] = l >>> 0;
        } return a; }, t.split32 = function (e, t) { for (var r = new Array(4 * e.length), n = 0, i = 0; n < e.length; n++, i += 4) {
            var o = e[n];
            "big" === t ? (r[i] = o >>> 24, r[i + 1] = o >>> 16 & 255, r[i + 2] = o >>> 8 & 255, r[i + 3] = 255 & o) : (r[i + 3] = o >>> 24, r[i + 2] = o >>> 16 & 255, r[i + 1] = o >>> 8 & 255, r[i] = 255 & o);
        } return r; }, t.rotr32 = function (e, t) { return e >>> t | e << 32 - t; }, t.rotl32 = function (e, t) { return e << t | e >>> 32 - t; }, t.sum32 = function (e, t) { return e + t >>> 0; }, t.sum32_3 = function (e, t, r) { return e + t + r >>> 0; }, t.sum32_4 = function (e, t, r, n) { return e + t + r + n >>> 0; }, t.sum32_5 = function (e, t, r, n, i) { return e + t + r + n + i >>> 0; }, t.sum64 = function (e, t, r, n) { var i = e[t], o = n + e[t + 1] >>> 0, a = (o < n ? 1 : 0) + r + i; e[t] = a >>> 0, e[t + 1] = o; }, t.sum64_hi = function (e, t, r, n) { return (t + n >>> 0 < t ? 1 : 0) + e + r >>> 0; }, t.sum64_lo = function (e, t, r, n) { return t + n >>> 0; }, t.sum64_4_hi = function (e, t, r, n, i, o, a, s) { var c = 0, l = t; return c += (l = l + n >>> 0) < t ? 1 : 0, c += (l = l + o >>> 0) < o ? 1 : 0, e + r + i + a + (c += (l = l + s >>> 0) < s ? 1 : 0) >>> 0; }, t.sum64_4_lo = function (e, t, r, n, i, o, a, s) { return t + n + o + s >>> 0; }, t.sum64_5_hi = function (e, t, r, n, i, o, a, s, c, l) { var u = 0, f = t; return u += (f = f + n >>> 0) < t ? 1 : 0, u += (f = f + o >>> 0) < o ? 1 : 0, u += (f = f + s >>> 0) < s ? 1 : 0, e + r + i + a + c + (u += (f = f + l >>> 0) < l ? 1 : 0) >>> 0; }, t.sum64_5_lo = function (e, t, r, n, i, o, a, s, c, l) { return t + n + o + s + l >>> 0; }, t.rotr64_hi = function (e, t, r) { return (t << 32 - r | e >>> r) >>> 0; }, t.rotr64_lo = function (e, t, r) { return (e << 32 - r | t >>> r) >>> 0; }, t.shr64_hi = function (e, t, r) { return e >>> r; }, t.shr64_lo = function (e, t, r) { return (e << 32 - r | t >>> r) >>> 0; };
    }, 2156: (e, t, r) => {
        "use strict";
        var n = r(3715), i = r(4504), o = r(9746);
        function a(e) { if (!(this instanceof a))
            return new a(e); this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null; var t = i.toArray(e.entropy, e.entropyEnc || "hex"), r = i.toArray(e.nonce, e.nonceEnc || "hex"), n = i.toArray(e.pers, e.persEnc || "hex"); o(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(t, r, n); }
        e.exports = a, a.prototype._init = function (e, t, r) { var n = e.concat(t).concat(r); this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8); for (var i = 0; i < this.V.length; i++)
            this.K[i] = 0, this.V[i] = 1; this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656; }, a.prototype._hmac = function () { return new n.hmac(this.hash, this.K); }, a.prototype._update = function (e) { var t = this._hmac().update(this.V).update([0]); e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest()); }, a.prototype.reseed = function (e, t, r, n) { "string" != typeof t && (n = r, r = t, t = null), e = i.toArray(e, t), r = i.toArray(r, n), o(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(e.concat(r || [])), this._reseed = 1; }, a.prototype.generate = function (e, t, r, n) { if (this._reseed > this.reseedInterval)
            throw new Error("Reseed is required"); "string" != typeof t && (n = r, r = t, t = null), r && (r = i.toArray(r, n || "hex"), this._update(r)); for (var o = []; o.length < e;)
            this.V = this._hmac().update(this.V).digest(), o = o.concat(this.V); var a = o.slice(0, e); return this._update(r), this._reseed++, i.encode(a, t); };
    }, 5717: e => { "function" == typeof Object.create ? e.exports = function (e, t) { t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })); } : e.exports = function (e, t) { if (t) {
        e.super_ = t;
        var r = function () { };
        r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e;
    } }; }, 9496: (e, t, r) => {
        "use strict";
        var n = r(210), i = r(7642), o = r(7478)(), a = n("%TypeError%"), s = { assert: function (e, t) { if (!e || "object" != typeof e && "function" != typeof e)
                throw new a("`O` is not an object"); if ("string" != typeof t)
                throw new a("`slot` must be a string"); o.assert(e); }, get: function (e, t) { if (!e || "object" != typeof e && "function" != typeof e)
                throw new a("`O` is not an object"); if ("string" != typeof t)
                throw new a("`slot` must be a string"); var r = o.get(e); return r && r["$" + t]; }, has: function (e, t) { if (!e || "object" != typeof e && "function" != typeof e)
                throw new a("`O` is not an object"); if ("string" != typeof t)
                throw new a("`slot` must be a string"); var r = o.get(e); return !!r && i(r, "$" + t); }, set: function (e, t, r) { if (!e || "object" != typeof e && "function" != typeof e)
                throw new a("`O` is not an object"); if ("string" != typeof t)
                throw new a("`slot` must be a string"); var n = o.get(e); n || (n = {}, o.set(e, n)), n["$" + t] = r; } };
        Object.freeze && Object.freeze(s), e.exports = s;
    }, 5320: e => {
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
        var o = /^\s*class\b/, a = function (e) { try {
            var t = n.call(e);
            return o.test(t);
        }
        catch (e) {
            return !1;
        } }, s = Object.prototype.toString, c = "function" == typeof Symbol && !!Symbol.toStringTag, l = "object" == typeof document && void 0 === document.all && void 0 !== document.all ? document.all : {};
        e.exports = i ? function (e) { if (e === l)
            return !0; if (!e)
            return !1; if ("function" != typeof e && "object" != typeof e)
            return !1; if ("function" == typeof e && !e.prototype)
            return !0; try {
            i(e, null, t);
        }
        catch (e) {
            if (e !== r)
                return !1;
        } return !a(e); } : function (e) { if (e === l)
            return !0; if (!e)
            return !1; if ("function" != typeof e && "object" != typeof e)
            return !1; if ("function" == typeof e && !e.prototype)
            return !0; if (c)
            return function (e) { try {
                return !a(e) && (n.call(e), !0);
            }
            catch (e) {
                return !1;
            } }(e); if (a(e))
            return !1; var t = s.call(e); return "[object Function]" === t || "[object GeneratorFunction]" === t; };
    }, 8923: (e, t, r) => {
        "use strict";
        var n = Date.prototype.getDay, i = Object.prototype.toString, o = r(6410)();
        e.exports = function (e) { return "object" == typeof e && null !== e && (o ? function (e) { try {
            return n.call(e), !0;
        }
        catch (e) {
            return !1;
        } }(e) : "[object Date]" === i.call(e)); };
    }, 8420: (e, t, r) => {
        "use strict";
        var n, i, o, a, s = r(1924), c = r(6410)();
        if (c) {
            n = s("Object.prototype.hasOwnProperty"), i = s("RegExp.prototype.exec"), o = {};
            var l = function () { throw o; };
            a = { toString: l, valueOf: l }, "symbol" == typeof Symbol.toPrimitive && (a[Symbol.toPrimitive] = l);
        }
        var u = s("Object.prototype.toString"), f = Object.getOwnPropertyDescriptor;
        e.exports = c ? function (e) { if (!e || "object" != typeof e)
            return !1; var t = f(e, "lastIndex"); if (!t || !n(t, "value"))
            return !1; try {
            i(e, a);
        }
        catch (e) {
            return e === o;
        } } : function (e) { return !(!e || "object" != typeof e && "function" != typeof e) && "[object RegExp]" === u(e); };
    }, 2636: (e, t, r) => {
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
    }, 1094: (e, t, r) => { var n; !function () {
        "use strict";
        var i = "input is invalid type", o = "object" == typeof window, a = o ? window : {};
        a.JS_SHA3_NO_WINDOW && (o = !1);
        var s = !o && "object" == typeof self;
        !a.JS_SHA3_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node ? a = r.g : s && (a = self);
        var c = !a.JS_SHA3_NO_COMMON_JS && e.exports, l = r.amdO, u = !a.JS_SHA3_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, f = "0123456789abcdef".split(""), h = [4, 1024, 262144, 67108864], d = [0, 8, 16, 24], p = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648], g = [224, 256, 384, 512], m = [128, 256], b = ["hex", "buffer", "arrayBuffer", "array", "digest"], y = { 128: 168, 256: 136 };
        !a.JS_SHA3_NO_NODE_JS && Array.isArray || (Array.isArray = function (e) { return "[object Array]" === Object.prototype.toString.call(e); }), !u || !a.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function (e) { return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer; });
        for (var v = function (e, t, r) { return function (n) { return new N(e, t, e).update(n)[r](); }; }, A = function (e, t, r) { return function (n, i) { return new N(e, t, i).update(n)[r](); }; }, S = function (e, t, r) { return function (t, n, i, o) { return B["cshake" + e].update(t, n, i, o)[r](); }; }, w = function (e, t, r) { return function (t, n, i, o) { return B["kmac" + e].update(t, n, i, o)[r](); }; }, E = function (e, t, r, n) { for (var i = 0; i < b.length; ++i) {
            var o = b[i];
            e[o] = t(r, n, o);
        } return e; }, T = function (e, t) { var r = v(e, t, "hex"); return r.create = function () { return new N(e, t, e); }, r.update = function (e) { return r.create().update(e); }, E(r, v, e, t); }, k = [{ name: "keccak", padding: [1, 256, 65536, 16777216], bits: g, createMethod: T }, { name: "sha3", padding: [6, 1536, 393216, 100663296], bits: g, createMethod: T }, { name: "shake", padding: [31, 7936, 2031616, 520093696], bits: m, createMethod: function (e, t) { var r = A(e, t, "hex"); return r.create = function (r) { return new N(e, t, r); }, r.update = function (e, t) { return r.create(t).update(e); }, E(r, A, e, t); } }, { name: "cshake", padding: h, bits: m, createMethod: function (e, t) { var r = y[e], n = S(e, 0, "hex"); return n.create = function (n, i, o) { return i || o ? new N(e, t, n).bytepad([i, o], r) : B["shake" + e].create(n); }, n.update = function (e, t, r, i) { return n.create(t, r, i).update(e); }, E(n, S, e, t); } }, { name: "kmac", padding: h, bits: m, createMethod: function (e, t) { var r = y[e], n = w(e, 0, "hex"); return n.create = function (n, i, o) { return new R(e, t, i).bytepad(["KMAC", o], r).bytepad([n], r); }, n.update = function (e, t, r, i) { return n.create(e, r, i).update(t); }, E(n, w, e, t); } }], B = {}, P = [], M = 0; M < k.length; ++M)
            for (var C = k[M], L = C.bits, F = 0; F < L.length; ++F) {
                var O = C.name + "_" + L[F];
                if (P.push(O), B[O] = C.createMethod(L[F], C.padding), "sha3" !== C.name) {
                    var x = C.name + L[F];
                    P.push(x), B[x] = B[O];
                }
            }
        function N(e, t, r) { this.blocks = [], this.s = [], this.padding = t, this.outputBits = r, this.reset = !0, this.finalized = !1, this.block = 0, this.start = 0, this.blockCount = 1600 - (e << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = r >> 5, this.extraBytes = (31 & r) >> 3; for (var n = 0; n < 50; ++n)
            this.s[n] = 0; }
        function R(e, t, r) { N.call(this, e, t, r); }
        N.prototype.update = function (e) { if (this.finalized)
            throw new Error("finalize already called"); var t, r = typeof e; if ("string" !== r) {
            if ("object" !== r)
                throw new Error(i);
            if (null === e)
                throw new Error(i);
            if (u && e.constructor === ArrayBuffer)
                e = new Uint8Array(e);
            else if (!(Array.isArray(e) || u && ArrayBuffer.isView(e)))
                throw new Error(i);
            t = !0;
        } for (var n, o, a = this.blocks, s = this.byteCount, c = e.length, l = this.blockCount, f = 0, h = this.s; f < c;) {
            if (this.reset)
                for (this.reset = !1, a[0] = this.block, n = 1; n < l + 1; ++n)
                    a[n] = 0;
            if (t)
                for (n = this.start; f < c && n < s; ++f)
                    a[n >> 2] |= e[f] << d[3 & n++];
            else
                for (n = this.start; f < c && n < s; ++f)
                    (o = e.charCodeAt(f)) < 128 ? a[n >> 2] |= o << d[3 & n++] : o < 2048 ? (a[n >> 2] |= (192 | o >> 6) << d[3 & n++], a[n >> 2] |= (128 | 63 & o) << d[3 & n++]) : o < 55296 || o >= 57344 ? (a[n >> 2] |= (224 | o >> 12) << d[3 & n++], a[n >> 2] |= (128 | o >> 6 & 63) << d[3 & n++], a[n >> 2] |= (128 | 63 & o) << d[3 & n++]) : (o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(++f)), a[n >> 2] |= (240 | o >> 18) << d[3 & n++], a[n >> 2] |= (128 | o >> 12 & 63) << d[3 & n++], a[n >> 2] |= (128 | o >> 6 & 63) << d[3 & n++], a[n >> 2] |= (128 | 63 & o) << d[3 & n++]);
            if (this.lastByteIndex = n, n >= s) {
                for (this.start = n - s, this.block = a[l], n = 0; n < l; ++n)
                    h[n] ^= a[n];
                I(h), this.reset = !0;
            }
            else
                this.start = n;
        } return this; }, N.prototype.encode = function (e, t) { var r = 255 & e, n = 1, i = [r]; for (r = 255 & (e >>= 8); r > 0;)
            i.unshift(r), r = 255 & (e >>= 8), ++n; return t ? i.push(n) : i.unshift(n), this.update(i), i.length; }, N.prototype.encodeString = function (e) { var t, r = typeof e; if ("string" !== r) {
            if ("object" !== r)
                throw new Error(i);
            if (null === e)
                throw new Error(i);
            if (u && e.constructor === ArrayBuffer)
                e = new Uint8Array(e);
            else if (!(Array.isArray(e) || u && ArrayBuffer.isView(e)))
                throw new Error(i);
            t = !0;
        } var n = 0, o = e.length; if (t)
            n = o;
        else
            for (var a = 0; a < e.length; ++a) {
                var s = e.charCodeAt(a);
                s < 128 ? n += 1 : s < 2048 ? n += 2 : s < 55296 || s >= 57344 ? n += 3 : (s = 65536 + ((1023 & s) << 10 | 1023 & e.charCodeAt(++a)), n += 4);
            } return n += this.encode(8 * n), this.update(e), n; }, N.prototype.bytepad = function (e, t) { for (var r = this.encode(t), n = 0; n < e.length; ++n)
            r += this.encodeString(e[n]); var i = t - r % t, o = []; return o.length = i, this.update(o), this; }, N.prototype.finalize = function () { if (!this.finalized) {
            this.finalized = !0;
            var e = this.blocks, t = this.lastByteIndex, r = this.blockCount, n = this.s;
            if (e[t >> 2] |= this.padding[3 & t], this.lastByteIndex === this.byteCount)
                for (e[0] = e[r], t = 1; t < r + 1; ++t)
                    e[t] = 0;
            for (e[r - 1] |= 2147483648, t = 0; t < r; ++t)
                n[t] ^= e[t];
            I(n);
        } }, N.prototype.toString = N.prototype.hex = function () { this.finalize(); for (var e, t = this.blockCount, r = this.s, n = this.outputBlocks, i = this.extraBytes, o = 0, a = 0, s = ""; a < n;) {
            for (o = 0; o < t && a < n; ++o, ++a)
                e = r[o], s += f[e >> 4 & 15] + f[15 & e] + f[e >> 12 & 15] + f[e >> 8 & 15] + f[e >> 20 & 15] + f[e >> 16 & 15] + f[e >> 28 & 15] + f[e >> 24 & 15];
            a % t == 0 && (I(r), o = 0);
        } return i && (e = r[o], s += f[e >> 4 & 15] + f[15 & e], i > 1 && (s += f[e >> 12 & 15] + f[e >> 8 & 15]), i > 2 && (s += f[e >> 20 & 15] + f[e >> 16 & 15])), s; }, N.prototype.arrayBuffer = function () { this.finalize(); var e, t = this.blockCount, r = this.s, n = this.outputBlocks, i = this.extraBytes, o = 0, a = 0, s = this.outputBits >> 3; e = i ? new ArrayBuffer(n + 1 << 2) : new ArrayBuffer(s); for (var c = new Uint32Array(e); a < n;) {
            for (o = 0; o < t && a < n; ++o, ++a)
                c[a] = r[o];
            a % t == 0 && I(r);
        } return i && (c[o] = r[o], e = e.slice(0, s)), e; }, N.prototype.buffer = N.prototype.arrayBuffer, N.prototype.digest = N.prototype.array = function () { this.finalize(); for (var e, t, r = this.blockCount, n = this.s, i = this.outputBlocks, o = this.extraBytes, a = 0, s = 0, c = []; s < i;) {
            for (a = 0; a < r && s < i; ++a, ++s)
                e = s << 2, t = n[a], c[e] = 255 & t, c[e + 1] = t >> 8 & 255, c[e + 2] = t >> 16 & 255, c[e + 3] = t >> 24 & 255;
            s % r == 0 && I(n);
        } return o && (e = s << 2, t = n[a], c[e] = 255 & t, o > 1 && (c[e + 1] = t >> 8 & 255), o > 2 && (c[e + 2] = t >> 16 & 255)), c; }, R.prototype = new N, R.prototype.finalize = function () { return this.encode(this.outputBits, !0), N.prototype.finalize.call(this); };
        var I = function (e) { var t, r, n, i, o, a, s, c, l, u, f, h, d, g, m, b, y, v, A, S, w, E, T, k, B, P, M, C, L, F, O, x, N, R, I, D, J, _, U, H, G, j, X, V, z, Z, K, q, Q, W, Y, $, ee, te, re, ne, ie, oe, ae, se, ce, le, ue; for (n = 0; n < 48; n += 2)
            i = e[0] ^ e[10] ^ e[20] ^ e[30] ^ e[40], o = e[1] ^ e[11] ^ e[21] ^ e[31] ^ e[41], a = e[2] ^ e[12] ^ e[22] ^ e[32] ^ e[42], s = e[3] ^ e[13] ^ e[23] ^ e[33] ^ e[43], c = e[4] ^ e[14] ^ e[24] ^ e[34] ^ e[44], l = e[5] ^ e[15] ^ e[25] ^ e[35] ^ e[45], u = e[6] ^ e[16] ^ e[26] ^ e[36] ^ e[46], f = e[7] ^ e[17] ^ e[27] ^ e[37] ^ e[47], t = (h = e[8] ^ e[18] ^ e[28] ^ e[38] ^ e[48]) ^ (a << 1 | s >>> 31), r = (d = e[9] ^ e[19] ^ e[29] ^ e[39] ^ e[49]) ^ (s << 1 | a >>> 31), e[0] ^= t, e[1] ^= r, e[10] ^= t, e[11] ^= r, e[20] ^= t, e[21] ^= r, e[30] ^= t, e[31] ^= r, e[40] ^= t, e[41] ^= r, t = i ^ (c << 1 | l >>> 31), r = o ^ (l << 1 | c >>> 31), e[2] ^= t, e[3] ^= r, e[12] ^= t, e[13] ^= r, e[22] ^= t, e[23] ^= r, e[32] ^= t, e[33] ^= r, e[42] ^= t, e[43] ^= r, t = a ^ (u << 1 | f >>> 31), r = s ^ (f << 1 | u >>> 31), e[4] ^= t, e[5] ^= r, e[14] ^= t, e[15] ^= r, e[24] ^= t, e[25] ^= r, e[34] ^= t, e[35] ^= r, e[44] ^= t, e[45] ^= r, t = c ^ (h << 1 | d >>> 31), r = l ^ (d << 1 | h >>> 31), e[6] ^= t, e[7] ^= r, e[16] ^= t, e[17] ^= r, e[26] ^= t, e[27] ^= r, e[36] ^= t, e[37] ^= r, e[46] ^= t, e[47] ^= r, t = u ^ (i << 1 | o >>> 31), r = f ^ (o << 1 | i >>> 31), e[8] ^= t, e[9] ^= r, e[18] ^= t, e[19] ^= r, e[28] ^= t, e[29] ^= r, e[38] ^= t, e[39] ^= r, e[48] ^= t, e[49] ^= r, g = e[0], m = e[1], Z = e[11] << 4 | e[10] >>> 28, K = e[10] << 4 | e[11] >>> 28, C = e[20] << 3 | e[21] >>> 29, L = e[21] << 3 | e[20] >>> 29, se = e[31] << 9 | e[30] >>> 23, ce = e[30] << 9 | e[31] >>> 23, j = e[40] << 18 | e[41] >>> 14, X = e[41] << 18 | e[40] >>> 14, R = e[2] << 1 | e[3] >>> 31, I = e[3] << 1 | e[2] >>> 31, b = e[13] << 12 | e[12] >>> 20, y = e[12] << 12 | e[13] >>> 20, q = e[22] << 10 | e[23] >>> 22, Q = e[23] << 10 | e[22] >>> 22, F = e[33] << 13 | e[32] >>> 19, O = e[32] << 13 | e[33] >>> 19, le = e[42] << 2 | e[43] >>> 30, ue = e[43] << 2 | e[42] >>> 30, te = e[5] << 30 | e[4] >>> 2, re = e[4] << 30 | e[5] >>> 2, D = e[14] << 6 | e[15] >>> 26, J = e[15] << 6 | e[14] >>> 26, v = e[25] << 11 | e[24] >>> 21, A = e[24] << 11 | e[25] >>> 21, W = e[34] << 15 | e[35] >>> 17, Y = e[35] << 15 | e[34] >>> 17, x = e[45] << 29 | e[44] >>> 3, N = e[44] << 29 | e[45] >>> 3, k = e[6] << 28 | e[7] >>> 4, B = e[7] << 28 | e[6] >>> 4, ne = e[17] << 23 | e[16] >>> 9, ie = e[16] << 23 | e[17] >>> 9, _ = e[26] << 25 | e[27] >>> 7, U = e[27] << 25 | e[26] >>> 7, S = e[36] << 21 | e[37] >>> 11, w = e[37] << 21 | e[36] >>> 11, $ = e[47] << 24 | e[46] >>> 8, ee = e[46] << 24 | e[47] >>> 8, V = e[8] << 27 | e[9] >>> 5, z = e[9] << 27 | e[8] >>> 5, P = e[18] << 20 | e[19] >>> 12, M = e[19] << 20 | e[18] >>> 12, oe = e[29] << 7 | e[28] >>> 25, ae = e[28] << 7 | e[29] >>> 25, H = e[38] << 8 | e[39] >>> 24, G = e[39] << 8 | e[38] >>> 24, E = e[48] << 14 | e[49] >>> 18, T = e[49] << 14 | e[48] >>> 18, e[0] = g ^ ~b & v, e[1] = m ^ ~y & A, e[10] = k ^ ~P & C, e[11] = B ^ ~M & L, e[20] = R ^ ~D & _, e[21] = I ^ ~J & U, e[30] = V ^ ~Z & q, e[31] = z ^ ~K & Q, e[40] = te ^ ~ne & oe, e[41] = re ^ ~ie & ae, e[2] = b ^ ~v & S, e[3] = y ^ ~A & w, e[12] = P ^ ~C & F, e[13] = M ^ ~L & O, e[22] = D ^ ~_ & H, e[23] = J ^ ~U & G, e[32] = Z ^ ~q & W, e[33] = K ^ ~Q & Y, e[42] = ne ^ ~oe & se, e[43] = ie ^ ~ae & ce, e[4] = v ^ ~S & E, e[5] = A ^ ~w & T, e[14] = C ^ ~F & x, e[15] = L ^ ~O & N, e[24] = _ ^ ~H & j, e[25] = U ^ ~G & X, e[34] = q ^ ~W & $, e[35] = Q ^ ~Y & ee, e[44] = oe ^ ~se & le, e[45] = ae ^ ~ce & ue, e[6] = S ^ ~E & g, e[7] = w ^ ~T & m, e[16] = F ^ ~x & k, e[17] = O ^ ~N & B, e[26] = H ^ ~j & R, e[27] = G ^ ~X & I, e[36] = W ^ ~$ & V, e[37] = Y ^ ~ee & z, e[46] = se ^ ~le & te, e[47] = ce ^ ~ue & re, e[8] = E ^ ~g & b, e[9] = T ^ ~m & y, e[18] = x ^ ~k & P, e[19] = N ^ ~B & M, e[28] = j ^ ~R & D, e[29] = X ^ ~I & J, e[38] = $ ^ ~V & Z, e[39] = ee ^ ~z & K, e[48] = le ^ ~te & ne, e[49] = ue ^ ~re & ie, e[0] ^= p[n], e[1] ^= p[n + 1]; };
        if (c)
            e.exports = B;
        else {
            for (M = 0; M < P.length; ++M)
                a[P[M]] = B[P[M]];
            l && (void 0 === (n = function () { return B; }.call(t, r, t, e)) || (e.exports = n));
        }
    }(); }, 9746: e => { function t(e, t) { if (!e)
        throw new Error(t || "Assertion failed"); } e.exports = t, t.equal = function (e, t, r) { if (e != t)
        throw new Error(r || "Assertion failed: " + e + " != " + t); }; }, 4504: (e, t) => {
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
                var i = e.charCodeAt(n), o = i >> 8, a = 255 & i;
                o ? r.push(o, a) : r.push(a);
            } return r; }, r.zero2 = n, r.toHex = i, r.encode = function (e, t) { return "hex" === t ? i(e) : e; };
    }, 631: (e, t, r) => { var n = "function" == typeof Map && Map.prototype, i = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, o = n && i && "function" == typeof i.get ? i.get : null, a = n && Map.prototype.forEach, s = "function" == typeof Set && Set.prototype, c = Object.getOwnPropertyDescriptor && s ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, l = s && c && "function" == typeof c.get ? c.get : null, u = s && Set.prototype.forEach, f = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null, h = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null, d = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null, p = Boolean.prototype.valueOf, g = Object.prototype.toString, m = Function.prototype.toString, b = String.prototype.match, y = "function" == typeof BigInt ? BigInt.prototype.valueOf : null, v = Object.getOwnPropertySymbols, A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null, S = "function" == typeof Symbol && "object" == typeof Symbol.iterator, w = Object.prototype.propertyIsEnumerable, E = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function (e) { return e.__proto__; } : null), T = r(4654).custom, k = T && L(T) ? T : null, B = "function" == typeof Symbol && void 0 !== Symbol.toStringTag ? Symbol.toStringTag : null; function P(e, t, r) { var n = "double" === (r.quoteStyle || t) ? '"' : "'"; return n + e + n; } function M(e) { return String(e).replace(/"/g, "&quot;"); } function C(e) { return !("[object Array]" !== x(e) || B && "object" == typeof e && B in e); } function L(e) { if (S)
        return e && "object" == typeof e && e instanceof Symbol; if ("symbol" == typeof e)
        return !0; if (!e || "object" != typeof e || !A)
        return !1; try {
        return A.call(e), !0;
    }
    catch (e) { } return !1; } e.exports = function e(t, r, n, i) { var s = r || {}; if (O(s, "quoteStyle") && "single" !== s.quoteStyle && "double" !== s.quoteStyle)
        throw new TypeError('option "quoteStyle" must be "single" or "double"'); if (O(s, "maxStringLength") && ("number" == typeof s.maxStringLength ? s.maxStringLength < 0 && s.maxStringLength !== 1 / 0 : null !== s.maxStringLength))
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'); var c = !O(s, "customInspect") || s.customInspect; if ("boolean" != typeof c && "symbol" !== c)
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"); if (O(s, "indent") && null !== s.indent && "\t" !== s.indent && !(parseInt(s.indent, 10) === s.indent && s.indent > 0))
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`'); if (void 0 === t)
        return "undefined"; if (null === t)
        return "null"; if ("boolean" == typeof t)
        return t ? "true" : "false"; if ("string" == typeof t)
        return R(t, s); if ("number" == typeof t)
        return 0 === t ? 1 / 0 / t > 0 ? "0" : "-0" : String(t); if ("bigint" == typeof t)
        return String(t) + "n"; var g = void 0 === s.depth ? 5 : s.depth; if (void 0 === n && (n = 0), n >= g && g > 0 && "object" == typeof t)
        return C(t) ? "[Array]" : "[Object]"; var v, w = function (e, t) { var r; if ("\t" === e.indent)
        r = "\t";
    else {
        if (!("number" == typeof e.indent && e.indent > 0))
            return null;
        r = Array(e.indent + 1).join(" ");
    } return { base: r, prev: Array(t + 1).join(r) }; }(s, n); if (void 0 === i)
        i = [];
    else if (N(i, t) >= 0)
        return "[Circular]"; function T(t, r, o) { if (r && (i = i.slice()).push(r), o) {
        var a = { depth: s.depth };
        return O(s, "quoteStyle") && (a.quoteStyle = s.quoteStyle), e(t, a, n + 1, i);
    } return e(t, s, n + 1, i); } if ("function" == typeof t) {
        var F = function (e) { if (e.name)
            return e.name; var t = b.call(m.call(e), /^function\s*([\w$]+)/); return t ? t[1] : null; }(t), I = H(t, T);
        return "[Function" + (F ? ": " + F : " (anonymous)") + "]" + (I.length > 0 ? " { " + I.join(", ") + " }" : "");
    } if (L(t)) {
        var G = S ? String(t).replace(/^(Symbol\(.*\))_[^)]*$/, "$1") : A.call(t);
        return "object" != typeof t || S ? G : D(G);
    } if ((v = t) && "object" == typeof v && ("undefined" != typeof HTMLElement && v instanceof HTMLElement || "string" == typeof v.nodeName && "function" == typeof v.getAttribute)) {
        for (var j = "<" + String(t.nodeName).toLowerCase(), X = t.attributes || [], V = 0; V < X.length; V++)
            j += " " + X[V].name + "=" + P(M(X[V].value), "double", s);
        return j += ">", t.childNodes && t.childNodes.length && (j += "..."), j + "</" + String(t.nodeName).toLowerCase() + ">";
    } if (C(t)) {
        if (0 === t.length)
            return "[]";
        var z = H(t, T);
        return w && !function (e) { for (var t = 0; t < e.length; t++)
            if (N(e[t], "\n") >= 0)
                return !1; return !0; }(z) ? "[" + U(z, w) + "]" : "[ " + z.join(", ") + " ]";
    } if (function (e) { return !("[object Error]" !== x(e) || B && "object" == typeof e && B in e); }(t)) {
        var Z = H(t, T);
        return 0 === Z.length ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + Z.join(", ") + " }";
    } if ("object" == typeof t && c) {
        if (k && "function" == typeof t[k])
            return t[k]();
        if ("symbol" !== c && "function" == typeof t.inspect)
            return t.inspect();
    } if (function (e) { if (!o || !e || "object" != typeof e)
        return !1; try {
        o.call(e);
        try {
            l.call(e);
        }
        catch (e) {
            return !0;
        }
        return e instanceof Map;
    }
    catch (e) { } return !1; }(t)) {
        var K = [];
        return a.call(t, (function (e, r) { K.push(T(r, t, !0) + " => " + T(e, t)); })), _("Map", o.call(t), K, w);
    } if (function (e) { if (!l || !e || "object" != typeof e)
        return !1; try {
        l.call(e);
        try {
            o.call(e);
        }
        catch (e) {
            return !0;
        }
        return e instanceof Set;
    }
    catch (e) { } return !1; }(t)) {
        var q = [];
        return u.call(t, (function (e) { q.push(T(e, t)); })), _("Set", l.call(t), q, w);
    } if (function (e) { if (!f || !e || "object" != typeof e)
        return !1; try {
        f.call(e, f);
        try {
            h.call(e, h);
        }
        catch (e) {
            return !0;
        }
        return e instanceof WeakMap;
    }
    catch (e) { } return !1; }(t))
        return J("WeakMap"); if (function (e) { if (!h || !e || "object" != typeof e)
        return !1; try {
        h.call(e, h);
        try {
            f.call(e, f);
        }
        catch (e) {
            return !0;
        }
        return e instanceof WeakSet;
    }
    catch (e) { } return !1; }(t))
        return J("WeakSet"); if (function (e) { if (!d || !e || "object" != typeof e)
        return !1; try {
        return d.call(e), !0;
    }
    catch (e) { } return !1; }(t))
        return J("WeakRef"); if (function (e) { return !("[object Number]" !== x(e) || B && "object" == typeof e && B in e); }(t))
        return D(T(Number(t))); if (function (e) { if (!e || "object" != typeof e || !y)
        return !1; try {
        return y.call(e), !0;
    }
    catch (e) { } return !1; }(t))
        return D(T(y.call(t))); if (function (e) { return !("[object Boolean]" !== x(e) || B && "object" == typeof e && B in e); }(t))
        return D(p.call(t)); if (function (e) { return !("[object String]" !== x(e) || B && "object" == typeof e && B in e); }(t))
        return D(T(String(t))); if (!function (e) { return !("[object Date]" !== x(e) || B && "object" == typeof e && B in e); }(t) && !function (e) { return !("[object RegExp]" !== x(e) || B && "object" == typeof e && B in e); }(t)) {
        var Q = H(t, T), W = E ? E(t) === Object.prototype : t instanceof Object || t.constructor === Object, Y = t instanceof Object ? "" : "null prototype", $ = !W && B && Object(t) === t && B in t ? x(t).slice(8, -1) : Y ? "Object" : "", ee = (W || "function" != typeof t.constructor ? "" : t.constructor.name ? t.constructor.name + " " : "") + ($ || Y ? "[" + [].concat($ || [], Y || []).join(": ") + "] " : "");
        return 0 === Q.length ? ee + "{}" : w ? ee + "{" + U(Q, w) + "}" : ee + "{ " + Q.join(", ") + " }";
    } return String(t); }; var F = Object.prototype.hasOwnProperty || function (e) { return e in this; }; function O(e, t) { return F.call(e, t); } function x(e) { return g.call(e); } function N(e, t) { if (e.indexOf)
        return e.indexOf(t); for (var r = 0, n = e.length; r < n; r++)
        if (e[r] === t)
            return r; return -1; } function R(e, t) { if (e.length > t.maxStringLength) {
        var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
        return R(e.slice(0, t.maxStringLength), t) + n;
    } return P(e.replace(/(['\\])/g, "\\$1").replace(/[\x00-\x1f]/g, I), "single", t); } function I(e) { var t = e.charCodeAt(0), r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[t]; return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + t.toString(16).toUpperCase(); } function D(e) { return "Object(" + e + ")"; } function J(e) { return e + " { ? }"; } function _(e, t, r, n) { return e + " (" + t + ") {" + (n ? U(r, n) : r.join(", ")) + "}"; } function U(e, t) { if (0 === e.length)
        return ""; var r = "\n" + t.prev + t.base; return r + e.join("," + r) + "\n" + t.prev; } function H(e, t) { var r = C(e), n = []; if (r) {
        n.length = e.length;
        for (var i = 0; i < e.length; i++)
            n[i] = O(e, i) ? t(e[i], e) : "";
    } var o, a = "function" == typeof v ? v(e) : []; if (S) {
        o = {};
        for (var s = 0; s < a.length; s++)
            o["$" + a[s]] = a[s];
    } for (var c in e)
        O(e, c) && (r && String(Number(c)) === c && c < e.length || S && o["$" + c] instanceof Symbol || (/[^\w$]/.test(c) ? n.push(t(c, e) + ": " + t(e[c], e)) : n.push(c + ": " + t(e[c], e)))); if ("function" == typeof v)
        for (var l = 0; l < a.length; l++)
            w.call(e, a[l]) && n.push("[" + t(a[l]) + "]: " + t(e[a[l]], e)); return n; } }, 8987: (e, t, r) => {
        "use strict";
        var n;
        if (!Object.keys) {
            var i = Object.prototype.hasOwnProperty, o = Object.prototype.toString, a = r(1414), s = Object.prototype.propertyIsEnumerable, c = !s.call({ toString: null }, "toString"), l = s.call((function () { }), "prototype"), u = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], f = function (e) { var t = e.constructor; return t && t.prototype === e; }, h = { $applicationCache: !0, $console: !0, $external: !0, $frame: !0, $frameElement: !0, $frames: !0, $innerHeight: !0, $innerWidth: !0, $onmozfullscreenchange: !0, $onmozfullscreenerror: !0, $outerHeight: !0, $outerWidth: !0, $pageXOffset: !0, $pageYOffset: !0, $parent: !0, $scrollLeft: !0, $scrollTop: !0, $scrollX: !0, $scrollY: !0, $self: !0, $webkitIndexedDB: !0, $webkitStorageInfo: !0, $window: !0 }, d = function () { if ("undefined" == typeof window)
                return !1; for (var e in window)
                try {
                    if (!h["$" + e] && i.call(window, e) && null !== window[e] && "object" == typeof window[e])
                        try {
                            f(window[e]);
                        }
                        catch (e) {
                            return !0;
                        }
                }
                catch (e) {
                    return !0;
                } return !1; }();
            n = function (e) { var t = null !== e && "object" == typeof e, r = "[object Function]" === o.call(e), n = a(e), s = t && "[object String]" === o.call(e), h = []; if (!t && !r && !n)
                throw new TypeError("Object.keys called on a non-object"); var p = l && r; if (s && e.length > 0 && !i.call(e, 0))
                for (var g = 0; g < e.length; ++g)
                    h.push(String(g)); if (n && e.length > 0)
                for (var m = 0; m < e.length; ++m)
                    h.push(String(m));
            else
                for (var b in e)
                    p && "prototype" === b || !i.call(e, b) || h.push(String(b)); if (c)
                for (var y = function (e) { if ("undefined" == typeof window || !d)
                    return f(e); try {
                    return f(e);
                }
                catch (e) {
                    return !1;
                } }(e), v = 0; v < u.length; ++v)
                    y && "constructor" === u[v] || !i.call(e, u[v]) || h.push(u[v]); return h; };
        }
        e.exports = n;
    }, 2215: (e, t, r) => {
        "use strict";
        var n = Array.prototype.slice, i = r(1414), o = Object.keys, a = o ? function (e) { return o(e); } : r(8987), s = Object.keys;
        a.shim = function () { if (Object.keys) {
            var e = function () { var e = Object.keys(arguments); return e && e.length === arguments.length; }(1, 2);
            e || (Object.keys = function (e) { return i(e) ? s(n.call(e)) : s(e); });
        }
        else
            Object.keys = a; return Object.keys || a; }, e.exports = a;
    }, 1414: e => {
        "use strict";
        var t = Object.prototype.toString;
        e.exports = function (e) { var r = t.call(e), n = "[object Arguments]" === r; return n || (n = "[object Array]" !== r && null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Function]" === t.call(e.callee)), n; };
    }, 2043: function (e, t) { !function (e) {
        "use strict";
        class t {
            static isArrayBuffer(e) { return "[object ArrayBuffer]" === Object.prototype.toString.call(e); }
            static toArrayBuffer(e) { const t = this.toUint8Array(e); return t.byteOffset || t.length ? t.buffer.slice(t.byteOffset, t.byteOffset + t.length) : t.buffer; }
            static toUint8Array(e) { return this.toView(e, Uint8Array); }
            static toView(e, t) { if ("undefined" != typeof Buffer && Buffer.isBuffer(e))
                return new t(e.buffer, e.byteOffset, e.byteLength); if (this.isArrayBuffer(e))
                return new t(e); if (this.isArrayBufferView(e))
                return new t(e.buffer, e.byteOffset, e.byteLength); throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'"); }
            static isBufferSource(e) { return this.isArrayBufferView(e) || this.isArrayBuffer(e); }
            static isArrayBufferView(e) { return ArrayBuffer.isView(e) || e && this.isArrayBuffer(e.buffer); }
            static isEqual(e, r) { const n = t.toUint8Array(e), i = t.toUint8Array(r); if (n.length !== i.byteLength)
                return !1; for (let e = 0; e < n.length; e++)
                if (n[e] !== i[e])
                    return !1; return !0; }
        }
        class r {
            static fromString(e) { const t = unescape(encodeURIComponent(e)), r = new Uint8Array(t.length); for (let e = 0; e < t.length; e++)
                r[e] = t.charCodeAt(e); return r.buffer; }
            static toString(e) { const r = t.toUint8Array(e); let n = ""; for (let e = 0; e < r.length; e++)
                n += String.fromCharCode(r[e]); return decodeURIComponent(escape(n)); }
        }
        class n {
            static toString(e, r = !1) { const n = t.toArrayBuffer(e), i = new DataView(n); let o = ""; for (let e = 0; e < n.byteLength; e += 2) {
                const t = i.getUint16(e, r);
                o += String.fromCharCode(t);
            } return o; }
            static fromString(e, t = !1) { const r = new ArrayBuffer(2 * e.length), n = new DataView(r); for (let r = 0; r < e.length; r++)
                n.setUint16(2 * r, e.charCodeAt(r), t); return r; }
        }
        class i {
            static isHex(e) { return "string" == typeof e && /^[a-z0-9]+$/i.test(e); }
            static isBase64(e) { return "string" == typeof e && /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e); }
            static isBase64Url(e) { return "string" == typeof e && /^[a-zA-Z0-9-_]+$/i.test(e); }
            static ToString(e, r = "utf8") { const i = t.toUint8Array(e); switch (r.toLowerCase()) {
                case "utf8": return this.ToUtf8String(i);
                case "binary": return this.ToBinary(i);
                case "hex": return this.ToHex(i);
                case "base64": return this.ToBase64(i);
                case "base64url": return this.ToBase64Url(i);
                case "utf16le": return n.toString(i, !0);
                case "utf16":
                case "utf16be": return n.toString(i);
                default: throw new Error(`Unknown type of encoding '${r}'`);
            } }
            static FromString(e, t = "utf8") { if (!e)
                return new ArrayBuffer(0); switch (t.toLowerCase()) {
                case "utf8": return this.FromUtf8String(e);
                case "binary": return this.FromBinary(e);
                case "hex": return this.FromHex(e);
                case "base64": return this.FromBase64(e);
                case "base64url": return this.FromBase64Url(e);
                case "utf16le": return n.fromString(e, !0);
                case "utf16":
                case "utf16be": return n.fromString(e);
                default: throw new Error(`Unknown type of encoding '${t}'`);
            } }
            static ToBase64(e) { const r = t.toUint8Array(e); if ("undefined" != typeof btoa) {
                const e = this.ToString(r, "binary");
                return btoa(e);
            } return Buffer.from(r).toString("base64"); }
            static FromBase64(e) { const t = this.formatString(e); if (!t)
                return new ArrayBuffer(0); if (!i.isBase64(t))
                throw new TypeError("Argument 'base64Text' is not Base64 encoded"); return "undefined" != typeof atob ? this.FromBinary(atob(t)) : new Uint8Array(Buffer.from(t, "base64")).buffer; }
            static FromBase64Url(e) { const t = this.formatString(e); if (!t)
                return new ArrayBuffer(0); if (!i.isBase64Url(t))
                throw new TypeError("Argument 'base64url' is not Base64Url encoded"); return this.FromBase64(this.Base64Padding(t.replace(/\-/g, "+").replace(/\_/g, "/"))); }
            static ToBase64Url(e) { return this.ToBase64(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, ""); }
            static FromUtf8String(e, t = i.DEFAULT_UTF8_ENCODING) { switch (t) {
                case "ascii": return this.FromBinary(e);
                case "utf8": return r.fromString(e);
                case "utf16":
                case "utf16be": return n.fromString(e);
                case "utf16le":
                case "usc2": return n.fromString(e, !0);
                default: throw new Error(`Unknown type of encoding '${t}'`);
            } }
            static ToUtf8String(e, t = i.DEFAULT_UTF8_ENCODING) { switch (t) {
                case "ascii": return this.ToBinary(e);
                case "utf8": return r.toString(e);
                case "utf16":
                case "utf16be": return n.toString(e);
                case "utf16le":
                case "usc2": return n.toString(e, !0);
                default: throw new Error(`Unknown type of encoding '${t}'`);
            } }
            static FromBinary(e) { const t = e.length, r = new Uint8Array(t); for (let n = 0; n < t; n++)
                r[n] = e.charCodeAt(n); return r.buffer; }
            static ToBinary(e) { const r = t.toUint8Array(e); let n = ""; for (let e = 0; e < r.length; e++)
                n += String.fromCharCode(r[e]); return n; }
            static ToHex(e) { const r = t.toUint8Array(e), n = [], i = r.length; for (let e = 0; e < i; e++) {
                const t = r[e].toString(16).padStart(2, "0");
                n.push(t);
            } return n.join(""); }
            static FromHex(e) { let t = this.formatString(e); if (!t)
                return new ArrayBuffer(0); if (!i.isHex(t))
                throw new TypeError("Argument 'hexString' is not HEX encoded"); t.length % 2 && (t = `0${t}`); const r = new Uint8Array(t.length / 2); for (let e = 0; e < t.length; e += 2) {
                const n = t.slice(e, e + 2);
                r[e / 2] = parseInt(n, 16);
            } return r.buffer; }
            static ToUtf16String(e, t = !1) { return n.toString(e, t); }
            static FromUtf16String(e, t = !1) { return n.fromString(e, t); }
            static Base64Padding(e) { const t = 4 - e.length % 4; if (t < 4)
                for (let r = 0; r < t; r++)
                    e += "="; return e; }
            static formatString(e) { return (null == e ? void 0 : e.replace(/[\n\r\t ]/g, "")) || ""; }
        }
        i.DEFAULT_UTF8_ENCODING = "utf8", e.BufferSourceConverter = t, e.Convert = i, e.assign = function (e, ...t) { const r = arguments[0]; for (let e = 1; e < arguments.length; e++) {
            const t = arguments[e];
            for (const e in t)
                r[e] = t[e];
        } return r; }, e.combine = function (...e) { const t = e.map((e => e.byteLength)).reduce(((e, t) => e + t)), r = new Uint8Array(t); let n = 0; return e.map((e => new Uint8Array(e))).forEach((e => { for (const t of e)
            r[n++] = t; })), r.buffer; }, e.isEqual = function (e, t) { if (!e || !t)
            return !1; if (e.byteLength !== t.byteLength)
            return !1; const r = new Uint8Array(e), n = new Uint8Array(t); for (let t = 0; t < e.byteLength; t++)
            if (r[t] !== n[t])
                return !1; return !0; }, Object.defineProperty(e, "__esModule", { value: !0 });
    }(t); }, 3697: e => {
        "use strict";
        var t = Object, r = TypeError;
        e.exports = function () { if (null != this && this !== t(this))
            throw new r("RegExp.prototype.flags getter called on non-object"); var e = ""; return this.global && (e += "g"), this.ignoreCase && (e += "i"), this.multiline && (e += "m"), this.dotAll && (e += "s"), this.unicode && (e += "u"), this.sticky && (e += "y"), e; };
    }, 2847: (e, t, r) => {
        "use strict";
        var n = r(4289), i = r(5559), o = r(3697), a = r(1721), s = r(2753), c = i(o);
        n(c, { getPolyfill: a, implementation: o, shim: s }), e.exports = c;
    }, 1721: (e, t, r) => {
        "use strict";
        var n = r(3697), i = r(4289).supportsDescriptors, o = Object.getOwnPropertyDescriptor, a = TypeError;
        e.exports = function () { if (!i)
            throw new a("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors"); if ("gim" === /a/gim.flags) {
            var e = o(RegExp.prototype, "flags");
            if (e && "function" == typeof e.get && "boolean" == typeof /a/.dotAll)
                return e.get;
        } return n; };
    }, 2753: (e, t, r) => {
        "use strict";
        var n = r(4289).supportsDescriptors, i = r(1721), o = Object.getOwnPropertyDescriptor, a = Object.defineProperty, s = TypeError, c = Object.getPrototypeOf, l = /a/;
        e.exports = function () { if (!n || !c)
            throw new s("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors"); var e = i(), t = c(l), r = o(t, "flags"); return r && r.get === e || a(t, "flags", { configurable: !0, enumerable: !1, get: e }), e; };
    }, 7635: function (e) {
        "use strict";
        !function (t) { const r = 2147483647; function n(e) { const t = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]); let r = 1779033703, n = 3144134277, i = 1013904242, o = 2773480762, a = 1359893119, s = 2600822924, c = 528734635, l = 1541459225; const u = new Uint32Array(64); function f(e) { let f = 0, h = e.length; for (; h >= 64;) {
            let d, p, g, m, b, y = r, v = n, A = i, S = o, w = a, E = s, T = c, k = l;
            for (p = 0; p < 16; p++)
                g = f + 4 * p, u[p] = (255 & e[g]) << 24 | (255 & e[g + 1]) << 16 | (255 & e[g + 2]) << 8 | 255 & e[g + 3];
            for (p = 16; p < 64; p++)
                d = u[p - 2], m = (d >>> 17 | d << 15) ^ (d >>> 19 | d << 13) ^ d >>> 10, d = u[p - 15], b = (d >>> 7 | d << 25) ^ (d >>> 18 | d << 14) ^ d >>> 3, u[p] = (m + u[p - 7] | 0) + (b + u[p - 16] | 0) | 0;
            for (p = 0; p < 64; p++)
                m = (((w >>> 6 | w << 26) ^ (w >>> 11 | w << 21) ^ (w >>> 25 | w << 7)) + (w & E ^ ~w & T) | 0) + (k + (t[p] + u[p] | 0) | 0) | 0, b = ((y >>> 2 | y << 30) ^ (y >>> 13 | y << 19) ^ (y >>> 22 | y << 10)) + (y & v ^ y & A ^ v & A) | 0, k = T, T = E, E = w, w = S + m | 0, S = A, A = v, v = y, y = m + b | 0;
            r = r + y | 0, n = n + v | 0, i = i + A | 0, o = o + S | 0, a = a + w | 0, s = s + E | 0, c = c + T | 0, l = l + k | 0, f += 64, h -= 64;
        } } f(e); let h, d = e.length % 64, p = e.length / 536870912 | 0, g = e.length << 3, m = d < 56 ? 56 : 120, b = e.slice(e.length - d, e.length); for (b.push(128), h = d + 1; h < m; h++)
            b.push(0); return b.push(p >>> 24 & 255), b.push(p >>> 16 & 255), b.push(p >>> 8 & 255), b.push(p >>> 0 & 255), b.push(g >>> 24 & 255), b.push(g >>> 16 & 255), b.push(g >>> 8 & 255), b.push(g >>> 0 & 255), f(b), [r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, r >>> 0 & 255, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n >>> 0 & 255, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, i >>> 0 & 255, o >>> 24 & 255, o >>> 16 & 255, o >>> 8 & 255, o >>> 0 & 255, a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, a >>> 0 & 255, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, s >>> 0 & 255, c >>> 24 & 255, c >>> 16 & 255, c >>> 8 & 255, c >>> 0 & 255, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, l >>> 0 & 255]; } function i(e, t, r) { e = e.length <= 64 ? e : n(e); const i = 64 + t.length + 4, o = new Array(i), a = new Array(64); let s, c = []; for (s = 0; s < 64; s++)
            o[s] = 54; for (s = 0; s < e.length; s++)
            o[s] ^= e[s]; for (s = 0; s < t.length; s++)
            o[64 + s] = t[s]; for (s = i - 4; s < i; s++)
            o[s] = 0; for (s = 0; s < 64; s++)
            a[s] = 92; for (s = 0; s < e.length; s++)
            a[s] ^= e[s]; function l() { for (let e = i - 1; e >= i - 4; e--) {
            if (o[e]++, o[e] <= 255)
                return;
            o[e] = 0;
        } } for (; r >= 32;)
            l(), c = c.concat(n(a.concat(n(o)))), r -= 32; return r > 0 && (l(), c = c.concat(n(a.concat(n(o))).slice(0, r))), c; } function o(e, t, r, n, i) { let o; for (l(e, 16 * (2 * r - 1), i, 0, 16), o = 0; o < 2 * r; o++)
            c(e, 16 * o, i, 16), s(i, n), l(i, 0, e, t + 16 * o, 16); for (o = 0; o < r; o++)
            l(e, t + 2 * o * 16, e, 16 * o, 16); for (o = 0; o < r; o++)
            l(e, t + 16 * (2 * o + 1), e, 16 * (o + r), 16); } function a(e, t) { return e << t | e >>> 32 - t; } function s(e, t) { l(e, 0, t, 0, 16); for (let e = 8; e > 0; e -= 2)
            t[4] ^= a(t[0] + t[12], 7), t[8] ^= a(t[4] + t[0], 9), t[12] ^= a(t[8] + t[4], 13), t[0] ^= a(t[12] + t[8], 18), t[9] ^= a(t[5] + t[1], 7), t[13] ^= a(t[9] + t[5], 9), t[1] ^= a(t[13] + t[9], 13), t[5] ^= a(t[1] + t[13], 18), t[14] ^= a(t[10] + t[6], 7), t[2] ^= a(t[14] + t[10], 9), t[6] ^= a(t[2] + t[14], 13), t[10] ^= a(t[6] + t[2], 18), t[3] ^= a(t[15] + t[11], 7), t[7] ^= a(t[3] + t[15], 9), t[11] ^= a(t[7] + t[3], 13), t[15] ^= a(t[11] + t[7], 18), t[1] ^= a(t[0] + t[3], 7), t[2] ^= a(t[1] + t[0], 9), t[3] ^= a(t[2] + t[1], 13), t[0] ^= a(t[3] + t[2], 18), t[6] ^= a(t[5] + t[4], 7), t[7] ^= a(t[6] + t[5], 9), t[4] ^= a(t[7] + t[6], 13), t[5] ^= a(t[4] + t[7], 18), t[11] ^= a(t[10] + t[9], 7), t[8] ^= a(t[11] + t[10], 9), t[9] ^= a(t[8] + t[11], 13), t[10] ^= a(t[9] + t[8], 18), t[12] ^= a(t[15] + t[14], 7), t[13] ^= a(t[12] + t[15], 9), t[14] ^= a(t[13] + t[12], 13), t[15] ^= a(t[14] + t[13], 18); for (let r = 0; r < 16; ++r)
            e[r] += t[r]; } function c(e, t, r, n) { for (let i = 0; i < n; i++)
            r[i] ^= e[t + i]; } function l(e, t, r, n, i) { for (; i--;)
            r[n++] = e[t++]; } function u(e) { if (!e || "number" != typeof e.length)
            return !1; for (let t = 0; t < e.length; t++) {
            const r = e[t];
            if ("number" != typeof r || r % 1 || r < 0 || r >= 256)
                return !1;
        } return !0; } function f(e, t) { if ("number" != typeof e || e % 1)
            throw new Error("invalid " + t); return e; } function h(e, t, n, a, s, h, d) { if (n = f(n, "N"), a = f(a, "r"), s = f(s, "p"), h = f(h, "dkLen"), 0 === n || 0 != (n & n - 1))
            throw new Error("N must be power of 2"); if (n > r / 128 / a)
            throw new Error("N too large"); if (a > r / 128 / s)
            throw new Error("r too large"); if (!u(e))
            throw new Error("password must be an array or buffer"); if (e = Array.prototype.slice.call(e), !u(t))
            throw new Error("salt must be an array or buffer"); t = Array.prototype.slice.call(t); let p = i(e, t, 128 * s * a); const g = new Uint32Array(32 * s * a); for (let e = 0; e < g.length; e++) {
            const t = 4 * e;
            g[e] = (255 & p[t + 3]) << 24 | (255 & p[t + 2]) << 16 | (255 & p[t + 1]) << 8 | (255 & p[t + 0]) << 0;
        } const m = new Uint32Array(64 * a), b = new Uint32Array(32 * a * n), y = 32 * a, v = new Uint32Array(16), A = new Uint32Array(16), S = s * n * 2; let w, E, T = 0, k = null, B = !1, P = 0, M = 0; const C = d ? parseInt(1e3 / a) : 4294967295, L = "undefined" != typeof setImmediate ? setImmediate : setTimeout, F = function () { if (B)
            return d(new Error("cancelled"), T / S); let t; switch (P) {
            case 0: E = 32 * M * a, l(g, E, m, 0, y), P = 1, w = 0;
            case 1:
                t = n - w, t > C && (t = C);
                for (let e = 0; e < t; e++)
                    l(m, 0, b, (w + e) * y, y), o(m, y, a, v, A);
                if (w += t, T += t, d) {
                    const e = parseInt(1e3 * T / S);
                    if (e !== k) {
                        if (B = d(null, T / S), B)
                            break;
                        k = e;
                    }
                }
                if (w < n)
                    break;
                w = 0, P = 2;
            case 2:
                t = n - w, t > C && (t = C);
                for (let e = 0; e < t; e++) {
                    const e = m[16 * (2 * a - 1)] & n - 1;
                    c(b, e * y, m, y), o(m, y, a, v, A);
                }
                if (w += t, T += t, d) {
                    const e = parseInt(1e3 * T / S);
                    if (e !== k) {
                        if (B = d(null, T / S), B)
                            break;
                        k = e;
                    }
                }
                if (w < n)
                    break;
                if (l(m, 0, g, E, y), M++, M < s) {
                    P = 0;
                    break;
                }
                p = [];
                for (let e = 0; e < g.length; e++)
                    p.push(g[e] >> 0 & 255), p.push(g[e] >> 8 & 255), p.push(g[e] >> 16 & 255), p.push(g[e] >> 24 & 255);
                const r = i(e, p, h);
                return d && d(null, 1, r), r;
        } d && L(F); }; if (!d)
            for (;;) {
                const e = F();
                if (null != e)
                    return e;
            } F(); } const d = { scrypt: function (e, t, r, n, i, o, a) { return new Promise((function (s, c) { let l = 0; a && a(0), h(e, t, r, n, i, o, (function (e, t, r) { if (e)
                c(e);
            else if (r)
                a && 1 !== l && a(1), s(new Uint8Array(r));
            else if (a && t !== l)
                return l = t, a(t); })); })); }, syncScrypt: function (e, t, r, n, i, o) { return new Uint8Array(h(e, t, r, n, i, o)); } }; e.exports = d; }();
    }, 7478: (e, t, r) => {
        "use strict";
        var n = r(210), i = r(1924), o = r(631), a = n("%TypeError%"), s = n("%WeakMap%", !0), c = n("%Map%", !0), l = i("WeakMap.prototype.get", !0), u = i("WeakMap.prototype.set", !0), f = i("WeakMap.prototype.has", !0), h = i("Map.prototype.get", !0), d = i("Map.prototype.set", !0), p = i("Map.prototype.has", !0), g = function (e, t) { for (var r, n = e; null !== (r = n.next); n = r)
            if (r.key === t)
                return n.next = r.next, r.next = e.next, e.next = r, r; };
        e.exports = function () { var e, t, r, n = { assert: function (e) { if (!n.has(e))
                throw new a("Side channel does not contain " + o(e)); }, get: function (n) { if (s && n && ("object" == typeof n || "function" == typeof n)) {
                if (e)
                    return l(e, n);
            }
            else if (c) {
                if (t)
                    return h(t, n);
            }
            else if (r)
                return function (e, t) { var r = g(e, t); return r && r.value; }(r, n); }, has: function (n) { if (s && n && ("object" == typeof n || "function" == typeof n)) {
                if (e)
                    return f(e, n);
            }
            else if (c) {
                if (t)
                    return p(t, n);
            }
            else if (r)
                return function (e, t) { return !!g(e, t); }(r, n); return !1; }, set: function (n, i) { s && n && ("object" == typeof n || "function" == typeof n) ? (e || (e = new s), u(e, n, i)) : c ? (t || (t = new c), d(t, n, i)) : (r || (r = { key: {}, next: null }), function (e, t, r) { var n = g(e, t); n ? n.value = r : e.next = { key: t, next: e.next, value: r }; }(r, n, i)); } }; return n; };
    }, 9505: (e, t, r) => {
        "use strict";
        var n = r(581), i = r(1391), o = r(7364), a = r(840), s = r(6846), c = r(9619), l = r(1924), u = r(1405)(), f = r(2847), h = l("String.prototype.indexOf"), d = r(6966), p = function (e) { var t = d(); if (u && "symbol" == typeof Symbol.matchAll) {
            var r = o(e, Symbol.matchAll);
            return r === RegExp.prototype[Symbol.matchAll] && r !== t ? t : r;
        } if (a(e))
            return t; };
        e.exports = function (e) { var t = c(this); if (null != e) {
            if (a(e)) {
                var r = "flags" in e ? i(e, "flags") : f(e);
                if (c(r), h(s(r), "g") < 0)
                    throw new TypeError("matchAll requires a global regular expression");
            }
            var o = p(e);
            if (void 0 !== o)
                return n(o, e, [t]);
        } var l = s(t), u = new RegExp(e, "g"); return n(p(u), u, [l]); };
    }, 4956: (e, t, r) => {
        "use strict";
        var n = r(5559), i = r(4289), o = r(9505), a = r(3447), s = r(2376), c = n(o);
        i(c, { getPolyfill: a, implementation: o, shim: s }), e.exports = c;
    }, 6966: (e, t, r) => {
        "use strict";
        var n = r(1405)(), i = r(7201);
        e.exports = function () { return n && "symbol" == typeof Symbol.matchAll && "function" == typeof RegExp.prototype[Symbol.matchAll] ? RegExp.prototype[Symbol.matchAll] : i; };
    }, 3447: (e, t, r) => {
        "use strict";
        var n = r(9505);
        e.exports = function () { if (String.prototype.matchAll)
            try {
                "".matchAll(RegExp.prototype);
            }
            catch (e) {
                return String.prototype.matchAll;
            } return n; };
    }, 7201: (e, t, r) => {
        "use strict";
        var n = r(3937), i = r(1391), o = r(105), a = r(9655), s = r(8305), c = r(6846), l = r(3633), u = r(2847), f = RegExp, h = "flags" in RegExp.prototype, d = function (e) { var t = this; if ("Object" !== l(t))
            throw new TypeError('"this" value must be an Object'); var r = c(e), d = function (e, t) { var r = "flags" in t ? i(t, "flags") : c(u(t)); return { flags: r, matcher: new e(h && "string" == typeof r ? t : e === f ? t.source : t, r) }; }(a(t, f), t), p = d.flags, g = d.matcher, m = s(i(t, "lastIndex")); o(g, "lastIndex", m, !0); var b = p.indexOf("g") > -1, y = p.indexOf("u") > -1; return n(g, r, b, y); }, p = Object.defineProperty, g = Object.getOwnPropertyDescriptor;
        if (p && g) {
            var m = g(d, "name");
            m && m.configurable && p(d, "name", { value: "[Symbol.matchAll]" });
        }
        e.exports = d;
    }, 2376: (e, t, r) => {
        "use strict";
        var n = r(4289), i = r(1405)(), o = r(3447), a = r(6966), s = Object.defineProperty, c = Object.getOwnPropertyDescriptor;
        e.exports = function () { var e = o(); if (n(String.prototype, { matchAll: e }, { matchAll: function () { return String.prototype.matchAll !== e; } }), i) {
            var t = Symbol.matchAll || (Symbol.for ? Symbol.for("Symbol.matchAll") : Symbol("Symbol.matchAll"));
            if (n(Symbol, { matchAll: t }, { matchAll: function () { return Symbol.matchAll !== t; } }), s && c) {
                var r = c(Symbol, t);
                r && !r.configurable || s(Symbol, t, { configurable: !1, enumerable: !1, value: t, writable: !1 });
            }
            var l = a(), u = {};
            u[t] = l;
            var f = {};
            f[t] = function () { return RegExp.prototype[t] !== l; }, n(RegExp.prototype, u, f);
        } return e; };
    }, 6601: () => { }, 9214: () => { }, 4654: () => { }, 4800: () => { }, 1085: () => { }, 7912: (e, t, r) => {
        "use strict";
        var n = r(210)("%Array%"), i = !n.isArray && r(1924)("Object.prototype.toString");
        e.exports = n.isArray || function (e) { return "[object Array]" === i(e); };
    }, 4200: (e, t, r) => {
        "use strict";
        var n = r(210), i = r(2432), o = r(7312), a = r(3633), s = r(1645), c = n("%TypeError%");
        e.exports = function (e, t, r) { if ("String" !== a(e))
            throw new c("Assertion failed: `S` must be a String"); if (!o(t) || t < 0 || t > s)
            throw new c("Assertion failed: `length` must be an integer >= 0 and <= 2**53"); if ("Boolean" !== a(r))
            throw new c("Assertion failed: `unicode` must be a Boolean"); return r ? t + 1 >= e.length ? t + 1 : t + i(e, t)["[[CodeUnitCount]]"] : t + 1; };
    }, 581: (e, t, r) => {
        "use strict";
        var n = r(210), i = r(1924), o = n("%TypeError%"), a = r(6975), s = n("%Reflect.apply%", !0) || i("%Function.prototype.apply%");
        e.exports = function (e, t) { var r = arguments.length > 2 ? arguments[2] : []; if (!a(r))
            throw new o("Assertion failed: optional `argumentsList`, if provided, must be a List"); return s(e, t, r); };
    }, 2432: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(1924), o = r(9544), a = r(5424), s = r(3633), c = r(4857), l = i("String.prototype.charAt"), u = i("String.prototype.charCodeAt");
        e.exports = function (e, t) { if ("String" !== s(e))
            throw new n("Assertion failed: `string` must be a String"); var r = e.length; if (t < 0 || t >= r)
            throw new n("Assertion failed: `position` must be >= 0, and < the length of `string`"); var i = u(e, t), f = l(e, t), h = o(i), d = a(i); if (!h && !d)
            return { "[[CodePoint]]": f, "[[CodeUnitCount]]": 1, "[[IsUnpairedSurrogate]]": !1 }; if (d || t + 1 === r)
            return { "[[CodePoint]]": f, "[[CodeUnitCount]]": 1, "[[IsUnpairedSurrogate]]": !0 }; var p = u(e, t + 1); return a(p) ? { "[[CodePoint]]": c(i, p), "[[CodeUnitCount]]": 2, "[[IsUnpairedSurrogate]]": !1 } : { "[[CodePoint]]": f, "[[CodeUnitCount]]": 1, "[[IsUnpairedSurrogate]]": !0 }; };
    }, 2658: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(3633);
        e.exports = function (e, t) { if ("Boolean" !== i(t))
            throw new n("Assertion failed: Type(done) is not Boolean"); return { value: e, done: t }; };
    }, 7730: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(3682), o = r(8334), a = r(3746), s = r(4305), c = r(484), l = r(3633);
        e.exports = function (e, t, r) { if ("Object" !== l(e))
            throw new n("Assertion failed: Type(O) is not Object"); if (!s(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true"); return i(a, c, o, e, t, { "[[Configurable]]": !0, "[[Enumerable]]": !1, "[[Value]]": r, "[[Writable]]": !0 }); };
    }, 3937: (e, t, r) => {
        "use strict";
        var n = r(210), i = r(1405)(), o = n("%TypeError%"), a = n("%IteratorPrototype%", !0), s = n("%Object.defineProperty%", !0), c = r(4200), l = r(2658), u = r(7730), f = r(1391), h = r(953), d = r(6258), p = r(105), g = r(8305), m = r(6846), b = r(3633), y = r(9496), v = function (e, t, r, n) { if ("String" !== b(t))
            throw new o("`S` must be a string"); if ("Boolean" !== b(r))
            throw new o("`global` must be a boolean"); if ("Boolean" !== b(n))
            throw new o("`fullUnicode` must be a boolean"); y.set(this, "[[IteratingRegExp]]", e), y.set(this, "[[IteratedString]]", t), y.set(this, "[[Global]]", r), y.set(this, "[[Unicode]]", n), y.set(this, "[[Done]]", !1); };
        a && (v.prototype = h(a)), u(v.prototype, "next", (function () { var e = this; if ("Object" !== b(e))
            throw new o("receiver must be an object"); if (!(e instanceof v && y.has(e, "[[IteratingRegExp]]") && y.has(e, "[[IteratedString]]") && y.has(e, "[[Global]]") && y.has(e, "[[Unicode]]") && y.has(e, "[[Done]]")))
            throw new o('"this" value must be a RegExpStringIterator instance'); if (y.get(e, "[[Done]]"))
            return l(void 0, !0); var t = y.get(e, "[[IteratingRegExp]]"), r = y.get(e, "[[IteratedString]]"), n = y.get(e, "[[Global]]"), i = y.get(e, "[[Unicode]]"), a = d(t, r); if (null === a)
            return y.set(e, "[[Done]]", !0), l(void 0, !0); if (n) {
            if ("" === m(f(a, "0"))) {
                var s = g(f(t, "lastIndex")), u = c(r, s, i);
                p(t, "lastIndex", u, !0);
            }
            return l(a, !1);
        } return y.set(e, "[[Done]]", !0), l(a, !1); })), i && (Symbol.toStringTag && (s ? s(v.prototype, Symbol.toStringTag, { configurable: !0, enumerable: !1, value: "RegExp String Iterator", writable: !1 }) : v.prototype[Symbol.toStringTag] = "RegExp String Iterator"), Symbol.iterator && "function" != typeof v.prototype[Symbol.iterator]) && u(v.prototype, Symbol.iterator, (function () { return this; })), e.exports = function (e, t, r, n) { return new v(e, t, r, n); };
    }, 3950: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(2435), o = r(3682), a = r(8334), s = r(9527), c = r(3746), l = r(4305), u = r(484), f = r(9916), h = r(3633);
        e.exports = function (e, t, r) { if ("Object" !== h(e))
            throw new n("Assertion failed: Type(O) is not Object"); if (!l(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true"); var d = i({ Type: h, IsDataDescriptor: c, IsAccessorDescriptor: s }, r) ? r : f(r); if (!i({ Type: h, IsDataDescriptor: c, IsAccessorDescriptor: s }, d))
            throw new n("Assertion failed: Desc is not a valid Property Descriptor"); return o(c, u, a, e, t, d); };
    }, 8334: (e, t, r) => {
        "use strict";
        var n = r(2188), i = r(3633);
        e.exports = function (e) { if (void 0 === e)
            return e; n(i, "Property Descriptor", "Desc", e); var t = {}; return "[[Value]]" in e && (t.value = e["[[Value]]"]), "[[Writable]]" in e && (t.writable = e["[[Writable]]"]), "[[Get]]" in e && (t.get = e["[[Get]]"]), "[[Set]]" in e && (t.set = e["[[Set]]"]), "[[Enumerable]]" in e && (t.enumerable = e["[[Enumerable]]"]), "[[Configurable]]" in e && (t.configurable = e["[[Configurable]]"]), t; };
    }, 1391: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(631), o = r(4305), a = r(3633);
        e.exports = function (e, t) { if ("Object" !== a(e))
            throw new n("Assertion failed: Type(O) is not Object"); if (!o(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true, got " + i(t)); return e[t]; };
    }, 7364: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(8509), o = r(1787), a = r(4305);
        e.exports = function (e, t) { if (!a(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true"); var r = i(e, t); if (null != r) {
            if (!o(r))
                throw new n(t + "is not a function");
            return r;
        } };
    }, 8509: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(4305), o = r(821);
        e.exports = function (e, t) { if (!i(t))
            throw new n("Assertion failed: IsPropertyKey(P) is not true"); return o(e)[t]; };
    }, 9527: (e, t, r) => {
        "use strict";
        var n = r(7642), i = r(2188), o = r(3633);
        e.exports = function (e) { return void 0 !== e && (i(o, "Property Descriptor", "Desc", e), !(!n(e, "[[Get]]") && !n(e, "[[Set]]"))); };
    }, 6975: (e, t, r) => {
        "use strict";
        var n = r(210)("%Array%"), i = !n.isArray && r(1924)("Object.prototype.toString");
        e.exports = n.isArray || function (e) { return "[object Array]" === i(e); };
    }, 1787: (e, t, r) => {
        "use strict";
        e.exports = r(5320);
    }, 1974: (e, t, r) => {
        "use strict";
        var n = r(4445)("%Reflect.construct%", !0), i = r(3950);
        try {
            i({}, "", { "[[Get]]": function () { } });
        }
        catch (e) {
            i = null;
        }
        if (i && n) {
            var o = {}, a = {};
            i(a, "length", { "[[Get]]": function () { throw o; }, "[[Enumerable]]": !0 }), e.exports = function (e) { try {
                n(e, a);
            }
            catch (e) {
                return e === o;
            } };
        }
        else
            e.exports = function (e) { return "function" == typeof e && !!e.prototype; };
    }, 3746: (e, t, r) => {
        "use strict";
        var n = r(7642), i = r(2188), o = r(3633);
        e.exports = function (e) { return void 0 !== e && (i(o, "Property Descriptor", "Desc", e), !(!n(e, "[[Value]]") && !n(e, "[[Writable]]"))); };
    }, 7312: (e, t, r) => {
        "use strict";
        var n = r(4908), i = r(375), o = r(3633), a = r(9086), s = r(2633);
        e.exports = function (e) { if ("Number" !== o(e) || a(e) || !s(e))
            return !1; var t = n(e); return i(t) === t; };
    }, 4305: e => {
        "use strict";
        e.exports = function (e) { return "string" == typeof e || "symbol" == typeof e; };
    }, 840: (e, t, r) => {
        "use strict";
        var n = r(210)("%Symbol.match%", !0), i = r(8420), o = r(9731);
        e.exports = function (e) { if (!e || "object" != typeof e)
            return !1; if (n) {
            var t = e[n];
            if (void 0 !== t)
                return o(t);
        } return i(e); };
    }, 953: (e, t, r) => {
        "use strict";
        var n = r(210), i = n("%Object.create%", !0), o = n("%TypeError%"), a = n("%SyntaxError%"), s = r(6975), c = r(3633), l = !({ __proto__: null } instanceof Object);
        e.exports = function (e) { if (null !== e && "Object" !== c(e))
            throw new o("Assertion failed: `proto` must be null or an object"); var t = arguments.length < 2 ? [] : arguments[1]; if (!s(t))
            throw new o("Assertion failed: `additionalInternalSlotsList` must be an Array"); if (t.length > 0)
            throw new a("es-abstract does not yet support internal slots"); if (i)
            return i(e); if (l)
            return { __proto__: e }; if (null === e)
            throw new a("native Object.create support is required to create null objects"); var r = function () { }; return r.prototype = e, new r; };
    }, 6258: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(1924)("RegExp.prototype.exec"), o = r(581), a = r(1391), s = r(1787), c = r(3633);
        e.exports = function (e, t) { if ("Object" !== c(e))
            throw new n("Assertion failed: `R` must be an Object"); if ("String" !== c(t))
            throw new n("Assertion failed: `S` must be a String"); var r = a(e, "exec"); if (s(r)) {
            var l = o(r, e, [t]);
            if (null === l || "Object" === c(l))
                return l;
            throw new n('"exec" method must return `null` or an Object');
        } return i(e, t); };
    }, 9619: (e, t, r) => {
        "use strict";
        e.exports = r(4559);
    }, 484: (e, t, r) => {
        "use strict";
        var n = r(9086);
        e.exports = function (e, t) { return e === t ? 0 !== e || 1 / e == 1 / t : n(e) && n(t); };
    }, 105: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%"), i = r(4305), o = r(484), a = r(3633), s = function () { try {
            return delete [].length, !0;
        }
        catch (e) {
            return !1;
        } }();
        e.exports = function (e, t, r, c) { if ("Object" !== a(e))
            throw new n("Assertion failed: `O` must be an Object"); if (!i(t))
            throw new n("Assertion failed: `P` must be a Property Key"); if ("Boolean" !== a(c))
            throw new n("Assertion failed: `Throw` must be a Boolean"); if (c) {
            if (e[t] = r, s && !o(e[t], r))
                throw new n("Attempted to assign to readonly property.");
            return !0;
        } try {
            return e[t] = r, !s || o(e[t], r);
        }
        catch (e) {
            return !1;
        } };
    }, 9655: (e, t, r) => {
        "use strict";
        var n = r(210), i = n("%Symbol.species%", !0), o = n("%TypeError%"), a = r(1974), s = r(3633);
        e.exports = function (e, t) { if ("Object" !== s(e))
            throw new o("Assertion failed: Type(O) is not Object"); var r = e.constructor; if (void 0 === r)
            return t; if ("Object" !== s(r))
            throw new o("O.constructor is not an Object"); var n = i ? r[i] : void 0; if (null == n)
            return t; if (a(n))
            return n; throw new o("no constructor found"); };
    }, 9731: e => {
        "use strict";
        e.exports = function (e) { return !!e; };
    }, 751: (e, t, r) => {
        "use strict";
        var n = r(775), i = r(5631);
        e.exports = function (e) { var t = i(e); return 0 !== t && (t = n(t)), 0 === t ? 0 : t; };
    }, 8305: (e, t, r) => {
        "use strict";
        var n = r(1645), i = r(751);
        e.exports = function (e) { var t = i(e); return t <= 0 ? 0 : t > n ? n : t; };
    }, 5631: (e, t, r) => {
        "use strict";
        var n = r(210), i = n("%TypeError%"), o = n("%Number%"), a = n("%RegExp%"), s = n("%parseInt%"), c = r(1924), l = r(823), u = r(4790), f = c("String.prototype.slice"), h = l(/^0b[01]+$/i), d = l(/^0o[0-7]+$/i), p = l(/^[-+]0x[0-9a-f]+$/i), g = l(new a("[" + ["", "​", "￾"].join("") + "]", "g")), m = ["\t\n\v\f\r   ᠎    ", "         　\u2028", "\u2029\ufeff"].join(""), b = new RegExp("(^[" + m + "]+)|([" + m + "]+$)", "g"), y = c("String.prototype.replace"), v = r(4607);
        e.exports = function e(t) { var r = u(t) ? t : v(t, o); if ("symbol" == typeof r)
            throw new i("Cannot convert a Symbol value to a number"); if ("bigint" == typeof r)
            throw new i("Conversion from 'BigInt' to 'number' is not allowed."); if ("string" == typeof r) {
            if (h(r))
                return e(s(f(r, 2), 2));
            if (d(r))
                return e(s(f(r, 2), 8));
            if (g(r) || p(r))
                return NaN;
            var n = function (e) { return y(e, b, ""); }(r);
            if (n !== r)
                return e(n);
        } return o(r); };
    }, 821: (e, t, r) => {
        "use strict";
        var n = r(210)("%Object%"), i = r(9619);
        e.exports = function (e) { return i(e), n(e); };
    }, 4607: (e, t, r) => {
        "use strict";
        var n = r(1503);
        e.exports = function (e) { return arguments.length > 1 ? n(e, arguments[1]) : n(e); };
    }, 9916: (e, t, r) => {
        "use strict";
        var n = r(7642), i = r(210)("%TypeError%"), o = r(3633), a = r(9731), s = r(1787);
        e.exports = function (e) { if ("Object" !== o(e))
            throw new i("ToPropertyDescriptor requires an object"); var t = {}; if (n(e, "enumerable") && (t["[[Enumerable]]"] = a(e.enumerable)), n(e, "configurable") && (t["[[Configurable]]"] = a(e.configurable)), n(e, "value") && (t["[[Value]]"] = e.value), n(e, "writable") && (t["[[Writable]]"] = a(e.writable)), n(e, "get")) {
            var r = e.get;
            if (void 0 !== r && !s(r))
                throw new i("getter must be a function");
            t["[[Get]]"] = r;
        } if (n(e, "set")) {
            var c = e.set;
            if (void 0 !== c && !s(c))
                throw new i("setter must be a function");
            t["[[Set]]"] = c;
        } if ((n(t, "[[Get]]") || n(t, "[[Set]]")) && (n(t, "[[Value]]") || n(t, "[[Writable]]")))
            throw new i("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute"); return t; };
    }, 6846: (e, t, r) => {
        "use strict";
        var n = r(210), i = n("%String%"), o = n("%TypeError%");
        e.exports = function (e) { if ("symbol" == typeof e)
            throw new o("Cannot convert a Symbol value to a string"); return i(e); };
    }, 3633: (e, t, r) => {
        "use strict";
        var n = r(3951);
        e.exports = function (e) { return "symbol" == typeof e ? "Symbol" : "bigint" == typeof e ? "BigInt" : n(e); };
    }, 4857: (e, t, r) => {
        "use strict";
        var n = r(210), i = n("%TypeError%"), o = n("%String.fromCharCode%"), a = r(9544), s = r(5424);
        e.exports = function (e, t) { if (!a(e) || !s(t))
            throw new i("Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code"); return o(e) + o(t); };
    }, 4908: (e, t, r) => {
        "use strict";
        var n = r(210)("%Math.abs%");
        e.exports = function (e) { return n(e); };
    }, 375: e => {
        "use strict";
        var t = Math.floor;
        e.exports = function (e) { return t(e); };
    }, 4559: (e, t, r) => {
        "use strict";
        var n = r(210)("%TypeError%");
        e.exports = function (e, t) { if (null == e)
            throw new n(t || "Cannot call method on " + e); return e; };
    }, 775: (e, t, r) => {
        "use strict";
        var n = r(7890), i = r(2748), o = r(7709), a = r(9086), s = r(2633), c = r(8111);
        e.exports = function (e) { var t = o(e); return a(t) ? 0 : 0 !== t && s(t) ? c(t) * i(n(t)) : t; };
    }, 7709: (e, t, r) => {
        "use strict";
        var n = r(1950);
        e.exports = function (e) { var t = n(e, Number); if ("string" != typeof t)
            return +t; var r = t.replace(/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g, ""); return /^0[ob]|^[+-]0x/.test(r) ? NaN : +r; };
    }, 1950: (e, t, r) => {
        "use strict";
        e.exports = r(2116);
    }, 3951: e => {
        "use strict";
        e.exports = function (e) { return null === e ? "Null" : void 0 === e ? "Undefined" : "function" == typeof e || "object" == typeof e ? "Object" : "number" == typeof e ? "Number" : "boolean" == typeof e ? "Boolean" : "string" == typeof e ? "String" : void 0; };
    }, 7890: (e, t, r) => {
        "use strict";
        var n = r(210)("%Math.abs%");
        e.exports = function (e) { return n(e); };
    }, 2748: e => {
        "use strict";
        var t = Math.floor;
        e.exports = function (e) { return t(e); };
    }, 4445: (e, t, r) => {
        "use strict";
        e.exports = r(210);
    }, 3682: (e, t, r) => {
        "use strict";
        var n = r(210)("%Object.defineProperty%", !0);
        if (n)
            try {
                n({}, "a", { value: 1 });
            }
            catch (e) {
                n = null;
            }
        var i = Object.defineProperty && 0 === Object.defineProperty([], "length", { value: 1 }).length, o = i && r(7912), a = r(1924)("Object.prototype.propertyIsEnumerable");
        e.exports = function (e, t, r, s, c, l) { if (!n) {
            if (!e(l))
                return !1;
            if (!l["[[Configurable]]"] || !l["[[Writable]]"])
                return !1;
            if (c in s && a(s, c) !== !!l["[[Enumerable]]"])
                return !1;
            var u = l["[[Value]]"];
            return s[c] = u, t(s[c], u);
        } return i && "length" === c && "[[Value]]" in l && o(s) && s.length !== l["[[Value]]"] ? (s.length = l["[[Value]]"], s.length === l["[[Value]]"]) : (n(s, c, r(l)), !0); };
    }, 2188: (e, t, r) => {
        "use strict";
        var n = r(210), i = n("%TypeError%"), o = n("%SyntaxError%"), a = r(7642), s = { "Property Descriptor": function (e, t) { if ("Object" !== e(t))
                return !1; var r = { "[[Configurable]]": !0, "[[Enumerable]]": !0, "[[Get]]": !0, "[[Set]]": !0, "[[Value]]": !0, "[[Writable]]": !0 }; for (var n in t)
                if (a(t, n) && !r[n])
                    return !1; var o = a(t, "[[Value]]"), s = a(t, "[[Get]]") || a(t, "[[Set]]"); if (o && s)
                throw new i("Property Descriptors may not be both accessor and data descriptors"); return !0; } };
        e.exports = function (e, t, r, n) { var a = s[t]; if ("function" != typeof a)
            throw new o("unknown record type: " + t); if (!a(e, n))
            throw new i(r + " must be a " + t); };
    }, 2633: e => {
        "use strict";
        var t = Number.isNaN || function (e) { return e != e; };
        e.exports = Number.isFinite || function (e) { return "number" == typeof e && !t(e) && e !== 1 / 0 && e !== -1 / 0; };
    }, 9544: e => {
        "use strict";
        e.exports = function (e) { return "number" == typeof e && e >= 55296 && e <= 56319; };
    }, 9086: e => {
        "use strict";
        e.exports = Number.isNaN || function (e) { return e != e; };
    }, 4790: e => {
        "use strict";
        e.exports = function (e) { return null === e || "function" != typeof e && "object" != typeof e; };
    }, 2435: (e, t, r) => {
        "use strict";
        var n = r(210), i = r(7642), o = n("%TypeError%");
        e.exports = function (e, t) { if ("Object" !== e.Type(t))
            return !1; var r = { "[[Configurable]]": !0, "[[Enumerable]]": !0, "[[Get]]": !0, "[[Set]]": !0, "[[Value]]": !0, "[[Writable]]": !0 }; for (var n in t)
            if (i(t, n) && !r[n])
                return !1; if (e.IsDataDescriptor(t) && e.IsAccessorDescriptor(t))
            throw new o("Property Descriptors may not be both accessor and data descriptors"); return !0; };
    }, 5424: e => {
        "use strict";
        e.exports = function (e) { return "number" == typeof e && e >= 56320 && e <= 57343; };
    }, 1645: (e, t, r) => {
        "use strict";
        var n = r(210), i = n("%Math%"), o = n("%Number%");
        e.exports = o.MAX_SAFE_INTEGER || i.pow(2, 53) - 1;
    }, 823: (e, t, r) => {
        "use strict";
        var n = r(210)("RegExp.prototype.test"), i = r(5559);
        e.exports = function (e) { return i(n, e); };
    }, 8111: e => {
        "use strict";
        e.exports = function (e) { return e >= 0 ? 1 : -1; };
    }, 8597: e => {
        "use strict";
        e.exports = { i8: "6.5.4" };
    } }, t = {}; function r(n) { var i = t[n]; if (void 0 !== i)
    return i.exports; var o = t[n] = { id: n, loaded: !1, exports: {} }; return e[n].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports; } r.amdO = {}, r.n = e => { var t = e && e.__esModule ? () => e.default : () => e; return r.d(t, { a: t }), t; }, r.d = (e, t) => { for (var n in t)
    r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] }); }, r.g = function () { if ("object" == typeof globalThis)
    return globalThis; try {
    return this || new Function("return this")();
}
catch (e) {
    if ("object" == typeof window)
        return window;
} }(), r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }, r.nmd = e => (e.paths = [], e.children || (e.children = []), e), (() => {
    "use strict";
    var e = {};
    r.r(e), r.d(e, { Any: () => _e, BaseBlock: () => j, BitString: () => ie, BmpString: () => be, Boolean: () => W, CharacterString: () => Le, Choice: () => Je, Constructed: () => Z, DATE: () => xe, DateTime: () => Re, Duration: () => Ie, EndOfContent: () => q, Enumerated: () => se, GeneralString: () => Ce, GeneralizedTime: () => Oe, GraphicString: () => Pe, HexBlock: () => _, IA5String: () => Be, Integer: () => ae, Null: () => ee, NumericString: () => we, ObjectIdentifier: () => ue, OctetString: () => re, Primitive: () => V, PrintableString: () => Ee, RawData: () => He, RelativeObjectIdentifier: () => ge, Repeated: () => Ue, Sequence: () => Y, Set: () => $, TIME: () => De, TeletexString: () => Te, TimeOfDay: () => Ne, UTCTime: () => Fe, UniversalString: () => ve, Utf8String: () => he, ValueBlock: () => G, VideotexString: () => ke, VisibleString: () => Me, compareSchema: () => Xe, fromBER: () => je, fromJSON: () => ze, verifySchema: () => Ve });
    let t = r(1094);
    function n(e) { for (var t = "", r = 0; r < e.length; r++)
        t += "" + e.charCodeAt(r).toString(16); return t; }
    function i(e = "") { "0x" === e.substr(0, 2).toLowerCase() && (e = e.substr(2)); let t = [], r = [...e]; r.length % 2 && r.unshift("0"); let n = ""; if (!r.length)
        return []; if (void 0 !== r && r)
        for (; r.length;)
            n = "", n += r.shift() + r.shift(), t.push(parseInt(n, 16)); return t; }
    function o(e = "") { return Uint8Array.from(i(e)); }
    function a(e = "") { return p(o(e)).split("/").join("_").split("+").join("-"); }
    function s(e, t = T.P) { const r = e % t; return r >= 0n ? r : t + r; }
    function c(e, t = T.P) { if (0n === e || t <= 0n)
        throw new Error("invert: expected positive integers"); let [r, n] = function (e, t) { let [r, n, i, o] = [0n, 1n, 1n, 0n]; for (; 0n !== e;) {
        let [a, s] = [t / e, t % e], [c, l] = [r - i * a, n - o * a];
        [t, e] = [e, s], [r, n] = [i, o], [i, o] = [c, l];
    } return [t, r, n]; }(s(e, t), t); if (1n !== r)
        throw new Error("invert: does not exist"); return s(n, t); }
    function l(e) { return function (e) { let t = []; return Uint8Array.from(e).forEach((function (e) { var r = e.toString(16); r.length % 2 && (r = "0" + r), t.push(r); })), BigInt("0x" + t.join("")); }(e); }
    function u(e) { return f(e); }
    function f(e, t = 0) { var r = BigInt(e).toString(16).padStart(2 * t, "0"); r.length % 2 && (r = "0" + r); for (var n = r.length / 2, i = new Uint8Array(n), o = 0, a = 0; o < n;)
        i[o] = parseInt(r.slice(a, a + 2), 16), o += 1, a += 2; return i; }
    function h(e) { if (1 === e.length)
        return e[0]; let t = Uint8Array.from([]); if (0 === e.length)
        return t; for (let r = 0; r < e.length; r++) {
        if ("object" != typeof e[r] || "number" != typeof e[r].length)
            throw new Error("wrong input values");
        let n = Uint8Array.from(e[r]);
        if (!n || !n.length)
            continue;
        let i = new Uint8Array(t.length + n.length);
        i.set(t), i.set(n, t.length), t = i;
    } return t; }
    function d(e) { if (!e)
        return ""; let t = "", r = e.byteLength; for (let n = 0; n < r; n++)
        t += String.fromCharCode(e[n]); return t; }
    function p(e) { let t = d(e); return "undefined" != typeof window && window.btoa ? window.btoa(t) : new Buffer(t).toString("base64"); }
    function g(e) { let t; return e = function (e) { let t = e.split(/\r?\n/); for (; "" === t[t.length - 1].trim();)
        t.pop(); return "---" === e.slice(0, 3) && (t.shift(), t.pop()), (e = t.join("")).split("_").join("/").split("-").join("+").split(".").join("="); }(e), t = "undefined" != typeof window && window.atob ? Uint8Array.from(atob(e), (e => e.charCodeAt(0))) : Uint8Array.from(Buffer.from(e, "base64")), t; }
    function m(e) { for (var t = [], r = 0; r < e.length; r++)
        t.push(e.charCodeAt(r)); return t; }
    function b(e, t, r) { let n = 1n, i = e; for (; t > 0n;)
        1n & t && (n = n * i % r), i = i * i % r, t >>= 1n; return n; }
    function y(e) { return e && e.length ? Array.from(e).map((e => ("0" + e.toString(16)).slice(-2))).join("") : ""; }
    function v(e) { return "undefined" != typeof Buffer ? Buffer.from(e) : e; }
    function A(e) { let t = Math.floor(e / 2 ** 32); return new Uint8Array([t, t << 8, t << 16, t << 24, e, e << 8, e << 16, e << 24].map((e => e >>> 24))); }
    function S(e) { return function (e) { let r = Array.from(e); return h([new Uint8Array(32), new Uint8Array(i(t.keccak256(r)))]).slice(-32); }(Uint8Array.from(m(e))); }
    let w = { P: 2n ** 256n - 2n ** 32n - 977n, n: 2n ** 256n - 432420386565659656852420866394968145599n, magicExp: (2n ** 256n - 2n ** 32n - 977n + 1n) / 4n, A: 0n, B: 7n }, E = { p256: { P: BigInt("0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF"), A: BigInt("0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC"), B: BigInt("0x5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B"), n: BigInt("0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551"), GX: BigInt("0x6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296"), GY: BigInt("0x4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5"), h: 1n }, secp256k1: { P: 2n ** 256n - 2n ** 32n - 977n, A: 0n, B: 7n, n: 2n ** 256n - 432420386565659656852420866394968145599n, GX: 55066263022277343669578718895168534326250603453777594175500187360389116729240n, GY: 32670510020758816978083085130507043184471273380659243275938904335757337482424n }, BN256: { P: 115792089237314936872688561244471742058375878355761205198700409522629664518163n, n: 115792089237314936872688561244471742058035595988840268584488757999429535617037n, magicExp: 115792089237314936872688561244471742058375878355761205198700409522629664518164n >> 2n, A: 0n, B: 3n, h: 1n } }, T = { P: 21888242871839275222246405745257275088696311157297823662689037894645226208583n, n: 21888242871839275222246405745257275088548364400416034343698204186575808495617n, A: 0n, B: 3n, h: 1n };
    class k {
        constructor(e, t, r = E.secp256r1) { this.x = e, this.y = t, this.useCurve = r; }
        double() { const e = this.x, t = this.y, r = s(3n * e ** 2n * c(2n * t, this.useCurve.P), this.useCurve.P), n = s(r * r - 2n * e, this.useCurve.P), i = s(r * (e - n) - t, this.useCurve.P); return new k(n, i, this.useCurve); }
        newZero() { return new k(0n, 0n, this.useCurve); }
        add(e) { const [t, r] = [this, e], [n, i, o, a] = [t.x, t.y, r.x, r.y]; if (0n === n || 0n === i)
            return r; if (0n === o || 0n === a)
            return t; if (n === o && i === a)
            return this.double(); if (n === o && i === -a)
            return this.newZero(); const l = s((a - i) * c(o - n, this.useCurve.P), this.useCurve.P), u = s(l * l - n - o, this.useCurve.P), f = s(l * (n - u) - i, this.useCurve.P); return new k(u, f, this.useCurve); }
        multiplyDA(e) { let t = this.newZero(), r = this; for (; e > 0n;)
            1n & e && (t = t.add(r)), r = r.double(), e >>= 1n; return t; }
        isInfinity() { return null == this.x || null == this.y; }
        getEncoded(e = !1) { if (this.isInfinity())
            return new Uint8Array(0); let t = f(this.x, 32); return h(e ? [Uint8Array.from([2]), t] : [Uint8Array.from([4]), t, f(this.y, 32)]); }
        equals(e) { if (null == e)
            return !1; let t = this.isInfinity(), r = e.isInfinity(); if (t || r)
            return t && r; let n = e; return this.x === n.x && this.y === n.y; }
        static decodeFromHex(e, t = w) { if (130 != e.length)
            throw new Error("only decompressed points allowed. 65 bytes."); return k.decodeFromUint8(o(e), t); }
        static decodeFromUint8(e, t = w) { if (65 != e.length)
            throw new Error("only decompressed points allowed. 65 bytes."); let r; if (4 !== e[0])
            throw new Error("only decompressed points allowed"); {
            let n = l(e.slice(1, 33)), i = l(e.slice(33));
            r = new k(n, i, t);
        } if (!r.validate()) {
            let e = "Point is not valid (" + r.x.toString(16) + "," + r.y.toString(16) + ")";
            throw console.log(e), new Error(e);
        } return r; }
        validate() { return 0n == s(s(this.y * this.y, this.useCurve.P) - s(b(this.x, 3n, this.useCurve.P) + s(this.x * this.useCurve.A, this.useCurve.P) + this.useCurve.B, this.useCurve.P), this.useCurve.P); }
        negate() { return new k(this.x, this.useCurve.P - this.y, this.useCurve); }
        subtract(e) { return this.add(e.negate()); }
    }
    function B(e, t, r) { return e instanceof Object == 0 ? r : t in e ? e[t] : r; }
    function P(e, t = 0, r = e.byteLength - t, n = !1) { let i = ""; for (const o of new Uint8Array(e, t, r)) {
        const e = o.toString(16).toUpperCase();
        1 === e.length && (i += "0"), i += e, n && (i += " ");
    } return i.trim(); }
    function M(e, t, r, n) { return t instanceof ArrayBuffer == 0 ? (e.error = 'Wrong parameter: inputBuffer must be "ArrayBuffer"', !1) : 0 === t.byteLength ? (e.error = "Wrong parameter: inputBuffer has zero length", !1) : r < 0 ? (e.error = "Wrong parameter: inputOffset less than zero", !1) : n < 0 ? (e.error = "Wrong parameter: inputLength less than zero", !1) : !(t.byteLength - r - n < 0 && (e.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", 1)); }
    function C(e, t) { let r = 0; if (1 === e.length)
        return e[0]; for (let n = e.length - 1; n >= 0; n--)
        r += e[e.length - 1 - n] * Math.pow(2, t * n); return r; }
    function L(e, t, r = -1) { const n = r; let i = e, o = 0, a = Math.pow(2, t); for (let r = 1; r < 8; r++) {
        if (e < a) {
            let e;
            if (n < 0)
                e = new ArrayBuffer(r), o = r;
            else {
                if (n < r)
                    return new ArrayBuffer(0);
                e = new ArrayBuffer(n), o = n;
            }
            const a = new Uint8Array(e);
            for (let e = r - 1; e >= 0; e--) {
                const r = Math.pow(2, e * t);
                a[o - e - 1] = Math.floor(i / r), i -= a[o - e - 1] * r;
            }
            return e;
        }
        a *= Math.pow(2, t);
    } return new ArrayBuffer(0); }
    function F(...e) { let t = 0, r = 0; for (const r of e)
        t += r.byteLength; const n = new ArrayBuffer(t), i = new Uint8Array(n); for (const t of e)
        i.set(new Uint8Array(t), r), r += t.byteLength; return n; }
    function O(...e) { let t = 0, r = 0; for (const r of e)
        t += r.length; const n = new ArrayBuffer(t), i = new Uint8Array(n); for (const t of e)
        i.set(t, r), r += t.length; return i; }
    function x() { const e = new Uint8Array(this.valueHex); if (this.valueHex.byteLength >= 2) {
        const t = 255 === e[0] && 128 & e[1], r = 0 === e[0] && 0 == (128 & e[1]);
        (t || r) && this.warnings.push("Needlessly long format");
    } const t = new ArrayBuffer(this.valueHex.byteLength), r = new Uint8Array(t); for (let e = 0; e < this.valueHex.byteLength; e++)
        r[e] = 0; r[0] = 128 & e[0]; const n = C(r, 8), i = new ArrayBuffer(this.valueHex.byteLength), o = new Uint8Array(i); for (let t = 0; t < this.valueHex.byteLength; t++)
        o[t] = e[t]; return o[0] &= 127, C(o, 8) - n; }
    function N(e, t) { if (e.byteLength !== t.byteLength)
        return !1; const r = new Uint8Array(e), n = new Uint8Array(t); for (let e = 0; e < r.length; e++)
        if (r[e] !== n[e])
            return !1; return !0; }
    function R(e, t) { const r = e.toString(10); if (t < r.length)
        return ""; const n = t - r.length, i = new Array(n); for (let e = 0; e < n; e++)
        i[e] = "0"; return i.join("").concat(r); }
    Math.log(2);
    const I = [new Uint8Array([1])], D = "0123456789";
    class J {
        constructor(e = {}) { this.blockLength = B(e, "blockLength", 0), this.error = B(e, "error", ""), this.warnings = B(e, "warnings", []), this.valueBeforeDecode = "valueBeforeDecode" in e ? e.valueBeforeDecode.slice(0) : new ArrayBuffer(0); }
        static blockName() { return "baseBlock"; }
        toJSON() { return { blockName: this.constructor.blockName(), blockLength: this.blockLength, error: this.error, warnings: this.warnings, valueBeforeDecode: P(this.valueBeforeDecode, 0, this.valueBeforeDecode.byteLength) }; }
    }
    const _ = e => class extends e {
        constructor(e = {}) { super(e), this.isHexOnly = B(e, "isHexOnly", !1), this.valueHex = "valueHex" in e ? e.valueHex.slice(0) : new ArrayBuffer(0); }
        static blockName() { return "hexBlock"; }
        fromBER(e, t, r) { return !1 === M(this, e, t, r) ? -1 : 0 === new Uint8Array(e, t, r).length ? (this.warnings.push("Zero buffer length"), t) : (this.valueHex = e.slice(t, t + r), this.blockLength = r, t + r); }
        toBER(e = !1) { return !0 !== this.isHexOnly ? (this.error = 'Flag "isHexOnly" is not set, abort', new ArrayBuffer(0)) : !0 === e ? new ArrayBuffer(this.valueHex.byteLength) : this.valueHex.slice(0); }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.blockName = this.constructor.blockName(), e.isHexOnly = this.isHexOnly, e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e; }
    };
    class U extends (_(J)) {
        constructor(e = {}) { super(), "idBlock" in e ? (this.isHexOnly = B(e.idBlock, "isHexOnly", !1), this.valueHex = B(e.idBlock, "valueHex", new ArrayBuffer(0)), this.tagClass = B(e.idBlock, "tagClass", -1), this.tagNumber = B(e.idBlock, "tagNumber", -1), this.isConstructed = B(e.idBlock, "isConstructed", !1)) : (this.tagClass = -1, this.tagNumber = -1, this.isConstructed = !1); }
        static blockName() { return "identificationBlock"; }
        toBER(e = !1) { let t, r, n = 0; switch (this.tagClass) {
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
        } if (this.isConstructed && (n |= 32), this.tagNumber < 31 && !this.isHexOnly) {
            if (t = new ArrayBuffer(1), r = new Uint8Array(t), !e) {
                let e = this.tagNumber;
                e &= 31, n |= e, r[0] = n;
            }
            return t;
        } if (!1 === this.isHexOnly) {
            const i = L(this.tagNumber, 7), o = new Uint8Array(i), a = i.byteLength;
            if (t = new ArrayBuffer(a + 1), r = new Uint8Array(t), r[0] = 31 | n, !e) {
                for (let e = 0; e < a - 1; e++)
                    r[e + 1] = 128 | o[e];
                r[a] = o[a - 1];
            }
            return t;
        } if (t = new ArrayBuffer(this.valueHex.byteLength + 1), r = new Uint8Array(t), r[0] = 31 | n, !1 === e) {
            const e = new Uint8Array(this.valueHex);
            for (let t = 0; t < e.length - 1; t++)
                r[t + 1] = 128 | e[t];
            r[this.valueHex.byteLength] = e[e.length - 1];
        } return t; }
        fromBER(e, t, r) { if (!1 === M(this, e, t, r))
            return -1; const n = new Uint8Array(e, t, r); if (0 === n.length)
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
        } this.isConstructed = 32 == (32 & n[0]), this.isHexOnly = !1; const i = 31 & n[0]; if (31 !== i)
            this.tagNumber = i, this.blockLength = 1;
        else {
            let e = 1;
            this.valueHex = new ArrayBuffer(255);
            let t = 255, r = new Uint8Array(this.valueHex);
            for (; 128 & n[e];) {
                if (r[e - 1] = 127 & n[e], e++, e >= n.length)
                    return this.error = "End of input reached before message was fully decoded", -1;
                if (e === t) {
                    t += 255;
                    const e = new ArrayBuffer(t), n = new Uint8Array(e);
                    for (let e = 0; e < r.length; e++)
                        n[e] = r[e];
                    this.valueHex = new ArrayBuffer(t), r = new Uint8Array(this.valueHex);
                }
            }
            this.blockLength = e + 1, r[e - 1] = 127 & n[e];
            const i = new ArrayBuffer(e), o = new Uint8Array(i);
            for (let t = 0; t < e; t++)
                o[t] = r[t];
            this.valueHex = new ArrayBuffer(e), r = new Uint8Array(this.valueHex), r.set(o), this.blockLength <= 9 ? this.tagNumber = C(r, 7) : (this.isHexOnly = !0, this.warnings.push("Tag too long, represented as hex-coded"));
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
            } return t + this.blockLength; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.blockName = this.constructor.blockName(), e.tagClass = this.tagClass, e.tagNumber = this.tagNumber, e.isConstructed = this.isConstructed, e; }
    }
    class H extends J {
        constructor(e = {}) { super(), "lenBlock" in e ? (this.isIndefiniteForm = B(e.lenBlock, "isIndefiniteForm", !1), this.longFormUsed = B(e.lenBlock, "longFormUsed", !1), this.length = B(e.lenBlock, "length", 0)) : (this.isIndefiniteForm = !1, this.longFormUsed = !1, this.length = 0); }
        static blockName() { return "lengthBlock"; }
        fromBER(e, t, r) { if (!1 === M(this, e, t, r))
            return -1; const n = new Uint8Array(e, t, r); if (0 === n.length)
            return this.error = "Zero buffer length", -1; if (255 === n[0])
            return this.error = "Length block 0xFF is reserved by standard", -1; if (this.isIndefiniteForm = 128 === n[0], !0 === this.isIndefiniteForm)
            return this.blockLength = 1, t + this.blockLength; if (this.longFormUsed = !!(128 & n[0]), !1 === this.longFormUsed)
            return this.length = n[0], this.blockLength = 1, t + this.blockLength; const i = 127 & n[0]; if (i > 8)
            return this.error = "Too big integer", -1; if (i + 1 > n.length)
            return this.error = "End of input reached before message was fully decoded", -1; const o = new Uint8Array(i); for (let e = 0; e < i; e++)
            o[e] = n[e + 1]; return 0 === o[i - 1] && this.warnings.push("Needlessly long encoded length"), this.length = C(o, 8), this.longFormUsed && this.length <= 127 && this.warnings.push("Unnecessary usage of long length form"), this.blockLength = i + 1, t + this.blockLength; }
        toBER(e = !1) { let t, r; if (this.length > 127 && (this.longFormUsed = !0), this.isIndefiniteForm)
            return t = new ArrayBuffer(1), !1 === e && (r = new Uint8Array(t), r[0] = 128), t; if (!0 === this.longFormUsed) {
            const n = L(this.length, 8);
            if (n.byteLength > 127)
                return this.error = "Too big length", new ArrayBuffer(0);
            if (t = new ArrayBuffer(n.byteLength + 1), !0 === e)
                return t;
            const i = new Uint8Array(n);
            r = new Uint8Array(t), r[0] = 128 | n.byteLength;
            for (let e = 0; e < n.byteLength; e++)
                r[e + 1] = i[e];
            return t;
        } return t = new ArrayBuffer(1), !1 === e && (r = new Uint8Array(t), r[0] = this.length), t; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.blockName = this.constructor.blockName(), e.isIndefiniteForm = this.isIndefiniteForm, e.longFormUsed = this.longFormUsed, e.length = this.length, e; }
    }
    class G extends J {
        constructor(e = {}) { super(e); }
        static blockName() { return "valueBlock"; }
        fromBER(e, t, r) { throw TypeError('User need to make a specific function in a class which extends "ValueBlock"'); }
        toBER(e = !1) { throw TypeError('User need to make a specific function in a class which extends "ValueBlock"'); }
    }
    class j extends J {
        constructor(e = {}, t = G) { super(e), "name" in e && (this.name = e.name), "optional" in e && (this.optional = e.optional), "primitiveSchema" in e && (this.primitiveSchema = e.primitiveSchema), this.idBlock = new U(e), this.lenBlock = new H(e), this.valueBlock = new t(e); }
        static blockName() { return "BaseBlock"; }
        fromBER(e, t, r) { const n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); }
        toBER(e = !1) { let t; const r = this.idBlock.toBER(e), n = this.valueBlock.toBER(!0); let i; if (this.lenBlock.length = n.byteLength, t = F(r, this.lenBlock.toBER(e)), i = !1 === e ? this.valueBlock.toBER(e) : new ArrayBuffer(this.lenBlock.length), t = F(t, i), !0 === this.lenBlock.isIndefiniteForm) {
            const r = new ArrayBuffer(2);
            if (!1 === e) {
                const e = new Uint8Array(r);
                e[0] = 0, e[1] = 0;
            }
            t = F(t, r);
        } return t; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.idBlock = this.idBlock.toJSON(), e.lenBlock = this.lenBlock.toJSON(), e.valueBlock = this.valueBlock.toJSON(), "name" in this && (e.name = this.name), "optional" in this && (e.optional = this.optional), "primitiveSchema" in this && (e.primitiveSchema = this.primitiveSchema.toJSON()), e; }
        toString() { return `${this.constructor.blockName()} : ${P(this.valueBlock.valueHex)}`; }
    }
    class X extends G {
        constructor(e = {}) { super(e), this.valueHex = "valueHex" in e ? e.valueHex.slice(0) : new ArrayBuffer(0), this.isHexOnly = B(e, "isHexOnly", !0); }
        fromBER(e, t, r) { if (!1 === M(this, e, t, r))
            return -1; const n = new Uint8Array(e, t, r); if (0 === n.length)
            return this.warnings.push("Zero buffer length"), t; this.valueHex = new ArrayBuffer(n.length); const i = new Uint8Array(this.valueHex); for (let e = 0; e < n.length; e++)
            i[e] = n[e]; return this.blockLength = r, t + r; }
        toBER(e = !1) { return this.valueHex.slice(0); }
        static blockName() { return "PrimitiveValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e.isHexOnly = this.isHexOnly, e; }
    }
    class V extends j {
        constructor(e = {}) { super(e, X), this.idBlock.isConstructed = !1; }
        static blockName() { return "PRIMITIVE"; }
    }
    class z extends G {
        constructor(e = {}) { super(e), this.value = B(e, "value", []), this.isIndefiniteForm = B(e, "isIndefiniteForm", !1); }
        fromBER(e, t, r) { const n = t, i = r; if (!1 === M(this, e, t, r))
            return -1; if (0 === new Uint8Array(e, t, r).length)
            return this.warnings.push("Zero buffer length"), t; let o = t; for (; (!0 === this.isIndefiniteForm ? 1 : r) > 0;) {
            const t = Ge(e, o, r);
            if (-1 === t.offset)
                return this.error = t.result.error, this.warnings.concat(t.result.warnings), -1;
            if (o = t.offset, this.blockLength += t.result.blockLength, r -= t.result.blockLength, this.value.push(t.result), !0 === this.isIndefiniteForm && t.result.constructor.blockName() === q.blockName())
                break;
        } return !0 === this.isIndefiniteForm && (this.value[this.value.length - 1].constructor.blockName() === q.blockName() ? this.value.pop() : this.warnings.push("No EndOfContent block encoded")), this.valueBeforeDecode = e.slice(n, n + i), o; }
        toBER(e = !1) { let t = new ArrayBuffer(0); for (let r = 0; r < this.value.length; r++)
            t = F(t, this.value[r].toBER(e)); return t; }
        static blockName() { return "ConstructedValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } e.isIndefiniteForm = this.isIndefiniteForm, e.value = []; for (let t = 0; t < this.value.length; t++)
            e.value.push(this.value[t].toJSON()); return e; }
    }
    class Z extends j {
        constructor(e = {}) { super(e, z), this.idBlock.isConstructed = !0; }
        static blockName() { return "CONSTRUCTED"; }
        fromBER(e, t, r) { this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm; const n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); }
        toString() { const e = []; for (const t of this.valueBlock.value)
            e.push(t.toString().split("\n").map((e => `  ${e}`)).join("\n")); const t = 3 === this.idBlock.tagClass ? `[${this.idBlock.tagNumber}]` : this.constructor.blockName(); return e.length ? `${t} :\n${e.join("\n")}` : `${t} :`; }
    }
    class K extends G {
        constructor(e = {}) { super(e); }
        fromBER(e, t, r) { return t; }
        toBER(e = !1) { return new ArrayBuffer(0); }
        static blockName() { return "EndOfContentValueBlock"; }
    }
    class q extends j {
        constructor(e = {}) { super(e, K), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 0; }
        static blockName() { return "EndOfContent"; }
    }
    class Q extends G {
        constructor(e = {}) { super(e), this.value = B(e, "value", !1), this.isHexOnly = B(e, "isHexOnly", !1), "valueHex" in e ? this.valueHex = e.valueHex.slice(0) : (this.valueHex = new ArrayBuffer(1), !0 === this.value && (new Uint8Array(this.valueHex)[0] = 255)); }
        fromBER(e, t, r) { if (!1 === M(this, e, t, r))
            return -1; const n = new Uint8Array(e, t, r); r > 1 && this.warnings.push("Boolean value encoded in more then 1 octet"), this.isHexOnly = !0, this.valueHex = new ArrayBuffer(n.length); const i = new Uint8Array(this.valueHex); for (let e = 0; e < n.length; e++)
            i[e] = n[e]; return 0 !== x.call(this) ? this.value = !0 : this.value = !1, this.blockLength = r, t + r; }
        toBER(e = !1) { return this.valueHex; }
        static blockName() { return "BooleanValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.value = this.value, e.isHexOnly = this.isHexOnly, e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e; }
    }
    class W extends j {
        constructor(e = {}) { super(e, Q), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 1; }
        static blockName() { return "BOOLEAN"; }
        toString() { return `${this.constructor.blockName()} : ${this.valueBlock.value}`; }
    }
    class Y extends Z {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 16; }
        static blockName() { return "SEQUENCE"; }
    }
    class $ extends Z {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 17; }
        static blockName() { return "SET"; }
    }
    class ee extends j {
        constructor(e = {}) { super(e, J), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 5; }
        static blockName() { return "NULL"; }
        fromBER(e, t, r) { return this.lenBlock.length > 0 && this.warnings.push("Non-zero length of value block for Null type"), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), this.blockLength += r, t + r > e.byteLength ? (this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", -1) : t + r; }
        toBER(e = !1) { const t = new ArrayBuffer(2); if (!0 === e)
            return t; const r = new Uint8Array(t); return r[0] = 5, r[1] = 0, t; }
        toString() { return `${this.constructor.blockName()}`; }
    }
    class te extends (_(z)) {
        constructor(e = {}) { super(e), this.isConstructed = B(e, "isConstructed", !1); }
        fromBER(e, t, r) { let n = 0; if (!0 === this.isConstructed) {
            if (this.isHexOnly = !1, n = z.prototype.fromBER.call(this, e, t, r), -1 === n)
                return n;
            for (let e = 0; e < this.value.length; e++) {
                const t = this.value[e].constructor.blockName();
                if (t === q.blockName()) {
                    if (!0 === this.isIndefiniteForm)
                        break;
                    return this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only", -1;
                }
                if (t !== re.blockName())
                    return this.error = "OCTET STRING may consists of OCTET STRINGs only", -1;
            }
        }
        else
            this.isHexOnly = !0, n = super.fromBER(e, t, r), this.blockLength = r; return n; }
        toBER(e = !1) { if (!0 === this.isConstructed)
            return z.prototype.toBER.call(this, e); let t = new ArrayBuffer(this.valueHex.byteLength); return !0 === e || 0 === this.valueHex.byteLength || (t = this.valueHex.slice(0)), t; }
        static blockName() { return "OctetStringValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.isConstructed = this.isConstructed, e.isHexOnly = this.isHexOnly, e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e; }
    }
    class re extends j {
        constructor(e = {}) { super(e, te), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 4; }
        fromBER(e, t, r) { if (this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, 0 === r)
            return 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), t; if (!this.valueBlock.isConstructed) {
            const n = e.slice(t, t + r);
            try {
                const e = je(n);
                -1 !== e.offset && e.offset === r && (this.valueBlock.value = [e.result]);
            }
            catch (e) { }
        } return super.fromBER(e, t, r); }
        static blockName() { return "OCTET STRING"; }
        isEqual(e) { return e instanceof re != 0 && JSON.stringify(this) === JSON.stringify(e); }
        toString() { return this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length ? Z.prototype.toString.call(this) : `${this.constructor.blockName()} : ${P(this.valueBlock.valueHex)}`; }
    }
    class ne extends (_(z)) {
        constructor(e = {}) { super(e), this.unusedBits = B(e, "unusedBits", 0), this.isConstructed = B(e, "isConstructed", !1), this.blockLength = this.valueHex.byteLength; }
        fromBER(e, t, r) { if (0 === r)
            return t; let n = -1; if (!0 === this.isConstructed) {
            if (n = z.prototype.fromBER.call(this, e, t, r), -1 === n)
                return n;
            for (let e = 0; e < this.value.length; e++) {
                const t = this.value[e].constructor.blockName();
                if (t === q.blockName()) {
                    if (!0 === this.isIndefiniteForm)
                        break;
                    return this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only", -1;
                }
                if (t !== ie.blockName())
                    return this.error = "BIT STRING may consists of BIT STRINGs only", -1;
                if (this.unusedBits > 0 && this.value[e].valueBlock.unusedBits > 0)
                    return this.error = 'Using of "unused bits" inside constructive BIT STRING allowed for least one only', -1;
                if (this.unusedBits = this.value[e].valueBlock.unusedBits, this.unusedBits > 7)
                    return this.error = "Unused bits for BitString must be in range 0-7", -1;
            }
            return n;
        } if (!1 === M(this, e, t, r))
            return -1; const i = new Uint8Array(e, t, r); if (this.unusedBits = i[0], this.unusedBits > 7)
            return this.error = "Unused bits for BitString must be in range 0-7", -1; if (!this.unusedBits) {
            const n = e.slice(t + 1, t + r);
            try {
                const e = je(n);
                -1 !== e.offset && e.offset === r - 1 && (this.value = [e.result]);
            }
            catch (e) { }
        } this.valueHex = new ArrayBuffer(i.length - 1); const o = new Uint8Array(this.valueHex); for (let e = 0; e < r - 1; e++)
            o[e] = i[e + 1]; return this.blockLength = i.length, t + r; }
        toBER(e = !1) { if (!0 === this.isConstructed)
            return z.prototype.toBER.call(this, e); if (!0 === e)
            return new ArrayBuffer(this.valueHex.byteLength + 1); if (0 === this.valueHex.byteLength)
            return new ArrayBuffer(0); const t = new Uint8Array(this.valueHex), r = new ArrayBuffer(this.valueHex.byteLength + 1), n = new Uint8Array(r); n[0] = this.unusedBits; for (let e = 0; e < this.valueHex.byteLength; e++)
            n[e + 1] = t[e]; return r; }
        static blockName() { return "BitStringValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.unusedBits = this.unusedBits, e.isConstructed = this.isConstructed, e.isHexOnly = this.isHexOnly, e.valueHex = P(this.valueHex, 0, this.valueHex.byteLength), e; }
    }
    class ie extends j {
        constructor(e = {}) { super(e, ne), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 3; }
        static blockName() { return "BIT STRING"; }
        fromBER(e, t, r) { return 0 === r ? t : (this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, super.fromBER(e, t, r)); }
        isEqual(e) { return e instanceof ie != 0 && JSON.stringify(this) === JSON.stringify(e); }
        toString() { if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length)
            return Z.prototype.toString.call(this); {
            const e = [], t = new Uint8Array(this.valueBlock.valueHex);
            for (const r of t)
                e.push(r.toString(2).padStart(8, "0"));
            return `${this.constructor.blockName()} : ${e.join("")}`;
        } }
    }
    class oe extends (_(G)) {
        constructor(e = {}) { super(e), "value" in e && (this.valueDec = e.value); }
        set valueHex(e) { this._valueHex = e.slice(0), e.byteLength >= 4 ? (this.warnings.push("Too big Integer for decoding, hex only"), this.isHexOnly = !0, this._valueDec = 0) : (this.isHexOnly = !1, e.byteLength > 0 && (this._valueDec = x.call(this))); }
        get valueHex() { return this._valueHex; }
        set valueDec(e) { this._valueDec = e, this.isHexOnly = !1, this._valueHex = function (e) { const t = e < 0 ? -1 * e : e; let r = 128; for (let n = 1; n < 8; n++) {
            if (t <= r) {
                if (e < 0) {
                    const e = L(r - t, 8, n);
                    return new Uint8Array(e)[0] |= 128, e;
                }
                let i = L(t, 8, n), o = new Uint8Array(i);
                if (128 & o[0]) {
                    const e = i.slice(0), t = new Uint8Array(e);
                    i = new ArrayBuffer(i.byteLength + 1), o = new Uint8Array(i);
                    for (let r = 0; r < e.byteLength; r++)
                        o[r + 1] = t[r];
                    o[0] = 0;
                }
                return i;
            }
            r *= Math.pow(2, 8);
        } return new ArrayBuffer(0); }(e); }
        get valueDec() { return this._valueDec; }
        fromDER(e, t, r, n = 0) { const i = this.fromBER(e, t, r); if (-1 === i)
            return i; const o = new Uint8Array(this._valueHex); if (0 === o[0] && 0 != (128 & o[1])) {
            const e = new ArrayBuffer(this._valueHex.byteLength - 1);
            new Uint8Array(e).set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1)), this._valueHex = e.slice(0);
        }
        else if (0 !== n && this._valueHex.byteLength < n) {
            n - this._valueHex.byteLength > 1 && (n = this._valueHex.byteLength + 1);
            const e = new ArrayBuffer(n);
            new Uint8Array(e).set(o, n - this._valueHex.byteLength), this._valueHex = e.slice(0);
        } return i; }
        toDER(e = !1) { const t = new Uint8Array(this._valueHex); switch (!0) {
            case 0 != (128 & t[0]):
                {
                    const e = new ArrayBuffer(this._valueHex.byteLength + 1), r = new Uint8Array(e);
                    r[0] = 0, r.set(t, 1), this._valueHex = e.slice(0);
                }
                break;
            case 0 === t[0] && 0 == (128 & t[1]): {
                const e = new ArrayBuffer(this._valueHex.byteLength - 1);
                new Uint8Array(e).set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1)), this._valueHex = e.slice(0);
            }
        } return this.toBER(e); }
        fromBER(e, t, r) { const n = super.fromBER(e, t, r); return -1 === n ? n : (this.blockLength = r, t + r); }
        toBER(e = !1) { return this.valueHex.slice(0); }
        static blockName() { return "IntegerValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.valueDec = this.valueDec, e; }
        toString() { function e(e, t) { const r = new Uint8Array([0]); let n = new Uint8Array(e), i = new Uint8Array(t), o = n.slice(0); const a = o.length - 1; let s = i.slice(0); const c = s.length - 1; let l = 0, u = 0; for (let e = c < a ? a : c; e >= 0; e--, u++)
            l = 1 == u < s.length ? o[a - u] + s[c - u] + r[0] : o[a - u] + r[0], r[0] = l / 10, 1 == u >= o.length ? o = O(new Uint8Array([l % 10]), o) : o[a - u] = l % 10; return r[0] > 0 && (o = O(r, o)), o.slice(0); } function t(e) { if (e >= I.length)
            for (let t = I.length; t <= e; t++) {
                const e = new Uint8Array([0]);
                let r = I[t - 1].slice(0);
                for (let t = r.length - 1; t >= 0; t--) {
                    const n = new Uint8Array([(r[t] << 1) + e[0]]);
                    e[0] = n[0] / 10, r[t] = n[0] % 10;
                }
                e[0] > 0 && (r = O(e, r)), I.push(r);
            } return I[e]; } function r(e, t) { let r = 0, n = new Uint8Array(e), i = new Uint8Array(t), o = n.slice(0); const a = o.length - 1; let s = i.slice(0); const c = s.length - 1; let l, u = 0; for (let e = c; e >= 0; e--, u++)
            l = o[a - u] - s[c - u] - r, 1 == l < 0 ? (r = 1, o[a - u] = l + 10) : (r = 0, o[a - u] = l); if (r > 0)
            for (let e = a - c + 1; e >= 0; e--, u++) {
                if (l = o[a - u] - r, !(l < 0)) {
                    r = 0, o[a - u] = l;
                    break;
                }
                r = 1, o[a - u] = l + 10;
            } return o.slice(); } const n = 8 * this._valueHex.byteLength - 1; let i, o = new Uint8Array(8 * this._valueHex.byteLength / 3), a = 0; const s = new Uint8Array(this._valueHex); let c = "", l = !1; for (let l = this._valueHex.byteLength - 1; l >= 0; l--) {
            i = s[l];
            for (let s = 0; s < 8; s++)
                1 == (1 & i) && (a === n ? (o = r(t(a), o), c = "-") : o = e(o, t(a))), a++, i >>= 1;
        } for (let e = 0; e < o.length; e++)
            o[e] && (l = !0), l && (c += D.charAt(o[e])); return !1 === l && (c += D.charAt(0)), c; }
    }
    class ae extends j {
        constructor(e = {}) { super(e, oe), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 2; }
        static blockName() { return "INTEGER"; }
        isEqual(e) { return e instanceof ae ? this.valueBlock.isHexOnly && e.valueBlock.isHexOnly ? N(this.valueBlock.valueHex, e.valueBlock.valueHex) : this.valueBlock.isHexOnly === e.valueBlock.isHexOnly && this.valueBlock.valueDec === e.valueBlock.valueDec : e instanceof ArrayBuffer && N(this.valueBlock.valueHex, e); }
        convertToDER() { const e = new ae({ valueHex: this.valueBlock.valueHex }); return e.valueBlock.toDER(), e; }
        convertFromDER() { const e = this.valueBlock.valueHex.byteLength % 2 ? this.valueBlock.valueHex.byteLength + 1 : this.valueBlock.valueHex.byteLength, t = new ae({ valueHex: this.valueBlock.valueHex }); return t.valueBlock.fromDER(t.valueBlock.valueHex, 0, t.valueBlock.valueHex.byteLength, e), t; }
        toString() { const e = P(this.valueBlock.valueHex), t = BigInt(`0x${e}`); return `${this.constructor.blockName()} : ${t.toString()}`; }
    }
    class se extends ae {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 10; }
        static blockName() { return "ENUMERATED"; }
    }
    class ce extends (_(J)) {
        constructor(e = {}) { super(e), this.valueDec = B(e, "valueDec", -1), this.isFirstSid = B(e, "isFirstSid", !1); }
        static blockName() { return "sidBlock"; }
        fromBER(e, t, r) { if (0 === r)
            return t; if (!1 === M(this, e, t, r))
            return -1; const n = new Uint8Array(e, t, r); this.valueHex = new ArrayBuffer(r); let i = new Uint8Array(this.valueHex); for (let e = 0; e < r && (i[e] = 127 & n[e], this.blockLength++, 0 != (128 & n[e])); e++)
            ; const o = new ArrayBuffer(this.blockLength), a = new Uint8Array(o); for (let e = 0; e < this.blockLength; e++)
            a[e] = i[e]; return this.valueHex = o.slice(0), i = new Uint8Array(this.valueHex), 0 != (128 & n[this.blockLength - 1]) ? (this.error = "End of input reached before message was fully decoded", -1) : (0 === i[0] && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = C(i, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), t + this.blockLength); }
        toBER(e = !1) { let t, r; if (this.isHexOnly) {
            if (!0 === e)
                return new ArrayBuffer(this.valueHex.byteLength);
            const n = new Uint8Array(this.valueHex);
            t = new ArrayBuffer(this.blockLength), r = new Uint8Array(t);
            for (let e = 0; e < this.blockLength - 1; e++)
                r[e] = 128 | n[e];
            return r[this.blockLength - 1] = n[this.blockLength - 1], t;
        } const n = L(this.valueDec, 7); if (0 === n.byteLength)
            return this.error = "Error during encoding SID value", new ArrayBuffer(0); if (t = new ArrayBuffer(n.byteLength), !1 === e) {
            const e = new Uint8Array(n);
            r = new Uint8Array(t);
            for (let t = 0; t < n.byteLength - 1; t++)
                r[t] = 128 | e[t];
            r[n.byteLength - 1] = e[n.byteLength - 1];
        } return t; }
        toString() { let e = ""; if (!0 === this.isHexOnly)
            e = P(this.valueHex, 0, this.valueHex.byteLength);
        else if (this.isFirstSid) {
            let t = this.valueDec;
            this.valueDec <= 39 ? e = "0." : this.valueDec <= 79 ? (e = "1.", t -= 40) : (e = "2.", t -= 80), e += t.toString();
        }
        else
            e = this.valueDec.toString(); return e; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.valueDec = this.valueDec, e.isFirstSid = this.isFirstSid, e; }
    }
    class le extends G {
        constructor(e = {}) { super(e), this.fromString(B(e, "value", "")); }
        fromBER(e, t, r) { let n = t; for (; r > 0;) {
            const t = new ce;
            if (n = t.fromBER(e, n, r), -1 === n)
                return this.blockLength = 0, this.error = t.error, n;
            0 === this.value.length && (t.isFirstSid = !0), this.blockLength += t.blockLength, r -= t.blockLength, this.value.push(t);
        } return n; }
        toBER(e = !1) { let t = new ArrayBuffer(0); for (let r = 0; r < this.value.length; r++) {
            const n = this.value[r].toBER(e);
            if (0 === n.byteLength)
                return this.error = this.value[r].error, new ArrayBuffer(0);
            t = F(t, n);
        } return t; }
        fromString(e) { this.value = []; let t = 0, r = 0, n = "", i = !1; do {
            if (r = e.indexOf(".", t), n = -1 === r ? e.substr(t) : e.substr(t, r - t), t = r + 1, i) {
                const e = this.value[0];
                let t = 0;
                switch (e.valueDec) {
                    case 0: break;
                    case 1:
                        t = 40;
                        break;
                    case 2:
                        t = 80;
                        break;
                    default: return this.value = [], !1;
                }
                const r = parseInt(n, 10);
                if (isNaN(r))
                    return !0;
                e.valueDec = r + t, i = !1;
            }
            else {
                const e = new ce;
                if (e.valueDec = parseInt(n, 10), isNaN(e.valueDec))
                    return !0;
                0 === this.value.length && (e.isFirstSid = !0, i = !0), this.value.push(e);
            }
        } while (-1 !== r); return !0; }
        toString() { let e = "", t = !1; for (let r = 0; r < this.value.length; r++) {
            t = this.value[r].isHexOnly;
            let n = this.value[r].toString();
            0 !== r && (e = `${e}.`), t ? (n = `{${n}}`, this.value[r].isFirstSid ? e = `2.{${n} - 80}` : e += n) : e += n;
        } return e; }
        static blockName() { return "ObjectIdentifierValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } e.value = this.toString(), e.sidArray = []; for (let t = 0; t < this.value.length; t++)
            e.sidArray.push(this.value[t].toJSON()); return e; }
    }
    class ue extends j {
        constructor(e = {}) { super(e, le), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 6; }
        static blockName() { return "OBJECT IDENTIFIER"; }
        toString() { return `${this.constructor.blockName()} : ${this.valueBlock.toString()}`; }
    }
    class fe extends (_(J)) {
        constructor(e = {}) { super(e), this.isHexOnly = !0, this.value = ""; }
        static blockName() { return "Utf8StringValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.value = this.value, e; }
    }
    class he extends j {
        constructor(e = {}) { super(e, fe), "value" in e && this.fromString(e.value), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 12; }
        static blockName() { return "UTF8String"; }
        fromBER(e, t, r) { const n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); }
        fromBuffer(e) { this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(e)); try {
            this.valueBlock.value = decodeURIComponent(escape(this.valueBlock.value));
        }
        catch (e) {
            this.warnings.push(`Error during "decodeURIComponent": ${e}, using raw string`);
        } }
        fromString(e) { const t = unescape(encodeURIComponent(e)), r = t.length; this.valueBlock.valueHex = new ArrayBuffer(r); const n = new Uint8Array(this.valueBlock.valueHex); for (let e = 0; e < r; e++)
            n[e] = t.charCodeAt(e); this.valueBlock.value = e; }
        toString() { return `${this.constructor.blockName()} : ${this.valueBlock.value}`; }
    }
    class de extends (_(J)) {
        constructor(e = {}) { super(e), this.valueDec = B(e, "valueDec", -1); }
        static blockName() { return "relativeSidBlock"; }
        fromBER(e, t, r) { if (0 === r)
            return t; if (!1 === M(this, e, t, r))
            return -1; const n = new Uint8Array(e, t, r); this.valueHex = new ArrayBuffer(r); let i = new Uint8Array(this.valueHex); for (let e = 0; e < r && (i[e] = 127 & n[e], this.blockLength++, 0 != (128 & n[e])); e++)
            ; const o = new ArrayBuffer(this.blockLength), a = new Uint8Array(o); for (let e = 0; e < this.blockLength; e++)
            a[e] = i[e]; return this.valueHex = o.slice(0), i = new Uint8Array(this.valueHex), 0 != (128 & n[this.blockLength - 1]) ? (this.error = "End of input reached before message was fully decoded", -1) : (0 === i[0] && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = C(i, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), t + this.blockLength); }
        toBER(e = !1) { let t, r; if (this.isHexOnly) {
            if (!0 === e)
                return new ArrayBuffer(this.valueHex.byteLength);
            const n = new Uint8Array(this.valueHex);
            t = new ArrayBuffer(this.blockLength), r = new Uint8Array(t);
            for (let e = 0; e < this.blockLength - 1; e++)
                r[e] = 128 | n[e];
            return r[this.blockLength - 1] = n[this.blockLength - 1], t;
        } const n = L(this.valueDec, 7); if (0 === n.byteLength)
            return this.error = "Error during encoding SID value", new ArrayBuffer(0); if (t = new ArrayBuffer(n.byteLength), !1 === e) {
            const e = new Uint8Array(n);
            r = new Uint8Array(t);
            for (let t = 0; t < n.byteLength - 1; t++)
                r[t] = 128 | e[t];
            r[n.byteLength - 1] = e[n.byteLength - 1];
        } return t; }
        toString() { let e = ""; return e = !0 === this.isHexOnly ? P(this.valueHex, 0, this.valueHex.byteLength) : this.valueDec.toString(), e; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.valueDec = this.valueDec, e; }
    }
    class pe extends G {
        constructor(e = {}) { super(e), this.fromString(B(e, "value", "")); }
        fromBER(e, t, r) { let n = t; for (; r > 0;) {
            const t = new de;
            if (n = t.fromBER(e, n, r), -1 === n)
                return this.blockLength = 0, this.error = t.error, n;
            this.blockLength += t.blockLength, r -= t.blockLength, this.value.push(t);
        } return n; }
        toBER(e = !1) { let t = new ArrayBuffer(0); for (let r = 0; r < this.value.length; r++) {
            const n = this.value[r].toBER(e);
            if (0 === n.byteLength)
                return this.error = this.value[r].error, new ArrayBuffer(0);
            t = F(t, n);
        } return t; }
        fromString(e) { this.value = []; let t = 0, r = 0, n = ""; do {
            r = e.indexOf(".", t), n = -1 === r ? e.substr(t) : e.substr(t, r - t), t = r + 1;
            const i = new de;
            if (i.valueDec = parseInt(n, 10), isNaN(i.valueDec))
                return !0;
            this.value.push(i);
        } while (-1 !== r); return !0; }
        toString() { let e = "", t = !1; for (let r = 0; r < this.value.length; r++) {
            t = this.value[r].isHexOnly;
            let n = this.value[r].toString();
            0 !== r && (e = `${e}.`), t ? (n = `{${n}}`, e += n) : e += n;
        } return e; }
        static blockName() { return "RelativeObjectIdentifierValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } e.value = this.toString(), e.sidArray = []; for (let t = 0; t < this.value.length; t++)
            e.sidArray.push(this.value[t].toJSON()); return e; }
    }
    class ge extends j {
        constructor(e = {}) { super(e, pe), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 13; }
        static blockName() { return "RelativeObjectIdentifier"; }
    }
    class me extends (_(J)) {
        constructor(e = {}) { super(e), this.isHexOnly = !0, this.value = ""; }
        static blockName() { return "BmpStringValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.value = this.value, e; }
    }
    class be extends j {
        constructor(e = {}) { super(e, me), "value" in e && this.fromString(e.value), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 30; }
        static blockName() { return "BMPString"; }
        fromBER(e, t, r) { const n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); }
        fromBuffer(e) { const t = e.slice(0), r = new Uint8Array(t); for (let e = 0; e < r.length; e += 2) {
            const t = r[e];
            r[e] = r[e + 1], r[e + 1] = t;
        } this.valueBlock.value = String.fromCharCode.apply(null, new Uint16Array(t)); }
        fromString(e) { const t = e.length; this.valueBlock.valueHex = new ArrayBuffer(2 * t); const r = new Uint8Array(this.valueBlock.valueHex); for (let n = 0; n < t; n++) {
            const t = L(e.charCodeAt(n), 8), i = new Uint8Array(t);
            if (i.length > 2)
                continue;
            const o = 2 - i.length;
            for (let e = i.length - 1; e >= 0; e--)
                r[2 * n + e + o] = i[e];
        } this.valueBlock.value = e; }
        toString() { return `${this.constructor.blockName()} : ${this.valueBlock.value}`; }
    }
    class ye extends (_(J)) {
        constructor(e = {}) { super(e), this.isHexOnly = !0, this.value = ""; }
        static blockName() { return "UniversalStringValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.value = this.value, e; }
    }
    class ve extends j {
        constructor(e = {}) { super(e, ye), "value" in e && this.fromString(e.value), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 28; }
        static blockName() { return "UniversalString"; }
        fromBER(e, t, r) { const n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); }
        fromBuffer(e) { const t = e.slice(0), r = new Uint8Array(t); for (let e = 0; e < r.length; e += 4)
            r[e] = r[e + 3], r[e + 1] = r[e + 2], r[e + 2] = 0, r[e + 3] = 0; this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(t)); }
        fromString(e) { const t = e.length; this.valueBlock.valueHex = new ArrayBuffer(4 * t); const r = new Uint8Array(this.valueBlock.valueHex); for (let n = 0; n < t; n++) {
            const t = L(e.charCodeAt(n), 8), i = new Uint8Array(t);
            if (i.length > 4)
                continue;
            const o = 4 - i.length;
            for (let e = i.length - 1; e >= 0; e--)
                r[4 * n + e + o] = i[e];
        } this.valueBlock.value = e; }
        toString() { return `${this.constructor.blockName()} : ${this.valueBlock.value}`; }
    }
    class Ae extends (_(J)) {
        constructor(e = {}) { super(e), this.value = "", this.isHexOnly = !0; }
        static blockName() { return "SimpleStringValueBlock"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.value = this.value, e; }
    }
    class Se extends j {
        constructor(e = {}) { super(e, Ae), "value" in e && this.fromString(e.value); }
        static blockName() { return "SIMPLESTRING"; }
        fromBER(e, t, r) { const n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); }
        fromBuffer(e) { this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(e)); }
        fromString(e) { const t = e.length; this.valueBlock.valueHex = new ArrayBuffer(t); const r = new Uint8Array(this.valueBlock.valueHex); for (let n = 0; n < t; n++)
            r[n] = e.charCodeAt(n); this.valueBlock.value = e; }
        toString() { return `${this.constructor.blockName()} : ${this.valueBlock.value}`; }
    }
    class we extends Se {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 18; }
        static blockName() { return "NumericString"; }
    }
    class Ee extends Se {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 19; }
        static blockName() { return "PrintableString"; }
    }
    class Te extends Se {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 20; }
        static blockName() { return "TeletexString"; }
    }
    class ke extends Se {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 21; }
        static blockName() { return "VideotexString"; }
    }
    class Be extends Se {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 22; }
        static blockName() { return "IA5String"; }
    }
    class Pe extends Se {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 25; }
        static blockName() { return "GraphicString"; }
    }
    class Me extends Se {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 26; }
        static blockName() { return "VisibleString"; }
    }
    class Ce extends Se {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 27; }
        static blockName() { return "GeneralString"; }
    }
    class Le extends Se {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 29; }
        static blockName() { return "CharacterString"; }
    }
    class Fe extends Me {
        constructor(e = {}) { if (super(e), this.year = 0, this.month = 0, this.day = 0, this.hour = 0, this.minute = 0, this.second = 0, "value" in e) {
            this.fromString(e.value), this.valueBlock.valueHex = new ArrayBuffer(e.value.length);
            const t = new Uint8Array(this.valueBlock.valueHex);
            for (let r = 0; r < e.value.length; r++)
                t[r] = e.value.charCodeAt(r);
        } "valueDate" in e && (this.fromDate(e.valueDate), this.valueBlock.valueHex = this.toBuffer()), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 23; }
        fromBER(e, t, r) { const n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); }
        fromBuffer(e) { this.fromString(String.fromCharCode.apply(null, new Uint8Array(e))); }
        toBuffer() { const e = this.toString(), t = new ArrayBuffer(e.length), r = new Uint8Array(t); for (let t = 0; t < e.length; t++)
            r[t] = e.charCodeAt(t); return t; }
        fromDate(e) { this.year = e.getUTCFullYear(), this.month = e.getUTCMonth() + 1, this.day = e.getUTCDate(), this.hour = e.getUTCHours(), this.minute = e.getUTCMinutes(), this.second = e.getUTCSeconds(); }
        toDate() { return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second)); }
        fromString(e) { const t = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/gi.exec(e); if (null === t)
            return void (this.error = "Wrong input string for convertion"); const r = parseInt(t[1], 10); this.year = r >= 50 ? 1900 + r : 2e3 + r, this.month = parseInt(t[2], 10), this.day = parseInt(t[3], 10), this.hour = parseInt(t[4], 10), this.minute = parseInt(t[5], 10), this.second = parseInt(t[6], 10); }
        toString() { const e = new Array(7); return e[0] = R(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2), e[1] = R(this.month, 2), e[2] = R(this.day, 2), e[3] = R(this.hour, 2), e[4] = R(this.minute, 2), e[5] = R(this.second, 2), e[6] = "Z", e.join(""); }
        static blockName() { return "UTCTime"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.year = this.year, e.month = this.month, e.day = this.day, e.hour = this.hour, e.minute = this.minute, e.second = this.second, e; }
    }
    class Oe extends Me {
        constructor(e = {}) { if (super(e), this.year = 0, this.month = 0, this.day = 0, this.hour = 0, this.minute = 0, this.second = 0, this.millisecond = 0, "value" in e) {
            this.fromString(e.value), this.valueBlock.valueHex = new ArrayBuffer(e.value.length);
            const t = new Uint8Array(this.valueBlock.valueHex);
            for (let r = 0; r < e.value.length; r++)
                t[r] = e.value.charCodeAt(r);
        } "valueDate" in e && (this.fromDate(e.valueDate), this.valueBlock.valueHex = this.toBuffer()), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 24; }
        fromBER(e, t, r) { const n = this.valueBlock.fromBER(e, t, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length); return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), n); }
        fromBuffer(e) { this.fromString(String.fromCharCode.apply(null, new Uint8Array(e))); }
        toBuffer() { const e = this.toString(), t = new ArrayBuffer(e.length), r = new Uint8Array(t); for (let t = 0; t < e.length; t++)
            r[t] = e.charCodeAt(t); return t; }
        fromDate(e) { this.year = e.getUTCFullYear(), this.month = e.getUTCMonth() + 1, this.day = e.getUTCDate(), this.hour = e.getUTCHours(), this.minute = e.getUTCMinutes(), this.second = e.getUTCSeconds(), this.millisecond = e.getUTCMilliseconds(); }
        toDate() { return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)); }
        fromString(e) { let t, r = !1, n = "", i = "", o = 0, a = 0, s = 0; if ("Z" === e[e.length - 1])
            n = e.substr(0, e.length - 1), r = !0;
        else {
            const t = new Number(e[e.length - 1]);
            if (isNaN(t.valueOf()))
                throw new Error("Wrong input string for convertion");
            n = e;
        } if (r) {
            if (-1 !== n.indexOf("+"))
                throw new Error("Wrong input string for convertion");
            if (-1 !== n.indexOf("-"))
                throw new Error("Wrong input string for convertion");
        }
        else {
            let e = 1, t = n.indexOf("+"), r = "";
            if (-1 === t && (t = n.indexOf("-"), e = -1), -1 !== t) {
                if (r = n.substr(t + 1), n = n.substr(0, t), 2 !== r.length && 4 !== r.length)
                    throw new Error("Wrong input string for convertion");
                let i = new Number(r.substr(0, 2));
                if (isNaN(i.valueOf()))
                    throw new Error("Wrong input string for convertion");
                if (a = e * i, 4 === r.length) {
                    if (i = new Number(r.substr(2, 2)), isNaN(i.valueOf()))
                        throw new Error("Wrong input string for convertion");
                    s = e * i;
                }
            }
        } let c = n.indexOf("."); if (-1 === c && (c = n.indexOf(",")), -1 !== c) {
            const e = new Number(`0${n.substr(c)}`);
            if (isNaN(e.valueOf()))
                throw new Error("Wrong input string for convertion");
            o = e.valueOf(), i = n.substr(0, c);
        }
        else
            i = n; switch (!0) {
            case 8 === i.length:
                if (t = /(\d{4})(\d{2})(\d{2})/gi, -1 !== c)
                    throw new Error("Wrong input string for convertion");
                break;
            case 10 === i.length:
                if (t = /(\d{4})(\d{2})(\d{2})(\d{2})/gi, -1 !== c) {
                    let e = 60 * o;
                    this.minute = Math.floor(e), e = 60 * (e - this.minute), this.second = Math.floor(e), e = 1e3 * (e - this.second), this.millisecond = Math.floor(e);
                }
                break;
            case 12 === i.length:
                if (t = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/gi, -1 !== c) {
                    let e = 60 * o;
                    this.second = Math.floor(e), e = 1e3 * (e - this.second), this.millisecond = Math.floor(e);
                }
                break;
            case 14 === i.length:
                if (t = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/gi, -1 !== c) {
                    const e = 1e3 * o;
                    this.millisecond = Math.floor(e);
                }
                break;
            default: throw new Error("Wrong input string for convertion");
        } const l = t.exec(i); if (null === l)
            throw new Error("Wrong input string for convertion"); for (let e = 1; e < l.length; e++)
            switch (e) {
                case 1:
                    this.year = parseInt(l[e], 10);
                    break;
                case 2:
                    this.month = parseInt(l[e], 10);
                    break;
                case 3:
                    this.day = parseInt(l[e], 10);
                    break;
                case 4:
                    this.hour = parseInt(l[e], 10) + a;
                    break;
                case 5:
                    this.minute = parseInt(l[e], 10) + s;
                    break;
                case 6:
                    this.second = parseInt(l[e], 10);
                    break;
                default: throw new Error("Wrong input string for convertion");
            } if (!1 === r) {
            const e = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
            this.year = e.getUTCFullYear(), this.month = e.getUTCMonth(), this.day = e.getUTCDay(), this.hour = e.getUTCHours(), this.minute = e.getUTCMinutes(), this.second = e.getUTCSeconds(), this.millisecond = e.getUTCMilliseconds();
        } }
        toString() { const e = []; return e.push(R(this.year, 4)), e.push(R(this.month, 2)), e.push(R(this.day, 2)), e.push(R(this.hour, 2)), e.push(R(this.minute, 2)), e.push(R(this.second, 2)), 0 !== this.millisecond && (e.push("."), e.push(R(this.millisecond, 3))), e.push("Z"), e.join(""); }
        static blockName() { return "GeneralizedTime"; }
        toJSON() { let e = {}; try {
            e = super.toJSON();
        }
        catch (e) { } return e.year = this.year, e.month = this.month, e.day = this.day, e.hour = this.hour, e.minute = this.minute, e.second = this.second, e.millisecond = this.millisecond, e; }
    }
    class xe extends he {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 31; }
        static blockName() { return "DATE"; }
    }
    class Ne extends he {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 32; }
        static blockName() { return "TimeOfDay"; }
    }
    class Re extends he {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 33; }
        static blockName() { return "DateTime"; }
    }
    class Ie extends he {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 34; }
        static blockName() { return "Duration"; }
    }
    class De extends he {
        constructor(e = {}) { super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 14; }
        static blockName() { return "TIME"; }
    }
    class Je {
        constructor(e = {}) { this.value = B(e, "value", []), this.optional = B(e, "optional", !1); }
    }
    class _e {
        constructor(e = {}) { this.name = B(e, "name", ""), this.optional = B(e, "optional", !1); }
    }
    class Ue {
        constructor(e = {}) { this.name = B(e, "name", ""), this.optional = B(e, "optional", !1), this.value = B(e, "value", new _e), this.local = B(e, "local", !1); }
    }
    class He {
        constructor(e = {}) { this.data = B(e, "data", new ArrayBuffer(0)); }
        fromBER(e, t, r) { return this.data = e.slice(t, r), t + r; }
        toBER(e = !1) { return this.data; }
    }
    function Ge(e, t, r) { const n = t; let i = new j({}, Object); const o = new J; if (!1 === M(o, e, t, r))
        return i.error = o.error, { offset: -1, result: i }; if (0 === new Uint8Array(e, t, r).length)
        return i.error = "Zero buffer length", { offset: -1, result: i }; let a = i.idBlock.fromBER(e, t, r); if (i.warnings.concat(i.idBlock.warnings), -1 === a)
        return i.error = i.idBlock.error, { offset: -1, result: i }; if (t = a, r -= i.idBlock.blockLength, a = i.lenBlock.fromBER(e, t, r), i.warnings.concat(i.lenBlock.warnings), -1 === a)
        return i.error = i.lenBlock.error, { offset: -1, result: i }; if (t = a, r -= i.lenBlock.blockLength, !1 === i.idBlock.isConstructed && !0 === i.lenBlock.isIndefiniteForm)
        return i.error = "Indefinite length form used for primitive encoding form", { offset: -1, result: i }; let s = j; if (1 === i.idBlock.tagClass) {
        if (i.idBlock.tagNumber >= 37 && !1 === i.idBlock.isHexOnly)
            return i.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard", { offset: -1, result: i };
        switch (i.idBlock.tagNumber) {
            case 0:
                if (!0 === i.idBlock.isConstructed && i.lenBlock.length > 0)
                    return i.error = "Type [UNIVERSAL 0] is reserved", { offset: -1, result: i };
                s = q;
                break;
            case 1:
                s = W;
                break;
            case 2:
                s = ae;
                break;
            case 3:
                s = ie;
                break;
            case 4:
                s = re;
                break;
            case 5:
                s = ee;
                break;
            case 6:
                s = ue;
                break;
            case 10:
                s = se;
                break;
            case 12:
                s = he;
                break;
            case 13:
                s = ge;
                break;
            case 14:
                s = De;
                break;
            case 15: return i.error = "[UNIVERSAL 15] is reserved by ASN.1 standard", { offset: -1, result: i };
            case 16:
                s = Y;
                break;
            case 17:
                s = $;
                break;
            case 18:
                s = we;
                break;
            case 19:
                s = Ee;
                break;
            case 20:
                s = Te;
                break;
            case 21:
                s = ke;
                break;
            case 22:
                s = Be;
                break;
            case 23:
                s = Fe;
                break;
            case 24:
                s = Oe;
                break;
            case 25:
                s = Pe;
                break;
            case 26:
                s = Me;
                break;
            case 27:
                s = Ce;
                break;
            case 28:
                s = ve;
                break;
            case 29:
                s = Le;
                break;
            case 30:
                s = be;
                break;
            case 31:
                s = xe;
                break;
            case 32:
                s = Ne;
                break;
            case 33:
                s = Re;
                break;
            case 34:
                s = Ie;
                break;
            default: {
                let e;
                e = !0 === i.idBlock.isConstructed ? new Z : new V, e.idBlock = i.idBlock, e.lenBlock = i.lenBlock, e.warnings = i.warnings, i = e;
            }
        }
    }
    else
        s = !0 === i.idBlock.isConstructed ? Z : V; return i = function (e, t) { if (e instanceof t)
        return e; const r = new t; return r.idBlock = e.idBlock, r.lenBlock = e.lenBlock, r.warnings = e.warnings, r.valueBeforeDecode = e.valueBeforeDecode.slice(0), r; }(i, s), a = i.fromBER(e, t, !0 === i.lenBlock.isIndefiniteForm ? r : i.lenBlock.length), i.valueBeforeDecode = e.slice(n, n + i.blockLength), { offset: a, result: i }; }
    function je(e) { if (0 === e.byteLength) {
        const e = new j({}, Object);
        return e.error = "Input buffer has zero length", { offset: -1, result: e };
    } return Ge(e, 0, e.byteLength); }
    function Xe(e, t, r) { if (r instanceof Je) {
        const n = !1;
        for (let n = 0; n < r.value.length; n++)
            if (!0 === Xe(e, t, r.value[n]).verified)
                return { verified: !0, result: e };
        if (!1 === n) {
            const e = { verified: !1, result: { error: "Wrong values for Choice type" } };
            return r.hasOwnProperty("name") && (e.name = r.name), e;
        }
    } if (r instanceof _e)
        return r.hasOwnProperty("name") && (e[r.name] = t), { verified: !0, result: e }; if (e instanceof Object == 0)
        return { verified: !1, result: { error: "Wrong root object" } }; if (t instanceof Object == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 data" } }; if (r instanceof Object == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if ("idBlock" in r == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if ("fromBER" in r.idBlock == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; if ("toBER" in r.idBlock == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema" } }; const n = r.idBlock.toBER(!1); if (0 === n.byteLength)
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
        const n = new Uint8Array(r.idBlock.valueHex), i = new Uint8Array(t.idBlock.valueHex);
        if (n.length !== i.length)
            return { verified: !1, result: e };
        for (let t = 0; t < n.length; t++)
            if (n[t] !== i[1])
                return { verified: !1, result: e };
    } if (r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (e[r.name] = t)), !0 === r.idBlock.isConstructed) {
        let n = 0, i = { verified: !1 }, o = r.valueBlock.value.length;
        if (o > 0 && r.valueBlock.value[0] instanceof Ue && (o = t.valueBlock.value.length), 0 === o)
            return { verified: !0, result: e };
        if (0 === t.valueBlock.value.length && 0 !== r.valueBlock.value.length) {
            let t = !0;
            for (let e = 0; e < r.valueBlock.value.length; e++)
                t = t && (r.valueBlock.value[e].optional || !1);
            return !0 === t ? { verified: !0, result: e } : (r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && delete e[r.name]), e.error = "Inconsistent object length", { verified: !1, result: e });
        }
        for (let a = 0; a < o; a++)
            if (a - n >= t.valueBlock.value.length) {
                if (!1 === r.valueBlock.value[a].optional) {
                    const t = { verified: !1, result: e };
                    return e.error = "Inconsistent length between ASN.1 data and schema", r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (delete e[r.name], t.name = r.name)), t;
                }
            }
            else if (r.valueBlock.value[0] instanceof Ue) {
                if (i = Xe(e, t.valueBlock.value[a], r.valueBlock.value[0].value), !1 === i.verified) {
                    if (!0 !== r.valueBlock.value[0].optional)
                        return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && delete e[r.name]), i;
                    n++;
                }
                if ("name" in r.valueBlock.value[0] && r.valueBlock.value[0].name.length > 0) {
                    let n = {};
                    n = "local" in r.valueBlock.value[0] && !0 === r.valueBlock.value[0].local ? t : e, void 0 === n[r.valueBlock.value[0].name] && (n[r.valueBlock.value[0].name] = []), n[r.valueBlock.value[0].name].push(t.valueBlock.value[a]);
                }
            }
            else if (i = Xe(e, t.valueBlock.value[a - n], r.valueBlock.value[a]), !1 === i.verified) {
                if (!0 !== r.valueBlock.value[a].optional)
                    return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && delete e[r.name]), i;
                n++;
            }
        if (!1 === i.verified) {
            const t = { verified: !1, result: e };
            return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (delete e[r.name], t.name = r.name)), t;
        }
        return { verified: !0, result: e };
    } if ("primitiveSchema" in r && "valueHex" in t.valueBlock) {
        const n = je(t.valueBlock.valueHex);
        if (-1 === n.offset) {
            const t = { verified: !1, result: n.result };
            return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (delete e[r.name], t.name = r.name)), t;
        }
        return Xe(e, n.result, r.primitiveSchema);
    } return { verified: !0, result: e }; }
    function Ve(e, t) { if (t instanceof Object == 0)
        return { verified: !1, result: { error: "Wrong ASN.1 schema type" } }; const r = je(e); return -1 === r.offset ? { verified: !1, result: r.result } : Xe(r.result, r.result, t); }
    function ze(e) { }
    var Ze, Ke, qe, Qe;
    (Qe = Ze || (Ze = {}))[Qe.Sequence = 0] = "Sequence", Qe[Qe.Set = 1] = "Set", Qe[Qe.Choice = 2] = "Choice", (qe = Ke || (Ke = {}))[qe.Any = 1] = "Any", qe[qe.Boolean = 2] = "Boolean", qe[qe.OctetString = 3] = "OctetString", qe[qe.BitString = 4] = "BitString", qe[qe.Integer = 5] = "Integer", qe[qe.Enumerated = 6] = "Enumerated", qe[qe.ObjectIdentifier = 7] = "ObjectIdentifier", qe[qe.Utf8String = 8] = "Utf8String", qe[qe.BmpString = 9] = "BmpString", qe[qe.UniversalString = 10] = "UniversalString", qe[qe.NumericString = 11] = "NumericString", qe[qe.PrintableString = 12] = "PrintableString", qe[qe.TeletexString = 13] = "TeletexString", qe[qe.VideotexString = 14] = "VideotexString", qe[qe.IA5String = 15] = "IA5String", qe[qe.GraphicString = 16] = "GraphicString", qe[qe.VisibleString = 17] = "VisibleString", qe[qe.GeneralString = 18] = "GeneralString", qe[qe.CharacterString = 19] = "CharacterString", qe[qe.UTCTime = 20] = "UTCTime", qe[qe.GeneralizedTime = 21] = "GeneralizedTime", qe[qe.DATE = 22] = "DATE", qe[qe.TimeOfDay = 23] = "TimeOfDay", qe[qe.DateTime = 24] = "DateTime", qe[qe.Duration = 25] = "Duration", qe[qe.TIME = 26] = "TIME", qe[qe.Null = 27] = "Null";
    const We = { fromASN: e => e instanceof ee ? null : e.valueBeforeDecode, toASN: e => { if (null === e)
            return new ee; const t = je(e); if (t.result.error)
            throw new Error(t.result.error); return t.result; } }, Ye = { fromASN: e => e.valueBlock.valueHex.byteLength > 4 ? e.valueBlock.toString() : e.valueBlock.valueDec, toASN: e => new ae({ value: e }) }, $e = { fromASN: e => e.valueBlock.valueDec, toASN: e => new se({ value: e }) }, et = { fromASN: e => e.valueBlock.valueHex, toASN: e => new ie({ valueHex: e }) }, tt = { fromASN: e => e.valueBlock.toString(), toASN: e => new ue({ value: e }) }, rt = { fromASN: e => e.valueBlock.value, toASN: e => new W({ value: e }) }, nt = { fromASN: e => e.valueBlock.valueHex, toASN: e => new re({ valueHex: e }) };
    function it(e) { return { fromASN: e => e.valueBlock.value, toASN: t => new e({ value: t }) }; }
    const ot = it(he), at = it(be), st = it(ve), ct = it(we), lt = it(Ee), ut = it(Te), ft = it(ke), ht = it(Be), dt = it(Pe), pt = it(Me), gt = it(Ce), mt = it(Le), bt = { fromASN: e => e.toDate(), toASN: e => new Fe({ valueDate: e }) }, yt = { fromASN: e => e.toDate(), toASN: e => new Oe({ valueDate: e }) }, vt = { fromASN: e => null, toASN: e => new ee };
    function At(e) { switch (e) {
        case Ke.Any: return We;
        case Ke.BitString: return et;
        case Ke.BmpString: return at;
        case Ke.Boolean: return rt;
        case Ke.CharacterString: return mt;
        case Ke.Enumerated: return $e;
        case Ke.GeneralString: return gt;
        case Ke.GeneralizedTime: return yt;
        case Ke.GraphicString: return dt;
        case Ke.IA5String: return ht;
        case Ke.Integer: return Ye;
        case Ke.Null: return vt;
        case Ke.NumericString: return ct;
        case Ke.ObjectIdentifier: return tt;
        case Ke.OctetString: return nt;
        case Ke.PrintableString: return lt;
        case Ke.TeletexString: return ut;
        case Ke.UTCTime: return bt;
        case Ke.UniversalString: return st;
        case Ke.Utf8String: return ot;
        case Ke.VideotexString: return ft;
        case Ke.VisibleString: return pt;
        default: return null;
    } }
    function St(e) { return e && e.prototype ? !(!e.prototype.toASN || !e.prototype.fromASN) || St(e.prototype) : !!(e && e.toASN && e.fromASN); }
    function wt(e) { var t; if (e) {
        const r = Object.getPrototypeOf(e);
        return (null === (t = null == r ? void 0 : r.prototype) || void 0 === t ? void 0 : t.constructor) === Array || wt(r);
    } return !1; }
    r(2043);
    const Et = new class {
        constructor() { this.items = new WeakMap; }
        has(e) { return this.items.has(e); }
        get(e) { var t, r, n, i; const o = this.items.get(e); if (!o)
            throw new Error(`Cannot get schema for '${null !== (i = null === (n = null === (r = null === (t = e) || void 0 === t ? void 0 : t.prototype) || void 0 === r ? void 0 : r.constructor) || void 0 === n ? void 0 : n.name) && void 0 !== i ? i : e}' target`); return o; }
        cache(e) { const t = this.get(e); t.schema || (t.schema = this.create(e, !0)); }
        createDefault(e) { const t = { type: Ze.Sequence, items: {} }, r = this.findParentSchema(e); return r && (Object.assign(t, r), t.items = Object.assign({}, t.items, r.items)), t; }
        create(t, r) { const n = this.items.get(t) || this.createDefault(t), i = []; for (const t in n.items) {
            const o = n.items[t], a = r ? t : "";
            let s;
            if ("number" == typeof o.type) {
                const t = Ke[o.type], r = e[t];
                if (!r)
                    throw new Error(`Cannot get ASN1 class by name '${t}'`);
                s = new r({ name: a });
            }
            else
                St(o.type) ? s = (new o.type).toSchema(a) : o.optional ? this.get(o.type).type === Ze.Choice ? s = new _e({ name: a }) : (s = this.create(o.type, !1), s.name = a) : s = new _e({ name: a });
            const c = !!o.optional || void 0 !== o.defaultValue;
            if (o.repeated && (s.name = "", s = new ("set" === o.repeated ? $ : Y)({ name: "", value: [new Ue({ name: a, value: s })] })), null !== o.context && void 0 !== o.context)
                if (o.implicit)
                    if ("number" == typeof o.type || St(o.type)) {
                        const e = o.repeated ? Z : V;
                        i.push(new e({ name: a, optional: c, idBlock: { tagClass: 3, tagNumber: o.context } }));
                    }
                    else {
                        this.cache(o.type);
                        const e = !!o.repeated;
                        let t = e ? s : this.get(o.type).schema;
                        t = t.valueBlock ? t.valueBlock.value : t.value, i.push(new Z({ name: e ? "" : a, optional: c, idBlock: { tagClass: 3, tagNumber: o.context }, value: t }));
                    }
                else
                    i.push(new Z({ optional: c, idBlock: { tagClass: 3, tagNumber: o.context }, value: [s] }));
            else
                s.optional = c, i.push(s);
        } switch (n.type) {
            case Ze.Sequence: return new Y({ value: i, name: "" });
            case Ze.Set: return new $({ value: i, name: "" });
            case Ze.Choice: return new Je({ value: i, name: "" });
            default: throw new Error("Unsupported ASN1 type in use");
        } }
        set(e, t) { return this.items.set(e, t), this; }
        findParentSchema(e) { const t = e.__proto__; return t ? this.items.get(t) || this.findParentSchema(t) : null; }
    }, Tt = e => t => { let r; Et.has(t) ? r = Et.get(t) : (r = Et.createDefault(t), Et.set(t, r)), Object.assign(r, e); }, kt = e => (t, r) => { let n; Et.has(t.constructor) ? n = Et.get(t.constructor) : (n = Et.createDefault(t.constructor), Et.set(t.constructor, n)); const i = Object.assign({}, e); if ("number" == typeof i.type && !i.converter) {
        const n = At(e.type);
        if (!n)
            throw new Error(`Cannot get default converter for property '${r}' of ${t.constructor.name}`);
        i.converter = n;
    } n.items[r] = i; };
    class Bt extends Error {
        constructor() { super(...arguments), this.schemas = []; }
    }
    class Pt {
        static parse(e, t) { let r; if (e instanceof ArrayBuffer)
            r = e;
        else if ("undefined" != typeof Buffer && Buffer.isBuffer(e))
            r = new Uint8Array(e).buffer;
        else {
            if (!(ArrayBuffer.isView(e) || e.buffer instanceof ArrayBuffer))
                throw new TypeError("Wrong type of 'data' argument");
            r = e.buffer;
        } const n = je(r); if (n.result.error)
            throw new Error(n.result.error); return this.fromASN(n.result, t); }
        static fromASN(t, r) { var n; try {
            if (St(r))
                return (new r).fromASN(t);
            const i = Et.get(r);
            Et.cache(r);
            let o = i.schema;
            if (t.constructor === Z && i.type !== Ze.Choice) {
                o = new Z({ idBlock: { tagClass: 3, tagNumber: t.idBlock.tagNumber }, value: i.schema.valueBlock.value });
                for (const e in i.items)
                    delete t[e];
            }
            const a = Xe(t, t, o);
            if (!a.verified)
                throw new Bt(`Data does not match to ${r.name} ASN1 schema. ${a.result.error}`);
            const s = new r;
            if (wt(r)) {
                if ("number" == typeof i.itemType) {
                    const e = At(i.itemType);
                    if (!e)
                        throw new Error(`Cannot get default converter for array item of ${r.name} ASN1 schema`);
                    return r.from(t.valueBlock.value, (t => e.fromASN(t)));
                }
                return r.from(t.valueBlock.value, (e => this.fromASN(e, i.itemType)));
            }
            for (const r in i.items) {
                if (!t[r])
                    continue;
                const o = i.items[r];
                if ("number" == typeof o.type || St(o.type)) {
                    const i = null !== (n = o.converter) && void 0 !== n ? n : St(o.type) ? new o.type : null;
                    if (!i)
                        throw new Error("Converter is empty");
                    if (o.repeated)
                        if (o.implicit) {
                            const e = new ("sequence" === o.repeated ? Y : $);
                            e.valueBlock = t[r].valueBlock;
                            const n = je(e.toBER(!1)).result.valueBlock.value;
                            s[r] = Array.from(n, (e => i.fromASN(e)));
                        }
                        else
                            s[r] = Array.from(t[r], (e => i.fromASN(e)));
                    else {
                        let n = t[r];
                        if (o.implicit) {
                            let t;
                            if (St(o.type))
                                t = (new o.type).toSchema("");
                            else {
                                const r = Ke[o.type], n = e[r];
                                if (!n)
                                    throw new Error(`Cannot get '${r}' class from asn1js module`);
                                t = new n;
                            }
                            t.valueBlock = n.valueBlock, n = je(t.toBER(!1)).result;
                        }
                        s[r] = i.fromASN(n);
                    }
                }
                else
                    o.repeated ? s[r] = Array.from(t[r], (e => this.fromASN(e, o.type))) : s[r] = this.fromASN(t[r], o.type);
            }
            return s;
        }
        catch (e) {
            throw e instanceof Bt && e.schemas.push(r.name), e;
        } }
    }
    class Mt extends Array {
        constructor(e = []) { if ("number" == typeof e)
            super(e);
        else {
            super();
            for (const t of e)
                this.push(t);
        } }
    }
    var Ct = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class Lt {
    }
    Ct([kt({ type: Ke.OctetString })], Lt.prototype, "riddle", void 0), Ct([kt({ type: Ke.OctetString })], Lt.prototype, "challengePoint", void 0), Ct([kt({ type: Ke.OctetString })], Lt.prototype, "responseValue", void 0), Ct([kt({ type: Ke.OctetString })], Lt.prototype, "nonce", void 0);
    class Ft {
    }
    Ct([kt({ type: Ke.OctetString })], Ft.prototype, "challengePoint", void 0), Ct([kt({ type: Ke.OctetString })], Ft.prototype, "responseValue", void 0), Ct([kt({ type: Ke.OctetString })], Ft.prototype, "nonce", void 0), r(4956);
    const Ot = { END_OF_CONTENT: 0, BOOLEAN: 1, INTEGER: 2, BIT_STRING: 3, OCTET_STRING: 4, NULL_VALUE: 5, OBJECT_ID: 6, OBJECT_DESCRIPTOR: 7, EXTERNAL: 8, REAL: 9, ENUMERATED: 10, EMBEDDED_PDV: 11, UTF8STRING: 12, RELATIVE_OID: 13, SEQUENCE_10: 16, SET_OF: 17, NUMERABLE_STRING: 18, PRINTABLE_STRING: 19, T61STRING: 20, VIDEO_TEX_STRING: 21, IA5STRING: 22, UTC_TIME: 23, GENERALIZED_TIME: 24, GRAPHIC_STRING: 25, VISIBLE_STRING: 26, GENERAL_STRING: 27, UNIVERSAL_STRING: 28, CHARACTER_STRING: 29, BMP_STRING: 30, SEQUENCE_30: 48, SET: 49 }, xt = { 0: "END_OF_CONTENT", 1: "BOOLEAN", 2: "INTEGER", 3: "BIT_STRING", 4: "OCTET_STRING", 5: "NULL_VALUE", 6: "OBJECT_ID", 7: "OBJECT_DESCRIPTOR", 8: "EXTERNAL", 9: "REAL", 10: "ENUMERATED", 11: "EMBEDDED_PDV", 12: "UTF8STRING", 13: "RELATIVE_OID", 16: "SEQUENCE_10", 19: "PRINTABLE_STRING", 22: "IA5STRING", 24: "GENERALIZED_TIME", 26: "VISIBLE_STRING", 48: "SEQUENCE_30", 49: "SET" };
    class Nt {
        static encodeAsInteger(e) { return this.encode("INTEGER", e); }
        static encodeObjectId(e) { return Nt.encode("SEQUENCE_30", Nt.encode("OBJECT_ID", e)); }
        static encodeName(e) { let t = e.matchAll(/(\w+)=("[\w\s]+"|\w+)/g), r = "", n = "", i = ""; if (!t)
            throw new Error("wrong Name format"); for (const e of t) {
            let t = e[1], o = e[2];
            switch ('"' == o.substr(0, 1) && '"' == o.substr(-1) && (o = o.slice(1, o.length - 1)), t.toUpperCase()) {
                case "CN":
                    n = "2.5.4.3";
                    break;
                case "C":
                    n = "2.5.4.6";
                    break;
                case "O":
                    n = "2.5.4.10";
                    break;
                case "OU":
                    n = "2.5.4.11";
                    break;
                case "L":
                    n = "2.5.4.7";
                    break;
                default: throw new Error('Type "' + t + '" not implemented yet');
            }
            i = Nt.encode("OBJECT_ID", n) + Nt.encode("UTF8STRING", o), r += Nt.encode("SEQUENCE_30", i);
        } return Nt.encode("SEQUENCE_30", Nt.encode("SET", r)); }
        static encode(e, t, r = 0) { if (void 0 === t)
            throw new Error("Missing value for Der encoding"); let i = Ot[e], o = ""; switch (e) {
            case "OBJECT_ID":
                if ("string" != typeof t)
                    throw new Error("OBJECT_ID value must be a string");
                let a = t.split("."), s = a.shift(), c = a.shift();
                a.unshift((40 * parseInt(s) + parseInt(c)).toString()), a.forEach((e => { let t = parseInt(e), r = "", n = !0; do {
                    let e = 127 & t;
                    t >>= 7, e += n ? 0 : 128, r = e.toString(16).padStart(2, "0") + r, n = !1;
                } while (t); o += r; }));
                break;
            case "NULL_VALUE":
                o = "";
                break;
            case "GENERALIZED_TIME":
                o = n(function (e) { var t = new Date(e), r = "" + (t.getUTCMonth() + 1), n = "" + t.getUTCDate(), i = t.getUTCFullYear(); let o = "" + t.getUTCHours(), a = "" + t.getUTCMinutes(), s = "" + t.getUTCSeconds(); return r.length < 2 && (r = "0" + r), n.length < 2 && (n = "0" + n), o.length < 2 && (o = "0" + o), a.length < 2 && (a = "0" + a), s.length < 2 && (s = "0" + s), [i, r, n, o, a, s].join("") + "Z"; }(t));
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
                    o = y(t);
                }
                break;
            case "BIT_STRING":
                o = "00" + t;
                break;
            case "BOOLEAN":
                o = parseInt(t).toString().padStart(2, "0");
                break;
            default: throw new Error("Sorry, " + e + " not implemented.");
        } let a = "", s = Math.ceil(o.length / 2), c = s.toString(16); return s || (c = "00"), c = (c.length % 2 ? "0" : "") + c, a = s < 128 ? c : (128 + Math.round(c.length / 2)).toString(16) + c, o = (o.length % 2 ? "0" : "") + o, i.toString(16).padStart(2, "0") + a + o; }
        decode(e) { let t = Array.from(e); return this.read(t); }
        lenEncoded(e) { let t = e.shift(); if (t < 128)
            return t; if (t > 128) {
            let r = 0;
            for (let n = 0; n < t - 128; n++)
                r = (r << 8) + e.shift();
            return r;
        } if (128 == t)
            throw new Error("have to code variable length"); }
        readFromHexString(e) { return this.read(i(e)); }
        readFromUint8Array(e) { return this.read(Array.from(e)); }
        readFromBase64String(e) { return this.readFromUint8Array(g(e)); }
        readFromUrlBase64String(e) { let t = e.split("_").join("/").split("-").join("+").split(".").join("="); return this.readFromBase64String(t); }
        read(e) { let t = e.shift(), r = this.lenEncoded(e), n = xt[t], i = []; for (let t = 0; t < r; t++)
            i.push(e.shift()); let o = ""; switch (n) {
            case "SEQUENCE_30": return this.BodySequence(i);
            case "INTEGER":
            case "BIT_STRING":
                let e = 0n;
                for (; i.length;)
                    e <<= 8n, e += BigInt(i.shift());
                return e;
            case "OCTET_STRING":
                for (; i.length;)
                    o += i.shift().toString(16).padStart(2, "0");
                return o;
            case "GENERALIZED_TIME":
            case "VISIBLE_STRING":
                for (; i.length;)
                    o += String.fromCharCode(i.shift());
                return o;
        } }
        BodySequence(e) { let t = []; for (; e.length;)
            t.push(this.read(e)); return t; }
    }
    class Rt {
        constructor() { }
        static fromData(e, t, r = new Uint8Array([])) { let n = new this; return n.tPoint = e, n.challenge = t, n.nonce = r, n.encoding = n.makeEncoding(e, t), n; }
        fromBase64(e) { this.encoding = e, this.fromBytes(g(e)); }
        fromBytes(e) { this.encodingBytes = e; let t = Pt.parse(v(e), Ft); this.challenge = l(new Uint8Array(t.challengePoint)); let r = new Uint8Array(t.responseValue); this.nonce = new Uint8Array(t.nonce), this.tPoint = k.decodeFromHex(y(r), T); }
        makeEncoding(e, t) { let r = Nt.encode("OCTET_STRING", y(u(this.challenge))) + Nt.encode("OCTET_STRING", y(this.tPoint.getEncoded(!1))) + Nt.encode("OCTET_STRING", y(this.nonce)); return Nt.encode("SEQUENCE_30", r); }
        getPoint() { return this.tPoint; }
        getChallenge() { return this.challenge; }
        getDerEncoding() { return this.encoding; }
        getNonce() { return this.nonce; }
    }
    class It {
        constructor() { }
        static fromData(e, t, r, n = new Uint8Array([])) { let i = new this; return i.riddle = e, i.tPoint = t, i.challenge = r, i.nonce = n, i.encoding = i.makeEncoding(e, t, r, n), i; }
        static fromBytes(e) { let t = Pt.parse(e, Lt); return this.fromASNType(t); }
        static fromASNType(e) { let t = new Uint8Array(e.riddle), r = k.decodeFromUint8(t, T), n = l(new Uint8Array(e.challengePoint)), i = new Uint8Array(e.responseValue), o = k.decodeFromUint8(i, T), a = new Uint8Array(e.nonce); return this.fromData(r, o, n, a); }
        static fromBase64(e) { return It.fromBytes(g(e)); }
        makeEncoding(e, t, r, n = new Uint8Array([])) { let i = Nt.encode("OCTET_STRING", y(e.getEncoded())) + Nt.encode("OCTET_STRING", r.toString(16)) + Nt.encode("OCTET_STRING", y(t.getEncoded())) + Nt.encode("OCTET_STRING", y(n)); return Nt.encode("SEQUENCE_30", i); }
        getRiddle() { return this.riddle; }
        getPoint() { return this.tPoint; }
        getChallenge() { return this.challenge; }
        getNonce() { return this.nonce; }
        getUsageProofOfExponent() { return Rt.fromData(this.tPoint, this.challenge, this.nonce); }
        getDerEncoding() { return this.encoding; }
    }
    const Dt = r(4800);
    let Jt = r(1094);
    const _t = new k(21282764439311451829394129092047993080259557426320933158672611067687630484067n, 3813889942691430704369624600187664845713336792511424430006907067499686345744n, T), Ut = new k(10844896013696871595893151490650636250667003995871483372134187278207473369077n, 9393217696329481319187854592386054938412168121447413803797200472841959383227n, T);
    class Ht {
        constructor() { if (this.curveOrderBitLength = 254n, this.rand = this.makeSecret(), !this.verifyCurveOrder(T.n))
            throw new Error("Static values do not work with current implementation"); }
        verifyCurveOrder(e) { let t = BigInt(e.toString(2).length); return !(e < 1n << t - 1n || e >> t > 0n) || (console.log("Curve order is not 253 bits which is required by the current implementation"), !1); }
        getType(e) { switch (e.toLowerCase()) {
            case "mail": return 1;
            case "phone": return 0;
            default: throw new Error("Wrong type of identifier");
        } }
        makeCommitment(e, t, r) { let n = this.mapToCurveMultiplier(t, e); return _t.multiplyDA(n).add(Ut.multiplyDA(r)).getEncoded(!1); }
        makeCommitmentFromHiding(e, t, r) { let n = this.mapToCurveMultiplier(t, e); return _t.multiplyDA(n).add(r).getEncoded(!1); }
        injectIdentifierType(e, t) { return h([Uint8Array.from([0, 0, 0, e]), t]); }
        mapToInteger(e) { return BigInt("0x" + Jt.keccak256(e)) >> 256n - this.curveOrderBitLength; }
        mapToCurveMultiplier(e, t) { let r = Uint8Array.from(m(t.trim().toLowerCase())), n = l(this.injectIdentifierType(e, r)); do {
            n = this.mapToInteger(u(n));
        } while (n >= T.n); return n; }
        computePoint_bn256(e) { let t = T.P; e = s(e, t); let r, n, i, o = 0n, a = 0n, c = t + 1n >> 2n, l = t - 1n >> 1n; do {
            do {
                e = s(e + 1n), a = s(b(e, 3n, t) + T.A * e + T.B), i = b(a, l, t);
            } while (1n !== i);
            o = b(a, c, t), r = new k(e, o, T), r.x > t >> 1n && (r = new k(e, t - o, T)), n = r.multiplyDA(T.n - 1n), n.y > t >> 1n && (n = new k(n.x, t - n.y, T));
        } while (!r.equals(n) || r.isInfinity()); return r; }
        makeSecret(e = 48) { return s(BigInt(Ht.generateRandomHexString(e)), T.n); }
        static generateRandomHexString(e) { var t = new Uint8Array(e); window && window.crypto ? window.crypto.getRandomValues(t) : t = new Uint8Array(Dt.randomBytes(e)); let r = "0x"; for (var n = 0; n < t.length; n++)
            r += t[n].toString(16).padStart(2, "0"); return r; }
        computeAttestationProof(e, t = new Uint8Array([])) { let r = Ut.multiplyDA(e), n = [Ut, r]; return this.constructSchnorrPOK(r, e, n, t); }
        computeEqualityProof(e, t, r, n, i = new Uint8Array([])) { let o = k.decodeFromHex(e, T), a = k.decodeFromHex(t, T), c = o.subtract(a), l = s(r - n, T.n), u = [Ut, o, a]; return this.constructSchnorrPOK(c, l, u, i).getUsageProofOfExponent(); }
        constructSchnorrPOK(e, t, r, n) { let i, o, a, c; do {
            o = this.makeSecret(), i = Ut.multiplyDA(o), a = this.computeChallenge(i, r, n);
        } while (a >= T.n); return c = s(o + a * t, T.n), It.fromData(e, i, c, n); }
        computeChallenge(e, t, r) { let n = t.concat(e), i = h([this.makeArray(n), r]); return this.mapToInteger(i); }
        verifyFullProof(e) { let t = this.computeChallenge(e.getPoint(), [Ut, e.getRiddle()], e.getNonce()); return this.verifyPok(e, t); }
        verifyEqualityProof(e, t, r) { let n = k.decodeFromUint8(e, T), i = k.decodeFromUint8(t, T), o = n.subtract(i), a = this.computeChallenge(r.getPoint(), [Ut, n, i], r.getNonce()); return this.verifyPok(It.fromData(o, r.getPoint(), r.getChallenge(), r.getNonce()), a); }
        verifyPok(e, t) { if (t >= T.n)
            return !1; let r = Ut.multiplyDA(e.getChallenge()), n = e.getRiddle().multiplyDA(t).add(e.getPoint()); return r.equals(n); }
        makeArray(e) { let t = new Uint8Array(0); return e.forEach((e => { t = new Uint8Array([...t, ...e.getEncoded(!1)]); })), t; }
        static hashWithKeccak(e) { return Jt.keccak256(e); }
    }
    Ht.OID_SIGNATURE_ALG = "1.2.840.10045.2.1", Ht.BYTES_IN_DIGEST = 32;
    var Gt = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class jt {
    }
    Gt([kt({ type: Ke.ObjectIdentifier })], jt.prototype, "algorithm", void 0), Gt([kt({ type: Ke.Any, optional: !0 })], jt.prototype, "parameters", void 0);
    class Xt {
        constructor() { this.version = 0; }
    }
    Gt([kt({ type: Ke.Integer })], Xt.prototype, "version", void 0);
    let Vt = class {
    };
    Gt([kt({ type: Ke.UTCTime })], Vt.prototype, "utcTime", void 0), Gt([kt({ type: Ke.GeneralizedTime })], Vt.prototype, "generalizedTime", void 0), Vt = Gt([Tt({ type: Ze.Choice })], Vt);
    class zt {
    }
    Gt([kt({ type: Vt })], zt.prototype, "notBefore", void 0), Gt([kt({ type: Vt })], zt.prototype, "notAfter", void 0);
    let Zt = class {
    };
    Gt([kt({ type: zt, context: 0 })], Zt.prototype, "value", void 0), Gt([kt({ type: Ke.Integer, context: 1 })], Zt.prototype, "null", void 0), Zt = Gt([Tt({ type: Ze.Choice })], Zt);
    class Kt {
    }
    Gt([kt({ type: Ke.ObjectIdentifier })], Kt.prototype, "extnId", void 0), Gt([kt({ type: Ke.Boolean })], Kt.prototype, "critical", void 0), Gt([kt({ type: Ke.OctetString })], Kt.prototype, "extnValue", void 0);
    class qt {
    }
    Gt([kt({ type: Kt })], qt.prototype, "extension", void 0);
    var Qt = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class Wt {
    }
    Qt([kt({ type: Ke.Utf8String })], Wt.prototype, "devconId", void 0), Qt([kt({ type: Ke.Integer })], Wt.prototype, "ticketId", void 0), Qt([kt({ type: Ke.Integer })], Wt.prototype, "ticketClass", void 0);
    class Yt {
    }
    Qt([kt({ type: jt })], Yt.prototype, "algorithm", void 0), Qt([kt({ type: Ke.BitString })], Yt.prototype, "publicKey", void 0);
    class $t {
    }
    Qt([kt({ type: Wt })], $t.prototype, "ticket", void 0), Qt([kt({ type: Ke.OctetString })], $t.prototype, "commitment", void 0), Qt([kt({ type: Yt, optional: !0 })], $t.prototype, "publicKeyInfo", void 0), Qt([kt({ type: Ke.BitString })], $t.prototype, "signatureValue", void 0);
    class er extends class {
        constructor() { }
        getDerEncoding() { return this.encoded; }
        getCommitment() { return this.commitment; }
    } {
        constructor() { super(), this.magicLinkURLPrefix = "https://ticket.devcon.org/"; }
        fromData(e, t, r, n) { this.ticketId = t, this.ticketClass = r, this.devconId = e, this.keys = n; }
        createWithCommitment(e, t, r, n, i, o) { if (this.fromData(e, t, r, o), this.commitment = n, this.signature = i, this.encoded = this.encodeSignedTicket(this.makeTicket()), !this.verify())
            throw new Error("Signature is invalid"); }
        static createWithMail(e, t, r, n, o, a) { let s = new this; s.fromData(t, r, n, o); let c, l, u = new Ht, f = s.makeTicket(); try {
            c = u.makeCommitment(e, u.getType("mail"), a), l = o.signBytesWithEthereum(i(f));
        }
        catch (e) {
            throw new Error(e);
        } return s.createWithCommitment(t, r, n, c, l, o), s; }
        makeTicket() { let e = Nt.encode("UTF8STRING", this.devconId) + Nt.encode("INTEGER", this.ticketId) + Nt.encode("INTEGER", this.ticketClass); return Nt.encode("SEQUENCE_30", e); }
        encodeSignedTicket(e) { let t = e + Nt.encode("OCTET_STRING", y(this.commitment)) + Nt.encode("BIT_STRING", this.signature); return Nt.encode("SEQUENCE_30", t); }
        getDerEncodingWithPK() { let e = this.makeTicket() + Nt.encode("OCTET_STRING", y(this.commitment)) + this.keys.getAsnDerPublic() + Nt.encode("BIT_STRING", this.signature); return Nt.encode("SEQUENCE_30", e); }
        getDerEncoding() { return this.encoded; }
        verify() { return this.keys.verifyBytesWithEthereum(i(this.makeTicket()), this.signature); }
        checkValidity() { return !0; }
        getTicketId() { return this.ticketId; }
        getTicketClass() { return this.ticketClass; }
        getSignature() { return this.signature; }
        static fromBase64(e, t) { let r = new this; return r.fromBytes(g(e), t), r; }
        fromBytes(e, t) { const r = Pt.parse(v(e), $t); let n = r.ticket.devconId, i = BigInt(r.ticket.ticketId), o = r.ticket.ticketClass, a = r.commitment, s = r.signatureValue; this.createWithCommitment(n, i, o, new Uint8Array(a), y(new Uint8Array(s)), t); }
        getCommitment() { return this.commitment; }
        getUrlEncoding() { }
    }
    var tr, rr, nr = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class ir {
    }
    nr([kt({ type: Ke.ObjectIdentifier })], ir.prototype, "type", void 0), nr([kt({ type: Ke.Utf8String })], ir.prototype, "value", void 0);
    let or = tr = class extends Mt {
        constructor(e) { super(e), Object.setPrototypeOf(this, tr.prototype); }
    };
    or = tr = nr([Tt({ type: Ze.Set, itemType: ir })], or);
    let ar = rr = class extends Mt {
        constructor(e) { super(e), Object.setPrototypeOf(this, rr.prototype); }
    };
    ar = rr = nr([Tt({ type: Ze.Sequence, itemType: or })], ar);
    let sr = class {
    };
    nr([kt({ type: ar })], sr.prototype, "rdnSequence", void 0), nr([kt({ type: Ke.Null })], sr.prototype, "null", void 0), sr = nr([Tt({ type: Ze.Choice })], sr);
    var cr = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class lr {
    }
    cr([kt({ type: Ke.Any })], lr.prototype, "algorithm", void 0), cr([kt({ type: Ke.BitString })], lr.prototype, "publicKey", void 0);
    let ur = class {
        constructor() { this.null = !1; }
    };
    cr([kt({ type: lr })], ur.prototype, "value", void 0), cr([kt({ type: Ke.Any })], ur.prototype, "null", void 0), ur = cr([Tt({ type: Ze.Choice })], ur);
    class fr {
    }
    cr([kt({ type: Ke.Integer })], fr.prototype, "one", void 0), cr([kt({ type: Ke.OctetString })], fr.prototype, "privateKey", void 0), cr([kt({ type: Ke.Any, context: 0 })], fr.prototype, "algDescr", void 0), cr([kt({ type: Ke.BitString, context: 1 })], fr.prototype, "publicKey", void 0);
    class hr {
    }
    cr([kt({ type: Ke.Integer })], hr.prototype, "one", void 0), cr([kt({ type: Ke.Any })], hr.prototype, "algIdent", void 0), cr([kt({ type: Ke.OctetString })], hr.prototype, "keysData", void 0);
    let dr = class {
    };
    cr([kt({ type: qt, context: 3 })], dr.prototype, "extensions", void 0), cr([kt({ type: Ke.Any, context: 4 })], dr.prototype, "dataObject", void 0), dr = cr([Tt({ type: Ze.Choice })], dr);
    class pr {
    }
    cr([kt({ type: Ke.Integer })], pr.prototype, "value", void 0);
    class gr {
    }
    cr([kt({ type: Xt })], gr.prototype, "version", void 0), cr([kt({ type: Ke.Integer })], gr.prototype, "serialNumber", void 0), cr([kt({ type: jt })], gr.prototype, "signature", void 0), cr([kt({ type: sr })], gr.prototype, "issuer", void 0), cr([kt({ type: zt, optional: !0 })], gr.prototype, "validity", void 0), cr([kt({ type: sr })], gr.prototype, "subject", void 0), cr([kt({ type: ur })], gr.prototype, "subjectPublicKeyInfo", void 0), cr([kt({ type: pr, optional: !0 })], gr.prototype, "contract", void 0), cr([kt({ type: dr, optional: !0 })], gr.prototype, "attestsTo", void 0);
    class mr {
        constructor() { this.signedInfo = new Uint8Array; }
    }
    cr([kt({ type: Ke.Any })], mr.prototype, "signedInfo", void 0), cr([kt({ type: jt })], mr.prototype, "signatureAlgorithm", void 0), cr([kt({ type: Ke.BitString })], mr.prototype, "signatureValue", void 0);
    var br = r(3286), yr = r(7158), vr = r(8197), Ar = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class Sr {
    }
    Ar([kt({ type: Ke.Integer })], Sr.prototype, "r", void 0), Ar([kt({ type: Ke.Integer })], Sr.prototype, "s", void 0);
    let wr, Er = r(6266);
    wr = "object" == typeof crypto && crypto.subtle ? crypto.subtle : r(4800).webcrypto.subtle;
    let Tr = new Er.ec("secp256k1"), kr = r(1094);
    const Br = { p192: null, p224: null, p256: "P-256", p384: "P-384", p521: "P-521", curve25519: null, ed25519: null, secp256k1: null };
    new k(55066263022277343669578718895168534326250603453777594175500187360389116729240n, 32670510020758816978083085130507043184471273380659243275938904335757337482424n);
    class Pr {
        constructor() { this.ethereumPrefix = "Ethereum Signed Message:\n", this.algorithmASNList = { secp256k1: "3081ec06072a8648ce3d02013081e0020101302c06072a8648ce3d0101022100fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f3044042000000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000000000704410479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8022100fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141020101", sect283k1: "3081f806072a8648ce3d02013081ec020101302506072a8648ce3d0102301a0202011b06092a8648ce3d01020303300902010502010702010c304c042400000000000000000000000000000000000000000000000000000000000000000000000004240000000000000000000000000000000000000000000000000000000000000000000000010449040503213f78ca44883f1a3b8162f188e553cd265f23c1567a16876913b0c2ac245849283601ccda380f1c9e318d90f95d07e5426fe87e45c0e8184698e45962364e34116177dd2259022401ffffffffffffffffffffffffffffffffffe9ae2ed07577265dff7f94451e061e163c61020104", p256: "3081ec06072a8648ce3d02013081e0020101302c06072a8648ce3d0101022100ffffffff00000001000000000000000000000000ffffffffffffffffffffffff30440420ffffffff00000001000000000000000000000000fffffffffffffffffffffffc04205ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b0441046b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c2964fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5022100ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551020101" }; }
        getPrivateAsUint8() { return this.privKey; }
        getPrivateAsHexString() { return y(this.privKey); }
        getPrivateAsBigInt() { return l(this.privKey); }
        static privateFromBigInt(e) { let t = new this; return t.privKey = new Uint8Array(i(e.toString(16).padStart(64, "0"))), t; }
        static fromPublicHex(e) { if (null === e.toLowerCase().match(/^[a-f0-9]+$/i))
            throw new Error("Wrong Hex string input"); if (e.length < 129 || e.length > 130)
            throw new Error("Wrong public hex length"); let t = new this; return t.pubKey = new Uint8Array(i(e)), t; }
        static fromPrivateUint8(e, t = "") { if (!e || 32 != e.length)
            throw new Error("Wrong private key. Should be 32 bytes Uint8"); let r = new this; if (r.privKey = e, !t || !E.hasOwnProperty(t))
            throw new Error(`Algorithm ${t} not implemented.`); return r.algorithm = t, r; }
        static publicFromBase64(e) { let t = new this, r = g(e), n = Pt.parse(v(r), lr); return t.pubKey = new Uint8Array(n.publicKey), t; }
        static publicFromSubjectPublicKeyInfo(e) { let t = new this; return t.pubKey = new Uint8Array(e.value.publicKey), t; }
        static publicFromSubjectPublicKeyValue(e) { let t = new this; return t.pubKey = new Uint8Array(e.publicKey), t.algorithm = t.getAlgorithNameFromASN1(y(new Uint8Array(e.algorithm))), t; }
        static publicFromUint(e) { let t = new this; if (65 != e.byteLength)
            throw console.error("Wrong public key length"), new Error("Wrong public key length"); return t.pubKey = new Uint8Array(e), t; }
        static privateFromKeyInfo(e) { let t = new this, r = Pt.parse(e.keysData, fr); return t.algorithm = t.getAlgorithNameFromASN1(y(new Uint8Array(e.algIdent))), t.privKey = new Uint8Array(r.privateKey), t; }
        getAlgorithNameFromASN1(e) { let t = {}; for (const e in this.algorithmASNList)
            t[this.algorithmASNList[e]] = e; if (t.hasOwnProperty(e))
            return t[e]; {
            let e = "Unknown algorithm.";
            throw console.error(e), new Error(e);
        } }
        static privateFromPEM(e) { const t = g(e); let r = Pt.parse(v(t), hr); return Pr.privateFromKeyInfo(r); }
        static publicFromPEM(e) { const t = g(e); let r = Pt.parse(v(t), lr); return Pr.publicFromUint(new Uint8Array(r.publicKey)); }
        static async generateKeyAsync() { const e = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, !0, ["encrypt"]); let t = ["0x"]; const r = await crypto.subtle.exportKey("raw", e); return new Uint8Array(r).forEach((e => { var r = e.toString(16); r.length % 2 && (r = "0" + r), t.push(r); })), this.privateFromBigInt(BigInt(t.join("")) % w.n); }
        static createKeys() { return this.privateFromBigInt(BigInt("0x" + y(crypto.getRandomValues(new Uint8Array(32)))) % w.n); }
        getPublicKeyAsHexStr() { if (this.pubKey)
            return y(this.pubKey); if (E.hasOwnProperty(this.algorithm) && Br.hasOwnProperty(this.algorithm))
            return new Er.ec(this.algorithm).keyFromPrivate(this.getPrivateAsHexString(), "hex").getPublic("hex").toString(); {
            let e = 'Private -> Public key not implemented for that aglorighm - "' + this.algorithm + '"';
            throw console.log(e), new Error(e);
        } }
        getAsnDerPublic() { var e = this.getPublicKeyAsHexStr(); let t = ""; if (this.algorithm) {
            if (!this.algorithmASNList.hasOwnProperty(this.algorithm)) {
                let e = "Fatal Error. Algorithm not implemented yet - " + this.algorithm;
                throw console.log(e), new Error(e);
            }
            t = this.algorithmASNList[this.algorithm];
        }
        else
            t = this.algorithmASNList.secp256k1; return Nt.encode("SEQUENCE_30", t + Nt.encode("BIT_STRING", e)); }
        getAddress() { var e = this.getPublicKeyAsHexStr(); return e = e.substr(2), "0x" + kr.keccak256(i(e)).substr(-40).toUpperCase(); }
        signBytes(e) { let t = Tr.keyFromPrivate(this.getPrivateAsHexString(), "hex"), r = kr.keccak256(e); return t.sign(r).toDER("hex"); }
        signStringWithEthereum(e) { let t = Tr.keyFromPrivate(this.getPrivateAsHexString(), "hex"), r = this.ethereumPrefix + e.length + e, n = kr.keccak256(m(r)); return t.sign(n).toDER("hex"); }
        signHexStringWithEthereum(e) { return this.signStringWithEthereum("0x" + e); }
        signBytesWithEthereum(e) { let t = "0x" + y(new Uint8Array(e)); return this.signStringWithEthereum(t); }
        signDeterministicSHA256(e) { let t = Array.from(br.arrayify(yr.JQ(e))); return this.signBytes(t); }
        verifyDeterministicSHA256(e, t) { let r, n, i = yr.JQ(e).substr(2); if (!E.hasOwnProperty(this.algorithm) || !Br.hasOwnProperty(this.algorithm)) {
            let e = 'Elliptic.js curve not implemented for that aglorighm - "' + this.algorithm + '"';
            throw console.log(e), new Error(e);
        } if (r = new Er.ec(this.algorithm).keyFromPublic(this.getPublicKeyAsHexStr(), "hex"), 128 == t.length || 130 == t.length) {
            var a = t.match(/([a-f\d]{64})/gi);
            n = { r: a[0], s: a[1] };
        }
        else {
            let e = Pt.parse(v(o(t)), Sr);
            n = { r: BigInt(e.r).toString(16).padStart(64, "0"), s: BigInt(e.s).toString(16).padStart(64, "0") };
        } return r.verify(i, n); }
        verifyHexStringWithEthereum(e, t) { let r = "0x" + e, n = kr.keccak256(m(this.ethereumPrefix + r.length + r)), i = Tr.keyFromPublic(this.getPublicKeyAsHexStr(), "hex"); var o = t.match(/([a-f\d]{64})/gi); let a = { r: o[0], s: o[1] }; return i.verify(n, a); }
        signRawBytesWithEthereum(e) { let t = kr.keccak256(e), r = Tr.keyFromPrivate(this.getPrivateAsHexString(), "hex"); return y(Uint8Array.from(r.sign(t).toDER())); }
        verifyBytesWithEthereum(e, t) { if (!t || !e || !e.length)
            throw new Error("Missing data to verify"); let r = i(vr.keccak256(e)), n = Tr.keyFromPublic(this.getPublicKeyAsHexStr(), "hex"); var o = (t = y(Pr.anySignatureToRawUint8(t))).match(/([a-f\d]{64})/gi); let a = { r: o[0], s: o[1] }; return n.verify(r, a); }
        getJWTParams() { let e = Br[this.algorithm]; if (!e) {
            let e = `Cant create subtleCrypto key for curve '${this.algorithm}'`;
            throw console.error(e), new Error(e);
        } let t = this.getPublicKeyAsHexStr(); return { crv: e, d: p(this.getPrivateAsUint8()), key_ops: ["sign"], kty: "EC", x: p(o(t.substr(2, 64))), y: p(o(t.substr(66, 64))) }; }
        getSubtlePrivateKey() { let e = Br[this.algorithm]; return wr.importKey("jwk", this.getJWTParams(), { name: "ECDSA", namedCurve: e }, !0, ["sign"]); }
        getSubtlePublicKey() { let e = Br[this.algorithm], t = this.getJWTParams(); return delete t.d, t.key_ops = ["verify"], wr.importKey("jwk", t, { name: "ECDSA", namedCurve: e }, !0, ["verify"]); }
        async signStringWithSubtle(e) { return await wr.sign({ name: "ECDSA", hash: { name: "SHA-256" } }, await this.getSubtlePrivateKey(), Uint8Array.from(m(e))); }
        async verifyStringWithSubtle(e, t) { return await wr.verify({ name: "ECDSA", hash: { name: "SHA-256" } }, await this.getSubtlePublicKey(), e, Uint8Array.from(m(t))); }
        async verifyStringWithSubtleDerSignature(e, t) { let r = Pt.parse(v(e), Sr); const n = BigInt(r.r).toString(16).padStart(64, "0") + BigInt(r.s).toString(16).padStart(64, "0"); return this.verifyStringWithSubtle(o(n), t); }
        static anySignatureToRawUint8(e) { let t, r; if (t = "string" == typeof e ? o(e) : e, !t || !t.length)
            throw new Error("Empty signature received"); switch (t.length) {
            case 64:
                r = t;
                break;
            case 65:
                r = t.slice(0, 64);
                break;
            case 70:
            case 71:
            case 72:
                let e = Pt.parse(v(t), Sr);
                r = o(BigInt(e.r).toString(16).padStart(64, "0") + BigInt(e.s).toString(16).padStart(64, "0"));
                break;
            default:
                let n = "wrong Signature: " + y(t);
                throw new Error(n);
        } return r; }
    }
    class Mr {
        constructor() { this.version = 18; }
        fromBytes(e) { const t = this; let r = Pt.parse(v(e), gr); t.signedInfo = e, t.version = r.version.version, t.serialNumber = r.serialNumber, t.signingAlgorithm = r.signature.algorithm.toString(), r.validity && (t.notValidBefore = r.validity.notBefore.generalizedTime.getTime(), t.notValidAfter = r.validity.notAfter.generalizedTime.getTime()); let n = r.subject.rdnSequence; if (n && n[0] && n[0][0]) {
            let e = n[0][0];
            t.subject = ("2.5.4.3" == e.type.toString() ? "CN=" : "") + e.value;
        } t.subjectKey = Pr.publicFromSubjectPublicKeyInfo(r.subjectPublicKeyInfo); let i = r.issuer.rdnSequence, o = []; i.length && i.forEach((e => { let t = e[0].value, r = e[0].type, n = ""; switch (r) {
            case "2.5.4.3":
                n = "CN";
                break;
            case "2.5.4.6":
                n = "C";
                break;
            case "2.5.4.10":
                n = "O";
                break;
            case "2.5.4.11":
                n = "OU";
                break;
            case "2.5.4.7":
                n = "L";
                break;
            default: throw new Error('Alg "' + r + '" Not implemented yet');
        } r && t && o.push(r + "=" + t); })), t.issuer = o.join(","), r.contract && (t.smartcontracts = r.contract), r.attestsTo.extensions ? (t.extensions = r.attestsTo.extensions, t.commitment = new Uint8Array(t.extensions.extension.extnValue)) : r.attestsTo.dataObject; }
        isValidX509() { return 0 != this.version && 1 != this.version && 2 != this.version ? (console.error("Incorrect version number"), !1) : this.issuer ? null == this.notValidBefore || null == this.notValidAfter ? (console.error("Validity period not set"), !1) : null == this.subject ? (console.error("Subject info not set"), !1) : this.subjectKey ? null != this.smartcontracts ? (console.error("Smart contract info set"), !1) : null != this.dataObject ? (console.error("Data object set"), !1) : null != this.version && null != this.serialNumber && null != this.signingAlgorithm || (console.error("Version, serial number, subject or algorithm missing"), !1) : (console.error("No subject public key info set"), !1) : (console.error("Issuer info not set"), !1); }
        getDerEncoding() { if (this.signedInfo || (this.signedInfo = this.getPrehash()), !this.signedInfo)
            throw new Error("Empty Attestaion Der Encoding"); return y(new Uint8Array(this.signedInfo)); }
        getCommitment() { return this.commitment; }
        getNotValidBefore() { return this.notValidBefore; }
        setNotValidBefore(e) { this.notValidBefore = e; }
        getNotValidAfter() { return this.notValidAfter; }
        setNotValidAfter(e) { this.notValidAfter = e; }
        getSubjectPublicKeyInfo() { return this.subjectKey; }
        checkValidity() { if (null == this.version || null == this.serialNumber || null == this.subject || null == this.signingAlgorithm || !this.extensions && !this.dataObject && !this.commitment)
            return console.log("Some attest data missed"), !1; let e = Date.now(), t = this.getNotValidBefore(), r = this.getNotValidAfter(); return !t || !r || e >= t && e < r ? null == this.extensions || null == this.dataObject || (console.log("Extensions or dataObject required"), !1) : (console.log("Attestation is no longer valid"), !1); }
        getExtensions() { return this.extensions; }
        setVersion(e) { this.version = e; }
        getVersion() { return this.version; }
        setSubject(e) { this.subject = e; }
        getSubject() { return this.subject; }
        setSigningAlgorithm(e) { this.signingAlgorithm = e; }
        getPrehash() { if (!this.checkValidity())
            return null; let e = Nt.encode("TAG", Nt.encode("INTEGER", this.version), 0) + Nt.encode("INTEGER", this.serialNumber) + Nt.encodeObjectId(this.signingAlgorithm); if (e += this.issuer ? Nt.encodeName(this.issuer) : Nt.encode("NULL_VALUE", ""), null != this.notValidAfter && null != this.notValidBefore) {
            let t = Nt.encode("GENERALIZED_TIME", this.notValidBefore) + Nt.encode("GENERALIZED_TIME", this.notValidAfter);
            e += Nt.encode("SEQUENCE_30", t);
        }
        else
            e += Nt.encode("NULL_VALUE", ""); if (e += this.subject ? Nt.encodeName(this.subject) : Nt.encode("NULL_VALUE", ""), e += this.subjectKey ? this.subjectKey.getAsnDerPublic() : Nt.encode("NULL_VALUE", ""), !this.commitment || !this.commitment.length)
            throw new Error("dataObject not implemented. We didn't use it before."); {
            let t = Nt.encode("OBJECT_ID", Mr.OID_OCTETSTRING) + Nt.encode("BOOLEAN", 1) + Nt.encode("OCTET_STRING", y(this.commitment));
            e += Nt.encode("TAG", Nt.encode("SEQUENCE_30", Nt.encode("SEQUENCE_30", t)), 3);
        } return o(Nt.encode("SEQUENCE_30", e)); }
        getSigningAlgorithm() { return this.signingAlgorithm; }
    }
    Mr.OID_OCTETSTRING = "1.3.6.1.4.1.1466.115.121.1.40";
    class Cr extends Mr {
        constructor() { super(); }
        fromCommitment(e, t) { this.subjectKey = t, this.setVersion(Cr.HIDDEN_IDENTIFIER_VERSION), this.setSubject("CN="), this.setSigningAlgorithm(Cr.DEFAULT_SIGNING_ALGORITHM), this.setSubjectPublicKeyInfo(t), this.setCommitment(e), this.type = Cr.HIDDEN_TYPE, this.identifier = Cr.HIDDEN_IDENTIFIER, this.setUnlimitedValidity(); }
        setUnlimitedValidity() { super.setNotValidBefore(Date.now()), super.setNotValidAfter(Date.parse("31 Dec 9999 23:59:59")); }
        static fromData(e, t, r, n) { let i = (new Ht).makeCommitment(e, t, n), o = new this; return o.fromCommitment(i, r), o.type = t.toString(), o.identifier = e, o; }
        static fromLabelAndUrl(e, t, r) { let n = new this; return n.subjectKey = r, n.setVersion(Cr.NFT_VERSION), n.setSubject(n.makeLabeledURI(e, t)), n.setSigningAlgorithm(Cr.DEFAULT_SIGNING_ALGORITHM), n.setSubjectPublicKeyInfo(r), n.setUnlimitedValidity(), n.type = e, n.identifier = t, n; }
        makeLabeledURI(e, t) { return ""; }
        static fromBytes(e) { let t = new this; if (t.fromBytes(e), !t.checkValidity())
            throw new Error("Could not validate object"); return t.getVersion() == Cr.NFT_VERSION || (t.type = Cr.HIDDEN_TYPE, t.identifier = Cr.HIDDEN_IDENTIFIER), t; }
        setSubjectPublicKeyInfo(e) { this.subjectKey = e; }
        setCommitment(e) { this.commitment = e; }
        checkValidity() { return !(!super.checkValidity() || (this.getVersion() != Cr.HIDDEN_IDENTIFIER_VERSION && this.getVersion() != Cr.NFT_VERSION ? (console.error("The version number is " + this.getVersion() + ", it must be either " + Cr.HIDDEN_IDENTIFIER_VERSION + " or " + Cr.NFT_VERSION), 1) : this.getSigningAlgorithm() !== Cr.DEFAULT_SIGNING_ALGORITHM ? (console.error("The subject is supposed to only be an Ethereum address as the Common Name"), 1) : this.getVersion() != Cr.NFT_VERSION || this.getSubject().includes(Cr.LABELED_URI) ? this.getVersion() == Cr.HIDDEN_IDENTIFIER_VERSION && this.getCommitment().length < Ht.BYTES_IN_DIGEST && (console.error("The attestation does not contain a valid commitment"), 1) : (console.error("A NFT Identifier attestation must have a labeled uri as subject"), 1))); }
        setIssuer(e) { this.issuer = e; }
        getSerialNumber() { return this.serialNumber; }
        setSerialNumber(e) { this.serialNumber = e; }
        getAddress() { return this.subjectKey.getAddress(); }
    }
    Cr.OID_OCTETSTRING = "1.3.6.1.4.1.1466.115.121.1.40", Cr.DEFAULT_SIGNING_ALGORITHM = "1.2.840.10045.4.2", Cr.HIDDEN_IDENTIFIER_VERSION = 18, Cr.NFT_VERSION = 19, Cr.HIDDEN_TYPE = "HiddenType", Cr.HIDDEN_IDENTIFIER = "HiddenIdentifier", Cr.LABELED_URI = "1.3.6.1.4.1.250.1.57";
    class Lr {
        constructor() { }
        static fromBytes(e, t) { const r = Pt.parse(v(e), mr); return this.fromASNType(r, t, e); }
        static fromASNType(e, t, r = new Uint8Array(0)) { let n = new this; n.uint8data = r, n.attestorKeys = t; let i = e.signatureAlgorithm.algorithm; if (n.att = Cr.fromBytes(e.signedInfo), n.signature = y(new Uint8Array(e.signatureValue)), i !== n.att.getSigningAlgorithm())
            throw new Error("Algorithm specified is not consistent"); return n.constructorCheck(), n; }
        static fromData(e, t) { let r = new this; return r.attestorKeys = t, r.att = e, r.signature = r.attestorKeys.signRawBytesWithEthereum(Array.from(r.att.getPrehash())), r.constructorCheck(), r; }
        verify() { try {
            return this.attestorKeys.verifyBytesWithEthereum(i(this.att.getDerEncoding()), this.signature);
        }
        catch (e) {
            return console.error(e), !1;
        } }
        checkValidity() { return this.getUnsignedAttestation().checkValidity(); }
        getUnsignedAttestation() { return this.att; }
        getDerEncoding() { return this.uint8data && this.uint8data.length ? y(new Uint8Array(this.uint8data)) : this.constructSignedAttestation(this.getUnsignedAttestation(), this.signature); }
        constructSignedAttestation(e, t) { let r = e.getPrehash(), n = Nt.encode("OBJECT_ID", e.getSigningAlgorithm()), i = y(r) + Nt.encode("SEQUENCE_30", n) + Nt.encode("BIT_STRING", "04" + y(Pr.anySignatureToRawUint8(t))); return Nt.encode("SEQUENCE_30", i); }
        constructorCheck() { if (!this.verify())
            throw new Error("The signature is not valid"); }
    }
    Lr.ECDSA_WITH_SHA256 = "1.2.840.10045.4.3.2";
    class Fr {
        constructor() { }
        create(e, t, r, n) { this.attestableObject = e, this.att = t, this.attestationSecret = r, this.objectSecret = n, this.crypto = new Ht, this.pok = this.makeProof(r, n, this.crypto), this.derEncodedProof = this.pok.getDerEncoding(), this.fillPresignData(); }
        setWebDomain(e) { this.webDomain = e; }
        fillPresignData() { this.preSignEncoded = this.attestableObject.getDerEncoding() + this.att.getDerEncoding() + this.pok.getDerEncoding(), this.encoding = Nt.encode("SEQUENCE_30", this.preSignEncoded); }
        fromDecodedData(e, t, r) { this.attestableObject = e, this.att = t, this.pok = r, this.fillPresignData(), this.userKeyPair = this.att.getUnsignedAttestation().getSubjectPublicKeyInfo(), this.constructorCheck(); }
        verify() { return this.attestableObject.verify() ? this.att.verify() ? !!this.crypto.verifyEqualityProof(this.att.getUnsignedAttestation().getCommitment(), this.attestableObject.getCommitment(), this.pok) || (console.error("Could not verify the consistency between the commitment in the attestation and the attested object"), !1) : (console.error("Could not verify attestation"), !1) : (console.error("Could not verify attestable object"), !1); }
        static fromBytes(e, t, r, n, i) { let o = Pt.parse(v(e), t), a = new this; a.attestableObject = new n, a.attestableObject.fromBytes(o.signedToken, i), a.att = Lr.fromBytes(new Uint8Array(o.attestation), r); let s = new Rt; s.fromBytes(new Uint8Array(o.proof)), a.pok = s; let c = a.att.getUnsignedAttestation().getCommitment(), l = a.attestableObject.getCommitment(); if (!(new Ht).verifyEqualityProof(c, l, s))
            throw new Error("The redeem proof did not verify"); return a; }
        makeProof(e, t, r) { let n = this.att.getUnsignedAttestation().getCommitment(), i = this.attestableObject.getCommitment(), o = r.computeEqualityProof(y(n), y(i), e, t); if (!r.verifyEqualityProof(n, i, o))
            throw new Error("The redeem proof did not verify"); return o; }
        getAttestableObject() { return this.attestableObject; }
        getAtt() { return this.att; }
        getDerEncodeProof() { return this.derEncodedProof; }
        getDerEncoding() { return this.encoding; }
        getUserPublicKey() { return this.userPublicKey; }
        constructorCheck() { if (!this.verify())
            throw new Error("The redeem request is not valid"); }
        checkValidity() { try {
            let e = this.att.getUnsignedAttestation().getDerEncoding();
            if (!Cr.fromBytes(new Uint8Array(i(e))).checkValidity())
                return console.error("The attestation is not a valid standard attestation"), !1;
        }
        catch (e) {
            return console.error("The attestation is invalid"), !1;
        } return this.getAttestableObject().checkValidity() ? this.getAtt().getUnsignedAttestation().getSubject().substring(3).toLowerCase() === Pr.publicFromUint(this.getUserPublicKey()).getAddress().toLowerCase() || (console.error("The attestation is not to the same Ethereum user who is sending this request"), !1) : (console.error("Cheque is not valid"), !1); }
    }
    Fr.Eip712UserData = { payload: "", description: "", timestamp: 0 }, Fr.Eip712UserDataTypes = [{ name: "payload", type: "string" }, { name: "description", type: "string" }, { name: "timestamp", type: "uint256" }], Fr.Eip712UserDataPrimaryName = "Authentication", Fr.Eip712UserDataDescription = "Single-use authentication";
    const Or = { attestationOrigin: "http://stage.attestation.id", tokensOrigin: "https://devcontickets.herokuapp.com/outlet/", tokenUrlName: "ticket", tokenSecretName: "secret", unsignedTokenDataName: "ticket", tokenParser: $t, localStorageItemName: "dcTokens", base64senderPublicKey: "-----BEGIN PUBLIC KEY-----\nMIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA////////////////\n/////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5m\nfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0\nSKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFB\nAgEBA0IABJUMfAvtI8PKxcwxu7mq2btVMjh4gmcKwrHN8HmasOvHZMJn9wTo/doH\nlquDl6TSEBAk0kxO//aVs6QX8u0OSM0=\n-----END PUBLIC KEY-----", base64attestorPubKey: "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=", webDomain: "devcon.org" };
    var xr = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class Nr {
    }
    xr([kt({ type: Ke.Integer })], Nr.prototype, "type", void 0), xr([kt({ type: Lt })], Nr.prototype, "proof", void 0);
    class Rr {
        constructor() { }
        static fromData(e, t) { let r = new this; if (r.type = e, r.pok = t, !r.verify())
            throw new Error("The proof is not valid"); return r; }
        getDerEncoding() { let e = Nt.encode("INTEGER", this.type) + this.pok.getDerEncoding(); return Nt.encode("SEQUENCE_30", e); }
        static fromBytes(e) { let t, r = new this; try {
            t = Pt.parse(v(e), Nr), r.type = t.type;
        }
        catch (e) {
            throw new Error("Cant parse AttestationRequest Identifier");
        } try {
            let e = new Uint8Array(t.proof.riddle), n = new Uint8Array(t.proof.challengePoint), i = new Uint8Array(t.proof.responseValue), o = new Uint8Array(t.proof.nonce), a = k.decodeFromHex(y(e), T), s = l(n), c = k.decodeFromHex(y(i), T);
            r.pok = It.fromData(a, c, s, o);
        }
        catch (e) {
            throw new Error("Cant create FullProofOfExponent");
        } if (!r.verify())
            throw new Error("Could not verify the proof"); return r; }
        verify() { return !!(new Ht).verifyFullProof(this.pok); }
        getPok() { return this.pok; }
        getType() { return this.type; }
    }
    var Ir = r(4958), Dr = r(3684), Jr = r(2768), _r = r(2046), Ur = r(3587), Hr = r(711);
    const Gr = "providers/5.4.5";
    var jr = r(8171), Xr = r(2593), Vr = r(7827), zr = r(4242), Zr = r(4377), Kr = r(8341), qr = r(4353), Qr = r(7727), Wr = r(7218), Yr = r(4706);
    const $r = new Hr.Logger("networks/5.4.2");
    function en(e) { const t = function (t, r) { null == r && (r = {}); const n = []; if (t.InfuraProvider)
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
        const r = ["goerli", "ropsten", "rinkeby"];
        try {
            const i = new t.PocketProvider(e);
            i.network && -1 === r.indexOf(i.network.name) && n.push(i);
        }
        catch (e) { }
    } if (t.CloudflareProvider)
        try {
            n.push(new t.CloudflareProvider(e));
        }
        catch (e) { } if (0 === n.length)
        return null; if (t.FallbackProvider) {
        let i = 1;
        return null != r.quorum ? i = r.quorum : "homestead" === e && (i = 2), new t.FallbackProvider(n, i);
    } return n[0]; }; return t.renetwork = function (e) { return en(e); }, t; }
    function tn(e, t) { const r = function (r, n) { return r.JsonRpcProvider ? new r.JsonRpcProvider(e, t) : null; }; return r.renetwork = function (t) { return tn(e, t); }, r; }
    const rn = { chainId: 1, ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", name: "homestead", _defaultProvider: en("homestead") }, nn = { chainId: 3, ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", name: "ropsten", _defaultProvider: en("ropsten") }, on = { chainId: 63, name: "classicMordor", _defaultProvider: tn("https://www.ethercluster.com/mordor", "classicMordor") }, an = { unspecified: { chainId: 0, name: "unspecified" }, homestead: rn, mainnet: rn, morden: { chainId: 2, name: "morden" }, ropsten: nn, testnet: nn, rinkeby: { chainId: 4, ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", name: "rinkeby", _defaultProvider: en("rinkeby") }, kovan: { chainId: 42, name: "kovan", _defaultProvider: en("kovan") }, goerli: { chainId: 5, ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", name: "goerli", _defaultProvider: en("goerli") }, classic: { chainId: 61, name: "classic", _defaultProvider: tn("https://www.ethercluster.com/etc", "classic") }, classicMorden: { chainId: 62, name: "classicMorden" }, classicMordor: on, classicTestnet: on, classicKotti: { chainId: 6, name: "classicKotti", _defaultProvider: tn("https://www.ethercluster.com/kotti", "classicKotti") }, xdai: { chainId: 100, name: "xdai" }, matic: { chainId: 137, name: "matic" }, maticmum: { chainId: 80001, name: "maticmum" }, bnb: { chainId: 56, name: "bnb" }, bnbt: { chainId: 97, name: "bnbt" } };
    var sn = r(2882), cn = r.n(sn), ln = r(4594);
    const un = new Hr.Logger(Gr);
    class fn {
        constructor() { un.checkNew(new.target, fn), this.formats = this.getDefaultFormats(); }
        getDefaultFormats() { const e = {}, t = this.address.bind(this), r = this.bigNumber.bind(this), n = this.blockTag.bind(this), i = this.data.bind(this), o = this.hash.bind(this), a = this.hex.bind(this), s = this.number.bind(this), c = this.type.bind(this); return e.transaction = { hash: o, type: c, accessList: fn.allowNull(this.accessList.bind(this), null), blockHash: fn.allowNull(o, null), blockNumber: fn.allowNull(s, null), transactionIndex: fn.allowNull(s, null), confirmations: fn.allowNull(s, null), from: t, gasPrice: fn.allowNull(r), maxPriorityFeePerGas: fn.allowNull(r), maxFeePerGas: fn.allowNull(r), gasLimit: r, to: fn.allowNull(t, null), value: r, nonce: s, data: i, r: fn.allowNull(this.uint256), s: fn.allowNull(this.uint256), v: fn.allowNull(s), creates: fn.allowNull(t, null), raw: fn.allowNull(i) }, e.transactionRequest = { from: fn.allowNull(t), nonce: fn.allowNull(s), gasLimit: fn.allowNull(r), gasPrice: fn.allowNull(r), maxPriorityFeePerGas: fn.allowNull(r), maxFeePerGas: fn.allowNull(r), to: fn.allowNull(t), value: fn.allowNull(r), data: fn.allowNull((e => this.data(e, !0))), type: fn.allowNull(s), accessList: fn.allowNull(this.accessList.bind(this), null) }, e.receiptLog = { transactionIndex: s, blockNumber: s, transactionHash: o, address: t, topics: fn.arrayOf(o), data: i, logIndex: s, blockHash: o }, e.receipt = { to: fn.allowNull(this.address, null), from: fn.allowNull(this.address, null), contractAddress: fn.allowNull(t, null), transactionIndex: s, root: fn.allowNull(a), gasUsed: r, logsBloom: fn.allowNull(i), blockHash: o, transactionHash: o, logs: fn.arrayOf(this.receiptLog.bind(this)), blockNumber: s, confirmations: fn.allowNull(s, null), cumulativeGasUsed: r, effectiveGasPrice: fn.allowNull(r), status: fn.allowNull(s), type: c }, e.block = { hash: o, parentHash: o, number: s, timestamp: s, nonce: fn.allowNull(a), difficulty: this.difficulty.bind(this), gasLimit: r, gasUsed: r, miner: t, extraData: i, transactions: fn.allowNull(fn.arrayOf(o)), baseFeePerGas: fn.allowNull(r) }, e.blockWithTransactions = (0, Ur.shallowCopy)(e.block), e.blockWithTransactions.transactions = fn.allowNull(fn.arrayOf(this.transactionResponse.bind(this))), e.filter = { fromBlock: fn.allowNull(n, void 0), toBlock: fn.allowNull(n, void 0), blockHash: fn.allowNull(o, void 0), address: fn.allowNull(t, void 0), topics: fn.allowNull(this.topics.bind(this), void 0) }, e.filterLog = { blockNumber: fn.allowNull(s), blockHash: fn.allowNull(o), transactionIndex: s, removed: fn.allowNull(this.boolean.bind(this)), address: t, data: fn.allowFalsish(i, "0x"), topics: fn.arrayOf(o), transactionHash: o, logIndex: s }, e; }
        accessList(e) { return (0, Zr.accessListify)(e || []); }
        number(e) { return "0x" === e ? 0 : Xr.O$.from(e).toNumber(); }
        type(e) { return "0x" === e || null == e ? 0 : Xr.O$.from(e).toNumber(); }
        bigNumber(e) { return Xr.O$.from(e); }
        boolean(e) { if ("boolean" == typeof e)
            return e; if ("string" == typeof e) {
            if ("true" === (e = e.toLowerCase()))
                return !0;
            if ("false" === e)
                return !1;
        } throw new Error("invalid boolean - " + e); }
        hex(e, t) { return "string" == typeof e && (t || "0x" === e.substring(0, 2) || (e = "0x" + e), (0, br.isHexString)(e)) ? e.toLowerCase() : un.throwArgumentError("invalid hash", "value", e); }
        data(e, t) { const r = this.hex(e, t); if (r.length % 2 != 0)
            throw new Error("invalid data; odd-length - " + e); return r; }
        address(e) { return (0, ln.getAddress)(e); }
        callAddress(e) { if (!(0, br.isHexString)(e, 32))
            return null; const t = (0, ln.getAddress)((0, br.hexDataSlice)(e, 12)); return "0x0000000000000000000000000000000000000000" === t ? null : t; }
        contractAddress(e) { return (0, ln.getContractAddress)(e); }
        blockTag(e) { if (null == e)
            return "latest"; if ("earliest" === e)
            return "0x0"; if ("latest" === e || "pending" === e)
            return e; if ("number" == typeof e || (0, br.isHexString)(e))
            return (0, br.hexValue)(e); throw new Error("invalid blockTag"); }
        hash(e, t) { const r = this.hex(e, t); return 32 !== (0, br.hexDataLength)(r) ? un.throwArgumentError("invalid hash", "value", e) : r; }
        difficulty(e) { if (null == e)
            return null; const t = Xr.O$.from(e); try {
            return t.toNumber();
        }
        catch (e) { } return null; }
        uint256(e) { if (!(0, br.isHexString)(e))
            throw new Error("invalid uint256"); return (0, br.hexZeroPad)(e, 32); }
        _block(e, t) { return null != e.author && null == e.miner && (e.miner = e.author), fn.check(t, e); }
        block(e) { return this._block(e, this.formats.block); }
        blockWithTransactions(e) { return this._block(e, this.formats.blockWithTransactions); }
        transactionRequest(e) { return fn.check(this.formats.transactionRequest, e); }
        transactionResponse(e) { null != e.gas && null == e.gasLimit && (e.gasLimit = e.gas), e.to && Xr.O$.from(e.to).isZero() && (e.to = "0x0000000000000000000000000000000000000000"), null != e.input && null == e.data && (e.data = e.input), null == e.to && null == e.creates && (e.creates = this.contractAddress(e)), 1 !== e.type && 2 !== e.type || null != e.accessList || (e.accessList = []); const t = fn.check(this.formats.transaction, e); if (null != e.chainId) {
            let r = e.chainId;
            (0, br.isHexString)(r) && (r = Xr.O$.from(r).toNumber()), t.chainId = r;
        }
        else {
            let r = e.networkId;
            null == r && null == t.v && (r = e.chainId), (0, br.isHexString)(r) && (r = Xr.O$.from(r).toNumber()), "number" != typeof r && null != t.v && (r = (t.v - 35) / 2, r < 0 && (r = 0), r = parseInt(r)), "number" != typeof r && (r = 0), t.chainId = r;
        } return t.blockHash && "x" === t.blockHash.replace(/0/g, "") && (t.blockHash = null), t; }
        transaction(e) { return (0, Zr.parse)(e); }
        receiptLog(e) { return fn.check(this.formats.receiptLog, e); }
        receipt(e) { const t = fn.check(this.formats.receipt, e); if (null != t.root)
            if (t.root.length <= 4) {
                const e = Xr.O$.from(t.root).toNumber();
                0 === e || 1 === e ? (null != t.status && t.status !== e && un.throwArgumentError("alt-root-status/status mismatch", "value", { root: t.root, status: t.status }), t.status = e, delete t.root) : un.throwArgumentError("invalid alt-root-status", "value.root", t.root);
            }
            else
                66 !== t.root.length && un.throwArgumentError("invalid root hash", "value.root", t.root); return null != t.status && (t.byzantium = !0), t; }
        topics(e) { return Array.isArray(e) ? e.map((e => this.topics(e))) : null != e ? this.hash(e, !0) : null; }
        filter(e) { return fn.check(this.formats.filter, e); }
        filterLog(e) { return fn.check(this.formats.filterLog, e); }
        static check(e, t) { const r = {}; for (const n in e)
            try {
                const i = e[n](t[n]);
                void 0 !== i && (r[n] = i);
            }
            catch (e) {
                throw e.checkKey = n, e.checkValue = t[n], e;
            } return r; }
        static allowNull(e, t) { return function (r) { return null == r ? t : e(r); }; }
        static allowFalsish(e, t) { return function (r) { return r ? e(r) : t; }; }
        static arrayOf(e) { return function (t) { if (!Array.isArray(t))
            throw new Error("not an array"); const r = []; return t.forEach((function (t) { r.push(e(t)); })), r; }; }
    }
    var hn = function (e, t, r, n) { return new (r || (r = Promise))((function (i, o) { function a(e) { try {
        c(n.next(e));
    }
    catch (e) {
        o(e);
    } } function s(e) { try {
        c(n.throw(e));
    }
    catch (e) {
        o(e);
    } } function c(e) { var t; e.done ? i(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(a, s); } c((n = n.apply(e, t || [])).next()); })); };
    const dn = new Hr.Logger(Gr);
    function pn(e) { return null == e ? "null" : (32 !== (0, br.hexDataLength)(e) && dn.throwArgumentError("invalid topic", "topic", e), e.toLowerCase()); }
    function gn(e) { for (e = e.slice(); e.length > 0 && null == e[e.length - 1];)
        e.pop(); return e.map((e => { if (Array.isArray(e)) {
        const t = {};
        e.forEach((e => { t[pn(e)] = !0; }));
        const r = Object.keys(t);
        return r.sort(), r.join("|");
    } return pn(e); })).join("&"); }
    function mn(e) { if ("string" == typeof e) {
        if (e = e.toLowerCase(), 32 === (0, br.hexDataLength)(e))
            return "tx:" + e;
        if (-1 === e.indexOf(":"))
            return e;
    }
    else {
        if (Array.isArray(e))
            return "filter:*:" + gn(e);
        if (qr.Sg.isForkEvent(e))
            throw dn.warn("not implemented"), new Error("not implemented");
        if (e && "object" == typeof e)
            return "filter:" + (e.address || "*") + ":" + gn(e.topics || []);
    } throw new Error("invalid event - " + e); }
    function bn() { return (new Date).getTime(); }
    function yn(e) { return new Promise((t => { setTimeout(t, e); })); }
    const vn = ["block", "network", "pending", "poll"];
    class An {
        constructor(e, t, r) { (0, Ur.defineReadOnly)(this, "tag", e), (0, Ur.defineReadOnly)(this, "listener", t), (0, Ur.defineReadOnly)(this, "once", r); }
        get event() { switch (this.type) {
            case "tx": return this.hash;
            case "filter": return this.filter;
        } return this.tag; }
        get type() { return this.tag.split(":")[0]; }
        get hash() { const e = this.tag.split(":"); return "tx" !== e[0] ? null : e[1]; }
        get filter() { const e = this.tag.split(":"); if ("filter" !== e[0])
            return null; const t = e[1], r = "" === (n = e[2]) ? [] : n.split(/&/g).map((e => { if ("" === e)
            return []; const t = e.split("|").map((e => "null" === e ? null : e)); return 1 === t.length ? t[0] : t; })); var n; const i = {}; return r.length > 0 && (i.topics = r), t && "*" !== t && (i.address = t), i; }
        pollable() { return this.tag.indexOf(":") >= 0 || vn.indexOf(this.tag) >= 0; }
    }
    const Sn = { 0: { symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc" }, 2: { symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc" }, 3: { symbol: "doge", p2pkh: 30, p2sh: 22 }, 60: { symbol: "eth", ilk: "eth" }, 61: { symbol: "etc", ilk: "eth" }, 700: { symbol: "xdai", ilk: "eth" } };
    function wn(e) { return (0, br.hexZeroPad)(Xr.O$.from(e).toHexString(), 32); }
    function En(e) { return Qr.Base58.encode((0, br.concat)([e, (0, br.hexDataSlice)((0, yr.JQ)((0, yr.JQ)(e)), 0, 4)])); }
    class Tn {
        constructor(e, t, r) { (0, Ur.defineReadOnly)(this, "provider", e), (0, Ur.defineReadOnly)(this, "name", r), (0, Ur.defineReadOnly)(this, "address", e.formatter.address(t)); }
        _fetchBytes(e, t) { return hn(this, void 0, void 0, (function* () { const r = { to: this.address, data: (0, br.hexConcat)([e, (0, Yr.V)(this.name), t || "0x"]) }; try {
            const e = yield this.provider.call(r);
            if ("0x" === e)
                return null;
            const t = Xr.O$.from((0, br.hexDataSlice)(e, 0, 32)).toNumber(), n = Xr.O$.from((0, br.hexDataSlice)(e, t, t + 32)).toNumber();
            return (0, br.hexDataSlice)(e, t + 32, t + 32 + n);
        }
        catch (e) {
            return e.code, Hr.Logger.errors.CALL_EXCEPTION, null;
        } })); }
        _getAddress(e, t) { const r = Sn[String(e)]; if (null == r && dn.throwError(`unsupported coin type: ${e}`, Hr.Logger.errors.UNSUPPORTED_OPERATION, { operation: `getAddress(${e})` }), "eth" === r.ilk)
            return this.provider.formatter.address(t); const n = (0, br.arrayify)(t); if (null != r.p2pkh) {
            const e = t.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
            if (e) {
                const t = parseInt(e[1], 16);
                if (e[2].length === 2 * t && t >= 1 && t <= 75)
                    return En((0, br.concat)([[r.p2pkh], "0x" + e[2]]));
            }
        } if (null != r.p2sh) {
            const e = t.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
            if (e) {
                const t = parseInt(e[1], 16);
                if (e[2].length === 2 * t && t >= 1 && t <= 75)
                    return En((0, br.concat)([[r.p2sh], "0x" + e[2]]));
            }
        } if (null != r.prefix) {
            const e = n[1];
            let t = n[0];
            if (0 === t ? 20 !== e && 32 !== e && (t = -1) : t = -1, t >= 0 && n.length === 2 + e && e >= 1 && e <= 75) {
                const e = cn().toWords(n.slice(2));
                return e.unshift(t), cn().encode(r.prefix, e);
            }
        } return null; }
        getAddress(e) { return hn(this, void 0, void 0, (function* () { if (null == e && (e = 60), 60 === e)
            try {
                const e = { to: this.address, data: "0x3b3b57de" + (0, Yr.V)(this.name).substring(2) }, t = yield this.provider.call(e);
                return "0x" === t || t === Wr.R ? null : this.provider.formatter.callAddress(t);
            }
            catch (e) {
                if (e.code === Hr.Logger.errors.CALL_EXCEPTION)
                    return null;
                throw e;
            } const t = yield this._fetchBytes("0xf1cb7e06", wn(e)); if (null == t || "0x" === t)
            return null; const r = this._getAddress(e, t); return null == r && dn.throwError("invalid or unsupported coin data", Hr.Logger.errors.UNSUPPORTED_OPERATION, { operation: `getAddress(${e})`, coinType: e, data: t }), r; })); }
        getContentHash() { return hn(this, void 0, void 0, (function* () { const e = yield this._fetchBytes("0xbc1c58d1"); if (null == e || "0x" === e)
            return null; const t = e.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/); if (t) {
            const e = parseInt(t[3], 16);
            if (t[4].length === 2 * e)
                return "ipfs://" + Qr.Base58.encode("0x" + t[1]);
        } const r = e.match(/^0xe40101fa011b20([0-9a-f]*)$/); return r && 64 === r[1].length ? "bzz://" + r[1] : dn.throwError("invalid or unsupported content hash data", Hr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "getContentHash()", data: e }); })); }
        getText(e) { return hn(this, void 0, void 0, (function* () { let t = (0, zr.Y0)(e); t = (0, br.concat)([wn(64), wn(t.length), t]), t.length % 32 != 0 && (t = (0, br.concat)([t, (0, br.hexZeroPad)("0x", 32 - e.length % 32)])); const r = yield this._fetchBytes("0x59d1d43c", (0, br.hexlify)(t)); return null == r || "0x" === r ? null : (0, zr.ZN)(r); })); }
    }
    let kn = null, Bn = 1;
    class Pn extends qr.zt {
        constructor(e) { if (dn.checkNew(new.target, qr.zt), super(), this._events = [], this._emitted = { block: -2 }, this.formatter = new.target.getFormatter(), (0, Ur.defineReadOnly)(this, "anyNetwork", "any" === e), this.anyNetwork && (e = this.detectNetwork()), e instanceof Promise)
            this._networkPromise = e, e.catch((e => { })), this._ready().catch((e => { }));
        else {
            const t = (0, Ur.getStatic)(new.target, "getNetwork")(e);
            t ? ((0, Ur.defineReadOnly)(this, "_network", t), this.emit("network", t, null)) : dn.throwArgumentError("invalid network", "network", e);
        } this._maxInternalBlockNumber = -1024, this._lastBlockNumber = -2, this._pollingInterval = 4e3, this._fastQueryDate = 0; }
        _ready() { return hn(this, void 0, void 0, (function* () { if (null == this._network) {
            let e = null;
            if (this._networkPromise)
                try {
                    e = yield this._networkPromise;
                }
                catch (e) { }
            null == e && (e = yield this.detectNetwork()), e || dn.throwError("no network detected", Hr.Logger.errors.UNKNOWN_ERROR, {}), null == this._network && (this.anyNetwork ? this._network = e : (0, Ur.defineReadOnly)(this, "_network", e), this.emit("network", e, null));
        } return this._network; })); }
        get ready() { return (0, Kr.poll)((() => this._ready().then((e => e), (e => { if (e.code !== Hr.Logger.errors.NETWORK_ERROR || "noNetwork" !== e.event)
            throw e; })))); }
        static getFormatter() { return null == kn && (kn = new fn), kn; }
        static getNetwork(e) { return function (e) { if (null == e)
            return null; if ("number" == typeof e) {
            for (const t in an) {
                const r = an[t];
                if (r.chainId === e)
                    return { name: r.name, chainId: r.chainId, ensAddress: r.ensAddress || null, _defaultProvider: r._defaultProvider || null };
            }
            return { chainId: e, name: "unknown" };
        } if ("string" == typeof e) {
            const t = an[e];
            return null == t ? null : { name: t.name, chainId: t.chainId, ensAddress: t.ensAddress, _defaultProvider: t._defaultProvider || null };
        } const t = an[e.name]; if (!t)
            return "number" != typeof e.chainId && $r.throwArgumentError("invalid network chainId", "network", e), e; 0 !== e.chainId && e.chainId !== t.chainId && $r.throwArgumentError("network chainId mismatch", "network", e); let r = e._defaultProvider || null; var n; return null == r && t._defaultProvider && (r = (n = t._defaultProvider) && "function" == typeof n.renetwork ? t._defaultProvider.renetwork(e) : t._defaultProvider), { name: e.name, chainId: t.chainId, ensAddress: e.ensAddress || t.ensAddress || null, _defaultProvider: r }; }(null == e ? "homestead" : e); }
        _getInternalBlockNumber(e) { return hn(this, void 0, void 0, (function* () { if (yield this._ready(), e > 0)
            for (; this._internalBlockNumber;) {
                const t = this._internalBlockNumber;
                try {
                    const r = yield t;
                    if (bn() - r.respTime <= e)
                        return r.blockNumber;
                    break;
                }
                catch (e) {
                    if (this._internalBlockNumber === t)
                        break;
                }
            } const t = bn(), r = (0, Ur.resolveProperties)({ blockNumber: this.perform("getBlockNumber", {}), networkError: this.getNetwork().then((e => null), (e => e)) }).then((({ blockNumber: e, networkError: n }) => { if (n)
            throw this._internalBlockNumber === r && (this._internalBlockNumber = null), n; const i = bn(); return (e = Xr.O$.from(e).toNumber()) < this._maxInternalBlockNumber && (e = this._maxInternalBlockNumber), this._maxInternalBlockNumber = e, this._setFastBlockNumber(e), { blockNumber: e, reqTime: t, respTime: i }; })); return this._internalBlockNumber = r, r.catch((e => { this._internalBlockNumber === r && (this._internalBlockNumber = null); })), (yield r).blockNumber; })); }
        poll() { return hn(this, void 0, void 0, (function* () { const e = Bn++, t = []; let r = null; try {
            r = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
        }
        catch (e) {
            return void this.emit("error", e);
        } if (this._setFastBlockNumber(r), this.emit("poll", e, r), r !== this._lastBlockNumber) {
            if (-2 === this._emitted.block && (this._emitted.block = r - 1), Math.abs(this._emitted.block - r) > 1e3)
                dn.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${r})`), this.emit("error", dn.makeError("network block skew detected", Hr.Logger.errors.NETWORK_ERROR, { blockNumber: r, event: "blockSkew", previousBlockNumber: this._emitted.block })), this.emit("block", r);
            else
                for (let e = this._emitted.block + 1; e <= r; e++)
                    this.emit("block", e);
            this._emitted.block !== r && (this._emitted.block = r, Object.keys(this._emitted).forEach((e => { if ("block" === e)
                return; const t = this._emitted[e]; "pending" !== t && r - t > 12 && delete this._emitted[e]; }))), -2 === this._lastBlockNumber && (this._lastBlockNumber = r - 1), this._events.forEach((e => { switch (e.type) {
                case "tx": {
                    const r = e.hash;
                    let n = this.getTransactionReceipt(r).then((e => e && null != e.blockNumber ? (this._emitted["t:" + r] = e.blockNumber, this.emit(r, e), null) : null)).catch((e => { this.emit("error", e); }));
                    t.push(n);
                    break;
                }
                case "filter": {
                    const n = e.filter;
                    n.fromBlock = this._lastBlockNumber + 1, n.toBlock = r;
                    const i = this.getLogs(n).then((e => { 0 !== e.length && e.forEach((e => { this._emitted["b:" + e.blockHash] = e.blockNumber, this._emitted["t:" + e.transactionHash] = e.blockNumber, this.emit(n, e); })); })).catch((e => { this.emit("error", e); }));
                    t.push(i);
                    break;
                }
            } })), this._lastBlockNumber = r, Promise.all(t).then((() => { this.emit("didPoll", e); })).catch((e => { this.emit("error", e); }));
        }
        else
            this.emit("didPoll", e); })); }
        resetEventsBlock(e) { this._lastBlockNumber = e - 1, this.polling && this.poll(); }
        get network() { return this._network; }
        detectNetwork() { return hn(this, void 0, void 0, (function* () { return dn.throwError("provider does not support network detection", Hr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "provider.detectNetwork" }); })); }
        getNetwork() { return hn(this, void 0, void 0, (function* () { const e = yield this._ready(), t = yield this.detectNetwork(); if (e.chainId !== t.chainId) {
            if (this.anyNetwork)
                return this._network = t, this._lastBlockNumber = -2, this._fastBlockNumber = null, this._fastBlockNumberPromise = null, this._fastQueryDate = 0, this._emitted.block = -2, this._maxInternalBlockNumber = -1024, this._internalBlockNumber = null, this.emit("network", t, e), yield yn(0), this._network;
            const r = dn.makeError("underlying network changed", Hr.Logger.errors.NETWORK_ERROR, { event: "changed", network: e, detectedNetwork: t });
            throw this.emit("error", r), r;
        } return e; })); }
        get blockNumber() { return this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((e => { this._setFastBlockNumber(e); }), (e => { })), null != this._fastBlockNumber ? this._fastBlockNumber : -1; }
        get polling() { return null != this._poller; }
        set polling(e) { e && !this._poller ? (this._poller = setInterval((() => { this.poll(); }), this.pollingInterval), this._bootstrapPoll || (this._bootstrapPoll = setTimeout((() => { this.poll(), this._bootstrapPoll = setTimeout((() => { this._poller || this.poll(), this._bootstrapPoll = null; }), this.pollingInterval); }), 0))) : !e && this._poller && (clearInterval(this._poller), this._poller = null); }
        get pollingInterval() { return this._pollingInterval; }
        set pollingInterval(e) { if ("number" != typeof e || e <= 0 || parseInt(String(e)) != e)
            throw new Error("invalid polling interval"); this._pollingInterval = e, this._poller && (clearInterval(this._poller), this._poller = setInterval((() => { this.poll(); }), this._pollingInterval)); }
        _getFastBlockNumber() { const e = bn(); return e - this._fastQueryDate > 2 * this._pollingInterval && (this._fastQueryDate = e, this._fastBlockNumberPromise = this.getBlockNumber().then((e => ((null == this._fastBlockNumber || e > this._fastBlockNumber) && (this._fastBlockNumber = e), this._fastBlockNumber)))), this._fastBlockNumberPromise; }
        _setFastBlockNumber(e) { null != this._fastBlockNumber && e < this._fastBlockNumber || (this._fastQueryDate = bn(), (null == this._fastBlockNumber || e > this._fastBlockNumber) && (this._fastBlockNumber = e, this._fastBlockNumberPromise = Promise.resolve(e))); }
        waitForTransaction(e, t, r) { return hn(this, void 0, void 0, (function* () { return this._waitForTransaction(e, null == t ? 1 : t, r || 0, null); })); }
        _waitForTransaction(e, t, r, n) { return hn(this, void 0, void 0, (function* () { const i = yield this.getTransactionReceipt(e); return (i ? i.confirmations : 0) >= t ? i : new Promise(((i, o) => { const a = []; let s = !1; const c = function () { return !!s || (s = !0, a.forEach((e => { e(); })), !1); }, l = e => { e.confirmations < t || c() || i(e); }; if (this.on(e, l), a.push((() => { this.removeListener(e, l); })), n) {
            let r = n.startBlock, i = null;
            const l = a => hn(this, void 0, void 0, (function* () { s || (yield yn(1e3), this.getTransactionCount(n.from).then((u => hn(this, void 0, void 0, (function* () { if (!s) {
                if (u <= n.nonce)
                    r = a;
                else {
                    {
                        const t = yield this.getTransaction(e);
                        if (t && null != t.blockNumber)
                            return;
                    }
                    for (null == i && (i = r - 3, i < n.startBlock && (i = n.startBlock)); i <= a;) {
                        if (s)
                            return;
                        const r = yield this.getBlockWithTransactions(i);
                        for (let i = 0; i < r.transactions.length; i++) {
                            const a = r.transactions[i];
                            if (a.hash === e)
                                return;
                            if (a.from === n.from && a.nonce === n.nonce) {
                                if (s)
                                    return;
                                const r = yield this.waitForTransaction(a.hash, t);
                                if (c())
                                    return;
                                let i = "replaced";
                                return a.data === n.data && a.to === n.to && a.value.eq(n.value) ? i = "repriced" : "0x" === a.data && a.from === a.to && a.value.isZero() && (i = "cancelled"), void o(dn.makeError("transaction was replaced", Hr.Logger.errors.TRANSACTION_REPLACED, { cancelled: "replaced" === i || "cancelled" === i, reason: i, replacement: this._wrapTransaction(a), hash: e, receipt: r }));
                            }
                        }
                        i++;
                    }
                }
                s || this.once("block", l);
            } }))), (e => { s || this.once("block", l); }))); }));
            if (s)
                return;
            this.once("block", l), a.push((() => { this.removeListener("block", l); }));
        } if ("number" == typeof r && r > 0) {
            const e = setTimeout((() => { c() || o(dn.makeError("timeout exceeded", Hr.Logger.errors.TIMEOUT, { timeout: r })); }), r);
            e.unref && e.unref(), a.push((() => { clearTimeout(e); }));
        } })); })); }
        getBlockNumber() { return hn(this, void 0, void 0, (function* () { return this._getInternalBlockNumber(0); })); }
        getGasPrice() { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(); const e = yield this.perform("getGasPrice", {}); try {
            return Xr.O$.from(e);
        }
        catch (t) {
            return dn.throwError("bad result from backend", Hr.Logger.errors.SERVER_ERROR, { method: "getGasPrice", result: e, error: t });
        } })); }
        getBalance(e, t) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(); const r = yield (0, Ur.resolveProperties)({ address: this._getAddress(e), blockTag: this._getBlockTag(t) }), n = yield this.perform("getBalance", r); try {
            return Xr.O$.from(n);
        }
        catch (e) {
            return dn.throwError("bad result from backend", Hr.Logger.errors.SERVER_ERROR, { method: "getBalance", params: r, result: n, error: e });
        } })); }
        getTransactionCount(e, t) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(); const r = yield (0, Ur.resolveProperties)({ address: this._getAddress(e), blockTag: this._getBlockTag(t) }), n = yield this.perform("getTransactionCount", r); try {
            return Xr.O$.from(n).toNumber();
        }
        catch (e) {
            return dn.throwError("bad result from backend", Hr.Logger.errors.SERVER_ERROR, { method: "getTransactionCount", params: r, result: n, error: e });
        } })); }
        getCode(e, t) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(); const r = yield (0, Ur.resolveProperties)({ address: this._getAddress(e), blockTag: this._getBlockTag(t) }), n = yield this.perform("getCode", r); try {
            return (0, br.hexlify)(n);
        }
        catch (e) {
            return dn.throwError("bad result from backend", Hr.Logger.errors.SERVER_ERROR, { method: "getCode", params: r, result: n, error: e });
        } })); }
        getStorageAt(e, t, r) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(); const n = yield (0, Ur.resolveProperties)({ address: this._getAddress(e), blockTag: this._getBlockTag(r), position: Promise.resolve(t).then((e => (0, br.hexValue)(e))) }), i = yield this.perform("getStorageAt", n); try {
            return (0, br.hexlify)(i);
        }
        catch (e) {
            return dn.throwError("bad result from backend", Hr.Logger.errors.SERVER_ERROR, { method: "getStorageAt", params: n, result: i, error: e });
        } })); }
        _wrapTransaction(e, t, r) { if (null != t && 32 !== (0, br.hexDataLength)(t))
            throw new Error("invalid response - sendTransaction"); const n = e; return null != t && e.hash !== t && dn.throwError("Transaction hash mismatch from Provider.sendTransaction.", Hr.Logger.errors.UNKNOWN_ERROR, { expectedHash: e.hash, returnedHash: t }), n.wait = (t, n) => hn(this, void 0, void 0, (function* () { let i; null == t && (t = 1), null == n && (n = 0), 0 !== t && null != r && (i = { data: e.data, from: e.from, nonce: e.nonce, to: e.to, value: e.value, startBlock: r }); const o = yield this._waitForTransaction(e.hash, t, n, i); return null == o && 0 === t ? null : (this._emitted["t:" + e.hash] = o.blockNumber, 0 === o.status && dn.throwError("transaction failed", Hr.Logger.errors.CALL_EXCEPTION, { transactionHash: e.hash, transaction: e, receipt: o }), o); })), n; }
        sendTransaction(e) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(); const t = yield Promise.resolve(e).then((e => (0, br.hexlify)(e))), r = this.formatter.transaction(e); null == r.confirmations && (r.confirmations = 0); const n = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval); try {
            const e = yield this.perform("sendTransaction", { signedTransaction: t });
            return this._wrapTransaction(r, e, n);
        }
        catch (e) {
            throw e.transaction = r, e.transactionHash = r.hash, e;
        } })); }
        _getTransactionRequest(e) { return hn(this, void 0, void 0, (function* () { const t = yield e, r = {}; return ["from", "to"].forEach((e => { null != t[e] && (r[e] = Promise.resolve(t[e]).then((e => e ? this._getAddress(e) : null))); })), ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach((e => { null != t[e] && (r[e] = Promise.resolve(t[e]).then((e => e ? Xr.O$.from(e) : null))); })), ["type"].forEach((e => { null != t[e] && (r[e] = Promise.resolve(t[e]).then((e => null != e ? e : null))); })), t.accessList && (r.accessList = this.formatter.accessList(t.accessList)), ["data"].forEach((e => { null != t[e] && (r[e] = Promise.resolve(t[e]).then((e => e ? (0, br.hexlify)(e) : null))); })), this.formatter.transactionRequest(yield (0, Ur.resolveProperties)(r)); })); }
        _getFilter(e) { return hn(this, void 0, void 0, (function* () { e = yield e; const t = {}; return null != e.address && (t.address = this._getAddress(e.address)), ["blockHash", "topics"].forEach((r => { null != e[r] && (t[r] = e[r]); })), ["fromBlock", "toBlock"].forEach((r => { null != e[r] && (t[r] = this._getBlockTag(e[r])); })), this.formatter.filter(yield (0, Ur.resolveProperties)(t)); })); }
        call(e, t) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(); const r = yield (0, Ur.resolveProperties)({ transaction: this._getTransactionRequest(e), blockTag: this._getBlockTag(t) }), n = yield this.perform("call", r); try {
            return (0, br.hexlify)(n);
        }
        catch (e) {
            return dn.throwError("bad result from backend", Hr.Logger.errors.SERVER_ERROR, { method: "call", params: r, result: n, error: e });
        } })); }
        estimateGas(e) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(); const t = yield (0, Ur.resolveProperties)({ transaction: this._getTransactionRequest(e) }), r = yield this.perform("estimateGas", t); try {
            return Xr.O$.from(r);
        }
        catch (e) {
            return dn.throwError("bad result from backend", Hr.Logger.errors.SERVER_ERROR, { method: "estimateGas", params: t, result: r, error: e });
        } })); }
        _getAddress(e) { return hn(this, void 0, void 0, (function* () { const t = yield this.resolveName(e); return null == t && dn.throwError("ENS name not configured", Hr.Logger.errors.UNSUPPORTED_OPERATION, { operation: `resolveName(${JSON.stringify(e)})` }), t; })); }
        _getBlock(e, t) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(), e = yield e; let r = -128; const n = { includeTransactions: !!t }; if ((0, br.isHexString)(e, 32))
            n.blockHash = e;
        else
            try {
                n.blockTag = this.formatter.blockTag(yield this._getBlockTag(e)), (0, br.isHexString)(n.blockTag) && (r = parseInt(n.blockTag.substring(2), 16));
            }
            catch (t) {
                dn.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", e);
            } return (0, Kr.poll)((() => hn(this, void 0, void 0, (function* () { const e = yield this.perform("getBlock", n); if (null == e)
            return null != n.blockHash && null == this._emitted["b:" + n.blockHash] || null != n.blockTag && r > this._emitted.block ? null : void 0; if (t) {
            let t = null;
            for (let r = 0; r < e.transactions.length; r++) {
                const n = e.transactions[r];
                if (null == n.blockNumber)
                    n.confirmations = 0;
                else if (null == n.confirmations) {
                    null == t && (t = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval));
                    let e = t - n.blockNumber + 1;
                    e <= 0 && (e = 1), n.confirmations = e;
                }
            }
            const r = this.formatter.blockWithTransactions(e);
            return r.transactions = r.transactions.map((e => this._wrapTransaction(e))), r;
        } return this.formatter.block(e); }))), { oncePoll: this }); })); }
        getBlock(e) { return this._getBlock(e, !1); }
        getBlockWithTransactions(e) { return this._getBlock(e, !0); }
        getTransaction(e) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(), e = yield e; const t = { transactionHash: this.formatter.hash(e, !0) }; return (0, Kr.poll)((() => hn(this, void 0, void 0, (function* () { const r = yield this.perform("getTransaction", t); if (null == r)
            return null == this._emitted["t:" + e] ? null : void 0; const n = this.formatter.transactionResponse(r); if (null == n.blockNumber)
            n.confirmations = 0;
        else if (null == n.confirmations) {
            let e = (yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval)) - n.blockNumber + 1;
            e <= 0 && (e = 1), n.confirmations = e;
        } return this._wrapTransaction(n); }))), { oncePoll: this }); })); }
        getTransactionReceipt(e) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(), e = yield e; const t = { transactionHash: this.formatter.hash(e, !0) }; return (0, Kr.poll)((() => hn(this, void 0, void 0, (function* () { const r = yield this.perform("getTransactionReceipt", t); if (null == r)
            return null == this._emitted["t:" + e] ? null : void 0; if (null == r.blockHash)
            return; const n = this.formatter.receipt(r); if (null == n.blockNumber)
            n.confirmations = 0;
        else if (null == n.confirmations) {
            let e = (yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval)) - n.blockNumber + 1;
            e <= 0 && (e = 1), n.confirmations = e;
        } return n; }))), { oncePoll: this }); })); }
        getLogs(e) { return hn(this, void 0, void 0, (function* () { yield this.getNetwork(); const t = yield (0, Ur.resolveProperties)({ filter: this._getFilter(e) }), r = yield this.perform("getLogs", t); return r.forEach((e => { null == e.removed && (e.removed = !1); })), fn.arrayOf(this.formatter.filterLog.bind(this.formatter))(r); })); }
        getEtherPrice() { return hn(this, void 0, void 0, (function* () { return yield this.getNetwork(), this.perform("getEtherPrice", {}); })); }
        _getBlockTag(e) { return hn(this, void 0, void 0, (function* () { if ("number" == typeof (e = yield e) && e < 0) {
            e % 1 && dn.throwArgumentError("invalid BlockTag", "blockTag", e);
            let t = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
            return t += e, t < 0 && (t = 0), this.formatter.blockTag(t);
        } return this.formatter.blockTag(e); })); }
        getResolver(e) { return hn(this, void 0, void 0, (function* () { try {
            const t = yield this._getResolver(e);
            return null == t ? null : new Tn(this, t, e);
        }
        catch (e) {
            return e.code, Hr.Logger.errors.CALL_EXCEPTION, null;
        } })); }
        _getResolver(e) { return hn(this, void 0, void 0, (function* () { const t = yield this.getNetwork(); t.ensAddress || dn.throwError("network does not support ENS", Hr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "ENS", network: t.name }); const r = { to: t.ensAddress, data: "0x0178b8bf" + (0, Yr.V)(e).substring(2) }; try {
            return this.formatter.callAddress(yield this.call(r));
        }
        catch (e) {
            if (e.code === Hr.Logger.errors.CALL_EXCEPTION)
                return null;
            throw e;
        } })); }
        resolveName(e) { return hn(this, void 0, void 0, (function* () { e = yield e; try {
            return Promise.resolve(this.formatter.address(e));
        }
        catch (t) {
            if ((0, br.isHexString)(e))
                throw t;
        } "string" != typeof e && dn.throwArgumentError("invalid ENS name", "name", e); const t = yield this.getResolver(e); return t ? yield t.getAddress() : null; })); }
        lookupAddress(e) { return hn(this, void 0, void 0, (function* () { e = yield e; const t = (e = this.formatter.address(e)).substring(2).toLowerCase() + ".addr.reverse", r = yield this._getResolver(t); if (!r)
            return null; let n = (0, br.arrayify)(yield this.call({ to: r, data: "0x691f3431" + (0, Yr.V)(t).substring(2) })); if (n.length < 32 || !Xr.O$.from(n.slice(0, 32)).eq(32))
            return null; if (n = n.slice(32), n.length < 32)
            return null; const i = Xr.O$.from(n.slice(0, 32)).toNumber(); if (n = n.slice(32), i > n.length)
            return null; const o = (0, zr.ZN)(n.slice(0, i)); return (yield this.resolveName(o)) != e ? null : o; })); }
        perform(e, t) { return dn.throwError(e + " not implemented", Hr.Logger.errors.NOT_IMPLEMENTED, { operation: e }); }
        _startEvent(e) { this.polling = this._events.filter((e => e.pollable())).length > 0; }
        _stopEvent(e) { this.polling = this._events.filter((e => e.pollable())).length > 0; }
        _addEventListener(e, t, r) { const n = new An(mn(e), t, r); return this._events.push(n), this._startEvent(n), this; }
        on(e, t) { return this._addEventListener(e, t, !1); }
        once(e, t) { return this._addEventListener(e, t, !0); }
        emit(e, ...t) { let r = !1, n = [], i = mn(e); return this._events = this._events.filter((e => e.tag !== i || (setTimeout((() => { e.listener.apply(this, t); }), 0), r = !0, !e.once || (n.push(e), !1)))), n.forEach((e => { this._stopEvent(e); })), r; }
        listenerCount(e) { if (!e)
            return this._events.length; let t = mn(e); return this._events.filter((e => e.tag === t)).length; }
        listeners(e) { if (null == e)
            return this._events.map((e => e.listener)); let t = mn(e); return this._events.filter((e => e.tag === t)).map((e => e.listener)); }
        off(e, t) { if (null == t)
            return this.removeAllListeners(e); const r = []; let n = !1, i = mn(e); return this._events = this._events.filter((e => e.tag !== i || e.listener != t || !!n || (n = !0, r.push(e), !1))), r.forEach((e => { this._stopEvent(e); })), this; }
        removeAllListeners(e) { let t = []; if (null == e)
            t = this._events, this._events = [];
        else {
            const r = mn(e);
            this._events = this._events.filter((e => e.tag !== r || (t.push(e), !1)));
        } return t.forEach((e => { this._stopEvent(e); })), this; }
    }
    var Mn = function (e, t, r, n) { return new (r || (r = Promise))((function (i, o) { function a(e) { try {
        c(n.next(e));
    }
    catch (e) {
        o(e);
    } } function s(e) { try {
        c(n.throw(e));
    }
    catch (e) {
        o(e);
    } } function c(e) { var t; e.done ? i(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) { e(t); }))).then(a, s); } c((n = n.apply(e, t || [])).next()); })); };
    const Cn = new Hr.Logger(Gr), Ln = ["call", "estimateGas"];
    function Fn(e, t, r) { if ("call" === e && t.code === Hr.Logger.errors.SERVER_ERROR) {
        const e = t.error;
        if (e && e.message.match("reverted") && (0, br.isHexString)(e.data))
            return e.data;
        Cn.throwError("missing revert data in call exception", Hr.Logger.errors.CALL_EXCEPTION, { error: t, data: "0x" });
    } let n = t.message; t.code === Hr.Logger.errors.SERVER_ERROR && t.error && "string" == typeof t.error.message ? n = t.error.message : "string" == typeof t.body ? n = t.body : "string" == typeof t.responseText && (n = t.responseText), n = (n || "").toLowerCase(); const i = r.transaction || r.signedTransaction; throw n.match(/insufficient funds|base fee exceeds gas limit/) && Cn.throwError("insufficient funds for intrinsic transaction cost", Hr.Logger.errors.INSUFFICIENT_FUNDS, { error: t, method: e, transaction: i }), n.match(/nonce too low/) && Cn.throwError("nonce has already been used", Hr.Logger.errors.NONCE_EXPIRED, { error: t, method: e, transaction: i }), n.match(/replacement transaction underpriced/) && Cn.throwError("replacement fee too low", Hr.Logger.errors.REPLACEMENT_UNDERPRICED, { error: t, method: e, transaction: i }), n.match(/only replay-protected/) && Cn.throwError("legacy pre-eip-155 transactions not supported", Hr.Logger.errors.UNSUPPORTED_OPERATION, { error: t, method: e, transaction: i }), Ln.indexOf(e) >= 0 && n.match(/gas required exceeds allowance|always failing transaction|execution reverted/) && Cn.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Hr.Logger.errors.UNPREDICTABLE_GAS_LIMIT, { error: t, method: e, transaction: i }), t; }
    function On(e) { return new Promise((function (t) { setTimeout(t, e); })); }
    function xn(e) { if (e.error) {
        const t = new Error(e.error.message);
        throw t.code = e.error.code, t.data = e.error.data, t;
    } return e.result; }
    function Nn(e) { return e ? e.toLowerCase() : e; }
    const Rn = {};
    class In extends jr.E {
        constructor(e, t, r) { if (Cn.checkNew(new.target, In), super(), e !== Rn)
            throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner"); (0, Ur.defineReadOnly)(this, "provider", t), null == r && (r = 0), "string" == typeof r ? ((0, Ur.defineReadOnly)(this, "_address", this.provider.formatter.address(r)), (0, Ur.defineReadOnly)(this, "_index", null)) : "number" == typeof r ? ((0, Ur.defineReadOnly)(this, "_index", r), (0, Ur.defineReadOnly)(this, "_address", null)) : Cn.throwArgumentError("invalid address or index", "addressOrIndex", r); }
        connect(e) { return Cn.throwError("cannot alter JSON-RPC Signer connection", Hr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "connect" }); }
        connectUnchecked() { return new Dn(Rn, this.provider, this._address || this._index); }
        getAddress() { return this._address ? Promise.resolve(this._address) : this.provider.send("eth_accounts", []).then((e => (e.length <= this._index && Cn.throwError("unknown account #" + this._index, Hr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "getAddress" }), this.provider.formatter.address(e[this._index])))); }
        sendUncheckedTransaction(e) { e = (0, Ur.shallowCopy)(e); const t = this.getAddress().then((e => (e && (e = e.toLowerCase()), e))); if (null == e.gasLimit) {
            const r = (0, Ur.shallowCopy)(e);
            r.from = t, e.gasLimit = this.provider.estimateGas(r);
        } return null != e.to && (e.to = Promise.resolve(e.to).then((e => Mn(this, void 0, void 0, (function* () { if (null == e)
            return null; const t = yield this.provider.resolveName(e); return null == t && Cn.throwArgumentError("provided ENS name resolves to null", "tx.to", e), t; }))))), (0, Ur.resolveProperties)({ tx: (0, Ur.resolveProperties)(e), sender: t }).then((({ tx: t, sender: r }) => { null != t.from ? t.from.toLowerCase() !== r && Cn.throwArgumentError("from address mismatch", "transaction", e) : t.from = r; const n = this.provider.constructor.hexlifyTransaction(t, { from: !0 }); return this.provider.send("eth_sendTransaction", [n]).then((e => e), (e => Fn("sendTransaction", e, n))); })); }
        signTransaction(e) { return Cn.throwError("signing transactions is unsupported", Hr.Logger.errors.UNSUPPORTED_OPERATION, { operation: "signTransaction" }); }
        sendTransaction(e) { return Mn(this, void 0, void 0, (function* () { const t = yield this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval), r = yield this.sendUncheckedTransaction(e); try {
            return yield (0, Kr.poll)((() => Mn(this, void 0, void 0, (function* () { const e = yield this.provider.getTransaction(r); if (null !== e)
                return this.provider._wrapTransaction(e, r, t); }))), { oncePoll: this.provider });
        }
        catch (e) {
            throw e.transactionHash = r, e;
        } })); }
        signMessage(e) { return Mn(this, void 0, void 0, (function* () { const t = "string" == typeof e ? (0, zr.Y0)(e) : e, r = yield this.getAddress(); return yield this.provider.send("eth_sign", [r.toLowerCase(), (0, br.hexlify)(t)]); })); }
        _signTypedData(e, t, r) { return Mn(this, void 0, void 0, (function* () { const n = yield Vr.E.resolveNames(e, t, r, (e => this.provider.resolveName(e))), i = yield this.getAddress(); return yield this.provider.send("eth_signTypedData_v4", [i.toLowerCase(), JSON.stringify(Vr.E.getPayload(n.domain, t, n.value))]); })); }
        unlock(e) { return Mn(this, void 0, void 0, (function* () { const t = this.provider, r = yield this.getAddress(); return t.send("personal_unlockAccount", [r.toLowerCase(), e, null]); })); }
    }
    class Dn extends In {
        sendTransaction(e) { return this.sendUncheckedTransaction(e).then((e => ({ hash: e, nonce: null, gasLimit: null, gasPrice: null, data: null, value: null, chainId: null, confirmations: 0, from: null, wait: t => this.provider.waitForTransaction(e, t) }))); }
    }
    const Jn = { chainId: !0, data: !0, gasLimit: !0, gasPrice: !0, nonce: !0, to: !0, value: !0, type: !0, accessList: !0, maxFeePerGas: !0, maxPriorityFeePerGas: !0 };
    class _n extends Pn {
        constructor(e, t) { Cn.checkNew(new.target, _n); let r = t; null == r && (r = new Promise(((e, t) => { setTimeout((() => { this.detectNetwork().then((t => { e(t); }), (e => { t(e); })); }), 0); }))), super(r), e || (e = (0, Ur.getStatic)(this.constructor, "defaultUrl")()), "string" == typeof e ? (0, Ur.defineReadOnly)(this, "connection", Object.freeze({ url: e })) : (0, Ur.defineReadOnly)(this, "connection", Object.freeze((0, Ur.shallowCopy)(e))), this._nextId = 42; }
        get _cache() { return null == this._eventLoopCache && (this._eventLoopCache = {}), this._eventLoopCache; }
        static defaultUrl() { return "http://localhost:8545"; }
        detectNetwork() { return this._cache.detectNetwork || (this._cache.detectNetwork = this._uncachedDetectNetwork(), setTimeout((() => { this._cache.detectNetwork = null; }), 0)), this._cache.detectNetwork; }
        _uncachedDetectNetwork() { return Mn(this, void 0, void 0, (function* () { yield On(0); let e = null; try {
            e = yield this.send("eth_chainId", []);
        }
        catch (t) {
            try {
                e = yield this.send("net_version", []);
            }
            catch (e) { }
        } if (null != e) {
            const t = (0, Ur.getStatic)(this.constructor, "getNetwork");
            try {
                return t(Xr.O$.from(e).toNumber());
            }
            catch (t) {
                return Cn.throwError("could not detect network", Hr.Logger.errors.NETWORK_ERROR, { chainId: e, event: "invalidNetwork", serverError: t });
            }
        } return Cn.throwError("could not detect network", Hr.Logger.errors.NETWORK_ERROR, { event: "noNetwork" }); })); }
        getSigner(e) { return new In(Rn, this, e); }
        getUncheckedSigner(e) { return this.getSigner(e).connectUnchecked(); }
        listAccounts() { return this.send("eth_accounts", []).then((e => e.map((e => this.formatter.address(e))))); }
        send(e, t) { const r = { method: e, params: t, id: this._nextId++, jsonrpc: "2.0" }; this.emit("debug", { action: "request", request: (0, Ur.deepCopy)(r), provider: this }); const n = ["eth_chainId", "eth_blockNumber"].indexOf(e) >= 0; if (n && this._cache[e])
            return this._cache[e]; const i = (0, Kr.fetchJson)(this.connection, JSON.stringify(r), xn).then((e => (this.emit("debug", { action: "response", request: r, response: e, provider: this }), e)), (e => { throw this.emit("debug", { action: "response", error: e, request: r, provider: this }), e; })); return n && (this._cache[e] = i, setTimeout((() => { this._cache[e] = null; }), 0)), i; }
        prepareRequest(e, t) { switch (e) {
            case "getBlockNumber": return ["eth_blockNumber", []];
            case "getGasPrice": return ["eth_gasPrice", []];
            case "getBalance": return ["eth_getBalance", [Nn(t.address), t.blockTag]];
            case "getTransactionCount": return ["eth_getTransactionCount", [Nn(t.address), t.blockTag]];
            case "getCode": return ["eth_getCode", [Nn(t.address), t.blockTag]];
            case "getStorageAt": return ["eth_getStorageAt", [Nn(t.address), t.position, t.blockTag]];
            case "sendTransaction": return ["eth_sendRawTransaction", [t.signedTransaction]];
            case "getBlock": return t.blockTag ? ["eth_getBlockByNumber", [t.blockTag, !!t.includeTransactions]] : t.blockHash ? ["eth_getBlockByHash", [t.blockHash, !!t.includeTransactions]] : null;
            case "getTransaction": return ["eth_getTransactionByHash", [t.transactionHash]];
            case "getTransactionReceipt": return ["eth_getTransactionReceipt", [t.transactionHash]];
            case "call": return ["eth_call", [(0, Ur.getStatic)(this.constructor, "hexlifyTransaction")(t.transaction, { from: !0 }), t.blockTag]];
            case "estimateGas": return ["eth_estimateGas", [(0, Ur.getStatic)(this.constructor, "hexlifyTransaction")(t.transaction, { from: !0 })]];
            case "getLogs": return t.filter && null != t.filter.address && (t.filter.address = Nn(t.filter.address)), ["eth_getLogs", [t.filter]];
        } return null; }
        perform(e, t) { return Mn(this, void 0, void 0, (function* () { if ("call" === e || "estimateGas" === e) {
            const e = t.transaction;
            if (e && null != e.type && Xr.O$.from(e.type).isZero() && null == e.maxFeePerGas && null == e.maxPriorityFeePerGas) {
                const r = yield this.getFeeData();
                null == r.maxFeePerGas && null == r.maxPriorityFeePerGas && ((t = (0, Ur.shallowCopy)(t)).transaction = (0, Ur.shallowCopy)(e), delete t.transaction.type);
            }
        } const r = this.prepareRequest(e, t); null == r && Cn.throwError(e + " not implemented", Hr.Logger.errors.NOT_IMPLEMENTED, { operation: e }); try {
            return yield this.send(r[0], r[1]);
        }
        catch (r) {
            return Fn(e, r, t);
        } })); }
        _startEvent(e) { "pending" === e.tag && this._startPending(), super._startEvent(e); }
        _startPending() { if (null != this._pendingFilter)
            return; const e = this, t = this.send("eth_newPendingTransactionFilter", []); this._pendingFilter = t, t.then((function (r) { return function n() { e.send("eth_getFilterChanges", [r]).then((function (r) { if (e._pendingFilter != t)
            return null; let n = Promise.resolve(); return r.forEach((function (t) { e._emitted["t:" + t.toLowerCase()] = "pending", n = n.then((function () { return e.getTransaction(t).then((function (t) { return e.emit("pending", t), null; })); })); })), n.then((function () { return On(1e3); })); })).then((function () { if (e._pendingFilter == t)
            return setTimeout((function () { n(); }), 0), null; e.send("eth_uninstallFilter", [r]); })).catch((e => { })); }(), r; })).catch((e => { })); }
        _stopEvent(e) { "pending" === e.tag && 0 === this.listenerCount("pending") && (this._pendingFilter = null), super._stopEvent(e); }
        static hexlifyTransaction(e, t) { const r = (0, Ur.shallowCopy)(Jn); if (t)
            for (const e in t)
                t[e] && (r[e] = !0); (0, Ur.checkProperties)(e, r); const n = {}; return ["gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach((function (t) { if (null == e[t])
            return; const r = (0, br.hexValue)(e[t]); "gasLimit" === t && (t = "gas"), n[t] = r; })), ["from", "to", "data"].forEach((function (t) { null != e[t] && (n[t] = (0, br.hexlify)(e[t])); })), e.accessList && (n.accessList = (0, Zr.accessListify)(e.accessList)), n; }
    }
    const Un = new Hr.Logger(Gr);
    let Hn = 1;
    function Gn(e, t) { const r = "Web3LegacyFetcher"; return function (n, i) { "eth_sign" == n && (e.isMetaMask || e.isStatus) && (n = "personal_sign", i = [i[1], i[0]]); const o = { method: n, params: i, id: Hn++, jsonrpc: "2.0" }; return new Promise(((e, n) => { this.emit("debug", { action: "request", fetcher: r, request: (0, Ur.deepCopy)(o), provider: this }), t(o, ((t, i) => { if (t)
        return this.emit("debug", { action: "response", fetcher: r, error: t, request: o, provider: this }), n(t); if (this.emit("debug", { action: "response", fetcher: r, request: o, response: i, provider: this }), i.error) {
        const e = new Error(i.error.message);
        return e.code = i.error.code, e.data = i.error.data, n(e);
    } e(i.result); })); })); }; }
    class jn extends _n {
        constructor(e, t) { Un.checkNew(new.target, jn), null == e && Un.throwArgumentError("missing provider", "provider", e); let r = null, n = null, i = null; "function" == typeof e ? (r = "unknown:", n = e) : (r = e.host || e.path || "", !r && e.isMetaMask && (r = "metamask"), i = e, e.request ? ("" === r && (r = "eip-1193:"), n = function (e) { return function (t, r) { null == r && (r = []), "eth_sign" == t && (e.isMetaMask || e.isStatus) && (t = "personal_sign", r = [r[1], r[0]]); const n = { method: t, params: r }; return this.emit("debug", { action: "request", fetcher: "Eip1193Fetcher", request: (0, Ur.deepCopy)(n), provider: this }), e.request(n).then((e => (this.emit("debug", { action: "response", fetcher: "Eip1193Fetcher", request: n, response: e, provider: this }), e)), (e => { throw this.emit("debug", { action: "response", fetcher: "Eip1193Fetcher", request: n, error: e, provider: this }), e; })); }; }(e)) : e.sendAsync ? n = Gn(e, e.sendAsync.bind(e)) : e.send ? n = Gn(e, e.send.bind(e)) : Un.throwArgumentError("unsupported provider", "provider", e), r || (r = "unknown:")), super(r, t), (0, Ur.defineReadOnly)(this, "jsonRpcFetchFunc", n), (0, Ur.defineReadOnly)(this, "provider", i); }
        send(e, t) { return this.jsonRpcFetchFunc(e, t); }
    }
    var Xn = r(6371);
    let Vn = new (r(6266).ec)("secp256k1"), zn = r(1094);
    class Zn {
        static sign(e, t) { let r = Vn.keyFromPrivate(t.getPrivateAsHexString(), "hex"), n = zn.keccak256(i(e)); return r.sign(n).toDER("hex"); }
        static verify(e, t, r) { return Zn.verifyArrayBuf(i(e), t, r); }
        static verifyArrayBuf(e, t, r) { let n = Vn.keyFromPublic(r.getPublicKeyAsHexStr(), "hex"), i = zn.keccak256(e); return n.verify(i, t); }
        static async signMessageWithBrowserWallet(e) { await Zn.connectMetamaskAndGetAddress(); let t = new jn(window.ethereum).getSigner(); return await t.signMessage(e); }
        static async recoverPublicKeyFromMessageSignature(e, t) { const r = Dr.r(e), n = br.arrayify(r); return await Jr.recoverPublicKey(n, t); }
        static recoverPublicKeyFromTypedMessageSignature(e, t) { let r, n; try {
            let t = e.message.payload;
            e.message.payload = _r.id(t).substr(2);
            let n = e.types;
            delete n.EIP712Domain, r = Xn._TypedDataEncoder.hash(e.domain, n, e.message), e.message.payload = t;
        }
        catch (e) {
            throw new Error("Cant sign data, possibly wrong format. " + e);
        } try {
            n = (0, Xn.recoverPublicKey)(o(r.substr(2)), t);
        }
        catch (e) {
            throw new Error("Cant recoverPublicKey. " + e);
        } return n; }
        static async signEIP712WithBrowserWallet(e, t, r, n, i = null) { try {
            let o;
            if (o = i ? new Ir.Wallet("0x" + i.getPrivateAsHexString()) : new jn(window.ethereum).getSigner(), !o)
                throw new Error("Active Wallet required");
            const a = { name: e, version: Zn.Eip712Data.PROTOCOL_VERSION }, s = {};
            s[n] = r;
            let c = Object.assign({}, t);
            c.payload = zn.keccak256(c.payload);
            let l = await o._signTypedData(a, s, c), u = { types: { EIP712Domain: Zn.Eip712domainTypes }, primaryType: n, message: t, domain: a };
            u.types[n] = s[n];
            let f = { signatureInHex: l, jsonSigned: JSON.stringify(u) };
            return JSON.stringify(f);
        }
        catch (e) {
            return console.error("Cant sign eip712 data. Error: " + e), "";
        } }
        static async connectMetamaskAndGetAddress() { if (!window.ethereum)
            throw new Error("Please install metamask before."); const e = await window.ethereum.request({ method: "eth_requestAccounts" }); if (!e || !e.length)
            throw new Error("Active Wallet required"); return e[0]; }
        static getChainIdFromSignature(e) { let t = Number("0x" + e.substr(-2)); return 27 == t || 28 == t ? 0 : t - 35 >> 1; }
    }
    Zn.OID_ECDSA_PUBLICKEY = "1.2.840.10045.2.1", Zn.Eip712Data = { PROTOCOL_VERSION: "0.1" }, Zn.Eip712domainTypes = [{ name: "name", type: "string" }, { name: "version", type: "string" }];
    class Kn {
        static validateTimestamp(e, t, r) { return !(e > t + r || e < t - r); }
        static isAddress(e) { return null !== e.toLowerCase().match(/^0x[a-f0-9]{40}$/i) || (console.log("Wrong Ethereum Address"), !1); }
        static isNullOrAddress(e) { return null == e || this.isAddress(e); }
    }
    Kn.ADDRESS_LENGTH_IN_BYTES = 42;
    class qn {
        constructor(e = null) { this.ALLOWED_ROUNDING = 1e3, this.validity = 0, e || (this.time = Date.now()), "number" == typeof e && (this.time = e), "string" == typeof e && (this.time = qn.stringTimestampToLong(e)), this.time = this.time - this.time % 1e3; }
        fromString(e) { this.time = qn.stringTimestampToLong(e); }
        getValidity() { return this.validity; }
        setValidity(e) { this.validity = e; }
        getTime() { return this.time; }
        getTimeAsString() { let e = new Date(this.time).toString(); return e.substr(0, e.indexOf("(") - 1); }
        validateTimestamp() { let e = this.getCurrentTime(); return !(this.time > e + this.ALLOWED_ROUNDING || this.time < e - this.ALLOWED_ROUNDING - this.validity); }
        validateAgainstExpiration(e) { let t = this.getCurrentTime(); return !(this.time > t + this.ALLOWED_ROUNDING || e < t - this.ALLOWED_ROUNDING || e - this.time > this.validity + 3 * this.ALLOWED_ROUNDING && (console.log(e + "\n" + this.time + "\n" + this.validity + "\n" + this.ALLOWED_ROUNDING + "\n" + (e - this.time) + "\n" + (this.validity + this.ALLOWED_ROUNDING) + "\n"), 1)); }
        static stringTimestampToLong(e) { return Date.parse(e); }
        getCurrentTime() { return Date.now(); }
    }
    qn.TIMESTAMP_FORMAT = "EEE MMM d yyyy HH:mm:ss 'GMT'Z", qn.ALLOWED_ROUNDING = 1e3, qn.UNLIMITED = 0xe677d1e8e998, qn.DEFAULT_TOKEN_TIME_LIMIT = 31536e6, qn.DEFAULT_TIME_LIMIT_MS = 12e5;
    class Qn {
        constructor() { this.DEFAULT_NONCE_TIME_LIMIT_MS = 12e5; }
        static async makeNonce(e = "", t, r = new Uint8Array(0), n = 0) { if (e || (e = await Zn.connectMetamaskAndGetAddress()), !Kn.isAddress(e))
            throw new Error("Address is not valid"); return e = e.toUpperCase(), n || (n = Date.now()), h([Uint8Array.from(m(e)), S(t), A(n), r]); }
        validateNonce(e, t, r, n, i, o = new Uint8Array(0)) { return Qn.validateAddress(e, t) ? this.validateReceiverIdentifier(e, r) ? this.validateTimestamp(e, n, i) ? this.validateOtherData(e, o) ? this.validateOtherData(e, o) : (console.log("otherData check failed"), !1) : (console.log("timestamp check failed"), !1) : (console.log("validateReceiverIdentifier check failed"), !1) : (console.log("validateAddress check failed for " + t), !1); }
        validateTimestamp(e, t, r) { let n = Qn.getTimestamp(e), i = new qn(n); return i.setValidity(r - t), i.validateAgainstExpiration(r); }
        static validateAddress(e, t) { let r = d(e.slice(Qn.senderAddressIndexStart, Qn.senderAddressIndexStop)); return t.toUpperCase() === r.toUpperCase() || (console.log("nonceAddress = " + r), !1); }
        validateReceiverIdentifier(e, t) { return y(S(t)).toLowerCase() === y(e.slice(Qn.receiverIdentifierIndexStart, Qn.receiverIdentifierIndexStop)).toLowerCase(); }
        validateOtherData(e, t) { return y(t).toLowerCase() === y(e.slice(Qn.otherDataIndexStart, Qn.otherDataIndexStart + t.length)).toLowerCase(); }
        static getTimestamp(e) { let t = l(e.slice(Qn.timestampIndexStart, Qn.timestampIndexStop)); if (t > BigInt(Number.MAX_SAFE_INTEGER))
            throw new Error("timestamp value bigger than MAX_SAFE_INTEGER"); return Number(t); }
    }
    Qn.LONG_BYTES = 8, Qn.senderAddressIndexStart = 0, Qn.senderAddressIndexStop = Kn.ADDRESS_LENGTH_IN_BYTES, Qn.receiverIdentifierIndexStart = Qn.senderAddressIndexStop, Qn.receiverIdentifierIndexStop = Qn.receiverIdentifierIndexStart + 32, Qn.timestampIndexStart = Qn.receiverIdentifierIndexStop, Qn.timestampIndexStop = Qn.timestampIndexStart + Qn.LONG_BYTES, Qn.otherDataIndexStart = Qn.timestampIndexStop;
    var Wn = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class Yn {
    }
    Wn([kt({ type: Ke.Any })], Yn.prototype, "signedToken", void 0), Wn([kt({ type: Ke.Any })], Yn.prototype, "attestation", void 0), Wn([kt({ type: Ke.Any })], Yn.prototype, "proof", void 0);
    class $n {
        constructor() { this.XMLConfig = Or; }
        static stringIsAValidUrl(e) { let t; try {
            t = new URL(e);
        }
        catch (e) {
            return console.log("cant construct url. Error:" + e), !1;
        } return "http:" === t.protocol || "https:" === t.protocol; }
        setDomainAndTimout(e) { if (!$n.stringIsAValidUrl(e))
            throw new Error("wrong domain"); this.domain = e; }
        setDomain(e) { if (!$n.stringIsAValidUrl(e))
            throw new Error("wrong domain"); this.domain = e; }
        getDomain() { return this.domain; }
        validateRequest(e) { try {
            let t = JSON.parse(e), r = JSON.parse(t.jsonSigned), n = r.domain, i = r.message;
            return this.retrieveAttestedObject(i), this.validateDomain(n);
        }
        catch (e) {
            return console.error("Validate error!"), console.error(e), !1;
        } }
        validateDomain(e) { return e.name.toLowerCase() !== this.domain.toLowerCase() ? (console.error("Domain name is not valid"), !1) : e.version === Zn.Eip712Data.PROTOCOL_VERSION || (console.error("Protocol version is wrong"), !1); }
        retrieveAttestedObject(e) { let t = e.payload, r = Pr.publicFromBase64(Or.base64attestorPubKey), n = Pr.publicFromBase64(Or.base64senderPublicKey); return Fr.fromBytes(o(t), Yn, r, er, n); }
        verifySignature(e, t) { let r = JSON.parse(e), n = r.signatureInHex, i = JSON.parse(r.jsonSigned), o = Zn.recoverPublicKeyFromTypedMessageSignature(i, n), a = Pr.fromPublicHex(o.substr(2)); return t.toLowerCase() !== i.message.address.toLowerCase() ? (console.log("message.address is not equal pkAddress"), !1) : t.toLowerCase() === a.getAddress().toLowerCase() || (console.log("Recovered address is not equal pkAddress"), !1); }
    }
    class ei extends $n {
    }
    class ti extends ei {
        constructor(e = null, t = qn.DEFAULT_TIME_LIMIT_MS) { super(), this.Eip712UserDataTypes = [{ name: "payload", type: "string" }, { name: "description", type: "string" }, { name: "timestamp", type: "string" }, { name: "identifier", type: "string" }], this.Eip712UserDataPrimaryName = "AttestationRequest", this.Eip712UserDataDescription = "Linking Ethereum address to phone or email", this.userKey = e, this.acceptableTimeLimit = t; }
        async addData(e, t = qn.DEFAULT_TIME_LIMIT_MS, r, n) { this.setDomain(e), this.attestationRequest = n, this.acceptableTimeLimit = t, this.jsonEncoding = await this.makeToken(r); try {
            this.fillJsonData(this.jsonEncoding);
        }
        catch (e) {
            return console.log(e), !1;
        } }
        fillJsonData(e) { if (!e)
            throw new Error("Empty json"); this.jsonEncoding = e; let t = JSON.parse(e), r = t.signatureInHex, n = JSON.parse(t.jsonSigned); this.eip712DomainData = n.domain, this.data = n.message; try {
            let e = Zn.recoverPublicKeyFromTypedMessageSignature(n, r);
            this.requestorKeys = Pr.fromPublicHex(e.substr(2));
        }
        catch (e) {
            let t = "Recover Address failed with error:" + e;
            throw console.log(t), new Error(t);
        } this.attestationRequest || (this.attestationRequest = Rr.fromBytes(g(this.data.payload))), this.constructorCheck(); }
        constructorCheck() { if (!this.verify())
            throw new Error("Could not verify Eip712 AttestationRequest"); }
        async makeToken(e) { let t; t = this.userKey ? this.userKey.getAddress() : await Zn.connectMetamaskAndGetAddress(); let r = Qn.getTimestamp(this.attestationRequest.getPok().getNonce()), n = new qn(r).getTimeAsString(), i = { payload: a(this.attestationRequest.getDerEncoding()), description: this.Eip712UserDataDescription, timestamp: n, identifier: e }; return await Zn.signEIP712WithBrowserWallet(this.domain, i, this.Eip712UserDataTypes, this.Eip712UserDataPrimaryName, this.userKey); }
        setAcceptableTimeLimit(e) { this.acceptableTimeLimit = e; }
        getJsonEncoding() { return this.jsonEncoding; }
        verify() { return !!this.attestationRequest.verify() && this.verifyDomainData(); }
        verifyDomainData() { return this.eip712DomainData.name.toLowerCase() === this.getDomain().toLowerCase() && this.eip712DomainData.version === Zn.Eip712Data.PROTOCOL_VERSION; }
        checkValidity() { if (this.data.description !== this.Eip712UserDataDescription)
            return !1; let e = new qn(this.data.timestamp); return e.setValidity(this.acceptableTimeLimit), e.validateTimestamp() ? !!(new Qn).validateNonce(this.getPok().getNonce(), this.requestorKeys.getAddress(), this.domain, qn.stringTimestampToLong(this.data.timestamp) - this.acceptableTimeLimit, qn.stringTimestampToLong(this.data.timestamp) + this.acceptableTimeLimit) || (console.log("nonce is not correct"), !1) : (console.log(`timestamp is not correct. timestamp = ${this.data.timestamp}, acceptableTimeLimit = ${this.acceptableTimeLimit}`), !1); }
        getIdentifier() { return this.data.identifier; }
        getType() { return this.attestationRequest.getType(); }
        getPok() { return this.attestationRequest.getPok(); }
        getUserPublicKey() { return this.requestorKeys; }
    }
    var ri = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class ni {
    }
    ri([kt({ type: mr })], ni.prototype, "attestation", void 0), ri([kt({ type: Ke.Integer })], ni.prototype, "type", void 0), ri([kt({ type: Lt })], ni.prototype, "proof", void 0), ri([kt({ type: lr })], ni.prototype, "sessionKey", void 0);
    class ii {
        static fromData(e, t, r, n) { let i = new this; return i.attestation = e, i.type = t, i.pok = r, i.sessionPublicKey = n, i.encoding = i.makeEncoding(e, t, r, n), i.constructorCheck(), i; }
        static fromBytes(e, t) { let r, n = new this; try {
            r = Pt.parse(v(e), ni);
        }
        catch (e) {
            throw new Error("Cant parse UseAttestationASN. " + e);
        } try {
            n.attestation = Lr.fromASNType(r.attestation, t), n.type = r.type, n.pok = It.fromASNType(r.proof), n.sessionPublicKey = Pr.publicFromSubjectPublicKeyValue(r.sessionKey);
        }
        catch (e) {
            throw new Error("Cant decode internal data. " + e);
        } return n.constructorCheck(), n; }
        constructorCheck() { if (!this.verify())
            throw new Error("The use attestation object is not valid"); }
        makeEncoding(e, t, r, n) { let i = e.getDerEncoding() + Nt.encode("INTEGER", t) + r.getDerEncoding() + n.getAsnDerPublic(); return Nt.encode("SEQUENCE_30", i); }
        getAttestation() { return this.attestation; }
        getType() { return this.type; }
        getPok() { return this.pok; }
        getSessionPublicKey() { return this.sessionPublicKey; }
        getDerEncoding() { return this.encoding; }
        verify() { return this.attestation.verify() && (new Ht).verifyFullProof(this.pok); }
        checkValidity() { return this.attestation.checkValidity(); }
    }
    class oi extends ei {
        constructor(e = null, t = qn.DEFAULT_TOKEN_TIME_LIMIT) { super(), this.PLACEHOLDER_CHAIN_ID = 0, this.Eip712PrimaryName = "AttestationUsage", this.Eip712Description = 'Prove that the "identifier" is the identifier hidden in attestation contained in"payload".', this.Eip712UserTypes = [{ name: "description", type: "string" }, { name: "identifier", type: "string" }, { name: "payload", type: "string" }, { name: "timestamp", type: "string" }, { name: "expirationTime", type: "string" }], this.maxTokenValidityInMs = t, this.userKey = e; }
        async addData(e, t, r) { this.setDomain(e), this.useAttestation = r; try {
            this.jsonEncoding = await this.makeToken(t, r);
        }
        catch (e) {
            throw console.error(e), new Error("Could not encode object. " + e);
        } try {
            this.fillJsonData(this.jsonEncoding);
        }
        catch (e) {
            return console.log(e), !1;
        } this.constructorCheck(); }
        fillJsonData(e, t = null) { if (!e)
            throw new Error("Empty json"); null !== t && (this.attestorKey = t), this.jsonEncoding = e; let r = JSON.parse(e), n = r.signatureInHex, i = JSON.parse(r.jsonSigned); this.eip712DomainData = i.domain, this.data = i.message; try {
            let e = Zn.recoverPublicKeyFromTypedMessageSignature(i, n);
            this.requestorKeys = Pr.fromPublicHex(e.substr(2));
        }
        catch (e) {
            let t = "Recover Address failed with error:" + e;
            throw console.log(t), new Error(t);
        } if (!this.useAttestation)
            try {
                this.useAttestation = ii.fromBytes(g(this.data.payload), this.attestorKey);
            }
            catch (e) {
                throw new Error("Failed to read UseAttestation. " + e);
            } this.constructorCheck(); }
        constructorCheck() { if (!this.verify())
            throw new Error("Could not verify Eip712 use attestation"); }
        async makeToken(e, t) { this.userKey || await Zn.connectMetamaskAndGetAddress(); let r = { payload: a(t.getDerEncoding()), description: this.Eip712Description, timestamp: (new qn).getTimeAsString(), identifier: e, expirationTime: new qn(Date.now() + this.maxTokenValidityInMs).getTimeAsString() }; return await Zn.signEIP712WithBrowserWallet(this.domain, r, this.Eip712UserTypes, this.Eip712PrimaryName, this.userKey); }
        proofLinking() { let e = (new Ht).mapToCurveMultiplier(this.getType(), this.getIdentifier()); return !!k.decodeFromUint8(this.getAttestation().getUnsignedAttestation().getCommitment(), T).subtract(_t.multiplyDA(e)).equals(this.getPok().getRiddle()) || (console.log("candidateRiddle.equals(this.getPok().getRiddle()) error"), !1); }
        getPok() { return this.useAttestation.getPok(); }
        getType() { return this.useAttestation.type; }
        getIdentifier() { return this.data.identifier; }
        getAttestation() { return this.useAttestation.getAttestation(); }
        getJsonEncoding() { return this.jsonEncoding; }
        checkTokenValidity() { let e = qn.stringTimestampToLong(this.data.expirationTime) - this.maxTokenValidityInMs - 2 * qn.ALLOWED_ROUNDING, t = qn.stringTimestampToLong(this.data.expirationTime); if (!this.useAttestation.checkValidity())
            return console.log("useAttestation.checkValidity failed"), !1; if (this.data.description != this.Eip712Description)
            return console.log(`wrong description: "${this.data.description}", must be "${this.Eip712Description}"`), !1; let r = new qn(this.data.timestamp); return r.setValidity(this.maxTokenValidityInMs), r.validateAgainstExpiration(qn.stringTimestampToLong(this.data.expirationTime)) ? this.requestorKeys.getAddress().toLowerCase() !== this.useAttestation.getAttestation().getUnsignedAttestation().getAddress().toLowerCase() ? (console.log("wrong address"), !1) : (new Qn).validateNonce(this.useAttestation.getPok().getNonce(), this.useAttestation.getAttestation().getUnsignedAttestation().getAddress(), this.domain, e, t) ? !!this.proofLinking() || (console.log("wrong proofLinking"), !1) : (console.log("wrong Nonce"), !1) : (console.log("verify timestamp failed.\n" + this.data.timestamp + "\n" + this.maxTokenValidityInMs + "\n" + this.data.expirationTime + "\n" + qn.stringTimestampToLong(this.data.expirationTime) + "\n"), !1); }
        verify() { return !!this.useAttestation.verify(); }
        getSessionPublicKey() { return this.useAttestation.getSessionPublicKey(); }
    }
    var ai = function (e, t, r, n) { var i, o = arguments.length, a = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, r, n);
    else
        for (var s = e.length - 1; s >= 0; s--)
            (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a); return o > 3 && a && Object.defineProperty(t, r, a), a; };
    class si {
    }
    ai([kt({ type: Ke.Integer })], si.prototype, "type", void 0), ai([kt({ type: Lt })], si.prototype, "proof", void 0), ai([kt({ type: lr })], si.prototype, "sessionKey", void 0);
    class ci {
        constructor() { }
        static fromData(e, t, r) { let n = new this; if (n.type = e, n.pok = t, n.sessionPublicKey = r, !n.verify())
            throw new Error("Could not verify the proof"); return n; }
        static fromBytes(e) { let t, r = new this; try {
            t = Pt.parse(v(e), si), r.type = t.type, r.sessionPublicKey = Pr.publicFromSubjectPublicKeyValue(t.sessionKey);
        }
        catch (e) {
            throw new Error("Cant parse AttestationRequest Identifier");
        } try {
            let e = new Uint8Array(t.proof.riddle), n = new Uint8Array(t.proof.challengePoint), i = new Uint8Array(t.proof.responseValue), o = new Uint8Array(t.proof.nonce), a = k.decodeFromHex(y(e), T), s = l(n), c = k.decodeFromHex(y(i), T);
            r.pok = It.fromData(a, c, s, o);
        }
        catch (e) {
            throw new Error("Cant create FullProofOfExponent");
        } if (!r.verify())
            throw new Error("Could not verify the proof"); return r; }
        verify() { return !!(new Ht).verifyFullProof(this.pok); }
        getDerEncoding() { let e = Nt.encode("INTEGER", this.type) + this.pok.getDerEncoding() + this.sessionPublicKey.getAsnDerPublic(); return Nt.encode("SEQUENCE_30", e); }
        getPok() { return this.pok; }
        getType() { return this.type; }
        getSessionPublicKey() { return this.sessionPublicKey; }
    }
    class li extends ei {
        constructor(e = null, t = qn.DEFAULT_TIME_LIMIT_MS, r = qn.DEFAULT_TOKEN_TIME_LIMIT) { super(), this.Eip712UserDataTypes = [{ name: "payload", type: "string" }, { name: "description", type: "string" }, { name: "identifier", type: "string" }, { name: "timestamp", type: "string" }, { name: "expirationTime", type: "string" }], this.Eip712UserDataPrimaryName = "AttestationRequestWUsage", this.Eip712UserDataDescription = 'Prove that the "identifier" is the identifier hidden in attestation contained in"payload" and use this to authorize usage of local, temporary keys.', this.userKey = e, this.acceptableTimeLimit = t, this.maxTokenValidityInMs = r; }
        async fromData(e, t = qn.DEFAULT_TIME_LIMIT_MS, r = qn.DEFAULT_TOKEN_TIME_LIMIT, n, i, o = null) { this.setDomain(e), o && (this.userKey = o); try {
            this.acceptableTimeLimit = t, this.maxTokenValidityInMs = r, this.attestationRequestWithUsage = i, this.jsonEncoding = await this.makeToken(n, i);
        }
        catch (e) {
            throw console.log(e), new Error("Could not encode object");
        } try {
            this.fillJsonData(this.jsonEncoding);
        }
        catch (e) {
            throw new Error("Could not decode object");
        } }
        Eip712AttestationRequestWithUsage(e, t, r, n) { try {
            this.acceptableTimeLimit = t, this.maxTokenValidityInMs = r, this.jsonEncoding = n, this.fillJsonData(this.jsonEncoding);
        }
        catch (e) {
            throw console.log(e), new Error("Could not decode object");
        } }
        fillJsonData(e) { if (!e)
            throw new Error("Empty json"); this.jsonEncoding = e; let t = JSON.parse(e), r = t.signatureInHex, n = JSON.parse(t.jsonSigned); this.eip712DomainData = n.domain, this.data = n.message; try {
            let e = Zn.recoverPublicKeyFromTypedMessageSignature(n, r);
            this.userPublicKey = Pr.fromPublicHex(e.substr(2));
        }
        catch (e) {
            let t = "Recover Address failed with error:" + e;
            throw console.log(t), new Error(t);
        } this.attestationRequestWithUsage || (this.attestationRequestWithUsage = ci.fromBytes(g(this.data.payload))), this.constructorCheck(); }
        constructorCheck() { if (!this.verify())
            throw new Error("Could not verify Eip712 use attestation"); }
        async makeToken(e, t) { this.userKey || await Zn.connectMetamaskAndGetAddress(); let r = (new qn).getTimeAsString(), n = new qn(Date.now() + this.maxTokenValidityInMs).getTimeAsString(), i = { payload: a(t.getDerEncoding()), description: this.Eip712UserDataDescription, timestamp: r, identifier: e, expirationTime: n }; return await Zn.signEIP712WithBrowserWallet(this.domain, i, this.Eip712UserDataTypes, this.Eip712UserDataPrimaryName, this.userKey); }
        getIdentifier() { return this.data.identifier; }
        getUserPublicKey() { return this.userPublicKey; }
        getPok() { return this.attestationRequestWithUsage.getPok(); }
        getType() { return this.attestationRequestWithUsage.getType(); }
        getSessionPublicKey() { return this.attestationRequestWithUsage.getSessionPublicKey(); }
        getJsonEncoding() { return this.jsonEncoding; }
        checkValidity() { return !!this.testNonceAndDescription(this.acceptableTimeLimit); }
        checkTokenValidity() { let e = new qn(this.data.timestamp); return e.setValidity(this.maxTokenValidityInMs), e.validateAgainstExpiration(qn.stringTimestampToLong(this.data.expirationTime)) ? !!this.testNonceAndDescription(this.maxTokenValidityInMs) : (console.log("time.validateAgainstExpiration filed"), !1); }
        testNonceAndDescription(e) { if (!e)
            throw new Error("timeLimit required"); let t = qn.stringTimestampToLong(this.data.timestamp) - e, r = qn.stringTimestampToLong(this.data.timestamp) + e; return !!(new Qn).validateNonce(this.attestationRequestWithUsage.getPok().getNonce(), this.userPublicKey.getAddress(), this.domain, t, r) && this.data.description === this.Eip712UserDataDescription; }
        verify() { return !!this.attestationRequestWithUsage.verify(); }
    }
    let ui;
    ui = "object" == typeof crypto && crypto.subtle ? crypto.subtle : r(1085).webcrypto.subtle;
    class fi {
        constructor(e = !1) { this.negotiator = e; let t = Or; this.base64senderPublicKey = t.base64senderPublicKey, this.base64attestorPubKey = t.base64attestorPubKey, this.webDomain = t.webDomain; }
        getAuthenticationBlob(e, t) { this.signedTokenBlob = e.ticketBlob, this.magicLink = e.magicLink, this.email = e.email, this.signedTokenSecret = e.ticketSecret, this.attestationOrigin = e.attestationOrigin, this.authResultCallback = t, this.getIdentifierAttestation(); }
        getIdentifierAttestation() { console.log("getIdentifierAttestation. create iframe with " + this.attestationOrigin), this.attachPostMessageListener(this.postMessageAttestationListener.bind(this)); const e = document.createElement("iframe"); this.iframe = e, e.src = this.attestationOrigin, e.style.width = "800px", e.style.height = "700px", e.style.maxWidth = "100%", e.style.background = "#fff"; let t = document.createElement("div"); this.iframeWrap = t, t.setAttribute("style", "width:100%;min-height: 100vh; position: fixed; align-items: center; justify-content: center;display: none;top: 0; left: 0; background: #fffa"), t.appendChild(e), document.body.appendChild(t); }
        async getUseTicket(e, t, r, n, i, o) { let a = er.fromBase64(r, Pr.publicFromBase64(o)); if (!a.checkValidity())
            throw console.log("Could not validate ticket"), new Error("Validation failed"); if (!a.verify())
            throw console.log("Could not verify ticket"), new Error("Verification failed"); console.log("ticked valid (signature OK)"); let s = Pr.publicFromBase64(i), c = Lr.fromBytes(g(n), s); if (!c.checkValidity())
            throw console.log("Could not validate attestation"), new Error("Validation failed"); if (!c.verify())
            throw console.log("Could not verify attestation"), new Error("Verification failed"); console.log("attestaion valid"); let l = new Fr; return l.create(a, c, BigInt(t), BigInt(e)), console.log("redim validation = " + l.checkValidity()), l.getDerEncoding(); }
        postMessageAttestationListener(e) { let t = new URL(this.attestationOrigin); if (e.origin === t.origin) {
            if (console.log("postMessageAttestationListener event (Authenticator)"), console.log(e), void 0 !== e.data.ready && !0 === e.data.ready) {
                let e = { force: !1 };
                return this.magicLink && (e.magicLink = this.magicLink), this.email && (e.email = this.email), void this.iframe.contentWindow.postMessage(e, this.attestationOrigin);
            }
            if (void 0 !== e.data.display && (!0 === e.data.display ? (this.iframeWrap.style.display = "flex", this.negotiator && this.negotiator.commandDisplayIframe()) : (this.iframeWrap.style.display = "none", this.negotiator && this.negotiator.commandHideIframe())), e.data.hasOwnProperty("attestation") && e.data.hasOwnProperty("requestSecret")) {
                this.iframeWrap.remove(), this.attestationBlob = e.data.attestation, this.attestationSecret = e.data.requestSecret, console.log("attestation data received."), console.log(this.attestationBlob), console.log(this.attestationSecret), console.log(this.base64attestorPubKey);
                try {
                    this.getUseTicket(this.signedTokenSecret, this.attestationSecret, this.signedTokenBlob, this.attestationBlob, this.base64attestorPubKey, this.base64senderPublicKey).then((e => { e ? (console.log("this.authResultCallback( useToken ): "), this.authResultCallback(e)) : (console.log("this.authResultCallback( empty ): "), this.authResultCallback(e)); }));
                }
                catch (e) {
                    console.log(`UseDevconTicket. Something went wrong. ${e}`), this.authResultCallback(!1);
                }
            }
        } }
        attachPostMessageListener(e) { window.addEventListener ? window.addEventListener("message", (t => { e(t); }), !1) : window.attachEvent("onmessage", (t => { e(t); })); }
        static async requestAttest(e, t, r, n, i = null) { let o, a = new Ht; if (i)
            o = i.getAddress();
        else
            try {
                o = await Zn.connectMetamaskAndGetAddress();
            }
            catch (e) {
                return void console.log("Cant find user Ethereum Address. Please check Metamask. " + e);
            } let s = await Qn.makeNonce(o, r), c = a.computeAttestationProof(n, s), l = Rr.fromData(a.getType(t), c), u = new ti(i); return await u.addData(r, 2e4, e, l), u.getJsonEncoding(); }
        static constructAttest(e, t, r, n, i) { let o, a, s, c = new Ht; try {
            a = new ti, a.setDomain(i), a.fillJsonData(n), fi.checkAttestRequestVerifiability(a), fi.checkAttestRequestValidity(a);
        }
        catch (e) {
            try {
                a = new li, a.setDomain(i), a.fillJsonData(n), fi.checkAttestRequestVerifiability(a), fi.checkAttestRequestValidity(a);
            }
            catch (e) {
                let t = "Failed to parse Eip712AttestationRequestWithUsage. " + e;
                throw console.log(t), new Error(t);
            }
        } s = c.makeCommitmentFromHiding(a.getIdentifier(), a.getType(), a.getPok().getRiddle()), o = new Cr, o.fromCommitment(s, a.getUserPublicKey()), o.setIssuer("CN=" + t), o.setSerialNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)); let l = Date.now(); return o.setNotValidBefore(l), o.setNotValidAfter(l + r), Lr.fromData(o, e).getDerEncoding(); }
        static async useAttest(e, t, r, n, i, o, a = null, s = null) { const c = g(e); let u, f = Lr.fromBytes(c, r), h = l(g(t).slice(4)), d = new Ht; u = s ? s.getAddress() : await Zn.connectMetamaskAndGetAddress(); let p = await Qn.makeNonce(u, o), m = d.computeAttestationProof(h, p); try {
            let e = ii.fromData(f, d.getType(i), m, a), t = new oi(s);
            return await t.addData(o, n, e), t.getJsonEncoding();
        }
        catch (e) {
            console.error(e);
        } }
        static checkAttestRequestVerifiability(e) { if (!e.verify())
            throw new Error("Verification failed"); }
        static checkAttestRequestValidity(e) { if (!e.checkValidity())
            throw new Error("Validation failed"); }
        static checkUsageVerifiability(e) { if (!e.verify())
            throw console.error("Could not verify usage request"), new Error("Verification failed"); }
        static checkUsageValidity(e) { if (!e.checkTokenValidity())
            throw console.error("Could not validate usage request"), new Error("Validation failed"); }
        static async verifyUsage(e, t, r, n, i) { let o; try {
            let r = new oi;
            r.setDomain(n), r.fillJsonData(e, t), fi.checkUsageVerifiability(r), fi.checkUsageValidity(r), o = r.getSessionPublicKey();
        }
        catch (t) {
            let r = new li;
            r.setDomain(n), r.fillJsonData(e), fi.checkUsageVerifiability(r), fi.checkUsageValidity(r), o = r.getSessionPublicKey();
        } try {
            if (!await o.verifyStringWithSubtle(Pr.anySignatureToRawUint8(i), r))
                throw console.error("Could not verify message signature"), new Error("Signature verification failed");
            return "SUCCESSFULLY validated usage request!";
        }
        catch (e) {
            let t = "Cant verify session with subtle. " + e;
            console.log(t), console.error(e);
        } }
        static async requestAttestAndUsage(e, t, r, n, i, o) { try {
            let a, s = l(g(i));
            a = e ? e.getAddress() : await Zn.connectMetamaskAndGetAddress();
            let c = await Qn.makeNonce(a, n, new Uint8Array(0), Date.now()), u = new Ht, f = u.computeAttestationProof(s, c), h = ci.fromData(u.getType(r), f, o), d = new li(e);
            return await d.fromData(n, void 0, void 0, t, h), d.getJsonEncoding();
        }
        catch (e) {
            let t = "requestAttestAndUsage error. " + e;
            console.log(t), console.error(e);
        } }
    }
    window.Authenticator = fi, window.Attest = ti, window.AttestationCrypto = Ht;
})(); })();
