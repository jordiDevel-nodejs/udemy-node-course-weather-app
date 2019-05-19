const request = require('request');

const darkSkyAPIURL = 'https://api.darksky.net/forecast';
const darkSkyKey = '69cd6de0a8353ce5d854d285fe5a1f28';

const getWeather = (latitude, longitude, callback) => {
    request({
        url: `${darkSkyAPIURL}\\${darkSkyKey}\\${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Dark Sky servers.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather info.');
        }
    });
};

module.exports = {
    getWeather
};