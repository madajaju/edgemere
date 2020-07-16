
class Metric {
    static definition = {
        name: 'Metric',
        description: 'Metric stores information about the physical profile. ',
        attributes: {
            name: {
                type: 'string',
                description: 'This is the name of the metric',
            },
            value: {
                type: 'string',
                description: 'This is the value of the metric',
            },

        },
        view: {
            color: "#cccccc",
            object2d: (options) => {
                // Triangle
                let material = { color: "#cccccc", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<rect width="8", height="15" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="Metric3D${i}">` +
                        `<a-box width="8" height="15" depth="2" material="${materials[i]}" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Metric;

