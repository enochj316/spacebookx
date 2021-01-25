$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      $("#name-top-right").text(data.email);
    });
  });

// document.addEventListener("DOMContentLoaded", (event) => {
//     console.log("DOM loaded! 🚀");
    
//     const nameTop = document.getElementById("name-top-right");
//     fetch("/api/user_data", {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json', 
//         },
//     }).then((res) => {
//         console.log("logged in!")
//     })
// })