
const getData = () => {
    const data = [
        { user: 'admin', text: "Hola! Soy Covibot ;). Puedo ayudarte con los siguientes temas:" },
        { user: 'admin', text: "1- Preguntas Frecuentes." },
        { user: 'admin', text: "2- Casos confirmados en Perú." },
        { user: 'admin', text: "3- Casos confirmados por país." }
    ]
    return data;
}


const getFqa = () => {
    const data = [
        { user: 'admin', text: "Preguntas Frecuentes :o : " },
        { user: 'admin', text: "1 - ¿Cuáles son los síntomas de la COVID-19?" },
        { user: 'admin', text: "2 - ¿Cuándo aparecen los síntomas de la COVID-19?" },
        { user: 'admin', text: "3 - ¿Cuánto duran los síntomas de la COVID-19?" },
        { user: 'admin', text: "4 - ¿Cuáles son los grupos vulnerables?" }
    ]
    return data;
}


module.exports = {
    getData,
    getFqa
}