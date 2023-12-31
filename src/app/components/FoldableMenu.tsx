import React, { useState } from 'react';
import Link from 'next/link';

const FoldableMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside className={`fixed top-0 left-0 w-64 h-full overflow-auto ease-in-out transition-transform duration-300 z-30 ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white`}>
            <div className="flex items-center justify-between px-4 border-b border-gray-200">
                <span className="text-3xl font-bold text-gray-800">Lawyers' House</span>
                <button onClick={toggleMenu} className="text-4xl text-gray-800 hover:text-blue-500 focus:outline-none">&#9776;</button>
            </div>
            <nav className={`mt-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
                <Link href="/home" legacyBehavior>
                    <a className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">Home Page</a>
                </Link>
                <Link href="/home" legacyBehavior>
                    <a className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">My Cases</a>
                </Link>
                <Link href="/home" legacyBehavior>
                    <a className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">All Cases</a>
                </Link>
                <Link href="/home" legacyBehavior>
                    <a className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">Lawyers Page</a>
                </Link>
                <Link href="/home" legacyBehavior>
                    <a className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">Secretary Page,</a>
                </Link>
                <Link href="/home" legacyBehavior>
                    <a className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">Client Page</a>
                </Link>
                <Link href="/home" legacyBehavior>
                    <a className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">Document Creation Page</a>
                </Link>
                
            </nav>
        </aside>
    );
};



export default FoldableMenu;

/* <nav className="mt-4">


</nav> */