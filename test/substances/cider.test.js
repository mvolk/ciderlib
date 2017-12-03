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

import Cider from '../../src/substances/Cider';
import Mass from '../../src/properties/Mass';
import SpecificGravity from '../../src/properties/SpecificGravity';
import Volume from '../../src/properties/Volume';
import VolumicMass from '../../src/properties/VolumicMass';

describe('Cider', () => {
  const sg = value => new SpecificGravity(value);
  const gpL = value => new VolumicMass(new Mass(value, Mass.GRAMS), new Volume(1, Volume.LITERS));

  describe('.sweetness', () => {
    describe('.DRY', () => {
      test('is labelled "dry"', () => {
        expect(Cider.DRY.label).toBe('dry');
      });

      test('has null minSG', () => {
        expect(Cider.DRY.minSG).toBeNull();
      });

      test('has maxSG of 1.004', () => {
        expect(Cider.DRY.maxSG.magnitude).toBe(1.004);
      });
    });

    describe('.OFF_DRY', () => {
      test('is labelled "off dry"', () => {
        expect(Cider.OFF_DRY.label).toBe('off dry');
      });

      test('has minSG of 1.004', () => {
        expect(Cider.OFF_DRY.minSG.magnitude).toBe(1.004);
      });

      test('has maxSG of 1.009', () => {
        expect(Cider.OFF_DRY.maxSG.magnitude).toBe(1.009);
      });
    });

    describe('.MEDIUM_DRY', () => {
      test('is labelled "medium dry"', () => {
        expect(Cider.MEDIUM_DRY.label).toBe('medium dry');
      });

      test('has minSG of 1.009', () => {
        expect(Cider.MEDIUM_DRY.minSG.magnitude).toBe(1.009);
      });

      test('has maxSG of 1.015', () => {
        expect(Cider.MEDIUM_DRY.maxSG.magnitude).toBe(1.015);
      });
    });

    describe('.MEDIUM_SWEET', () => {
      test('is labelled "medium sweet"', () => {
        expect(Cider.MEDIUM_SWEET.label).toBe('medium sweet');
      });

      test('has minSG of 1.015', () => {
        expect(Cider.MEDIUM_SWEET.minSG.magnitude).toBe(1.015);
      });

      test('has maxSG of 1.020', () => {
        expect(Cider.MEDIUM_SWEET.maxSG.magnitude).toBe(1.020);
      });
    });

    describe('.SWEET', () => {
      test('is labelled "sweet"', () => {
        expect(Cider.SWEET.label).toBe('sweet');
      });

      test('has minSG of 1.020', () => {
        expect(Cider.SWEET.minSG.magnitude).toBe(1.020);
      });

      test('has null maxSG', () => {
        expect(Cider.SWEET.maxSG).toBeNull();
      });
    });
  });

  describe('.classifyBySG(specificGravity)', () => {
    test('throws a TypeError if not passed an instance of SpecificGravity', () => {
      expect(() => Cider.classifyBySG('1.005')).toThrow(TypeError);
      expect(() => Cider.classifyBySG({})).toThrow(TypeError);
      expect(() => Cider.classifyBySG([])).toThrow(TypeError);
      expect(() => Cider.classifyBySG(() => {})).toThrow(TypeError);
    });

    test('throws a RangeError if passed a value less than 0.800', () => {
      expect(Cider.classifyBySG(sg(0.800))).toBe(Cider.DRY);
      expect(() => Cider.classifyBySG(sg(0.7999))).toThrow(RangeError);
    });

    test('throws a RangeError if passed a value greater than 1.120', () => {
      expect(Cider.classifyBySG(sg(1.120))).toBe(Cider.SWEET);
      expect(() => Cider.classifyBySG(sg(1.1201))).toThrow(RangeError);
    });

    test('returns DRY for values of SG less than 1.004', () => {
      expect(Cider.classifyBySG(sg(0.998))).toBe(Cider.DRY);
      expect(Cider.classifyBySG(sg(1.000))).toBe(Cider.DRY);
      expect(Cider.classifyBySG(sg(1.002))).toBe(Cider.DRY);
      expect(Cider.classifyBySG(sg(1.003))).toBe(Cider.DRY);
      expect(Cider.classifyBySG(sg(1.00399))).toBe(Cider.DRY);
      expect(Cider.classifyBySG(sg(1.004))).not.toBe(Cider.DRY);
    });

    test('returns OFF_DRY for values of SG less than 1.009', () => {
      expect(Cider.classifyBySG(sg(1.004))).toBe(Cider.OFF_DRY);
      expect(Cider.classifyBySG(sg(1.006))).toBe(Cider.OFF_DRY);
      expect(Cider.classifyBySG(sg(1.008))).toBe(Cider.OFF_DRY);
      expect(Cider.classifyBySG(sg(1.00899))).toBe(Cider.OFF_DRY);
      expect(Cider.classifyBySG(sg(1.009))).not.toBe(Cider.OFF_DRY);
    });

    test('returns MEDIUM_DRY for values of SG less than 1.015', () => {
      expect(Cider.classifyBySG(sg(1.009))).toBe(Cider.MEDIUM_DRY);
      expect(Cider.classifyBySG(sg(1.011))).toBe(Cider.MEDIUM_DRY);
      expect(Cider.classifyBySG(sg(1.013))).toBe(Cider.MEDIUM_DRY);
      expect(Cider.classifyBySG(sg(1.01499))).toBe(Cider.MEDIUM_DRY);
      expect(Cider.classifyBySG(sg(1.015))).not.toBe(Cider.MEDIUM_DRY);
    });

    test('returns MEDIUM_SWEET for values of SG less than 1.020', () => {
      expect(Cider.classifyBySG(sg(1.015))).toBe(Cider.MEDIUM_SWEET);
      expect(Cider.classifyBySG(sg(1.017))).toBe(Cider.MEDIUM_SWEET);
      expect(Cider.classifyBySG(sg(1.019))).toBe(Cider.MEDIUM_SWEET);
      expect(Cider.classifyBySG(sg(1.01999))).toBe(Cider.MEDIUM_SWEET);
      expect(Cider.classifyBySG(sg(1.020))).not.toBe(Cider.MEDIUM_SWEET);
    });

    test('returns SWEET for values of SG greater than or equal to 1.020', () => {
      expect(Cider.classifyBySG(sg(1.020))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.024))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.028))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.032))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.036))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.040))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.050))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.060))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.070))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.080))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.090))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.100))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.110))).toBe(Cider.SWEET);
      expect(Cider.classifyBySG(sg(1.120))).toBe(Cider.SWEET);
    });
  });

  describe('.potentialAlcohol(sugarConcentration)', () => {
    test('throws a TypeError if passed a non-number', () => {
      expect(() => Cider.potentialAlcohol('10')).toThrow(TypeError);
      expect(() => Cider.potentialAlcohol({})).toThrow(TypeError);
      expect(() => Cider.potentialAlcohol([])).toThrow(TypeError);
      expect(() => Cider.potentialAlcohol(() => {})).toThrow(TypeError);
    });

    test('throws a RangeError if passed a value less than 0', () => {
      expect(() => Cider.potentialAlcohol(gpL(-0.01))).toThrow(RangeError);
    });

    test('returns 0 when passed 0', () => {
      expect(Cider.potentialAlcohol(gpL(0)).magnitude).toBe(0);
    });

    test('returns 4.2% ABV when passed 70 g/L', () => {
      expect(Cider.potentialAlcohol(gpL(70)).magnitude).toBe(4.2);
    });
  });
});
