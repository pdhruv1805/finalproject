var express = require('express');
var mysql = require('mysql');
var app = express();
const bodyParser = require('body-parser');
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: true }));
var databaseContext = require('./DbConnection/dbcontext');
var auth = require('./WebAPI/Login/loginAPI');
var petition = require('./WebAPI/Petition/Petition');
var db = databaseContext.DBConnection();

var cors = require('cors')


app.use(cors())


app.use(express.json())
app.use(express.static(__dirname));

// router.get('/',function(req,res)__dirname+'/main.html'));
//   //__dirname : It will resolve to your project folder.
// });{
//   res.sendFile(path.join(


// app.get('/login', function (req, res) {
//   res.sendFile(__dirname + '/main.html');
// });

// app.get('/petition', function (req, res) {
//   res.sendFile(__dirname + '/petition.html');
// });
app.get('/', function (req, res) {
  res.send('<h1>Web is Up and running at port:4001');
});





// get all users.
app.get("/getusers", function (req, res) {
  db.query("select * from user_master", function (error, rows, fields) {
    if (!!error) {
      console.log('error in query');
    } else {
      console.log('successful query');
      console.log(rows);
      res.send(rows);
    }
  });
});

// get specific user details.
// http:localhost:1337/user/1
app.get('/user/:id', (req, res) => {
  db.query('SELECT * FROM user_master WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

// delete user
// http:localhost:1337/delete/1
app.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM user_master WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send('user deleted successfully.');
    else
      console.log(err);
  })
});

// update new user details
app.post('/update', (req, res) => {
  let userDetail = req.body;
  let sqlQuery = '';
  let values = [];


  sqlQuery = 'UPDATE user_master SET UserName = ?, Email =?, Password = ? WHERE Id = ?';

  db.query(sqlQuery, [userDetail.UserName, userDetail.Email, userDetail.Password, userDetail.Id], function (error, rows, fields) {
    if (!!error) {
      console.log(error);
    } else {
      res.send('Record updated successfully.');
    }
    // console.log(rows);
    // res.send(rows);

  });
});


// // Petition function

// / localhost:3000/getpetition
app.get("/getpetition", function (req, res) {
  petition.GetPetition().then
    ((response) => {
      res.send(response);
    });
});

// get specific petition details.
// http:localhost:3000/peititon/1
app.get('/peititon/:petitionId', (req, res) => {
  db.query('SELECT * FROM Petition_Master WHERE petitionId = ?', [req.params.petitionId], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});


// delete petition
// http:localhost:3000/deletepetition/1
app.delete('/deletepetition/:PetitionId', (req, res) => {
  petition.DeletePetition(req).then
    ((response) => {
      res.send(response);
    });
});

// update new petition details
// {
//	"PetitionId": 1,
//	"Petition": "Adding new petition",
//	"UpdatedBy": 2
// } 
// 
app.post('/updatepetition', (req, res) => {
  let petitionDetail = req.body;
  let sqlQuery = '';
  console.log(petitionDetail);


  sqlQuery = 'UPDATE Petition_Master SET Petition = ?, updatedby = ? WHERE PetitionId = ?';

  db.query(sqlQuery, [petitionDetail.Petition, petitionDetail.updatedby, petitionDetail.PetitionId], function (error, rows, fields) {
    if (!!error) {
      res.send(false);
    } else {
      res.send(true);
    }
    // console.log(rows);
    // res.send(rows);

  });
});


//  /insert new petition details
app.post('/insertpetition', (req, res) => {
  let userDetail = req.body;
  let sqlQuery = '';
  let values = [];
  console.log(userDetail);

  // sqlQuery = 'INSERT INTO Petition_Master (PetitionId,Petition,userId,updatedby) VALUES  ?'
  // values = [[userDetail.PetitionId, userDetail.Petition, userDetail.UserId, userDetail.UpdatedBy]];

  sqlQuery = 'INSERT INTO Petition_Master (Petition,userId) VALUES  ?'
  values = [[userDetail.Petition, userDetail.UserId]];



  db.query(sqlQuery, [values], function (error, rows, fields) {
    if (!!error) {
      console.log(error);
    } else {

      res.send(true);

      // console.log(rows);
      // res.send(rows);
    }
  });
});



// //   Sign Pettion function
// insert sign petition
app.post('/insertsign', (req, res) => {
  let userDetail = req.body;
  let sqlQuery = '';
  let values = [];
  sqlQuery = 'INSERT INTO SignedBy (UserId,PetitionId) VALUES  ?'
  values = [[userDetail.UserId, userDetail.PetitionId]];
  db.query(sqlQuery, [values], function (error, rows, fields) {
    if (!!error) {
      console.log(error);
    } else {
      res.send(rows);
    }
  });
});

app.get('/petitionsign/:petitionId', (req, res) => {
  db.query('SELECT COUNT (*) AS signed FROM SignedBy WHERE petitionId = ?', [req.params.petitionId], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

//Auth File
app.post('/loginuser', (req, res) => {
  var email = req.body.username;
  var password = req.body.password;
  auth.ValidateUser(email, password).then
    ((response) => {
      res.send(response);
    });
});

//  /insert new user details
app.post('/register', (req, res) => {
  auth.RegisterUser(req.body).then
    ((response) => {
      res.send(response);
    });
});

//validate dublicate email
app.post('/validateEmail', (req, res) => {
  auth.ValidateEmail(req.body).then
    ((response) => {
      res.send(response);
    });

});


app.listen(4001);