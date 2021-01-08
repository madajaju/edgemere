
# edgemere

Description needs to be written



## Use Cases



![UseCase Diagram](./usecases.svg)

## Users


![User Interaction](./userinteraction.svg)

## Interface
The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.svg)



## Logical Artifacts
The Data Model for the  edgemere shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.svg)

### Sub Packages

* [Application Management Layer](./aml/index.md)
* [Common Physical Layer](./cpl/index.md)
* [Distributed Information Management Layer](./diml/index.md)
* [Identity Aspect](./ia/index.md)
* [Security Aspect](./sa/index.md)
* [Service Management Layer](./sml/index.md)
* [Software Defined Infrastructure](./sdi/index.md)


![Logical Diagram](./logical.svg)

### Classes



## Activities and Flows
The edgemere subsystem provides the following activities and flows.

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

The edgemere subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
how they connect to each other. All of the micro-services communicate to each other and the main app through a
REST interface. A CLI, REST or Web interface for the app is how other subsystems or actors interact. Requests are
forwarded to micro-services through the REST interface of each micro-service.

![Physical Diagram](./physical.svg)

## Micro-Services
These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.

### local
Detail information for the [local environment](./envs/local/index.md) can be found [here](./envs/local/index.md)

Services in the local environment

* admin : edgemere:latest
* pubsub : redis
* web : edgemere_web
* doc : edgemere_doc

### dev
Detail information for the [dev environment](./envs/dev/index.md) can be found [here](./envs/dev/index.md)

Services in the dev environment

* admin : edgemere:latest
* aml : aml:latest
* cpl : cpl:latest
* diml : diml:latest
* ia : ia:latest
* sa : sa:latest
* sml : sml:latest
* sdi : sdi:latest
* pubsub : redis
* web : edgemere_web
* doc : edgemere_doc

### test
Detail information for the [test environment](./envs/test/index.md) can be found [here](./envs/test/index.md)

Services in the test environment

* admin : edgemere:latest
* aml : aml:latest
* cpl : cpl:latest
* diml : diml:latest
* ia : ia:latest
* sa : sa:latest
* sml : sml:latest
* sdi : sdi:latest
* pubsub : redis
* web : edgemere_web
* doc : edgemere_doc

### prod
Detail information for the [prod environment](./envs/prod/index.md) can be found [here](./envs/prod/index.md)

Services in the prod environment

* admin : edgemere:latest
* aml : aml:latest
* cpl : cpl:latest
* diml : diml:latest
* ia : ia:latest
* sa : sa:latest
* sml : sml:latest
* sdi : sdi:latest
* pubsub : redis
* web : edgemere_web
* doc : edgemere_doc


## Interface Details


