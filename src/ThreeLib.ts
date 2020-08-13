import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import OrbitControls from 'three-orbitcontrols';
// enable OrbitControls when testing camera
class ThreeLib {
    static memorizedLibInstance: any = null;

    scene: any;

    light: any;

    camera: any;

    frameId: number | null;

    mount: HTMLDivElement;

    renderer: any;

    gltfLoader: any;

    objLoader: any;

    mtlLoader: any;

    controls: any;

    cube: any;

    constructor(mount) {
        this.mount = mount;
        this.gltfLoader = new GLTFLoader();
        const width = this.mount?.clientWidth;
        const height = this.mount?.clientHeight;
        const cameraAspectRatio = width / height;

        this.scene = new THREE.Scene();
        this.frameId = null;
        this.camera = new THREE.PerspectiveCamera(75, cameraAspectRatio, 0.1, 1000);
        this.camera.position.z = 4;

        // ADD LIGHT
        this.light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        this.scene.add(this.light);
        // this.light = new THREE.AmbientLight(0xffffff); // soft white light
        // this.scene.add(this.light);

        // ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#fff');
        this.renderer.setSize(width, height);
        if (this.mount) {
            this.mount.appendChild(this.renderer.domElement);
        }
        // ADD MOUSE CTRL
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.update();
    }

    private renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    };

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    stop = () => {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
    };

    animate = () => {
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    };

    addCube = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    };

    addGltf = (url: string) => {
        this.gltfLoader.load(url, gltf => {
            this.scene.add(gltf.scene);
        });
    };

    addObj = (filePath: string, objFileName: string, mtlFileName: string) => {
        const objLoader = new OBJLoader();
        objLoader.setPath(filePath);
        const mtlLoader = new MTLLoader();
        mtlLoader.setPath(filePath);
        // eslint-disable-next-line promise/catch-or-return
        new Promise(resolve => {
            mtlLoader.load(mtlFileName, materials => {
                resolve(materials);
            });
            // eslint-disable-next-line promise/always-return
        }).then((materials: any) => {
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load(objFileName, object => {
                object.scale.set(1.25, 1.25, 1.25);
                object.position.set(0, 0, 0);
                this.scene.add(object);
            });
        });
    };
}

export default (mount: HTMLDivElement) => {
    if (!ThreeLib.memorizedLibInstance) {
        ThreeLib.memorizedLibInstance = new ThreeLib(mount);
        return ThreeLib.memorizedLibInstance;
    }
    return ThreeLib.memorizedLibInstance;
};
