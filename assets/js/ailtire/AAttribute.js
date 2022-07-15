import {AScenario, AText, AUsecase} from './index.js';

export default class AAttribute {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let color = node.color || "purple";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = 3.14 / 2;
        const group = new THREE.Group();
        const material = new THREE.MeshLambertMaterial({color: color, opacity: 1});
        const center = new THREE.BoxGeometry(100, 50, 30);
        let centerObj = new THREE.Mesh(center,material);
        group.add(centerObj);

        let label = AText.view3D({text:node.name.replace(':','\n'), color:"#ffffff", width: 100, size: 20});
        label.position.set(0,0,16);
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
        node.expandLink = `attribute/get?id=${node.id}`;
        node.expandView = AAttribute.viewDeep3D;

        return group;
    }

    static viewDeep3D(obj) {

    }
}

