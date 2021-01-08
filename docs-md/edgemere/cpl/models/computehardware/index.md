# ComputeHardware

This represents compute/CPU hardware

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

* [addStats() - Add Stats to the Hardware](#Action-addStats)

* [create() - Create Hardware](#Action-create)

* [disable() - Disable Device and its hardware](#Action-disable)

* [enable() - Enable Device to be used.](#Action-enable)

* [factory() - Create Hardware based on properties](#Action-factory)


<h2>Method Details</h2>
    
### computehardware.addStats
* REST - computehardware/addStats
* bin - computehardware addStats
* js - computehardware.addStats

Add Stats to the Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### computehardware.create
* REST - computehardware/create
* bin - computehardware create
* js - computehardware.create

Create Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### computehardware.disable
* REST - computehardware/disable
* bin - computehardware disable
* js - computehardware.disable

Disable Device and its hardware

| Name | Type | Required | Description |
|---|---|---|---|




### computehardware.enable
* REST - computehardware/enable
* bin - computehardware enable
* js - computehardware.enable

Enable Device to be used.

| Name | Type | Required | Description |
|---|---|---|---|




### computehardware.factory
* REST - computehardware/factory
* bin - computehardware factory
* js - computehardware.factory

Create Hardware based on properties

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





