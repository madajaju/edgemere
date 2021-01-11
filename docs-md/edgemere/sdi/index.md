---
layout: default
title: Software Defined Infrastructure
permalink: package--edgemere-sdi

parent: Software Defined Infrastructure



has_children: true

---
# Software Defined Infrastructure

Software Defined Infrastructure(SDI) contains the abstractions for private and public clouds. The SDI layer is a common standard interface for all cloud resources both virutal, container, and bare metal.

The Software Defined Infrastructure Layer (SDI) is a middleware layer in the architecture. And fits between the
[Common Physical](package--edgemere-cpl) and the [Distributed Information Management](package--edgemere-diml) and
[Service Management](package--edgemere-sml) layers.

![SDI](./SDI.png)

It is primarily responsible for IaaS operations and management. SDI architectural elements are very well known and
established in the industry with commercial and open source product offerings available (VMWare, OpenStack, Nutanix,
etc...). The key elements to and SDI layer are Orchestration and Control, Infrastructure elements (Storage, Network,
Compute/Accelerators, and Security), and a Common Infrastructure API Gateway.

![SDIDetail](./SDIDetail.png)

This key architectural elements are minimal viable elements for a common interface to IaaS solutions to be used in a
[Common Physical Layer](package--edgemere-cpl). The ability to interact with a common API interface reguardless of the
type of Cloud is essential for interoperability betwen the different cloud offerings both private and public. In order
to include [Edge Devices](class-device) into the ecosystem the concept of a micro cloud was developed with the same
minimal Common Infrastructure API. This concept extends the boundaries of the cloud to the edge and gives the ability to
manage infrastructure and applications across a traditionally difficult boundary.

![Clouds](./Clouds.png)

The common infrastructure API allows Multi-Cloud Orchestrator from the
[Service Management Layer](package--edgemere-sml) to request infrastructure (Bare metal, Virtual or
containerized) to deploy complex applications across several cloud offerings.


## Use Cases

The following are the use cases of the Software Defined Infrastructure subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.

* [Manage Resources](usecase-ManageResources)


![UseCase Diagram](./usecases.svg)

## Users

The following are the actors of the Software Defined Infrastructure subsystem. This can include people, other subsystems 
inside the solution and even external subsystems. 

* [ITOperations](actor-itops)


![User Interaction](./userinteraction.svg)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [ edgemere sdi checkrequest](#action--edgemere-sdi-checkrequest)
* [ edgemere sdi reserve](#action--edgemere-sdi-reserve)
* [ edgemere sdi resource get](#action--edgemere-sdi-resource-get)
* [ edgemere sdi resource list](#action--edgemere-sdi-resource-list)
* [ edgemere sdi resource release](#action--edgemere-sdi-resource-release)


## Logical Artifacts

The Data Model for the  Software Defined Infrastructure subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

The Software Defined Infrastructure subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.

* [Infrastructure Orchestrator](package--edgemere-sdi-io)


![Logical Diagram](./logical.svg)

### Classes

The following are the classes in the data model of the Software Defined Infrastructure subsystem.

* [AcceleratorResource](class-AcceleratorResource)
* [Cloud](class-Cloud)
* [ComputeResource](class-ComputeResource)
* [NetworkResource](class-NetworkResource)
* [Request](class-Request)
* [Reservation](class-Reservation)
* [Resource](class-Resource)
* [StorageResource](class-StorageResource)



## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is 
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-sdi-dev)
* [test](environment--edgemere-sdi-test)
* [prod](environment--edgemere-sdi-prod)



## Physical Architecture

The Software Defined Infrastructure subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors 
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-sdi-dev)
* [test](environment--edgemere-sdi-test)
* [prod](environment--edgemere-sdi-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-sdi-dev)
can be found [here](environment--edgemere-sdi-dev)

Services in the dev environment

* orchestrator : sdi_io
* frontend : sdi_web
* gw : sdi_gw


### test

Detail information for the [test environment](environment--edgemere-sdi-test)
can be found [here](environment--edgemere-sdi-test)

Services in the test environment

* orchestrator : sdi_io
* frontend : sdi_web
* gw : sdi_gw


### prod

Detail information for the [prod environment](environment--edgemere-sdi-prod)
can be found [here](environment--edgemere-sdi-prod)

Services in the prod environment

* orchestrator : sdi_io
* frontend : sdi_web
* gw : sdi_gw


## Activities and Flows
The Software Defined Infrastructure subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

TBD

## Interface Details
The Software Defined Infrastructure subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere sdi checkrequest

* REST - /edgemere/sdi/checkrequest
* bin -  edgemere sdi checkrequest
* js - .edgemere.sdi.checkrequest

Check the status of the request

| Name | Type | Required | Description |
|---|---|---|---|
| request | obj |true | Cloud to request the Resources |



### Action  edgemere sdi reserve

* REST - /edgemere/sdi/reserve
* bin -  edgemere sdi reserve
* js - .edgemere.sdi.reserve

Reserve Resources from the SDI Layer

| Name | Type | Required | Description |
|---|---|---|---|
| cloud | string |true | Cloud to request the Resources |
| name | string |true | The name of the reservation. |
| requirements | YAML |true | The Requirements to create the resource |



### Action  edgemere sdi resource get

* REST - /edgemere/sdi/resource/get
* bin -  edgemere sdi resource get
* js - .edgemere.sdi.resource.get

Get Resources from the SDI Layer

| Name | Type | Required | Description |
|---|---|---|---|
| cloud | string |true | Cloud to request the Resources |
| name | string |true | The name of the Resource to create. |
| requirements | YAML |true | The Requirements to create the resource |



### Action  edgemere sdi resource list

* REST - /edgemere/sdi/resource/list
* bin -  edgemere sdi resource list
* js - .edgemere.sdi.resource.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sdi resource release

* REST - /edgemere/sdi/resource/release
* bin -  edgemere sdi resource release
* js - .edgemere.sdi.resource.release

Release Resources from the SDI Layer with the given name

| Name | Type | Required | Description |
|---|---|---|---|
| cloud | string |true | Cloud to request the Resources |
| name | string |true | The name of the Resource to create. |




