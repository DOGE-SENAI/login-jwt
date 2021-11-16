import axios from 'axios';

const isAuthenticated = () => {
    axios.get('http://localhost:3001/isUserAuth', {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }).then((response) => {
        console.log(response.data.auth)
        if (!response.data.auth){
            return false;
        } else {
            return true;
        }
    })
}

export default isAuthenticated;