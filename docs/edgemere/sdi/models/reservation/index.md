---
layout: default
title: Class Reservation
permalink: class-Reservation
parent: Classes
---

# Reservation

A reservation fullfils the request to the system for resources. When a request for a resource is made from a cloud. A reservation for the resource request is created for each device or devices that can satistfy the request. When the request is fulfilled the reservations are then no longer needed.

![Logical Diagram](./logical.png)

## Attributes

* cost:number - This is the cost of the reservation


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| device | 1 | Device | false | false |  |
| request | 1 | Request | false | false |  |
| cloud | 1 | Cloud | false | false |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| reservations | n | Cloud | false | true |  |
| reservations | n | Request | false | true |  |



## State Net
The Reservation has a state net corresponding to instances of the class. Each state transistion will emit an 
event that can be caught with a websocket client. The name of the event is the name of the state in all lower case.
The following diagram is the state net for this class.

![State Net Diagram](./statenet.png)

| Name | Description | Events |
| --- | --- | --- |
| Init |  | create-&gt;Created, confirm-&gt;Confirmed, free-&gt;Rejected,  |
| Created | Reservation is created and ready to be evaluated for best fit. | confirm-&gt;Confirmed, free-&gt;Rejected,  |
| Confirmed | Reservation is confirmed and the resources will be provisioned. |  |
| Rejected | Reservation was rejected and devices freed up. |  |



## Methods

* [confirm() - Confirm the Reservation](#action-confirm)

* [create() - Create the Reservation](#action-create)

* [free() - Confirm the Reservation](#action-free)


<h2>Method Details</h2>
    
### Action reservation confirm



* REST - reservation/confirm?
* bin - reservation confirm 
* js - reservation.confirm({  })

#### Description
Confirm the Reservation

#### Parameters

No parameters



### Action reservation create



* REST - reservation/create?
* bin - reservation create 
* js - reservation.create({  })

#### Description
Create the Reservation

#### Parameters

No parameters



### Action reservation free



* REST - reservation/free?
* bin - reservation free 
* js - reservation.free({  })

#### Description
Confirm the Reservation

#### Parameters

No parameters




