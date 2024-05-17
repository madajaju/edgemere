---
title: Manage Meta Data
permalink: usecase-ManageMetaData
parent: UseCases
---
# Manage Meta Data

Manage Meta Data is the description

![Activities Diagram](./Activities.png)

## Actors

* [Data Scientist](actor-datascientist)





## Extends Use Cases

* [Provide Business Information](usecase-ProvideBusinessInformation)







## Detail Scenarios

* [CaptureMetaData](#scenario-CaptureMetaData)
* [ManageDataCatalog](#scenario-ManageDataCatalog)



### Scenario Capture Meta Data

Capture Meta Data is the description

![Scenario CaptureMetaData](./CaptureMetaData.png)
#### Criteria

* Given - Data Engineer and Data Steward are using data create method
* When - Data blueprint and sources are created and deployed for simulation
* Then - Data Engineer and Data Steward are using data create method

#### Steps
1. [dataadaptor create --name filesystem --file ./templates/dataadaptor-filesystem.yaml](#action-dataadaptor-create)
1. [dataflow create --name filesystembasic --file ./templates/dataflow-filesystembasic.yaml](#action-dataflow-create)
1. [datablueprint create --name filesystemBluePrint1 --file ./templates/datablueprint-filesystem.yaml](#action-datablueprint-create)
1. [datasource create --name myFileSystem1 --file ./templates/datasource.yaml](#action-datasource-create)
1. [datasource create --name myFileSystem2 --file ./templates/datasource.yaml](#action-datasource-create)
1. [diml ddf/datablueprint/deploy --name myBP1 --blueprint filesystemBluePrint1 --sources mySource=myFileSystem1](#action-diml-ddf-datablueprint-deploy)
1. [diml ddf/datasource/simulate --name myFileSystem1 --file ./templates/datasource-simulation.yaml](#action-diml-ddf-datasource-simulate)
1. [diml find --query owner:darren](#action-diml-find)

#### Actors

* [DataEngineer](actor-dataengineer)
* [Data Steward](actor-datasteward)



### Scenario Manage Data Catalog

Manage Data Catalog is the description

![Scenario ManageDataCatalog](./ManageDataCatalog.png)
#### Criteria

* Given - A data scientist wants to manage the data catalog
* When - The data scientist uses the &#39;datacatalog/list&#39; method
* Then - A data scientist wants to manage the data catalog

#### Steps
1. To Be Defined

#### Actors

* [Data Scientist](actor-datascientist)




