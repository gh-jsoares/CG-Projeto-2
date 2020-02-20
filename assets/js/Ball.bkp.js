'use strict'

const GRAVITY = 0
const FRICTION = 1

import { computePosition } from './Utils.js'

export default class Ball {

    static get RADIUS() {
        return 2
    }

    constructor(x, y, z, rotation, velocity, showAxis = false) {
        this.obj = new THREE.Object3D()

        this.axesHelper = new THREE.AxesHelper(15)
        if(!showAxis)
            this.toggleAxesHelper() // hide
        this.obj.add(this.axesHelper)

        this.obj.userData = {
            velocity: velocity
        }

        this.materials = {
            body: new THREE.MeshBasicMaterial({
                color: 0xe17055,
                wireframe: false
            })
        }

        let geometry = new THREE.SphereGeometry(Ball.RADIUS, 10, 10)
        this.ball = new THREE.Mesh(geometry, this.materials.body)
        this.obj.add(this.ball)

        this.obj.rotation.set(0, rotation, 0)
        this.obj.position.set(x, y, z)
        this.previousPos = new THREE.Vector3(x, y, z)
    }

    rotate(y) {
        this.obj.rotateY(y)
    }

    fire(speed) {
        this.obj.userData.velocity = speed
    }

    calculateVelocity(deltatime) {
        //this.obj.userData.velocity.dy += GRAVITY

    }

    checkBoundingBox(deltatime) { // needs fix - THIS IS THE THING I WAS TALKING ABOUT!!!!!!
        let angle = this.obj.rotation.y

        let velx = Math.sin(angle) * this.obj.userData.velocity
        let velz = Math.cos(angle) * this.obj.userData.velocity

        let pos = this.obj.position
        let diffPosX = -21 - (pos.x - Ball.RADIUS)

        // check left wall
        if(pos.x < -21 + Ball.RADIUS) {
            if(diffPosX * this.obj.userData.velocity >= 0) {
                let vect = new THREE.Vector3(velx, 0, velz)
                vect.cross(THREE.Object3D.DefaultUp)
                angle = Math.atan2(vect.z, vect.x - 1)
                this.obj.userData.collided = true
                this.obj.rotation.y = angle
            }
        }

        // if(pos.x < -21 + Ball.RADIUS && !this.obj.userData.collided) {
        //     let vect = new THREE.Vector3(velx, 0, velz)
        //     vect.cross(THREE.Object3D.DefaultUp)
        //     angle = Math.atan2(vect.z, vect.x - 1)
        //     this.obj.userData.collided = true
        //     this.obj.rotation.y = angle
        // } else if(pos.x > -21 + Ball.RADIUS && this.obj.userData.collided)
        //     this.obj.userData.collided = false

            
        // if(pos.x < -21 + Ball.RADIUS && !this.obj.userData.collided) {
        //     let vect = new THREE.Vector3(velx, 0, velz)
        //     vect.cross(THREE.Object3D.DefaultUp)
        //     angle = Math.atan2(vect.z - 1, vect.x)
        //     this.obj.userData.collided = true
        //     this.obj.rotation.y = Math.PI - angle
        // } else if(pos.z > -21 + Ball.RADIUS && this.obj.userData.collided)
        //     this.obj.userData.collided = false


        // console.log(`P: ${this.previousPos.x}, ${this.previousPos.z}`)
        // console.log(`T: ${tentative_pos.x}, ${tentative_pos.z}`)
        // if(tentative_pos.x < -21 + Ball.RADIUS || tentative_pos.z < -21 + Ball.RADIUS || tentative_pos.z > 21 - Ball.RADIUS) {
        //     console.log('COLLI')
        //     let vect = new THREE.Vector3(velx, 0, velz)
        //     vect.cross(THREE.Object3D.DefaultUp)
        //     angle = -Math.atan2(vect.z - velz, vect.x - velx)
        //     this.obj.rotateY(angle)
        // }
        // this.previousPos.set(this.obj.position.x, this.obj.position.y, this.obj.position.z)
        // //console.log(this.obj.rotation.y)
    }

    calculatePosition(deltatime) {
        // this.obj.position.x += this.obj.userData.velocity.dx * deltatime
        // this.obj.position.y += this.obj.userData.velocity.dy * deltatime
        // this.obj.position.z += this.obj.userData.velocity.dz * deltatime
    }

    calculateRotation(deltatime) {
        //this.obj.rotation.set()
    }

    resolveCollision(otherBall) {
        const velDiffX = Math.sin(this.obj.rotation.y) * this.obj.userData.velocity - Math.sin(otherBall.obj.rotation.y) * otherBall.obj.userData.velocity
        const velDiffY = Math.cos(this.obj.rotation.y) * this.obj.userData.velocity - Math.cos(otherBall.obj.rotation.y) * otherBall.obj.userData.velocity

        const distX = otherBall.obj.position.x - this.obj.position.x
        const distY = otherBall.obj.position.y - this.obj.position.y

        if(velDiffX * distX + velDiffY * distY >= 0) {
            const angle = otherBall.obj.rotation.y - this.obj.rotation.y

            this.obj.rotation.y = Math.PI + angle
            otherBall.obj.rotation.y = angle
            if(this.obj.userData.velocity != 0)
                otherBall.obj.userData.velocity = this.obj.userData.velocity
            else
                this.obj.userData.velocity = otherBall.obj.userData.velocity
        }
    }
    
    animate(deltatime) {
        //this.checkBoundingBox(deltatime)
        // this.calculateVelocity(deltatime)
        // this.calculatePosition(deltatime)
        // this.calculateRotation(deltatime)

        this.ball.rotateZ(this.obj.userData.velocity * deltatime)
        this.obj.translateX(this.obj.userData.velocity * deltatime)
        this.obj.userData.velocity = this.obj.userData.velocity * FRICTION
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