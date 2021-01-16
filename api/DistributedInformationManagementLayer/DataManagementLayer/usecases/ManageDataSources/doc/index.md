[DataSources](class-datasource) contain information on how to access data generated in the system. Only through
a [DataSource](class-datasource) can [Data](class-data) be added to the management of the
system. [DataSources](class-datasource) can be of several different types. Including filesystems, database, unstructured
data, and custom types. [DataAdaptors](class-dataadaptor) are used to convert data generated to [Data](class-data) that
can be used in the system. A [DataSource](class-datasource)
can have multiple [DataAdapators](class-dataadaptor) attached to it. The [DataAdaptor] is utilized by a
[DataBlueprint](class-datablueprint) which defines how [Data](class-data) can be utilized in the system. When
a [DataSource](class-datasource) is registered to the system it is made available for
any [DataBlueprint](class-datablueprint)
to use it to generate [Meta Data](class-metadata) in the system, so that [Applications](class-application) and
[Services](class-services) can utilize the [Data](class-data).

When a [DataSource] is unregisted all of the [DataBluePrint Instances](class-datablueprintinstance) are disabled and all
of the [data](class-data) is disabled. As a result all the [meta-data](class-metadata) corresponding to the data is
marked as unavailable. The Meta-data should not be removed because history of data and application interaction continues
to be important in the system. Only through [policies](class-policy) should the [meta-data](class-metadata) be removed
from the catalog. The following diagram shown how the system works when a [DataSource](class-datasource) is registered
and unregistered

![Sequence Diagram](./sequence.svg)
