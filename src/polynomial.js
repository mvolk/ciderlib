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

import assert from './assert';

/**
 * Applies a polynomial function to a value.
 *
 * @param {Array} factors the factors for each term, with the indexes corresponding to the power of
 *                        the term. For example, [1, 8, -3] is equivalent to 1 + 8x - 3x^2.
 * @param {Number} value the value of the variable in the polynomial
 * @return {Number} the result of applying the polynomial function to the value
 */
export default function polynomial(factors, value) {
  assert(factors).is.an.array().of.finite.numbers();
  assert(value).is.a.finite.number();

  return factors.reduce((accumulator, factor, exponent) => (
    accumulator + (factor * (value ** exponent))
  ), 0);
}