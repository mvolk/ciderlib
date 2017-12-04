# [CiderLib](../../README.md) (since v3.0.0)

## `Hydrometer`

Provides hydrometer reading correction for temperature.

Example usage:

```JavaScript
import {
  Hydrometer,
  SpecificGravity,
  Temperature,
} from 'ciderlib';

// Correct readings for fluid temperature
const reading = new SpecificGravity(1.020);
const temperature = new Temperature(30, Temperature.CELSIUS);
const calibrationTemperature = new Temperature(20, Temperature.CELSIUS);
Hydrometer.correctedReading(reading, temperature, calibrationTemperature);
// -> SpecificGravity: ~1.0226
```

#### `correctedReading(reading, temperature, calibrationTemperature)`

Corrects a hydrometer's specific gravity reading for temperature. Accurate to within ±0.0001.

Throws if the `reading` isn't an instance of [`SpecificGravity`](../properties/SpecificGravity.md),
if either `temperature` or `calibrationTemperature` isn't an instance of
[`Temperature`](../properties/Temperature.md), or if either temperature isn't between the freezing
point and boiling point of water, exclusive.
