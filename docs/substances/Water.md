# [CiderLib](../../README.md) (since v3.0.0)

## `Water`

Properties of pure water under standard pressure.

Example usage:
```JavaScript
import { Water } from 'ciderlib';

// Freezing and boiling points
Water.BOILING_POINT;  // -> Temperature: 100°C
Water.FREEZING_POINT; // -> Temperature: 0°C

// Obtain the density of water at 4°C
water.density(4);     // -> VolumicMass: 1000 g/L
```

#### `BOILING_POINT`

The boiling point of pure water, under standard pressure, represented with an instance of
[Temperature](../properties/Temperature.md).

#### `FREEZING_POINT`

The freezing point of pure water, under standard pressure, represented with an instance of
[Temperature](../properties/Temperature.md).

#### `density(temperature)`

Calculates the density of pure water under standard pressure at a given temperature. Returns a
[VolumicMass](../properties/VolumicMass.md) representing the density. The result is accurate
to within ±0.1 g/L.
