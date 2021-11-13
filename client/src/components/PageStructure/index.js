import React from 'react';
import Header from '../Header';
import './style.css';

const Structure = (props) => {
    return(
        <main>
            <Header />
            {props.children}
        </main>
    );
}

export default Structure;