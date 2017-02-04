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
  LITERS,
  MILLILITERS,
  US_GALLONS,
  BRIX,
  SPECIFIC_GRAVITY,
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
import {
  LITERS as volumeInLITERS,
  MILLILITERS as volumeInMILLILITERS,
  US_GALLONS as volumeInUSGALLONS,
} from '../../src/units/volume';
import {
  BRIX as sugarContentInBRIX,
  SPECIFIC_GRAVITY as sugarContentInSG,
} from '../../src/units/sugar';

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

  describe('LITERS.key', () => {
    it('maps to LITERS', () => {
      expect(units[LITERS.key]).toBe(LITERS);
    });
  });

  describe('MILLILITERS.key', () => {
    it('maps to MILLILITERS', () => {
      expect(units[MILLILITERS.key]).toBe(MILLILITERS);
    });
  });

  describe('US_GALLONS.key', () => {
    it('maps to US_GALLONS', () => {
      expect(units[US_GALLONS.key]).toBe(US_GALLONS);
    });
  });

  describe('BRIX.key', () => {
    it('maps to BRIX', () => {
      expect(units[BRIX.key]).toBe(BRIX);
    });
  });

  describe('SPECIFIC_GRAVITY.key', () => {
    it('maps to SPECIFIC_GRAVITY', () => {
      expect(units[SPECIFIC_GRAVITY.key]).toBe(SPECIFIC_GRAVITY);
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

      describe('for units of temperature', () => {
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

      describe('for units of mass', () => {
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

      describe('for units of volume', () => {
        it('correctly converts liters to liters', () => {
          expect(units.convert(1, LITERS).to(LITERS)).toEqual(1);
        });

        it('correctly converts liters to milliliters', () => {
          expect(units.convert(1, LITERS).to(MILLILITERS)).toEqual(1000);
        });

        it('correctly converts liters to US gallons', () => {
          expect(units.convert(3.785411784, LITERS).to(US_GALLONS)).toEqual(1);
        });

        it('correctly converts milliliters to liters', () => {
          expect(units.convert(1000, MILLILITERS).to(LITERS)).toEqual(1);
        });

        it('correctly converts milliliters to milliliters', () => {
          expect(units.convert(1, MILLILITERS).to(MILLILITERS)).toEqual(1);
        });

        it('correctly converts milliliters to US gallons', () => {
          expect(units.convert(3785.411784, MILLILITERS).to(US_GALLONS)).toEqual(1);
        });

        it('correctly converts US gallons to liters', () => {
          expect(units.convert(1, US_GALLONS).to(LITERS)).toEqual(3.785411784);
        });

        it('correctly converts US gallons to milliliters', () => {
          expect(units.convert(1, US_GALLONS).to(MILLILITERS)).toEqual(3785.411784);
        });

        it('correctly converts US gallons to US gallons', () => {
          expect(units.convert(1, US_GALLONS).to(US_GALLONS)).toEqual(1);
        });
      });

      describe('for units of sugar content', () => {
        const SG = SPECIFIC_GRAVITY;

        it('correctly converts degrees Brix to degrees Brix', () => {
          expect(units.convert(1, BRIX).to(BRIX)).toEqual(1);
        });

        it('throws a RangeError if converting from Brix less than zero', () => {
          expect(() => units.convert(-0.00000000001, BRIX).to(SG)).toThrowError(RangeError);
        });

        it('throws a RangeError if converting from Brix greater than 44', () => {
          expect(() => units.convert(44.000001, BRIX).to(SG)).toThrowError(RangeError);
        });

        it('correctly converts degrees Brix to specific gravity', () => {
          const tolerance = 0.0000349;

          expect(Math.abs(units.convert(8.78, BRIX).to(SG) - 1.035)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(9.99, BRIX).to(SG) - 1.040)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(10.48, BRIX).to(SG) - 1.042)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(10.96, BRIX).to(SG) - 1.044)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(11.19, BRIX).to(SG) - 1.045)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(11.43, BRIX).to(SG) - 1.046)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(11.67, BRIX).to(SG) - 1.047)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(11.91, BRIX).to(SG) - 1.048)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(12.15, BRIX).to(SG) - 1.049)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(12.39, BRIX).to(SG) - 1.050)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(12.62, BRIX).to(SG) - 1.051)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(12.86, BRIX).to(SG) - 1.052)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(13.10, BRIX).to(SG) - 1.053)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(13.33, BRIX).to(SG) - 1.054)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(13.57, BRIX).to(SG) - 1.055)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(13.80, BRIX).to(SG) - 1.056)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(14.04, BRIX).to(SG) - 1.057)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(14.27, BRIX).to(SG) - 1.058)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(14.51, BRIX).to(SG) - 1.059)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(14.74, BRIX).to(SG) - 1.060)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(14.97, BRIX).to(SG) - 1.061)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(15.21, BRIX).to(SG) - 1.062)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(15.44, BRIX).to(SG) - 1.063)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(15.67, BRIX).to(SG) - 1.064)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(15.90, BRIX).to(SG) - 1.065)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(16.13, BRIX).to(SG) - 1.066)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(16.59, BRIX).to(SG) - 1.068)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(17.05, BRIX).to(SG) - 1.070)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(17.51, BRIX).to(SG) - 1.072)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(18.20, BRIX).to(SG) - 1.075)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(19.33, BRIX).to(SG) - 1.080)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(20.46, BRIX).to(SG) - 1.085)).toBeLessThan(tolerance);
        });

        it('throws a RangeError if converting from SG greater than 1.17875', () => {
          expect(() => units.convert(1.178751, SG).to(BRIX)).toThrowError(RangeError);
        });

        it('never returns a negative value when converting SG to Brix', () => {
          expect(units.convert(0.990, SG).to(BRIX)).toBe(0);
          expect(units.convert(1.001, SG).to(BRIX)).toBeGreaterThan(0);
          for (let sg = 0.990; sg < 1.01; sg += 0.0001) {
            expect(units.convert(sg, BRIX).to(SG)).toBeGreaterThanOrEqual(0);
          }
        });

        it('correctly converts specific gravity to degrees Brix', () => {
          const tolerance = 0.0015;

          expect(units.convert(1.00000, SG).to(BRIX)).toBe(0.0);
          expect(Math.abs(units.convert(1.00390, SG).to(BRIX) - 1.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.00780, SG).to(BRIX) - 2.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.01173, SG).to(BRIX) - 3.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.01569, SG).to(BRIX) - 4.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.01968, SG).to(BRIX) - 5.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.02369, SG).to(BRIX) - 6.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.02773, SG).to(BRIX) - 7.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.03180, SG).to(BRIX) - 8.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.03590, SG).to(BRIX) - 9.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.04003, SG).to(BRIX) - 10.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.04418, SG).to(BRIX) - 11.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.04837, SG).to(BRIX) - 12.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.05259, SG).to(BRIX) - 13.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.05683, SG).to(BRIX) - 14.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.06111, SG).to(BRIX) - 15.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.06542, SG).to(BRIX) - 16.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.06976, SG).to(BRIX) - 17.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.07413, SG).to(BRIX) - 18.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.07853, SG).to(BRIX) - 19.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.08297, SG).to(BRIX) - 20.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.08744, SG).to(BRIX) - 21.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.09194, SG).to(BRIX) - 22.0)).toBeLessThan(tolerance);
          expect(Math.abs(units.convert(1.09647, SG).to(BRIX) - 23.0)).toBeLessThan(tolerance);
        });

        it('correctly converts specific gravity to specific gravity', () => {
          expect(units.convert(1, SG).to(SG)).toEqual(1);
        });
      });
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

describe('LITERS', () => {
  it('is equivalent to volume.LITERS', () => {
    expect(LITERS).toBe(volumeInLITERS);
  });
});

describe('MILLILITERS', () => {
  it('is equivalent to volume.MILLILITERS', () => {
    expect(MILLILITERS).toBe(volumeInMILLILITERS);
  });
});

describe('US_GALLONS', () => {
  it('is equivalent to volume.US_GALLONS', () => {
    expect(US_GALLONS).toBe(volumeInUSGALLONS);
  });
});

describe('BRIX', () => {
  it('is equivalent to sugar.BRIX', () => {
    expect(BRIX).toBe(sugarContentInBRIX);
  });
});

describe('SPECIFIC_GRAVITY', () => {
  it('is equivalent to sugar.SPECIFIC_GRAVITY', () => {
    expect(SPECIFIC_GRAVITY).toBe(sugarContentInSG);
  });
});
