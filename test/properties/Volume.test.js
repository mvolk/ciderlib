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

import Volume from '../../src/properties/Volume';

describe('Volume', () => {
  const l = value => new Volume(value, Volume.LITERS);
  const ml = value => new Volume(value, Volume.MILLILITERS);
  const usg = value => new Volume(value, Volume.US_GALLONS);

  describe('.LITERS', () => {
    it('has key "liters"', () => {
      expect(Volume.LITERS.key).toEqual('liters');
    });

    it('has name "Liters"', () => {
      expect(Volume.LITERS.name).toEqual('Liters');
    });

    it('has key label "l"', () => {
      expect(Volume.LITERS.label).toEqual('l');
    });
  });

  describe('.MILLILITERS', () => {
    it('has key "milliliters"', () => {
      expect(Volume.MILLILITERS.key).toEqual('milliliters');
    });

    it('has name "Milliliters"', () => {
      expect(Volume.MILLILITERS.name).toEqual('Milliliters');
    });

    it('has key label "ml"', () => {
      expect(Volume.MILLILITERS.label).toEqual('ml');
    });
  });

  describe('.US_GALLONS', () => {
    it('has key "usgallons"', () => {
      expect(Volume.US_GALLONS.key).toEqual('usgallons');
    });

    it('has name "US Gallons"', () => {
      expect(Volume.US_GALLONS.name).toEqual('US Gallons');
    });

    it('has key label "gal (US)"', () => {
      expect(Volume.US_GALLONS.label).toEqual('gal (US)');
    });
  });

  describe('.constructor(magnitude, units)', () => {
    it('throws a TypeError if the magnitude is not a Number', () => {
      expect(() => new Volume('23.4', Volume.MILLILITERS)).toThrowError(TypeError);
      expect(() => new Volume({}, Volume.MILLILITERS)).toThrowError(TypeError);
      expect(() => new Volume([], Volume.MILLILITERS)).toThrowError(TypeError);
      expect(() => new Volume(() => {}, Volume.MILLILITERS)).toThrowError(TypeError);
    });

    it('throws a TypeError if the magnitude is Number.NaN', () => {
      expect(() => new Volume(Number.NaN, Volume.MILLILITERS)).toThrowError(TypeError);
    });

    it('throws a RangeError if the magnitude is infinite', () => {
      expect(() => new Volume(Number.POSITIVE_INFINITY, Volume.MILLILITERS), Volume.CELSIUS)
        .toThrowError(RangeError);
      expect(() => new Volume(Number.NEGATIVE_INFINITY, Volume.MILLILITERS), Volume.CELSIUS)
        .toThrowError(RangeError);
    });

    it('throws a RangeError if the magnitude is less than zero', () => {
      expect(() => new Volume(-0.001, Volume.MILLILITERS)).toThrowError(RangeError);
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
        expect(() => l(0).inUnits(DECIGRAMS)).toThrowError(TypeError);
      });
    });

    describe('for an invalid unit of measurement', () => {
      it('throws a TypeError if a conversion function is not available', () => {
        expect(() => l(0).inUnits({})).toThrowError(TypeError);
      });
    });

    it('correctly converts liters to liters', () => {
      expect(l(1).inUnits(Volume.LITERS)).toEqual(1);
    });

    it('correctly converts liters to milliliters', () => {
      expect(l(1).inUnits(Volume.MILLILITERS)).toEqual(1000);
    });

    it('correctly converts liters to US gallons', () => {
      expect(l(3.785411784).inUnits(Volume.US_GALLONS)).toEqual(1);
    });

    it('correctly converts milliliters to liters', () => {
      expect(ml(1000).inUnits(Volume.LITERS)).toEqual(1);
    });

    it('correctly converts milliliters to milliliters', () => {
      expect(ml(1).inUnits(Volume.MILLILITERS)).toEqual(1);
    });

    it('correctly converts milliliters to US gallons', () => {
      expect(ml(3785.411784).inUnits(Volume.US_GALLONS)).toEqual(1);
    });

    it('correctly converts US gallons to liters', () => {
      expect(usg(1).inUnits(Volume.LITERS)).toEqual(3.785411784);
    });

    it('correctly converts US gallons to milliliters', () => {
      expect(usg(1).inUnits(Volume.MILLILITERS)).toEqual(3785.411784);
    });

    it('correctly converts US gallons to US gallons', () => {
      expect(usg(1).inUnits(Volume.US_GALLONS)).toEqual(1);
    });
  });

  describe('.isGreaterThan(volume)', () => {
    it('throws a TypeError if a volume is not an instance of Volume', () => {
      expect(() => ml(20).isGreaterThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(ml(15).isGreaterThan(ml(10))).toBe(true);
      expect(ml(15).isGreaterThan(ml(15))).toBe(false);
      expect(ml(15).isGreaterThan(ml(20))).toBe(false);
      expect(l(15).isGreaterThan(l(10))).toBe(true);
      expect(l(15).isGreaterThan(l(15))).toBe(false);
      expect(l(15).isGreaterThan(l(20))).toBe(false);
      expect(usg(15).isGreaterThan(usg(10))).toBe(true);
      expect(usg(15).isGreaterThan(usg(15))).toBe(false);
      expect(usg(15).isGreaterThan(usg(20))).toBe(false);
    });

    it('is accurate for comparisons across the disparate units', () => {
      expect(usg(1).isGreaterThan(l(3))).toBe(true);
      expect(usg(1).isGreaterThan(l(3.785411784))).toBe(false);
      expect(usg(1).isGreaterThan(l(4))).toBe(false);
    });
  });

  describe('.isLessThan(volume)', () => {
    it('throws a TypeError if a volume is not an instance of Volume', () => {
      expect(() => l(20).isLessThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(ml(15).isLessThan(ml(10))).toBe(false);
      expect(ml(15).isLessThan(ml(15))).toBe(false);
      expect(ml(15).isLessThan(ml(20))).toBe(true);
      expect(l(15).isLessThan(l(10))).toBe(false);
      expect(l(15).isLessThan(l(15))).toBe(false);
      expect(l(15).isLessThan(l(20))).toBe(true);
      expect(usg(15).isLessThan(usg(10))).toBe(false);
      expect(usg(15).isLessThan(usg(15))).toBe(false);
      expect(usg(15).isLessThan(usg(20))).toBe(true);
    });

    it('is accurate for comparisons across the disparate units', () => {
      expect(usg(1).isLessThan(l(3))).toBe(false);
      expect(usg(1).isLessThan(l(3.785411784))).toBe(false);
      expect(usg(1).isLessThan(l(4))).toBe(true);
    });
  });
});
