module.exports = {
    name: 'Deregister Data Source',
    description: 'Deregister Data Source allows the data engineer to remove a data source ' +
        'from the system. All BluePrints and DataFlows will no longer process data generated ' +
        'from the source. All data that has been registered to the Meta-data management system ' +
        'will be marked as unavailable, but the meta-data will continue to reside in the system.',
    method: "datasource/list",
    actors: {
        'Data Engineer': 'uses',
    },
    steps: [
        { action: 'dataadaptor/create', parameters: { name: 'filesystem1',  file: './templates/dataadaptor-filesystem.yaml'}},
        { action: 'datasource/create', parameters: { name: 'myDataVolume1', adaptor: 'filesystem1', file: './templates/datasource.yaml'}},
    ]
};

