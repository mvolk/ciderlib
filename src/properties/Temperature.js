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

class Temperature {
  static CELSIUS = {
    key: 'celsius',
    label: '°C',
    name: 'Celsius',
  };

  static FAHRENHEIT = {
    key: 'fahrenheit',
    label: '°F',
    name: 'Fahrenheit',
  };

  static CONVERSION_FUNCTION = {
    [Temperature.FAHRENHEIT.key]: {
      [Temperature.CELSIUS.key]: t => ((5 * (t - 32)) / 9),
      [Temperature.FAHRENHEIT.key]: t => t,
    },
    [Temperature.CELSIUS.key]: {
      [Temperature.CELSIUS.key]: t => t,
      [Temperature.FAHRENHEIT.key]: t => (((9 * t) / 5) + 32),
    },
  };

  constructor(magnitude, units) {
    if (typeof magnitude !== 'number') {
      throw new TypeError('The magnitude of a temperature must be number.');
    }

    if (Number.isNaN(magnitude)) {
      throw new TypeError('The magnitude of a temperature must be number.');
    }

    if (!Number.isFinite(magnitude)) {
      throw new RangeError('The magnitude of a temperature must be finite.');
    }

    this.magnitude = magnitude;
    this.units = units;
  }

  // Returns the magnitude of this temperature in given units
  inUnits = (units) => {
    const fn = Temperature.CONVERSION_FUNCTION[this.units.key][units.key];
    if (!fn) {
      throw new TypeError(`Unable to express temperature in ${units.name || 'invalid units of measurement'}`);
    }

    return fn(this.magnitude);
  };

  // Determines whether this temperature is higher than the given temperature
  isGreaterThan = (temperature) => {
    if (!(temperature instanceof Temperature)) {
      throw new TypeError('Temperatures can only be compared with other temperatures');
    }

    return this.magnitude > temperature.inUnits(this.units);
  };

  // Determines whether this temperature is lower than the given temperature
  isLessThan = (temperature) => {
    if (!(temperature instanceof Temperature)) {
      throw new TypeError('Temperatures can only be compared with other temperatures');
    }

    return this.magnitude < temperature.inUnits(this.units);
  }
}

export default Temperature;
