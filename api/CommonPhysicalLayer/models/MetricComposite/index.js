
class MetricComposite {
    static definition = {
        name: 'MetricComposite',
        description: 'Composite type of Metric. This is for metrics that are a group of metrics',
        extends: 'Metric',
        attributes: {
        },
        associations: {
            values: {
                type: 'Metric',
                cardinality: 'n',
                composition: true,
                unique: true,
                owner: true,
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
                return `<rect width="8", height="15" style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<rect x="-5" y="-5" width="8", height="15" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="MetricComposite3D${i}">` +
                        `<a-box width="8" height="15" depth="2" material="${materials[i]}" ></a-box>` +
                        `<a-box width="8" height="15" depth="2" position="5 5 5" material="${materials[i]}" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = MetricComposite;

