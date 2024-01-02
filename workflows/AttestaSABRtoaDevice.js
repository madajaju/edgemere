module.exports = {
    name: "Attest a SABR to a Device",
    description: "Attest a SABR to a Device description needs to be completed.",
    activities: {
        // Each activity should map to a use case, scenario, or another workflow.
        // This is the initial activity in the workflow. Everything starts here
        Init: {
            description: "Initial state for the workflow",
            actor: 'Actor', // This could be an actor or package.
            next: {
                "Next Activity": { },
                "Next Activity Bad Case": {
                    condition: {
                        test: "Is this good?",
                        value: "No",
                    }
                },
                "Next Activity Good Case": {
                    condition: {
                        test: "Is this good?",
                        value: "Yes",
                    }
                }
            },
        },
        "Next Activity Good Case": {
            description: "This is the good flow!",
            package: "",
        },
        "Next Activity Good Case": {
            description: "This is the good flow!",
            package: "",
        },
    }
}
