---
layout: default
title: Class Location
permalink: class-Location
parent: Classes
---

# Location

The &#34;Location&#34; class, part of the &#34;pw&#34; package, allows for creating, updating, destroying, manipulating, and retrieving information about various locations, including its name, coordinates (latitude, longitude, altitude), address, associated assets, and additional notes.

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the Location
* lat:number - Latitude of the Location
* long:number - Longitude of the Location
* alt:number - Altitude of the Location
* address:string - Address of the Location
* notes:string - Address of the Location


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| assets | n | Asset | false | true |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| location | 1 | PhysicalAsset | false | false |  |





## Methods
* [addAsset() - To add an asset to the location](#action-addAsset)
* [getCoordinates() - To get the latitude and longitude of the location](#action-getCoordinates)
* [getLocationDetails() - To get all the details of a location](#action-getLocationDetails)
* [removeAsset() - To remove an asset from the location](#action-removeAsset)
* [setCoordinates() - To set the latitude and longitude of the location](#action-setCoordinates)


<h2>Method Details</h2>
    
### Action location addAsset



* REST - location/addAsset?locationName=string&amp;asset=Asset object
* bin - location addAsset --locationName string --asset Asset object
* js - location.addAsset({ locationName:string,asset:Asset object })

#### Description
To add an asset to the location

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| locationName | string | | Name of the location |
| asset | Asset object | | The asset to be added to the location |




### Action location getCoordinates



* REST - location/getCoordinates?name=string
* bin - location getCoordinates --name string
* js - location.getCoordinates({ name:string })

#### Description
To get the latitude and longitude of the location

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string | | Name of the location |




### Action location getLocationDetails



* REST - location/getLocationDetails?name=string
* bin - location getLocationDetails --name string
* js - location.getLocationDetails({ name:string })

#### Description
To get all the details of a location

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string | | Name of the location |




### Action location removeAsset



* REST - location/removeAsset?locationName=string&amp;asset=Asset object
* bin - location removeAsset --locationName string --asset Asset object
* js - location.removeAsset({ locationName:string,asset:Asset object })

#### Description
To remove an asset from the location

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| locationName | string | | Name of the location |
| asset | Asset object | | The asset to be removed from the location |




### Action location setCoordinates



* REST - location/setCoordinates?name=string&amp;lat=number&amp;long=number
* bin - location setCoordinates --name string --lat number --long number
* js - location.setCoordinates({ name:string,lat:number,long:number })

#### Description
To set the latitude and longitude of the location

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| name | string | | Name of the location |
| lat | number | | New latitude of the location |
| long | number | | New longitude of the location |





