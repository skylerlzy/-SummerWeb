import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/create-circle">Create Circle</Link>
            <Link to="/circle">Circle</Link>
        </nav>
    );
};

export default Navbar;
