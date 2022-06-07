import * as PIXI from "pixi.js";
import { Game } from "./game";


export class Hero extends PIXI.Sprite {
    private xspeed = 0;
    private yspeed = 0;
    private mygame: Game;

    constructor(mygame: Game, texture: PIXI.Texture) {
        super(texture);
        this.xspeed = 0;
        this.yspeed = 0;
        this.x = 200;
        this.y = 400;
        this.scale.set(0.2);
        this.mygame = mygame;
        console.log(this.mygame);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }

    public move() {
        this.x += this.xspeed;


    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7;
                break;
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7;
                break;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0;
                break;
        }
    }
}
