import {AText} from './index.js';

export default class AImage {
    constructor(config) {
        this.config = config;
    }
    static default = {
        fontSize: 20,
        height: 40,
        width: 40,
        depth: 5
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {return item.length;});
        let maxLetters = nameArray.reduce(function(a, b) { return Math.max(a, b); }, -Infinity);
        let height = nameArray.length*AImage.default.fontSize*1.2+ AImage.default.height;
        let width = maxLetters * (AImage.default.fontSize/1.2);
        let depth = AImage.default.depth;
        let radius = Math.max(Math.sqrt(width*width + height*height), Math.sqrt(height*height + depth*depth), Math.sqrt(width*width + depth*depth));
        return {w: width, h: height, d: AImage.default.depth,r:radius};
    }

    static view3D(node, type) {
        let color = node.color || "#884444";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = Math.PI / 2;
        const opacity = node.opacity || 1;

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
        let size = AImage.calculateBox(node);
        const stack = new THREE.BoxGeometry(size.w, size.h, size.d)
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        let label = AText.view3D({text: node.name, color: "#ffffff", width: size.width, size: AImage.default.fontSize});
        label.position.set(0, 0, size.d+1);
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
        node.expandLink = `image/get?id=${node.id}`;
        node.expandView = AImage.viewDeep3D;
        node.getDetail = AImage.getDetail;

        return obj;
    }
    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AImage.showDetail(results);
            }
        });
    }
    static showDetail(result) {

    }
    static viewDeep3D(obj) {

    }
}

