const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const queryAdr = encodeURIComponent(argv.a);

const googleMapsAPIURL = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleMapsKey = 'AIzaSyB9r8fO9WCWQagSrzvh_r8krVUvAJZBCQ0';

const geocodeURL = `${googleMapsAPIURL}?key=${googleMapsKey}&address=${queryAdr}`;

axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    const darkSkyAPIURL = 'https://api.darksky.net/forecast';
    const darkSkyKey = '69cd6de0a8353ce5d854d285fe5a1f28';
    
    const latitude = response.data.results[0].geometry.location.lat;
    const longitude = response.data.results[0].geometry.location.lng;

    const weatherURL = `${darkSkyAPIURL}\\${darkSkyKey}\\${latitude},${longitude}`;
    
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherURL);
}).then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});