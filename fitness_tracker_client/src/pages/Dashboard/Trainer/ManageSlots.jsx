import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider';
import Swal from 'sweetalert2';

const ManageSlots = () => {
  const { user } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://fitness-tracker-server-theta.vercel.app/trainer-slots/${user.email}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch slots');
        return res.json();
      })
      .then(data => setSlots(data))
      .catch(err => console.error(err));
  }, [user]);

  const handleDelete = (slotId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this slot?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://fitness-tracker-server-theta.vercel.app/trainer-slots/${slotId}`, {
          method: 'DELETE',
        })
          .then(res => {
            if (!res.ok) throw new Error('Failed to delete slot');
            return res.json();
          })
          .then(() => {
            setSlots(prev => prev.filter(slot => slot._id !== slotId));
            Swal.fire('Deleted!', 'Slot has been removed.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Your Slots</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Day</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Package</th>
            <th className="border border-gray-300 p-2">Booking</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4">No slots found</td>
            </tr>
          )}
          {slots.map(slot => (
            <tr key={slot._id}>
              <td className="border border-gray-300 p-2">{slot.day}</td>
              <td className="border border-gray-300 p-2">{slot.time}</td>
              <td className="border border-gray-300 p-2">{slot.package || 'Basic'}</td>
              <td className="border border-gray-300 p-2">
                {slot.isBooked ? slot.bookedBy : 'Available'}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDelete(slot._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSlots;
