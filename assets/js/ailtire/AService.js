import {AScenario, AText, AUsecase} from './index.js';

export default class AService {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let color = node.color || "#aa4488";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = 3.14 / 2;
        const opacity = node.opacity || 1;

        const material = new THREE.MeshPhongMaterial({color: color, transparent: true, opacity: opacity});

        const stack = new THREE.CylinderGeometry(7.5, 15, 30, 20);
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        let label = AText.view3D({text: node.name, color: "#ffffff", width: 80, size: 20});
        label.position.set(0, 0, 14);
        obj.add(label);

        obj.position.set(node.x, node.y, node.z);
        if (node.rotate) {
            if (node.rotate.x) {
                obj.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if (node.rotate.y) {
                obj.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if (node.rotate.z) {
                obj.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        obj.aid = node.id;
        node.box = 50;
        node.expandLink = `service/get?id=${node.id}`;
        node.expandView = AService.viewDeep3D;

        return obj;
    }

    static viewDeep3D(obj) {

    }
}

