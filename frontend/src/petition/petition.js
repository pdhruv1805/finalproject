$(document).ready(function () {
    var petitonList = [];
    var selectedRecord = '';
    var loggedInuserId = 0;
    loadPetition();


  

    $("#signout").click(function (e) {
      sessionStorage.removeItem('UserId');
      location.href = '../login';
      //  throw "Reloading Page";
    });


  
    $("#addPetition").click(function (e) {


      var form = { Petition: document.getElementById("textarea").value, UserId: sessionStorage.getItem("UserId") };
      $.ajax({
        type: "POST",
        url: "http://localhost:4001/insertpetition",
        data: form,
        success: function (data) {
          if (data) {
            // window.location.href = "http://localhost:3000/petition";
            alert('Petiton saved successfully'); // show response from the php script.}
            document.getElementById("textarea").value = '';
            loadPetition();
          } else {
            alert('Error while saving petititon'); // show response from the php script.}
          }
          $('#AddDialog').modal('toggle');
        }

      });
    });


  });

  function signpetition(Id) {

    var form = { PetitionId: Id, UserId: sessionStorage.getItem("UserId") };
    $.ajax({
      type: "POST",
      url: "http://localhost:4001/insertsign",
      data: form,
      success: function (data) {
        if (data) {
          alert('Petiton signed successfully'); // show response from the php script.}              
          loadPetition();
        } else {
          alert('Error while signing petititon'); // show response from the php script.}
        }
      }
    });
  }

  function loadPetition() {
    $.ajax({
      type: "GET",
      url: "http://localhost:4001/getpetition",
      //  data: form.serialize(), // serializes the form's elements.
      success: function (data) {
        if (data) {
          window.petitonList = data;
          var list = '';
          $("#tbody").empty('');
          for (i = 0; i < data.length; i++) {
            list += "<tr class='row'> id=" + data[i].PetitionId + ">";
            list += "<td class='col-lg-2'>" + (i + 1) + "</td>";
            list += "<td class='col-lg-4'>" + data[i].Petition + "</td>";
            list += "<td class='col-lg-2'>" + data[i].TotalSign + "</td>";
            list += "<td class='col-lg-4'>";
            list += "<button type='button' onclick='onEdit(" + i + ")' class='btn btn-primary btn-sm' >Edit</button>&nbsp;";
            list += "<button type='button' onclick='deletePetition(" + data[i].PetitionId + ")' class='btn btn-danger btn-sm'>Delete</button>&nbsp;";
            list += "<button type='button' onclick='signpetition(" + data[i].PetitionId + ")' class='btn btn-secondary btn-sm'>Sign</button>";
            list += "</td>";
            list += "</tr>";
          }
          $("#tbody").append(list);
        } else {
          //  alert(data.message); // show response from the php script.}
        }
      }

    });
  }

  function deletePetition(petitionId) {
    $.ajax({
      type: "DELETE",
      url: "http://localhost:4001/deletepetition/" + petitionId,
      //  data: form.serialize(), // serializes the form's elements.
      success: function (data) {
        if (data) {
          alert('petiton deleted successfully'); // show response from the php script.}
          loadPetition();
        } else {
          alert('Error while deleting petititon'); // show response from the php script.}
        }
      }
    });
  }

  function onEdit(index) {
    $('#exampleModalCenter').modal('show');
    window.selectedRecord = window.petitonList[index];
    document.getElementById("editpetition").value = selectedRecord.Petition;

  }

  function updatePetition() {
    var obj = {
      Petition: document.getElementById("editpetition").value,
      PetitionId: window.selectedRecord.PetitionId,
      updatedby: sessionStorage.getItem("UserId")
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:4001/updatepetition",
      data: obj, // serializes the form's elements.
      success: function (data) {
        if (data) {
          $('#exampleModalCenter').modal('toggle');
          alert('petiton updated successfully'); // show response from the php script.}
          loadPetition();
        } else {
          alert('Error while updating petititon'); // show response from the php script.}
        }
      }
    });
  }