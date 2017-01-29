# [CiderLib](../README.md) (since v0.1.0)

## Water API

Properties of pure water under standard pressure.

Example usage:
```JavaScript
import { water } from 'ciderlib';

// Freezing and boiling points in °C
water.BOILING_POINT;  // -> 100
water.FREEZING_POINT; // -> 0

// Obtain the density of water (in g/L) at 4°C
water.density(4);     // -> 1000
```

#### BOILING_POINT

The boiling point of pure water, under standard pressure, in &deg;C.

#### FREEZING_POINT

The freezing point of pure water, under standard pressure, in &deg;C.

#### density(temperature)

Calculates the density of pure water under standard pressure at a given
temperature.

* `temperature` - (Number between 0-100) Temperature of the water in &deg;C.

Returns density in grams per liter (g/L), accurate to within ±0.1 g/L.
