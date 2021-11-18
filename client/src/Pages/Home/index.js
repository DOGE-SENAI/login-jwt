import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageStructure from '../../components/PageStructure';
import './style.css';

const Home = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            if (!response.data.auth) {
                setIsAuth(false);
                navigate('/')
            } else {
                setIsAuth(true);
            }
        })
    })

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <PageStructure>
            <main className="container-main-home">
                <h1>Bem vindo(a) de volta</h1>

                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={logout}
                >
                    Logout
                </button>
            </main>
            
        </PageStructure>
    );
}

export default Home;