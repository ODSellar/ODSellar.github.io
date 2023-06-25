import * as PIXI from 'pixi.js';
import { PixiMap } from './PixiMap';
import { PixiInternalLayer } from './PixiInternalLayer';
import { MapLayer } from './layers/MapLayer';
import { IPosition } from './MercatorMap';
import { Vector2 } from './Vector2';
import { ILatLong } from '@/cottno/lib/interfaces/ILatLong';

/**
 * Responsible for managing the layers of the map and ensuring that function calls are passed through to each layer.
 */
export class PixiLayerManager {
  public layers: PixiInternalLayer[] = [];
  private map: PixiMap;
  private initialPosition: IPosition;
  private idCounter: number = 0;

  constructor(map: PixiMap) {
    this.map = map;

    this.initialPosition = { lat: 0, long: 0, zoom: 3 };
  }

  public refresh(): void {
    this.layers.forEach((layer) => layer.refresh());
  }

  public resize(height: number, width: number): void {
    this.layers.forEach((layer) => layer.resize(height, width));
  }

  public setPosition(position: IPosition): void {
    if (this.layers.length === 0) {
      this.initialPosition = position;
    }
    this.layers.forEach((layer) => layer.setPosition(position));
  }

  public getPosition(): IPosition {
    return this.layers[0].getPosition();
  }

  public refreshTile(tileKey: number): void {
    this.layers.forEach((layer) => layer.revalidateTile(tileKey));
  }

  public getLatLongFromGlobal(x: number, y: number): ILatLong {
    return this.layers[0].getLatLongFromGlobal(x, y);
  }

  /**
   * Adds a layer to the tiles.
   * @param mapLayer The layer to add.
   * @param index The index of the layer.
   */
  public addLayer(mapLayer: MapLayer, index?: number): void {
    if (index && index > this.layers.length) {
      throw new Error(`Index out out of range adding new layer in PixiTileManager.`);
    }

    mapLayer.id = this.idCounter++;

    const position = this.layers.length === 0 ? this.initialPosition : this.layers[0].getPosition();

    const layer = new PixiInternalLayer(this.map, mapLayer, position);

    if (index) {
      this.layers.splice(index, 0, layer);
    } else {
      this.layers.push(layer);
    }
  }

  public getLayers(): MapLayer[] {
    return this.layers.map((layer) => layer.layer);
  }

  public panPx(moveVector: Vector2): void {
    this.layers.forEach((layer) => layer.panPx(moveVector));
  }

  public zoom(deltaZ: number, zoomOrigin: Vector2): void {
    this.layers.forEach((layer) => layer.zoom(deltaZ, zoomOrigin));
  }
}
