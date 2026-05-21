import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaArrowRight,
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaRocket
} from "react-icons/fa";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Member"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        else if (value.length > 50) error = "Name must be less than 50 characters";
        break;
      
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Please enter a valid email address";
        break;
      
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        else if (!/[A-Z]/.test(value)) error = "Password must contain at least one uppercase letter";
        else if (!/[0-9]/.test(value)) error = "Password must contain at least one number";
        break;
      
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== formData.password) error = "Passwords do not match";
        break;
      
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  // Custom confetti effect without external dependencies
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

    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 4;
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
    
    const allTouched = {
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    };
    setTouched(allTouched);
    
    const newErrors = {};
    Object.keys(allTouched).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      
      // Store user name for success message
      setUserName(formData.name);
      
      // Show success animation
      setShowSuccess(true);
      
      // Trigger confetti effect
      setTimeout(() => {
        createConfetti();
      }, 100);
      
      // Wait for animation to complete before redirecting
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      setErrors({
        ...errors,
        submit: errorMessage
      });
      setTimeout(() => {
        setErrors({ ...errors, submit: "" });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 5);
  };

  const passwordStrength = getPasswordStrength();
  const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-green-600"
  ];

  // Success Overlay Component
  const SuccessOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="text-center transform animate-scale-up">
        {/* Success Checkmark */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
            <FaCheckCircle className="text-white text-6xl animate-pulse-slow" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-green-500 animate-ping opacity-20"></div>
        </div>
        
        {/* Success Message */}
        <h2 className="text-4xl font-bold text-white mb-4 animate-slide-up">
          Welcome, {userName}! 🎉
        </h2>
        <p className="text-xl text-gray-300 mb-6 animate-slide-up animation-delay-200">
          Your account has been created successfully!
        </p>
        <div className="flex items-center justify-center gap-2 text-gray-400 animate-slide-up animation-delay-400">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Redirecting to dashboard</span>
          <span className="inline-flex gap-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce animation-delay-200">.</span>
            <span className="animate-bounce animation-delay-400">.</span>
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto bg-white/10 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showSuccess && <SuccessOverlay />}
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
        
        {/* Simple Decorative Dots instead of SVG pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-1/4 right-10 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Back to Home Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition group"
          >
            <FaArrowRight className="transform rotate-180 group-hover:-translate-x-1 transition" />
            <span>Back to Home</span>
          </Link>

          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-8 border-b border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl animate-pulse-slow">
                  <FaRocket className="text-white text-2xl" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Create Account
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center animate-shake">
                  {errors.submit}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className={`w-full bg-white/10 border ${
                      errors.name && touched.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    } rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.name}
                    disabled={isLoading || showSuccess}
                  />
                </div>
                {errors.name && touched.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className={`w-full bg-white/10 border ${
                      errors.email && touched.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    } rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.email}
                    disabled={isLoading || showSuccess}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    className={`w-full bg-white/10 border ${
                      errors.password && touched.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    } rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.password}
                    disabled={isLoading || showSuccess}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && !showSuccess && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            i < passwordStrength
                              ? strengthColors[passwordStrength - 1]
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      Strength: <span className="text-white">{strengthText[passwordStrength]}</span>
                    </p>
                    <ul className="text-xs text-gray-400 space-y-1 mt-2">
                      <li className={formData.password.length >= 6 ? "text-green-400" : ""}>
                        ✓ At least 6 characters
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? "text-green-400" : ""}>
                        ✓ At least one uppercase letter
                      </li>
                      <li className={/[0-9]/.test(formData.password) ? "text-green-400" : ""}>
                        ✓ At least one number
                      </li>
                    </ul>
                  </div>
                )}
                
                {errors.password && touched.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={`w-full bg-white/10 border ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    } rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.confirmPassword}
                    disabled={isLoading || showSuccess}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && !showSuccess && (
                  <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                    <FaCheckCircle className="text-xs" /> Passwords match
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Role
                </label>
                <div className="relative">
                  <FaUserTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="role"
                    className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer appearance-none"
                    onChange={handleChange}
                    value={formData.role}
                    disabled={isLoading || showSuccess}
                  >
                    <option value="Member" className="bg-gray-900">👥 Member</option>
                    <option value="Admin" className="bg-gray-900">👑 Admin</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Admins have full access to manage teams and projects
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || showSuccess}
                className="relative w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FaArrowRight className="group-hover:translate-x-1 transition" />
                    </>
                  )}
                </span>
              </button>

              

              {/* Login Link */}
              <p className="text-center text-gray-400 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>

          {/* Trust Badge */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-xs">
              By signing up, you agree to our{" "}
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
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
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 2.5s linear forwards;
        }
      `}</style>
    </>
  );
};

export default Register;