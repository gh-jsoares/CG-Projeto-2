'use strict'

import Ball from './Ball.js'
import { genRandomIntInRange } from './Utils.js'

export default class BallManager {

    constructor(scene, amount) {
        this.scene = scene
        this.obj = new THREE.Object3D()

        this.balls = []
        for(let i = 0; i < amount; i++)
            this.addBall()
    }

    animate(deltatime) {
        this.balls.forEach((ball) => ball.animate(deltatime))
    }

    addToScene(scene) {
        this.balls.forEach((ball) => ball.addToScene(scene))
    }

    addBall() {
        let x = genRandomIntInRange(-15, 15)
        let y = genRandomIntInRange(15, 15)
        let z = genRandomIntInRange(-15, 15)
        let radius = genRandomIntInRange(1, 5)
        let dy = genRandomIntInRange(10, 50)
        console.log(`Creating ball @ x= ${x}, y= ${y}, z= ${z} with radius= ${radius} and dy= ${dy}`)

        let ball = new Ball(x, y, z, radius, dy)

        this.balls.push(ball)
        this.obj.add(ball.obj)

    }

    removeBall(ball) {
        let index = this.balls.findIndex((b) => b == ball)
        ball.removeFromScene(this.scene)
        this.balls.splice(index, 1)
    }

}