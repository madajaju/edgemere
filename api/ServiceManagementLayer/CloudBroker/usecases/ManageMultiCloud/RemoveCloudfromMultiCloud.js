module.exports = {"name":"Remove Cloud From Multi Cloud","description":"IT Operations removes or adds policies from Multi Cloud","method":"multicloud/removepolicies","actors":{"IT Operations":"uses"},"uid":"ManageMultiCloud.RemoveCloudFromMultiCloud","given":"IT Operations are enabled to use Multi Cloud","when":"A cloud policy needs to be removed","then":"IT operations remove the policy from Multi Cloud"};