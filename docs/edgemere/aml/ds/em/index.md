---
layout: default
title: Environment Management
permalink: package--edgemere-aml-ds-em
parent: Developer Services
grand_parent: Application Management Layer
---

# Environment Management

Environment Management is a subsystem that contains models and services for managing different environments. Examples of environments are local,dev,test,production.



## Use Cases

The following are the use cases of the Environment Management subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.

* [Manage Environment](usecase-ManageEnvironment)


![UseCase Diagram](./usecases.png)

## Users

The following are the actors of the Environment Management subsystem. This can include people, other subsystems
inside the solution and even external subsystems.

* [ITOperations](actor-itops)
* [StackDeveloper](actor-stackdev)


![User Interaction](./userinteraction.png)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.png)

* [ edgemere aml ds em environment addpolicies](#action--edgemere-aml-ds-em-environment-addpolicies)
* [ edgemere aml ds em environment create](#action--edgemere-aml-ds-em-environment-create)
* [ edgemere aml ds em environment destroy](#action--edgemere-aml-ds-em-environment-destroy)
* [ edgemere aml ds em environment disable](#action--edgemere-aml-ds-em-environment-disable)
* [ edgemere aml ds em environment enable](#action--edgemere-aml-ds-em-environment-enable)
* [ edgemere aml ds em environment list](#action--edgemere-aml-ds-em-environment-list)
* [ edgemere aml ds em environment update](#action--edgemere-aml-ds-em-environment-update)


## Logical Artifacts

The Data Model for the  Environment Management subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.png)

### Sub Packages

The Environment Management subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.png)

### Classes

The following are the classes in the data model of the Environment Management subsystem.

* [Environment](class-Environment)



## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-aml-ds-em-dev)
* [test](environment--edgemere-aml-ds-em-test)
* [prod](environment--edgemere-aml-ds-em-prod)



## Physical Architecture

The Environment Management subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-aml-ds-em-dev)
* [test](environment--edgemere-aml-ds-em-test)
* [prod](environment--edgemere-aml-ds-em-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-aml-ds-em-dev)
can be found [here](environment--edgemere-aml-ds-em-dev)

Services in the dev environment

* frontend : sml_em_web
* gw : sml_em_gw


### test

Detail information for the [test environment](environment--edgemere-aml-ds-em-test)
can be found [here](environment--edgemere-aml-ds-em-test)

Services in the test environment

* frontend : sml_em_web
* gw : sml_em_gw


### prod

Detail information for the [prod environment](environment--edgemere-aml-ds-em-prod)
can be found [here](environment--edgemere-aml-ds-em-prod)

Services in the prod environment

* frontend : sml_em_web
* gw : sml_em_gw


## Activities and Flows
The Environment Management subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

| Event | Description | Emitter |
|-------|-------------|---------|
| environment.create |  When an object of type Environment is created. | Environment
| environment.destroy |  When an object of type Environment is destroyed. | Environment
| environment.updated |  When an object of type Environment has an attribute or association updated. | Environment



## Interface Details
The Environment Management subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere aml ds em environment addpolicies



* REST - /edgemere/aml/ds/em/environment/addpolicies?attr1=string
* bin -  edgemere aml ds em environment addpolicies --attr1 string
* js - .edgemere.aml.ds.em.environment.addpolicies({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere aml ds em environment create



* REST - /edgemere/aml/ds/em/environment/create?attr1=string
* bin -  edgemere aml ds em environment create --attr1 string
* js - .edgemere.aml.ds.em.environment.create({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere aml ds em environment destroy



* REST - /edgemere/aml/ds/em/environment/destroy?attr1=string
* bin -  edgemere aml ds em environment destroy --attr1 string
* js - .edgemere.aml.ds.em.environment.destroy({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere aml ds em environment disable



* REST - /edgemere/aml/ds/em/environment/disable?attr1=string
* bin -  edgemere aml ds em environment disable --attr1 string
* js - .edgemere.aml.ds.em.environment.disable({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere aml ds em environment enable



* REST - /edgemere/aml/ds/em/environment/enable?attr1=string
* bin -  edgemere aml ds em environment enable --attr1 string
* js - .edgemere.aml.ds.em.environment.enable({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere aml ds em environment list



* REST - /edgemere/aml/ds/em/environment/list?attr1=string
* bin -  edgemere aml ds em environment list --attr1 string
* js - .edgemere.aml.ds.em.environment.list({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere aml ds em environment update



* REST - /edgemere/aml/ds/em/environment/update?attr1=string
* bin -  edgemere aml ds em environment update --attr1 string
* js - .edgemere.aml.ds.em.environment.update({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




