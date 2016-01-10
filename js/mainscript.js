$.getJSON('data.json', function(data) {
  $(document).ready(function(){

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

              if(document.getElementById("resortDestination").value != data.resorts[i].destination && document.getElementById("resortDestination").value != "Any") showResort = false;
              if(document.getElementById("comfortLevel").value != data.resorts[i].comfortLevel && document.getElementById("comfortLevel").value != "Any") showResort = false;

              if(showResort==true && document.getElementById("resortActivities").value == "Any");
              else if(document.getElementById("resortActivities").value != "Any"){
                      var numberOfActivities = data.resorts[i].activities.length;
                      var found = false;
                      for (var j=0;j<numberOfActivities;j++){
                      if(document.getElementById("resortActivities").value == data.resorts[i].activities[j]) found = true;
                      }
                      if(found==false) showResort=false;
              }


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

                if(showResort==true && document.getElementById("StartDate").value.length == 0);
                else if(document.getElementById("StartDate").value.length == 10){

                  var chosenStartDate = document.getElementById("StartDate").value;
                  var jsonEndDate = data.resorts[i].endDate;
                  var jsonStartDate = data.resorts[i].startDate;

                  if(chosenStartDate < jsonStartDate || chosenStartDate > jsonEndDate) {
                    showResort = false;
                }
              }

              if(showResort==true && document.getElementById("EndDate").value.length == 0);
              else if(document.getElementById("EndDate").value.length == 10){

                var chosenEndDate = document.getElementById("EndDate").value;
                var jsonEndDate = data.resorts[i].endDate;
                var jsonStartDate = data.resorts[i].startDate;

                if(chosenEndDate < jsonStartDate || chosenEndDate > jsonEndDate) {
                  showResort = false;
              }
              }

              if(showResort==true) {
                output+="<ul class='columns'><li><img src='" + data.resorts[i].picture + "'><h2><a href='" + data.resorts[i].url + "'>" + data.resorts[i].name + "</a></h2><h4>" + data.resorts[i].startDate + " to " + data.resorts[i].endDate + "</h4><h4>Price per night: £" + data.resorts[i].price + "</h4><h4>" + data.resorts[i].short_description + "</h4>" + "</li></ul>";
              }
              showResort = true;
            }

            if(output.length==0) output = "<h2> Sorry. No results found. </h2> "

              document.getElementById("placeholder").innerHTML=output;

        }


      $("#search").on("click", function(){
          display();
      });

      $("#viewFavourites").on("click", function(){
          console.log("Restoring array resort from local storage.");
          myFavouriteResort = JSON.parse(localStorage.getItem("favResort"));
          var output = "<ul>";
          if(myFavouriteResort!=null && myFavouriteResort.length!=0){
            for(var i=0;i<data.resorts.length;i++)
              for(var j=0;j<myFavouriteResort.length;j++)
                if(data.resorts[i].id==myFavouriteResort[j]){
                  output+="<li>" + data.resorts[i].name + " " + data.resorts[i].price + "--" + data.resorts[i].picture + " – "+ "<a href='" + data.resorts[i].url + "'>Visit Page</a></li>";
                }
            output+="</ul>";
          }
          else{
            output = "<h4>Favourite list is empty.</h4>";
          }
          document.getElementById("placeholder").innerHTML = output;
      });

      $("#clearFavourites").on("click", function(){
          myFavouriteResort = JSON.parse(localStorage.getItem("favResort"));
          var output = "<h4>Favourites have been cleared.</h4>";
          if(myFavouriteResort!=null && myFavouriteResort.length!=0){
            for(var i=0;i<data.resorts.length;i++)
              for(var j=0;j<myFavouriteResort.length;j++)
                if(data.resorts[i].id==myFavouriteResort[j]){
                  myFavouriteResort.splice(j, 1);
                }
          localStorage.setItem("favResort", JSON.stringify(myFavouriteResort));
          }
          else{
            var output = "<h4>Favourite list is already empty.</h4>";
          }
          document.getElementById("placeholder").innerHTML = output;
          //TODO might be even easier by making the myFavouriteResort=0; because we clear all favs.
      });

  });
});
