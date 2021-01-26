const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');

// Javascript for the Hamburger toggle menu
btnHamburger.addEventListener('click', function(){
  console.log('click hamburger');

  if(header.classList.contains('open')){ // Close Hamburger Menu
    body.classList.remove('noscroll');
    header.classList.remove('open');    
    fadeElems.forEach(function(element){
      element.classList.remove('fade-in');
      element.classList.add('fade-out');
    });
    
  }
  else { // Open Hamburger Menu
    body.classList.add('noscroll');
    header.classList.add('open');
    fadeElems.forEach(function(element){
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });
  }   
});
  
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