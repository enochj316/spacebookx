document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded! 🚀");
    

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
                })

            })
        })
    }
})