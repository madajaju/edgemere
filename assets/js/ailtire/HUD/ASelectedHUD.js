/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {
    AText,
} from '../index.js';

export default class ASelectedHUD {
    static visible = false;
    static plane = undefined;
    static height = 0;
    static width = 0;
    static title = "";
    static currentHeight = 0;
    static records = [];
    static colors = {};
    static dist = 20;
    static size = 0.25;

    static sync() {
        ASelectedHUD.hide();
        ASelectedHUD.plane = undefined;
        ASelectedHUD.show();
    }

    static show() {
        let camera = window.graph.graph.camera();
        if (!ASelectedHUD.plane) {
            const dist = ASelectedHUD.dist;
            const vFOV = THREE.MathUtils.degToRad(camera.fov); // convert vertical fov to radians
            const height = 2 * Math.tan(vFOV / 2) * dist; // visible height
            const width = height * camera.aspect;
            let geometry = new THREE.PlaneGeometry(width / 8, height)
            const material = new THREE.MeshBasicMaterial({
                color: "#444444",
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.30
            });
            ASelectedHUD.plane = new THREE.Mesh(geometry, material);
            ASelectedHUD.plane.position.set(7 * width / 16, 0, -dist);
            window.graph.graph.scene().add(camera);
            camera.add(ASelectedHUD.plane);
            ASelectedHUD.visible = true;
            ASelectedHUD.update();
        }
        if (!ASelectedHUD.visible) {
            camera.add(ASelectedHUD.plane);
            ASelectedHUD.visible = true;
        }
    }

    static hide() {
        let camera = window.graph.graph.camera();
        camera.remove(ASelectedHUD.plane);
        ASelectedHUD.visible = false;
    }

    static update(ptitle, precords) {
        let title = ptitle || ASelectedHUD.title;
        let records = precords || ASelectedHUD.records;
        ASelectedHUD.title = title;
        ASelectedHUD.records = records;

        if (ASelectedHUD.plane) {
            let camera = window.graph.graph.camera();
            let plane = ASelectedHUD.plane;
            while (plane.children.length > 0) {
                plane.remove(plane.children[0]);
            }

            let height = plane.geometry.parameters.height;
            let width = plane.geometry.parameters.width;
            let vwidth = width - ASelectedHUD.size;
            let label = AText.view3D({
                text: title,
                color: "#ffffff",
                size: ASelectedHUD.size * 1.2,
                anchorX: 'left',
                anchorY: 'top',
                textAlign: 'left',
            });
            label.position.set(-width / 2, (height / 2.27), 0.01);
            plane.add(label);
            let yoffset = (height / 2.27) - ASelectedHUD.size * 2;
            for (let i in records) {
                let rec = records[i];
                let labeln = AText.view3D({
                    text: rec.name,
                    color: "#cccccc",
                    size: ASelectedHUD.size,
                    anchorX: 'left',
                    anchorY: 'top',
                    textAlign: 'left',
                    maxWidth: width,
                });
                labeln.position.set(-width / 2, yoffset, 0.01);
                plane.add(labeln);
                yoffset -= ASelectedHUD.size;
                let labelv = AText.view3D({
                    text: rec.value,
                    color: "#ffffff",
                    size: ASelectedHUD.size,
                    anchorX: 'left',
                    anchorY: 'top',
                    textAlign: 'left',
                    maxWidth: vwidth,
                });
                // Offset the value by one character.
                labelv.position.set(-width / 2 + ASelectedHUD.size, yoffset, 0.01);
                plane.add(labelv);
                if (rec.value) {
                    let totalwidth = `${rec.value}`.length * 2 * ASelectedHUD.size / 3; // width is 2/3 the height
                    let lines = Math.round((totalwidth / vwidth) + 0.5); // Round up.
                    yoffset -= (lines * ASelectedHUD.size * 1.2);
                } else {
                    yoffset -= ASelectedHUD.size * 1.2;
                }
            }
        }
    }

    static toggle() {
        if (!ASelectedHUD.visible) {
            ASelectedHUD.show();
        } else {
            ASelectedHUD.hide();
        }
    }
}
