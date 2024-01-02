---
layout: default
title: Class AggregatedDevice
permalink: class-AggregatedDevice
parent: Classes
---

# AggregatedDevice

This is a construct that has other devices under it

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the aggregated device
* ename:string - Extended name of the aggregated device
* hostname:string - Hostname of the device
* type:string - Type of the Device


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| devices | n | Device | false | true |  |
| profile | 1 | PhysicalProfile | true |  |  |
| datacenter | 1 | DataCenter | false | false |  |
| hardware | n | Hardware | false | true |  |
| parent | 1 | AggregatedDevice | false | false |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| parent | 1 | Device | false | false |  |
| parent | 1 | AggregatedDevice | false | false |  |
| adevices | n | DataCenter | false | true |  |
| adevices | n | Cloud | false | false |  |
| aggregates | n | Request | false | false |  |



## State Net
The AggregatedDevice has a state net corresponding to instances of the class. Each state transistion will emit an 
event that can be caught with a websocket client. The name of the event is the name of the state in all lower case.
The following diagram is the state net for this class.

![State Net Diagram](./statenet.png)

| Name | Description | Events |
| --- | --- | --- |
| Init |  | create-&gt;Enabled,  |
| Enabled |  | disable-&gt;Disabled,  |
| Disabled |  | enable-&gt;Enabled,  |



## Methods
* [addDevices() - Add Devices to the Aggregated Device](#action-addDevices)
* [disable() - Disable Device and its hardware](#action-disable)
* [enable() - Enable Device to be used.](#action-enable)
* [reserve() - Reserve a resource](#action-reserve)
* [addToHardware() - Create a Device](#action-addToHardware)
* [create() - Create a Device](#action-create)
* [getReservations() - Get reservation from the requirements](#action-getReservations)
* [provision() - Provision Hardware to meet the requirements](#action-provision)


<h2>Method Details</h2>
    
### Action aggregateddevice addDevices



* REST - aggregateddevice/addDevices?item=object
* bin - aggregateddevice addDevices --item object
* js - aggregateddevice.addDevices({ item:object })

#### Description
Add Devices to the Aggregated Device

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| item | object |true | Devices to add to the Aggregated Device |




### Action aggregateddevice disable



* REST - aggregateddevice/disable?
* bin - aggregateddevice disable 
* js - aggregateddevice.disable({  })

#### Description
Disable Device and its hardware

#### Parameters

No parameters



### Action aggregateddevice enable



* REST - aggregateddevice/enable?
* bin - aggregateddevice enable 
* js - aggregateddevice.enable({  })

#### Description
Enable Device to be used.

#### Parameters

No parameters



### Action aggregateddevice reserve



* REST - aggregateddevice/reserve?request=object
* bin - aggregateddevice reserve --request object
* js - aggregateddevice.reserve({ request:object })

#### Description
Reserve a resource

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| request | object |true | Request for the reservation |




### Action aggregateddevice addToHardware



* REST - aggregateddevice/addToHardware?
* bin - aggregateddevice addToHardware 
* js - aggregateddevice.addToHardware({  })

#### Description
Create a Device

#### Parameters

No parameters



### Action aggregateddevice create



* REST - aggregateddevice/create?name=string&amp;file=YAML
* bin - aggregateddevice create --name string --file YAML
* js - aggregateddevice.create({ name:string,file:YAML })

#### Description
Create a Device

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the device |
| file | YAML |false | file with the definition |




### Action aggregateddevice getReservations



* REST - aggregateddevice/getReservations?requirements=YAML
* bin - aggregateddevice getReservations --requirements YAML
* js - aggregateddevice.getReservations({ requirements:YAML })

#### Description
Get reservation from the requirements

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| requirements | YAML |true | Requirements for the Reservation |




### Action aggregateddevice provision



* REST - aggregateddevice/provision?requirements=json
* bin - aggregateddevice provision --requirements json
* js - aggregateddevice.provision({ requirements:json })

#### Description
Provision Hardware to meet the requirements

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| requirements | json |true | Requirements for the Provision |





