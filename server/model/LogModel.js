const LogDao = require('./dao/LogDao');

function LogModel() {

    this.insertLog = async (log) => {
        return await LogDao.insertLog(log);
    }

    this.select = async () => {
        return await LogDao.select();
    }

}

module.exports = new LogModel();