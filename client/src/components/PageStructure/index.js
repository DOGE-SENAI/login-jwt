import React from 'react';
import Header from '../Header';

const Structure = (props) => {
    return(
        <main>
            <Header />
            {props.children}
        </main>
    );
}

export default Structure;