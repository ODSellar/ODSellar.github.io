import * as PIXI from 'pixi.js';
import { Container } from 'pixi.js';
import { MapLayer } from './layers/MapLayer';
import { MercatorTile } from './MercatorTile';
import { PixiTileRenderer } from './PixiTileRenderer';
import { RasterLayer } from './layers/RasterLayer';

/**
 * A scene tile representing a mercator tile, it can be updated with a layer and the relivant tile will be fetched and redered.
 *
 * Contains methods to get child tiles from this tile.
 */
export class PixiSceneTile {
  public tile: MercatorTile;
  public tileContainer: PIXI.Container;
  private displayTile: MercatorTile;
  private tileRenderer: PixiTileRenderer;
  private layer?: MapLayer;

  constructor(
    tile: MercatorTile,
    tileRenderer: PixiTileRenderer,
    container: PIXI.Container = new PIXI.Container()
  ) {
    this.tile = tile;
    this.tileContainer = container;
    this.tileRenderer = tileRenderer;

    this.displayTile = tile.getValidTile();
  }

  public updateTile(layer: MapLayer): void {
    this.layer = layer;
    void this.updateTileAsync(layer);
  }

  private async updateTileAsync(layer: MapLayer): Promise<void> {
    const tileData = await layer.getTile(this.displayTile);

    const tileAsset = await this.tileRenderer.renderTile(tileData, layer);

    this.addAssetToTile(tileAsset);
  }

  private addAssetToTile(layerAsset: PIXI.DisplayObject) {
    if (this.tileContainer.children.length > 0) {
      this.tileContainer.removeChildAt(0);
    }

    this.tileContainer.addChildAt(layerAsset, 0);
  }

  public addChild(childTile: PixiSceneTile) {
    if (childTile.tile.getParentTile().key !== this.tile.key) {
      return;
    }

    if (childTile.layer instanceof RasterLayer && childTile.tileContainer.children.length > 0) {
      if (this.tileContainer.children.length === 0) {
        this.tileContainer.addChild(new Container());
      }

      const childRasterImg = childTile.tileContainer.children[0];

      if (!(childRasterImg instanceof PIXI.Container)) {
        return;
      }

      childRasterImg.scale.x = childRasterImg.scale.x / 2;
      childRasterImg.scale.y = childRasterImg.scale.y / 2;

      childRasterImg.position.x = (childTile.tile.x % 2) * childRasterImg.height;
      childRasterImg.position.y = (childTile.tile.y % 2) * childRasterImg.width;

      (this.tileContainer.children[0] as PIXI.Container).addChild(childRasterImg);
    }
  }

  public getChildren(): PixiSceneTile[] {
    const children: PixiSceneTile[] = [];

    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 1; j++) {
        const childMercatorTile = new MercatorTile(
          this.tile.x * 2 + i,
          this.tile.y * 2 + j,
          this.tile.z + 1
        );

        const childSideLength = this.tileContainer.height / 2;
        const section = new PIXI.Rectangle(
          i * childSideLength,
          j * childSideLength,
          childSideLength,
          childSideLength
        );
        const childTileContainer = this.getTileContainerSection(section);

        children.push(new PixiSceneTile(childMercatorTile, this.tileRenderer, childTileContainer));
      }
    }

    return children;
  }

  private getTileContainerSection(section: PIXI.Rectangle): PIXI.Container {
    const container = new PIXI.Container();

    if (this.layer instanceof RasterLayer && this.tileContainer.children.length > 0) {
      const rasterImg = this.tileContainer.children[0];

      if (rasterImg instanceof PIXI.Sprite) {
        container.addChild(this.getSpriteSection(rasterImg, section));
      }
    }

    return container;
  }

  private getSpriteSection(originalSprite: PIXI.Sprite, section: PIXI.Rectangle): PIXI.Sprite {
    const scaleRect =
      originalSprite.texture.orig.height / originalSprite.texture.baseTexture.height;

    section.height = section.height * scaleRect;
    section.width = section.width * scaleRect;
    section.x = originalSprite.texture.orig.x + section.x * scaleRect;
    section.y = originalSprite.texture.orig.y + section.y * scaleRect;

    const sectionTexture = new PIXI.Texture(originalSprite.texture.baseTexture, section);

    const newSprite = new PIXI.Sprite(sectionTexture);

    newSprite.scale.x = (newSprite.scale.x / scaleRect) * 2;
    newSprite.scale.y = (newSprite.scale.y / scaleRect) * 2;

    return newSprite;
  }
}
