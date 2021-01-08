# Service

A Service is an orchestratable element that represents a container or vm running against a resource. The actual execution of the service is tracked by the ServiceInstance. A stack is made up of multiple services.

![Logical Diagram](./logical.svg)

## Attributes

* name:string - Name of the Service
* version:string - Version of the Service
* ports:json - List of ports internally
* expose:json - List of ports to expose
* parameters:json - [ {name: value} ] - Lsit of parameters for the service


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| stack | 1 | Stack | false | false | Parent Stack of the service |
| servicelets | n | Servicelet | true | true | Servicelets of the service (Environment) |
| children | n | Service | false | false | Child services of the service |
| parent | 1 | Service | false | false | Parent of the service |
| policies | 1 | PolicyCollection | false | false | Policies of the Service |


## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| children | n | Service | false | false | Child services of the service |
| parent | 1 | Service | false | false | Parent of the service |
| service | 1 | Servicelet | false | false | Service for the servicelet, this is what service is run. This could be a service or a stack |
| services | n | Stack | true | true | Services of the stack |
| children | n | Stack | false | false | Child services of the service |
| parent | 1 | Stack | false | false | Parent of the service |
| service | 1 | Stacklet | false | false | Service for the servicelet, this is what service is run. This could be a service or a stack |





## Methods

* [create() - Create a Service](#Action-create)

* [createlet() - Create a Stack](#Action-createlet)


<h2>Method Details</h2>
    
### service.create
* REST - service/create
* bin - service create
* js - service.create

Create a Service

| Name | Type | Required | Description |
|---|---|---|---|




### service.createlet
* REST - service/createlet
* bin - service createlet
* js - service.createlet

Create a Stack

| Name | Type | Required | Description |
|---|---|---|---|





