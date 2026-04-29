import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, setUser } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          icon: 'success',
          title: 'Logged in with Google!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-In Failed',
          text: error.message,
        });
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r  flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-[#16a34a] mb-6 tracking-tight">
          Welcome Back, Champ 💪
        </h1>

        <form onSubmit={handleLogIn} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@fitlife.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#16a34a] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#16a34a] focus:outline-none"
            />
            <div className="text-right mt-1">
              <a href="#" className="text-xs text-[#16a34a] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#16a34a] text-white py-2 rounded-xl hover:bg-[#15803d] transition-colors duration-300 shadow-md"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full border border-[#16a34a] text-[#16a34a] py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-[#f0fdf4] transition-colors duration-300"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-[#16a34a] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
