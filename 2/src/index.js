import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

let renderer, scene, camera, controls;

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

function init() {
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true }); // WebGLRenderer(3D장면 렌더링)인스턴스 생성 후 canvas를 사용하여 렌더링되도록 설정
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;

  scene = new THREE.Scene(); // 3D 공간의 장면을 정의

  const loader = new RGBELoader();
  loader.load("/hdr/sky.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });

  camera = new THREE.PerspectiveCamera(); // 원근투영 카메라
  camera.fov = 32; // 시야각
  camera.aspect = window.innerWidth / window.innerHeight; // 카메라의 종횡비
  camera.updateProjectionMatrix();

  camera.position.set(0, 0, 10); // 카메라 위치

  controls = new OrbitControls(camera, canvas);

  const geometry = new THREE.SphereGeometry(); // 구 형태 객체 생성 default는 반지름1
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color("white"),
    roughness: 0,
    metalness: 1,
    // emissive: new THREE.Color("rgb(20,20,20)"),
  }); // 물체의 표면 재질
  const mesh = new THREE.Mesh(geometry, material); // 객체와 표면을 결합한 3D 물체를 만듦
  scene.add(mesh); // 3D 장면에 추가

  const directionalLight = new THREE.DirectionalLight(
    new THREE.Color("white"),
    0.75
  ); // 방향성 광원, 첫번째인자: 컬러, 두번째인자: 세기
  directionalLight.position.set(2, 2, 2); // 조명의 방향
  directionalLight.castShadow = true;
  directionalLight.shadow.blurSamples = 30;
  directionalLight.shadow.radius = 10;
  // scene.add(directionalLight); // 방향성 광원 3D 장면에 추가

  const dirHelper = new THREE.DirectionalLightHelper(directionalLight);
  // scene.add(dirHelper);

  const pointLight = new THREE.PointLight(new THREE.Color(0xfffff), 0.8);
  pointLight.position.set(2, 0, 2);
  // scene.add(pointLight);

  const pointHelper = new THREE.PointLightHelper(pointLight);
  // scene.add(pointHelper);

  const ambientLight = new THREE.AmbientLight(0xfffff, 0.2); // 사방에서 쏘는 빛 -> 전체에서 쏘기 때문에 helper 필요X
  // scene.add(ambientLight);

  const hemisphereLight = new THREE.HemisphereLight(
    new THREE.Color("white"),
    new THREE.Color("black"),
    0.25
  );
  // scene.add(hemisphereLight);

  const hemiHelper = new THREE.HemisphereLightHelper(hemisphereLight); // 하늘과 바닥의 색을 다르게 지정
  scene.add(hemiHelper);

  const planeGeo = new THREE.PlaneGeometry(10, 10);
  const plane = new THREE.Mesh(planeGeo, material);
  plane.position.set(0, -1, 0);
  plane.rotation.set(Math.PI * -0.5, 0, 0);
  scene.add(plane);

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  plane.castShadow = true;
  plane.receiveShadow = true;

  render();
}

function render() {
  // 초당 60번씩 계속 실행되는 함수 -> 화면이 변화할때 마다 3D상태를 업데이트
  requestAnimationFrame(render); // render함수를 초당 60번 호출
  renderer.render(scene, camera); // scene과 camera를 사용하여 현재 3D 상태를 화면에 렌더링
  controls.update();
}

init();
