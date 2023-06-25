import * as PIXI from 'pixi.js';
import { MapLayer } from './layers/MapLayer';
import { Vector2 } from './Vector2';
import { IMapClickEvent, IMapOptions, IPosition, MercatorMap } from './MercatorMap';
import { PixiSceneTile } from './PixiSceneTile';
import { PixiTileManager } from './PixiTileManager';
import { PixiTileRenderer } from './PixiTileRenderer';
import { PixiInteractionManager } from './PixiInteractionManager';
import utils from '../Utils';
import { debounce } from 'lodash';
import { PixiLayerManager } from './PixiLayerManager';

/**
 * Map rendered using pixi js.
 */
export class PixiMap extends MercatorMap {
  private shouldRefreshCounter: number;
  private renderer: PIXI.IRenderer<PIXI.ICanvas>;
  private interactionManager: PixiInteractionManager;
  private layerManager: PixiLayerManager;
  private resizeObserver: ResizeObserver;
  public onMapMove?: (ev: IPosition) => void;
  public container: HTMLElement;
  public mapOptions: IMapOptions;
  public stage: PIXI.Container;
  public tileRenderer: PixiTileRenderer;
  public isDestroyed: boolean = false;

  /**
   * Constructor.
   * @param container The DOM element to attact the map to
   * @param mapOptions A set of options for the map
   */
  constructor(
    container: HTMLDivElement,
    mapOptions: IMapOptions,
    position: IPosition,
    onClick?: (ev: IMapClickEvent) => void,
    onContext?: (ev: IMapClickEvent) => void,
    onMapMove?: (ev: IPosition) => void
  ) {
    super(container, mapOptions, position, onClick, onContext, onMapMove);

    this.container = container;
    this.mapOptions = mapOptions;

    const debouncedOnResize = debounce(this.onResize.bind(this), 200, { maxWait: 400 });

    this.resizeObserver = new ResizeObserver(debouncedOnResize);

    this.resizeObserver.observe(this.container);

    this.renderer = this.initRenderer(container);

    container.appendChild(this.renderer.view as unknown as Node);

    this.registerPixiInspector();

    this.layerManager = new PixiLayerManager(this);

    this.interactionManager = new PixiInteractionManager(
      this.layerManager.getLatLongFromGlobal.bind(this.layerManager),
      onClick,
      onContext
    );

    this.onMapMove = onMapMove;

    this.stage = new PIXI.Container();
    this.tileRenderer = new PixiTileRenderer(
      this.interactionManager.makeClickable.bind(this.interactionManager),
      this.mapOptions.tileSize
    );

    this.layerManager.setPosition(position);

    this.refresh();
    this.shouldRefreshCounter = 0;

    this.animate();
  }

  private registerPixiInspector() {
    (globalThis as any).__PIXI_RENDERER__ = this.renderer;
    (globalThis as any).__PIXI_STAGE__ = this.stage;
    (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
      (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
  }

  private initRenderer(container: HTMLDivElement): PIXI.IRenderer {
    return new PIXI.Renderer({
      width: container.clientWidth,
      height: container.clientHeight,
      backgroundColor: 0xffffff,
    });

    return PIXI.autoDetectRenderer({
      width: container.clientWidth,
      height: container.clientHeight,
      backgroundColor: 0xffffff,
    });
  }

  private animate(): void {
    if (!this.isDestroyed) {
      this.renderer.render(this.stage);
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  private refresh(): void {
    this.layerManager.refresh();
    this.shouldRefreshCounter = 0;
  }

  private onResize(entries: ResizeObserverEntry[]): void {
    if (!this.isDestroyed) {
      for (let entry of entries) {
        if (entry.target === this.container) {
          this.renderer.resize(this.container.clientWidth, this.container.clientHeight);
          this.layerManager.resize(this.container.clientWidth, this.container.clientHeight);
        }
      }
    }
  }

  public addLayer(layer: MapLayer, index?: number): void {
    this.layerManager.addLayer(layer);
  }

  public getLayers(): MapLayer[] {
    return this.layerManager.getLayers();
  }

  public setPosition(position: IPosition): void {
    this.layerManager.setPosition(position);

    const scale = (position.zoom % 1) * this.mapOptions.minScale + this.mapOptions.minScale;

    this.stage.scale.x = scale;
    this.stage.scale.y = scale;
  }

  private getPosition(): IPosition {
    return this.layerManager.getPosition();
  }

  public revalidateTile(tileKey: number): void {
    this.layerManager.refreshTile(tileKey);
  }

  public panPx(moveVector: Vector2): void {
    this.layerManager.panPx(moveVector);

    this.shouldRefreshCounter += 20;

    if (this.shouldRefreshCounter > this.mapOptions.tileSize) {
      this.refresh();
    }

    if (this.onMapMove) {
      void this.onMapMove(this.getPosition());
    }
  }

  public zoom(deltaZ: number, zoomOrigin: Vector2): void {
    this.layerManager.zoom(deltaZ, zoomOrigin);

    if (this.onMapMove) {
      void this.onMapMove(this.getPosition());
    }

    this.shouldRefreshCounter += 150;
  }

  destroy(): void {
    this.resizeObserver.disconnect();
    this.isDestroyed = true;

    this.container.removeChild(this.renderer.view as unknown as any);

    this.renderer.destroy();
    this.stage.destroy();
  }
}
