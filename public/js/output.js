
 $(document).ready(function () {

     $("#searchbtn").on("click", function (e) {
         e.preventDefault();

         let query = $("#searchquery").val();
         let url = "https://spacebookx.herokuapp.com/news";

         if (query !== "") {

             $.ajax({

                 url: url,
                 method: "GET",

                 success: function (news) {
                     let output = "";
                     let latestNews = news.results;

                     for (var i in latestNews) {
                         output += `

                         <div class="">
     <div class="">
         <div class="w-full">
            
             <div class="mt-6">
                 <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
                     <div class="flex justify-between items-center">
                         <span class="font-light text-gray-600">${latestNews[i].published_date}</span>

                         <a href="${latestNews[i].url}" target="_blank" class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" id="moment-time">
                         #News
                             </a>
                     </div>
                     <div class="mt-2"><a href="${latestNews[i].url}" target="_blank" class="text-2xl text-gray-700 font-bold hover:underline" id="moment-title">
                             ${latestNews[i].title}
                             </a>
                     </div>
                     <div>
                         <a href="https://newsapi.org/docs/endpoints/top-headlines" target="_blank" class="text-blue-500 hover:underline">
                         ${latestNews[i].nytdsection}: </a>
                         <p class="mt-2 text-gray-600 overflow-ellipsis md:overflow-clip" id="moment-body">
                          ${latestNews[i].abstract}
                         </p>
                         <a href="${latestNews[i].url}" target="_blank" class="btn">Read more</a>
                     </div>
                    
                 </div>
             </div>

         </div>
     </div>
 </div>
               `;
                     }

                     if (output !== "") {
                         $("#newsResults").html(output);
                         M.toast({
                             html: "There you go, nice reading",
                             classes: 'green'
                         });

                     } else {
                         let noNews = `<div style='text-align:center; font-size:36px; margin-top:40px;'>This news isn't available. Sorry about that.<br>Try searching for something else </div>`;
                         $("#newsResults").html(noNews);
                         M.toast({
                             html: "This news isn't available",
                             classes: 'red'
                         });
                     }

                 },

                 error: function () {
                     let internetFailure = `
              <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
              </div>`;

                     $("#newsResults").html(internetFailure);
                     M.toast({
                         html: "We encountered an error, please try again",
                         classes: 'red'
                     });
                 }


             });

         } else {
             console.log("working");
             let missingVal = `<div style="font-size:34px; text-align:center; margin-top:40px;">Please enter any search term in the search engine</div>`;
             $("#newsResults").html(missingVal);
             M.toast({
                 html: "Please enter something",
                 classes: 'red'
             });
         }

     });



     //Gif

     

     $("#gifbtn").on("click", function (e) {
         e.preventDefault();

         let query = $("#searchquery").val();
         let url = "https://spacebookx.herokuapp.com/giphy";

         if (query !== "") {

             $.ajax({

                 url: url,
                 method: "GET",

                 success: function (gif) {
                     let output = "";
                     let giphy = gif.data;

                     for (var i in giphy) {
                         output += `

                         <div class="pt-4">
     <div class="">
         <figure class="bg-gray-300 bg-opacity-10 px-4 rounded-xl w-72">
             <div class="h-auto w-auto">
                 <iframe class=" block h-64 w-64"
                     src="${giphy[i].embed_url}"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope">
                 </iframe>
             </div>
         </figure>
     </div>
 </div>
               `;
                     }

                     if (output !== "") {
                         $("#gifResults").html(output);
                         M.toast({
                             html: "",
                             classes: 'green'
                         });

                     } else {
                         let noGif = `<div style='text-align:center; font-size:36px; margin-top:40px;'>Error</div>`;
                         $("#gifResults").html(noGif);
                         M.toast({
                             html: "Error",
                             classes: 'red'
                         });
                     }

                 },

                 error: function () {
                     let internetFailure = `
              <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
              </div>`;

                     $("#gifResults").html(internetFailure);
                     M.toast({
                         html: "We encountered an error, please try again",
                         classes: 'red'
                     });
                 }


             });

         } else {
             console.log("working");
         }

     });



 });