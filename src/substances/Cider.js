/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Michael Volk (michael@volksys.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Mass from '../properties/Mass';
import PercentABV from '../properties/PercentABV';
import SpecificGravity from '../properties/SpecificGravity';
import Volume from '../properties/Volume';
import VolumicMass from '../properties/VolumicMass';

const DRY = {
  label: 'dry',
  minSG: null,
  maxSG: new SpecificGravity(1.004),
};

const OFF_DRY = {
  label: 'off dry',
  minSG: new SpecificGravity(1.004),
  maxSG: new SpecificGravity(1.009),
};

const MEDIUM_DRY = {
  label: 'medium dry',
  minSG: new SpecificGravity(1.009),
  maxSG: new SpecificGravity(1.015),
};

const MEDIUM_SWEET = {
  label: 'medium sweet',
  minSG: new SpecificGravity(1.015),
  maxSG: new SpecificGravity(1.020),
};

const SWEET = {
  label: 'sweet',
  minSG: new SpecificGravity(1.020),
  maxSG: null,
};

const MINIMUM_PROBABLE_GRAVITY = new SpecificGravity(0.800);
const MAXIMUM_PROBABLE_GRAVITY = new SpecificGravity(1.120);

/**
 * Given a specific gravity, return the sweetness classification that is most likely to be used to
 * describe a hard cider with that specific gravity.
 */
function classifyBySG(specificGravity) {
  if (!(specificGravity instanceof SpecificGravity)) {
    throw new TypeError('Specific gravity must be an instance of SpecificGravity.');
  }

  if (specificGravity.isLessThan(MINIMUM_PROBABLE_GRAVITY)) {
    throw new RangeError('The specific gravity value provided is improbable for hard cider.');
  }

  if (specificGravity.isGreaterThan(MAXIMUM_PROBABLE_GRAVITY)) {
    throw new RangeError('The specific gravity value provided is improbable for hard cider.');
  }

  if (specificGravity.isLessThan(OFF_DRY.minSG)) return DRY;
  if (specificGravity.isLessThan(MEDIUM_DRY.minSG)) return OFF_DRY;
  if (specificGravity.isLessThan(MEDIUM_SWEET.minSG)) return MEDIUM_DRY;
  if (specificGravity.isLessThan(SWEET.minSG)) return MEDIUM_SWEET;

  return SWEET;
}

/**
 * Obtain the amount of alcohol, in % by volume at 20°C, that will be produced if all of the given
 * sugar is fermented out. This amount is in addition to any existing alcohol in the cider. This
 * function uses the formula given by Warcollier in La Cidrerie (1928).
 */
function potentialAlcohol(sugarConcentration) {
  if (!(sugarConcentration instanceof VolumicMass)) {
    throw new TypeError('Sugar concentration must be expressed as a VolumicMass for calculation of potential alcohol.');
  }

  return new PercentABV((0.06 * sugarConcentration.inUnits(Mass.GRAMS, Volume.LITERS)));
}

export default {
  DRY,
  OFF_DRY,
  MEDIUM_DRY,
  MEDIUM_SWEET,
  SWEET,
  classifyBySG,
  potentialAlcohol,
};
