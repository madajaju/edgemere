---
layout: default
title: Telemetry Producer
permalink: package--edgemere-cpl-tp
parent: Common Physical Layer
grand_parent: edgemere
---

# Telemetry Producer

Telemetry Producer is a package that contains...



## Use Cases

The following are the use cases of the Telemetry Producer subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.



![UseCase Diagram](./usecases.png)

## Users

The following are the actors of the Telemetry Producer subsystem. This can include people, other subsystems
inside the solution and even external subsystems.



![User Interaction](./userinteraction.png)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.png)

* [ edgemere cpl tp setparent](#action--edgemere-cpl-tp-setparent)
* [ edgemere cpl tp stats get](#action--edgemere-cpl-tp-stats-get)
* [ edgemere cpl tp stats send](#action--edgemere-cpl-tp-stats-send)


## Logical Artifacts

The Data Model for the  Telemetry Producer subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.png)

### Sub Packages

The Telemetry Producer subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.png)

### Classes

The following are the classes in the data model of the Telemetry Producer subsystem.




## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-cpl-tp-dev)
* [test](environment--edgemere-cpl-tp-test)
* [prod](environment--edgemere-cpl-tp-prod)



## Physical Architecture

The Telemetry Producer subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-cpl-tp-dev)
* [test](environment--edgemere-cpl-tp-test)
* [prod](environment--edgemere-cpl-tp-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-cpl-tp-dev)
can be found [here](environment--edgemere-cpl-tp-dev)

Services in the dev environment

* producer : cpl_tp_producer:latest


### test

Detail information for the [test environment](environment--edgemere-cpl-tp-test)
can be found [here](environment--edgemere-cpl-tp-test)

Services in the test environment

* producer : cpl_tp_producer:latest
* tester : cpl_tp_tester:latest


### prod

Detail information for the [prod environment](environment--edgemere-cpl-tp-prod)
can be found [here](environment--edgemere-cpl-tp-prod)

Services in the prod environment

* producer : cpl_tp_producer:latest


## Activities and Flows
The Telemetry Producer subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

| Event | Description | Emitter |
|-------|-------------|---------|



## Interface Details
The Telemetry Producer subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere cpl tp setparent



* REST - /edgemere/cpl/tp/setparent?url=string&amp;name=string
* bin -  edgemere cpl tp setparent --url string --name string
* js - .edgemere.cpl.tp.setparent({ url:string,name:string })

#### Description
Set the parent for the producer to report to

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| url | string |true | Parent of the Telemetry Producer |
| name | string |false | Name of the parent |



### Action  edgemere cpl tp stats get



* REST - /edgemere/cpl/tp/stats/get?
* bin -  edgemere cpl tp stats get 
* js - .edgemere.cpl.tp.stats.get({  })

#### Description
get the statstics for the device

#### Parameters

No parameters


### Action  edgemere cpl tp stats send



* REST - /edgemere/cpl/tp/stats/send?name=string&amp;stats=string
* bin -  edgemere cpl tp stats send --name string --stats string
* js - .edgemere.cpl.tp.stats.send({ name:string,stats:string })

#### Description
send the statstics for the managing service

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | Name of the device for the statistics |
| stats | string |true | Statistic to send to the parent |




