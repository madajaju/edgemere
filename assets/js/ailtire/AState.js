import { AText } from './index.js';

export default class AState {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let width = node.width || 10;
        let height = node.height || 5;
        let depth = node.depth || 2.5;
        let radius = node.radius || (Math.min(Math.min(width, height), depth) * .25);
        let widthSegments = Math.floor(node.widthSegments) || 1;
        let heightSegments = Math.floor(node.heightSegments) || 1;
        let depthSegments = Math.floor(node.depthSegments) || 1;
        let smoothness = Math.max(3, Math.floor(node.smoothness) || 3);

        let halfWidth = width * .5 - radius;
        let halfHeight = height * .5 - radius;
        let halfDepth = depth * .5 - radius;

        var geometry = new THREE.Geometry();

        // corners - 4 eighths of a sphere
        var corner1 = new THREE.SphereGeometry(radius, smoothness, smoothness, 0, Math.PI * .5, 0, Math.PI * .5);
        corner1.translate(-halfWidth, halfHeight, halfDepth);
        var corner2 = new THREE.SphereGeometry(radius, smoothness, smoothness, Math.PI * .5, Math.PI * .5, 0, Math.PI * .5);
        corner2.translate(halfWidth, halfHeight, halfDepth);
        var corner3 = new THREE.SphereGeometry(radius, smoothness, smoothness, 0, Math.PI * .5, Math.PI * .5, Math.PI * .5);
        corner3.translate(-halfWidth, -halfHeight, halfDepth);
        var corner4 = new THREE.SphereGeometry(radius, smoothness, smoothness, Math.PI * .5, Math.PI * .5, Math.PI * .5, Math.PI * .5);
        corner4.translate(halfWidth, -halfHeight, halfDepth);

        geometry.merge(corner1);
        geometry.merge(corner2);
        geometry.merge(corner3);
        geometry.merge(corner4);

        // edges - 2 fourths for each dimension
        // width
        var edge = new THREE.CylinderGeometry(radius, radius, width - radius * 2, smoothness, widthSegments, true, 0, Math.PI * .5);
        edge.rotateZ(Math.PI * .5);
        edge.translate(0, halfHeight, halfDepth);
        var edge2 = new THREE.CylinderGeometry(radius, radius, width - radius * 2, smoothness, widthSegments, true, Math.PI * 1.5, Math.PI * .5);
        edge2.rotateZ(Math.PI * .5);
        edge2.translate(0, -halfHeight, halfDepth);

        // height
        var edge3 = new THREE.CylinderGeometry(radius, radius, height - radius * 2, smoothness, heightSegments, true, 0, Math.PI * .5);
        edge3.translate(halfWidth, 0, halfDepth);
        var edge4 = new THREE.CylinderGeometry(radius, radius, height - radius * 2, smoothness, heightSegments, true, Math.PI * 1.5, Math.PI * .5);
        edge4.translate(-halfWidth, 0, halfDepth);

        // depth
        var edge5 = new THREE.CylinderGeometry(radius, radius, depth - radius * 2, smoothness, depthSegments, true, 0, Math.PI * .5);
        edge5.rotateX(-Math.PI * .5);
        edge5.translate(halfWidth, halfHeight, 0);
        var edge6 = new THREE.CylinderGeometry(radius, radius, depth - radius * 2, smoothness, depthSegments, true, Math.PI * .5, Math.PI * .5);
        edge6.rotateX(-Math.PI * .5);
        edge6.translate(halfWidth, -halfHeight, 0);

        edge.merge(edge2);
        edge.merge(edge3);
        edge.merge(edge4);
        edge.merge(edge5);
        edge.merge(edge6);

        // sides
        // front
        var side = new THREE.PlaneGeometry(width - radius * 2, height - radius * 2, widthSegments, heightSegments);
        side.translate(0, 0, depth * .5);

        // right
        var side2 = new THREE.PlaneGeometry(depth - radius * 2, height - radius * 2, depthSegments, heightSegments);
        side2.rotateY(Math.PI * .5);
        side2.translate(width * .5, 0, 0);

        side.merge(side2);

        geometry.merge(edge);
        geometry.merge(side);

        // duplicate and flip
        var secondHalf = geometry.clone();
        secondHalf.rotateY(Math.PI);
        geometry.merge(secondHalf);

        // top
        var top = new THREE.PlaneGeometry(width - radius * 2, depth - radius * 2, widthSegments, depthSegments);
        top.rotateX(-Math.PI * .5);
        top.translate(0, height * .5, 0);

        // bottom
        var bottom = new THREE.PlaneGeometry(width - radius * 2, depth - radius * 2, widthSegments, depthSegments);
        bottom.rotateX(Math.PI * .5);
        bottom.translate(0, -height * .5, 0);

        geometry.merge(top);
        geometry.merge(bottom);

        geometry.mergeVertices();

        let color = node.color || "#00aaaa";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const material = new THREE.MeshLambertMaterial({color: color, opacity: 1});
        let group = new THREE.Mesh(geometry, material);

        let label = AText.view3D({text:node.name, color:"#ffffff", width: node.width * 0.8, size: node.height/2});
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
        node.box = Math.sqrt(width*width + depth*depth + height*height); //
        node.expandLink = `state/get?id=${node.id}`;
        node.expandView = AState.viewDeep3D;
        return group;
    }

    static viewDeep3D(obj) {

    }
}

