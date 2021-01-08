# Hardware

This represents physical hardware in a device

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
| hardware | n | Device | false | true |  |
| hardware | n | AggregatedDevice | false | true |  |
| hardware | n | AcceleratorResource | false | false |  |
| hardware | n | ComputeResource | false | false |  |
| hardware | n | NetworkResource | false | false |  |
| hardware | n | Resource | false | false |  |
| hardware | n | StorageResource | false | false |  |



## State Net
![State Net Diagram](./statenet.svg)

| Name | Description | Events |
| --- | --- | --- |
| Init |  | create-&gt;Enabled,  |
| Enabled |  | disable-&gt;Disabled,  |
| Disabled |  | enable-&gt;Enabled,  |



## Methods

* [addStats() - Add Stats to the Hardware](#Action-addStats)

* [create() - Create Hardware](#Action-create)

* [disable() - Disable Device and its hardware](#Action-disable)

* [enable() - Enable Device to be used.](#Action-enable)

* [factory() - Create Hardware based on properties](#Action-factory)


<h2>Method Details</h2>
    
### hardware.addStats
* REST - hardware/addStats
* bin - hardware addStats
* js - hardware.addStats

Add Stats to the Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| stats | json |true | Object Map of the stats |




### hardware.create
* REST - hardware/create
* bin - hardware create
* js - hardware.create

Create Hardware

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| capabilities | json |true | capabilities of the hardware |




### hardware.disable
* REST - hardware/disable
* bin - hardware disable
* js - hardware.disable

Disable Device and its hardware

| Name | Type | Required | Description |
|---|---|---|---|




### hardware.enable
* REST - hardware/enable
* bin - hardware enable
* js - hardware.enable

Enable Device to be used.

| Name | Type | Required | Description |
|---|---|---|---|




### hardware.factory
* REST - hardware/factory
* bin - hardware factory
* js - hardware.factory

Create Hardware based on properties

| Name | Type | Required | Description |
|---|---|---|---|
| name | string |true | name of the hardware |
| type | string |true | type of the hardware |
| capabilities | json |true | definition of the hardware |





