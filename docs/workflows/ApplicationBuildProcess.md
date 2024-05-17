---
title: Application Build Process
permalink: workflow-ApplicationBuildProcess
parent: Workflows
---
# Application Build Process

Application Build Process shows how the applications are built in the system

![Workflow Diagram](./ApplicationBuildProcess.png)

## Activities

* Init - Initial state for the workflow
* [Build Application](scenario-BuildApplication) - Build the application and all of its dependencies
* [Build Stack](scenario-BuildStack) - Build a stack of services and all of its dependencies
* [Build Service](scenario-BuildService) - Build a micro-services as a container image.
* Store Artifact - Store Artifact in the Repository




![DataFlow Diagram](./ApplicationBuildProcessData.png)

### Init

Initial state for the workflow



*Actor* - Application Developer


#### Next Activities

* Build Application 


![DataFlow Diagram](./ApplicationBuildProcessData.png)

### Build Application

Build the application and all of its dependencies


*Type* - scenario

*Package* - Application Management Layer



#### Next Activities

* Build Stack  [ Stacks Need Build === true ] 
* Store Artifact  [ Stacks Need Build === false ] 


![DataFlow Diagram](./ApplicationBuildProcessData.png)

### Build Stack

Build a stack of services and all of its dependencies


*Type* - scenario

*Package* - Service Management Layer



#### Next Activities

* Build Service  [ Services Need Build === true ] 
* Store Artifact  [ Services Need Build === false ] 


![DataFlow Diagram](./ApplicationBuildProcessData.png)

### Build Service

Build a micro-services as a container image.


*Type* - scenario

*Package* - Service Management Layer



#### Next Activities

* Build Service  [ Services Need Build === true ] 
* Store Artifact  [ Services Need Build === false ] 


![DataFlow Diagram](./ApplicationBuildProcessData.png)

### Store Artifact

Store Artifact in the Repository


*Package* - Service Management Layer


