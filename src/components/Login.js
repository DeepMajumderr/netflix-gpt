import React, { useRef, useState } from 'react'
import Header from './Header'
import { formValidation } from '../utils/formValidation'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'


const Login = () => {
    const [signIn, setsignIn] = useState(true)
    const [validForm, setvalidForm] = useState(true)
    const [errorMessage, seterrorMessage] = useState('')
    // const navigate = useNavigate()
    const dispatch = useDispatch()

    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)

    const handleForm = () => {
        const emailValue = email.current.value.trim()
        const passwordValue = password.current.value.trim()

        const checkForm = formValidation(emailValue, passwordValue)
        setvalidForm(checkForm)

        if (!checkForm) return

        if (!signIn) {
            // 🔐 Signup logic
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user
                    updateProfile(user, {
                        displayName: name.current.value
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName } = auth.currentUser
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
                        // navigate('/browse')
                    }).catch((error) => {
                        // An error occurred
                        seterrorMessage(error.message)
                    });
                    console.log('Signed up user:', user)

                    // Clear input fields
                    email.current.value = ''
                    password.current.value = ''
                    if (name.current) name.current.value = ''

                })
                .catch((error) => {
                    console.error('Firebase Auth Error:', error)
                    seterrorMessage(error.code + ' - ' + error.message)
                })
        } else {
            // 🔑 Sign-in logic
            console.log('Attempting login with:', emailValue, passwordValue)

            signInWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user
                    console.log('Signed in user:', user)

                    // Clear input fields
                    email.current.value = ''
                    password.current.value = ''
                    // navigate('/browse')
                })
                .catch((error) => {
                    console.error('Firebase Auth Error:', error)
                    seterrorMessage(error.code + ' - ' + error.message)
                })
        }
    }

    return (
        <div className='relative h-screen w-full'>
            {/* Background Image */}
            <div className='absolute top-0 left-0 w-full h-full -z-10'>
                <img
                    className='w-full h-full object-cover'
                    src='https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg'
                    alt='bg'
                />
                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
            </div>

            <Header />

            {/* Form container in center */}
            <div className='flex justify-center items-center h-full'>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className='w-3/12 p-12 bg-black bg-opacity-80 rounded-md text-white'
                >
                    <h2 className='text-3xl font-bold mb-6'>
                        {signIn ? 'Sign In' : 'Sign up'}
                    </h2>

                    {!signIn && (
                        <input
                            ref={name}
                            type='text'
                            placeholder='Name'
                            className='w-full p-3 my-2 bg-gray-800 rounded'
                        />
                    )}

                    <input
                        ref={email}
                        type='text'
                        placeholder='Email Address'
                        className='w-full p-3 my-2 bg-gray-800 rounded'
                    />
                    <input
                        ref={password}
                        type='password'
                        placeholder='Password'
                        className='w-full p-3 my-2 bg-gray-800 rounded'
                    />

                    {!validForm && (
                        <p className='text-red-500 text-sm mt-2'>
                            Invalid email or password. Please try again.
                        </p>
                    )}

                    <button
                        onClick={handleForm}
                        type='submit'
                        className='w-full p-3 mt-4 bg-red-600 hover:bg-red-700 rounded font-semibold'
                    >
                        {signIn ? 'Sign In' : 'Sign up'}
                    </button>

                    {errorMessage && (
                        <p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
                    )}

                    <p className='text-sm mt-4 text-gray-400'>
                        {signIn ? 'New to Netflix? ' : 'Already have an account? '}
                        <span
                            className='text-white hover:underline cursor-pointer'
                            onClick={() => {
                                setsignIn(!signIn)
                                setvalidForm(true)
                                seterrorMessage('')
                            }}
                        >
                            {signIn ? 'Sign up now' : 'Sign In'}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
