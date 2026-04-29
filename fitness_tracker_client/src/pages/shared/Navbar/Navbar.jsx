import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider';
import logo from '../../../assets/MyFitnessPal_Logo.png';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const baseLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200 transition'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/trainers"
        className={({ isActive }) =>
          isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200 transition'
        }
      >
        All Trainers
      </NavLink>
      <NavLink
        to="/classes"
        className={({ isActive }) =>
          isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200 transition'
        }
      >
        All Classes
      </NavLink>
      <NavLink
        to="/forum-page"
        className={({ isActive }) =>
          isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200 transition'
        }
      >
        Community
      </NavLink>
    </>
  );

  return (
    <header className="bg-black/40 backdrop-blur-md text-white border-b border-zinc-800 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Site Name */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="FitnessPal Logo" className="h-10 w-auto rounded" />
          <span className="text-2xl font-bold">FitnessPal</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {baseLinks}

          {/* Conditional Dashboard Link */}
          {user && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200 transition'
                }
              >
                Dashboard
              </NavLink>

              {/* Profile Info */}
              <div className="flex items-center gap-2 px-3 py-1 border border-yellow-400 rounded">
                <img
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                  title={user.displayName || 'User'}
                />
                <span className="hidden sm:inline">{user.displayName || 'User'}</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition font-semibold"
              >
                Logout
              </button>
            </>
          )}

          {/* Auth Buttons for guests */}
          {!user && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-lime-400 text-zinc-950 rounded hover:bg-lime-500 transition font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 ml-2 border border-lime-400 text-lime-400 rounded hover:bg-lime-400 hover:text-zinc-950 transition font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2 text-sm font-medium flex flex-col bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-800">
          {baseLinks}

          {user && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200 transition'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>

              <div className="flex items-center gap-2 px-3 py-1 border border-yellow-400 rounded mt-2">
                <img
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                  title={user.displayName || 'User'}
                />
                <span>{user.displayName || 'User'}</span>
              </div>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 mt-2 bg-red-600 hover:bg-red-700 rounded transition font-semibold"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 border border-yellow-400 rounded hover:bg-yellow-300 hover:text-black transition font-semibold mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
