
const backend = "http://localhost:3000";


async function signup() {
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;

    const response = await axios.post(`${backend}/signup`, {
        email: email,
        password: password
    })

    if(response.status === 200){
        const tokenResponse = await axios.post(`${backend}/signin`, {
        email: email,
        password: password
    })
    if(tokenResponse){
    localStorage.setItem("token",tokenResponse.data.token);
    window.location.replace("http://localhost:3000")
    }
    }
}