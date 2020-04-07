const { getStatusPeru, getStatusByCountry } = require('./covid');


const interpretarResponse = async (result) => {

    let response = {}

    response.user = 'admin';

    response.text = result.output.generic[0].text;

    if (result.output.intents.length > 0) {
        if (result.output.intents[0].intent == 'menu') {
            response.menu = true;
        }

        if (result.output.intents[0].intent == 'fqa' && result.output.generic[0].text == 'fqa') {
            response.fqa = true;
        }
    }

    if (result.output.entities.length > 0) {

        const entities = result.output.entities;
        if (entities[0].entity == 'peru' || entities[0].entity == 'pais') {
            response.text = await getStatusByCountry(entities[0].value);
        }
    }


    return response;
}


module.exports = {
    interpretarResponse
}