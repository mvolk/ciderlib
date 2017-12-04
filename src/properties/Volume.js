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

const LITERS_PER_US_GALLON = 3.785411784;
const MILLILITERS_PER_LITER = 1000.0;
const MILLILITERS_PER_US_GALLON = 3785.411784;

class Volume {
  static LITERS = {
    key: 'liters',
    label: 'l',
    name: 'Liters',
  };

  static MILLILITERS = {
    key: 'milliliters',
    label: 'ml',
    name: 'Milliliters',
  };

  static US_GALLONS = {
    key: 'usgallons',
    label: 'gal (US)',
    name: 'US Gallons',
  };

  static CONVERSION_FUNCTION = {
    [Volume.LITERS.key]: {
      [Volume.LITERS.key]: l => l,
      [Volume.MILLILITERS.key]: l => l * MILLILITERS_PER_LITER,
      [Volume.US_GALLONS.key]: l => l / LITERS_PER_US_GALLON,
    },
    [Volume.MILLILITERS.key]: {
      [Volume.LITERS.key]: ml => ml / MILLILITERS_PER_LITER,
      [Volume.MILLILITERS.key]: ml => ml,
      [Volume.US_GALLONS.key]: ml => ml / MILLILITERS_PER_US_GALLON,
    },
    [Volume.US_GALLONS.key]: {
      [Volume.LITERS.key]: gal => gal * LITERS_PER_US_GALLON,
      [Volume.MILLILITERS.key]: gal => gal * MILLILITERS_PER_US_GALLON,
      [Volume.US_GALLONS.key]: gal => gal,
    },
  };

  constructor(magnitude, units) {
    if (typeof magnitude !== 'number') {
      throw new TypeError('The magnitude of a volume must be number.');
    }

    if (Number.isNaN(magnitude)) {
      throw new TypeError('The magnitude of a volume must be number.');
    }

    if (!Number.isFinite(magnitude)) {
      throw new RangeError('The magnitude of a volume must be finite.');
    }

    if (magnitude < 0) {
      throw new RangeError('The magnitude of a volume cannot be less than zero.');
    }

    this.magnitude = magnitude;
    this.units = units;
  }

  // Returns the magnitude of this volume in given units
  inUnits = (units) => {
    const fn = Volume.CONVERSION_FUNCTION[this.units.key][units.key];
    if (!fn) {
      throw new TypeError(`Unable to express volume in ${units.name || 'invalid units of measurement'}`);
    }

    return fn(this.magnitude);
  };

  // Determines whether this volume is greater than the given volume
  isGreaterThan = (volume) => {
    if (!(volume instanceof Volume)) {
      throw new TypeError('Volumes can only be compared with other volumes');
    }

    return this.magnitude > volume.inUnits(this.units);
  };

  // Determines whether this volume is lower than the given volume
  isLessThan = (volume) => {
    if (!(volume instanceof Volume)) {
      throw new TypeError('Volumes can only be compared with other volumes');
    }

    return this.magnitude < volume.inUnits(this.units);
  }
}

export default Volume;
