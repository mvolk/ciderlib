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

import hardCider from '../../src/substances/hardCider';

describe('hardCider', () => {
  describe('.sweetness', () => {
    describe('.DRY', () => {
      test('is labelled "dry"', () => {
        expect(hardCider.sweetness.DRY.label).toBe('dry');
      });

      test('has minSG of negative infinity', () => {
        expect(hardCider.sweetness.DRY.minSG).toBe(Number.NEGATIVE_INFINITY);
      });

      test('has maxSG of 1.004', () => {
        expect(hardCider.sweetness.DRY.maxSG).toBe(1.004);
      });
    });

    describe('.OFF_DRY', () => {
      test('is labelled "off dry"', () => {
        expect(hardCider.sweetness.OFF_DRY.label).toBe('off dry');
      });

      test('has minSG of 1.004', () => {
        expect(hardCider.sweetness.OFF_DRY.minSG).toBe(1.004);
      });

      test('has maxSG of 1.009', () => {
        expect(hardCider.sweetness.OFF_DRY.maxSG).toBe(1.009);
      });
    });

    describe('.MEDIUM_DRY', () => {
      test('is labelled "medium dry"', () => {
        expect(hardCider.sweetness.MEDIUM_DRY.label).toBe('medium dry');
      });

      test('has minSG of 1.009', () => {
        expect(hardCider.sweetness.MEDIUM_DRY.minSG).toBe(1.009);
      });

      test('has maxSG of 1.015', () => {
        expect(hardCider.sweetness.MEDIUM_DRY.maxSG).toBe(1.015);
      });
    });

    describe('.MEDIUM_SWEET', () => {
      test('is labelled "medium sweet"', () => {
        expect(hardCider.sweetness.MEDIUM_SWEET.label).toBe('medium sweet');
      });

      test('has minSG of 1.015', () => {
        expect(hardCider.sweetness.MEDIUM_SWEET.minSG).toBe(1.015);
      });

      test('has maxSG of 1.020', () => {
        expect(hardCider.sweetness.MEDIUM_SWEET.maxSG).toBe(1.020);
      });
    });

    describe('.SWEET', () => {
      test('is labelled "sweet"', () => {
        expect(hardCider.sweetness.SWEET.label).toBe('sweet');
      });

      test('has minSG of 1.020', () => {
        expect(hardCider.sweetness.SWEET.minSG).toBe(1.020);
      });

      test('has maxSG of positive infinity', () => {
        expect(hardCider.sweetness.SWEET.maxSG).toBe(Number.POSITIVE_INFINITY);
      });
    });
  });

  describe('.classifyBySG(specificGravity)', () => {
    test('throws a TypeError if passed a non-number', () => {
      expect(() => hardCider.classifyBySG('1.005')).toThrow(TypeError);
      expect(() => hardCider.classifyBySG({})).toThrow(TypeError);
      expect(() => hardCider.classifyBySG([])).toThrow(TypeError);
      expect(() => hardCider.classifyBySG(() => {})).toThrow(TypeError);
    });

    test('throws a RangeError if passed NaN', () => {
      expect(() => hardCider.classifyBySG(Number.NaN)).toThrow(RangeError);
    });

    test('throws a RangeError if passed a value less than 0.800', () => {
      expect(hardCider.classifyBySG(0.800)).toBe(hardCider.sweetness.DRY);
      expect(() => hardCider.classifyBySG(0.7999)).toThrow(RangeError);
    });

    test('throws a RangeError if passed a value greater than 1.120', () => {
      expect(hardCider.classifyBySG(1.120)).toBe(hardCider.sweetness.SWEET);
      expect(() => hardCider.classifyBySG(1.1201)).toThrow(RangeError);
    });

    test('returns DRY for values of SG less than 1.004', () => {
      expect(hardCider.classifyBySG(0.998)).toBe(hardCider.sweetness.DRY);
      expect(hardCider.classifyBySG(1.000)).toBe(hardCider.sweetness.DRY);
      expect(hardCider.classifyBySG(1.002)).toBe(hardCider.sweetness.DRY);
      expect(hardCider.classifyBySG(1.003)).toBe(hardCider.sweetness.DRY);
      expect(hardCider.classifyBySG(1.00399)).toBe(hardCider.sweetness.DRY);
      expect(hardCider.classifyBySG(1.004)).not.toBe(hardCider.sweetness.DRY);
    });

    test('returns OFF_DRY for values of SG less than 1.009', () => {
      expect(hardCider.classifyBySG(1.004)).toBe(hardCider.sweetness.OFF_DRY);
      expect(hardCider.classifyBySG(1.006)).toBe(hardCider.sweetness.OFF_DRY);
      expect(hardCider.classifyBySG(1.008)).toBe(hardCider.sweetness.OFF_DRY);
      expect(hardCider.classifyBySG(1.00899)).toBe(hardCider.sweetness.OFF_DRY);
      expect(hardCider.classifyBySG(1.009)).not.toBe(hardCider.sweetness.OFF_DRY);
    });

    test('returns MEDIUM_DRY for values of SG less than 1.015', () => {
      expect(hardCider.classifyBySG(1.009)).toBe(hardCider.sweetness.MEDIUM_DRY);
      expect(hardCider.classifyBySG(1.011)).toBe(hardCider.sweetness.MEDIUM_DRY);
      expect(hardCider.classifyBySG(1.013)).toBe(hardCider.sweetness.MEDIUM_DRY);
      expect(hardCider.classifyBySG(1.01499)).toBe(hardCider.sweetness.MEDIUM_DRY);
      expect(hardCider.classifyBySG(1.015)).not.toBe(hardCider.sweetness.MEDIUM_DRY);
    });

    test('returns MEDIUM_SWEET for values of SG less than 1.020', () => {
      expect(hardCider.classifyBySG(1.015)).toBe(hardCider.sweetness.MEDIUM_SWEET);
      expect(hardCider.classifyBySG(1.017)).toBe(hardCider.sweetness.MEDIUM_SWEET);
      expect(hardCider.classifyBySG(1.019)).toBe(hardCider.sweetness.MEDIUM_SWEET);
      expect(hardCider.classifyBySG(1.01999)).toBe(hardCider.sweetness.MEDIUM_SWEET);
      expect(hardCider.classifyBySG(1.020)).not.toBe(hardCider.sweetness.MEDIUM_SWEET);
    });

    test('returns SWEET for values of SG greater than or equal to 1.020', () => {
      expect(hardCider.classifyBySG(1.020)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.024)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.028)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.032)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.036)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.040)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.050)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.060)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.070)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.080)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.090)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.100)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.110)).toBe(hardCider.sweetness.SWEET);
      expect(hardCider.classifyBySG(1.120)).toBe(hardCider.sweetness.SWEET);
    });
  });
});
