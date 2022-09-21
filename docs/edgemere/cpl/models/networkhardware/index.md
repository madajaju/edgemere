---
layout: default
title: Class NetworkHardware
permalink: class-NetworkHardware
parent: Classes
---

# NetworkHardware

This represents network hardware

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
    
### Action networkhardware addStats



* REST - networkhardware/addStats?stats=json
* bin - networkhardware addStats --stats json
* js - networkhardware.addStats({ stats:json })

#### Description
Add Stats to the Hardware

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### Action networkhardware create



* REST - networkhardware/create?name=string&amp;capabilities=json
* bin - networkhardware create --name string --capabilities json
* js - networkhardware.create({ name:string,capabilities:json })

#### Description
Create Hardware

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### Action networkhardware disable



* REST - networkhardware/disable?
* bin - networkhardware disable 
* js - networkhardware.disable({  })

#### Description
Disable Device and its hardware

#### Parameters

No parameters



### Action networkhardware enable



* REST - networkhardware/enable?
* bin - networkhardware enable 
* js - networkhardware.enable({  })

#### Description
Enable Device to be used.

#### Parameters

No parameters



### Action networkhardware factory



* REST - networkhardware/factory?name=string&amp;type=string&amp;capabilities=json
* bin - networkhardware factory --name string --type string --capabilities json
* js - networkhardware.factory({ name:string,type:string,capabilities:json })

#### Description
Create Hardware based on properties

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





