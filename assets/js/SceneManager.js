'use strict'

export default class SceneManager {
    constructor() {
        this.objects = []

        this.scene = new THREE.Scene()
        this.scene.add(new THREE.AxesHelper(30))

        this.registerEvents()
    }

    registerEvents() {
        let objectCannon = this.getObject("cannons")

        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 52) { // 4
                this.objects.forEach((obj) => { obj.object.toggleWireframe() })
            }

            if(e.keyCode == 32) { // space
                console.log("BOOOOM")
                this.getObject("balls").fireBall(objectCannon.getCannonDirection(), objectCannon.getPosition(), objectCannon.getRotation())
            }
        })
    }


    animate(deltaTime) {
        this.objects.forEach((obj) => obj.object.animate(deltaTime))
    }

    addObject(name, object) {
        this.objects.push({
            name: name,
            object: object
        })
        object.addToScene(this.scene)
    }

    removeObject(name) {
        let object = this.getObject(name)
        object.object.removeFromScene(this.scene)
        this.objects = this.objects.filter((obj) => obj.name != name)
    }

    getObject(name) {
        let result = this.objects.find((obj) => obj.name == name)
        return result ? result.object : undefined
    }

    getScene() {
        return this.scene
    }
}
