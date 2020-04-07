const CONFIG = {};


//CONFIGURACION BASE DE DATOS
CONFIG.DB = {};
CONFIG.DB.DB_URL = process.env.DB_URL || '<HOST_DB>';
CONFIG.DB.USER = 'postgres';
CONFIG.DB.PASS = process.env.PASS || 'Covid19DB';
CONFIG.DB.PORT = process.env.PORT || '5432';
CONFIG.DB.DB = process.env.DB || 'postgres';


//CONFIGURACION APP
CONFIG.APP = {};
CONFIG.APP.PORT = process.env.PORT || '80';


//CONFIGURACION WATSON
CONFIG.WATSON = {};
CONFIG.WATSON.ID = process.env.ID || '<WATSON_ID>';
CONFIG.WATSON.APIKEY = process.env.APIKEY || '<WATSON_APIKEY>';
CONFIG.WATSON.URL = process.env.URL || '<WATSON_URL>';


//CONFIGURACION COVID

CONFIG.COVID = {};
CONFIG.COVID.URL = process.env.ID || 'https://api.covid19api.com/';


module.exports = {
    CONFIG
}




