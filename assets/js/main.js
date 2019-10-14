'use strict'

import Robot from './Robot.js'
import CameraManager from './CameraManager.js'
import Wall from './Wall.js'
import SceneManager from './SceneManager.js'

let cameraManager, renderer, sceneManager

function init(shouldAnimate) {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    sceneManager = new SceneManager()
    cameraManager = new CameraManager(sceneManager.getScene(), renderer)

    sceneManager.addObject('wall', new Wall(0, 0, 23, true))
    sceneManager.addObject('wall', new Wall(0, 0, -23, true))
    sceneManager.addObject('wall', new Wall(-23, 0, 0, false))

    if(shouldAnimate)
        animate(0)
}

let prevTimestamp = 0
function animate(timestamp) {
    let deltaTime = (timestamp - prevTimestamp) / 1000 // miliseconds
    sceneManager.animate(deltaTime)
    prevTimestamp = timestamp
    
    render()
    requestAnimationFrame(animate)
}

function render() {
    renderer.render(sceneManager.getScene(), cameraManager.getActiveCamera())
}

window.init = init(true)