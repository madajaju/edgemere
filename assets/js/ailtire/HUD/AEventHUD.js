import {
    AText,
} from '../index.js';

export default class AEventHUD {
    static visible = false;
    static plane = undefined;
    static height= 0;
    static width= 0;
    static currentHeight= 0;
    static events = {};
    static colors = {};
    static dist = 20;
    static size = 0.2;

    static sync() {
        AEventHUD.hide();
        AEventHUD.plane = undefined;
        AEventHUD.show();
    }
    static updateHUD(event) {
        let width = AEventHUD.width;
        let height = AEventHUD.height;
        let currentHeight = AEventHUD.currentHeight;
        let size = AEventHUD.size;

        if (!AEventHUD.events.hasOwnProperty(event.recid)) {
            currentHeight += size;
            AEventHUD.currentHeight = currentHeight;
            AEventHUD.events[event.recid] = {record: event, plane: {}, countObj: {}, eventsObj: {}, yoffset: currentHeight};
            const geo = new THREE.PlaneGeometry(width,size);
            const material = new THREE.MeshBasicMaterial({
                color: "#444444",
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.30,
            });
            const group = new THREE.Mesh(geo, material);
            AEventHUD.events[event.recid].plane = group;
            group.position.set(0, currentHeight, 0);
            if(AEventHUD.plane) {
                AEventHUD.plane.add(group);
            }
            // Add Label
            let labelr = AText.view3D({
                text: event.recid,
                color: "#ffffff",
                size: size,
                anchorX: 'left',
                anchorY: 'middle',
                textAlign: 'left',
            });
            labelr.position.set(-width/2 + 4*2*size, 0, 0.01);
            group.add(labelr);
            // Add Count
            let labelc = AText.view3D({
                text: event.recid,
                color: "#ffffff",
                size: size,
                anchorX: 'left',
                anchorY: 'middle',
                textAlign: 'left',
            });
            labelc.position.set(-(width / 2) + (3*2*size), 0, 0.01);
            group.add(labelc);
            AEventHUD.events[event.recid].countObj = labelc;
            // Add eventsArray of Objects
            let i = 0;
            for (let ename in event.events) {
                i++;
                let color = AEventHUD.colors[ename] || "#ffbb88";
                let ebox = AEventHUD._statObj(AEventHUD.events[event.recid].plane, {
                    size: size,
                    x: -(width / 2) + ((3-i) * 2 * size),
                    y: 0,
                    z: 0,
                    text: event.events[ename],
                    color: color,
                });
                group.add(ebox);
                AEventHUD.events[event.recid].eventsObj[ename] = ebox;
            }
        }
        AEventHUD.events[event.recid].countObj.text = `${event.count}`;
        AEventHUD.events[event.recid].countObj.sync();


        for (let ename in event.events) {
            if (!AEventHUD.events[event.recid].eventsObj.hasOwnProperty(ename)) {
                let length = Object.keys(AEventHUD.events[event.recid].eventsObj).length;
                let color = AEventHUD.colors[ename] || "#ffbb88";
                length++;
                let ebox = AEventHUD._statObj(AEventHUD.events[event.recid].plane, {
                    size: size,
                    x: -(width / 2) + ((3-length) * 2 * size),
                    y: 0,
                    z: 0,
                    text: event.events[ename],
                    color: color,
                });
                AEventHUD.events[event.recid].eventsObj[ename] = ebox;
                AEventHUD.events[event.recid].plane.add(ebox);
            }
            AEventHUD.events[event.recid].eventsObj[ename].text = `${event.events[ename]}`;
            AEventHUD.events[event.recid].eventsObj[ename].sync();
        }
    }

    static _statObj(parent, obj) {
        const geo = new THREE.BoxGeometry(obj.size*2,obj.size,0.1);
        const material = new THREE.MeshBasicMaterial({
            color: obj.color,
            side: THREE.DoubleSide,
            transparent: false,
            opacity: 1
        });
        const box = new THREE.Mesh(geo, material);
        box.position.set(obj.x, obj.y, obj.z);
        let label = AText.view3D({
            text: obj.text,
            color: "#000000",
            size: obj.size,
            anchorX: 'center',
            anchorY: 'middle',
            textAlign: 'center',
        });
        label.position.set(obj.x, obj.y, obj.z+0.1);
        box.add(label);
        parent.add(box);
        return label;
    }

    static show() {
        let camera = window.graph.graph.camera();
        if (!AEventHUD.plane) {
            const dist = AEventHUD.dist;
            const vFOV = THREE.MathUtils.degToRad(camera.fov); // convert vertical fov to radians
            const height = 2 * Math.tan(vFOV / 2) * dist; // visible height
            const width = height * camera.aspect;
            let geometry = new THREE.PlaneGeometry(width / 6, height)
            const material = new THREE.MeshBasicMaterial({
                color: "#444444",
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.30,
            });
            const plane = new THREE.Mesh(geometry, material);
            plane.position.set(-5 * width / 12, 0, -dist);
            window.graph.graph.scene().add(camera);
            camera.add(plane);
            AEventHUD.visible = true;
            AEventHUD.plane = plane;
            AEventHUD.height = plane.geometry.parameters.height;
            AEventHUD.width = plane.geometry.parameters.width;
            AEventHUD.currentHeight = -AEventHUD.height/2.27;

            // Add the current events to the plane.
            // change the height and width for the events already created.
            for(let ename in AEventHUD.events) {
                let event = AEventHUD.events[ename];
                event.plane.position.set(-AEventHUD.width/2,AEventHUD.currentHeight)
                AEventHUD.plane.add(event.plane);
                AEventHUD.currentHeight += AEventHUD.size;
            }
        }
        if (!AEventHUD.visible) {
            AEventHUD.visible = true;
            camera.add(AEventHUD.plane);
        }
    }

    static hide() {
        let camera = window.graph.graph.camera();

        // Remove plane
        camera.remove(AEventHUD.plane);
        AEventHUD.visible = false;
    }

    static toggle() {
        if (!AEventHUD.visible) {
            AEventHUD.show();
        } else {
            AEventHUD.hide();
        }
    }
    static setColors(scolor) {
        AEventHUD.colors = scolor;
    }
}

