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

                        <div class="px-6 pt-2">
    <div class="container mx-auto">
        <div class="w-full lg:w-8/12">
           
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

});