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

function isNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}

function requireNumber(value) {
  if (!isNumber(value)) {
    throw new TypeError('A number is required');
  }
}

function isFiniteNumber(value) {
  requireNumber(value);
  return Number.isFinite(value);
}

function requireFiniteNumber(value) {
  requireNumber(value);
  if (!isFiniteNumber(value)) {
    throw new RangeError('A finite number is required');
  }
}

function requireArray(value) {
  if (!Array.isArray(value)) {
    throw new TypeError('An array is required');
  }
}

function requireMembershipIn(value, array) {
  if (!array.reduce((accumulator, arrayValue) => accumulator || value === arrayValue, false)) {
    throw new RangeError('Must be in the defined set of allowable values');
  }
}

function assert(value) {
  return {
    is: {
      a: {
        finite: {
          number() {
            requireFiniteNumber(value);
          },
        },
      },
      an: {
        array() {
          requireArray(value);

          return {
            of: {
              finite: {
                numbers() {
                  if (value.some(item => !isFiniteNumber(item))) {
                    throw new RangeError('Must be an array containing only finite numbers');
                  }
                },
              },
            },
          };
        },
      },
      in: {
        array(array) {
          requireArray(array);
          requireMembershipIn(value, array);
        },
      },
    },
  };
}

export default assert;
