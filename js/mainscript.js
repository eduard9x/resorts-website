$.getJSON('data.json', function(data) {
  $(document).ready(function(){

    // display the resorts at loading
      display();

      //function for the date picker
        $(".datepicker").datepicker({dateFormat: 'yy-mm-dd'});

      //function for the select menu
      $(function() {
        $("#resortDestination").selectmenu();
        $("#comfortLevel").selectmenu();
        $("#resortActivities").selectmenu();
        $("#resortPrice").selectmenu();
      });

      function display(){

            var output = "" ;
            var showResort = true;

            for (var i=0;i<data.resorts.length;i++){

              //searching for both resorts and comfort level
              if(document.getElementById("resortDestination").value != data.resorts[i].destination && document.getElementById("resortDestination").value != "Any") showResort = false;
              if(document.getElementById("comfortLevel").value != data.resorts[i].comfortLevel && document.getElementById("comfortLevel").value != "Any") showResort = false;

              //searching for activities
              if(showResort==true && document.getElementById("resortActivities").value == "Any");
              else if(document.getElementById("resortActivities").value != "Any"){
                      var numberOfActivities = data.resorts[i].activities.length;
                      var found = false;
                      for (var j=0;j<numberOfActivities;j++){
                      if(document.getElementById("resortActivities").value == data.resorts[i].activities[j]) found = true;
                      }
                      if(found==false) showResort=false;
              }

              //searching for price in all 3 ranges
              if(showResort==true && document.getElementById("resortPrice").value == "Any");
              else if(document.getElementById("resortPrice").value != "Any")

                    if(document.getElementById("resortPrice").value=="less than £50"){
                      if(data.resorts[i].price >= 50) showResort = false;
                    }
                    else if(document.getElementById("resortPrice").value=="between £50 - £100"){
                      if(data.resorts[i].price < 50 || data.resorts[i].price > 100) showResort = false;
                    }
                    else if(document.getElementById("resortPrice").value=="more than £100")
                      if(data.resorts[i].price <= 100) showResort = false;

              //matching if the start date selected is between start and end of resorts'
              if(showResort==true && document.getElementById("StartDate").value.length == 0);
              else if(document.getElementById("StartDate").value.length == 10){

                  var chosenStartDate = document.getElementById("StartDate").value;
                  var jsonEndDate = data.resorts[i].endDate;
                  var jsonStartDate = data.resorts[i].startDate;

                  if(chosenStartDate < jsonStartDate || chosenStartDate > jsonEndDate) {
                    showResort = false;
                }
              }

              //matching if the end date selected is between start and end of resorts'
              if(showResort==true && document.getElementById("EndDate").value.length == 0);
              else if(document.getElementById("EndDate").value.length == 10){

                var chosenEndDate = document.getElementById("EndDate").value;
                var jsonEndDate = data.resorts[i].endDate;
                var jsonStartDate = data.resorts[i].startDate;

                if(chosenEndDate < jsonStartDate || chosenEndDate > jsonEndDate) {
                  showResort = false;
              }
              }

              //if all of them match - show the resort as found
              if(showResort==true) {
                output+="<ul class='columns'><li><img src='" + data.resorts[i].picture + "'><h2><a href='" + data.resorts[i].url + "'>" + data.resorts[i].name + "</a></h2><h4>" + data.resorts[i].startDate + " to " + data.resorts[i].endDate + "</h4><h4>Price per night: £" + data.resorts[i].price + "</h4><h4>" + data.resorts[i].short_description + "</h4>" + "</li></ul>";
              }
              showResort = true;
            }//if all of them don't match - show the not found message
              if(output.length==0) {
                output = "";
                var message = "<h2> Sorry. No results found. </h2> ";
                document.getElementById("noResults").innerHTML=message;
              }
              document.getElementById("placeholder").innerHTML=output;
        }

      //click on search button triggers the display method with is search + display included
      $("#search").on("click", function(){
          display();
      });

      //printing the favourites from the local storage
      $("#viewFavourites").on("click", function(){
          console.log("Restoring array resort from local storage.");
          myFavouriteResort = JSON.parse(localStorage.getItem("favResort"));
          var output = "";
          var message = "<h2> Favourite list is the following: </h2> ";
          if(myFavouriteResort!=null && myFavouriteResort.length!=0){
            for(var i=0;i<data.resorts.length;i++)
              for(var j=0;j<myFavouriteResort.length;j++)
                if(data.resorts[i].id==myFavouriteResort[j]){
                  output+="<ul class='columns'><li><img src='" + data.resorts[i].picture + "'><h2><a href='" + data.resorts[i].url + "'>" + data.resorts[i].name + "</a></h2><h4>" + data.resorts[i].startDate + " to " + data.resorts[i].endDate + "</h4><h4>Price per night: £" + data.resorts[i].price + "</h4><h4>" + data.resorts[i].short_description + "</h4>" + "</li></ul>";
                }
          }
          else{
            output = "";
            message = "<h2> Favourite list is empty. </h2> ";
          }
          document.getElementById("noResults").innerHTML=message;
          document.getElementById("placeholder").innerHTML = output;
      });//printing the messages corresponding to the state - empty or found

      //clearing the favourites from the local storage
      $("#clearFavourites").on("click", function(){
          myFavouriteResort = JSON.parse(localStorage.getItem("favResort"));
          var output = "";
          var message = "<h2> Favourites have been cleared. </h2> ";
          if(myFavouriteResort!=null && myFavouriteResort.length!=0){
            for(var i=0;i<data.resorts.length;i++)
              for(var j=0;j<myFavouriteResort.length;j++)
                if(data.resorts[i].id==myFavouriteResort[j]){
                  myFavouriteResort.splice(j, 1);
                }
          localStorage.setItem("favResort", JSON.stringify(myFavouriteResort));
          }
          else{
            var output = "";
            var message = "<h2> Favourite list is already empty. </h2> ";
          }
          document.getElementById("placeholder").innerHTML = output;
          document.getElementById("noResults").innerHTML=message;
          //TODO might be even easier by making the myFavouriteResort=0; because we clear all favs.
      });

  });
});
