const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');

// Javascript for the Hamburger toggle menu
btnHamburger.addEventListener('click', () => {
  console.log('click hamburger');

  if(header.classList.contains('open')){ // Close Hamburger Menu
    body.classList.remove('noscroll');
    header.classList.remove('open');    
    fadeElems.forEach((element) =>{
      element.classList.remove('fade-in');
      element.classList.add('fade-out');
    });
    
  }
  else { // Open Hamburger Menu
    body.classList.add('noscroll');
    header.classList.add('open');
    fadeElems.forEach((element) => {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });
  }   
});
  
$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(user => {
      $("#name-top-right").text(user.first_name);
    });
    
    const postButton = document.getElementById("post-button");
    const postTitle = document.getElementById("post-title")	
    const postText = document.getElementById("post-body");	
    postButton.addEventListener("click", (e) => {	
      e.preventDefault();	
      const postObj = {	
        title: postTitle.value.trim(),	
        body: postText.value.trim(),	
      }	

      fetch("/posts", {	
        method: 'POST',	
        headers: {	
            Accept: 'application/json',	
            'Content-Type': 'application/json', 	
        },	
        body: JSON.stringify(postObj)	
    }).then((response) => {	
        console.log(response)	
        location.reload();	
    }).catch(err => {	
        console.log(err)	
    })	
    })

});



document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded! 🚀");
    
    const profileButton = document.getElementById("profile-button");
    profileButton.addEventListener("click", (e) => {
      e.preventDefault();
      $.get("/api/user_data").then(user => {
        location.replace("/user/" + user.id);
      });
      
    })

    const postButton = document.getElementById("post-button");
    const postText = document.getElementById("about");
    postButton.addEventListener("click", (e) => {
      e.preventDefault();
      const postObj = {
        title: "Title",
        body: postText.value.trim(),
      }

      fetch("/posts", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(postObj)
      }).then((response) => {
          console.log(response)
          location.reload();
      }).catch(err => {
          console.log(err)
      })
    })
})