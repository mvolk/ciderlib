# [CiderLib](../../README.md) (since v3.0.0)

## `Temperature`

Models temperature.

Example usage:

```JavaScript
import { Temperature } from 'ciderlib';

// Represent a temperature
const temperature = new Temperature(20, Temperature.CELSIUS);

// Obtain the numeric value of a Temperature instance for direct use in calculations
temperature.inUnits(Temperature.FAHRENHEIT); // -> Number: 68

// Compare to other temperatures
temperature.isGreaterThan(new Temperature(60, Temperature.FAHRENHEIT)); // -> false
temperature.isLessThan(new Temperature(20, Temperature.CELSIUS)); // -> false
```

#### `Temperature.CELSIUS`

A unit of measurement used for temperatures.

#### `Temperature.FAHRENHEIT`

A unit of measurement used for temperatures.

#### `constructor(magnitude, units)`

Initializes an instance of `Temperature` to represent a specific value with given units. Throws if
the `magnitude` is not a number or is infinite.

#### `toUnits(units)`

Returns the value of this temperature as raw `Number` expressed in the given units of measurement.

Throws for values of `units` that are not supported.

#### `isGreaterThan(temperature)`

Returns a `Boolean` indicating whether this temperature is greater than another temperature.

Throws for any value of `temperature` that is not an instance of `Temperature`.

#### `isLessThan(temperature)`

Returns a `Boolean` indicating whether this temperature is less than another temperature.

Throws for any value of `temperature` that is not an instance of `Temperature`.
