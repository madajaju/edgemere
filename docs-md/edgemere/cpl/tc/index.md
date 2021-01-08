
# Telemetry Consumer

Telemetry Consumer is a package that contains...



## Use Cases



![UseCase Diagram](./usecases.svg)

## Users


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/cpl/tc/list](./action//edgemere/cpl/tc/list)
* [/edgemere/cpl/tc/report](./action//edgemere/cpl/tc/report)
* [/edgemere/cpl/tc/show](./action//edgemere/cpl/tc/show)


## Logical Artifacts
The Data Model for the  Telemetry Consumer shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages



![Logical Diagram](./logical.svg)

### Classes



## Activities and Flows
The Telemetry Consumer subsystem provides the following activities and flows.

### Messages Handled

| Message | Action | Description |
|---|---|---|
| adevice.stats | /tc/report |  |
| device.stats | /ta/report |  |
| device.stats | /tc/report |  |


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

The Telemetry Consumer subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* consumer : cpl_tc_web:latest
* producer : cpl_tp_producer:latest

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* consumer : cpl_tc_web:latest
* producer : cpl_tp_producer:latest

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* consumer : cpl_tc_web:latest
* producer : cpl_tp_producer:latest


## Interface Details

### .edgemere.cpl.tc.list
* REST - /edgemere/cpl/tc/list
* bin -  edgemere cpl tc list
* js - .edgemere.cpl.tc.list

report the statstics for a device

| Name | Type | Required | Description |
|---|---|---|---|



### .edgemere.cpl.tc.report
* REST - /edgemere/cpl/tc/report
* bin -  edgemere cpl tc report
* js - .edgemere.cpl.tc.report

report the statstics for a device

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | The name of the device |
| stats | object |true | The statistics for the device |



### .edgemere.cpl.tc.show
* REST - /edgemere/cpl/tc/show
* bin -  edgemere cpl tc show
* js - .edgemere.cpl.tc.show

report the statstics for a device

| Name | Type | Required | Description |
|---|---|---|---|
| name | object |true | The name of the device |




