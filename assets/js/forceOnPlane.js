
export function forceOnPlane() {
    // d3 style
    function constant(_) {
        return () => _;
    }

    function index(d) {
        return d.index;
    }

    var id = index,
        nodes = [];

    function force(alpha) {
        for (let i = 0, n = nodes.length, node, k = alpha * strength; i < n; ++i) {
            node = nodes[i];
            console.log("Node:", node);
            node.vx += (foci[groupBy(node)].x - node.x) * k;
            node.vy += (foci[groupBy(node)].y - node.y) * k;
            node.vz += (foci[groupBy(node)].z - node.z) * k;
        }
    }

    function initialize() {
        if (!nodes) return;
        console.log("Initialized");
    }

    force.initialize = function(_) {
        nodes = _;
        initialize();
    };

    force.strength = function(x) {
        if (!arguments.length) return strength;
        strength = x;
        return force;
    };

    force.id = function(_) {
        return arguments.length ? ((id = _), force) : id;
    };

    force.size = function(_) {
        return arguments.length ? ((size = _), force) : size;
    };

    force.nodes = function(_) {
        return arguments.length ? ((nodes = _), force) : nodes;
    };

    force.links = function(_) {
        if (!arguments.length) return links;
        if (_ === null) links = [];
        else links = _;
        initialize();
        return force;
    };

    return force;
}

// exports.forceInACube = forceInACube;
