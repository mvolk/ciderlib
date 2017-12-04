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

import PercentABV from '../../src/properties/PercentABV';

describe('PercentABV', () => {
  const abv = value => new PercentABV(value);

  describe('.UNITS', () => {
    it('has key "%abv"', () => {
      expect(PercentABV.UNITS.key).toEqual('%abv');
    });

    it('has name "% Alcohol (by volume)"', () => {
      expect(PercentABV.UNITS.name).toEqual('% Alcohol (by volume)');
    });

    it('has label "%ABV"', () => {
      expect(PercentABV.UNITS.label).toEqual('%ABV');
    });
  });

  describe('.constructor(magnitude)', () => {
    it('throws a TypeError if the magnitude is not a Number', () => {
      expect(() => new PercentABV('23.4')).toThrowError(TypeError);
      expect(() => new PercentABV({})).toThrowError(TypeError);
      expect(() => new PercentABV([])).toThrowError(TypeError);
      expect(() => new PercentABV(() => {})).toThrowError(TypeError);
    });

    it('throws a TypeError if the magnitude is Number.NaN', () => {
      expect(() => new PercentABV(Number.NaN)).toThrowError(TypeError);
    });

    it('throws a RangeError if the magnitude is infinite', () => {
      expect(() => new PercentABV(Number.POSITIVE_INFINITY))
        .toThrowError(RangeError);
      expect(() => new PercentABV(Number.NEGATIVE_INFINITY))
        .toThrowError(RangeError);
    });

    it('throws a RangeError if the magnitude is less than zero', () => {
      expect(() => new PercentABV(-0.001)).toThrowError(RangeError);
    });
  });

  describe('.inUnits(units)', () => {
    describe('for an unsupported unit of measurement', () => {
      const DECIGRAMS = {
        key: 'decigrams',
        label: 'dg',
        name: 'Decigrams',
      };

      it('throws a TypeError if a conversion function is not available', () => {
        expect(() => abv(5).inUnits(DECIGRAMS)).toThrowError(TypeError);
      });
    });

    describe('for an invalid unit of measurement', () => {
      it('throws a TypeError if a conversion function is not available', () => {
        expect(() => abv(5).inUnits({})).toThrowError(TypeError);
      });
    });

    it('correctly converts %ABV to %ABV', () => {
      expect(abv(5).inUnits(PercentABV.UNITS)).toEqual(5);
    });
  });

  describe('.isGreaterThan(percentABV)', () => {
    it('throws a TypeError if a percentABV is not an instance of PercentABV', () => {
      expect(() => abv(20).isGreaterThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(abv(15).isGreaterThan(abv(10))).toBe(true);
      expect(abv(15).isGreaterThan(abv(15))).toBe(false);
      expect(abv(15).isGreaterThan(abv(20))).toBe(false);
    });
  });

  describe('.isLessThan(percentABV)', () => {
    it('throws a TypeError if a percentABV is not an instance of PercentABV', () => {
      expect(() => abv(20).isLessThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(abv(15).isLessThan(abv(10))).toBe(false);
      expect(abv(15).isLessThan(abv(15))).toBe(false);
      expect(abv(15).isLessThan(abv(20))).toBe(true);
    });
  });
});
