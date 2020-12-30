

const boundingBox = [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 100, z: 0},
    {x: 0, y: -100, z: 0},
    {x: 100, y: 0, z: 0},
    {x: -100, y: 0, z: 0},
    {x: 0, y: 0, z: 100},
    {x: 0, y: 0, z: -100},
    {x: 100, y: 100, z: 0},
    {x: 100, y: -100, z: 0},
    {x: 100, y: 0, z: 100},
    {x: 100, y: 0, z: -100},
    {x: 100, y: 100, z: 100},
    {x: 100, y: 100, z: -100},
    {x: 100, y: -100, z: 100},
    {x: 100, y: -100, z: -100},
    {x: -100, y: 100, z: 0},
    {x: -100, y: -100, z: 0},
    {x: -100, y: 0, z: 100},
    {x: -100, y: 0, z: -100},
    {x: -100, y: 100, z: 100},
    {x: -100, y: 100, z: -100},
    {x: -100, y: -100, z: 100},
    {x: -100, y: -100, z: -100},
]

class Graph3D {
    constructor(gdiv, data, options) {
        this.gdiv = gdiv;
        this.options = {
            width: 1000,
            height: 1000,
            background: "#555500",
            linkColor: "#000000"
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

        if(options.expandObject) {
            this.expandObject = options.expandObject;
        }
        this.data = data;
        this.normalizeData();
        this.graph = ForceGraph3D({controlType:'orbit'})
        (document.getElementById(this.gdiv))
            .width(this.options.width)
            .height(this.options.height)
            .backgroundColor(this.options.background)
            .nodeVal('size')
            .nodeRelSize(10)
            .nodeThreeObject(node => {
                let retval = null;
                let objID = "#" + node.view;
                let defaultID = "#default3D";
                let material = null;

                if (this.selected.nodes.primary === node) {
                    objID += "Selected";
                    defaultID += "Selected";
                } else if (this.selected.nodes.target.hasOwnProperty(node.id)) {
                    objID += "Targeted";
                    defaultID += "Targeted";

                } else if (this.selected.nodes.source.hasOwnProperty(node.id)) {
                    objID += "Sourced";
                    defaultID += "Sourced";
                }
                retval = document.querySelector(objID);
                if (!retval) {
                    retval = document.querySelector(defaultID);
                }
                let obj3D = retval.object3D.clone();
                return obj3D;
            })
            .linkWidth(link => {
                if (this.selected.links.target.has(link)) {
                    return 4;
                } else if (this.selected.links.source.has(link)) {
                    return 4;
                }
                return 2;
            })
            .linkDirectionalParticles(link => {
                if (this.selected.links.target.has(link)) {
                    return 4;
                } else if (this.selected.links.source.has(link)) {
                    return 4;
                }
                return 2;
            })
            .linkDirectionalParticleColor(link => {
                if (this.selected.links.target.has(link)) {
                    return "#00ff00";
                } else if (this.selected.links.source.has(link)) {
                    return "#ffff00";
                }
                return this.options.linkColor;
            })
            .linkDirectionalParticleWidth(link => {
                if (this.selected.links.target.has(link)) {
                    return 4;
                } else if (this.selected.links.source.has(link)) {
                    return 4;
                }
                return 2;
            })
            .linkColor(this.options.linkColor)
            .linkDirectionalParticleSpeed(0.006)
            .enableNodeDrag(true)
            .graphData(this.ndata)
            /*.d3Force('x', d3.forceX()
                .x(node => this.levels[node.level][node.group].x)
                .strength(1))
            .d3Force('y', d3.forceY()
                .y(node => this.levels[node.level][node.group].y)
                .strength(1))
            .d3Force('z', d3.forceZ()
                .z(node => this.levels[node.level][node.group].z)
                .strength(1))*/
            .onNodeClick(node => {
                this.selectNode(node);
            })
            .onNodeRightClick(node => {
                if(this.expandObject) {
                    this.expandObject(`${node.group}?id=${node.id}`);
                }
            });
        /*this.linkForce = this.graph
            .d3Force('collide', d3.forceCollide(this.graph.nodeRelSize() + 30))
            .d3Force('link')
            .distance(link => link.value * 10 + 1);*/
        /* for(let i in this.levels) {
            const geo = new THREE.SphereGeometry(10);
            const mat = new THREE.MeshLambertMaterial({color: 0x000000, opacity:1.0, transparent:true});
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(this.levels[i].x, this.levels[i].y,this.levels[i].z);

            this.graph.scene().add(mesh);
        }
         */
        this.graph.numDimensions(3);
        window.graph = this;
    };

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
        this.levels = {};
        let totalItems = 0;
        for (let i in this.data.nodes) {
            let level = this.data.nodes[i].level;
            let group = this.data.nodes[i].group;
            if (!this.levels.hasOwnProperty(level)) {
                this.levels[level] = {};
            }
            if(!this.levels[level].hasOwnProperty(group)) {
                this.levels[level][group] = {x: 0, y: 0, z: 0, items: 0};
            }
            this.levels[level][group].items++;
            totalItems++;
            this.data.nodes[i].size = 30;
            this.ndata.nodes.push(this.data.nodes[i]);
        }
        let multiplier = Math.floor(totalItems/30) + 1;
        let j = 0;
        for (let i in this.levels) {
            let level = this.levels[i];
            let numOfGroups = Object.keys(level).length;
            for(let k in level) {
                // Check how many groups in the level
                level[k].x = boundingBox[j].x * multiplier;
                level[k].y = (boundingBox[j].y + (100/numOfGroups) ) * multiplier;
                level[k].z = boundingBox[j].z * multiplier;
            }
            j++;
        }
        // Cleanup links to non-objects
        for (let i in this.data.links) {
            let source = this.data.links[i].source;
            let target = this.data.links[i].target;
            let found = true;
            if (typeof source === 'string' && !this.data.nodes.hasOwnProperty(source)) {
                console.error("Could not find the Source Node:", source);
                found = false;
            }
            if (typeof target === 'string' && !this.data.nodes.hasOwnProperty(target)) {
                console.error("Could not find the Target Node:", target);
                found = false;
            }
            if (found) {
                this.ndata.links.push(this.data.links[i]);
            }
        }
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
        /*
        for(let i in this.levels) {
            const geo = new THREE.SphereGeometry(10);
            const mat = new THREE.MeshLambertMaterial({color: 0x000000, opacity:1.0, transparent:true});
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(this.levels[i].x, this.levels[i].y,this.levels[i].z);

            this.graph.scene().add(mesh);
        }
         */
        this.graph.graphData(this.ndata);
    };

    selectNode(node) {
        this.unSelectNodes();
        this.selected.nodes.primary = node;
        if (node) {
            // select the element in the list.
            // This should be done with a callback for the select.
            if(this.options.selectCallback) {
                this.options.selectCallback(node.id);
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
            const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
            this.graph.cameraPosition(
                { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
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
        if (!node) {
            console.log("NODE:", node);
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
}

exports.Graph = Graph;
