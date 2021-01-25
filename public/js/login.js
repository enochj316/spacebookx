document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded! 🚀");
    
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const loginUser = {
            email: document.getElementById("email-login").value.trim(),
            password: document.getElementById("password-login").value.trim()
        }
        fetch("/api/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(loginUser)
        }).then((response) => {
            window.location.assign(response.url)
        }).catch(err => {
            console.log(err)
        })

    })
})