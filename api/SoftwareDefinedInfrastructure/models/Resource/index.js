
class Resource {
    static definition = {
        name: 'Resource',
        description: 'Resource in the cloud. Can be network, storage or compute.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the resource'
            },
            ename: {
                type: 'string',
                description: 'Extended name of the resource'
            },
            disabled: {
                type: 'boolean',
                description: 'Disabled Resource'
            },
            type: {
                type: 'string',
                description: 'Type of resource, Network, Storage, Compute or Accelerator'
            },
        },
        associations: {
            request: {
                type: 'Request',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            profile: {
                type: 'PhysicalProfile',
                cardinality: '1',
                composition: true,
                owner: true,
            },
            hardware: {
                type: 'Hardware',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            instances: {
                type: 'ServiceInstance',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            cloud: {
                type: 'Cloud',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
        statenet: {
            Init: {
                events: {
                    provision: {
                        Provisioning: {}
                    },
                    disable: {
                        Disabled: {}
                    }
                }
            },
            Provisioning: {
                events: {
                    finishedProvision: {
                        Ready: {}
                    },
                    failedProvision: {
                        Failed: {}
                    }
                }
            },
            Failed: {
            },
            Ready: {
                events: {
                    disable: {
                        Disabled: {}
                    },
                }
            },
            Disabled: {
            }
        },
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
                    retval += `<a-entity id="Resource3D${i}">` +
                        `<a-sphere radius="10" material="${materials[i]}" ></a-sphere>` +
                        `<a-sphere radius="6" position="0 0 10" material="color:white; transparent:true;opacity:0.60" ></a-sphere>` +
                        `</a-entity>`;
                }
                return retval;
                return "";
            }
        }
    }
}
module.exports = Resource;

