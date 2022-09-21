---
layout: default
title: Class DataReservation
permalink: class-DataReservation
parent: Classes
---

# DataReservation

Resrevation for utilixzing data and creating a data instance.

![Logical Diagram](./logical.png)

## Attributes

* cost:number - Cost of using the data


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| data | 1 | Data | false | false |  |
| source | 1 | DataSource | false | false |  |
| request | 1 | DataRequest | false | false |  |



## Users of the Model

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| reservations | n | DataRequest | false | true |  |



## State Net
The DataReservation has a state net corresponding to instances of the class. Each state transistion will emit an 
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


<h2>Method Details</h2>
    

