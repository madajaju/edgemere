const THREE = require('three');

class StorageResource {
    static definition = {
        name: 'StorageResource',
        description: 'Logical Resource of Network that are provisioned',
        extends: 'Resource',
        attributes: {},
        associations: {},
        view: {
            color: "#ffffaa",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffffaa", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<circle cx="20" cy="16" r=5 style="fill:#dddddd;stroke:#888888;stroke-width:1" />` +
                    `<rect width="20" height="20" style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<ellipse cx="10" cy="0" rx="10" ry="5" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#ffffcc; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="StorageResource3D${i}">` +
                        `<a-cylinder height="10" radius="10" material="${materials[i]}" ></a-cyu>` +
                        `<a-sphere radius="6" position="0 0 10" material="color:white; transparent:true;opacity:0.60" ></a-sphere>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
};
module.exports = StorageResource;
