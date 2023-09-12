export default function loginPage () {
    document.getElementById('login').addEventListener('click', async () => {
        const userNameArea = document.getElementById('userNameArea');
        let response = await fetch('http://127.0.0.1:8090/loginPage');
        response = await response.text();
        mainDiv.innerHTML = response;
        document.getElementById('loginSubmit').addEventListener('click', async () => {
            console.log("bdhfdjfdsjfkadjf")
        const username = document.getElementById('loginUsername').value;
        event.preventDefault();
        let response = await fetch('http://127.0.0.1:8090/login?username=' + username);
        response = await response.text();
        if (response == "OK") {
            alert('You are now logged in as ' + username);
            userNameArea.innerHTML = "<i class='bi bi-person-fill'></i> " + username;
        } else {
            alert("This isn't a valid username");
            }
        });
        document.getElementById('createNewUser').addEventListener('click', async () => {
            const username = document.getElementById('loginUsername').value;
            let response = await fetch('http://127.0.0.1:8090/users/create',
            {
                method: 'POST',
                body: JSON.stringify(
                {
                    username
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            response = await response.text();
            if (response == "OK") {
                alert('User Created. You are now logged in as ' + username);
                userNameArea.innerHTML = "<i class='bi bi-person-fill'></i> " + username;
            }
            else {
                alert('This username is already in use. Please try another')
            }
        });
    });
}
