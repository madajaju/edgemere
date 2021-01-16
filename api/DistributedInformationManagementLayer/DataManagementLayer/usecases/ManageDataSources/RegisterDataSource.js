module.exports = {
    name: 'Register Data Source',
    description: 'Register Data Source to the system. This allows for data sources to' +
        ' be monitored. Data generated at the data source can now be processed by DataBluePrints.',
    method: "datasource/list",
    actors: {
        'DataEngineer': 'uses',
    },
    steps: [
        { action: 'dataadaptor/create', parameters: { name: 'filesystem1',  file: './templates/dataadaptor-filesystem.yaml'}},
        { action: 'datasource/create', parameters: { name: 'myDataVolume1', adaptor: 'filesystem1', file: './templates/datasource.yaml'}},
        { action: 'datasource/create', parameters: { name: 'myDataVolume2', adaptor: 'filesystem1', parameters: "host=localhost, filesystem=/tmp/user2"}},
        { action: 'datasource/create', parameters: { name: 'myDataVolume3', adaptor: 'filesystem1', parameters: "host=localhost, filesystem=/tmp/user3"}},
        { action: 'datasource/create', parameters: { name: 'myDataVolume4', adaptor: 'filesystem1', parameters: "host=localhost, filesystem=/tmp/user4"}}
]
};

