'use strict'

export default class Floor {

    static get HEIGHT() {
        return 2
    }

    static get LENGTH() {
        return 50
    }

    constructor(x, y, z) {
        this.obj = new THREE.Object3D()
        this.materials = {
            body: new THREE.MeshBasicMaterial({
                color: 0xABCDEF,
                wireframe: false
            })
        }

        let geometry = new THREE.BoxGeometry(Floor.LENGTH - 4, Floor.WIDTH, Floor.LENGTH - 8)
        let mesh = new THREE.Mesh(geometry, this.materials.body)
        this.obj.add(mesh)

        this.obj.position.set(x, y, z)
    }

    animate(deltatime) {
        
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