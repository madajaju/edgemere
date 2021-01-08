
# Infrastructure Orchestrator

Infrastructure Orchestrator is responsible for the orchestration of the infrastructure. It evaluates policies against the infrastructure requests and reservations to determine which Hardware in the Common Physical Layer is used to meet the request requirements.



## Use Cases



![UseCase Diagram](./usecases.svg)

## Users


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/sdi/io/evaluaterequest](./action//edgemere/sdi/io/evaluaterequest)
* [/edgemere/sdi/io/provision](./action//edgemere/sdi/io/provision)


## Logical Artifacts
The Data Model for the  Infrastructure Orchestrator shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages



![Logical Diagram](./logical.svg)

### Classes



## Activities and Flows
The Infrastructure Orchestrator subsystem provides the following activities and flows.

### Messages Handled

| Message | Action | Description |
|---|---|---|
| request.selected | /sdi/io/evaluateRequest |  |
| reservation.confirmed | /sdi/io/provision |  |


### Messages Sent

TBD

## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system.
The subsystem also has an CLI, REST and Web Interface exposed through a sailajs application. The sailsjs
application will interface with the micro-services and can monitor and drive work-flows through the mesh of
micro-services.

![Deployment Image](./deployment.svg)

## Physical Architecture

The Infrastructure Orchestrator subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
how they connect to each other. All of the micro-services communicate to each other and the main app through a
REST interface. A CLI, REST or Web interface for the app is how other subsystems or actors interact. Requests are
forwarded to micro-services through the REST interface of each micro-service.

![Physical Diagram](./physical.svg)

## Micro-Services
These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.

### dev
Detail information for the [dev environment](./envs/dev/index.md) can be found [here](./envs/dev/index.md)

Services in the dev environment

* frontend : sdi_io_web
* gw : sdi_io_gw

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* frontend : sdi_io_web
* gw : sdi_io_gw

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* frontend : sdi_io_web
* gw : sdi_io_gw


## Interface Details

### .edgemere.sdi.io.evaluaterequest
* REST - /edgemere/sdi/io/evaluaterequest
* bin -  edgemere sdi io evaluaterequest
* js - .edgemere.sdi.io.evaluaterequest

Evaluate Request against policies and select the appropriate reservations from the Common Physical Layer

| Name | Type | Required | Description |
|---|---|---|---|
| request | object |true | Request to evaluate |



### .edgemere.sdi.io.provision
* REST - /edgemere/sdi/io/provision
* bin -  edgemere sdi io provision
* js - .edgemere.sdi.io.provision

Provision Resources based on the reservation.

| Name | Type | Required | Description |
|---|---|---|---|
| obj | object |true | Reservation to use as the provision |




