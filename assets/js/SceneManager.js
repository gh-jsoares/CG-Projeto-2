'use strict'

export default class SceneManager {
    constructor() {
        this.objects = []

        this.scene = new THREE.Scene()
        this.scene.add(new THREE.AxesHelper(30))

        this.registerEvents()
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 52) { // 4
                this.objects.forEach((obj) => {
                    Object.values(obj.object.materials).forEach((mat) => mat.wireframe = !mat.wireframe)
                })
            }
        })
    }

    animate(deltaTime) {
        
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