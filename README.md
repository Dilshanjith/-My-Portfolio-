# 🌟 Dynamic Personal Portfolio with Admin Dashboard

A sophisticated, full-stack MERN (MongoDB, Express, React, Node.js) portfolio application featuring a secure Admin Dashboard for real-time content management. This project is designed to bridge the gap between a static showcase and a dynamic application, providing full control over projects, skills, and profile data without touching a line of code.

---

## ✨ Features

- **🚀 Modern React Frontend**: Built with Vite for lightning-fast performance and React 19.
- **🛡️ Secure Admin Dashboard**: A protected CMS to manage projects, skills, and profile information dynamically.
- **📸 Cloudinary Integration**: Seamless image uploading and management for projects and profile assets.
- **📱 Fully Responsive**: Thoughtfully designed with vanilla CSS variables and animations to look stunning on any device.
- **⚡ Real-time Updates**: Changes made in the admin panel are instantly reflected across the public site.
- **🎨 Glassmorphism Design**: Sleek, modern aesthetic featuring smooth transitions and dark mode optimization.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React.js 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Modern CSS Variables & Keyframe Animations)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Atlas)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **File Storage**: [Cloudinary](https://cloudinary.com/) (via Multer)

---

## 📂 Project Structure

```text
-My-Portfolio/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global state management
│   │   └── data/       # Static assets and initial data
│   └── public/         # Static files
├── backend/            # Express.js API
│   ├── models/         # Mongoose schemas
│   └── uploads/        # Local temporary storage
└── package.json        # Root workspace configuration
```

---

## 🔧 Getting Started

### Prerequisites
- Node.js (>= 18.x)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dilshanjith/-My-Portfolio-.git
   cd -My-Portfolio-
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory and add:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running Locally

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 🔐 Admin Access

To manage your portfolio content:
1. Navigate to `/admin/login` (e.g., `http://localhost:5173/admin/login`).
2. Login with your admin credentials.
3. Access the Dashboard to:
   - 📁 Add/Edit/Delete **Projects**
   - ⚡ Manage **Skills**
   - 👤 Update **Profile Information**

---

## 🚀 Deployment

- **Frontend**: Recommended hosting on **Vercel** or **Netlify**.
- **Backend**: Recommended hosting on **Azure App Service**, **Render**, or **Heroku**.
- **Database**: **MongoDB Atlas** (Free Tier).

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

