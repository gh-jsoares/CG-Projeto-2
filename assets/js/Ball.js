'use strict'

const GRAVITY = 1
const FRICTION = 0.995

class Ball {

    static get RADIUS() {
        return 1.8
    }

    constructor(x, y, z, rotation, velocity, showAxis = false, showWireframe = false) {
        this.obj = new THREE.Object3D()

        this.axesHelper = new THREE.AxesHelper(15)
        this.obj.add(this.axesHelper)

        this.obj.userData = {
            velocityX: velocity,
            velocityY: 0,
            velocityZ: velocity,
            fired: false,
            falling: false
        }

        this.materials = {
            body: new THREE.MeshBasicMaterial({
                color: 0xe17055,
                wireframe: false
            })
        }

        let geometry = new THREE.SphereGeometry(Ball.RADIUS, 12, 12)
        this.ball = new THREE.Mesh(geometry, this.materials.body)
        this.obj.add(this.ball)

        this.obj.rotation.set(0, rotation, 0)
        this.obj.position.set(x, y, z)
        this.previousPos = new THREE.Vector3(x, y, z)
        if(!showAxis)
            this.toggleAxesHelper() // hide
        if(showWireframe)
            this.toggleWireframe() // show
    }

    rotateBall(deltatime){
        const upVector = new THREE.Vector3();
        const currentVelocity = new THREE.Vector3();
        upVector.set(0, 1, 0)
        currentVelocity.set(this.obj.userData.velocityX * deltatime, 0, this.obj.userData.velocityZ * deltatime)
        const axis = new THREE.Vector3();
        axis.crossVectors(upVector, currentVelocity.projectOnPlane(upVector))
        axis.normalize()
        this.ball.rotateOnWorldAxis(axis, currentVelocity.length() / 2)
    }

    rotate(y) {
        this.obj.rotateY(y)
    }

    fire(speed, angle) {
        this.obj.userData.velocityX = -Math.cos(angle) * speed
        this.obj.userData.velocityZ = Math.sin(angle) * speed
    }

    checkBoundingBox(deltatime) {
        let tpos = computePosition(this.obj.position, deltatime, new THREE.Vector2(this.obj.userData.velocityX, this.obj.userData.velocityZ))
        
        if(tpos.x - Ball.RADIUS >= 25 && this.obj.userData.fired && !this.obj.userData.falling) {
            this.obj.userData.velocityY = -100
            this.obj.userData.falling = true
        } else if(tpos.x - Ball.RADIUS <= 22) {
            this.obj.userData.fired = true

            if(tpos.x - Ball.RADIUS < -21)
                this.obj.userData.velocityX = this.obj.userData.velocityX * -1
    
            if((tpos.z - Ball.RADIUS < -21  || tpos.z + Ball.RADIUS > 21))
                this.obj.userData.velocityZ = this.obj.userData.velocityZ * -1
        }
        
    }

    handleCollision(otherBall) {
        this.obj.userData.fired = true
        otherBall.obj.userData.fired = true
        let xVelocityDiff = this.obj.userData.velocityX - otherBall.obj.userData.velocityX
        let zVelocityDiff = this.obj.userData.velocityZ - otherBall.obj.userData.velocityZ

        let xDist = otherBall.obj.position.x - this.obj.position.x
        let zDist = otherBall.obj.position.z - this.obj.position.z

        if (xVelocityDiff * xDist + zVelocityDiff * zDist >= 0) {

            let angle = -Math.atan2(zDist, xDist)

            let u1 = rotateByAngle(new THREE.Vector2(this.obj.userData.velocityX, this.obj.userData.velocityZ), angle)
            let u2 = rotateByAngle(new THREE.Vector2(otherBall.obj.userData.velocityX, otherBall.obj.userData.velocityZ), angle)

            swapVectorX(u1, u2)

            u1 = rotateByAngle(u1, -angle)
            u2 = rotateByAngle(u2, -angle)

            this.obj.userData.velocityX = u1.x
            this.obj.userData.velocityZ = u1.y

            otherBall.obj.userData.velocityX = u2.x
            otherBall.obj.userData.velocityZ = u2.y
        }
    }

    animate(deltatime) {
        this.checkBoundingBox(deltatime)

        this.rotateBall(deltatime)
        this.obj.position.x += (this.obj.userData.velocityX) * deltatime
        this.obj.position.y += (this.obj.userData.velocityY) * deltatime
        this.obj.position.z += (this.obj.userData.velocityZ) * deltatime
        this.obj.userData.velocityX = this.obj.userData.velocityX * FRICTION
        this.obj.userData.velocityZ = this.obj.userData.velocityZ * FRICTION

        this.obj.userData.velocityY = this.obj.userData.velocityY * GRAVITY
    }
    
    addToScene(scene) {
        scene.add(this.obj)
    }

    removeFromScene(scene) {
        scene.remove(this.obj)
    }

    toggleWireframe() {
        Object.values(this.materials).forEach((mat) => mat.wireframe = !mat.wireframe)
    }

    toggleAxesHelper() {
        this.axesHelper.visible = !this.axesHelper.visible
    }

}