import React from 'react';
import { Link } from '@reach/router';


const Header = () => {
    return (
        <header>
            <Link to='/'><h1>Northcoder News</h1></Link>
        </header>
    );
};

export default Header;
