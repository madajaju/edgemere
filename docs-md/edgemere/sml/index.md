
# Service Management Layer

Service Management Layer is a subsystem that manages services, stacks, environments, and multi-clouds.



## Use Cases

* [Manage Clouds](usecsaes/ManageClouds/index.md)
* [Manage Services](usecsaes/ManageServices/index.md)


![UseCase Diagram](./usecases.svg)

## Users
* [ITOperations](/actors/itops)
* [StackDeveloper](/actors/stackdev)
* [ApplicationDeveloper](/actors/applicationdeveloper)


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/sml/cloud/list](./action//edgemere/sml/cloud/list)
* [/edgemere/sml/data/govern](./action//edgemere/sml/data/govern)
* [/edgemere/sml/data/source/name](./action//edgemere/sml/data/source/name)
* [/edgemere/sml/environmenet/addpolicies](./action//edgemere/sml/environmenet/addpolicies)
* [/edgemere/sml/environment/create](./action//edgemere/sml/environment/create)
* [/edgemere/sml/environment/destroy](./action//edgemere/sml/environment/destroy)
* [/edgemere/sml/environment/disable](./action//edgemere/sml/environment/disable)
* [/edgemere/sml/environment/enable](./action//edgemere/sml/environment/enable)
* [/edgemere/sml/environment/list](./action//edgemere/sml/environment/list)
* [/edgemere/sml/environment/update](./action//edgemere/sml/environment/update)
* [/edgemere/sml/multicloud/addclouds](./action//edgemere/sml/multicloud/addclouds)
* [/edgemere/sml/multicloud/addpolicies](./action//edgemere/sml/multicloud/addpolicies)
* [/edgemere/sml/multicloud/list](./action//edgemere/sml/multicloud/list)
* [/edgemere/sml/multicloud/removepolicies](./action//edgemere/sml/multicloud/removepolicies)
* [/edgemere/sml/service/list](./action//edgemere/sml/service/list)
* [/edgemere/sml/stack/list](./action//edgemere/sml/stack/list)


## Logical Artifacts
The Data Model for the  Service Management Layer shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

* [Cloud Broker](./cb/index.md)
* [Environment Management](./em/index.md)
* [Provision Engine](./pe/index.md)
* [Service Controller](./sc/index.md)
* [Service Orchestrator](./so/index.md)
* [Service Repository](./sr/index.md)


![Logical Diagram](./logical.svg)

### Classes

* [Image](./models//edgemere/sml/Image/index.md)
* [MultiCloud](./models//edgemere/sml/MultiCloud/index.md)
* [RunScript](./models//edgemere/sml/RunScript/index.md)
* [Service](./models//edgemere/sml/Service/index.md)
* [ServiceTemplate](./models//edgemere/sml/ServiceTemplate/index.md)
* [Servicelet](./models//edgemere/sml/Servicelet/index.md)
* [Stack](./models//edgemere/sml/Stack/index.md)
* [StackTemplate](./models//edgemere/sml/StackTemplate/index.md)
* [Stacklet](./models//edgemere/sml/Stacklet/index.md)
* [StackletDefinition](./models//edgemere/sml/StackletDefinition/index.md)


## Activities and Flows
The Service Management Layer subsystem provides the following activities and flows.

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

The Service Management Layer subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* frontend : sml_web
* gw : sml_gw

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* frontend : sml_web
* gw : sml_gw

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* frontend : sml_web
* gw : sml_gw


## Interface Details

### .edgemere.sml.cloud.list
* REST - /edgemere/sml/cloud/list
* bin -  edgemere sml cloud list
* js - .edgemere.sml.cloud.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.data.govern
* REST - /edgemere/sml/data/govern
* bin -  edgemere sml data govern
* js - .edgemere.sml.data.govern

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.data.source.name
* REST - /edgemere/sml/data/source/name
* bin -  edgemere sml data source name
* js - .edgemere.sml.data.source.name

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.environmenet.addpolicies
* REST - /edgemere/sml/environmenet/addpolicies
* bin -  edgemere sml environmenet addpolicies
* js - .edgemere.sml.environmenet.addpolicies

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.environment.create
* REST - /edgemere/sml/environment/create
* bin -  edgemere sml environment create
* js - .edgemere.sml.environment.create

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.environment.destroy
* REST - /edgemere/sml/environment/destroy
* bin -  edgemere sml environment destroy
* js - .edgemere.sml.environment.destroy

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.environment.disable
* REST - /edgemere/sml/environment/disable
* bin -  edgemere sml environment disable
* js - .edgemere.sml.environment.disable

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.environment.enable
* REST - /edgemere/sml/environment/enable
* bin -  edgemere sml environment enable
* js - .edgemere.sml.environment.enable

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.environment.list
* REST - /edgemere/sml/environment/list
* bin -  edgemere sml environment list
* js - .edgemere.sml.environment.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.environment.update
* REST - /edgemere/sml/environment/update
* bin -  edgemere sml environment update
* js - .edgemere.sml.environment.update

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.multicloud.addclouds
* REST - /edgemere/sml/multicloud/addclouds
* bin -  edgemere sml multicloud addclouds
* js - .edgemere.sml.multicloud.addclouds

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.multicloud.addpolicies
* REST - /edgemere/sml/multicloud/addpolicies
* bin -  edgemere sml multicloud addpolicies
* js - .edgemere.sml.multicloud.addpolicies

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.multicloud.list
* REST - /edgemere/sml/multicloud/list
* bin -  edgemere sml multicloud list
* js - .edgemere.sml.multicloud.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.multicloud.removepolicies
* REST - /edgemere/sml/multicloud/removepolicies
* bin -  edgemere sml multicloud removepolicies
* js - .edgemere.sml.multicloud.removepolicies

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.service.list
* REST - /edgemere/sml/service/list
* bin -  edgemere sml service list
* js - .edgemere.sml.service.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.stack.list
* REST - /edgemere/sml/stack/list
* bin -  edgemere sml stack list
* js - .edgemere.sml.stack.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




