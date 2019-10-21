'use strict'

const ASPECT = window.innerWidth / window.innerHeight
const ORTHO_NEAR = -500
const ORTHO_FAR = 500
const PERSC_NEAR = 0.1
const PERSC_FAR = 1500
const FRUSTUM_SIZE = 70
const FOV = 75

const CAMERAS = [
    {
        x: 0, y: 100, z: 0
    },
    {
        x: 50, y: 50, z: 50
    },
    {
        x: 0, y: 0, z: 0
    }
]

export default class CameraManager {
    constructor(scene, renderer) {
        this.orthographicCamera = new THREE.OrthographicCamera(-FRUSTUM_SIZE * ASPECT / 2, FRUSTUM_SIZE * ASPECT / 2, FRUSTUM_SIZE / 2, -FRUSTUM_SIZE / 2, ORTHO_NEAR, ORTHO_FAR)
        this.perspectiveCamera = new THREE.PerspectiveCamera(FOV, ASPECT, PERSC_NEAR, PERSC_FAR)

        this.switchView(1,renderer)

        this.registerEvents(renderer)
    }

    getOrthographicCamera() {
        return this.orthographicCamera
    }

    getPerspectiveCamera() {
        return this.perspectiveCamera
    }

    getActiveCamera() {
        return this.activeCamera
    }

    registerEvents(renderer) {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode >= 49 && e.keyCode <= 51) {
                let view = e.keyCode - 49 + 1
                this.switchView(view, renderer)
            }
        })

        window.addEventListener('resize', () => this.resize(renderer))
    }

    switchView(view, renderer) {
        switch (view) {
            case 1:
                this.activeCamera = this.orthographicCamera
                break
            case 2:
            case 3:
                this.activeCamera = this.perspectiveCamera
                break

            default:
                break
        }

        this.activeCamera.position.x = CAMERAS[view-1].x
        this.activeCamera.position.y = CAMERAS[view-1].y
        this.activeCamera.position.z = CAMERAS[view-1].z

        this.activeCamera.lookAt(0, 0, 0)
        this.resize(renderer)
    }

    isOrthoCamera() {
        return this.activeCamera == this.orthographicCamera
    }

    resize(renderer) {
        let aspect = window.innerWidth / window.innerHeight

        if(this.isOrthoCamera()) {
            this.activeCamera.left = FRUSTUM_SIZE * aspect / -2
            this.activeCamera.right = FRUSTUM_SIZE * aspect / 2
            this.activeCamera.top = FRUSTUM_SIZE / 2
            this.activeCamera.bottom = -FRUSTUM_SIZE / 2
        } else
            this.activeCamera.aspect = aspect

        this.activeCamera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
}
