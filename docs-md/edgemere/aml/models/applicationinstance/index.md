---
layout: default
title: Class ApplicationInstance
permalink: class-ApplicationInstance
parent: classes
---

# ApplicationInstance

Application Instance that is running in the ecosystem

![Logical Diagram](./logical.svg)

## Attributes

* name:string - Name of the application instance
* status:string - Name of the application instance
* message:string - Last message in the application instance


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| assoc1 | 1 | ModelName | false | false |  |


## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| instances | n | Application | true | true |  |
| app | 1 | StackInstance | false | false | Application Instance of the stack instance |



## State Net
![State Net Diagram](./statenet.svg)

| Name | Description | Events |
| --- | --- | --- |
| Init |  | create-&gt;Initializing,  |
| Initializing |  | provisoned-&gt;Running,  |
| Running |  | kill-&gt;Stopping,  |
| Stopping |  | stopped-&gt;Stopped,  |
| Stopped |  | exit-&gt;Exit, failed-&gt;Failed,  |
| Exit |  |  |
| Failed |  |  |



## Methods


<h2>Method Details</h2>
    

