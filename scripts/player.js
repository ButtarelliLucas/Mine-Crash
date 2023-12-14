import * as THREE from 'three'
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';


export class Player {
    maxSpeed = 10;
    input = new THREE.Vector2()
    velocity = new THREE.Vector3()
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
    controls = new PointerLockControls(this.camera, document.body);
    cameraHelper = new THREE.CameraHelper(this.camera);

    constructor(scene) {
        this.camera.position.set (32, 10, 32);
        scene.add(this.camera)
        scene.add(this.cameraHelper)
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    applyInputs(dt) {
        if (this.controls.isLocked) {
            this.velocity.x = this.input.x;
            this.velocity.z = this.input.z;
            this.controls.moveRight(this.velocity.x * dt);
            this.controls.moveForward(this.velocity.z * dt);
            
            document.getElementById('player-position').innerHTML = this.toString();

        }
    }

    /**
     * @type {THREE.Vector3}
     */
    get position() {
        return this.camera.position;
    }
    /**
     * Event handle for keydown
     * @param {KeyboardEvent} event 
     */
    onKeyDown(event) {
        if (!this.controls.isLocked) {
            this.controls.lock();
        }

        switch(event.code) {
            case "KeyW":
                this.input.z = this.maxSpeed;
                break;
            case "KeyA":
                this.input.x = -this.maxSpeed;
                break;
            case "KeyS":
                this.input.z = -this.maxSpeed;
                break;
            case "KeyD":
                this.input.x = this.maxSpeed;
                break;
            case "KeyR":
                this.position.set (32, 16, 32);
                this.velocity.set (0, 0, 0);
                break
        }
    }

    /**
     * Event handle for keyup
     * @param {KeyboardEvent} event 
     */
    onKeyUp(event) {
        switch(event.code) {
            case "KeyW":
                this.input.z = 0;
                break;
            case "KeyA":
                this.input.x = 0;
                break;
            case "KeyS":
                this.input.z = 0;
                break;
            case "KeyD":
                this.input.x = 0;
                break;
        }
        
    }

    toString() {
        let srt = '';
        srt += `X: ${this.position.x.toFixed(3)}`;
        srt += `Y: ${this.position.y.toFixed(3)}`;
        srt += `Z: ${this.position.z.toFixed(3)}`;
        return srt;
    }

}