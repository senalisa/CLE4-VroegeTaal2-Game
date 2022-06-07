import * as PIXI from "pixi.js";

export class Letters extends PIXI.Sprite {
  private speed: number;

  constructor(texture: PIXI.Texture) {
    super(texture);
    this.speed = Math.random() * 5;
    this.x = Math.random() * window.innerWidth + 100;
    this.y = 0;
    this.anchor.set(0.5);
    this.scale.set(0.1 + Math.random() * 0.5);

    const filter = new PIXI.filters.ColorMatrixFilter();
    filter.hue(Math.random() * 360, false);
    this.filters = [filter];
  }

  public hit() {
    this.x = window.innerWidth + 100;
  }

  public swim() {
    this.x -= Math.cos(this.x * 0.03) * 1.1;
    this.y += this.speed;
    if (this.x < -100) {
      this.x = Math.random() * window.innerHeight;
      this.y = window.innerWidth + 100;
    }
  }

  public hitShark() {
    console.log("hit shark");
  }
}
