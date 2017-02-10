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

const DRY = {
  label: 'dry',
  minSG: Number.NEGATIVE_INFINITY,
  maxSG: 1.004,
};

const OFF_DRY = {
  label: 'off dry',
  minSG: 1.004,
  maxSG: 1.009,
};

const MEDIUM_DRY = {
  label: 'medium dry',
  minSG: 1.009,
  maxSG: 1.015,
};

const MEDIUM_SWEET = {
  label: 'medium sweet',
  minSG: 1.015,
  maxSG: 1.020,
};

const SWEET = {
  label: 'sweet',
  minSG: 1.020,
  maxSG: Number.POSITIVE_INFINITY,
};

/**
 * Given a specific gravity, return the sweetness classification that is most likely to be used to
 * describe a hard cider with that specific gravity.
 * @param specificGravity {Number}
 * @return {object} one of DRY, OFF_DRY, MEDIUM_DRY, MEDIUM_SWEET and SWEET.
 */
function classifyBySG(specificGravity) {
  if (typeof specificGravity !== 'number') {
    throw new TypeError('The specific gravity provided is not of type "number".');
  }

  if (Number.isNaN(specificGravity)) {
    throw new RangeError('The specific gravity value provided is not a number.');
  }

  if (specificGravity < 0.800 || specificGravity > 1.120) {
    throw new RangeError('The specific gravity value provided is improbable for hard cider.');
  }

  if (specificGravity < OFF_DRY.minSG) return DRY;
  if (specificGravity < MEDIUM_DRY.minSG) return OFF_DRY;
  if (specificGravity < MEDIUM_SWEET.minSG) return MEDIUM_DRY;
  if (specificGravity < SWEET.minSG) return MEDIUM_SWEET;

  return SWEET;
}

export default {
  sweetness: {
    DRY,
    OFF_DRY,
    MEDIUM_DRY,
    MEDIUM_SWEET,
    SWEET,
  },
  classifyBySG,
};
