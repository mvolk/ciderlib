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

import cider from '../../src/substances/cider';

describe('cider', () => {
  describe('.sweetness', () => {
    describe('.DRY', () => {
      test('is labelled "dry"', () => {
        expect(cider.sweetness.DRY.label).toBe('dry');
      });

      test('has minSG of negative infinity', () => {
        expect(cider.sweetness.DRY.minSG).toBe(Number.NEGATIVE_INFINITY);
      });

      test('has maxSG of 1.004', () => {
        expect(cider.sweetness.DRY.maxSG).toBe(1.004);
      });
    });

    describe('.OFF_DRY', () => {
      test('is labelled "off dry"', () => {
        expect(cider.sweetness.OFF_DRY.label).toBe('off dry');
      });

      test('has minSG of 1.004', () => {
        expect(cider.sweetness.OFF_DRY.minSG).toBe(1.004);
      });

      test('has maxSG of 1.009', () => {
        expect(cider.sweetness.OFF_DRY.maxSG).toBe(1.009);
      });
    });

    describe('.MEDIUM_DRY', () => {
      test('is labelled "medium dry"', () => {
        expect(cider.sweetness.MEDIUM_DRY.label).toBe('medium dry');
      });

      test('has minSG of 1.009', () => {
        expect(cider.sweetness.MEDIUM_DRY.minSG).toBe(1.009);
      });

      test('has maxSG of 1.015', () => {
        expect(cider.sweetness.MEDIUM_DRY.maxSG).toBe(1.015);
      });
    });

    describe('.MEDIUM_SWEET', () => {
      test('is labelled "medium sweet"', () => {
        expect(cider.sweetness.MEDIUM_SWEET.label).toBe('medium sweet');
      });

      test('has minSG of 1.015', () => {
        expect(cider.sweetness.MEDIUM_SWEET.minSG).toBe(1.015);
      });

      test('has maxSG of 1.020', () => {
        expect(cider.sweetness.MEDIUM_SWEET.maxSG).toBe(1.020);
      });
    });

    describe('.SWEET', () => {
      test('is labelled "sweet"', () => {
        expect(cider.sweetness.SWEET.label).toBe('sweet');
      });

      test('has minSG of 1.020', () => {
        expect(cider.sweetness.SWEET.minSG).toBe(1.020);
      });

      test('has maxSG of positive infinity', () => {
        expect(cider.sweetness.SWEET.maxSG).toBe(Number.POSITIVE_INFINITY);
      });
    });
  });

  describe('.classifyBySG(specificGravity)', () => {
    test('throws a TypeError if passed a non-number', () => {
      expect(() => cider.classifyBySG('1.005')).toThrow(TypeError);
      expect(() => cider.classifyBySG({})).toThrow(TypeError);
      expect(() => cider.classifyBySG([])).toThrow(TypeError);
      expect(() => cider.classifyBySG(() => {})).toThrow(TypeError);
    });

    test('throws a RangeError if passed NaN', () => {
      expect(() => cider.classifyBySG(Number.NaN)).toThrow(RangeError);
    });

    test('throws a RangeError if passed a value less than 0.800', () => {
      expect(cider.classifyBySG(0.800)).toBe(cider.sweetness.DRY);
      expect(() => cider.classifyBySG(0.7999)).toThrow(RangeError);
    });

    test('throws a RangeError if passed a value greater than 1.120', () => {
      expect(cider.classifyBySG(1.120)).toBe(cider.sweetness.SWEET);
      expect(() => cider.classifyBySG(1.1201)).toThrow(RangeError);
    });

    test('returns DRY for values of SG less than 1.004', () => {
      expect(cider.classifyBySG(0.998)).toBe(cider.sweetness.DRY);
      expect(cider.classifyBySG(1.000)).toBe(cider.sweetness.DRY);
      expect(cider.classifyBySG(1.002)).toBe(cider.sweetness.DRY);
      expect(cider.classifyBySG(1.003)).toBe(cider.sweetness.DRY);
      expect(cider.classifyBySG(1.00399)).toBe(cider.sweetness.DRY);
      expect(cider.classifyBySG(1.004)).not.toBe(cider.sweetness.DRY);
    });

    test('returns OFF_DRY for values of SG less than 1.009', () => {
      expect(cider.classifyBySG(1.004)).toBe(cider.sweetness.OFF_DRY);
      expect(cider.classifyBySG(1.006)).toBe(cider.sweetness.OFF_DRY);
      expect(cider.classifyBySG(1.008)).toBe(cider.sweetness.OFF_DRY);
      expect(cider.classifyBySG(1.00899)).toBe(cider.sweetness.OFF_DRY);
      expect(cider.classifyBySG(1.009)).not.toBe(cider.sweetness.OFF_DRY);
    });

    test('returns MEDIUM_DRY for values of SG less than 1.015', () => {
      expect(cider.classifyBySG(1.009)).toBe(cider.sweetness.MEDIUM_DRY);
      expect(cider.classifyBySG(1.011)).toBe(cider.sweetness.MEDIUM_DRY);
      expect(cider.classifyBySG(1.013)).toBe(cider.sweetness.MEDIUM_DRY);
      expect(cider.classifyBySG(1.01499)).toBe(cider.sweetness.MEDIUM_DRY);
      expect(cider.classifyBySG(1.015)).not.toBe(cider.sweetness.MEDIUM_DRY);
    });

    test('returns MEDIUM_SWEET for values of SG less than 1.020', () => {
      expect(cider.classifyBySG(1.015)).toBe(cider.sweetness.MEDIUM_SWEET);
      expect(cider.classifyBySG(1.017)).toBe(cider.sweetness.MEDIUM_SWEET);
      expect(cider.classifyBySG(1.019)).toBe(cider.sweetness.MEDIUM_SWEET);
      expect(cider.classifyBySG(1.01999)).toBe(cider.sweetness.MEDIUM_SWEET);
      expect(cider.classifyBySG(1.020)).not.toBe(cider.sweetness.MEDIUM_SWEET);
    });

    test('returns SWEET for values of SG greater than or equal to 1.020', () => {
      expect(cider.classifyBySG(1.020)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.024)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.028)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.032)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.036)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.040)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.050)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.060)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.070)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.080)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.090)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.100)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.110)).toBe(cider.sweetness.SWEET);
      expect(cider.classifyBySG(1.120)).toBe(cider.sweetness.SWEET);
    });
  });

  describe('.potentialAlcohol(sugarConcentration)', () => {
    test('throws a TypeError if passed a non-number', () => {
      expect(() => cider.potentialAlcohol('10')).toThrow(TypeError);
      expect(() => cider.potentialAlcohol({})).toThrow(TypeError);
      expect(() => cider.potentialAlcohol([])).toThrow(TypeError);
      expect(() => cider.potentialAlcohol(() => {})).toThrow(TypeError);
    });

    test('throws a RangeError if passed a value less than 0', () => {
      expect(() => cider.potentialAlcohol(-0.01)).toThrow(RangeError);
    });

    test('returns 0 when passed 0', () => {
      expect(cider.potentialAlcohol(0)).toBe(0);
    });

    test('returns 4.2% ABV when passed 70 g/L', () => {
      expect(cider.potentialAlcohol(70)).toBe(4.2);
    });
  });
});
