const db = require('./../../db/postgresql');

function LogDao() {

    this.insertLog = async (log) => {

        let data = [];
        try {
            let query = `INSERT INTO log_conversaciones(id_conversacion,mensaje,intent,fecha) values($1,$2,$3,$4);`;
            let params = [log.id_conversacion, log.mensaje, log.intent, log.fecha]
            data = await db.query(query, params);
        }
        catch (err) {
            console.log(err);
        }
        return data.rows;

    }

    this.select = async () => {

        let data = [];
        try {
            data = await db.query('SELECT * FROM log_conversaciones');
        }
        catch (err) {
            console.log(err);
        }
        return data.rows;
    }
}



module.exports = new LogDao();