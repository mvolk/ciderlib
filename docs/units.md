# [CiderLib](../README.md) (since v1.3.0)

## Units API

Defines supported units of measurement and a function to convert between
units of measurement.

Usage example:
```JavaScript
import units, { CELSIUS, FAHRENHEIT } from 'ciderlib/units';

CELSIUS.key;   // -> 'celsius'
CELSIUS.name;  // -> 'Celsius'
CELSIUS.label; // -> '°C'

units.celsius;      // -> CELSIUS
units[CELSIUS.key]; // -> CELSIUS

units.convert(0, CELSIUS).to(FAHRENHEIT); // -> 32

const boiling = { value: 100, units: CELSIUS };
units.convert(boiling).to(FAHRENHEIT);    // -> 212

```

#### Supported Units of Measurement

| **UoM**            | **Key**     | **Name**         | **Label**  | **Note**  |
| ------------------ | ----------- | ---------------- | ---------- | --------- |
| `CELSIUS`          | celsius     | Celsius          | &deg;C     |           |
| `FAHRENHEIT`       | fahrenheit  | Fahrenheit       | &deg;F     |           |
| `KILOGRAMS`        | kilograms   | Kilograms        | kg         |           |
| `GRAMS`            | grams       | Grams            | g          |           |
| `POUNDS`           | pounds      | Pounds           | lb         | US        |
| `OUNCES`           | ounces      | Ounces           | oz         | US        |
| `LITERS`           | liters      | Liters           | l          |           |
| `MILLILITERS`      | milliliters | Milliliters      | ml         |           |
| `US_GALLONS`       | usgallons   | US Gallons       | gal (US)   | US        |
| `BRIX`             | brix        | Brix             | &deg;Bx    |           |
| `SPECIFIC_GRAVITY` | sg          | Specific Gravity |            | Unit-less measure of density. |


### convert(valueOrObject, units).to(newUnits)

Converts between units of measurement.

* `valueOrObject` - A value in the given units, or an object with 'value' and 'units' properties.
* `units` - The units in which `value` is expressed.
* `newUnits` - The units in which you want to express `value`.

Notes:
1. The type of `value` must be `number`. An error will be thrown otherwise.
2. Both `units` and `newUnits` must be a value from `units`. For example, `units.FAHRENHEIT`
   is valid, but the string value "fahrenheit" is not. An error will be thrown if the units are not
   supported.
3. It must be possible to convert between the original `units` and the
   `newUnits`. An error will be thrown otherwise.
4. When converting between degrees Brix and specific gravity, it is assumed
   that the solution described is a pure solution of water and sucrose. This
   is a reasonably practical approximation of most apple juice.
