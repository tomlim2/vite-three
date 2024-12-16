import * as THREE from 'three';

// Cnavas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const size = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(35, size.width / size.height);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);