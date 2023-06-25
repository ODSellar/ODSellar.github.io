export class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public add(v: Vector2): this {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  public sub(v: Vector2): this {
    this.x = this.x - v.x;
    this.y = this.y - v.y;

    return this;
  }

  public divideScalar(s: number): this {
    this.x = this.x / s;
    this.y = this.y / s;

    return this;
  }

  public multiplyScalar(s: number): this {
    this.x = this.x * s;
    this.y = this.y * s;

    return this;
  }

  public floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    return this;
  }

  public length(): number {
    return this._getHypotenuse(this.x, this.y);
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public distanceTo(v: Vector2): number {
    return this._getHypotenuse(this.x - v.x, this.y - v.y);
  }

  private _getHypotenuse(height: number, width: number): number {
    return Math.pow(Math.pow(height, 2) + Math.pow(width, 2), 0.5);
  }
}
