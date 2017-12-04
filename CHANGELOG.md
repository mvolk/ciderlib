# 3.0.0 (2017-12-03)
 
 * **[ breaking ]** `ciderlib` no longer has a default export. Use the named exports instead.
 * **[ breaking ]** `ciderlib/units` and the `units` named export of `ciderlib` have been removed.
   Use the new property classes instead.
 * **[ breaking ]** `Hydrometer` is no longer instantiable, and the `correctReading` function is now
   invoked on the class (e.g. `Hydrometer.correctReading`) and takes a third parameter, the
   calibration temperature of the hydrometer.
 * **[ breaking ]** All methods that previously accepted parameter values of type `Number` representing
   property measurements in SI units now take instances of the corresponding property classes and
   impose no restriction on the units used.
 * **[ breaking ]** `cider` and `water` are now `Cider` and `Water`.
 * **[ breaking ]** All properties of `cider.sweetness` have been promoted to being properties of
   `Cider`. For example, `cider.sweetness.DRY` is now `Cider.DRY`
 * **[ breaking ]** The `sugar` units concept is gone, replaced by more concrete and sensible
   properties such as `Brix`, `SpecificGravity`, `Mass` and `VolumicMass`.
 * [ feature ] Property classes added to represent property measurements and provide related
   features. The new classes are `Temperature`, `Mass`, `Volume`, `SpecificGravity`, `Brix`,
   `VolumicMass` and `PercentABV`. These classes encode the original magnitude and units, and
   provide methods for converting magnitudes to other units without loss of fidelity in the
   original measurement. These classes also provide units definitions, e.g.
   `Temperature.CELSIUS` and `Brix.UNITS`.
 
# 2.0.0 (2017-02-19)

  * **[ breaking ]** Replaces `hardCider` with `cider`.
  * Adds potential alcohol functions to `cider`.

# 1.4.0 (2017-02-09)

  * Adds sweetness classifications of hard cider as concepts.
  * Adds a function to map from specific gravity to sweetness classification.

# 1.3.0 (2017-02-03)

  * Adds support for units of Brix, a measure of sugar content
  * Adds conversion functions between degrees Brix and specific gravity,
    assuming that the substance being measures is a pure solution of water
    and sucrose.

# 1.2.0 (2017-02-02)

  * Adds support for three units of volume

# 1.1.0 (2017-02-01)

  * Adds support for four units of mass

# 1.0.1 (2017-01-29)

  * Fixes [documentation link bug](https://github.com/mvolk/ciderlib/issues/3).
  * Fixes [units export bug](https://github.com/mvolk/ciderlib/issues/4).

# 1.0.0 (2017-01-29)

  * **[ breaking ]** Replaces `temperature` with `units`.
  * Enriches unit conversion functionality.
  * Fixes issues with module export.
  * Improves documentation.
  * Simplifies validation.

# 0.2.0 (2017-01-15)

  * Adds temperature units and conversion function.
  * Adds hydrometer reading correction for temperature.

# 0.1.0 (2017-01-15)

  * Initial release.
  * Provides water density as a function of temperature.
