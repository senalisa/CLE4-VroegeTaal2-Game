import * as PIXI from 'pixi.js'

export class Player extends PIXI.Sprite {

    private xspeed = 0
    public life = 500

    constructor(texture: PIXI.Texture) {
        super(texture)

        this.scale.set(0.2)
        this.pivot.set(0.5)

        let area = this.getBounds()
        let greenBox = new PIXI.Graphics()
        greenBox.drawRect(0, 0, area.width, area.height)
        this.addChild(greenBox)

        this.x = 400
        this.y = 350

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break
            case "A":
            case "ARROWLEFT":
                this.xspeed = -8
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 8
                break
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
                this.xspeed = 0
                break
        }
    }

    public move() {
        this.x += this.xspeed
    }
}