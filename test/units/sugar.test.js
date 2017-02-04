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
  BRIX,
  SPECIFIC_GRAVITY,
} from '../../src/units/sugar';

describe('BRIX', () => {
  it('has key "brix"', () => {
    expect(BRIX.key).toEqual('brix');
  });

  it('has name "Brix"', () => {
    expect(BRIX.name).toEqual('Brix');
  });

  it('has label "°Bx"', () => {
    expect(BRIX.label).toEqual('°Bx');
  });
});

describe('SPECIFIC_GRAVITY', () => {
  it('has key "sg"', () => {
    expect(SPECIFIC_GRAVITY.key).toEqual('sg');
  });

  it('has name "Specific Gravity"', () => {
    expect(SPECIFIC_GRAVITY.name).toEqual('Specific Gravity');
  });

  it('has no label', () => {
    expect(SPECIFIC_GRAVITY.label).toEqual('');
  });
});
