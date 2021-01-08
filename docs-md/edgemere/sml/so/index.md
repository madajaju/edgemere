
# Service Orchestrator

Service Orchestrator builds landscape requests for the service or stack. The Landscape Request is generated from the service and stack deployments and coordinates with the Infrastructure Orchestrator Data Orchestrator, and the Application Orchestrator.



## Use Cases

* [Manage Stacks](usecsaes/ManageStacks/index.md)


![UseCase Diagram](./usecases.svg)

## Users
* [StackDeveloper](/actors/stackdev)
* [ApplicationDeveloper](/actors/applicationdeveloper)


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/sml/so/servicelet/assigndata](./action//edgemere/sml/so/servicelet/assigndata)
* [/edgemere/sml/so/stack/deploy](./action//edgemere/sml/so/stack/deploy)
* [/edgemere/sml/so/stack/list](./action//edgemere/sml/so/stack/list)
* [/edgemere/sml/so/stack/uninstall](./action//edgemere/sml/so/stack/uninstall)
* [/edgemere/sml/so/stack/update](./action//edgemere/sml/so/stack/update)


## Logical Artifacts
The Data Model for the  Service Orchestrator shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages



![Logical Diagram](./logical.svg)

### Classes

* [ServiceInstance](./models//edgemere/sml/so/ServiceInstance/index.md)
* [StackInstance](./models//edgemere/sml/so/StackInstance/index.md)


## Activities and Flows
The Service Orchestrator subsystem provides the following activities and flows.

### Messages Handled

| Message | Action | Description |
|---|---|---|
| datareference.provisioned | /sml/so/servicelet/assignData |  |


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

The Service Orchestrator subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* frontend : sml_so_web
* gw : sml_so_gw

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* frontend : sml_so_web
* gw : sml_so_gw

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* frontend : sml_so_web
* gw : sml_so_gw


## Interface Details

### .edgemere.sml.so.servicelet.assigndata
* REST - /edgemere/sml/so/servicelet/assigndata
* bin -  edgemere sml so servicelet assigndata
* js - .edgemere.sml.so.servicelet.assigndata

Assign Data Instances from the Data Reference

| Name | Type | Required | Description |
|---|---|---|---|
| servicelet | ref |true | ServiceInstance to connect the Data Reference Instance |
| dataReference | ref |true | Data Reference to get the instances |



### .edgemere.sml.so.stack.deploy
* REST - /edgemere/sml/so/stack/deploy
* bin -  edgemere sml so stack deploy
* js - .edgemere.sml.so.stack.deploy

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |false | Name of the stack to deploy |
| tag | string |false | Tag of the deployment of the stack. This is used to reference the deployed stack. |
| env | string |false | Name of the deployment environment |
| args | json |false | Arguments passed into the stack deployment |



### .edgemere.sml.so.stack.list
* REST - /edgemere/sml/so/stack/list
* bin -  edgemere sml so stack list
* js - .edgemere.sml.so.stack.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.so.stack.uninstall
* REST - /edgemere/sml/so/stack/uninstall
* bin -  edgemere sml so stack uninstall
* js - .edgemere.sml.so.stack.uninstall

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.so.stack.update
* REST - /edgemere/sml/so/stack/update
* bin -  edgemere sml so stack update
* js - .edgemere.sml.so.stack.update

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




