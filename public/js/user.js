$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      $("#user-name").text(data.first_name);
    });

    $.get("/posts").then(data => {
        console.log(data)
        $("#moment-body").text(data[0].body);
        $("#moment-title").text(data[0].title);
        $("#moment-time").text(data[0].createdAt);
      });
});