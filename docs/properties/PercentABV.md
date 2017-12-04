# [CiderLib](../../README.md) (since v3.0.0)

## `PercentABV`

Models alcohol content measured as a percentage by volume.

Example usage:

```JavaScript
import { PercentABV } from 'ciderlib';

// Represent a volume
const abv = new PercentABV(6.3);

// Obtain the numeric value of a PercentABV instance for direct use in calculations
abv.inUnits(PercentABV.UNITS); // -> Number: 6.3

// Compare to other ABV values
abv.isGreaterThan(new PercentABV(6.2)); // -> true
abv.isLessThan(new PercentABV(6.1)); // -> false
```

#### `PercentABV.UNITS`

The unit of measurement used for alcohol content as a percentage of volume.

#### `constructor(magnitude)`

Initializes an instance of `PercentABV` to represent a specific value. Throws if the
`magnitude` is not a number, infinite or negative.

#### `toUnits(units)`

Returns the value of this ABV as raw `Number` expressed in the given units of measurement.

Throws for values of `units` that are not supported.

#### `isGreaterThan(percentABV)`

Returns a `Boolean` indicating whether this alcohol concentration is greater than another alcohol
concentration.

Throws for any value of `percentABV` that is not an instance of `PercentABV`.

#### `isLessThan(percentABV)`

Returns a `Boolean` indicating whether this alcohol concentration is less than another alcohol
concentration.

Throws for any value of `percentABV` that is not an instance of `PercentABV`.
