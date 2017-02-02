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

import {
  LITERS,
  MILLILITERS,
  US_GALLONS,
} from '../../src/units/volume';

describe('LITERS', () => {
  it('has key "liters"', () => {
    expect(LITERS.key).toEqual('liters');
  });

  it('has name "Liters"', () => {
    expect(LITERS.name).toEqual('Liters');
  });

  it('has key label "l"', () => {
    expect(LITERS.label).toEqual('l');
  });
});

describe('MILLILITERS', () => {
  it('has key "milliliters"', () => {
    expect(MILLILITERS.key).toEqual('milliliters');
  });

  it('has name "Milliliters"', () => {
    expect(MILLILITERS.name).toEqual('Milliliters');
  });

  it('has key label "ml"', () => {
    expect(MILLILITERS.label).toEqual('ml');
  });
});

describe('US_GALLONS', () => {
  it('has key "usgallons"', () => {
    expect(US_GALLONS.key).toEqual('usgallons');
  });

  it('has name "US Gallons"', () => {
    expect(US_GALLONS.name).toEqual('US Gallons');
  });

  it('has key label "gal (US)"', () => {
    expect(US_GALLONS.label).toEqual('gal (US)');
  });
});
