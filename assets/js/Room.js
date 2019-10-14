'use strict'

const HEIGHT = 20
const LENGTH = 50

export default class Room {

    constructor(x, y, z, rotate) {
        this.obj = new THREE.Object3D()

        this.addWall(this.obj)

        if(rotate)
            this.obj.rotation.y = Math.PI / 2

        this.obj.position.set(x, y, z)
    }
    
    addToScene(scene) {
        scene.add(this.obj)
    }

    removeFromScene(scene) {
        scene.remove(this.obj)
    }

    addWall(root) {
        let geometry = new THREE.BoxGeometry(4, HEIGHT, LENGTH)
        let mesh = new THREE.Mesh(geometry, this.materials.body)
        root.add(mesh)
    }

}