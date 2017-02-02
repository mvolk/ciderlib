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

import { CELSIUS, FAHRENHEIT, temperatureConversionFunctions } from './temperature';
import { KILOGRAMS, GRAMS, POUNDS, OUNCES, massConversionFunctions } from './mass';

const conversionFunctions = {
  ...temperatureConversionFunctions,
  ...massConversionFunctions,
};

const unitsMap = {
  [CELSIUS.key]: CELSIUS,
  [FAHRENHEIT.key]: FAHRENHEIT,
  [KILOGRAMS.key]: KILOGRAMS,
  [GRAMS.key]: GRAMS,
  [POUNDS.key]: POUNDS,
  [OUNCES.key]: OUNCES,
};

/**
 * Converts a measurement from one unit of measurement to another unit of measurement.
 *
 * @param valueOrObject either the value of the measurement, or an object with `value` and `units`
 *        properties.
 * @param units the units of measurement. Ignored if `valueOrObject` is an object.
 * @return an object with a `to(newUnits)` method that can be used to return the measurement in a
 *        new unit of measurement.
 *
 * @throws TypeError if value is not of type `number`.
 * @throws RangeError if `units` or `newUnits` is not among the supported units of measurement.
 */
function convert(valueOrObject, units) {
  let originalValue = valueOrObject;
  let originalUnits = units;

  if (typeof valueOrObject === 'object') {
    originalValue = valueOrObject.value;
    originalUnits = valueOrObject.units;

    if (typeof originalValue === 'undefined' || typeof originalUnits === 'undefined') {
      throw new TypeError(
        'When providing an object for "valueOrObject", it must define "value" and "units" keys.');
    }
  }

  if (typeof originalValue !== 'number') {
    throw new TypeError('The value must be of type "number"');
  }

  if (unitsMap[originalUnits.key] !== originalUnits) {
    throw new RangeError('Original unit of measurement is not recognized');
  }

  return {
    to: (newUnits) => {
      if (unitsMap[newUnits.key] !== newUnits) {
        throw new RangeError('Target unit of measurement is not recognized');
      }

      const conversionFunction = conversionFunctions[originalUnits.key][newUnits.key];
      if (!conversionFunction) {
        throw new RangeError(
          `Conversion from ${originalUnits.label} to ${newUnits.label} not supported`);
      }

      return conversionFunction(originalValue);
    },
  };
}

export {
  CELSIUS,
  FAHRENHEIT,
  KILOGRAMS,
  GRAMS,
  POUNDS,
  OUNCES,
};

export default {
  ...unitsMap,
  convert,
};
