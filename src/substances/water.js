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
import assert from '../assert';

// The freezing point of pure water under standard pressure, expressed in degrees Celsius
const FREEZING_POINT = 0;

// The boiling point of pure water under standard pressure, expressed in degrees Celsius
const BOILING_POINT = 100;

/**
 * The density of pure water at a given temperature.
 *
 * Accurate to within 0.1 g/L between 0°C and 100°C. Accurate within 0.05 g/L between 10°C and 20°C
 * inclusive.
 *
 * @param temperature of the water, between freezing and boiling inclusive, in degrees Celsius.
 * @return the density of pure water at the given temperature, in grams per liter (g/L).
 *
 * @throws TypeError if temperature is not a finite number
 * @throws RangeError if temperature is below freezing or above boiling
 */
function density(temperature) {
  assert(temperature, 'temperature').is.a.finite.number();

  if (temperature < FREEZING_POINT || temperature > BOILING_POINT) {
    throw new RangeError(
      'temperature must be between freezing and boiling, in degrees C, inclusive.');
  }

  // The following regression was developed using MS Excel and datapoints cross-verified against
  //  multiple sources. It exhibits very good accuracy from 0°C to 50°C, but accuracy degrades a
  //  little above 50°C.
  // Higher-order polynomials performed only marginally better.
  let gramsPerLiter = polynomial([999.85, 0.0531, -0.0075, 0.00004, -0.0000001], temperature);

  // This regression provides a correction factor above 50°C that degrades above 70°C
  if (temperature > 50) {
    gramsPerLiter -= polynomial([0.0299, 0.0267, -0.0019, 0.00009, -0.0000009], temperature - 50);
  }

  // This regression provides further correction above 70°C
  if (temperature > 70) {
    gramsPerLiter += polynomial([0.0463, 0.0024, 0.0006], temperature - 70);
  }

  return gramsPerLiter;
}

export default {
  FREEZING_POINT,
  BOILING_POINT,
  density,
};
