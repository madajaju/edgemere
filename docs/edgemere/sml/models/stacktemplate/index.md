---
layout: default
title: Class StackTemplate
permalink: class-StackTemplate
parent: classes
---

# StackTemplate

A Stack is an aggregation of services in one context. The Stack can have any number of Services and has a stacklet for each environment in the system. Application typically have 1 or more stacks to define their applications.

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the stack
* version:string - Version of the stack
* parameters:json - Parameters of the stack [ {name:value} ]


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| stacklets | n | Stacklet | true | true | Stacklets of the stack and environment |
| stacks | n | StackDefinition | true | true | Services of the stack |
| parent | 1 | StackDefinition |  |  | Services of the stack |
| services | n | ServiceDefinition | true | true | Services of the stack |
| data | n | DataReference | false | true | Data for the stack |


## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |





## Methods

* [create() - Create a Stack](#action-create)


<h2>Method Details</h2>
    
### Action stacktemplate create

* REST - stacktemplate/create
* bin - stacktemplate create
* js - stacktemplate.create

Create a Stack

| Name | Type | Required | Description |
|---|---|---|---|





