---
layout: default
title: Class StorageResource
permalink: class-StorageResource
parent: classes
---

# StorageResource

Logical Resource of Network that are provisioned

![Logical Diagram](./logical.svg)

## Attributes

* name:string - Name of the resource
* ename:string - Extended name of the resource
* disabled:boolean - Disabled Resource
* type:string - Type of resource, Network, Storage, Compute or Accelerator


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| request | 1 | Request | false | false |  |
| profile | 1 | PhysicalProfile | true | true |  |
| hardware | n | Hardware | false | false |  |
| instances | n | ServiceInstance | false | false |  |
| cloud | 1 | Cloud | false | false |  |


## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |





## Methods

* [factory() - Create a Resource based on the hardware to resource table](#action-factory)

* [provision() - Provision the Resource](#action-provision)


<h2>Method Details</h2>
    
### Action storageresource factory

* REST - storageresource/factory
* bin - storageresource factory
* js - storageresource.factory

Create a Resource based on the hardware to resource table

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the Resource |
| value | object |true | value of the hardware |




### Action storageresource provision

* REST - storageresource/provision
* bin - storageresource provision
* js - storageresource.provision

Provision the Resource

| Name | Type | Required | Description |
|---|---|---|---|





