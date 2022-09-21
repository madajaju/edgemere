---
title: Package Data Orchestrator
permalink: package--edgemere-diml-dml-do
parent: Package Data Management Layer
grand_parent: Package Distributed Information Management Layer
---

# Data Orchestrator

Data Orchestrator is a package that contains...



## Use Cases

The following are the use cases of the Data Orchestrator subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.

* [Manage Data Instances](usecase-ManageDataInstances)


![UseCase Diagram](./usecases.png)

## Users

The following are the actors of the Data Orchestrator subsystem. This can include people, other subsystems
inside the solution and even external subsystems.

* [DataScientist](actor-datascientist)
* [ApplicationDeveloper](actor-applicationdeveloper)


![User Interaction](./userinteraction.png)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.png)

* [ edgemere diml dml do evaluate](#action--edgemere-diml-dml-do-evaluate)
* [ edgemere diml dml do reserve](#action--edgemere-diml-dml-do-reserve)
* [ edgemere diml dml do datainstance create](#action--edgemere-diml-dml-do-datainstance-create)
* [ edgemere diml dml do datainstance destroy](#action--edgemere-diml-dml-do-datainstance-destroy)
* [ edgemere diml dml do datainstance find](#action--edgemere-diml-dml-do-datainstance-find)
* [ edgemere diml dml do datainstance list](#action--edgemere-diml-dml-do-datainstance-list)


## Logical Artifacts

The Data Model for the  Data Orchestrator subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.png)

### Sub Packages

The Data Orchestrator subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.png)

### Classes

The following are the classes in the data model of the Data Orchestrator subsystem.

* [DataInstance](class-DataInstance)
* [DataRequest](class-DataRequest)
* [DataReservation](class-DataReservation)



## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-diml-dml-do-dev)
* [test](environment--edgemere-diml-dml-do-test)
* [prod](environment--edgemere-diml-dml-do-prod)



## Physical Architecture

The Data Orchestrator subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-diml-dml-do-dev)
* [test](environment--edgemere-diml-dml-do-test)
* [prod](environment--edgemere-diml-dml-do-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-diml-dml-do-dev)
can be found [here](environment--edgemere-diml-dml-do-dev)

Services in the dev environment

* web : diml_dml_do_web


### test

Detail information for the [test environment](environment--edgemere-diml-dml-do-test)
can be found [here](environment--edgemere-diml-dml-do-test)

Services in the test environment

* web : diml_dml_do_web


### prod

Detail information for the [prod environment](environment--edgemere-diml-dml-do-prod)
can be found [here](environment--edgemere-diml-dml-do-prod)

Services in the prod environment

* web : diml_dml_do_web


## Activities and Flows
The Data Orchestrator subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.


### Messages Handled

The Data Orchestrator subsystem is an event driven architecture and handle several events. The following
events are handled by this subsystem. Please note that this subsystem is not the only subsystem that handles
these events.

| Message | Action | Description |
| --- | --- | --- |
| datareference.provisioning | /diml/dml/do/datainstance/create |  |
| datarequest.needed | /diml/dml/do/reserve |  |
| datarequest.selected | /diml/dml/do/evaluate |  |



### Messages Sent

| Event | Description | Emitter |
|-------|-------------|---------|
| datainstance.create |  When an object of type DataInstance is created. | DataInstance
| datainstance.destroy |  When an object of type DataInstance is destroyed. | DataInstance
| datainstance.updated |  When an object of type DataInstance has an attribute or association updated. | DataInstance
| datarequest.create |  When an object of type DataRequest is created. | DataRequest
| datarequest.destroy |  When an object of type DataRequest is destroyed. | DataRequest
| datarequest.updated |  When an object of type DataRequest has an attribute or association updated. | DataRequest
| datareservation.create |  When an object of type DataReservation is created. | DataReservation
| datareservation.destroy |  When an object of type DataReservation is destroyed. | DataReservation
| datareservation.updated |  When an object of type DataReservation has an attribute or association updated. | DataReservation



## Interface Details
The Data Orchestrator subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere diml dml do evaluate



* REST - /edgemere/diml/dml/do/evaluate?request=ref
* bin -  edgemere diml dml do evaluate --request ref
* js - .edgemere.diml.dml.do.evaluate({ request:ref })

#### Description
Reserve a Data Instances from a Data Request

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| request | ref |true | This is the data request to get the reservations |



### Action  edgemere diml dml do reserve



* REST - /edgemere/diml/dml/do/reserve?request=ref
* bin -  edgemere diml dml do reserve --request ref
* js - .edgemere.diml.dml.do.reserve({ request:ref })

#### Description
Reserve a Data Instances from a Data Request

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| request | ref |true | This is the data request to get the reservations |



### Action  edgemere diml dml do datainstance create



* REST - /edgemere/diml/dml/do/datainstance/create?dataref=json
* bin -  edgemere diml dml do datainstance create --dataref json
* js - .edgemere.diml.dml.do.datainstance.create({ dataref:json })

#### Description
Create a Data Instance from a Data Reference

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| dataref | json |false | This is a Data Reference that should be turned into a Data Instance |



### Action  edgemere diml dml do datainstance destroy



* REST - /edgemere/diml/dml/do/datainstance/destroy?attr1=string
* bin -  edgemere diml dml do datainstance destroy --attr1 string
* js - .edgemere.diml.dml.do.datainstance.destroy({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere diml dml do datainstance find



* REST - /edgemere/diml/dml/do/datainstance/find?attr1=string
* bin -  edgemere diml dml do datainstance find --attr1 string
* js - .edgemere.diml.dml.do.datainstance.find({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere diml dml do datainstance list



* REST - /edgemere/diml/dml/do/datainstance/list?attr1=string
* bin -  edgemere diml dml do datainstance list --attr1 string
* js - .edgemere.diml.dml.do.datainstance.list({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




