import React from 'react';
import Header from '../Header';

const Structure = (props) => {
    return(
        <>
        <Header />
        {props.children}
        </>
    );
}

export default Structure;