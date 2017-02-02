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
  KILOGRAMS,
  GRAMS,
  POUNDS,
  OUNCES,
} from '../../src/units/mass';

describe('KILOGRAMS', () => {
  it('has key "kilograms"', () => {
    expect(KILOGRAMS.key).toEqual('kilograms');
  });

  it('has name "Kilograms"', () => {
    expect(KILOGRAMS.name).toEqual('Kilograms');
  });

  it('has key label "kg"', () => {
    expect(KILOGRAMS.label).toEqual('kg');
  });
});

describe('GRAMS', () => {
  it('has key "grams"', () => {
    expect(GRAMS.key).toEqual('grams');
  });

  it('has name "Grams"', () => {
    expect(GRAMS.name).toEqual('Grams');
  });

  it('has key label "g"', () => {
    expect(GRAMS.label).toEqual('g');
  });
});

describe('POUNDS', () => {
  it('has key "pounds"', () => {
    expect(POUNDS.key).toEqual('pounds');
  });

  it('has name "Pounds"', () => {
    expect(POUNDS.name).toEqual('Pounds');
  });

  it('has key label "lb"', () => {
    expect(POUNDS.label).toEqual('lb');
  });
});

describe('OUNCES', () => {
  it('has key "ounces"', () => {
    expect(OUNCES.key).toEqual('ounces');
  });

  it('has name "Ounces"', () => {
    expect(OUNCES.name).toEqual('Ounces');
  });

  it('has key label "oz"', () => {
    expect(OUNCES.label).toEqual('oz');
  });
});
