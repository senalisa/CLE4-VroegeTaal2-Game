import * as PIXI from 'pixi.js'
import rockImage from "./images/rock.png"
import playerImage from "./images/trollFace.png"
import heartImage from "./images/heart.png"
import backgroundImage from "./images/background.png"
import { Background } from "./background"
import { Rock } from "./rock"
import { Player } from "./player"
import { Heart } from "./heart"

class LevelNigel {

    //Create
    private pixi: PIXI.Application
    private loader: PIXI.Loader
    private player: Player
    private rock: Rock
    private heart: Heart
    private background: Background

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('rockTexture', rockImage)
            .add('trollTexture', playerImage)
            .add('heartTexture', heartImage)
            .add('backgroundTexture', backgroundImage)
        this.loader.load(() => this.startGame())
    }

    //Spawn
    private startGame() {
        this.pixi.ticker.add((delta) => this.update(delta))

        this.background = new Background(this.loader.resources["backgroundTexture"].texture!)
        this.pixi.stage.addChild(this.background)

        this.heart = new Heart(this.loader.resources["heartTexture"].texture!)
        this.pixi.stage.addChild(this.heart)

        this.rock = new Rock(this.loader.resources["rockTexture"].texture!)
        this.pixi.stage.addChild(this.rock)

        this.player = new Player(this.loader.resources["trollTexture"].texture!)
        this.pixi.stage.addChild(this.player)

    }

    // Collision Detections
    collisionDamage(blok: PIXI.Sprite, bubbles: PIXI.Sprite) {
        const boundsPlayer = this.player.getBounds()
        const boundsRock = this.rock.getBounds()

        return boundsPlayer.x < boundsRock.x + boundsRock.width
            && boundsPlayer.x + boundsPlayer.width > boundsRock.x
            && boundsPlayer.y < boundsRock.y + boundsRock.height
            && boundsPlayer.y + boundsPlayer.height > boundsRock.y
    }

    collisionHeal(blok: PIXI.Sprite, heart: PIXI.Sprite) {
        const boundsPlayer = this.player.getBounds()
        const boundsHeart = this.heart.getBounds()

        return boundsPlayer.x < boundsHeart.x + boundsHeart.width
            && boundsPlayer.x + boundsPlayer.width > boundsHeart.x
            && boundsPlayer.y < boundsHeart.y + boundsHeart.height
            && boundsPlayer.y + boundsPlayer.height > boundsHeart.y
    }

    //Life to the game
    private update(delta: number) {

        console.log(this.player.life)

        if (this.collisionDamage(this.player, this.rock)) {
            if (this.player.life = 0) {
                this.player.life -= 0
            } else {
                this.player.life -= 1
            }
        }

        if (this.collisionHeal(this.player, this.heart)) {
            if (this.player.life = 500) {
                this.player.life += 0
            } else {
                this.player.life += 1
            }
        }

        this.rock.fall()
        this.player.move()
        this.heart.fall()
    }
}

let spel = new LevelNigel