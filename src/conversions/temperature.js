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

export const CELSIUS = {
  key: 'celsius',
  label: '°C',
  name: 'Celsius',
};

export const FAHRENHEIT = {
  key: 'fahrenheit',
  label: '°F',
  name: 'Fahrenheit',
};

export const supportedUnits = [
  CELSIUS,
  FAHRENHEIT,
];

const fromCelsiusTo = {};
fromCelsiusTo[CELSIUS.key] = t => t;
fromCelsiusTo[FAHRENHEIT.key] = t => (((9 * t) / 5) + 32);

const fromFahrenheitTo = {};
fromFahrenheitTo[CELSIUS.key] = t => ((5 * (t - 32)) / 9);
fromFahrenheitTo[FAHRENHEIT.key] = t => t;

const conversionFn = {};
conversionFn[FAHRENHEIT.key] = fromFahrenheitTo;
conversionFn[CELSIUS.key] = fromCelsiusTo;

export default function temperature(value, units) {
  assert(value, 'temperature').is.a.finite.number();
  assert(units, 'temperature units').is.in.array(supportedUnits);

  return {
    in: (newUnits) => {
      assert(newUnits, 'temperature units').is.in.array(supportedUnits);

      return conversionFn[units.key][newUnits.key](value);
    },
  };
}