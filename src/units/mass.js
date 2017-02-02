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

export const KILOGRAMS = {
  key: 'kilograms',
  label: 'kg',
  name: 'Kilograms',
};

export const GRAMS = {
  key: 'grams',
  label: 'g',
  name: 'Grams',
};

export const POUNDS = {
  key: 'pounds',
  label: 'lb',
  name: 'Pounds',
};

export const OUNCES = {
  key: 'ounces',
  label: 'oz',
  name: 'Ounces',
};

// The following conversion factors are exact
const KILOGRAMS_PER_POUND = 0.45359237;
const KILOGRAMS_PER_OUNCE = 0.028349523125;
const GRAMS_PER_KILOGRAM = 1000.0;
const GRAMS_PER_POUND = 453.59237;
const GRAMS_PER_OUNCE = 28.349523125;
const OUNCES_PER_POUND = 16.0;

export const massConversionFunctions = {
  [KILOGRAMS.key]: {
    [KILOGRAMS.key]: kg => kg,
    [GRAMS.key]: kg => kg * GRAMS_PER_KILOGRAM,
    [POUNDS.key]: kg => kg / KILOGRAMS_PER_POUND,
    [OUNCES.key]: kg => kg / KILOGRAMS_PER_OUNCE,
  },
  [GRAMS.key]: {
    [KILOGRAMS.key]: g => g / GRAMS_PER_KILOGRAM,
    [GRAMS.key]: g => g,
    [POUNDS.key]: g => g / GRAMS_PER_POUND,
    [OUNCES.key]: g => g / GRAMS_PER_OUNCE,
  },
  [POUNDS.key]: {
    [KILOGRAMS.key]: lb => lb * KILOGRAMS_PER_POUND,
    [GRAMS.key]: lb => lb * GRAMS_PER_POUND,
    [POUNDS.key]: lb => lb,
    [OUNCES.key]: lb => lb * OUNCES_PER_POUND,
  },
  [OUNCES.key]: {
    [KILOGRAMS.key]: oz => oz * KILOGRAMS_PER_OUNCE,
    [GRAMS.key]: oz => oz * GRAMS_PER_OUNCE,
    [POUNDS.key]: oz => oz / OUNCES_PER_POUND,
    [OUNCES.key]: oz => oz,
  },
};
