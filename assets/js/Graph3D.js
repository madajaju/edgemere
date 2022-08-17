import {AText} from "./ailtire/index.js";

export class Graph3D {
    constructor(gdiv, data, options) {
        this.objects = {};
        this.links = {};
        this.gdiv = gdiv;
        this.options = {
            width: 1000,
            height: 1000,
            background: "#555500",
            linkColor: "#000000",
            linkDuplicate: true,
        }
        for (let i in options) {
            this.options[i] = options[i];
        }
        this.selected = {
            links: {
                target: new Set(),
                source: new Set()
            },
            nodes: {
                primary: null,
                source: {},
                target: {},
            }
        }

        if (options.expandObject) {
            this.expandObject = options.expandObject;
        }
        if (options.expandDesign) {
            this.expandDesign = options.expandDesign;
        }
        this.data = data;
        this.normalizeData();
        this.graph = ForceGraph3D({controlType: 'orbit'})
        (document.getElementById(this.gdiv))
            .width(this.options.width)
            .height(this.options.height)
            .backgroundColor(this.options.background)
            .nodeVal((node) => {
                return node.box || 20;
            })
            .nodeLabel(node => {
                let label = node.description || node.name;
                return label;
            })
            .nodeThreeObject(node => {
                let retval = null;

                let type = "";
                if (this.selected.nodes.primary === node) {
                    type += "Selected";
                } else if (this.selected.nodes.target.hasOwnProperty(node.id)) {
                    type += "Targeted";
                } else if (this.selected.nodes.source.hasOwnProperty(node.id)) {
                    type += "Sourced";
                }

                if (typeof node.view === 'function') {
                    return node.view(node, type);
                } else {
                    let objID = "#" + node.view + type;
                    let defaultID = "#default3D" + type;
                    let material = null;

                    retval = document.querySelector(objID);
                    if (!retval) {
                        retval = document.querySelector(defaultID);
                    }
                    let obj3D = retval.object3D.clone();
                    return obj3D;
                }
            })
            .linkCurvature(link => {
                if (link.source === link.target) {
                    return 1;
                }
                if (link.curve) {
                    return link.curve;
                }
                return 0;
            })
            .linkWidth(link => {
                let width = link.width || 2;
                if (this.selected.links.target.has(link)) {
                    return width * 2;
                } else if (this.selected.links.source.has(link)) {
                    return width * 2;
                }
                return width;
            })
            .linkOpacity(1.0)
            .linkDirectionalArrowRelPos(link => {
                return link.relpos;
            })
            .linkDirectionalArrowLength(link => {
                if (link.arrow) {
                    return link.arrow;
                }
                return 0;
            })
            .linkThreeObjectExtend(true)
            .linkThreeObject(link => {
                // extend link with text sprite
                if (link.name) {
                    let sprite = AText.view3D({text: link.name, color: "#dddddd", width: 100, size: 10});
                    sprite.name = link.name;
                    return sprite;
                }
                return null;

            })
            .linkPositionUpdate((sprite, {start, end}) => {
                if (sprite) {
                    let ax = Math.abs(start.x - end.x);
                    let ay = Math.abs(start.y - end.y);
                    let az = Math.abs(start.z - end.z);
                    if (ay > ax && ay > az) {
                        sprite.oriented = "YX";
                        if (az > ax) {
                            if (sprite.oriented != "YZ") {
                                sprite.oriented = "YZ";
                                sprite.setRotationFromEuler(new THREE.Euler(0, 0, 0, "XYZ"));
                            }
                        }
                    } else if (ax > ay && ax > az) {
                        if (az > ay) {
                            if (sprite.oriented != "XZ") {
                                sprite.oriented = "XZ";
                                sprite.setRotationFromEuler(new THREE.Euler(Math.PI / 2, 0, Math.PI / 2, "XYZ"));
                            }
                        } else if (sprite.oriented != "XY") {
                            sprite.oriented = "XY";
                            sprite.setRotationFromEuler(new THREE.Euler(0, 0, 0, "XYZ"));
                        }
                    } else if (az > ax && az > ay) {
                        if (ax > ay) {
                            if (sprite.oriented != "ZX") {
                                sprite.oriented = "ZX";
                                sprite.setRotationFromEuler(new THREE.Euler(Math.PI / 2, 0, 0, "XYZ"));
                            }
                        } else if (sprite.oriented != "ZY") {
                            sprite.oriented = "ZY";
                            sprite.setRotationFromEuler(new THREE.Euler(0, 0, 0, "XYZ"));
                        }
                    }
                    if (sprite.lcurve) {
                        const dx = end.x - start.x;
                        const dy = end.y - start.u || 0;
                        let vLine = new THREE.Vector3().subVectors(end, start);
                        let cp = vLine.clone().multiplyScalar(sprite.lcurve / 2).cross(dx !== 0 || dy !== 0 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0))
                            .add(new THREE.Vector3().addVectors(start, end).divideScalar(2));
                        Object.assign(sprite.position, cp);
                    } else {
                        const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
                            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                        })));
                        // Position sprite
                        Object.assign(sprite.position, middlePos);
                    }
                }
            })
            .linkDirectionalParticles(link => {
                if (this.selected.links.target.has(link)) {
                    return 5;
                } else if (this.selected.links.source.has(link)) {
                    return 5;
                }
                return 2;
            })
            .linkDirectionalParticleColor(link => {
                if (this.selected.links.target.has(link)) {
                    return "#ff0000";
                } else if (this.selected.links.source.has(link)) {
                    return "#ffff00";
                }
                if (link.color) {
                    return link.color;
                }
                return this.options.linkColor;
            })
            .linkDirectionalParticleWidth(link => {
                let width = link.width || 2;
                if (this.selected.links.target.has(link)) {
                    return width * 4;
                } else if (this.selected.links.source.has(link)) {
                    return width * 4;
                }
                return width * 2;
            })
            .linkColor(link => {
                if (link.color) {
                    return link.color;
                } else {
                    return "gray";
                }
            })
            .linkDirectionalParticleSpeed(0.006)
            .enableNodeDrag(true)
            .graphData(this.ndata)
            .onNodeClick(node => {
                this.selectNode(node);
            })
            .onNodeRightClick(node => {
                if (this.expandObject) {
                    if (node.expandLink) {
                        // This is a design element.
                        this.expandDesign(node);
                    } else {
                        this.expandObject(`${node.group}?id=${node.id}`);
                    }
                }
            })
            .dagLevelDistance(300);
        this.linkForce = this.graph
            .d3Force('link')
            .distance(link => link.value * 10);
        this.graph
            .d3Force('collide', d3.forceCollide().radius((d) => {
                return d.box || 20;
            }))
            .d3Force('plane', Graph3D.forceOnPlane());

        this.graph.numDimensions(3);
        window.graph = this;
        window.graph.graph.onEngineStop(() => window.graph.graph.zoomToFit(400));
    };

    addObject(obj) {
        this.objects[obj.aid] = obj;
        this.graph.scene().add(obj);
    }

    addLink(link) {
        if (link.id) {
            this.links[link.id] = link;
        } else {
            this.links[link.source + link.target] = link;
        }
    }

    showLinks() {
        for (let id in this.links) {
            let link = this.links[id];
            let source = this.objects[link.source];
            let target = this.objects[link.target];
            if (source && target) {
                const color = link.color || 0xaaaaaa;
                const material = new THREE.LineBasicMaterial({color: color});
                const points = [];
                points.push(new THREE.Vector3(source.position.x, source.position.y, source.position.z));
                points.push(new THREE.Vector3(target.position.x, target.position.y, target.position.z));
                const geo = new THREE.BufferGeometry().setFromPoints(points);
                const linkObj = new THREE.Line(geo, material);
                // Add the links as objects to the graph
                this.objects[id] = linkObj;
                this.graph.scene().add(linkObj);
            }
        }
    }

    clearObjects() {
        for (let i in this.objects) {
            this.graph.scene().remove(this.objects[i]);
            ;
        }
        this.objects = {};
        this.links = {};
    }

    resize(opts) {
        let gdiv = document.getElementById(this.gdiv)
        gdiv.style.width = `${opts.width}px`;
        gdiv.style.height = `${opts.height}px`;
        this.graph.width(opts.width);
        this.graph.height(opts.height);
        this.graph.zoomToFit();
    }

    normalizeData() {
        this.ndata = {
            links: [],
            nodes: []
        };
        let linkmap = {};
        // Cleanup links to non-objects
        // If multiple links between objects change the curve.
        let k = 0;
        for (let i in this.data.links) {
            let source = this.data.links[i].source;
            let target = this.data.links[i].target;
            let found = true;
            if (typeof source === 'string') {
                if (!this.data.nodes.hasOwnProperty(source)) {
                    console.error("Could not find the Source Node:", source);
                    found = false;
                } else {
                    source = this.data.nodes[source];
                }
            }
            if (typeof target === 'string') {
                if (!this.data.nodes.hasOwnProperty(target)) {
                    console.error("Could not find the Target Node:", target);
                    found = false;
                } else {
                    target = this.data.nodes[target];
                }
            }
            if (found) {
                this.ndata.links.push(this.data.links[i]);
                if (!linkmap.hasOwnProperty(source.id + target.id)) {
                    linkmap[source.id + target.id] = [];
                }
                linkmap[source.id + target.id].push(k);
                k++;
            }
        }
        for (let ni in linkmap) {
            let litem = linkmap[ni];
            if (litem.length > 1) {
                let curve = -litem.length / 2 * 0.2;
                for (let i in litem) {
                    let lid = litem[i];
                    this.ndata.links[lid].curve = curve;
                    curve += 0.2;
                }
            }
        }
        // Reset the links array if the links are not duplicated based on the options.
        if(!this.options.linkDuplicate) {
            let newLinks = [];
            for(let i in linkmap) {
                let link = this.ndata.links[linkmap[i][0]];
                newLinks.push(link);
            }
            this.ndata.links = newLinks;
        }
        for (let i in this.data.nodes) {
            this.ndata.nodes.push(this.data.nodes[i]);
        }
        return;
    };

    setDuplicateLink(flag) {
        this.options.linkDuplicate = flag;
    };

    setData(pNodes, pLinks) {
        this.data.nodes = pNodes;
        this.data.links = pLinks;
        this.normalizeData(); // Creates the ndata. Normalizedd Data
        this.graph.graphData(this.ndata);
    };

    addData(pNodes, pLinks) {
        for (let i in pNodes) {
            if (!this.data.nodes.hasOwnProperty(i)) {
                this.data.nodes[i] = pNodes[i];
            }
        }
        for (let i in pLinks) {
            this.data.links.push(pLinks[i]);
        }
        this.normalizeData();
        this.graph.graphData(this.ndata);
    };

    selectNode(node) {
        this.unSelectNodes();
        this.selected.nodes.primary = node;
        if (node) {
            // select the element in the list.
            // This should be done with a callback for the select.
            if (this.options.selectCallback) {
                this.options.selectCallback(node);
            }
            this.selectRelNodes(node, "source");
            this.selectRelNodes(node, "target");
        }
        this.graph
            .nodeThreeObject(this.graph.nodeThreeObject())
            .linkWidth(this.graph.linkWidth())
            .linkDirectionalParticles(this.graph.linkDirectionalParticles());
    };

    selectNodeByID(id) {
        if (this.data.nodes.hasOwnProperty(id)) {
            let node = this.data.nodes[id]
            this.selectNode(this.data.nodes[id]);
            // Aim at node from outside it
            const distance = 300;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
            this.graph.cameraPosition(
                {x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
                node, // lookAt ({ x, y, z })
                3000  // ms transition duration.
            );
        }
    };


    unSelectNodes() {
        if (this.selected.nodes.primary) {
            let element = document.getElementById(this.selected.nodes.primary.id);
            if (element) {
                element.className = "";
            }
        }
        this.selected = {
            links: {
                target: new Set(),
                source: new Set()
            },
            nodes: {
                primary: null,
                source: {},
                target: {},
            }
        }
    };

    selectRelNodes(node, direction) {
        let bdir = "target";
        if (direction === "target") {
            bdir = "source";
        }
        // Check if I have already processed this node.
        if (this.selected.nodes.source.hasOwnProperty(node.id)) {
            return;
        }
        // Check if I have already processed this node.
        if (this.selected.nodes.target.hasOwnProperty(node.id)) {
            return;
        }
        let myNodes = [];
        for (let i in this.data.links) {
            let link = this.data.links[i];
            if (link[bdir].id === node.id) {
                this.selected.links[bdir].add(link);
                if (this.data.nodes.hasOwnProperty(link[direction].id)) {
                    let nnode = this.data.nodes[link[direction].id];
                    this.selected.nodes[bdir][nnode.id] = nnode;
                    this.selectRelNodes(nnode, direction);
                }
            }
        }
    }

    getSelectedNode() {
        return this.selected.nodes.primary;
    }

    setNode(nodeid, opts) {
        let node = this.data.nodes[nodeid];
        if (node) {
            for (let name in opts) {
                node[name] = opts[name];
            }
        }
        this.selectNode(this.data.nodes[nodeid]);
    }

    static forceOnPlane() {
        function constant(_) {
            return () => _;
        }

        function index(d) {
            return d.index;
        }

        var id = index,
            nodes = [],
            nmap = {};

        function force(alpha) {
            for (let i = 0, n = nodes.length, node, k = alpha * 0.1; i < n; ++i) {
                node = nodes[i];
                if (node.rbox) {
                    let parent = nodes[nmap[node.rbox.parent]];
                    if (parent) { // the Parent is found then go forward. If not then don't.
                        if(node.rbox.fx) {
                            node.x = parent.x + node.rbox.fx;
                            node.vx = 0;
                        } else if (node.rbox.x) {
                            if (node.rbox.x.min === node.rbox.x.max) {
                                let newx = parent.x + node.rbox.x.min;
                                node.vx = (node.x - newx) / 2 * k;
                                node.x = newx;
                            } else {
                                let newx = node.x + node.vx;
                                let min = parent.x + node.rbox.x.min;
                                let max = parent.x + node.rbox.x.max;
                                let v = node.vx;
                                if (Math.abs(node.vx) > Math.abs(max - min)) {
                                    v = (max - min) / 4;
                                }
                                if (newx < min) {
                                    node.x = min;
                                    node.vx = -v * k;
                                } else if (newx > max) {
                                    node.x = max;
                                    node.vx = -v * k;
                                }
                            }
                        }
                        if(node.rbox.fx) {
                            node.y = parent.x + node.rbox.fy;
                            node.vy = 0;
                        } else if (node.rbox.y) {
                            let newy = node.y + node.vy;
                            let min = parent.y + node.rbox.y.min;
                            let max = parent.y + node.rbox.y.max;
                            let v = node.vy;
                            if (node.rbox.y.min === node.rbox.y.max) {
                                let newy = parent.y + node.rbox.y.min;
                                node.vy = (node.y - newy) / 2;
                                node.y = newy;
                            } else {
                                if (Math.abs(node.vy) > Math.abs(max - min)) {
                                    v = (max - min) / 4;
                                }
                                if (newy < min) {
                                    node.y = min;
                                    node.vy = -v * k;
                                } else if (newy > max) {
                                    node.y = max;
                                    node.vy = -v * k;
                                }
                            }
                        }
                        if(node.rbox.fz) {
                            node.z = parent.z + node.rbox.fz;
                            node.vz = 0;
                        } else if (node.rbox.z) {
                            if (node.rbox.z.min === node.rbox.z.max) {
                                let newz = parent.z + node.rbox.z.min;
                                node.vz = (node.z - newz) / 2 * k;
                                node.z = newz;
                            } else {
                                let newz = node.z + node.vz;
                                let min = parent.z + node.rbox.z.min;
                                let max = parent.z + node.rbox.z.max;
                                let v = node.vz;
                                if (Math.abs(node.vz) > Math.abs(max - min)) {
                                    v = (max - min) / 2;
                                }
                                if (newz < min) {
                                    node.z = min;
                                    node.vz = -v * k;
                                } else if (newz > max) {
                                    node.z = max
                                    node.vz = -v * k;
                                }
                            }
                        }
                    }
                }

                if (node.bbox) {
                    if (node.bbox.x) {
                        let newx = node.x + node.vx;
                        if (newx < node.bbox.x.min) {
                            node.x = node.bbox.x.min;
                            node.vx = -node.vx * k;
                        } else if (newx > node.bbox.x.max) {
                            node.x = node.bbox.x.max;
                            node.vx = -node.vx * k;
                        }
                    }
                    if (node.bbox.y) {
                        let newy = node.y + node.vy;
                        if (newy < node.bbox.y.min) {
                            node.y = node.bbox.y.min;
                            node.vy = -node.vy * k;
                        } else if (newy > node.bbox.y.max) {
                            node.y = node.bbox.y.max;
                            node.vy = -node.vy * k;
                        }
                    }
                    if (node.bbox.z) {
                        let newz = node.z + node.vz;
                        if (newz < node.bbox.z.min) {
                            node.z = node.bbox.z.min;
                            node.vz = -node.vz * k;
                        } else if (newz > node.bbox.z.max) {
                            node.z = node.bbox.z.max;
                            node.vz = -node.vz * k;
                        }
                    }
                }
            }
        }

        function initialize() {
            if (!nodes) return;
        }

        force.initialize = function (_) {
            nodes = _;
            for (let i in nodes) {
                nmap[nodes[i].id] = i;
            }
            initialize();
        };

        force.strength = function (x) {
            if (!arguments.length) return strength;
            strength = x;
            return force;
        };

        force.id = function (_) {
            return arguments.length ? ((id = _), force) : id;
        };

        force.nodes = function (_) {
            return arguments.length ? ((nodes = _), force) : nodes;
        };

        return force;
    }

}
