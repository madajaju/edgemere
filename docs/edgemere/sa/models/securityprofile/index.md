---
layout: default
title: Class SecurityProfile
permalink: class-SecurityProfile
parent: classes
---

# SecurityProfile

A security profile consist of a set of security policies that are deployed against a specific environment, application, stack, individual (Identity element).

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the security profile.


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| policies | n | Policy | true | true |  |
| enforcing | n | Identity | false |  |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| profile | 1 | Environment | false | false |  |





## Methods


<h2>Method Details</h2>
    

