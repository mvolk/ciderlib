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

import temperature, { FAHRENHEIT, CELSIUS } from '../../src/conversions/temperature';
import Hydrometer from '../../src/instruments/Hydrometer';

describe('Hydrometer', () => {
  describe('constructor(calibrationTemperature)', () => {
    it('throws a TypeError if the calibrationTemperature is not a number', () => {
      expect(() => new Hydrometer('23.4')).toThrowError(TypeError);
      expect(() => new Hydrometer({})).toThrowError(TypeError);
      expect(() => new Hydrometer([])).toThrowError(TypeError);
      expect(() => new Hydrometer(() => {})).toThrowError(TypeError);
      expect(() => new Hydrometer(Number.NaN)).toThrowError(TypeError);
    });

    it('throws a RangeError if the calibrationTemperature is not finite', () => {
      expect(() => new Hydrometer(Number.POSITIVE_INFINITY)).toThrowError(RangeError);
      expect(() => new Hydrometer(Number.NEGATIVE_INFINITY)).toThrowError(RangeError);
    });

    it('throws a RangeError if the calibrationTemperature is below freezing', () => {
      expect(() => new Hydrometer(-0.01)).toThrowError(RangeError);
    });

    it('throws a RangeError if the calibrationTemperature is above boiling', () => {
      expect(() => new Hydrometer(100.01)).toThrowError(RangeError);
    });
  });

  describe('correctedReading(reading, temperature)', () => {
    const hydrometer20C = new Hydrometer(20);
    const tolerance = 0.0001;

    it('throws a TypeError if the reading is not a number', () => {
      expect(() => hydrometer20C.correctedReading('1.000', 30)).toThrowError(TypeError);
      expect(() => hydrometer20C.correctedReading({}, 30)).toThrowError(TypeError);
      expect(() => hydrometer20C.correctedReading([], 30)).toThrowError(TypeError);
      expect(() => hydrometer20C.correctedReading(() => {}, 30)).toThrowError(TypeError);
      expect(() => hydrometer20C.correctedReading(Number.NaN, 30)).toThrowError(TypeError);
    });

    it('throws a RangeError if the reading is not finite', () => {
      expect(() => hydrometer20C.correctedReading(Number.POSITIVE_INFINITY, 30))
        .toThrowError(RangeError);
      expect(() => hydrometer20C.correctedReading(Number.NEGATIVE_INFINITY, 30))
        .toThrowError(RangeError);
    });

    it('throws a RangeError if the reading is 0', () => {
      expect(() => hydrometer20C.correctedReading(0, 30)).toThrowError(RangeError);
    });

    it('throws a RangeError if the reading is negative', () => {
      expect(() => hydrometer20C.correctedReading(-0.100, 30)).toThrowError(RangeError);
    });

    it('throws a TypeError if the temperature is not a number', () => {
      expect(() => hydrometer20C.correctedReading(1.000, '23.4')).toThrowError(TypeError);
      expect(() => hydrometer20C.correctedReading(1.000, {})).toThrowError(TypeError);
      expect(() => hydrometer20C.correctedReading(1.000, [])).toThrowError(TypeError);
      expect(() => hydrometer20C.correctedReading(1.000, () => {})).toThrowError(TypeError);
      expect(() => hydrometer20C.correctedReading(1.000, Number.NaN)).toThrowError(TypeError);
    });

    it('throws a RangeError if the temperature is not finite', () => {
      expect(() => hydrometer20C.correctedReading(1.000, Number.POSITIVE_INFINITY))
        .toThrowError(RangeError);
      expect(() => hydrometer20C.correctedReading(1.000, Number.NEGATIVE_INFINITY))
        .toThrowError(RangeError);
    });

    it('throws a RangeError if the temperature is below freezing', () => {
      expect(() => hydrometer20C.correctedReading(1.000, -0.01)).toThrowError(RangeError);
    });

    it('throws a RangeError if the temperature is above boiling', () => {
      expect(() => hydrometer20C.correctedReading(1.000, 100.01)).toThrowError(RangeError);
    });

    describe('with a hydrometer calibrated at 60F', () => {
      const hydrometer60F = new Hydrometer(temperature(60, FAHRENHEIT).in(CELSIUS));

      it('returns 1.0190 ±0.0001 for a reading of 1.020 at 43°F', () => {
        const atTemperature = temperature(43, FAHRENHEIT).in(CELSIUS);
        const correctedReading = hydrometer60F.correctedReading(1.020, atTemperature);
        expect(Math.abs(1.0190 - correctedReading)).toBeLessThan(tolerance);
      });

      it('returns 1.0193 ±0.0001 for a reading of 1.020 at 50°F', () => {
        const atTemperature = temperature(50, FAHRENHEIT).in(CELSIUS);
        const correctedReading = hydrometer60F.correctedReading(1.020, atTemperature);
        expect(Math.abs(1.0193 - correctedReading)).toBeLessThan(tolerance);
      });

      it('returns 1.020 ±0.0001 for a reading of 1.020 at 60°F', () => {
        const atTemperature = temperature(60, FAHRENHEIT).in(CELSIUS);
        const correctedReading = hydrometer60F.correctedReading(1.020, atTemperature);
        expect(Math.abs(1.020 - correctedReading)).toBeLessThan(tolerance);
      });

      it('returns 1.0205 ±0.0001 for a reading of 1.020 at 65°F', () => {
        const atTemperature = temperature(65, FAHRENHEIT).in(CELSIUS);
        const correctedReading = hydrometer60F.correctedReading(1.020, atTemperature);
        expect(Math.abs(1.0205 - correctedReading)).toBeLessThan(tolerance);
      });

      it('returns 1.021 ±0.0001 for a reading of 1.020 at 70°F', () => {
        const atTemperature = temperature(70, FAHRENHEIT).in(CELSIUS);
        const correctedReading = hydrometer60F.correctedReading(1.020, atTemperature);
        expect(Math.abs(1.021 - correctedReading)).toBeLessThan(tolerance);
      });

      it('returns 1.022 ±0.0001 for a reading of 1.020 at 77°F', () => {
        const atTemperature = temperature(77, FAHRENHEIT).in(CELSIUS);
        const correctedReading = hydrometer60F.correctedReading(1.020, atTemperature);
        expect(Math.abs(1.022 - correctedReading)).toBeLessThan(tolerance);
      });

      it('returns 1.022 ±0.0001 for a reading of 1.020 at 77°F', () => {
        const atTemperature = temperature(77, FAHRENHEIT).in(CELSIUS);
        const correctedReading = hydrometer60F.correctedReading(1.020, atTemperature);
        expect(Math.abs(1.022 - correctedReading)).toBeLessThan(tolerance);
      });

      it('returns 1.023 ±0.0001 for a reading of 1.020 at 84°F', () => {
        const atTemperature = temperature(84, FAHRENHEIT).in(CELSIUS);
        const correctedReading = hydrometer60F.correctedReading(1.020, atTemperature);
        expect(Math.abs(1.023 - correctedReading)).toBeLessThan(tolerance);
      });
    });
  });
});
