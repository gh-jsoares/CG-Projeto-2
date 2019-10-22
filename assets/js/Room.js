'use strict'

class Room {

    constructor(x, y, z) {
        this.obj = new THREE.Object3D()

        this.children = []

        let horizontal_offset = (Wall.LENGTH - Wall.WIDTH) / 2
        let vertical_offset = Wall.HEIGHT / 2 - Floor.HEIGHT / 4

        this.addFloor(this.obj, -vertical_offset)
        this.addWall(this.obj, 0, horizontal_offset, true)
        this.addWall(this.obj, 0, -horizontal_offset, true)
        this.addWall(this.obj, -horizontal_offset, 0, false)

        this.obj.position.y = Wall.HEIGHT

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

    addWall(root, x, z, rotated) {
        let wall = new Wall(x, 0, z, rotated)
        this.children.push(wall)
        root.add(wall.obj)
    }

    addFloor(root, y) {
        let floor = new Floor(2, y, 0)
        this.children.push(floor)
        root.add(floor.obj)
    }

    toggleWireframe() {
        this.children.forEach((obj) => obj.toggleWireframe())
    }

}