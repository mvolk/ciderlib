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

import assert from '../assert';
import water from '../substances/water';

/** Models a Hydrometer with a known calibration temperature. */
export default class Hydrometer {
  /**
   * Constructor.
   *
   * @param calibrationTemperature the calibration temperature of this hydrometer in degrees
   *                               Celsius. Hydrometers are typically calibrated at 15°C (59 °F)
   *                               or 20°C (68°F).
   *
   * @throws TypeError or RangeError if the calibration temperature is not a finite number
   * @throws RangeError if the calibration temperature is below freezing or above boiling
   */
  constructor(calibrationTemperature) {
    this.referenceDensity = water.density(calibrationTemperature);
    this.correctedReading.bind(this);
  }

  /**
   * Correct readings taken with this hydrometer for temperature.
   *
   * @param reading measured specific gravity of the fluid, before correcting for temperature
   * @param temperature measured temperature of the fluid
   *
   * @throws TypeError if the reading or temperature is not a finite number
   * @throws RangeError if the reading is less than zero
   * @throws RangeError if the temperature is below freezing or above boiling
   */
  correctedReading(reading, temperature) {
    assert(reading, 'specific gravity reading').is.a.finite.number();
    assert(temperature, 'temperature').is.a.finite.number();

    if (temperature < water.FREEZING_POINT || temperature > water.BOILING_POINT) {
      throw new RangeError('temperature must be between freezing and boiling');
    }

    if (reading <= 0) {
      throw new RangeError('specific gravity reading must be greater than zero');
    }

    return (this.referenceDensity / water.density(temperature)) * reading;
  }
}
