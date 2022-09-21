---
layout: default
title: Class DataFlow
permalink: class-DataFlow
parent: Classes
---

# DataFlow

Flow of Data through its transformation

![Logical Diagram](./logical.png)

## Attributes

* name:string - name of the data flow
* version:string - version of the data flow
* parameters:string - parameters of the data flow


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| blueprint | 1 | DataBluePrint | false | false |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| dataflow | 1 | DataFlowInstance | false | false |  |
| flow | 1 | DataFlowTemplate | false | false |  |
| flows | n | DataPipeline | false | false |  |





## Methods

* [create() - Create a Data Flow](#action-create)


<h2>Method Details</h2>
    
### Action dataflow create



* REST - dataflow/create?name=string&amp;file=YAML
* bin - dataflow create --name string --file YAML
* js - dataflow.create({ name:string,file:YAML })

#### Description
Create a Data Flow

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the data flow |
| file | YAML |false | file with the definition |





