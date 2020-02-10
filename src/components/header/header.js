import React from 'react';
import {Link} from 'react-router-dom';
import './header.css'

export const Header = () => {
    return (
        <header className="header">
            <nav className="navigation">
                <ul className="nav-bar">
                    <li className="nav-item"><Link to='/'>Homepage</Link></li>
                    <li className="nav-item"><Link to='/words'>Words</Link></li>
                    <li><Link to='/dictionary'>Dictionary</Link></li>
                </ul>
            </nav>
        </header>
    )
};