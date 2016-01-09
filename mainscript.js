$.getJSON('data.json', function(data) {
  $(document).ready(function(){
      display();
      function display(){
          var output="<ul class='columns'>";
          var userDest = $("input:checked").val();
          if(userDest != undefined){
            for (var i in data.resorts) {
                if((userDest == data.resorts[i].destination) || (userDest == "Any"))
                    output+="<li><a href='" + data.resorts[i].id + ".html" + "'>" + data.resorts[i].name + " " + data.resorts[i].price + "--" + data.resorts[i].picture+"</a></li>";
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
          myFavouriteStaff = JSON.parse(localStorage.getItem("favStaff"));
          var output = "<ul>";
          if(myFavouriteStaff!=null && myFavouriteStaff.length!=0){
            for(var i=0;i<data.resorts.length;i++)
              for(var j=0;j<myFavouriteStaff.length;j++)
                if(data.resorts[i].id==myFavouriteStaff[j]){
                  output+="<li>" + data.resorts[i].name + " " + data.resorts[i].price + "--" + data.resorts[i].picture + " – "+ "<a href='" + data.resorts[i].id + ".html'>Visit Page</a></li>";
                }
            output+="</ul>";
          }
          else{
            output = "<h4>Favourite list is empty.</h4>";
          }
          document.getElementById("placeholder").innerHTML = output;
      });

      $("#clearFavourites").on("click", function(){
          myFavouriteStaff = JSON.parse(localStorage.getItem("favStaff"));
          var output = "<h4>Favourites have been cleared.</h4>";
          if(myFavouriteStaff!=null && myFavouriteStaff.length!=0){
            for(var i=0;i<data.resorts.length;i++)
              for(var j=0;j<myFavouriteStaff.length;j++)
                if(data.resorts[i].id==myFavouriteStaff[j]){
                  myFavouriteStaff.splice(j, 1);
                }
          localStorage.setItem("favStaff", JSON.stringify(myFavouriteStaff));
          }
          else{
            var output = "<h4>Favourite list is already empty.</h4>";
          }
          document.getElementById("placeholder").innerHTML = output;
          //TODO might be even easier by making the myFavouriteStaff=0; because we clear all favs.
      });

  });
});
