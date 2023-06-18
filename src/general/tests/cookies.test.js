/**
 * @jest-environment jsdom
 */

import { setCookie, getCookie } from '../cookies';

describe("setCookie", () => {
    test('creates a cookie with the given name, value, and time to expire', () => {
        const cname = 'testCookie';
        const cvalue = 'testValue';
        const exdays = 1;
      
        setCookie(cname, cvalue, exdays);
      
        expect(document.cookie).toMatch(`${cname}=${cvalue}`);
      });
});

describe("getCookie", () => {
    test('returns the value of a cookie with the given name', () => {
        // set up a test cookie
        const cookieName = 'testCookie';
        const cookieValue = 'testValue';
        document.cookie = `${cookieName}=${cookieValue}`;
      
        // call the function and check the return value
        expect(getCookie(cookieName)).toEqual(cookieValue);
      });
});