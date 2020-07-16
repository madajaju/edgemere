
class Image {
    static definition = {
        name: 'Image',
        description: 'Image of the Service is a container that has all of the context to run a service',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the image'
            },
            file: {
                type: 'string',
                description: 'Physical file location of the image'
            },
            version: {
                type: 'string',
                description: 'Version of the image',
            }
        },
        associations: {
            cloud: {
                type: 'Cloud',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
        view: {
            color: "#aaffaa",
            object2d: (options) => {
                // Triangle
                let material = { color: "#aaffaa", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<rect width="15" height="15" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#aaffaa; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="Image3D${i}">` +
                        `<a-box width="15" height="15" depth="1" material='${materials[i]}' ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }

    }
}

module.exports = Image;

