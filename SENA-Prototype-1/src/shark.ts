import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Hero extends PIXI.Sprite {

  //GLOBALS
  private speed: number = 0;
  private game: Game;
  private hitbox: PIXI.Rectangle

  //CONSTRUCTOR
  constructor(texture: PIXI.Texture, game: Game) {

    super(texture);
    this.game = game;
    this.pivot.set(0.5)

    this.x = 1200
    this.y = 400
    this.scale.set(0.75, 0.75);

    this.hitbox = new PIXI.Rectangle(30, 150, 175, 70)
    console.log(this.hitbox.x)
    let area = this.getBounds()
    let greenBox = new PIXI.Graphics()
    greenBox.lineStyle(2, 0x33FF33, 1)
    greenBox.drawRect(30, 150, area.width, area.height)
    this.addChild(greenBox)

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));

  }

  //KEYBOARD
  onKeyDown(e: KeyboardEvent): any {
    if (e.key === "ArrowUp") {
      this.speed = -5;
    }
    if (e.key === "ArrowDown") {
      this.speed = 5;
    }
  }
  onKeyUp(e: KeyboardEvent): any {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      this.speed = 0;
    }
  }

  //ANIMATION
  public update() {
    this.y += this.speed;

    this.keepInScreen();
  }

  //BOUNDS
  getBounds(): PIXI.Rectangle {
    return new PIXI.Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y, this.hitbox.width, this.hitbox.height)
  }

  //KEEP IN SCREEN
  private keepInScreen() {
    if (this.getBounds().left > this.game.pixi.screen.right) {
      this.x = this.game.pixi.screen.right;
    }
  }
}
