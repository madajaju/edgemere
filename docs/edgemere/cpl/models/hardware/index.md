---
layout: default
title: Class Hardware
permalink: class-Hardware
parent: classes
---

# Hardware

This represents physical hardware in a device

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the hardware
* ename:string - Extended Name of the hardware


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| profile | 1 | PhysicalProfile | true |  |  |
| device | 1 | Device | false | false |  |
| resources | n | Resource | false | false |  |


## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| hardware | n | Device | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | Resource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | AcceleratorResource | false | false |  |
| hardware | n | ComputeResource | false | false |  |
| hardware | n | NetworkResource | false | false |  |
| hardware | n | Resource | false | false |  |
| hardware | n | StorageResource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | AcceleratorResource | false | false |  |
| hardware | n | ComputeResource | false | false |  |
| hardware | n | NetworkResource | false | false |  |
| hardware | n | Resource | false | false |  |
| hardware | n | StorageResource | false | false |  |
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | AcceleratorResource | false | false |  |
| hardware | n | ComputeResource | false | false |  |
| hardware | n | NetworkResource | false | false |  |
| hardware | n | Resource | false | false |  |
| hardware | n | StorageResource | false | false |  |



## State Net
![State Net Diagram](./statenet.png)

| Name | Description | Events |
| --- | --- | --- |
| Init |  | create-&gt;Enabled,  |
| Enabled |  | disable-&gt;Disabled,  |
| Disabled |  | enable-&gt;Enabled,  |



## Methods

* [addStats() - Add Stats to the Hardware](#action-addStats)

* [create() - Create Hardware](#action-create)

* [disable() - Disable Device and its hardware](#action-disable)

* [enable() - Enable Device to be used.](#action-enable)

* [factory() - Create Hardware based on properties](#action-factory)


<h2>Method Details</h2>
    
### Action hardware addStats

* REST - hardware/addStats
* bin - hardware addStats
* js - hardware.addStats

Add Stats to the Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### Action hardware create

* REST - hardware/create
* bin - hardware create
* js - hardware.create

Create Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### Action hardware disable

* REST - hardware/disable
* bin - hardware disable
* js - hardware.disable

Disable Device and its hardware

| Name | Type | Required | Description |
|---|---|---|---|




### Action hardware enable

* REST - hardware/enable
* bin - hardware enable
* js - hardware.enable

Enable Device to be used.

| Name | Type | Required | Description |
|---|---|---|---|




### Action hardware factory

* REST - hardware/factory
* bin - hardware factory
* js - hardware.factory

Create Hardware based on properties

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





