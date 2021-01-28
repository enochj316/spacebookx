const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');
const btnWeatherSearch = document.querySelector('#weatherSearch');


//This function initiates the process of collecting the data from "The Weather APIs" to display on the page 
$(".weatherSearch").on("click", function () {
  var subject = $(".subject").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + subject + "&appid=88d9e018c72362777892f1fbbbb2dfb3";
  var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + subject + "&appid=88d9e018c72362777892f1fbbbb2dfb3";
  var lat;
  var lon;
  if (forecastdisplay === true) {
    $(".forecast-day").remove();
    forecastdisplay = false;
  };


  //This first ajax request collects current weather data and converts info into what is needed to be displayed
  $.ajax({
    url: queryURL,
    method: "GET",
    statusCode: {
      404: function () {
        return;
      }
    }
  }).then(function (response) {
    console.log(response);
    $(".current-box").show();
    var iconcode = response.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $(".icon").attr('src', iconurl)
    lat = response.coord.lat;
    lon = response.coord.lon;
    $(".current-city").text(response.name + " " + moment().format('ll'));
    var currentTemp = response.main.temp - 273.15;
    $(".current-temp").text("Temperature: " + currentTemp.toFixed(1) + " °C");
    $(".current-hum").text("Humidity: " + response.main.humidity + "%");
    $(".current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?&appid=88d9e018c72362777892f1fbbbb2dfb3&lat=" + lat + "&lon=" + lon;

    //This is nested ajax request that gets the UV index but uses longitude and latitude from the previous ajax request 
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $(".current-uv").text("UV Index: " + response[0].value);
    })
  });

  // Javascript for the Hamburger toggle menu
  btnHamburger.addEventListener('click', function () {
    console.log('click hamburger');

    if (header.classList.contains('open')) { // Close Hamburger Menu
      body.classList.remove('noscroll');
      header.classList.remove('open');
      fadeElems.forEach(function (element) {
        element.classList.remove('fade-in');
        element.classList.add('fade-out');
      });

    }
    else { // Open Hamburger Menu
      body.classList.add('noscroll');
      header.classList.add('open');
      fadeElems.forEach(function (element) {
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