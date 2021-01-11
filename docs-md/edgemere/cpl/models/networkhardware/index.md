---
layout: default
title: Class NetworkHardware
permalink: class-NetworkHardware
parent: classes
---

# NetworkHardware

This represents network hardware

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
    
### Action networkhardware addStats

* REST - networkhardware/addStats
* bin - networkhardware addStats
* js - networkhardware.addStats

Add Stats to the Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### Action networkhardware create

* REST - networkhardware/create
* bin - networkhardware create
* js - networkhardware.create

Create Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### Action networkhardware disable

* REST - networkhardware/disable
* bin - networkhardware disable
* js - networkhardware.disable

Disable Device and its hardware

| Name | Type | Required | Description |
|---|---|---|---|




### Action networkhardware enable

* REST - networkhardware/enable
* bin - networkhardware enable
* js - networkhardware.enable

Enable Device to be used.

| Name | Type | Required | Description |
|---|---|---|---|




### Action networkhardware factory

* REST - networkhardware/factory
* bin - networkhardware factory
* js - networkhardware.factory

Create Hardware based on properties

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





