---
layout: default
title: Class PLC
permalink: class-PLC
parent: Classes
---

# PLC

Programmable Logic Controller

![Logical Diagram](./logical.png)

## Attributes

* name:string - description
* kind:string - description
* protocol:string - Protocol used to communicate


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| asset | 1 | PhysicalAsset | false | false |  |
| device | 1 | Device | false | false |  |







## Methods
* [communicateWithAsset() - Description of the method](#action-communicateWithAsset)
* [transmitData() - Description of the method](#action-transmitData)


<h2>Method Details</h2>
    
### Action plc communicateWithAsset



* REST - plc/communicateWithAsset?attr1=string
* bin - plc communicateWithAsset --attr1 string
* js - plc.communicateWithAsset({ attr1:string })

#### Description
Description of the method

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |




### Action plc transmitData



* REST - plc/transmitData?attr1=string
* bin - plc transmitData --attr1 string
* js - plc.transmitData({ attr1:string })

#### Description
Description of the method

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| attr1 | string |false | Description for the parameter |





