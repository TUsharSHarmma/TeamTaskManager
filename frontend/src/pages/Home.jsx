import { Link } from "react-router-dom";
import {
  FaTasks,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaRocket,
  FaClock,
  FaMobileAlt,
  FaUpload,
  FaComments,
  FaCalendarAlt,
  FaBell,
  FaFileAlt,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCheckCircle,
  FaAward,
  FaGlobe
} from "react-icons/fa";

const Home = () => {
  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "10K+", label: "Teams Using" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white overflow-hidden">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-black/20">
        <div className="flex items-center gap-2">
          <FaRocket className="text-blue-500 text-3xl" />
          <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-lg shadow-blue-500/30"
          >
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative px-10 lg:px-24 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* LEFT CONTENT */}
        <div className="max-w-3xl z-10">
          
          <h1 className="text-6xl lg:text-7xl font-black leading-tight">
            Team Task Manager
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"> Faster</span>
            <br />
            Collaborate
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Smarter
            </span>
          </h1>

          <p className="text-gray-300 text-xl mt-8 leading-relaxed">
            Manage teams, assign tasks, track project
            progress, monitor analytics, and boost
            productivity with a modern collaborative
            workspace built for high-performing teams.
          </p>

          <div className="flex gap-5 mt-10 flex-wrap">
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-2xl shadow-blue-500/30 hover:scale-105"
            >
              Start Free Trial
            </Link>

            <Link
              to="/demo"
              className="border border-white/20 hover:bg-white hover:text-black px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300"
            >
              Watch Demo
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex items-center gap-6 flex-wrap">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-gray-900"></div>
              ))}
            </div>
            <p className="text-gray-400">Trusted by <span className="text-white font-bold">10,000+</span> companies worldwide</p>
          </div>
        </div>

        {/* RIGHT GRAPHICS */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

          {/* Floating Cards */}
          <div className="relative grid gap-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-[350px] animate-bounce shadow-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Project Analytics
                </h2>

                <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                  Live
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Completed</span>
                    <span>85%</span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full w-[85%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>In Progress</span>
                    <span>60%</span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-yellow-500 h-3 rounded-full w-[60%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-[320px] animate-pulse shadow-2xl">
              <h2 className="text-xl font-bold mb-5">
                Team Activity
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Tasks Completed</span>
                  <span className="text-green-400">
                    +128
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Projects Running</span>
                  <span className="text-blue-400">
                    14
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Team Members</span>
                  <span className="text-cyan-400">
                    48
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACKGROUND SHAPES */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-20 right-20 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* STATS SECTION */}
      <section className="px-10 lg:px-24 py-16 border-y border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-10 lg:px-24 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>

          <p className="text-gray-400 mt-5 text-lg max-w-2xl mx-auto">
            Everything you need to manage teams and
            projects efficiently in one powerful platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:-translate-y-3 transition duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
            <FaTasks className="text-5xl text-blue-400 mb-6" />

            <h3 className="text-2xl font-bold mb-4">
              Task Tracking
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Create, assign, prioritize, and monitor
              tasks with real-time updates and deadline reminders.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:-translate-y-3 transition duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
            <FaUsers className="text-5xl text-cyan-400 mb-6" />

            <h3 className="text-2xl font-bold mb-4">
              Team Collaboration
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Manage members, improve communication,
              and streamline workflows with built-in chat.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:-translate-y-3 transition duration-500 hover:shadow-2xl hover:shadow-green-500/20">
            <FaChartLine className="text-5xl text-green-400 mb-6" />

            <h3 className="text-2xl font-bold mb-4">
              Analytics Dashboard
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Visualize performance and productivity
              through interactive dashboards and reports.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:-translate-y-3 transition duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
            <FaClock className="text-5xl text-purple-400 mb-6" />

            <h3 className="text-2xl font-bold mb-4">
              Time Tracking
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Track time spent on tasks and generate timesheets automatically.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:-translate-y-3 transition duration-500 hover:shadow-2xl hover:shadow-orange-500/20">
            <FaComments className="text-5xl text-orange-400 mb-6" />

            <h3 className="text-2xl font-bold mb-4">
              Real-time Chat
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Built-in messaging and file sharing for seamless team communication.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:-translate-y-3 transition duration-500 hover:shadow-2xl hover:shadow-red-500/20">
            <FaShieldAlt className="text-5xl text-red-400 mb-6" />

            <h3 className="text-2xl font-bold mb-4">
              Enterprise Security
            </h3>

            <p className="text-gray-400 leading-relaxed">
              JWT authentication with role-based access
              control and data encryption for maximum security.
            </p>
          </div>
        </div>
      </section>

      

      

      {/* FOOTER */}
      <footer id="contact" className="bg-black/40 border-t border-white/10 pt-16 pb-8">
        <div className="px-10 lg:px-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <FaRocket className="text-blue-500 text-2xl" />
                <h2 className="text-2xl font-bold">TaskFlow</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering teams to collaborate better, work smarter, and achieve more together.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaGithub size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
                <li><a href="#" className="hover:text-white transition">Changelog</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">API Status</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info Row */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-gray-400">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <span>support@teamtaskmanager.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-400" />
                <span>+91 7705021802</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Prayagraj, India</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>&copy; 2026 TeamTask Manager. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;