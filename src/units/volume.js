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

export const LITERS = {
  key: 'liters',
  label: 'l',
  name: 'Liters',
};

export const MILLILITERS = {
  key: 'milliliters',
  label: 'ml',
  name: 'Milliliters',
};

export const US_GALLONS = {
  key: 'usgallons',
  label: 'gal (US)',
  name: 'US Gallons',
};

const LITERS_PER_US_GALLON = 3.785411784;
const MILLILITERS_PER_LITER = 1000.0;
const MILLILITERS_PER_US_GALLON = 3785.411784;

export const volumeConversionFunctions = {
  [LITERS.key]: {
    [LITERS.key]: l => l,
    [MILLILITERS.key]: l => l * MILLILITERS_PER_LITER,
    [US_GALLONS.key]: l => l / LITERS_PER_US_GALLON,
  },
  [MILLILITERS.key]: {
    [LITERS.key]: ml => ml / MILLILITERS_PER_LITER,
    [MILLILITERS.key]: ml => ml,
    [US_GALLONS.key]: ml => ml / MILLILITERS_PER_US_GALLON,
  },
  [US_GALLONS.key]: {
    [LITERS.key]: gal => gal * LITERS_PER_US_GALLON,
    [MILLILITERS.key]: gal => gal * MILLILITERS_PER_US_GALLON,
    [US_GALLONS.key]: gal => gal,
  },
};
