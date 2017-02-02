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

import units, {
  CELSIUS,
  FAHRENHEIT,
  KILOGRAMS,
  GRAMS,
  POUNDS,
  OUNCES,
} from '../../src/units';
import {
  CELSIUS as temperatureInCELSIUS,
  FAHRENHEIT as temperatureInFAHRENHEIT,
} from '../../src/units/temperature';
import {
  KILOGRAMS as massInKILOGRAMS,
  GRAMS as massInGRAMS,
  POUNDS as massInPOUNDS,
  OUNCES as massInOUNCES,
} from '../../src/units/mass';

describe('units', () => {
  describe('CELSIUS.key', () => {
    it('maps to CELSIUS', () => {
      expect(units[CELSIUS.key]).toBe(CELSIUS);
    });
  });

  describe('FAHRENHEIT.key', () => {
    it('maps to FAHRENHEIT', () => {
      expect(units[FAHRENHEIT.key]).toBe(FAHRENHEIT);
    });
  });

  describe('KILOGRAMS.key', () => {
    it('maps to KILOGRAMS', () => {
      expect(units[KILOGRAMS.key]).toBe(KILOGRAMS);
    });
  });

  describe('GRAMS.key', () => {
    it('maps to GRAMS', () => {
      expect(units[GRAMS.key]).toBe(GRAMS);
    });
  });

  describe('POUNDS.key', () => {
    it('maps to POUNDS', () => {
      expect(units[POUNDS.key]).toBe(POUNDS);
    });
  });

  describe('OUNCES.key', () => {
    it('maps to OUNCES', () => {
      expect(units[OUNCES.key]).toBe(OUNCES);
    });
  });

  describe('convert(valueOrObject, units)', () => {
    const KELVIN = {
      key: 'kelvin',
      label: '°K',
      name: 'Kelvin',
    };

    describe('when passed an object', () => {
      it('throws a TypeError if valueOrObject.value is not a number', () => {
        expect(() => units.convert({ value: '20', units: CELSIUS })).toThrowError(TypeError);
        expect(() => units.convert({ value: {}, units: CELSIUS })).toThrowError(TypeError);
        expect(() => units.convert({ value: [], units: CELSIUS })).toThrowError(TypeError);
        expect(() => units.convert({ value: () => {}, units: CELSIUS })).toThrowError(TypeError);
      });

      it('throws a RangeError if the units are not supported', () => {
        expect(() => units.convert({ value: 273, units: KELVIN })).toThrowError(RangeError);
      });

      it('ignores the units parameter', () => {
        expect(() => units.convert({ value: 273, units: KELVIN }, CELSIUS))
          .toThrowError(RangeError);
      });
    });

    describe('when passed a value and units', () => {
      it('throws a TypeError if the value is not a number', () => {
        expect(() => units.convert('20', CELSIUS)).toThrowError(TypeError);
        expect(() => units.convert({}, CELSIUS)).toThrowError(TypeError);
        expect(() => units.convert([], CELSIUS)).toThrowError(TypeError);
        expect(() => units.convert(() => {}, CELSIUS)).toThrowError(TypeError);
      });

      it('throws a RangeError if the units are not supported', () => {
        expect(() => units.convert(273, KELVIN)).toThrowError(RangeError);
      });
    });

    describe('in(newUnits)', () => {
      it('throws a RangeError if newUnits are not supported', () => {
        expect(() => units.convert(0, CELSIUS).to(KELVIN)).toThrowError(RangeError);
      });

      it('throws a RangeError if a conversion function is not available', () => {
        expect(() => units.convert(0, CELSIUS).to(OUNCES)).toThrowError(RangeError);
      });

      it('correctly converts celsius to celsius', () => {
        expect(units.convert(0, CELSIUS).to(CELSIUS)).toEqual(0);
        expect(units.convert(15, CELSIUS).to(CELSIUS)).toEqual(15);
        expect(units.convert(20, CELSIUS).to(CELSIUS)).toEqual(20);
        expect(units.convert(100, CELSIUS).to(CELSIUS)).toEqual(100);
        expect(units.convert({ value: 0, units: CELSIUS }).to(CELSIUS)).toEqual(0);
        expect(units.convert({ value: 15, units: CELSIUS }).to(CELSIUS)).toEqual(15);
        expect(units.convert({ value: 20, units: CELSIUS }).to(CELSIUS)).toEqual(20);
        expect(units.convert({ value: 100, units: CELSIUS }).to(CELSIUS)).toEqual(100);
      });

      it('correctly converts celsius to fahrenheit', () => {
        expect(units.convert(0, CELSIUS).to(FAHRENHEIT)).toEqual(32);
        expect(units.convert(15, CELSIUS).to(FAHRENHEIT)).toEqual(59);
        expect(units.convert(20, CELSIUS).to(FAHRENHEIT)).toEqual(68);
        expect(units.convert(100, CELSIUS).to(FAHRENHEIT)).toEqual(212);
        expect(units.convert({ value: 0, units: CELSIUS }).to(FAHRENHEIT)).toEqual(32);
        expect(units.convert({ value: 15, units: CELSIUS }).to(FAHRENHEIT)).toEqual(59);
        expect(units.convert({ value: 20, units: CELSIUS }).to(FAHRENHEIT)).toEqual(68);
        expect(units.convert({ value: 100, units: CELSIUS }).to(FAHRENHEIT)).toEqual(212);
      });

      it('correctly converts fahrenheit to celsius', () => {
        expect(units.convert(32, FAHRENHEIT).to(CELSIUS)).toEqual(0);
        expect(units.convert(59, FAHRENHEIT).to(CELSIUS)).toEqual(15);
        expect(units.convert(68, FAHRENHEIT).to(CELSIUS)).toEqual(20);
        expect(units.convert(212, FAHRENHEIT).to(CELSIUS)).toEqual(100);
        expect(units.convert({ value: 32, units: FAHRENHEIT }).to(CELSIUS)).toEqual(0);
        expect(units.convert({ value: 59, units: FAHRENHEIT }).to(CELSIUS)).toEqual(15);
        expect(units.convert({ value: 68, units: FAHRENHEIT }).to(CELSIUS)).toEqual(20);
        expect(units.convert({ value: 212, units: FAHRENHEIT }).to(CELSIUS)).toEqual(100);
      });

      it('correctly converts fahrenheit to fahrenheit', () => {
        expect(units.convert(32, FAHRENHEIT).to(FAHRENHEIT)).toEqual(32);
        expect(units.convert(59, FAHRENHEIT).to(FAHRENHEIT)).toEqual(59);
        expect(units.convert(68, FAHRENHEIT).to(FAHRENHEIT)).toEqual(68);
        expect(units.convert(212, FAHRENHEIT).to(FAHRENHEIT)).toEqual(212);
        expect(units.convert({ value: 32, units: FAHRENHEIT }).to(FAHRENHEIT)).toEqual(32);
        expect(units.convert({ value: 59, units: FAHRENHEIT }).to(FAHRENHEIT)).toEqual(59);
        expect(units.convert({ value: 68, units: FAHRENHEIT }).to(FAHRENHEIT)).toEqual(68);
        expect(units.convert({ value: 212, units: FAHRENHEIT }).to(FAHRENHEIT)).toEqual(212);
      });
    });

    it('correctly converts kilograms to kilograms', () => {
      expect(units.convert(1, KILOGRAMS).to(KILOGRAMS)).toEqual(1);
    });

    it('correctly converts kilograms to grams', () => {
      expect(units.convert(1, KILOGRAMS).to(GRAMS)).toEqual(1000);
    });

    it('correctly converts kilograms to pounds', () => {
      expect(units.convert(0.45359237, KILOGRAMS).to(POUNDS)).toEqual(1);
    });

    it('correctly converts kilograms to ounces', () => {
      expect(units.convert(0.028349523125, KILOGRAMS).to(OUNCES)).toEqual(1);
    });

    it('correctly converts grams to kilograms', () => {
      expect(units.convert(1000, GRAMS).to(KILOGRAMS)).toEqual(1);
    });

    it('correctly converts grams to grams', () => {
      expect(units.convert(1, GRAMS).to(GRAMS)).toEqual(1);
    });

    it('correctly converts grams to pounds', () => {
      expect(units.convert(453.59237, GRAMS).to(POUNDS)).toEqual(1);
    });

    it('correctly converts grams to ounces', () => {
      expect(units.convert(28.349523125, GRAMS).to(OUNCES)).toEqual(1);
    });

    it('correctly converts pounds to kilograms', () => {
      expect(units.convert(1, POUNDS).to(KILOGRAMS)).toEqual(0.45359237);
    });

    it('correctly converts pounds to grams', () => {
      expect(units.convert(1, POUNDS).to(GRAMS)).toEqual(453.59237);
    });

    it('correctly converts pounds to pounds', () => {
      expect(units.convert(1, POUNDS).to(POUNDS)).toEqual(1);
    });

    it('correctly converts pounds to ounces', () => {
      expect(units.convert(1, POUNDS).to(OUNCES)).toEqual(16);
    });

    it('correctly converts ounces to kilograms', () => {
      expect(units.convert(1, OUNCES).to(KILOGRAMS)).toEqual(0.028349523125);
    });

    it('correctly converts ounces to grams', () => {
      expect(units.convert(1, OUNCES).to(GRAMS)).toEqual(28.349523125);
    });

    it('correctly converts ounces to pounds', () => {
      expect(units.convert(16, OUNCES).to(POUNDS)).toEqual(1);
    });

    it('correctly converts ounces to ounces', () => {
      expect(units.convert(1, OUNCES).to(OUNCES)).toEqual(1);
    });
  });
});

describe('CELSIUS', () => {
  it('is equivalent to temperature.CELSIUS', () => {
    expect(CELSIUS).toBe(temperatureInCELSIUS);
  });
});

describe('FAHRENHEIT', () => {
  it('is equivalent to temperature.FAHRENHEIT', () => {
    expect(FAHRENHEIT).toBe(temperatureInFAHRENHEIT);
  });
});

describe('KILOGRAMS', () => {
  it('is equivalent to mass.KILOGRAMS', () => {
    expect(KILOGRAMS).toBe(massInKILOGRAMS);
  });
});

describe('GRAMS', () => {
  it('is equivalent to mass.GRAMS', () => {
    expect(GRAMS).toBe(massInGRAMS);
  });
});

describe('POUNDS', () => {
  it('is equivalent to mass.POUNDS', () => {
    expect(POUNDS).toBe(massInPOUNDS);
  });
});

describe('OUNCES', () => {
  it('is equivalent to mass.OUNCES', () => {
    expect(OUNCES).toBe(massInOUNCES);
  });
});
