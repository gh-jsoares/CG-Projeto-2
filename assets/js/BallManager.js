'use strict'

class BallManager {

    constructor(scene, amount) {
        this.scene = scene
        this.obj = new THREE.Object3D()

        this.balls = []
        for(let i = 0; i < amount; i++)
            this.addBall()

        this.registerEvents()
        this.showAxis = false
        this.showWireframe = false
        this.setActiveBall(this.getLastBall())
    }

    getLastBall() {
        return this.balls[this.balls.length - 1]
    }

    setActiveBall(ball) {
        if(this.activeBall)
            this.activeBall.obj.remove(this.scene.getObjectByName('camera'))
        this.activeBall = ball
    }

    animate(deltatime) {
        for(let i = this.balls.length - 1; i >= 0; i--) {
            const b1 = this.balls[i]
            for (let j = i - 1; j >= 0; j--) {
                const b2 = this.balls[j]
                let tpos1 = computePosition(b1.obj.position, deltatime, new THREE.Vector2(b1.obj.userData.velocityX, b1.obj.userData.velocityZ))
                let tpos2 = computePosition(b2.obj.position, deltatime, new THREE.Vector2(b2.obj.userData.velocityX, b2.obj.userData.velocityZ))
                if(tpos1.x - Ball.RADIUS <= 24 && getDistance(tpos1.x, tpos1.y, tpos1.z, tpos2.x, tpos2.y, tpos2.z) - Math.pow(2 * Ball.RADIUS, 2) <= 0 ) {
                    b1.handleCollision(b2)
                }
            }
            b1.animate(deltatime)

            if(b1.obj.position.y < -70)
                this.removeBall(i)
        }
    }

    addToScene(scene) {
        this.balls.forEach((ball) => ball.addToScene(scene))
    }

    generateCoordinates() {
        let position = new THREE.Vector3()
        position.x = genRandomIntInRange(-19, 17)
        position.y = Floor.HEIGHT / 2 - Wall.HEIGHT / 2 + Ball.RADIUS
        position.z = genRandomIntInRange(-19, 19)
        return position
    }

    createBall(x, y, z, angle, speed) {
        let ball = new Ball(x, y, z, angle, speed, this.showAxis, this.showWireframe)

        this.balls.push(ball)
        this.obj.add(ball.obj)

        ball.addToScene(this.scene)
        
        return ball
    }

    addBall() {
        let position = this.generateCoordinates()
        for(let i = 0; i < this.balls.length; i++) {
            let b = this.balls[i].obj
            let d = getDistance(position.x, position.y, position.z, b.position.x, b.position.y, b.position.z)

            if(d <= Math.pow(2 * Ball.RADIUS, 2)) {
                position = this.generateCoordinates()
                i = -1
            }
        }

        this.createBall(position.x, position.y, position.z, position.x, 0)
    }

    removeBall(i) {
        let ball = this.balls[i]
        ball.removeFromScene(this.scene)
        if(this.activeBall == ball) {
            ball.obj.remove(this.scene.getObjectByName('camera'))
            this.activeBall = this.getLastBall()
        }
        this.balls.splice(i, 1)
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 82) { // r
                this.balls.forEach((b) => b.toggleAxesHelper())
                this.showAxis = !this.showAxis
            }
        })
    }

    toggleWireframe() {
        this.showWireframe = !this.showWireframe
        this.balls.forEach((b) => b.toggleWireframe())
    }
}
