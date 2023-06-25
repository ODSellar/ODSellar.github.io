import { Vector3 } from './maps/Vector3';
import { IVector3 } from '../lib/interfaces/IVector3';
import { IVector2 } from '../lib/interfaces/IVector2';

const espg3857Radius = 6378137;

const utils = {
  get3857XFromLong(long: number): number {
    const longRadians = (long * Math.PI) / 180;

    return espg3857Radius * longRadians;
  },
  get3857YFromLat(lat: number): number {
    const latRadians = (lat * Math.PI) / 180;

    return espg3857Radius * Math.log(Math.tan(Math.PI / 4 + latRadians / 2));
  },
  getLongFrom3857X(x: number): number {
    return ((x / espg3857Radius) * 180) / Math.PI;
  },
  getLatFrom3857Y(y: number): number {
    return ((2 * Math.atan(Math.exp(y / espg3857Radius)) - Math.PI / 2) * 180) / Math.PI;
  },
  /**
   * Converts EPSG:3857 coordinates to tile coordinates.
   *
   * @param x The tile x coordinate.
   * @param y The tile y coordinate.
   * @param z The zoom level.
   * @returns The EPSG:3857 coordinates.
   */
  tileToWebMercator(x: number, y: number, z: number): IVector2 {
    const tileSize = 256;
    const resolution = (2 * Math.PI * espg3857Radius) / tileSize / Math.pow(2, z);
    const X = x * tileSize * resolution - (2 * Math.PI * espg3857Radius) / 2;
    const Y = -(y * tileSize * resolution - (2 * Math.PI * espg3857Radius) / 2);
    return { x: X, y: Y };
  },
  /**
   * Converts EPSG:3857 coordinates to tile coordinates.
   *
   * @param X The X coordinate in EPSG:3857.
   * @param Y The Y coordinate in EPSG:3857.
   * @param z The zoom level.
   * @returns The tile coordinates.
   */
  WebMercatorToTile(X: number, Y: number, z: number): IVector3 {
    const tileSize = 256;
    const resolution = (2 * Math.PI * espg3857Radius) / tileSize / Math.pow(2, z);
    const x = (X + (2 * Math.PI * espg3857Radius) / 2) / (tileSize * resolution);
    const y = -(Y - (2 * Math.PI * espg3857Radius) / 2) / (tileSize * resolution);
    return { x, y, z };
  },
  getMercatorXFromLng(long: number, zoom: number, decimal: boolean = false): number {
    const lngRad = (Math.PI / 180) * long;
    const flooredZoom = Math.floor(zoom);

    const x = (Math.pow(2, flooredZoom) * (lngRad + Math.PI)) / (2 * Math.PI);

    return decimal ? x : Math.floor(x);
  },
  getMercatorYFromLat(lat: number, zoom: number, decimal: boolean = false): number {
    const latRad = (Math.PI / 180) * lat;
    const flooredZoom = Math.floor(zoom);

    const y =
      (Math.pow(2, flooredZoom) * (Math.PI - Math.log(Math.tan(Math.PI / 4 + latRad / 2)))) /
      (2 * Math.PI);

    return decimal ? y : Math.floor(y);
  },
  getLngFromMercatorX(x: number, zoom: number): number {
    const flooredZoom = Math.floor(zoom);
    const lngRad = (2 * Math.PI * x) / Math.pow(2, flooredZoom) - Math.PI;

    const lng = (180 / Math.PI) * lngRad;

    return this.getValidLong(lng);
  },
  getLatFromMercatorY(y: number, zoom: number): number {
    const flooredZoom = Math.floor(zoom);
    const latRad =
      2 *
      (Math.atan(Math.exp(Math.PI - (2 * Math.PI * y) / Math.pow(2, flooredZoom))) - Math.PI / 4);

    const lat = (180 / Math.PI) * latRad;

    return lat;
  },
  getValidLong(long: number): number {
    if (long > 180 || long < -180) {
      const adjustedLong = long % 360;

      return adjustedLong > 180
        ? adjustedLong - 360
        : adjustedLong < -180
        ? adjustedLong + 360
        : adjustedLong;
    }
    return long;
  },
  getMercatorFromXYZOld: (x: number, y: number, z: number): string => `${x},${y},${z}`,
  /**
   * The mercator key is calculated by effectivly bitshifting the z << 42, x << 21, y and summing the result.
   *
   * @param x Mercator tile x
   * @param y Mercator tile y.
   * @param z Mercator tile z.
   * @returns The Mercator key for the tile
   */
  getMercatorKeyFromXYZ: (x: number, y: number, z: number): number => {
    return z * 4398046511104 + x * 2097152 + y;
  },
  getXYZFromMercatorKey: (key: number): IVector3 => {
    const z = Math.floor(key / 4398046511104);
    const x = Math.floor((key - z * 4398046511104) / 2097152);
    const y = key - z * 4398046511104 - x * 2097152;
    return { x, y, z };
  },
  getParentMercatorKeys: (tileKey: number): number[] => {
    const parentKeys: number[] = [];
    const tile = utils.getXYZFromMercatorKey(tileKey);

    for (let i = tile.z - 1; i >= 0; i--) {
      const parent = utils.getMercatorKeyFromXYZ(
        Math.floor(tile.x / Math.pow(2, tile.z - i)),
        Math.floor(tile.y / Math.pow(2, tile.z - i)),
        i
      );
      parentKeys.push(parent);
    }

    return parentKeys;
  },
  getValidMercatorPoint(point: Vector3): Vector3 {
    const validPoint = point.clone();

    const dif = Math.pow(2, validPoint.z);

    while (validPoint.x < 0 || validPoint.x >= Math.pow(2, validPoint.z)) {
      validPoint.x = validPoint.x < 0 ? validPoint.x + dif : validPoint.x - dif;
    }

    while (validPoint.y < 0 || validPoint.y >= Math.pow(2, validPoint.z)) {
      validPoint.y = validPoint.y < 0 ? validPoint.y + dif : validPoint.y - dif;
    }

    return validPoint;
  },
};

export default utils;
