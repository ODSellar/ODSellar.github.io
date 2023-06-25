import * as PIXI from 'pixi.js';
import { AssetCache } from './AssetCache';

/**
 * A asset cache using the PIXI.Assets class.
 */
export class PixiAssetCache extends AssetCache {
  cache: Set<string>;
  maxSize: number;

  constructor(maxSize: number) {
    super();
    this.cache = new Set<string>();
    this.maxSize = maxSize;
  }

  public async get(assetUrl: string): Promise<any> {
    const valueIsCached = this.cache.has(assetUrl);

    if (valueIsCached) {
      // Move item to the end of the cache
      this.cache.delete(assetUrl);
      this.cache.add(assetUrl);

      const asset = PIXI.Assets.get(assetUrl);
      return asset ?? PIXI.Assets.load(assetUrl);
    }

    while (this.cache.size > this.maxSize) {
      const deleteKey = this.cache.keys().next().value;

      PIXI.Assets.unload(deleteKey);

      this.cache.delete(deleteKey);
    }

    try {
      const asset: Promise<any> = PIXI.Assets.load(assetUrl);
      this.cache.add(assetUrl);

      return asset;
    } catch (err) {
      console.log(`Failed to fetch asset ${assetUrl}. Error: ${err}`);
    }
  }

  public clear(): void {
    this.cache.forEach((key, value) => {
      PIXI.Assets.unload(value);
    });

    this.cache.clear();
  }
}
