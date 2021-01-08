# edgemere
Description needs to be written



# Actors
* [Actor](./actors/actor)
* [ApplicationDeveloper](./actors/applicationdeveloper)
* [ChiefDataOfficer](./actors/cdo)
* [DataAnalyst](./actors/analyst)
* [DataEngineer](./actors/dataengineer)
* [DataScientist](./actors/datascientist)
* [DataSteward](./actors/datasteward)
* [DevOpsEngineer](./actors/devops)
* [ITOperations](./actors/itops)
* [StackDeveloper](./actors/stackdev)


# UseCases


![UseCase]('./UseCases.svg')

## Interface
    

# Solution Architecture
The Data Model for the  edgemere shows how the different objects and classes of object interact
and their structure.
* [Application Management Layer]("./package/edgemere/aml")
* [Common Physical Layer]("./package/edgemere/cpl")
* [Distributed Information Management Layer]("./package/edgemere/diml")
* [Identity Aspect]("./package/edgemere/ia")
* [Security Aspect]("./package/edgemere/sa")
* [Service Management Layer]("./package/edgemere/sml")
* [Software Defined Infrastructure]("./package/edgemere/sdi")


![Logical Diagram](./Logical.svg)

## Activities and Flows
The edgemere subsystem provides the following activities and flows.

![Process Diagram](./Process.svg)

## Deployment Architecture
This subsystem is deployed using micro-services as shown in the diagram below. The 'micro' module is
used to implement the micro-services in the system.
The subsystem also has an CLI, REST and Web Interface exposed through a nodejs application. The nodejs
application will interface with the micro-services and can monitor and drive work-flows through the mesh of
micro-services.

![Deployment Diagram](./Deployment.svg)

## Physical Architecture
The edgemere subsystem is is physically laid out on a hybrid cloud infrastructure. Each microservice is shown
how they connect to each other. All of the micro-services communicate to each other and the main app through a
REST interface. A CLI, REST or Web interface for the app is how other subsystems or actors interact. Requests are
forwarded to micro-services through the REST interface of each micro-service.

![Physical Diagram](./Physical.svg)

## Micro-Services
These are the micro-services for the subsystem. The combination of the micro-services help implement
the subsystem's logic.

###local
* admin : edgemere:latest
    * pubsub : redis
    * frontend : traefik:latest
    * web : edgemere_web
    * doc : edgemere_doc
    

###dev
* admin : edgemere:latest
    * aml : aml:latest
    * cpl : cpl:latest
    * diml : diml:latest
    * ia : ia:latest
    * sa : sa:latest
    * sml : sml:latest
    * sdi : sdi:latest
    * pubsub : redis
    * frontend : traefik:latest
    * web : edgemere_web
    * doc : edgemere_doc
    

###test
* admin : edgemere:latest
    * aml : aml:latest
    * cpl : cpl:latest
    * diml : diml:latest
    * ia : ia:latest
    * sa : sa:latest
    * sml : sml:latest
    * sdi : sdi:latest
    * pubsub : redis
    * frontend : traefik:latest
    * web : edgemere_web
    * doc : edgemere_doc
    

###prod
* admin : edgemere:latest
    * aml : aml:latest
    * cpl : cpl:latest
    * diml : diml:latest
    * ia : ia:latest
    * sa : sa:latest
    * sml : sml:latest
    * sdi : sdi:latest
    * pubsub : redis
    * frontend : traefik:latest
    * web : edgemere_web
    * doc : edgemere_doc
    


## Interface Details

