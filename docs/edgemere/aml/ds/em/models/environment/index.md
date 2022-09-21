---
layout: default
title: Class Environment
permalink: class-Environment
parent: Classes
---

# Environment

An environment represents a group of clouds, and policies that service are deployed. Examples of environments are development, test, production

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the environment


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| clouds | n | MultiCloud | false | false |  |
| policies | 1 | PolicyCollection | false | false |  |
| profile | 1 | SecurityProfile | false | false |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| environment | 1 | Stage | false | false |  |
| env | 1 | Servicelet | false | false | Environment for the Servicelet |
| env | 1 | StackletDefinition | false | false | Environment for the Stacklet |
| env | 1 | Stacklet | false | false | Environment for the Servicelet |



## State Net
The Environment has a state net corresponding to instances of the class. Each state transistion will emit an 
event that can be caught with a websocket client. The name of the event is the name of the state in all lower case.
The following diagram is the state net for this class.

![State Net Diagram](./statenet.png)

| Name | Description | Events |
| --- | --- | --- |
| Init | Initial State | create-&gt;Enabled,  |
| Enabled | Environment is available to be used | disable-&gt;Disabled,  |
| Disabled | Environment is not available to be used | enable-&gt;Enabled,  |



## Methods


<h2>Method Details</h2>
    

