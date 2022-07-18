---
layout: default
title: Federated Meta Data Management
permalink: package--edgemere-diml-dml-fmdm
parent: Data Management Layer
grand_parent: Distributed Information Management Layer
---

# Federated Meta Data Management

Federated Meta Data Management is a package that contains...



## Use Cases

The following are the use cases of the Federated Meta Data Management subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.



![UseCase Diagram](./usecases.png)

## Users

The following are the actors of the Federated Meta Data Management subsystem. This can include people, other subsystems
inside the solution and even external subsystems.



![User Interaction](./userinteraction.png)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.png)

* [ edgemere diml dml fmdm query](#action--edgemere-diml-dml-fmdm-query)


## Logical Artifacts

The Data Model for the  Federated Meta Data Management subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.png)

### Sub Packages

The Federated Meta Data Management subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.png)

### Classes

The following are the classes in the data model of the Federated Meta Data Management subsystem.

* [LineageMetaData](class-LineageMetaData)
* [MetaData](class-MetaData)
* [SourceMetaData](class-SourceMetaData)



## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-diml-dml-fmdm-dev)
* [test](environment--edgemere-diml-dml-fmdm-test)
* [prod](environment--edgemere-diml-dml-fmdm-prod)



## Physical Architecture

The Federated Meta Data Management subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-diml-dml-fmdm-dev)
* [test](environment--edgemere-diml-dml-fmdm-test)
* [prod](environment--edgemere-diml-dml-fmdm-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-diml-dml-fmdm-dev)
can be found [here](environment--edgemere-diml-dml-fmdm-dev)

Services in the dev environment

* frontend : diml_dml_fmdm_web
* gw : diml_dml_fmdm_gw


### test

Detail information for the [test environment](environment--edgemere-diml-dml-fmdm-test)
can be found [here](environment--edgemere-diml-dml-fmdm-test)

Services in the test environment

* frontend : diml_dml_fmdm_web
* gw : diml_dml_fmdm_gw


### prod

Detail information for the [prod environment](environment--edgemere-diml-dml-fmdm-prod)
can be found [here](environment--edgemere-diml-dml-fmdm-prod)

Services in the prod environment

* frontend : diml_dml_fmdm_web
* gw : diml_dml_fmdm_gw


## Activities and Flows
The Federated Meta Data Management subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

| Event | Description | Emitter |
|-------|-------------|---------|
| lineagemetadata.create |  When an object of type LineageMetaData is created. | LineageMetaData
| lineagemetadata.destroy |  When an object of type LineageMetaData is destroyed. | LineageMetaData
| lineagemetadata.updated |  When an object of type LineageMetaData has an attribute or association updated. | LineageMetaData
| metadata.create |  When an object of type MetaData is created. | MetaData
| metadata.destroy |  When an object of type MetaData is destroyed. | MetaData
| metadata.updated |  When an object of type MetaData has an attribute or association updated. | MetaData
| sourcemetadata.create |  When an object of type SourceMetaData is created. | SourceMetaData
| sourcemetadata.destroy |  When an object of type SourceMetaData is destroyed. | SourceMetaData
| sourcemetadata.updated |  When an object of type SourceMetaData has an attribute or association updated. | SourceMetaData



## Interface Details
The Federated Meta Data Management subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere diml dml fmdm query



* REST - /edgemere/diml/dml/fmdm/query?expression=json
* bin -  edgemere diml dml fmdm query --expression json
* js - .edgemere.diml.dml.fmdm.query({ expression:json })

#### Description
Query the MetaData for the data in the query

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| expression | json |true | This is the expression used in the query to return data |



