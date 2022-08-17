import {AAction, AScenario, AText, AUsecase} from './index.js';

export default class AService {
    constructor(config) {
        this.config = config;
    }
    static default = {
        fontSize: 20,
        height: 30,
        width: 15,
        depth: 15
    }

    static calculateBox(node) {
        let height = AService.default.height;
        let depth = AService.default.depth;
        let width = AService.default.width;
        let radius = Math.max(Math.sqrt(width*width + height*height), Math.sqrt(height*height + depth*depth), Math.sqrt(width*width + depth*depth));
        return {w: width, h: height, d: depth,r: radius};
    }

    static view3D(node, type) {
        let color = node.color || "#cc6688";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = 3.14 / 2;
        const opacity = node.opacity || 1;
        const size = AService.calculateBox(node);
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

        const stack = new THREE.CylinderGeometry(size.w/2, size.d, size.h,AService.default.fontSize);
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        let label = AText.view3D({text: node.name, color: "#ffffff", width: 80, size: 20});
        label.position.set(0, 0, size.d);
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
        node.box = size.r;
        node.expandLink = `service/get?id=${node.id}`;
        node.expandView = AService.viewDeep3D;
        node.getDetail = AService.getDetail;

        return obj;
    }
    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AService.showDetail(results);
            }
        });
    }
    static showDetail(result) {

    }

    static viewDeep3D(obj) {

    }
}

