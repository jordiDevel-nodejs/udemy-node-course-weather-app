const request = require('request');

const googleMapsAPIURL = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleMapsKey = 'AIzaSyB9r8fO9WCWQagSrzvh_r8krVUvAJZBCQ0';

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const queryAdr = encodeURIComponent(address);

        request({
            url: `${googleMapsAPIURL}?key=${googleMapsKey}&address=${queryAdr}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('Barcelona Spain').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});