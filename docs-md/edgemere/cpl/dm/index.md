---
layout: default
title: Device Manager
permalink: package--edgemere-cpl-dm
parent: Common Physical Layer
grand_parent: edgemere
---
# Device Manager

Device Manager is a package that contains...



## Use Cases

The following are the use cases of the Device Manager subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.



![UseCase Diagram](./usecases.svg)

## Users

The following are the actors of the Device Manager subsystem. This can include people, other subsystems 
inside the solution and even external subsystems. 



![User Interaction](./userinteraction.svg)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [ edgemere cpl dm agent register](#action--edgemere-cpl-dm-agent-register)
* [ edgemere cpl dm service register](#action--edgemere-cpl-dm-service-register)


## Logical Artifacts

The Data Model for the  Device Manager subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

The Device Manager subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.svg)

### Classes

The following are the classes in the data model of the Device Manager subsystem.

* [Agent](class-Agent)



## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is 
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-cpl-dm-dev)
* [test](environment--edgemere-cpl-dm-test)
* [prod](environment--edgemere-cpl-dm-prod)



## Physical Architecture

The Device Manager subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors 
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-cpl-dm-dev)
* [test](environment--edgemere-cpl-dm-test)
* [prod](environment--edgemere-cpl-dm-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-cpl-dm-dev)
can be found [here](environment--edgemere-cpl-dm-dev)

Services in the dev environment

* data_orchestrator : diml_dml_do:latest
* policy_engine : sa_pe:latest
* service_orchestrator : sml_so:latest
* telemetry_aggregator : cpl_ta:latest
* portal : cpl_dm_web


### test

Detail information for the [test environment](environment--edgemere-cpl-dm-test)
can be found [here](environment--edgemere-cpl-dm-test)

Services in the test environment

* data_orchestrator : diml_dml_do:latest
* policy_engine : sa_pe:latest
* service_orchestrator : sml_so:latest
* telemetry_aggregator : cpl_ta:latest
* portal : cpl_dm_web


### prod

Detail information for the [prod environment](environment--edgemere-cpl-dm-prod)
can be found [here](environment--edgemere-cpl-dm-prod)

Services in the prod environment

* data_orchestrator : diml_dml_do:latest
* policy_engine : sa_pe:latest
* service_orchestrator : sml_so:latest
* telemetry_aggregator : cpl_ta:latest
* portal : cpl_dm_web


## Activities and Flows
The Device Manager subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

TBD

## Interface Details
The Device Manager subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere cpl dm agent register

* REST - /edgemere/cpl/dm/agent/register
* bin -  edgemere cpl dm agent register
* js - .edgemere.cpl.dm.agent.register

Register Agent with the Manager

| Name | Type | Required | Description |
|---|---|---|---|
| url | string |true | URL of the agent to register |
| name | string |true | Name of the agent |



### Action  edgemere cpl dm service register

* REST - /edgemere/cpl/dm/service/register
* bin -  edgemere cpl dm service register
* js - .edgemere.cpl.dm.service.register

Register Agent with the Manager

| Name | Type | Required | Description |
|---|---|---|---|
| url | string |true | URL of the agent to register |
| name | string |true | Name of the agent |




