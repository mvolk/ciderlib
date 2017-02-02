[![Build Status](https://travis-ci.org/mvolk/ciderlib.svg?branch=master)](https://travis-ci.org/mvolk/ciderlib)
[![Coverage Status](https://coveralls.io/repos/mvolk/ciderlib/badge.svg?branch=master)](https://coveralls.io/r/mvolk/ciderlib?branch=master)
[![Dependencies Status](https://david-dm.org/mvolk/ciderlib.svg)](https://david-dm.org/mvolk/ciderlib)
[![Dev Dependencies Status](https://david-dm.org/mvolk/ciderlib/dev-status.svg)](https://david-dm.org/mvolk/ciderlib/?type=dev)

# CiderLib v1.1.0

JavaScript utilities and functions for hard cidermaking calculations. This library underpins the
functionality exposed to end users via [CiderRef](https://github.com/mvolk/ciderref).

## Status

This is an early work in progress. Here's the task list:

* [X] Project setup
* [X] Relevant properties of water
* [ ] Conversion functions for units of measurement
    * [X] Temperature
    * [X] Mass
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

### ciderlib

Provides access to the entire CiderLib API via the properties below.

#### instruments

* [**Hydrometer**](docs/hydrometer.md) - the Hydrometer API, including a class
  to model a hydrometer of known calibration temperature and correct readings
  for temperature.

#### substances

* [**water**](docs/water.md) - the water API, including boiling and freezing points
  and density as a function of temperature.

#### [units](docs/units.md)

The units of measurement API, including all units of measurement supported by
CiderLib and a function to obtain a unit of measurement object for a given
unit of measurement key.
