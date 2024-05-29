
class AIModel {
    static definition = {
        name: 'AIModel',
        description: 'The AIModel is a class within the ams package that provides methods for creating, updating, removing, and adding to AI models, with a specific attribute "attr1" of string type.',
        unique: false,

        
        attributes: {
    "attr1": {
        "type": "string",
        "description": "description long description"
    }
},
        
        associations: {},
        
        statenet: undefined,
       

    }
}
module.exports = AIModel;
