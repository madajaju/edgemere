
# Device Manager

Device Manager is a package that contains...



## Use Cases



![UseCase Diagram](./usecases.svg)

## Users


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/cpl/dm/agent/register](./action//edgemere/cpl/dm/agent/register)
* [/edgemere/cpl/dm/service/register](./action//edgemere/cpl/dm/service/register)


## Logical Artifacts
The Data Model for the  Device Manager shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages



![Logical Diagram](./logical.svg)

### Classes

* [Agent](./models//edgemere/cpl/dm/Agent/index.md)


## Activities and Flows
The Device Manager subsystem provides the following activities and flows.

### Messages Handled

| Message | Action | Description |
|---|---|---|
| agent.started | /dm/agent/register |  |


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

The Device Manager subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* data_orchestrator : diml_dml_do:latest
* policy_engine : sa_pe:latest
* service_orchestrator : sml_so:latest
* telemetry_aggregator : cpl_ta:latest
* portal : cpl_dm_web

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* data_orchestrator : diml_dml_do:latest
* policy_engine : sa_pe:latest
* service_orchestrator : sml_so:latest
* telemetry_aggregator : cpl_ta:latest
* portal : cpl_dm_web

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* data_orchestrator : diml_dml_do:latest
* policy_engine : sa_pe:latest
* service_orchestrator : sml_so:latest
* telemetry_aggregator : cpl_ta:latest
* portal : cpl_dm_web


## Interface Details

### .edgemere.cpl.dm.agent.register
* REST - /edgemere/cpl/dm/agent/register
* bin -  edgemere cpl dm agent register
* js - .edgemere.cpl.dm.agent.register

Register Agent with the Manager

| Name | Type | Required | Description |
|---|---|---|---|
| url | string |true | URL of the agent to register |
| name | string |true | Name of the agent |



### .edgemere.cpl.dm.service.register
* REST - /edgemere/cpl/dm/service/register
* bin -  edgemere cpl dm service register
* js - .edgemere.cpl.dm.service.register

Register Agent with the Manager

| Name | Type | Required | Description |
|---|---|---|---|
| url | string |true | URL of the agent to register |
| name | string |true | Name of the agent |




