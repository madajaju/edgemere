---
layout: default
title: Class AcceleratorHardware
permalink: class-AcceleratorHardware
parent: classes
---

# AcceleratorHardware

Represents Hardware that is an accelerator

![Logical Diagram](./logical.svg)

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
    
### Action acceleratorhardware addStats

* REST - acceleratorhardware/addStats
* bin - acceleratorhardware addStats
* js - acceleratorhardware.addStats

Add Stats to the Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### Action acceleratorhardware create

* REST - acceleratorhardware/create
* bin - acceleratorhardware create
* js - acceleratorhardware.create

Create Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### Action acceleratorhardware disable

* REST - acceleratorhardware/disable
* bin - acceleratorhardware disable
* js - acceleratorhardware.disable

Disable Device and its hardware

| Name | Type | Required | Description |
|---|---|---|---|




### Action acceleratorhardware enable

* REST - acceleratorhardware/enable
* bin - acceleratorhardware enable
* js - acceleratorhardware.enable

Enable Device to be used.

| Name | Type | Required | Description |
|---|---|---|---|




### Action acceleratorhardware factory

* REST - acceleratorhardware/factory
* bin - acceleratorhardware factory
* js - acceleratorhardware.factory

Create Hardware based on properties

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





