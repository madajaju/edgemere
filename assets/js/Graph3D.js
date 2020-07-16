
class Graph3D {
    constructor(gdiv, data, options) {
        this.gdiv = gdiv;
        this.options = {
            width: 1000,
            height:1000,
            background:"#555500",
            linkColor:"#000000"
        }
        for(let i in options) {
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
        this.data = data;
        this.normalizeData();
        this.graph = ForceGraph3D()
        (document.getElementById(this.gdiv))
            .width(this.options.width)
            .height(this.options.height)
            .backgroundColor(this.options.background)
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
                if(!retval) {
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
                    return "#ff0000";
                } else if (this.selected.links.source.has(link)) {
                    return "#00ff00";
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
            .graphData(this.ndata)
            .onNodeHover(node => {
                this.selectNode(node);
            })
            .onNodeClick(node => {
                loadObjectChildren(this, node.group, node.id);
            });
        this.linkForce = this.graph
            .d3Force('link')
            .distance(link => link.value * 10 + 1);

        window.graph = this;
    }
    ;

    normalizeData() {
        this.ndata = {
            links: [],
            nodes: []
        };
        for (let i in this.data.nodes) {
            this.ndata.nodes.push(this.data.nodes[i]);
        }
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
    }
    ;

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
    }
    ;

    selectNode(node) {
        this.unSelectNodes();
        this.selected.nodes.primary = node;
        if (node) {
            let element = document.getElementById(node.id);
            if (element) {
                element.className = "Selected";
            }
            this.selectRelNodes(node, "source");
            this.selectRelNodes(node, "target");
        }
        this.graph
            .nodeThreeObject(this.graph.nodeThreeObject())
            .linkWidth(this.graph.linkWidth())
            .linkDirectionalParticles(this.graph.linkDirectionalParticles());
    }
    ;

    selectNodeByID(id) {
        if (this.data.nodes.hasOwnProperty(id)) {
            this.selectNode(this.data.nodes[id]);
        }
    }
    ;

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
    }
    ;

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

function loadObjectChildren(graph, cls, objid) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let dobj = JSON.parse(this.responseText).obj;
            let oid = dobj._attributes.id;
            let mnodes = {};
            let mlinks = [];
            for (let aname in dobj.definition.associations) {
                if (dobj._associations[aname]) {
                    let linkValue = 10;
                    if (dobj.definition.associations[aname].owner) {
                        linkValue = 5;
                    }
                    if (dobj.definition.associations[aname].composition) {
                        linkValue = 1;
                    }
                    if (dobj.definition.associations[aname].cardinality === 1) {
                        let otype = dobj._associations[aname].definition.name;
                        checkObject3D(dobj._associations[aname].definition);
                        let aobj = dobj._associations[aname];
                        let aoid = dobj._associations[aname]._attributes.id;
                        mnodes[aoid] = {
                            id: aoid,
                            name: aobj._attributes.name,
                            group: otype,
                            level: aobj.definition.package.name.replace(/\s/g, ''),
                            view: otype + '3D'
                        };
                        mlinks.push({source: oid, target: aoid, value: linkValue});
                    } else {
                        for (let j in dobj._associations[aname]) {
                            let otype = dobj.definition.associations[aname].type;
                            checkObject3D(dobj.definition.associations[aname].definition);
                            let aoid = '';
                            let aobj = dobj._associations[aname][j];
                            aoid = dobj._associations[aname][j]._attributes.id;
                            otype = dobj._associations[aname][j].definition.name;
                            mnodes[aoid] = {
                                id: aoid,
                                name: aobj._attributes.name,
                                group: otype,
                                level: aobj.definition.package.name.replace(/\s/g, ''),
                                view: otype + '3D'
                            };
                            mlinks.push({source: oid, target: aoid, value: linkValue});
                        }
                    }
                }
            }
            graph.addData(mnodes, mlinks);
        }
    };
    xhttp.open("GET", `/${cls}?mode=json&id=${objid}`, true);
    xhttp.send();
}

function checkObject3D(model) {
    let object3D = document.querySelector(`#${model.name}3D`);
    if(!object3D) {
        let garden = document.querySelector("#ObjectGarden");
        garden.innerHTML += model.view.object3d;
    }
}

exports.Graph = Graph;
