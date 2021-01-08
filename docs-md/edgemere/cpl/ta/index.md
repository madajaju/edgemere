
# Telemetry Aggregator

Telemetry Aggregator is a package that aggregates telementry from multiple sources and then forwardsa statistical model to a parent or consummer of the telemetry.



## Use Cases



![UseCase Diagram](./usecases.svg)

## Users


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/cpl/ta/list](./action//edgemere/cpl/ta/list)
* [/edgemere/cpl/ta/report](./action//edgemere/cpl/ta/report)
* [/edgemere/cpl/ta/setparent](./action//edgemere/cpl/ta/setparent)
* [/edgemere/cpl/ta/show](./action//edgemere/cpl/ta/show)
* [/edgemere/cpl/ta/stats/get](./action//edgemere/cpl/ta/stats/get)
* [/edgemere/cpl/ta/stats/send](./action//edgemere/cpl/ta/stats/send)


## Logical Artifacts
The Data Model for the  Telemetry Aggregator shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages



![Logical Diagram](./logical.svg)

### Classes



## Activities and Flows
The Telemetry Aggregator subsystem provides the following activities and flows.

### Messages Handled

| Message | Action | Description |
|---|---|---|
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

The Telemetry Aggregator subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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
* aggregator : cpl_ta_web:latest
* producer : cpl_tp_producer:latest

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* consumer : cpl_tc_web:latest
* aggregator : cpl_ta_web:latest
* producer : cpl_tp_producer:latest

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* consumer : cpl_tc_web:latest
* aggregator : cpl_ta_web:latest
* producer : cpl_tp_producer:latest


## Interface Details

### .edgemere.cpl.ta.list
* REST - /edgemere/cpl/ta/list
* bin -  edgemere cpl ta list
* js - .edgemere.cpl.ta.list

report the statstics for a device

| Name | Type | Required | Description |
|---|---|---|---|



### .edgemere.cpl.ta.report
* REST - /edgemere/cpl/ta/report
* bin -  edgemere cpl ta report
* js - .edgemere.cpl.ta.report

report the statstics for a device

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | The name of the device |
| stats | object |true | The statistics for the device |



### .edgemere.cpl.ta.setparent
* REST - /edgemere/cpl/ta/setparent
* bin -  edgemere cpl ta setparent
* js - .edgemere.cpl.ta.setparent

Set the parent for the producer to report to

| Name | Type | Required | Description |
|---|---|---|---|
| url | string |true | Parent of the Telemetry Producer |
| name | string |false | Name of the parent |



### .edgemere.cpl.ta.show
* REST - /edgemere/cpl/ta/show
* bin -  edgemere cpl ta show
* js - .edgemere.cpl.ta.show

report the statstics for a device

| Name | Type | Required | Description |
|---|---|---|---|
| name | object |true | The name of the device |



### .edgemere.cpl.ta.stats.get
* REST - /edgemere/cpl/ta/stats/get
* bin -  edgemere cpl ta stats get
* js - .edgemere.cpl.ta.stats.get

get the statstics for the aggregated device

| Name | Type | Required | Description |
|---|---|---|---|



### .edgemere.cpl.ta.stats.send
* REST - /edgemere/cpl/ta/stats/send
* bin -  edgemere cpl ta stats send
* js - .edgemere.cpl.ta.stats.send

send the statstics for the managing service

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | Name of the device for the statistics |
| stats | string |true | Statistic to send to the parent |




