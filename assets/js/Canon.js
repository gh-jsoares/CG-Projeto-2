'use strict'

export default class Canon {

    constructor(x, y, z) {
        this.obj = new THREE.Object3D()

        let geometry = new THREE.CylinderGeometry(2, 2, 14, 32)
        let mesh = new THREE.Mesh(geometry, this.materials.body)

        this.obj.position.set(x, y, z)
    }

}