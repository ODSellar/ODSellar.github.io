import * as PIXI from 'pixi.js';
import { PixiMap } from './PixiMap';
import { MapLayer } from './layers/MapLayer';
import { PixiTileManager } from './PixiTileManager';
import { IPosition } from './MercatorMap';
import utils from '../Utils';
import { PixiSceneTile } from './PixiSceneTile';
import { Vector2 } from './Vector2';
import { ILatLong } from '@/cottno/lib/interfaces/ILatLong';

/**
 * Responsible for controlling individual layers of the map, including moveing and zooming the layer.
 */
export class PixiInternalLayer {
  public layer: MapLayer;
  private map: PixiMap;
  private tileManager: PixiTileManager;
  private layerContainer: PIXI.Container;

  constructor(map: PixiMap, layer: MapLayer, position: IPosition) {
    this.map = map;
    this.layer = layer;

    this.layerContainer = new PIXI.Container();

    map.stage.addChild(this.layerContainer);

    this.tileManager = new PixiTileManager(
      layer,
      this.layerContainer,
      map.container.clientHeight,
      map.container.clientWidth,
      map.mapOptions.tileSize,
      map.tileRenderer
    );

    this.tileManager.setPosition(position);
  }

  public refresh(): void {
    this.tileManager.refreshTiles();
  }

  public resize(height: number, width: number): void {
    this.tileManager.resize(height, width);
  }

  public setPosition(position: IPosition): void {
    this.tileManager.setPosition(position);
  }

  public getPosition(): IPosition {
    const mercatorCenter = this.tileManager.getMercatorCenter();

    const z =
      mercatorCenter.z +
      (this.layerContainer.scale.x - this.map.mapOptions.minScale) / this.map.mapOptions.minScale;

    return {
      lat: utils.getLatFromMercatorY(mercatorCenter.y, Math.floor(mercatorCenter.z)),
      long: utils.getLngFromMercatorX(mercatorCenter.x, Math.floor(mercatorCenter.z)),
      zoom: z,
    };
  }

  public revalidateTile(tileKey: number): void {
    this.layer.revalidateTile(tileKey).then(() => this.tileManager.refreshTile(tileKey));
  }

  public getLatLongFromGlobal(x: number, y: number): ILatLong {
    const mercatorAtGlobal = this.tileManager.getMercatorAtGlobal(x, y);

    return {
      lat: utils.getLatFromMercatorY(mercatorAtGlobal.y, mercatorAtGlobal.z),
      long: utils.getLngFromMercatorX(mercatorAtGlobal.x, mercatorAtGlobal.z),
    };
  }

  public panPx(moveVector: Vector2): void {
    const vector = moveVector.clone();

    const zoomFactor = this.layerContainer.scale.x;

    if (this.getMapTopPx() + vector.y > 0 && vector.y > 0) {
      vector.y = 0;
    } else if (this.getMapBottomPx() + vector.y < this.map.container.clientHeight && vector.y < 0) {
      vector.y = 0;
    }

    this.tileManager.moveTiles(vector.divideScalar(zoomFactor));
  }

  public zoom(deltaZ: number, zoomOrigin: Vector2): void {
    const zoomFactor = this.layerContainer.scale.x * (1 + deltaZ);

    const currentZ = this.tileManager.getFirstTile().tile.z;

    if (currentZ === 3 && zoomFactor < 0.9 && deltaZ < 0) {
      return;
    }

    this.layerContainer.scale.x = zoomFactor;
    this.layerContainer.scale.y = zoomFactor;

    const scaledZoomOriginX = zoomOrigin.x / zoomFactor;
    const scaledZoomOriginY = zoomOrigin.y / zoomFactor;

    const scaledTranslateX = scaledZoomOriginX - scaledZoomOriginX * (1 + deltaZ);
    let scaledTranslateY = scaledZoomOriginY - scaledZoomOriginY * (1 + deltaZ);

    if (this.getMapTopPx() + scaledTranslateY > 0) {
      scaledTranslateY = 0;
    } else if (this.getMapBottomPx() + scaledTranslateY < this.map.container.clientHeight) {
      const scaledBottom = this.map.container.clientHeight / zoomFactor;
      scaledTranslateY = scaledBottom - scaledBottom * (1 + deltaZ);
    }

    this.tileManager.moveTiles(new Vector2(scaledTranslateX, scaledTranslateY));

    if (zoomFactor < this.map.mapOptions.minScale && currentZ > 0) {
      this.tileManager.decreaseTileZ();
    } else if (
      zoomFactor > this.map.mapOptions.maxScale &&
      currentZ < this.map.mapOptions.maxZoom
    ) {
      this.tileManager.increaseTileZ();
    }

    this.refresh();
  }

  private getMapTopPx(): number {
    const positioningTile: PixiSceneTile = this.tileManager.getFirstTile();

    const positioningTileTop = positioningTile.tileContainer.getGlobalPosition().y;

    const mapTop =
      positioningTileTop -
      positioningTile.tile.y * this.map.mapOptions.tileSize * this.layerContainer.scale.x;

    return mapTop;
  }

  private getMapBottomPx(): number {
    const positioningTile: PixiSceneTile = this.tileManager.getFirstTile();

    const zoomFactor = this.layerContainer.scale.x;

    const positioningTileBottom =
      positioningTile.tileContainer.getGlobalPosition().y +
      this.map.mapOptions.tileSize * zoomFactor;

    const mapBottom =
      positioningTileBottom +
      (Math.pow(2, positioningTile.tile.z) - 1 - positioningTile.tile.y) *
        this.map.mapOptions.tileSize *
        zoomFactor;

    return mapBottom;
  }

  public getFirstTile(): PixiSceneTile {
    return this.tileManager.getFirstTile();
  }

  public increaseTileZ(): void {
    this.tileManager.increaseTileZ();
  }

  public decreaseTileZ(): void {
    this.tileManager.decreaseTileZ();
  }
}
