// import * as d3 from "../d3.min.js";

let selectedNodes = {};
let selectedLinks = {};
let nodes = null;
let links = null;
let svg = null;
let simulation = null;
let levels = {};
/*let levels = {
  'Application': {
    'order': 1,
    groups: {
      "Workload": {'order': 1},
      "WorkloadInstance": {'order': 2},
      "Application": {'order': 3},
      "ApplicationInstance": {'order': 4},
    }
  },
  'Information': {
    'order': 2,
    groups: {
      "DataBluePrint": {'order': 1},
      "DataAdaptor": {'order': 2},
      "DataFlow": {'order': 1},
      "Data": {'order': 1},
      "DataInstance": {'order': 1},
      "DataReference": {'order': 1},
      "DataSource": {'order': 1},
      "LineageMetaData": {'order': 1},
      "MetaData": {'order': 1},
      "SourceMetaData": {'order': 3},
    }
  },
  'Service': {
    'order': 3,
    groups: {
      "Environment": {'order': 1},
      "Image": {'order': 1},
      "Landscape": {'order': 2},
      "LandscapeRequest": {'order': 1},
      "Service": {'order': 4},
      "ServiceInstance": {'order': 5},
      "Servicelet": {'order': 3},
      "Stack": {'order': 1},
      "StackInstance": {'order': 2},
      "Stacklet": {'order': 2},
    }
  },
  'SDI': {
    'order': 4,
    groups: {
      "Cloud": {'order': 1},
      "ResourceCompute": {'order': 2},
      "ResourceStorage": {'order': 3},
      "ResourceNetwork": {'order': 4},
    }
  },
  'Security': {
    'order': 5,
  },
  'Physical': {
    'order': 6,
    groups: {
      "AggregatedDevice": {'order': 5},
      "HardwareCompute": {'order': 1},
      "HardwareStorage": {'order': 2},
      "HardwareNetwork": {'order': 3},
      "Device": {'order': 4},
      "DataCenter": {'order': 6},
    }
  },
  'Unknown': {'order': 7}
};*/

class Graph {
  constructor(gdiv, options) {
    this.gdiv = gdiv;
    if (options) {
      this.options = options;
      if (options.hasOwnProperty('levels')) {
        levels = options.levels;
      }
    }
    this.svg = d3.select("svg");
    svg = this.svg;
    this.width = +this.svg.attr("width");
    this.height = +this.svg.attr("height");
    this.nodes = [];
    this.links = []
    window.graph = this;
  };

  selectNode(id) {
    unSelectNodes("gray", 1);
    let node = null;
    let item = nodes.filter(function (n) {
      if (n.id == id) {
        node = n;
        return n.id === id;
      }
    });
    selectRelNodes(node.index, "source", "yellow", 2);
    selectedNodes[node.index] = 0;
    selectRelNodes(node.index, "target", "red", 2);
    item.style("stroke-width", 3);
    item.style("stroke", "orange");
  };

  simulate(data) {
    this.data = data;
    this.nodes = [];
    this.links = data.links;
    for (let key in this.data.nodes) {
      let node = this.data.nodes[key];
      if (!node.hasOwnProperty('level')) {
        node.level = 'Unknown';
      }
      if (!node.hasOwnProperty('group')) {
        node.group = 'Unknown';
      }
      if (!levels.hasOwnProperty(node.level)) {
        levels[node.level] = {number: 0};
      }
      if (levels[node.level].hasOwnProperty('groups')) {
        if (!levels[node.level].groups.hasOwnProperty(node.group)) {
          levels[node.level].groups[node.group] = {order: 0};
        }
        if (!levels[node.level].hasOwnProperty('groups')) {
          levels[node.level].groups = {};
        }
        levels[node.level].groups[node.group] = {number: 1};
      }
      levels[node.level].number++;
      this.nodes.push(node);
    }
    let numberOfLevels = Object.keys(levels).length;
    // Draw the levels.
    let yoffset = 0;
    let myLevels = levels;
    let sortedLevels = Object.keys(levels).sort(function (a, b) {
      return myLevels[a].order - myLevels[b].order;
    });
    for (let i in sortedLevels) {
      let level = levels[sortedLevels[i]];
      this.svg.append('rect')
        .attr('class', 'level' + sortedLevels[i])
        .attr('x', 0)
        .attr('y', yoffset)
        .attr('width', this.width)
        .attr('height', this.height / numberOfLevels);
      levels[sortedLevels[i]].x = 0;
      levels[sortedLevels[i]].y = yoffset;
      levels[sortedLevels[i]].width = this.width;
      levels[sortedLevels[i]].height = this.height / numberOfLevels;
      if (levels[sortedLevels[i]].hasOwnProperty('groups')) {
        let numberOfGroups = Object.keys(level.groups).length;
        let y2offset = yoffset;
        let gheight = levels[sortedLevels[i]].height / numberOfGroups;
        let sortedGroups = Object.keys(level.groups).sort(function (a, b) {
          // Check the order from the levels options.
          return levels[sortedLevels[i]].groups[a].order - levels[sortedLevels[i]].groups[b].order;
        });
        console.log(sortedGroups);
        for (let j in sortedGroups) {
          levels[sortedLevels[i]].groups[sortedGroups[j]].x = 0;
          levels[sortedLevels[i]].groups[sortedGroups[j]].y = y2offset;
          levels[sortedLevels[i]].groups[sortedGroups[j]].width = this.width;
          levels[sortedLevels[i]].groups[sortedGroups[j]].height = gheight;
          y2offset += gheight;
        }
      }
      yoffset += this.height / numberOfLevels;
    }

    simulation = d3.forceSimulation().nodes(this.nodes);
    this.link_force = d3.forceLink(this.links)
      .id(function (d) {
        return d.id;
      });

    simulation
      .force("links", this.link_force)
      .force('y', d3.forceY().y(function (d) {
        //  heck if there is a group in level and calculate the y based on it.
        let level = levels[d.level];
        let yoffset = level.y;
        let newLevel = yoffset + levels[d.level].height / 2;
        if (level.hasOwnProperty('groups')) {
          if (level.groups.hasOwnProperty(d.group)) {
            newLevel = level.groups[d.group].y + level.groups[d.group].height / 2;
          }
        }
        return newLevel;
      }))
      .force('x', d3.forceX().x(function (d) {
        let level = levels[d.level];
        let nl = level.x + level.width / 2;
        if (level.hasOwnProperty('groups')) {
          if (level.groups.hasOwnProperty(d.group)) {
            nl = level.groups[d.group].x + level.groups[d.group].width / 2;
          }
        }
        return nl;
      }))
      .force("charge_force", d3.forceManyBody())
      .force('collision', d3.forceCollide().radius(function (d) {
        return 15;
      }));

    links = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(this.links)
      .enter().append("line")
      .attr("stoke-width", 2);

    nodes = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll("path")
      .data(this.nodes)
      .enter()
      .append("path")
      .attr("class", function (d) {
        return "nodes type" + d.group;
      })
      .attr("d", "M 1 1 H 9 V 9 H -9 L 1 1")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("mouseover", function (d) {
        let element = document.getElementById(d.id);
        if (element) {
          element.className = "Selected";
        }
        selectRelNodes(d.index, "source", "yellow", 2);
        selectedNodes[d.index] = 0;
        selectRelNodes(d.index, "target", "red", 2);
        d3.select(this).style("stroke-width", 3);
        d3.select(this).style("stroke", "orange");
      })
      .on("mouseout", function (d) {
        unSelectNodes("gray", 1);
        let element = document.getElementById(d.id);
        if (element) {
          element.className = "";
        }
      });

    nodes.append("text")
      .text(function (d) {
        return d.name;
      })
      .attr('x', 6)
      .attr('y', 3);

    nodes.append("title")
      .text(function (d) {
        return d.name;
      });
    simulation.on("tick", tickActions);

  }

  addNodes(pNodes, pLinks) {
    for(let i in pNodes) {
      nodes.push(pNodes[i]);
    }
    for(let i in pLinks) {
      links.push(pLinks[i]);
    }
    restart();
  }
}

function restart() {
  simulation.restart();
}
function tickActions() {
  links
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });
  nodes
    .attr("transform", function (d) {
      let minx = levels[d.level].x;
      let maxx = minx + levels[d.level].width;
      let miny = levels[d.level].y;
      let maxy = miny + levels[d.level].height;
      if (levels[d.level].hasOwnProperty('groups')) {
        minx = levels[d.level].groups[d.group].x;
        maxx = minx + levels[d.level].groups[d.group].width;
        miny = levels[d.level].groups[d.group].y;
        maxy = miny + levels[d.level].groups[d.group].height;
      }

      d.x = Math.max(minx + 10, Math.min(maxx - 10, d.x));
      d.y = Math.max(miny + 10, Math.min(maxy - 10, d.y));
      return "translate(" + d.x + "," + d.y + ")";
    });
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function unSelectNodes(color, width) {
  let myLinks = links.filter(function (link) {
    return selectedLinks.hasOwnProperty(link.index);
  });
  myLinks.style("stroke", color);
  myLinks.style("stroke-width", width);
  let myNodes = nodes.filter(function (node) {
    return selectedNodes.hasOwnProperty(node.index);
  });
  myNodes.style("stroke", color);
  myNodes.style("stroke-width", width);
  selectedNodes = {};
  selectedLinks = {};
}

function selectRelNodes(id, direction, color, width) {
  let bdir = "target";
  if (direction === "target") {
    bdir = "source";
  }
  if (selectedNodes.hasOwnProperty(id)) {
    if (selectedNodes[id] > 0) {
      return;
    }
  }
  let myNodes = [];
  let myLinks = links.filter(function (link) {
    if (link[bdir].index === id) {
      selectedLinks[link.index] = 1;
      let cnode = nodes.filter(function (n) {
        return n.index === link[direction].index;
      });
      cnode.style("stroke", color);
      cnode.style("stroke-width", width);
      myNodes.push(link[direction].index);
    }
    return link[bdir].index === id;
  });
  myLinks.style("stroke", color);
  myLinks.style("stroke-width", width);

  // Prevent going over nodes more than once.
  selectedNodes[id] = 1;
  for (let i in myNodes) {
    selectRelNodes(myNodes[i], direction, color, width);
  }
}

exports.Graph=Graph;
