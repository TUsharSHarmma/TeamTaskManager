Team Task Manager 🚀

A modern full-stack Team Task Management System built using the MERN Stack with role-based authentication, project management, task tracking, member submissions, analytics dashboard, and beautiful modern UI.

This project allows Admins to manage teams, projects, and tasks while Members can work on assigned tasks and submit their work using links or file uploads.

✨ Features
🔐 Authentication & Authorization
User Signup & Login
JWT Authentication
Protected Routes
Role-Based Access Control
Admin / Member Roles
👨‍💼 Admin Features
📁 Project Management
Create Projects
Delete Projects
View All Projects
👥 Team Management
Add Team Members
View All Members
Delete Members
✅ Task Management
Create Tasks
Assign Tasks
Set Priority
Set Due Dates
Delete Tasks
Track Task Progress
📊 Dashboard Analytics
Total Tasks
Completed Tasks
Pending Tasks
Overdue Tasks
Charts & Analytics
👨‍💻 Member Features
📋 Task Workflow
View Assigned Tasks
Open Task Details
Update Task Status
Submit Completed Work
📤 Submission System

Members can:

Upload project links
Submit GitHub repository links
Upload task files
🎨 UI Features
Modern Glassmorphism UI
Responsive Design
Sidebar Navigation
Loading Animations
Success Notifications
Interactive Dashboard
Beautiful Cards & Charts
🛠️ Tech Stack
Frontend
React.js
Vite
Tailwind CSS
React Router DOM
Axios
React Icons
Recharts
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcryptjs
Multer (for file uploads)
📂 Project Structure
team-task-manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone <your-repo-url>
cd team-task-manager
🔧 Backend Setup
Move to backend
cd backend
Install dependencies
npm install
Create .env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
Start Backend
npm run server

Backend runs on:

http://localhost:5000
💻 Frontend Setup
Move to frontend
cd frontend
Install dependencies
npm install
Start Frontend
npm run dev

Frontend runs on:

http://localhost:5173
🔑 Demo Roles
Admin

Can:

Create Projects
Add Members
Assign Tasks
Monitor Dashboard
Member

Can:

View Assigned Tasks
Update Status
Submit Work
📦 API Routes
Auth Routes
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/users
POST   /api/auth/create-member
DELETE /api/auth/users/:id
Project Routes
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
Task Routes
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
Dashboard Routes
GET /api/dashboard
📤 Task Submission System

Members can submit:

GitHub Links
Drive Links
Hosted URLs
Uploaded Files

Example:

https://github.com/username/project
📊 Dashboard Analytics

Dashboard includes:

Total Tasks
Completed Tasks
Pending Tasks
Overdue Tasks
Pie Chart Analytics
☁️ Deployment
🚂 Railway Deployment

You can deploy:

Backend on Railway
Frontend on Railway
Backend Environment Variables
MONGO_URI=
JWT_SECRET=
PORT=
🔮 Future Improvements
Real-time Notifications
Chat System
Email Notifications
Drag & Drop Kanban Board
Activity Logs
Team Chat
Dark/Light Theme Toggle
AI Task Suggestions
🧠 Learning Outcomes

This project demonstrates:

Full Stack Development
REST API Development
Authentication & Authorization
File Upload Handling
MongoDB Relationships
Role-Based Access Control
Modern UI Design
Dashboard Analytics
Deployment
👨‍💻 Author

Developed by Tushar Sharma