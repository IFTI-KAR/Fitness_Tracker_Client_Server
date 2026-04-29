import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchClasses = () => {
    const query = searchTerm ? `&search=${searchTerm}` : '';
    fetch(`https://fitness-tracker-server-theta.vercel.app/classes?page=${page}${query}`)
      .then(res => res.json())
      .then(data => {
        setClasses(data.classes);
        setTotalPages(data.totalPages);
      });
  };

  useEffect(() => {
    fetchClasses();
  }, [page, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on search
    setSearchTerm(search);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 py-12">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center uppercase tracking-tight text-white">All Classes</h2>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="mb-10 flex gap-3 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search classes by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-zinc-700 bg-zinc-900/60 backdrop-blur-sm text-zinc-100 px-5 py-3 rounded-xl w-full focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-lime-400 text-zinc-950 font-bold rounded-xl hover:bg-lime-500 transition-all duration-300 shadow-[0_0_15px_rgba(163,230,53,0.2)] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)]"
        >
          Search
        </button>
      </form>

      {/* 🧱 Classes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((cls, idx) => (
          <div key={idx} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-2 group">
            <div className="relative overflow-hidden h-56">
              <img src={cls.image} alt={cls.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90"></div>
            </div>
            <div className="p-6 relative">
              <h3 className="text-2xl font-bold text-white mb-1">{cls.name}</h3>
              <p className="text-sm text-lime-400 font-semibold uppercase tracking-wider mb-3">{cls.duration || 'Duration N/A'}</p>
              <p className="text-zinc-400 mb-6 line-clamp-3">{cls.details}</p>

              <p className="font-medium text-zinc-300 mb-3">Top Trainers:</p>
              <div className="flex -space-x-3">
                {cls.relatedTrainers?.map(trainer => (
                  <img
                    key={trainer._id}
                    src={trainer.profileImage || 'https://via.placeholder.com/40'}
                    alt={trainer.fullName}
                    onClick={() => navigate(`/trainers/${trainer._id}`)}
                    title={trainer.fullName}
                    className="w-12 h-12 rounded-full border-2 border-zinc-800 object-cover cursor-pointer hover:scale-110 hover:border-lime-400 transition-all duration-300 shadow-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center mt-12 space-x-3">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`w-10 h-10 flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ${
              num === page 
                ? 'bg-lime-400 text-zinc-950 shadow-[0_0_15px_rgba(163,230,53,0.3)]' 
                : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
