import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import profileInfo from './models/Profile.model.js';
import cors from 'cors';
import { put } from "@vercel/blob";
import upload from "./middleware/multer.js";

// --- Required for serving static files and catch-all route ---
import path from 'path';
import { fileURLToPath } from 'url';
// -------------------------------------------------------------

dotenv.config();
const PORT = process.env.PORT || 1525;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_WEB_URI || 'mongodb+srv://vai:ILoveMe2&Only@vai.agcbtjy.mongodb.net/vai?retryWrites=true&w=majority&appName=Vai';
const Vai_READ_WRITE_TOKEN = process.env.Vai_READ_WRITE_TOKEN || "vercel_blob_rw_vijAcW1I5Mj77q82_r3l1cspy9njDwbN94eeHPFJui0jmUJ";

const app = express();

// --- Calculate __dirname for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ------------------------------------------

app.use(express.json());
app.use(cors());


// --- 1. Serve Static Assets (React Build) ---
// IMPORTANT: Adjust the path 'client/build' to the actual location
// of your React application's build output directory relative to this server.js file.
// Common examples: '../client/build', '../frontend/dist', './build'
const buildPath = path.join(__dirname, '../client/build'); // <--- ADJUST THIS PATH !!
app.use(express.static(buildPath));
// ---------------------------------------------


// --- 2. API Routes ---
// Your existing API routes remain here

// Save profile information
app.post('/api/profile/info', upload, async (req, res) => {
    try {
        const { personal, nominee } = req.body;

        // Parse JSON strings if sent as strings (due to FormData)
        const personalData = typeof personal === "string" ? JSON.parse(personal) : personal;
        const nomineeData = typeof nominee === "string" ? JSON.parse(nominee) : nominee;

        // Handle personal image upload
        let personalImageUrl = "";
        if (req.files && req.files.personalImage) {
            const personalImage = req.files.personalImage[0];
            const personalBlob = await put(
                `profiles/personal_${personalData.nid}_${Date.now()}_${personalImage.originalname}`, personalImage.buffer, {
                access: "public",
                token: Vai_READ_WRITE_TOKEN,
            }
            );
            personalImageUrl = personalBlob.url;
        }

        // Handle nominee image upload
        let nomineeImageUrl = "";
        if (req.files && req.files.nomineeImage) {
            const nomineeImage = req.files.nomineeImage[0];
            const nomineeBlob = await put(
                `profiles/nominee_${nomineeData.nid}_${Date.now()}_${nomineeImage.originalname}`,
                nomineeImage.buffer, {
                access: "public",
                token: Vai_READ_WRITE_TOKEN
            }
            );
            nomineeImageUrl = nomineeBlob.url;
        }

        // Create new profile with image URLs
        const newProfile = {
            personal: {
                ...personalData,
                imageUrl: personalImageUrl
            },
            nominee: {
                ...nomineeData,
                imageUrl: nomineeImageUrl
            }
        };

        await profileInfo.create(newProfile);
        return res.status(201).send({ Message: "Information Saved" });
    } catch (error) {
        console.error("Error at saving profile information:", error);
        return res.status(500).send({ message: "Error at saving profile information." });
    }
});

// Get profile information
app.get('/api/profiles', async (req, res) => {
    try {
        const profiles = await profileInfo.find();
        res.json(profiles);
    } catch (error) {
        console.log({ error: "Error at getting profile information." });
        return res.status(500).send({ Message: "Error at getting all profile information." });
    }
});

// Getting Hello Response
app.get('/api', (req, res) => {
    res.send('Hi...');
});

// --- END OF API Routes ---


// --- 3. Catch-All Route (Serves React App) ---
// This MUST be placed AFTER all your API routes and static file serving.
// It handles requests that don't match static files or API endpoints
// by sending the main index.html file.
app.get('*', (req, res) => {
    // Optional: Add a check to avoid sending index.html for potential API typos
    if (req.originalUrl.startsWith('/api/')) {
        return res.status(404).json({ message: 'API endpoint not found' });
    }

    res.sendFile(path.join(buildPath, 'index.html'), (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            // In production, avoid sending detailed error messages back
            res.status(500).send('An error occurred while trying to serve the application.');
        }
    });
});
// ---------------------------------------------


// Database Connection Setup
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully."); // More specific message
        // Server initialization should ideally be inside the .then()
        // to ensure the DB is connected before the server starts accepting requests.
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database: ", error);
        process.exit(1); // Exit if database connection fails
    });

// Removed app.listen from here as it's moved inside the mongoose.connect().then()