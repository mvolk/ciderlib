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

import SpecificGravity from '../properties/SpecificGravity';
import Temperature from '../properties/Temperature';
import Mass from '../properties/Mass';
import Volume from '../properties/Volume';
import Water from '../substances/Water';

/**
 * Correct a hydrometer reading for temperature given the measured specific
 * gravity of the fluid (before correcting for temperature), the temperature of the fluid, and
 * the calibration temperature of the hydrometer.
 */
function correctedReading(reading, temperature, calibrationTemperature) {
  if (!(reading instanceof SpecificGravity)) {
    throw new TypeError('The reading must be an instance of SpecificGravity');
  }

  if (!(temperature instanceof Temperature)) {
    throw new TypeError('The temperature must be an instance of Temperature');
  }

  if (!temperature.isGreaterThan(Water.FREEZING_POINT)) {
    throw new RangeError('Unable to correct hydrometer readings taken at or below freezing.');
  }

  if (!temperature.isLessThan(Water.BOILING_POINT)) {
    throw new RangeError('Unable to correct hydrometer readings taken at or above boiling.');
  }

  if (!(calibrationTemperature instanceof Temperature)) {
    throw new TypeError('The calibrationTemperature must be an instance of Temperature');
  }

  if (!calibrationTemperature.isGreaterThan(Water.FREEZING_POINT)) {
    throw new RangeError('Hydrometers calibrated for temperatures at or below freezing are not supported.');
  }

  if (!calibrationTemperature.isLessThan(Water.BOILING_POINT)) {
    throw new RangeError('Hydrometers calibrated for temperatures at or above boiling are not supported.');
  }

  const densityOfWaterAtCalibrationTemperature = Water
    .density(calibrationTemperature)
    .inUnits(Mass.GRAMS, Volume.LITERS);

  const densityOfWaterAtActualTemperature = Water
    .density(temperature)
    .inUnits(Mass.GRAMS, Volume.LITERS);

  const correctionFactor =
    (densityOfWaterAtCalibrationTemperature / densityOfWaterAtActualTemperature);

  return new SpecificGravity(correctionFactor * reading.inUnits(SpecificGravity.UNITS));
}

export default {
  correctedReading,
};
