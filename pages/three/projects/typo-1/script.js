import * as THREE from "three";

const width = 900;
const height = 900;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;

// const controls = new OrbitControls(camera, document.body);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;

const cylinderG = new THREE.CylinderGeometry(2, 2, 0.5, 32);

const geometry = cylinderG;
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

const geometry2 = cylinderG;
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cylinder2 = new THREE.Mesh(geometry2, material2);
cylinder2.position.y = 0.5;
scene.add(cylinder2);

const geometry3 = cylinderG;
const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cylinder3 = new THREE.Mesh(geometry3, material3);
cylinder3.position.y = -0.5;
scene.add(cylinder3);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  //   controls.update();
  renderer.render(scene, camera);
}
