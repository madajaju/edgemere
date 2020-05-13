
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
        }
    }
}

module.exports = MetricComposite;

