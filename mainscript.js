$.getJSON('data.json', function(data) {
  $(document).ready(function(){
      display();
      function display(){
          var output="<ul>";
          var userDept = $("input:checked").val();
          if(userDept != undefined){
            for (var i in data.users) {
                if((userDept == data.users[i].dept) || (userDept == "Any"))
                    output+="<li><a href='" + data.users[i].id + ".html" + "'>" + data.users[i].firstName + " " + data.users[i].lastName + "--" + data.users[i].joined.month+"</a></li>";
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
          console.log("Restoring array data from local storage.");
          myFavouriteStaff = JSON.parse(localStorage.getItem("favStaff"));
          var output = "<ul>";
          if(myFavouriteStaff!=null && myFavouriteStaff.length!=0){
            for(var i=0;i<data.users.length;i++)
              for(var j=0;j<myFavouriteStaff.length;j++)
                if(data.users[i].id==myFavouriteStaff[j]){
                  output+="<li>" + data.users[i].firstName + " " + data.users[i].lastName + "--" + data.users[i].joined.month + " – "+ "<a href='" + data.users[i].id + ".html'>Visit Page</a></li>";
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
            for(var i=0;i<data.users.length;i++)
              for(var j=0;j<myFavouriteStaff.length;j++)
                if(data.users[i].id==myFavouriteStaff[j]){
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
