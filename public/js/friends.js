const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');
const btnWeatherSearch = document.querySelector('#weatherSearch');

$(document).ready(() => {
    // Javascript for the Hamburger toggle menu
    btnHamburger.addEventListener('click', () => {
      console.log('click hamburger');
  
      if (header.classList.contains('open')) { // Close Hamburger Menu
        body.classList.remove('noscroll');
        header.classList.remove('open');
        fadeElems.forEach((element) => {
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
})
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded! 🚀");

    const profileButton = document.getElementById("profile-button");
    profileButton.addEventListener("click", (e) => {
      e.preventDefault();
      $.get("/api/user_data").then(user => {
        location.replace("/user/" + user.id);
      });
      
    })
    

    const addFriendBtns = document.querySelectorAll(".add-friend");
    if(addFriendBtns) {
        addFriendBtns.forEach((button) => {
            button.addEventListener("click", (e) => {
                const userFriend = {
                    first_name: e.target.getAttribute("data-firstname"),
                    last_name: e.target.getAttribute("data-lastname")
                }
                fetch('/friends', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(userFriend)
                }).then((response) => {
                    location.reload();
                })

            })
        })
    }

    const deleteFriendBtns = document.querySelectorAll(".delete-friend");
    if(deleteFriendBtns) {
        deleteFriendBtns.forEach((button) => {
            button.addEventListener("click", (e) => {
                const deleteFriendId = e.target.getAttribute("data-id")
                fetch('/friends/' + deleteFriendId, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json', 
                    },
                }).then((response) => {
                    location.reload();
                })

            })
        })
    }


})