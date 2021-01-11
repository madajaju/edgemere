---
layout: default
title: Usecase Manage AI Models
permalink: usecase-ManageAIModels
parent: Usecases
---

# Manage AI Models

Data Scientist manages AI models and ties them to and application and data set. DevOps will make sure when applications and AI models are updated that they are updatedtogether.

![Activities Diagram](./activities.svg)

## Actors

* [Data Scientist](actor-datascientist)
* [DevOps Engineer](actor-devops)
* [Application Developer](actor-applicationdeveloper)
* [DataEngineer](actor-dataengineer)


## Detail Scenarios

* [Manage AI Models](#scenario-CreateAIModel)
* [Manage AI Models](#scenario-DeployAIModel)
* [Manage AI Models](#scenario-DestroyAIModel)
* [Manage AI Models](#scenario-UpdateAIModel)

  
### Scenario Create AI Model

Create AI Model is the description

![Scenario nameNoSpaces](./CreateAIModel.svg)

#### Steps

1. [aimodel create --name name1](#action-aimodel-create)


#### Actors

* [Application Developer](actor-applicationdeveloper)
* [Data Scientist](actor-datascientist)


### Scenario Deploy AI Model

Deploy AI Model is the description

![Scenario nameNoSpaces](./DeployAIModel.svg)

#### Steps

1. To Be Defined


#### Actors

* [DevOps Engineer](actor-devops)
* [Application Developer](actor-applicationdeveloper)
* [DataEngineer](actor-dataengineer)


### Scenario Destroy AI Model

Destroy AI Model is the description

![Scenario nameNoSpaces](./DestroyAIModel.svg)

#### Steps

1. To Be Defined


#### Actors

* [DataEngineer](actor-dataengineer)
* [Application Developer](actor-applicationdeveloper)


### Scenario Update AI Model

Update AI Model is the description

![Scenario nameNoSpaces](./UpdateAIModel.svg)

#### Steps

1. To Be Defined


#### Actors

* [DataEngineer](actor-dataengineer)
* [DevOps Engineer](actor-devops)
* [Application Developer](actor-applicationdeveloper)



