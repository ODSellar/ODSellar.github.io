export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public add(v: Vector3): this {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
  }

  public sub(v: Vector3): this {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
    this.z = this.z - v.z;

    return this;
  }

  public divideScalar(s: number): this {
    this.x = this.x / s;
    this.y = this.y / s;
    this.z = this.z / s;

    return this;
  }

  public multiplyScalar(s: number): this {
    this.x = this.x * s;
    this.y = this.y * s;
    this.z = this.z * s;

    return this;
  }

  public floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);

    return this;
  }

  public length(): number {
    return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2), 0.5);
  }

  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  public distanceTo(v: Vector3): number {
    return v.clone().sub(this).length();
  }
}
