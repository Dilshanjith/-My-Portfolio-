# Dilshanjith's Portfolio

Welcome to my personal portfolio website, built with React, Vite, and modern CSS.

## 🚀 Features

- **Modern & Responsive Design**: Glassmorphism, dark mode aesthetic, and smooth animations.
- **Admin Dashboard**: Manage your projects and skills dynamically via `/admin/login`.
- **Component-Based Architecture**: Clean and modular code structure.
- **Fast Performance**: Optimized with Vite.
- **Easy Customization**: All content is managed in `src/data/portfolio.js` (initial load) and LocalStorage (updates).

## 🛠 Tech Stack

- **React**
- **Vite**
- **React Router**
- **Vanilla CSS (Variables & Animations)**

## 📂 Project Structure

- `src/components/`: Reusable UI components.
- `src/context/`: State management for portfolio data.
- `src/data/portfolio.js`: Initial data seed.
- `src/index.css`: Global styles and theme variables.

## 🔧 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run locally**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## 🔐 Admin Access

To manage your portfolio content:
1.  Go to `http://localhost:5173/admin/login`
2.  Login with the default password: `admin123`
3.  Add/Edit Projects and Skills from the Dashboard.

> **Note:** Data updates are saved to your browser's LocalStorage for this demo. To make them permanent across devices, connect the `PortfolioContext` to a backend database (Firebase, MongoDB, etc.).

## 📝 Customization

To update your starting data or **Profile Photo**:
1.  Edit `src/data/portfolio.js`.
2.  Change the `image` URL to point to your photo (place it in `public/` folder).

---
*Last Updated: February 2026*
