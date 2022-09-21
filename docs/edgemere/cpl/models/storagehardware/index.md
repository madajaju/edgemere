---
layout: default
title: Class StorageHardware
permalink: class-StorageHardware
parent: Classes
---

# StorageHardware

This represents storage hardware in the common layer

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
    
### Action storagehardware addStats



* REST - storagehardware/addStats?stats=json
* bin - storagehardware addStats --stats json
* js - storagehardware.addStats({ stats:json })

#### Description
Add Stats to the Hardware

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### Action storagehardware create



* REST - storagehardware/create?name=string&amp;capabilities=json
* bin - storagehardware create --name string --capabilities json
* js - storagehardware.create({ name:string,capabilities:json })

#### Description
Create Hardware

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### Action storagehardware disable



* REST - storagehardware/disable?
* bin - storagehardware disable 
* js - storagehardware.disable({  })

#### Description
Disable Device and its hardware

#### Parameters

No parameters



### Action storagehardware enable



* REST - storagehardware/enable?
* bin - storagehardware enable 
* js - storagehardware.enable({  })

#### Description
Enable Device to be used.

#### Parameters

No parameters



### Action storagehardware factory



* REST - storagehardware/factory?name=string&amp;type=string&amp;capabilities=json
* bin - storagehardware factory --name string --type string --capabilities json
* js - storagehardware.factory({ name:string,type:string,capabilities:json })

#### Description
Create Hardware based on properties

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





