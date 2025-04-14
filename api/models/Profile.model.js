import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    personal: {
        imageUrl:{
            type: String, 
            trim: true, 
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        father: {
            type: String,
            required: true,
            trim: true,

        },
        mother: {
            type: String,
            required: true,
            trim: true,
        },
        dob: {
            type: String,
            required: true,
            trim: true,
        },
        nid: {
            type: Number,
            required: true
        },
        mobile: {
            type: Number,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true

        }
    },
    nominee: {
        
        imageUrl:{
            type: String, 
            trim: true, 
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        father: {
            type: String,
            required: true,
            trim: true,

        },
        mother: {
            type: String,
            required: true,
            trim: true,
        },
        dob: {
            type: String,
            required: true,
            trim: true,
        },
        nid: {
            type: Number,
            required: true
        },
        mobile: {
            type: Number,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true

        }
    }
})

const profileInfo = mongoose.model('Profile', profileSchema)

export default profileInfo