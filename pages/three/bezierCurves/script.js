import * as THREE from "three/webgpu";
import { ParametricGeometry } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DoubleSide } from "three";
import {
  vec4,
  vec3,
  uniform,
  equirectUV,
  positionLocal,
  Fn,
  time,
  mul,
  div,
  add,
  sub,
  floor,
  fract,
  uv,
  sin,
  cos,
  abs,
  texture,
  oneMinus
} from "three/tsl";

const width = window.innerWidth,
  height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera(35, width / height, 0.01, 100);
camera.position.set(2, 2, 20);
camera.lookAt(0, 0, 0);

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
  return bezier(70, 1, 1, 1, t);
}

const geometry = new ParametricGeometry(
  (u, v, target) => {
    let r = getRadius(v);
    let x = r * Math.sin(u * Math.PI * 2);
    let y = r * Math.cos(u * Math.PI * 2);
    let z = (v - 0.5) * 15;

    target.set(x, y, z);
  },
  325,
  325
);

let playhead = uniform(0.0);

let myMap = new THREE.TextureLoader().load("/textures/pattern-random-02.png");
myMap.colorSpace = THREE.SRGBColorSpace;
myMap.minFilter = THREE.LinearMipMapLinearFilter;
myMap.magFilter = THREE.LinearFilter;
myMap.wrapS = THREE.RepeatWrapping;
myMap.wrapT = THREE.RepeatWrapping;
myMap.repeat.set(1, 1);
myMap.flipY = true;

const material = new THREE.MeshPhysicalNodeMaterial();
material.color.set(0x000099);
material.roughness = 0.5;
material.metalness = 0.5;
material.side = DoubleSide;

let caluculated = Fn(() => {
	let row = floor(fract(uv().y.add(playhead)).mul(20));
	let randomValue = fract(sin(row.mul(123)).mul(345678.123));
  
	let newuv = uv().toVar();
	
	let rowSpeed = randomValue.mul(-1).add(0.5);
	newuv.x.addAssign(playhead.mul(rowSpeed));
	
	newuv.y.add(playhead);
	newuv.x.mulAssign(-7);
	newuv.y.addAssign(playhead);
	newuv.y = newuv.y.mul(20);
	
  return texture(myMap, newuv);
  });

material.colorNode = caluculated();
material.roughnessNode = caluculated();

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -1;
scene.add(mesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-10, -2, 4);
light.castShadow = true;
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 2));
const light2 = new THREE.DirectionalLight(0xffffff, 0.01);
light2.position.set(0, 0, -1);
light2.castShadow = true;
scene.add(light2);
const light3 = new THREE.PointLight(0xffffff, 100);
light3.position.set(5, 2, -2);
light3.castShadow = true;
scene.add(light3);

const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// animation

function animate(time) {
  //   mesh.rotation.x = time / 2000;
  //   mesh.rotation.y = time / 1000;
  playhead.value = time / 50000;
  renderer.renderAsync(scene, camera);
}
