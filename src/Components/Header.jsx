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

      <nav id="main-nav" className={`nav-links ${isMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
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

      <button
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="main-nav"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu} aria-hidden={!isMenuOpen} />

    </header>
  );
}