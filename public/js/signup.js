document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded! 🚀")

    

    const signUpBtn = document.getElementById("sign-up-btn");
    signUpBtn.addEventListener("click", (event) => {
        event.preventDefault();
        //grab values of the form fields
        //fetch POST with values as a JSON object 

        const newUser = {
            first_name : document.getElementById("first-name-input").value.trim(),
            last_name : document.getElementById("last-name-input").value.trim(),
            email : document.getElementById("email-input").value.trim(),
            phonenumber: document.getElementById("phone-number-input").value.trim(),
            imageurl: document.getElementById("image-url-input").value.trim(),
            password : document.getElementById("password-input").value.trim(),
        }
        fetch('/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(newUser)
        }).then(() => {
            location.replace("/");
        })
    })
    

})