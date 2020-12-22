var databaseContext = require('../../DbConnection/dbcontext');
var db = databaseContext.DBConnection();
var Promise = require('promise');


exports.GetPetition = function (userDetail) {
    return new Promise((resolve, reject) => {
        db.query("SELECT p.PetitionId,p.Petition , count(s.id) AS TotalSign FROM petition_master p LEFT JOIN signedby s on p.PetitionId = s.PetitionId GROUP BY p.PetitionId ", function (error, rows, fields) {
            if (!!error) {
                resolve('');
            } else {
                resolve(rows);
            }
        });
    });
}

exports.DeletePetition = function (req) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Petition_Master WHERE PetitionId = ?', [req.params.PetitionId], (err, rows, fields) => {
            if (!err)
                resolve(true);
            else
                resolve(err);
        })
    });
}


