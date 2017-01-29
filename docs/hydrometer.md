# [CiderLib](../README.md) (since v0.2.0)

## Hydrometer API

Models a hydrometer with a known calibration temperature.

Example usage:

```JavaScript
import { Hydrometer } from 'ciderlib';

// Instantiate a hydrometer calibrated at 20&deg;C
const hydrometer = new Hydrometer(20);

// Correct readings for fluid temperature
hydrometer.correctedReading(1.040, 20); // -> 1.040
hydrometer.correctedReading(1.020, 30); // -> ~1.0226
```

#### constructor(calibrationTemperature)

* `temperature` - The calibration temperature of the hydrometer in &deg;C.

Note:
1. The type of `temperature` must be `number`. An error will be thrown otherwise.
2. The `temperature` must be no less than 0&deg;C and no greater than 100&deg;C.

#### correctedReading(reading, temperature)

Corrects a hydrometer's specific gravity reading for temperature.

* `reading` - The specific gravity read from they hydrometer.
* `temperature` - The temperature of the fluid at the time the reading
                  was taken, in &deg;C.

Returns the corrected specific gravity ±0.0001.

Note:
1. The type of `reading` and `temperature` must be `number`. An error will be thrown otherwise.
2. The `temperature` must be no less than 0&deg;C and no greater than 100&deg;C.
