import { MapLayer } from './layers/MapLayer';
import { PixiSceneTile } from './PixiSceneTile';
import * as PIXI from 'pixi.js';
import { Vector3 } from './Vector3';
import { Vector2 } from './Vector2';
import { MercatorTile } from './MercatorTile';
import Utils from '../Utils';
import { PixiTileRenderer } from './PixiTileRenderer';
import { IPosition } from './MercatorMap';
import utils from '../Utils';
import { IVector2 } from '@/cottno/lib/interfaces/IVector2';
import { IMercatorTile } from '@/cottno/lib/interfaces/IMercatorTile';

/**
 * Manages PixiSceneTiles for a layer, this includes moving the tiles around, ensuring the required tiles are drawn and removed.
 */
export class PixiTileManager {
  public layer: MapLayer;
  public tileMap: Map<number, PixiSceneTile>;
  private layerContainer: PIXI.Container;
  private screenHeight: number;
  private screenWidth: number;
  private tileSize: number;
  private tileRenderer: PixiTileRenderer;
  private idCount: number = 0;

  /**
   * Constructor for PixiTileManager.
   *
   * @param layer The layers to manage.
   * @param zoomContainer The container which holds the tiles.
   * @param screenHeight The height of the screen.
   * @param screenWidth The width of the screen.
   * @param tileSize The size of the tiles.
   * @param tileRenderer Renders tiles into sprites.
   */
  constructor(
    layer: MapLayer,
    zoomContainer: PIXI.Container,
    screenHeight: number,
    screenWidth: number,
    tileSize: number,
    tileRenderer: PixiTileRenderer
  ) {
    this.layer = layer;
    this.tileMap = new Map<number, PixiSceneTile>();
    this.tileRenderer = tileRenderer;
    this.layerContainer = zoomContainer;
    this.screenHeight = screenHeight;
    this.screenWidth = screenWidth;
    this.tileSize = tileSize;
  }

  /**
   * Set the width and height of tiles to display in pixels.
   * @param width The width of tiles to display in pixels.
   * @param height The height of tiles to display in pixels.
   */
  public resize(width: number, height: number): void {
    this.screenWidth = width;
    this.screenHeight = height;
    this.refreshTiles();
  }

  /**
   * Sets the position passed to the center of the screen.
   * @param position The position.
   */
  public setPosition(position: IPosition): void {
    const z = Math.floor(position.zoom);

    const x = utils.getMercatorXFromLng(position.long, z, true);
    const y = utils.getMercatorYFromLat(position.lat, z, true);

    const flooredX = Math.floor(x);
    const flooredY = Math.floor(y);

    const centerTile = new MercatorTile(flooredX, flooredY, z);

    const pixiTile = new PixiSceneTile(centerTile, this.tileRenderer);

    pixiTile.updateTile(this.layer);

    const screenPosition = new Vector2(
      this.screenWidth / 2 - (x % 1) * this.tileSize,
      this.screenHeight / 2 - (y % 1) * this.tileSize
    );

    this.cullTiles(this.tileMap);

    this.addTileAtGlobal(pixiTile, screenPosition);

    this.refreshTiles();
  }

  /**
   * Refreshes the tile passed and all its parents.
   * @param tileKey The key of the tile to refresh.
   */
  public refreshTile(tileKey: number): void {
    const tiles = utils.getParentMercatorKeys(tileKey);

    tiles.push(tileKey);

    for (let i = 0; i < tiles.length; i++) {
      const tile = this.tileMap.get(tiles[i]);
      if (tile) {
        tile.updateTile(this.layer);
      }
    }
  }

  /**
   * Adds a tile at a global postion.
   * @param sceneTile The tile to add.
   * @param globalPosition The global position to add the tile.
   * @returns The PixiSceneTile added.
   */
  public addTileAtGlobal(sceneTile: PixiSceneTile, globalPosition: IVector2): PixiSceneTile {
    this.layerContainer.addChild(sceneTile.tileContainer);

    const localPosition = this.layerContainer.toLocal(globalPosition);

    sceneTile.tileContainer.position.x = localPosition.x;
    sceneTile.tileContainer.position.y = localPosition.y;

    this.tileMap.set(sceneTile.tile.key, sceneTile);

    return sceneTile;
  }

  public getFirstTile(): PixiSceneTile {
    return this.tileMap.entries().next().value[1];
  }

  /**
   * Adds Tiles which are visable and removes tiles not visable.
   */
  public refreshTiles(): void {
    const visableTiles = this.getVisableTiles();

    const cullTiles = this.getTilesToCull(visableTiles);

    const positioningTile: PixiSceneTile = this.tileMap.entries().next().value[1];

    const newTiles: PixiSceneTile[] = [];

    for (let i = 0; i < visableTiles.length; i++) {
      if (!this.tileMap.has(visableTiles[i].key)) {
        const newTile = new PixiSceneTile(visableTiles[i], this.tileRenderer);
        newTile.updateTile(this.layer);
        newTiles.push(newTile);
      }
    }

    this.addTilesToScene(newTiles, positioningTile);

    this.cullTiles(cullTiles);
  }

  /**
   * Gets the tiles visable on the screen.
   * @returns An array of visable tiles.
   */
  private getVisableTiles(): MercatorTile[] {
    const radius = this.getHypotenuse(this.screenHeight, this.screenWidth) / 2;
    return this.getTilesInRadius(radius);
  }

  private getHypotenuse(height: number, width: number): number {
    return Math.pow(Math.pow(height, 2) + Math.pow(width, 2), 0.5);
  }

  /**
   * Gets the tiles in a radius from the center of the screen.
   * @param radiusPx The radius in pixels to find tiles.
   * @returns An array of tiles.
   */
  private getTilesInRadius(radiusPx: number): MercatorTile[] {
    const tiles: [number, MercatorTile][] = [];
    const edgeBuffer = 2;
    const radiusTiles =
      Math.floor(radiusPx / this.tileSize / this.layerContainer.scale.x) + edgeBuffer;

    const flooredCenter = this.getMercatorCenter().clone().floor();

    for (let i = -radiusTiles; i < radiusTiles; i++) {
      for (let j = -radiusTiles; j < radiusTiles; j++) {
        if (this.getHypotenuse(i, j) < radiusTiles) {
          const key = Utils.getMercatorKeyFromXYZ(
            flooredCenter.x + j,
            flooredCenter.y + i,
            flooredCenter.z
          );

          const newTile = new MercatorTile(
            flooredCenter.x + j,
            flooredCenter.y + i,
            flooredCenter.z
          );

          if (newTile.isYValid()) {
            tiles.push([Math.abs(i) + Math.abs(j), newTile]);
          }
        }
      }
    }

    tiles.sort((a, b) => b[0] - a[0]);

    return tiles.map((tile) => tile[1]);
  }

  /**
   * Gets the mercator co-ordiates for the center of the screen.
   * @returns The mercator co-ordinates of the center of the screen.
   */
  public getMercatorCenter(): Vector3 {
    const positioningTile: PixiSceneTile = this.tileMap.entries().next().value[1];
    const globalPoint = positioningTile.tileContainer.getGlobalPosition();
    const globalTilePosition: Vector2 = new Vector2(globalPoint.x, globalPoint.y);

    const screenCentre: Vector2 = new Vector2(this.screenWidth, this.screenHeight).divideScalar(2);

    const mercatorDelta: Vector2 = screenCentre
      .clone()
      .sub(globalTilePosition)
      .divideScalar(this.tileSize)
      .divideScalar(this.layerContainer.scale.x);

    const mercatorCenter: Vector3 = new Vector3(
      positioningTile.tile.x + mercatorDelta.x,
      positioningTile.tile.y + mercatorDelta.y,
      positioningTile.tile.z
    );

    return mercatorCenter;
  }

  /**
   * Gets the mercator co-ordiates for the global point passed.
   * @returns The mercator co-ordinates for the global point passed.
   */
  public getMercatorAtGlobal(x: number, y: number): Vector3 {
    const positioningTile: PixiSceneTile = this.tileMap.entries().next().value[1];
    const globalTilePoint = positioningTile.tileContainer.getGlobalPosition();
    const globalTilePosition: Vector2 = new Vector2(globalTilePoint.x, globalTilePoint.y);

    const globalPoint: Vector2 = new Vector2(x, y);

    const mercatorDelta: Vector2 = globalPoint
      .clone()
      .sub(globalTilePosition)
      .divideScalar(this.tileSize)
      .divideScalar(this.layerContainer.scale.x);

    const mercatorAtGlobal: Vector3 = new Vector3(
      positioningTile.tile.x + mercatorDelta.x,
      positioningTile.tile.y + mercatorDelta.y,
      positioningTile.tile.z
    );

    return mercatorAtGlobal;
  }

  /**
   * Adds the tiles passed to the scene.
   * @param tiles The tiles to add to the scene.
   * @param positioningTile A tile already in the scene to position against.
   */
  private addTilesToScene(tiles: PixiSceneTile[], positioningTile: PixiSceneTile): void {
    tiles.forEach((sceneTile) => {
      if (this.tileMap.has(sceneTile.tile.key)) {
        return;
      }

      this.layerContainer.addChild(sceneTile.tileContainer);

      sceneTile.tileContainer.position.x =
        positioningTile.tileContainer.x +
        (sceneTile.tile.x - positioningTile.tile.x) * this.tileSize;
      sceneTile.tileContainer.position.y =
        positioningTile.tileContainer.y +
        (sceneTile.tile.y - positioningTile.tile.y) * this.tileSize;

      this.tileMap.set(sceneTile.tile.key, sceneTile);
    });
  }

  /**
   * Gets a map of tiles which are not in the array of tiles passed but are in the scene.
   * @param visableTiles An array of tiles that are visable.
   * @returns A map of tiles to cull.
   */
  private getTilesToCull(visableTiles: IMercatorTile[]): Map<number, PixiSceneTile> {
    const visableTilesMap: Map<number, IMercatorTile> = new Map(
      visableTiles.map((tile) => [tile.key, tile])
    );

    const cullTiles = new Map<number, PixiSceneTile>();
    this.tileMap.forEach((value, key) => {
      if (!visableTilesMap.has(key)) {
        cullTiles.set(key, value);
      }
    });

    return cullTiles;
  }

  private cullTiles(cullTiles: Map<number, PixiSceneTile>): void {
    cullTiles.forEach((value, key) => {
      value.tileContainer.destroy();
      this.tileMap.delete(key);
    });
  }

  /**
   * Moves the tiles on the screen.
   * @param vector The vector to move the tiles by in local space.
   */
  public moveTiles(vector: IVector2): void {
    this.tileMap.forEach((tile) => {
      tile.tileContainer.position.x += vector.x;
      tile.tileContainer.position.y += vector.y;
    });
  }

  /**
   * Increase the Z values of the tiles.
   */
  public increaseTileZ(): void {
    const positioningTile: PixiSceneTile = this.tileMap.entries().next().value[1];

    const newZpositioningTile = new MercatorTile(
      positioningTile.tile.x * 2,
      positioningTile.tile.y * 2,
      positioningTile.tile.z + 1
    );

    let newZpositioningSceneTile: PixiSceneTile | undefined = undefined;

    const positioningTileGlobal = positioningTile.tileContainer.getGlobalPosition();

    const newScale = this.layerContainer.scale.x / 2;

    const newTileMap: PixiSceneTile[] = [];

    this.tileMap.forEach((tile) => {
      const children = tile.getChildren();

      for (let i = 0; i < children.length; i++) {
        const childTile = children[i];
        newTileMap.push(childTile);
        children[i].updateTile(this.layer);

        if (childTile.tile.key === newZpositioningTile.key) {
          newZpositioningSceneTile = childTile;
        }
      }
    });

    if (!newZpositioningSceneTile) {
      newZpositioningSceneTile = new PixiSceneTile(newZpositioningTile, this.tileRenderer);
    }

    this.cullTiles(this.tileMap);

    this.layerContainer.scale.x = newScale;
    this.layerContainer.scale.y = newScale;

    const scenePositioningTile = this.addTileAtGlobal(
      newZpositioningSceneTile,
      positioningTileGlobal
    );

    this.addTilesToScene(newTileMap, scenePositioningTile);
  }

  /**
   * Decrease the Z value of the tiles.
   */
  public decreaseTileZ(): void {
    const positioningTile: PixiSceneTile = this.tileMap.entries().next().value[1];

    const newZpositioningTile = positioningTile.tile.getParentTile();

    if (positioningTile.tile.x % 2 === 1) {
      positioningTile.tileContainer.position.x -= this.tileSize;
    }

    if (positioningTile.tile.y % 2 === 1) {
      positioningTile.tileContainer.position.y -= this.tileSize;
    }

    const positioningTileGlobal = positioningTile.tileContainer.getGlobalPosition();

    // Revert the X and Y position adjustments made above
    if (positioningTile.tile.x % 2 === 1) {
      positioningTile.tileContainer.position.x += this.tileSize;
    }
    if (positioningTile.tile.y % 2 === 1) {
      positioningTile.tileContainer.position.y += this.tileSize;
    }

    const mercatorCenter = this.getMercatorCenter();

    // Get the mercator center at the new Z
    mercatorCenter.z--;
    mercatorCenter.x = mercatorCenter.x >>> 1;
    mercatorCenter.y = mercatorCenter.y >>> 1;

    const newScale = this.layerContainer.scale.x * 2;

    const newTiles = new Map<number, { distanceFromCenter: number; tile: PixiSceneTile }>();

    for (const [key, childTile] of this.tileMap) {
      // Create new parent tiles and add child tiles to them
      for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= 1; j++) {
          const parentMercator = childTile.tile.getParentTile();

          if (!newTiles.has(parentMercator.key)) {
            newTiles.set(parentMercator.key, {
              distanceFromCenter: this.getHypotenuse(
                mercatorCenter.x - parentMercator.x,
                mercatorCenter.y - parentMercator.y
              ),
              tile: new PixiSceneTile(parentMercator, this.tileRenderer),
            });
          }

          newTiles.get(parentMercator.key)?.tile.addChild(childTile);
        }
      }
    }

    this.cullTiles(this.tileMap);

    this.layerContainer.scale.x = newScale;
    this.layerContainer.scale.y = newScale;

    const newZpositioningSceneTile =
      newTiles.get(newZpositioningTile.key)?.tile ||
      new PixiSceneTile(newZpositioningTile, this.tileRenderer);

    if (!newTiles.has(newZpositioningTile.key)) {
      newZpositioningSceneTile.updateTile(this.layer);
      newTiles.delete(newZpositioningTile.key);
    }

    this.addTileAtGlobal(newZpositioningSceneTile, positioningTileGlobal);

    const newTilesArray = [...newTiles].map((value) => value[1]);

    newTilesArray.sort((a, b) => b.distanceFromCenter - a.distanceFromCenter);

    for (let i = 0; i < newTilesArray.length; i++) {
      newTilesArray[i].tile.updateTile(this.layer);
    }

    this.addTilesToScene(
      newTilesArray.map((tile) => tile.tile),
      newZpositioningSceneTile
    );
  }
}
