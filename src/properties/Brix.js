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

import SpecificGravity from './SpecificGravity';

const MAXIMUM_UNITS_FOR_SG_REGRESSION = 44.0;

/**
 * A measure of the ratio between the mass of solids (assumed to be sugar for our purposes) in an
 * aqueous solution and the mass of the solution overall.
 */
export default class Brix {
  static UNITS = {
    key: 'brix',
    label: '°Bx',
    name: 'Brix',
  };

  constructor(magnitude) {
    if (typeof magnitude !== 'number') {
      throw new TypeError('The magnitude of a Brix measurement must be number.');
    }

    if (Number.isNaN(magnitude)) {
      throw new TypeError('The magnitude of a Brix measurement must be number.');
    }

    if (!Number.isFinite(magnitude)) {
      throw new RangeError('The magnitude of Brix measurement must be finite.');
    }

    if (magnitude < 0) {
      throw new RangeError('Since Brix is fundamentally a mass ratio, and mass cannot be negative, negative Brix values are undefined.');
    }

    this.magnitude = magnitude;
    this.units = Brix.UNITS;
  }

  /**
   * Determine specific gravity given the degrees Brix for a solution of sucrose in water.
   *
   * This method employs a regression formula from Claude Jolicoeur's The New Cidermaker's Handbook,
   * chapter 8. That formula is a third-order regression based on the NBS C440 table. Accurate to
   * within ±0.035°SG for Brix up to 44°Bx under the assumptions that the solution consists only of
   * sucrose and water, is at 20°C, and where °SG are given by the formula °SG = 1000 * (SG - 1).
   * See http://www.boulder.nist.gov/div838/SelectedPubs/Circular%20440%20Table%20114.pdf
   *
   * The sucrose/water assumption holds with moderate accuracy for apple juice.
   */
  toSpecificGravity = () => {
    if (this.magnitude > MAXIMUM_UNITS_FOR_SG_REGRESSION) {
      throw new RangeError('Unable to accurately calculate specific gravity for Brix values in excess of 44°Bx.');
    }

    return new SpecificGravity(
      1 + (polynomial([0, 3.8687, 0.013048, 0.0000487], this.magnitude) / 1000),
    );
  };

  // Returns the magnitude of this Brix measurement in given units
  inUnits = (units) => {
    if (units === SpecificGravity.UNITS) {
      return this.toSpecificGravity().inUnits(units);
    }

    if (units !== Brix.UNITS) {
      throw new TypeError(`Unable to express Brix in ${units.name || 'invalid units of measurement'}`);
    }

    return this.magnitude;
  };

  // Determines whether this Brix is greater than the given Brix
  isGreaterThan = (brix) => {
    if (!(brix instanceof Brix)) {
      throw new TypeError('Brix measurements can only be compared with other Brix measurements');
    }

    return this.magnitude > brix.magnitude;
  };

  // Determines whether this Brix is less than the given Brix
  isLessThan = (brix) => {
    if (!(brix instanceof Brix)) {
      throw new TypeError('Brix measurements can only be compared with other Brix measurements');
    }

    return this.magnitude < brix.magnitude;
  }
}
