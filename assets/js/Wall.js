'use strict'

export default class Wall {

    static get HEIGHT() {
        return 20
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
                color: 0xCF9923,
                wireframe: false
            })
        }

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
        let geometry = new THREE.BoxGeometry(Wall.WIDTH, Wall.HEIGHT, Wall.LENGTH)
        let mesh = new THREE.Mesh(geometry, this.materials.body)
        root.add(mesh)
    }

    toggleWireframe() {
        Object.values(this.materials).forEach((mat) => mat.wireframe = !mat.wireframe)
    }

}