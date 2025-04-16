import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import profileInfo from './models/Profile.model.js'
import cors from 'cors'
import { put } from "@vercel/blob"
import upload from "./middleware/multer.js"



dotenv.config()
const PORT = process.env.PORT || 1525
const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_WEB_URI || 'mongodb+srv://vai:ILoveMe2&Only@vai.agcbtjy.mongodb.net/vai?retryWrites=true&w=majority&appName=Vai'
const Vai_READ_WRITE_TOKEN = process.env.Vai_READ_WRITE_TOKEN || "vercel_blob_rw_vijAcW1I5Mj77q82_r3l1cspy9njDwbN94eeHPFJui0jmUJ"
const app = express()
app.use(express.json())
app.use(cors())


// Save profile information

app.post('/api/profile/info', upload, async (req, res) => {

    try {
        const { personal, nominee } = req.body

        // Parse JSON strings if sent as strings (due to FormData)
        const personalData = typeof personal === "string" ? JSON.parse(personal) : personal
        const nomineeData = typeof nominee === "string" ? JSON.parse(nominee) : nominee

        // Handle personal image upload

        let personalImageUrl = ""
        if (req.files && req.files.personalImage) {
            const personalImage = req.files.personalImage[0]
            const personalBlob = await put(
                `profiles/personal_${personalData.nid}_${Date.now()}_${personalImage.originalname}`, personalImage.buffer, {
                access: "public",
                token: Vai_READ_WRITE_TOKEN,

            }
            )
            personalImageUrl = personalBlob.url
        }

        // Handle nominee image upload

        let nomineeImageUrl = ""
        if (req.files && req.files.nomineeImage) {
            const nomineeImage = req.files.nomineeImage[0]
            const nomineeBlob = await put(
                `profiles/nominee_${nomineeData.nid}_${Date.now()}_${nomineeImage.originalname}`,
                nomineeImage.buffer, {
                access: "public",
                token: Vai_READ_WRITE_TOKEN
            }
            )
            nomineeImageUrl = nomineeBlob.url
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
        }

        await profileInfo.create(newProfile)
        return res.status(201).send({ Message: "Information Saved" })
    } catch (error) {
        console.error("Error at saving profile information:", error);
        return res.status(500).send({ message: "Error at saving profile information." });
    }
})

// Get profile information

app.get('/api/profiles', async (req, res) => {
    try {
        const profiles = await profileInfo.find()
        res.json(profiles)
    } catch (error) {
        console.log({ error: "Error at getting profile information." })
        return res.status(500).send({ Message: "Error at getting all profile information." })
    }
})



// Getting Hello Response

app.get('/api', (req, res) => {
    res.send('Hi...')
})


// Database Connection Setup 
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(MONGO_URI)
    })
    .catch((error) => {
        console.error("Error at connecting to database: ", error)
    })


// Server initialization
app.listen(PORT, () => {
    console.log(`Server is running.`)
})

