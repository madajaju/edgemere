---
layout: default
title: Data Management Layer
permalink: package--edgemere-diml-dml
parent: Distributed Information Management Layer
grand_parent: edgemere
has_children: true
---
# Data Management Layer

Data Management Layer is a package that contains...



## Use Cases

The following are the use cases of the Data Management Layer subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.

* [Manage Data Governance](usecase-ManageDataGovernance)
* [Manage Data Policies](usecase-ManageDataPolicies)
* [Manage Data Sources](usecase-ManageDataSources)
* [Manage Data Strategy](usecase-ManageDataStrategy)


![UseCase Diagram](./usecases.svg)

## Users

The following are the actors of the Data Management Layer subsystem. This can include people, other subsystems 
inside the solution and even external subsystems. 

* [ChiefDataOfficer](actor-cdo)
* [DataEngineer](actor-dataengineer)


![User Interaction](./userinteraction.svg)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [ edgemere diml dml data govern](#action--edgemere-diml-dml-data-govern)
* [ edgemere diml dml data source name](#action--edgemere-diml-dml-data-source-name)
* [ edgemere diml dml datapolicy list](#action--edgemere-diml-dml-datapolicy-list)
* [ edgemere diml dml datasource list](#action--edgemere-diml-dml-datasource-list)
* [ edgemere diml dml datastrategy list](#action--edgemere-diml-dml-datastrategy-list)


## Logical Artifacts

The Data Model for the  Data Management Layer subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

The Data Management Layer subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.

* [Data Controller](package--edgemere-diml-dml-dc)
* [Data Orchestrator](package--edgemere-diml-dml-do)
* [Federated Meta Data Management](package--edgemere-diml-dml-fmdm)
* [Governance Engine](package--edgemere-diml-dml-ge)


![Logical Diagram](./logical.svg)

### Classes

The following are the classes in the data model of the Data Management Layer subsystem.

* [Data](class-Data)
* [DataReference](class-DataReference)
* [DataStrategy](class-DataStrategy)



## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is 
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-diml-dml-dev)
* [test](environment--edgemere-diml-dml-test)
* [prod](environment--edgemere-diml-dml-prod)



## Physical Architecture

The Data Management Layer subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors 
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-diml-dml-dev)
* [test](environment--edgemere-diml-dml-test)
* [prod](environment--edgemere-diml-dml-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-diml-dml-dev)
can be found [here](environment--edgemere-diml-dml-dev)

Services in the dev environment

* frontend : diml_dml_web
* gw : diml_dml_gw


### test

Detail information for the [test environment](environment--edgemere-diml-dml-test)
can be found [here](environment--edgemere-diml-dml-test)

Services in the test environment

* frontend : diml_dml_web
* gw : diml_dml_gw


### prod

Detail information for the [prod environment](environment--edgemere-diml-dml-prod)
can be found [here](environment--edgemere-diml-dml-prod)

Services in the prod environment

* frontend : diml_dml_web
* gw : diml_dml_gw


## Activities and Flows
The Data Management Layer subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

TBD

## Interface Details
The Data Management Layer subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere diml dml data govern

* REST - /edgemere/diml/dml/data/govern
* bin -  edgemere diml dml data govern
* js - .edgemere.diml.dml.data.govern

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere diml dml data source name

* REST - /edgemere/diml/dml/data/source/name
* bin -  edgemere diml dml data source name
* js - .edgemere.diml.dml.data.source.name

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere diml dml datapolicy list

* REST - /edgemere/diml/dml/datapolicy/list
* bin -  edgemere diml dml datapolicy list
* js - .edgemere.diml.dml.datapolicy.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere diml dml datasource list

* REST - /edgemere/diml/dml/datasource/list
* bin -  edgemere diml dml datasource list
* js - .edgemere.diml.dml.datasource.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere diml dml datastrategy list

* REST - /edgemere/diml/dml/datastrategy/list
* bin -  edgemere diml dml datastrategy list
* js - .edgemere.diml.dml.datastrategy.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




