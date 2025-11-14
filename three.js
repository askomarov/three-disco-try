import * as THREE from "three/webgpu";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Sketch {
  constructor(options) {

    this.scene = new THREE.Scene();

    this.container = options.dom;

    // Основные параметры
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer = new THREE.WebGPURenderer();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xeeeeee, 1)

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 1000);

    this.camera.position.set(0, 0, 2);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.time = 0;

    this.isPlaying = true;

    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();

    // this.setUpSettings();
  }

  setUpSettings() {
    this.settings = {
      progress: 0,
    }
    this.gui = new GUI();
    this.gui.add(this.settings, 'progress', 0, 1, 0.01).onChange((val) => {});
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    this.materaial = new THREE.MeshBasicNodeMaterial({
      color: 0xff0000
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.plane = new THREE.Mesh(this.geometry, this.materaial);
    this.scene.add(this.plane);
  }

  addLights() {
    this.light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.light);
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.render();
    }
  }

  // onMouseMove(evt) {
  //   this.mousePos.x = (evt.clientX / this.width) * 2 - 1;
  //   this.mousePos.y = -(evt.clientY / this.height) * 2 + 1;
  // }

  // Анимация
  render() {
    if (!this.isPlaying) return;
    this.time += 0.05;

    requestAnimationFrame(this.render.bind(this));
    this.renderer.renderAsync(this.scene, this.camera);
  }
}
