import * as THREE from 'three'

let camera, scene, renderer: THREE.WebGLRenderer
let geometry, material, mesh

init()

function init() {
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
    )
    camera.position.z = 1

    scene = new THREE.Scene()

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    material = new THREE.MeshNormalMaterial()

    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animation)
    renderer.render(scene, camera)

    document.body.appendChild(renderer.domElement)
}

let direction = {
    x: 0,
    y: 0,
}
document.body.addEventListener('keydown', (event) => {
    const { key } = event
    if (key === 'ArrowUp') {
        direction.y = 1
    } else if (key === 'ArrowDown') {
        direction.y = -1
    } else if (key === 'ArrowLeft') {
        direction.x = -1
    } else if (key === 'ArrowRight') {
        direction.x = 1
    }
})

document.body.addEventListener('keyup', (event) => {
    direction = {
        x: 0,
        y: 0,
    }
})
function animation(time) {
    mesh.rotation.x = time / 2000
    mesh.rotation.y = time / 1000
    mesh.rotation.z = time / 3000

    mesh.position.x += direction.x / 100
    mesh.position.y += direction.y / 100
    renderer.render(scene, camera)
}
