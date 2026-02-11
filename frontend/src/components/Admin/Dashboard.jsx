import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import './Dashboard.css';

const Dashboard = () => {
    const { data, updateProjects, addProject, deleteProject } = usePortfolio(); // Actually updateProjects isn't in context yet, only updateData.
    // I need to update context to have helper methods or use updateData correctly.
    // Let's modify context to expose `projects` and `techStack` directly or use setData.
    // The previous context step DID add helper functions: updateProject, deleteProject.

    // Check context definition again.
    // context defined: updateProject(project, index), deleteProject(index), updateSkills(skills), updateProfile(profileData)...

    // So here I use those.
    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <ProjectSection />
            <SkillsSection />
        </div>
    );
};

// ... Wait, this is too complex for one file. I'll split into components if needed.
// For now, I'll put everything in Dashboard.jsx to keep it simple.
import { Plus, Trash2, Edit } from 'lucide-react';

const DashboardContent = () => {
    const { data, updateProject, deleteProject, updateSkills, updateProfile, logout } = usePortfolio();
    const [projectForm, setProjectForm] = useState({ title: '', description: '', tech: '', link: '' });

    // Profile State
    const [profileForm, setProfileForm] = useState({
        name: data?.name || '',
        role: data?.role || '',
        intro: data?.intro || '',
        image: data?.image || '',
        contact: data?.contact || { email: '', github: '', linkedin: '', twitter: '' }
    });
    const [uploading, setUploading] = useState(false);

    // Sync profile form when data loads
    // You might want a useEffect here to update form if data changes externally, 
    // but typically data is stable unless refreshed.

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            // Use API_URL from env or hardcode consistent with context
            const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || errorData.error || "Upload failed");
            }
            const result = await response.json();
            if (result.imageUrl) {
                setProfileForm(prev => ({ ...prev, image: result.imageUrl }));
                alert("Image uploaded successfully!");
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleProfileSave = () => {
        updateProfile(profileForm);
        alert("Profile saved!");
    };

    const [editIndex, setEditIndex] = useState(-1);

    // Skills State
    const [skillsState, setSkillsState] = useState(data?.techStack || {});
    const [skillCategory, setSkillCategory] = useState('frontend');
    const [newSkill, setNewSkill] = useState('');

    const handleProjectSubmit = (e) => {
        e.preventDefault();
        const techArray = projectForm.tech.split(',').map(t => t.trim());
        const newProject = { ...projectForm, tech: techArray };
        if (editIndex >= 0) {
            updateProject(newProject, editIndex);
            alert("Project updated successfully!");
        } else {
            updateProject(newProject, -1);
            alert("Project added successfully!");
        }
        setProjectForm({ title: '', description: '', tech: '', link: '' });
        setEditIndex(-1);
    };

    const handleEditClick = (project, index) => {
        setProjectForm({
            title: project.title,
            description: project.description,
            tech: project.tech.join(', '),
            link: project.link
        });
        setEditIndex(index);
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (!newSkill) return;
        const currentSkills = skillsState[skillCategory] || [];
        const updatedCategorySkills = [...currentSkills, newSkill];
        setSkillsState({ ...skillsState, [skillCategory]: updatedCategorySkills });
        setNewSkill('');
    };

    const handleRemoveSkill = (category, skillToRemove) => {
        const currentSkills = skillsState[category];
        const updatedCategorySkills = currentSkills.filter(s => s !== skillToRemove);
        setSkillsState({ ...skillsState, [category]: updatedCategorySkills });
    };

    const handleSaveSkills = () => {
        updateSkills(skillsState);
        alert("Skills saved successfully!");
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Content Management</h2>
                <button onClick={logout} className="btn-logout">Logout</button>
            </header>

            <section className="dashboard-section">
                <h3>Profile Information</h3>
                <div className="profile-form">
                    <input
                        value={profileForm.name}
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        value={profileForm.role}
                        onChange={e => setProfileForm({ ...profileForm, role: e.target.value })}
                        placeholder="Role"
                    />
                    <textarea
                        value={profileForm.intro}
                        onChange={e => setProfileForm({ ...profileForm, intro: e.target.value })}
                        placeholder="Introduction"
                    />

                    <div className="contact-form-group">
                        <h4>Contact Details</h4>
                        <input
                            value={profileForm.contact?.email || ''}
                            onChange={e => setProfileForm({ ...profileForm, contact: { ...profileForm.contact, email: e.target.value } })}
                            placeholder="Email"
                        />
                        <input
                            value={profileForm.contact?.github || ''}
                            onChange={e => setProfileForm({ ...profileForm, contact: { ...profileForm.contact, github: e.target.value } })}
                            placeholder="GitHub (e.g. github.com/username)"
                        />
                        <input
                            value={profileForm.contact?.linkedin || ''}
                            onChange={e => setProfileForm({ ...profileForm, contact: { ...profileForm.contact, linkedin: e.target.value } })}
                            placeholder="LinkedIn (e.g. linkedin.com/in/username)"
                        />
                        <input
                            value={profileForm.contact?.twitter || ''}
                            onChange={e => setProfileForm({ ...profileForm, contact: { ...profileForm.contact, twitter: e.target.value } })}
                            placeholder="Twitter (e.g. @username)"
                        />
                    </div>
                    <div className="image-input-group">
                        <label className="file-upload-label">
                            <span className="btn-upload">Choose Photo</span>
                            <input type="file" onChange={handleFileChange} className="file-input" accept="image/*" />
                        </label>
                        {uploading && <span className="upload-status">Uploading...</span>}
                        {profileForm.image && (
                            <div className="image-preview">
                                <img src={profileForm.image} alt="Preview" className="preview-img" />
                                <input
                                    value={profileForm.image}
                                    readOnly
                                    className="image-url-input"
                                />
                            </div>
                        )}
                    </div>
                    <button onClick={handleProfileSave} className="btn-save">Save Profile</button>
                </div>
            </section>

            <section className="dashboard-section">
                <h3>Projects</h3>
                <form onSubmit={handleProjectSubmit} className="project-form">
                    <input
                        value={projectForm.title}
                        onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="Project Title"
                        required
                    />
                    <textarea
                        value={projectForm.description}
                        onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Description"
                        required
                    />
                    <input
                        value={projectForm.tech}
                        onChange={e => setProjectForm({ ...projectForm, tech: e.target.value })}
                        placeholder="Tech Stack (comma separated)"
                        required
                    />
                    <input
                        value={projectForm.link}
                        onChange={e => setProjectForm({ ...projectForm, link: e.target.value })}
                        placeholder="Project Link"
                    />
                    <button type="submit" className="btn-add">
                        {editIndex >= 0 ? 'Update Project' : 'Add Project'}
                    </button>
                    {editIndex >= 0 && (
                        <button type="button" onClick={() => { setEditIndex(-1); setProjectForm({ title: '', description: '', tech: '', link: '' }); }} className="btn-cancel">
                            Cancel Edit
                        </button>
                    )}
                </form>

                <div className="project-list">
                    {data.projects.map((project, index) => (
                        <div key={index} className="project-item">
                            <div>
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                            </div>
                            <div className="project-actions">
                                <button onClick={() => handleEditClick(project, index)} className="btn-icon"><Edit size={16} /></button>
                                <button onClick={() => deleteProject(index)} className="btn-icon btn-delete"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="dashboard-section">
                <h3>Skills</h3>
                <div className="skill-input-group">
                    <select value={skillCategory} onChange={e => setSkillCategory(e.target.value)}>
                        {Object.keys(skillsState).map(key => (
                            <option key={key} value={key}>{key.toUpperCase()}</option>
                        ))}
                    </select>
                    <input
                        value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                        placeholder="New Skill"
                    />
                    <button onClick={handleAddSkill} className="btn-add">Add</button>
                    <button onClick={handleSaveSkills} className="btn-save" style={{ marginLeft: 'auto' }}>Save All Skills</button>
                </div>

                <div className="skills-preview">
                    {Object.entries(skillsState).map(([category, skills]) => (
                        <div key={category} className="skill-category-preview">
                            <h4>{category}</h4>
                            <div className="tags">
                                {skills.map(skill => (
                                    <span key={skill} className="tag">
                                        {skill}
                                        <button onClick={() => handleRemoveSkill(category, skill)} className="btn-remove">×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DashboardContent;
