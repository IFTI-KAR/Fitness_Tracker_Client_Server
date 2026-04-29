import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider';


const dayOptions = [
  { value: 'Sun', label: 'Sunday' },
  { value: 'Mon', label: 'Monday' },
  { value: 'Tue', label: 'Tuesday' },
  { value: 'Wed', label: 'Wednesday' },
  { value: 'Thu', label: 'Thursday' },
  { value: 'Fri', label: 'Friday' },
  { value: 'Sat', label: 'Saturday' },
];

const AddSlot = () => {
  const { user } = useContext(AuthContext);
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [classOptions, setClassOptions] = useState([]);
  const [slotData, setSlotData] = useState({
    slotName: '',
    slotTime: '',
    selectedDays: [],
    selectedClass: null,
    otherInfo: '',
  });

  useEffect(() => {
    if (user?.email) {
      // Fetch trainer info
      fetch(`https://fitness-tracker-server-theta.vercel.app/trainers?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setTrainerInfo(data[0]);
          else setTrainerInfo(data);
        });

      // Fetch class list
      fetch(`https://fitness-tracker-server-theta.vercel.app/classes`)
        .then(res => res.json())
        .then(data => {
          const classOpts = data?.classes?.map(cls => ({
            value: cls.name,
            label: cls.name
          })) || [];
          setClassOptions(classOpts);
        });
    }
  }, [user]);

  const handleDayChange = selected => {
    setSlotData(prev => ({ ...prev, selectedDays: selected || [] }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setSlotData(prev => ({ ...prev, [name]: value }));
  };

  const handleClassChange = selected => {
    setSlotData(prev => ({ ...prev, selectedClass: selected }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const slot = {
      trainerEmail: user.email,
      trainerName: trainerInfo?.fullName || '',
      trainerId: trainerInfo?._id,
      slotName: slotData.slotName,
      slotTime: slotData.slotTime,
      selectedDays: slotData.selectedDays.map(day => day.value),
      className: slotData.selectedClass?.value || '',
      otherInfo: slotData.otherInfo,
      createdAt: new Date()
    };

    const res = await fetch('https://fitness-tracker-server-theta.vercel.app/trainer-slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slot)
    });

    if (res.ok) {
      Swal.fire('Success!', 'Slot added successfully.', 'success');
      setSlotData({
        slotName: '',
        slotTime: '',
        selectedDays: [],
        selectedClass: null,
        otherInfo: ''
      });
    } else {
      Swal.fire('Error', 'Failed to add slot.', 'error');
    }
  };

  return (
    <div>

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Add New Slot</h2>

        {trainerInfo ? (
          <div className="mb-6 bg-gray-100 p-4 rounded">
            <p><strong>Name:</strong> {trainerInfo.fullName}</p>
            <p><strong>Email:</strong> {trainerInfo.email}</p>
            <p><strong>Skills:</strong> {trainerInfo.skills?.join(', ')}</p>
            <p><strong>Available Days:</strong> {trainerInfo.availableDays?.join(', ')}</p>
          </div>
        ) : (
          <p>Loading trainer info...</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="slotName"
            value={slotData.slotName}
            onChange={handleChange}
            placeholder="Slot name (e.g. Morning Slot)"
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="slotTime"
            value={slotData.slotTime}
            onChange={handleChange}
            placeholder="Slot time (e.g. 9AM - 10AM)"
            required
            className="w-full border p-2 rounded"
          />

          <div>
            <label className="block font-semibold mb-1">Select Days:</label>
            <Select
              options={dayOptions}
              isMulti
              value={slotData.selectedDays}
              onChange={handleDayChange}
              className="text-black"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Select Class:</label>
            <Select
              options={classOptions}
              value={slotData.selectedClass}
              onChange={handleClassChange}
              placeholder="Choose a class"
              className="text-black"
            />
          </div>

          <textarea
            name="otherInfo"
            value={slotData.otherInfo}
            onChange={handleChange}
            placeholder="Other info (optional)"
            rows={4}
            className="w-full border p-2 rounded"
          />

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add Slot
          </button>
        </form>
      </div>
  
    </div>
  );
};

export default AddSlot;
