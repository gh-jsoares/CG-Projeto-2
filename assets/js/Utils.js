function genRandomIntInRange(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getDistance(x1, y1, z1, x2, y2, z2) {
    return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
}

function computePosition(pos, deltatime, speed) {
    return new THREE.Vector3(pos.x + speed.x * deltatime, pos.y, pos.z + speed.y * deltatime) 
}

function rotateByAngle(velocity, angle) {
    return new THREE.Vector2(velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle), velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle))
}

function swapVectorX(v1, v2) {
    let x = v1.x
    v1.x = v2.x
    v2.x = x
}