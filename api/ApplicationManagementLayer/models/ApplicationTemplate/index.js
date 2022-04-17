
class ApplicationTemplate {
    static definition = {
        name: 'ApplicationTemplate',
        description: 'An ApplicationTemplate provides a template to create applications based on parameters passed' +
            ' into the template when it is being used to create an application.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Application Template',
            },
            args: {
                type: 'json',
                description: 'Name value pairs used for the creation of applications from the template.'
            }
        },
        associations: {
            app: {
                type: 'Application',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
        },
    }
}

module.exports = ApplicationTemplate;

