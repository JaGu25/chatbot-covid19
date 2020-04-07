const request = require('request');
const CONFIG = require('../config/config');
const moment = require('moment');

const getStatusByCountry = (country) => {
    
    return new Promise((resolve, reject) => {

        request(`${CONFIG.CONFIG.COVID.URL}/total/country/${country}/status/confirmed`, async (error, response, body) => {

            if (error) {
                reject('error');
            }
            if (response && response.statusCode) {
                let res = await JSON.parse(body);
                let ultimo = res[res.length - 1];
                let fecha = moment(ultimo.Date).add(1, 'days').format('DD/MM/YYYY');
                const mensaje = `En ${ultimo.Country} hasta la fecha de ${fecha} hay ${ultimo.Cases} casos confirmados :/. #QuedateEnCasa :'( `;
                resolve(mensaje);
            }

        });

    });
}


module.exports = {
    getStatusByCountry
}