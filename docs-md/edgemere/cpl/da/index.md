
# Device Agent

Device Agent is a stack of micro-services that run on Edge Devices. These micro-services includecontrol management, data control, security and microCloud services



## Use Cases



![UseCase Diagram](./usecases.svg)

## Users


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/cpl/da/connect](./action//edgemere/cpl/da/connect)
* [/edgemere/cpl/da/register](./action//edgemere/cpl/da/register)
* [/edgemere/cpl/da/service/register](./action//edgemere/cpl/da/service/register)


## Logical Artifacts
The Data Model for the  Device Agent shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages



![Logical Diagram](./logical.svg)

### Classes



## Activities and Flows
The Device Agent subsystem provides the following activities and flows.

### Messages Handled

| Message | Action | Description |
|---|---|---|
| service.started | /da/service/register |  |


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

The Device Agent subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* datacontroller : diml_dml_dc_controller:latest
* policyengine : sa_pe_engine:latest
* servicecontroller : sml_sc:latest
* telemetry_producer : cpl_tp_producer:latest
* portal : cpl_da_web

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* datacontroller : diml_dml_dc_controller:latest
* policyengine : sa_pe_engine:latest
* servicecontroller : sml_sc:latest
* telemetry_producer : cpl_tp_producer:latest
* portal : cpl_da_web

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* datacontroller : diml_dml_dc_controller:latest
* policyengine : sa_pe_engine:latest
* servicecontroller : sml_sc:latest
* telemetry_producer : cpl_tp_producer:latest
* portal : cpl_da_web


## Interface Details

### .edgemere.cpl.da.connect
* REST - /edgemere/cpl/da/connect
* bin -  edgemere cpl da connect
* js - .edgemere.cpl.da.connect

Register Agent with the Manager

| Name | Type | Required | Description |
|---|---|---|---|
| data | string |true | URL of the data manager |
| policy | string |true | URL of the policy engine manager |
| name | string |true | Name of the agent |



### .edgemere.cpl.da.register
* REST - /edgemere/cpl/da/register
* bin -  edgemere cpl da register
* js - .edgemere.cpl.da.register

Register Service with the Agent

| Name | Type | Required | Description |
|---|---|---|---|
| data | string |true | URL of the data manager |
| policy | string |true | URL of the policy engine manager |
| name | string |true | Name of the agent |



### .edgemere.cpl.da.service.register
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




