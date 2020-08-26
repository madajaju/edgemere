let nodes = null;
let links = null;
let simulation = null;
let levels = {};

let material = {
    selected: "#ffff00",
    target: "#00ff00",
    source: "#ff0000",
}

class Graph2D {
    constructor(gdiv, data, options) {
        this.gdiv = gdiv;
        if (options) {
            this.options = options;
            if (options.hasOwnProperty('levels')) {
                levels = options.levels;
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
        this.data = data;
        this.normalizeData();
        this.svg = d3.select("svg");
        let width = +this.svg.attr("width");
        let height = +this.svg.attr("height");

        let linkForce = d3.forceLink(this.ndata.links)
            .id((d) => {
                return d.id;
            });

        this.graph = d3.forceSimulation()
            .nodes(this.ndata.nodes)
            .force("links", linkForce)
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width/2, height/2))
            .force('collision', d3.forceCollide().radius(function (node) {
                return 40;
            }))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .on("tick", () => {
                links
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);
                nodes
                    .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")";} );
            });

        // add the links and the arrows

        links = this.svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.ndata.links)
            .enter().append("line")
            .attr("stroke-width", (d) => { return d.value; })
            .attr("stroke", "black")
            .attr("class", "link");

        nodes = this.svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(this.ndata.nodes)
            .enter().append("g")
            .attr("class", (node) => {
                return node.group;
            })
            .on("mouseover", (node) => {
                // highlight
                this.selectNode(node);
            })
            .on("mouseout", node => {
                // unhighlight
                this.unSelectNodes();
            })
            .on("click", node => {
                loadObjectChildren(this, node.group, node.id);
            });

        for (let i in this.data.nodes) {
            let node = this.data.nodes[i];
            let htmlText = '<circle cx=0 cy=0 r=10 fill="gray" stroke="black" />';
            if(node.hasOwnProperty('view')) {
                htmlText = node.view;
            }
            d3.selectAll(`.${node.group}`).html(htmlText);
        }
        nodes.append("title")
            .text(function (d) {
                return d.name;
            });
        window.graph = this;
    };

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
            let element = document.getElementById(node.id);
            if (element) {
                element.className = "Selected";
            }
            this.selectRelNodes(node, "source");
            this.selectRelNodes(node, "target");
        }
        d3.select(node)
            .select("path")
            .attr("d", (node) => {
                return node.view.object2d;
            })
            .style("fill", (node) => {
                return material.selected;
            });
    };

    selectNodeByID(id) {
        if (this.data.nodes.hasOwnProperty(id)) {
            this.selectNode(this.data.nodes[id]);
        }
    };

    unSelectNodes() {
        if (this.selected.nodes.primary) {
            let element = document.getElementById(this.selected.nodes.primary.id);
            if (element) {
                element.className = "";
            }
            /*
            d3.select(this.selected.nodes.primary)
                .select("path")
                .attr("d", (node) => {
                    return node.view.object2d;
                })
                .style("fill", (node) => {
                    return node.view.color;

                });
             */
        }
        for (let i in this.selected.nodes.source) {
            let mnode = this.selected.nodes.source[i];
            /*
            d3.select(mnode)
                .select("path")
                .attr("d", (node) => {
                    return node.view.object2d;
                })
                .style("fill", (node) => {
                    return node.view.color;
                });

             */
        }
        for (let i in this.selected.nodes.target) {
            let mnode = this.selected.nodes.target[i];
            /*
            d3.select(mnode)
                .select("path")
                .attr("d", (node) => {
                    return node.view.object2d;
                })
                .style("fill", (node) => {
                    return node.view.color;
                });

             */
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
                    d3.select(nnode)
                        .select("path")
                        .attr("d", (node) => {
                            return node.view.object2d;
                        })
                        .style("fill", (node) => {
                            return material[bdir];
                        });
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
                        let aobj = dobj._associations[aname];
                        let aoid = dobj._associations[aname]._attributes.id;
                        mnodes[aoid] = {
                            id: aoid,
                            name: aobj._attributes.name,
                            group: otype,
                            level: aobj.definition.package.name.replace(/\s/g, '')
                        };
                        mlinks.push({source: oid, target: aoid, value: linkValue});
                    } else {
                        for (let j in dobj._associations[aname]) {
                            let otype = dobj.definition.associations[aname].type;
                            let aoid = '';
                            let aobj = dobj._associations[aname][j];
                            aoid = dobj._associations[aname][j]._attributes.id;
                            otype = dobj._associations[aname][j].definition.name;
                            mnodes[aoid] = {
                                id: aoid,
                                name: aobj._attributes.name,
                                group: otype,
                                level: aobj.definition.package.name.replace(/\s/g, '')
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

exports.Graph = Graph;
