$(document).ready(function () {

    $("#searchbtn").on("click", function (e) {
        e.preventDefault();

        let query = $("#searchquery").val();
        let url = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=3bc0201431e44a5e939fb1f0e403dff1";

        if (query !== "") {

            $.ajax({

                url: url,
                method: "GET",
                dataType: "json",

                success: function (news) {
                    let output = "";
                    let latestNews = news.articles;

                    for (var i in latestNews) {
                        output += `

                        <div class="">
    <div class="">
        <div class="w-full">
           
            <div class="mt-6">
                <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
                    <div class="flex justify-between items-center">
                        <span class="font-light text-gray-600">${latestNews[i].publishedAt}</span>

                        <a href="#" class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" id="moment-time">
                        #News
                            </a>
                    </div>
                    <div class="mt-2"><a href="#" class="text-2xl text-gray-700 font-bold hover:underline" id="moment-title">
                            ${latestNews[i].title}
                            </a>
                    </div>
                    <div>
                        <a href="https://newsapi.org/docs/endpoints/top-headlines" target="_blank" class="text-blue-500 hover:underline">${latestNews[i].author}: </a>
                        <p class="mt-2 text-gray-600 overflow-ellipsis md:overflow-clip" id="moment-body">
                         ${latestNews[i].description}
                        </p>
                        <a href="${latestNews[i].url}" target="_blank" class="btn">Read more</a>
                    </div>
                    <div class="flex justify-between items-center">
                        <a href="#" class="text-blue-500 hover:underline"> </a>
                        <div class="w-1/3 cover"
                            <a href="#" class="flex items-center"><img
                                    src="${latestNews[i].urlToImage}"
                                    alt="avatar"
                                    class="rounded-lg hidden sm:block">
                            </a>
                        </div>
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
        let url = "https://api.giphy.com/v1/gifs/search?q=funny&api_key=fhyjxSw2icjRND3sWkVDSIduWRwkEPsI&rating=g&limit=1";

        if (query !== "") {

            $.ajax({

                url: url,
                method: "GET",
                dataType: "json",

                success: function (gif) {
                    let output = "";
                    let giphy = gif.data;

                    for (var i in giphy) {
                        output += `

                        <div class="">
    <div class="">
        <figure class="bg-gray-100 px-4 rounded-xl w-72">
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