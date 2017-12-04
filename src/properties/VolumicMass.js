/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Michael Volk (michael@volksys.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Mass from './Mass';
import Volume from './Volume';

export default class VolumicMass {
  constructor(mass, volume) {
    if (!(mass instanceof Mass)) {
      throw new TypeError('The mass must be an instance of Mass.');
    }

    if (!(volume instanceof Volume)) {
      throw new TypeError('The volume must be an instance of Volume.');
    }

    if (volume.magnitude === 0) {
      throw new RangeError('The volume in a volumic mass cannot be zero.');
    }

    this.mass = mass;
    this.volume = volume;
  }

  // Returns the magnitude of this volumic mass in given units
  inUnits = (massUnits, volumeUnits) => (
    this.mass.inUnits(massUnits) / this.volume.inUnits(volumeUnits)
  );

  // Determines whether this volumic mass is greater than the given volumic mass
  isGreaterThan = (volumicMass) => {
    if (!(volumicMass instanceof VolumicMass)) {
      throw new TypeError('Volumic masses can only be compared with other volumic masses');
    }

    const thisMagnitude = this.inUnits(this.mass.units, this.volume.units);
    const otherMagnitude = volumicMass.inUnits(this.mass.units, this.volume.units);

    return thisMagnitude > otherMagnitude;
  };

  // Determines whether this volumic mass is lower than the given volumic mass
  isLessThan = (volumicMass) => {
    if (!(volumicMass instanceof VolumicMass)) {
      throw new TypeError('Volumic masses can only be compared with other volumic masses');
    }

    const thisMagnitude = this.inUnits(this.mass.units, this.volume.units);
    const otherMagnitude = volumicMass.inUnits(this.mass.units, this.volume.units);

    return thisMagnitude < otherMagnitude;
  }
}
