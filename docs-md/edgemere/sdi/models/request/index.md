---
layout: default
title: Class Request
permalink: class-Request
parent: classes
---

# Request

This represents a request being made for a resource in the cloud. This is only the request a set of reservations will be created for each request. When the request is satisfied the requestwill change state to Satisfied, and be returned to the requesterlong description

![Logical Diagram](./logical.svg)

## Attributes

* name:string - Name of the request being made
* ename:string - Extended Name of the request being made. It contains the lineage of the request in the name
* type:string - This is the type of resource being requested
* message:string - Last message about the request


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| requirements | 1 | MetricComposite | true | true |  |
| reservations | n | Reservation | false | true |  |
| resources | n | Resource | false | true |  |
| cloud | 1 | Cloud | false | false |  |
| datacenters | n | DataCenter | false | false |  |
| devices | n | Device | false | false |  |
| aggregates | n | AggregatedDevice | false | false |  |


## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| request | 1 | AcceleratorResource | false | false |  |
| requests | n | Cloud | false | true |  |
| request | 1 | ComputeResource | false | false |  |
| request | 1 | NetworkResource | false | false |  |
| request | 1 | Reservation | false | false |  |
| request | 1 | Resource | false | false |  |
| request | 1 | StorageResource | false | false |  |



## State Net
![State Net Diagram](./statenet.svg)

| Name | Description | Events |
| --- | --- | --- |
| Init | Initial state for the Request. | fulfill-&gt;Needed,  |
| Needed | Request needs to be satisfied. Anyone that can satisfy it should be notified. | selected-&gt;Selected, failed-&gt;Failed,  |
| Failed | The Request has failed to be fully satisfied. All reservations are rejected |  |
| Selected | The Request has been selected for target. Reservations are created. | evaluated-&gt;Evaluated,  |
| Satisfied | The Request if fully satisfied. The Reservations have been rejected or accepted | complete-&gt;Completed,  |
| Evaluated | The Request has been evaluated but not satisfied yet. | satisfied-&gt;Satisfied, failed-&gt;Failed,  |
| Completed | The Request is completed. |  |



## Methods

* [confirm() - Description of the method](#action-confirm)

* [evaluated() - The Request is evaluated](#action-evaluated)

* [failed() - Request Failed](#action-failed)

* [fulfill() - Fulfill the request, the state of the request is moved to needed](#action-fulfill)

* [satisfied() - The Request is staisfied](#action-satisfied)


<h2>Method Details</h2>
    
### Action request confirm

* REST - request/confirm
* bin - request confirm
* js - request.confirm

Description of the method

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




### Action request evaluated

* REST - request/evaluated
* bin - request evaluated
* js - request.evaluated

The Request is evaluated

| Name | Type | Required | Description |
|---|---|---|---|




### Action request failed

* REST - request/failed
* bin - request failed
* js - request.failed

Request Failed

| Name | Type | Required | Description |
|---|---|---|---|
| message | string |false | Reason why this failed |




### Action request fulfill

* REST - request/fulfill
* bin - request fulfill
* js - request.fulfill

Fulfill the request, the state of the request is moved to needed

| Name | Type | Required | Description |
|---|---|---|---|
| datacenters | object |true | Datacenters to be used for the fulfillment |
| devices | object |true | Devices to be used for the fulfillment |
| aggregates | object |true | Aggregates to be used for the fulfillment |




### Action request satisfied

* REST - request/satisfied
* bin - request satisfied
* js - request.satisfied

The Request is staisfied

| Name | Type | Required | Description |
|---|---|---|---|





