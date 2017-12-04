# [CiderLib](../../README.md) (since v3.0.0)

## `Brix`

Models Brix, a measure of the mass of sugar in a given volume of liquid.

Example usage:

```JavaScript
import { Brix, SpecificGravity } from 'ciderlib';

// Represent a measurement
const measuredBrix = new Brix(2.50);

// Obtain the numeric value of a Brix instance for direct use in calculations
const degreesBrix = measuredBrix.inUnits(Brix.UNITS);

// Compare to other Brix values
measuredBrix.isGreaterThan(new Brix(2.04)); // -> true
measuredBrix.isLessThan(new Brix(2.04)); // -> false

// Convert to Specific Gravity (under some assumptions)
measuredBrix.toSpecificGravity(); // -> SpecificGravity: ~1.0098
```

#### `Brix.UNITS`

The unit of measurement used for Brix.

#### `constructor(magnitude)`

Initializes an instance of `Brix` to represent a specific value. Throws if the `magnitude` is
not a number, infinite or negative.
 
#### `toSpecificGravity()`

Returns the [`SpecificGravity`](./SpecificGravity.md) of the solution with this Brix. Assumes that
the solution is solely of water and sucrose and that it is at 20°C (since the relationship between
water's temperature and volume changes with sugar content). Accurate to within ±0.0000035
(±0.0035°SG) under these assumptions for Brix up to 44°Bx. The water/sucrose assumption holds
moderately well for cider prior to fermentation.

This method employs a regression formula from Claude Jolicoeur's The New Cidermaker's Handbook,
chapter 8. That formula is a third-order regression based on the NBS C440 table.
See http://www.boulder.nist.gov/div838/SelectedPubs/Circular%20440%20Table%20114.pdf

Throws if this Brix value exceeds 44°Bx.

#### `toUnits(units)`

Returns the value of the Brix measurement as raw `Number` expressed in the given units of
measurement.

Throws for any value of `units` other than `Brix.UNITS` and `SpecificGravity.UNITS`.

#### `isGreaterThan(brix)`

Returns a `Boolean` indicating whether this Brix value is higher than another Brix value.

Throws for any value of `brix` that is not an instance of `Brix`.

#### `isLessThan(brix)`

Returns a `Boolean` indicating whether this Brix value is lower than another Brix value.

Throws for any value of `brix` that is not an instance of `Brix`.
