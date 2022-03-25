/////////////////////////////////////////////
// Author: Sajib Hosen //////////////////////
// Date: 25.03.2022 /////////////////////////
// Email: sajib.201h@gmail.com //////////////
/////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import firebaseInit from './firebaseConfig/firebase.init';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, getIdToken, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

firebaseInit();
const useFirebase = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const [currentUser, setCurrentUser] = useState({});
    const [idToken, setIdToken] = useState('');
    const [isLoading, setIsLoading]= useState(false);
    const [isVerifyEmailSend, setIsVerifyEmailSend ] = useState(false)
    
    // sign in with google - POPUP ==========================
    const googleSignIn =()=>{
        signInWithPopup(auth, googleProvider)
        .then((result)=>{
            const cUser = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                emailVerified: result.user.emailVerified,
            }
            setCurrentUser( cUser )
            navigate('/home')
        })
        .catch((error)=>{
            alert(error.message)
        })
    }

    // sign in with facebook - POPUP =========================
    const facebookSignIn = ()=>{
        signInWithPopup( auth, facebookProvider)
        .then((result)=>{
            const cUser = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                emailVerified: result.user.emailVerified,
            }
            navigate('/home')
            setCurrentUser( cUser )
        })
        .catch((error)=>{
            alert(error.message)
        })
    }


    // registration new user with email and password =======
    const registerUser = (name, email, password) =>{
        createUserWithEmailAndPassword( auth, email, password)
        .then((result) =>{
            const user = result.user;
            // console.log(user)
            verifyEmail() // send a Email for email verification
            navigate('/')
        })
        .catch((error)=>{
            alert(error.message)
        })
    }

    const verifyEmail = ()=>{  // verifing email -> used in registerUser function
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert('Email send for verification')
            setIsVerifyEmailSend(true)
            navigate('/home')
        })
        .catch((error)=>{
            alert(error.message);
        })
    }


    //login with email and password ========================
    const loginWithPassword= ( email, password)=>{
        signInWithEmailAndPassword( auth, email, password)
        .then((result)=>{
            alert('login Success')
            navigate('/home')
        })
        .catch((error)=>{
            // console.log( error.message )
            alert( error.message )
        })
    }


    // logOut user ========================================
    const logOutUser = ()=>{
        signOut(auth)
        .then(()=>{
            alert('User log out success')
            setCurrentUser({});
            navigate('/')

        })
        .catch((error)=>{
            alert(error.message)
        })
    }


    // Reset user password ===============================
    const resetPassword = (email)=>{
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('Email send, Reset password via email');
        })
        .catch((error)=>{
            alert(error.message);
        })
    }


    //current user observer =========================
    useEffect(()=>{  
        const unsubscribed = onAuthStateChanged(auth ,(user) =>{
                if(user?.emailVerified){
                    getIdToken(user)
                    .then((token) =>{
                        setIdToken(token)
                    })
                    const cUser = {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        emailVerified: user.emailVerified,
                    }
                    setCurrentUser( cUser )
                    // console.log( cUser )
                }
                else if(user?.emailVerified === false){
                    alert('User not verified')
                    setCurrentUser({});
                }
                else{
                    console.log('No user avalable')
                }
        
                setIsLoading(false)
            })
        return () => unsubscribed;
    },[auth])



    // console.log( currentUser )

    
    return {
        googleSignIn,
        facebookSignIn,
        registerUser,
        loginWithPassword,
        logOutUser,
        resetPassword,
        currentUser,
    };
};

export default useFirebase;