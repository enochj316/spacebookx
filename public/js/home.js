$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      $("#name-top-right").text(data.first_name);
    });

    $.get("/posts").then(data => {
      console.log(data)
      $("#moment-body").text(data[0].body);
      $("#moment-title").text(data[0].title);
      $("#moment-time").text(data[0].createdAt);
    });

});



document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded! 🚀");
    
    const profileButton = document.getElementById("profile-button");
    profileButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.replace("/user_id");
    })
})