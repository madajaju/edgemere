import { AText } from './index.js';

export default class AInterface {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let color = "blue";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let geo = new THREE.SphereGeometry(20, 16, 12);
        const material = new THREE.MeshPhongMaterial({color: color, opacity: 1});
        const item1 = new THREE.Mesh(geo, material);
        let geo2 = new THREE.CylinderGeometry(5, 5, 30);
        const material2 = new THREE.MeshPhongMaterial({color: color, opacity: 1});
        const item2 = new THREE.Mesh(geo2, material2);
        item2.position.set(0, -30, 0);
        const group = new THREE.Group();
        group.add(item1);
        group.add(item2);
        group.position.set(node.x, node.y, node.z);
        let name = node.name;
        name.replace('/','');
        let label = AText.view3D({text:name.replace(/\//g, '\n'), color:"#ffffff", width: 50, size: 16});
        label.applyMatrix4(new THREE.Matrix4().makeRotationX(-3.14/2));
        label.position.set(0,20+1,0);
        group.add(label)
        group.aid = node.id;
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
        node.expandLink = `interface/get?id=${node.id}`;
        node.expandView = AInterface.viewDeep3D;

        return group;
    }

    static viewDeep3D(obj) {

    }
}

