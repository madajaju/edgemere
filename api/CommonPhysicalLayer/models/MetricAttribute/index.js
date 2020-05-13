
class MetricAttribute {
    static definition = {
        name: 'MetricAttribute',
        description: 'Attribute type of Metric. This is for metrics that are descriptiive not consumable',
        extends: 'Metric',
        attributes: {
        },
    }
}

module.exports = MetricAttribute;

