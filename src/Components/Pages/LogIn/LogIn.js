import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import useFirebase from './../../Hooks/useFirebase';
// import man from './../../../Components/images/man'

const LogIn = () => {
    const { googleSignIn, facebookSignIn, loginWithPassword, resetPassword } = useFirebase();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLogin = () =>{
        loginWithPassword(emailRef.current.value, passwordRef.current.value ) // login user
        emailRef.current.value = '';
        passwordRef.current.value='';
    }

    const resPassword = () =>{
        resetPassword(emailRef.current.value)
    }

    return (
        <div className='flex w-full' >
            <div className='w-8/12 h-screen relative bg-gradient-to-tl from-stone-900 via-stone-600 to-indigo-400'>



                <div className='border-2 bg-white drop-shadow-lg w-80 absolute inset-y-0 -right-60 top-10 bottom-10 rounded-lg'>
                    <div className='my-5' >

                        {/* logo ----------------------------------------------------------------- */}
                        <div className='flex justify-center items-center' >
                            <div className='w-14' >
                                <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/rbtiugriycta0ebjrxme" alt="logo" />
                            </div>
                        </div>

                        {/* form and button ------------------------------------------------------ */}
                        <div>
                            <p>Explore new courses... Hurry up!!</p>
                            <input ref={emailRef} required className='border-2 p-2 rounded-lg w-60 mt-5' type="text" name="email" placeholder='Email Address' />
                            <input ref={passwordRef} required className='border-2 p-2 rounded-lg w-60 mt-4' type="password" name="password" placeholder='Password' />

                            <div className='w-60 text-right mx-auto mt-2'>
                                <span onClick={resPassword} className='text-red-500'>Forget Password?</span>
                            </div>
                            <button onClick={handleLogin} className='w-60 border-2 p-1 mt-2 rounded-lg bg-indigo-800 text-white ' >LOG IN</button>
                        </div>


                        {/* or design ----------------------------------------------------------- */}
                        <div className='flex justify-around w-60 mx-auto mt-3' >
                            <div className='w-full'>
                                <div className='border-b-2 border-black h-3/5' ></div>
                            </div>
                            <p className='flex justify-center items-center mx-2'>or</p>
                            <div className='w-full'>
                                <div className='border-b-2 border-black h-3/5' ></div>
                            </div>
                        </div>


                        {/* login with facebook and google -----------------------------------  */}
                        <div className='flex justify-around w-60 mx-auto mt-3'>
                            {/* facebook login  */}
                            <div onClick={facebookSignIn} className='w-10 rounded-full overflow-hidden '>
                                <img src="https://e7.pngegg.com/pngimages/203/864/png-clipart-computer-icons-graphics-facebook-social-media-facebook-blue-text-thumbnail.png" alt="facebook login" />
                            </div>
                            {/* google login  */}
                            <div onClick={ googleSignIn } className='w-10 rounded-full overflow-hidden '>
                                <img src="https://www.clipartmax.com/png/full/219-2197783_training-documents-google-logo-icon-png.png" alt="google login" />
                            </div>
                        </div>

                        {/* Sign Up Text ------------------------------------------------------ */}
                        <div className=' mt-8' >
                            <p>Don't have an account? <Link to='/reg' ><span className='text-teal-400'>Sign Up</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-2 w-4/12 h-screen '>
                <h1></h1>
            </div>

        </div>
    );
};

export default LogIn;