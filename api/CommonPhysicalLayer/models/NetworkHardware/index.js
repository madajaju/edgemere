
class NetworkHardware {
    static definition = {
        name: 'NetworkHardware',
        description: 'This represents network hardware',
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
                return `<polygon points="-2,0 -2,5 -10,5 -10,10 -2,10 -2,15 2,15 2,-5 10,-5 10,-10 2,-10 2,-15 -2,-15 -2,0" `+
                     ` style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="NetworkHardware3D${i}">` +
                        `<a-cylinder height="24" radius="2" material="${materials[i]}" ></a-cyu>` +
                        `<a-cylinder height="10" radius="2" position="0 -6 5" rotation="90 0 0" material="${materials[i]}" ></a-cyu>` +
                        `<a-cylinder height="10" radius="2" position="0 -10 -12" rotation="0 0 0" material="${materials[i]}" ></a-cyu>` +
                        `<a-cylinder height="20" radius="2" position="0 5 6" rotation="0 0 90" material="${materials[i]}" ></a-cyu>` +
                        `</a-entity>`;
                }
                return retval;

            }
        }
    }
}

module.exports = NetworkHardware;

