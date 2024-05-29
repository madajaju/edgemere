---
title: Monitor Physical World
permalink: workflow-MonitorPhysicalWorld
parent: Workflows
---
# Monitor Physical World

Description of workflow to monitor the physical world

![Workflow Diagram](./MonitorPhysicalWorld.png)

## Activities

* Init - Start monitoring process
* [Continuous Monitoring](scenario-ContinuousMonitoring) - 




![DataFlow Diagram](./MonitorPhysicalWorldData.png)

### Init

Start monitoring process


*Package* - PhysicalWorld

*Actor* - Actor

#### Inputs

* asset : ref - The asset to be monitored
#### Outputs

* status :  - Monitoring status of the asset

#### Next Activities

* Continuous Monitoring 


![DataFlow Diagram](./MonitorPhysicalWorldData.png)

### Continuous Monitoring




*Type* - scenario

*Package* - PhysicalWorld


#### Inputs

* asset : ref - Physical asset

#### Next Activities

