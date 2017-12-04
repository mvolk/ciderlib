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

import Mass from '../../src/properties/Mass';
import Volume from '../../src/properties/Volume';
import VolumicMass from '../../src/properties/VolumicMass';

describe('VolumicMass', () => {
  const g = value => new Mass(value, Mass.GRAMS);
  const kg = value => new Mass(value, Mass.KILOGRAMS);
  const l = value => new Volume(value, Volume.LITERS);
  const gpl = value => new VolumicMass(g(value), l(1));
  const kgpl = value => new VolumicMass(kg(value), l(1));

  describe('.constructor(mass, volume)', () => {
    it('throws a TypeError if the mass is not an instance of Mass', () => {
      expect(() => new VolumicMass(14, l(1))).toThrowError(TypeError);
    });

    it('throws a TypeError if the volume is not an instance of Volume', () => {
      expect(() => new VolumicMass(g(14), 1)).toThrowError(TypeError);
    });

    it('throws a RangeError if the magnitude of the volume is zero', () => {
      expect(() => new VolumicMass(g(1), l(0))).toThrowError(RangeError);
    });
  });

  describe('.inUnits(massUnits, volumeUnits)', () => {
    describe('for an unsupported unit of measurement', () => {
      const DECIGRAMS = {
        key: 'decigrams',
        label: 'dg',
        name: 'Decigrams',
      };

      it('throws a TypeError if a conversion function is not available', () => {
        expect(() => gpl(1).inUnits(DECIGRAMS, Volume.LITERS)).toThrowError(TypeError);
        expect(() => gpl(1).inUnits(Mass.GRAMS, DECIGRAMS)).toThrowError(TypeError);
      });
    });

    describe('for invalid units of measurement', () => {
      it('throws a TypeError', () => {
        expect(() => gpl(1).inUnits({}, Volume.LITERS)).toThrowError(TypeError);
        expect(() => gpl(1).inUnits(Mass.GRAMS, {})).toThrowError(TypeError);
      });
    });

    it('correctly converts when there is no change in units', () => {
      expect(gpl(2.82491481237).inUnits(Mass.GRAMS, Volume.LITERS)).toEqual(2.82491481237);
    });

    it('correctly converts when there is a change in units', () => {
      expect(gpl(1000).inUnits(Mass.KILOGRAMS, Volume.LITERS)).toEqual(1);
      expect(gpl(1000).inUnits(Mass.GRAMS, Volume.MILLILITERS)).toEqual(1);
      expect(gpl(1000).inUnits(Mass.KILOGRAMS, Volume.MILLILITERS)).toEqual(0.001);
    });
  });

  describe('.isGreaterThan(volumicMass)', () => {
    it('throws a TypeError if the volumicMass is not an instance of VolumicMass', () => {
      expect(() => gpl(20).isGreaterThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(gpl(15).isGreaterThan(gpl(10))).toBe(true);
      expect(gpl(15).isGreaterThan(gpl(15))).toBe(false);
      expect(gpl(15).isGreaterThan(gpl(20))).toBe(false);
    });

    it('is accurate for comparisons across the disparate units', () => {
      expect(gpl(1000).isGreaterThan(kgpl(0.99))).toBe(true);
      expect(gpl(1000).isGreaterThan(kgpl(1))).toBe(false);
      expect(gpl(1000).isGreaterThan(kgpl(1.01))).toBe(false);
    });
  });

  describe('.isLessThan(volume)', () => {
    it('throws a TypeError if the volumicMass is not an instance of VolumicMass', () => {
      expect(() => gpl(20).isLessThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(gpl(15).isLessThan(gpl(10))).toBe(false);
      expect(gpl(15).isLessThan(gpl(15))).toBe(false);
      expect(gpl(15).isLessThan(gpl(20))).toBe(true);
    });

    it('is accurate for comparisons across the disparate units', () => {
      expect(gpl(1000).isLessThan(kgpl(0.99))).toBe(false);
      expect(gpl(1000).isLessThan(kgpl(1))).toBe(false);
      expect(gpl(1000).isLessThan(kgpl(1.01))).toBe(true);
    });
  });
});
