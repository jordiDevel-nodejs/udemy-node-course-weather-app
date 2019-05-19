const request = require('request');

const googleMapsAPIURL = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleMapsKey = 'AIzaSyB9r8fO9WCWQagSrzvh_r8krVUvAJZBCQ0';

const geocodeAddress = (address, callback) => {
    const queryAdr = encodeURIComponent(address);

    request({
        url: `${googleMapsAPIURL}?key=${googleMapsKey}&address=${queryAdr}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    
        //Address: Ronda del General Mitre, 138, 08006 Barcelona, Spain
        //Latitude: 41.4031214
        //Longitud: 2.1387521
    });
};

module.exports = {
    geocodeAddress
};
