import { IMercatorTile } from '@/cottno/lib/interfaces/IMercatorTile';
import Utils from '../Utils';

export class MercatorTile implements IMercatorTile {
  x: number;
  y: number;
  z: number;
  key: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.key = Utils.getMercatorKeyFromXYZ(x, y, z);
  }

  public getParentTile(): MercatorTile {
    const validTile = this.getValidTile();
    return new MercatorTile(validTile.x >>> 1, validTile.y >>> 1, validTile.z - 1);
  }

  public isYValid(): boolean {
    if (this.y < 0 || this.y >= Math.pow(2, this.z)) {
      return false;
    }
    return true;
  }

  public isXValid(): boolean {
    if (this.x < 0 || this.x >= Math.pow(2, this.z)) {
      return false;
    }
    return true;
  }

  public getValidTile(): MercatorTile {
    const validTile = new MercatorTile(this.x, this.y, this.z);

    const dif = Math.pow(2, this.z);

    while (!validTile.isXValid()) {
      const remainder = validTile.x % dif;

      validTile.x = remainder < 0 ? dif + remainder : validTile.x % dif;
    }

    while (!validTile.isYValid()) {
      validTile.y = validTile.y % dif;
    }

    validTile.key = Utils.getMercatorKeyFromXYZ(validTile.x, validTile.y, validTile.z);

    return validTile;
  }
}
