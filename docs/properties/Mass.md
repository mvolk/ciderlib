# [CiderLib](../../README.md) (since v3.0.0)

## `Mass`

Models mass.

Example usage:

```JavaScript
import { Mass } from 'ciderlib';

// Represent a mass
const mass = new Mass(24, Mass.GRAMS);

// Obtain the numeric value of a Mass instance for direct use in calculations
mass.inUnits(Mass.KILOGRAMS); // -> Number: 0.024

// Compare to other masses
mass.isGreaterThan(new Mass(0.023, Mass.KILOGRAMS)); // -> true
mass.isLessThan(new Mass(23, Mass.GRAMS)); // -> false
```

#### `Mass.GRAMS`

A unit of measurement used for masses.

#### `Mass.KILOGRAMS`

A unit of measurement used for masses.

#### `Mass.POUNDS`

A unit of measurement used for masses.

#### `Mass.OUNCES`

A unit of measurement used for masses.

#### `constructor(magnitude, units)`

Initializes an instance of `Mass` to represent a specific value with given units. Throws if the
`magnitude` is not a number, infinite or negative.

#### `toUnits(units)`

Returns the value of this mass as raw `Number` expressed in the given units of measurement.

Throws for values of `units` that are not supported.

#### `isGreaterThan(mass)`

Returns a `Boolean` indicating whether this mass is greater than another mass.

Throws for any value of `mass` that is not an instance of `Mass`.

#### `isLessThan(mass)`

Returns a `Boolean` indicating whether this mass is less than another mass.

Throws for any value of `mass` that is not an instance of `Mass`.
