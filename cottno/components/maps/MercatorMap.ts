import { MapLayer } from './layers/MapLayer';
import { Vector2 } from './Vector2';

export interface IMapClickEvent {
  clientX: number;
  clientY: number;
  lat: number;
  long: number;
  spriteProperties?: any;
  layerId?: number;
}

export interface IMapOptions {
  tileSize: number;
  minScale: number;
  maxScale: number;
  maxZoom: number;
  initialCenter?: IPosition;
}

export interface IPosition {
  lat: number;
  long: number;
  zoom: number;
}

export abstract class MercatorMap {
  public abstract onMapMove?: (ev: IPosition) => void;

  abstract container: HTMLElement;
  abstract mapOptions: IMapOptions;

  constructor(
    container: HTMLDivElement,
    mapOptions: IMapOptions,
    position: IPosition,
    onClickHandler?: (ev: IMapClickEvent) => void,
    onContextHandler?: (ev: IMapClickEvent) => void,
    onMapMove?: (ev: IPosition) => void
  ) {}

  public abstract addLayer(layer: MapLayer, index?: number): void;

  public abstract getLayers(): MapLayer[];

  public abstract panPx(vector: Vector2): void;

  public abstract zoom(zDelta: number, zoomOrigin: Vector2): void;

  public abstract setPosition(position: IPosition): void;

  public abstract revalidateTile(tileKey: number): void;

  public abstract destroy(): void;
}
