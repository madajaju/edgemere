---
layout: default
title: Class WorkloadInstance
permalink: class-WorkloadInstance
parent: Classes
---

# WorkloadInstance

The &#34;WorkloadInstance&#34; class in the &#34;aml&#34; package represents a running workload instance in the ecosystem with defined methods for creation, destruction, updating, and removing, with attributes indicating the name, status, and last message of the instance, and associated with a &#34;Workload&#34; type application.

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the application instance
* status:string - Name of the application instance
* message:string - Last message in the application instance


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| app | 1 | Workload | false | false |  |





## State Net
The WorkloadInstance has a state net corresponding to instances of the class. Each state transistion will emit an 
event that can be caught with a websocket client. The name of the event is the name of the state in all lower case.
The following diagram is the state net for this class.

![State Net Diagram](./statenet.png)

| Name | Description | Events |
| --- | --- | --- |
| Init |  | create-&gt;Initializing,  |
| Initializing |  | provisoned-&gt;Running,  |
| Running |  | kill-&gt;Stopping,  |
| Stopping |  | stopped-&gt;Stopped,  |
| Stopped |  | exit-&gt;Exit, failed-&gt;Failed,  |
| Exit |  |  |
| Failed |  |  |



## Methods
* [exit() - Method to exit the workload instance](#action-exit)
* [failed() - Method to indicate that the workload instance has failed](#action-failed)
* [kill() - Kill the workload instance forcefully](#action-kill)
* [provision() - Method to provision the workload instance](#action-provision)
* [provisioned() - Method to change the state of the workload instance to provisioned.](#action-provisioned)
* [start() - Start the workload instance](#action-start)
* [stop() - Stop the workload instance](#action-stop)
* [stopped() - Method to indicate that the workload instance has stopped](#action-stopped)


<h2>Method Details</h2>
    
### Action workloadinstance exit



* REST - workloadinstance/exit?
* bin - workloadinstance exit 
* js - workloadinstance.exit({  })

#### Description
Method to exit the workload instance

#### Parameters

No parameters



### Action workloadinstance failed



* REST - workloadinstance/failed?errorMessage=string
* bin - workloadinstance failed --errorMessage string
* js - workloadinstance.failed({ errorMessage:string })

#### Description
Method to indicate that the workload instance has failed

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| errorMessage | string | | Error message indicating the reason for the failure |




### Action workloadinstance kill



* REST - workloadinstance/kill?
* bin - workloadinstance kill 
* js - workloadinstance.kill({  })

#### Description
Kill the workload instance forcefully

#### Parameters

No parameters



### Action workloadinstance provision



* REST - workloadinstance/provision?app=Workload
* bin - workloadinstance provision --app Workload
* js - workloadinstance.provision({ app:Workload })

#### Description
Method to provision the workload instance

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| app | Workload | | Workload type application to provision |




### Action workloadinstance provisioned



* REST - workloadinstance/provisioned?
* bin - workloadinstance provisioned 
* js - workloadinstance.provisioned({  })

#### Description
Method to change the state of the workload instance to provisioned.

#### Parameters

No parameters



### Action workloadinstance start



* REST - workloadinstance/start?
* bin - workloadinstance start 
* js - workloadinstance.start({  })

#### Description
Start the workload instance

#### Parameters

No parameters



### Action workloadinstance stop



* REST - workloadinstance/stop?
* bin - workloadinstance stop 
* js - workloadinstance.stop({  })

#### Description
Stop the workload instance

#### Parameters

No parameters



### Action workloadinstance stopped



* REST - workloadinstance/stopped?
* bin - workloadinstance stopped 
* js - workloadinstance.stopped({  })

#### Description
Method to indicate that the workload instance has stopped

#### Parameters

No parameters




