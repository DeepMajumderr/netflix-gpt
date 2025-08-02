import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { FaUserTie } from "react-icons/fa";
import { auth } from '../utils/firebase';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removerUser } from '../utils/userSlice';
import { logo, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/confligSlice';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const showGptSearch = useSelector(store => store.gpt.showGptSearch)

    const handleSignout = () => {
        signOut(auth)
            .then(() => { })
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

    const handleGptSearchClick = () => {
        // Toggle gpt search button
        dispatch(toggleGptSearchView())
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div className='absolute top-0 left-0 w-full px-8 py-1 bg-gradient-to-b from-black z-50 flex justify-between items-center'>
            <img className='w-44' src={logo} alt='Netflix Logo' />

            {user && (
                <div className='flex items-center gap-4'>
                    {   
                        showGptSearch &&
                        <select
                        onChange={handleLanguageChange}
                        className="bg-black text-white border border-gray-500 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500">
                        {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier} className="bg-black text-white">{lang.name}</option>)}
                    </select>}
                    <button
                        onClick={handleGptSearchClick}
                        className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-medium px-4 py-1 rounded transition-colors duration-200"
                    >
                        {showGptSearch ? "Home" : "GPT search"}
                    </button>
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
            )
            }
        </div >
    );
};

export default Header;
