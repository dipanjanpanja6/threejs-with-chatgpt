import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls"

// create a new scene and camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// create a renderer and add it to the document
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// create a path for the object timeline
const path = new THREE.CatmullRomCurve3([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(-5, 5, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, -5, 0), new THREE.Vector3(10, 0, 0)])

// create a line geometry and add it to the scene
const points = path.getPoints(50)
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
const line = new THREE.Line(lineGeometry, lineMaterial)
scene.add(line)

// create a cube and add it to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

const controls = new OrbitControls(camera, renderer.domElement)

camera.position.z = 5

// animate the cube along the path
const clock = new THREE.Clock()
function animate() {
  requestAnimationFrame(animate)

  const time = clock.getElapsedTime()
  const point = path.getPointAt(time % 1)
  cube.position.copy(point)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  controls.update()

  renderer.render(scene, camera)
}
animate()
