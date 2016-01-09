$.getJSON('data.json', function(data) {
  $(document).ready(function(){

var pageTitle = document.title;

/*
** This will find the current page in the json file
*/

for(var i=0;i<data.resorts.length;i++){
  if(data.resorts[i].name == pageTitle) {

/*
** This will add important details about the resort
*/

    var shortDesc = "<h2> NEED TO ADD LARGE IMAGE, THUMBNAIL IMAGES AND SHORT DESCRIPTION " + data.resorts[i].name + "</h2> - <h4>" + data.resorts[i].destination + "</h4> - <h4>" + data.resorts[i].price + "</h4><p><h3>" + data.resorts[i].location + "</h3> - <h4>" + data.resorts[i].comfortLevel + "</h4><h4> Activities: " + data.resorts[i].activities + "</h4></p>";
    document.getElementsByClassName("shortDescription")[0].innerHTML=shortDesc; //need to make it  - i - after

/*
** This will add data inside the tabs
*/

    var longDescription = data.resorts[i].long_description;
    document.getElementsByClassName("longDescription")[0].innerHTML=longDescription;
    var accomodation = data.resorts[i].accomodation;
    document.getElementsByClassName("accomodation")[0].innerHTML=accomodation;
    var googleMaps = data.resorts[i].google_maps;
    document.getElementsByClassName("googleMaps")[0].innerHTML=googleMaps;

  }
}


    $(".save").on("click", function(){
      // var myFavouriteProperties = [];
      try{
          $(this).attr('disabled', true);
          $("button.remove").attr('disabled', false);
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

                //show a confirmation message
                var message = "This staff has been added to the favourite list.";
                $("span.message").text(message);
          }
          else {
                var message = "This staff has already been added to the favourite list.";
                $("span.message").text(message);
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

    $(".remove").on("click", function(){
        $(this).attr('disabled', true);
        $("button.save").attr('disabled', false);
        var staffIdToRemove = $(this).closest("p").attr("id");
        var myFavouriteStaff = JSON.parse(localStorage.getItem("favStaff"));
        var confirmRemoval = 0;

        if(myFavouriteStaff!=null && myFavouriteStaff.length!=0){
            for(var i in myFavouriteStaff)
              if(myFavouriteStaff[i] == staffIdToRemove) {
                myFavouriteStaff.splice(i, 1);
                localStorage.setItem("favStaff", JSON.stringify(myFavouriteStaff));
                confirmRemoval = 1;
                var message = "Removed from the list.";
                $("span.message").text(message);
              }
            if(confirmRemoval == 0) {
              var message = "Not saved as favourite.";
              $("span.message").text(message);
            }
        }
        else{
          var message = "Nothing to remove.";
          $("span.message").text(message);
        }
    });

    $(".showActivities").on("click", function(){
      var staffToFindActivity = $(this).closest("p").attr("id");
      for(var i=0;i<data.resorts.length;i++){
        if(data.resorts[i].id == staffToFindActivity) {
          // alert(data.resorts[i].activities);
        }
      }



    });

  });
});
