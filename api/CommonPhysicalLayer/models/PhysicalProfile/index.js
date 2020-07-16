
class PhysicalProfile {
    static definition = {
        name: 'PhysicalProfile',
        description: 'The Physical Profile contains the capabilities, availability, reserves and' +
            'metrics of the element in the physical domain',
        attributes: {
            name: {
                type: 'string',
                description: 'This is the name of the Physical Profile',
            },
        },
        associations: {
            capabilities: {
                type: 'MetricComposite',
                description: 'Capabilities of the element',
                owner: true,
                cardinality: 1
            },
            available: {
                type: 'MetricComposite',
                cardinality: 1,
                owner: true,
                description: 'Availability of the element'
            },
            reserved: {
                type: 'MetricComposite',
                cardinality: 1,
                owner: true,
                description: 'Reservations of the element'
            },
            metrics: {
                type: 'MetricComposite',
                cardinality: 1,
                owner: true,
                description: 'Metrics of the element'
            },
            parent: {
                type: 'PhysicalProfile',
                cardinality: 1,
                owner: false,
                description: 'Parent of the profile for propagation'
            }
        },
        view: {
            color: "#cccccc",
            object2d: (options) => {
                // Triangle
                let material = { color: "#cccccc", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<rect width="10", height="20" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#cccccc; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="PhysicalProfile3D${i}">` +
                        `<a-box width="10" height="20" depth="2" material="${materials[i]}" ></a-cyu>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }

    }
}

module.exports = PhysicalProfile;

