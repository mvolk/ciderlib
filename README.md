[![Build Status](https://travis-ci.org/mvolk/ciderlib.svg?branch=master)](https://travis-ci.org/mvolk/ciderlib)
[![Coverage Status](https://coveralls.io/repos/mvolk/ciderlib/badge.svg?branch=master)](https://coveralls.io/r/mvolk/ciderlib?branch=master)
[![Dependencies Status](https://david-dm.org/mvolk/ciderlib.svg)](https://david-dm.org/mvolk/ciderlib)
[![Dev Dependencies Status](https://david-dm.org/mvolk/ciderlib/dev-status.svg)](https://david-dm.org/mvolk/ciderlib/?type=dev)

# CiderLib v3.0.0

JavaScript utilities and functions for cidermaking calculations. This library underpins the
functionality exposed to end users via [CiderRef](https://github.com/mvolk/ciderref).

## Installation

```Shell
npm install ciderlib --save
```

## API

### ciderlib

Provides access to the entire CiderLib API via the named exports below.

#### Instruments

* [**`Hydrometer`**](./docs/instruments/Hydrometer.md) - correction of hydrometer
  readings for temperature.

#### Properties

* [**`Brix`**](docs/properties/Brix.md) - representation of Brix with functions for
  comparison to other measurements and conversion to other properties and units.

* [**`Mass`**](docs/properties/Mass.md) - representation of mass with units of measurement, 
  functions for comparison to other masses and conversion to other units of measurement.

* [**`PercentABV`**](docs/properties/PercentABV.md) - representation of %ABV with units of
  measurement and functions for comparison to other ABVs.

* [**`SpecificGravity`**](docs/properties/SpecificGravity.md) - representation of specific gravity
   with units of measurement, functions for comparison to other measurements and conversion to
   other properties and units.

* [**`Temperature`**](docs/properties/Temperature.md) - representation of temperature with units of
  measurement,  functions for comparison to other temperatures and conversion to other units of
  measurement.

* [**`Volume`**](docs/properties/Volume.md) - representation of volume with units of measurement,
  functions for comparison to other volumes and conversion to other units of measurement.

* [**`VolumicMass`**](docs/properties/VolumicMass.md) - representation of volumic mass with units of
  measurement, functions for comparison to other measurements and conversion to other units of
  measurement.

#### Substances

* [**`Cider`**](./docs/substances/Cider.md) - sweetness classification and potential alcohol.

* [**`Water`**](./docs/substances/Water.md) - boiling point, freezing point and density as a function
  of temperature.
