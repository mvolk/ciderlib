[![Build Status](https://travis-ci.org/mvolk/ciderlib.svg?branch=master)](https://travis-ci.org/mvolk/ciderlib)
[![Coverage Status](https://coveralls.io/repos/mvolk/ciderlib/badge.svg?branch=master)](https://coveralls.io/r/mvolk/ciderlib?branch=master)
[![Dependencies Status](https://david-dm.org/mvolk/ciderlib.svg)](https://david-dm.org/mvolk/ciderlib)
[![Dev Dependencies Status](https://david-dm.org/mvolk/ciderlib/dev-status.svg)](https://david-dm.org/mvolk/ciderlib/?type=dev)

# CiderLib v2.0.0

JavaScript utilities and functions for hard cidermaking calculations. This library underpins the
functionality exposed to end users via [CiderRef](https://github.com/mvolk/ciderref).

## Status

This is a work in progress. Here's the task list:

* [x] Project setup
* [x] Relevant properties of water
* [x] Conversion functions for units of measurement
    * [x] Temperature
    * [x] Mass
    * [x] Volume
    * [x] Sugar content (Brix, SG, qualitative categories)
* [x] Hydrometer reading correction function
* [x] Potential alcohol calculator functions
* [ ] Volumic mass of total solids
* [ ] Chaptalization (addition of sugar) calculator functions
* [ ] Relevant properties of classes of apple juice
* [ ] Sulphiting calculator

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

* [**cider**](docs/cider.md) - the cider API, including sweetness
  classification (dry, off-dry, etc) and potential alcohol as a function of
  sugar concentration. Valid for ciders sweet, hard and in between.

* [**water**](docs/water.md) - the water API, including boiling and freezing points
  and density as a function of temperature.

#### [units](docs/units.md)

The units of measurement API, including all units of measurement supported by
CiderLib and a function to obtain a unit of measurement object for a given
unit of measurement key.
