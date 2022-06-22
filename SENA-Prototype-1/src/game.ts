//IMPORT
import * as PIXI from "pixi.js";

//IMAGES
import enemyImage from "./images/cloudwhite.png";
import skyImage from "./images/sky.png";
import heroImage from "./images/heroflying.png";

import { Enemy } from "./fish";
import { Hero } from "./shark";

//GAME CLASS
export class Game {

  //GLOBALS
  public pixi: PIXI.Application;
  public fishes: Enemy[] = [];
  public loader: PIXI.Loader;
  public shark: Hero;

  //CONSTRUCTOR
  constructor() {

    //PIXI CANVAS 
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      forceCanvas: true
    });
    document.body.appendChild(this.pixi.view);

    //LOADER
    this.loader = new PIXI.Loader();
    this.loader
      .add("enemyTexture", enemyImage)
      .add("skyTexture", skyImage)
      .add("playerTexture", heroImage)
    this.loader.load(() => this.loadCompleted());

  }

  //LOAD COMPLETED
  loadCompleted() {

    //BACKGROUND
    let background = new PIXI.Sprite(this.loader.resources["skyTexture"].texture!);
    background.scale.set(
      window.innerWidth / background.getBounds().width,
      window.innerHeight / background.getBounds().height
    );
    this.pixi.stage.addChild(background);

    //ENEMIES
    for (let i = 0; i < 1; i++) {
      let fish = new Enemy(this.loader.resources["enemyTexture"].texture!, this);
      this.fishes.push(fish);
      this.pixi.stage.addChild(fish);
    }

    //PLAYER HERO
    this.shark = new Hero(this.loader.resources["playerTexture"].texture!, this);
    this.pixi.stage.addChild(this.shark);

    //ANIMATION 
    this.pixi.ticker.add((delta: number) => this.update(delta));
  }

  //UPDATE DELTA
  update(delta: number) {

    //UPDATE ANIMATIONS
    this.shark.update();

    //ENEMY/PLAYER COLLISION DETECTION
    for (const fish of this.fishes) {
      fish.update(delta);
      if (this.collision(this.shark, fish)) {
        fish.tint = 0x630000;

        setTimeout(function () {
          fish.tint = 0xFFFFFF;
        }, 1000);

      }
    }
  }

  //COLLISION
  collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }
}
