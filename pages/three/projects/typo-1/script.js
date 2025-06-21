import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const width = 900;
const height = 900;
const word = "";

const wordText = word || "Hello, there!";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;

context.fillStyle = "rgba(255, 255, 255, 0)";
context.fillRect(0, 0, canvas.width, canvas.height);

context.font = "bold 64px Monospace";
context.fillStyle = "white";
context.textAlign = "center";
context.textBaseline = "middle";

context.fillText(wordText, canvas.width / 2, canvas.height / 2);

const textTextureHold = new THREE.CanvasTexture(canvas);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = -5;
const orbitControls = new OrbitControls(camera, document.body);

const cylinderG = new THREE.CylinderGeometry(2, 2, 0.5, 32);

const geometry = cylinderG;
const material = new THREE.MeshBasicMaterial({ map: textTextureHold });
textTextureHold.repeat.set(3, 0.25);
textTextureHold.offset.set(-1, 0.4);
textTextureHold.needsUpdate = true;
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
  orbitControls.update();
  renderer.render(scene, camera);
}
