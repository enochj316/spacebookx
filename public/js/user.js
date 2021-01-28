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
      $("#user-name").text(data.first_name);
      // $("#profile-name").text(data.first_name);
      // $("#main-image").attr("src",data.imageurl);
      
    });

    // $.get("/friends").then(data => {
    //   res.render('user', {data: data})
      
    // });
    

    $.get("/posts_user").then(data => {
        console.log(data)
        $("#moment-body").text(data[0].body);
        $("#moment-title").text(data[0].title);
        $("#moment-time").text(data[0].createdAt);
      });
});

let button = document.querySelector('.btn')

 // press the button to toggle the .dark-mode class
button.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode')
})
