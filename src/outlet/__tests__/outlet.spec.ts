import { Outlet } from '../index';

/*
  TODO: Find a solution for TypeError: Cannot convert a BigInt value to a number at Math.pow (<anonymous>)
  Thrown by import {Authenticator} from '@tokenscript/attestation' due to @tokenscript/attestation/src/libs/Point.ts
*/

describe('Outlet spec', () => {

	test('placeholder test', () => {
		expect(true).toBe(true);
	});

	//   test('Create outlet from token name', () => {
	//     const outlet = new Outlet({ config: {tokenName: 'devcon-remote'}});
	//     console.log(outlet);
	//   });

});
