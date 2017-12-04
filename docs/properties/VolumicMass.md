# [CiderLib](../../README.md) (since v3.0.0)

## `VolumicMass`

Models the mass of a substance within in a given volume. Can be used to describe density or
concentration.

Example usage:

```JavaScript
import { Mass, Volume, VolumicMass } from 'ciderlib';

// Represent a volumic mass
const concentration = new VolumicMass(new Mass(3, Mass.POUNDS), new Volume(1, Volume.US_GALLONS));

// Obtain the numeric value of a VolumicMass instance for direct use in calculations
concentration.inUnits(Mass.GRAMS, Volume.LITERS); // -> Number: 359.479

// Compare to other volumic masses
const referenceConcentration =
  new VolumicMass(new Mass(400, Mass.GRAMS), new Volume(1, Volume.LITERS));
concentration.isGreaterThan(referenceConcentration); // -> false
concentration.isLessThan(referenceConcentration); // -> true
```

#### `constructor(mass, volume)`

Initializes an instance of `VolumicMass` to represent the given mass in the given volume. Throws if
the `mass` is not an instance of [`Mass`](./Mass.md), if `volume` is not an instance of
[`Volume`](./Volume.md), or if the volume is zero.

#### `toUnits(massUnits, volumeUnits)`

Returns the value of this volumic mass as raw `Number` expressed in the given units of measurement.

Throws for values of `massUnits` and `volumeUnits` that are not supported.

#### `isGreaterThan(volumicMass)`

Returns a `Boolean` indicating whether this volumic mass is greater than another volumic mass.

Throws for any value of `volumicMass` that is not an instance of `VolumicMass`.

#### `isLessThan(volumicMass)`

Returns a `Boolean` indicating whether this volumic mass is less than another volumic mass.

Throws for any value of `volumicMass` that is not an instance of `VolumicMass`.
