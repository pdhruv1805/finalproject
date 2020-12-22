$(document).ready(function () {
    $("#login").submit(function (e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        //  var url = form.attr('action');

        $.ajax({
            type: "POST",
            url: "http://localhost:4001/loginuser",
            data: form.serialize(), // serializes the form's elements.
            success: function (data) {
                if (data.status == true) {
                   
                    sessionStorage.removeItem('UserId'); // before adding new user Id  remove the older one.
                    sessionStorage.setItem("UserId", data.data); // store user id in session storage.
                    location.href = '../petition'; // launch petition page after success login.
                } else {
                    alert(data.message); // show response from the php script.}
                }
            }
        });


    });

    $("#createAccount").submit(function (e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        //  var url = form.attr('action');

        $.ajax({
            type: "POST",
            url: "http://localhost:4001/register",
            data: form.serialize(), // serializes the form's elements.
            success: function (data) {
                if (data.status) {                    
                    alert('New account created succesfully');                    
                    setTimeout(() => {
                        location.href = '../login';
                       
                    }, 500)
                } else {
                    alert(data.message); // show response from the php script.}
                }
            }
        });


    });
});

function validateEmail() {
    var email = document.getElementById("email").value;
    if (email && email.length > 0) {
        $.ajax({
            type: "POST",
            url: "http://localhost:4001/validateEmail",
            data: { Email: email }, // serializes the form's elements.
            success: function (status) {
                if (status) {
                    alert('EmailId already exist!');
                }
            }
        });
    }
}