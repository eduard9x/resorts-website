$.getJSON('data.json', function(data) {
  $(document).ready(function(){


      display();

      //function for the date picker
      $(function() {
        $(".datepicker").datepicker();
      });

      //function for the select menu
      $(function() {
        $("#resortDestination").selectmenu();
        $("#comfortLevel").selectmenu();
        $("#resortActivities").selectmenu();
        $("#resortPrice").selectmenu();
      });

      function display(){
          var output="<ul class='columns'>";
          var userDest = $("input:checked").val();
          if(userDest != undefined){
            for (var i in data.resorts) {
                if((userDest == data.resorts[i].destination) || (userDest == "Any"))
                    output+="<li><img src='" + data.resorts[i].picture + "'><h2><a href='" + data.resorts[i].url + "'>" + data.resorts[i].name + "</a></h2><h4> Available between " + data.resorts[i].startDate + " and " + data.resorts[i].endDate + "</h4><h4>Price per night: £"
                     + data.resorts[i].price + "</h4><h4>" + data.resorts[i].short_description + "</h4>" +
                      "</li>";
            }
          output+="</ul>";
          }
          else {
            output= "<h4>Please select an option first.</h4>";
          }
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
