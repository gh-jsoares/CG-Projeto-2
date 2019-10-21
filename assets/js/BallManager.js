'use strict'

import Ball from './Ball.js'
import { genRandomIntInRange, getDistance } from './Utils.js'

export default class BallManager {

    constructor(scene, amount) {
        this.scene = scene
        this.obj = new THREE.Object3D()

        this.balls = []
        for(let i = 0; i < amount; i++)
            this.addBall()

        this.registerEvents()
    }

    animate(deltatime) {
        this.balls.forEach((ball) => ball.animate(deltatime))
    }

    addToScene(scene) {
        this.balls.forEach((ball) => ball.addToScene(scene))
    }

    generateCoordinates() {
        let position = new THREE.Vector3()
        position.x = genRandomIntInRange(-15, 15)
        position.y = genRandomIntInRange(3, 3)
        position.z = genRandomIntInRange(-15, 15)
        return position
    }

    addBall() {
        let position = this.generateCoordinates()
        for(let i = 0; i < this.balls.length; i++) {
            let b = this.balls[i].obj
            let d = getDistance(position.x, position.y, position.z, b.position.x, b.position.y, b.position.z)

            if(d <= 2 * Ball.RADIUS) {
                position = this.generateCoordinates()
                i = -1
            }
        }

        let ball = new Ball(position.x, position.y, position.z, position.x, 10)

        this.balls.push(ball)
        this.obj.add(ball.obj)
    }

    fireBall(x, y, z) {
        let ball = new Ball(x, y, z, x, 10)
        ball.getObject3D().position.copy(position).add(direction.clone().multiplyScalar(180))
        ball.getObject3D().rotation.copy(rotation)

        ball.addToScene(this.scene)
        this.balls.push(ball)
        this.obj.add(ball.obj)
    }

    removeBall(ball) {
        let index = this.balls.findIndex((b) => b == ball)
        ball.removeFromScene(this.scene)
        this.balls.splice(index, 1)
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 82) // r
                this.balls.forEach((b) => b.toggleAxesHelper())
        })
    }

    toggleWireframe() {
        this.balls.forEach((b) => b.toggleWireframe())
    }
}
