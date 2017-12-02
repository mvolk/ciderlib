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

/**
 * Applies a polynomial function to a value. Takes the coefficients for each polynomial term and
 * the value of the variable in the polynomial function and calculates the result.
 *
 * For example, polynomial([1, 8, 0, -5], 10) evaluates 1 + 8x - 5x^3 with x = 10 and returns the
 * result.
 */
export default function polynomial(coefficients, value) {
  if (!Array.isArray(coefficients)) {
    throw new TypeError('The coefficients must be an array of numbers.');
  }
  if (coefficients.some(coefficient => typeof coefficient !== 'number')) {
    throw new TypeError('The coefficients must no contain any values that are not of type "number".');
  }
  if (typeof value !== 'number') {
    throw new TypeError('The value must be of type "number".');
  }

  return coefficients.reduce((accumulator, factor, exponent) => (
    accumulator + (factor * (value ** exponent))
  ), 0);
}
