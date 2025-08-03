import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'; // Import useState
import { FaUserTie, FaBars, FaTimes } from "react-icons/fa"; // Import FaBars and FaTimes
import { auth } from '../utils/firebase';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removerUser } from '../utils/userSlice';
import { logo, SUPPORTED_LANGUAGES } from '../utils/constants';
import { clearGptMoviesResult, toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/confligSlice';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // New state for mobile menu

    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                dispatch(clearGptMoviesResult())
                setIsMobileMenuOpen(false); // Close menu on sign out
            })
            .catch((error) => {
                // An error happened.
                navigate("/error");
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
                if (window.location.pathname === '/') {
                    navigate("/browse");
                }
            } else {
                dispatch(removerUser());
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [dispatch, navigate]);

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
        setIsMobileMenuOpen(false); // Close menu on GPT search click
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
        setIsMobileMenuOpen(false); // Close menu on language change
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className='absolute w-full px-4 py-2 bg-gradient-to-b from-black z-50 flex justify-between items-center'>
            {/* Netflix Logo */}
            <img
                className='w-28 md:w-44' // Adjusted size: smaller on mobile, larger on desktop
                src={logo}
                alt='Netflix Logo'
            />

            {user && (
                <>
                    {/* Desktop Menu - visible on medium screens and up */}
                    <div className='hidden md:flex items-center gap-4'>
                        {showGptSearch && (
                            <select
                                onChange={handleLanguageChange}
                                className="bg-black text-white border border-gray-500 rounded px-3 py-1 text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                {SUPPORTED_LANGUAGES.map(lang => (
                                    <option key={lang.identifier} value={lang.identifier} className="bg-black text-white">
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        )}
                        <button
                            onClick={handleGptSearchClick}
                            className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-medium px-4 py-1 rounded transition-colors duration-200 whitespace-nowrap"
                        >
                            {showGptSearch ? "Home" : "GPT Search"}
                        </button>
                        <div className='flex items-center gap-2'>
                            <FaUserTie className='text-red-600 text-2xl' />
                            <p className='text-white font-medium'>{user.displayName}</p>
                        </div>
                        <button
                            onClick={handleSignout}
                            className='bg-red-600 text-white font-medium px-4 py-1 rounded hover:bg-red-700 transition-colors whitespace-nowrap'
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Mobile Hamburger/Close Icon - visible on small screens only */}
                    <div className='md:hidden'>
                        <button onClick={toggleMobileMenu} className='text-white text-3xl p-2'>
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                    {/* Mobile Menu Overlay - conditionally rendered */}
                    {isMobileMenuOpen && (
                        <div className='absolute top-full right-0 w-full bg-black bg-opacity-90 flex flex-col items-center py-4 rounded-b-lg shadow-lg md:hidden'>
                            {showGptSearch && (
                                <select
                                    onChange={handleLanguageChange}
                                    className="bg-gray-800 text-white border border-gray-500 rounded px-4 py-2 mb-3 w-11/12 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    {SUPPORTED_LANGUAGES.map(lang => (
                                        <option key={lang.identifier} value={lang.identifier} className="bg-gray-800 text-white">
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <button
                                onClick={handleGptSearchClick}
                                className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-medium px-6 py-2 rounded transition-colors duration-200 w-11/12 mb-3"
                            >
                                {showGptSearch ? "Home" : "GPT Search"}
                            </button>
                            <div className='flex items-center gap-2 mb-3'>
                                <FaUserTie className='text-red-600 text-2xl' />
                                <p className='text-white font-medium'>{user.displayName}</p>
                            </div>
                            <button
                                onClick={handleSignout}
                                className='bg-red-600 text-white font-medium px-6 py-2 rounded hover:bg-red-700 transition-colors w-11/12'
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Header;