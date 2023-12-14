import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { World } from './world.js';
import { createUI } from './ui.js';
import { Player } from './player.js';

const stats = new Stats()
document.body.append(stats.dom)

//Renderizado
const renderer = new THREE.WebGLRenderer(
    { antialias: true } 
);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);


//Camara
const orbitCamera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
orbitCamera.position.set(-32, 16, -32);


const controls = new OrbitControls(orbitCamera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();



//Escena
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

const player = new Player(scene);

function setupLights() {
    const sun = new THREE.DirectionalLight();   
    sun.position.set(100, 100, 100);
    sun.castShadow = true;
    sun.shadow.camera.left = -100;
    sun.shadow.camera.right = 100;
    sun.shadow.camera.bottom = -100;
    sun.shadow.camera.top = 100;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 200;
    sun.shadow.bias = -0.0005;
    sun.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(sun);
    
    const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
    scene.add(shadowHelper);


    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.3;
    scene.add(ambient);
}



//Render Loop
let previousTime = performance.now();

function animate() {
    let currentTime = performance.now();
    let dt = (currentTime - previousTime) / 1000;
    requestAnimationFrame(animate);
    player.applyInputs(dt);
    renderer.render(scene, player.controls.isLocked ? player.camera : orbitCamera );
    stats.update()

    previousTime = currentTime;

}

window.addEventListener('resize', () => {
    orbitCamera.aspect = window.innerWidth / window. innerHeight;
    orbitCamera.updateProjectionMatrix();

    player.camera.aspect = window.innerWidth / window. innerHeight;
    player.camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    }
)

setupLights();
createUI(world, player);
animate();

