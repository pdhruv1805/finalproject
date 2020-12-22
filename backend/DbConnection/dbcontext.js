var mysql = require('mysql');
exports.DBConnection = function () {

    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456789",
        database: "finalproject"
    });

    db.connect(function (error) {
        if (!!error) {
            console.log('error');
        } else {
            console.log('successful');
        }
    });

    return db;
}