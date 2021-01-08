# MetricComposite

Composite type of Metric. This is for metrics that are a group of metrics

![Logical Diagram](./logical.svg)

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

* [consume() - Substract metric to the current value up to zero](#Action-consume)

* [copy() - Copy Metric](#Action-copy)

* [create() - Create Composite Metric](#Action-create)

* [findDeep() - Find Metric with name](#Action-findDeep)

* [findMatchDeep() - Find Metric with name](#Action-findMatchDeep)

* [lessThanEq() - Test less than or equal to the value passed in](#Action-lessThanEq)

* [minus() - Substract metric to the current value](#Action-minus)

* [plus() - Add metric to the current value](#Action-plus)

* [set() - Set metric to the current value](#Action-set)

* [factory() - Create a metric based on the metrictype table](#Action-factory)

* [greaterThanEq() - Test greater than or equal to the value passed in](#Action-greaterThanEq)


<h2>Method Details</h2>
    
### metriccomposite.consume
* REST - metriccomposite/consume
* bin - metriccomposite consume
* js - metriccomposite.consume

Substract metric to the current value up to zero

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to subtract from the metric |




### metriccomposite.copy
* REST - metriccomposite/copy
* bin - metriccomposite copy
* js - metriccomposite.copy

Copy Metric

| Name | Type | Required | Description |
|---|---|---|---|




### metriccomposite.create
* REST - metriccomposite/create
* bin - metriccomposite create
* js - metriccomposite.create

Create Composite Metric

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |false | Name of the composite metric |
| value | object |true | Values to add to the metric |




### metriccomposite.findDeep
* REST - metriccomposite/findDeep
* bin - metriccomposite findDeep
* js - metriccomposite.findDeep

Find Metric with name

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to match with |




### metriccomposite.findMatchDeep
* REST - metriccomposite/findMatchDeep
* bin - metriccomposite findMatchDeep
* js - metriccomposite.findMatchDeep

Find Metric with name

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to add to the metric |




### metriccomposite.lessThanEq
* REST - metriccomposite/lessThanEq
* bin - metriccomposite lessThanEq
* js - metriccomposite.lessThanEq

Test less than or equal to the value passed in

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to test against the metric |




### metriccomposite.minus
* REST - metriccomposite/minus
* bin - metriccomposite minus
* js - metriccomposite.minus

Substract metric to the current value

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to subtract from the metric |




### metriccomposite.plus
* REST - metriccomposite/plus
* bin - metriccomposite plus
* js - metriccomposite.plus

Add metric to the current value

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to add to the metric |




### metriccomposite.set
* REST - metriccomposite/set
* bin - metriccomposite set
* js - metriccomposite.set

Set metric to the current value

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to set to the metric |




### metriccomposite.factory
* REST - metriccomposite/factory
* bin - metriccomposite factory
* js - metriccomposite.factory

Create a metric based on the metrictype table

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the metric |
| value | json |true | value of the metric |




### metriccomposite.greaterThanEq
* REST - metriccomposite/greaterThanEq
* bin - metriccomposite greaterThanEq
* js - metriccomposite.greaterThanEq

Test greater than or equal to the value passed in

| Name | Type | Required | Description |
|---|---|---|---|
| value | object |true | Value to test against the metric |





