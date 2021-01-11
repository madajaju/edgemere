# Edgemere

Edgemere is a conceptual architecture targeted to multi-hybrid cloud and edge computing strategies including data,
application, service, and infrastructure management. With the growth of IoT devices management of these elements from
edge to data center is important to the success of the solution.

![High Level Diagram](./api/doc/edgemere.png)

This diagram shows how the different subsystems fit together. A quick understanding of each layer will expose the responsibilities of each layer.
* Application Layer – Responsible for the management (development, test and deployment) of applications in the solution
* Distributed Information Management Layer – Responsible for the management (curation, governance, lifecycle management, and tagging) of data across a heterogeneous infrastructure (Cloud, Data Center, Edge and Client).
*	Service Management Layer – Responsible for the deploying, monitoring, and provisioning of services (containers) in the solution.
* Software Defined Infrastructure – Responsible for the management (deploying, monitoring and provisioning) of infrastructure (Compute, Storage, Network, and Accelerators) in the solution.
*	Physical Layer – Responsible for the command, control and monitoring of the physical devices in the solution.
* Security Aspect – Gives a common security model across the subsystems of the solution.
* Identity Aspect – Give the ability to uniquely identify and attest identity of users, hardware, applications, services, and virtual resources.


Many organizations have many of these subsystems already in their toolbox of solutions. Understand what you are currently using and how those tools fit together and how they interface with each other is important. One of the goals is to utilize the current tools as a foundation to build upon for the future end goal. A roadmap of technology and process changes shows how the foundation can be built upon to achieve the long term architecture.



# Detailed Documentation

Complete documentation of the architecture can be found on [github pages](https://madajaju.github.io/edgemere).



# Contributing

If you are interested in working on the Edgemere architecture please contact darren.w.pulsipher@intel.com
