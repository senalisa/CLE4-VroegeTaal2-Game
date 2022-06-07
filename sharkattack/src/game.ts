//IMPORT
import * as PIXI from "pixi.js";

//IMAGES
import enemyImage from "./images/enemycloud.png";
import skyImage from "./images/sky.png";
import heroImage from "./images/superhero.png";

//LETTERS
import letterAImage from "./images/letterA.png"
import letterBImage from "./images/letterB.png"
import letterCImage from "./images/letterC.png"
import letterDImage from "./images/letterD.png"
import letterEImage from "./images/letterE.png"
import letterFImage from "./images/letterF.png"
import letterGImage from "./images/letterG.png"
import letterHImage from "./images/letterH.png"

//SOUND
import letterASound from "./sound/A.mp3";
import bgSound from "./sound/dino.mp3";

import { Enemy } from "./fish";
import { Hero } from "./shark";
import { LetterA } from "./letterA";
import { LetterB } from "./letterB";
import { LetterC } from "./letterC";
import { LetterD } from "./letterD";
import { LetterE } from "./letterE";
import { LetterF } from "./letterF";
import { LetterG } from "./letterG";
import { LetterH } from "./letterH";

//GAME CLASS
export class Game {

  //GLOBALS
  public pixi: PIXI.Application;
  public fishes: Enemy[] = [];
  public loader: PIXI.Loader;
  public shark: Hero;

  public letterA: LetterA;
  public letterB: LetterB;
  public letterC: LetterC;
  public letterD: LetterD;
  public letterE: LetterE;
  public letterF: LetterF;
  public letterG: LetterG;
  public letterH: LetterH;


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
      .add("letterATexture", letterAImage)
      .add("letterBTexture", letterBImage)
      .add("letterCTexture", letterCImage)
      .add("letterDTexture", letterDImage)
      .add("letterETexture", letterEImage)
      .add("letterFTexture", letterFImage)
      .add("letterGTexture", letterGImage)
      .add("letterHTexture", letterHImage)
      .add("ASound", letterASound)
      .add("bgSound", bgSound)
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

    let skySound = this.loader.resources["bgSound"].data!;
    skySound.loop = true;
    skySound.muted = true;
    skySound.play();


    //ENEMIES
    for (let i = 0; i < 4; i++) {
      let fish = new Enemy(this.loader.resources["enemyTexture"].texture!, this);
      this.fishes.push(fish);
      this.pixi.stage.addChild(fish);
    }

    //PLAYER HERO
    this.shark = new Hero(this.loader.resources["playerTexture"].texture!, this);
    this.pixi.stage.addChild(this.shark);

    //LETTER A
    this.letterA = new LetterA(this.loader.resources["letterATexture"].texture!, this);
    this.pixi.stage.addChild(this.letterA);

    //LETTER B
    this.letterB = new LetterB(this.loader.resources["letterBTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterB);

    //LETTER C
    this.letterC = new LetterC(this.loader.resources["letterCTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterC);

    //LETTER D
    this.letterD = new LetterD(this.loader.resources["letterDTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterD);

    //LETTER E
    this.letterE = new LetterE(this.loader.resources["letterETexture"].texture!, this);
    this.pixi.stage.addChild(this.letterE);

    //LETTER F
    this.letterF = new LetterF(this.loader.resources["letterFTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterF);

    //LETTER G
    this.letterG = new LetterG(this.loader.resources["letterGTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterG);

    //LETTER H
    this.letterH = new LetterH(this.loader.resources["letterHTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterH);

    //ANIMATION 
    this.pixi.ticker.add((delta: number) => this.update(delta));
  }

  //UPDATE DELTA
  update(delta: number) {

    //UPDATE ANIMATIONS
    this.shark.update();
    this.letterA.update(delta);
    this.letterB.update(delta);
    this.letterC.update(delta);
    this.letterD.update(delta);
    this.letterE.update(delta);
    this.letterF.update(delta);
    this.letterG.update(delta);
    this.letterH.update(delta);

    //ENEMY/PLAYER COLLISION DETECTION
    for (const fish of this.fishes) {
      fish.update(delta);
      if (this.collision(this.shark, fish)) {
        fish.tint = 0x630000;

        setTimeout(function () {
          fish.tint = 0xD7D4D2;
        }, 1000);

      }
    }

    //COLLISION WITH LETTER A
    if (this.collision(this.shark, this.letterA)) {

      this.pixi.stage.removeChild(this.letterA);

      let letterAShow = new LetterA(this.loader.resources["letterATexture"].texture!, this);
      letterAShow.width = 57;
      letterAShow.height = 57;
      letterAShow.position.set(60, 32.5);
      this.pixi.stage.addChild(letterAShow);

      // let soundA = this.loader.resources["ASound"].data!
      // soundA.loop = false;
      // soundA.play()

    }

    //COLLISION WITH LETTER B
    if (this.collision(this.shark, this.letterB)) {

      this.pixi.stage.removeChild(this.letterB);

      let letterBShow = new LetterB(this.loader.resources["letterBTexture"].texture!, this);
      letterBShow.width = 57;
      letterBShow.height = 57;
      letterBShow.position.set(120, 32.5);
      this.pixi.stage.addChild(letterBShow);

    }

    //COLLISION WITH LETTER C
    if (this.collision(this.shark, this.letterC)) {

      this.pixi.stage.removeChild(this.letterC);

      let letterCShow = new LetterC(this.loader.resources["letterCTexture"].texture!, this);
      letterCShow.width = 57;
      letterCShow.height = 57;
      letterCShow.position.set(180, 32.5);
      this.pixi.stage.addChild(letterCShow);

    }

    //COLLISION WITH LETTER D
    if (this.collision(this.shark, this.letterD)) {

      this.pixi.stage.removeChild(this.letterD);

      let letterDShow = new LetterD(this.loader.resources["letterDTexture"].texture!, this);
      letterDShow.width = 57;
      letterDShow.height = 57;
      letterDShow.position.set(240, 32.5);
      this.pixi.stage.addChild(letterDShow);

    }

    //COLLISION WITH LETTER E
    if (this.collision(this.shark, this.letterE)) {

      this.pixi.stage.removeChild(this.letterE);

      let letterEShow = new LetterE(this.loader.resources["letterETexture"].texture!, this);
      letterEShow.width = 57;
      letterEShow.height = 57;
      letterEShow.position.set(300, 32.5);
      this.pixi.stage.addChild(letterEShow);

    }

    //COLLISION WITH LETTER F
    if (this.collision(this.shark, this.letterF)) {

      this.pixi.stage.removeChild(this.letterF);

      let letterFShow = new LetterF(this.loader.resources["letterFTexture"].texture!, this);
      letterFShow.width = 57;
      letterFShow.height = 57;
      letterFShow.position.set(360, 32.5);
      this.pixi.stage.addChild(letterFShow);

    }

    //COLLISION WITH LETTER G
    if (this.collision(this.shark, this.letterG)) {

      this.pixi.stage.removeChild(this.letterG);

      let letterGShow = new LetterG(this.loader.resources["letterGTexture"].texture!, this);
      letterGShow.width = 57;
      letterGShow.height = 57;
      letterGShow.position.set(420, 32.5);
      this.pixi.stage.addChild(letterGShow);

    }

    //COLLISION WITH LETTER H
    if (this.collision(this.shark, this.letterH)) {

      this.pixi.stage.removeChild(this.letterH);

      let letterHShow = new LetterH(this.loader.resources["letterHTexture"].texture!, this);
      letterHShow.width = 57;
      letterHShow.height = 57;
      letterHShow.position.set(480, 32.5);
      this.pixi.stage.addChild(letterHShow);

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
