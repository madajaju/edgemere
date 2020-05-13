
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
    }
}

module.exports = Metric;

