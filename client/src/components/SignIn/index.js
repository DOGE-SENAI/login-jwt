import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './style.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginAuth, setLoginAuth] = useState(false);
    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (!response.data.auth) {
                setLoginAuth(false);
                setLoginStatus(response.data.message);
            } else {
                localStorage.setItem("token", response.data.token);
                setLoginAuth(true);
                setLoginStatus(response.data.result[0].username);
            };
        });
    };

    // const logout = () => {
    //     Axios.get('http://localhost:3001/logout')
    //         .then((response) => {
    //             if (response.data.loggedIn) {
    //                 setLoginAuth(false);
    //                 localStorage.removeItem("token");
    //                 setLoginStatus(`Saiu`);
    //             } else {
    //                 console.log(response.data)
    //             }
    //         });
    // };

    const userAuthenticated = () => {
        Axios.get('http://localhost:3001/isUserAuth', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            console.log(response)
            if (response.data.loggedIn) {
                setLoginStatus(response.data.user[0].username);
            } else {
                setLoginStatus("Nenhum Usuário Conectado")
            }

        });
    }, [])

    return (
        <div className="login">
            
            <h1 className="display-3 m-4">Entrar</h1>

            <form className="d-flex flex-column w-50">
                <div className="mb-3">
                    <label className="form-label fs-5">Username:</label>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Username..."
                            required
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fs-5">Senha:</label>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Senha..."
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-around">
                    <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={login}
                    >
                        Entrar
                    </button>

                    {/* <button
                                type="button"
                                className="btn btn-primary"
                                onClick={logout}
                            >
                                Logout
                            </button> */}
                </div>
            </form>

            {loginAuth && (
                <button onClick={userAuthenticated}>
                    Check if authenticated
                </button>
            )}

            {/* <h1>{loginStatus}</h1> */}
        </div>
	);
}

export default SignIn;