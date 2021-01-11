
class Agent {
    static definition = {
        name: 'Agent',
        description: 'This is the Device Agent that the Device Manager connects to',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the device Agent'
            },
            url: {
                type: 'string',
                description: 'URL of the Device Agent'
            }
        },
        associations: {
        },
    }
}

module.exports = Agent;

