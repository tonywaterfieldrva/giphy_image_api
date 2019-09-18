var search_items = ["Ferrets", "Dogs", "Cats", "Parrots", "Sled Dogs", "Alligators", "Foxes", "Crabs"];
var gif_image_counter = 0;

// EVENT LISTENERS ----------------------------

function renderButtons() {
    $(".api-search").empty();
    for (x = 0; x < search_items.length; x++) {
        var array_item = search_items[x];
        console.log(array_item);
        var a = $("<button>");
        a.addClass("button-wrapper");
        a.attr("data-name", array_item);
        a.text(array_item);
        a.val(array_item);
        $(".api-search").append(a);
        var giphyterm = $(".api-search").val();
        console.log("render button giphyterm", giphyterm);
    };
}

$("#search-button").on("click", function(event) {
    event.preventDefault();
    var createTerm = $("#search").val();
    console.log("search button " + createTerm);
    if (createTerm !== "") {  
      if (search_items.includes(createTerm)) {
           alert(createTerm + " button has already been created");

          }
         else {
         //   console.log("#search-button: " + createTerm);
             search_items.push(createTerm);
             renderButtons(); 
             $("#search").val('');
       };
    }
      else {
        alert("Please enter a term value");
      }
}) 

  function giphy_api_search(giphy_term) { 
   $(".image-content").empty(); 
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
     giphy_term + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
     $.ajax ({
        url: queryURL,
        method: "GET"
     }).then(function(response) {
        var results = response.data;
 
     for (var x=0; x<results.length; x++) {
         var giph = results[x];
         var images = giph.images;
         var rating = giph.rating;
         var template = `
           <div class="giphy">
             <div class="giphy-image">
                 <img
                   src="${images.original_still.url}"
                   data-still="${images.original_still.url}"
                   data-animate="${images.original.url}"
                   data-state="still">
                 <i class="fa fa-play img-play"></i>
             </div>
             <div class="giphy-info">
                 <p>Rating: ${rating}</p>
             </div>
           </div>
            `;
        $(".image-content").prepend(template);
        }

    });
}     

 function image_click() {
  var giphyCard = $(this);
  var img = giphyCard.find('img');
  var play_icon = giphyCard.find('i');

  var still = img.attr("data-still");
  var animate = img.attr("data-animate");
  var state = img.attr("data-state");
     
      if (state === "still") {
          img.attr({
              src: animate,
              "data-state": "animate"
          });
          play_icon.removeClass("img-play");
          
          
      }
      else {
        img.attr({
          src: still,
          "data-state": "still"
      });
          play_icon.addClass("img-play");  
    }
  }

  function giphy_api_search_by_button() {
    var buttonName = $(this).attr("data-name");
    var buttonParent = $(this).parent();
    $(".btn").parent().removeClass("active");
    buttonParent.addClass("active");
    console.log("buttonName", buttonName);
    giphy_api_search(buttonName);
  }

  function clearResults(event) {
    event.preventDefault();
    $(".image-content").html("<p>Reults have been cleared</p>");
    console.log("clearResults");
  }

  function searchValCheck() {

    var value = $(this).val();
    console.log("searchValCheck " + value);
    if (value) {
      console.log("Value True");
      $("#search-button").prop("disabled", false);
    }
    else {
      console.log("Value False");
      $("#search-button").prop("disabled", true);
    } 
  }
 
//

// $(document).on("click", ".button-wrapper", giphy_api_search);
 $(document).on("click", ".giphy-image", image_click);
 $(document).on("click", ".button-wrapper", giphy_api_search_by_button);   
 
 $("#clear-results").on("click", clearResults);
 $("#search").on("keyup", searchValCheck);
 renderButtons();
