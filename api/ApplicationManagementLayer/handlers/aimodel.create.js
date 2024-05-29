module.exports = {
    "name": "aimodel.create",
    'handlers': {
        '0': {
            "description": "This event would trigger when a new AI Model is created. The corresponding event handler 'AIModelCreatedEventHandler' could be responsible for keeping track of AI model count, logging the event, adding an entry into the database, or notifying the relevant teams.",
            "fn": (data) => {
                return data;
            },
        },
    },
};
