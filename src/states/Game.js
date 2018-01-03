import Phaser from 'phaser'
import Brick from '../prefabs/Brick'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.setUpText()
    this.setUpBricks()
  }

  setUpText () {
    this.createText(20, 20, 'left', `Score: ${this.game.global.score}`)
    this.createText(0, 20, 'center', `Level: ${this.game.global.level}`)
    this.createText(-20, 20, 'right', `Lives: ${this.game.global.lives}`)
  }

  createText (xOffset, yOffset, align, text) {
    return this.game.add.text(
      xOffset, 
      yOffset, 
      text, 
      {
        font: '18px Arial',
        fill: '#000',
        boundsAlignH: align
      }
    ).setTextBounds(0, 0, this.game.world.width, 0)
  }

  setUpBricks () {
    this.bricks = this.game.add.group()
    this.generateBricks(this.bricks)
  }

  generateBricks (bricksGroup) {
    let rows = 7
    let columns = 15
    let xOffset = 53
    let yOffset = 26
    let brick

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        brick = new Brick(
          this.game, 
          x * xOffset,
          y * yOffset
        )

        bricksGroup.add(brick)
      }
    }

    let bricksGroupWidth = (xOffset * columns) - (xOffset - brick.width)

    bricksGroup.position.setTo(
      this.game.world.centerX - bricksGroupWidth / 2,
      100
    )
  }

  render () {
    
  }
}
