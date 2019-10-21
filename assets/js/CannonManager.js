'use strict'
const CANNON_ROTATE_SPEED = 0.3

import Cannon from './Cannon.js'

export default class CannonManager {

	constructor(scene) {
		this.scene = scene
		this.obj = new THREE.Object3D()

		this.cannons = []
		this.selectedCannon = 1
		this.turningLeft = false
		this.turningRight = false
		this.pressLeft = false
		this.pressRight = false

		this.addCannon(40, 0, -16.5)
		this.addCannon(40, 0, 0)
		this.addCannon(40, 0, 16.5)

		this.registerEvents()
	}

	registerEvents() {
        window.addEventListener('keydown', (e) => {
            // Cannon Selection
            if(e.keyCode == 81 || e.keyCode == 113) { // q or Q
				this.cannons[this.selectedCannon].deselectCannon()
				this.selectCannon(0)
			}

            if(e.keyCode == 87 || e.keyCode == 117) { // w or W
				this.cannons[this.selectedCannon].deselectCannon()
				this.selectCannon(1)
			}

            if(e.keyCode == 69 || e.keyCode == 101) {// e or E
				this.cannons[this.selectedCannon].deselectCannon()
                this.selectCannon(2)
			}

			// Cannon Rotation
			if(e.keyCode == 37) { // left arrow
				this.cannons[this.selectedCannon].obj.userData.rotate = CANNON_ROTATE_SPEED
				this.turningLeft = true
				this.turningRight = false
				this.pressLeft = true
			}

			if(e.keyCode == 39) { // right arrow
				this.cannons[this.selectedCannon].obj.userData.rotate = -CANNON_ROTATE_SPEED
				this.turningRight = true
				this.turningLeft = false
				this.pressRight = true

			}
        })

		window.addEventListener('keyup', (e) => {
			// Cannon Rotation
			if(e.keyCode == 37) { // left arrow
				if(!this.turningRight){
					if (!this.pressRight){
						this.cannons[this.selectedCannon].obj.userData.rotate = 0
						this.turningRight = false
						this.turningLeft = false
					}
					else{
						this.cannons[this.selectedCannon].obj.userData.rotate = -CANNON_ROTATE_SPEED
						this.turningRight = true
						this.turningLeft = false
					}
				}
				this.pressLeft = false
			}

			if(e.keyCode == 39) { // right arrow
				if(!this.turningLeft){
					if (!this.pressLeft){
						this.cannons[this.selectedCannon].obj.userData.rotate = 0
						this.turningRight = false
						this.turningLeft = false
					}
					else{
						this.cannons[this.selectedCannon].obj.userData.rotate = CANNON_ROTATE_SPEED
						this.turningRight = false
						this.turningLeft = true
					}
				}
				this.pressRight = false
			}
        })
    }

	selectCannon(n) {
		this.selectedCannon = n
		this.turningLeft = false
		this.turningRight = false
		this.pressLeft = false
		this.pressRight = false
		this.cannons[n].obj.userData.rotate = 0
	}

	animate(deltaTime) {
		this.cannons[this.selectedCannon].animate(deltaTime)
	}

	addToScene(scene) {
		this.cannons.forEach((cannon) => cannon.addToScene(scene))
	}

	removeFromScene(scene) {

	}

	getCannonDirection(balls){
		let direction = this.cannons[this.selectedCannon].getWorldDirection()

		return direction
	}

	getPosition() {
		return this.cannons[this.selectedCannon].position
	}

	getRotation() {
		return this.cannons[this.selectCannon].rotation
	}

	addCannon(x, y, z) {
		let cannon = new Cannon(x, y, z)

		this.cannons.push(cannon)
		this.obj.add(cannon.obj)
	}

	toggleWireframe() {
        this.cannons.forEach((c) => c.toggleWireframe())
    }
}
