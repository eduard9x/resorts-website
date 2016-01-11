$.getJSON('../data.json', function(data) {
  $(document).ready(function(){

var pageTitle = document.title;

/*** This will find the current page in the json file ***/
for(var i=0;i<data.resorts.length;i++){
  if(data.resorts[i].name == pageTitle) {

    /*** This will change the header's background to the one corresponding to the resort ***/
    $('header').css('background-image', 'url("../' + data.resorts[i].picture + '")');

    /*** This will add important details about the resort ***/
    var shortDesc = "<h2>" + data.resorts[i].name + "</h2><h4>" + data.resorts[i].destination + ", " + data.resorts[i].location + "</h4><br><h4>"+ data.resorts[i].short_description +"</h4><br>Estimate cost for 7 nights: £" + data.resorts[i].price + "</h4><h4>Comfort level: " + data.resorts[i].comfortLevel + "</h4><h4> Activities: " + data.resorts[i].activities + "</h4><br>";
    document.getElementsByClassName("shortDescription")[0].innerHTML=shortDesc; //need to make it  - i - after

    /*** This will add data inside the tabs ***/
    var longDescription = data.resorts[i].long_description;
    document.getElementsByClassName("longDescription")[0].innerHTML=longDescription;
    var accomodation = "<p> We recommend the following website for cheap prices and good services:<br>" + "<a href='" + data.resorts[i].accomodation + "'>" + data.resorts[i].accomodation + "</a><br>" +
    "<br><p>Some other websites for high quality accommodation and fair prices:</p>" +
    "<ol><li>AirBnB - <a href='https://www.airbnb.co.uk'>https://www.airbnb.co.uk</a></li>"+
      "<li>TripAdvisor - <a href='http://www.tripadvisor.co.uk'>http://www.tripadvisor.co.uk</a></li>"+
      "<li>Booking - <a href='http://www.booking.com'>http://www.booking.com</a></li></li>"+
      "<li>LastMinute - <a href='http://www.lastminute.com'>http://www.lastminute.com</a></li></li></ol>";

    document.getElementsByClassName("accomodation")[0].innerHTML=accomodation;

  }
}

    $(".save").on("click", function(){
      // var myFavouriteProperties = [];
      try{
          $(this).attr('disabled', true);
          $("button.remove").attr('disabled', false);
          //restoreArrayData();

          //get the resort id to be added to fav list
          var resortIdToAdd = $(this).closest("p").attr("id");

          var myFavouriteResort = JSON.parse(localStorage.getItem("favResort"));
          if(myFavouriteResort == null){
            myFavouriteResort = [];
          }

          var alreadyExists = false;
          for(var i in myFavouriteResort){
            if(myFavouriteResort[i] == resortIdToAdd) alreadyExists = true;
          }

          if(alreadyExists == false){
                // adding it to the favourite list, if it's not already therej

                // add the resort id to the arrays of favourite resort
                myFavouriteResort.push(resortIdToAdd);

                // and add the content of the array to the local storage
                localStorage.setItem("favResort", JSON.stringify(myFavouriteResort));

                //show a confirmation message
                var message = "This resort has been added to the favourite list.";
                $("span.message").text(message);
          }
          else {
                var message = "This resort has already been added to the favourite list.";
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
        var resortIdToRemove = $(this).closest("p").attr("id");
        var myFavouriteResort = JSON.parse(localStorage.getItem("favResort"));
        var confirmRemoval = 0;

        //removing a favourite resort from the local storage
        if(myFavouriteResort!=null && myFavouriteResort.length!=0){
            for(var i in myFavouriteResort)
              if(myFavouriteResort[i] == resortIdToRemove) {
                myFavouriteResort.splice(i, 1);
                localStorage.setItem("favResort", JSON.stringify(myFavouriteResort));
                confirmRemoval = 1;
                var message = "Removed from the list.";
                $("span.message").text(message);
              }
            if(confirmRemoval == 0) {
              var message = "Not saved as favourite.";
              $("span.message").text(message);
            }
        }//printing the corresponding message
        else{
          var message = "Nothing to remove.";
          $("span.message").text(message);
        }
    });

  });
});
