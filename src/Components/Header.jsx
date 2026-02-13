// src/components/Header.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      {/* <div className="logo"> */}

        <Link to="/"className='text-logo' onClick={closeMenu}>
          Inga Kubalo
        </Link>
      {/* </div> */}

      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div> <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}>
          Home
        </NavLink></div>
        <div><NavLink to="/about" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}>
          About
        </NavLink></div>
        <div><NavLink to="/projects" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}>
          Projects
        </NavLink></div>
        <div><NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}>
          Contact
        </NavLink></div>
      </div>

    </header>
  );
}