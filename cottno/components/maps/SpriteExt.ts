import * as PIXI from 'pixi.js';

export class SpriteExt extends PIXI.Sprite {
  properties?: string;
  layerId?: number;

  constructor(properties?: any, layerId?: number, texture?: PIXI.Texture) {
    super(texture);
    this.properties = properties;
    this.layerId = layerId;
  }
}
