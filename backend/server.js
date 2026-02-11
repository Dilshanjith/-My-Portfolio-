require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Portfolio = require('./models/Portfolio');

const app = express();
app.use(express.json());
const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
const path = require('path');
const multer = require('multer');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const upload = multer({ storage });

// Serve static files from the uploads directory (Optional: removed since using Cloudinary)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload endpoint
app.post('/api/upload', (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Upload Error:', err);
            return res.status(500).json({ message: 'Upload failed', error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.json({ imageUrl: req.file.path });
    });
});

// Initial Data Seed
const initialData = {
    name: "Dilshanjith",
    role: "Full-Stack Developer | UI/UX Designer | Data Enthusiast",
    image: "https://placehold.co/400x400/22d3ee/0f172a?text=My+Photo",
    intro: "Welcome to my personal corner of the internet! This portfolio is designed to be a living document of my professional journey, showcasing my technical skills, creative projects, and continuous growth in the field of Technology.",
    techStack: {
        frontend: ["React", "Tailwind CSS", "Next.js"],
        backend: ["Node.js", "Python", "PostgreSQL"],
        tools: ["Git", "Docker", "Figma"],
        concepts: ["Scalable Architecture", "Clean Code", "User-Centric Design"]
    },
    projects: [
        {
            title: "Active Development",
            description: "Currently working on various open-source initiatives and exploring new technologies.",
            tech: ["React", "Node.js"],
            link: "#"
        }
    ],
    vision: [
        {
            title: "Continuous Learning",
            desc: "Constantly updating my workflow with modern standards."
        },
        {
            title: "Scalability",
            desc: "Building systems that can grow alongside user needs."
        },
        {
            title: "Efficiency",
            desc: "Writing clean, modular code that is easy to refactor and improve."
        }
    ],
    contact: {
        email: "your.email@example.com",
        github: "github.com/yourusername",
        linkedin: "linkedin.com/in/yourusername",
        twitter: "@yourhandle"
    }
};

// Routes
app.get('/api/portfolio', async (req, res) => {
    try {
        let data = await Portfolio.findOne();
        if (!data) {
            data = new Portfolio(initialData);
            await data.save();
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/portfolio', async (req, res) => {
    try {
        // In a real app, verify admin token here
        // Use findOneAndUpdate with upsert option to simpler logic
        const data = await Portfolio.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === "admin123") {
        res.json({ success: true, token: "admin-token-123" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Connect to MongoDB
// Use a user-provided URI or a local fallback. For hosting, they MUST provide MONGODB_URI.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
