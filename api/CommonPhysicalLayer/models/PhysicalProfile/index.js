
class PhysicalProfile {
    static definition = {
        name: 'PhysicalProfile',
        description: 'The Physical Profile contains the capabilities, availability, reserves and' +
            'metrics of the element in the physical domain',
        attributes: {
            name: {
                type: 'string',
                description: 'This is the name of the Physical Profile',
            },
        },
        associations: {
            capabilities: {
                type: 'MetricComposite',
                description: 'Capabilities of the element',
                owner: true,
                cardinality: 1
            },
            available: {
                type: 'MetricComposite',
                cardinality: 1,
                owner: true,
                description: 'Availability of the element'
            },
            reserved: {
                type: 'MetricComposite',
                cardinality: 1,
                owner: true,
                description: 'Reservations of the element'
            },
            metrics: {
                type: 'MetricComposite',
                cardinality: 1,
                owner: true,
                description: 'Metrics of the element'
            },
            parent: {
                type: 'PhysicalProfile',
                cardinality: 1,
                owner: false,
                description: 'Parent of the profile for propagation'
            }
        }
    }
}

module.exports = PhysicalProfile;

