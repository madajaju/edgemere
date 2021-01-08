
# Software Defined Infrastructure

Software Defined Infrastructure(SDI) contains the abstractions for private and public clouds. The SDI layer is a common standard interface for all cloud resources both virutal, container, and bare metal.



## Use Cases

* [Manage Resources](usecsaes/ManageResources/index.md)


![UseCase Diagram](./usecases.svg)

## Users
* [ITOperations](/actors/itops)


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/sdi/checkrequest](./action//edgemere/sdi/checkrequest)
* [/edgemere/sdi/reserve](./action//edgemere/sdi/reserve)
* [/edgemere/sdi/resource/get](./action//edgemere/sdi/resource/get)
* [/edgemere/sdi/resource/list](./action//edgemere/sdi/resource/list)
* [/edgemere/sdi/resource/release](./action//edgemere/sdi/resource/release)


## Logical Artifacts
The Data Model for the  Software Defined Infrastructure shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

* [Infrastructure Orchestrator](./io/index.md)


![Logical Diagram](./logical.svg)

### Classes

* [AcceleratorResource](./models//edgemere/sdi/AcceleratorResource/index.md)
* [Cloud](./models//edgemere/sdi/Cloud/index.md)
* [ComputeResource](./models//edgemere/sdi/ComputeResource/index.md)
* [NetworkResource](./models//edgemere/sdi/NetworkResource/index.md)
* [Request](./models//edgemere/sdi/Request/index.md)
* [Reservation](./models//edgemere/sdi/Reservation/index.md)
* [Resource](./models//edgemere/sdi/Resource/index.md)
* [StorageResource](./models//edgemere/sdi/StorageResource/index.md)


## Activities and Flows
The Software Defined Infrastructure subsystem provides the following activities and flows.

### Messages Handled

| Message | Action | Description |
|---|---|---|
| request.satisfied | Custom Action |  |
| resource.ready | /sdi/request/reserve |  |


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

The Software Defined Infrastructure subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* orchestrator : sdi_io
* frontend : sdi_web
* gw : sdi_gw

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* orchestrator : sdi_io
* frontend : sdi_web
* gw : sdi_gw

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* orchestrator : sdi_io
* frontend : sdi_web
* gw : sdi_gw


## Interface Details

### .edgemere.sdi.checkrequest
* REST - /edgemere/sdi/checkrequest
* bin -  edgemere sdi checkrequest
* js - .edgemere.sdi.checkrequest

Check the status of the request

| Name | Type | Required | Description |
|---|---|---|---|
| request | obj |true | Cloud to request the Resources |



### .edgemere.sdi.reserve
* REST - /edgemere/sdi/reserve
* bin -  edgemere sdi reserve
* js - .edgemere.sdi.reserve

Reserve Resources from the SDI Layer

| Name | Type | Required | Description |
|---|---|---|---|
| cloud | string |true | Cloud to request the Resources |
| name | string |true | The name of the reservation. |
| requirements | YAML |true | The Requirements to create the resource |



### .edgemere.sdi.resource.get
* REST - /edgemere/sdi/resource/get
* bin -  edgemere sdi resource get
* js - .edgemere.sdi.resource.get

Get Resources from the SDI Layer

| Name | Type | Required | Description |
|---|---|---|---|
| cloud | string |true | Cloud to request the Resources |
| name | string |true | The name of the Resource to create. |
| requirements | YAML |true | The Requirements to create the resource |



### .edgemere.sdi.resource.list
* REST - /edgemere/sdi/resource/list
* bin -  edgemere sdi resource list
* js - .edgemere.sdi.resource.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sdi.resource.release
* REST - /edgemere/sdi/resource/release
* bin -  edgemere sdi resource release
* js - .edgemere.sdi.resource.release

Release Resources from the SDI Layer with the given name

| Name | Type | Required | Description |
|---|---|---|---|
| cloud | string |true | Cloud to request the Resources |
| name | string |true | The name of the Resource to create. |




