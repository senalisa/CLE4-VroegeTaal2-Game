import * as PIXI from 'pixi.js'

export class Rock extends PIXI.Sprite {

    private speed: number

    constructor(texture: PIXI.Texture) {
        super(texture)

        this.scale.set(0.15)
        this.pivot.set(0.5)

        let area = this.getBounds()
        let hitBox = new PIXI.Graphics()
        hitBox.drawRect(0, 0, area.width, area.height)
        this.addChild(hitBox)

        this.speed = 1
        this.y = 600 // Verander deze waarde in programmeer les
        this.x = Math.random() * 800
    }

    fall() {
        this.y += this.speed * Math.random() * 2

        if (this.y > 460) {
            this.y = -25
            this.x = Math.random() * 800
        }
    }

}