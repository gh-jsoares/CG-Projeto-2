'use strict'

class Wall {

    static get HEIGHT() {
        return 10
    }

    static get LENGTH() {
        return 50
    }

    static get WIDTH() {
        return 4
    }

    constructor(x, y, z, rotate) {
        this.obj = new THREE.Object3D()
        this.materials = {
            body: new THREE.MeshBasicMaterial({
                color: 0x6c5ce7,
                wireframe: false
            })
        }

        let geometry = new THREE.BoxGeometry(Wall.WIDTH, Wall.HEIGHT, Wall.LENGTH)
        let mesh = new THREE.Mesh(geometry, this.materials.body)
        this.obj.add(mesh)

        if(rotate)
            this.obj.rotation.y = Math.PI / 2

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