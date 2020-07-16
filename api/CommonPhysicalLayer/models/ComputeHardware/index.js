
class ComputeHardware {
    static definition = {
        name: 'ComputeHardware',
        description: 'This represents compute/CPU hardware',
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
                return `<circle cx="0" cy="0" r=10 style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="ComputeHardware3D${i}">` +
                        `<a-sphere radius="10" material="${materials[i]}" ></a-sphere>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }

    }
}

module.exports = ComputeHardware;

