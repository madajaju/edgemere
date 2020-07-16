
class ComputeResource {
    static definition = {
        name: 'ComputeResource',
        description: 'Logical Resource of Compute CPUs that are provisioned',
        extends: 'Resource',
        view: {
            color: "#ffffaa",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffffaa", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<circle cx="8" cy="8" r=5 style="fill:#dddddd;stroke:#888888;stroke-width:1" />` +
                    `<circle cx="0" cy="0" r=10 style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#ffffaa; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="ComputeResource3D${i}">` +
                        `<a-sphere radius="10" material="${materials[i]}" ></a-sphere>` +
                        `<a-sphere radius="6" position="0 0 10" material="color:white; transparent:true;opacity:0.60" ></a-sphere>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}
module.exports = ComputeResource;
