---
layout: default
title: All Actors
permalink: all-actors
has_children: true
nav_order: 2
---

There are several users of the system. We first took a use case analysis approach to the architecture. First,
identifying the actors/users of the system and building out how the actor uses the system? What their key objectives and
goals are? and How they use the system? This list is not an exhaustive list of all actors of the system but are the
primary actors.

These actors are found in most organizations and there are several different organizational structures that can be
employed. The key is to identify the people or organization that fits the different actors in the systems. The following
is an example of a centralized organizational structure of the actors of the system.

![Organization Layout](./orgchart.png)


# Actors

* [Actor](actor-actor) - The Actor is a fundamental interface that modifies, controls, and monitors physical entities in the system, primarily facilitating changes in the physical world, handling commissioning and decommissioning of assets, establishing connections between assets and devices, ensuring the security and management of these assets, and enabling continuous monitoring, bound within specific use cases and scenarios.
* [Application Developer](actor-applicationdeveloper) - The Application Developer is responsible for defining, managing, deploying, and updating applications, AI models and workloads, as well as monitoring the performance of applications, using coordination with DevOps through the development pipeline.
* [Chief Data Officer](actor-chiefdataofficer) - The Chief Data Officer (CDO) is responsible for managing data procedures, data governance, data policies, and the overall data strategy within a business or organization.
* [ChiefDataOfficier](actor-chiefdataofficier) - Long description
* [Data Analyst](actor-analyst) - Uses Data solutions produced by the Data Scientist and Data Engineer to provide business value to the organization.
* [DataEngineer](actor-dataengineer) - Responsible for operationalization of data pipeline and the automation and deployment of data solutions. They work closely with the Data Scientist to deliver solutions to data analyst.
* [Data Scientist](actor-datascientist) - Responsible for the architecture and development of data analytic models and solutions. They work closely with the Data engineer to deliver solutions to the Data Analyst.
* [Data Steward](actor-datasteward) - Responsible for the governance of data in their organization. They implement policies established by the CDO.
* [Developer](actor-developer) - Long description
* [DevOps Engineer](actor-devops) - Responsible for the management of the automation of the delivery of applications and solutions in the organization.
* [IT Operations](actor-itops) - Responsible for the management of the infrastructure.
* [SecurityEngineer](actor-securityengineer) - Long description
* [Security Operator](actor-securityoperator) - Long description
* [Stack Developer](actor-stackdev) - Responsible for developing reusable micro-services and application stacks in the organization.
* [System Administrator](actor-systemadministrator) - Long description

![All Actors](./actors.png)
