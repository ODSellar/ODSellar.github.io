/**
 * A cache to store map assets.
 */
export abstract class AssetCache {
  constructor() {}

  public abstract get(assetUrl: string): Promise<any>;

  public abstract clear(): void;
}
