const mysql = require('mysql');

module.exports = class DB {
    constructor() {
        this.con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            port: 3333,
            password: 'password',
            database: 'provianten'
        })
    }

    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.con.query(sql, values, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
        })
    }
}

