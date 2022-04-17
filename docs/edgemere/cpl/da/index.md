---
layout: default
title: Device Agent
permalink: package--edgemere-cpl-da
parent: Common Physical Layer
grand_parent: edgemere
---

# Device Agent

Device Agent is a stack of micro-services that run on Edge Devices. These micro-services includecontrol management, data control, security and microCloud services



## Use Cases

The following are the use cases of the Device Agent subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.



![UseCase Diagram](./usecases.png)

## Users

The following are the actors of the Device Agent subsystem. This can include people, other subsystems
inside the solution and even external subsystems.



![User Interaction](./userinteraction.png)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.png)

* [ edgemere cpl da connect](#action--edgemere-cpl-da-connect)
* [ edgemere cpl da register](#action--edgemere-cpl-da-register)
* [ edgemere cpl da service register](#action--edgemere-cpl-da-service-register)


## Logical Artifacts

The Data Model for the  Device Agent subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.png)

### Sub Packages

The Device Agent subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.png)

### Classes

The following are the classes in the data model of the Device Agent subsystem.




## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-cpl-da-dev)
* [test](environment--edgemere-cpl-da-test)
* [prod](environment--edgemere-cpl-da-prod)



## Physical Architecture

The Device Agent subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-cpl-da-dev)
* [test](environment--edgemere-cpl-da-test)
* [prod](environment--edgemere-cpl-da-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-cpl-da-dev)
can be found [here](environment--edgemere-cpl-da-dev)

Services in the dev environment

* datacontroller : diml_dml_dc_controller:latest
* policyengine : sa_pe_engine:latest
* servicecontroller : sml_sc:latest
* telemetry_producer : cpl_tp_producer:latest
* portal : cpl_da_web


### test

Detail information for the [test environment](environment--edgemere-cpl-da-test)
can be found [here](environment--edgemere-cpl-da-test)

Services in the test environment

* datacontroller : diml_dml_dc_controller:latest
* policyengine : sa_pe_engine:latest
* servicecontroller : sml_sc:latest
* telemetry_producer : cpl_tp_producer:latest
* portal : cpl_da_web


### prod

Detail information for the [prod environment](environment--edgemere-cpl-da-prod)
can be found [here](environment--edgemere-cpl-da-prod)

Services in the prod environment

* datacontroller : diml_dml_dc_controller:latest
* policyengine : sa_pe_engine:latest
* servicecontroller : sml_sc:latest
* telemetry_producer : cpl_tp_producer:latest
* portal : cpl_da_web


## Activities and Flows
The Device Agent subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

TBD

## Interface Details
The Device Agent subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere cpl da connect

* REST - /edgemere/cpl/da/connect
* bin -  edgemere cpl da connect
* js - .edgemere.cpl.da.connect

Register Agent with the Manager

| Name | Type | Required | Description |
|---|---|---|---|
| data | string |true | URL of the data manager |
| policy | string |true | URL of the policy engine manager |
| name | string |true | Name of the agent |



### Action  edgemere cpl da register

* REST - /edgemere/cpl/da/register
* bin -  edgemere cpl da register
* js - .edgemere.cpl.da.register

Register Service with the Agent

| Name | Type | Required | Description |
|---|---|---|---|
| data | string |true | URL of the data manager |
| policy | string |true | URL of the policy engine manager |
| name | string |true | Name of the agent |



### Action  edgemere cpl da service register

* REST - /edgemere/cpl/da/service/register
* bin -  edgemere cpl da service register
* js - .edgemere.cpl.da.service.register

Register Service with the Agent

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | Name of the service |
| instanceName | string |true | Name of the service instance |
| externalURL | string |false | URL of the external to the stack interface to the service |
| internalURL | string |false | URL of the internal to the stack interface to the service |




