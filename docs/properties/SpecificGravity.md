# [CiderLib](../../README.md) (since v3.0.0)

## `SpecificGravity`

Models specific gravity, a measure of the ratio of the volumic density of a fluid and the volumic
density of pure water at the same temperature and pressure.

Example usage:

```JavaScript
import { Brix, SpecificGravity } from 'ciderlib';

// Represent a measurement
const sg = new SpecificGravity(1.0078);

// Obtain the numeric value of a SpecificGravity instance for direct use in calculations
sg.inUnits(SpecificGravity.UNITS); // -> Number: 1.0078

// Compare to other specific gravity values
sg.isGreaterThan(new SpecificGravity(1.003)); // -> true
sg.isLessThan(new SpecificGravity(1.042)); // -> false

// Convert to Brix (under some assumptions)
sg.toBrix(); // -> Brix: ~2.00
```

#### `SpecificGravity.UNITS`

The primary unit of measurement used for specific gravity.

#### `constructor(magnitude)`

Initializes an instance of `SpecificGravity` to represent a specific value. Throws if the
`magnitude` is not a number, infinite, zero or negative.
 
#### `toBrix()`

Returns the [`Brix`](./Brix.md) of a solution with this specific gravity.

Assumes that the solution is solely of water and sucrose and that it is at 20°C (since the
relationship between water's temperature and volume changes with sugar content). Accurate to
within ±0.002°Bx for Brix up to 40°Bx under these assumptions.

The water/sucrose assumption holds moderately well for cider prior to fermentation.

This method employs a regression formula from https://en.wikipedia.org/wiki/Brix, valid for
specific gravities of less than 1.17875 (40 degrees Brix).

Throws if this specific gravity value exceeds 1.17875.

#### `toUnits(units)`

Returns the value of the specific gravity as raw `Number` expressed in the given units of
measurement.

Throws for any value of `units` other than `Brix.UNITS` and `SpecificGravity.UNITS`.

#### `isGreaterThan(specificGravity)`

Returns a `Boolean` indicating whether this specific gravity is higher than another specific
gravity.

Throws for any value of `specificGravity` that is not an instance of `SpecificGravity`.

#### `isLessThan(specificGravity)`

Returns a `Boolean` indicating whether this specific gravity is higher than another specific
gravity.

Throws for any value of `specificGravity` that is not an instance of `SpecificGravity`.
