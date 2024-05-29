module.exports = {
    "name": "Create AI Model",
    "description": "In this scenario, an application developer or data scientist is using the \"Create AI Model\" utility to successfully create an AI model named 'name1' by invoking the 'aimodel/create' method.",
    "method": "aimodel/create",
    "actors": {"Application Developer": "uses", "Data Scientist": "uses"},
    "steps": [{
        "action": "/edgemere/aml/aimodel/create",
        "parameters": {},
        "description": "The application developer or data scientist invokes the create method to start the process of creating a new AI model named 'name1'. This is done without any parameters."
    }, {
        "action": "/edgemere/aml/aimodel/scan",
        "parameters": {"appName": "name1"},
        "description": "The newly created AI model 'name1' is scanned for potential malware or viruses. This is aimed at ensuring the safety and integrity of the model."
    }, {
        "action": "/edgemere/aml/aimodel/validate",
        "parameters": {"appName": "name1", "SLA": "specified SLA details"},
        "description": "The system validates the AI model 'name1' based on the specified SLA pass rate. This is to ensure that the model meets the expected performance and pass rates."
    }, {
        "action": "/edgemere/aml/aimodel/sign",
        "parameters": {"appName": "name1"},
        "description": "A digital signature is added to the AI model 'name1' to affirm its authenticity. This process is done to ensure that the model is genuine and legally binding."
    }, {
        "action": "/edgemere/aml/aimodel/create",
        "parameters": {"appName": "name1"},
        "description": "After passing all validations, the AI model 'name1' is successfully recreated. This final action marks the achievement of creating an AI model that is free from malware, validated, and digitally signed."
    }],
    "uid": "ManageAIModels.CreateAIModel",
    "given": "An application developer or data scientist wants to create an AI model",
    "when": "They use the 'aimodel/create' method and provide 'name1' as the name parameter",
    "then": "The AI model with the provided name is scanned for malware and viruses, validated for correctness with a pass rate specified in the SLA of the model, digitally signed and then created successfully."
};
