import { Vector2 } from './Vector2';
import { MercatorMap } from './MercatorMap';

interface IMoveEvent {
  moveVector: Vector2;
  timeStamp: number;
}

/**
 * Handles user interaction for moving around the map. Click and touch are supported.
 */
export class MapController {
  map: MercatorMap;

  currentEvents: PointerEvent[];

  moveEventCache: IMoveEvent[];

  momentumVelocityPxPerS: Vector2;

  pointerDownRef: (event: PointerEvent) => void;
  pointerUpRef: (event: PointerEvent) => void;
  pointerOutRef: (event: PointerEvent) => void;
  pointerMoveRef: (event: PointerEvent) => void;
  wheelRef: (wheelEvent: WheelEvent) => void;
  contextMenuRef: (event: MouseEvent) => void;

  disposed: boolean;

  /**
   * Constructor
   * @param map The map to link the controller to.
   */
  constructor(map: MercatorMap) {
    this.map = map;
    this.currentEvents = [];
    this.moveEventCache = [];
    this.momentumVelocityPxPerS = new Vector2();

    this.pointerDownRef = this.handlePointerDown.bind(this);
    this.pointerUpRef = this.handlePointerUp.bind(this);
    this.pointerOutRef = this.handlePointerUp.bind(this);
    this.pointerMoveRef = this.handlePointerMove.bind(this);
    this.wheelRef = this.handleWheel.bind(this);
    this.contextMenuRef = (event: MouseEvent): void => {
      event.preventDefault();
    };

    this.registerListeners();

    this.disposed = false;
  }

  /**
   * Registers event listeners to the map container.
   */
  public registerListeners() {
    this.map.container.addEventListener(`pointerdown`, this.pointerDownRef);
    this.map.container.addEventListener(`pointerup`, this.pointerUpRef);
    this.map.container.addEventListener(`pointerout`, this.pointerOutRef);
    this.map.container.addEventListener(`pointermove`, this.pointerMoveRef);
    this.map.container.addEventListener(`wheel`, this.wheelRef, true);
    this.map.container.addEventListener(`contextmenu`, this.contextMenuRef);
  }

  /**
   * Deregisters event listeners from the map container.
   */
  public deregisterListeners() {
    this.map.container.removeEventListener(`pointerdown`, this.pointerDownRef);
    this.map.container.removeEventListener(`pointerup`, this.pointerUpRef);
    this.map.container.removeEventListener(`pointerout`, this.pointerOutRef);
    this.map.container.removeEventListener(`pointermove`, this.pointerMoveRef);
    this.map.container.removeEventListener(`wheel`, this.wheelRef, true);
    this.map.container.removeEventListener(`contextmenu`, this.contextMenuRef);
  }

  private handlePointerDown(event: PointerEvent) {
    this.momentumVelocityPxPerS = new Vector2();

    // There can be two pointer down events with the same pointerId if the user right left clicks, right clicks, and left clicks again
    if (!this.currentEvents.find((e: PointerEvent) => e.pointerId === event.pointerId)) {
      this.currentEvents.push(event);
    }
  }

  private handlePointerUp(event: PointerEvent) {
    const index = this.currentEvents.findIndex(
      (e: PointerEvent) => e.pointerId === event.pointerId
    );

    this.currentEvents.splice(index, 1);

    if (this.currentEvents.length === 0) {
      this.handleMoveMomentum(event);
    }

    const test = 0;
  }

  private handleWheel(wheelEvent: WheelEvent) {
    wheelEvent.preventDefault();

    const deltaZ = wheelEvent.deltaY < 0 ? 0.1 : -0.1;

    const zoomOrigin = new Vector2(this.getLocalX(wheelEvent), this.getLocalY(wheelEvent));

    this.map.zoom(deltaZ, zoomOrigin);
  }

  private handlePointerMove(event: PointerEvent) {
    const index = this.currentEvents.findIndex((e) => e.pointerId === event.pointerId);

    if (index === -1) {
      return;
    }

    const previousEvent = this.currentEvents[index];

    if (this.currentEvents.length === 1) {
      const moveVector = new Vector2(
        event.clientX - previousEvent.clientX,
        event.clientY - previousEvent.clientY
      );

      this.handleMove(moveVector, event.timeStamp);
    } else {
      this.handleGesture(event, event.timeStamp);
    }

    this.currentEvents[index] = event;
  }

  private handleMove(moveVector: Vector2, timeStamp: number): void {
    this.moveEventCache.push({ moveVector, timeStamp });

    if (this.moveEventCache.length > 40) {
      this.moveEventCache.shift();
    }

    this.map.panPx(moveVector);
  }

  private handleMoveMomentum(pointerUpEvent: PointerEvent): void {
    // Only take the events in the last X ms
    const momentumLastXms = pointerUpEvent.pointerType === `mouse` ? 40 : 100;

    const filteredEvents = this.moveEventCache.filter(
      (e) => pointerUpEvent.timeStamp - e.timeStamp < momentumLastXms
    );
    this.moveEventCache = [];

    if (filteredEvents.length < 5) {
      return;
    }

    const sumMoveVector = filteredEvents
      .map((e) => e.moveVector)
      .reduce((prev, current) => current.add(prev));

    const timeStamps = filteredEvents.map((e) => e.timeStamp);

    const timeRangeMs = Math.max(...timeStamps) - Math.min(...timeStamps);

    const averageVelocityPxPerSecond = sumMoveVector.divideScalar(timeRangeMs / 1000);

    if (averageVelocityPxPerSecond.length() > 100) {
      this.momentumVelocityPxPerS = averageVelocityPxPerSecond;
      this.momentumBurnOff();
    }
  }

  // Todo: fine tune this so that in feels nice
  private momentumBurnOff(): void {
    if (this.disposed) {
      return;
    }

    const intervalSeconds = 0.007;

    const moveVector = this.momentumVelocityPxPerS.clone().multiplyScalar(intervalSeconds);

    if (moveVector.length() < 0.3) {
      return;
    }

    this.map.panPx(moveVector);

    this.momentumVelocityPxPerS.multiplyScalar(0.99);

    setTimeout(this.momentumBurnOff.bind(this), intervalSeconds / 1000);
  }

  private handleGesture(event: PointerEvent, timeStamp: number): void {
    this.handleMoveGesture(event, timeStamp);
    this.handleZoomGesture(event);
  }

  private handleMoveGesture(event: PointerEvent, timeStamp: number): void {
    const currentCenter = this.getGestureCenter();
    const newCenter = this.getGestureCenter(event);

    const moveVector = newCenter.sub(currentCenter);

    this.handleMove(moveVector, timeStamp);
  }

  private handleZoomGesture(event: PointerEvent): void {
    const currentCenter = this.getGestureCenter();
    const newCenter = this.getGestureCenter(event);

    const currentDistanceSum = this.currentEvents
      .map((e) => new Vector2(this.getLocalX(e), this.getLocalY(e)).distanceTo(currentCenter))
      .reduce((prev, current) => prev + current);

    const newDistanceSum = this.currentEvents
      .map((e) =>
        e.pointerId === event.pointerId
          ? new Vector2(this.getLocalX(event), this.getLocalY(event)).distanceTo(currentCenter)
          : new Vector2(this.getLocalX(e), this.getLocalY(e)).distanceTo(currentCenter)
      )
      .reduce((prev, current) => prev + current);

    const zoomFactor =
      (newDistanceSum - currentDistanceSum) / Math.max(newDistanceSum, currentDistanceSum);

    this.map.zoom(zoomFactor, newCenter);
  }

  private getGestureCenter(newEvent?: PointerEvent): Vector2 {
    const x =
      this.currentEvents
        .map((e) =>
          newEvent && e.pointerId === newEvent.pointerId
            ? this.getLocalX(newEvent)
            : this.getLocalX(e)
        )
        .reduce((prev, current) => prev + current) / this.currentEvents.length;

    const y =
      this.currentEvents
        .map((e) =>
          newEvent && e.pointerId === newEvent.pointerId
            ? this.getLocalY(newEvent)
            : this.getLocalY(e)
        )
        .reduce((prev, current) => prev + current) / this.currentEvents.length;

    return new Vector2(x, y);
  }

  private getLocalX(event: PointerEvent | WheelEvent): number {
    return event.clientX - this.map.container.offsetLeft;
  }

  private getLocalY(event: PointerEvent | WheelEvent): number {
    return event.clientY - this.map.container.offsetTop;
  }

  public dispose(): void {
    this.disposed = true;
    this.deregisterListeners();
  }
}
