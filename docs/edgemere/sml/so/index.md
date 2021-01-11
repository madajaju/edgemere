---
layout: default
title: Service Orchestrator
permalink: package--edgemere-sml-so
parent: Service Management Layer
grand_parent: edgemere
---
# Service Orchestrator

Service Orchestrator builds landscape requests for the service or stack. The Landscape Request is generated from the service and stack deployments and coordinates with the Infrastructure Orchestrator Data Orchestrator, and the Application Orchestrator.



## Use Cases

The following are the use cases of the Service Orchestrator subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.

* [Manage Stacks](usecase-ManageStacks)


![UseCase Diagram](./usecases.svg)

## Users

The following are the actors of the Service Orchestrator subsystem. This can include people, other subsystems 
inside the solution and even external subsystems. 

* [StackDeveloper](actor-stackdev)
* [ApplicationDeveloper](actor-applicationdeveloper)


![User Interaction](./userinteraction.svg)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)

* [ edgemere sml so servicelet assigndata](#action--edgemere-sml-so-servicelet-assigndata)
* [ edgemere sml so stack deploy](#action--edgemere-sml-so-stack-deploy)
* [ edgemere sml so stack list](#action--edgemere-sml-so-stack-list)
* [ edgemere sml so stack uninstall](#action--edgemere-sml-so-stack-uninstall)
* [ edgemere sml so stack update](#action--edgemere-sml-so-stack-update)


## Logical Artifacts

The Data Model for the  Service Orchestrator subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

The Service Orchestrator subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.svg)

### Classes

The following are the classes in the data model of the Service Orchestrator subsystem.

* [ServiceInstance](class-ServiceInstance)
* [StackInstance](class-StackInstance)



## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is 
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-sml-so-dev)
* [test](environment--edgemere-sml-so-test)
* [prod](environment--edgemere-sml-so-prod)



## Physical Architecture

The Service Orchestrator subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors 
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-sml-so-dev)
* [test](environment--edgemere-sml-so-test)
* [prod](environment--edgemere-sml-so-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-sml-so-dev)
can be found [here](environment--edgemere-sml-so-dev)

Services in the dev environment

* frontend : sml_so_web
* gw : sml_so_gw


### test

Detail information for the [test environment](environment--edgemere-sml-so-test)
can be found [here](environment--edgemere-sml-so-test)

Services in the test environment

* frontend : sml_so_web
* gw : sml_so_gw


### prod

Detail information for the [prod environment](environment--edgemere-sml-so-prod)
can be found [here](environment--edgemere-sml-so-prod)

Services in the prod environment

* frontend : sml_so_web
* gw : sml_so_gw


## Activities and Flows
The Service Orchestrator subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

TBD

## Interface Details
The Service Orchestrator subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere sml so servicelet assigndata

* REST - /edgemere/sml/so/servicelet/assigndata
* bin -  edgemere sml so servicelet assigndata
* js - .edgemere.sml.so.servicelet.assigndata

Assign Data Instances from the Data Reference

| Name | Type | Required | Description |
|---|---|---|---|
| servicelet | ref |true | ServiceInstance to connect the Data Reference Instance |
| dataReference | ref |true | Data Reference to get the instances |



### Action  edgemere sml so stack deploy

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



### Action  edgemere sml so stack list

* REST - /edgemere/sml/so/stack/list
* bin -  edgemere sml so stack list
* js - .edgemere.sml.so.stack.list

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sml so stack uninstall

* REST - /edgemere/sml/so/stack/uninstall
* bin -  edgemere sml so stack uninstall
* js - .edgemere.sml.so.stack.uninstall

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sml so stack update

* REST - /edgemere/sml/so/stack/update
* bin -  edgemere sml so stack update
* js - .edgemere.sml.so.stack.update

Description of the action

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




