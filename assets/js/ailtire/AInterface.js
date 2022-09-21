import {AText, A3DGraph, ASelectedHUD} from './index.js';

export default class AInterface {
    constructor(config) {
        this.config = config;
    }

    static default = {
        fontSize: 16,
        height: 40,
        width: 40,
        depth: 30
    }

    static calculateBox(node) {
        let height = AInterface.default.height;
        let width = AInterface.default.width;
        let depth = AInterface.default.depth;
        let radius = width / 2;
        return {w: width, h: height, d: depth, r: radius};
    }

    static view3D(node, type) {
        let opacity = node.opacity || 1;
        let size = AInterface.calculateBox(node);
        let color = "#0088FF";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let geo = new THREE.SphereGeometry(size.w / 2);
        const material = new THREE.MeshPhysicalMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            depthTest: true,
            depthWrite: true,
            alphaTest: 0,
            reflectivity: 0.2,
            thickness: 6,
            metalness: 0,
            side: THREE.DoubleSide
        });
        const item1 = new THREE.Mesh(geo, material);
        item1.position.set(0, 3 * size.d / 2, 0);
        let geo2 = new THREE.CylinderGeometry(size.w / 4, size.w / 4, size.d);
        const material2 = new THREE.MeshPhysicalMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            depthTest: true,
            depthWrite: true,
            alphaTest: 0,
            reflectivity: 0.2,
            thickness: 6,
            metalness: 0,
            side: THREE.DoubleSide
        });
        const item2 = new THREE.Mesh(geo2, material2);
        item2.position.set(0, size.d / 2, 0);
        const group = new THREE.Group();
        group.add(item1);
        group.add(item2);
        group.position.set(node.x, node.y, node.z);
        let name = node.name;
        name.replace('/', '');
        let label = AText.view3D({
            text: name.replace(/\//g, '\n'),
            color: "#ffffff",
            width: 50,
            size: AInterface.default.fontSize
        });
        label.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        label.position.set(0, 5 * size.d / 2, 0);
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
        node.box = size.r;
        node.expandLink = `interface/get?id=${node.id}`;
        node.expandView = AInterface.handle;
        node.getDetail = AInterface.getDetail;

        return group;
    }

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AInterface.showDetail(results);
            }
        });
    }

    static showDetail(result) {
        ASelectedHUD.update('Interface', []);
    }

    static viewDeep3D(obj) {

    }

    static handle(results) {

    }
}

