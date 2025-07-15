import "./study/style.less"
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

let renderer, scene, camera, controls;


function init() {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera();
  camera.fov = 15;
  camera.aspect = window.innerWidth / window.innerHeight
  // camera.near = 16.8;
  // camera.far = 17;
  camera.updateProjectionMatrix();

  camera.position.set(10,10,10);
  // camera.lookAt(0,0,0)

  controls = new OrbitControls(camera, canvas)
  // controls.enableRotate = false
  // controls.enableZoom = false
  controls.enablePan = false
  controls.enableDamping = true

  const light = new THREE.DirectionalLight();
  light.position.set(1,2,3)
  scene.add(light);

  // const sphere_geometry = new THREE.SphereGeometry()
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshPhongMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh)

  render();
}

function render() {
  renderer.render(scene, camera);
  controls.update()
  requestAnimationFrame(render);

}

init()