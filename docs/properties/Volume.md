# [CiderLib](../../README.md) (since v3.0.0)

## `Volume`

Models volume.

Example usage:

```JavaScript
import { Volume } from 'ciderlib';

// Represent a volume
const volume = new Volume(0.5, Volume.LITERS);

// Obtain the numeric value of a Volume instance for direct use in calculations
volume.inUnits(Volume.MILLILITERS); // -> Number: 500

// Compare to other volumes
volume.isGreaterThan(new Volume(750, Volume.MILLILITERS)); // -> false
volume.isLessThan(new Volume(1, Volume.US_GALLONS)); // -> true
```

#### `Volume.MILLILITERS`

A unit of measurement used for volumes.

#### `Volume.LITERS`

A unit of measurement used for volumes.

#### `Volume.US_GALLONS`

A unit of measurement used for volumes.

#### `constructor(magnitude, units)`

Initializes an instance of `Volume` to represent a specific value with given units. Throws if the
`magnitude` is not a number, infinite or negative.

#### `toUnits(units)`

Returns the value of this volume as raw `Number` expressed in the given units of measurement.

Throws for values of `units` that are not supported.

#### `isGreaterThan(volume)`

Returns a `Boolean` indicating whether this volume is greater than another volume.

Throws for any value of `volume` that is not an instance of `Volume`.

#### `isLessThan(volume)`

Returns a `Boolean` indicating whether this volume is less than another volume.

Throws for any value of `volume` that is not an instance of `Volume`.
