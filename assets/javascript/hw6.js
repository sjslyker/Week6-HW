$(document).ready(function() {
    var animals = [ "dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",  "capybara", "teacup pig", "serval", "salamander", "frog"];
    
    function displayGifButtons(){
        $("#animalOptions").empty(); 
        for (var i = 0; i < animals.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("arrayAnimals");
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#animalOptions").append(gifButton);
        }
    }
    
    function addNewButton(){
        $("#addAnimal").on("click", function(){
        var newAnimal = $("#animalInput").val().trim();
        if (newAnimal == ""){
          return false; 
        }
        animals.push(newAnimal);
    
        displayGifButtons();
        return false;
        });
    }
    
    function displayGifs(){
        var newAnimal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newAnimal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#animalGifs").empty(); 
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");

                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
                $("#animalGifs").prepend(gifDiv);
            }
        });
    }

    displayGifButtons(); 
    addNewButton();
    
    $(document).on("click", ".arrayAnimals", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});
