import {AScenario, AText, AUsecase} from './index.js';

export default class AAction {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let color = node.color || "blue";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let w = node.w || 120;
        let h = node.h || 40;

        const theta = 3.14 / 2;
        const group = new THREE.Group();
        const material = new THREE.MeshLambertMaterial({color: color, opacity: 1});
        const left = new THREE.SphereGeometry(h/2, 16, 12);
        let leftObj = new THREE.Mesh(left,material);
        leftObj.position.set(-(w-h)/2,0,0)
        const right = new THREE.SphereGeometry(h/2, 16, 12);
        let rightObj = new THREE.Mesh(right,material);
        rightObj.position.set((w-h)/2,0,0)
        const center = new THREE.CylinderGeometry(h/2, h/2, w - h);
        let centerObj = new THREE.Mesh(center,material);
        centerObj.applyMatrix4(new THREE.Matrix4().makeRotationZ(theta));
        group.add(leftObj);
        group.add(rightObj);
        group.add(centerObj);

        let label = AText.view3D({text:node.name, color:"#ffffff", width: w-h, size: (h/2)});
        label.position.set(0,0,(h/2) + 1);
        label.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
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
        node.box = h;
        node.expandLink = `action/get?id=${node.id}`;
        node.expandView = AAction.viewDeep3D;

        return group;
    }

    static viewDeep3D(obj) {

    }
}

