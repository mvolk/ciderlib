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

// The following conversion factors are exact
const KILOGRAMS_PER_POUND = 0.45359237;
const KILOGRAMS_PER_OUNCE = 0.028349523125;
const GRAMS_PER_KILOGRAM = 1000.0;
const GRAMS_PER_POUND = 453.59237;
const GRAMS_PER_OUNCE = 28.349523125;
const OUNCES_PER_POUND = 16.0;

class Mass {
  static KILOGRAMS = {
    key: 'kilograms',
    label: 'kg',
    name: 'Kilograms',
  };

  static GRAMS = {
    key: 'grams',
    label: 'g',
    name: 'Grams',
  };

  static POUNDS = {
    key: 'pounds',
    label: 'lb',
    name: 'Pounds',
  };

  static OUNCES = {
    key: 'ounces',
    label: 'oz',
    name: 'Ounces',
  };

  static CONVERSION_FUNCTION = {
    [Mass.KILOGRAMS.key]: {
      [Mass.KILOGRAMS.key]: kg => kg,
      [Mass.GRAMS.key]: kg => kg * GRAMS_PER_KILOGRAM,
      [Mass.POUNDS.key]: kg => kg / KILOGRAMS_PER_POUND,
      [Mass.OUNCES.key]: kg => kg / KILOGRAMS_PER_OUNCE,
    },
    [Mass.GRAMS.key]: {
      [Mass.KILOGRAMS.key]: g => g / GRAMS_PER_KILOGRAM,
      [Mass.GRAMS.key]: g => g,
      [Mass.POUNDS.key]: g => g / GRAMS_PER_POUND,
      [Mass.OUNCES.key]: g => g / GRAMS_PER_OUNCE,
    },
    [Mass.POUNDS.key]: {
      [Mass.KILOGRAMS.key]: lb => lb * KILOGRAMS_PER_POUND,
      [Mass.GRAMS.key]: lb => lb * GRAMS_PER_POUND,
      [Mass.POUNDS.key]: lb => lb,
      [Mass.OUNCES.key]: lb => lb * OUNCES_PER_POUND,
    },
    [Mass.OUNCES.key]: {
      [Mass.KILOGRAMS.key]: oz => oz * KILOGRAMS_PER_OUNCE,
      [Mass.GRAMS.key]: oz => oz * GRAMS_PER_OUNCE,
      [Mass.POUNDS.key]: oz => oz / OUNCES_PER_POUND,
      [Mass.OUNCES.key]: oz => oz,
    },
  };

  constructor(magnitude, units) {
    if (typeof magnitude !== 'number') {
      throw new TypeError('The magnitude of a mass must be number.');
    }

    if (Number.isNaN(magnitude)) {
      throw new TypeError('The magnitude of a mass must be number.');
    }

    if (!Number.isFinite(magnitude)) {
      throw new RangeError('The magnitude of a mass must be finite.');
    }

    if (magnitude < 0) {
      throw new RangeError('The magnitude of a mass cannot be less than zero.');
    }

    this.magnitude = magnitude;
    this.units = units;
  }

  // Returns the magnitude of this mass in given units
  inUnits = (units) => {
    const fn = Mass.CONVERSION_FUNCTION[this.units.key][units.key];
    if (!fn) {
      throw new TypeError(`Unable to express mass in ${units.name || 'invalid units of measurement'}`);
    }

    return fn(this.magnitude);
  };

  // Determines whether this mass is greater than the given mass
  isGreaterThan = (mass) => {
    if (!(mass instanceof Mass)) {
      throw new TypeError('Masses can only be compared with other masses');
    }
    return this.magnitude > mass.inUnits(this.units);
  };

  // Determines whether this mass is lower than the given mass
  isLessThan = (mass) => {
    if (!(mass instanceof Mass)) {
      throw new TypeError('Masses can only be compared with other masses');
    }

    return this.magnitude < mass.inUnits(this.units);
  }
}

export default Mass;
