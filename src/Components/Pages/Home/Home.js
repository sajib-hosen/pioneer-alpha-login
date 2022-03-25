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
            <button className='border-2 px-4 hover:bg-violet-700 transition-all duration-300 ease-linear hover:text-white ' onClick={ handleLogout } >Log out</button>
        </div>
    );
};

export default Home;