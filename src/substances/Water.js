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
import Temperature from '../properties/Temperature';
import Mass from '../properties/Mass';
import Volume from '../properties/Volume';
import VolumicMass from '../properties/VolumicMass';

// The freezing point of pure water under standard pressure
const FREEZING_POINT = new Temperature(0, Temperature.CELSIUS);

// The boiling point of pure water under standard pressure
const BOILING_POINT = new Temperature(100, Temperature.CELSIUS);

/**
 * The density of pure water at a given temperature.
 * Accurate within 0.05 g/L between 10°C and 20°C inclusive.
 */
function density(temperature) {
  if (!(temperature instanceof Temperature)) {
    throw new TypeError('The temperature must be an instance of Temperature');
  }

  if (!temperature.isGreaterThan(FREEZING_POINT)) {
    throw new RangeError('Unable to calculate the density of water at or below freezing.');
  }

  if (!temperature.isLessThan(BOILING_POINT)) {
    throw new RangeError('Unable to calculate the density of water at or above boiling.');
  }

  const degreesC = temperature.inUnits(Temperature.CELSIUS);

  // The following regression was developed using MS Excel and data points cross-verified against
  //  multiple sources. It exhibits very good accuracy from 0°C to 50°C, but accuracy degrades a
  //  little above 50°C. Higher-order polynomials performed only marginally better.
  let gramsPerLiter = polynomial([999.85, 0.0531, -0.0075, 0.00004, -0.0000001], degreesC);

  // This regression provides a correction factor above 50°C that degrades above 70°C
  if (temperature.isGreaterThan(new Temperature(50, Temperature.CELSIUS))) {
    gramsPerLiter -= polynomial([0.0299, 0.0267, -0.0019, 0.00009, -0.0000009], degreesC - 50);
  }

  // This regression provides further correction above 70°C
  if (temperature.isGreaterThan(new Temperature(70, Temperature.CELSIUS))) {
    gramsPerLiter += polynomial([0.0463, 0.0024, 0.0006], degreesC - 70);
  }

  return new VolumicMass(new Mass(gramsPerLiter, Mass.GRAMS), new Volume(1, Volume.LITERS));
}

export default {
  FREEZING_POINT,
  BOILING_POINT,
  density,
};
