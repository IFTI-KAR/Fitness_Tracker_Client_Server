import React, { useContext, useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext/AuthProvider'; // Adjust path as per your setup
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';

const dayOptions = [
  { value: 'Sun', label: 'Sunday' },
  { value: 'Mon', label: 'Monday' },
  { value: 'Tue', label: 'Tuesday' },
  { value: 'Wed', label: 'Wednesday' },
  { value: 'Thu', label: 'Thursday' },
  { value: 'Fri', label: 'Friday' },
  { value: 'Sat', label: 'Saturday' },
];

const skillOptions = ['Yoga', 'Cardio', 'Weight Training', 'CrossFit', 'Zumba', 'Pilates', 'HIIT'];

const BecomeATrainer = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    age: '',
    profileImage: '',
    skills: [],
    availableDays: [],
    availableTime: '',
    otherInfo: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter(skill => skill !== value),
    }));
  };

  const handleDaysChange = (selected) => {
    setFormData(prev => ({
      ...prev,
      availableDays: selected.map(option => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trainerData = {
      ...formData,
      status: 'pending',
      appliedAt: new Date(),
    };

    try {
      const res = await fetch('https://fitness-tracker-server-theta.vercel.app/become-a-trainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainerData),
      });

      if (res.ok) {
        Swal.fire('Success!', 'Your application has been submitted.', 'success');
        setFormData({
          fullName: '',
          email: user?.email || '',
          age: '',
          profileImage: '',
          skills: [],
          availableDays: [],
          availableTime: '',
          otherInfo: '',
        });
      } else {
        Swal.fire('Error!', 'Failed to submit application.', 'error');
      }
    } catch (err) {
      Swal.fire('Error!', 'Server error occurred.', 'error');
    }
  };

  return (
    <div>
        <Navbar></Navbar>
        <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Become a Trainer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInput}
          placeholder="Full Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInput}
          placeholder="Age"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="profileImage"
          value={formData.profileImage}
          onChange={handleInput}
          placeholder="Profile Image URL"
          className="w-full border p-2 rounded"
        />

        <div>
          <label className="block font-semibold mb-1">Select Skills:</label>
          <div className="flex flex-wrap gap-4">
            {skillOptions.map((skill) => (
              <label key={skill} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleSkillChange}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Available Days:</label>
          <Select
            options={dayOptions}
            isMulti
            onChange={handleDaysChange}
            placeholder="Select days"
            closeMenuOnSelect={false}
            className="text-black"
          />
        </div>

        <input
          type="text"
          name="availableTime"
          value={formData.availableTime}
          onChange={handleInput}
          placeholder="Available time (e.g. 10AM - 5PM)"
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="otherInfo"
          value={formData.otherInfo}
          onChange={handleInput}
          placeholder="Other information..."
          rows={4}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Apply
        </button>
      </form>
    </div>
    <Footer></Footer>

    </div>
    
  );
};

export default BecomeATrainer;
