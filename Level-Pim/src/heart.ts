import * as PIXI from 'pixi.js'

export class Heart extends PIXI.Sprite {

    private speed: number

    constructor(texture: PIXI.Texture) {
        super(texture)

        this.scale.set(0.1)
        this.pivot.set(0.5)

        let area = this.getBounds()
        let hitBox = new PIXI.Graphics()
        hitBox.drawRect(0, 0, area.width, area.height)
        this.addChild(hitBox)

        this.speed = 2
        this.y = 600
        this.x = Math.random() * 800

    }

    fall() {
        this.y += this.speed * Math.random() * 1.5

        if (this.y > 460) {
            this.y = -25
            this.x = Math.random() * 800
        }
    }
}