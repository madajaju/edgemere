
# Common Physical Layer

Common Physical Layer is a package that contains...



## Use Cases

* [Manage Data Center](usecsaes/ManageDataCenter/index.md)
* [Manage Infrastructure](usecsaes/ManageInfrastructure/index.md)


![UseCase Diagram](./usecases.svg)

## Users
* [ITOperations](/actors/itops)


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/cpl/adddevices](./action//edgemere/cpl/adddevices)
* [/edgemere/cpl/provision](./action//edgemere/cpl/provision)
* [/edgemere/cpl/reserve](./action//edgemere/cpl/reserve)
* [/edgemere/cpl/data/govern](./action//edgemere/cpl/data/govern)
* [/edgemere/cpl/data/source](./action//edgemere/cpl/data/source)
* [/edgemere/cpl/datacenter/create](./action//edgemere/cpl/datacenter/create)
* [/edgemere/cpl/datacenter/disable](./action//edgemere/cpl/datacenter/disable)
* [/edgemere/cpl/datacenter/enable](./action//edgemere/cpl/datacenter/enable)
* [/edgemere/cpl/datacenter/list](./action//edgemere/cpl/datacenter/list)
* [/edgemere/cpl/datacenter/remove](./action//edgemere/cpl/datacenter/remove)
* [/edgemere/cpl/datacenter/update](./action//edgemere/cpl/datacenter/update)
* [/edgemere/cpl/device/disable](./action//edgemere/cpl/device/disable)
* [/edgemere/cpl/device/enable](./action//edgemere/cpl/device/enable)


## Logical Artifacts
The Data Model for the  Common Physical Layer shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

* [Device Agent](./da/index.md)
* [Device Manager](./dm/index.md)
* [Telemetry Aggregator](./ta/index.md)
* [Telemetry Consumer](./tc/index.md)
* [Telemetry Producer](./tp/index.md)


![Logical Diagram](./logical.svg)

### Classes

* [Device](./models//edgemere/cpl/Device/index.md)
* [AggregatedDevice](./models//edgemere/cpl/AggregatedDevice/index.md)
* [Metric](./models//edgemere/cpl/Metric/index.md)
* [MetricAttribute](./models//edgemere/cpl/MetricAttribute/index.md)
* [MetricComposite](./models//edgemere/cpl/MetricComposite/index.md)
* [MetricConsumeable](./models//edgemere/cpl/MetricConsumeable/index.md)
* [PhysicalProfile](./models//edgemere/cpl/PhysicalProfile/index.md)
* [Hardware](./models//edgemere/cpl/Hardware/index.md)
* [ComputeHardware](./models//edgemere/cpl/ComputeHardware/index.md)
* [NetworkHardware](./models//edgemere/cpl/NetworkHardware/index.md)
* [StorageHardware](./models//edgemere/cpl/StorageHardware/index.md)
* [AcceleratorHardware](./models//edgemere/cpl/AcceleratorHardware/index.md)


## Activities and Flows
The Common Physical Layer subsystem provides the following activities and flows.

### Messages Handled

| Message | Action | Description |
|---|---|---|
| request.needed | Custom Action |  |
| request.needed | /cpl/reserve |  |
| reservation.rejected | Custom Action |  |
| resource.provisioning | /cpl/provision |  |


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

The Common Physical Layer subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* web : cpl_web:latest
* deviceagent : cpl_da:latest
* devicemanager : cpl_dm:latest
* telemetry : cpl_tc:latest

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* web : cpl_web:latest
* deviceagent : cpl_da:latest
* devicemanager : cpl_dm:latest
* telemetry : cpl_tc:latest

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* web : cpl_web:latest
* deviceagent : cpl_da:latest
* devicemanager : cpl_dm:latest
* telemetry : cpl_tc:latest


## Interface Details

### .edgemere.cpl.adddevices
* REST - /edgemere/cpl/adddevices
* bin -  edgemere cpl adddevices
* js - .edgemere.cpl.adddevices

Add Devices to the Data Center

| Name | Type | Required | Description |
|---|---|---|---|
| item | object |true | Devices to add to the Data Center |



### .edgemere.cpl.provision
* REST - /edgemere/cpl/provision
* bin -  edgemere cpl provision
* js - .edgemere.cpl.provision

Provision the resources on the devices

| Name | Type | Required | Description |
|---|---|---|---|
| resource | object |true | Resource to provision |



### .edgemere.cpl.reserve
* REST - /edgemere/cpl/reserve
* bin -  edgemere cpl reserve
* js - .edgemere.cpl.reserve

Get Reservations from Devices, Aggregate Deivces, and DataCenters

| Name | Type | Required | Description |
|---|---|---|---|
| request | object |true | Request for the reservation |



### .edgemere.cpl.data.govern
* REST - /edgemere/cpl/data/govern
* bin -  edgemere cpl data govern
* js - .edgemere.cpl.data.govern

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.cpl.data.source
* REST - /edgemere/cpl/data/source
* bin -  edgemere cpl data source
* js - .edgemere.cpl.data.source

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.cpl.datacenter.create
* REST - /edgemere/cpl/datacenter/create
* bin -  edgemere cpl datacenter create
* js - .edgemere.cpl.datacenter.create

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.cpl.datacenter.disable
* REST - /edgemere/cpl/datacenter/disable
* bin -  edgemere cpl datacenter disable
* js - .edgemere.cpl.datacenter.disable

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.cpl.datacenter.enable
* REST - /edgemere/cpl/datacenter/enable
* bin -  edgemere cpl datacenter enable
* js - .edgemere.cpl.datacenter.enable

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.cpl.datacenter.list
* REST - /edgemere/cpl/datacenter/list
* bin -  edgemere cpl datacenter list
* js - .edgemere.cpl.datacenter.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.cpl.datacenter.remove
* REST - /edgemere/cpl/datacenter/remove
* bin -  edgemere cpl datacenter remove
* js - .edgemere.cpl.datacenter.remove

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.cpl.datacenter.update
* REST - /edgemere/cpl/datacenter/update
* bin -  edgemere cpl datacenter update
* js - .edgemere.cpl.datacenter.update

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.cpl.device.disable
* REST - /edgemere/cpl/device/disable
* bin -  edgemere cpl device disable
* js - .edgemere.cpl.device.disable

Disable Device and all of its hardware

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |false | Name of the device |
| id | string |false | ID of the device |



### .edgemere.cpl.device.enable
* REST - /edgemere/cpl/device/enable
* bin -  edgemere cpl device enable
* js - .edgemere.cpl.device.enable

Enable Device and all of its hardware

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |false | Name of the device |
| id | string |false | ID of the device |




