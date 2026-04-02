import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    }

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePasswords = async function (candidatepassword) {
    return bcrypt.compare(candidatepassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User;