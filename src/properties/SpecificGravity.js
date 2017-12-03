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

import polynomial from '../polynomial';
import Brix from './Brix';

const MINIMUM_SG_FOR_BRIX_REGRESSION = 1.0000185477666315;
const MAXIMUM_SG_FOR_BRIX_REGRESSION = 1.17875;

/**
 * A measure of the ratio between the mass of a given volume of solution and the same volume of
 * pure water in the same conditions.
 */
class SpecificGravity {
  static UNITS = {
    key: 'sg',
    label: '',
    name: 'Specific Gravity',
  };

  constructor(magnitude) {
    if (typeof magnitude !== 'number') {
      throw new TypeError('The magnitude of a specific gravity must be number.');
    }

    if (Number.isNaN(magnitude)) {
      throw new TypeError('The magnitude of a specific gravity must be number.');
    }

    if (!Number.isFinite(magnitude)) {
      throw new RangeError('The magnitude of a specific gravity must be finite.');
    }

    if (magnitude <= 0) {
      throw new RangeError('The magnitude of a specific gravity cannot be zero or less than zero.');
    }

    this.magnitude = magnitude;
    this.units = SpecificGravity.UNITS;
  }

  /**
   * Determine the degrees Brix given the specific gravity. This method employs a regression formula
   * from https://en.wikipedia.org/wiki/Brix, valid for specific gravities of less than 1.17875
   * (40 degrees Brix). Accurate to within ±0.002°Bx for Brix up to 40°Bx. Since negative values
   * of Brix are undefined, this conversion will fail for specific gravities less than 1.000.
   * Assumes that the solution consists entirely of water and sugar and is at 20°C.
   */
  toBrix = () => {
    if (this.magnitude > MAXIMUM_SG_FOR_BRIX_REGRESSION) {
      throw new RangeError('Unable to accurately calculate specific gravity for specific gravity values in excess of 1.178.');
    }

    if (this.magnitude < MINIMUM_SG_FOR_BRIX_REGRESSION) {
      // Below this value, the regression produces very small negative values, which of course isn't
      //  physically possible. Coerce these values to zero instead.
      return new Brix(0);
    }

    return new Brix(polynomial([-669.5622, 1262.7794, -775.6821, 182.4601], this.magnitude));
  };

  // Returns the magnitude of this SG measurement in given units
  inUnits = (units) => {
    if (units === Brix.UNITS) {
      return this.toBrix().inUnits(units);
    }

    if (units !== SpecificGravity.UNITS) {
      throw new TypeError(`Unable to express specific gravity in ${units.name || 'invalid units of measurement'}`);
    }

    return this.magnitude;
  };

  // Determines whether this specific gravity is greater than the given specific gravity
  isGreaterThan = (specificGravity) => {
    if (!(specificGravity instanceof SpecificGravity)) {
      throw new TypeError('Specific gravity can only be compared with other specific gravities');
    }

    return this.magnitude > specificGravity.magnitude;
  };

  // Determines whether this specific gravity is lower than the given specific gravity
  isLessThan = (specificGravity) => {
    if (!(specificGravity instanceof SpecificGravity)) {
      throw new TypeError('Specific gravity can only be compared with other specific gravities');
    }

    return this.magnitude < specificGravity.magnitude;
  }
}

export default SpecificGravity;
