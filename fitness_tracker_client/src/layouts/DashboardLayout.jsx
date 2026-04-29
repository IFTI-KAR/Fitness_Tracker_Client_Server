import React from 'react';
import { Outlet, NavLink } from 'react-router';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {
  const { userRole, loading } = useRole();

  if (loading) return <p className="text-center mt-10">Loading Dashboard...</p>;

  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900/50 backdrop-blur-md border-r border-zinc-800 p-6 min-h-screen flex flex-col">
        <h2 className="text-3xl font-extrabold mb-8 text-white uppercase tracking-wider">Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          

          {userRole === 'admin' && (    //@Dmin123

            <>
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>Home</NavLink>
              <NavLink to="/dashboard/all-newsletter" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>All Subscribers</NavLink>
              <NavLink to="/dashboard/all-trainers" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>All Trainers</NavLink>
              <NavLink to="/dashboard/applied-trainer" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>Applied Trainers</NavLink>
              <NavLink to="/dashboard/balance" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>Balance</NavLink>
              <NavLink to="/dashboard/add-class" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>Add New Class</NavLink>
              <NavLink to="/dashboard/addforum" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>Add Forum</NavLink>
            </>
          )}

          {userRole === 'trainer' && (
            <>
            <NavLink to="/">Home</NavLink>
              <NavLink to="/dashboard/manage-slots">Manage Slots</NavLink>
              <NavLink to="/dashboard/add-slot">Add Slot</NavLink>
              <NavLink to="/dashboard/addforum">Add Forum</NavLink>
            </>
          )}

          {userRole === 'member' && (
            <>
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>Home</NavLink>
              <NavLink to="/dashboard/profilepage" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>Profile Page</NavLink>
              <NavLink to="/dashboard/activity-log" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>Activity Log</NavLink>
              <NavLink to="/dashboard/booked-trainer" className={({ isActive }) => isActive ? 'text-lime-400 font-bold border-l-2 border-lime-400 pl-2' : 'hover:text-lime-300 transition-colors pl-2'}>Booked Trainer</NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-zinc-950 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
