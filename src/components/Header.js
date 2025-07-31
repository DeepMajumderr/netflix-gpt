import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { FaUserTie } from "react-icons/fa";
import { auth } from '../utils/firebase';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removerUser } from '../utils/userSlice';
import { logo } from '../utils/constants';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleSignout = () => {
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                navigate("/error");
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
                navigate("/browse");
            } else {
                dispatch(removerUser());
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className='absolute top-0 left-0 w-full px-8 py-1 bg-gradient-to-b from-black z-50 flex justify-between items-center'>
            <img className='w-44' src={logo} alt='Netflix Logo' />

            {user && (
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                        <FaUserTie className='text-red-600 text-2xl' />
                        <p className='text-white font-medium'>{user.displayName}</p>
                    </div>
                    <button
                        onClick={handleSignout}
                        className='bg-red-600 text-white font-medium px-4 py-1 rounded hover:bg-red-700 transition-colors'
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
