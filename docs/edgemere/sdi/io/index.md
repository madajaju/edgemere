---
layout: default
title: Infrastructure Orchestrator
permalink: package--edgemere-sdi-io
parent: Software Defined Infrastructure
grand_parent: edgemere
---

# Infrastructure Orchestrator

Infrastructure Orchestrator is responsible for the orchestration of the infrastructure. It evaluates policies against the infrastructure requests and reservations to determine which Hardware in the Common Physical Layer is used to meet the request requirements.



## Use Cases

The following are the use cases of the Infrastructure Orchestrator subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.



![UseCase Diagram](./usecases.png)

## Users

The following are the actors of the Infrastructure Orchestrator subsystem. This can include people, other subsystems
inside the solution and even external subsystems.



![User Interaction](./userinteraction.png)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.png)

* [ edgemere sdi io evaluaterequest](#action--edgemere-sdi-io-evaluaterequest)
* [ edgemere sdi io provision](#action--edgemere-sdi-io-provision)


## Logical Artifacts

The Data Model for the  Infrastructure Orchestrator subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.png)

### Sub Packages

The Infrastructure Orchestrator subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.png)

### Classes

The following are the classes in the data model of the Infrastructure Orchestrator subsystem.




## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-sdi-io-dev)
* [test](environment--edgemere-sdi-io-test)
* [prod](environment--edgemere-sdi-io-prod)



## Physical Architecture

The Infrastructure Orchestrator subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-sdi-io-dev)
* [test](environment--edgemere-sdi-io-test)
* [prod](environment--edgemere-sdi-io-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-sdi-io-dev)
can be found [here](environment--edgemere-sdi-io-dev)

Services in the dev environment

* frontend : sdi_io_web
* gw : sdi_io_gw


### test

Detail information for the [test environment](environment--edgemere-sdi-io-test)
can be found [here](environment--edgemere-sdi-io-test)

Services in the test environment

* frontend : sdi_io_web
* gw : sdi_io_gw


### prod

Detail information for the [prod environment](environment--edgemere-sdi-io-prod)
can be found [here](environment--edgemere-sdi-io-prod)

Services in the prod environment

* frontend : sdi_io_web
* gw : sdi_io_gw


## Activities and Flows
The Infrastructure Orchestrator subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

TBD

## Interface Details
The Infrastructure Orchestrator subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere sdi io evaluaterequest

* REST - /edgemere/sdi/io/evaluaterequest
* bin -  edgemere sdi io evaluaterequest
* js - .edgemere.sdi.io.evaluaterequest

Evaluate Request against policies and select the appropriate reservations from the Common Physical Layer

| Name | Type | Required | Description |
|---|---|---|---|
| request | object |true | Request to evaluate |



### Action  edgemere sdi io provision

* REST - /edgemere/sdi/io/provision
* bin -  edgemere sdi io provision
* js - .edgemere.sdi.io.provision

Provision Resources based on the reservation.

| Name | Type | Required | Description |
|---|---|---|---|
| obj | object |true | Reservation to use as the provision |




