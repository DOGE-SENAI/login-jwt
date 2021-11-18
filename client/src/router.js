import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import PageIsAuth from './Pages/PageIsAuth';

// import axios from 'axios';

function Routers() {
    // const [isAuth, setIsAuth] = useState(false);

    // useEffect(() => {
    //     axios.get("http://localhost:3001/isUserAuth", {
    //         headers: {
    //             "x-access-token": localStorage.getItem("token")
    //         }
    //     }).then((response) => {
    //         if (!response.data.auth) {
    //             setIsAuth(false);
    //         } else {
    //             setIsAuth(true);
    //         }
    //     })
    // }, [])


    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login /> } />
                <Route path="/logando" element={ <PageIsAuth />} />
                <Route path='/home' element={ <Home /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;