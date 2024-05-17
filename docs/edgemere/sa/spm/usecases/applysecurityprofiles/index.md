---
title: Apply Security Profiles
permalink: usecase-ApplySecurityProfiles
parent: UseCases
---
# Apply Security Profiles

Apply Security Profiles is the description

![Activities Diagram](./Activities.png)

## Actors

* [Security Operator](actor-securityoperator)





## Extends Use Cases

* [Secure Assets](usecase-SecureAssets)







## Detail Scenarios

* [AttachProfile](#scenario-AttachProfile)
* [DeploySecurityProfile](#scenario-DeploySecurityProfile)



### Scenario Attach Profile

Attach Profile is the description

![Scenario AttachProfile](./AttachProfile.png)
#### Criteria

* Given - Security engineer created security profile and identity
* When - Security profile is deployed and attached to the identity
* Then - Security engineer created security profile and identity

#### Steps
1. [securityprofile create --name secProfile1 --file ./templates/secprofile.yml](#action-securityprofile-create)
1. [identity create --name ID1 --file ./templates/identity.yml](#action-identity-create)
1. [securityprofile deploy --name secProfile1](#action-securityprofile-deploy)
1. [securityprofile attach --profile secProfile1 --identity ID1](#action-securityprofile-attach)

#### Actors

* [SecurityEngineer](actor-securityengineer)



### Scenario Deploy Security Profile

Deploy a Security Profile against an identity in the system.

![Scenario DeploySecurityProfile](./DeploySecurityProfile.png)
#### Criteria

* Given - A security profile has been created
* When - The Security Engineer deploys the security profile
* Then - A security profile has been created

#### Steps
1. [securityprofile create --name secProfile1 --file ./templates/secprofile.yml](#action-securityprofile-create)
1. [securityprofile deploy --name secProfile1](#action-securityprofile-deploy)

#### Actors

* [SecurityEngineer](actor-securityengineer)




