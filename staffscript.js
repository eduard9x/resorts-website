$(document).ready(function(){
  $(".save").on("click", function(){
      // var myFavouriteProperties = [];
      try{
          $(this).attr('disabled', true);
          //restoreArrayData();

          //get the staff id to be added to fav list
          var staffIdToAdd = $(this).closest("p").attr("id");

          var myFavouriteStaff = JSON.parse(localStorage.getItem("favStaff"));
          if(myFavouriteStaff == null){
            myFavouriteStaff = [];
          }

          var alreadyExists = false;
          for(var i in myFavouriteStaff){
            if(myFavouriteStaff[i] == staffIdToAdd) alreadyExists = true;
          }

          if(alreadyExists == false){
                // adding it to the favourite list, if it's not already therej

                // add the staff id to the arrays of favourite staff
                myFavouriteStaff.push(staffIdToAdd);

                // and add the content of the array to the local storage
                localStorage.setItem("favStaff", JSON.stringify(myFavouriteStaff));
          }
          else {
                alert("This staff has already been added to the favourite list.");
          }
      }

      catch (e) {
          if(e == QUOTA_EXCEEDED_ERR){
            console.log("Error: Local Storage limit exceeds.");
          }
          else {
            console.log("Error: Saving to local storage.");
          }
      }
  });


$(".clear").on("click", function(){

          $.getJSON('data.json', function(data) {

                    myFavouriteStaff = JSON.parse(localStorage.getItem("favStaff"));

                  alert(myFavouriteStaff);

                    if(myFavouriteStaff!=null)
                      for(var i=0;i<data.users.length;i++)
                        for(var j=0;j<myFavouriteStaff.length;j++)
                          if(data.users[i].id==myFavouriteStaff[j]){
                  myFavouriteStaff.splice(j, 1);
                  alert("removed: " + j);
                  }


          });

});

$(".remove").on("click", function(){
        var staffIdToRemove = $(this).closest("p").attr("id");
        var myFavouriteStaff = JSON.parse(localStorage.getItem("favStaff"));
        var confirmRemoval = 0;

        if(myFavouriteStaff!=null && myFavouriteStaff.length!=0){
            for(var i in myFavouriteStaff)
              if(myFavouriteStaff[i] == staffIdToRemove) {
                myFavouriteStaff.splice(i, 1);
                localStorage.setItem("favStaff", JSON.stringify(myFavouriteStaff));
                confirmRemoval = 1;
            }
            if(confirmRemoval == 0) alert("Not saved as favourite.");

        }else{
          alert("Nothing to remove.");
        }
});



});
