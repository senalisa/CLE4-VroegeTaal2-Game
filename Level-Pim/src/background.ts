import * as PIXI from 'pixi.js'

export class Background extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)

        this.scale.set(0.11)

        this.x = 0
        this.y = 0
    }
}