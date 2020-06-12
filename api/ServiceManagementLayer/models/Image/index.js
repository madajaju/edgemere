
class Image {
    static definition = {
        name: 'Image',
        description: 'Image of the Service is a container that has all of the context to run a service',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the image'
            },
            file: {
                type: 'string',
                description: 'Physical file location of the image'
            },
            version: {
                type: 'string',
                description: 'Version of the image',
            }
        },
        associations: {
            cloud: {
                type: 'Cloud',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
    }
}

module.exports = Image;

