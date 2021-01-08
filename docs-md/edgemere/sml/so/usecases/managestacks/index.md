# Manage Stacks

Manage Stacks allows the stack developer to create, update, and delete stacks.

![Activities Diagram](./activities.svg)

## Actors

* [Stack Developer](/actors/StackDeveloper/index.md)
* [Application Developer](/actors/ApplicationDeveloper/index.md)


## Detail Scenarios
* [Manage Stacks](#Scenario-DeployStack)
* [Manage Stacks](#Scenario-UninstallStack)
* [Manage Stacks](#Scenario-UpdateStack)

  
### Scenario Deploy Stack

Deploy Stack allows a devops engineer to deploy a stack to an environment. Parameters can be passed during the deployment of the stack to the environment. Policies are attached to the stack during deployment and the stack is Service Orchestrator creates a landscape request to match the request of deploying the stack requirements.

![Scenario nameNoSpaces](./DeployStack.svg)

#### Steps

1. To Be Defined


#### Actors

* [DevOps Engineer](actors/devops/index.md)


### Scenario Uninstall Stack

Uninstall Stack shuts down the stack and all of its services.

![Scenario nameNoSpaces](./UninstallStack.svg)

#### Steps

1. To Be Defined


#### Actors

* [DevOps Engineer](actors/devops/index.md)


### Scenario Update Stack

Update Stack allows the DevOps Engineer to update the stack after it has been deployed. This can include policies changes in the environment, updates to the stack definition, service definitions, or environmental changes.

![Scenario nameNoSpaces](./UpdateStack.svg)

#### Steps

1. To Be Defined


#### Actors

* [DevOps Engineer](actors/devops/index.md)




