---
layout: default
title: Class MetricComposite
permalink: class-MetricComposite
parent: Classes
---

# MetricComposite

Composite type of Metric. This is for metrics that are a group of metrics

![Logical Diagram](./logical.png)

## Attributes

* name:string - This is the name of the metric
* value:string - This is the value of the metric


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| values | n | Metric | true | true |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| capabilities | 1 | PhysicalProfile |  | true | Capabilities of the element |
| available | 1 | PhysicalProfile |  | true | Availability of the element |
| reserved | 1 | PhysicalProfile |  | true | Reservations of the element |
| metrics | 1 | PhysicalProfile |  | true | Metrics of the element |
| requirements | 1 | Request | true | true |  |





## Methods
* [consume() - Substract metric to the current value up to zero](#action-consume)
* [copy() - Copy Metric](#action-copy)
* [create() - Create Composite Metric](#action-create)
* [findDeep() - Find Metric with name](#action-findDeep)
* [findMatchDeep() - Find Metric with name](#action-findMatchDeep)
* [lessThanEq() - Test less than or equal to the value passed in](#action-lessThanEq)
* [minus() - Substract metric to the current value](#action-minus)
* [plus() - Add metric to the current value](#action-plus)
* [set() - Set metric to the current value](#action-set)
* [factory() - Create a metric based on the metrictype table](#action-factory)
* [greaterThanEq() - Test greater than or equal to the value passed in](#action-greaterThanEq)


<h2>Method Details</h2>
    
### Action metriccomposite consume



* REST - metriccomposite/consume?value=object
* bin - metriccomposite consume --value object
* js - metriccomposite.consume({ value:object })

#### Description
Substract metric to the current value up to zero

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to subtract from the metric |




### Action metriccomposite copy



* REST - metriccomposite/copy?
* bin - metriccomposite copy 
* js - metriccomposite.copy({  })

#### Description
Copy Metric

#### Parameters

No parameters



### Action metriccomposite create



* REST - metriccomposite/create?name=string&amp;value=object
* bin - metriccomposite create --name string --value object
* js - metriccomposite.create({ name:string,value:object })

#### Description
Create Composite Metric

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |false | Name of the composite metric |
| value | object |true | Values to add to the metric |




### Action metriccomposite findDeep



* REST - metriccomposite/findDeep?value=object
* bin - metriccomposite findDeep --value object
* js - metriccomposite.findDeep({ value:object })

#### Description
Find Metric with name

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to match with |




### Action metriccomposite findMatchDeep



* REST - metriccomposite/findMatchDeep?value=object
* bin - metriccomposite findMatchDeep --value object
* js - metriccomposite.findMatchDeep({ value:object })

#### Description
Find Metric with name

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to add to the metric |




### Action metriccomposite lessThanEq



* REST - metriccomposite/lessThanEq?value=object
* bin - metriccomposite lessThanEq --value object
* js - metriccomposite.lessThanEq({ value:object })

#### Description
Test less than or equal to the value passed in

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to test against the metric |




### Action metriccomposite minus



* REST - metriccomposite/minus?value=object
* bin - metriccomposite minus --value object
* js - metriccomposite.minus({ value:object })

#### Description
Substract metric to the current value

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to subtract from the metric |




### Action metriccomposite plus



* REST - metriccomposite/plus?value=object
* bin - metriccomposite plus --value object
* js - metriccomposite.plus({ value:object })

#### Description
Add metric to the current value

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to add to the metric |




### Action metriccomposite set



* REST - metriccomposite/set?value=object
* bin - metriccomposite set --value object
* js - metriccomposite.set({ value:object })

#### Description
Set metric to the current value

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to set to the metric |




### Action metriccomposite factory



* REST - metriccomposite/factory?name=string&amp;value=json
* bin - metriccomposite factory --name string --value json
* js - metriccomposite.factory({ name:string,value:json })

#### Description
Create a metric based on the metrictype table

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the metric |
| value | json |true | value of the metric |




### Action metriccomposite greaterThanEq



* REST - metriccomposite/greaterThanEq?value=object
* bin - metriccomposite greaterThanEq --value object
* js - metriccomposite.greaterThanEq({ value:object })

#### Description
Test greater than or equal to the value passed in

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to test against the metric |





