import {
  THREE,
  OrbitControls,
  GenerateCanvas,
  GLTFLoader,
} from "./study/settings";

const canvas = GenerateCanvas();
let renderer, scene, camera, controls, gltfModel, mixer;

function init() {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.shadowMap.enabled = true;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    32,
    window.innerWidth / window.innerHeight
  );
  camera.position.set(0, 0, 30);
  controls = new OrbitControls(camera, canvas);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.radius = 8;

  const sphere = new THREE.SphereGeometry();
  const material = new THREE.MeshStandardMaterial();
  const mesh = new THREE.Mesh(sphere, material);
  // scene.add(mesh);

  // start gltf load (type below)
  const loader = new GLTFLoader();
  loader.load("/gltf/rocket.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material.metalness = 0;
      }
    });
    gltfModel = model;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });

    render();
  });
  // end gltf load
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
  animate();
}

function animate() {
  if (mixer) {
    mixer.update(1 / 10000);
  }
  // gltfModel.rotation.y += 0.01; // 초당 60프레임?
}

init();
