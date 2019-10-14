'use strict'
const MOVE_SPEED = 20
const ROTATE_SPEED = 2
const ARM_ROTATE_SPEED = 2


export default class Robot {
    constructor(x, y, z) {
        this.obj = new THREE.Object3D()
        
        this.obj.userData = {
            arm: {
                y: 0,
                z: 0
            },
            rotate: 0,
            move: 0
        }

        this.materials = {
            body: new THREE.MeshBasicMaterial({
                color: 0xCFCFCF,
                wireframe: false
            }),
            wheels: new THREE.MeshBasicMaterial({
                color: 0x364E70,
                wireframe: false
            }),
            joints: new THREE.MeshBasicMaterial({
                color: 0xC7263E,
                wireframe: false
            }),
        }

        this.createBase(this.obj)
        this.arm = this.createArm(this.obj)
        
        this.obj.position.set(x, y, z)
        this.registerEvents()
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            // Arm Rotations
            if(e.keyCode == 81 || e.keyCode == 113) // q or Q
                this.obj.userData.arm.z = ARM_ROTATE_SPEED
                
            if(e.keyCode == 87 || e.keyCode == 117) // w or W
                this.obj.userData.arm.z = -ARM_ROTATE_SPEED

            if(e.keyCode == 65 || e.keyCode == 97) // a or A
                this.obj.userData.arm.y = ARM_ROTATE_SPEED

            if(e.keyCode == 83 || e.keyCode == 115) // s or S
                this.obj.userData.arm.y = -ARM_ROTATE_SPEED

            // Robot Movement
            if(e.keyCode == 37) // <-
                this.obj.userData.rotate = ROTATE_SPEED
            if(e.keyCode == 39) // ->
                this.obj.userData.rotate = -ROTATE_SPEED
            if(e.keyCode == 38) // ^
                this.obj.userData.move = MOVE_SPEED
            if(e.keyCode == 40) // v
                this.obj.userData.move = -MOVE_SPEED
        })

        window.addEventListener('keyup', (e) => {
            // Arm Rotations
            if(e.keyCode == 81 || e.keyCode == 113 || e.keyCode == 87 || e.keyCode == 117) // q or Q or w or W
                this.obj.userData.arm.z = 0

            if(e.keyCode == 65 || e.keyCode == 97 || e.keyCode == 83 || e.keyCode == 115) // a or A or s or S
                this.obj.userData.arm.y = 0

            // Robot Movement
            if(e.keyCode == 37 || e.keyCode == 39) // <- or ->
                this.obj.userData.rotate = 0

            if(e.keyCode == 38 || e.keyCode == 40) // ^ or  v
                this.obj.userData.move = 0
        })
    }
    
    animate(deltaTime) {
        this.rotateArm(this.obj.userData.arm.y * deltaTime, this.obj.userData.arm.z * deltaTime)
        this.rotateRobot(this.obj.userData.rotate * deltaTime)
        this.moveRobot(this.obj.userData.move * deltaTime)
    }

    addToScene(scene) {
        scene.add(this.obj)
    }

    removeFromScene(scene) {
        scene.remove(this.obj)
    }

    rotateArm(y, z) {
        this.arm.rotation.y += y
        this.arm.rotation.z = Math.min(Math.max(parseFloat(this.arm.rotation.z + z), -1.3), 1.3)
    }

    rotateRobot(rad) {
        this.obj.rotation.y += rad
    }

    moveRobot(distance) {
        this.obj.translateX(distance)
    }

    addJoint(root, radius, y, half) {
        let geometry = new THREE.SphereGeometry(radius, 8, 8)

        if (half) // create calute (half sphere)
            geometry = new THREE.SphereGeometry(radius, 8, 8, 0, 2 * Math.PI, 0, 0.5 * Math.PI)
        
        let mesh = new THREE.Mesh(geometry, this.materials.joints)
        
        mesh.position.y = y

        root.add(mesh)
    }

    createBase(root) {
        let base = new THREE.Object3D()

        let geometry = new THREE.BoxGeometry(10, 2, 10)
        let mesh = new THREE.Mesh(geometry, this.materials.body)
        mesh.position.y = 2

        base.add(mesh)

        this.addWheels(base)
        this.addBallCap(base)

        base.position.y = 1
        root.add(base)

        return base
    }

    addWheels(base) {
        let wheels = new THREE.Object3D()
        
        this.addWheel(wheels, -5, -5)
        this.addWheel(wheels, -5, 5)
        this.addWheel(wheels, 5, -5)
        this.addWheel(wheels, 5, 5)

        base.add(wheels)
    }

    addWheel(root, x, z) {
        let geometry = new THREE.SphereGeometry(1, 8, 8)
        let mesh = new THREE.Mesh(geometry, this.materials.wheels)

        mesh.position.x = x
        mesh.position.z = z

        root.add(mesh)
    }

    addBallCap(root) {
        this.addJoint(root, 2, 3, true)
    }

    createArm(root) {
        let arm = new THREE.Object3D() // Arm Group

        this.addArm(arm, 6) // Arm Mesh
        this.addForearm(arm, 12)
        
        arm.position.y = 5
        root.add(arm)
        
        return arm
    }

    addArm(root, y) {
        let geometry = new THREE.BoxGeometry(1, 10, 2)
        let mesh = new THREE.Mesh(geometry, this.materials.body)

        mesh.position.y = y

        root.add(mesh)

        return mesh
    }

    addForearm(root, y) {
        let forearm = new THREE.Object3D() // Forearm Group
        this.addJoint(forearm, 1, 0)
        this.addArm(forearm, y / 2)
        this.addWrist(forearm, y)

        forearm.rotation.z = -Math.PI / 2
        forearm.position.y = y

        root.add(forearm)
    }

    addWrist(root, y) {
        let wrist = new THREE.Object3D() // Wrist Group
        this.addJoint(wrist, 1, 0)
        this.addHand(wrist)

        wrist.position.y = y

        root.add(wrist)
    }

    addHand(root) {
        let hand = new THREE.Object3D()
        let geometry = new THREE.BoxGeometry(5, 1.5, 2)
        let mesh = new THREE.Mesh(geometry, this.materials.body)
        hand.add(mesh)
        
        this.addFingers(hand)

        hand.position.y = 1.75
        
        root.add(hand)
    }

    addFingers(root) {
        let fingers = new THREE.Object3D()

        this.addFinger(fingers, -2.25)
        this.addFinger(fingers, 2.25)

        fingers.position.y = 2

        root.add(fingers)
    }

    addFinger(root, x) {
        let geometry = new THREE.BoxGeometry(0.5, 3, 2)
        let mesh = new THREE.Mesh(geometry, this.materials.body)

        mesh.position.x = x
        
        root.add(mesh)
    }
}