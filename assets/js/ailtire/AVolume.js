import  {AText, A3DGraph, ASelectedHUD} from './index.js';

export default class AVolume {
    constructor(config) {
        this.config = config;
    }
    static default = {
        fontSize: 15,
        height: 40,
        width: 40,
        depth: 40,
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {return item.length;});
        let maxLetters = nameArray.reduce(function(a, b) { return Math.max(a, b); }, -Infinity);
        let height = nameArray.length*AVolume.default.fontSize*2;
        let width = maxLetters * (AVolume.default.fontSize/2) + 10;
        let depth = width;
        let radius = Math.max(Math.sqrt(width*width + height*height), Math.sqrt(height*height + depth*depth), Math.sqrt(width*width + depth*depth))/2;
        return {w: width, h: height, d: depth, r: radius};
    }

    static view3D(node, type) {
        let color = node.color || "#44aa88";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const opacity = node.opacity || 1;
        const size = AVolume.calculateBox(node);

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

        const stack = new THREE.CylinderGeometry(size.w/2, size.w/2, size.h, 20);
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        let label = AText.view3D({text: node.name, color: "#ffffff", width: size.w, size: AVolume.default.fontSize});
        label.position.set(0, 0, size.w/2);
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
        node.expandLink = `volume/get?id=${node.id}`;
        node.expandView = AVolume.handle;
        node.getDetail = AVolume.getDetail;

        return obj;
    }

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AVolume.showDetail(results);
            }
        });
    }
    static showDetail(result) {
        ASelectedHUD.update('Volume', []);
    }
    static viewDeep3D(obj) {

    }
    static handle(results) {

    }

}

