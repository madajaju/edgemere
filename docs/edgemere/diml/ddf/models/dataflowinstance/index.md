---
layout: default
title: Class DataFlowInstance
permalink: class-DataFlowInstance
parent: Classes
---

# DataFlowInstance

This is an instance of the data flow when a blue print is instantiated.

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the Data AWorkFlow Instance


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| blueprint | 1 | DataBluePrintInstance | false | false |  |
| dataflow | 1 | DataFlow | false | false |  |
| sinks | n | DataSource | false | false |  |
| sources | n | DataSource | false | false |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| flows | n | DataBluePrintInstance | false | false |  |





## Methods
* [create() - Create a Data AWorkFlow Instance](#action-create)


<h2>Method Details</h2>
    
### Action dataflowinstance create



* REST - dataflowinstance/create?name=string&amp;sinks=json&amp;sources=json
* bin - dataflowinstance create --name string --sinks json --sources json
* js - dataflowinstance.create({ name:string,sinks:json,sources:json })

#### Description
Create a Data AWorkFlow Instance

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the data flow |
| sinks | json |false | Names of the sinks |
| sources | json |false | Names of the sources |





