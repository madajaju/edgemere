# Metric

Metric stores information about the physical profile. 

![Logical Diagram](./logical.svg)

## Attributes

* name:string - This is the name of the metric
* value:string - This is the value of the metric


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |


## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| values | n | MetricComposite | true | true |  |





## Methods

* [consume() - Consume value from a metric](#Action-consume)

* [copy() - Copy Metric](#Action-copy)

* [factory() - Create a metric based on the metrictype table](#Action-factory)

* [greaterThanEq() - Test greater than or equal to the value passed in](#Action-greaterThanEq)

* [lessThanEq() - Test less than or equal to the value passed in](#Action-lessThanEq)

* [minus() - Add value to a metric](#Action-minus)

* [plus() - Add value to a metric](#Action-plus)

* [set() - Add value to a metric](#Action-set)


<h2>Method Details</h2>
    
### metric.consume
* REST - metric/consume
* bin - metric consume
* js - metric.consume

Consume value from a metric

| Name | Type | Required | Description |
|---|---|---|---|
| value | number |true | Value to consume from the metric |




### metric.copy
* REST - metric/copy
* bin - metric copy
* js - metric.copy

Copy Metric

| Name | Type | Required | Description |
|---|---|---|---|




### metric.factory
* REST - metric/factory
* bin - metric factory
* js - metric.factory

Create a metric based on the metrictype table

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the metric |
| value | json |true | value of the metric |




### metric.greaterThanEq
* REST - metric/greaterThanEq
* bin - metric greaterThanEq
* js - metric.greaterThanEq

Test greater than or equal to the value passed in

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to test against the metric |




### metric.lessThanEq
* REST - metric/lessThanEq
* bin - metric lessThanEq
* js - metric.lessThanEq

Test less than or equal to the value passed in

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to test against the metric |




### metric.minus
* REST - metric/minus
* bin - metric minus
* js - metric.minus

Add value to a metric

| Name | Type | Required | Description |
|---|---|---|---|
| value | number |true | Value to add to the metric |




### metric.plus
* REST - metric/plus
* bin - metric plus
* js - metric.plus

Add value to a metric

| Name | Type | Required | Description |
|---|---|---|---|
| value | number |true | Value to add to the metric |




### metric.set
* REST - metric/set
* bin - metric set
* js - metric.set

Add value to a metric

| Name | Type | Required | Description |
|---|---|---|---|
| value | number |true | Value to add to the metric |





