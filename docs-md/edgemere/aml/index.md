
# Application Management Layer

Application Management Layer is responsible for the management of applications and workflows andthe development, test, deployment and updates of those applications and workloads



## Use Cases

* [Manage AI Models](usecsaes/ManageAIModels/index.md)
* [Manage Applications](usecsaes/ManageApplications/index.md)
* [Manage Workloads](usecsaes/ManageWorkloads/index.md)


![UseCase Diagram](./usecases.svg)

## Users
* [DataScientist](/actors/datascientist)
* [DevOpsEngineer](/actors/devops)
* [ApplicationDeveloper](/actors/applicationdeveloper)
* [DataEngineer](/actors/dataengineer)


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/aml/aimodel/create](./action//edgemere/aml/aimodel/create)
* [/edgemere/aml/aimodel/deploy](./action//edgemere/aml/aimodel/deploy)
* [/edgemere/aml/aimodel/destroy](./action//edgemere/aml/aimodel/destroy)
* [/edgemere/aml/aimodel/list](./action//edgemere/aml/aimodel/list)
* [/edgemere/aml/aimodel/update](./action//edgemere/aml/aimodel/update)
* [/edgemere/aml/application/create](./action//edgemere/aml/application/create)
* [/edgemere/aml/application/deploy](./action//edgemere/aml/application/deploy)
* [/edgemere/aml/application/destroy](./action//edgemere/aml/application/destroy)
* [/edgemere/aml/application/list](./action//edgemere/aml/application/list)
* [/edgemere/aml/application/monitor](./action//edgemere/aml/application/monitor)
* [/edgemere/aml/application/update](./action//edgemere/aml/application/update)
* [/edgemere/aml/workload/create](./action//edgemere/aml/workload/create)
* [/edgemere/aml/workload/deploy](./action//edgemere/aml/workload/deploy)
* [/edgemere/aml/workload/destroy](./action//edgemere/aml/workload/destroy)
* [/edgemere/aml/workload/list](./action//edgemere/aml/workload/list)
* [/edgemere/aml/workload/monitor](./action//edgemere/aml/workload/monitor)
* [/edgemere/aml/workload/update](./action//edgemere/aml/workload/update)


## Logical Artifacts
The Data Model for the  Application Management Layer shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

* [AI ML Services](./ams/index.md)
* [Analytics Services](./as/index.md)
* [Developer Services](./ds/index.md)
* [Workflow Services](./ws/index.md)


![Logical Diagram](./logical.svg)

### Classes

* [Application](./models//edgemere/aml/Application/index.md)
* [ApplicationInstance](./models//edgemere/aml/ApplicationInstance/index.md)
* [ApplicationTemplate](./models//edgemere/aml/ApplicationTemplate/index.md)
* [Workload](./models//edgemere/aml/Workload/index.md)
* [WorkloadInstance](./models//edgemere/aml/WorkloadInstance/index.md)
* [WorkloadTemplate](./models//edgemere/aml/WorkloadTemplate/index.md)


## Activities and Flows
The Application Management Layer subsystem provides the following activities and flows.

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

The Application Management Layer subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* frontend : aml_web
* gw : aml_gw

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* frontend : aml_web
* gw : aml_gw

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* frontend : aml_web
* gw : aml_gw


## Interface Details

### .edgemere.aml.aimodel.create
* REST - /edgemere/aml/aimodel/create
* bin -  edgemere aml aimodel create
* js - .edgemere.aml.aimodel.create

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.aimodel.deploy
* REST - /edgemere/aml/aimodel/deploy
* bin -  edgemere aml aimodel deploy
* js - .edgemere.aml.aimodel.deploy

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.aimodel.destroy
* REST - /edgemere/aml/aimodel/destroy
* bin -  edgemere aml aimodel destroy
* js - .edgemere.aml.aimodel.destroy

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.aimodel.list
* REST - /edgemere/aml/aimodel/list
* bin -  edgemere aml aimodel list
* js - .edgemere.aml.aimodel.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.aimodel.update
* REST - /edgemere/aml/aimodel/update
* bin -  edgemere aml aimodel update
* js - .edgemere.aml.aimodel.update

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.application.create
* REST - /edgemere/aml/application/create
* bin -  edgemere aml application create
* js - .edgemere.aml.application.create

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.application.deploy
* REST - /edgemere/aml/application/deploy
* bin -  edgemere aml application deploy
* js - .edgemere.aml.application.deploy

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.application.destroy
* REST - /edgemere/aml/application/destroy
* bin -  edgemere aml application destroy
* js - .edgemere.aml.application.destroy

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.application.list
* REST - /edgemere/aml/application/list
* bin -  edgemere aml application list
* js - .edgemere.aml.application.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.application.monitor
* REST - /edgemere/aml/application/monitor
* bin -  edgemere aml application monitor
* js - .edgemere.aml.application.monitor

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.application.update
* REST - /edgemere/aml/application/update
* bin -  edgemere aml application update
* js - .edgemere.aml.application.update

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.workload.create
* REST - /edgemere/aml/workload/create
* bin -  edgemere aml workload create
* js - .edgemere.aml.workload.create

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.workload.deploy
* REST - /edgemere/aml/workload/deploy
* bin -  edgemere aml workload deploy
* js - .edgemere.aml.workload.deploy

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.workload.destroy
* REST - /edgemere/aml/workload/destroy
* bin -  edgemere aml workload destroy
* js - .edgemere.aml.workload.destroy

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.workload.list
* REST - /edgemere/aml/workload/list
* bin -  edgemere aml workload list
* js - .edgemere.aml.workload.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.workload.monitor
* REST - /edgemere/aml/workload/monitor
* bin -  edgemere aml workload monitor
* js - .edgemere.aml.workload.monitor

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.aml.workload.update
* REST - /edgemere/aml/workload/update
* bin -  edgemere aml workload update
* js - .edgemere.aml.workload.update

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




