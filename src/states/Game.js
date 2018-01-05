import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'

export default class extends Phaser.State {
  constructor () {
    super()

    this.ballOnPaddle = true
  }

  init () {}
  preload () {}

  create () {
    this.setUpText()
    this.setUpBricks()
    this.setUpPaddle()
    this.setUpBall()

    this.game.input.onDown.add(this.releaseBall, this)
  }

  setUpText () {
    this.scoreText = this.createText(20, 20, 'left', `Score: ${this.game.global.score}`)
    this.levelText = this.createText(0, 20, 'center', `Level: ${this.game.global.level}`)
    this.livesText = this.createText(-20, 20, 'right', `Lives: ${this.game.global.lives}`)
  }

  createText (xOffset, yOffset, align, text) {
    return this.game.add.text(
      xOffset, 
      yOffset, 
      text, 
      {
        font: '18px Arial',
        fill: '#fff',
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

  setUpPaddle () {
    this.paddle = new Paddle(
      this.game,
      this.game.world.centerX,
      this.game.world.height - 150
    )

    this.game.add.existing(this.paddle)
  }

  setUpBall () {
    this.ball = new Ball(this.game)

    this.game.add.existing(this.ball)

    this.putBallOnPaddle()
  }

  putBallOnPaddle () {
    this.ballOnPaddle = true

    this.ball.reset(
      this.paddle.body.x, 
      this.paddle.y - this.paddle.body.height - this.ball.height / 2
    )
  }

  releaseBall () {
    if (!this.ballOnPaddle) {
      return
    }

    this.ballOnPaddle = false

    this.ball.body.velocity.x = 30
    this.ball.body.velocity.y = -450
  }

  update () {
    if (this.ballOnPaddle) {
      this.ball.body.x = this.paddle.x - this.ball.width / 2
    }

    this.game.physics.arcade.collide(
      this.ball,
      this.paddle,
      this.ballHitPaddle,
      null,
      this
    )

    this.game.physics.arcade.collide(
      this.ball,
      this.bricks,
      this.ballHitBrick,
      null,
      this
    )
  }

  ballHitPaddle (ball, paddle) {
    let diff = 0

    if (ball.x < paddle.x) {
      diff = paddle.x - ball.x
      ball.body.velocity.x = -10 * diff

      return
    }

    if (ball.x > paddle.x) {
      diff = ball.x - paddle.x
      ball.body.velocity.x = 10 * diff

      return
    }
  }

  ballHitBrick (ball, brick) {
    brick.kill()

    this.game.global.score += 10
    this.scoreText.text = `Score: ${this.game.global.score}`
  }

  render () {
    
  }
}
