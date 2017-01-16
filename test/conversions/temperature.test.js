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

import temperature, {
  FAHRENHEIT,
  CELSIUS,
  supportedUnits,
} from '../../src/conversions/temperature';

describe('temperature', () => {
  describe('CELSIUS', () => {
    expect(CELSIUS.key).toEqual('celsius');
    expect(CELSIUS.label).toEqual('°C');
    expect(CELSIUS.name).toEqual('Celsius');
  });

  describe('FAHRENHEIT', () => {
    expect(FAHRENHEIT.key).toEqual('fahrenheit');
    expect(FAHRENHEIT.label).toEqual('°F');
    expect(FAHRENHEIT.name).toEqual('Fahrenheit');
  });

  describe('supportedUnits', () => {
    expect(supportedUnits.length).toEqual(2);
    expect(supportedUnits).toContain(CELSIUS);
    expect(supportedUnits).toContain(FAHRENHEIT);
  });

  describe('(value, units)', () => {
    it('throws a TypeError if the value is not a number', () => {
      expect(() => temperature('20', CELSIUS)).toThrowError(TypeError);
      expect(() => temperature({}, CELSIUS)).toThrowError(TypeError);
      expect(() => temperature([], CELSIUS)).toThrowError(TypeError);
      expect(() => temperature(() => {}, CELSIUS)).toThrowError(TypeError);
      expect(() => temperature(Number.NaN, CELSIUS)).toThrowError(TypeError);
    });

    it('throws a RangeError if the value is not finite', () => {
      expect(() => temperature(Number.POSITIVE_INFINITY, CELSIUS))
        .toThrowError(RangeError);
      expect(() => temperature(Number.NEGATIVE_INFINITY, CELSIUS))
        .toThrowError(RangeError);
    });

    it('throws a RangeError if the units are not supported', () => {
      const KELVIN = {
        key: 'kelvin',
        label: '°K',
        name: 'Kelvin',
      };

      expect(() => temperature(273, KELVIN)).toThrowError(RangeError);
    });

    describe('in(newUnits)', () => {
      it('throws a RangeError if newUnits are not supported', () => {
        const KELVIN = {
          key: 'kelvin',
          label: '°K',
          name: 'Kelvin',
        };

        expect(() => temperature(0, CELSIUS).in(KELVIN)).toThrowError(RangeError);
      });

      it('correctly converts celsius to celsius', () => {
        expect(temperature(0, CELSIUS).in(CELSIUS)).toEqual(0);
        expect(temperature(15, CELSIUS).in(CELSIUS)).toEqual(15);
        expect(temperature(20, CELSIUS).in(CELSIUS)).toEqual(20);
        expect(temperature(100, CELSIUS).in(CELSIUS)).toEqual(100);
      });

      it('correctly converts celsius to fahrenheit', () => {
        expect(temperature(0, CELSIUS).in(FAHRENHEIT)).toEqual(32);
        expect(temperature(15, CELSIUS).in(FAHRENHEIT)).toEqual(59);
        expect(temperature(20, CELSIUS).in(FAHRENHEIT)).toEqual(68);
        expect(temperature(100, CELSIUS).in(FAHRENHEIT)).toEqual(212);
      });

      it('correctly converts fahrenheit to celsius', () => {
        expect(temperature(32, FAHRENHEIT).in(CELSIUS)).toEqual(0);
        expect(temperature(59, FAHRENHEIT).in(CELSIUS)).toEqual(15);
        expect(temperature(68, FAHRENHEIT).in(CELSIUS)).toEqual(20);
        expect(temperature(212, FAHRENHEIT).in(CELSIUS)).toEqual(100);
      });

      it('correctly converts fahrenheit to fahrenheit', () => {
        expect(temperature(32, FAHRENHEIT).in(FAHRENHEIT)).toEqual(32);
        expect(temperature(59, FAHRENHEIT).in(FAHRENHEIT)).toEqual(59);
        expect(temperature(68, FAHRENHEIT).in(FAHRENHEIT)).toEqual(68);
        expect(temperature(212, FAHRENHEIT).in(FAHRENHEIT)).toEqual(212);
      });
    });
  });
});
