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

const MAXIMUM_BRIX_FOR_SG_REGRESSION = 44.0;
const MINIMUM_SG_FOR_BRIX_REGRESSION = 1.0000185477666315;
const MAXIMUM_SG_FOR_BRIX_REGRESSION = 1.17875;

export const BRIX = {
  key: 'brix',
  label: '°Bx',
  name: 'Brix',
};

export const SPECIFIC_GRAVITY = {
  key: 'sg',
  label: '',
  name: 'Specific Gravity',
};

/**
 * Determine the specific gravity given the degrees Brix. This method employs a regression formula
 * from Claude Jolicoeur's The New Cidermaker's Handbook, chapter 8. That formula is a third-order
 * regression based on the NBS C440 table. Accurate to within ±0.03°SG for Brix up to 44°Bx under
 * the assumption that the solution consists only of sucrose and water, and where °SG are given by
 * the formula °SG = 1000 * (SG - 1).
 *
 * The sucrose/water assumption holds with moderate accuracy for apple juice.
 *
 * See http://www.boulder.nist.gov/div838/SelectedPubs/Circular%20440%20Table%20114.pdf
 *
 * @param degreesBrix {Number} the ratio between the mass of solids in an aqueous solution and the
 *                    mass of the solution overall.
 * @return {Number} the specific gravity of the solution
 * @throws RangeError if degreesBrix exceeds 44°Bx or is less than zero
 */
function specificGravityFromBrix(degreesBrix) {
  if (degreesBrix < 0 || degreesBrix > MAXIMUM_BRIX_FOR_SG_REGRESSION) {
    throw new RangeError('Brix values must not exceed 44°Bx nor be less than 0°Bx');
  }

  return 1 + (polynomial([0, 3.8687, 0.013048, 0.0000487], degreesBrix) / 1000);
}

/**
 * Determine the degrees Brix given the specific gravity. This method employs a regression formula
 * from https://en.wikipedia.org/wiki/Brix, valid for specific gravities of less than 1.17875
 * (40 degrees Brix). Accurate to within ±0.003°Bx for Brix up to 40°Bx.
 *
 * @param specificGravity {Number} the specific gravity of the solution
 * @return {Number} the ratio between the mass of solids in an aqueous solution and the mass of the
 *                  solution overall.
 * @throws RangeError if the calculated Brix exceeds 40°Bx (e.g. SG exceeds 1.17875).
 */
function brixFromSpecificGravity(specificGravity) {
  if (specificGravity > MAXIMUM_SG_FOR_BRIX_REGRESSION) {
    throw new RangeError('Specific gravity values must not exceed 1.17875');
  }
  if (specificGravity < MINIMUM_SG_FOR_BRIX_REGRESSION) {
    // Below this value, the regression produces very small negative values, which of course isn't
    //  physically possible. Coerce these values to zero instead.
    return 0;
  }

  return polynomial([-669.5622, 1262.7794, -775.6821, 182.4601], specificGravity);
}

export const sugarConversionFunctions = {
  [BRIX.key]: {
    [BRIX.key]: bx => bx,
    [SPECIFIC_GRAVITY.key]: bx => specificGravityFromBrix(bx),
  },
  [SPECIFIC_GRAVITY.key]: {
    [BRIX.key]: sg => brixFromSpecificGravity(sg),
    [SPECIFIC_GRAVITY.key]: sg => sg,
  },
};
