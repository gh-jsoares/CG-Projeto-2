'use strict'

import Room from './Room.js'
import BallManager from './BallManager.js'
import CannonManager from './CannonManager.js'

import CameraManager from './CameraManager.js'
import SceneManager from './SceneManager.js'

let cameraManager, renderer, sceneManager, clock, ballManager

function init(shouldAnimate) {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    sceneManager = new SceneManager()
    cameraManager = new CameraManager(sceneManager.getScene(), renderer)

    ballManager = new BallManager(sceneManager.scene, 0)

    sceneManager.addObject('room', new Room(0, 0, 0))
    sceneManager.addObject('balls', ballManager)
    sceneManager.addObject('cannons', new CannonManager(sceneManager.scene, ballManager))

    clock = new THREE.Clock()
    if(shouldAnimate)
        animate(0)
    window.paused = false

}

function animate() {
    renderer.setClearColor(0xdfe6e9)
    if(!window.paused)
        sceneManager.animate(clock.getDelta())
    render()
    requestAnimationFrame(animate)
}

function render() {
    renderer.render(sceneManager.getScene(), cameraManager.getActiveCamera())
}

window.init = init(true)
