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

import assert from '../src/assert';

describe('assert(value)', () => {
  describe('is', () => {
    describe('a', () => {
      describe('finite', () => {
        describe('number()', () => {
          it('throws a TypeError for NaN', () => {
            expect(() => assert(Number.NaN).is.a.finite.number()).toThrowError(TypeError);
          });

          it('throws a TypeError for null', () => {
            expect(() => assert(null).is.a.finite.number()).toThrowError(TypeError);
          });

          it('throws a TypeError for object', () => {
            expect(() => assert({}).is.a.finite.number()).toThrowError(TypeError);
          });

          it('throws a TypeError for array', () => {
            expect(() => assert([]).is.a.finite.number()).toThrowError(TypeError);
          });

          it('throws a TypeError for function', () => {
            expect(() => assert(() => {}).is.a.finite.number()).toThrowError(TypeError);
          });

          it('throws a TypeError for non-numeric string', () => {
            expect(() => assert('not a number').is.a.finite.number()).toThrowError(TypeError);
          });

          it('throws a TypeError for numeric string', () => {
            expect(() => assert('1.234').is.a.finite.number()).toThrowError(TypeError);
          });

          it('throws a RangeError for an infinitely positive number', () => {
            expect(() => assert(Number.POSITIVE_INFINITY).is.a.finite.number())
              .toThrowError(RangeError);
          });

          it('throws a RangeError for an infinitely negative number', () => {
            expect(() => assert(Number.NEGATIVE_INFINITY).is.a.finite.number())
              .toThrowError(RangeError);
          });

          it('accepts a finite number', () => {
            expect(assert(123.456).is.a.finite.number()).toBeUndefined();
          });
        });
      });
    });

    describe('an', () => {
      describe('array()', () => {
        it('throws a TypeError for NaN', () => {
          expect(() => assert(Number.NaN).is.an.array()).toThrowError(TypeError);
        });

        it('throws a TypeError for null', () => {
          expect(() => assert(null).is.an.array()).toThrowError(TypeError);
        });

        it('throws a TypeError for object', () => {
          expect(() => assert({}).is.an.array()).toThrowError(TypeError);
        });

        it('accepts an array', () => {
          expect(assert([]).is.an.array()).toBeDefined();
        });

        it('throws a TypeError for function', () => {
          expect(() => assert(() => {}).is.an.array()).toThrowError(TypeError);
        });

        it('throws a TypeError for string', () => {
          expect(() => assert('hello, world').is.an.array()).toThrowError(TypeError);
        });

        it('throws a TypeError for number', () => {
          expect(() => assert(123.3456).is.an.array()).toThrowError(TypeError);
        });

        describe('of', () => {
          describe('finite', () => {
            describe('numbers()', () => {
              it('throws a TypeError if array contains a non-number', () => {
                expect(() => assert([1, 'foobar', 3]).is.an.array().of.finite.numbers())
                  .toThrowError(TypeError);
              });

              it('throws a TypeError if arrayOfFactors contains NaN', () => {
                expect(() => assert([1, Number.NaN]).is.an.array().of.finite.numbers())
                  .toThrowError(TypeError);
              });

              it('throws a RangeError if arrayOfFactors contains an infinite number', () => {
                const arrayWithPositiveInfinity = [1, Number.POSITIVE_INFINITY];
                expect(() => assert(arrayWithPositiveInfinity).is.an.array().of.finite.numbers())
                  .toThrowError(RangeError);

                const arrayWithNegativeInfinity = [1, Number.NEGATIVE_INFINITY];
                expect(() => assert(arrayWithNegativeInfinity).is.an.array().of.finite.numbers())
                  .toThrowError(RangeError);
              });

              it('accepts an empty array', () => {
                expect(assert([]).is.an.array().of.finite.numbers()).toBeUndefined();
              });

              it('accepts an array of finite numbers', () => {
                expect(assert([1, 3, 4938752, 1484.1248]).is.an.array().of.finite.numbers())
                  .toBeUndefined();
              });
            });
          });
        });
      });
    });

    describe('in', () => {
      describe('array(some_array)', () => {
        it('throws a TypeError if passed a string instead of an array', () => {
          expect(() => assert('foo').is.in.array('foo')).toThrowError(TypeError);
        });

        it('throws a TypeError if passed null instead of an array', () => {
          expect(() => assert('foo').is.in.array(null)).toThrowError(TypeError);
        });

        it('throws a TypeError if passed an object instead of an array', () => {
          expect(() => assert('foo').is.in.array({ foo: 'bar' })).toThrowError(TypeError);
        });

        it('throws a RangeError if the value is not in the array', () => {
          expect(() => assert('foo').is.in.array(['bar'])).toThrowError(RangeError);
        });

        it('throws a RangeError if the array is empty', () => {
          expect(() => assert('foo').is.in.array([])).toThrowError(RangeError);
        });

        it('accepts a value in the array', () => {
          expect(assert('foo').is.in.array(['bar', 'foo'])).toBeUndefined();
        });
      });
    });
  });
});
