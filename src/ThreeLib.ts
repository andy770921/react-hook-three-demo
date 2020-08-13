import * as THREE from 'three';

class ThreeLib {
    static memorizedLibInstance: any = null;

    scene: any;

    camera: any;

    frameId: number | null;

    mount: HTMLDivElement;

    renderer: any;

    cube: any;

    constructor(mount) {
        this.mount = mount;
        const width = this.mount?.clientWidth;
        const height = this.mount?.clientHeight;
        const cameraAspectRatio = width / height;

        this.scene = new THREE.Scene();
        this.frameId = null;
        this.camera = new THREE.PerspectiveCamera(75, cameraAspectRatio, 0.1, 1000);
        this.camera.position.z = 4;
        // ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(width, height);
        if (this.mount) {
            this.mount.appendChild(this.renderer.domElement);
        }
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
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    };

    addCube = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    };
}

export default (mount: HTMLDivElement) => {
    if (!ThreeLib.memorizedLibInstance) {
        ThreeLib.memorizedLibInstance = new ThreeLib(mount);
        return ThreeLib.memorizedLibInstance;
    }
    return ThreeLib.memorizedLibInstance;
};
