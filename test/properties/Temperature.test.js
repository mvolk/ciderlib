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

import Temperature from '../../src/properties/Temperature';

describe('Temperature', () => {
  const c = value => new Temperature(value, Temperature.CELSIUS);
  const f = value => new Temperature(value, Temperature.FAHRENHEIT);

  describe('.CELSIUS', () => {
    it('has key "celsius"', () => {
      expect(Temperature.CELSIUS.key).toEqual('celsius');
    });

    it('has name "Celsius"', () => {
      expect(Temperature.CELSIUS.name).toEqual('Celsius');
    });

    it('has label "°C"', () => {
      expect(Temperature.CELSIUS.label).toEqual('°C');
    });
  });

  describe('.FAHRENHEIT', () => {
    it('has key "fahrenheit"', () => {
      expect(Temperature.FAHRENHEIT.key).toEqual('fahrenheit');
    });

    it('has name "Fahrenheit"', () => {
      expect(Temperature.FAHRENHEIT.name).toEqual('Fahrenheit');
    });

    it('has label "°F"', () => {
      expect(Temperature.FAHRENHEIT.label).toEqual('°F');
    });
  });

  describe('.constructor(magnitude, units)', () => {
    it('throws a TypeError if the magnitude is not a Number', () => {
      expect(() => new Temperature('23.4', Temperature.CELSIUS)).toThrowError(TypeError);
      expect(() => new Temperature({}, Temperature.CELSIUS)).toThrowError(TypeError);
      expect(() => new Temperature([], Temperature.CELSIUS)).toThrowError(TypeError);
      expect(() => new Temperature(() => {}, Temperature.CELSIUS)).toThrowError(TypeError);
    });

    it('throws a TypeError if the magnitude is Number.NaN', () => {
      expect(() => new Temperature(Number.NaN, Temperature.CELSIUS)).toThrowError(TypeError);
    });

    it('throws a RangeError if the magnitude is infinite', () => {
      expect(() =>
        new Temperature(Number.POSITIVE_INFINITY, Temperature.CELSIUS)).toThrowError(RangeError);
      expect(() =>
        new Temperature(Number.NEGATIVE_INFINITY, Temperature.CELSIUS)).toThrowError(RangeError);
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
        expect(() => c(0).inUnits(KELVIN)).toThrowError(TypeError);
      });
    });

    describe('for an invalid unit of measurement', () => {
      it('throws a TypeError if a conversion function is not available', () => {
        expect(() => c(0).inUnits({})).toThrowError(TypeError);
      });
    });

    it('correctly converts celsius to celsius', () => {
      expect(c(0).inUnits(Temperature.CELSIUS)).toEqual(0);
      expect(c(15).inUnits(Temperature.CELSIUS)).toEqual(15);
      expect(c(20).inUnits(Temperature.CELSIUS)).toEqual(20);
      expect(c(100).inUnits(Temperature.CELSIUS)).toEqual(100);
    });

    it('correctly converts celsius to fahrenheit', () => {
      expect(c(0).inUnits(Temperature.FAHRENHEIT)).toEqual(32);
      expect(c(15).inUnits(Temperature.FAHRENHEIT)).toEqual(59);
      expect(c(20).inUnits(Temperature.FAHRENHEIT)).toEqual(68);
      expect(c(100).inUnits(Temperature.FAHRENHEIT)).toEqual(212);
    });

    it('correctly converts fahrenheit to celsius', () => {
      expect(f(32).inUnits(Temperature.CELSIUS)).toEqual(0);
      expect(f(59).inUnits(Temperature.CELSIUS)).toEqual(15);
      expect(f(68).inUnits(Temperature.CELSIUS)).toEqual(20);
      expect(f(212).inUnits(Temperature.CELSIUS)).toEqual(100);
    });

    it('correctly converts fahrenheit to fahrenheit', () => {
      expect(f(32).inUnits(Temperature.FAHRENHEIT)).toEqual(32);
      expect(f(59).inUnits(Temperature.FAHRENHEIT)).toEqual(59);
      expect(f(68).inUnits(Temperature.FAHRENHEIT)).toEqual(68);
      expect(f(212).inUnits(Temperature.FAHRENHEIT)).toEqual(212);
    });
  });

  describe('.isGreaterThan(temperature)', () => {
    it('throws a TypeError if a temperature is not an instance of Temperature', () => {
      expect(() => c(20).isGreaterThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(c(20).isGreaterThan(c(15))).toBe(true);
      expect(c(15).isGreaterThan(c(20))).toBe(false);
      expect(f(20).isGreaterThan(f(15))).toBe(true);
      expect(f(15).isGreaterThan(f(20))).toBe(false);
      expect(f(15).isGreaterThan(f(15))).toBe(false);
    });

    it('is accurate for comparisons across the disparate units', () => {
      expect(c(20).isGreaterThan(f(67))).toBe(true);
      expect(f(69).isGreaterThan(f(20))).toBe(true);
      expect(f(67).isGreaterThan(c(20))).toBe(false);
      expect(c(20).isGreaterThan(f(69))).toBe(false);
      expect(c(20).isGreaterThan(f(68))).toBe(false);
    });
  });

  describe('.isLessThan(temperature)', () => {
    it('throws a TypeError if a temperature is not an instance of Temperature', () => {
      expect(() => c(20).isLessThan(15)).toThrowError(TypeError);
    });

    it('is accurate for comparisons across the same units', () => {
      expect(c(20).isLessThan(c(15))).toBe(false);
      expect(c(15).isLessThan(c(20))).toBe(true);
      expect(f(20).isLessThan(f(15))).toBe(false);
      expect(f(15).isLessThan(f(20))).toBe(true);
      expect(f(32).isLessThan(f(32))).toBe(false);
    });

    it('is accurate for comparisons across the disparate units', () => {
      expect(c(20).isLessThan(f(67))).toBe(false);
      expect(f(69).isLessThan(f(20))).toBe(false);
      expect(f(67).isLessThan(c(20))).toBe(true);
      expect(c(20).isLessThan(f(69))).toBe(true);
      expect(c(20).isLessThan(f(68))).toBe(false);
    });
  });
});
