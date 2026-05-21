import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import {
  FaUserPlus,
  FaTrash,
  FaCheckCircle,
  FaUsers,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaTimes,
  FaRocket
} from "react-icons/fa";

const Team = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member"
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/auth/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Custom confetti effect
  const createConfetti = () => {
    const colors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    for (let i = 0; i < 200; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const startX = Math.random() * window.innerWidth;
      const startY = -20;
      const rotation = Math.random() * 360;
      
      confetti.style.position = 'absolute';
      confetti.style.left = startX + 'px';
      confetti.style.top = startY + 'px';
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      confetti.style.backgroundColor = color;
      confetti.style.transform = `rotate(${rotation}deg)`;
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confetti.style.opacity = '0.8';
      confetti.style.pointerEvents = 'none';
      
      container.appendChild(confetti);
      
      const endX = startX + (Math.random() - 0.5) * 400;
      const endY = window.innerHeight + 100;
      const duration = 2000 + Math.random() * 1000;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentX = startX + (endX - startX) * easeOutCubic;
        const currentY = startY + (endY - startY) * easeOutCubic;
        const currentRotation = rotation + (progress * 720);
        
        confetti.style.left = currentX + 'px';
        confetti.style.top = currentY + 'px';
        confetti.style.transform = `rotate(${currentRotation}deg)`;
        confetti.style.opacity = 1 - progress;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          confetti.remove();
        }
      };
      
      requestAnimationFrame(animate);
    }
    
    setTimeout(() => {
      container.remove();
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await API.post("/auth/create-member", formData);
      
      // Store member name for success message
      setNewMemberName(formData.name);
      setSuccessMessage(`${formData.name} has been successfully added to the team!`);
      
      // Show success animation
      setShowSuccess(true);
      
      // Trigger confetti
      setTimeout(() => {
        createConfetti();
      }, 100);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Member"
      });
      
      // Refresh user list after animation
      setTimeout(() => {
        fetchUsers();
      }, 500);
      
      // Hide success overlay after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create member");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      try {
        await API.delete(`/auth/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.log(error);
        alert("Failed to delete user");
      }
    }
  };

  // Success Overlay Component
  const SuccessOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="text-center transform animate-scale-up">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
            <FaCheckCircle className="text-white text-6xl animate-pulse-slow" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-green-500 animate-ping opacity-20"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4 animate-slide-up">
          Member Added! 🎉
        </h2>
        <p className="text-xl text-gray-300 mb-2 animate-slide-up animation-delay-200">
          {successMessage}
        </p>
        <div className="flex items-center justify-center gap-2 text-gray-400 mt-4 animate-slide-up animation-delay-400">
          <FaUsers className="text-green-400" />
          <span>Team member has been successfully added</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showSuccess && <SuccessOverlay />}
      
      <div className="bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 min-h-screen">
        <Sidebar />
        
        <div className="ml-72">
          <Navbar />
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FaUsers className="text-cyan-400 text-3xl" />
                  <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Team Members
                  </h1>
                </div>
                <p className="text-gray-400 mt-2">
                  Add and manage your team members efficiently
                </p>
              </div>
              
              <div className="bg-blue-500/20 px-4 py-2 rounded-full">
                <span className="text-blue-400 font-semibold">
                  Total: {users.length} members
                </span>
              </div>
            </div>
            
            {/* ADD MEMBER FORM */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
                  <FaUserPlus className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Add Team Member
                  </h2>
                  <p className="text-gray-400 text-sm">Create a new member account</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <FaUserTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="relative">
                  <FaUserTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer appearance-none"
                    disabled={isLoading}
                  >
                    <option className="bg-slate-900">Member</option>
                    <option className="bg-slate-900">Admin</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="md:col-span-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Member...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaRocket />
                      Create Member
                    </span>
                  )}
                </button>
              </form>
            </div>
            
            {/* MEMBERS LIST */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Team Members List
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Manage existing team members
                  </p>
                </div>
                <div className="text-sm text-gray-400">
                  Showing {users.length} members
                </div>
              </div>
              
              <div className="space-y-4">
                {users.length === 0 ? (
                  <div className="text-center py-12">
                    <FaUsers className="text-6xl text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No team members yet</p>
                    <p className="text-gray-500 text-sm">Add your first team member using the form above</p>
                  </div>
                ) : (
                  users.map((user) => (
                    <div
                      key={user._id}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {user?.name || "Unknown User"}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {user?.email || "No Email"}
                          </p>
                          <span className={`text-xs px-3 py-1 rounded-full inline-block mt-2 ${
                            user.role === "Admin" 
                              ? "bg-purple-500/20 text-purple-400" 
                              : "bg-cyan-500/20 text-cyan-400"
                          }`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl transition-all duration-300 hover:scale-110 group-hover:shadow-lg"
                        title="Delete member"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        @keyframes scale-up {
          from { 
            transform: scale(0.8);
            opacity: 0;
          }
          to { 
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-up {
          animation: scale-up 0.5s ease-out;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default Team;