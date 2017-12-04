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

describe('Mass', () => {
  const kg = value => new Mass(value, Mass.KILOGRAMS);
  const g = value => new Mass(value, Mass.GRAMS);
  const lb = value => new Mass(value, Mass.POUNDS);
  const oz = value => new Mass(value, Mass.OUNCES);

  describe('.KILOGRAMS', () => {
    it('has key "kilograms"', () => {
      expect(Mass.KILOGRAMS.key).toEqual('kilograms');
    });

    it('has name "Kilograms"', () => {
      expect(Mass.KILOGRAMS.name).toEqual('Kilograms');
    });

    it('has label "kg"', () => {
      expect(Mass.KILOGRAMS.label).toEqual('kg');
    });
  });

  describe('.GRAMS', () => {
    it('has key "grams"', () => {
      expect(Mass.GRAMS.key).toEqual('grams');
    });

    it('has name "Grams"', () => {
      expect(Mass.GRAMS.name).toEqual('Grams');
    });

    it('has label "g"', () => {
      expect(Mass.GRAMS.label).toEqual('g');
    });
  });

  describe('.POUNDS', () => {
    it('has key "pounds"', () => {
      expect(Mass.POUNDS.key).toEqual('pounds');
    });

    it('has name "Pounds"', () => {
      expect(Mass.POUNDS.name).toEqual('Pounds');
    });

    it('has label "lb"', () => {
      expect(Mass.POUNDS.label).toEqual('lb');
    });
  });

  describe('.OUNCES', () => {
    it('has key "ounces"', () => {
      expect(Mass.OUNCES.key).toEqual('ounces');
    });

    it('has name "Ounces"', () => {
      expect(Mass.OUNCES.name).toEqual('Ounces');
    });

    it('has label "oz"', () => {
      expect(Mass.OUNCES.label).toEqual('oz');
    });
  });

  describe('.constructor(magnitude, units)', () => {
    it('throws a TypeError if the magnitude is not a Number', () => {
      expect(() => new Mass('23.4', Mass.GRAMS)).toThrowError(TypeError);
      expect(() => new Mass({}, Mass.GRAMS)).toThrowError(TypeError);
      expect(() => new Mass([], Mass.GRAMS)).toThrowError(TypeError);
      expect(() => new Mass(() => {}, Mass.GRAMS)).toThrowError(TypeError);
    });

    it('throws a TypeError if the magnitude is Number.NaN', () => {
      expect(() => new Mass(Number.NaN, Mass.GRAMS)).toThrowError(TypeError);
    });

    it('throws a RangeError if the magnitude is infinite', () => {
      expect(() => new Mass(Number.POSITIVE_INFINITY, Mass.GRAMS), Mass.CELSIUS)
        .toThrowError(RangeError);
      expect(() => new Mass(Number.NEGATIVE_INFINITY, Mass.GRAMS), Mass.CELSIUS)
        .toThrowError(RangeError);
    });

    it('throws a RangeError if the magnitude is less than zero', () => {
      expect(() => new Mass(-0.001, Mass.GRAMS)).toThrowError(RangeError);
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
        expect(() => kg(0).inUnits(DECIGRAMS)).toThrowError(TypeError);
      });
    });

    describe('for an invalid unit of measurement', () => {
      it('throws a TypeError if a conversion function is not available', () => {
        expect(() => kg(0).inUnits({})).toThrowError(TypeError);
      });
    });

    it('correctly converts kilograms to kilograms', () => {
      expect(kg(1).inUnits(Mass.KILOGRAMS)).toEqual(1);
    });

    it('correctly converts kilograms to grams', () => {
      expect(kg(1).inUnits(Mass.GRAMS)).toEqual(1000);
    });

    it('correctly converts kilograms to pounds', () => {
      expect(kg(0.45359237).inUnits(Mass.POUNDS)).toEqual(1);
    });

    it('correctly converts kilograms to ounces', () => {
      expect(kg(0.028349523125).inUnits(Mass.OUNCES)).toEqual(1);
    });

    it('correctly converts grams to kilograms', () => {
      expect(g(1000).inUnits(Mass.KILOGRAMS)).toEqual(1);
    });

    it('correctly converts grams to grams', () => {
      expect(g(1).inUnits(Mass.GRAMS)).toEqual(1);
    });

    it('correctly converts grams to pounds', () => {
      expect(g(453.59237).inUnits(Mass.POUNDS)).toEqual(1);
    });

    it('correctly converts grams to ounces', () => {
      expect(g(28.349523125).inUnits(Mass.OUNCES)).toEqual(1);
    });

    it('correctly converts pounds to kilograms', () => {
      expect(lb(1).inUnits(Mass.KILOGRAMS)).toEqual(0.45359237);
    });

    it('correctly converts pounds to grams', () => {
      expect(lb(1).inUnits(Mass.GRAMS)).toEqual(453.59237);
    });

    it('correctly converts pounds to pounds', () => {
      expect(lb(1).inUnits(Mass.POUNDS)).toEqual(1);
    });

    it('correctly converts pounds to ounces', () => {
      expect(lb(1).inUnits(Mass.OUNCES)).toEqual(16);
    });

    it('correctly converts ounces to kilograms', () => {
      expect(oz(1).inUnits(Mass.KILOGRAMS)).toEqual(0.028349523125);
    });

    it('correctly converts ounces to grams', () => {
      expect(oz(1).inUnits(Mass.GRAMS)).toEqual(28.349523125);
    });

    it('correctly converts ounces to pounds', () => {
      expect(oz(16).inUnits(Mass.POUNDS)).toEqual(1);
    });

    it('correctly converts ounces to ounces', () => {
      expect(oz(1).inUnits(Mass.OUNCES)).toEqual(1);
    });
  });

  describe('.isGreaterThan(mass)', () => {
    it('throws a TypeError if a mass is not an instance of Mass', () => {
      expect(() => g(20).isGreaterThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(g(15).isGreaterThan(g(10))).toBe(true);
      expect(g(15).isGreaterThan(g(15))).toBe(false);
      expect(g(15).isGreaterThan(g(20))).toBe(false);
      expect(kg(15).isGreaterThan(kg(10))).toBe(true);
      expect(kg(15).isGreaterThan(kg(15))).toBe(false);
      expect(kg(15).isGreaterThan(kg(20))).toBe(false);
      expect(lb(15).isGreaterThan(lb(10))).toBe(true);
      expect(lb(15).isGreaterThan(lb(15))).toBe(false);
      expect(lb(15).isGreaterThan(lb(20))).toBe(false);
      expect(oz(15).isGreaterThan(oz(10))).toBe(true);
      expect(oz(15).isGreaterThan(oz(15))).toBe(false);
      expect(oz(15).isGreaterThan(oz(20))).toBe(false);
    });

    it('is accurate for comparisons across the disparate units', () => {
      expect(lb(1).isGreaterThan(kg(0.4))).toBe(true);
      expect(lb(1).isGreaterThan(kg(0.45359237))).toBe(false);
      expect(lb(1).isGreaterThan(kg(0.5))).toBe(false);
    });
  });

  describe('.isLessThan(mass)', () => {
    it('throws a TypeError if a mass is not an instance of Mass', () => {
      expect(() => kg(20).isLessThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(g(15).isLessThan(g(10))).toBe(false);
      expect(g(15).isLessThan(g(15))).toBe(false);
      expect(g(15).isLessThan(g(20))).toBe(true);
      expect(kg(15).isLessThan(kg(10))).toBe(false);
      expect(kg(15).isLessThan(kg(15))).toBe(false);
      expect(kg(15).isLessThan(kg(20))).toBe(true);
      expect(lb(15).isLessThan(lb(10))).toBe(false);
      expect(lb(15).isLessThan(lb(15))).toBe(false);
      expect(lb(15).isLessThan(lb(20))).toBe(true);
      expect(oz(15).isLessThan(oz(10))).toBe(false);
      expect(oz(15).isLessThan(oz(15))).toBe(false);
      expect(oz(15).isLessThan(oz(20))).toBe(true);
    });

    it('is accurate for comparisons across the disparate units', () => {
      expect(lb(1).isLessThan(kg(0.4))).toBe(false);
      expect(lb(1).isLessThan(kg(0.45359237))).toBe(false);
      expect(lb(1).isLessThan(kg(0.5))).toBe(true);
    });
  });
});
