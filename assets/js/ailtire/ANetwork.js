import {AText} from './index.js';

export default class ANetwork {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let color = node.color || "#444444";
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
        const group = new THREE.Group();

        const stack = new THREE.CylinderGeometry(10, 10, 200, 20);
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);
        obj.applyMatrix4(new THREE.Matrix4().makeRotationZ(-theta));
        group.add(obj);

        let label = AText.view3D({text: node.name, color: "#ffffff", width: 200, size: 20});
        label.position.set(0, -4, 11);
        group.add(label);

        group.position.set(node.x, node.y, node.z);
        if (node.rotate) {
            if (node.rotate.x) {
                group.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if (node.rotate.y) {
                group.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if (node.rotate.z) {
                group.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        group.aid = node.id;
        node.box = 50;
        node.expandLink = `actor/get?id=${node.id}`;
        node.expandView = ANetwork.viewDeep3D;
        return group;
    }

    static viewDeep3D(obj) {

    }
}

