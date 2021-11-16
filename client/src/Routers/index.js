import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import isAuthenticated from '../auth';
import Login from '../Pages/Login';
import Home from '../Pages/Home';

import axios from 'axios';

// const isAuthenticated = () => {
//     axios.get('http://localhost:3001/isUserAuth', {
//         headers: {
//             "x-access-token": localStorage.getItem("token")
//         }
//     }).then((response) => {
//         console.log(response.data.auth)
//         if (!response.data.auth){
//             return false;
//         } else {
//             return true;
//         }
//     })
// }


function Routers() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            if (!response.data.auth) {
                setIsAuth(false);
            } else {
                setIsAuth(true);
            }
        })
    }, [])

    const PrivateRoute = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props => (
                    isAuth ? <Component {...props} /> : <Redirect to="/" />
                )}
            />
        );
    };

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute exact path='/home' component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routers;