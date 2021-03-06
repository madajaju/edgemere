---
layout: default
title: Manage Stacks
permalink: usecase-ManageStacks
parent: usecases
---

# Manage Stacks

Manage Stacks allows the stack developer to create, update, and delete stacks.

![Activities Diagram](./activities.svg)

## Actors

* [Stack Developer](actor-stackdev)
* [Application Developer](actor-applicationdeveloper)


## Detail Scenarios

* [Manage Stacks](#scenario-DeployStack)
* [Manage Stacks](#scenario-UninstallStack)
* [Manage Stacks](#scenario-UpdateStack)

  
### Scenario Deploy Stack

Deploy Stack allows a devops engineer to deploy a stack to an environment. Parameters can be passed during the deployment of the stack to the environment. Policies are attached to the stack during deployment and the stack is Service Orchestrator creates a landscape request to match the request of deploying the stack requirements.

![Scenario DeployStack](./deploystack.svg)

#### Steps

1. To Be Defined


#### Actors

* [DevOps Engineer](actor-devops)


### Scenario Uninstall Stack

Uninstall Stack shuts down the stack and all of its services.

![Scenario UninstallStack](./uninstallstack.svg)

#### Steps

1. To Be Defined


#### Actors

* [DevOps Engineer](actor-devops)


### Scenario Update Stack

Update Stack allows the DevOps Engineer to update the stack after it has been deployed. This can include policies changes in the environment, updates to the stack definition, service definitions, or environmental changes.

![Scenario UpdateStack](./updatestack.svg)

#### Steps

1. To Be Defined


#### Actors

* [DevOps Engineer](actor-devops)



