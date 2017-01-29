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

import water from '../../src/substances/water';

describe('water', () => {
  describe('FREEZING_POINT', () => {
    it('is 0 degrees C', () => {
      expect(water.FREEZING_POINT).toEqual(0);
    });
  });

  describe('BOILING_POINT', () => {
    it('is 100 degrees C', () => {
      expect(water.BOILING_POINT).toEqual(100);
    });
  });

  describe('density(temperature)', () => {
    const looseTolerance = 0.1;
    const tightTolerance = 0.05;

    it('asserts that temperature is a number', () => {
      expect(() => water.density('foo')).toThrowError(TypeError);
      expect(() => water.density([1])).toThrowError(TypeError);
      expect(() => water.density({ temperature: 1 })).toThrowError(TypeError);
    });

    it('throws a RangeError if temperature is below freezing', () => {
      expect(() => water.density(-0.001)).toThrowError(RangeError);
    });

    it('throws a RangeError if temperature is above boiling', () => {
      expect(() => water.density(100.001)).toThrowError(RangeError);
    });

    it('returns 999.8 g/L ±0.10 at 0°C', () => {
      expect(Math.abs(999.8 - water.density(0))).toBeLessThan(looseTolerance);
    });

    it('returns 1000.0 g/L ±0.1 at 4°C', () => {
      expect(Math.abs(1000.0 - water.density(4))).toBeLessThan(looseTolerance);
    });

    it('returns 1000.0 g/L ±0.1 at 5°C', () => {
      expect(Math.abs(1000.0 - water.density(5))).toBeLessThan(looseTolerance);
    });

    it('returns 999.7 g/L ±0.05 at 10°C', () => {
      expect(Math.abs(999.7 - water.density(10))).toBeLessThan(tightTolerance);
    });

    it('returns 999.0 g/L ±0.05 at 60°F', () => {
      const degC = ((60 - 32) * 5) / 9;
      expect(Math.abs(999.0 - water.density(degC))).toBeLessThan(tightTolerance);
    });

    it('returns 998.2 g/L ±0.05 at 20°C', () => {
      expect(Math.abs(998.2 - water.density(20))).toBeLessThan(tightTolerance);
    });

    it('returns 997.0 g/L ±0.1 at 25°C', () => {
      expect(Math.abs(997.0 - water.density(25))).toBeLessThan(looseTolerance);
    });

    it('returns 995.7 g/L ±0.1 at 30°C', () => {
      expect(Math.abs(995.7 - water.density(30))).toBeLessThan(looseTolerance);
    });

    it('returns 994.1 g/L ±0.1 at 35°C', () => {
      expect(Math.abs(994.1 - water.density(35))).toBeLessThan(looseTolerance);
    });

    it('returns 992.2 g/L ±0.1 at 40°C', () => {
      expect(Math.abs(992.2 - water.density(40))).toBeLessThan(looseTolerance);
    });

    it('returns 990.2 g/L ±0.1 at 45°C', () => {
      expect(Math.abs(990.2 - water.density(45))).toBeLessThan(looseTolerance);
    });

    it('returns 988.1 g/L ±0.1 at 50°C', () => {
      expect(Math.abs(988.1 - water.density(50))).toBeLessThan(looseTolerance);
    });

    it('returns 983.2 g/L ±0.1 at 60°C', () => {
      expect(Math.abs(983.2 - water.density(60))).toBeLessThan(looseTolerance);
    });

    it('returns 977.8 g/L ±0.1 at 70°C', () => {
      expect(Math.abs(977.8 - water.density(70))).toBeLessThan(looseTolerance);
    });

    it('returns 971.8 g/L ±0.1 at 80°C', () => {
      expect(Math.abs(971.8 - water.density(80))).toBeLessThan(looseTolerance);
    });

    it('returns 965.3 g/L ±0.1 at 90°C', () => {
      expect(Math.abs(965.3 - water.density(90))).toBeLessThan(looseTolerance);
    });

    it('returns 958.6 g/L ±0.1 at 100°C', () => {
      expect(Math.abs(958.6 - water.density(100))).toBeLessThan(looseTolerance);
    });
  });
});
