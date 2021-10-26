var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UnpredictableNumberToolTest_1;
import { suite, test } from '@testdeck/mocha';
import { DEFAULT_VALIDITY_IN_MS, UnpredictableNumberTool } from "./UnpredictableNumberTool";
import { expect } from 'chai';
let UnpredictableNumberToolTest = UnpredictableNumberToolTest_1 = class UnpredictableNumberToolTest {
    'should be valid unpredictable number'() {
        const unt = UnpredictableNumberToolTest_1.createDefaultUnt();
        expect(unt.domain).eq(UnpredictableNumberToolTest_1.DOMAIN);
        const un = unt.unpredictableNumberBundle;
        expect(unt.validateUnpredictableNumber(un.number, un.randomness, un.expiration)).true;
    }
    'should throw error given invalid domain'() {
        expect(() => new UnpredictableNumberTool(UnpredictableNumberToolTest_1.mocKey, 'NotADomain', BigInt(0))).throw('Domain is not a valid domain');
    }
    'should be invalid unpredictable number given invalid expiration'() {
        const unt = UnpredictableNumberToolTest_1.createDefaultUnt();
        const un = unt.unpredictableNumberBundle;
        un.expiration = BigInt(0);
        expect(unt.validateUnpredictableNumber(un.number, un.randomness, un.expiration)).false;
    }
    'should be invalid unpredictable number given different domain'() {
        const unt = UnpredictableNumberToolTest_1.createDefaultUnt();
        const un = unt.unpredictableNumberBundle;
        const differentDomainUnt = new UnpredictableNumberTool(UnpredictableNumberToolTest_1.mocKey, 'http://www.other-domain.com', DEFAULT_VALIDITY_IN_MS);
        expect(differentDomainUnt.validateUnpredictableNumber(un.number, un.randomness, un.expiration)).false;
    }
    'should be invalid predictable number given different key'() {
        const unt = UnpredictableNumberToolTest_1.createDefaultUnt();
        const un = unt.unpredictableNumberBundle;
        const differentDomainUnt = new UnpredictableNumberTool(new Uint8Array([8, 7, 6, 5, 4, 3, 2, 1]), UnpredictableNumberToolTest_1.DOMAIN, DEFAULT_VALIDITY_IN_MS);
        expect(differentDomainUnt.validateUnpredictableNumber(un.number, un.randomness, un.expiration)).false;
    }
    static createDefaultUnt() {
        return new UnpredictableNumberTool(UnpredictableNumberToolTest_1.mocKey, UnpredictableNumberToolTest_1.DOMAIN, DEFAULT_VALIDITY_IN_MS);
    }
};
UnpredictableNumberToolTest.DOMAIN = 'http://www.hotel-bogota.com';
UnpredictableNumberToolTest.mocKey = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
__decorate([
    test
], UnpredictableNumberToolTest.prototype, "should be valid unpredictable number", null);
__decorate([
    test
], UnpredictableNumberToolTest.prototype, "should throw error given invalid domain", null);
__decorate([
    test
], UnpredictableNumberToolTest.prototype, "should be invalid unpredictable number given invalid expiration", null);
__decorate([
    test
], UnpredictableNumberToolTest.prototype, "should be invalid unpredictable number given different domain", null);
__decorate([
    test
], UnpredictableNumberToolTest.prototype, "should be invalid predictable number given different key", null);
UnpredictableNumberToolTest = UnpredictableNumberToolTest_1 = __decorate([
    suite
], UnpredictableNumberToolTest);
