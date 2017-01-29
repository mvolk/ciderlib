/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Michael Volk (michael@volksys.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import polynomial from '../src/polynomial';

describe('polynomial(arrayOfFactors, value)', () => {
  it('throws a TypeError if arrayOfFactors is not an array', () => {
    expect(() => polynomial({}, 1)).toThrowError(TypeError);
  });

  it('throws an Error if arrayOfFactors contains anything other than numbers', () => {
    expect(() => polynomial([1, 'foobar'], 1)).toThrowError(TypeError);
  });

  it('throws an Error if value is not a number', () => {
    expect(() => polynomial([1], 'foobar')).toThrowError(TypeError);
  });

  it('correctly calculates constant polynomials', () => {
    expect(polynomial([1], 2)).toEqual(1);
    expect(polynomial([1.234], 2)).toEqual(1.234);
  });

  it('correctly calculates first-order polynomials', () => {
    expect(polynomial([1, 2], 1)).toEqual(3);
    expect(polynomial([1, 2], 2)).toEqual(5);
  });

  it('correctly calculates second-order polynomials', () => {
    expect(polynomial([1, 2, 3], 1)).toEqual(6);
    expect(polynomial([1, 2, 3], 2)).toEqual(17);
  });

  it('correctly calculates third-order polynomials', () => {
    expect(polynomial([1, 2, 3, 4], 1)).toEqual(10);
    expect(polynomial([1, 2, 3, 4], 2)).toEqual(49);
  });

  it('correctly handles negative factors', () => {
    expect(polynomial([1, -2, 3, -4], 2)).toEqual(-23);
  });
});
