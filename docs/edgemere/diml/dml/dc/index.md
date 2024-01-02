---
layout: default
title: Package Data Controller
permalink: package--edgemere-diml-dml-dc
parent: Package Data Management Layer
grand_parent: Package Distributed Information Management Layer
---

# Data Controller

Data Controller is a package that contains...



## Use Cases

The following are the use cases of the Data Controller subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.



![UseCase Diagram](./usecases.png)

## Users

The following are the actors of the Data Controller subsystem. This can include people, other subsystems
inside the solution and even external subsystems.



![User Interaction](./userinteraction.png)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.png)



## Logical Artifacts

The Data Model for the  Data Controller subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.png)

### Sub Packages

The Data Controller subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.png)

### Classes

The following are the classes in the data model of the Data Controller subsystem.




## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-diml-dml-dc-dev)
* [test](environment--edgemere-diml-dml-dc-test)
* [prod](environment--edgemere-diml-dml-dc-prod)



## Physical Architecture

The Data Controller subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-diml-dml-dc-dev)
* [test](environment--edgemere-diml-dml-dc-test)
* [prod](environment--edgemere-diml-dml-dc-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-diml-dml-dc-dev)
can be found [here](environment--edgemere-diml-dml-dc-dev)

Services in the dev environment

* controller : diml_dml_dc_controller


### test

Detail information for the [test environment](environment--edgemere-diml-dml-dc-test)
can be found [here](environment--edgemere-diml-dml-dc-test)

Services in the test environment

* controller : diml_dml_dc_controller


### prod

Detail information for the [prod environment](environment--edgemere-diml-dml-dc-prod)
can be found [here](environment--edgemere-diml-dml-dc-prod)

Services in the prod environment

* controller : diml_dml_dc_controller


## Activities and Flows
The Data Controller subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

| Event | Description | Emitter |
|-------|-------------|---------|



## Interface Details
The Data Controller subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.


