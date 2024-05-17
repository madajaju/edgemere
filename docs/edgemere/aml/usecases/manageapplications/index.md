---
title: Manage Applications
permalink: usecase-ManageApplications
parent: UseCases
---
# Manage Applications

DevOps Engineers and Application Developers need the ability to manage applications across multiple environments, clouds, and types of infrastructure.

![Activities Diagram](./activities.png)

## Actors

* [DevOps Engineer](actor-devops)
* [Application Developer](actor-applicationdeveloper)





## Extends Use Cases

* [OrganizeSolutions](usecase-OrganizeSolutions)







## Detail Scenarios

* [BuildApplication](#scenario-BuildApplication)
* [CreateApplication](#scenario-CreateApplication)
* [DeployApplication](#scenario-DeployApplication)
* [DestroyApplication](#scenario-DestroyApplication)
* [MonitorApplication](#scenario-MonitorApplication)
* [UpdateApplication](#scenario-UpdateApplication)



### Scenario Build Application

Build Application is the description

![Scenario BuildApplication](./BuildApplication.png)
#### Criteria

* Given - DevOpsEngineer has access to the application source code
* When - DevOpsEngineer initiates the build process
* Then - DevOpsEngineer has access to the application source code

#### Steps
1. [data list --name hello --file ./templates/world.yml](#action-data-list)
1. [data list --name hello --file ./templates/world.yml](#action-data-list)

#### Actors

* [DevOps Engineer](actor-devops)



### Scenario Create Application

Create Application is the description

![Scenario CreateApplication](./CreateApplication.png)
#### Criteria

* Given - Application Developer wants to create a new application
* When - Application Developer uses &#39;application/create&#39; method
* Then - Application Developer wants to create a new application

#### Steps
1. To Be Defined

#### Actors

* [Application Developer](actor-applicationdeveloper)



### Scenario Deploy Application

Deploy Application is the description

![Scenario DeployApplication](./DeployApplication.png)
#### Criteria

* Given - DevOps Engineer has access to deploy application
* When - DevOps Engineer uses the application/deploy method
* Then - DevOps Engineer has access to deploy application

#### Steps
1. To Be Defined

#### Actors

* [DevOps Engineer](actor-devops)



### Scenario Destroy Application

Destroy Application is the description

![Scenario DestroyApplication](./DestroyApplication.png)
#### Criteria

* Given - A DevOps Engineer has access to the application/destroy method
* When - The DevOps Engineer uses the application/destroy method
* Then - A DevOps Engineer has access to the application/destroy method

#### Steps
1. To Be Defined

#### Actors

* [DevOps Engineer](actor-devops)



### Scenario Monitor Application

Monitor Application is the description

![Scenario MonitorApplication](./MonitorApplication.png)
#### Criteria

* Given - DevOps Engineer and Application Developer have access to the Monitor Application
* When - They use the Monitor Application
* Then - DevOps Engineer and Application Developer have access to the Monitor Application

#### Steps
1. To Be Defined

#### Actors

* [DevOps Engineer](actor-devops)
* [Application Developer](actor-applicationdeveloper)



### Scenario Update Application

Update Application is the description

![Scenario UpdateApplication](./UpdateApplication.png)
#### Criteria

* Given - an Application Developer or DevOps Engineer uses the application/update method
* When - they want to update the application
* Then - an Application Developer or DevOps Engineer uses the application/update method

#### Steps
1. To Be Defined

#### Actors

* [Application Developer](actor-applicationdeveloper)
* [DevOps Engineer](actor-devops)




