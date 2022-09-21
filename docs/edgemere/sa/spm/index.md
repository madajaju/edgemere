---
title: Package Security Profile Manager
permalink: package--edgemere-sa-spm
parent: Package Security Aspect
grand_parent: Package edgemere
---

# Security Profile Manager

Security Profile Manager manages security profiles that are used in developer services, environments, infrastructure, data, applications and individuals.



## Use Cases

The following are the use cases of the Security Profile Manager subsystem. Each use case has primary and secondary scenarios
that are elaborated in the use case descriptions.

* [Apply Security Profiles](usecase-ApplySecurityProfiles)
* [Manage Security Profiles](usecase-ManageSecurityProfiles)


![UseCase Diagram](./usecases.png)

## Users

The following are the actors of the Security Profile Manager subsystem. This can include people, other subsystems
inside the solution and even external subsystems.

* [SecurityOperator](actor-securityoperator)
* [SecurityEngineer](actor-securityengineer)


![User Interaction](./userinteraction.png)

## Interface

The subsystem has a REST, CLI, WebSocket, and Web interface. Use Cases and Scenarios can use any or all
of the interfaces to perform the work that needs to be completed. The following  diagram shows how
users interact with the system.

![Scenario Mappings Diagram](./scenariomapping.png)

* [ edgemere sa spm data create](#action--edgemere-sa-spm-data-create)
* [ edgemere sa spm data govern](#action--edgemere-sa-spm-data-govern)
* [ edgemere sa spm securityprofile attach](#action--edgemere-sa-spm-securityprofile-attach)
* [ edgemere sa spm securityprofile create](#action--edgemere-sa-spm-securityprofile-create)
* [ edgemere sa spm securityprofile deploy](#action--edgemere-sa-spm-securityprofile-deploy)
* [ edgemere sa spm securityprofile destroy](#action--edgemere-sa-spm-securityprofile-destroy)
* [ edgemere sa spm securityprofile disable](#action--edgemere-sa-spm-securityprofile-disable)
* [ edgemere sa spm securityprofile enable](#action--edgemere-sa-spm-securityprofile-enable)
* [ edgemere sa spm securityprofile list](#action--edgemere-sa-spm-securityprofile-list)
* [ edgemere sa spm securityprofile status](#action--edgemere-sa-spm-securityprofile-status)
* [ edgemere sa spm securityprofile test](#action--edgemere-sa-spm-securityprofile-test)


## Logical Artifacts

The Data Model for the  Security Profile Manager subsystem shows how the different objects and classes of object interact
and their structure.

![Sub Package Diagram](./subpackage.png)

### Sub Packages

The Security Profile Manager subsystem has sub packages as well. These subsystems are logical components to better
organize the architecture and make it easier to analyze, understand, design, and implement.



![Logical Diagram](./logical.png)

### Classes

The following are the classes in the data model of the Security Profile Manager subsystem.

* [SecurityProfile](class-SecurityProfile)



## Deployment Architecture

This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system. The subsystem also has an CLI, REST and Web Interface
exposed through a nodejs application. The nodejs application will interface with the micro-services and
can monitor and drive work-flows through the mesh of micro-services. The deployment of the subsystem is
dependent on the environment it is deployed. This subsystem has the following environments:
* [dev](environment--edgemere-sa-spm-dev)
* [test](environment--edgemere-sa-spm-test)
* [prod](environment--edgemere-sa-spm-prod)



## Physical Architecture

The Security Profile Manager subsystem is physically laid out on a hybrid cloud infrastructure. Each microservice belongs
to a secure micro-segmented network. All of the micro-services communicate to each other and the main app through a
REST interface. A Command Line Interface (CLI), REST or Web User interface for the app is how other subsystems or actors
interact. Requests are forwarded to micro-services through the REST interface of each micro-service. The subsystem has
the a unique layout based on the environment the physical space. The following are the environments for this
subsystems.
* [dev](environment--edgemere-sa-spm-dev)
* [test](environment--edgemere-sa-spm-test)
* [prod](environment--edgemere-sa-spm-prod)


## Micro-Services

These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.


### dev

Detail information for the [dev environment](environment--edgemere-sa-spm-dev)
can be found [here](environment--edgemere-sa-spm-dev)

Services in the dev environment

* child : child_image:latest
* frontend : s_spm_web
* gw : s_spm_gw


### test

Detail information for the [test environment](environment--edgemere-sa-spm-test)
can be found [here](environment--edgemere-sa-spm-test)

Services in the test environment

* child : child_image:latest
* frontend : s_spm_web
* gw : s_spm_gw


### prod

Detail information for the [prod environment](environment--edgemere-sa-spm-prod)
can be found [here](environment--edgemere-sa-spm-prod)

Services in the prod environment

* child : child_image:latest
* frontend : s_spm_web
* gw : s_spm_gw


## Activities and Flows
The Security Profile Manager subsystem provides the following activities and flows that help satisfy the use
cases and scenarios of the subsystem.




### Messages Sent

| Event | Description | Emitter |
|-------|-------------|---------|
| securityprofile.create |  When an object of type SecurityProfile is created. | SecurityProfile
| securityprofile.destroy |  When an object of type SecurityProfile is destroyed. | SecurityProfile
| securityprofile.updated |  When an object of type SecurityProfile has an attribute or association updated. | SecurityProfile



## Interface Details
The Security Profile Manager subsystem has a well defined interface. This interface can be accessed using a
command line interface (CLI), REST interface, and Web user interface. This interface is how all other
subsystems and actors can access the system.

### Action  edgemere sa spm data create



* REST - /edgemere/sa/spm/data/create?attr1=string
* bin -  edgemere sa spm data create --attr1 string
* js - .edgemere.sa.spm.data.create({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm data govern



* REST - /edgemere/sa/spm/data/govern?attr1=string
* bin -  edgemere sa spm data govern --attr1 string
* js - .edgemere.sa.spm.data.govern({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm securityprofile attach



* REST - /edgemere/sa/spm/securityprofile/attach?attr1=string
* bin -  edgemere sa spm securityprofile attach --attr1 string
* js - .edgemere.sa.spm.securityprofile.attach({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm securityprofile create



* REST - /edgemere/sa/spm/securityprofile/create?attr1=string
* bin -  edgemere sa spm securityprofile create --attr1 string
* js - .edgemere.sa.spm.securityprofile.create({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm securityprofile deploy



* REST - /edgemere/sa/spm/securityprofile/deploy?attr1=string
* bin -  edgemere sa spm securityprofile deploy --attr1 string
* js - .edgemere.sa.spm.securityprofile.deploy({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm securityprofile destroy



* REST - /edgemere/sa/spm/securityprofile/destroy?attr1=string
* bin -  edgemere sa spm securityprofile destroy --attr1 string
* js - .edgemere.sa.spm.securityprofile.destroy({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm securityprofile disable



* REST - /edgemere/sa/spm/securityprofile/disable?attr1=string
* bin -  edgemere sa spm securityprofile disable --attr1 string
* js - .edgemere.sa.spm.securityprofile.disable({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm securityprofile enable



* REST - /edgemere/sa/spm/securityprofile/enable?attr1=string
* bin -  edgemere sa spm securityprofile enable --attr1 string
* js - .edgemere.sa.spm.securityprofile.enable({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm securityprofile list



* REST - /edgemere/sa/spm/securityprofile/list?attr1=string
* bin -  edgemere sa spm securityprofile list --attr1 string
* js - .edgemere.sa.spm.securityprofile.list({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm securityprofile status



* REST - /edgemere/sa/spm/securityprofile/status?attr1=string
* bin -  edgemere sa spm securityprofile status --attr1 string
* js - .edgemere.sa.spm.securityprofile.status({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |



### Action  edgemere sa spm securityprofile test



* REST - /edgemere/sa/spm/securityprofile/test?attr1=string
* bin -  edgemere sa spm securityprofile test --attr1 string
* js - .edgemere.sa.spm.securityprofile.test({ attr1:string })

#### Description
Description of the action

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




