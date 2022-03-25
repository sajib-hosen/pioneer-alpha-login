import React from 'react';
import useFirebase from './../../Hooks/useFirebase';

const Home = () => {
    const { logOutUser } = useFirebase();
    const handleLogout  = ()=>{
        logOutUser();
    }
    return (
        <div>
            <p>This is home</p>
            <button onClick={ handleLogout } >Log out</button>
        </div>
    );
};

export default Home;