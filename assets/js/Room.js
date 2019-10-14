'use strict'

import Wall from './Wall.js'

export default class Room {

    constructor(x, y, z) {
        this.obj = new THREE.Object3D()

        this.walls = []

        let offset = (Wall.LENGTH - Wall.WIDTH) / 2

        this.addWall(this.obj, 0, offset, true)
        this.addWall(this.obj, 0, -offset, true)
        this.addWall(this.obj, -offset, 0, false)

        this.obj.position.y = Wall.HEIGHT

        this.obj.position.set(x, y, z)
    }
    
    addToScene(scene) {
        scene.add(this.obj)
    }

    removeFromScene(scene) {
        scene.remove(this.obj)
    }

    addWall(root, x, z, rotated) {
        let wall = new Wall(x, 0, z, rotated)
        this.walls.push(wall)
        root.add(wall.obj)
    }

    toggleWireframe() {
        this.walls.forEach((wall) => wall.toggleWireframe())
    }

}