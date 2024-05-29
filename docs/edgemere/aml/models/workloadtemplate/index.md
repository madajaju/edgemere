---
layout: default
title: Class WorkloadTemplate
permalink: class-WorkloadTemplate
parent: Classes
---

# WorkloadTemplate

A WorkloadTemplate allows developers to paramaterize workloads so they can be reused in several different areas. Workloads are created based on arguments passed into the template for creation of a Workload.

![Logical Diagram](./logical.png)

## Attributes

* name:string - name of the workload template
* args:json - Name value pairs used for the creation of applications from the template.


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| workloads | n | Workload | false | false |  |







## Methods
* [getArgs() - Method to retrieve all arguments set for the workload template](#action-getArgs)
* [getWorkloads() - Method to get all workloads associated with the template](#action-getWorkloads)
* [setArgs() - Method to set multiple arguments for the workload template at once](#action-setArgs)


<h2>Method Details</h2>
    
### Action workloadtemplate getArgs



* REST - workloadtemplate/getArgs?
* bin - workloadtemplate getArgs 
* js - workloadtemplate.getArgs({  })

#### Description
Method to retrieve all arguments set for the workload template

#### Parameters

No parameters



### Action workloadtemplate getWorkloads



* REST - workloadtemplate/getWorkloads?
* bin - workloadtemplate getWorkloads 
* js - workloadtemplate.getWorkloads({  })

#### Description
Method to get all workloads associated with the template

#### Parameters

No parameters



### Action workloadtemplate setArgs



* REST - workloadtemplate/setArgs?args=json
* bin - workloadtemplate setArgs --args json
* js - workloadtemplate.setArgs({ args:json })

#### Description
Method to set multiple arguments for the workload template at once

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| args | json | | Name value pairs used for the setting of arguments to the template. |





