import * as THREE from "three/webgpu";
import { ParametricGeometry } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DoubleSide } from "three";

const width = window.innerWidth,
  height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera(35, width / height, 0.01, 100);
camera.position.set(0, -1, 20);

const controls = new OrbitControls(camera, document.body);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

const scene = new THREE.Scene();

//const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
function bezier(a, b, c, d, t) {
  let oneMinusT = 1 - t;
  return (
    oneMinusT * oneMinusT * oneMinusT * a +
    oneMinusT * oneMinusT * t * b +
    oneMinusT * t * t * c +
    t * t * t * d
  );
}
function getRadius(t) {
  return bezier(40, 10, 1, 1, t);
}

const geometry = new ParametricGeometry(
  (u, v, target) => {
    let r = getRadius(v);
    let x = r * Math.sin(u * Math.PI * 2);
    let y = r * Math.cos(u * Math.PI * 2);
    let z = (v - 0.5) * 12;
    target.set(x, y, z);
  },
  325,
  325
);

const material = new THREE.MeshNormalMaterial();
material.side = DoubleSide;
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -1;
scene.add(mesh);

const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// animation

function animate(time) {
  //   mesh.rotation.x = time / 2000;
  //   mesh.rotation.y = time / 1000;

  renderer.renderAsync(scene, camera);
}
