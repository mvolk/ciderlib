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

import Hydrometer from '../../src/instruments/Hydrometer';
import Temperature from '../../src/properties/Temperature';
import SpecificGravity from '../../src/properties/SpecificGravity';

describe('Hydrometer', () => {
  const c = value => new Temperature(value, Temperature.CELSIUS);
  const f = value => new Temperature(value, Temperature.FAHRENHEIT);
  const sg = value => new SpecificGravity(value);

  describe('correctedReading(reading, temperature, calibrationTemperature)', () => {
    const tolerance = 0.0001;

    it('throws a TypeError if the reading is not an instance of SpecificGravity', () => {
      expect(() => Hydrometer.correctedReading(1.000, c(50), c(50))).toThrowError(TypeError);
    });

    it('throws a TypeError if the temperature is not an instance of Temperature', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), 50, c(50))).toThrowError(TypeError);
    });

    it('throws a RangeError if the temperature is at freezing', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), c(0), c(60)))
        .toThrowError(RangeError);
    });

    it('throws a RangeError if the temperature is below freezing', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), c(-0.01), c(60)))
        .toThrowError(RangeError);
    });

    it('throws a RangeError if the temperature is at boiling', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), c(100), c(60))).toThrowError(RangeError);
    });

    it('throws a RangeError if the temperature is above boiling', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), c(100.01), c(60)))
        .toThrowError(RangeError);
    });

    it('throws a TypeError if the calibrationTemperature is not an instance of Temperature', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), c(50), 50)).toThrowError(TypeError);
    });

    it('throws a RangeError if the calibrationTemperature is at freezing', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), c(50), c(0))).toThrowError(RangeError);
    });

    it('throws a RangeError if the calibrationTemperature is below freezing', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), c(50), c(-0.01)))
        .toThrowError(RangeError);
    });

    it('throws a RangeError if the calibrationTemperature is at boiling', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), c(50), c(100))).toThrowError(RangeError);
    });

    it('throws a RangeError if the calibrationTemperature is above boiling', () => {
      expect(() => Hydrometer.correctedReading(sg(1.000), c(50), c(100.01)))
        .toThrowError(RangeError);
    });

    describe('with a hydrometer calibrated at 60F', () => {
      it('returns 1.0190 ±0.0001 for a reading of 1.020 at 43°F', () => {
        const correctedReading = Hydrometer.correctedReading(sg(1.020), f(43), f(60));
        expect(Math.abs(1.0190 - correctedReading.magnitude)).toBeLessThan(tolerance);
      });

      it('returns 1.0193 ±0.0001 for a reading of 1.020 at 50°F', () => {
        const correctedReading = Hydrometer.correctedReading(sg(1.020), f(50), f(60));
        expect(Math.abs(1.0193 - correctedReading.magnitude)).toBeLessThan(tolerance);
      });

      it('returns 1.020 ±0.0001 for a reading of 1.020 at 60°F', () => {
        const correctedReading = Hydrometer.correctedReading(sg(1.020), f(60), f(60));
        expect(Math.abs(1.020 - correctedReading.magnitude)).toBeLessThan(tolerance);
      });

      it('returns 1.0205 ±0.0001 for a reading of 1.020 at 65°F', () => {
        const correctedReading = Hydrometer.correctedReading(sg(1.020), f(65), f(60));
        expect(Math.abs(1.0205 - correctedReading.magnitude)).toBeLessThan(tolerance);
      });

      it('returns 1.021 ±0.0001 for a reading of 1.020 at 70°F', () => {
        const correctedReading = Hydrometer.correctedReading(sg(1.020), f(70), f(60));
        expect(Math.abs(1.021 - correctedReading.magnitude)).toBeLessThan(tolerance);
      });

      it('returns 1.022 ±0.0001 for a reading of 1.020 at 77°F', () => {
        const correctedReading = Hydrometer.correctedReading(sg(1.020), f(77), f(60));
        expect(Math.abs(1.022 - correctedReading.magnitude)).toBeLessThan(tolerance);
      });

      it('returns 1.023 ±0.0001 for a reading of 1.020 at 84°F', () => {
        const correctedReading = Hydrometer.correctedReading(sg(1.020), f(84), f(60));
        expect(Math.abs(1.023 - correctedReading.magnitude)).toBeLessThan(tolerance);
      });
    });
  });
});
