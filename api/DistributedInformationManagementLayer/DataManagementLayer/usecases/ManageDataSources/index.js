module.exports = {
    name: 'Manage Data Sources',
    description: 'Manage Data Sources allows the Data Engineer to register data sources to the system.',
    method: 'datasource/list',
    actors: {
        'Data Engineer': 'uses'
    },
    extends: [ "Provide Business Information"]
};

