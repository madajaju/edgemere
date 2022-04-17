---
layout: default
title: Class ComputeHardware
permalink: class-ComputeHardware
parent: classes
---

# ComputeHardware

This represents compute/CPU hardware

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





## Methods

* [addStats() - Add Stats to the Hardware](#action-addStats)

* [create() - Create Hardware](#action-create)

* [disable() - Disable Device and its hardware](#action-disable)

* [enable() - Enable Device to be used.](#action-enable)

* [factory() - Create Hardware based on properties](#action-factory)


<h2>Method Details</h2>
    
### Action computehardware addStats

* REST - computehardware/addStats
* bin - computehardware addStats
* js - computehardware.addStats

Add Stats to the Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### Action computehardware create

* REST - computehardware/create
* bin - computehardware create
* js - computehardware.create

Create Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### Action computehardware disable

* REST - computehardware/disable
* bin - computehardware disable
* js - computehardware.disable

Disable Device and its hardware

| Name | Type | Required | Description |
|---|---|---|---|




### Action computehardware enable

* REST - computehardware/enable
* bin - computehardware enable
* js - computehardware.enable

Enable Device to be used.

| Name | Type | Required | Description |
|---|---|---|---|




### Action computehardware factory

* REST - computehardware/factory
* bin - computehardware factory
* js - computehardware.factory

Create Hardware based on properties

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





