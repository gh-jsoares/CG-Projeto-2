'use strict'

class Cannon {

    constructor(x, y, z, ballManager) {
        this.obj = new THREE.Object3D()
        this.obj.userData = {
            rotate: 0
        }
        this.materials = {
            body: new THREE.MeshBasicMaterial({
                color: 0x808080,
                wireframe: false
            }),

            wheels: new THREE.MeshBasicMaterial({
                color: 0x000000,
                wireframe: false
            })
        }

        this.addBase(this.obj)
        this.addWheels(this.obj)

        this.obj.position.set(x, y - 2, z) // wheel height

        this.ballManager = ballManager

        this.prepareBall()
    }

    animate(deltaTime) {
        this.deselectCannon()
        this.selectCannon()
		this.rotateCannon(this.obj.userData.rotate * deltaTime)
    }

    addToScene(scene) {
        scene.add(this.obj)
    }

    removeFromScene(scene) {
        scene.remove(this.obj)
    }

    addBase(root) {
        let geometry = new THREE.CylinderGeometry(2, 2, 10, 32)
        let mesh = new THREE.Mesh(geometry, this.materials.body)

        mesh.position.y = 2

        root.add(mesh)
        this.obj.rotation.z = Math.PI / 2

        return mesh
    }

    addWheels(root) {
        let wheels = new THREE.Object3D()

        this.addWheel(wheels, -2, -2)
        this.addWheel(wheels, -2, 2)

        root.add(wheels)
    }

    addWheel (root, x, z) {
        let geometry = new THREE.SphereGeometry(1.6, 8, 8)
        let mesh = new THREE.Mesh(geometry, this.materials.wheels)

        mesh.position.x = x
        mesh.position.z = z

        root.add(mesh)
    }

    prepareBall() {
        this.ball = this.ballManager.createBall(this.obj.position.x, this.obj.position.y, this.obj.position.z, Math.PI + this.obj.rotation.y, 0)
    }

    fire(speed) {
        let angle = this.obj.rotation.y
        this.ball.fire(speed, angle)
        this.ballManager.setActiveBall(this.ball)
        this.prepareBall()
    }

    selectCannon() {
        this.materials.body.color.setHex(0xFF0000)
    }

    deselectCannon() {
        this.materials.body.color.setHex(0x808080)
    }

    rotateCannon(y) {
        if(this.obj.position.z == 0 && Math.abs(this.obj.rotation.y + y) > Math.PI / 2 - Math.PI / 6)
            return
        
            if(this.obj.position.z < 0 && (this.obj.rotation.y + y > Math.PI / 2 - Math.PI / 6 || this.obj.rotation.y + y < -Math.PI / 2 + Math.PI / 3))
            return
        
        if(this.obj.position.z > 0 && (this.obj.rotation.y + y > Math.PI / 2 - Math.PI / 3   || this.obj.rotation.y + y < -Math.PI / 2 + Math.PI / 6))
            return
        
        this.obj.rotation.y += y
        if(this.ball)
            this.ball.rotate(y)
    }

    toggleWireframe() {
        Object.values(this.materials).forEach((mat) => mat.wireframe = !mat.wireframe)
    }
}
