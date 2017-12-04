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

export default class PercentABV {
  static UNITS = {
    key: '%abv',
    label: '%ABV',
    name: '% Alcohol (by volume)',
  };

  constructor(magnitude) {
    if (typeof magnitude !== 'number') {
      throw new TypeError('The magnitude of an alcohol concentration must be number.');
    }

    if (Number.isNaN(magnitude)) {
      throw new TypeError('The magnitude of an alcohol concentration must be number.');
    }

    if (!Number.isFinite(magnitude)) {
      throw new RangeError('The magnitude of an alcohol concentration must be finite.');
    }

    if (magnitude < 0) {
      throw new RangeError('The magnitude of an alcohol concentration cannot be less than zero.');
    }

    this.magnitude = magnitude;
    this.units = PercentABV.UNITS;
  }

  // Returns the magnitude of this alcohol concentration in given units
  inUnits = (units) => {
    if (units !== PercentABV.UNITS) {
      throw new TypeError(`Unable to express %ABV in ${units.name || 'invalid units of measurement'}`);
    }

    return this.magnitude;
  };

  // Determines whether this alcohol concentration is greater than the given alcohol concentration
  isGreaterThan = (percentABV) => {
    if (!(percentABV instanceof PercentABV)) {
      throw new TypeError('Alcohol concentrations can only be compared with other alcohol concentrations');
    }

    return this.magnitude > percentABV.magnitude;
  };

  // Determines whether this alcohol concentration is lower than the given alcohol concentration
  isLessThan = (percentABV) => {
    if (!(percentABV instanceof PercentABV)) {
      throw new TypeError('Alcohol concentrations can only be compared with other alcohol concentrations');
    }

    return this.magnitude < percentABV.magnitude;
  }
}
