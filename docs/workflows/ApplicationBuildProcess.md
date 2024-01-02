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
