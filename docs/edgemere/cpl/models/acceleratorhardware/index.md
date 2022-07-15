---
layout: default
title: Class AcceleratorHardware
permalink: class-AcceleratorHardware
parent: classes
---

# AcceleratorHardware

Represents Hardware that is an accelerator

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
    
### Action acceleratorhardware addStats



* REST - acceleratorhardware/addStats?stats=json
* bin - acceleratorhardware addStats --stats json
* js - acceleratorhardware.addStats({ stats:json })

#### Description
Add Stats to the Hardware

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### Action acceleratorhardware create



* REST - acceleratorhardware/create?name=string&amp;capabilities=json
* bin - acceleratorhardware create --name string --capabilities json
* js - acceleratorhardware.create({ name:string,capabilities:json })

#### Description
Create Hardware

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### Action acceleratorhardware disable



* REST - acceleratorhardware/disable?
* bin - acceleratorhardware disable 
* js - acceleratorhardware.disable({  })

#### Description
Disable Device and its hardware

#### Parameters

No parameters



### Action acceleratorhardware enable



* REST - acceleratorhardware/enable?
* bin - acceleratorhardware enable 
* js - acceleratorhardware.enable({  })

#### Description
Enable Device to be used.

#### Parameters

No parameters



### Action acceleratorhardware factory



* REST - acceleratorhardware/factory?name=string&amp;type=string&amp;capabilities=json
* bin - acceleratorhardware factory --name string --type string --capabilities json
* js - acceleratorhardware.factory({ name:string,type:string,capabilities:json })

#### Description
Create Hardware based on properties

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





