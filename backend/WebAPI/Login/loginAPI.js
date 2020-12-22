var databaseContext = require('../../DbConnection/dbcontext');
var db = databaseContext.DBConnection();
var Promise = require('promise');


exports.ValidateUser = function (email, password) {

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user_master WHERE email = ?', [email], function (error, results, fields) {
      if (error) {
        resolve({
          status: false,
          message: 'there are some error with query'
        });
      } else {
        if (results.length > 0) {
          if (password == results[0].Password) {
            resolve({
              data: results[0].Id,
              status: true,
              message: 'successfully authenticated'
            });


          } else {
            resolve({
              status: false,
              message: "Email and password does not match"
            });
          }

        }
        else {
          resolve({
            status: false,
            message: "Email does not exits"
          });
        }
      }
    });

  });

}


exports.RegisterUser = function (userDetail) {
  let sqlQuery = '';

  sqlQuery = 'INSERT INTO user_master (UserName,Email,Password,ContactNo) VALUES  ?'
  values = [[userDetail.UserName, userDetail.Email, userDetail.Password, userDetail.Contact]];

  return new Promise((resolve, reject) => {
    db.query(sqlQuery, [values], function (error, rows, fields) {
      if (!!error) {
        resolve({
          status: false,
          message: 'Error while creating user! Please try after sometime.'
        })
      } else {
        resolve({
          status: true,
          message: 'successfully authenticated'
        })
      }
    });
  });
}


exports.ValidateEmail = function (userDetail) {
  return new Promise((resolve, reject) => {
    let sqlQuery = '';
    sqlQuery = 'SELECT * FROM user_master WHERE Email = ?';
    db.query(sqlQuery, [userDetail.Email], function (error, rows, fields) {
      if (!!error) {
        resolve(false)
      }
      if (rows && rows.length > 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    });
  });
}