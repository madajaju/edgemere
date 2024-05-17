---
title: Develop application Process
permalink: workflow-DevelopapplicationProcess
parent: Workflows
---
# Develop application Process

This process describes how t odevelop an application in the Edgemere system

![Workflow Diagram](./DevelopapplicationProcess.png)

## Activities

* Init - Initial state for the workflow
* [Create Application](scenario-CreateApplication) - Create an application to be developed in the edgemere architecture
* Write Code - The Application Developer Write Codes for the application
* Check In Code - The Application Developer Checks Code into the Repository
* Application Build Process - Process to build and test the application
* [Deploy Application](scenario-DeployApplication) - Deploy Application to the Production Environment




![DataFlow Diagram](./DevelopapplicationProcessData.png)

### Init

Initial state for the workflow



*Actor* - Application Developer


#### Next Activities

* Create Application 


![DataFlow Diagram](./DevelopapplicationProcessData.png)

### Create Application

Create an application to be developed in the edgemere architecture


*Type* - scenario

*Package* - Application Management Layer



#### Next Activities

* Write Code 


![DataFlow Diagram](./DevelopapplicationProcessData.png)

### Write Code

The Application Developer Write Codes for the application



*Actor* - Application Developer


#### Next Activities

* Check In Code 


![DataFlow Diagram](./DevelopapplicationProcessData.png)

### Check In Code

The Application Developer Checks Code into the Repository


*Package* - Application Management Layer



#### Next Activities

* Application Build Process 


![DataFlow Diagram](./DevelopapplicationProcessData.png)

### Application Build Process

Process to build and test the application


*Package* - Edgemere



#### Next Activities

* Deploy Application  [ Build Test Pass === true ] 
* Write Code  [ Build Test Pass === false ] 


![DataFlow Diagram](./DevelopapplicationProcessData.png)

### Deploy Application

Deploy Application to the Production Environment


*Type* - scenario

*Package* - Application Management Layer


