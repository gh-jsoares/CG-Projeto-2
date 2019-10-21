'use strict'

const GRAVITY = 0

import { computePosition } from './Utils.js'

export default class Ball {

    static get RADIUS() {
        return 3
    }

    constructor(x, y, z, rotation, velocity) {
        this.obj = new THREE.Object3D()

        this.axesHelper = new THREE.AxesHelper(15)
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

    calculateVelocity(deltatime) {
        //this.obj.userData.velocity.dy += GRAVITY

    }

    checkBoundingBox(deltatime) { // needs fix - THIS IS THE THING I WAS TALKING ABOUT!!!!!!
        let angle = this.obj.rotation.y

        let velx = Math.sin(angle) * this.obj.userData.velocity
        let velz = Math.cos(angle) * this.obj.userData.velocity        

        this.obj.userData.velocity = Math.sqrt(velx * velx + velz * velz)

        let tentative_pos = computePosition(this.obj.position, deltatime, new THREE.Vector2(velx, velz))

        console.log(`P: ${this.previousPos.x}, ${this.previousPos.z}`)
        console.log(`T: ${tentative_pos.x}, ${tentative_pos.z}`)
        if(tentative_pos.x < -21 + Ball.RADIUS || tentative_pos.z < -21 + Ball.RADIUS || tentative_pos.z > 21 - Ball.RADIUS) {
            console.log('COLLI')
            let vect = new THREE.Vector3(velx, 0, velz)
            vect.cross(THREE.Object3D.DefaultUp)
            angle = -Math.atan2(vect.z - velz, vect.x - velx)
            this.obj.rotateY(angle)
        }
        this.previousPos.set(this.obj.position.x, this.obj.position.y, this.obj.position.z)
        //console.log(this.obj.rotation.y)
    }

    calculatePosition(deltatime) {
        // this.obj.position.x += this.obj.userData.velocity.dx * deltatime
        // this.obj.position.y += this.obj.userData.velocity.dy * deltatime
        // this.obj.position.z += this.obj.userData.velocity.dz * deltatime
    }

    calculateRotation(deltatime) {
        //this.obj.rotation.set()
    }
    
    animate(deltatime) {
        this.checkBoundingBox(deltatime)
        // this.calculateVelocity(deltatime)
        // this.calculatePosition(deltatime)
        // this.calculateRotation(deltatime)

        this.ball.rotateZ(this.obj.userData.velocity * deltatime)
        this.obj.translateX(this.obj.userData.velocity * deltatime)
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