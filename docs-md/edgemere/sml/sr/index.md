---
layout: default
title: Service Repository
permalink: package--edgemere-sml-sr
parent: Service Management Layer
grand_parent: edgemere
---
# Service Repository

Service Repository is a subsystem that allows for the versioning and managing of definitions of images, services, stacks, resource instance types, etc...



## Use Cases

The following are the use cases of the Service Repository subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.

* [Manage Assets](usecase-ManageAssets)


![UseCase Diagram](./usecases.svg)

## Users

The following are the actors of the Service Repository subsystem. This can include people, other subsystems 
inside the solution and even external subsystems. 

* [Actor](actor-actor)


![User Interaction](./userinteraction.svg)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [ edgemere sml sr data govern](#action--edgemere-sml-sr-data-govern)


## Logical Artifacts

The Data Model for the  Service Repository subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

The Service Repository subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.svg)

### Classes

The following are the classes in the data model of the Service Repository subsystem.




## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is 
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-sml-sr-dev)
* [test](environment--edgemere-sml-sr-test)
* [prod](environment--edgemere-sml-sr-prod)



## Physical Architecture

The Service Repository subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors 
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-sml-sr-dev)
* [test](environment--edgemere-sml-sr-test)
* [prod](environment--edgemere-sml-sr-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-sml-sr-dev)
can be found [here](environment--edgemere-sml-sr-dev)

Services in the dev environment

* frontend : sml_sr_web
* gw : sml_sr_gw


### test

Detail information for the [test environment](environment--edgemere-sml-sr-test)
can be found [here](environment--edgemere-sml-sr-test)

Services in the test environment

* frontend : sml_sr_web
* gw : sml_sr_gw


### prod

Detail information for the [prod environment](environment--edgemere-sml-sr-prod)
can be found [here](environment--edgemere-sml-sr-prod)

Services in the prod environment

* frontend : sml_sr_web
* gw : sml_sr_gw


## Activities and Flows
The Service Repository subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

TBD

## Interface Details
The Service Repository subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere sml sr data govern

* REST - /edgemere/sml/sr/data/govern
* bin -  edgemere sml sr data govern
* js - .edgemere.sml.sr.data.govern

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




