# [CiderLib](../README.md) (since v2.0.0)

## Cider API

Properties of sweet (juice) and hard (fermented) ciders.

Example usage:
```JavaScript
import { cider } from 'ciderlib';

// Sweetness classification
const { DRY, OFF_DRY, SWEET } = cider.sweetness;
DRY.label;       // -> "dry" (human-readable / copy-friendly)
DRY.maxSG;       // -> 1.004 (max values are exclusive)
OFF_DRY.minSG;   // -> 1.004 (min values are inclusive)
DRY.minSG;       // -> Number.NEGATIVE_INFINITY
SWEET.maxSG;     // -> Number.POSITIVE_INFINITY

// SG -> sweetness category mapping
cider.classifyBySG(1.008); // -> cider.sweetness.OFF_DRY
cider.classifyBySG(1.009); // -> cider.sweetness.MEDIUM_DRY
cider.classifyBySG(1.015); // -> cider.sweetness.MEDIUM_SWEET

// Potential alcohol given sugar concentration
cider.potentialAlcohol(70); // -> 4.2% ABV
```

#### Sweetness Classifications

| CLASSIFICATION | `.label`     | `.minSG`                   | `.maxSG`                   |
| -------------- | ------------ | -------------------------- | -------------------------- |
| `DRY`          | dry          | `Number.NEGATIVE_INFINITY` | 1.004                      |
| `OFF_DRY`      | off dry      | 1.004                      | 1.009                      |
| `MEDIUM_DRY`   | medium dry   | 1.009                      | 1.015                      |
| `MEDIUM_SWEET` | medium sweet | 1.015                      | 1.020                      |
| `SWEET`        | sweet        | 1.020                      | `Number.NEGATIVE_INFINITY` |

**Notes:**
1. Minimum and maximum specific gravities are arbitrary bounds chosen to best fit
   commonly-cited classification criteria.
2. Minimum specific gravities are inclusive ("greater than or equal to").
3. Maximum specific gravities are exclusive ("less than").

#### classifyBySG(specificGravity)

Returns the sweetness classification that best fits a cider with the given
specific gravity.

* `specificGravity` - (Number) Specific gravity of a hard cider.

Returns one of `DRY`, `OFF_DRY`, `MEDIUM_DRY`, `MEDIUM_SWEET` and `SWEET`.

Throws a `TypeError` if `specificGravity` is not of type "number".

Throws a `RangeError` if `specificGravity` is `Number.NaN`, less than 0.800, or more
than 1.120.

#### potentialAlcohol(sugarConcentration)

Returns the amount of alcohol, in % by volume at 20°C, that will be produced if all of the given
sugar content is fermented out. This amount is in addition to any alcohol already present.

* `sugarConcentration` - (Number) the volumic mass concentration of the sugar expressed in g/L.

Returns the potential alcohol of the sugar in %ABV.

Throws a `TypeError` if `sugarConcentration` is not of type "number".

Throws a `RangeError` if `sugarConcentration` is less than zero.

Note:
1. This function uses the formula given by Warcollier in La Cidrerie (1928).
