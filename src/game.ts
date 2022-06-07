import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import backgroundImage from "./images/background.png"
import heroImage from "./images/hero.png"
import { Hero } from "./Hero.1"
import { Letters } from './letters'


export class Game {
  pixi: PIXI.Application;
  loader: PIXI.Loader;
  letters: Letters[] = [];
  hero: Hero;

  constructor() {
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        document.body.appendChild(this.pixi.view)

   

    console.log("starting .. ?");

    this.loader = new PIXI.Loader();
    this.loader
      .add("fishTexture", fishImage)
      .add("bubbleTexture", bubbleImage)
      .add("backgroundTexture", backgroundImage)
      .add("heroTexture", heroImage);

    this.loader.onProgress.add((loader) => this.showProgress(loader));
    this.loader.onError.add((arg) => {
      console.error(arg);
    });
    this.loader.load(() => this.startGame());
  }

  private showProgress(p: PIXI.Loader) {
    console.log(p.progress);
  }

  private startGame() {
    let bg = new PIXI.TilingSprite(
      this.loader.resources["backgroundTexture"].texture!,
      this.pixi.screen.width,
      this.pixi.screen.height
    );
    this.pixi.stage.addChild(bg);

    for (let i = 0; i < 14; i++) {
      let letters = new Letters(this.loader.resources["fishTexture"].texture!);
      this.pixi.stage.addChild(letters);
      this.letters.push(letters);
    }

    this.hero = new Hero(
      this,
      this.loader.resources["heroTexture"].texture!
    );
    this.pixi.stage.addChild(this.hero);

    this.pixi.ticker.add(() => this.update());
  }





  private update() {
    for (let letters of this.letters) {
        letters.swim();
       
                  
      }
   

    this.hero.move();
  }

  
}


