
class StorageHardware {
    static definition = {
        name: 'StorageHardware',
        description: 'This represents storage hardware in the common layer',
        extends: 'Hardware',
        attributes: {
        },
        view: {
            color: "#cccccc",
            object2d: (options) => {
                // Triangle
                let material = { color: "#cccccc", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<rect width="20" height="20" style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<ellipse cx="10" cy="0" rx="10" ry="5" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="StorageHardware3D${i}">` +
                        `<a-cylinder height="10" radius="10" material="${materials[i]}" ></a-cyu>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }

    }
}

module.exports = StorageHardware;

