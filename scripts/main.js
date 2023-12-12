import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { World } from './world.js';
import { createUI } from './ui.js';

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
const camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(-32, 16, -32);
camera.lookAt(0 ,0 ,0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();



//Escena
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);



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
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update()
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window. innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    }
)

setupLights();
createUI(world);
animate();

