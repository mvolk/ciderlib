[![Build Status](https://travis-ci.org/mvolk/ciderlib.svg?branch=master)](https://travis-ci.org/mvolk/ciderlib)
[![Coverage Status](https://coveralls.io/repos/mvolk/ciderlib/badge.svg?branch=master)](https://coveralls.io/r/mvolk/ciderlib?branch=master)
[![Dependencies Status](https://david-dm.org/mvolk/ciderlib.svg)](https://david-dm.org/mvolk/ciderlib)
[![Dev Dependencies Status](https://david-dm.org/mvolk/ciderlib/dev-status.svg)](https://david-dm.org/mvolk/ciderlib/?type=dev)

# CiderLib v0.2.0

JavaScript utilities and functions for hard cidermaking calculations. This library underpins the
functionality exposed to end users via [CiderRef](https://github.com/mvolk/ciderref).

## Status

This is an early work in progress. Here's the task list:

* [X] Project setup
* [X] Relevant properties of water
* [ ] Conversion functions for units of measurement
    * [X] Temperature
    * [ ] Mass
    * [ ] Volume
    * [ ] Sugar content (Brix, SG, qualitative categories)
* [X] Hydrometer reading correction function
* [ ] Potential alcohol calculator functions
* [ ] Chaptalization (addition of sugar) calculator functions
* [ ] Relevant properties of classes of apple juice

Most of the above has already been implemented in the
[CiderRef Java SDK](https://github.com/mvolk/cider-sdk-java), so the
magnitude of work ahead is not as great as it might otherwise seem.

Collaborators welcome.

## Installation

```Shell
npm install ciderlib --save
```

## API

### Hydrometer

Models a hydrometer with a known calibration temperature.

#### constructor(calibrationTemperature)

* `temperature` - The calibration temperature of the hydrometer in &deg;C.

#### correctedReading(reading, temperature)

Corrects a hydrometer's specific gravity reading for temperature.

* `reading` - The specific gravity read from they hydrometer.
* `temperature` - The temperature of the fluid at the time the reading
                  was taken, in &deg;C.

Returns the corrected specific gravity ±0.0001.

### temperature

Units of temperature measurement and logic to convert between units.

#### temperature.CELSIUS

#### temperature.FAHRENHEIT

#### temperature.supportedUnits

An array of all supported temperature units.

#### temperature(temperature, units).in(newUnits)

Converts temperatures between units of measurement.

* `temperature` - A temperature value in the given units.
* `units` - The units in which `temperature` is expressed. Must be one of the
            `supportedUnits` - `CELSUIS` or `FAHRENHEIT`.
* `newUnits` - The units in which you want to express `temperature`. Must be one of the
            `supportedUnits` - `CELSUIS` or `FAHRENHEIT`.

Returns the equivalent of `temperature` in `units` in `newUnits`.

### water

Properties of pure water under standard pressure. See API documentation below.

#### water.BOILING_POINT

The boiling point of pure water, under standard pressure, in &deg;C.

#### water.FREEZING_POINT

The freezing point of pure water, under standard pressure, in &deg;C.

#### water.density(temperature)

Calculates the density of pure water under standard pressure at a given
temperature.

* `temperature` - (Number between 0-100) Temperature of the water in &deg;C.

Returns density in grams per liter (g/L), accurate to within ±0.1 g/L.
