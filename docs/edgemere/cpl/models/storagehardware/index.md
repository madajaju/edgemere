---
layout: default
title: Class StorageHardware
permalink: class-StorageHardware
parent: classes
---

# StorageHardware

This represents storage hardware in the common layer

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
    
### Action storagehardware addStats

* REST - storagehardware/addStats
* bin - storagehardware addStats
* js - storagehardware.addStats

Add Stats to the Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### Action storagehardware create

* REST - storagehardware/create
* bin - storagehardware create
* js - storagehardware.create

Create Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### Action storagehardware disable

* REST - storagehardware/disable
* bin - storagehardware disable
* js - storagehardware.disable

Disable Device and its hardware

| Name | Type | Required | Description |
|---|---|---|---|




### Action storagehardware enable

* REST - storagehardware/enable
* bin - storagehardware enable
* js - storagehardware.enable

Enable Device to be used.

| Name | Type | Required | Description |
|---|---|---|---|




### Action storagehardware factory

* REST - storagehardware/factory
* bin - storagehardware factory
* js - storagehardware.factory

Create Hardware based on properties

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





