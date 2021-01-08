
# Environment Management

Environment Management is a subsystem that contains models and services for managing different environments. Examples of environments are local,dev,test,production.



## Use Cases

* [Manage Environment](usecsaes/ManageEnvironment/index.md)


![UseCase Diagram](./usecases.svg)

## Users
* [ITOperations](/actors/itops)
* [StackDeveloper](/actors/stackdev)


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [/edgemere/sml/em/environment/addpolicies](./action//edgemere/sml/em/environment/addpolicies)
* [/edgemere/sml/em/environment/create](./action//edgemere/sml/em/environment/create)
* [/edgemere/sml/em/environment/destroy](./action//edgemere/sml/em/environment/destroy)
* [/edgemere/sml/em/environment/disable](./action//edgemere/sml/em/environment/disable)
* [/edgemere/sml/em/environment/enable](./action//edgemere/sml/em/environment/enable)
* [/edgemere/sml/em/environment/list](./action//edgemere/sml/em/environment/list)
* [/edgemere/sml/em/environment/update](./action//edgemere/sml/em/environment/update)


## Logical Artifacts
The Data Model for the  Environment Management shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages



![Logical Diagram](./logical.svg)

### Classes

* [Environment](./models//edgemere/sml/em/Environment/index.md)


## Activities and Flows
The Environment Management subsystem provides the following activities and flows.

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

The Environment Management subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
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

* frontend : sml_em_web
* gw : sml_em_gw

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* frontend : sml_em_web
* gw : sml_em_gw

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* frontend : sml_em_web
* gw : sml_em_gw


## Interface Details

### .edgemere.sml.em.environment.addpolicies
* REST - /edgemere/sml/em/environment/addpolicies
* bin -  edgemere sml em environment addpolicies
* js - .edgemere.sml.em.environment.addpolicies

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.em.environment.create
* REST - /edgemere/sml/em/environment/create
* bin -  edgemere sml em environment create
* js - .edgemere.sml.em.environment.create

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.em.environment.destroy
* REST - /edgemere/sml/em/environment/destroy
* bin -  edgemere sml em environment destroy
* js - .edgemere.sml.em.environment.destroy

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.em.environment.disable
* REST - /edgemere/sml/em/environment/disable
* bin -  edgemere sml em environment disable
* js - .edgemere.sml.em.environment.disable

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.em.environment.enable
* REST - /edgemere/sml/em/environment/enable
* bin -  edgemere sml em environment enable
* js - .edgemere.sml.em.environment.enable

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.em.environment.list
* REST - /edgemere/sml/em/environment/list
* bin -  edgemere sml em environment list
* js - .edgemere.sml.em.environment.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### .edgemere.sml.em.environment.update
* REST - /edgemere/sml/em/environment/update
* bin -  edgemere sml em environment update
* js - .edgemere.sml.em.environment.update

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




