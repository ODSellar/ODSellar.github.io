import { IRasterData, ITileData, IPointTileData, IPointStyle } from './layers/ITileData';
import * as PIXI from 'pixi.js';
import { AssetCache } from './AssetCache';
import { SpriteExt } from './SpriteExt';
import { PixiAssetCache } from './PixiAssetCache';
import { MapLayer } from './layers/MapLayer';
import { RasterLayer } from './layers/RasterLayer';
import { VectorLayer } from './layers/VectorLayer';
import { TPoint } from '@/cottno/lib/types/TGeoJson';

/**
 * Renders tile data into Pixi map tiles. Currently suppots raster tiles and very basic point tiles (vector tiles).
 */
export class PixiTileRenderer {
  private assetCache: AssetCache;
  private tileScaleFactor: number;
  private makeClickable: (sceneObject: PIXI.DisplayObject) => void;

  constructor(makeClickable: (sceneObject: PIXI.DisplayObject) => void, tileSize: number) {
    this.assetCache = new PixiAssetCache(5000);

    this.makeClickable = makeClickable;

    this.tileScaleFactor = tileSize / 256;
  }

  public async renderTile(tileData: ITileData, layer: MapLayer): Promise<PIXI.DisplayObject> {
    if (layer instanceof RasterLayer) {
      return await this.renderRasterTile(tileData);
    } else if (layer instanceof VectorLayer) {
      return await this.renderPointTile(tileData, (layer as VectorLayer).styleFunc);
    } else {
      throw new Error(`Layer type is not recognised.`);
    }
  }

  public async renderRasterTile(tileData: ITileData): Promise<PIXI.DisplayObject> {
    const rasterData = tileData as IRasterData;
    const asset = await this.assetCache.get(rasterData.image);

    const tileSprite = new SpriteExt(rasterData.id, rasterData.layerId, asset);

    if (rasterData.enablePrimaryClick || rasterData.enableSecondaryClick) {
      this.makeClickable(tileSprite);
    }

    return tileSprite;
  }

  public async renderPointTile(
    tileData: ITileData,
    styleFunc: (feature: TPoint) => IPointStyle
  ): Promise<PIXI.DisplayObject> {
    const pointTileData = tileData as IPointTileData;
    const container = new PIXI.Container();

    for (let i = 0; i < pointTileData.points.length; i++) {
      const point = pointTileData.points[i];
      const style = styleFunc(point);

      if (style.image) {
        const asset = await this.assetCache.get(style.image);

        const pointSprite = new SpriteExt(point.properties, tileData.layerId, asset);

        pointSprite.x = point.coordinates[0] * this.tileScaleFactor - pointSprite.width / 2;
        pointSprite.y = point.coordinates[1] * this.tileScaleFactor - pointSprite.height;

        pointSprite.tint = 0xff0000;

        if (point.properties.id) {
          this.makeClickable(pointSprite);
        }

        container.addChild(pointSprite);
      }
    }

    return container;
  }
}
