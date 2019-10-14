'use strict'

const GRAVITY = 2

export default class Ball {

    constructor(x, y, z, radius, dy) {
        this.obj = new THREE.Object3D()

        this.obj.userData = {
            velocity: {
                dx: 0,
                dy: dy
            }
        }

        this.materials = {
            body: new THREE.MeshBasicMaterial({
                color: 0xFF4554,
                wireframe: false
            })
        }

        let geometry = new THREE.SphereGeometry(radius, 10, 10)
        let mesh = new THREE.Mesh(geometry, this.materials.body)
        this.obj.add(mesh)

        this.obj.position.set(x, y, z)
    }

    calculateVelocity() {
        this.obj.userData.velocity.dy += GRAVITY
    }

    animate(deltatime) {
        this.calculateVelocity()
        this.obj.position.y -= this.obj.userData.velocity.dy * deltatime
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

}