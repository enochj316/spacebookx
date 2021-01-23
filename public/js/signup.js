document.addEventListener("DOMContentLoaded", (e) => {
    console.log("Dom loaded!")

    const signUpBtn = document.getElementById("signUpBtn");
    signUpBtn.addEventListener("submit", (e) => {
        e.preventDefault();
        //grab values of the form fields
        //fetch POST with values as a JSON object 
        const newUser = {
            //first name : document getElementbyID
            //last name : document getElementbyID
            //email : document getElementbyID
            //phonenumber: document getElementbyID
            //password : document getElementbyID
        }
        fetch('/posts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', 
            },
            body: newUser
        }).then(() => {
            location.replace("www.google.ca");
        })
    })
})