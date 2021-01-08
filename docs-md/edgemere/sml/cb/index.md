
# Cloud Broker

Cloud Broker is a subsystem that creates multi-clouds and manages their policies, services, clouds, and resource instance types. 



## Use Cases

* [Find Resources](usecsaes/FindResources/index.md)
* [ManageBilling](usecsaes/ManageBilling/index.md)
* [ManageCostModel](usecsaes/ManageCostModel/index.md)
* [Manage Multi Cloud](usecsaes/ManageMultiCloud/index.md)
* [Map Assets to Cloud](usecsaes/MapAssetstoCloud/index.md)
* [Map Services to Resources](usecsaes/MapServicestoResources/index.md)


![UseCase Diagram](./usecases.svg)

## Users
* [ITOperations](/actors/itops)


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/sml/cb/billing/list](./action//edgemere/sml/cb/billing/list)
* [/edgemere/sml/cb/data/govern](./action//edgemere/sml/cb/data/govern)
* [/edgemere/sml/cb/multicloud/addclouds](./action//edgemere/sml/cb/multicloud/addclouds)
* [/edgemere/sml/cb/multicloud/addpolicies](./action//edgemere/sml/cb/multicloud/addpolicies)
* [/edgemere/sml/cb/multicloud/list](./action//edgemere/sml/cb/multicloud/list)
* [/edgemere/sml/cb/multicloud/mapresources](./action//edgemere/sml/cb/multicloud/mapresources)
* [/edgemere/sml/cb/multicloud/removepolicies](./action//edgemere/sml/cb/multicloud/removepolicies)
* [/edgemere/sml/cb/resourceinstancetype/list](./action//edgemere/sml/cb/resourceinstancetype/list)
* [/edgemere/sml/cb/resources/find](./action//edgemere/sml/cb/resources/find)
* [/edgemere/sml/cb/service/mapresources](./action//edgemere/sml/cb/service/mapresources)


## Logical Artifacts
The Data Model for the  Cloud Broker shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages



![Logical Diagram](./logical.svg)

### Classes

* [CloudType](./models//edgemere/sml/cb/CloudType/index.md)
* [ResourceCost](./models//edgemere/sml/cb/ResourceCost/index.md)
* [ResourceInstanceType](./models//edgemere/sml/cb/ResourceInstanceType/index.md)
* [ResourceMap](./models//edgemere/sml/cb/ResourceMap/index.md)


## Activities and Flows
The Cloud Broker subsystem provides the following activities and flows.

### Messages Handled

| Message | Action | Description |
|---|---|---|


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

The Cloud Broker subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* frontend : sml_cb_web
* gw : sml_cb_gw

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* frontend : sml_cb_web
* gw : sml_cb_gw

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* frontend : sml_cb_web
* gw : sml_cb_gw


## Interface Details

### .edgemere.sml.cb.billing.list
* REST - /edgemere/sml/cb/billing/list
* bin -  edgemere sml cb billing list
* js - .edgemere.sml.cb.billing.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.cb.data.govern
* REST - /edgemere/sml/cb/data/govern
* bin -  edgemere sml cb data govern
* js - .edgemere.sml.cb.data.govern

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.cb.multicloud.addclouds
* REST - /edgemere/sml/cb/multicloud/addclouds
* bin -  edgemere sml cb multicloud addclouds
* js - .edgemere.sml.cb.multicloud.addclouds

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.cb.multicloud.addpolicies
* REST - /edgemere/sml/cb/multicloud/addpolicies
* bin -  edgemere sml cb multicloud addpolicies
* js - .edgemere.sml.cb.multicloud.addpolicies

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.cb.multicloud.list
* REST - /edgemere/sml/cb/multicloud/list
* bin -  edgemere sml cb multicloud list
* js - .edgemere.sml.cb.multicloud.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.cb.multicloud.mapresources
* REST - /edgemere/sml/cb/multicloud/mapresources
* bin -  edgemere sml cb multicloud mapresources
* js - .edgemere.sml.cb.multicloud.mapresources

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.cb.multicloud.removepolicies
* REST - /edgemere/sml/cb/multicloud/removepolicies
* bin -  edgemere sml cb multicloud removepolicies
* js - .edgemere.sml.cb.multicloud.removepolicies

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.cb.resourceinstancetype.list
* REST - /edgemere/sml/cb/resourceinstancetype/list
* bin -  edgemere sml cb resourceinstancetype list
* js - .edgemere.sml.cb.resourceinstancetype.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.cb.resources.find
* REST - /edgemere/sml/cb/resources/find
* bin -  edgemere sml cb resources find
* js - .edgemere.sml.cb.resources.find

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.cb.service.mapresources
* REST - /edgemere/sml/cb/service/mapresources
* bin -  edgemere sml cb service mapresources
* js - .edgemere.sml.cb.service.mapresources

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




