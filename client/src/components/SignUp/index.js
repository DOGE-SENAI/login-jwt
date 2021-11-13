import React, { useState } from 'react';
import Axios from 'axios';
import './style.css';

const SignUp = () => {
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="registration">
            <h1 className="display-3 m-4">Criar Conta</h1>

            <form className="d-flex flex-column w-50">
                <div className="mb-3">
                    <label className="form-label fs-5">Username:</label>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="ex: Adam@123"
                            required
                            onChange={(e) => {
                                setUsernameReg(e.target.value);
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
                            placeholder="Senha"
                            onChange={(e) => {
                                setPasswordReg(e.target.value);
                            }}
                            required
                        />
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                    <button
                        type="button"
                        className="btn btn-outline-success btn-lg"
                        onClick={register}
                    >
                        Criar Conta
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;