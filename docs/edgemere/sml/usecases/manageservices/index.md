---
title: Manage Services
permalink: usecase-ManageServices
parent: UseCases
---
# Manage Services

Manage Services is the description

![Activities Diagram](./activities.png)

## Actors

* [Stack Developer](actor-stackdev)
* [Application Developer](actor-applicationdeveloper)





## Extends Use Cases

* [CoordinateServices](usecase-CoordinateServices)







## Detail Scenarios

* [BuildService](#scenario-BuildService)



### Scenario Build Service

Build Service is the description

![Scenario BuildService](./BuildService.png)
#### Criteria

* Given - StackDeveloper uses Build Service
* When - data/create method is invoked with name &#39;hello&#39; and file &#39;./templates/world.yml&#39;
* Then - StackDeveloper uses Build Service

#### Steps
1. [data list --name hello --file ./templates/world.yml](#action-data-list)
1. [data list --name hello --file ./templates/world.yml](#action-data-list)

#### Actors

* [Stack Developer](actor-stackdev)




