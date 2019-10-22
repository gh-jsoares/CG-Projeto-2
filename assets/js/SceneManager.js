'use strict'

class SceneManager {
    constructor() {
        this.objects = []

        this.scene = new THREE.Scene()

        this.registerEvents()
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 52) { // 4
                this.objects.forEach((obj) => { obj.object.toggleWireframe() })
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
