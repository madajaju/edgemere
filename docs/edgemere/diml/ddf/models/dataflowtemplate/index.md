---
layout: default
title: Class DataFlowTemplate
permalink: class-DataFlowTemplate
parent: Classes
---

# DataFlowTemplate

Data AWorkFlow Template is how a Blue Print refrences a Data AWorkFlow with late binding of sources and sinks when data sources are added to a blueprint.

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the data flow in the blue print


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| flow | 1 | DataFlow | false | false |  |
| sources | n | DataAdaptorTemplate | false | false |  |
| sinks | n | DataAdaptorTemplate | false | false |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| flows | n | DataBluePrint | false | true |  |





## Methods
* [create() - Create a Data AWorkFlow Template](#action-create)


<h2>Method Details</h2>
    
### Action dataflowtemplate create



* REST - dataflowtemplate/create?name=string&amp;sinks=json&amp;sources=json
* bin - dataflowtemplate create --name string --sinks json --sources json
* js - dataflowtemplate.create({ name:string,sinks:json,sources:json })

#### Description
Create a Data AWorkFlow Template

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the data flow template |
| sinks | json |false | Names of the sinks |
| sources | json |false | Names of the sources |





