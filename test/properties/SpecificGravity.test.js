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

import SpecificGravity from '../../src/properties/SpecificGravity';
import Brix from '../../src/properties/Brix';

describe('SpecificGravity', () => {
  const sg = value => new SpecificGravity(value);

  describe('.UNITS', () => {
    it('has key "sg"', () => {
      expect(SpecificGravity.UNITS.key).toEqual('sg');
    });

    it('has name "Specific Gravity"', () => {
      expect(SpecificGravity.UNITS.name).toEqual('Specific Gravity');
    });

    it('has no label', () => {
      expect(SpecificGravity.UNITS.label).toEqual('');
    });
  });

  describe('constructor', () => {
    it('throws a TypeError if the reading is not a number', () => {
      expect(() => new SpecificGravity('1.005')).toThrowError(TypeError);
      expect(() => new SpecificGravity({})).toThrowError(TypeError);
      expect(() => new SpecificGravity([])).toThrowError(TypeError);
      expect(() => new SpecificGravity(() => {})).toThrowError(TypeError);
    });

    it('throws a TypeError if the reading is Number.NaN', () => {
      expect(() => new SpecificGravity(Number.NaN)).toThrowError(TypeError);
    });

    it('throws a RangeError if the reading is infinite', () => {
      expect(() => new SpecificGravity(Number.NEGATIVE_INFINITY)).toThrowError(RangeError);
      expect(() => new SpecificGravity(Number.POSITIVE_INFINITY)).toThrowError(RangeError);
    });

    it('throws a RangeError if the magnitude is 0', () => {
      expect(() => new SpecificGravity(0)).toThrowError(RangeError);
    });

    it('throws a RangeError if the magnitude is negative', () => {
      expect(() => new SpecificGravity(-0.100)).toThrowError(RangeError);
    });
  });

  describe('.toBrix()', () => {
    it('throws a RangeError if converting from SG greater than 1.17875', () => {
      expect(() => sg(1.178751).toBrix()).toThrowError(RangeError);
    });

    it('never returns a negative value when converting to Brix', () => {
      expect(sg(0.990).toBrix().inUnits(Brix.UNITS)).toBe(0);
      expect(sg(1.001).toBrix().inUnits(Brix.UNITS)).toBeGreaterThan(0);
      for (let value = 0.990; value < 1.01; value += 0.0001) {
        expect(sg(value).toBrix().inUnits(Brix.UNITS)).toBeGreaterThanOrEqual(0);
      }
    });

    it('correctly converts specific gravity to degrees Brix', () => {
      const tolerance = 0.0015;

      expect(sg(1.00000).toBrix().inUnits(Brix.UNITS)).toBe(0.0);
      expect(Math.abs(sg(1.00390).toBrix().inUnits(Brix.UNITS) - 1.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.00780).toBrix().inUnits(Brix.UNITS) - 2.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.009765).toBrix().inUnits(Brix.UNITS) - 2.5)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.01173).toBrix().inUnits(Brix.UNITS) - 3.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.01569).toBrix().inUnits(Brix.UNITS) - 4.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.01968).toBrix().inUnits(Brix.UNITS) - 5.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.02369).toBrix().inUnits(Brix.UNITS) - 6.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.02773).toBrix().inUnits(Brix.UNITS) - 7.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.03180).toBrix().inUnits(Brix.UNITS) - 8.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.03590).toBrix().inUnits(Brix.UNITS) - 9.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.04003).toBrix().inUnits(Brix.UNITS) - 10.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.04418).toBrix().inUnits(Brix.UNITS) - 11.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.04837).toBrix().inUnits(Brix.UNITS) - 12.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.05259).toBrix().inUnits(Brix.UNITS) - 13.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.05683).toBrix().inUnits(Brix.UNITS) - 14.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.06111).toBrix().inUnits(Brix.UNITS) - 15.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.06542).toBrix().inUnits(Brix.UNITS) - 16.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.06976).toBrix().inUnits(Brix.UNITS) - 17.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.07413).toBrix().inUnits(Brix.UNITS) - 18.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.07853).toBrix().inUnits(Brix.UNITS) - 19.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.08297).toBrix().inUnits(Brix.UNITS) - 20.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.08744).toBrix().inUnits(Brix.UNITS) - 21.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.09194).toBrix().inUnits(Brix.UNITS) - 22.0)).toBeLessThan(tolerance);
      expect(Math.abs(sg(1.09647).toBrix().inUnits(Brix.UNITS) - 23.0)).toBeLessThan(tolerance);
    });
  });

  describe('.inUnits(units)', () => {
    describe('for an unsupported unit of measurement', () => {
      const KELVIN = {
        key: 'kelvin',
        label: '°K',
        name: 'Kelvin',
      };

      it('throws a TypeError if a conversion function is not available', () => {
        expect(() => sg(1.003).inUnits(KELVIN)).toThrowError(TypeError);
      });
    });

    describe('for an invalid unit of measurement', () => {
      it('throws a TypeError if a conversion function is not available', () => {
        expect(() => sg(1.003).inUnits({})).toThrowError(TypeError);
      });
    });

    describe('for Brix.UNITS', () => {
      it('throws a RangeError if converting from SG greater than 1.17875', () => {
        expect(() => sg(1.178751).inUnits(Brix.UNITS)).toThrowError(RangeError);
      });

      it('never returns a negative value when converting to Brix', () => {
        expect(sg(0.990).inUnits(Brix.UNITS)).toBe(0);
        expect(sg(1.001).inUnits(Brix.UNITS)).toBeGreaterThan(0);
        for (let value = 0.990; value < 1.01; value += 0.0001) {
          expect(sg(value).inUnits(Brix.UNITS)).toBeGreaterThanOrEqual(0);
        }
      });

      it('correctly converts specific gravity to degrees Brix', () => {
        const tolerance = 0.0015;

        expect(sg(1.00000).inUnits(Brix.UNITS)).toBe(0.0);
        expect(Math.abs(sg(1.00390).inUnits(Brix.UNITS) - 1.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.00780).inUnits(Brix.UNITS) - 2.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.009765).inUnits(Brix.UNITS) - 2.5)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.01173).inUnits(Brix.UNITS) - 3.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.01569).inUnits(Brix.UNITS) - 4.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.01968).inUnits(Brix.UNITS) - 5.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.02369).inUnits(Brix.UNITS) - 6.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.02773).inUnits(Brix.UNITS) - 7.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.03180).inUnits(Brix.UNITS) - 8.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.03590).inUnits(Brix.UNITS) - 9.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.04003).inUnits(Brix.UNITS) - 10.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.04418).inUnits(Brix.UNITS) - 11.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.04837).inUnits(Brix.UNITS) - 12.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.05259).inUnits(Brix.UNITS) - 13.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.05683).inUnits(Brix.UNITS) - 14.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.06111).inUnits(Brix.UNITS) - 15.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.06542).inUnits(Brix.UNITS) - 16.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.06976).inUnits(Brix.UNITS) - 17.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.07413).inUnits(Brix.UNITS) - 18.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.07853).inUnits(Brix.UNITS) - 19.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.08297).inUnits(Brix.UNITS) - 20.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.08744).inUnits(Brix.UNITS) - 21.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.09194).inUnits(Brix.UNITS) - 22.0)).toBeLessThan(tolerance);
        expect(Math.abs(sg(1.09647).inUnits(Brix.UNITS) - 23.0)).toBeLessThan(tolerance);
      });
    });

    it('correctly converts specific gravity to specific gravity', () => {
      expect(sg(1).inUnits(SpecificGravity.UNITS)).toEqual(1);
    });
  });

  describe('.isGreaterThan(specificGravity)', () => {
    it('throws a TypeError if a specificGravity is not an instance of SpecificGravity', () => {
      expect(() => sg(1.010).isGreaterThan(1.005)).toThrowError(TypeError);
    });

    it('throws a TypeError if a specificGravity is an instance of Brix', () => {
      expect(() => sg(1.010).isGreaterThan(new Brix(2.4))).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(sg(1.010).isGreaterThan(sg(1.009))).toBe(true);
      expect(sg(1.010).isGreaterThan(sg(1.010))).toBe(false);
      expect(sg(1.010).isGreaterThan(sg(1.011))).toBe(false);
    });
  });

  describe('.isLessThan(specificGravity)', () => {
    it('throws a TypeError if a specificGravity is not an instance of SpecificGravity', () => {
      expect(() => sg(20).isLessThan(15)).toThrowError(TypeError);
    });

    it('throws a TypeError if a specificGravity is an instance of Brix', () => {
      expect(() => sg(1.010).isLessThan(new Brix(2.4))).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(sg(1.010).isLessThan(sg(1.009))).toBe(false);
      expect(sg(1.010).isLessThan(sg(1.010))).toBe(false);
      expect(sg(1.010).isLessThan(sg(1.011))).toBe(true);
    });
  });
});
