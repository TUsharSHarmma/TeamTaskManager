import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  FaTasks,
  FaUserCircle,
  FaSignOutAlt,
  FaChartLine,
  FaUsers,
  FaBell,
  FaCog,
  FaChevronDown,
  FaUser,
  FaMoon,
  FaSun
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutAnimation, setShowLogoutAnimation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setShowLogoutAnimation(true);
    
    // Create logout animation effect
    createLogoutEffect();
    
    // Wait for animation
    setTimeout(async () => {
      await logout();
      setShowLogoutAnimation(false);
      setIsLoggingOut(false);
      navigate("/");
    }, 2000);
  };

  // Custom logout animation effect
  const createLogoutEffect = () => {
    const colors = ['#ef4444', '#f59e0b', '#ec4899', '#8b5cf6'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      
      particle.style.position = 'absolute';
      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0.8';
      particle.style.pointerEvents = 'none';
      
      container.appendChild(particle);
      
      const endX = startX + (Math.random() - 0.5) * 200;
      const endY = startY + (Math.random() - 0.5) * 200;
      const duration = 1500 + Math.random() * 500;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentX = startX + (endX - startX) * easeOutCubic;
        const currentY = startY + (endY - startY) * easeOutCubic;
        
        particle.style.left = currentX + 'px';
        particle.style.top = currentY + 'px';
        particle.style.opacity = 1 - progress;
        particle.style.transform = `scale(${1 - progress})`;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };
      
      requestAnimationFrame(animate);
    }
    
    setTimeout(() => {
      container.remove();
    }, 2000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Logout Animation Overlay
  const LogoutOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="text-center transform animate-scale-down">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
            <FaSignOutAlt className="text-white text-6xl animate-pulse-slow" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-red-500 animate-ping opacity-20"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4 animate-slide-up">
          Goodbye! 👋
        </h2>
        <p className="text-xl text-gray-300 mb-6 animate-slide-up animation-delay-200">
          You have been successfully logged out
        </p>
        <div className="flex items-center justify-center gap-2 text-gray-400 animate-slide-up animation-delay-400">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>Redirecting to home page</span>
          <span className="inline-flex gap-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce animation-delay-200">.</span>
            <span className="animate-bounce animation-delay-400">.</span>
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto bg-white/10 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showLogoutAnimation && <LogoutOverlay />}
      
      <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="px-8 py-4">
          <div className="flex justify-between items-center">
            

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                <FaChartLine className="text-blue-400" />
                <span>Dashboard</span>
              </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                <FaUsers className="text-cyan-400" />
                <span>Teams</span>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button className="relative text-gray-400 hover:text-white transition">
                <FaBell className="text-xl" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="text-gray-400 hover:text-white transition p-2 rounded-lg bg-white/5 hover:bg-white/10"
              >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 hover:bg-white/10 rounded-xl px-3 py-2 transition group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <FaUserCircle className="text-white text-xl" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <h2 className="font-semibold text-white text-sm">
                      {user?.name || "User"}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {user?.role || "Member"}
                    </p>
                  </div>
                  <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-slide-down">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <FaUser className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{user?.name}</h3>
                          <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    
                    
                    <div className="border-t border-white/10 py-2">
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleLogout();
                        }}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition group"
                      >
                        <FaSignOutAlt className="group-hover:scale-110 transition" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        @keyframes scale-down {
          from {
            transform: scale(1.2);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-down {
          animation: scale-down 0.5s ease-out;
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
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s linear forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;