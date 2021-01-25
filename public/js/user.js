document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded! 🚀");
    
    const nameTop = document.getElementById("name-top-right");
    fetch("/api/user_data", {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', 
        },
    }).then((res) => {
        console.log(res.email)
    })
})