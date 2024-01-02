---
layout: default
title: Package Telemetry Aggregator
permalink: package--edgemere-cpl-ta
parent: Package Common Physical Layer
grand_parent: Package edgemere
---

# Telemetry Aggregator

Telemetry Aggregator is a package that aggregates telementry from multiple sources and then forwardsa statistical model to a parent or consummer of the telemetry.



## Use Cases

The following are the use cases of the Telemetry Aggregator subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.



![UseCase Diagram](./usecases.png)

## Users

The following are the actors of the Telemetry Aggregator subsystem. This can include people, other subsystems
inside the solution and even external subsystems.



![User Interaction](./userinteraction.png)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.png)

* [ edgemere cpl ta list](#action--edgemere-cpl-ta-list)
* [ edgemere cpl ta report](#action--edgemere-cpl-ta-report)
* [ edgemere cpl ta setparent](#action--edgemere-cpl-ta-setparent)
* [ edgemere cpl ta show](#action--edgemere-cpl-ta-show)
* [ edgemere cpl ta stats get](#action--edgemere-cpl-ta-stats-get)
* [ edgemere cpl ta stats send](#action--edgemere-cpl-ta-stats-send)


## Logical Artifacts

The Data Model for the  Telemetry Aggregator subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.png)

### Sub Packages

The Telemetry Aggregator subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.png)

### Classes

The following are the classes in the data model of the Telemetry Aggregator subsystem.




## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-cpl-ta-dev)
* [test](environment--edgemere-cpl-ta-test)
* [prod](environment--edgemere-cpl-ta-prod)



## Physical Architecture

The Telemetry Aggregator subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-cpl-ta-dev)
* [test](environment--edgemere-cpl-ta-test)
* [prod](environment--edgemere-cpl-ta-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-cpl-ta-dev)
can be found [here](environment--edgemere-cpl-ta-dev)

Services in the dev environment

* consumer : cpl_tc_web:latest
* aggregator : cpl_ta_web:latest
* producer : cpl_tp_producer:latest


### test

Detail information for the [test environment](environment--edgemere-cpl-ta-test)
can be found [here](environment--edgemere-cpl-ta-test)

Services in the test environment

* consumer : cpl_tc_web:latest
* aggregator : cpl_ta_web:latest
* producer : cpl_tp_producer:latest


### prod

Detail information for the [prod environment](environment--edgemere-cpl-ta-prod)
can be found [here](environment--edgemere-cpl-ta-prod)

Services in the prod environment

* consumer : cpl_tc_web:latest
* aggregator : cpl_ta_web:latest
* producer : cpl_tp_producer:latest


## Activities and Flows
The Telemetry Aggregator subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.


### Messages Handled

The Telemetry Aggregator subsystem is an event driven architecture and handle several events. The following
events are handled by this subsystem. Please note that this subsystem is not the only subsystem that handles
these events.

| Message | Action | Description |
| --- | --- | --- |
| device.stats | /ta/report |  |
| device.stats | /tc/report |  |



### Messages Sent

| Event | Description | Emitter |
|-------|-------------|---------|



## Interface Details
The Telemetry Aggregator subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere cpl ta list



* REST - /edgemere/cpl/ta/list?
* bin -  edgemere cpl ta list 
* js - .edgemere.cpl.ta.list({  })

#### Description
report the statstics for a device

#### Parameters

No parameters


### Action  edgemere cpl ta report



* REST - /edgemere/cpl/ta/report?name=string&amp;stats=object
* bin -  edgemere cpl ta report --name string --stats object
* js - .edgemere.cpl.ta.report({ name:string,stats:object })

#### Description
report the statstics for a device

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | The name of the device |
| stats | object |true | The statistics for the device |



### Action  edgemere cpl ta setparent



* REST - /edgemere/cpl/ta/setparent?url=string&amp;name=string
* bin -  edgemere cpl ta setparent --url string --name string
* js - .edgemere.cpl.ta.setparent({ url:string,name:string })

#### Description
Set the parent for the producer to report to

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| url | string |true | Parent of the Telemetry Producer |
| name | string |false | Name of the parent |



### Action  edgemere cpl ta show



* REST - /edgemere/cpl/ta/show?name=object
* bin -  edgemere cpl ta show --name object
* js - .edgemere.cpl.ta.show({ name:object })

#### Description
report the statstics for a device

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | object |true | The name of the device |



### Action  edgemere cpl ta stats get



* REST - /edgemere/cpl/ta/stats/get?
* bin -  edgemere cpl ta stats get 
* js - .edgemere.cpl.ta.stats.get({  })

#### Description
get the statstics for the aggregated device

#### Parameters

No parameters


### Action  edgemere cpl ta stats send



* REST - /edgemere/cpl/ta/stats/send?name=string&amp;stats=string
* bin -  edgemere cpl ta stats send --name string --stats string
* js - .edgemere.cpl.ta.stats.send({ name:string,stats:string })

#### Description
send the statstics for the managing service

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | Name of the device for the statistics |
| stats | string |true | Statistic to send to the parent |




