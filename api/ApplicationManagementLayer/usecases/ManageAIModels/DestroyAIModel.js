module.exports = {"name":"Destroy AI Model","description":"Destroy AI Model is the description","method":"aimodel/destroy","actors":{"DataEngineer":"uses","ApplicationDeveloper":"uses"},"uid":"ManageAIModels.DestroyAIModel","given":"A Data Engineer or Application Developer uses an AI model","when":"They decide to destroy the AI model","then":"The AI model is no longer available","steps":[{"action":"/edgemere/aml/aimodel/list","parameters":{},"description":"List all the available AI models."},{"action":"/edgemere/aml/aimodel/destroy","parameters":{"appName":{"type":"string","description":"Provide the name of the AI model you want to destroy."}},"description":"An AI model with the given name is destroyed. Please make sure to provide the exact name of the AI model you want to destroy."},{"action":"/edgemere/aml/aimodel/list","parameters":{},"description":"Re-list all the available AI models to make sure the specified AI model has been destroyed."}]};