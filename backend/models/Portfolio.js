const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    name: String,
    role: String,
    intro: String,
    image: String,
    techStack: {
        type: Map,
        of: [String]
    },
    projects: [{
        title: String,
        description: String,
        tech: [String],
        link: String
    }],
    vision: [{
        title: String,
        desc: String
    }],
    contact: {
        email: String,
        github: String,
        linkedin: String,
        twitter: String
    }
}, { strict: false, timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
