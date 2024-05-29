---
layout: default
title: Class ApplicationTemplate
permalink: class-ApplicationTemplate
parent: Classes
---

# ApplicationTemplate

An ApplicationTemplate provides a template to create applications based on parameters passed into the template when it is being used to create an application.

![Logical Diagram](./logical.png)

## Attributes

* name:string - Name of the Application Template
* args:json - Name value pairs used for the creation of applications from the template.


## Associations

| Name | Cardinality | Class | Composition | Owner | Description |
| --- | --- | --- | --- | --- | --- |
| app | n | Application | false | false |  |







## Methods
* [allocateResources() - Method to allocate resources for a specific application](#action-allocateResources)
* [deleteApplication() - This method could be used to delete a specific application created from the template.](#action-deleteApplication)
* [duplicateApplication() - Method to duplicate an existing application](#action-duplicateApplication)
* [getApplication() - This method could be used to get details of all applications created from the template.](#action-getApplication)
* [getApplicationTemplate() - Method to get the details of the application template](#action-getApplicationTemplate)
* [getApplicationUsage() - Method to get the usage of a specific application](#action-getApplicationUsage)
* [listApplications() - This method could be used to list all applications created from the template.](#action-listApplications)
* [setTemplate() - Method to set a new application template](#action-setTemplate)
* [updateApplication() - This method could be used to update a specific application created from the template.](#action-updateApplication)
* [validateParameters() - This method could be used to validate the parameters passed for the creation of application.](#action-validateParameters)


<h2>Method Details</h2>
    
### Action applicationtemplate allocateResources



* REST - applicationtemplate/allocateResources?appName=string&amp;resources=json
* bin - applicationtemplate allocateResources --appName string --resources json
* js - applicationtemplate.allocateResources({ appName:string,resources:json })

#### Description
Method to allocate resources for a specific application

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| appName | string | | Name of the application |
| resources | json | | The JSON object containing name-value pairs for resources |




### Action applicationtemplate deleteApplication



* REST - applicationtemplate/deleteApplication?appName=string
* bin - applicationtemplate deleteApplication --appName string
* js - applicationtemplate.deleteApplication({ appName:string })

#### Description
This method could be used to delete a specific application created from the template.

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| appName | string | | Name of the application. |




### Action applicationtemplate duplicateApplication



* REST - applicationtemplate/duplicateApplication?appName=string&amp;newAppName=string
* bin - applicationtemplate duplicateApplication --appName string --newAppName string
* js - applicationtemplate.duplicateApplication({ appName:string,newAppName:string })

#### Description
Method to duplicate an existing application

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| appName | string | | Name of the application to duplicate |
| newAppName | string | | Name for the new application |




### Action applicationtemplate getApplication



* REST - applicationtemplate/getApplication?appName=string
* bin - applicationtemplate getApplication --appName string
* js - applicationtemplate.getApplication({ appName:string })

#### Description
This method could be used to get details of all applications created from the template.

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| appName | string | | Name of the application. |




### Action applicationtemplate getApplicationTemplate



* REST - applicationtemplate/getApplicationTemplate?
* bin - applicationtemplate getApplicationTemplate 
* js - applicationtemplate.getApplicationTemplate({  })

#### Description
Method to get the details of the application template

#### Parameters

No parameters



### Action applicationtemplate getApplicationUsage



* REST - applicationtemplate/getApplicationUsage?appName=string
* bin - applicationtemplate getApplicationUsage --appName string
* js - applicationtemplate.getApplicationUsage({ appName:string })

#### Description
Method to get the usage of a specific application

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| appName | string | | Name of the application |




### Action applicationtemplate listApplications



* REST - applicationtemplate/listApplications?
* bin - applicationtemplate listApplications 
* js - applicationtemplate.listApplications({  })

#### Description
This method could be used to list all applications created from the template.

#### Parameters

No parameters



### Action applicationtemplate setTemplate



* REST - applicationtemplate/setTemplate?template=json
* bin - applicationtemplate setTemplate --template json
* js - applicationtemplate.setTemplate({ template:json })

#### Description
Method to set a new application template

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| template | json | | The new application template in JSON format |




### Action applicationtemplate updateApplication



* REST - applicationtemplate/updateApplication?appName=string&amp;args=json
* bin - applicationtemplate updateApplication --appName string --args json
* js - applicationtemplate.updateApplication({ appName:string,args:json })

#### Description
This method could be used to update a specific application created from the template.

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| appName | string | | Name of the application. |
| args | json | | The JSON object containing updated name value pairs. |




### Action applicationtemplate validateParameters



* REST - applicationtemplate/validateParameters?args=json
* bin - applicationtemplate validateParameters --args json
* js - applicationtemplate.validateParameters({ args:json })

#### Description
This method could be used to validate the parameters passed for the creation of application.

#### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| args | json | | The JSON object containing name value pairs used for creation of applications from the template. |





