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







## Methods

* [addStats() - Add Stats to the Hardware](#action-addStats)

* [create() - Create Hardware](#action-create)

* [disable() - Disable Device and its hardware](#action-disable)

* [enable() - Enable Device to be used.](#action-enable)

* [factory() - Create Hardware based on properties](#action-factory)


<h2>Method Details</h2>
    
### Action computehardware addStats



* REST - computehardware/addStats?stats=json
* bin - computehardware addStats --stats json
* js - computehardware.addStats({ stats:json })

#### Description
Add Stats to the Hardware

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### Action computehardware create



* REST - computehardware/create?name=string&amp;capabilities=json
* bin - computehardware create --name string --capabilities json
* js - computehardware.create({ name:string,capabilities:json })

#### Description
Create Hardware

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### Action computehardware disable



* REST - computehardware/disable?
* bin - computehardware disable 
* js - computehardware.disable({  })

#### Description
Disable Device and its hardware

#### Parameters

No parameters



### Action computehardware enable



* REST - computehardware/enable?
* bin - computehardware enable 
* js - computehardware.enable({  })

#### Description
Enable Device to be used.

#### Parameters

No parameters



### Action computehardware factory



* REST - computehardware/factory?name=string&amp;type=string&amp;capabilities=json
* bin - computehardware factory --name string --type string --capabilities json
* js - computehardware.factory({ name:string,type:string,capabilities:json })

#### Description
Create Hardware based on properties

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





