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

import units, { CELSIUS, FAHRENHEIT } from '../../src/units';
import {
  CELSIUS as temperatureCELSIUS,
  FAHRENHEIT as temperatureFAHRENHEIT,
} from '../../src/units/temperature';

describe('units', () => {
  describe('CELSIUS.key', () => {
    it('maps to CELSIUS', () => {
      expect(units[CELSIUS.key]).toBe(CELSIUS);
    });
  });

  describe('FAHRENHEIT.key', () => {
    it('maps to FAHRENHEIT', () => {
      expect(units[FAHRENHEIT.key]).toBe(FAHRENHEIT);
    });
  });

  describe('convert(valueOrObject, units)', () => {
    const KELVIN = {
      key: 'kelvin',
      label: '°K',
      name: 'Kelvin',
    };

    describe('when passed an object', () => {
      it('throws a TypeError if valueOrObject.value is not a number', () => {
        expect(() => units.convert({ value: '20', units: CELSIUS })).toThrowError(TypeError);
        expect(() => units.convert({ value: {}, units: CELSIUS })).toThrowError(TypeError);
        expect(() => units.convert({ value: [], units: CELSIUS })).toThrowError(TypeError);
        expect(() => units.convert({ value: () => {}, units: CELSIUS })).toThrowError(TypeError);
      });

      it('throws a RangeError if the units are not supported', () => {
        expect(() => units.convert({ value: 273, units: KELVIN })).toThrowError(RangeError);
      });

      it('ignores the units parameter', () => {
        expect(() => units.convert({ value: 273, units: KELVIN }, CELSIUS))
          .toThrowError(RangeError);
      });
    });

    describe('when passed a value and units', () => {
      it('throws a TypeError if the value is not a number', () => {
        expect(() => units.convert('20', CELSIUS)).toThrowError(TypeError);
        expect(() => units.convert({}, CELSIUS)).toThrowError(TypeError);
        expect(() => units.convert([], CELSIUS)).toThrowError(TypeError);
        expect(() => units.convert(() => {}, CELSIUS)).toThrowError(TypeError);
      });

      it('throws a RangeError if the units are not supported', () => {
        expect(() => units.convert(273, KELVIN)).toThrowError(RangeError);
      });
    });

    describe('in(newUnits)', () => {
      it('throws a RangeError if newUnits are not supported', () => {
        expect(() => units.convert(0, CELSIUS).to(KELVIN)).toThrowError(RangeError);
      });

      it('correctly converts celsius to celsius', () => {
        expect(units.convert(0, CELSIUS).to(CELSIUS)).toEqual(0);
        expect(units.convert(15, CELSIUS).to(CELSIUS)).toEqual(15);
        expect(units.convert(20, CELSIUS).to(CELSIUS)).toEqual(20);
        expect(units.convert(100, CELSIUS).to(CELSIUS)).toEqual(100);
        expect(units.convert({ value: 0, units: CELSIUS }).to(CELSIUS)).toEqual(0);
        expect(units.convert({ value: 15, units: CELSIUS }).to(CELSIUS)).toEqual(15);
        expect(units.convert({ value: 20, units: CELSIUS }).to(CELSIUS)).toEqual(20);
        expect(units.convert({ value: 100, units: CELSIUS }).to(CELSIUS)).toEqual(100);
      });

      it('correctly converts celsius to fahrenheit', () => {
        expect(units.convert(0, CELSIUS).to(FAHRENHEIT)).toEqual(32);
        expect(units.convert(15, CELSIUS).to(FAHRENHEIT)).toEqual(59);
        expect(units.convert(20, CELSIUS).to(FAHRENHEIT)).toEqual(68);
        expect(units.convert(100, CELSIUS).to(FAHRENHEIT)).toEqual(212);
        expect(units.convert({ value: 0, units: CELSIUS }).to(FAHRENHEIT)).toEqual(32);
        expect(units.convert({ value: 15, units: CELSIUS }).to(FAHRENHEIT)).toEqual(59);
        expect(units.convert({ value: 20, units: CELSIUS }).to(FAHRENHEIT)).toEqual(68);
        expect(units.convert({ value: 100, units: CELSIUS }).to(FAHRENHEIT)).toEqual(212);
      });

      it('correctly converts fahrenheit to celsius', () => {
        expect(units.convert(32, FAHRENHEIT).to(CELSIUS)).toEqual(0);
        expect(units.convert(59, FAHRENHEIT).to(CELSIUS)).toEqual(15);
        expect(units.convert(68, FAHRENHEIT).to(CELSIUS)).toEqual(20);
        expect(units.convert(212, FAHRENHEIT).to(CELSIUS)).toEqual(100);
        expect(units.convert({ value: 32, units: FAHRENHEIT }).to(CELSIUS)).toEqual(0);
        expect(units.convert({ value: 59, units: FAHRENHEIT }).to(CELSIUS)).toEqual(15);
        expect(units.convert({ value: 68, units: FAHRENHEIT }).to(CELSIUS)).toEqual(20);
        expect(units.convert({ value: 212, units: FAHRENHEIT }).to(CELSIUS)).toEqual(100);
      });

      it('correctly converts fahrenheit to fahrenheit', () => {
        expect(units.convert(32, FAHRENHEIT).to(FAHRENHEIT)).toEqual(32);
        expect(units.convert(59, FAHRENHEIT).to(FAHRENHEIT)).toEqual(59);
        expect(units.convert(68, FAHRENHEIT).to(FAHRENHEIT)).toEqual(68);
        expect(units.convert(212, FAHRENHEIT).to(FAHRENHEIT)).toEqual(212);
        expect(units.convert({ value: 32, units: FAHRENHEIT }).to(FAHRENHEIT)).toEqual(32);
        expect(units.convert({ value: 59, units: FAHRENHEIT }).to(FAHRENHEIT)).toEqual(59);
        expect(units.convert({ value: 68, units: FAHRENHEIT }).to(FAHRENHEIT)).toEqual(68);
        expect(units.convert({ value: 212, units: FAHRENHEIT }).to(FAHRENHEIT)).toEqual(212);
      });
    });
  });
});

describe('CELSIUS', () => {
  it('is equivalent to temperature.CELSIUS', () => {
    expect(CELSIUS).toBe(temperatureCELSIUS);
  });
});

describe('FAHRENHEIT', () => {
  it('is equivalent to temperature.FAHRENHEIT', () => {
    expect(FAHRENHEIT).toBe(temperatureFAHRENHEIT);
  });
});
