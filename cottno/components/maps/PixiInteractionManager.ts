import * as PIXI from 'pixi.js';
import { Vector2 } from './Vector2';
import { IMapClickEvent } from './MercatorMap';
import { SpriteExt } from './SpriteExt';
import { ILatLong } from '@/cottno/lib/interfaces/ILatLong';

/**
 * Handles the user click/touch interaction with the map.
 *
 * There are two kinds of click events, normal clicks, and context clicks, the handlers for these can be passed to the constructor.
 */
export class PixiInteractionManager {
  private readonly LONG_PRESS_DURATION_MS = 500;
  private readonly POINTER_MOVE_THRESHOLD_PX = 5;

  private isLongPressTimerRunning: boolean;
  private longPressTimeout: number;
  private initialPointerPosition: Vector2;
  private activePointers: Set<number>;

  private getLatLongFromGlobal: (x: number, y: number) => ILatLong;
  private onClickHandler?: (ev: IMapClickEvent) => void;
  private onContextHandler?: (ev: IMapClickEvent) => void;

  /**
   * Constructor.
   */
  constructor(
    getLatLongFromGlobal: (x: number, y: number) => ILatLong,
    onClickHandler?: (ev: IMapClickEvent) => void,
    onContextHandler?: (ev: IMapClickEvent) => void
  ) {
    this.isLongPressTimerRunning = false;
    this.longPressTimeout = 0;
    this.initialPointerPosition = new Vector2();
    this.activePointers = new Set<number>();

    this.getLatLongFromGlobal = getLatLongFromGlobal;
    this.onClickHandler = onClickHandler;
    this.onContextHandler = onContextHandler;
  }

  /**
   * Make the display object passed clickable.
   * @param sceneObject DisplayObject to make clickable.
   */
  public makeClickable(sceneObject: PIXI.DisplayObject): void {
    sceneObject.eventMode = `static`;

    sceneObject.onpointerdown = this.handlePointerDown;
    sceneObject.onpointermove = this.handlePointerMove;
    sceneObject.onpointerup = this.handlePointerUp;
    sceneObject.onpointercancel = this.handlePointerCancel;
  }

  private handlePointerDown = (event: PIXI.FederatedPointerEvent): void => {
    this.activePointers.add(event.pointerId);
    if (this.activePointers.size > 1) {
      if (this.isLongPressTimerRunning) {
        clearTimeout(this.longPressTimeout);
        this.isLongPressTimerRunning = false;
      }
      return;
    }

    this.initialPointerPosition.x = event.client.x;
    this.initialPointerPosition.y = event.client.y;
    this.longPressTimeout = window.setTimeout(
      () => this.triggerLongPressEvent(event),
      this.LONG_PRESS_DURATION_MS
    );
    this.isLongPressTimerRunning = true;
  };

  private handlePointerMove = (event: PIXI.FederatedPointerEvent): void => {
    if (!this.isLongPressTimerRunning) return;

    const currentPosition: Vector2 = new Vector2(event.client.x, event.client.y);

    if (this.hasPointerMovedTooMuch(currentPosition)) {
      clearTimeout(this.longPressTimeout);
      this.isLongPressTimerRunning = false;
    }
  };

  private handlePointerUp = (event: PIXI.FederatedPointerEvent): void => {
    this.activePointers.delete(event.pointerId);

    if (!this.isLongPressTimerRunning) {
      return;
    }

    clearTimeout(this.longPressTimeout);
    this.isLongPressTimerRunning = false;

    const currentPosition: Vector2 = new Vector2(event.client.x, event.client.y);

    if (!this.hasPointerMovedTooMuch(currentPosition)) {
      this.triggerClickEvent(event);
    }
  };

  private handlePointerCancel = (event: PIXI.FederatedPointerEvent): void => {
    this.activePointers.delete(event.pointerId);

    if (this.isLongPressTimerRunning) {
      clearTimeout(this.longPressTimeout);
      this.isLongPressTimerRunning = false;
    }
  };

  private hasPointerMovedTooMuch(currentPosition: Vector2): boolean {
    const dx = Math.abs(currentPosition.x - this.initialPointerPosition.x);
    const dy = Math.abs(currentPosition.y - this.initialPointerPosition.y);

    return dx > this.POINTER_MOVE_THRESHOLD_PX || dy > this.POINTER_MOVE_THRESHOLD_PX;
  }

  private triggerLongPressEvent = (event: PIXI.FederatedPointerEvent): void => {
    this.isLongPressTimerRunning = false;

    const latLong = this.getLatLongFromGlobal(event.global.x, event.global.y);

    const ev: IMapClickEvent = {
      clientX: event.clientX,
      clientY: event.clientY,
      lat: latLong.lat,
      long: latLong.long,
      spriteProperties: (event.target as SpriteExt).properties,
      layerId: (event.target as SpriteExt).layerId,
    };

    if (this.onContextHandler) {
      this.onContextHandler(ev);
    }
  };

  private triggerClickEvent(event: PIXI.FederatedPointerEvent): void {
    const latLong = this.getLatLongFromGlobal(event.global.x, event.global.y);

    const ev: IMapClickEvent = {
      clientX: event.clientX,
      clientY: event.clientY,
      lat: latLong.lat,
      long: latLong.long,
      spriteProperties: (event.target as SpriteExt).properties,
      layerId: (event.target as SpriteExt).layerId,
    };

    if (this.onClickHandler) {
      this.onClickHandler(ev);
    }
  }
}
