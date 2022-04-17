class Application {
    static definition = {
        name: 'Application',
        description: 'Application contains several SABRs stitched together to create capabilities',
        unique: (obj) => {
            return obj.name;
        },
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Application'
            },
            version: {
                type: 'string',
                description: 'Version of the Application'
            },
            fn: {
                type: 'ref',
                description: 'Function to call with the bundle instance when the bundle instance is run.',
            }
        },
        associations: {
            workloads: {
                type: 'Workload',
                cardinality: 'n',
                composition: false,
                owner: false,
                via: 'app'
            },
            stacks: {
                type: 'Stack',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'app'
            },
            data: {
                type: 'DataReference',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            instances: {
                type: 'ApplicationInstance',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'app'
            },
        },
        view: {
            color: "#00aaff",
            object2d: (options) => {
                // Triangle
                let material = {color: "#00aaff", border: "#000000"};
                if (options) {
                    material = options;
                }
                return `<rect width="10" height="10"style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {

                let materials = {
                    '': `color:#00aaff; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for (let i in materials) {
                    retval += `<a-entity id="Application3D${i}">` +
                        `<a-box width="20" height="20" depth="20" material="${materials[i]}" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Application;

