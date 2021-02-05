module.exports = {
    name: 'Capture Meta Data',
    description: 'Capture Meta Data is the description',
    method: "data/create",
    actors: {
        'Actor': 'uses',
    },
    steps: [
        {
            action: 'dataadaptor/create',
            parameters: {name: 'filesystem', file: './templates/dataadaptor-filesystem.yaml'}
        },
        {
            action: 'dataflow/create',
            parameters: {name: 'filesystembasic', file: './templates/dataflow-filesystembasic.yaml'}
        },
        {
            action: 'datablueprint/create',
            parameters: {name: 'filesystemBluePrint1', file: './templates/datablueprint-filesystem.yaml'}
        },
        {action: 'datasource/create', parameters: {name: 'myFileSystem1', file: './templates/datasource.yaml'}},
        {action: 'datasource/create', parameters: {name: 'myFileSystem2', file: './templates/datasource.yaml'}},
        {
            action: 'diml/ddf/datablueprint/deploy',
            parameters: {name: 'myBP1', blueprint: 'filesystemBluePrint1', sources: "mySource=myFileSystem1"}
        },
        {
            action: 'diml/ddf/datasource/simulate',
            parameters: {name: 'myFileSystem1', file: './templates/datasource-simulation.yaml'}
        },
        {action: 'diml/find', parameters: {query: "owner:darren"}}
    ]
};

