import { AText } from './index.js';

export default class AState {
    constructor(config) {
        this.config = config;
    }
    static default = {
        fontSize: 15,
        height: 20,
        width: 40,
        depth: 5,
        corner: 5,
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {return item.length;});
        let maxLetters = nameArray.reduce(function(a, b) { return Math.max(a, b); }, -Infinity);
        let height = nameArray.length*AState.default.fontSize*2;
        let width = maxLetters * (AState.default.fontSize/1.5);
        let depth = AState.default.depth;
        let radius = Math.max(Math.sqrt(width*width + height*height), Math.sqrt(height*height + depth*depth), Math.sqrt(width*width + depth*depth));
        return {w: width, h: height, d: depth, r: radius};
    }

    static view3D(node, type) {
        let size = AState.calculateBox(node);
        let width = size.w;
        let height = size.h
        let halfWidth = width/2;
        let halfHeight = height/2;
        let depth = size.d;
        let radius0 = node.radius || (Math.min(Math.min(width, height), depth) * .25);
        let smoothness = Math.max(3, Math.floor(node.smoothness) || 3);


        let shape = new THREE.Shape();
        let eps = AState.default.corner;
        let radius = radius0 - 1;
        shape.absarc( -halfWidth + eps, -halfHeight+eps, eps, -Math.PI/2, -Math.PI, true );
        shape.absarc( -halfWidth + eps, halfHeight - radius * 2, eps, Math.PI, Math.PI/2, true );
        shape.absarc( halfWidth - radius * 2, halfHeight -  radius * 2, eps, Math.PI / 2, 0, true );
        shape.absarc( halfWidth - radius * 2, -halfHeight+eps, eps, 0, -Math.PI/2, true );
        let geometry = new THREE.ExtrudeBufferGeometry( shape, {
            amount: depth - radius0 * 2,
            bevelEnabled: true,
            bevelSegments: smoothness * 2,
            steps: 1,
            bevelSize: radius,
            bevelThickness: radius0,
            curveSegments: smoothness
        });
        let opacity = node.opacity | 1;
        let color = node.color || "#6666cc";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
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
        let group = new THREE.Mesh(geometry, material);

        let label = AText.view3D({text:node.name, color:"#ffffff", width: node.width, size: AState.default.fontSize});
        label.position.set(0,0,(depth/2)+1);
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
        node.box = size.r;
        node.expandLink = `state/get?id=${node.id}`;
        node.expandView = AState.viewDeep3D;
        node.getDetail = AState.getDetail;
        return group;
    }
    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AState.showDetail(results);
            }
        });
    }
    static showDetail(result) {

    }

    static viewDeep3D(obj) {

    }
}

