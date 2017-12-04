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

import Water from '../../src/substances/Water';
import Mass from '../../src/properties/Mass';
import Volume from '../../src/properties/Volume';
import Temperature from '../../src/properties/Temperature';

describe('Water', () => {
  const c = value => new Temperature(value, Temperature.CELSIUS);
  const f = value => new Temperature(value, Temperature.FAHRENHEIT);
  const inGpL = volumicMass => volumicMass.inUnits(Mass.GRAMS, Volume.LITERS);

  describe('FREEZING_POINT', () => {
    it('is 0 degrees C', () => {
      expect(Water.FREEZING_POINT.inUnits(Temperature.CELSIUS)).toEqual(0);
    });
  });

  describe('BOILING_POINT', () => {
    it('is 100 degrees C', () => {
      expect(Water.BOILING_POINT.inUnits(Temperature.CELSIUS)).toEqual(100);
    });
  });

  describe('density(temperature)', () => {
    const looseTolerance = 0.1;
    const tightTolerance = 0.05;

    it('throws a TypeError if temperature is not an instance of Temperature', () => {
      expect(() => Water.density('foo')).toThrowError(TypeError);
      expect(() => Water.density([1])).toThrowError(TypeError);
      expect(() => Water.density({ temperature: 1 })).toThrowError(TypeError);
    });

    it('throws a RangeError if temperature is freezing', () => {
      expect(() => Water.density(c(0))).toThrowError(RangeError);
    });

    it('throws a RangeError if temperature is below freezing', () => {
      expect(() => Water.density(c(-0.001))).toThrowError(RangeError);
    });

    it('throws a RangeError if temperature is boiling', () => {
      expect(() => Water.density(c(100))).toThrowError(RangeError);
    });

    it('throws a RangeError if temperature is above boiling', () => {
      expect(() => Water.density(c(100.001))).toThrowError(RangeError);
    });

    it('returns 1000.0 g/L ±0.1 at 4°C', () => {
      expect(Math.abs(1000.0 - inGpL(Water.density(c(4))))).toBeLessThan(looseTolerance);
    });

    it('returns 1000.0 g/L ±0.1 at 5°C', () => {
      expect(Math.abs(1000.0 - inGpL(Water.density(c(5))))).toBeLessThan(looseTolerance);
    });

    it('returns 999.7 g/L ±0.05 at 10°C', () => {
      expect(Math.abs(999.7 - inGpL(Water.density(c(10))))).toBeLessThan(tightTolerance);
    });

    it('returns 999.0 g/L ±0.05 at 60°F', () => {
      expect(Math.abs(999.0 - inGpL(Water.density(f(60))))).toBeLessThan(tightTolerance);
    });

    it('returns 998.2 g/L ±0.05 at 20°C', () => {
      expect(Math.abs(998.2 - inGpL(Water.density(c(20))))).toBeLessThan(tightTolerance);
    });

    it('returns 997.0 g/L ±0.1 at 25°C', () => {
      expect(Math.abs(997.0 - inGpL(Water.density(c(25))))).toBeLessThan(looseTolerance);
    });

    it('returns 995.7 g/L ±0.1 at 30°C', () => {
      expect(Math.abs(995.7 - inGpL(Water.density(c(30))))).toBeLessThan(looseTolerance);
    });

    it('returns 994.1 g/L ±0.1 at 35°C', () => {
      expect(Math.abs(994.1 - inGpL(Water.density(c(35))))).toBeLessThan(looseTolerance);
    });

    it('returns 992.2 g/L ±0.1 at 40°C', () => {
      expect(Math.abs(992.2 - inGpL(Water.density(c(40))))).toBeLessThan(looseTolerance);
    });

    it('returns 990.2 g/L ±0.1 at 45°C', () => {
      expect(Math.abs(990.2 - inGpL(Water.density(c(45))))).toBeLessThan(looseTolerance);
    });

    it('returns 988.1 g/L ±0.1 at 50°C', () => {
      expect(Math.abs(988.1 - inGpL(Water.density(c(50))))).toBeLessThan(looseTolerance);
    });

    it('returns 983.2 g/L ±0.1 at 60°C', () => {
      expect(Math.abs(983.2 - inGpL(Water.density(c(60))))).toBeLessThan(looseTolerance);
    });

    it('returns 977.8 g/L ±0.1 at 70°C', () => {
      expect(Math.abs(977.8 - inGpL(Water.density(c(70))))).toBeLessThan(looseTolerance);
    });

    it('returns 971.8 g/L ±0.1 at 80°C', () => {
      expect(Math.abs(971.8 - inGpL(Water.density(c(80))))).toBeLessThan(looseTolerance);
    });

    it('returns 965.3 g/L ±0.1 at 90°C', () => {
      expect(Math.abs(965.3 - inGpL(Water.density(c(90))))).toBeLessThan(looseTolerance);
    });
  });
});
