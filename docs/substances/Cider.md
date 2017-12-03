# [CiderLib](../../README.md) (since v3.0.0)

## `Cider`

Properties of sweet (juice) and hard (fermented) ciders.

Example usage:
```JavaScript
import { Cider, Mass, SpecificGravity, Volume, VolumicMass } from 'ciderlib';

// Sweetness classification
const { DRY, OFF_DRY, SWEET } = Cider;
DRY.label;       // -> "dry" (human-readable / copy-friendly)
DRY.maxSG;       // -> 1.004 (max values are exclusive)
OFF_DRY.minSG;   // -> 1.004 (min values are inclusive)
DRY.minSG;       // -> Number.NEGATIVE_INFINITY
SWEET.maxSG;     // -> Number.POSITIVE_INFINITY

// SG -> sweetness category mapping
Cider.classifyBySG(new SpecificGravity(1.008)); // -> cider.sweetness.OFF_DRY
Cider.classifyBySG(new SpecificGravity(1.009)); // -> cider.sweetness.MEDIUM_DRY
Cider.classifyBySG(new SpecificGravity(1.015)); // -> cider.sweetness.MEDIUM_SWEET

// Potential alcohol given sugar concentration
const sugarContent = new VolumicMass(new Mass(70, Mass.GRAMS), new Volume(1, Volume.LITERS));
cider.potentialAlcohol(sugarContent); // -> PercentABV instance representing 4.2% ABV
```

#### Sweetness Classifications

| CLASSIFICATION | `.label`     | `.minSG`                   | `.maxSG`                   |
| -------------- | ------------ | -------------------------- | -------------------------- |
| `DRY`          | dry          | `null`                     | 1.004                      |
| `OFF_DRY`      | off dry      | 1.004                      | 1.009                      |
| `MEDIUM_DRY`   | medium dry   | 1.009                      | 1.015                      |
| `MEDIUM_SWEET` | medium sweet | 1.015                      | 1.020                      |
| `SWEET`        | sweet        | 1.020                      | `null`                     |

**Notes:**
1. Minimum and maximum specific gravities are arbitrary bounds chosen to best fit
   commonly-cited classification criteria.
2. Minimum specific gravities are inclusive ("greater than or equal to").
3. Maximum specific gravities are exclusive ("less than").

#### `classifyBySG(specificGravity)`

Returns the sweetness classification (above) that best fits a cider with the given specific gravity.

Throws if the `specificGravity` is not an instance of
[`SpecificGravity`](../properties/SpecificGravity.md) or has a magnitude of less than 0.800 or more
than 1.120.

#### `potentialAlcohol(sugarConcentration)`

Returns the amount of alcohol, in [`PercentABV`](./properties/PercentABV.md), that will be produced
if all of the sugar is fermented out. This amount is in addition to any alcohol already present.
This function uses the formula given by Warcollier in La Cidrerie (1928).

Throws if `sugarConcentration` is not an instance of [`VolumicMass`](./properties/VolumicMass.md).
