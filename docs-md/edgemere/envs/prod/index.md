### prod


#### Deployment
This subsystem is deployed using micro-services as shown in the diagram below.
The subsystem also has an CLI, REST and Web Interface exposed through frontend service that routes
all paths to the appropriate microservices.

![Deployment Diagram](./deployment.svg)

#### Physical Architecture
The edgemere subsystem is physically laid out on a hybrid cloud infrastructure.
Each micro-service communicates with each other through overlay networks as defined in the diagram
above. Each micro-service has three interfaces exposed Command Line Interface (CLI), Websocket (socket.io),
and a REST interface. This allows for scripting, event programing and connectivity through a common
REST interface.

![Physical Diagram](./physical.svg)

#### Micro-Services
These are the micro-services for the deployment of the subsystem. The combination of the micro-services help implement
the subsystem's logic.

| Name | Image | Mapping | Ports | Network |
| --- | --- | --- | --- | --- |
| admin | edgemere:latest | /admin | 3000 | children |
| aml | aml:latest |  |  | children |
| cpl | cpl:latest | /cpl | 3000 | children |
| diml | diml:latest |  |  | children |
| ia | ia:latest |  |  | children |
| sa | sa:latest |  |  | children |
| sml | sml:latest |  |  | children |
| sdi | sdi:latest |  |  | children |
| pubsub | redis | /pubsub | 80 | children,sibling |
| web | edgemere_web | /web | 3000 | sibling,children |
| doc | edgemere_doc | /docs | 8088 | sibling,children |


#### Networks

The networks connect the microservices of this stack together in a micro-segmented network.
There are also Ingress and Egress networks for connected to the stack (ingress) and connected from
the stack (egress). Most of the egress networks are for substacks in the stack itself. This enables
the creation of aggregation of stacks and substacks and still keep the microsegmentation of each
stack in a layer of networks.

| Name | Type | External Name | Ports |
| --- | --- | --- | --- |
| children | egress | ailtire_appname_family |
| sibling | internal |  |


The Stack is micro-segmented off and there are a set of ports that are open for the ingress networks. The following
table shows the ports available and the internal port mappings and services on those ports.

| External Access Port | To Port | Service |
| --- | --- | --- |
| 80 | 80 | frontend |
| 443 | 443 | frontend |
| 8080 | 8080 | frontend |



