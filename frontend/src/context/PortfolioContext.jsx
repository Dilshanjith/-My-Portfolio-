import { createContext, useContext, useState, useEffect } from "react";
// import { portfolioData as initialData } from "../data/portfolio"; // Not needed if fetching from backend

const PortfolioContext = createContext();

// Use an environment variable or default to localhost:5000
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export const PortfolioProvider = ({ children }) => {
    const [data, setData] = useState(null); // Initialize as null to show loading
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);

    // Fetch data from backend on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/portfolio`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
                // Fallback to initialData if you want, but for now show error or empty
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const login = async (password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const result = await response.json();
            if (result.success) {
                setIsAdmin(true);
                // Optionally save token: localStorage.setItem("token", result.token);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Login error:", err);
            return false;
        }
    };

    const logout = () => setIsAdmin(false);

    // Generic update function to send PUT/POST to backend
    // Since our backend has a simple POST /api/portfolio that updates/overwrites:
    const saveToBackend = async (newData) => {
        try {
            const updatedData = { ...data, ...newData };
            // Optimistic update
            setData(updatedData);

            const response = await fetch(`${API_URL}/portfolio`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                // creating/updating failed, revert? Or just log error
                throw new Error("Failed to save to backend");
            }
            // If the server returns the saved object, we could sync it:
            // const savedData = await response.json();
            // setData(savedData);
        } catch (err) {
            console.error("Save error:", err);
            // Optionally revert optimistic update here
        }
    };

    const updateProject = (project, index) => {
        const updatedProjects = [...data.projects];
        if (index >= 0) {
            updatedProjects[index] = project;
        } else {
            updatedProjects.push(project);
        }
        saveToBackend({ projects: updatedProjects });
    };

    const deleteProject = (index) => {
        const updatedProjects = data.projects.filter((_, i) => i !== index);
        saveToBackend({ projects: updatedProjects });
    }

    const updateSkills = (skills) => {
        saveToBackend({ techStack: skills });
    }

    const updateProfile = (profileData) => {
        saveToBackend(profileData);
    }

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Loading...</div>;
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Error: {error}. Make sure Backend is running.</div>;

    return (
        <PortfolioContext.Provider value={{ data, isAdmin, login, logout, updateProject, deleteProject, updateSkills, updateProfile }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => useContext(PortfolioContext);
