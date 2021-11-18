import React, { useState } from 'react';
import Axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginAuth, setLoginAuth] = useState(false);

    Axios.defaults.withCredentials = true;

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (!response.data.auth) {
                setLoginAuth(false);
            } else {
                localStorage.setItem("token", response.data.token);
                setLoginAuth(true);
                navigate('/home');
            };
        });
    };

    const userAuthenticated = () => {
        Axios.get('http://localhost:3001/isUserAuth', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
        })
    }

    return (
        <div className="login">
            
            <h1 className="display-3 m-4">Entrar</h1>

            <form className="d-flex flex-column w-75">
                <div className="mb-3">
                    <label className="form-label fs-5">Username:</label>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg my-style"
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
                        className="btn btn-primary btn-lg w-75"
                        onClick={login}
                    >
                        Entrar
                    </button>
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