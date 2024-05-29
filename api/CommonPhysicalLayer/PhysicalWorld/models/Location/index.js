
class Location {
    static definition = {
        name: 'Location',
        description: 'The "Location" class, part of the "pw" package, allows for creating, updating, destroying, manipulating, and retrieving information about various locations, including its name, coordinates (latitude, longitude, altitude), address, associated assets, and additional notes.',
        unique: false,
        extends: false,

        attributes: {
            "name": {
                "type": "string",
                "description": "Name of the Location"
            },
            "lat": {
                "type": "number",
                "description": "Latitude of the Location"
            },
            "long": {
                "type": "number",
                "description": "Longitude of the Location"
            },
            "alt": {
                "type": "number",
                "description": "Altitude of the Location"
            },
            "address": {
                "type": "string",
                "description": "Address of the Location"
            },
            "notes": {
                "type": "string",
                "description": "Address of the Location"
            }
        },

        associations: {
            "assets": {
                "type": "Asset",
                "cardinality": "n",
                "composition": false,
                "owner": true,
                "name": "assets"
            }
        },
    }
}
module.exports = Location;
