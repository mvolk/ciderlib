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

import Brix from '../../src/properties/Brix';
import SpecificGravity from '../../src/properties/SpecificGravity';

describe('Brix', () => {
  const bx = value => new Brix(value);

  describe('.UNITS', () => {
    it('has key "sg"', () => {
      expect(Brix.UNITS.key).toEqual('brix');
    });

    it('has name "Specific Gravity"', () => {
      expect(Brix.UNITS.name).toEqual('Brix');
    });

    it('has no label', () => {
      expect(Brix.UNITS.label).toEqual('°Bx');
    });
  });

  describe('constructor', () => {
    it('throws a TypeError if the magnitude is not a number', () => {
      expect(() => new Brix('1.005')).toThrowError(TypeError);
      expect(() => new Brix({})).toThrowError(TypeError);
      expect(() => new Brix([])).toThrowError(TypeError);
      expect(() => new Brix(() => {})).toThrowError(TypeError);
    });

    it('throws a TypeError if the magnitude is Number.NaN', () => {
      expect(() => new Brix(Number.NaN)).toThrowError(TypeError);
    });

    it('throws a RangeError if the magnitude is infinite', () => {
      expect(() => new Brix(Number.NEGATIVE_INFINITY)).toThrowError(RangeError);
      expect(() => new Brix(Number.POSITIVE_INFINITY)).toThrowError(RangeError);
    });

    it('throws a RangeError if the magnitude is negative', () => {
      expect(() => new Brix(-0.100)).toThrowError(RangeError);
    });
  });

  describe('.toSpecificGravity()', () => {
    it('throws a RangeError if converting from Brix greater than 44', () => {
      expect(() => bx(44.000001).toSpecificGravity()).toThrowError(RangeError);
    });

    it('correctly converts degrees Brix to specific gravity', () => {
      const tolerance = 0.0000349;
      const expectWithinTolerance = value => expect(Math.abs(value)).toBeLessThan(tolerance);

      expectWithinTolerance(bx(2.5).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.009765);
      expectWithinTolerance(bx(8.78).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.035);
      expectWithinTolerance(bx(9.99).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.040);
      expectWithinTolerance(bx(10.48).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.042);
      expectWithinTolerance(bx(10.96).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.044);
      expectWithinTolerance(bx(11.19).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.045);
      expectWithinTolerance(bx(11.43).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.046);
      expectWithinTolerance(bx(11.67).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.047);
      expectWithinTolerance(bx(11.91).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.048);
      expectWithinTolerance(bx(12.15).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.049);
      expectWithinTolerance(bx(12.39).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.050);
      expectWithinTolerance(bx(12.62).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.051);
      expectWithinTolerance(bx(12.86).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.052);
      expectWithinTolerance(bx(13.10).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.053);
      expectWithinTolerance(bx(13.33).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.054);
      expectWithinTolerance(bx(13.57).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.055);
      expectWithinTolerance(bx(13.80).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.056);
      expectWithinTolerance(bx(14.04).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.057);
      expectWithinTolerance(bx(14.27).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.058);
      expectWithinTolerance(bx(14.51).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.059);
      expectWithinTolerance(bx(14.74).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.060);
      expectWithinTolerance(bx(14.97).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.061);
      expectWithinTolerance(bx(15.21).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.062);
      expectWithinTolerance(bx(15.44).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.063);
      expectWithinTolerance(bx(15.67).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.064);
      expectWithinTolerance(bx(15.90).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.065);
      expectWithinTolerance(bx(16.13).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.066);
      expectWithinTolerance(bx(16.59).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.068);
      expectWithinTolerance(bx(17.05).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.070);
      expectWithinTolerance(bx(17.51).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.072);
      expectWithinTolerance(bx(18.20).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.075);
      expectWithinTolerance(bx(19.33).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.080);
      expectWithinTolerance(bx(20.46).toSpecificGravity().inUnits(SpecificGravity.UNITS) - 1.085);
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
        expect(() => bx(2.8).inUnits(KELVIN)).toThrowError(TypeError);
      });
    });

    describe('for an invalid unit of measurement', () => {
      it('throws a TypeError if a conversion function is not available', () => {
        expect(() => bx(2.8).inUnits({})).toThrowError(TypeError);
      });
    });

    describe('for Brix.UNITS', () => {
      it('throws a RangeError if converting from Brix greater than 44', () => {
        expect(() => bx(44.000001).toSpecificGravity()).toThrowError(RangeError);
      });

      it('correctly converts degrees Brix to specific gravity', () => {
        const tolerance = 0.0000349;
        const expectWithinTolerance = value => expect(Math.abs(value)).toBeLessThan(tolerance);

        expectWithinTolerance(bx(2.50).inUnits(SpecificGravity.UNITS) - 1.009765);
        expectWithinTolerance(bx(8.78).inUnits(SpecificGravity.UNITS) - 1.035);
        expectWithinTolerance(bx(9.99).inUnits(SpecificGravity.UNITS) - 1.040);
        expectWithinTolerance(bx(10.48).inUnits(SpecificGravity.UNITS) - 1.042);
        expectWithinTolerance(bx(10.96).inUnits(SpecificGravity.UNITS) - 1.044);
        expectWithinTolerance(bx(11.19).inUnits(SpecificGravity.UNITS) - 1.045);
        expectWithinTolerance(bx(11.43).inUnits(SpecificGravity.UNITS) - 1.046);
        expectWithinTolerance(bx(11.67).inUnits(SpecificGravity.UNITS) - 1.047);
        expectWithinTolerance(bx(11.91).inUnits(SpecificGravity.UNITS) - 1.048);
        expectWithinTolerance(bx(12.15).inUnits(SpecificGravity.UNITS) - 1.049);
        expectWithinTolerance(bx(12.39).inUnits(SpecificGravity.UNITS) - 1.050);
        expectWithinTolerance(bx(12.62).inUnits(SpecificGravity.UNITS) - 1.051);
        expectWithinTolerance(bx(12.86).inUnits(SpecificGravity.UNITS) - 1.052);
        expectWithinTolerance(bx(13.10).inUnits(SpecificGravity.UNITS) - 1.053);
        expectWithinTolerance(bx(13.33).inUnits(SpecificGravity.UNITS) - 1.054);
        expectWithinTolerance(bx(13.57).inUnits(SpecificGravity.UNITS) - 1.055);
        expectWithinTolerance(bx(13.80).inUnits(SpecificGravity.UNITS) - 1.056);
        expectWithinTolerance(bx(14.04).inUnits(SpecificGravity.UNITS) - 1.057);
        expectWithinTolerance(bx(14.27).inUnits(SpecificGravity.UNITS) - 1.058);
        expectWithinTolerance(bx(14.51).inUnits(SpecificGravity.UNITS) - 1.059);
        expectWithinTolerance(bx(14.74).inUnits(SpecificGravity.UNITS) - 1.060);
        expectWithinTolerance(bx(14.97).inUnits(SpecificGravity.UNITS) - 1.061);
        expectWithinTolerance(bx(15.21).inUnits(SpecificGravity.UNITS) - 1.062);
        expectWithinTolerance(bx(15.44).inUnits(SpecificGravity.UNITS) - 1.063);
        expectWithinTolerance(bx(15.67).inUnits(SpecificGravity.UNITS) - 1.064);
        expectWithinTolerance(bx(15.90).inUnits(SpecificGravity.UNITS) - 1.065);
        expectWithinTolerance(bx(16.13).inUnits(SpecificGravity.UNITS) - 1.066);
        expectWithinTolerance(bx(16.59).inUnits(SpecificGravity.UNITS) - 1.068);
        expectWithinTolerance(bx(17.05).inUnits(SpecificGravity.UNITS) - 1.070);
        expectWithinTolerance(bx(17.51).inUnits(SpecificGravity.UNITS) - 1.072);
        expectWithinTolerance(bx(18.20).inUnits(SpecificGravity.UNITS) - 1.075);
        expectWithinTolerance(bx(19.33).inUnits(SpecificGravity.UNITS) - 1.080);
        expectWithinTolerance(bx(20.46).inUnits(SpecificGravity.UNITS) - 1.085);
      });
    });

    it('correctly converts Brix to Brix', () => {
      expect(bx(2.5).inUnits(Brix.UNITS)).toEqual(2.5);
    });
  });

  describe('.isGreaterThan(brix)', () => {
    it('throws a TypeError if a brix is not an instance of Brix', () => {
      expect(() => bx(2.5).isGreaterThan(1.005)).toThrowError(TypeError);
    });

    it('throws a TypeError if a brix is an instance of SpecificGravity', () => {
      expect(() => bx(2.5).isGreaterThan(new SpecificGravity(1.010))).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(bx(2.5).isGreaterThan(bx(2.4))).toBe(true);
      expect(bx(2.5).isGreaterThan(bx(2.5))).toBe(false);
      expect(bx(2.5).isGreaterThan(bx(2.6))).toBe(false);
    });
  });

  describe('.isLessThan(brix)', () => {
    it('throws a TypeError if a brix is not an instance of Brix', () => {
      expect(() => bx(2.5).isLessThan(15)).toThrowError(TypeError);
    });

    it('throws a TypeError if a brix is an instance of SpecificGravity', () => {
      expect(() => bx(2.5).isLessThan(new SpecificGravity(1.010))).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(bx(2.5).isLessThan(bx(2.4))).toBe(false);
      expect(bx(2.5).isLessThan(bx(2.5))).toBe(false);
      expect(bx(2.5).isLessThan(bx(2.6))).toBe(true);
    });
  });
});
